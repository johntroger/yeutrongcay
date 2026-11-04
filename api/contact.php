<?php
/**
 * API TIẾP NHẬN LIÊN HỆ & GÓP Ý - YEUTRONGECAY.COM
 * Bảo vệ chống spam, chống XSS và chuẩn bị sẵn sàng lưu trữ PDO MySQL
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

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

// Lưu trữ dữ liệu an toàn (Ghi log JSON cục bộ tại hosting)
$contact_entry = [
    'id'         => 'cnt_' . uniqid(),
    'fullname'   => $fullname,
    'email'      => $email,
    'phone'      => $phone,
    'topic'      => $topic,
    'message'    => $message,
    'created_at' => date('Y-m-d H:i:s'),
    'ip_hash'    => hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1')
];

// Thư mục lưu trữ tin nhắn
$storage_dir = __DIR__ . '/../storage';
if (!is_dir($storage_dir)) {
    @mkdir($storage_dir, 0755, true);
    // Chặn truy cập trực tiếp từ web
    @file_put_contents($storage_dir . '/.htaccess', "Deny from all\n");
}

$log_file = $storage_dir . '/contacts.jsonl';
@file_put_contents($log_file, json_encode($contact_entry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

// Phản hồi thành công
echo json_encode([
    'success' => true,
    'message' => 'Cảm ơn bạn! Ban Quản Trị Yêu Trồng Cây đã tiếp nhận thông tin và sẽ phản hồi sớm nhất qua Email/Số điện thoại của bạn.',
    'ticket_id' => $contact_entry['id'],
    'server_time' => date('Y-m-d H:i:s')
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
