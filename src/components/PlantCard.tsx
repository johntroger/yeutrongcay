import React from 'react';
import { Plant } from '../types/index.ts';
import { Sun, Droplets, Clock, AlertCircle, ArrowUpRight } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  onSelect: (plant: Plant) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onSelect }) => {
  const sunlightText = {
    full_sun: 'Nắng toàn phần',
    partial_shade: 'Nắng tán xạ / Bán râm',
    indoor: 'Trong nhà / Thiếu sáng',
  }[plant.sunlight];

  const wateringText = {
    daily: 'Tưới hàng ngày',
    moderate: '2-3 ngày/lần',
    drought_tolerant: 'Chịu hạn tốt',
  }[plant.watering];

  return (
    <div
      onClick={() => onSelect(plant)}
      className="group bg-white rounded-3xl overflow-hidden border border-forest-100 hover:border-herbal-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Plant Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-forest-50">
        <img
          src={plant.image_url}
          alt={plant.common_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Category tag */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-forest-900/80 backdrop-blur-md text-white shadow-sm">
          {plant.category === 'herb' ? '🌿 Thảo Dược' : plant.category === 'fruit' ? '🍋 Cây Ăn Trái' : '🌸 Cây Cảnh'}
        </div>

        {/* Difficulty stars */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-forest-900 shadow-sm flex items-center gap-1">
          <span>Ươm:</span>
          <span className="text-herbal-600 font-bold">{plant.propagation_difficulty}/5</span>
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
          <p className="text-xs font-mono italic text-forest-700/80 mb-1 tracking-tight">
            {plant.scientific_name}
          </p>

          {/* Common Name */}
          <h3 className="text-lg font-serif font-bold text-forest-900 group-hover:text-herbal-600 transition flex items-center justify-between">
            <span>{plant.common_name}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-herbal-600" />
          </h3>

          {/* Aliases */}
          {plant.aliases.length > 0 && (
            <p className="text-xs text-gray-500 mb-3 truncate">
              Tên khác: {plant.aliases.join(', ')}
            </p>
          )}

          {/* Short description */}
          <p className="text-xs sm:text-sm text-charcoal-800/80 line-clamp-2 leading-relaxed mb-4">
            {plant.description}
          </p>
        </div>

        {/* Quick Parameters */}
        <div className="pt-3 border-t border-forest-50 grid grid-cols-2 gap-2 text-xs text-forest-800 font-medium">
          <div className="flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{sunlightText}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">{wateringText}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 text-forest-700/90">
            <Clock className="w-3.5 h-3.5 text-herbal-600 shrink-0" />
            <span className="truncate">{plant.growth_time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
