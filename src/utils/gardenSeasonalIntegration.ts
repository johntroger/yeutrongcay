/**
 * KẾT NỐI HAI CHIỀU GIỮA KHU VƯỜN CỦA TÔI & LỊCH NÔNG VỤ ĐÔ THỊ
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 */

import type { GardenPlant, Plant } from '../types/index.ts';
import type { RegionKey } from '../data/seasonalCalendar.ts';

export interface PlantSeasonalEvaluation {
  isPeakSeason: boolean;
  statusLabelVi: string;
  statusLabelEn: string;
  statusColor: string;
  regionalAdviceVi: string;
  regionalAdviceEn: string;
  warningVi?: string;
  warningEn?: string;
  sunlightNoteVi: string;
  sunlightNoteEn: string;
}

/**
 * Tìm kiếm thông tin loài cây chuẩn trong SEED_PLANTS từ một chậu cây trong vườn của người dùng
 */
export function matchGardenPlantToSeedPlant(
  gardenPlant: GardenPlant,
  seedPlants: Plant[]
): Plant | undefined {
  if (gardenPlant.plant_id) {
    const foundById = seedPlants.find((p) => p.id === gardenPlant.plant_id);
    if (foundById) return foundById;
  }

  const targetName = (gardenPlant.custom_name || '').toLowerCase().trim();
  const speciesName = (gardenPlant.species_name || '').toLowerCase().trim();

  // 1. Khớp chính xác
  const exact = seedPlants.find((p) => {
    const c = p.common_name.toLowerCase().trim();
    const s = p.scientific_name.toLowerCase().trim();
    return c === targetName || (speciesName && s === speciesName);
  });
  if (exact) return exact;

  // 2. Khớp chuỗi con đầy đủ
  const sub = seedPlants.find((p) => {
    const c = p.common_name.toLowerCase().trim();
    return (
      (targetName.length > 2 && c.includes(targetName)) ||
      (c.length > 2 && targetName.includes(c))
    );
  });
  if (sub) return sub;

  // 3. Khớp cụm 2 từ liên tiếp (Bigram) ví dụ "dâu tây", "húng chanh", "hoa hồng", "ổi lê"
  const stopWords = new Set(['cây', 'chậu', 'thùng', 'xốp', 'ban', 'công', 'vườn', 'nhà', 'trồng', 'mini', 'đà', 'lạt']);
  const words = targetName.split(/\s+/).filter((w) => w.length > 1 && !stopWords.has(w));

  if (words.length >= 2) {
    for (let i = 0; i < words.length - 1; i++) {
      const bigram = `${words[i]} ${words[i + 1]}`;
      const foundBigram = seedPlants.find((p) => p.common_name.toLowerCase().includes(bigram));
      if (foundBigram) return foundBigram;
    }
  }

  // 4. Khớp từ đơn đặc trưng
  for (const word of words) {
    if (word.length >= 3) {
      const foundWord = seedPlants.find((p) => p.common_name.toLowerCase().includes(word));
      if (foundWord) return foundWord;
    }
  }

  return undefined;
}

/**
 * Đánh giá tình trạng mùa vụ và sinh trưởng của một loài cây trong tháng và miền cụ thể
 */
export function evaluatePlantSeasonality(
  plant: Plant,
  month: number,
  region: RegionKey
): PlantSeasonalEvaluation {
  const seasonality = plant.seasonality;
  const bestMonths = seasonality?.best_months || [];
  const isPeakSeason = bestMonths.includes(month);

  const regionAdviceMap = {
    north: seasonality?.north || 'Phù hợp phát triển trong điều kiện ánh sáng đầy đủ và giữ ẩm vừa phải.',
    central: seasonality?.central || 'Cần chú ý thoát nước nhanh khi có mưa dầm và che nắng trưa gắt.',
    south: seasonality?.south || 'Sinh trưởng mạnh quanh năm dưới nắng nhiệt đới, cần tưới đẫm sáng sớm.'
  };

  const sunlightAdviceMap = {
    full_sun: { vi: 'Cần nắng trực tiếp tối thiểu 5-6 tiếng/ngày', en: 'Requires 5-6 hours of direct sun daily' },
    partial_shade: { vi: 'Ưa nắng tán xạ nhẹ buổi sáng, tránh nắng gắt trưa', en: 'Prefers gentle morning sun, avoid harsh midday sun' },
    indoor: { vi: 'Thích hợp nơi râm mát hoặc trong nhà thoáng gió', en: 'Thrives in bright indirect light or ventilated indoors' }
  };

  const sunlightNote = sunlightAdviceMap[plant.sunlight] || sunlightAdviceMap.partial_shade;

  if (isPeakSeason) {
    return {
      isPeakSeason: true,
      statusLabelVi: 'Vụ Vàng Sinh Trưởng',
      statusLabelEn: 'Peak Growth Season',
      statusColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
      regionalAdviceVi: regionAdviceMap[region],
      regionalAdviceEn: `Optimal climate this month. ${regionAdviceMap[region]}`,
      warningVi: seasonality?.warning,
      warningEn: seasonality?.warning ? `Caution: ${seasonality.warning}` : undefined,
      sunlightNoteVi: sunlightNote.vi,
      sunlightNoteEn: sunlightNote.en
    };
  }

  return {
    isPeakSeason: false,
    statusLabelVi: 'Chăm Sóc Giữ Sức',
    statusLabelEn: 'Maintenance Season',
    statusColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700',
    regionalAdviceVi: regionAdviceMap[region],
    regionalAdviceEn: `Moderate growth window. ${regionAdviceMap[region]}`,
    warningVi: seasonality?.warning || 'Hạn chế bón phân hóa học đậm đặc, ưu tiên giữ ẩm gốc và phòng ngừa sâu bệnh.',
    warningEn: seasonality?.warning || 'Avoid strong synthetic fertilizers; focus on root health and pest prevention.',
    sunlightNoteVi: sunlightNote.vi,
    sunlightNoteEn: sunlightNote.en
  };
}
