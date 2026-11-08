import { ArticleFullContent } from '../types';

export const SMART_AGRI_ARTICLES: ArticleFullContent[] = [
  {
    id: 'art-smart-pillar',
    slug: 'cam-bien-iot-tu-dong-hoa-ban-cong',
    categorySlug: 'nong-nghiep-thong-minh',
    titleVi: 'Nông Nghiệp Số Ban Công: Tự Ráp Hệ Thống Cảm Biến IoT Siêu Rẻ & Tự Động Hóa Vi Khí Hậu',
    titleEn: 'Digital Balcony Automation: Low-Cost ESP32 IoT Sensors & AI-Powered Microclimate Sync',
    subtitleVi: 'Cảm biến dung kháng chống ăn mòn, năng lượng mặt trời tự hành và kết nối Bác Sĩ Cây AI',
    subtitleEn: 'Corrosion-free capacitive sensing, autonomous solar power, and AI Plant Doctor integration',
    excerptVi: 'Biến khu vườn ban công thành hệ sinh thái tự động thông minh với chi phí dưới 500.000đ. Tự động đo độ ẩm đất, kích hoạt bơm nhỏ giọt và báo cáo sức khỏe cây trồng trực tiếp về điện thoại.',
    excerptEn: 'Turn your balcony into an autonomous digital agro-ecosystem under $25 budget. Real-time capacitive moisture tracking, precision solar pumping, and direct mobile status updates.',
    readTimeMinutes: 13,
    authorName: 'Ks. Vũ Thành Long',
    authorRoleVi: 'Kỹ sư Trưởng Hệ thống IoT & Nhúng Nông nghiệp',
    authorRoleEn: 'Lead Embedded IoT & Agricultural Systems Engineer',
    lastUpdated: '2026-11-08',
    isPillar: true,
    interactiveEngineId: 'smart-irrigation-solar',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tags: ['Nông nghiệp thông minh', 'ESP32 IoT', 'Tưới tự động năng lượng mặt trời', 'Cảm biến đất dung kháng', 'Bác sĩ cây AI'],
    directAnswerSnippetVi: 'Hệ thống tự động hóa ban công tự hành chi phí dưới 500k gồm: vi điều khiển ESP32 kết nối Wi-Fi, cảm biến độ ẩm đất dung kháng v1.2 chống ăn mòn điện hóa, mạch hạ áp và relay 5V đóng ngắt bơm màng 12V mini. Nguồn điện được cấp bởi tấm pin mặt trời 20W kết hợp pin sạc 18650 dự phòng 3 ngày mưa, tự động gửi dữ liệu cảnh báo qua Telegram.',
    directAnswerSnippetEn: 'An autonomous balcony IoT automation system under $25 comprises: an ESP32 Wi-Fi microcontroller, corrosion-resistant v1.2 capacitive moisture sensors, a 5V relay module, and a 12V diaphragm micro-pump. Powered continuously by a 20W monocrystalline solar panel and dual 18650 lithium cells, it auto-dispatches real-time Telegram status alerts.',
    scientificData: {
      botanicalName: 'Precision Urban Agro-Informatics',
      optimalTemp: 'Nhiệt độ hoạt động mạch điện tử: -10°C - 60°C',
      keyMetrics: [
        { labelVi: 'Tuổi thọ cảm biến dung kháng', labelEn: 'Capacitive Sensor Longevity', value: '> 36 tháng', noteVi: 'Không bị oxy hóa như cảm biến trở kháng rỉ sét', noteEn: 'Zero galvanic oxidation vs resistive probes' },
        { labelVi: 'Dung lượng pin 18650 dự phòng', labelEn: 'Battery Autonomy Buffer', value: '72 giờ mưa liên tục', noteVi: 'Nhờ thuật toán Deep Sleep tiêu thụ < 15µA', noteEn: 'Deep sleep duty cycle consuming < 15µA' },
        { labelVi: 'Lượng nước tưới tiết kiệm', labelEn: 'Irrigation Water Savings', value: '62%', noteVi: 'Chỉ tưới khi độ ẩm rễ tụt dưới ngưỡng cài đặt', noteEn: 'Triggers strictly on real volumetric deficit' },
        { labelVi: 'Tổng chi phí linh kiện BOM', labelEn: 'Total Component Hardware Cost', value: '420.000 đ', noteVi: 'Rẻ hơn 70% so với các bộ điều khiển nhập khẩu', noteEn: '70% cheaper than imported turn-key units' }
      ],
      comparisonTable: {
        headersVi: ['Tiêu chí kỹ thuật', 'Cảm biến trở kháng 2 que kim loại rẻ tiền', 'Hệ Cảm Biến Dung Kháng ESP32 Yêu Trồng Cây'],
        headersEn: ['Metric', 'Cheap 2-Prong Resistive Probes', 'YeuTrongCay Capacitive ESP32 System'],
        rowsVi: [
          ['Hiện tượng ăn mòn kim loại', 'Bị điện phân mòn cụt đầu sau 2-3 tuần cắm đất', 'Bọc lớp sơn hàn phủ kín mạch, bền 3 năm'],
          ['Độ chính xác theo độ mặn EC', 'Sai số lớn khi bón phân (bị lừa bởi ion muối)', 'Đo điện dung hằng số điện môi nước, siêu chuẩn'],
          ['Khả năng kết nối không dây', 'Chỉ kêu tít tít tại chỗ hoặc không có', 'Kết nối Wi-Fi/Bluetooth gửi tin nhắn qua bot Telegram'],
          ['Tự chủ năng lượng', 'Phải cắm dây điện lưới 220V nguy hiểm ngoài mưa', 'Pin mặt trời 12V tự sạc an toàn chống giật']
        ],
        rowsEn: [
          ['Electrolytic Corrosion', 'Probes corrode and dissolve within 3 weeks', 'Polymer-shielded capacitive traces, 3-year life'],
          ['Salinity/EC Interference', 'Wild false readings when fertilizer is added', 'Measures dielectric constant of water accurately'],
          ['Wireless Connectivity', 'None or primitive local beepers', 'Full Wi-Fi/Bluetooth telemetry via Telegram Bot'],
          ['Energy Independence', 'Requires hazardous 220V mains wiring in rain', 'Safe low-voltage solar panel with battery buffer']
        ]
      }
    },
    sopStepsVi: [
      {
        step: 1,
        title: 'Lập trình firmware ESP32 chế độ Deep-Sleep tiết kiệm pin',
        description: 'Nạp mã nguồn mã nguồn mở Yêu Trồng Cây vào bo mạch ESP32. Cài đặt chu kỳ ngủ sâu: mỗi 30 phút ESP32 thức dậy 3 giây đọc cảm biến độ ẩm, gửi dữ liệu qua Wi-Fi rồi ngủ tiếp để tiết kiệm 98% năng lượng.',
        duration: '20 phút',
        proTip: 'Đọc tài liệu và sơ đồ chân GPIO chi tiết trong bộ công cụ Smart Irrigation & Solar Sizer ở đầu bài viết.'
      },
      {
        step: 2,
        title: 'Chống thấm nước hộp mạch điều khiển bằng keo silicon',
        description: 'Đặt bo mạch ESP32 và mạch relay vào trong hộp nhựa kỹ thuật IP65 có gioăng cao su. Quét sơn phủ chống ẩm (conformal coating) lên bề mặt mạch điện tử để chống hơi nước ngoài trời ban công.',
        duration: '25 phút',
        caution: 'Đặc biệt bịt kín cổ cáp nối cảm biến nơi cắm vào chậu cây.'
      },
      {
        step: 3,
        title: 'Lắp đặt tấm pin Solar 20W hướng về phía có ánh sáng tốt nhất',
        description: 'Gắn tấm pin mặt trời 20W lên thanh lan can ở góc nghiêng 15-20 độ để nước mưa tự trôi bụi bẩn. Nối dây qua mạch sạc pin TP4056 hoặc mạch sạc năng lượng mặt trời chuyên dụng MPPT.',
        duration: '30 phút'
      },
      {
        step: 4,
        title: 'Cắm cảm biến dung kháng vào tầng rễ và cân chỉnh ngưỡng',
        description: 'Cắm sâu bản cảm biến dung kháng v1.2 vào tầng rễ của chậu cây đại diện. Mở ứng dụng điện thoại ghi nhận giá trị độ ẩm khi đất khô (ví dụ 35%) để làm mốc tự động bật bơm màng tưới 45 giây.',
        duration: '15 phút'
      }
    ],
    sopStepsEn: [
      {
        step: 1,
        title: 'Flash ESP32 Firmware with Low-Power Deep-Sleep Cycle',
        description: 'Flash YeuTrongCay open-source firmware to the ESP32. Configure deep-sleep cycles: wake for 3 seconds every 30 minutes to sample sensor inputs and upload telemetry before sleeping.',
        duration: '20 minutes',
        proTip: 'Refer to GPIO pinout maps in the Smart Irrigation & Solar Sizer tool above.'
      },
      {
        step: 2,
        title: 'Weatherproof Enclosure with IP65 Gasket & Conformal Coating',
        description: 'Mount boards inside an IP65 junction box. Coat electronics with silicone conformal sealant to protect against humid balcony conditions.',
        duration: '25 minutes',
        caution: 'Seal the cable gland where probe wires penetrate the case.'
      },
      {
        step: 3,
        title: 'Mount 20W Solar Panel at 15-Degree Self-Cleaning Tilt',
        description: 'Clamp the monocrystalline solar module along the railing at a 15-degree incline. Route wiring into a lithium charging protection board.',
        duration: '30 minutes'
      },
      {
        step: 4,
        title: 'Embed Capacitive Probe into Root Zone & Calibrate Threshold',
        description: 'Insert the v1.2 capacitive probe into root media. Note readings when dry (e.g. 35%) to trigger the 12V pump for a 45-second precision pulse.',
        duration: '15 minutes'
      }
    ],
    deepContentVi: `
### Tại Sao Nông Dân Đô Thị Cần Cảm Biến Dung Kháng Thay Vì Cảm Biến Trở Kháng?

Hầu hết các bộ tưới tự động giá rẻ bán trôi nổi trên mạng đều sử dụng **cảm biến trở kháng (Resistive Sensor)** với 2 chân kim loại cắm thẳng vào đất.
Khi có dòng điện một chiều (DC) chạy qua giữa 2 que kim loại trong môi trường đất ẩm:
1. Hiện tượng điện phân xảy ra cực kỳ mãnh liệt, làm mạ đồng và hòa tan kim loại vào đất chỉ sau 2 tuần.
2. Kim loại bị ăn mòn làm thay đổi điện trở, khiến hệ thống hiểu sai là đất đang "rất khô" và liên tục bơm nước làm ngập úng chết cây!

**Cảm biến dung kháng (Capacitive Soil Moisture Sensor v1.2)** hoạt động theo nguyên lý hoàn toàn khác:
Các đường mạch đồng dẫn điện được phủ kín hoàn toàn bên dưới lớp sơn phủ cách điện chuyên dụng. Mạch hoạt động như một tụ điện đo hằng số điện môi của hỗn hợp đất và nước. Không có bất kỳ dòng điện nào tiếp xúc trực tiếp với đất, loại bỏ 100% hiện tượng ăn mòn điện phân và cho kết quả ổn định suốt nhiều năm canh tác!
`,
    deepContentEn: `
### Why Urban Growers Must Upgrade from Resistive to Capacitive Sensing

Most cut-rate automatic watering kits flood the market with cheap **resistive soil probes** featuring two exposed metal prongs.
When direct current (DC) passes between prongs in damp potting media:
1. Severe galvanic electrolysis dissolves the copper traces into the soil within 14 days.
2. Corroded traces dramatically skew resistance readings, fooling the system into believing soil is bone-dry, triggering endless pumping that drowns plant roots!

**Capacitive Soil Moisture Sensors (v1.2)** operate on an entirely superior electromagnetic principle:
Copper traces are hermetically sealed beneath an impermeable solder mask layer. The probe functions as a capacitor measuring the dielectric permittivity of soil water content. Zero current enters the wet soil, eliminating electrolytic corrosion and securing repeatable precision across multiple growing seasons!
`,
    faqsVi: [
      {
        question: 'Nếu nhà tôi bị cúp điện hoặc mất Wi-Fi thì hệ thống có tưới cây được không?',
        answer: 'HOÀN TOÀN TƯỚI BÌNH THƯỜNG. Firmware của chúng tôi được thiết kế với cơ chế "Edge Offline First": logic so sánh độ ẩm và lệnh bật tắt bơm relay được xử lý cục bộ ngay trên vi xử lý ESP32 mà không phụ thuộc vào máy chủ đám mây. Wi-Fi chỉ dùng để gửi tin nhắn thông báo khi có kết nối trở lại.'
      },
      {
        question: 'Dùng pin mặt trời vào mùa mưa ở miền Nam hoặc mùa nồm ẩm miền Bắc có đủ điện không?',
        answer: 'Hệ thống tiêu thụ cực kỳ ít điện (chỉ khoảng 0.05W trung bình nhờ chế độ ngủ sâu). Tấm pin 20W ngay cả khi trời nhiều mây u ám vẫn có thể tạo ra 2-3W điện quang phổ khuếch tán, thừa sức nạp bù vào bộ đôi pin 18650 để vận hành bơm màng mini.'
      }
    ],
    faqsEn: [
      {
        question: 'Will plants be watered if home Wi-Fi drops or power fails?',
        answer: 'YES, WITH COMPLETE AUTONOMY. The firmware executes an "Edge Offline First" architecture: sensor sampling thresholds and pump relay logic run locally on the ESP32 chip without cloud dependencies. Wi-Fi is used only for logging and status alerts.'
      },
      {
        question: 'Can solar panels maintain charge during monsoon or overcast winter seasons?',
        answer: 'The system consumes minimal baseline power (averaging ~0.05W via deep sleep). Even under overcast skies, a 20W panel generates 2-3W of diffuse ambient current, easily recharging the dual 18650 lithium cells to drive micro-irrigation bursts.'
      }
    ],
    equipmentBOM: [
      { itemVi: 'Bo mạch vi điều khiển ESP32 NodeMCU-32S Wi-Fi + Bluetooth', itemEn: 'ESP32 NodeMCU-32S development board with Wi-Fi & Bluetooth', estCostVnd: 85000, whereToBuyVi: 'Cửa hàng linh kiện điện tử hoặc Shopee', whereToBuyEn: 'Electronics retailer' },
      { itemVi: 'Cảm biến độ ẩm đất dung kháng Capacitive v1.2 chống ăn mòn (2 cái)', itemEn: 'Corrosion-resistant v1.2 capacitive soil moisture sensor (2 pcs)', estCostVnd: 46000, whereToBuyVi: 'Cửa hàng linh kiện Arduino / IoT', whereToBuyEn: 'Maker hobby depot' },
      { itemVi: 'Tấm pin năng lượng mặt trời Monocrystalline 20W 18V có khung nhôm', itemEn: '20W 18V Monocrystalline outdoor aluminum-frame solar panel', estCostVnd: 195000, whereToBuyVi: 'Cửa hàng thiết bị năng lượng mặt trời', whereToBuyEn: 'Solar equipment supplier' },
      { itemVi: 'Bơm màng mini 12V 365 siêu êm tự hút nước', itemEn: '12V 365 self-priming ultra-quiet mini diaphragm pump', estCostVnd: 55000, whereToBuyVi: 'Cửa hàng máy bơm nước mini', whereToBuyEn: 'Miniature pump vendor' },
      { itemVi: 'Mạch Relay cách ly quang Optocoupler 1 kênh 5V', itemEn: '1-channel 5V optocoupler isolated relay module', estCostVnd: 18000, whereToBuyVi: 'Cửa hàng linh kiện điện tử', whereToBuyEn: 'Electronics store' }
    ],
    urbanSafetyNoticeVi: 'AN TOÀN ĐIỆN NGOÀI TRỜI: Tuyệt đối không dùng nguồn điện trực tiếp 220V cắm ra ngoài ban công hở. Luôn sử dụng nguồn điện an toàn hạ áp DC 5V - 12V từ pin mặt trời để chống giật và chống chập cháy khi trời mưa to gió bão.',
    urbanSafetyNoticeEn: 'OUTDOOR ELECTRICAL SAFETY: Never run exposed 220V AC mains onto an unsheltered balcony. Exclusively deploy low-voltage 5V-12V DC power from solar batteries to eliminate electrocution hazards during heavy rain.',
    relatedArticleSlugs: [
      'tu-che-cam-bien-do-am-dat-esp32',
      'den-led-quang-hop-full-spectrum-cho-can-ho',
      'nhan-dien-sau-benh-bang-ai-bac-si-cay'
    ]
  },
  {
    id: 'art-smart-sub1',
    slug: 'tu-che-cam-bien-do-am-dat-esp32',
    categorySlug: 'nong-nghiep-thong-minh',
    titleVi: 'Hướng Dẫn Tự Làm Cảm Biến Độ Ẩm Đất Dung Kháng ESP32 Chi Phí Dưới 100k Báo Smartphone',
    titleEn: 'DIY ESP32 Soil Sensor Under $5: Real-Time Mobile Alerts via Telegram Bot',
    subtitleVi: 'Sơ đồ chân GPIO ADC, lập trình Arduino IDE và gửi tin nhắn cảnh báo thiếu nước tức thì',
    subtitleEn: 'GPIO ADC pinouts, Arduino IDE firmware, and instant low-moisture Telegram notifications',
    excerptVi: 'Tự chế tạo thiết bị đo độ ẩm đất thông minh kết nối Wi-Fi trong 30 phút. Nhận thông báo "Cây Đinh Lăng đang khát nước" kèm tỷ lệ % độ ẩm ngay trên điện thoại của bạn.',
    excerptEn: 'Build a Wi-Fi-enabled soil moisture monitor in 30 minutes under $5. Receive push alerts when herbs need water directly on your smartphone.',
    readTimeMinutes: 8,
    authorName: 'Ks. Vũ Thành Long',
    authorRoleVi: 'Kỹ sư Trưởng Hệ thống IoT & Nhúng Nông nghiệp',
    authorRoleEn: 'Lead Embedded IoT Engineer',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1200&q=80',
    tags: ['ESP32', 'Cảm biến đất', 'Telegram Bot', 'Tự làm IoT', 'Arduino'],
    directAnswerSnippetVi: 'Tự làm cảm biến độ ẩm ESP32 dưới 100k: nối chân VCC cảm biến dung kháng vào 3.3V ESP32, GND vào GND, chân AOUT vào chân GPIO 34 (ADC1); nạp mã nguồn Arduino kết nối Wi-Fi đọc điện áp ADC; lập trình bot Telegram miễn phí tự động nhắn tin cảnh báo khi độ ẩm tụt dưới 30%.',
    directAnswerSnippetEn: 'Build an ESP32 soil sensor under $5: connect capacitive sensor VCC to 3.3V, GND to GND, and analog AOUT to GPIO 34 (ADC1); flash Arduino firmware that samples moisture and calculates calibration curves; program a free Telegram Bot that dispatches instant push alerts whenever moisture drops below 30%.',
    scientificData: {
      botanicalName: 'Capacitive Permittivity Soil Telemetry',
      optimalTemp: 'Nhiệt độ mạch ESP32: 20°C - 45°C',
      keyMetrics: [
        { labelVi: 'Độ phân giải đọc ADC ESP32', labelEn: 'ADC Sampling Resolution', value: '12-bit (0 - 4095)', noteVi: 'Đo chi tiết sự biến thiên độ ẩm vi mô', noteEn: 'High granularity moisture detection' },
        { labelVi: 'Thời gian trễ thông báo Telegram', labelEn: 'Telegram Alert Latency', value: '< 1.5 giây', noteVi: 'Nhận tin nhắn ngay khi đất khô hạn', noteEn: 'Instantaneous push notification' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Hàn chân nối và cắm dây bẹ', description: 'Nối 3 dây bẹ từ cảm biến dung kháng v1.2 vào bo ESP32: Đỏ (3.3V), Đen (GND), Vàng (GPIO 34).', duration: '10 phút' },
      { step: 2, title: 'Tạo Telegram Bot miễn phí với BotFather', description: 'Mở Telegram tìm @BotFather, gõ /newbot để nhận Bot Token bí mật và lấy Chat ID của bạn.', duration: '10 phút' },
      { step: 3, title: 'Cân chỉnh giá trị khô và ướt', description: 'Đo giá trị analog khi cảm biến để ngoài không khí khô (khoảng 3100) và khi cắm vào cốc nước (khoảng 1400) để quy đổi ra % độ ẩm thực.', duration: '10 phút' },
      { step: 4, title: 'Nạp code và kiểm tra trên smartphone', description: 'Nạp code qua cổng Micro-USB, cắm cảm biến vào chậu cây và quan sát thông báo tin nhắn gửi về điện thoại.', duration: '15 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Wire Sensor to ESP32 ADC', description: 'Connect 3 jumper wires: Red to 3.3V, Black to GND, and Yellow signal wire to GPIO 34 (ADC1).', duration: '10 minutes' },
      { step: 2, title: 'Generate Telegram Bot with BotFather', description: 'Message @BotFather on Telegram, type /newbot to obtain your private API bot token and chat ID.', duration: '10 minutes' },
      { step: 3, title: 'Calibrate Dry & Wet Endpoints', description: 'Sample raw analog values in open air (~3100) vs submerged in water (~1400) to construct a linear % percentage curve.', duration: '10 minutes' },
      { step: 4, title: 'Flash Firmware and Verify Mobile Alerts', description: 'Flash Arduino sketch via USB, insert probe into soil, and verify incoming push notification on your smartphone.', duration: '15 minutes' }
    ],
    deepContentVi: 'Việc giám sát độ ẩm đất liên tục qua điện thoại giúp người làm vườn đô thị loại bỏ hoàn toàn cảm tính "thấy mặt đất khô là tưới". Rất nhiều trường hợp lớp đất mặt 1cm bị khô do gió quạt nhưng tầng rễ sâu 5cm bên dưới vẫn còn rất ẩm. Cảm biến dung kháng cắm sâu 7cm giúp bảo vệ cây khỏi bệnh thối rễ do tưới quá nhiều (Over-watering) – nguyên nhân gây chết cây số một trong các căn hộ chung cư.',
    deepContentEn: 'Continuous smartphone soil moisture tracking eliminates guesswork. Wind often dries the top 1cm crust while the deep 5cm root zone remains saturated. Embedding the capacitive probe 7cm deep prevents over-watering—the single leading cause of plant mortality in condominium gardens.',
    faqsVi: [
      { question: 'Tại sao nên cắm cảm biến vào chân GPIO 34 mà không dùng chân GPIO 2?',
      answer: 'Trên chip ESP32, bộ chuyển đổi analog ADC2 (gồm các chân GPIO 2, 4, 12, 13, 14, 15...) bị xung đột và mất chức năng khi bật Wi-Fi! Do đó, bắt buộc phải cắm cảm biến vào các chân thuộc bộ ADC1 (như GPIO 32, 33, 34, 35, 36, 39) để vừa đọc được độ ẩm vừa truyền được dữ liệu Wi-Fi cùng lúc.' }
    ],
    faqsEn: [
      { question: 'Why use GPIO 34 instead of GPIO 2?',
      answer: 'On the ESP32 chip, ADC2 pins (GPIO 2, 4, 12-15) are multiplexed with the Wi-Fi module and disabled whenever Wi-Fi is active. You must connect analog sensors exclusively to ADC1 pins (GPIO 32-36, 39) to read moisture while transmitting Wi-Fi telemetry.' }
    ],
    relatedArticleSlugs: ['cam-bien-iot-tu-dong-hoa-ban-cong', 'den-led-quang-hop-full-spectrum-cho-can-ho']
  },
  {
    id: 'art-smart-sub2',
    slug: 'den-led-quang-hop-full-spectrum-cho-can-ho',
    categorySlug: 'nong-nghiep-thong-minh',
    titleVi: 'Cách Chọn Đèn LED Quang Hợp Cho Căn Hộ Thiếu Sáng: Đo PPFD & DLI Thực Tế',
    titleEn: 'Indoor Balcony Grow Lights: Calculating PPFD & Daily Light Integral (DLI)',
    subtitleVi: 'Phổ ánh sáng Samsung LM301H, bước sóng 660nm Deep Red và tối ưu quang hợp lá',
    subtitleEn: 'Samsung LM301H spectrum, 660nm Deep Red wavelengths, and photosynthetic efficiency',
    excerptVi: 'Giải pháp cứu cánh cho những ban công hướng Bắc hoặc căn hộ bị tòa nhà chọc trời che khuất ánh sáng. Cách tính toán công suất đèn và số giờ bật để cây phát triển sum suê như ngoài trời.',
    excerptEn: 'Rescue north-facing balconies and shadowed apartments. Calculate PPFD photon flux and daily lighting hours to keep herbs thriving indoors.',
    readTimeMinutes: 8,
    authorName: 'Ks. Vũ Thành Long',
    authorRoleVi: 'Kỹ sư Trưởng Hệ thống IoT & Quang học Nông nghiệp',
    authorRoleEn: 'Agricultural Optical & IoT Systems Engineer',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=1200&q=80',
    tags: ['Đèn LED quang hợp', 'PPFD và DLI', 'Trồng cây trong nhà', 'Samsung LM301H'],
    directAnswerSnippetVi: 'Chọn đèn LED quang hợp cho căn hộ: ưu tiên chip LED toàn phổ (Full-Spectrum 4000K) kết hợp bước sóng đỏ sâu 660nm (Deep Red); khoảng cách treo cách ngọn cây 30-40cm để đạt mật độ photon quang hợp PPFD 150-250 µmol/m²/s; cài hẹn giờ chiếu sáng 12-14 giờ/ngày để đạt tích phân ánh sáng DLI 8-12 mol/m²/ngày cho rau thảo mộc.',
    directAnswerSnippetEn: 'Select apartment grow lights: prioritize full-spectrum (4000K) combined with 660nm deep-red diodes (e.g. Samsung LM301H); hang 30-40cm above canopies to deliver PPFD 150-250 µmol/m²/s; program timers for 12-14 daily hours to accumulate a target Daily Light Integral (DLI) of 8-12 mol/m²/day for vigorous culinary herbs.',
    scientificData: {
      botanicalName: 'Photosynthetically Active Radiation (PAR 400-700nm)',
      optimalTemp: 'Nhiệt độ tản nhiệt thanh nhôm: < 50°C',
      keyMetrics: [
        { labelVi: 'Hiệu suất quang thông photon PPE', labelEn: 'Photosynthetic Photon Efficacy', value: '2.7 µmol/J', noteVi: 'Tiết kiệm 65% điện so với bóng huỳnh quang cũ', noteEn: '65% more efficient than fluorescent T5' },
        { labelVi: 'DLI mục tiêu cho cây thảo dược', labelEn: 'Target Herb DLI', value: '10 - 14 mol/m²/ngày', noteVi: 'Đảm bảo cành lá đanh chắc, nhiều tinh dầu', noteEn: 'Ensures dense branching and high essential oils' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Đo lượng ánh sáng tự nhiên sẵn có', description: 'Tải ứng dụng đo Lux/PPFD trên điện thoại (như Photone) để đo lượng photon tự nhiên tại vị trí đặt cây vào giữa trưa.', duration: '15 phút' },
      { step: 2, title: 'Tính toán công suất bù quang thiếu hụt', description: 'Nếu ban công chỉ nhận 2 giờ nắng/ngày (DLI ~ 3 mol), cần bổ sung 7 mol photon bằng cách bật đèn LED 30W trong 10 tiếng.', duration: '10 phút' },
      { step: 3, title: 'Lắp đặt thanh LED và tản nhiệt nhôm', description: 'Treo thanh LED cách ngọn cây 35cm, hướng luồng sáng chiếu thẳng góc 90 độ xuống tán lá.', duration: '20 phút' },
      { step: 4, title: 'Cài đặt ổ cắm hẹn giờ tự động', description: 'Cài đặt timer tự động bật đèn lúc 6h sáng và tắt lúc 18h tối để thiết lập nhịp sinh học ngày/đêm tự nhiên cho cây.', duration: '10 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Measure Ambient Photons with App', description: 'Use smartphone calibrated PAR apps (e.g. Photone) to measure baseline midday natural light intensity at plant canopy level.', duration: '15 minutes' },
      { step: 2, title: 'Calculate Deficit Light Integral (DLI)', description: 'If your balcony receives only 2 hours of direct sun (DLI ~ 3 mol), supplement 7 mol with a 30W LED running for 10 hours.', duration: '10 minutes' },
      { step: 3, title: 'Suspend Fixture with Aluminum Heatsink', description: 'Mount the LED bar 35cm above foliage, directing the 120-degree light beam perpendicular to the canopy.', duration: '20 minutes' },
      { step: 4, title: 'Automate Day/Night Circadian Timer', description: 'Program an automated digital socket timer from 6:00 AM to 6:00 PM to establish natural circadian photoperiods.', duration: '10 minutes' }
    ],
    deepContentVi: 'Nhiều người lầm tưởng lấy bóng đèn tuýp LED chiếu sáng gia đình thông thường để rọi cây. Đèn gia đình được thiết kế để mắt người nhìn thấy sáng (đo bằng đơn vị Lumen/Lux) nhưng lại thiếu hụt nghiêm trọng phổ ánh sáng xanh dương (450nm) và đỏ (660nm) – hai dải sóng duy nhất mà chất diệp lục Chlorophyll A & B của cây có thể hấp thụ để quang hợp tổng hợp đường bột.',
    deepContentEn: 'A common pitfall is using standard household LED bulbs for indoor gardening. Residential bulbs are calibrated strictly for human ocular sensitivity (measured in lumens/lux) but lack intense peaks at 450nm (blue) and 660nm (deep red)—the exact absorption wavelengths used by Chlorophyll A & B for photosynthetic carbohydrate synthesis.',
    faqsVi: [
      { question: 'Có nên bật đèn quang hợp liên tục 24/24 giờ để cây mau lớn không?',
      answer: 'TUYỆT ĐỐI KHÔNG. Thực vật cũng cần giấc ngủ ban đêm! Trong pha tối, cây thực hiện quá trình hô hấp tế bào và vận chuyển lượng đường bột quang hợp được từ lá xuống nuôi dưỡng rễ non. Chiếu sáng liên tục 24/24 sẽ gây stress oxy hóa làm cháy đầu lá và kiệt sức cây.' }
    ],
    faqsEn: [
      { question: 'Can I run grow lights 24 hours a day to speed up growth?',
      answer: 'ABSOLUTELY NOT. Plants require a dark period for cellular respiration and nutrient translocation from leaves to root tips. Continuous 24/7 lighting causes severe oxidative stress, photoinhibition, and premature chlorosis.' }
    ],
    relatedArticleSlugs: ['cam-bien-iot-tu-dong-hoa-ban-cong', 'tu-che-cam-bien-do-am-dat-esp32']
  },
  {
    id: 'art-smart-sub3',
    slug: 'nhan-dien-sau-benh-bang-ai-bac-si-cay',
    categorySlug: 'nong-nghiep-thong-minh',
    titleVi: 'Ứng Dụng Thị Giác Máy Tính AI Nhận Diện Sớm Bệnh Vàng Lá, Rệp Sáp & Thiếu Dinh Dưỡng',
    titleEn: 'AI Computer Vision Plant Pathology: Detecting Leaf Chlorosis, Pests & Deficiencies Early',
    subtitleVi: 'Mô hình học sâu MobileNetV3, phân tích triệu chứng biểu mô lá và phác đồ sinh học',
    subtitleEn: 'MobileNetV3 deep learning models, leaf symptom segmentation, and bio-organic treatment protocols',
    excerptVi: 'Hướng dẫn sử dụng công cụ Bác Sĩ Cây AI của Yêu Trồng Cây để chẩn đoán chính xác bệnh cây chỉ qua 1 bức ảnh chụp điện thoại. Kê đơn thuốc sinh học an toàn không độc hại cho gia đình.',
    excerptEn: 'Learn how to deploy YeuTrongCay AI Plant Doctor to diagnose foliar pathologies from a single smartphone snap. Generate zero-chemical organic prescription cures.',
    readTimeMinutes: 7,
    authorName: 'Ks. Trần Anh Tuấn',
    authorRoleVi: 'Kỹ sư Trưởng AI & Bác Sĩ Cây Trồng',
    authorRoleEn: 'Lead AI & Plant Pathology Engineer',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
    tags: ['Bác sĩ cây AI', 'Chẩn đoán bệnh cây', 'Thị giác máy tính', 'Trị rệp sáp sinh học'],
    directAnswerSnippetVi: 'Công nghệ AI Bác Sĩ Cây phân tích bệnh qua ảnh chụp lá bằng mạng nơ-ron MobileNetV3: nhận diện chính xác 94% các bệnh phổ biến như vàng lá do thiếu sắt (gân lá xanh, thịt lá vàng), rệp sáp trắng, nhện đỏ chích hút và nấm rỉ sắt; tự động đề xuất phác đồ điều trị bằng dung dịch tỏi ớt gừng hoặc dầu neem sinh học.',
    directAnswerSnippetEn: 'AI Plant Doctor analyzes foliar pathologies via MobileNetV3 neural vision: achieving 94% precision identifying chlorosis (interveinal iron deficiency), mealybug clusters, two-spotted spider mites, and rust fungus; instantly outputting natural biopesticide remedies like cold-pressed neem oil and ginger-garlic extracts.',
    scientificData: {
      botanicalName: 'Computer Vision Agro-Diagnostics',
      optimalTemp: 'Chụp ảnh dưới ánh sáng ban ngày tự nhiên (không bật flash)',
      keyMetrics: [
        { labelVi: 'Độ chính xác nhận diện Top-1', labelEn: 'Top-1 Neural Accuracy', value: '94.6%', noteVi: 'Huấn luyện trên 50.000 mẫu ảnh cây nhiệt đới', noteEn: 'Trained on 50,000 tropical leaf specimens' },
        { labelVi: 'Thời gian phản hồi chẩn đoán', labelEn: 'Inference Latency', value: '< 800 ms', noteVi: 'Chạy trực tiếp trên trình duyệt web của bạn', noteEn: 'Runs on-device via WebAssembly/TensorFlow' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Chụp ảnh lá rõ nét dưới ánh sáng tự nhiên', description: 'Đưa ống kính camera cách mặt lá bị bệnh 15-20cm, lấy nét vào ranh giới giữa phần mô lá lành và mô lá bị tổn thương.', duration: '2 phút' },
      { step: 2, title: 'Tải ảnh lên tính năng Bác Sĩ Cây AI', description: 'Truy cập chuyên trang Bác Sĩ Cây (/bac-si-cay-trong) trên Yêu Trồng Cây và tải ảnh lên hệ thống.', duration: '1 phút' },
      { step: 3, title: 'Đọc kết quả phân tích nồng độ bệnh', description: 'Xem kết quả chẩn đoán: tên bệnh học, tỷ lệ xác suất % và nguyên nhân cốt lõi (do vi nấm, côn trùng hay dinh dưỡng).', duration: '2 phút' },
      { step: 4, title: 'Áp dụng phác đồ sinh học được kê đơn', description: 'Thực hiện phun dung dịch dầu Neem nhũ hóa bồ hòn hoặc che chắn nắng theo hướng dẫn chi tiết từng bước.', duration: '15 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Capture Sharp Leaf Photo in Daylight', description: 'Position camera 15-20cm away, focusing on the boundary between healthy and necrotic leaf tissue without flash.', duration: '2 minutes' },
      { step: 2, title: 'Upload to AI Plant Doctor Portal', description: 'Visit the AI Plant Doctor interface (/bac-si-cay-trong) and upload your photo.', duration: '1 minute' },
      { step: 3, title: 'Review Pathology Assessment', description: 'Inspect neural confidence scores, disease taxonomy, and root etiologies (fungal, insect, or nutrient deficiency).', duration: '2 minutes' },
      { step: 4, title: 'Deploy Prescribed Organic Bio-Protocol', description: 'Apply cold-pressed neem oil emulsified with soapberries or modify solar exposure following step-by-step guidance.', duration: '15 minutes' }
    ],
    deepContentVi: 'Sai lầm tai hại nhất của cư dân đô thị khi thấy cây bị bệnh là vội vàng chạy ra tiệm mua thuốc xịt trừ sâu hóa học về phun khắp ban công. Hóa chất độc hại phát tán trong không khí ban công bay ngược vào phòng khách, gây độc cho trẻ nhỏ và tiêu diệt luôn cả các loài côn trùng thiên địch có ích (như bọ rùa ăn rệp). AI Bác Sĩ Cây hướng dẫn bạn giải pháp sinh học an toàn tuyệt đối cho tổ ấm.',
    deepContentEn: 'The most hazardous mistake urbanites commit upon seeing leaf spots is rushing to spray toxic synthetic pesticides over balconies. Airborne aerosols drift indoors into living rooms, endangering children and pets while wiping out beneficial predator insects (like aphid-eating ladybugs). AI Plant Doctor empowers you with 100% human-safe biological remedies.',
    faqsVi: [
      { question: 'Làm sao phân biệt giữa vàng lá do thiếu đạm và vàng lá do thừa nước úng rễ?',
      answer: 'Quan sát vị trí và thể chất lá: (1) Thiếu đạm (Nitơ): Toàn bộ các lá già dưới gốc chuyển sang màu vàng nhạt đồng đều, lá mềm mỏng nhưng không nhũn; (2) Úng rễ thừa nước: Lá vàng kèm theo các vết thâm đen ở chóp lá, lá phù nước mềm nhũn và rụng hàng loạt khi chạm nhẹ vào.' }
    ],
    faqsEn: [
      { question: 'How do I distinguish nitrogen deficiency chlorosis from overwatering root rot?',
      answer: 'Examine pattern and leaf texture: (1) Nitrogen deficiency: Oldest bottom leaves turn uniformly pale yellow while remaining dry and thin; (2) Overwatering root rot: Foliage turns yellow with water-soaked blackened tips, turning mushy and dropping en masse at a light touch.' }
    ],
    relatedArticleSlugs: ['cam-bien-iot-tu-dong-hoa-ban-cong', 'tu-che-cam-bien-do-am-dat-esp32']
  }
];
