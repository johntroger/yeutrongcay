import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CloudSun,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Leaf,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  SEASONAL_CALENDAR_DATA,
  RegionKey
} from '../data/seasonalCalendar.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { Plant } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface SeasonalCalendarSectionProps {
  initialMonth?: number;
  initialRegion?: RegionKey;
  standalone?: boolean;
  showRecommendedPlants?: boolean;
}

export const SeasonalCalendarSection: React.FC<SeasonalCalendarSectionProps> = ({
  initialMonth,
  initialRegion = 'north',
  standalone = false,
  showRecommendedPlants = true
}) => {
  const { isEn } = useLanguage();
  
  // Tự động nhận diện tháng hiện tại theo thời gian thực (1-12)
  const currentRealMonth = useMemo(() => new Date().getMonth() + 1, []);
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth || currentRealMonth);
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>(initialRegion);

  const monthData = SEASONAL_CALENDAR_DATA[selectedMonth] || SEASONAL_CALENDAR_DATA[currentRealMonth];
  const regionGuide = monthData.regions[selectedRegion];

  // Lọc danh sách cây khuyên trồng tháng này từ kho 50 loài cây
  const recommendedPlants = useMemo(() => {
    const ids = regionGuide.recommended_plant_ids || [];
    return SEED_PLANTS.filter((p: Plant) => ids.includes(p.id));
  }, [regionGuide]);

  return (
    <section className={`w-full ${standalone ? 'py-6 sm:py-10' : 'py-12 sm:py-16'} transition-colors duration-200`}>
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? 'Urban Farming Seasonal Calendar (3 Regions)' : 'Lịch Nông Vụ Đô Thị 3 Miền (Móc Nối H4)'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-forest-950 dark:text-cream-50 tracking-tight">
            {isEn ? 'What to Plant & Care for This Month?' : 'Tháng Này Trồng Gì & Chăm Sóc Ra Sao?'}
          </h2>

          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-sans max-w-2xl mx-auto">
            {isEn
              ? 'Real-time urban farming schedule for Vietnam\'s 3 climate zones. Prevent pests, adjust watering for balconies, and seed the best local herbs & fruits.'
              : 'Thời khóa biểu làm vườn phố chuẩn tiết khí 3 miền Bắc - Trung - Nam. Phòng sương muối, nắng gắt, căn lịch tưới ban công và gieo đúng vụ các loài thảo dược & cây ăn trái.'}
          </p>
        </div>

        {/* 1. Month Navigation Pills (Tháng 1 - Tháng 12) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 px-1">
            <span>{isEn ? 'Select Month of Year:' : 'Chọn tháng trong năm:'}</span>
            <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3" />
              <span>{isEn ? `Current month: Month ${currentRealMonth}` : `Tháng hiện tại: Tháng ${currentRealMonth}`}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 px-1">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
              const isSelected = selectedMonth === m;
              const isCurrent = currentRealMonth === m;
              return (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 relative flex flex-col items-center gap-0.5 ${
                    isSelected
                      ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-charcoal-800 text-forest-900 dark:text-cream-100 border border-forest-100 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 shadow-2xs'
                  }`}
                >
                  <span>{isEn ? `Month ${m}` : `Tháng ${m}`}</span>
                  {isCurrent && (
                    <span className={`text-[9px] font-semibold px-1 rounded-full ${
                      isSelected ? 'bg-emerald-400 text-forest-950' : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {isEn ? 'Now' : 'Hiện tại'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Region Switcher (Bắc - Trung - Nam) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          {[
            { key: 'north' as RegionKey, labelVi: '🏔️ Miền Bắc', labelEn: '🏔️ North Vietnam', descVi: '4 mùa, mùa đông sương rét, xuân nồm ẩm' },
            { key: 'central' as RegionKey, labelVi: '🏖️ Miền Trung', labelEn: '🏖️ Central Vietnam', descVi: 'Gió Lào khô nóng hè, mưa bão lũ thu đông' },
            { key: 'south' as RegionKey, labelVi: '🌴 Miền Nam', labelEn: '🌴 South Vietnam', descVi: 'Nhiệt đới 2 mùa mưa - khô, nắng ấm quanh năm' }
          ].map((r) => {
            const isAct = selectedRegion === r.key;
            return (
              <button
                key={r.key}
                onClick={() => setSelectedRegion(r.key)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-2xs border ${
                  isAct
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                    : 'bg-white dark:bg-charcoal-800 text-forest-900 dark:text-cream-100 border-forest-100 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-700'
                }`}
              >
                <span>{isEn ? r.labelEn : r.labelVi}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Climate Overview & Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Left Column: Climate & Key Tasks (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-charcoal-800 rounded-3xl p-5 sm:p-7 border border-forest-100 dark:border-forest-800 shadow-sm space-y-6">
            
            {/* Solar Term & Climate Tag */}
            <div>
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  {isEn ? monthData.solar_term_en : monthData.solar_term_vi}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1.5">
                  <CloudSun className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{regionGuide.climate_tag}</span>
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-950 dark:text-cream-50">
                {isEn ? monthData.title_en : monthData.title_vi}
              </h3>

              <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 mt-2 leading-relaxed">
                {regionGuide.climate_desc}
              </p>
            </div>

            {/* Checklist of Tasks */}
            <div className="space-y-3 pt-3 border-t border-forest-50 dark:border-forest-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-cream-100 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isEn ? 'Key Tasks for Urban Gardeners This Month:' : 'Việc Cần Làm Trong Tháng Này Cho Vườn Phố:'}</span>
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {regionGuide.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-forest-50/60 dark:bg-charcoal-900/60 border border-forest-100/80 dark:border-forest-800 flex items-start gap-3 text-xs sm:text-sm text-forest-950 dark:text-cream-50"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{task}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Pest Warnings & Master Gardener Pro-Tip (5 cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Pest Alert Card */}
            <div className="bg-red-50/70 dark:bg-red-950/30 rounded-3xl p-5 sm:p-6 border border-red-200/80 dark:border-red-900/60 space-y-2.5">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-300 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>{isEn ? 'Pest & Disease Alert This Month' : 'Cảnh Báo Sâu Bệnh Mùa Này'}</span>
              </div>
              <p className="text-xs sm:text-sm text-red-950 dark:text-red-100 leading-relaxed font-medium">
                {regionGuide.pest_alert}
              </p>
            </div>

            {/* Pro Tip Card */}
            <div className="bg-emerald-50/70 dark:bg-emerald-950/30 rounded-3xl p-5 sm:p-6 border border-emerald-200/80 dark:border-emerald-900/60 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isEn ? 'Master Gardener Secret' : 'Mẹo Nhà Vườn Đô Thị'}</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed italic">
                "{regionGuide.pro_tip}"
              </p>
            </div>

            {/* Fast Clinic Link Card */}
            <div className="bg-forest-900 text-white rounded-3xl p-5 sm:p-6 flex items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Need diagnosis?' : 'Cây có biểu hiện lạ?'}</span>
                </span>
                <p className="text-xs text-forest-200">
                  {isEn ? 'Run instant 3s AI vision check on sick leaves' : 'Chụp ảnh lá sâu bệnh để AI chẩn đoán ngay trong 3 giây'}
                </p>
              </div>
              <Link
                to="/bac-si-cay-trong"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 transition flex items-center gap-1 shadow-2xs"
              >
                <span>{isEn ? 'AI Clinic' : 'Khám Ngay'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

        {/* 4. Recommended Plants to Seed / Plant This Month */}
        {showRecommendedPlants && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-950 dark:text-cream-50 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    {isEn
                      ? `Recommended Species to Plant in Month ${selectedMonth} (${selectedRegion.toUpperCase()})`
                      : `Các Loài Nên Gieo Trồng Trong Tháng ${selectedMonth} (Miền ${selectedRegion === 'north' ? 'Bắc' : selectedRegion === 'central' ? 'Trung' : 'Nam'})`}
                  </span>
                </h3>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-0.5">
                  {isEn
                    ? 'Species with optimal germination and climate compatibility this season'
                    : 'Loài cây có tỉ lệ nảy mầm và sinh trưởng tối ưu nhất theo tiết khí mùa vụ này'}
                </p>
              </div>

              <Link
                to="/thao-duoc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>{isEn ? 'View all 50 species' : 'Xem toàn bộ 50 loài'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendedPlants.map((plant: Plant) => (
                <div
                  key={plant.id}
                  className="bg-white dark:bg-charcoal-800 rounded-3xl overflow-hidden border border-forest-100 dark:border-forest-800 shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Plant Image */}
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-forest-50 dark:bg-charcoal-900">
                      <img
                        src={plant.image_url}
                        alt={plant.common_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-900/80 text-white backdrop-blur-md">
                          {plant.category === 'herb' && (isEn ? 'Native Herb' : 'Thảo Dược')}
                          {plant.category === 'fruit' && (isEn ? 'Balcony Fruit' : 'Cây Ăn Quả')}
                          {plant.category === 'ornamental' && (isEn ? 'Ornamental' : 'Cây Cảnh & Hoa')}
                        </span>
                      </div>
                    </div>

                    {/* Plant Info */}
                    <div className="p-4 space-y-1.5">
                      <h4 className="font-serif font-bold text-sm text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                        {plant.common_name}
                      </h4>
                      <p className="text-[11px] font-mono italic text-charcoal-500 dark:text-charcoal-400">
                        {plant.scientific_name}
                      </p>
                      <p className="text-xs text-charcoal-600 dark:text-charcoal-300 line-clamp-2 pt-1">
                        {plant.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-4 pb-4 pt-1 border-t border-forest-50 dark:border-forest-800/60">
                    <Link
                      to={`/cay/${plant.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 rounded-xl bg-forest-50 hover:bg-forest-100 dark:bg-charcoal-700 dark:hover:bg-charcoal-600 text-forest-900 dark:text-cream-100 text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <span>{isEn ? 'Planting Guide' : 'Xem Cách Trồng'}</span>
                      <ExternalLink className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
