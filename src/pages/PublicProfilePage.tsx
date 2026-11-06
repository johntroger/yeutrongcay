import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Layers,
  Leaf,
  Printer,
  ArrowRight,
  Eye,
  UserCheck
} from 'lucide-react';
import { plantPassportRegistryService, RegisteredPlantPassport } from '../services/plantPassportRegistryService';
import { UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../utils/useSEO';

const RESERVED_ROUTES = [
  'thao-duoc',
  'cay-an-trai',
  'cay-canh',
  'danh-muc',
  'cay',
  'vuon-cua-toi',
  'trao-doi-cay',
  'bac-si-cay-trong',
  'kiem-tien-tu-vuon',
  'web3-sandbox',
  'lien-he',
  'lich-nong-vu',
  'admin'
];

interface PublicProfilePageProps {
  currentUser?: UserProfile | null;
}

export const PublicProfilePage: React.FC<PublicProfilePageProps> = ({ currentUser }) => {
  const { username } = useParams<{ username: string }>();
  const { isEn } = useLanguage();
  const cleanHandle = (username || '').replace(/^@/, '').toLowerCase().trim();

  // Nếu trùng với các route hệ thống có sẵn -> Chuyển hướng
  if (RESERVED_ROUTES.includes(cleanHandle)) {
    return <Navigate to="/" replace />;
  }

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSha, setCopiedSha] = useState<string | null>(null);
  const [selectedPassport, setSelectedPassport] = useState<RegisteredPlantPassport | null>(null);
  const [passports, setPassports] = useState<RegisteredPlantPassport[]>([]);

  // Tải danh bạ NFT độc bản của người dùng này
  useEffect(() => {
    const list = plantPassportRegistryService.getUserVerifiedGalleryByUsername(cleanHandle);
    setPassports(list);

    const handleUpdate = () => {
      const updated = plantPassportRegistryService.getUserVerifiedGalleryByUsername(cleanHandle);
      setPassports(updated);
    };

    window.addEventListener('ytc_passport_registry_updated', handleUpdate);
    return () => {
      window.removeEventListener('ytc_passport_registry_updated', handleUpdate);
    };
  }, [cleanHandle]);

  // Kiểm tra xem người đang xem có phải là chủ nhân hồ sơ này không
  const myUsername = currentUser?.email
    ? currentUser.email.split('@')[0].toLowerCase()
    : 'tranthanhtung37';
  const isMe = cleanHandle === myUsername || currentUser?.id === cleanHandle;

  // Tên hiển thị người dùng
  const displayName = cleanHandle === 'tranthanhtung37'
    ? 'Trần Thanh Tùng'
    : (currentUser && isMe ? currentUser.name : cleanHandle);

  const displayEmail = cleanHandle === 'tranthanhtung37'
    ? 'tranthanhtung37@gmail.com'
    : (currentUser && isMe ? currentUser.email : `${cleanHandle}@yeutrongcay.com`);

  const publicUrl = `https://yeutrongcay.com/${cleanHandle}`;

  useSEO({
    title: isEn
      ? `${displayName} (@${cleanHandle}) | Botanical NFT Heritage | Yeu Trong Cay`
      : `Hồ Sơ Nhà Vườn ${displayName} (@${cleanHandle}) | Bộ Sưu Tập NFT Cây Độc Bản`,
    description: isEn
      ? `Explore verified living botanical NFT plant passports and urban garden legacy of @${cleanHandle} on Yeu Trong Cay.`
      : `Khám phá hồ sơ nhà vườn và bộ sưu tập Hộ Chiếu Cây Trồng Số NFT độc bản on-chain của @${cleanHandle} trên Yêu Trồng Cây.`
  });

  const handleCopyProfileUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySha = (sha: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedSha(sha);
    setTimeout(() => setCopiedSha(null), 2000);
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-charcoal-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Hồ Sơ Người Dùng (User Profile Banner) */}
        <div className="bg-gradient-to-br from-forest-900 via-forest-950 to-charcoal-900 rounded-3xl p-6 sm:p-10 border border-amber-500/30 text-white shadow-2xl relative overflow-hidden">
          {/* Glow nền sang trọng */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar Nhà Vườn */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 p-1 border-2 border-amber-400 shadow-xl flex items-center justify-center overflow-hidden">
                <span className="font-serif font-black text-3xl sm:text-4xl text-white">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-forest-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Web3 VIP</span>
              </div>
            </div>

            {/* Thông tin nhà vườn */}
            <div className="flex-1 text-center md:text-left space-y-2.5">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {displayName}
                </h1>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Nhà Vườn Độc Bản Xác Thực</span>
                </span>
                {isMe && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300 text-[10px] font-bold border border-amber-500/50">
                    Hồ sơ của bạn
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 text-xs text-forest-300 font-mono flex-wrap">
                <span>@{cleanHandle}</span>
                <span>•</span>
                <span>{displayEmail}</span>
                <span>•</span>
                <span className="text-amber-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sở hữu {passports.length} Hộ Chiếu Cây Độc Bản</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-forest-200/90 max-w-2xl leading-relaxed pt-1">
                {isEn
                  ? 'Welcome to my public botanical space! Here you will find all living plant specimens uniquely registered under my digital ownership on the Ethereum & Base blockchain.'
                  : 'Chào mừng bạn đến với vườn thực vật số công khai của tôi! Toàn bộ các giống cây bên dưới đều được cấp Hộ Chiếu Thực Vật Số độc bản duy nhất trên sổ cái blockchain, gắn liền với bảo chứng mật mã học và cam kết sinh thái bền vững.'}
              </p>

              {/* Hộp URL Hồ Sơ Công Khai Định Danh Theo Email */}
              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-forest-950/80 border border-forest-700/80 text-xs font-mono text-gray-300 shadow-inner">
                  <span className="text-gray-500">URL Hồ Sơ:</span>
                  <span className="text-amber-300 font-bold">{publicUrl}</span>
                </div>

                <button
                  onClick={handleCopyProfileUrl}
                  className="px-3.5 py-1.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-forest-950 text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer"
                  title="Sao chép liên kết hồ sơ này để chia sẻ"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-forest-950" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Đã sao chép link!' : 'Sao chép URL'}</span>
                </button>

                {isMe && (
                  <Link
                    to="/vuon-cua-toi"
                    className="px-3.5 py-1.5 rounded-2xl bg-forest-800 hover:bg-forest-700 text-white text-xs font-bold transition flex items-center gap-1.5 border border-forest-600 shadow-md"
                  >
                    <Leaf className="w-3.5 h-3.5 text-herbal-400" />
                    <span>Quản lý Vườn của tôi</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Thanh thống kê nhanh */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-forest-800/80">
            <div className="bg-forest-950/60 p-3 rounded-2xl border border-forest-800">
              <span className="text-[11px] text-gray-400 block">Cây Độc Bản Sở Hữu</span>
              <span className="text-2xl font-bold font-serif text-amber-300">{passports.length}</span>
            </div>
            <div className="bg-forest-950/60 p-3 rounded-2xl border border-forest-800">
              <span className="text-[11px] text-gray-400 block">Sổ Cái Xác Thực</span>
              <span className="text-xs font-semibold text-emerald-300">Ethereum Sepolia (0x05c5...)</span>
            </div>
            <div className="bg-forest-950/60 p-3 rounded-2xl border border-forest-800">
              <span className="text-[11px] text-gray-400 block">Quy Chuẩn Smart Contract</span>
              <span className="text-xs font-semibold text-white">ERC-721 OpenZeppelin</span>
            </div>
            <div className="bg-forest-950/60 p-3 rounded-2xl border border-forest-800">
              <span className="text-[11px] text-gray-400 block">Quy Tắc Độc Quyền</span>
              <span className="text-xs font-semibold text-teal-300">Không Cho Phép Đúc Lại</span>
            </div>
          </div>
        </div>

        {/* 2. Banner Quy Tắc Độc Bản Toàn Thế Giới Yêu Trồng Cây */}
        <div className="p-4 rounded-3xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 flex items-start gap-3 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 dark:text-amber-200/90 space-y-1">
            <span className="font-bold block text-sm">
              Tuyên ngôn Độc Bản Công Khai:
            </span>
            <p>
              Tất cả các giống cây trong bộ sưu tập này đã được cấp Hộ Chiếu Số độc quyền cho nhà vườn{' '}
              <strong>@{cleanHandle}</strong>. Trong thế giới của <strong>yeutrongcay.com</strong>, bất kỳ ai khác cố tình đúc lại giống cây hoặc mã ảnh này đều bị hệ thống tự động loại bỏ và không được phép hiển thị trên hồ sơ cá nhân.
            </p>
          </div>
        </div>

        {/* 3. Lưới Trưng Bày Gallery Công Khai (Public Living Botanical NFT Gallery) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-forest-950 dark:text-cream-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Bộ Sưu Tập Hộ Chiếu Thực Vật Số Độc Bản ({passports.length})</span>
            </h2>
            <span className="text-xs text-gray-500 font-mono">
              Hiển thị công khai cho mọi người xem
            </span>
          </div>

          {passports.length === 0 ? (
            <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-12 text-center border border-forest-100 dark:border-forest-800 space-y-4 shadow-sm">
              <Leaf className="w-12 h-12 text-forest-400 mx-auto animate-bounce" />
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-base font-bold text-forest-900 dark:text-white">
                  Chưa có Hộ Chiếu Cây nào được công bố
                </h3>
                <p className="text-xs text-gray-500">
                  Nhà vườn này chưa đúc Hộ Chiếu Số hoặc các bản ghi đang trong quá trình đồng bộ hóa on-chain.
                </p>
              </div>
              <Link
                to="/web3-sandbox"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold shadow-md transition"
              >
                <span>Khám phá Vườn Ươm Web3</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
                    className="bg-white dark:bg-charcoal-900 rounded-3xl border border-forest-100 dark:border-forest-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    {/* Ảnh cây thực tế */}
                    <div className="relative aspect-4/3 w-full bg-forest-950 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.plant_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Huy hiệu Token ID & Độc Bản */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-xl bg-forest-950/85 backdrop-blur-md text-amber-300 font-mono font-bold text-xs border border-amber-500/40 shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>#{item.token_id}</span>
                        </span>
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-950/85 backdrop-blur-md text-emerald-300 font-semibold text-[10px] border border-emerald-500/40 shadow-sm flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Độc Bản Gốc</span>
                        </span>
                      </div>

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
                          <h3 className="font-serif font-bold text-base sm:text-lg text-forest-900 dark:text-cream-100 line-clamp-1">
                            {item.plant_name}
                          </h3>
                          <p className="text-xs italic text-forest-500 dark:text-forest-400">
                            {item.scientific_name}
                          </p>
                        </div>

                        {/* Thanh đo sinh trưởng */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">Giai đoạn phát triển:</span>
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

                        {/* Mã băm SHA-256 */}
                        <div className="p-2.5 rounded-xl bg-forest-50 dark:bg-charcoal-800/80 border border-forest-100 dark:border-forest-700/60 text-[11px] space-y-1">
                          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1 font-mono">
                              <Layers className="w-3 h-3 text-emerald-500" />
                              <span>Mã SHA-256 Bất Biến:</span>
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

                      {/* Các nút khám phá & Kiểm tra on-chain */}
                      <div className="pt-2 border-t border-forest-100 dark:border-forest-800/80 space-y-2">
                        {/* NÚT XEM TRỰC TIẾP TRÊN BLOCKSCOUT */}
                        <a
                          href={blockscoutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                          title="Xem trực tiếp hình ảnh, metadata và thuộc tính cây trên Blockscout Explorer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Xem Ảnh & Metadata Trên Blockscout</span>
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
                            <span>Thẻ Cây</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Lời Mời Trải Nghiệm Cho Khách Tham Quan */}
        <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-serif font-bold text-forest-900 dark:text-cream-100">
              Bạn cũng muốn xây dựng khu vườn số và đúc Hộ Chiếu Cây Độc Bản?
            </h3>
            <p className="text-xs text-forest-600 dark:text-forest-400">
              Nhận ngay URL hồ sơ độc quyền mang tên bạn trên yeutrongcay.com và đúc cây miễn phí 0đ gas trên mạng thử nghiệm.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/web3-sandbox"
              className="px-5 py-2.5 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Đúc Hộ Chiếu 0đ Gas</span>
            </Link>
          </div>
        </div>

        {/* Modal Thẻ Cây & Hộ Chiếu */}
        {selectedPassport && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-md w-full p-6 border border-amber-500/40 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800">
                <span className="font-bold text-sm text-forest-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Hộ Chiếu Cây Trồng Số #{selectedPassport.token_id}</span>
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
                <div>Chủ nhân: <span className="text-emerald-500">{selectedPassport.creator_username ? `@${selectedPassport.creator_username}` : selectedPassport.owner_address}</span></div>
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
    </div>
  );
};
