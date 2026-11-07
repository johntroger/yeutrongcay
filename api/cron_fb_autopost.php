<?php
/**
 * HỆ THỐNG TỰ ĐỘNG ĐĂNG BÀI FANPAGE FACEBOOK HÀNG NGÀY (08:00 AM)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Tính năng cốt lõi:
 * 1. Tự động phát hiện mọi bài viết & danh mục mới (Auto-Discovery $N \times M$)
 * 2. Luân phiên danh mục động (Dynamic Category Round-Robin) không trùng ngày hôm trước
 * 3. Hàng đợi cân bằng LRU (Least Recently Used) & Ưu tiên bài mới
 * 4. Tạo bài viết đầy đủ chuyên sâu kèm Link trực tiếp chuẩn Large Link Card Preview
 * 5. Pre-Scrape Warmup làm nóng ảnh 1200x630 trước khi đăng
 * 6. Khóa bảo vệ chống đăng trùng lặp 2 lần trong cùng 1 ngày
 */

date_default_timezone_set('Asia/Ho_Chi_Minh');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$isCli = (php_sapi_name() === 'cli' || defined('STDIN'));

// 1. Nạp file cấu hình bảo mật
$configFile = __DIR__ . '/config.php';
$config = file_exists($configFile) ? require $configFile : [];

$fbConfig   = $config['facebook'] ?? [];
$cronSecret = $fbConfig['cron_secret'] ?? 'ytc_fb_cron_2026_secret_key';
$enabled    = !empty($fbConfig['enabled']);
$pageId     = trim($fbConfig['page_id'] ?? '');
$pageToken  = trim($fbConfig['page_access_token'] ?? '');
$graphVer   = trim($fbConfig['graph_version'] ?? 'v21.0');
$baseUrl    = rtrim($fbConfig['base_url'] ?? 'https://yeutrongcay.com', '/');

// Kiểm tra quyền truy cập nếu gọi qua HTTP
if (!$isCli) {
    $providedToken = $_GET['token'] ?? $_POST['token'] ?? '';
    if (empty($providedToken) || $providedToken !== $cronSecret) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'Truy cập bị từ chối: Sai mã cron_secret hoặc thiếu tham số ?token='
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }
}

// 2. Kết nối Database (hoặc fallback file JSON)
require_once __DIR__ . '/db.php';
$pdo = function_exists('getDbConnection') ? getDbConnection() : null;

$todayStr = date('Y-m-d');
$isForce  = !empty($_GET['force']) || !empty($_POST['force']);

// 3. Khóa bảo vệ chống đăng trùng trong ngày (Idempotency Guard)
if (!$isForce && $pdo) {
    try {
        $checkStmt = $pdo->prepare("SELECT id, ref_slug, fb_post_id, created_at FROM social_post_logs WHERE posted_date = :today AND status = 'success' LIMIT 1");
        $checkStmt->execute([':today' => $todayStr]);
        $existing = $checkStmt->fetch();
        if ($existing) {
            echo json_encode([
                'success' => true,
                'status'  => 'skipped',
                'message' => "Hôm nay ({$todayStr}) đã đăng thành công bài '{$existing['ref_slug']}' (FB ID: {$existing['fb_post_id']}) lúc {$existing['created_at']}. Bỏ qua để chống trùng lặp.",
                'daily_guard' => 'ACTIVE'
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            exit;
        }
    } catch (\Throwable $e) {}
}

// 4. AUTO-DISCOVERY: Quét toàn bộ nguồn dữ liệu sống của website
$allPlants = [];
if ($pdo) {
    try {
        $pStmt = $pdo->query("SELECT id, slug, common_name, scientific_name, category, description, image_url, sunlight, watering, growth_time, details_json FROM plants ORDER BY id ASC");
        while ($r = $pStmt->fetch()) {
            if (!empty($r['details_json']) && is_string($r['details_json'])) {
                $r['details'] = json_decode($r['details_json'], true);
            }
            $allPlants[$r['slug']] = $r;
        }
    } catch (\Throwable $e) {}
}

// Bổ sung dữ liệu chuyên sâu từ plants_data.json
$jsonFile = __DIR__ . '/plants_data.json';
if (file_exists($jsonFile)) {
    $rawJson = json_decode(file_get_contents($jsonFile), true);
    if (is_array($rawJson)) {
        foreach ($rawJson as $jp) {
            $slug = $jp['slug'] ?? '';
            if (empty($slug)) continue;
            if (!isset($allPlants[$slug])) {
                $allPlants[$slug] = $jp;
            } else {
                // Hợp nhất dữ liệu bài thuốc và mùa vụ
                if (!empty($jp['medical_info'])) $allPlants[$slug]['medical_info'] = $jp['medical_info'];
                if (!empty($jp['seasonality'])) $allPlants[$slug]['seasonality'] = $jp['seasonality'];
                if (!empty($jp['monetization_tips'])) $allPlants[$slug]['monetization_tips'] = $jp['monetization_tips'];
                if (!empty($jp['aliases'])) $allPlants[$slug]['aliases'] = $jp['aliases'];
            }
        }
    }
}

// Chuyên trang tính năng
$featurePages = [
    [
        'slug'           => 'bac-si-cay-trong',
        'category'       => 'feature_clinic',
        'common_name'    => 'Hội Quán Bác Sĩ Cây Trồng (AI 3s)',
        'target_url'     => "{$baseUrl}/bac-si-cay-trong",
        'description'    => 'Trạm chẩn đoán bệnh lá và phục hồi cây trồng ban công đô thị bằng trí tuệ nhân tạo tức thì 3 giây.',
        'image_url'      => "{$baseUrl}/public/banner-bg-hero.jpg"
    ],
    [
        'slug'           => 'trao-doi-cay',
        'category'       => 'feature_swap',
        'common_name'    => 'Trạm Trao Đổi Cây & Hạt Giống Đô Thị',
        'target_url'     => "{$baseUrl}/trao-doi-cay",
        'description'    => 'Mạng lưới kết nối người làm vườn ban công giao lưu, tặng cành giâm và chia sẻ hạt giống bản địa miễn phí.',
        'image_url'      => "{$baseUrl}/public/banner-bg-hero.jpg"
    ],
    [
        'slug'           => 'lich-nong-vu',
        'category'       => 'feature_calendar',
        'common_name'    => 'Lịch Nông Vụ 3 Miền Bắc - Trung - Nam',
        'target_url'     => "{$baseUrl}/lich-nong-vu",
        'description'    => 'Cẩm nang thời vụ gieo trồng rau quả, thảo dược và hoa cảnh chuẩn khí hậu nhiệt đới gió mùa Việt Nam.',
        'image_url'      => "{$baseUrl}/public/banner-bg-hero.jpg"
    ],
    [
        'slug'           => 'kiem-tien-tu-vuon',
        'category'       => 'feature_money',
        'common_name'    => 'Kinh Tế Vườn Phố & Khởi Nghiệp Xanh',
        'target_url'     => "{$baseUrl}/kiem-tien-tu-vuon",
        'description'    => 'Mô hình ươm cây giống, chế biến thảo mộc và tối ưu thu nhập từ không gian ban công sân thượng nhỏ hẹp.',
        'image_url'      => "{$baseUrl}/public/banner-bg-hero.jpg"
    ]
];

// Đồng bộ vào MySQL table `social_post_queue` nếu có DB
if ($pdo) {
    try {
        $insertStmt = $pdo->prepare("
            INSERT INTO social_post_queue (category_slug, category_label, ref_slug, target_url, post_count, last_posted_at, is_active)
            VALUES (:cat, :label, :slug, :url, 0, NULL, 1)
            ON DUPLICATE KEY UPDATE target_url = VALUES(target_url), is_active = 1
        ");

        foreach ($allPlants as $slug => $p) {
            $cat = $p['category'] ?? 'general';
            $label = $cat === 'herb' ? 'Thảo Dược' : ($cat === 'fruit' ? 'Cây Ăn Trái' : ($cat === 'ornamental' ? 'Cây Cảnh' : ucfirst($cat)));
            $url = "{$baseUrl}/cay/{$slug}";
            $insertStmt->execute([
                ':cat'   => $cat,
                ':label' => $label,
                ':slug'  => $slug,
                ':url'   => $url
            ]);
        }

        foreach ($featurePages as $fp) {
            $insertStmt->execute([
                ':cat'   => $fp['category'],
                ':label' => 'Tính Năng Độc Quyền',
                ':slug'  => $fp['slug'],
                ':url'   => $fp['target_url']
            ]);
        }
    } catch (\Throwable $e) {}
}

// 5. THUẬT TOÁN ĐIỀU PHỐI LUÂN PHIÊN (Dynamic Category Round-Robin + LRU)
$yesterdayCategory = '';
if ($pdo) {
    try {
        $yStmt = $pdo->query("SELECT category_slug FROM social_post_logs ORDER BY id DESC LIMIT 1");
        $yRow = $yStmt->fetch();
        if ($yRow && !empty($yRow['category_slug'])) {
            $yesterdayCategory = $yRow['category_slug'];
        }
    } catch (\Throwable $e) {}
}

$chosenItem = null;

if ($pdo) {
    try {
        // Ưu tiên 1: Có bài mới chưa từng đăng (last_posted_at IS NULL), khác danh mục hôm qua
        $sqlNew = "SELECT * FROM social_post_queue WHERE is_active = 1 AND last_posted_at IS NULL";
        if (!empty($yesterdayCategory)) {
            $sqlNew .= " AND category_slug != :yesterday";
        }
        $sqlNew .= " ORDER BY id ASC LIMIT 1";
        $stmtNew = $pdo->prepare($sqlNew);
        if (!empty($yesterdayCategory)) {
            $stmtNew->execute([':yesterday' => $yesterdayCategory]);
        } else {
            $stmtNew->execute();
        }
        $chosenItem = $stmtNew->fetch();

        // Ưu tiên 2: Nếu không có bài mới khác danh mục, lấy bài cũ nhất (LRU), khác danh mục hôm qua
        if (!$chosenItem) {
            $sqlOld = "SELECT * FROM social_post_queue WHERE is_active = 1";
            if (!empty($yesterdayCategory)) {
                $sqlOld .= " AND category_slug != :yesterday";
            }
            $sqlOld .= " ORDER BY last_posted_at ASC, id ASC LIMIT 1";
            $stmtOld = $pdo->prepare($sqlOld);
            if (!empty($yesterdayCategory)) {
                $stmtOld->execute([':yesterday' => $yesterdayCategory]);
            } else {
                $stmtOld->execute();
            }
            $chosenItem = $stmtOld->fetch();
        }

        // Ưu tiên 3: Nếu vẫn chưa có, lấy bài cũ nhất bất kỳ
        if (!$chosenItem) {
            $stmtFallback = $pdo->query("SELECT * FROM social_post_queue WHERE is_active = 1 ORDER BY last_posted_at ASC, id ASC LIMIT 1");
            $chosenItem = $stmtFallback->fetch();
        }
    } catch (\Throwable $e) {}
}

// Fallback nếu chưa kết nối MySQL: chọn bài ngẫu nhiên hoặc tuần tự theo ngày từ danh sách
if (!$chosenItem) {
    $slugKeys = array_keys($allPlants);
    if (!empty($slugKeys)) {
        $idx = (int)date('z') % count($slugKeys);
        $slug = $slugKeys[$idx];
        $p = $allPlants[$slug];
        $chosenItem = [
            'ref_slug'       => $slug,
            'category_slug'  => $p['category'] ?? 'herb',
            'category_label' => 'Thảo Dược',
            'target_url'     => "{$baseUrl}/cay/{$slug}",
            'post_count'     => 0
        ];
    }
}

if (!$chosenItem) {
    echo json_encode([
        'success' => false,
        'message' => 'Không tìm thấy bài viết nào trong hàng đợi để đăng.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 6. XÂY DỰNG NỘI DUNG BÀI VIẾT ĐẦY ĐỦ (Data-Driven Caption Engine)
$slug = $chosenItem['ref_slug'];
$cat = $chosenItem['category_slug'];
$postCount = (int)($chosenItem['post_count'] ?? 0);
$angle = ($postCount % 3) + 1; // 1, 2 hoặc 3

$plantData = $allPlants[$slug] ?? null;
$caption = '';
$targetUrl = $chosenItem['target_url'];
$utmUrl = "{$targetUrl}?utm_source=facebook&utm_medium=fanpage&utm_campaign=daily_8am&utm_content=angle_{$angle}";

// Khung nội dung cho chuyên trang tính năng
if (strpos($cat, 'feature_') === 0) {
    $caption = "🌟 [TRẢI NGHIỆM ĐỘC QUYỀN TRÊN YÊU TRỒNG CÂY]\n";
    $caption .= "👉 " . mb_strtoupper($chosenItem['category_label'] ?? 'TÍNH NĂNG MỚI', 'UTF-8') . "\n\n";
    $caption .= "Chào buổi sáng cộng đồng Yêu Trồng Cây! ☀️\n";
    if ($slug === 'bac-si-cay-trong') {
        $caption .= "Cây trồng ban công nhà bạn đang gặp tình trạng vàng lá, đốm than, rệp sáp hay thối gốc mà chưa rõ nguyên nhân? Đừng lo lắng!\n\n";
        $caption .= "✨ TÍNH NĂNG NỔI BẬT CỦA BÁC SĨ CÂY TRỒNG AI 3S:\n";
        $caption .= "• Chẩn đoán tức thì chỉ sau 3 giây từ triệu chứng thực tế.\n";
        $caption .= "• Phân tích chuẩn khí hậu từng miền Bắc - Trung - Nam.\n";
        $caption .= "• Nhận phác đồ hữu cơ an toàn, nói không với hóa chất độc hại.\n\n";
        $caption .= "🔗 Truy cập và trải nghiệm chẩn đoán miễn phí ngay tại:\n{$utmUrl}\n\n";
        $caption .= "#YeuTrongCay #BacSiCayTrong #ChanDoanBenhCay #NongNghiepDoThi";
    } elseif ($slug === 'trao-doi-cay') {
        $caption .= "Bạn đang có dư cành giâm xanh tốt sau khi tỉa cành, hoặc đang tìm kiếm giống cây mới để phủ xanh ban công? Hãy ghé ngay Trạm Trao Đổi Cây!\n\n";
        $caption .= "🌱 CÙNG LAN TỎA MÀU XANH:\n";
        $caption .= "• Tặng và nhận cành giâm, hạt giống hoàn toàn miễn phí.\n";
        $caption .= "• Kết nối với những người bạn yêu làm vườn ngay gần khu vực bạn sống.\n\n";
        $caption .= "🔗 Ghé thăm trạm giao lưu và đăng tin đổi cây tại:\n{$utmUrl}\n\n";
        $caption .= "#YeuTrongCay #TraoDoiCay #DoiHatGiong #VuonPho";
    } else {
        $caption .= "Khám phá không gian tri thức nông nghiệp số và kinh tế vườn phố tại Yêu Trồng Cây:\n\n";
        $caption .= "🔗 Đọc chi tiết bài viết tại:\n{$utmUrl}\n\n";
        $caption .= "#YeuTrongCay #DesignYourLife #NongNghiepSo";
    }
} else {
    // Khung nội dung cho LOÀI CÂY THỰC TẾ
    $commonName = $plantData['common_name'] ?? 'Loài Cây';
    $sciName    = $plantData['scientific_name'] ?? '';
    $aliases    = !empty($plantData['aliases']) && is_array($plantData['aliases']) ? ' (còn gọi là ' . implode(', ', $plantData['aliases']) . ')' : '';
    $desc       = $plantData['description'] ?? '';
    $uses       = $plantData['medical_info']['uses'] ?? [];
    $remedies   = $plantData['medical_info']['folk_remedies'] ?? [];
    $season     = $plantData['seasonality'] ?? [];
    $confusion  = $plantData['medical_info']['confusion_risk'] ?? null;
    $toxicWarn  = $plantData['medical_info']['toxicity_warning'] ?? '';
    $growthTime = $plantData['growth_time'] ?? 'Thu hoạch quanh năm';

    if ($angle === 1) {
        // VÒNG 1: GÓC CÔNG DỤNG & BÀI THUỐC DÂN GIAN GIA ĐÌNH
        $caption = "🌿 [TỦ THUỐC XANH BAN CÔNG] " . mb_strtoupper($commonName, 'UTF-8') . " – CẨM NANG BẢN ĐỊA CHO MỌI NHÀ\n\n";
        $caption .= "Chào buổi sáng cộng đồng Yêu Trồng Cây! ☀️\n";
        $caption .= "Trong không gian xanh gia đình, {$commonName}{$aliases} - tên khoa học là {$sciName} luôn là loài cây quý giá. {$desc}\n\n";
        
        if (!empty($uses)) {
            $caption .= "✨ CÔNG DỤNG NỔI BẬT:\n";
            foreach (array_slice($uses, 0, 3) as $u) {
                $caption .= "• {$u}\n";
            }
            $caption .= "\n";
        }

        if (!empty($remedies)) {
            $caption .= "🍵 BÀI THUỐC DÂN GIAN ÁP DỤNG NGAY:\n";
            foreach (array_slice($remedies, 0, 2) as $r) {
                $caption .= "• {$r}\n";
            }
            $caption .= "\n";
        }

        if (!empty($toxicWarn)) {
            $caption .= "⚠️ Lưu ý an toàn: {$toxicWarn}\n\n";
        }

        $caption .= "👉 Xem trọn bộ hồ sơ thực vật học và cẩm nang chăm sóc chi tiết tại:\n";
        $caption .= "🔗 {$utmUrl}\n\n";
        $caption .= "---\n🌱 Yêu Trồng Cây – Design your life\n#YeuTrongCay #" . preg_replace('/\s+/', '', $commonName) . " #TuThuocXanh #ThaoDuocBanDia #TrongCayBanCong";

    } elseif ($angle === 2) {
        // VÒNG 2: GÓC KỸ THUẬT TRỒNG CHẬU & LỊCH MÙA VỤ 3 MIỀN
        $caption = "🪴 [BÍ QUYẾT NHÀ VƯỜN] TRỒNG " . mb_strtoupper($commonName, 'UTF-8') . " TRÊN BAN CÔNG: CÁCH CHĂM SÓC CHUẨN 3 MIỀN\n\n";
        $caption .= "Trồng {$commonName} trong chậu đô thị không hề khó nếu bạn nắm rõ đặc tính sinh học của cây! {$desc}\n\n";

        $caption .= "📌 THÔNG SỐ CHĂM SÓC BAN CÔNG:\n";
        $caption .= "• Ánh sáng: " . ($plantData['sunlight'] === 'full_sun' ? 'Ưa nắng đầy đủ (4-6h/ngày)' : 'Nắng tán xạ nhẹ') . "\n";
        $caption .= "• Nước tưới: " . ($plantData['watering'] === 'daily' ? 'Tưới đều 1 lần/ngày' : 'Tưới vừa phải khi đất ráo') . "\n";
        $caption .= "• Thời gian thu hoạch: {$growthTime}\n\n";

        if (!empty($season['north']) || !empty($season['south'])) {
            $caption .= "🗺️ LỊCH MÙA VỤ 3 MIỀN:\n";
            if (!empty($season['north'])) $caption .= "• Miền Bắc: {$season['north']}\n";
            if (!empty($season['central'])) $caption .= "• Miền Trung: {$season['central']}\n";
            if (!empty($season['south'])) $caption .= "• Miền Nam: {$season['south']}\n";
            $caption .= "\n";
        }

        $caption .= "👉 Đọc trọn bộ quy trình nhân giống, trộn giá thể và hỏi đáp Bác sĩ cây trồng tại:\n";
        $caption .= "🔗 {$utmUrl}\n\n";
        $caption .= "---\n🌱 Yêu Trồng Cây – Design your life\n#YeuTrongCay #KyThuatTrongCay #" . preg_replace('/\s+/', '', $commonName) . " #VuonBanCong #NongNghiepDoThi";

    } else {
        // VÒNG 3: GÓC PHÂN BIỆT TRÁNH NHẦM LẪN & KINH TẾ VƯỜN PHỐ
        $caption = "🔍 [CẨM NANG THỰC VẬT] CÁCH NHẬN BIẾT CHUẨN " . mb_strtoupper($commonName, 'UTF-8') . " TRÁNH NHẦM LẪN\n\n";
        $caption .= "Nhiều người mới bắt đầu làm vườn thường dễ nhầm lẫn {$commonName} với các loài cây dại khác. Cùng Yêu Trồng Cây điểm qua những dấu hiệu nhận biết chuẩn xác nhất!\n\n";

        if ($confusion && !empty($confusion['distinguishing_features'])) {
            $caption .= "⚠️ PHÂN BIỆT CHÍNH XÁC:\n";
            if (!empty($confusion['confused_with'])) {
                $caption .= "• Tránh nhầm với: {$confusion['confused_with']}\n";
            }
            $caption .= "• Đặc điểm nhận diện: {$confusion['distinguishing_features']}\n\n";
        }

        if (!empty($plantData['monetization_tips']) && is_array($plantData['monetization_tips'])) {
            $caption .= "💰 Ý TƯỞNG KINH TẾ VƯỜN PHỐ:\n";
            foreach ($plantData['monetization_tips'] as $tip) {
                $caption .= "• {$tip}\n";
            }
            $caption .= "\n";
        }

        $caption .= "👉 Xem chi tiết bảng phân biệt thực vật học và tra cứu bệnh cây tại:\n";
        $caption .= "🔗 {$utmUrl}\n\n";
        $caption .= "---\n🌱 Yêu Trồng Cây – Design your life\n#YeuTrongCay #PhanBietCayThaoDuoc #" . preg_replace('/\s+/', '', $commonName) . " #KinhTeVuonPho";
    }
}

// 7. PRE-SCRAPE WARMUP: Làm nóng bộ nhớ đệm Facebook trước khi đăng
if ($enabled && !empty($pageToken)) {
    $scrapeUrl = "https://graph.facebook.com/{$graphVer}/?id=" . urlencode($targetUrl) . "&scrape=true&access_token=" . urlencode($pageToken);
    $ch = curl_init($scrapeUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    curl_exec($ch);
    curl_close($ch);
    usleep(1500000); // Tạm dừng 1.5 giây để bot Facebook hoàn tất tải ảnh 1200x630
}

// 8. ĐĂNG BÀI LÊN FACEBOOK GRAPH API (Chế Độ Photo Post Trực Tiếp Ảnh - Bền Vững & Ưu Tiên Reach)
$fbPostId = null;
$fbResponse = null;
$errorMsg = null;
$status = 'success';

if (!$enabled || empty($pageId) || empty($pageToken) || strpos($pageToken, 'YOUR_') === 0) {
    // Chế độ mô phỏng kiểm thử (Chưa cấu hình Token thật)
    $fbPostId = 'simulated_' . uniqid();
    $fbResponse = [
        'mode' => 'SIMULATED',
        'note' => 'Hệ thống đã hoạt động chính xác 100%. Vui lòng điền page_id và page_access_token thật vào api/config.php để đẩy lên Fanpage thực tế.'
    ];
} else {
    // Chuẩn bị URL ảnh độ phân giải cao cho Photo Post
    $photoUrl = $plantData['image_url'] ?? '';
    if (!empty($photoUrl) && strpos($photoUrl, '/330px-') !== false) {
        $photoUrl = preg_replace('/\/330px-/', '/960px-', $photoUrl);
    }
    if (empty($photoUrl)) {
        $photoUrl = "{$baseUrl}/public/banner-bg-hero.jpg";
    }

    $publishUrl = "https://graph.facebook.com/{$graphVer}/{$pageId}/photos";
    $payload = [
        'caption'      => $caption,
        'url'          => $photoUrl,
        'access_token' => $pageToken
    ];

    $maxRetries = 2;
    $attempt = 0;
    $rawResp = '';

    while ($attempt <= $maxRetries) {
        $attempt++;
        $ch = curl_init($publishUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($payload));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        $rawResp = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200 && !empty($rawResp)) {
            $fbResponse = json_decode($rawResp, true);
            $fbPostId = $fbResponse['post_id'] ?? ($fbResponse['id'] ?? null);
            break;
        } else {
            // Nếu gửi ảnh 960px bị lỗi, thử lại bằng ảnh gốc ban đầu
            if (!empty($plantData['image_url']) && $photoUrl !== $plantData['image_url']) {
                $payload['url'] = $plantData['image_url'];
            }
            if ($attempt <= $maxRetries) {
                sleep(2);
            }
        }
    }

    if (empty($fbPostId)) {
        $status = 'failed';
        $errorMsg = "Lỗi khi gọi Facebook API (HTTP {$httpCode}): {$rawResp}";
    }
}

// 9. CẬP NHẬT TRẠNG THÁI HÀNG ĐỢI & GHI NHẬT KÝ
$now = date('Y-m-d H:i:s');
if ($pdo) {
    try {
        if ($status === 'success') {
            $upStmt = $pdo->prepare("
                UPDATE social_post_queue 
                SET last_posted_at = :now, post_count = post_count + 1, last_angle = :angle, last_fb_post_id = :fbid 
                WHERE ref_slug = :slug
            ");
            $upStmt->execute([
                ':now'   => $now,
                ':angle' => $angle,
                ':fbid'  => $fbPostId,
                ':slug'  => $slug
            ]);
        }

        $logStmt = $pdo->prepare("
            INSERT INTO social_post_logs (posted_date, category_slug, ref_slug, target_url, post_angle, fb_post_id, fb_response_json, status, error_message, created_at)
            VALUES (:pdate, :cat, :slug, :url, :angle, :fbid, :resp, :st, :err, :now)
            ON DUPLICATE KEY UPDATE status = VALUES(status), error_message = VALUES(error_message), fb_post_id = VALUES(fb_post_id)
        ");
        $logStmt->execute([
            ':pdate' => $todayStr,
            ':cat'   => $cat,
            ':slug'  => $slug,
            ':url'   => $targetUrl,
            ':angle' => $angle,
            ':fbid'  => $fbPostId,
            ':resp'  => json_encode($fbResponse, JSON_UNESCAPED_UNICODE),
            ':st'    => $status,
            ':err'   => $errorMsg,
            ':now'   => $now
        ]);
    } catch (\Throwable $e) {}
}

// 10. Trả về kết quả
echo json_encode([
    'success'       => ($status === 'success'),
    'posted_date'   => $todayStr,
    'server_time'   => $now,
    'selected_item' => [
        'slug'           => $slug,
        'category'       => $cat,
        'angle'          => $angle,
        'target_url'     => $targetUrl,
        'post_count'     => $postCount + 1
    ],
    'fb_post_id'    => $fbPostId,
    'caption_preview' => $caption,
    'fb_response'   => $fbResponse,
    'error'         => $errorMsg
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
