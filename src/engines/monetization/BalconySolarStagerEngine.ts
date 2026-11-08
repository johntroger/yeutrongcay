/**
 * BalconySolarStagerEngine.ts
 * Thuật toán mô phỏng mặt bằng ban công, tính tích phân ánh sáng (DLI),
 * phân bổ 3 tầng sinh thái và kiểm tra tải trọng an toàn căn hộ chung cư.
 */

export type BalconyOrientation = 'east' | 'west' | 'south' | 'north';

export interface BalconyInput {
  lengthMeters: number;       // Chiều dài ban công (1.2m - 7m)
  widthMeters: number;        // Chiều rộng ban công (0.8m - 2.5m)
  floorLevel: number;         // Tầng lầu (1 - 40)
  orientation: BalconyOrientation;
  hasRoofCover: boolean;      // Có trần ban công che chắn không
}

export interface PlantAllocation {
  layer: 'top_sun' | 'mid_partial' | 'bottom_shade';
  layerTitleVi: string;
  layerTitleEn: string;
  dliRequirement: string;
  recommendedSpeciesVi: string[];
  recommendedSpeciesEn: string[];
  potCapacityCount: number;
}

export interface BalconyStagerResult {
  usableAreaM2: number;
  orientation: BalconyOrientation;
  directSunlightHoursDaily: number;
  estimatedDliDaily: number;   // Daily Light Integral (mol/m²/day)
  windExposureLevel: 'low' | 'moderate' | 'high' | 'severe';
  recommendedShelvingTiers: number; // 2 hoặc 3 tầng
  totalPotCapacity: number;
  structuralLoadKgPerM2: number;
  isLoadSafe: boolean;         // Dưới ngưỡng 150 kg/m²
  plantLayers: PlantAllocation[];
  setupCostEstimate: {
    shelvingFrameVnd: number;
    selfWateringPlantersVnd: number;
    livingSoilAndFertilizerVnd: number;
    dripTimerKitVnd: number;
    starterHerbsVnd: number;
    laborSetupVnd: number;
    totalVnd: number;
  };
  architectTipsVi: string[];
  architectTipsEn: string[];
}

export function simulateBalconyStaging(input: BalconyInput): BalconyStagerResult {
  const length = Math.max(1.0, Math.min(8.0, input.lengthMeters || 3.0));
  const width = Math.max(0.6, Math.min(3.0, input.widthMeters || 1.2));
  const floor = Math.max(1, Math.min(50, input.floorLevel || 10));
  const area = Number((length * width).toFixed(2));

  // 1. Phân tích giờ nắng và tích phân ánh sáng DLI theo hướng ban công
  let sunHours = 4.5;
  let avgPpfd = 250; // umol/m2/s

  switch (input.orientation) {
    case 'east': // Nắng sáng dịu, mát buổi chiều
      sunHours = 4.5;
      avgPpfd = 350;
      break;
    case 'west': // Nắng chiều gay gắt, nhiệt độ cao
      sunHours = 5.5;
      avgPpfd = 500;
      break;
    case 'south': // Nắng chan hòa gần như cả ngày
      sunHours = 6.5;
      avgPpfd = 450;
      break;
    case 'north': // Hầu như không có nắng trực tiếp, chỉ có ánh sáng tán xạ
      sunHours = 1.5;
      avgPpfd = 150;
      break;
  }

  // Tầng cao trên tầng 20 đón nhiều bức xạ hơn nhưng gió cũng lớn hơn
  if (floor > 20) {
    sunHours = Math.min(8.0, sunHours + 0.8);
    avgPpfd += 50;
  }

  // Công thức tính Tích phân Ánh sáng Hàng ngày (DLI - Daily Light Integral)
  // DLI = Giờ nắng * PPFD trung bình * 0.0036 (mol/m2/day)
  const estimatedDli = Number((sunHours * avgPpfd * 0.0036).toFixed(1));

  // Đánh giá áp lực gió tầng cao
  let windLevel: 'low' | 'moderate' | 'high' | 'severe' = 'low';
  if (floor >= 25) windLevel = 'severe';
  else if (floor >= 15) windLevel = 'high';
  else if (floor >= 6) windLevel = 'moderate';

  // 2. Phân bổ giàn kệ module và chậu thông minh
  // Mỗi mét chiều dài đặt được 1 kệ module 3 tầng (chứa 6-8 chậu thông minh)
  const moduleCount = Math.floor(length / 0.9);
  const tiersCount = 3;
  const potsPerModule = 6;
  const totalPots = Math.max(6, moduleCount * potsPerModule);

  // Phân bổ cây vào 3 tầng sinh thái
  const topCount = Math.round(totalPots * 0.35);
  const midCount = Math.round(totalPots * 0.35);
  const bottomCount = totalPots - topCount - midCount;

  const plantLayers: PlantAllocation[] = [
    {
      layer: 'top_sun',
      layerTitleVi: 'Tầng Thượng (Đỉnh Giàn) - Đón Nắng Toàn Phần',
      layerTitleEn: 'Top Canopy Tier - Full Sun Lovers',
      dliRequirement: 'DLI >= 16 mol/m²/ngày',
      recommendedSpeciesVi: ['Sả chanh', 'Hương thảo Rosemary', 'Ổi sẻ bonsai', 'Cúc bọ xít xua rầy', 'Cây Bạc Hà Âu'],
      recommendedSpeciesEn: ['Lemongrass', 'Rosemary', 'Dwarf Lemon Guava', 'Marigold pest-repeller', 'Peppermint'],
      potCapacityCount: topCount,
    },
    {
      layer: 'mid_partial',
      layerTitleVi: 'Tầng Trung - Nắng Dịu Bán Phần',
      layerTitleEn: 'Middle Tier - Partial Shade & Herbals',
      dliRequirement: '8 <= DLI < 16 mol/m²/ngày',
      recommendedSpeciesVi: ['Húng chanh lá dày', 'Tía tô tím', 'Ngải cứu', 'Đinh lăng nếp', 'Húng quế'],
      recommendedSpeciesEn: ['Indian Borage (Húng chanh)', 'Perilla frutescens', 'Mugwort', 'Ming Aralia', 'Thai Basil'],
      potCapacityCount: midCount,
    },
    {
      layer: 'bottom_shade',
      layerTitleVi: 'Tầng Hạ (Chân Kệ) - Ưa Râm Mát & Độ Ẩm',
      layerTitleEn: 'Bottom Ground Tier - Shade & Moisture Tolerant',
      dliRequirement: 'DLI < 8 mol/m²/ngày',
      recommendedSpeciesVi: ['Diếp cá giải nhiệt', 'Lá lốt khử hàn', 'Gừng ta', 'Rau càng cua', 'Dương xỉ lọc không khí'],
      recommendedSpeciesEn: ['Fish Mint (Houttuynia)', 'Wild Betel (Lá lốt)', 'Ginger', 'Peperomia pellucida', 'Sword Fern'],
      potCapacityCount: bottomCount,
    },
  ];

  // 3. Kiểm tra an toàn tải trọng kết cấu lan can ban công (TCVN)
  // Đất ướt + chậu + khung sắt khoảng 12 - 15kg/chậu
  const totalWeightKg = Math.round(totalPots * 13 + (moduleCount * 12));
  const loadPerM2 = Number((totalWeightKg / area).toFixed(1));
  const isSafe = loadPerM2 <= 150; // Tiêu chuẩn an toàn căn hộ chung cư <= 150 - 200 kg/m2

  // 4. Dự toán chi phí vật tư và thi công trọn gói
  const costShelving = moduleCount * 450000;          // Kệ sắt hộp sơn tĩnh điện 3 tầng
  const costPlanters = totalPots * 65000;             // Chậu composite thông minh tự dưỡng đáy
  const costSoil = totalPots * 30000;                 // Đất sống hữu cơ phối trộn vi sinh
  const costDrip = 380000;                            // Bộ hẹn giờ tưới nhỏ giọt chạy pin + dây PE
  const costPlants = totalPots * 35000;               // Cây giống thuần hữu cơ F1
  const costLabor = 500000;                           // Công khảo sát, thi công, hướng dẫn bàn giao
  const totalCost = costShelving + costPlanters + costSoil + costDrip + costPlants + costLabor;

  // Lời khuyên kiến trúc cảnh quan theo hướng nhà
  const tipsVi: string[] = [];
  const tipsEn: string[] = [];

  if (input.orientation === 'west') {
    tipsVi.push('Ban công hướng Tây nắng chiều gay gắt: Khuyên dùng chậu đôi cách nhiệt hoặc lót xốp quanh mép ngoài để rễ không bị hấp nhiệt bỏng cháy.');
    tipsEn.push('West-facing intense afternoon heat: Use double-walled insulated planters or perimeter mulch to shield root zones from heat stress.');
  } else if (input.orientation === 'north') {
    tipsVi.push('Ban công hướng Bắc thiếu nắng trực tiếp: Nên lắp thêm 1 thanh đèn LED quang hợp Full Spectrum 35W bổ sung 4 tiếng mỗi chiều tối.');
    tipsEn.push('North-facing indirect light: Supplement with a 35W Full Spectrum grow light bar for 4 hours each evening.');
  }

  if (windLevel === 'high' || windLevel === 'severe') {
    tipsVi.push(`Căn hộ ở tầng cao (${floor}), gió lùa mạnh: Bắt buộc dùng dây rút an toàn cố định khung kệ vào thành tường bê tông, không dùng móc treo tự do.`);
    tipsEn.push(`High altitude floor (${floor}) with strong gust winds: Fasten metal shelving frames firmly to solid walls with masonry anchors.`);
  }

  tipsVi.push('Luôn để chừa khoảng trống 15cm quanh phễu thoát sàn ban công, tuyệt đối không bịt đường thoát hiểm.');
  tipsEn.push('Maintain a clear 15cm perimeter around the balcony floor drain to prevent overflow risks.');

  return {
    usableAreaM2: area,
    orientation: input.orientation,
    directSunlightHoursDaily: sunHours,
    estimatedDliDaily: estimatedDli,
    windExposureLevel: windLevel,
    recommendedShelvingTiers: tiersCount,
    totalPotCapacity: totalPots,
    structuralLoadKgPerM2: loadPerM2,
    isLoadSafe: isSafe,
    plantLayers,
    setupCostEstimate: {
      shelvingFrameVnd: costShelving,
      selfWateringPlantersVnd: costPlanters,
      livingSoilAndFertilizerVnd: costSoil,
      dripTimerKitVnd: costDrip,
      starterHerbsVnd: costPlants,
      laborSetupVnd: costLabor,
      totalVnd: totalCost,
    },
    architectTipsVi: tipsVi,
    architectTipsEn: tipsEn,
  };
}
