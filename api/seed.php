<?php
/**
 * DATABASE SEEDER CHO HỆ THỐNG YÊU TRỒNG CÂY
 * Tự động nạp danh mục thực vật chuẩn quốc tế vào MySQL
 * 
 * Bảo mật: Chỉ chạy khi có đúng token bí mật từ config.php
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

require_once __DIR__ . '/db.php';

$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? require $configFile : [];
$expectedKey = $config['security']['seed_key'] ?? 'ytc_secret_seed_token_2026';
$providedKey = $_GET['token'] ?? $_POST['token'] ?? '';

if (empty($providedKey) || $providedKey !== $expectedKey) {
    http_response_code(403);
    echo json_encode([
        'success' => false,
        'message' => 'Mã bảo mật seed token không hợp lệ hoặc thiếu tham số ?token='
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$pdo = getDbConnection();
if (!$pdo) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Không thể kết nối MySQL. Vui lòng kiểm tra file config.php.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$dataFile = __DIR__ . '/plants_data.json';
if (!file_exists($dataFile)) {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'message' => 'Không tìm thấy file dữ liệu plants_data.json.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$plants = json_decode(file_get_contents($dataFile), true);
if (!is_array($plants)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Dữ liệu plants_data.json không đúng định dạng mảng JSON.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "INSERT INTO plants (
    id, slug, common_name, scientific_name, aliases_json, category,
    description, image_url, image_sha256, sunlight, watering,
    propagation_difficulty, growth_time, container_suitable
) VALUES (
    :id, :slug, :common_name, :scientific_name, :aliases_json, :category,
    :description, :image_url, :image_sha256, :sunlight, :watering,
    :propagation_difficulty, :growth_time, :container_suitable
) ON DUPLICATE KEY UPDATE
    common_name = VALUES(common_name),
    scientific_name = VALUES(scientific_name),
    aliases_json = VALUES(aliases_json),
    category = VALUES(category),
    description = VALUES(description),
    image_url = VALUES(image_url),
    image_sha256 = VALUES(image_sha256),
    sunlight = VALUES(sunlight),
    watering = VALUES(watering),
    propagation_difficulty = VALUES(propagation_difficulty),
    growth_time = VALUES(growth_time),
    container_suitable = VALUES(container_suitable)";

$stmt = $pdo->prepare($sql);
$successCount = 0;
$errors = [];

foreach ($plants as $plant) {
    try {
        $aliasesJson = !empty($plant['aliases']) ? json_encode($plant['aliases'], JSON_UNESCAPED_UNICODE) : null;
        
        $stmt->execute([
            ':id'                     => $plant['id'],
            ':slug'                   => $plant['slug'],
            ':common_name'            => $plant['common_name'],
            ':scientific_name'        => $plant['scientific_name'],
            ':aliases_json'           => $aliasesJson,
            ':category'               => $plant['category'],
            ':description'            => $plant['description'],
            ':image_url'              => $plant['image_url'],
            ':image_sha256'           => $plant['image_sha256'] ?? null,
            ':sunlight'               => $plant['sunlight'],
            ':watering'               => $plant['watering'],
            ':propagation_difficulty' => (int)($plant['propagation_difficulty'] ?? 1),
            ':growth_time'            => $plant['growth_time'],
            ':container_suitable'     => !empty($plant['container_suitable']) ? 1 : 0
        ]);
        $successCount++;
    } catch (PDOException $e) {
        $errors[] = [
            'plant' => $plant['common_name'] ?? $plant['id'],
            'error' => $e->getMessage()
        ];
    }
}

echo json_encode([
    'success' => true,
    'total_in_file' => count($plants),
    'seeded_count' => $successCount,
    'errors_count' => count($errors),
    'errors' => $errors,
    'server_time' => date('Y-m-d H:i:s')
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
