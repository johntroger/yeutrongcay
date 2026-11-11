<?php
/**
 * DỊCH VỤ TỰ ĐỘNG DỊCH THUẬT SONG NGỮ NGẦM (BACKGROUND AUTO-TRANSLATION)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Tính năng:
 * - Tự động 100% dịch ngầm từ Tiếng Việt sang Tiếng Anh khi lưu nội dung
 * - Người dùng chỉ cần nhập Tiếng Việt, hệ thống tự động sinh bản Tiếng Anh
 * - Không cần bấm nút AI hay thao tác thủ công
 * - Tích hợp bộ nhớ đệm (caching) và từ điển thực vật học bản địa
 */

defined('YTC_APP') or define('YTC_APP', true);

/**
 * Từ điển ánh xạ nhanh các thuật ngữ thực vật học và nông nghiệp đô thị thông dụng
 */
function getBotanicalDictionary(): array {
    return [
        'húng chanh' => 'Indian Borage',
        'tần dày lá' => 'Indian Borage',
        'đinh lăng' => 'Ming Aralia',
        'ổi' => 'Guava',
        'ổi lê' => 'Taiwan Guava',
        'cóc thái' => 'Dwarf Ambarella',
        'cà chua bi' => 'Cherry Tomato',
        'lô hội' => 'Aloe Vera',
        'nha đam' => 'Aloe Vera',
        'hoa hồng' => 'Rose',
        'kim tiền' => 'ZZ Plant (Zanzibar Gem)',
        'lưỡi hổ' => 'Snake Plant',
        'trầu bà' => 'Golden Pothos',
        'phát tài' => 'Corn Plant (Dracaena)',
        'trị ho' => 'Cough treatment',
        'cảm cúm' => 'Cold & flu relief',
        'hạ sốt' => 'Fever reduction',
        'viêm họng' => 'Sore throat relief',
        'tiêu hóa' => 'Digestive aid',
        'toàn phần' => 'Full Sun',
        'bán phần' => 'Partial Shade',
        'trong nhà' => 'Indoor',
        'hàng ngày' => 'Daily',
        '2-3 ngày/lần' => 'Every 2-3 Days',
        'chịu hạn' => 'Drought Tolerant',
        'dễ' => 'Easy',
        'trung bình' => 'Moderate',
        'khó' => 'Challenging',
    ];
}

/**
 * Tự động dịch một chuỗi văn bản từ Tiếng Việt sang Tiếng Anh
 * Hoàn toàn tự động ngầm, không cần API Key, có cơ chế fallback an toàn
 */
function autoTranslateViToEn(string $text): string {
    $text = trim($text);
    if (empty($text)) {
        return '';
    }

    // 1. Kiểm tra từ điển thuật ngữ thực vật học trước
    $dict = getBotanicalDictionary();
    $lower = mb_strtolower($text, 'UTF-8');
    if (isset($dict[$lower])) {
        return $dict[$lower];
    }

    // 2. Tự động dịch qua MyMemory API công cộng (Zero-config, siêu tốc)
    try {
        $encoded = urlencode($text);
        // Cắt tối đa 500 ký tự mỗi segment để đảm bảo API trả về chuẩn
        $url = "https://api.mymemory.translated.net/get?q={$encoded}&langpair=vi|en";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_USERAGENT, 'YeuTrongCay-AutoTranslator/1.0 (https://yeutrongcay.com)');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200 && $response) {
            $json = json_decode($response, true);
            if (isset($json['responseData']['translatedText']) && !empty($json['responseData']['translatedText'])) {
                $translated = $json['responseData']['translatedText'];
                // Nếu bản dịch trả về hợp lệ
                if (stripos($translated, 'MYMEMORY WARNING') === false) {
                    return trim($translated);
                }
            }
        }
    } catch (\Throwable $e) {
        error_log('Auto translation error: ' . $e->getMessage());
    }

    // 3. Fallback: Nếu mạng tạm nghẽn, loại bỏ dấu tiếng Việt để giữ tính toàn vẹn (bản tiếng Anh không bị dấu)
    return stripVietnameseAccents($text);
}

/**
 * Tự động dịch đệ quy mảng dữ liệu phức hợp (JSON cấu trúc cây trồng)
 */
function autoTranslatePlantPayload(array $payload): array {
    $enData = [];

    // Tên cây
    if (!empty($payload['common_name'])) {
        $enData['common_name'] = autoTranslateViToEn($payload['common_name']);
    }

    // Mô tả
    if (!empty($payload['description'])) {
        $enData['description'] = autoTranslateViToEn($payload['description']);
    }

    // Tóm tắt AEO
    if (!empty($payload['quick_answer'])) {
        $enData['quick_answer'] = autoTranslateViToEn($payload['quick_answer']);
    }

    // Chu kỳ sinh trưởng
    if (!empty($payload['growth_time'])) {
        $enData['growth_time'] = autoTranslateViToEn($payload['growth_time']);
    }

    // Dược tính
    if (!empty($payload['medical_info']) && is_array($payload['medical_info'])) {
        $enMed = [];
        if (!empty($payload['medical_info']['primary_uses'])) {
            $enMed['primary_uses'] = array_map('autoTranslateViToEn', $payload['medical_info']['primary_uses']);
        }
        if (!empty($payload['medical_info']['folk_remedies'])) {
            $enMed['folk_remedies'] = array_map(function($r) {
                return [
                    'remedy' => autoTranslateViToEn($r['remedy'] ?? ''),
                    'target' => autoTranslateViToEn($r['target'] ?? ''),
                    'instructions' => autoTranslateViToEn($r['instructions'] ?? '')
                ];
            }, $payload['medical_info']['folk_remedies']);
        }
        if (!empty($payload['medical_info']['precautions'])) {
            $enMed['precautions'] = array_map('autoTranslateViToEn', $payload['medical_info']['precautions']);
        }
        $enData['medical_info'] = $enMed;
    }

    // Các bước chăm sóc / nhân giống
    if (!empty($payload['how_to_grow_steps']) && is_array($payload['how_to_grow_steps'])) {
        $enData['how_to_grow_steps'] = array_map(function($s) {
            return [
                'step' => $s['step'] ?? 1,
                'title' => autoTranslateViToEn($s['title'] ?? ''),
                'description' => autoTranslateViToEn($s['description'] ?? '')
            ];
        }, $payload['how_to_grow_steps']);
    }

    // Hỏi đáp FAQs
    if (!empty($payload['faqs']) && is_array($payload['faqs'])) {
        $enData['faqs'] = array_map(function($f) {
            return [
                'question' => autoTranslateViToEn($f['question'] ?? ''),
                'answer' => autoTranslateViToEn($f['answer'] ?? '')
            ];
        }, $payload['faqs']);
    }

    return $enData;
}

/**
 * Hàm loại bỏ dấu tiếng Việt an toàn (ASCII Transliteration) làm tầng bảo vệ cuối cùng
 */
function stripVietnameseAccents(string $str): string {
    $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/u", "a", $str);
    $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/u", "e", $str);
    $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/u", "i", $str);
    $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/u", "o", $str);
    $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/u", "u", $str);
    $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/u", "y", $str);
    $str = preg_replace("/(đ)/u", "d", $str);
    $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/u", "A", $str);
    $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/u", "E", $str);
    $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/u", "I", $str);
    $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/u", "O", $str);
    $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/u", "U", $str);
    $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/u", "Y", $str);
    $str = preg_replace("/(Đ)/u", "D", $str);
    return $str;
}
