import { PlantCollection } from '../types/index.ts';

export const PLANT_COLLECTIONS: PlantCollection[] = [
  {
    id: 'col-01',
    slug: 'bo-tu-thuoc-cho-be',
    title: 'Bộ Tủ Thuốc Cho Trẻ Nhỏ & Gia Đình',
    title_en: 'Family & Children Herbal First-Aid Kit',
    subtitle: 'Kháng sinh tự nhiên trị ho, sổ mũi, hạ sốt không dùng thuốc tây',
    subtitle_en: 'Natural remedies for cough, cold, and mild fever relief',
    description: 'Tuyển tập 5 thảo dược lành tính nhất chuyên trị các bệnh đường hô hấp, ho đờm dai dẳng, khản tiếng và sốt nhẹ thường gặp ở trẻ nhỏ và người cao tuổi trong gia đình.',
    description_en: 'A curated selection of 5 gentle, time-tested home herbs for treating common coughs, congestion, and fevers without immediate reliance on synthetic medicine.',
    icon: '👶',
    badge: 'Tủ Thuốc Gia Đình',
    badge_en: 'Family First-Aid',
    themeColor: 'emerald',
    plantIds: ['herb-01', 'herb-02', 'herb-03', 'herb-12', 'fruit-08', 'herb-40', 'herb-47'],
    benefits: [
      'Tinh dầu Carvacrol & Thymol sát khuẩn vòm họng cực mạnh',
      'Hạ sốt tức thì bằng cách giã đắp trán và lòng bàn chân',
      'Nấu siro chanh đào - húng chanh dùng quanh năm'
    ],
    benefits_en: [
      'Potent antimicrobial action from Thymol and Carvacrol oils',
      'Fast natural fever cooling through topical herbal compresses',
      'Homemade organic cough syrup ready for all seasons'
    ],
    companion_planting_tip: 'Trồng húng chanh và tía tô chung khay đất dài 60cm, đặt nơi đón nắng sáng dịu 3-4 tiếng/ngày.',
    companion_planting_tip_en: 'Plant Cuban oregano and perilla in a 60cm rectangular planter facing mild morning sunlight.'
  },
  {
    id: 'bo-ban-cong-nang-tay',
    slug: 'bo-ban-cong-nang-tay',
    title: 'Bộ Ban Công Hướng Tây Chịu Nắng Gắt',
    title_en: 'West-Facing Balcony Heat-Shield Set',
    subtitle: 'Chịu nhiệt trên 40°C, giảm bức xạ bê tông, trĩu quả ngọt lịm',
    subtitle_en: 'Withstands 40°C+ heat, absorbs wall radiation, yields bountiful fruits',
    description: 'Giải pháp phủ xanh kiên cường cho những ban công chung cư và sân thượng hướng Tây thiêu đốt. Cây hấp thu nhiệt lượng, tạo bóng mát tự nhiên và vẫn đơm hoa kết trái đều đặn.',
    description_en: 'Resilient green solutions for harsh west-facing balconies and scorching rooftops, cooling indoor temperatures while bearing delicious fruits.',
    icon: '☀️',
    badge: 'Chịu Nắng Cực Hạn',
    badge_en: 'Extreme Heat Proof',
    themeColor: 'amber',
    plantIds: ['fruit-01', 'fruit-02', 'fruit-04', 'orn-01', 'herb-22', 'orn-15', 'fruit-20', 'fruit-23'],
    benefits: [
      'Chịu nắng gắt trực diện trên 6-8 tiếng mỗi ngày',
      'Lá dày mọng nước giảm thoát hơi nước và cách nhiệt tường nhà',
      'Càng nhiều nắng quả càng ngọt đậm đà và sai trĩu'
    ],
    benefits_en: [
      'Tolerates 6-8 hours of direct afternoon sun without leaf scorch',
      'Insulates concrete walls and significantly lowers ambient room heat',
      'Intense sunlight increases brix sweetness in fruits'
    ],
    companion_planting_tip: 'Đặt chậu ổi lê và cóc Thái sát lan can đón nắng chính, dùng chậu cúc tần hoặc sen đá móng rồng che phủ tầng dưới gốc để giữ ẩm đất.',
    companion_planting_tip_en: 'Position guava and ambarella directly along the outer railing; use groundcover herbs around root bases to conserve soil moisture.'
  },
  {
    id: 'bo-loc-khong-khi-nasa',
    slug: 'bo-loc-khong-khi-nasa',
    title: 'Bộ Thanh Lọc Khí Độc Chuẩn NASA',
    title_en: 'NASA Clean Air Living Space Set',
    subtitle: 'Hút formaldehyde, benzen, bụi mịn và giải phóng oxy ban đêm',
    subtitle_en: 'Filters formaldehyde, benzene, particulate matter and generates night oxygen',
    description: 'Bộ sưu tập các loài thực vật được NASA chứng minh có khả năng hấp thụ độc tố từ sơn tường, sàn gỗ công nghiệp, khói bụi xe cộ và bức xạ thiết bị điện tử trong phòng kín.',
    description_en: 'Plant varieties verified by NASA Clean Air studies to absorb airborne toxins from paint, manufactured furniture, and electronics.',
    icon: '🛡️',
    badge: 'Lọc Độc NASA',
    badge_en: 'NASA Certified Air',
    themeColor: 'teal',
    plantIds: ['orn-06', 'orn-08', 'orn-03', 'orn-09', 'orn-10', 'orn-16', 'orn-18', 'orn-23', 'orn-26'],
    benefits: [
      'Cơ chế quang hợp CAM mở khí khổng nhả oxy vào ban đêm giúp ngủ sâu',
      'Hấp thụ các chất bay hơi độc hại (VOCs) từ keo dán nội thất',
      'Tán lá rộng bẫy bụi mịn PM2.5 lơ lửng trong không khí'
    ],
    benefits_en: [
      'CAM photosynthesis produces clean oxygen overnight for deeper sleep',
      'Removes hazardous volatile organic compounds (VOCs) from indoor air',
      'Expansive foliage traps airborne PM2.5 dust particles'
    ],
    companion_planting_tip: 'Đặt lưỡi hổ trong phòng ngủ và lan ý, trầu bà thanh xuân tại phòng khách hoặc bàn làm việc gần máy tính.',
    companion_planting_tip_en: 'Place snake plants in the bedroom for nocturnal oxygen, and peace lilies / philodendrons in living or home office spaces.'
  },
  {
    id: 'bo-trai-ngot-mini-chanh-chay',
    slug: 'bo-trai-ngot-mini-chanh-chay',
    title: 'Bộ Vườn Trái Cây Lùn Trĩu Quả Ban Công',
    title_en: 'Urban Balcony High-Yield Dwarf Orchard',
    subtitle: 'Cây giống lùn thuần chậu, ra hoa đậu quả quanh năm trong diện tích nhỏ',
    subtitle_en: 'Compact dwarf cultivars bearing fruits continuously in small pots',
    description: 'Biến ban công nhỏ hẹp 2m - 5m² thành vườn quả sum suê với các giống ăn trái được lai tạo và tuyển chọn đặc biệt cho môi trường đô thị: ổi, cóc, chanh, sung Mỹ, quất ngọt và dâu tằm.',
    description_en: 'Transform modest 2-5m² balconies into thriving mini-orchards with dwarf fruit varieties bred specifically for container living.',
    icon: '🍋',
    badge: 'Siêu Sai Trái',
    badge_en: 'High Yield Patio',
    themeColor: 'rose',
    plantIds: ['fruit-01', 'fruit-02', 'fruit-03', 'fruit-04', 'fruit-11', 'fruit-12', 'fruit-21', 'fruit-22', 'fruit-24', 'fruit-26', 'fruit-28', 'fruit-31'],
    benefits: [
      'Thu hoạch trái tươi sạch 100% không hóa chất bảo quản ngay tại nhà',
      'Cây thân gỗ lùn chỉ cao từ 80cm - 1.4m, không tốn diện tích trần',
      'Tự thụ phấn tốt trong không gian ban công kín gió'
    ],
    benefits_en: [
      'Enjoy crisp, pesticide-free fresh fruits harvested right at home',
      'Compact canopy heights between 80cm and 1.4m fit tight balconies',
      'Highly self-fertile varieties that set abundant fruit without manual pollination'
    ],
    companion_planting_tip: 'Dùng chậu thông minh thoát nước đường kính 40cm-50cm, bón phân trùn quế và phân bón hữu cơ giàu Kali định kỳ 20 ngày/lần.',
    companion_planting_tip_en: 'Use smart aeration pots (40-50cm diameter) and supplement organic worm castings every 20 days during flowering.'
  },
  {
    id: 'bo-tra-thao-moc-duong-tam',
    slug: 'bo-tra-thao-moc-duong-tam',
    title: 'Bộ Trà Thảo Mộc Dưỡng Nhan & An Thần',
    title_en: 'Herbal Tea & Zen Wellness Collection',
    subtitle: 'Thưởng trà tươi tại ban công, thanh lọc cơ thể, xua tan căng thẳng',
    subtitle_en: 'Fresh organic garden teas to detoxify, soothe anxiety, and rejuvenate',
    description: 'Trọn bộ thảo mộc thơm lành để tự pha những tách trà thượng hạng mỗi sáng và tối: vị ngọt tự nhiên không calo của cỏ ngọt, hương sảng khoái bạc hà, cúc hoa thanh nhiệt và hương thảo kích hoạt trí não.',
    description_en: 'A restorative sanctuary collection for brewing fresh, zero-calorie teas: invigorating peppermint, calming chrysanthemum, mind-focusing rosemary, and sweet stevia.',
    icon: '🍵',
    badge: 'Trà Dưỡng Sinh',
    badge_en: 'Herbal Tea Sanctuary',
    themeColor: 'purple',
    plantIds: ['orn-11', 'herb-20', 'herb-19', 'herb-25', 'herb-04', 'orn-12', 'herb-37', 'herb-39', 'herb-43', 'herb-48', 'orn-21'],
    benefits: [
      'Vị ngọt mát lành tự nhiên không chứa calorie từ lá Cỏ ngọt Stevia',
      'Hương thơm tinh dầu tự nhiên kích hoạt sóng alpha não bộ, giảm lo âu',
      'Chống oxy hóa, bảo vệ collagen và làm sáng hồng làn da'
    ],
    benefits_en: [
      'Zero-calorie natural sweetness from fresh Stevia leaves',
      'Therapeutic essential oils induce alpha brainwaves to alleviate workday stress',
      'Rich in polyphenols and antioxidants supporting glowing skin and restful sleep'
    ],
    companion_planting_tip: 'Đặt cụm chậu trà gần bàn trà hoặc góc đọc sách nơi có gió thoảng để hương hoa nhài và hương thảo khuếch tán tự nhiên.',
    companion_planting_tip_en: 'Group tea herbs near your patio reading nook or outdoor bench where gentle breezes circulate natural aromatherapy scents.'
  },
  {
    id: 'bo-phong-thuy-chieu-tai',
    slug: 'bo-phong-thuy-chieu-tai',
    title: 'Bộ Cây Phong Thủy Chiêu Tài & Hưng Vượng',
    title_en: 'Prosperity & Harmonious Feng Shui Suite',
    subtitle: 'Kích hoạt tài lộc, cân bằng ngũ hành, mang lại bình an cho gia đạo',
    subtitle_en: 'Attract prosperity, balance the five elements, and bring peace to home',
    description: 'Tập hợp các loài cây mang biểu tượng may mắn, tài lộc dồi dào và thịnh vượng bền vững cho gia chủ: Kim tiền, Kim ngân bện thắt, Lựu đỏ lùn phú quý, Trúc phú quý và Bonsai lộc vừng kiêu sa.',
    description_en: 'Cultivate abundance and harmonic flow with esteemed botanical symbols of fortune, perseverance, and flourishing prosperity.',
    icon: '🎋',
    badge: 'Chiêu Tài Hút Lộc',
    badge_en: 'Prosperity Magnet',
    themeColor: 'amber',
    plantIds: ['orn-04', 'orn-07', 'fruit-05', 'orn-14', 'orn-13', 'fruit-06', 'orn-17', 'orn-19', 'fruit-25', 'orn-22', 'orn-24', 'orn-25'],
    benefits: [
      'Ngũ hành Mộc tương sinh Hỏa đem đến sinh khí dồi dào',
      'Lá xanh bóng quanh năm tượng trưng cho tài chính vững chắc',
      'Cây thế bonsai uy nghi nâng tầm đẳng cấp không gian sống'
    ],
    benefits_en: [
      'Wood element energy stimulates vitality and fresh beginnings',
      'Evergreen glossy foliage represents lasting abundance and resilience',
      'Artistic bonsai forms elevate home aesthetics and quiet dignity'
    ],
    companion_planting_tip: 'Đặt Kim Tiền hoặc Kim Ngân tại cung Tài Lộc (hướng Đông Nam của phòng khách) và cây Lựu đỏ lùn ngoài cửa đón ánh nắng.',
    companion_planting_tip_en: 'Position Money Trees in the southeast wealth corner of your living room, and dwarf pomegranates near entryways.'
  },
  {
    id: 'bo-cay-nguoi-moi-bat-dau',
    slug: 'bo-cay-nguoi-moi-bat-dau',
    title: 'Bộ Cây Bất Tử Dành Cho Người Mới Trồng',
    title_en: 'Foolproof Starter Garden (Cannot Kill)',
    subtitle: 'Sức sống kiên cường, quên tưới vài ngày vẫn xanh tốt mơn mởn',
    subtitle_en: 'Unstoppable resilience; stays vibrant even if watering is neglected',
    description: 'Lựa chọn hoàn hảo cho người bận rộn, người mới bắt đầu làm quen với cây trồng hoặc từng tự ti "trồng cây nào chết cây đó". Các loài cây này có khả năng tự phục hồi kỳ diệu.',
    description_en: 'The ultimate zero-stress starter kit for busy professionals who think they lack a green thumb. Highly forgiving varieties that bounce back easily.',
    icon: '🌱',
    badge: 'Cực Kỳ Dễ Sống',
    badge_en: 'Beginner Friendly',
    themeColor: 'blue',
    plantIds: ['herb-01', 'herb-03', 'fruit-02', 'orn-04', 'orn-06', 'herb-38', 'orn-20'],
    benefits: [
      'Không yêu cầu kỹ thuật cắt tỉa hay bón phân phức tạp',
      'Sống tốt trong cả điều kiện thiếu sáng hoặc quên tưới 3-5 ngày',
      'Tỷ lệ nhân giống giâm cành thành công đạt trên 95%'
    ],
    benefits_en: [
      'No complicated soil formulations or frequent pruning required',
      'Endures low light and thrives through irregular watering schedules',
      'Over 95% cutting propagation success rate in plain tap water'
    ],
    companion_planting_tip: 'Sử dụng đất trộn sẵn tơi xốp có đá perlite và xơ dừa đã xử lý chát, tưới khi thấy mặt đất se khô.',
    companion_planting_tip_en: 'Use standard well-aerated potting mix with perlite; simply water when the top inch of soil feels dry to the touch.'
  },
  {
    id: 'bo-duoi-muoi-con-trung',
    slug: 'bo-duoi-muoi-con-trung',
    title: 'Bộ Thảo Mộc Đuổi Muỗi Tự Nhiên',
    title_en: 'Natural Mosquito & Pest Repellent Shield',
    subtitle: 'Tinh dầu tự nhiên xua đuổi muỗi vằn, ruồi bọ mà không cần hóa chất',
    subtitle_en: 'Natural essential oil vapours deter mosquitoes safely without sprays',
    description: 'Hàng rào sinh học bảo vệ không gian sống của gia đình khỏi muỗi truyền sốt xuất huyết và côn trùng gây hại bằng chính hương thơm tự nhiên của các loại tinh dầu thực vật thơm mát.',
    description_en: 'An organic botanical shield to safeguard your family from mosquitoes and nuisance pests, powered by aromatic plant defenses.',
    icon: '🦟',
    badge: 'Đuổi Muỗi Tự Nhiên',
    badge_en: 'Eco Pest Shield',
    themeColor: 'emerald',
    plantIds: ['herb-16', 'orn-11', 'orn-03', 'herb-19', 'herb-01', 'herb-46'],
    benefits: [
      'Hàm lượng Citronella, Eucalyptol và Cineole gây ức chế cơ quan khứu giác của muỗi',
      'Hoàn toàn không độc hại cho trẻ sơ sinh và thú cưng như bình xịt hóa học',
      'Mỗi khi lướt tay qua lá, mùi hương tinh dầu tỏa ra sảng khoái tức thì'
    ],
    benefits_en: [
      'Citronella, Eucalyptol, and Cineole compounds confuse insect olfactory sensors',
      '100% safe around infants and pets with zero chemical aerosol residue',
      'Brushing past leaves naturally releases refreshing aromatic vapors'
    ],
    companion_planting_tip: 'Bố trí các chậu cây dọc theo lối đi, cửa sổ và cửa ban công phòng ngủ nơi gió lùa để tinh dầu khuếch tán vào nhà.',
    companion_planting_tip_en: 'Line windowsills, balcony doorways, and hallways with aromatic pots so drafts waft bug-deterring fragrances inside.'
  }
];

export interface SubCategory {
  id: string;
  category: 'herb' | 'fruit' | 'ornamental';
  name: string;
  name_en: string;
  icon: string;
  description: string;
  description_en: string;
}

export const SUBCATEGORIES: SubCategory[] = [
  // Herb
  { id: 'tri-ho-ho-hap', category: 'herb', name: 'Trị Ho & Hô Hấp', name_en: 'Cough & Respiratory', icon: '🫁', description: 'Thảo dược tinh dầu trị ho đờm, khản tiếng, viêm họng hạt', description_en: 'Herbs for sore throat, chronic cough, and clear lungs' },
  { id: 'thanh-nhiet-giai-doc', category: 'herb', name: 'Thanh Nhiệt & Giải Độc', name_en: 'Cooling & Detox', icon: '💧', description: 'Mát gan, hạ sốt, lợi tiểu, đào thải độc tố cơ thể', description_en: 'Cooling teas, fever relief, and liver detoxification' },
  { id: 'xuong-khop-phong-han', category: 'herb', name: 'Xương Khớp & Phong Hàn', name_en: 'Joints & Warming', icon: '🦴', description: 'Ấm kinh lạc, trừ phong thấp, giảm đau nhức xương khớp', description_en: 'Herbal warming and relief for joints and muscles' },
  { id: 'bo-huyet-duong-sinh', category: 'herb', name: 'Bổ Huyết & Dưỡng Sinh', name_en: 'Vitality & Blood Tonic', icon: '✨', description: 'Bổ khí huyết, an thần ngủ ngon, tăng cường sinh lực', description_en: 'Deep sleep, vital circulation, and herbal tonics' },
  { id: 'tra-thao-moc-tieu-hoa', category: 'herb', name: 'Trà Thảo Mộc & Tiêu Hóa', name_en: 'Herbal Tea & Digestion', icon: '🍵', description: 'Trà thảo mộc thơm lành, êm dạ dày, hỗ trợ tiêu hóa', description_en: 'Aromatic infusions for gut and stomach comfort' },

  // Fruit
  { id: 'cam-chanh-gia-vi', category: 'fruit', name: 'Họ Cam Chanh & Gia Vị', name_en: 'Citrus & Kitchen Staples', icon: '🍋', description: 'Chanh, quất, tắc sai hoa đậu quả bốn mùa thơm mát', description_en: 'Year-round citrus fruits and culinary essentials' },
  { id: 'cay-bui-qua-mong', category: 'fruit', name: 'Cây Bụi & Quả Mọng', name_en: 'Berries & Bush Fruits', icon: '🫐', description: 'Dâu tằm, dâu tây, việt quất, ổi lê trĩu quả', description_en: 'Compact berry bushes and heavy-bearing fruit varieties' },
  { id: 'than-go-lun-ghep', category: 'fruit', name: 'Thân Gỗ Lùn Ghép Bonsai', name_en: 'Dwarf Grafted Trees', icon: '🌳', description: 'Cóc Thái, sung Mỹ, lựu đỏ, nho thân gỗ thuần chậu', description_en: 'Dwarf container trees yielding bountiful sweet fruits' },
  { id: 'day-leo-gian-qua', category: 'fruit', name: 'Dây Leo Giàn Ăn Quả', name_en: 'Fruiting Vines & Climbers', icon: '🍇', description: 'Nho leo giàn vừa cho bóng mát vừa sai chùm quả ngọt', description_en: 'Shading vines bearing delicious fruit clusters' },

  // Ornamental
  { id: 'loc-khong-khi-nasa', category: 'ornamental', name: 'Thanh Lọc Không Khí (NASA)', name_en: 'NASA Air Purifiers', icon: '🛡️', description: 'Hút formaldehyde, benzen, nhả oxy ban đêm cho giấc ngủ ngon', description_en: 'NASA verified air cleansers for healthy bedrooms' },
  { id: 'bonsai-huong-thom', category: 'ornamental', name: 'Bonsai Hương Thơm & Hoa', name_en: 'Fragrant Bonsai & Flowers', icon: '🌸', description: 'Mai chiếu thủy, hoa nhài, hoa hồng, hương thảo thơm ngát', description_en: 'Artistic bonsai and sweet lingering floral fragrance' },
  { id: 'phong-thuy-tai-loc', category: 'ornamental', name: 'Phong Thủy Tài Lộc', name_en: 'Feng Shui & Prosperity', icon: '🎋', description: 'Kim tiền, kim ngân, trúc phú quý thu hút tài vận bình an', description_en: 'Good fortune, auspicious greenery, and prosperity' },
  { id: 'kieng-la-nhiet-doi', category: 'ornamental', name: 'Kiểng Lá Nhiệt Đới & Decor', name_en: 'Tropical Foliage Decor', icon: '🌿', description: 'Monstera lá xẻ, trầu bà thanh xuân, sen đá móng rồng', description_en: 'Architectural foliage and stunning interior green accents' }
];

const PLANT_SUBCATEGORY_MAP: Record<string, string> = {
  // Herb
  'herb-01': 'tri-ho-ho-hap',
  'herb-02': 'tri-ho-ho-hap',
  'herb-11': 'tri-ho-ho-hap',
  'herb-24': 'tri-ho-ho-hap',
  'herb-03': 'thanh-nhiet-giai-doc',
  'herb-09': 'thanh-nhiet-giai-doc',
  'herb-12': 'thanh-nhiet-giai-doc',
  'herb-13': 'thanh-nhiet-giai-doc',
  'herb-14': 'thanh-nhiet-giai-doc',
  'herb-05': 'xuong-khop-phong-han',
  'herb-06': 'xuong-khop-phong-han',
  'herb-07': 'xuong-khop-phong-han',
  'herb-17': 'xuong-khop-phong-han',
  'herb-22': 'xuong-khop-phong-han',
  'herb-04': 'bo-huyet-duong-sinh',
  'herb-08': 'bo-huyet-duong-sinh',
  'herb-10': 'bo-huyet-duong-sinh',
  'herb-15': 'bo-huyet-duong-sinh',
  'herb-21': 'bo-huyet-duong-sinh',
  'herb-16': 'tra-thao-moc-tieu-hoa',
  'herb-18': 'tra-thao-moc-tieu-hoa',
  'herb-19': 'tra-thao-moc-tieu-hoa',
  'herb-20': 'tra-thao-moc-tieu-hoa',
  'herb-23': 'tra-thao-moc-tieu-hoa',
  'herb-25': 'tra-thao-moc-tieu-hoa',
  // Sprint 1 & Sprint 2 Herbs
  'herb-26': 'bo-huyet-duong-sinh',
  'herb-27': 'xuong-khop-phong-han',
  'herb-29': 'thanh-nhiet-giai-doc',
  'herb-30': 'tra-thao-moc-tieu-hoa',
  'herb-31': 'thanh-nhiet-giai-doc',
  'herb-34': 'bo-huyet-duong-sinh',
  'herb-36': 'xuong-khop-phong-han',
  'herb-37': 'bo-huyet-duong-sinh',
  'herb-38': 'thanh-nhiet-giai-doc',
  'herb-39': 'bo-huyet-duong-sinh',
  'herb-40': 'thanh-nhiet-giai-doc',
  'herb-41': 'xuong-khop-phong-han',
  'herb-42': 'thanh-nhiet-giai-doc',
  'herb-43': 'bo-huyet-duong-sinh',
  'herb-44': 'thanh-nhiet-giai-doc',
  'herb-45': 'bo-huyet-duong-sinh',
  'herb-46': 'tra-thao-moc-tieu-hoa',
  'herb-47': 'thanh-nhiet-giai-doc',
  'herb-48': 'tra-thao-moc-tieu-hoa',

  // Fruit
  'fruit-03': 'cam-chanh-gia-vi',
  'fruit-08': 'cam-chanh-gia-vi',
  'fruit-11': 'cay-bui-qua-mong',
  'fruit-12': 'cam-chanh-gia-vi',
  'fruit-14': 'day-leo-gian-qua',
  'fruit-01': 'cay-bui-qua-mong',
  'fruit-07': 'cay-bui-qua-mong',
  'fruit-15': 'than-go-lun-ghep',
  'fruit-02': 'than-go-lun-ghep',
  'fruit-04': 'than-go-lun-ghep',
  'fruit-05': 'than-go-lun-ghep',
  'fruit-06': 'than-go-lun-ghep',
  'fruit-10': 'than-go-lun-ghep',
  'fruit-13': 'cay-bui-qua-mong',
  'fruit-09': 'day-leo-gian-qua',
  // Sprint 1, 2 & 3 Fruits
  'fruit-17': 'cay-bui-qua-mong',
  'fruit-18': 'cay-bui-qua-mong',
  'fruit-19': 'cay-bui-qua-mong',
  'fruit-20': 'day-leo-gian-qua',
  'fruit-21': 'cam-chanh-gia-vi',
  'fruit-22': 'cam-chanh-gia-vi',
  'fruit-23': 'day-leo-gian-qua',
  'fruit-24': 'day-leo-gian-qua',
  'fruit-25': 'than-go-lun-ghep',
  'fruit-26': 'than-go-lun-ghep',
  'fruit-27': 'than-go-lun-ghep',
  'fruit-28': 'than-go-lun-ghep',
  'fruit-29': 'than-go-lun-ghep',
  'fruit-30': 'cam-chanh-gia-vi',
  'fruit-31': 'cay-bui-qua-mong',

  // Ornamental
  'orn-03': 'loc-khong-khi-nasa',
  'orn-06': 'loc-khong-khi-nasa',
  'orn-08': 'loc-khong-khi-nasa',
  'orn-01': 'bonsai-huong-thom',
  'orn-02': 'bonsai-huong-thom',
  'orn-11': 'phong-thuy-tai-loc',
  'orn-12': 'kieng-la-nhiet-doi',
  'orn-13': 'loc-khong-khi-nasa',
  'orn-04': 'phong-thuy-tai-loc',
  'orn-07': 'loc-khong-khi-nasa',
  'orn-14': 'phong-thuy-tai-loc',
  'orn-05': 'kieng-la-nhiet-doi',
  'orn-09': 'kieng-la-nhiet-doi',
  'orn-10': 'loc-khong-khi-nasa',
  'orn-15': 'phong-thuy-tai-loc',
  // Sprint 2 & 3 Ornamentals
  'orn-16': 'kieng-la-nhiet-doi',
  'orn-17': 'phong-thuy-tai-loc',
  'orn-18': 'loc-khong-khi-nasa',
  'orn-19': 'bonsai-huong-thom',
  'orn-20': 'kieng-la-nhiet-doi',
  'orn-21': 'bonsai-huong-thom',
  'orn-22': 'phong-thuy-tai-loc',
  'orn-23': 'loc-khong-khi-nasa',
  'orn-24': 'phong-thuy-tai-loc',
  'orn-25': 'bonsai-huong-thom',
  'orn-26': 'loc-khong-khi-nasa'
};

/**
 * Lấy danh sách Bộ sưu tập chứa cây này
 */
export function getCollectionsForPlant(plantId: string): PlantCollection[] {
  return PLANT_COLLECTIONS.filter((c) => c.plantIds.includes(plantId));
}

/**
 * Lấy danh sách cây thuộc một Bộ sưu tập
 */
export function getPlantsForCollection<T extends { id: string }>(
  collectionSlug: string,
  plants: T[]
): T[] {
  const col = PLANT_COLLECTIONS.find(
    (c) => c.slug === collectionSlug || c.id === collectionSlug
  );
  if (!col) return [];
  return plants.filter((p) => col.plantIds.includes(p.id));
}

/**
 * Lấy thông tin tiểu danh mục của cây
 */
export function getPlantSubcategory(plantId: string): SubCategory | undefined {
  const subId = PLANT_SUBCATEGORY_MAP[plantId];
  return SUBCATEGORIES.find((s) => s.id === subId);
}

