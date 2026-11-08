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
      /car-engine|factory|smoke|concrete/i,
      /khoai[-_]mo/i // Canh khoai mỡ (tím) đối lập hoàn toàn với canh rau tập tàng
    ],
    reason: 'Bài viết Dược thiện & Ẩm thực thảo mộc truyền thống không được sử dụng ảnh tách cà phê, bia rượu phương Tây, thức ăn nhanh hoặc sai lệch tên món ăn đối lập.'
  },
  space: {
    patterns: [
      /macro-leaf|single-leaf|close-up-leaf|leaf-vein/i,
      /underwater-coral|deep-sea/i,
      /traffic-jam|highway|factory/i,
      /bedroom|living-room|bathroom|office-desk/i
    ],
    reason: 'Bản vẽ & Thiết kế không gian xanh phải thể hiện cấu trúc giàn leo, vườn tường, kệ tầng, ban công hoặc sân vườn cảnh quan; cấm dùng ảnh cận cảnh 1 chiếc lá hay phòng kín không cây cối.'
  },
  recycle: {
    patterns: [
      /luxury-car|gold-jewelry|fashion-model/i,
      /plastic-ocean-pollution|landfill|toxic-smoke|trash-pile|garbage-dump|urban-bio-materials/i,
      /saving[-_]life|hospital|patient|surgery|clinical|syringe|blood|needle|infusion[-_]bag/i,
      /principle\.png|schematic|vector[-_]diagram|flowchart|bernoulli|aerodynamic/i,
      /tomato[-_]support/i
    ],
    reason: 'Bài viết Sáng chế xanh phải minh họa mô hình/dụng cụ tự chế hữu ích ngoài thực tế làm vườn; tuyệt đối cấm ảnh dụng cụ y tế/bệnh nhân, sơ đồ vật lý lý thuyết hay bãi rác ô nhiễm.'
  }
};

// Bảng từ khóa mong đợi (POSITIVE KEYWORDS) theo từng danh mục
const CATEGORY_POSITIVE_KEYWORDS: Record<string, string[]> = {
  forest: [
    'cuc-phuong', 'cat-tien', 'phong-nha', 'hoang-lien', 'fansipan', 'con-dao', 
    'ba-be', 'ba-vi', 'pu-mat', 'tram-chim', 'can-gio', 'u-minh', 'yok-don', 
    'bidoup', 'bach-ma', 'bachma', 'national-park', 'np', 'mangrove', 'lake', 'rainforest', 'vietnam',
    'hoanglienson', 'mountain', 'nature', 'reserve', 'falls', 'forest'
  ],
  culinary: [
    'tea', 'syrup', 'honey', 'vinegar', 'sauce', 'soup', 'salt', 'spice', 
    'chili', 'ginger', 'perilla', 'sugarcane', 'papaya', 'chrysanthemum', 
    'butterfly-pea', 'sambal', 'gukhwacha', 'liangcha', 'elixir', 'herbal',
    'vinaigrette', 'drink', 'beverage', 'broth', 'concoction', 'salad', 'dressing',
    'canh', 'khoai', 'bayam', 'kemangi', 'ulek', 'seasoned', 'oil', 'making-vinaigrette',
    'juice', 'lemonade', 'calamansi', 'infusion', 'extract'
  ],
  space: [
    'pergola', 'trellis', 'living-wall', 'vertical-garden', 'terrace', 'balcony', 
    'atrium', 'courtyard', 'rooftop', 'planter', 'greenhouse', 'urban-garden', 
    'raised-bed', 'windowbox', 'pond', 'hydroponic-tower', 'hydroponic', 'tower',
    'vertical', 'micro-forest', 'sky-garden', 'roof', 'garden', 'green', 'nest',
    'architecture', 'permaculture', 'pflanzkasten', 'modular', 'container'
  ],
  recycle: [
    'sip', 'sub-irrigated', 'bokashi', 'compost', 'worm', 'vermicompost', 
    'drip', 'irrigation', 'diy', 'upcycle', 'plastic-bottle', 'bucket', 
    'pvc', 'hydroponic', 'venturi', 'capillary', 'aquaponics', 'bottle',
    'self-watering', 'emitter', 'fertigation', 'fertilizer', 'organic', 'fermentation', 'tank',
    'wick', 'citrongraes', 'chili', 'garlic', 'ginger', 'spray', 'repellent', 'bio', 'pesticide'
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
  const normUrl = url.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-_\s%20]/g, '');
  const posKeywords = CATEGORY_POSITIVE_KEYWORDS[cat] || [];
  let matchedPositives = 0;
  for (const kw of posKeywords) {
    const normKw = kw.toLowerCase().replace(/[-_\s]/g, '');
    if (normUrl.includes(normKw) || urlTokens.includes(kw) || url.toLowerCase().includes(kw)) {
      matchedPositives++;
      detectedMatches.push(kw);
    }
  }

  // 6. Kiểm tra Tiêu Chuẩn Nghiêm Ngặt Cho Các Chuyên Mục Dễ Sai Lệch (space, recycle, culinary)
  if (['space', 'recycle', 'culinary'].includes(cat)) {
    if (matchedPositives === 0) {
      issues.push(`CHUYÊN MỤC ĐẶC THÙ [${cat.toUpperCase()}]: Tên tệp ảnh thiếu hoàn toàn các từ khóa ngữ cảnh chuyên mục bắt buộc.`);
      score -= 35;
    }

    // Kiểm tra chi tiết cho danh mục Ẩm Thực (culinary)
    if (cat === 'culinary') {
      const lowerCommon = commonName.toLowerCase();
      // Yêu cầu ảnh thành phẩm đã chế biến thay vì cành lá thô
      if (lowerCommon.includes('muối') || lowerCommon.includes('chấm')) {
        const hasSaltIndicator = /salt|sambal|ulek|mixture|spice|seasoning|seasoned/i.test(url);
        if (!hasSaltIndicator) {
          issues.push('Bài viết về Muối thảo mộc/Thức chấm thành phẩm nhưng ảnh không phản ánh muối hoặc hỗn hợp gia vị đã qua giã/pha chế.');
          score -= 30;
          suggestions.push('Tìm ảnh cối giã muối ớt (sambal ulek) hoặc đĩa muối thảo mộc (seasoned herb salt).');
        }
      }
      if (lowerCommon.includes('dầu giấm') || lowerCommon.includes('sốt')) {
        const hasDressingIndicator = /vinaigrette|dressing|oil|vinegar|sauce|making/i.test(url);
        if (!hasDressingIndicator) {
          issues.push('Bài viết về Dầu giấm/Sốt trộn thành phẩm nhưng ảnh là cành lá tươi thô chưa qua chế biến.');
          score -= 30;
          suggestions.push('Tìm ảnh đánh sốt dầu giấm (making vinaigrette) hoặc chai/bát sốt salad.');
        }
      }
      if (lowerCommon.includes('canh')) {
        if (/khoai[-_]mo/i.test(url)) {
          issues.push('Tệp ảnh thể hiện Canh khoai mỡ màu tím, sai lệch hoàn toàn với canh rau tập tàng/rau đồng quê.');
          score -= 50;
        }
      }
    }

    // Kiểm tra chi tiết cho danh mục Tái Chế (recycle)
    if (cat === 'recycle') {
      const lowerCommon = commonName.toLowerCase();
      if ((lowerCommon.includes('chai nhựa') || lowerCommon.includes('nhỏ giọt')) && /saving[-_]life/i.test(url)) {
        issues.push('Tệp ảnh là ảnh dụng cụ y tế bệnh viện cứu người, sai lệch với mô hình tưới nhỏ giọt làm vườn.');
        score -= 60;
      }
      if (lowerCommon.includes('xô sơn') || lowerCommon.includes('sip')) {
        if (/tomato[-_]support/i.test(url)) {
          issues.push('Tệp ảnh chỉ là giàn leo cà chua thường, không thể hiện chậu tự hút nước SIP từ xô/thùng.');
          score -= 40;
        }
      }
      if (lowerCommon.includes('venturi') && /principle/i.test(url)) {
        issues.push('Tệp ảnh là sơ đồ nguyên lý vật lý lý thuyết, không phản ánh bộ châm phân thực tế trong hệ thống tưới.');
        score -= 50;
      }
      if ((lowerCommon.includes('vỏ chuối') || lowerCommon.includes('nước ngâm')) && /urban[-_]bio[-_]materials/i.test(url)) {
        issues.push('Tệp ảnh là đống rác thải sinh hoạt, không phản ánh bình/thùng ủ phân bón hữu cơ vi sinh.');
        score -= 50;
      }
    }
  }

  // 7. Kiểm tra Trùng khớp Tên khoa học / Thực thể đối với Botanical
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

  // 8. Thưởng điểm cho nguồn ảnh uy tín, chuẩn bản quyền mở
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
    const lower = common.toLowerCase();
    if (lower.includes('muối') || lower.includes('chấm')) return 'seasoned salt herb mixture OR sambal ulek';
    if (lower.includes('dầu giấm') || lower.includes('sốt')) return 'making vinaigrette salad dressing';
    if (lower.includes('canh')) return 'canh Vietnamese vegetable soup broth';
    if (lower.includes('siro') || lower.includes('syrup')) return 'herbal syrup honey lemon';
    if (lower.includes('trà') || lower.includes('tea')) return 'herbal tea cup glass';
    if (sci && !sci.includes('Botanical')) return `${sci} herbal tea food`;
    return `${common} Vietnamese herbal recipe`;
  }
  if (cat === 'space') {
    const lower = common.toLowerCase();
    if (lower.includes('mái') || lower.includes('sân thượng')) return 'rooftop micro forest permaculture garden';
    if (lower.includes('tường đứng') || lower.includes('module')) return 'living green wall vertical garden';
    if (lower.includes('giàn leo')) return 'trellis pergola rooftop garden';
    if (lower.includes('ban công') || lower.includes('kệ')) return 'balcony vegetable garden planter';
    return `${common} urban garden design architecture`;
  }
  if (cat === 'recycle') {
    const lower = common.toLowerCase();
    if (lower.includes('chai nhựa') || lower.includes('nhỏ giọt')) return 'bottle drip irrigation garden';
    if (lower.includes('xô sơn') || lower.includes('sip')) return 'sub-irrigated planter bucket self-watering';
    if (lower.includes('venturi') || lower.includes('châm phân')) return 'fertigation fertilizer injector irrigation';
    if (lower.includes('bút bi') || lower.includes('đầu tưới')) return 'drip emitter irrigation dripper';
    if (lower.includes('vỏ chuối') || lower.includes('vỏ trứng') || lower.includes('ngâm')) return 'organic liquid fertilizer fermentation tanks';
    return `${common} DIY garden upcycling`;
  }
  return sci || common;
}

/**
 * Sinh URL tìm kiếm Google Images chuẩn xác kèm bộ lọc bản quyền và từ khóa ngữ cảnh
 */
export function generateGoogleImageSearchUrl(article: Partial<ArticleInput>): string {
  const cat = (article.category || '').toLowerCase();
  const common = (article.common_name || '').trim();
  const sci = (article.scientific_name || '').trim();

  let query = common;
  if (cat === 'culinary') {
    query = `"${common}" món ăn thành phẩm -chợ -mua`;
  } else if (cat === 'recycle') {
    query = `"${common}" tự chế làm vườn thực tế -shopee -lazada`;
  } else if (cat === 'space') {
    query = `"${common}" thiết kế sân vườn thực tế -bán -giá`;
  } else if (cat === 'forest') {
    query = `"${common}" phong cảnh thiên nhiên Việt Nam`;
  } else {
    query = sci ? `"${sci}" "${common}" cây trồng` : `"${common}" cây trồng`;
  }

  // &tbs=sur:cl : Lọc ảnh có giấy phép Creative Commons cho phép sử dụng lại
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}&tbs=sur:cl`;
}
