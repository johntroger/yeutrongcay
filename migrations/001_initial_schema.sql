-- ==========================================================
-- BẢN MIGRATION 001: KHỞI TẠO CẤU TRÚC DỮ LIỆU CỐT LÕI
-- Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
-- Ngày tạo: 04/11/2026
-- ==========================================================

CREATE TABLE IF NOT EXISTS migrations_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng loài thực vật (Tên khoa học là khóa duy nhất chuẩn quốc tế)
CREATE TABLE IF NOT EXISTS plants (
    id VARCHAR(36) PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    common_name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL UNIQUE,
    aliases_json JSON DEFAULT NULL,
    category ENUM('herb', 'fruit', 'ornamental') NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_sha256 VARCHAR(64) DEFAULT NULL,
    sunlight ENUM('full_sun', 'partial_shade', 'indoor') NOT NULL,
    watering ENUM('daily', 'moderate', 'drought_tolerant') NOT NULL,
    propagation_difficulty TINYINT NOT NULL DEFAULT 1,
    growth_time VARCHAR(100) NOT NULL,
    container_suitable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng câu hỏi Bác sĩ cây trồng
CREATE TABLE IF NOT EXISTS clinic_questions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    plant_name_hint VARCHAR(150) DEFAULT NULL,
    region ENUM('north', 'central', 'south') NOT NULL,
    symptoms_json JSON DEFAULT NULL,
    images_json JSON DEFAULT NULL,
    ai_instant_diagnosis TEXT DEFAULT NULL,
    status ENUM('visible', 'pending', 'hidden') DEFAULT 'visible',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_region (region),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng lưu trữ liên hệ & yêu cầu tư vấn (Trang Liên hệ)
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    topic VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ticket (ticket_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO migrations_history (migration_name) VALUES ('001_initial_schema.sql');
