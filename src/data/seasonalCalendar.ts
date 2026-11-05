/**
 * DỮ LIỆU LỊCH NÔNG VỤ ĐÔ THỊ 3 MIỀN (SEASONAL URBAN FARMING CALENDAR)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * Thỏa thuận hợp đồng móc nối H4 (planting_season_by_region)
 */

export type RegionKey = 'north' | 'central' | 'south';

export interface RegionalGuide {
  climate_tag: string;
  climate_desc: string;
  tasks: string[];
  pest_alert: string;
  pro_tip: string;
  recommended_plant_ids: string[];
}

export interface MonthSeasonalData {
  month: number;
  title_vi: string;
  title_en: string;
  solar_term_vi: string;
  solar_term_en: string;
  regions: {
    north: RegionalGuide;
    central: RegionalGuide;
    south: RegionalGuide;
  };
}

export const SEASONAL_CALENDAR_DATA: Record<number, MonthSeasonalData> = {
  1: {
    month: 1,
    title_vi: 'Tháng 1 - Tiết Tiểu Hàn & Đại Hàn',
    title_en: 'January - Deep Winter & Pre-Spring Prep',
    solar_term_vi: 'Thời điểm rét ngọt miền Bắc, nắng nhẹ miền Nam',
    solar_term_en: 'Crisp cold North, pleasant sun South',
    regions: {
      north: {
        climate_tag: 'Rét ngọt, sương muối về đêm',
        climate_desc: 'Nhiệt độ xuống thấp 11-16°C. Cây phát triển chậm, cần tránh tưới nước muộn làm lạnh rễ.',
        tasks: [
          'Tưới cây vào khoảng 10h trưa khi có nắng ấm',
          'Rải một lớp trấu hun hoặc rơm mục phủ gốc giữ ấm rễ',
          'Tỉa dọn cành lá già úa đón đợt lộc xuân cận Tết'
        ],
        pest_alert: 'Rệp muội bám đọt non quất/bưởi cảnh, nấm phấn trắng',
        pro_tip: 'Xịt nước ấm nhẹ 25°C rửa trôi sương muối đọng trên mặt lá vào sáng sớm để tránh cháy lá.',
        recommended_plant_ids: ['herb-02', 'herb-03', 'fruit-01', 'ornamental-04', 'herb-07']
      },
      central: {
        climate_tag: 'Cuối mùa mưa, se lạnh',
        climate_desc: 'Thời tiết ấm dần lên, mưa rải rác giảm nhanh. Rất thích hợp xới đất bổ sung dinh dưỡng.',
        tasks: [
          'Bón lót phân trùn quế và phân hữu cơ hoai mục',
          'Kiểm tra lỗ thoát nước đáy chậu sau chuỗi ngày mưa dầm',
          'Gieo các loại hạt rau gia vị và thảo dược'
        ],
        pest_alert: 'Ốc sên nhỏ ăn đọt non, thối cổ rễ ẩm ướt',
        pro_tip: 'Rắc ít vôi bột nông nghiệp quanh miệng chậu để ngăn ốc sên trèo lên cắn phá đọt non.',
        recommended_plant_ids: ['herb-01', 'herb-04', 'fruit-02', 'ornamental-01']
      },
      south: {
        climate_tag: 'Mùa khô mát mẻ, nắng chan hòa',
        climate_desc: 'Nhiệt độ 23-31°C, nắng đẹp cả ngày. Thời điểm vàng để trồng các loại cây ăn quả và hoa ban công.',
        tasks: [
          'Tưới đẫm 2 lần/ngày (sáng sớm 6-7h và chiều mát 17h)',
          'Bón thúc NPK hữu cơ kích nụ hoa chơi Tết',
          'Chiết cành nhân giống hoa hồng, hoa giấy và đinh lăng'
        ],
        pest_alert: 'Bọ trĩ cắn đọt hoa hồng, nhện đỏ mùa hanh khô',
        pro_tip: 'Phun dung dịch gừng tỏi ớt hoặc dầu neem hữu cơ vào chiều tắt nắng để phòng nhện đỏ triệt để.',
        recommended_plant_ids: ['fruit-04', 'fruit-05', 'ornamental-02', 'herb-04', 'herb-08']
      }
    }
  },
  2: {
    month: 2,
    title_vi: 'Tháng 2 - Tiết Lập Xuân & Vũ Thủy',
    title_en: 'February - Spring Equinox & Sprouting Rains',
    solar_term_vi: 'Mưa phùn đầu xuân, chồi non đâm lộc',
    solar_term_en: 'Gentle drizzle, green shoots awake',
    regions: {
      north: {
        climate_tag: 'Mưa phùn ẩm ướt, trời ấm dần',
        climate_desc: 'Độ ẩm không khí tăng trên 85%, đất ẩm mềm. Thời điểm giâm cành và gieo hạt tốt nhất năm.',
        tasks: [
          'Giâm cành đinh lăng, húng chanh, tía tô, lá lốt tỉ lệ sống 98%',
          'Thay đất sang chậu to hơn cho cây lâu năm',
          'Bón thúc phân hữu cơ rong biển để cây bật mầm mạnh'
        ],
        pest_alert: 'Bệnh nấm mốc trắng, thối rễ do độ ẩm nồm cao',
        pro_tip: 'Đặt chậu nơi thông thoáng gió, hạn chế tưới nước khi độ ẩm không khí vượt 90%.',
        recommended_plant_ids: ['herb-01', 'herb-02', 'herb-03', 'herb-04', 'fruit-01', 'ornamental-02']
      },
      central: {
        climate_tag: 'Nắng ấm chan hòa, gió nhẹ',
        climate_desc: 'Thời tiết ổn định, không mưa bão. Cây ăn quả bắt đầu đậu trái non.',
        tasks: [
          'Gieo hạt ớt chỉ thiên, cà chua bi, đậu đũa',
          'Bón phân kali hữu cơ hỗ trợ đậu quả',
          'Lắp giàn leo cho chanh dây và mướp ban công'
        ],
        pest_alert: 'Rệp sáp trắng, bọ xít muỗi chích trái non',
        pro_tip: 'Bọc bao bảo vệ quả non sớm ngay sau khi rụng cánh hoa để ngừa ruồi vàng đục quả.',
        recommended_plant_ids: ['fruit-01', 'fruit-02', 'herb-05', 'ornamental-01']
      },
      south: {
        climate_tag: 'Mùa khô nắng gắt',
        climate_desc: 'Nắng nhiều từ sớm, bốc hơi nước nhanh. Cần chú trọng che gốc và tưới đủ nước.',
        tasks: [
          'Phủ xơ dừa hoặc mùn cưa bề mặt chậu giữ ẩm',
          'Tưới nước 2 cữ đều đặn mỗi ngày',
          'Tỉa nhánh tăm, cành sâu bệnh bên trong tán'
        ],
        pest_alert: 'Nhện đỏ gây bạc lá, bọ trĩ xoăn đọt',
        pro_tip: 'Xịt vòi nước áp lực vừa vào mặt dưới lá lúc sáng sớm để rửa sạch trứng nhện đỏ.',
        recommended_plant_ids: ['fruit-03', 'fruit-04', 'ornamental-03', 'herb-06']
      }
    }
  },
  3: {
    month: 3,
    title_vi: 'Tháng 3 - Tiết Kinh Trập & Xuân Phân',
    title_en: 'March - Spring Awakening & Active Growth',
    solar_term_vi: 'Sâu bọ thức giấc, cây cối bung tược khỏe',
    solar_term_en: 'Insects awaken, vigorous root growth',
    regions: {
      north: {
        climate_tag: 'Ấm áp, mưa rào xuân rải rác',
        climate_desc: 'Nhiệt độ 20-27°C, thời tiết dễ chịu nhất năm cho mọi loại cây thuốc và cây ăn trái.',
        tasks: [
          'Trồng các loại cây ăn trái ban công: ổi lùn, cóc Thái, chanh tứ quý',
          'Cắt tỉa tạo tán tròn thông thoáng cho thảo dược',
          'Bón bổ sung dịch trùn quế pha loãng 1 lần/tuần'
        ],
        pest_alert: 'Sâu tơ ăn lá rau, bọ trĩ tấn công mầm hoa non',
        pro_tip: 'Treo bẫy dính màu vàng xung quanh vườn ban công để bắt côn trùng bay cánh nhỏ tự nhiên.',
        recommended_plant_ids: ['fruit-01', 'fruit-03', 'herb-01', 'herb-02', 'herb-08', 'ornamental-02']
      },
      central: {
        climate_tag: 'Nắng ấm, chuyển mùa khô',
        climate_desc: 'Nắng bắt đầu gay gắt vào buổi trưa. Cần chuẩn bị lưới che nắng 30% cho cây con.',
        tasks: [
          'Gieo hạt dưa chuột mini, bí ngòi ban công',
          'Tưới nước vào buổi sáng sớm trước khi nắng lên cao',
          'Đảo xới giá thể bổ sung trấu sống và than hoạt tính'
        ],
        pest_alert: 'Sâu vẽ bùa trên lá cam chanh, rệp dính',
        pro_tip: 'Ngắt bỏ lá bị sâu vẽ bùa nặng tiêu hủy ngay, xịt dung dịch tỏi ớt phòng ngừa đợt lộc mới.',
        recommended_plant_ids: ['fruit-02', 'fruit-04', 'herb-03', 'herb-09']
      },
      south: {
        climate_tag: 'Cao điểm mùa khô nắng nóng',
        climate_desc: 'Nhiệt độ 32-36°C, nắng rát trưa chiều. Cần tăng cường tưới và bảo vệ bộ rễ.',
        tasks: [
          'Lắp hệ thống tưới nhỏ giọt tự động hẹn giờ cho ban công',
          'Đưa chậu nhạy cảm nắng vào góc có bóng râm buổi trưa',
          'Tăng cường bón phân giàu silic và canxi tăng sức chịu nhiệt'
        ],
        pest_alert: 'Cháy mép lá do nhiệt độ giá thể tăng cao, rệp sáp',
        pro_tip: 'Lót chậu bằng đĩa hứng nước có sỏi bên dưới để tạo vi khí hậu ẩm mát tự nhiên bốc hơi làm mát rễ.',
        recommended_plant_ids: ['fruit-05', 'fruit-06', 'ornamental-01', 'ornamental-04']
      }
    }
  },
  4: {
    month: 4,
    title_vi: 'Tháng 4 - Tiết Thanh Minh & Cốc Vũ',
    title_en: 'April - Clearness & Grain Rains',
    solar_term_vi: 'Mưa rào đầu mùa, cây trái đón chất đạm tự nhiên',
    solar_term_en: 'First showers, natural nitrogen boost',
    regions: {
      north: {
        climate_tag: 'Nắng ấm mạnh, chuyển giao chớm hè',
        climate_desc: 'Nhiệt độ 24-30°C. Cây lớn nhanh trông thấy sau mỗi cơn mưa rào đầu mùa.',
        tasks: [
          'Thu hoạch lứa đầu tiên các loại rau thơm và sấy trữ khô',
          'Tăng cường bón phân hữu cơ vi sinh',
          'Bảo vệ giàn leo ban công trước các cơn giông lốc chiều'
        ],
        pest_alert: 'Sâu cuốn lá, bọ rùa 28 sao ăn lá cà chua',
        pro_tip: 'Nước mưa đầu mùa chứa nhiều đạm tự nhiên nhưng cũng có axit nhẹ, xịt tráng lá sau mưa to.',
        recommended_plant_ids: ['fruit-01', 'fruit-02', 'herb-01', 'herb-03', 'ornamental-02']
      },
      central: {
        climate_tag: 'Bắt đầu mùa gió Tây Nam khô nóng (gió Lào)',
        climate_desc: 'Gió khô rát bốc hơi nước rất nhanh, lá dễ bị héo rũ vào đầu giờ chiều.',
        tasks: [
          'Phủ rơm rạ hoặc xác bã đậu nành phủ kín mặt chậu',
          'Tưới đẫm cả mặt trên và thành chậu sành/gốm',
          'Dùng lưới lan đen che 50% ánh nắng gay gắt'
        ],
        pest_alert: 'Bọ trĩ, khô cháy đọt non',
        pro_tip: 'Tránh bón phân đạm hóa học trong những ngày gió Lào khô nóng vì rễ cây dễ bị sốc nhiệt.',
        recommended_plant_ids: ['herb-04', 'herb-08', 'fruit-04', 'ornamental-03']
      },
      south: {
        climate_tag: 'Cuối mùa khô, mưa giông chuyển mùa',
        climate_desc: 'Xuất hiện các cơn mưa dông lớn bất chợt sau chuỗi ngày nắng gắt.',
        tasks: [
          'Kiểm tra lại dây néo giàn cây ăn quả tránh gió giật',
          'Vệ sinh đĩa hứng nước chống muỗi vằn sinh sản',
          'Cắt tỉa bớt lá rậm rạp để cây thông thoáng'
        ],
        pest_alert: 'Bệnh thán thư sau cơn mưa dông, úng rễ cục bộ',
        pro_tip: 'Xới nhẹ lớp đất mặt sau mưa dông để rễ thở, chống nghẹt rễ.',
        recommended_plant_ids: ['fruit-03', 'fruit-05', 'herb-05', 'ornamental-05']
      }
    }
  },
  5: {
    month: 5,
    title_vi: 'Tháng 5 - Tiết Lập Hạ & Tiểu Mãn',
    title_en: 'May - Summer Arrival & Abundant Greens',
    solar_term_vi: 'Vào hè nắng gắt, thảo dược tích tụ tinh dầu cao nhất',
    solar_term_en: 'Summer kicks in, peak essential oil concentration',
    regions: {
      north: {
        climate_tag: 'Nắng nóng mùa hè, nhiệt độ 31-37°C',
        climate_desc: 'Nắng chiếu vuông góc nhiều giờ, ban công hướng Tây hấp thụ nhiệt mạnh từ tường bê tông.',
        tasks: [
          'Dùng thùng xốp hoặc chậu nhựa trắng cách nhiệt rễ',
          'Tưới nước 2 lần/ngày sáng sớm và chiều tối',
          'Thu hái lá đinh lăng, húng chanh, bạc hà phơi trong bóng râm'
        ],
        pest_alert: 'Nhện đỏ, rầy mềm phá búp non',
        pro_tip: 'Không tưới nước vào trưa nắng chang chang vì hạt nước hoạt động như kính lúp làm cháy lá.',
        recommended_plant_ids: ['herb-04', 'herb-08', 'fruit-02', 'ornamental-01']
      },
      central: {
        climate_tag: 'Nắng gắt, gió Lào thổi mạnh',
        climate_desc: 'Khô hạn kéo dài. Cây chịu hạn như kim ngân hoa, hoa giấy, xương rồng phát huy thế mạnh.',
        tasks: [
          'Ưu tiên tưới cho nhóm rau ăn lá và cây giống mới giâm',
          'Thu hoạch quả chín sớm trước khi bị rám nắng',
          'Phun sương giữ ẩm không khí lúc chiều muộn'
        ],
        pest_alert: 'Cháy chóp lá non, bọ nhảy ăn lá',
        pro_tip: 'Trồng xen các cây chịu nắng ngoài mép ban công để làm lá chắn che chở cho cây thảo dược bên trong.',
        recommended_plant_ids: ['ornamental-01', 'ornamental-04', 'herb-04', 'fruit-04']
      },
      south: {
        climate_tag: 'Chính thức vào mùa mưa (mưa nhiều chiều tối)',
        climate_desc: 'Mưa đều đặn mỗi ngày, độ ẩm cao mát mẻ. Cây xanh tốt nhưng nguy cơ ngập úng tăng cao.',
        tasks: [
          'Kê cao đáy chậu lên 3-5cm cách mặt sàn ban công',
          'Phun nấm đối kháng Trichoderma phòng bệnh thối rễ',
          'Bổ sung phân bón hữu cơ dạng hạt tan chậm'
        ],
        pest_alert: 'Thối rễ do úng nước, ốc sên phá hại ban đêm',
        pro_tip: 'Trộn thêm 30% đá perlite hoặc xỉ than tổ ong đã khử chua vào giá thể để nước thoát trong 5 giây.',
        recommended_plant_ids: ['herb-01', 'herb-02', 'fruit-06', 'ornamental-02']
      }
    }
  },
  6: {
    month: 6,
    title_vi: 'Tháng 6 - Tiết Mang Chủng & Hạ Chí',
    title_en: 'June - Midsummer Heat & Lush Canopy',
    solar_term_vi: 'Ngày dài nhất năm, cây quang hợp tối đa',
    solar_term_en: 'Longest daylight, maximum photosynthesis',
    regions: {
      north: {
        climate_tag: 'Đỉnh điểm nắng nóng gay gắt',
        climate_desc: 'Nhiệt độ mặt sàn ban công có thể vượt 42°C. Cần bảo vệ gốc cây tuyệt đối.',
        tasks: [
          'Che lưới lan xanh đen giảm 50% nắng',
          'Tưới xả nhiệt ban công sau 18h tối',
          'Bón định kỳ đạm cá ủ vi sinh pha loãng'
        ],
        pest_alert: 'Bọ cánh cứng ăn lá, rệp sáp',
        pro_tip: 'Đặt khay nước mát gần gốc cây để hơi nước bốc lên làm giảm nhiệt độ tiểu khí hậu quanh tán cây.',
        recommended_plant_ids: ['herb-04', 'fruit-02', 'ornamental-01', 'ornamental-03']
      },
      central: {
        climate_tag: 'Nắng khô khốc ven biển',
        climate_desc: 'Gió biển mang theo hơi mặn nhẹ kết hợp nắng gắt. Cần rửa lá định kỳ.',
        tasks: [
          'Xịt rửa lá bằng nước ngọt sạch vào buổi sáng',
          'Giảm liều lượng phân bón xuống 1/2',
          'Duy trì giữ ẩm bằng rơm phủ gốc'
        ],
        pest_alert: 'Héo rũ vàng lá vi khuẩn',
        pro_tip: 'Dùng chậu composite hoặc đất nung thay cho chậu sắt/nhựa mỏng để rễ không bị luộc chín.',
        recommended_plant_ids: ['ornamental-01', 'herb-04', 'fruit-04']
      },
      south: {
        climate_tag: 'Mùa mưa rộ, xen kẽ nắng ráo',
        climate_desc: 'Cây phát triển rực rỡ, lá xanh mướt. Thích hợp nhân giống chiết ghép cành.',
        tasks: [
          'Nhân giống chiết cành cây ăn quả ban công',
          'Tỉa ngọn cây thảo dược để đẻ nhánh xum xuê',
          'Thu hoạch quả cóc, chanh, ớt lứa hè'
        ],
        pest_alert: 'Đốm lá vi khuẩn, sâu róm cắn lá',
        pro_tip: 'Cắt tỉa lá gốc cách mặt đất 10cm để đất bắn lên lá khi mưa không làm lây lan bào tử nấm.',
        recommended_plant_ids: ['fruit-03', 'fruit-05', 'herb-01', 'herb-07']
      }
    }
  },
  7: {
    month: 7,
    title_vi: 'Tháng 7 - Tiết Tiểu Thử & Đại Thử',
    title_en: 'July - High Summer & Monsoon Thunder',
    solar_term_vi: 'Mưa ngâu và bão hè xuất hiện',
    solar_term_en: 'Summer storms & deep hydration',
    regions: {
      north: {
        climate_tag: 'Nắng xen kẽ mưa rào xối xả',
        climate_desc: 'Thời tiết ẩm nhiệt đới, sâu bệnh phát sinh nhanh sau mưa nắng thất thường.',
        tasks: [
          'Kiểm tra sâu bệnh hằng ngày vào sáng sớm',
          'Gia cố giàn leo đề phòng áp thấp nhiệt đới và bão',
          'Bổ sung vôi bột xử lý nấm đất'
        ],
        pest_alert: 'Bệnh đốm mắt cua, thán thư, bọ xít',
        pro_tip: 'Pha vôi bột 1% quét gốc thân cây gỗ ăn quả để ngừa nấm gốc và xua đuổi côn trùng đẻ trứng.',
        recommended_plant_ids: ['herb-01', 'herb-08', 'fruit-02', 'ornamental-02']
      },
      central: {
        climate_tag: 'Nắng nóng kéo dài, chớm áp thấp ven biển',
        climate_desc: 'Cuối chuỗi ngày khô hạn, bắt đầu có mưa rào hạ nhiệt.',
        tasks: [
          'Bắt đầu xới đất chuẩn bị cho vụ hoa và cây giống thu đông',
          'Tưới bón thúc kali hữu cơ cho cây ăn trái',
          'Dọn dẹp cành khô gãy'
        ],
        pest_alert: 'Rệp dính đen, rệp sáp vảy',
        pro_tip: 'Dùng cồn 70 độ chấm tăm bông lau sạch rệp vảy trên thân cây đinh lăng hoặc chanh cảnh.',
        recommended_plant_ids: ['herb-04', 'fruit-04', 'ornamental-01']
      },
      south: {
        climate_tag: 'Mùa mưa dầm, độ ẩm bão hòa',
        climate_desc: 'Mưa liên tục nhiều ngày. Cần quan tâm hàng đầu đến thoát nước đáy chậu.',
        tasks: [
          'Kê chậu nghiêng nhẹ nếu đáy đọng nước',
          'Rải vôi khử chua giá thể do nước mưa có tính axit',
          'Ngừng bón phân tan nhanh trong những ngày mưa to liên tục'
        ],
        pest_alert: 'Thối nhũn gốc, cuốn chiếu cắn rễ non',
        pro_tip: 'Treo vỏ bưởi hoặc vỏ cam quanh chậu để đuổi sên nhớt và cuốn chiếu tự nhiên không dùng hóa chất.',
        recommended_plant_ids: ['herb-02', 'herb-06', 'fruit-05', 'ornamental-04']
      }
    }
  },
  8: {
    month: 8,
    title_vi: 'Tháng 8 - Tiết Lập Thu & Xử Thử',
    title_en: 'August - Early Autumn & Season Shift',
    solar_term_vi: 'Gió thu heo may, khí trời mát dịu dần',
    solar_term_en: 'Crisp autumn breeze, pleasant cooling',
    regions: {
      north: {
        climate_tag: 'Chuyển mùa thu mát mẻ, nắng hanh nhẹ',
        climate_desc: 'Thời điểm lý tưởng thứ hai trong năm để làm mới lại toàn bộ vườn ban công.',
        tasks: [
          'Gieo hạt vụ đông xuân: cúc tần, tía tô, ngải cứu, cà chua bi',
          'Thay giá thể mới giàu mùn giun quế',
          'Bấm ngọn kích chồi nhánh cho thảo dược'
        ],
        pest_alert: 'Sâu xanh ăn lá, bướm đẻ trứng trên lá non',
        pro_tip: 'Tự pha chế thuốc trừ sâu sinh học từ tỏi, ớt, gừng ngâm rượu 1 tuần xịt phòng bướm đẻ trứng.',
        recommended_plant_ids: ['herb-02', 'herb-03', 'fruit-01', 'fruit-03', 'ornamental-02']
      },
      central: {
        climate_tag: 'Bắt đầu mùa mưa bão miền Trung',
        climate_desc: 'Gió to, lượng mưa tăng vọt đột ngột. Cần bảo vệ an toàn cho giàn cây ban công.',
        tasks: [
          'Hạ thấp các chậu cây cao xuống sát mặt sàn',
          'Buộc dây cố định chậu và giàn leo vào lan can sắt chắc chắn',
          'Dọn sạch cống thoát nước ban công'
        ],
        pest_alert: 'Dập nát lá, ngập rễ, thối thân do nước ứ đọng',
        pro_tip: 'Dùng bao tải lưới hoặc bạt che phủ tạm thời khi dự báo có gió bão giật cấp 6 trở lên.',
        recommended_plant_ids: ['herb-01', 'herb-04', 'ornamental-03']
      },
      south: {
        climate_tag: 'Mùa mưa đều đặn, ấm áp',
        climate_desc: 'Nhiệt độ mát mẻ 26-30°C. Cây đâm tược hoa nhiều chuẩn bị cho mùa trái rộ.',
        tasks: [
          'Bón bổ sung lân và kali hữu cơ hỗ trợ tạo mầm hoa',
          'Tỉa các chồi vượt không hiệu quả',
          'Gieo thêm các loại thảo dược rau mùi, húng quế'
        ],
        pest_alert: 'Bọ xít hút nhựa đọt non, thán thư',
        pro_tip: 'Rắc tro trấu hoặc vỏ trứng gà nghiền nát quanh gốc cung cấp canxi tự nhiên giúp cành cứng cáp.',
        recommended_plant_ids: ['fruit-03', 'fruit-06', 'herb-07', 'ornamental-01']
      }
    }
  },
  9: {
    month: 9,
    title_vi: 'Tháng 9 - Tiết Bạch Lộ & Thu Phân',
    title_en: 'September - Golden Autumn & Sweet Harvest',
    solar_term_vi: 'Trời thu trong vắt, sương sớm long lanh',
    solar_term_en: 'Clear autumn sky, morning dew',
    regions: {
      north: {
        climate_tag: 'Mùa thu vàng, nắng dịu mát',
        climate_desc: 'Nhiệt độ 22-28°C, độ ẩm vừa phải. Các loại cây thảo dược cho dược tính thơm và đậm đà nhất.',
        tasks: [
          'Thu hoạch lá cành thảo dược làm trà thảo mộc',
          'Bón đón hoa cho các loại cây cảnh ra hoa mùa lạnh',
          'Gieo cúc la mã, xà lách tím, rau thơm các loại'
        ],
        pest_alert: 'Rệp bông trắng, sâu đo xanh',
        pro_tip: 'Tận dụng nắng thu hanh nhẹ để sấy trà thảo dược trong bóng râm giữ nguyên mùi thơm tinh dầu.',
        recommended_plant_ids: ['herb-01', 'herb-02', 'herb-03', 'fruit-01', 'ornamental-02', 'ornamental-04']
      },
      central: {
        climate_tag: 'Đỉnh điểm mùa mưa lũ miền Trung',
        climate_desc: 'Mưa xối xả kéo dài. Cây cần được bảo vệ chống thối rễ triệt để.',
        tasks: [
          'Tạm ngưng toàn bộ việc bón phân rễ',
          'Kê chậu lên cao khỏi dòng nước chảy sàn',
          'Tỉa sạch cành lá úa hỏng tránh nấm lan rộng'
        ],
        pest_alert: 'Bệnh thối rễ Phytophthora lây lan nhanh qua dòng nước',
        pro_tip: 'Tưới dung dịch Trichoderma dạng đậm đặc vào bầu đất định kỳ 10 ngày/lần để bảo vệ mao rễ non.',
        recommended_plant_ids: ['herb-04', 'ornamental-03', 'herb-08']
      },
      south: {
        climate_tag: 'Mưa rào buổi chiều, ban ngày nắng ráo',
        climate_desc: 'Thời tiết ấm áp, thuận lợi cho việc chăm sóc cây ăn quả ban công chuẩn bị đón vụ Tết.',
        tasks: [
          'Bắt đầu khoanh vỏ nhẹ hoặc siết nước kích hoa cho cây cóc Thái, ổi lê',
          'Bón phân dơi hoặc phân cá ủ giàu phốt-pho',
          'Gieo hạt cà chua bi lùn đón trái đỏ đầu năm mới'
        ],
        pest_alert: 'Ruồi vàng đục trái, bọ trĩ',
        pro_tip: 'Treo bẫy ruồi vàng bả protein sinh học cách chậu 1.5m để dụ ruồi đực ra xa cây trồng.',
        recommended_plant_ids: ['fruit-01', 'fruit-04', 'fruit-05', 'herb-05']
      }
    }
  },
  10: {
    month: 10,
    title_vi: 'Tháng 10 - Tiết Hàn Lộ & Sương Giáng',
    title_en: 'October - Chill Dew & Autumn Frost',
    solar_term_vi: 'Gió mùa đông bắc tràn về, đêm lạnh ngày hanh',
    solar_term_en: 'Northeast monsoon, cool nights crisp days',
    regions: {
      north: {
        climate_tag: 'Chớm đông, heo may lạnh khô',
        climate_desc: 'Độ ẩm giảm mạnh dưới 50%, đất chậu nhanh khô mặt. Cây bắt đầu tích trữ dinh dưỡng ở rễ.',
        tasks: [
          'Tưới nước đều đặn vào khoảng 9h sáng',
          'Ủ gốc bằng xơ dừa hoặc trấu hun giữ ẩm chống rét',
          'Trồng các loại thảo dược củ: gừng gió, nghệ nếp, ngải cứu'
        ],
        pest_alert: 'Rầy phấn trắng, bệnh khô cháy mép lá do gió hanh',
        pro_tip: 'Phun sương nhẹ làm ẩm không gian quanh ban công vào buổi chiều để giảm bớt độ khô hanh khó chịu.',
        recommended_plant_ids: ['herb-02', 'herb-06', 'fruit-01', 'ornamental-02', 'ornamental-04']
      },
      central: {
        climate_tag: 'Mưa dứt dần, se lạnh cuối thu',
        climate_desc: 'Thời tiết ổn định trở lại sau bão lũ. Bắt đầu phục hồi bộ rễ cây cối.',
        tasks: [
          'Thay lớp đất mặt bị rửa trôi sau mùa mưa',
          'Tưới kích rễ bằng dịch rong biển hoặc axit humic',
          'Gieo đợt rau thơm mới đón Tết'
        ],
        pest_alert: 'Rễ bị nghẹt, thán thư còn sót lại',
        pro_tip: 'Xới nhẹ lớp đất mặt sâu 2-3cm để oxy len lỏi vào nuôi hệ vi sinh vật có lợi giúp rễ hồi phục nhanh.',
        recommended_plant_ids: ['herb-01', 'herb-03', 'fruit-02', 'ornamental-01']
      },
      south: {
        climate_tag: 'Cuối mùa mưa, chuẩn bị sang mùa khô',
        climate_desc: 'Mưa thưa dần, chỉ còn mưa rào ngắn. Nắng ban ngày dài hơn, thích hợp ủ phân và bón đón hoa.',
        tasks: [
          'Bón thúc phân hữu cơ chứa kali cao đón nụ Tết',
          'Vặt lá kích hoa mai vàng hoặc hoa giấy nếu trồng ban công',
          'Tỉa gọn tán cây ăn quả'
        ],
        pest_alert: 'Sâu đục nụ hoa, bọ trĩ phá cánh hoa non',
        pro_tip: 'Giảm tưới nước 3-5 ngày để cây tạo mầm hoa, sau đó tưới đẫm trở lại kết hợp phân lân hữu cơ.',
        recommended_plant_ids: ['fruit-04', 'fruit-05', 'ornamental-01', 'ornamental-02']
      }
    }
  },
  11: {
    month: 11,
    title_vi: 'Tháng 11 - Tiết Lập Đông & Tiểu Tuyết',
    title_en: 'November - Winter Frost & Cozy Roots',
    solar_term_vi: 'Đầu đông giá rét miền Bắc, nắng vàng rực rỡ phương Nam',
    solar_term_en: 'Crisp winter North, golden sunshine South',
    regions: {
      north: {
        climate_tag: 'Mùa đông lạnh, sương muối sớm',
        climate_desc: 'Nhiệt độ 13-19°C. Cây thảo dược thân thảo như tía tô, húng chanh cần che chắn gió mùa Đông Bắc.',
        tasks: [
          'Dời các chậu cây nhạy cảm rét vào nơi khuất gió',
          'Tưới cây bằng nước ấm vào khoảng 10h trưa',
          'Rải một lớp vôi bột mỏng quanh thành chậu giữ ấm và diệt mầm nấm',
          'Chăm sóc cà chua bi lùn vụ đông đang vào giai đoạn đậu quả'
        ],
        pest_alert: 'Sương muối làm cháy mép lá, bọ trĩ, nấm xám',
        pro_tip: 'Dùng túi ni-lông trong suốt trùm nhẹ lên ngọn cây thảo dược vào ban đêm nếu nhiệt độ xuống dưới 12°C.',
        recommended_plant_ids: ['fruit-01', 'herb-02', 'herb-03', 'herb-06', 'ornamental-04']
      },
      central: {
        climate_tag: 'Thời tiết mát mẻ, nắng nhẹ',
        climate_desc: 'Nhiệt độ 20-26°C, rất lý tưởng để chăm sóc vườn ban công đón mùa xuân.',
        tasks: [
          'Gieo hạt rau xà lách, ngò rí, thì là, húng quế',
          'Bón phân trùn quế thúc cây ăn trái nuôi quả lớn',
          'Tỉa cành tạo thế cho cây cảnh chơi Tết'
        ],
        pest_alert: 'Sâu xanh ăn lá rau thơm, rệp mềm',
        pro_tip: 'Xịt nước vo gạo lên men chua nhẹ pha loãng vừa cung cấp vitamin nhóm B vừa xua đuổi rệp mềm tự nhiên.',
        recommended_plant_ids: ['herb-01', 'herb-04', 'fruit-02', 'ornamental-01']
      },
      south: {
        climate_tag: 'Mùa khô nắng ấm chan hòa',
        climate_desc: 'Thời tiết đẹp nhất trong năm của miền Nam (24-32°C). Cây cối phát triển sung mãn.',
        tasks: [
          'Chăm sóc bưởi da xanh mini, chanh tứ quý nuôi quả vàng đón Tết',
          'Tưới nước 2 lần/ngày sáng sớm và chiều mát',
          'Bổ sung phân hữu cơ vi sinh định kỳ 10 ngày/lần',
          'Nhân giống các loại thảo dược bằng cành giâm'
        ],
        pest_alert: 'Bọ trĩ phá hoa mai và hoa kiểng, nhện đỏ',
        pro_tip: 'Dùng dầu khoáng nông nghiệp SK Enspray 99 EC hữu cơ xịt phòng bọ trĩ lúc sáng sớm khi trời chưa nắng gắt.',
        recommended_plant_ids: ['fruit-03', 'fruit-04', 'fruit-05', 'herb-04', 'ornamental-01', 'ornamental-03']
      }
    }
  },
  12: {
    month: 12,
    title_vi: 'Tháng 12 - Tiết Đại Tuyết & Đông Chí',
    title_en: 'December - Deep Winter & Tet Bloom Countdown',
    solar_term_vi: 'Rét đậm cuối đông, đếm ngược mùa hoa Tết',
    solar_term_en: 'Deep winter chill, countdown to Spring Tet',
    regions: {
      north: {
        climate_tag: 'Rét đậm rét hại, sương buốt',
        climate_desc: 'Nhiệt độ có thể xuống dưới 10°C. Cây hạn chế ra rễ mới, cần bảo tồn cây sống qua mùa đông.',
        tasks: [
          'Tưới lượng nước tối thiểu vừa đủ ẩm, không để sũng nước đọng ban đêm',
          'Bọc màng bọc thực phẩm quanh thân chậu để cách nhiệt giá thể',
          'Thu hoạch cà chua bi chín mọng',
          'Tưới nước rửa sương sớm mỗi bình minh'
        ],
        pest_alert: 'Vàng lá rụng do lạnh rễ, nấm mốc xám rễ',
        pro_tip: 'Tưới nước ấm 30°C pha 1 thìa mật ong nhỏ giúp cây tăng sức đề kháng chống chọi sương giá buốt.',
        recommended_plant_ids: ['fruit-01', 'herb-02', 'herb-06', 'ornamental-04']
      },
      central: {
        climate_tag: 'Mát lạnh dễ chịu, nắng nhẹ',
        climate_desc: 'Nhiệt độ 18-24°C, thời tiết giao hòa. Chuẩn bị đón hoa Tết và quả ngọt mùa xuân.',
        tasks: [
          'Bón thúc phân kali hữu cơ cho quả ngọt và hoa thắm màu',
          'Che sương sớm cho cây cảnh mỏng manh',
          'Tưới nhẹ buổi trưa ấm áp'
        ],
        pest_alert: 'Rệp bông bám cuống quả, sâu ăn cánh hoa',
        pro_tip: 'Vệ sinh gốc chậu sạch sẽ, gom sạch lá rụng để triệt tiêu nơi trú ẩn mùa đông của côn trùng.',
        recommended_plant_ids: ['herb-01', 'fruit-02', 'ornamental-01', 'ornamental-02']
      },
      south: {
        climate_tag: 'Nắng ấm hanh nhẹ, se lạnh về đêm',
        climate_desc: 'Nhiệt độ 21-31°C. Vụ mùa thu hoạch quả ngọt và chuẩn bị hoa xuân tưng bừng đón Tết.',
        tasks: [
          'Tuốt lá mai vàng trước Tết 14-16 ngày',
          'Chăm sóc chậu quất cảnh, ớt cảnh chín đỏ rực rỡ',
          'Tưới đẫm giữ cây luôn tươi tốt trong kỳ nghỉ Tết',
          'Lắp bình tưới tự thấm nước bằng bấc hút nếu về quê dài ngày'
        ],
        pest_alert: 'Bọ trĩ cắn cánh hoa, kiến mang rệp lên ngọn',
        pro_tip: 'Quấn một vòng băng dính hai mặt quanh gốc chậu để ngăn đàn kiến tha rệp sáp trèo lên ngọn cây.',
        recommended_plant_ids: ['fruit-04', 'fruit-05', 'ornamental-01', 'ornamental-02', 'herb-04']
      }
    }
  }
};
