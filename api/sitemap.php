<?php
/**
 * DYNAMIC SITEMAP GENERATOR - TỰ ĐỘNG ĐỒNG BỘ 100%
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 *
 * Tính năng:
 * - Tự động phát hiện cây trồng mới trong MySQL Database
 * - Fallback tự động đọc từ api/plants_data.json nếu chưa kết nối MySQL
 * - Tự động cập nhật thẻ <lastmod> theo thời gian thực (updated_at)
 * - Cache HTTP 1 giờ để tối ưu tốc độ máy chủ LiteSpeed
 */

header('Content-Type: application/xml; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: public, max-age=3600');

$baseUrl = 'https://yeutrongcay.com';
$today   = date('Y-m-d');

// 1. Danh sách các URL trang tĩnh chính
$staticPages = [
    [
        'loc'        => $baseUrl . '/',
        'changefreq' => 'daily',
        'priority'   => '1.0',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/thao-duoc',
        'changefreq' => 'daily',
        'priority'   => '0.9',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/cay-an-trai',
        'changefreq' => 'daily',
        'priority'   => '0.9',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/cay-canh',
        'changefreq' => 'daily',
        'priority'   => '0.9',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/khong-gian-xanh',
        'changefreq' => 'daily',
        'priority'   => '0.9',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/sang-che-tai-che',
        'changefreq' => 'daily',
        'priority'   => '0.9',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/am-thuc-duoc-thien',
        'changefreq' => 'daily',
        'priority'   => '0.9',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/vuon-quoc-gia',
        'changefreq' => 'daily',
        'priority'   => '0.9',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/bac-si-cay-trong',
        'changefreq' => 'weekly',
        'priority'   => '0.8',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/trao-doi-cay',
        'changefreq' => 'daily',
        'priority'   => '0.8',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/vuon-cua-toi',
        'changefreq' => 'weekly',
        'priority'   => '0.7',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/kiem-tien-tu-vuon',
        'changefreq' => 'monthly',
        'priority'   => '0.7',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/lien-he',
        'changefreq' => 'monthly',
        'priority'   => '0.6',
        'lastmod'    => $today,
    ],
    [
        'loc'        => $baseUrl . '/web3-sandbox',
        'changefreq' => 'monthly',
        'priority'   => '0.5',
        'lastmod'    => $today,
    ],
];

// 2. Lấy danh sách URL động của các loài cây (từ MySQL Database hoặc plants_data.json)
$plants = [];

$dbFile = __DIR__ . '/db.php';
if (file_exists($dbFile)) {
    require_once $dbFile;
    if (function_exists('getDbConnection')) {
        $pdo = getDbConnection();
        if ($pdo) {
            try {
                $stmt = $pdo->query("SELECT slug, updated_at FROM plants ORDER BY id ASC");
                while ($row = $stmt->fetch()) {
                    if (!empty($row['slug'])) {
                        $lastmod = !empty($row['updated_at']) ? substr($row['updated_at'], 0, 10) : $today;
                        $plants[] = [
                            'slug'    => $row['slug'],
                            'lastmod' => $lastmod
                        ];
                    }
                }
            } catch (Exception $e) {
                error_log("Sitemap DB Query Error: " . $e->getMessage());
            }
        }
    }
}

// Nếu chưa có DB hoặc bảng rỗng, đọc từ plants_data.json
if (empty($plants)) {
    $jsonFile = __DIR__ . '/plants_data.json';
    if (file_exists($jsonFile)) {
        $raw = file_get_contents($jsonFile);
        $jsonPlants = json_decode($raw, true);
        if (is_array($jsonPlants)) {
            foreach ($jsonPlants as $p) {
                if (!empty($p['slug'])) {
                    $plants[] = [
                        'slug'    => $p['slug'],
                        'lastmod' => $today
                    ];
                }
            }
        }
    }
}

// 3. Xuất file XML chuẩn sitemaps.org
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

// Xuất các trang tĩnh
foreach ($staticPages as $page) {
    echo "  <url>\n";
    echo "    <loc>" . htmlspecialchars($page['loc'], ENT_XML1, 'UTF-8') . "</loc>\n";
    echo "    <lastmod>" . $page['lastmod'] . "</lastmod>\n";
    echo "    <changefreq>" . $page['changefreq'] . "</changefreq>\n";
    echo "    <priority>" . $page['priority'] . "</priority>\n";
    echo "  </url>\n";
}

// Xuất các trang chi tiết cây động
foreach ($plants as $plant) {
    $loc = $baseUrl . '/cay/' . $plant['slug'];
    echo "  <url>\n";
    echo "    <loc>" . htmlspecialchars($loc, ENT_XML1, 'UTF-8') . "</loc>\n";
    echo "    <lastmod>" . $plant['lastmod'] . "</lastmod>\n";
    echo "    <changefreq>weekly</changefreq>\n";
    echo "    <priority>0.8</priority>\n";
    echo "  </url>\n";
}

echo '</urlset>' . "\n";
