import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Layers,
  Copy,
  Check,
  Printer,
  PlusCircle,
  AlertOctagon,
  Eye
} from 'lucide-react';
import { plantPassportRegistryService, RegisteredPlantPassport } from '../services/plantPassportRegistryService';
import { web3WalletService, WalletState } from '../services/web3WalletService';

interface BotanicalNftGalleryProps {
  currentUserId?: string;
  userEmail?: string;
  isEn?: boolean;
  onNavigateToMint?: () => void;
}

export const BotanicalNftGallery: React.FC<BotanicalNftGalleryProps> = ({
  currentUserId = 'usr-local-me',
  userEmail,
  isEn = false,
  onNavigateToMint
}) => {
  const [wallet, setWallet] = useState<WalletState | null>(() => web3WalletService.getSavedWallet());
  const [passports, setPassports] = useState<RegisteredPlantPassport[]>([]);
  const [copiedSha, setCopiedSha] = useState<string | null>(null);
  const [selectedPassport, setSelectedPassport] = useState<RegisteredPlantPassport | null>(null);
  const [isSyncingWallet, setIsSyncingWallet] = useState<boolean>(false);

  // Tải danh bạ NFT độc bản của người dùng đăng nhập hiện tại
  const loadGallery = () => {
    const list = plantPassportRegistryService.getUserVerifiedGallery(wallet?.address, currentUserId, userEmail);
    setPassports(list);
  };

  useEffect(() => {
    loadGallery();
    plantPassportRegistryService.syncWithCloud().then(() => loadGallery()).catch(() => {});

    const handleRegistryUpdate = () => {
      loadGallery();
    };

    window.addEventListener('ytc_passport_registry_updated', handleRegistryUpdate);
    return () => {
      window.removeEventListener('ytc_passport_registry_updated', handleRegistryUpdate);
    };
  }, [wallet?.address, currentUserId, userEmail]);

  // Đồng bộ lại ví MetaMask thật
  const handleConnectOrSyncWallet = async () => {
    setIsSyncingWallet(true);
    try {
      const state = await web3WalletService.connectRealWallet();
      setWallet(state);
      const updatedList = plantPassportRegistryService.getUserVerifiedGallery(state.address, currentUserId, userEmail);
      setPassports(updatedList);
    } catch {
      // Handle silently
    } finally {
      setIsSyncingWallet(false);
    }
  };

  const handleCopySha = (sha: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedSha(sha);
    setTimeout(() => setCopiedSha(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Triển Lãm & Trạng Thái Độc Bản */}
      <div className="bg-gradient-to-br from-forest-900 via-forest-950 to-charcoal-900 rounded-3xl p-6 sm:p-8 border border-amber-500/30 text-white shadow-xl relative overflow-hidden">
        {/* Glow hiệu ứng nền */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isEn ? 'Exclusive Living Botanical NFT Gallery' : 'Bộ Sưu Tập Hộ Chiếu Cây Trồng Số Độc Bản'}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isEn ? '100% Unique Protection' : 'Bảo Vệ Độc Bản Tuyệt Đối'}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
              {isEn ? 'Your Cryptographic Plant Heritages' : 'Gia Tài Thực Vật Số Của Bạn'}
            </h2>

            <p className="text-xs sm:text-sm text-forest-200/90 leading-relaxed">
              {isEn
                ? 'Each plant passport in this gallery represents a unique, non-duplicable botanical specimen secured by on-chain smart contracts and SHA-256 genetic hashing. Duplicates from other users are strictly rejected and hidden.'
                : 'Mỗi hộ chiếu cây trong bộ sưu tập này là một thực thể độc bản duy nhất, được bảo chứng bằng Smart Contract ERC-721 và mã băm SHA-256. Bất kỳ cây nào bị đúc trùng lặp sẽ bị hệ thống loại bỏ khỏi hồ sơ cá nhân.'}
            </p>
          </div>

          {/* Cụm hành động: Kết nối ví + Đúc cây mới */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {wallet?.isConnected ? (
              <div className="px-3.5 py-2 rounded-2xl bg-forest-950/80 border border-emerald-500/40 text-xs space-y-0.5 shadow-inner">
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Ví MetaMask liên kết:</span>
                </div>
                <div className="font-mono font-bold text-emerald-300">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </div>
              </div>
            ) : (
              <button
                onClick={handleConnectOrSyncWallet}
                disabled={isSyncingWallet}
                className="px-4 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 border border-forest-600 shadow-md cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isSyncingWallet ? 'Đang kết nối...' : 'Kết nối ví MetaMask'}</span>
              </button>
            )}

            {onNavigateToMint && (
              <button
                onClick={onNavigateToMint}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-forest-950 text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isEn ? 'Mint New Unique Plant' : 'Đúc Hộ Chiếu Cây Mới'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-forest-800/80">
          <div className="bg-forest-950/60 p-3 rounded-2xl border border-forest-800">
            <span className="text-[11px] text-gray-400 block">{isEn ? 'Verified Passports' : 'Cây Độc Bản Đã Đúc'}</span>
            <span className="text-xl font-bold font-serif text-amber-300">{passports.length}</span>
          </div>
          <div className="bg-forest-950/60 p-3 rounded-2xl border border-forest-800">
            <span className="text-[11px] text-gray-400 block">{isEn ? 'On-chain Ledger' : 'Sổ Cái Blockchain'}</span>
            <span className="text-xs font-semibold text-emerald-300">Sepolia / Base</span>
          </div>
          <div className="bg-forest-950/60 p-3 rounded-2xl border border-forest-800">
            <span className="text-[11px] text-gray-400 block">{isEn ? 'Standard' : 'Chuẩn Smart Contract'}</span>
            <span className="text-xs font-semibold text-white">ERC-721 OpenZeppelin</span>
          </div>
          <div className="bg-forest-950/60 p-3 rounded-2xl border border-forest-800">
            <span className="text-[11px] text-gray-400 block">{isEn ? 'Anti-Duplication' : 'Chống Trùng Lặp'}</span>
            <span className="text-xs font-semibold text-teal-300">Bật (Active Shield)</span>
          </div>
        </div>
      </div>

      {/* 2. Banner Quy Tắc Độc Bản Tuyệt Đối (Exclusivity Rule) */}
      <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
        <AlertOctagon className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200/90 space-y-1">
          <span className="font-bold block text-sm">
            {isEn ? 'Exclusivity Shield Activated' : 'Luật Độc Bản trong thế giới Yêu Trồng Cây:'}
          </span>
          <p>
            {isEn
              ? 'In the world of yeutrongcay.com, each plant variety or cryptographic image fingerprint can only have ONE true master passport. Any duplicate attempt will be automatically hidden from personal profiles to guarantee your ownership prestige.'
              : 'Trong thế giới yeutrongcay.com, mỗi giống cây trồng và mã định danh hình ảnh chỉ có DUY NHẤT một Hộ Chiếu Số gốc. Nếu người khác cố tình đúc lại, hệ thống sẽ tự động gắn cờ Trùng Lặp và KHÔNG CHO HIỂN THỊ trong hồ sơ cá nhân để bảo vệ sự độc bản và uy tín của bạn.'}
          </p>
        </div>
      </div>

      {/* 3. Danh Sách Thẻ Hộ Chiếu Cây (Card Grid) */}
      {passports.length === 0 ? (
        <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-10 border border-forest-100 dark:border-forest-800 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-forest-900 dark:text-cream-100">
              {isEn ? 'No Plant Passports Minted Yet' : 'Chưa có Hộ Chiếu Cây nào trong bộ sưu tập'}
            </h3>
            <p className="text-xs text-forest-600 dark:text-forest-400">
              {isEn
                ? 'Mint your first plant passport with your MetaMask wallet on testnet (0đ gas) to establish your botanical ownership.'
                : 'Hãy dùng ví MetaMask đúc Hộ Chiếu Cây đầu tiên trên mạng thử nghiệm (0đ tiền thật) để ghi nhận quyền sở hữu độc bản của bạn.'}
            </p>
          </div>
          {onNavigateToMint && (
            <button
              onClick={onNavigateToMint}
              className="px-5 py-2.5 rounded-2xl bg-forest-900 dark:bg-forest-700 hover:bg-forest-950 text-white text-xs font-bold transition inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'Go to Minting Sandbox' : 'Đến Vườn Ươm Đúc Hộ Chiếu (Miễn phí)'}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passports.map((item) => {
            const blockscoutUrl = item.network.includes('Base')
              ? `https://base-sepolia.blockscout.com/token/${item.contract_address}/instance/${item.token_id}`
              : `https://eth-sepolia.blockscout.com/token/${item.contract_address}/instance/${item.token_id}`;

            const etherscanUrl = item.network.includes('Base')
              ? `https://sepolia.basescan.org/tx/${item.transaction_hash}`
              : `https://sepolia.etherscan.io/tx/${item.transaction_hash}`;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-charcoal-900 rounded-3xl border border-forest-100 dark:border-forest-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Phần hình ảnh cây thực tế */}
                <div className="relative aspect-4/3 w-full bg-forest-950 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.plant_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Badge Token ID & Status */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-xl bg-forest-950/85 backdrop-blur-md text-amber-300 font-mono font-bold text-xs border border-amber-500/40 shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>#{item.token_id}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-950/85 backdrop-blur-md text-emerald-300 font-semibold text-[10px] border border-emerald-500/40 shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{isEn ? 'Master Original' : 'Độc Bản Gốc'}</span>
                    </span>
                  </div>

                  {/* Badge Sổ Cái Mạng */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-xl bg-forest-950/90 backdrop-blur-md text-white font-medium text-[10px] border border-forest-700 shadow-sm">
                      {item.network}
                    </span>
                  </div>
                </div>

                {/* Nội dung chi tiết */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-forest-900 dark:text-cream-100 line-clamp-1">
                        {item.plant_name}
                      </h4>
                      <p className="text-xs italic text-forest-500 dark:text-forest-400">
                        {item.scientific_name}
                      </p>
                    </div>

                    {/* Tiến trình sinh trưởng 3 giai đoạn */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Giai đoạn sinh học:</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          {item.evolution_stage === 1 && '1/3 - Mầm Non'}
                          {item.evolution_stage === 2 && '2/3 - Sinh Trưởng Thân Lá'}
                          {item.evolution_stage === 3 && '3/3 - Ra Hoa Kết Trái'}
                        </span>
                      </div>
                      <div className="w-full bg-forest-100 dark:bg-charcoal-700 h-2 rounded-full overflow-hidden flex gap-0.5">
                        <div className={`h-full flex-1 rounded-full ${item.evolution_stage >= 1 ? 'bg-emerald-500' : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 rounded-full ${item.evolution_stage >= 2 ? 'bg-teal-500' : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 rounded-full ${item.evolution_stage >= 3 ? 'bg-amber-500' : 'bg-transparent'}`} />
                      </div>
                    </div>

                    {/* Bằng chứng mật mã học SHA-256 */}
                    <div className="p-2.5 rounded-xl bg-forest-50 dark:bg-charcoal-800/80 border border-forest-100 dark:border-forest-700/60 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1 font-mono">
                          <Layers className="w-3 h-3 text-emerald-500" />
                          <span>Mã SHA-256 Ảnh Cây:</span>
                        </span>
                        <button
                          onClick={() => handleCopySha(item.image_sha256)}
                          className="hover:text-forest-900 dark:hover:text-white transition flex items-center gap-1 cursor-pointer"
                          title="Sao chép mã SHA-256"
                        >
                          {copiedSha === item.image_sha256 ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <div className="font-mono text-forest-700 dark:text-cream-200 truncate">
                        {item.image_sha256}
                      </div>
                    </div>
                  </div>

                  {/* Các nút liên kết & Xem ảnh trực tiếp */}
                  <div className="pt-2 border-t border-forest-100 dark:border-forest-800/80 space-y-2">
                    {/* NÚT QUAN TRỌNG: XEM TRỰC TIẾP TRÊN BLOCKSCOUT */}
                    <a
                      href={blockscoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                      title="Xem trực tiếp hình ảnh, metadata và thuộc tính cây trên Blockscout Explorer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isEn ? 'View Live on Blockscout' : 'Xem Ảnh & Metadata Trên Blockscout'}</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                    </a>

                    <div className="flex items-center gap-2">
                      <a
                        href={etherscanUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-2.5 rounded-xl bg-forest-100 dark:bg-charcoal-800 hover:bg-forest-200 dark:hover:bg-charcoal-700 text-forest-800 dark:text-forest-200 text-[11px] font-medium transition flex items-center justify-center gap-1 border border-forest-200 dark:border-forest-700"
                      >
                        <span>Etherscan</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>

                      <button
                        onClick={() => setSelectedPassport(item)}
                        className="flex-1 py-1.5 px-2.5 rounded-xl bg-forest-100 dark:bg-charcoal-800 hover:bg-forest-200 dark:hover:bg-charcoal-700 text-forest-800 dark:text-forest-200 text-[11px] font-medium transition flex items-center justify-center gap-1 border border-forest-200 dark:border-forest-700 cursor-pointer"
                      >
                        <Printer className="w-2.5 h-2.5" />
                        <span>{isEn ? 'Tag Card' : 'Thẻ Cây'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Xem Chi Tiết Thẻ Cây & In Hộ Chiếu */}
      {selectedPassport && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-md w-full p-6 border border-amber-500/40 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800">
              <span className="font-bold text-sm text-forest-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Hộ Chiếu Thực Vật Số #{selectedPassport.token_id}</span>
              </span>
              <button
                onClick={() => setSelectedPassport(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xs font-bold"
              >
                ✕ Đóng
              </button>
            </div>

            <div className="text-center space-y-3">
              <img
                src={selectedPassport.image_url}
                alt={selectedPassport.plant_name}
                className="w-48 h-48 mx-auto rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
              />
              <div>
                <h4 className="font-serif font-bold text-lg text-forest-900 dark:text-cream-100">
                  {selectedPassport.plant_name}
                </h4>
                <p className="text-xs italic text-forest-600 dark:text-forest-400">
                  {selectedPassport.scientific_name}
                </p>
              </div>
            </div>

            <div className="bg-forest-50 dark:bg-charcoal-800 p-3 rounded-2xl text-xs space-y-1 font-mono text-gray-600 dark:text-gray-300">
              <div>Chủ nhân: <span className="text-emerald-500">{selectedPassport.owner_address}</span></div>
              <div>Sổ cái: <span className="text-amber-500">{selectedPassport.network}</span></div>
              <div>Giai đoạn: <span className="text-teal-400">{selectedPassport.evolution_stage}/3</span></div>
              <div className="truncate">SHA-256: {selectedPassport.image_sha256}</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In Thẻ Cây</span>
              </button>
              <button
                onClick={() => setSelectedPassport(null)}
                className="py-2 px-4 rounded-xl bg-gray-200 dark:bg-charcoal-700 text-gray-800 dark:text-gray-200 text-xs font-bold transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
