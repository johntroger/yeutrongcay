import React, { useState, useEffect } from 'react';
import {
  Heart,
  ShoppingBag,
  Droplets,
  Package,
  Layers,
  Sun,
  Sparkles,
  Gift,
  CheckCircle2,
  Sprout
} from 'lucide-react';
import { GardenCareItemType } from '../../types/index.ts';

export interface GardenInventoryBarProps {
  isEn: boolean;
  totalHearts: number;
  inventory: Record<GardenCareItemType, number>;
  onOpenShop: () => void;
  onClaimDailyDew?: () => void;
  hasClaimedDailyDew?: boolean;
}

export const GardenInventoryBar: React.FC<GardenInventoryBarProps> = ({
  isEn,
  totalHearts,
  inventory,
  onOpenShop,
  onClaimDailyDew,
  hasClaimedDailyDew = false
}) => {
  const [claimedToday, setClaimedToday] = useState(hasClaimedDailyDew);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('ytc_daily_dew_checkin');
    if (saved === today) {
      setClaimedToday(true);
    }
  }, [hasClaimedDailyDew]);

  const handleClaim = () => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('ytc_daily_dew_checkin', today);
    setClaimedToday(true);
    if (onClaimDailyDew) {
      onClaimDailyDew();
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-900/90 via-teal-900/90 to-emerald-950/90 text-white rounded-2xl p-4 md:p-5 shadow-xl border border-emerald-500/20 mb-8 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Khối bên trái: Số dư Tim & Nút Cửa Hàng Sinh Thái */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Badge Số dư Tim */}
          <div className="flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 px-3.5 py-1.5 rounded-xl shadow-inner">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />
            <span className="font-extrabold text-lg text-rose-100 tracking-wide">
              {totalHearts.toLocaleString()}
            </span>
            <span className="text-xs text-rose-200/80 font-medium">
              {isEn ? 'Hearts' : 'Tim Yêu Vườn'}
            </span>
          </div>

          {/* Nút Nhận Giọt Sương Sớm Mai (Daily Check-in) */}
          {!claimedToday ? (
            <button
              onClick={handleClaim}
              className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md transition-all transform hover:scale-105 active:scale-95"
              title={isEn ? 'Daily Check-in: +15 Hearts' : 'Điểm danh sớm mai: +15 Tim'}
            >
              <Gift className="w-3.5 h-3.5 text-cyan-100" />
              <span>{isEn ? 'Claim Morning Dew (+15)' : 'Nhận Sương Sớm (+15)'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 text-xs text-emerald-300/80 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEn ? 'Dew Claimed' : 'Đã nhận sương'}</span>
            </div>
          )}

          {/* Nút Cửa Hàng Đổi Vật Phẩm */}
          <button
            onClick={onOpenShop}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs md:text-sm px-4 py-2 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 ml-auto sm:ml-0"
          >
            <ShoppingBag className="w-4 h-4 text-stone-950" />
            <span>{isEn ? 'Eco-Supply Shop' : 'Cửa Hàng Sinh Thái'}</span>
          </button>
        </div>

        {/* Khối bên phải: Túi Đồ Nghề Làm Vườn (Inventory Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <span className="text-xs uppercase font-bold text-emerald-300/70 tracking-wider shrink-0 mr-1 hidden sm:inline">
            {isEn ? 'Your Bag:' : 'Túi Đồ:'}
          </span>

          {/* 1. Bình Nước */}
          <div
            className="flex items-center gap-1.5 bg-blue-950/60 border border-blue-500/30 px-3 py-1.5 rounded-xl shrink-0 transition-transform hover:border-blue-400"
            title={isEn ? 'Rainwater: Hydrates soil' : 'Nước mưa: Cấp ẩm cho đất'}
          >
            <Droplets className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-200 hidden md:inline">{isEn ? 'Water' : 'Nước'}</span>
            <span className="font-bold text-xs md:text-sm text-blue-100 bg-blue-500/20 px-1.5 py-0.5 rounded-md">
              {inventory.water || 0}
            </span>
          </div>

          {/* 2. Túi Phân Hữu Cơ */}
          <div
            className="flex items-center gap-1.5 bg-amber-950/60 border border-amber-500/30 px-3 py-1.5 rounded-xl shrink-0 transition-transform hover:border-amber-400"
            title={isEn ? 'Organic Fertilizer: Boosts nutrients' : 'Túi phân trùn quế: Bổ sung dinh dưỡng'}
          >
            <Package className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-amber-200 hidden md:inline">{isEn ? 'Compost' : 'Túi Phân'}</span>
            <span className="font-bold text-xs md:text-sm text-amber-100 bg-amber-500/20 px-1.5 py-0.5 rounded-md">
              {inventory.fertilizer || 0}
            </span>
          </div>

          {/* 3. Đất Vi Sinh */}
          <div
            className="flex items-center gap-1.5 bg-stone-900/70 border border-stone-500/30 px-3 py-1.5 rounded-xl shrink-0 transition-transform hover:border-stone-400"
            title={isEn ? 'Potting Soil: Restores structure' : 'Đất mùn vi sinh: Tơi xốp đất chậu'}
          >
            <Layers className="w-4 h-4 text-stone-300" />
            <span className="text-xs text-stone-300 hidden md:inline">{isEn ? 'Soil' : 'Đất Mùn'}</span>
            <span className="font-bold text-xs md:text-sm text-stone-100 bg-stone-500/20 px-1.5 py-0.5 rounded-md">
              {inventory.soil || 0}
            </span>
          </div>

          {/* 4. Nắng Ban Mai */}
          <div
            className="flex items-center gap-1.5 bg-amber-950/50 border border-yellow-500/30 px-3 py-1.5 rounded-xl shrink-0 transition-transform hover:border-yellow-400"
            title={isEn ? 'Morning Sun: Powers photosynthesis' : 'Nắng ban mai: Kích hoạt quang hợp'}
          >
            <Sun className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-yellow-200 hidden md:inline">{isEn ? 'Sun' : 'Nắng'}</span>
            <span className="font-bold text-xs md:text-sm text-yellow-100 bg-yellow-500/20 px-1.5 py-0.5 rounded-md">
              {inventory.sunlight || 0}
            </span>
          </div>

          {/* 5. Bình Xịt Thảo Mộc */}
          <div
            className="flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl shrink-0 transition-transform hover:border-emerald-400"
            title={isEn ? 'Herbal Spray: Cures pests' : 'Xịt thảo mộc: Trừ sâu bệnh hữu cơ'}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-emerald-200 hidden md:inline">{isEn ? 'Spray' : 'Xịt Thảo Mộc'}</span>
            <span className="font-bold text-xs md:text-sm text-emerald-100 bg-emerald-500/20 px-1.5 py-0.5 rounded-md">
              {inventory.spray || 0}
            </span>
          </div>

          {/* 6. Hạt Giống Thu Hoạch (Seeds) */}
          <div
            className="flex items-center gap-1.5 bg-lime-950/70 border border-lime-500/40 px-3 py-1.5 rounded-xl shrink-0 transition-transform hover:border-lime-300 shadow-inner"
            title={isEn ? 'Harvested Seeds: Trade for Hearts/EXP or Stake in Web3 DeFi' : 'Hạt giống thu hoạch: Bán đổi Tim/EXP hoặc gửi Staking Web3 DeFi'}
          >
            <Sprout className="w-4 h-4 text-lime-400" />
            <span className="text-xs text-lime-200 hidden md:inline">{isEn ? 'Seeds' : 'Hạt Giống'}</span>
            <span className="font-bold text-xs md:text-sm text-lime-100 bg-lime-500/30 px-1.5 py-0.5 rounded-md border border-lime-400/40">
              {inventory.seeds || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
