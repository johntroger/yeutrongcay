import React, { useState } from 'react';
import {
  Droplets,
  Package,
  Layers,
  Sun,
  Award,
  ExternalLink,
  Camera,
  SplitSquareVertical,
  BookOpen,
  Trash2,
  Lock
} from 'lucide-react';
import { GardenPlant, GardenCareItemType } from '../../types/index.ts';
import type { PlantSeasonalEvaluation } from '../../utils/gardenSeasonalIntegration.ts';
import {
  getPlantGrowthProfile,
  canApplyCareAction,
  GARDEN_ECO_ITEMS,
  playGardenSound
} from '../../services/gardenGameService.ts';

export interface GamifiedPlantCardProps {
  plant: GardenPlant;
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

export const GamifiedPlantCard: React.FC<GamifiedPlantCardProps> = ({
  plant,
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

  const profile = getPlantGrowthProfile(plant.custom_name, plant.plant_id);
  const targetExp = profile.target_exp;
  const currentExp = plant.growth_exp ?? 0;
  const currentStage = Math.min(5, Math.max(1, plant.growth_stage ?? 1));
  const currentStageInfo = profile.stage_thresholds[currentStage - 1] || profile.stage_thresholds[0];

  const expProgressPercent = Math.min(100, Math.round((currentExp / targetExp) * 100));

  // 4 Chỉ số sinh tồn (Vitals)
  const moisture = plant.moisture_level ?? 80;
  const nutrients = plant.nutrient_level ?? 75;
  const sunlight = plant.sunlight_level ?? 80;
  const soil = plant.soil_level ?? 90;
  const health = plant.health_score ?? 100;

  // Tính số ngày đã trồng
  const plantedTime = plant.planted_date ? new Date(plant.planted_date).getTime() : Date.now();
  const daysPlanted = Math.max(0, Math.floor((Date.now() - plantedTime) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, profile.base_maturity_days - daysPlanted);

  // Vùng sinh thái tối ưu
  const inOptimalZone = moisture >= 60 && moisture <= 85 && nutrients >= 55 && nutrients <= 80;

  // Xử lý bấm nút chăm sóc
  const handleCareClick = (action: GardenCareItemType) => {
    const stock = inventory[action] || 0;
    if (stock <= 0) {
      if (onOpenShop) {
        onOpenShop();
      }
      alert(isEn 
        ? `Out of stock for this item! Opening the Eco-Supply Shop to exchange.`
        : `Túi đồ đã hết vật phẩm này! Đang mở Cửa Hàng Sinh Thái để bạn đổi thêm.`);
      return;
    }

    const check = canApplyCareAction(plant, action);
    if (!check.canApply) {
      alert(isEn ? check.reason_en : check.reason_vi);
      return;
    }

    const item = GARDEN_ECO_ITEMS[action];
    const expBoost = inOptimalZone ? Math.round(item.exp_boost * 1.25) : item.exp_boost;

    // Phát âm thanh và hiển thị floating notification
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
    if (val >= 85) return 'bg-amber-600 text-amber-200';
    if (val >= 55) return 'bg-emerald-500 text-emerald-200';
    if (val >= 30) return 'bg-yellow-500 text-yellow-200';
    return 'bg-red-500 text-red-200 animate-pulse';
  };

  const waterCheck = canApplyCareAction(plant, 'water');
  const fertCheck = canApplyCareAction(plant, 'fertilizer');

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-3xl overflow-hidden border border-forest-100 dark:border-forest-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative">
      {/* Floating EXP Animation */}
      {floatingNotice && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none animate-bounce">
          <div className="bg-emerald-950/95 border border-emerald-400 text-emerald-300 px-4 py-2 rounded-2xl font-black text-sm shadow-2xl flex items-center gap-1.5 backdrop-blur-md">
            <span>{floatingNotice.icon}</span>
            <span>{floatingNotice.text}</span>
          </div>
        </div>
      )}

      <div>
        {/* Plant Cover Image Header */}
        <div className="relative aspect-[16/10] bg-forest-900 overflow-hidden">
          <img
            src={plant.cover_image_url}
            alt={plant.custom_name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/logo.jpg';
              target.style.objectFit = 'contain';
              target.style.backgroundColor = '#ffffff';
              target.style.padding = '12px';
            }}
          />

          {/* Badge Cấp Độ Sinh Học */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className="px-3 py-1 rounded-xl text-xs font-bold shadow-md bg-stone-900/90 text-white backdrop-blur-md border border-emerald-500/40 flex items-center gap-1.5">
              <span>{currentStageInfo.icon}</span>
              <span>{isEn ? `Stage ${currentStage}: ${currentStageInfo.name_en}` : `Cấp ${currentStage}: ${currentStageInfo.name_vi}`}</span>
            </span>

            {/* Vương miện Web3 Verified NFT */}
            {plant.passport_token_id && (
              <a
                href={plant.passport_tx_hash ? `https://sepolia.etherscan.io/tx/${plant.passport_tx_hash}` : undefined}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded-xl text-[10px] font-black shadow-md bg-amber-500 text-stone-950 flex items-center gap-1 hover:bg-amber-400 transition-transform transform hover:scale-105"
                title={isEn ? 'Verified On-Chain NFT Passport on Ethereum Sepolia' : 'Hộ chiếu cây đã xác thực trên blockchain Sepolia'}
              >
                <Award className="w-3.5 h-3.5 text-stone-950" />
                <span>NFT Verified #{plant.passport_token_id}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>

          {/* Nút Xóa Chậu Cây */}
          <button
            onClick={() => onDeletePlant(plant.id, plant.custom_name)}
            title={isEn ? 'Remove plant' : 'Xóa chậu cây'}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-950/70 hover:bg-red-600 text-white transition backdrop-blur-md"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Ngày Trồng & Sức Khỏe */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white">
            <span className="px-2 py-0.5 rounded-lg bg-stone-950/80 backdrop-blur-md">
              {isEn ? `Planted ${daysPlanted} days ago` : `Đã trồng ${daysPlanted} ngày`}
            </span>
            <span className={`px-2 py-0.5 rounded-lg backdrop-blur-md ${health >= 80 ? 'bg-emerald-950/80 text-emerald-300' : 'bg-red-950/80 text-red-300'}`}>
              {isEn ? `Health: ${health}%` : `Sức khỏe: ${health}%`}
            </span>
          </div>
        </div>

        {/* Thông tin cây & Thanh tiến độ EXP */}
        <div className="p-4 sm:p-5 space-y-3">
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

          {/* Thanh Tiến Trình Sinh Trưởng EXP */}
          <div className="bg-stone-100 dark:bg-charcoal-800 p-2.5 rounded-2xl border border-forest-100 dark:border-forest-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-forest-900 dark:text-cream-100 flex items-center gap-1">
                <span>{isEn ? 'Growth EXP:' : 'Điểm Sinh Trưởng:'}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black">{currentExp} / {targetExp} EXP</span>
              </span>
              <span className="text-forest-700 dark:text-forest-300 text-[11px]">
                {expProgressPercent}%
              </span>
            </div>

            <div className="w-full bg-stone-200 dark:bg-charcoal-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${expProgressPercent}%` }}
              />
            </div>

            {/* Dòng đếm ngược vụ mùa & Tốc độ sinh trưởng */}
            <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-0.5">
              <span>
                {daysRemaining > 0 
                  ? (isEn ? `Est. harvest in ~${daysRemaining} days` : `Dự kiến thu hoạch sau ~${daysRemaining} ngày`) 
                  : (isEn ? '🌟 Ready for harvest!' : '🌟 Đã đến thời điểm thu hoạch!')}
              </span>
              {inOptimalZone && (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  +125% {isEn ? 'Speed (Optimal)' : 'Tốc độ (Tối ưu)'}
                </span>
              )}
            </div>

            {/* Khuyến nghị thời vụ 3 miền nếu có */}
            {seasonalEval && (
              <div className={`mt-2 text-[10px] px-2.5 py-1 rounded-xl border flex items-center justify-between gap-1.5 ${
                seasonalEval.isPeakSeason
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
              }`}>
                <span className="font-semibold">{isEn ? seasonalEval.statusLabelEn : seasonalEval.statusLabelVi}</span>
                <span className="truncate text-stone-600 dark:text-stone-300">{isEn ? seasonalEval.regionalAdviceEn : seasonalEval.regionalAdviceVi}</span>
              </div>
            )}
          </div>

          {/* 4 Thanh Chỉ Số Sinh Tồn (Vitals) */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* 1. Độ Ẩm Đất */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-2 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-blue-800 dark:text-blue-300 font-medium flex items-center gap-1 text-[11px]">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>{isEn ? 'Moisture' : 'Độ ẩm'}</span>
                </span>
                <span className="font-bold text-blue-900 dark:text-blue-200 text-[11px]">{moisture}%</span>
              </div>
              <div className="w-full bg-blue-200/50 dark:bg-blue-900/50 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${getMoistureColor(moisture)}`} style={{ width: `${moisture}%` }} />
              </div>
            </div>

            {/* 2. Dinh Dưỡng Hữu Cơ */}
            <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 p-2 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-amber-800 dark:text-amber-300 font-medium flex items-center gap-1 text-[11px]">
                  <Package className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isEn ? 'Nutrients' : 'Dinh dưỡng'}</span>
                </span>
                <span className="font-bold text-amber-900 dark:text-amber-200 text-[11px]">{nutrients}%</span>
              </div>
              <div className="w-full bg-amber-200/50 dark:bg-amber-900/50 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${getNutrientColor(nutrients)}`} style={{ width: `${nutrients}%` }} />
              </div>
            </div>

            {/* 3. Ánh Nắng */}
            <div className="bg-yellow-50/50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/30 p-2 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-yellow-800 dark:text-yellow-300 font-medium flex items-center gap-1 text-[11px]">
                  <Sun className="w-3.5 h-3.5 text-yellow-500" />
                  <span>{isEn ? 'Sunlight' : 'Ánh sáng'}</span>
                </span>
                <span className="font-bold text-yellow-900 dark:text-yellow-200 text-[11px]">{sunlight}%</span>
              </div>
              <div className="w-full bg-yellow-200/50 dark:bg-yellow-900/50 h-1.5 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full rounded-full transition-all" style={{ width: `${sunlight}%` }} />
              </div>
            </div>

            {/* 4. Đất Chậu */}
            <div className="bg-stone-100/60 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 p-2 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-stone-700 dark:text-stone-300 font-medium flex items-center gap-1 text-[11px]">
                  <Layers className="w-3.5 h-3.5 text-stone-500" />
                  <span>{isEn ? 'Soil Quality' : 'Đất chậu'}</span>
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-200 text-[11px]">{soil}%</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-stone-500 h-full rounded-full transition-all" style={{ width: `${soil}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Bộ 4 Nút Chăm Sóc Nhanh Tiêu Thụ Vật Phẩm & Web3 / Thu Hoạch */}
      <div className="p-4 sm:p-5 pt-0 space-y-3">
        {/* Nút Đúc NFT Sepolia On-Chain Thật (khi đạt Giai đoạn 5) */}
        {!plant.passport_token_id && currentStage >= 5 && currentExp >= targetExp && onMintNft && (
          <button
            onClick={() => onMintNft(plant)}
            className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-98 animate-pulse"
          >
            <Award className="w-4 h-4 text-stone-950" />
            <span>{isEn ? 'Mint Living NFT Passport (Ethereum Sepolia)' : 'Đúc Hộ Chiếu NFT On-Chain Thật (Sepolia)'}</span>
          </button>
        )}

        {/* Nút Thu Hoạch Vụ Mùa (khi đạt Giai đoạn 5) */}
        {currentStage >= 5 && onHarvestCrop && (
          <button
            onClick={() => onHarvestCrop(plant)}
            className="w-full py-2 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
          >
            <span>🧺</span>
            <span>{isEn ? 'Harvest Crop (+120 Hearts)' : 'Thu Hoạch Vụ Mùa (+120 Tim)'}</span>
          </button>
        )}

        {/* 4 Nút Chăm Sóc 1-Click Tiêu Hao Vật Phẩm */}
        <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-forest-100 dark:border-forest-800">
          {/* Nút Tưới Nước */}
          <button
            onClick={() => handleCareClick('water')}
            disabled={!waterCheck.canApply || (inventory.water || 0) <= 0}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 transition ${
              waterCheck.canApply && (inventory.water || 0) > 0
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs active:scale-95'
                : 'bg-stone-100 dark:bg-charcoal-800 text-stone-400 dark:text-stone-600 cursor-not-allowed border border-stone-200 dark:border-stone-800'
            }`}
            title={waterCheck.canApply ? (isEn ? 'Water plant (-1)' : 'Tưới nước cho cây (-1)') : waterCheck.reason_vi}
          >
            <div className="flex items-center gap-0.5">
              <Droplets className="w-3.5 h-3.5" />
              {!waterCheck.canApply && <Lock className="w-2.5 h-2.5 text-amber-500" />}
            </div>
            <span className="text-[10px]">{isEn ? 'Water' : 'Tưới'}</span>
            <span className="text-[9px] opacity-80">({inventory.water || 0})</span>
          </button>

          {/* Nút Bón Phân */}
          <button
            onClick={() => handleCareClick('fertilizer')}
            disabled={!fertCheck.canApply || (inventory.fertilizer || 0) <= 0}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 transition ${
              fertCheck.canApply && (inventory.fertilizer || 0) > 0
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-xs active:scale-95'
                : 'bg-stone-100 dark:bg-charcoal-800 text-stone-400 dark:text-stone-600 cursor-not-allowed border border-stone-200 dark:border-stone-800'
            }`}
            title={fertCheck.canApply ? (isEn ? 'Feed compost (-1)' : 'Bón phân trùn quế (-1)') : fertCheck.reason_vi}
          >
            <div className="flex items-center gap-0.5">
              <Package className="w-3.5 h-3.5" />
              {!fertCheck.canApply && <Lock className="w-2.5 h-2.5 text-amber-500" />}
            </div>
            <span className="text-[10px]">{isEn ? 'Feed' : 'Bón'}</span>
            <span className="text-[9px] opacity-80">({inventory.fertilizer || 0})</span>
          </button>

          {/* Nút Tắm Nắng */}
          <button
            onClick={() => handleCareClick('sunlight')}
            disabled={(inventory.sunlight || 0) <= 0}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 transition ${
              (inventory.sunlight || 0) > 0
                ? 'bg-yellow-600 hover:bg-yellow-500 text-white shadow-xs active:scale-95'
                : 'bg-stone-100 dark:bg-charcoal-800 text-stone-400 dark:text-stone-600 cursor-not-allowed border border-stone-200 dark:border-stone-800'
            }`}
            title={isEn ? 'Sunlight booster (-1)' : 'Tắm nắng ban mai (-1)'}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="text-[10px]">{isEn ? 'Sun' : 'Nắng'}</span>
            <span className="text-[9px] opacity-80">({inventory.sunlight || 0})</span>
          </button>

          {/* Nút Xới Đất */}
          <button
            onClick={() => handleCareClick('soil')}
            disabled={(inventory.soil || 0) <= 0}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 transition ${
              (inventory.soil || 0) > 0
                ? 'bg-stone-700 hover:bg-stone-600 text-white shadow-xs active:scale-95'
                : 'bg-stone-100 dark:bg-charcoal-800 text-stone-400 dark:text-stone-600 cursor-not-allowed border border-stone-200 dark:border-stone-800'
            }`}
            title={isEn ? 'Enrich potting soil (-1)' : 'Thêm đất vi sinh (-1)'}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="text-[10px]">{isEn ? 'Soil' : 'Xới Đất'}</span>
            <span className="text-[9px] opacity-80">({inventory.soil || 0})</span>
          </button>
        </div>

        {/* Nút Tiện Ích: Nhật ký, So sánh, In ấn */}
        <div className="flex items-center justify-between gap-1 pt-1 border-t border-forest-50 dark:border-forest-800/60 text-xs">
          <button
            onClick={() => onOpenAddDiary(plant.id)}
            className="flex-1 py-1.5 px-2 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-800 dark:text-forest-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition"
          >
            <Camera className="w-3 h-3 text-emerald-600" />
            <span>{isEn ? `Diary (${diariesCount})` : `Nhật Ký (${diariesCount})`}</span>
          </button>

          <button
            onClick={() => onComparePlant(plant)}
            className="p-1.5 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-700 dark:text-forest-300 transition"
            title={isEn ? 'Before/After Comparison' : 'So sánh Before/After'}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenPrintBook(plant.id)}
            className="p-1.5 rounded-xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-700 dark:text-forest-300 transition"
            title={isEn ? 'Print Passport & Growth Record' : 'In hồ sơ & sổ tay cây'}
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
