<?php
/**
 * MẪU CẤU HÌNH CƠ SỞ DỮ LIỆU MYSQL & FACEBOOK API - YÊU TRỒNG CÂY
 * 
 * Hướng dẫn:
 * 1. Đổi tên file này thành config.php (hoặc tạo file config.php cùng thư mục)
 * 2. Điền thông tin database được cấp từ Plesk
 * 3. Điền thông tin Page ID và Page Access Token từ Meta for Developers
 * 4. File này được bảo mật, không commit lên GitHub
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
        'admin_token'    => 'THAY_BANG_CHUOI_TOKEN_ADMIN_MANH_32_KY_TU',
        'admin_username' => 'admin',
        'admin_password' => 'MAT_KHAU_QUAN_TRI_MANH_O_DAY',
        'seed_key'       => 'THAY_BANG_CHUOI_SEED_TOKEN_BI_MAT_2026'
    ],
    'facebook' => [
        'enabled'           => true,
        'page_id'           => 'YOUR_FACEBOOK_PAGE_ID',
        'page_access_token' => 'YOUR_NEVER_EXPIRING_PAGE_ACCESS_TOKEN',
        'graph_version'     => 'v21.0',
        'cron_secret'       => 'ytc_fb_cron_2026_secret_key',
        'base_url'          => 'https://yeutrongcay.com'
    ]
];
