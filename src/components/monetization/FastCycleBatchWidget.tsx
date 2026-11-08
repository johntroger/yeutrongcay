import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Sparkles,
  Clock,
  Coins,
  Package
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import {
  planFastCycleBatch,
  FAST_CROPS,
  FastCropKey,
  BatchPlannerResult
} from '../../engines/monetization/FastCycleBatchEngine.ts';

export const FastCycleBatchWidget: React.FC = () => {
  const { isEn } = useLanguage();

  const [selectedCrop, setSelectedCrop] = useState<FastCropKey>('broccoli_sulforaphane');
  const [trayCount, setTrayCount] = useState<number>(8);

  const plan: BatchPlannerResult = useMemo(() => {
    return planFastCycleBatch({
      cropKey: selectedCrop,
      totalTraysActive: trayCount,
    });
  }, [selectedCrop, trayCount]);

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-sm transition-all">
      {/* Header Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-50 dark:border-forest-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-herbal-50 dark:bg-herbal-950/60 text-herbal-700 dark:text-herbal-300 text-xs font-semibold mb-2 border border-herbal-200 dark:border-herbal-800">
            <Calendar className="w-3.5 h-3.5" />
            <span>{isEn ? 'Fast-Cycle Batch Planner' : 'Bộ Lập Lịch Canh Tác Cuốn Chiếu 7 Ngày'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-forest-950 dark:text-cream-50">
            {isEn ? 'Microgreens & Fungi Rolling Harvest Matrix' : 'Ma Trận Xoay Vòng Khay Mầm & Nấm Thu Hoạch Hàng Ngày'}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-700 dark:text-forest-200 mt-1">
            {isEn
              ? 'Calculate daily rolling harvest schedules and turnaround economics for urban micro-farming.'
              : 'Tính toán lịch gieo cuốn chiếu để ngày nào cũng có 1 khay rau mầm hoặc nấm tươi thu hoạch liên tục.'}
          </p>
        </div>
      </div>

      {/* Chọn loại cây & số khay */}
      <div className="py-6 border-b border-forest-50 dark:border-forest-800 space-y-4">
        {/* Nút chọn loại cây */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {(Object.keys(FAST_CROPS) as FastCropKey[]).map((key) => {
            const crop = FAST_CROPS[key];
            const isSelected = selectedCrop === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCrop(key)}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-herbal-50/80 dark:bg-herbal-950/60 border-herbal-500 shadow-sm'
                    : 'bg-cream-50/50 dark:bg-charcoal-800/50 border-forest-100 dark:border-forest-800 hover:bg-forest-50/50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-forest-950 dark:text-cream-50 block mb-1">
                    {isEn ? crop.nameEn : crop.nameVi}
                  </span>
                  <span className="text-[11px] text-charcoal-600 dark:text-forest-300 font-mono">
                    Chu kỳ: {crop.totalCycleDays} ngày
                  </span>
                </div>
                {isSelected && (
                  <span className="inline-block mt-2 w-2 h-2 rounded-full bg-herbal-600 self-end"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Thanh trượt số lượng khay / bịch phôi */}
        <div className="p-4 rounded-2xl bg-cream-50/50 dark:bg-charcoal-800/50 border border-forest-100 dark:border-forest-800">
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs sm:text-sm font-bold text-forest-900 dark:text-cream-100 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-herbal-600" />
              <span>{isEn ? 'Total Active Planter Trays / Fungi Bags:' : 'Tổng Số Khay Gieo / Bịch Phôi Hoạt Động:'}</span>
            </label>
            <span className="text-xs font-bold font-mono text-herbal-700 dark:text-herbal-300 bg-herbal-50 dark:bg-herbal-950/60 px-2.5 py-0.5 rounded-md border border-herbal-200 dark:border-herbal-800">
              {trayCount} khay
            </span>
          </div>
          <input
            type="range"
            min="4"
            max="24"
            step="1"
            value={trayCount}
            onChange={(e) => setTrayCount(Number(e.target.value))}
            className="w-full accent-herbal-600 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-charcoal-500 mt-1">
            <span>4 khay (Gia đình nhỏ)</span>
            <span>8 khay (Chuẩn cuốn chiếu hàng ngày)</span>
            <span>24 khay (Bán buôn mini)</span>
          </div>
        </div>
      </div>

      {/* Lịch trình Timeline Gantt & Kinh tế học */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Cột trái: Tiến trình Timeline cuốn chiếu (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <h4 className="font-serif font-bold text-base text-forest-950 dark:text-cream-50 flex items-center gap-2">
            <Clock className="w-4 h-4 text-herbal-600" />
            <span>Tiến Trình Gieo Trồng Cuốn Chiếu ({plan.cycleLengthDays} Ngày)</span>
          </h4>

          <div className="space-y-2">
            {plan.trayRotationSchedule.map((item, idx) => {
              const phaseBadge = {
                soak_seed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300',
                blackout_dome: 'bg-charcoal-200 text-charcoal-800 dark:bg-charcoal-700 dark:text-cream-100',
                grow_light: 'bg-herbal-100 text-herbal-800 dark:bg-herbal-900/60 dark:text-herbal-300',
                harvest_day: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300',
              }[item.phase];

              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-cream-50/50 dark:bg-charcoal-800/40 border border-forest-50 dark:border-forest-800 flex items-start gap-3"
                >
                  <span className="w-14 text-center shrink-0 font-mono text-xs font-bold text-forest-900 dark:text-cream-50 bg-white dark:bg-charcoal-700 py-1 rounded-lg border border-forest-100 dark:border-forest-800">
                    Ngày {item.dayIndex}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${phaseBadge}`}>
                        {isEn ? item.phaseTitleEn : item.phaseTitleVi}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-700 dark:text-forest-200 leading-relaxed">
                      {isEn ? item.actionInstructionEn : item.actionInstructionVi}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cột phải: Snapshot kinh tế thu hoạch (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card sản lượng */}
          <div className="p-4 rounded-2xl bg-herbal-50/60 dark:bg-herbal-950/40 border border-herbal-200 dark:border-herbal-800">
            <span className="text-xs font-bold uppercase tracking-wider text-herbal-800 dark:text-herbal-300 block mb-1">
              Sản Lượng Thu Hoạch Trung Bình
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-herbal-950 dark:text-herbal-100">
                {plan.dailyHarvestGramsAverage} g
              </span>
              <span className="text-xs font-semibold text-charcoal-600 dark:text-forest-300">/ mỗi ngày liên tục</span>
            </div>
            <p className="text-xs text-charcoal-700 dark:text-forest-200 mt-2 leading-relaxed">
              Tương đương ~{plan.monthlyHarvestYieldKg} kg rau mầm hữu cơ mỗi tháng. Đủ rau ăn cho cả gia đình và bán dư 15-20 hộp cho hàng xóm.
            </p>
          </div>

          {/* Dòng tiền ròng */}
          <div className="p-4 rounded-2xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-forest-900 dark:text-cream-100 uppercase flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-600" />
                <span>Hiệu Quả Kinh Tế / Tháng</span>
              </span>
              <span className="text-xs font-bold font-mono text-herbal-700 dark:text-herbal-400 bg-herbal-50 dark:bg-herbal-950/60 px-2 py-0.5 rounded-md border border-herbal-200">
                Lợi nhuận: +{plan.financialEconomicsMonthly.roiPercent}%
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-charcoal-700 dark:text-forest-200 border-t border-forest-50 dark:border-forest-700 pt-2 font-mono">
              <div className="flex justify-between">
                <span className="text-charcoal-500 font-sans">Chi phí hạt & thảm xơ dừa:</span>
                <span>{plan.financialEconomicsMonthly.seedAndMediumCostVnd.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500 font-sans">Tiền điện đèn LED quang hợp:</span>
                <span>{plan.financialEconomicsMonthly.electricityWaterCostVnd.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between font-bold text-forest-950 dark:text-cream-50 border-t border-forest-50 dark:border-forest-700 pt-1">
                <span className="font-sans">Lợi Nhuận Ròng Thu Về:</span>
                <span className="text-herbal-600 text-sm">+{plan.financialEconomicsMonthly.netProfitVnd.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>
          </div>

          {/* Dinh dưỡng nổi bật */}
          <div className="p-3.5 rounded-2xl bg-cream-50 dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800 text-xs">
            <span className="font-bold text-forest-900 dark:text-cream-50 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Giá Trị Sinh Học Siêu Thực Phẩm:</span>
            </span>
            <p className="text-charcoal-700 dark:text-forest-200 leading-relaxed">
              {isEn ? plan.crop.nutritionHighlightEn : plan.crop.nutritionHighlightVi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
