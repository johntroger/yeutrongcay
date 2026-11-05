import React from 'react';
import { Link } from 'react-router-dom';
import { Plant } from '../types/index.ts';
import { Sun, Droplets, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { localizePlant } from '../i18n/plantTranslations.ts';

interface PlantCardProps {
  plant: Plant;
  onSelect?: (plant: Plant) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant: rawPlant, onSelect }) => {
  const { language, t } = useLanguage();
  const plant = localizePlant(rawPlant, language);

  const sunlightText = t(`plantCard.sunlight.${plant.sunlight}`, plant.sunlight);
  const wateringText = t(`plantCard.watering.${plant.watering}`, plant.watering);

  const categoryLabel =
    plant.category === 'herb'
      ? `🌿 ${language === 'en' ? 'Herbs' : 'Thảo Dược'}`
      : plant.category === 'fruit'
      ? `🍋 ${language === 'en' ? 'Balcony Fruits' : 'Cây Ăn Trái'}`
      : `🌸 ${language === 'en' ? 'Ornamentals' : 'Cây Cảnh'}`;

  return (
    <Link
      to={`/cay/${plant.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        if (onSelect) {
          onSelect(plant);
        }
      }}
      className="group bg-white dark:bg-charcoal-900 rounded-3xl overflow-hidden border border-forest-100 dark:border-forest-900 hover:border-herbal-500/50 dark:hover:border-herbal-400/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 block"
    >
      {/* Plant Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-forest-50 dark:bg-charcoal-800">
        <img
          src={plant.image_url}
          alt={plant.common_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail';
          }}
        />

        {/* Category tag */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-forest-900/80 backdrop-blur-md text-white shadow-sm">
          {categoryLabel}
        </div>

        {/* Difficulty stars */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-md text-forest-900 dark:text-cream-50 shadow-sm flex items-center gap-1">
          <span>{t('plantCard.propagation')}</span>
          <span className="text-herbal-600 dark:text-herbal-400 font-bold">{plant.propagation_difficulty}/5</span>
        </div>

        {/* Toxicity alert if any */}
        {plant.medical_info?.toxicity_warning && (
          <div className="absolute bottom-3 left-3 right-3 px-2.5 py-1 rounded-xl text-[11px] font-medium bg-amber-500/90 text-white backdrop-blur-md flex items-center gap-1.5 shadow-sm truncate">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{plant.medical_info.toxicity_warning}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Scientific Name */}
          <p className="text-xs font-mono italic text-forest-700/80 dark:text-forest-400 mb-1 tracking-tight">
            {plant.scientific_name}
          </p>

          {/* Common Name */}
          <h3 className="text-lg font-serif font-bold text-forest-900 dark:text-cream-50 group-hover:text-herbal-600 dark:group-hover:text-herbal-400 transition flex items-center justify-between">
            <span>{plant.common_name}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-herbal-600 dark:text-herbal-400" />
          </h3>

          {/* Aliases */}
          {plant.aliases && plant.aliases.length > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate">
              {t('plantCard.aliasesPrefix')} {plant.aliases.join(', ')}
            </p>
          )}

          {/* Short description */}
          <p className="text-xs sm:text-sm text-charcoal-800/80 dark:text-forest-200 line-clamp-2 leading-relaxed mb-4">
            {plant.description}
          </p>
        </div>

        {/* Quick Parameters */}
        <div className="pt-3 border-t border-forest-50 dark:border-forest-800/80 grid grid-cols-2 gap-2 text-xs text-forest-800 dark:text-forest-200 font-medium">
          <div className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{sunlightText}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">{wateringText}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
