import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plant } from '../types/index.ts';
import { Sun, Droplets, AlertCircle, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { localizePlant } from '../i18n/plantTranslations.ts';
import { getPlantSubcategory } from '../data/collections.ts';
import { plantPassportRegistryService, RegisteredPlantPassport } from '../services/plantPassportRegistryService.ts';

interface PlantCardProps {
  plant: Plant;
  onSelect?: (plant: Plant) => void;
  onTagClick?: (tag: string) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant: rawPlant, onSelect, onTagClick }) => {
  const navigate = useNavigate();
  const { language, t, isEn } = useLanguage();
  const plant = localizePlant(rawPlant, language);
  const subcategory = getPlantSubcategory(plant.id);

  const [mintedPassport, setMintedPassport] = useState<RegisteredPlantPassport | undefined>(() =>
    plantPassportRegistryService.findPassportForPlant({
      plantName: rawPlant.common_name,
      scientificName: rawPlant.scientific_name,
      sha256: rawPlant.image_sha256,
    })
  );

  useEffect(() => {
    const syncNftStatus = () => {
      setMintedPassport(
        plantPassportRegistryService.findPassportForPlant({
          plantName: rawPlant.common_name,
          scientificName: rawPlant.scientific_name,
          sha256: rawPlant.image_sha256,
        })
      );
    };
    syncNftStatus();
    window.addEventListener('ytc_passport_registry_updated', syncNftStatus);
    return () => {
      window.removeEventListener('ytc_passport_registry_updated', syncNftStatus);
    };
  }, [rawPlant.common_name, rawPlant.scientific_name, rawPlant.image_sha256]);

  const ownerMeta = mintedPassport ? plantPassportRegistryService.getOwnerProfileMeta(mintedPassport) : null;

  const sunlightText = t(`plantCard.sunlight.${plant.sunlight}`, plant.sunlight);
  const wateringText = t(`plantCard.watering.${plant.watering}`, plant.watering);

  const categoryLabel =
    plant.category === 'herb'
      ? `🌿 ${language === 'en' ? 'Herbs' : 'Thảo Dược'}`
      : plant.category === 'fruit'
      ? `🍋 ${language === 'en' ? 'Balcony Fruits' : 'Cây Ăn Trái'}`
      : `🌸 ${language === 'en' ? 'Ornamentals' : 'Cây Cảnh'}`;

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    } else {
      navigate(`/?tag=${encodeURIComponent(tag)}`);
    }
  };

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
      className="animate-card-in group bg-white dark:bg-charcoal-900 rounded-3xl overflow-hidden border border-forest-100 dark:border-forest-900 hover:border-herbal-500/50 dark:hover:border-herbal-400/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 block"
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

          {/* Aliases & Subcategory */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            {subcategory && (
              <span className="text-[10px] font-semibold text-herbal-700 dark:text-herbal-300 bg-herbal-50 dark:bg-herbal-950/60 px-2 py-0.5 rounded-full border border-herbal-200/50">
                {subcategory.icon} {isEn ? subcategory.name_en : subcategory.name}
              </span>
            )}
            {plant.aliases && plant.aliases.length > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {t('plantCard.aliasesPrefix')} {plant.aliases[0]}
              </p>
            )}
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-charcoal-800/80 dark:text-forest-200 line-clamp-2 leading-relaxed mb-3">
            {plant.description}
          </p>

          {/* Clickable Tags */}
          {plant.tags && plant.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {plant.tags.slice(0, 3).map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => handleTagClick(tag, e)}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-forest-50 hover:bg-herbal-100 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 text-forest-700 hover:text-herbal-800 dark:text-forest-300 dark:hover:text-cream-100 border border-forest-100 dark:border-forest-800 transition"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Parameters */}
        <div className="pt-3 border-t border-forest-50 dark:border-forest-800/80 space-y-2.5">
          <div className="grid grid-cols-2 gap-2 text-xs text-forest-800 dark:text-forest-200 font-medium">
            <div className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{sunlightText}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate">{wateringText}</span>
            </div>
          </div>

          {/* Web3 Exclusive NFT Ownership Badge or Mint Button */}
          {mintedPassport && ownerMeta ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(ownerMeta.profilePath);
              }}
              title={
                isEn
                  ? `NFT Minted (#${mintedPassport.token_id}) • View Owner Profile (${ownerMeta.displayLabel})`
                  : `Đã tạo NFT #${mintedPassport.token_id} • Xem trang chủ sở hữu (${ownerMeta.displayLabel})`
              }
              className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-amber-50 via-emerald-50 to-amber-50 hover:from-amber-100 hover:to-emerald-100 dark:from-amber-950/50 dark:via-emerald-950/40 dark:to-amber-950/50 dark:hover:from-amber-900/60 dark:hover:to-emerald-900/50 border border-amber-400/60 dark:border-amber-500/40 text-left flex items-center justify-between gap-2 transition shadow-2xs cursor-pointer"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 dark:text-amber-300 truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="truncate">
                  {isEn ? `NFT #${mintedPassport.token_id} Minted` : `Đã tạo NFT #${mintedPassport.token_id}`}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 shrink-0 underline decoration-emerald-500/50">
                <span>{ownerMeta.displayLabel}</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/web3-sandbox?mint=${encodeURIComponent(rawPlant.slug)}`);
              }}
              title={
                isEn
                  ? 'Be the first to mint the exclusive NFT passport for this plant species'
                  : 'Đúc NFT độc bản cho loài cây này (Ai tạo trước sở hữu trước)'
              }
              className="w-full px-3 py-2 rounded-xl bg-forest-50/90 hover:bg-emerald-600 dark:bg-charcoal-800 dark:hover:bg-emerald-600 text-forest-800 hover:text-white dark:text-emerald-300 dark:hover:text-white border border-emerald-500/30 hover:border-emerald-600 text-left flex items-center justify-between gap-2 transition cursor-pointer group/mint"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold truncate">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover/mint:text-amber-300 shrink-0 transition-colors" />
                <span className="truncate">
                  {isEn ? 'Mint Plant NFT (Unclaimed)' : 'Tạo NFT Cây Này (Chưa có chủ)'}
                </span>
              </span>
              <span className="text-[10px] font-semibold opacity-80 group-hover/mint:opacity-100 shrink-0">
                {isEn ? 'Claim First →' : 'Sở hữu trước →'}
              </span>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};
