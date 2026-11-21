<?php
/**
 * API QUẢN TRỊ VIÊN & KIỂM DUYỆT (ADMIN & MODERATION PORTAL) - YEUTRONGECAY.COM
 * Cung cấp thống kê hệ thống, kiểm duyệt báo cáo vi phạm, quản lý ca bệnh và tin đổi cây.
 * 
 * Bảo mật:
 * - Yêu cầu xác thực Admin Token (X-Admin-Token hoặc Bearer token)
 * - 100% PDO Prepared Statements chống SQL Injection
 * - Có cơ chế Fallback Offline khi cơ sở dữ liệu chưa sẵn sàng
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
if (in_array($origin, $allowed_origins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-Admin-Token");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

// Đọc cấu hình bảo mật đa tầng
$config = function_exists('getYtcConfig') ? getYtcConfig() : [];
$masterToken = trim($config['security']['admin_token'] ?? '');
$adminUser = trim($config['security']['admin_username'] ?? '');
$adminPass = trim($config['security']['admin_password'] ?? '');

// Nếu chưa cấu hình bảo mật, chặn toàn bộ để tránh rò rỉ hoặc bypass
if (empty($masterToken) || empty($adminUser) || empty($adminPass)) {
    http_response_code(503);
    echo json_encode([
        'success' => false,
        'message' => 'Cổng quản trị chưa được kích hoạt bảo mật. Vui lòng thiết lập admin_token, admin_username và admin_password trong config.php'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Lấy dữ liệu gửi lên
$rawInput = file_get_contents('php://input');
$requestData = json_decode($rawInput, true) ?: $_POST;
$action = $_GET['action'] ?? $requestData['action'] ?? 'stats';

// ----------------------------------------------------
// 1. XỬ LÝ ĐĂNG NHẬP ADMIN (Không cần token trước)
// ----------------------------------------------------
if ($action === 'login') {
    $username = trim($requestData['username'] ?? '');
    $password = trim($requestData['password'] ?? '');

    if (($username === $adminUser && $password === $adminPass) || $password === $masterToken) {
        echo json_encode([
            'success' => true,
            'token' => $masterToken,
            'user' => [
                'name' => 'Ban Quản Trị Yêu Trồng Cây',
                'username' => 'admin',
                'role' => 'super_admin',
                'permissions' => ['moderate_reports', 'manage_clinic', 'manage_swaps', 'manage_plants']
            ],
            'message' => 'Đăng nhập trang quản trị thành công'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => 'Tên đăng nhập hoặc mật khẩu quản trị không chính xác'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ----------------------------------------------------
// 2. XÁC THỰC ADMIN TOKEN CHO TẤT CẢ TÁC VỤ TIẾP THEO
// ----------------------------------------------------
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$xAdminToken = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';
$bearerToken = '';
if (preg_match('/Bearer\s+(\S+)/', $authHeader, $matches)) {
    $bearerToken = $matches[1];
}

$clientToken = $xAdminToken ?: ($bearerToken ?: ($requestData['token'] ?? ($_GET['token'] ?? '')));

if ($clientToken !== $masterToken) {
    http_response_code(403);
    echo json_encode([
        'success' => false,
        'message' => 'Yêu cầu quyền Quản trị viên (Admin Token không hợp lệ hoặc đã hết hạn)'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$pdo = getDbConnection();

// ----------------------------------------------------
// 3. XỬ LÝ ACTION: STATS (Thống kê tổng quan hệ thống)
// ----------------------------------------------------
if ($action === 'stats') {
    if (!$pdo) {
        // Mock fallback statistics
        echo json_encode([
            'success' => true,
            'database' => 'offline_fallback',
            'stats' => [
                'total_plants' => 50,
                'total_clinic_cases' => 3,
                'total_swaps' => 4,
                'pending_reports' => 1,
                'total_reports' => 2,
                'server_time' => date('Y-m-d H:i:s'),
                'php_version' => PHP_VERSION
            ]
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        $countPlants = $pdo->query("SELECT COUNT(*) FROM plants")->fetchColumn();
        $countClinic = 0;
        $countSwaps = 0;
        $pendingReports = 0;
        $totalReports = 0;

        // Bảng clinic_questions nếu có
        try {
            $countClinic = $pdo->query("SELECT COUNT(*) FROM clinic_questions")->fetchColumn();
        } catch (Exception $e) {}

        // Bảng swap_offers nếu có
        try {
            $countSwaps = $pdo->query("SELECT COUNT(*) FROM swap_offers")->fetchColumn();
        } catch (Exception $e) {}

        // Bảng reports nếu có
        try {
            $pendingReports = $pdo->query("SELECT COUNT(*) FROM reports WHERE status = 'pending'")->fetchColumn();
            $totalReports = $pdo->query("SELECT COUNT(*) FROM reports")->fetchColumn();
        } catch (Exception $e) {}

        echo json_encode([
            'success' => true,
            'database' => 'connected',
            'stats' => [
                'total_plants' => (int)$countPlants,
                'total_clinic_cases' => (int)$countClinic,
                'total_swaps' => (int)$countSwaps,
                'pending_reports' => (int)$pendingReports,
                'total_reports' => (int)$totalReports,
                'server_time' => date('Y-m-d H:i:s'),
                'php_version' => PHP_VERSION
            ]
        ], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        exit;
    }
}

// ----------------------------------------------------
// 4. XỬ LÝ ACTION: GET_REPORTS (Danh sách báo cáo vi phạm)
// ----------------------------------------------------
if ($action === 'get_reports') {
    $filter = $_GET['filter'] ?? 'all';

    if (!$pdo) {
        // Mock fallback reports
        $mockReports = [
            [
                'id' => 1,
                'ticket_id' => 'REP-MOCK01',
                'target_type' => 'swap_offer',
                'target_id' => 'swp-test-01',
                'reason' => 'commercial_ad',
                'note' => 'Tin rao bán phân bón công nghiệp trá hình không đúng tiêu chí trao đổi phi lợi nhuận.',
                'reporter_ip' => '14.162.x.x',
                'status' => 'pending',
                'created_at' => date('Y-m-d H:i:s', strtotime('-2 hours'))
            ],
            [
                'id' => 2,
                'ticket_id' => 'REP-MOCK02',
                'target_type' => 'clinic_question',
                'target_id' => 'cln-sample-02',
                'reason' => 'dangerous_medical_advice',
                'note' => 'Người dùng khuyên dùng thuốc trừ sâu hóa học nồng độ đậm đặc cho rau xà lách.',
                'reporter_ip' => '113.190.x.x',
                'status' => 'action_taken',
                'created_at' => date('Y-m-d H:i:s', strtotime('-1 day'))
            ]
        ];

        if ($filter !== 'all') {
            $mockReports = array_values(array_filter($mockReports, fn($r) => $r['status'] === $filter));
        }

        echo json_encode([
            'success' => true,
            'reports' => $mockReports
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        $sql = "SELECT * FROM reports";
        $params = [];
        if ($filter !== 'all') {
            $sql .= " WHERE status = :status";
            $params[':status'] = $filter;
        }
        $sql .= " ORDER BY created_at DESC LIMIT 100";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $reports = $stmt->fetchAll();

        echo json_encode([
            'success' => true,
            'reports' => $reports
        ], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        exit;
    }
}

// ----------------------------------------------------
// 5. XỬ LÝ ACTION: UPDATE_REPORT (Xử lý báo cáo vi phạm)
// ----------------------------------------------------
if ($action === 'update_report') {
    $ticketId = trim($requestData['ticket_id'] ?? '');
    $newStatus = trim($requestData['status'] ?? 'reviewed'); // reviewed, dismissed, action_taken
    $hideTarget = !empty($requestData['hide_target']);

    if (empty($ticketId)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Thiếu mã ticket_id']);
        exit;
    }

    if (!$pdo) {
        echo json_encode([
            'success' => true,
            'message' => "Đã cập nhật trạng thái báo cáo $ticketId thành $newStatus (Chế độ lưu tạm)",
            'ticket_id' => $ticketId,
            'status' => $newStatus
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        // Lấy thông tin report
        $stmt = $pdo->prepare("SELECT target_type, target_id FROM reports WHERE ticket_id = :tid LIMIT 1");
        $stmt->execute([':tid' => $ticketId]);
        $report = $stmt->fetch();

        if ($report) {
            $targetType = $report['target_type'];
            $targetId = $report['target_id'];

            // Nếu người kiểm duyệt chọn "Ẩn nội dung vi phạm"
            if ($hideTarget) {
                if ($targetType === 'clinic_question') {
                    $pdo->prepare("UPDATE clinic_questions SET status = 'hidden' WHERE id = :id")->execute([':id' => $targetId]);
                } else if ($targetType === 'swap_offer') {
                    $pdo->prepare("UPDATE swap_offers SET status = 'hidden' WHERE id = :id")->execute([':id' => $targetId]);
                } else if ($targetType === 'comment' || $targetType === 'clinic_answer') {
                    $pdo->prepare("UPDATE clinic_answers SET status = 'hidden' WHERE id = :id")->execute([':id' => $targetId]);
                }
            }

            // Cập nhật trạng thái report
            $upStmt = $pdo->prepare("UPDATE reports SET status = :status WHERE ticket_id = :tid");
            $upStmt->execute([':status' => $newStatus, ':tid' => $ticketId]);
        }

        echo json_encode([
            'success' => true,
            'message' => "Đã xử lý báo cáo $ticketId thành công.",
            'ticket_id' => $ticketId,
            'status' => $newStatus
        ], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        exit;
    }
}

// ----------------------------------------------------
// 6. XỬ LÝ ACTION: GET_CLINIC_CASES & TOGGLE_STATUS
// ----------------------------------------------------
if ($action === 'get_clinic_cases') {
    if (!$pdo) {
        echo json_encode([
            'success' => true,
            'cases' => []
        ]);
        exit;
    }

    try {
        $stmt = $pdo->query("SELECT id, user_name, title, description, plant_name_hint, region, status, created_at FROM clinic_questions ORDER BY created_at DESC LIMIT 50");
        $cases = $stmt->fetchAll();
        echo json_encode(['success' => true, 'cases' => $cases], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        echo json_encode(['success' => true, 'cases' => []]);
        exit;
    }
}

if ($action === 'toggle_clinic_status') {
    $id = trim($requestData['id'] ?? '');
    $status = trim($requestData['status'] ?? 'visible'); // visible / hidden

    if ($pdo && !empty($id)) {
        try {
            $stmt = $pdo->prepare("UPDATE clinic_questions SET status = :status WHERE id = :id");
            $stmt->execute([':status' => $status, ':id' => $id]);
        } catch (PDOException $e) {}
    }

    echo json_encode(['success' => true, 'id' => $id, 'status' => $status]);
    exit;
}

// ----------------------------------------------------
// 7. XỬ LÝ ACTION: GET_SWAPS & TOGGLE_STATUS
// ----------------------------------------------------
if ($action === 'get_swaps') {
    if (!$pdo) {
        echo json_encode(['success' => true, 'swaps' => []]);
        exit;
    }

    try {
        $stmt = $pdo->query("SELECT id, user_name, region_zone, location_name, plant_name, offer_type, item_type, status, created_at FROM swap_offers ORDER BY created_at DESC LIMIT 50");
        $swaps = $stmt->fetchAll();
        echo json_encode(['success' => true, 'swaps' => $swaps], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        echo json_encode(['success' => true, 'swaps' => []]);
        exit;
    }
}

if ($action === 'toggle_swap_status') {
    $id = trim($requestData['id'] ?? '');
    $status = trim($requestData['status'] ?? 'visible'); // visible / hidden

    if ($pdo && !empty($id)) {
        try {
            $stmt = $pdo->prepare("UPDATE swap_offers SET status = :status WHERE id = :id");
            $stmt->execute([':status' => $status, ':id' => $id]);
        } catch (PDOException $e) {}
    }

    echo json_encode(['success' => true, 'id' => $id, 'status' => $status]);
    exit;
}

// ----------------------------------------------------
// 8. XỬ LÝ ACTION: GET_PLANTS (Danh mục loài cây)
// ----------------------------------------------------
if ($action === 'get_plants') {
    if (!$pdo) {
        echo json_encode(['success' => true, 'plants' => []]);
        exit;
    }

    try {
        $stmt = $pdo->query("SELECT id, slug, common_name, scientific_name, category, container_suitable FROM plants ORDER BY category ASC, common_name ASC");
        $plants = $stmt->fetchAll();
        echo json_encode(['success' => true, 'plants' => $plants], JSON_UNESCAPED_UNICODE);
        exit;
    } catch (PDOException $e) {
        echo json_encode(['success' => true, 'plants' => []]);
        exit;
    }
}

// ----------------------------------------------------
// 9. XỬ LÝ ACTION: GET_AUTOPOST_STATUS & TRIGGER_AUTOPOST_TEST
// ----------------------------------------------------
if ($action === 'get_autopost_status') {
    $fbConf = $config['facebook'] ?? [];
    $hasToken = !empty($fbConf['page_access_token']) && strpos($fbConf['page_access_token'], 'YOUR_') !== 0;

    $totalQueued = 0;
    $postedCount = 0;
    $pendingCount = 0;
    $categories = [];
    $logs = [];
    $nextItem = null;

    if ($pdo) {
        try {
            $totalQueued = (int)$pdo->query("SELECT COUNT(*) FROM social_post_queue WHERE is_active = 1")->fetchColumn();
            $postedCount = (int)$pdo->query("SELECT COUNT(*) FROM social_post_queue WHERE is_active = 1 AND post_count > 0")->fetchColumn();
            $pendingCount = (int)$pdo->query("SELECT COUNT(*) FROM social_post_queue WHERE is_active = 1 AND post_count = 0")->fetchColumn();

            $catStmt = $pdo->query("SELECT category_slug, category_label, COUNT(*) as count FROM social_post_queue WHERE is_active = 1 GROUP BY category_slug, category_label");
            $categories = $catStmt->fetchAll();

            $nextStmt = $pdo->query("SELECT ref_slug, category_slug, category_label, target_url, post_count, last_posted_at FROM social_post_queue WHERE is_active = 1 ORDER BY last_posted_at ASC, id ASC LIMIT 1");
            $nextItem = $nextStmt->fetch() ?: null;

            $logStmt = $pdo->query("SELECT * FROM social_post_logs ORDER BY id DESC LIMIT 15");
            $logs = $logStmt->fetchAll();
        } catch (\Throwable $e) {}
    }

    echo json_encode([
        'success'       => true,
        'config'        => [
            'enabled'   => !empty($fbConf['enabled']),
            'page_id'   => !empty($fbConf['page_id']) ? substr($fbConf['page_id'], 0, 4) . '***' : '',
            'has_token' => $hasToken,
            'schedule'  => '08:00 Sáng hàng ngày (Asia/Ho_Chi_Minh)'
        ],
        'metrics'       => [
            'total_queued'  => $totalQueued,
            'posted_count'  => $postedCount,
            'pending_count' => $pendingCount,
            'categories'    => $categories
        ],
        'next_post'     => $nextItem,
        'recent_logs'   => $logs,
        'server_time'   => date('Y-m-d H:i:s')
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

if ($action === 'trigger_autopost_test') {
    $_GET['force'] = '1';
    ob_start();
    require __DIR__ . '/cron_fb_autopost.php';
    $output = ob_get_clean();

    $decoded = json_decode($output, true);
    if ($decoded) {
        echo json_encode($decoded, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    } else {
        echo json_encode([
            'success' => false,
            'raw_output' => $output
        ], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

// Default fallback
echo json_encode([
    'success' => false,
    'message' => 'Action không được hỗ trợ'
]);
