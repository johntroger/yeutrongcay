import React, { useState } from 'react';
import { Flame, AlertTriangle, Check, RefreshCw, X, ShieldAlert, ExternalLink } from 'lucide-react';
import { RegisteredPlantPassport, plantPassportRegistryService } from '../services/plantPassportRegistryService.ts';
import { web3WalletService } from '../services/web3WalletService.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { awardKarmaPoints } from '../services/karmaService.ts';

interface BurnPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  passport: RegisteredPlantPassport | null;
  connectedWalletAddress?: string;
  chainId?: string;
  onBurnSuccess: (burnedPassport: RegisteredPlantPassport, txHash: string) => void;
}

export const BurnPassportModal: React.FC<BurnPassportModalProps> = ({
  isOpen,
  onClose,
  passport,
  connectedWalletAddress,
  chainId,
  onBurnSuccess
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [burnReason, setBurnReason] = useState<string>('Không ưng ý ảnh hiện tại, đốt bỏ để chụp lại ảnh mới đẹp hơn');
  const [isBurning, setIsBurning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successTxHash, setSuccessTxHash] = useState<string | null>(null);

  if (!isOpen || !passport) return null;

  const cleanConnected = (connectedWalletAddress || '').toLowerCase().trim();
  const cleanOwner = (passport.owner_address || passport.creator_wallet || '').toLowerCase().trim();
  const isOwner = cleanConnected && cleanOwner && cleanConnected === cleanOwner;

  const handleConfirmBurn = async () => {
    setErrorMessage(null);

    // KIỂM TRA BẢO MẬT TUYỆT ĐỐI: CHỈ CHỦ SỞ HỮU MỚI ĐƯỢC QUYỀN ĐỐT
    if (!isOwner) {
      setErrorMessage(
        isEn
          ? `Security violation: Only the verified owner (${cleanOwner.slice(0, 6)}...${cleanOwner.slice(-4)}) has the right to burn this NFT!`
          : `Vi phạm bảo mật: Bạn không phải là chủ sở hữu của NFT này! Chỉ ví sở hữu (${cleanOwner.slice(0, 6)}...${cleanOwner.slice(-4)}) mới có quyền đốt.`
      );
      return;
    }

    const numericTokenId = parseInt(passport.token_id.replace('#', '').trim(), 10);
    if (isNaN(numericTokenId)) {
      setErrorMessage(isEn ? 'Invalid Token ID' : 'Mã Token ID không hợp lệ');
      return;
    }

    setIsBurning(true);

    try {
      // 1. Gửi transaction ON-CHAIN THẬT lên Testnet qua ví Web3 của người dùng
      const txHash = await web3WalletService.burnPassportOnChain({
        tokenId: numericTokenId,
        userAddress: cleanConnected as `0x${string}`,
        contractAddress: (passport.contract_address as `0x${string}`) || undefined,
        chainId: chainId
      });

      setSuccessTxHash(txHash);

      // 2. Cập nhật Sổ Đăng Ký Độc Bản Off-chain & Firestore
      const res = plantPassportRegistryService.burnPassport({
        tokenId: passport.token_id,
        callerWalletAddress: cleanConnected,
        txHash: txHash,
        reason: burnReason
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      // 3. Khích lệ tinh thần làm đẹp dữ liệu vườn cây (+5 Trái Tim)
      awardKarmaPoints(
        5,
        `Hóa vàng Hộ Chiếu #${passport.token_id} (${passport.plant_name}) để tái sinh ảnh mới`,
        `Burned Passport #${passport.token_id} (${passport.plant_name}) for photographic rebirth`,
        { isTestnet: true, isEn, txHash }
      );

      // Chờ 1.5 giây để người dùng thấy thông báo thành công rồi chuyển hướng
      setTimeout(() => {
        setIsBurning(false);
        onBurnSuccess(res.burnedPassport!, txHash);
      }, 1500);

    } catch (err: unknown) {
      const e = err as { message?: string };
      setErrorMessage(e.message || (isEn ? 'Burn transaction failed or was rejected' : 'Giao dịch đốt NFT bị từ chối hoặc thất bại'));
      setIsBurning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-lg w-full border border-rose-300 dark:border-rose-900 shadow-2xl overflow-hidden flex flex-col space-y-4 p-6">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100 dark:border-rose-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-inner">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-forest-950 dark:text-white font-serif">
                {isEn ? 'Burn & Reincarnate Botanical NFT' : 'Hóa Vàng & Tái Sinh Hộ Chiếu NFT'}
              </h3>
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                {isEn ? 'Strict Security: Only Owner Has Burn Right' : 'Bảo mật: Chỉ người sở hữu mới được quyền đốt'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isBurning}
            className="p-1.5 rounded-xl text-forest-400 hover:text-forest-700 dark:hover:text-white hover:bg-forest-50 dark:hover:bg-forest-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thông tin Hộ Chiếu đang chuẩn bị đốt */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-forest-50/50 dark:bg-forest-950/50 border border-forest-100 dark:border-forest-800">
          <img
            src={passport.image_url}
            alt={passport.plant_name}
            className="w-16 h-16 rounded-xl object-cover border border-forest-200 dark:border-forest-700 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Token #{passport.token_id}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {passport.network}
              </span>
            </div>
            <h4 className="text-sm font-bold text-forest-950 dark:text-white truncate mt-0.5">
              {passport.plant_name}
            </h4>
            <p className="text-[11px] text-forest-500 italic truncate">
              {passport.scientific_name}
            </p>
          </div>
        </div>

        {/* Cảnh báo Bảo mật Quyền Sở Hữu */}
        {!isOwner ? (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{isEn ? 'Access Denied: Not the NFT Owner' : 'Từ Chối Quyền Truy Cập: Không Phải Chủ Sở Hữu'}</span>
            </div>
            <p className="text-xs leading-relaxed">
              {isEn
                ? `You cannot burn this NFT. Only the verified wallet address that owns this token (${cleanOwner.slice(0, 6)}...${cleanOwner.slice(-4)}) has the authority to burn it.`
                : `Bạn không thể đốt NFT này. Quy tắc bất di bất dịch của Yêu Trồng Cây: Chỉ có địa chỉ ví đang sở hữu (${cleanOwner.slice(0, 6)}...${cleanOwner.slice(-4)}) mới có quyền thiêu hủy Hộ Chiếu.`}
            </p>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{isEn ? 'Reincarnation Mechanism' : 'Cơ Chế Tái Sinh & Giải Phóng Khóa Độc Bản'}</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[11px] text-amber-900/90 dark:text-amber-200/90 leading-relaxed">
              <li>
                <strong>Tiêu hủy vĩnh viễn:</strong> Hộ Chiếu cũ <code>#{passport.token_id}</code> sẽ được gửi về địa chỉ <code>0x000...000</code> trên blockchain Testnet.
              </li>
              <li>
                <strong>Ân hạn độc quyền 24 giờ:</strong> Khóa độc bản của loài <em>{passport.plant_name}</em> sẽ được giải phóng và <strong>ưu tiên dành riêng cho ví của bạn</strong> trong 24h để đúc lại ảnh mới.
              </li>
              <li>
                <strong>Không mất điểm:</strong> Bạn không bị trừ Trái Tim ❤️, được cộng nhẹ <strong>+5 Trái Tim</strong> khích lệ tinh thần làm đẹp vườn cây số.
              </li>
            </ul>
          </div>
        )}

        {/* Form Nhập Lý Do Đốt */}
        {isOwner && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-forest-900 dark:text-white flex items-center justify-between">
              <span>{isEn ? 'Reason for Burning:' : 'Lý do Hóa Vàng / Đổi ảnh:'}</span>
              <span className="text-[10px] text-forest-500">{isEn ? 'Saved in Burn Ledger' : 'Lưu vào sổ cái lịch sử'}</span>
            </label>
            <textarea
              rows={2}
              value={burnReason}
              onChange={(e) => setBurnReason(e.target.value)}
              placeholder="VD: Cây đã lớn ra hoa đẹp hơn; hoặc ảnh cũ bị mờ muốn chụp lại góc nghệ thuật..."
              className="w-full px-3.5 py-2 rounded-xl text-xs bg-forest-50/50 dark:bg-charcoal-950 border border-forest-200 dark:border-forest-800 text-forest-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        )}

        {/* Thông báo lỗi nếu có */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-400 text-rose-900 dark:text-rose-200 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Thông báo thành công */}
        {successTxHash && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-400 text-emerald-900 dark:text-emerald-200 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isEn ? 'NFT successfully burned on-chain! Redirecting...' : 'Hóa vàng on-chain thành công! Đang chuyển sang màn hình đúc lại...'}</span>
            </div>
            <a
              href={web3WalletService.getExplorerTxUrl(successTxHash, chainId || null)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1 font-mono shrink-0"
            >
              <span>Explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={isBurning}
            className="px-4 py-2 rounded-xl text-xs font-bold text-forest-700 dark:text-forest-300 hover:bg-forest-100 dark:hover:bg-forest-900 transition"
          >
            {isEn ? 'Cancel' : 'Hủy Bỏ'}
          </button>

          <button
            onClick={handleConfirmBurn}
            disabled={!isOwner || isBurning}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-600/20 transition cursor-pointer"
          >
            {isBurning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Flame className="w-4 h-4" />
            )}
            <span>
              {isBurning
                ? (isEn ? 'Executing On-chain Burn...' : 'Đang Đốt On-chain...')
                : (isEn ? 'Confirm On-chain Burn (0đ Gas)' : 'Xác Nhận Đốt On-Chain (0đ Gas)')}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
