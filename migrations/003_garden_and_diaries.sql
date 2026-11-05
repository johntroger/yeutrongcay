-- ==========================================================
-- BẢN MIGRATION 003: VƯỜN SỐ CÁ NHÂN & NHẬT KÝ THEO DÕI CÂY (MS4 - H1, H5, H7)
-- Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
-- Ngày tạo: 05/11/2026
-- ==========================================================

-- 1. Bảng hồ sơ vườn cá nhân (Móc nối H1: UUID người dùng nội bộ)
CREATE TABLE IF NOT EXISTS gardens (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    garden_name VARCHAR(255) NOT NULL,
    garden_type ENUM('balcony', 'rooftop', 'backyard', 'indoor_window') NOT NULL DEFAULT 'balcony',
    city VARCHAR(100) NOT NULL DEFAULT 'TP. Hồ Chí Minh',
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng các cây trồng trong vườn
CREATE TABLE IF NOT EXISTS garden_plants (
    id VARCHAR(50) PRIMARY KEY,
    garden_id VARCHAR(50) NOT NULL,
    plant_id VARCHAR(36) DEFAULT NULL, -- Liên kết với danh mục 50 loài chuẩn nếu có
    custom_name VARCHAR(255) NOT NULL,
    species_name VARCHAR(255) DEFAULT NULL,
    planted_date DATE NOT NULL,
    pot_type VARCHAR(100) DEFAULT 'Chậu nhựa thông minh 35cm',
    current_status ENUM('healthy', 'flowering', 'fruiting', 'recovering', 'dormant') DEFAULT 'healthy',
    cover_image_url VARCHAR(500) NOT NULL,
    notes TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_garden_id (garden_id),
    INDEX idx_plant_id (plant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng nhật ký ảnh theo mốc thời gian (Móc nối H5: content_type='diary', H7: ảnh sạch EXIF + hash SHA-256)
CREATE TABLE IF NOT EXISTS plant_diaries (
    id VARCHAR(50) PRIMARY KEY,
    garden_plant_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    entry_date DATE NOT NULL,
    stage VARCHAR(100) NOT NULL DEFAULT 'Đang sinh trưởng',
    note TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_sha256 VARCHAR(64) DEFAULT NULL,
    metrics_json JSON DEFAULT NULL,
    status ENUM('visible', 'pending', 'hidden') DEFAULT 'visible',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_plant_entry (garden_plant_id, entry_date),
    INDEX idx_user_diary (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
