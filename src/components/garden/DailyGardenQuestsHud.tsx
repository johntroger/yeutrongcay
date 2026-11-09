import React from 'react';
import {
  Sunrise,
  Droplets,
  Package,
  Sun,
  CheckCircle2,
  Circle,
  Sparkles
} from 'lucide-react';
import { playGardenSound } from '../../services/gardenGameService.ts';

export interface DailyQuestsState {
  dewClaimed: boolean;
  waterCount: number;
  sunOrFertCount: number;
  bonusClaimed: boolean;
}

export interface DailyGardenQuestsHudProps {
  isEn: boolean;
  questsState: DailyQuestsState;
  onClaimDailyDew: () => void;
  onClaimBonusReward: () => void;
}

export const DailyGardenQuestsHud: React.FC<DailyGardenQuestsHudProps> = ({
  isEn,
  questsState,
  onClaimDailyDew,
  onClaimBonusReward
}) => {
  const isTask1Done = questsState.dewClaimed;
  const isTask2Done = questsState.waterCount >= 1;
  const isTask3Done = questsState.sunOrFertCount >= 1;

  const completedCount = (isTask1Done ? 1 : 0) + (isTask2Done ? 1 : 0) + (isTask3Done ? 1 : 0);
  const isAllCompleted = completedCount === 3;

  const handleClaimBonusClick = () => {
    if (isAllCompleted && !questsState.bonusClaimed) {
      playGardenSound('harvest');
      onClaimBonusReward();
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 dark:from-amber-950/20 dark:via-emerald-950/20 dark:to-charcoal-900 border border-amber-200/60 dark:border-forest-800 shadow-sm transition-all">
      {/* Tiêu đề & Tiến độ tổng quan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Sunrise className="w-5 h-5 animate-bounce-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-black text-sm sm:text-base text-forest-950 dark:text-cream-50 flex items-center gap-1.5">
                <span>{isEn ? '🌅 Morning Garden Quests' : '🌅 Nhiệm Vụ Sớm Mai'}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                {completedCount}/3 {isEn ? 'Completed' : 'Hoàn thành'}
              </span>
            </div>
            <p className="text-[11px] text-forest-700 dark:text-forest-300 mt-0.5">
              {isEn
                ? 'Complete 3 daily actions to nurture your balcony garden and claim a bonus Organic Fertilizer Pouch.'
                : 'Thực hiện 3 thói quen sớm mai để tích lũy Tim và nhận thêm 1 Túi Phân Trùn Quế vi sinh.'}
            </p>
          </div>
        </div>

        {/* Nút nhận thưởng khi hoàn thành 3/3 */}
        {isAllCompleted && !questsState.bonusClaimed && (
          <button
            onClick={handleClaimBonusClick}
            className="self-start sm:self-center py-2 px-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md animate-pulse transition active:scale-95"
          >
            <Package className="w-4 h-4 text-amber-200" />
            <span>{isEn ? 'Claim 1x Fertilizer Pouch 👝' : 'Nhận 1 Túi Phân Vi Sinh 👝'}</span>
          </button>
        )}

        {questsState.bonusClaimed && (
          <span className="self-start sm:self-center py-1 px-3 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isEn ? 'Bonus Claimed Today' : 'Đã nhận quà hôm nay'}</span>
          </span>
        )}
      </div>

      {/* 3 Nhiệm vụ dạng thẻ thu nhỏ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Nhiệm vụ 1: Điểm danh nhận sương */}
        <div
          onClick={!isTask1Done ? onClaimDailyDew : undefined}
          className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
            isTask1Done
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
              : 'bg-white dark:bg-charcoal-800 border-stone-200 dark:border-charcoal-700 hover:border-amber-400 cursor-pointer text-stone-800 dark:text-stone-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0">
              <Droplets className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold truncate">
                {isEn ? 'Claim Daily Dew' : 'Điểm danh nhận sương'}
              </div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400">
                +15 {isEn ? 'Hearts' : 'Tim 💖'}
              </div>
            </div>
          </div>
          {isTask1Done ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <Circle className="w-4 h-4 text-stone-300 dark:text-stone-600 shrink-0" />
          )}
        </div>

        {/* Nhiệm vụ 2: Tưới nước 1 chậu cây */}
        <div
          className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
            isTask2Done
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
              : 'bg-white dark:bg-charcoal-800 border-stone-200 dark:border-charcoal-700 text-stone-800 dark:text-stone-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-xl bg-teal-100 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 shrink-0">
              <Droplets className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold truncate">
                {isEn ? 'Water 1 Plant' : 'Tưới 1 chậu cây'}
              </div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400">
                {questsState.waterCount}/1 {isEn ? 'done' : 'hoàn tất'} (+20 {isEn ? 'Hearts' : 'Tim 💖'})
              </div>
            </div>
          </div>
          {isTask2Done ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <Circle className="w-4 h-4 text-stone-300 dark:text-stone-600 shrink-0" />
          )}
        </div>

        {/* Nhiệm vụ 3: Tắm nắng hoặc bón phân */}
        <div
          className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
            isTask3Done
              ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
              : 'bg-white dark:bg-charcoal-800 border-stone-200 dark:border-charcoal-700 text-stone-800 dark:text-stone-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 shrink-0">
              <Sun className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <div className="text-xs font-bold truncate">
                {isEn ? 'Sunlight or Fertilizer' : 'Tắm nắng hoặc Bón phân'}
              </div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400">
                {questsState.sunOrFertCount}/1 {isEn ? 'done' : 'hoàn tất'} (+20 {isEn ? 'Hearts' : 'Tim 💖'})
              </div>
            </div>
          </div>
          {isTask3Done ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <Circle className="w-4 h-4 text-stone-300 dark:text-stone-600 shrink-0" />
          )}
        </div>
      </div>
    </div>
  );
};
