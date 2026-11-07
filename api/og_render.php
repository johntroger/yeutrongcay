<?php
/**
 * SERVER-SIDE OPEN GRAPH RENDERER CHO BOT MẠNG XÃ HỘI
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Tính năng:
 * - Trả về đầy đủ thẻ OpenGraph (og:title, og:description, og:image 1200x630) cho Facebook, Zalo, Twitter
 * - Chống LiteSpeed Cache nhầm lẫn bằng header Vary: User-Agent
 * - Tự động phát hiện chi tiết loài cây qua slug
 */

header('Content-Type: text/html; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Vary: User-Agent');
header('X-LiteSpeed-Cache-Control: no-cache');
header('Cache-Control: public, max-age=3600');

$baseUrl = 'https://yeutrongcay.com';
$slug = isset($_GET['slug']) ? preg_replace('/[^a-z0-9\-]/', '', strtolower($_GET['slug'])) : '';

$plant = null;

// 1. Tra cứu thông tin từ MySQL nếu có
$dbFile = __DIR__ . '/db.php';
if (file_exists($dbFile) && !empty($slug)) {
    require_once $dbFile;
    if (function_exists('getDbConnection')) {
        $pdo = getDbConnection();
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("SELECT * FROM plants WHERE slug = :slug LIMIT 1");
                $stmt->execute([':slug' => $slug]);
                $plant = $stmt->fetch();
            } catch (\Throwable $e) {}
        }
    }
}

// 2. Fallback tra cứu từ plants_data.json
if (!$plant && !empty($slug)) {
    $jsonFile = __DIR__ . '/plants_data.json';
    if (file_exists($jsonFile)) {
        $plants = json_decode(file_get_contents($jsonFile), true);
        if (is_array($plants)) {
            foreach ($plants as $p) {
                if (!empty($p['slug']) && $p['slug'] === $slug) {
                    $plant = $p;
                    break;
                }
            }
        }
    }
}

// 3. Chuẩn bị tiêu đề, mô tả và ảnh cho thẻ OpenGraph
if ($plant) {
    $commonName = htmlspecialchars($plant['common_name'] ?? 'Loài Cây', ENT_QUOTES, 'UTF-8');
    $sciName = htmlspecialchars($plant['scientific_name'] ?? '', ENT_QUOTES, 'UTF-8');
    $descRaw = $plant['description'] ?? 'Cẩm nang cây trồng và chăm sóc ban công đô thị.';
    
    // Bổ sung công dụng nếu có
    if (!empty($plant['medical_info']['uses']) && is_array($plant['medical_info']['uses'])) {
        $descRaw .= ' Công dụng nổi bật: ' . implode(', ', array_slice($plant['medical_info']['uses'], 0, 3)) . '.';
    }
    
    $cleanDesc = htmlspecialchars(mb_substr(strip_tags($descRaw), 0, 240, 'UTF-8'), ENT_QUOTES, 'UTF-8');
    $pageTitle = "{$commonName} ({$sciName}) - Cẩm Nang Trồng & Chăm Sóc | Yêu Trồng Cây";
    $pageUrl = "{$baseUrl}/cay/{$slug}";
    $ogImageUrl = "{$baseUrl}/api/og_image.php?slug={$slug}";
} else {
    // Giá trị mặc định nếu là trang chủ hoặc không tìm thấy slug
    $pageTitle = "Yêu Trồng Cây - Cẩm Nang Thực Vật Bản Địa & Bác Sĩ Cây 3s";
    $cleanDesc = "Nền tảng sinh thái thực vật bản địa Việt Nam: Tủ thuốc xanh gia đình, cây ăn trái sân thượng, chẩn đoán bệnh lá AI 3 giây và trạm trao đổi giống cây.";
    $pageUrl = $baseUrl . '/';
    $ogImageUrl = "{$baseUrl}/public/banner-bg-hero.jpg";
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $pageTitle; ?></title>
  <meta name="description" content="<?php echo $cleanDesc; ?>">

  <!-- OpenGraph / Facebook / Zalo -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Yêu Trồng Cây">
  <meta property="og:url" content="<?php echo $pageUrl; ?>">
  <meta property="og:title" content="<?php echo $pageTitle; ?>">
  <meta property="og:description" content="<?php echo $cleanDesc; ?>">
  <meta property="og:image" content="<?php echo $ogImageUrl; ?>">
  <meta property="og:image:secure_url" content="<?php echo $ogImageUrl; ?>">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="<?php echo $pageTitle; ?>">
  <meta property="og:locale" content="vi_VN">

  <!-- Twitter Summary Large Image -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="<?php echo $pageUrl; ?>">
  <meta name="twitter:title" content="<?php echo $pageTitle; ?>">
  <meta name="twitter:description" content="<?php echo $cleanDesc; ?>">
  <meta name="twitter:image" content="<?php echo $ogImageUrl; ?>">

  <!-- Nếu là người dùng thật vô tình truy cập trực tiếp URL này, chuyển tiếp về trang SPA -->
  <script>
    if (!navigator.userAgent.match(/facebookexternalhit|Facebot|meta-externalagent|Twitterbot|Zalo|TelegramBot/i)) {
      window.location.replace('<?php echo $pageUrl; ?>');
    }
  </script>
</head>
<body style="font-family: sans-serif; padding: 20px; line-height: 1.6; color: #222;">
  <h1><?php echo $pageTitle; ?></h1>
  <p><?php echo $cleanDesc; ?></p>
  <p><img src="<?php echo $ogImageUrl; ?>" alt="<?php echo $pageTitle; ?>" style="max-width: 600px; height: auto; border-radius: 8px;"></p>
  <p><a href="<?php echo $pageUrl; ?>">Bấm vào đây để xem chi tiết trên yeutrongcay.com</a></p>
</body>
</html>
