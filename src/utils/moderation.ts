/**
 * BỘ LỌC KIỂM DUYỆT TỰ ĐỘNG CỘNG ĐỒNG & SÁCH ĐỎ / LOÀI XÂM HẠI (MS5 - H6, H15)
 * Dựa trên:
 * - Nghị định 06/2019/NĐ-CP & NĐ 84/2021/NĐ-CP (Thực vật rừng nguy cấp, quý, hiếm Nhóm IA/IIA)
 * - Thông tư 35/2018/TT-BTNMT (Danh mục loài ngoại lai xâm hại và có nguy cơ xâm hại)
 * - Thông tư 10/2019/TT-BNNPTNT (Thuốc bảo vệ thực vật cấm sử dụng tại Việt Nam)
 */

export interface ModerationResult {
  isBlocked: boolean;
  isFlagged: boolean;
  term?: string;
  category?: 'red_list' | 'invasive' | 'banned_chemical' | 'dangerous_claim' | 'spam';
  reason?: string;
  suggestion?: string;
}

// Danh sách quy định kiểm duyệt
const MODERATION_RULES: {
  keywords: string[];
  category: 'red_list' | 'invasive' | 'banned_chemical' | 'dangerous_claim' | 'spam';
  isBlocked: boolean; // Chặn hẳn (true) hoặc đưa vào hàng đợi duyệt (false)
  reason: string;
  suggestion: string;
}[] = [
  // 1. Sách Đỏ Việt Nam - Nhóm IA (Nghiêm cấm khai thác, trao đổi hoang dã)
  {
    keywords: ['lan hài việt nam', 'lan hài', 'paphiopedilum', 'lan kim tuyến rừng', 'anoectochilus', 'sâm ngọc linh rừng'],
    category: 'red_list',
    isBlocked: true,
    reason: 'Loài thực vật quý hiếm nằm trong Sách Đỏ hoặc Nhóm IA cấm khai thác hoang dã trái phép (Nghị định 06/2019/NĐ-CP).',
    suggestion: 'Chỉ được phép trao đổi giống cây đã thuần dưỡng có hồ sơ nguồn gốc từ cơ sở ươm tạo giống hợp pháp.'
  },
  // 2. Loài ngoại lai xâm hại nguy hiểm (Thông tư 35/2018/TT-BTNMT)
  {
    keywords: ['mai dương', 'trinh nữ móc gai', 'mimosa pigra', 'ốc bươu vàng', 'pomacea', 'cúc bò lan', 'cỏ chổi', 'orobanche'],
    category: 'invasive',
    isBlocked: true,
    reason: 'Sinh vật ngoại lai xâm hại nguy hại, đe dọa đa dạng sinh học và thảm thực vật bản địa (TT 35/2018/TT-BTNMT).',
    suggestion: 'Hệ thống Yêu Trồng Cây nghiêm cấm chia sẻ, nhân nuôi hoặc phát tán các loài ngoại lai xâm hại.'
  },
  // 3. Hóa chất bảo vệ thực vật cực độc đã bị cấm hoàn toàn tại Việt Nam
  {
    keywords: ['paraquat', '2,4-d', 'chlorpyrifos', 'glyphosate'],
    category: 'banned_chemical',
    isBlocked: true,
    reason: 'Hóa chất bảo vệ thực vật cực độc đã bị Bộ Nông nghiệp & PTNT cấm lưu hành tại Việt Nam.',
    suggestion: 'Hãy sử dụng các biện pháp sinh học hữu cơ như dung dịch tỏi ớt gừng, dầu neem hoặc nấm đối kháng Trichoderma.'
  },
  // 4. Tuyên bố y tế nguy hại / Thần dược chữa ung thư sai sự thật
  {
    keywords: ['chữa khỏi ung thư', 'trị dứt điểm ung thư', 'thần dược', 'uống thay thuốc tây', 'cải tử hoàn sinh'],
    category: 'dangerous_claim',
    isBlocked: false,
    reason: 'Tuyên bố y khoa cường điệu hoặc khuyến nghị bỏ thuốc tây y tế có thể gây nguy hại đến tính mạng.',
    suggestion: 'Mọi công dụng của thảo dược chỉ mang tính hỗ trợ bồi bổ sức khỏe theo y học cổ truyền, cần tham vấn bác sĩ.'
  },
  // 5. Spam thương mại / Cờ bạc trá hình
  {
    keywords: ['cá độ', 'lô đề', 'kubet', 'shbet', 'nạp tiền', 'mua bán số lượng lớn', 'inbox báo giá'],
    category: 'spam',
    isBlocked: true,
    reason: 'Nội dung quảng cáo thương mại hoặc spam vi phạm tôn chỉ cộng đồng phi lợi nhuận.',
    suggestion: 'Yêu Trồng Cây là nền tảng chia sẻ và tặng giống cây phi lợi nhuận giữa những người yêu vườn phố.'
  }
];

/**
 * Kiểm tra văn bản nhập vào theo chuẩn kiểm duyệt cộng đồng
 */
export function checkCommunityModeration(text: string): ModerationResult {
  if (!text) {
    return { isBlocked: false, isFlagged: false };
  }

  const normalized = text.toLowerCase();

  for (const rule of MODERATION_RULES) {
    for (const kw of rule.keywords) {
      if (normalized.includes(kw)) {
        return {
          isBlocked: rule.isBlocked,
          isFlagged: true,
          term: kw,
          category: rule.category,
          reason: rule.reason,
          suggestion: rule.suggestion
        };
      }
    }
  }

  return { isBlocked: false, isFlagged: false };
}
