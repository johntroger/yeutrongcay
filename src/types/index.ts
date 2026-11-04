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

export interface Plant {
  id: string;                   // UUID
  slug: string;                 // URL slug bất biến
  common_name: string;          // Tên phổ biến nhất (Húng chanh)
  scientific_name: string;      // Tên khoa học quốc tế chuẩn (Plectranthus amboinicus)
  aliases: string[];            // Tên gọi địa phương (Tần dày lá, rau thơm lông...)
  category: PlantCategory;      // herb | fruit | ornamental
  description: string;          // Mô tả tổng quan
  image_url: string;            // Ảnh đại diện chất lượng cao
  image_sha256?: string;        // Bằng chứng mã băm cho Web3
  sunlight: 'full_sun' | 'partial_shade' | 'indoor'; // Ánh sáng
  watering: 'daily' | 'moderate' | 'drought_tolerant'; // Lịch tưới
  propagation_difficulty: 1 | 2 | 3 | 4 | 5; // Độ khó nhân giống (1: Rất dễ - 5: Khó)
  growth_time: string;          // Thời gian từ ươm đến thu hoạch (ví dụ: 45 ngày, 6 tháng)
  container_suitable: boolean;  // Trồng được trong chậu/ban công không
  seasonality?: RegionalSeason; // Lịch nông vụ theo vùng
  medical_info?: PlantMedicalInfo; // Thông tin y tế & cảnh báo (dành cho herb)
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
