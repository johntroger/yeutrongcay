/**
 * MÁY TÍNH THỜI VỤ GIEO TRỒNG & ĐẾM NGƯỢC NGÀY THU HOẠCH
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 */

export interface GrowthMilestone {
  stage: string;
  stage_en: string;
  days_offset: number;
  icon: string;
  description_vi: string;
  description_en: string;
  care_tip_vi: string;
  care_tip_en: string;
}

export interface CropGrowthPreset {
  id: string;
  name_vi: string;
  name_en: string;
  category: 'herb' | 'fruit' | 'veggie' | 'flower';
  icon: string;
  total_days_to_harvest: number;
  milestones: GrowthMilestone[];
  tet_harvest_note_vi?: string;
  tet_harvest_note_en?: string;
}

export const CROP_PRESETS: CropGrowthPreset[] = [
  {
    id: 'cherry_tomato',
    name_vi: 'Cà Chua Bi Ban Công',
    name_en: 'Balcony Cherry Tomato',
    category: 'fruit',
    icon: '🍅',
    total_days_to_harvest: 75,
    tet_harvest_note_vi: 'Để kịp thu hoạch đỏ cây đón Tết, nên gieo hạt chậm nhất vào khoảng 15 - 20 tháng 10 Âm lịch.',
    tet_harvest_note_en: 'To harvest ripe red tomatoes for Lunar New Year, sow seeds before mid-October lunar month.',
    milestones: [
      {
        stage: 'Nảy mầm',
        stage_en: 'Sprouting',
        days_offset: 6,
        icon: '🌱',
        description_vi: 'Hạt nứt nanh, nhú 2 lá mầm xanh biếc',
        description_en: 'Cotyledons break through soil surface',
        care_tip_vi: 'Để nơi có nắng nhẹ buổi sáng, giữ ẩm giá thể bằng bình xịt phun sương.',
        care_tip_en: 'Place in gentle morning sunlight and mist lightly to maintain humidity.'
      },
      {
        stage: 'Ra ngôi sang chậu lớn',
        stage_en: 'Transplanting',
        days_offset: 22,
        icon: '🪴',
        description_vi: 'Cây đạt 4-5 lá thật, cao 12-15cm, rễ khỏe',
        description_en: 'Seedling has 4-5 true leaves and robust roots',
        care_tip_vi: 'Trộn đất với trùn quế và vỏ trứng gà, cắm cọc đỡ thân mềm.',
        care_tip_en: 'Plant into deep pots with worm castings and stake the main stem.'
      },
      {
        stage: 'Trổ chùm hoa vàng',
        stage_en: 'Flowering',
        days_offset: 45,
        icon: '🌼',
        description_vi: 'Cây bắt đầu bung chùm hoa đầu tiên',
        description_en: 'First floral clusters open brightly',
        care_tip_vi: 'Bón bổ sung kali hữu cơ, rung nhẹ thân cây vào 9h sáng để hỗ trợ thụ phấn.',
        care_tip_en: 'Feed organic potassium and gently vibrate flower clusters at 9 AM for pollination.'
      },
      {
        stage: 'Thu hoạch quả chín',
        stage_en: 'Harvest',
        days_offset: 75,
        icon: '🍅',
        description_vi: 'Chùm quả chuyển màu đỏ mọng ngọt đậm',
        description_en: 'Clusters turn deep glossy sweet red',
        care_tip_vi: 'Hái từng chùm khi quả chín đều, tỉa bớt lá già bên dưới chùm để nuôi lứa trên.',
        care_tip_en: 'Harvest whole clusters when uniformly ripe and trim lower old leaves.'
      }
    ]
  },
  {
    id: 'cucumber',
    name_vi: 'Dưa Leo Baby Giàn Ban Công',
    name_en: 'Balcony Baby Cucumber',
    category: 'fruit',
    icon: '🥒',
    total_days_to_harvest: 50,
    tet_harvest_note_vi: 'Giống lớn cực nhanh, chỉ cần gieo trước Tết khoảng 50 ngày (đầu tháng 11 Âm lịch).',
    tet_harvest_note_en: 'Fast growing vine; sow 50 days before Tet to enjoy crisp fresh fruit.',
    milestones: [
      {
        stage: 'Nảy mầm nhanh',
        stage_en: 'Quick Sprouting',
        days_offset: 4,
        icon: '🌱',
        description_vi: 'Mầm bật mạnh vươn cao',
        description_en: 'Vigorous hypocotyl pushes through soil',
        care_tip_vi: 'Tưới nước vừa đủ, không để ứ nước gây thối rễ non.',
        care_tip_en: 'Water moderately without pooling to prevent damping-off.'
      },
      {
        stage: 'Leo giàn & Bấm nhánh',
        stage_en: 'Climbing Trellis',
        days_offset: 18,
        icon: '🌿',
        description_vi: 'Cây ra tua cuốn bám giàn leo',
        description_en: 'Tendrils latch firmly onto balcony wire',
        care_tip_vi: 'Bấm bỏ nhánh phụ từ đốt lá 1 đến 5 để cây dồn sức leo lên giàn chính.',
        care_tip_en: 'Prune lateral suckers from nodes 1-5 to encourage top vine climbing.'
      },
      {
        stage: 'Nở hoa cái & Đậu trái',
        stage_en: 'Fruit Set',
        days_offset: 32,
        icon: '🌸',
        description_vi: 'Hoa cái mang bầu quả non hé nở',
        description_en: 'Female blossoms open with baby fruitlets',
        care_tip_vi: 'Bọc túi lưới bảo vệ quả non tránh ruồi vàng chích.',
        care_tip_en: 'Slip mesh bags over young fruitlets to thwart fruit flies.'
      },
      {
        stage: 'Thu hoạch dưa giòn ngọt',
        stage_en: 'Harvest',
        days_offset: 50,
        icon: '🥒',
        description_vi: 'Quả suôn thẳng, gai mềm, ruột đặc',
        description_en: 'Crisp, seedless baby cucumbers ready',
        care_tip_vi: 'Cắt quả vào sáng sớm, hái liên tục để kích cây nuôi lứa hoa tiếp theo.',
        care_tip_en: 'Clip fruit in the morning to encourage successive flower sets.'
      }
    ]
  },
  {
    id: 'chili',
    name_vi: 'Ớt Chỉ Thiên & Ớt Kiểng',
    name_en: 'Hot Bird-Eye Chili & Ornamental',
    category: 'fruit',
    icon: '🌶️',
    total_days_to_harvest: 85,
    tet_harvest_note_vi: 'Ớt kiểng đỏ cây ngày Tết tượng trưng cho may mắn, nên gieo từ đầu tháng 9 Âm lịch.',
    tet_harvest_note_en: 'Red chili brings auspicious fortune for Tet; start seedlings in 9th lunar month.',
    milestones: [
      {
        stage: 'Nảy mầm',
        stage_en: 'Germination',
        days_offset: 8,
        icon: '🌱',
        description_vi: 'Vỏ hạt cứng nứt nanh chậm nhưng đều',
        description_en: 'Seed coat cracks under gentle soil warmth',
        care_tip_vi: 'Ngâm hạt nước ấm 50°C trong 4 tiếng trước khi gieo.',
        care_tip_en: 'Pre-soak seeds in warm water (50°C) for 4 hours before sowing.'
      },
      {
        stage: 'Ngắt ngọn tạo tán',
        stage_en: 'Pinching & Bushing',
        days_offset: 25,
        icon: '✂️',
        description_vi: 'Cây có 7-8 lá thật, thân bắt đầu cứng cáp',
        description_en: 'Stem hardens with 7-8 true leaves',
        care_tip_vi: 'Ngắt ngọn đọt chính để cây bung 4-6 cành cấp 1 thành bụi xum xuê.',
        care_tip_en: 'Pinch primary stem tip to stimulate 4-6 bushy secondary fruiting shoots.'
      },
      {
        stage: 'Hoa trắng nở rộ',
        stage_en: 'Flowering',
        days_offset: 55,
        icon: '⭐',
        description_vi: 'Hoa trắng nhỏ hé mở tại các nách cành',
        description_en: 'Star-shaped white flowers bloom at node axils',
        care_tip_vi: 'Hạn chế tưới phân đạm, tăng kali và canxi chống rụng nụ hoa.',
        care_tip_en: 'Withhold excess nitrogen; enrich with calcium-potassium to retain flowers.'
      },
      {
        stage: 'Thu hoạch ớt chín đỏ',
        stage_en: 'Harvest',
        days_offset: 85,
        icon: '🌶️',
        description_vi: 'Quả chuyển đỏ rực hoặc cam vàng rực rỡ',
        description_en: 'Fiery peppers turn deep scarlet or gold',
        care_tip_vi: 'Dùng kéo cắt cuống tránh làm xước vỏ cành; bón thúc phân trùn quế để cây cho trái bền quanh năm.',
        care_tip_en: 'Snip stalks with scissors to protect shoots; feed castings for multi-season harvests.'
      }
    ]
  },
  {
    id: 'culinary_herbs',
    name_vi: 'Rau Thơm & Húng Chanh (Gia Vị)',
    name_en: 'Native Culinary Herbs & Mint',
    category: 'herb',
    icon: '🌿',
    total_days_to_harvest: 30,
    tet_harvest_note_vi: 'Lớn cực nhanh, gieo hoặc giâm cành bất kỳ lúc nào trong tháng Chạp là đủ rau gia vị Tết.',
    tet_harvest_note_en: 'Rapid growth; sow or cut any time during 12th lunar month for fresh Tet garnishes.',
    milestones: [
      {
        stage: 'Bén rễ hồi xanh',
        stage_en: 'Rooting',
        days_offset: 5,
        icon: '🌱',
        description_vi: 'Cành giâm bén rễ trắng non, hạt nứt mầm',
        description_en: 'Cuttings develop healthy white root tips',
        care_tip_vi: 'Đặt trong bóng râm mát, che nắng trực tiếp 3 ngày đầu.',
        care_tip_en: 'Keep in dappled shade; protect from harsh midday sun for first 3 days.'
      },
      {
        stage: 'Bung chồi non nách lá',
        stage_en: 'Shoot Expansion',
        days_offset: 15,
        icon: '🌿',
        description_vi: 'Chồi non bung mạnh, tỏa hương thơm tự nhiên',
        description_en: 'Lateral shoots surge with distinct herbal aroma',
        care_tip_vi: 'Đưa ra nắng sáng 4-5 tiếng để lá tích lũy tinh dầu đậm đặc.',
        care_tip_en: 'Expose to 4-5 hours of morning sun to maximize essential oil synthesis.'
      },
      {
        stage: 'Bón thúc đợt 1',
        stage_en: 'Foliage Boost',
        days_offset: 22,
        icon: '🍃',
        description_vi: 'Bụi rau xum xuê kín miệng chậu',
        description_en: 'Lush herb canopy spreads over pot rim',
        care_tip_vi: 'Tưới nước vo gạo ủ chua loãng hoặc dịch chuối ủ men.',
        care_tip_en: 'Water with fermented rice rinse or mild banana peel tea.'
      },
      {
        stage: 'Cắt tỉa thu hoạch',
        stage_en: 'Continuous Harvest',
        days_offset: 30,
        icon: '✂️',
        description_vi: 'Lá dày mọng, thu hoạch ngọn liên tục',
        description_en: 'Crisp succulent leaves ready for harvesting',
        care_tip_vi: 'Ngắt ngọn cách gốc 5cm, cây sẽ tiếp tục đẻ nhánh mới ăn quanh năm.',
        care_tip_en: 'Harvest top shoots 5cm above node; plant regenerates indefinitely.'
      }
    ]
  },
  {
    id: 'brassica_greens',
    name_vi: 'Rau Cải Ngọt, Cải Thìa & Cải Kale',
    name_en: 'Bok Choy, Mustard Greens & Kale',
    category: 'veggie',
    icon: '🥬',
    total_days_to_harvest: 35,
    tet_harvest_note_vi: 'Rau ăn lá ngắn ngày, gieo đầu tháng 12 Âm lịch là đúng dịp thu hoạch rau tươi cuốn thịt Tết.',
    tet_harvest_note_en: 'Short-cycle greens; sow in early 12th lunar month for fresh Tet spring rolls.',
    milestones: [
      {
        stage: 'Nảy mầm',
        stage_en: 'Germination',
        days_offset: 3,
        icon: '🌱',
        description_vi: 'Mầm xanh nhú đồng loạt sau 48-72h',
        description_en: 'Seedlings emerge evenly within 48-72 hours',
        care_tip_vi: 'Che lưới chống chim và sâu bọ cắn cụt mầm non.',
        care_tip_en: 'Net against sparrows and early hungry cutworms.'
      },
      {
        stage: 'Tỉa thưa định mật độ',
        stage_en: 'Thinning',
        days_offset: 12,
        icon: '🪴',
        description_vi: 'Cây con có 2-3 lá thật',
        description_en: 'Seedlings produce 2-3 true leaves',
        care_tip_vi: 'Nhổ bớt cây còi ăn sống, để cây khỏe cách nhau 12-15cm.',
        care_tip_en: 'Thin out crowded microgreens; space sturdy plants 12-15cm apart.'
      },
      {
        stage: 'Bón thúc lá lớn nhanh',
        stage_en: 'Leaf Growth',
        days_offset: 22,
        icon: '🌿',
        description_vi: 'Bẹ lá dày, màu xanh mướt óng',
        description_en: 'Glossy succulent petiole bases expand',
        care_tip_vi: 'Bón bổ sung phân trùn quế rắc gốc, tưới đẫm sáng sớm.',
        care_tip_en: 'Top-dress with worm castings and water thoroughly at dawn.'
      },
      {
        stage: 'Thu hoạch trọn vẹn',
        stage_en: 'Harvest',
        days_offset: 35,
        icon: '🥬',
        description_vi: 'Bụi cải đạt trọng lượng tối ưu, giòn ngọt',
        description_en: 'Heads reach peak sweetness and tenderness',
        care_tip_vi: 'Có thể tỉa bẹ ngoài ăn dần hoặc nhổ cả bụi thu hoạch.',
        care_tip_en: 'Cut outer leaves successively or harvest whole heads.'
      }
    ]
  },
  {
    id: 'marigold_tet',
    name_vi: 'Cúc Vạn Thọ & Hoa Cảnh Đón Tết',
    name_en: 'Tet Marigolds & Festive Blooms',
    category: 'flower',
    icon: '🌼',
    total_days_to_harvest: 70,
    tet_harvest_note_vi: 'Chuẩn lịch vụ đón Tết: Gieo hạt khoảng ngày 20 - 25 tháng 10 Âm lịch để hoa bung nở rực rỡ đúng mùng 1 Tết.',
    tet_harvest_note_en: 'Golden Tet timing: Sow seeds around 20-25th of 10th lunar month for blooms on Lunar New Year.',
    milestones: [
      {
        stage: 'Nảy mầm',
        stage_en: 'Sprouting',
        days_offset: 5,
        icon: '🌱',
        description_vi: 'Cây con vươn thẳng đón nắng',
        description_en: 'Seedlings emerge vigorously upright',
        care_tip_vi: 'Cho đón nắng sáng sớm 3 tiếng để thân không bị vống dài.',
        care_tip_en: 'Expose to 3 hours of direct sun to prevent spindly leggy stems.'
      },
      {
        stage: 'Bấm đọt tạo tán tròn',
        stage_en: 'Pinching for Shape',
        days_offset: 25,
        icon: '✂️',
        description_vi: 'Cây có 5-6 cặp lá thật',
        description_en: 'Main stalk bears 5-6 pairs of true leaves',
        care_tip_vi: 'Ngắt ngọn chồi chính để kích thích 6-8 nhánh phụ bung đều.',
        care_tip_en: 'Pinch apical bud to foster 6-8 radial blooming branches.'
      },
      {
        stage: 'Ôm nụ hoa tròn',
        stage_en: 'Budding',
        days_offset: 50,
        icon: '🏵️',
        description_vi: 'Mỗi đầu cành xuất hiện 1 nụ hoa bằng hạt ngô',
        description_en: 'Pea-sized flower buds form at every tip',
        care_tip_vi: 'Tỉa bỏ các nụ con phụ, chỉ giữ nụ chính to tròn ở giữa.',
        care_tip_en: 'Disbud secondary side buds to channel vigor into prime blooms.'
      },
      {
        stage: 'Nở hoa rực rỡ đón Tết',
        stage_en: 'Full Bloom',
        days_offset: 70,
        icon: '🌼',
        description_vi: 'Hoa bung cánh kép vàng rực mang may mắn đầu xuân',
        description_en: 'Lush golden ruffled blooms usher in New Year prosperity',
        care_tip_vi: 'Tránh tưới nước thẳng vào cánh hoa, giữ ẩm đất nhẹ để hoa tươi lâu 20 ngày.',
        care_tip_en: 'Avoid wetting petals; sustain light soil moisture for 20+ day blooms.'
      }
    ]
  }
];

export interface CalculatedMilestone {
  stage: string;
  stage_en: string;
  dateStr: string;
  formattedDate: string;
  daysOffset: number;
  icon: string;
  description_vi: string;
  description_en: string;
  care_tip_vi: string;
  care_tip_en: string;
  isPast: boolean;
  isToday: boolean;
}

export interface CalculatedCropTimeline {
  preset: CropGrowthPreset;
  sowingDateStr: string;
  harvestDateStr: string;
  formattedSowingDate: string;
  formattedHarvestDate: string;
  totalDays: number;
  daysRemaining: number;
  progressPercent: number;
  isHarvestPast: boolean;
  milestones: CalculatedMilestone[];
  warningMessage?: string;
}

/**
 * Format Date thành YYYY-MM-DD
 */
export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Format Date thành DD/MM/YYYY
 */
export function formatDateDisplay(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

/**
 * Parse string YYYY-MM-DD an toàn theo giờ địa phương
 */
export function parseDateSafe(dateStr: string): Date {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }
  return new Date(dateStr);
}

/**
 * Chế độ 1: Tính xuôi từ Ngày gieo hạt
 */
export function calculateForwardTimeline(cropId: string, sowingDateInput: string | Date): CalculatedCropTimeline {
  const preset = CROP_PRESETS.find(p => p.id === cropId) || CROP_PRESETS[0];
  const sowingDate = typeof sowingDateInput === 'string' ? parseDateSafe(sowingDateInput) : new Date(sowingDateInput);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const harvestDate = new Date(sowingDate);
  harvestDate.setDate(harvestDate.getDate() + preset.total_days_to_harvest);

  const sowingDateNormalized = new Date(sowingDate);
  sowingDateNormalized.setHours(0, 0, 0, 0);
  const harvestDateNormalized = new Date(harvestDate);
  harvestDateNormalized.setHours(0, 0, 0, 0);

  const totalTimeMs = harvestDateNormalized.getTime() - sowingDateNormalized.getTime();
  const elapsedTimeMs = today.getTime() - sowingDateNormalized.getTime();
  const progressPercent = totalTimeMs > 0
    ? Math.min(100, Math.max(0, Math.round((elapsedTimeMs / totalTimeMs) * 100)))
    : 0;

  const diffDays = Math.ceil((harvestDateNormalized.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, diffDays);
  const isHarvestPast = harvestDateNormalized.getTime() < today.getTime();

  const milestones: CalculatedMilestone[] = preset.milestones.map(m => {
    const mDate = new Date(sowingDate);
    mDate.setDate(mDate.getDate() + m.days_offset);
    mDate.setHours(0, 0, 0, 0);

    const isPast = mDate.getTime() < today.getTime();
    const isToday = mDate.getTime() === today.getTime();

    return {
      stage: m.stage,
      stage_en: m.stage_en,
      dateStr: formatDateISO(mDate),
      formattedDate: formatDateDisplay(mDate),
      daysOffset: m.days_offset,
      icon: m.icon,
      description_vi: m.description_vi,
      description_en: m.description_en,
      care_tip_vi: m.care_tip_vi,
      care_tip_en: m.care_tip_en,
      isPast,
      isToday
    };
  });

  return {
    preset,
    sowingDateStr: formatDateISO(sowingDate),
    harvestDateStr: formatDateISO(harvestDate),
    formattedSowingDate: formatDateDisplay(sowingDate),
    formattedHarvestDate: formatDateDisplay(harvestDate),
    totalDays: preset.total_days_to_harvest,
    daysRemaining,
    progressPercent,
    isHarvestPast,
    milestones
  };
}

/**
 * Chế độ 2: Tính ngược từ Ngày muốn thu hoạch (Ví dụ: Đón Tết hoặc Sự kiện)
 */
export function calculateBackwardTimeline(cropId: string, targetHarvestDateInput: string | Date): CalculatedCropTimeline {
  const preset = CROP_PRESETS.find(p => p.id === cropId) || CROP_PRESETS[0];
  const targetDate = typeof targetHarvestDateInput === 'string' ? parseDateSafe(targetHarvestDateInput) : new Date(targetHarvestDateInput);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sowingDate = new Date(targetDate);
  sowingDate.setDate(sowingDate.getDate() - preset.total_days_to_harvest);
  sowingDate.setHours(0, 0, 0, 0);

  const result = calculateForwardTimeline(cropId, sowingDate);

  if (sowingDate.getTime() < today.getTime()) {
    const daysLate = Math.ceil((today.getTime() - sowingDate.getTime()) / (1000 * 60 * 60 * 24));
    result.warningMessage = `Đã muộn ${daysLate} ngày so với lịch gieo hạt tối ưu (${result.formattedSowingDate}). Bạn nên cân nhắc mua sẵn cây giống con (15-20 ngày tuổi) thay vì gieo hạt từ đầu để kịp thu hoạch!`;
  }

  return result;
}
