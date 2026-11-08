/**
 * BỘ KIỂM ĐỊNH NỘI DUNG CHUẨN SEO, AEO, GEO (8-LAYER QUALITY GATE)
 * Website: YeuTrongCay.com
 * 
 * Bắt buộc áp dụng cho mọi bài viết mới kể từ bây giờ.
 */

const TRUSTED_SOURCE_KEYWORDS = [
  'duoc dien', 'do tat loi', 'vien duoc lieu', 'kew', 'powo', 'wfo', 'ncbi', 
  'pubmed', 'pubchem', 'sofri', 'favri', 'vnua', 'can tho', 'bo nong nghiep', 
  'mard', 'khuyen nong', 'nasa', 'wolverton', 'missouri botanical', 'tropicos', 
  'hoi sinh vat canh', 'y hoc co truyen', 'vien sinh thai'
];

/**
 * Đếm số từ tiếng Việt/Anh chuẩn xác
 */
function countWords(str) {
  if (!str || typeof str !== 'string') return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Kiểm định toàn diện một bài viết theo chuẩn 8 lớp
 * @param {Object} article 
 * @returns {{ is_valid: boolean, errors: string[], warnings: string[], score: number }}
 */
function validateArticleContent(article) {
  const errors = [];
  const warnings = [];
  let score = 100;

  if (!article || typeof article !== 'object') {
    return { is_valid: false, errors: ['Dữ liệu bài viết không hợp lệ'], warnings: [], score: 0 };
  }

  // Gate 1: Quick Answer (AEO Snippet 40 - 80 từ)
  const qa = article.quick_answer || '';
  const qaWords = countWords(qa);
  if (!qa) {
    errors.push('Gate 1 [AEO]: Thiếu trường quick_answer (Hộp tóm tắt dứt khoát đầu bài viết)');
    score -= 20;
  } else if (qaWords < 35 || qaWords > 85) {
    errors.push(`Gate 1 [AEO]: quick_answer có độ dài ${qaWords} từ (Chuẩn AEO yêu cầu 35 - 80 từ)`);
    score -= 10;
  } else {
    // Kiểm tra định lượng (giờ nắng, nước, pH, hoặc thời gian)
    const hasMetrics = /(\d+\s*(h|giờ|tiếng|ngày|tháng|tuần|%|cm|m|ml|lít|°c)|ph\s*[\d.]+|nắng|tưới)/i.test(qa);
    if (!hasMetrics) {
      warnings.push('Gate 1 [AEO]: quick_answer nên chứa thông số định lượng cụ thể (giờ nắng, lượng nước, chu kỳ)');
    }
  }

  // Gate 2: Quy trình How-To (Độc bản, tối thiểu 3 bước)
  const steps = article.how_to_grow_steps || [];
  if (!Array.isArray(steps) || steps.length < 3) {
    errors.push(`Gate 2 [HowTo]: Quy trình thực hành có ${steps.length} bước (Yêu cầu tối thiểu 3 bước thực tế)`);
    score -= 20;
  } else {
    steps.forEach((s, idx) => {
      const stepTitle = s.title || '';
      const stepInst = s.instruction || '';
      if (countWords(stepTitle) < 2) {
        errors.push(`Gate 2 [HowTo]: Bước ${idx + 1} có tiêu đề quá ngắn`);
        score -= 5;
      }
      if (countWords(stepInst) < 10) {
        errors.push(`Gate 2 [HowTo]: Bước ${idx + 1} có nội dung hướng dẫn quá sơ sài (<10 từ)`);
        score -= 5;
      }
    });
  }

  // Gate 3: Thực thể thực vật học GEO (Họ khoa học & pH đất)
  const bio = article.botanical_details || {};
  if (!bio.family || countWords(bio.family) < 1) {
    errors.push('Gate 3 [GEO]: Thiếu họ thực vật chính xác (botanical_details.family)');
    score -= 15;
  }
  if (!bio.soil_ph && !bio.dimensions && !article.forest_spec && !article.recipe_spec) {
    warnings.push('Gate 3 [GEO]: Nên có thông số pH đất hoặc kích thước kỹ thuật (botanical_details.soil_ph)');
  }

  // Gate 4: Hoạt chất dược tính / Dinh dưỡng có danh pháp khoa học
  const compounds = bio.active_compounds || bio.key_components || bio.ecological_features || [];
  if (!Array.isArray(compounds) || compounds.length < 2) {
    errors.push('Gate 4 [GEO]: Cần tối thiểu 2 hoạt chất sinh học / thành phần then chốt có danh pháp khoa học');
    score -= 10;
  }

  // Gate 5: Câu hỏi thường gặp FAQs (Tối thiểu 2 câu thực chiến)
  const faqs = article.faqs || [];
  if (!Array.isArray(faqs) || faqs.length < 2) {
    errors.push(`Gate 5 [AEO FAQ]: Chỉ có ${faqs.length} câu hỏi thường gặp (Yêu cầu tối thiểu 2 FAQs)`);
    score -= 15;
  } else {
    faqs.forEach((f, idx) => {
      if (!f.question || f.question.length < 10) {
        errors.push(`Gate 5 [FAQ]: Câu hỏi số ${idx + 1} quá ngắn hoặc để trống`);
        score -= 5;
      }
      if (!f.answer || countWords(f.answer) < 8) {
        errors.push(`Gate 5 [FAQ]: Câu trả lời số ${idx + 1} quá ngắn (< 8 từ)`);
        score -= 5;
      }
    });
  }

  // Gate 6: Mùa vụ 3 miền & Cảnh báo an toàn (Seasonality & Safety)
  const sea = article.seasonality || {};
  if (!sea.north || !sea.south) {
    errors.push('Gate 6 [Seasonality]: Thiếu hướng dẫn mùa vụ bản địa miền Bắc hoặc miền Nam');
    score -= 10;
  }
  if (!sea.warning) {
    warnings.push('Gate 6 [Safety]: Nên có cảnh báo an toàn/chống chỉ định (seasonality.warning)');
  }

  // Gate 7: Liên kết nội bộ Topic Cluster (Tối thiểu 2 bài liên quan)
  const related = article.related_plant_ids || [];
  if (!Array.isArray(related) || related.length < 2) {
    errors.push(`Gate 7 [Topic Cluster]: Chỉ có ${related.length} bài liên quan (Yêu cầu tối thiểu 2 related_plant_ids)`);
    score -= 10;
  }

  // Gate 8: Zero-Hallucination & Nguồn tài liệu uy tín
  const sources = article.reference_sources || [];
  if (!Array.isArray(sources) || sources.length < 1) {
    errors.push('Gate 8 [Zero-Hallucination]: Bắt buộc có trường reference_sources chứa tối thiểu 1 nguồn tham chiếu uy tín');
    score -= 20;
  } else {
    let hasTrustedKeyword = false;
    for (const src of sources) {
      const textToSearch = ((src.title || '') + ' ' + (src.author || '') + ' ' + (src.organization || '')).toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd');
      if (TRUSTED_SOURCE_KEYWORDS.some(kw => textToSearch.includes(kw))) {
        hasTrustedKeyword = true;
        break;
      }
    }
    if (!hasTrustedKeyword) {
      warnings.push('Gate 8 [Verification]: Nguồn tham khảo nên thuộc danh mục thẩm định (Dược Điển, GS Đỗ Tất Lợi, Viện Cây Ăn Quả, Kew POWO, NASA...)');
    }
  }

  return {
    is_valid: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, score)
  };
}

module.exports = {
  validateArticleContent,
  countWords,
  TRUSTED_SOURCE_KEYWORDS
};
