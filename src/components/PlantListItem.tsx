import React from 'react';
import { Link } from 'react-router-dom';
import { Plant } from '../types/index.ts';
import { getCategoryConfig } from '../config/ecosystemRegistry.ts';
import { plantReviewService } from '../services/plantReviewService.ts';
import { ArrowUpRight, Droplets, Sun, Sprout, Heart } from 'lucide-react';

interface PlantListItemProps {
  plant: Plant;
  onTagClick?: (tag: string) => void;
  isEn: boolean;
}

export const PlantListItem: React.FC<PlantListItemProps> = ({ plant, onTagClick, isEn }) => {
  const categoryConfig = getCategoryConfig(plant.category);
  const heartSummary = plantReviewService.getCachedSummary(plant.slug);
  const categoryLabel = isEn ? categoryConfig.labelEn : categoryConfig.labelVi;
  const commonName = isEn ? (plant.common_name_en || plant.common_name) : plant.common_name;
  const description = isEn ? (plant.description_en || plant.description) : plant.description;

  const difficultyLevel = plant.propagation_difficulty || 1;
  const difficultyLabel = isEn
    ? (difficultyLevel <= 1 ? 'Very Easy' : difficultyLevel <= 2 ? 'Easy' : difficultyLevel <= 3 ? 'Moderate' : 'Challenging')
    : (difficultyLevel <= 1 ? 'Rất Dễ' : difficultyLevel <= 2 ? 'Dễ Trồng' : difficultyLevel <= 3 ? 'Trung Bình' : 'Khó');

  const sunlightLabel = isEn
    ? (plant.sunlight === 'full_sun' ? 'Full Sun' : plant.sunlight === 'indoor' ? 'Indoor' : 'Partial Shade')
    : (plant.sunlight === 'full_sun' ? 'Nắng toàn phần' : plant.sunlight === 'indoor' ? 'Trong nhà' : 'Nắng tán xạ / Bán râm');

  const wateringLabel = isEn
    ? (plant.watering === 'daily' ? 'Daily' : plant.watering === 'drought_tolerant' ? 'Drought Hardy' : 'Moderate')
    : (plant.watering === 'daily' ? 'Tưới hàng ngày' : plant.watering === 'drought_tolerant' ? 'Chịu hạn tốt' : '2-3 ngày/lần');

  return (
    <Link
      to={`/cay/${plant.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-charcoal-900 rounded-3xl p-4 sm:p-5 border border-forest-100 dark:border-forest-900 hover:border-herbal-500/50 dark:hover:border-herbal-400/50 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between cursor-pointer"
    >
      <div className="flex items-start gap-4 min-w-0 flex-1">
        {/* Plant Image Thumbnail */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shrink-0 bg-forest-50 dark:bg-charcoal-800 relative border border-forest-100 dark:border-forest-800">
          <img
            src={plant.image_url}
            alt={commonName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/logo.jpg';
              target.style.objectFit = 'contain';
              target.style.backgroundColor = '#ffffff';
              target.style.padding = '8px';
            }}
          />
        </div>

        {/* Content Info */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${categoryConfig.badgeColorClass}`}>
              {categoryLabel}
            </span>

            {heartSummary.total_reviews > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300 flex items-center gap-1 border border-rose-200/50 dark:border-rose-900/50">
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                <span>{heartSummary.average_hearts.toFixed(1)}</span>
                <span className="text-[10px] opacity-75 font-normal">({heartSummary.total_reviews})</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 dark:bg-charcoal-800 text-gray-600 dark:text-gray-300">
                {isEn ? 'New' : 'Mới'}
              </span>
            )}

            <span className="text-[11px] text-forest-700 dark:text-cream-200 font-medium flex items-center gap-1">
              <Sprout className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>{isEn ? 'Care:' : 'Ươm:'} {difficultyLevel}/5 ({difficultyLabel})</span>
            </span>

            {plant.container_suitable && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                {isEn ? 'Balcony Pot OK' : 'Trồng chậu tốt'}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition truncate">
              {commonName}
            </h3>
            <p className="text-xs italic text-forest-600 dark:text-forest-400 font-mono">
              {plant.scientific_name}
            </p>
          </div>

          <p className="text-xs text-forest-700 dark:text-cream-200 line-clamp-2 leading-relaxed">
            {plant.quick_answer || description}
          </p>

          {/* Micro Tags */}
          {plant.tags && plant.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {plant.tags.slice(0, 3).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onTagClick?.(tag);
                  }}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-700 dark:text-forest-300 font-medium transition cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Conditions & CTA */}
      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto shrink-0 gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-forest-100 dark:border-forest-800">
        <div className="flex flex-wrap items-center md:flex-col md:items-end gap-1.5 text-[11px] text-forest-700 dark:text-forest-300">
          <span className="flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>{sunlightLabel}</span>
          </span>
          <span className="hidden md:inline text-forest-300">•</span>
          <span className="flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            <span>{wateringLabel}</span>
          </span>
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-forest-900 group-hover:bg-forest-950 text-white text-xs font-semibold shadow-xs transition">
          <span>{isEn ? 'View Guide' : 'Xem Chi Tiết'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-herbal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        </span>
      </div>
    </Link>
  );
};
