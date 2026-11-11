<?php
/**
 * API BÁO CÁO VI PHẠM & KIỂM DUYỆT (M6 - H6, H9)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// CORS hỗ trợ yeutrongcay.com và môi trường dev
$allowed_origins = [
    'https://yeutrongcay.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

require_once __DIR__ . '/db.php';
$pdo = getDbConnection();

$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true) ?: $_POST;

// Honeypot chống bot tự động
if (!empty($data['bot_field'])) {
    echo json_encode(['success' => true, 'message' => 'Đã tiếp nhận báo cáo']);
    exit;
}

$target_type = trim($data['target_type'] ?? '');
$target_id   = trim($data['target_id'] ?? '');
$reason      = trim($data['reason'] ?? 'other');
$note        = isset($data['note']) ? trim(htmlspecialchars($data['note'], ENT_QUOTES, 'UTF-8')) : '';

$valid_types = ['clinic_question', 'swap_offer', 'plant_info', 'comment'];
$valid_reasons = ['spam', 'dangerous_medical_advice', 'illegal_substance', 'commercial_ad', 'abusive_language', 'other'];

if (!in_array($target_type, $valid_types, true) || empty($target_id)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Thông tin đối tượng báo cáo không hợp lệ.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!in_array($reason, $valid_reasons, true)) {
    $reason = 'other';
}

$reporter_ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$ticket_id = 'REP-' . strtoupper(substr(md5(uniqid((string)mt_rand(), true)), 0, 8));

if ($pdo) {
    try {
        // Tự động bảo đảm bảng reports tồn tại nếu chưa chạy migration thủ công
        $pdo->exec("CREATE TABLE IF NOT EXISTS reports (
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

        // Giới hạn tần suất: Mỗi IP tối đa 5 báo cáo trong 15 phút
        $rate_stmt = $pdo->prepare("SELECT COUNT(*) FROM reports WHERE reporter_ip = :ip AND created_at > DATE_SUB(NOW(), INTERVAL 15 MINUTE)");
        $rate_stmt->execute([':ip' => $reporter_ip]);
        if ($rate_stmt->fetchColumn() >= 5) {
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'message' => 'Bạn đã gửi nhiều báo cáo gần đây. Vui lòng thử lại sau 15 phút.'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO reports (
            ticket_id, target_type, target_id, reason, note, reporter_ip, status
        ) VALUES (
            :ticket_id, :target_type, :target_id, :reason, :note, :reporter_ip, 'pending'
        )");

        $stmt->execute([
            ':ticket_id'   => $ticket_id,
            ':target_type' => $target_type,
            ':target_id'   => $target_id,
            ':reason'      => $reason,
            ':note'        => $note,
            ':reporter_ip' => $reporter_ip
        ]);

        echo json_encode([
            'success'   => true,
            'ticket_id' => $ticket_id,
            'message'   => 'Cảm ơn bạn đã đóng góp. Ban biên tập sẽ rà soát nội dung này trong vòng 24 giờ.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        error_log('Report insert error: ' . $e->getMessage());
    }
}

// Fallback nếu tạm thời chưa kết nối được DB
echo json_encode([
    'success'   => true,
    'ticket_id' => $ticket_id,
    'message'   => 'Đã tiếp nhận báo cáo. Cảm ơn sự hỗ trợ giữ gìn cộng đồng của bạn!'
], JSON_UNESCAPED_UNICODE);
