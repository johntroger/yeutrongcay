/**
 * DỊCH VỤ GAME HÓA LÀM VƯỜN ĐÔ THỊ & HỆ THỐNG ĐỔI TIM - YEUTRONGECAY.COM
 * 
 * Quản lý:
 * 1. Bảng giá & Túi đồ nghề sinh thái (Nước, Túi Phân hữu cơ, Đất, Nắng, Xịt thảo mộc).
 * 2. Bộ tính toán sinh trưởng thích ứng theo loài cây (Adaptive Phenological Engine).
 * 3. Thuật toán suy giảm trạng thái lười theo thời gian thực (Lazy State Evaluation).
 * 4. Vùng sinh thái tối ưu (60% - 85%) & Cảnh báo an toàn sinh học (chống úng rễ, xót phân).
 * 5. Điều kiện mở khóa đúc NFT Hộ Chiếu Cây On-Chain thật trên Ethereum Sepolia.
 * 6. Bộ tổng hợp âm thanh Web Audio API Synth (0KB).
 */

import type { GardenPlant, GardenCareItemType, UserInventoryItem, PlantGrowthProfile, PlantCareActionResult } from '../types/index.ts';
import { CROP_PRESETS } from '../utils/cropTimelineCalculator.ts';
import { SEED_PLANTS } from '../data/plants.ts';

// 1. DANH MỤC VẬT PHẨM SINH THÁI ĐỔI TIM (ECO-ITEMS CATALOG)
export const GARDEN_ECO_ITEMS: Record<GardenCareItemType, Omit<UserInventoryItem, 'quantity'>> = {
  water: {
    item_type: 'water',
    name_vi: 'Bình Nước Mưa Ủ Vi Sinh',
    name_en: 'Bio-Conditioned Rainwater',
    icon: '💧',
    heart_price: 10,
    description_vi: 'Hồi phục +35% độ ẩm cho đất, giải tỏa cơn khát cho rễ non.',
    description_en: 'Restores +35% soil moisture, replenishes hydration for young roots.',
    exp_boost: 30,
    vital_target: 'moisture',
    vital_increase: 35
  },
  fertilizer: {
    item_type: 'fertilizer',
    name_vi: 'Túi Phân Trùn Quế Hữu Cơ',
    name_en: 'Organic Worm Castings Pouch',
    icon: '👝',
    heart_price: 20,
    description_vi: 'Cung cấp +40% dinh dưỡng vi sinh, kích thích ra rễ và bật chồi.',
    description_en: 'Provides +40% organic nutrients, stimulates rooting and leaf sprouting.',
    exp_boost: 50,
    vital_target: 'nutrient',
    vital_increase: 40
  },
  soil: {
    item_type: 'soil',
    name_vi: 'Bao Đất Vi Sinh Giàu Mùn',
    name_en: 'Bio-Active Humus Potting Soil',
    icon: '🪴',
    heart_price: 30,
    description_vi: 'Phục hồi +50% độ xốp và phì nhiêu cho đất chậu bị chai cứng.',
    description_en: 'Restores +50% soil structure, prevents compaction in urban pots.',
    exp_boost: 40,
    vital_target: 'soil',
    vital_increase: 50
  },
  sunlight: {
    item_type: 'sunlight',
    name_vi: 'Nắng Ban Mai / Đèn Quang Hợp',
    name_en: 'Morning Sunlight / Growth Light',
    icon: '☀️',
    heart_price: 15,
    description_vi: 'Bổ sung +50% năng lượng quang năng, xúc tác quá trình diệp lục.',
    description_en: 'Adds +50% photosynthetic energy, boosts chlorophyll synthesis.',
    exp_boost: 25,
    vital_target: 'sunlight',
    vital_increase: 50
  },
  spray: {
    item_type: 'spray',
    name_vi: 'Bình Xịt Thảo Mộc Tỏi Ớt Gừng',
    name_en: 'Herbal Garlic-Ginger Neem Spray',
    icon: '🌿',
    heart_price: 25,
    description_vi: 'Xua đuổi rệp bọ, nấm trắng, hồi phục cây ốm yếu về trạng thái khỏe mạnh.',
    description_en: 'Repels pests, aphids, and restores wilting plants back to healthy state.',
    exp_boost: 35,
    vital_target: 'health',
    vital_increase: 50
  },
  seeds: {
    item_type: 'seeds',
    name_vi: 'Gói Hạt Giống Nông Sản Bản Địa',
    name_en: 'Native Heirloom Harvest Seeds',
    icon: '🌱',
    heart_price: 15,
    description_vi: 'Hạt giống thuần chủng thu hoạch từ cây trưởng thành, dùng để gửi Staking DeFi hoặc bán đổi Tim/EXP.',
    description_en: 'Native heirloom seeds harvested from mature plants, used for DeFi Staking or trading for Hearts/EXP.',
    exp_boost: 0,
    vital_target: 'moisture',
    vital_increase: 0
  }
};

export const INITIAL_USER_INVENTORY: Record<GardenCareItemType, number> = {
  water: 3,
  fertilizer: 2,
  soil: 1,
  sunlight: 2,
  spray: 1,
  seeds: 10
};

export const STORAGE_KEY_INVENTORY = 'ytc_garden_inventory';

// 2. BỘ TÍNH TOÁN SINH TRƯỞNG THEO LOÀI (ADAPTIVE PHENOLOGY CALCULATOR)
export function getPlantGrowthProfile(plantName: string, plantId?: string): PlantGrowthProfile {
  // 1. Thử khớp với CROP_PRESETS từ bộ tính toán nông học
  const matchedPreset = CROP_PRESETS.find(
    (cp) => (plantId && cp.id === plantId) || 
            plantName.toLowerCase().includes(cp.name_vi.toLowerCase()) || 
            cp.name_vi.toLowerCase().includes(plantName.toLowerCase())
  );

  let baseDays = 75; // Mặc định 75 ngày (chuẩn cà chua bi)
  let category: PlantGrowthProfile['category'] = 'fruit';
  let sciName = 'Solanum lycopersicum';

  if (matchedPreset) {
    baseDays = matchedPreset.total_days_to_harvest;
    category = matchedPreset.category === 'herb' ? 'herb' : matchedPreset.category === 'flower' ? 'flower' : 'fruit';
  } else {
    // 2. Thử khớp với danh mục SEED_PLANTS (50 loài chuẩn)
    const seed = SEED_PLANTS.find(
      (s) => (plantId && s.id === plantId) || 
             plantName.toLowerCase().includes(s.common_name.toLowerCase()) || 
             s.common_name.toLowerCase().includes(plantName.toLowerCase())
    );

    if (seed) {
      sciName = seed.scientific_name;
      const gTime = seed.growth_time.toLowerCase();
      if (gTime.includes('tháng') || gTime.includes('năm')) {
        baseDays = gTime.includes('năm') ? 180 : 120;
        category = seed.category === 'herb' ? 'root' : 'fruit';
      } else {
        const matchDays = gTime.match(/(\d+)\s*ngày/);
        baseDays = matchDays ? parseInt(matchDays[1], 10) : 45;
        category = seed.category === 'herb' ? 'herb' : (seed.category === 'ornamental' ? 'flower' : 'fruit');
      }
    } else {
      // 3. Phân loại theo từ khóa tên cây
      const lower = plantName.toLowerCase();
      if (lower.includes('húng') || lower.includes('diếp cá') || lower.includes('ngò') || lower.includes('hẹ') || lower.includes('rau thơm')) {
        baseDays = 30;
        category = 'herb';
      } else if (lower.includes('dưa') || lower.includes('đậu')) {
        baseDays = 50;
        category = 'fruit';
      } else if (lower.includes('cải') || lower.includes('xà lách') || lower.includes('muống')) {
        baseDays = 35;
        category = 'veggie';
      } else if (lower.includes('hoa')) {
        baseDays = 60;
        category = 'flower';
      } else if (lower.includes('gừng') || lower.includes('nghệ') || lower.includes('sả') || lower.includes('đinh lăng')) {
        baseDays = 150;
        category = 'root';
      }
    }
  }

  // Tính target EXP co giãn theo chu kỳ ngày
  let targetExp = 1100;
  if (baseDays <= 35) targetExp = 600;
  else if (baseDays <= 55) targetExp = 850;
  else if (baseDays <= 85) targetExp = 1100;
  else if (baseDays <= 120) targetExp = 1400;
  else targetExp = 1800;

  // 5 mốc sinh học BBCH scale: 10% -> 30% -> 60% -> 80% -> 100%
  const stageThresholds = [
    {
      stage: 1,
      name_vi: 'Hạt mầm nhú mầm',
      name_en: 'Sprouting & Emergence',
      icon: '🌱',
      exp_required: Math.round(targetExp * 0.1),
      day_offset: Math.max(2, Math.round(baseDays * 0.1))
    },
    {
      stage: 2,
      name_vi: 'Cây non bén rễ',
      name_en: 'Seedling & Root Establishment',
      icon: '🌿',
      exp_required: Math.round(targetExp * 0.3),
      day_offset: Math.max(5, Math.round(baseDays * 0.3))
    },
    {
      stage: 3,
      name_vi: 'Sinh trưởng thân lá sum suê',
      name_en: 'Vegetative Foliage Growth',
      icon: '🌳',
      exp_required: Math.round(targetExp * 0.6),
      day_offset: Math.max(12, Math.round(baseDays * 0.6))
    },
    {
      stage: 4,
      name_vi: category === 'herb' || category === 'veggie' ? 'Bật chồi nhánh non' : 'Đơm nụ & trổ hoa',
      name_en: category === 'herb' || category === 'veggie' ? 'Branching & Vigorous Shoots' : 'Budding & Blooming',
      icon: '🌸',
      exp_required: Math.round(targetExp * 0.8),
      day_offset: Math.max(18, Math.round(baseDays * 0.8))
    },
    {
      stage: 5,
      name_vi: category === 'herb' || category === 'veggie' ? 'Trưởng thành lý tưởng để thu hái' : 'Đậu quả & thu hoạch mùa vàng',
      name_en: category === 'herb' || category === 'veggie' ? 'Prime Maturity for Harvest' : 'Fruiting & Golden Harvest',
      icon: '🍎',
      exp_required: targetExp,
      day_offset: baseDays
    }
  ];

  return {
    plant_id: plantId,
    plant_name: plantName,
    scientific_name: sciName,
    category,
    base_maturity_days: baseDays,
    target_exp: targetExp,
    stage_thresholds: stageThresholds
  };
}

// 3. KIỂM TRA AN TOÀN SINH THÁI (CHỐNG ÚNG RỄ, CHỐNG XÓT PHÂN)
export function canApplyCareAction(
  plant: GardenPlant,
  actionType: GardenCareItemType
): { canApply: boolean; reason_vi?: string; reason_en?: string } {
  const moisture = plant.moisture_level ?? 80;
  const nutrients = plant.nutrient_level ?? 75;

  if (actionType === 'water' && moisture >= 90) {
    return {
      canApply: false,
      reason_vi: 'Đất chậu đang rất ẩm (≥90%). Tưới thêm lúc này dễ gây úng và thối rễ non!',
      reason_en: 'Soil is already saturated (≥90%). Adding more water risks root rot!'
    };
  }

  if (actionType === 'fertilizer' && nutrients >= 85) {
    return {
      canApply: false,
      reason_vi: 'Dinh dưỡng trong đất đang bão hòa (≥85%). Bón thêm lúc này có thể gây xót rễ, cháy lá!',
      reason_en: 'Nutrient concentration is saturated (≥85%). Adding fertilizer may cause chemical root burn!'
    };
  }

  return { canApply: true };
}

// 4. THUẬT TOÁN ĐÁNH GIÁ TRẠNG THÁI LƯỜI (LAZY STATE EVALUATION)
export function evaluateLazyPlantDecay(plant: GardenPlant, now: Date = new Date()): GardenPlant {
  const nowMs = now.getTime();
  const lastEvalStr = plant.last_evaluated_at || plant.created_at || plant.planted_date;
  const lastEvalMs = lastEvalStr ? new Date(lastEvalStr).getTime() : nowMs;

  const diffHours = Math.max(0, (nowMs - lastEvalMs) / (1000 * 60 * 60));
  const diffDays = diffHours / 24;

  if (diffHours < 0.1) {
    return plant; // Chưa qua đủ thời gian để có sự suy giảm đáng kể
  }

  const waterInterval = plant.watering_interval_days || 2;
  const fertInterval = plant.fertilizing_interval_days || 12;

  // Tính suy giảm tự nhiên
  const currentMoisture = plant.moisture_level ?? 80;
  const currentNutrient = plant.nutrient_level ?? 75;
  const currentSun = plant.sunlight_level ?? 80;
  const currentSoil = plant.soil_level ?? 90;
  const currentExp = plant.growth_exp ?? 0;
  const currentStage = plant.growth_stage ?? 1;

  // Phân rã độ ẩm
  const moistureDecay = diffDays * (100 / waterInterval);
  const newMoisture = Math.max(0, Math.min(100, Math.round(currentMoisture - moistureDecay)));

  // Phân rã dinh dưỡng
  const nutrientDecay = diffDays * (100 / fertInterval);
  const newNutrient = Math.max(0, Math.min(100, Math.round(currentNutrient - nutrientDecay)));

  // Phân rã ánh sáng (giảm 35% mỗi ngày trôi qua)
  const sunDecay = diffDays * 35;
  const newSun = Math.max(0, Math.min(100, Math.round(currentSun - sunDecay)));

  // Phân rã kết cấu đất (giảm chậm 5% mỗi tuần)
  const soilDecay = (diffDays / 7) * 5;
  const newSoil = Math.max(0, Math.min(100, Math.round(currentSoil - soilDecay)));

  // Tính chỉ số sức khỏe tổng hợp
  let healthScore = 100;
  if (newMoisture < 20 || newNutrient < 20 || newSun < 20) {
    healthScore = Math.max(20, Math.min(60, Math.round((newMoisture + newNutrient + newSun) / 3)));
  }

  // Cộng EXP thụ động nếu cây được giữ trong Vùng Sinh Thái Tối Ưu (60% - 85%)
  let passiveExpGained = 0;
  const isOptimal = newMoisture >= 50 && newMoisture <= 85 && newNutrient >= 50 && newNutrient <= 85;
  if (isOptimal && diffDays >= 0.5) {
    passiveExpGained = Math.round(diffDays * 15);
  }

  const updatedExp = currentExp + passiveExpGained;

  // Cập nhật stage sinh học theo EXP mới
  const profile = getPlantGrowthProfile(plant.custom_name, plant.plant_id);
  let evaluatedStage = currentStage;
  for (const st of profile.stage_thresholds) {
    if (updatedExp >= st.exp_required) {
      evaluatedStage = Math.max(evaluatedStage, st.stage);
    }
  }

  // Cập nhật trạng thái hiển thị
  let status = plant.current_status;
  if (healthScore <= 40) {
    status = 'recovering';
  } else if (evaluatedStage >= 5) {
    status = 'fruiting';
  } else if (evaluatedStage >= 4) {
    status = 'flowering';
  } else {
    status = 'healthy';
  }

  return {
    ...plant,
    moisture_level: newMoisture,
    nutrient_level: newNutrient,
    sunlight_level: newSun,
    soil_level: newSoil,
    health_score: healthScore,
    growth_exp: updatedExp,
    growth_stage: evaluatedStage,
    current_status: status,
    last_evaluated_at: now.toISOString()
  };
}

// 5. ÁP DỤNG THAO TÁC CHĂM SÓC CÂY
export function applyCareAction(
  plant: GardenPlant,
  actionType: GardenCareItemType
): PlantCareActionResult {
  const itemDef = GARDEN_ECO_ITEMS[actionType];
  const oldStage = plant.growth_stage || 1;
  const oldExp = plant.growth_exp || 0;

  // Kiểm tra an toàn sinh học trước khi thực hiện
  const safetyCheck = canApplyCareAction(plant, actionType);
  if (!safetyCheck.canApply) {
    return {
      success: false,
      message_vi: safetyCheck.reason_vi || 'Thao tác không an toàn cho cây!',
      message_en: safetyCheck.reason_en || 'Action is biologically unsafe!',
      action: actionType,
      exp_gained: 0,
      level_up: false,
      old_stage: oldStage,
      new_stage: oldStage,
      plant
    };
  }

  // Tính toán chỉ số sinh tồn mới
  let newMoisture = plant.moisture_level ?? 80;
  let newNutrient = plant.nutrient_level ?? 75;
  let newSunlight = plant.sunlight_level ?? 80;
  let newSoil = plant.soil_level ?? 90;
  let newHealth = plant.health_score ?? 100;

  switch (actionType) {
    case 'water':
      newMoisture = Math.min(100, newMoisture + itemDef.vital_increase);
      break;
    case 'fertilizer':
      newNutrient = Math.min(100, newNutrient + itemDef.vital_increase);
      break;
    case 'sunlight':
      newSunlight = Math.min(100, newSunlight + itemDef.vital_increase);
      break;
    case 'soil':
      newSoil = Math.min(100, newSoil + itemDef.vital_increase);
      break;
    case 'spray':
      newHealth = 100;
      break;
  }

  // Thưởng 1.25x EXP nếu hành động duy trì trong Vùng Sinh Thái Tối Ưu (60% - 85%)
  const inOptimalZone = newMoisture >= 60 && newMoisture <= 85 && newNutrient >= 55 && newNutrient <= 80;
  const expGained = inOptimalZone ? Math.round(itemDef.exp_boost * 1.25) : itemDef.exp_boost;
  const newExp = oldExp + expGained;

  // Tính toán thăng cấp giai đoạn
  const profile = getPlantGrowthProfile(plant.custom_name, plant.plant_id);
  let newStage = oldStage;
  for (const st of profile.stage_thresholds) {
    if (newExp >= st.exp_required) {
      newStage = Math.max(newStage, st.stage);
    }
  }

  const isLevelUp = newStage > oldStage;

  // Cập nhật trạng thái
  let newStatus = plant.current_status;
  if (actionType === 'spray') {
    newStatus = 'healthy';
  } else if (newStage >= 5) {
    newStatus = 'fruiting';
  } else if (newStage >= 4) {
    newStatus = 'flowering';
  }

  const today = new Date().toISOString().split('T')[0];

  const updatedPlant: GardenPlant = {
    ...plant,
    moisture_level: newMoisture,
    nutrient_level: newNutrient,
    sunlight_level: newSunlight,
    soil_level: newSoil,
    health_score: newHealth,
    growth_exp: newExp,
    growth_stage: newStage,
    current_status: newStatus,
    last_watered_at: actionType === 'water' ? today : plant.last_watered_at,
    last_fertilized_at: actionType === 'fertilizer' ? today : plant.last_fertilized_at,
    last_evaluated_at: new Date().toISOString()
  };

  return {
    success: true,
    message_vi: isLevelUp 
      ? `🎉 Chúc mừng! "${plant.custom_name}" đã thăng lên Cấp ${newStage} (${profile.stage_thresholds[newStage - 1].name_vi})!`
      : `Đã chăm sóc "${plant.custom_name}" bằng ${itemDef.name_vi} (+${expGained} EXP)!`,
    message_en: isLevelUp 
      ? `🎉 Milestone reached! "${plant.custom_name}" evolved to Stage ${newStage}!`
      : `Applied ${itemDef.name_en} to "${plant.custom_name}" (+${expGained} EXP)!`,
    action: actionType,
    exp_gained: expGained,
    level_up: isLevelUp,
    old_stage: oldStage,
    new_stage: newStage,
    plant: updatedPlant
  };
}

// 6. KIỂM TRA ĐIỀU KIỆN ĐÚC NFT ON-CHAIN THẬT (ETHEREUM SEPOLIA)
export function checkNftMintEligibility(
  plant: GardenPlant,
  diariesCount: number = 0
): {
  isEligible: boolean;
  reasons_vi: string[];
  reasons_en: string[];
  missingCriteria_vi: string[];
  missingCriteria_en: string[];
} {
  const reasons_vi: string[] = [];
  const reasons_en: string[] = [];
  const missing_vi: string[] = [];
  const missing_en: string[] = [];

  const profile = getPlantGrowthProfile(plant.custom_name, plant.plant_id);
  const exp = plant.growth_exp ?? 0;
  const stage = plant.growth_stage ?? 1;

  // Tiêu chí 1: Đã đúc chưa
  if (plant.passport_token_id) {
    missing_vi.push(`Chậu cây đã được đúc Hộ Chiếu NFT On-Chain (#${plant.passport_token_id}).`);
    missing_en.push(`Plant already has a minted NFT Passport (#${plant.passport_token_id}).`);
    return { isEligible: false, reasons_vi, reasons_en, missingCriteria_vi: missing_vi, missingCriteria_en: missing_en };
  }

  // Tiêu chí 2: Cấp độ sinh trưởng giai đoạn 5
  if (stage >= 5) {
    reasons_vi.push('Đã đạt Giai đoạn 5 (Kết quả viên mãn & trưởng thành) ✅');
    reasons_en.push('Reached Stage 5 (Maturity & Fruiting) ✅');
  } else {
    missing_vi.push(`Cần nuôi dưỡng cây đạt Giai đoạn 5 (Hiện tại: Cấp ${stage}/5).`);
    missing_en.push(`Must reach Stage 5 (Currently Stage ${stage}/5).`);
  }

  // Tiêu chí 3: Ngưỡng EXP
  if (exp >= profile.target_exp) {
    reasons_vi.push(`Đạt đủ ${exp}/${profile.target_exp} EXP yêu cầu của loài ✅`);
    reasons_en.push(`Accumulated ${exp}/${profile.target_exp} required EXP ✅`);
  } else {
    missing_vi.push(`Cần tích lũy đủ ${profile.target_exp} EXP (Hiện tại: ${exp} EXP).`);
    missing_en.push(`Requires ${profile.target_exp} EXP (Currently: ${exp} EXP).`);
  }

  // Tiêu chí 4: Có tối thiểu 3 ảnh nhật ký mốc
  if (diariesCount >= 3) {
    reasons_vi.push(`Có ${diariesCount} mốc ảnh nhật ký chứng thực quá trình trồng ✅`);
    reasons_en.push(`Documented with ${diariesCount} photo milestone diaries ✅`);
  } else {
    missing_vi.push(`Cần có tối thiểu 3 bài nhật ký ảnh mốc sinh trưởng (Hiện có: ${diariesCount}/3).`);
    missing_en.push(`Needs at least 3 photo diaries with proof (Currently: ${diariesCount}/3).`);
  }

  const isEligible = stage >= 5 && exp >= profile.target_exp && diariesCount >= 3;

  return {
    isEligible,
    reasons_vi,
    reasons_en,
    missingCriteria_vi: missing_vi,
    missingCriteria_en: missing_en
  };
}

// 6.5. TÍNH TOÁN SẢN LƯỢNG HẠT GIỐNG KHI THU HOẠCH THEO LOÀI
export interface HarvestSeedYield {
  count: number;
  category: 'herb' | 'fruit' | 'flower' | 'root';
  category_name_vi: string;
  category_name_en: string;
  seed_name_vi: string;
  seed_name_en: string;
  note_vi: string;
  note_en: string;
}

export function calculateHarvestSeedYield(plantName: string, _plantId?: string): HarvestSeedYield {
  const nameLower = (plantName || '').toLowerCase();

  // 1. Nhóm Rau ăn lá & Thảo dược gia vị ngắn ngày
  if (
    nameLower.includes('húng') ||
    nameLower.includes('xuyên tâm liên') ||
    nameLower.includes('cải') ||
    nameLower.includes('xà lách') ||
    nameLower.includes('tía tô') ||
    nameLower.includes('bạc hà') ||
    nameLower.includes('kinh giới') ||
    nameLower.includes('rau má') ||
    nameLower.includes('ngải cứu') ||
    nameLower.includes('mùi tàu') ||
    nameLower.includes('ngò') ||
    nameLower.includes('diếp cá')
  ) {
    const count = Math.floor(Math.random() * 13) + 20; // 20 đến 32 hạt
    return {
      count,
      category: 'herb',
      category_name_vi: 'Thảo mộc & Rau gia vị',
      category_name_en: 'Herbs & Leafy Veggies',
      seed_name_vi: `Hạt giống ${plantName} bản địa`,
      seed_name_en: `${plantName} Heirloom Seeds`,
      note_vi: 'Cho sản lượng hạt giống thảo mộc dồi dào, khả năng nảy mầm cao và sinh sôi mạnh mẽ.',
      note_en: 'High seed yield with vigorous germination and rapid vegetative regrowth.'
    };
  }

  // 2. Nhóm Cây ăn quả, quả mọng & Cây bụi
  if (
    nameLower.includes('ổi') ||
    nameLower.includes('chanh') ||
    nameLower.includes('ớt') ||
    nameLower.includes('cà chua') ||
    nameLower.includes('dâu') ||
    nameLower.includes('quất') ||
    nameLower.includes('tắc') ||
    nameLower.includes('cam') ||
    nameLower.includes('khế') ||
    nameLower.includes('lựu')
  ) {
    const count = Math.floor(Math.random() * 9) + 8; // 8 đến 16 hạt
    return {
      count,
      category: 'fruit',
      category_name_vi: 'Cây ăn trái & Cây bụi',
      category_name_en: 'Fruit & Fruiting Shrubs',
      seed_name_vi: `Hạt giống tuyển ${plantName}`,
      seed_name_en: `Selected ${plantName} Seeds`,
      note_vi: 'Hạt giống thu hoạch từ quả chín sinh học, giàu tinh hoa và giá trị dinh dưỡng cao.',
      note_en: 'Seeds harvested from biologically ripened fruits with high genetic vigor.'
    };
  }

  // 3. Nhóm Củ & Dược liệu rễ
  if (
    nameLower.includes('nghệ') ||
    nameLower.includes('gừng') ||
    nameLower.includes('sâm') ||
    nameLower.includes('củ')
  ) {
    const count = Math.floor(Math.random() * 7) + 6; // 6 đến 12 mầm củ giống
    return {
      count,
      category: 'root',
      category_name_vi: 'Cây có củ & Dược liệu',
      category_name_en: 'Roots & Medicinal Plants',
      seed_name_vi: `Mầm củ giống ${plantName}`,
      seed_name_en: `${plantName} Seed Sprouts`,
      note_vi: 'Mầm nhánh củ giống đạt chuẩn dược tính, tích lũy hàm lượng hoạt chất cao.',
      note_en: 'Medicinal sprout nodes rich in active bio-compounds.'
    };
  }

  // 4. Nhóm Hoa kiểng, Bonsai & Phong thủy
  const count = Math.floor(Math.random() * 4) + 3; // 3 đến 6 hạt/mầm quý
  return {
    count,
    category: 'flower',
    category_name_vi: 'Kiểng lá & Phong thủy',
    category_name_en: 'Foliage & Indoor Plants',
    seed_name_vi: `Chồi mầm ${plantName} tinh hoa`,
    seed_name_en: `Elite ${plantName} Germplasm`,
    note_vi: 'Hạt giống và mầm nhánh kiểng quý hiếm, giá trị phong thủy và thanh lọc không khí cao.',
    note_en: 'Rare ornamental seed nodes with high aesthetic and air-purification value.'
  };
}

// 7. BỘ TỔNG HỢP ÂM THANH WEB AUDIO SYNTH (0KB ASSETS)
export function playGardenSound(type: 'water' | 'fertilizer' | 'levelup' | 'harvest'): void {
  if (typeof window === 'undefined') return;

  try {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return;

    const ctx = new AudioCtxClass();
    const now = ctx.currentTime;

    if (type === 'water') {
      // Âm thanh giọt nước tí tách (Water drop)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'fertilizer') {
      // Âm xới đất trầm ấm (Soil rustle)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.12);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.19);
    } else if (type === 'levelup' || type === 'harvest') {
      // Hợp âm reo vui C-Major (C5 -> E5 -> G5 -> C6)
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.26);
      });
    }
  } catch {
    // Trình duyệt chặn autoplay hoặc không hỗ trợ, bỏ qua nhẹ nhàng
  }
}

// 8. QUẢN LÝ KHO ĐỒ LOCAL CHO KHÁCH (OFFLINE-FIRST INVENTORY)
export function getUserInventory(): Record<GardenCareItemType, number> {
  if (typeof window === 'undefined') return { ...INITIAL_USER_INVENTORY };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_INVENTORY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        water: parsed.water ?? INITIAL_USER_INVENTORY.water,
        fertilizer: parsed.fertilizer ?? INITIAL_USER_INVENTORY.fertilizer,
        soil: parsed.soil ?? INITIAL_USER_INVENTORY.soil,
        sunlight: parsed.sunlight ?? INITIAL_USER_INVENTORY.sunlight,
        spray: parsed.spray ?? INITIAL_USER_INVENTORY.spray,
        seeds: parsed.seeds ?? INITIAL_USER_INVENTORY.seeds
      };
    }
  } catch (e) {
    console.warn('Failed to parse inventory from localStorage', e);
  }

  // Khởi tạo mặc định
  localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(INITIAL_USER_INVENTORY));
  return { ...INITIAL_USER_INVENTORY };
}

export function saveUserInventory(inv: Record<GardenCareItemType, number>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(inv));
  } catch (e) {
    console.warn('Failed to save inventory to localStorage', e);
  }
}

export function buyInventoryItem(
  type: GardenCareItemType,
  quantity: number = 1,
  currentHearts: number
): { success: boolean; newHearts: number; newQuantity: number; message_vi: string; message_en: string } {
  const item = GARDEN_ECO_ITEMS[type];
  const totalCost = item.heart_price * quantity;

  if (currentHearts < totalCost) {
    return {
      success: false,
      newHearts: currentHearts,
      newQuantity: 0,
      message_vi: `Không đủ Tim! Bạn cần ${totalCost} Tim nhưng chỉ có ${currentHearts} Tim. Hãy điểm danh hoặc chia sẻ vườn để nhận thêm Tim nhé!`,
      message_en: `Insufficient Hearts! Need ${totalCost} Hearts, but only have ${currentHearts}.`
    };
  }

  const inv = getUserInventory();
  inv[type] = (inv[type] || 0) + quantity;
  saveUserInventory(inv);

  const updatedHearts = currentHearts - totalCost;

  return {
    success: true,
    newHearts: updatedHearts,
    newQuantity: inv[type],
    message_vi: `Đổi thành công ${quantity}x ${item.name_vi} (${item.icon})! Số dư còn lại: ${updatedHearts} Tim.`,
    message_en: `Successfully exchanged ${quantity}x ${item.name_en} (${item.icon})! Balance: ${updatedHearts} Hearts.`
  };
}

/**
 * Thu mua Hạt Giống Nông Sản đổi lấy Trái Tim hoặc Điểm Kinh Nghiệm (EXP)
 */
export function sellInventorySeeds(
  quantity: number,
  rewardType: 'hearts' | 'exp',
  currentHearts: number,
  currentExp: number = 0
): {
  success: boolean;
  newSeeds: number;
  newHearts: number;
  newExp: number;
  rewardAmount: number;
  message_vi: string;
  message_en: string;
} {
  const inv = getUserInventory();
  const currentSeeds = inv.seeds || 0;

  if (quantity <= 0) {
    return {
      success: false,
      newSeeds: currentSeeds,
      newHearts: currentHearts,
      newExp: currentExp,
      rewardAmount: 0,
      message_vi: 'Số lượng hạt giống bán phải lớn hơn 0.',
      message_en: 'Quantity of seeds to sell must be greater than 0.'
    };
  }

  if (currentSeeds < quantity) {
    return {
      success: false,
      newSeeds: currentSeeds,
      newHearts: currentHearts,
      newExp: currentExp,
      rewardAmount: 0,
      message_vi: `Không đủ hạt giống! Bạn muốn bán ${quantity} hạt nhưng trong túi chỉ còn ${currentSeeds} hạt giống.`,
      message_en: `Not enough seeds! You tried to sell ${quantity} seeds, but only have ${currentSeeds} in your bag.`
    };
  }

  // Khấu trừ số hạt giống đã bán
  inv.seeds = currentSeeds - quantity;
  saveUserInventory(inv);

  if (rewardType === 'hearts') {
    // Tỷ lệ: 1 hạt giống = 2 Tim Yêu Vườn ❤️
    const rewardHearts = quantity * 2;
    const nextHearts = currentHearts + rewardHearts;
    return {
      success: true,
      newSeeds: inv.seeds,
      newHearts: nextHearts,
      newExp: currentExp,
      rewardAmount: rewardHearts,
      message_vi: `Đã bán thành công ${quantity} hạt giống và nhận về +${rewardHearts} Tim Yêu Vườn (❤️)! Số dư mới: ${nextHearts} Tim.`,
      message_en: `Successfully sold ${quantity} seeds and earned +${rewardHearts} Hearts (❤️)! New balance: ${nextHearts} Hearts.`
    };
  } else {
    // Tỷ lệ: 1 hạt giống = 5 Điểm Kinh Nghiệm ⭐
    const rewardExp = quantity * 5;
    const nextExp = currentExp + rewardExp;
    return {
      success: true,
      newSeeds: inv.seeds,
      newHearts: currentHearts,
      newExp: nextExp,
      rewardAmount: rewardExp,
      message_vi: `Đã bán thành công ${quantity} hạt giống và nhận về +${rewardExp} Điểm Kinh Nghiệm (⭐)! Tổng EXP mới: ${nextExp}.`,
      message_en: `Successfully sold ${quantity} seeds and earned +${rewardExp} EXP (⭐)! New EXP: ${nextExp}.`
    };
  }
}

export function consumeInventoryItem(type: GardenCareItemType, quantity: number = 1): boolean {
  const inv = getUserInventory();
  if ((inv[type] || 0) < quantity) {
    return false;
  }
  inv[type] = Math.max(0, inv[type] - quantity);
  saveUserInventory(inv);
  return true;
}

/**
 * Nhận diện vật phẩm sinh thái cần thiết từ nội dung nhiệm vụ nông vụ
 */
export function detectRequiredItemForTask(taskText: string): GardenCareItemType | null {
  const lower = taskText.toLowerCase();
  if (lower.includes('tưới') || lower.includes('nước') || lower.includes('water') || lower.includes('ẩm')) {
    return 'water';
  }
  if (lower.includes('phân') || lower.includes('bón') || lower.includes('dinh dưỡng') || lower.includes('fertiliz') || lower.includes('feed') || lower.includes('trùn')) {
    return 'fertilizer';
  }
  if (lower.includes('đất') || lower.includes('xới') || lower.includes('nhân giống') || lower.includes('cành giâm') || lower.includes('chậu') || lower.includes('soil')) {
    return 'soil';
  }
  if (lower.includes('nắng') || lower.includes('quang hợp') || lower.includes('phơi') || lower.includes('sun')) {
    return 'sunlight';
  }
  if (lower.includes('sâu') || lower.includes('bệnh') || lower.includes('xịt') || lower.includes('rệp') || lower.includes('pest') || lower.includes('spray')) {
    return 'spray';
  }
  return null;
}
