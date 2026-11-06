import React from 'react';
import { Hash, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface TagCloudBarProps {
  selectedTag?: string;
  onSelectTag: (tag?: string) => void;
  availableTags?: { tag: string; count: number }[];
}

// Danh sách các tag tiêu biểu tuyển chọn
const CURATED_FEATURED_TAGS = [
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
  'Sân thượng',
  'Quả mọng'
];

export const TagCloudBar: React.FC<TagCloudBarProps> = ({
  selectedTag,
  onSelectTag,
  availableTags
}) => {
  const { isEn } = useLanguage();

  // Danh sách tags hiển thị
  const displayTags = React.useMemo(() => {
    if (availableTags && availableTags.length > 0) {
      return availableTags.slice(0, 16);
    }
    return CURATED_FEATURED_TAGS.map((t) => ({ tag: t, count: 0 }));
  }, [availableTags]);

  return (
    <div className="w-full bg-white dark:bg-charcoal-900 rounded-2xl p-4 border border-forest-100 dark:border-forest-900 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-herbal-600 dark:text-herbal-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-cream-100">
            {isEn ? 'Filter by Botanical Tags' : 'Lọc Nhanh Theo Thẻ Từ Khóa (Tags)'}
          </span>
          <span className="text-[11px] text-forest-600 dark:text-forest-400 hidden sm:inline">
            {isEn ? '• 1-Click Discovery' : '• Chạm để lọc bài viết'}
          </span>
        </div>

        {selectedTag && (
          <button
            onClick={() => onSelectTag(undefined)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 transition"
          >
            <X className="w-3 h-3" />
            <span>{isEn ? 'Clear tag' : 'Bỏ chọn thẻ'}</span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {displayTags.map(({ tag, count }) => {
          const isSelected = selectedTag?.toLowerCase() === tag.toLowerCase();
          return (
            <button
              key={tag}
              onClick={() => onSelectTag(isSelected ? undefined : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-herbal-700 dark:bg-herbal-600 text-white shadow-md ring-2 ring-herbal-400/40 scale-105'
                  : 'bg-forest-50/80 dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-100 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800'
              }`}
            >
              <span>#{tag}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-herbal-900/60 text-white'
                      : 'bg-forest-200/60 dark:bg-charcoal-700 text-forest-700 dark:text-forest-300'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
