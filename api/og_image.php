<?php
/**
 * DYNAMIC OPEN GRAPH IMAGE GENERATOR (1200 x 630 px)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Tính năng:
 * - Chuẩn hóa mọi ảnh cây trồng về tỷ lệ vàng 1200x630 cho Facebook Link Card
 * - Lưu đệm (cache) vĩnh viễn tại uploads/og_cache/{slug}.jpg để tốc độ phản hồi < 50ms
 * - Tự động fallback về ảnh mặc định nếu ảnh gốc bị lỗi hoặc Wikimedia chặn
 */

$slug = isset($_GET['slug']) ? preg_replace('/[^a-z0-9\-]/', '', strtolower($_GET['slug'])) : '';
$cacheDir = __DIR__ . '/../uploads/og_cache';

$candidatePaths = [
    __DIR__ . '/../banner-bg-hero.jpg',
    __DIR__ . '/../public/banner-bg-hero.jpg',
    __DIR__ . '/../yeutrongcay-banner.png',
    __DIR__ . '/../public/yeutrongcay-banner.png',
    __DIR__ . '/../logo.jpg',
    __DIR__ . '/../public/logo.jpg'
];
$defaultImage = '';
foreach ($candidatePaths as $p) {
    if (file_exists($p)) {
        $defaultImage = $p;
        break;
    }
}

// 1. Tra cứu URL ảnh gốc của cây từ MySQL hoặc JSON trước tiên để đối chiếu độ mới
$imageUrl = '';
$plantName = 'Yêu Trồng Cây';

if (!empty($slug)) {
    // Đọc từ MySQL nếu có
    $dbFile = __DIR__ . '/db.php';
    if (file_exists($dbFile)) {
        require_once $dbFile;
        if (function_exists('getDbConnection')) {
            $pdo = getDbConnection();
            if ($pdo) {
                try {
                    $stmt = $pdo->prepare("SELECT common_name, image_url FROM plants WHERE slug = :slug LIMIT 1");
                    $stmt->execute([':slug' => $slug]);
                    $row = $stmt->fetch();
                    if ($row && !empty($row['image_url'])) {
                        $imageUrl = trim($row['image_url']);
                        $plantName = $row['common_name'];
                    }
                } catch (\Throwable $e) {}
            }
        }
    }

    // Fallback đọc từ plants_data.json
    if (empty($imageUrl)) {
        $jsonFile = __DIR__ . '/plants_data.json';
        if (file_exists($jsonFile)) {
            $plants = json_decode(file_get_contents($jsonFile), true);
            if (is_array($plants)) {
                foreach ($plants as $p) {
                    if (!empty($p['slug']) && $p['slug'] === $slug) {
                        $imageUrl = trim($p['image_url'] ?? '');
                        $plantName = $p['common_name'] ?? 'Yêu Trồng Cây';
                        break;
                    }
                }
            }
        }
    }
}

// 2. Phục vụ ngay từ Cache nếu ảnh nguồn KHÔNG THAY ĐỔI
if (!empty($slug)) {
    $cachedFile = $cacheDir . '/' . $slug . '.jpg';
    $metaFile   = $cacheDir . '/' . $slug . '.meta.json';
    if (file_exists($cachedFile) && filesize($cachedFile) > 1024) {
        $meta = file_exists($metaFile) ? json_decode(@file_get_contents($metaFile), true) : null;
        // Chỉ dùng cache nếu source_url trong metadata khớp chính xác với ảnh bài viết hiện tại
        if (!empty($meta) && !empty($imageUrl) && ($meta['source_url'] ?? '') === $imageUrl) {
            header('Content-Type: image/jpeg');
            header('Cache-Control: public, max-age=2592000'); // Cache 30 ngày
            header('X-OG-Cache: HIT');
            readfile($cachedFile);
            exit;
        }
    }
}

// 3. Nếu không tìm thấy cây hoặc không có ảnh, xuất ảnh mặc định
if (empty($imageUrl)) {
    header('Content-Type: image/jpeg');
    header('Cache-Control: public, max-age=86400');
    if (file_exists($defaultImage)) {
        readfile($defaultImage);
    }
    exit;
}

// Nếu ảnh là thumbnail Wikimedia, thử nâng độ phân giải lên 800px hoặc 1000px
$highResUrl = $imageUrl;
if (strpos($imageUrl, '/330px-') !== false) {
    $highResUrl = preg_replace('/\/330px-/', '/960px-', $imageUrl);
}

// 4. Nếu máy chủ chưa bật GD, chuyển hướng HTTP 302 tới ảnh gốc độ nét cao
if (!extension_loaded('gd') || !function_exists('imagecreatefromjpeg')) {
    header('Location: ' . $highResUrl, true, 302);
    exit;
}

// 5. Tải ảnh gốc và vẽ canvas 1200 x 630 bằng GD
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0755, true);
}

$ch = curl_init($highResUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 6);
curl_setopt($ch, CURLOPT_USERAGENT, 'YeuTrongCayBot/1.0 (https://yeutrongcay.com; dev@yeutrongcay.com)');
$rawBytes = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Nếu tải ảnh 960px bị 404, thử lại ảnh gốc ban đầu
if (($httpCode !== 200 || empty($rawBytes)) && $highResUrl !== $imageUrl) {
    $ch = curl_init($imageUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_USERAGENT, 'YeuTrongCayBot/1.0 (https://yeutrongcay.com; dev@yeutrongcay.com)');
    $rawBytes = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
}

// Nếu hoàn toàn không tải được ảnh gốc, xuất ảnh mặc định
if ($httpCode !== 200 || empty($rawBytes)) {
    header('Content-Type: image/jpeg');
    if (!empty($defaultImage) && file_exists($defaultImage)) {
        readfile($defaultImage);
        exit;
    }
    // Fallback vẽ canvas xanh đậm 1200x630
    $destImg = imagecreatetruecolor(1200, 630);
    $bgColor = imagecolorallocate($destImg, 15, 46, 30);
    imagefilledrectangle($destImg, 0, 0, 1200, 630, $bgColor);
    imagejpeg($destImg, null, 88);
    imagedestroy($destImg);
    exit;
}

$srcImg = @imagecreatefromstring($rawBytes);
if (!$srcImg) {
    header('Content-Type: image/jpeg');
    if (!empty($defaultImage) && file_exists($defaultImage)) {
        readfile($defaultImage);
        exit;
    }
    $destImg = imagecreatetruecolor(1200, 630);
    $bgColor = imagecolorallocate($destImg, 15, 46, 30);
    imagefilledrectangle($destImg, 0, 0, 1200, 630, $bgColor);
    imagejpeg($destImg, null, 88);
    imagedestroy($destImg);
    exit;
}

$srcW = imagesx($srcImg);
$srcH = imagesy($srcImg);

// Tạo khung chuẩn 1200 x 630 cho Facebook
$targetW = 1200;
$targetH = 630;
$destImg = imagecreatetruecolor($targetW, $targetH);

// Màu nền xanh thực vật tự nhiên (#0F2E1E: 15, 46, 30)
$bgColor = imagecolorallocate($destImg, 15, 46, 30);
imagefilledrectangle($destImg, 0, 0, $targetW, $targetH, $bgColor);

// Tính toán tỷ lệ ảnh: Fit ảnh vào khung giữa hoặc crop cover đẹp
$srcRatio = $srcW / $srcH;
$targetRatio = $targetW / $targetH;

if ($srcRatio > $targetRatio) {
    // Ảnh quá dài theo chiều ngang
    $renderW = $targetW;
    $renderH = (int)($targetW / $srcRatio);
    $dstX = 0;
    $dstY = (int)(($targetH - $renderH) / 2);
} else {
    // Ảnh vuông hoặc ảnh đứng: đặt giữa khung, hai bên là màu nền xanh thực vật sang trọng
    $renderH = $targetH;
    $renderW = (int)($targetH * $srcRatio);
    $dstX = (int)(($targetW - $renderW) / 2);
    $dstY = 0;
}

imagecopyresampled($destImg, $srcImg, $dstX, $dstY, 0, 0, $renderW, $renderH, $srcW, $srcH);

// Lưu vào thư mục cache nếu có slug kèm metadata xác thực nguồn ảnh
if (!empty($slug)) {
    $cachedFile = $cacheDir . '/' . $slug . '.jpg';
    $metaFile   = $cacheDir . '/' . $slug . '.meta.json';
    @imagejpeg($destImg, $cachedFile, 88);
    @file_put_contents($metaFile, json_encode([
        'source_url'  => $imageUrl,
        'url_sha256'  => hash('sha256', $imageUrl),
        'created_at'  => date('Y-m-d H:i:s'),
        'slug'        => $slug
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

header('Content-Type: image/jpeg');
header('Cache-Control: public, max-age=2592000');
header('X-OG-Cache: CREATED');
imagejpeg($destImg, null, 88);

imagedestroy($srcImg);
imagedestroy($destImg);
