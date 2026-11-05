<?php
/**
 * API BÁC SĨ CÂY TRỒNG (PLANT CLINIC) & CÂU TRẢ LỜI HIỆU QUẢ - YEUTRONGECAY.COM
 * Tiếp nhận chẩn đoán bệnh cây, xác nhận câu trả lời đúng (Verified Answers),
 * tính điểm Karma (H9) và kiểm duyệt tự động Sách Đỏ / loài xâm hại (H6, H15)
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
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';
$pdo = getDbConnection();

// Tự động khởi tạo bảng clinic_answers & user_events & prohibited_species nếu chưa có
if ($pdo) {
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS clinic_answers (
            id VARCHAR(50) PRIMARY KEY,
            question_id VARCHAR(36) NOT NULL,
            user_id VARCHAR(50) NOT NULL,
            author_name VARCHAR(150) NOT NULL,
            author_badge VARCHAR(100) DEFAULT NULL,
            content TEXT NOT NULL,
            upvotes INT DEFAULT 0,
            is_verified BOOLEAN DEFAULT FALSE,
            status ENUM('visible', 'pending', 'hidden') DEFAULT 'visible',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_question (question_id),
            INDEX idx_user (user_id),
            INDEX idx_verified (is_verified)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

        $pdo->exec("CREATE TABLE IF NOT EXISTS user_events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id VARCHAR(50) NOT NULL,
            event_type ENUM('post_question', 'post_answer', 'verify_answer', 'share_seed', 'like_answer', 'report_accepted') NOT NULL,
            points INT NOT NULL,
            reference_id VARCHAR(50) DEFAULT NULL,
            metadata_json JSON DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_user (user_id),
            INDEX idx_event (event_type)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    } catch (PDOException $e) {
        error_log('Auto create clinic tables error: ' . $e->getMessage());
    }
}

// Hàm ghi nhận sự kiện Karma (H9)
function logUserKarmaEvent($pdo, $user_id, $event_type, $points, $reference_id = null, $metadata = []) {
    if (!$pdo || empty($user_id)) return;
    try {
        $stmt = $pdo->prepare("INSERT INTO user_events (user_id, event_type, points, reference_id, metadata_json)
                               VALUES (:user_id, :event_type, :points, :reference_id, :metadata_json)");
        $stmt->execute([
            ':user_id'       => $user_id,
            ':event_type'    => $event_type,
            ':points'        => $points,
            ':reference_id'  => $reference_id,
            ':metadata_json' => json_encode($metadata, JSON_UNESCAPED_UNICODE)
        ]);
    } catch (Exception $e) {
        error_log('Log Karma Event Error: ' . $e->getMessage());
    }
}

// Hàm kiểm duyệt từ khóa cấm, Sách Đỏ và loài xâm hại nguy hiểm (H6, H15)
function checkContentModeration($text) {
    $banned_terms = [
        // Sách Đỏ & Khai thác tự nhiên trái phép (NĐ 06/2019/NĐ-CP)
        'lan hài việt nam' => 'Lan hài thuộc Nhóm IA cấm khai thác mua bán tự nhiên.',
        'lan hài' => 'Lan hài thuộc danh mục Sách Đỏ cần bảo vệ nguồn gen.',
        'lan kim tuyến rừng' => 'Lan kim tuyến rừng thuộc Nhóm IA nghiêm cấm thương mại hoá hoang dã.',
        'anoectochilus' => 'Lan gấm kim tuyến rừng tự nhiên bị nghiêm cấm khai thác trái phép.',
        'sâm ngọc linh rừng' => 'Chỉ trao đổi sâm có chỉ dẫn địa lý và kiểm định vườn ươm.',
        // Ngoại lai xâm hại nguy hiểm (TT 35/2018/TT-BTNMT)
        'mai dương' => 'Cây mai dương (trinh nữ móc gai) là loài ngoại lai xâm hại nguy hiểm.',
        'trinh nữ móc gai' => 'Loài xâm hại đe dọa đa dạng sinh học nông nghiệp.',
        'mimosa pigra' => 'Cây mai dương bị cấm phát tán theo quy định môi trường.',
        'ốc bươu vàng' => 'Loài phá hoại mùa màng, cấm nhân nuôi và phát tán.',
        'cúc bò lan' => 'Loài cúc ngoại lai xâm lấn đồng cỏ và đất canh tác.',
        // Hóa chất BVTV bị cấm hoàn toàn tại Việt Nam
        'paraquat' => 'Chất diệt cỏ cực độc đã bị cấm hoàn toàn tại Việt Nam.',
        '2,4-d' => 'Hóa chất độc hại bị cấm lưu hành trong nông nghiệp đô thị.',
        'chlorpyrifos' => 'Hoạt chất trừ sâu cực độc đã bị loại khỏi danh mục được phép sử dụng.',
        // Tuyên bố y tế nguy hại / Thần dược chữa ung thư trái phép
        'chữa khỏi ung thư' => 'Tuyên bố y tế nguy hại, vi phạm đạo luật y tế công cộng.',
        'trị dứt điểm ung thư' => 'Tuyên bố thần dược sai sự thật, gây nguy hiểm cho người bệnh.',
        'uống thay thuốc tây' => 'Khuyến nghị ngưng thuốc tây y tế là hành vi nguy hiểm.',
        'thần dược' => 'Dấu hiệu quảng cáo gian dối / cường điệu công dụng thảo dược.',
        // Chất cấm & Cờ bạc
        'cần sa' => 'Cây có chứa chất ma túy bị nghiêm cấm.',
        'cây anh túc' => 'Cây thuốc phiện bị nghiêm cấm trồng và lưu hành.',
        'kubet' => 'Spam cờ bạc bị chặn tự động.',
        'cá độ' => 'Nội dung spam bị chặn tự động.'
    ];

    $lower = mb_strtolower($text, 'UTF-8');
    foreach ($banned_terms as $kw => $msg) {
        if (mb_strpos($lower, $kw) !== false) {
            return ['flagged' => true, 'keyword' => $kw, 'message' => $msg];
        }
    }
    return ['flagged' => false, 'keyword' => '', 'message' => ''];
}

// -------------------------------------------------------------------------
// 1. XỬ LÝ GET: LẤY DANH SÁCH CÂU HỎI KÈM CÂU TRẢ LỜI ĐÃ XÁC NHẬN (VERIFIED)
// -------------------------------------------------------------------------
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

        // Lấy danh sách câu trả lời cho các câu hỏi
        $q_ids = array_column($questions, 'id');
        $answers_by_qid = [];

        if (!empty($q_ids)) {
            $in_clause = implode(',', array_fill(0, count($q_ids), '?'));
            $ans_stmt = $pdo->prepare("SELECT * FROM clinic_answers WHERE question_id IN ($in_clause) AND status = 'visible' ORDER BY is_verified DESC, upvotes DESC, created_at ASC");
            $ans_stmt->execute($q_ids);
            $raw_answers = $ans_stmt->fetchAll();

            foreach ($raw_answers as $ans) {
                $answers_by_qid[$ans['question_id']][] = [
                    'id'           => $ans['id'],
                    'question_id'  => $ans['question_id'],
                    'user_id'      => $ans['user_id'],
                    'author_name'  => $ans['author_name'],
                    'author_badge' => $ans['author_badge'],
                    'content'      => $ans['content'],
                    'upvotes'      => (int)$ans['upvotes'],
                    'is_verified'  => (bool)$ans['is_verified'],
                    'created_at'   => $ans['created_at']
                ];
            }
        }

        foreach ($questions as &$q) {
            $q['symptoms'] = !empty($q['symptoms_json']) ? json_decode($q['symptoms_json'], true) : [];
            $q['images']   = !empty($q['images_json']) ? json_decode($q['images_json'], true) : [];
            $q['answers']  = $answers_by_qid[$q['id']] ?? [];
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

// -------------------------------------------------------------------------
// 2. XỬ LÝ POST: THÊM CÂU HỎI, CÂU TRẢ LỜI, XÁC NHẬN HIỆU QUẢ HOẶC UPVOTE
// -------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw_input = file_get_contents('php://input');
    $data = json_decode($raw_input, true) ?: $_POST;

    // Honeypot chống bot
    if (!empty($data['website_url'])) {
        echo json_encode(['success' => true, 'message' => 'Đã tiếp nhận']);
        exit;
    }

    $action = $data['action'] ?? 'submit_question';

    // ----------------------------------------------------
    // ACTION A: GỬI CÂU TRẢ LỜI / LỜI KHUYÊN (ADD ANSWER)
    // ----------------------------------------------------
    if ($action === 'submit_answer') {
        $question_id  = trim($data['question_id'] ?? '');
        $user_id      = trim($data['user_id'] ?? ('usr-' . substr(md5($_SERVER['REMOTE_ADDR'] ?? 'guest'), 0, 8)));
        $author_name  = trim(htmlspecialchars($data['author_name'] ?? 'Chủ Vườn', ENT_QUOTES, 'UTF-8'));
        $author_badge = trim(htmlspecialchars($data['author_badge'] ?? 'Thành Viên Tích Cực', ENT_QUOTES, 'UTF-8'));
        $content      = trim(htmlspecialchars($data['content'] ?? '', ENT_QUOTES, 'UTF-8'));

        if (empty($question_id) || empty($content)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Vui lòng nhập nội dung lời khuyên']);
            exit;
        }

        // Kiểm duyệt nội dung trả lời (H6, H15)
        $mod_check = checkContentModeration($content);
        $status = $mod_check['flagged'] ? 'pending' : 'visible';

        $answer_id = 'ans-' . time() . '-' . rand(100, 999);
        $saved = false;

        if ($pdo) {
            try {
                $stmt = $pdo->prepare("INSERT INTO clinic_answers (id, question_id, user_id, author_name, author_badge, content, upvotes, is_verified, status)
                                       VALUES (:id, :qid, :uid, :aname, :abadge, :content, 0, 0, :status)");
                $stmt->execute([
                    ':id'      => $answer_id,
                    ':qid'     => $question_id,
                    ':uid'     => $user_id,
                    ':aname'   => $author_name,
                    ':abadge'  => $author_badge,
                    ':content' => $content,
                    ':status'  => $status
                ]);
                $saved = true;

                // Cộng điểm Karma cho người trả lời (+10 điểm)
                if ($status === 'visible') {
                    logUserKarmaEvent($pdo, $user_id, 'post_answer', 10, $answer_id, [
                        'question_id' => $question_id,
                        'author_name' => $author_name
                    ]);
                }
            } catch (PDOException $e) {
                error_log('Insert clinic answer error: ' . $e->getMessage());
            }
        }

        echo json_encode([
            'success' => true,
            'action' => 'submit_answer',
            'saved_to_database' => $saved,
            'moderation_warning' => $mod_check['flagged'] ? $mod_check['message'] : null,
            'data' => [
                'id'           => $answer_id,
                'question_id'  => $question_id,
                'user_id'      => $user_id,
                'author_name'  => $author_name,
                'author_badge' => $author_badge,
                'content'      => $content,
                'upvotes'      => 0,
                'is_verified'  => false,
                'status'       => $status,
                'created_at'   => date('Y-m-d H:i:s')
            ]
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ----------------------------------------------------
    // ACTION B: XÁC NHẬN CÂU TRẢ LỜI HIỆU QUẢ (VERIFY ANSWER)
    // ----------------------------------------------------
    if ($action === 'verify_answer') {
        $question_id = trim($data['question_id'] ?? '');
        $answer_id   = trim($data['answer_id'] ?? '');
        $actor_id    = trim($data['user_id'] ?? '');

        if (empty($question_id) || empty($answer_id)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Thiếu mã câu hỏi hoặc câu trả lời']);
            exit;
        }

        $verified = false;
        if ($pdo) {
            try {
                // Đánh dấu câu trả lời này là is_verified = 1
                $stmt = $pdo->prepare("UPDATE clinic_answers SET is_verified = TRUE WHERE id = :aid AND question_id = :qid");
                $stmt->execute([':aid' => $answer_id, ':qid' => $question_id]);
                $verified = true;

                // Lấy thông tin tác giả câu trả lời để thưởng Karma (+25 điểm)
                $ans_info = $pdo->prepare("SELECT user_id, author_name FROM clinic_answers WHERE id = :aid");
                $ans_info->execute([':aid' => $answer_id]);
                $author = $ans_info->fetch();

                if ($author && !empty($author['user_id'])) {
                    logUserKarmaEvent($pdo, $author['user_id'], 'verify_answer', 25, $answer_id, [
                        'question_id' => $question_id,
                        'verified_by' => $actor_id
                    ]);
                }
            } catch (PDOException $e) {
                error_log('Verify answer error: ' . $e->getMessage());
            }
        }

        echo json_encode([
            'success' => true,
            'action' => 'verify_answer',
            'is_verified' => true,
            'answer_id' => $answer_id
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ----------------------------------------------------
    // ACTION C: THÍCH / HỮU ÍCH (UPVOTE ANSWER)
    // ----------------------------------------------------
    if ($action === 'upvote_answer') {
        $answer_id = trim($data['answer_id'] ?? '');
        if (empty($answer_id)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Thiếu answer_id']);
            exit;
        }

        $new_upvotes = 1;
        if ($pdo) {
            try {
                $stmt = $pdo->prepare("UPDATE clinic_answers SET upvotes = upvotes + 1 WHERE id = :aid");
                $stmt->execute([':aid' => $answer_id]);

                $get_votes = $pdo->prepare("SELECT upvotes, user_id FROM clinic_answers WHERE id = :aid");
                $get_votes->execute([':aid' => $answer_id]);
                $row = $get_votes->fetch();
                if ($row) {
                    $new_upvotes = (int)$row['upvotes'];
                    logUserKarmaEvent($pdo, $row['user_id'], 'like_answer', 2, $answer_id);
                }
            } catch (PDOException $e) {
                error_log('Upvote answer error: ' . $e->getMessage());
            }
        }

        echo json_encode([
            'success' => true,
            'action' => 'upvote_answer',
            'answer_id' => $answer_id,
            'upvotes' => $new_upvotes
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ----------------------------------------------------
    // ACTION D: ĐĂNG CÂU HỎI MỚI (SUBMIT QUESTION)
    // ----------------------------------------------------
    $plant_hint  = isset($data['plant_name_hint']) ? trim(htmlspecialchars($data['plant_name_hint'], ENT_QUOTES, 'UTF-8')) : 'Cây trồng';
    $description = isset($data['description']) ? trim(htmlspecialchars($data['description'], ENT_QUOTES, 'UTF-8')) : '';
    $region      = in_array($data['region'] ?? '', ['north', 'central', 'south']) ? $data['region'] : 'south';
    $symptoms    = is_array($data['symptoms'] ?? null) ? $data['symptoms'] : [];
    $user_name   = isset($data['user_name']) ? trim(htmlspecialchars($data['user_name'], ENT_QUOTES, 'UTF-8')) : 'Chủ Vườn';
    $user_id     = isset($data['user_id']) ? trim($data['user_id']) : ('usr-' . substr(md5($_SERVER['REMOTE_ADDR'] ?? 'guest'), 0, 8));
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
    $symptoms_text = !empty($symptoms) ? implode(', ', $symptoms) : 'Suy yếu chung';
    $title = "Cây {$plant_hint} gặp tình trạng: {$symptoms_text}";

    // Tạo chẩn đoán AI lập tức theo khu vực và triệu chứng
    $region_names = ['north' => 'Miền Bắc', 'central' => 'Miền Trung', 'south' => 'Miền Nam'];
    $region_vn = $region_names[$region] ?? 'Toàn quốc';

    $ai_instant_diagnosis = "Phân tích AI tức thì (khu vực {$region_vn}): Cây {$plant_hint} có dấu hiệu {$symptoms_text}. Khuyến nghị: 1) Tạm ngưng bón phân hóa học ngay; 2) Kiểm tra lỗ thoát nước đáy chậu tránh úng thối rễ; 3) Cách ly chậu cây khỏi các bụi cây khỏe khác; 4) Sử dụng chế phẩm sinh học tỏi - ớt - gừng hoặc nấm Trichoderma để dưỡng rễ phục hồi.";

    // Kiểm duyệt nội dung câu hỏi (H6, H15)
    $mod_check = checkContentModeration($title . ' ' . $description . ' ' . $plant_hint);
    $status = $mod_check['flagged'] ? 'pending' : 'visible';

    $saved_db = false;
    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO clinic_questions (
                id, user_id, user_name, title, description, plant_name_hint, region,
                symptoms_json, images_json, ai_instant_diagnosis, status
            ) VALUES (
                :id, :user_id, :user_name, :title, :description, :plant_hint, :region,
                :symptoms_json, :images_json, :ai_diagnosis, :status
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
                ':ai_diagnosis' => $ai_instant_diagnosis,
                ':status'       => $status
            ]);
            $saved_db = true;

            // Thưởng Karma cho người đăng ca bệnh (+5 điểm)
            if ($status === 'visible') {
                logUserKarmaEvent($pdo, $user_id, 'post_question', 5, $id, ['title' => $title]);
            }
        } catch (PDOException $e) {
            error_log('Clinic DB Insert Error: ' . $e->getMessage());
        }
    }

    echo json_encode([
        'success' => true,
        'saved_to_database' => $saved_db,
        'moderation_warning' => $mod_check['flagged'] ? $mod_check['message'] : null,
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
            'answers' => [],
            'status' => $status,
            'created_at' => date('Y-m-d H:i:s')
        ]
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}
