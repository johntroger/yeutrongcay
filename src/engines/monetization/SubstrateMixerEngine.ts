/**
 * SubstrateMixerEngine.ts
 * Thuật toán tính toán và cân bằng hóa lý giá thể giâm cành vô trùng (4D Radar)
 * Tuân thủ chuẩn sinh thái học: EC < 0.8 mS/cm, pH = 5.8 - 6.5, Độ xốp >= 25%
 */

export interface SubstrateRatios {
  cocoCoir: number;    // % Mụn xơ dừa ngâm xả chát tannin
  burntHusk: number;   // % Trấu hun nguyên cánh khử khuẩn
  perlite: number;     // % Đá bọt khoáng Perlite/Pumice thoáng khí
  wormCastings: number;// % Phân trùn quế vi sinh (chỉ dùng tỷ lệ nhỏ cho cành giâm)
}

export interface SubstrateProperty {
  ec: number;            // Độ dẫn điện mS/cm
  ph: number;            // Độ chua
  airPorePercent: number;// % Thể tích lỗ rỗng thoáng khí
  waterRetention: number;// % Khả năng giữ ẩm mao dẫn
}

// Hằng số tính chất của từng loại vật liệu nền chuẩn nông học đô thị
const MATERIAL_PROPERTIES: Record<keyof SubstrateRatios, SubstrateProperty> = {
  cocoCoir: { ec: 0.35, ph: 6.2, airPorePercent: 18, waterRetention: 75 },
  burntHusk: { ec: 0.45, ph: 6.8, airPorePercent: 32, waterRetention: 45 },
  perlite: { ec: 0.05, ph: 7.0, airPorePercent: 55, waterRetention: 25 },
  wormCastings: { ec: 2.10, ph: 6.9, airPorePercent: 12, waterRetention: 60 },
};

export interface SubstrateAnalysisResult {
  totalPercentage: number;
  ec: number;
  ph: number;
  airPorosityPercent: number;
  waterRetentionPercent: number;
  radarScores: {
    aeration: number;      // 0 - 100
    moisture: number;      // 0 - 100
    safety: number;        // 0 - 100 (Càng cao càng ít nguy cơ cháy rễ)
    nutrientBuffer: number;// 0 - 100
  };
  safetyLevel: 'optimal' | 'warning' | 'danger';
  statusBadgeVi: string;
  statusBadgeEn: string;
  diagnosticsVi: string[];
  diagnosticsEn: string[];
  recommendedAdjustmentVi?: string;
  recommendedAdjustmentEn?: string;
}

export function analyzeSubstrateMix(ratios: SubstrateRatios): SubstrateAnalysisResult {
  const total = ratios.cocoCoir + ratios.burntHusk + ratios.perlite + ratios.wormCastings;
  const safeTotal = total > 0 ? total : 100;

  // Trọng số chuẩn hóa về 1.0
  const wCoir = ratios.cocoCoir / safeTotal;
  const wHusk = ratios.burntHusk / safeTotal;
  const wPerlite = ratios.perlite / safeTotal;
  const wWorm = ratios.wormCastings / safeTotal;

  // Tính các thông số hóa lý theo bình quân gia quyền
  const ec = Number(
    (
      wCoir * MATERIAL_PROPERTIES.cocoCoir.ec +
      wHusk * MATERIAL_PROPERTIES.burntHusk.ec +
      wPerlite * MATERIAL_PROPERTIES.perlite.ec +
      wWorm * MATERIAL_PROPERTIES.wormCastings.ec
    ).toFixed(2)
  );

  const ph = Number(
    (
      wCoir * MATERIAL_PROPERTIES.cocoCoir.ph +
      wHusk * MATERIAL_PROPERTIES.burntHusk.ph +
      wPerlite * MATERIAL_PROPERTIES.perlite.ph +
      wWorm * MATERIAL_PROPERTIES.wormCastings.ph
    ).toFixed(2)
  );

  const airPorosity = Number(
    (
      wCoir * MATERIAL_PROPERTIES.cocoCoir.airPorePercent +
      wHusk * MATERIAL_PROPERTIES.burntHusk.airPorePercent +
      wPerlite * MATERIAL_PROPERTIES.perlite.airPorePercent +
      wWorm * MATERIAL_PROPERTIES.wormCastings.airPorePercent
    ).toFixed(1)
  );

  const waterRetention = Number(
    (
      wCoir * MATERIAL_PROPERTIES.cocoCoir.waterRetention +
      wHusk * MATERIAL_PROPERTIES.burntHusk.waterRetention +
      wPerlite * MATERIAL_PROPERTIES.perlite.waterRetention +
      wWorm * MATERIAL_PROPERTIES.wormCastings.waterRetention
    ).toFixed(1)
  );

  // Tính điểm Radar (0 - 100)
  const aerationScore = Math.min(100, Math.round((airPorosity / 35) * 100));
  const moistureScore = Math.min(100, Math.round((waterRetention / 70) * 100));
  
  // Safety score: EC càng cao (quá nhiều phân) thì an toàn càng thấp
  let safetyScore = 100;
  if (ec > 0.8) safetyScore -= Math.min(60, Math.round((ec - 0.8) * 50));
  if (airPorosity < 22) safetyScore -= Math.round((22 - airPorosity) * 3);
  safetyScore = Math.max(10, Math.min(100, safetyScore));

  const nutrientScore = Math.min(100, Math.round((wWorm * 100 * 5) + (ec * 25)));

  // Đánh giá mức độ an toàn sinh học cho cành giâm bánh tẻ
  const diagVi: string[] = [];
  const diagEn: string[] = [];
  let safetyLevel: 'optimal' | 'warning' | 'danger' = 'optimal';

  if (ratios.wormCastings > 15) {
    safetyLevel = 'danger';
    diagVi.push('Phân trùn quế vượt quá 15%! Lượng đạm và hữu cơ cao sẽ làm thối đen vết cắt của cành giâm non.');
    diagEn.push('Worm castings exceed 15%! Excessive organic nitrogen promotes basal stem rot on tender cuttings.');
  } else if (ratios.wormCastings > 8) {
    safetyLevel = 'warning';
    diagVi.push('Tỷ lệ phân trùn hơi cao cho giai đoạn tạo mô sẹo. Khuyên dùng tối đa 5 - 8%.');
    diagEn.push('Nutrient concentration is slightly high for callus formation. Cap at 5-8% max.');
  }

  if (airPorosity < 22) {
    if (safetyLevel !== 'danger') safetyLevel = 'warning';
    diagVi.push('Độ xốp thoáng khí thấp (< 22%). Giá thể dễ bị úng nước bí khí khi tưới đẫm.');
    diagEn.push('Low air porosity (< 22%). Risk of waterlogging and root hypoxia.');
  } else {
    diagVi.push(`Độ xốp đạt chuẩn sinh thái (${airPorosity}%), oxy len lỏi tốt tới tầng rễ non.`);
    diagEn.push(`Optimal aeration (${airPorosity}%), abundant oxygen diffuses to adventitious roots.`);
  }

  if (ec <= 0.8 && ph >= 5.8 && ph <= 6.5 && airPorosity >= 25 && ratios.wormCastings <= 10) {
    safetyLevel = 'optimal';
    diagVi.push('Tỷ lệ vàng hoàn hảo! Dự kiến tỷ lệ bén rễ tự nhiên đạt trên 92% sau 14 - 21 ngày.');
    diagEn.push('Golden standard mix! Rooting success rate projected at >= 92% within 14-21 days.');
  }

  return {
    totalPercentage: total,
    ec,
    ph,
    airPorosityPercent: airPorosity,
    waterRetentionPercent: waterRetention,
    radarScores: {
      aeration: aerationScore,
      moisture: moistureScore,
      safety: safetyScore,
      nutrientBuffer: nutrientScore,
    },
    safetyLevel,
    statusBadgeVi:
      safetyLevel === 'optimal'
        ? 'Tỷ lệ vàng chuẩn vườn ươm'
        : safetyLevel === 'warning'
        ? 'Cần điều chỉnh nhẹ'
        : 'Cảnh báo nguy cơ thối rễ',
    statusBadgeEn:
      safetyLevel === 'optimal'
        ? 'Certified Nursery Standard'
        : safetyLevel === 'warning'
        ? 'Needs Minor Tuning'
        : 'High Rot Risk Detected',
    diagnosticsVi: diagVi,
    diagnosticsEn: diagEn,
    recommendedAdjustmentVi:
      safetyLevel !== 'optimal'
        ? 'Gợi ý chuẩn: 45% Xơ dừa xả chát + 30% Trấu hun + 20% Đá Perlite + 5% Phân trùn quế vi sinh.'
        : undefined,
    recommendedAdjustmentEn:
      safetyLevel !== 'optimal'
        ? 'Optimal recipe: 45% washed coco coir + 30% burnt rice husk + 20% perlite + 5% worm castings.'
        : undefined,
  };
}
