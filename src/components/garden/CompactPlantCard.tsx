import React from 'react';
import { Droplets, Sprout, Sparkles, Heart } from 'lucide-react';
import { GardenPlant } from '../../types/index.ts';
import { getPlantGrowthProfile } from '../../services/gardenGameService.ts';

export interface CompactPlantCardProps {
  plant: GardenPlant;
  isEn: boolean;
  onOpenDetail: (plant: GardenPlant) => void;
  onQuickWater?: (plant: GardenPlant, e: React.MouseEvent) => void;
  onHarvestCrop?: (plant: GardenPlant, e: React.MouseEvent) => void;
}

export const CompactPlantCard: React.FC<CompactPlantCardProps> = ({
  plant,
  isEn,
  onOpenDetail,
  onQuickWater,
  onHarvestCrop
}) => {
  const profile = getPlantGrowthProfile(plant.custom_name, plant.plant_id);
  const targetExp = profile.target_exp;
  const currentExp = plant.growth_exp ?? 0;
  const currentStage = Math.min(5, Math.max(1, plant.growth_stage ?? 1));
  const expPercent = Math.min(100, Math.round((currentExp / targetExp) * 100));

  const moisture = plant.moisture_level ?? 80;
  const nutrients = plant.nutrient_level ?? 75;
  const health = plant.health_score ?? 100;
  const isMature = currentStage === 5;
  const isThirsty = moisture < 50;
  const isHungry = nutrients < 45;

  // Tính số ngày đã trồng
  const plantedTime = plant.planted_date ? new Date(plant.planted_date).getTime() : Date.now();
  const daysPlanted = Math.max(0, Math.floor((Date.now() - plantedTime) / (1000 * 60 * 60 * 24)));

  return (
    <div
      onClick={() => onOpenDetail(plant)}
      className="group relative h-full bg-white dark:bg-charcoal-900 rounded-2xl border border-forest-100 dark:border-forest-800/80 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition duration-200 flex flex-col justify-between overflow-hidden cursor-pointer active:scale-[0.99]"
    >
      {/* 1. Ảnh đại diện cây - CỐ ĐỊNH KÍCH THƯỚC CHUẨN ĐỒNG NHẤT */}
      <div className="relative w-full h-36 sm:h-40 shrink-0 bg-forest-950 overflow-hidden">
        <img
          src={plant.cover_image_url || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=600&auto=format&fit=crop&q=80'}
          alt={plant.custom_name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
          loading="lazy"
        />

        {/* Gradient mờ góc dưới để đọc số ngày */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Badge Cấp độ trên ảnh */}
        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
          <Sprout className="w-2.5 h-2.5 text-emerald-400" />
          <span>{isEn ? `Lv.${currentStage}` : `Cấp ${currentStage}`}</span>
        </div>

        {/* Badge Thu Hoạch hoặc Sức Khỏe trên ảnh */}
        <div className="absolute top-2 right-2">
          {isMature ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-charcoal-950 text-[10px] font-black uppercase tracking-wider animate-pulse shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{isEn ? 'Harvest' : 'Thu hoạch'}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
              <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
              <span>{health}%</span>
            </span>
          )}
        </div>

        {/* Số ngày đã trồng */}
        <div className="absolute bottom-1.5 left-2 text-[10px] font-medium text-white/90">
          {daysPlanted} {isEn ? 'days' : 'ngày'}
        </div>

        {/* Cảnh báo khát nước nếu có */}
        {isThirsty && (
          <div className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded-md bg-rose-600/90 text-white text-[9px] font-bold animate-pulse flex items-center gap-0.5">
            <Droplets className="w-2.5 h-2.5" />
            <span>{isEn ? 'Thirsty' : 'Khát nước'}</span>
          </div>
        )}
      </div>

      {/* 2. Thông tin chính của cây */}
      <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
        <div className="min-h-[34px]">
          <h4 className="font-serif font-bold text-xs sm:text-sm text-forest-950 dark:text-cream-50 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
            {plant.custom_name}
          </h4>
          {plant.species_name ? (
            <p className="text-[10px] text-gray-500 dark:text-gray-400 italic truncate mt-0.5">
              {plant.species_name}
            </p>
          ) : (
            <p className="text-[10px] text-transparent select-none mt-0.5">-</p>
          )}
        </div>

        {/* 3. Điểm Kinh Nghiệm EXP Cụ Thể & Thanh Tiến Độ */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-semibold">
            <span className="flex items-center gap-1 text-forest-800 dark:text-cream-200">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">⭐ {currentExp}</span>
              <span className="text-gray-400">/{targetExp} EXP</span>
            </span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">
              {expPercent}%
            </span>
          </div>

          <div className="w-full bg-gray-100 dark:bg-charcoal-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${expPercent}%` }}
            />
          </div>
        </div>

        {/* 4. Chỉ số Nước & Dinh Dưỡng mini */}
        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
          <div className="flex items-center gap-1 bg-blue-50/70 dark:bg-blue-950/30 px-1.5 py-0.5 rounded-md border border-blue-100/60 dark:border-blue-900/40">
            <Droplets className={`w-2.5 h-2.5 shrink-0 ${isThirsty ? 'text-rose-500 animate-bounce' : 'text-blue-500'}`} />
            <span className={`font-semibold truncate ${isThirsty ? 'text-rose-700 dark:text-rose-300 font-bold' : 'text-blue-900 dark:text-blue-200'}`}>
              {moisture}%
            </span>
          </div>

          <div className="flex items-center gap-1 bg-amber-50/70 dark:bg-amber-950/30 px-1.5 py-0.5 rounded-md border border-amber-100/60 dark:border-amber-900/40">
            <span className="text-[10px] leading-none shrink-0">👝</span>
            <span className={`font-semibold truncate ${isHungry ? 'text-amber-800 dark:text-amber-200 font-bold' : 'text-amber-900 dark:text-amber-200'}`}>
              {nutrients}%
            </span>
          </div>
        </div>

        {/* 5. Nút Thao Tác Nhanh (Tưới nước hoặc Thu hoạch) */}
        <div className="pt-1 border-t border-forest-50 dark:border-forest-800/60 flex items-center justify-between gap-1">
          {isMature ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onHarvestCrop) onHarvestCrop(plant, e);
              }}
              className="w-full py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-charcoal-950 text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow-xs active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Harvest (+Seeds & Hearts)' : 'Thu hoạch (+Hạt 🌱 & Tim ❤️)'}</span>
            </button>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onQuickWater) onQuickWater(plant, e);
                }}
                className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer active:scale-95 ${
                  isThirsty
                    ? 'bg-blue-600 hover:bg-blue-700 text-white animate-pulse'
                    : 'bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-700 dark:text-blue-300'
                }`}
                title={isEn ? 'Quick water plant' : 'Tưới nước nhanh cho cây'}
              >
                <Droplets className="w-2.5 h-2.5" />
                <span>{isThirsty ? (isEn ? 'Water Now' : 'Tưới ngay') : (isEn ? 'Water' : 'Tưới')}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail(plant);
                }}
                className="py-1 px-2 rounded-lg bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-700 dark:text-forest-300 text-[10px] font-bold transition cursor-pointer"
                title={isEn ? 'View plant profile' : 'Xem hồ sơ chi tiết'}
              >
                <span>{isEn ? 'Details' : 'Chi tiết'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
