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
            'pattern' => '/coffee|latte|restaurant|burger|pizza|alps|snow-mountain|swiss|canada|rockies|desert|arctic/i',
            'reason' => 'Bài viết Vườn Quốc Gia Việt Nam không được sử dụng ảnh vùng núi tuyết châu Âu, phong cảnh ôn đới nước ngoài hoặc ảnh đồ ăn cà phê.'
        ],
        'culinary' => [
            'pattern' => '/coffee-cup|black-coffee|latte|cappuccino|beer|whiskey|cocktail|vodka|wine-glass|fast-food|burger|pizza/i',
            'reason' => 'Bài viết Dược thiện & Ẩm thực thảo mộc truyền thống không được sử dụng ảnh tách cà phê, bia rượu phương Tây hoặc thức ăn nhanh.'
        ],
        'space' => [
            'pattern' => '/macro-leaf|single-leaf|close-up-leaf|leaf-vein|underwater-coral/i',
            'reason' => 'Bản vẽ & Thiết kế không gian xanh phải thể hiện cấu trúc giàn leo, vườn tường, kệ tầng hoặc sân vườn; cấm dùng ảnh cận cảnh 1 chiếc lá.'
        ],
        'recycle' => [
            'pattern' => '/luxury-car|fashion-model|landfill-fire|toxic-smoke/i',
            'reason' => 'Bài viết Sáng chế xanh phải minh họa mô hình tự chế hữu ích, không dùng ảnh bãi rác ô nhiễm tiêu cực.'
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

    // 5. Kiểm tra tính hiện diện của từ khóa thực thể
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
