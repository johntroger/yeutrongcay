import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Plus,
  Calendar,
  Sparkles,
  Camera,
  Layers,
  Leaf,
  Clock,
  Check,
  Upload,
  Loader2,
  X,
  ArrowRight,
  MapPin,
  Droplets,
  Sprout,
  CheckCircle2,
  Trash2,
  SplitSquareVertical,
  Sliders,
  Sun,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  RefreshCw,
  Compass,
  Printer,
  Bell,
  BellRing
} from 'lucide-react';
import { UserGarden, GardenPlant, PlantDiaryEntry, PlantGrowthStatus, UserProfile } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { SEASONAL_CALENDAR_DATA, RegionKey } from '../data/seasonalCalendar.ts';
import { GardenBookPrintModal } from '../components/GardenBookPrintModal.tsx';
import { BotanicalNftGallery } from '../components/BotanicalNftGallery.tsx';
import { plantPassportRegistryService } from '../services/plantPassportRegistryService.ts';
import {
  isNotificationSupported,
  isCareReminderEnabled,
  setCareReminderEnabled,
  requestNotificationPermission,
  sendBotanicalNotification,
  checkAndNotifyCareTasks
} from '../services/notificationService.ts';
import {
  getGardenData,
  addGardenPlant,
  addPlantDiaryEntry,
  uploadPlantImage,
  getUserKarma,
  logCareAction,
  deleteGardenPlant,
  deletePlantDiary
} from '../services/apiService.ts';
import { getKarmaState } from '../services/karmaService.ts';
import { applyWatermarkAndStripExif } from '../utils/watermark.ts';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext';
import { localizePlant } from '../i18n/plantTranslations';

export interface GardenPageProps {
  currentUser?: UserProfile | null;
}

export const GardenPage: React.FC<GardenPageProps> = ({ currentUser: propUser }) => {
  const { language, isEn } = useLanguage();

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (propUser) return propUser;
    try {
      const saved = localStorage.getItem('ytc_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (propUser !== undefined) {
      setCurrentUser(propUser);
    }
  }, [propUser]);

  const currentUserId = currentUser?.id || 'usr-local-me';

  useSEO({
    title: isEn
      ? 'My Digital Garden & Urban Plant Diary | Yeu Trong Cay'
      : 'Vườn Số Của Tôi & Nhật Ký Cây Trồng Đô Thị | Yêu Trồng Cây',
    description: isEn
      ? 'Manage your personal balcony and rooftop garden: track individual pot growth through Before/After photo timelines and maintain sustainable urban gardening records.'
      : 'Quản lý khu vườn ban công sân thượng cá nhân: theo dõi sự lớn lên của từng chậu cây qua dòng thời gian ảnh Before/After và lưu trữ nhật ký chăm sóc bền vững.',
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as 'plants' | 'timeline' | 'tasks' | 'nft_gallery') || 'plants';

  const [garden, setGarden] = useState<UserGarden | null>(null);
  const [plants, setPlants] = useState<GardenPlant[]>([]);
  const [diaries, setDiaries] = useState<PlantDiaryEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'plants' | 'timeline' | 'tasks' | 'nft_gallery'>(initialTab);
  const [galleryCount, setGalleryCount] = useState<number>(() => plantPassportRegistryService.getUserVerifiedGallery().length);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Điểm Karma & Huy Hiệu Đóng Góp (MS5 - H9)
  const [karmaData, setKarmaData] = useState<{
    total_karma: number;
    badge: { title: string; tier: number; icon: string; color: string };
    events: any[];
  } | null>(null);

  // Modal: Thêm Cây Mới
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const [newCustomName, setNewCustomName] = useState('');
  const [newSelectedSeedId, setNewSelectedSeedId] = useState('');
  const [newPlantedDate, setNewPlantedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newPotType, setNewPotType] = useState('Chậu nhựa thông minh 35cm');
  const [newPlantStatus, setNewPlantStatus] = useState<PlantGrowthStatus>('healthy');
  const [newWateringInterval, setNewWateringInterval] = useState(1);
  const [newNotes, setNewNotes] = useState('');
  const [plantCoverUrl, setPlantCoverUrl] = useState('');
  const [isUploadingPlantCover, setIsUploadingPlantCover] = useState(false);
  const plantFileInputRef = useRef<HTMLInputElement>(null);

  // Modal: Ghi Nhật Ký Ảnh
  const [isAddDiaryOpen, setIsAddDiaryOpen] = useState(false);
  const [diaryPlantId, setDiaryPlantId] = useState('');
  const [diaryDate, setDiaryDate] = useState(new Date().toISOString().split('T')[0]);
  const [diaryStage, setDiaryStage] = useState('Đậu quả non');
  const [diaryNote, setDiaryNote] = useState('');
  const [diaryImageUrl, setDiaryImageUrl] = useState('');
  const [isUploadingDiary, setIsUploadingDiary] = useState(false);
  const diaryFileInputRef = useRef<HTMLInputElement>(null);

  // Modal: So Sánh Ảnh Trước / Sau (Before / After Comparison)
  const [comparisonPlant, setComparisonPlant] = useState<GardenPlant | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [comparisonMode, setComparisonMode] = useState<'sideBySide' | 'slider'>('sideBySide');

  // Smart Care Engine: Vùng miền, Tháng nông vụ & Nhiệm vụ mùa vụ
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>(() => {
    const saved = localStorage.getItem('ytc_user_region');
    return saved === 'north' || saved === 'central' || saved === 'south' ? saved : 'south';
  });
  const currentRealMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(currentRealMonth);
  const [taskPlantFilter, setTaskPlantFilter] = useState<'all' | 'water' | 'fertilize' | 'attention'>('all');

  const [completedSeasonalTasks, setCompletedSeasonalTasks] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('ytc_completed_seasonal_tasks');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Modal: Xuất Sổ Tay Vườn & Hồ Sơ Cây In Ấn (PDF)
  const [isGardenBookOpen, setIsGardenBookOpen] = useState(false);
  const [printTargetPlantId, setPrintTargetPlantId] = useState<string | null>(null);

  // Chuông thông báo nhắc lịch chăm sóc cây (Web Notification API)
  const [reminderActive, setReminderActive] = useState<boolean>(() => isCareReminderEnabled());

  // Tải dữ liệu vườn
  useEffect(() => {
    let isMounted = true;
    getGardenData(currentUserId).then(({ garden: g, plants: p, diaries: d }) => {
      if (isMounted) {
        setGarden(g);
        setPlants(p);
        setDiaries(d);
        if (p.length > 0 && !diaryPlantId) {
          setDiaryPlantId(p[0].id);
        }
        if (p.length > 0) {
          checkAndNotifyCareTasks(p, isEn);
        }
      }
    });

    const localKarma = getKarmaState(isEn);
    setKarmaData({
      total_karma: localKarma.total_karma,
      badge: localKarma.badge,
      events: localKarma.events
    });

    getUserKarma(currentUserId).then((k) => {
      if (isMounted && k) {
        const total = Math.max(k.total_karma, localKarma.total_karma);
        setKarmaData({
          ...k,
          total_karma: total,
          badge: localKarma.badge
        });
      }
    });

    const handleKarmaLiveUpdate = () => {
      if (isMounted) {
        const updated = getKarmaState(isEn);
        setKarmaData({
          total_karma: updated.total_karma,
          badge: updated.badge,
          events: updated.events
        });
      }
    };
    window.addEventListener('ytc_karma_awarded', handleKarmaLiveUpdate);

    const handlePassportUpdate = () => {
      if (isMounted) {
        setGalleryCount(plantPassportRegistryService.getUserVerifiedGallery().length);
      }
    };
    window.addEventListener('ytc_passport_registry_updated', handlePassportUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('ytc_karma_awarded', handleKarmaLiveUpdate);
      window.removeEventListener('ytc_passport_registry_updated', handlePassportUpdate);
    };
  }, [currentUserId, isEn]);

  // Cập nhật tab khi URL search param thay đổi
  useEffect(() => {
    const tabParam = searchParams.get('tab') as 'plants' | 'timeline' | 'tasks' | 'nft_gallery';
    if (tabParam && ['plants', 'timeline', 'tasks', 'nft_gallery'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice(null);
    }, 4000);
  };

  // Tự động điền ảnh và tên loài khi chọn từ danh mục loài chuẩn
  const handleSelectSeedPlant = (seedId: string) => {
    setNewSelectedSeedId(seedId);
    if (!seedId) return;
    const rawPlant = SEED_PLANTS.find((p) => p.id === seedId);
    if (rawPlant) {
      const locPlant = localizePlant(rawPlant, language);
      if (!newCustomName) setNewCustomName(locPlant.common_name);
      setPlantCoverUrl(rawPlant.image_url);
      setNewWateringInterval(rawPlant.watering === 'daily' ? 1 : 2);
    }
  };

  // Upload ảnh cây đại diện kèm Watermark & EXIF Clean (H7)
  const handlePlantCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPlantCover(true);
    try {
      const cleanFile = await applyWatermarkAndStripExif(file, {
        authorName: garden?.garden_name || (isEn ? 'Urban Garden' : 'Vườn Phố'),
        brandText: 'yeutrongcay.com'
      });
      const res = await uploadPlantImage(cleanFile);
      if (res.success && res.url) {
        setPlantCoverUrl(res.url);
      }
    } catch (err) {
      console.warn('Upload plant cover error:', err);
    } finally {
      setIsUploadingPlantCover(false);
    }
  };

  // Upload ảnh nhật ký kèm Watermark & EXIF Clean (H7)
  const handleDiaryPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingDiary(true);
    try {
      const cleanFile = await applyWatermarkAndStripExif(file, {
        authorName: garden?.garden_name || (isEn ? 'Urban Garden' : 'Vườn Phố'),
        brandText: 'yeutrongcay.com'
      });
      const res = await uploadPlantImage(cleanFile);
      if (res.success && res.url) {
        setDiaryImageUrl(res.url);
      }
    } catch (err) {
      console.warn('Upload diary photo error:', err);
    } finally {
      setIsUploadingDiary(false);
    }
  };

  // Lưu cây mới
  const handleSubmitNewPlant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomName.trim()) {
      alert(isEn ? 'Please enter a name for your plant.' : 'Vui lòng nhập tên cho cây của bạn.');
      return;
    }

    const payload: Partial<GardenPlant> = {
      garden_id: garden?.id || 'gdn-default-01',
      plant_id: newSelectedSeedId || undefined,
      custom_name: newCustomName.trim(),
      species_name: SEED_PLANTS.find((p) => p.id === newSelectedSeedId)?.scientific_name,
      planted_date: newPlantedDate,
      pot_type: newPotType,
      current_status: newPlantStatus,
      watering_interval_days: newWateringInterval,
      fertilizing_interval_days: 14,
      last_watered_at: newPlantedDate,
      last_fertilized_at: newPlantedDate,
      cover_image_url: plantCoverUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
      notes: newNotes,
    };

    const res = await addGardenPlant(payload);
    if (res.success && res.data) {
      const updated = [res.data, ...plants];
      setPlants(updated);
      localStorage.setItem('ytc_garden_plants', JSON.stringify(updated));
      setIsAddPlantOpen(false);
      setNewCustomName('');
      setNewNotes('');
      setPlantCoverUrl('');
      triggerNotice(isEn ? 'Added new plant to your digital garden!' : 'Đã thêm chậu cây mới vào vườn số!');
    }
  };

  // Lưu nhật ký mới
  const handleSubmitNewDiary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diaryPlantId || !diaryNote.trim() || !diaryImageUrl) {
      alert(isEn ? 'Please select a plant, enter a note, and upload a diary photo.' : 'Vui lòng chọn cây, nhập ghi chú và tải ảnh nhật ký.');
      return;
    }

    const payload: Partial<PlantDiaryEntry> = {
      garden_plant_id: diaryPlantId,
      user_id: currentUserId,
      entry_date: diaryDate,
      stage: diaryStage,
      note: diaryNote.trim(),
      image_url: diaryImageUrl,
    };

    const res = await addPlantDiaryEntry(payload);
    if (res.success && res.data) {
      const updated = [res.data, ...diaries];
      setDiaries(updated);
      localStorage.setItem('ytc_garden_diaries', JSON.stringify(updated));
      setIsAddDiaryOpen(false);
      setDiaryNote('');
      setDiaryImageUrl('');
      triggerNotice(isEn ? 'Logged new photo growth milestone!' : 'Đã lưu mốc nhật ký sinh trưởng!');
    }
  };

  // Xóa cây
  const handleDeletePlant = async (plantId: string, plantName: string) => {
    const confirmMsg = isEn
      ? `Are you sure you want to remove "${plantName}" from your garden?`
      : `Bạn có chắc muốn xóa chậu cây "${plantName}" khỏi vườn?`;
    if (!window.confirm(confirmMsg)) return;

    await deleteGardenPlant(plantId);
    const updatedPlants = plants.filter((p) => p.id !== plantId);
    const updatedDiaries = diaries.filter((d) => d.garden_plant_id !== plantId);
    setPlants(updatedPlants);
    setDiaries(updatedDiaries);
    localStorage.setItem('ytc_garden_plants', JSON.stringify(updatedPlants));
    localStorage.setItem('ytc_garden_diaries', JSON.stringify(updatedDiaries));
    triggerNotice(isEn ? `Removed "${plantName}" from garden.` : `Đã xóa chậu cây "${plantName}".`);
  };

  // Xóa nhật ký
  const handleDeleteDiary = async (diaryId: string) => {
    const confirmMsg = isEn
      ? 'Are you sure you want to delete this diary entry?'
      : 'Bạn có chắc muốn xóa mốc nhật ký này?';
    if (!window.confirm(confirmMsg)) return;

    await deletePlantDiary(diaryId);
    const updatedDiaries = diaries.filter((d) => d.id !== diaryId);
    setDiaries(updatedDiaries);
    localStorage.setItem('ytc_garden_diaries', JSON.stringify(updatedDiaries));
    triggerNotice(isEn ? 'Deleted photo diary entry.' : 'Đã xóa mốc nhật ký.');
  };

  // Xử lý Chăm sóc nhanh 1-Click (Tưới nước / Bón phân)
  const handleCareAction = async (plant: GardenPlant, type: 'water' | 'fertilize') => {
    const today = new Date().toISOString().split('T')[0];
    await logCareAction(plant.id, type, today);

    const updatedPlants = plants.map((p) => {
      if (p.id === plant.id) {
        return {
          ...p,
          last_watered_at: type === 'water' ? today : p.last_watered_at,
          last_fertilized_at: type === 'fertilize' ? today : p.last_fertilized_at,
        };
      }
      return p;
    });

    setPlants(updatedPlants);
    localStorage.setItem('ytc_garden_plants', JSON.stringify(updatedPlants));

    const msg = type === 'water'
      ? (isEn ? `Watered "${plant.custom_name}" 💧` : `Đã tưới nước cho "${plant.custom_name}" 💧`)
      : (isEn ? `Fertilized "${plant.custom_name}" with organic worm castings 🌿` : `Đã bón phân trùn quế cho "${plant.custom_name}" 🌿`);
    triggerNotice(msg);
  };

  // Tính số ngày đã trôi qua kể từ một ngày
  const calculateDaysSince = (dateStr?: string) => {
    if (!dateStr) return 999;
    try {
      const past = new Date(dateStr).getTime();
      const now = new Date().getTime();
      return Math.max(0, Math.floor((now - past) / (1000 * 60 * 60 * 24)));
    } catch {
      return 999;
    }
  };

  const calculateDaysPlanted = (dateStr: string) => {
    return calculateDaysSince(dateStr);
  };

  // Danh sách công việc hôm nay (Today's Care Tasks)
  const careTasks = plants.map((p) => {
    const daysSinceWater = calculateDaysSince(p.last_watered_at || p.planted_date);
    const daysSinceFertilize = calculateDaysSince(p.last_fertilized_at || p.planted_date);
    const waterInterval = p.watering_interval_days || 1;
    const fertilizeInterval = p.fertilizing_interval_days || 14;

    const needsWater = daysSinceWater >= waterInterval;
    const needsFertilize = daysSinceFertilize >= fertilizeInterval;

    return {
      plant: p,
      daysSinceWater,
      daysSinceFertilize,
      needsWater,
      needsFertilize,
    };
  });

  const pendingWaterTasks = careTasks.filter((t) => t.needsWater);
  const pendingFertilizeTasks = careTasks.filter((t) => t.needsFertilize);
  const totalPendingTasks = pendingWaterTasks.length + pendingFertilizeTasks.length;

  const currentMonthData = SEASONAL_CALENDAR_DATA[selectedMonth] || SEASONAL_CALENDAR_DATA[currentRealMonth] || SEASONAL_CALENDAR_DATA[1];
  const currentRegionalGuide = currentMonthData.regions[selectedRegion];
  const seasonalTasksCount = currentRegionalGuide?.tasks?.length || 0;
  const completedSeasonalCount = currentRegionalGuide?.tasks?.filter((_, idx) => completedSeasonalTasks[`${selectedMonth}_${selectedRegion}_${idx}`]).length || 0;

  const handleSelectRegion = (r: RegionKey) => {
    setSelectedRegion(r);
    localStorage.setItem('ytc_user_region', r);
    triggerNotice(
      isEn
        ? `Switched regional farming calendar to: ${r === 'north' ? 'North' : r === 'central' ? 'Central' : 'South'}`
        : `Đã chuyển lịch nông vụ sang: ${r === 'north' ? 'Miền Bắc' : r === 'central' ? 'Miền Trung' : 'Miền Nam'}`
    );
  };

  const handleToggleSeasonalTask = (taskIndex: number, taskText: string) => {
    const taskKey = `${selectedMonth}_${selectedRegion}_${taskIndex}`;
    const isDone = !completedSeasonalTasks[taskKey];
    const newMap = { ...completedSeasonalTasks, [taskKey]: isDone };
    setCompletedSeasonalTasks(newMap);
    localStorage.setItem('ytc_completed_seasonal_tasks', JSON.stringify(newMap));

    if (isDone) {
      triggerNotice(
        isEn
          ? `Completed seasonal task: "${taskText.slice(0, 32)}..." (+5 Karma) ⭐`
          : `Đã hoàn thành nông vụ: "${taskText.slice(0, 32)}..." (+5 Karma) ⭐`
      );
    }
  };

  const handleBatchWaterAll = () => {
    if (pendingWaterTasks.length === 0) return;
    const today = new Date().toISOString().split('T')[0];
    const pendingIds = new Set(pendingWaterTasks.map((t) => t.plant.id));

    const updatedPlants = plants.map((p) => {
      if (pendingIds.has(p.id)) {
        return { ...p, last_watered_at: today };
      }
      return p;
    });

    setPlants(updatedPlants);
    localStorage.setItem('ytc_garden_plants', JSON.stringify(updatedPlants));

    for (const item of pendingWaterTasks) {
      logCareAction(item.plant.id, 'water', today);
    }

    triggerNotice(
      isEn
        ? `Hydrated all ${pendingWaterTasks.length} pending plants! 💧`
        : `Đã tưới nước cho toàn bộ ${pendingWaterTasks.length} chậu cây! 💧`
    );
  };

  const handleBatchFertilizeAll = () => {
    if (pendingFertilizeTasks.length === 0) return;
    const today = new Date().toISOString().split('T')[0];
    const pendingIds = new Set(pendingFertilizeTasks.map((t) => t.plant.id));

    const updatedPlants = plants.map((p) => {
      if (pendingIds.has(p.id)) {
        return { ...p, last_fertilized_at: today };
      }
      return p;
    });

    setPlants(updatedPlants);
    localStorage.setItem('ytc_garden_plants', JSON.stringify(updatedPlants));

    for (const item of pendingFertilizeTasks) {
      logCareAction(item.plant.id, 'fertilize', today);
    }

    triggerNotice(
      isEn
        ? `Fed all ${pendingFertilizeTasks.length} plants with organic castings! 🌿`
        : `Đã bón phân hữu cơ cho ${pendingFertilizeTasks.length} chậu cây! 🌿`
    );
  };

  const handleQuickAddSeedPlant = (seedPlantId: string) => {
    const seed = SEED_PLANTS.find((p) => p.id === seedPlantId);
    if (!seed) return;
    setNewSelectedSeedId(seed.id);
    setNewCustomName(isEn ? (seed.common_name_en || seed.common_name) : seed.common_name);
    setPlantCoverUrl(seed.image_url);
    const interval = seed.watering === 'daily' ? 1 : seed.watering === 'moderate' ? 2 : 4;
    setNewWateringInterval(interval);
    setIsAddPlantOpen(true);
  };

  const handleToggleCareReminder = async () => {
    if (!isNotificationSupported()) {
      alert(isEn ? 'Your browser does not support Web Notifications.' : 'Trình duyệt của bạn hiện chưa hỗ trợ tính năng thông báo Notification API.');
      return;
    }

    if (reminderActive) {
      setCareReminderEnabled(false);
      setReminderActive(false);
      triggerNotice(isEn ? 'Turned off daily plant care reminders.' : 'Đã tắt chuông nhắc lịch chăm cây hàng ngày.');
    } else {
      const granted = await requestNotificationPermission();
      if (granted) {
        setCareReminderEnabled(true);
        setReminderActive(true);
        sendBotanicalNotification(
          isEn ? '🌱 Yêu Trồng Cây: Care Reminders Active!' : '🌱 Yêu Trồng Cây: Đã Kích Hoạt Nhắc Lịch Tưới Cây!',
          {
            body: isEn
              ? 'You will receive gentle morning reminders when your plants need hydration or fertilizing.'
              : 'Bạn sẽ nhận được thông báo nhắc nhở mỗi sáng khi các chậu cây đến hạn tưới nước hoặc bón phân.',
            onClickUrl: '/vuon-cua-toi'
          }
        );
        triggerNotice(isEn ? 'Activated daily plant care reminders! 🔔' : 'Đã kích hoạt chuông nhắc lịch chăm sóc cây! 🔔');
      } else {
        alert(
          isEn
            ? 'Notification permission was denied. Please allow notifications in your browser site settings.'
            : 'Quyền gửi thông báo đã bị chặn. Vui lòng mở Cài đặt trang web trên trình duyệt và Cho phép (Allow) thông báo cho yeutrongcay.com.'
        );
      }
    }
  };

  const statusLabelMap: Record<PlantGrowthStatus, { labelVi: string; labelEn: string; color: string }> = {
    healthy: {
      labelVi: 'Đang phát triển xanh tốt',
      labelEn: 'Thriving & Healthy',
      color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    },
    flowering: {
      labelVi: 'Đang trổ hoa bói',
      labelEn: 'Flowering Stage',
      color: 'bg-pink-100 dark:bg-pink-950/60 text-pink-800 dark:text-pink-300 border-pink-200 dark:border-pink-800'
    },
    fruiting: {
      labelVi: 'Đang đậu quả mọng',
      labelEn: 'Fruiting Stage',
      color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    },
    recovering: {
      labelVi: 'Hồi phục sau bệnh',
      labelEn: 'Recovering Post-Pest',
      color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    },
    dormant: {
      labelVi: 'Nghỉ đông / Chờ đâm chồi',
      labelEn: 'Dormant / Awaiting Shoots',
      color: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'
    },
  };

  const stageOptions = [
    { vi: 'Mới trồng / Cắm cành', en: 'Freshly Planted / Cutting' },
    { vi: 'Đâm chồi nảy lộc', en: 'Sprouting New Shoots' },
    { vi: 'Bấm ngọn kích nhánh', en: 'Pruning / Branch Pinching' },
    { vi: 'Trổ hoa bói', en: 'First Flowering' },
    { vi: 'Đậu quả non', en: 'Young Fruit Set' },
    { vi: 'Thu hoạch đợt 1', en: 'First Harvest' },
    { vi: 'Hồi sức sau cắt tỉa', en: 'Post-Pruning Recovery' },
  ];

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-950 flex flex-col transition-colors">
      
      {/* Toast Notification Alert */}
      {actionNotice && (
        <div className="fixed top-20 right-4 z-50 bg-forest-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold border border-herbal-400 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-herbal-400 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* 1. Breadcrumb Navigation */}
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 pt-6 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700 dark:text-forest-400">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="hover:text-forest-950 dark:hover:text-cream-100 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" />
            <span>{isEn ? 'Home' : 'Trang Chủ'}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
          <span className="font-bold text-forest-950 dark:text-cream-100 flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-herbal-600 dark:text-herbal-400" />
            <span>{isEn ? 'My Digital Garden' : 'Vườn Số Của Tôi (Digital Garden)'}</span>
          </span>
        </nav>
      </div>

      <main className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-8">
        
        {/* 2. Garden Hero & Stats Header */}
        <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-sm relative overflow-hidden transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-herbal-50 dark:bg-herbal-950/60 text-herbal-800 dark:text-herbal-300 text-xs font-semibold border border-herbal-200 dark:border-herbal-800">
                <Sparkles className="w-3.5 h-3.5 text-herbal-600 dark:text-herbal-400" />
                <span>{isEn ? 'Urban Agriculture Profile' : 'Hồ Sơ Nông Nghiệp Đô Thị'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 dark:text-cream-50 tracking-tight">
                {garden?.garden_name || (isEn ? 'My Balcony Garden' : 'Vườn Ban Công Của Tôi')}
              </h1>
              <p className="text-xs sm:text-sm text-forest-700 dark:text-forest-300 max-w-2xl leading-relaxed">
                {garden?.description || (isEn
                  ? 'A cozy green retreat on an urban balcony, tracking growth journeys of individual plants via real-time photo logs and daily care schedules.'
                  : 'Khu vườn nhỏ phủ xanh ban công đô thị, theo dõi hành trình lớn lên của từng mầm cây qua ảnh chụp thời gian thực và lịch nhắc chăm sóc hàng ngày.')}
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-forest-600 dark:text-forest-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {garden?.city || (isEn ? 'Ho Chi Minh City' : 'TP. Hồ Chí Minh')}
                </span>
                <span className="w-1 h-1 rounded-full bg-forest-300"></span>
                <span>
                  {isEn ? 'Garden type: ' : 'Loại vườn: '}
                  {garden?.garden_type === 'balcony'
                    ? (isEn ? 'Apartment Balcony' : 'Ban công chung cư')
                    : (isEn ? 'Rooftop Terrace' : 'Sân thượng')}
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsAddPlantOpen(true)}
                className="px-5 py-2.5 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-herbal-400" />
                <span>{isEn ? 'Add New Plant' : 'Thêm Cây Mới'}</span>
              </button>
              <button
                onClick={() => setIsAddDiaryOpen(true)}
                className="px-5 py-2.5 rounded-2xl bg-herbal-50 dark:bg-charcoal-800 hover:bg-herbal-100 dark:hover:bg-charcoal-700 text-herbal-900 dark:text-herbal-300 text-xs font-bold border border-herbal-200 dark:border-forest-800 transition flex items-center gap-1.5"
              >
                <Camera className="w-4 h-4 text-herbal-700 dark:text-herbal-400" />
                <span>{isEn ? 'Log Photo Entry' : 'Ghi Nhật Ký Ảnh'}</span>
              </button>
              <button
                onClick={() => {
                  setPrintTargetPlantId(null);
                  setIsGardenBookOpen(true);
                }}
                className="px-5 py-2.5 rounded-2xl bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 text-xs font-bold border border-forest-200 dark:border-forest-700 transition flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isEn ? 'Export Garden Book (PDF)' : 'Xuất Sổ Tay Vườn (PDF)'}</span>
              </button>
              <button
                onClick={handleToggleCareReminder}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm border ${
                  reminderActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    : 'bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-800 dark:text-forest-200 border-forest-200 dark:border-forest-700'
                }`}
                title={isEn ? 'Daily care reminder notification' : 'Bật/Tắt chuông nhắc tưới cây hàng ngày'}
              >
                {reminderActive ? (
                  <>
                    <BellRing className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>{isEn ? 'Reminders Active' : 'Đang Bật Nhắc'}</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4 text-forest-500" />
                    <span>{isEn ? 'Care Reminders' : 'Nhắc Lịch Tưới'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-forest-50 dark:border-forest-800">
            <div className="bg-forest-50/60 dark:bg-charcoal-800/80 p-4 rounded-2xl border border-forest-100 dark:border-forest-800">
              <span className="text-[11px] font-semibold text-forest-700 dark:text-forest-300">
                {isEn ? 'Total Plants Grown' : 'Tổng Số Cây Đang Trồng'}
              </span>
              <p className="text-2xl font-serif font-bold text-forest-950 dark:text-cream-50 mt-0.5">{plants.length}</p>
            </div>

            <div className="bg-forest-50/60 dark:bg-charcoal-800/80 p-4 rounded-2xl border border-forest-100 dark:border-forest-800">
              <span className="text-[11px] font-semibold text-forest-700 dark:text-forest-300">
                {isEn ? 'Tasks Pending Today' : 'Việc Cần Chăm Hôm Nay'}
              </span>
              <p className={`text-2xl font-serif font-bold mt-0.5 ${totalPendingTasks > 0 ? 'text-terracotta-600 dark:text-terracotta-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                {totalPendingTasks > 0 ? `${totalPendingTasks} việc` : (isEn ? 'Done ✨' : 'Đã xong ✨')}
              </p>
            </div>

            <div className="bg-forest-50/60 dark:bg-charcoal-800/80 p-4 rounded-2xl border border-forest-100 dark:border-forest-800">
              <span className="text-[11px] font-semibold text-forest-700 dark:text-forest-300">
                {isEn ? 'Saved Diary Milestones' : 'Mốc Nhật Ký Đã Lưu'}
              </span>
              <p className="text-2xl font-serif font-bold text-herbal-700 dark:text-herbal-400 mt-0.5">{diaries.length}</p>
            </div>

            <div className="bg-forest-50/60 dark:bg-charcoal-800/80 p-4 rounded-2xl border border-forest-100 dark:border-forest-800">
              <span className="text-[11px] font-semibold text-forest-700 dark:text-forest-300">
                {isEn ? 'Safety Standard H7' : 'Tuân Thủ An Toàn H7'}
              </span>
              <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mt-1.5 flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {isEn ? 'EXIF Strip & Watermark' : 'Tẩy EXIF & Watermark'}
              </p>
            </div>
          </div>

          {/* Karma & Community Standing Box (MS5 - H9) */}
          {karmaData && (
            <div className="mt-6 p-4 rounded-2xl bg-linear-to-r from-forest-900 via-forest-850 to-forest-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-forest-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-2xl shrink-0 border border-white/15">
                  {karmaData.badge.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm tracking-wide text-white">
                      {karmaData.badge.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-forest-950">
                      {isEn ? `Tier ${karmaData.badge.tier}` : `Cấp ${karmaData.badge.tier}`}
                    </span>
                  </div>
                  <p className="text-xs text-forest-200 mt-0.5">
                    {isEn
                      ? 'Community trust badge based on sharing history and helpful garden contributions (H9)'
                      : 'Huy hiệu tín nhiệm cộng đồng dựa trên lịch sử đóng góp và chia sẻ mầm cây (H9)'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-forest-300 tracking-wider block">
                    {isEn ? 'Karma Standing' : 'Điểm Uy Tín Karma'}
                  </span>
                  <span className="text-xl font-bold font-serif text-amber-300">+{karmaData.total_karma} pts</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
                  ★
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Lịch Nhắc Chăm Sóc Cây Hàng Ngày (Today's Care Tasks Widget) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-800 shadow-sm transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                <h2 className="text-lg font-serif font-bold text-forest-950 dark:text-cream-50 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>{isEn ? "Today's Urban Garden Care Checklist" : 'Lịch Nhắc Chăm Sóc Vườn Hôm Nay'}</span>
                </h2>
              </div>
              <p className="text-xs text-forest-700 dark:text-forest-300 mt-1">
                {isEn
                  ? 'Personalized daily care tasks based on each species watering cycles and nutritional phases.'
                  : 'Tự động tính toán chu kỳ tưới và bón phân hữu cơ cho từng chậu cây trên ban công.'}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {pendingWaterTasks.length > 0 && (
                <button
                  onClick={handleBatchWaterAll}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>{isEn ? `Water All (${pendingWaterTasks.length})` : `Tưới Tất Cả (${pendingWaterTasks.length})`}</span>
                </button>
              )}
              {pendingFertilizeTasks.length > 0 && (
                <button
                  onClick={handleBatchFertilizeAll}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                >
                  <Sprout className="w-3.5 h-3.5" />
                  <span>{isEn ? `Feed All (${pendingFertilizeTasks.length})` : `Bón Tất Cả (${pendingFertilizeTasks.length})`}</span>
                </button>
              )}
              <button
                onClick={() => setActiveTab('tasks')}
                className="px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Calendar className="w-3.5 h-3.5 text-herbal-400" />
                <span>{isEn ? 'Smart Care Engine 3 Regions' : 'Nông Vụ 3 Miền & Chi Tiết'}</span>
              </button>
            </div>
          </div>

          {totalPendingTasks === 0 ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shrink-0 shadow-sm">
                🌱
              </div>
              <div>
                <h4 className="font-bold text-sm text-emerald-950 dark:text-emerald-100">
                  {isEn ? 'All plants are nurtured and hydrated!' : 'Tuyệt vời! Toàn bộ chậu cây đã được chăm sóc đầy đủ!'}
                </h4>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300 mt-0.5">
                  {isEn
                    ? 'No watering or fertilizing tasks pending for today. Keep observing new leaves and basking sunlight.'
                    : 'Không còn cây nào bị khát nước hay trễ lịch bón phân hôm nay. Hãy tiếp tục ngắm nhìn chồi non lớn lên.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cần tưới nước */}
              {pendingWaterTasks.map(({ plant, daysSinceWater }) => (
                <div
                  key={`water-${plant.id}`}
                  className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/80 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={plant.cover_image_url}
                      alt={plant.custom_name}
                      className="w-12 h-12 rounded-xl object-cover border border-blue-200 dark:border-blue-700 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-forest-950 dark:text-cream-50">
                        {plant.custom_name}
                      </h4>
                      <p className="text-[11px] text-blue-700 dark:text-blue-300 flex items-center gap-1 mt-0.5">
                        <Droplets className="w-3 h-3" />
                        <span>
                          {daysSinceWater === 999
                            ? (isEn ? 'Needs initial watering' : 'Chưa ghi nhận lần tưới nào')
                            : (isEn ? `Watered ${daysSinceWater} days ago (Due now)` : `Đã qua ${daysSinceWater} ngày chưa tưới`)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCareAction(plant, 'water')}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Watered 💧' : 'Đã tưới 💧'}</span>
                  </button>
                </div>
              ))}

              {/* Cần bón phân */}
              {pendingFertilizeTasks.map(({ plant, daysSinceFertilize }) => (
                <div
                  key={`fert-${plant.id}`}
                  className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={plant.cover_image_url}
                      alt={plant.custom_name}
                      className="w-12 h-12 rounded-xl object-cover border border-amber-200 dark:border-amber-700 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-forest-950 dark:text-cream-50">
                        {plant.custom_name}
                      </h4>
                      <p className="text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1 mt-0.5">
                        <Sprout className="w-3 h-3" />
                        <span>
                          {daysSinceFertilize === 999
                            ? (isEn ? 'Due for organic fertilizer' : 'Đến hạn bón thúc định kỳ')
                            : (isEn ? `Last fed ${daysSinceFertilize} days ago` : `Đã ${daysSinceFertilize} ngày chưa bón phân`)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCareAction(plant, 'fertilize')}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Fed 🌿' : 'Đã bón 🌿'}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Navigation Tabs: Cây Trong Vườn vs Lịch Chăm Sóc Thông Minh vs Dòng Thời Gian Nhật Ký */}
        <div className="flex items-center gap-2 border-b border-forest-100 dark:border-forest-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('plants')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'plants'
                ? 'bg-forest-900 text-white shadow-xs'
                : 'bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isEn ? `Garden Plants (${plants.length})` : `Cây Trong Vườn (${plants.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap relative ${
              activeTab === 'tasks'
                ? 'bg-forest-900 text-white shadow-xs'
                : 'bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-herbal-400" />
            <span>{isEn ? 'Smart Care Schedule' : 'Lịch Chăm Sóc Thông Minh'}</span>
            {totalPendingTasks > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-terracotta-500 text-white">
                {totalPendingTasks}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'timeline'
                ? 'bg-forest-900 text-white shadow-xs'
                : 'bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isEn ? `Before/After Photo Timeline (${diaries.length})` : `Dòng Thời Gian Ảnh Before/After (${diaries.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('nft_gallery')}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap relative ${
              activeTab === 'nft_gallery'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm'
                : 'bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-amber-50/50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isEn ? 'Living Botanical NFT Gallery' : 'Hộ Chiếu Cây NFT (Độc Bản)'}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {galleryCount}
            </span>
          </button>
        </div>

        {/* 5. Tab 1: Plants Grid */}
        {activeTab === 'plants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => {
              const days = calculateDaysPlanted(plant.planted_date);
              const plantDiaries = diaries.filter((d) => d.garden_plant_id === plant.id);
              const statusInfo = statusLabelMap[plant.current_status];

              return (
                <div
                  key={plant.id}
                  className="bg-white dark:bg-charcoal-900 rounded-3xl overflow-hidden border border-forest-100 dark:border-forest-800 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Plant Image & Status */}
                    <div className="relative aspect-[16/10] bg-forest-900 overflow-hidden">
                      <img
                        src={plant.cover_image_url}
                        alt={plant.custom_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs border ${
                            statusInfo?.color || 'bg-white text-forest-900'
                          }`}
                        >
                          {isEn ? statusInfo?.labelEn : statusInfo?.labelVi}
                        </span>
                      </div>

                      {/* Nút Xóa Chậu Cây */}
                      <button
                        onClick={() => handleDeletePlant(plant.id, plant.custom_name)}
                        title={isEn ? 'Remove plant' : 'Xóa chậu cây'}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-forest-950/70 hover:bg-red-600 text-white transition backdrop-blur-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-forest-950/80 backdrop-blur-xs text-white text-[10px] font-semibold">
                        {isEn ? `Planted ${days} days ago` : `Đã trồng ${days} ngày`}
                      </div>
                    </div>

                    {/* Plant Info */}
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif font-bold text-lg text-forest-950 dark:text-cream-50 leading-snug">
                            {plant.custom_name}
                          </h3>
                          {plant.species_name && (
                            <p className="text-xs italic text-herbal-700 dark:text-herbal-400 font-serif">
                              {plant.species_name}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-forest-700/80 dark:text-forest-300 line-clamp-2 leading-relaxed">
                        {plant.notes || (isEn ? 'Naturally tended in an urban balcony container.' : 'Cây được chăm sóc tự nhiên trong chậu ban công.')}
                      </p>

                      <div className="pt-2 text-[11px] text-forest-600 dark:text-forest-400 flex items-center justify-between border-t border-forest-50 dark:border-forest-800">
                        <span>{isEn ? `Pot: ${plant.pot_type}` : `Chậu: ${plant.pot_type}`}</span>
                        <span className="font-medium text-herbal-700 dark:text-herbal-400">
                          {isEn ? `${plantDiaries.length} photo logs` : `${plantDiaries.length} mốc ảnh`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 bg-cream-50/50 dark:bg-charcoal-800/60 border-t border-forest-100 dark:border-forest-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setDiaryPlantId(plant.id);
                          setIsAddDiaryOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-950 transition flex items-center gap-1 shadow-xs"
                      >
                        <Camera className="w-3.5 h-3.5 text-herbal-400" />
                        <span>{isEn ? 'Log Photo' : 'Chụp ảnh'}</span>
                      </button>

                      {/* Nút so sánh Before / After */}
                      <button
                        onClick={() => {
                          setComparisonPlant(plant);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-herbal-50 dark:bg-charcoal-700 border border-herbal-200 dark:border-forest-700 text-herbal-900 dark:text-herbal-300 text-xs font-semibold hover:bg-herbal-100 transition flex items-center gap-1"
                        title={isEn ? 'Compare growth Before/After' : 'So sánh ảnh lớn lên Trước/Sau'}
                      >
                        <SplitSquareVertical className="w-3.5 h-3.5 text-herbal-700 dark:text-herbal-400" />
                        <span>{isEn ? 'Before/After' : 'So sánh lớn'}</span>
                      </button>

                      {/* Nút xuất hồ sơ cây PDF */}
                      <button
                        onClick={() => {
                          setPrintTargetPlantId(plant.id);
                          setIsGardenBookOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-charcoal-700 border border-forest-200 dark:border-forest-700 text-forest-800 dark:text-forest-200 text-xs font-semibold hover:bg-forest-50 transition flex items-center gap-1"
                        title={isEn ? 'Print Plant Dossier (PDF)' : 'In Hồ Sơ Cây (PDF)'}
                      >
                        <Printer className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{isEn ? 'PDF' : 'Hồ sơ'}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedPlantId(plant.id);
                        setActiveTab('timeline');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-900 dark:text-cream-100 text-xs font-semibold hover:bg-forest-50 dark:hover:bg-charcoal-700 transition flex items-center gap-1"
                    >
                      <span>{isEn ? 'Timeline' : 'Nhật ký'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-forest-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 5. Tab: Smart Care Engine (Lịch Chăm Sóc Thông Minh 3 Miền & Từng Chậu Cây) */}
        {activeTab === 'tasks' && (
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
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
                      className="text-herbal-600 dark:text-herbal-400 font-bold hover:underline flex items-center gap-1"
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
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1 ${
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
                  <span className="text-xs font-bold text-herbal-700 dark:text-herbal-300">
                    +{completedSeasonalCount * 5} Karma
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
                        className={`p-3.5 rounded-2xl text-left transition border flex items-start gap-3 group ${
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
                            {isDone ? (isEn ? 'Completed ⭐' : 'Đã thực hiện ⭐') : (isEn ? 'Click to mark done (+5 Karma)' : 'Bấm để đánh dấu (+5 Karma)')}
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
                          className="mt-3 w-full py-1.5 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition"
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
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      <span>{isEn ? `Water All (${pendingWaterTasks.length})` : `Tưới Tất Cả (${pendingWaterTasks.length} cây)`}</span>
                    </button>
                  )}

                  {pendingFertilizeTasks.length > 0 && (
                    <button
                      onClick={handleBatchFertilizeAll}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
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
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
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
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
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
                            onClick={() => {
                              setDiaryPlantId(plant.id);
                              setIsAddDiaryOpen(true);
                            }}
                            className="text-herbal-700 dark:text-herbal-400 hover:text-herbal-900 font-bold flex items-center gap-1 transition"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>{isEn ? 'Photo Milestone' : 'Chụp Mốc Ảnh'}</span>
                          </button>

                          <button
                            onClick={() => setComparisonPlant(plant)}
                            className="text-forest-600 dark:text-forest-400 hover:text-forest-950 font-semibold flex items-center gap-1 transition"
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
        )}

        {/* 6. Tab 2: Chronological Photo Timeline & Progression */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            {selectedPlantId && (
              <div className="p-4 rounded-2xl bg-herbal-50 dark:bg-herbal-950/60 border border-herbal-200 dark:border-herbal-800 flex items-center justify-between">
                <span className="text-xs font-bold text-herbal-900 dark:text-herbal-300">
                  {isEn
                    ? `Filtering diary for: ${plants.find((p) => p.id === selectedPlantId)?.custom_name}`
                    : `Đang lọc nhật ký của: ${plants.find((p) => p.id === selectedPlantId)?.custom_name}`}
                </span>
                <button
                  onClick={() => setSelectedPlantId(null)}
                  className="text-xs text-herbal-700 dark:text-herbal-400 hover:text-herbal-900 font-semibold underline"
                >
                  {isEn ? 'Show All Plants' : 'Xem tất cả cây'}
                </button>
              </div>
            )}

            <div className="space-y-6">
              {diaries
                .filter((d) => !selectedPlantId || d.garden_plant_id === selectedPlantId)
                .map((entry) => {
                  const targetPlant = plants.find((p) => p.id === entry.garden_plant_id);

                  return (
                    <div
                      key={entry.id}
                      className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 border border-forest-100 dark:border-forest-800 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:border-forest-200 transition"
                    >
                      {/* Photo */}
                      <div className="w-full md:w-64 aspect-[4/3] rounded-2xl overflow-hidden bg-forest-900 shrink-0 relative group">
                        <img
                          src={entry.image_url}
                          alt={entry.stage}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleDeleteDiary(entry.id)}
                          title={isEn ? 'Delete entry' : 'Xóa mốc nhật ký'}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-forest-950/80 hover:bg-red-600 text-white transition opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-herbal-100 dark:bg-herbal-950/80 text-herbal-900 dark:text-herbal-300 border border-herbal-200 dark:border-herbal-800">
                            {entry.stage}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {entry.entry_date}
                          </span>
                          {targetPlant && (
                            <span className="text-xs font-bold text-forest-900 dark:text-cream-100 bg-forest-50 dark:bg-charcoal-800 px-2.5 py-0.5 rounded-full border border-forest-100 dark:border-forest-800">
                              {targetPlant.custom_name}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-forest-800 dark:text-forest-200 leading-relaxed pt-1">
                          {entry.note}
                        </p>

                        <div className="pt-2 text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{isEn ? 'Verified clean EXIF data (Standard H7)' : 'Đã lưu vết ảnh sạch EXIF (Móc nối H7)'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* 6. Tab 4: Bộ Sưu Tập Hộ Chiếu Cây NFT (Botanical NFT Gallery Độc Bản) */}
        {activeTab === 'nft_gallery' && (
          <div className="animate-in fade-in duration-300">
            <BotanicalNftGallery
              currentUserId={currentUserId}
              isEn={isEn}
              onNavigateToMint={() => {
                navigate('/web3-sandbox');
              }}
            />
          </div>
        )}
      </main>

      {/* 7. Modal: So Sánh Ảnh Lớn Lên Trước & Sau (Before / After Comparison) */}
      {comparisonPlant && (
        <div className="fixed inset-0 z-50 bg-forest-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-forest-100 dark:border-forest-800 space-y-6 max-h-[95vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-forest-100 dark:border-forest-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-herbal-50 dark:bg-charcoal-800 flex items-center justify-center">
                  <SplitSquareVertical className="w-5 h-5 text-herbal-600 dark:text-herbal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-forest-950 dark:text-cream-50">
                    {isEn ? `Growth Journey: ${comparisonPlant.custom_name}` : `Hành Trình Lớn Lên: ${comparisonPlant.custom_name}`}
                  </h3>
                  <p className="text-xs text-forest-700 dark:text-forest-300">
                    {isEn ? 'Compare planting day with latest growth milestone' : 'So sánh ảnh ngày đầu trồng với mốc sinh trưởng mới nhất'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setComparisonMode(comparisonMode === 'sideBySide' ? 'slider' : 'sideBySide')}
                  className="px-3 py-1.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs font-semibold text-forest-800 dark:text-forest-200 hover:bg-forest-50 dark:hover:bg-charcoal-800 transition flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-herbal-600" />
                  <span>{comparisonMode === 'sideBySide' ? (isEn ? 'Split Slider' : 'Thanh trượt') : (isEn ? 'Side by Side' : 'Song song')}</span>
                </button>

                <button
                  onClick={() => setComparisonPlant(null)}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-cream-100 hover:bg-forest-50 dark:hover:bg-charcoal-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comparison Body */}
            {(() => {
              const plantLogs = diaries.filter((d) => d.garden_plant_id === comparisonPlant.id);
              const initialPhoto = comparisonPlant.cover_image_url;
              const initialDate = comparisonPlant.planted_date;
              const latestEntry = plantLogs.length > 0 ? plantLogs[0] : null;
              const latestPhoto = latestEntry ? latestEntry.image_url : initialPhoto;
              const latestDate = latestEntry ? latestEntry.entry_date : initialDate;
              const totalDays = calculateDaysPlanted(initialDate);

              return (
                <div className="space-y-6">
                  {/* Stats banner */}
                  <div className="p-4 rounded-2xl bg-cream-50 dark:bg-charcoal-800 border border-forest-100 dark:border-forest-700 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-herbal-100 dark:bg-herbal-900/60 text-herbal-900 dark:text-herbal-200 font-bold text-xs">
                        +{totalDays} {isEn ? 'days of growth' : 'ngày chăm sóc'}
                      </span>
                      <span className="text-xs text-forest-700 dark:text-forest-300">
                        {isEn ? `Planted on ${initialDate} → Latest log ${latestDate}` : `Từ ngày trồng ${initialDate} → Mốc mới nhất ${latestDate}`}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {isEn ? 'Vigorous leaf & root expansion' : 'Bộ rễ và cành nhánh phát triển khỏe mạnh'}
                    </span>
                  </div>

                  {/* Mode 1: Side by Side */}
                  {comparisonMode === 'sideBySide' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-forest-900 dark:text-cream-100">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            {isEn ? 'Before: Day 1 (Planted)' : 'Trước: Ngày đầu mới trồng'}
                          </span>
                          <span className="text-gray-500 font-normal">{initialDate}</span>
                        </div>
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-forest-950 border border-forest-200 dark:border-forest-800 shadow-sm">
                          <img
                            src={initialPhoto}
                            alt="Before planting"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-gray-500 italic">
                          {isEn ? 'Initial seedling stage in coco peat container.' : 'Giai đoạn cắm cành / ươm giống ban đầu.'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-forest-900 dark:text-cream-100">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            {isEn ? 'After: Current Milestone' : 'Sau: Hiện tại phát triển'}
                          </span>
                          <span className="text-emerald-600 font-bold">{latestDate}</span>
                        </div>
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-forest-950 border border-forest-200 dark:border-forest-800 shadow-sm">
                          <img
                            src={latestPhoto}
                            alt="Current growth"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                          {latestEntry?.stage || (isEn ? 'Thriving in full balcony light.' : 'Cây phát triển sum suê dưới nắng ban công.')}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Mode 2: Interactive Split Slider */
                    <div className="space-y-3">
                      <div className="relative aspect-[16/10] max-h-[500px] rounded-2xl overflow-hidden select-none border border-forest-200 dark:border-forest-800 shadow-lg bg-forest-950">
                        {/* Background: After Image */}
                        <img
                          src={latestPhoto}
                          alt="After growth"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-xs text-white text-xs font-bold">
                          {isEn ? `After (${latestDate})` : `Hiện tại (${latestDate})`}
                        </div>

                        {/* Foreground: Before Image clipped */}
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${sliderPos}%` }}
                        >
                          <img
                            src={initialPhoto}
                            alt="Before planting"
                            className="absolute inset-0 w-full h-full object-cover max-w-none"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-xs text-white text-xs font-bold">
                            {isEn ? `Before (${initialDate})` : `Ngày đầu (${initialDate})`}
                          </div>
                        </div>

                        {/* Divider Line & Handle */}
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize flex items-center justify-center"
                          style={{ left: `${sliderPos}%` }}
                        >
                          <div className="w-8 h-8 rounded-full bg-white text-forest-900 shadow-lg flex items-center justify-center font-bold text-xs border border-forest-200">
                            ↔
                          </div>
                        </div>
                      </div>

                      {/* Slider Input */}
                      <div className="flex items-center gap-4 px-2">
                        <span className="text-xs font-bold text-gray-500">0% (Sau)</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sliderPos}
                          onChange={(e) => setSliderPos(Number(e.target.value))}
                          className="w-full h-2 bg-forest-200 rounded-lg appearance-none cursor-pointer accent-herbal-600"
                        />
                        <span className="text-xs font-bold text-gray-500">100% (Trước)</span>
                      </div>
                    </div>
                  )}

                </div>
              );
            })()}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-forest-100 dark:border-forest-800 flex justify-end">
              <button
                onClick={() => setComparisonPlant(null)}
                className="px-6 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-semibold"
              >
                {isEn ? 'Close Comparison' : 'Đóng So Sánh'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 8. Modal: Thêm Cây Vào Vườn */}
      {isAddPlantOpen && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-forest-100 dark:border-forest-800 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800">
              <h3 className="text-lg font-serif font-bold text-forest-950 dark:text-cream-50 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-herbal-600" />
                <span>{isEn ? 'Add New Plant to Garden' : 'Thêm Cây Mới Vào Vườn'}</span>
              </h3>
              <button
                onClick={() => setIsAddPlantOpen(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-cream-100 hover:bg-forest-50 dark:hover:bg-charcoal-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewPlant} className="space-y-4 text-xs">
              {/* Chọn cây từ danh mục có sẵn */}
              <div>
                <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                  {isEn
                    ? 'Select from botanical catalog (or enter custom name below):'
                    : 'Chọn từ danh mục 50 loài chuẩn hóa (hoặc tự nhập bên dưới):'}
                </label>
                <select
                  value={newSelectedSeedId}
                  onChange={(e) => handleSelectSeedPlant(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                >
                  <option value="">{isEn ? '-- Enter custom plant --' : '-- Tự nhập cây riêng của tôi --'}</option>
                  {SEED_PLANTS.map((p) => {
                    const loc = localizePlant(p, language);
                    return (
                      <option key={p.id} value={p.id}>
                        {loc.common_name} ({p.scientific_name})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Tên thân mật đặt cho cây */}
              <div>
                <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                  {isEn ? 'Your Plant Name *' : 'Tên cây của bạn *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? 'e.g. Balcony Guava Tree, Indian Borage Pot...' : 'VD: Chậu Ổi Lê Ban Công, Khóm Húng Chanh Trị Ho...'}
                  value={newCustomName}
                  onChange={(e) => setNewCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                />
              </div>

              {/* Ngày trồng & Loại chậu */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                    {isEn ? 'Date Planted' : 'Ngày bắt đầu trồng'}
                  </label>
                  <input
                    type="date"
                    value={newPlantedDate}
                    onChange={(e) => setNewPlantedDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                    {isEn ? 'Container / Pot Type' : 'Loại chậu trồng'}
                  </label>
                  <input
                    type="text"
                    value={newPotType}
                    onChange={(e) => setNewPotType(e.target.value)}
                    placeholder={isEn ? 'e.g. Smart Planter 35cm' : 'Chậu nhựa thông minh 35cm'}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                  />
                </div>
              </div>

              {/* Chu kỳ tưới nước */}
              <div>
                <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                  {isEn ? 'Watering Frequency' : 'Chu kỳ tưới nước'}
                </label>
                <select
                  value={newWateringInterval}
                  onChange={(e) => setNewWateringInterval(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                >
                  <option value={1}>{isEn ? 'Daily (1 time / day)' : 'Hàng ngày (1 lần/ngày)'}</option>
                  <option value={2}>{isEn ? 'Every 2 days' : 'Mỗi 2 ngày/lần'}</option>
                  <option value={3}>{isEn ? 'Every 3 days' : 'Mỗi 3 ngày/lần'}</option>
                  <option value={7}>{isEn ? 'Weekly (Drought-tolerant)' : 'Mỗi tuần/lần (Cây chịu hạn)'}</option>
                </select>
              </div>

              {/* Trạng thái sinh trưởng */}
              <div>
                <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                  {isEn ? 'Current Growth Status' : 'Trạng thái hiện tại'}
                </label>
                <select
                  value={newPlantStatus}
                  onChange={(e) => setNewPlantStatus(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                >
                  <option value="healthy">{isEn ? 'Thriving & Healthy' : 'Đang phát triển xanh tốt'}</option>
                  <option value="flowering">{isEn ? 'Flowering Stage' : 'Đang trổ hoa bói'}</option>
                  <option value="fruiting">{isEn ? 'Fruiting Stage' : 'Đang đậu quả mọng'}</option>
                  <option value="recovering">{isEn ? 'Recovering Post-Pest' : 'Hồi phục sau bệnh'}</option>
                  <option value="dormant">{isEn ? 'Dormant / Awaiting Shoots' : 'Nghỉ đông / Chờ đâm chồi'}</option>
                </select>
              </div>

              {/* Ảnh đại diện */}
              <div>
                <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                  {isEn ? 'Plant Cover Photo' : 'Ảnh đại diện chậu cây'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={plantFileInputRef}
                    accept="image/*"
                    onChange={handlePlantCoverUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => plantFileInputRef.current?.click()}
                    disabled={isUploadingPlantCover}
                    className="px-4 py-2 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 border border-forest-200 dark:border-forest-700 text-forest-800 dark:text-forest-200 text-xs font-semibold flex items-center gap-1.5"
                  >
                    {isUploadingPlantCover ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-herbal-600" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-herbal-600" />
                    )}
                    <span>{isEn ? 'Upload Photo (Auto EXIF Strip)' : 'Tải ảnh từ máy (Tự tẩy EXIF)'}</span>
                  </button>
                  {plantCoverUrl && (
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> {isEn ? 'Photo selected' : 'Đã có ảnh'}
                    </span>
                  )}
                </div>
              </div>

              {/* Ghi chú */}
              <div>
                <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                  {isEn ? 'Notes on origin & fertilizers' : 'Ghi chú về nguồn gốc / dinh dưỡng'}
                </label>
                <textarea
                  rows={2}
                  placeholder={isEn ? 'e.g. Cutting from friend, potted with vermicompost...' : 'VD: Cành giâm xin từ bạn Minh, bón phân trùn quế...'}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddPlantOpen(false)}
                  className="px-4 py-2 rounded-xl border border-forest-200 dark:border-forest-700 text-xs font-semibold text-forest-800 dark:text-forest-300"
                >
                  {isEn ? 'Cancel' : 'Hủy'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold shadow-md"
                >
                  {isEn ? 'Save to Garden' : 'Lưu Vào Vườn'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. Modal: Ghi Nhật Ký Ảnh */}
      {isAddDiaryOpen && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-forest-100 dark:border-forest-800 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800">
              <h3 className="text-lg font-serif font-bold text-forest-950 dark:text-cream-50 flex items-center gap-2">
                <Camera className="w-5 h-5 text-herbal-600" />
                <span>{isEn ? 'Log Plant Photo Diary' : 'Ghi Nhật Ký Ảnh Theo Dõi Cây'}</span>
              </h3>
              <button
                onClick={() => setIsAddDiaryOpen(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-cream-100 hover:bg-forest-50 dark:hover:bg-charcoal-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewDiary} className="space-y-4 text-xs">
              {/* Chọn cây ghi nhật ký */}
              <div>
                <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                  {isEn ? 'Select Plant to Track *' : 'Chọn cây theo dõi *'}
                </label>
                <select
                  value={diaryPlantId}
                  onChange={(e) => setDiaryPlantId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                >
                  {plants.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.custom_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ngày & Giai đoạn */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                    {isEn ? 'Log Date' : 'Ngày ghi nhật ký'}
                  </label>
                  <input
                    type="date"
                    value={diaryDate}
                    onChange={(e) => setDiaryDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                    {isEn ? 'Stage' : 'Giai đoạn'}
                  </label>
                  <select
                    value={diaryStage}
                    onChange={(e) => setDiaryStage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                  >
                    {stageOptions.map((stg) => (
                      <option key={stg.vi} value={stg.vi}>
                        {isEn ? stg.en : stg.vi}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tải ảnh nhật ký */}
              <div>
                <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                  {isEn ? 'Progress Photo *' : 'Ảnh chụp tiến triển *'}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={diaryFileInputRef}
                    accept="image/*"
                    onChange={handleDiaryPhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => diaryFileInputRef.current?.click()}
                    disabled={isUploadingDiary}
                    className="px-4 py-2 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 border border-forest-200 dark:border-forest-700 text-forest-800 dark:text-forest-200 text-xs font-semibold flex items-center gap-1.5"
                  >
                    {isUploadingDiary ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-herbal-600" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-herbal-600" />
                    )}
                    <span>{isEn ? 'Upload Photo (Auto EXIF Strip)' : 'Tải ảnh lá / quả (Tự tẩy EXIF)'}</span>
                  </button>
                  {diaryImageUrl && (
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> {isEn ? 'Photo uploaded' : 'Đã tải ảnh lên'}
                    </span>
                  )}
                </div>
              </div>

              {/* Ghi chú nhật ký */}
              <div>
                <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                  {isEn ? 'Notes on condition & nutrients *' : 'Ghi chú tình trạng & phân bón *'}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={isEn ? 'e.g. Rapid new shoot emergence after rain, watered with 1:20 diluted compost tea...' : 'VD: Cây bật đọt non rất nhanh sau đợt mưa, đã tưới thêm dịch chuối pha loãng 1:20...'}
                  value={diaryNote}
                  onChange={(e) => setDiaryNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-forest-950 dark:text-cream-100 bg-white dark:bg-charcoal-800"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDiaryOpen(false)}
                  className="px-4 py-2 rounded-xl border border-forest-200 dark:border-forest-700 text-xs font-semibold text-forest-800 dark:text-forest-300"
                >
                  {isEn ? 'Cancel' : 'Hủy'}
                </button>
                <button
                  type="submit"
                  disabled={!diaryImageUrl || !diaryNote.trim()}
                  className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-950 disabled:opacity-50 text-white text-xs font-bold shadow-md"
                >
                  {isEn ? 'Save Diary Entry' : 'Lưu Nhật Ký'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. Modal: Xuất Sổ Tay Vườn & Hồ Sơ Sinh Trưởng In Ấn / Lưu PDF */}
      <GardenBookPrintModal
        isOpen={isGardenBookOpen}
        onClose={() => setIsGardenBookOpen(false)}
        garden={garden}
        plants={plants}
        diaries={diaries}
        initialPlantId={printTargetPlantId}
        region={selectedRegion}
      />
    </div>
  );
};
