import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plant, PlantHeartSummary } from '../types/index.ts';
import { Sun, Droplets, AlertCircle, ArrowUpRight, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { localizePlant } from '../i18n/plantTranslations.ts';
import { getPlantSubcategory } from '../data/collections.ts';
import { plantPassportRegistryService, RegisteredPlantPassport } from '../services/plantPassportRegistryService.ts';
import { plantReviewService } from '../services/plantReviewService.ts';
import { getCategoryConfig, getNftClassConfig, resolvePlantNftClass } from '../config/ecosystemRegistry.ts';

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
  const categoryConfig = getCategoryConfig(plant.category);
  const nftClass = resolvePlantNftClass(plant);
  const nftClassConfig = getNftClassConfig(nftClass);

  const [mintedPassport, setMintedPassport] = useState<RegisteredPlantPassport | undefined>(() =>
    plantPassportRegistryService.findPassportForPlant({
      plantName: rawPlant.common_name,
      scientificName: rawPlant.scientific_name,
      sha256: rawPlant.image_sha256,
    })
  );

  const [heartSummary, setHeartSummary] = useState<PlantHeartSummary>(() =>
    plantReviewService.getCachedSummary(rawPlant.slug)
  );

  useEffect(() => {
    plantReviewService.fetchAllReviewSummaries().then(() => {
      setHeartSummary(plantReviewService.getCachedSummary(rawPlant.slug));
    });
    const unsub = plantReviewService.subscribe(() => {
      setHeartSummary(plantReviewService.getCachedSummary(rawPlant.slug));
    });
    return unsub;
  }, [rawPlant.slug]);

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

  const categoryLabel = `${categoryConfig.icon} ${isEn ? categoryConfig.labelEn : categoryConfig.labelVi}`;

  const isForest = plant.category === 'forest' || nftClass === 'geo_forest_10000m2';
  const forestStats = isForest && plant.forest_spec
    ? plantPassportRegistryService.getForestMintedAreaStats(plant.slug, plant.forest_spec.total_area_m2)
    : null;

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
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="%23064e3b"/><g fill="none" stroke="%2334d399" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(250, 120)"><path d="M50 160 C50 100, 10 70, 0 50 C40 50, 80 80, 80 160"/><path d="M50 160 C50 90, 90 60, 100 40 C70 40, 40 70, 30 140"/><line x1="50" y1="160" x2="50" y2="20"/></g><text x="50%" y="82%" text-anchor="middle" fill="%23a7f3d0" font-family="system-ui,sans-serif" font-size="16" font-weight="600" letter-spacing="1">YEU TRONG CAY</text></svg>`;
          }}
        />

        {/* Category tag */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${categoryConfig.badgeColorClass}`}>
          {categoryLabel}
        </div>

        {/* Top right badges: Heart rating & Spec */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {heartSummary.total_reviews > 0 ? (
            <div
              title={`${heartSummary.average_hearts.toFixed(1)} / 5 tim (${heartSummary.total_reviews} đánh giá)`}
              className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md text-rose-600 dark:text-rose-400 shadow-sm flex items-center gap-1 border border-rose-200/50 dark:border-rose-900/50"
            >
              <span>❤️</span>
              <span>{heartSummary.average_hearts.toFixed(1)}</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-normal">({heartSummary.total_reviews})</span>
            </div>
          ) : (
            <div
              title={isEn ? 'Be the first to rate with hearts!' : 'Hãy là người đầu tiên thả tim!'}
              className="px-2 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-md text-rose-500/80 dark:text-rose-400 shadow-sm flex items-center gap-1"
            >
              <span>🤍</span>
              <span className="text-[10px] text-gray-500 font-medium">{isEn ? 'New' : 'Mới'}</span>
            </div>
          )}

          {/* Difficulty / Radius */}
          <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-charcoal-800/90 backdrop-blur-md text-forest-900 dark:text-cream-50 shadow-sm flex items-center gap-1">
            <span>{isForest ? '📍' : t('plantCard.propagation')}</span>
            <span className="text-herbal-600 dark:text-herbal-400 font-bold">
              {isForest ? `${plant.forest_spec?.radius_km || 15}km` : `${plant.propagation_difficulty}/5`}
            </span>
          </div>
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
            {isForest && plant.forest_spec ? (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="text-teal-600 dark:text-teal-400">🌲</span>
                  <span className="truncate">{(plant.forest_spec.total_area_m2 / 10000).toLocaleString('vi-VN')} ha</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">Tâm ±{plant.forest_spec.radius_km}km</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{sunlightText}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="truncate">{wateringText}</span>
                </div>
              </>
            )}
          </div>

          {/* Forest Quota Progress Bar (For Forest Category) */}
          {forestStats && plant.forest_spec && (
            <div className="p-2 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-800/50 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-teal-900 dark:text-teal-200">
                <span className="flex items-center gap-1">
                  <span>🌲</span>
                  <span>{isEn ? 'Conservation Lots (1 ha/lot):' : 'Quỹ Lô Rừng (1 ha/lô):'}</span>
                </span>
                <span className="font-mono font-bold text-teal-700 dark:text-teal-300">
                  {forestStats.mintedCount} / {plant.forest_spec.max_nft_supply}
                </span>
              </div>
              <div className="w-full bg-teal-200/50 dark:bg-teal-900/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-600 dark:bg-teal-400 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        forestStats.maxSupply > 0
                          ? (forestStats.mintedCount / forestStats.maxSupply) * 100
                          : 0
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Web3 Action Button */}
          {isForest && forestStats && plant.forest_spec ? (
            forestStats.isSoldOut ? (
              <div className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-charcoal-800 text-gray-500 dark:text-gray-400 text-center text-xs font-semibold border border-gray-200 dark:border-gray-700">
                {isEn ? 'Fully Conserved (100% Minted)' : 'Đã đúc đủ 100% diện tích bảo tồn'}
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/web3-sandbox?mint=${encodeURIComponent(rawPlant.slug)}&class=geo_forest_10000m2`);
                }}
                title={isEn ? 'Mint a 10,000m² Forest Lot NFT' : 'Đúc 1 Lô Rừng 10.000m² (Yêu cầu có mặt tại tọa độ rừng)'}
                className="w-full px-3 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-left flex items-center justify-between gap-2 transition cursor-pointer shadow-sm group/forest"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold truncate">
                  <MapPin className="w-3.5 h-3.5 text-teal-200 group-hover/forest:animate-bounce shrink-0" />
                  <span className="truncate">
                    {isEn ? `Mint Lot #${forestStats.mintedCount + 1} (10,000m²)` : `Đúc Lô Rừng #${forestStats.mintedCount + 1} (10.000m²)`}
                  </span>
                </span>
                <span className="text-[10px] font-semibold text-teal-200 group-hover/forest:text-white shrink-0">
                  {isEn ? 'GPS Check-in →' : 'Tại Rừng →'}
                </span>
              </button>
            )
          ) : mintedPassport && ownerMeta ? (
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
                navigate(`/web3-sandbox?mint=${encodeURIComponent(rawPlant.slug)}&class=${nftClass}`);
              }}
              title={
                isEn
                  ? `Be the first to mint ${nftClassConfig.nameEn}`
                  : `Đúc ${nftClassConfig.nameVi} độc bản (Ai tạo trước sở hữu trước)`
              }
              className="w-full px-3 py-2 rounded-xl bg-forest-50/90 hover:bg-emerald-600 dark:bg-charcoal-800 dark:hover:bg-emerald-600 text-forest-800 hover:text-white dark:text-emerald-300 dark:hover:text-white border border-emerald-500/30 hover:border-emerald-600 text-left flex items-center justify-between gap-2 transition cursor-pointer group/mint"
            >
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold truncate">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover/mint:text-amber-300 shrink-0 transition-colors" />
                <span className="truncate">
                  {isEn ? nftClassConfig.mintButtonCompactEn : nftClassConfig.mintButtonCompactVi}
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
