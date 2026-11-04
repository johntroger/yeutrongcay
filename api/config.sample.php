<?php
/**
 * MẪU CẤU HÌNH CƠ SỞ DỮ LIỆU MYSQL - YÊU TRỒNG CÂY
 * 
 * Hướng dẫn:
 * 1. Đổi tên file này thành config.php (hoặc tạo file config.php cùng thư mục)
 * 2. Điền thông tin database được cấp từ Plesk
 * 3. File này được bảo mật, không commit lên GitHub
 */

defined('YTC_APP') or die('Truy cập trực tiếp bị từ chối.');

return [
    'db' => [
        'host' => 'localhost',
        'port' => 3306,
        'database' => 'yeutrongcay_db',
        'username' => 'yeutrongcay_u',
        'password' => 'MAT_KHAU_MANH_O_DAY',
        'charset'  => 'utf8mb4'
    ],
    'security' => [
        'seed_key' => 'ytc_secret_seed_token_2026'
    ]
];
