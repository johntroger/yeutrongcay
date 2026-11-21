-- ==========================================================
-- BẢN MIGRATION 005: TỰ ĐỘNG LƯU TRỮ SONG NGỮ CHO NỘI DUNG MỚI
-- Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
-- Tính năng: Tự động lưu bản dịch Tiếng Anh khi thêm cây/bài viết mới
-- ==========================================================

ALTER TABLE plants 
    ADD COLUMN IF NOT EXISTS common_name_en VARCHAR(255) DEFAULT NULL AFTER common_name,
    ADD COLUMN IF NOT EXISTS description_en TEXT DEFAULT NULL AFTER description,
    ADD COLUMN IF NOT EXISTS quick_answer_en TEXT DEFAULT NULL,
    ADD COLUMN IF NOT EXISTS translations_en JSON DEFAULT NULL;

-- Cập nhật chỉ mục tìm kiếm song ngữ
CREATE INDEX IF NOT EXISTS idx_plants_common_name_en ON plants (common_name_en);
