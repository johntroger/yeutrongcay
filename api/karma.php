<?php
/**
 * API ĐIỂM UY TÍN KARMA & HUY HIỆU NHÀ VƯỜN - YEUTRONGECAY.COM
 * Tra cứu điểm Karma, cấp bậc huy hiệu và nhật ký đóng góp cộng đồng (H9)
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

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
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
$pdo = getDbConnection();

$user_id = trim($_GET['user_id'] ?? '');
if (empty($user_id)) {
    // Nếu không truyền user_id, lấy ID ẩn danh từ IP
    $user_id = 'usr-' . substr(md5($_SERVER['REMOTE_ADDR'] ?? 'guest'), 0, 8);
}

// Bảng tính danh hiệu theo điểm
function calculateBadge($points) {
    if ($points >= 300) {
        return [
            'title' => 'Lương Y / Chuyên Gia Bản Địa',
            'tier' => 4,
            'icon' => '🎖️',
            'color' => 'amber'
        ];
    }
    if ($points >= 150) {
        return [
            'title' => 'Lão Nông Ban Công',
            'tier' => 3,
            'icon' => '🏡',
            'color' => 'emerald'
        ];
    }
    if ($points >= 50) {
        return [
            'title' => 'Chủ Vườn Tích Cực',
            'tier' => 2,
            'icon' => '🌿',
            'color' => 'teal'
        ];
    }
    return [
        'title' => 'Mầm Non Tập Trồng',
        'tier' => 1,
        'icon' => '🌱',
        'color' => 'gray'
    ];
}

$total_points = 50; // Điểm khởi đầu mặc định khi tham gia cộng đồng
$events = [];

if ($pdo) {
    try {
        // Tính tổng điểm từ bảng user_events
        $sum_stmt = $pdo->prepare("SELECT COALESCE(SUM(points), 0) as total FROM user_events WHERE user_id = :uid");
        $sum_stmt->execute([':uid' => $user_id]);
        $sum_row = $sum_stmt->fetch();
        if ($sum_row) {
            $total_points += (int)$sum_row['total'];
        }

        // Lấy 10 sự kiện gần nhất
        $ev_stmt = $pdo->prepare("SELECT * FROM user_events WHERE user_id = :uid ORDER BY created_at DESC LIMIT 10");
        $ev_stmt->execute([':uid' => $user_id]);
        $raw_events = $ev_stmt->fetchAll();

        foreach ($raw_events as $ev) {
            $events[] = [
                'id'         => $ev['id'],
                'event_type' => $ev['event_type'],
                'points'     => (int)$ev['points'],
                'created_at' => $ev['created_at'],
                'metadata'   => !empty($ev['metadata_json']) ? json_decode($ev['metadata_json'], true) : null
            ];
        }
    } catch (PDOException $e) {
        error_log('Query karma error: ' . $e->getMessage());
    }
}

$badge = calculateBadge($total_points);

echo json_encode([
    'success' => true,
    'user_id' => $user_id,
    'total_karma' => $total_points,
    'badge' => $badge,
    'events' => $events
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
