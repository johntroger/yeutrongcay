<?php
/**
 * API UPLOAD ẢNH AN TOÀN - CHUẨN AN NINH MẠNG MẮT BÃO
 * Tự động kiểm tra Magic Bytes, tẩy sạch EXIF GPS, chuyển đổi WebP
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// CORS chỉ cho phép cùng domain
$allowed_origin = 'https://yeutrongcay.com';
if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowed_origin) {
    header('Access-Control-Allow-Origin: ' . $allowed_origin);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Vui lòng chọn ảnh hợp lệ']);
    exit;
}

$file = $_FILES['image'];
$max_size = 5 * 1024 * 1024; // Tối đa 5MB

if ($file['size'] > $max_size) {
    http_response_code(400);
    echo json_encode(['error' => 'Dung lượng ảnh không được vượt quá 5MB']);
    exit;
}

// 1. Kiểm tra Magic Bytes bằng getimagesize
$image_info = @getimagesize($file['tmp_name']);
if ($image_info === false) {
    http_response_code(400);
    echo json_encode(['error' => 'Tệp tải lên không phải là ảnh hợp lệ']);
    exit;
}

$mime = $image_info['mime'];
$allowed_mimes = ['image/jpeg', 'image/png', 'image/webp'];
if (!in_array($mime, $allowed_mimes, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Chỉ chấp nhận định dạng JPG, PNG hoặc WebP']);
    exit;
}

// 2. Tính mã băm SHA-256 của ảnh gốc trước khi lưu (Bằng chứng Web3)
$sha256_hash = hash_file('sha256', $file['tmp_name']);

// 3. Tẩy sạch siêu dữ liệu EXIF GPS bằng cách tái tạo ảnh qua GD
$src_img = null;
switch ($mime) {
    case 'image/jpeg':
        $src_img = @imagecreatefromjpeg($file['tmp_name']);
        break;
    case 'image/png':
        $src_img = @imagecreatefrompng($file['tmp_name']);
        break;
    case 'image/webp':
        $src_img = @imagecreatefromwebp($file['tmp_name']);
        break;
}

if (!$src_img) {
    http_response_code(500);
    echo json_encode(['error' => 'Không thể xử lý hình ảnh']);
    exit;
}

// 4. Đổi tên file thành UUID ngẫu nhiên, cấm giữ tên file gốc
$upload_dir = dirname(__DIR__) . '/uploads/';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

$random_filename = 'plant_' . bin2hex(random_bytes(12)) . '.webp';
$target_path = $upload_dir . $random_filename;

// Lưu ảnh dưới dạng WebP (Đã tẩy sạch hoàn toàn EXIF GPS)
$saved = imagewebp($src_img, $target_path, 85);
imagedestroy($src_img);

if (!$saved) {
    http_response_code(500);
    echo json_encode(['error' => 'Lỗi khi lưu tệp ảnh']);
    exit;
}

// Trả về kết quả
echo json_encode([
    'success' => true,
    'url' => '/uploads/' . $random_filename,
    'sha256' => $sha256_hash,
    'exif_stripped' => true,
    'message' => 'Tải ảnh thành công, đã tẩy sạch dữ liệu vị trí GPS'
]);
