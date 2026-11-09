/**
 * TIỆN ÍCH LỊCH NÔNG NGHIỆP: 24 TIẾT KHÍ, TUẦN TRĂNG & ĐỒNG BỘ LỊCH (GOOGLE CALENDAR / ICAL)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 */

export interface SolarTermInfo {
  name_vi: string;
  name_en: string;
  approx_date: string; // ví dụ: "05/01"
  meaning_vi: string;
  meaning_en: string;
  garden_advice_vi: string;
  garden_advice_en: string;
}

export interface MonthSolarTerms {
  term1: SolarTermInfo;
  term2: SolarTermInfo;
  moon_phase_advice_vi: string;
  moon_phase_advice_en: string;
}

export const TWENTY_FOUR_SOLAR_TERMS: Record<number, MonthSolarTerms> = {
  1: {
    term1: {
      name_vi: 'Tiểu Hàn (Chớm rét đậm)',
      name_en: 'Minor Cold (Xiao Han)',
      approx_date: '05/01 - 06/01',
      meaning_vi: 'Thời điểm bắt đầu chuỗi ngày rét ngọt và sương muối cuối năm.',
      meaning_en: 'Onset of significant seasonal winter chills and frost.',
      garden_advice_vi: 'Tưới nước ấm nhẹ vào 10h trưa khi có nắng, che chắn gió bấc cho chậu cảnh.',
      garden_advice_en: 'Water around 10 AM with lukewarm water; shield planters from northern gusts.'
    },
    term2: {
      name_vi: 'Đại Hàn (Rét cực độ)',
      name_en: 'Major Cold (Da Han)',
      approx_date: '20/01 - 21/01',
      meaning_vi: 'Đợt rét đậm nhất trong năm, kết thúc 24 tiết khí trước thềm Tết.',
      meaning_en: 'Peak winter cold marking the final solar term before Lunar New Year.',
      garden_advice_vi: 'Ủ ấm gốc bằng rơm mục hoặc trấu hun, tỉa cành già đón lộc xuân.',
      garden_advice_en: 'Mulch plant bases with rice husks or compost; prune dead twigs for spring buds.'
    },
    moon_phase_advice_vi: 'Nửa đầu tháng (trăng lớn) kích thích chồi quất và bưởi cảnh đón Tết; nửa cuối tháng (trăng tàn) bón thúc phân hữu cơ giữ ấm rễ.',
    moon_phase_advice_en: 'Waxing moon favors foliage bud development; waning moon is ideal for root mulching and slow-release organic feeding.'
  },
  2: {
    term1: {
      name_vi: 'Lập Xuân (Bắt đầu mùa xuân)',
      name_en: 'Beginning of Spring (Li Chun)',
      approx_date: '04/02 - 05/02',
      meaning_vi: 'Khởi đầu tiết xuân, vạn vật bắt đầu thức giấc đâm chồi nảy lộc.',
      meaning_en: 'Beginning of the spring season, sap rises and vegetation stirs awake.',
      garden_advice_vi: 'Thời điểm vàng để giâm cành thảo dược và thay đất sang chậu lớn.',
      garden_advice_en: 'Prime window for herb cuttings and potting up established plants.'
    },
    term2: {
      name_vi: 'Vũ Thủy (Mưa ẩm bung rễ)',
      name_en: 'Rain Water (Yu Shui)',
      approx_date: '18/02 - 19/02',
      meaning_vi: 'Mưa phùn xuân giăng khắp nơi, độ ẩm đất và không khí tăng vọt.',
      meaning_en: 'Spring rain softens the earth, air humidity rises sharply.',
      garden_advice_vi: 'Hạn chế tưới đẫm khi nồm ẩm, kê cao đáy chậu đề phòng úng rễ non.',
      garden_advice_en: 'Reduce watering during high humidity; elevate pots to safeguard delicate young roots.'
    },
    moon_phase_advice_vi: 'Trăng non tiết Lập Xuân có tỉ lệ giâm cành và gieo hạt sống trên 95%; trăng tròn đề phòng nấm mốc trắng do ẩm độ cao.',
    moon_phase_advice_en: 'New moon germination and cutting success exceeds 95%; watch for fungal spore emergence around full moon.'
  },
  3: {
    term1: {
      name_vi: 'Kinh Trập (Sâu bọ thức giấc)',
      name_en: 'Awakening of Insects (Jing Zhe)',
      approx_date: '05/03 - 06/03',
      meaning_vi: 'Sấm xuân rền vang, côn trùng và vi sinh vật trong lòng đất thức dậy.',
      meaning_en: 'Spring thunder rumbles, soil organisms and garden insects become active.',
      garden_advice_vi: 'Treo bẫy dính màu vàng, phun dầu neem sinh học phòng ngừa rệp non trước khi chúng bùng phát.',
      garden_advice_en: 'Hang yellow sticky traps and spray organic neem oil early before pest populations spike.'
    },
    term2: {
      name_vi: 'Xuân Phân (Điểm giữa mùa xuân)',
      name_en: 'Spring Equinox (Chun Fen)',
      approx_date: '20/03 - 21/03',
      meaning_vi: 'Ngày và đêm dài bằng nhau, thời tiết ấm áp chan hòa khắp 3 miền.',
      meaning_en: 'Day and night balance evenly; pleasant mild temperatures nationwide.',
      garden_advice_vi: 'Trồng cây ăn quả ban công (ổi lùn, cóc Thái, chanh tứ quý), bón phân trùn quế.',
      garden_advice_en: 'Plant balcony fruit trees (guava, dwarf ambarella, lime); nourish with worm castings.'
    },
    moon_phase_advice_vi: 'Tuần trăng lớn tuần 1-2 tháng 3 cực kỳ thích hợp ươm hạt dưa leo, cà chua bi; tuần trăng tàn tập trung bổ sung dinh dưỡng giá thể.',
    moon_phase_advice_en: 'Waxing moon accelerates tomato and cucumber seed germination; waning moon is best for soil conditioning.'
  },
  4: {
    term1: {
      name_vi: 'Thanh Minh (Trời quang mây tạnh)',
      name_en: 'Clear and Bright (Qing Ming)',
      approx_date: '04/04 - 05/04',
      meaning_vi: 'Gió mát mẻ, không khí trong trẻo, cây cối xanh tốt sum suê.',
      meaning_en: 'Fresh air, sunny skies, and vibrant growth across the garden.',
      garden_advice_vi: 'Thu hoạch lứa đầu tiên các loại rau thơm sấy trữ khô; cắt tỉa cành tăm bên trong tán.',
      garden_advice_en: 'Harvest initial aromatic herbs for drying; trim congested inner branches.'
    },
    term2: {
      name_vi: 'Cốc Vũ (Mưa rào dưỡng lúa)',
      name_en: 'Grain Rain (Gu Yu)',
      approx_date: '20/04 - 21/04',
      meaning_vi: 'Mưa rào đầu hạ đem theo nguồn đạm tự nhiên dồi dào từ sấm sét.',
      meaning_en: 'Early summer rains deliver rich natural nitrogen to container foliage.',
      garden_advice_vi: 'Hứng nước mưa sạch để tưới lan và cây cảnh; kiểm tra giàn leo trước cơn giông chiều.',
      garden_advice_en: 'Collect pristine rainwater for delicate foliage; secure balcony trellises against wind gusts.'
    },
    moon_phase_advice_vi: 'Gieo hạt cây gia vị trước tiết Cốc Vũ đón nước mưa đầu mùa; trăng tròn cắt ngọn kích thích phân nhánh bụi.',
    moon_phase_advice_en: 'Seed herbs before Grain Rain to capture nitrogen-rich moisture; pinch stems on full moon to encourage bushiness.'
  },
  5: {
    term1: {
      name_vi: 'Lập Hạ (Bắt đầu mùa hè)',
      name_en: 'Beginning of Summer (Li Xia)',
      approx_date: '05/05 - 06/05',
      meaning_vi: 'Nhiệt độ tăng cao, nắng hè bắt đầu gay gắt ở ban công và sân thượng.',
      meaning_en: 'Temperatures rise markedly; summer heat takes hold on rooftops and balconies.',
      garden_advice_vi: 'Lắp lưới lan che bớt 30% nắng gay gắt ban trưa; tưới đẫm vào sáng sớm.',
      garden_advice_en: 'Erect 30% shade netting over sensitive pots; thoroughly water during early mornings.'
    },
    term2: {
      name_vi: 'Tiểu Mãn (Hạt bắt đầu mẩy)',
      name_en: 'Small Full (Xiao Man)',
      approx_date: '21/05 - 22/05',
      meaning_vi: 'Cây cối trĩu hạt và quả non, nước sông dồi dào.',
      meaning_en: 'Fruitlets swell on stems; natural rivers and moisture crest.',
      garden_advice_vi: 'Bọc bao trái non (ổi, mướp, dưa leo) tránh ruồi vàng chích quả.',
      garden_advice_en: 'Cover young fruit with protective mesh bags to repel fruit flies.'
    },
    moon_phase_advice_vi: 'Trăng tròn tháng 5 kiểm tra nhện đỏ và bọ trĩ do nắng nóng hanh khô; trăng khuyết bón phân kali hữu cơ hỗ trợ đậu quả.',
    moon_phase_advice_en: 'Full moon alert for red spider mites in dry heat; waning moon feed with organic potassium for fruit set.'
  },
  6: {
    term1: {
      name_vi: 'Mang Chủng (Ngũ cốc trổ bông)',
      name_en: 'Grain in Ear (Mang Zhong)',
      approx_date: '05/06 - 06/06',
      meaning_vi: 'Mùa gieo trồng các loại đậu đỗ và cây dây leo mùa nắng.',
      meaning_en: 'Season for vigorous pole beans and sun-loving heat climbers.',
      garden_advice_vi: 'Dẫn ngọn cho mướp, bầu, chanh dây leo giàn; phủ mùn cưa giữ ẩm bề mặt chậu.',
      garden_advice_en: 'Train climber vines onto railings; layer coco coir or wood mulch to insulate rootballs.'
    },
    term2: {
      name_vi: 'Hạ Chí (Ngày dài nhất năm)',
      name_en: 'Summer Solstice (Xia Zhi)',
      approx_date: '21/06 - 22/06',
      meaning_vi: 'Thời gian ban ngày dài nhất, quang hợp mạnh nhưng bốc hơi nước cực nhanh.',
      meaning_en: 'Longest daylight duration; intense photosynthesis alongside severe evaporation.',
      garden_advice_vi: 'Tưới bổ sung chiều tắt nắng (sau 17h30); đặt khay sỏi nước bên dưới đáy chậu giải nhiệt rễ.',
      garden_advice_en: 'Provide evening cool-down watering; place gravel pebble trays beneath pots for root cooling.'
    },
    moon_phase_advice_vi: 'Tránh tỉa cành nặng vào ngày Hạ Chí; gieo hạt đậu đũa và rau muống nước vào tuần trăng non.',
    moon_phase_advice_en: 'Avoid heavy pruning on Solstice; sow pole beans and water spinach during new moon.'
  },
  7: {
    term1: {
      name_vi: 'Tiểu Thử (Nóng oi ả)',
      name_en: 'Minor Heat (Xiao Shu)',
      approx_date: '07/07 - 08/07',
      meaning_vi: 'Gió nóng và nhiệt độ mặt bê tông sân thượng có thể lên tới 45°C.',
      meaning_en: 'Oppressive sultry weather; urban rooftop temperatures easily surpass 40°C.',
      garden_advice_vi: 'Kê chậu cách mặt sàn bê tông bằng gạch hoặc kệ sắt tránh luộc chín bộ rễ.',
      garden_advice_en: 'Elevate planters off hot concrete surfaces to prevent thermal root scorching.'
    },
    term2: {
      name_vi: 'Đại Thử (Nóng đỉnh điểm)',
      name_en: 'Major Heat (Da Shu)',
      approx_date: '22/07 - 23/07',
      meaning_vi: 'Tiết nóng gay gắt nhất mùa hè kết hợp mưa rào nhiệt đới đột ngột.',
      meaning_en: 'Hottest phase of summer punctuated by sporadic intense downpours.',
      garden_advice_vi: 'Xịt nước làm mát lá sau cơn mưa rào buổi trưa để tránh luộc lá (hiệu ứng thấu kính).',
      garden_advice_en: 'Rinse foliage following hot mid-day rains to eliminate steam scalding.'
    },
    moon_phase_advice_vi: 'Trăng non che chắn bảo vệ cây con mới sang chậu; không bón phân hóa học đậm đặc lúc nắng gắt.',
    moon_phase_advice_en: 'Shield young transplants around new moon; strictly refrain from concentrated synthetic fertilizers.'
  },
  8: {
    term1: {
      name_vi: 'Lập Thu (Bắt đầu mùa thu)',
      name_en: 'Beginning of Autumn (Li Qiu)',
      approx_date: '07/08 - 08/08',
      meaning_vi: 'Gió heo may chớm thổi, đêm mát dần, bắt đầu vào mùa vụ rau thu đông.',
      meaning_en: 'Autumn breezes initiate, night air cools, launching the autumn-winter crop season.',
      garden_advice_vi: 'Làm đất chuẩn bị gieo bắp cải tí hon, cải kale, xà lách ban công.',
      garden_advice_en: 'Amend potting mixes to seed mini brassicas, kale, and winter crisp lettuce.'
    },
    term2: {
      name_vi: 'Xử Thử (Nắng hè dịu hẳn)',
      name_en: 'End of Heat (Chu Shu)',
      approx_date: '23/08 - 24/08',
      meaning_vi: 'Cái nóng gay gắt tan biến, sương thu rơi nhẹ trên lá cây.',
      meaning_en: 'Severe heat dissipates, gentle autumn morning dew settles on leaves.',
      garden_advice_vi: 'Bón thúc dịch rong biển hoặc phân trùn quế kích đợt lá mới phát triển.',
      garden_advice_en: 'Apply seaweed extract or worm casting tea to spark lush new autumn foliage.'
    },
    moon_phase_advice_vi: 'Trăng non đầu tháng 8 là thời điểm lý tưởng nhất năm để gieo hạt họ cải; trăng rằm kiểm tra sâu tơ ăn lá non.',
    moon_phase_advice_en: 'New moon in August is the golden window for brassica seeds; inspect for caterpillar larvae near full moon.'
  },
  9: {
    term1: {
      name_vi: 'Bạch Lộ (Sương trắng sáng sớm)',
      name_en: 'White Dew (Bai Lu)',
      approx_date: '07/09 - 08/09',
      meaning_vi: 'Sương sớm đọng thành hạt trắng như ngọc, trời se lạnh về khuya.',
      meaning_en: 'Cool nights cause dew to coalesce into silvery droplets by dawn.',
      garden_advice_vi: 'Xịt vòi nước áp lực nhẹ rửa trôi sương đêm trước khi nắng lên để tránh cháy mép lá non.',
      garden_advice_en: 'Gently rinse night dew from leaves before sunrise to ward off leaf-edge burn.'
    },
    term2: {
      name_vi: 'Thu Phân (Điểm giữa mùa thu)',
      name_en: 'Autumn Equinox (Qiu Fen)',
      approx_date: '22/09 - 23/09',
      meaning_vi: 'Tiết trời trong xanh mát lành, tỉ lệ quang hợp và phát triển đạt đỉnh.',
      meaning_en: 'Crisp clear skies; optimal photosynthetic balance across all crops.',
      garden_advice_vi: 'Chiết cành hoa hồng, nhân giống đinh lăng, giâm cành rau ngót Nhật.',
      garden_advice_en: 'Layer rose cuttings, propagate Ming aralia, and root Japanese sweetleaf.'
    },
    moon_phase_advice_vi: 'Trăng tròn tiết Thu Phân ngắm trăng rằm Trung Thu và thu hoạch thảo dược sấy tinh dầu thơm nhất.',
    moon_phase_advice_en: 'Full moon at Autumn Equinox yields the highest essential oil concentration in harvested culinary herbs.'
  },
  10: {
    term1: {
      name_vi: 'Hàn Lộ (Sương lạnh buốt)',
      name_en: 'Cold Dew (Han Lu)',
      approx_date: '08/10 - 09/10',
      meaning_vi: 'Hạt sương lạnh buốt, nước bốc hơi chậm, nhiệt độ ban đêm hạ nhanh.',
      meaning_en: 'Freezing cold dew droplets; nighttime temperatures drop swiftly.',
      garden_advice_vi: 'Giảm lượng nước tưới, chỉ tưới khi giá thể trên mặt chậu đã se khô.',
      garden_advice_en: 'Scale back watering; allow topsoil to dry moderately before re-soaking.'
    },
    term2: {
      name_vi: 'Sương Giáng (Sương muối rơi nhiều)',
      name_en: 'Frost\'s Descent (Shuang Jiang)',
      approx_date: '23/10 - 24/10',
      meaning_vi: 'Tiết cuối mùa thu, bắt đầu xuất hiện sương giá và gió lạnh phương Bắc.',
      meaning_en: 'Final autumn term; early frost descends and chilly northern winds blow.',
      garden_advice_vi: 'Bón phân hữu cơ hoai mục phủ gốc giữ ấm rễ; chuẩn bị giàn che gió cho cây mẫn cảm.',
      garden_advice_en: 'Mulch with well-rotted organic compost to conserve soil warmth; buffer delicate plants against chill.'
    },
    moon_phase_advice_vi: 'Trăng tàn tháng 10 xới nhẹ giá thể bón lót phân lân hữu cơ; trăng non gieo củ cải trắng và cà rốt bi.',
    moon_phase_advice_en: 'Waning moon loosen topsoil with organic phosphorus; new moon sow mini carrots and winter radishes.'
  },
  11: {
    term1: {
      name_vi: 'Lập Đông (Bắt đầu mùa đông)',
      name_en: 'Beginning of Winter (Li Dong)',
      approx_date: '07/11 - 08/11',
      meaning_vi: 'Mùa đông chính thức gõ cửa, cây cối làm chậm sinh trưởng tích lũy nhựa.',
      meaning_en: 'Winter officially arrives; perennial plants store energy and slow vascular flow.',
      garden_advice_vi: 'Chuyển giờ tưới lên 9h - 10h sáng khi có nắng ấm; tránh tưới tối lạnh rễ.',
      garden_advice_en: 'Shift watering to sunny mid-mornings (9-10 AM); avoid evening moisture on roots.'
    },
    term2: {
      name_vi: 'Tiểu Tuyết (Chớm rét sâu)',
      name_en: 'Minor Snow (Xiao Xue)',
      approx_date: '22/11 - 23/11',
      meaning_vi: 'Rét ngọt miền Bắc, miền Nam bước vào mùa khô mát mẻ chan hòa nắng.',
      meaning_en: 'Crisp cold North Vietnam, pleasant dry sunny days in the South.',
      garden_advice_vi: 'Bón thúc kali đón nụ hoa cúc, hoa hồng, đỗ quyên nở rộ dịp cận Tết.',
      garden_advice_en: 'Apply potassium boost to stimulate flower bud formation for upcoming holiday blossoms.'
    },
    moon_phase_advice_vi: 'Trăng lớn tháng 11 thích hợp tỉa cành hoa kiểng chơi Tết; trăng tàn dọn cỏ rác quanh chậu ngăn ốc sên trú ngụ.',
    moon_phase_advice_en: 'Waxing moon is prime for shaping Lunar New Year ornamentals; waning moon clear debris to deter snails.'
  },
  12: {
    term1: {
      name_vi: 'Đại Tuyết (Rét ngọt cuối đông)',
      name_en: 'Major Snow (Da Xue)',
      approx_date: '07/12 - 08/12',
      meaning_vi: 'Giai đoạn rét sâu nhất trước tiết Đông Chí, ngày ngắn đêm dài.',
      meaning_en: 'Deepest seasonal cold leading up to the Solstice; short days and long nights.',
      garden_advice_vi: 'Hạn chế tưới cây vào những ngày có gió mùa đông bắc rét đậm (dưới 13°C).',
      garden_advice_en: 'Suspend irrigation during severe cold waves (<13°C) to protect root systems.'
    },
    term2: {
      name_vi: 'Đông Chí (Đêm dài nhất năm)',
      name_en: 'Winter Solstice (Dong Zhi)',
      approx_date: '21/12 - 22/12',
      meaning_vi: 'Đêm dài nhất trong năm, kết thúc một vòng tuần hoàn tiết khí đất trời.',
      meaning_en: 'Longest night of the year, completing the celestial solar cycle.',
      garden_advice_vi: 'Lặt lá mai vàng miền Nam, tỉa cành đào miền Bắc chuẩn bị đón xuân sang.',
      garden_advice_en: 'Defoliate apricot blossoms (Mai) in South and prune peach branches (Dao) in North for Spring.'
    },
    moon_phase_advice_vi: 'Tuần trăng rằm tháng Chạp canh ngày lặt lá mai đào; trăng tàn tổng vệ sinh vườn phố đón Tết Nguyên Đán.',
    moon_phase_advice_en: 'Full moon of the 12th lunar month coordinates blossom timing; waning moon deep-cleans garden terraces for Tet.'
  }
};

/**
 * Tạo URL mở Google Calendar thêm sự kiện nông vụ
 */
export function buildGoogleCalendarUrl(options: {
  title: string;
  details: string;
  location?: string;
  month: number;
  year?: number;
}): string {
  const year = options.year || new Date().getFullYear();
  // Chọn ngày chủ nhật tuần đầu tiên hoặc ngày mùng 5 của tháng
  const startDate = new Date(year, options.month - 1, 5, 8, 0, 0);
  const endDate = new Date(year, options.month - 1, 5, 10, 0, 0);

  const formatGCalDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const datesParam = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: options.title,
    details: options.details,
    location: options.location || 'Vườn Ban Công / Sân Thượng',
    dates: datesParam
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Tạo nội dung file chuẩn iCalendar (.ics) cho Apple Calendar, Outlook, Google Calendar
 */
export function generateIcsContent(options: {
  title: string;
  description: string;
  month: number;
  year?: number;
  regionLabel: string;
}): string {
  const year = options.year || new Date().getFullYear();
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  // Sự kiện diễn ra từ 8:00 đến 10:00 sáng ngày 5 của tháng
  const startStr = `${year}${pad(options.month)}05T080000Z`;
  const endStr = `${year}${pad(options.month)}05T100000Z`;
  const stampStr = new Date().toISOString().replace(/-|:|\.\d\d\d/g, '');
  const uid = `ytc-calendar-${year}-${options.month}-${Date.now()}@yeutrongcay.com`;

  // Thay thế ký tự ngắt dòng chuẩn ICS (RFC 5545)
  const escapedDesc = options.description.replace(/\n/g, '\\n').replace(/,/g, '\\,');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Yeu Trong Cay//Urban Gardening Calendar//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stampStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${options.title}`,
    `DESCRIPTION:${escapedDesc}`,
    `LOCATION:Vườn Ban Công / Sân Thượng (${options.regionLabel})`,
    'STATUS:CONFIRMED',
    'RRULE:FREQ=MONTHLY;COUNT=1',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

/**
 * Tải file .ics trực tiếp về máy người dùng
 */
export function downloadIcsFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
