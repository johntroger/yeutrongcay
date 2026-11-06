import React, { useState } from 'react';
import { PlantCategory } from '../types/index.ts';
import { SUBCATEGORIES } from '../data/collections.ts';
import { allPlants as seedPlants } from '../data/plants.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  Filter,
  Sun,
  Droplets,
  Award,
  RotateCcw,
  ChevronDown,
  X,
  Tag,
  SlidersHorizontal,
  Check
} from 'lucide-react';

export interface FilterState {
  category: PlantCategory | 'all';
  subcategory?: string;
  sunlight: 'all' | 'full_sun' | 'partial_shade' | 'indoor';
  watering: 'all' | 'daily' | 'moderate' | 'drought_tolerant';
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
  tag?: string;
  collection?: string;
}

export interface PlantFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
  onReset: () => void;
  hideCategorySelector?: boolean;
  availableTags?: { tag: string; count: number }[];
  plants?: { category: string }[];
}

// Danh sách tags mặc định nếu chưa có tags tính toán
const DEFAULT_TAGS = [
  'Dễ trồng chậu',
  'Trị ho',
  'Lọc không khí',
  'Chịu hạn',
  'Cực sai quả',
  'Phong thủy',
  'Trà thảo mộc',
  'Đuổi muỗi',
  'Bonsai',
  'Thanh nhiệt',
  'Giải cảm',
  'Trẻ nhỏ',
  'Bổ khí huyết',
  'Sân thượng'
];

// Khối thu/gọn mượt mà (animate chiều cao bằng grid-template-rows)
const Collapse: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => (
  <div
    aria-hidden={!open}
    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
    }`}
  >
    <div className={`min-h-0 overflow-hidden transition-[visibility] duration-300 ${open ? 'visible' : 'invisible'}`}>
      {children}
    </div>
  </div>
);

export const PlantFilterBar: React.FC<PlantFilterBarProps> = ({
  filters,
  onFilterChange,
  totalCount,
  filteredCount,
  onReset,
  hideCategorySelector = false,
  availableTags = [],
  plants = seedPlants
}) => {
  const { isEn } = useLanguage();

  // Collapsible sections
  const [openSections, setOpenSections] = useState({
    categories: true,
    subcategories: true,
    growingConditions: true,
    tags: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Subcategories applicable to current category
  const applicableSubcategories = React.useMemo(() => {
    if (filters.category === 'all') {
      return SUBCATEGORIES;
    }
    return SUBCATEGORIES.filter((s) => s.category === filters.category);
  }, [filters.category]);

  // Tags list
  const displayTags = React.useMemo(() => {
    if (availableTags && availableTags.length > 0) {
      return availableTags.slice(0, 16);
    }
    return DEFAULT_TAGS.map((t) => ({ tag: t, count: 0 }));
  }, [availableTags]);

  const hasActiveFilters =
    (filters.category !== 'all' && !hideCategorySelector) ||
    Boolean(filters.subcategory) ||
    filters.sunlight !== 'all' ||
    filters.watering !== 'all' ||
    filters.difficulty !== 'all' ||
    Boolean(filters.tag) ||
    Boolean(filters.collection);

  // Filter content component reused between desktop sidebar and mobile drawer
  return (
    <div className="w-full bg-white dark:bg-charcoal-900 rounded-2xl border border-forest-100 dark:border-forest-800 shadow-sm overflow-hidden flex flex-col">
      {/* 1. Header: Title, Matches Count & Reset */}
      <div className="p-4 sm:p-5 bg-forest-50/70 dark:bg-charcoal-800/80 border-b border-forest-100 dark:border-forest-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-herbal-100 dark:bg-herbal-950/80 text-herbal-700 dark:text-herbal-400 flex items-center justify-center shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold text-forest-950 dark:text-cream-50 leading-tight">
              {isEn ? 'Filter Options' : 'Bộ Lọc Bách Khoa'}
            </h3>
            <p className="text-[11px] text-forest-700 dark:text-forest-400 mt-0.5">
              {isEn ? 'Showing ' : 'Tìm thấy: '}
              <span className="font-bold text-herbal-700 dark:text-herbal-400">{filteredCount}</span>
              {' / '}{totalCount} {isEn ? 'plants' : 'loài cây'}
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300 transition shrink-0"
            title={isEn ? 'Reset all filters' : 'Xóa tất cả điều kiện lọc'}
          >
            <RotateCcw className="w-3 h-3" />
            <span>{isEn ? 'Reset' : 'Đặt lại'}</span>
          </button>
        )}
      </div>

      <div className="divide-y divide-forest-100/70 dark:divide-forest-800/80 p-4 sm:p-5 space-y-5">
        {/* 2. Danh Mục Chính (Categories) */}
        {!hideCategorySelector && (
          <div>
            <button
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-cream-100 mb-3 hover:text-herbal-600 transition"
            >
              <span className="flex items-center gap-2">
                <span>📁</span>
                <span>{isEn ? 'Plant Category' : 'Danh Mục Cây Trồng'}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-forest-400 transition-transform duration-200 ${
                  openSections.categories ? 'rotate-180' : ''
                }`}
              />
            </button>

            <Collapse open={openSections.categories}>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: isEn ? 'All Categories' : 'Tất Cả Danh Mục', icon: '🌿', count: plants.length },
                  { id: 'herb', label: isEn ? 'Native Medicinal Herbs' : 'Thảo Dược Bản Địa', icon: '🌱', count: plants.filter((p) => p.category === 'herb').length },
                  { id: 'fruit', label: isEn ? 'Balcony Fruit Trees' : 'Cây Ăn Trái Ban Công', icon: '🍋', count: plants.filter((p) => p.category === 'fruit').length },
                  { id: 'ornamental', label: isEn ? 'Ornamentals & Bonsai' : 'Cây Cảnh & Bonsai', icon: '🌸', count: plants.filter((p) => p.category === 'ornamental').length }
                ].map((cat) => {
                  const isSelected = filters.category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => onFilterChange({ ...filters, category: cat.id as any, subcategory: undefined })}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between group ${
                        isSelected
                          ? 'bg-forest-900 text-white dark:bg-herbal-700 shadow-sm font-semibold'
                          : 'text-forest-800 dark:text-forest-200 hover:bg-forest-50 dark:hover:bg-charcoal-800'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{cat.icon}</span>
                        <span className="truncate">{cat.label}</span>
                      </span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-forest-100/70 dark:bg-charcoal-800 text-forest-700 dark:text-forest-400 group-hover:bg-forest-200/60'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Collapse>
          </div>
        )}

        {/* 3. Tiểu Danh Mục & Công Dụng Chuyên Sâu */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('subcategories')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-cream-100 mb-3 hover:text-herbal-600 transition"
          >
            <span className="flex items-center gap-2">
              <span>🩺</span>
              <span>{isEn ? 'Specialized Topics & Uses' : 'Công Dụng & Tiểu Nhóm'}</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-forest-400 transition-transform duration-200 ${
                openSections.subcategories ? 'rotate-180' : ''
              }`}
            />
          </button>

          <Collapse open={openSections.subcategories}>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              <button
                onClick={() => onFilterChange({ ...filters, subcategory: undefined })}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                  !filters.subcategory
                    ? 'bg-herbal-100 dark:bg-herbal-950/80 text-herbal-900 dark:text-herbal-300 font-semibold'
                    : 'text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-charcoal-800'
                }`}
              >
                <span>{isEn ? 'All Sub-topics' : 'Tất cả tiểu nhóm'}</span>
                {!filters.subcategory && <Check className="w-3.5 h-3.5 text-herbal-600" />}
              </button>

              {applicableSubcategories.map((sub) => {
                const isSelected = filters.subcategory === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => onFilterChange({ ...filters, subcategory: isSelected ? undefined : sub.id })}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-herbal-100 dark:bg-herbal-950/80 text-herbal-900 dark:text-herbal-300 font-semibold'
                        : 'text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-charcoal-800'
                    }`}
                    title={isEn ? sub.description_en : sub.description}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="shrink-0">{sub.icon}</span>
                      <span className="truncate">{isEn ? sub.name_en : sub.name}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-herbal-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </Collapse>
        </div>

        {/* 4. Điều Kiện Trồng & Chăm Sóc */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('growingConditions')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-cream-100 mb-3 hover:text-herbal-600 transition"
          >
            <span className="flex items-center gap-2">
              <span>🌦️</span>
              <span>{isEn ? 'Growing Conditions' : 'Điều Kiện Trồng & Chăm'}</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-forest-400 transition-transform duration-200 ${
                openSections.growingConditions ? 'rotate-180' : ''
              }`}
            />
          </button>

          <Collapse open={openSections.growingConditions}>
            <div className="space-y-4">
              {/* Ánh sáng */}
              <div>
                <label className="text-[11px] font-semibold text-forest-700 dark:text-forest-400 flex items-center gap-1.5 mb-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isEn ? 'Sunlight Requirement' : 'Nhu Cầu Ánh Sáng'}</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'all', label: isEn ? 'All Lights' : 'Tất cả' },
                    { id: 'full_sun', label: isEn ? 'Full Sun' : 'Nắng gắt (>6h)' },
                    { id: 'partial_shade', label: isEn ? 'Part Shade' : 'Bán râm' },
                    { id: 'indoor', label: isEn ? 'Indoor' : 'Trong nhà' }
                  ].map((item) => {
                    const isSelected = filters.sunlight === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onFilterChange({ ...filters, sunlight: item.id as any })}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border text-center transition truncate ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-amber-800 dark:text-amber-300 font-semibold'
                            : 'border-forest-100 dark:border-forest-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nhu cầu nước */}
              <div>
                <label className="text-[11px] font-semibold text-forest-700 dark:text-forest-400 flex items-center gap-1.5 mb-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>{isEn ? 'Watering Schedule' : 'Lịch Tưới Nước'}</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'all', label: isEn ? 'All Schedules' : 'Tất cả' },
                    { id: 'daily', label: isEn ? 'Daily' : 'Hàng ngày' },
                    { id: 'moderate', label: isEn ? '2-3 Days' : '2-3 ngày/lần' },
                    { id: 'drought_tolerant', label: isEn ? 'Drought' : 'Chịu hạn' }
                  ].map((item) => {
                    const isSelected = filters.watering === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onFilterChange({ ...filters, watering: item.id as any })}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border text-center transition truncate ${
                          isSelected
                            ? 'bg-blue-500/10 border-blue-500 text-blue-800 dark:text-blue-300 font-semibold'
                            : 'border-forest-100 dark:border-forest-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Độ khó trồng */}
              <div>
                <label className="text-[11px] font-semibold text-forest-700 dark:text-forest-400 flex items-center gap-1.5 mb-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isEn ? 'Difficulty Level' : 'Độ Khó Trồng'}</span>
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'all', label: isEn ? 'All Levels' : 'Tất cả' },
                    { id: 'easy', label: isEn ? 'Easy (F0)' : 'Dễ trồng (F0)' },
                    { id: 'medium', label: isEn ? 'Medium' : 'Trung bình' },
                    { id: 'hard', label: isEn ? 'Advanced' : 'Nâng cao' }
                  ].map((item) => {
                    const isSelected = filters.difficulty === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onFilterChange({ ...filters, difficulty: item.id as any })}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border text-center transition truncate ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold'
                            : 'border-forest-100 dark:border-forest-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Collapse>
        </div>

        {/* 5. Thẻ Từ Khóa Phổ Biến (Tags) */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('tags')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-cream-100 mb-3 hover:text-herbal-600 transition"
          >
            <span className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-herbal-600" />
              <span>{isEn ? 'Popular Tags' : 'Từ Khóa Phổ Biến'}</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-forest-400 transition-transform duration-200 ${
                openSections.tags ? 'rotate-180' : ''
              }`}
            />
          </button>

          <Collapse open={openSections.tags}>
            <div className="flex flex-wrap gap-1.5">
              {displayTags.map(({ tag, count }) => {
                const isSelected = filters.tag?.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    onClick={() => onFilterChange({ ...filters, tag: isSelected ? undefined : tag })}
                    className={`px-2.5 py-1 rounded-full text-[11px] transition flex items-center gap-1 ${
                      isSelected
                        ? 'bg-herbal-700 text-white font-semibold shadow-sm'
                        : 'bg-forest-50 dark:bg-charcoal-800 text-forest-800 dark:text-forest-300 hover:bg-forest-100 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
                    }`}
                  >
                    <span>#{tag}</span>
                    {count > 0 && <span className="opacity-75 text-[10px]">({count})</span>}
                  </button>
                );
              })}
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

// Component thanh hiển thị các badge đang lọc (dành cho phần đỉnh của cột nội dung bên phải)
interface ActiveFilterPillsProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  hideCategoryBadge?: boolean;
}

export const ActiveFilterPills: React.FC<ActiveFilterPillsProps> = ({
  filters,
  onFilterChange,
  onReset,
  hideCategoryBadge = false
}) => {
  const { isEn } = useLanguage();

  const activePills: { label: string; onRemove: () => void }[] = [];

  if (!hideCategoryBadge && filters.category !== 'all') {
    const catName =
      filters.category === 'herb'
        ? isEn ? 'Herbs' : 'Thảo dược'
        : filters.category === 'fruit'
        ? isEn ? 'Fruit Trees' : 'Ăn trái'
        : isEn ? 'Ornamentals' : 'Cây cảnh';
    activePills.push({
      label: `${isEn ? 'Category: ' : 'Danh mục: '}${catName}`,
      onRemove: () => onFilterChange({ ...filters, category: 'all', subcategory: undefined })
    });
  }

  if (filters.subcategory) {
    const sub = SUBCATEGORIES.find((s) => s.id === filters.subcategory);
    if (sub) {
      activePills.push({
        label: `${isEn ? 'Sub: ' : 'Tiểu nhóm: '}${isEn ? sub.name_en : sub.name}`,
        onRemove: () => onFilterChange({ ...filters, subcategory: undefined })
      });
    }
  }

  if (filters.sunlight !== 'all') {
    const mapSunlight: Record<string, string> = {
      full_sun: isEn ? 'Full Sun' : 'Nắng toàn phần',
      partial_shade: isEn ? 'Part Shade' : 'Bán râm',
      indoor: isEn ? 'Indoor' : 'Trong nhà'
    };
    activePills.push({
      label: `${isEn ? 'Sunlight: ' : 'Nắng: '}${mapSunlight[filters.sunlight]}`,
      onRemove: () => onFilterChange({ ...filters, sunlight: 'all' })
    });
  }

  if (filters.watering !== 'all') {
    const mapWater: Record<string, string> = {
      daily: isEn ? 'Daily water' : 'Tưới hàng ngày',
      moderate: isEn ? '2-3 days' : 'Tưới vừa phải',
      drought_tolerant: isEn ? 'Drought tolerant' : 'Chịu hạn'
    };
    activePills.push({
      label: `${isEn ? 'Water: ' : 'Tưới: '}${mapWater[filters.watering]}`,
      onRemove: () => onFilterChange({ ...filters, watering: 'all' })
    });
  }

  if (filters.difficulty !== 'all') {
    const mapDiff: Record<string, string> = {
      easy: isEn ? 'Easy (F0)' : 'Dễ trồng (F0)',
      medium: isEn ? 'Moderate' : 'Trung bình',
      hard: isEn ? 'Advanced' : 'Nâng cao'
    };
    activePills.push({
      label: `${isEn ? 'Difficulty: ' : 'Độ khó: '}${mapDiff[filters.difficulty]}`,
      onRemove: () => onFilterChange({ ...filters, difficulty: 'all' })
    });
  }

  if (filters.tag) {
    activePills.push({
      label: `#${filters.tag}`,
      onRemove: () => onFilterChange({ ...filters, tag: undefined })
    });
  }

  if (filters.collection) {
    activePills.push({
      label: `${isEn ? 'Collection: ' : 'Bộ: '}${filters.collection}`,
      onRemove: () => onFilterChange({ ...filters, collection: undefined })
    });
  }

  if (activePills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-forest-50/60 dark:bg-charcoal-800/60 rounded-2xl border border-forest-100 dark:border-forest-800">
      <span className="text-xs font-semibold text-forest-700 dark:text-forest-300">
        {isEn ? 'Active filters:' : 'Đang lọc:'}
      </span>

      {activePills.map((pill, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-charcoal-900 text-forest-900 dark:text-cream-100 border border-forest-200 dark:border-forest-700 shadow-2xs"
        >
          <span>{pill.label}</span>
          <button
            onClick={pill.onRemove}
            className="hover:text-rose-600 transition p-0.5"
            title={isEn ? 'Remove filter' : 'Xóa điều kiện này'}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      <button
        onClick={onReset}
        className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-semibold ml-auto transition hover:underline"
      >
        {isEn ? 'Clear all' : 'Xóa tất cả'}
      </button>
    </div>
  );
};

// Component Mobile Filter Modal / Drawer
interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  filteredCount: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  children,
  filteredCount
}) => {
  const { isEn } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-sm bg-white dark:bg-charcoal-900 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-forest-100 dark:border-forest-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-herbal-600" />
            <h3 className="font-serif font-bold text-base text-forest-900 dark:text-cream-100">
              {isEn ? 'Filter Plants' : 'Bộ Lọc Cây Trồng'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-forest-50 dark:bg-charcoal-800 text-forest-600 hover:text-forest-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3">
          {children}
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-forest-100 dark:border-forest-800 bg-forest-50/50 dark:bg-charcoal-800/50">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-herbal-600 hover:bg-herbal-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <span>{isEn ? `Show ${filteredCount} Plants` : `Xem ${filteredCount} Cây Phù Hợp`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
