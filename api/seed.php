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

// Nạp danh mục hạt giống & cành giâm mẫu vào bảng swap_offers
$seedSwapOffers = [
    [
        'id' => 'swap-01',
        'user_id' => 'usr-hn-01',
        'user_name' => 'Cô Mai Lan (Vườn Ban Công Cầu Giấy)',
        'user_avatar' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        'region_zone' => 'north',
        'location_name' => 'Hà Nội - Q. Cầu Giấy (Gần Công viên Nghĩa Đô)',
        'plant_name' => 'Cành giâm Húng Chanh & Lá Cẩm Tím',
        'scientific_name' => 'Plectranthus amboinicus & Peristrophe bivalvis',
        'offer_type' => 'giveaway',
        'item_type' => 'Cành giâm khỏe rễ',
        'description' => 'Vườn nhà tỉa cành cuối mùa thu, dư khoảng 30 đoạn cành húng chanh lá dày mọng nước và chục gốc lá cẩm tím nấu xôi. Tặng miễn phí cho anh chị em nào muốn làm tủ thuốc xanh gia đình.',
        'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
        'contact_note' => 'Ghé lấy sau 17h chiều hoặc nhắn qua Zalo vườn'
    ],
    [
        'id' => 'swap-02',
        'user_id' => 'usr-hcm-02',
        'user_name' => 'Hoàng Minh (Sân Thượng Thủ Đức)',
        'user_avatar' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        'region_zone' => 'south',
        'location_name' => 'TP.HCM - TP. Thủ Đức (Khu Hiệp Bình Chánh)',
        'plant_name' => 'Cây Ổi Lê Đài Loan chiết cành (đã ra hoa bói)',
        'scientific_name' => 'Psidium guajava',
        'offer_type' => 'exchange',
        'item_type' => 'Cây con bầu đất 5L',
        'description' => 'Em tự chiết cành từ cây mẹ F1 ngọt giòn, cây cao 60cm rễ trắng kín bầu. Muốn giao lưu đổi lấy 1 chậu Cóc Thái hoặc Khế Ngọt trồng chậu ban công tương đương.',
        'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Psidium_guajava_fruit.jpg/330px-Psidium_guajava_fruit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
        'contact_note' => 'Đổi tại cổng Gigamall Phạm Văn Đồng cuối tuần'
    ],
    [
        'id' => 'swap-03',
        'user_id' => 'usr-dn-03',
        'user_name' => 'Bác Ba Hải Châu',
        'user_avatar' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        'region_zone' => 'central',
        'location_name' => 'Đà Nẵng - Q. Hải Châu (Đường 2 Tháng 9)',
        'plant_name' => 'Hạt giống Mướp Đắng Rừng & Đậu Rồng',
        'scientific_name' => 'Momordica charantia var. muricata',
        'offer_type' => 'giveaway',
        'item_type' => 'Hạt giống sấy khô tự nhiên',
        'description' => 'Thu hoạch đợt hạt giống chuẩn vụ mới, tỉ lệ nảy mầm trên 90%. Chia sẻ 20 gói nhỏ (mỗi gói 15 hạt) cho người yêu vườn miền Trung phủ xanh giàn leo.',
        'image_url' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Ripe_bitter_melon_%28Momordica_charantia%29.jpg/330px-Ripe_bitter_melon_%28Momordica_charantia%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
        'contact_note' => 'Hỗ trợ gửi bưu điện nếu ở xa, tự thanh toán ship 15k'
    ]
];

$swapSql = "INSERT INTO swap_offers (
    id, user_id, user_name, user_avatar, region_zone,
    location_name, plant_name, scientific_name, offer_type,
    item_type, description, image_url, quarantine_pledge,
    contact_note, status
) VALUES (
    :id, :user_id, :user_name, :user_avatar, :region_zone,
    :location_name, :plant_name, :scientific_name, :offer_type,
    :item_type, :description, :image_url, 1,
    :contact_note, 'visible'
) ON DUPLICATE KEY UPDATE
    plant_name = VALUES(plant_name),
    description = VALUES(description),
    image_url = VALUES(image_url),
    contact_note = VALUES(contact_note)";

$swapStmt = $pdo->prepare($swapSql);
$swapSuccessCount = 0;
foreach ($seedSwapOffers as $offer) {
    try {
        $swapStmt->execute([
            ':id'              => $offer['id'],
            ':user_id'         => $offer['user_id'],
            ':user_name'       => $offer['user_name'],
            ':user_avatar'     => $offer['user_avatar'],
            ':region_zone'     => $offer['region_zone'],
            ':location_name'   => $offer['location_name'],
            ':plant_name'      => $offer['plant_name'],
            ':scientific_name' => $offer['scientific_name'],
            ':offer_type'      => $offer['offer_type'],
            ':item_type'       => $offer['item_type'],
            ':description'     => $offer['description'],
            ':image_url'       => $offer['image_url'],
            ':contact_note'    => $offer['contact_note'],
        ]);
        $swapSuccessCount++;
    } catch (PDOException $e) {
        // Bỏ qua lỗi trùng
    }
}

echo json_encode([
    'success' => true,
    'total_in_file' => count($plants),
    'seeded_count' => $successCount,
    'swap_offers_seeded' => $swapSuccessCount,
    'errors_count' => count($errors),
    'errors' => $errors,
    'server_time' => date('Y-m-d H:i:s')
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
