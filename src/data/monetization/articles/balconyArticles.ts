import { ArticleFullContent } from '../types';

export const BALCONY_ARTICLES: ArticleFullContent[] = [
  {
    id: 'art-balcony-pillar',
    slug: 'dich-vu-setup-tu-thuoc-ban-cong',
    categorySlug: 'dich-vu-setup-ban-cong',
    titleVi: 'Dịch Vụ Thiết Kế & Thi Công "Tủ Thuốc Ban Công Tự Dưỡng": Mô Hình Kinh Doanh Cho Căn Hộ',
    titleEn: 'Urban Living Apothecary Setup: High-Margin Balcony Garden Consulting Blueprint',
    subtitleVi: 'Quy chuẩn an toàn tải trọng kiến trúc, tối ưu phân tầng tán theo hướng nắng và dự toán chi phí',
    subtitleEn: 'Structural floor-load compliance, solar DLI canopy stratification, and turn-key client pricing',
    excerptVi: 'Cẩm nang chìa khóa trao tay khởi nghiệp dịch vụ tư vấn và lắp đặt vườn ban công dược liệu. Làm chủ phân tầng sinh thái 3 lớp, chống thấm sàn và cam kết sống 100% cho gia chủ bận rộn.',
    excerptEn: 'Turnkey consulting framework for designing resilient balcony herb sanctuaries. Master 3-tier canopy ecology, leak-proof floor protection, and high-margin urban residential contracts.',
    readTimeMinutes: 13,
    authorName: 'Kts. Nguyễn Hoàng Sơn',
    authorRoleVi: 'Kiến trúc sư Cảnh quan Đô thị Sinh thái',
    authorRoleEn: 'Urban Ecological Landscape Architect',
    lastUpdated: '2026-11-08',
    isPillar: true,
    interactiveEngineId: 'balcony-solar-stager',
    coverImage: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1200&q=80',
    tags: ['Setup ban công', 'Tủ thuốc ban công', 'Dịch vụ thi công vườn', 'Tải trọng ban công', 'Nắng hướng Tây'],
    directAnswerSnippetVi: 'Dịch vụ setup tủ thuốc ban công chuyên nghiệp đảm bảo 3 tiêu chí kỹ thuật: tải trọng ướt toàn tải không vượt quá 120-150 kg/m² để bảo vệ kết cấu dầm ban công; phân bổ 3 tầng tán theo chỉ số tích phân ánh sáng DLI (tầng trên chịu nắng gắt, tầng giữa lấy sáng khuếch tán, tầng dưới giữ ẩm râm mát); và lắp đặt hệ thống khay có rãnh thoát nước chống thấm ố sàn gạch.',
    directAnswerSnippetEn: 'Professional balcony apothecary setup mandates 3 engineering criteria: wet structural payload under 120-150 kg/sqm to comply with residential building codes; 3-tier canopy stratification aligned with Daily Light Integral (DLI); and elevated sub-trays with continuous drainage air gaps to permanently safeguard tile waterproofing.',
    scientificData: {
      botanicalName: 'Urban Balcony Botanical Stratification',
      optimalTemp: 'Vi khí hậu ban công chung cư: 22°C - 35°C',
      keyMetrics: [
        { labelVi: 'Giới hạn tải trọng cho phép', labelEn: 'Floor Load Safety Ceiling', value: '150 kg/m²', noteVi: 'Tiêu chuẩn xây dựng Việt Nam TCVN 2737 ban công chung cư', noteEn: 'Vietnam construction code TCVN 2737' },
        { labelVi: 'Tải trọng ướt giải pháp Living Soil', labelEn: 'Living Soil Wet Weight', value: '88 kg/m²', noteVi: 'Nhờ sử dụng đá bọt Pumice và Perlite nhẹ thay đất cát', noteEn: 'Substituted heavy sand with volcanic pumice' },
        { labelVi: 'Tỷ lệ sống sót cây sau 6 tháng', labelEn: 'Plant Survival Rate at 6mo', value: '96.8%', noteVi: 'Nhờ nguyên lý tương hỗ sinh thái 3 tầng', noteEn: 'Due to mutualistic canopy shelter' },
        { labelVi: 'Thời gian hoàn vốn dịch vụ setup', labelEn: 'Consulting Payback Period', value: '1 công trình', noteVi: 'Lợi nhuận ròng 35-45% trên mỗi gói hợp đồng', noteEn: '35-45% net margin per project' }
      ],
      comparisonTable: {
        headersVi: ['Hạng mục thi công', 'Thợ hồ / Đội cây cảnh thông thường', 'Tiêu Chuẩn Kỹ Thuật Yêu Trồng Cây'],
        headersEn: ['Scope Element', 'Conventional Landscapers', 'YeuTrongCay Engineering Standard'],
        rowsVi: [
          ['Đánh giá tải trọng sàn', 'Bỏ qua, đổ đất thịt nặng 200kg/m² gây nứt dầm', 'Kiểm định CAD tải trọng ướt luôn < 120kg/m²'],
          ['Xử lý rãnh thoát nước', 'Kê gạch sơ sài gây đọng phèn ố gạch hoa', 'Hệ chân đế đệm cao su EPDM cách sàn 3cm, thông gió tự nhiên'],
          ['Lựa chọn loài cây', 'Cây ngoại nhập yếu ớt, chết sau 1 tháng', 'Hệ thảo dược bản địa F1 thích nghi nắng gió tầng cao'],
          ['Cam kết bảo hành', 'Bán xong đứt đoạn', 'Bảo hành sinh thái 90 ngày kèm ứng dụng theo dõi']
        ],
        rowsEn: [
          ['Structural Load Check', 'Ignored, heavy dirt over 200kg/m² risks cracks', 'CAD calculation guarantees wet load < 120kg/m²'],
          ['Floor Waterproof Gap', 'Crude bricks causing moldy water stains', 'EPDM rubber pedestals lifting pots 3cm with free airflow'],
          ['Plant Selection', 'Fragile ornamental hybrids dying in 30 days', 'F1 native medicinal polyculture thriving in high-rise winds'],
          ['Warranty & Handover', 'No follow-up after installation', '90-day ecological warranty supported by digital app']
        ]
      }
    },
    sopStepsVi: [
      {
        step: 1,
        title: 'Khảo sát hướng nắng và đo quang phổ DLI thực địa',
        description: 'Đo kích thước ban công, kiểm tra hướng la bàn và góc che chắn của các tòa nhà lân cận. Dùng máy đo hoặc tính toán số giờ nắng trực tiếp và cường độ tán xạ trong ngày.',
        duration: '30 phút',
        proTip: 'Dùng công cụ Visual Balcony Solar Stager ở đầu bài để chọn cấu hình phù hợp với hướng Đông, Tây, Nam hay Bắc.'
      },
      {
        step: 2,
        title: 'Bố trí mặt bằng phân tầng 3 lớp (Canopy Stratification)',
        description: 'Tầng trên (đón nắng trực diện): Đinh lăng, ổi bonsai, hương thảo. Tầng giữa (nắng lọc qua tán): Húng chanh, tía tô, bạc hà. Tầng dưới cùng (bóng râm mát và ẩm ướt): Lá lốt, ngải cứu, trùn quế.',
        duration: '20 phút',
        caution: 'Không bao giờ đặt cây ưa râm ở rìa lan can ban công hướng Tây.'
      },
      {
        step: 3,
        title: 'Lắp đặt khay đế chân cao su cách ly mặt sàn ban công',
        description: 'Lắp đặt các đế khay thông minh có rãnh gom nước thừa về một ống dẫn xả vào phễu thoát sàn. Tuyệt đối không để nước tưới chảy tràn lan tự do trên bề mặt ban công.',
        duration: '45 phút',
        proTip: 'Chân đế cao su EPDM giúp triệt tiêu rung chấn gió bão và ngăn truyền nhiệt từ sàn bê tông hắt lên rễ.'
      },
      {
        step: 4,
        title: 'Phối trộn đất sống Living Soil siêu nhẹ và trồng cây',
        description: 'Đổ giá thể Living Soil (chứa 40% Pumice/Perlite, 30% xơ dừa, 30% phân trùn quế hoai mục). Trồng cây kết hợp xen canh thảo mộc xua đuổi côn trùng và phủ lớp vỏ thông bề mặt giữ ẩm.',
        duration: '60 phút'
      }
    ],
    sopStepsEn: [
      {
        step: 1,
        title: 'Site Survey: Compass Azimuth & DLI Solar Mapping',
        description: 'Measure balcony footprint, compass bearing, and adjacent high-rise shadows. Calculate daily direct sun hours and diffuse DLI exposure.',
        duration: '30 minutes',
        proTip: 'Use our embedded Balcony Solar Stager tool to simulate East, West, South, and North configurations.'
      },
      {
        step: 2,
        title: 'Architectural 3-Tier Canopy Spatial Stratification',
        description: 'Top Canopy (High DLI sun lovers): Rosemary, Guava, Dinh Lang. Mid Canopy (Filtered light): Cuban oregano, Perilla, Mint. Bottom Understory (Shade & moisture): Wild betel, Mugwort, vermicompost bin.',
        duration: '20 minutes',
        caution: 'Never place delicate shade lovers against outer West-facing parapet rails.'
      },
      {
        step: 3,
        title: 'Elevate Floor Trays with EPDM Rubber Air-Gapped Risers',
        description: 'Mount modular planter saucers on rubber risers with plumbed overflow lines routed to the central balcony floor drain, barring messy floor puddles.',
        duration: '45 minutes',
        proTip: 'EPDM pedestals dampen wind vibration and insulate roots from scorching concrete slabs.'
      },
      {
        step: 4,
        title: 'Fill with Ultra-Light Living Soil Media and Companion Plants',
        description: 'Install Living Soil (40% Pumice/Perlite, 30% coco peat, 30% vermicompost). Interplant pest-repelling companion herbs and top-dress with pine bark mulch.',
        duration: '60 minutes'
      }
    ],
    deepContentVi: `
### Cơ Hội Kinh Doanh Dịch Vụ Nông Nghiệp Đô Thị Có Giá Trị Cao

Các căn hộ chung cư đô thị hiện đại ngày nay đều có nhu cầu rất lớn về một mảng xanh hữu ích: vừa đẹp mắt để thư giãn uống trà, vừa cung cấp rau gia vị sạch và các vị thuốc cảm ho khẩn cấp cho gia đình. Tuy nhiên, 90% gia chủ gặp phải các vấn đề:
1. Mua chậu ngoài tiệm về sau 2-3 tuần là cây vàng lá, rệp sáp bu trắng rồi chết.
2. Nước tưới làm đen ố gạch sàn ban công, bị ban quản lý chung cư nhắc nhở.
3. Ban công hướng Tây nóng hầm hập như lò thiêu, cây héo rũ vì sốc nhiệt rễ.

Mô hình **"Tủ Thuốc Ban Công Tự Dưỡng"** giải quyết trọn gói những nỗi đau này với một hợp đồng setup trọn gói từ 3.5 - 7.5 triệu VNĐ (thời gian thi công chỉ trong 1 buổi sáng), mang lại tỷ suất lợi nhuận ròng từ 40% cho người làm dịch vụ.
`,
    deepContentEn: `
### The High-Margin Opportunity in Urban Balcony Agro-Ecology

Modern condominium dwellers desperately crave functional green refuges: aesthetic tea-sipping spaces that simultaneously supply fresh culinary aromatics and home first-aid botanicals. Yet 90% encounter chronic frustrations:
1. Store-bought nursery pots dwindle and succumb to mealybugs within weeks.
2. Unmanaged runoff creates unsightly floor mold, sparking condo board complaints.
3. West-facing thermal traps boil shallow pots, scorching vulnerable root systems.

Our **"Urban Balcony Living Apothecary"** package addresses these headaches comprehensively in a turnkey setup priced between \$150 - \$350 (installed in a single morning), securing healthy 40% net margins for green entrepreneurs.
`,
    faqsVi: [
      {
        question: 'Ban quản lý chung cư có cấm việc trồng cây và lắp kệ ngoài ban công không?',
        answer: 'Hầu hết các ban quản lý chỉ cấm: (1) Treo chậu lơ lửng ngoài lan can gây nguy cơ rơi rớt mất an toàn cho người bên dưới; (2) Khoan đục làm hỏng lớp chống thấm sàn; (3) Để nước bẩn rò rỉ sang nhà hàng xóm. Giải pháp của chúng tôi đặt toàn bộ chậu bên trong lan can, dùng chân đế cao su không khoan đục và gom nước khép kín 100%, hoàn toàn tuân thủ mọi nội quy chung cư cao cấp.'
      },
      {
        question: 'Ban công hướng Tây nắng chiếu hừng hực buổi chiều thì cây có sống nổi không?',
        answer: 'Hoàn toàn sống tốt nếu tuân thủ 2 nguyên tắc: (1) Không dùng chậu nhựa đen mỏng (hấp thụ nhiệt làm sôi rễ), thay bằng chậu xi măng nhẹ composite hoặc quấn màng cách nhiệt quanh thành chậu; (2) Dựng hàng rào sinh thái tầng trên bằng cây chịu hạn như đinh lăng nếp hoặc ổi bonsai để che bóng mát cho các tầng cây bên dưới.'
      }
    ],
    faqsEn: [
      {
        question: 'Do condo bylaws restrict planting on high-rise balconies?',
        answer: 'Building management generally prohibits: (1) Hanging heavy planters over exterior parapets (falling hazards); (2) Drilling floor tiles that void waterproofing; (3) Staining common drainage. Our system rests entirely inside railings, uses non-invasive rubber pedestals, and features closed-loop drainage that strictly complies with luxury condo codes.'
      },
      {
        question: 'Can plants survive intense afternoon sun on West-facing balconies?',
        answer: 'Absolutely, provided two conditions are met: (1) Avoid thin black plastic pots that boil roots—opt for light-colored composite or insulated planters; (2) Deploy a top canopy of drought-resilient shields (Dinh Lang, Guava bonsai) to naturally cast dappled protective shade over understory layers.'
      }
    ],
    equipmentBOM: [
      { itemVi: 'Kệ sắt V lỗ sơn tĩnh điện 3 tầng chống rỉ sét ngoài trời', itemEn: '3-tier outdoor powder-coated heavy-duty steel rack', estCostVnd: 280000, whereToBuyVi: 'Xưởng cơ khí hoặc đại lý kệ sắt', whereToBuyEn: 'Industrial shelving supplier' },
      { itemVi: 'Chậu chữ nhật thông minh có lưới thoát nước chống úng (6 chậu)', itemEn: 'Self-watering rectangular planters with aeration sub-grid (6 pcs)', estCostVnd: 180000, whereToBuyVi: 'Cửa hàng chậu nhựa nông nghiệp', whereToBuyEn: 'Garden container store' },
      { itemVi: 'Bao đá bọt Pumice Thổ Nhĩ Kỳ 5-8mm lót đáy chống nén (20L)', itemEn: '20L bag Turkish Pumice 5-8mm for aerated base drainage', estCostVnd: 95000, whereToBuyVi: 'Cửa hàng vật tư sen đá / kiểng lá', whereToBuyEn: 'Bonsai & succulent supplier' },
      { itemVi: 'Chân đế đệm cao su giảm chấn chống trầy sàn EPDM (12 cái)', itemEn: 'EPDM vibration dampening rubber floor pads (12 pcs)', estCostVnd: 45000, whereToBuyVi: 'Cửa hàng phụ tùng công nghiệp', whereToBuyEn: 'Hardware distributor' }
    ],
    urbanSafetyNoticeVi: 'QUY TẮC AN TOÀN CHUNG CƯ: Tuyệt đối không treo móc chậu cây phía ngoài mép lan can. Luôn cố định chân kệ tầng vào chân tường bằng dây thít thép an toàn để chống rung lắc khi có gió lốc tầng cao.',
    urbanSafetyNoticeEn: 'HIGH-RISE SAFETY MANDATE: Never cantilever planters outward over railings. Secure multi-tier rack bases against perimeter walls using aircraft-grade safety cable ties to withstand high-altitude wind shears.',
    relatedArticleSlugs: [
      'trong-cay-ban-cong-huong-tay-chiu-nang-gat',
      'cong-thuc-tron-dat-trong-rau-ban-cong-3-nam',
      'he-thong-tuoi-nho-giot-ban-cong-khong-can-bom'
    ]
  },
  {
    id: 'art-balcony-sub1',
    slug: 'trong-cay-ban-cong-huong-tay-chiu-nang-gat',
    categorySlug: 'dich-vu-setup-ban-cong',
    titleVi: 'Giải Pháp Thiết Kế Vườn Thảo Dược Cho Ban Công Hướng Tây Nắng Gắt Tầng Cao',
    titleEn: 'Gardening the Scorching West-Facing Balcony: High-Rise Thermal Survival Strategies',
    subtitleVi: 'Kỹ thuật che chắn nhiệt bức xạ, giữ ẩm đất rễ và chọn bộ cây lá cứng kháng hạn',
    subtitleEn: 'Radiant heat shielding, root thermal insulation, and sclerophyllous drought botanical selection',
    excerptVi: 'Cách biến ban công hướng Tây từ "chảo lửa mùa hè" thành ốc đảo thảo mộc xanh mát rợp bóng. Bí quyết bảo vệ rễ cây không bị luộc chín bởi nhiệt độ bê tông lên tới 48°C.',
    excerptEn: 'Turn heat-scorched West balconies into lush botanical refuges. Essential techniques to insulate root balls from 48°C concrete slab radiation.',
    readTimeMinutes: 8,
    authorName: 'Kts. Nguyễn Hoàng Sơn',
    authorRoleVi: 'Kiến trúc sư Cảnh quan Đô thị Sinh thái',
    authorRoleEn: 'Urban Landscape Architect',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ban công hướng Tây', 'Cây chịu nắng hạn', 'Chống nóng chung cư', 'Vườn thảo mộc'],
    directAnswerSnippetVi: 'Để trồng cây thành công ở ban công hướng Tây nắng gắt: sử dụng chậu kép hoặc chậu composite cách nhiệt dán xốp bạc bên trong thành chậu; phủ lớp mùn vỏ thông dày 3cm trên mặt đất để giảm bốc hơi nước 70%; và chọn bộ cây chịu hạn bản địa gồm đinh lăng nếp, hương thảo, dâm bụt, trâm ổi và xương rồng lê gai.',
    directAnswerSnippetEn: 'To master extreme West-facing balconies: employ double-walled or insulated composite planters lined with reflective insulation to halt thermal conduction; top-dress with a 3cm pine bark mulch layer to curb 70% evaporation; and plant hardy sclerophyllous species like Dinh Lang, Rosemary, Hibiscus, and prickly pear cactus.',
    scientificData: {
      botanicalName: 'Xerophytic & Sclerophyllous Flora',
      optimalTemp: 'Chịu đựng nhiệt độ bề mặt chậu lên tới 45°C',
      keyMetrics: [
        { labelVi: 'Nhiệt độ đất giảm được khi có phủ bổi', labelEn: 'Root Zone Temperature Reduction', value: '-8.5°C', noteVi: 'Nhờ lớp vỏ thông 3cm ngăn nắng trực diện', noteEn: 'Via 3cm mulch thermal buffer' },
        { labelVi: 'Lượng nước tưới tiết kiệm được', labelEn: 'Water Savings', value: '45%', noteVi: 'Giảm bốc hơi bề mặt qua lớp che chắn', noteEn: 'Curbed surface vapor escape' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Bọc lót màng cách nhiệt thành chậu', description: 'Cắt màng xốp bạc cách nhiệt PE dán quanh mặt trong của thành chậu trước khi đổ đất để triệt tiêu nhiệt truyền từ vỏ nhựa vào đất.', duration: '15 phút' },
      { step: 2, title: 'Trộn giá thể tăng tỷ lệ chất giữ nước sinh học', description: 'Tăng 20% mụn dừa và 10% than biochar để tăng khả năng ngậm nước sâu trong lõi mà không gây thối rễ.', duration: '15 phút' },
      { step: 3, title: 'Bố trí cây giàn chắn gió và nắng', description: 'Đặt các chậu đinh lăng cao to hoặc giàn hoa leo chịu nắng (hoa giấy, đậu biếc) ở tuyến ngoài cùng để làm rèm chắn nhiệt cho các cây thân mềm bên trong.', duration: '20 phút' },
      { step: 4, title: 'Phủ bổi bề mặt dày 3cm', description: 'Trải một lớp vỏ thông băm hoặc đá bọt sỏi nhẹ trên bề mặt đất trong chậu.', duration: '10 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Insulate Planter Interior Walls', description: 'Line inner pot perimeters with reflective foil foam before adding soil to interrupt conductive heat transfer.', duration: '15 minutes' },
      { step: 2, title: 'Enrich Media with Bio-Water Reservoirs', description: 'Incorporate 20% washed coir and 10% biochar to enhance micro-pore water holding capacity deep within the root core.', duration: '15 minutes' },
      { step: 3, title: 'Install Outer Living Thermal Buffers', description: 'Position tall Dinh Lang or bougainvillea along the perimeter rail to intercept afternoon radiation.', duration: '20 minutes' },
      { step: 4, title: 'Mulch Soil Surface with 3cm Bark', description: 'Top-dress with shredded pine bark or lightweight clay pebbles to block evaporation.', duration: '10 minutes' }
    ],
    deepContentVi: 'Vấn đề lớn nhất của ban công hướng Tây không phải là cây thiếu nước trên lá, mà là hiện tượng **"nấu chín bầu rễ" (Root Boiling Effect)**. Nhiệt bức xạ từ tường bê tông và sàn gạch có thể đẩy nhiệt độ đất trong chậu nhựa mỏng lên tới 52°C. Ở nhiệt độ này, các chóp rễ tơ hút dinh dưỡng bị teo liệt chỉ trong 2 tiếng, dẫn đến hiện tượng cây chết khát ngay cả khi đất vẫn còn sũng nước.',
    deepContentEn: 'The fatal culprit on West balconies is not foliage dehydration, but the insidious **"Root Boiling Effect"**. Radiated thermal mass from concrete walls and floor slabs can drive soil temperatures inside thin plastic pots past 52°C. At this temperature, active root hairs suffer irreversible thermal shock, causing plants to wilt even with soaked soil.',
    faqsVi: [
      { question: 'Có nên tưới cây vào buổi trưa khi thấy lá héo rũ không?',
      answer: 'TUYỆT ĐỐI KHÔNG. Tưới nước vào buổi trưa nắng gắt sẽ biến nước mát thành nước sôi trong lòng đất, hấp chín toàn bộ hệ rễ ngay tức khắc. Chỉ nên phun sương nhẹ trên tán lá hoặc đợi đến chiều mát sau 17h30 mới tưới đẫm gốc.' }
    ],
    faqsEn: [
      { question: 'Should I water drooping plants during scorching midday sun?',
      answer: 'NEVER water midday during intense sun. Cool water heats rapidly in sun-baked soil, scalding sensitive root hairs instantly. Mist upper air lightly or wait until after 5:30 PM to deep-water root zones.' }
    ],
    relatedArticleSlugs: ['dich-vu-setup-tu-thuoc-ban-cong', 'cong-thuc-tron-dat-trong-rau-ban-cong-3-nam']
  },
  {
    id: 'art-balcony-sub2',
    slug: 'cong-thuc-tron-dat-trong-rau-ban-cong-3-nam',
    categorySlug: 'dich-vu-setup-ban-cong',
    titleVi: 'Công Thức Phối Trộn Đất Sống (Living Soil) Cho Ban Công 3 Năm Không Phải Thay Đất',
    titleEn: 'Urban Living Soil Recipe: 3-Year Zero-Replacement Balcony Growing Media',
    subtitleVi: 'Cân bằng hệ vi sinh bản địa, khoáng chất đá núi lửa và mạng lưới nấm rễ Mycorrhizae',
    subtitleEn: 'Native soil biology balance, volcanic paramagnetics, and mycorrhizal fungal networks',
    excerptVi: 'Chấm dứt nỗi ám ảnh khuân vác hàng chục bao đất nặng nhọc lên chung cư mỗi vụ trồng. Công thức đất sống tái tạo hữu cơ tự nhiên, càng trồng lâu đất càng phì nhiêu màu mỡ.',
    excerptEn: 'Eliminate hauling heavy soil bags up high-rises every season. Discover self-regenerating Living Soil that compounds biological fertility over years of continuous harvests.',
    readTimeMinutes: 9,
    authorName: 'Ks. Đỗ Minh Quân',
    authorRoleVi: 'Kỹ sư Thổ nhưỡng & Dinh dưỡng Đô thị',
    authorRoleEn: 'Urban Soil Science Specialist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Đất sống', 'Living Soil', 'Trộn đất ban công', 'Tái tạo đất tự nhiên'],
    directAnswerSnippetVi: 'Công thức trộn Đất Sống Living Soil chuẩn 3 năm không thay đất gồm tỷ lệ: 35% mùn hữu cơ đã xả chát (mụn dừa + phân trùn quế hoai mục), 35% đá khoáng thông khí siêu nhẹ (đá bọt Pumice + Perlite hạt to), 20% trấu hun nung chậm nguyên hạt, và 10% bột khoáng basalt bổ sung nấm rễ cộng sinh Mycorrhizae.',
    directAnswerSnippetEn: 'The 3-Year Zero-Replacement Living Soil formula: 35% washed organic humus (washed coir + mature vermicompost), 35% lightweight mineral aeration (horticultural pumice + perlite), 20% slow-pyrolyzed biochar rice husks, and 10% paramagnetic basalt rock dust inoculated with endo-mycorrhizal fungi.',
    scientificData: {
      botanicalName: 'Biomimetic Living Soil Ecology',
      phRange: '6.2 - 6.8',
      ecRange: '1.0 - 1.4 mS/cm',
      keyMetrics: [
        { labelVi: 'Độ nén lún sau 36 tháng', labelEn: 'Compaction Degradation after 36mo', value: '< 4.5%', noteVi: 'Khung đá bọt Pumice giữ cấu trúc vĩnh cửu', noteEn: 'Pumice framework maintains macro-pores' },
        { labelVi: 'Mật độ khuẩn lạc vi sinh có ích', labelEn: 'Beneficial CFU Count', value: '> 10^8 CFU/g', noteVi: 'Khuẩn Bacillus subtilis và Trichoderma', noteEn: 'Living Bacillus and Trichoderma strains' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Tạo khung xương khoáng thông khí', description: 'Trộn đều đá Pumice hạt 5-8mm và đá Perlite theo tỷ lệ 1:1. Đây là bộ xương chịu lực vĩnh cửu giúp đất không bao giờ bị dẽ chặt.', duration: '10 phút' },
      { step: 2, title: 'Bổ sung mùn dừa xả chát và phân trùn', description: 'Trộn mụn dừa đã xả sạch tanin cùng phân trùn quế nguyên chất chứa hàng tỷ vi sinh vật sống.', duration: '15 phút' },
      { step: 3, title: 'Kích hoạt nấm rễ cộng sinh Mycorrhizae', description: 'Rắc bột nấm rễ Mycorrhizae và bột đá basalt giàu vi lượng, đảo đều để bào tử nấm phân bố đều khắp khối đất.', duration: '10 phút' },
      { step: 4, title: 'Ủ đất nghỉ 7 ngày trước khi trồng', description: 'Tưới ẩm bằng nước vo gạo ủ chua nhẹ hoặc dịch trà trùn quế, đậy bao tải ẩm để hệ vi sinh bung sợi tơ trắng khắp đất.', duration: '7 ngày' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Build Mineral Aeration Scaffold', description: 'Blend 5-8mm Pumice and coarse Perlite 1:1 to create an unyielding mineral matrix that resists gravitational compaction.', duration: '10 minutes' },
      { step: 2, title: 'Incorporate Humus and Vermicompost', description: 'Integrate pre-washed coco coir and mature vermicompost crawling with native soil microbes.', duration: '15 minutes' },
      { step: 3, title: 'Inoculate with Mycorrhizal Spores', description: 'Dust trace basalt rock flour and mycorrhizal fungi throughout the blend to form root-symbiotic extensions.', duration: '10 minutes' },
      { step: 4, title: 'Biological Curing for 7 Days', description: 'Dampen with worm tea, cover with breathable burlap, and allow beneficial fungal mycelium to colonize the media.', duration: '7 days' }
    ],
    deepContentVi: 'Đất tự nhiên trong rừng nguyên sinh không bao giờ cần ai thay xới hay bón phân hóa học, bởi vì chu trình đất sống được nuôi dưỡng liên tục bởi mạng lưới nấm rễ Mycorrhizae và giun đất. Khi áp dụng nguyên lý Biomimicry (mô phỏng tự nhiên) vào chậu trồng ban công, bạn tạo ra một chu trình tự phục hồi: rễ cây cũ phân hủy thành thức ăn cho lứa cây mới, giúp bạn tiết kiệm hàng triệu đồng mua đất mỗi năm.',
    deepContentEn: 'Virgin forest soils never require human tilling or chemical fertilizer inputs, sustained autonomously by mycorrhizal fungal networks and soil fauna. Applying biomimicry to balcony containers creates a self-healing rhizosphere: spent roots are converted into humus by microbes, permanently eliminating the chore of replacing depleted dirt.',
    faqsVi: [
      { question: 'Sau mỗi vụ thu hoạch rau thì bảo dưỡng đất sống như thế nào?',
      answer: 'Cực kỳ đơn giản: Khi thu hoạch rau, chỉ cắt sát gốc để lại toàn bộ rễ con trong đất. Xới nhẹ bề mặt 2cm, rải thêm một nắm phân trùn quế mới và một chút trấu hun rồi gieo hạt hoặc trồng cây giống vụ mới ngay lập tức.' }
    ],
    faqsEn: [
      { question: 'How do I rejuvenate Living Soil between harvest cycles?',
      answer: 'Cut spent plants at soil level, leaving fine root networks intact inside the soil. Lightly aerate the top 2cm, top-dress with a handful of fresh worm castings and biochar, and plant the next crop immediately.' }
    ],
    relatedArticleSlugs: ['dich-vu-setup-tu-thuoc-ban-cong', 'he-thong-tuoi-nho-giot-ban-cong-khong-can-bom']
  },
  {
    id: 'art-balcony-sub3',
    slug: 'he-thong-tuoi-nho-giot-ban-cong-khong-can-bom',
    categorySlug: 'dich-vu-setup-ban-cong',
    titleVi: 'Tự Lắp Hệ Thống Tưới Nhỏ Giọt Ban Công Tự Chảy Trọng Lực: Không Cần Bơm Điện',
    titleEn: 'Gravity-Fed Balcony Drip Irrigation: Zero-Electricity Autonomous Watering',
    subtitleVi: 'Ứng dụng cột áp tĩnh tự nhiên, ống bù áp vi lưu lượng và van phao cơ chống tràn',
    subtitleEn: 'Harnessing static water head, micro-emitter pressure, and mechanical float safety valves',
    excerptVi: 'Hướng dẫn tự chế hệ thống tưới nhỏ giọt tự động cho ban công bằng bình nước kê cao. Hoạt động bền bỉ, không tốn 1 xu tiền điện, không lo chập cháy và giữ ẩm hoàn hảo suốt kỳ nghỉ du lịch 10 ngày.',
    excerptEn: 'Build a failsafe gravity-fed drip watering network powered solely by elevation head. Zero electricity costs, zero electrical hazard risks, and reliable hydration during 10-day vacations.',
    readTimeMinutes: 8,
    authorName: 'Ks. Trần Anh Tuấn',
    authorRoleVi: 'Chuyên gia Nông nghiệp Đô thị & Thủy lực',
    authorRoleEn: 'Urban Agriculture & Hydraulic Specialist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Tưới nhỏ giọt', 'Tưới tự chảy trọng lực', 'Ban công tự động', 'Tưới tiết kiệm nước'],
    directAnswerSnippetVi: 'Hệ thống tưới nhỏ giọt trọng lực ban công không dùng bơm hoạt động dựa trên chênh lệch độ cao: đặt bình chứa nước 20 lít cao hơn mặt chậu từ 0.8 đến 1.2 mét để tạo áp suất tĩnh 0.08-0.12 bar; dẫn nước qua ống chính PE 8mm và dùng các đầu tưới nhỏ giọt dạng xoáy ren điều chỉnh được lưu lượng từ 1-2 lít/giờ vào từng gốc cây.',
    directAnswerSnippetEn: 'Gravity-fed balcony drip irrigation functions via elevation head difference: elevate a 20-liter tank 0.8 to 1.2 meters above planters to generate 0.08-0.12 bar static pressure; route water through an 8mm PE main line and deploy adjustable spiral micro-drippers delivering 1-2 L/hr directly to each plant root zone.',
    scientificData: {
      botanicalName: 'Hydrostatic Gravity Micro-Irrigation',
      optimalTemp: 'Nhiệt độ nước tưới lý tưởng: 20°C - 28°C',
      keyMetrics: [
        { labelVi: 'Cột áp tĩnh cần thiết', labelEn: 'Minimum Static Water Head', value: '0.8 - 1.2 m', noteVi: 'Tương đương 0.08 - 0.12 bar áp suất tự nhiên', noteEn: 'Generates 0.08-0.12 bar natural head' },
        { labelVi: 'Tiêu thụ điện năng hàng tháng', labelEn: 'Monthly Energy Consumption', value: '0 kWh', noteVi: '100% tự chảy theo định luật vạn vật hấp dẫn', noteEn: '100% powered by natural gravity' },
        { labelVi: 'Thời gian tự hành bình 20L', labelEn: 'Autonomous Duration (20L Tank)', value: '7 - 10 ngày', noteVi: 'Dành cho cụm 8 chậu thảo dược vừa', noteEn: 'Sustains 8 medium herb pots' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Kê cao bình chứa nước 20L', description: 'Đặt bình nước 20L (có van xả đáy) trên kệ cao 1m so với mặt chậu cây. Lắp một lưới lọc inox mini ở đầu ra để ngăn cặn bẩn làm tắc đầu béc.', duration: '15 phút' },
      { step: 2, title: 'Đi đường ống chính PE 8mm dọc lan can', description: 'Rải ống PE 8mm mềm dẻo dọc theo mép tường hoặc gờ lan can, cố định bằng dây rút nhựa.', duration: '20 phút' },
      { step: 3, title: 'Chích nhánh ống PE 4/7mm tới từng gốc chậu', description: 'Dùng dùi bấm lỗ dùi vào thân ống 8mm, cắm đầu nối chữ T hoặc khởi thủy 4/7mm dẫn ống nhỏ vào tận gốc cây.', duration: '25 phút' },
      { step: 4, title: 'Gắn que tưới cắm gốc và hiệu chỉnh ren', description: 'Cắm que giữ ống sát cổ rễ, vặn núm điều chỉnh sao cho nước nhỏ đều đặn 1 giọt mỗi 2-3 giây.', duration: '15 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Elevate 20L Reservoir Tank', description: 'Position a 20L container on a 1-meter high stand. Fit an inline fine-mesh stainless filter at the outlet to trap debris.', duration: '15 minutes' },
      { step: 2, title: 'Lay 8mm PE Main Supply Tubing', description: 'Run durable 8mm PE tubing along the balcony baseboard or railing, securing with nylon zip ties.', duration: '20 minutes' },
      { step: 3, title: 'Punch Barbed Connectors for 4/7mm Sub-Lines', description: 'Use a handheld punch tool to insert barbed adapters, directing flexible 4/7mm micro-tubing to individual root zones.', duration: '25 minutes' },
      { step: 4, title: 'Anchor Stake Drippers and Calibrate Flow', description: 'Anchor ground stakes near plant stems and turn the threaded cap until dripping maintains 1 drop every 2-3 seconds.', duration: '15 minutes' }
    ],
    deepContentVi: 'Nhiều người e ngại lắp hệ thống tưới tự động trên ban công chung cư vì sợ chập điện máy bơm gây hỏa hoạn hoặc rò rỉ áp lực cao làm tràn ngập nhà khi vắng nhà. Hệ thống tưới trọng lực hoàn toàn loại bỏ những rủi ro này: do hoạt động ở áp suất thấp tự nhiên, các mối nối không bao giờ bị bục nổ áp lực, và thể tích nước tối đa luôn giới hạn trong bình chứa 20L.',
    deepContentEn: 'Urban apartment owners often hesitate to install pressurized drip systems out of fire fears from cheap pumps or catastrophic hose bursts during extended trips. A gravity system eliminates both failure modes: low hydrostatic pressure prevents blowout leaks, and water volume is physically bounded by the 20L tank.',
    faqsVi: [
      { question: 'Có thể hòa tan phân bón trùn quế vào bình chứa này để tưới cây không?',
      answer: 'ĐƯỢC, nhưng dung dịch phải được lọc qua túi vải lọc mắt siêu mịn 100 mesh trước khi đổ vào bình để loại bỏ hoàn toàn hạt cặn lơ lửng, tránh làm tắc các đầu béc tưới vi mô.' }
    ],
    faqsEn: [
      { question: 'Can I dissolve organic worm tea fertilizer directly into the reservoir?',
      answer: 'YES, provided the tea is strained through a 100-mesh fine cloth filter prior to pouring to eliminate suspended solids that could foul micro-dripper orifices.' }
    ],
    relatedArticleSlugs: ['dich-vu-setup-tu-thuoc-ban-cong', 'trong-cay-ban-cong-huong-tay-chiu-nang-gat']
  }
];
