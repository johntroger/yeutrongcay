/**
 * HỢP ĐỒNG DỮ LIỆU CỐT LÕI HỆ SINH THÁI YÊU TRỒNG CÂY
 * Tuân thủ 15 móc nối tương thích (H1 - H15) từ KE_HOACH_MILESTONES.md
 */

export type PlantCategory = 'herb' | 'fruit' | 'ornamental' | 'space' | 'recycle' | 'culinary' | 'forest';

export type NftAssetClass = 'botanical' | 'space_method' | 'eco_invention' | 'culinary_recipe' | 'geo_forest_10000m2';

export interface ForestGeoSpec {
  total_area_m2: number;      // Tổng diện tích thực tế tính bằng m² (VD: 224,080,000 m²)
  unit_area_m2: number;       // Mặc định 10,000 m² / 1 NFT (1 ha)
  max_nft_supply: number;     // Tổng số Lô NFT tối đa = Math.floor(total_area_m2 / 10000)
  center_lat: number;         // Vĩ độ tâm khu vực rừng
  center_lng: number;         // Kinh độ tâm khu vực rừng
  radius_km: number;          // Bán kính khu vực rừng cho phép đúc NFT (km)
  province: string;           // Tỉnh / Vùng sinh thái
  unesco_or_status: string;   // Danh hiệu bảo tồn (UNESCO / Ramsar / Vườn Quốc Gia)
}

export interface BlueprintSpec {
  target_area: string;
  difficulty_level: string;
  cost_estimate_vnd: string;
  components: string[];
  tools_needed: string[];
  estimated_setup_hours: number;
}

export interface EcoInventionSpec {
  waste_input: string;
  output_yield: string;
  carbon_offset_kg_year: number;
  materials_cost_vnd: string;
  upcycled_components: string[];
}

export interface RecipeSpec {
  prep_time_minutes: number;
  cook_time_minutes: number;
  servings: string;
  botanical_ingredients: string[];
  health_benefits: string[];
}

export interface PlantHeartReview {
  id: string;
  plant_slug: string;
  author_name: string;
  author_handle?: string;
  author_wallet?: string;
  is_nft_owner?: boolean;      // Được xác thực chéo với sổ cái NFT trên Server
  hearts: 1 | 2 | 3 | 4 | 5;   // Thang điểm 1 đến 5 Trái Tim Đỏ ❤️
  context_tag?: string;        // Thẻ ngữ cảnh thực tế (VD: 'Sân thượng', 'Ban công', 'Đã làm thử', 'Tại rừng')
  comment: string;
  image_urls: string[];        // Tối đa 2 ảnh tĩnh đã nén WebP (Cấm tuyệt đối video)
  images?: string[];           // Alias hỗ trợ truyền payload
  created_at: string;
}

export interface PlantHeartSummary {
  average_hearts: number;      // VD: 4.9
  total_reviews: number;       // Tổng lượt thả tim / bình luận
  photo_count: number;         // Số bình luận có đính kèm ảnh
}

export interface RegionalSeason {
  north: string;     // Lịch mùa miền Bắc
  central: string;   // Lịch mùa miền Trung
  south: string;     // Lịch mùa miền Nam
  best_months: number[]; // Tháng lý tưởng nhất để giâm/chiết (1-12)
  warning?: string;  // Cảnh báo thời tiết không nên nhân giống
}

export interface PlantMedicalInfo {
  uses: string[];               // Công dụng thực tế (giải cảm, trị ho, an thần...)
  folk_remedies?: string[];     // Bài thuốc dân gian tham khảo
  preparation?: string[];       // Cách sơ chế tại nhà (nấu siro, sấy trà...)
  toxicity_warning?: string;    // Cảnh báo độc tính hoặc đối tượng kiêng kỵ
  contraindications?: string[]; // Chống chỉ định chuyên sâu theo Dược điển V
  drug_interactions?: string[]; // Tương tác thuốc Tây cần lưu ý
  disclaimer: string;           // Tuyên bố từ chối trách nhiệm y tế
  confusion_risk?: {            // Phân biệt với cây dễ nhầm lẫn
    confused_with: string;
    distinguishing_features: string;
  };
}

export interface PlantFAQ {
  question: string;
  answer: string;
}

export interface PlantHowToStep {
  step: number;
  title: string;
  instruction: string;
}

export interface PlantBotanicalDetails {
  family?: string;              // Họ thực vật chuẩn Latinh & tên Việt (e.g. Lamiaceae - Họ Hoa Môi)
  native_range?: string;        // Vùng phân bố địa lý (Việt Nam, Đông Nam Á...)
  active_compounds?: string[];  // Hoạt chất hóa thực vật chính (Thymol, Carvacrol, Tanin...)
  soil_ph?: string;             // Độ pH đất tối ưu (e.g. 6.0 - 7.0)
  ideal_temp?: string;          // Nhiệt độ sinh trưởng lý tưởng (e.g. 22°C - 32°C)
  pot_size?: string;            // Kích thước chậu ban công khuyến nghị (e.g. 25cm - 40cm)
}

export interface Plant {
  id: string;                   // UUID
  slug: string;                 // URL slug bất biến
  common_name: string;          // Tên phổ biến nhất (Húng chanh)
  common_name_en?: string;       // Tên Tiếng Anh tự động từ DB
  scientific_name: string;      // Tên khoa học quốc tế chuẩn (Plectranthus amboinicus)
  aliases: string[];            // Tên gọi địa phương (Tần dày lá, rau thơm lông...)
  category: PlantCategory;      // herb | fruit | ornamental
  description: string;          // Mô tả tổng quan
  description_en?: string;      // Mô tả Tiếng Anh tự động từ DB
  translations_en?: any;        // Toàn bộ dữ liệu tiếng Anh cấu trúc tự động từ DB
  quick_answer?: string;        // Khối AEO Direct Answer 40-60 từ tối ưu cho AI Overviews / Perplexity
  botanical_details?: PlantBotanicalDetails; // GEO Entity Grounding & Knowledge Graph
  image_url: string;            // Ảnh đại diện chất lượng cao
  image_sha256?: string;        // Bằng chứng mã băm cho Web3
  sunlight: 'full_sun' | 'partial_shade' | 'indoor'; // Ánh sáng
  watering: 'daily' | 'moderate' | 'drought_tolerant'; // Lịch tưới
  propagation_difficulty: 1 | 2 | 3 | 4 | 5; // Độ khó nhân giống (1: Rất dễ - 5: Khó)
  growth_time: string;          // Thời gian từ ươm đến thu hoạch (ví dụ: 45 ngày, 6 tháng)
  container_suitable: boolean;  // Trồng được trong chậu/ban công không
  seasonality?: RegionalSeason; // Lịch nông vụ theo vùng
  cultivation_guide?: { soil?: string; watering?: string; sunlight?: string; fertilizing?: string }; // Hướng dẫn kỹ thuật canh tác
  medical_info?: PlantMedicalInfo; // Thông tin y tế & cảnh báo (dành cho herb)
  how_to_grow_steps?: PlantHowToStep[]; // GEO & HowTo Schema
  faqs?: PlantFAQ[];            // AEO FAQPage Schema
  academic_citations?: string[]; // GEO Authoritative Citations (Dược điển, Sách GS Đỗ Tất Lợi)
  reference_sources?: Array<{ title: string; author?: string; organization?: string; verification_type?: string }> | string[]; // Nguồn tham khảo uy tín thẩm định
  monetization_tips?: string[]; // Gợi ý kiếm tiền từ cây này
  subcategory?: string;         // Phân nhóm phụ (ví dụ: Trị ho & Hô hấp, Lọc khí NASA, Cam chanh...)
  collection_slugs?: string[];  // Danh sách slug bộ sưu tập/chuyên đề chứa cây này
  tags: string[];
  nft_class?: NftAssetClass;    // Hạng tài sản NFT tương ứng
  related_plant_ids?: string[]; // Liên kết chéo sang cây nguyên liệu/liên quan
  forest_spec?: ForestGeoSpec;  // Thông số địa lý & quỹ diện tích cho Rừng (10.000m²/NFT)
  blueprint_spec?: BlueprintSpec; // Bản vẽ kỹ thuật & dự toán không gian (space)
  eco_spec?: EcoInventionSpec;  // Thông số tái chế & giảm carbon (recycle)
  recipe_spec?: RecipeSpec;    // Công thức ẩm thực & dưỡng sinh (culinary)
}

export interface PlantCollection {
  id: string;
  slug: string;
  title: string;
  title_en: string;
  subtitle: string;
  subtitle_en: string;
  description: string;
  description_en: string;
  icon: string;
  badge: string;
  badge_en: string;
  themeColor: 'emerald' | 'amber' | 'purple' | 'blue' | 'rose' | 'teal';
  plantIds: string[];
  benefits: string[];
  benefits_en: string[];
  companion_planting_tip?: string;
  companion_planting_tip_en?: string;
}

export interface PlantFilterOptions {
  category?: PlantCategory | 'all';
  subcategory?: string;
  tag?: string;
  collection?: string;
  sunlight?: 'all' | 'full_sun' | 'partial_shade' | 'indoor';
  watering?: 'all' | 'daily' | 'moderate' | 'drought_tolerant';
  difficulty?: 'all' | 'easy' | 'medium' | 'hard';
  searchQuery?: string;
}

export type ContentType = 'question' | 'answer' | 'diary' | 'swap_offer';
export type ContentStatus = 'visible' | 'pending' | 'hidden';

export interface ClinicAnswer {
  id: string;
  question_id: string;
  author_name: string;
  author_badge?: string; // 'Nhà Vườn Kinh Nghiệm' | 'Dược Sĩ Cổ Truyền' | 'Thành Viên Tích Cực'
  content: string;
  upvotes: number;
  created_at: string;
  is_verified?: boolean;
}

export interface ClinicQuestion {
  id: string;
  user_id: string;
  user_name: string;
  title: string;
  description: string;
  plant_name_hint?: string;
  region: 'north' | 'central' | 'south'; // Vùng miền để chẩn đoán chính xác
  symptoms: string[];                    // Vàng lá, rệp sáp, thối rễ...
  images: string[];                      // Danh sách ảnh lá bệnh đã tẩy EXIF
  ai_instant_diagnosis?: string;         // Phân tích sơ bộ tức thì của AI trong 3s
  answers: ClinicAnswer[];
  reports_count?: number;
  status: ContentStatus;
  created_at: string;
}

export interface UserGardenPlant {
  id: string;
  plant_id: string;
  plant_name: string;
  scientific_name: string;
  category: PlantCategory;
  planted_date: string;
  location: string;
  image_url: string;
  notes?: string;
  watering_interval_days: number;
  last_watered_date: string;
  passport_token_id?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  badge: string;
  karma_points: number;
  heart_points?: number; // Trái tim yêu thương & uy tín nhà vườn
  joined_date: string;
}

export interface Web3TestnetPassport {
  token_id: string;
  plant_name: string;
  scientific_name: string;
  owner_address: string;
  minted_at: string;
  image_url: string;
  image_sha256: string;
  network: 'Base Sepolia' | 'Polygon Amoy' | 'Ethereum Sepolia' | string;
  evolution_stage: 1 | 2 | 3;           // 1: Mầm non, 2: Cây sinh trưởng, 3: Đơm hoa kết trái
  transaction_hash: string;
  is_testnet: true;
  is_onchain?: boolean;
  contract_address?: string;
}

export interface GardenModeConfig {
  mode: PlantCategory;
  title: string;
  tagline: string;
  hero_image: string;
  badge_color: string;
}

export type SwapOfferType = 'giveaway' | 'exchange' | 'seek';

export interface SwapOffer {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  region_zone: 'north' | 'central' | 'south'; // Tuân thủ H4 (Lịch vùng miền)
  location_name: string;                      // Tuân thủ H8 (Làm mờ, cấp Quận/Huyện, không lưu GPS)
  plant_name: string;
  scientific_name?: string;
  offer_type: SwapOfferType;                  // 'giveaway' | 'exchange' | 'seek'
  item_type: string;                          // 'Cành giâm' | 'Hạt giống' | 'Cây con bầu đất' | 'Cây chậu'
  description: string;
  quarantine_pledge: boolean;                 // Cam kết quy tắc cách ly cây 7 ngày
  image_url: string;
  status: ContentStatus;                      // Tuân thủ H5
  created_at: string;
  contact_note?: string;
}

// ==========================================
// MÔ HÌNH VƯỜN SỐ & NHẬT KÝ CÂY TRỒNG (MS4 - H1, H5, H7)
// ==========================================
export type GardenType = 'balcony' | 'rooftop' | 'backyard' | 'indoor_window';
export type PlantGrowthStatus = 'healthy' | 'flowering' | 'fruiting' | 'recovering' | 'dormant';

export interface UserGarden {
  id: string;
  user_id: string;
  user_name: string;
  garden_name: string;
  garden_type: GardenType;
  city: string;
  description?: string;
  created_at?: string;
}

export interface GardenPlant {
  id: string;
  garden_id: string;
  plant_id?: string;
  custom_name: string;
  species_name?: string;
  planted_date: string; // YYYY-MM-DD
  pot_type: string;
  current_status: PlantGrowthStatus;
  cover_image_url: string;
  notes?: string;
  created_at?: string;
  last_watered_at?: string; // YYYY-MM-DD
  last_fertilized_at?: string; // YYYY-MM-DD
  watering_interval_days?: number;
  fertilizing_interval_days?: number;
}

export interface PlantDiaryEntry {
  id: string;
  garden_plant_id: string;
  user_id: string;
  entry_date: string; // YYYY-MM-DD
  stage: string;
  note: string;
  image_url: string;
  image_sha256?: string;
  metrics?: {
    height_cm?: number;
    fruit_count?: number;
    health_score?: number;
  };
  status: ContentStatus;
  created_at?: string;
}
