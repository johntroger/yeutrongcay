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

function getDbConnection() {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    // Đọc cấu hình từ file config.php nếu có
    $configFile = __DIR__ . '/config.php';
    $config = file_exists($configFile) ? require $configFile : [];

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
