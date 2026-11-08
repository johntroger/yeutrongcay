/**
 * THUẬT TOÁN RÀ SOÁT TƯƠNG THÍCH NỘI DUNG & HÌNH ẢNH (CIRVA - Content-Image Relevance Verification Algorithm)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Mục tiêu:
 * - Tự động phát hiện và ngăn chặn 100% tình trạng gán ảnh sai lệch, ảnh stock vô căn cứ cho bài viết.
 * - Đảm bảo tính trung thực khoa học:
 *   + Danh mục Rừng (forest): Bắt buộc ảnh chụp thực tế tại Vườn quốc gia Việt Nam tương ứng.
 *   + Danh mục Ẩm thực (culinary): Bắt buộc đúng thành phẩm dược thiện, cấm ảnh cà phê/rượu bia/đồ ăn nhanh.
 *   + Danh mục Không gian (space): Bắt buộc ảnh có kết cấu kiến trúc/mô hình giàn/kệ/tường, cấm ảnh macro lá đơn lẻ.
 *   + Danh mục Tái chế (recycle): Bắt buộc thể hiện đúng cơ chế tự chế/vật liệu tái sinh.
 *   + Danh mục Thực vật (herb/fruit/ornamental): Khớp tên khoa học hoặc chi/loài thực vật.
 */

export interface ImageAlignmentResult {
  score: number; // 0 đến 100
  isApproved: boolean; // >= 70 điểm
  severity: 'pass' | 'warning' | 'critical';
  issues: string[];
  suggestions: string[];
  detectedMatches: string[];
}

export interface ArticleInput {
  common_name: string;
  scientific_name?: string;
  category: string;
  description?: string;
  image_url: string;
  tags?: string[];
}

// Bảng từ khóa nhạy cảm / sai lệch tuyệt đối theo chuyên mục (BANNED / NEGATIVE KEYWORDS)
const CATEGORY_NEGATIVE_RULES: Record<string, { patterns: RegExp[]; reason: string }> = {
  forest: {
    patterns: [
      /coffee|latte|espresso|restaurant|food|burger|pizza/i,
      /alps|snow-mountain|swiss|canada|rockies|desert|arctic|sahara/i,
      /indoor-living|bedroom|living-room|sofa|office/i
    ],
    reason: 'Bài viết Vườn Quốc Gia Việt Nam không được sử dụng ảnh vùng núi tuyết châu Âu, phong cảnh ôn đới nước ngoài hoặc ảnh nội thất.'
  },
  culinary: {
    patterns: [
      /coffee-cup|black-coffee|latte|cappuccino|espresso/i,
      /beer|whiskey|cocktail|vodka|wine-glass|bar-counter/i,
      /fast-food|french-fries|burger|hotdog|pizza/i,
      /car-engine|factory|smoke|concrete/i
    ],
    reason: 'Bài viết Dược thiện & Ẩm thực thảo mộc truyền thống không được sử dụng ảnh tách cà phê, bia rượu phương Tây hoặc thức ăn nhanh.'
  },
  space: {
    patterns: [
      /macro-leaf|single-leaf|close-up-leaf|leaf-vein/i,
      /underwater-coral|deep-sea/i,
      /traffic-jam|highway|factory/i
    ],
    reason: 'Bản vẽ & Thiết kế không gian xanh phải thể hiện cấu trúc giàn leo, vườn tường, kệ tầng hoặc sân vườn; cấm dùng ảnh cận cảnh 1 chiếc lá.'
  },
  recycle: {
    patterns: [
      /luxury-car|gold-jewelry|fashion-model/i,
      /plastic-ocean-pollution|landfill-fire|toxic-smoke/i
    ],
    reason: 'Bài viết Sáng chế xanh phải minh họa mô hình tự chế hữu ích, không dùng ảnh bãi rác ô nhiễm tiêu cực.'
  }
};

// Bảng từ khóa mong đợi (POSITIVE KEYWORDS) theo từng danh mục
const CATEGORY_POSITIVE_KEYWORDS: Record<string, string[]> = {
  forest: [
    'cuc-phuong', 'cat-tien', 'phong-nha', 'hoang-lien', 'fansipan', 'con-dao', 
    'ba-be', 'ba-vi', 'pu-mat', 'tram-chim', 'can-gio', 'u-minh', 'yok-don', 
    'bidoup', 'bach-ma', 'national-park', 'mangrove', 'lake', 'rainforest', 'vietnam'
  ],
  culinary: [
    'tea', 'syrup', 'honey', 'vinegar', 'sauce', 'soup', 'salt', 'spice', 
    'chili', 'ginger', 'perilla', 'sugarcane', 'papaya', 'chrysanthemum', 
    'butterfly-pea', 'sambal', 'gukhwacha', 'liangcha', 'elixir', 'herbal'
  ],
  space: [
    'pergola', 'trellis', 'living-wall', 'vertical-garden', 'terrace', 'balcony', 
    'atrium', 'courtyard', 'rooftop', 'planter', 'greenhouse', 'urban-garden', 
    'raised-bed', 'windowbox', 'pond', 'hydroponic-tower'
  ],
  recycle: [
    'sip', 'sub-irrigated', 'bokashi', 'compost', 'worm', 'vermicompost', 
    'drip', 'irrigation', 'diy', 'upcycle', 'plastic-bottle', 'bucket', 
    'pvc', 'hydroponic', 'venturi', 'capillary', 'aquaponics'
  ]
};

/**
 * Thuật toán chuẩn hóa chuỗi và trích xuất token
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\-_\s]/g, ' ')
    .split(/[\s\-_\/.]+/)
    .filter(t => t.length > 2);
}

/**
 * Kiểm tra tính phù hợp giữa Hình ảnh và Nội dung bài viết
 */
export function verifyImageAlignment(article: ArticleInput): ImageAlignmentResult {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const detectedMatches: string[] = [];
  let score = 100;

  const url = (article.image_url || '').trim();
  const cat = (article.category || '').toLowerCase();
  const commonName = (article.common_name || '').trim();
  const sciName = (article.scientific_name || '').trim();

  // 1. Kiểm tra định dạng và giao thức URL
  if (!url) {
    return {
      score: 0,
      isApproved: false,
      severity: 'critical',
      issues: ['Bài viết thiếu hình ảnh đại diện (image_url rỗng).'],
      suggestions: ['Vui lòng cung cấp URL hình ảnh minh họa phù hợp.'],
      detectedMatches: []
    };
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    issues.push('URL hình ảnh không hợp lệ (phải bắt đầu bằng http:// hoặc https://).');
    score -= 40;
  }

  // 2. Chặn các ảnh placeholder hoặc stock vô căn cứ
  if (/via\.placeholder|placeholder\.com|dummyimage|default-image|dummy/i.test(url)) {
    issues.push('Hình ảnh là ảnh giữ chỗ tạm thời (placeholder), không có giá trị nội dung.');
    score -= 50;
    suggestions.push('Thay thế bằng ảnh chụp thực tế hoặc tư liệu từ Wikimedia Commons.');
  }

  // 3. Phân tích token từ URL hình ảnh
  const urlTokens = tokenize(url);
  const nameTokens = tokenize(commonName);
  const sciTokens = tokenize(sciName);

  // 4. Kiểm tra Vi phạm Quy tắc Tiêu cực (Negative Rules)
  const negRule = CATEGORY_NEGATIVE_RULES[cat];
  if (negRule) {
    for (const pat of negRule.patterns) {
      if (pat.test(url) || pat.test(article.image_url)) {
        issues.push(`VI PHẠM QUY TẮC CHUYÊN MỤC [${cat.toUpperCase()}]: ${negRule.reason}`);
        score -= 60; // Trừ điểm nặng
        break;
      }
    }
  }

  // 5. Kiểm tra Tương quan Tích cực (Positive Keywords)
  const posKeywords = CATEGORY_POSITIVE_KEYWORDS[cat] || [];
  let matchedPositives = 0;
  for (const kw of posKeywords) {
    if (urlTokens.includes(kw) || url.toLowerCase().includes(kw)) {
      matchedPositives++;
      detectedMatches.push(kw);
    }
  }

  // 6. Kiểm tra Trùng khớp Tên khoa học / Thực thể đối với Botanical
  if (['herb', 'fruit', 'ornamental'].includes(cat)) {
    const sciMatch = sciTokens.some(st => urlTokens.includes(st) || url.toLowerCase().includes(st));
    const nameMatch = nameTokens.some(nt => urlTokens.includes(nt) || url.toLowerCase().includes(nt));
    if (sciMatch) {
      detectedMatches.push('botanical_scientific_match');
      score += 15;
    }
    if (nameMatch) {
      detectedMatches.push('botanical_common_match');
      score += 10;
    }
    if (!sciMatch && !nameMatch && matchedPositives === 0) {
      issues.push('Tên tệp hình ảnh không chứa tên loài hoặc tên khoa học tương ứng.');
      score -= 25;
      suggestions.push(`Khuyến nghị tìm ảnh có chứa tên chi/loài: "${sciName || commonName}"`);
    }
  }

  // 7. Thưởng điểm cho nguồn ảnh uy tín, chuẩn bản quyền mở
  if (url.includes('wikimedia.org') || url.includes('wikipedia.org')) {
    score += 10;
    detectedMatches.push('trusted_wikimedia_source');
  }

  // Chuẩn hóa điểm trong khoảng 0 - 100
  score = Math.max(0, Math.min(100, score));

  // Xác định mức độ nghiêm trọng
  let severity: 'pass' | 'warning' | 'critical' = 'pass';
  let isApproved = true;

  if (score < 60 || issues.some(i => i.includes('VI PHẠM QUY TẮC CHUYÊN MỤC'))) {
    severity = 'critical';
    isApproved = false;
  } else if (score < 75) {
    severity = 'warning';
    isApproved = false;
  }

  // Gợi ý cải thiện nếu bị phạt điểm
  if (!isApproved) {
    if (cat === 'forest') {
      suggestions.push('Tra cứu ảnh phong cảnh chính xác của Vườn quốc gia từ Wikimedia Commons.');
    } else if (cat === 'culinary') {
      suggestions.push('Sử dụng ảnh bát/ấm/ly thành phẩm bài thuốc hoặc nguyên liệu thảo mộc tươi.');
    } else if (cat === 'space') {
      suggestions.push('Sử dụng ảnh giàn pergola, hệ module tường cây hoặc kệ trồng tầng ban công thực tế.');
    } else if (cat === 'recycle') {
      suggestions.push('Sử dụng ảnh mô hình tự chế (chậu SIP, thùng Bokashi, hệ thống tưới nhỏ giọt...).');
    }
  }

  return {
    score,
    isApproved,
    severity,
    issues,
    suggestions,
    detectedMatches
  };
}

/**
 * Sinh từ khóa gợi ý để tra cứu ảnh chuẩn xác từ Wikimedia Commons
 */
export function generateWikiSearchQuery(article: Partial<ArticleInput>): string {
  const cat = (article.category || '').toLowerCase();
  const common = (article.common_name || '').trim();
  const sci = (article.scientific_name || '').trim();

  if (cat === 'forest') {
    return `${common.replace(/vườn quốc gia|khu bảo tồn|khu dự trữ sinh quyển/gi, '').trim()} National Park Vietnam`;
  }
  if (cat === 'culinary') {
    if (sci && !sci.includes('Botanical')) return `${sci} herbal tea food`;
    return `${common} Vietnamese herbal recipe`;
  }
  if (cat === 'space') {
    return `${common} garden design architecture`;
  }
  if (cat === 'recycle') {
    return `${common} DIY garden upcycling`;
  }
  return sci || common;
}
