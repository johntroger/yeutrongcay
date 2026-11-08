import React from 'react';
import { Calendar, Trash2, Check } from 'lucide-react';
import { GardenPlant, PlantDiaryEntry } from '../../types/index.ts';

export interface GardenTimelineTabProps {
  isEn: boolean;
  plants: GardenPlant[];
  selectedPlantId: string | null;
  setSelectedPlantId: (id: string | null) => void;
  diaries: PlantDiaryEntry[];
  handleDeleteDiary: (id: string) => void;
}

export const GardenTimelineTab: React.FC<GardenTimelineTabProps> = ({
  isEn,
  plants,
  selectedPlantId,
  setSelectedPlantId,
  diaries,
  handleDeleteDiary
}) => {
  return (
    <div className="space-y-6">
      {selectedPlantId && (
        <div className="p-4 rounded-2xl bg-herbal-50 dark:bg-herbal-950/60 border border-herbal-200 dark:border-herbal-800 flex items-center justify-between">
          <span className="text-xs font-bold text-herbal-900 dark:text-herbal-300">
            {isEn
              ? `Filtering diary for: ${plants.find((p) => p.id === selectedPlantId)?.custom_name}`
              : `Đang lọc nhật ký của: ${plants.find((p) => p.id === selectedPlantId)?.custom_name}`}
          </span>
          <button
            onClick={() => setSelectedPlantId(null)}
            className="text-xs text-herbal-700 dark:text-herbal-400 hover:text-herbal-900 font-semibold underline cursor-pointer"
          >
            {isEn ? 'Show All Plants' : 'Xem tất cả cây'}
          </button>
        </div>
      )}

      <div className="space-y-6">
        {diaries
          .filter((d) => !selectedPlantId || d.garden_plant_id === selectedPlantId)
          .map((entry) => {
            const targetPlant = plants.find((p) => p.id === entry.garden_plant_id);

            return (
              <div
                key={entry.id}
                className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 border border-forest-100 dark:border-forest-800 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:border-forest-200 transition"
              >
                {/* Photo */}
                <div className="w-full md:w-64 aspect-[4/3] rounded-2xl overflow-hidden bg-forest-900 shrink-0 relative group">
                  <img
                    src={entry.image_url}
                    alt={entry.stage}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleDeleteDiary(entry.id)}
                    title={isEn ? 'Delete entry' : 'Xóa mốc nhật ký'}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-forest-950/80 hover:bg-red-600 text-white transition opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-herbal-100 dark:bg-herbal-950/80 text-herbal-900 dark:text-herbal-300 border border-herbal-200 dark:border-herbal-800">
                      {entry.stage}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {entry.entry_date}
                    </span>
                    {targetPlant && (
                      <span className="text-xs font-bold text-forest-900 dark:text-cream-100 bg-forest-50 dark:bg-charcoal-800 px-2.5 py-0.5 rounded-full border border-forest-100 dark:border-forest-800">
                        {targetPlant.custom_name}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-forest-800 dark:text-forest-200 leading-relaxed pt-1">
                    {entry.note}
                  </p>

                  <div className="pt-2 text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{isEn ? 'Verified clean EXIF data (Standard H7)' : 'Đã lưu vết ảnh sạch EXIF (Móc nối H7)'}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
