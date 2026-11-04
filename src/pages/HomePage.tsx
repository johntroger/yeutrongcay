import React, { useMemo, useState, useEffect } from 'react';
import { Plant, PlantCategory } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { getPlants } from '../services/apiService.ts';
import { useSEO } from '../utils/useSEO.ts';
import { Hero } from '../components/Hero.tsx';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer.tsx';
import { PlantCard } from '../components/PlantCard.tsx';
import { PlantClinicSection } from '../components/PlantClinicSection.tsx';
import { PlantSwapSection } from '../components/PlantSwapSection.tsx';
import { MonetizationSection } from '../components/MonetizationSection.tsx';
import { Web3SandboxSection } from '../components/Web3SandboxSection.tsx';
import { ContactSection } from '../components/ContactSection.tsx';
import { Filter, Sparkles } from 'lucide-react';

interface HomePageProps {
  activeMode: PlantCategory;
  searchQuery: string;
  onClearSearch: () => void;
  onScrollToSection: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeMode,
  searchQuery,
  onClearSearch,
  onScrollToSection,
}) => {
  const [allPlants, setAllPlants] = useState<Plant[]>(SEED_PLANTS);

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

  // Lọc cây theo chế độ vườn đang chọn và từ khóa tìm kiếm
  const filteredPlants = useMemo(() => {
    return allPlants.filter((plant) => {
      // Khớp chế độ vườn
      const matchesCategory = plant.category === activeMode;

      // Khớp từ khóa tìm kiếm (tên, tên khoa học, tên địa phương, công dụng)
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

  // SEO / AEO / GEO Cấu hình cho từng chuyên mục
  const categorySeoInfo = {
    herb: {
      title: 'Tủ Thuốc Xanh - Thảo Dược Bản Địa Việt Nam | Yêu Trồng Cây',
      desc: 'Cẩm nang thảo dược bản địa và cây dược thực đồng nguyên: công dụng trị cảm ho, đau nhức, bồi bổ sức khỏe và cách trồng chậu ban công gia đình.',
      canonical: 'https://yeutrongcay.com/thao-duoc',
      keywords: ['thảo dược bản địa', 'cây thuốc nam', 'tủ thuốc xanh', 'húng chanh', 'đinh lăng', 'tía tô'],
    },
    fruit: {
      title: 'Trái Ngọt Phố - Cây Ăn Quả Ban Công Sân Thượng | Yêu Trồng Cây',
      desc: 'Hướng dẫn trồng cây ăn trái đô thị trong chậu: ổi lê, cóc thái, khế ngọt, lựu đỏ. Kỹ thuật ép hoa ra trái sai trĩu cành trên sân thượng.',
      canonical: 'https://yeutrongcay.com/cay-an-trai',
      keywords: ['cây ăn trái sân thượng', 'trồng cây ăn quả chậu', 'ổi lê đài loan', 'cóc thái', 'khế ngọt'],
    },
    ornamental: {
      title: 'Cây Cảnh & Bonsai Thư Thái Bản Địa | Yêu Trồng Cây',
      desc: 'Khám phá các loài cây cảnh phong thủy, bonsai bản địa và hoa thư thái: mai vàng, kim ngân, lưỡi hổ giúp thanh lọc không khí và kiến tạo không gian sống.',
      canonical: 'https://yeutrongcay.com/cay-canh',
      keywords: ['cây cảnh bản địa', 'bonsai phong thủy', 'cây lọc không khí', 'mai vàng', 'lưỡi hổ'],
    },
  }[activeMode];

  useSEO({
    title: categorySeoInfo.title,
    description: categorySeoInfo.desc,
    canonicalUrl: categorySeoInfo.canonical,
    keywords: categorySeoInfo.keywords,
    ogType: 'website',
    jsonLdSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: categorySeoInfo.title,
        description: categorySeoInfo.desc,
        url: categorySeoInfo.canonical,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: filteredPlants.slice(0, 10).map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://yeutrongcay.com/cay/${p.slug}`,
            name: p.common_name,
          })),
        },
      },
    ],
  });

  return (
    <div>
      {/* 1. Hero Section adapting to Garden Mode */}
      <Hero
        activeMode={activeMode}
        onExploreMonetization={() => onScrollToSection('monetization')}
        onOpenClinic={() => onScrollToSection('clinic')}
      />

      {/* 2. Medical Disclaimer (Always visible for Herbs) */}
      {activeMode === 'herb' && <MedicalDisclaimer />}

      {/* 3. Plants Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-forest-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 tracking-tight">
              {activeMode === 'herb'
                ? 'Danh Mục Thảo Dược & Cây Thực Phẩm'
                : activeMode === 'fruit'
                ? 'Danh Mục Cây Ăn Trái Đô Thị'
                : 'Danh Mục Cây Cảnh & Bonsai Thư Thái'}
            </h2>
            <p className="text-xs sm:text-sm text-forest-700 mt-1">
              Hiển thị {filteredPlants.length} loài thực vật bản địa chuẩn hóa (Bấm vào mỗi cây để xem bài viết chi tiết)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-forest-800 bg-white px-3.5 py-2 rounded-xl border border-forest-100 shadow-sm">
            <Filter className="w-4 h-4 text-herbal-600" />
            <span className="hidden sm:inline">Phân Loại:</span>
            <span className="capitalize">{activeMode}</span>
          </div>
        </div>

        {/* Grid display */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-forest-100 p-8 max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-forest-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-forest-900 mb-1">
              Không tìm thấy cây phù hợp
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Thử tìm kiếm với tên khác hoặc chuyển sang chế độ vườn khác.
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

      {/* 4. Plant Swap Section (Trạm Trao Đổi Cây & Hạt Giống Bản Địa) */}
      <PlantSwapSection />

      {/* 5. Plant Clinic Section (Bác sĩ cây trồng 1-chạm) */}
      <PlantClinicSection />

      {/* 6. Monetization Section (Biến đam mê thành tiền) */}
      <MonetizationSection />

      {/* 7. Web3 Sandbox Section (Trải nghiệm học tập 100% miễn phí) */}
      <Web3SandboxSection />

      {/* 8. Contact Section (Liên Hệ & Đóng Góp Tri Thức Thực Vật) */}
      <ContactSection />
    </div>
  );
};
