/**
 * HỢP ĐỒNG DỮ LIỆU CỐT LÕI HỆ SINH THÁI YÊU TRỒNG CÂY
 * Tuân thủ 15 móc nối tương thích (H1 - H15) từ KE_HOACH_MILESTONES.md
 */

export type PlantCategory = 'herb' | 'fruit' | 'ornamental';

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
  medical_info?: PlantMedicalInfo; // Thông tin y tế & cảnh báo (dành cho herb)
  how_to_grow_steps?: PlantHowToStep[]; // GEO & HowTo Schema
  faqs?: PlantFAQ[];            // AEO FAQPage Schema
  academic_citations?: string[]; // GEO Authoritative Citations (Dược điển, Sách GS Đỗ Tất Lợi)
  monetization_tips?: string[]; // Gợi ý kiếm tiền từ cây này
  tags: string[];
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
  network: 'Base Sepolia' | 'Polygon Amoy';
  evolution_stage: 1 | 2 | 3;           // 1: Mầm non, 2: Cây sinh trưởng, 3: Đơm hoa kết trái
  transaction_hash: string;
  is_testnet: true;
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
