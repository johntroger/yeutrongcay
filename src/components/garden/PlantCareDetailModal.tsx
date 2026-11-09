import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Package,
  Sun,
  Layers,
  Award,
  ExternalLink,
  Camera,
  SplitSquareVertical,
  BookOpen,
  Trash2,
  Lock,
  Heart
} from 'lucide-react';
import { GardenPlant, GardenCareItemType } from '../../types/index.ts';
import type { PlantSeasonalEvaluation } from '../../utils/gardenSeasonalIntegration.ts';
import {
  getPlantGrowthProfile,
  canApplyCareAction,
  GARDEN_ECO_ITEMS,
  playGardenSound
} from '../../services/gardenGameService.ts';

export interface PlantCareDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: GardenPlant | null;
  allPlants: GardenPlant[];
  onSelectPlant: (plant: GardenPlant) => void;
  diariesCount: number;
  isEn: boolean;
  inventory: Record<GardenCareItemType, number>;
  onCareAction: (plant: GardenPlant, action: GardenCareItemType) => void;
  onOpenAddDiary: (plantId: string) => void;
  onComparePlant: (plant: GardenPlant) => void;
  onOpenPrintBook: (plantId: string) => void;
  onDeletePlant: (plantId: string, plantName: string) => void;
  onMintNft?: (plant: GardenPlant) => void;
  onHarvestCrop?: (plant: GardenPlant) => void;
  seasonalEval?: PlantSeasonalEvaluation | null;
  onOpenShop?: () => void;
}

export const PlantCareDetailModal: React.FC<PlantCareDetailModalProps> = ({
  isOpen,
  onClose,
  plant,
  allPlants,
  onSelectPlant,
  diariesCount,
  isEn,
  inventory,
  onCareAction,
  onOpenAddDiary,
  onComparePlant,
  onOpenPrintBook,
  onDeletePlant,
  onMintNft,
  onHarvestCrop,
  seasonalEval,
  onOpenShop
}) => {
  const [floatingNotice, setFloatingNotice] = useState<{ text: string; icon: string } | null>(null);

  // Điều hướng bàn phím (trái/phải chuyển cây, ESC đóng)
  useEffect(() => {
    if (!isOpen || !plant) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, plant, allPlants]);

  if (!isOpen || !plant) return null;

  const currentIndex = allPlants.findIndex((p) => p.id === plant.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allPlants.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      onSelectPlant(allPlants[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onSelectPlant(allPlants[currentIndex + 1]);
    }
  };

  const profile = getPlantGrowthProfile(plant.custom_name, plant.plant_id);
  const targetExp = profile.target_exp;
  const currentExp = plant.growth_exp ?? 0;
  const currentStage = Math.min(5, Math.max(1, plant.growth_stage ?? 1));
  const currentStageInfo = profile.stage_thresholds[currentStage - 1] || profile.stage_thresholds[0];
  const expProgressPercent = Math.min(100, Math.round((currentExp / targetExp) * 100));

  const moisture = plant.moisture_level ?? 80;
  const nutrients = plant.nutrient_level ?? 75;
  const sunlight = plant.sunlight_level ?? 80;
  const soil = plant.soil_level ?? 90;
  const health = plant.health_score ?? 100;

  const plantedTime = plant.planted_date ? new Date(plant.planted_date).getTime() : Date.now();
  const daysPlanted = Math.max(0, Math.floor((Date.now() - plantedTime) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, profile.base_maturity_days - daysPlanted);
  const inOptimalZone = moisture >= 60 && moisture <= 85 && nutrients >= 55 && nutrients <= 80;

  const handleCareClick = (action: GardenCareItemType) => {
    const stock = inventory[action] || 0;
    if (stock <= 0) {
      if (onOpenShop) {
        onOpenShop();
      }
      alert(
        isEn
          ? `Out of stock for this item! Opening the Eco-Supply Shop to exchange.`
          : `Túi đồ đã hết vật phẩm này! Đang mở Cửa Hàng Sinh Thái để bạn đổi thêm.`
      );
      return;
    }

    const check = canApplyCareAction(plant, action);
    if (!check.canApply) {
      alert(isEn ? check.reason_en : check.reason_vi);
      return;
    }

    const item = GARDEN_ECO_ITEMS[action];
    const expBoost = inOptimalZone ? Math.round(item.exp_boost * 1.25) : item.exp_boost;

    playGardenSound(action === 'water' ? 'water' : 'fertilizer');
    setFloatingNotice({
      text: `+${expBoost} EXP`,
      icon: item.icon
    });
    setTimeout(() => setFloatingNotice(null), 1200);

    onCareAction(plant, action);
  };

  const getMoistureColor = (val: number) => {
    if (val >= 90) return 'bg-blue-500 text-blue-200';
    if (val >= 60) return 'bg-emerald-500 text-emerald-200';
    if (val >= 35) return 'bg-amber-500 text-amber-200';
    return 'bg-red-500 text-red-200 animate-pulse';
  };

  const getNutrientColor = (val: number) => {
    if (val >= 85) return 'bg-amber-500 text-amber-200';
    if (val >= 55) return 'bg-emerald-500 text-emerald-200';
    if (val >= 30) return 'bg-yellow-500 text-yellow-200';
    return 'bg-red-500 text-red-200 animate-pulse';
  };

  const waterCheck = canApplyCareAction(plant, 'water');
  const fertCheck = canApplyCareAction(plant, 'fertilizer');
  const sunCheck = canApplyCareAction(plant, 'sunlight');
  const soilCheck = canApplyCareAction(plant, 'soil');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] bg-white dark:bg-charcoal-900 rounded-3xl border border-forest-100 dark:border-forest-800 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating XP Animation Popup */}
        {floatingNotice && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-bounce">
            <div className="px-4 py-2 rounded-2xl bg-emerald-600 text-white font-black text-sm shadow-xl flex items-center gap-2 border border-emerald-400">
              <span className="text-xl">{floatingNotice.icon}</span>
              <span>{floatingNotice.text}</span>
            </div>
          </div>
        )}

        {/* 1. Header Điều Hướng Giữa Các Cây & Nút Đóng */}
        <div className="px-4 py-3 border-b border-forest-100 dark:border-forest-800 flex items-center justify-between bg-cream-50/80 dark:bg-charcoal-800/80">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`p-1.5 rounded-xl border transition flex items-center gap-1 text-xs font-bold ${
                hasPrev
                  ? 'bg-white dark:bg-charcoal-700 hover:bg-forest-50 border-forest-200 dark:border-forest-700 text-forest-900 dark:text-cream-100 cursor-pointer'
                  : 'opacity-30 cursor-not-allowed border-transparent text-gray-400'
              }`}
              title={isEn ? 'Previous plant (←)' : 'Cây trước (←)'}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{isEn ? 'Prev' : 'Trước'}</span>
            </button>

            <span className="text-xs font-bold text-forest-700 dark:text-forest-300 px-2 py-0.5 rounded-lg bg-forest-100 dark:bg-charcoal-700">
              {currentIndex + 1} / {allPlants.length}
            </span>

            <button
              onClick={handleNext}
              disabled={!hasNext}
              className={`p-1.5 rounded-xl border transition flex items-center gap-1 text-xs font-bold ${
                hasNext
                  ? 'bg-white dark:bg-charcoal-700 hover:bg-forest-50 border-forest-200 dark:border-forest-700 text-forest-900 dark:text-cream-100 cursor-pointer'
                  : 'opacity-30 cursor-not-allowed border-transparent text-gray-400'
              }`}
              title={isEn ? 'Next plant (→)' : 'Cây sau (→)'}
            >
              <span className="hidden sm:inline">{isEn ? 'Next' : 'Sau'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                if (confirm(isEn ? `Are you sure you want to delete "${plant.custom_name}"?` : `Bạn có chắc muốn xóa chậu "${plant.custom_name}" khỏi vườn?`)) {
                  onDeletePlant(plant.id, plant.custom_name);
                  onClose();
                }
              }}
              className="p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
              title={isEn ? 'Delete plant' : 'Xóa chậu cây'}
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-cream-50 hover:bg-stone-100 dark:hover:bg-charcoal-700 transition cursor-pointer"
              title={isEn ? 'Close (Esc)' : 'Đóng (Esc)'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Vùng Nội Dung Cuộn Chi Tiết */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5">
          {/* Ảnh Bìa Lớn & Huy Hiệu Cây */}
          <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-2xl bg-forest-950 overflow-hidden shadow-sm">
            <img
              src={plant.cover_image_url || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=1000&auto=format&fit=crop&q=80'}
              alt={plant.custom_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            {/* Badge Cấp Độ */}
            <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl text-xs font-bold shadow-md bg-stone-900/90 text-white backdrop-blur-md border border-emerald-500/40 flex items-center gap-1.5">
                <span>{currentStageInfo.icon}</span>
                <span>{isEn ? `Stage ${currentStage}: ${currentStageInfo.name_en}` : `Cấp ${currentStage}: ${currentStageInfo.name_vi}`}</span>
              </span>

              {plant.passport_token_id && (
                <a
                  href={plant.passport_tx_hash ? `https://sepolia.etherscan.io/tx/${plant.passport_tx_hash}` : undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-xl text-[10px] font-black shadow-md bg-amber-500 text-stone-950 flex items-center gap-1 hover:bg-amber-400 transition"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>NFT Verified #{plant.passport_token_id}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>

            {/* Sức Khỏe & Ngày Trồng */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white">
              <span className="px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md">
                {isEn ? `Planted ${daysPlanted} days ago` : `Đã trồng ${daysPlanted} ngày`}
              </span>
              <span className={`px-2.5 py-1 rounded-lg backdrop-blur-md flex items-center gap-1 ${health >= 80 ? 'bg-emerald-950/80 text-emerald-300' : 'bg-red-950/80 text-red-300'}`}>
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>{health}%</span>
              </span>
            </div>
          </div>

          {/* Tên Cây & EXP Sinh Thái */}
          <div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-forest-950 dark:text-cream-50">
              {plant.custom_name}
            </h3>
            {plant.species_name && (
              <p className="text-xs italic text-herbal-700 dark:text-herbal-400 font-serif mt-0.5">
                {plant.species_name}
              </p>
            )}
          </div>

          {/* Thanh Tiến Trình Sinh Trưởng EXP */}
          <div className="bg-stone-50 dark:bg-charcoal-800 p-4 rounded-2xl border border-forest-100 dark:border-forest-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-forest-900 dark:text-cream-100 flex items-center gap-1">
                <span>{isEn ? 'Growth Progress:' : 'Tiến Trình Sinh Trưởng:'}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">{currentExp} / {targetExp} EXP</span>
              </span>
              <span className="text-forest-700 dark:text-forest-300 text-xs">
                {expProgressPercent}%
              </span>
            </div>

            <div className="w-full bg-stone-200 dark:bg-charcoal-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${expProgressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pt-0.5">
              <span>
                {daysRemaining > 0
                  ? (isEn ? `Est. harvest in ~${daysRemaining} days` : `Dự kiến thu hoạch sau ~${daysRemaining} ngày`)
                  : (isEn ? '🌟 Ready for harvest!' : '🌟 Đã đến thời điểm thu hoạch!')}
              </span>
              {inOptimalZone && (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  +125% {isEn ? 'Speed (Optimal Care)' : 'Tốc độ (Vùng lý tưởng)'}
                </span>
              )}
            </div>

            {seasonalEval && (
              <div
                className={`mt-2 text-xs p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                  seasonalEval.isPeakSeason
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                }`}
              >
                <span className="font-semibold">{isEn ? seasonalEval.statusLabelEn : seasonalEval.statusLabelVi}</span>
                <span className="truncate text-stone-600 dark:text-stone-300">{isEn ? seasonalEval.regionalAdviceEn : seasonalEval.regionalAdviceVi}</span>
              </div>
            )}
          </div>

          {/* 4 Chỉ Số Sinh Tồn (Vitals) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-2.5 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-blue-800 dark:text-blue-300 font-medium flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>{isEn ? 'Moisture' : 'Độ ẩm'}</span>
                </span>
                <span className="font-bold text-blue-900 dark:text-blue-200">{moisture}%</span>
              </div>
              <div className="w-full bg-blue-200/50 dark:bg-blue-900/50 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${getMoistureColor(moisture)}`} style={{ width: `${moisture}%` }} />
              </div>
            </div>

            <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 p-2.5 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-amber-800 dark:text-amber-300 font-medium flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isEn ? 'Nutrients' : 'Dinh dưỡng'}</span>
                </span>
                <span className="font-bold text-amber-900 dark:text-amber-200">{nutrients}%</span>
              </div>
              <div className="w-full bg-amber-200/50 dark:bg-amber-900/50 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${getNutrientColor(nutrients)}`} style={{ width: `${nutrients}%` }} />
              </div>
            </div>

            <div className="bg-yellow-50/60 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/30 p-2.5 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-yellow-800 dark:text-yellow-300 font-medium flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-yellow-500" />
                  <span>{isEn ? 'Sunlight' : 'Ánh sáng'}</span>
                </span>
                <span className="font-bold text-yellow-900 dark:text-yellow-200">{sunlight}%</span>
              </div>
              <div className="w-full bg-yellow-200/50 dark:bg-yellow-900/50 h-1.5 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full rounded-full transition-all" style={{ width: `${sunlight}%` }} />
              </div>
            </div>

            <div className="bg-stone-100/60 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 p-2.5 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-stone-700 dark:text-stone-300 font-medium flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-stone-500" />
                  <span>{isEn ? 'Soil' : 'Đất chậu'}</span>
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-200">{soil}%</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-stone-500 h-full rounded-full transition-all" style={{ width: `${soil}%` }} />
              </div>
            </div>
          </div>

          {/* Thu Hoạch hoặc Đúc NFT */}
          {currentStage >= 5 && (
            <div className="space-y-2">
              {!plant.passport_token_id && currentExp >= targetExp && onMintNft && (
                <button
                  onClick={() => onMintNft(plant)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 transform active:scale-98 animate-pulse cursor-pointer"
                >
                  <Award className="w-4 h-4 text-stone-950" />
                  <span>{isEn ? 'Mint Living NFT Passport (Sepolia On-Chain)' : 'Đúc Hộ Chiếu NFT On-Chain Thật (Sepolia)'}</span>
                </button>
              )}

              {onHarvestCrop && (
                <button
                  onClick={() => onHarvestCrop(plant)}
                  className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>🧺</span>
                  <span>{isEn ? 'Harvest Crop (+Seeds, +120 Hearts & +1 Fertilizer)' : 'Thu Hoạch Vụ Mùa (+Hạt 🌱, +120 Tim & +1 Túi Phân)'}</span>
                </button>
              )}
            </div>
          )}

          {/* 4 Nút Chăm Sóc Sinh Thái Tiêu Hao Vật Phẩm */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-forest-950 dark:text-cream-50 uppercase tracking-wider">
                {isEn ? 'Eco-Care Toolkit:' : 'Bộ Công Cụ Chăm Sóc:'}
              </span>
              {onOpenShop && (
                <button
                  onClick={onOpenShop}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <span>🛒 {isEn ? 'Refill supplies' : 'Đổi thêm vật phẩm'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {/* Nút Tưới */}
              <button
                onClick={() => handleCareClick('water')}
                disabled={!waterCheck.canApply || (inventory.water || 0) <= 0}
                className={`py-2.5 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                  waterCheck.canApply && (inventory.water || 0) > 0
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs active:scale-95 cursor-pointer'
                    : 'bg-stone-100 dark:bg-charcoal-800 text-stone-400 dark:text-stone-600 cursor-not-allowed border border-stone-200 dark:border-stone-800'
                }`}
                title={waterCheck.canApply ? (isEn ? 'Water plant (-1)' : 'Tưới nước cho cây (-1)') : waterCheck.reason_vi}
              >
                <div className="flex items-center gap-0.5">
                  <Droplets className="w-4 h-4" />
                  {!waterCheck.canApply && <Lock className="w-3 h-3 text-amber-500" />}
                </div>
                <span>{isEn ? 'Water' : 'Tưới'}</span>
                <span className="text-[10px] opacity-80">({inventory.water || 0})</span>
              </button>

              {/* Nút Bón Phân */}
              <button
                onClick={() => handleCareClick('fertilizer')}
                disabled={!fertCheck.canApply || (inventory.fertilizer || 0) <= 0}
                className={`py-2.5 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                  fertCheck.canApply && (inventory.fertilizer || 0) > 0
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-xs active:scale-95 cursor-pointer'
                    : 'bg-stone-100 dark:bg-charcoal-800 text-stone-400 dark:text-stone-600 cursor-not-allowed border border-stone-200 dark:border-stone-800'
                }`}
                title={fertCheck.canApply ? (isEn ? 'Fertilize plant (-1)' : 'Bón phân hữu cơ cho cây (-1)') : fertCheck.reason_vi}
              >
                <div className="flex items-center gap-0.5">
                  <Package className="w-4 h-4" />
                  {!fertCheck.canApply && <Lock className="w-3 h-3 text-amber-500" />}
                </div>
                <span>{isEn ? 'Feed' : 'Bón phân'}</span>
                <span className="text-[10px] opacity-80">({inventory.fertilizer || 0})</span>
              </button>

              {/* Nút Tắm Nắng */}
              <button
                onClick={() => handleCareClick('sunlight')}
                disabled={!sunCheck.canApply || (inventory.sunlight || 0) <= 0}
                className={`py-2.5 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                  sunCheck.canApply && (inventory.sunlight || 0) > 0
                    ? 'bg-yellow-600 hover:bg-yellow-500 text-white shadow-xs active:scale-95 cursor-pointer'
                    : 'bg-stone-100 dark:bg-charcoal-800 text-stone-400 dark:text-stone-600 cursor-not-allowed border border-stone-200 dark:border-stone-800'
                }`}
                title={sunCheck.canApply ? (isEn ? 'Sunlight boost (-1)' : 'Tắm nắng ban mai (-1)') : sunCheck.reason_vi}
              >
                <div className="flex items-center gap-0.5">
                  <Sun className="w-4 h-4" />
                  {!sunCheck.canApply && <Lock className="w-3 h-3 text-amber-500" />}
                </div>
                <span>{isEn ? 'Sun' : 'Tắm nắng'}</span>
                <span className="text-[10px] opacity-80">({inventory.sunlight || 0})</span>
              </button>

              {/* Nút Xới Đất */}
              <button
                onClick={() => handleCareClick('soil')}
                disabled={!soilCheck.canApply || (inventory.soil || 0) <= 0}
                className={`py-2.5 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition ${
                  soilCheck.canApply && (inventory.soil || 0) > 0
                    ? 'bg-stone-700 hover:bg-stone-600 text-white shadow-xs active:scale-95 cursor-pointer'
                    : 'bg-stone-100 dark:bg-charcoal-800 text-stone-400 dark:text-stone-600 cursor-not-allowed border border-stone-200 dark:border-stone-800'
                }`}
                title={soilCheck.canApply ? (isEn ? 'Aerated soil (-1)' : 'Xới đất chậu (-1)') : soilCheck.reason_vi}
              >
                <div className="flex items-center gap-0.5">
                  <Layers className="w-4 h-4" />
                  {!soilCheck.canApply && <Lock className="w-3 h-3 text-amber-500" />}
                </div>
                <span>{isEn ? 'Soil' : 'Xới đất'}</span>
                <span className="text-[10px] opacity-80">({inventory.soil || 0})</span>
              </button>
            </div>
          </div>

          {/* Khối Tiện Ích: Nhật Ký, In Sách, So Sánh Giống */}
          <div className="pt-2 border-t border-forest-100 dark:border-forest-800">
            <span className="text-xs font-bold text-forest-950 dark:text-cream-50 uppercase tracking-wider block mb-2">
              {isEn ? 'Plant Journal & Records:' : 'Nhật Ký & Hồ Sơ:'}
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenAddDiary(plant.id);
                }}
                className="py-2 px-2 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-800 dark:text-forest-200 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isEn ? `Diary (${diariesCount})` : `Nhật ký (${diariesCount})`}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenPrintBook(plant.id);
                }}
                className="py-2 px-2 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-800 dark:text-forest-200 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>{isEn ? 'Photobook' : 'In kỷ yếu'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onComparePlant(plant);
                }}
                className="py-2 px-2 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-800 dark:text-forest-200 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <SplitSquareVertical className="w-3.5 h-3.5 text-blue-600" />
                <span>{isEn ? 'Compare' : 'So sánh'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
