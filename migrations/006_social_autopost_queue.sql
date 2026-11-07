-- ==========================================================
-- BẢN MIGRATION 006: HÀNG ĐỢI ĐỘNG & NHẬT KÝ TỰ ĐỘNG ĐĂNG BÀI FANPAGE
-- Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
-- Tính năng: Hỗ trợ mở rộng không giới hạn N bài viết và M danh mục
-- ==========================================================

-- 1. Mở rộng cột category trong bảng plants để nhận mọi danh mục mới linh hoạt
ALTER TABLE plants MODIFY COLUMN category VARCHAR(64) NOT NULL;

-- 2. Bổ sung cột details_json để đồng bộ trọn vẹn bài thuốc, mùa vụ, kinh nghiệm
ALTER TABLE plants ADD COLUMN IF NOT EXISTS details_json JSON DEFAULT NULL;

-- 3. Bảng hàng đợi luân phiên động (Dynamic Expanding Queue)
CREATE TABLE IF NOT EXISTS social_post_queue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_slug VARCHAR(64) NOT NULL,
    category_label VARCHAR(150) DEFAULT NULL,
    ref_slug VARCHAR(191) NOT NULL UNIQUE,
    target_url VARCHAR(500) NOT NULL,
    post_count INT DEFAULT 0,
    last_angle TINYINT DEFAULT 0,
    last_posted_at DATETIME DEFAULT NULL,
    last_fb_post_id VARCHAR(100) DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_cat (category_slug),
    INDEX idx_active (is_active),
    INDEX idx_lru (last_posted_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng nhật ký bài đăng & Khóa bảo vệ chống đăng trùng trong ngày
CREATE TABLE IF NOT EXISTS social_post_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    posted_date DATE NOT NULL,
    category_slug VARCHAR(64) NOT NULL,
    ref_slug VARCHAR(191) NOT NULL,
    target_url VARCHAR(500) NOT NULL,
    post_angle TINYINT NOT NULL DEFAULT 1,
    fb_post_id VARCHAR(100) DEFAULT NULL,
    fb_response_json TEXT DEFAULT NULL,
    status ENUM('success', 'failed', 'skipped') NOT NULL DEFAULT 'success',
    error_message TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY idx_daily_guard (posted_date),
    INDEX idx_slug (ref_slug),
    INDEX idx_date (posted_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Ghi nhận lịch sử migration
INSERT IGNORE INTO migrations_history (migration_name) VALUES ('006_social_autopost_queue.sql');
