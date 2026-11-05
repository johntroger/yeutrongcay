import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plant, PlantCategory } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { getPlants } from '../services/apiService.ts';
import { useSEO } from '../utils/useSEO.ts';
import { Hero } from '../components/Hero.tsx';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer.tsx';
import { PlantCard } from '../components/PlantCard.tsx';
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

  // Lọc cây theo chế độ vườn đang chọn và từ khóa tìm kiếm
  const filteredPlants = useMemo(() => {
    return allPlants.filter((plant) => {
      const matchesCategory = plant.category === activeMode;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        plant.common_name.toLowerCase().includes(q) ||
        plant.scientific_name.toLowerCase().includes(q) ||
        plant.aliases.some((a) => a.toLowerCase().includes(q)) ||
        plant.tags.some((t) => t.toLowerCase().includes(q)) ||
        (plant.medical_info?.uses.some((u) => u.toLowerCase().includes(q)) ?? false);

      return matchesCategory && matchesSearch;
    });
  }, [allPlants, activeMode, searchQuery]);

  // Danh sách hiển thị: nếu đang tìm kiếm thì hiển thị toàn bộ kết quả khớp,
  // nếu ở chế độ mặc định chỉ hiển thị số lượng minh họa (6 cây) để trang chủ gọn gàng
  const displayedPlants = useMemo(() => {
    if (searchQuery.trim()) {
      return filteredPlants;
    }
    return filteredPlants.slice(0, visibleCount);
  }, [filteredPlants, searchQuery, visibleCount]);

  const categoryInfoMap: Record<PlantCategory, { path: string; name: string }> = {
    herb: { path: '/thao-duoc', name: 'Tủ Thuốc Xanh (Thảo Dược Bản Địa)' },
    fruit: { path: '/cay-an-trai', name: 'Trái Ngọt Phố (Cây Ăn Quả Đô Thị)' },
    ornamental: { path: '/cay-canh', name: 'Cây Cảnh & Không Gian Thư Thái' },
  };

  useSEO({
    title: 'Yêu Trồng Cây - Nền Tảng Thực Vật Bản Địa & Cây Trồng Đô Thị Việt Nam',
    description: 'Bách khoa tri thức thực vật, tủ thuốc thảo dược gia đình, bí quyết trồng cây ăn quả ban công và trạm trao đổi hạt giống an toàn ba miền.',
  });

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
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
            className="p-5 rounded-3xl bg-white border border-forest-100 shadow-md hover:shadow-xl hover:border-herbal-400 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🌿</span>
                <span className="text-[11px] font-semibold text-herbal-700 bg-herbal-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  Mở Tab Mới <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-forest-950 group-hover:text-herbal-700 transition">
                Tủ Thuốc Xanh (Thảo Dược)
              </h3>
              <p className="text-xs text-forest-700/80 mt-1 line-clamp-2">
                20 loài thảo dược bản địa trị ho, giải cảm, bổ khí huyết và bài thuốc an toàn.
              </p>
            </div>
          </Link>

          <Link
            to="/cay-an-trai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-3xl bg-white border border-forest-100 shadow-md hover:shadow-xl hover:border-amber-400 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🍋</span>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  Mở Tab Mới <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-forest-950 group-hover:text-amber-800 transition">
                Trái Ngọt Phố (Cây Ăn Quả)
              </h3>
              <p className="text-xs text-forest-700/80 mt-1 line-clamp-2">
                15 giống cây ăn trái lùn nhanh cho quả trồng chậu ban công và sân thượng.
              </p>
            </div>
          </Link>

          <Link
            to="/cay-canh"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-3xl bg-white border border-forest-100 shadow-md hover:shadow-xl hover:border-purple-400 transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🌸</span>
                <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  Mở Tab Mới <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-forest-950 group-hover:text-purple-800 transition">
                Cây Cảnh & Thư Thái
              </h3>
              <p className="text-xs text-forest-700/80 mt-1 line-clamp-2">
                15 loài thanh lọc không khí, nghệ thuật bonsai hoa thơm và cây phong thủy tài lộc.
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
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 tracking-tight">
              {activeMode === 'herb'
                ? 'Bách Khoa Thảo Dược Bản Địa'
                : activeMode === 'fruit'
                ? 'Bách Khoa Cây Ăn Trái Đô Thị'
                : 'Bách Khoa Cây Cảnh & Bonsai'}
            </h2>
            <p className="text-xs sm:text-sm text-forest-700 mt-1">
              {searchQuery
                ? `Tìm thấy ${filteredPlants.length} cây phù hợp từ khóa "${searchQuery}"`
                : `Hiển thị ${displayedPlants.length} / ${filteredPlants.length} cây minh họa tiêu biểu (Mỗi bài viết mở tab mới)`}
            </p>
          </div>

          <div className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold text-forest-800 bg-white px-3.5 py-2 rounded-xl border border-forest-100 shadow-sm">
            <Filter className="w-4 h-4 text-herbal-600" />
            <span className="hidden sm:inline">Phân Loại:</span>
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
              <div className="mt-10 p-6 rounded-3xl bg-white border border-forest-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-herbal-500 animate-pulse"></span>
                    <p className="text-xs uppercase tracking-wider font-bold text-herbal-800">
                      Bách Khoa Chuyên Sâu
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-forest-900 mt-0.5">
                    Đang hiển thị {displayedPlants.length} / {filteredPlants.length} cây minh họa. Bạn có thể xem thêm hoặc mở chuyên mục đầy đủ trong tab mới.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                  {visibleCount < filteredPlants.length && (
                    <button
                      onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredPlants.length))}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-forest-50 hover:bg-forest-100 text-forest-900 text-xs font-semibold border border-forest-200 transition text-center"
                    >
                      Xem Thêm 6 Cây ({filteredPlants.length - visibleCount} cây còn lại)
                    </button>
                  )}

                  <Link
                    to={categoryInfoMap[activeMode].path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5"
                  >
                    <span>Mở Toàn Bộ Chuyên Mục (Tab Mới)</span>
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
              Không tìm thấy cây phù hợp
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Thử tìm kiếm với tên khác hoặc mở chuyên mục riêng.
            </p>
            <button
              onClick={onClearSearch}
              className="px-4 py-2 bg-forest-900 text-white rounded-xl text-xs font-medium"
            >
              Xem tất cả cây
            </button>
          </div>
        )}
      </main>

      {/* 5. Hệ Sinh Thái Tính Năng Riêng Biệt (Mở Tab Mới Giải Phóng Trang Chủ) */}
      <section className="bg-forest-900 text-white py-14 border-t border-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-herbal-500/20 text-herbal-300 border border-herbal-400/30 mb-2">
              Hệ Sinh Thái Tính Năng
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Khám Phá Các Tiện Ích Chuyên Sâu
            </h2>
            <p className="text-xs sm:text-sm text-forest-200/80 mt-2">
              Mỗi tính năng được tối ưu thành một không gian độc lập, mở sang tab mới giúp bạn vừa tra cứu vừa thao tác mượt mà.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Box 1: Bác sĩ cây trồng */}
            <Link
              to="/bac-si-cay-trong"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-forest-950/60 border border-forest-800 hover:border-herbal-400 hover:bg-forest-950 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-herbal-500/10 text-herbal-400 flex items-center justify-center mb-4">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-herbal-300 transition">
                  Bác Sĩ Cây Trồng
                </h3>
                <p className="text-xs text-forest-300/80 mt-1.5 leading-relaxed">
                  Chẩn đoán tức thì 3 giây bệnh vàng lá, rệp sáp, thối rễ kèm bài thuốc sinh học.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-forest-800/60 flex items-center justify-between text-xs font-semibold text-herbal-400">
                <span>Mở Phòng Khám</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>

            {/* Box 2: Trạm Đổi Cây */}
            <Link
              to="/trao-doi-cay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-forest-950/60 border border-forest-800 hover:border-emerald-400 hover:bg-forest-950 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-emerald-300 transition">
                  Trạm Trao Đổi Cây
                </h3>
                <p className="text-xs text-forest-300/80 mt-1.5 leading-relaxed">
                  Kết nối tặng hạt giống, đổi cành giâm an toàn ba miền với cam kết cách ly 7 ngày.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-forest-800/60 flex items-center justify-between text-xs font-semibold text-emerald-400">
                <span>Mở Trạm Đổi Cây</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>

            {/* Box 3: Kiếm Tiền Từ Vườn */}
            <Link
              to="/kiem-tien-tu-vuon"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-forest-950/60 border border-forest-800 hover:border-amber-400 hover:bg-forest-950 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-amber-300 transition">
                  Bí Quyết Làm Kinh Tế
                </h3>
                <p className="text-xs text-forest-300/80 mt-1.5 leading-relaxed">
                  Chiến lược tạo thu nhập bền vững từ chiết cành, ươm giống và chế biến thảo mộc.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-forest-800/60 flex items-center justify-between text-xs font-semibold text-amber-400">
                <span>Xem Cẩm Nang</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>

            {/* Box 4: Kênh Liên Hệ & Hợp Tác */}
            <Link
              to="/lien-he"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-forest-950/60 border border-forest-800 hover:border-forest-400 hover:bg-forest-950 transition group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-forest-500/10 text-forest-300 flex items-center justify-center mb-4">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-forest-200 transition">
                  Liên Hệ & Hợp Tác
                </h3>
                <p className="text-xs text-forest-300/80 mt-1.5 leading-relaxed">
                  Gửi yêu cầu hỗ trợ, đóng góp bài thuốc dân gian hoặc đăng ký đối tác nhà vườn.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-forest-800/60 flex items-center justify-between text-xs font-semibold text-forest-300">
                <span>Gửi Tin Nhắn</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
