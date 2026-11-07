<?php
/**
 * API SỔ CÁI HỘ CHIẾU NFT ĐỘC BẢN & HỒ SƠ CÔNG KHAI - YEUTRONGECAY.COM
 * Cho phép đồng bộ công khai 100% danh sách NFT và Hồ sơ cá nhân cho mọi khách truy cập
 * (Kể cả khi khách chưa đăng nhập Firebase Auth / mở trình duyệt ẩn danh)
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

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
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
$pdo = getDbConnection();

// File lưu trữ dự phòng tại thư mục uploads (nếu MySQL chưa cấu hình)
$storeDir = dirname(__DIR__) . '/uploads';
if (!is_dir($storeDir)) {
    @mkdir($storeDir, 0755, true);
}
$storeFile = $storeDir . '/nft_registry_store.json';

function readJsonStore($file) {
    if (!file_exists($file)) {
        return ['passports' => [], 'profiles' => []];
    }
    $raw = @file_get_contents($file);
    $data = $raw ? json_decode($raw, true) : null;
    if (!is_array($data)) {
        return ['passports' => [], 'profiles' => []];
    }
    return [
        'passports' => isset($data['passports']) && is_array($data['passports']) ? $data['passports'] : [],
        'profiles'  => isset($data['profiles']) && is_array($data['profiles']) ? $data['profiles'] : []
    ];
}

function writeJsonStore($file, $data) {
    @file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

// Tự động khởi tạo bảng MySQL nếu có kết nối DB
if ($pdo) {
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS ytc_nft_passports (
                unique_key VARCHAR(160) PRIMARY KEY,
                token_id VARCHAR(64) NOT NULL,
                plant_key VARCHAR(190) NOT NULL,
                creator_username VARCHAR(100) DEFAULT 'tranthanhtung37',
                owner_address VARCHAR(100) NOT NULL,
                payload_json LONGTEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS ytc_public_profiles (
                original_handle VARCHAR(100) PRIMARY KEY,
                custom_handle VARCHAR(100) NOT NULL,
                payload_json LONGTEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
    } catch (PDOException $e) {
        error_log('Init NFT tables error: ' . $e->getMessage());
    }
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $store = readJsonStore($storeFile);
    $passportsMap = [];
    $profilesMap = $store['profiles'];

    foreach ($store['passports'] as $p) {
        if (isset($p['contract_address'], $p['token_id'])) {
            $uKey = strtolower($p['contract_address']) . '_' . $p['token_id'];
            $passportsMap[$uKey] = $p;
        }
    }

    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT unique_key, payload_json FROM ytc_nft_passports ORDER BY updated_at DESC");
            while ($row = $stmt->fetch()) {
                $decoded = json_decode($row['payload_json'], true);
                if (is_array($decoded)) {
                    $passportsMap[$row['unique_key']] = $decoded;
                }
            }

            $pStmt = $pdo->query("SELECT original_handle, payload_json FROM ytc_public_profiles");
            while ($pRow = $pStmt->fetch()) {
                $decoded = json_decode($pRow['payload_json'], true);
                if (is_array($decoded)) {
                    $profilesMap[strtolower($pRow['original_handle'])] = $decoded;
                }
            }
        } catch (PDOException $e) {
            error_log('GET NFT passports error: ' . $e->getMessage());
        }
    }

    echo json_encode([
        'success'   => true,
        'passports' => array_values($passportsMap),
        'profiles'  => $profilesMap
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($method === 'POST') {
    $rawBody = file_get_contents('php://input');
    $body = json_decode($rawBody, true);
    if (!is_array($body)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON body']);
        exit;
    }

    $action = $body['action'] ?? '';
    $store = readJsonStore($storeFile);

    if ($action === 'save_passport' || $action === 'sync_passports') {
        $incoming = [];
        if ($action === 'save_passport' && isset($body['passport']) && is_array($body['passport'])) {
            $incoming[] = $body['passport'];
        } elseif ($action === 'sync_passports' && isset($body['passports']) && is_array($body['passports'])) {
            $incoming = $body['passports'];
        }

        $existingMap = [];
        foreach ($store['passports'] as $p) {
            if (isset($p['contract_address'], $p['token_id'])) {
                $uKey = strtolower($p['contract_address']) . '_' . $p['token_id'];
                $existingMap[$uKey] = $p;
            }
        }

        foreach ($incoming as $p) {
            if (!isset($p['contract_address'], $p['token_id'], $p['plant_name'])) continue;
            // Không lưu địa chỉ email vào public store để bảo mật
            unset($p['creator_email']);
            $uKey = strtolower($p['contract_address']) . '_' . $p['token_id'];
            $existingMap[$uKey] = $p;

            if ($pdo) {
                try {
                    $stmt = $pdo->prepare("
                        INSERT INTO ytc_nft_passports (unique_key, token_id, plant_key, creator_username, owner_address, payload_json)
                        VALUES (:ukey, :tid, :pkey, :uname, :owner, :json)
                        ON DUPLICATE KEY UPDATE
                            creator_username = VALUES(creator_username),
                            owner_address = VALUES(owner_address),
                            payload_json = VALUES(payload_json)
                    ");
                    $stmt->execute([
                        ':ukey'  => $uKey,
                        ':tid'   => (string)$p['token_id'],
                        ':pkey'  => (string)($p['plant_key'] ?? ''),
                        ':uname' => (string)($p['creator_username'] ?? 'tranthanhtung37'),
                        ':owner' => (string)($p['owner_address'] ?? ''),
                        ':json'  => json_encode($p, JSON_UNESCAPED_UNICODE)
                    ]);
                } catch (PDOException $e) {
                    error_log('Upsert NFT passport error: ' . $e->getMessage());
                }
            }
        }

        $store['passports'] = array_values($existingMap);
        writeJsonStore($storeFile, $store);

        echo json_encode([
            'success' => true,
            'count'   => count($store['passports'])
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($action === 'save_profile' && isset($body['profile']) && is_array($body['profile'])) {
        $prof = $body['profile'];
        $origHandle = strtolower(trim($prof['original_handle'] ?? ''));
        if ($origHandle !== '') {
            $store['profiles'][$origHandle] = $prof;
            writeJsonStore($storeFile, $store);

            if ($pdo) {
                try {
                    $stmt = $pdo->prepare("
                        INSERT INTO ytc_public_profiles (original_handle, custom_handle, payload_json)
                        VALUES (:orig, :cust, :json)
                        ON DUPLICATE KEY UPDATE
                            custom_handle = VALUES(custom_handle),
                            payload_json = VALUES(payload_json)
                    ");
                    $stmt->execute([
                        ':orig' => $origHandle,
                        ':cust' => strtolower(trim($prof['custom_handle'] ?? $origHandle)),
                        ':json' => json_encode($prof, JSON_UNESCAPED_UNICODE)
                    ]);
                } catch (PDOException $e) {
                    error_log('Upsert public profile error: ' . $e->getMessage());
                }
            }
        }

        echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode(['success' => false, 'error' => 'Unknown action']);
    exit;
}
