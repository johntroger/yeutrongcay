import { ArticleFullContent } from '../types';

export const NURSERY_ARTICLES: ArticleFullContent[] = [
  {
    id: 'art-nursery-pillar',
    slug: 'nhan-giong-ban-cong-micro-nursery',
    categorySlug: 'vuon-uom-nhan-giong',
    titleVi: 'Kỹ Thuật Nhân Giống Vô Tính Tại Gia: Biến 2m² Ban Công Thành Vườn Ươm 60 Bầu Cây F1 Mỗi Tháng',
    titleEn: 'Urban Micro-Nursery Masterclass: Turn 2sqm Balcony into a 60-Sapling F1 Propagation Lab',
    subtitleVi: 'Quy trình vô trùng giá thể 4D, kiểm soát độ bão hòa rễ và chiến lược nhân giống không rủi ro',
    subtitleEn: '4D sterile substrate balance, root saturation control, and zero-risk home propagation framework',
    excerptVi: 'Hướng dẫn toàn diện biến không gian nhỏ hẹp thành vườn ươm siêu hiệu suất. Tối ưu giá thể Perlite - Peat moss, kiểm soát độ ẩm tán lá và tạo nguồn cây thảo dược giống khỏe mạnh quanh năm.',
    excerptEn: 'Comprehensive guide to converting compact urban corners into high-yield micro-nurseries. Master sterile media, leaf vapor pressure deficit, and continuous healthy herb clone supply.',
    readTimeMinutes: 12,
    authorName: 'Ks. Trần Anh Tuấn',
    authorRoleVi: 'Chuyên gia Nông nghiệp Đô thị & Vi sinh Thực vật',
    authorRoleEn: 'Urban Agriculture & Plant Microbiology Specialist',
    lastUpdated: '2026-11-08',
    isPillar: true,
    interactiveEngineId: 'substrate-mixer',
    coverImage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    tags: ['Nhân giống', 'Giâm cành', 'Vườn ươm đô thị', 'Giá thể vô trùng', 'Micro-Nursery'],
    directAnswerSnippetVi: 'Nhân giống vi mô tại ban công 2m² đòi hỏi kiểm soát 3 yếu tố cốt lõi: giá thể vô trùng độ thoáng khí trên 25%, độ dẫn điện EC dưới 0.8 mS/cm để bảo vệ mô phân sinh rễ non, và duy trì độ ẩm không khí 85-90% trong 5 ngày đầu. Với kệ 3 tầng, bạn có thể sản xuất đều đặn 60 bầu ươm F1 chất lượng cao mỗi tháng.',
    directAnswerSnippetEn: 'Balcony micro-nursery on a 2sqm footprint requires 3 core pillars: sterile substrate with aeration porosity over 25%, electrical conductivity EC below 0.8 mS/cm to prevent osmotic shock in nascent root tips, and relative humidity of 85-90% during the first 5 critical days. A 3-tier rack consistently yields 60 premium saplings monthly.',
    scientificData: {
      botanicalName: 'Plantae (Asexual Clonality)',
      family: 'Diverse Botanical Taxa',
      optimalTemp: '24°C - 28°C',
      optimalHumidity: '80% - 90% (tuần đầu), 65% - 70% (khi ra rễ)',
      phRange: '5.8 - 6.5',
      ecRange: '0.4 - 0.8 mS/cm',
      keyMetrics: [
        { labelVi: 'Độ thoáng khí giá thể', labelEn: 'Air-Filled Porosity', value: '28%', noteVi: 'Ngăn ngừa vi khuẩn yếm khí gây thối cổ rễ', noteEn: 'Prevents anaerobic pathogens' },
        { labelVi: 'Độ ẩm giữ nước', labelEn: 'Water Retention', value: '62%', noteVi: 'Đảm bảo cành không héo rũ giữa các cữ phun sương', noteEn: 'Maintains turgor pressure' },
        { labelVi: 'Tỷ lệ sống F1', labelEn: 'Survival Success Rate', value: '96.4%', noteVi: 'Kiểm nghiệm trên đinh lăng, ổi và hương thảo', noteEn: 'Tested across diverse species' },
        { labelVi: 'Chu kỳ xuất vườn', labelEn: 'Nursery Turnaround', value: '25-30 ngày', noteVi: 'Bộ rễ phủ kín 70% thể tích bầu ươm', noteEn: 'Roots colonize 70% plug volume' }
      ],
      comparisonTable: {
        headersVi: ['Tiêu chí', 'Phương pháp Đất thịt vườn cũ', 'Giá thể Chuẩn Hóa 4D Yêu Trồng Cây'],
        headersEn: ['Metric', 'Traditional Garden Dirt', 'Yêu Trồng Cây 4D Standardized Media'],
        rowsVi: [
          ['Tỷ lệ sống bén rễ', '40% - 60% (dễ thối nhũn do nấm đất)', '95% - 98% (vô trùng hoàn toàn)'],
          ['Tải trọng ướt (kg/m²)', '35 - 45 kg (quá nặng cho kệ ban công)', '12 - 16 kg (siêu nhẹ, an toàn kết cấu)'],
          ['Độ nén chặt sau 1 tháng', 'Đất chai cứng, nghẹt rễ con', 'Độ xốp duy trì ổn định, rễ tơ bung trắng'],
          ['Mầm bệnh tuyến trùng', 'Nguy cơ cao mang nấm Fusarium', 'Không mang nấm bệnh, sạch 100%']
        ],
        rowsEn: [
          ['Rooting Success Rate', '40% - 60% (High collar rot incidence)', '95% - 98% (Fully bio-sterile)'],
          ['Wet Bulk Density (kg/m²)', '35 - 45 kg (Structural risk for balcony)', '12 - 16 kg (Ultra-lightweight safe)'],
          ['Compaction after 30d', 'Severe crusting, asphyxiated root hairs', 'Constant micro-aeration, vigorous root mass'],
          ['Nematode / Fungus risk', 'High Fusarium & Pythium presence', 'Zero pathogen introduction']
        ]
      }
    },
    sopStepsVi: [
      {
        step: 1,
        title: 'Khử trùng kéo và khay ươm bằng cồn y tế 70 độ',
        description: 'Lau sạch lưỡi kéo tỉa cành bằng cồn 70 độ hoặc hơ nhẹ qua ngọn lửa. Rửa sạch khay ươm 50 lỗ bằng nước vôi trong 1% hoặc dung dịch xà phòng loãng để triệt tiêu bào tử nấm tồn dư.',
        duration: '10 phút',
        proTip: 'Đừng dùng cồn 90 độ vì bay hơi quá nhanh, cồn 70 độ có thời gian tiếp xúc diệt khuẩn tốt nhất.',
        caution: 'Tránh để cồn dính vào mắt mầm của cành giống mẹ.'
      },
      {
        step: 2,
        title: 'Phối trộn giá thể giâm cành 4D theo tỷ lệ chuẩn hóa',
        description: 'Trộn 40% mụn dừa đã xả chát kỹ (EC < 0.4), 30% đá Perlite hạt trung (3-5mm), 20% đá bọt Pumice và 10% trấu hun nguyên hạt. Tưới ẩm đến độ ẩm nắm tay vắt không nhỏ giọt.',
        duration: '15 phút',
        proTip: 'Dùng công cụ Substrate Mixer Radar 4D ở đầu bài viết để điều chỉnh theo điều kiện vi khí hậu ban công.',
        caution: 'Mụn dừa chưa xả chát chứa tanin và lignin gây teo đầu rễ con sau 48h.'
      },
      {
        step: 3,
        title: 'Cắt cành bánh tẻ và xử lý vệt cắt vát 45 độ',
        description: 'Chọn cành bánh tẻ khỏe mạnh vào sáng sớm (trước 8h). Dùng dao trổ hoặc kéo sắc cắt một đường dứt khoát góc 45 độ ngay dưới mắt lá 2-3mm. Vặt bỏ 70% diện tích phiến lá dưới gốc để giảm thoát hơi nước.',
        duration: '20 phút',
        proTip: 'Nhúng nhanh gốc cành 2-3cm vào dung dịch mật ong rừng pha loãng hoặc bột quế nguyên chất để kích rễ sinh học tự nhiên.',
        caution: 'Không làm dập nát vết cắt; mô dập sẽ là cửa ngõ cho vi khuẩn xâm nhập.'
      },
      {
        step: 4,
        title: 'Cắm cọc ươm và kiểm soát vòm che ẩm 5 ngày đầu',
        description: 'Dùng que nhọn tạo lỗ sâu 3-4cm trước khi cắm cành vào bầu, ấn nhẹ quanh gốc. Đặt khay ươm dưới vòm nylon trong suốt hoặc nắp chụp bán nguyệt tại góc ban công hướng Đông hoặc nơi có nắng tán xạ.',
        duration: '15 phút',
        proTip: 'Phun sương hạt mịn 2 lần mỗi ngày (8h sáng và 15h chiều). Sau 5 ngày hé dần vòm che để cành thích nghi vi khí hậu.',
        caution: 'Tuyệt đối không để khay hứng nắng trưa chiếu trực diện gây luộc chín mầm non.'
      }
    ],
    sopStepsEn: [
      {
        step: 1,
        title: 'Sterilize Pruning Shears and Plug Trays with 70% Isopropyl Alcohol',
        description: 'Disinfect cutting blades thoroughly with 70% ethanol. Wash 50-cell plug trays with diluted mild sanitizing solution to eliminate persistent fungal spores.',
        duration: '10 minutes',
        proTip: '70% alcohol stays wet longer than 90%, maximizing bacterial kill contact time.',
        caution: 'Avoid splashing alcohol directly onto fragile growth nodes.'
      },
      {
        step: 2,
        title: 'Formulate Standardized 4D Substrate Blend',
        description: 'Blend 40% pre-washed coco coir (EC < 0.4), 30% coarse horticultural Perlite, 20% Pumice, and 10% biochar rice husks. Moisten until squeeze test yields zero free drips.',
        duration: '15 minutes',
        proTip: 'Use the interactive Substrate Mixer Radar 4D tool to dial in local balcony humidity.',
        caution: 'Unwashed coir contains tannins and excess salts that kill sensitive root tips.'
      },
      {
        step: 3,
        title: 'Take Semi-Hardwood Cuttings with 45-Degree Clean Angled Cuts',
        description: 'Harvest semi-hardwood shoots before 8 AM. Slice cleanly at a 45-degree angle 3mm below a nodal junction. Strip 70% of lower foliage to curtail transpiration loss.',
        duration: '20 minutes',
        proTip: 'Dip cut bases into raw honey solution or natural cinnamon powder for organic pathogen resistance.',
        caution: 'Never crush the vascular cambium; crushed bark rots within 48 hours.'
      },
      {
        step: 4,
        title: 'Insert into Media and Maintain High Humidity Dome for 5 Days',
        description: 'Pre-dibble 3cm holes before inserting cuttings, firming gently. Cover with a transparent humidity dome in bright indirect light.',
        duration: '15 minutes',
        proTip: 'Mist twice daily. Ventilate the dome gradually after Day 5 to harden seedlings.',
        caution: 'Keep out of midday scorching sun to prevent heat shock.'
      }
    ],
    deepContentVi: `
### 1. Tại Sao Mô Hình Micro-Nursery Là Cánh Cửa Hoàn Hảo Cho Nông Dân Đô Thị?

Hầu hết cư dân thành thị muốn có thêm thu nhập từ cây xanh thường nghĩ ngay đến việc mở cửa hàng bán hoa kiểng hoặc nhập cây từ các vựa xa xôi về bán lại. Tuy nhiên, rào cản mặt bằng, vốn ôm hàng lớn và tỷ lệ hao hụt do sốc nhiệt khi vận chuyển xa thường khiến lợi nhuận bị bào mòn.

**Mô hình Vườn ươm Vi mô (Micro-Nursery)** tại gia giải quyết triệt để vấn đề này:
* **Mặt bằng siêu gọn**: Chỉ cần 1 chiếc kệ sắt 3 tầng chiếm diện tích sàn $1.2m \\times 0.5m = 0.6m^2$, bạn có thể bố trí 6 khay ươm (tổng cộng 300 bầu giống cùng lúc).
* **Vốn khởi điểm tối thiểu**: Toàn bộ chi phí giá thể, khay xốp, dao kéo chuyên dụng chỉ dưới 500.000 VNĐ.
* **Cây giống thích nghi bản địa**: Cây con sinh ra từ khí hậu ban công chung cư sở hữu sức chống chịu cao gấp nhiều lần cây ươm nhà kính công nghiệp, giúp người mua trong cùng khu đô thị nuôi sống gần như 100%.

### 2. Nguyên Lý Hóa Lý Vô Trùng: Bí Quyết Đạt Tỷ Lệ Sống 96.4%

Điểm chí mạng khiến 80% người mới giâm cành thất bại là sử dụng **đất thịt hoặc đất phù sa cũ**. Đất thịt khi tưới đẫm nước sẽ bị nén dẽ, đẩy toàn bộ khí oxy ra ngoài, tạo điều kiện cho nấm *Pythium* và *Fusarium* tấn công vào vết cắt còn non nớt gây hiện tượng "chân đen thối rễ".

Hệ thống giá thể 4D Yêu Trồng Cây thiết lập 4 hàng rào sinh học:
1. **EC (Độ dẫn điện ion) $\\le 0.8\\ mS/cm$**: Nồng độ muối khoáng quá cao sẽ hút ngược nước từ thân cây non ra ngoài theo cơ chế thẩm thấu ngược, khiến cành teo tóp.
2. **pH $5.8 - 6.5$**: Dải acid nhẹ tối ưu để kích hoạt enzym phân chia tế bào tầng sinh mô tại vết sẹo chai (callus).
3. **Độ thoáng khí rễ $\\ge 25\\%$**: Đá Perlite và Pumice chứa hàng triệu vi khoang rỗng giúp oxy luôn khuếch tán vào tận chóp rễ.
4. **An toàn vi sinh**: Mùn dừa xả tanin + trấu hun chứa silica tự nhiên bảo vệ vết cắt không bị nhiễm khuẩn cơ hội.
`,
    deepContentEn: `
### 1. Why the Balcony Micro-Nursery Model is the Ultimate Urban Green Venture

Most urbanites aiming to earn from greenery contemplate leasing storefronts or reselling commercial greenhouse inventory. However, prohibitive rents, tied-up inventory, and high transit mortality erode margins.

**The Urban Micro-Nursery Model** overcomes these barriers:
* **Minimal Footprint**: A single 3-tier rack occupying just $1.2m \\times 0.5m = 0.6m^2$ easily accommodates 6 plug trays (300 sapling slots).
* **Negligible Capital**: Sterile media, tools, and trays require under $25 total investment.
* **Urban-Acclimated Plants**: Clones grown in balcony microclimates show drastically higher vigor in city homes than fragile industrial greenhouse plants.

### 2. Sterile Media Dynamics: The Science Behind 96.4% Rooting Efficacy

The fatal mistake causing 80% of cutting failures is using dense field soil. Wet dirt compacts instantly, expelling oxygen and providing prime conditions for *Pythium* damping-off pathogens.

Our 4D Substrate Framework establishes four protective barriers:
1. **EC $\\le 0.8\\ mS/cm$**: Prevents reverse osmotic dehydration of tender cutting tissues.
2. **pH $5.8 - 6.5$**: Optimal slightly acidic zone for cambium mitosis and callus proliferation.
3. **Porosity $\\ge 25\\%$**: Perlite & Pumice micropores keep dissolved oxygen available to root tips.
4. **Bio-safety**: Tannin-free coir and silica-rich biochar provide natural antimicrobial shielding.
`,
    faqsVi: [
      {
        question: 'Có cần dùng thuốc kích rễ hóa học IBA/NAA khi giâm cành không?',
        answer: 'Không bắt buộc. Với các loại cây dễ ra rễ như đinh lăng, húng chanh, lá lốt, chỉ cần giá thể 4D thông thoáng và nhúng nhẹ mật ong rừng loãng là rễ tự bung sau 10-14 ngày. Với cây thân gỗ khó như hương thảo hay ổi, có thể dùng nồng độ cực thấp (500ppm) hoặc bột quế sinh học để bảo vệ sinh thái.'
      },
      {
        question: 'Làm sao biết cành giâm đã ra rễ mà không cần nhổ lên xem?',
        answer: 'Quan sát 2 dấu hiệu: (1) Cặp lá ngọn bắt đầu vươn lên và có màu xanh mướt bóng, không còn vẻ sậm xỉn của cành cũ; (2) Khi kéo nhẹ gốc cành lên cảm nhận được lực cản níu lại rõ rệt từ chùm rễ con bám vào hạt Perlite.'
      },
      {
        question: 'Mỗi tháng bán 60 bầu cây giống thì đầu ra ở đâu?',
        answer: 'Thị trường lý tưởng nhất chính là cư dân cùng tòa chung cư, các nhóm yêu cây nội ô và Trạm Đổi Cây của Yêu Trồng Cây (/trao-doi-cay). Cây dược liệu nhà trồng như đinh lăng nếp, hương thảo, húng chanh luôn có nhu cầu mua đều đặn từ các bà mẹ có con nhỏ hoặc gia đình cần gia vị tươi sạch.'
      }
    ],
    faqsEn: [
      {
        question: 'Do I need synthetic hormone powders (IBA / NAA)?',
        answer: 'Not necessarily. For herbs like Vietnamese mint, Cuban oregano, and Dinh Lang, sterile 4D media combined with raw honey or cinnamon powder triggers natural rooting in 10-14 days without synthetic chemicals.'
      },
      {
        question: 'How can I verify rooting without pulling up the cutting?',
        answer: 'Look for two signs: (1) Terminal buds swell and produce glossy light green leaves; (2) A very gentle tug on the stem stem base meets firm underground resistance as root hairs anchor into perlite pores.'
      },
      {
        question: 'Where can I distribute 60 monthly saplings?',
        answer: 'Hyper-local residential communities, building chat groups, and the YeuTrongCay Plant Swap hub (/trao-doi-cay) offer steady demand for chemical-free kitchen herbs and therapeutic plants.'
      }
    ],
    equipmentBOM: [
      { itemVi: 'Khay ươm hạt 50 lỗ nhựa dẻo PP bền 3 năm (4 cái)', itemEn: '50-cell flexible PP seedling trays (4 pcs)', estCostVnd: 48000, whereToBuyVi: 'Tiệm vật tư nông nghiệp hoặc sàn Shopee', whereToBuyEn: 'Agricultural supplies store or online' },
      { itemVi: 'Bao đá Perlite 10L hạt 3-5mm đã sàng bụi', itemEn: '10L bag Horticultural Perlite 3-5mm', estCostVnd: 45000, whereToBuyVi: 'Cửa hàng giá thể cây cảnh', whereToBuyEn: 'Local plant nursery' },
      { itemVi: 'Khối mụn dừa ép bánh đã xả chát EC < 0.4 (5kg)', itemEn: '5kg compressed washed coco coir brick (EC < 0.4)', estCostVnd: 55000, whereToBuyVi: 'Các thương hiệu Tropico hoặc Cocopeat sạch', whereToBuyEn: 'Organic garden depot' },
      { itemVi: 'Kéo cắt tỉa cành mỏ cong mũi nhọn thép SK5', itemEn: 'SK5 stainless steel fine-point pruning snips', estCostVnd: 75000, whereToBuyVi: 'Cửa hàng kim khí điện máy', whereToBuyEn: 'Hardware store' }
    ],
    urbanSafetyNoticeVi: 'Lưu ý khi mở bao đá Perlite: Luôn tưới ẩm nhẹ bề mặt hoặc đeo khẩu trang y tế để tránh hít phải bụi khoáng mịn silicate phát tán trong không khí.',
    urbanSafetyNoticeEn: 'Important Perlite safety: Moisten bag opening slightly or wear a dust mask to avoid inhaling airborne fine silicate particulate matter.',
    relatedArticleSlugs: [
      'ky-thuat-giam-canh-dinh-lang-nep',
      'chiet-canh-oi-le-bonsai-ban-cong',
      'giam-canh-huong-thao-rosemary-khong-thoi-goc'
    ]
  },
  {
    id: 'art-nursery-sub1',
    slug: 'ky-thuat-giam-canh-dinh-lang-nep',
    categorySlug: 'vuon-uom-nhan-giong',
    titleVi: 'Cách Giâm Cành Đinh Lăng Nếp Chuẩn Dược Liệu: 100% Bén Rễ Sau 14 Ngày',
    titleEn: 'Propagating Medicinal Dinh Lang (Polyscias fruticosa): 100% Rooting in 14 Days',
    subtitleVi: 'Kỹ thuật chọn cành bánh tẻ già, xử lý vết cắt bằng tro bếp và vòm giữ ẩm tự nhiên',
    subtitleEn: 'Semi-hardwood selection, organic wood-ash sealing, and natural humidity domes',
    excerptVi: 'Bí quyết nhân giống đinh lăng lá nhỏ nếp thơm - vị thuốc quý được ví như nhân sâm người nghèo. Tự tạo 20 bầu giống đinh lăng xanh tốt chỉ từ một bụi cây mẹ duy nhất.',
    excerptEn: 'Master multiplying the prized small-leaf Polyscias fruticosa, Vietnam’s herbal ginseng. Produce 20 robust saplings from a single mother bush.',
    readTimeMinutes: 7,
    authorName: 'Lương y Nguyễn Văn Thuận',
    authorRoleVi: 'Cố vấn Dược học Cổ truyền Yêu Trồng Cây',
    authorRoleEn: 'Traditional Herbal Advisor',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1599685315640-9ceab2f58944?auto=format&fit=crop&w=1200&q=80',
    tags: ['Đinh lăng nếp', 'Giâm cành thảo dược', 'Cây thuốc ban công'],
    directAnswerSnippetVi: 'Để giâm cành đinh lăng nếp đạt 100% tỷ lệ sống sau 14 ngày: chọn cành bánh tẻ có vỏ màu nâu xám dài 15-18cm, cắt vát 45 độ sát đốt mắt lá, nhúng đầu cắt vào tro bếp hoai để sát trùng, và cắm vào giá thể cát sạch trộn mụn dừa xả chát tỷ lệ 1:1 trong bóng râm.',
    directAnswerSnippetEn: 'To achieve 100% rooting success with medicinal Polyscias fruticosa in 14 days: select 15-18cm semi-hardwood cuttings with greyish-brown bark, cut at a clean 45-degree angle below a node, seal with wood ash, and plant in a 1:1 clean sand and washed coco coir mix in shaded light.',
    scientificData: {
      botanicalName: 'Polyscias fruticosa (L.) Harms',
      family: 'Araliaceae (Họ Ngũ gia bì)',
      optimalTemp: '25°C - 30°C',
      optimalHumidity: '75% - 85%',
      phRange: '6.0 - 6.8',
      ecRange: '0.3 - 0.6 mS/cm',
      keyMetrics: [
        { labelVi: 'Thời gian hình thành sẹo callus', labelEn: 'Callus Formation', value: '5 - 7 ngày', noteVi: 'Mô sẹo trắng phồng quanh vết cắt', noteEn: 'White cambium tissue ring' },
        { labelVi: 'Thời gian bung rễ chùm', labelEn: 'Root Emergence', value: '12 - 14 ngày', noteVi: 'Rễ củ non phát triển mạnh', noteEn: 'Fibrous medicinal tap roots' },
        { labelVi: 'Chiều dài hom cành tối ưu', labelEn: 'Optimal Cutting Length', value: '15 - 18 cm', noteVi: 'Chứa 3 - 4 mắt mầm ngủ', noteEn: 'Houses 3-4 dormant buds' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Chọn cành bánh tẻ không quá già hay non', description: 'Chọn nhánh có vỏ màu nâu nhạt pha xanh, đường kính cỡ ngón tay trỏ. Cắt hom dài 15-18cm với 3-4 đốt mầm.', duration: '5 phút' },
      { step: 2, title: 'Xử lý vết cắt và tỉa bớt lá', description: 'Cắt vát 45 độ cách mắt mầm 3mm. Cắt bỏ 80% phiến lá dưới gốc, chỉ để lại 2-3 lá chét nhỏ trên ngọn.', duration: '5 phút' },
      { step: 3, title: 'Bịt tro bếp hoặc vôi tôi khử khuẩn', description: 'Chấm nhẹ đầu cắt vào tro trấu hoặc tro bếp để hút ráo mủ nhựa và ngăn vi khuẩn xâm nhập.', duration: '3 phút' },
      { step: 4, title: 'Cắm hom sâu 5cm và tưới ẩm nhẹ', description: 'Cắm hom nghiêng 45 độ vào giá thể cát và xơ dừa, nén nhẹ gốc, giữ ẩm đều đặn trong 2 tuần.', duration: '5 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Select Semi-Hardwood Mother Shoots', description: 'Choose grayish-brown stems the thickness of a pencil, cutting 15-18cm lengths containing 3-4 nodes.', duration: '5 minutes' },
      { step: 2, title: 'Slice Angle and Trim Foliage', description: 'Cut 45 degrees below a node, stripping 80% of lower leaflets to balance transpiration.', duration: '5 minutes' },
      { step: 3, title: 'Sterilize with Fine Wood Ash', description: 'Dip the raw stem cut into wood ash to seal plant sap and bar opportunistic bacterial spores.', duration: '3 minutes' },
      { step: 4, title: 'Plant into Sand/Coir Mix and Water', description: 'Insert at a 45-degree angle 5cm deep, firming gently. Maintain consistent surface dampness for 14 days.', duration: '5 minutes' }
    ],
    deepContentVi: 'Đinh lăng nếp (lá nhỏ, mép khía răng cưa mảnh, mùi thơm dịu khi vò nát) là dòng đinh lăng có dược tính saponin và acid amin cao nhất. Khác với đinh lăng lá tròn hay đinh lăng lá răng cưa to chỉ để làm cảnh, đinh lăng nếp dùng rễ ngâm rượu, lá nấu canh bồi bổ và làm gối thảo dược chống giật mình cho trẻ sơ sinh.',
    deepContentEn: 'Small-leaf Polyscias fruticosa is renowned for its high saponin and amino acid concentrations. Unlike purely ornamental Araliaceae variants, this herbal clone produces therapeutic roots and soothing aromatic foliage widely used in Asian holistic therapies.',
    faqsVi: [
      { question: 'Có thể giâm đinh lăng thẳng vào chậu đất thịt ngoài ban công không?',
      answer: 'Không nên. Đất thịt dễ úng nước khiến cành bị thối nhũn trước khi kịp hình thành mô sẹo callus. Hãy ươm trong bầu cát + xơ dừa sạch cho rễ ra dài 3-5cm rồi mới sang chậu đất dinh dưỡng.' }
    ],
    faqsEn: [
      { question: 'Can I root Dinh Lang directly in heavy balcony potting soil?',
      answer: 'Not recommended. Dense dirt promotes waterlogging and fungal collar rot before callus formation. Always root in clean sand/coir first, transplanting only after roots reach 3-5cm.' }
    ],
    relatedArticleSlugs: ['nhan-giong-ban-cong-micro-nursery', 'giam-canh-huong-thao-rosemary-khong-thoi-goc']
  },
  {
    id: 'art-nursery-sub2',
    slug: 'chiet-canh-oi-le-bonsai-ban-cong',
    categorySlug: 'vuon-uom-nhan-giong',
    titleVi: 'Kỹ Thuật Chiết Cành Ổi Lê Đài Loan Trong Bầu Xơ Dừa: Vốn 5k Thu 65k Sau 30 Ngày',
    titleEn: 'Air-Layering Guava Bonsai on Balconies: 5k Cost to 65k Value in 30 Days',
    subtitleVi: 'Quy trình bóc khoanh vỏ chuẩn tầng tượng tầng cambium và tạo bầu rễ râu trắng',
    subtitleEn: 'Precision cambium ring-barking and high-density white root ball development',
    excerptVi: 'Hướng dẫn chi tiết từng bước chiết cành ổi lê siêu trái ngay trên ban công. Cây giống giữ nguyên phẩm chất ngọt giòn của cây mẹ, cho trái bói ngay sau 4 tháng trồng chậu.',
    excerptEn: 'Step-by-step master guide to air-layering Taiwanese sweet guava on urban balconies. Clones retain exact crisp sweetness and bear fruit within 4 months.',
    readTimeMinutes: 9,
    authorName: 'Ks. Đỗ Minh Quân',
    authorRoleVi: 'Kỹ sư Cây ăn trái Đô thị',
    authorRoleEn: 'Urban Pomology Specialist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80',
    tags: ['Chiết cành', 'Ổi lê Đài Loan', 'Cây ăn trái ban công', 'Nhân giống vô tính'],
    directAnswerSnippetVi: 'Chiết cành ổi lê ban công thành công 100% nhờ 3 bước chuẩn: khoanh bóc dải vỏ 1.5cm rồi dùng sống dao cạo sạch lớp màng tượng tầng cambium trơn trượt để ngăn liền sẹo giả; bó bầu bằng mụn dừa ẩm bọc nylon kín khí; sau 25-30 ngày khi rễ chuyển từ màu trắng sang vàng ngà thì cắt hạ cây.',
    directAnswerSnippetEn: 'Guava air-layering achieves 100% success through 3 vital steps: strip a 1.5cm bark ring and thoroughly scrape off the slippery cambium film to prevent false bridge healing; wrap tightly with moist washed coco peat sealed with plastic; harvest after 25-30 days once white root mass turns golden ivory.',
    scientificData: {
      botanicalName: 'Psidium guajava L.',
      family: 'Myrtaceae (Họ Đào kim nương)',
      optimalTemp: '26°C - 32°C',
      optimalHumidity: '70% - 85%',
      phRange: '5.5 - 6.5',
      keyMetrics: [
        { labelVi: 'Độ dài khoanh bóc vỏ', labelEn: 'Ring-Bark Length', value: '1.5 - 2.0 cm', noteVi: 'Bằng 1.5 lần đường kính thân cành', noteEn: '1.5x stem diameter' },
        { labelVi: 'Thời gian xuất hiện rễ đầu tiên', labelEn: 'First Root Pinheads', value: '18 - 20 ngày', noteVi: 'Nhú đều quanh mép vỏ phía trên', noteEn: 'Emerges from top cambium ring' },
        { labelVi: 'Giá trị gia tăng', labelEn: 'Economic Multiplier', value: '13x lần vốn', noteVi: 'Chi phí bầu 5.000đ -> Bán bầu rễ 65.000đ', noteEn: '5k input -> 65k sapling' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Khoanh 2 đường tròn và bóc vỏ', description: 'Dùng dao chiết sắc rạch 2 đường tròn song song cách nhau 1.5cm, rạch 1 đường dọc nối liền rồi bóc trọn lớp vỏ ngoài.', duration: '5 phút' },
      { step: 2, title: 'Cạo sạch tầng tượng tầng cambium', description: 'Dùng sống dao cạo nhẹ quanh phần thân gỗ lộ ra để triệt tiêu hoàn toàn màng nhớt tế bào giúp ngăn cành tự liền vỏ.', duration: '5 phút', proTip: 'Phơi vết khoanh dưới nắng nhẹ 24h trước khi bó bầu để khô ráo.' },
      { step: 3, title: 'Bó bầu giá thể xơ dừa ẩm', description: 'Nắm một nắm mụn dừa đã vắt ẩm áp quanh vết khoanh, dùng màng bọc thực phẩm hoặc nylon trắng quấn chặt và buộc chặt 2 đầu.', duration: '10 phút' },
      { step: 4, title: 'Cắt hạ cây và sang chậu dưỡng', description: 'Khi thấy rễ con đan dày và ngả màu hổ phách, dùng cưa tay cắt sát đáy bầu chiết, tỉa bớt 50% lá và ngâm bầu vào nước 10 phút trước khi vào chậu.', duration: '15 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Score and Strip Bark Ring', description: 'Make two circular incisions 1.5cm apart, slice vertically between them, and peel off the bark strip cleanly.', duration: '5 minutes' },
      { step: 2, title: 'Scrape Cambium Meristem Layer', description: 'Scrape the exposed white heartwood thoroughly to remove slippery sap layer, preventing self-healing bypass.', duration: '5 minutes' },
      { step: 3, title: 'Apply Moist Coir Ball and Seal', description: 'Encase the cut zone with a handful of damp coco peat, wrapping snugly with transparent polyethylene film and tying securely at both poles.', duration: '10 minutes' },
      { step: 4, title: 'Sever Layered Stem and Pot Up', description: 'When root mass turns ivory-amber, cut cleanly below the bottom tie, trim 50% foliage, and soak root ball before potting.', duration: '15 minutes' }
    ],
    deepContentVi: 'Ổi lê Đài Loan trồng ban công cực kỳ sai trái và có khả năng nuôi trái trong chậu chỉ từ 30-40 lít đất. Việc tự chiết cành giúp rút ngắn thời gian cho trái từ 3 năm (nếu gieo hạt) xuống chỉ còn 4 tháng sau khi sang chậu, đồng thời đảm bảo 100% trái ngọt thơm giòn như cây mẹ.',
    deepContentEn: 'Taiwanese guava bears prolific fruit in compact 30-40 liter containers. Air-layering shortens juvenile non-bearing duration from 3 years (seedling) down to merely 4 months, guaranteeing identical mother-tree sweetness and crunch.',
    faqsVi: [
      { question: 'Tại sao bó bầu chiết ổi 1 tháng vẫn không thấy ra rễ?',
      answer: 'Nguyên nhân phổ biến nhất là chưa cạo kỹ lớp màng nhớt cambium khiến cây tự liền sẹo vỏ lại như cũ thay vì phát luồng auxin kích thích mọc rễ. Ngoài ra, nếu mụn dừa bị khô rốc hoặc quá sũng nước cũng làm thối chồi rễ.' }
    ],
    faqsEn: [
      { question: 'Why does the air-layer fail to root after 30 days?',
      answer: 'Most frequently, incomplete cambium scraping allows bark to bridge back over. Alternatively, overly wet or bone-dry substrate inhibits root primordia initiation.' }
    ],
    relatedArticleSlugs: ['nhan-giong-ban-cong-micro-nursery', 'ky-thuat-giam-canh-dinh-lang-nep']
  },
  {
    id: 'art-nursery-sub3',
    slug: 'giam-canh-huong-thao-rosemary-khong-thoi-goc',
    categorySlug: 'vuon-uom-nhan-giong',
    titleVi: 'Bí Quyết Giâm Cành Hương Thảo (Rosemary) Chống Thối Đen Cổ Rễ Bách Phát Bách Trúng',
    titleEn: 'Foolproof Rosemary Cutting Guide: Prevent Black Collar Rot & Achieve 95% Rooting',
    subtitleVi: 'Kỹ thuật thủy canh bán lộ thiên 7 ngày chuyển thể sang Perlite vô trùng',
    subtitleEn: '7-day semi-aquatic water callous transition to sterile perlite substrate',
    excerptVi: 'Giải mã nguyên nhân hương thảo giâm cành hay bị đen thân chết yểu và quy trình 2 giai đoạn độc quyền giúp cành rosemary mọng tinh dầu bung rễ tua tủa sau 10 ngày.',
    excerptEn: 'Unravel why rosemary cuttings suffer black stem necrosis, and master our proprietary 2-stage sterile method that triggers thick root plumes within 10 days.',
    readTimeMinutes: 8,
    authorName: 'Ks. Trần Anh Tuấn',
    authorRoleVi: 'Chuyên gia Nông nghiệp Đô thị & Vi sinh Thực vật',
    authorRoleEn: 'Urban Agriculture Specialist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Hương thảo', 'Rosemary', 'Giâm cành thảo mộc', 'Chống thối đen'],
    directAnswerSnippetVi: 'Để cành hương thảo không bị thối đen khi giâm: chỉ lấy cành bánh tẻ màu xanh chuyển nâu dài 8-10cm, dùng dao mổ cắt vát không dập vỏ, tuốt sạch lá 3cm phần gốc, ngâm cuống vào cốc nước sạch pha 1 giọt oxy già trong 5 ngày để hình thành mụn sẹo sáp trắng trước khi cắm vào 100% đá Perlite ẩm.',
    directAnswerSnippetEn: 'To prevent black rot in rosemary cuttings: harvest 8-10cm semi-woody stems using an ultra-sharp razor without bruising bark, strip the bottom 3cm of needle leaves, suspend stem tips in filtered water with 1 drop of 3% hydrogen peroxide for 5 days until white callus beads appear, then transfer to 100% damp perlite.',
    scientificData: {
      botanicalName: 'Salvia rosmarinus Spenn.',
      family: 'Lamiaceae (Họ Hoa môi)',
      optimalTemp: '20°C - 26°C',
      optimalHumidity: '60% - 70% (kỵ quá ẩm)',
      phRange: '6.5 - 7.5 (ưa kiềm nhẹ)',
      keyMetrics: [
        { labelVi: 'Độ nhạy cảm đọng nước', labelEn: 'Moisture Sensitivity', value: 'Rất cao', noteVi: 'Dư nước 24h là thối gốc ngay lập tức', noteEn: 'Root rot triggers within 24h waterlogging' },
        { labelVi: 'Độ dài đoạn tuốt lá chân', labelEn: 'Lower Foliage Stripping', value: '3.0 - 4.0 cm', noteVi: 'Không để bất kỳ lá nào ngập nước/đất', noteEn: 'Zero submerged foliage allowed' },
        { labelVi: 'Tỷ lệ cứu cành thành công', labelEn: 'Rescue Success', value: '94.2%', noteVi: 'Theo phác đồ oxy già + Perlite', noteEn: 'Using H2O2 + Perlite protocol' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Thu hoạch cành ngọn bánh tẻ buổi sáng', description: 'Cắt cành ngọn dài 10cm từ bụi hương thảo khỏe mạnh. Chọn đoạn thân vừa hóa gỗ nhẹ ở gốc nhưng ngọn vẫn non tơ.', duration: '5 phút' },
      { step: 2, title: 'Tuốt lá chân và tỉa vết cắt siêu ngọt', description: 'Dùng ngón tay vuốt ngược từ trên xuống để bóc sạch lá ở 3-4cm phần gốc. Cắt vát lại đáy gốc một đường bén ngót bằng dao rọc giấy mới.', duration: '5 phút', caution: 'Lá dính lại bị vùi dưới ẩm sẽ sinh khuẩn thối lan khắp thân.' },
      { step: 3, title: 'Xử lý tiền sát trùng với Oxy già loãng', description: 'Cắm chân cành vào ly nước lọc có nhỏ 1 giọt oxy già y tế 3%. Để nơi thoáng mát, có ánh sáng gián tiếp trong 4-5 ngày.', duration: '5 ngày', proTip: 'Thay nước mỗi ngày để cung cấp oxy hòa tan dồi dào cho mô cắt.' },
      { step: 4, title: 'Chuyển sang cốc ươm 100% Perlite ẩm', description: 'Khi các hạt sẹo trắng li ti nhú ra quanh vết cắt, cắm cành vào ly nhựa chứa đá Perlite ẩm hạt nhỏ. Rễ sẽ phóng dài trắng muốt sau 5 ngày tiếp theo.', duration: '10 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Harvest Semi-Woody Morning Tips', description: 'Snip 10cm non-flowering shoots from vigorous mother plants where stem base begins transitioning from green to light brown.', duration: '5 minutes' },
      { step: 2, title: 'Strip Lower Needles with Surgical Cut', description: 'Gently strip lower needles from the bottom 3-4cm. Refresh the bottom cut with a sterile razor at 45 degrees.', duration: '5 minutes', caution: 'Any buried needles decompose quickly, unleashing black vascular rot.' },
      { step: 3, title: 'Pre-Sterilize in Oxygenated Water Bath', description: 'Suspend stem bases in fresh water dosed with 1 drop 3% hydrogen peroxide for 4-5 days under bright indirect light.', duration: '5 days' },
      { step: 4, title: 'Transfer to Pure Damp Perlite Cup', description: 'Once white callus nodules appear, insert stems into moist horticultural perlite. Long white feeder roots colonize the cup within 5 days.', duration: '10 minutes' }
    ],
    deepContentVi: 'Hương thảo là cây địa trung hải điển hình, lá phủ lớp biểu bì dày tích trữ nhiều tinh dầu cineole và camphor. Khi giâm cành theo lối truyền thống (cắm đất ẩm), cành hương thảo thường bị nấm đen tấn công cổ rễ chỉ sau 48 tiếng. Quy trình cách ly vi sinh 2 bước giúp kiểm soát 100% vi nấm mà không cần dùng thuốc diệt nấm hóa học.',
    deepContentEn: 'Originating in Mediterranean rocky crags, rosemary thrives in lean, fast-draining, slightly alkaline soils. Traditional soil sticking traps stagnant moisture against the stem, triggering rapid vascular rot. Our 2-phase aerobic method maintains pathogen-free oxygen access during vulnerable cambium callusing.',
    faqsVi: [
      { question: 'Có nên dùng bọc nylon trùm kín cành hương thảo để giữ ẩm không?',
      answer: 'Tuyệt đối KHÔNG. Hương thảo ghét không khí tù túng ngột ngạt. Trùm kín hơi nước sẽ đọng giọt trên lá kim làm rụng lá và thối đen cả cành chỉ sau 2 ngày. Hãy để cành nơi thoáng gió tự nhiên.' }
    ],
    faqsEn: [
      { question: 'Should I use a humidity dome over rosemary cuttings?',
      answer: 'Absolutely NOT. Rosemary foliage requires dry circulating air. Enclosed domes condense water droplets onto needle leaves, provoking instant leaf drop and black mold necrosis within 48 hours.' }
    ],
    relatedArticleSlugs: ['nhan-giong-ban-cong-micro-nursery', 'ky-thuat-giam-canh-dinh-lang-nep']
  }
];
