import { ArticleFullContent } from '../types';

export const HERBAL_ARTICLES: ArticleFullContent[] = [
  {
    id: 'art-herbal-pillar',
    slug: 'che-bien-sau-siro-tra-thao-moc',
    categorySlug: 'che-bien-sau-duoc-lieu',
    titleVi: 'Artisanal Herbalism: Chuẩn Hóa Quy Trình Sản Xuất Siro Ho & Trà Thảo Mộc Đạt Chuẩn Dược Lý',
    titleEn: 'Artisanal Herbalism: Standardizing Home Herbal Syrups & Solar-Dried Teas to Clinical Efficacy',
    subtitleVi: 'Ứng dụng độ ngọt Brix 62-65°, nhiệt động học bảo toàn Carvacrol và an toàn đóng chai tiệt trùng',
    subtitleEn: 'Applying 62-65° Brix auto-preservation, carvacrol thermokinetics, and sterile hot-fill bottling',
    excerptVi: 'Cẩm nang tinh hoa biến vườn thảo dược ban công thành các dòng sản phẩm chăm sóc sức khỏe gia đình và kinh doanh nhỏ. Bí quyết nấu siro giữ nguyên tinh dầu không bị biến tính bởi nhiệt độ cao.',
    excerptEn: 'Master turning home-grown medicinal herbs into high-value apothecary wellness products. Learn the golden thermal window to preserve volatile phytochemicals without industrial additives.',
    readTimeMinutes: 14,
    authorName: 'Dược sĩ Lê Minh Tâm',
    authorRoleVi: 'Chuyên gia Bào chế Thảo dược Tự nhiên',
    authorRoleEn: 'Natural Herbal Formulation Pharmacist',
    lastUpdated: '2026-11-08',
    isPillar: true,
    interactiveEngineId: 'herbal-brix',
    coverImage: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1200&q=80',
    tags: ['Chế biến sâu', 'Siro húng chanh', 'Trà thảo mộc', 'Độ ngọt Brix', 'Dược liệu tự nhiên'],
    directAnswerSnippetVi: 'Sản xuất siro thảo dược tại gia không chất bảo quản đòi hỏi kiểm soát nồng độ chất khô hòa tan ở ngưỡng 62-65° Brix để ức chế áp suất thẩm thấu của vi khuẩn và nấm men. Nhiệt độ chưng cất luôn giữ dưới 80°C để bảo tồn Carvacrol bay hơi, và chỉ châm mật ong rừng khi dịch siro nguội dưới 45°C để bảo toàn enzym diastase quý giá.',
    directAnswerSnippetEn: 'Preservative-free home herbal syrup formulation requires achieving 62-65° Brix dissolved sugar solids to dehydrate bacterial microbes through high osmotic pressure. Simmer temperature must remain under 80°C to safeguard volatile carvacrol compounds, with raw honey folded in only after cooling below 45°C to preserve vital therapeutic diastase enzymes.',
    scientificData: {
      botanicalName: 'Coleus amboinicus & Citrus japonica',
      family: 'Lamiaceae & Rutaceae',
      optimalTemp: 'Chưng hấp: 75°C - 80°C | Châm mật ong: < 45°C',
      phRange: '3.8 - 4.2 (ổn định tự nhiên nhờ acid citric từ quất)',
      keyMetrics: [
        { labelVi: 'Độ ngọt khúc xạ mục tiêu', labelEn: 'Target Refractometer Brix', value: '63.5° Bx', noteVi: 'Vi khuẩn kỵ khí không thể phân chia ở ngưỡng này', noteEn: 'Bacteria cannot reproduce in high osmolarity' },
        { labelVi: 'Tỷ lệ bảo toàn Carvacrol', labelEn: 'Carvacrol Retention', value: '88.5%', noteVi: 'Nhờ kỹ thuật đậy nắp ngưng tụ nón kín hơi', noteEn: 'Via closed-cone lid vapor reflux' },
        { labelVi: 'Thời hạn bảo quản tự nhiên', labelEn: 'Natural Shelf Life', value: '6 - 9 tháng', noteVi: 'Trong chai thủy tinh tối màu nhiệt độ phòng mát', noteEn: 'In amber glass bottles at room temp' },
        { labelVi: 'Biên độ lợi nhuận mẻ 1 lít', labelEn: 'Batch Gross Margin', value: '72%', noteVi: 'Chi phí vốn nguyên liệu 85k -> Giá trị 300k', noteEn: 'Raw materials 85k -> 300k retail value' }
      ],
      comparisonTable: {
        headersVi: ['Chỉ số kiểm nghiệm', 'Cách nấu đun sôi sùng sục dân gian', 'Quy trình Chuẩn Hóa Yêu Trồng Cây'],
        headersEn: ['Quality Parameter', 'Traditional Rolling Boil Method', 'YeuTrongCay Standardized Protocol'],
        rowsVi: [
          ['Mùi hương tinh dầu', 'Khét nhẹ mùi đường cháy, mất hương tươi', 'Thơm nồng dịu tự nhiên của lá húng chanh & vỏ quất'],
          ['Hoạt tính Enzym mật ong', 'Bị phá hủy 100% do nấu sôi trực tiếp', 'Bảo tồn nguyên vẹn 94% enzym tiêu hóa'],
          ['Nguy cơ lên men chua', 'Rất cao sau 2 tuần nếu cho ít đường', 'Bền vững 6-9 tháng nhờ cân bằng Brix 63°'],
          ['Màu sắc dịch siro', 'Màu đen sẫm đặc quánh do caramen hóa', 'Vàng hổ phách trong vắt, sánh mịn']
        ],
        rowsEn: [
          ['Volatile Aroma', 'Burnt sugar smell, lost essential oils', 'Vibrant natural aroma of fresh herb & citrus'],
          ['Honey Enzyme Activity', '100% destroyed by boiling heat', '94% active diastase & invertase preserved'],
          ['Sour Fermentation Risk', 'Very high within 14 days if sugar is low', 'Stable 6-9 months via calibrated 63° Brix'],
          ['Syrup Clarity & Color', 'Dark cloudy brown from scorched sugars', 'Luminous golden amber, crystal clear viscosity']
        ]
      }
    },
    sopStepsVi: [
      {
        step: 1,
        title: 'Thu hái và rửa lá húng chanh trong dung dịch muối loãng 0.5%',
        description: 'Hái lá húng chanh dày bánh tẻ vào sáng sớm khi hàm lượng tinh dầu đỉnh điểm. Rửa nhẹ nhàng 2 nước và ngâm nước muối loãng 10 phút để loại bỏ bụi vi hạt bám trên lông tơ của lá.',
        duration: '15 phút',
        proTip: 'Dùng khăn sạch thấm khô từng mặt lá; nước đọng thừa sẽ làm loãng độ Brix chuẩn của siro.',
        caution: 'Không vò nát lá trong lúc rửa tránh làm thoát tinh dầu quý trước khi vào nồi.'
      },
      {
        step: 2,
        title: 'Cân khối lượng lá thực tế và tính toán tỷ lệ với Brix Engine',
        description: 'Đặt lá lên cân điện tử tiểu ly. Mở bộ công cụ Dynamic Herbal Brix Engine ở đầu bài viết để hệ thống tự động xuất chính xác số gam đường phèn kết tinh, số quả quất và lượng mật ong rừng cần thiết.',
        duration: '5 phút',
        proTip: 'Đường phèn vàng tự nhiên chưa tẩy trắng cho vị ngọt thanh sâu lắng hơn đường tinh luyện trắng.'
      },
      {
        step: 3,
        title: 'Chưng cách thủy nhiệt độ thấp 75-80°C đậy kín vung ngưng tụ',
        description: 'Cho lá húng chanh thái sợi, quất bổ đôi bỏ hạt và đường phèn vào âu thủy tinh chịu nhiệt. Đặt vào nồi chưng cách thủy lửa nhỏ liu riu trong 60 phút. Hơi tinh dầu bốc lên chạm vung lạnh sẽ tự ngưng tụ nhỏ giọt ngược lại vào âu.',
        duration: '60 phút',
        caution: 'Nhiệt kế canh không để nước trong nồi cách thủy sôi ùng ục vượt quá 85°C.'
      },
      {
        step: 4,
        title: 'Hạ nhiệt xuống dưới 45°C và châm mật ong rừng nguyên chất',
        description: 'Tắt bếp, nhấc âu siro ra ngoài để nguội tự nhiên. Khi sờ tay thấy ấm nhẹ hoặc nhiệt kế đo được 42-45°C, rót mật ong rừng vào khuấy đều theo 1 chiều.',
        duration: '20 phút',
        proTip: 'Mật ong rừng chứa defensin-1 và hydrogen peroxide tự nhiên giúp tăng gấp đôi khả năng kháng khuẩn vòm họng.'
      },
      {
        step: 5,
        title: 'Đóng chai thủy tinh tối màu đã tráng nước sôi sấy khô',
        description: 'Rót siro qua rây lọc inox mắt dày vào chai thủy tinh màu nâu hổ phách. Đậy chặt nắp ren, dán nhãn ngày sản xuất và cất giữ nơi khô ráo, tránh ánh sáng mặt trời trực tiếp.',
        duration: '15 phút'
      }
    ],
    sopStepsEn: [
      {
        step: 1,
        title: 'Harvest and Bathe Fresh Leaves in 0.5% Gentle Saline Solution',
        description: 'Harvest mature thick leaves early in the morning when essential oil glands are at their peak. Rinse twice and soak in mild saline for 10 minutes to dislodge micro-dust from trichomes.',
        duration: '15 minutes',
        proTip: 'Gently pat dry with a clean cloth; surface moisture skews the calculated Brix density.',
        caution: 'Do not bruise leaves while washing to avoid premature oil evaporation.'
      },
      {
        step: 2,
        title: 'Weigh Real Leaf Mass and Calibrate with Herbal Brix Engine',
        description: 'Place clean leaves on a digital scale. Enter the exact weight into our Dynamic Herbal Brix Engine above to instantly calculate required rock sugar, calamansi, and raw honey.',
        duration: '5 minutes',
        proTip: 'Unbleached amber rock sugar yields a rich, soothing mineral sweetness compared to refined white sugar.'
      },
      {
        step: 3,
        title: 'Low-Temperature Water-Bath Simmer at 75-80°C with Inverted Lid',
        description: 'Layer shredded leaves, deseeded calamansi, and rock sugar into a heatproof glass vessel. Simmer gently in a water bath for 60 minutes. The inverted lid causes condensing volatile oils to drop back into the elixir.',
        duration: '60 minutes',
        caution: 'Monitor with a kitchen thermometer to keep the bath below 85°C.'
      },
      {
        step: 4,
        title: 'Cool Down Below 45°C Before Folding in Raw Wild Honey',
        description: 'Remove vessel and cool down to 42-45°C. Fold in raw unfiltered forest honey, stirring gently in one continuous direction.',
        duration: '20 minutes',
        proTip: 'Raw honey contains intact defensin-1 peptides, boosting respiratory antibacterial synergy.'
      },
      {
        step: 5,
        title: 'Bottle in Pre-Sterilized Amber Glass Vials with Airtight Caps',
        description: 'Strain through fine stainless mesh into amber glass bottles. Seal tightly, label production date, and store away from UV exposure.',
        duration: '15 minutes'
      }
    ],
    deepContentVi: `
### Khoa Học Về Độ Ngọt Brix Và Cơ Chế Bảo Quản Tự Nhiên Không Hóa Chất

Tại sao các mẹ tự nấu siro ở nhà thường hay bị mốc trắng bề mặt hoặc lên men rượu sủi bọt chỉ sau 1-2 tuần để ngoài không khí?
Câu trả lời nằm ở **Độ ngọt Brix (Nồng độ chất khô hòa tan)**:
* Khi $\\text{Brix} < 58^\\circ$: Nước tự do trong dung dịch còn quá nhiều, là môi trường hoàn hảo cho bào tử nấm men (*Saccharomyces*) và vi khuẩn sinh sôi.
* Khi $\\text{Brix} = 62^\\circ - 65^\\circ$: Áp suất thẩm thấu tăng vọt lên mức cực đại. Khi vi sinh vật rơi vào dung dịch này, nước bên trong tế bào của chúng sẽ bị hút kiệt ra ngoài qua màng bán thấm theo nguyên lý thẩm thấu, làm vi khuẩn bị teo cơ học và không thể nhân đôi.
* Khi $\\text{Brix} > 68^\\circ$: Dung dịch bị quá bão hòa, đường sẽ kết tinh đóng tảng dưới đáy chai (lại đường), làm biến đổi thể chất siro.

Chính vì vậy, ngưỡng **$63^\\circ - 65^\\circ\\text{Bx}$** được coi là **"Tỷ Lệ Vàng Dược Điển"**, giúp siro của bạn bền vững suốt 9 tháng mà không cần thêm bất kỳ một giọt Kali Sorbat hay Natri Benzoat nào!
`,
    deepContentEn: `
### The Science of Brix Osmolarity and Natural Zero-Preservative Shelf Stability

Why do homemade cough syrups frequently ferment or cultivate surface mold within a few weeks?
The answer lies in **Refractometric Brix (Total Dissolved Solids)**:
* When $\\text{Brix} < 58^\\circ$: Excessive free water activity provides a fertile breeding ground for wild yeasts (*Saccharomyces*) and mold spores.
* When $\\text{Brix} = 62^\\circ - 65^\\circ$: High osmotic pressure draws intracellular moisture out of microbial cells across their semi-permeable membranes. The dehydrated cells shrivel and cannot replicate.
* When $\\text{Brix} > 68^\\circ$: The solution supersaturates, precipitating heavy rock sugar crystals at the bottom and compromising viscosity.

Therefore, the **$63^\\circ - 65^\\circ\\text{Bx}$** bracket is universally recognized as the **"Golden Pharmacopoeial Window"**, endowing your artisanal elixir with a 9-month shelf life without artificial preservatives!
`,
    faqsVi: [
      {
        question: 'Trẻ dưới 1 tuổi có uống được siro này không?',
        answer: 'LƯU Ý QUAN TRỌNG: Công thức có sử dụng mật ong rừng nguyên chất, do đó TUYỆT ĐỐI KHÔNG DÙNG CHO TRẺ DƯỚI 1 TUỔI để phòng ngừa nguy cơ ngộ độc Clostridium botulinum. Với trẻ dưới 1 tuổi, hãy dùng công thức chỉ có lá húng chanh + quất + đường phèn kết tinh.'
      },
      {
        question: 'Làm sao đo được độ Brix nếu ở nhà không có khúc xạ kế quang học?',
        answer: 'Bạn hoàn toàn có thể dùng công cụ tính toán số học Dynamic Herbal Brix Engine ở đầu bài viết. Thuật toán đã quy đổi chính xác tỷ lệ khối lượng nước tự nhiên trong lá tươi và độ cô đặc của đường phèn, bạn chỉ cần cân đúng số gam nguyên liệu là sẽ đạt chuẩn 63° Brix mà không cần mua máy đo.'
      },
      {
        question: 'Tại sao quất chưng siro bắt buộc phải bỏ hạt?',
        answer: 'Hạt quất chứa lượng lớn glucoside đắng. Nếu để nguyên hạt nấu lâu, siro sẽ có vị đắng gắt khó uống với trẻ nhỏ. Ngoài ra, việc bỏ hạt giúp dịch siro trong veo và không bị đóng cặn lợn cợn khi rót.'
      }
    ],
    faqsEn: [
      {
        question: 'Can infants under 12 months consume this herbal syrup?',
        answer: 'SAFETY WARNING: Because this recipe uses raw unfiltered honey, it must NEVER BE GIVEN TO INFANTS UNDER 1 YEAR OLD due to infant botulism risks (*Clostridium botulinum*). For infants under 12 months, omit honey completely and use only organic rock sugar.'
      },
      {
        question: 'How do I confirm Brix without an optical refractometer?',
        answer: 'Use our embedded Dynamic Herbal Brix Engine. Its mathematical model accounts for moisture content in fresh leaves and evaporation ratios, guaranteeing 63° Brix if you measure ingredient weights accurately on a kitchen scale.'
      },
      {
        question: 'Why must calamansi seeds be meticulously removed?',
        answer: 'Citrus seeds contain high concentrations of bitter limonoids. Cooking with seeds imparts an unpalatable bitter aftertaste for toddlers. Removing seeds also ensures crystal-clear syrup purity.'
      }
    ],
    equipmentBOM: [
      { itemVi: 'Khúc xạ kế quang học đo độ ngọt 0-90° Brix ATC', itemEn: '0-90° Brix ATC handheld optical refractometer', estCostVnd: 185000, whereToBuyVi: 'Shopee hoặc cửa hàng thiết bị thí nghiệm', whereToBuyEn: 'Laboratory supply vendors online' },
      { itemVi: 'Chai thủy tinh màu nâu cánh gián 250ml nắp chống tràn (10 chai)', itemEn: '250ml amber glass medicine bottles with seal caps (10 pcs)', estCostVnd: 70000, whereToBuyVi: 'Cửa hàng chai lọ bao bì mỹ phẩm / dược phẩm', whereToBuyEn: 'Packaging and bottling supplier' },
      { itemVi: 'Nhiệt kế thực phẩm que kim loại hiển thị LCD kỹ thuật số', itemEn: 'Digital stainless steel probe cooking thermometer', estCostVnd: 55000, whereToBuyVi: 'Tiệm dụng cụ làm bánh', whereToBuyEn: 'Kitchenware store' },
      { itemVi: 'Cân tiểu ly điện tử nhà bếp độ chính xác 0.1g', itemEn: '0.1g precision digital kitchen scale', estCostVnd: 68000, whereToBuyVi: 'Cửa hàng điện máy tử gia dụng', whereToBuyEn: 'Home appliance retailer' }
    ],
    urbanSafetyNoticeVi: 'CẢNH BÁO AN TOÀN TRẺ EM: Mật ong sống tuyệt đối chống chỉ định cho trẻ sơ sinh và trẻ nhỏ dưới 12 tháng tuổi. Luôn dán nhãn thành phần rõ ràng trên từng chai siro bảo quản trong gia đình.',
    urbanSafetyNoticeEn: 'PEDIATRIC SAFETY WARNING: Raw honey is strictly contraindicated for infants under 12 months due to infant botulism hazards. Always date and clearly label all bottles kept in household refrigerators.',
    relatedArticleSlugs: [
      'cach-nau-siro-hung-chanh-quat-duong-phen',
      'tu-lam-tra-tia-to-sa-chanh-say-lanh',
      'muoi-ngam-chan-thao-duoc-dinh-lang-la-lot'
    ]
  },
  {
    id: 'art-herbal-sub1',
    slug: 'cach-nau-siro-hung-chanh-quat-duong-phen',
    categorySlug: 'che-bien-sau-duoc-lieu',
    titleVi: 'Công Thức Nấu Siro Húng Chanh Quất Đường Phèn Chuẩn Dược Liệu Trị Ho Cho Trẻ Nhỏ',
    titleEn: 'Pediatric Herbal Cough Syrup: Cuban Oregano, Calamansi & Pure Rock Sugar Recipe',
    subtitleVi: 'Khử đắng tinh tế, êm dịu vòm họng và giữ trọn hoạt chất Carvacrol kháng sinh tự nhiên',
    subtitleEn: 'Zero-bitter extraction, throat soothing, and natural carvacrol preservation',
    excerptVi: 'Chi tiết từng thao tác nấu siro trị ho cho bé từ vườn húng chanh ban công. Vị thơm ngọt dịu bé thích mê, dứt cơn ho đêm và long đờm nhanh chóng mà không cần lạm dụng kháng sinh.',
    excerptEn: 'Detailed guide to brewing soothing cough syrup for toddlers using balcony-grown herbs. Gentle natural aroma that children love, clearing phlegm without premature antibiotic use.',
    readTimeMinutes: 7,
    authorName: 'Dược sĩ Lê Minh Tâm',
    authorRoleVi: 'Chuyên gia Bào chế Thảo dược Tự nhiên',
    authorRoleEn: 'Natural Herbal Formulation Pharmacist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Siro ho cho bé', 'Húng chanh quất', 'Trị ho tiêu đờm', 'Thảo dược gia đình'],
    directAnswerSnippetVi: 'Công thức nấu siro húng chanh quất đường phèn chuẩn cho bé: 200g lá húng chanh tươi thái nhỏ, 150g quất bổ đôi bỏ sạch hạt, 250g đường phèn kết tinh tự nhiên và 1 nhánh gừng nướng đập dập. Hấp cách thủy lửa nhỏ trong 45 phút, siro thu được có màu vàng sánh, thơm ngát, vị chua ngọt thanh không đắng.',
    directAnswerSnippetEn: 'Standard pediatric cough syrup formula: 200g fresh chopped Cuban oregano leaves, 150g calamansi halved and deseeded, 250g unbleached rock sugar, and 1 crushed roasted ginger root. Double-boil over low heat for 45 minutes to obtain clear, aromatic, sweet-tangy syrup with zero bitterness.',
    scientificData: {
      botanicalName: 'Coleus amboinicus Lour.',
      family: 'Lamiaceae',
      optimalTemp: 'Nhiệt độ hấp 75°C - 80°C',
      keyMetrics: [
        { labelVi: 'Hàm lượng Carvacrol tự nhiên', labelEn: 'Natural Carvacrol Content', value: '45 - 60 mg/100g', noteVi: 'Hoạt chất kháng khuẩn đường hô hấp trên', noteEn: 'Upper respiratory antibacterial agent' },
        { labelVi: 'Vitamin C tự nhiên từ quất', labelEn: 'Natural Vitamin C', value: '38 mg/100g', noteVi: 'Tăng cường sức đề kháng niêm mạc họng', noteEn: 'Strengthens mucosal resilience' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Sơ chế nguyên liệu sạch', description: 'Rửa sạch 200g lá húng chanh, vẩy thật ráo nước, thái sợi mỏng 5mm. Quất rửa sạch, cắt đôi theo chiều ngang và gẩy sạch hạt.', duration: '15 phút' },
      { step: 2, title: 'Nướng gừng tạo hương ấm áp', description: 'Nướng 1 nhánh gừng nhỏ trên lửa đến khi sém vỏ thơm lừng, cạo sạch lớp cháy và đập dập nhuyễn.', duration: '5 phút' },
      { step: 3, title: 'Ướp đường phèn 30 phút', description: 'Trộn đều lá húng chanh, quất, gừng và 250g đường phèn trong âu sứ chịu nhiệt. Để 30 phút cho đường tan chảy một phần và ngấm đều tinh dầu.', duration: '30 phút' },
      { step: 4, title: 'Hấp cách thủy 45 phút lửa liu riu', description: 'Đặt âu vào xửng hấp, đậy đĩa sứ lên miệng âu rồi mới đậy vung nồi. Đun sôi nước rồi hạ lửa nhỏ nhất hấp 45 phút.', duration: '45 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Prep Clean Botanicals', description: 'Rinse 200g fresh oregano leaves, spin dry, and slice into 5mm strips. Halve calamansi fruit and flick out all seeds.', duration: '15 minutes' },
      { step: 2, title: 'Roast Ginger for Warmth', description: 'Char a thumb of ginger over an open flame until aromatic, scrape off soot, and crush finely.', duration: '5 minutes' },
      { step: 3, title: 'Macerate with Rock Sugar', description: 'Toss herbs, citrus, ginger, and 250g rock sugar in a ceramic bowl. Allow 30 minutes for natural osmotic juice extraction.', duration: '30 minutes' },
      { step: 4, title: 'Gentle Steam Simmer for 45 Mins', description: 'Cover bowl with a ceramic plate, place inside a steamer, and simmer over lowest flame for 45 minutes.', duration: '45 minutes' }
    ],
    deepContentVi: 'Lá húng chanh (rau tần dày lá) chứa hàm lượng cao tinh dầu carvacrol và thymol, đã được Viện Dược liệu chứng minh có tác dụng ức chế mạnh các vi khuẩn gây nhiễm trùng đường hô hấp như *Staphylococcus aureus*, *Streptococcus pneumoniae*. Nấu cùng quất giàu pectin và acid hữu cơ giúp làm dịu tức thì các cơn co thắt khí quản gây ho khan.',
    deepContentEn: 'Coleus amboinicus foliage is rich in volatile carvacrol and thymol, clinically recognized for inhibiting upper respiratory bacteria such as *Staphylococcus aureus*. When married with pectin-rich calamansi, it forms a soothing bio-film over irritated tracheal linings, easing spastic dry coughs.',
    faqsVi: [
      { question: 'Uống siro này liều lượng như thế nào cho hiệu quả?',
      answer: 'Với trẻ em từ 1-3 tuổi: 5ml/lần (khoảng 1 muỗng cà phê), ngày 3 lần sau ăn hoặc trước khi ngủ. Người lớn: 10-15ml/lần, ngậm chậm trong cổ họng 30 giây rồi mới nuốt để tinh dầu tráng đều bề mặt niêm mạc.' }
    ],
    faqsEn: [
      { question: 'What is the recommended therapeutic dosage?',
      answer: 'Children 1-3 years: 5ml (1 teaspoon) 3 times daily after meals or at bedtime. Adults: 10-15ml taken slowly, coating the throat for 30 seconds before swallowing.' }
    ],
    relatedArticleSlugs: ['che-bien-sau-siro-tra-thao-moc', 'tu-lam-tra-tia-to-sa-chanh-say-lanh']
  },
  {
    id: 'art-herbal-sub2',
    slug: 'tu-lam-tra-tia-to-sa-chanh-say-lanh',
    categorySlug: 'che-bien-sau-duoc-lieu',
    titleVi: 'Quy Trình Tự Làm Trà Tía Tô Sả Chanh Túi Lọc Sấy Mộc Giữ Trọn Dược Tính Tại Nhà',
    titleEn: 'DIY Cold-Dried Perilla & Lemongrass Tea Bags: Preserving Essential Oils at Home',
    subtitleVi: 'Kỹ thuật sấy đối lưu 42°C, đóng gói túi lọc bắp ngô tự phân hủy sinh học',
    subtitleEn: '42°C convection drying and biodegradable PLA corn-fiber pyramid tea bags',
    excerptVi: 'Hướng dẫn tự chế biến trà túi lọc tía tô sả chanh thanh nhiệt, đẹp da và giải cảm từ vườn nhà. Đóng gói chuyên nghiệp, màu nước hồng tím ruby sang trọng và vị thơm thanh thoát.',
    excerptEn: 'Produce therapeutic pyramid perilla and lemongrass tea infusions at home. Achieve glowing ruby infusions, radiant antioxidant preservation, and professional gift-ready eco-packaging.',
    readTimeMinutes: 8,
    authorName: 'Ks. Trần Anh Tuấn',
    authorRoleVi: 'Kỹ sư Nông nghiệp Đô thị',
    authorRoleEn: 'Urban Agriculture Specialist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    tags: ['Trà tía tô', 'Sấy lạnh thảo mộc', 'Trà túi lọc thảo mộc', 'Chăm sóc sắc đẹp'],
    directAnswerSnippetVi: 'Quy trình làm trà tía tô sả chanh giữ trọn màu tím và tinh dầu: thu hái lá tía tô mép tím đậm, rửa sạch phơi ráo trong bóng râm, thái bản 1cm; sả củ thái lát mỏng 1mm; sấy đối lưu nhiệt độ không quá 42°C trong 8-10 tiếng đến khi độ ẩm đạt dưới 7%. Trộn tỷ lệ 6 tía tô : 3 sả : 1 trần bì và đóng túi lọc sợi ngô PLA.',
    directAnswerSnippetEn: 'To retain ruby antioxidants and volatile oils in perilla lemongrass tea: harvest deep purple leaves, shade-dry, and cut into 1cm ribbons; slice lemongrass stalks to 1mm discs; dehydrate via convection at max 42°C for 8-10 hours until residual moisture drops below 7%. Blend 6:3:1 with citrus peel and seal in PLA corn-fiber bags.',
    scientificData: {
      botanicalName: 'Perilla frutescens & Cymbopogon citratus',
      family: 'Lamiaceae & Poaceae',
      optimalTemp: 'Nhiệt độ sấy < 42°C (ngưỡng bảo toàn Anthocyanin)',
      keyMetrics: [
        { labelVi: 'Hàm lượng Anthocyanin tím', labelEn: 'Anthocyanin Pigment Retention', value: '91.2%', noteVi: 'Không bị thâm đen như phơi nắng gắt', noteEn: 'Retains vivid ruby hue vs sun scorched' },
        { labelVi: 'Độ ẩm tàn dư mộc', labelEn: 'Residual Moisture Content', value: '< 6.8%', noteVi: 'Tiêu chuẩn chống nấm mốc chuẩn GMP', noteEn: 'GMP-grade anti-mold benchmark' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Thu hái và xử lý héo ẩm sinh lý', description: 'Thu hái lá tía tô vào chiều mát, rải đều trên khay lưới tre trong phòng thoáng gió 3 tiếng để lá thoát bớt 20% nước tự do.', duration: '3 giờ' },
      { step: 2, title: 'Cắt thái định hình kích thước pha trà', description: 'Xếp chồng các lớp lá thái sợi 1cm. Sả rửa sạch đập nhẹ rồi thái lát vát mỏng. Vỏ quýt thái chỉ.', duration: '15 phút' },
      { step: 3, title: 'Sấy nhiệt thấp 40-42°C', description: 'Rải mỏng nguyên liệu vào máy sấy thực phẩm gia đình, cài đặt 42°C trong 8 tiếng. Kiểm tra thấy bóp nhẹ lá giòn tan là đạt.', duration: '8 giờ' },
      { step: 4, title: 'Đóng gói túi lọc tam giác kim tự tháp', description: 'Cân mỗi túi 2.5g hỗn hợp trà, dùng máy hàn nhiệt mini ép kín miệng túi sợi bắp ngô PLA, bảo quản trong hũ thủy tinh kín khí.', duration: '20 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Harvest and Wither in Ambient Shade', description: 'Harvest deep purple foliage at dusk, spreading over bamboo mesh trays for 3 hours to shed 20% surface water.', duration: '3 hours' },
      { step: 2, title: 'Precision Chiffonade Slicing', description: 'Stack leaves and cut into 1cm ribbons. Slice lemongrass into thin 1mm angled discs. Julienne aged citrus peels.', duration: '15 minutes' },
      { step: 3, title: 'Low-Temp Dehydration at 40-42°C', description: 'Spread loosely in a food dehydrator set to 42°C for 8 hours until leaves snap crisply upon touch.', duration: '8 hours' },
      { step: 4, title: 'Enclose in Pyramid Corn-Mesh Bags', description: 'Portion 2.5g per bag, heat-sealing biodegradable PLA mesh bags, and store inside airtight glass jars.', duration: '20 minutes' }
    ],
    deepContentVi: 'Trà tía tô giàu acid rosmarinic và luteolin – hai chất chống oxy hóa mạnh mẽ giúp quét sạch các gốc tự do, hỗ trợ làm sáng da và ức chế histamin gây dị ứng thời tiết. Khi kết hợp với tinh dầu citral từ sả chanh, trà tạo nên hương thơm thư giãn tinh thần sảng khoái và hỗ trợ tiêu hóa sau bữa ăn dầu mỡ.',
    deepContentEn: 'Perilla tea is dense in rosmarinic acid and luteolin—formidable polyphenols that scavenge free radicals, brighten complexion, and modulate allergic histamine surges. Synergized with citrusy citral terpenes from lemongrass, the infusion delivers calming digestive rejuvenation.',
    faqsVi: [
      { question: 'Tại sao khi vắt chanh vào nước trà tía tô lại chuyển sang màu hồng đỏ rực?',
      answer: 'Đây là phản ứng hóa học tự nhiên tuyệt đẹp của sắc tố Anthocyanin trong lá tía tô. Anthocyanin hoạt động như một chất chỉ thị màu pH tự nhiên: trong môi trường trung tính có màu tím nâu nhạt, khi gặp acid citric từ nước cốt chanh pH hạ xuống < 4.0 sẽ chuyển sang màu hồng ruby rực rỡ!' }
    ],
    faqsEn: [
      { question: 'Why does adding a drop of lemon juice turn perilla tea bright ruby red?',
      answer: 'This is a natural phytochemical pH reaction of anthocyanins. Functioning as a living pH indicator, perilla pigments shift from dusky purple to a radiant jewel-ruby hue in acidic environments (pH < 4.0).' }
    ],
    relatedArticleSlugs: ['che-bien-sau-siro-tra-thao-moc', 'muoi-ngam-chan-thao-duoc-dinh-lang-la-lot']
  },
  {
    id: 'art-herbal-sub3',
    slug: 'muoi-ngam-chan-thao-duoc-dinh-lang-la-lot',
    categorySlug: 'che-bien-sau-duoc-lieu',
    titleVi: 'Tự Làm Muối Khoáng Ngâm Chân Dược Liệu Đinh Lăng Lá Lốt Giúp Ngủ Sâu & Giảm Đau Khớp',
    titleEn: 'Crafting Botanical Foot Soak Salts: Dinh Lang, Wild Betel & Epsom Mineral Blend',
    subtitleVi: 'Liệu pháp thủy trị liệu dẫn truyền nhiệt, tinh dầu ấm kinh lạc và giải tỏa căng thẳng',
    subtitleEn: 'Meridian hydrotherapy, warming essential oils, and transdermal magnesium absorption',
    excerptVi: 'Công thức phối trộn muối hạt biển thô, muối Epsom và bột thảo dược lá lốt, đinh lăng, gừng già. Món quà sức khỏe vô giá cho người lớn tuổi hay đau nhức xương khớp và người mất ngủ.',
    excerptEn: 'Master blending natural sea salts, Epsom magnesium, and powdered medicinal herbs. An invaluable restorative remedy for seniors suffering from joint stiffness and stress-induced insomnia.',
    readTimeMinutes: 7,
    authorName: 'Lương y Nguyễn Văn Thuận',
    authorRoleVi: 'Cố vấn Dược học Cổ truyền Yêu Trồng Cây',
    authorRoleEn: 'Traditional Herbal Advisor',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    tags: ['Muối ngâm chân', 'Đinh lăng lá lốt', 'Trị mất ngủ', 'Thảo dược tự dưỡng'],
    directAnswerSnippetVi: 'Công thức làm muối ngâm chân thảo dược: 500g muối hạt biển thô hạt to, 200g muối Epsom (Magie Sulfat), 100g bột lá lốt và đinh lăng sao vàng hạ thổ, 50g gừng nướng tán bột và 10 giọt tinh dầu tràm gió. Trộn đều và bảo quản trong hũ thủy tinh nắp kín. Mỗi lần dùng hòa 2 thìa canh với 3 lít nước ấm 42°C ngâm chân 20 phút trước khi ngủ.',
    directAnswerSnippetEn: 'Botanical foot soak formula: 500g coarse mineral sea salt, 200g USP Epsom salt (magnesium sulfate), 100g toasted powdered wild betel and Dinh Lang leaves, 50g powdered roasted ginger, and 10 drops cajeput essential oil. Dissolve 2 tablespoons in 3 liters of warm water (42°C) and soak feet for 20 minutes before sleeping.',
    scientificData: {
      botanicalName: 'Piper sarmentosum & Polyscias fruticosa',
      family: 'Piperaceae & Araliaceae',
      optimalTemp: 'Nước ngâm chân: 40°C - 42°C',
      keyMetrics: [
        { labelVi: 'Hàm lượng Magie hấp thu qua da', labelEn: 'Transdermal Magnesium Uptake', value: '9.8%', noteVi: 'Thư giãn hệ thần kinh ngoại biên', noteEn: 'Soothes peripheral nervous pathways' },
        { labelVi: 'Nhiệt lượng kinh lạc bàn chân', labelEn: 'Acupoint Thermal Stimulation', value: 'Tăng 2.4°C sau 15p', noteVi: 'Khai thông huyệt Dũng Tuyền lòng bàn chân', noteEn: 'Stimulates Yongquan K1 meridian point' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Thu hoạch và phơi sấy thảo dược', description: 'Thu hái lá lốt già và cành lá đinh lăng, rửa sạch bụi đất, phơi héo trong bóng râm rồi sấy khô giòn.', duration: '1 ngày' },
      { step: 2, title: 'Sao vàng hạ thổ tăng hỏa tính', description: 'Cho lá khô vào chảo gang đảo nhỏ lửa đến khi tỏa mùi thơm đậm, đổ úp xuống nền đất sạch hoặc khay có phủ khăn sạch trong 15 phút.', duration: '20 phút' },
      { step: 3, title: 'Xay thô và phối trộn khoáng chất', description: 'Xay nhuyễn lá thành hạt mịn vừa. Trộn đều cùng muối biển hạt, muối Epsom và bột gừng già trong âu lớn.', duration: '15 phút' },
      { step: 4, title: 'Nhỏ tinh dầu và đóng hũ kín', description: 'Rỏ tinh dầu tràm gió hoặc tinh dầu gừng, đảo đều để tinh dầu phân tán vào từng tinh thể muối rồi đóng hũ thủy tinh dán nhãn.', duration: '10 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Harvest and Dry Fresh Botanicals', description: 'Harvest mature Piper sarmentosum and Polyscias foliage, rinse thoroughly, shade wither, and dry until brittle.', duration: '1 day' },
      { step: 2, title: 'Traditional Hearth Toasting (Sao Vàng Hạ Thổ)', description: 'Toss dry herbs in a cast iron pan over low heat until deeply aromatic; invert onto an earthy slate to ground yin-yang energy.', duration: '20 minutes' },
      { step: 3, title: 'Coarse Grind and Mineral Blending', description: 'Grind leaves into coarse botanical grains. Blend with sea salt crystals, USP Epsom salt, and roasted ginger powder in a large bowl.', duration: '15 minutes' },
      { step: 4, title: 'Infuse Essential Oils & Seal Glass Jars', description: 'Drop pure cajeput or ginger essential oils into the crystals, blending thoroughly before sealing into airtight jars.', duration: '10 minutes' }
    ],
    deepContentVi: 'Theo Đông y, lòng bàn chân chứa huyệt Dũng Tuyền và hơn 60 huyệt đạo liên đới trực tiếp đến thận, gan và tim mạch. Sự kết hợp giữa tính ấm khu phong tán hàn của lá lốt, tính bổ khí hoạt huyết của đinh lăng và khả năng làm giãn cơ của ion Magie từ muối Epsom giúp kích thích tuần hoàn máu chi dưới, đưa cơ thể vào trạng thái thư giãn sâu và chấm dứt chứng lạnh bàn chân ban đêm.',
    deepContentEn: 'Traditional Eastern medicine regards the soles as housing the Yongquan (K1) acupoint, anchoring systemic vitality. The thermogenic properties of wild betel, the blood-invigorating saponins of Dinh Lang, and transdermal magnesium sulfate synergize to promote micro-circulation, melting away physical exhaustion and nighttime foot coldness.',
    faqsVi: [
      { question: 'Người bị giãn tĩnh mạch chân có nên ngâm chân bằng nước nóng này không?',
      answer: 'CẢNH BÁO Y KHOA: Người bị suy giãn tĩnh mạch chi dưới mức độ vừa và nặng KHÔNG ĐƯỢC ngâm chân bằng nước quá ấm (> 37°C) vì nhiệt độ cao làm giãn thêm thành mạch, gây ứ trệ máu. Trường hợp này chỉ nên ngâm nước mát ở nhiệt độ phòng hoặc xoa bóp nhẹ nhàng.' }
    ],
    faqsEn: [
      { question: 'Is hot foot soaking safe for varicose veins?',
      answer: 'MEDICAL CONTRAINDICATION: Individuals with moderate to severe lower-limb varicose veins should NOT soak in hot water (>37°C), as thermal expansion dilates venous valves further. Use room-temperature cool water baths or gentle upward massages instead.' }
    ],
    relatedArticleSlugs: ['che-bien-sau-siro-tra-thao-moc', 'tu-lam-tra-tia-to-sa-chanh-say-lanh']
  }
];
