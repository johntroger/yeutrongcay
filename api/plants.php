<?php
/**
 * API LẤY & THÊM DANH MỤC CÂY TRỒNG - TỰ ĐỘNG DỊCH SONG NGỮ NGẦM
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Tính năng:
 * - GET: Lọc theo danh mục (herb, fruit, ornamental), tìm kiếm, slug
 * - POST: Thêm cây mới bằng Tiếng Việt -> Tự động 100% dịch ngầm sang Tiếng Anh
 *   và lưu cả 2 phiên bản vào Database MySQL mà không cần ai bấm nút nào.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// CORS headers
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
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Token");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/translate_service.php';
require_once __DIR__ . '/image_alignment.php';
require_once __DIR__ . '/content_validator.php';

$pdo = getDbConnection();

// Xử lý POST: Thêm cây mới (Bắt buộc xác thực Admin Token)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Kiểm tra xác thực Admin
    $config = function_exists('getYtcConfig') ? getYtcConfig() : [];
    $adminToken = $config['security']['admin_token'] ?? '';

    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $xAdminToken = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
    $bearerToken = '';
    if (preg_match('/Bearer\s+(\S+)/', $authHeader, $matches)) {
        $bearerToken = $matches[1];
    }
    $clientToken = $xAdminToken ?: $bearerToken;

    if (empty($adminToken) || $clientToken !== $adminToken) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'Quyền bị từ chối: Yêu cầu Admin Token hợp lệ để thêm cây trồng mới'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!$pdo) {
        http_response_code(503);
        echo json_encode(['success' => false, 'message' => 'Cơ sở dữ liệu chưa kết nối']);
        exit;
    }

    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data || empty($data['common_name'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Vui lòng cung cấp tên cây']);
        exit;
    }

    $commonNameVi = trim($data['common_name']);
    $scientificName = trim($data['scientific_name'] ?? '');
    $category = in_array($data['category'] ?? '', ['herb', 'fruit', 'ornamental', 'space', 'recycle', 'culinary', 'forest']) ? $data['category'] : 'herb';
    $descriptionVi = trim($data['description'] ?? '');
    $imageUrl = trim($data['image_url'] ?? '');
    
    // 2. Kiểm định Tương thích Hình ảnh & Nội dung theo Thuật toán CIRVA
    $alignmentResult = verifyImageContentAlignment($category, $commonNameVi, $scientificName, $descriptionVi, $imageUrl);
    if (!$alignmentResult['is_approved']) {
        http_response_code(422);
        echo json_encode([
            'success' => false,
            'error_code' => 'CIRVA_IMAGE_MISMATCH',
            'message' => 'Hình ảnh không phù hợp với nội dung bài viết theo Thuật toán CIRVA',
            'alignment' => $alignmentResult
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // 2.1. Kiểm tra Liveness (URL có trả về HTTP 200 và ảnh thật không)
    $liveness = verifyImageUrlLiveness($imageUrl);
    if (!$liveness['is_live']) {
        http_response_code(422);
        echo json_encode([
            'success' => false,
            'error_code' => 'CIRVA_IMAGE_DEAD_LINK',
            'message' => 'URL hình ảnh không thể truy cập hoặc không hợp lệ: ' . ($liveness['error'] ?? 'Không phản hồi'),
            'liveness' => $liveness
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // 2.2. Kiểm định Chất lượng Nội dung (8-Layer Quality Gate: AEO, GEO, HowTo, FAQs, Zero-Hallucination)
    $contentQuality = verifyArticleContentQuality($data);
    if (!$contentQuality['is_valid']) {
        http_response_code(422);
        echo json_encode([
            'success' => false,
            'error_code' => 'CONTENT_QUALITY_VIOLATION',
            'message' => 'Nội dung bài viết chưa đạt chuẩn chất lượng SEO, AEO, GEO hoặc thiếu nguồn tham khảo uy tín',
            'quality_report' => $contentQuality
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $sunlight = in_array($data['sunlight'] ?? '', ['full_sun', 'partial_shade', 'indoor']) ? $data['sunlight'] : 'full_sun';
    $watering = in_array($data['watering'] ?? '', ['daily', 'moderate', 'drought_tolerant']) ? $data['watering'] : 'moderate';
    $difficulty = intval($data['propagation_difficulty'] ?? 1);
    $growthTimeVi = trim($data['growth_time'] ?? '60 ngày');
    $containerSuitable = isset($data['container_suitable']) ? ($data['container_suitable'] ? 1 : 0) : 1;

    // Sinh slug duy nhất
    $baseSlug = preg_replace('/[^a-z0-9\-]/', '', str_replace(' ', '-', strtolower(stripVietnameseAccents($commonNameVi))));
    $slug = $baseSlug . '-' . substr(uniqid(), -4);
    $id = 'plant-' . uniqid();

    // TỰ ĐỘNG DỊCH NGẦM 100% SANG TIẾNG ANH (Không cần nút bấm)
    $commonNameEn = !empty($data['common_name_en']) ? trim($data['common_name_en']) : autoTranslateViToEn($commonNameVi);
    $descriptionEn = !empty($data['description_en']) ? trim($data['description_en']) : autoTranslateViToEn($descriptionVi);
    $enPayload = autoTranslatePlantPayload($data);
    $translationsEnJson = json_encode($enPayload, JSON_UNESCAPED_UNICODE);

    try {
        $stmt = $pdo->prepare("
            INSERT INTO plants (
                id, slug, common_name, common_name_en, scientific_name, 
                category, description, description_en, image_url, sunlight, 
                watering, propagation_difficulty, growth_time, container_suitable, 
                translations_en
            ) VALUES (
                :id, :slug, :common_name, :common_name_en, :scientific_name, 
                :category, :description, :description_en, :image_url, :sunlight, 
                :watering, :difficulty, :growth_time, :container_suitable, 
                :translations_en
            )
        ");

        $stmt->execute([
            ':id' => $id,
            ':slug' => $slug,
            ':common_name' => $commonNameVi,
            ':common_name_en' => $commonNameEn,
            ':scientific_name' => $scientificName ?: $commonNameEn,
            ':category' => $category,
            ':description' => $descriptionVi,
            ':description_en' => $descriptionEn,
            ':image_url' => $imageUrl,
            ':sunlight' => $sunlight,
            ':watering' => $watering,
            ':difficulty' => $difficulty,
            ':growth_time' => $growthTimeVi,
            ':container_suitable' => $containerSuitable,
            ':translations_en' => $translationsEnJson,
        ]);

        echo json_encode([
            'success' => true,
            'message' => 'Cây trồng mới đã được lưu thành công với 2 phiên bản song ngữ tự động!',
            'data' => [
                'id' => $id,
                'slug' => $slug,
                'common_name_vi' => $commonNameVi,
                'common_name_en' => $commonNameEn,
                'description_vi' => $descriptionVi,
                'description_en' => $descriptionEn,
            ]
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    } catch (\Throwable $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        exit;
    }
}

// Xử lý GET: Lấy danh sách cây hoặc chi tiết 1 cây
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$search   = isset($_GET['q']) ? trim($_GET['q']) : (isset($_GET['search']) ? trim($_GET['search']) : '');
$slug     = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$lang     = isset($_GET['lang']) ? trim($_GET['lang']) : 'vi';

// Tham số phân trang & lọc nâng cao chuẩn RESTful
$page       = max(1, (int)($_GET['page'] ?? 1));
$limit      = min(100, max(1, (int)($_GET['limit'] ?? 24)));
$offset     = ($page - 1) * $limit;
$sunlight   = isset($_GET['sunlight']) ? trim($_GET['sunlight']) : '';
$watering   = isset($_GET['watering']) ? trim($_GET['watering']) : '';
$difficulty = isset($_GET['difficulty']) ? trim($_GET['difficulty']) : '';
$container  = isset($_GET['container']) ? trim($_GET['container']) : '';

if (!$pdo) {
    echo json_encode([
        'success' => true,
        'database' => 'not_configured',
        'message' => 'Cơ sở dữ liệu đang ở chế độ chờ cấu hình config.php',
        'filters' => [
            'category' => htmlspecialchars($category, ENT_QUOTES, 'UTF-8'),
            'search'   => htmlspecialchars($search, ENT_QUOTES, 'UTF-8'),
            'slug'     => htmlspecialchars($slug, ENT_QUOTES, 'UTF-8')
        ],
        'total' => 0,
        'data' => [],
        'server_time' => date('Y-m-d H:i:s'),
        'api_version' => 'v2.1'
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

try {
    // 1. Trường hợp tìm theo slug cụ thể
    if (!empty($slug)) {
        $stmt = $pdo->prepare("SELECT * FROM plants WHERE slug = :slug LIMIT 1");
        $stmt->execute([':slug' => $slug]);
        $plant = $stmt->fetch();

        if ($plant) {
            if (!empty($plant['aliases_json'])) {
                $plant['aliases'] = json_decode($plant['aliases_json'], true);
            }
            if (!empty($plant['translations_en']) && is_string($plant['translations_en'])) {
                $plant['translations_en'] = json_decode($plant['translations_en'], true);
            }
            // Header HTTP Cache 5 phút
            header('Cache-Control: public, max-age=300, stale-while-revalidate=600');
            echo json_encode([
                'success' => true,
                'database' => 'connected',
                'data' => $plant
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit;
        } else {
            http_response_code(404);
            echo json_encode([
                'success' => false,
                'database' => 'connected',
                'message' => 'Không tìm thấy cây trồng với slug yêu cầu'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // 2. Trường hợp lấy danh sách có lọc, tìm kiếm & phân trang chuẩn RESTful
    $whereConditions = ["1=1"];
    $params = [];

    if (!empty($category) && $category !== 'all') {
        $whereConditions[] = "category = :category";
        $params[':category'] = $category;
    }

    if (!empty($search)) {
        $whereConditions[] = "(common_name LIKE :search_name OR scientific_name LIKE :search_sci OR common_name_en LIKE :search_en)";
        $params[':search_name'] = '%' . $search . '%';
        $params[':search_sci']  = '%' . $search . '%';
        $params[':search_en']   = '%' . $search . '%';
    }

    if (!empty($sunlight) && $sunlight !== 'all') {
        $whereConditions[] = "sunlight = :sunlight";
        $params[':sunlight'] = $sunlight;
    }

    if (!empty($watering) && $watering !== 'all') {
        $whereConditions[] = "watering = :watering";
        $params[':watering'] = $watering;
    }

    if (!empty($difficulty) && $difficulty !== 'all') {
        $whereConditions[] = "propagation_difficulty = :difficulty";
        $params[':difficulty'] = $difficulty;
    }

    if ($container === '1' || $container === 'true') {
        $whereConditions[] = "container_suitable = 1";
    }

    $whereSql = implode(' AND ', $whereConditions);

    // Đếm tổng số bản ghi phù hợp bộ lọc
    $countStmt = $pdo->prepare("SELECT COUNT(*) FROM plants WHERE {$whereSql}");
    $countStmt->execute($params);
    $totalRecords = (int)$countStmt->fetchColumn();

    // Truy vấn dữ liệu phân trang
    $sql = "SELECT id, slug, common_name, common_name_en, scientific_name, category, description, description_en, translations_en, image_url, sunlight, watering, propagation_difficulty, growth_time, container_suitable FROM plants WHERE {$whereSql} ORDER BY id ASC LIMIT :limit OFFSET :offset";

    $stmt = $pdo->prepare($sql);
    foreach ($params as $k => $v) {
        $stmt->bindValue($k, $v);
    }
    $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
    $stmt->execute();
    $plants = $stmt->fetchAll();

    foreach ($plants as &$p) {
        if (!empty($p['translations_en']) && is_string($p['translations_en'])) {
            $p['translations_en'] = json_decode($p['translations_en'], true);
        }
        $p['container_suitable'] = (bool)$p['container_suitable'];
    }

    $responsePayload = [
        'success' => true,
        'database' => 'connected',
        'pagination' => [
            'page' => $page,
            'limit' => $limit,
            'total' => $totalRecords,
            'total_pages' => $limit > 0 ? (int)ceil($totalRecords / $limit) : 1,
            'has_more' => ($page * $limit) < $totalRecords
        ],
        'total' => $totalRecords,
        'filters' => [
            'category' => htmlspecialchars($category, ENT_QUOTES, 'UTF-8'),
            'search'   => htmlspecialchars($search, ENT_QUOTES, 'UTF-8'),
            'sunlight' => htmlspecialchars($sunlight, ENT_QUOTES, 'UTF-8'),
            'watering' => htmlspecialchars($watering, ENT_QUOTES, 'UTF-8')
        ],
        'data' => $plants,
        'server_time' => date('Y-m-d H:i:s'),
        'api_version' => 'v2.1'
    ];

    $jsonOutput = json_encode($responsePayload, JSON_UNESCAPED_UNICODE);
    $etag = '"' . md5($jsonOutput) . '"';

    // HTTP Cache Headers & ETag validation
    header('Cache-Control: public, max-age=180, stale-while-revalidate=300');
    header('ETag: ' . $etag);

    if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) === $etag) {
        http_response_code(304);
        exit;
    }

    echo $jsonOutput;

} catch (PDOException $e) {
    http_response_code(500);
    error_log('Query Error in plants.php: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'database' => 'connected',
        'error' => 'Lỗi truy vấn cơ sở dữ liệu'
    ], JSON_UNESCAPED_UNICODE);
}
