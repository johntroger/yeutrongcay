import React from 'react';
import { Flame } from 'lucide-react';
import { WalletState } from '../../services/web3WalletService';
import { RegisteredPlantPassport } from '../../services/plantPassportRegistryService';

interface Web3OwnedPassportsSectionProps {
  isEn: boolean;
  wallet: WalletState | null;
  ownedPassports: RegisteredPlantPassport[];
  handleOpenBurnModal: (p: RegisteredPlantPassport) => void;
}

export const Web3OwnedPassportsSection: React.FC<Web3OwnedPassportsSectionProps> = ({
  isEn,
  wallet,
  ownedPassports,
  handleOpenBurnModal
}) => {
  if (!wallet?.isConnected || ownedPassports.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 pt-6 border-t border-forest-100 dark:border-forest-800 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-forest-950 dark:text-white font-serif">
              {isEn ? `Your Owned Plant Passports (${ownedPassports.length})` : `Hộ Chiếu Cây Bạn Đang Sở Hữu (${ownedPassports.length})`}
            </h4>
            <p className="text-[11px] text-forest-500">
              {isEn ? 'Direct on-chain management: burn to release exclusivity lock or view on explorer' : 'Quản lý on-chain trực tiếp: đốt bỏ để giải phóng khóa độc bản hoặc đổi ảnh mới'}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ownedPassports.map((p) => (
          <div
            key={p.id || p.token_id}
            className="p-4 rounded-2xl bg-white dark:bg-forest-950/70 border border-forest-200 dark:border-forest-800 shadow-md hover:shadow-lg transition space-y-3"
          >
            <div className="flex gap-3 items-center">
              <img
                src={p.image_url}
                alt={p.plant_name}
                className="w-16 h-16 rounded-xl object-cover border border-forest-200 dark:border-forest-700 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    Token #{p.token_id}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 font-semibold">
                    {p.network || 'Sepolia'}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-forest-950 dark:text-white truncate mt-0.5">
                  {p.plant_name}
                </h5>
                <p className="text-[11px] italic text-forest-500 truncate">
                  {p.scientific_name}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-forest-100 dark:border-forest-800/80 flex items-center justify-between gap-2">
              <span className="text-[10px] text-forest-400">
                {isEn ? 'Exclusivity active' : 'Đang giữ độc bản'}
              </span>
              <button
                type="button"
                onClick={() => handleOpenBurnModal(p)}
                className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/80 border border-rose-300 dark:border-rose-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Flame className="w-3.5 h-3.5 text-rose-600" />
                <span>{isEn ? 'Burn & Reincarnate' : '🔥 Đốt Bỏ & Tái Sinh Ảnh Mới'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
