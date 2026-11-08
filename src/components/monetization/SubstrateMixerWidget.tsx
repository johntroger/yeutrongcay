import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Sliders
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import {
  analyzeSubstrateMix,
  SubstrateRatios,
  SubstrateAnalysisResult
} from '../../engines/monetization/SubstrateMixerEngine.ts';

export const SubstrateMixerWidget: React.FC = () => {
  const { isEn } = useLanguage();

  const [ratios, setRatios] = useState<SubstrateRatios>({
    cocoCoir: 45,
    burntHusk: 30,
    perlite: 20,
    wormCastings: 5,
  });

  const analysis: SubstrateAnalysisResult = useMemo(() => {
    return analyzeSubstrateMix(ratios);
  }, [ratios]);

  const handleRatioChange = (field: keyof SubstrateRatios, val: number) => {
    setRatios((prev) => ({
      ...prev,
      [field]: Math.max(0, Math.min(100, val)),
    }));
  };

  const handleResetToGolden = () => {
    setRatios({
      cocoCoir: 45,
      burntHusk: 30,
      perlite: 20,
      wormCastings: 5,
    });
  };

  // Tính tọa độ Radar polygon 4 đỉnh trong viewport 200x200 (tâm 100, 100, bán kính tối đa 80)
  // Đỉnh 0 (Trên - Aeration): (100, 100 - r0)
  // Đỉnh 1 (Phải - Moisture): (100 + r1, 100)
  // Đỉnh 2 (Dưới - Nutrient): (100, 100 + r2)
  // Đỉnh 3 (Trái - Safety): (100 - r3, 100)
  const r0 = (analysis.radarScores.aeration / 100) * 80;
  const r1 = (analysis.radarScores.moisture / 100) * 80;
  const r2 = (analysis.radarScores.nutrientBuffer / 100) * 80;
  const r3 = (analysis.radarScores.safety / 100) * 80;

  const polygonPoints = `100,${100 - r0} ${100 + r1},100 100,${100 + r2} ${100 - r3},100`;

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-sm transition-all">
      {/* Header Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-50 dark:border-forest-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-herbal-50 dark:bg-herbal-950/60 text-herbal-700 dark:text-herbal-300 text-xs font-semibold mb-2 border border-herbal-200 dark:border-herbal-800">
            <Sliders className="w-3.5 h-3.5" />
            <span>{isEn ? 'Interactive Substrate Lab 4D' : 'Phòng Thí Nghiệm Giá Thể 4D'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-forest-950 dark:text-cream-50">
            {isEn ? 'Cutting Substrate & Biochemical Balancer' : 'Bộ Phối Trộn Giá Thể Giâm Cành & Kiểm Chuẩn Hóa Lý'}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-700 dark:text-forest-200 mt-1">
            {isEn
              ? 'Tweak percentages to simulate pH, EC, aeration porosity, and rooting safety in real time.'
              : 'Kéo thả thanh trượt để kiểm tra độ chua pH, độ dẫn điện EC và nguy cơ thối rễ non tức thì.'}
          </p>
        </div>

        <button
          onClick={handleResetToGolden}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cream-100 dark:bg-charcoal-800 text-forest-900 dark:text-cream-100 hover:bg-forest-100 dark:hover:bg-charcoal-700 transition border border-forest-100 dark:border-forest-800"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isEn ? 'Reset to Golden Mix' : 'Về Tỷ Lệ Vàng'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Cột trái: 4 Thanh trượt (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Slider 1: Xơ dừa */}
          <div className="p-4 rounded-2xl bg-cream-50/70 dark:bg-charcoal-800/60 border border-forest-100 dark:border-forest-800">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-forest-900 dark:text-cream-100 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-700"></span>
                <span>{isEn ? 'Washed Coco Coir' : 'Mụn Xơ Dừa Xả Chát Tannin'}</span>
              </label>
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 font-mono bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                {ratios.cocoCoir}%
              </span>
            </div>
            <p className="text-[11px] text-charcoal-600 dark:text-forest-300 mb-2">
              {isEn ? 'Maintains capillary moisture without packing tight.' : 'Giữ ẩm mao dẫn tự nhiên, cần xả sạch chất chát tannin.'}
            </p>
            <input
              type="range"
              min="0"
              max="100"
              value={ratios.cocoCoir}
              onChange={(e) => handleRatioChange('cocoCoir', Number(e.target.value))}
              className="w-full accent-amber-700 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 2: Trấu hun */}
          <div className="p-4 rounded-2xl bg-cream-50/70 dark:bg-charcoal-800/60 border border-forest-100 dark:border-forest-800">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-forest-900 dark:text-cream-100 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-charcoal-700"></span>
                <span>{isEn ? 'Burnt Rice Husk (Biochar)' : 'Trấu Hun Nguyên Cánh (Biochar)'}</span>
              </label>
              <span className="text-xs font-bold text-charcoal-800 dark:text-cream-200 font-mono bg-cream-200 dark:bg-charcoal-700 px-2 py-0.5 rounded-md border border-forest-200 dark:border-forest-700">
                {ratios.burntHusk}%
              </span>
            </div>
            <p className="text-[11px] text-charcoal-600 dark:text-forest-300 mb-2">
              {isEn ? 'Sterilized biochar for high porosity, potassium and silicon.' : 'Khử khuẩn nhiệt, cung cấp oxit silic và tạo khe thoáng khí.'}
            </p>
            <input
              type="range"
              min="0"
              max="100"
              value={ratios.burntHusk}
              onChange={(e) => handleRatioChange('burntHusk', Number(e.target.value))}
              className="w-full accent-charcoal-700 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 3: Đá Perlite */}
          <div className="p-4 rounded-2xl bg-cream-50/70 dark:bg-charcoal-800/60 border border-forest-100 dark:border-forest-800">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-forest-900 dark:text-cream-100 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>{isEn ? 'Horticultural Perlite' : 'Đá Khoáng Trắng Perlite'}</span>
              </label>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 font-mono bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                {ratios.perlite}%
              </span>
            </div>
            <p className="text-[11px] text-charcoal-600 dark:text-forest-300 mb-2">
              {isEn ? 'Volcanic glass rock, keeps substrate from compacting.' : 'Thủy tinh núi lửa xốp nhẹ, ngăn ngừa nén chặt rễ non.'}
            </p>
            <input
              type="range"
              min="0"
              max="100"
              value={ratios.perlite}
              onChange={(e) => handleRatioChange('perlite', Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Slider 4: Phân trùn quế */}
          <div className="p-4 rounded-2xl bg-cream-50/70 dark:bg-charcoal-800/60 border border-forest-100 dark:border-forest-800">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs sm:text-sm font-bold text-forest-900 dark:text-cream-100 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-herbal-600"></span>
                <span>{isEn ? 'Organic Worm Castings' : 'Phân Trùn Quế Vi Sinh (Ủ Hoai)'}</span>
              </label>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md border ${
                ratios.wormCastings > 10
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                  : 'bg-herbal-50 dark:bg-herbal-950/60 text-herbal-700 dark:text-herbal-300 border-herbal-200 dark:border-herbal-800'
              }`}>
                {ratios.wormCastings}%
              </span>
            </div>
            <p className="text-[11px] text-charcoal-600 dark:text-forest-300 mb-2">
              {isEn ? 'Only 5% recommended for cuttings to avoid nitrogen rot.' : 'Chỉ nên dùng 5-8% ở giai đoạn giâm cành để không làm sót rễ non.'}
            </p>
            <input
              type="range"
              min="0"
              max="40"
              value={ratios.wormCastings}
              onChange={(e) => handleRatioChange('wormCastings', Number(e.target.value))}
              className="w-full accent-herbal-600 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Cột phải: Biểu đồ Radar 4D & Bảng Kiểm Chuẩn (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Biểu đồ Radar SVG */}
          <div className="bg-cream-50/50 dark:bg-charcoal-800/50 rounded-2xl p-4 border border-forest-100 dark:border-forest-800/80 flex flex-col items-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56">
              <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                {/* Lưới hình thoi chuẩn hóa 25%, 50%, 75%, 100% */}
                <polygon points="100,20 180,100 100,180 20,100" fill="none" stroke="#D1D5DB" strokeDasharray="3 3" />
                <polygon points="100,40 160,100 100,160 40,100" fill="none" stroke="#E5E7EB" />
                <polygon points="100,60 140,100 100,140 60,100" fill="none" stroke="#E5E7EB" />
                <polygon points="100,80 120,100 100,120 80,100" fill="none" stroke="#E5E7EB" />

                {/* Trục chữ thập */}
                <line x1="100" y1="20" x2="100" y2="180" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#E5E7EB" strokeWidth="1" />

                {/* Vùng Polygon dữ liệu thực tế */}
                <polygon
                  points={polygonPoints}
                  fill="rgba(21, 128, 61, 0.25)"
                  stroke="#16A34A"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />

                {/* Các điểm neo */}
                <circle cx="100" cy={100 - r0} r="3.5" fill="#15803D" />
                <circle cx={100 + r1} cy="100" r="3.5" fill="#15803D" />
                <circle cx="100" cy={100 + r2} r="3.5" fill="#15803D" />
                <circle cx={100 - r3} cy="100" r="3.5" fill="#15803D" />

                {/* Nhãn 4 trục */}
                <text x="100" y="12" textAnchor="middle" className="text-[9px] fill-forest-800 dark:fill-forest-200 font-bold">
                  {isEn ? 'Aeration' : 'Độ Thoáng Khí'}
                </text>
                <text x="188" y="103" textAnchor="start" className="text-[9px] fill-forest-800 dark:fill-forest-200 font-bold">
                  {isEn ? 'Moisture' : 'Giữ Ẩm'}
                </text>
                <text x="100" y="196" textAnchor="middle" className="text-[9px] fill-forest-800 dark:fill-forest-200 font-bold">
                  {isEn ? 'Nutrient' : 'Dinh Dưỡng'}
                </text>
                <text x="12" y="103" textAnchor="end" className="text-[9px] fill-forest-800 dark:fill-forest-200 font-bold">
                  {isEn ? 'Safety' : 'An Toàn Rễ'}
                </text>
              </svg>
            </div>

            {/* Trạng thái an toàn sinh học */}
            <div className={`mt-3 px-3 py-1.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 ${
              analysis.safetyLevel === 'optimal'
                ? 'bg-herbal-50 dark:bg-herbal-950/80 text-herbal-800 dark:text-herbal-300 border-herbal-200 dark:border-herbal-800'
                : analysis.safetyLevel === 'warning'
                ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                : 'bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800'
            }`}>
              {analysis.safetyLevel === 'optimal' ? (
                <CheckCircle2 className="w-4 h-4 text-herbal-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              )}
              <span>{isEn ? analysis.statusBadgeEn : analysis.statusBadgeVi}</span>
            </div>
          </div>

          {/* Bảng thông số Hóa Lý */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800">
              <span className="text-[11px] font-semibold text-charcoal-600 dark:text-forest-300">
                {isEn ? 'Electrical Conductivity' : 'Độ Dẫn Điện (EC)'}
              </span>
              <p className="text-base font-bold text-forest-950 dark:text-cream-50 font-mono mt-0.5">
                {analysis.ec} <span className="text-xs font-normal text-charcoal-500">mS/cm</span>
              </p>
              <span className="text-[10px] text-herbal-700 dark:text-herbal-400">
                {analysis.ec <= 0.8 ? '✓ Đạt chuẩn (<0.8)' : '⚠️ Hơi cao với cành non'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800">
              <span className="text-[11px] font-semibold text-charcoal-600 dark:text-forest-300">
                {isEn ? 'Substrate pH' : 'Độ Chua (pH)'}
              </span>
              <p className="text-base font-bold text-forest-950 dark:text-cream-50 font-mono mt-0.5">
                {analysis.ph}
              </p>
              <span className="text-[10px] text-herbal-700 dark:text-herbal-400">
                {analysis.ph >= 5.8 && analysis.ph <= 6.8 ? '✓ Vùng trung tính lý tưởng' : '⚠️ Cần cân bằng'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800">
              <span className="text-[11px] font-semibold text-charcoal-600 dark:text-forest-300">
                {isEn ? 'Air Porosity' : 'Độ Thoáng Khí'}
              </span>
              <p className="text-base font-bold text-forest-950 dark:text-cream-50 font-mono mt-0.5">
                {analysis.airPorosityPercent}%
              </p>
              <span className="text-[10px] text-herbal-700 dark:text-herbal-400">
                {analysis.airPorosityPercent >= 25 ? '✓ Rễ thở tốt (>=25%)' : '⚠️ Dễ bị úng bí'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800">
              <span className="text-[11px] font-semibold text-charcoal-600 dark:text-forest-300">
                {isEn ? 'Water Retention' : 'Khả Năng Giữ Ẩm'}
              </span>
              <p className="text-base font-bold text-forest-950 dark:text-cream-50 font-mono mt-0.5">
                {analysis.waterRetentionPercent}%
              </p>
              <span className="text-[10px] text-herbal-700 dark:text-herbal-400">
                {analysis.waterRetentionPercent >= 50 ? '✓ Ẩm đều mao dẫn' : '⚠️ Thoát nước quá nhanh'}
              </span>
            </div>
          </div>

          {/* Hộp chẩn đoán */}
          <div className="p-3.5 rounded-xl bg-forest-50/70 dark:bg-charcoal-800/80 border border-forest-100 dark:border-forest-800 text-xs space-y-1 text-charcoal-800 dark:text-forest-200">
            {(isEn ? analysis.diagnosticsEn : analysis.diagnosticsVi).map((d, idx) => (
              <p key={idx} className="flex items-start gap-1.5 leading-relaxed">
                <span className="text-herbal-600 shrink-0">•</span>
                <span>{d}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
