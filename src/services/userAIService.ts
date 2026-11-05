import { AIVisionDiagnosisResult, requestAIVisionDiagnosis } from './apiService.ts';

export type AIProvider = 'gemini' | 'openai' | 'offline';

export interface UserAIConfig {
  provider: AIProvider;
  apiKey: string;
}

const STORAGE_KEY_PROVIDER = 'ytc_user_ai_provider';
const STORAGE_KEY_API_KEY = 'ytc_user_ai_key';

/**
 * Lấy cấu hình AI Key cá nhân của người dùng từ localStorage
 */
export function getUserAIConfig(): UserAIConfig {
  const provider = (localStorage.getItem(STORAGE_KEY_PROVIDER) as AIProvider) || 'gemini';
  const apiKey = localStorage.getItem(STORAGE_KEY_API_KEY) || '';
  return { provider, apiKey };
}

/**
 * Lưu cấu hình AI Key cá nhân vào trình duyệt người dùng (BYOK)
 */
export function saveUserAIConfig(config: UserAIConfig): void {
  localStorage.setItem(STORAGE_KEY_PROVIDER, config.provider);
  localStorage.setItem(STORAGE_KEY_API_KEY, config.apiKey.trim());
}

/**
 * Xóa API Key khỏi trình duyệt
 */
export function clearUserAIConfig(): void {
  localStorage.removeItem(STORAGE_KEY_PROVIDER);
  localStorage.removeItem(STORAGE_KEY_API_KEY);
}

/**
 * Chuyển File ảnh sang Base64 chuỗi để gửi trực tiếp cho Gemini / OpenAI Vision
 */
export function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      const commaIdx = res.indexOf(',');
      if (commaIdx === -1) {
        reject(new Error('Invalid image data format'));
        return;
      }
      const mimeType = res.substring(5, commaIdx).replace(';base64', '');
      const base64 = res.substring(commaIdx + 1);
      resolve({ base64, mimeType });
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Kiểm tra thử kết nối với API Key người dùng nhập
 */
export async function testUserAIKey(
  provider: AIProvider,
  apiKey: string
): Promise<{ success: boolean; message: string }> {
  if (provider === 'offline') {
    return { success: true, message: 'Chế độ quy tắc nội bộ (Offline Rules) luôn khả dụng.' };
  }

  if (!apiKey.trim()) {
    return { success: false, message: 'Vui lòng nhập API Key.' };
  }

  try {
    if (provider === 'gemini') {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Respond with "OK" in JSON format: {"status":"OK"}' }] }],
          generationConfig: { response_mime_type: 'application/json' },
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson.error?.message || `HTTP ${res.status}`;
        return { success: false, message: `Lỗi kết nối Gemini: ${errMsg}` };
      }
      return { success: true, message: 'Kết nối Google Gemini thành công! API Key hợp lệ.' };
    }

    if (provider === 'openai') {
      const url = 'https://api.openai.com/v1/chat/completions';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Say OK' }],
          max_tokens: 5,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson.error?.message || `HTTP ${res.status}`;
        return { success: false, message: `Lỗi kết nối OpenAI: ${errMsg}` };
      }
      return { success: true, message: 'Kết nối OpenAI thành công! API Key hợp lệ.' };
    }

    return { success: false, message: 'Nhà cung cấp không xác định.' };
  } catch (err: any) {
    return { success: false, message: `Lỗi mạng hoặc CORS: ${err.message || err}` };
  }
}

/**
 * Chẩn đoán bệnh cây bằng chính API Key của người dùng (Bring Your Own Key)
 */
export async function diagnoseWithUserAI(params: {
  plantName?: string;
  symptoms?: string[];
  description?: string;
  file?: File;
  imageBase64?: string;
  mimeType?: string;
  region?: 'north' | 'central' | 'south';
  lang?: 'vi' | 'en';
}): Promise<{
  success: boolean;
  diagnosis?: AIVisionDiagnosisResult;
  usedProvider: 'user_gemini' | 'user_openai' | 'offline_rules';
  error?: string;
}> {
  const config = getUserAIConfig();
  const isEn = params.lang === 'en';

  let base64 = params.imageBase64;
  let mime = params.mimeType;

  if (params.file && (!base64 || !mime)) {
    try {
      const converted = await fileToBase64(params.file);
      base64 = converted.base64;
      mime = converted.mimeType;
    } catch (e) {
      console.warn('Error reading file to base64:', e);
    }
  }

  // Nếu người dùng cấu hình Google Gemini với key hợp lệ
  if (config.provider === 'gemini' && config.apiKey) {
    try {
      const prompt = `You are a senior tropical & urban plant pathologist for the 'Yêu Trồng Cây' gardening community.
Analyze this plant leaf / condition and diagnose the botanical disease.
Strictly enforce organic & biological remedies only (H15 compliance: no hazardous chemical pesticides).
Region: ${params.region || 'south'}.
Plant Hint: ${params.plantName || 'Unknown urban plant'}.
Reported Symptoms: ${(params.symptoms || []).join(', ') || 'Leaf decline'}.
Gardener Description: ${params.description || 'Inspection needed'}.

Respond strictly in valid JSON matching this structure:
{
  "disease_name": "Vietnamese or English name with scientific binomial",
  "confidence": 95,
  "severity": "high" | "medium" | "low",
  "symptoms_identified": ["symptom 1", "symptom 2", "symptom 3"],
  "primary_cause": "Environmental, viral, bacterial, fungal or pest cause",
  "organic_prescription": [
    "Step 1: Immediate physical/isolation action (e.g. prune infected leaf, swab with 70% alcohol)",
    "Step 2: Biological organic spray (e.g. emulsified organic Neem oil, baking soda solution, Trichoderma drench)",
    "Step 3: Cultural aeration or soil moisture correction"
  ],
  "prevention": "Long-term organic care advice",
  "disclaimer": "AI Botanical Vision preliminary analysis. Confirm with experienced local gardeners."
}
Return language: ${isEn ? 'English' : 'Vietnamese'}.`;

      const parts: any[] = [{ text: prompt }];

      if (base64 && mime) {
        parts.push({
          inline_data: {
            mime_type: mime,
            data: base64,
          },
        });
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            response_mime_type: 'application/json',
            temperature: 0.2,
          },
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const textResponse = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textResponse) {
          const parsed: AIVisionDiagnosisResult = JSON.parse(textResponse);
          return {
            success: true,
            diagnosis: parsed,
            usedProvider: 'user_gemini',
          };
        }
      } else {
        const errJson = await res.json().catch(() => ({}));
        console.warn('Gemini API call failed with status', res.status, errJson);
      }
    } catch (err: any) {
      console.warn('Gemini vision call error:', err);
    }
  }

  // Nếu người dùng cấu hình OpenAI với key hợp lệ
  if (config.provider === 'openai' && config.apiKey) {
    try {
      const prompt = `You are a senior tropical & urban plant pathologist for the 'Yêu Trồng Cây' gardening community.
Analyze this plant leaf / condition and diagnose the botanical disease.
Strictly enforce organic & biological remedies only (H15 compliance: no hazardous chemical pesticides).
Region: ${params.region || 'south'}.
Plant Hint: ${params.plantName || 'Unknown urban plant'}.
Reported Symptoms: ${(params.symptoms || []).join(', ') || 'Leaf decline'}.
Gardener Description: ${params.description || 'Inspection needed'}.

Respond strictly in valid JSON matching this structure:
{
  "disease_name": "Vietnamese or English name with scientific binomial",
  "confidence": 95,
  "severity": "high" | "medium" | "low",
  "symptoms_identified": ["symptom 1", "symptom 2", "symptom 3"],
  "primary_cause": "Environmental, viral, bacterial, fungal or pest cause",
  "organic_prescription": [
    "Step 1: Immediate physical/isolation action",
    "Step 2: Biological organic spray",
    "Step 3: Cultural aeration or soil moisture correction"
  ],
  "prevention": "Long-term organic care advice",
  "disclaimer": "AI Botanical Vision preliminary analysis. Confirm with experienced local gardeners."
}
Return language: ${isEn ? 'English' : 'Vietnamese'}.`;

      const contentParts: any[] = [{ type: 'text', text: prompt }];
      if (base64 && mime) {
        contentParts.push({
          type: 'image_url',
          image_url: { url: `data:${mime};base64,${base64}` },
        });
      }

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: contentParts }],
          response_format: { type: 'json_object' },
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const textResponse = json.choices?.[0]?.message?.content;
        if (textResponse) {
          const parsed: AIVisionDiagnosisResult = JSON.parse(textResponse);
          return {
            success: true,
            diagnosis: parsed,
            usedProvider: 'user_openai',
          };
        }
      }
    } catch (err: any) {
      console.warn('OpenAI vision call error:', err);
    }
  }

  // Fallback: Nếu không có API Key hoặc gọi API lỗi, dùng quy tắc nội bộ offline
  const fallbackRes = await requestAIVisionDiagnosis({
    plant_name_hint: params.plantName,
    symptoms: params.symptoms,
    description: params.description,
    region: params.region,
    lang: params.lang,
  });

  return {
    success: fallbackRes.success,
    diagnosis: fallbackRes.diagnosis,
    usedProvider: 'offline_rules',
  };
}
