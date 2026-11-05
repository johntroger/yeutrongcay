import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plant, PlantCategory } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { getPlants } from '../services/apiService.ts';
import { useSEO } from '../utils/useSEO.ts';
import { Hero } from '../components/Hero.tsx';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer.tsx';
import { PlantCard } from '../components/PlantCard.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { PLANT_ENGLISH_MAP } from '../i18n/plantTranslations.ts';
import {
  Filter,
  Sparkles,
  MapPin,
  Stethoscope,
  Coins,
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';

interface HomePageProps {
  activeMode: PlantCategory;
  searchQuery: string;
  onClearSearch: () => void;
  onScrollToSection?: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeMode,
  searchQuery,
  onClearSearch,
}) => {
  const { t, isEn } = useLanguage();
  const [allPlants, setAllPlants] = useState<Plant[]>(SEED_PLANTS);
  const [visibleCount, setVisibleCount] = useState(6);

  // Tải dữ liệu cây thực tế từ MySQL qua Cloudflare Edge API
  useEffect(() => {
    let isMounted = true;
    getPlants().then(({ plants }) => {
      if (isMounted && plants && plants.length > 0) {
        setAllPlants(plants);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Đặt lại số lượng hiển thị ban đầu là 6 khi chuyển đổi danh mục
  useEffect(() => {
    setVisibleCount(6);
  }, [activeMode]);

  // Lọc cây theo chế độ vườn đang chọn và từ khóa tìm kiếm (hỗ trợ cả tiếng Anh lẫn tiếng Việt)
  const filteredPlants = useMemo(() => {
    return allPlants.filter((plant) => {
      const matchesCategory = plant.category === activeMode;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const enData = PLANT_ENGLISH_MAP[plant.id];
      const enCommon = enData?.common_name.toLowerCase() || '';
      const enAliases = enData?.aliases.map((a) => a.toLowerCase()) || [];
      const enTags = enData?.tags.map((t) => t.toLowerCase()) || [];

      const matchesSearch =
        plant.common_name.toLowerCase().includes(q) ||
        plant.scientific_name.toLowerCase().includes(q) ||
        plant.aliases.some((a) => a.toLowerCase().includes(q)) ||
        plant.tags.some((t) => t.toLowerCase().includes(q)) ||
        enCommon.includes(q) ||
        enAliases.some((a) => a.includes(q)) ||
        enTags.some((t) => t.includes(q)) ||
        (plant.medical_info?.uses.some((u) => u.toLowerCase().includes(q)) ?? false);

      return matchesCategory && matchesSearch;
    });
  }, [allPlants, activeMode, searchQuery]);

  // Danh sách hiển thị
  const displayedPlants = useMemo(() => {
    if (searchQuery.trim()) {
      return filteredPlants;
    }
    return filteredPlants.slice(0, visibleCount);
  }, [filteredPlants, searchQuery, visibleCount]);

  const categoryInfoMap: Record<PlantCategory, { path: string; name: string }> = {
    herb: {
      path: '/thao-duoc',
      name: isEn ? 'Green Pharmacy (Native Medicinal Herbs)' : 'Tủ Thuốc Xanh (Thảo Dược Bản Địa)',
    },
    fruit: {
      path: '/cay-an-trai',
      name: isEn ? 'Balcony Fruits (Urban Orchards)' : 'Trái Ngọt Phố (Cây Ăn Quả Đô Thị)',
    },
    ornamental: {
      path: '/cay-canh',
      name: isEn ? 'Bonsai & Calming Living Spaces' : 'Cây Cảnh & Không Gian Thư Thái',
    },
  };

  useSEO({
    title: isEn
      ? 'Yeu Trong Cay - Native Herbs & Urban Balcony Gardening'
      : 'Yêu Trồng Cây - Nền Tảng Thực Vật Bản Địa & Cây Trồng Đô Thị Việt Nam',
    description: isEn
      ? 'Botanical knowledge base, family herbal pharmacy, balcony container fruit tree secrets, and biosecure seed exchange.'
      : 'Bách khoa tri thức thực vật, tủ thuốc thảo dược gia đình, bí quyết trồng cây ăn quả ban công và trạm trao đổi hạt giống an toàn ba miền.',
  });

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-950 text-charcoal-900 dark:text-cream-100 flex flex-col transition-colors duration-200">
      {/* 1. Hero Banner */}
      <Hero
        activeMode={activeMode}
        onExploreMonetization={() => window.open('/kiem-tien-tu-vuon', '_blank')}
        onOpenClinic={() => window.open('/bac-si-cay-trong', '_blank')}
      />

      {/* 2. Bộ 3 Chuyên Mục Lớn Mở Tab Riêng Biệt */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/thao-duoc"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-3xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-900 shadow-md hover:shadow-xl hover:border-herbal-400 dark:hover:border-herbal-500 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🌿</span>
                <span className="text-[11px] font-semibold text-herbal-700 dark:text-herbal-300 bg-herbal-50 dark:bg-herbal-950/60 px-2.5 py-1 rounded-full flex items-center gap-1 border border-herbal-200/50 dark:border-herbal-800/40">
                  {t('common.openTab')} <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-forest-950 dark:text-cream-50 group-hover:text-herbal-700 dark:group-hover:text-herbal-400 transition">
                {t('categories.herb')}
              </h3>
              <p className="text-xs text-forest-700/80 dark:text-forest-300 mt-1 line-clamp-2">
                {t('categories.herbDesc')}
              </p>
            </div>
          </Link>

          <Link
            to="/cay-an-trai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-3xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-900 shadow-md hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🍋</span>
                <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full flex items-center gap-1 border border-amber-200/50 dark:border-amber-800/40">
                  {t('common.openTab')} <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-forest-950 dark:text-cream-50 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition">
                {t('categories.fruit')}
              </h3>
              <p className="text-xs text-forest-700/80 dark:text-forest-300 mt-1 line-clamp-2">
                {t('categories.fruitDesc')}
              </p>
            </div>
          </Link>

          <Link
            to="/cay-canh"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-3xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-900 shadow-md hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-500 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🌸</span>
                <span className="text-[11px] font-semibold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-full flex items-center gap-1 border border-purple-200/50 dark:border-purple-800/40">
                  {t('common.openTab')} <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-forest-950 dark:text-cream-50 group-hover:text-purple-800 dark:group-hover:text-purple-400 transition">
                {t('categories.ornamental')}
              </h3>
              <p className="text-xs text-forest-700/80 dark:text-forest-300 mt-1 line-clamp-2">
                {t('categories.ornamentalDesc')}
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Medical Disclaimer */}
      {activeMode === 'herb' && <MedicalDisclaimer />}

      {/* 4. Plants Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-forest-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 dark:text-cream-50 tracking-tight">
              {activeMode === 'herb'
                ? isEn
                  ? 'Native Medicinal Herbs Encyclopedia'
                  : 'Bách Khoa Thảo Dược Bản Địa'
                : activeMode === 'fruit'
                ? isEn
                  ? 'Urban Balcony Fruit Trees Encyclopedia'
                  : 'Bách Khoa Cây Ăn Trái Đô Thị'
                : isEn
                ? 'Bonsai & Ornamental Botanical Encyclopedia'
                : 'Bách Khoa Cây Cảnh & Bonsai'}
            </h2>
            <p className="text-xs sm:text-sm text-forest-700 dark:text-forest-300 mt-1">
              {searchQuery
                ? isEn
                  ? `Found ${filteredPlants.length} plants matching "${searchQuery}"`
                  : `Tìm thấy ${filteredPlants.length} cây phù hợp từ khóa "${searchQuery}"`
                : isEn
                ? `Showing ${displayedPlants.length} of ${filteredPlants.length} curated botanical varieties (Each opens in a new tab)`
                : `Hiển thị ${displayedPlants.length} / ${filteredPlants.length} giống cây tuyển chọn trong bách khoa toàn thư (Mỗi bài viết mở tab mới)`}
            </p>
          </div>

          <div className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold text-forest-800 dark:text-cream-100 bg-white dark:bg-charcoal-900 px-3.5 py-2 rounded-xl border border-forest-100 dark:border-forest-800 shadow-sm">
            <Filter className="w-4 h-4 text-herbal-600 dark:text-herbal-400" />
            <span className="hidden sm:inline">{t('common.category')}:</span>
            <span className="capitalize">{activeMode}</span>
          </div>
        </div>

        {/* Grid display */}
        {displayedPlants.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedPlants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                />
              ))}
            </div>

            {/* Thanh điều hướng xem thêm & mở toàn bộ bách khoa sang tab mới */}
            {!searchQuery && (
              <div className="mt-10 p-6 rounded-3xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-900 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-herbal-500 animate-pulse"></span>
                    <p className="text-xs uppercase tracking-wider font-bold text-herbal-800 dark:text-herbal-400">
                      {isEn ? 'In-Depth Botanical Guide' : 'Bách Khoa Chuyên Sâu'}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-forest-900 dark:text-cream-100 mt-0.5">
                    {isEn
                      ? `Displaying ${displayedPlants.length} of ${filteredPlants.length} curated botanical varieties. Explore more below or open the full catalog.`
                      : `Đang hiển thị ${displayedPlants.length} / ${filteredPlants.length} giống cây tuyển chọn. Bạn có thể xem thêm hoặc mở chuyên mục đầy đủ trong tab mới.`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                  {visibleCount < filteredPlants.length && (
                    <button
                      onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredPlants.length))}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 text-xs font-semibold border border-forest-200 dark:border-forest-700 transition text-center"
                    >
                      {isEn
                        ? `Show 6 More Plants (${filteredPlants.length - visibleCount} remaining)`
                        : `Xem Thêm 6 Cây (${filteredPlants.length - visibleCount} cây còn lại)`}
                    </button>
                  )}

                  <Link
                    to={categoryInfoMap[activeMode].path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5"
                  >
                    <span>{isEn ? 'Open Full Category (New Tab)' : 'Mở Toàn Bộ Chuyên Mục (Tab Mới)'}</span>
                    <ArrowUpRight className="w-4 h-4 text-herbal-400" />
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-forest-100 p-8 max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-forest-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-forest-900 mb-1">
              {isEn ? 'No matching plants found' : 'Không tìm thấy cây phù hợp'}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {isEn
                ? 'Try searching with another name or browse the full category.'
                : 'Thử tìm kiếm với tên khác hoặc mở chuyên mục riêng.'}
            </p>
            <button
              onClick={onClearSearch}
              className="px-4 py-2 bg-forest-900 text-white rounded-xl text-xs font-medium"
            >
              {isEn ? 'View all plants' : 'Xem tất cả cây'}
            </button>
          </div>
        )}
      </main>

      {/* 5. Hệ Sinh Thái Tính Năng Riêng Biệt (Mở Tab Mới Giải Phóng Trang Chủ) */}
      <section className="bg-forest-900 text-white py-14 border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-herbal-500/20 text-herbal-300 border border-herbal-400/30 mb-2">
              {isEn ? 'Feature Ecosystem' : 'Hệ Sinh Thái Tính Năng'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {isEn ? 'Explore Dedicated Garden Spaces' : 'Khám Phá Các Tiện Ích Chuyên Sâu'}
            </h2>
            <p className="text-xs sm:text-sm text-forest-200/80 mt-2">
              {isEn
                ? 'Each tool is crafted as an independent workspace opening in a new tab for seamless multi-tasking.'
                : 'Mỗi tính năng được tối ưu thành một không gian độc lập, mở sang tab mới giúp bạn vừa tra cứu vừa thao tác mượt mà.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Box 1: Vườn Số Của Tôi (MS4) */}
            <Link
              to="/vuon-cua-toi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-forest-950/80 border border-forest-700 hover:border-herbal-400 hover:bg-forest-950 transition group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-herbal-500/20 text-herbal-400 flex items-center justify-center mb-3.5">
                  <span className="text-xl">🏡</span>
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-herbal-300 transition">
                  {t('nav.myGarden')}
                </h3>
                <p className="text-xs text-forest-300/80 mt-1 leading-relaxed">
                  {isEn
                    ? 'Manage balcony plants and preserve before-and-after photo milestones.'
                    : 'Quản lý từng chậu cây ban công, lưu ảnh dòng thời gian trước & sau lớn lên.'}
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-forest-800/80 flex items-center justify-between text-xs font-semibold text-herbal-400">
                <span>{isEn ? 'Open Garden' : 'Mở Vườn Số'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>

            {/* Box 2: Bác sĩ cây trồng */}
            <Link
              to="/bac-si-cay-trong"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-forest-950/60 border border-forest-800 hover:border-herbal-400 hover:bg-forest-950 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-herbal-500/10 text-herbal-400 flex items-center justify-center mb-3.5">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-herbal-300 transition">
                  {t('nav.clinicShort')}
                </h3>
                <p className="text-xs text-forest-300/80 mt-1 leading-relaxed">
                  {isEn
                    ? 'Instant 3-second diagnosis for yellow leaves, mealybugs, and root rot with organic remedies.'
                    : 'Chẩn đoán tức thì 3 giây bệnh vàng lá, rệp sáp, thối rễ kèm bài thuốc sinh học.'}
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-forest-800/60 flex items-center justify-between text-xs font-semibold text-herbal-400">
                <span>{isEn ? 'Open Clinic' : 'Mở Phòng Khám'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>

            {/* Box 3: Trạm Đổi Cây */}
            <Link
              to="/trao-doi-cay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-forest-950/60 border border-forest-800 hover:border-emerald-400 hover:bg-forest-950 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-emerald-300 transition">
                  {t('nav.swap')}
                </h3>
                <p className="text-xs text-forest-300/80 mt-1 leading-relaxed">
                  {isEn
                    ? 'Share seeds and exchange rooted cuttings safely with 7-day quarantine.'
                    : 'Kết nối tặng hạt giống, đổi cành giâm an toàn ba miền với cam kết cách ly 7 ngày.'}
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-forest-800/60 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>{isEn ? 'Open Swap Station' : 'Mở Trạm Đổi Cây'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>

            {/* Box 4: Kiếm Tiền Từ Vườn */}
            <Link
              to="/kiem-tien-tu-vuon"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-forest-950/60 border border-forest-800 hover:border-amber-400 hover:bg-forest-950 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3.5">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-amber-300 transition">
                  {t('nav.monetization')}
                </h3>
                <p className="text-xs text-forest-300/80 mt-1 leading-relaxed">
                  {isEn
                    ? 'Strategies for sustainable revenue from propagation, starter pots, and herbal crafting.'
                    : 'Chiến lược tạo thu nhập bền vững từ chiết cành, ươm giống và chế biến thảo mộc.'}
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-forest-800/60 flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>{isEn ? 'View Guide' : 'Xem Cẩm Nang'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>

            {/* Box 5: Kênh Liên Hệ & Hợp Tác */}
            <Link
              to="/lien-he"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-forest-950/60 border border-forest-800 hover:border-forest-400 hover:bg-forest-950 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-forest-500/10 text-forest-300 flex items-center justify-center mb-3.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-forest-200 transition">
                  {t('nav.contact')}
                </h3>
                <p className="text-xs text-forest-300/80 mt-1 leading-relaxed">
                  {isEn
                    ? 'Send feedback, contribute folk remedies, or register nursery partnerships.'
                    : 'Gửi yêu cầu hỗ trợ, đóng góp bài thuốc dân gian hoặc đăng ký đối tác nhà vườn.'}
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-forest-800/60 flex items-center justify-between text-xs font-semibold text-forest-300">
                <span>{isEn ? 'Send Message' : 'Gửi Tin Nhắn'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
