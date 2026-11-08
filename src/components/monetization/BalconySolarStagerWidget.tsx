import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sun,
  ShieldCheck,
  Layers,
  Coins
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import {
  simulateBalconyStaging,
  BalconyOrientation,
  BalconyStagerResult
} from '../../engines/monetization/BalconySolarStagerEngine.ts';

export const BalconySolarStagerWidget: React.FC = () => {
  const { isEn } = useLanguage();

  const [lengthMeters, setLengthMeters] = useState<number>(3.5);
  const [widthMeters, setWidthMeters] = useState<number>(1.2);
  const [floorLevel, setFloorLevel] = useState<number>(10);
  const [orientation, setOrientation] = useState<BalconyOrientation>('west');

  const simulation: BalconyStagerResult = useMemo(() => {
    return simulateBalconyStaging({
      lengthMeters,
      widthMeters,
      floorLevel,
      orientation,
      hasRoofCover: true,
    });
  }, [lengthMeters, widthMeters, floorLevel, orientation]);

  const orientationNames: Record<BalconyOrientation, { vi: string; en: string }> = {
    east: { vi: 'Hướng Đông (Nắng Sáng Dịu)', en: 'East (Gentle Morning Sun)' },
    west: { vi: 'Hướng Tây (Nắng Chiều Gay Gắt)', en: 'West (Intense Afternoon Heat)' },
    south: { vi: 'Hướng Nam (Chan Hòa Cả Ngày)', en: 'South (Balanced Full Sun)' },
    north: { vi: 'Hướng Bắc (Tán Xạ, Thiếu Nắng)', en: 'North (Indirect Low Light)' },
  };

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-sm transition-all">
      {/* Header Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-50 dark:border-forest-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2 border border-blue-200 dark:border-blue-800">
            <Compass className="w-3.5 h-3.5" />
            <span>{isEn ? 'Visual Balcony Solar Stager' : 'Bộ Mô Phỏng Không Gian & Ánh Sáng Ban Công'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-forest-950 dark:text-cream-50">
            {isEn ? '3-Tier Canopy Allocation & DLI Simulator' : 'Mô Phỏng 3 Tầng Tán & Tích Phân Ánh Sáng DLI'}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-700 dark:text-forest-200 mt-1">
            {isEn
              ? 'Select orientation, dimensions, and floor level to allocate species and calculate load safety.'
              : 'Chọn hướng ban công, diện tích và tầng lầu để phân bổ đúng loại cây theo tầng nắng và kiểm tra tải trọng an toàn.'}
          </p>
        </div>
      </div>

      {/* Điều khiển thông số ban công */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-forest-50 dark:border-forest-800">
        {/* Hướng ban công */}
        <div className="col-span-2 sm:col-span-1">
          <label className="text-xs font-bold text-forest-900 dark:text-cream-100 mb-1.5 block">
            {isEn ? 'Orientation' : 'Hướng Ban Công'}
          </label>
          <select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value as BalconyOrientation)}
            className="w-full px-3 py-2 rounded-xl border border-forest-200 dark:border-forest-700 bg-cream-50 dark:bg-charcoal-800 text-xs font-semibold text-forest-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-herbal-500"
          >
            <option value="east">Hướng Đông (Nắng sáng)</option>
            <option value="west">Hướng Tây (Nắng chiều)</option>
            <option value="south">Hướng Nam (Đầy đủ nắng)</option>
            <option value="north">Hướng Bắc (Ít nắng)</option>
          </select>
        </div>

        {/* Chiều dài */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-forest-900 dark:text-cream-100">
              {isEn ? 'Length' : 'Chiều Dài'}
            </label>
            <span className="text-xs font-mono font-bold text-herbal-700 dark:text-herbal-300">
              {lengthMeters}m
            </span>
          </div>
          <input
            type="range"
            min="1.5"
            max="6.0"
            step="0.5"
            value={lengthMeters}
            onChange={(e) => setLengthMeters(Number(e.target.value))}
            className="w-full accent-herbal-600 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Chiều rộng */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-forest-900 dark:text-cream-100">
              {isEn ? 'Width' : 'Chiều Rộng'}
            </label>
            <span className="text-xs font-mono font-bold text-herbal-700 dark:text-herbal-300">
              {widthMeters}m
            </span>
          </div>
          <input
            type="range"
            min="0.8"
            max="2.5"
            step="0.1"
            value={widthMeters}
            onChange={(e) => setWidthMeters(Number(e.target.value))}
            className="w-full accent-herbal-600 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Tầng lầu */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-forest-900 dark:text-cream-100">
              {isEn ? 'Floor Level' : 'Tầng Lầu'}
            </label>
            <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
              Tầng {floorLevel}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="35"
            step="1"
            value={floorLevel}
            onChange={(e) => setFloorLevel(Number(e.target.value))}
            className="w-full accent-blue-600 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Sơ đồ mặt cắt 3 tầng tương tác & Phân tích DLI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Cột trái: Sơ đồ 3 tầng sinh thái (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-base text-forest-950 dark:text-cream-50 flex items-center gap-2">
              <Layers className="w-4 h-4 text-herbal-600" />
              <span>{isEn ? '3-Tier Ecological Staging' : 'Sơ Đồ Phân Bổ 3 Tầng Sinh Thái'}</span>
            </h4>
            <span className="text-xs font-bold font-mono text-charcoal-600 dark:text-forest-300 bg-cream-100 dark:bg-charcoal-800 px-2.5 py-1 rounded-lg">
              Sức chứa: {simulation.totalPotCapacity} chậu (~{simulation.usableAreaM2}m²)
            </span>
          </div>

          <div className="space-y-3">
            {simulation.plantLayers.map((layer, idx) => {
              const bgColors = [
                'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
                'bg-herbal-50/80 dark:bg-herbal-950/40 border-herbal-200 dark:border-herbal-800',
                'bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
              ];
              const tagColors = [
                'text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-900/60',
                'text-herbal-800 dark:text-herbal-300 bg-herbal-100/80 dark:bg-herbal-900/60',
                'text-blue-800 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-900/60',
              ];

              return (
                <div key={idx} className={`p-4 rounded-2xl border ${bgColors[idx]} transition`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="font-bold text-xs sm:text-sm text-forest-950 dark:text-cream-50">
                      {isEn ? layer.layerTitleEn : layer.layerTitleVi}
                    </span>
                    <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-md ${tagColors[idx]}`}>
                      {layer.dliRequirement} ({layer.potCapacityCount} chậu)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(isEn ? layer.recommendedSpeciesEn : layer.recommendedSpeciesVi).map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-charcoal-900 text-xs font-semibold text-charcoal-800 dark:text-forest-200 border border-forest-100 dark:border-forest-800 shadow-2xs"
                      >
                        🌿 {spec}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cột phải: Chỉ số DLI & Kiểm tra tải trọng an toàn (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card DLI */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 uppercase">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>{isEn ? 'Daily Light Integral (DLI)' : 'Tích Phân Ánh Sáng (DLI)'}</span>
              </span>
              <span className="text-base font-bold font-mono text-amber-950 dark:text-amber-100">
                {simulation.estimatedDliDaily} mol/m²/ngày
              </span>
            </div>
            <p className="text-xs text-charcoal-700 dark:text-forest-200 leading-relaxed mt-1">
              Đón ~{simulation.directSunlightHoursDaily} giờ nắng/ngày ({orientationNames[orientation][isEn ? 'en' : 'vi']}).
            </p>
          </div>

          {/* Card Tải trọng */}
          <div className="p-4 rounded-2xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-forest-900 dark:text-cream-100 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-herbal-600" />
                <span>{isEn ? 'Structural Load Safety' : 'Tải Trọng Sàn Ban Công'}</span>
              </span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                simulation.isLoadSafe
                  ? 'bg-herbal-50 text-herbal-700 border border-herbal-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {simulation.structuralLoadKgPerM2} kg/m² ({simulation.isLoadSafe ? 'An toàn' : 'Quá tải'})
              </span>
            </div>
            <p className="text-[11px] text-charcoal-600 dark:text-forest-300">
              Tiêu chuẩn an toàn căn hộ: dưới 150 kg/m². Khung kệ ôm tường không làm võng ban công.
            </p>
          </div>

          {/* Dự toán chi phí trọn gói */}
          <div className="p-4 rounded-2xl bg-forest-900 text-white space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-herbal-300 uppercase flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                <span>{isEn ? 'Turnkey Kit Budget' : 'Dự Toán Setup Trọn Gói'}</span>
              </span>
              <span className="text-base font-bold font-mono text-cream-50">
                {simulation.setupCostEstimate.totalVnd.toLocaleString('vi-VN')} đ
              </span>
            </div>

            <div className="text-[11px] space-y-1 text-forest-200/90 border-t border-forest-800 pt-2">
              <div className="flex justify-between">
                <span>Kệ sắt module 3 tầng chịu lực:</span>
                <span className="font-mono">{simulation.setupCostEstimate.shelvingFrameVnd.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between">
                <span>{simulation.totalPotCapacity} chậu tự dưỡng đáy composite:</span>
                <span className="font-mono">{simulation.setupCostEstimate.selfWateringPlantersVnd.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between">
                <span>Bộ hẹn giờ tưới nhỏ giọt tự động:</span>
                <span className="font-mono">{simulation.setupCostEstimate.dripTimerKitVnd.toLocaleString('vi-VN')} đ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
