<?php
/**
 * API LẤY DANH MỤC CÂY TRỒNG - CHUẨN PDO PREPARED STATEMENTS
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Tính năng:
 * - Lọc theo danh mục (herb, fruit, ornamental)
 * - Tìm kiếm theo tên thông thường, tên khoa học, bí danh
 * - Lấy chi tiết cây theo ?slug=...
 * - Tự động phát hiện trạng thái kết nối MySQL
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

require_once __DIR__ . '/db.php';

$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$search   = isset($_GET['q']) ? trim($_GET['q']) : '';
$slug     = isset($_GET['slug']) ? trim($_GET['slug']) : '';

$pdo = getDbConnection();

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
        'api_version' => 'v1.0'
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
    $sql = "SELECT id, slug, common_name, scientific_name, category, description, image_url, sunlight, watering, propagation_difficulty, growth_time, container_suitable FROM plants WHERE 1=1";
    $params = [];

    if (!empty($category)) {
        $sql .= " AND category = :category";
        $params[':category'] = $category;
    }

    if (!empty($search)) {
        $sql .= " AND (common_name LIKE :search_name OR scientific_name LIKE :search_sci)";
        $params[':search_name'] = '%' . $search . '%';
        $params[':search_sci']  = '%' . $search . '%';
    }

    $sql .= " ORDER BY created_at DESC LIMIT 100";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $plants = $stmt->fetchAll();

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
        'api_version' => 'v1.0'
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
