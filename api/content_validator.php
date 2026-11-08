<?php
/**
 * BỘ KIỂM ĐỊNH CHẤT LƯỢNG NỘI DUNG CHUẨN SEO, AEO, GEO (8-LAYER QUALITY GATE)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Bắt buộc áp dụng cho mọi bài viết mới kể từ bây giờ.
 */

if (!defined('TRUSTED_SOURCE_KEYWORDS')) {
    define('TRUSTED_SOURCE_KEYWORDS', [
        'duoc dien', 'do tat loi', 'vien duoc lieu', 'kew', 'powo', 'wfo', 'ncbi', 
        'pubmed', 'pubchem', 'sofri', 'favri', 'vnua', 'can tho', 'bo nong nghiep', 
        'mard', 'khuyen nong', 'nasa', 'wolverton', 'missouri botanical', 'tropicos', 
        'hoi sinh vat canh', 'y hoc co truyen', 'vien sinh thai'
    ]);
}

function countWordsVi(string $text): int {
    $clean = trim(preg_replace('/\s+/', ' ', $text));
    if (empty($clean)) return 0;
    return count(explode(' ', $clean));
}

/**
 * Kiểm định toàn diện chất lượng nội dung bài viết trước khi xuất bản
 * 
 * @param array $article
 * @return array ['is_valid' => bool, 'errors' => array, 'warnings' => array, 'score' => int]
 */
function verifyArticleContentQuality(array $article): array {
    $errors = [];
    $warnings = [];
    $score = 100;

    // Gate 1: Quick Answer (AEO Snippet 35 - 85 từ)
    $qa = trim($article['quick_answer'] ?? '');
    $qaWords = countWordsVi($qa);
    if (empty($qa)) {
        $errors[] = 'Gate 1 [AEO]: Thiếu trường quick_answer (Hộp tóm tắt dứt khoát đầu bài viết)';
        $score -= 20;
    } elseif ($qaWords < 35 || $qaWords > 85) {
        $errors[] = "Gate 1 [AEO]: quick_answer có độ dài {$qaWords} từ (Chuẩn AEO yêu cầu 35 - 80 từ)";
        $score -= 10;
    }

    // Gate 2: Quy trình How-To (Độc bản, tối thiểu 3 bước)
    $steps = $article['how_to_grow_steps'] ?? [];
    if (!is_array($steps) || count($steps) < 3) {
        $count = is_array($steps) ? count($steps) : 0;
        $errors[] = "Gate 2 [HowTo]: Quy trình thực hành có {$count} bước (Yêu cầu tối thiểu 3 bước thực tế)";
        $score -= 20;
    } else {
        foreach ($steps as $idx => $s) {
            $stepTitle = trim($s['title'] ?? '');
            $stepInst = trim($s['instruction'] ?? '');
            if (countWordsVi($stepTitle) < 2) {
                $errors[] = "Gate 2 [HowTo]: Bước " . ($idx + 1) . " có tiêu đề quá ngắn";
                $score -= 5;
            }
            if (countWordsVi($stepInst) < 10) {
                $errors[] = "Gate 2 [HowTo]: Bước " . ($idx + 1) . " có nội dung hướng dẫn quá sơ sài (<10 từ)";
                $score -= 5;
            }
        }
    }

    // Gate 3: Thực thể thực vật học GEO (Họ khoa học & pH đất)
    $bio = $article['botanical_details'] ?? [];
    if (empty($bio['family']) || countWordsVi($bio['family']) < 1) {
        $errors[] = 'Gate 3 [GEO]: Thiếu họ thực vật chính xác (botanical_details.family)';
        $score -= 15;
    }

    // Gate 4: Hoạt chất dược tính / Dinh dưỡng có danh pháp khoa học
    $compounds = $bio['active_compounds'] ?? $bio['key_components'] ?? $bio['ecological_features'] ?? [];
    if (!is_array($compounds) || count($compounds) < 2) {
        $errors[] = 'Gate 4 [GEO]: Cần tối thiểu 2 hoạt chất sinh học / thành phần then chốt có danh pháp khoa học';
        $score -= 10;
    }

    // Gate 5: Câu hỏi thường gặp FAQs (Tối thiểu 2 câu thực chiến)
    $faqs = $article['faqs'] ?? [];
    if (!is_array($faqs) || count($faqs) < 2) {
        $count = is_array($faqs) ? count($faqs) : 0;
        $errors[] = "Gate 5 [AEO FAQ]: Chỉ có {$count} câu hỏi thường gặp (Yêu cầu tối thiểu 2 FAQs)";
        $score -= 15;
    } else {
        foreach ($faqs as $idx => $f) {
            $q = trim($f['question'] ?? '');
            $a = trim($f['answer'] ?? '');
            if (strlen($q) < 10) {
                $errors[] = "Gate 5 [FAQ]: Câu hỏi số " . ($idx + 1) . " quá ngắn hoặc để trống";
                $score -= 5;
            }
            if (countWordsVi($a) < 8) {
                $errors[] = "Gate 5 [FAQ]: Câu trả lời số " . ($idx + 1) . " quá ngắn (< 8 từ)";
                $score -= 5;
            }
        }
    }

    // Gate 6: Mùa vụ 3 miền & Cảnh báo an toàn (Seasonality & Safety)
    $sea = $article['seasonality'] ?? [];
    if (empty($sea['north']) || empty($sea['south'])) {
        $errors[] = 'Gate 6 [Seasonality]: Thiếu hướng dẫn mùa vụ bản địa miền Bắc hoặc miền Nam';
        $score -= 10;
    }

    // Gate 7: Liên kết nội bộ Topic Cluster (Tối thiểu 2 bài liên quan)
    $related = $article['related_plant_ids'] ?? [];
    if (!is_array($related) || count($related) < 2) {
        $count = is_array($related) ? count($related) : 0;
        $errors[] = "Gate 7 [Topic Cluster]: Chỉ có {$count} bài liên quan (Yêu cầu tối thiểu 2 related_plant_ids)";
        $score -= 10;
    }

    // Gate 8: Zero-Hallucination & Nguồn tài liệu uy tín
    $sources = $article['reference_sources'] ?? [];
    if (!is_array($sources) || count($sources) < 1) {
        $errors[] = 'Gate 8 [Zero-Hallucination]: Bắt buộc có trường reference_sources chứa tối thiểu 1 nguồn tham chiếu uy tín';
        $score -= 20;
    } else {
        $hasTrustedKeyword = false;
        foreach ($sources as $src) {
            $text = strtolower(($src['title'] ?? '') . ' ' . ($src['author'] ?? '') . ' ' . ($src['organization'] ?? ''));
            $text = str_replace(['đ', 'Đ'], 'd', $text);
            foreach (TRUSTED_SOURCE_KEYWORDS as $kw) {
                if (str_contains($text, $kw)) {
                    $hasTrustedKeyword = true;
                    break 2;
                }
            }
        }
        if (!$hasTrustedKeyword) {
            $warnings[] = 'Gate 8 [Verification]: Nguồn tham khảo nên thuộc danh mục thẩm định (Dược Điển, GS Đỗ Tất Lợi, Viện Cây Ăn Quả, Kew POWO, NASA...)';
        }
    }

    return [
        'is_valid' => count($errors) === 0,
        'errors' => $errors,
        'warnings' => $warnings,
        'score' => max(0, $score)
    ];
}
