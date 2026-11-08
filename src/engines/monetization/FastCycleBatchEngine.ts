/**
 * FastCycleBatchEngine.ts
 * Thuật toán lập lịch canh tác rau mầm (Microgreens) & Nấm ăn đô thị siêu tốc,
 * tính toán ma trận xoay vòng khay kệ thu hoạch cuốn chiếu hàng ngày (Rolling Tray Matrix)
 * và tối ưu hóa vòng quay đồng vốn 7 - 10 ngày.
 */

export type FastCropKey = 'broccoli_sulforaphane' | 'red_radish' | 'pea_shoots' | 'oyster_mushroom';

export interface CropProfile {
  key: FastCropKey;
  nameVi: string;
  nameEn: string;
  totalCycleDays: number;
  blackoutDays: number;
  lightDays: number;
  seedPerTrayGrams: number;
  harvestYieldGramsPerTray: number;
  nutritionHighlightVi: string;
  nutritionHighlightEn: string;
  seedCostPerTrayVnd: number;
  retailPricePer100gVnd: number;
}

export const FAST_CROPS: Record<FastCropKey, CropProfile> = {
  broccoli_sulforaphane: {
    key: 'broccoli_sulforaphane',
    nameVi: 'Mầm Súp Lơ Xanh (Broccoli)',
    nameEn: 'Broccoli Microgreens (Sulforaphane Rich)',
    totalCycleDays: 8,
    blackoutDays: 3,
    lightDays: 5,
    seedPerTrayGrams: 25,
    harvestYieldGramsPerTray: 280,
    nutritionHighlightVi: 'Hàm lượng Sulforaphane chống oxy hóa cao gấp 20 - 50 lần bông súp lơ lớn',
    nutritionHighlightEn: 'Sulforaphane antioxidant concentration 20-50x higher than mature broccoli',
    seedCostPerTrayVnd: 18000,
    retailPricePer100gVnd: 35000,
  },
  red_radish: {
    key: 'red_radish',
    nameVi: 'Mầm Củ Cải Đỏ (Red Radish)',
    nameEn: 'Red Radish Microgreens',
    totalCycleDays: 6,
    blackoutDays: 2,
    lightDays: 4,
    seedPerTrayGrams: 35,
    harvestYieldGramsPerTray: 360,
    nutritionHighlightVi: 'Vị cay nồng kích thích tiêu hóa, giàu Vitamin C và Anthocyanin thân đỏ',
    nutritionHighlightEn: 'Crisp spicy zest, rich in Vitamin C and red stem anthocyanins',
    seedCostPerTrayVnd: 12000,
    retailPricePer100gVnd: 25000,
  },
  pea_shoots: {
    key: 'pea_shoots',
    nameVi: 'Mầm Đậu Hà Lan (Pea Shoots)',
    nameEn: 'Speckled Pea Shoots',
    totalCycleDays: 9,
    blackoutDays: 3,
    lightDays: 6,
    seedPerTrayGrams: 90,
    harvestYieldGramsPerTray: 520,
    nutritionHighlightVi: 'Thân mập giòn ngọt, giàu đạm thực vật, có thể tái thu hoạch lứa 2 sau 5 ngày',
    nutritionHighlightEn: 'Sweet crunchy tendrils, high plant protein, allows second ratoon cut',
    seedCostPerTrayVnd: 22000,
    retailPricePer100gVnd: 28000,
  },
  oyster_mushroom: {
    key: 'oyster_mushroom',
    nameVi: 'Phôi Nấm Sò Xám (Oyster Mushroom)',
    nameEn: 'Grey Oyster Mushroom (Substrate bag)',
    totalCycleDays: 7, // 7 ngày/lứa sau khi rạch miệng meo
    blackoutDays: 0,
    lightDays: 7,
    seedPerTrayGrams: 0,
    harvestYieldGramsPerTray: 400, // 400g nấm tươi mỗi đợt bung dù
    nutritionHighlightVi: 'Giàu Beta-Glucan tăng cường miễn dịch, hương vị ngọt đậm đà thay thế thịt',
    nutritionHighlightEn: 'Rich in immune-boosting Beta-Glucans, umami savory gourmet texture',
    seedCostPerTrayVnd: 15000, // Giá 1 bịch phôi nấm cấy sẵn
    retailPricePer100gVnd: 16000,
  },
};

export interface BatchPlannerInput {
  cropKey: FastCropKey;
  totalTraysActive: number; // Tổng số khay hoặc bịch phôi (mặc định 6-12)
  startDateIso?: string;    // Ngày bắt đầu tính (YYYY-MM-DD)
}

export interface DayScheduleItem {
  dayIndex: number;
  dateStr: string;
  phase: 'soak_seed' | 'blackout_dome' | 'grow_light' | 'harvest_day';
  phaseTitleVi: string;
  phaseTitleEn: string;
  actionInstructionVi: string;
  actionInstructionEn: string;
  traysInActionCount: number;
}

export interface BatchPlannerResult {
  crop: CropProfile;
  totalTrays: number;
  cycleLengthDays: number;
  dailyHarvestGramsAverage: number;
  monthlyHarvestYieldKg: number;
  trayRotationSchedule: DayScheduleItem[];
  financialEconomicsMonthly: {
    seedAndMediumCostVnd: number;
    packagingBoxCostVnd: number; // Hộp bã mía tự hủy 1.500đ/hộp
    electricityWaterCostVnd: number;
    totalOpexVnd: number;
    grossRevenueVnd: number;
    netProfitVnd: number;
    roiPercent: number;
  };
}

export function planFastCycleBatch(input: BatchPlannerInput): BatchPlannerResult {
  const crop = FAST_CROPS[input.cropKey] || FAST_CROPS.broccoli_sulforaphane;
  const trays = Math.max(2, Math.min(32, input.totalTraysActive || 8));
  const cycleDays = crop.totalCycleDays;

  // Tính số khay gieo cuốn chiếu mỗi đợt để ngày nào cũng có khay thu hoạch
  // Ví dụ chu kỳ 8 ngày, có 8 khay -> Mỗi ngày gieo 1 khay, thu hoạch 1 khay!
  const traysHarvestedPerDay = Number((trays / cycleDays).toFixed(2));
  const dailyHarvestGrams = Math.round(traysHarvestedPerDay * crop.harvestYieldGramsPerTray);
  const monthlyYieldKg = Number(((dailyHarvestGrams * 30) / 1000).toFixed(1));

  // Tạo lịch trình trực quan theo tiến trình ngày
  const schedule: DayScheduleItem[] = [];
  const baseDate = input.startDateIso ? new Date(input.startDateIso) : new Date();

  for (let d = 1; d <= cycleDays; d++) {
    const currDate = new Date(baseDate);
    currDate.setDate(baseDate.getDate() + (d - 1));
    const dateFormatted = `${currDate.getDate().toString().padStart(2, '0')}/${(currDate.getMonth() + 1).toString().padStart(2, '0')}`;

    let phase: DayScheduleItem['phase'] = 'grow_light';
    let titleVi = 'Bật đèn quang hợp LED';
    let titleEn = 'Full-Spectrum LED Illumination';
    let actionVi = 'Bật dải đèn LED quang hợp 14 tiếng/ngày, phun sương nước lọc 2 lần (sáng 7h, chiều 16h).';
    let actionEn = 'Turn on grow lights for 14 hrs daily, mist twice (7 AM, 4 PM) with pure filtered water.';

    if (d === 1) {
      phase = 'soak_seed';
      titleVi = 'Ngâm hạt giống & Gieo thảm xơ dừa';
      titleEn = 'Seed Soaking & Substrate Sowing';
      actionVi = `Ngâm ${crop.seedPerTrayGrams}g hạt trong nước ấm 40°C trong 4 tiếng, rải đều lên thảm xơ dừa ẩm, đè nặng để rễ cắm sâu.`;
      actionEn = `Soak ${crop.seedPerTrayGrams}g seed in 40°C warm water for 4 hrs, spread evenly over moist coir mat, apply top weight.`;
    } else if (d <= crop.blackoutDays) {
      phase = 'blackout_dome';
      titleVi = 'Ủ tối nảy mầm (Blackout period)';
      titleEn = 'Blackout Dome Incubation';
      actionVi = 'Đậy kín nắp khay giữ độ ẩm 90% trong bóng tối hoàn toàn để thân mầm vươn thẳng đều tăm tắp.';
      actionEn = 'Keep covered in complete darkness with 90% humidity so hypocotyl stems stretch uniformly.';
    } else if (d === cycleDays) {
      phase = 'harvest_day';
      titleVi = 'Ngày thu hoạch vàng';
      titleEn = 'Peak Harvest Cut & Packing';
      actionVi = `Dùng kéo bén cắt sát gốc 0.5cm, đóng hộp bã mía sinh học ${crop.harvestYieldGramsPerTray}g giao ngay cho khách hàng.`;
      actionEn = `Slice stems cleanly 0.5cm above coir surface with sharp snips, package ${crop.harvestYieldGramsPerTray}g fresh into biodegradable clam-shells.`;
    }

    schedule.push({
      dayIndex: d,
      dateStr: dateFormatted,
      phase,
      phaseTitleVi: titleVi,
      phaseTitleEn: titleEn,
      actionInstructionVi: actionVi,
      actionInstructionEn: actionEn,
      traysInActionCount: Math.ceil(traysHarvestedPerDay),
    });
  }

  // Kinh tế học hàng tháng (Đơn vị VNĐ)
  const monthlyTraysTotal = Math.round(traysHarvestedPerDay * 30);
  const costSeeds = monthlyTraysTotal * crop.seedCostPerTrayVnd;
  const boxesCount = Math.round((monthlyYieldKg * 1000) / 100); // Đóng hộp 100g
  const costPackaging = boxesCount * 1500; // 1.500đ/hộp bã mía tự phân hủy
  const costElectricity = 45000; // Đèn LED 30W chạy 14h x 30 ngày ~ 13 kWh x 3.000đ
  const totalOpex = costSeeds + costPackaging + costElectricity;

  const totalRevenue = Math.round(boxesCount * crop.retailPricePer100gVnd);
  const netProfit = totalRevenue - totalOpex;
  const roi = Number(((netProfit / totalOpex) * 100).toFixed(1));

  return {
    crop,
    totalTrays: trays,
    cycleLengthDays: cycleDays,
    dailyHarvestGramsAverage: dailyHarvestGrams,
    monthlyHarvestYieldKg: monthlyYieldKg,
    trayRotationSchedule: schedule,
    financialEconomicsMonthly: {
      seedAndMediumCostVnd: costSeeds,
      packagingBoxCostVnd: costPackaging,
      electricityWaterCostVnd: costElectricity,
      totalOpexVnd: totalOpex,
      grossRevenueVnd: totalRevenue,
      netProfitVnd: netProfit,
      roiPercent: roi,
    },
  };
}
