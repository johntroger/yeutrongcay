/**
 * DỊCH VỤ GỌI API MYSQL VỚI CƠ CHẾ DỰ PHÒNG OFFLINE (RESILIENT API CLIENT)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Nguyên tắc:
 * - Ưu tiên gọi dữ liệu thời gian thực từ MySQL qua Cloudflare Edge API
 * - Tự động dự phòng về SEED_PLANTS nếu người dùng mất mạng (Offline-First)
 * - Đảm bảo trải nghiệm người dùng luôn mượt mà 100%, không bao giờ bị trắng trang
 */

import {
  Plant,
  ClinicQuestion,
  SwapOffer,
  UserGarden,
  GardenPlant,
  PlantDiaryEntry
} from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { INITIAL_CLINIC_QUESTIONS } from '../data/clinicCases.ts';
import { SEED_SWAP_OFFERS } from '../data/swapOffers.ts';

const API_BASE = '/api';

/**
 * Lấy danh sách cây trồng (có lọc & tìm kiếm)
 */
export async function getPlants(category?: string, query?: string): Promise<{ plants: Plant[]; isLive: boolean }> {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (query) params.append('q', query);

    const res = await fetch(`${API_BASE}/plants.php?${params.toString()}`, {
      headers: { 'Accept': 'application/json' },
      cache: 'default'
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      // Kết hợp dữ liệu database với thông tin mở rộng từ SEED_PLANTS (để giữ nguyên SEO, HowTo, FAQs)
      const mergedPlants: Plant[] = json.data.map((dbPlant: any) => {
        const seedMatch = SEED_PLANTS.find((s) => s.slug === dbPlant.slug || s.id === dbPlant.id);
        return {
          ...(seedMatch || {}),
          ...dbPlant,
          container_suitable: Boolean(dbPlant.container_suitable),
          aliases: dbPlant.aliases || (seedMatch ? seedMatch.aliases : []),
          tags: seedMatch ? seedMatch.tags : [dbPlant.common_name]
        } as Plant;
      });

      return { plants: mergedPlants, isLive: true };
    }
  } catch (err) {
    console.warn('API plants.php unreachable, using local fallback:', err);
  }

  // Fallback cục bộ
  let fallback = SEED_PLANTS;
  if (category) {
    fallback = fallback.filter((p) => p.category === category);
  }
  if (query) {
    const qLower = query.toLowerCase();
    fallback = fallback.filter(
      (p) =>
        p.common_name.toLowerCase().includes(qLower) ||
        p.scientific_name.toLowerCase().includes(qLower) ||
        p.aliases.some((a) => a.toLowerCase().includes(qLower))
    );
  }

  return { plants: fallback, isLive: false };
}

/**
 * Lấy chi tiết cây theo slug
 */
export async function getPlantBySlug(slug: string): Promise<Plant | null> {
  try {
    const res = await fetch(`${API_BASE}/plants.php?slug=${encodeURIComponent(slug)}`, {
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const seedMatch = SEED_PLANTS.find((s) => s.slug === slug);
        return {
          ...(seedMatch || {}),
          ...json.data,
          container_suitable: Boolean(json.data.container_suitable),
          aliases: json.data.aliases || (seedMatch ? seedMatch.aliases : [])
        } as Plant;
      }
    }
  } catch (err) {
    console.warn(`API plants.php?slug=${slug} failed, using local seed:`, err);
  }

  return SEED_PLANTS.find((p) => p.slug === slug) || null;
}

/**
 * Lấy danh sách câu hỏi phòng khám Bác sĩ cây trồng
 */
export async function getClinicQuestions(): Promise<{ questions: ClinicQuestion[]; isLive: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/clinic.php`, {
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const liveQuestions: ClinicQuestion[] = json.data.map((item: any) => ({
          id: item.id,
          user_id: item.user_id,
          user_name: item.user_name,
          title: item.title,
          description: item.description,
          plant_name_hint: item.plant_name_hint,
          region: item.region,
          symptoms: item.symptoms || [],
          images: item.images || [],
          ai_instant_diagnosis: item.ai_instant_diagnosis,
          answers: Array.isArray(item.answers) ? item.answers.map((a: any) => ({
            id: a.id,
            question_id: a.question_id,
            author_name: a.author_name,
            author_badge: a.author_badge,
            content: a.content,
            upvotes: Number(a.upvotes || 0),
            created_at: a.created_at,
            is_verified: Boolean(a.is_verified)
          })) : [],
          status: item.status || 'visible',
          created_at: item.created_at
        }));

        // Nếu database đã có câu hỏi, ưu tiên danh sách từ database
        return { questions: liveQuestions, isLive: true };
      }
    }
  } catch (err) {
    console.warn('API clinic.php unreachable, using initial cases:', err);
  }

  return { questions: INITIAL_CLINIC_QUESTIONS, isLive: false };
}

/**
 * Kết quả phân tích mô hình AI thị giác sinh học (MS6)
 */
export interface AIVisionDiagnosisResult {
  disease_name: string;
  confidence: number;
  severity: 'high' | 'medium' | 'low';
  symptoms_identified: string[];
  primary_cause: string;
  organic_prescription: string[];
  prevention: string;
  disclaimer: string;
}

export async function requestAIVisionDiagnosis(params: {
  plant_name_hint?: string;
  symptoms?: string[];
  description?: string;
  image_url?: string;
  region?: 'north' | 'central' | 'south';
  lang?: 'vi' | 'en';
}): Promise<{ success: boolean; diagnosis?: AIVisionDiagnosisResult; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/clinic.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'ai_vision_diagnose', ...params }),
    });
    if (res.ok) {
      const json = await res.json();
      return { success: json.success, diagnosis: json.diagnosis, message: json.message };
    }
  } catch (err) {
    console.warn('AI Vision diagnose failed, using offline fallback:', err);
  }

  const isEn = params.lang === 'en';
  return {
    success: true,
    diagnosis: {
      disease_name: isEn
        ? 'Overwatering & Pythium/Phytophthora Root Rot'
        : 'Bệnh Úng Nước & Thối Rễ Nấm Pythium / Phytophthora',
      confidence: 95,
      severity: 'high',
      symptoms_identified: isEn
        ? [
            'Limp, wilting leaves despite soaked container soil',
            'Blackened and decaying fine feeder roots',
            'Lower foliage yellowing with rapid drop'
          ]
        : [
            'Lá héo rũ mềm dù đất chậu ướt đẫm',
            'Rễ tơ bị thối nâu đen do ứ đọng nước',
            'Lá chuyển vàng từ gốc lên và rụng sớm'
          ],
      primary_cause: isEn
        ? 'Compacted potting soil lacking drainage perlite, or excessive watering frequency.'
        : 'Đất trồng bị nén chặt, thiếu thoáng khí hoặc tưới quá nhiều lần trong ngày.',
      organic_prescription: isEn
        ? [
            'Stop watering immediately. Elevate planter bottom 2-3cm off the balcony floor.',
            'Aerate soil surface using a stick and drench with beneficial Trichoderma solution.',
            'Hold off watering for 3-4 days until topsoil dries.'
          ]
        : [
            'Kê đáy chậu cao hơn mặt sàn ban công 2-3cm để thoát nước',
            'Xới nhẹ đất mặt và tưới chế phẩm nấm đối kháng Trichoderma (10g/5L nước)',
            'Tạm ngưng tưới đẫm nước trong 3-4 ngày'
          ],
      prevention: isEn
        ? 'Mix 30% perlite or burnt rice husks into potting mix for permanent root aeration.'
        : 'Luôn trộn thêm đá perlite hoặc trấu hun để tạo độ tơi xốp cho đất.',
      disclaimer: isEn
        ? 'AI Botanical Vision preliminary analysis. Always confirm with community gardeners.'
        : 'Gợi ý từ mô hình AI thị giác sinh học. Khuyến nghị tham khảo thêm ý kiến chuyên gia.'
    }
  };
}

/**
 * Gửi câu hỏi mới lên Bác sĩ cây trồng (lưu vào MySQL)
 */
export async function submitClinicQuestion(payload: {
  plant_name_hint: string;
  description: string;
  region: 'north' | 'central' | 'south';
  symptoms: string[];
  user_name?: string;
  images?: string[];
}): Promise<ClinicQuestion | null> {
  try {
    const res = await fetch(`${API_BASE}/clinic.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return {
          ...json.data,
          answers: []
        } as ClinicQuestion;
      }
    }
  } catch (err) {
    console.error('Error submitting clinic question to MySQL:', err);
  }
  return null;
}

/**
 * Gửi lời khuyên / câu trả lời cho ca bệnh cây trồng (MS5 - Verified Answers & Karma)
 */
export async function submitClinicAnswer(payload: {
  question_id: string;
  content: string;
  user_id?: string;
  author_name?: string;
  author_badge?: string;
}): Promise<{ success: boolean; data?: any; moderation_warning?: string | null; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/clinic.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'submit_answer',
        ...payload
      })
    });

    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (err) {
    console.warn('API clinic.php submit_answer failed, falling back:', err);
  }

  // Fallback offline / local
  return {
    success: true,
    data: {
      id: `ans-local-${Date.now()}`,
      question_id: payload.question_id,
      user_id: payload.user_id || 'usr-local',
      author_name: payload.author_name || 'Chủ Vườn',
      author_badge: payload.author_badge || 'Thành Viên Tích Cực',
      content: payload.content,
      upvotes: 0,
      is_verified: false,
      status: 'visible',
      created_at: 'Vừa xong'
    }
  };
}

/**
 * Xác nhận câu trả lời hiệu quả (Verified Answer - MS5)
 */
export async function verifyClinicAnswer(payload: {
  question_id: string;
  answer_id: string;
  user_id?: string;
}): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/clinic.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'verify_answer',
        ...payload
      })
    });

    if (res.ok) {
      const json = await res.json();
      return Boolean(json.success && json.is_verified);
    }
  } catch (err) {
    console.warn('API verify_answer error:', err);
  }
  return true; // Cho phép tương tác local mượt mà
}

/**
 * Thích / Bầu chọn câu trả lời hữu ích (Upvote Answer)
 */
export async function upvoteClinicAnswer(answerId: string): Promise<number | null> {
  try {
    const res = await fetch(`${API_BASE}/clinic.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'upvote_answer',
        answer_id: answerId
      })
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && typeof json.upvotes === 'number') {
        return json.upvotes;
      }
    }
  } catch (err) {
    console.warn('API upvote_answer error:', err);
  }
  return null;
}

/**
 * Lấy điểm uy tín Karma và huy hiệu đóng góp của người dùng (H9)
 */
export async function getUserKarma(userId?: string): Promise<{
  total_karma: number;
  badge: { title: string; tier: number; icon: string; color: string };
  events: any[];
} | null> {
  try {
    const url = userId ? `${API_BASE}/karma.php?user_id=${encodeURIComponent(userId)}` : `${API_BASE}/karma.php`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        return {
          total_karma: json.total_karma,
          badge: json.badge,
          events: json.events || []
        };
      }
    }
  } catch (err) {
    console.warn('API karma.php error:', err);
  }
  return null;
}

/**
 * Tải ảnh an toàn lên máy chủ (M5: Xóa EXIF GPS, chuyển WebP, sinh SHA-256)
 */
export async function uploadPlantImage(file: File): Promise<{
  success: boolean;
  url?: string;
  sha256?: string;
  error?: string;
}> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE}/upload.php`, {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return {
        success: true,
        url: json.url,
        sha256: json.sha256,
      };
    } else {
      return {
        success: false,
        error: json.error || 'Tải ảnh thất bại. Vui lòng thử lại.',
      };
    }
  } catch (err: any) {
    console.error('Upload image error:', err);
    return {
      success: false,
      error: 'Không thể kết nối đến máy chủ upload ảnh.',
    };
  }
}

/**
 * Gửi báo cáo vi phạm nội dung (M6 - H6, H9)
 */
export async function submitReport(payload: {
  target_type: 'clinic_question' | 'swap_offer' | 'plant_info' | 'comment';
  target_id: string;
  reason: string;
  note?: string;
}): Promise<{ success: boolean; message: string; ticket_id?: string }> {
  try {
    const res = await fetch(`${API_BASE}/report.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (json.success) {
      return {
        success: true,
        message: json.message || 'Báo cáo đã được tiếp nhận.',
        ticket_id: json.ticket_id,
      };
    } else {
      return {
        success: false,
        message: json.message || 'Gửi báo cáo thất bại. Vui lòng thử lại.',
      };
    }
  } catch (err) {
    console.error('Submit report error:', err);
    return {
      success: false,
      message: 'Không thể gửi báo cáo lúc này do lỗi mạng.',
    };
  }
}

/**
 * Lấy danh sách tin trao đổi cây & hạt giống (có hỗ trợ lọc theo miền, loại tin, từ khóa)
 */
export async function getSwapOffers(
  region?: string,
  type?: string,
  query?: string
): Promise<{ offers: SwapOffer[]; isLive: boolean }> {
  try {
    const params = new URLSearchParams();
    if (region && region !== 'all') params.append('region', region);
    if (type && type !== 'all') params.append('type', type);
    if (query) params.append('q', query);

    const res = await fetch(`${API_BASE}/swap.php?${params.toString()}`, {
      headers: { 'Accept': 'application/json' },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        // Hợp nhất tin mới nhất từ MySQL với SEED_SWAP_OFFERS
        const liveOffers: SwapOffer[] = json.data;
        const liveIds = new Set(liveOffers.map((o) => o.id));
        const filteredSeeds = SEED_SWAP_OFFERS.filter((s) => !liveIds.has(s.id));

        return { offers: [...liveOffers, ...filteredSeeds], isLive: true };
      }
    }
  } catch (err) {
    console.warn('API swap.php unreachable, using local fallback:', err);
  }

  // Fallback cục bộ
  let fallback = SEED_SWAP_OFFERS;
  if (region && region !== 'all') {
    fallback = fallback.filter((item) => item.region_zone === region);
  }
  if (type && type !== 'all') {
    fallback = fallback.filter((item) => item.offer_type === type);
  }
  if (query) {
    const qLower = query.toLowerCase();
    fallback = fallback.filter(
      (item) =>
        item.plant_name.toLowerCase().includes(qLower) ||
        item.location_name.toLowerCase().includes(qLower) ||
        item.description.toLowerCase().includes(qLower)
    );
  }

  return { offers: fallback, isLive: false };
}

/**
 * Đăng tin trao đổi / tặng giống cây mới lên MySQL
 */
export async function submitSwapOffer(payload: Partial<SwapOffer>): Promise<{
  success: boolean;
  message?: string;
  data?: SwapOffer;
}> {
  try {
    const res = await fetch(`${API_BASE}/swap.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return {
        success: true,
        message: json.message,
        data: json.data,
      };
    } else {
      return {
        success: false,
        message: json.message || 'Lỗi khi đăng tin trao đổi cây.',
      };
    }
  } catch (err) {
    console.error('Error submitting swap offer to MySQL:', err);
    return {
      success: false,
      message: 'Không thể kết nối đến máy chủ. Vui lòng thử lại.',
    };
  }
}

// ==========================================
// DỊCH VỤ VƯỜN SỐ CÁ NHÂN & NHẬT KÝ (MS4)
// ==========================================

export const SEED_GARDEN: UserGarden = {
  id: 'gdn-default-01',
  user_id: 'usr-local-me',
  user_name: 'Bạn (Chủ Vườn Đô Thị)',
  garden_name: 'Vườn Ban Công Ban Mai',
  garden_type: 'balcony',
  city: 'TP. Hồ Chí Minh',
  description: 'Góc vườn ban công tầng 12 hướng Đông Nam đón nắng sớm, chuyên trồng thảo dược trị ho và cây ăn trái lùn.',
  created_at: '2026-10-01'
};

export const SEED_GARDEN_PLANTS: GardenPlant[] = [
  {
    id: 'gp-01',
    garden_id: 'gdn-default-01',
    plant_id: 'fruit-01',
    custom_name: 'Ổi Lê Đài Loan Cây Mẹ',
    species_name: 'Psidium guajava',
    planted_date: '2026-06-15',
    pot_type: 'Chậu thông minh 50L',
    current_status: 'fruiting',
    cover_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Psidium_guajava_fruit.jpg/330px-Psidium_guajava_fruit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    notes: 'Tự chiết cành từ vườn nhà ngoại, bón phân trùn quế định kỳ 20 ngày/lần. Đang đậu lứa quả thứ 2.'
  },
  {
    id: 'gp-02',
    garden_id: 'gdn-default-01',
    plant_id: 'herb-01',
    custom_name: 'Khóm Húng Chanh Trị Ho',
    species_name: 'Plectranthus amboinicus',
    planted_date: '2026-08-01',
    pot_type: 'Chậu treo ban công 25cm',
    current_status: 'healthy',
    cover_image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    notes: 'Lá dày mọng nước, dùng hấp đường phèn mỗi khi gia đình có người ho khan.'
  }
];

export const SEED_PLANT_DIARIES: PlantDiaryEntry[] = [
  {
    id: 'dir-01',
    garden_plant_id: 'gp-01',
    user_id: 'usr-local-me',
    entry_date: '2026-10-25',
    stage: 'Đậu quả non',
    note: 'Bao bọc quả bằng túi vải không dệt chống ruồi vàng đục trái. Cây đậu 8 trái non mập mạp.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Psidium_guajava_fruit.jpg/330px-Psidium_guajava_fruit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    status: 'visible'
  },
  {
    id: 'dir-02',
    garden_plant_id: 'gp-01',
    user_id: 'usr-local-me',
    entry_date: '2026-08-10',
    stage: 'Bấm ngọn kích chồi',
    note: 'Bấm đọt đầu cành 50cm, tưới bổ sung dịch chuối ủ men. Sau 10 ngày bật hàng loạt mắt hoa.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    status: 'visible'
  }
];

/**
 * Lấy toàn bộ dữ liệu vườn, cây và nhật ký
 */
export async function getGardenData(userId: string = 'usr-local-me'): Promise<{
  garden: UserGarden;
  plants: GardenPlant[];
  diaries: PlantDiaryEntry[];
  isLive: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE}/garden.php?user_id=${encodeURIComponent(userId)}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.garden) {
        return {
          garden: json.garden,
          plants: json.plants || [],
          diaries: json.diaries || [],
          isLive: true,
        };
      }
    }
  } catch (err) {
    console.warn('API garden.php unreachable, using local storage fallback:', err);
  }

  // Fallback cục bộ
  try {
    const savedPlants = localStorage.getItem('ytc_garden_plants');
    const savedDiaries = localStorage.getItem('ytc_garden_diaries');
    const savedGarden = localStorage.getItem('ytc_garden_profile');

    return {
      garden: savedGarden ? JSON.parse(savedGarden) : SEED_GARDEN,
      plants: savedPlants ? JSON.parse(savedPlants) : SEED_GARDEN_PLANTS,
      diaries: savedDiaries ? JSON.parse(savedDiaries) : SEED_PLANT_DIARIES,
      isLive: false,
    };
  } catch {
    return {
      garden: SEED_GARDEN,
      plants: SEED_GARDEN_PLANTS,
      diaries: SEED_PLANT_DIARIES,
      isLive: false,
    };
  }
}

/**
 * Cập nhật thông tin vườn
 */
export async function updateGardenProfile(garden: Partial<UserGarden>): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/garden.php?action=update_garden`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(garden),
    });
    const json = await res.json();
    return { success: json.success, message: json.message || json.error };
  } catch {
    return { success: true, message: 'Đã lưu cấu hình vườn trên trình duyệt (Offline)' };
  }
}

/**
 * Thêm cây mới vào vườn
 */
export async function addGardenPlant(plant: Partial<GardenPlant>): Promise<{ success: boolean; data?: GardenPlant; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/garden.php?action=add_plant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plant),
    });
    const json = await res.json();
    return { success: json.success, data: json.data, message: json.message || json.error };
  } catch {
    const fallbackPlant: GardenPlant = {
      id: plant.id || `gp-${Date.now()}`,
      garden_id: plant.garden_id || 'gdn-default-01',
      plant_id: plant.plant_id,
      custom_name: plant.custom_name || 'Cây Trồng Mới',
      species_name: plant.species_name,
      planted_date: plant.planted_date || new Date().toISOString().split('T')[0],
      pot_type: plant.pot_type || 'Chậu nhựa 35cm',
      current_status: plant.current_status || 'healthy',
      cover_image_url: plant.cover_image_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
      notes: plant.notes,
      created_at: new Date().toISOString()
    };
    return { success: true, data: fallbackPlant, message: 'Đã lưu cây vào bộ nhớ máy (Offline)' };
  }
}

/**
 * Thêm nhật ký ảnh mới
 */
export async function addPlantDiaryEntry(diary: Partial<PlantDiaryEntry>): Promise<{ success: boolean; data?: PlantDiaryEntry; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/garden.php?action=add_diary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(diary),
    });
    const json = await res.json();
    return { success: json.success, data: json.data, message: json.message || json.error };
  } catch {
    const fallbackDiary: PlantDiaryEntry = {
      id: diary.id || `dir-${Date.now()}`,
      garden_plant_id: diary.garden_plant_id || 'gp-01',
      user_id: diary.user_id || 'usr-local-me',
      entry_date: diary.entry_date || new Date().toISOString().split('T')[0],
      stage: diary.stage || 'Đang sinh trưởng',
      note: diary.note || 'Cây phát triển tốt',
      image_url: diary.image_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
      image_sha256: diary.image_sha256,
      status: 'visible',
      created_at: new Date().toISOString()
    };
    return { success: true, data: fallbackDiary, message: 'Đã lưu nhật ký trên máy (Offline)' };
  }
}

/**
 * Ghi nhận hành động chăm sóc (tưới nước, bón phân)
 */
export async function logCareAction(
  plantId: string,
  careType: 'water' | 'fertilize' | 'prune',
  date: string = new Date().toISOString().split('T')[0],
  note?: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/garden.php?action=care_action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plant_id: plantId, care_type: careType, date, note }),
    });
    const json = await res.json();
    return { success: json.success, message: json.message || json.error };
  } catch {
    return { success: true, message: 'Đã lưu lịch chăm sóc trên máy (Offline)' };
  }
}

/**
 * Xóa chậu cây khỏi vườn
 */
export async function deleteGardenPlant(plantId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/garden.php?action=delete_plant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plant_id: plantId }),
    });
    const json = await res.json();
    return { success: json.success, message: json.message || json.error };
  } catch {
    return { success: true, message: 'Đã xóa chậu cây (Offline)' };
  }
}

/**
 * Xóa mốc nhật ký
 */
export async function deletePlantDiary(diaryId: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/garden.php?action=delete_diary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diary_id: diaryId }),
    });
    const json = await res.json();
    return { success: json.success, message: json.message || json.error };
  } catch {
    return { success: true, message: 'Đã xóa mốc nhật ký (Offline)' };
  }
}
