/**
 * HerbalBrixEngine.ts
 * Thuật toán tính tỷ lệ vàng và đo khúc xạ Brix siro thảo dược gia đình
 * Tuân thủ chuẩn an toàn thực phẩm: Độ ngọt khúc xạ 62 - 65°Bx tự bảo quản vô trùng,
 * bảo toàn enzyme mật ong nhiệt độ < 45°C.
 */

export interface HerbalBrixInput {
  freshHerbGrams: number;     // Khối lượng lá húng chanh tươi thu hái (gam)
  sweetenerType: 'cane_rock_sugar' | 'raw_honey_mix' | 'brown_sugar';
  quatsRatioMultiplier?: number; // Mặc định 1.0 (500g lá / 500g quất)
}

export interface IngredientBreakdown {
  nameVi: string;
  nameEn: string;
  weightGrams: number;
  preparationNoteVi: string;
  preparationNoteEn: string;
}

export interface HerbalBrixResult {
  freshHerbGrams: number;
  ingredients: IngredientBreakdown[];
  totalRawWeightGrams: number;
  estimatedFinishedWeightGrams: number;
  estimatedFinishedVolumeMl: number;
  jarsCount200ml: number;
  predictedBrix: number;        // Độ ngọt khúc xạ °Bx
  shelfLifeMonths: number;      // Thời hạn bảo quản tự nhiên không chất bảo quản
  cookingTimelineSteps: {
    phaseVi: string;
    phaseEn: string;
    temperatureRange: string;
    durationMinutes: number;
    instructionVi: string;
    instructionEn: string;
  }[];
  financialSnapshot: {
    materialCostVnd: number;
    revenueVnd: number;
    grossProfitVnd: number;
    grossMarginPercent: number;
  };
}

export function calculateHerbalSyrupRecipe(input: HerbalBrixInput): HerbalBrixResult {
  const herbWeight = Math.max(50, Math.min(5000, input.freshHerbGrams || 500));
  const quatMultiplier = input.quatsRatioMultiplier ?? 1.0;

  // Tính khối lượng nguyên liệu theo tỷ lệ vàng dược học
  const quatWeight = Math.round(herbWeight * quatMultiplier);
  const sugarWeight = Math.round(herbWeight * 1.0);
  const gingerWeight = Math.round(herbWeight * 0.08); // 8% gừng sẻ
  const honeyWeight = Math.round(herbWeight * 0.20);  // 20% mật ong rừng

  const ingredients: IngredientBreakdown[] = [
    {
      nameVi: 'Lá húng chanh tươi',
      nameEn: 'Fresh Indian Borage (Húng chanh)',
      weightGrams: herbWeight,
      preparationNoteVi: 'Hái sáng sớm, rửa sạch bụi mịn PM2.5, ngâm muối 0.9% 15 phút, để ráo nước tuyệt đối, thái sợi nhỏ.',
      preparationNoteEn: 'Harvested at dawn, rinsed thoroughly, soaked in 0.9% saline, dried completely, finely chopped.',
    },
    {
      nameVi: 'Quất tươi chín xanh',
      nameEn: 'Fresh Green Calamondin (Quất)',
      weightGrams: quatWeight,
      preparationNoteVi: 'Rửa sạch, thái đôi, nạo sạch hạt để siro không bị đắng chát khi chưng.',
      preparationNoteEn: 'Washed, halved, and completely deseeded to prevent bitterness.',
    },
    {
      nameVi: 'Đường phèn kết tinh mật mía',
      nameEn: 'Crystalline Raw Rock Sugar',
      weightGrams: sugarWeight,
      preparationNoteVi: 'Chọn loại đường phèn vàng tự nhiên không tẩy trắng, giã dập nhỏ để ngấm đều.',
      preparationNoteEn: 'Unrefined amber rock sugar, lightly crushed for even dissolution.',
    },
    {
      nameVi: 'Gừng ta già thái sợi',
      nameEn: 'Fresh Mature Ginger Slices',
      weightGrams: gingerWeight,
      preparationNoteVi: 'Giữ nguyên vỏ rửa sạch, thái lát mỏng rồi xắt sợi mảnh giúp thông phế quản.',
      preparationNoteEn: 'Unpeeled, thoroughly scrubbed, julienned to soothe bronchus.',
    },
    {
      nameVi: 'Mật ong rừng nguyên chất',
      nameEn: 'Pure Forest Honey',
      weightGrams: honeyWeight,
      preparationNoteVi: 'TUYỆT ĐỐI KHÔNG ĐUN SÔI. Chỉ khuấy đều khi siro nguội xuống dưới 45°C để giữ trọn enzyme sống.',
      preparationNoteEn: 'NEVER BOIL. Stir in only after syrup cools below 45°C to preserve live antimicrobial enzymes.',
    },
  ];

  const totalRawWeight = herbWeight + quatWeight + sugarWeight + gingerWeight + honeyWeight;

  // Trong quá trình chưng cách thủy 90 phút, lượng nước tự nhiên bay hơi khoảng 35%
  const evaporatedWeight = Math.round((herbWeight + quatWeight) * 0.35);
  const bãFilterWeight = Math.round((herbWeight + quatWeight + gingerWeight) * 0.45); // Xác lá và bã quất sau khi vắt
  
  const estimatedFinishedWeight = Math.round(totalRawWeight - evaporatedWeight - bãFilterWeight);
  const estimatedVolumeMl = Math.round(estimatedFinishedWeight / 1.28); // Tỷ trọng siro đường sánh d = 1.28 g/ml
  const jarsCount = Math.max(1, Math.ceil(estimatedVolumeMl / 200));

  // Tính độ Brix dự phóng
  // Đường phèn tan hoàn toàn + đường tự nhiên trong quất & mật ong
  const totalSugars = sugarWeight + (honeyWeight * 0.82) + (quatWeight * 0.08);
  const predictedBrix = Number(Math.min(68, Math.max(55, (totalSugars / estimatedFinishedWeight) * 100)).toFixed(1));

  // Thời hạn bảo quản phụ thuộc vào độ Brix
  let shelfLifeMonths = 3;
  if (predictedBrix >= 62 && predictedBrix <= 66) {
    shelfLifeMonths = 6; // Vùng kháng khuẩn áp suất thẩm thấu lý tưởng
  } else if (predictedBrix > 66) {
    shelfLifeMonths = 9;
  }

  // Quy trình chưng cất kiểm soát nhiệt độ nghiêm ngặt
  const timeline = [
    {
      phaseVi: '1. Sơ chế & Ướp đường phèn',
      phaseEn: '1. Preparation & Sugar Infusion',
      temperatureRange: '25°C - 30°C (Nhiệt độ phòng)',
      durationMinutes: 45,
      instructionVi: 'Trộn đều húng chanh thái nhỏ, quất bỏ hạt, gừng sợi với đường phèn. Để 45 phút cho đường tan chảy và ngấm rút tinh dầu.',
      instructionEn: 'Toss chopped herbs, deseeded calamondin, ginger, and rock sugar. Rest for 45 mins to draw out botanical juices.',
    },
    {
      phaseVi: '2. Chưng cách thủy lửa liu riu',
      phaseEn: '2. Gentle Double-Boiler Simmer',
      temperatureRange: '85°C - 90°C',
      durationMinutes: 90,
      instructionVi: 'Đặt âu thủy tinh vào nồi cách thủy đáy dày. Đậy vung kín, chưng lửa nhỏ liu riu trong 90 phút đến khi hỗn hợp sánh vàng óng.',
      instructionEn: 'Place covered glass bowl into double boiler. Simmer gently at 85-90°C for 90 mins until rich golden amber.',
    },
    {
      phaseVi: '3. Lọc bã & Hạ nhiệt an toàn',
      phaseEn: '3. Straining & Controlled Cooling',
      temperatureRange: 'Hạ từ 85°C xuống < 45°C',
      durationMinutes: 30,
      instructionVi: 'Dùng rây inox tiệt trùng lọc bỏ bã lá. Để siro nguội tự nhiên xuống dưới 45°C (ấm nhẹ khi chạm tay).',
      instructionEn: 'Strain botanical solids through sterile sieve. Allow syrup to cool naturally below 45°C.',
    },
    {
      phaseVi: '4. Châm mật ong rừng & Đóng hũ chân không',
      phaseEn: '4. Raw Honey Blending & Vacuum Sealing',
      temperatureRange: '40°C - 45°C',
      durationMinutes: 15,
      instructionVi: 'Rót mật ong rừng vào khuấy đều nhẹ tay theo một chiều. Chiết ngay vào hũ thủy tinh đã luộc tiệt trùng 100°C, siết chặt nắp để tạo lực hút chân không tự nhiên.',
      instructionEn: 'Blend raw honey into warm syrup. Fill into pre-sterilized glass jars immediately, cap tightly to form natural vacuum seal.',
    },
  ];

  // Tính toán kinh tế
  // Chi phí nguyên liệu thực tế tại Việt Nam
  const costHerb = (herbWeight / 1000) * 40000;      // 40k/kg hoặc 0đ nếu hái tại vườn
  const costQuat = (quatWeight / 1000) * 25000;      // 25k/kg
  const costSugar = (sugarWeight / 1000) * 35000;    // 35k/kg đường phèn chuẩn
  const costGinger = (gingerWeight / 1000) * 30000;  // 30k/kg
  const costHoney = (honeyWeight / 1000) * 220000;   // 220k/kg mật ong rừng
  const costJars = jarsCount * 8000;                 // 8k/hũ thủy tinh nắp thiếc 200ml
  const costFuel = 15000;                            // Tiền gas/điện đun cách thủy

  const totalCost = Math.round(costHerb + costQuat + costSugar + costGinger + costHoney + costJars + costFuel);
  const retailPricePerJar = 95000;                   // Giá bán lẻ phổ biến 95.000đ/hũ 200ml
  const totalRevenue = jarsCount * retailPricePerJar;
  const grossProfit = totalRevenue - totalCost;
  const grossMargin = Number(((grossProfit / totalRevenue) * 100).toFixed(1));

  return {
    freshHerbGrams: herbWeight,
    ingredients,
    totalRawWeightGrams: totalRawWeight,
    estimatedFinishedWeightGrams: estimatedFinishedWeight,
    estimatedFinishedVolumeMl: estimatedVolumeMl,
    jarsCount200ml: jarsCount,
    predictedBrix,
    shelfLifeMonths,
    cookingTimelineSteps: timeline,
    financialSnapshot: {
      materialCostVnd: totalCost,
      revenueVnd: totalRevenue,
      grossProfitVnd: grossProfit,
      grossMarginPercent: grossMargin,
    },
  };
}
