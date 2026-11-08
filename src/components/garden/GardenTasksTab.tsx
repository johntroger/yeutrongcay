import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Calendar,
  RefreshCw,
  Sun,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  Check,
  Sprout,
  Plus,
  Droplets,
  Camera,
  SplitSquareVertical
} from 'lucide-react';
import { GardenPlant } from '../../types/index.ts';
import { RegionKey } from '../../data/seasonalCalendar.ts';
import { SEED_PLANTS } from '../../data/plants.ts';

export interface RegionalGuide {
  climate_tag: string;
  climate_desc: string;
  pest_alert: string;
  pro_tip: string;
  tasks: string[];
  recommended_plant_ids: string[];
}

export interface MonthData {
  month: number;
  title_vi: string;
  title_en: string;
  solar_term_vi: string;
  solar_term_en: string;
  regions: Record<RegionKey, RegionalGuide>;
}

export interface CareTaskSummary {
  plant: GardenPlant;
  daysSinceWater: number;
  daysSinceFertilize: number;
  needsWater: boolean;
  needsFertilize: boolean;
}

export interface GardenTasksTabProps {
  isEn: boolean;
  plants: GardenPlant[];
  selectedRegion: RegionKey;
  handleSelectRegion: (r: RegionKey) => void;
  selectedMonth: number;
  setSelectedMonth: (m: number) => void;
  currentRealMonth: number;
  currentMonthData: MonthData;
  currentRegionalGuide: RegionalGuide;
  completedSeasonalTasks: Record<string, boolean>;
  handleToggleSeasonalTask: (idx: number, taskText: string) => void;
  completedSeasonalCount: number;
  seasonalTasksCount: number;
  handleQuickAddSeedPlant: (seedId: string) => void;
  pendingWaterTasks: CareTaskSummary[];
  pendingFertilizeTasks: CareTaskSummary[];
  handleBatchWaterAll: () => void;
  handleBatchFertilizeAll: () => void;
  careTasks: CareTaskSummary[];
  handleCareAction: (plant: GardenPlant, action: 'water' | 'fertilize') => void;
  onOpenAddDiary: (plantId: string) => void;
  onComparePlant: (plant: GardenPlant) => void;
}

export const GardenTasksTab: React.FC<GardenTasksTabProps> = ({
  isEn,
  plants,
  selectedRegion,
  handleSelectRegion,
  selectedMonth,
  setSelectedMonth,
  currentRealMonth,
  currentMonthData,
  currentRegionalGuide,
  completedSeasonalTasks,
  handleToggleSeasonalTask,
  completedSeasonalCount,
  seasonalTasksCount,
  handleQuickAddSeedPlant,
  pendingWaterTasks,
  pendingFertilizeTasks,
  handleBatchWaterAll,
  handleBatchFertilizeAll,
  careTasks,
  handleCareAction,
  onOpenAddDiary,
  onComparePlant
}) => {
  const [taskPlantFilter, setTaskPlantFilter] = useState<'all' | 'water' | 'fertilize' | 'attention'>('all');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Regional & Monthly Switcher Bar */}
      <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 border border-forest-100 dark:border-forest-800 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-herbal-100 dark:bg-herbal-950/80 text-herbal-900 dark:text-herbal-300 border border-herbal-200 dark:border-herbal-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-herbal-600" />
                <span>{isEn ? 'Smart Urban Care Engine' : 'Trợ Lý Nông Vụ Đô Thị Thông Minh'}</span>
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                • {isEn ? 'Personalized for your micro-climate' : 'Tối ưu cho vi khí hậu từng ban công'}
              </span>
            </div>
            <h3 className="text-xl font-serif font-bold text-forest-950 dark:text-cream-50 mt-1">
              {isEn ? currentMonthData.title_en : currentMonthData.title_vi}
            </h3>
            <p className="text-xs text-forest-700 dark:text-forest-300 mt-0.5">
              {isEn ? currentMonthData.solar_term_en : currentMonthData.solar_term_vi}
            </p>
          </div>

          {/* Region Selector Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-cream-50 dark:bg-charcoal-800 border border-forest-100 dark:border-forest-700 self-start lg:self-center">
            <span className="text-[11px] font-bold text-forest-700 dark:text-forest-400 px-2 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-herbal-600" />
              <span>{isEn ? 'Region:' : 'Khu Vực:'}</span>
            </span>
            {(
              [
                { key: 'north', vi: 'Miền Bắc', en: 'North' },
                { key: 'central', vi: 'Miền Trung', en: 'Central' },
                { key: 'south', vi: 'Miền Nam', en: 'South' },
              ] as const
            ).map((r) => (
              <button
                key={r.key}
                onClick={() => handleSelectRegion(r.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  selectedRegion === r.key
                    ? 'bg-forest-900 text-white shadow-xs'
                    : 'text-forest-800 dark:text-forest-200 hover:bg-forest-100 dark:hover:bg-charcoal-700'
                }`}
              >
                <span>{isEn ? r.en : r.vi}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Month Selector Pills (1..12) */}
        <div>
          <div className="flex items-center justify-between text-xs text-forest-700 dark:text-forest-400 mb-2">
            <span className="font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isEn ? 'Select Month to Plan Ahead:' : 'Xem Lịch Nông Vụ Theo Tháng:'}</span>
            </span>
            {selectedMonth !== currentRealMonth && (
              <button
                onClick={() => setSelectedMonth(currentRealMonth)}
                className="text-herbal-600 dark:text-herbal-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isEn ? `Back to Current Month (M${currentRealMonth})` : `Về tháng hiện tại (T${currentRealMonth})`}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
              const isCurrent = m === currentRealMonth;
              const isSelected = m === selectedMonth;
              return (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-herbal-700 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-herbal-100 dark:bg-herbal-950/60 text-herbal-900 dark:text-herbal-300 border border-herbal-300 dark:border-herbal-700'
                      : 'bg-white dark:bg-charcoal-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
                  }`}
                >
                  <span>{isEn ? `M${m}` : `T${m}`}</span>
                  {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-herbal-500"></span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Climate Alert + Pro Tip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-forest-100 dark:border-forest-800">
          {/* 1. Climate Characteristics */}
          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-charcoal-800/80 border border-forest-100 dark:border-forest-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-forest-900 dark:text-cream-100 mb-1">
                <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{isEn ? 'Seasonal Climate' : 'Đặc Điểm Thời Tiết'}</span>
              </div>
              <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 mb-2">
                {currentRegionalGuide.climate_tag}
              </span>
              <p className="text-xs text-forest-700 dark:text-forest-300 leading-relaxed">
                {currentRegionalGuide.climate_desc}
              </p>
            </div>
          </div>

          {/* 2. Pest Alert */}
          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-950 dark:text-rose-200 mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{isEn ? 'Pest & Disease Alert' : 'Cảnh Báo Sâu Bệnh'}</span>
              </div>
              <p className="text-xs font-semibold text-rose-900 dark:text-rose-300 mt-1">
                ⚠️ {currentRegionalGuide.pest_alert}
              </p>
              <p className="text-[11px] text-rose-800/80 dark:text-rose-400 mt-2 leading-relaxed">
                {isEn
                  ? 'Inspect underside of young leaves. Apply cold-pressed neem oil or organic garlic extract in late afternoon.'
                  : 'Kiểm tra kỹ mặt dưới lá non. Ưu tiên phun xịt dầu neem lạnh hoặc tinh dầu tỏi ớt vào chiều mát để phòng bệnh.'}
              </p>
            </div>
          </div>

          {/* 3. Pro Farming Tip */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 dark:text-emerald-200 mb-1">
                <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isEn ? 'Expert Urban Tip' : 'Mẹo Vàng Từ Chuyên Gia'}</span>
              </div>
              <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed mt-1">
                💡 {currentRegionalGuide.pro_tip}
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Seasonal Checklist */}
        <div className="pt-2 border-t border-forest-100 dark:border-forest-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-herbal-600" />
              <h4 className="font-bold text-sm text-forest-950 dark:text-cream-50">
                {isEn
                  ? `Seasonal Urban Tasks for Month ${selectedMonth} (${completedSeasonalCount}/${seasonalTasksCount} Done)`
                  : `Nhiệm Vụ Nông Vụ Tháng ${selectedMonth} (${completedSeasonalCount}/${seasonalTasksCount} Đã xong)`}
              </h4>
            </div>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
              +{completedSeasonalCount * 5} Trái Tim ❤️
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentRegionalGuide.tasks.map((taskText, idx) => {
              const taskKey = `${selectedMonth}_${selectedRegion}_${idx}`;
              const isDone = !!completedSeasonalTasks[taskKey];
              return (
                <button
                  key={idx}
                  onClick={() => handleToggleSeasonalTask(idx, taskText)}
                  className={`p-3.5 rounded-2xl text-left transition border flex items-start gap-3 group cursor-pointer ${
                    isDone
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                      : 'bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 border-forest-100 dark:border-forest-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'border-2 border-gray-300 dark:border-gray-600 group-hover:border-herbal-500'
                    }`}
                  >
                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-xs font-semibold leading-relaxed ${
                        isDone
                          ? 'text-emerald-900 dark:text-emerald-200 line-through opacity-80'
                          : 'text-forest-900 dark:text-cream-100'
                      }`}
                    >
                      {taskText}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {isDone ? (isEn ? 'Completed ❤️' : 'Đã thực hiện ❤️') : (isEn ? 'Click to mark done (+5 Hearts ❤️)' : 'Bấm để đánh dấu (+5 Trái Tim ❤️)')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recommended Species for this Season & Region */}
      {currentRegionalGuide.recommended_plant_ids.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-serif font-bold text-base text-forest-950 dark:text-cream-50 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>
                  {isEn
                    ? `Recommended Species to Plant This Month in ${selectedRegion === 'north' ? 'the North' : selectedRegion === 'central' ? 'Central' : 'the South'}`
                    : `Giống Cây Khuyến Nghị Trồng Tháng ${selectedMonth} (${selectedRegion === 'north' ? 'Miền Bắc' : selectedRegion === 'central' ? 'Miền Trung' : 'Miền Nam'})`}
                </span>
              </h4>
              <p className="text-xs text-forest-700 dark:text-forest-300 mt-0.5">
                {isEn
                  ? 'High germination rate, strong vigor, and best suited for current urban balcony climate.'
                  : 'Tỉ lệ bén rễ cao, sinh trưởng mạnh và ít sâu bệnh nhất trong điều kiện thời tiết này.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {currentRegionalGuide.recommended_plant_ids.map((seedId) => {
              const seed = SEED_PLANTS.find((p) => p.id === seedId);
              if (!seed) return null;
              return (
                <div
                  key={seed.id}
                  className="p-3 rounded-2xl bg-cream-50 dark:bg-charcoal-800 border border-forest-100 dark:border-forest-700 flex flex-col justify-between hover:shadow-sm transition group"
                >
                  <div className="space-y-2">
                    <div className="aspect-square rounded-xl overflow-hidden bg-forest-900">
                      <img
                        src={seed.image_url}
                        alt={seed.common_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-forest-950 dark:text-cream-50 truncate">
                        {isEn ? seed.common_name_en || seed.common_name : seed.common_name}
                      </h5>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 italic truncate">
                        {seed.scientific_name}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleQuickAddSeedPlant(seed.id)}
                    className="mt-3 w-full py-1.5 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{isEn ? 'Add to Garden' : 'Thêm Vào Vườn'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Individual Plant Care Cards */}
      <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-lg text-forest-950 dark:text-cream-50 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span>{isEn ? 'Individual Plant Care Schedule' : 'Lịch Chăm Sóc Chi Tiết Từng Chậu Cây'}</span>
            </h4>
            <p className="text-xs text-forest-700 dark:text-forest-300 mt-0.5">
              {isEn
                ? 'Track moisture, nutrition cycles and log milestone photos for each plant.'
                : 'Theo dõi độ ẩm, dinh dưỡng định kỳ và ghi nhật ký ảnh cho từng chậu cây trong vườn.'}
            </p>
          </div>

          {/* Batch Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {pendingWaterTasks.length > 0 && (
              <button
                onClick={handleBatchWaterAll}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>{isEn ? `Water All (${pendingWaterTasks.length})` : `Tưới Tất Cả (${pendingWaterTasks.length} cây)`}</span>
              </button>
            )}

            {pendingFertilizeTasks.length > 0 && (
              <button
                onClick={handleBatchFertilizeAll}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>{isEn ? `Feed All (${pendingFertilizeTasks.length})` : `Bón Tất Cả (${pendingFertilizeTasks.length} cây)`}</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(
            [
              { key: 'all', labelVi: `Tất cả (${plants.length})`, labelEn: `All (${plants.length})` },
              { key: 'water', labelVi: `Cần tưới nước (${pendingWaterTasks.length})`, labelEn: `Needs Water (${pendingWaterTasks.length})` },
              { key: 'fertilize', labelVi: `Cần bón phân (${pendingFertilizeTasks.length})`, labelEn: `Needs Fertilizer (${pendingFertilizeTasks.length})` },
              { key: 'attention', labelVi: 'Cần chú ý sâu bệnh', labelEn: 'Attention / Pests' },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setTaskPlantFilter(f.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                taskPlantFilter === f.key
                  ? 'bg-forest-900 text-white shadow-xs'
                  : 'bg-forest-50 dark:bg-charcoal-800 text-forest-700 dark:text-forest-300 hover:bg-forest-100'
              }`}
            >
              {isEn ? f.labelEn : f.labelVi}
            </button>
          ))}
        </div>

        {/* Plants Care Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plants
            .filter((p) => {
              const task = careTasks.find((t) => t.plant.id === p.id);
              if (taskPlantFilter === 'water') return task?.needsWater;
              if (taskPlantFilter === 'fertilize') return task?.needsFertilize;
              if (taskPlantFilter === 'attention') return p.current_status === 'recovering' || p.current_status === 'dormant';
              return true;
            })
            .map((plant) => {
              const task = careTasks.find((t) => t.plant.id === plant.id);
              const daysWater = task?.daysSinceWater ?? 0;
              const daysFert = task?.daysSinceFertilize ?? 0;
              const waterInterval = plant.watering_interval_days || 1;
              const fertInterval = plant.fertilizing_interval_days || 14;

              const isWaterDue = daysWater >= waterInterval;
              const isFertDue = daysFert >= fertInterval;

              return (
                <div
                  key={`task-card-${plant.id}`}
                  className="p-5 rounded-2xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-700 shadow-sm flex flex-col justify-between space-y-4 hover:border-forest-300 transition"
                >
                  <div>
                    <div className="flex items-start gap-3">
                      <img
                        src={plant.cover_image_url}
                        alt={plant.custom_name}
                        className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-forest-100 dark:border-forest-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-sm text-forest-950 dark:text-cream-50 truncate">
                          {plant.custom_name}
                        </h5>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 italic truncate">
                          {plant.species_name || (isEn ? 'Urban Pot Plant' : 'Cây chậu ban công')}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-cream-100 dark:bg-charcoal-700 text-forest-800 dark:text-forest-200">
                          {plant.pot_type}
                        </span>
                      </div>
                    </div>

                    {/* Moisture & Nutrition Cycle Status */}
                    <div className="mt-4 space-y-2.5">
                      {/* Water Status */}
                      <div className="p-2.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-blue-900 dark:text-blue-300 block">
                              {isEn ? 'Watering Cycle' : 'Tưới Nước'}
                            </span>
                            <span className="text-xs font-semibold text-forest-900 dark:text-cream-100">
                              {daysWater === 999
                                ? (isEn ? 'Never watered' : 'Chưa tưới lần nào')
                                : (isEn ? `${daysWater}d ago (Cycle: ${waterInterval}d)` : `Cách đây ${daysWater} ngày (chu kỳ ${waterInterval} ngày)`)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCareAction(plant, 'water')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                            isWaterDue
                              ? 'bg-blue-600 hover:bg-blue-700 text-white animate-pulse'
                              : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-200'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>{isWaterDue ? (isEn ? 'Water Now 💧' : 'Tưới Ngay 💧') : (isEn ? 'Watered' : 'Đã tưới')}</span>
                        </button>
                      </div>

                      {/* Fertilizer Status */}
                      <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sprout className="w-4 h-4 text-amber-500" />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-amber-900 dark:text-amber-300 block">
                              {isEn ? 'Nutrition Cycle' : 'Dinh Dưỡng Phân Bón'}
                            </span>
                            <span className="text-xs font-semibold text-forest-900 dark:text-cream-100">
                              {daysFert === 999
                                ? (isEn ? 'Due for fertilizer' : 'Cần bón định kỳ')
                                : (isEn ? `${daysFert}d ago (Cycle: ${fertInterval}d)` : `Cách đây ${daysFert} ngày (chu kỳ ${fertInterval} ngày)`)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCareAction(plant, 'fertilize')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                            isFertDue
                              ? 'bg-amber-600 hover:bg-amber-700 text-white animate-pulse'
                              : 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 hover:bg-amber-200'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>{isFertDue ? (isEn ? 'Feed Now 🌿' : 'Bón Ngay 🌿') : (isEn ? 'Fed' : 'Đã bón')}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Quick Log Diary */}
                  <div className="pt-2 border-t border-forest-50 dark:border-forest-700/60 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onOpenAddDiary(plant.id)}
                      className="text-herbal-700 dark:text-herbal-400 hover:text-herbal-900 font-bold flex items-center gap-1 transition cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Photo Milestone' : 'Chụp Mốc Ảnh'}</span>
                    </button>

                    <button
                      onClick={() => onComparePlant(plant)}
                      className="text-forest-600 dark:text-forest-400 hover:text-forest-950 font-semibold flex items-center gap-1 transition cursor-pointer"
                    >
                      <SplitSquareVertical className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Compare' : 'So Sánh'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
