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

        // 2. Lấy danh sách các cây trong vườn
        $plantsStmt = $pdo->prepare("SELECT * FROM garden_plants WHERE garden_id = :garden_id ORDER BY created_at DESC");
        $plantsStmt->execute([':garden_id' => $garden['id']]);
        $plants = $plantsStmt->fetchAll(PDO::FETCH_ASSOC);

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

        echo json_encode([
            'success' => true,
            'garden' => $garden,
            'plants' => $plants,
            'diaries' => $diaries
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

    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Hành động không xác định'], JSON_UNESCAPED_UNICODE);
    exit;
}
