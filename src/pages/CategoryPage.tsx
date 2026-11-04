import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plant, PlantCategory } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { getPlants } from '../services/apiService.ts';
import { useSEO } from '../utils/useSEO.ts';
import { Hero } from '../components/Hero.tsx';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer.tsx';
import { PlantCard } from '../components/PlantCard.tsx';
import { Home, ChevronRight, Filter, Sparkles } from 'lucide-react';

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
      title: 'Tủ Thuốc Xanh - Thảo Dược Bản Địa Việt Nam | Yêu Trồng Cây',
      description: 'Tra cứu 20 loài thảo dược bản địa Việt Nam: công dụng trị ho, giải cảm, bổ huyết, liều dùng an toàn và bài thuốc dân gian.',
      name: 'Tủ Thuốc Xanh (Thảo Dược Bản Địa)',
      icon: '🌿',
    },
    fruit: {
      title: 'Trái Ngọt Phố - Cây Ăn Quả Ban Công Sân Thượng | Yêu Trồng Cây',
      description: 'Cẩm nang trồng 10 giống cây ăn trái lùn đô thị: ổi lê, cóc Thái, sung Mỹ, chanh tứ quý trĩu quả quanh năm.',
      name: 'Trái Ngọt Phố (Cây Ăn Quả Đô Thị)',
      icon: '🍋',
    },
    ornamental: {
      title: 'Cây Cảnh & Bonsai Thư Thái - Phong Thủy Tài Lộc | Yêu Trồng Cây',
      description: 'Top các loài cây cảnh thanh lọc không khí, nghệ thuật tạo tác bonsai phong thủy và cây phong thủy hút tài lộc.',
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
      if (!q) return matchesCategory;

      const matchesSearch =
        plant.common_name.toLowerCase().includes(q) ||
        plant.scientific_name.toLowerCase().includes(q) ||
        plant.aliases.some((a) => a.toLowerCase().includes(q)) ||
        plant.tags.some((t) => t.toLowerCase().includes(q)) ||
        (plant.medical_info?.uses.some((u) => u.toLowerCase().includes(q)) ?? false);

      return matchesCategory && matchesSearch;
    });
  }, [allPlants, category, searchQuery]);

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-forest-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 tracking-tight flex items-center gap-2">
              <span>{meta.icon}</span>
              <span>{meta.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-forest-700 mt-1">
              Hiển thị {categoryPlants.length} loài thực vật chuẩn hóa (Bấm vào mỗi cây để mở bài viết chi tiết ở tab mới)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-forest-800 bg-white px-3.5 py-2 rounded-xl border border-forest-100 shadow-sm">
            <Filter className="w-4 h-4 text-herbal-600" />
            <span>Chuyên mục độc lập</span>
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
