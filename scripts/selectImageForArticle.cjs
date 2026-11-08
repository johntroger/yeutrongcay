/**
 * THUẬT TOÁN TỰ ĐỘNG TÌM & CHỌN LỌC HÌNH ẢNH CHUẨN XÁC CHO BÀI VIẾT (CIRVA AUTO-SELECTOR)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * 
 * Mục đích:
 * Cung cấp công cụ tự động hóa hoàn toàn cho AI Agent / Quản trị viên khi tạo bài viết mới.
 * Tự động tìm kiếm, phân tích ngữ nghĩa, rà soát loại trừ, kiểm tra độ phân giải,
 * tỉ lệ khung hình (landscape 16:9 / 4:3), và kiểm tra tính sống (HTTP 200 Liveness).
 */

const crypto = require('crypto');
const https = require('https');
const http = require('http');

const CATEGORY_NEGATIVE_RULES = {
  forest: [
    /coffee|latte|restaurant|burger|pizza|alps|snow-mountain|swiss|canada|rockies|desert|arctic|indoor-living|bedroom/i
  ],
  culinary: [
    /coffee-cup|black-coffee|latte|cappuccino|beer|whiskey|cocktail|vodka|wine-glass|fast-food|burger|pizza|khoai[-_]mo/i
  ],
  space: [
    /macro-leaf|single-leaf|close-up-leaf|leaf-vein|underwater-coral|bedroom|living-room|bathroom|office-desk/i
  ],
  recycle: [
    /luxury-car|fashion-model|landfill|toxic-smoke|trash-pile|garbage-dump|urban-bio-materials|saving[-_]life|hospital|patient|surgery|clinical|syringe|blood|needle|infusion[-_]bag|principle\.png|schematic|vector[-_]diagram|flowchart|bernoulli|aerodynamic|tomato[-_]support/i
  ]
};

const CATEGORY_POSITIVE_KEYWORDS = {
  forest: ['cuc-phuong', 'cat-tien', 'phong-nha', 'hoang-lien', 'fansipan', 'con-dao', 'ba-be', 'ba-vi', 'pu-mat', 'tram-chim', 'can-gio', 'u-minh', 'yok-don', 'bidoup', 'bach-ma', 'bachma', 'national-park', 'np', 'mangrove', 'lake', 'rainforest', 'vietnam', 'hoanglienson', 'mountain', 'nature', 'reserve', 'falls', 'forest'],
  culinary: ['tea', 'syrup', 'honey', 'vinegar', 'sauce', 'soup', 'salt', 'spice', 'chili', 'ginger', 'perilla', 'sugarcane', 'papaya', 'sambal', 'elixir', 'herbal', 'vinaigrette', 'drink', 'broth', 'salad', 'dressing', 'canh', 'bayam', 'kemangi', 'ulek', 'seasoned', 'oil', 'juice', 'lemonade', 'calamansi', 'infusion', 'extract'],
  space: ['pergola', 'trellis', 'living-wall', 'vertical-garden', 'terrace', 'balcony', 'atrium', 'courtyard', 'rooftop', 'planter', 'greenhouse', 'urban-garden', 'raised-bed', 'pond', 'hydroponic-tower', 'hydroponic', 'tower', 'vertical', 'micro-forest', 'sky-garden', 'roof', 'garden', 'green', 'nest', 'architecture', 'permaculture', 'pflanzkasten', 'windowbox', 'modular', 'container'],
  recycle: ['sip', 'sub-irrigated', 'bokashi', 'compost', 'worm', 'drip', 'irrigation', 'diy', 'upcycle', 'plastic-bottle', 'bucket', 'pvc', 'hydroponic', 'venturi', 'bottle', 'self-watering', 'emitter', 'fertigation', 'fertilizer', 'organic', 'fermentation', 'tank', 'aquaponics', 'wick', 'citrongraes', 'chili', 'garlic', 'ginger', 'spray', 'repellent', 'bio', 'pesticide']
};

/**
 * Sinh từ khóa tối ưu để tra cứu Wikimedia Commons
 */
function buildWikiSearchQueries(article) {
  const cat = (article.category || '').toLowerCase();
  const common = (article.common_name || '').trim();
  const sci = (article.scientific_name || '').trim();
  const lower = common.toLowerCase();
  const queries = [];

  if (cat === 'forest') {
    const cleanPark = common.replace(/vườn quốc gia|khu bảo tồn|khu dự trữ sinh quyển/gi, '').trim();
    queries.push(`${cleanPark} National Park Vietnam`);
    queries.push(`${cleanPark} Vietnam landscape`);
  } else if (cat === 'culinary') {
    if (lower.includes('muối') || lower.includes('chấm')) {
      queries.push('seasoned salt herb mixture');
      queries.push('sambal ulek mortar');
      queries.push('spiced salt herb');
    } else if (lower.includes('dầu giấm') || lower.includes('sốt')) {
      queries.push('making vinaigrette salad dressing');
      queries.push('herb infused oil vinegar');
    } else if (lower.includes('canh')) {
      queries.push('canh Vietnamese vegetable soup');
      queries.push('sayur bening vegetable soup');
    } else if (lower.includes('siro') || lower.includes('syrup')) {
      queries.push('herbal syrup lemon honey');
    } else if (lower.includes('trà') || lower.includes('tea')) {
      queries.push('herbal tea cup glass');
    } else {
      if (sci && !sci.includes('Botanical')) queries.push(`${sci} herbal recipe`);
      queries.push(`${common} herbal drink food`);
    }
  } else if (cat === 'space') {
    if (lower.includes('mái') || lower.includes('sân thượng')) {
      queries.push('rooftop micro forest permaculture garden');
      queries.push('rooftop garden trees urban');
    } else if (lower.includes('tường đứng') || lower.includes('module')) {
      queries.push('living green wall vertical garden');
    } else if (lower.includes('giàn leo')) {
      queries.push('trellis pergola rooftop garden');
    } else if (lower.includes('ban công') || lower.includes('kệ')) {
      queries.push('balcony vegetable garden planter');
    } else {
      queries.push(`${common} urban garden architecture`);
    }
  } else if (cat === 'recycle') {
    if (lower.includes('chai nhựa') || lower.includes('nhỏ giọt')) {
      queries.push('bottle drip irrigation garden');
      queries.push('practicing bottle irrigation');
    } else if (lower.includes('xô sơn') || lower.includes('sip')) {
      queries.push('sub-irrigated planter bucket self-watering');
      queries.push('self watering container garden');
    } else if (lower.includes('venturi') || lower.includes('châm phân')) {
      queries.push('fertigation fertilizer injector irrigation');
    } else if (lower.includes('bút bi') || lower.includes('đầu tưới')) {
      queries.push('drip emitter irrigation dripper');
    } else if (lower.includes('vỏ chuối') || lower.includes('vỏ trứng') || lower.includes('ngâm')) {
      queries.push('organic liquid fertilizer fermentation tanks');
      queries.push('compost tea organic liquid fertilizer');
    } else {
      queries.push(`${common} DIY garden upcycling`);
    }
  } else {
    // Thực vật học (herb, fruit, ornamental)
    if (sci) queries.push(sci);
    queries.push(common);
  }

  return queries;
}

/**
 * Sinh câu truy vấn Google Search (cho món ăn/sáng chế đặc thù Việt Nam)
 */
function buildGoogleSearchInfo(article) {
  const cat = (article.category || '').toLowerCase();
  const common = (article.common_name || '').trim();
  let query = common;

  if (cat === 'culinary') query = `"${common}" món ăn thành phẩm -chợ -mua`;
  else if (cat === 'recycle') query = `"${common}" tự chế làm vườn thực tế -shopee -lazada`;
  else if (cat === 'space') query = `"${common}" thiết kế sân vườn thực tế -bán -giá`;
  else if (cat === 'forest') query = `"${common}" phong cảnh thiên nhiên Việt Nam`;

  return {
    query,
    googleImagesUrl: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}&tbs=sur:cl`
  };
}

/**
 * Đánh giá điểm CIRVA của 1 ứng viên ảnh
 */
function evaluateCandidateCIRVA(article, candidate) {
  const cat = (article.category || '').toLowerCase();
  const commonName = (article.common_name || '').trim();
  const url = candidate.url || '';
  const cleanUrl = url.toLowerCase();
  let score = 100;
  const issues = [];

  // 1. Kiểm tra Blacklist
  const negPatterns = CATEGORY_NEGATIVE_RULES[cat] || [];
  for (const pat of negPatterns) {
    if (pat.test(url)) {
      issues.push(`Vi phạm quy tắc loại trừ chuyên mục [${cat}]: ${pat.toString()}`);
      score -= 70;
      break;
    }
  }

  // 2. Kiểm tra tỉ lệ khung hình (Aspect Ratio & Resolution)
  if (candidate.width && candidate.height) {
    const ratio = candidate.width / candidate.height;
    if (ratio < 1.0) {
      issues.push('Ảnh dọc (portrait), không phù hợp làm hero banner ngang');
      score -= 25;
    } else if (ratio >= 1.2 && ratio <= 1.9) {
      score += 10; // Chuẩn 16:9 hoặc 4:3
    }
    if (candidate.width < 600 || candidate.height < 400) {
      issues.push('Độ phân giải quá nhỏ (< 600x400)');
      score -= 20;
    }
  }

  // 3. Kiểm tra từ khóa ngữ cảnh bắt buộc (space, recycle, culinary)
  if (['space', 'recycle', 'culinary', 'forest'].includes(cat)) {
    const posList = CATEGORY_POSITIVE_KEYWORDS[cat] || [];
    const hasPos = posList.some(kw => cleanUrl.includes(kw.toLowerCase()));
    if (!hasPos) {
      score -= 30;
      issues.push(`Thiếu từ khóa ngữ cảnh chuyên mục [${cat}]`);
    } else {
      score += 15;
    }
  }

  // 4. Kiểm tra thành phẩm món ăn (culinary)
  if (cat === 'culinary') {
    const lowerCommon = commonName.toLowerCase();
    if (lowerCommon.includes('muối') || lowerCommon.includes('chấm')) {
      if (!/salt|sambal|ulek|mixture|spice|seasoning|seasoned/i.test(url)) {
        issues.push('Bài viết về Muối/Thức chấm nhưng ảnh không phản ánh muối/hỗn hợp gia vị');
        score -= 35;
      }
    }
    if (lowerCommon.includes('dầu giấm') || lowerCommon.includes('sốt')) {
      if (!/vinaigrette|dressing|oil|vinegar|sauce|making/i.test(url)) {
        issues.push('Bài viết về Dầu giấm/Sốt trộn nhưng ảnh là cành lá tươi thô');
        score -= 35;
      }
    }
    if (lowerCommon.includes('canh') && /khoai[-_]mo/i.test(url)) {
      issues.push('Canh khoai mỡ tím đối lập với canh rau đồng quê');
      score -= 50;
    }
  }

  // 5. Kiểm tra cơ chế tái chế (recycle)
  if (cat === 'recycle') {
    const lowerCommon = commonName.toLowerCase();
    if (lowerCommon.includes('chai nhựa') && /saving[-_]life/i.test(url)) {
      issues.push('Ảnh dụng cụ y tế cứu người, không đúng ngữ cảnh làm vườn');
      score -= 70;
    }
    if (lowerCommon.includes('xô sơn') && /tomato[-_]support/i.test(url)) {
      issues.push('Ảnh giàn cà chua thường, không thể hiện chậu tự hút nước SIP');
      score -= 40;
    }
    if (lowerCommon.includes('venturi') && /principle/i.test(url)) {
      issues.push('Sơ đồ nguyên lý vật lý lý thuyết, không phản ánh bộ châm phân thực tế');
      score -= 50;
    }
  }

  // Thưởng nguồn uy tín
  if (cleanUrl.includes('wikimedia.org') || cleanUrl.includes('wikipedia.org')) {
    score += 5;
  }

  score = Math.max(0, Math.min(100, score));
  return {
    score,
    isApproved: score >= 75 && issues.length === 0,
    issues
  };
}

/**
 * Ping HTTP HEAD kiểm tra xem ảnh có sống và phản hồi HTTP 200 không
 */
function checkUrlLiveness(url) {
  return new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.request(url, {
        method: 'HEAD',
        timeout: 5000,
        headers: {
          'User-Agent': 'YeuTrongCayBot/1.0 (https://yeutrongcay.com; contact@yeutrongcay.com)'
        }
      }, (res) => {
        const isLive = res.statusCode === 200;
        const contentType = res.headers['content-type'] || '';
        const isImage = contentType.startsWith('image/');
        resolve({
          isLive: isLive && isImage,
          statusCode: res.statusCode,
          contentType
        });
      });

      req.on('error', () => resolve({ isLive: false, statusCode: 0 }));
      req.on('timeout', () => {
        req.destroy();
        resolve({ isLive: false, statusCode: 408 });
      });
      req.end();
    } catch {
      resolve({ isLive: false, statusCode: 0 });
    }
  });
}

/**
 * Gọi Wikimedia Commons API để tìm kiếm danh sách ứng viên
 */
function searchWikimediaCandidates(query) {
  return new Promise((resolve) => {
    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(
      query
    )}&gsrlimit=12&prop=imageinfo&iiprop=url|size|mime|dimensions&format=json`;

    https.get(apiUrl, {
      headers: {
        'User-Agent': 'YeuTrongCayBot/1.0 (https://yeutrongcay.com; contact@yeutrongcay.com)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query?.pages || {};
          const candidates = [];
          for (const page of Object.values(pages)) {
            const info = page.imageinfo?.[0];
            if (info && info.url && info.mime && info.mime.startsWith('image/') && !info.mime.includes('svg')) {
              candidates.push({
                title: page.title,
                url: info.url,
                width: info.width || 0,
                height: info.height || 0,
                size: info.size || 0,
                mime: info.mime
              });
            }
          }
          resolve(candidates);
        } catch {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

/**
 * THUẬT TOÁN CHỌN ẢNH TỐI ƯU TOÀN DIỆN CHO BÀI VIẾT
 */
async function selectBestImageForArticle(article) {
  const wikiQueries = buildWikiSearchQueries(article);
  const googleInfo = buildGoogleSearchInfo(article);

  console.log(`[CIRVA-AutoSelector] Bắt đầu tìm kiếm ảnh cho: "${article.common_name}" [${article.category}]`);
  
  // 1. Tìm ứng viên từ Wikimedia Commons theo các query tối ưu
  let allCandidates = [];
  for (const q of wikiQueries) {
    const results = await searchWikimediaCandidates(q);
    if (results.length > 0) {
      allCandidates = allCandidates.concat(results);
    }
  }

  // Khử trùng lặp theo URL
  const uniqueCandidates = Array.from(new Map(allCandidates.map(c => [c.url, c])).values());

  // 2. Chấm điểm CIRVA cho từng ứng viên
  const evaluatedCandidates = [];
  for (const cand of uniqueCandidates) {
    const evalResult = evaluateCandidateCIRVA(article, cand);
    evaluatedCandidates.push({
      ...cand,
      score: evalResult.score,
      isApproved: evalResult.isApproved,
      issues: evalResult.issues
    });
  }

  // Sắp xếp điểm giảm dần
  evaluatedCandidates.sort((a, b) => b.score - a.score);

  // 3. Kiểm tra Liveness cho ứng viên điểm cao nhất
  let bestCandidate = null;
  for (const cand of evaluatedCandidates) {
    if (cand.score >= 75) {
      const live = await checkUrlLiveness(cand.url);
      if (live.isLive) {
        bestCandidate = cand;
        break;
      }
    }
  }

  if (bestCandidate) {
    const sha256 = crypto.createHash('sha256').update(bestCandidate.url).digest('hex');
    return {
      status: 'APPROVED',
      image_url: bestCandidate.url,
      image_sha256: sha256,
      score: bestCandidate.score,
      dimensions: `${bestCandidate.width}x${bestCandidate.height}`,
      source: 'Wikimedia Commons',
      candidateTitle: bestCandidate.title
    };
  }

  // Trường hợp không có ảnh Wikimedia nào đạt chuẩn (thường rơi vào ẩm thực bản địa Việt Nam)
  return {
    status: 'NEED_WEB_SEARCH',
    message: 'Kho Wikimedia không có ảnh đạt chuẩn CIRVA (>= 75 điểm). Bắt buộc lấy ảnh từ Web / Google Images.',
    googleQuery: googleInfo.query,
    googleImagesUrl: googleInfo.googleImagesUrl,
    topFailedCandidates: evaluatedCandidates.slice(0, 3).map(c => ({
      title: c.title,
      score: c.score,
      issues: c.issues
    }))
  };
}

// Chạy trực tiếp từ dòng lệnh CLI nếu được gọi
if (require.main === module) {
  const args = process.argv.slice(2);
  const getArg = (key) => {
    const prefix = `--${key}=`;
    const found = args.find(a => a.startsWith(prefix));
    return found ? found.substring(prefix.length) : '';
  };

  const name = getArg('name') || 'Vườn Rừng Thu Nhỏ Trên Mái';
  const category = getArg('category') || 'space';
  const sci = getArg('sci') || '';
  const desc = getArg('desc') || '';

  selectBestImageForArticle({
    common_name: name,
    category: category,
    scientific_name: sci,
    description: desc
  }).then(res => {
    console.log('\n================ KẾT QUẢ CIRVA AUTO-SELECTOR ================');
    console.log(JSON.stringify(res, null, 2));
  });
}

module.exports = {
  selectBestImageForArticle,
  evaluateCandidateCIRVA,
  buildWikiSearchQueries,
  buildGoogleSearchInfo,
  checkUrlLiveness
};
