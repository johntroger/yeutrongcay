import React from 'react';
import { PlantCategory } from '../types/index.ts';
import { SUBCATEGORIES } from '../data/collections.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  Filter,
  Sun,
  Droplets,
  Award,
  RotateCcw,
  ChevronDown,
  Layers,
  X
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

interface PlantFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
  onReset: () => void;
  hideCategorySelector?: boolean; // Khi ở trang danh mục đơn
}

export const PlantFilterBar: React.FC<PlantFilterBarProps> = ({
  filters,
  onFilterChange,
  totalCount,
  filteredCount,
  onReset,
  hideCategorySelector = false
}) => {
  const { isEn } = useLanguage();
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false);

  // Danh sách tiểu danh mục tương ứng với category hiện tại
  const applicableSubcategories = React.useMemo(() => {
    if (filters.category === 'all') {
      return SUBCATEGORIES;
    }
    return SUBCATEGORIES.filter((s) => s.category === filters.category);
  }, [filters.category]);

  const hasActiveFilters =
    (filters.category !== 'all' && !hideCategorySelector) ||
    filters.subcategory ||
    filters.sunlight !== 'all' ||
    filters.watering !== 'all' ||
    filters.difficulty !== 'all' ||
    filters.tag ||
    filters.collection;

  return (
    <div className="w-full bg-white dark:bg-charcoal-900 rounded-3xl p-5 border border-forest-100 dark:border-forest-900 shadow-sm space-y-4">
      {/* 1. Header & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-forest-100/80 dark:border-forest-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-herbal-100 dark:bg-herbal-950/60 text-herbal-700 dark:text-herbal-400 flex items-center justify-center">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-serif font-bold text-forest-950 dark:text-cream-50 flex items-center gap-2">
              <span>{isEn ? 'Smart Botanical Filter' : 'Bộ Lọc Bách Khoa Thông Minh'}</span>
              <span className="text-xs font-mono font-medium text-herbal-700 dark:text-herbal-400 bg-herbal-50 dark:bg-herbal-950/60 px-2.5 py-0.5 rounded-full border border-herbal-200/50">
                {filteredCount} / {totalCount} {isEn ? 'plants' : 'cây'}
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-forest-50 dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-100 dark:hover:bg-charcoal-700 border border-forest-200/60 transition"
          >
            <span>{isEn ? 'Condition Filters' : 'Điều Kiện Trồng'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`} />
          </button>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 transition"
              title={isEn ? 'Reset all filters' : 'Xóa toàn bộ bộ lọc'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEn ? 'Reset' : 'Đặt lại'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Category Pills (nếu không ẩn) */}
      {!hideCategorySelector && (
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 mb-2 block">
            {isEn ? '1. Plant Category' : '1. Danh Mục Chính'}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onFilterChange({ ...filters, category: 'all', subcategory: undefined })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                filters.category === 'all'
                  ? 'bg-forest-900 text-white dark:bg-herbal-700 shadow-sm ring-2 ring-forest-400/40'
                  : 'bg-forest-50 dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-100 border border-forest-100 dark:border-forest-800'
              }`}
            >
              <span>🌿</span>
              <span>{isEn ? 'All Categories (55)' : 'Tất Cả Danh Mục (55)'}</span>
            </button>

            <button
              onClick={() => onFilterChange({ ...filters, category: 'herb', subcategory: undefined })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                filters.category === 'herb'
                  ? 'bg-forest-900 text-white dark:bg-herbal-700 shadow-sm ring-2 ring-herbal-500/40'
                  : 'bg-forest-50 dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-100 border border-forest-100 dark:border-forest-800'
              }`}
            >
              <span>🌱</span>
              <span>{isEn ? 'Herbs (25)' : 'Thảo Dược Bản Địa (25)'}</span>
            </button>

            <button
              onClick={() => onFilterChange({ ...filters, category: 'fruit', subcategory: undefined })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                filters.category === 'fruit'
                  ? 'bg-forest-900 text-white dark:bg-herbal-700 shadow-sm ring-2 ring-amber-500/40'
                  : 'bg-forest-50 dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-100 border border-forest-100 dark:border-forest-800'
              }`}
            >
              <span>🍋</span>
              <span>{isEn ? 'Balcony Fruits (15)' : 'Cây Ăn Trái Ban Công (15)'}</span>
            </button>

            <button
              onClick={() => onFilterChange({ ...filters, category: 'ornamental', subcategory: undefined })}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                filters.category === 'ornamental'
                  ? 'bg-forest-900 text-white dark:bg-herbal-700 shadow-sm ring-2 ring-purple-500/40'
                  : 'bg-forest-50 dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-100 border border-forest-100 dark:border-forest-800'
              }`}
            >
              <span>🌸</span>
              <span>{isEn ? 'Ornamentals & Bonsai (15)' : 'Cây Cảnh & Bonsai (15)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Subcategory Pills */}
      <div>
        <label className="text-[11px] font-bold uppercase tracking-wider text-forest-700 dark:text-forest-400 mb-2 block">
          {isEn ? '2. Specialized Sub-Topic' : '2. Tiểu Danh Mục & Công Dụng Chuyên Sâu'}
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onFilterChange({ ...filters, subcategory: undefined })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
              !filters.subcategory
                ? 'bg-herbal-700 text-white dark:bg-herbal-600 shadow-sm'
                : 'bg-white dark:bg-charcoal-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50 border border-forest-200/80 dark:border-forest-700'
            }`}
          >
            <span>{isEn ? 'All Sub-topics' : 'Tất cả tiểu nhóm'}</span>
          </button>

          {applicableSubcategories.map((sub) => {
            const isSelected = filters.subcategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onFilterChange({ ...filters, subcategory: isSelected ? undefined : sub.id })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-herbal-700 text-white dark:bg-herbal-600 shadow-sm ring-1 ring-herbal-400'
                    : 'bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-50 border border-forest-200/80 dark:border-forest-700'
                }`}
                title={isEn ? sub.description_en : sub.description}
              >
                <span>{sub.icon}</span>
                <span>{isEn ? sub.name_en : sub.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Filters Badges Indicator (Tag / Collection) */}
      {(filters.tag || filters.collection) && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-forest-100/60 dark:border-forest-800">
          <span className="text-xs font-semibold text-forest-600 dark:text-forest-400">
            {isEn ? 'Active filters:' : 'Đang lọc theo:'}
          </span>

          {filters.tag && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-herbal-100 text-herbal-800 dark:bg-herbal-950/80 dark:text-herbal-300 border border-herbal-200">
              <span>#{filters.tag}</span>
              <button
                onClick={() => onFilterChange({ ...filters, tag: undefined })}
                className="hover:text-rose-600 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {filters.collection && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200">
              <Layers className="w-3.5 h-3.5" />
              <span>{isEn ? 'Collection: ' : 'Bộ: '}{filters.collection}</span>
              <button
                onClick={() => onFilterChange({ ...filters, collection: undefined })}
                className="hover:text-rose-600 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* 5. Advanced Growing Condition Filters (Collapsible) */}
      {isAdvancedOpen && (
        <div className="pt-4 border-t border-forest-100 dark:border-forest-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Sunlight */}
          <div>
            <label className="text-xs font-semibold text-forest-800 dark:text-forest-200 flex items-center gap-1.5 mb-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>{isEn ? 'Sunlight Requirement' : 'Nhu Cầu Ánh Sáng'}</span>
            </label>
            <select
              value={filters.sunlight}
              onChange={(e) => onFilterChange({ ...filters, sunlight: e.target.value as any })}
              className="w-full text-xs bg-forest-50/70 dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 rounded-xl px-3 py-2 text-forest-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-herbal-500"
            >
              <option value="all">{isEn ? 'All Sunlight Levels' : 'Tất cả ánh sáng'}</option>
              <option value="full_sun">{isEn ? 'Full Direct Sunlight (>6h)' : 'Nắng toàn phần (Sân thượng/Ban công Tây)'}</option>
              <option value="partial_shade">{isEn ? 'Filtered / Partial Shade' : 'Nắng tán xạ / Hướng Đông'}</option>
              <option value="indoor">{isEn ? 'Indoor / Low Light' : 'Trong nhà / Râm mát'}</option>
            </select>
          </div>

          {/* Watering */}
          <div>
            <label className="text-xs font-semibold text-forest-800 dark:text-forest-200 flex items-center gap-1.5 mb-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-500" />
              <span>{isEn ? 'Watering Schedule' : 'Lịch Tưới Nước'}</span>
            </label>
            <select
              value={filters.watering}
              onChange={(e) => onFilterChange({ ...filters, watering: e.target.value as any })}
              className="w-full text-xs bg-forest-50/70 dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 rounded-xl px-3 py-2 text-forest-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-herbal-500"
            >
              <option value="all">{isEn ? 'All Watering Schedules' : 'Tất cả chế độ tưới'}</option>
              <option value="daily">{isEn ? 'Daily Watering' : 'Tưới hàng ngày (Ưa ẩm)'}</option>
              <option value="moderate">{isEn ? 'Moderate (Every 2-3 Days)' : 'Vừa phải (2-3 ngày/lần)'}</option>
              <option value="drought_tolerant">{isEn ? 'Drought-Tolerant (Weekly)' : 'Chịu hạn (Quên tưới không chết)'}</option>
            </select>
          </div>

          {/* Propagation Difficulty */}
          <div>
            <label className="text-xs font-semibold text-forest-800 dark:text-forest-200 flex items-center gap-1.5 mb-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isEn ? 'Propagation Difficulty' : 'Độ Khó Trồng & Nhân Giống'}</span>
            </label>
            <select
              value={filters.difficulty}
              onChange={(e) => onFilterChange({ ...filters, difficulty: e.target.value as any })}
              className="w-full text-xs bg-forest-50/70 dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 rounded-xl px-3 py-2 text-forest-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-herbal-500"
            >
              <option value="all">{isEn ? 'All Difficulty Levels' : 'Tất cả độ khó'}</option>
              <option value="easy">{isEn ? 'Easy (Level 1 - Beginner)' : 'Rất dễ (Mức 1 - Người mới trồng)'}</option>
              <option value="medium">{isEn ? 'Moderate (Level 2-3)' : 'Trung bình (Mức 2 - 3)'}</option>
              <option value="hard">{isEn ? 'Advanced (Level 4-5)' : 'Nâng cao (Mức 4 - 5)'}</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
