import React, { useState, useMemo } from 'react';
import {
  Printer,
  Sparkles,
  Thermometer,
  Clock,
  Scale
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import {
  calculateHerbalSyrupRecipe,
  HerbalBrixResult
} from '../../engines/monetization/HerbalBrixEngine.ts';

export const HerbalBrixWidget: React.FC = () => {
  const { isEn } = useLanguage();
  const [herblGrams, setHerbGrams] = useState<number>(500);

  const recipe: HerbalBrixResult = useMemo(() => {
    return calculateHerbalSyrupRecipe({
      freshHerbGrams: herblGrams,
      sweetenerType: 'cane_rock_sugar',
    });
  }, [herblGrams]);

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-sm transition-all print:border-none print:shadow-none print:p-0">
      {/* Header Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-50 dark:border-forest-800/80 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-2 border border-amber-200 dark:border-amber-800">
            <Scale className="w-3.5 h-3.5" />
            <span>{isEn ? 'Dynamic Herbal Brix Engine' : 'Bộ Đo Tỷ Lệ Vàng & Khúc Xạ Brix'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-forest-950 dark:text-cream-50">
            {isEn ? 'Herbal Cough Syrup Scaler & Brix Lab' : 'Bộ Tính Công Thức Siro Húng Chanh & Khúc Xạ Kế Brix'}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-700 dark:text-forest-200 mt-1">
            {isEn
              ? 'Input your garden-harvested herb weight. Ingredients and sterile preservation Brix scale automatically.'
              : 'Nhập số gam lá húng chanh vừa hái ở ban công để hệ thống tự động cân đối nguyên liệu theo tỷ lệ vàng dược học.'}
          </p>
        </div>

        <button
          onClick={handlePrintCard}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-forest-900 hover:bg-forest-800 text-white transition shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{isEn ? 'Print SOP Recipe Card' : 'In Thẻ Ép Plastic'}</span>
        </button>
      </div>

      {/* Input Slider: Số gam lá hái thực tế */}
      <div className="py-6 border-b border-forest-50 dark:border-forest-800 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <label className="text-xs sm:text-sm font-bold text-forest-900 dark:text-cream-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-herbal-600"></span>
            <span>{isEn ? 'Fresh Herb Leaves Harvested Today:' : 'Khối Lượng Lá Húng Chanh Vừa Hái:'}</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="50"
              max="3000"
              step="50"
              value={herblGrams}
              onChange={(e) => setHerbGrams(Number(e.target.value) || 50)}
              className="w-24 px-3 py-1.5 rounded-xl border border-forest-200 dark:border-forest-700 bg-cream-50 dark:bg-charcoal-800 text-forest-950 dark:text-cream-50 font-mono text-sm font-bold text-center focus:outline-none focus:ring-2 focus:ring-herbal-500"
            />
            <span className="text-xs font-semibold text-charcoal-600 dark:text-forest-300">gam</span>
          </div>
        </div>

        <input
          type="range"
          min="100"
          max="2000"
          step="50"
          value={herblGrams}
          onChange={(e) => setHerbGrams(Number(e.target.value))}
          className="w-full accent-herbal-600 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
        />

        {/* Nút bấm nhanh */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[200, 300, 500, 800, 1000].map((quickGrams) => (
            <button
              key={quickGrams}
              onClick={() => setHerbGrams(quickGrams)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                herblGrams === quickGrams
                  ? 'bg-herbal-600 text-white shadow-sm'
                  : 'bg-cream-100 dark:bg-charcoal-800 text-forest-900 dark:text-cream-100 hover:bg-forest-100'
              }`}
            >
              {quickGrams}g ({quickGrams / 500} mẻ)
            </button>
          ))}
        </div>
      </div>

      {/* Kết quả nguyên liệu nhảy số tự động */}
      <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cột trái: Bảng nguyên liệu chi tiết (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="font-serif font-bold text-base text-forest-950 dark:text-cream-50 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{isEn ? 'Scaled Ingredient Proportions' : 'Bảng Định Lượng Nguyên Liệu Tỷ Lệ Vàng'}</span>
          </h4>

          <div className="divide-y divide-forest-50 dark:divide-forest-800 border border-forest-100 dark:border-forest-800 rounded-2xl overflow-hidden bg-cream-50/40 dark:bg-charcoal-800/40">
            {recipe.ingredients.map((item, idx) => (
              <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-bold text-xs sm:text-sm text-forest-950 dark:text-cream-50">
                    {isEn ? item.nameEn : item.nameVi}
                  </p>
                  <p className="text-[11px] text-charcoal-600 dark:text-forest-300 leading-relaxed mt-0.5">
                    {isEn ? item.preparationNoteEn : item.preparationNoteVi}
                  </p>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="text-sm font-bold text-amber-900 dark:text-amber-200 font-mono bg-amber-50 dark:bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
                    {item.weightGrams} <span className="text-xs font-normal">g</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Snapshot thành phẩm */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800 text-center">
              <span className="text-[11px] text-charcoal-600 dark:text-forest-300">Thể Tích Thu Được</span>
              <p className="text-base font-bold text-forest-950 dark:text-cream-50 font-mono mt-0.5">
                ~{recipe.estimatedFinishedVolumeMl} <span className="text-xs font-normal">ml</span>
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800 text-center">
              <span className="text-[11px] text-charcoal-600 dark:text-forest-300">Số Hũ 200ml</span>
              <p className="text-base font-bold text-herbal-600 font-mono mt-0.5">
                {recipe.jarsCount200ml} <span className="text-xs font-normal">hũ</span>
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800 text-center">
              <span className="text-[11px] text-charcoal-600 dark:text-forest-300">Hạn Bảo Quản</span>
              <p className="text-base font-bold text-blue-600 font-mono mt-0.5">
                {recipe.shelfLifeMonths} <span className="text-xs font-normal">tháng</span>
              </p>
            </div>
          </div>
        </div>

        {/* Cột phải: Đo khúc xạ kế Brix & Kiểm soát nhiệt độ (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Đồng hồ Brix */}
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-700" />
                <span>{isEn ? 'Predicted Refractive Brix' : 'Độ Ngọt Khúc Xạ Kế Dự Phóng'}</span>
              </span>
              <span className="text-base font-bold font-mono text-amber-950 dark:text-amber-100 bg-white dark:bg-charcoal-800 px-2.5 py-0.5 rounded-lg border border-amber-300 dark:border-amber-700">
                {recipe.predictedBrix}° Bx
              </span>
            </div>

            {/* Vạch đo Brix trực quan */}
            <div className="w-full h-3 bg-amber-200/80 dark:bg-charcoal-700 rounded-full overflow-hidden relative my-2">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-herbal-500 to-amber-600 transition-all duration-500 rounded-full"
                style={{ width: `${Math.min(100, (recipe.predictedBrix / 75) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-charcoal-600 dark:text-forest-300 font-mono">
              <span>55°Bx (Loãng, dễ thiu)</span>
              <span className="font-bold text-herbal-700 dark:text-herbal-400">★ 62-65°Bx (Vùng Tự Bảo Quản)</span>
              <span>75°Bx (Lại đường)</span>
            </div>

            <p className="text-xs text-charcoal-700 dark:text-forest-200 mt-3 leading-relaxed">
              {recipe.predictedBrix >= 62 && recipe.predictedBrix <= 66
                ? '✓ Đạt ngưỡng áp suất thẩm thấu vàng! Các tế bào vi khuẩn và nấm men tự nhiên bị bất hoạt, siro để được 6 tháng ở nhiệt độ phòng mà không cần chất bảo quản.'
                : 'Đang ở ngưỡng cần kiểm soát lửa vừa phải để tránh đường bị cô đặc quá mức.'}
            </p>
          </div>

          {/* Quy trình kiểm soát 2 mốc nhiệt độ vàng */}
          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800 space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-forest-900 dark:text-cream-50 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-herbal-600" />
              <span>{isEn ? 'Critical Temperature Checkpoints' : 'Hai Mốc Nhiệt Độ Sống Còn'}</span>
            </h5>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white dark:bg-charcoal-900 border border-forest-50 dark:border-forest-800">
              <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                88°
              </span>
              <div>
                <p className="font-bold text-xs text-forest-950 dark:text-cream-50">Chưng cách thủy liu riu (85°C - 90°C)</p>
                <p className="text-[11px] text-charcoal-600 dark:text-forest-300">
                  Không đun sôi sùng sục làm bay hơi tinh dầu carvacrol. Chưng 90 phút đến khi đường sánh óng.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white dark:bg-charcoal-900 border border-forest-50 dark:border-forest-800">
              <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                45°
              </span>
              <div>
                <p className="font-bold text-xs text-forest-950 dark:text-cream-50">Châm mật ong rừng (&lt; 45°C)</p>
                <p className="text-[11px] text-charcoal-600 dark:text-forest-300">
                  TUYỆT ĐỐI KHÔNG nấu sôi mật ong. Chờ siro nguội ấm tay mới khuấy mật ong để bảo vệ enzyme sống.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
