import { ArticleFullContent } from '../types';

export const CIRCULAR_ARTICLES: ArticleFullContent[] = [
  {
    id: 'art-circular-pillar',
    slug: 'kinh-te-tuan-hoan-nuoi-trun-que-ban-cong',
    categorySlug: 'kinh-te-tuan-hoan',
    titleVi: 'Khép Kín Vòng Dinh Dưỡng: Biến 100% Rác Thải Nhà Bếp Thành Phân Trùn Quế & Trà Trùn Vi Sinh',
    titleEn: 'Closing the Urban Nutrient Loop: 100% Kitchen Waste to Living Vermicompost & Microbe Tea',
    subtitleVi: 'Cân bằng tỷ lệ C:N 25-30:1, triệt tiêu khí Amoniac và tự chủ phân bón hữu cơ sinh học tại gia',
    subtitleEn: 'Balancing 25-30:1 C:N ratio, zero ammonia gas generation, and urban organic bio-fertilizer autonomy',
    excerptVi: 'Hướng dẫn toàn diện về kinh tế tuần hoàn quy mô hộ gia đình. Tái chế toàn bộ vỏ rau củ, bã cà phê thành phân trùn quế nguyên chất giàu acid humic và dịch trà trùn vi sinh siêu bổ dưỡng.',
    excerptEn: 'Master household circular bio-economy. Convert vegetable scraps and coffee grounds into humic-rich organic vermicompost and probiotic worm tea without odors.',
    readTimeMinutes: 13,
    authorName: 'Ks. Đào Duy Nam',
    authorRoleVi: 'Chuyên gia Vi sinh & Kinh tế Sinh thái Tuần hoàn',
    authorRoleEn: 'Microbiology & Circular Bio-Economy Specialist',
    lastUpdated: '2026-11-08',
    isPillar: true,
    interactiveEngineId: 'biowaste-cn-balancer',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    tags: ['Kinh tế tuần hoàn', 'Nuôi trùn quế', 'Phân trùn quế', 'Ủ rác không mùi', 'Trà trùn vi sinh'],
    directAnswerSnippetVi: 'Kinh tế tuần hoàn tại ban công khép kín bằng cách cân bằng tỷ lệ C:N từ 25:1 đến 30:1 trong thức ăn nuôi trùn quế Eisenia fetida. Mỗi phần rác ướt giàu Nitơ (vỏ rau củ, bã cà phê) phải được phủ bằng 2 phần rác nâu giàu Carbon (bìa carton vụn, xơ dừa) để triệt tiêu mùi amoniac, thu về 10-15kg phân trùn đen mịn và 5 lít dịch trà trùn vi sinh mỗi tháng.',
    directAnswerSnippetEn: 'Balcony circular economy closes by maintaining a 25:1 to 30:1 C:N ratio feeding Eisenia fetida earthworms. Every portion of moist Nitrogen-rich kitchen scraps must be capped with two portions of dry Carbon browns (shredded cardboard, coir) to neutralize ammonia odors, generating 10-15kg black casting humus and 5 liters of living worm tea monthly.',
    scientificData: {
      botanicalName: 'Eisenia fetida (Trùn quế / Red Wiggler)',
      optimalTemp: '20°C - 28°C (kỵ nhiệt độ > 35°C)',
      optimalHumidity: '70% - 80% (độ ẩm như miếng mút vắt ráo)',
      phRange: '6.5 - 7.5',
      keyMetrics: [
        { labelVi: 'Tỷ lệ C:N tối ưu thức ăn', labelEn: 'Optimal C:N Feedstock Ratio', value: '25:1 - 30:1', noteVi: 'Dưới 20:1 sẽ bốc mùi hôi thối do dư thừa Nitơ', noteEn: 'Under 20:1 releases pungent ammonia' },
        { labelVi: 'Hàm lượng Acid Humic & Fulvic', labelEn: 'Humic & Fulvic Acid Content', value: '8.4%', noteVi: 'Kích hoạt bộ rễ phát triển cực mạnh', noteEn: 'Powerful natural root stimulants' },
        { labelVi: 'Sản lượng phân trùn hàng tháng', labelEn: 'Monthly Castings Harvest', value: '12 - 15 kg', noteVi: 'Đủ bón cho toàn bộ vườn ban công 10m²', noteEn: 'Sufficient for a 10sqm balcony garden' },
        { labelVi: 'Tiết kiệm chi phí phân bón', labelEn: 'Annual Fertilizer Savings', value: '1.8 - 2.4 triệu đ/năm', noteVi: '100% không phải mua phân bón ngoài tiệm', noteEn: 'Zero external fertilizer purchases' }
      ],
      comparisonTable: {
        headersVi: ['Tiêu chí so sánh', 'Ủ rác đóng xô thông thường', 'Hệ Thống Trùn Quế Tuần Hoàn Yêu Trồng Cây'],
        headersEn: ['Metric', 'Ordinary Closed Bucket Rot', 'YeuTrongCay Circular Vermicompost'],
        rowsVi: [
          ['Mùi hôi thối phát tán', 'Rất hôi, bốc mùi trứng thối và amoniac', 'Thoang thoảng mùi đất rừng nhiệt đới dễ chịu'],
          ['Sự xuất hiện của giòi bọ', 'Ruồi nhặng bu kín, giòi bò lúc nhúc', 'Không có giòi nhờ lớp chăn ẩm carbon bảo vệ'],
          ['Tốc độ phân hủy', 'Mất 3 - 6 tháng mới hoai mục', 'Chỉ mất 7 - 14 ngày qua đường ruột của trùn quế'],
          ['Dịch lỏng thu được', 'Nước rỉ rác đen ngòm độc hại', 'Dịch trà trùn giàu vi sinh kích kháng sâu bệnh']
        ],
        rowsEn: [
          ['Odor Emissions', 'Noxious hydrogen sulfide & ammonia stenches', 'Fresh earthy petrichor forest floor scent'],
          ['Maggot & Fly Infestation', 'Heavy housefly breeding and crawling maggots', 'Zero maggots due to dry carbon bedding blanket'],
          ['Processing Speed', 'Sluggish 3 to 6 months cold decomposition', 'Rapid 7 to 14 days through earthworm gut'],
          ['Liquid Byproduct', 'Toxic anaerobic putrid leachate', 'Probiotic aerated worm tea boosting plant immunity']
        ]
      }
    },
    sopStepsVi: [
      {
        step: 1,
        title: 'Thiết lập thùng nuôi 2 tầng có van xả dịch trà',
        description: 'Dùng 2 thùng xốp hoặc thùng nhựa lồng vào nhau. Thùng trên khoan hàng trăm lỗ nhỏ 3mm ở đáy để thoát dịch và cho trùn thở. Thùng dưới hứng dịch lỏng và gắn van vòi vặn nhỏ.',
        duration: '30 phút',
        proTip: 'Dán lưới chống muỗi bằng inox mịn quanh các lỗ thông hơi để ngăn ruồi giấm xâm nhập.'
      },
      {
        step: 2,
        title: 'Tạo lớp đệm sinh học Carbon (Bedding Layer)',
        description: 'Xé nhỏ bìa carton không tráng bóng, ngâm nước 10 phút rồi vắt ráo. Rải một lớp dày 7-10cm dưới đáy thùng trên cùng với một ít xơ dừa ẩm và phân trùn làm men giống.',
        duration: '20 phút'
      },
      {
        step: 3,
        title: 'Thả trùn sinh khối giống và cho ăn theo mẻ',
        description: 'Thả 1-2kg trùn sinh khối quế vào giữa lớp đệm. Băm nhỏ rác nhà bếp (rau củ, bã cà phê) và chôn thành từng hốc nhỏ góc thùng. Luôn phủ một lớp bìa carton ẩm hoặc trấu hun lên trên vết chôn.',
        duration: '15 phút',
        caution: 'TUYỆT ĐỐI KHÔNG cho trùn ăn: thịt cá ôi thiu, dầu mỡ, vỏ cam chanh bưởi quá chua hoặc ớt tỏi cay nóng.'
      },
      {
        step: 4,
        title: 'Thu hoạch phân trùn quế bằng phương pháp ánh sáng',
        description: 'Sau 3-4 tuần, gom phân trùn thành các gò hình nón dưới ánh sáng đèn hoặc ban ngày. Do trùn rất sợ sáng, chúng sẽ chui sâu xuống đáy nón. Bạn chỉ việc hớt từng lớp phân tơi xốp phía trên.',
        duration: '25 phút'
      }
    ],
    sopStepsEn: [
      {
        step: 1,
        title: 'Assemble 2-Tier Bin with Aerated Base & Liquid Spigot',
        description: 'Nest two stackable bins. Drill 3mm aeration holes across the bottom of the upper working bin. The lower sump bin collects liquid runoff with an attached spigot.',
        duration: '30 minutes',
        proTip: 'Screen air vents with ultra-fine stainless mesh to bar fruit fly entry.'
      },
      {
        step: 2,
        title: 'Prepare Carbon Bedding Foundation',
        description: 'Shred unbleached corrugated cardboard, soak for 10 minutes, and wring damp. Spread a 10cm fluffy base enriched with a scoop of mature castings as microbial starter.',
        duration: '20 minutes'
      },
      {
        step: 3,
        title: 'Introduce Worm Starter & Pocket Feeding',
        description: 'Introduce 1-2kg Eisenia fetida biomass. Chop scraps finely and pocket-bury in alternating corners. Always cap food with a damp carbon mulch blanket.',
        duration: '15 minutes',
        caution: 'NEVER feed: oily animal meats, citrus rinds, dairy, or hot chili/garlic.'
      },
      {
        step: 4,
        title: 'Harvest Pure Castings via Light-Deprivation Cone Method',
        description: 'After 3-4 weeks, mound castings under light. Because worms flee light toward the core, gently scrape off the dark crumbly castings layer by layer.',
        duration: '25 minutes'
      }
    ],
    deepContentVi: `
### Đường Ruột Trùn Quế: Nhà Máy Sinh Học Tinh Vi Nhất Hành Tinh

Khi rác thải thực vật đi qua hệ tiêu hóa của trùn quế *Eisenia fetida*, một phép màu sinh học diễn ra:
1. **Tiệt trùng mầm bệnh**: Các enzym tiêu hóa và quần thể vi sinh vật đường ruột của trùn tiêu diệt các chủng nấm bệnh có hại (*Fusarium*, *Rhizoctonia*).
2. **Khoáng hóa dinh dưỡng**: Biến dạng Đạm, Lân, Kali khó tan trong xác bã thực vật thành dạng ion hòa tan ($NO_3^-$, $H_2PO_4^-$, $K^+$) mà rễ cây có thể hấp thu trực tiếp không cần chờ phân hủy.
3. **Sản sinh Auxin và Cytokinin tự nhiên**: Phân trùn chứa các hormone kích thích sinh trưởng rễ thực vật tự nhiên, giúp cây non bén rễ nhanh gấp đôi so với phân chuồng truyền thống.
`,
    deepContentEn: `
### The Earthworm Digestive Tract: Nature’s Most Refined Bioreactor

When kitchen organic scraps traverse the alimentary canal of *Eisenia fetida*, profound biochemical miracles occur:
1. **Pathogen Inactivation**: Digestive chitinases and competitive gut flora eradicate pathogenic fungi (*Fusarium*, *Rhizoctonia*).
2. **Nutrient Chelation**: Insoluble organic nitrogen, phosphorus, and potassium are transformed into bioavailable ionic forms ($NO_3^-$, $H_2PO_4^-$, $K^+$) ready for direct root assimilation.
3. **Phytohormone Biosynthesis**: Earthworm castings naturally teem with auxin, gibberellin, and cytokinin analogs, accelerating lateral root elongation twice as fast as cattle manure.
`,
    faqsVi: [
      {
        question: 'Nuôi trùn quế trong căn hộ chung cư có sợ trùn bò ra ngoài sàn nhà không?',
        answer: 'Trùn quế rất sợ ánh sáng và không khí khô. Chỉ cần thùng nuôi có nắp đậy thoáng khí và bên trong luôn có độ ẩm lý tưởng kèm thức ăn thì trùn sẽ ở yên 100% trong lớp đệm tối. Chúng chỉ có xu hướng bò ra khi thùng bị ngập úng sũng nước hoặc bị thức ăn quá chua gây nóng thùng.'
      },
      {
        question: 'Dịch trà trùn quế (Worm Tea) dùng để tưới cây như thế nào?',
        answer: 'Pha loãng dịch trà trùn với nước sạch theo tỷ lệ 1:10 nếu tưới gốc, hoặc 1:20 nếu phun qua lá vào sáng sớm. Dịch trà trùn hoạt động như một lớp vắc-xin sinh học bảo vệ bề mặt lá khỏi nấm phấn trắng và bọ trĩ.'
      }
    ],
    faqsEn: [
      {
        question: 'Will worms escape and crawl around my apartment floors?',
        answer: 'Earthworms are photophobic and sensitive to dry air. As long as the bin remains damp, dark, and adequately aerated, worms stay buried in their bedding. Mass escape attempts only occur if the bin becomes flooded or turns acidic from overfeeding citrus.'
      },
      {
        question: 'How do I apply vermicompost tea to plants?',
        answer: 'Dilute the raw leachate 1:10 with filtered water for root drenches, or 1:20 as a morning foliar spray. Worm tea acts as an organic bio-shield, inoculating leaf surfaces against powdery mildew and pest vectors.'
      }
    ],
    equipmentBOM: [
      { itemVi: 'Bộ 2 thùng nhựa nuôi trùn đa tầng có đục lỗ thoát khí và vòi xả', itemEn: '2-tier modular vermicomposting bin with spigot and vents', estCostVnd: 180000, whereToBuyVi: 'Cửa hàng thiết bị nông nghiệp đô thị', whereToBuyEn: 'Urban composting retailer' },
      { itemVi: 'Trùn quế sinh khối giống F1 khỏe mạnh (2 kg)', itemEn: '2kg active Eisenia fetida breeding biomass', estCostVnd: 90000, whereToBuyVi: 'Trang trại trùn quế Củ Chi / Ba Vì hoặc Shopee', whereToBuyEn: 'Local vermiculture farm' },
      { itemVi: 'Cuộn lưới inox 304 chống ruồi giấm mắt siêu mịn', itemEn: 'Fine 304 stainless insect mesh screen', estCostVnd: 35000, whereToBuyVi: 'Cửa hàng lưới kim khí', whereToBuyEn: 'Hardware store' }
    ],
    urbanSafetyNoticeVi: 'LƯU Ý VỆ SINH ĐÔ THỊ: Không cho thịt cá dầu mỡ vào thùng trùn trong nhà chung cư để tránh thu hút chuột và ruồi nhặng. Luôn chôn kín thức ăn dưới lớp carton ẩm.',
    urbanSafetyNoticeEn: 'URBAN APARTMENT HYGIENE: Strictly avoid animal fats, dairy, and meat scraps indoors to prevent attracting rodents or pests. Always keep feeding pockets capped with damp carbon mulch.',
    relatedArticleSlugs: [
      'cach-nuoi-trun-que-thung-xop-trong-can-ho',
      'u-rac-nha-bep-bang-men-bokashi-khong-hoi',
      'tu-lam-than-sinh-hoc-biochar-tai-gia'
    ]
  },
  {
    id: 'art-circular-sub1',
    slug: 'cach-nuoi-trun-que-thung-xop-trong-can-ho',
    categorySlug: 'kinh-te-tuan-hoan',
    titleVi: 'Hướng Dẫn Nuôi Trùn Quế Thùng Xốp Trong Căn Hộ Chung Cư Tuyệt Đối Không Có Mùi',
    titleEn: 'Apartment Styrofoam Vermicomposting: 100% Odorless Indoor Scrap Recycling',
    subtitleVi: 'Tận dụng thùng xốp bỏ đi, giấy carton vụn và kỹ thuật ủ rác không sinh ruồi bọ',
    subtitleEn: 'Repurposing discarded styrofoam boxes, shredded paper, and zero-pest indoor digestion',
    excerptVi: 'Giải pháp biến rác nhà bếp thành phân bón ngay dưới gầm tủ bếp hoặc góc ban công nhỏ. Không mùi hôi, không ruồi bọ, chi phí tự làm 0 đồng.',
    excerptEn: 'Turn daily kitchen peels into living black gold under your kitchen counter or balcony corner. Completely odorless, pest-free, zero-dollar DIY recycling.',
    readTimeMinutes: 7,
    authorName: 'Ks. Đào Duy Nam',
    authorRoleVi: 'Chuyên gia Vi sinh & Kinh tế Sinh thái',
    authorRoleEn: 'Microbiology Specialist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=1200&q=80',
    tags: ['Nuôi trùn thùng xốp', 'Rác nhà bếp chung cư', 'Ủ phân không mùi'],
    directAnswerSnippetVi: 'Nuôi trùn quế thùng xốp trong căn hộ không mùi hôi bằng cách: khoét lỗ thông hơi có dán vải mùng mịn quanh mép thùng, lót đáy bằng 5cm giấy báo xé ướt, cho ăn rác rau củ băm nhỏ theo từng góc luân phiên và luôn phủ kín mặt bằng một chiếc khăn ẩm hoặc bao bìa carton.',
    directAnswerSnippetEn: 'Keep indoor styrofoam worm bins odorless by: cutting ventilation ports lined with fine fabric mesh along the rim, lining the floor with 5cm damp shredded newsprint, burying finely chopped vegetable scraps in rotating corners, and keeping the surface sealed beneath a damp cloth blanket.',
    scientificData: {
      botanicalName: 'Eisenia fetida',
      optimalTemp: '22°C - 27°C',
      keyMetrics: [
        { labelVi: 'Khả năng tiêu thụ rác', labelEn: 'Scrap Consumption Rate', value: '50% trọng lượng cơ thể/ngày', noteVi: '1kg trùn ăn hết 500g rác mỗi ngày', noteEn: '1kg worms process 500g scraps daily' },
        { labelVi: 'Nồng độ Amoniac thoát ra', labelEn: 'Ammonia Gas Emissions', value: '0 ppm (Không phát hiện)', noteVi: 'Được hấp thụ hoàn toàn bởi giấy carton ẩm', noteEn: 'Completely absorbed by damp carbon bedding' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Chế tạo thùng xốp thoát khí có lưới chắn', description: 'Đục 8 lỗ thông hơi đường kính 2cm quanh thân trên thùng xốp, dán kín bằng vải lưới chống ruồi giấm.', duration: '15 phút' },
      { step: 2, title: 'Lót đệm carbon giữ ẩm', description: 'Rải 5cm giấy báo vụn hoặc bìa carton đã nhúng nước vắt ráo xuống đáy làm đệm lót.', duration: '10 phút' },
      { step: 3, title: 'Thả trùn giống và cho ăn mẻ đầu', description: 'Cho trùn vào, rải một ít bã cà phê và vỏ chuối băm nhỏ ở góc thùng, đậy khăn ẩm lên trên.', duration: '10 phút' },
      { step: 4, title: 'Đậy kín nắp thùng xốp', description: 'Đậy nắp kín, đặt ở góc ban công râm mát hoặc gầm chậu rửa bát.', duration: '5 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Ventilate Box with Mesh Screens', description: 'Punch eight 2cm air holes along the upper perimeter and secure with fine mosquito mesh.', duration: '15 minutes' },
      { step: 2, title: 'Install Damp Carbon Cushion', description: 'Spread 5cm of damp shredded newspaper at the base as an absorbent bedding blanket.', duration: '10 minutes' },
      { step: 3, title: 'Deposit Worms and First Feeding', description: 'Place worms gently, add chopped banana peels and coffee grounds in a corner, and cover with a damp rag.', duration: '10 minutes' },
      { step: 4, title: 'Secure Lid in Cool Shaded Spot', description: 'Close the lid and position in a cool shaded balcony niche or kitchen cupboard.', duration: '5 minutes' }
    ],
    deepContentVi: 'Thùng xốp có khả năng cách nhiệt tuyệt vời, giúp bảo vệ đàn trùn khỏi cái nóng gay gắt của mùa hè và cái lạnh mùa đông. Khi rác hữu cơ được chôn dưới lớp đệm carbon, các vi sinh vật hiếu khí sẽ nhanh chóng chuyển hóa hợp chất hữu cơ thành mùn mà không sinh ra khí hydro sulfide ($H_2S$) gây mùi thối.',
    deepContentEn: 'Styrofoam provides exceptional thermal insulation, protecting earthworms against summer heat spikes and winter chills. When scraps are buried beneath carbon bedding, aerobic microorganisms convert waste into odorless humus without releasing foul hydrogen sulfide ($H_2S$).',
    faqsVi: [
      { question: 'Có thể cho trùn ăn vỏ cam, chanh, bưởi được không?',
      answer: 'Hạn chế tối đa. Vỏ cây có múi chứa nhiều tinh dầu d-limonene có tính sát khuẩn mạnh và tính acid cao có thể làm rát bỏng da nhớt của trùn, khiến trùn chết hoặc bò trốn khỏi thùng.' }
    ],
    faqsEn: [
      { question: 'Can I feed citrus rinds to indoor worms?',
      answer: 'Strictly minimize citrus. Rinds are high in d-limonene and acids that burn delicate worm skin, disrupting gut biology and triggering bin abandonment.' }
    ],
    relatedArticleSlugs: ['kinh-te-tuan-hoan-nuoi-trun-que-ban-cong', 'u-rac-nha-bep-bang-men-bokashi-khong-hoi']
  },
  {
    id: 'art-circular-sub2',
    slug: 'u-rac-nha-bep-bang-men-bokashi-khong-hoi',
    categorySlug: 'kinh-te-tuan-hoan',
    titleVi: 'Cách Tự Làm Thùng Ủ Rác Nhà Bếp Bokashi Bằng Men Vi Sinh Bản Địa Thu Dịch Tưới',
    titleEn: 'DIY Indoor Bokashi Fermentation: Zero-Odor Anaerobic Waste Recycling & Probiotic Tea',
    subtitleVi: 'Ứng dụng vi khuẩn Lactic, nấm men lên men kỵ khí và ủ được cả thịt cá thừa',
    subtitleEn: 'Lactic acid bacteria, anaerobic fermentation, and digesting dairy/meat leftovers safely',
    excerptVi: 'Phương pháp ủ rác hữu cơ phong cách Nhật Bản dành riêng cho nhà phố. Lên men chua thơm dịu như dưa muối, không sinh mùi thối, xử lý được mọi loại thức ăn thừa kể cả dầu mỡ.',
    excerptEn: 'Japanese Bokashi anaerobic fermenting method customized for apartments. Pickles kitchen waste with pleasant cider vinegar notes, processing even dairy and cooked leftovers.',
    readTimeMinutes: 8,
    authorName: 'Ks. Đào Duy Nam',
    authorRoleVi: 'Chuyên gia Vi sinh Nông nghiệp',
    authorRoleEn: 'Agricultural Microbiologist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ủ rác Bokashi', 'Men vi sinh Bokashi', 'Xử lý thức ăn thừa', 'Dịch tưới vi sinh'],
    directAnswerSnippetVi: 'Ủ rác Bokashi không mùi hoạt động dựa trên quá trình lên men kỵ khí nhờ vi khuẩn Lactic: xếp rác nhà bếp vào thùng kín có van xả đáy, cứ mỗi lớp rác dày 3-5cm thì rắc một lớp cám men vi sinh Bokashi, nén chặt để tống hết không khí ra ngoài và đậy nắp kín. Sau 10-14 ngày rác sẽ lên men chua thơm như dưa cải muối.',
    directAnswerSnippetEn: 'Odorless Bokashi functions via airtight lactic acid fermentation: layer food scraps into an airtight bucket with a bottom spigot, dusting a handful of microbial Bokashi bran over every 3-5cm layer, compacting firmly to expel oxygen, and sealing the lid. Within 10-14 days, waste pickles cleanly with a pleasant cider aroma.',
    scientificData: {
      botanicalName: 'Lactobacillus & Yeast Consortium (Bokashi EM)',
      optimalTemp: '20°C - 32°C',
      phRange: '3.5 - 4.0 (môi trường acid ức chế 100% khuẩn thối)',
      keyMetrics: [
        { labelVi: 'Thời gian hoàn tất lên men', labelEn: 'Fermentation Duration', value: '14 ngày', noteVi: 'Trong điều kiện nắp thùng kín khí 100%', noteEn: 'Under 100% airtight anaerobic conditions' },
        { labelVi: 'Hiệu quả ức chế E.coli và Salmonella', labelEn: 'Pathogen Suppression', value: '99.9%', noteVi: 'Nhờ pH hạ xuống dưới 4.0 do acid lactic', noteEn: 'Due to pH drop below 4.0 via lactic acid' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Băm nhỏ rác thải nhà bếp', description: 'Thái rác nhà bếp (cơm thừa, rau củ, vụn thịt) thành miếng 2-3cm để tăng diện tích tiếp xúc với men vi sinh.', duration: '10 phút' },
      { step: 2, title: 'Rải rác và rắc cám men Bokashi', description: 'Cho rác vào xô, cứ một lớp rác rắc 2 thìa canh cám Bokashi phủ đều.', duration: '5 phút' },
      { step: 3, title: 'Nén chặt đuổi hết túi khí oxy', description: 'Dùng một tấm đĩa nhựa ấn thật mạnh lên bề mặt rác để tống hết bọt khí ra ngoài, đậy nắp kín khí.', duration: '5 phút' },
      { step: 4, title: 'Xả dịch Bokashi 3 ngày/lần', description: 'Vặn vòi đáy xả nước rỉ màu vàng trong thơm mùi dấm. Pha loãng 1:50 tưới cây hoặc đổ cống bồn rửa bát để thông tắc đường ống.', duration: '5 phút' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Chop Food Scraps', description: 'Dice vegetable trims, cooked leftovers, and trims into 2-3cm fragments to maximize microbial contact surface.', duration: '10 minutes' },
      { step: 2, title: 'Layer Scraps and Dust Bokashi Bran', description: 'Deposit scraps into bucket, coating each layer with 2 tablespoons of living Bokashi bran.', duration: '5 minutes' },
      { step: 3, title: 'Compress to Expel Oxygen Pockets', description: 'Press down firmly with a tamper disc to eliminate oxygen voids before sealing the airtight lid.', duration: '5 minutes' },
      { step: 4, title: 'Drain Bokashi Probiotic Tea Every 3 Days', description: 'Open bottom spigot to collect golden ferment liquid. Dilute 1:50 for garden watering or pour into sinks to clear grease pipes.', duration: '5 minutes' }
    ],
    deepContentVi: 'Khác với phương pháp ủ phân hiếu khí truyền thống đòi hỏi đảo trộn liên tục và sinh nhiều nhiệt, Bokashi là quá trình lên men kỵ khí tương tự như cách con người làm dưa chua, kim chi hay ủ sữa chua. Vi khuẩn Lactic biến đường trong rác thành acid lactic, hạ pH xuống dưới 4.0, tiêu diệt toàn bộ vi khuẩn gây thối rữa và khóa chặt các phân tử Nitơ không bị bốc hơi thành mùi amoniac.',
    deepContentEn: 'Unlike aerobic compost requiring laborious turning and high heat, Bokashi is an airtight pickling fermentation mirroring sourdough or kimchi production. Lactic acid bacteria ferment sugars into organic acids, plunging pH below 4.0, extinguishing putrefactive microbes and locking Nitrogen inside the substrate rather than releasing it as foul ammonia fumes.',
    faqsVi: [
      { question: 'Có thể tự làm cám men Bokashi tại nhà được không?',
      answer: 'Hoàn toàn được. Bạn chỉ cần cám gạo sạch, một ít mật rỉ đường, nước vo gạo ủ chua (chứa vi khuẩn lactic bản địa) và một chút sữa chua men sống. Trộn đều ủ kín trong xô 7 ngày rồi phơi khô là có cám men dùng cả năm với chi phí chỉ vài chục ngàn.' }
    ],
    faqsEn: [
      { question: 'Can I craft DIY Bokashi bran at home?',
      answer: 'Yes! Blend wheat or rice bran with blackstrap molasses, sour rice wash water (native lactobacillus), and active live-culture yogurt. Ferment sealed for 7 days and air dry for a year-long supply costing pennies.' }
    ],
    relatedArticleSlugs: ['kinh-te-tuan-hoan-nuoi-trun-que-ban-cong', 'tu-lam-than-sinh-hoc-biochar-tai-gia']
  },
  {
    id: 'art-circular-sub3',
    slug: 'tu-lam-than-sinh-hoc-biochar-tai-gia',
    categorySlug: 'kinh-te-tuan-hoan',
    titleVi: 'Cách Làm & Hoạt Hóa Than Sinh Học (Biochar) Từ Vỏ Trấu và Cành Cây Khô Cố Định Carbon',
    titleEn: 'DIY Activated Biochar: Turning Rice Husks & Pruning Twigs into Living Carbon Reefs',
    subtitleVi: 'Nhiệt phân yếm khí không khói TLUD, ngâm hoạt hóa dinh dưỡng bằng dịch trùn quế',
    subtitleEn: 'Top-Lit Updraft smokeless pyrolysis and micro-nutrient charging with worm tea',
    excerptVi: 'Hướng dẫn chế tạo "rạn san hô sinh học" cho đất trồng từ cành cây tỉa bỏ và vỏ trấu. Giữ nước, giữ phân bón vĩnh viễn trong đất hàng trăm năm và khử độc tố kim loại nặng.',
    excerptEn: 'Construct permanent underground microbial reefs from dried prunings and rice husks. Lock water and nutrients into soil matrices for centuries while sequestering carbon.',
    readTimeMinutes: 8,
    authorName: 'Ks. Đào Duy Nam',
    authorRoleVi: 'Chuyên gia Vi sinh & Kinh tế Sinh thái',
    authorRoleEn: 'Microbiology Specialist',
    lastUpdated: '2026-11-08',
    isPillar: false,
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    tags: ['Than sinh học Biochar', 'Nhiệt phân TLUD', 'Cố định Carbon', 'Cải tạo đất'],
    directAnswerSnippetVi: 'Cách làm và hoạt hóa than sinh học (Biochar) tại nhà: nung cành cây khô hoặc vỏ trấu trong thùng sắt theo nguyên lý nhiệt phân yếm khí thiếu oxy (TLUD) để tạo than xốp đen nhánh không khói; sau đó ngâm than đã giã nhỏ vào thùng dịch phân trùn quế pha mật rỉ đường trong 7 ngày để nạp đầy vi sinh vật trước khi trộn vào đất.',
    directAnswerSnippetEn: 'DIY biochar production and charging: pyrolyze dried twigs or rice husks in an oxygen-deprived metal TLUD retort kiln, producing pure porous carbon with zero smoke; soak crushed charcoal in a blend of aerated worm tea and molasses for 7 days to fully charge micropores with living microbes before blending into potting soil.',
    scientificData: {
      botanicalName: 'Pyrolyzed Bio-Carbon Matrix',
      optimalTemp: 'Nhiệt độ nhiệt phân: 450°C - 600°C',
      keyMetrics: [
        { labelVi: 'Diện tích bề mặt riêng', labelEn: 'Specific Surface Area', value: '350 - 420 m²/g', noteVi: 'Hàng triệu vi khoang rỗng chứa vi sinh vật', noteEn: 'Microscopic cavernous pore structure' },
        { labelVi: 'Thời gian tồn tại trong đất', labelEn: 'Carbon Sequestration Longevity', value: '> 100 năm', noteVi: 'Carbon thơm bền vững không bị phân hủy', noteEn: 'Recalcitrant aromatic carbon chains' }
      ]
    },
    sopStepsVi: [
      { step: 1, title: 'Thu gom cành cây khô và phơi giòn', description: 'Tận dụng cành tỉa từ ban công, băm ngắn 5cm và phơi khô kiệt nước.', duration: '1 ngày' },
      { step: 2, title: 'Đốt yếm khí trong bếp nung TLUD', description: 'Cho cành vào thùng sắt đậy nắp có ống khói, châm lửa từ trên đỉnh (Top-Lit Updraft). Khí gas tự cháy sạch không khói đen.', duration: '40 phút' },
      { step: 3, title: 'Dập lửa bằng nước khi than đỏ hồng', description: 'Khi ngọn lửa chuyển sang màu xanh lam và nhiên liệu đỏ hồng, tưới đẫm nước để dập tắt ngay lập tức, thu về than đen xốp giòn.', duration: '5 phút' },
      { step: 4, title: 'Sạc vi sinh vật (Charging Biochar)', description: 'Giã nhỏ than hạt ngô, ngâm trong xô nước phân trùn quế + men vi sinh trong 7 ngày để than hút no dinh dưỡng trước khi bón.', duration: '7 ngày' }
    ],
    sopStepsEn: [
      { step: 1, title: 'Gather and Bone-Dry Twigs', description: 'Collect balcony pruning trimmings, cut into 5cm lengths, and dry under direct sun until brittle.', duration: '1 day' },
      { step: 2, title: 'Top-Lit Updraft Smokeless Burn', description: 'Pack into a metal cylinder with chimney vent, igniting from the top. Syn-gas combustion produces clean smokeless heat.', duration: '40 minutes' },
      { step: 3, title: 'Quench with Water at Deep Glow', description: 'When glowing embers turn deep amber without flames, drench with water immediately to preserve micropore integrity.', duration: '5 minutes' },
      { step: 4, title: 'Bio-Inoculate & Charge Pores', description: 'Crush into pea-sized bits and soak in nutrient-rich aerated worm tea and molasses for 7 days prior to garden integration.', duration: '7 days' }
    ],
    deepContentVi: 'Than sinh học thô chưa qua hoạt hóa giống như một "miếng mút khô đói khát". Nếu trộn thẳng than thô vào đất, than sẽ hút cạn toàn bộ phân bón và nước của rễ cây, khiến cây bị còi cọc vàng lá trong 6 tháng đầu. Quá trình "sạc than" (Inoculation) bằng cách ngâm trong dịch trùn quế giúp lấp đầy hàng tỷ lỗ xốp bằng vi sinh vật hữu ích và khoáng chất, biến hạt than thành những trạm cấp dưỡng bền bỉ cho rễ cây.',
    deepContentEn: 'Raw biochar acts like an ultra-absorbent dry sponge. Blending raw, uncharged biochar directly into potting soil starves plant roots by locking away existing soil nitrogen and moisture. Pre-charging (inoculation) in active vermicompost tea saturates the millions of internal microscopic caverns with beneficial microbes and trace minerals, transforming carbon grains into lifelong nutrient batteries.',
    faqsVi: [
      { question: 'Có thể lấy than củi nướng thịt ngoài chợ đập ra trộn vào đất được không?',
      answer: 'CẦN CẨN TRỌNG: Than củi nướng công nghiệp thường còn dư lượng hắc ín, nhựa dầu và hóa chất đốt nhanh độc hại cho vi sinh vật đất. Nếu dùng, phải ngâm xả nước nhiều lần và phơi thật kỹ rồi mới sạc men vi sinh.' }
    ],
    faqsEn: [
      { question: 'Can I crush commercial barbecue charcoal for plants?',
      answer: 'CAUTION: Commercial BBQ briquettes contain binders, petroleum accelerants, and toxic tars lethal to soil biomes. Only use pure natural hardwood lump charcoal thoroughly rinsed and bio-inoculated.' }
    ],
    relatedArticleSlugs: ['kinh-te-tuan-hoan-nuoi-trun-que-ban-cong', 'u-rac-nha-bep-bang-men-bokashi-khong-hoi']
  }
];
