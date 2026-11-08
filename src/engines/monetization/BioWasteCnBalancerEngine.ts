/**
 * BioWasteCnBalancerEngine.ts
 * Thuật toán tính tỷ lệ Carbon:Nitơ (C:N) rác hữu cơ nhà bếp,
 * kiểm soát cân bằng sinh thái thùng trùn quế không mùi trong căn hộ chung cư
 * và ước tính sản lượng phân trùn quế & dịch trà trùn vi sinh hàng tháng.
 */

export interface WasteInputGrams {
  bananaPeels: number;       // Vỏ chuối chín (giàu Kali, C:N ~ 30:1)
  coffeeGrounds: number;     // Bã cà phê (giàu Đạm vi sinh, C:N ~ 20:1)
  vegetableScraps: number;   // Vỏ rau củ quả tươi (giàu Nước & Nitơ, C:N ~ 15:1)
  crushedEggshells: number;  // Vỏ trứng gà nghiền nhỏ (Canxi vô cơ, pH đệm)
  cardboardScraps: number;   // Bìa carton nâu xé vụn (Carbon tinh khiết, C:N ~ 350:1)
  dryLeavesOrSawdust: number;// Lá khô mục / mùn cưa (Carbon cao, C:N ~ 400:1)
}

export interface WasteTypeProfile {
  nameVi: string;
  nameEn: string;
  carbonRatio: number; // % Carbon
  nitrogenRatio: number; // % Nitrogen
  typicalCnRatio: number;
  category: 'green' | 'brown' | 'mineral';
}

const WASTE_PROFILES: Record<keyof WasteInputGrams, WasteTypeProfile> = {
  bananaPeels: { nameVi: 'Vỏ chuối', nameEn: 'Banana Peels', carbonRatio: 45, nitrogenRatio: 1.5, typicalCnRatio: 30, category: 'green' },
  coffeeGrounds: { nameVi: 'Bã cà phê', nameEn: 'Coffee Grounds', carbonRatio: 40, nitrogenRatio: 2.0, typicalCnRatio: 20, category: 'green' },
  vegetableScraps: { nameVi: 'Rau củ thừa', nameEn: 'Vegetable Scraps', carbonRatio: 35, nitrogenRatio: 2.3, typicalCnRatio: 15, category: 'green' },
  crushedEggshells: { nameVi: 'Vỏ trứng nghiền', nameEn: 'Crushed Eggshells', carbonRatio: 5, nitrogenRatio: 0.1, typicalCnRatio: 50, category: 'mineral' },
  cardboardScraps: { nameVi: 'Bìa carton xé nhỏ', nameEn: 'Shredded Cardboard', carbonRatio: 70, nitrogenRatio: 0.2, typicalCnRatio: 350, category: 'brown' },
  dryLeavesOrSawdust: { nameVi: 'Lá khô / Mùn cưa', nameEn: 'Dry Leaves / Sawdust', carbonRatio: 75, nitrogenRatio: 0.18, typicalCnRatio: 415, category: 'brown' },
};

export interface BioWasteResult {
  totalDailyWasteGrams: number;
  totalMonthlyWasteKg: number;
  overallCnRatio: number; // Tỷ lệ C:N thực tế
  targetCnMin: number;   // 25
  targetCnMax: number;   // 30
  balanceStatus: 'perfect_balance' | 'too_much_nitrogen' | 'too_much_carbon';
  odorRiskLevel: 'none' | 'low' | 'high_ammonia_risk';
  statusBadgeVi: string;
  statusBadgeEn: string;
  actionGuidanceVi: string;
  actionGuidanceEn: string;
  requiredBrownGramsToAdd: number; // Số gam bìa carton cần cho thêm nếu bị thừa đạm
  monthlyHarvestYields: {
    pureWormCastingsKg: number;      // Phân trùn quế thu được
    liquidLeachateLiters: number;     // Nước rỉ trùn (pha loãng 1:20)
    aeratedCompostTeaLiters: number;  // Trà trùn sục khí vi sinh
    marketValueVnd: number;           // Giá trị quy đổi nếu phải đi mua
  };
  ecologicalOffset: {
    landfillWasteDivertedKgYearly: number;
    co2eReductionKgYearly: number;
  };
}

export function balanceKitchenWasteCn(input: WasteInputGrams): BioWasteResult {
  const banana = Math.max(0, input.bananaPeels || 0);
  const coffee = Math.max(0, input.coffeeGrounds || 0);
  const veggie = Math.max(0, input.vegetableScraps || 0);
  const egg = Math.max(0, input.crushedEggshells || 0);
  const card = Math.max(0, input.cardboardScraps || 0);
  const leaves = Math.max(0, input.dryLeavesOrSawdust || 0);

  const totalDailyGrams = banana + coffee + veggie + egg + card + leaves;
  const safeTotal = totalDailyGrams > 0 ? totalDailyGrams : 500;
  const monthlyKg = Number(((safeTotal * 30) / 1000).toFixed(1));

  // Tính tổng lượng Carbon và Nitrogen hữu cơ
  const totalCarbon =
    (banana * WASTE_PROFILES.bananaPeels.carbonRatio) +
    (coffee * WASTE_PROFILES.coffeeGrounds.carbonRatio) +
    (veggie * WASTE_PROFILES.vegetableScraps.carbonRatio) +
    (egg * WASTE_PROFILES.crushedEggshells.carbonRatio) +
    (card * WASTE_PROFILES.cardboardScraps.carbonRatio) +
    (leaves * WASTE_PROFILES.dryLeavesOrSawdust.carbonRatio);

  const totalNitrogen =
    (banana * WASTE_PROFILES.bananaPeels.nitrogenRatio) +
    (coffee * WASTE_PROFILES.coffeeGrounds.nitrogenRatio) +
    (veggie * WASTE_PROFILES.vegetableScraps.nitrogenRatio) +
    (egg * WASTE_PROFILES.crushedEggshells.nitrogenRatio) +
    (card * WASTE_PROFILES.cardboardScraps.nitrogenRatio) +
    (leaves * WASTE_PROFILES.dryLeavesOrSawdust.nitrogenRatio);

  const safeNitrogen = totalNitrogen > 0 ? totalNitrogen : 1;
  const actualCnRatio = Number((totalCarbon / safeNitrogen).toFixed(1));

  let balanceStatus: 'perfect_balance' | 'too_much_nitrogen' | 'too_much_carbon' = 'perfect_balance';
  let odorRisk: 'none' | 'low' | 'high_ammonia_risk' = 'none';
  let guidanceVi = 'Hệ sinh thái trùn quế cân bằng hoàn hảo! Không mùi hôi, trùn sinh sản nhanh.';
  let guidanceEn = 'Ecosystem is perfectly balanced! Zero odor, vigorous earthworm reproduction.';
  let brownToAdd = 0;

  if (actualCnRatio < 20) {
    balanceStatus = 'too_much_nitrogen';
    odorRisk = 'high_ammonia_risk';
    // Tính số gam bìa carton cần bổ sung để đưa tỷ lệ C:N lên ngưỡng 26:1
    // (TotalCarbon + added * 70) / (TotalNitrogen + added * 0.2) = 26
    // TotalCarbon + 70*added = 26*TotalNitrogen + 5.2*added
    // 64.8 * added = 26*TotalNitrogen - TotalCarbon
    const needed = Math.max(0, Math.round((26 * totalNitrogen - totalCarbon) / 64.8));
    brownToAdd = needed;
    guidanceVi = `Cảnh báo thừa Nitơ (C:N = ${actualCnRatio}:1)! Thùng trùn sẽ bốc mùi amoniac khai nồng và thu hút ruồi giấm. Cần rải thêm ${needed}g bìa carton xé nhỏ ẩm lên mặt!`;
    guidanceEn = `Excess nitrogen alert (C:N = ${actualCnRatio}:1)! High risk of foul ammonia odors. Add ${needed}g of moist shredded cardboard over the surface immediately.`;
  } else if (actualCnRatio > 38) {
    balanceStatus = 'too_much_carbon';
    odorRisk = 'none';
    guidanceVi = `Tỷ lệ Carbon hơi cao (C:N = ${actualCnRatio}:1). Thùng trùn không hôi nhưng quá trình phân hủy sẽ chậm lại. Bổ sung thêm một ít bã cà phê hoặc vỏ rau tươi.`;
    guidanceEn = `High carbon ratio (C:N = ${actualCnRatio}:1). Safe from odors, but decomposition rate slows down. Add fresh coffee grounds or vegetable scraps.`;
  }

  // 1kg rác hữu cơ qua hệ tiêu hóa trùn quế sinh ra khoảng 0.45kg phân trùn quế nguyên chất
  const castingsKg = Number((monthlyKg * 0.45).toFixed(1));
  const leachateLiters = Number((monthlyKg * 0.25).toFixed(1));
  const compostTeaLiters = Number((castingsKg * 8).toFixed(0)); // 1kg phân trùn ngâm sục khí pha thành 8L dung dịch vi sinh

  // Giá trị kinh tế quy đổi
  // 1kg phân trùn quế bao bì sạch = 15.000đ; 1L dịch trùn đậm đặc = 35.000đ
  const marketValue = Math.round((castingsKg * 15000) + (leachateLiters * 20000));

  // Giảm phát thải môi trường
  // 1kg rác hữu cơ chôn lấp sinh ra ~1.2kg CO2e khí nhà kính
  const landfillSavedYearly = Math.round(monthlyKg * 12);
  const co2eReductionYearly = Number((landfillSavedYearly * 1.25).toFixed(0));

  return {
    totalDailyWasteGrams: totalDailyGrams,
    totalMonthlyWasteKg: monthlyKg,
    overallCnRatio: actualCnRatio,
    targetCnMin: 25,
    targetCnMax: 30,
    balanceStatus,
    odorRiskLevel: odorRisk,
    statusBadgeVi:
      balanceStatus === 'perfect_balance'
        ? 'Cân Bằng Sinh Học Lý Tưởng (Không Mùi)'
        : balanceStatus === 'too_much_nitrogen'
        ? 'Nguy Cơ Mùi Hôi (Cần Thêm Carbon)'
        : 'Phân Hủy Chậm (Cần Thêm Rau/Bã Cà Phê)',
    statusBadgeEn:
      balanceStatus === 'perfect_balance'
        ? 'Optimal Bio-Balance (Zero Odor)'
        : balanceStatus === 'too_much_nitrogen'
        ? 'Ammonia Odor Risk (Add Carbon)'
        : 'Slow Breakdown (Add Greens)',
    actionGuidanceVi: guidanceVi,
    actionGuidanceEn: guidanceEn,
    requiredBrownGramsToAdd: brownToAdd,
    monthlyHarvestYields: {
      pureWormCastingsKg: castingsKg,
      liquidLeachateLiters: leachateLiters,
      aeratedCompostTeaLiters: compostTeaLiters,
      marketValueVnd: marketValue,
    },
    ecologicalOffset: {
      landfillWasteDivertedKgYearly: landfillSavedYearly,
      co2eReductionKgYearly: co2eReductionYearly,
    },
  };
}
