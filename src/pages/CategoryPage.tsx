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
  Home,
  ChevronRight,
  Filter,
  Sparkles,
  Sun,
  Droplets,
  Award,
  RotateCcw
} from 'lucide-react';

interface CategoryPageProps {
  category: PlantCategory;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  searchQuery = '',
  onClearSearch,
}) => {
  const [allPlants, setAllPlants] = useState<Plant[]>(SEED_PLANTS);

  // Bộ lọc chuyên sâu MS3
  const [sunlightFilter, setSunlightFilter] = useState<'all' | 'full_sun' | 'partial_shade' | 'indoor'>('all');
  const [wateringFilter, setWateringFilter] = useState<'all' | 'daily' | 'moderate' | 'drought_tolerant'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

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

  const meta = {
    herb: {
      title: 'Tủ Thuốc Xanh - 20 Loài Thảo Dược Bản Địa Việt Nam | Yêu Trồng Cây',
      description: 'Tra cứu 20 loài thảo dược bản địa Việt Nam: công dụng trị ho, giải cảm, bổ huyết, liều dùng an toàn và bài thuốc dân gian.',
      name: 'Tủ Thuốc Xanh (Thảo Dược Bản Địa)',
      icon: '🌿',
    },
    fruit: {
      title: 'Trái Ngọt Phố - 15 Cây Ăn Quả Ban Công Sân Thượng | Yêu Trồng Cây',
      description: 'Cẩm nang trồng 15 giống cây ăn trái lùn đô thị: ổi lê, cóc Thái, sung Mỹ, dâu tằm F1, chanh tứ quý trĩu quả quanh năm.',
      name: 'Trái Ngọt Phố (Cây Ăn Quả Đô Thị)',
      icon: '🍋',
    },
    ornamental: {
      title: 'Cây Cảnh & Bonsai Thư Thái - 15 Loài Lọc Khí & Phong Thủy | Yêu Trồng Cây',
      description: 'Top 15 loài cây cảnh thanh lọc không khí theo NASA, nghệ thuật tạo tác bonsai phong thủy và cây phong thủy hút tài lộc.',
      name: 'Cây Cảnh & Thư Thái (Bonsai/Hoa)',
      icon: '🌸',
    },
  }[category];

  useSEO({
    title: meta.title,
    description: meta.description,
  });

  const categoryPlants = useMemo(() => {
    return allPlants.filter((plant) => {
      const matchesCategory = plant.category === category;
      const q = searchQuery.toLowerCase().trim();
      
      const matchesSearch = !q ||
        plant.common_name.toLowerCase().includes(q) ||
        plant.scientific_name.toLowerCase().includes(q) ||
        plant.aliases.some((a) => a.toLowerCase().includes(q)) ||
        plant.tags.some((t) => t.toLowerCase().includes(q)) ||
        (plant.medical_info?.uses.some((u) => u.toLowerCase().includes(q)) ?? false);

      const matchesSunlight = sunlightFilter === 'all' || plant.sunlight === sunlightFilter;
      const matchesWatering = wateringFilter === 'all' || plant.watering === wateringFilter;
      const matchesDifficulty =
        difficultyFilter === 'all' ||
        (difficultyFilter === 'easy' && plant.propagation_difficulty <= 2) ||
        (difficultyFilter === 'medium' && plant.propagation_difficulty === 3) ||
        (difficultyFilter === 'hard' && plant.propagation_difficulty >= 4);

      return matchesCategory && matchesSearch && matchesSunlight && matchesWatering && matchesDifficulty;
    });
  }, [allPlants, category, searchQuery, sunlightFilter, wateringFilter, difficultyFilter]);

  const hasActiveFilters = sunlightFilter !== 'all' || wateringFilter !== 'all' || difficultyFilter !== 'all';

  const resetFilters = () => {
    setSunlightFilter('all');
    setWateringFilter('all');
    setDifficultyFilter('all');
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="hover:text-forest-950 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" />
            <span>Trang Chủ</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
          <span className="font-bold text-forest-950 flex items-center gap-1">
            <span>{meta.icon}</span>
            <span>{meta.name}</span>
          </span>
        </nav>
      </div>

      {/* Hero Category Banner */}
      <Hero
        activeMode={category}
        onExploreMonetization={() => window.open('/kiem-tien-tu-vuon', '_blank')}
        onOpenClinic={() => window.open('/bac-si-cay-trong', '_blank')}
      />

      {/* Medical Disclaimer if Herbs */}
      {category === 'herb' && <MedicalDisclaimer />}

      {/* Plant Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-4 border-b border-forest-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 tracking-tight flex items-center gap-2">
              <span>{meta.icon}</span>
              <span>{meta.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-forest-700 mt-1">
              Hiển thị {categoryPlants.length} loài thực vật chuẩn hóa (Bấm vào mỗi cây để mở bài viết chi tiết ở tab mới)
            </p>
          </div>

          <div className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold text-forest-800 bg-white px-3.5 py-2 rounded-xl border border-forest-100 shadow-sm">
            <Filter className="w-4 h-4 text-herbal-600" />
            <span>Chuyên mục độc lập</span>
          </div>
        </div>

        {/* Thanh Bộ Lọc Chuyên Sâu (MS3 Advanced Filters) */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-forest-100 shadow-sm mb-8 space-y-3.5">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-forest-50">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-herbal-600" />
              <span className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                Bộ Lọc Nông Nghiệp Đô Thị
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-forest-50 text-forest-700 border border-forest-100">
                {categoryPlants.length} cây phù hợp
              </span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 transition px-2.5 py-1 rounded-lg hover:bg-amber-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại bộ lọc</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Lọc Ánh Sáng */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-forest-700 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" /> Mức Độ Nắng:
              </label>
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'full_sun', label: 'Nắng gắt (6h+)' },
                  { id: 'partial_shade', label: 'Bán râm' },
                  { id: 'indoor', label: 'Trong nhà' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSunlightFilter(item.id as any)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-medium shrink-0 transition ${
                      sunlightFilter === item.id
                        ? 'bg-forest-900 text-white font-semibold shadow-xs'
                        : 'bg-cream-50 text-forest-800 hover:bg-forest-50 border border-forest-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lọc Nước Tưới */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-forest-700 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" /> Tần Suất Tưới:
              </label>
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'daily', label: 'Hàng ngày' },
                  { id: 'moderate', label: 'Vừa phải' },
                  { id: 'drought_tolerant', label: 'Chịu hạn giỏi' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setWateringFilter(item.id as any)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-medium shrink-0 transition ${
                      wateringFilter === item.id
                        ? 'bg-forest-900 text-white font-semibold shadow-xs'
                        : 'bg-cream-50 text-forest-800 hover:bg-forest-50 border border-forest-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lọc Độ Khó Nhân Giống */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-forest-700 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-600" /> Độ Khó Trồng:
              </label>
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: 'easy', label: 'Dễ trồng (1-2★)' },
                  { id: 'medium', label: 'Vừa (3★)' },
                  { id: 'hard', label: 'Thử thách (4-5★)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDifficultyFilter(item.id as any)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-medium shrink-0 transition ${
                      difficultyFilter === item.id
                        ? 'bg-forest-900 text-white font-semibold shadow-xs'
                        : 'bg-cream-50 text-forest-800 hover:bg-forest-50 border border-forest-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {categoryPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categoryPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-forest-100 p-8 max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-forest-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-forest-900 mb-1">
              Không tìm thấy cây phù hợp
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Thử tìm kiếm với từ khóa khác trong chuyên mục này.
            </p>
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="px-4 py-2 bg-forest-900 text-white rounded-xl text-xs font-medium"
              >
                Xem tất cả cây trong mục
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
