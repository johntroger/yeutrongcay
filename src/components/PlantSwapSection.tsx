import React, { useState } from 'react';
import {
  MapPin,
  Search,
  ShieldCheck,
  Plus,
  X,
  AlertTriangle,
  Heart,
  Sparkles,
  Info
} from 'lucide-react';
import { SwapOffer, SwapOfferType } from '../types/index.ts';
import { SEED_SWAP_OFFERS } from '../data/swapOffers.ts';

export const PlantSwapSection: React.FC = () => {
  const [offers, setOffers] = useState<SwapOffer[]>(() => {
    const saved = localStorage.getItem('ytc_swap_offers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return SEED_SWAP_OFFERS;
  });

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

  // Lọc tin trao đổi
  const filteredOffers = offers.filter((item) => {
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

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlantName.trim() || !newLocation.trim() || !pledgedQuarantine) {
      alert('Vui lòng điền đủ thông tin và xác nhận cam kết cách ly 7 ngày an toàn.');
      return;
    }

    const createdOffer: SwapOffer = {
      id: `swap-${Date.now()}`,
      user_id: 'usr-local-me',
      user_name: 'Bạn (Thành Viên Vườn)',
      user_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      region_zone: newRegion,
      location_name: newLocation,
      plant_name: newPlantName,
      offer_type: newOfferType,
      item_type: newItemType,
      description: newDescription || 'Sẵn sàng chia sẻ cho anh chị em cùng đam mê làm vườn.',
      quarantine_pledge: true,
      image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
      status: 'visible',
      created_at: 'Vừa xong',
      contact_note: newContact || 'Nhắn tin trực tiếp qua diễn đàn',
    };

    const updated = [createdOffer, ...offers];
    setOffers(updated);
    localStorage.setItem('ytc_swap_offers', JSON.stringify(updated));

    // Reset form
    setNewPlantName('');
    setNewLocation('');
    setNewDescription('');
    setNewContact('');
    setPledgedQuarantine(false);
    setIsModalOpen(false);
  };

  return (
    <section id="swap-map" className="py-16 bg-cream-100/70 border-t border-forest-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-900 text-xs font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5 text-herbal-600" />
              <span>Bản Đồ Vườn Xanh & Đổi Cây An Toàn</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-forest-950 tracking-tight">
              Trạm Trao Đổi Cây & Hạt Giống Bản Địa
            </h2>
            <p className="text-sm text-forest-800 mt-2 max-w-2xl leading-relaxed">
              Kết nối cộng đồng làm vườn lân cận trong bán kính 1km – 5km. Tặng cành giâm 0đ, giao lưu giống cây quý thuần dưỡng và cẩm nang kiểm dịch thực vật gia đình.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-medium text-sm flex items-center gap-2 shadow-md transition self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4 text-herbal-400" />
            <span>+ Đăng Tin Tặng / Đổi Giống</span>
          </button>
        </div>

        {/* 7-Day Quarantine Guide Banner */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-herbal-200 shadow-xs mb-8 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-herbal-100 text-herbal-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-forest-950 flex items-center gap-2">
                <span>Cẩm Nang Vàng: Quy Tắc Cách Ly Cây Mới 7 Ngày</span>
                <span className="text-[11px] font-semibold bg-herbal-100 text-herbal-800 px-2.5 py-0.5 rounded-full">
                  Bảo vệ vườn nhà
                </span>
              </h4>
              <p className="text-xs sm:text-sm text-forest-800 mt-1 leading-relaxed">
                Để bảo vệ cả ban công trước mầm bệnh nấm rệp tiềm ẩn: Giữ cây mới tách biệt 7 ngày, quan sát kẽ nách lá, phun sương phòng dịch tỏi ớt gừng sinh học trước khi hòa nhập vào vườn chính.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-terracotta-700 bg-terracotta-50 px-3.5 py-2 rounded-xl border border-terracotta-200 shrink-0">
            <AlertTriangle className="w-4 h-4" />
            <span>Cấm giao lưu loài cấm trong Sách Đỏ</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-forest-100 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-forest-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm giống cây, cành giâm, hạt giống hoặc quận/huyện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-cream-50/70 border border-forest-100 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
              />
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'Tất Cả Miền' },
                { id: 'north', label: 'Miền Bắc' },
                { id: 'central', label: 'Miền Trung' },
                { id: 'south', label: 'Miền Nam' },
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
            <span className="text-xs font-bold text-forest-700 shrink-0">Loại Tin:</span>
            {[
              { id: 'all', label: 'Tất Cả' },
              { id: 'giveaway', label: '🎁 Tặng Miễn Phí (0đ)' },
              { id: 'exchange', label: '🔄 Trao Đổi Cây' },
              { id: 'seek', label: '🔍 Cần Tìm Giống' },
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
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-3xl overflow-hidden border border-forest-100 shadow-sm hover:shadow-md transition flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[16/10] bg-forest-900 overflow-hidden">
                <img
                  src={offer.image_url}
                  alt={offer.plant_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
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
                      ? '🎁 Tặng Miễn Phí'
                      : offer.offer_type === 'exchange'
                      ? '🔄 Trao Đổi'
                      : '🔍 Cần Tìm'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/60 text-white backdrop-blur-xs">
                    {offer.item_type}
                  </span>
                </div>

                {offer.quarantine_pledge && (
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-forest-900 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3 h-3 text-herbal-600" />
                    <span>Cam kết cách ly 7 ngày</span>
                  </div>
                )}
              </div>

              {/* Offer Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Location Tag */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-forest-700 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
                    <span className="truncate">{offer.location_name}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-forest-950 mb-1 group-hover:text-herbal-700 transition">
                    {offer.plant_name}
                  </h3>

                  {offer.scientific_name && (
                    <p className="text-xs font-mono italic text-forest-600 mb-3">
                      {offer.scientific_name}
                    </p>
                  )}

                  <p className="text-xs text-forest-800 leading-relaxed mb-4 line-clamp-3">
                    {offer.description}
                  </p>
                </div>

                {/* Footer details & Action */}
                <div className="pt-4 border-t border-forest-50 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <img
                        src={offer.user_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={offer.user_name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-medium text-forest-900 truncate max-w-[130px]">
                        {offer.user_name}
                      </span>
                    </div>
                    <span>{offer.created_at}</span>
                  </div>

                  {offer.contact_note && (
                    <div className="text-[11px] text-forest-700 bg-forest-50/70 px-3 py-1.5 rounded-xl border border-forest-100 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-herbal-600 shrink-0" />
                      <span className="truncate">{offer.contact_note}</span>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      alert(`Đã kết nối với ${offer.user_name}!\nChi tiết nhận giống: ${offer.contact_note || 'Vui lòng trao đổi tại địa chỉ ' + offer.location_name}`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Nhận Giống / Liên Hệ Trao Đổi</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-forest-100 p-8 max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-forest-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-forest-900 mb-1">
              Chưa có tin trao đổi nào tại khu vực này
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              Hãy là người đầu tiên chia sẻ mầm xanh bản địa cho cộng đồng lân cận!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-forest-900 text-white rounded-xl text-xs font-medium"
            >
              + Đăng Tin Ngay
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
                    Đăng Tin Tặng / Đổi Giống Cây
                  </h3>
                  <p className="text-xs text-forest-700">
                    Chia sẻ mầm xanh an toàn cho cộng đồng
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
                  Tên Giống Cây / Cành Giâm / Hạt Giống *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cành Húng Chanh, Hạt Mướp Đắng Rừng, Bầu Ổi..."
                  value={newPlantName}
                  onChange={(e) => setNewPlantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                />
              </div>

              {/* Offer Type & Item Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Hình thức chia sẻ *
                  </label>
                  <select
                    value={newOfferType}
                    onChange={(e) => setNewOfferType(e.target.value as SwapOfferType)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 bg-white"
                  >
                    <option value="giveaway">🎁 Tặng Miễn Phí (0đ)</option>
                    <option value="exchange">🔄 Trao Đổi Cây Tương Đương</option>
                    <option value="seek">🔍 Cần Tìm / Xin Giống</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Dạng vật liệu giống *
                  </label>
                  <select
                    value={newItemType}
                    onChange={(e) => setNewItemType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 bg-white"
                  >
                    <option value="Cành giâm khỏe rễ">Cành giâm khỏe rễ</option>
                    <option value="Hạt giống phơi khô">Hạt giống phơi khô</option>
                    <option value="Cây con bầu đất">Cây con bầu đất</option>
                    <option value="Cây chậu thuần dưỡng">Cây chậu thuần dưỡng</option>
                  </select>
                </div>
              </div>

              {/* Region Zone & Location Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Khu vực miền *
                  </label>
                  <select
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 bg-white"
                  >
                    <option value="north">Miền Bắc</option>
                    <option value="central">Miền Trung</option>
                    <option value="south">Miền Nam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-forest-900 mb-1">
                    Địa điểm (Quận / Huyện) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Cầu Giấy, HN hoặc Q.7, TP.HCM"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Mô tả tình trạng cây & số lượng
                </label>
                <textarea
                  rows={2}
                  placeholder="VD: Tỉa cành dư 20 đoạn, rễ mọc tốt, sẵn sàng chia sẻ cho ai cần..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                />
              </div>

              {/* Contact Note */}
              <div>
                <label className="block text-xs font-bold text-forest-900 mb-1">
                  Cách liên hệ nhận giống
                </label>
                <input
                  type="text"
                  placeholder="VD: Nhắn Zalo 09xx hoặc nhận tại cổng công viên..."
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                />
              </div>

              {/* 7-Day Quarantine Pledge Checkbox */}
              <div className="p-3.5 rounded-2xl bg-forest-50/70 border border-forest-200 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pledgedQuarantine}
                    onChange={(e) => setPledgedQuarantine(e.target.checked)}
                    className="mt-1 w-4 h-4 text-herbal-600 rounded-sm border-forest-300 focus:ring-herbal-500"
                  />
                  <span className="text-xs text-forest-900 leading-snug">
                    <strong>Cam kết kiểm dịch & an toàn:</strong> Cây/cành chia sẻ không chứa nấm rệp có hại, không thuộc danh mục động thực vật hoang dã nguy cấp (Sách Đỏ Việt Nam), và tôi đồng ý hướng dẫn người nhận quy trình cách ly 7 ngày.
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-forest-200 text-xs font-semibold text-forest-800 hover:bg-forest-50 transition"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={!pledgedQuarantine || !newPlantName.trim() || !newLocation.trim()}
                  className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 disabled:opacity-50 text-white text-xs font-bold shadow-md transition"
                >
                  Đăng Tin Lên Trạm
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
};
