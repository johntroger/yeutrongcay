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

require_once __DIR__ . '/db.php';

$config = function_exists('getYtcConfig') ? getYtcConfig() : [];
$expectedKey = trim($config['security']['seed_key'] ?? '');

if (empty($expectedKey)) {
    http_response_code(503);
    echo json_encode([
        'success' => false,
        'message' => 'Hệ thống chưa cấu hình seed_key trong config.php'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

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

// 3. Seed ca bệnh và câu trả lời đã xác minh (MS5: Verified Answers)
$clinicAnswerCount = 0;
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS clinic_answers (
        id VARCHAR(50) PRIMARY KEY,
        question_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(50) NOT NULL,
        author_name VARCHAR(150) NOT NULL,
        author_badge VARCHAR(100) DEFAULT NULL,
        content TEXT NOT NULL,
        upvotes INT DEFAULT 0,
        is_verified BOOLEAN DEFAULT FALSE,
        status ENUM('visible', 'pending', 'hidden') DEFAULT 'visible',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_question (question_id),
        INDEX idx_user (user_id),
        INDEX idx_verified (is_verified)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Khởi tạo bảng câu hỏi nếu cần
    $pdo->exec("CREATE TABLE IF NOT EXISTS clinic_questions (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        user_name VARCHAR(150) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        plant_name_hint VARCHAR(150) DEFAULT NULL,
        region ENUM('north', 'central', 'south') NOT NULL,
        symptoms_json JSON DEFAULT NULL,
        images_json JSON DEFAULT NULL,
        ai_instant_diagnosis TEXT DEFAULT NULL,
        status ENUM('visible', 'pending', 'hidden') DEFAULT 'visible',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_region (region),
        INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Seed câu hỏi mẫu
    $qStmt = $pdo->prepare("INSERT INTO clinic_questions (id, user_id, user_name, title, description, plant_name_hint, region, symptoms_json, images_json, ai_instant_diagnosis, status)
                           VALUES (:id, :uid, :uname, :title, :desc, :hint, :region, :sym, :img, :ai, 'visible')
                           ON DUPLICATE KEY UPDATE title = VALUES(title)");
    $qStmt->execute([
        ':id'     => 'case-01',
        ':uid'    => 'usr-101',
        ':uname'  => 'Bác Ba Làm Vườn',
        ':title'  => 'Cây ổi lê trồng chậu 50L bị lớp phấn trắng bám dưới mặt lá và rụng nụ non',
        ':desc'   => 'Tôi trồng chậu trên sân thượng nắng gắt, mấy hôm nay thấy dưới gân lá có nhiều bọ nhỏ li ti phủ phấn trắng, kiến bu nhiều quanh ngọn và nụ non bắt đầu thâm đen rụng dần.',
        ':hint'   => 'Ổi Lê Đài Loan',
        ':region' => 'south',
        ':sym'    => json_encode(['Rệp sáp trắng bám thân', 'Rụng hoa/trái non'], JSON_UNESCAPED_UNICODE),
        ':img'    => json_encode(['https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Psidium_guajava_fruit.jpg/330px-Psidium_guajava_fruit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail']),
        ':ai'     => 'Phân tích sơ bộ từ AI (Miền Nam): Khả năng 95% cây bị rệp sáp bông (Pseudococcidae) cộng sinh với kiến đen. Rệp hút nhựa làm kiệt đọt non và rụng nụ. Khuyến cáo cấp tốc: Pha nước rửa chén hữu cơ hoặc cồn y tế 70 độ xịt trực tiếp vào ổ rệp vào lúc chiều mát, sáng hôm sau xịt nước mạnh rửa trôi.'
    ]);

    $qStmt->execute([
        ':id'     => 'case-02',
        ':uid'    => 'usr-102',
        ':uname'  => 'Thu Trang (Căn Hộ Ecopark)',
        ':title'  => 'Bụi Đinh Lăng nếp mới giâm cành bị vàng rũ lá dưới gốc dù đất vẫn ướt sũng',
        ':desc'   => 'Em mới xin cành giâm về cắm vào chậu đất thịt trộn phân bò, tưới ngày 2 lần đẫm nước. Sau 1 tuần thì lá chân vàng ươm, nhấc nhẹ cành lên thấy phần gốc cắm dưới đất thâm đen có mùi úng.',
        ':hint'   => 'Đinh Lăng Nếp Lá Nhỏ',
        ':region' => 'north',
        ':sym'    => json_encode(['Lá héo rũ dù đất ẩm', 'Vàng lá đốm nâu'], JSON_UNESCAPED_UNICODE),
        ':img'    => json_encode(['https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg/330px-Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail']),
        ':ai'     => 'Phân tích sơ bộ từ AI (Miền Bắc): Đinh lăng bị thối đen gốc do úng rễ (Pythium). Đất thịt quá chặt bí khí kết hợp tưới đẫm làm cành thiếu oxy nghẹt rễ. Cần nhổ cành, cắt bỏ đoạn đen, rửa nước vôi và chuyển sang giá thể xơ dừa + đá perlite tơi xốp.'
    ]);

    // Seed câu trả lời đã xác nhận (Verified Answers)
    $ansStmt = $pdo->prepare("INSERT INTO clinic_answers (id, question_id, user_id, author_name, author_badge, content, upvotes, is_verified, status)
                             VALUES (:id, :qid, :uid, :name, :badge, :content, :upvotes, :is_ver, 'visible')
                             ON DUPLICATE KEY UPDATE content = VALUES(content), is_verified = VALUES(is_verified)");
    
    $ansStmt->execute([
        ':id'      => 'ans-101',
        ':qid'     => 'case-01',
        ':uid'     => 'usr-ks-lam',
        ':name'    => 'Kỹ Sư Nông Nghiệp Lâm',
        ':badge'   => 'Nhà Vườn Kinh Nghiệm',
        ':content' => 'Bác lấy 1 củ tỏi + 3 quả ớt + 1 nhánh gừng giã nhuyễn ngâm với 1 lít rượu trắng trong 2 ngày. Lọc lấy nước cốt pha tỷ lệ 1:20 với nước lã và 1 giọt dầu rửa chén xịt 2 lần cách nhau 3 ngày là rệp sáp sạch bóng, hoàn toàn an toàn cho trái ăn!',
        ':upvotes' => 18,
        ':is_ver'  => 1
    ]);
    $clinicAnswerCount++;

    $ansStmt->execute([
        ':id'      => 'ans-102',
        ':qid'     => 'case-01',
        ':uid'     => 'usr-minh-thao',
        ':name'    => 'Minh Thảo (Q.7)',
        ':badge'   => 'Thành Viên Tích Cực',
        ':content' => 'Bác nhớ rắc thêm một ít vôi bột quanh mép chậu để chặn đường kiến đen tha rệp từ dưới đất lên nữa nhé bác!',
        ':upvotes' => 7,
        ':is_ver'  => 0
    ]);
    $clinicAnswerCount++;

    $ansStmt->execute([
        ':id'      => 'ans-201',
        ':qid'     => 'case-02',
        ':uid'     => 'usr-ly-cuong',
        ':name'    => 'Lương Y Nguyễn Văn Cường',
        ':badge'   => 'Dược Sĩ Cổ Truyền',
        ':content' => 'Sai lầm phổ biến khi giâm đinh lăng là dùng đất thịt có phân. Giai đoạn cành chưa có rễ tuyệt đối không bón phân. Cháu nên cắm cành vào cát xây dựng ẩm hoặc dớn trắng ẩm, để chỗ râm mát 20 ngày tự khắc rễ tơ trắng bật tua tủa!',
        ':upvotes' => 24,
        ':is_ver'  => 1
    ]);
    $clinicAnswerCount++;
} catch (PDOException $e) {
    error_log('Seeding clinic answers error: ' . $e->getMessage());
}

echo json_encode([
    'success' => true,
    'total_in_file' => count($plants),
    'seeded_count' => $successCount,
    'swap_offers_seeded' => $swapSuccessCount,
    'clinic_answers_seeded' => $clinicAnswerCount,
    'errors_count' => count($errors),
    'errors' => $errors,
    'server_time' => date('Y-m-d H:i:s')
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
