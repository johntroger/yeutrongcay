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

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/translate_service.php';

$pdo = getDbConnection();

// Xử lý POST: Thêm cây mới tự động dịch ngầm sang Tiếng Anh
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
    $category = in_array($data['category'] ?? '', ['herb', 'fruit', 'ornamental']) ? $data['category'] : 'herb';
    $descriptionVi = trim($data['description'] ?? '');
    $imageUrl = trim($data['image_url'] ?? 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80');
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
$search   = isset($_GET['q']) ? trim($_GET['q']) : '';
$slug     = isset($_GET['slug']) ? trim($_GET['slug']) : '';
$lang     = isset($_GET['lang']) ? trim($_GET['lang']) : 'vi';

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
        'api_version' => 'v2.0'
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

    // 2. Trường hợp lấy danh sách có lọc & tìm kiếm
    $sql = "SELECT id, slug, common_name, common_name_en, scientific_name, category, description, description_en, translations_en, image_url, sunlight, watering, propagation_difficulty, growth_time, container_suitable FROM plants WHERE 1=1";
    $params = [];

    if (!empty($category)) {
        $sql .= " AND category = :category";
        $params[':category'] = $category;
    }

    if (!empty($search)) {
        $sql .= " AND (common_name LIKE :search_name OR scientific_name LIKE :search_sci OR common_name_en LIKE :search_en)";
        $params[':search_name'] = '%' . $search . '%';
        $params[':search_sci']  = '%' . $search . '%';
        $params[':search_en']   = '%' . $search . '%';
    }

    $sql .= " ORDER BY created_at DESC LIMIT 100";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $plants = $stmt->fetchAll();

    foreach ($plants as &$p) {
        if (!empty($p['translations_en']) && is_string($p['translations_en'])) {
            $p['translations_en'] = json_decode($p['translations_en'], true);
        }
    }

    echo json_encode([
        'success' => true,
        'database' => 'connected',
        'total' => count($plants),
        'filters' => [
            'category' => htmlspecialchars($category, ENT_QUOTES, 'UTF-8'),
            'search'   => htmlspecialchars($search, ENT_QUOTES, 'UTF-8')
        ],
        'data' => $plants,
        'server_time' => date('Y-m-d H:i:s'),
        'api_version' => 'v2.0'
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    error_log('Query Error in plants.php: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'database' => 'connected',
        'error' => 'Lỗi truy vấn cơ sở dữ liệu'
    ], JSON_UNESCAPED_UNICODE);
}
