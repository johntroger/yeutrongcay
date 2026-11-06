import React from 'react';
import { Layers, Check, Info } from 'lucide-react';
import { PLANT_COLLECTIONS } from '../data/collections.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface CollectionsShowcaseProps {
  selectedCollectionSlug?: string;
  onSelectCollection: (slug?: string) => void;
}

export const CollectionsShowcase: React.FC<CollectionsShowcaseProps> = ({
  selectedCollectionSlug,
  onSelectCollection
}) => {
  const { isEn } = useLanguage();

  const selectedCol = React.useMemo(() => {
    return PLANT_COLLECTIONS.find((c) => c.slug === selectedCollectionSlug);
  }, [selectedCollectionSlug]);

  return (
    <div className="w-full my-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950 dark:text-cream-50">
              {isEn ? 'Curated Plant Solution Collections' : 'Bộ Sưu Tập Cây Trồng Theo Giải Pháp Thực Tế'}
            </h3>
          </div>
          <p className="text-xs text-forest-700/80 dark:text-forest-300 mt-0.5">
            {isEn
              ? 'Hand-picked combinations for specific urban needs: child wellness, heat proofing, air purification, and small-space harvest.'
              : 'Tuyển tập cây trồng phối hợp giải quyết trọn gói từng nhu cầu: tủ thuốc gia đình, ban công nắng hướng Tây, lọc độc khí và quả ngọt đô thị.'}
          </p>
        </div>

        {selectedCollectionSlug && (
          <button
            onClick={() => onSelectCollection(undefined)}
            className="self-start sm:self-auto text-xs font-semibold text-herbal-700 dark:text-herbal-400 hover:underline flex items-center gap-1"
          >
            <span>{isEn ? 'Show All Plants' : 'Xem lại tất cả cây'}</span>
          </button>
        )}
      </div>

      {/* Grid Collections Slider */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {PLANT_COLLECTIONS.map((col) => {
          const isSelected = selectedCollectionSlug === col.slug;
          return (
            <button
              key={col.id}
              onClick={() => onSelectCollection(isSelected ? undefined : col.slug)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ${
                isSelected
                  ? 'bg-forest-900 text-white dark:bg-herbal-700 shadow-lg ring-2 ring-herbal-400 scale-[1.02]'
                  : 'bg-white dark:bg-charcoal-900 hover:bg-forest-50/80 dark:hover:bg-charcoal-800 border-forest-100 dark:border-forest-800 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{col.icon}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-forest-100 dark:bg-charcoal-800 text-forest-800 dark:text-forest-200'
                    }`}
                  >
                    {col.plantIds.length} {isEn ? 'plants' : 'loài'}
                  </span>
                </div>
                <h4
                  className={`text-xs font-bold font-serif leading-snug line-clamp-2 ${
                    isSelected ? 'text-white' : 'text-forest-950 dark:text-cream-100 group-hover:text-herbal-700'
                  }`}
                >
                  {isEn ? col.title_en : col.title}
                </h4>
              </div>

              <div className="mt-2 pt-2 border-t border-forest-100/30 dark:border-forest-800/40 flex items-center justify-between text-[11px]">
                <span
                  className={`truncate font-medium ${
                    isSelected ? 'text-emerald-200' : 'text-forest-600 dark:text-forest-400'
                  }`}
                >
                  {isEn ? col.badge_en : col.badge}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Collection Highlight Banner */}
      {selectedCol && (
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-charcoal-900 dark:to-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 shadow-sm transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedCol.icon}</span>
                <h4 className="text-base sm:text-lg font-serif font-bold text-forest-950 dark:text-cream-50">
                  {isEn ? selectedCol.title_en : selectedCol.title}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-600 text-white">
                  {selectedCol.plantIds.length} {isEn ? 'Curated Plants' : 'Bài viết trong bộ'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-forest-800 dark:text-forest-200 leading-relaxed max-w-3xl">
                {isEn ? selectedCol.description_en : selectedCol.description}
              </p>
              {selectedCol.companion_planting_tip && (
                <div className="flex items-start gap-1.5 pt-1 text-xs text-emerald-900 dark:text-emerald-300 font-medium">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>{isEn ? 'Companion Planting Secret: ' : 'Mẹo Phối Chậu Trồng Xen: '}</strong>
                    {isEn ? selectedCol.companion_planting_tip_en : selectedCol.companion_planting_tip}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => onSelectCollection(undefined)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 transition shrink-0 self-start md:self-auto"
            >
              {isEn ? 'Close Collection Filter' : 'Bỏ lọc bộ sưu tập'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
