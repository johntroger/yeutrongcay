/**
 * DỊCH VỤ GỌI API MYSQL VỚI CƠ CHẾ DỰ PHÒNG OFFLINE (RESILIENT API CLIENT)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Nguyên tắc:
 * - Ưu tiên gọi dữ liệu thời gian thực từ MySQL qua Cloudflare Edge API
 * - Tự động dự phòng về SEED_PLANTS nếu người dùng mất mạng (Offline-First)
 * - Đảm bảo trải nghiệm người dùng luôn mượt mà 100%, không bao giờ bị trắng trang
 */

import { Plant, ClinicQuestion } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { INITIAL_CLINIC_QUESTIONS } from '../data/clinicCases.ts';

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
          answers: [],
          status: item.status || 'visible',
          created_at: item.created_at
        }));

        // Ghép câu hỏi mới nhất từ database lên đầu danh sách mẫu
        return { questions: [...liveQuestions, ...INITIAL_CLINIC_QUESTIONS], isLive: true };
      }
    }
  } catch (err) {
    console.warn('API clinic.php unreachable, using initial cases:', err);
  }

  return { questions: INITIAL_CLINIC_QUESTIONS, isLive: false };
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
