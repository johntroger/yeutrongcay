import { ArticleFullContent } from '../types';

export const MICROGREENS_ARTICLES: ArticleFullContent[] = [
  {
    id: 'art-microgreens-pillar',
    slug: 'rau-mam-microgreens-nam-an-do-thi',
    categorySlug: 'canh-tac-sieu-toc',
    titleVi: 'Nông Nghiệp Vi Mô Siêu Cao Sản: Khởi Nghiệp Rau Mầm Dinh Dưỡng & Phôi Nấm Vòng Quay 7 Ngày',
    titleEn: 'Urban Micro-Farming: Commercial Broccoli Microgreens & Gourmet Mushroom Shelf Cycles',
    subtitleVi: 'Quy trình gieo hạt mật độ cao không giá thể, nồng độ Sulforaphane gấp 50 lần và lịch xoay vòng',
    subtitleEn: 'High-density soilless seeding, 50x concentrated sulforaphane, and rolling harvest schedules',
    excerptVi: 'Mô hình nông nghiệp đô thị có tốc độ thu hồi vốn nhanh nhất hiện nay. Tối ưu hóa 1m² kệ ban công để thu hoạch 4-6kg rau mầm siêu sạch và nấm sò tươi ngon mỗi tuần.',
    excerptEn: 'The fastest ROI urban farming model today. Optimize 1sqm rack real-estate to yield 4-6kg pristine superfood microgreens and oyster mushrooms weekly on a rolling schedule.',
    readTimeMinutes: 12,
    authorName: 'ThS. Hoàng Thu Thủy',
    authorRoleVi: 'Chuyên gia Công nghệ Sinh học Thực phẩm',
    authorRoleEn: 'Food Biotechnology Specialist',
    lastUpdated: '2026-11-08',
    isPillar: true,
    interactiveEngineId: 'fast-cycle-batch',
    coverImage: 'https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=1200&q=80',
    tags: ['Rau mầm', 'Microgreens', 'Nấm sò ban công', 'Sulforaphane', 'Vòng quay 7 ngày'],
    directAnswerSnippetVi: 'Mô hình canh tác vi mô xoay vòng 7 ngày đạt năng suất 1.2kg rau mầm/khay 1020 bằng kỹ thuật 3 ngày ủ tối ép tạ 2kg (Blackout + Weighting) để kích thích thân mầm vươn dài đồng đều, kết hợp 4 ngày chiếu sáng quang hợp tự nhiên hoặc đèn LED 6500K. Treo xen kẽ 20 phôi nấm sò tạo độ ẩm đối lưu, mang lại dòng tiền tươi đều đặn hàng tuần.',
    directAnswerSnippetEn: 'A rolling 7-day microgreens system achieves 1.2kg per 1020 tray via a 3-day weighted blackout protocol (2kg press) that forces uniform hypocotyl elongation, followed by 4 days under diffuse daylight or 6500K LEDs. Intercropping with 20 suspended oyster mushroom fruiting blocks balances humidity, generating continuous weekly cashflow.',
    scientificData: {
      botanicalName: 'Brassica oleracea var. italica & Pleurotus ostreatus',
      family: 'Brassicaceae & Pleurotaceae',
      optimalTemp: '20°C - 26°C',
      optimalHumidity: '65% - 75%',
      keyMetrics: [
        { labelVi: 'Hàm lượng Glucoraphanin / Sulforaphane', labelEn: 'Sulforaphane Precursor Density', value: 'Gấp 20 - 50 lần', noteVi: 'So sánh với cây súp lơ xanh trưởng thành', noteEn: 'Compared to mature head broccoli' },
        { labelVi: 'Chu kỳ gieo đến thu hoạch', labelEn: 'Seed-to-Harvest Cycle', value: '7 ngày', noteVi: 'Thu hoạch ở giai đoạn 2 lá mầm mở rộng', noteEn: 'Harvested at cotyledon expansion' },
        { labelVi: 'Sản lượng trên mỗi khay 1020', labelEn: 'Yield per 1020 Flat', value: '450 - 550 g', noteVi: 'Khối lượng rau mầm tươi cắt gốc', noteEn: 'Fresh clipped shoots weight' },
        { labelVi: 'Doanh thu trung bình/tháng (Kệ 4 tầng)', labelEn: 'Monthly Revenue Potential (4 Shelves)', value: '3.6 - 5.2 triệu đ', noteVi: 'Cung cấp cho 15 hộ gia đình trong chung cư', noteEn: 'Supplying 15 neighbor households' }
      ],
      comparisonTable: {
        headersVi: ['Tiêu chuẩn chất lượng', 'Rau mua ngoài chợ / Siêu thị', 'Rau Mầm Siêu Dinh Dưỡng Tự Trồng'],
        headersEn: ['Attribute', 'Store-Bought Produce', 'Homegrown Superfood Microgreens'],
        rowsVi: [
          ['Độ tươi ngon', 'Thu hoạch từ 3-5 ngày trước, héo mất chất', 'Cắt tại vườn trước bữa ăn 15 phút, sống 100%'],
          ['Dư lượng thuốc BVTV', 'Nguy cơ tồn dư thuốc kích thích tăng trưởng', 'Cam kết 0% hóa chất, giá thể xơ dừa tinh khiết'],
          ['Mật độ chất chống oxy hóa', 'Bị suy giảm 40-60% sau bảo quản lạnh', 'Đỉnh điểm sinh học, enzyme tiêu hóa dồi dào'],
          ['Chi phí / Đĩa rau tươi', '30.000 - 45.000 đ/hộp nhỏ', 'Chỉ 8.000 đ/đĩa đầy ắp']
        ],
        rowsEn: [
          ['Freshness Index', 'Harvested 3-5 days prior, degraded vitamins', 'Harvested 15 mins before meals, 100% vital'],
          ['Chemical Residue Risk', 'Synthetic pesticide / nitrate exposure', 'Zero pesticides, grown on pure sterile media'],
          ['Antioxidant Bioavailability', '40-60% oxidation loss in cold storage transit', 'Peak enzymatic vitality, maximized bioavailability'],
          ['Cost per Fresh Serving', '$1.50 - $2.50 per small plastic clamshell', '$0.35 per overflowing gourmet plate']
        ]
      }
    },
    sopStepsVi: [
      {
        step: 1,
        title: 'Ngâm và kích hoạt hạt giống trong nước ấm 2 sôi 3 lạnh',
        description: 'Cân đúng 30g hạt giống súp lơ xanh chuyên dụng (không xử lý hóa chất bảo quản). Ngâm trong nước ấm 45-50°C trong 4-6 tiếng để hạt hút no nước và phá vỡ trạng thái ngủ.',
        duration: '6 giờ',
        proTip: 'Rửa sạch nhớt và vớt bỏ các hạt lép nổi trên mặt nước.'
      },
      {
        step: 2,
        title: 'Rải giá thể xơ dừa mỏng 2cm và gieo mật độ cao',
        description: 'Trải một lớp mụn dừa xả chát ẩm mịn dày 2cm vào khay trồng có lỗ thoát nước. Rải hạt đều tăm tắp khắp mặt khay, tránh để hạt chồng chất lên nhau.',
        duration: '15 phút'
      },
      {
        step: 3,
        title: 'Quy trình ủ tối và ép tạ 3 ngày (Weighted Blackout)',
        description: 'Tưới phun sương đẫm hạt, úp một khay khác lên trên và đặt một viên gạch hoặc tạ 2kg đè lên. Quá trình này kích thích rễ cắm sâu xuống đáy và thân mầm vươn cao mập mạp đồng đều.',
        duration: '3 ngày',
        caution: 'Kiểm tra độ ẩm mỗi 24h, phun sương nhẹ nếu thấy mặt khay khô ráo.'
      },
      {
        step: 4,
        title: 'Mở vòm đón sáng quang hợp 4 ngày và thu hoạch',
        description: 'Sau ngày thứ 3, dỡ bỏ tạ ép và đưa khay ra nơi có ánh sáng tán xạ hoặc bật đèn LED 6500K. Lá mầm sẽ chuyển từ màu vàng sang màu xanh lục thẫm chỉ sau 6 tiếng. Thu hoạch vào sáng ngày thứ 7 bằng kéo sắc.',
        duration: '4 ngày'
      }
    ],
    sopStepsEn: [
      {
        step: 1,
        title: 'Pre-Soak & Prime Seeds in 45°C Warm Water Bath',
        description: 'Weigh 30g untreated broccoli seed. Soak in 45°C water for 4-6 hours to break dormancy and hydrate seed embryos evenly.',
        duration: '6 hours',
        proTip: 'Skim off hollow floating seeds and rinse away surface mucilage.'
      },
      {
        step: 2,
        title: 'Spread 2cm Washed Coir Bed & Dense Seeding',
        description: 'Spread a 2cm layer of damp, washed coir into a perforated flat tray. Broadcast seeds uniformly without clumping.',
        duration: '15 minutes'
      },
      {
        step: 3,
        title: '3-Day Weighted Blackout Regimen (2kg Press)',
        description: 'Mist thoroughly, stack an inverted empty tray on top, and weight with a 2kg block. This forces uniform rooting downward and thick hypocotyl stems upward.',
        duration: '3 days',
        caution: 'Check moisture daily; mist lightly if surface appears dry.'
      },
      {
        step: 4,
        title: 'Daylight Green-Up for 4 Days & Clean Shear Harvest',
        description: 'Uncover on Day 3 under bright indirect sun or 6500K grow lights. Yellow cotyledons shift to deep chlorophyll emerald within 6 hours. Clip cleanly at substrate level on Day 7.',
        duration: '4 days'
      }
    ],
    deepContentVi: `
### Bí Mật Của Sulforaphane: Vua Của Các Hợp Chất Chống Lão Hóa Và Ung Thư

Nghiên cứu đột phá từ Đại học Y khoa Johns Hopkins (Mỹ) chứng minh: **Mầm súp lơ xanh 7 ngày tuổi chứa hàm lượng Glucoraphanin (tiền chất tạo ra Sulforaphane) cao gấp 20 đến 50 lần so với cây súp lơ xanh trưởng thành**.

Khi bạn nhai mầm súp lơ xanh tươi, enzym *Myrosinase* sẽ kích hoạt chuyển hóa Glucoraphanin thành **Sulforaphane** hoạt tính:
* Kích hoạt con đường Nrf2 – hệ thống phòng thủ chống oxy hóa mạnh mẽ nhất của tế bào con người.
* Hỗ trợ gan đào thải độc tố môi trường, bụi mịn PM2.5 và kim loại nặng.
* Kháng viêm tế bào mạnh mẽ, tăng cường miễn dịch cho trẻ nhỏ và người cao tuổi.

Chính vì vậy, mỗi hộp rau mầm súp lơ xanh tươi 150g bán tại các chung cư cao cấp có thể đạt mức giá 35.000 - 50.000 VNĐ mà luôn trong tình trạng "cháy hàng"!
`,
    deepContentEn: `
### The Science of Sulforaphane: Nature’s Premier Cytoprotective Phyto-Compound

Pioneering research from Johns Hopkins University revealed that **7-day-old broccoli sprouts contain 20 to 50 times higher concentrations of glucoraphanin (the glucosinolate precursor to sulforaphane) than mature broccoli heads**.

Chewing fresh raw broccoli shoots releases the plant enzyme *myrosinase*, converting glucoraphanin into bioactive **Sulforaphane**:
* Upregulates the intracellular Nrf2 pathway—human biology’s most potent antioxidant defense.
* Accelerates phase-2 liver detoxification of environmental pollutants and airborne PM2.5 particulate toxins.
* Dampens chronic inflammatory cascades, conferring remarkable resilience to toddlers and seniors.

Consequently, fresh 150g microgreen punnets command premium retail prices (\$2.00 - \$3.00) with rabid local demand in high-density urban residential towers!
`,
    faqsVi: [
      {
        question: 'Rau mầm có thể ăn sống trực tiếp được không hay phải nấu chín?',
        answer: 'NÊN ĂN SỐNG hoặc xay sinh tố tươi. Nhiệt độ nấu nướng trên 60°C sẽ phá hủy hoàn toàn enzym Myrosinase quý giá, làm mất khả năng tổng hợp chất chống ung thư Sulforaphane. Chỉ cần rửa sơ qua nước lọc sạch là có thể trộn salad hoặc kẹp bánh mì ăn ngay.'
      },
      {
        question: 'Làm sao phân biệt giữa nấm mốc trắng có hại và lông tơ rễ lành tính của mầm?',
        answer: 'Rất nhiều người nhầm lông hút của rễ mầm với nấm mốc! Lông hút rễ (Root hairs) là những sợi lông tơ trắng mịn mọc đều đặn quanh thân rễ con, khi xịt nước vào chúng sẽ xẹp áp vào thân rễ ngay lập tức. Còn nấm mốc có dạng mạng nhện bùi nhùi, lơ lửng trên không khí và bốc mùi chua hôi.'
      }
    ],
    faqsEn: [
      {
        question: 'Should broccoli microgreens be consumed raw or cooked?',
        answer: 'Consume RAW in salads or cold-pressed juices. Cooking temperatures exceeding 60°C deactivate the delicate heat-sensitive myrosinase enzyme, halting the enzymatic conversion to therapeutic sulforaphane. A gentle rinse is all that is needed.'
      },
      {
        question: 'How do I differentiate between harmful white mold and harmless root hairs?',
        answer: 'Root hairs form a uniform, silky white halo radiating symmetrically along seedling taproots; when sprayed with water, they instantly collapse flat. Pathogenic mold resembles chaotic spiderwebs suspended between stems, accompanied by an acrid sour smell.'
      }
    ],
    equipmentBOM: [
      { itemVi: 'Khay ươm mầm kích thước tiêu chuẩn 1020 không đục lỗ và có lỗ (cặp 4 bộ)', itemEn: 'Standard 1020 microgreen shallow nesting trays (4 sets)', estCostVnd: 120000, whereToBuyVi: 'Cửa hàng khay nhựa nông nghiệp', whereToBuyEn: 'Agricultural plastic suppliers' },
      { itemVi: 'Gói hạt giống súp lơ xanh nhập khẩu chất lượng cao (500g)', itemEn: '500g untreated non-GMO broccoli sprouting seed bag', estCostVnd: 140000, whereToBuyVi: 'Các công ty hạt giống Trang Nông / Rạng Đông', whereToBuyEn: 'Certified seed distributors' },
      { itemVi: 'Bịch phôi nấm sò trắng / xám đã ủ tơ kín trắng đáy (5 bịch)', itemEn: 'Fully colonized white oyster mushroom fruiting blocks (5 pcs)', estCostVnd: 75000, whereToBuyVi: 'Trang trại nấm sạch địa phương hoặc Shopee', whereToBuyEn: 'Local mushroom farm' },
      { itemVi: 'Bình xịt phun sương áp suất cầm tay 2 lít béc đồng siêu mịn', itemEn: '2L handheld brass-nozzle fine pressure sprayer', estCostVnd: 65000, whereToBuyVi: 'Cửa hàng kim khí điện nước', whereToBuyEn: 'Home depot' }
    ],
    urbanSafetyNoticeVi: 'AN TOÀN HẠT GIỐNG: Tuyệt đối không dùng hạt giống rau súp lơ thương phẩm thông thường (loại có nhuộm màu đỏ hoặc xanh lá ở vỏ) vì chúng đã được tẩm thuốc diệt nấm hóa học. CHỈ DÙNG HẠT GIỐNG CHUYÊN DỤNG CHO ĂN MẦM (Sprouting Seeds).',
    urbanSafetyNoticeEn: 'SEED TOXICITY WARNING: Never use conventional agricultural seeds coated with pink or emerald chemical fungicides meant for field crops. EXCLUSIVELY PURCHASE CERTIFIED SPROUTING SEEDS guaranteed free of post-harvest pesticide coatings.',
    relatedArticleSlugs: [
      'cach-trong-rau-mam-sup-lo-xanh-sulforaphane',
      'trong-nam-so-nam-bao-ngu-ke-ban-cong',
      'kinh-doanh-rau-mam-cho-be-an-dam-ban-kinh-2km'
    ]
  },
  {
    id: 'art-microgreens-sub1',
    slug: 'cach-trong-rau-mam-sup-lo-xanh-sulforaphane',
    categorySlug: 'canh-tac-sieu-toc',
    titleVi: 'Quy Trình Trồng Mầm Súp Lơ Xanh Siêu Sulforaphane Thu Hoạch Chuẩn 7 Ngày',
    titleEn: '7-Day High-Sulforaphane Broccoli Sprout SOP: The Molecular Nutrition Guide',
    subtitleVi: 'Kỹ thuật ủ tối kích thích chồi hypocotyl và phương pháp thu hoạch bằng dao bén',
    subtitleEn: 'Darkness hypocotyl triggering and clean-cut shearing techniques',
    excerptVi: 'Chi tiết từng giờ trong chu kỳ 7 ngày biến 30g hạt giống súp lơ thành nửa ký rau mầm dinh dưỡng thượng hạng. Mẹo giữ mầm giòn rụm không bị dập úng.',
    excerptEn: 'Hour-by-hour timeline turning 30g of tiny seeds into 500g of crisp, nutrient-dense broccoli microgreens. Master clean harvesting and moisture control.',
    readTimeMinutes: 7,
    authorName: 'ThS. Hoàng Thu Thủy',
    authorRoleVi: 'Chuyên gia Công nghệ Sinh học Thực phẩm',
    authorRoleEn: 'Food Biotechnology Specialist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    tags: ['Mầm súp lơ xanh', 'Sulforaphane', 'Trồng rau mầm 7 ngày'],
    directAnswerSnippetVi: 'Quy trình chuẩn 7 ngày trồng mầm súp lơ xanh: Ngâm hạt 4 tiếng ở 45°C; gieo đều mật độ 30g/khay trên lớp xơ dừa ẩm 2cm; đè tạ 2kg trong bóng tối 72 giờ đầu để rễ cắm sâu; ngày thứ 4 cho ra ánh sáng tán xạ phun sương 2 lần/ngày; cắt sát gốc vào sáng sớm ngày thứ 7.',
    directAnswerSnippetEn: 'Standard 7-day broccoli sprout SOP: Soak seeds 4 hours at 45°C; seed densely at 30g/tray over 2cm moist coir; apply 2kg weight in total darkness for the first 72 hours; introduce bright indirect light on Day 4 misting twice daily; shear cleanly at base on morning of Day 7.',
    scientificData: {
      botanicalName: 'Brassica oleracea var. italica',
      optimalTemp: '22°C - 25°C',
      keyMetrics: [
        { labelVi: 'Thời gian thu hoạch tối ưu', labelEn: 'Optimal Harvest Window', value: 'Ngày 7 (sáng sớm)', noteVi: 'Khi 2 lá mầm bung to tròn màu xanh ngọc', noteEn: 'When cotyledons open emerald green' },
        { labelVi: 'Hao hụt khối lượng khi bảo quản mát', labelEn: 'Refrigerated Shelf Shrinkage', value: '< 2%', noteVi: 'Khi đóng hộp lót khăn giấy hút ẩm', noteEn: 'When packed with moisture blotting sheet' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Ngâm và gieo hạt', description: 'Ngâm hạt 4 tiếng, rải đều trên khay xơ dừa ẩm đã san phẳng.', duration: '4 giờ' },
      { step: 2, title: 'Ủ tối ép tạ kích rễ', description: 'Đậy nắp ép tạ 2kg để nơi kín gió trong 3 ngày đầu.', duration: '3 ngày' },
      { step: 3, title: 'Tắm nắng quang hợp', description: 'Dỡ tạ, đưa khay ra ban công đón sáng, xịt sương hạt mịn mỗi sáng chiều.', duration: '3 ngày' },
      { step: 4, title: 'Cắt tỉa thu hoạch', description: 'Dùng kéo sắc cắt cách mặt giá thể 5mm, cho vào hộp kín trữ lạnh.', duration: '15 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Soak & Sow', description: 'Soak seeds 4 hours, broadcasting over leveled moist coco coir.', duration: '4 hours' },
      { step: 2, title: 'Weighted Blackout Root Stacking', description: 'Stack with 2kg weight in darkness for the first 3 days.', duration: '3 days' },
      { step: 3, title: 'Diffuse Light Photosynthesis', description: 'Unstack, expose to indirect light, misting morning and evening.', duration: '3 days' },
      { step: 4, title: 'Clean Shear Clipping', description: 'Clip shoots 5mm above substrate with sterile scissors and pack chilled.', duration: '15 minutes' }
    ],
    deepContentVi: 'Mầm súp lơ xanh là một trong những loại thực phẩm có mật độ dinh dưỡng đậm đặc nhất hành tinh. Ăn 50g mầm súp lơ xanh mỗi ngày cung cấp lượng chất chống oxy hóa tương đương với việc ăn gần 1.5kg súp lơ xanh nấu chín, giúp bảo vệ tế bào khỏi lão hóa sớm và tăng cường sinh lực rõ rệt.',
    deepContentEn: 'Broccoli microgreens rank among the most nutrient-dense superfoods known to science. A modest 50g serving delivers cellular antioxidant protection equivalent to eating over 1.5kg of cooked adult broccoli crowns, defending cellular DNA from oxidative stress.',
    faqsVi: [
      { question: 'Có thể tái sử dụng lớp giá thể xơ dừa để gieo đợt rau mầm mới được không?',
      answer: 'KHÔNG NÊN gieo mầm tiếp ngay trên lớp giá thể cũ vì rễ mầm cũ còn sót lại sẽ bị phân hủy gây thối mầm mới. Hãy gom lớp xơ dừa đầy rễ này cho vào thùng nuôi trùn quế ở Chuyên mục 4 để trùn ăn, biến thành phân trùn quế cao cấp!' }
    ],
    faqsEn: [
      { question: 'Can I reuse the coir mat for another microgreen batch?',
      answer: 'Not directly for microgreens, as decaying leftover rootlets rot new seedlings. Instead, dump spent root mats into your vermicomposting worm bin (Category 4) to produce rich castings!' }
    ],
    relatedArticleSlugs: ['rau-mam-microgreens-nam-an-do-thi', 'kinh-doanh-rau-mam-cho-be-an-dam-ban-kinh-2km']
  },
  {
    id: 'art-microgreens-sub2',
    slug: 'trong-nam-so-nam-bao-ngu-ke-ban-cong',
    categorySlug: 'canh-tac-sieu-toc',
    titleVi: 'Kinh Nghiệm Treo 20 Bịch Phôi Nấm Sò Tại Ban Công: Thu Hoạch 2kg Nấm Tươi Mỗi Tuần',
    titleEn: 'Urban Oyster Mushroom Cultivation: Harvesting 2kg Fresh Mushrooms Weekly on Balconies',
    subtitleVi: 'Tận dụng góc râm mát, kỹ thuật rạch phôi đón quả thể và xịt ẩm vi bọt',
    subtitleEn: 'Capitalizing on shaded microclimates, fruiting bag slits, and micro-droplet misting',
    excerptVi: 'Cách biến góc chết ẩm tối ở ban công thành trang trại nấm sò mini. Phôi nấm sinh trưởng thần tốc, bung tán xòe quạt trắng ngần thơm ngon chỉ sau 5 ngày mở nắp.',
    excerptEn: 'Convert dead shaded balcony niches into productive mini oyster mushroom farms. Watch mushroom pins explode into broad succulent clusters in just 5 days.',
    readTimeMinutes: 8,
    authorName: 'Ks. Đỗ Minh Quân',
    authorRoleVi: 'Kỹ sư Vi nấm & Lâm sản Đô thị',
    authorRoleEn: 'Urban Mycological Specialist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    tags: ['Trồng nấm sò', 'Nấm bào ngư', 'Nấm ban công', 'Nông nghiệp đô thị'],
    directAnswerSnippetVi: 'Kỹ thuật nuôi nấm sò ban công đạt 2kg/tuần: treo 20 bịch phôi đã ăn trắng tơ ở góc ban công kín gió và có ánh sáng tán xạ nhẹ; dùng dao trổ rạch 4 đường so le dài 3cm quanh thân bịch; xịt sương giữ ẩm không khí 80-85% ngày 3 lần; hái trọn chùm nấm khi mép mũ nấm bắt đầu phẳng ra.',
    directAnswerSnippetEn: 'Balcony oyster mushroom technique yielding 2kg/week: suspend 20 fully colonized substrate bags in a wind-sheltered niche with indirect light; make four 3cm staggered diagonal slits on each bag; mist surrounding air 3 times daily to keep humidity at 80-85%; harvest entire clusters when cap rims begin flattening.',
    scientificData: {
      botanicalName: 'Pleurotus ostreatus (Jacq.) P. Kumm.',
      family: 'Pleurotaceae',
      optimalTemp: '22°C - 28°C',
      optimalHumidity: '80% - 90%',
      keyMetrics: [
        { labelVi: 'Thời gian bung nấm từ lúc rạch', labelEn: 'Pinhead to Harvest Duration', value: '4 - 5 ngày', noteVi: 'Tốc độ tăng trưởng gấp đôi mỗi 24h', noteEn: 'Biomass doubles every 24 hours' },
        { labelVi: 'Số đợt thu hoạch/bịch phôi', labelEn: 'Flushes per Fruiting Block', value: '4 - 5 lứa', noteVi: 'Cách nhau 7-10 ngày mỗi lứa', noteEn: 'Spaced 7-10 days between flushes' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Treo phôi dây dù dạng chuỗi hạt', description: 'Treo các bịch phôi nẹp dây dù dọc thanh kệ, cách nhau 15cm để có không gian xòe tán.', duration: '20 phút' },
      { step: 2, title: 'Rạch vết mở đón quả thể', description: 'Rạch 4 vết chéo góc 45 độ dài 3cm so le nhau quanh bọc nylon bằng dao trổ mới khử trùng.', duration: '10 phút' },
      { step: 3, title: 'Phun sương tạo ẩm đối lưu', description: 'Xịt sương mịn lên tường và không khí xung quanh bịch nấm ngày 3 cữ, không xịt đẫm trực tiếp vào vết rạch gây úng.', duration: '5 phút' },
      { step: 4, title: 'Thu hoạch nhổ trọn gốc cụm', description: 'Dùng tay nắm sát gốc chùm nấm, lắc nhẹ và kéo dứt khoát để không để sót gốc nấm thối bên trong bịch.', duration: '10 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Suspend Fruiting Blocks Vertically', description: 'String bags vertically along rack frames spaced 15cm apart to allow generous canopy expansion.', duration: '20 minutes' },
      { step: 2, title: 'Score Slits for Fruiting Primordia', description: 'Slice four 3cm staggered diagonal incisions through the plastic using a sterile hobby knife.', duration: '10 minutes' },
      { step: 3, title: 'Ambient Micro-Misting', description: 'Mist ambient surroundings and backdrop walls 3 times daily, avoiding direct water puddles inside cuts.', duration: '5 minutes' },
      { step: 4, title: 'Twist-and-Pull Cluster Harvest', description: 'Grasp the base of mushroom clusters firmly, twist, and pull cleanly to avoid leaving decaying tissue inside.', duration: '10 minutes' }
    ],
    deepContentVi: 'Nấm sò là loài vi nấm hoại sinh cực kỳ dễ tính, có khả năng phân giải cellulose trong mùn cưa cao su để tổng hợp thành các chuỗi protein thực vật thơm ngon giàu acid amin thiết yếu. Ban công chung cư có gió nhẹ và bóng râm chính là môi trường lý tưởng để kích hoạt quá trình trao đổi khí $O_2/CO_2$, giúp chân nấm ngắn lại và tai nấm dày dặn giòn ngọt.',
    deepContentEn: 'Oyster mushrooms are vigorous saprophytic fungi that convert wood cellulose into savory, protein-dense culinary clusters. High-rise balcony airflow provides ideal gas exchange ($O_2/CO_2$), promoting thick caps and compact succulent stems prized in gourmet cooking.',
    faqsVi: [
      { question: 'Sau khi thu hoạch đợt 1 thì làm sao để nấm ra tiếp đợt 2?',
      answer: 'Sau khi hái hết nấm, ngưng tưới 3 ngày để vết rạch khô ráo và sợi tơ nấm hồi phục. Sau đó dùng tay ấn nhẹ quanh bịch và bắt đầu phun sương trở lại. Sau 7-10 ngày, mẻ mầm nấm mới sẽ tiếp tục nhú ra từ các vết rạch.' }
    ],
    faqsEn: [
      { question: 'How do I trigger subsequent flushes after the first harvest?',
      answer: 'Cease watering for 3 days post-harvest to allow incision sites to dry and mycelium to recuperate. Then massage blocks gently and resume daily ambient misting. Fresh pins will emerge in 7-10 days.' }
    ],
    relatedArticleSlugs: ['rau-mam-microgreens-nam-an-do-thi', 'kinh-doanh-rau-mam-cho-be-an-dam-ban-kinh-2km']
  },
  {
    id: 'art-microgreens-sub3',
    slug: 'kinh-doanh-rau-mam-cho-be-an-dam-ban-kinh-2km',
    categorySlug: 'canh-tac-sieu-toc',
    titleVi: 'Kế Hoạch Khởi Nghiệp Rau Mầm Ăn Dặm: Cung Cấp Cho Cư Dân Bán Kính 2km',
    titleEn: 'Hyper-Local Microgreens Business Plan: Supplying Organic Baby Food in a 2km Radius',
    subtitleVi: 'Mô hình kinh doanh hộp đăng ký định kỳ (Subscription), bao bì thân thiện và lợi nhuận ròng',
    subtitleEn: 'Weekly recurring subscription box model, eco-packaging, and hyper-local margin analysis',
    excerptVi: 'Chiến lược kinh doanh rau mầm vi mô siêu lợi nhuận dành cho các mẹ bỉm sữa và người yêu nông nghiệp đô thị. Tự tạo thu nhập 5-8 triệu/tháng từ 15 khách hàng thân thiết trong cùng khu đô thị.',
    excerptEn: 'Micro-scale business blueprint for selling fresh baby food greens. Generate reliable monthly income from 15 loyal neighborhood apartment subscribers.',
    readTimeMinutes: 9,
    authorName: 'ThS. Hoàng Thu Thủy',
    authorRoleVi: 'Chuyên gia Công nghệ Sinh học Thực phẩm',
    authorRoleEn: 'Food Biotech & Agri-Business Specialist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80',
    tags: ['Kinh doanh rau mầm', 'Rau ăn dặm cho bé', 'Khởi nghiệp nông nghiệp đô thị', 'Subscription Box'],
    directAnswerSnippetVi: 'Mô hình kinh doanh rau mầm bán kính 2km tập trung vào phân khúc mẹ có con nhỏ ăn dặm: áp dụng gói thuê bao định kỳ (Subscription) giao tận cửa 2 hộp mầm tươi/tuần với giá 60.000đ/tuần; sử dụng hộp giấy kraft có cửa sổ cellulose sinh học; chi phí hạt giống và giá thể chỉ chiếm 18% doanh thu, đạt tỷ suất lợi nhuận ròng trên 65%.',
    directAnswerSnippetEn: 'A hyper-local 2km microgreens business targets parents preparing homemade baby purees: offering a weekly subscription delivering 2 fresh punnets weekly at $3.00/week; using kraft paper boxes with biodegradable cellulose windows; seed and substrate costs consume just 18% of revenue, unlocking net margins exceeding 65%.',
    scientificData: {
      botanicalName: 'Hyper-Local Microgreens Subscription Economics',
      keyMetrics: [
        { labelVi: 'Biên độ lợi nhuận ròng', labelEn: 'Net Profit Margin', value: '68.5%', noteVi: 'Không tốn chi phí mặt bằng và vận chuyển xa', noteEn: 'Zero storefront rent or shipping overhead' },
        { labelVi: 'Tỷ lệ khách hàng gia hạn thuê bao', labelEn: 'Monthly Retention Rate', value: '85%', noteVi: 'Khách hàng là phụ huynh có con ăn dặm', noteEn: 'Driven by parents prioritizing fresh purees' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Khảo sát nhóm cư dân chung cư', description: 'Tham gia nhóm cư dân tòa nhà, chia sẻ các bài viết về dinh dưỡng ăn dặm của mầm súp lơ xanh và củ cải đỏ.', duration: '2 ngày' },
      { step: 2, title: 'Tặng mẫu dùng thử 1 hộp rau mầm tươi', description: 'Gieo mẻ mẫu, đóng hộp kraft đẹp mắt tặng 20 gia đình có con nhỏ ăn thử kèm thiệp cảm ơn hướng dẫn xay cháo.', duration: '1 ngày' },
      { step: 3, title: 'Mở gói đặt hàng định kỳ theo tuần', description: 'Chốt đơn thuê bao 2 lần/tuần (thứ Ba và thứ Sáu), cắt rau vào sáng sớm và bấm chuông giao tận cửa căn hộ.', duration: '30 phút' },
      { step: 4, title: 'Thu hồi vỏ hộp giấy tái sinh thái', description: 'Khuyến khích khách trả lại vỏ hộp sạch để đổi lấy mã giảm giá, khép kín tinh thần sống xanh.', duration: 'Hàng tuần' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Engage Building Community Groups', description: 'Connect with local parent groups, sharing science-backed articles on baby puree micronutrients.', duration: '2 days' },
      { step: 2, title: 'Distribute Free Trial Tasting Punnets', description: 'Gift 20 trial boxes of freshly harvested greens to building parents accompanied by recipe cards.', duration: '1 day' },
      { step: 3, title: 'Launch Bi-Weekly Subscription Deliveries', description: 'Establish Tuesday/Friday morning door-to-door deliveries of microgreens harvested 30 minutes earlier.', duration: '30 minutes' },
      { step: 4, title: 'Eco-Box Return Rebate Program', description: 'Offer subscription discounts for returned clean boxes, reinforcing the neighborhood circular ethos.', duration: 'Weekly' }
    ],
    deepContentVi: 'Lợi thế cạnh tranh lớn nhất của người trồng rau mầm tại chỗ so với các chuỗi siêu thị là **Thời Gian Từ Khi Cắt Đến Bàn Ăn (Cut-to-Plate Time)**. Trong khi rau siêu thị mất 3-4 ngày lưu kho lạnh làm thâm nhũn và mất đi 50% vitamin, rau mầm của bạn được cắt trước khi giao 30 phút, giữ nguyên độ giòn ngọt mọng nước và màu xanh nguyên bản.',
    deepContentEn: 'Your ultimate competitive moat over supermarkets is **Cut-to-Plate Velocity**. Supermarket greens sit in refrigerated trucks for days, oxidizing precious micronutrients. Your greens are harvested 30 minutes before arrival, offering unbeatable crunch, sweet vitality, and pristine nutritional density.',
    faqsVi: [
      { question: 'Có cần xin giấy phép kinh doanh lớn khi bán rau mầm trong chung cư không?',
      answer: 'Theo quy định hiện hành, hoạt động sản xuất nông nghiệp vi mô quy mô hộ gia đình không thuộc diện phải đăng ký kinh doanh công ty lớn. Tuy nhiên, bạn phải tuyệt đối đảm bảo an toàn vệ sinh thực phẩm: dùng nguồn nước sinh hoạt sạch, hạt giống có nguồn gốc rõ ràng và giá thể vô trùng.' }
    ],
    faqsEn: [
      { question: 'Are commercial permits required to sell greens to neighbors?',
      answer: 'Cottage micro-agriculture within residential premises generally does not require complex commercial licenses. However, strict food safety hygiene is paramount: use potable water, certified sprouting seeds, and pristine sterile growing media.' }
    ],
    relatedArticleSlugs: ['rau-mam-microgreens-nam-an-do-thi', 'cach-trong-rau-mam-sup-lo-xanh-sulforaphane']
  }
];
