import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
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
  UserCheck,
  Edit3,
  Lock,
  AlertTriangle,
  MapPin,
  X,
  Upload,
  Flame
} from 'lucide-react';
import {
  plantPassportRegistryService,
  RegisteredPlantPassport,
  UserPublicProfileConfig
} from '../services/plantPassportRegistryService';
import { UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useSEO } from '../utils/useSEO';
import { getNftClassConfig, inferNftClassFromPassport } from '../config/ecosystemRegistry';
import { web3WalletService } from '../services/web3WalletService';
import { BurnPassportModal } from '../components/BurnPassportModal';

const RESERVED_ROUTES = [
  'thao-duoc',
  'cay-an-trai',
  'cay-canh',
  'khong-gian-xanh',
  'thiet-ke-khong-gian',
  'sang-che-tai-che',
  'tai-che',
  'am-thuc-duoc-thien',
  'duoc-thien',
  'vuon-quoc-gia',
  'rung-viet-nam',
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
  const navigate = useNavigate();
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
  const [isBurnModalOpen, setIsBurnModalOpen] = useState(false);
  const [passportToBurn, setPassportToBurn] = useState<RegisteredPlantPassport | null>(null);
  const currentWallet = web3WalletService.getSavedWallet();
  const [profileConfig, setProfileConfig] = useState<UserPublicProfileConfig>(() =>
    plantPassportRegistryService.getPublicProfile(cleanHandle)
  );
  const [selectedClassTab, setSelectedClassTab] = useState<string>('all');

  const classCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: passports.length,
      botanical: 0,
      space_method: 0,
      eco_invention: 0,
      culinary_recipe: 0,
      geo_forest_10000m2: 0,
      forestAreaM2: 0
    };
    passports.forEach(p => {
      const cls = p.nft_class || inferNftClassFromPassport(p);
      if (counts[cls] !== undefined) {
        counts[cls]++;
        if (cls === 'geo_forest_10000m2') {
          counts.forestAreaM2 += 10000;
        }
      }
    });
    return counts;
  }, [passports]);

  const filteredPassports = useMemo(() => {
    if (selectedClassTab === 'all') return passports;
    return passports.filter(p => (p.nft_class || inferNftClassFromPassport(p)) === selectedClassTab);
  }, [passports, selectedClassTab]);

  // Modal chỉnh sửa hồ sơ 1 lần duy nhất
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editCustomHandle, setEditCustomHandle] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editSpecialtyTag, setEditSpecialtyTag] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editAvatarUrl, setEditAvatarUrl] = useState('');
  const [hasConfirmedOneTimeRule, setHasConfirmedOneTimeRule] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [editSuccessNotice, setEditSuccessNotice] = useState<string | null>(null);

  // Tải danh bạ NFT độc bản & cấu hình hồ sơ của người dùng này
  useEffect(() => {
    const refreshAll = () => {
      setPassports(plantPassportRegistryService.getUserVerifiedGalleryByUsername(cleanHandle));
      setProfileConfig(plantPassportRegistryService.getPublicProfile(cleanHandle));
    };

    refreshAll();
    plantPassportRegistryService.syncWithCloud().then(refreshAll).catch(() => {});
    plantPassportRegistryService.syncPublicProfileFromCloud(cleanHandle).then(refreshAll).catch(() => {});

    window.addEventListener('ytc_passport_registry_updated', refreshAll);
    window.addEventListener('ytc_public_profile_updated', refreshAll);
    return () => {
      window.removeEventListener('ytc_passport_registry_updated', refreshAll);
      window.removeEventListener('ytc_public_profile_updated', refreshAll);
    };
  }, [cleanHandle]);

  // Kiểm tra xem người đang xem có phải là chủ nhân hồ sơ này không
  const myUsername = currentUser?.email
    ? currentUser.email.split('@')[0].toLowerCase().replace(/[^a-z0-9_-]/g, '')
    : 'tranthanhtung37';
  const isMe =
    cleanHandle === myUsername ||
    profileConfig.original_handle === myUsername ||
    profileConfig.custom_handle === myUsername ||
    currentUser?.id === cleanHandle;

  const effectiveHandle = profileConfig.custom_handle || cleanHandle;
  const displayName = profileConfig.display_name || (currentUser && isMe ? currentUser.name : effectiveHandle);
  const publicUrl = `https://yeutrongcay.com/${effectiveHandle}`;

  const handleOpenEditModal = () => {
    setEditDisplayName(displayName);
    setEditCustomHandle(effectiveHandle);
    setEditLocation(profileConfig.location || 'TP. Hồ Chí Minh');
    setEditSpecialtyTag(profileConfig.specialty_tag || 'Nhà Vườn Độc Bản Xác Thực');
    setEditBio(profileConfig.bio);
    setEditAvatarUrl(profileConfig.avatar_url || '');
    setHasConfirmedOneTimeRule(false);
    setEditError(null);
    setIsEditModalOpen(true);
  };

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setEditError(isEn ? 'Avatar image must be under 2MB' : 'Ảnh đại diện tối đa 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setEditAvatarUrl(ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveOneTimeProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);

    if (!hasConfirmedOneTimeRule) {
      setEditError(
        isEn
          ? 'Please check the confirmation box acknowledging that you can only edit your profile ONCE.'
          : 'Vui lòng tích vào ô xác nhận bạn đã hiểu quy tắc chỉ được sửa hồ sơ duy nhất 1 lần!'
      );
      return;
    }

    const res = plantPassportRegistryService.saveOneTimeProfileEdit(
      profileConfig.original_handle || cleanHandle,
      {
        custom_handle: editCustomHandle,
        display_name: editDisplayName,
        bio: editBio,
        location: editLocation,
        specialty_tag: editSpecialtyTag,
        avatar_url: editAvatarUrl
      },
      RESERVED_ROUTES
    );

    if (!res.success || !res.profile) {
      setEditError(res.error || 'Không thể lưu thông tin hồ sơ');
      return;
    }

    setProfileConfig(res.profile);
    setIsEditModalOpen(false);
    setEditSuccessNotice(
      isEn
        ? 'Your profile has been permanently updated and locked (1/1 one-time edit used).'
        : 'Đã cập nhật hồ sơ cá nhân thành công! Lượt chỉnh sửa duy nhất (1/1) của bạn đã được sử dụng và khóa bảo mật.'
    );

    if (res.profile.custom_handle !== cleanHandle) {
      navigate(`/${res.profile.custom_handle}`, { replace: true });
    }
  };

  useSEO({
    title: isEn
      ? `${displayName} (@${effectiveHandle}) | Botanical NFT Heritage | Yeu Trong Cay`
      : `Hồ Sơ Nhà Vườn ${displayName} (@${effectiveHandle}) | Bộ Sưu Tập NFT Cây Độc Bản`,
    description: isEn
      ? `Explore verified living botanical NFT plant passports and urban garden legacy of @${effectiveHandle} on Yeu Trong Cay.`
      : `Khám phá hồ sơ nhà vườn và bộ sưu tập Hộ Chiếu Cây Trồng Số NFT độc bản on-chain của @${effectiveHandle} trên Yêu Trồng Cây.`
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

        {/* Thông báo sau khi lưu chỉnh sửa 1 lần duy nhất */}
        {editSuccessNotice && (
          <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2.5">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{editSuccessNotice}</span>
            </div>
            <button
              onClick={() => setEditSuccessNotice(null)}
              className="text-emerald-300 hover:text-white font-bold px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* 1. Header Hồ Sơ Người Dùng (User Profile Banner) */}
        <div className="bg-gradient-to-br from-forest-900 via-forest-950 to-charcoal-900 rounded-3xl p-6 sm:p-10 border border-amber-500/30 text-white shadow-2xl relative overflow-hidden">
          {/* Glow nền sang trọng */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar Nhà Vườn */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 p-1 border-2 border-amber-400 shadow-xl flex items-center justify-center overflow-hidden">
                {profileConfig.avatar_url ? (
                  <img
                    src={profileConfig.avatar_url}
                    alt={displayName}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <span className="font-serif font-black text-3xl sm:text-4xl text-white">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-forest-950 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Web3 VIP</span>
              </div>
            </div>

            {/* Thông tin nhà vườn (Đã ẩn hoàn toàn địa chỉ Email để bảo mật) */}
            <div className="flex-1 text-center md:text-left space-y-2.5">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {displayName}
                </h1>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{profileConfig.specialty_tag || 'Nhà Vườn Độc Bản Xác Thực'}</span>
                </span>
                {isMe && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300 text-[10px] font-bold border border-amber-500/50">
                    Hồ sơ của bạn
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center md:justify-start gap-3 text-xs text-forest-300 font-mono flex-wrap">
                <span className="font-bold text-emerald-300">@{effectiveHandle}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-forest-200 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{profileConfig.location || 'Việt Nam'}</span>
                </span>
                <span>•</span>
                <span className="text-amber-300 flex items-center gap-1 font-sans font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sở hữu {passports.length} Hộ Chiếu Cây Độc Bản</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-forest-400 font-sans">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Email đã ẩn bảo mật</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-forest-200/90 max-w-2xl leading-relaxed pt-1">
                {profileConfig.bio}
              </p>

              {/* Hộp URL Hồ Sơ Công Khai & Nút Sửa Hồ Sơ (1 Lần Duy Nhất) */}
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

                {isMe && !profileConfig.has_edited_once && (
                  <button
                    type="button"
                    onClick={handleOpenEditModal}
                    className="px-3.5 py-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 border border-emerald-400/50 shadow-md cursor-pointer"
                    title="Chỉnh sửa thông tin hồ sơ cá nhân (Chỉ được sửa duy nhất 1 lần)"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Chỉnh sửa hồ sơ (Còn 1/1 lượt)</span>
                  </button>
                )}

                {isMe && profileConfig.has_edited_once && (
                  <span
                    className="px-3.5 py-1.5 rounded-2xl bg-forest-950/90 text-forest-300 text-xs font-semibold flex items-center gap-1.5 border border-forest-700"
                    title={`Bạn đã sử dụng 1/1 lượt chỉnh sửa duy nhất vào lúc ${profileConfig.edited_at || ''}`}
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Đã dùng 1/1 lượt sửa hồ sơ</span>
                  </span>
                )}

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

          {/* Thanh thống kê nhanh 5 lớp tài sản */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-forest-800/80">
            <div className="bg-forest-950/60 p-3 rounded-2xl border border-forest-800">
              <span className="text-[11px] text-gray-400 block">Tổng Tài Sản NFT</span>
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
              <span className="text-[11px] text-gray-400 block">Quy Tắc Độc Bản</span>
              <span className="text-xs font-semibold text-teal-300">Chống Đúc Lại Tuyệt Đối</span>
            </div>
          </div>

          {/* Huy hiệu chi tiết theo 5 lớp NFT */}
          <div className="mt-4 pt-3 border-t border-forest-800/40 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-forest-400 text-[11px]">Phân bổ bộ sưu tập:</span>
            <span className="px-2.5 py-1 rounded-xl bg-forest-950/80 border border-emerald-500/30 text-emerald-300 font-medium">
              🌱 {classCounts.botanical} Thực vật
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-forest-950/80 border border-teal-500/30 text-teal-300 font-medium">
              📐 {classCounts.space_method} Không gian
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-forest-950/80 border border-lime-500/30 text-lime-300 font-medium">
              ♻️ {classCounts.eco_invention} Sáng chế
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-forest-950/80 border border-amber-500/30 text-amber-300 font-medium">
              🍵 {classCounts.culinary_recipe} Bí phương
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-forest-950/80 border border-emerald-400/30 text-emerald-200 font-medium">
              🌲 {classCounts.geo_forest_10000m2} Lô Rừng ({classCounts.forestAreaM2.toLocaleString('vi-VN')} m² ~ {(classCounts.forestAreaM2 / 10000).toLocaleString('vi-VN')} ha)
            </span>
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
              Tất cả các tài sản trong bộ sưu tập này đã được cấp Hộ Chiếu Số độc quyền cho nhà vườn{' '}
              <strong>@{effectiveHandle}</strong>. Trong thế giới của <strong>yeutrongcay.com</strong>, bất kỳ ai khác cố tình đúc lại giống cây hoặc mã ảnh này đều bị hệ thống tự động loại bỏ và không được phép hiển thị trên hồ sơ cá nhân. Riêng các Lô Rừng Sinh Thái (10.000 m²/lô) được bảo trợ theo toạ độ thực địa.
            </p>
          </div>
        </div>

        {/* 3. Lưới Trưng Bày Gallery Công Khai (Public Living Botanical NFT Gallery) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-forest-950 dark:text-cream-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Bộ Sưu Tập NFT Độc Bản ({passports.length})</span>
              </h2>
              <span className="text-xs text-gray-500 font-mono">
                Hiển thị công khai cho mọi người xem • Phân loại 5 lớp tài sản
              </span>
            </div>

            {/* 5-Tab Quick Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
              <button
                onClick={() => setSelectedClassTab('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedClassTab === 'all'
                    ? 'bg-forest-900 text-white dark:bg-amber-500 dark:text-forest-950 shadow'
                    : 'bg-white dark:bg-charcoal-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
                }`}
              >
                Tất cả ({passports.length})
              </button>
              <button
                onClick={() => setSelectedClassTab('botanical')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedClassTab === 'botanical'
                    ? 'bg-forest-900 text-white dark:bg-amber-500 dark:text-forest-950 shadow'
                    : 'bg-white dark:bg-charcoal-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
                }`}
              >
                🌱 Thực Vật ({classCounts.botanical})
              </button>
              <button
                onClick={() => setSelectedClassTab('space_method')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedClassTab === 'space_method'
                    ? 'bg-forest-900 text-white dark:bg-amber-500 dark:text-forest-950 shadow'
                    : 'bg-white dark:bg-charcoal-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
                }`}
              >
                📐 Không Gian ({classCounts.space_method})
              </button>
              <button
                onClick={() => setSelectedClassTab('eco_invention')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedClassTab === 'eco_invention'
                    ? 'bg-forest-900 text-white dark:bg-amber-500 dark:text-forest-950 shadow'
                    : 'bg-white dark:bg-charcoal-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
                }`}
              >
                ♻️ Sáng Chế ({classCounts.eco_invention})
              </button>
              <button
                onClick={() => setSelectedClassTab('culinary_recipe')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedClassTab === 'culinary_recipe'
                    ? 'bg-forest-900 text-white dark:bg-amber-500 dark:text-forest-950 shadow'
                    : 'bg-white dark:bg-charcoal-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
                }`}
              >
                🍵 Bí Phương ({classCounts.culinary_recipe})
              </button>
              <button
                onClick={() => setSelectedClassTab('geo_forest_10000m2')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedClassTab === 'geo_forest_10000m2'
                    ? 'bg-forest-900 text-white dark:bg-amber-500 dark:text-forest-950 shadow'
                    : 'bg-white dark:bg-charcoal-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
                }`}
              >
                🌲 Lô Rừng ({classCounts.geo_forest_10000m2})
              </button>
            </div>
          </div>

          {filteredPassports.length === 0 ? (
            <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-12 text-center border border-forest-100 dark:border-forest-800 space-y-4 shadow-sm">
              <Leaf className="w-12 h-12 text-forest-400 mx-auto animate-bounce" />
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-base font-bold text-forest-900 dark:text-white">
                  {selectedClassTab === 'all'
                    ? 'Chưa có Hộ Chiếu NFT nào được công bố'
                    : 'Chưa có tài sản nào thuộc nhóm này'}
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
              {filteredPassports.map((item) => {
                const nftClass = item.nft_class || inferNftClassFromPassport(item);
                const classConfig = getNftClassConfig(nftClass);
                const stageLabel = classConfig.evolutionStages[(item.evolution_stage || 1) - 1] || 'Giai đoạn 1';

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
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 rounded-xl bg-forest-950/85 backdrop-blur-md text-amber-300 font-mono font-bold text-xs border border-amber-500/40 shadow-sm flex items-center gap-1">
                          <span>{classConfig.icon}</span>
                          <span>#{item.token_id}</span>
                        </span>
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-950/85 backdrop-blur-md text-emerald-300 font-semibold text-[10px] border border-emerald-500/40 shadow-sm flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>{nftClass === 'geo_forest_10000m2' ? `Lô Rừng #${item.lot_number || item.token_id}` : 'Độc Bản Gốc'}</span>
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
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 pb-0.5">
                            <span>{classConfig.icon}</span>
                            <span>{classConfig.name}</span>
                          </div>
                          <h3 className="font-serif font-bold text-base sm:text-lg text-forest-900 dark:text-cream-100 line-clamp-1">
                            {item.plant_name}
                          </h3>
                          <p className="text-xs italic text-forest-500 dark:text-forest-400">
                            {item.scientific_name}
                          </p>
                        </div>

                        {/* Thanh đo sinh trưởng / tiến trình theo lớp NFT */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-500 dark:text-gray-400 font-medium">Tiến trình {classConfig.shortName}:</span>
                            <span className="font-bold text-amber-600 dark:text-amber-400">
                              {item.evolution_stage}/3 - {stageLabel}
                            </span>
                          </div>
                          <div className="w-full bg-forest-100 dark:bg-charcoal-700 h-2 rounded-full overflow-hidden flex gap-0.5">
                            <div className={`h-full flex-1 rounded-full ${item.evolution_stage >= 1 ? 'bg-emerald-500' : 'bg-transparent'}`} />
                            <div className={`h-full flex-1 rounded-full ${item.evolution_stage >= 2 ? 'bg-teal-500' : 'bg-transparent'}`} />
                            <div className={`h-full flex-1 rounded-full ${item.evolution_stage >= 3 ? 'bg-amber-500' : 'bg-transparent'}`} />
                          </div>
                          {nftClass === 'geo_forest_10000m2' && (
                            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1 pt-0.5">
                              <span>🌲 10.000 m² (1 ha) bảo tồn sinh thái</span>
                            </div>
                          )}
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
                          title="Xem trực tiếp hình ảnh, metadata và thuộc tính trên Blockscout Explorer"
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
                            <span>Chứng Nhận</span>
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
        {selectedPassport && (() => {
          const selClass = selectedPassport.nft_class || inferNftClassFromPassport(selectedPassport);
          const selConfig = getNftClassConfig(selClass);
          const selStageLabel = selConfig.evolutionStages[(selectedPassport.evolution_stage || 1) - 1] || 'Giai đoạn 1';

          return (
            <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-md w-full p-6 border border-amber-500/40 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800">
                  <span className="font-bold text-sm text-forest-900 dark:text-white flex items-center gap-1.5">
                    <span>{selConfig.icon}</span>
                    <span>{selConfig.certificateTitle} #{selectedPassport.token_id}</span>
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
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {selConfig.name}
                    </span>
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
                  <div>Tiến trình: <span className="text-teal-400">{selectedPassport.evolution_stage}/3 ({selStageLabel})</span></div>
                  {selClass === 'geo_forest_10000m2' && (
                    <div>Quy mô: <span className="text-emerald-400 font-bold">10.000 m² (1 ha) • Lô #{selectedPassport.lot_number || selectedPassport.token_id}</span></div>
                  )}
                  <div className="truncate">SHA-256: {selectedPassport.image_sha256}</div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In Chứng Nhận Số</span>
                  </button>

                  {/* CHỈ HIỂN THỊ NÚT ĐỐT KHI VÍ KẾT NỐI LÀ CHỦ SỞ HỮU */}
                  {currentWallet?.address && selectedPassport.owner_address && currentWallet.address.toLowerCase() === selectedPassport.owner_address.toLowerCase() && (
                    <button
                      onClick={() => {
                        setPassportToBurn(selectedPassport);
                        setIsBurnModalOpen(true);
                      }}
                      className="py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer hover:bg-rose-100"
                    >
                      <Flame className="w-3.5 h-3.5 text-rose-600" />
                      <span>Đốt & Tái Sinh</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedPassport(null)}
                    className="py-2 px-4 rounded-xl bg-gray-200 dark:bg-charcoal-700 text-gray-800 dark:text-gray-200 text-xs font-bold transition cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Modal Chỉnh Sửa Thông Tin Hồ Sơ Cá Nhân (Thiết kế gọn vừa màn hình, chỉ sửa duy nhất 1 lần) */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4">
            <form
              onSubmit={handleSaveOneTimeProfile}
              className="bg-white dark:bg-charcoal-900 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col border-2 border-amber-500/50 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
            >
              {/* Header cố định */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-forest-100 dark:border-forest-800 shrink-0 bg-forest-50/40 dark:bg-charcoal-950/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-forest-950 dark:text-white leading-tight">
                      {isEn ? 'Edit Personal Profile (One-Time Only)' : 'Chỉnh Sửa Hồ Sơ Cá Nhân (1 Lần Duy Nhất)'}
                    </h3>
                    <p className="text-[11px] text-forest-600 dark:text-forest-400">
                      {isEn ? 'Email is hidden for your privacy' : 'Địa chỉ email đã được ẩn hoàn toàn để bảo mật'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-forest-100/80 dark:bg-charcoal-800 hover:bg-forest-200 flex items-center justify-center text-gray-500 hover:text-gray-800 dark:hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nội dung Form gọn gàng vừa khít màn hình */}
              <div className="px-4 sm:px-6 py-3.5 overflow-y-auto space-y-3 text-xs flex-1">
                {/* HỘP CẢNH BÁO QUAN TRỌNG: CHỈ ĐƯỢC SỬA DUY NHẤT 1 LẦN */}
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-400 dark:border-amber-500/80 text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-amber-900 dark:text-amber-300">
                      {isEn
                        ? 'WARNING: YOU CAN ONLY EDIT THIS PROFILE ONCE (1/1)'
                        : 'CẢNH BÁO: BẠN CHỈ ĐƯỢC SỬA HỒ SƠ DUY NHẤT 1 LẦN (1/1)'}
                    </div>
                    <p className="text-[11px] leading-snug text-amber-900/90 dark:text-amber-200/90">
                      {isEn
                        ? 'Each gardener can customize their profile ONLY ONCE. After you save, your profile details will be permanently locked. Please check carefully!'
                        : 'Mỗi tài khoản chỉ được phép chỉnh sửa thông tin hồ sơ ĐÚNG 1 LẦN DUY NHẤT. Sau khi bấm Lưu, quyền chỉnh sửa sẽ khóa vĩnh viễn. Vui lòng kiểm tra kỹ trước khi tự quyết định!'}
                    </p>
                  </div>
                </div>

                {editError && (
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/70 border border-red-300 dark:border-red-800 text-xs text-red-700 dark:text-red-200 font-medium">
                    {editError}
                  </div>
                )}

                {/* Hàng 1: Tên hiển thị + Mã định danh URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                      {isEn ? '1. Gardener Display Name *' : '1. Tên hiển thị Nhà Vườn *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={editDisplayName}
                      onChange={(e) => setEditDisplayName(e.target.value)}
                      placeholder="VD: Trần Thanh Tùng"
                      className="w-full px-3 py-2 rounded-xl bg-forest-50/70 dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-950 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                      {isEn ? '2. Profile Handle (@username) *' : '2. Mã định danh URL (@username) *'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-mono font-bold">@</span>
                      <input
                        type="text"
                        required
                        value={editCustomHandle}
                        onChange={(e) => setEditCustomHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                        placeholder="tranthanhtung37"
                        className="w-full pl-7 pr-3 py-2 rounded-xl bg-forest-50/70 dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-950 dark:text-emerald-300 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Hàng 2: Khu vực + Danh hiệu + Ảnh đại diện nằm chung 1 hàng gọn gàng */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-4">
                    <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                      {isEn ? '3. Location / City' : '3. Khu vực / Thành phố'}
                    </label>
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      placeholder="VD: TP. Hồ Chí Minh"
                      className="w-full px-3 py-2 rounded-xl bg-forest-50/70 dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                      {isEn ? '4. Gardener Title' : '4. Danh hiệu Nhà Vườn'}
                    </label>
                    <input
                      type="text"
                      value={editSpecialtyTag}
                      onChange={(e) => setEditSpecialtyTag(e.target.value)}
                      placeholder="VD: Nhà Vườn Độc Bản"
                      className="w-full px-3 py-2 rounded-xl bg-forest-50/70 dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                      {isEn ? '5. Avatar (Optional)' : '5. Ảnh đại diện'}
                    </label>
                    <div className="flex items-center gap-2">
                      {editAvatarUrl ? (
                        <img
                          src={editAvatarUrl}
                          alt="Avatar"
                          className="w-9 h-9 rounded-xl object-cover border border-amber-400 shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-serif font-bold flex items-center justify-center text-sm shrink-0">
                          {(editDisplayName || 'U').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <label className="flex-1 px-2.5 py-2 rounded-xl bg-forest-100 dark:bg-charcoal-800 hover:bg-forest-200 text-forest-900 dark:text-cream-100 font-semibold cursor-pointer flex items-center justify-center gap-1 border border-forest-200 dark:border-forest-700 transition truncate">
                        <Upload className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{isEn ? 'Upload' : 'Tải ảnh'}</span>
                        <input type="file" accept="image/*" onChange={handleAvatarFileUpload} className="hidden" />
                      </label>
                      {editAvatarUrl && (
                        <button
                          type="button"
                          onClick={() => setEditAvatarUrl('')}
                          className="text-red-500 hover:underline font-semibold text-[11px]"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hàng 3: Lời giới thiệu (2 dòng gọn) */}
                <div>
                  <label className="block font-bold text-forest-900 dark:text-cream-100 mb-1">
                    {isEn ? '6. Garden Bio & Introduction' : '6. Lời giới thiệu khu vườn cá nhân'}
                  </label>
                  <textarea
                    rows={2}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Giới thiệu đôi nét về khu vườn và bộ sưu tập cây trồng của bạn..."
                    className="w-full px-3 py-2 rounded-xl bg-forest-50/70 dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-snug resize-none"
                  />
                </div>

                {/* Hàng 4: Hộp kiểm xác nhận tự quyết định sửa 1 lần duy nhất */}
                <label className="p-2.5 rounded-xl bg-forest-50 dark:bg-charcoal-800/90 border border-forest-200 dark:border-forest-700 flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasConfirmedOneTimeRule}
                    onChange={(e) => setHasConfirmedOneTimeRule(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-emerald-600 rounded cursor-pointer shrink-0"
                  />
                  <span className="text-[11px] sm:text-xs text-forest-900 dark:text-cream-100 leading-snug font-medium">
                    {isEn
                      ? 'I have verified all information above and understand that I can only edit my personal profile ONCE (1/1).'
                      : 'Tôi đã kiểm tra kỹ thông tin trên và đồng ý tự quyết định sử dụng lượt chỉnh sửa hồ sơ DUY NHẤT (1/1). Tôi hiểu sau khi lưu sẽ không thể sửa lại lần thứ hai.'}
                  </span>
                </label>
              </div>

              {/* Footer cố định luôn hiển thị nút Hủy & Lưu */}
              <div className="flex items-center justify-end gap-2.5 px-4 sm:px-6 py-3 border-t border-forest-100 dark:border-forest-800 bg-forest-50/40 dark:bg-charcoal-950/40 shrink-0 text-xs">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-charcoal-800 hover:bg-gray-200 text-gray-700 dark:text-gray-200 font-bold transition cursor-pointer"
                >
                  {isEn ? 'Cancel (Keep 1/1 Edit)' : 'Hủy (Giữ lại lượt sửa)'}
                </button>
                <button
                  type="submit"
                  disabled={!hasConfirmedOneTimeRule}
                  className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {isEn ? 'Confirm & Lock Profile (1/1)' : 'Xác Nhận Lưu & Khóa Lượt Sửa (1/1)'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal Đốt Bỏ & Tái Sinh Hộ Chiếu Thực Vật Số */}
        <BurnPassportModal
          isOpen={isBurnModalOpen}
          onClose={() => setIsBurnModalOpen(false)}
          passport={passportToBurn}
          connectedWalletAddress={currentWallet?.address}
          chainId={currentWallet?.chainId}
          onBurnSuccess={(burned) => {
            setIsBurnModalOpen(false);
            setSelectedPassport(null);
            navigate(`/web3-sandbox?mint=${encodeURIComponent(burned.plant_name)}`);
          }}
        />

      </div>
    </div>
  );
};
