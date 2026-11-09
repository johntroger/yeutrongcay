import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  CalendarPlus,
  Sprout
} from 'lucide-react';
import {
  CROP_PRESETS,
  calculateForwardTimeline,
  calculateBackwardTimeline,
  formatDateISO,
  parseDateSafe
} from '../utils/cropTimelineCalculator.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { buildGoogleCalendarUrl } from '../utils/agriculturalCalendarUtils.ts';
import { GardenPlant } from '../types/index.ts';
import { addGardenPlant } from '../services/apiService.ts';

interface CropTimelineCalculatorProps {
  onNotify?: (title: string, desc: string, actionUrl?: string, actionLabel?: string) => void;
}

export const CropTimelineCalculator: React.FC<CropTimelineCalculatorProps> = ({ onNotify }) => {
  const { isEn } = useLanguage();

  const [selectedCropId, setSelectedCropId] = useState<string>('cherry_tomato');
  const [calcMode, setCalcMode] = useState<'forward' | 'backward'>('forward');

  // Ngày gieo hạt mặc định là hôm nay
  const todayStr = useMemo(() => formatDateISO(new Date()), []);
  const [sowingDateInput, setSowingDateInput] = useState<string>(todayStr);

  // Ngày mục tiêu thu hoạch mặc định là 60 ngày sau hoặc Tết Nguyên Đán
  const defaultTargetDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 75);
    return formatDateISO(d);
  }, []);
  const [targetHarvestDateInput, setTargetHarvestDateInput] = useState<string>(defaultTargetDateStr);

  // Tính toán kết quả
  const timeline = useMemo(() => {
    if (calcMode === 'forward') {
      return calculateForwardTimeline(selectedCropId, sowingDateInput);
    } else {
      return calculateBackwardTimeline(selectedCropId, targetHarvestDateInput);
    }
  }, [calcMode, selectedCropId, sowingDateInput, targetHarvestDateInput]);

  // Đặt nhanh ngày gieo / ngày mục tiêu
  const handleQuickSetDays = (daysFromToday: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    const dateStr = formatDateISO(d);
    if (calcMode === 'forward') {
      setSowingDateInput(dateStr);
    } else {
      setTargetHarvestDateInput(dateStr);
    }
  };

  // Đặt nhanh đón Tết Nguyên Đán (khoảng cuối tháng 1 / đầu tháng 2 dương lịch)
  const handleQuickSetTet = () => {
    const currentYear = new Date().getFullYear();
    // Ước tính ngày Tết gần nhất
    const tetEstimate = new Date(currentYear + 1, 0, 29); // Cuối tháng 1 năm sau
    const dateStr = formatDateISO(tetEstimate);
    if (calcMode === 'backward') {
      setTargetHarvestDateInput(dateStr);
    } else {
      setSowingDateInput(todayStr);
    }
  };

  // Đồng bộ ngày thu hoạch vào Google Calendar
  const handleAddHarvestToCalendar = () => {
    const title = isEn
      ? `[Yeu Trong Cay] Harvest Time: ${timeline.preset.name_en}! 🍅`
      : `[Yêu Trồng Cây] Đến Ngày Thu Hoạch: ${timeline.preset.name_vi}! 🍅`;

    const details = isEn
      ? `Expected harvest day for ${timeline.preset.name_en}.\nSown on: ${timeline.formattedSowingDate}\nTotal cycle: ${timeline.totalDays} days.\nTip: Snip fruit or tender leaves early morning for peak flavor.`
      : `Hôm nay là ngày thu hoạch dự kiến của ${timeline.preset.name_vi}.\nNgày gieo hạt: ${timeline.formattedSowingDate}\nTổng chu kỳ: ${timeline.totalDays} ngày.\nMẹo: Thu hoạch vào sáng sớm để giữ hương vị tươi giòn nhất!`;

    const harvestDate = parseDateSafe(timeline.harvestDateStr);
    const url = buildGoogleCalendarUrl({
      title,
      details,
      location: 'Vườn Ban Công / Sân Thượng',
      month: harvestDate.getMonth() + 1,
      year: harvestDate.getFullYear()
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Thêm cây này vào vườn của tôi
  const handleAddTimelineCropToGarden = async () => {
    try {
      const newPlant: GardenPlant = {
        id: `gp-calc-${Date.now()}`,
        garden_id: 'gdn-default-01',
        custom_name: isEn ? timeline.preset.name_en : timeline.preset.name_vi,
        planted_date: timeline.sowingDateStr,
        pot_type: 'Chậu thông minh / Thùng xốp',
        current_status: 'healthy',
        cover_image_url: '/logo.jpg',
        notes: isEn
          ? `Calculated Harvest Date: ${timeline.formattedHarvestDate} (${timeline.totalDays} days)`
          : `Lịch thu hoạch dự kiến: ${timeline.formattedHarvestDate} (chu kỳ ${timeline.totalDays} ngày)`,
        watering_interval_days: timeline.preset.category === 'herb' ? 1 : 2,
        fertilizing_interval_days: 14,
        created_at: new Date().toISOString()
      };

      let existing: GardenPlant[] = [];
      try {
        const raw = localStorage.getItem('ytc_garden_plants');
        if (raw) existing = JSON.parse(raw);
      } catch {}

      const updated = [newPlant, ...existing];
      localStorage.setItem('ytc_garden_plants', JSON.stringify(updated));
      addGardenPlant(newPlant).catch(() => {});

      if (onNotify) {
        onNotify(
          isEn ? 'Added Crop to Garden!' : 'Đã thêm kế hoạch vào Vườn! 🌱',
          isEn
            ? `Track "${timeline.preset.name_en}" towards harvest on ${timeline.formattedHarvestDate}.`
            : `Đã đưa "${timeline.preset.name_vi}" vào theo dõi với ngày hái dự kiến ${timeline.formattedHarvestDate}.`,
          '/vuon-cua-toi',
          isEn ? 'View Garden' : 'Xem vườn ngay'
        );
      }
    } catch (err) {
      console.error('Failed to add calculated crop:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-5 sm:p-7 border border-forest-100 dark:border-forest-800 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isEn ? 'Harvest & Crop Schedule Calculator' : 'Máy Tính Mùa Vụ & Đếm Ngược Thu Hoạch'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-950 dark:text-cream-50">
            {isEn ? 'Calculate Sowing & Harvest Timeline' : 'Tính Lịch Gieo Hạt, Ra Hoa & Ngày Thu Hoạch'}
          </h3>
          <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
            {isEn
              ? 'Predict exact germination, vegetative bloom, and harvest milestones for your balcony crops.'
              : 'Dự báo chính xác ngày nảy mầm, bón thúc, ra hoa và ngày thu hoạch tối ưu cho vườn phố.'}
          </p>
        </div>

        {/* Mode Toggle Switch */}
        <div className="flex items-center p-1 bg-forest-50 dark:bg-charcoal-900 rounded-2xl border border-forest-100 dark:border-forest-800 self-start sm:self-auto">
          <button
            onClick={() => setCalcMode('forward')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              calcMode === 'forward'
                ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-2xs'
                : 'text-forest-700 dark:text-forest-300 hover:text-forest-950'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>{isEn ? 'From Sowing Date' : 'Tính từ ngày gieo'}</span>
          </button>

          <button
            onClick={() => setCalcMode('backward')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              calcMode === 'backward'
                ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-2xs'
                : 'text-forest-700 dark:text-forest-300 hover:text-forest-950'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? 'Target Harvest Date' : 'Đón ngày thu hoạch'}</span>
          </button>
        </div>
      </div>

      {/* 1. Crop Selector Pills */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-forest-900 dark:text-cream-100 block">
          {isEn ? '1. Select Crop to Plan:' : '1. Chọn loại cây muốn tính lịch vụ:'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {CROP_PRESETS.map((crop) => {
            const isSelected = selectedCropId === crop.id;
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCropId(crop.id)}
                className={`p-3 rounded-2xl border transition text-left flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                    : 'bg-white dark:bg-charcoal-700/60 border-forest-100 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{crop.icon}</span>
                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-md bg-forest-100 dark:bg-charcoal-800 text-forest-800 dark:text-forest-300">
                    {crop.total_days_to_harvest}d
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-forest-950 dark:text-cream-50 leading-snug line-clamp-1">
                    {isEn ? crop.name_en : crop.name_vi}
                  </h4>
                  <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400 capitalize">
                    {crop.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Date Input & Quick Shortcuts */}
      <div className="p-4 rounded-2xl bg-forest-50/70 dark:bg-charcoal-900/60 border border-forest-100 dark:border-forest-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="space-y-1">
            <span className="text-xs font-bold text-forest-900 dark:text-cream-100 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>
                {calcMode === 'forward'
                  ? (isEn ? '2. Choose Sowing / Planting Date:' : '2. Chọn ngày bạn bắt đầu gieo hạt / trồng cây:')
                  : (isEn ? '2. Choose Target Harvest Date (Tet / Event):' : '2. Chọn ngày bạn muốn thu hoạch (Đón Tết / Lễ):')}
              </span>
            </span>
            <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">
              {calcMode === 'forward'
                ? (isEn ? 'We will calculate all future milestone dates and final harvest.' : 'Hệ thống sẽ tính ngày nảy mầm, ngày ra hoa và ngày hái quả dự kiến.')
                : (isEn ? 'We will calculate the latest date you must sow seeds to be on time.' : 'Hệ thống sẽ tính ngày muộn nhất bạn phải gieo hạt để kịp ngày hái.')}
            </p>
          </div>

          {/* Date Input Field */}
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={calcMode === 'forward' ? sowingDateInput : targetHarvestDateInput}
              onChange={(e) => {
                if (calcMode === 'forward') {
                  setSowingDateInput(e.target.value);
                } else {
                  setTargetHarvestDateInput(e.target.value);
                }
              }}
              className="px-3 py-2 rounded-xl border border-forest-200 dark:border-forest-700 bg-white dark:bg-charcoal-800 text-forest-950 dark:text-cream-50 text-xs font-bold shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

        </div>

        {/* Quick Shortcuts */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-forest-100 dark:border-forest-800 text-xs">
          <span className="text-[11px] text-charcoal-500 dark:text-charcoal-400 font-semibold">
            {isEn ? 'Quick presets:' : 'Chọn nhanh:'}
          </span>

          {calcMode === 'forward' ? (
            <>
              <button
                onClick={() => setSowingDateInput(todayStr)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-800 dark:text-forest-200 text-[11px] font-medium hover:bg-forest-100 transition"
              >
                {isEn ? 'Today' : 'Hôm nay'}
              </button>
              <button
                onClick={() => handleQuickSetDays(7)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-800 dark:text-forest-200 text-[11px] font-medium hover:bg-forest-100 transition"
              >
                {isEn ? 'Next week' : 'Tuần tới (+7 ngày)'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleQuickSetTet}
                className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-[11px] font-bold hover:bg-amber-200 transition flex items-center gap-1"
              >
                <span>🧧 {isEn ? 'Lunar New Year (Tet)' : 'Đón Tết Nguyên Đán'}</span>
              </button>
              <button
                onClick={() => handleQuickSetDays(60)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-800 dark:text-forest-200 text-[11px] font-medium hover:bg-forest-100 transition"
              >
                {isEn ? 'In 60 days' : 'Sau 60 ngày'}
              </button>
              <button
                onClick={() => handleQuickSetDays(90)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-800 dark:text-forest-200 text-[11px] font-medium hover:bg-forest-100 transition"
              >
                {isEn ? 'In 90 days' : 'Sau 90 ngày'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* 3. Warning Alert if Target Date is Too Late */}
      {timeline.warningMessage && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-bold">{isEn ? 'Time Constraint Warning:' : 'Lưu Ý Tiến Độ Vụ Mùa:'}</h5>
            <p className="leading-relaxed">{timeline.warningMessage}</p>
          </div>
        </div>
      )}

      {/* 4. Calculation Summary Hero Card */}
      <div className="bg-forest-900 text-white rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              {isEn ? 'Crop Cycle Summary' : 'Tổng Quan Chu Kỳ Sinh Trưởng'}
            </span>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-cream-50 flex items-center gap-2">
              <span>{timeline.preset.icon}</span>
              <span>{isEn ? timeline.preset.name_en : timeline.preset.name_vi}</span>
            </h4>
            <p className="text-xs text-forest-200">
              {isEn
                ? `Total duration: ${timeline.totalDays} days from seed to harvest.`
                : `Tổng chu kỳ sinh trưởng: ${timeline.totalDays} ngày từ lúc gieo hạt.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-forest-800/80 border border-forest-700/60 text-center">
              <span className="text-[10px] font-bold text-emerald-400 block uppercase">
                {isEn ? 'Sowing Date' : 'Ngày Bắt Đầu'}
              </span>
              <span className="text-sm font-bold text-white font-mono">
                {timeline.formattedSowingDate}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-600/40 border border-emerald-500/60 text-center">
              <span className="text-[10px] font-bold text-emerald-300 block uppercase">
                {isEn ? 'Harvest Date' : 'Ngày Thu Hoạch'}
              </span>
              <span className="text-sm font-bold text-cream-50 font-mono">
                {timeline.formattedHarvestDate}
              </span>
            </div>
          </div>
        </div>

        {/* Tet Tip Note if available */}
        {timeline.preset.tet_harvest_note_vi && (
          <div className="p-3 rounded-xl bg-forest-800/60 border border-forest-700/50 text-xs text-amber-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {isEn ? timeline.preset.tet_harvest_note_en : timeline.preset.tet_harvest_note_vi}
            </span>
          </div>
        )}

        {/* Progress Bar & Actions */}
        <div className="pt-2 border-t border-forest-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between text-xs text-forest-300 font-semibold">
              <span>{isEn ? 'Cycle Progress:' : 'Tiến trình vụ gieo:'}</span>
              <span>{timeline.daysRemaining > 0 ? (isEn ? `Còn ${timeline.daysRemaining} ngày` : `Còn ${timeline.daysRemaining} ngày nữa`) : (isEn ? 'Ready to harvest!' : 'Đã đến ngày hái!')}</span>
            </div>
            <div className="w-full h-2 bg-forest-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${timeline.progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={handleAddHarvestToCalendar}
              className="px-3 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream-100 text-xs font-bold transition flex items-center gap-1.5 border border-forest-700"
              title={isEn ? 'Add Harvest Date to Google Calendar' : 'Thêm ngày thu hoạch vào Google Calendar'}
            >
              <CalendarPlus className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEn ? 'Calendar' : 'Nhắc Lịch'}</span>
            </button>

            <button
              onClick={handleAddTimelineCropToGarden}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>{isEn ? '+ Garden' : '+ Lưu Vào Vườn'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Visual Milestones Step-by-Step Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-cream-100 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{isEn ? 'Detailed Growth Milestones:' : 'Lộ Trình Các Cột Mốc Sinh Trưởng Chi Tiết:'}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {timeline.milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-forest-50/60 dark:bg-charcoal-900/60 border border-forest-100/80 dark:border-forest-800/80 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-lg">{m.icon}</span>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-forest-100 dark:bg-charcoal-800 text-emerald-700 dark:text-emerald-400">
                    +{m.daysOffset} {isEn ? 'days' : 'ngày'}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block font-mono">
                    {m.formattedDate}
                  </span>
                  <h5 className="font-serif font-bold text-xs sm:text-sm text-forest-950 dark:text-cream-50 leading-snug">
                    {isEn ? m.stage_en : m.stage}
                  </h5>
                </div>

                <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-snug">
                  {isEn ? m.description_en : m.description_vi}
                </p>
              </div>

              <div className="pt-2 border-t border-forest-100/80 dark:border-forest-800/80 text-[11px] text-forest-800 dark:text-forest-300 leading-snug">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">💡 {isEn ? 'Care Tip: ' : 'Mẹo chăm: '}</span>
                <span>{isEn ? m.care_tip_en : m.care_tip_vi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
