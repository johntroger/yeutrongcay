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
  AlertCircle
} from 'lucide-react';
import { GardenCareItemType } from '../../types/index.ts';
import { GARDEN_ECO_ITEMS, playGardenSound } from '../../services/gardenGameService.ts';

export interface GardenSupplyShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEn: boolean;
  totalHearts: number;
  inventory: Record<GardenCareItemType, number>;
  onBuyItem: (type: GardenCareItemType, quantity: number) => Promise<{ success: boolean; message: string }>;
}

export const GardenSupplyShopModal: React.FC<GardenSupplyShopModalProps> = ({
  isOpen,
  onClose,
  isEn,
  totalHearts,
  inventory,
  onBuyItem
}) => {
  const [buyingType, setBuyingType] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

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
    }
  };

  const itemsList = Object.values(GARDEN_ECO_ITEMS);

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
              <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                {isEn ? 'Eco Urban Garden Supply Shop' : 'Cửa Hàng Vật Phẩm Sinh Thái Đô Thị'}
              </h3>
              <p className="text-xs text-emerald-300/80">
                {isEn 
                  ? 'Exchange your contribution Hearts for essential care supplies'
                  : 'Đổi Tim đóng góp cộng đồng lấy nước, phân hữu cơ, đất và ánh sáng'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800/80 text-stone-400 hover:text-white hover:bg-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thanh Số Dư Tim */}
        <div className="px-6 py-3 bg-stone-950/60 border-b border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-400">
            {isEn ? 'Available Balance:' : 'Số dư Tim hiện tại của bạn:'}
          </span>
          <div className="flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-xl">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span className="font-extrabold text-rose-200 text-sm">{totalHearts.toLocaleString()}</span>
            <span className="text-xs text-rose-300/70">{isEn ? 'Hearts' : 'Tim'}</span>
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

        {/* Danh sách 5 vật phẩm */}
        <div className="p-5 md:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {itemsList.map((item) => {
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
                      className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
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
                      className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
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
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>
            {isEn ? '💡 Earn more Hearts by reviewing plants or answering clinic queries.' : '💡 Kiếm thêm Tim bằng cách trả lời bệnh cây hoặc chia sẻ kinh nghiệm.'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl transition-colors font-medium"
          >
            {isEn ? 'Close' : 'Đóng'}
          </button>
        </div>
      </div>
    </div>
  );
};
