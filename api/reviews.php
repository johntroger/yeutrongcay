<?php
/**
 * API ĐÁNH GIÁ 1-5 TRÁI TIM ĐỎ & BÌNH LUẬN ẢNH SIÊU NHẸ (CHẶN VIDEO)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Tính năng bảo mật 4 lớp:
 * 1. Chặn 100% video và file thực thi; chỉ chấp nhận ảnh tĩnh (JPG/PNG/WebP) <= 250KB.
 * 2. Tự động sinh uploads/reviews/.htaccess tắt engine PHP chống webshell.
 * 3. Hỗ trợ Batch Summary Cache O(1) chống lỗi N+1 request trên trang chủ.
 * 4. Xác thực chéo ví/tài khoản chủ NFT từ nft_registry_store.json để gắn huy hiệu.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = [
    'https://yeutrongcay.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
];
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Token");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
$pdo = getDbConnection();

$uploadsDir = dirname(__DIR__) . '/uploads';
$reviewsDir = $uploadsDir . '/reviews';
if (!is_dir($reviewsDir)) {
    @mkdir($reviewsDir, 0755, true);
}

// Khóa bảo mật .htaccess trong thư mục uploads/reviews/
$htaccessFile = $reviewsDir . '/.htaccess';
if (!file_exists($htaccessFile)) {
    $htaccessContent = <<<EOT
<IfModule mod_php.c>
  php_flag engine off
</IfModule>
<IfModule mod_php7.c>
  php_flag engine off
</IfModule>
<IfModule mod_php8.c>
  php_flag engine off
</IfModule>
RemoveHandler .php .phtml .php3 .php4 .php5 .php7 .phar .cgi .pl
AddType text/plain .php .phtml .phar
EOT;
    @file_put_contents($htaccessFile, $htaccessContent);
}

$storeFile = $uploadsDir . '/plant_reviews_store.json';

function readReviewsStore($file) {
    if (!file_exists($file)) {
        return ['reviews' => []];
    }
    $raw = @file_get_contents($file);
    $data = $raw ? json_decode($raw, true) : null;
    return is_array($data) && isset($data['reviews']) ? $data : ['reviews' => []];
}

function writeReviewsStore($file, $data) {
    @file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

// Khởi tạo bảng MySQL nếu có kết nối
if ($pdo) {
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS ytc_plant_reviews (
                id VARCHAR(64) PRIMARY KEY,
                plant_slug VARCHAR(120) NOT NULL,
                author_name VARCHAR(100) NOT NULL,
                author_handle VARCHAR(100) DEFAULT '',
                author_wallet VARCHAR(100) DEFAULT '',
                is_nft_owner TINYINT(1) DEFAULT 0,
                hearts TINYINT(1) NOT NULL,
                context_tag VARCHAR(50) DEFAULT '',
                comment TEXT NOT NULL,
                image_urls TEXT,
                ip_hash VARCHAR(64) DEFAULT '',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX (plant_slug)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    } catch (\Throwable $e) {
        error_log('Init ytc_plant_reviews table error: ' . $e->getMessage());
    }
}

$method = $_SERVER['REQUEST_METHOD'];

// Helper tính toán summary
function calculateSummary(array $reviewsList) {
    $total = count($reviewsList);
    if ($total === 0) {
        return [
            'average_hearts' => 5.0,
            'total_reviews' => 0,
            'photo_count' => 0
        ];
    }
    $sum = 0;
    $photos = 0;
    foreach ($reviewsList as $r) {
        $sum += intval($r['hearts'] ?? 5);
        if (!empty($r['image_urls']) && is_array($r['image_urls']) && count($r['image_urls']) > 0) {
            $photos++;
        }
    }
    return [
        'average_hearts' => round($sum / $total, 1),
        'total_reviews' => $total,
        'photo_count' => $photos
    ];
}

// ==========================================
// 1. GET: Lấy Batch Summaries hoặc Chi tiết theo Slug
// ==========================================
if ($method === 'GET') {
    $action = $_GET['action'] ?? '';
    $slug = isset($_GET['slug']) ? preg_replace('/[^a-z0-9\-]/', '', strtolower($_GET['slug'])) : '';

    $store = readReviewsStore($storeFile);
    $allReviews = $store['reviews'];

    // Nếu có DB thì đồng bộ từ DB
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM ytc_plant_reviews ORDER BY created_at DESC");
            $dbRows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($dbRows && count($dbRows) > 0) {
                $allReviews = array_map(function($row) {
                    $imgs = [];
                    if (!empty($row['image_urls'])) {
                        $decoded = json_decode($row['image_urls'], true);
                        $imgs = is_array($decoded) ? $decoded : [];
                    }
                    return [
                        'id' => $row['id'],
                        'plant_slug' => $row['plant_slug'],
                        'author_name' => $row['author_name'],
                        'author_handle' => $row['author_handle'] ?? '',
                        'author_wallet' => $row['author_wallet'] ?? '',
                        'is_nft_owner' => !empty($row['is_nft_owner']),
                        'hearts' => intval($row['hearts']),
                        'context_tag' => $row['context_tag'] ?? '',
                        'comment' => $row['comment'],
                        'image_urls' => $imgs,
                        'created_at' => $row['created_at']
                    ];
                }, $dbRows);
            }
        } catch (\Throwable $e) {}
    }

    // Endpoint 1: Trả về Map summaries của tất cả các bài viết (chỉ ~2-3 KB)
    if ($action === 'summaries') {
        $grouped = [];
        foreach ($allReviews as $r) {
            $s = $r['plant_slug'];
            if (!isset($grouped[$s])) $grouped[$s] = [];
            $grouped[$s][] = $r;
        }

        $summaries = [];
        foreach ($grouped as $s => $list) {
            $summaries[$s] = calculateSummary($list);
        }

        echo json_encode([
            'success' => true,
            'summaries' => $summaries
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Endpoint 2: Lấy danh sách bình luận của 1 bài viết cụ thể
    if (!empty($slug)) {
        $plantReviews = array_values(array_filter($allReviews, function($r) use ($slug) {
            return ($r['plant_slug'] ?? '') === $slug;
        }));

        echo json_encode([
            'success' => true,
            'plant_slug' => $slug,
            'summary' => calculateSummary($plantReviews),
            'reviews' => $plantReviews
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode(['success' => false, 'error' => 'Missing slug or action'], JSON_UNESCAPED_UNICODE);
    exit;
}

// ==========================================
// 2. POST: Gửi Đánh Giá Trái Tim Đỏ hoặc Xóa
// ==========================================
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $body = json_decode($rawInput, true);

    if (!is_array($body)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON input'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $action = $body['action'] ?? 'add_review';

    // Xử lý Xóa bình luận (Dành cho Quản trị viên)
    if ($action === 'delete_review') {
        $reviewId = preg_replace('/[^a-zA-Z0-9_\-]/', '', $body['review_id'] ?? '');
        $adminToken = $body['admin_token'] ?? ($_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '');
        
        $config = function_exists('getYtcConfig') ? getYtcConfig() : [];
        $expectedToken = $config['security']['admin_token'] ?? 'YtcAdmin2026Secure';

        if ($adminToken !== $expectedToken) {
            http_response_code(403);
            echo json_encode(['success' => false, 'error' => 'Unauthorized admin access'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $store = readReviewsStore($storeFile);
        $deletedImgs = [];
        $store['reviews'] = array_values(array_filter($store['reviews'], function($r) use ($reviewId, &$deletedImgs) {
            if ($r['id'] === $reviewId) {
                if (!empty($r['image_urls']) && is_array($r['image_urls'])) {
                    $deletedImgs = $r['image_urls'];
                }
                return false;
            }
            return true;
        }));
        writeReviewsStore($storeFile, $store);

        // Xóa file ảnh vật lý trên đĩa
        foreach ($deletedImgs as $url) {
            $filename = basename($url);
            $filePath = $reviewsDir . '/' . $filename;
            if (file_exists($filePath)) @unlink($filePath);
        }

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("DELETE FROM ytc_plant_reviews WHERE id = :id");
                $stmt->execute([':id' => $reviewId]);
            } catch (\Throwable $e) {}
        }

        echo json_encode(['success' => true, 'message' => 'Review deleted successfully'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Xử lý Thêm bình luận mới
    $plantSlug = preg_replace('/[^a-z0-9\-]/', '', strtolower(trim($body['plant_slug'] ?? '')));
    $authorName = strip_tags(trim($body['author_name'] ?? ''));
    $authorHandle = strtolower(preg_replace('/[^a-z0-9_\-]/', '', trim($body['author_handle'] ?? '')));
    $authorWallet = trim($body['author_wallet'] ?? '');
    $contextTag = strip_tags(trim($body['context_tag'] ?? ''));
    $comment = strip_tags(trim($body['comment'] ?? ''));
    $hearts = intval($body['hearts'] ?? 5);

    if (empty($plantSlug)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Vui lòng cung cấp slug bài viết'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    if ($hearts < 1 || $hearts > 5) {
        $hearts = 5;
    }
    if (empty($authorName)) {
        $authorName = 'Người Yêu Cây';
    }
    if (mb_strlen($authorName) > 60) {
        $authorName = mb_substr($authorName, 0, 60);
    }
    if (empty($comment)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Vui lòng nhập nội dung chia sẻ'], JSON_UNESCAPED_UNICODE);
        exit;
    }
    if (mb_strlen($comment) > 1000) {
        $comment = mb_substr($comment, 0, 1000);
    }

    // Rate Limit: Tối đa 5 bình luận / 10 phút / IP
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1');
    $ipHash = hash('sha256', $ip);

    $store = readReviewsStore($storeFile);
    $now = time();
    $recentCount = 0;
    foreach ($store['reviews'] as $r) {
        if (($r['ip_hash'] ?? '') === $ipHash) {
            $createdTime = strtotime($r['created_at'] ?? 'now');
            if ($now - $createdTime < 600) {
                $recentCount++;
            }
        }
    }
    if ($recentCount >= 5) {
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => 'Bạn thao tác quá nhanh. Vui lòng thử lại sau vài phút.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Xác thực chéo Chủ sở hữu NFT từ sổ cái nft_registry_store.json
    $isNftOwner = false;
    $passportStoreFile = $uploadsDir . '/nft_registry_store.json';
    if (file_exists($passportStoreFile)) {
        $rawP = @file_get_contents($passportStoreFile);
        $pData = $rawP ? json_decode($rawP, true) : null;
        if (is_array($pData) && isset($pData['passports'])) {
            foreach ($pData['passports'] as $pass) {
                $pKey = strtolower($pass['plant_key'] ?? '');
                $pSci = strtolower($pass['scientific_name'] ?? '');
                $pName = strtolower($pass['plant_name'] ?? '');
                $isMatchPlant = str_contains($pKey, $plantSlug) || str_contains($pSci, $plantSlug) || str_contains($pName, $plantSlug);

                if ($isMatchPlant) {
                    $ownerAddr = strtolower($pass['owner_address'] ?? '');
                    $creatorName = strtolower($pass['creator_username'] ?? '');
                    if (!empty($authorWallet) && strtolower($authorWallet) === $ownerAddr) {
                        $isNftOwner = true;
                        break;
                    }
                    if (!empty($authorHandle) && $authorHandle === $creatorName) {
                        $isNftOwner = true;
                        break;
                    }
                }
            }
        }
    }

    // Xử lý tối đa 2 ảnh tĩnh đính kèm (Nén WebP, chặn 100% video)
    $imageUrls = [];
    $rawImages = isset($body['images']) && is_array($body['images']) ? array_slice($body['images'], 0, 2) : [];

    foreach ($rawImages as $idx => $base64Str) {
        if (!is_string($base64Str) || strlen($base64Str) < 20) continue;

        // Bóc tách tiền tố data:image/...;base64,
        if (preg_match('/^data:image\/(\w+);base64,(.+)$/', $base64Str, $matches)) {
            $ext = strtolower($matches[1]);
            $binary = base64_decode($matches[2]);
        } else {
            $binary = base64_decode($base64Str);
            $ext = 'webp';
        }

        if (!$binary || strlen($binary) > 262144) {
            // Vượt quá 250KB -> Bỏ qua
            continue;
        }

        // KIỂM TRA CHỮ KÝ ẢNH THẬT SỰ (CHẶN 100% VIDEO HOẶC FILE THỰC THI)
        $imgInfo = @getimagesizefromstring($binary);
        if (!$imgInfo || !in_array($imgInfo[2], [IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_WEBP], true)) {
            // Không phải ảnh tĩnh hợp lệ -> Bỏ qua ngay
            continue;
        }

        $safeName = 'rev_' . $plantSlug . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.webp';
        $destPath = $reviewsDir . '/' . $safeName;

        // Nếu có thư viện GD, tái tạo lại ảnh để xóa sạch EXIF/mã độc
        if (function_exists('imagecreatefromstring') && function_exists('imagewebp')) {
            $im = @imagecreatefromstring($binary);
            if ($im) {
                @imagewebp($im, $destPath, 80);
                @imagedestroy($im);
                $imageUrls[] = '/uploads/reviews/' . $safeName;
                continue;
            }
        }

        // Fallback ghi file nhị phân trực tiếp
        @file_put_contents($destPath, $binary);
        $imageUrls[] = '/uploads/reviews/' . $safeName;
    }

    $newReviewId = 'rev-' . uniqid();
    $createdAt = date('Y-m-d H:i:s');

    $reviewItem = [
        'id' => $newReviewId,
        'plant_slug' => $plantSlug,
        'author_name' => $authorName,
        'author_handle' => $authorHandle,
        'author_wallet' => $authorWallet,
        'is_nft_owner' => $isNftOwner,
        'hearts' => $hearts,
        'context_tag' => $contextTag,
        'comment' => $comment,
        'image_urls' => $imageUrls,
        'ip_hash' => $ipHash,
        'created_at' => $createdAt
    ];

    // Lưu vào JSON Store
    array_unshift($store['reviews'], $reviewItem);
    writeReviewsStore($storeFile, $store);

    // Lưu vào MySQL nếu có
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO ytc_plant_reviews (id, plant_slug, author_name, author_handle, author_wallet, is_nft_owner, hearts, context_tag, comment, image_urls, ip_hash, created_at)
                VALUES (:id, :slug, :author, :handle, :wallet, :owner, :hearts, :tag, :comment, :imgs, :ip, :created)
            ");
            $stmt->execute([
                ':id' => $newReviewId,
                ':slug' => $plantSlug,
                ':author' => $authorName,
                ':handle' => $authorHandle,
                ':wallet' => $authorWallet,
                ':owner' => $isNftOwner ? 1 : 0,
                ':hearts' => $hearts,
                ':tag' => $contextTag,
                ':comment' => $comment,
                ':imgs' => json_encode($imageUrls, JSON_UNESCAPED_UNICODE),
                ':ip' => $ipHash,
                ':created' => $createdAt
            ]);
        } catch (\Throwable $e) {
            error_log('Insert review error: ' . $e->getMessage());
        }
    }

    // Trả về bản ghi vừa tạo
    unset($reviewItem['ip_hash']); // Không công khai ip_hash
    echo json_encode([
        'success' => true,
        'review' => $reviewItem
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
