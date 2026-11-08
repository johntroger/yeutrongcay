<?php
/**
 * THUẬT TOÁN RÀ SOÁT TƯƠNG THÍCH NỘI DUNG & HÌNH ẢNH (CIRVA - Backend Engine)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Kiểm soát bắt buộc khi tạo bài viết / ấn phẩm mới:
 * - Chặn 100% ảnh lạc đề, ảnh stock chung chung, ảnh cà phê cho bài thuốc, ảnh châu Âu cho rừng Việt Nam.
 */

function verifyImageContentAlignment(string $category, string $commonName, string $scientificName, string $description, string $imageUrl): array {
    $score = 100;
    $issues = [];
    $suggestions = [];
    $cat = strtolower(trim($category));
    $url = trim($imageUrl);

    // 1. Kiểm tra rỗng hoặc sai định dạng URL
    if (empty($url) || (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://'))) {
        return [
            'is_approved' => false,
            'score' => 0,
            'severity' => 'critical',
            'issues' => ['URL hình ảnh không hợp lệ hoặc bị để trống.'],
            'suggestions' => ['Vui lòng cung cấp URL ảnh trực tiếp bắt đầu bằng https:// (ưu tiên từ Wikimedia Commons).']
        ];
    }

    // 2. Chặn ảnh placeholder
    if (preg_match('/via\.placeholder|placeholder\.com|dummyimage|default-image/i', $url)) {
        $issues[] = 'Hình ảnh là ảnh giữ chỗ tạm thời (placeholder), không có giá trị nội dung.';
        $score -= 50;
    }

    // 3. Quy tắc tiêu cực (Negative Hard Constraints)
    $negativeRules = [
        'forest' => [
            'pattern' => '/coffee|latte|restaurant|burger|pizza|alps|snow-mountain|swiss|canada|rockies|desert|arctic|indoor-living|bedroom|living-room/i',
            'reason' => 'Bài viết Vườn Quốc Gia Việt Nam không được sử dụng ảnh vùng núi tuyết châu Âu, phong cảnh ôn đới nước ngoài hoặc ảnh đồ ăn cà phê.'
        ],
        'culinary' => [
            'pattern' => '/coffee-cup|black-coffee|latte|cappuccino|beer|whiskey|cocktail|vodka|wine-glass|fast-food|burger|pizza|khoai[-_]mo/i',
            'reason' => 'Bài viết Dược thiện & Ẩm thực thảo mộc truyền thống không được sử dụng ảnh tách cà phê, bia rượu phương Tây, thức ăn nhanh hoặc sai lệch tên món ăn đối lập (khoai mỡ tím).'
        ],
        'space' => [
            'pattern' => '/macro-leaf|single-leaf|close-up-leaf|leaf-vein|underwater-coral|bedroom|living-room|bathroom|office-desk/i',
            'reason' => 'Bản vẽ & Thiết kế không gian xanh phải thể hiện cấu trúc giàn leo, vườn tường, kệ tầng, ban công hoặc sân vườn cảnh quan; cấm dùng ảnh cận cảnh 1 chiếc lá hay phòng kín.'
        ],
        'recycle' => [
            'pattern' => '/luxury-car|fashion-model|landfill|toxic-smoke|trash-pile|garbage-dump|urban-bio-materials|saving[-_]life|hospital|patient|surgery|clinical|syringe|blood|needle|infusion[-_]bag|principle\.png|schematic|vector[-_]diagram|flowchart|bernoulli|aerodynamic|tomato[-_]support/i',
            'reason' => 'Bài viết Sáng chế xanh phải minh họa mô hình/dụng cụ tự chế hữu ích thực tế làm vườn; tuyệt đối cấm ảnh dụng cụ y tế/bệnh nhân, sơ đồ vật lý lý thuyết hay bãi rác ô nhiễm.'
        ]
    ];

    if (isset($negativeRules[$cat])) {
        if (preg_match($negativeRules[$cat]['pattern'], $url)) {
            $issues[] = "VI PHẠM QUY TẮC CHUYÊN MỤC [" . strtoupper($cat) . "]: " . $negativeRules[$cat]['reason'];
            $score -= 60;
        }
    }

    // 4. Thưởng điểm cho nguồn ảnh uy tín (Wikimedia Commons)
    if (str_contains($url, 'wikimedia.org') || str_contains($url, 'wikipedia.org')) {
        $score = min(100, $score + 10);
    }

    // 5. Kiểm tra Tiêu Chuẩn Ngữ Cảnh Bắt Buộc theo Chuyên Mục (space, recycle, culinary)
    $positiveKeywordsMap = [
        'forest' => ['cuc-phuong', 'cat-tien', 'phong-nha', 'hoang-lien', 'fansipan', 'con-dao', 'ba-be', 'ba-vi', 'pu-mat', 'tram-chim', 'can-gio', 'u-minh', 'yok-don', 'national-park', 'mangrove', 'lake', 'rainforest', 'vietnam'],
        'culinary' => ['tea', 'syrup', 'honey', 'vinegar', 'sauce', 'soup', 'salt', 'spice', 'chili', 'ginger', 'perilla', 'sugarcane', 'papaya', 'sambal', 'elixir', 'herbal', 'vinaigrette', 'drink', 'broth', 'salad', 'dressing', 'canh', 'bayam', 'kemangi', 'ulek', 'seasoned', 'oil'],
        'space' => ['pergola', 'trellis', 'living-wall', 'vertical-garden', 'terrace', 'balcony', 'atrium', 'courtyard', 'rooftop', 'planter', 'greenhouse', 'urban-garden', 'raised-bed', 'pond', 'hydroponic-tower', 'micro-forest', 'sky-garden', 'roof', 'garden', 'green', 'nest', 'architecture', 'permaculture'],
        'recycle' => ['sip', 'sub-irrigated', 'bokashi', 'compost', 'worm', 'drip', 'irrigation', 'diy', 'upcycle', 'plastic-bottle', 'bucket', 'pvc', 'hydroponic', 'venturi', 'bottle', 'self-watering', 'emitter', 'fertigation', 'fertilizer', 'organic', 'fermentation', 'tank']
    ];

    $cleanUrl = strtolower($url);
    $posKeywords = $positiveKeywordsMap[$cat] ?? [];
    $matchedPositives = 0;
    foreach ($posKeywords as $kw) {
        if (str_contains($cleanUrl, strtolower($kw))) {
            $matchedPositives++;
        }
    }

    if (in_array($cat, ['space', 'recycle', 'culinary'])) {
        if ($matchedPositives === 0) {
            $issues[] = "CHUYÊN MỤC ĐẶC THÙ [" . strtoupper($cat) . "]: Tên tệp ảnh thiếu hoàn toàn các từ khóa ngữ cảnh chuyên mục bắt buộc.";
            $score -= 35;
        }

        // Kiểm tra ẩm thực
        if ($cat === 'culinary') {
            $lowerCommon = mb_strtolower($commonName, 'UTF-8');
            if (str_contains($lowerCommon, 'muối') || str_contains($lowerCommon, 'chấm')) {
                if (!preg_match('/salt|sambal|ulek|mixture|spice|seasoning|seasoned/i', $url)) {
                    $issues[] = 'Bài viết về Muối thảo mộc/Thức chấm thành phẩm nhưng ảnh không phản ánh muối hoặc hỗn hợp gia vị đã qua giã/pha chế.';
                    $score -= 30;
                }
            }
            if (str_contains($lowerCommon, 'dầu giấm') || str_contains($lowerCommon, 'sốt')) {
                if (!preg_match('/vinaigrette|dressing|oil|vinegar|sauce|making/i', $url)) {
                    $issues[] = 'Bài viết về Dầu giấm/Sốt trộn thành phẩm nhưng ảnh là cành lá tươi thô chưa qua chế biến.';
                    $score -= 30;
                }
            }
        }

        // Kiểm tra tái chế
        if ($cat === 'recycle') {
            $lowerCommon = mb_strtolower($commonName, 'UTF-8');
            if (str_contains($lowerCommon, 'chai nhựa') && str_contains($cleanUrl, 'saving_life')) {
                $issues[] = 'Tệp ảnh là ảnh dụng cụ y tế bệnh viện cứu người, sai lệch với mô hình tưới nhỏ giọt làm vườn.';
                $score -= 60;
            }
            if (str_contains($lowerCommon, 'xô sơn') && str_contains($cleanUrl, 'tomato_support')) {
                $issues[] = 'Tệp ảnh chỉ là giàn leo cà chua thường, không thể hiện chậu tự hút nước SIP từ xô/thùng.';
                $score -= 40;
            }
            if (str_contains($lowerCommon, 'venturi') && str_contains($cleanUrl, 'principle')) {
                $issues[] = 'Tệp ảnh là sơ đồ nguyên lý vật lý lý thuyết, không phản ánh bộ châm phân thực tế.';
                $score -= 50;
            }
        }
    }

    // 6. Kiểm tra tính hiện diện của từ khóa thực thể (Botanical)
    $cleanCommon = preg_replace('/[^a-z0-9]/', '', strtolower($commonName));
    $cleanSci = preg_replace('/[^a-z0-9]/', '', strtolower($scientificName));
    $cleanUrl = strtolower($url);

    if (in_array($cat, ['herb', 'fruit', 'ornamental'])) {
        $hasNameMatch = !empty($cleanCommon) && str_contains($cleanUrl, substr($cleanCommon, 0, 6));
        $hasSciMatch = !empty($cleanSci) && str_contains($cleanUrl, substr($cleanSci, 0, 6));
        if ($hasNameMatch || $hasSciMatch) {
            $score = min(100, $score + 15);
        }
    }

    $score = max(0, min(100, $score));
    $isApproved = ($score >= 70 && empty(array_filter($issues, fn($i) => str_contains($i, 'VI PHẠM QUY TẮC'))));
    $severity = $score < 60 ? 'critical' : ($score < 75 ? 'warning' : 'pass');

    if (!$isApproved && empty($suggestions)) {
        if ($cat === 'forest') {
            $suggestions[] = 'Tra cứu ảnh phong cảnh chính xác của Vườn quốc gia Việt Nam trên Wikimedia Commons.';
        } elseif ($cat === 'culinary') {
            $suggestions[] = 'Sử dụng ảnh bát/ấm/ly thành phẩm bài thuốc hoặc nguyên liệu thảo mộc tươi tự nhiên.';
        } elseif ($cat === 'space') {
            $suggestions[] = 'Sử dụng ảnh giàn pergola, hệ module tường cây hoặc kệ trồng tầng ban công thực tế.';
        } elseif ($cat === 'recycle') {
            $suggestions[] = 'Sử dụng ảnh mô hình tự chế (chậu SIP, thùng Bokashi, hệ thống tưới nhỏ giọt...).';
        }
    }

    return [
        'is_approved' => $isApproved,
        'score' => $score,
        'severity' => $severity,
        'issues' => $issues,
        'suggestions' => $suggestions
    ];
}

/**
 * Kiểm tra tính sống (Liveness), Content-Type và dung lượng của URL hình ảnh
 */
function verifyImageUrlLiveness(string $url): array {
    $url = trim($url);
    if (empty($url) || (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://'))) {
        return [
            'is_live' => false,
            'http_code' => 0,
            'error' => 'URL không hợp lệ hoặc để trống'
        ];
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 3);
    curl_setopt($ch, CURLOPT_USERAGENT, 'YeuTrongCayBot/1.0 (https://yeutrongcay.com; contact@yeutrongcay.com)');
    
    curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    $contentLength = curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
    $error = curl_error($ch);
    curl_close($ch);

    if ($httpCode !== 200) {
        return [
            'is_live' => false,
            'http_code' => $httpCode,
            'error' => "Máy chủ ảnh phản hồi mã HTTP {$httpCode}" . ($error ? " ($error)" : "")
        ];
    }

    if (!empty($contentType) && !str_starts_with(strtolower($contentType), 'image/')) {
        return [
            'is_live' => false,
            'http_code' => $httpCode,
            'error' => "URL không phải tệp hình ảnh hợp lệ (Content-Type: {$contentType})"
        ];
    }

    return [
        'is_live' => true,
        'http_code' => 200,
        'content_type' => $contentType,
        'size_bytes' => $contentLength
    ];
}
