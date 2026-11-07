import React, { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plant, PlantCategory } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { getPlants } from '../services/apiService.ts';
import { useSEO } from '../utils/useSEO.ts';
import { Hero } from '../components/Hero.tsx';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer.tsx';
import { PlantCard } from '../components/PlantCard.tsx';
import { PlantFilterBar, FilterState, ActiveFilterPills, MobileFilterDrawer } from '../components/PlantFilterBar.tsx';
import { CollectionsShowcase } from '../components/CollectionsShowcase.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { PLANT_ENGLISH_MAP } from '../i18n/plantTranslations.ts';
import { getPlantSubcategory, getPlantsForCollection } from '../data/collections.ts';
import { getCategoryConfig } from '../config/ecosystemRegistry.ts';
import {
  Home,
  ChevronRight,
  Filter,
  Sparkles,
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
  const { t, isEn } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allPlants, setAllPlants] = useState<Plant[]>(SEED_PLANTS);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Bộ lọc thông minh cho trang danh mục
  const [filters, setFilters] = useState<FilterState>(() => {
    return {
      category: category,
      subcategory: searchParams.get('subcat') || undefined,
      tag: searchParams.get('tag') || undefined,
      collection: searchParams.get('collection') || undefined,
      sunlight: (searchParams.get('sunlight') as any) || 'all',
      watering: (searchParams.get('watering') as any) || 'all',
      difficulty: (searchParams.get('difficulty') as any) || 'all',
    };
  });

  // Khi category prop đổi, update category filter
  useEffect(() => {
    setFilters((prev) => ({ ...prev, category }));
  }, [category]);

  const handleFilterChange = (newFilters: FilterState) => {
    const updated = { ...newFilters, category };
    setFilters(updated);
    const params = new URLSearchParams();
    if (updated.subcategory) params.set('subcat', updated.subcategory);
    if (updated.tag) params.set('tag', updated.tag);
    if (updated.collection) params.set('collection', updated.collection);
    if (updated.sunlight !== 'all') params.set('sunlight', updated.sunlight);
    if (updated.watering !== 'all') params.set('watering', updated.watering);
    if (updated.difficulty !== 'all') params.set('difficulty', updated.difficulty);
    setSearchParams(params, { replace: true });
  };

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

  const catConfig = getCategoryConfig(category);
  const meta = {
    title: isEn
      ? `${catConfig.headingEn} | Yeu Trong Cay`
      : `${catConfig.headingVi} | Yêu Trồng Cây`,
    description: isEn ? catConfig.descriptionEn : catConfig.descriptionVi,
    name: isEn ? catConfig.labelEn : catConfig.labelVi,
    icon: catConfig.icon,
  };

  useSEO({
    title: meta.title,
    description: meta.description,
  });

  const categoryPlants = useMemo(() => {
    return allPlants.filter((plant) => {
      // Bắt buộc cùng category
      if (plant.category !== category) return false;

      // Lọc subcategory
      if (filters.subcategory) {
        const sub = getPlantSubcategory(plant.id);
        if (sub?.id !== filters.subcategory) return false;
      }

      // Lọc collection
      if (filters.collection) {
        const colPlants = getPlantsForCollection(filters.collection, allPlants);
        if (!colPlants.some((cp) => cp.id === plant.id)) return false;
      }

      // Lọc tag
      if (filters.tag) {
        const targetTag = filters.tag.toLowerCase();
        const enData = PLANT_ENGLISH_MAP[plant.id];
        const enTags = enData?.tags.map((t) => t.toLowerCase()) || [];
        const viTags = plant.tags.map((t) => t.toLowerCase());
        const hasTag = viTags.includes(targetTag) || enTags.includes(targetTag);
        if (!hasTag) return false;
      }

      // Lọc ánh sáng
      if (filters.sunlight !== 'all' && plant.sunlight !== filters.sunlight) return false;

      // Lọc nước tưới
      if (filters.watering !== 'all' && plant.watering !== filters.watering) return false;

      // Lọc độ khó
      if (filters.difficulty !== 'all') {
        if (filters.difficulty === 'easy' && plant.propagation_difficulty > 1) return false;
        if (filters.difficulty === 'medium' && (plant.propagation_difficulty < 2 || plant.propagation_difficulty > 3)) return false;
        if (filters.difficulty === 'hard' && plant.propagation_difficulty < 4) return false;
      }

      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      
      const enData = PLANT_ENGLISH_MAP[plant.id];
      const enCommon = enData?.common_name.toLowerCase() || '';
      const enAliases = enData?.aliases.map((a) => a.toLowerCase()) || [];
      const enTags = enData?.tags.map((t) => t.toLowerCase()) || [];

      return (
        plant.common_name.toLowerCase().includes(q) ||
        plant.scientific_name.toLowerCase().includes(q) ||
        plant.aliases.some((a) => a.toLowerCase().includes(q)) ||
        plant.tags.some((t) => t.toLowerCase().includes(q)) ||
        enCommon.includes(q) ||
        enAliases.some((a) => a.includes(q)) ||
        enTags.some((t) => t.includes(q)) ||
        (plant.medical_info?.uses.some((u) => u.toLowerCase().includes(q)) ?? false)
      );
    });
  }, [allPlants, category, filters, searchQuery]);

  const availableTags = useMemo(() => {
    const counts: Record<string, number> = {};
    const relevantPlants = allPlants.filter((p) => p.category === category);
    for (const p of relevantPlants) {
      for (const t of p.tags || []) {
        counts[t] = (counts[t] || 0) + 1;
      }
    }
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [allPlants, category]);

  const handleResetFilters = () => {
    handleFilterChange({
      category,
      subcategory: undefined,
      tag: undefined,
      collection: undefined,
      sunlight: 'all',
      watering: 'all',
      difficulty: 'all',
    });
    if (onClearSearch) onClearSearch();
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 pt-6 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="hover:text-forest-950 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" />
            <span>{t('plantDetail.breadcrumbHome')}</span>
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
      <main className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1 w-full space-y-8">
        {/* Bộ Sưu Tập Cây Trồng Theo Giải Pháp (Lọc theo category này) */}
        <CollectionsShowcase
          selectedCollectionSlug={filters.collection}
          onSelectCollection={(colSlug) => handleFilterChange({ ...filters, collection: colSlug })}
        />

        {/* Nút Mở Bộ Lọc Cho Màn Hình Di Động (< lg) */}
        <div className="lg:hidden flex items-center justify-between gap-3 p-3 bg-white dark:bg-charcoal-900 rounded-2xl border border-forest-100 dark:border-forest-800 shadow-2xs">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 text-white dark:bg-herbal-700 text-xs font-semibold shadow-xs hover:bg-forest-950 transition"
          >
            <Filter className="w-4 h-4" />
            <span>{isEn ? 'Open Filter Sidebar' : 'Mở Bộ Lọc Chuyên Mục'}</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-[11px]">
              {categoryPlants.length} {isEn ? 'plants' : 'cây'}
            </span>
          </button>
        </div>

        {/* Mobile Slide-Over Drawer */}
        <MobileFilterDrawer
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          filteredCount={categoryPlants.length}
        >
          <PlantFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            totalCount={allPlants.filter((p) => p.category === category).length}
            filteredCount={categoryPlants.length}
            onReset={handleResetFilters}
            hideCategorySelector={true}
            availableTags={availableTags}
          />
        </MobileFilterDrawer>

        {/* GIAO DIỆN 2 CỘT CHUẨN THƯƠNG MẠI ĐIỆN TỬ */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* CỘT TRÁI: BỘ LỌC SIDEBAR CỐ ĐỊNH (DESKTOP STICKY) */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain pr-1">
            <PlantFilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              totalCount={allPlants.filter((p) => p.category === category).length}
              filteredCount={categoryPlants.length}
              onReset={handleResetFilters}
              hideCategorySelector={true}
              availableTags={availableTags}
            />
          </aside>

          {/* CỘT PHẢI: NỘI DUNG SẢN PHẨM & BÁCH KHOA CÂY TRỒNG */}
          <div className="flex-1 min-w-0 space-y-6 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-forest-100 dark:border-forest-800">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-forest-900 dark:text-cream-50 tracking-tight flex items-center gap-2">
                  <span>{meta.icon}</span>
                  <span>{meta.name}</span>
                </h2>
                <p className="text-xs sm:text-sm text-forest-700 dark:text-forest-300 mt-1">
                  {isEn
                    ? `Displaying ${categoryPlants.length} standardized botanical profiles matching active filters`
                    : `Hiển thị ${categoryPlants.length} loài thực vật chuẩn hóa phù hợp bộ lọc hiện tại`}
                </p>
              </div>

              <div className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold text-forest-800 dark:text-cream-100 bg-white dark:bg-charcoal-900 px-3.5 py-2 rounded-xl border border-forest-100 dark:border-forest-800 shadow-2xs">
                <Filter className="w-4 h-4 text-herbal-600 dark:text-herbal-400" />
                <span>{isEn ? 'Independent Category' : 'Chuyên mục độc lập'}</span>
              </div>
            </div>

            {/* Thanh hiển thị các điều kiện đang lọc (Active filter chips kiểu Shopee/Tiki) */}
            <ActiveFilterPills
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              hideCategoryBadge={true}
            />

            {/* Danh Sách Bài Viết Cây Trồng */}
            {categoryPlants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {categoryPlants.map((plant) => (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    onTagClick={(tag) => handleFilterChange({ ...filters, tag })}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-charcoal-900 rounded-3xl border border-forest-100 dark:border-forest-800 p-8 max-w-md mx-auto shadow-sm">
                <Sparkles className="w-10 h-10 text-herbal-600 dark:text-herbal-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-forest-900 dark:text-cream-50 mb-1">
                  {isEn ? 'No matching plants found' : 'Không tìm thấy cây phù hợp'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  {isEn
                    ? 'Try removing some filter conditions or resetting the tags.'
                    : 'Thử bỏ bớt một số điều kiện lọc hoặc đặt lại bộ lọc để xem toàn bộ danh mục.'}
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-forest-900 dark:bg-herbal-700 text-white rounded-xl text-xs font-medium hover:bg-forest-950 transition flex items-center gap-1.5 mx-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Reset all filters' : 'Đặt lại toàn bộ bộ lọc'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
