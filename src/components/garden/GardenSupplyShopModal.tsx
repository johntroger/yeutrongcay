import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Heart,
  Droplets,
  Package,
  Layers,
  Sun,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Sprout,
  Star,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { GardenCareItemType } from '../../types/index.ts';
import { GARDEN_ECO_ITEMS, playGardenSound } from '../../services/gardenGameService.ts';

export interface GardenSupplyShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEn: boolean;
  totalHearts: number;
  totalExp?: number;
  inventory: Record<GardenCareItemType, number>;
  onBuyItem: (type: GardenCareItemType, quantity: number) => Promise<{ success: boolean; message: string }>;
  onSellSeeds?: (quantity: number, rewardType: 'hearts' | 'exp') => Promise<{ success: boolean; message: string }>;
  initialTab?: 'buy' | 'sell';
}

export const GardenSupplyShopModal: React.FC<GardenSupplyShopModalProps> = ({
  isOpen,
  onClose,
  isEn,
  totalHearts,
  totalExp = 0,
  inventory,
  onBuyItem,
  onSellSeeds,
  initialTab = 'buy'
}) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>(initialTab);
  const [buyingType, setBuyingType] = useState<string | null>(null);
  const [isSelling, setIsSelling] = useState(false);
  const [sellRewardType, setSellRewardType] = useState<'hearts' | 'exp'>('hearts');
  const [sellQty, setSellQty] = useState<number>(() => Math.min(5, Math.max(1, inventory.seeds || 1)));
  const [notice, setNotice] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const availableSeeds = inventory.seeds || 0;

  // Xử lý Mua vật phẩm bằng Tim
  const handleBuy = async (type: GardenCareItemType, qty: number) => {
    const item = GARDEN_ECO_ITEMS[type];
    const totalCost = item.heart_price * qty;

    if (totalHearts < totalCost) {
      setNotice({
        text: isEn 
          ? `Not enough Hearts! Need ${totalCost} Hearts, but you only have ${totalHearts}.`
          : `Không đủ Tim! Bạn cần ${totalCost} Tim nhưng chỉ có ${totalHearts} Tim. Hãy điểm danh hoặc chia sẻ vườn để nhận thêm Tim nhé!`,
        isError: true
      });
      return;
    }

    setBuyingType(type);
    setNotice(null);

    const res = await onBuyItem(type, qty);
    setBuyingType(null);

    if (res.success) {
      playGardenSound('levelup');
      setNotice({
        text: res.message || (isEn ? `Exchanged ${qty}x ${item.name_en}!` : `Đổi thành công ${qty}x ${item.name_vi}!`),
        isError: false
      });
    } else {
      setNotice({
        text: res.message || (isEn ? 'Transaction failed' : 'Đổi vật phẩm không thành công'),
        isError: true
      });
    }
  };

  // Xử lý Bán hạt giống thu hoạch đổi Tim hoặc EXP
  const handleSell = async () => {
    if (!onSellSeeds) return;
    if (availableSeeds <= 0) {
      setNotice({
        text: isEn ? 'You have no seeds in your backpack to sell!' : 'Bạn chưa có hạt giống nào trong balo để bán!',
        isError: true
      });
      return;
    }

    if (sellQty <= 0 || sellQty > availableSeeds) {
      setNotice({
        text: isEn 
          ? `Invalid quantity! Please enter a number between 1 and ${availableSeeds}.`
          : `Số lượng không hợp lệ! Vui lòng nhập từ 1 đến ${availableSeeds} hạt giống.`,
        isError: true
      });
      return;
    }

    setIsSelling(true);
    setNotice(null);

    const res = await onSellSeeds(sellQty, sellRewardType);
    setIsSelling(false);

    if (res.success) {
      playGardenSound('harvest');
      setNotice({
        text: res.message,
        isError: false
      });
      // Điều chỉnh lại số lượng bán phù hợp với tồn kho mới
      setSellQty(1);
    } else {
      setNotice({
        text: res.message || (isEn ? 'Sale failed' : 'Giao dịch thu mua thất bại'),
        isError: true
      });
    }
  };

  const getItemIcon = (type: GardenCareItemType) => {
    switch (type) {
      case 'water':
        return <Droplets className="w-8 h-8 text-blue-400" />;
      case 'fertilizer':
        return <Package className="w-8 h-8 text-amber-500" />;
      case 'soil':
        return <Layers className="w-8 h-8 text-stone-400" />;
      case 'sunlight':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'spray':
        return <Sparkles className="w-8 h-8 text-emerald-400" />;
      case 'seeds':
        return <Sprout className="w-8 h-8 text-lime-400" />;
    }
  };

  // Chỉ hiển thị 5 công cụ chăm sóc cốt lõi trong tab Mua đồ
  const careItemsList = Object.values(GARDEN_ECO_ITEMS).filter((item) => item.item_type !== 'seeds');

  // Tính trước thành phẩm quy đổi hạt giống
  const previewReward = sellRewardType === 'hearts' ? sellQty * 2 : sellQty * 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-stone-900 border border-emerald-500/30 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-5 md:p-6 bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shadow-inner">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{isEn ? 'Eco Urban Garden Shop & Exchange' : 'Cửa Hàng Sinh Thái & Sàn Nông Sản'}</span>
                <span className="text-[10px] uppercase font-mono tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full hidden sm:inline">
                  2 Chiều Trao Đổi
                </span>
              </h3>
              <p className="text-xs text-emerald-300/80">
                {isEn 
                  ? 'Buy essential care supplies with Hearts, or sell harvested seeds for Hearts / EXP'
                  : 'Mua vật tư chăm sóc bằng Tim, hoặc bán hạt giống thu hoạch để đổi lấy Tim & Điểm EXP'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800/80 text-stone-400 hover:text-white hover:bg-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thanh Tab Chuyển Đổi: [Mua Vật Tư] vs [Thu Mua Hạt Giống] */}
        <div className="grid grid-cols-2 p-2 bg-stone-950 border-b border-stone-800 gap-2">
          <button
            onClick={() => {
              setActiveTab('buy');
              setNotice(null);
            }}
            className={`py-2 px-3 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'buy'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isEn ? '1. Buy Eco-Supplies (Care Items)' : '1. Mua Vật Tư Chăm Sóc (Bằng Tim)'}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('sell');
              setNotice(null);
            }}
            className={`py-2 px-3 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'sell'
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 shadow-md font-extrabold'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <Sprout className="w-4 h-4 text-lime-400" />
            <span>{isEn ? '2. Sell Harvest Seeds (Get Hearts/EXP)' : '2. Bán Hạt Giống (Đổi Tim/EXP)'}</span>
            {availableSeeds > 0 && (
              <span className="text-[10px] font-mono bg-lime-500/30 text-lime-200 px-1.5 py-0.2 rounded-full border border-lime-400/40">
                {availableSeeds}
              </span>
            )}
          </button>
        </div>

        {/* Thanh Số Dư Khả Dụng */}
        <div className="px-6 py-2.5 bg-stone-950/80 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            {/* Số dư Tim */}
            <div className="flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-xl">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span className="font-extrabold text-rose-200">{totalHearts.toLocaleString()}</span>
              <span className="text-[11px] text-rose-300/70">{isEn ? 'Hearts' : 'Tim'}</span>
            </div>

            {/* Số dư Hạt Giống */}
            <div className="flex items-center gap-1.5 bg-lime-500/20 border border-lime-500/30 px-3 py-1 rounded-xl">
              <Sprout className="w-3.5 h-3.5 text-lime-400" />
              <span className="font-extrabold text-lime-200">{availableSeeds.toLocaleString()}</span>
              <span className="text-[11px] text-lime-300/70">{isEn ? 'Seeds in Bag' : 'Hạt Giống'}</span>
            </div>
          </div>

          <div className="text-[11px] text-stone-400 hidden sm:flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{isEn ? `Garden EXP: ${totalExp}` : `Tổng EXP Vườn: ${totalExp}`}</span>
          </div>
        </div>

        {/* Thông báo Alert */}
        {notice && (
          <div className={`mx-6 mt-4 p-3.5 rounded-xl flex items-center gap-2.5 text-xs font-medium border ${
            notice.isError 
              ? 'bg-rose-950/80 text-rose-200 border-rose-500/40' 
              : 'bg-emerald-950/80 text-emerald-200 border-emerald-500/40'
          }`}>
            {notice.isError ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            <span>{notice.text}</span>
          </div>
        )}

        {/* NỘI DUNG CHÍNH THEO TAB */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'buy' ? (
            /* =================== TAB 1: MUA VẬT TƯ =================== */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {careItemsList.map((item) => {
                const currentOwned = inventory[item.item_type] || 0;
                const canAfford1 = totalHearts >= item.heart_price;
                const canAfford5 = totalHearts >= item.heart_price * 5;
                const isProcessing = buyingType === item.item_type;

                return (
                  <div
                    key={item.item_type}
                    className="bg-stone-800/60 hover:bg-stone-800/90 border border-stone-700/60 hover:border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 shadow-md group"
                  >
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-700 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                        {getItemIcon(item.item_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-sm text-white truncate">
                            {isEn ? item.name_en : item.name_vi}
                          </h4>
                          <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-md shrink-0">
                            <Heart className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="font-extrabold text-xs text-amber-200">{item.heart_price}</span>
                          </div>
                        </div>
                        <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                          {isEn ? item.description_en : item.description_vi}
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-[11px] font-semibold">
                          <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            +{item.exp_boost} EXP
                          </span>
                          <span className="text-stone-400">
                            {isEn ? `In bag: ${currentOwned}` : `Đang có: ${currentOwned}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Nút đổi 1x và 5x */}
                    <div className="flex items-center gap-2 pt-2 border-t border-stone-700/50">
                      <button
                        onClick={() => handleBuy(item.item_type, 1)}
                        disabled={!canAfford1 || isProcessing}
                        className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          canAfford1 && !isProcessing
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md active:scale-95'
                            : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
                        }`}
                      >
                        <span>{isEn ? 'Buy 1x' : 'Đổi 1x'}</span>
                        <span className="text-[10px] opacity-80">({item.heart_price}💖)</span>
                      </button>

                      <button
                        onClick={() => handleBuy(item.item_type, 5)}
                        disabled={!canAfford5 || isProcessing}
                        className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          canAfford5 && !isProcessing
                            ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md active:scale-95'
                            : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
                        }`}
                      >
                        <span>{isEn ? 'Buy 5x' : 'Đổi 5x'}</span>
                        <span className="text-[10px] opacity-80">({item.heart_price * 5}💖)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* =================== TAB 2: THU MUA HẠT GIỐNG =================== */
            <div className="space-y-5">
              {/* Thẻ giới thiệu cơ chế */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-900 to-lime-950/60 border border-amber-500/30 flex items-start gap-3.5 shadow-md">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                  <Sprout className="w-6 h-6 text-lime-400" />
                </div>
                <div className="flex-1 text-xs space-y-1">
                  <h4 className="font-bold text-amber-200 text-sm">
                    {isEn ? 'Eco-Exchange: Sell Harvested Seeds' : 'Trạm Thu Mua Hạt Giống Bản Địa Từ Khu Vườn'}
                  </h4>
                  <p className="text-stone-300 leading-relaxed">
                    {isEn
                      ? 'Every time your mature plants are harvested, they produce valuable seeds. You can sell them here to replenish Hearts for supplies, boost Garden EXP, or stake in Web3 DeFi.'
                      : 'Mỗi khi cây trong vườn đạt độ chín muồi và được thu hoạch, cây sẽ kết tinh ra những hạt giống quý. Bạn có thể bán hạt giống tại đây để quy đổi lấy Tim mua vật tư hoặc lấy Điểm EXP tăng cấp vườn.'}
                  </p>
                </div>
              </div>

              {/* 1. Chọn loại phần thưởng quy đổi */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300 block mb-2.5">
                  {isEn ? '1. Select Reward Type:' : '1. Chọn Loại Phần Thưởng Muốn Nhận:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Đổi lấy Trái Tim */}
                  <div
                    onClick={() => setSellRewardType('hearts')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                      sellRewardType === 'hearts'
                        ? 'bg-rose-950/40 border-rose-500 shadow-lg'
                        : 'bg-stone-800/40 border-stone-700/60 hover:border-stone-600'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0">
                      <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                        <span>{isEn ? 'Hearts Reward' : 'Đổi Lấy Trái Tim ❤️'}</span>
                        <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-mono font-bold">
                          1 Hạt = 2 Tim
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        {isEn ? 'Use Hearts to buy water, fertilizer, soil in shop.' : 'Dùng Tim để mua nước, phân bón, đất mùn trong cửa hàng.'}
                      </p>
                    </div>
                  </div>

                  {/* Option 2: Đổi lấy Điểm EXP */}
                  <div
                    onClick={() => setSellRewardType('exp')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                      sellRewardType === 'exp'
                        ? 'bg-amber-950/40 border-amber-500 shadow-lg'
                        : 'bg-stone-800/40 border-stone-700/60 hover:border-stone-600'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                        <span>{isEn ? 'Garden EXP' : 'Đổi Điểm Kinh Nghiệm ⭐'}</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">
                          1 Hạt = 5 EXP
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        {isEn ? 'Boost your garden level and elevate your community karma tier.' : 'Tăng nhanh cấp độ khu vườn và thăng hạng tín nhiệm cộng đồng.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Chọn số lượng hạt giống muốn bán */}
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold uppercase tracking-wider text-stone-300">
                    {isEn ? '2. Quantity to Sell:' : '2. Số Lượng Hạt Giống Muốn Bán:'}
                  </label>
                  <span className="text-stone-400 font-mono text-[11px]">
                    {isEn ? `Available: ${availableSeeds} Seeds` : `Trong balo: ${availableSeeds} Hạt`}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={Math.max(1, availableSeeds)}
                    value={sellQty}
                    onChange={(e) => setSellQty(Math.max(1, Math.min(availableSeeds, Number(e.target.value) || 1)))}
                    className="w-28 py-2 px-3 rounded-xl bg-stone-900 border border-stone-700 font-mono font-bold text-center text-white text-base focus:border-amber-500 focus:outline-hidden"
                  />

                  {/* Nút chọn nhanh */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[1, 5, 10, 20].map((num) => (
                      <button
                        key={num}
                        onClick={() => setSellQty(Math.min(availableSeeds, num))}
                        disabled={availableSeeds < num}
                        className={`py-1.5 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                          sellQty === num
                            ? 'bg-amber-500 text-stone-950 font-black'
                            : availableSeeds >= num
                            ? 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                            : 'bg-stone-900 text-stone-600 border border-stone-800 cursor-not-allowed'
                        }`}
                      >
                        {num}
                      </button>
                    ))}

                    <button
                      onClick={() => setSellQty(availableSeeds)}
                      disabled={availableSeeds <= 0}
                      className="py-1.5 px-3 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 text-xs font-bold transition cursor-pointer"
                    >
                      {isEn ? 'Max' : 'Tất cả'} ({availableSeeds})
                    </button>
                  </div>
                </div>

                {/* Bảng xem trước thành phẩm giao dịch (Preview Box) */}
                <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lime-400 font-bold">{sellQty} 🌱</span>
                    <ArrowRight className="w-4 h-4 text-stone-500" />
                    <span className="font-bold flex items-center gap-1">
                      {sellRewardType === 'hearts' ? (
                        <span className="text-rose-400 flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 fill-rose-400" /> +{previewReward} Tim
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400" /> +{previewReward} EXP
                        </span>
                      )}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400">
                    {isEn ? `Remaining: ${Math.max(0, availableSeeds - sellQty)} seeds` : `Còn lại: ${Math.max(0, availableSeeds - sellQty)} hạt`}
                  </span>
                </div>

                {/* Nút Thực Hiện Bán Hạt Giống */}
                <button
                  onClick={handleSell}
                  disabled={availableSeeds <= 0 || isSelling || sellQty <= 0}
                  className={`w-full py-3 rounded-xl font-extrabold text-xs md:text-sm shadow-lg flex items-center justify-center gap-2 transition cursor-pointer ${
                    availableSeeds > 0 && !isSelling
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 active:scale-98'
                      : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed'
                  }`}
                >
                  <Sprout className="w-4 h-4" />
                  <span>
                    {isSelling
                      ? (isEn ? 'Processing exchange...' : 'Đang thực hiện quy đổi...')
                      : (isEn 
                          ? `Confirm Sell ${sellQty} Seeds (+${previewReward} ${sellRewardType === 'hearts' ? 'Hearts' : 'EXP'})` 
                          : `Xác Nhận Bán ${sellQty} Hạt Giống (Nhận +${previewReward} ${sellRewardType === 'hearts' ? 'Tim ❤️' : 'EXP ⭐'})`
                        )
                    }
                  </span>
                </button>
              </div>

              {/* Gợi ý Web3 DeFi Green Vault */}
              <div className="p-3.5 rounded-xl bg-forest-950/40 border border-forest-700/40 text-[11px] text-emerald-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    {isEn 
                      ? '💡 Tip: You can also stake these seeds in the Web3 DeFi Vault to earn 12.5% APY yield on Sepolia testnet.' 
                      : '💡 Mẹo sinh thái: Bạn cũng có thể giữ lại hạt giống này để gửi vào Web3 DeFi Green Vault nhận lãi suất APY 12.5% trên mạng blockchain Sepolia!'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>
            {isEn ? '💡 Earn more Hearts by reviewing plants or answering clinic queries.' : '💡 Kiếm thêm Tim bằng cách trả lời bệnh cây hoặc chia sẻ kinh nghiệm.'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl transition-colors font-medium cursor-pointer"
          >
            {isEn ? 'Close' : 'Đóng'}
          </button>
        </div>
      </div>
    </div>
  );
};
