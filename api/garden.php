<?php
/**
 * API VƯỜN SỐ CÁ NHÂN & NHẬT KÝ THEO DÕI CÂY (DIGITAL GARDEN & PHOTO DIARY)
 * Quản lý hồ sơ vườn, cây trồng đô thị và mốc nhật ký hình ảnh theo thời gian
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

// Tự động khởi tạo bảng vườn số và nhật ký nếu chưa tồn tại
if ($pdo) {
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS gardens (
            id VARCHAR(50) PRIMARY KEY,
            user_id VARCHAR(50) NOT NULL,
            user_name VARCHAR(150) NOT NULL,
            garden_name VARCHAR(255) NOT NULL,
            garden_type ENUM('balcony', 'rooftop', 'backyard', 'indoor_window') NOT NULL DEFAULT 'balcony',
            city VARCHAR(100) NOT NULL DEFAULT 'TP. Hồ Chí Minh',
            description TEXT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_user_id (user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $pdo->exec("CREATE TABLE IF NOT EXISTS garden_plants (
            id VARCHAR(50) PRIMARY KEY,
            garden_id VARCHAR(50) NOT NULL,
            plant_id VARCHAR(36) DEFAULT NULL,
            custom_name VARCHAR(255) NOT NULL,
            species_name VARCHAR(255) DEFAULT NULL,
            planted_date DATE NOT NULL,
            pot_type VARCHAR(100) DEFAULT 'Chậu nhựa thông minh 35cm',
            current_status ENUM('healthy', 'flowering', 'fruiting', 'recovering', 'dormant') DEFAULT 'healthy',
            cover_image_url VARCHAR(500) NOT NULL,
            notes TEXT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_garden_id (garden_id),
            INDEX idx_plant_id (plant_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $pdo->exec("CREATE TABLE IF NOT EXISTS plant_diaries (
            id VARCHAR(50) PRIMARY KEY,
            garden_plant_id VARCHAR(50) NOT NULL,
            user_id VARCHAR(50) NOT NULL,
            entry_date DATE NOT NULL,
            stage VARCHAR(100) NOT NULL DEFAULT 'Đang sinh trưởng',
            note TEXT NOT NULL,
            image_url VARCHAR(500) NOT NULL,
            image_sha256 VARCHAR(64) DEFAULT NULL,
            metrics_json JSON DEFAULT NULL,
            status ENUM('visible', 'pending', 'hidden') DEFAULT 'visible',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_plant_entry (garden_plant_id, entry_date),
            INDEX idx_user_diary (user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        // Tự động nâng cấp bảng garden_plants thêm các trường chu kỳ chăm sóc nếu chưa có
        try {
            $pdo->exec("ALTER TABLE garden_plants ADD COLUMN last_watered_at DATE DEFAULT NULL");
        } catch (PDOException $e) {}
        try {
            $pdo->exec("ALTER TABLE garden_plants ADD COLUMN last_fertilized_at DATE DEFAULT NULL");
        } catch (PDOException $e) {}
        try {
            $pdo->exec("ALTER TABLE garden_plants ADD COLUMN watering_interval_days INT DEFAULT 2");
        } catch (PDOException $e) {}
        try {
            $pdo->exec("ALTER TABLE garden_plants ADD COLUMN fertilizing_interval_days INT DEFAULT 14");
        } catch (PDOException $e) {}

        // Tự động nâng cấp hệ thống Game Hóa & Web3 Testnet Thật (Migration 007)
        try {
            $pdo->exec("CREATE TABLE IF NOT EXISTS user_inventory (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(50) NOT NULL,
                item_type ENUM('water', 'fertilizer', 'soil', 'sunlight', 'spray') NOT NULL,
                quantity INT NOT NULL DEFAULT 0,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY uq_user_item (user_id, item_type),
                INDEX idx_user (user_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
        } catch (PDOException $e) {}

        try {
            $pdo->exec("CREATE TABLE IF NOT EXISTS garden_harvest_logs (
                id VARCHAR(50) PRIMARY KEY,
                garden_plant_id VARCHAR(50) NOT NULL,
                user_id VARCHAR(50) NOT NULL,
                harvest_date DATE NOT NULL,
                reward_hearts INT NOT NULL DEFAULT 0,
                notes VARCHAR(255) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_plant_harvest (garden_plant_id),
                INDEX idx_user_harvest (user_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
        } catch (PDOException $e) {}

        try {
            $pdo->exec("CREATE TABLE IF NOT EXISTS nft_mint_vouchers (
                nonce VARCHAR(64) PRIMARY KEY,
                user_id VARCHAR(50) NOT NULL,
                garden_plant_id VARCHAR(50) NOT NULL,
                recipient_address VARCHAR(42) NOT NULL,
                is_claimed BOOLEAN DEFAULT FALSE,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_plant (garden_plant_id),
                INDEX idx_user_voucher (user_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
        } catch (PDOException $e) {}

        $gamifiedColumns = [
            "ALTER TABLE garden_plants ADD COLUMN growth_stage TINYINT NOT NULL DEFAULT 1",
            "ALTER TABLE garden_plants ADD COLUMN growth_exp INT NOT NULL DEFAULT 0",
            "ALTER TABLE garden_plants ADD COLUMN health_score TINYINT NOT NULL DEFAULT 100",
            "ALTER TABLE garden_plants ADD COLUMN moisture_level TINYINT NOT NULL DEFAULT 80",
            "ALTER TABLE garden_plants ADD COLUMN nutrient_level TINYINT NOT NULL DEFAULT 75",
            "ALTER TABLE garden_plants ADD COLUMN sunlight_level TINYINT NOT NULL DEFAULT 80",
            "ALTER TABLE garden_plants ADD COLUMN soil_level TINYINT NOT NULL DEFAULT 90",
            "ALTER TABLE garden_plants ADD COLUMN last_evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
            "ALTER TABLE garden_plants ADD COLUMN total_harvests INT NOT NULL DEFAULT 0",
            "ALTER TABLE garden_plants ADD COLUMN passport_token_id VARCHAR(50) DEFAULT NULL",
            "ALTER TABLE garden_plants ADD COLUMN passport_tx_hash VARCHAR(100) DEFAULT NULL",
            "ALTER TABLE garden_plants ADD COLUMN passport_network VARCHAR(50) DEFAULT 'Ethereum Sepolia'",
            "ALTER TABLE garden_plants ADD COLUMN passport_contract_addr VARCHAR(50) DEFAULT '0x5994cd371311fb1ddc1a3354b6979acd3cd342a7'",
            "ALTER TABLE garden_plants ADD COLUMN passport_minted_at DATETIME DEFAULT NULL"
        ];
        foreach ($gamifiedColumns as $colSql) {
            try {
                $pdo->exec($colSql);
            } catch (PDOException $e) {}
        }
    } catch (PDOException $e) {
        error_log("Failed to auto-create garden tables: " . $e->getMessage());
    }
}

// Xử lý GET: Lấy thông tin vườn và danh sách cây + nhật ký
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = trim($_GET['user_id'] ?? 'usr-local-me');
    $plantId = trim($_GET['plant_id'] ?? '');

    if (!$pdo) {
        echo json_encode([
            'success' => false,
            'database' => 'disconnected',
            'message' => 'Cơ sở dữ liệu đang ngoại tuyến, sử dụng bộ nhớ cục bộ'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        // 1. Lấy thông tin vườn của người dùng (nếu chưa có thì tự tạo vườn mặc định)
        $gardenStmt = $pdo->prepare("SELECT * FROM gardens WHERE user_id = :user_id LIMIT 1");
        $gardenStmt->execute([':user_id' => $userId]);
        $garden = $gardenStmt->fetch(PDO::FETCH_ASSOC);

        if (!$garden) {
            $defaultGardenId = 'gdn-' . substr(md5($userId), 0, 12);
            $createGardenStmt = $pdo->prepare("INSERT INTO gardens (id, user_id, user_name, garden_name, garden_type, city, description) 
                VALUES (:id, :user_id, :user_name, :garden_name, 'balcony', 'TP. Hồ Chí Minh', 'Khu vườn nhỏ phủ xanh ban công đô thị')");
            $createGardenStmt->execute([
                ':id' => $defaultGardenId,
                ':user_id' => $userId,
                ':user_name' => 'Chủ Vườn Phố',
                ':garden_name' => 'Vườn Ban Công Ban Mai'
            ]);
            $garden = [
                'id' => $defaultGardenId,
                'user_id' => $userId,
                'user_name' => 'Chủ Vườn Phố',
                'garden_name' => 'Vườn Ban Công Ban Mai',
                'garden_type' => 'balcony',
                'city' => 'TP. Hồ Chí Minh',
                'description' => 'Khu vườn nhỏ phủ xanh ban công đô thị'
            ];
        }

        // 2. Lấy danh sách các cây trong vườn và áp dụng Lazy Evaluation phân rã tự nhiên
        $plantsStmt = $pdo->prepare("SELECT * FROM garden_plants WHERE garden_id = :garden_id ORDER BY created_at DESC");
        $plantsStmt->execute([':garden_id' => $garden['id']]);
        $rawPlants = $plantsStmt->fetchAll(PDO::FETCH_ASSOC);
        $plants = [];
        $now = time();

        foreach ($rawPlants as $p) {
            $lastEvalTime = !empty($p['last_evaluated_at']) ? strtotime($p['last_evaluated_at']) : (!empty($p['created_at']) ? strtotime($p['created_at']) : $now);
            $diffHours = max(0, ($now - $lastEvalTime) / 3600);
            $diffDays = $diffHours / 24;

            $moisture = isset($p['moisture_level']) ? (int)$p['moisture_level'] : 80;
            $nutrients = isset($p['nutrient_level']) ? (int)$p['nutrient_level'] : 75;
            $sunlight = isset($p['sunlight_level']) ? (int)$p['sunlight_level'] : 80;
            $soil = isset($p['soil_level']) ? (int)$p['soil_level'] : 90;
            $exp = isset($p['growth_exp']) ? (int)$p['growth_exp'] : 0;
            $stage = isset($p['growth_stage']) ? (int)$p['growth_stage'] : 1;
            $waterInterval = !empty($p['watering_interval_days']) ? (int)$p['watering_interval_days'] : 2;
            $fertInterval = !empty($p['fertilizing_interval_days']) ? (int)$p['fertilizing_interval_days'] : 14;

            // Nếu trôi qua hơn 1 giờ (0.04 ngày), tính phân rã
            if ($diffDays >= 0.04) {
                $moisture = max(0, min(100, (int)round($moisture - ($diffDays * (100 / $waterInterval)))));
                $nutrients = max(0, min(100, (int)round($nutrients - ($diffDays * (100 / $fertInterval)))));
                $sunlight = max(0, min(100, (int)round($sunlight - ($diffDays * 35))));
                $soil = max(0, min(100, (int)round($soil - (($diffDays / 7) * 5))));

                // Tính sức khỏe
                $health = 100;
                if ($moisture < 20 || $nutrients < 20 || $sunlight < 20) {
                    $health = max(20, min(60, (int)round(($moisture + $nutrients + $sunlight) / 3)));
                }

                // Cộng EXP thụ động nếu trong vùng tối ưu
                if ($moisture >= 50 && $moisture <= 85 && $nutrients >= 50 && $nutrients <= 85 && $diffDays >= 0.5) {
                    $exp += (int)round($diffDays * 15);
                }

                // Cập nhật lại database
                try {
                    $updStmt = $pdo->prepare("UPDATE garden_plants SET 
                        moisture_level = :m, nutrient_level = :n, sunlight_level = :s, soil_level = :sl, 
                        health_score = :h, growth_exp = :e, last_evaluated_at = NOW() 
                        WHERE id = :id");
                    $updStmt->execute([
                        ':m' => $moisture,
                        ':n' => $nutrients,
                        ':s' => $sunlight,
                        ':sl' => $soil,
                        ':h' => $health,
                        ':e' => $exp,
                        ':id' => $p['id']
                    ]);
                } catch (PDOException $e) {}

                $p['moisture_level'] = $moisture;
                $p['nutrient_level'] = $nutrients;
                $p['sunlight_level'] = $sunlight;
                $p['soil_level'] = $soil;
                $p['health_score'] = $health;
                $p['growth_exp'] = $exp;
                $p['last_evaluated_at'] = date('Y-m-d H:i:s');
            } else {
                $p['moisture_level'] = $moisture;
                $p['nutrient_level'] = $nutrients;
                $p['sunlight_level'] = $sunlight;
                $p['soil_level'] = $soil;
                $p['health_score'] = isset($p['health_score']) ? (int)$p['health_score'] : 100;
                $p['growth_exp'] = $exp;
            }

            $p['growth_stage'] = $stage;
            $p['total_harvests'] = isset($p['total_harvests']) ? (int)$p['total_harvests'] : 0;
            $p['watering_interval_days'] = $waterInterval;
            $p['fertilizing_interval_days'] = $fertInterval;
            $plants[] = $p;
        }

        // 3. Lấy danh sách nhật ký hình ảnh
        if (!empty($plantId)) {
            $diaryStmt = $pdo->prepare("SELECT * FROM plant_diaries WHERE garden_plant_id = :plant_id AND status = 'visible' ORDER BY entry_date DESC, created_at DESC");
            $diaryStmt->execute([':plant_id' => $plantId]);
        } else {
            $diaryStmt = $pdo->prepare("SELECT d.* FROM plant_diaries d 
                JOIN garden_plants p ON d.garden_plant_id = p.id 
                WHERE p.garden_id = :garden_id AND d.status = 'visible' 
                ORDER BY d.entry_date DESC, d.created_at DESC LIMIT 50");
            $diaryStmt->execute([':garden_id' => $garden['id']]);
        }
        $diaries = $diaryStmt->fetchAll(PDO::FETCH_ASSOC);

        // 4. Lấy Túi đồ nghề người làm vườn (Inventory)
        $invStmt = $pdo->prepare("SELECT item_type, quantity FROM user_inventory WHERE user_id = :user_id");
        $invStmt->execute([':user_id' => $userId]);
        $rawInv = $invStmt->fetchAll(PDO::FETCH_KEY_PAIR);

        $defaultInventory = [
            'water' => 3,
            'fertilizer' => 2,
            'soil' => 1,
            'sunlight' => 2,
            'spray' => 1
        ];

        // Nếu người dùng chưa có túi đồ trong DB, khởi tạo mặc định
        if (empty($rawInv)) {
            foreach ($defaultInventory as $type => $qty) {
                try {
                    $initInvStmt = $pdo->prepare("INSERT INTO user_inventory (user_id, item_type, quantity) VALUES (:uid, :type, :qty) ON DUPLICATE KEY UPDATE quantity = quantity");
                    $initInvStmt->execute([':uid' => $userId, ':type' => $type, ':qty' => $qty]);
                } catch (PDOException $e) {}
            }
            $inventory = $defaultInventory;
        } else {
            $inventory = [
                'water' => (int)($rawInv['water'] ?? $defaultInventory['water']),
                'fertilizer' => (int)($rawInv['fertilizer'] ?? $defaultInventory['fertilizer']),
                'soil' => (int)($rawInv['soil'] ?? $defaultInventory['soil']),
                'sunlight' => (int)($rawInv['sunlight'] ?? $defaultInventory['sunlight']),
                'spray' => (int)($rawInv['spray'] ?? $defaultInventory['spray'])
            ];
        }

        // 5. Lấy tổng số dư Tim thực tế từ bảng user_events
        $totalHearts = 50; // Mặc định 50 tim ban đầu
        try {
            $sumStmt = $pdo->prepare("SELECT COALESCE(SUM(points), 0) as total FROM user_events WHERE user_id = :uid");
            $sumStmt->execute([':uid' => $userId]);
            $sumRow = $sumStmt->fetch(PDO::FETCH_ASSOC);
            if ($sumRow) {
                $totalHearts += (int)$sumRow['total'];
            }
        } catch (PDOException $e) {}

        echo json_encode([
            'success' => true,
            'garden' => $garden,
            'plants' => $plants,
            'diaries' => $diaries,
            'inventory' => $inventory,
            'total_hearts' => $totalHearts
        ], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Lỗi truy vấn vườn: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// Xử lý POST: Thêm cây mới hoặc thêm nhật ký
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!$pdo) {
        http_response_code(503);
        echo json_encode([
            'success' => false,
            'message' => 'Cơ sở dữ liệu đang bảo trì, vui lòng lưu trên máy'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true);
    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Dữ liệu JSON không hợp lệ'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $action = $_GET['action'] ?? $input['action'] ?? '';

    // Hành động 1: Cập nhật hồ sơ vườn
    if ($action === 'update_garden') {
        $gardenId = trim($input['id'] ?? '');
        $gardenName = trim($input['garden_name'] ?? '');
        $gardenType = in_array($input['garden_type'] ?? '', ['balcony', 'rooftop', 'backyard', 'indoor_window']) ? $input['garden_type'] : 'balcony';
        $city = trim($input['city'] ?? 'TP. Hồ Chí Minh');
        $desc = trim($input['description'] ?? '');

        if (empty($gardenId) || empty($gardenName)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Thiếu ID hoặc tên vườn'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            $stmt = $pdo->prepare("UPDATE gardens SET garden_name = :name, garden_type = :type, city = :city, description = :desc WHERE id = :id");
            $stmt->execute([
                ':name' => htmlspecialchars($gardenName, ENT_QUOTES, 'UTF-8'),
                ':type' => $gardenType,
                ':city' => htmlspecialchars($city, ENT_QUOTES, 'UTF-8'),
                ':desc' => htmlspecialchars($desc, ENT_QUOTES, 'UTF-8'),
                ':id' => $gardenId
            ]);

            echo json_encode(['success' => true, 'message' => 'Cập nhật vườn thành công'], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 2: Thêm cây mới vào vườn
    if ($action === 'add_plant') {
        $plantId = !empty($input['id']) ? trim($input['id']) : 'gp-' . uniqid();
        $gardenId = trim($input['garden_id'] ?? '');
        $userId = trim($input['user_id'] ?? '');
        $refPlantId = trim($input['plant_id'] ?? '');
        $customName = trim($input['custom_name'] ?? '');
        $speciesName = trim($input['species_name'] ?? '');
        $plantedDate = trim($input['planted_date'] ?? date('Y-m-d'));
        $potType = trim($input['pot_type'] ?? 'Chậu nhựa 35cm');
        $status = in_array($input['current_status'] ?? '', ['healthy', 'flowering', 'fruiting', 'recovering', 'dormant']) ? $input['current_status'] : 'healthy';
        $coverImageUrl = trim($input['cover_image_url'] ?? '');
        if (empty($coverImageUrl)) {
            $coverImageUrl = '/logo.jpg';
        }
        $notes = trim($input['notes'] ?? '');

        // Tự động tìm hoặc tạo vườn cho người dùng nếu có user_id
        if (!empty($userId)) {
            $userGardenStmt = $pdo->prepare("SELECT id FROM gardens WHERE user_id = :user_id LIMIT 1");
            $userGardenStmt->execute([':user_id' => $userId]);
            $ug = $userGardenStmt->fetch(PDO::FETCH_ASSOC);
            if ($ug) {
                $gardenId = $ug['id'];
            } else {
                $defaultGardenId = 'gdn-' . substr(md5($userId), 0, 12);
                $createGardenStmt = $pdo->prepare("INSERT INTO gardens (id, user_id, user_name, garden_name, garden_type, city, description) 
                    VALUES (:id, :user_id, :user_name, :garden_name, 'balcony', 'TP. Hồ Chí Minh', 'Khu vườn nhỏ phủ xanh ban công đô thị')");
                $createGardenStmt->execute([
                    ':id' => $defaultGardenId,
                    ':user_id' => $userId,
                    ':user_name' => 'Chủ Vườn Phố',
                    ':garden_name' => 'Vườn Của Tôi'
                ]);
                $gardenId = $defaultGardenId;
            }
        }

        $wateringInterval = intval($input['watering_interval_days'] ?? 2);
        if ($wateringInterval <= 0) $wateringInterval = 2;
        $fertilizingInterval = intval($input['fertilizing_interval_days'] ?? 14);
        if ($fertilizingInterval <= 0) $fertilizingInterval = 14;
        $lastWateredAt = !empty($input['last_watered_at']) ? trim($input['last_watered_at']) : $plantedDate;
        $lastFertilizedAt = !empty($input['last_fertilized_at']) ? trim($input['last_fertilized_at']) : $plantedDate;

        if (empty($gardenId) || empty($customName) || empty($coverImageUrl)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Vui lòng điền tên cây và cung cấp ảnh đại diện'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO garden_plants (
                id, garden_id, plant_id, custom_name, species_name,
                planted_date, pot_type, current_status, cover_image_url, notes,
                watering_interval_days, fertilizing_interval_days, last_watered_at, last_fertilized_at
            ) VALUES (
                :id, :garden_id, :plant_id, :custom_name, :species_name,
                :planted_date, :pot_type, :current_status, :cover_image_url, :notes,
                :watering_interval, :fertilizing_interval, :last_watered_at, :last_fertilized_at
            ) ON DUPLICATE KEY UPDATE
                custom_name = VALUES(custom_name),
                pot_type = VALUES(pot_type),
                current_status = VALUES(current_status),
                cover_image_url = VALUES(cover_image_url),
                notes = VALUES(notes),
                watering_interval_days = VALUES(watering_interval_days),
                fertilizing_interval_days = VALUES(fertilizing_interval_days),
                last_watered_at = VALUES(last_watered_at),
                last_fertilized_at = VALUES(last_fertilized_at)");

            $stmt->execute([
                ':id' => $plantId,
                ':garden_id' => $gardenId,
                ':plant_id' => !empty($refPlantId) ? $refPlantId : null,
                ':custom_name' => htmlspecialchars($customName, ENT_QUOTES, 'UTF-8'),
                ':species_name' => htmlspecialchars($speciesName, ENT_QUOTES, 'UTF-8'),
                ':planted_date' => $plantedDate,
                ':pot_type' => htmlspecialchars($potType, ENT_QUOTES, 'UTF-8'),
                ':current_status' => $status,
                ':cover_image_url' => filter_var($coverImageUrl, FILTER_SANITIZE_URL),
                ':notes' => htmlspecialchars($notes, ENT_QUOTES, 'UTF-8'),
                ':watering_interval' => $wateringInterval,
                ':fertilizing_interval' => $fertilizingInterval,
                ':last_watered_at' => $lastWateredAt,
                ':last_fertilized_at' => $lastFertilizedAt
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'Thêm cây vào vườn thành công',
                'data' => [
                    'id' => $plantId,
                    'garden_id' => $gardenId,
                    'plant_id' => $refPlantId ?: null,
                    'custom_name' => $customName,
                    'species_name' => $speciesName,
                    'planted_date' => $plantedDate,
                    'pot_type' => $potType,
                    'current_status' => $status,
                    'cover_image_url' => $coverImageUrl,
                    'notes' => $notes,
                    'watering_interval_days' => $wateringInterval,
                    'fertilizing_interval_days' => $fertilizingInterval,
                    'last_watered_at' => $lastWateredAt,
                    'last_fertilized_at' => $lastFertilizedAt,
                    'created_at' => date('Y-m-d H:i:s')
                ]
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 3: Thêm nhật ký ảnh mới (Photo Diary Entry)
    if ($action === 'add_diary') {
        $diaryId = !empty($input['id']) ? trim($input['id']) : 'dir-' . uniqid();
        $gardenPlantId = trim($input['garden_plant_id'] ?? '');
        $userId = trim($input['user_id'] ?? 'usr-local-me');
        $entryDate = trim($input['entry_date'] ?? date('Y-m-d'));
        $stage = trim($input['stage'] ?? 'Đang sinh trưởng');
        $note = trim($input['note'] ?? '');
        $imageUrl = trim($input['image_url'] ?? '');
        $imageSha256 = trim($input['image_sha256'] ?? '');

        if (empty($gardenPlantId) || empty($imageUrl) || empty($note)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Vui lòng cung cấp ảnh chụp và nội dung nhật ký'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            $stmt = $pdo->prepare("INSERT INTO plant_diaries (
                id, garden_plant_id, user_id, entry_date, stage,
                note, image_url, image_sha256, status
            ) VALUES (
                :id, :garden_plant_id, :user_id, :entry_date, :stage,
                :note, :image_url, :image_sha256, 'visible'
            )");

            $stmt->execute([
                ':id' => $diaryId,
                ':garden_plant_id' => $gardenPlantId,
                ':user_id' => $userId,
                ':entry_date' => $entryDate,
                ':stage' => htmlspecialchars($stage, ENT_QUOTES, 'UTF-8'),
                ':note' => htmlspecialchars($note, ENT_QUOTES, 'UTF-8'),
                ':image_url' => filter_var($imageUrl, FILTER_SANITIZE_URL),
                ':image_sha256' => !empty($imageSha256) ? substr($imageSha256, 0, 64) : null
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'Ghi nhật ký thành công',
                'data' => [
                    'id' => $diaryId,
                    'garden_plant_id' => $gardenPlantId,
                    'user_id' => $userId,
                    'entry_date' => $entryDate,
                    'stage' => $stage,
                    'note' => $note,
                    'image_url' => $imageUrl,
                    'image_sha256' => $imageSha256,
                    'created_at' => date('Y-m-d H:i:s')
                ]
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 4: Ghi nhận chăm sóc nhanh (Tưới nước, Bón phân)
    if ($action === 'care_action') {
        $plantId = trim($input['plant_id'] ?? '');
        $careType = trim($input['care_type'] ?? 'water');
        $date = trim($input['date'] ?? date('Y-m-d'));
        $note = trim($input['note'] ?? '');

        if (empty($plantId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Thiếu ID chậu cây'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            if ($careType === 'water') {
                $stmt = $pdo->prepare("UPDATE garden_plants SET last_watered_at = :date WHERE id = :id");
                $stmt->execute([':date' => $date, ':id' => $plantId]);
            } else if ($careType === 'fertilize') {
                $stmt = $pdo->prepare("UPDATE garden_plants SET last_fertilized_at = :date WHERE id = :id");
                $stmt->execute([':date' => $date, ':id' => $plantId]);
            }

            // Ghi nhật ký vắn tắt nếu có ghi chú
            if (!empty($note)) {
                $diaryId = 'dir-' . uniqid();
                $diaryStmt = $pdo->prepare("INSERT INTO plant_diaries (id, garden_plant_id, user_id, entry_date, stage, note, image_url, status)
                    VALUES (:id, :plant_id, :user_id, :date, :stage, :note, '', 'visible')");
                $diaryStmt->execute([
                    ':id' => $diaryId,
                    ':plant_id' => $plantId,
                    ':user_id' => $input['user_id'] ?? 'usr-local-me',
                    ':date' => $date,
                    ':stage' => $careType === 'water' ? 'Tưới nước định kỳ' : 'Bón phân hữu cơ',
                    ':note' => htmlspecialchars($note, ENT_QUOTES, 'UTF-8')
                ]);
            }

            echo json_encode([
                'success' => true,
                'message' => 'Ghi nhận chăm sóc cây thành công',
                'care_type' => $careType,
                'date' => $date
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 5: Xóa chậu cây khỏi vườn
    if ($action === 'delete_plant') {
        $plantId = trim($input['plant_id'] ?? '');
        if (empty($plantId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Thiếu ID cây cần xóa'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM garden_plants WHERE id = :id");
            $stmt->execute([':id' => $plantId]);

            $dStmt = $pdo->prepare("DELETE FROM plant_diaries WHERE garden_plant_id = :id");
            $dStmt->execute([':id' => $plantId]);

            echo json_encode(['success' => true, 'message' => 'Đã xóa chậu cây khỏi vườn'], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 6: Xóa một mốc nhật ký ảnh
    if ($action === 'delete_diary') {
        $diaryId = trim($input['diary_id'] ?? '');
        if (empty($diaryId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Thiếu ID nhật ký'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM plant_diaries WHERE id = :id");
            $stmt->execute([':id' => $diaryId]);

            echo json_encode(['success' => true, 'message' => 'Đã xóa mốc nhật ký'], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // =========================================================================
    // HỆ THỐNG GAME HÓA LÀM VƯỜN ĐÔ THỊ & WEB3 TESTNET THẬT (MIGRATION 007)
    // =========================================================================

    // Hành động 7: Đổi Tim lấy vật phẩm sinh thái (Eco-Supply Shop)
    if ($action === 'buy_item') {
        $userId = trim($input['user_id'] ?? 'usr-local-me');
        $itemType = trim($input['item_type'] ?? '');
        $quantity = max(1, (int)($input['quantity'] ?? 1));

        $itemPrices = [
            'water' => 10,
            'fertilizer' => 20,
            'soil' => 30,
            'sunlight' => 15,
            'spray' => 25
        ];

        if (!isset($itemPrices[$itemType])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Loại vật phẩm không hợp lệ'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        $totalCost = $itemPrices[$itemType] * $quantity;

        try {
            // Kiểm tra số dư Tim trên server
            $sumStmt = $pdo->prepare("SELECT COALESCE(SUM(points), 0) + 50 as total FROM user_events WHERE user_id = :uid");
            $sumStmt->execute([':uid' => $userId]);
            $sumRow = $sumStmt->fetch(PDO::FETCH_ASSOC);
            $currentHearts = $sumRow ? (int)$sumRow['total'] : 50;

            if ($currentHearts < $totalCost) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'error' => "Không đủ Tim! Bạn cần {$totalCost} Tim nhưng chỉ có {$currentHearts} Tim.",
                    'current_hearts' => $currentHearts,
                    'required_hearts' => $totalCost
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // Ghi nhận sự kiện trừ điểm Tim
            $evStmt = $pdo->prepare("INSERT INTO user_events (user_id, event_type, points, reference_id, metadata_json) 
                VALUES (:uid, 'spend_heart_shop', :pts, :ref, :meta)");
            $evStmt->execute([
                ':uid' => $userId,
                ':pts' => -$totalCost,
                ':ref' => $itemType,
                ':meta' => json_encode(['quantity' => $quantity, 'item_type' => $itemType], JSON_UNESCAPED_UNICODE)
            ]);

            // Cộng vật phẩm vào túi đồ
            $invStmt = $pdo->prepare("INSERT INTO user_inventory (user_id, item_type, quantity) 
                VALUES (:uid, :type, :qty) 
                ON DUPLICATE KEY UPDATE quantity = quantity + :qty");
            $invStmt->execute([
                ':uid' => $userId,
                ':type' => $itemType,
                ':qty' => $quantity
            ]);

            // Lấy số lượng mới
            $getQtyStmt = $pdo->prepare("SELECT quantity FROM user_inventory WHERE user_id = :uid AND item_type = :type");
            $getQtyStmt->execute([':uid' => $userId, ':type' => $itemType]);
            $newQty = (int)$getQtyStmt->fetchColumn();

            echo json_encode([
                'success' => true,
                'message' => "Đổi thành công {$quantity}x vật phẩm!",
                'item_type' => $itemType,
                'new_quantity' => $newQty,
                'new_hearts' => $currentHearts - $totalCost
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 8: Chăm sóc cây tương tác (Tưới nước, Bón phân, Tắm nắng, Xới đất, Xịt thảo mộc)
    if ($action === 'care_gamified') {
        $userId = trim($input['user_id'] ?? 'usr-local-me');
        $plantId = trim($input['plant_id'] ?? '');
        $careAction = trim($input['care_action'] ?? 'water');

        $allowedActions = ['water', 'fertilizer', 'soil', 'sunlight', 'spray'];
        if (empty($plantId) || !in_array($careAction, $allowedActions)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Dữ liệu chăm sóc không hợp lệ'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            // 1. Kiểm tra quyền sở hữu chậu cây
            $plantStmt = $pdo->prepare("SELECT gp.* FROM garden_plants gp 
                JOIN gardens g ON gp.garden_id = g.id 
                WHERE gp.id = :pid AND g.user_id = :uid LIMIT 1");
            $plantStmt->execute([':pid' => $plantId, ':uid' => $userId]);
            $plant = $plantStmt->fetch(PDO::FETCH_ASSOC);

            if (!$plant) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Không tìm thấy chậu cây hoặc bạn không có quyền chăm sóc'], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // 2. Kiểm tra vật phẩm trong túi đồ
            $checkInvStmt = $pdo->prepare("SELECT quantity FROM user_inventory WHERE user_id = :uid AND item_type = :type");
            $checkInvStmt->execute([':uid' => $userId, ':type' => $careAction]);
            $currentStock = (int)$checkInvStmt->fetchColumn();

            if ($currentStock < 1) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Túi đồ đã hết vật phẩm này! Hãy đổi thêm tại Cửa Hàng Sinh Thái.'], JSON_UNESCAPED_UNICODE);
                exit;
            }

            $moisture = (int)($plant['moisture_level'] ?? 80);
            $nutrients = (int)($plant['nutrient_level'] ?? 75);
            $sunlight = (int)($plant['sunlight_level'] ?? 80);
            $soil = (int)($plant['soil_level'] ?? 90);
            $health = (int)($plant['health_score'] ?? 100);
            $oldExp = (int)($plant['growth_exp'] ?? 0);
            $oldStage = (int)($plant['growth_stage'] ?? 1);

            // 3. Kiểm tra an toàn sinh học (Chống úng rễ, xót phân)
            if ($careAction === 'water' && $moisture >= 90) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Đất chậu đang rất ẩm (≥90%). Tưới thêm lúc này dễ gây úng và thối rễ!'], JSON_UNESCAPED_UNICODE);
                exit;
            }
            if ($careAction === 'fertilizer' && $nutrients >= 85) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Dinh dưỡng trong đất đang bão hòa (≥85%). Bón thêm lúc này có thể gây xót rễ!'], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // 4. Trừ 1 vật phẩm trong túi đồ
            $decInvStmt = $pdo->prepare("UPDATE user_inventory SET quantity = quantity - 1 WHERE user_id = :uid AND item_type = :type");
            $decInvStmt->execute([':uid' => $userId, ':type' => $careAction]);

            // 5. Tính toán chỉ số mới và EXP
            $expBoost = 30;
            switch ($careAction) {
                case 'water':
                    $moisture = min(100, $moisture + 35);
                    $expBoost = 30;
                    break;
                case 'fertilizer':
                    $nutrients = min(100, $nutrients + 40);
                    $expBoost = 50;
                    break;
                case 'soil':
                    $soil = min(100, $soil + 50);
                    $expBoost = 40;
                    break;
                case 'sunlight':
                    $sunlight = min(100, $sunlight + 50);
                    $expBoost = 25;
                    break;
                case 'spray':
                    $health = 100;
                    $expBoost = 35;
                    break;
            }

            // Thưởng 1.25x EXP nếu nằm trong Vùng Sinh Thái Tối Ưu
            if ($moisture >= 60 && $moisture <= 85 && $nutrients >= 55 && $nutrients <= 80) {
                $expBoost = (int)round($expBoost * 1.25);
            }

            $newExp = $oldExp + $expBoost;

            // Tính toán ngưỡng thăng cấp (Mặc định chuẩn 1100 EXP)
            $newStage = $oldStage;
            $thresholds = [1 => 110, 2 => 330, 3 => 660, 4 => 880, 5 => 1100];
            foreach ($thresholds as $stg => $reqExp) {
                if ($newExp >= $reqExp) {
                    $newStage = max($newStage, $stg);
                }
            }

            $isLevelUp = ($newStage > $oldStage);

            // Cập nhật trạng thái
            $status = $plant['current_status'];
            if ($careAction === 'spray') {
                $status = 'healthy';
            } else if ($newStage >= 5) {
                $status = 'fruiting';
            } else if ($newStage >= 4) {
                $status = 'flowering';
            }

            $today = date('Y-m-d');
            $updPlantStmt = $pdo->prepare("UPDATE garden_plants SET 
                moisture_level = :m, nutrient_level = :n, sunlight_level = :s, soil_level = :sl,
                health_score = :h, growth_exp = :e, growth_stage = :stg, current_status = :st,
                last_watered_at = CASE WHEN :act = 'water' THEN :today ELSE last_watered_at END,
                last_fertilized_at = CASE WHEN :act = 'fertilizer' THEN :today ELSE last_fertilized_at END,
                last_evaluated_at = NOW()
                WHERE id = :id");
            $updPlantStmt->execute([
                ':m' => $moisture,
                ':n' => $nutrients,
                ':s' => $sunlight,
                ':sl' => $soil,
                ':h' => $health,
                ':e' => $newExp,
                ':stg' => $newStage,
                ':st' => $status,
                ':act' => $careAction,
                ':today' => $today,
                ':id' => $plantId
            ]);

            // Nếu thăng cấp, tự động ghi nhật ký mốc thành tựu
            if ($isLevelUp) {
                $diaryId = 'dir-lvl-' . uniqid();
                $stageNames = [
                    1 => 'Nhú mầm 🌱',
                    2 => 'Cây non bén rễ 🌿',
                    3 => 'Sinh trưởng thân lá sum suê 🌳',
                    4 => 'Đơm nụ & trổ hoa thơm 🌸',
                    5 => 'Kết trái & trưởng thành viên mãn 🍎'
                ];
                $stgName = $stageNames[$newStage] ?? "Cấp {$newStage}";
                $autoDiaryStmt = $pdo->prepare("INSERT INTO plant_diaries (id, garden_plant_id, user_id, entry_date, stage, note, image_url, status)
                    VALUES (:id, :plant_id, :user_id, :today, :stage, :note, :img, 'visible')");
                $autoDiaryStmt->execute([
                    ':id' => $diaryId,
                    ':plant_id' => $plantId,
                    ':user_id' => $userId,
                    ':today' => $today,
                    ':stage' => "Mốc thăng cấp: {$stgName}",
                    ':note' => "Bé cây \"{$plant['custom_name']}\" đã lớn bổng và chính thức bước vào {$stgName}! Tiếp tục chăm sóc để sớm thu hoạch trái ngọt nhé!",
                    ':img' => $plant['cover_image_url']
                ]);
            }

            echo json_encode([
                'success' => true,
                'message' => $isLevelUp ? "🎉 Chúc mừng! Cây đã thăng lên Cấp {$newStage}!" : "Chăm sóc thành công (+{$expBoost} EXP)!",
                'exp_gained' => $expBoost,
                'level_up' => $isLevelUp,
                'old_stage' => $oldStage,
                'new_stage' => $newStage,
                'plant' => [
                    'id' => $plantId,
                    'moisture_level' => $moisture,
                    'nutrient_level' => $nutrients,
                    'sunlight_level' => $sunlight,
                    'soil_level' => $soil,
                    'health_score' => $health,
                    'growth_exp' => $newExp,
                    'growth_stage' => $newStage,
                    'current_status' => $status
                ]
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 9: Chăm sóc toàn vườn 1-Click (Tưới nước hoặc Tắm nắng hàng loạt)
    if ($action === 'batch_care') {
        $userId = trim($input['user_id'] ?? 'usr-local-me');
        $actionType = in_array($input['action_type'] ?? '', ['water', 'sunlight']) ? $input['action_type'] : 'water';

        try {
            // Lấy vườn của user
            $gStmt = $pdo->prepare("SELECT id FROM gardens WHERE user_id = :uid LIMIT 1");
            $gStmt->execute([':uid' => $userId]);
            $gardenId = $gStmt->fetchColumn();

            if (!$gardenId) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Không tìm thấy vườn'], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // Lấy danh sách cây cần chăm sóc
            $cond = $actionType === 'water' ? "moisture_level < 75" : "sunlight_level < 75";
            $pStmt = $pdo->prepare("SELECT id, custom_name, moisture_level, sunlight_level FROM garden_plants WHERE garden_id = :gid AND {$cond}");
            $pStmt->execute([':gid' => $gardenId]);
            $needyPlants = $pStmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($needyPlants)) {
                echo json_encode(['success' => true, 'message' => 'Toàn bộ cây trong vườn đều đang đủ điều kiện, chưa cần chăm sóc!', 'cared_count' => 0], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // Kiểm tra số lượng trong túi đồ
            $invStmt = $pdo->prepare("SELECT quantity FROM user_inventory WHERE user_id = :uid AND item_type = :type");
            $invStmt->execute([':uid' => $userId, ':type' => $actionType]);
            $stock = (int)$invStmt->fetchColumn();

            $plantsToCare = array_slice($needyPlants, 0, $stock);
            $caredCount = count($plantsToCare);

            if ($caredCount === 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Túi đồ không còn đủ vật phẩm! Cần ít nhất 1 ' . ($actionType === 'water' ? 'Bình Nước' : 'Lượt Nắng')], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // Trừ số lượng vật phẩm
            $updInv = $pdo->prepare("UPDATE user_inventory SET quantity = quantity - :cnt WHERE user_id = :uid AND item_type = :type");
            $updInv->execute([':cnt' => $caredCount, ':uid' => $userId, ':type' => $actionType]);

            // Cập nhật cho từng cây
            $ids = array_column($plantsToCare, 'id');
            $inClause = implode(',', array_fill(0, count($ids), '?'));
            if ($actionType === 'water') {
                $bulkStmt = $pdo->prepare("UPDATE garden_plants SET moisture_level = LEAST(90, moisture_level + 35), growth_exp = growth_exp + 30, last_watered_at = CURDATE(), last_evaluated_at = NOW() WHERE id IN ($inClause)");
            } else {
                $bulkStmt = $pdo->prepare("UPDATE garden_plants SET sunlight_level = LEAST(95, sunlight_level + 45), growth_exp = growth_exp + 25, last_evaluated_at = NOW() WHERE id IN ($inClause)");
            }
            $bulkStmt->execute($ids);

            echo json_encode([
                'success' => true,
                'message' => "Đã chăm sóc nhanh thành công {$caredCount} chậu cây!",
                'cared_count' => $caredCount,
                'remaining_stock' => $stock - $caredCount
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 10: Yêu cầu Voucher đúc NFT On-Chain Thật (EIP-712 Pre-Check)
    if ($action === 'request_mint_voucher') {
        $userId = trim($input['user_id'] ?? 'usr-local-me');
        $plantId = trim($input['plant_id'] ?? '');
        $recipient = trim($input['recipient_address'] ?? '');

        if (empty($plantId) || empty($recipient) || !preg_match('/^0x[a-fA-F0-9]{40}$/', $recipient)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Địa chỉ ví Web3 nhận NFT không hợp lệ'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            // Kiểm tra chậu cây
            $stmt = $pdo->prepare("SELECT * FROM garden_plants WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => $plantId]);
            $plant = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$plant) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Không tìm thấy chậu cây'], JSON_UNESCAPED_UNICODE);
                exit;
            }

            if (!empty($plant['passport_token_id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Chậu cây này đã được đúc Hộ Chiếu NFT On-Chain!'], JSON_UNESCAPED_UNICODE);
                exit;
            }

            $exp = (int)($plant['growth_exp'] ?? 0);
            $stage = (int)($plant['growth_stage'] ?? 1);

            if ($stage < 5 || $exp < 1100) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'error' => "Chưa đủ điều kiện đúc NFT! Cây phải đạt Giai đoạn 5 và có ít nhất 1.100 EXP (Hiện có: {$exp} EXP, Cấp {$stage}/5)."
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // Kiểm tra có tối thiểu 3 bài nhật ký ảnh
            $diaryCountStmt = $pdo->prepare("SELECT COUNT(*) FROM plant_diaries WHERE garden_plant_id = :pid AND status = 'visible' AND image_sha256 IS NOT NULL AND image_sha256 != ''");
            $diaryCountStmt->execute([':pid' => $plantId]);
            $diaryCount = (int)$diaryCountStmt->fetchColumn();

            if ($diaryCount < 3) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'error' => "Cần có ít nhất 3 ảnh nhật ký mốc sinh trưởng có mã băm SHA-256 sạch (Hiện có: {$diaryCount}/3)."
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // Lấy mã băm ảnh mới nhất
            $lastImgStmt = $pdo->prepare("SELECT image_sha256, image_url FROM plant_diaries WHERE garden_plant_id = :pid AND image_sha256 IS NOT NULL ORDER BY entry_date DESC LIMIT 1");
            $lastImgStmt->execute([':pid' => $plantId]);
            $lastImg = $lastImgStmt->fetch(PDO::FETCH_ASSOC);
            $sha256Proof = $lastImg['image_sha256'] ?? hash('sha256', $plant['cover_image_url']);

            $nonce = 'voc-' . bin2hex(random_bytes(16));
            $deadline = time() + 900; // Có hiệu lực 15 phút

            // Lưu voucher vào bảng nft_mint_vouchers
            $vStmt = $pdo->prepare("INSERT INTO nft_mint_vouchers (nonce, user_id, garden_plant_id, recipient_address, expires_at)
                VALUES (:nonce, :uid, :pid, :rec, FROM_UNIXTIME(:dl))");
            $vStmt->execute([
                ':nonce' => $nonce,
                ':uid' => $userId,
                ':pid' => $plantId,
                ':rec' => $recipient,
                ':dl' => $deadline
            ]);

            // Trả về voucher
            echo json_encode([
                'success' => true,
                'message' => 'Xác thực điều kiện đúc NFT thành công!',
                'voucher' => [
                    'recipient' => $recipient,
                    'plantRecordId' => $plantId,
                    'plantName' => $plant['custom_name'],
                    'scientificName' => $plant['species_name'] ?? 'Solanum lycopersicum',
                    'stage' => 5,
                    'sha256Proof' => $sha256Proof,
                    'tokenURI' => "https://yeutrongcay.com/api/passports.php?action=token_uri&id=" . urlencode($plantId),
                    'nonce' => $nonce,
                    'deadline' => $deadline,
                    'contract_address' => '0x5994cd371311fb1ddc1a3354b6979acd3cd342a7',
                    'network' => 'Ethereum Sepolia',
                    'chain_id' => 11155111
                ]
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 11: Xác nhận kết quả đúc NFT on-chain thành công
    if ($action === 'confirm_nft_mint') {
        $userId = trim($input['user_id'] ?? 'usr-local-me');
        $plantId = trim($input['plant_id'] ?? '');
        $txHash = trim($input['tx_hash'] ?? '');
        $tokenId = trim($input['token_id'] ?? '');

        if (empty($plantId) || empty($txHash) || empty($tokenId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Thiếu mã băm giao dịch hoặc Token ID'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            // Chống trục lợi: Kiểm tra xem cây đã đúc NFT trước đó chưa
            $chkPlant = $pdo->prepare("SELECT passport_token_id FROM garden_plants WHERE id = :pid LIMIT 1");
            $chkPlant->execute([':pid' => $plantId]);
            $existPlant = $chkPlant->fetch(PDO::FETCH_ASSOC);
            if (!empty($existPlant['passport_token_id'])) {
                echo json_encode([
                    'success' => true,
                    'message' => "Hộ chiếu NFT #{$existPlant['passport_token_id']} đã được xác nhận trước đó.",
                    'token_id' => $existPlant['passport_token_id'],
                    'tx_hash' => $txHash,
                    'already_confirmed' => true
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            $stmt = $pdo->prepare("UPDATE garden_plants SET 
                passport_token_id = :tid,
                passport_tx_hash = :tx,
                passport_network = 'Ethereum Sepolia',
                passport_contract_addr = '0x5994cd371311fb1ddc1a3354b6979acd3cd342a7',
                passport_minted_at = NOW()
                WHERE id = :pid");
            $stmt->execute([
                ':tid' => $tokenId,
                ':tx' => $txHash,
                ':pid' => $plantId
            ]);

            // Thưởng lớn +100 Tim vào user_events vì đã đúc thành công NFT on-chain
            $evStmt = $pdo->prepare("INSERT INTO user_events (user_id, event_type, points, reference_id, metadata_json)
                VALUES (:uid, 'share_seed', 100, :pid, :meta)");
            $evStmt->execute([
                ':uid' => $userId,
                ':pid' => $plantId,
                ':meta' => json_encode(['tx_hash' => $txHash, 'token_id' => $tokenId], JSON_UNESCAPED_UNICODE)
            ]);

            echo json_encode([
                'success' => true,
                'message' => "🎉 Chúc mừng bạn đã đúc thành công Hộ Chiếu NFT On-Chain #{$tokenId} trên Ethereum Sepolia!",
                'token_id' => $tokenId,
                'tx_hash' => $txHash,
                'explorer_url' => "https://sepolia.etherscan.io/tx/{$txHash}"
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 12: Thu hoạch vụ mùa (Harvest Crop)
    if ($action === 'harvest_crop') {
        $userId = trim($input['user_id'] ?? 'usr-local-me');
        $plantId = trim($input['plant_id'] ?? '');

        if (empty($plantId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Thiếu ID chậu cây'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            $stmt = $pdo->prepare("SELECT * FROM garden_plants WHERE id = :id LIMIT 1");
            $stmt->execute([':id' => $plantId]);
            $plant = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$plant) {
                http_response_code(404);
                echo json_encode(['success' => false, 'error' => 'Không tìm thấy chậu cây'], JSON_UNESCAPED_UNICODE);
                exit;
            }

            $stage = (int)($plant['growth_stage'] ?? 1);
            if ($stage < 5) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Cây chưa đạt độ chín muồi (Giai đoạn 5) để thu hoạch!'], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // Thưởng lớn +120 Tim vào user_events
            $rewardHearts = 120;
            $evStmt = $pdo->prepare("INSERT INTO user_events (user_id, event_type, points, reference_id, metadata_json)
                VALUES (:uid, 'share_seed', :pts, :pid, :meta)");
            $evStmt->execute([
                ':uid' => $userId,
                ':pts' => $rewardHearts,
                ':pid' => $plantId,
                ':meta' => json_encode(['harvest_date' => date('Y-m-d')], JSON_UNESCAPED_UNICODE)
            ]);

            // Ghi nhật ký thu hoạch
            $logStmt = $pdo->prepare("INSERT INTO garden_harvest_logs (id, garden_plant_id, user_id, harvest_date, reward_hearts, notes)
                VALUES (:id, :pid, :uid, CURDATE(), :pts, 'Thu hoạch thành quả ngọt ngào')");
            $logStmt->execute([
                ':id' => 'hrv-' . uniqid(),
                ':pid' => $plantId,
                ':uid' => $userId,
                ':pts' => $rewardHearts
            ]);

            // Tặng 1 Túi Phân Hữu Cơ vào túi đồ
            $bonusInv = $pdo->prepare("INSERT INTO user_inventory (user_id, item_type, quantity)
                VALUES (:uid, 'fertilizer', 1) ON DUPLICATE KEY UPDATE quantity = quantity + 1");
            $bonusInv->execute([':uid' => $userId]);

            // Cập nhật chậu cây: Tăng total_harvests, reset EXP về Giai đoạn 3 tương thích theo loài
            $cName = mb_strtolower($plant['custom_name'] ?? '');
            $targetExp = 1100;
            if (strpos($cName, 'cải') !== false || strpos($cName, 'xà lách') !== false || strpos($cName, 'húng') !== false) {
                $targetExp = 350;
            } else if (strpos($cName, 'ớt') !== false) {
                $targetExp = 900;
            } else if (strpos($cName, 'dâu') !== false) {
                $targetExp = 1400;
            }
            $resetExp = (int)round($targetExp * 0.45);

            $updPlant = $pdo->prepare("UPDATE garden_plants SET 
                total_harvests = total_harvests + 1,
                growth_stage = 3,
                growth_exp = :rexp,
                current_status = 'healthy'
                WHERE id = :id");
            $updPlant->execute([
                ':rexp' => $resetExp,
                ':id' => $plantId
            ]);

            echo json_encode([
                'success' => true,
                'message' => "🧺 Thu hoạch thành công! Bạn nhận được +{$rewardHearts} Tim và 1 Túi Phân Hữu Cơ thưởng!",
                'reward_hearts' => $rewardHearts,
                'total_harvests' => ((int)$plant['total_harvests']) + 1
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 12.1: Nhận Giọt Sương Sớm Mai (+15 Tim) - Chống trục lợi: Chỉ nhận 1 lần / ngày
    if ($action === 'claim_daily_dew') {
        $userId = trim($input['user_id'] ?? 'usr-local-me');
        try {
            $checkStmt = $pdo->prepare("SELECT id FROM user_events 
                WHERE user_id = :uid AND event_type = 'daily_dew' AND DATE(created_at) = CURRENT_DATE() LIMIT 1");
            $checkStmt->execute([':uid' => $userId]);
            if ($checkStmt->fetch()) {
                http_response_code(400);
                echo json_encode([
                    'success' => false, 
                    'error' => 'Hôm nay bạn đã nhận sương mai rồi! Hãy quay lại vào sáng mai nhé.',
                    'already_claimed' => true
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // Ghi nhận sự kiện nhận sương +15 Tim
            $evStmt = $pdo->prepare("INSERT INTO user_events (user_id, event_type, points, reference_id, metadata_json)
                VALUES (:uid, 'daily_dew', 15, :today, :meta)");
            $evStmt->execute([
                ':uid' => $userId,
                ':today' => date('Y-m-d'),
                ':meta' => json_encode(['action' => 'morning_dew_checkin'], JSON_UNESCAPED_UNICODE)
            ]);

            // Tính lại tổng số dư Tim
            $sumStmt = $pdo->prepare("SELECT COALESCE(SUM(points), 0) + 50 as total FROM user_events WHERE user_id = :uid");
            $sumStmt->execute([':uid' => $userId]);
            $newHearts = (int)($sumStmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 65);

            echo json_encode([
                'success' => true,
                'message' => 'Đã nhận giọt sương mai: +15 Tim! 💧',
                'points_added' => 15,
                'total_hearts' => $newHearts
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 12.2: Nhận Thưởng Nhiệm Vụ Nông Vụ (+5 Tim) - Chống trục lợi: Khóa vĩnh viễn theo task_key
    if ($action === 'claim_seasonal_task') {
        $userId = trim($input['user_id'] ?? 'usr-local-me');
        $taskKey = trim($input['task_key'] ?? '');

        if (empty($taskKey)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Thiếu mã khóa nhiệm vụ nông vụ'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            // Kiểm tra xem task_key này đã từng được nhận thưởng trước đó chưa
            $checkStmt = $pdo->prepare("SELECT id FROM user_events 
                WHERE user_id = :uid AND event_type = 'seasonal_task' AND reference_id = :key LIMIT 1");
            $checkStmt->execute([':uid' => $userId, ':key' => $taskKey]);
            if ($checkStmt->fetch()) {
                // Đã nhận rồi -> trả về thông báo đã claim, KHÔNG cộng thêm tim
                echo json_encode([
                    'success' => true,
                    'already_claimed' => true,
                    'points_added' => 0,
                    'message' => 'Nhiệm vụ này đã nhận thưởng trước đó rồi!'
                ], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // Ghi nhận thưởng +5 Tim duy nhất 1 lần
            $evStmt = $pdo->prepare("INSERT INTO user_events (user_id, event_type, points, reference_id, metadata_json)
                VALUES (:uid, 'seasonal_task', 5, :key, :meta)");
            $evStmt->execute([
                ':uid' => $userId,
                ':key' => $taskKey,
                ':meta' => json_encode(['task_key' => $taskKey, 'claimed_at' => date('Y-m-d H:i:s')], JSON_UNESCAPED_UNICODE)
            ]);

            // Tính lại tổng số dư Tim
            $sumStmt = $pdo->prepare("SELECT COALESCE(SUM(points), 0) + 50 as total FROM user_events WHERE user_id = :uid");
            $sumStmt->execute([':uid' => $userId]);
            $newHearts = (int)($sumStmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 55);

            echo json_encode([
                'success' => true,
                'already_claimed' => false,
                'points_added' => 5,
                'total_hearts' => $newHearts,
                'message' => 'Đã hoàn thành nông vụ: +5 Trái Tim ❤️'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    // Hành động 13: Đồng bộ dữ liệu Khách khi Đăng Nhập (Three-Way Merge)
    if ($action === 'sync_guest_data') {
        $userId = trim($input['user_id'] ?? '');
        $localInv = $input['local_inventory'] ?? [];
        $localPlants = $input['local_plants'] ?? [];

        if (empty($userId)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Thiếu User ID đăng nhập'], JSON_UNESCAPED_UNICODE);
            exit;
        }

        try {
            // Merge kho đồ: cộng dồn số lượng local vào DB
            if (is_array($localInv)) {
                foreach ($localInv as $type => $qty) {
                    $qty = max(0, (int)$qty);
                    if ($qty > 0 && in_array($type, ['water', 'fertilizer', 'soil', 'sunlight', 'spray'])) {
                        $mStmt = $pdo->prepare("INSERT INTO user_inventory (user_id, item_type, quantity)
                            VALUES (:uid, :type, :qty) ON DUPLICATE KEY UPDATE quantity = quantity + :qty");
                        $mStmt->execute([':uid' => $userId, ':type' => $type, ':qty' => $qty]);
                    }
                }
            }

            echo json_encode([
                'success' => true,
                'message' => 'Đồng bộ dữ liệu khách lên tài khoản thành công!'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Hành động không xác định'], JSON_UNESCAPED_UNICODE);
    exit;
}
