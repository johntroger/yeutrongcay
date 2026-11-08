import React, { useState, useRef } from 'react';
import {
  MapPin,
  Search,
  ShieldCheck,
  Plus,
  X,
  AlertTriangle,
  Heart,
  Sparkles,
  Info,
  Flag,
  Upload,
  Loader2,
  X as CloseIcon
} from 'lucide-react';
import { SwapOffer, SwapOfferType } from '../types/index.ts';
import { SEED_SWAP_OFFERS } from '../data/swapOffers.ts';
import { uploadPlantImage, getSwapOffers, submitSwapOffer } from '../services/apiService.ts';
import { checkCommunityModeration } from '../utils/moderation.ts';
import { applyWatermarkAndStripExif } from '../utils/watermark.ts';
import { ReportModal } from './ReportModal.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { InteractiveSwapMap } from './InteractiveSwapMap.tsx';

// Logo chính thức của website dùng làm ảnh mặc định khi người dùng không tải ảnh lên
const DEFAULT_SWAP_IMAGE = '/logo.jpg';

const normalizeSwapImage = (url?: string | null): string => {
  if (!url || url.trim() === '' || url.includes('photo-1544005313-94ddf0286df2')) {
    return DEFAULT_SWAP_IMAGE;
  }
  return url;
};

export const PlantSwapSection: React.FC = () => {
  const { t, isEn } = useLanguage();
  const [offers, setOffers] = useState<SwapOffer[]>(() => {
    try {
      localStorage.removeItem('ytc_swap_offers');
      localStorage.removeItem('ytc_swap_offers_v2');
      const saved = localStorage.getItem('ytc_user_swap_offers_v3');
      if (saved) {
        const userCreatedOffers = JSON.parse(saved)
          .filter((item: SwapOffer) => item.id.startsWith('usr-swap-'))
          .map((item: SwapOffer) => ({
            ...item,
            image_url: normalizeSwapImage(item.image_url),
          }));
        return [...userCreatedOffers, ...SEED_SWAP_OFFERS];
      }
    } catch {
      // Fallback
    }
    return SEED_SWAP_OFFERS;
  });

  // Tải danh sách tin trao đổi thời gian thực từ MySQL
  React.useEffect(() => {
    let isMounted = true;
    getSwapOffers().then(({ offers: liveOffers }) => {
      if (isMounted && liveOffers && liveOffers.length > 0) {
        const normalized = liveOffers.map((item) => ({
          ...item,
          image_url: normalizeSwapImage(item.image_url),
        }));
        setOffers(normalized);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const [selectedRegion, setSelectedRegion] = useState<'all' | 'north' | 'central' | 'south'>('all');
  const [selectedType, setSelectedType] = useState<'all' | SwapOfferType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal Đăng Tin Trao Đổi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlantName, setNewPlantName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRegion, setNewRegion] = useState<'north' | 'central' | 'south'>('north');
  const [newOfferType, setNewOfferType] = useState<SwapOfferType>('giveaway');
  const [newItemType, setNewItemType] = useState('Cành giâm khỏe rễ');
  const [newDescription, setNewDescription] = useState('');
  const [newContact, setNewContact] = useState('');
  const [pledgedQuarantine, setPledgedQuarantine] = useState(false);

  // Upload ảnh tin đăng
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Cảnh báo kiểm duyệt tự động Sách Đỏ / Loài xâm hại / Thuốc cấm
  const [moderationAlert, setModerationAlert] = useState<{
    title: string;
    reason: string;
    suggestion: string;
  } | null>(null);

  // Modal Báo Cáo Vi Phạm
  const [reportTarget, setReportTarget] = useState<{ id: string; title: string } | null>(null);

  // Lọc tin trao đổi
  // Nội dung cộng đồng đăng tải (tin tặng/đổi giống, ghi chú liên hệ) được giữ nguyên bản gốc theo yêu cầu người dùng
  const localizedOffers = offers;

  const filteredOffers = localizedOffers.filter((item) => {
    const matchRegion = selectedRegion === 'all' || item.region_zone === selectedRegion;
    const matchType = selectedType === 'all' || item.offer_type === selectedType;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      item.plant_name.toLowerCase().includes(q) ||
      item.location_name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);

    return matchRegion && matchType && matchSearch;
  });

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError(isEn ? 'Maximum image size is 5MB' : 'Dung lượng ảnh tối đa 5MB');
      return;
    }

    setUploadError(null);
    setIsUploadingImage(true);

    try {
      const watermarkedFile = await applyWatermarkAndStripExif(file, {
        authorName: isEn ? 'Plant Exchanger' : 'Chủ Vườn Trao Đổi',
        brandText: 'yeutrongcay.com'
      });

      const res = await uploadPlantImage(watermarkedFile);
      if (res.success && res.url) {
        setUploadedImageUrl(res.url);
      } else {
        setUploadError(res.error || (isEn ? 'Failed to upload image' : 'Lỗi khi tải ảnh lên máy chủ'));
      }
    } catch (err: any) {
      setUploadError(err.message || (isEn ? 'Image processing error' : 'Lỗi khi xử lý hình ảnh'));
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlantName.trim() || !newLocation.trim() || !newDescription.trim() || !newContact.trim()) return;

    const combinedInput = `${newPlantName} ${newLocation} ${newDescription} ${newItemType}`;
    const modCheck = checkCommunityModeration(combinedInput);
    if (modCheck.isBlocked) {
      setModerationAlert({
        title: isEn ? 'Biosecurity & Red Book Warning' : 'Cảnh Báo Sách Đỏ & Loài Cấm (H6, H15)',
        reason: modCheck.reason || (isEn ? 'Species restricted under conservation regulations.' : 'Loài thực vật thuộc danh mục bảo tồn cấm trao đổi hoặc xâm hại.'),
        suggestion: modCheck.suggestion || (isEn ? 'Please check our community guidelines.' : 'Vui lòng kiểm tra lại thông tin.')
      });
      return;
    }

    const finalImageUrl = uploadedImageUrl || DEFAULT_SWAP_IMAGE;

    const payload = {
      plant_name: newPlantName.trim(),
      scientific_name: isEn ? 'Homegrown Variety' : 'Giống nhà vườn bản địa',
      location_name: newLocation.trim(),
      region_zone: newRegion,
      offer_type: newOfferType,
      item_type: newItemType,
      description: newDescription.trim(),
      contact_note: newContact.trim(),
      quarantine_pledge: pledgedQuarantine,
      image_url: finalImageUrl,
      user_name: isEn ? 'You (Gardener)' : 'Bạn (Chủ Vườn)',
      user_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    };

    try {
      const res = await submitSwapOffer(payload);
      if (res.success && res.data) {
        setOffers((prev) => [{
          ...res.data!,
          image_url: normalizeSwapImage(res.data!.image_url)
        }, ...prev]);
      } else {
        const localNewOffer: SwapOffer = {
          id: `usr-swap-${Date.now()}`,
          user_id: 'usr-local-owner',
          user_name: isEn ? 'You (Gardener)' : 'Bạn (Chủ Vườn)',
          user_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          region_zone: newRegion,
          location_name: newLocation.trim(),
          plant_name: newPlantName.trim(),
          scientific_name: isEn ? 'Homegrown Variety' : 'Giống vườn nhà',
          offer_type: newOfferType,
          item_type: newItemType,
          description: newDescription.trim(),
          quarantine_pledge: pledgedQuarantine,
          image_url: finalImageUrl,
          status: 'visible',
          created_at: isEn ? 'Just now' : 'Vừa xong',
          contact_note: newContact.trim(),
        };

        const updated = [localNewOffer, ...offers];
        setOffers(updated);
        try {
          const userOnly = updated.filter((item) => item.id.startsWith('usr-swap-'));
          localStorage.setItem('ytc_user_swap_offers_v3', JSON.stringify(userOnly));
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.warn('Submit swap offer error:', err);
    } finally {
      setIsModalOpen(false);
      setNewPlantName('');
      setNewLocation('');
      setNewDescription('');
      setNewContact('');
      setPledgedQuarantine(false);
      setUploadedImageUrl(null);
    }
  };

  return (
    <section id="swap-map" className="py-12 bg-cream-100 dark:bg-charcoal-950 border-t border-forest-100 dark:border-forest-900 transition-colors">
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-xs font-semibold mb-2 border border-emerald-200 dark:border-emerald-800">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>{t('swap.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-forest-950 dark:text-cream-50 tracking-tight">
              {t('swap.title')}
            </h2>
            <p className="text-sm text-forest-800 dark:text-forest-200 mt-2 max-w-2xl leading-relaxed">
              {t('swap.description')}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-medium text-sm flex items-center gap-2 shadow-md transition self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4 text-herbal-400" />
            <span>{isEn ? '+ Post Plant / Seed Offer' : '+ Đăng Tin Tặng / Đổi Giống'}</span>
          </button>
        </div>

        {/* 7-Day Quarantine Guide Banner */}
        <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-5 sm:p-6 border border-herbal-200 dark:border-forest-800 shadow-xs mb-8 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-herbal-100 dark:bg-charcoal-800 text-herbal-700 dark:text-herbal-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-forest-950 dark:text-cream-50 flex items-center gap-2">
                <span>{isEn ? 'Golden Rule: 7-Day Plant Quarantine Protocol' : 'Cẩm Nang Vàng: Quy Tắc Cách Ly Cây Mới 7 Ngày'}</span>
                <span className="text-[11px] font-semibold bg-herbal-100 dark:bg-herbal-950/80 text-herbal-800 dark:text-herbal-300 px-2.5 py-0.5 rounded-full border border-herbal-200 dark:border-herbal-800">
                  {isEn ? 'Biosecurity' : 'Bảo vệ vườn nhà'}
                </span>
              </h4>
              <p className="text-xs sm:text-sm text-forest-800 dark:text-forest-200 mt-1 leading-relaxed">
                {isEn
                  ? 'Protect your home garden from fungal pathogens and pests: Isolate newly received cuttings for 7 days, inspect node joints, and apply organic bio-sprays before integrating into main garden areas.'
                  : 'Để bảo vệ cả ban công trước mầm bệnh nấm rệp tiềm ẩn: Giữ cây mới tách biệt 7 ngày, quan sát kẽ nách lá, phun sương phòng dịch tỏi ớt gừng sinh học trước khi hòa nhập vào vườn chính.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-terracotta-700 dark:text-terracotta-400 bg-terracotta-50 dark:bg-terracotta-950/50 px-3.5 py-2 rounded-xl border border-terracotta-200 dark:border-terracotta-800 shrink-0">
            <AlertTriangle className="w-4 h-4" />
            <span>{isEn ? 'Red Book Endangered Species Banned' : 'Cấm giao lưu loài cấm trong Sách Đỏ'}</span>
          </div>
        </div>

        {/* Bản Đồ Số Trực Quan Trạm Đổi Cây 3 Miền (MS7 - Leaflet) */}
        <div className="mb-8">
          <InteractiveSwapMap
            offers={offers}
            selectedRegion={selectedRegion}
            onSelectOffer={(id) => {
              const el = document.getElementById(`swap-offer-${id}`);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
          />
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-forest-100 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-forest-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isEn ? 'Search plant, cutting, seeds or district/city...' : 'Tìm giống cây, cành giâm, hạt giống hoặc quận/huyện...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-cream-50/70 border border-forest-100 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
              />
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: isEn ? 'All Regions' : 'Tất Cả Miền' },
                { id: 'north', label: isEn ? 'North' : 'Miền Bắc' },
                { id: 'central', label: isEn ? 'Central' : 'Miền Trung' },
                { id: 'south', label: isEn ? 'South' : 'Miền Nam' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegion(r.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
                    selectedRegion === r.id
                      ? 'bg-forest-900 text-white shadow-xs'
                      : 'bg-forest-50 text-forest-800 hover:bg-forest-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 pt-2 border-t border-forest-50 overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-forest-700 shrink-0">{isEn ? 'Listing Type:' : 'Loại Tin:'}</span>
            {[
              { id: 'all', label: isEn ? 'All' : 'Tất Cả' },
              { id: 'giveaway', label: isEn ? '🎁 Free Giveaway' : '🎁 Tặng Miễn Phí (0đ)' },
              { id: 'exchange', label: isEn ? '🔄 Plant Swap' : '🔄 Trao Đổi Cây' },
              { id: 'seek', label: isEn ? '🔍 Seeking Variety' : '🔍 Cần Tìm Giống' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition ${
                  selectedType === t.id
                    ? 'bg-herbal-600 text-white font-semibold'
                    : 'bg-white text-forest-800 hover:bg-forest-50 border border-forest-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => {
            const isLogo = !offer.image_url || offer.image_url.includes('logo.jpg') || offer.image_url.includes('logo-sharpened.png');
            return (
              <div
                key={offer.id}
                id={`swap-offer-${offer.id}`}
                className="bg-white dark:bg-charcoal-900 rounded-3xl overflow-hidden border border-forest-100 dark:border-forest-800 shadow-sm hover:shadow-md transition flex flex-col group scroll-mt-24"
              >
                {/* Image & Badges */}
                <div className={`relative aspect-[16/10] overflow-hidden ${
                  isLogo
                    ? 'bg-white flex items-center justify-center p-6 border-b border-forest-100 dark:border-forest-800'
                    : 'bg-forest-900'
                }`}>
                  <img
                    src={offer.image_url || DEFAULT_SWAP_IMAGE}
                    alt={offer.plant_name}
                    className={`w-full h-full transition duration-500 ${
                      isLogo
                        ? 'object-contain max-h-full max-w-full group-hover:scale-105'
                        : 'object-cover group-hover:scale-105'
                    }`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = DEFAULT_SWAP_IMAGE;
                      target.className = 'w-full h-full object-contain p-6 group-hover:scale-105 transition duration-500';
                      if (target.parentElement) {
                        target.parentElement.className = 'relative aspect-[16/10] bg-white overflow-hidden flex items-center justify-center border-b border-forest-100 dark:border-forest-800';
                      }
                    }}
                  />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs ${
                      offer.offer_type === 'giveaway'
                        ? 'bg-emerald-600 text-white'
                        : offer.offer_type === 'exchange'
                        ? 'bg-blue-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {offer.offer_type === 'giveaway'
                      ? (isEn ? '🎁 Free Giveaway' : '🎁 Tặng Miễn Phí')
                      : offer.offer_type === 'exchange'
                      ? (isEn ? '🔄 Direct Swap' : '🔄 Trao Đổi')
                      : (isEn ? '🔍 Looking For' : '🔍 Cần Tìm')}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-white backdrop-blur-xs">
                    {offer.item_type}
                  </span>
                </div>

                {/* Nút Báo Cáo Vi Phạm */}
                <button
                  type="button"
                  onClick={() => setReportTarget({ id: offer.id, title: `${offer.plant_name} (${offer.location_name})` })}
                  title={isEn ? 'Report listing' : 'Báo cáo tin vi phạm'}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-rose-600 text-white backdrop-blur-xs transition"
                >
                  <Flag className="w-3.5 h-3.5" />
                </button>

                {offer.quarantine_pledge && (
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-forest-900 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3 h-3 text-herbal-600" />
                    <span>{isEn ? '7-Day Quarantine Pledged' : 'Cam kết cách ly 7 ngày'}</span>
                  </div>
                )}
              </div>

              {/* Offer Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Location Tag */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-forest-700 dark:text-forest-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                    <span className="truncate">{offer.location_name}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-forest-950 dark:text-cream-50 mb-1 group-hover:text-herbal-700 dark:group-hover:text-herbal-400 transition">
                    {offer.plant_name}
                  </h3>

                  {offer.scientific_name && (
                    <p className="text-xs font-mono italic text-forest-600 dark:text-forest-400 mb-3">
                      {offer.scientific_name}
                    </p>
                  )}

                  <p className="text-xs text-forest-800 dark:text-forest-200 leading-relaxed mb-4 line-clamp-3">
                    {offer.description}
                  </p>
                </div>

                {/* Footer details & Action */}
                <div className="pt-4 border-t border-forest-50 dark:border-forest-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <img
                        src={offer.user_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={offer.user_name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-medium text-forest-900 dark:text-cream-100 truncate max-w-[130px]">
                        {offer.user_name}
                      </span>
                    </div>
                    <span>{offer.created_at}</span>
                  </div>

                  {offer.contact_note && (
                    <div className="text-[11px] text-forest-700 dark:text-forest-300 bg-forest-50/70 dark:bg-charcoal-800 px-3 py-1.5 rounded-xl border border-forest-100 dark:border-forest-800 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-herbal-600 dark:text-herbal-400 shrink-0" />
                      <span className="truncate">{offer.contact_note}</span>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      alert(isEn
                        ? `Connected with ${offer.user_name}!\nPickup details: ${offer.contact_note || 'Please arrange at ' + offer.location_name}`
                        : `Đã kết nối với ${offer.user_name}!\nChi tiết nhận giống: ${offer.contact_note || 'Vui lòng trao đổi tại địa chỉ ' + offer.location_name}`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>{isEn ? 'Receive Seeds / Contact Member' : 'Nhận Giống / Liên Hệ Trao Đổi'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-forest-100 p-8 max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-forest-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-forest-900 mb-1">
              {isEn ? 'No swap listings found in this area' : 'Chưa có tin trao đổi nào tại khu vực này'}
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              {isEn ? 'Be the first to share your indigenous green cuttings with neighbors!' : 'Hãy là người đầu tiên chia sẻ mầm xanh bản địa cho cộng đồng lân cận!'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-forest-900 text-white rounded-xl text-xs font-medium"
            >
              {isEn ? '+ Post Offer Now' : '+ Đăng Tin Ngay'}
            </button>
          </div>
        )}

      </div>

      {/* Modal Đăng Tin Trao Đổi */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-forest-100 p-6 relative my-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-forest-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-herbal-100 text-herbal-700 flex items-center justify-center font-bold">
                  🌱
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-forest-950">
                    {isEn ? 'Post Plant / Seed Offer' : 'Đăng Tin Tặng / Đổi Giống Cây'}
                  </h3>
                  <p className="text-xs text-forest-700">
                    {isEn ? 'Share vigorous seedlings safely with local community' : 'Chia sẻ mầm xanh an toàn cho cộng đồng'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-forest-50 hover:bg-forest-100 text-forest-800 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOffer} className="space-y-4 pt-4">
              
              {/* Plant Name */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  {isEn ? 'Plant / Seed / Cutting Variety Name *' : 'Tên Giống Cây / Cành Giâm / Hạt Giống *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? 'e.g., Indian Borage cuttings, Bitter gourd seeds, Guava seedling...' : 'Ví dụ: Cành Húng Chanh, Hạt Mướp Đắng Rừng, Bầu Ổi...'}
                  value={newPlantName}
                  onChange={(e) => setNewPlantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                />
              </div>

              {/* Offer Type & Item Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    {isEn ? 'Exchange format *' : 'Hình thức chia sẻ *'}
                  </label>
                  <select
                    value={newOfferType}
                    onChange={(e) => setNewOfferType(e.target.value as SwapOfferType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 bg-white"
                  >
                    <option value="giveaway">{isEn ? '🎁 Free Giveaway' : '🎁 Tặng Miễn Phí (0đ)'}</option>
                    <option value="exchange">{isEn ? '🔄 Plant Swap' : '🔄 Trao Đổi Cây Tương Đương'}</option>
                    <option value="seek">{isEn ? '🔍 Seeking Variety' : '🔍 Cần Tìm Giống Cây'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    {isEn ? 'Propagation format *' : 'Quy cách vật phẩm *'}
                  </label>
                  <select
                    value={newItemType}
                    onChange={(e) => setNewItemType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 bg-white"
                  >
                    <option value={isEn ? 'Vigorous rooted cuttings' : 'Cành giâm khỏe rễ'}>{isEn ? 'Rooted stem cuttings' : 'Cành giâm khỏe rễ'}</option>
                    <option value={isEn ? 'Potted young seedling' : 'Cây con bầu đất'}>{isEn ? 'Potted young seedling' : 'Cây con bầu đất'}</option>
                    <option value={isEn ? 'Sun-dried seeds' : 'Hạt giống sấy khô tự nhiên'}>{isEn ? 'Sun-dried seeds' : 'Hạt giống sấy khô tự nhiên'}</option>
                    <option value={isEn ? 'Bulb / Rhizome' : 'Củ / Rễ giống'}>{isEn ? 'Bulb / Rhizome' : 'Củ / Rễ giống'}</option>
                  </select>
                </div>
              </div>

              {/* Region & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    {isEn ? 'Geographic Region *' : 'Khu vực *'}
                  </label>
                  <select
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value as 'north' | 'central' | 'south')}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 bg-white"
                  >
                    <option value="north">{isEn ? 'Northern Region' : 'Hà Nội & Miền Bắc'}</option>
                    <option value="central">{isEn ? 'Central Region' : 'Đà Nẵng & Miền Trung'}</option>
                    <option value="south">{isEn ? 'Southern Region' : 'TP.HCM & Miền Nam'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    {isEn ? 'Pickup location (District, City) *' : 'Địa điểm nhận cây (Quận/Huyện, Tỉnh) *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={isEn ? 'e.g., Cau Giay, Hanoi' : 'Ví dụ: Q. Cầu Giấy, Hà Nội'}
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  {isEn ? 'Plant condition & exchange preferences *' : 'Mô tả tình trạng cây & điều kiện giao lưu *'}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={isEn ? 'Describe health of mother plant, height, quantity of cuttings...' : 'Mô tả cây mẹ khỏe mạnh, số lượng cành chia sẻ, thời gian giâm rễ...'}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                />
              </div>

              {/* Upload Ảnh */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  {isEn ? 'Actual Photo of Cuttings / Plant (Optional)' : 'Ảnh thực tế cành/cây (Tùy chọn)'}
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageFileChange}
                />

                {uploadedImageUrl ? (
                  <div className="relative rounded-2xl overflow-hidden border border-herbal-200 bg-herbal-50/50 p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={uploadedImageUrl}
                        alt="Uploaded plant"
                        className="w-12 h-12 object-cover rounded-xl border border-white shrink-0 shadow-xs"
                      />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-herbal-900 truncate">
                          {isEn ? 'Photo securely uploaded' : 'Ảnh đã tải lên an toàn'}
                        </p>
                        <p className="text-[10px] text-herbal-600">
                          {isEn ? 'GPS EXIF Stripped • WebP' : 'Đã tẩy sạch EXIF GPS • Chuẩn WebP'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedImageUrl(null)}
                      className="p-1.5 rounded-full hover:bg-white text-gray-500 hover:text-rose-600 transition"
                      title={t('common.cancel')}
                    >
                      <CloseIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border border-dashed rounded-xl p-3 text-center transition cursor-pointer ${
                        isUploadingImage
                          ? 'border-herbal-400 bg-herbal-50/30'
                          : 'border-forest-200 bg-white hover:border-herbal-500 hover:bg-forest-50/30'
                      }`}
                    >
                      {isUploadingImage ? (
                        <div className="flex items-center justify-center gap-2 text-herbal-700 py-1">
                          <Loader2 className="w-4 h-4 animate-spin text-herbal-600" />
                          <span className="text-xs font-semibold">{isEn ? 'Processing & stripping GPS EXIF...' : 'Đang xử lý & tẩy EXIF GPS...'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-forest-700 py-1">
                          <Upload className="w-4 h-4 text-forest-500" />
                          <span className="text-xs font-medium">
                            {isEn ? 'Upload plant photo (Auto-stripped GPS, Max 5MB)' : 'Tải ảnh cây (Tự động tẩy sạch GPS, Tối đa 5MB)'}
                          </span>
                        </div>
                      )}
                    </div>
                    {uploadError && (
                      <p className="text-[10px] text-rose-600 mt-1 font-medium">{uploadError}</p>
                    )}
                    <p className="text-[11px] text-forest-600 dark:text-forest-400 mt-1.5 flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      {isEn
                        ? 'If no photo is uploaded, website logo will be used as default.'
                        : 'Nếu không tải ảnh lên, hệ thống sẽ tự động dùng logo website Yêu Trồng Cây làm ảnh đại diện.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  {isEn ? 'Contact Arrangement (Messaging, Pickup Note) *' : 'Hình thức liên hệ hẹn nhận giống *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? 'e.g., Message in chat or pickup weekends after 5 PM' : 'Ví dụ: Nhắn tin qua Zalo vườn hoặc ghé lấy sau 17h chiều...'}
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                />
              </div>

              {/* 7-day quarantine pledge */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="quarantine_pledge"
                  required
                  checked={pledgedQuarantine}
                  onChange={(e) => setPledgedQuarantine(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 border-gray-300"
                />
                <label htmlFor="quarantine_pledge" className="text-xs text-emerald-950 leading-relaxed font-medium">
                  {isEn
                    ? 'I commit that this plant material is pest-free, vigorous, and complies with community biosecurity standards.'
                    : 'Tôi cam kết cây mẹ khỏe mạnh, không sâu bệnh lây nhiễm và tuân thủ quy tắc kiểm dịch an toàn sinh học.'}
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-forest-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-forest-800 hover:bg-forest-50 transition"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold shadow-md transition"
                >
                  {isEn ? 'Publish Offer Now' : 'Đăng Tin Ngay'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Modal Báo Cáo Vi Phạm */}
      {reportTarget && (
        <ReportModal
          isOpen={true}
          onClose={() => setReportTarget(null)}
          targetType="swap_offer"
          targetId={reportTarget.id}
          targetTitle={reportTarget.title}
        />
      )}

      {/* Cảnh Báo Kiểm Duyệt Sách Đỏ */}
      {moderationAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-rose-950 text-base">
                  {moderationAlert.title}
                </h3>
                <p className="text-xs text-rose-700">
                  {isEn ? 'Community biosecurity compliance check' : 'Hệ thống bảo vệ đa dạng sinh học & an toàn sinh học'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 text-xs text-rose-900 space-y-1.5 border border-rose-100">
              <p><strong>{isEn ? 'Reason:' : 'Nguyên nhân:'}</strong> {moderationAlert.reason}</p>
              <p><strong>{isEn ? 'Guidance:' : 'Hướng xử lý:'}</strong> {moderationAlert.suggestion}</p>
            </div>

            <button
              onClick={() => setModerationAlert(null)}
              className="w-full py-2.5 rounded-xl bg-forest-900 text-white font-semibold text-xs hover:bg-forest-800 transition"
            >
              {isEn ? 'I Understand and Will Revise' : 'Tôi Đã Hiểu & Sẽ Điều Chỉnh'}
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
