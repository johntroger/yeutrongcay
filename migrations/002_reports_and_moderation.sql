-- ==========================================================
-- BẢN MIGRATION 002: BÁO CÁO VI PHẠM & KIỂM DUYỆT NỘI DUNG (M6 - H6, H9)
-- Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
-- Ngày tạo: 04/11/2026
-- ==========================================================

-- Bảng lưu trữ báo cáo vi phạm từ người dùng và cộng đồng
CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id VARCHAR(36) NOT NULL UNIQUE,
    target_type ENUM('clinic_question', 'swap_offer', 'plant_info', 'comment') NOT NULL,
    target_id VARCHAR(50) NOT NULL,
    reason ENUM('spam', 'dangerous_medical_advice', 'illegal_substance', 'commercial_ad', 'abusive_language', 'other') NOT NULL,
    note TEXT DEFAULT NULL,
    reporter_ip VARCHAR(45) DEFAULT NULL,
    status ENUM('pending', 'reviewed', 'dismissed', 'action_taken') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_target (target_type, target_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng nhật ký kiểm duyệt (H9: Audit Log Hook)
CREATE TABLE IF NOT EXISTS moderation_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    moderator_id VARCHAR(50) NOT NULL,
    action ENUM('hide_content', 'restore_content', 'delete_content', 'dismiss_report', 'ban_ip') NOT NULL,
    target_type VARCHAR(50) NOT NULL,
    target_id VARCHAR(50) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_mod_target (target_type, target_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bổ sung bảng swap_offers lưu dữ liệu persistent tin trao đổi cây (nếu chưa có)
CREATE TABLE IF NOT EXISTS swap_offers (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    user_avatar VARCHAR(500) DEFAULT NULL,
    region_zone ENUM('north', 'central', 'south') NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    plant_name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) DEFAULT NULL,
    offer_type ENUM('giveaway', 'exchange', 'seeking') NOT NULL,
    item_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    quarantine_pledge BOOLEAN DEFAULT TRUE,
    contact_note VARCHAR(255) DEFAULT NULL,
    status ENUM('visible', 'pending', 'hidden') DEFAULT 'visible',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_region (region_zone),
    INDEX idx_type (offer_type),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO migrations_history (migration_name) VALUES ('002_reports_and_moderation.sql');
