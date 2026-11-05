<?php
/**
 * API TRẠM TRAO ĐỔI CÂY & HẠT GIỐNG (PLANT SWAP & SEED EXCHANGE) - YEUTRONGECAY.COM
 * Quản lý tin chia sẻ cành giâm, hạt giống an toàn ba miền với cam kết cách ly 7 ngày
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
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
$pdo = getDbConnection();

// Tự động khởi tạo bảng swap_offers nếu chưa tồn tại
if ($pdo) {
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS swap_offers (
            id VARCHAR(50) PRIMARY KEY,
            user_id VARCHAR(50) NOT NULL,
            user_name VARCHAR(150) NOT NULL,
            user_avatar VARCHAR(500) DEFAULT NULL,
            region_zone ENUM('north', 'central', 'south') NOT NULL,
            location_name VARCHAR(255) NOT NULL,
            plant_name VARCHAR(255) NOT NULL,
            scientific_name VARCHAR(255) DEFAULT NULL,
            offer_type ENUM('giveaway', 'exchange', 'seeking', 'seek') NOT NULL,
            item_type VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            image_url VARCHAR(500) NOT NULL,
            quarantine_pledge BOOLEAN DEFAULT TRUE,
            contact_note VARCHAR(255) DEFAULT NULL,
            status ENUM('visible', 'pending', 'hidden') DEFAULT 'visible',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_region (region_zone),
            INDEX idx_type (offer_type),
            INDEX idx_status (status)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    } catch (PDOException $e) {
        error_log("Failed to auto-create swap_offers table: " . $e->getMessage());
    }
}

// ----------------------------------------------------
// 1. XỬ LÝ GET: LẤY DANH SÁCH TIN TRAO ĐỔI
// ----------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!$pdo) {
        echo json_encode([
            'success' => true,
            'database' => 'not_configured',
            'data' => []
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        $region = $_GET['region'] ?? 'all';
        $type   = $_GET['type'] ?? 'all';
        $q      = isset($_GET['q']) ? trim($_GET['q']) : '';

        $sql = "SELECT * FROM swap_offers WHERE status = 'visible'";
        $params = [];

        if (in_array($region, ['north', 'central', 'south'])) {
            $sql .= " AND region_zone = :region";
            $params[':region'] = $region;
        }

        if (in_array($type, ['giveaway', 'exchange', 'seek', 'seeking'])) {
            // Chuẩn hóa 'seek' và 'seeking'
            if ($type === 'seek' || $type === 'seeking') {
                $sql .= " AND (offer_type = 'seek' OR offer_type = 'seeking')";
            } else {
                $sql .= " AND offer_type = :type";
                $params[':type'] = $type;
            }
        }

        if (!empty($q)) {
            $sql .= " AND (plant_name LIKE :q OR location_name LIKE :q OR description LIKE :q)";
            $params[':q'] = "%$q%";
        }

        $sql .= " ORDER BY created_at DESC LIMIT 50";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $offers = $stmt->fetchAll();

        foreach ($offers as &$item) {
            $item['quarantine_pledge'] = (bool)$item['quarantine_pledge'];
            // Chuẩn hóa tên loại tin
            if ($item['offer_type'] === 'seeking') {
                $item['offer_type'] = 'seek';
            }
        }

        echo json_encode([
            'success' => true,
            'database' => 'connected',
            'total' => count($offers),
            'data' => $offers
        ], JSON_UNESCAPED_UNICODE);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Lỗi truy vấn tin trao đổi: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

// ----------------------------------------------------
// 2. XỬ LÝ POST: ĐĂNG TIN TRAO ĐỔI MỚI
// ----------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw_input = file_get_contents('php://input');
    $data = json_decode($raw_input, true) ?: $_POST;

    // Honeypot chống bot tự động
    if (!empty($data['website_url'])) {
        echo json_encode(['success' => true, 'message' => 'Tin đăng đã được tiếp nhận']);
        exit;
    }

    // Rate-limiting đơn giản: tối đa 10 tin / 15 phút / IP
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $rateKeyFile = sys_get_temp_dir() . '/ytc_swap_rate_' . md5($ip) . '.json';
    $now = time();
    $rateData = file_exists($rateKeyFile) ? json_decode(file_get_contents($rateKeyFile), true) : ['count' => 0, 'start' => $now];

    if ($now - $rateData['start'] < 900) {
        if ($rateData['count'] >= 10) {
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'message' => 'Bạn đã đăng quá số lượt tin trao đổi cho phép. Vui lòng thử lại sau 15 phút.'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
        $rateData['count']++;
    } else {
        $rateData = ['count' => 1, 'start' => $now];
    }
    @file_put_contents($rateKeyFile, json_encode($rateData));

    // Lọc và làm sạch dữ liệu
    $plant_name    = isset($data['plant_name']) ? trim(htmlspecialchars($data['plant_name'], ENT_QUOTES, 'UTF-8')) : '';
    $location_name = isset($data['location_name']) ? trim(htmlspecialchars($data['location_name'], ENT_QUOTES, 'UTF-8')) : '';
    $region_zone   = in_array($data['region_zone'] ?? '', ['north', 'central', 'south']) ? $data['region_zone'] : 'north';
    $offer_type    = in_array($data['offer_type'] ?? '', ['giveaway', 'exchange', 'seek', 'seeking']) ? $data['offer_type'] : 'giveaway';
    if ($offer_type === 'seeking') $offer_type = 'seek';

    $item_type     = isset($data['item_type']) ? trim(htmlspecialchars($data['item_type'], ENT_QUOTES, 'UTF-8')) : 'Cành giâm khỏe rễ';
    $description   = isset($data['description']) ? trim(htmlspecialchars($data['description'], ENT_QUOTES, 'UTF-8')) : '';
    $contact_note  = isset($data['contact_note']) ? trim(htmlspecialchars($data['contact_note'], ENT_QUOTES, 'UTF-8')) : 'Nhắn tin qua hệ thống';
    $image_url     = isset($data['image_url']) ? trim($data['image_url']) : '';
    $user_name     = isset($data['user_name']) ? trim(htmlspecialchars($data['user_name'], ENT_QUOTES, 'UTF-8')) : 'Người Yêu Vườn';
    $user_avatar   = isset($data['user_avatar']) ? trim($data['user_avatar']) : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
    $quarantine    = !empty($data['quarantine_pledge']) ? 1 : 1; // Khuyến cáo cam kết cách ly

    if (empty($plant_name) || empty($location_name)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Vui lòng nhập tên giống cây và địa điểm trao đổi.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Link ảnh mặc định nếu không có
    if (empty($image_url)) {
        $image_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail';
    }

    $id = 'swap-' . time() . '-' . rand(100, 999);
    $user_id = 'usr-' . substr(md5($ip), 0, 8);

    // M6 (H6, H15): Danh sách từ khóa cấm, Sách Đỏ (Nhóm IA/IIA) và loài xâm hại nguy hiểm
    $status = 'visible';
    $mod_warning = null;
    $banned_terms = [
        'cần sa' => 'Cây có chứa chất ma túy bị nghiêm cấm hoàn toàn.',
        'thuốc phiện' => 'Cây thuốc phiện bị nghiêm cấm theo luật pháp.',
        'cây anh túc' => 'Cây anh túc bị nghiêm cấm lưu hành và gieo trồng.',
        'mai dương' => 'Cây mai dương (trinh nữ móc gai) là loài ngoại lai xâm hại nguy hiểm cấm nhân giống/phát tán.',
        'trinh nữ móc gai' => 'Loài xâm hại sinh thái cấm lưu hành.',
        'mimosa pigra' => 'Cây mai dương cấm phát tán theo Thông tư 35/2018/TT-BTNMT.',
        'ốc bươu vàng' => 'Loài phá hoại nông nghiệp nghiêm cấm chia sẻ phát tán.',
        'cúc bò lan' => 'Loài xâm lấn cấm nhân rộng.',
        'lan hài việt nam' => 'Lan hài tự nhiên thuộc Nhóm IA Sách Đỏ cấm khai thác, mua bán hoang dã.',
        'lan hài' => 'Lan hài tự nhiên thuộc danh mục bảo vệ nguồn gen đặc biệt.',
        'lan kim tuyến rừng' => 'Lan gấm kim tuyến rừng tự nhiên thuộc Nhóm IA nghiêm cấm mua bán trái phép.',
        'paraquat' => 'Chất diệt cỏ cực độc đã bị cấm hoàn toàn tại Việt Nam.',
        '2,4-d' => 'Hóa chất BVTV bị cấm lưu hành.',
        'cá độ' => 'Nội dung spam cờ bạc bị chặn tự động.',
        'kubet' => 'Spam cờ bạc bị chặn tự động.'
    ];

    $combined_text = mb_strtolower($plant_name . ' ' . $description . ' ' . $contact_note, 'UTF-8');
    foreach ($banned_terms as $kw => $msg) {
        if (mb_strpos($combined_text, $kw) !== false) {
            $status = 'pending';
            $mod_warning = $msg;
            break;
        }
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO swap_offers (
                id, user_id, user_name, user_avatar, region_zone,
                location_name, plant_name, scientific_name, offer_type,
                item_type, description, image_url, quarantine_pledge,
                contact_note, status
            ) VALUES (
                :id, :user_id, :user_name, :user_avatar, :region_zone,
                :location_name, :plant_name, :scientific_name, :offer_type,
                :item_type, :description, :image_url, :quarantine_pledge,
                :contact_note, :status
            )");

            $stmt->execute([
                ':id'                => $id,
                ':user_id'           => $user_id,
                ':user_name'         => $user_name,
                ':user_avatar'       => $user_avatar,
                ':region_zone'       => $region_zone,
                ':location_name'     => $location_name,
                ':plant_name'        => $plant_name,
                ':scientific_name'   => $data['scientific_name'] ?? null,
                ':offer_type'        => $offer_type,
                ':item_type'         => $item_type,
                ':description'       => $description,
                ':image_url'         => $image_url,
                ':quarantine_pledge' => $quarantine,
                ':contact_note'      => $contact_note,
                ':status'            => $status,
            ]);
        } catch (PDOException $e) {
            error_log("Failed to insert swap offer into MySQL: " . $e->getMessage());
        }

        // Thưởng điểm Karma cho hành động chia sẻ mầm xanh (+15 điểm)
        if ($status === 'visible') {
            try {
                $evt = $pdo->prepare("INSERT INTO user_events (user_id, event_type, points, reference_id, metadata_json)
                                      VALUES (:uid, 'share_seed', 15, :ref, :meta)");
                $evt->execute([
                    ':uid'  => $user_id,
                    ':ref'  => $id,
                    ':meta' => json_encode(['plant_name' => $plant_name, 'location_name' => $location_name], JSON_UNESCAPED_UNICODE)
                ]);
            } catch (Exception $e) {
                // bỏ qua lỗi log event
            }
        }
    }

    echo json_encode([
        'success' => true,
        'moderation_warning' => $mod_warning,
        'message' => $status === 'pending'
            ? 'Tin đăng của bạn chứa từ khóa cần xem xét (' . ($mod_warning ?: 'kiểm duyệt') . ') và sẽ hiển thị sau khi Ban kiểm duyệt xác minh.'
            : 'Đăng tin trao đổi mầm xanh thành công!',
        'data' => [
            'id'                => $id,
            'user_id'           => $user_id,
            'user_name'         => $user_name,
            'user_avatar'       => $user_avatar,
            'region_zone'       => $region_zone,
            'location_name'     => $location_name,
            'plant_name'        => $plant_name,
            'scientific_name'   => $data['scientific_name'] ?? null,
            'offer_type'        => $offer_type,
            'item_type'         => $item_type,
            'description'       => $description,
            'quarantine_pledge' => (bool)$quarantine,
            'image_url'         => $image_url,
            'contact_note'      => $contact_note,
            'status'            => $status,
            'created_at'        => 'Vừa xong'
        ]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
