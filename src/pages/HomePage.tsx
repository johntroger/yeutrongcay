import React, { useMemo, useState, useEffect, useDeferredValue, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plant, PlantCategory } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { getPlants } from '../services/apiService.ts';
import { useSEO } from '../utils/useSEO.ts';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer.tsx';
import { PlantCard } from '../components/PlantCard.tsx';
import { PlantListItem } from '../components/PlantListItem.tsx';
import { PlantFilterBar, FilterState, ActiveFilterPills, MobileFilterDrawer } from '../components/PlantFilterBar.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';
import { PLANT_ENGLISH_MAP } from '../i18n/plantTranslations.ts';
import { getPlantSubcategory, getPlantsForCollection } from '../data/collections.ts';
import { matchPlantSearch, calculateRelevance } from '../utils/searchUtils.ts';
import { interleaveMarketplaceItems, getCategoryConfig, getAllEcosystemCategories } from '../config/ecosystemRegistry.ts';
import { plantReviewService } from '../services/plantReviewService.ts';
import {
  Filter,
  Sparkles,
  MapPin,
  Stethoscope,
  Coins,
  MessageCircle,
  ArrowUpRight,
  Calendar,
  ShieldCheck,
  RotateCcw,
  ChevronDown,
  Check,
  ArrowUpDown,
  LayoutGrid,
  List,
  X
} from 'lucide-react';

export type SortOption = 'default' | 'hearts' | 'easy' | 'name_asc' | 'drought' | 'newest';

const SORT_OPTIONS: { id: SortOption; labelVi: string; labelEn: string; icon: string }[] = [
  { id: 'default', labelVi: 'Mặc định (Tuyển chọn)', labelEn: 'Curated (Default)', icon: '⚡' },
  { id: 'hearts', labelVi: 'Được yêu thích nhất', labelEn: 'Most Loved (Hearts)', icon: '❤️' },
  { id: 'easy', labelVi: 'Dễ trồng nhất (1/5 sao)', labelEn: 'Easiest to Grow (1/5)', icon: '🌱' },
  { id: 'name_asc', labelVi: 'Tên thực vật A → Z', labelEn: 'Name (A → Z)', icon: '🔤' },
  { id: 'drought', labelVi: 'Ít tốn công tưới (Chịu hạn)', labelEn: 'Drought Tolerant', icon: '💧' },
  { id: 'newest', labelVi: 'Mới cập nhật gần đây', labelEn: 'Recently Added', icon: '⏱️' },
];

interface HomePageProps {
  activeMode: PlantCategory;
  onModeChange?: (mode: PlantCategory) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onScrollToSection?: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  activeMode,
  onModeChange,
  searchQuery,
  onClearSearch,
}) => {
  const { t, isEn } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allPlants, setAllPlants] = useState<Plant[]>(SEED_PLANTS);
  const [visibleCount, setVisibleCount] = useState(9);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Bộ lọc đa tiêu chí đồng bộ URL (Mặc định 'all' cho sàn thương mại điện tử 7 ngành hàng)
  const [filters, setFilters] = useState<FilterState>(() => {
    const urlCat = searchParams.get('cat') as PlantCategory | null;
    return {
      category: urlCat || 'all',
      subcategory: searchParams.get('subcat') || undefined,
      tag: searchParams.get('tag') || undefined,
      collection: searchParams.get('collection') || undefined,
      sunlight: (searchParams.get('sunlight') as any) || 'all',
      watering: (searchParams.get('watering') as any) || 'all',
      difficulty: (searchParams.get('difficulty') as any) || 'all',
    };
  });

  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    try {
      return (localStorage.getItem('ytc_plant_view_mode') as 'grid' | 'list') || 'grid';
    } catch {
      return 'grid';
    }
  });

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    try {
      localStorage.setItem('ytc_plant_view_mode', mode);
    } catch {}
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sidebar phản hồi tức thì; lưới sản phẩm lọc ở mức ưu tiên thấp để không bị giật
  const deferredFilters = useDeferredValue(filters);
  const isGridStale = deferredFilters !== filters;

  // Đồng bộ URL khi filters thay đổi
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.category !== 'all') params.set('cat', newFilters.category);
    if (newFilters.subcategory) params.set('subcat', newFilters.subcategory);
    if (newFilters.tag) params.set('tag', newFilters.tag);
    if (newFilters.collection) params.set('collection', newFilters.collection);
    if (newFilters.sunlight !== 'all') params.set('sunlight', newFilters.sunlight);
    if (newFilters.watering !== 'all') params.set('watering', newFilters.watering);
    if (newFilters.difficulty !== 'all') params.set('difficulty', newFilters.difficulty);
    setSearchParams(params, { replace: true });

    if (newFilters.category !== 'all' && newFilters.category !== activeMode) {
      onModeChange?.(newFilters.category);
    }
  };

  // Đồng bộ khi activeMode đổi từ Navbar
  useEffect(() => {
    setFilters((prev) => (prev.category === activeMode ? prev : { ...prev, category: activeMode }));
    setVisibleCount(9);
  }, [activeMode]);

  // Đọc params từ URL khi mount hoặc điều hướng
  useEffect(() => {
    const tag = searchParams.get('tag') || undefined;
    const collection = searchParams.get('collection') || undefined;
    const subcat = searchParams.get('subcat') || undefined;
    if (tag || collection || subcat) {
      setFilters((prev) => ({
        ...prev,
        tag: tag ?? prev.tag,
        collection: collection ?? prev.collection,
        subcategory: subcat ?? prev.subcategory,
      }));
    }
  }, [searchParams]);

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

  // Danh sách chuyên mục hệ sinh thái động (Tự động mở rộng khi có category mới)
  const [extraCategoryRevision, setExtraCategoryRevision] = useState(0);

  useEffect(() => {
    const handleCategoryUpdate = () => {
      setExtraCategoryRevision((prev) => prev + 1);
    };
    window.addEventListener('ytc_ecosystem_categories_updated', handleCategoryUpdate);
    return () => {
      window.removeEventListener('ytc_ecosystem_categories_updated', handleCategoryUpdate);
    };
  }, []);

  const ecosystemCategories = useMemo(() => {
    return getAllEcosystemCategories(allPlants);
  }, [allPlants, extraCategoryRevision]);

  const horizontalFilterCategories = useMemo(() => {
    return [
      {
        id: 'all',
        label: isEn ? `All Categories (${ecosystemCategories.length})` : `Tất Cả ${ecosystemCategories.length} Ngành Hàng`,
        icon: '🌿',
        count: allPlants.length,
      },
      ...ecosystemCategories.map((cat) => ({
        id: cat.id,
        label: isEn ? (cat.shortLabelEn || cat.labelEn) : (cat.shortLabelVi || cat.labelVi),
        icon: cat.icon,
        count: allPlants.filter((p) => p.category === cat.id).length,
      })),
    ];
  }, [ecosystemCategories, allPlants, isEn]);

  // Lọc cây đa chiều: Category, Subcategory, Collection, Tag, Điều kiện sinh trưởng, Tìm kiếm
  const filteredPlants = useMemo(() => {
    const hasSearchQuery = Boolean(searchQuery.trim());

    const matched = allPlants.filter((plant) => {
      // 1. Lọc theo từ khóa tìm kiếm (Khi người dùng gõ tìm kiếm, tìm thông minh xuyên suốt toàn bộ kho cây)
      if (hasSearchQuery) {
        if (!matchPlantSearch(plant, searchQuery)) {
          return false;
        }
      } else {
        // Khi KHÔNG có từ khóa tìm kiếm, lọc theo Category được chọn
        if (deferredFilters.category !== 'all' && plant.category !== deferredFilters.category) {
          return false;
        }
      }

      // 2. Lọc theo Subcategory
      if (deferredFilters.subcategory) {
        const sub = getPlantSubcategory(plant.id);
        if (sub?.id !== deferredFilters.subcategory) {
          return false;
        }
      }

      // 3. Lọc theo Collection (Bộ sưu tập)
      if (deferredFilters.collection) {
        const colPlants = getPlantsForCollection(deferredFilters.collection, allPlants);
        if (!colPlants.some((cp) => cp.id === plant.id)) {
          return false;
        }
      }

      // 4. Lọc theo Thẻ Tag
      if (deferredFilters.tag) {
        const targetTag = deferredFilters.tag.toLowerCase();
        const enData = PLANT_ENGLISH_MAP[plant.id];
        const enTags = enData?.tags.map((t) => t.toLowerCase()) || [];
        const viTags = plant.tags.map((t) => t.toLowerCase());
        const hasTag = viTags.includes(targetTag) || enTags.includes(targetTag);
        if (!hasTag) return false;
      }

      // 5. Lọc theo Ánh sáng
      if (deferredFilters.sunlight !== 'all' && plant.sunlight !== deferredFilters.sunlight) {
        return false;
      }

      // 6. Lọc theo Lịch tưới
      if (deferredFilters.watering !== 'all' && plant.watering !== deferredFilters.watering) {
        return false;
      }

      // 7. Lọc theo Độ khó
      if (deferredFilters.difficulty !== 'all') {
        if (deferredFilters.difficulty === 'easy' && plant.propagation_difficulty > 1) return false;
        if (deferredFilters.difficulty === 'medium' && (plant.propagation_difficulty < 2 || plant.propagation_difficulty > 3)) return false;
        if (deferredFilters.difficulty === 'hard' && plant.propagation_difficulty < 4) return false;
      }

      return true;
    });

    // Sắp xếp và phân bổ kết quả
    if (hasSearchQuery) {
      matched.sort((a, b) => calculateRelevance(b, searchQuery) - calculateRelevance(a, searchQuery));
      return matched;
    }

    // Lọc theo độ yêu thích (Trái Tim Đỏ cao nhất lên đầu)
    if (sortBy === 'hearts') {
      matched.sort((a, b) => {
        const sa = plantReviewService.getCachedSummary(a.slug);
        const sb = plantReviewService.getCachedSummary(b.slug);
        const scoreA = sa.total_reviews > 0 ? sa.average_hearts * 100 + sa.total_reviews : 0;
        const scoreB = sb.total_reviews > 0 ? sb.average_hearts * 100 + sb.total_reviews : 0;
        return scoreB - scoreA;
      });
      return matched;
    }

    // Dễ trồng nhất (Độ khó 1/5 sao lên đầu)
    if (sortBy === 'easy') {
      matched.sort((a, b) => {
        const diffA = a.propagation_difficulty || 1;
        const diffB = b.propagation_difficulty || 1;
        return diffA - diffB;
      });
      return matched;
    }

    // Tên thực vật A -> Z
    if (sortBy === 'name_asc') {
      matched.sort((a, b) => {
        const nameA = isEn ? (a.common_name_en || a.common_name) : a.common_name;
        const nameB = isEn ? (b.common_name_en || b.common_name) : b.common_name;
        return nameA.localeCompare(nameB, isEn ? 'en' : 'vi');
      });
      return matched;
    }

    // Ít tốn công tưới nước (Chịu hạn tốt)
    if (sortBy === 'drought') {
      const waterScore = (w: string) => (w === 'drought_tolerant' ? 1 : w === 'moderate' ? 2 : 3);
      matched.sort((a, b) => waterScore(a.watering) - waterScore(b.watering));
      return matched;
    }

    // Mới cập nhật gần đây
    if (sortBy === 'newest') {
      matched.sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }));
      return matched;
    }

    // Khi duyệt Tất Cả: Áp dụng thuật toán Smart Marketplace Interleaving trộn đều 7 ngành hàng
    if (deferredFilters.category === 'all') {
      return interleaveMarketplaceItems(matched);
    }

    return matched;
  }, [allPlants, deferredFilters, searchQuery, sortBy, isEn]);

  // Danh sách tags có sẵn kèm số lượng bài viết
  const availableTags = useMemo(() => {
    const counts: Record<string, number> = {};
    const relevantPlants = filters.category === 'all'
      ? allPlants
      : allPlants.filter((p) => p.category === filters.category);

    for (const p of relevantPlants) {
      for (const t of p.tags || []) {
        counts[t] = (counts[t] || 0) + 1;
      }
    }
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [allPlants, filters.category]);

  const handleResetFilters = () => {
    handleFilterChange({
      category: 'all',
      subcategory: undefined,
      tag: undefined,
      collection: undefined,
      sunlight: 'all',
      watering: 'all',
      difficulty: 'all',
    });
    onClearSearch();
  };

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
    space: {
      path: '/khong-gian-xanh',
      name: isEn ? 'Urban Growing Spaces' : 'Không Gian Trồng Phố',
    },
    recycle: {
      path: '/sang-che-tai-che',
      name: isEn ? 'Upcycled Garden DIY' : 'Tái Chế Làm Vườn',
    },
    culinary: {
      path: '/am-thuc-duoc-thien',
      name: isEn ? 'Herbal Kitchen & Drinks' : 'Ẩm Thực & Đồ Uống Xanh',
    },
    forest: {
      path: '/vuon-quoc-gia',
      name: isEn ? 'Natural Forests & Eco-Zones' : 'Rừng & Khu Sinh Thái',
    },
  };

  const currentSortOption = useMemo(() => {
    return SORT_OPTIONS.find((s) => s.id === sortBy) || SORT_OPTIONS[0];
  }, [sortBy]);

  const activeCategoryItem = useMemo(() => {
    if (filters.category === 'all') {
      return {
        id: 'all',
        label: isEn ? 'All Categories' : 'Tất Cả Chuyên Mục',
        icon: '🌿',
        count: allPlants.length,
      };
    }
    const found = horizontalFilterCategories.find((c) => c.id === filters.category);
    if (found) return found;
    const cfg = getCategoryConfig(filters.category as PlantCategory);
    return {
      id: filters.category,
      label: isEn ? cfg.labelEn : cfg.labelVi,
      icon: cfg.icon,
      count: allPlants.filter((p) => p.category === filters.category).length,
    };
  }, [filters.category, horizontalFilterCategories, allPlants, isEn]);

  const hasActiveFilters = Boolean(
    filters.category !== 'all' ||
    filters.difficulty !== 'all' ||
    filters.sunlight !== 'all' ||
    filters.watering !== 'all' ||
    filters.tag ||
    filters.subcategory ||
    filters.collection ||
    sortBy !== 'default' ||
    searchQuery.trim()
  );

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
      {/* Plants Catalog Grid with Smart Filter */}
      <main className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full space-y-8">
        {/* Nút Mở Bộ Lọc Cho Màn Hình Di Động (< lg) */}
        <div className="lg:hidden flex items-center justify-between gap-3 p-3 bg-white dark:bg-charcoal-900 rounded-2xl border border-forest-100 dark:border-forest-800 shadow-2xs">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 text-white dark:bg-herbal-700 text-xs font-semibold shadow-xs hover:bg-forest-950 transition"
          >
            <Filter className="w-4 h-4" />
            <span>{isEn ? 'Open Filter Sidebar' : 'Mở Bộ Lọc Cây Trồng'}</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-[11px]">
              {filteredPlants.length} {isEn ? 'plants' : 'cây'}
            </span>
          </button>
        </div>

        {/* Mobile Slide-Over Drawer */}
        <MobileFilterDrawer
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          filteredCount={filteredPlants.length}
        >
          <PlantFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            totalCount={allPlants.length}
            plants={allPlants}
            filteredCount={filteredPlants.length}
            onReset={handleResetFilters}
            availableTags={availableTags}
          />
        </MobileFilterDrawer>

        {/* Horizontal Category Shelf (Cơ Chế Động Theo Hệ Thống Chuyên Mục) */}
        <div className="mb-6 -mt-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {horizontalFilterCategories.map((catItem) => {
              const isSelected = filters.category === catItem.id;
              return (
                <button
                  key={catItem.id}
                  type="button"
                  onClick={() => handleFilterChange({ ...filters, category: catItem.id as any, subcategory: undefined })}
                  className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-forest-900 text-white dark:bg-emerald-600 border-forest-900 dark:border-emerald-500 shadow-sm scale-102'
                      : 'bg-white dark:bg-charcoal-900 text-forest-800 dark:text-forest-200 border-forest-100 dark:border-forest-800 hover:border-forest-300 dark:hover:border-forest-700'
                  }`}
                >
                  <span>{catItem.icon}</span>
                  <span>{catItem.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-forest-100 dark:bg-charcoal-800 text-forest-600 dark:text-forest-400'}`}>
                    {catItem.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* GIAO DIỆN 2 CỘT CHUẨN THƯƠNG MẠI ĐIỆN TỬ: TRÁI LÀ BỘ LỌC, PHẢI LÀ NỘI DUNG */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* CỘT TRÁI: BỘ LỌC SIDEBAR CỐ ĐỊNH (DESKTOP STICKY) */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain pr-1">
            <PlantFilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              totalCount={allPlants.length}
            plants={allPlants}
              filteredCount={filteredPlants.length}
              onReset={handleResetFilters}
              availableTags={availableTags}
            />
          </aside>

          {/* CỘT PHẢI: NỘI DUNG SẢN PHẨM & BÁCH KHOA CÂY TRỒNG */}
          <div id="search-results" className="flex-1 min-w-0 space-y-6 w-full">
            {/* Tiêu đề & Thống kê kết quả lọc */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-forest-100 dark:border-forest-800">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-forest-900 dark:text-cream-50 tracking-tight">
                  {filters.category === 'all'
                    ? isEn ? `Comprehensive Botanical & Eco Marketplace (${allPlants.length} Publications)` : `Sàn Tri Thức & Bách Khoa Sinh Thái (${allPlants.length} Ấn Phẩm)`
                    : (() => {
                        const c = getCategoryConfig(filters.category as PlantCategory);
                        const count = allPlants.filter(p => p.category === filters.category).length;
                        return isEn ? `${c.headingEn} (${count})` : `${c.headingVi} (${count})`;
                      })()}
                </h2>
                <p className="text-xs sm:text-sm text-forest-700 dark:text-forest-300 mt-1">
                  {searchQuery
                    ? isEn
                      ? `Found ${filteredPlants.length} plants matching "${searchQuery}"`
                      : `Tìm thấy ${filteredPlants.length} cây phù hợp từ khóa "${searchQuery}"`
                    : isEn
                    ? `Showing ${displayedPlants.length} of ${filteredPlants.length} curated publications matching active filters`
                    : `Hiển thị ${displayedPlants.length} / ${filteredPlants.length} ấn phẩm tuyển chọn phù hợp bộ lọc hiện tại`}
                </p>
              </div>

              {/* Toolbar điều khiển: Chuyên mục nhanh, Sắp xếp thông minh, Chuyển Grid/List */}
              <div className="self-start sm:self-auto flex items-center gap-2 flex-wrap">
                {/* 1. Interactive Category Dropdown */}
                <div ref={categoryDropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryDropdownOpen((prev) => !prev);
                      setIsSortDropdownOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer border shadow-2xs ${
                      isCategoryDropdownOpen || filters.category !== 'all'
                        ? 'bg-forest-900 text-white dark:bg-emerald-700 border-forest-900 dark:border-emerald-600'
                        : 'bg-white dark:bg-charcoal-900 text-forest-800 dark:text-cream-100 border-forest-100 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-800'
                    }`}
                    title={isEn ? 'Filter by category' : 'Chọn chuyên mục tra cứu'}
                  >
                    <Filter className="w-3.5 h-3.5 text-herbal-400 shrink-0" />
                    <span className="hidden md:inline text-forest-300 dark:text-forest-200 font-normal">
                      {t('common.category')}:
                    </span>
                    <span className="flex items-center gap-1 font-bold">
                      <span>{activeCategoryItem.icon}</span>
                      <span>{activeCategoryItem.label}</span>
                      <span className="text-[10px] opacity-80">({activeCategoryItem.count})</span>
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCategoryDropdownOpen && (
                    <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-72 max-h-96 overflow-y-auto bg-white dark:bg-charcoal-900 rounded-2xl shadow-xl border border-forest-100 dark:border-forest-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-forest-500 dark:text-forest-400 border-b border-forest-100 dark:border-forest-800 flex items-center justify-between">
                        <span>{isEn ? 'Categories' : 'Chuyên Mục Hệ Sinh Thái'}</span>
                        <span className="text-[10px] lowercase font-normal">{allPlants.length} {isEn ? 'plants' : 'loài cây'}</span>
                      </div>
                      {horizontalFilterCategories.map((cat) => {
                        const isSelected = filters.category === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              handleFilterChange({ ...filters, category: cat.id as any, subcategory: undefined });
                              setIsCategoryDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition cursor-pointer ${
                              isSelected
                                ? 'bg-forest-50 dark:bg-charcoal-800 font-bold text-forest-950 dark:text-cream-50'
                                : 'text-forest-800 dark:text-cream-200 hover:bg-forest-50/70 dark:hover:bg-charcoal-800/70'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-base">{cat.icon}</span>
                              <span>{cat.label}</span>
                            </span>
                            <span className="flex items-center gap-2">
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-forest-100 dark:bg-charcoal-700 text-forest-700 dark:text-forest-300 font-mono">
                                {cat.count}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. Interactive Sort Dropdown */}
                <div ref={sortDropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSortDropdownOpen((prev) => !prev);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border shadow-2xs ${
                      sortBy !== 'default'
                        ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 font-bold'
                        : 'bg-white dark:bg-charcoal-900 text-forest-800 dark:text-cream-100 border-forest-100 dark:border-forest-800 hover:bg-forest-50'
                    }`}
                    title={isEn ? 'Sort plants' : 'Sắp xếp danh sách cây'}
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="hidden md:inline text-forest-400 dark:text-forest-300 font-normal">
                      {isEn ? 'Sort:' : 'Sắp xếp:'}
                    </span>
                    <span>{currentSortOption.icon} {isEn ? currentSortOption.labelEn : currentSortOption.labelVi}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isSortDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-charcoal-900 rounded-2xl shadow-xl border border-forest-100 dark:border-forest-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-forest-500 dark:text-forest-400 border-b border-forest-100 dark:border-forest-800">
                        {isEn ? 'Sort Publications By' : 'Tiêu Chí Sắp Xếp'}
                      </div>
                      {SORT_OPTIONS.map((opt) => {
                        const isSelected = sortBy === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSortBy(opt.id);
                              setIsSortDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition cursor-pointer ${
                              isSelected
                                ? 'bg-rose-50 dark:bg-rose-950/50 font-bold text-rose-700 dark:text-rose-300'
                                : 'text-forest-800 dark:text-cream-200 hover:bg-forest-50/70 dark:hover:bg-charcoal-800/70'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{opt.icon}</span>
                              <span>{isEn ? opt.labelEn : opt.labelVi}</span>
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3. View Mode Switcher: Grid vs List */}
                <div className="flex items-center bg-forest-100/70 dark:bg-charcoal-800 p-0.5 rounded-xl border border-forest-200/80 dark:border-forest-700">
                  <button
                    type="button"
                    onClick={() => handleViewModeChange('grid')}
                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-charcoal-900 text-forest-950 dark:text-cream-50 shadow-2xs font-bold'
                        : 'text-forest-600 dark:text-forest-400 hover:text-forest-900'
                    }`}
                    title={isEn ? 'Grid view' : 'Xem dạng lưới thẻ'}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleViewModeChange('list')}
                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-charcoal-900 text-forest-950 dark:text-cream-50 shadow-2xs font-bold'
                        : 'text-forest-600 dark:text-forest-400 hover:text-forest-900'
                    }`}
                    title={isEn ? 'List view' : 'Xem dạng danh sách tra cứu'}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Thanh phím lọc nhanh 1-Click (Quick Filter Chips) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs -mt-2">
              <span className="text-[11px] font-semibold text-forest-600 dark:text-forest-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{isEn ? 'Quick filters:' : 'Lọc nhanh:'}</span>
              </span>

              {/* Chip 1: Dễ trồng nhất (1/5) */}
              <button
                type="button"
                onClick={() => handleFilterChange({
                  ...filters,
                  difficulty: filters.difficulty === 'easy' ? 'all' : 'easy'
                })}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer ${
                  filters.difficulty === 'easy'
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                    : 'bg-white dark:bg-charcoal-900 text-forest-800 dark:text-forest-200 border-forest-200 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-800'
                }`}
              >
                <span>🌱</span>
                <span>{isEn ? 'Easy (1/5)' : 'Dễ trồng (1/5)'}</span>
                {filters.difficulty === 'easy' && <X className="w-3 h-3" />}
              </button>

              {/* Chip 2: Ưa râm / Trong nhà */}
              <button
                type="button"
                onClick={() => handleFilterChange({
                  ...filters,
                  sunlight: filters.sunlight === 'partial_shade' ? 'all' : 'partial_shade'
                })}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer ${
                  filters.sunlight === 'partial_shade'
                    ? 'bg-amber-600 text-white border-amber-700 shadow-2xs'
                    : 'bg-white dark:bg-charcoal-900 text-forest-800 dark:text-forest-200 border-forest-200 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-800'
                }`}
              >
                <span>🌤️</span>
                <span>{isEn ? 'Shade / Indoor' : 'Ưa râm / Bán râm'}</span>
                {filters.sunlight === 'partial_shade' && <X className="w-3 h-3" />}
              </button>

              {/* Chip 3: Chịu hạn / Ít tưới */}
              <button
                type="button"
                onClick={() => handleFilterChange({
                  ...filters,
                  watering: filters.watering === 'drought_tolerant' ? 'all' : 'drought_tolerant'
                })}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer ${
                  filters.watering === 'drought_tolerant'
                    ? 'bg-cyan-600 text-white border-cyan-700 shadow-2xs'
                    : 'bg-white dark:bg-charcoal-900 text-forest-800 dark:text-forest-200 border-forest-200 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-800'
                }`}
              >
                <span>💧</span>
                <span>{isEn ? 'Low Water' : 'Chịu hạn tốt'}</span>
                {filters.watering === 'drought_tolerant' && <X className="w-3 h-3" />}
              </button>

              {/* Chip 4: Đã cấp Hộ Chiếu NFT */}
              <button
                type="button"
                onClick={() => handleFilterChange({
                  ...filters,
                  tag: filters.tag === 'Hộ Chiếu NFT' ? undefined : 'Hộ Chiếu NFT'
                })}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border cursor-pointer ${
                  filters.tag === 'Hộ Chiếu NFT'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-800 shadow-2xs'
                    : 'bg-white dark:bg-charcoal-900 text-forest-800 dark:text-forest-200 border-forest-200 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-800'
                }`}
              >
                <span>🛡️</span>
                <span>{isEn ? 'NFT Passport' : 'Có Hộ Chiếu NFT'}</span>
                {filters.tag === 'Hộ Chiếu NFT' && <X className="w-3 h-3" />}
              </button>

              {/* Nút đặt lại nhanh nếu có bộ lọc nào đang bật */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition flex items-center gap-1 cursor-pointer ml-auto"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isEn ? 'Reset all' : 'Đặt lại'}</span>
                </button>
              )}
            </div>

            {/* Thanh hiển thị các điều kiện đang lọc (Active filter chips kiểu Shopee/Tiki) */}
            <ActiveFilterPills
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />

            {/* Grid hoặc Danh Sách hiển thị sản phẩm cây trồng */}
            {displayedPlants.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[50vh] content-start transition-opacity duration-200 ${isGridStale ? 'opacity-60' : 'opacity-100'}`}>
                    {displayedPlants.map((plant) => (
                      <PlantCard
                        key={plant.id}
                        plant={plant}
                        onTagClick={(tag) => handleFilterChange({ ...filters, tag })}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={`space-y-3 min-h-[50vh] transition-opacity duration-200 ${isGridStale ? 'opacity-60' : 'opacity-100'}`}>
                    {displayedPlants.map((plant) => (
                      <PlantListItem
                        key={plant.id}
                        plant={plant}
                        onTagClick={(tag) => handleFilterChange({ ...filters, tag })}
                        isEn={isEn}
                      />
                    ))}
                  </div>
                )}

                {/* Thanh điều hướng xem thêm & mở toàn bộ bách khoa sang tab mới */}
                {!searchQuery && (
                  <div className="mt-8 p-6 rounded-3xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-900 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
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

                      {filters.category !== 'all' && (
                        <Link
                          to={categoryInfoMap[filters.category].path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-forest-900 hover:bg-forest-950 text-white text-xs font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5"
                        >
                          <span>{isEn ? 'Open Full Category (New Tab)' : 'Mở Toàn Bộ Chuyên Mục (Tab Mới)'}</span>
                          <ArrowUpRight className="w-4 h-4 text-herbal-400" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-charcoal-900 rounded-3xl border border-forest-100 dark:border-forest-800 p-8 max-w-md mx-auto shadow-sm">
                <Sparkles className="w-10 h-10 text-herbal-600 dark:text-herbal-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-forest-900 dark:text-cream-50 mb-1">
                  {isEn ? 'No matching plants found' : 'Không tìm thấy cây phù hợp bộ lọc'}
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

      {/* 3. Hệ Sinh Thái Tính Năng Riêng Biệt (Mở Tab Mới Giải Phóng Trang Chủ) */}
      <section className="bg-forest-900 text-white py-14 border-t border-forest-800">
        <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Box 1: Lịch Nông Vụ Đô Thị 3 Miền */}
            <Link
              to="/lich-nong-vu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-forest-950/80 border border-teal-500/50 hover:border-teal-400 hover:bg-forest-950 transition group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3.5">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-white group-hover:text-teal-300 transition">
                  {isEn ? 'Seasonal Calendar' : 'Lịch Nông Vụ 3 Miền'}
                </h3>
                <p className="text-xs text-forest-300/80 mt-1 leading-relaxed">
                  {isEn
                    ? '12-month urban farming timetable for North, Central, and South Vietnam with weather and pest alerts.'
                    : 'Thời khóa biểu gieo trồng 12 tháng chuẩn tiết khí 3 miền Bắc - Trung - Nam, lịch tưới & phòng trừ sâu bệnh.'}
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-forest-800/80 flex items-center justify-between text-xs font-semibold text-teal-400">
                <span>{isEn ? 'Open Calendar' : 'Xem Lịch Nông Vụ'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>

            {/* Box 2: Vườn Số Của Tôi (MS4) */}
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

            {/* Box 3: Bác sĩ cây trồng AI */}
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

            {/* Box 4: Trạm Đổi Cây */}
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

            {/* Box 5: Web3 Sandbox & Hộ Chiếu Cây Trồng (MS8) */}
            <Link
              to="/web3-sandbox"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-3xl bg-forest-950/80 border border-orange-500/50 hover:border-orange-400 hover:bg-forest-950 transition group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-orange-300 transition">
                    {isEn ? 'Web3 & Plant Passport' : 'Hộ Chiếu Cây & Web3'}
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-orange-600 text-white">MS8</span>
                </div>
                <p className="text-xs text-forest-300/80 mt-1 leading-relaxed">
                  {isEn
                    ? 'Digital plant passport studio with SHA-256 photo hash and smart contract escrow on Testnet.'
                    : 'Đúc hộ chiếu thực vật số, mã băm SHA-256 bảo vệ nguồn gen và mô phỏng Smart Contract trên Testnet.'}
                </p>
              </div>
              <div className="pt-3.5 mt-3.5 border-t border-forest-800/80 flex items-center justify-between text-xs font-semibold text-orange-400">
                <span>{isEn ? 'Open Web3 Studio' : 'Vào Web3 Sandbox'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>

            {/* Box 6: Kiếm Tiền Từ Vườn */}
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

            {/* Box 7: Kênh Liên Hệ & Hợp Tác */}
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

      {/* 4. Tuyên Bố Miễn Trừ Y Tế & An Toàn Thảo Dược Bản Địa (Dưới Cùng Trang Chủ) */}
      <div className="py-2">
        <MedicalDisclaimer />
      </div>
    </div>
  );
};
