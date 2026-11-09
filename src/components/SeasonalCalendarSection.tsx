import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  CloudSun,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Leaf,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Circle,
  RotateCcw,
  Plus,
  Sprout,
  Sun,
  Share2,
  Check,
  Clock,
  ArrowRight,
  CalendarPlus,
  Download,
  Moon,
  Compass
} from 'lucide-react';
import {
  SEASONAL_CALENDAR_DATA,
  RegionKey
} from '../data/seasonalCalendar.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { Plant, GardenPlant } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { addGardenPlant } from '../services/apiService.ts';
import {
  TWENTY_FOUR_SOLAR_TERMS,
  buildGoogleCalendarUrl,
  generateIcsContent,
  downloadIcsFile
} from '../utils/agriculturalCalendarUtils.ts';
import { CropTimelineCalculator } from './CropTimelineCalculator.tsx';
import {
  matchGardenPlantToSeedPlant,
  evaluatePlantSeasonality
} from '../utils/gardenSeasonalIntegration.ts';

interface SeasonalCalendarSectionProps {
  initialMonth?: number;
  initialRegion?: RegionKey;
  standalone?: boolean;
  showRecommendedPlants?: boolean;
}

type PlantCategoryFilter = 'all' | 'herb' | 'fruit' | 'ornamental' | 'beginner' | 'my_garden';

interface ToastNotice {
  title: string;
  desc: string;
  actionUrl?: string;
  actionLabel?: string;
}

export const SeasonalCalendarSection: React.FC<SeasonalCalendarSectionProps> = ({
  initialMonth,
  initialRegion = 'north',
  standalone = false,
  showRecommendedPlants = true
}) => {
  const { isEn } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tự động nhận diện tháng hiện tại theo thời gian thực (1-12)
  const currentRealMonth = useMemo(() => new Date().getMonth() + 1, []);

  // Đọc từ URL query params (?month=11&region=north hoặc ?thang=11&mien=north)
  const queryMonth = parseInt(searchParams.get('month') || searchParams.get('thang') || '', 10);
  const queryRegion = (searchParams.get('region') || searchParams.get('mien')) as RegionKey;
  const validUrlRegion: RegionKey | undefined = ['north', 'central', 'south'].includes(queryRegion) ? queryRegion : undefined;
  const validUrlMonth: number | undefined = queryMonth >= 1 && queryMonth <= 12 ? queryMonth : undefined;

  const [selectedMonth, setSelectedMonth] = useState<number>(validUrlMonth || initialMonth || currentRealMonth);
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>(validUrlRegion || initialRegion);

  // Bộ lọc danh mục cây
  const [categoryFilter, setCategoryFilter] = useState<PlantCategoryFilter>('all');

  // Trạng thái checklist việc cần làm (lưu localStorage)
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('ytc_calendar_completed_tasks_v1');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Trạng thái cây đã có trong vườn của tôi
  const [gardenPlantIds, setGardenPlantIds] = useState<Set<string>>(new Set());
  const [userGardenPlants, setUserGardenPlants] = useState<GardenPlant[]>([]);

  // Thông báo toast phản hồi
  const [toastNotice, setToastNotice] = useState<ToastNotice | null>(null);

  // Cập nhật danh sách cây trong vườn từ localStorage
  const refreshGardenPlants = useCallback(() => {
    try {
      const raw = localStorage.getItem('ytc_garden_plants');
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          setUserGardenPlants(list);
          const ids = new Set<string>();
          list.forEach((p: any) => {
            if (p.plant_id) ids.add(p.plant_id);
          });
          setGardenPlantIds(ids);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    refreshGardenPlants();
  }, [refreshGardenPlants]);

  // Tự động ẩn toast sau 4 giây
  useEffect(() => {
    if (toastNotice) {
      const timer = setTimeout(() => setToastNotice(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastNotice]);

  // Cập nhật URL khi chọn tháng hoặc miền
  const handleSelectMonth = (m: number) => {
    setSelectedMonth(m);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('month', String(m));
        return next;
      },
      { replace: true }
    );
  };

  const handleSelectRegion = (r: RegionKey) => {
    setSelectedRegion(r);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set('region', r);
        return next;
      },
      { replace: true }
    );
  };

  const monthData = SEASONAL_CALENDAR_DATA[selectedMonth] || SEASONAL_CALENDAR_DATA[currentRealMonth];
  const regionGuide = monthData.regions[selectedRegion];
  const solarTerms = TWENTY_FOUR_SOLAR_TERMS[selectedMonth];

  // Lọc danh sách cây khuyên trồng tháng này từ kho loài cây
  const recommendedPlants = useMemo(() => {
    const ids = regionGuide.recommended_plant_ids || [];
    return SEED_PLANTS.filter((p: Plant) => ids.includes(p.id));
  }, [regionGuide]);

  // Tính số lượng cây theo từng danh mục
  const filterCounts = useMemo(() => {
    return {
      all: recommendedPlants.length,
      herb: recommendedPlants.filter((p) => p.category === 'herb').length,
      fruit: recommendedPlants.filter((p) => p.category === 'fruit').length,
      ornamental: recommendedPlants.filter((p) => p.category === 'ornamental').length,
      beginner: recommendedPlants.filter((p) => (p.propagation_difficulty ?? 1) <= 2).length,
      my_garden: recommendedPlants.filter((p) => gardenPlantIds.has(p.id)).length
    };
  }, [recommendedPlants, gardenPlantIds]);

  // Danh sách cây hiển thị sau khi lọc
  const displayedPlants = useMemo(() => {
    return recommendedPlants.filter((plant: Plant) => {
      if (categoryFilter === 'all') return true;
      if (categoryFilter === 'beginner') return (plant.propagation_difficulty ?? 1) <= 2;
      if (categoryFilter === 'my_garden') return gardenPlantIds.has(plant.id);
      return plant.category === categoryFilter;
    });
  }, [recommendedPlants, categoryFilter, gardenPlantIds]);

  // Toggle trạng thái một nhiệm vụ trong checklist
  const handleToggleTask = (taskIndex: number) => {
    const key = `${selectedMonth}_${selectedRegion}_${taskIndex}`;
    setCompletedTasks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('ytc_calendar_completed_tasks_v1', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Đặt lại checklist tháng này
  const handleResetChecklist = () => {
    setCompletedTasks((prev) => {
      const next = { ...prev };
      regionGuide.tasks.forEach((_, idx) => {
        delete next[`${selectedMonth}_${selectedRegion}_${idx}`];
      });
      try {
        localStorage.setItem('ytc_calendar_completed_tasks_v1', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Tính tiến độ checklist
  const taskProgress = useMemo(() => {
    const total = regionGuide.tasks.length;
    const completed = regionGuide.tasks.reduce((acc, _, idx) => {
      return acc + (completedTasks[`${selectedMonth}_${selectedRegion}_${idx}`] ? 1 : 0);
    }, 0);
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percent, isAllDone: total > 0 && completed === total };
  }, [regionGuide.tasks, completedTasks, selectedMonth, selectedRegion]);

  // Xử lý 1-chạm Thêm Cây Vào Vườn Của Tôi
  const handleAddToGarden = async (plant: Plant) => {
    try {
      const newGardenPlant: GardenPlant = {
        id: `gp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        garden_id: 'gdn-default-01',
        plant_id: plant.id,
        custom_name: isEn && plant.common_name_en ? plant.common_name_en : plant.common_name,
        species_name: plant.scientific_name,
        planted_date: new Date().toISOString().split('T')[0],
        pot_type: 'Chậu ban công / Thùng xốp',
        current_status: 'healthy',
        cover_image_url: plant.image_url || '/logo.jpg',
        notes: isEn
          ? `Added from Seasonal Calendar - Month ${selectedMonth} (${selectedRegion.toUpperCase()})`
          : `Thêm từ Lịch Nông Vụ Tháng ${selectedMonth} (Miền ${selectedRegion === 'north' ? 'Bắc' : selectedRegion === 'central' ? 'Trung' : 'Nam'})`,
        watering_interval_days: plant.category === 'herb' ? 1 : 2,
        fertilizing_interval_days: 14,
        created_at: new Date().toISOString()
      };

      let existing: GardenPlant[] = [];
      try {
        const raw = localStorage.getItem('ytc_garden_plants');
        if (raw) existing = JSON.parse(raw);
      } catch {}

      const updated = [newGardenPlant, ...existing];
      localStorage.setItem('ytc_garden_plants', JSON.stringify(updated));
      setGardenPlantIds((prev) => new Set(prev).add(plant.id));

      // Gửi đồng bộ lên backend API
      addGardenPlant(newGardenPlant).catch(() => {});

      // Bật Toast thông báo thành công
      setToastNotice({
        title: isEn ? 'Added to Your Garden!' : 'Đã thêm vào Vườn của bạn! 🌱',
        desc: isEn
          ? `"${plant.common_name}" has been added to your care schedule.`
          : `"${plant.common_name}" đã được đưa vào sổ tay chăm sóc ban công.`,
        actionUrl: '/vuon-cua-toi',
        actionLabel: isEn ? 'View Garden' : 'Xem vườn ngay'
      });
    } catch (err) {
      console.error('Failed to add plant to garden:', err);
    }
  };

  // Sao chép liên kết tháng & miền
  const handleShareLink = () => {
    const url = `${window.location.origin}/lich-nong-vu?month=${selectedMonth}&region=${selectedRegion}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setToastNotice({
          title: isEn ? 'Link Copied!' : 'Đã sao chép liên kết!',
          desc: isEn
            ? `Link to Month ${selectedMonth} (${selectedRegion.toUpperCase()}) copied to clipboard.`
            : `Đã sao chép link Lịch Nông Vụ Tháng ${selectedMonth} (Miền ${selectedRegion === 'north' ? 'Bắc' : selectedRegion === 'central' ? 'Trung' : 'Nam'}).`
        });
      });
    }
  };

  // Đồng bộ Google Calendar
  const handleSyncGoogleCalendar = () => {
    const regionLabel = selectedRegion === 'north' ? 'Miền Bắc' : selectedRegion === 'central' ? 'Miền Trung' : 'Miền Nam';
    const taskList = regionGuide.tasks.map((t, i) => `${i + 1}. ${t}`).join('\n');
    const details = isEn
      ? `Urban Farming Checklist - Month ${selectedMonth} (${selectedRegion.toUpperCase()}):\n\n${taskList}\n\nPro-Tip: "${regionGuide.pro_tip}"\nPest Alert: ${regionGuide.pest_alert}\n\nFull Guide: https://yeutrongcay.com/lich-nong-vu?month=${selectedMonth}&region=${selectedRegion}`
      : `Việc làm vườn phố Tháng ${selectedMonth} (${regionLabel}):\n\n${taskList}\n\nMẹo nhà vườn: "${regionGuide.pro_tip}"\nCảnh báo sâu bệnh: ${regionGuide.pest_alert}\n\nXem chi tiết tại: https://yeutrongcay.com/lich-nong-vu?month=${selectedMonth}&region=${selectedRegion}`;

    const title = isEn
      ? `[Yeu Trong Cay] Urban Farming Schedule - Month ${selectedMonth} (${selectedRegion.toUpperCase()})`
      : `[Yêu Trồng Cây] Lịch Làm Vườn Ban Công - Tháng ${selectedMonth} (${regionLabel})`;

    const url = buildGoogleCalendarUrl({
      title,
      details,
      location: `Vườn Ban Công / Sân Thượng (${regionLabel})`,
      month: selectedMonth
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Tải file .ics chuẩn Apple/Outlook
  const handleDownloadIcs = () => {
    const regionLabel = selectedRegion === 'north' ? 'Miền Bắc' : selectedRegion === 'central' ? 'Miền Trung' : 'Miền Nam';
    const taskList = regionGuide.tasks.map((t, i) => `${i + 1}. ${t}`).join('\n');
    const description = isEn
      ? `Urban Farming Checklist - Month ${selectedMonth} (${selectedRegion.toUpperCase()}):\n${taskList}\nPro-Tip: ${regionGuide.pro_tip}`
      : `Lịch làm vườn ban công Tháng ${selectedMonth} (${regionLabel}):\n${taskList}\nMẹo nhà vườn: ${regionGuide.pro_tip}`;

    const title = isEn
      ? `[Yeu Trong Cay] Garden Schedule Month ${selectedMonth}`
      : `[Yêu Trồng Cây] Lịch Nông Vụ Tháng ${selectedMonth} (${regionLabel})`;

    const icsContent = generateIcsContent({
      title,
      description,
      month: selectedMonth,
      regionLabel
    });

    const filename = `lich-nong-vu-thang-${selectedMonth}-${selectedRegion}.ics`;
    downloadIcsFile(filename, icsContent);

    setToastNotice({
      title: isEn ? 'iCalendar (.ics) Downloaded!' : 'Đã tải lịch .iCal!',
      desc: isEn
        ? `File "${filename}" downloaded. Open to import into Apple Calendar or Outlook.`
        : `File "${filename}" đã được tải về. Hãy mở để thêm vào Apple Calendar hoặc Outlook.`
    });
  };

  // Helper hiển thị huy hiệu ánh sáng
  const renderSunlightBadge = (sunlight: string) => {
    if (sunlight === 'full_sun') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-800/60">
          <Sun className="w-3 h-3 text-amber-500" />
          <span>{isEn ? 'Full Sun' : 'Nắng trực tiếp'}</span>
        </span>
      );
    }
    if (sunlight === 'partial_shade') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60">
          <CloudSun className="w-3 h-3 text-emerald-500" />
          <span>{isEn ? 'Partial Shade' : 'Nắng bán phần'}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-md border border-sky-200/60 dark:border-sky-800/60">
        <Leaf className="w-3 h-3 text-sky-500" />
        <span>{isEn ? 'Indoor / Shade' : 'Bóng râm'}</span>
      </span>
    );
  };

  return (
    <section className={`w-full ${standalone ? 'py-6 sm:py-10' : 'py-12 sm:py-16'} transition-colors duration-200 relative`}>
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? 'Urban Farming Seasonal Calendar (3 Regions)' : 'Lịch Nông Vụ Đô Thị 3 Miền'}</span>
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
            <div className="flex items-center gap-2">
              <span>{isEn ? 'Select Month of Year:' : 'Chọn tháng trong năm:'}</span>
              {selectedMonth !== currentRealMonth && (
                <button
                  onClick={() => handleSelectMonth(currentRealMonth)}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 text-[11px] font-bold"
                >
                  <span>{isEn ? '(Back to current month)' : '(Về tháng hiện tại)'}</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShareLink}
                className="text-charcoal-600 dark:text-charcoal-300 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1 text-[11px] font-medium transition"
                title={isEn ? 'Share link to this month' : 'Sao chép liên kết tháng này'}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isEn ? 'Share' : 'Chia sẻ'}</span>
              </button>
              <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3 h-3" />
                <span>{isEn ? `Real-time: Month ${currentRealMonth}` : `Hiện tại: Tháng ${currentRealMonth}`}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 px-1">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
              const isSelected = selectedMonth === m;
              const isCurrent = currentRealMonth === m;
              return (
                <button
                  key={m}
                  onClick={() => handleSelectMonth(m)}
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
                onClick={() => handleSelectRegion(r.key)}
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

        {/* 3. Personalized My Garden Seasonal Care Section */}
        {userGardenPlants.length > 0 ? (
          <div className="bg-gradient-to-r from-emerald-50/90 via-forest-50/70 to-emerald-50/90 dark:from-charcoal-800 dark:via-charcoal-900 dark:to-charcoal-800 rounded-3xl p-5 sm:p-7 border border-emerald-200/90 dark:border-forest-700 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-2xs">
                    <Sprout className="w-3 h-3" />
                    <span>{isEn ? 'Your Garden Seasonal Schedule' : 'Lịch Vụ Riêng Cho Vườn Của Bạn'}</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    • {isEn ? `${userGardenPlants.length} plants in your garden` : `Đang quản lý ${userGardenPlants.length} chậu cây`}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950 dark:text-cream-50">
                  {isEn
                    ? `How Should Your Garden Plants Be Cared For in Month ${selectedMonth} (${selectedRegion.toUpperCase()})?`
                    : `Các Chậu Cây Trong Vườn Của Bạn Cần Chăm Sóc Gì Trong Tháng ${selectedMonth}?`}
                </h3>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
                  {isEn
                    ? 'Tailored micro-climate advice and seasonal suitability for each plant in your digital urban garden.'
                    : 'Hệ thống tự động đối chiếu từng chậu cây bạn đang trồng với tiết khí và lời khuyên mùa vụ tháng này.'}
                </p>
              </div>

              <Link
                to="/vuon-cua-toi"
                className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0 shadow-xs self-start sm:self-auto"
              >
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isEn ? 'Open My Garden' : 'Mở Vườn Của Tôi'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {userGardenPlants.map((plant) => {
                const seed = matchGardenPlantToSeedPlant(plant, SEED_PLANTS);
                const evalInfo = seed ? evaluatePlantSeasonality(seed, selectedMonth, selectedRegion) : null;

                return (
                  <div
                    key={plant.id}
                    className="p-4 rounded-2xl bg-white dark:bg-charcoal-800 border border-emerald-100 dark:border-forest-800 flex flex-col justify-between space-y-2.5 shadow-2xs hover:shadow-xs transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={plant.cover_image_url || '/logo.jpg'}
                          alt={plant.custom_name}
                          className="w-12 h-12 rounded-xl object-cover border border-emerald-100 dark:border-forest-700 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-forest-950 dark:text-cream-50 truncate">
                            {plant.custom_name}
                          </h4>
                          <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400 truncate">
                            {plant.pot_type}
                          </p>
                          {evalInfo && (
                            <span className={`inline-block px-2 py-0.2 rounded-md font-bold text-[9px] border mt-0.5 ${evalInfo.statusColor}`}>
                              {isEn ? evalInfo.statusLabelEn : evalInfo.statusLabelVi}
                            </span>
                          )}
                        </div>
                      </div>

                      {evalInfo && (
                        <p className="text-[11px] text-charcoal-700 dark:text-charcoal-300 leading-snug">
                          💡 <span className="font-semibold">{isEn ? 'Care tip: ' : 'Mẹo tháng này: '}</span>
                          {isEn ? evalInfo.regionalAdviceEn : evalInfo.regionalAdviceVi}
                        </p>
                      )}

                      {evalInfo?.warningVi && (
                        <p className="text-[10px] text-amber-800 dark:text-amber-300 font-medium leading-snug">
                          ⚠️ {isEn ? evalInfo.warningEn : evalInfo.warningVi}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-forest-50 dark:border-forest-800 flex items-center justify-between text-xs">
                      <Link
                        to="/vuon-cua-toi"
                        className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 text-[11px]"
                      >
                        <span>{isEn ? 'Log diary / Care' : 'Ghi nhật ký & Chăm sóc'}</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-forest-50/80 dark:bg-charcoal-800 rounded-3xl p-5 sm:p-6 border border-dashed border-emerald-300 dark:border-forest-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-xs sm:text-sm text-forest-950 dark:text-cream-50">
                  {isEn ? 'Connect with My Garden (Urban Care Planner)' : 'Kết Nối Với Khu Vườn Của Tôi (Sổ Tay Cây Trồng)'}
                </h4>
              </div>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-300 max-w-2xl leading-relaxed">
                {isEn
                  ? 'You have not added any plants to My Garden yet. Tap "+ Garden" on any recommended species below to automatically receive custom watering, fertilizing, and seasonal alerts!'
                  : 'Bạn chưa có chậu cây nào trong Vườn Số. Hãy bấm nút "+ Thêm" ở danh sách cây khuyên trồng bên dưới để hệ thống tự động lập lịch tưới, bón phân và cảnh báo mùa vụ dành riêng cho ban công của bạn!'}
              </p>
            </div>

            <Link
              to="/vuon-cua-toi"
              className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0 shadow-xs self-start sm:self-auto"
            >
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEn ? 'Open My Garden' : 'Mở Vườn Của Tôi'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
            </Link>
          </div>
        )}

        {/* 3. Climate Overview & Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Left Column: Climate, Key Tasks & Calendar Sync (7 cols) */}
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

            {/* Checklist of Tasks with Interactive Progress */}
            <div className="space-y-3.5 pt-3 border-t border-forest-50 dark:border-forest-800/80">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-cream-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{isEn ? 'Urban Gardening Tasks This Month:' : 'Việc Cần Làm Trong Tháng Này Cho Vườn Phố:'}</span>
                </h4>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {taskProgress.completed}/{taskProgress.total} {isEn ? 'completed' : 'việc'} ({taskProgress.percent}%)
                  </span>
                  {taskProgress.completed > 0 && (
                    <button
                      onClick={handleResetChecklist}
                      className="p-1 text-charcoal-400 hover:text-charcoal-600 dark:hover:text-charcoal-200 transition rounded-md"
                      title={isEn ? 'Reset checklist' : 'Đặt lại checklist'}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-forest-100 dark:bg-charcoal-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${taskProgress.percent}%` }}
                />
              </div>

              {/* Congratulatory Banner when 100% completed */}
              {taskProgress.isAllDone && (
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2 font-medium">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {isEn
                      ? 'Awesome! You have completed all urban farming tasks for this month! 🎉'
                      : 'Tuyệt vời! Bạn đã hoàn thành toàn bộ các đầu việc làm vườn của tháng này! 🎉'}
                  </span>
                </div>
              )}

              {/* Task Items */}
              <div className="grid grid-cols-1 gap-2.5">
                {regionGuide.tasks.map((task, idx) => {
                  const taskKey = `${selectedMonth}_${selectedRegion}_${idx}`;
                  const isDone = !!completedTasks[taskKey];
                  return (
                    <button
                      key={idx}
                      onClick={() => handleToggleTask(idx)}
                      className={`w-full text-left p-3 rounded-2xl border transition flex items-start gap-3 text-xs sm:text-sm group ${
                        isDone
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-forest-900 dark:text-cream-100'
                          : 'bg-forest-50/60 dark:bg-charcoal-900/60 border-forest-100/80 dark:border-forest-800 hover:bg-forest-100/60 dark:hover:bg-charcoal-700/60 text-forest-950 dark:text-cream-50'
                      }`}
                    >
                      <span className="shrink-0 mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-charcoal-400 group-hover:text-emerald-600 transition" />
                        )}
                      </span>
                      <span className={`leading-snug flex-1 ${isDone ? 'line-through text-charcoal-500 dark:text-charcoal-400' : ''}`}>
                        {task}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Calendar Sync Action Bar (Google Calendar & iCal) */}
              <div className="pt-3 border-t border-forest-50 dark:border-forest-800/80 flex flex-wrap items-center justify-between gap-2.5">
                <span className="text-[11px] font-semibold text-charcoal-500 dark:text-charcoal-400 flex items-center gap-1.5">
                  <CalendarPlus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isEn ? 'Sync to Personal Calendar:' : 'Đồng bộ lịch cá nhân:'}</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSyncGoogleCalendar}
                    className="px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 dark:bg-charcoal-700 dark:hover:bg-charcoal-600 text-forest-900 dark:text-cream-100 text-xs font-semibold transition flex items-center gap-1.5 border border-forest-100 dark:border-forest-700"
                    title={isEn ? 'Add to Google Calendar' : 'Thêm vào Google Calendar'}
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Google Calendar</span>
                  </button>

                  <button
                    onClick={handleDownloadIcs}
                    className="px-3 py-1.5 rounded-xl bg-forest-50 hover:bg-forest-100 dark:bg-charcoal-700 dark:hover:bg-charcoal-600 text-forest-900 dark:text-cream-100 text-xs font-semibold transition flex items-center gap-1.5 border border-forest-100 dark:border-forest-700"
                    title={isEn ? 'Download iCal file for Apple Calendar or Outlook' : 'Tải file .iCal cho iPhone, Mac, Outlook'}
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Tải file .iCal</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Pest Warnings, Master Gardener Pro-Tip & Links (5 cols) */}
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

        {/* 4. Solar Terms & Moon Cycle Deep Dive */}
        {solarTerms && (
          <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-5 sm:p-7 border border-forest-100 dark:border-forest-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-forest-950 dark:text-cream-50">
                    {isEn ? `Solar Terms & Moon Cycle in Month ${selectedMonth}` : `Tiết Khí & Quy Luật Mặt Trăng Nông Vụ Tháng ${selectedMonth}`}
                  </h3>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                    {isEn ? 'Celestial rhythm guides optimal sowing and vegetative balance' : 'Căn thời điểm gieo mầm, tỉa cành và đón lộc chuẩn theo nhịp điệu đất trời'}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Term 1 */}
              <div className="p-4 rounded-2xl bg-forest-50/60 dark:bg-charcoal-900/60 border border-forest-100 dark:border-forest-800/80 space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                    Tiết khí 1 ({solarTerms.term1.approx_date})
                  </span>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <h4 className="font-serif font-bold text-sm text-forest-950 dark:text-cream-50">
                  {isEn ? solarTerms.term1.name_en : solarTerms.term1.name_vi}
                </h4>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  {isEn ? solarTerms.term1.meaning_en : solarTerms.term1.meaning_vi}
                </p>
                <div className="pt-2 border-t border-forest-100/60 dark:border-forest-800/60 text-[11px] text-forest-800 dark:text-forest-300 font-medium leading-snug">
                  🌱 <span className="font-bold">{isEn ? 'Balcony Advice: ' : 'Mẹo làm vườn: '}</span>
                  {isEn ? solarTerms.term1.garden_advice_en : solarTerms.term1.garden_advice_vi}
                </div>
              </div>

              {/* Term 2 */}
              <div className="p-4 rounded-2xl bg-forest-50/60 dark:bg-charcoal-900/60 border border-forest-100 dark:border-forest-800/80 space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                    Tiết khí 2 ({solarTerms.term2.approx_date})
                  </span>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <h4 className="font-serif font-bold text-sm text-forest-950 dark:text-cream-50">
                  {isEn ? solarTerms.term2.name_en : solarTerms.term2.name_vi}
                </h4>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  {isEn ? solarTerms.term2.meaning_en : solarTerms.term2.meaning_vi}
                </p>
                <div className="pt-2 border-t border-forest-100/60 dark:border-forest-800/60 text-[11px] text-forest-800 dark:text-forest-300 font-medium leading-snug">
                  🌱 <span className="font-bold">{isEn ? 'Balcony Advice: ' : 'Mẹo làm vườn: '}</span>
                  {isEn ? solarTerms.term2.garden_advice_en : solarTerms.term2.garden_advice_vi}
                </div>
              </div>

              {/* Moon Phase Advice */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/80 dark:border-indigo-900/60 space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-400 uppercase">
                    {isEn ? 'Biodynamic Moon Cycle' : 'Chu Kỳ Mặt Trăng & Nông Vụ'}
                  </span>
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                </div>
                <h4 className="font-serif font-bold text-sm text-forest-950 dark:text-cream-50">
                  {isEn ? 'Sowing & Root Energy Flow' : 'Tuần Trăng & Dòng Chảy Nhựa Cây'}
                </h4>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                  {isEn ? solarTerms.moon_phase_advice_en : solarTerms.moon_phase_advice_vi}
                </p>
                <div className="pt-2 border-t border-indigo-100/60 dark:border-indigo-800/60 text-[11px] text-indigo-800 dark:text-indigo-300 font-medium leading-snug">
                  ✨ {isEn ? 'Tip: Plant leafy greens during waxing moon, feed roots during waning moon.' : 'Quy tắc vàng: Trăng lớn gieo ngọn và rau ăn lá; trăng tàn bón rễ và trồng cây lấy củ.'}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 5. Crop Timeline & Harvest Countdown Calculator */}
        <CropTimelineCalculator
          onNotify={(title, desc, actionUrl, actionLabel) => {
            setToastNotice({ title, desc, actionUrl, actionLabel });
          }}
        />

        {/* 6. Recommended Plants to Seed / Plant This Month */}
        {showRecommendedPlants && (
          <div className="space-y-5 pt-4">
            
            {/* Header and Category Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
              >
                <span>{isEn ? 'View all species' : 'Xem toàn bộ loài cây'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { key: 'all' as PlantCategoryFilter, labelVi: 'Tất cả', labelEn: 'All', count: filterCounts.all },
                { key: 'my_garden' as PlantCategoryFilter, labelVi: '🪴 Cây Trong Vườn Tôi', labelEn: '🪴 In My Garden', count: filterCounts.my_garden },
                { key: 'herb' as PlantCategoryFilter, labelVi: '🌿 Rau & Thảo dược', labelEn: '🌿 Herbs & Veggies', count: filterCounts.herb },
                { key: 'fruit' as PlantCategoryFilter, labelVi: '🍅 Quả ban công', labelEn: '🍅 Balcony Fruits', count: filterCounts.fruit },
                { key: 'ornamental' as PlantCategoryFilter, labelVi: '🌸 Hoa & Cảnh', labelEn: '🌸 Ornamentals', count: filterCounts.ornamental },
                { key: 'beginner' as PlantCategoryFilter, labelVi: '🌱 Dễ trồng', labelEn: '🌱 Beginner Friendly', count: filterCounts.beginner }
              ].map((f) => {
                const isSelected = categoryFilter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setCategoryFilter(f.key)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-2xs'
                        : 'bg-white dark:bg-charcoal-800 text-forest-900 dark:text-cream-100 border border-forest-100 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-700'
                    }`}
                  >
                    <span>{isEn ? f.labelEn : f.labelVi}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-forest-100 dark:bg-charcoal-700 text-forest-700 dark:text-forest-300'
                    }`}>
                      {f.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Plant Grid */}
            {displayedPlants.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-charcoal-800 rounded-3xl border border-forest-100 dark:border-forest-800 text-charcoal-500 dark:text-charcoal-400 text-xs">
                {isEn
                  ? 'No plants match this category in this month. Try selecting "All".'
                  : 'Không có loài cây nào thuộc nhóm này trong tháng đã chọn. Hãy thử chọn mục "Tất cả".'}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {displayedPlants.map((plant: Plant) => {
                  const isInGarden = gardenPlantIds.has(plant.id);
                  const isBeginner = (plant.propagation_difficulty ?? 1) <= 2;

                  return (
                    <div
                      key={plant.id}
                      className="bg-white dark:bg-charcoal-800 rounded-3xl overflow-hidden border border-forest-100 dark:border-forest-800 shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
                    >
                      <div>
                        {/* Plant Image & Badges */}
                        <div className="relative aspect-4/3 w-full overflow-hidden bg-forest-50 dark:bg-charcoal-900">
                          <img
                            src={plant.image_url}
                            alt={plant.common_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            loading="lazy"
                          />
                          
                          {/* Category Tag */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 flex-wrap">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-900/80 text-white backdrop-blur-md">
                              {plant.category === 'herb' && (isEn ? 'Native Herb' : 'Thảo Dược')}
                              {plant.category === 'fruit' && (isEn ? 'Balcony Fruit' : 'Cây Ăn Quả')}
                              {plant.category === 'ornamental' && (isEn ? 'Ornamental' : 'Cây Cảnh & Hoa')}
                            </span>
                            {isBeginner && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700/90 text-white backdrop-blur-md">
                                {isEn ? 'Easy' : 'Dễ trồng'}
                              </span>
                            )}
                          </div>

                          {/* Sunlight badge */}
                          <div className="absolute bottom-2.5 left-2.5">
                            {renderSunlightBadge(plant.sunlight)}
                          </div>
                        </div>

                        {/* Plant Info */}
                        <div className="p-4 space-y-2">
                          <div>
                            <h4 className="font-serif font-bold text-sm text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                              {plant.common_name}
                            </h4>
                            <p className="text-[11px] font-mono italic text-charcoal-500 dark:text-charcoal-400">
                              {plant.scientific_name}
                            </p>
                          </div>

                          {plant.growth_time && (
                            <div className="flex items-center gap-1 text-[11px] text-charcoal-500 dark:text-charcoal-400 font-sans">
                              <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span className="line-clamp-1">{plant.growth_time}</span>
                            </div>
                          )}

                          <p className="text-xs text-charcoal-600 dark:text-charcoal-300 line-clamp-2">
                            {plant.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Action Footer: Xem cách trồng + Thêm vào vườn */}
                      <div className="p-3 pt-0 space-y-2">
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-forest-50 dark:border-forest-800/60">
                          
                          <Link
                            to={`/cay/${plant.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-2 rounded-xl bg-forest-50 hover:bg-forest-100 dark:bg-charcoal-700 dark:hover:bg-charcoal-600 text-forest-900 dark:text-cream-100 text-xs font-bold transition flex items-center justify-center gap-1"
                          >
                            <span>{isEn ? 'Guide' : 'Cách Trồng'}</span>
                            <ExternalLink className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          </Link>

                          {isInGarden ? (
                            <Link
                              to="/vuon-cua-toi"
                              className="py-2 px-2 rounded-xl bg-emerald-100/70 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-1 border border-emerald-300/60 dark:border-emerald-700"
                            >
                              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span>{isEn ? 'In Garden' : 'Đã Có'}</span>
                            </Link>
                          ) : (
                            <button
                              onClick={() => handleAddToGarden(plant)}
                              className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-2xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{isEn ? '+ Garden' : '+ Thêm'}</span>
                            </button>
                          )}

                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Floating Toast Notification */}
      {toastNotice && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-forest-950 text-white rounded-2xl p-4 shadow-xl border border-forest-800 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
            <Sprout className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 space-y-1">
            <h5 className="font-bold text-xs text-cream-50">{toastNotice.title}</h5>
            <p className="text-[11px] text-charcoal-300 leading-snug">{toastNotice.desc}</p>
            {toastNotice.actionUrl && (
              <Link
                to={toastNotice.actionUrl}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:underline pt-1"
              >
                <span>{toastNotice.actionLabel}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
          <button
            onClick={() => setToastNotice(null)}
            className="text-charcoal-400 hover:text-white text-xs p-1"
          >
            ✕
          </button>
        </div>
      )}

    </section>
  );
};
