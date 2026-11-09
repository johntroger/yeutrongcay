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
  MapPin,
  Droplets,
  Sprout,
  CheckCircle2,
  SplitSquareVertical,
  Sliders,
  Printer,
  Bell,
  BellRing,
  Copy,
  ExternalLink,
  Search,
  Sun,
  LayoutGrid,
  Grid2X2
} from 'lucide-react';
import { UserGarden, GardenPlant, PlantDiaryEntry, PlantGrowthStatus, UserProfile, GardenCareItemType } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { SEASONAL_CALENDAR_DATA, RegionKey } from '../data/seasonalCalendar.ts';
import { GardenBookPrintModal } from '../components/GardenBookPrintModal.tsx';
import { BotanicalNftGallery } from '../components/BotanicalNftGallery.tsx';
import {
  GardenTasksTab,
  GardenTimelineTab,
  GardenInventoryBar,
  GardenSupplyShopModal,
  GamifiedPlantCard,
  CompactPlantCard,
  PlantCareDetailModal,
  PlantOnChainMintModal,
  DailyGardenQuestsHud,
  DailyQuestsState
} from '../components/garden';
import {
  getUserInventory,
  saveUserInventory,
  buyInventoryItem,
  applyCareAction,
  consumeInventoryItem,
  getPlantGrowthProfile,
  GARDEN_ECO_ITEMS,
  detectRequiredItemForTask
} from '../services/gardenGameService.ts';
import { plantPassportRegistryService, getUsernameFromEmail } from '../services/plantPassportRegistryService.ts';
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
  deletePlantDiary,
  buyGardenEcoItem,
  syncGuestGardenDataAction,
  careGamifiedPlantAction,
  batchCarePlantsAction,
  harvestPlantCropAction,
  claimDailyDewAction,
  claimSeasonalTaskAction
} from '../services/apiService.ts';
import { getKarmaState } from '../services/karmaService.ts';
import { applyWatermarkAndStripExif } from '../utils/watermark.ts';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext';
import { localizePlant } from '../i18n/plantTranslations';
import { matchGardenPlantToSeedPlant, evaluatePlantSeasonality } from '../utils/gardenSeasonalIntegration.ts';

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
  const [galleryCount, setGalleryCount] = useState<number>(() =>
    currentUser?.email
      ? plantPassportRegistryService.getUserVerifiedGallery(undefined, currentUserId, currentUser?.email).length
      : 0
  );
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // URL Hồ sơ công khai (Ẩn email bảo mật, ưu tiên custom_handle nếu đã sửa 1 lần)
  const rawUserHandle = getUsernameFromEmail(currentUser?.email);
  const userProfileConfig = rawUserHandle ? plantPassportRegistryService.getPublicProfile(rawUserHandle) : null;
  const userHandle = userProfileConfig?.custom_handle || rawUserHandle;
  const publicProfileUrl = userHandle ? `https://yeutrongcay.com/${userHandle}` : '';

  // Điểm Karma & Huy Hiệu Đóng Góp (MS5 - H9)
  const [karmaData, setKarmaData] = useState<{
    total_karma: number;
    badge: { title: string; tier: number; icon: string; color: string };
    events: any[];
  } | null>(null);

  // Game Hóa: Túi đồ nghề & Cửa hàng sinh thái (MS7)
  const [inventory, setInventory] = useState<Record<GardenCareItemType, number>>(() => getUserInventory());
  const [isShopOpen, setIsShopOpen] = useState(false);

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
  const [completedSeasonalTasks, setCompletedSeasonalTasks] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('ytc_completed_seasonal_tasks');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Chống trục lợi: Khóa vĩnh viễn các nhiệm vụ đã nhận thưởng 5 Tim
  const [claimedSeasonalRewards, setClaimedSeasonalRewards] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('ytc_claimed_seasonal_rewards');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Modal: Xuất Sổ Tay Vườn & Hồ Sơ Cây In Ấn (PDF)
  const [isGardenBookOpen, setIsGardenBookOpen] = useState(false);
  const [printTargetPlantId, setPrintTargetPlantId] = useState<string | null>(null);

  // Modal: Đúc Hộ Chiếu NFT On-Chain Sepolia Thật 100%
  const [mintPlantTarget, setMintPlantTarget] = useState<GardenPlant | null>(null);

  // Chế độ xem khu vườn: Thu nhỏ (compact) hoặc Chi tiết (detailed)
  const [gardenViewMode, setGardenViewMode] = useState<'compact' | 'detailed'>(() => {
    return (localStorage.getItem('ytc_garden_view_mode') as 'compact' | 'detailed') || 'compact';
  });

  // Bộ lọc thông minh theo tình trạng chậu cây
  const [plantStatusFilter, setPlantStatusFilter] = useState<'all' | 'thirsty' | 'hungry' | 'mature'>('all');

  // Modal: Chi tiết chăm sóc cây chuyên sâu khi bấm vào thẻ mini
  const [detailPlantTarget, setDetailPlantTarget] = useState<GardenPlant | null>(null);

  const handleToggleViewMode = (mode: 'compact' | 'detailed') => {
    setGardenViewMode(mode);
    localStorage.setItem('ytc_garden_view_mode', mode);
  };

  // Chuông thông báo nhắc lịch chăm sóc cây (Web Notification API)
  const [reminderActive, setReminderActive] = useState<boolean>(() => isCareReminderEnabled());

  // Mini-HUD Nhiệm Vụ Sớm Mai (Daily Garden Quests)
  const getTodayKey = () => new Date().toISOString().split('T')[0];
  const [dailyQuests, setDailyQuests] = useState<DailyQuestsState>(() => {
    const todayKey = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem('ytc_daily_quest_date');
    if (savedDate === todayKey) {
      try {
        const saved = localStorage.getItem('ytc_daily_quest_data');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return { dewClaimed: false, waterCount: 0, sunOrFertCount: 0, bonusClaimed: false };
  });

  const updateDailyQuests = (updater: (prev: DailyQuestsState) => DailyQuestsState) => {
    setDailyQuests((prev) => {
      const updated = updater(prev);
      localStorage.setItem('ytc_daily_quest_date', getTodayKey());
      localStorage.setItem('ytc_daily_quest_data', JSON.stringify(updated));
      return updated;
    });
  };

  // Tải dữ liệu vườn
  useEffect(() => {
    let isMounted = true;
    getGardenData(currentUserId).then(({ garden: g, plants: p, diaries: d, inventory: inv, total_hearts: th }) => {
      if (isMounted) {
        setGarden(g);
        setPlants(p);
        setDiaries(d);
        if (inv) {
          setInventory(inv);
          saveUserInventory(inv);
        }
        if (typeof th === 'number') {
          setKarmaData((prev) => (prev ? { ...prev, total_karma: Math.max(prev.total_karma, th) } : prev));
        }
        if (currentUser && currentUserId !== 'usr-local-me') {
          syncGuestGardenDataAction(currentUserId, inv || getUserInventory(), p).catch(() => {});
        }
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
        setGalleryCount(plantPassportRegistryService.getUserVerifiedGallery(undefined, currentUserId, currentUser?.email).length);
      }
    };
    window.addEventListener('ytc_passport_registry_updated', handlePassportUpdate);

    const handleGardenLiveUpdate = () => {
      if (isMounted) {
        getGardenData(currentUserId).then(({ garden: g, plants: p, diaries: d }) => {
          setGarden(g);
          setPlants(p);
          setDiaries(d);
        });
      }
    };
    window.addEventListener('ytc_garden_updated', handleGardenLiveUpdate);

    // Lắng nghe sự kiện storage để đồng bộ đa tab tức thì khi người dùng bấm Lưu cây ở tab khác
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ytc_garden_plants' || e.key === 'ytc_user') {
        handleGardenLiveUpdate();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Tự động kiểm tra cập nhật khi người dùng chuyển tab quay lại vườn
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        handleGardenLiveUpdate();
      }
    };
    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    return () => {
      isMounted = false;
      window.removeEventListener('ytc_karma_awarded', handleKarmaLiveUpdate);
      window.removeEventListener('ytc_passport_registry_updated', handlePassportUpdate);
      window.removeEventListener('ytc_garden_updated', handleGardenLiveUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
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
      cover_image_url: plantCoverUrl || '/logo.jpg',
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

  // Xử lý Chăm sóc nhanh 1-Click (Tưới nước / Bón phân) có kiểm tra túi đồ
  const handleCareAction = async (plant: GardenPlant, type: 'water' | 'fertilize') => {
    const requiredItem: GardenCareItemType = type === 'fertilize' ? 'fertilizer' : 'water';
    const currentStock = inventory[requiredItem] || 0;
    const itemDef = GARDEN_ECO_ITEMS[requiredItem];

    // Chặn nếu trong túi đồ đã hết vật phẩm chăm sóc
    if (currentStock <= 0) {
      setIsShopOpen(true);
      triggerNotice(
        isEn
          ? `⚠️ Out of ${itemDef.name_en} (${itemDef.icon})! Please exchange in the Eco Shop to care for your plant.`
          : `⚠️ Trong túi đồ đã hết ${itemDef.name_vi} (${itemDef.icon})! Vui lòng vào Cửa Hàng Sinh Thái để đổi trước khi chăm cây.`
      );
      return;
    }

    // Tiêu hao 1 vật phẩm
    consumeInventoryItem(requiredItem, 1);
    setInventory(getUserInventory());

    // Cập nhật tiến độ nhiệm vụ ngày
    if (requiredItem === 'water') {
      updateDailyQuests((q) => ({ ...q, waterCount: (q.waterCount || 0) + 1 }));
    } else {
      updateDailyQuests((q) => ({ ...q, sunOrFertCount: (q.sunOrFertCount || 0) + 1 }));
    }

    const today = new Date().toISOString().split('T')[0];
    await logCareAction(plant.id, type, today);

    const updatedPlants = plants.map((p) => {
      if (p.id === plant.id) {
        return {
          ...p,
          last_watered_at: type === 'water' ? today : p.last_watered_at,
          last_fertilized_at: type === 'fertilize' ? today : p.last_fertilized_at,
          moisture_level: type === 'water' ? Math.min(95, (p.moisture_level ?? 80) + 30) : p.moisture_level,
          growth_exp: (p.growth_exp ?? 0) + 25
        };
      }
      return p;
    });

    setPlants(updatedPlants);
    localStorage.setItem('ytc_garden_plants', JSON.stringify(updatedPlants));

    careGamifiedPlantAction(currentUserId, plant.id, requiredItem).catch(() => {});

    const msg = type === 'water'
      ? (isEn ? `Watered "${plant.custom_name}" 💧 (-1 Water)` : `Đã tưới nước cho "${plant.custom_name}" 💧 (-1 Bình nước)`)
      : (isEn ? `Fertilized "${plant.custom_name}" with organic worm castings 👝 (-1 Fertilizer)` : `Đã bón phân vi sinh cho "${plant.custom_name}" 👝 (-1 Túi phân)`);
    triggerNotice(msg);
  };

  // Thao tác đổi đồ tại Cửa hàng sinh thái
  const handleBuyShopItem = async (type: GardenCareItemType, quantity: number) => {
    const currentHearts = karmaData?.total_karma ?? 50;
    const localRes = buyInventoryItem(type, quantity, currentHearts);
    if (!localRes.success) {
      return { success: false, message: isEn ? localRes.message_en : localRes.message_vi };
    }

    setInventory(getUserInventory());
    if (karmaData) {
      setKarmaData({
        ...karmaData,
        total_karma: localRes.newHearts
      });
      localStorage.setItem('ytc_user_karma', localRes.newHearts.toString());
    }

    // Gọi API lưu lên máy chủ
    buyGardenEcoItem(currentUserId, type, quantity).catch(() => {});

    triggerNotice(isEn ? localRes.message_en : localRes.message_vi);
    return { success: true, message: isEn ? localRes.message_en : localRes.message_vi };
  };

  // Thao tác nhận giọt sương sớm (+15 Tim) - Chống trục lợi: Chỉ nhận 1 lần / ngày
  const handleClaimDailyDew = () => {
    const todayKey = getTodayKey();
    const lastClaimed = localStorage.getItem('ytc_daily_dew_claimed_date');

    if (dailyQuests.dewClaimed || lastClaimed === todayKey) {
      triggerNotice(
        isEn
          ? 'You have already claimed your morning dew today! Please come back tomorrow.'
          : 'Hôm nay bạn đã nhận giọt sương mai rồi! Hãy quay lại vào sáng mai nhé.'
      );
      return;
    }

    // Khóa ngay lập tức trên máy khách để chống bấm liên tục
    localStorage.setItem('ytc_daily_dew_claimed_date', todayKey);
    updateDailyQuests((q) => ({ ...q, dewClaimed: true }));

    const currentHearts = karmaData?.total_karma ?? 50;
    const newHearts = currentHearts + 15;
    if (karmaData) {
      setKarmaData({
        ...karmaData,
        total_karma: newHearts
      });
      localStorage.setItem('ytc_user_karma', newHearts.toString());
    }

    claimDailyDewAction(currentUserId).catch(() => {});
    triggerNotice(isEn ? 'Claimed morning dew: +15 Hearts! 💧' : 'Đã nhận giọt sương mai: +15 Tim! 💧');
  };

  // Thao tác nhận thưởng thêm nhiệm vụ ngày (1 Túi phân trùn quế vi sinh 👝) - Chống trục lợi: Chỉ nhận 1 lần / ngày
  const handleClaimBonusReward = () => {
    if (dailyQuests.bonusClaimed) {
      triggerNotice(isEn ? 'Daily bonus reward already claimed today!' : 'Bạn đã nhận quà thưởng ngày hôm nay rồi!');
      return;
    }

    updateDailyQuests((q) => ({ ...q, bonusClaimed: true }));
    setInventory((prev) => {
      const next = { ...prev, fertilizer: (prev.fertilizer || 0) + 1 };
      saveUserInventory(next);
      return next;
    });
    triggerNotice(
      isEn
        ? '🎁 Daily Bonus Claimed! +1 Organic Fertilizer Pouch (👝) added to your backpack!'
        : '🎁 Đã nhận quà nhiệm vụ ngày: +1 Túi Phân Trùn Quế vi sinh (👝) vào túi đồ!'
    );
  };

  // Thao tác Chăm sóc cây Game Hóa (Tưới, Bón phân, Tắm nắng, Xới đất, Xịt thảo mộc)
  const handleGamifiedCare = (plant: GardenPlant, action: GardenCareItemType) => {
    const currentStock = inventory[action] || 0;
    if (currentStock <= 0) {
      setIsShopOpen(true);
      triggerNotice(isEn ? 'Out of supply! Opened Eco Shop to exchange.' : 'Đã hết vật phẩm! Đã mở Cửa hàng Sinh thái để bạn đổi.');
      return;
    }

    const careResult = applyCareAction(plant, action);
    if (!careResult.success) {
      triggerNotice(isEn ? careResult.message_en : careResult.message_vi);
      return;
    }

    // Tiêu hao 1 vật phẩm
    consumeInventoryItem(action, 1);
    setInventory(getUserInventory());

    // Cập nhật tiến độ nhiệm vụ ngày
    if (action === 'water') {
      updateDailyQuests((q) => ({ ...q, waterCount: (q.waterCount || 0) + 1 }));
    } else if (action === 'fertilizer' || action === 'sunlight') {
      updateDailyQuests((q) => ({ ...q, sunOrFertCount: (q.sunOrFertCount || 0) + 1 }));
    }

    // Cập nhật chậu cây trong state
    const updated = plants.map((p) => (p.id === plant.id ? careResult.plant : p));
    setPlants(updated);
    localStorage.setItem('ytc_garden_plants', JSON.stringify(updated));

    // Gọi API lưu lên máy chủ
    careGamifiedPlantAction(currentUserId, plant.id, action).catch(() => {});

    triggerNotice(isEn ? careResult.message_en : careResult.message_vi);
  };

  // Thao tác Chăm sóc toàn vườn 1-Click
  const handleGamifiedBatchCare = async (actionType: 'water' | 'sunlight') => {
    const stock = inventory[actionType] || 0;
    if (stock <= 0) {
      setIsShopOpen(true);
      triggerNotice(isEn ? 'No supplies left! Please exchange in the Eco Shop.' : 'Đã hết vật phẩm! Vui lòng đổi thêm tại Cửa hàng.');
      return;
    }

    const needyPlants = plants.filter((p) => (actionType === 'water' ? (p.moisture_level ?? 80) < 75 : (p.sunlight_level ?? 80) < 75));
    if (needyPlants.length === 0) {
      triggerNotice(isEn ? 'All plants in the garden are already in great shape!' : 'Toàn bộ cây trong vườn đều đang đủ điều kiện!');
      return;
    }

    const toCareCount = Math.min(stock, needyPlants.length);
    const needyIds = new Set(needyPlants.slice(0, toCareCount).map((p) => p.id));

    consumeInventoryItem(actionType, toCareCount);
    setInventory(getUserInventory());

    const updated = plants.map((p) => {
      if (needyIds.has(p.id)) {
        if (actionType === 'water') {
          return {
            ...p,
            moisture_level: Math.min(90, (p.moisture_level ?? 80) + 35),
            growth_exp: (p.growth_exp ?? 0) + 30,
            last_watered_at: new Date().toISOString().split('T')[0]
          };
        } else {
          return {
            ...p,
            sunlight_level: Math.min(95, (p.sunlight_level ?? 80) + 45),
            growth_exp: (p.growth_exp ?? 0) + 25
          };
        }
      }
      return p;
    });

    setPlants(updated);
    localStorage.setItem('ytc_garden_plants', JSON.stringify(updated));

    batchCarePlantsAction(currentUserId, actionType).catch(() => {});

    triggerNotice(
      isEn 
        ? `Batch cared for ${toCareCount} plants with ${actionType === 'water' ? 'Water' : 'Sunlight'}! 🌟`
        : `Đã chăm sóc nhanh thành công ${toCareCount} chậu cây bằng ${actionType === 'water' ? 'Nước' : 'Nắng ban mai'}! 🌟`
    );
  };

  // Thao tác Thu hoạch vụ mùa
  const handleHarvestPlant = async (plant: GardenPlant) => {
    const stage = plant.growth_stage ?? 1;
    if (stage < 5) {
      triggerNotice(isEn ? 'Plant has not reached maturity yet (Stage 5)!' : 'Cây chưa đạt độ chín muồi (Giai đoạn 5) để thu hoạch!');
      return;
    }

    // Tăng tim thưởng +120
    const currentHearts = karmaData?.total_karma ?? 50;
    const newHearts = currentHearts + 120;
    if (karmaData) {
      setKarmaData({
        ...karmaData,
        total_karma: newHearts
      });
      localStorage.setItem('ytc_user_karma', newHearts.toString());
    }

    // Tặng 1 túi phân hữu cơ vào túi đồ
    const inv = getUserInventory();
    inv.fertilizer = (inv.fertilizer || 0) + 1;
    saveUserInventory(inv);
    setInventory(inv);

    // Cập nhật chậu cây: tăng total_harvests, reset EXP về Giai đoạn 3 (thích ứng theo loài cây đó) để chuẩn bị lứa hoa trái mới
    const profile = getPlantGrowthProfile(plant.custom_name, plant.plant_id);
    const stage3Exp = profile.stage_thresholds[2]?.exp_required ?? Math.round(profile.target_exp * 0.45);

    const updated = plants.map((p) => {
      if (p.id === plant.id) {
        return {
          ...p,
          total_harvests: (p.total_harvests || 0) + 1,
          growth_stage: 3,
          growth_exp: stage3Exp,
          current_status: 'healthy' as PlantGrowthStatus
        };
      }
      return p;
    });

    setPlants(updated);
    localStorage.setItem('ytc_garden_plants', JSON.stringify(updated));

    harvestPlantCropAction(currentUserId, plant.id).catch(() => {});

    triggerNotice(isEn ? '🎉 Harvested crop! +120 Hearts and +1 Organic Fertilizer awarded!' : '🎉 Thu hoạch vụ mùa thành công! Nhận +120 Tim và +1 Túi Phân Hữu Cơ thưởng!');
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
    const isCurrentlyDone = !!completedSeasonalTasks[taskKey];
    const newDoneState = !isCurrentlyDone;

    // Khi người dùng bấm hoàn thành (tick check)
    if (newDoneState) {
      // 1. Kiểm tra vật phẩm cần thiết trong túi đồ
      const requiredItem = detectRequiredItemForTask(taskText);
      if (requiredItem) {
        const stock = inventory[requiredItem] || 0;
        if (stock <= 0) {
          const itemDef = GARDEN_ECO_ITEMS[requiredItem];
          setIsShopOpen(true);
          triggerNotice(
            isEn
              ? `⚠️ You need 1 ${itemDef.name_en} (${itemDef.icon}) in your inventory to perform this task! Opening Eco Shop...`
              : `⚠️ Bạn cần có ít nhất 1 ${itemDef.name_vi} (${itemDef.icon}) trong túi đồ để làm nhiệm vụ này! Đang mở Cửa Hàng Sinh Thái...`
          );
          return; // Chặn không cho tick và không cộng tim khi thiếu đồ
        }

        // Đủ đồ -> Tiêu hao 1 vật phẩm làm bằng chứng thực hiện chăm sóc
        consumeInventoryItem(requiredItem, 1);
        setInventory(getUserInventory());

        // Cập nhật tiến độ nhiệm vụ ngày tương ứng
        if (requiredItem === 'water') {
          updateDailyQuests((q) => ({ ...q, waterCount: (q.waterCount || 0) + 1 }));
        } else if (requiredItem === 'fertilizer' || requiredItem === 'sunlight') {
          updateDailyQuests((q) => ({ ...q, sunOrFertCount: (q.sunOrFertCount || 0) + 1 }));
        }
      }

      // 2. Cập nhật trạng thái checklist cho người dùng theo dõi
      const newMap = { ...completedSeasonalTasks, [taskKey]: true };
      setCompletedSeasonalTasks(newMap);
      localStorage.setItem('ytc_completed_seasonal_tasks', JSON.stringify(newMap));

      // 3. Chống trục lợi: Chỉ cộng 5 Tim khi LẦN ĐẦU TIÊN hoàn thành nhiệm vụ này
      if (!claimedSeasonalRewards[taskKey]) {
        // Ghi nhận khóa vĩnh viễn đã nhận thưởng cho nhiệm vụ này
        const newClaimed = { ...claimedSeasonalRewards, [taskKey]: true };
        setClaimedSeasonalRewards(newClaimed);
        localStorage.setItem('ytc_claimed_seasonal_rewards', JSON.stringify(newClaimed));

        // Cộng 5 Tim
        const currentHearts = karmaData?.total_karma ?? 50;
        const newHearts = currentHearts + 5;
        if (karmaData) {
          setKarmaData({
            ...karmaData,
            total_karma: newHearts
          });
          localStorage.setItem('ytc_user_karma', newHearts.toString());
        }

        // Đồng bộ chống gian lận lên server
        claimSeasonalTaskAction(currentUserId, taskKey).catch(() => {});

        const itemDef = requiredItem ? GARDEN_ECO_ITEMS[requiredItem] : null;
        const usedNotice = itemDef ? ` (-1 ${itemDef.icon})` : '';

        triggerNotice(
          isEn
            ? `Completed seasonal task: "${taskText.slice(0, 32)}..." (+5 Hearts ❤️ earned!${usedNotice})`
            : `Đã hoàn thành nông vụ: "${taskText.slice(0, 32)}..." (+5 Trái Tim ❤️ đã cộng!${usedNotice})`
        );
      } else {
        // Đã nhận thưởng trước đó -> chỉ cập nhật dấu check, KHÔNG cộng thêm tim
        triggerNotice(
          isEn
            ? `Marked as done: "${taskText.slice(0, 32)}..." (Reward already claimed previously)`
            : `Đánh dấu đã làm: "${taskText.slice(0, 32)}..." (Nhiệm vụ này đã nhận 5 Tim trước đó rồi)`
        );
      }
    } else {
      // Bỏ đánh dấu: KHÔNG trừ tim và KHÔNG xóa khóa claimed để chống hành vi "bỏ rồi tick lại để nhận thêm tim"
      const newMap = { ...completedSeasonalTasks, [taskKey]: false };
      setCompletedSeasonalTasks(newMap);
      localStorage.setItem('ytc_completed_seasonal_tasks', JSON.stringify(newMap));

      triggerNotice(
        isEn
          ? `Unchecked: "${taskText.slice(0, 32)}..."`
          : `Đã bỏ đánh dấu: "${taskText.slice(0, 32)}..."`
      );
    }
  };

  const handleBatchWaterAll = () => {
    if (pendingWaterTasks.length === 0) return;
    const stock = inventory.water || 0;
    if (stock <= 0) {
      setIsShopOpen(true);
      triggerNotice(
        isEn
          ? '⚠️ Out of Water (💧)! Opening Eco Shop to exchange supplies...'
          : '⚠️ Túi đồ đã hết Bình Nước Tưới (💧)! Đang mở Cửa Hàng Sinh Thái để đổi thêm...'
      );
      return;
    }

    const toWaterCount = Math.min(stock, pendingWaterTasks.length);
    const today = new Date().toISOString().split('T')[0];
    const targetTasks = pendingWaterTasks.slice(0, toWaterCount);
    const targetIds = new Set(targetTasks.map((t) => t.plant.id));

    consumeInventoryItem('water', toWaterCount);
    setInventory(getUserInventory());
    updateDailyQuests((q) => ({ ...q, waterCount: (q.waterCount || 0) + toWaterCount }));

    const updatedPlants = plants.map((p) => {
      if (targetIds.has(p.id)) {
        return {
          ...p,
          last_watered_at: today,
          moisture_level: Math.min(95, (p.moisture_level ?? 80) + 30),
          growth_exp: (p.growth_exp ?? 0) + 25
        };
      }
      return p;
    });

    setPlants(updatedPlants);
    localStorage.setItem('ytc_garden_plants', JSON.stringify(updatedPlants));

    for (const item of targetTasks) {
      logCareAction(item.plant.id, 'water', today);
      careGamifiedPlantAction(currentUserId, item.plant.id, 'water').catch(() => {});
    }

    triggerNotice(
      isEn
        ? `Hydrated ${toWaterCount}/${pendingWaterTasks.length} pending plants! 💧 (-${toWaterCount} Water)`
        : `Đã tưới nước cho ${toWaterCount}/${pendingWaterTasks.length} chậu cây! 💧 (-${toWaterCount} Bình Nước)`
    );
  };

  const handleBatchFertilizeAll = () => {
    if (pendingFertilizeTasks.length === 0) return;
    const stock = inventory.fertilizer || 0;
    if (stock <= 0) {
      setIsShopOpen(true);
      triggerNotice(
        isEn
          ? '⚠️ Out of Organic Fertilizer (👝)! Opening Eco Shop to exchange supplies...'
          : '⚠️ Túi đồ đã hết Túi Phân Hữu Cơ (👝)! Đang mở Cửa Hàng Sinh Thái để đổi thêm...'
      );
      return;
    }

    const toFertilizeCount = Math.min(stock, pendingFertilizeTasks.length);
    const today = new Date().toISOString().split('T')[0];
    const targetTasks = pendingFertilizeTasks.slice(0, toFertilizeCount);
    const targetIds = new Set(targetTasks.map((t) => t.plant.id));

    consumeInventoryItem('fertilizer', toFertilizeCount);
    setInventory(getUserInventory());
    updateDailyQuests((q) => ({ ...q, sunOrFertCount: (q.sunOrFertCount || 0) + toFertilizeCount }));

    const updatedPlants = plants.map((p) => {
      if (targetIds.has(p.id)) {
        return {
          ...p,
          last_fertilized_at: today,
          growth_exp: (p.growth_exp ?? 0) + 35
        };
      }
      return p;
    });

    setPlants(updatedPlants);
    localStorage.setItem('ytc_garden_plants', JSON.stringify(updatedPlants));

    for (const item of targetTasks) {
      logCareAction(item.plant.id, 'fertilize', today);
      careGamifiedPlantAction(currentUserId, item.plant.id, 'fertilizer').catch(() => {});
    }

    triggerNotice(
      isEn
        ? `Fed ${toFertilizeCount}/${pendingFertilizeTasks.length} plants with organic castings! 👝 (-${toFertilizeCount} Fertilizer)`
        : `Đã bón phân cho ${toFertilizeCount}/${pendingFertilizeTasks.length} chậu cây! 👝 (-${toFertilizeCount} Túi Phân)`
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

  const handleMintSuccess = (updatedPlant: GardenPlant, _txHash: string, tokenId: string) => {
    setPlants((prev) => prev.map((p) => (p.id === updatedPlant.id ? updatedPlant : p)));
    setMintPlantTarget(null);
    triggerNotice(
      isEn
        ? `🎉 On-Chain Minting Verified! Passport Token #${tokenId} stamped on Ethereum Sepolia.`
        : `🎉 Đúc On-Chain thành công! Hộ Chiếu Token #${tokenId} đã ghi danh trên Ethereum Sepolia.`
    );
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
                {currentUser?.name ? `Vườn Của ${currentUser.name}` : (garden?.garden_name || (isEn ? 'My Balcony Garden' : 'Vườn Ban Công Của Tôi'))}
              </h1>

              {/* Thông tin tài khoản người dùng đăng nhập (Đã ẩn địa chỉ Email để bảo mật) */}
              {currentUser && (
                <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                  <img
                    src={userProfileConfig?.avatar_url || currentUser.avatar_url}
                    alt={userProfileConfig?.display_name || currentUser.name}
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-emerald-500/70"
                  />
                  <span className="text-xs font-bold text-forest-900 dark:text-cream-100">
                    {userProfileConfig?.display_name || currentUser.name}
                  </span>
                  {userHandle && (
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono font-semibold">
                      (@{userHandle})
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    {userProfileConfig?.specialty_tag || currentUser.badge}
                  </span>
                </div>
              )}
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

              {/* Hộp URL Hồ Sơ Công Khai Định Danh Theo Email (CHỈ HIỂN THỊ KHI ĐÃ ĐĂNG NHẬP) */}
              {currentUser?.email && userHandle && (
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-forest-600 dark:text-forest-400">URL Hồ sơ công khai:</span>
                  <span className="font-mono font-bold text-forest-900 dark:text-amber-300 bg-white/80 dark:bg-charcoal-800 px-2.5 py-1 rounded-xl border border-forest-200 dark:border-forest-700">
                    {publicProfileUrl}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(publicProfileUrl);
                      triggerNotice('Đã sao chép link hồ sơ công khai!');
                    }}
                    className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-forest-950 font-bold transition flex items-center gap-1 shadow-xs cursor-pointer text-[11px]"
                    title="Sao chép liên kết"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Sao chép</span>
                  </button>
                  <a
                    href={`/${userHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-xl bg-forest-900 hover:bg-forest-950 text-white font-bold transition flex items-center gap-1 shadow-xs text-[11px]"
                  >
                    <span>Xem trang công khai</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
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
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-forest-900 via-forest-850 to-forest-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-forest-800">
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

              <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
                {/* Ô Điểm Kinh Nghiệm Toàn Vườn (Garden EXP) */}
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-xl border border-white/10">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                      {isEn ? 'Garden EXP' : 'Điểm Kinh Nghiệm'}
                    </span>
                    <span className="text-xl font-bold font-serif text-amber-300">
                      +{plants.reduce((sum, p) => sum + (p.growth_exp ?? 0), 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-base">
                    ⭐
                  </div>
                </div>

                {/* Ô Trái Tim Yêu Vườn */}
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-xl border border-white/10">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider block">
                      {isEn ? 'Garden Hearts' : 'Trái Tim Yêu Vườn'}
                    </span>
                    <span className="text-xl font-bold font-serif text-rose-300">+{karmaData.total_karma}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-base">
                    ❤️
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2.4. Mini-HUD Nhiệm Vụ Sớm Mai (MS7 Daily Garden Quests) */}
        <DailyGardenQuestsHud
          isEn={isEn}
          questsState={dailyQuests}
          onClaimDailyDew={handleClaimDailyDew}
          onClaimBonusReward={handleClaimBonusReward}
        />

        {/* 2.5. Thanh Túi Đồ Nghề Sinh Thái & Cửa Hàng Đổi Tim (MS7 Eco-Gaming) */}
        <GardenInventoryBar
          isEn={isEn}
          totalHearts={karmaData?.total_karma ?? 50}
          inventory={inventory}
          onOpenShop={() => setIsShopOpen(true)}
          onClaimDailyDew={handleClaimDailyDew}
          hasClaimedDailyDew={dailyQuests.dewClaimed}
        />

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
          plants.length === 0 ? (
            <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-8 sm:p-12 border border-forest-100 dark:border-forest-800 text-center shadow-xs flex flex-col items-center justify-center animate-fade-in">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-herbal-50 dark:bg-herbal-950/60 text-herbal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-herbal-200 dark:border-herbal-800 shadow-2xs">
                <Sprout className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-forest-950 dark:text-cream-100 mb-2">
                {isEn ? 'Your urban garden has no plants yet' : 'Vườn ban công của bạn chưa có chậu cây nào'}
              </h3>
              <p className="text-sm text-forest-700 dark:text-cream-200 max-w-md mx-auto mb-6 leading-relaxed">
                {isEn
                  ? 'Explore the botanical encyclopedia and tap "Add to My Garden" or mint a Plant NFT Passport to start tracking daily care!'
                  : 'Hãy duyệt Từ Điển Cây và bấm "Thêm vào Vườn của tôi", hoặc thêm chậu cây đầu tiên để bắt đầu theo dõi lịch tưới nước và dinh dưỡng thông minh!'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsAddPlantOpen(true)}
                  className="px-5 py-2.5 rounded-2xl bg-forest-900 text-white font-bold text-sm hover:bg-forest-800 transition flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isEn ? 'Add First Plant' : 'Thêm Chậu Cây Mới'}</span>
                </button>
                <Link
                  to="/"
                  className="px-5 py-2.5 rounded-2xl bg-white dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-900 dark:text-cream-100 font-bold text-sm hover:bg-forest-50 dark:hover:bg-charcoal-700 transition flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-emerald-600" />
                  <span>{isEn ? 'Explore Plant Encyclopedia' : 'Khám Phá Từ Điển Cây'}</span>
                </Link>
                {galleryCount > 0 && (
                  <button
                    onClick={() => setActiveTab('nft_gallery')}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-sm hover:from-amber-700 hover:to-amber-800 transition flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{isEn ? `View ${galleryCount} NFT Passports` : `Xem ${galleryCount} Hộ Chiếu NFT Đã Cấp`}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Seasonal Alert Banner for User's Garden */}
              <div className="bg-gradient-to-r from-emerald-50 via-forest-50 to-emerald-50 dark:from-charcoal-800 dark:via-charcoal-900 dark:to-charcoal-800 rounded-3xl p-5 border border-emerald-200/80 dark:border-forest-700 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{isEn ? `Seasonal Guide: Month ${currentRealMonth}` : `Lịch Nông Vụ Tháng ${currentRealMonth}`}</span>
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                      • {isEn ? currentMonthData.title_en : currentMonthData.title_vi}
                    </span>
                  </div>
                  <p className="text-xs text-forest-800 dark:text-forest-200 leading-snug">
                    💡 <span className="font-semibold">{currentRegionalGuide.climate_tag}:</span> {currentRegionalGuide.pro_tip}
                  </p>
                  <p className="text-[11px] text-red-800 dark:text-red-300 font-medium">
                    ⚠️ {isEn ? 'Pest Alert: ' : 'Cảnh báo sâu bệnh: '}{currentRegionalGuide.pest_alert}
                  </p>
                </div>

                <Link
                  to={`/lich-nong-vu?month=${currentRealMonth}&region=${selectedRegion}`}
                  className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-400 dark:text-white" />
                  <span>{isEn ? 'View Full Seasonal Calendar' : 'Mở Lịch Nông Vụ Chi Tiết'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Batch Care Toolbar: Chăm sóc toàn vườn 1-Click (MS7) */}
              {plants.length > 0 && (
                <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-900 border border-emerald-500/30 rounded-2xl p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      {isEn ? 'Garden-Wide Batch Care:' : 'Chăm Sóc Nhanh Toàn Vườn:'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleGamifiedBatchCare('water')}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95"
                    >
                      <Droplets className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Water All Thirsty Plants' : 'Tưới Cây Đang Khát (1-Click)'}</span>
                    </button>

                    <button
                      onClick={() => handleGamifiedBatchCare('sunlight')}
                      className="px-3.5 py-1.5 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95"
                    >
                      <Sun className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Sunlight Boost Garden' : 'Tắm Nắng Toàn Vườn (1-Click)'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Thanh Lọc Thông Minh & Bộ Chuyển Chế Độ Xem (Smart Filter & View Switcher) */}
              {plants.length > 0 && (() => {
                const thirstyCount = plants.filter((p) => (p.moisture_level ?? 80) < 50).length;
                const hungryCount = plants.filter((p) => (p.nutrient_level ?? 75) < 45).length;
                const matureCount = plants.filter((p) => (p.growth_stage ?? 1) >= 5).length;

                return (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    {/* Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                      <button
                        onClick={() => setPlantStatusFilter('all')}
                        className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 cursor-pointer ${
                          plantStatusFilter === 'all'
                            ? 'bg-forest-900 text-white dark:bg-emerald-600'
                            : 'bg-cream-100 dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-cream-200'
                        }`}
                      >
                        {isEn ? `All (${plants.length})` : `Tất cả (${plants.length})`}
                      </button>

                      <button
                        onClick={() => setPlantStatusFilter('thirsty')}
                        className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1 cursor-pointer ${
                          plantStatusFilter === 'thirsty'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 hover:bg-blue-100'
                        }`}
                      >
                        <Droplets className="w-3 h-3 text-blue-500" />
                        <span>{isEn ? `Thirsty (${thirstyCount})` : `Cần tưới (${thirstyCount})`}</span>
                      </button>

                      <button
                        onClick={() => setPlantStatusFilter('hungry')}
                        className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1 cursor-pointer ${
                          plantStatusFilter === 'hungry'
                            ? 'bg-amber-600 text-white'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
                        }`}
                      >
                        <span>👝</span>
                        <span>{isEn ? `Needs Feed (${hungryCount})` : `Cần bón (${hungryCount})`}</span>
                      </button>

                      {matureCount > 0 && (
                        <button
                          onClick={() => setPlantStatusFilter('mature')}
                          className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1 cursor-pointer animate-pulse ${
                            plantStatusFilter === 'mature'
                              ? 'bg-amber-500 text-charcoal-950'
                              : 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 hover:bg-amber-200'
                          }`}
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{isEn ? `Harvest (${matureCount})` : `Thu hoạch (${matureCount})`}</span>
                        </button>
                      )}
                    </div>

                    {/* View Switcher Buttons */}
                    <div className="flex items-center gap-1 bg-cream-100 dark:bg-charcoal-800 p-1 rounded-xl shrink-0 self-end sm:self-auto border border-forest-100 dark:border-forest-800">
                      <button
                        onClick={() => handleToggleViewMode('compact')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          gardenViewMode === 'compact'
                            ? 'bg-white dark:bg-charcoal-700 text-forest-900 dark:text-cream-50 shadow-xs'
                            : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                        }`}
                        title={isEn ? 'Compact grid view (Optimized for 50+ plants)' : 'Lưới nhỏ gọn (Tối ưu cho vườn nhiều cây)'}
                      >
                        <Grid2X2 className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Compact' : 'Nhỏ gọn'}</span>
                      </button>

                      <button
                        onClick={() => handleToggleViewMode('detailed')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          gardenViewMode === 'detailed'
                            ? 'bg-white dark:bg-charcoal-700 text-forest-900 dark:text-cream-50 shadow-xs'
                            : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                        }`}
                        title={isEn ? 'Detailed showcase card view' : 'Thẻ chi tiết lớn'}
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>{isEn ? 'Detailed' : 'Chi tiết'}</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Danh Sách Cây: Tùy Chọn Nhỏ Gọn (Compact) hoặc Chi Tiết (Detailed) */}
              {(() => {
                const filteredPlants = plants.filter((p) => {
                  if (plantStatusFilter === 'thirsty') return (p.moisture_level ?? 80) < 50;
                  if (plantStatusFilter === 'hungry') return (p.nutrient_level ?? 75) < 45;
                  if (plantStatusFilter === 'mature') return (p.growth_stage ?? 1) >= 5;
                  return true;
                });

                if (filteredPlants.length === 0) {
                  return (
                    <div className="py-12 text-center bg-cream-50 dark:bg-charcoal-900 rounded-3xl border border-forest-100 dark:border-forest-800 space-y-3">
                      <Sprout className="w-10 h-10 text-emerald-500 mx-auto opacity-60" />
                      <p className="text-sm font-semibold text-forest-900 dark:text-cream-100">
                        {isEn ? 'No plants matching this filter.' : 'Không có cây nào thuộc nhóm điều kiện này.'}
                      </p>
                      <button
                        onClick={() => setPlantStatusFilter('all')}
                        className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                      >
                        {isEn ? 'View all plants' : 'Hiển thị tất cả chậu cây'}
                      </button>
                    </div>
                  );
                }

                if (gardenViewMode === 'compact') {
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                      {filteredPlants.map((plant) => (
                        <CompactPlantCard
                          key={plant.id}
                          plant={plant}
                          isEn={isEn}
                          onOpenDetail={(p) => setDetailPlantTarget(p)}
                          onQuickWater={(p) => handleGamifiedCare(p, 'water')}
                          onHarvestCrop={(p) => handleHarvestPlant(p)}
                        />
                      ))}
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlants.map((plant) => {
                      const plantDiaries = diaries.filter((d) => d.garden_plant_id === plant.id);
                      const matchedSeed = matchGardenPlantToSeedPlant(plant, SEED_PLANTS);
                      const seasonalEval = matchedSeed ? evaluatePlantSeasonality(matchedSeed, currentRealMonth, selectedRegion) : null;

                      return (
                        <GamifiedPlantCard
                          key={plant.id}
                          plant={plant}
                          diariesCount={plantDiaries.length}
                          isEn={isEn}
                          inventory={inventory}
                          onCareAction={handleGamifiedCare}
                          onOpenAddDiary={(pid) => {
                            setDiaryPlantId(pid);
                            setIsAddDiaryOpen(true);
                          }}
                          onComparePlant={(p) => setComparisonPlant(p)}
                          onOpenPrintBook={(pid) => {
                            setPrintTargetPlantId(pid);
                            setIsGardenBookOpen(true);
                          }}
                          onDeletePlant={handleDeletePlant}
                          onHarvestCrop={handleHarvestPlant}
                          onMintNft={(targetPlant) => {
                            setMintPlantTarget(targetPlant);
                          }}
                          seasonalEval={seasonalEval}
                          onOpenShop={() => setIsShopOpen(true)}
                        />
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )
        )}

        {/* 5. Tab: Smart Care Engine (Lịch Chăm Sóc Thông Minh 3 Miền & Từng Chậu Cây) */}
        {activeTab === 'tasks' && (
          <GardenTasksTab
            isEn={isEn}
            plants={plants}
            selectedRegion={selectedRegion}
            handleSelectRegion={handleSelectRegion}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            currentRealMonth={currentRealMonth}
            currentMonthData={currentMonthData as any}
            currentRegionalGuide={currentRegionalGuide}
            completedSeasonalTasks={completedSeasonalTasks}
            claimedSeasonalRewards={claimedSeasonalRewards}
            handleToggleSeasonalTask={handleToggleSeasonalTask}
            completedSeasonalCount={completedSeasonalCount}
            seasonalTasksCount={seasonalTasksCount}
            handleQuickAddSeedPlant={handleQuickAddSeedPlant}
            pendingWaterTasks={pendingWaterTasks}
            pendingFertilizeTasks={pendingFertilizeTasks}
            handleBatchWaterAll={handleBatchWaterAll}
            handleBatchFertilizeAll={handleBatchFertilizeAll}
            careTasks={careTasks}
            handleCareAction={handleCareAction}
            onOpenAddDiary={(plantId) => {
              setDiaryPlantId(plantId);
              setIsAddDiaryOpen(true);
            }}
            onComparePlant={(plant) => setComparisonPlant(plant)}
            inventory={inventory}
            onOpenShop={() => setIsShopOpen(true)}
          />
        )}

        {/* 6. Tab 2: Chronological Photo Timeline & Progression */}
        {activeTab === 'timeline' && (
          <GardenTimelineTab
            isEn={isEn}
            plants={plants}
            selectedPlantId={selectedPlantId}
            setSelectedPlantId={setSelectedPlantId}
            diaries={diaries}
            handleDeleteDiary={handleDeleteDiary}
          />
        )}

        {/* 6. Tab 4: Bộ Sưu Tập Hộ Chiếu Cây NFT (Botanical NFT Gallery Độc Bản) */}
        {activeTab === 'nft_gallery' && (
          <div className="animate-in fade-in duration-300">
            <BotanicalNftGallery
              currentUserId={currentUserId}
              userEmail={currentUser?.email}
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

      {/* 10. Modal: Cửa Hàng Vật Phẩm Sinh Thái Đổi Tim (Eco-Supply Shop) */}
      <GardenSupplyShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        isEn={isEn}
        totalHearts={karmaData?.total_karma ?? 50}
        inventory={inventory}
        onBuyItem={handleBuyShopItem}
      />

      {/* 11. Modal: Đúc Hộ Chiếu Thực Vật NFT On-Chain Thật 100% Trên Ethereum Sepolia Testnet */}
      <PlantOnChainMintModal
        plant={mintPlantTarget}
        isOpen={Boolean(mintPlantTarget)}
        onClose={() => setMintPlantTarget(null)}
        onMintSuccess={handleMintSuccess}
        isEn={isEn}
        currentUserId={currentUser?.id}
      />

      {/* 12. Modal: Chi Tiết Hồ Sơ & Chăm Sóc Chuyên Sâu Khi Bấm Vào Cây */}
      <PlantCareDetailModal
        isOpen={Boolean(detailPlantTarget)}
        plant={detailPlantTarget}
        allPlants={plants}
        onSelectPlant={(p) => setDetailPlantTarget(p)}
        onClose={() => setDetailPlantTarget(null)}
        diariesCount={diaries.filter((d) => d.garden_plant_id === detailPlantTarget?.id).length}
        isEn={isEn}
        inventory={inventory}
        onCareAction={handleGamifiedCare}
        onOpenAddDiary={(pid) => {
          setDiaryPlantId(pid);
          setIsAddDiaryOpen(true);
        }}
        onComparePlant={(p) => setComparisonPlant(p)}
        onOpenPrintBook={(pid) => {
          setPrintTargetPlantId(pid);
          setIsGardenBookOpen(true);
        }}
        onDeletePlant={handleDeletePlant}
        onHarvestCrop={handleHarvestPlant}
        onMintNft={(targetPlant) => {
          setMintPlantTarget(targetPlant);
        }}
        seasonalEval={
          detailPlantTarget
            ? (() => {
                const matched = matchGardenPlantToSeedPlant(detailPlantTarget, SEED_PLANTS);
                return matched ? evaluatePlantSeasonality(matched, currentRealMonth, selectedRegion) : null;
              })()
            : null
        }
        onOpenShop={() => setIsShopOpen(true)}
      />
    </div>
  );
};
