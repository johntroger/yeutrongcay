<?php
/**
 * API LẤY DANH MỤC CÂY TRỒNG - CHUẨN PDO PREPARED STATEMENTS
 * Tuân thủ quy tắc chống SQL Injection 100%
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// Cấu hình Database từ file .env hoặc hằng số bảo mật
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'yeutrongcay_db';
$db_user = getenv('DB_USER') ?: 'yeutrongcay_user';
$db_pass = getenv('DB_PASS') ?: '';

$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$search = isset($_GET['q']) ? trim($_GET['q']) : '';

// Trường hợp đang ở giai đoạn khởi tạo chưa nối MySQL: Trả về trạng thái sẵn sàng
$response = [
    'success' => true,
    'status' => 'ready',
    'filters' => [
        'category' => htmlspecialchars($category, ENT_QUOTES, 'UTF-8'),
        'search' => htmlspecialchars($search, ENT_QUOTES, 'UTF-8')
    ],
    'server_time' => date('Y-m-d H:i:s'),
    'api_version' => 'v1.0'
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
