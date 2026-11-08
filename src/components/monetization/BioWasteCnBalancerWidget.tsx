import React, { useState, useMemo } from 'react';
import {
  Recycle,
  AlertTriangle,
  CheckCircle2,
  Leaf
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import {
  balanceKitchenWasteCn,
  WasteInputGrams,
  BioWasteResult
} from '../../engines/monetization/BioWasteCnBalancerEngine.ts';

export const BioWasteCnBalancerWidget: React.FC = () => {
  const { isEn } = useLanguage();

  const [waste, setWaste] = useState<WasteInputGrams>({
    bananaPeels: 200,
    coffeeGrounds: 150,
    vegetableScraps: 350,
    crushedEggshells: 50,
    cardboardScraps: 200,
    dryLeavesOrSawdust: 50,
  });

  const analysis: BioWasteResult = useMemo(() => {
    return balanceKitchenWasteCn(waste);
  }, [waste]);

  const handleWasteChange = (key: keyof WasteInputGrams, val: number) => {
    setWaste((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(2000, val)),
    }));
  };

  // Tính góc kim đồng hồ Bio-Gauge (C:N từ 10 đến 50)
  // Góc quay từ -90deg đến +90deg
  const clampedRatio = Math.min(50, Math.max(10, analysis.overallCnRatio));
  const gaugeAngleDeg = ((clampedRatio - 10) / 40) * 180 - 90;

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-sm transition-all">
      {/* Header Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-50 dark:border-forest-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-herbal-50 dark:bg-herbal-950/60 text-herbal-700 dark:text-herbal-300 text-xs font-semibold mb-2 border border-herbal-200 dark:border-herbal-800">
            <Recycle className="w-3.5 h-3.5" />
            <span>{isEn ? 'Bio-Waste C:N Balancer' : 'Bộ Cân Bằng Sinh Học Rác Thải C:N'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-forest-950 dark:text-cream-50">
            {isEn ? 'Zero-Odor Vermicompost & Carbon:Nitrogen Engine' : 'Cân Bằng Rác Thải Nhà Bếp & Tháp Trùn Quế Không Mùi'}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-700 dark:text-forest-200 mt-1">
            {isEn
              ? 'Input your daily kitchen scraps to balance Carbon:Nitrogen ratio and prevent foul odors in apartment.'
              : 'Nhập lượng rác nhà bếp hàng ngày để cân bằng tỷ lệ C:N, triệt tiêu 100% mùi hôi và dự báo sản lượng phân trùn quế.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Cột trái: Các loại rác nhà bếp (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-cream-100 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-herbal-600" />
            <span>{isEn ? 'Daily Kitchen Scrap Inputs (Grams)' : 'Lượng Rác Thải Hàng Ngày Của Gia Đình (Gam)'}</span>
          </h4>

          {/* Rác xanh (Giàu Đạm) */}
          <div className="p-4 rounded-2xl bg-cream-50/70 dark:bg-charcoal-800/60 border border-forest-100 dark:border-forest-800 space-y-3">
            <span className="text-[11px] font-bold text-herbal-800 dark:text-herbal-300 uppercase tracking-wider block">
              Nhóm Rác Xanh (Giàu Đạm Nitơ & Ẩm)
            </span>

            {/* Vỏ rau củ */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-forest-950 dark:text-cream-100">Vỏ rau củ quả thừa</span>
                <span className="font-mono font-bold text-herbal-700">{waste.vegetableScraps}g</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="25"
                value={waste.vegetableScraps}
                onChange={(e) => handleWasteChange('vegetableScraps', Number(e.target.value))}
                className="w-full accent-herbal-600 h-1.5 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Bã cà phê */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-forest-950 dark:text-cream-100">Bã cà phê</span>
                <span className="font-mono font-bold text-amber-800">{waste.coffeeGrounds}g</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="25"
                value={waste.coffeeGrounds}
                onChange={(e) => handleWasteChange('coffeeGrounds', Number(e.target.value))}
                className="w-full accent-amber-700 h-1.5 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Vỏ chuối */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-forest-950 dark:text-cream-100">Vỏ chuối chín (Giàu Kali)</span>
                <span className="font-mono font-bold text-amber-700">{waste.bananaPeels}g</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="25"
                value={waste.bananaPeels}
                onChange={(e) => handleWasteChange('bananaPeels', Number(e.target.value))}
                className="w-full accent-amber-600 h-1.5 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Rác nâu (Giàu Carbon - Bí quyết không mùi) */}
          <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-charcoal-800/60 border border-amber-200/80 dark:border-amber-800/80 space-y-3">
            <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider block">
              Nhóm Rác Nâu (Giàu Carbon - Chặn Đứng Mùi Hôi)
            </span>

            {/* Bìa carton */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-forest-950 dark:text-cream-100">Bìa carton xé vụn</span>
                <span className="font-mono font-bold text-amber-900 dark:text-amber-200">{waste.cardboardScraps}g</span>
              </div>
              <input
                type="range"
                min="0"
                max="800"
                step="25"
                value={waste.cardboardScraps}
                onChange={(e) => handleWasteChange('cardboardScraps', Number(e.target.value))}
                className="w-full accent-amber-800 h-1.5 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Lá khô / mùn cưa */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-forest-950 dark:text-cream-100">Lá cây khô mục / Mùn cưa</span>
                <span className="font-mono font-bold text-amber-900 dark:text-amber-200">{waste.dryLeavesOrSawdust}g</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="25"
                value={waste.dryLeavesOrSawdust}
                onChange={(e) => handleWasteChange('dryLeavesOrSawdust', Number(e.target.value))}
                className="w-full accent-amber-800 h-1.5 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Cột phải: Đồng hồ Bio-Gauge C:N & Sản lượng phân (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          {/* Đồng hồ đo kim Bio-Gauge */}
          <div className="p-5 rounded-2xl bg-cream-50/60 dark:bg-charcoal-800/60 border border-forest-100 dark:border-forest-800 flex flex-col items-center">
            <span className="text-xs font-bold text-forest-900 dark:text-cream-100 uppercase tracking-wider mb-2">
              Tỷ Lệ Carbon : Nitơ Thực Tế (C:N)
            </span>

            <div className="relative w-44 h-24 overflow-hidden flex items-end justify-center">
              {/* Vòng cung Gauge */}
              <svg viewBox="0 0 100 50" className="w-full h-full">
                {/* Vùng đỏ: Thừa đạm <20 */}
                <path d="M 10 50 A 40 40 0 0 1 35 15" fill="none" stroke="#F43F5E" strokeWidth="8" />
                {/* Vùng xanh: Cân bằng 25-35 */}
                <path d="M 35 15 A 40 40 0 0 1 65 15" fill="none" stroke="#10B981" strokeWidth="8" />
                {/* Vùng vàng: Thừa carbon >35 */}
                <path d="M 65 15 A 40 40 0 0 1 90 50" fill="none" stroke="#F59E0B" strokeWidth="8" />
              </svg>

              {/* Kim đồng hồ */}
              <div
                className="absolute bottom-0 w-1 h-20 bg-forest-950 dark:bg-cream-50 origin-bottom transition-transform duration-500 rounded-full"
                style={{ transform: `rotate(${gaugeAngleDeg}deg)` }}
              />
              <div className="absolute bottom-0 w-4 h-4 rounded-full bg-forest-950 dark:bg-cream-50 -mb-2" />
            </div>

            <div className="text-center mt-3">
              <span className="text-2xl font-bold font-mono text-forest-950 dark:text-cream-50">
                {analysis.overallCnRatio} : 1
              </span>
              <p className="text-[11px] text-charcoal-600 dark:text-forest-300">
                (Ngưỡng lý tưởng: 25:1 - 30:1)
              </p>
            </div>

            {/* Huy hiệu cảnh báo */}
            <div className={`mt-3 px-3 py-1.5 rounded-xl border text-xs font-bold text-center inline-flex items-center gap-1.5 ${
              analysis.balanceStatus === 'perfect_balance'
                ? 'bg-herbal-50 text-herbal-800 border-herbal-200'
                : analysis.balanceStatus === 'too_much_nitrogen'
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              {analysis.balanceStatus === 'perfect_balance' ? (
                <CheckCircle2 className="w-4 h-4 text-herbal-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{isEn ? analysis.statusBadgeEn : analysis.statusBadgeVi}</span>
            </div>

            <p className="text-xs text-charcoal-700 dark:text-forest-200 text-center mt-2 leading-relaxed">
              {isEn ? analysis.actionGuidanceEn : analysis.actionGuidanceVi}
            </p>
          </div>

          {/* Dự báo sản lượng thu hoạch tháng */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800">
              <span className="text-[11px] text-charcoal-600 dark:text-forest-300">Phân Trùn Thu Hoạch</span>
              <p className="text-lg font-bold text-herbal-700 font-mono mt-0.5">
                {analysis.monthlyHarvestYields.pureWormCastingsKg} <span className="text-xs font-normal">kg/tháng</span>
              </p>
              <span className="text-[10px] text-charcoal-500">Bón đủ cho 25 chậu cây</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800">
              <span className="text-[11px] text-charcoal-600 dark:text-forest-300">Trà Trùn Sục Khí Vi Sinh</span>
              <p className="text-lg font-bold text-amber-700 font-mono mt-0.5">
                {analysis.monthlyHarvestYields.aeratedCompostTeaLiters} <span className="text-xs font-normal">lít/tháng</span>
              </p>
              <span className="text-[10px] text-charcoal-500">Giàu vi khuẩn cố định đạm</span>
            </div>
          </div>

          {/* Giảm phát thải CO2 */}
          <div className="p-3.5 rounded-2xl bg-forest-900 text-white flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-herbal-300 uppercase">Giảm Phát Thải Môi Trường</p>
              <p className="text-xs text-forest-200 mt-0.5">Rác không bị đưa ra bãi chôn lấp</p>
            </div>
            <span className="text-base font-bold font-mono text-cream-50">
              ~{analysis.ecologicalOffset.co2eReductionKgYearly} kg CO₂e/năm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
