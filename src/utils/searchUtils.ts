import { Plant } from '../types/index.ts';
import { PLANT_ENGLISH_MAP } from '../i18n/plantTranslations.ts';

/**
 * Chuẩn hóa chuỗi tiếng Việt: chuyển chữ thường, bỏ dấu thanh, xử lý ký tự đ/Đ.
 */
export function normalizeVietnamese(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
}

/**
 * Danh sách tiền tố/từ đệm mà người Việt rất hay gõ trước tên cây.
 * Ví dụ: "cây ổi" -> từ khóa gốc là "ổi", "lá lốt" -> "lốt", "quả chanh" -> "chanh"
 */
const VIETNAMESE_STOP_PREFIXES = [
  'cây ', 'cay ',
  'cây giống ', 'cay giong ',
  'giống cây ', 'giong cay ',
  'giống ', 'giong ',
  'lá ', 'la ',
  'trái ', 'trai ',
  'quả ', 'qua ',
  'củ ', 'cu ',
  'hoa ',
  'bệnh ', 'benh ',
  'rừng ', 'rung ',
  'vườn quốc gia ', 'vuon quoc gia ',
  'vqg ',
  'khu bảo tồn ', 'khu bao ton ',
  'bản vẽ ', 'ban ve ',
  'mô hình ', 'mo hinh ',
  'sáng chế ', 'sang che ',
  'công thức ', 'cong thuc ',
  'trà ', 'tra ',
  'siro '
];

/**
 * Kiểm tra xem một cây có khớp với từ khóa tìm kiếm hay không.
 * Hỗ trợ:
 * - Có dấu & không dấu (cây ổi <-> cay oi)
 * - Tự động lược bỏ tiền tố đệm (cây, lá, quả, giống)
 * - Tìm theo tên thường gọi, tên khoa học, tên khác (aliases), thẻ phân loại (tags), công dụng
 * - Hỗ trợ cả tên tiếng Anh (English common name & aliases)
 */
export function matchPlantSearch(plant: Plant, rawQuery: string): boolean {
  const query = rawQuery.trim();
  if (!query) return true;

  const qLower = query.toLowerCase();
  const qNorm = normalizeVietnamese(query);

  // Lược bỏ tiền tố tiếng Việt (ví dụ "cây ổi" -> strippedQuery = "ổi")
  let strippedQuery = qLower;
  let strippedNorm = qNorm;
  for (const prefix of VIETNAMESE_STOP_PREFIXES) {
    if (strippedQuery.startsWith(prefix)) {
      strippedQuery = strippedQuery.slice(prefix.length).trim();
    }
    const normPrefix = normalizeVietnamese(prefix);
    if (strippedNorm.startsWith(normPrefix)) {
      strippedNorm = strippedNorm.slice(normPrefix.length).trim();
    }
  }

  // Dữ liệu tiếng Anh
  const enData = PLANT_ENGLISH_MAP[plant.id];

  // Tập hợp các trường tìm kiếm tiếng Việt
  const viFields = [
    plant.common_name,
    plant.scientific_name,
    ...(plant.aliases || []),
    ...(plant.tags || []),
    plant.description || '',
    plant.quick_answer || '',
    ...(plant.medical_info?.uses || []),
    ...(plant.medical_info?.folk_remedies || [])
  ];

  // Tập hợp các trường tìm kiếm tiếng Anh
  const enFields = enData
    ? [
        enData.common_name || '',
        ...(enData.aliases || []),
        ...(enData.tags || []),
        enData.description || '',
        enData.quick_answer || ''
      ]
    : [];

  const combinedRaw = [...viFields, ...enFields].join(' ').toLowerCase();
  const combinedNorm = normalizeVietnamese(combinedRaw);

  // 1. Kiểm tra khớp toàn bộ chuỗi ban đầu (cả có dấu và không dấu)
  if (combinedRaw.includes(qLower) || combinedNorm.includes(qNorm)) {
    return true;
  }

  // 2. Kiểm tra khớp chuỗi sau khi lược bỏ từ đệm (ví dụ "ổi")
  if (strippedQuery && (combinedRaw.includes(strippedQuery) || combinedNorm.includes(strippedNorm))) {
    return true;
  }

  // 3. Kiểm tra khớp từng từ khóa riêng lẻ (tất cả các từ đều phải có mặt)
  const tokens = qNorm
    .split(/\s+/)
    .filter(
      (t) =>
        t.length > 0 &&
        !['cay', 'la', 'cu', 'qua', 'trai', 'giong', 'hoa', 'benh'].includes(t)
    );

  if (tokens.length > 0 && tokens.every((token) => combinedNorm.includes(token))) {
    return true;
  }

  return false;
}

/**
 * Tính điểm độ liên quan (Relevance Score) để sắp xếp kết quả tìm kiếm tốt nhất lên đầu
 */
export function calculateRelevance(plant: Plant, rawQuery: string): number {
  const query = rawQuery.trim().toLowerCase();
  const qNorm = normalizeVietnamese(query);

  let score = 0;
  const nameLower = plant.common_name.toLowerCase();
  const nameNorm = normalizeVietnamese(nameLower);

  // Khớp chính xác tên cây
  if (nameLower === query || nameNorm === qNorm) score += 100;
  else if (nameLower.startsWith(query) || nameNorm.startsWith(qNorm)) score += 50;
  else if (nameLower.includes(query) || nameNorm.includes(qNorm)) score += 30;

  // Khớp tên khoa học
  if (plant.scientific_name.toLowerCase().includes(query)) score += 25;

  // Khớp tên phụ (aliases)
  if (plant.aliases?.some((a) => a.toLowerCase().includes(query) || normalizeVietnamese(a).includes(qNorm))) {
    score += 20;
  }

  // Khớp tag
  if (plant.tags?.some((t) => t.toLowerCase().includes(query) || normalizeVietnamese(t).includes(qNorm))) {
    score += 10;
  }

  return score;
}

/**
 * Tìm kiếm danh sách cây và sắp xếp theo độ liên quan
 */
export function searchPlantsList(plants: Plant[], query: string, limit?: number): Plant[] {
  if (!query.trim()) return plants;

  const matched = plants.filter((p) => matchPlantSearch(p, query));

  matched.sort((a, b) => {
    return calculateRelevance(b, query) - calculateRelevance(a, query);
  });

  return limit ? matched.slice(0, limit) : matched;
}
