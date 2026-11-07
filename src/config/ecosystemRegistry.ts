/**
 * Yêu Trồng Cây - Ecosystem Single Source of Truth Registry
 * Trung tâm Cấu hình Đa Ngành Hàng & Hệ Thống Tài Sản Số NFT Độc Bản
 */

import { Plant, PlantCategory, NftAssetClass } from '../types/index.ts';

export interface EcosystemCategoryConfig {
  id: PlantCategory;
  placement: 'navbar_and_home' | 'home_only';
  dedicatedPath: string;
  defaultNftClass: NftAssetClass;
  icon: string;
  badgeColorClass: string;
  labelVi: string;
  labelEn: string;
  headingVi: string;
  headingEn: string;
  descriptionVi: string;
  descriptionEn: string;
  unitVi: string;
  unitEn: string;
}

export interface NftAssetClassConfig {
  id: NftAssetClass;
  name: string;
  nameVi: string;
  nameEn: string;
  shortName: string;
  certificateTitle: string;
  badgeColorClass: string;
  icon: string;
  mintButtonVi: string;
  mintButtonEn: string;
  onChainPrefix: string;
  supplyMode: 'exclusive_1_of_1' | 'per_lot_10000m2';
  stagesVi: [string, string, string];
  stagesEn: [string, string, string];
  evolutionStages: [string, string, string];
}

export const ECOSYSTEM_CATEGORIES: Record<PlantCategory, EcosystemCategoryConfig> = {
  herb: {
    id: 'herb',
    placement: 'navbar_and_home',
    dedicatedPath: '/thao-duoc',
    defaultNftClass: 'botanical',
    icon: '🌱',
    badgeColorClass: 'bg-emerald-900/85 text-emerald-100 border border-emerald-400/30',
    labelVi: 'Thảo Dược Bản Địa',
    labelEn: 'Native Medicinal Herbs',
    headingVi: 'Tủ Thuốc Xanh (Thảo Dược Bản Địa)',
    headingEn: 'Green Pharmacy (Native Medicinal Herbs)',
    descriptionVi: 'Tra cứu các loài thảo dược bản địa Việt Nam: công dụng trị ho, giải cảm, bổ huyết, liều dùng an toàn và bài thuốc dân gian.',
    descriptionEn: 'Discover native Vietnamese medicinal herbs: safe dosages, folk remedies, and home cultivation.',
    unitVi: 'loài thảo dược',
    unitEn: 'herbal species',
  },
  fruit: {
    id: 'fruit',
    placement: 'navbar_and_home',
    dedicatedPath: '/cay-an-trai',
    defaultNftClass: 'botanical',
    icon: '🍋',
    badgeColorClass: 'bg-amber-800/85 text-amber-100 border border-amber-400/30',
    labelVi: 'Cây Ăn Trái Ban Công',
    labelEn: 'Balcony Fruit Trees',
    headingVi: 'Trái Ngọt Phố (Cây Ăn Quả Ban Công)',
    headingEn: 'Balcony Fruits (Urban Orchards)',
    descriptionVi: 'Cẩm nang trồng cây ăn trái lùn đô thị: ổi lê, cóc Thái, sung Mỹ, dâu tằm, chanh tứ quý trĩu quả quanh năm.',
    descriptionEn: 'Handbook for growing dwarf container fruit varieties: guava, ambarella, honey figs, and continuous limes.',
    unitVi: 'giống cây',
    unitEn: 'fruit varieties',
  },
  ornamental: {
    id: 'ornamental',
    placement: 'navbar_and_home',
    dedicatedPath: '/cay-canh',
    defaultNftClass: 'botanical',
    icon: '🌸',
    badgeColorClass: 'bg-purple-900/85 text-purple-100 border border-purple-400/30',
    labelVi: 'Cây Cảnh & Bonsai',
    labelEn: 'Ornamentals & Bonsai',
    headingVi: 'Cây Cảnh & Thư Thái (Bonsai & Phong Thủy)',
    headingEn: 'Bonsai & Calming Living Spaces',
    descriptionVi: 'Các loài cây cảnh thanh lọc không khí NASA, nghệ thuật tạo tác bonsai phong thủy và cây cảnh nội thất.',
    descriptionEn: 'Air-purifying houseplants, fragrant bonsai creations, and prosperity greenery.',
    unitVi: 'loài cây cảnh',
    unitEn: 'ornamental varieties',
  },
  space: {
    id: 'space',
    placement: 'home_only',
    dedicatedPath: '/?cat=space',
    defaultNftClass: 'space_method',
    icon: '🏡',
    badgeColorClass: 'bg-cyan-900/85 text-cyan-100 border border-cyan-400/30',
    labelVi: 'Không Gian Trồng Phố',
    labelEn: 'Urban Growing Spaces',
    headingVi: 'Không Gian & Mô Hình Trồng Phố',
    headingEn: 'Urban Growing Spaces & Living Blueprints',
    descriptionVi: 'Bản vẽ kiến trúc vườn ban công hướng Tây, logia khuất nắng, giàn leo sân thượng siêu nhẹ và tiểu cảnh trong nhà.',
    descriptionEn: 'Architectural blueprints for heat-shield balconies, low-light loggias, lightweight rooftops, and indoor greens.',
    unitVi: 'thiết kế',
    unitEn: 'blueprints',
  },
  recycle: {
    id: 'recycle',
    placement: 'home_only',
    dedicatedPath: '/?cat=recycle',
    defaultNftClass: 'eco_invention',
    icon: '♻️',
    badgeColorClass: 'bg-lime-900/85 text-lime-100 border border-lime-400/30',
    labelVi: 'Tái Chế Làm Vườn',
    labelEn: 'Upcycled Garden DIY',
    headingVi: 'Sáng Chế Tái Chế & Tuần Hoàn Xanh',
    headingEn: 'Upcycled Garden DIY & Circular Inventions',
    descriptionVi: 'Chế tạo chậu tự tưới bấc thấm từ can nhựa an toàn, thùng ủ Bokashi không mùi và thuốc trừ sâu sinh học tại gia.',
    descriptionEn: 'Self-watering capillary planters from safe HDPE jugs, zero-odor Bokashi composting, and organic pest shields.',
    unitVi: 'sáng chế',
    unitEn: 'inventions',
  },
  culinary: {
    id: 'culinary',
    placement: 'home_only',
    dedicatedPath: '/?cat=culinary',
    defaultNftClass: 'culinary_recipe',
    icon: '🍵',
    badgeColorClass: 'bg-rose-900/85 text-rose-100 border border-rose-400/30',
    labelVi: 'Ẩm Thực & Đồ Uống Xanh',
    labelEn: 'Herbal Kitchen & Drinks',
    headingVi: 'Ẩm Thực & Đồ Uống Thảo Mộc (Dược Thiện)',
    headingEn: 'Herbal Kitchen, Tonics & Natural Elixirs',
    descriptionVi: 'Siro trị ho chưng cách thủy, trà hoa đổi màu, nước sâm mát gan và món ăn bài thuốc từ thảo mộc thu hái tại vườn.',
    descriptionEn: 'Steamed herbal cough elixirs, antioxidant floral infusions, detox tonics, and medicinal kitchen recipes.',
    unitVi: 'bí phương',
    unitEn: 'recipes',
  },
  forest: {
    id: 'forest',
    placement: 'home_only',
    dedicatedPath: '/?cat=forest',
    defaultNftClass: 'geo_forest_10000m2',
    icon: '🌲',
    badgeColorClass: 'bg-teal-900/85 text-teal-100 border border-teal-400/30',
    labelVi: 'Rừng & Khu Sinh Thái',
    labelEn: 'Natural Forests & Eco-Zones',
    headingVi: 'Rừng Tự Nhiên & Khu Sinh Thái',
    headingEn: 'Natural Forests, National Parks & Biospheres',
    descriptionVi: 'Bảo tồn hệ sinh thái 15 Vườn Quốc Gia & Khu Dự Trữ Sinh Quyển Việt Nam. Đúc chứng chỉ 10.000m² rừng khi có mặt tại khu vực.',
    descriptionEn: 'Conserving Vietnam\'s 15 National Parks and UNESCO Biospheres. Mint 10,000m² conservation NFTs when physically present in the forest zone.',
    unitVi: 'khu bảo tồn',
    unitEn: 'reserves',
  },
};

export const NFT_ASSET_CLASSES: Record<NftAssetClass, NftAssetClassConfig> = {
  botanical: {
    id: 'botanical',
    name: 'Hộ Chiếu Thực Vật Số',
    nameVi: 'Hộ Chiếu Thực Vật Số',
    nameEn: 'Botanical NFT Passport',
    shortName: 'Thực Vật',
    certificateTitle: 'Hộ Chiếu Cây Trồng Số',
    badgeColorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    icon: '🌱',
    mintButtonVi: 'Tạo NFT Cây Này (Chưa có chủ)',
    mintButtonEn: 'Mint Plant NFT (Unclaimed)',
    onChainPrefix: '',
    supplyMode: 'exclusive_1_of_1',
    stagesVi: ['1/3 - Mầm Non', '2/3 - Sinh Trưởng Thân Lá', '3/3 - Ra Hoa Kết Trái'],
    stagesEn: ['1/3 - Seedling', '2/3 - Vegetative Growth', '3/3 - Flowering & Fruiting'],
    evolutionStages: ['1/3 - Mầm Non', '2/3 - Sinh Trưởng Thân Lá', '3/3 - Ra Hoa Kết Trái'],
  },
  space_method: {
    id: 'space_method',
    name: 'Bản Quyền Kiến Trúc Xanh',
    nameVi: 'Bản Quyền Kiến Trúc Xanh',
    nameEn: 'Green Architecture Blueprint',
    shortName: 'Không Gian',
    certificateTitle: 'Bản Quyền Kiến Trúc Xanh',
    badgeColorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    icon: '📐',
    mintButtonVi: 'Đúc NFT Thiết Kế Này (Chưa có chủ)',
    mintButtonEn: 'Mint Blueprint NFT (Unclaimed)',
    onChainPrefix: 'Method:',
    supplyMode: 'exclusive_1_of_1',
    stagesVi: ['1/3 - Bản Vẽ Thiết Kế', '2/3 - Thi Công Thực Địa', '3/3 - Hệ Sinh Thái Hoàn Chỉnh'],
    stagesEn: ['1/3 - Blueprint Draft', '2/3 - Field Implementation', '3/3 - Fully Operating Space'],
    evolutionStages: ['1/3 - Bản Vẽ Thiết Kế', '2/3 - Thi Công Thực Địa', '3/3 - Hệ Sinh Thái Hoàn Chỉnh'],
  },
  eco_invention: {
    id: 'eco_invention',
    name: 'Bằng Sáng Chế Tuần Hoàn',
    nameVi: 'Bằng Sáng Chế Tuần Hoàn',
    nameEn: 'Circular Eco-Patent',
    shortName: 'Sáng Chế',
    certificateTitle: 'Bằng Sáng Chế Tuần Hoàn',
    badgeColorClass: 'bg-lime-500/20 text-lime-300 border-lime-400/40',
    icon: '♻️',
    mintButtonVi: 'Đúc NFT Sáng Chế Này (Chưa có chủ)',
    mintButtonEn: 'Mint Eco-Patent NFT (Unclaimed)',
    onChainPrefix: 'Patent:',
    supplyMode: 'exclusive_1_of_1',
    stagesVi: ['1/3 - Nguyên Mẫu DIY', '2/3 - Vận Hành Ổn Định', '3/3 - Chuẩn Hóa Nhân Rộng'],
    stagesEn: ['1/3 - DIY Prototype', '2/3 - Stable Operation', '3/3 - Scaled Standard'],
    evolutionStages: ['1/3 - Nguyên Mẫu DIY', '2/3 - Vận Hành Ổn Định', '3/3 - Chuẩn Hóa Nhân Rộng'],
  },
  culinary_recipe: {
    id: 'culinary_recipe',
    name: 'Chứng Nhận Bí Phương Dưỡng Sinh',
    nameVi: 'Chứng Nhận Bí Phương Dưỡng Sinh',
    nameEn: 'Healing Culinary Recipe',
    shortName: 'Bí Phương',
    certificateTitle: 'Chứng Nhận Bí Phương Dưỡng Sinh',
    badgeColorClass: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    icon: '🍵',
    mintButtonVi: 'Đúc NFT Bí Phương Này (Chưa có chủ)',
    mintButtonEn: 'Mint Elixir Recipe NFT (Unclaimed)',
    onChainPrefix: 'Formula:',
    supplyMode: 'exclusive_1_of_1',
    stagesVi: ['1/3 - Sơ Chế Nguyên Liệu', '2/3 - Chiết Xuất / Ủ Men', '3/3 - Thượng Phẩm Dưỡng Sinh'],
    stagesEn: ['1/3 - Raw Preparation', '2/3 - Infusion / Fermentation', '3/3 - Master Remedy'],
    evolutionStages: ['1/3 - Sơ Chế Nguyên Liệu', '2/3 - Chiết Xuất / Ủ Men', '3/3 - Thượng Phẩm Dưỡng Sinh'],
  },
  geo_forest_10000m2: {
    id: 'geo_forest_10000m2',
    name: 'Chứng Chỉ 10.000m² Rừng Tự Nhiên',
    nameVi: 'Chứng Chỉ 10.000m² Rừng Tự Nhiên',
    nameEn: '10,000m² Natural Forest Conservation Certificate',
    shortName: 'Lô Rừng',
    certificateTitle: 'Chứng Chỉ Bảo Tồn 10.000m² Rừng',
    badgeColorClass: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
    icon: '🌲',
    mintButtonVi: 'Đúc 10.000m² Rừng (Tại Khu Vực)',
    mintButtonEn: 'Mint 10,000m² Forest Lot (On-site)',
    onChainPrefix: 'GeoForest 10000m²:',
    supplyMode: 'per_lot_10000m2',
    stagesVi: ['1/3 - Đặt Chân Khu Vực Rừng', '2/3 - Giám Hộ Sinh Quyển', '3/3 - Di Sản Rừng Vĩnh Cửu'],
    stagesEn: ['1/3 - Forest Zone Verified', '2/3 - Biosphere Steward', '3/3 - Eternal Heritage'],
    evolutionStages: ['1/3 - Đặt Chân Khu Vực Rừng', '2/3 - Giám Hộ Sinh Quyển', '3/3 - Di Sản Rừng Vĩnh Cửu'],
  },
};

export const NFT_ASSET_CLASSES_LIST: NftAssetClassConfig[] = Object.values(NFT_ASSET_CLASSES);

export function getCategoryConfig(category: PlantCategory): EcosystemCategoryConfig {
  return ECOSYSTEM_CATEGORIES[category] || ECOSYSTEM_CATEGORIES.herb;
}

export function getNftClassConfig(nftClass: NftAssetClass): NftAssetClassConfig {
  return NFT_ASSET_CLASSES[nftClass] || NFT_ASSET_CLASSES.botanical;
}

export function resolvePlantNftClass(plant: Plant): NftAssetClass {
  if (plant.nft_class) {
    return plant.nft_class;
  }
  const catConfig = getCategoryConfig(plant.category);
  return catConfig.defaultNftClass;
}

export function inferNftClassFromPassport(passport: {
  scientific_name?: string;
  plant_name?: string;
  nft_class?: string;
}): NftAssetClass {
  if (passport.nft_class && passport.nft_class in NFT_ASSET_CLASSES) {
    return passport.nft_class as NftAssetClass;
  }
  const sci = (passport.scientific_name || '').trim();
  if (sci.startsWith('GeoForest 10000m²:')) return 'geo_forest_10000m2';
  if (sci.startsWith('Method:')) return 'space_method';
  if (sci.startsWith('Patent:')) return 'eco_invention';
  if (sci.startsWith('Formula:')) return 'culinary_recipe';
  return 'botanical';
}

export function isBotanicalSpecies(category: PlantCategory): boolean {
  return category === 'herb' || category === 'fruit' || category === 'ornamental';
}

/**
 * Thuật toán Haversine tính khoảng cách đường chim bay (km) giữa 2 tọa độ GPS
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}

/**
 * Vé Check-in GPS Thực Địa Lưu Tạm 24 Giờ (Chống mất sóng 4G ở rừng sâu)
 */
export interface ForestGpsCheckinPass {
  forestSlug: string;
  userLat: number;
  userLng: number;
  distanceKm: number;
  timestamp: number;
  expiresAt: number; // 24 giờ sau khi check-in thành công
}

export function saveForestGpsCheckinPass(
  slug: string,
  userLat: number,
  userLng: number,
  distanceKm: number
): ForestGpsCheckinPass {
  const now = Date.now();
  const pass: ForestGpsCheckinPass = {
    forestSlug: slug,
    userLat,
    userLng,
    distanceKm,
    timestamp: now,
    expiresAt: now + 24 * 60 * 60 * 1000,
  };
  try {
    localStorage.setItem(`ytc_forest_gps_pass_${slug}`, JSON.stringify(pass));
  } catch (err) {
    console.warn('Cannot save GPS pass to localStorage:', err);
  }
  return pass;
}

export function getValidForestGpsCheckinPass(slug: string): ForestGpsCheckinPass | null {
  try {
    const raw = localStorage.getItem(`ytc_forest_gps_pass_${slug}`);
    if (!raw) return null;
    const pass = JSON.parse(raw) as ForestGpsCheckinPass;
    if (pass.expiresAt && pass.expiresAt > Date.now()) {
      return pass;
    }
    localStorage.removeItem(`ytc_forest_gps_pass_${slug}`);
  } catch {
    // Ignore
  }
  return null;
}

/**
 * Thuật toán Trộn Xen Kẽ Vòng Tròn (Smart Marketplace Interleaving)
 * Khi ở chế độ 'all' và không tìm kiếm, trộn đều các ngành hàng để ngay trong
 * 9-12 sản phẩm đầu tiên khách thấy phong phú đa ngành.
 */
export function interleaveMarketplaceItems(items: Plant[]): Plant[] {
  const order: PlantCategory[] = ['herb', 'space', 'fruit', 'recycle', 'ornamental', 'culinary', 'forest'];
  const buckets: Record<PlantCategory, Plant[]> = {
    herb: [],
    fruit: [],
    ornamental: [],
    space: [],
    recycle: [],
    culinary: [],
    forest: [],
  };

  for (const item of items) {
    if (buckets[item.category]) {
      buckets[item.category].push(item);
    } else {
      buckets.herb.push(item);
    }
  }

  const result: Plant[] = [];
  let added = true;
  let idx = 0;

  while (added) {
    added = false;
    for (const cat of order) {
      if (idx < buckets[cat].length) {
        result.push(buckets[cat][idx]);
        added = true;
      }
    }
    idx++;
  }

  return result;
}
