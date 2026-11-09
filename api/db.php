<?php
/**
 * MODULE KẾT NỐI CƠ SỞ DỮ LIỆU MYSQL (PDO PREPARED STATEMENTS)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Chuẩn bảo mật:
 * - 100% Prepared Statements chống SQL Injection
 * - UTF-8mb4 hỗ trợ tiếng Việt có dấu và emoji thực vật
 * - Không bao giờ để lộ thông tin mật khẩu ra response lỗi
 */

define('YTC_APP', true);

/**
 * Trình nạp cấu hình đa tầng thông minh (Multi-Level Config Loader)
 * Tự động tìm kiếm file config.php ở:
 * 1. api/config.php (Nội bộ thư mục API)
 * 2. httpdocs/config.php (Thư mục web gốc)
 * 3. /var/www/vhosts/.../config.php (Thư mục cha ngoài httpdocs - Không bao giờ bị Git xóa!)
 */
if (!function_exists('getYtcConfig')) {
    function getYtcConfig() {
        static $cfg = null;
        if ($cfg !== null) {
            return $cfg;
        }

        $candidates = [
            __DIR__ . '/config.php',
            __DIR__ . '/../config.php',
            __DIR__ . '/../../config.php',
            __DIR__ . '/../../../config.php',
            __DIR__ . '/config.sample.php'
        ];

        foreach ($candidates as $file) {
            if (file_exists($file)) {
                $loaded = @require $file;
                if (is_array($loaded)) {
                    $hasDb = !empty($loaded['db']['database']) && $loaded['db']['database'] !== 'yeutrongcay_db';
                    $hasFb = !empty($loaded['facebook']['page_access_token']) && strpos($loaded['facebook']['page_access_token'], 'YOUR_') === false;
                    if ($hasDb || $hasFb) {
                        $cfg = $loaded;
                        return $cfg;
                    }
                    if ($cfg === null) {
                        $cfg = $loaded;
                    }
                }
            }
        }

        $cfg = $cfg ?? [];
        return $cfg;
    }
}

function getDbConnection() {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    // Đọc cấu hình đa tầng (tự động fallback thư mục ngoài httpdocs)
    $config = getYtcConfig();

    $host     = getenv('DB_HOST') ?: ($config['db']['host'] ?? 'localhost');
    $port     = getenv('DB_PORT') ?: ($config['db']['port'] ?? 3306);
    $database = getenv('DB_NAME') ?: ($config['db']['database'] ?? '');
    $username = getenv('DB_USER') ?: ($config['db']['username'] ?? '');
    $password = getenv('DB_PASS') ?: ($config['db']['password'] ?? '');
    $charset  = 'utf8mb4';

    if (empty($database) || empty($username)) {
        return null;
    }

    $dsn = "mysql:host={$host};port={$port};dbname={$database};charset={$charset}";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];

    try {
        $pdo = new PDO($dsn, $username, $password, $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log('Database Connection Error: ' . $e->getMessage());
        return null;
    }
}
