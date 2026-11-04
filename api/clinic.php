<?php
/**
 * API BÁC SĨ CÂY TRỒNG (PLANT CLINIC) - YEUTRONGECAY.COM
 * Tiếp nhận chẩn đoán bệnh cây và lưu trữ cơ sở dữ liệu MySQL
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

require_once __DIR__ . '/db.php';

$pdo = getDbConnection();

// Xử lý GET: Lấy danh sách câu hỏi phòng khám
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!$pdo) {
        echo json_encode([
            'success' => true,
            'database' => 'not_configured',
            'data' => []
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        $stmt = $pdo->query("SELECT * FROM clinic_questions WHERE status = 'visible' ORDER BY created_at DESC LIMIT 30");
        $questions = $stmt->fetchAll();

        foreach ($questions as &$q) {
            $q['symptoms'] = !empty($q['symptoms_json']) ? json_decode($q['symptoms_json'], true) : [];
            $q['images']   = !empty($q['images_json']) ? json_decode($q['images_json'], true) : [];
            unset($q['symptoms_json'], $q['images_json']);
        }

        echo json_encode([
            'success' => true,
            'database' => 'connected',
            'total' => count($questions),
            'data' => $questions
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Lỗi truy vấn danh sách câu hỏi: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

// Xử lý POST: Gửi câu hỏi mới
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw_input = file_get_contents('php://input');
    $data = json_decode($raw_input, true) ?: $_POST;

    // Honeypot chống bot
    if (!empty($data['website_url'])) {
        echo json_encode(['success' => true, 'message' => 'Đã tiếp nhận']);
        exit;
    }

    $plant_hint  = isset($data['plant_name_hint']) ? trim(htmlspecialchars($data['plant_name_hint'], ENT_QUOTES, 'UTF-8')) : 'Cây trồng';
    $description = isset($data['description']) ? trim(htmlspecialchars($data['description'], ENT_QUOTES, 'UTF-8')) : '';
    $region      = in_array($data['region'] ?? '', ['north', 'central', 'south']) ? $data['region'] : 'south';
    $symptoms    = is_array($data['symptoms'] ?? null) ? $data['symptoms'] : [];
    $user_name   = isset($data['user_name']) ? trim(htmlspecialchars($data['user_name'], ENT_QUOTES, 'UTF-8')) : 'Chủ Vườn';
    $images      = is_array($data['images'] ?? null) ? $data['images'] : [];

    if (empty($description)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Vui lòng nhập mô tả tình trạng cây cần bác sĩ chẩn đoán.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $id = 'case-' . time() . '-' . rand(100, 999);
    $user_id = 'usr-' . substr(md5($_SERVER['REMOTE_ADDR'] ?? 'guest'), 0, 8);
    $symptoms_text = !empty($symptoms) ? implode(', ', $symptoms) : 'Suy yếu chung';
    $title = "Cây {$plant_hint} gặp tình trạng: {$symptoms_text}";

    // Tạo chẩn đoán AI lập tức theo khu vực và triệu chứng
    $region_names = ['north' => 'Miền Bắc', 'central' => 'Miền Trung', 'south' => 'Miền Nam'];
    $region_vn = $region_names[$region] ?? 'Toàn quốc';

    $ai_instant_diagnosis = "Phân tích AI tức thì (khu vực {$region_vn}): Cây {$plant_hint} có dấu hiệu {$symptoms_text}. Khuyến nghị: 1) Tạm ngưng bón phân hóa học ngay; 2) Kiểm tra lỗ thoát nước đáy chậu tránh úng thối rễ; 3) Cách ly chậu cây khỏi các bụi cây khỏe khác; 4) Sử dụng chế phẩm sinh học tỏi - ớt - gừng hoặc nấm Trichoderma để dưỡng rễ phục hồi.";

    $saved_db = false;
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO clinic_questions (
                id, user_id, user_name, title, description, plant_name_hint, region,
                symptoms_json, images_json, ai_instant_diagnosis, status
            ) VALUES (
                :id, :user_id, :user_name, :title, :description, :plant_hint, :region,
                :symptoms_json, :images_json, :ai_diagnosis, 'visible'
            )");
            $stmt->execute([
                ':id'           => $id,
                ':user_id'      => $user_id,
                ':user_name'    => $user_name,
                ':title'        => $title,
                ':description'  => $description,
                ':plant_hint'   => $plant_hint,
                ':region'       => $region,
                ':symptoms_json'=> json_encode($symptoms, JSON_UNESCAPED_UNICODE),
                ':images_json'  => json_encode($images, JSON_UNESCAPED_UNICODE),
                ':ai_diagnosis' => $ai_instant_diagnosis
            ]);
            $saved_db = true;
        } catch (PDOException $e) {
            error_log('Clinic DB Insert Error: ' . $e->getMessage());
        }
    }

    echo json_encode([
        'success' => true,
        'saved_to_database' => $saved_db,
        'data' => [
            'id' => $id,
            'user_id' => $user_id,
            'user_name' => $user_name,
            'title' => $title,
            'description' => $description,
            'plant_name_hint' => $plant_hint,
            'region' => $region,
            'symptoms' => $symptoms,
            'images' => $images,
            'ai_instant_diagnosis' => $ai_instant_diagnosis,
            'status' => 'visible',
            'created_at' => date('Y-m-d H:i:s')
        ]
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}
