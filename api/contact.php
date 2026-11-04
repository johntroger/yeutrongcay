<?php
/**
 * API TIẾP NHẬN LIÊN HỆ & GÓP Ý - YEUTRONGECAY.COM
 * Bảo vệ chống spam, chống XSS và lưu trữ trực tiếp vào MySQL qua PDO Prepared Statements
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

require_once __DIR__ . '/db.php';

// Chỉ chấp nhận POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Phương thức không được hỗ trợ. Vui lòng gửi dữ liệu bằng POST.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Đọc payload JSON hoặc form data
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);
if (!$data) {
    $data = $_POST;
}

// Kiểm tra Honeypot chống bot spam tự động
if (!empty($data['website_url'])) {
    // Bot điền vào trường ẩn này -> chặn ngay lập tức
    echo json_encode(['success' => true, 'message' => 'Đã tiếp nhận']);
    exit;
}

$fullname = isset($data['fullname']) ? trim(htmlspecialchars($data['fullname'], ENT_QUOTES, 'UTF-8')) : '';
$email    = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone    = isset($data['phone']) ? trim(htmlspecialchars($data['phone'], ENT_QUOTES, 'UTF-8')) : '';
$topic    = isset($data['topic']) ? trim(htmlspecialchars($data['topic'], ENT_QUOTES, 'UTF-8')) : 'Góp ý chung';
$subject  = isset($data['subject']) ? trim(htmlspecialchars($data['subject'], ENT_QUOTES, 'UTF-8')) : ($topic . ' - ' . date('d/m/Y'));
$message  = isset($data['message']) ? trim(htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8')) : '';

// Xác thực tính hợp lệ cơ bản
if (empty($fullname) || (empty($email) && empty($phone)) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Vui lòng cung cấp Họ tên, Phương thức liên hệ (Email hoặc SĐT) và Nội dung lời nhắn.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$ticket_id = 'TICKET-' . strtoupper(dechex(time())) . '-' . rand(100, 999);
$ip_address = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

// 1. Lưu vào MySQL qua PDO Prepared Statements nếu đã kết nối
$pdo = getDbConnection();
$saved_to_db = false;

if ($pdo) {
    try {
        $stmt = $pdo->prepare("INSERT INTO contact_submissions (
            ticket_id, full_name, email, phone, topic, subject, message, ip_address, status
        ) VALUES (
            :ticket_id, :full_name, :email, :phone, :topic, :subject, :message, :ip_address, 'new'
        )");
        $stmt->execute([
            ':ticket_id'  => $ticket_id,
            ':full_name'  => $fullname,
            ':email'      => $email,
            ':phone'      => $phone,
            ':topic'      => $topic,
            ':subject'    => $subject,
            ':message'    => $message,
            ':ip_address' => $ip_address
        ]);
        $saved_to_db = true;
    } catch (PDOException $e) {
        error_log('Contact DB Insert Error: ' . $e->getMessage());
    }
}

// 2. Dự phòng: Ghi log JSON cục bộ tại hosting
$storage_dir = __DIR__ . '/../storage';
if (!is_dir($storage_dir)) {
    @mkdir($storage_dir, 0755, true);
    @file_put_contents($storage_dir . '/.htaccess', "Deny from all\n");
}

$contact_entry = [
    'ticket_id'   => $ticket_id,
    'fullname'    => $fullname,
    'email'       => $email,
    'phone'       => $phone,
    'topic'       => $topic,
    'subject'     => $subject,
    'message'     => $message,
    'saved_to_db' => $saved_to_db,
    'created_at'  => date('Y-m-d H:i:s')
];

$log_file = $storage_dir . '/contacts.jsonl';
@file_put_contents($log_file, json_encode($contact_entry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

// Phản hồi thành công
echo json_encode([
    'success' => true,
    'message' => 'Cảm ơn bạn! Ban Quản Trị Yêu Trồng Cây đã tiếp nhận thông tin và sẽ phản hồi sớm nhất qua Email/Số điện thoại của bạn.',
    'ticket_id' => $ticket_id,
    'saved_to_database' => $saved_to_db,
    'server_time' => date('Y-m-d H:i:s')
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
