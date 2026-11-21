-- ==========================================================
-- BẢN MIGRATION 004: CHẤT LƯỢNG CỘNG ĐỒNG, KARMA & KIỂM DUYỆT SÁCH ĐỎ (MS5 - H6, H7, H9, H15)
-- Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
-- Ngày tạo: 05/11/2026
-- ==========================================================

-- 1. Bảng lưu câu trả lời phòng khám bác sĩ cây trồng (Verified Answers)
CREATE TABLE IF NOT EXISTS clinic_answers (
    id VARCHAR(50) PRIMARY KEY,
    question_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    author_name VARCHAR(150) NOT NULL,
    author_badge VARCHAR(100) DEFAULT NULL,
    content TEXT NOT NULL,
    upvotes INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    status ENUM('visible', 'pending', 'hidden') DEFAULT 'visible',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_question (question_id),
    INDEX idx_user (user_id),
    INDEX idx_verified (is_verified)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng nhật ký sự kiện tính điểm uy tín Karma (H9: Event-driven Karma)
CREATE TABLE IF NOT EXISTS user_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    event_type ENUM('post_question', 'post_answer', 'verify_answer', 'share_seed', 'like_answer', 'report_accepted') NOT NULL,
    points INT NOT NULL,
    reference_id VARCHAR(50) DEFAULT NULL,
    metadata_json JSON DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user (user_id),
    INDEX idx_event (event_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng danh mục loài ngoại lai xâm hại, Sách Đỏ & Hóa chất cấm (H6, H15)
CREATE TABLE IF NOT EXISTS prohibited_species (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scientific_name VARCHAR(255) NOT NULL,
    vietnamese_name VARCHAR(255) NOT NULL,
    category ENUM('invasive_alien', 'red_list_ia', 'banned_chemical') NOT NULL,
    legal_basis VARCHAR(255) NOT NULL,
    warning_message TEXT NOT NULL,
    action_type ENUM('reject', 'require_moderation') DEFAULT 'reject',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_scientific (scientific_name),
    INDEX idx_vn_name (vietnamese_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Dữ liệu mầm các loài nguy hại theo luật Việt Nam
INSERT IGNORE INTO prohibited_species (scientific_name, vietnamese_name, category, legal_basis, warning_message, action_type) VALUES
('Mimosa pigra', 'Cây mai dương (trinh nữ móc gai)', 'invasive_alien', 'Thông tư 35/2018/TT-BTNMT', 'Loài ngoại lai xâm hại nguy hiểm, cạnh tranh tiêu diệt thảm thực vật bản địa và tắc nghẽn dòng chảy sinh thái.', 'reject'),
('Pomacea canaliculata', 'Ốc bươu vàng', 'invasive_alien', 'Thông tư 35/2018/TT-BTNMT', 'Sinh vật ngoại lai xâm hại phá hoại mùa màng và lúa nghiêm trọng. Nghiêm cấm nhân nuôi, phát tán.', 'reject'),
('Eichhornia crassipes', 'Bèo lục bình (phát tán xâm hại)', 'invasive_alien', 'Thông tư 35/2018/TT-BTNMT', 'Loài xâm thực nguồn nước mạnh mẽ, làm bồi lắng sông rạch và tiêu diệt oxy thủy sinh.', 'require_moderation'),
('Sphagneticola trilobata', 'Cúc bò lan (cúc mặt trời dại)', 'invasive_alien', 'Thông tư 35/2018/TT-BTNMT', 'Loài bò lan xâm lấn đất rừng và đất nông nghiệp bản địa.', 'require_moderation'),
('Orobanche', 'Cỏ chổi ký sinh', 'invasive_alien', 'Thông tư 35/2018/TT-BTNMT', 'Cỏ ký sinh rễ nguy hại cho các cây họ cà và đậu đỗ.', 'reject'),
('Paphiopedilum', 'Lan hài Việt Nam (khai thác tự nhiên)', 'red_list_ia', 'Nghị định 06/2019/NĐ-CP (Nhóm IA)', 'Loài thực vật rừng nguy cấp, quý, hiếm thuộc Nhóm IA nghiêm cấm khai thác, mua bán tự nhiên.', 'reject'),
('Anoectochilus setaceus', 'Lan kim tuyến rừng (khai thác hoang dã)', 'red_list_ia', 'Nghị định 06/2019/NĐ-CP (Nhóm IA)', 'Dược liệu quý tự nhiên bị đe dọa tuyệt chủng nghiêm trọng. Nghiêm cấm mua bán cây rừng hoang dã không có nguồn gốc gây trồng.', 'reject'),
('Aquilaria crassna', 'Trầm hương tự nhiên (khai thác rừng)', 'red_list_ia', 'Nghị định 06/2019/NĐ-CP (Nhóm IIA)', 'Loài quý hiếm cần bảo vệ nghiêm ngặt. Chỉ được trao đổi cây giống có xuất xứ vườn ươm hợp pháp.', 'require_moderation'),
('Paraquat', 'Thuốc trừ cỏ Paraquat', 'banned_chemical', 'Thông tư 10/2019/TT-BNNPTNT', 'Hóa chất bảo vệ thực vật cực độc đã bị cấm hoàn toàn tại Việt Nam.', 'reject'),
('2,4-D', 'Thuốc diệt cỏ 2,4-D', 'banned_chemical', 'Thông tư 10/2019/TT-BNNPTNT', 'Hoạt chất cực độc gây dị tật và tồn dư môi trường nghiêm trọng, đã bị cấm lưu hành.', 'reject');

-- 5. Seed câu trả lời có sẵn (Verified Answers mẫu)
INSERT IGNORE INTO clinic_answers (id, question_id, user_id, author_name, author_badge, content, upvotes, is_verified, status) VALUES
('ans-101', 'case-01', 'usr-ks-lam', 'Kỹ Sư Nông Nghiệp Lâm', 'Nhà Vườn Kinh Nghiệm', 'Bác lấy 1 củ tỏi + 3 quả ớt + 1 nhánh gừng giã nhuyễn ngâm với 1 lít rượu trắng trong 2 ngày. Lọc lấy nước cốt pha tỷ lệ 1:20 với nước lã và 1 giọt dầu rửa chén xịt 2 lần cách nhau 3 ngày là rệp sáp sạch bóng, hoàn toàn an toàn cho trái ăn!', 18, TRUE, 'visible'),
('ans-102', 'case-01', 'usr-minh-thao', 'Minh Thảo (Q.7)', 'Thành Viên Tích Cực', 'Bác nhớ rắc thêm một ít vôi bột quanh mép chậu để chặn đường kiến đen tha rệp từ dưới đất lên nữa nhé bác!', 7, FALSE, 'visible'),
('ans-201', 'case-02', 'usr-ly-cuong', 'Lương Y Nguyễn Văn Cường', 'Dược Sĩ Cổ Truyền', 'Sai lầm phổ biến khi giâm đinh lăng là dùng đất thịt có phân. Giai đoạn cành chưa có rễ tuyệt đối không bón phân. Cháu nên cắm cành vào cát xây dựng ẩm hoặc dớn trắng ẩm, để chỗ râm mát 20 ngày tự khắc rễ tơ trắng bật tua tủa!', 24, TRUE, 'visible');

INSERT IGNORE INTO migrations_history (migration_name) VALUES ('004_community_karma_and_moderation.sql');
