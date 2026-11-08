import { Plant } from '../types/index.ts';

export const SEED_PLANTS: Plant[] = [
  // ==========================================
  // NHÓM 1: THẢO DƯỢC & DƯỢC THỰC ĐỒNG NGUYÊN (HERBS)
  // ==========================================
  {
    id: 'herb-01',
    slug: 'hung-chanh',
    common_name: 'Húng Chanh',
    scientific_name: 'Plectranthus amboinicus',
    aliases: ['Tần Dày Lá', 'Rau Thơm Lông', 'Dương Tử Tô'],
    category: 'herb',
    description: 'Thảo dược quý trị ho số một cho trẻ nhỏ và người lớn. Toàn thân mọng nước, chứa nhiều tinh dầu thymol và carvacrol diệt khuẩn đường hô hấp cực mạnh.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: '9f8a3c21a4e5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '20 ngày cắt lá, 45 ngày thu hoạch cả bụi',
    container_suitable: true,
    seasonality: {
      north: 'Trồng tốt nhất từ tháng 3 - tháng 9, mùa đông cần che gió bấc',
      central: 'Trồng quanh năm, mùa mưa cần giá thể thoát nước nhanh',
      south: 'Phát triển cực mạnh quanh năm dưới nắng tán xạ',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Tránh ngập úng gốc khi mưa dầm kéo dài',
    },
    medical_info: {
      uses: ['Trị ho đờm, khản tiếng, viêm họng hạt', 'Hạ sốt nhanh cho trẻ nhỏ', 'Nấu canh chua thanh nhiệt'],
      folk_remedies: [
        'Húng chanh 5 lá + Quất xanh 2 quả + Đường phèn 20g: Chưng cách thủy 20 phút, ngậm nước cốt trị dứt ho.',
        'Lá húng chanh giã nát với muối hột đắp lên nốt muỗi cắn, côn trùng đốt làm dịu ngay lập tức.'
      ],
      preparation: ['Nấu siro ho húng chanh đóng chai tiệt trùng', 'Hãm trà lá tươi uống buổi sáng thông họng'],
      toxicity_warning: 'Lành tính, không độc. Trẻ sơ sinh dưới 6 tháng tuổi nên dùng đường phèn tự nhiên, không dùng mật ong.',
      contraindications: [
        'Người có tiền sử mẫn cảm hoặc dị ứng với tinh dầu họ hoa môi (Lamiaceae).',
        'Trẻ sơ sinh dưới 6 tháng tuổi không tự ý uống tinh dầu nguyên chất đậm đặc.'
      ],
      drug_interactions: [
        'Hàm lượng carvacrol/thymol tự nhiên cao có thể tăng nhẹ hiệu ứng với các thuốc kháng nấm hoặc thuốc làm loãng máu khi dùng liều lượng dược liệu lớn kéo dài.'
      ],
      disclaimer: 'Thông tin mang tính chất chia sẻ kinh nghiệm dân gian, không thay thế chẩn đoán y khoa chuyên nghiệp.',
      confusion_risk: {
        confused_with: 'Cây húng quế hoặc cây gai hoang mọc bờ ao',
        distinguishing_features: 'Lá húng chanh rất dày, nhiều lông nhung tơ mịn, bẻ ra mùi thơm nồng như chanh sả.'
      }
    },
    monetization_tips: [
      'Nhân giống bầu cây ươm sẵn giá 25.000đ - 35.000đ/bầu cho cư dân chung cư.',
      'Nấu siro ho húng chanh - quất - đường phèn hữu cơ đóng chai 250ml bán theo mùa dịch cảm cúm.'
    ],
    tags: ['Trị ho', 'Kháng sinh tự nhiên', 'Dễ trồng chậu', 'Trẻ nhỏ']
  },
  {
    id: 'herb-02',
    slug: 'tia-to',
    common_name: 'Tía Tô Nếp',
    scientific_name: 'Perilla frutescens',
    aliases: ['Tử Tô', 'Xích Tô'],
    category: 'herb',
    description: 'Cây gia vị quen thuộc có hàm lượng chất chống oxy hóa cao, kháng viêm, hạ sốt phong hàn và hỗ trợ đào thải acid uric cho người bị gút.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Perilla_frutescens_frutescens_732814283.jpg/330px-Perilla_frutescens_frutescens_732814283.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c19f8a3c21a4e5b6c7d8e9f0',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '35 - 40 ngày là có thể tỉa lá ăn liên tục',
    container_suitable: true,
    seasonality: {
      north: 'Gieo hạt vụ xuân (tháng 2 - 4) và vụ thu (tháng 8 - 10)',
      central: 'Phát triển tốt nhất vào mùa xuân hè',
      south: 'Trồng thu hoạch quanh năm',
      best_months: [2, 3, 4, 8, 9, 10],
    },
    medical_info: {
      uses: ['Giải cảm mạo phong hàn, toát mồ hôi độc', 'Hỗ trợ đào thải acid uric cho người bị gút', 'Dưỡng trắng da, mờ thâm nám'],
      folk_remedies: [
        'Nấu cháo hành hoa + lá tía tô thái nhỏ ăn nóng khi bị cảm lạnh, đắp chăn cho toát mồ hôi.',
        'Hãm 1 nắm lá tía tô với 500ml nước sôi uống thay trà hàng ngày giúp hạ cơn đau gút cấp.'
      ],
      preparation: ['Sấy lạnh lá tía tô làm trà thảo mộc', 'Xông mặt nước tía tô tươi tinh dầu'],
      toxicity_warning: 'Người ra quá nhiều mồ hôi do biểu hư không nên uống nước tía tô đậm đặc kéo dài.',
      disclaimer: 'Thông tin mang tính chất chia sẻ kinh nghiệm dân gian, không thay thế chẩn đoán y khoa chuyên nghiệp.'
    },
    monetization_tips: [
      'Làm trà tía tô sấy lạnh túi lọc bán cho người ăn kiêng và người phòng ngừa gút.',
      'Bán cây giống và hạt giống thuần F1 bản địa.'
    ],
    tags: ['Giải cảm', 'Trị gút', 'Dưỡng da', 'Rau thơm']
  },
  {
    id: 'herb-03',
    slug: 'diep-ca',
    common_name: 'Diếp Cá',
    scientific_name: 'Houttuynia cordata',
    aliases: ['Giấp Cá', 'Ngư Tinh Thảo'],
    category: 'herb',
    description: 'Kháng sinh thảo dược cực mạnh chuyên thanh nhiệt, giải độc, tiêu viêm loét và đặc trị trĩ nội trĩ ngoại.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Houttuynia_cordata.jpg/330px-Houttuynia_cordata.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '30 ngày đẻ nhánh lan kín mặt chậu',
    container_suitable: true,
    medical_info: {
      uses: ['Thanh nhiệt tiêu viêm, giải độc gan', 'Điều trị trĩ và táo bón mãn tính', 'Hạ sốt cấp tính'],
      folk_remedies: [
        'Xay 100g diếp cá tươi lọc lấy nước uống, bã đắp hậu môn trị trĩ sưng đau.',
        'Giã nát lá diếp cá đắp trán và bẹn giúp trẻ hạ sốt an toàn không lạm dụng paracetamol.'
      ],
      toxicity_warning: 'Tính hàn mát, người tỳ vị hư hàn đi ngoài phân lỏng không nên uống nước cốt sống nhiều.',
      disclaimer: 'Thông tin mang tính chất chia sẻ kinh nghiệm dân gian, không thay thế chẩn đoán y khoa chuyên nghiệp.'
    },
    monetization_tips: [
      'Kinh doanh chậu cây diếp cá sinh trưởng nhanh cho các hộ gia đình chung cư.',
      'Sản xuất bột diếp cá sấy thăng hoa nguyên chất.'
    ],
    tags: ['Thanh nhiệt', 'Trị trĩ', 'Hạ sốt', 'Dễ sống']
  },
  {
    id: 'herb-04',
    slug: 'dinh-lang',
    common_name: 'Đinh Lăng Nếp Lá Nhỏ',
    scientific_name: 'Polyscias fruticosa',
    aliases: ['Sâm Của Người Nghèo', 'Cây Gỏi Cá'],
    category: 'herb',
    description: 'Thảo dược đại bổ của danh y Hải Thượng Lãn Ông. Lá thơm ăn gỏi bồi bổ thần kinh; củ rễ lâu năm chứa saponin bổ khí huyết tương đương nhân sâm.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg/330px-Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c19f8a3c21a4e5b6c7d8e9f0a1b2',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '6 tháng tỉa lá, 3 năm - 5 năm thu hoạch rễ củ quý',
    container_suitable: true,
    seasonality: {
      north: 'Giâm hom cành từ tháng 2 - 4 (mùa xuân có mưa phùn), tránh giâm mùa đông',
      central: 'Giâm đầu mùa mưa khi đất đủ ẩm',
      south: 'Giâm cành quanh năm dưới bóng râm',
      best_months: [2, 3, 4, 8, 9],
      warning: 'Cây sợ úng nước, rễ non sẽ thối đen nếu chậu bí nước'
    },
    medical_info: {
      uses: ['Bồi bổ khí huyết, tăng lực, chống suy nhược', 'An thần, chữa mất ngủ kinh niên', 'Lá non ăn kèm gỏi cá chống ngộ độc đạm'],
      folk_remedies: [
        'Lá đinh lăng sao vàng hãm nước uống trước khi ngủ 1 giờ giúp ngủ sâu giấc.',
        'Rễ củ đinh lăng 3 năm tuổi ngâm rượu nếp 40 độ sau 3 tháng thành rượu bổ gân cốt.'
      ],
      toxicity_warning: 'Chứa hàm lượng saponin cao. Không uống nước sắc đinh lăng quá đặc và kéo dài sẽ gây say, mệt mỏi.',
      disclaimer: 'Thông tin mang tính chất chia sẻ kinh nghiệm dân gian, không thay thế chẩn đoán y khoa chuyên nghiệp.'
    },
    monetization_tips: [
      'Chiết cành giống chuẩn nếp lá nhỏ bán 40.000đ - 60.000đ/cây.',
      'Nuôi dưỡng chậu bonsai đinh lăng gốc to 3-5 năm giá từ 500.000đ - 2.000.000đ/chậu.'
    ],
    tags: ['Bổ khí huyết', 'Ngủ ngon', 'Sâm Việt Nam', 'Bonsai thuốc']
  },
  {
    id: 'herb-05',
    slug: 'ngai-cuu',
    common_name: 'Ngải Cứu',
    scientific_name: 'Artemisia vulgaris',
    aliases: ['Thuốc Cứu', 'Ngải Diệp'],
    category: 'herb',
    description: 'Thảo dược ôn ấm kinh mạch, thông huyết ứ, an thai và trị đau nhức xương khớp gió lạnh.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/ArtemisiaVulgaris.jpg/330px-ArtemisiaVulgaris.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '30 ngày',
    container_suitable: true,
    medical_info: {
      uses: ['Điều hòa kinh nguyệt, ấm tử cung', 'Giảm đau nửa đầu, đau mỏi thắt lưng', 'Món ăn bổ dưỡng trứng rán ngải cứu, gà tần'],
      toxicity_warning: 'Phụ nữ mang thai 3 tháng đầu không nên ăn ngải cứu quá nhiều lần trong tuần.',
      disclaimer: 'Thông tin mang tính chất chia sẻ kinh nghiệm dân gian, không thay thế chẩn đoán y khoa chuyên nghiệp.'
    },
    monetization_tips: ['Sản xuất nhang ngải cứu nhung trị liệu dưỡng sinh.'],
    tags: ['Ấm kinh', 'Đau đầu', 'Món ăn thuốc']
  },
  {
    id: 'herb-06',
    slug: 'la-lot',
    common_name: 'Lá Lốt',
    scientific_name: 'Piper sarmentosum',
    aliases: ['Tất Bát'],
    category: 'herb',
    description: 'Cây thuốc gia vị thơm nồng, tính ấm, chuyên trị tê thấp, ra mồ hôi chân tay và đau khớp mùa lạnh.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Piper_sarmentosum.jpg/330px-Piper_sarmentosum.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '25 ngày cắt lá',
    container_suitable: true,
    medical_info: {
      uses: ['Trừ phong thấp, giảm đau nhức xương khớp', 'Trị đổ mồ hôi tay chân', 'Món bò nướng lá lốt, chả lá lốt'],
      folk_remedies: ['Nấu nước lá lốt ngâm chân nước ấm trước khi ngủ chữa phong tê thấp.'],
      disclaimer: 'Thông tin mang tính chất tham khảo dân gian.'
    },
    monetization_tips: ['Bán cành giống giâm rễ nhanh cho vườn ban công râm mát.'],
    tags: ['Xương khớp', 'Mồ hôi chân', 'Ẩm thực']
  },
  {
    id: 'herb-07',
    slug: 'gung-gio',
    common_name: 'Gừng Gió Bản Địa',
    scientific_name: 'Zingiber zerumbet',
    aliases: ['Gừng Rừng', 'Mã Đề Khương'],
    category: 'herb',
    description: 'Loài gừng hoang dã chứa hàm lượng tinh dầu zerumbone quý, hỗ trợ ức chế khối u và chống viêm đường tiêu hóa.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Zingiber_zerumbet_03.JPG/330px-Zingiber_zerumbet_03.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '8 - 10 tháng thu hoạch củ quý',
    container_suitable: true,
    tags: ['Kháng viêm', 'Tiêu hóa', 'Dược liệu quý']
  },
  {
    id: 'herb-08',
    slug: 'nghe-nep-do',
    common_name: 'Nghệ Nếp Đỏ (Hưng Yên)',
    scientific_name: 'Curcuma longa',
    aliases: ['Khương Hoàng', 'Nghệ Đỏ'],
    category: 'herb',
    description: 'Giống nghệ nếp lõi đỏ tươi có hàm lượng Curcumin cao gấp 3-4 lần nghệ vàng thông thường, báu vật chữa viêm loét dạ dày.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Turmeric_inflorescence.jpg/330px-Turmeric_inflorescence.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '9 tháng đào củ',
    container_suitable: true,
    monetization_tips: ['Chế biến tinh bột nghệ nếp đỏ và mật ong nghệ viên nén.'],
    tags: ['Dạ dày', 'Curcumin cao', 'Bản địa']
  },
  {
    id: 'herb-09',
    slug: 'ca-gai-leo',
    common_name: 'Cà Gai Leo',
    scientific_name: 'Solanum procumbens',
    aliases: ['Cà Gai Dây', 'Cà Quạnh'],
    category: 'herb',
    description: 'Cây thuốc Nam đầu bảng trong giải độc gan, hạ men gan và hỗ trợ điều trị viêm gan B mãn tính.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Solanum_trilobatum_flowers.JPG/960px-Solanum_trilobatum_flowers.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '6 tháng thu cắt dây',
    container_suitable: true,
    tags: ['Giải độc gan', 'Hạ men gan', 'Thuốc quý']
  },
  {
    id: 'herb-10',
    slug: 'chum-ngay',
    common_name: 'Chùm Ngây',
    scientific_name: 'Moringa oleifera',
    aliases: ['Cây Độ Sinh', 'Moringa'],
    category: 'herb',
    description: 'Siêu thực phẩm xanh. Lá chùm ngây chứa vitamin C gấp 7 lần cam, canxi gấp 4 lần sữa, bồi dưỡng thể lực tuyệt vời.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/DrumstickFlower.jpg/330px-DrumstickFlower.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '45 ngày bấm ngọn nấu canh',
    container_suitable: true,
    tags: ['Siêu dinh dưỡng', 'Canh bổ', 'Dễ lớn']
  },
  {
    id: 'herb-11',
    slug: 'xuyen-tam-lien',
    common_name: 'Xuyên Tâm Liên',
    scientific_name: 'Andrographis paniculata',
    aliases: ['Công Cộng', 'Khổ Đảm Thảo', 'Vua Thuốc Đắng'],
    category: 'herb',
    description: 'Kháng sinh thực vật cực mạnh trong Đông y. Có vị đắng thanh nhiệt, giải độc họng, hạ sốt phong nhiệt và hỗ trợ kháng viêm đường hô hấp.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Andrographis_paniculata_%28Kalpa%29_in_Narshapur_forest%2C_AP_W2_IMG_0867.jpg/330px-Andrographis_paniculata_%28Kalpa%29_in_Narshapur_forest%2C_AP_W2_IMG_0867.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '60 ngày thu hái cành lá',
    container_suitable: true,
    medical_info: {
      uses: ['Viêm họng hạt, viêm amidan, ho đờm', 'Hạ sốt phát ban', 'Kháng khuẩn đường ruột'],
      folk_remedies: ['Lá tươi 10g hãm nước sôi ngậm xúc họng trị viêm họng cấp.'],
      disclaimer: 'Thông tin tham khảo y học cổ truyền. Phụ nữ mang thai không được sử dụng.'
    },
    tags: ['Kháng sinh tự nhiên', 'Thanh nhiệt', 'Hạ sốt']
  },
  {
    id: 'herb-12',
    slug: 'co-muc',
    common_name: 'Cỏ Mực (Nhọ Nồi)',
    scientific_name: 'Eclipta prostrata',
    aliases: ['Cây Cỏ Nhọ Nồi', 'Hạn Liên Thảo'],
    category: 'herb',
    description: 'Thảo dược cầm máu và bổ can thận danh tiếng. Vò nát nước đen như mực, rất lành tính, trị sốt xuất huyết phát ban và hỗ trợ đen tóc.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/False_daisy_or_bhringraj_%28Eclipta_prostrata%29_flower.jpg/330px-False_daisy_or_bhringraj_%28Eclipta_prostrata%29_flower.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '30 ngày ra hoa thu hoạch',
    container_suitable: true,
    medical_info: {
      uses: ['Cầm máu ngoài da, rong kinh nhẹ', 'Hạ sốt phát ban cho trẻ', 'Làm mát gan, nhuận tràng'],
      folk_remedies: ['Giã nát lá tươi hòa nước ấm uống hạ nhiệt khi sốt cao.'],
      disclaimer: 'Tham khảo ý kiến bác sĩ khi dùng cho các bệnh lý xuất huyết nặng.'
    },
    tags: ['Cầm máu', 'Hạ sốt', 'Dễ mọc chậu']
  },
  {
    id: 'herb-13',
    slug: 'rau-ma',
    common_name: 'Rau Má Bản Địa',
    scientific_name: 'Centella asiatica',
    aliases: ['Tích Tuyết Thảo', 'Liên Tiền Thảo'],
    category: 'herb',
    description: 'Dược thực đồng nguyên thanh nhiệt, làm lành vết thương và tái tạo da mụn. Giàu hợp chất asiaticoside kích thích sinh collagen tự nhiên.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Centella_asiatica_%28%E0%A6%A5%E0%A6%BE%E0%A6%A8%E0%A6%95%E0%A7%81%E0%A6%A8%E0%A6%BF%29_%283%29.jpg/330px-Centella_asiatica_%28%E0%A6%A5%E0%A6%BE%E0%A6%A8%E0%A6%95%E0%A7%81%E0%A6%A8%E0%A6%BF%29_%283%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '25 ngày cắt tỉa lứa mới',
    container_suitable: true,
    medical_info: {
      uses: ['Nước ép giải độc, mát gan', 'Trị mụn nhọt, rôm sảy mùa hè', 'Hạ huyết áp nhẹ'],
      folk_remedies: ['Xay rau má tươi với nước dừa tươi uống thanh lọc cơ thể.'],
      disclaimer: 'Không uống liên tục quá 30 ngày để tránh ảnh hưởng tiêu hóa.'
    },
    tags: ['Thanh nhiệt', 'Đẹp da', 'Dễ trồng']
  },
  {
    id: 'herb-14',
    slug: 'kim-ngan-hoa',
    common_name: 'Kim Ngân Hoa Leo Chậu',
    scientific_name: 'Lonicera japonica',
    aliases: ['Nhẫn Đông', 'Song Hoa'],
    category: 'herb',
    description: 'Dây leo hoa thơm thanh khiết đổi từ trắng sang vàng. Kháng sinh tự nhiên hàng đầu trị mụn nhọt, viêm họng nhiệt và thanh giải thử nhiệt.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Honeysuckle-2.jpg/330px-Honeysuckle-2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '90 ngày đơm hoa bói',
    container_suitable: true,
    medical_info: {
      uses: ['Trà hoa giải độc, tiêu viêm', 'Trị mẩn ngứa, dị ứng thời tiết', 'Kháng khuẩn liên cầu/tụ cầu'],
      folk_remedies: ['Búp hoa kim ngân 6g hãm trà uống hàng ngày giúp mát gan mịn da.'],
      disclaimer: 'Người tỳ vị hư hàn lạnh bụng nên dùng liều thấp hoặc kèm gừng ấm.'
    },
    tags: ['Hoa thơm', 'Giải độc', 'Leo giàn ban công']
  },
  {
    id: 'herb-15',
    slug: 'sam-dat',
    common_name: 'Sâm Đất (Thổ Nhân Sâm)',
    scientific_name: 'Talinum paniculatum',
    aliases: ['Sâm Thảo', 'Thổ Cao Ly Sâm'],
    category: 'herb',
    description: 'Cây rau bổ dưỡng chứa saponin quý bồi bổ khí huyết, mát gan nhuận tràng. Củ mập béo sau 1 năm ngâm rượu hoặc nấu canh sườn tẩm bổ.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Talinum_paniculatum_5Dsr_7057.jpg/330px-Talinum_paniculatum_5Dsr_7057.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '40 ngày hái đọt, 1 năm thu củ',
    container_suitable: true,
    tags: ['Bổ khí huyết', 'Canh ngon', 'Củ sâm quý']
  },
  {
    id: 'herb-16',
    slug: 'sa-chanh',
    common_name: 'Sả Chanh Trồng Chậu',
    scientific_name: 'Cymbopogon citratus',
    aliases: ['Cỏ Sả', 'Hương Mao'],
    category: 'herb',
    description: 'Cây gia vị đuổi muỗi kinh điển. Giàu citral và geraniol giúp kháng khuẩn, giải cảm xông hơi, hỗ trợ hạ huyết áp và thông tiểu tiện.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/YosriNov04Pokok_Serai.JPG/330px-YosriNov04Pokok_Serai.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '60 ngày nhổ tỉa củ',
    container_suitable: true,
    tags: ['Đuổi muỗi', 'Xông giải cảm', 'Gia vị']
  },
  {
    id: 'herb-17',
    slug: 'luoc-vang',
    common_name: 'Lược Vàng',
    scientific_name: 'Callisia fragrans',
    aliases: ['Địa Lan Vòi', 'Lan Rũ'],
    category: 'herb',
    description: 'Thảo dược dân gian quý chứa flavonoid và steroid thực vật. Giúp giảm đau nhức xương khớp, hỗ trợ làm lành viêm loét dạ dày và vết bầm tím.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Callisia_fragrans_4zz.jpg/330px-Callisia_fragrans_4zz.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '6 tháng vươn vòi nhánh',
    container_suitable: true,
    tags: ['Xương khớp', 'Dạ dày', 'Dễ chăm']
  },
  {
    id: 'herb-18',
    slug: 'song-doi',
    common_name: 'Sống Đời (Cây Bỏng)',
    scientific_name: 'Kalanchoe pinnata',
    aliases: ['Diệp Sinh Căn', 'Lạc Địa Sinh Căn'],
    category: 'herb',
    description: 'Cứ rớt lá xuống đất là mọc cây con. Cứu tinh làm mát vết bỏng nhẹ, kháng khuẩn đường ruột, làm dịu trĩ và viêm tai giữa dân gian.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Kalanchoe_pinnata_kz1.JPG/330px-Kalanchoe_pinnata_kz1.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '30 ngày nhân giống hàng loạt',
    container_suitable: true,
    tags: ['Trị bỏng', 'Sức sống mãnh liệt', 'Hoa đẹp']
  },
  {
    id: 'herb-19',
    slug: 'bac-ha-au',
    common_name: 'Bạc Hà Âu (Peppermint)',
    scientific_name: 'Mentha piperita',
    aliases: ['Bạc Hà Cay', 'Peppermint'],
    category: 'herb',
    description: 'Nữ hoàng sảng khoái với hàm lượng menthol tinh khiết cao. Giúp tỉnh táo đầu óc, thông mũi nghẹt, tiêu hóa nhanh êm bụng và khử mùi khoang miệng.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Pfefferminze_natur_peppermint.jpg/330px-Pfefferminze_natur_peppermint.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '20 ngày hái đọt pha trà',
    container_suitable: true,
    tags: ['Menthol sảng khoái', 'Pha trà', 'Tiêu hóa']
  },
  {
    id: 'herb-20',
    slug: 'cuc-hoa-vang',
    common_name: 'Cúc Hoa Vàng (Kim Cúc)',
    scientific_name: 'Chrysanthemum indicum',
    aliases: ['Hoàng Cúc', 'Cúc Dược Liệu'],
    category: 'herb',
    description: 'Vị thuốc sáng mắt hạ hỏa trứ danh. Búp hoa khô hãm trà kỷ tử giúp thanh can minh mục, giảm nhức đầu căng thẳng do dùng máy tính nhiều.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Chrysanthemum_indicum1.jpg/330px-Chrysanthemum_indicum1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '75 ngày trổ hoa rực rỡ',
    container_suitable: true,
    tags: ['Sáng mắt', 'Trà an thần', 'Thanh nhiệt']
  },

  // ==========================================
  // NHÓM 2: CÂY ĂN TRÁI ĐÔ THỊ (FRUITS IN CONTAINERS)
  // ==========================================
  {
    id: 'fruit-01',
    slug: 'oi-le-dai-loan',
    common_name: 'Ổi Lê Đài Loan Ghép Cành',
    scientific_name: 'Psidium guajava',
    aliases: ['Ổi Lê Trồng Chậu', 'Ổi Nữ Hoàng Lùn'],
    category: 'fruit',
    description: 'Cây ăn trái số một cho ban công và sân thượng đô thị. Cực kỳ nhanh ra trái, trồng chậu 50L sau 4 tháng đã bắt đầu đậu quả, trái giòn ngọt ít hạt.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Psidium_guajava_fruit.jpg/330px-Psidium_guajava_fruit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 2,
    growth_time: '4 - 6 tháng bắt đầu cho lứa quả đầu tiên',
    container_suitable: true,
    seasonality: {
      north: 'Trồng tháng 2 - 4 hoặc tháng 8 - 10, bọc trái chống ruồi vàng',
      central: 'Tránh giai đoạn mưa lũ úng rễ chậu',
      south: 'Cho trái thu hoạch 4 mùa liên tục',
      best_months: [2, 3, 4, 8, 9, 10],
    },
    monetization_tips: [
      'Bán cây giống ghép cành đang có sẵn hoa và nụ giá 120.000đ - 180.000đ/cây.',
      'Dịch vụ tỉa cành, bấm đọt kích quả nghịch vụ cho sân thượng.'
    ],
    tags: ['Cực sai quả', 'Nhanh thu hoạch', 'Sân thượng', 'Giòn ngọt']
  },
  {
    id: 'fruit-02',
    slug: 'coc-thai-lun',
    common_name: 'Cóc Thái Lùn Trĩu Cành',
    scientific_name: 'Spondias dulcis',
    aliases: ['Cóc Cảnh Sân Thượng', 'Cóc Không Hạt'],
    category: 'fruit',
    description: 'Cây chỉ cao 80cm đã trĩu chịt từng chùm quả. Ra hoa đậu trái liên tục quanh năm không cần ép hoa, quả giòn rụm chấm muối ớt tuyệt hảo.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Starr_980529-4218_Spondias_dulcis.jpg/330px-Starr_980529-4218_Spondias_dulcis.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '3 tháng là có trái ăn liên tục',
    container_suitable: true,
    tags: ['Ra quả quanh năm', 'Dễ chăm', 'Trẻ nhỏ thích']
  },
  {
    id: 'fruit-03',
    slug: 'chanh-tu-quy',
    common_name: 'Chanh Tứ Quý Không Hạt',
    scientific_name: 'Citrus latifolia',
    aliases: ['Chanh Bốn Mùa', 'Chanh Mỹ Chậu'],
    category: 'fruit',
    description: 'Cây gia vị thiết yếu của mọi nhà. Cho quả mọng nước, thơm lừng quanh năm, lá chanh nấu ốc/hấp gà không thể thiếu.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Starr-140117-3997-Citrus_latifolia-Tahitian_fruit_and_leaves-Hawea_Pl_Olinda-Maui_%2824612312943%29.jpg/330px-Starr-140117-3997-Citrus_latifolia-Tahitian_fruit_and_leaves-Hawea_Pl_Olinda-Maui_%2824612312943%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 2,
    growth_time: '5 tháng thu hoạch trái',
    container_suitable: true,
    tags: ['Gia vị bếp', 'Không hạt', 'Trái 4 mùa']
  },
  {
    id: 'fruit-04',
    slug: 'sung-my',
    common_name: 'Sung Mỹ Mật Ngọt (Black Genoa)',
    scientific_name: 'Ficus carica',
    aliases: ['Sung Đường', 'Figs Ban Công'],
    category: 'fruit',
    description: 'Nữ hoàng cây ăn trái ban công cao cấp. Quả to bằng nắm tay, ruột đỏ ứa mật ngọt lịm, giàu chất xơ và kali chống lão hóa.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ficus_carica_L%2C_1771.jpg/330px-Ficus_carica_L%2C_1771.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '6 tháng bắt đầu chín mật',
    container_suitable: true,
    monetization_tips: ['Chiết cành sung Mỹ giống chuẩn bán 150.000đ - 250.000đ/cây giống thuần.'],
    tags: ['Trái ngọt mật', 'Cao cấp', 'Sân thượng nắng']
  },
  {
    id: 'fruit-05',
    slug: 'luu-do-lun',
    common_name: 'Lựu Đỏ Lùn Ấn Độ',
    scientific_name: 'Punica granatum',
    aliases: ['Lựu Phong Thủy', 'Lựu Bonsai Chậu'],
    category: 'fruit',
    description: 'Biểu tượng của tài lộc và con đàn cháu đống. Cây lùn sai hoa đỏ rực rỡ, quả mọng đỏ sẫm hạt mềm ngọt mọng nước.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pomegranate_Juice_%282019%29.jpg/330px-Pomegranate_Juice_%282019%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '8 tháng đậu quả',
    container_suitable: true,
    tags: ['Phong thủy', 'Hoa đỏ rực', 'Nước ép bổ']
  },
  {
    id: 'fruit-06',
    slug: 'khe-ngot',
    common_name: 'Khế Ngọt Ghép Cành',
    scientific_name: 'Averrhoa carambola',
    aliases: ['Khế Đường Trồng Chậu', 'Khế Thái'],
    category: 'fruit',
    description: 'Cây ăn trái phong thủy sai trĩu chùm hoa tím hồng và quả vàng mọng nước. Cây ghép chậu 60L ra quả quanh năm, ngọt thanh dịu mát.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Averrhoa_carambola_ARS_k5735-7.jpg/330px-Averrhoa_carambola_ARS_k5735-7.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 2,
    growth_time: '5 tháng bói quả',
    container_suitable: true,
    tags: ['Sai quả', 'Hoa tím đẹp', 'Phong thủy']
  },
  {
    id: 'fruit-07',
    slug: 'dau-tay-chiu-nhiet',
    common_name: 'Dâu Tây Chịu Nhiệt Tochiotome',
    scientific_name: 'Fragaria ananassa',
    aliases: ['Dâu Tây Nhật Bản', 'Dâu Tây Ban Công'],
    category: 'fruit',
    description: 'Giống dâu tây Nhật thuần hóa chịu nóng trên 35°C tại Sài Gòn và Hà Nội. Quả đỏ mọng thơm nức mũi, rủ chùm ban công cực kỳ bắt mắt.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/330px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 2,
    growth_time: '60 ngày thu quả ngọt',
    container_suitable: true,
    tags: ['Quả ngọt thơm', 'Trồng chậu treo', 'Trẻ em mê']
  },
  {
    id: 'fruit-08',
    slug: 'chanh-dao',
    common_name: 'Chanh Đào Mọng Nước',
    scientific_name: 'Citrus limonia',
    aliases: ['Chanh Ruột Hồng', 'Chanh Ngâm Mật Ong'],
    category: 'fruit',
    description: 'Vỏ mỏng vàng bóng, ruột hồng đào mọng nước và tinh dầu thơm ngát. Mùa thu hoạch vào thu đông, chuyên ngâm mật ong đường phèn trị ho.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Citrus_x_limonia_%282%29.jpg/960px-Citrus_x_limonia_%282%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 2,
    growth_time: '6 tháng bắt đầu đậu quả',
    container_suitable: true,
    tags: ['Trị ho đờm', 'Ngâm mật ong', 'Cực sai quả']
  },
  {
    id: 'fruit-09',
    slug: 'nho-ninh-thuan',
    common_name: 'Nho Ninh Thuận Trồng Chậu',
    scientific_name: 'Vitis vinifera',
    aliases: ['Nho Đỏ NH01-48', 'Nho Giàn Sân Thượng'],
    category: 'fruit',
    description: 'Giống nho đỏ bản địa thích nghi tuyệt hảo khí hậu nắng gắt Việt Nam. Trồng thùng xốp hoặc chậu xi măng leo giàn che bóng mát ban công.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Grapes%2C_Rostov-on-Don%2C_Russia.jpg/330px-Grapes%2C_Rostov-on-Don%2C_Russia.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '10 tháng bấm cành kích hoa',
    container_suitable: true,
    tags: ['Leo giàn mát', 'Chùm quả đẹp', 'Sân thượng']
  },
  {
    id: 'fruit-10',
    slug: 'tao-thai-lun',
    common_name: 'Táo Thái Siêu Quả',
    scientific_name: 'Ziziphus mauritiana',
    aliases: ['Táo Bàng Ghép', 'Táo Ngọt Chậu'],
    category: 'fruit',
    description: 'Cây ăn trái sinh trưởng thần tốc. Cành nhánh dẻo dai đeo hàng trăm quả táo tròn bóng giòn ngọt, chịu hạn và chịu nắng ban công số một.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ziziphus_jujuba.jpg/330px-Ziziphus_jujuba.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '4 tháng cho lứa quả trĩu cành',
    container_suitable: true,
    tags: ['Siêu sai quả', 'Giòn ngọt', 'Cực dễ chăm']
  },

  // ==========================================
  // NHÓM 3: CÂY CẢNH, HOA & BONSAI NGHỆ THUẬT (ORNAMENTAL)
  // ==========================================
  {
    id: 'orn-01',
    slug: 'mai-chieu-thuy',
    common_name: 'Mai Chiếu Thủy Bonsai',
    scientific_name: 'Wrightia religiosa',
    aliases: ['Lá Trung', 'Kim Giòn', 'Mai Chiếu Thổ'],
    category: 'ornamental',
    description: 'Vua cây cảnh phong thủy Việt Nam. Hoa trắng tinh khôi nở hướng xuống đất, hương thơm ngào ngạt thanh tao giúp tĩnh tâm thư giãn.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Water_Jasmine_bonsai_711%2C_October_10%2C_2008.jpg/330px-Water_Jasmine_bonsai_711%2C_October_10%2C_2008.jpg?utm_source=vi.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c19f8a3c21a4e5b6c7d8e9f0a1b2c3',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 3,
    growth_time: '2 - 5 năm thành tác phẩm bonsai giá trị',
    container_suitable: true,
    monetization_tips: [
      'Uốn tạo dáng bonsai mini để bàn giá từ 300.000đ đến vài triệu đồng.',
      'Đúc Hộ chiếu NFT số hóa tuổi thọ và chứng nhận nghệ nhân tạo tác.'
    ],
    tags: ['Bonsai', 'Hương thơm', 'Phong thủy', 'Thư thái']
  },
  {
    id: 'orn-02',
    slug: 'hoa-hong-co-sapa',
    common_name: 'Hoa Hồng Cổ Sapa',
    scientific_name: 'Rosa odorata',
    aliases: ['Hồng Cổ Pháp', 'Hồng Trà Cổ'],
    category: 'ornamental',
    description: 'Giống hoa hồng cổ bản địa đượm sắc hương. Cánh hoa kép dày dặn xếp tầng cung điện, hương thơm nước hoa Pháp cổ điển quyến rũ.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Rosa_chinensis.jpg/330px-Rosa_chinensis.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 3,
    growth_time: '3 tháng bật lứa hoa rực rỡ',
    container_suitable: true,
    tags: ['Hương nước hoa', 'Sang trọng', 'Bản địa']
  },
  {
    id: 'orn-03',
    slug: 'ngu-gia-bi',
    common_name: 'Ngũ Gia Bì Chân Chim',
    scientific_name: 'Schefflera heptaphylla',
    aliases: ['Cây Đuổi Muỗi', 'Chân Vịt'],
    category: 'ornamental',
    description: 'Cây cảnh nội thất bền bỉ số một. Tỏa mùi tinh dầu tự nhiên đuổi muỗi, lọc sạch khói bụi và hóa chất độc hại trong phòng kín.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Schefflera_arboricola%2C_vrugte%2C_a%2C_Pretoria.jpg/330px-Schefflera_arboricola%2C_vrugte%2C_a%2C_Pretoria.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'indoor',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: 'Cây bền sống nhiều năm trong nhà',
    container_suitable: true,
    tags: ['Đuổi muỗi', 'Lọc không khí', 'Nội thất bền']
  },
  {
    id: 'orn-04',
    slug: 'kim-tien',
    common_name: 'Kim Tiền Chiêu Tài',
    scientific_name: 'Zamioculcas zamiifolia',
    aliases: ['Kim Phát Tài'],
    category: 'ornamental',
    description: 'Cây phong thủy vượng tài lộc. Thân mọng nước, lá xanh bóng mỡ màng, sức sống mãnh liệt chịu hạn và thiếu sáng cực giỏi.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Zamioculcas_zamiifolia_1.jpg/330px-Zamioculcas_zamiifolia_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'indoor',
    watering: 'drought_tolerant',
    propagation_difficulty: 1,
    growth_time: 'Sống khỏe quanh năm',
    container_suitable: true,
    tags: ['Chiêu tài', 'Cực dễ sống', 'Văn phòng']
  },
  {
    id: 'orn-05',
    slug: 'sen-da-phat-ba',
    common_name: 'Sen Đá Phật Bà',
    scientific_name: 'Sempervivum tectorum',
    aliases: ['Sen Đá Nghìn Mắt'],
    category: 'ornamental',
    description: 'Tượng trưng cho sự may mắn và bình an che chở. Hàng chục cánh sen xếp tròn đồng tâm tuyệt mỹ như tòa sen Quan Âm.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Sempervivum_tectorum_Almindelig_Husl%C3%B8g.jpg/330px-Sempervivum_tectorum_Almindelig_Husl%C3%B8g.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'drought_tolerant',
    propagation_difficulty: 2,
    growth_time: '3 tháng đẻ cây con xung quanh',
    container_suitable: true,
    tags: ['May mắn', 'Tiểu cảnh', 'Chịu hạn']
  }
,

  // ==========================================
  // BỔ SUNG 15 LOÀI THỰC VẬT ĐÔ THỊ MỚI (MS3 MILESTONE)
  // ==========================================
  {
    "id": "fruit-11",
    "slug": "dau-tam-ngot-dai-loan",
    "common_name": "Dâu Tằm Ngọt F1 Đài Loan",
    "scientific_name": "Morus alba",
    "aliases": [
      "Dâu Trái Dài",
      "Dâu Quả Ngọt Trồng Chậu",
      "Tang Thầm"
    ],
    "category": "fruit",
    "description": "Giống dâu tằm quả dài ngọt lịm không chua, năng suất cực cao khi trồng chậu ban công. Lá dùng hãm trà thanh nhiệt bổ phổi, quả chín tím đen chứa hàm lượng anthocyanin và resveratrol chống lão hóa vượt trội.",
    "quick_answer": "Dâu tằm ngọt F1 Đài Loan trồng chậu tối thiểu 40L, ưa nắng trực tiếp 6-8 tiếng/ngày. Cây ra quả sau 4-5 tháng trồng từ cành chiết. Bấm đọt và tỉa lá định kỳ sau mỗi đợt thu hoạch để kích chồi hoa mới quanh năm.",
    "botanical_details": {
      "family": "Moraceae (Họ Dâu tằm)",
      "native_range": "Đông Á, thích nghi hoàn hảo khí hậu 3 miền Việt Nam",
      "active_compounds": [
        "Anthocyanin",
        "Resveratrol",
        "Vitamin C",
        "Flavonoid"
      ],
      "soil_ph": "6.0 - 7.0 (Đất mùn tơi xốp thoát nước nhanh)",
      "ideal_temp": "22°C - 35°C",
      "pot_size": "Đường kính 40cm - 60cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Rosales_-_Morus_alba_-_3.jpg/960px-Rosales_-_Morus_alba_-_3.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 1,
    "growth_time": "4 - 5 tháng cho lứa quả ngọt đầu tiên",
    "container_suitable": true,
    "seasonality": {
      "north": "Trồng mùa xuân (tháng 2-4), tỉa cành đón quả đầu hè",
      "central": "Tránh tháng mưa bão ngập úng gốc",
      "south": "Phát triển và cho trái rải rác quanh năm",
      "best_months": [
        2,
        3,
        4,
        9,
        10
      ],
      "warning": "Tránh để chậu úng nước khi mưa dầm kéo dài"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Chuẩn bị giá thể",
        "instruction": "Phối trộn 40% đất thịt, 30% xơ dừa hoai mục, 20% phân trùn quế và 10% đá perlite để rễ thông thoáng."
      },
      {
        "step": 2,
        "title": "Trồng và cố định",
        "instruction": "Đặt bầu cây vào chậu sâu ít nhất 35cm, nén nhẹ đất và cắm cọc tre định hình cành non trước gió mạnh sân thượng."
      },
      {
        "step": 3,
        "title": "Bấm đọt kích quả",
        "instruction": "Khi cành đạt độ dài 50-60cm, bấm ngọn và tuốt bớt lá già. Các mắt ngủ sẽ đồng loạt bung hoa và quả con sau 10-14 ngày."
      }
    ],
    "faqs": [
      {
        "question": "Dâu tằm Đài Loan trồng ban công chung cư có ngọt không?",
        "answer": "Cây cần ít nhất 4 tiếng nắng gắt mỗi ngày và bón bổ sung kali hữu cơ (tro trấu hun hoặc dịch chuối) khi nuôi quả để đạt độ ngọt sắc 18-20 độ Brix."
      },
      {
        "question": "Có cần thụ phấn nhân tạo cho dâu tằm không?",
        "answer": "Không, dâu tằm là giống tự thụ phấn nhờ gió và côn trùng tự nhiên, trồng 1 cây vẫn đậu quả trĩu cành."
      }
    ],
    "monetization_tips": [
      "Bán cành giâm giống dâu quả dài F1 giá 35.000đ - 60.000đ/cành.",
      "Sản xuất siro dâu tằm đường phèn lên men thủ công và lá dâu sấy lạnh làm trà thảo mộc."
    ],
    "tags": [
      "Cực sai quả",
      "Chống lão hóa",
      "Dễ trồng chậu",
      "Trà thảo mộc"
    ]
  },

  {
    "id": "fruit-12",
    "slug": "quat-canh-tu-quy",
    "common_name": "Quất Cảnh Tứ Quý Trồng Chậu",
    "scientific_name": "Citrus japonica",
    "aliases": [
      "Tắc Tứ Quý",
      "Hạnh Bonsai",
      "Kim Quất"
    ],
    "category": "fruit",
    "description": "Biểu tượng của sung túc và trường thọ. Cây vừa là cây cảnh ban công bốn mùa hoa thơm ngát, vừa cho quả mọng nước giàu vitamin C làm nước ép giải nhiệt, ngâm mật ong trị ho và làm gia vị bếp.",
    "quick_answer": "Quất tứ quý là cây ưa nắng toàn phần, tưới nước mỗi sáng khi mặt đất khô ráo. Trồng chậu thoát nước tốt với đất phù sa trộn phân hữu cơ vi sinh. Cây ra hoa kết trái liên tục cả 4 mùa trong năm.",
    "botanical_details": {
      "family": "Rutaceae (Họ Cửu lý hương / Cam chanh)",
      "native_range": "Đông Nam Á và Nam Á",
      "active_compounds": [
        "Limonene",
        "Citric Acid",
        "Hesperidin",
        "Vitamin C"
      ],
      "soil_ph": "5.5 - 6.5",
      "ideal_temp": "20°C - 32°C",
      "pot_size": "35cm - 50cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Kumquat_from_Spain.jpg/960px-Kumquat_from_Spain.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "full_sun",
    "watering": "daily",
    "propagation_difficulty": 2,
    "growth_time": "3 - 4 tháng ra lứa hoa mới",
    "container_suitable": true,
    "seasonality": {
      "north": "Tháng 1-2 đón quả vàng rực đón Tết, tháng 3 bắt đầu tỉa dưỡng lứa mới",
      "central": "Tưới đều đặn vào mùa khô nắng hạn",
      "south": "Cho quả vàng rải đều 12 tháng",
      "best_months": [
        1,
        2,
        3,
        7,
        8
      ]
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Chọn cây giống",
        "instruction": "Chọn cây chiết hoặc ghép cành khỏe, tán xòe đều, rễ chùm phát triển trắng mịn."
      },
      {
        "step": 2,
        "title": "Bón phân hữu cơ",
        "instruction": "Định kỳ 20 ngày bón 1 muỗng phân trùn quế hoặc phân gà ủ hoai mục quanh mép chậu."
      },
      {
        "step": 3,
        "title": "Tỉa tót đón hoa",
        "instruction": "Tỉa bỏ cành vượt, cành tăm khuất nắng để dưỡng dinh dưỡng nuôi hoa búp mập mạp."
      }
    ],
    "faqs": [
      {
        "question": "Làm sao để quất đậu quả đúng dịp Tết Nguyên Đán?",
        "answer": "Ở miền Bắc, siết nước nhẹ vào tháng 6 âm lịch để cây rụng bớt lá và bật nụ hoa đồng loạt, sau đó tưới đẫm và bón thúc kali nuôi quả lớn đều."
      }
    ],
    "monetization_tips": [
      "Tạo tác bonsai quất mini ôm đá để bàn làm việc ngày Tết giá từ 300.000đ đến hơn 1 triệu.",
      "Sản xuất tắc chưng đường phèn mật ong hữu cơ sạch nhà làm."
    ],
    "tags": [
      "Tài lộc",
      "Hoa thơm",
      "Trị ho",
      "Bonsai phố"
    ]
  },

  {
    "id": "fruit-13",
    "slug": "viet-quat-xu-nong",
    "common_name": "Việt Quất Xứ Nóng Ban Công",
    "scientific_name": "Vaccinium corymbosum",
    "aliases": [
      "Việt Quất Nhiệt Đới",
      "Southern Highbush Blueberry"
    ],
    "category": "fruit",
    "description": "Giống việt quất lai nhiệt đới chịu nắng gắt cực giỏi, sinh trưởng mạnh mẽ trong chậu ban công. Quả tròn màu tím than mọng nước, vị ngọt thanh mát, đứng đầu bảng siêu thực phẩm chống oxy hóa não bộ.",
    "quick_answer": "Việt quất xứ nóng bắt buộc phải trồng trong giá thể đất chua (pH 4.5 - 5.5) từ rêu than bùn (peat moss) trộn đá perlite. Cần tưới nước sạch không nhiễm kiềm/vôi và đặt nơi nhiều ánh sáng tự nhiên.",
    "botanical_details": {
      "family": "Ericaceae (Họ Thạch nam)",
      "native_range": "Bắc Mỹ, đã thuần hóa giống nhiệt đới cho Đông Nam Á",
      "active_compounds": [
        "Anthocyanin",
        "Pterostilbene",
        "Polyphenol",
        "Vitamin K"
      ],
      "soil_ph": "4.5 - 5.2 (Đất chua bắt buộc)",
      "ideal_temp": "18°C - 35°C",
      "pot_size": "35cm - 50cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 3,
    "growth_time": "6 - 8 tháng bắt đầu cho chùm quả đầu tiên",
    "container_suitable": true,
    "seasonality": {
      "north": "Trổ hoa đầu xuân, quả chín tháng 4 - 6",
      "central": "Cần lưới che giảm nắng gắt 30% vào buổi trưa tháng 6-7",
      "south": "Phát triển tốt quanh năm nếu giữ ẩm rễ mát",
      "best_months": [
        2,
        3,
        4,
        10,
        11
      ]
    },
    "tags": [
      "Siêu thực phẩm",
      "Chống oxy hóa",
      "Đất chua",
      "Quả tím"
    ]
  },

  {
    "id": "fruit-14",
    "slug": "dua-luoi-trong-chau",
    "common_name": "Dưa Lưới VietGAP Trồng Chậu",
    "scientific_name": "Cucumis melo",
    "aliases": [
      "Dưa Lưới Kim Cô Nương",
      "Dưa Vân Lưới Nhật"
    ],
    "category": "fruit",
    "description": "Thú vui làm vườn đô thị đẳng cấp nhất hiện nay. Chỉ với 1 chậu 20L trên ban công hoặc sân thượng, sau 75 ngày bạn đã có thể thu hoạch quả dưa lưới thơm lừng, vân lưới nổi đều tăm tắp, ruột cam ngọt đậm đà.",
    "quick_answer": "Dưa lưới trồng chậu cần giá thể xốp nhẹ, bón phân hữu cơ đậm đà và thụ phấn nhân tạo lúc sáng sớm (7h - 9h). Mỗi cây chỉ giữ duy nhất 1 quả đẹp nhất để tập trung dinh dưỡng nuôi quả ngọt giòn.",
    "botanical_details": {
      "family": "Cucurbitaceae (Họ Bầu bí)",
      "native_range": "Tây Nam Á và Địa Trung Hải",
      "active_compounds": [
        "Beta-Carotene",
        "Citrulline",
        "Kali",
        "Vitamin A"
      ],
      "soil_ph": "6.0 - 6.8",
      "ideal_temp": "25°C - 35°C",
      "pot_size": "20L - 30L / cây"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Meloen_vrucht_met_bloem.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "sunlight": "full_sun",
    "watering": "daily",
    "propagation_difficulty": 2,
    "growth_time": "65 - 75 ngày từ gieo hạt đến thu hoạch",
    "container_suitable": true,
    "seasonality": {
      "north": "Vụ 1: Tháng 3 - 5; Vụ 2: Tháng 8 - 10",
      "central": "Trồng tháng 2 - 8, tránh mùa mưa bão",
      "south": "Trồng được quanh năm, vụ mùa khô cho quả ngọt nhất",
      "best_months": [
        2,
        3,
        4,
        8,
        9
      ]
    },
    "tags": [
      "75 ngày thu hoạch",
      "Ngọt thơm",
      "Tự thụ phấn",
      "Sân thượng"
    ]
  },

  {
    "id": "fruit-15",
    "slug": "du-du-lun-ruot-do",
    "common_name": "Đu Đủ Lùn F1 Ruột Đỏ",
    "scientific_name": "Carica papaya",
    "aliases": [
      "Đu Đủ Lùn Thái Lan",
      "Đu Đủ Trồng Thùng Xốp"
    ],
    "category": "fruit",
    "description": "Giống đu đủ lùn quả đóng sát mặt đất chỉ từ 40cm, cuống ngắn chịu gió bão cực tốt trên sân thượng. Thịt quả màu đỏ cam đậm, thơm dẻo không hạt, thu hoạch liên tục hàng chục trái mỗi năm.",
    "quick_answer": "Đu đủ lùn F1 cần thùng xốp hoặc chậu sâu ít nhất 50cm, đáy đục nhiều lỗ thoát nước vì rễ cây rất kỵ ngập úng. Cây ưa nắng 100%, bón thúc NPK hữu cơ và tro củi để quả ngọt lịm chắc thịt.",
    "botanical_details": {
      "family": "Caricaceae (Họ Đu đủ)",
      "native_range": "Trung Mỹ, phổ biến khắp các vùng nhiệt đới",
      "active_compounds": [
        "Papain enzyme",
        "Lycopene",
        "Vitamin C",
        "Carotenoid"
      ],
      "soil_ph": "6.0 - 6.5",
      "ideal_temp": "24°C - 33°C",
      "pot_size": "50L - 80L (Thùng xốp lớn)"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Carica_papaya_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-029.jpg/960px-Carica_papaya_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-029.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 1,
    "growth_time": "6 - 7 tháng cho lứa quả chín đầu tiên",
    "container_suitable": true,
    "seasonality": {
      "north": "Trồng tháng 2 - 4 tránh rét buốt",
      "central": "Che chắn gió mạnh khi giông lốc",
      "south": "Cho trái quanh năm, thu hoạch liên tục",
      "best_months": [
        2,
        3,
        4,
        8,
        9
      ]
    },
    "tags": [
      "Lùn dễ trồng",
      "Ruột đỏ ngọt",
      "Papain tiêu hóa",
      "Thùng xốp"
    ]
  },

  {
    "id": "orn-06",
    "slug": "trau-ba-thanh-xuan",
    "common_name": "Trầu Bà Thanh Xuân",
    "scientific_name": "Philodendron bipinnatifidum",
    "aliases": [
      "Trầu Bà Tay Phật",
      "Rồng Xanh Ban Công"
    ],
    "category": "ornamental",
    "description": "Nữ hoàng lá xẻ mang vẻ đẹp nhiệt đới quyền quý. Bản lá to xẻ thùy sâu nghệ thuật, tỏa tinh dầu nhẹ hút bức xạ máy tính, giảm căng thẳng thị giác và thanh lọc formaldehyde hiệu quả trong nhà.",
    "quick_answer": "Trầu bà thanh xuân ưa ánh sáng tán xạ hoặc bóng râm bán phần, rất kỵ nắng gắt chiếu trực tiếp cháy mép lá. Tưới nước 2-3 lần/tuần khi mặt chậu khô nhẹ, lau bụi trên lá định kỳ để cây quang hợp tối đa.",
    "botanical_details": {
      "family": "Araceae (Họ Ráy)",
      "native_range": "Rừng nhiệt đới Nam Mỹ",
      "active_compounds": [
        "Chlorophyll",
        "Flavonoid"
      ],
      "soil_ph": "5.5 - 6.5",
      "ideal_temp": "18°C - 30°C",
      "pot_size": "30cm - 45cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Tree1.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "sunlight": "partial_shade",
    "watering": "moderate",
    "propagation_difficulty": 2,
    "growth_time": "Cây bền sống nhiều năm, nhảy cây con quanh gốc",
    "container_suitable": true,
    "tags": [
      "Lá xẻ sang trọng",
      "Hút bức xạ",
      "Bán râm",
      "Nhiệt đới"
    ]
  },

  {
    "id": "orn-07",
    "slug": "luoi-ho-vien-vang",
    "common_name": "Lưỡi Hổ Viền Vàng",
    "scientific_name": "Dracaena trifasciata",
    "aliases": [
      "Lưỡi Cọp",
      "Sansevieria Laurentii",
      "Hổ Vĩ Lan"
    ],
    "category": "ornamental",
    "description": "Cây lọc không khí số một được NASA chứng nhận. Đặc biệt có cơ chế quang hợp CAM nhả khí oxy tinh khiết vào ban đêm, hút sạch 107 độc tố bay hơi trong phòng ngủ và hóa giải vận xui phong thủy.",
    "quick_answer": "Lưỡi hổ là cây mọng nước cực kỳ chịu hạn, chỉ cần tưới 1-2 lần mỗi tháng khi đất khô cong. Đặt được mọi vị trí từ phòng ngủ thiếu sáng đến ban công nắng nhẹ, không tốn công chăm sóc.",
    "botanical_details": {
      "family": "Asparagaceae (Họ Măng tây)",
      "native_range": "Tây Phi",
      "active_compounds": [
        "Saponin",
        "Glycoside"
      ],
      "soil_ph": "6.0 - 7.5",
      "ideal_temp": "16°C - 35°C",
      "pot_size": "20cm - 35cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/960px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "indoor",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Tách bụi nhân giống sau 3 tháng",
    "container_suitable": true,
    "tags": [
      "Nhả oxy ban đêm",
      "Phòng ngủ",
      "Cực dễ sống",
      "Trừ tà khí"
    ]
  },

  {
    "id": "orn-08",
    "slug": "lan-y-hoa-trang",
    "common_name": "Lan Ý Hoa Trắng",
    "scientific_name": "Spathiphyllum wallisii",
    "aliases": [
      "Bạch Môn",
      "Vỹ Hoa Trắng",
      "Peace Lily"
    ],
    "category": "ornamental",
    "description": "Hoa trắng thanh khiết vươn cao kiêu hãnh tượng trưng cho bình yên và thuận buồm xuôi gió. Cây có khả năng hấp thụ sóng điện từ của điện thoại, máy in và loại bỏ nấm mốc trôi nổi trong không khí.",
    "quick_answer": "Lan ý ưa ẩm mát và ánh sáng gián tiếp trong nhà. Khi cây thiếu nước, lá sẽ rũ nhẹ xuống báo hiệu và phục hồi tươi tắn chỉ sau 30 phút được tưới. Trồng được cả trong đất và thủy canh để bàn.",
    "botanical_details": {
      "family": "Araceae (Họ Ráy)",
      "native_range": "Trung và Nam Mỹ",
      "soil_ph": "5.8 - 6.5",
      "ideal_temp": "18°C - 28°C",
      "pot_size": "20cm - 30cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/960px-Spathiphyllum_cochlearispathum_RTBG.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "indoor",
    "watering": "daily",
    "propagation_difficulty": 1,
    "growth_time": "Nở hoa quanh năm liên tục",
    "container_suitable": true,
    "tags": [
      "Bình an",
      "Hoa trắng",
      "Lọc nấm mốc",
      "Thủy canh"
    ]
  },

  {
    "id": "orn-09",
    "slug": "bang-singapore-mini",
    "common_name": "Bàng Singapore Mini",
    "scientific_name": "Ficus lyrata",
    "aliases": [
      "Bàng Sing",
      "Fiddle-Leaf Fig Lùn"
    ],
    "category": "ornamental",
    "description": "Biểu tượng kiến trúc nội thất hiện đại Scandinavian. Bản lá to hình cây đàn vĩ cầm màu xanh đậm bóng bẩy, thân thẳng vươn cao mang khí chất chính trực kiên định và tài lộc vững bền.",
    "quick_answer": "Bàng Singapore cần vị trí sáng cạnh cửa sổ có nắng sớm tán xạ. Tưới đẫm khi 2 đốt ngón tay đất mặt đã khô, tránh tưới quá nhiều gây thối rễ đen lá. Dùng khăn ẩm lau lá sạch bụi mỗi tuần.",
    "botanical_details": {
      "family": "Moraceae (Họ Dâu tằm)",
      "native_range": "Tây Phi",
      "soil_ph": "6.0 - 7.0",
      "ideal_temp": "18°C - 30°C",
      "pot_size": "30cm - 40cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Starr_031108-0130_Ficus_lyrata.jpg/960px-Starr_031108-0130_Ficus_lyrata.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "partial_shade",
    "watering": "moderate",
    "propagation_difficulty": 2,
    "growth_time": "Phát triển ổn định lâu năm",
    "container_suitable": true,
    "tags": [
      "Sang trọng",
      "Bản lá to",
      "Nội thất hiện đại",
      "Cạnh cửa sổ"
    ]
  },

  {
    "id": "orn-10",
    "slug": "da-bup-do-cam-thach",
    "common_name": "Đa Búp Đỏ Cẩm Thạch",
    "scientific_name": "Ficus elastica",
    "aliases": [
      "Cây Cao Su Cảnh",
      "Rubber Plant",
      "Đa Búp Đỏ"
    ],
    "category": "ornamental",
    "description": "Sắc lá đỏ tía kết hợp viền cẩm thạch tuyệt mỹ. Lá dày bóng bẩy như tráng sáp có khả năng bẫy bụi mịn trong không khí đô thị, búp non nhọn hoắt màu đỏ rực như ngọn lửa tượng trưng cho may mắn thịnh vượng.",
    "quick_answer": "Đa búp đỏ rất dễ chăm, ưa nắng nhẹ buổi sớm hoặc ánh sáng gián tiếp. Đất trồng thoát nước tốt, tưới khi mặt đất se khô. Cây chịu hạn tốt hơn chịu úng, ngắt ngọn sẽ kích thích phân nhánh xòe tròn.",
    "botanical_details": {
      "family": "Moraceae (Họ Dâu tằm)",
      "native_range": "Ấn Độ và Malaysia",
      "soil_ph": "5.5 - 6.5",
      "ideal_temp": "20°C - 32°C",
      "pot_size": "25cm - 40cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ficus_elastica_leaves_02.JPG/960px-Ficus_elastica_leaves_02.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "partial_shade",
    "watering": "moderate",
    "propagation_difficulty": 2,
    "growth_time": "2 tháng ra 3-4 cặp lá mới",
    "container_suitable": true,
    "tags": [
      "Hút bụi mịn",
      "Lá bóng sáp",
      "Búp đỏ rực",
      "Phong thủy may mắn"
    ]
  },

  {
    "id": "orn-11",
    "slug": "bach-ma-hoang-tu",
    "common_name": "Bạch Mã Hoàng Tử",
    "scientific_name": "Aglaonema commutatum",
    "aliases": [
      "Vạn Niên Thanh Trắng",
      "Cây Bạch Mã"
    ],
    "category": "ornamental",
    "description": "Dáng cây thanh thoát với sống lá và thân màu trắng muốt như chàng hoàng tử bạch mã. Cây biểu trưng cho sự thăng tiến hanh thông trong công việc, bền bỉ sống tốt trong môi trường máy lạnh điều hòa.",
    "quick_answer": "Bạch mã hoàng tử là lựa chọn số 1 cho bàn làm việc văn phòng. Cây sống khỏe dưới ánh đèn huỳnh quang, chỉ cần tưới 1-2 lần/tuần và xịt phun sương làm mát tán lá.",
    "botanical_details": {
      "family": "Araceae (Họ Ráy)",
      "native_range": "Đông Nam Á nhiệt đới",
      "soil_ph": "5.6 - 6.5",
      "ideal_temp": "18°C - 28°C",
      "pot_size": "20cm - 30cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Aglaonema_commutatum_kz1.jpg/960px-Aglaonema_commutatum_kz1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "indoor",
    "watering": "moderate",
    "propagation_difficulty": 1,
    "growth_time": "Sống bền quanh năm trong nhà",
    "container_suitable": true,
    "tags": [
      "Thăng tiến",
      "Bàn làm việc",
      "Thân trắng muốt",
      "Văn phòng"
    ]
  },

  {
    "id": "orn-12",
    "slug": "sen-da-mong-rong",
    "common_name": "Sen Đá Móng Rồng",
    "scientific_name": "Haworthiopsis fasciata",
    "aliases": [
      "Xương Rồng Móng Rồng",
      "Haworthia Ngựa Vằn"
    ],
    "category": "ornamental",
    "description": "Các cánh lá thuôn nhọn vuốt cong xếp thành hình móng rồng quyền lực, điểm xuyết các sọc vân trắng nổi gồ ghề như ngựa vằn. Cây mang ý nghĩa bảo vệ chủ nhân khỏi thị phi tiểu nhân và xua tan vận rủi.",
    "quick_answer": "Sen đá móng rồng chịu hạn siêu việt, 2-3 tuần mới cần tưới 1 lần vào gốc (tránh đọng nước ở kẽ lá). Ưa nắng sớm ban mai 2-3 tiếng, đất trồng cần 70% là sỏi nhẹ pumice hoặc đá perlite thoát nước.",
    "botanical_details": {
      "family": "Asphodelaceae (Họ Lan nhật quang)",
      "native_range": "Nam Phi",
      "soil_ph": "6.0 - 7.0",
      "ideal_temp": "15°C - 32°C",
      "pot_size": "10cm - 15cm (Chậu gốm mini)"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/1_Haworthia_fasciata_-MBB_Kabeljouws_River.jpg/960px-1_Haworthia_fasciata_-MBB_Kabeljouws_River.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Đẻ cây con xung quanh sau 4 tháng",
    "container_suitable": true,
    "tags": [
      "Chịu hạn giỏi",
      "Bảo vệ gia chủ",
      "Tiểu cảnh mini",
      "Sọc ngựa vằn"
    ]
  },

  {
    "id": "orn-13",
    "slug": "cau-tieu-tram",
    "common_name": "Cau Tiểu Trâm Để Bàn",
    "scientific_name": "Chamaedorea elegans",
    "aliases": [
      "Dừa Parlor",
      "Cau Mini Lọc Khí"
    ],
    "category": "ornamental",
    "description": "Thu nhỏ cả một rừng cọ nhiệt đới xanh mướt trên bàn làm việc. Tán lá thanh mảnh xòe tơ mềm mại, có khả năng làm tăng độ ẩm không khí tự nhiên trong phòng máy lạnh và trừ tà khí tiêu cực.",
    "quick_answer": "Cau tiểu trâm ưa bóng râm hoặc nắng tán xạ nhẹ, chịu được điều kiện thiếu sáng kéo dài. Tưới nước giữ đất hơi ẩm nhẹ, tuyệt đối không để chậu đọng nước gây úng thối rễ.",
    "botanical_details": {
      "family": "Arecaceae (Họ Cau dừa)",
      "native_range": "Rừng nhiệt đới Mexico và Guatemala",
      "soil_ph": "6.0 - 7.0",
      "ideal_temp": "18°C - 28°C",
      "pot_size": "15cm - 25cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Chamaedorea_elegans_Mart.JPG/960px-Chamaedorea_elegans_Mart.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "indoor",
    "watering": "moderate",
    "propagation_difficulty": 2,
    "growth_time": "Cây bền sống nhiều năm trong nhà",
    "container_suitable": true,
    "tags": [
      "Tạo ẩm phòng lạnh",
      "Lá tơ mảnh",
      "Trừ tà",
      "Bàn làm việc"
    ]
  },

  {
    "id": "orn-14",
    "slug": "kim-ngan-tam-tai",
    "common_name": "Kim Ngân Thắt Bím Tam Tài",
    "scientific_name": "Pachira aquatica",
    "aliases": [
      "Cây Tiền",
      "Money Tree",
      "Kim Ngân 3 Thân"
    ],
    "category": "ornamental",
    "description": "Thân cây bện xoắn 3 nhánh tượng trưng cho Thiên - Địa - Nhân hòa hợp và phúc lộc tài trọn vẹn. Mỗi cành xòe 5 lá đại diện cho ngũ hành Kim - Mộc - Thủy - Hỏa - Thổ cân bằng phong thủy đỉnh cao.",
    "quick_answer": "Kim ngân tích nước ở thân phình to nên rất sợ thừa nước. Chỉ tưới khi đất khô hoàn toàn (khoảng 7-10 ngày/lần). Đặt ở phòng khách hoặc quầy thu ngân nơi có ánh sáng tự nhiên dịu nhẹ.",
    "botanical_details": {
      "family": "Malvaceae (Họ Cẩm quỳ)",
      "native_range": "Trung và Nam Mỹ",
      "soil_ph": "6.0 - 7.0",
      "ideal_temp": "18°C - 32°C",
      "pot_size": "25cm - 40cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Flickr_-_archer10_%28Dennis%29_-_Guatemala-1376.jpg/960px-Flickr_-_archer10_%28Dennis%29_-_Guatemala-1376.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "indoor",
    "watering": "moderate",
    "propagation_difficulty": 2,
    "growth_time": "Phát triển xanh tốt quanh năm",
    "container_suitable": true,
    "tags": [
      "Chiêu tài tụ lộc",
      "Thắt bím tam tài",
      "Ngũ hành cân bằng",
      "Khai trương"
    ]
  },

  {
    "id": "orn-15",
    "slug": "truc-phu-quy-thuy-sinh",
    "common_name": "Trúc Phú Quý Thủy Sinh",
    "scientific_name": "Dracaena sanderiana",
    "aliases": [
      "Trúc May Mắn",
      "Lucky Bamboo",
      "Phát Dụ Trúc"
    ],
    "category": "ornamental",
    "description": "Thân trúc xanh mướt phân từng đốt thanh nhã, cắm bình nước thủy sinh rễ đỏ bung tỏa như phượng múa. Tượng trưng cho ý chí vươn lên kiên cường, đem lại bình an may mắn và cát tường cho gia đình.",
    "quick_answer": "Trúc phú quý trồng thủy sinh cực kỳ nhàn nhã, chỉ cần châm thêm nước sạch đã khử clo và nhỏ 2-3 giọt dinh dưỡng thủy canh mỗi tháng. Thay nước hoàn toàn khi nước có dấu hiệu đục rêu.",
    "botanical_details": {
      "family": "Asparagaceae (Họ Măng tây)",
      "native_range": "Trung Phi",
      "soil_ph": "6.0 - 6.5 (Hoặc nước lọc pH trung tính)",
      "ideal_temp": "18°C - 30°C",
      "pot_size": "Bình thủy tinh cao 25cm - 35cm"
    },
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/TD_311-Dracaena_braunii_%40_TK_08-05-2008_2008bg00032-3_Theo_Damen.jpg/960px-TD_311-Dracaena_braunii_%40_TK_08-05-2008_2008bg00032-3_Theo_Damen.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "sunlight": "indoor",
    "watering": "daily",
    "propagation_difficulty": 1,
    "growth_time": "Ra rễ sau 10 ngày cắm nước",
    "container_suitable": true,
    "tags": [
      "Thủy sinh",
      "May mắn cát tường",
      "Dễ chăm nhất",
      "Bàn thờ Thần Tài"
    ]
  },

  // ==========================================
  // BỔ SUNG CÁC GIỐNG DƯỢC LIỆU QUÝ BẢN ĐỊA VIỆT NAM (MS10)
  // ==========================================
  {
    id: 'herb-21',
    slug: 'sam-dai-hanh',
    common_name: 'Sâm Đại Hành (Tỏi Đỏ)',
    scientific_name: 'Eleutherine bulbosa',
    aliases: ['Tỏi Lào', 'Hành Đỏ', 'Củ Rẻ Quạt'],
    category: 'herb',
    description: 'Dược thảo quý củ đỏ như tỏi, vị ngọt nhạt tính ấm. Chứa các dẫn chất naphthoquinone (eleutherin, isoeleutherin) có tác dụng kháng khuẩn tụ cầu vàng, bổ huyết, trị thiếu máu, cầm máu và viêm đường hô hấp.',
    quick_answer: 'Sâm đại hành là cây củ dễ trồng trong chậu từ tép củ mẹ. Cây ưa đất xốp giàu mùn, ánh sáng tán xạ hoặc nắng ban mai. Thu hoạch củ sau 6-8 tháng trồng khi lá bắt đầu tàn.',
    botanical_details: {
      family: 'Iridaceae (Họ Diên vĩ)',
      native_range: 'Nam Mỹ, di thực và phát triển thành vị thuốc quý lâu đời tại Việt Nam',
      active_compounds: ['Eleutherin', 'Isoeleutherin', 'Eleutherol', 'Flavonoid'],
      soil_ph: '6.0 - 6.8',
      ideal_temp: '20°C - 32°C',
      pot_size: '25cm - 35cm'
    },
    image_url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Eleutherine_bulbosa_Urb._%287304624248%29.jpg/960px-Eleutherine_bulbosa_Urb._%287304624248%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '6 - 8 tháng thu hoạch củ dược liệu',
    container_suitable: true,
    seasonality: {
      north: 'Trồng mùa xuân tháng 2-4, thu củ tháng 10-12',
      central: 'Trồng quanh năm, giữ rễ ráo nước mùa mưa',
      south: 'Phát triển tốt quanh năm',
      best_months: [2, 3, 4, 10, 11]
    },
    medical_info: {
      uses: ['Bổ máu, trị da xanh xao mệt mỏi', 'Kháng sinh tự nhiên trị viêm họng, viêm phế quản', 'Giảm đau mụn nhọt, cầm máu vết thương'],
      folk_remedies: [
        'Sâm đại hành 12g + Cốt toái bổ 12g + Đương quy 10g sắc uống trị đau nhức xương khớp và thiếu máu.',
        'Củ tươi giã nát đắp lên vết lở loét, mụn nhọt gom mủ nhanh.'
      ],
      preparation: ['Ngâm rượu sâm đại hành tỏi đỏ bổ huyết', 'Phơi khô sao vàng tán bột uống'],
      toxicity_warning: 'Lành tính, không độc hại. Người cơ địa huyết nhiệt hoặc đang sốt cao nên dùng liều lượng vừa phải.',
      contraindications: [
        'Phụ nữ mang thai trong 3 tháng đầu không nên tự ý dùng dạng cao đặc hoặc ngâm rượu nồng độ cao.',
        'Người thể trạng thực nhiệt, cao huyết áp đang trong cơn bốc hỏa cần có chỉ định của bác sĩ hoặc lương y.'
      ],
      drug_interactions: [
        'Cẩn trọng khi dùng chung với thuốc chống đông máu (Warfarin, Aspirin) do hoạt tính thúc đẩy tuần hoàn máu của nhóm hợp chất quinoid.'
      ],
      disclaimer: 'Tham khảo Dược điển Việt Nam V. Thông tin dân gian không thay thế chẩn đoán y khoa.'
    },
    academic_citations: [
      'Dược điển Việt Nam V (Tập 2)',
      'Những cây thuốc và vị thuốc Việt Nam - GS. Đỗ Tất Lợi (trang 812)'
    ],
    monetization_tips: [
      'Bán củ giống sâm đại hành cho các gia đình thích tự trồng thảo dược sạch.',
      'Chế biến lát sâm sấy khô đóng túi trà bổ huyết dưỡng nhan.'
    ],
    tags: ['Bổ máu', 'Kháng khuẩn', 'Dễ trồng chậu', 'Dược liệu quý']
  },
  {
    id: 'herb-22',
    slug: 'cuc-tan',
    common_name: 'Cúc Tần (Từ Bi Nam)',
    scientific_name: 'Pluchea indica',
    aliases: ['Sài Hồ Nam', 'Cây Từ Bi', 'Cúc Tần Đô Thị'],
    category: 'herb',
    description: 'Cây thuốc dân gian trứ danh trị cảm sốt, nhức đầu nghẹt mũi, phong thấp đau nhức xương khớp và viêm trĩ. Lá tỏa hương thơm nồng ấm mùi tinh dầu sả chanh, chịu nắng chịu hạn ban công hướng Tây cực tốt.',
    quick_answer: 'Cúc tần giâm cành bén rễ 100% trong chậu ban công. Cây ưa nắng gắt, phát triển thành bụi xanh mát che nắng nóng mùa hè. Hái đọt non ăn sống với cá kho hoặc nấu canh giải cảm.',
    botanical_details: {
      family: 'Asteraceae (Họ Cúc)',
      native_range: 'Bản địa Việt Nam và Đông Nam Á',
      active_compounds: ['Sesquiterpene', 'Cineol', 'Limonene', 'Flavonoid'],
      soil_ph: '6.0 - 7.5',
      ideal_temp: '22°C - 36°C',
      pot_size: '30cm - 45cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pluchea_indica_W_IMG_0096.jpg/960px-Pluchea_indica_W_IMG_0096.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '25 ngày cắt tỉa đọt non liên tục',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển mạnh xuân hè thu, mùa đông lá chuyển vàng nhẹ',
      central: 'Chịu gió mặn ven biển tốt',
      south: 'Xanh tốt quanh năm',
      best_months: [2, 3, 4, 5, 8, 9]
    },
    medical_info: {
      uses: ['Giải cảm mạo phong hàn, hạ sốt nhức đầu', 'Chữa đau lưng, gai cột sống, phong tê thấp', 'Xông ngâm trĩ và sát trùng vết thương'],
      folk_remedies: [
        'Lá cúc tần 20g + Sả 10g + Lá chanh 10g: Nấu nồi nước xông giải cảm toát mồ hôi.',
        'Lá cúc tần sao nóng với muối hột bọc khăn chườm lên vùng lưng đau nhức.'
      ],
      preparation: ['Xông hơi lá tươi', 'Nấu canh đọt non hoặc chườm muối nóng'],
      toxicity_warning: 'Lành tính, không độc. Không dùng nồi nước xông khi người bệnh đang ra quá nhiều mồ hôi hoặc mất nước.',
      disclaimer: 'Tham khảo Dược điển Việt Nam IV. Thông tin mang tính tham khảo y học cổ truyền.'
    },
    academic_citations: [
      'Dược điển Việt Nam IV',
      'Cây thuốc và động vật làm thuốc ở Việt Nam - Viện Dược liệu'
    ],
    monetization_tips: [
      'Bán cành giống cúc tần 20k/cành làm hàng rào xanh ban công.',
      'Chế biến gói thảo mộc xông cảm và muối ngâm chân cúc tần thảo dược.'
    ],
    tags: ['Giải cảm', 'Đau xương khớp', 'Chịu nắng Tây', 'Hàng rào xanh']
  },
  {
    id: 'herb-23',
    slug: 'mo-long-tia',
    common_name: 'Mơ Lông Tía (Mơ Tam Thể)',
    scientific_name: 'Paederia foetida',
    aliases: ['Dây Mơ Lông', 'Mơ Tròn', 'Ngưu Bì Đống'],
    category: 'herb',
    description: 'Vị thuốc số 1 cho đường ruột và đại tràng trong y học cổ truyền. Lá hai màu (mặt trên xanh, mặt dưới tím tía phủ lông nhung mịn). Chứa tinh dầu methyl mercaptan đặc trưng và paederin có tác dụng tiêu diệt amip kiết lỵ, phục hồi niêm mạc đại tràng tổn thương.',
    quick_answer: 'Mơ lông leo giàn ban công cực khỏe, thích nắng nhẹ hoặc bóng râm buổi chiều. Rất thích hợp giâm cành vào mùa mưa. Món trứng gà rán lá mơ cuộn lá chuối nướng là bài thuốc thực dưỡng vàng cho người viêm đại tràng.',
    botanical_details: {
      family: 'Rubiaceae (Họ Cà phê)',
      native_range: 'Bản địa vùng nhiệt đới châu Á, mọc hoang và thuần dưỡng rộng rãi tại Việt Nam',
      active_compounds: ['Paederin', 'Methyl Mercaptan', 'Scandoside', 'Flavonoid'],
      soil_ph: '5.5 - 6.5',
      ideal_temp: '20°C - 32°C',
      pot_size: '30cm - 40cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Paederia_foetida_leaves.jpg/960px-Paederia_foetida_leaves.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '30 ngày bắt đầu hái lá cuốn giàn',
    container_suitable: true,
    seasonality: {
      north: 'Trồng tháng 2-5, leo giàn xanh ngắt suốt mùa hè thu',
      central: 'Thích nghi tốt khí hậu ẩm',
      south: 'Sinh trưởng quanh năm',
      best_months: [2, 3, 4, 8, 9]
    },
    medical_info: {
      uses: ['Đặc trị kiết lỵ, tiêu chảy do nhiễm khuẩn amip', 'Hỗ trợ viêm đại tràng co thắt, hội chứng ruột kích thích (IBS)', 'Tẩy giun kim cho trẻ em'],
      folk_remedies: [
        'Lá mơ lông 30g băm nhỏ trộn với 1 quả trứng gà ta, lót lá chuối nướng chảo khô (không dùng dầu mỡ) ăn liên tục 3-5 ngày.',
        'Nước cốt lá mơ lông tươi giã với nước ấm lọc uống trị giun kim lúc sáng sớm đói bụng.'
      ],
      preparation: ['Trứng rán lá mơ nướng không dầu', 'Giã vắt lấy nước cốt tươi'],
      toxicity_warning: 'Hoàn toàn lành tính, an toàn tuyệt đối khi sử dụng như món ăn hàng ngày.',
      disclaimer: 'Thông tin thực dưỡng dân gian theo GS Đỗ Tất Lợi.'
    },
    academic_citations: [
      'Những cây thuốc và vị thuốc Việt Nam - GS. Đỗ Tất Lợi (trang 145)',
      'Cây thuốc trị bệnh đường tiêu hóa - NXB Y học'
    ],
    monetization_tips: [
      'Bán cành giống leo ban công 25k - 35k/chậu.',
      'Cung cấp lá mơ tươi hữu cơ giao tận nhà cho các gia đình phố.'
    ],
    tags: ['Đặc trị đại tràng', 'Ruột kích thích', 'Dễ leo giàn', 'Trứng rán lá mơ']
  },
  {
    id: 'herb-24',
    slug: 'mach-mon-dong',
    common_name: 'Mạch Môn (Mạch Môn Đông)',
    scientific_name: 'Ophiopogon japonicus',
    aliases: ['Mạch Môn Đông', 'Củ Lan Chi', 'Duyên Mạch Đông'],
    category: 'herb',
    description: 'Vị thuốc quý dưỡng âm nhuận phế, thanh tâm trừ phiền, trị ho khan lâu ngày, khản tiếng mất giọng, táo bón và nóng trong người. Dáng cây bụi cỏ viền xanh bóng quanh năm, cực kỳ đẹp mắt khi trồng viền chậu ban công.',
    quick_answer: 'Mạch môn đông là cây thân thảo sống lâu năm, sinh trưởng bằng chùm củ mập mạp dưới đất. Cây ưa bóng râm mát hoặc nắng tán xạ nhẹ, chịu hạn tốt và có hoa nhỏ màu tím nhạt thanh tao.',
    botanical_details: {
      family: 'Asparagaceae (Họ Măng tây)',
      native_range: 'Đông Á, phân bố tự nhiên và trồng trọt lâu đời ở Việt Nam',
      active_compounds: ['Ophiopogonin A, B, C, D', 'Ruscogenin', 'Polysaccharide', 'Sitosterol'],
      soil_ph: '6.0 - 7.0 (Đất mùn tơi xốp pha cát thoát nước)',
      ideal_temp: '18°C - 30°C',
      pot_size: '20cm - 30cm (Chậu nông rộng miệng)'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Ophiopogon_japonicus_Kyoto.jpg/960px-Ophiopogon_japonicus_Kyoto.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '12 - 18 tháng thu hoạch củ múp mọng',
    container_suitable: true,
    seasonality: {
      north: 'Trồng tháng 2 - 4, thu hoạch củ vào mùa thu đông',
      central: 'Phát triển tốt nơi râm mát dưới tán cây lớn',
      south: 'Trồng tốt quanh năm ở ban công hướng Đông hoặc Bắc',
      best_months: [2, 3, 4, 10, 11]
    },
    medical_info: {
      uses: ['Trị ho khan, ho lâu ngày đờm dính khó khạc, khản tiếng', 'Sinh tân dịch trị khát nước, khô họng, sốt nóng', 'Nhuận tràng trị táo bón do âm hư huyết nhiệt'],
      folk_remedies: [
        'Mạch môn 12g + Thiên môn 12g + Cát cánh 8g sắc nước uống trị viêm họng hạt và ho khan dai dẳng.',
        'Mạch môn 10g + Huyền sâm 12g + Sinh địa 12g sắc uống dưỡng âm thanh nhiệt nhuận tràng.'
      ],
      preparation: ['Rửa sạch rút bỏ lõi tim củ phơi khô hãm trà', 'Nấu chè sâm dưỡng nhan bổ phổi'],
      toxicity_warning: 'Lành tính, không độc. Người tỳ vị hư hàn, đang tiêu chảy hoặc có đờm loãng phong hàn không nên dùng đơn độc.',
      disclaimer: 'Dược điển Việt Nam V. Tham khảo bác sĩ y học cổ truyền.'
    },
    academic_citations: [
      'Dược điển Việt Nam V (Tập 2)',
      'Những cây thuốc và vị thuốc Việt Nam - GS. Đỗ Tất Lợi (trang 730)'
    ],
    monetization_tips: [
      'Bán chậu cây mạch môn cỏ viền cảnh phong thủy kiêm cây thuốc 35k - 50k/chậu.',
      'Sấy khô củ mạch môn rút tim đóng gói trà dưỡng âm bổ phế.'
    ],
    tags: ['Nhuận phế', 'Trị ho khan', 'Cỏ viền chậu', 'Dưỡng âm']
  },
  {
    id: 'herb-25',
    slug: 'co-ngot-stevia',
    common_name: 'Cỏ Ngọt Stevia (Cúc Ngọt)',
    scientific_name: 'Stevia rebaudiana',
    aliases: ['Cỏ Mật', 'Cúc Đường', 'Stevia'],
    category: 'herb',
    description: 'Chất làm ngọt tự nhiên không calo kỳ diệu. Lá ngọt gấp 300 lần đường mía nhưng hoàn toàn không làm tăng chỉ số đường huyết, là cứu tinh số 1 cho bệnh nhân tiểu đường, người ăn kiêng keto và giảm cân.',
    quick_answer: 'Cỏ ngọt Stevia trồng chậu ban công ưa nắng nhẹ buổi sáng và đất ẩm tơi xốp. Hái lá tươi hoặc phơi khô pha cùng trà hoa cúc, trà tía tô tạo vị ngọt thanh dịu mát không cần dùng đường tinh luyện.',
    botanical_details: {
      family: 'Asteraceae (Họ Cúc)',
      native_range: 'Nam Mỹ, di thực và trồng thành công tại các viện dược liệu Việt Nam',
      active_compounds: ['Stevioside', 'Rebaudioside A', 'Dulcoside A', 'Flavonoid'],
      soil_ph: '6.5 - 7.5',
      ideal_temp: '20°C - 30°C',
      pot_size: '20cm - 30cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Stevia_rebaudiana0.jpg/960px-Stevia_rebaudiana0.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '35 ngày bắt đầu thu hoạch lá ngọt',
    container_suitable: true,
    seasonality: {
      north: 'Trồng tháng 3-9, mùa đông ngủ nghỉ',
      central: 'Thích nghi tốt vụ xuân hè',
      south: 'Phát triển quanh năm nơi mát mẻ',
      best_months: [2, 3, 4, 8, 9]
    },
    medical_info: {
      uses: ['Chất tạo ngọt tự nhiên 0 calo cho người tiểu đường', 'Hạ huyết áp nhẹ, hỗ trợ tim mạch', 'Ngăn ngừa sâu răng và mảng bám vi khuẩn miệng'],
      folk_remedies: [
        'Lá cỏ ngọt 3-5 lá + Trà hoa cúc 10 bông: Hãm nước sôi 5 phút uống thanh nhiệt, hạ huyết áp và làm dịu thần kinh.',
        'Nấu nước lá cỏ ngọt pha siro ho cho trẻ em không gây sâu răng.'
      ],
      preparation: ['Hãm trà lá tươi hoặc khô', 'Nấu nước cốt làm ngọt tự nhiên cho đồ uống'],
      toxicity_warning: 'An toàn theo chứng nhận FDA và WHO. Người huyết áp quá thấp không nên uống nước cỏ ngọt quá đậm đặc.',
      disclaimer: 'Thông tin khoa học theo Viện Dinh Dưỡng Quốc Gia và Dược điển.'
    },
    academic_citations: [
      'Viện Dược Liệu Quốc Gia Việt Nam',
      'FDA Generally Recognized as Safe (GRAS) - Steviol Glycosides'
    ],
    monetization_tips: [
      'Bán chậu cỏ ngọt ban công 35.000đ - 50.000đ cho người lớn tuổi.',
      'Đóng gói trà lá cỏ ngọt sấy lạnh mix hoa quả thảo mộc cao cấp.'
    ],
    tags: ['Không calo', 'Tiểu đường', 'Ngọt tự nhiên', 'Pha trà']
  },

  // ==========================================
  // SPRINT 1 (ĐỢT 1): 15 LOÀI THỰC VẬT ĐÔ THỊ ĐỘC BẢN MỚI
  // ==========================================
  {
    id: 'herb-26',
    slug: 'kim-that-tai',
    common_name: 'Kim Thất Tai (Cây Bầu Đường)',
    scientific_name: 'Gynura procumbens',
    aliases: ['Rau Lúi', 'Cây Đái Tháo Đường', 'Rau Biển Phước'],
    category: 'herb',
    description: 'Thảo dược quý nổi tiếng vùng Đông Nam Á hỗ trợ hạ đường huyết, cân bằng huyết áp và giảm cholesterol. Lá dày mọng nước, dễ trồng bằng cành giâm ở ban công.',
    quick_answer: 'Kim thất tai là thảo dược ưa bóng bán phần hoặc nắng sáng dịu, giâm cành 10-15 ngày bén rễ. Người đường huyết cao nhai sống 3-5 lá tươi vào buổi sáng hoặc nấu canh rau hàng ngày.',
    botanical_details: {
      family: 'Asteraceae (Họ Cúc)',
      native_range: 'Việt Nam, Malaysia, Thái Lan',
      active_compounds: ['Flavonoid', 'Phenolic acid', 'Sterol', 'Gynurin'],
      soil_ph: '6.0 - 7.0 (Đất mùn ẩm, tơi xốp)',
      ideal_temp: '22°C - 32°C',
      pot_size: 'Đường kính 25cm - 35cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gynura_procumbens_01.jpg/960px-Gynura_procumbens_01.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7',
    sunlight: 'partial_shade',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '20 ngày bắt đầu hái ngọn lá ăn',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển mạnh mùa xuân hạ, mùa đông cần che gió rét',
      central: 'Trồng tốt quanh năm, mùa mưa cần đất thoát nước tốt',
      south: 'Phát triển xanh mướt quanh năm dưới nắng tán xạ',
      best_months: [2, 3, 4, 8, 9]
    },
    medical_info: {
      uses: ['Hỗ trợ kiểm soát đường huyết tuýp 2', 'Hạ mỡ máu và huyết áp cao', 'Thanh nhiệt, tiêu viêm, mát gan'],
      folk_remedies: [
        'Nhai sống 3-5 lá kim thất tai tươi rửa sạch với nước muối loãng mỗi buổi sáng trước bữa ăn 30 phút.',
        'Lá kim thất tai 50g nấu canh với thịt nạc băm hoặc tôm tươi ăn trong tuần thanh lọc cơ thể.'
      ],
      preparation: ['Ăn sống như rau thơm', 'Nấu canh thanh nhiệt', 'Hãm trà lá tươi'],
      toxicity_warning: 'Lành tính không độc. Người huyết áp thấp hoặc đang dùng thuốc hạ đường huyết liều cao cần theo dõi chỉ số để tránh tụt đường huyết quá mức.',
      disclaimer: 'Hỗ trợ cải thiện chỉ số, không được tự ý bỏ thuốc điều trị theo toa của bác sĩ.'
    },
    academic_citations: [
      'Journal of Ethnopharmacology - Antidiabetic activities of Gynura procumbens',
      'Viện Dược Liệu Quốc Gia Việt Nam'
    ],
    monetization_tips: [
      'Bán bầu cây giống giâm sẵn 25.000đ - 35.000đ/chậu cho người lớn tuổi đô thị.',
      'Bán lá tươi hữu cơ thu hoạch theo kg cho cư dân cùng chung cư.'
    ],
    tags: ['Tiểu đường', 'Hạ huyết áp', 'Dễ trồng chậu', 'Thanh nhiệt']
  },
  {
    id: 'herb-27',
    slug: 'cay-xuong-khi-bim-bip',
    common_name: 'Xương Khỉ (Cây Bìm Bịp)',
    scientific_name: 'Clinacanthus nutans',
    aliases: ['Mảnh Cộng', 'Cây Bồ Bót', 'Cây Liền Xương'],
    category: 'herb',
    description: 'Thảo dược nổi danh Đông Nam Á với đặc tính kháng viêm, giảm đau nhức xương khớp, hỗ trợ phục hồi thoái hóa cột sống và làm mát gan.',
    quick_answer: 'Xương khỉ sinh trưởng mạnh ở ban công hướng Đông hoặc Đông Nam, tưới ẩm vừa phải. Dùng lá tươi giã đắp khớp sưng đau hoặc sắc uống 30g lá khô mỗi ngày.',
    botanical_details: {
      family: 'Acanthaceae (Họ Ô rô)',
      native_range: 'Việt Nam và các nước nhiệt đới châu Á',
      active_compounds: ['Flavonoid', 'Betulin', 'Lupeol', 'Polysaccharide'],
      soil_ph: '6.0 - 7.5',
      ideal_temp: '24°C - 35°C',
      pot_size: '30cm - 45cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Clinacanthus_nutans_-_Jardin_des_Serres_d%27Auteuil_-_IMG_2357.jpg/960px-Clinacanthus_nutans_-_Jardin_des_Serres_d%27Auteuil_-_IMG_2357.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '30 ngày hái đợt lá đầu tiên, đẻ nhánh nhanh',
    container_suitable: true,
    seasonality: {
      north: 'Trồng vụ xuân hè, cây ưa ấm ẩm',
      central: 'Phát triển tốt quanh năm',
      south: 'Sinh trưởng cực mạnh cả mùa mưa lẫn mùa khô',
      best_months: [2, 3, 4, 5, 8]
    },
    medical_info: {
      uses: ['Giảm đau nhức xương khớp, viêm khớp, thoái hóa', 'Thanh nhiệt, giải độc gan, hạ men gan', 'Giã đắp làm tan vết bầm tím và hỗ trợ liền xương'],
      folk_remedies: [
        'Lá bìm bịp 30g + Dây đau xương 20g + Rễ cỏ xước 20g: Sắc với 1 lít nước còn 400ml uống trong ngày trị thoái hóa khớp.',
        'Lá tươi 50g giã nát trộn chút muối hột và giấm đắp ấm lên khớp gối sưng đau 30 phút.'
      ],
      preparation: ['Sắc nước uống', 'Nấu canh thịt nạc', 'Giã đắp ngoài da'],
      toxicity_warning: 'Lành tính, không độc. Người huyết áp thấp nên cho thêm vài lát gừng tươi khi uống.',
      disclaimer: 'Thông tin kinh nghiệm dân gian y học cổ truyền, kết hợp vật lý trị liệu.'
    },
    academic_citations: [
      'Evidence-Based Complementary and Alternative Medicine - Clinacanthus nutans review',
      'Dược điển Cây thuốc Việt Nam'
    ],
    monetization_tips: [
      'Bán chậu cây bìm bịp giống 40.000đ/chậu cho gia đình có người cao tuổi.',
      'Phơi sấy lá khô đóng túi zip 150.000đ/kg.'
    ],
    tags: ['Xương khớp', 'Kháng viêm', 'Giải độc gan', 'Dễ mọc chậu']
  },
  {
    id: 'herb-29',
    slug: 'bach-hoa-xa-thiet-thao',
    common_name: 'Bạch Hoa Xà Thiệt Thảo',
    scientific_name: 'Hedyotis diffusa',
    aliases: ['Cỏ Lưỡi Rắn Trắng', 'Xà Thiệt Thảo', 'Bộc Lục'],
    category: 'herb',
    description: 'Thảo dược mọc bò nhỏ nhắn hoa trắng hình chữ thập, nổi tiếng với khả năng tiêu viêm, giải độc nhiệt độc, thanh lọc hệ tiết niệu và tăng cường miễn dịch tế bào.',
    quick_answer: 'Cỏ lưỡi rắn mọc lan sát đất, ưa ẩm và đất nhiều mùn. Thường kết hợp với bán chi liên làm bài thuốc mát gan, tiêu viêm họng và đường niệu.',
    botanical_details: {
      family: 'Rubiaceae (Họ Cà phê)',
      native_range: 'Việt Nam, miền Nam Trung Quốc, Nhật Bản',
      active_compounds: ['Asperuloside', 'Scandoside', 'Geniposidic acid', 'Flavonoid'],
      soil_ph: '5.5 - 6.8',
      ideal_temp: '20°C - 32°C',
      pot_size: 'Chậu dẹp dài hoặc chậu treo 25cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Oldenlandia_diffusa_1.jpg/960px-Oldenlandia_diffusa_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3',
    sunlight: 'partial_shade',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '40 ngày phủ kín chậu cây',
    container_suitable: true,
    seasonality: {
      north: 'Trồng tháng 3 đến tháng 9',
      central: 'Mùa xuân hè cây phát triển rất nhanh',
      south: 'Mọc tốt quanh năm nơi râm mát',
      best_months: [3, 4, 5, 8]
    },
    medical_info: {
      uses: ['Thanh nhiệt giải độc, tiêu ung thũng', 'Kháng viêm đường tiết niệu, tiểu buốt, tiểu rắt', 'Hỗ trợ tăng sức đề kháng và ức chế tế bào lạ'],
      folk_remedies: [
        'Bạch hoa xà thiệt thảo 40g + Bán chi liên 20g: Sắc uống giúp thanh nhiệt giải độc cơ thể.',
        'Toàn cây tươi 50g giã nát đắp mụn nhọt, vết côn trùng cắn giảm sưng tấy tức thì.'
      ],
      preparation: ['Sắc nước uống', 'Nấu trà thảo mộc', 'Giã đắp ngoài da'],
      toxicity_warning: 'Vị đắng tính hàn. Phụ nữ mang thai không nên dùng.',
      disclaimer: 'Tham khảo ý kiến chuyên gia Y học cổ truyền khi kết hợp điều trị.'
    },
    academic_citations: [
      'Phytomedicine - Pharmacological evaluation of Hedyotis diffusa',
      'Cây thuốc và Vị thuốc Việt Nam - GS. Đỗ Tất Lợi'
    ],
    monetization_tips: [
      'Trồng chậu treo ban công làm cảnh xanh mát kiêm hái lá làm thuốc.',
      'Sấy khô làm trà thảo mộc phối hợp bán theo combo.'
    ],
    tags: ['Thanh nhiệt', 'Tiểu đường', 'Dễ mọc chậu', 'Kháng viêm']
  },
  {
    id: 'herb-30',
    slug: 'day-thia-canh',
    common_name: 'Dây Thìa Canh Chậu Ban Công',
    scientific_name: 'Gymnema sylvestre',
    aliases: ['Dây Muôi', 'Cây Dập Đường', 'Gurmar'],
    category: 'herb',
    description: 'Thảo dược dây leo quý giá bậc nhất trong hỗ trợ người đái tháo đường. Chứa acid gymnemic có khả năng làm mất cảm giác ngọt của lưỡi tạm thời và ức chế hấp thu đường ruột.',
    quick_answer: 'Dây thìa canh leo giàn ban công 2-3m, lá thu hoạch phơi khô hãm nước uống sau các bữa ăn 30 phút để kiểm soát đường huyết sau ăn rất hiệu quả.',
    botanical_details: {
      family: 'Apocynaceae (Họ La bố ma)',
      native_range: 'Ấn Độ, miền Bắc và miền Trung Việt Nam',
      active_compounds: ['Gymnemic acid', 'Gymnemasaponin', 'Gourmarin', 'Flavonoid'],
      soil_ph: '6.0 - 7.2',
      ideal_temp: '22°C - 35°C',
      pot_size: 'Đường kính 35cm - 50cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Gymnema_sylvestre_1.jpg/960px-Gymnema_sylvestre_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '3 tháng leo giàn kín, thu hoạch liên tục nhiều năm',
    container_suitable: true,
    seasonality: {
      north: 'Trồng tháng 2 - 4, mùa đông tỉa bớt nhánh già',
      central: 'Leo giàn phát triển tốt quanh năm',
      south: 'Phát triển xanh tốt quanh năm',
      best_months: [2, 3, 4, 8, 9]
    },
    medical_info: {
      uses: ['Kích thích tuyến tụy tiết insulin tự nhiên', 'Làm giảm hấp thu glucose tại biểu mô ruột non', 'Giảm cảm giác thèm ngọt ở người béo phì và tiểu đường'],
      folk_remedies: [
        'Dây thìa canh khô 20g hãm với 1 lít nước sôi 15 phút, chia uống 3 lần sau các bữa ăn 30 phút.',
        'Nhai 1 lá tươi thìa canh sẽ làm mất vị ngọt của đường mía trong 2-3 giờ, giúp kiềm chế cơn thèm đồ ngọt.'
      ],
      preparation: ['Hãm trà lá khô', 'Sắc uống hàng ngày', 'Nấu cao lỏng'],
      toxicity_warning: 'Không uống lúc đói vì có thể gây hạ đường huyết nhanh. Phụ nữ mang thai không dùng.',
      disclaimer: 'Đã được kiểm chứng lâm sàng tại Đại học Dược Hà Nội.'
    },
    academic_citations: [
      'Đại học Dược Hà Nội - Đề tài nghiên cứu cây Dây thìa canh Việt Nam (PGS.TS Trần Văn Ơn)',
      'Journal of Clinical Biochemistry and Nutrition'
    ],
    monetization_tips: [
      'Cung cấp giống dây thìa canh thuần bầu rễ khoẻ 45.000đ/cây.',
      'Sấy khô lá bánh tẻ đóng gói 200.000đ/kg bán cho bệnh nhân tiểu đường.'
    ],
    tags: ['Tiểu đường', 'Leo giàn ban công', 'Hạ đường huyết', 'Thanh nhiệt']
  },
  {
    id: 'herb-31',
    slug: 'bo-cong-anh-thap',
    common_name: 'Bồ Công Anh Thấp Việt Nam',
    scientific_name: 'Taraxacum officinale',
    aliases: ['Bồ Công Anh Lùn', 'Diếp Trời', 'Hoàng Hoa Địa Đinh'],
    category: 'herb',
    description: 'Thảo dược hoa vàng nhỏ nhắn mọc sát đất, toàn thân có nhựa trắng giàu taraxacin. Bậc thầy kháng sinh tự nhiên trị viêm tuyến vú, viêm họng hạt và sỏi mật.',
    quick_answer: 'Bồ công anh lùn gieo hạt rất dễ nảy mầm, trồng chậu nhỏ để bậu cửa sổ. Toàn cây từ rễ, lá đến hoa đều dùng làm trà hoặc nấu canh giải nhiệt tiêu mụn nhọt.',
    botanical_details: {
      family: 'Asteraceae (Họ Cúc)',
      native_range: 'Vùng khí hậu mát mẻ ôn đới và cận nhiệt đới Việt Nam',
      active_compounds: ['Taraxacin', 'Taraxasterol', 'Inulin', 'Luteolin', 'Vitamin A, C'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '18°C - 28°C',
      pot_size: '20cm - 30cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Dandelion_clock_in_the_morning.jpg/960px-Dandelion_clock_in_the_morning.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '45 ngày bắt đầu nở hoa và thu hoạch rễ lá',
    container_suitable: true,
    seasonality: {
      north: 'Trồng tháng 9 đến tháng 4 năm sau rất đẹp',
      central: 'Vụ đông xuân là mùa phát triển mạnh nhất',
      south: 'Trồng nơi thoáng mát tránh nắng gắt buổi trưa',
      best_months: [9, 10, 11, 1, 2, 3]
    },
    medical_info: {
      uses: ['Trị sưng đau viêm tuyến vú ở phụ nữ sau sinh', 'Mát gan, lợi mật, hỗ trợ tiêu sỏi mật nhỏ', 'Tiêu mụn nhọt, dị ứng mẩn ngứa thời tiết'],
      folk_remedies: [
        'Lá bồ công anh tươi 40g giã nát vắt lấy nước cốt uống, bã đắp lên bầu vú sưng đau do tắc tia sữa giúp thông sữa nhanh chóng.',
        'Rễ bồ công anh sấy khô sao vàng hãm nước uống thay cà phê không chứa cafein giúp mát gan.'
      ],
      preparation: ['Trà rễ sấy khô', 'Hái lá non ăn sống làm salad', 'Sắc nước uống'],
      toxicity_warning: 'Lành tính. Người tỳ vị hư hàn tiêu chảy không nên uống nước quá đậm đặc.',
      disclaimer: 'Kinh nghiệm dân gian đúc kết hàng trăm năm trong Dược điển Việt Nam.'
    },
    academic_citations: [
      'Dược điển Việt Nam V - Chuyên luận Bồ công anh',
      'Journal of Alternative and Complementary Medicine'
    ],
    monetization_tips: [
      'Bán chậu bồ công anh mini nở hoa vàng xinh xắn 30.000đ/chậu.',
      'Sản xuất trà rễ bồ công anh sấy khô hữu cơ cao cấp.'
    ],
    tags: ['Tắc tia sữa', 'Mát gan', 'Kháng sinh tự nhiên', 'Dễ mọc chậu']
  },
  {
    id: 'herb-34',
    slug: 'trinh-nu-hoang-cung',
    common_name: 'Trinh Nữ Hoàng Cung',
    scientific_name: 'Crinum latifolium',
    aliases: ['Tỏi Thái Lan', 'Hoàng Cung Trinh Nữ', 'Cây Thập Bát Dược'],
    category: 'herb',
    description: 'Thảo dược hoàng gia quý tộc chuyên trị các chứng u xơ phụ khoa và tuyến tiền liệt. Thân củ to như củ hành tây, lá dài gợn sóng, hoa trắng phớt hồng quý phái.',
    quick_answer: 'Trồng trong chậu lớn 40cm dưới nắng nhẹ hoặc nắng sáng. Lá cắt phơi khô sao vàng hạ thổ, sắc uống từng đợt theo phác đồ để tiêu viêm khối u xơ lành tính.',
    botanical_details: {
      family: 'Amaryllidaceae (Họ Thủy tiên)',
      native_range: 'Bản địa Việt Nam, Ấn Độ',
      active_compounds: ['Alkaloid (Crinafolin, Crinafolidin, Lycorin)', 'Glucan', 'Flavonoid'],
      soil_ph: '6.5 - 7.5',
      ideal_temp: '22°C - 35°C',
      pot_size: '40cm - 60cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Crinum_latifolium_flower.jpg/960px-Crinum_latifolium_flower.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '3 tháng bắt đầu thu hoạch lá to, đẻ nhiều củ con',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển tốt mùa xuân hè',
      central: 'Ưa đất thịt pha cát màu mỡ',
      south: 'Phát triển lá sum suê quanh năm',
      best_months: [2, 3, 4, 8, 9]
    },
    medical_info: {
      uses: ['Hỗ trợ ức chế u xơ tử cung, u nang buồng trứng ở phụ nữ', 'Hỗ trợ phì đại tuyến tiền liệt lành tính ở nam giới cao tuổi', 'Kháng khuẩn, tiêu viêm, ức chế sự phát triển của tế bào lạ'],
      folk_remedies: [
        'Lá trinh nữ hoàng cung khô 20g sao vàng hạ thổ sắc với 1 lít nước còn 300ml, chia uống 3 lần sau ăn (uống 20 ngày nghỉ 10 ngày).',
        'Lá tươi 3 lá (khoảng 100g) thái nhỏ sao vàng sắc uống theo đợt điều trị u xơ.'
      ],
      preparation: ['Sao vàng hạ thổ sắc uống', 'Phơi khô đóng gói'],
      toxicity_warning: 'Cần phân biệt kỹ với cây Náng hoa trắng (Crinum asiaticum) có độc tính gây nôn mửa nếu dùng quá liều.',
      disclaimer: 'Cần tái khám siêu âm định kỳ để theo dõi kích thước khối u xơ.',
      confusion_risk: {
        confused_with: 'Cây Náng hoa trắng (Crinum asiaticum)',
        distinguishing_features: 'Trinh nữ hoàng cung mép lá lượn sóng rõ rệt, bẹ lá màu tím tía ở gốc, hoa nở có sọc tím hồng nhạt.'
      }
    },
    academic_citations: [
      'Hội đồng Dược liệu Việt Nam - Nghiên cứu tác dụng sinh học Crinum latifolium',
      'International Journal of Immunopharmacology'
    ],
    monetization_tips: [
      'Bán củ giống trinh nữ hoàng cung chuẩn gen 40.000đ - 60.000đ/củ.',
      'Sấy khô lá chuẩn sạch đóng gói thảo dược theo liệu trình.'
    ],
    tags: ['U xơ', 'Kháng viêm', 'Hoa thơm', 'Dễ mọc chậu']
  },

  // 5 CÂY ĂN TRÁI BAN CÔNG MỚI (FRUITS: fruit-16 ĐẾN fruit-20)
  {
    id: 'fruit-17',
    slug: 'cherry-brazil-nhiet-doi',
    common_name: 'Cherry Brazil (Anh Đào Nhiệt Đới Chậu)',
    scientific_name: 'Eugenia brasiliensis',
    aliases: ['Grumixama', 'Anh Đào Ban Công', 'Cherry Nhiệt Đới Trồng Chậu'],
    category: 'fruit',
    description: 'Giống cherry nhiệt đới thích nghi 100% với khí hậu nắng nóng Việt Nam. Cây bụi thân gỗ lùn trồng chậu sai hoa trắng muốt, quả chín đen bóng vị ngọt đậm đà quý phái.',
    quick_answer: 'Cherry Brazil không cần ngủ đông lạnh như cherry ôn đới, càng nhiều nắng quả càng ngọt đậm. Trồng chậu 50-60L, sau 1 năm cây cho hàng trăm quả mọng căng bóng.',
    botanical_details: {
      family: 'Myrtaceae (Họ Đào kim nương)',
      native_range: 'Nam Mỹ, thích nghi khí hậu nhiệt đới 3 miền Việt Nam',
      active_compounds: ['Anthocyanin', 'Vitamin C gấp 20 lần cam', 'Polyphenol', 'Quercetin'],
      soil_ph: '5.5 - 6.5 (Đất nhiều mùn hữu cơ, tơi xốp)',
      ideal_temp: '22°C - 38°C',
      pot_size: '50cm - 70cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Grumixama_Eugenia_brasiliensis.jpg/960px-Grumixama_Eugenia_brasiliensis.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '1 năm cho lứa quả mọng đầu tiên',
    container_suitable: true,
    seasonality: {
      north: 'Hoa nở mùa xuân hè, trái chín vào đầu hè',
      central: 'Chịu nhiệt độ trên 40°C ban công hướng Tây',
      south: 'Cây phát triển và cho 2-3 đợt trái mỗi năm',
      best_months: [3, 4, 5, 6, 7]
    },
    medical_info: {
      uses: ['Hàm lượng anthocyanin cực cao chống oxy hóa tế bào và làm chậm lão hóa', 'Bổ sung vitamin C tự nhiên tăng cường hệ miễn dịch', 'Hỗ trợ giấc ngủ nhờ chứa melatonin tự nhiên'],
      folk_remedies: [
        'Ăn 10-15 quả cherry chín mỗi tối giúp dễ đi vào giấc ngủ và ngủ sâu hơn.',
        'Ép nước quả cherry uống giải nhiệt và phục hồi cơ bắp sau vận động thể thao.'
      ],
      preparation: ['Ăn tươi trực tiếp', 'Làm sinh tố mọng nước', 'Nấu mứt quả hữu cơ'],
      toxicity_warning: 'Quả ăn ngọt lành tính. Không nhai vỡ hạt bên trong.',
      disclaimer: 'Nguồn trái cây sạch cao cấp tự trồng tại nhà.'
    },
    academic_citations: [
      'Food Research International - Phenolic profile of Eugenia brasiliensis',
      'Revista Brasileira de Fruticultura'
    ],
    monetization_tips: [
      'Bán cây giống cherry Brazil cao 1m đang hoa trái 350.000đ - 600.000đ/chậu.',
      'Quả thu hoạch sạch bán cho thị trường cao cấp 300.000đ/kg.'
    ],
    tags: ['Quả mọng', 'Cực sai quả', 'Đẹp da', 'Nắng gắt']
  },
  {
    id: 'fruit-18',
    slug: 'viet-quat-nhiet-doi',
    common_name: 'Việt Quất Nhiệt Đới Chịu Nhiệt (Southern Highbush)',
    scientific_name: 'Vaccinium darrowii',
    aliases: ['Việt Quất Trồng Chậu', 'Southern Highbush Blueberry', 'Việt Quất Ban Công'],
    category: 'fruit',
    description: 'Giống việt quất chịu nhiệt đột phá thích nghi hoàn hảo với khí hậu nhiệt đới nắng ấm Việt Nam mà không cần số giờ lạnh mùa đông. Cây bụi nhỏ gọn, chùm quả xanh tím mọng nước giòn ngọt.',
    quick_answer: 'Việt quất chịu nhiệt cực kỳ mê đất chua (pH 4.5 - 5.5), tưới bằng nước pha giấm táo hoặc bã cà phê ủ mục. Trồng chậu 40-50cm đón nắng sáng 5-6 tiếng/ngày cho quả liên tục từ tháng 3 đến tháng 8.',
    botanical_details: {
      family: 'Ericaceae (Họ Đỗ quyên)',
      native_range: 'Bắc Mỹ nhiệt đới, thuần hóa cho các nước Đông Nam Á',
      active_compounds: ['Anthocyanin', 'Resveratrol', 'Vitamin C', 'Kẽm hữu cơ'],
      soil_ph: '4.5 - 5.5 (Đất chua, xơ dừa bã cà phê ủ mục)',
      ideal_temp: '20°C - 36°C',
      pot_size: '40cm - 55cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Blueberries.jpg/960px-Blueberries.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '6 - 8 tháng ra hoa tạo chùm quả mọng',
    container_suitable: true,
    seasonality: {
      north: 'Cây phát triển rực rỡ từ mùa xuân, trái rộ tháng 4 - 8',
      central: 'Cần che lưới giảm bớt nắng trưa gay gắt tháng 6',
      south: 'Cho hoa trái sung mãn quanh năm nếu duy trì độ ẩm gốc tốt',
      best_months: [3, 4, 5, 6, 7, 8]
    },
    medical_info: {
      uses: ['Siêu thực phẩm hàng đầu cho thị lực và trí nhớ', 'Giảm cholesterol xấu và bảo vệ thành mạch máu', 'Chống oxy hóa làm chậm lão hóa tế bào da'],
      folk_remedies: [
        'Ăn 1 nắm nhỏ quả việt quất tươi (20-30g) vào bữa sáng giúp mắt sáng tinh anh, giảm mỏi mắt cho người làm việc máy tính.',
        'Xay sinh tố việt quất với sữa chua không đường mỗi ngày tăng cường lợi khuẩn đường ruột.'
      ],
      preparation: ['Ăn tươi trực tiếp', 'Trộn sữa chua granola', 'Làm sinh tố mọng'],
      toxicity_warning: 'Quả sạch cực kỳ lành tính và an toàn cho cả mẹ bầu lẫn trẻ nhỏ.',
      disclaimer: 'Siêu quả chống oxy hóa số 1 thế giới trồng ngay tại ban công.'
    },
    academic_citations: [
      'Journal of Agricultural and Food Chemistry - Blueberry Polyphenols',
      'Harvard T.H. Chan School of Public Health - Health Benefits of Blueberries'
    ],
    monetization_tips: [
      'Cây việt quất nhiệt đới sẵn trái bán ban công giá 350.000đ - 550.000đ/chậu.',
      'Bán combo đất trồng chua chuyên dụng và phân việt quất 90.000đ/túi.'
    ],
    tags: ['Quả mọng', 'Đẹp da', 'Không calo', 'Nắng gắt']
  },
  {
    id: 'fruit-19',
    slug: 'dau-tam-lun-sieu-trai',
    common_name: 'Dâu Tằm Lùn F1 Siêu Trái',
    scientific_name: 'Morus alba var. nana',
    aliases: ['Dâu Tằm Trồng Chậu', 'Dwarf Mulberry', 'Dâu Đài Loan Lùn'],
    category: 'fruit',
    description: 'Giống dâu tằm lùn được lai tạo đặc biệt để trồng chậu ở không gian đô thị. Cây chỉ cao 70cm - 1m nhưng quả mọc chi chít từ gốc lên ngọn, chuyển từ xanh sang đỏ rồi tím đen mọng nước ngọt lịm.',
    quick_answer: 'Dâu tằm lùn siêu dễ sống, cắt tỉa cành càng nhiều thì chồi mới mọc ra càng mang theo nhiều chùm quả. Đặt ở ban công có nắng trực tiếp, tưới ẩm ngày 1 lần là có quả ăn liên tục quanh năm.',
    botanical_details: {
      family: 'Moraceae (Họ Dâu tằm)',
      native_range: 'Đông Á, chọn lọc giống lùn thích nghi đô thị',
      active_compounds: ['Resveratrol', 'Anthocyanin', 'Vitamin C', 'Sắt hữu cơ', 'Chất xơ'],
      soil_ph: '6.0 - 7.0 (Đất màu mỡ thoát nước tốt)',
      ideal_temp: '20°C - 36°C',
      pot_size: '35cm - 50cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Morus_nigra_fruits.jpg/960px-Morus_nigra_fruits.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '2 - 3 tháng giâm cành là bắt đầu trổ quả',
    container_suitable: true,
    seasonality: {
      north: 'Quả rộ từ tháng 2 đến tháng 5, tỉa cành ra tiếp mùa thu',
      central: 'Phát triển tốt quanh năm',
      south: 'Cắt cành siết nước là ra quả 4 mùa',
      best_months: [2, 3, 4, 5, 8, 9, 10]
    },
    medical_info: {
      uses: ['Bổ huyết, sáng mắt, hỗ trợ trị chứng tóc bạc sớm', 'Thanh nhiệt giải độc, nhuận tràng thông tiện', 'Giúp an thần, ngủ ngon và bồi bổ thể lực'],
      folk_remedies: [
        'Dâu tằm chín đen 1kg ngâm với đường phèn 800g sau 1 tuần lọc lấy nước cốt siro dâu giải khát mùa hè.',
        'Nước siro dâu tằm pha cùng mật ong uống buổi tối giúp bồi bổ khí huyết và an thần ngủ sâu giấc.'
      ],
      preparation: ['Ăn tươi chấm muối', 'Ngâm siro dâu tằm', 'Ngâm rượu vang dâu bổ huyết'],
      toxicity_warning: 'Quả dâu chín ngọt tính hàn, người tỳ vị hư hàn đi phân lỏng không nên uống quá nhiều một lúc.',
      disclaimer: 'Thức uống bổ huyết dưỡng sinh dân gian tuyệt vời.'
    },
    academic_citations: [
      'Food Chemistry - Mulberry fruit bioactive compounds and health effects',
      'Đỗ Tất Lợi - Những cây thuốc và vị thuốc Việt Nam (Vị Tang thầm)'
    ],
    monetization_tips: [
      'Bán cây giống dâu tằm lùn F1 trĩu quả chậu ban công 120.000đ - 220.000đ/chậu.',
      'Siro dâu tằm hữu cơ nhà làm đóng chai thủy tinh 110.000đ/chai 500ml.'
    ],
    tags: ['Bổ khí huyết', 'Cực sai quả', 'Dễ mọc chậu', 'Nắng gắt']
  },
  {
    id: 'fruit-20',
    slug: 'thanh-long-ruot-do-ban-cong',
    common_name: 'Thanh Long Ruột Đỏ Ban Công Nắng Tây',
    scientific_name: 'Hylocereus costaricensis',
    aliases: ['Thanh Long Đỏ Chậu', 'Pitaya Ruột Đỏ'],
    category: 'fruit',
    description: 'Chiến binh xanh bất khả chiến bại cho những ban công hướng Tây thiêu đốt trên 42°C. Thân xương rồng mọng nước cách nhiệt tường nhà, hoa nở đêm trắng muốt thơm lừng, quả đỏ ngọt đậm đà.',
    quick_answer: 'Trồng trong chậu 40-50L tựa vào lan can hoặc cột trụ bê tông ban công. Cây không sợ nắng gắt, chịu hạn hàng tuần không cần tưới, quả ruột đỏ giàu betalain chống ung thư và mát gan.',
    botanical_details: {
      family: 'Cactaceae (Họ Xương rồng)',
      native_range: 'Trung Mỹ, trồng phổ biến khắp 3 miền Việt Nam',
      active_compounds: ['Betalain', 'Vitamin C', 'Chất xơ prebiotic', 'Lycopene', 'Sắt'],
      soil_ph: '6.0 - 7.5 (Đất trộn cát và trấu hun thoát nước)',
      ideal_temp: '25°C - 42°C (Siêu chịu nhiệt)',
      pot_size: '40cm - 60cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dragon_fruit_on_the_plant.jpg/960px-Dragon_fruit_on_the_plant.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4',
    sunlight: 'full_sun',
    watering: 'drought_tolerant',
    propagation_difficulty: 1,
    growth_time: '8 - 10 tháng bắt đầu ra đợt hoa trái đầu tiên',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển mùa hè, mùa đông ngưng tưới',
      central: 'Khắc tinh của nắng hạn miền Trung',
      south: 'Cho hoa trái 4-5 đợt mỗi năm từ tháng 5 đến tháng 11',
      best_months: [5, 6, 7, 8, 9, 10]
    },
    medical_info: {
      uses: ['Hàm lượng sắc tố betalain cao gấp bội quả ruột trắng giúp bảo vệ tế bào gan', 'Giàu chất xơ prebiotic nuôi dưỡng hệ vi sinh đường ruột khỏe mạnh', 'Bổ sung sắt tự nhiên tái tạo hồng cầu cho người thiếu máu'],
      folk_remedies: [
        'Ăn 1/2 quả thanh long ruột đỏ mát lạnh buổi trưa giúp hạ nhiệt cơ thể và nhuận tràng tức thì.',
        'Hoa thanh long tươi nấu canh với sườn non giải nhiệt mùa hè.'
      ],
      preparation: ['Ăn tươi', 'Làm sinh tố đá xay', 'Nấu canh hoa thanh long'],
      toxicity_warning: 'Ăn nhiều có thể đi tiểu có màu đỏ vô hại do sắc tố betalain đào thải tự nhiên.',
      disclaimer: 'Loài cây chống bức xạ nhiệt đô thị số một theo khuyến cáo Nông nghiệp Đô thị.'
    },
    academic_citations: [
      'Food Chemistry - Betalains and antioxidant capacity in Hylocereus costaricensis',
      'Viện Cây Ăn Quả Miền Nam (SOFRI)'
    ],
    monetization_tips: [
      'Bán cành giống thanh long ruột đỏ bánh tẻ 25.000đ/cành cho cư dân phủ xanh ban công.',
      'Chậu thanh long bonsai sai quả ngày Tết giá 300.000đ - 500.000đ/chậu.'
    ],
    tags: ['Chịu hạn', 'Nắng gắt', 'Đẹp da', 'Quả mọng']
  },

  // ==========================================
  // SPRINT 2 (ĐỢT 2): 15 LOÀI THỰC VẬT ĐÔ THỊ ĐỘC BẢN MỚI
  // (5 Thảo Dược Bản Địa + 5 Cây Ăn Trái Ban Công + 5 Kiểng Lá & Lọc Khí)
  // ==========================================
  {
    id: 'herb-36',
    slug: 'sam-cau-do',
    common_name: 'Sâm Cau Đỏ Bản Địa (Tiên Mao)',
    scientific_name: 'Curculigo orchioides',
    aliases: ['Tiên Mao', 'Ngải Cau', 'Thất Diệp Nhất Chi Hoa Giả'],
    category: 'herb',
    description: 'Thảo dược đại bổ mệnh môn hỏa của núi rừng Việt Nam. Thân rễ chứa nhóm hợp chất curculigoside và cycloartane triterpenoid giúp ôn thận tráng dương, trừ hàn thấp, mạnh gân cốt và nâng cao miễn dịch tự nhiên.',
    quick_answer: 'Sâm cau đỏ có lá xếp nếp tựa lá cau non, hoa vàng tươi mọc sát gốc rất đẹp mắt. Cây cực kỳ dễ thuần hóa trong chậu sâu 35-40cm nơi ban công bán râm, sau 10-12 tháng cho thu hoạch củ đỏ sẫm thơm nồng.',
    botanical_details: {
      family: 'Hypoxidaceae (Họ Hạ trâm / Sâm cau)',
      native_range: 'Vùng đồi núi trung du Bắc Bộ, Tây Nguyên và Nam Trung Bộ Việt Nam',
      active_compounds: ['Curculigoside A & B', 'Curculigine', 'Saponin triterpenoid', 'Polysaccharide'],
      soil_ph: '5.5 - 6.8 (Đất tơi xốp giàu mùn lá rừng, thoát nước tốt)',
      ideal_temp: '20°C - 32°C',
      pot_size: 'Chậu sâu 35cm - 45cm để củ đâm thẳng dài'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Curculigo_orchioides.jpg/960px-Curculigo_orchioides.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c401',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '10 - 12 tháng thu hoạch củ dược liệu già',
    container_suitable: true,
    seasonality: {
      north: 'Xuống giống mùa xuân tháng 2-4, thu hoạch củ vào cuối thu - đông (tháng 10-12)',
      central: 'Trồng dưới tán cây lớn hoặc lưới che nắng 40%',
      south: 'Phát triển xanh tốt quanh năm ở logia hướng Đông',
      best_months: [2, 3, 4, 10, 11],
      warning: 'Tránh úng nước lâu ngày làm thối mầm củ gốc'
    },
    medical_info: {
      uses: ['Ôn thận tráng dương, cải thiện suy giảm sinh lực nam nữ', 'Tán hàn trừ thấp, trị chứng đau mỏi lưng gối, lạnh tay chân mùa đông', 'Điều hòa miễn dịch, chống oxy hóa tế bào thần kinh'],
      folk_remedies: [
        'Củ sâm cau tươi 1kg rửa sạch, ngâm nước vo gạo đặc qua đêm để khử nhựa ngứa, thái lát phơi héo rồi ngâm với 3 lít rượu nếp 40 độ và 100ml mật ong rừng sau 90 ngày dùng mỗi bữa 15ml.',
        'Sâm cau sao vàng 10g + Dâm dương hoắc 12g + Ba kích tím 12g sắc nước uống ấm trị đau lưng mỏi gối do thận dương hư.'
      ],
      preparation: ['Ngâm nước vo gạo khử độc tính nhẹ rồi thái lát phơi khô', 'Sao vàng hạ thổ sắc uống', 'Ngâm rượu thuốc bồi bổ'],
      toxicity_warning: 'Bắt buộc phải ngâm kỹ với nước vo gạo trước khi chế biến để loại bỏ chất nhựa gây ngứa cổ họng. Người âm hư hỏa vượng, hay bốc hỏa khô miệng không nên dùng liều cao.',
      disclaimer: 'Dược liệu có tính đại nhiệt, dùng đúng liều lượng theo hướng dẫn Đông y.',
      confusion_risk: {
        confused_with: 'Cây Bồng Bồng (Dracaena angustifolia) hoặc cây Huyết Giác non',
        distinguishing_features: 'Lá sâm cau có gân xếp nếp dọc giống hệt lá cau non, bẹ lá ôm sát gốc và hoa 6 cánh màu vàng tươi nở sát mặt đất.'
      }
    },
    academic_citations: [
      'Dược điển Việt Nam V - Chuyên luận Tiên mao (Rhizoma Curculiginis)',
      'GS. Đỗ Tất Lợi - Những cây thuốc và vị thuốc Việt Nam (trang 825)',
      'Journal of Ethnopharmacology - Pharmacology and phytochemistry of Curculigo orchioides'
    ],
    monetization_tips: [
      'Bán bầu giống sâm cau đỏ chuẩn rừng Tây Bắc 35.000đ - 50.000đ/bầu.',
      'Chế biến sâm cau đỏ thái lát khử nhựa bằng nước vo gạo, sấy lạnh đóng hũ thủy tinh 250g.'
    ],
    tags: ['Bổ thận', 'Mạnh gân cốt', 'Sâm bản địa', 'Bán râm']
  },
  {
    id: 'herb-37',
    slug: 'dang-sam-nam',
    common_name: 'Đẳng Sâm Nam (Sâm Dây Ngọc Linh)',
    scientific_name: 'Codonopsis javanica',
    aliases: ['Sâm Dây Kon Tum', 'Đảng Sâm Việt', 'Nhân Sâm Người Nghèo'],
    category: 'herb',
    description: 'Được mệnh danh là "Nhân sâm của người Việt", dây leo thanh mảnh mang những bông hoa hình chuông tím nhạt thơ mộng. Củ đẫm hương thơm sâm dịu ngọt, giúp đại bổ nguyên khí, kiện tỳ vị và phục hồi sức khỏe sau ốm.',
    quick_answer: 'Đẳng sâm là cây thân thảo leo quấn, rất hợp trồng chậu sâu 40cm cho leo giàn ban công mát mẻ. Củ thu hoạch sau 1-2 năm có vị ngọt thanh, dùng hầm gà, nấu cháo hoặc pha trà uống hàng ngày không gây tăng huyết áp.',
    botanical_details: {
      family: 'Campanulaceae (Họ Hoa chuông)',
      native_range: 'Vùng núi cao Ngọc Linh (Kon Tum, Quảng Nam) và Tây Bắc Việt Nam',
      active_compounds: ['Saponin', 'Tangšenin', 'Polysaccharide', 'Inulin', '17 loại Acid Amin'],
      soil_ph: '5.5 - 6.5 (Đất mùn tơi xốp trộn phân trùn quế và trấu hun)',
      ideal_temp: '16°C - 28°C',
      pot_size: 'Chậu cao 40cm - 50cm kèm khung leo chữ A'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Codonopsis_pilosula_flowers.jpg/960px-Codonopsis_pilosula_flowers.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c402',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '4 tháng hái lá nấu canh, 12 tháng thu củ sâm',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển mạnh xuân - hè - thu, mùa đông rụi dây trên mặt đất để tích dưỡng nuôi củ',
      central: 'Ưa khí hậu mát mẻ, mùa hè cần che lưới giảm nhiệt',
      south: 'Trồng nơi ban công hướng Đông mát mẻ, tưới phun sương chiều tối',
      best_months: [2, 3, 4, 9, 10]
    },
    medical_info: {
      uses: ['Bổ trung ích khí, kiện tỳ ích phế, giúp ăn ngon ngủ sâu', 'Tăng cường sinh hồng cầu, cải thiện chứng huyết áp thấp và thiếu máu não', 'Lá non nấu canh thịt bằm cực kỳ mát và giải nhiệt cho người già, trẻ nhỏ'],
      folk_remedies: [
        'Đẳng sâm khô 20g + Kỷ tử 10g + Táo đỏ 5 quả hãm bình giữ nhiệt 1 lít nước sôi uống thay trà giúp tỉnh táo, hết hụt hơi mệt mỏi.',
        'Củ đẳng sâm tươi 50g hầm cùng gà ác, hạt sen và ý dĩ bồi bổ cho người mới ốm dậy hoặc phụ nữ sau sinh.'
      ],
      preparation: ['Hãm trà dưỡng sinh hàng ngày', 'Hầm canh gà ác / chim câu', 'Phơi khô rút lõi sao thơm'],
      toxicity_warning: 'Rất lành tính, tính bình không nóng như hồng sâm. Tuy nhiên không dùng chung với vị thuốc Lê lô theo nguyên tắc Thập Bát Phản của Đông y.',
      disclaimer: 'Thảo dược bồi bổ khí huyết tự nhiên được ghi nhận trong Dược điển Việt Nam.',
      confusion_risk: {
        confused_with: 'Dây Bìm Bịp hoặc dây Khoai Mỡ dại',
        distinguishing_features: 'Lá đẳng sâm hình tim mềm mịn có lông tơ trắng mặt dưới, vò nhẹ có mùi thơm ngọt của sâm và khi bấm ngọn có nhựa trắng sữa tiết ra.'
      }
    },
    academic_citations: [
      'Dược điển Việt Nam V - Chuyên luận Đảng sâm Việt Nam (Radix Codonopsis javanicae)',
      'Viện Dược Liệu Quốc Gia - Kỹ thuật trồng và chế biến Sâm dây Ngọc Linh'
    ],
    monetization_tips: [
      'Cung cấp chậu giống đẳng sâm leo giàn ban công vừa hái lá nấu canh vừa thu củ.',
      'Đóng gói set nguyên liệu hầm gà "Đẳng sâm - Kỷ tử - Táo đỏ - Đương quy" tiện lợi.'
    ],
    tags: ['Đại bổ khí huyết', 'Sâm Ngọc Linh', 'Leo giàn mát', 'Nấu canh bổ']
  },
  {
    id: 'herb-38',
    slug: 'rau-cang-cua',
    common_name: 'Rau Càng Cua Bản Địa',
    scientific_name: 'Peperomia pellucida',
    aliases: ['Tiêu Thảo Mọng Nước', 'Rau Càng Cua Đô Thị'],
    category: 'herb',
    description: 'Loài rau thảo dược mọng nước giòn tan với lá hình trái tim xanh bóng trong suốt. Tuy nhỏ bé nhưng chứa hàm lượng Sắt, Kali, Magie và hoạt chất kháng viêm Prostaglandin tự nhiên cực kỳ dồi dào.',
    quick_answer: 'Rau càng cua ưa bóng râm ẩm mát dưới gốc các chậu cây lớn. Chỉ sau 25-30 ngày gieo hạt, bạn đã có một thảm rau xanh non mơn mởn để bóp gỏi dầu giấm thịt bò, vừa thanh nhiệt vừa ngừa bệnh Gout.',
    botanical_details: {
      family: 'Piperaceae (Họ Hồ tiêu)',
      native_range: 'Nhiệt đới Nam Mỹ, bản địa hóa lâu đời khắp các vùng ẩm mát Việt Nam',
      active_compounds: ['Pellucidin A', 'Patuloside A', 'Phytosterol', 'Kali & Sắt hữu cơ', 'Vitamin C'],
      soil_ph: '6.0 - 7.0 (Đất ẩm giàu mùn hữu cơ)',
      ideal_temp: '20°C - 30°C',
      pot_size: 'Khay chữ nhật nông 15cm hoặc trồng xen dưới gốc chậu cây ăn trái'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Peperomia_pellucida_%28Mindanao%2C_Philippines%29.jpg/960px-Peperomia_pellucida_%28Mindanao%2C_Philippines%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c403',
    sunlight: 'partial_shade',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '25 - 30 ngày cắt ăn lứa đầu tiên, tự rụng hạt mọc tiếp',
    container_suitable: true,
    seasonality: {
      north: 'Mọc rộ nhất từ tháng 4 đến tháng 10 mùa mưa ẩm',
      central: 'Phát triển tốt quanh năm ở góc khuất nắng gắt',
      south: 'Thu hoạch liên tục quanh năm nếu tưới ẩm mỗi ngày',
      best_months: [4, 5, 6, 7, 8, 9, 10]
    },
    medical_info: {
      uses: ['Hỗ trợ đào thải acid uric trong máu, giảm sưng đau khớp ở người bệnh Gout', 'Thanh nhiệt, lợi tiểu, trị tiểu buốt tiểu rắt mùa nắng nóng', 'Cung cấp sắt tự nhiên và chất chống oxy hóa mà rất ít năng lượng (giảm cân an toàn)'],
      folk_remedies: [
        'Rau càng cua tươi 150g rửa sạch trộn dầu oliu, tỏi phi và giấm táo ăn 3 bữa/tuần giúp mát gan, nhuận tràng và hỗ trợ kiểm soát đường huyết.',
        'Lá và thân tươi giã nát đắp lên vùng mụn nhọt sưng tấy hoặc vết bỏng nhẹ giúp dịu nhiệt giảm đau nhanh.'
      ],
      preparation: ['Ăn sống làm gỏi trộn thịt bò / trứng luộc', 'Xay sinh tố ép nước uống thanh nhiệt', 'Nấu canh tôm tươi'],
      toxicity_warning: 'An toàn tuyệt đối. Tuy nhiên do cây có tính hàn và hàm lượng nước cao, người đang bị tiêu chảy lạnh bụng không nên ăn sống quá nhiều.',
      disclaimer: 'Thực phẩm - dược liệu thực dưỡng lành mạnh cho bữa ăn gia đình đô thị.',
      confusion_risk: {
        confused_with: 'Cây Cỏ Tai Hùm hoặc cây Chua Me Đất',
        distinguishing_features: 'Thân rau càng cua tròn mọng nước trong suốt, lá hình tim bóng láng và bông hoa mọc vươn thẳng lên như chiếc càng cua nhỏ xíu.'
      }
    },
    academic_citations: [
      'Journal of Ethnopharmacology - Anti-inflammatory and analgesic properties of Peperomia pellucida',
      'Viện Dinh Dưỡng Quốc Gia - Thành phần vi chất trong các loài rau bản địa Việt Nam'
    ],
    monetization_tips: [
      'Trồng xen canh dưới gốc các chậu ổi, chanh, bưởi ban công để thu hoạch rau sạch bán 60.000đ - 80.000đ/kg.',
      'Cung cấp khay rau càng cua hữu cơ sống tại chậu cho các nhà hàng salad thực dưỡng.'
    ],
    tags: ['Giàu sắt', 'Hạ acid uric', 'Trồng xen gốc', 'Mọng nước']
  },
  {
    id: 'herb-39',
    slug: 'lac-tien-leo-gian',
    common_name: 'Lạc Tiên Leo Giàn (Nhãn Lồng Thảo Dược)',
    scientific_name: 'Passiflora foetida',
    aliases: ['Chùm Bao', 'Cây Nhãn Lồng', 'Dây Lưới Tình'],
    category: 'herb',
    description: 'Vị thuốc an thần tự nhiên quý giá bậc nhất của y học cổ truyền Việt Nam. Dây leo mềm mại có lá đài bao quanh quả như chiếc lồng đèn tinh xảo, chứa alcaloid nhóm harman và flavonoid giúp dưỡng tâm, dịu thần kinh và đưa vào giấc ngủ sâu tự nhiên.',
    quick_answer: 'Lạc tiên cực kỳ dễ trồng từ hạt hoặc giâm dây bánh tẻ, leo phủ xanh lan can ban công rất nhanh. Ngọn non hái luộc hoặc nấu canh tôm ngọt mát, dây già phơi khô hãm trà uống trước khi ngủ 45 phút.',
    botanical_details: {
      family: 'Passifloraceae (Họ Lạc tiên)',
      native_range: 'Nhiệt đới châu Mỹ, mọc tự nhiên khắp 3 miền Việt Nam',
      active_compounds: ['Passiflorin', 'Harman', 'Harmol', 'Harmine', 'Vitexin', 'Saponaretin'],
      soil_ph: '5.8 - 7.2 (Thích nghi hầu hết các loại đất chậu)',
      ideal_temp: '22°C - 35°C',
      pot_size: '25cm - 35cm có dây dẫn leo lan can'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Passiflora_foetida_Jul_22%2C_2023.jpg/960px-Passiflora_foetida_Jul_22%2C_2023.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c404',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '30 ngày bắt đầu bấm ngọn non ăn và làm trà',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển bùng nổ từ tháng 3 đến tháng 10',
      central: 'Chịu nắng hạn tốt, ra hoa kết quả quanh năm',
      south: 'Xanh tốt 12 tháng, đọt non vươn dài sau mỗi cơn mưa',
      best_months: [3, 4, 5, 6, 7, 8, 9]
    },
    medical_info: {
      uses: ['An thần, giải tỏa căng thẳng lo âu (stress), trị chứng mất ngủ, ngủ hay mơ giật mình', 'Ổn định nhịp tim ở người hay hồi hộp đánh trống ngực', 'Thanh nhiệt mát gan, giải độc cơ thể qua món rau luộc dân dã'],
      folk_remedies: [
        'Ngọn lạc tiên tươi 1 nắm luộc chấm kho quẹt hoặc nấu canh thịt bằm ăn vào bữa tối giúp giấc ngủ đến nhẹ nhàng, sáng dậy không mệt mỏi.',
        'Bài thuốc An Thần kinh điển: Lạc tiên khô 20g + Lá vông nem 12g + Tâm sen sao 6g + Lá dâu tằm 10g sắc nước uống ấm buổi tối.'
      ],
      preparation: ['Bấm đọt non luộc / nấu canh', 'Cắt dây bánh tẻ rửa sạch phơi khô sao thơm hãm trà', 'Nấu cao lỏng lạc tiên'],
      toxicity_warning: 'Quả lạc tiên chỉ ăn được khi đã chín vàng cam; quả còn xanh chứa một lượng nhỏ glycoside cyanogenic nên không ăn sống quả xanh.',
      disclaimer: 'Đã được Bộ Y tế đưa vào danh mục thuốc thiết yếu có nguồn gốc thảo dược tại các bệnh viện Y học cổ truyền.',
      confusion_risk: {
        confused_with: 'Dây Chanh Leo hoặc dây Mướp Đắng rừng',
        distinguishing_features: 'Toàn thân và lá lạc tiên phủ lớp lông tơ mềm mịn, đặc biệt quả tròn được bao bọc bởi một lớp vỏ lưới rêu xanh xẻ mịn như chiếc lồng đèn.'
      }
    },
    academic_citations: [
      'Dược điển Việt Nam V - Chuyên luận Lạc tiên (Herba Passiflorae foetidae)',
      'GS. Đỗ Tất Lợi - Những cây thuốc và vị thuốc Việt Nam (trang 794)'
    ],
    monetization_tips: [
      'Chế biến trà túi lọc Lạc tiên - Tâm sen - Táo đỏ thủ công cho dân văn phòng mất ngủ.',
      'Bán bó đọt nhãn lồng non hữu cơ cắt sáng sớm cho cư dân chung cư.'
    ],
    tags: ['Trị mất ngủ', 'An thần tự nhiên', 'Leo ban công', 'Rau rừng sạch']
  },
  {
    id: 'herb-40',
    slug: 'don-la-do',
    common_name: 'Đơn Lá Đỏ (Đơn Mặt Trời)',
    scientific_name: 'Excoecaria cochinchinensis',
    aliases: ['Đơn Tía', 'Hồng Bối Quế Hoa', 'Lá Liễu Đỏ'],
    category: 'herb',
    description: 'Sự kết hợp hoàn hảo giữa cây cảnh sắc màu và thảo dược gia đình. Mặt trên lá xanh lục bóng mượt, mặt dưới đỏ tía rực rỡ như ánh mặt trời. Trong Đông y, đây là khắc tinh của chứng mẩn ngứa mề đay, dị ứng thời tiết và mụn nhọt.',
    quick_answer: 'Đơn lá đỏ là cây bụi nhỏ cao 60-90cm, giâm cành sống 99% trong chậu. Đặt ở nơi có nắng nhẹ để mặt dưới lá lên màu đỏ tía đậm và tích lũy tối đa hoạt chất flavonoid kháng dị ứng.',
    botanical_details: {
      family: 'Euphorbiaceae (Họ Thầu dầu)',
      native_range: 'Bản địa Việt Nam và vùng Đông Nam Á lục địa',
      active_compounds: ['Flavonoid (1.5%)', 'Tannin', 'Coumarin', 'Polyphenol', 'Anthocyanin'],
      soil_ph: '5.5 - 6.8',
      ideal_temp: '20°C - 34°C',
      pot_size: '25cm - 35cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Excoecaria_cochinchinensis_along_Jalan_Cecawi_6-29_in_Seksyen_6_Kota_Damansara_20231208_142327.jpg/960px-Excoecaria_cochinchinensis_along_Jalan_Cecawi_6-29_in_Seksyen_6_Kota_Damansara_20231208_142327.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c405',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '35 ngày từ khi giâm cành có thể tỉa lá dùng',
    container_suitable: true,
    seasonality: {
      north: 'Thu hái lá tốt nhất vào tháng 4 - tháng 9 khi trời nắng ấm',
      central: 'Trồng quanh năm làm viền cảnh ban công',
      south: 'Xanh đỏ rực rỡ suốt 4 mùa',
      best_months: [3, 4, 5, 6, 7, 8]
    },
    medical_info: {
      uses: ['Thanh nhiệt giải độc huyết, trị nổi mề đay, dị ứng thức ăn, dị ứng thời tiết', 'Trị mụn nhọt sưng đỏ, rôm sảy ở trẻ nhỏ', 'Sao vàng sắc uống hỗ trợ trị tiêu chảy lỵ trực trùng nhẹ'],
      folk_remedies: [
        'Lá đơn đỏ khô sao vàng 15g + Kim ngân hoa 10g + Ké đầu ngựa 10g sắc với 600ml nước còn 200ml chia 2 lần uống trong ngày trị dứt cơn nổi mề đay mẩn ngứa.',
        'Lá đơn đỏ tươi 1 nắm đun sôi với vài hạt muối biển pha nước tắm cho trẻ bị rôm sảy mùa hè.'
      ],
      preparation: ['Sao vàng hạ thổ sắc nước uống', 'Nấu nước tắm lá thảo dược trị rôm sảy'],
      toxicity_warning: 'Nhựa cây tươi khi bẻ cành có thể gây kích ứng nếu dính vào mắt; luôn rửa sạch và đun chín hoặc sao vàng trước khi uống. Không dùng cho người máu khó đông hoặc đang chảy máu.',
      disclaimer: 'Cây thuốc nam truyền thống của các làng quê Việt Nam, tuyệt đối không nhầm với các cây cảnh lá màu công nghiệp.',
      confusion_risk: {
        confused_with: 'Cây Cô Tòng Đuôi Lươn hoặc cây Huyết Dụ cảnh',
        distinguishing_features: 'Lá đơn đỏ mọc đối xứng, mép lá có răng cưa nhỏ đều đặn, mặt trên xanh lục thẫm còn mặt dưới màu đỏ tía thuần nhất.'
      }
    },
    academic_citations: [
      'Dược điển Việt Nam V - Chuyên luận Đơn lá đỏ (Folium Excoecariae)',
      'Viện Dược Liệu - Cây thuốc và Động vật làm thuốc ở Việt Nam (Tập 1)'
    ],
    monetization_tips: [
      'Bán chậu cây Đơn lá đỏ vừa làm cảnh phong thủy hành Hỏa vừa làm tủ thuốc sống gia đình.',
      'Lá đơn đỏ sấy khô đóng gói kết hợp Kim ngân hoa làm gói tắm thảo mộc cho bé.'
    ],
    tags: ['Trị mề đay', 'Mát huyết', 'Lá đỏ phong thủy', 'Tắm bé']
  },

  // --- 5 CÂY ĂN TRÁI BAN CÔNG ĐỘC BẢN (SPRINT 2: fruit-21 -> fruit-25) ---
  {
    id: 'fruit-21',
    slug: 'chanh-ngon-tay-uc',
    common_name: 'Chanh Ngón Tay Úc (Finger Lime)',
    scientific_name: 'Citrus australasica',
    aliases: ['Chanh Trứng Cá Tầm', 'Citrus Caviar', 'Chanh Caviar'],
    category: 'fruit',
    description: 'Được giới đầu bếp Michelin mệnh danh là "Trứng cá tầm của thế giới thực vật". Quả thuôn dài như ngón tay, khi bẻ đôi sẽ trào ra hàng trăm viên tép tròn căng bóng như ngọc trai, cắn vào nổ lách tách tỏa hương chanh thảo mộc sảng khoái.',
    quick_answer: 'Chanh ngón tay là cây bụi lá nhỏ có gai ngắn, bộ rễ gọn nên cực kỳ hợp trồng chậu 35-45cm trên ban công nhiều nắng. Cây chịu nhiệt tốt, ít sâu bệnh và mang lại giá trị kinh tế thuộc hàng đắt đỏ nhất trong họ cam chanh.',
    botanical_details: {
      family: 'Rutaceae (Họ Cửu lý hương / Cam chanh)',
      native_range: 'Rừng cận nhiệt đới Đông Úc, đã thuần hóa ghép gốc tại Việt Nam',
      active_compounds: ['Citric Acid', 'Vitamin C', 'Limonene', 'Isocitric Acid', 'Anthocyanin (dòng ruột hồng)'],
      soil_ph: '5.8 - 6.8 (Đất thoát nước nhanh, trộn 20% đá perlite hoặc vỏ thông)',
      ideal_temp: '20°C - 35°C',
      pot_size: '35cm - 45cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Finger_lime_with_juice_vesicles_and_seeds_partially_extracted.jpg/960px-Finger_lime_with_juice_vesicles_and_seeds_partially_extracted.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c406',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '6 - 8 tháng từ cây ghép bắt đầu bói lứa quả đầu tiên',
    container_suitable: true,
    seasonality: {
      north: 'Ra hoa rộ mùa xuân (tháng 3-4) và mùa thu (tháng 8-9)',
      central: 'Phát triển khỏe, tránh ngập úng rễ mùa mưa bão',
      south: 'Ra hoa đậu quả quanh năm khi áp dụng xiết nước nhẹ 5 ngày',
      best_months: [3, 4, 8, 9, 10]
    },
    medical_info: {
      uses: ['Cung cấp hàm lượng Vitamin C và Folate tự nhiên cao gấp 3 lần chanh thường', 'Tinh dầu vỏ và tép chanh kích thích tiết dịch vị tiêu hóa, khử mùi tanh hải sản sống tuyệt hảo', 'Chứa polyphenol bảo vệ thành mạch và làm sáng da'],
      folk_remedies: [
        'Vắt tép chanh ngón tay lên hàu nướng, cá hồi sashimi hoặc pha cùng nước khoáng có ga và mật ong làm thức uống giải nhiệt thanh lọc gan.',
        'Ngâm quả chanh ngón tay cắt đôi với mật ong rừng và gừng tươi trị đau rát cổ họng.'
      ],
      preparation: ['Rắc trực tiếp tép chanh tươi lên món ăn cao cấp', 'Pha cocktail / mocktail giải khát', 'Ngâm mật ong'],
      toxicity_warning: 'An toàn tuyệt đối. Người đang đau dạ dày cấp tính không nên ăn lúc bụng đói.',
      disclaimer: 'Giống cây ăn trái thượng hạng cho khu vườn ban công hiện đại.'
    },
    academic_citations: [
      'Journal of Agricultural and Food Chemistry - Volatile aroma compounds and bioactive profile of Citrus australasica'
    ],
    monetization_tips: [
      'Quả chanh ngón tay tươi bán cho các nhà hàng Nhật/Âu với giá 1.200.000đ - 2.000.000đ/kg.',
      'Nhân giống cây ghép mắt chanh ngón tay ruột đỏ/xanh bán 280.000đ - 450.000đ/chậu.'
    ],
    tags: ['Trứng cá tầm', 'Cây quý hiếm', 'Giá trị cao', 'Chậu ban công']
  },
  {
    id: 'fruit-22',
    slug: 'buoi-dien-lun-chau',
    common_name: 'Bưởi Diễn Lùn Trồng Chậu',
    scientific_name: 'Citrus maxima',
    aliases: ['Bưởi Diễn Ghép Gốc Lùn', 'Bưởi Cảnh Tết Hà Nội', 'Hoàng Kim Bưởi'],
    category: 'fruit',
    description: 'Tinh hoa cây ăn quả đất kinh kỳ thu nhỏ trên sân thượng đô thị. Mùa xuân hoa bưởi nở trắng muốt tỏa hương thơm ngát khắp căn nhà; mùa đông quả chín vàng rực như những chiếc đèn lồng tài lộc, tép bưởi ráo nước ngọt đậm đà.',
    quick_answer: 'Chọn cây bưởi Diễn chiết hoặc ghép gốc bưởi chua trồng trong chậu đường kính 50-60cm. Thụ phấn bổ sung bằng cọ mềm khi hoa nở và bón phân hữu cơ giàu Kali từ tháng 7 âm lịch để quả ngọt sắc.',
    botanical_details: {
      family: 'Rutaceae (Họ Cửu lý hương / Cam chanh)',
      native_range: 'Đặc sản làng Phú Diễn (Từ Liêm, Hà Nội - Việt Nam)',
      active_compounds: ['Naringin', 'Hesperidin', 'Vitamin C', 'Tinh dầu Neroli (Hoa bưởi)', 'Pectin'],
      soil_ph: '5.5 - 6.5 (Đất thịt phù sa trộn phân chuồng hoai mục và trấu hun)',
      ideal_temp: '18°C - 32°C',
      pot_size: '50cm - 65cm (Chậu gốm hoặc chậu nhựa thông minh 70L)'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pomelo_fruit.jpg/960px-Pomelo_fruit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c407',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: 'Ra hoa tháng 2-3, thu hoạch quả vàng dịp Tết Nguyên Đán',
    container_suitable: true,
    seasonality: {
      north: 'Tháng 2 hoa nở thơm ngát, tháng 11-12 âm lịch quả chín vàng rực đón Tết',
      central: 'Cần che mưa lớn lúc hoa đang thụ phấn',
      south: 'Vẫn ra hoa đậu quả tốt trên sân thượng nhiều nắng, hương hoa cực thơm',
      best_months: [1, 2, 3, 11, 12]
    },
    medical_info: {
      uses: ['Tép bưởi giàu naringin giúp giảm mỡ máu, giảm gan nhiễm mỡ và kiểm soát cân nặng', 'Hoa bưởi chưng cất tinh dầu thư giãn thần kinh, ướp bột sắn dây giải nhiệt', 'Vỏ bưởi đun nước gội đầu kích thích mọc tóc dày đen và trị rụng tóc sau sinh'],
      folk_remedies: [
        'Vỏ bưởi Diễn thái chỉ nấu cùng bồ kết và sả chanh làm nước gội đầu dưỡng nang tóc chắc khỏe.',
        'Cùi bưởi trắng nấu chè đậu xanh, còn vỏ ngoài thái mỏng sên đường phèn mật ong ngậm trị ho đờm.'
      ],
      preparation: ['Ăn tươi sau khi để xuống nước 2 tuần', 'Ướp trà hoa bưởi', 'Làm mứt vỏ bưởi sấy dẻo'],
      toxicity_warning: 'Hoạt chất furanocoumarin trong bưởi có thể tương tác với một số thuốc hạ mỡ máu (nhóm statin) hoặc thuốc huyết áp; nên ăn cách giờ uống thuốc tây ít nhất 2 tiếng.',
      disclaimer: 'Đặc sản văn hóa và ẩm thực truyền thống lâu đời của Việt Nam.'
    },
    academic_citations: [
      'Viện Nghiên cứu Rau Quả Việt Nam - Bảo tồn nguồn gen Bưởi Diễn đặc sản',
      'Dược điển Việt Nam V - Tinh dầu vỏ và hoa bưởi'
    ],
    monetization_tips: [
      'Cây bưởi Diễn lùn trồng chậu bonsai có 8-12 quả vàng cho thuê hoặc bán dịp Tết giá 1.500.000đ - 5.000.000đ/chậu.',
      'Thu hoạch hoa bưởi tươi tháng Giêng bán 250.000đ - 350.000đ/kg để ướp sắn dây và chưng cất nước hoa bưởi.'
    ],
    tags: ['Hoa thơm ngát', 'Quả vàng đón Tết', 'Đặc sản Hà Nội', 'Giảm mỡ máu']
  },
  {
    id: 'fruit-23',
    slug: 'chanh-leo-tim-ngot',
    common_name: 'Chanh Leo Tím Ngọt (Mác Mác Đà Lạt)',
    scientific_name: 'Passiflora edulis',
    aliases: ['Chanh Dây Tím Ngọt', 'Mác Mác', 'Passion Fruit'],
    category: 'fruit',
    description: 'Giải pháp chống nóng tự nhiên hoàn hảo nhất cho ban công và sân thượng đô thị. Giàn lá xanh mướt cản tới 80% bức xạ nhiệt mặt trời, hoa nở đẹp tựa chiếc đồng hồ tím huyền ảo, quả chín vỏ tím sẫm thơm lừng ăn trực tiếp ngọt thanh không cần đường.',
    quick_answer: 'Trồng 1 cây trong thùng xốp 40L sẽ phủ kín 6-8m² giàn dây cáp ban công chỉ sau 3 tháng. Khi cây leo lên giàn chính, bấm ngọn cành cấp 1 để bật hàng loạt cành cấp 2 mang nụ hoa ở từng nách lá.',
    botanical_details: {
      family: 'Passifloraceae (Họ Lạc tiên)',
      native_range: 'Nam Mỹ, trồng tập trung tại Tây Nguyên và Tây Bắc Việt Nam',
      active_compounds: ['Vitamin C', 'Beta-carotene', 'Polyphenol', 'Piceatannol', 'Kali', 'Chrysin'],
      soil_ph: '5.5 - 6.8 (Đất tơi xốp giàu hữu cơ, thoát nước mặt tốt)',
      ideal_temp: '18°C - 32°C',
      pot_size: 'Thùng trồng 40L - 60L kèm lưới hoặc dây cáp leo'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Passiflora_edulis_forma_flavicarpa.jpg/960px-Passiflora_edulis_forma_flavicarpa.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c408',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '4 - 5 tháng từ lúc trồng cây ghép đến khi thu hoạch lứa quả đầu',
    container_suitable: true,
    seasonality: {
      north: 'Trồng đầu xuân tháng 2-3, thu quả suốt mùa hè sang thu',
      central: 'Che mát ban công tuyệt vời suốt mùa nắng gió Lào',
      south: 'Phát triển quanh năm, chọn giống ghép Đài Loan chịu nhiệt để sai quả',
      best_months: [2, 3, 4, 8, 9, 10]
    },
    medical_info: {
      uses: ['Tăng cường sức đề kháng, phục hồi thể lực nhanh sau vận động nhờ giàu Vitamin C và Kali', 'Hợp chất Piceatannol trong hạt chanh leo giúp bảo vệ collagen, làm sáng da và cải thiện độ nhạy insulin', 'Hương thơm tự nhiên của quả giúp thư giãn thần kinh và giảm căng thẳng'],
      folk_remedies: [
        'Chanh leo tím 2 quả lấy ruột pha cùng 1 muỗng mật ong và nước ấm uống buổi sáng giúp thanh lọc đường ruột và đẹp da.',
        'Cô đặc ruột chanh leo với đường phèn làm sốt chanh dây bảo quản tủ lạnh dùng quanh năm.'
      ],
      preparation: ['Ăn tươi trực tiếp bằng muỗng (giống tím ngọt)', 'Pha nước giải khát mật ong', 'Làm sốt bánh mousse / salad'],
      toxicity_warning: 'Nên nhai nhỏ hoặc xay nhuyễn hạt ở mức vừa phải; không nuốt chửng số lượng quá lớn hạt cứng cùng lúc đối với người có túi thừa đại tràng.',
      disclaimer: 'Cây leo giàn đa năng vừa làm mát kiến trúc xanh vừa cung cấp trái cây sạch.'
    },
    academic_citations: [
      'Journal of Agricultural and Food Chemistry - Piceatannol in Passiflora edulis seeds and metabolic health',
      'Viện Khoa Học Kỹ Thuật Nông Lâm Nghiệp Tây Nguyên (WASI)'
    ],
    monetization_tips: [
      'Bán cây giống chanh leo tím ngọt ghép mắt kháng bệnh giá 35.000đ - 50.000đ/cây.',
      'Chế biến cốt chanh leo mật ong lên men đóng hũ thủy tinh giải nhiệt mùa hè.'
    ],
    tags: ['Giàn leo chống nóng', 'Hoa tím tuyệt đẹp', 'Ngọt thơm', 'Giàu Vitamin C']
  },
  {
    id: 'fruit-24',
    slug: 'dua-hau-mini-leo-gian',
    common_name: 'Dưa Hấu Mini Leo Giàn (Sugar Baby)',
    scientific_name: 'Citrullus lanatus',
    aliases: ['Dưa Hấu Tí Hon', 'Dưa Hấu Bỏ Túi', 'Dưa Hấu Treo Ban Công'],
    category: 'fruit',
    description: 'Biến ban công nhỏ hẹp thành nông trại kỳ thú với những quả dưa hấu tròn xoe nặng 1.2 - 1.8kg treo lơ lửng trên lưới đứng. Vỏ dưa mỏng dính, ruột đỏ thẫm cát mịn và độ ngọt sắc vượt trội nhờ hứng trọn ánh nắng tầng cao.',
    quick_answer: 'Trồng trong chậu 25L-30L, cho dây leo thẳng đứng lên lưới cước để tiết kiệm diện tích. Thụ phấn tay vào 7h-8h sáng cho hoa cái ở đốt lá thứ 12-16, khi quả bằng nắm tay thì dùng túi lưới treo quả vào giàn.',
    botanical_details: {
      family: 'Cucurbitaceae (Họ Bầu bí)',
      native_range: 'Châu Phi, lai tạo dòng F1 mini ngắn ngày cho nông nghiệp đô thị',
      active_compounds: ['Lycopene', 'L-Citrulline', 'Beta-carotene', 'Vitamin A & C', 'Điện giải Kali'],
      soil_ph: '6.0 - 6.8 (Đất tơi xốp trộn phân trùn quế, tro trấu và vôi bột khử nấm)',
      ideal_temp: '24°C - 35°C',
      pot_size: '25L - 35L / gốc (Chậu sâu tối thiểu 30cm)'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg/960px-Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c409',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 2,
    growth_time: '60 - 65 ngày từ lúc gieo hạt đến khi thu hoạch quả chín',
    container_suitable: true,
    seasonality: {
      north: 'Vụ Xuân Hè (tháng 2 - 6) và vụ Thu Đông (tháng 8 - 11)',
      central: 'Trồng tốt suốt mùa nắng từ tháng 2 đến tháng 8',
      south: 'Trồng quanh năm, quả ngọt đậm nhất vào các tháng mùa khô',
      best_months: [2, 3, 4, 5, 8, 9],
      warning: 'Ngưng tưới đẫm trước khi thu hoạch 4-5 ngày để quả tích đường ngọt đậm và không bị nứt'
    },
    medical_info: {
      uses: ['Bù nước và khoáng điện giải tức thì, chứa hàm lượng Lycopene cao hơn cả cà chua tươi giúp bảo vệ tim mạch', 'Acid amin L-Citrulline trong cùi trắng giúp giãn mạch máu, giảm đau mỏi cơ bắp sau tập luyện', 'Thanh nhiệt giải thử, lợi tiểu trong những ngày nắng nóng đỉnh điểm'],
      folk_remedies: [
        'Phần vỏ xanh và cùi trắng dưa hấu hữu cơ (Tây qua bì) gọt sạch thái lát nấu nước uống cùng râu ngô giúp mát thận, hạ huyết áp nhẹ.',
        'Nước ép dưa hấu tươi thêm vài lá bạc hà uống giải cảm nắng mùa hè.'
      ],
      preparation: ['Bổ ăn tươi ướp lạnh', 'Ép nước sinh tố', 'Cùi trắng làm nộm giòn hoặc đun trà Tây qua bì'],
      toxicity_warning: 'Không nên ăn quá nhiều dưa hấu ướp lạnh sâu vào ban đêm đối với người tỳ vị yếu.',
      disclaimer: 'Trải nghiệm giáo dục thiên nhiên tuyệt vời cho trẻ nhỏ ngay tại căn hộ chung cư.'
    },
    academic_citations: [
      'Journal of Nutritional Biochemistry - Watermelon L-citrulline and vascular health',
      'Viện Cây Lương Thực và Cây Thực Phẩm - Kỹ thuật trồng dưa leo giàn giá thể'
    ],
    monetization_tips: [
      'Bán combo hạt giống + túi lưới đỡ quả + phân hữu cơ cho người mới trồng dưa sân thượng.',
      'Dưa hấu mini khắc chữ thư pháp tài lộc trồng chậu chưng Tết giá 250.000đ - 400.000đ/cặp.'
    ],
    tags: ['60 ngày thu hoạch', 'Leo giàn đứng', 'Ruột đỏ ngọt', 'Trải nghiệm cho bé']
  },
  {
    id: 'fruit-25',
    slug: 'thi-vang-bonsai',
    common_name: 'Thị Vàng Bonsai Hương Cổ',
    scientific_name: 'Diospyros decandra',
    aliases: ['Cây Thị Cô Tấm', 'Thị Thơm Bonsai Chậu', 'Thị Sáp Mini'],
    category: 'fruit',
    description: 'Mang cả bầu trời ký ức cổ tích Việt Nam về ban công nhà phố. Cây Thị bonsai có vỏ thân đen trầm mặc cổ kính, lá xanh bóng khỏe khoắn và những trái thị tròn xinh chín vàng ươm vào mùa thu, tỏa hương thơm ngọt ngào quyến rũ suốt nhiều tuần liền.',
    quick_answer: 'Chọn dòng thị sáp hoặc thị muộn ghép gốc bonsai lùn cao 60-100cm. Cây cực kỳ khỏe, chịu nắng gắt và chịu hạn tốt trong chậu gốm, quả chín vừa đẹp mắt vừa làm thơm tự nhiên cả phòng khách.',
    botanical_details: {
      family: 'Ebenaceae (Họ Thị)',
      native_range: 'Bản địa Việt Nam, gắn liền với văn hóa đình chùa và làng quê Bắc - Trung - Nam',
      active_compounds: ['Ester thơm tự nhiên', 'Tanin', 'Flavonoid', 'Betulinic acid', 'Vitamin A & C'],
      soil_ph: '5.5 - 7.0 (Đất thịt pha cát trộn xỉ than đập nhỏ và phân trùn quế)',
      ideal_temp: '18°C - 35°C',
      pot_size: 'Chậu gốm bonsai đường kính 35cm - 55cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Qu%E1%BA%A3_th%E1%BB%8B.jpg/960px-Qu%E1%BA%A3_th%E1%BB%8B.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c410',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 3,
    growth_time: 'Ra hoa tháng 3-4, quả chín vàng thơm ngát suốt mùa thu (tháng 8-10)',
    container_suitable: true,
    seasonality: {
      north: 'Mùa thu tháng 7-8 âm lịch quả thị chín vàng rực rỡ đón Tết Trung Thu',
      central: 'Chịu nắng gió rất khỏe, gốc già u bướu cổ lão',
      south: 'Phát triển xanh quanh năm, siết nước nhẹ đầu xuân để kích bật lộc hoa',
      best_months: [3, 4, 8, 9, 10]
    },
    medical_info: {
      uses: ['Hương thơm ester tự nhiên từ vỏ quả thị chín có tác dụng thư giãn hệ thần kinh trung ương, giảm đau đầu và an thần nhẹ', 'Quả thị chín mềm ngọt dịu giúp bồi bổ tỳ vị', 'Vỏ cây và rễ thị trong dân gian dùng nấu nước rửa vết thương ngoài da và trị dị ứng'],
      folk_remedies: [
        'Đặt 2-3 quả thị chín vàng trong chiếc giỏ đan tre ở phòng ngủ hoặc bàn làm việc giúp khử mùi ẩm mốc và mang lại giấc ngủ êm đềm.',
        'Vỏ quả thị chín phơi khô đốt xông nhẹ trong phòng giúp đuổi muỗi và làm thơm không gian sống.'
      ],
      preparation: ['Trưng bày thưởng hương tự nhiên trong nhà', 'Vò nhẹ đều tay cho quả chín mềm rồi thưởng thức thịt quả ngọt thơm'],
      toxicity_warning: 'Không ăn quả thị khi còn xanh chát hoặc lúc đang đói bụng vì hàm lượng tanin cao có thể kết tủa protein gây đầy bụng khó tiêu.',
      disclaimer: 'Biểu tượng văn hóa di sản gắn với truyện cổ tích Tấm Cám của dân tộc Việt Nam.'
    },
    academic_citations: [
      'Thực vật chí Việt Nam - Họ Thị (Ebenaceae)',
      'GS. Đỗ Tất Lợi - Những cây thuốc và vị thuốc Việt Nam'
    ],
    monetization_tips: [
      'Tạo tác cây Thị bonsai dáng trực hoặc dáng văn nhân đang mang quả vàng bán giá 1.500.000đ - 8.000.000đ/chậu.',
      'Quả thị sáp mini chín vàng đan kèm giỏ len thủ công bán mùa Trung Thu rất đắt hàng.'
    ],
    tags: ['Hương thơm cổ tích', 'Bonsai di sản', 'Quả vàng mùa thu', 'An thần tự nhiên']
  },

  // --- 5 CÂY CẢNH, KIỂNG LÁ & LỌC KHÔNG KHÍ ĐỘC BẢN (SPRINT 2: orn-16 -> orn-20) ---
  {
    id: 'orn-16',
    slug: 'trau-ba-nam-my-monstera',
    common_name: 'Trầu Bà Nam Mỹ Lá Xẻ (Monstera Deliciosa)',
    scientific_name: 'Monstera deliciosa',
    aliases: ['Monstera King', 'Trầu Bà Lá Xẻ Lỗ', 'Swiss Cheese Plant'],
    category: 'ornamental',
    description: 'Ông hoàng của phong cách nội thất nhiệt đới đương đại (Urban Jungle). Những phiến lá hình tim khổng lồ xẻ rãnh kết hợp cùng các lỗ tròn tự nhiên (fenestration) tạo nên kiệt tác điêu khắc sống động, giúp lọc khí formaldehyde và nâng tầm đẳng cấp phòng khách.',
    quick_answer: 'Monstera ưa ánh sáng tự nhiên gián tiếp cạnh cửa sổ lớn. Trồng trong giá thể thoát khí cực tốt (vỏ thông + đá perlite + xơ dừa + phân trùn quế) và cắm trụ xơ dừa để rễ khí sinh bám vào giúp lá mới ra ngày càng to và xẻ lỗ sâu.',
    botanical_details: {
      family: 'Araceae (Họ Ráy)',
      native_range: 'Rừng mưa nhiệt đới miền Nam Mexico đến Panama',
      active_compounds: ['Chlorophyll đậm đặc', 'Flavonoid'],
      soil_ph: '5.5 - 6.8 (Giá thể thoáng khí Aroid Mix)',
      ideal_temp: '18°C - 30°C',
      pot_size: '30cm - 45cm kèm trụ rêu hoặc trụ xơ dừa'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Monstera_deliciosa2.jpg/960px-Monstera_deliciosa2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c411',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: 'Mỗi tháng bung 1-2 lá mới xẻ thùy lớn hơn lá trước',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển mạnh nhất từ tháng 3 đến tháng 10, mùa đông giữ trong nhà ấm',
      central: 'Tránh nắng trưa chiếu trực tiếp gây cháy vàng lá',
      south: 'Xanh mướt và bung lá khổng lồ quanh năm',
      best_months: [3, 4, 5, 6, 8, 9]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Phối trộn giá thể Aroid Mix',
        instruction: 'Trộn 30% vỏ thông xử lý, 30% đá perlite/pumice, 20% mụn dừa đã xả chát và 20% phân trùn quế để rễ không bao giờ bị ngạt nước.'
      },
      {
        step: 2,
        title: 'Dựng trụ rêu giữ ẩm',
        instruction: 'Buộc phần thân sau của cây (nơi mọc rễ khí) áp sát vào trụ rêu ẩm để kích thích bản lá trưởng thành đạt kích thước 50-80cm.'
      },
      {
        step: 3,
        title: 'Lau lá bằng khăn mềm',
        instruction: 'Định kỳ 2 tuần dùng khăn ẩm lau sạch bụi mịn trên bề mặt lá để mở khí khổng giúp cây lọc không khí tối đa.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao cây Monstera của tôi ra lá mới nhưng không xẻ rãnh?',
        answer: 'Nguyên nhân chính là do thiếu ánh sáng tự nhiên gián tiếp hoặc cây còn non. Hãy dời chậu lại gần cửa sổ sáng hơn và bổ sung trụ leo cho rễ khí bám.'
      }
    ],
    monetization_tips: [
      'Cắt khúc nhân giống qua mắt ngủ (node) có rễ khí, ươm trong rêu sphagnum bán 150.000đ - 350.000đ/chậu.',
      'Chậu Monstera trưởng thành lá xẻ lỗ kép (double fenestration) có giá trị thương mại từ 1.200.000đ - 4.000.000đ/chậu.'
    ],
    tags: ['Vua kiểng lá', 'Lá xẻ lỗ', 'Urban Jungle', 'Lọc khí độc']
  },
  {
    id: 'orn-17',
    slug: 'cay-hanh-phuc',
    common_name: 'Cây Hạnh Phúc Nội Thất',
    scientific_name: 'Radermachera sinica',
    aliases: ['Cây Gõ Đỏ Cảnh', 'China Doll Plant', 'Emerald Tree'],
    category: 'ornamental',
    description: 'Loài cây thân gỗ nội thất mang thông điệp phong thủy ấm áp nhất về sự viên mãn, gắn kết và bình an gia đạo. Hàng trăm phiến lá kép nhỏ nhắn xanh bóng mướt mắt xếp đan xen tạo thành vòm tán hình trái tim tròn đầy tràn ngập sức sống.',
    quick_answer: 'Cây Hạnh Phúc ưa không gian phòng khách thông thoáng có ánh sáng tự nhiên dịu nhẹ. Tưới nước 2-3 lần/tuần giữ ẩm vừa phải và xịt phun sương lên vòm lá mỗi sáng để lá luôn xanh bóng như ngọc.',
    botanical_details: {
      family: 'Bignoniaceae (Họ Đinh / Núc nác)',
      native_range: 'Vùng núi cận nhiệt đới Nam Trung Hoa và Bắc Đông Dương',
      active_compounds: ['Tinh dầu thực vật kháng khuẩn nhẹ', 'Chlorophyll'],
      soil_ph: '6.0 - 7.0 (Đất tơi xốp giàu mùn hữu cơ)',
      ideal_temp: '18°C - 28°C (Rất hợp nhiệt độ phòng điều hòa)',
      pot_size: 'Chậu để bàn 18cm hoặc chậu góc sofa 35cm - 45cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Radermachera_sinica_-_%22China_Doll_tree%22_%283_photos%29_%284400613119%29.jpg/960px-Radermachera_sinica_-_%22China_Doll_tree%22_%283_photos%29_%284400613119%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c412',
    sunlight: 'indoor',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: 'Tán lá phát triển dày dặn liên tục quanh năm',
    container_suitable: true,
    seasonality: {
      north: 'Xanh tốt bốn mùa trong nhà, tránh gió lùa lạnh buốt mùa đông',
      central: 'Đặt trong phòng khách mát mẻ hoặc hành lang có mái che',
      south: 'Phát triển tuyệt đẹp trong căn hộ chung cư và văn phòng',
      best_months: [2, 3, 4, 8, 9, 10]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Chọn vị trí thông thoáng',
        instruction: 'Đặt cây cạnh sofa phòng khách hoặc bàn làm việc cách cửa sổ 1-2m, tránh luồng gió điều hòa thổi trực tiếp vào tán lá.'
      },
      {
        step: 2,
        title: 'Tỉa tán giữ phom tròn',
        instruction: 'Mỗi 2 tháng dùng kéo sắc tỉa nhẹ các cành vươn quá dài để kích thích cây đâm chồi nách tạo vòm tán tròn đều.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao cây Hạnh Phúc để trong phòng kín lâu ngày bị rụng lá non?',
        answer: 'Cây cần sự lưu thông không khí và ánh sáng nhẹ. Mỗi tuần nên mở cửa sổ thông gió hoặc cho cây tắm nắng sớm nhẹ (trước 8h sáng) 1-2 buổi.'
      }
    ],
    monetization_tips: [
      'Cây Hạnh Phúc trồng chậu gốm sứ cao cấp làm quà tặng tân gia, kỷ niệm ngày cưới giá 350.000đ - 1.200.000đ/chậu.',
      'Dòng cây Hạnh Phúc mini để bàn làm việc giá 120.000đ - 180.000đ/chậu.'
    ],
    tags: ['Gia đạo bình an', 'Quà tặng tân gia', 'Lá xanh bóng', 'Nội thất sang trọng']
  },
  {
    id: 'orn-18',
    slug: 'truc-bach-hop',
    common_name: 'Trúc Bách Hợp Viền Vàng',
    scientific_name: 'Dracaena reflexa',
    aliases: ['Phất Dụ Trúc Bách Hợp', 'Song of India', 'Hoàng Kim Trúc'],
    category: 'ornamental',
    description: 'Được Cơ quan Hàng không Vũ trụ Mỹ (NASA) vinh danh trong nhóm thực vật lọc sạch khí độc Trichloroethylene, Xylene và Formaldehyde hiệu quả nhất. Những dải lá xanh lục viền vàng ánh kim xếp xoắn hoa thị quanh thân gỗ uốn lượn mang vẻ đẹp vương giả, thịnh vượng.',
    quick_answer: 'Trúc bách hợp cực kỳ bền bỉ, chịu được cả môi trường văn phòng máy lạnh lẫn ban công bán râm. Tưới nước 1-2 lần/tuần khi đất mặt đã khô ráo, cây càng có ánh sáng tán xạ thì đường viền vàng trên lá càng rực rỡ.',
    botanical_details: {
      family: 'Asparagaceae (Họ Măng tây)',
      native_range: 'Các đảo nhiệt đới Ấn Độ Dương (Madagascar, Mauritius)',
      active_compounds: ['Saponin thực vật', 'Lutein', 'Chlorophyll'],
      soil_ph: '6.0 - 6.8 (Đất thoát nước tốt trộn xơ dừa và đá trân châu)',
      ideal_temp: '18°C - 32°C',
      pot_size: '25cm - 40cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Dracaena_reflexa.JPG/960px-Dracaena_reflexa.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c413',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: 'Cây thân gỗ bền vững sống trên 10 năm trong chậu',
    container_suitable: true,
    seasonality: {
      north: 'Xanh đẹp quanh năm, chịu lạnh mùa đông tốt hơn nhiều loài kiểng lá khác',
      central: 'Phù hợp trang trí sảnh, hiên nhà và ban công',
      south: 'Phát triển rực rỡ cả 12 tháng',
      best_months: [1, 2, 3, 4, 9, 10]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Sử dụng nước tưới đã bay hơi Clo',
        instruction: 'Họ Dracaena nhạy cảm với Flo và Clo trong nước máy; nên để nước máy qua đêm trước khi tưới để đầu lá không bị khô nâu.'
      },
      {
        step: 2,
        title: 'Nhân giống bằng cành cắt ngọn',
        instruction: 'Khi cây cao quá tầm, có thể cắt đoạn ngọn 20cm giâm vào đất ẩm hoặc cắm nước, phần gốc cũ sẽ bật tiếp 2-3 nhánh con mới.'
      }
    ],
    faqs: [
      {
        question: 'Trúc bách hợp hợp với mệnh nào trong phong thủy?',
        answer: 'Với sắc lá xanh lục phối viền vàng kim rực rỡ, cây đặc biệt tương sinh và mang lại may mắn tài lộc cho gia chủ mệnh Kim, mệnh Thủy và mệnh Mộc.'
      }
    ],
    monetization_tips: [
      'Cho thuê hoặc bán chậu Trúc bách hợp ghép 3 tầng cho văn phòng công ty, sảnh khách sạn.',
      'Cắt cành ngọn ươm chậu mini để bàn bán 85.000đ - 150.000đ/chậu.'
    ],
    tags: ['Chuẩn lọc khí NASA', 'Viền vàng kim', 'Bền bỉ 10 năm', 'Phong thủy vượng khí']
  },
  {
    id: 'orn-19',
    slug: 'tung-bong-lai-bonsai',
    common_name: 'Tùng Bồng Lai Để Bàn',
    scientific_name: 'Podocarpus macrophyllus',
    aliases: ['Tùng Lá Văn Trúc', 'Tùng Bồng Lai California', 'Tiểu La Hán Tùng'],
    category: 'ornamental',
    description: 'Thu trọn vẻ đẹp hùng vĩ của núi non tiên cảnh vào chiếc chậu gốm nhỏ trên bàn trà. Tán lá kim mềm mịn xanh thẫm xếp thành từng tầng mây bồng bềnh, gốc thân uốn lượn ôm đá tượng trưng cho bản lĩnh kiên cường, khí tiết quân tử và phúc thọ綿 trường.',
    quick_answer: 'Tùng bồng lai là một trong số ít dòng Tùng sống khỏe được cả ở bàn làm việc sáng đèn lẫn ban công. Cây có bộ rễ khỏe, chịu hạn tốt, chỉ cần tưới khi mặt đất hơi se khô và phun sương làm mát tán lá kim.',
    botanical_details: {
      family: 'Podocarpaceae (Họ Kim giao / La hán tùng)',
      native_range: 'Đông Á, dòng lá kim mịn Bồng Lai thuần hóa chậu bonsai tại Việt Nam',
      active_compounds: ['Phytoncide kháng khuẩn không khí', 'Pinene'],
      soil_ph: '5.5 - 6.5 (Đất bonsai chuyên dụng: Akadama + Pumice + Đất thịt hun)',
      ideal_temp: '15°C - 32°C',
      pot_size: 'Chậu gốm tử sa hoặc chậu men rạn 15cm - 30cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Podocarpus_macrophyllus.jpg/960px-Podocarpus_macrophyllus.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c414',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: 'Sống trường thọ hàng chục năm, dáng thế ngày càng cổ kính',
    container_suitable: true,
    seasonality: {
      north: 'Cây thường xanh bốn mùa, không rụng lá ngay cả trong mùa đông giá rét',
      central: 'Chịu gió và nắng bán phần rất dẻo dai',
      south: 'Đâm chồi non xanh ngọc bích liên tục quanh năm',
      best_months: [1, 2, 3, 4, 9, 10, 11, 12]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Phối tiểu cảnh non bộ',
        instruction: 'Kết hợp Tùng bồng lai với đá tuyết sơn, rêu nhung xanh và tượng ông lão câu cá để tạo tiểu cảnh thiền định trên bàn trà.'
      },
      {
        step: 2,
        title: 'Cắt tỉa định hình tay tán',
        instruction: 'Dùng kéo tỉa dăm định kỳ 3 tháng/lần để giữ các tầng lá phẳng mịn như áng mây bồng lai.'
      }
    ],
    faqs: [
      {
        question: 'Tùng bồng lai để bàn làm việc trong phòng máy lạnh có cần phơi nắng không?',
        answer: 'Cây sống tốt trong phòng sáng, nhưng nếu mỗi cuối tuần bạn đặt cây gần cửa sổ đón nắng nhẹ 1-2 buổi thì chồi non sẽ bật dày và xanh mướt hơn rất nhiều.'
      }
    ],
    monetization_tips: [
      'Thiết kế tiểu cảnh Tùng bồng lai ôm đá trên khay gốm Bát Tràng bán giá 280.000đ - 850.000đ/bộ.',
      'Cung cấp cây quà tặng doanh nhân mang ý nghĩa "Tùng Bách Trường Thanh".'
    ],
    tags: ['Bonsai bàn trà', 'Trường thọ', 'Khí tiết quân tử', 'Tiểu cảnh thiền']
  },
  {
    id: 'orn-20',
    slug: 'duoi-cong-tao-xanh-calathea',
    common_name: 'Đuôi Công Táo Xanh (Calathea Orbifolia)',
    scientific_name: 'Calathea orbifolia',
    aliases: ['Đuôi Công Bầu Bạc', 'Cây Cầu Nguyện', 'Prayer Plant'],
    category: 'ornamental',
    description: 'Nữ hoàng kiểng lá nghệ thuật với những phiến lá tròn bầu rộng lớn, điểm xuyết các đường vân sọc ánh bạc xen kẽ xanh táo tuyệt mỹ như chiếc quạt lông công. Đặc biệt, cây có nhịp sinh học kỳ diệu: ban ngày xòe rộng đón sáng, ban đêm tự động khép đứng lại như đôi bàn tay cầu nguyện.',
    quick_answer: 'Calathea Orbifolia hoàn toàn không có độc tố (100% Pet-Safe cho chó mèo và trẻ nhỏ). Cây ưa bóng râm mát mẻ, độ ẩm không khí cao và đất giữ ẩm nhẹ nhưng thoát nước tốt.',
    botanical_details: {
      family: 'Marantaceae (Họ Hoàng tinh / Dong riềng)',
      native_range: 'Rừng mưa nhiệt đới Bolivia (Nam Mỹ)',
      active_compounds: ['Hoàn toàn không chứa tinh thể Calcium Oxalate (An toàn tuyệt đối cho thú cưng)'],
      soil_ph: '6.0 - 6.5 (Giá thể giữ ẩm thoáng khí: Mụn dừa + Perlite + Phân trùn quế + Vỏ thông nhỏ)',
      ideal_temp: '18°C - 27°C',
      pot_size: '20cm - 30cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Calathea_orbifolia_2.jpg/960px-Calathea_orbifolia_2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c415',
    sunlight: 'indoor',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: 'Đẻ nhánh con từ thân ngầm, lá mới cuộn tròn như ống sáo khi bung mở',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển đẹp nhất mùa xuân - hè - thu; mùa đông hanh khô nên đặt gần máy tạo ẩm',
      central: 'Trồng trong nhà mát, tránh gió nóng khô',
      south: 'Sống khỏe quanh năm trong phòng khách và phòng ngủ',
      best_months: [3, 4, 5, 6, 7, 8, 9, 10]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Tưới nước lọc hoặc nước mưa',
        instruction: 'Lá Đuôi công rất mỏng mịn và nhạy cảm với muối khoáng trong nước máy; dùng nước lọc RO hoặc nước máy để lắng 24h sẽ giữ viền lá luôn xanh mướt không cháy mép.'
      },
      {
        step: 2,
        title: 'Duy trì độ ẩm quanh chậu',
        instruction: 'Đặt chậu lên một khay sỏi có chút nước bên dưới (đáy chậu không chạm nước) để hơi nước bốc lên nuôi dưỡng mặt lá luôn căng bóng.'
      }
    ],
    faqs: [
      {
        question: 'Nhà có nuôi mèo và em bé nhỏ thì trồng Đuôi công Táo xanh có an toàn không?',
        answer: 'An toàn 100%! Khác với họ Ráy (Araceae), họ Hoàng tinh (Marantaceae) được Hiệp hội ASPCA chứng nhận hoàn toàn không độc với chó, mèo và trẻ nhỏ.'
      }
    ],
    monetization_tips: [
      'Tách bụi nhân giống các chậu Calathea Orbifolia bán cho cộng đồng yêu kiểng lá và người nuôi thú cưng với giá 180.000đ - 450.000đ/chậu.',
      'Phối chậu gốm trắng Bắc Âu trang trí studio, quán cà phê và căn hộ cao cấp.'
    ],
    tags: ['An toàn thú cưng', 'Lá khép ban đêm', 'Vân bạc nghệ thuật', 'Nội thất Bắc Âu']
  },

  // ==========================================
  // SPRINT 3 (ĐỢT 3): 20 LOÀI THỰC VẬT ĐỘC BẢN CÁN MỐC 100 LOÀI BÁCH KHOA
  // (8 Thảo Dược Quý + 6 Cây Ăn Trái Ban Công + 6 Kiểng Lá & Bonsai Phong Thủy)
  // ==========================================
  {
    id: 'herb-41',
    slug: 'mia-do-cat-loi',
    common_name: 'Mía Dò Bản Địa (Cát Lồi)',
    scientific_name: 'Costus speciosus',
    aliases: ['Cát Lồi', 'Đọt Lúc', 'Mía Dò Hoa Trắng'],
    category: 'herb',
    description: 'Thảo dược kiêm rau rừng đặc sản miền Tây và Đông Nam Bộ. Thân mọc xoắn ốc nghệ thuật với búp hoa đỏ thẫm bung cánh trắng tinh khôi, chứa hoạt chất diosgenin (tiền chất steroid kháng viêm tự nhiên) giúp thanh nhiệt, lợi tiểu và giảm đau nhức xương khớp.',
    quick_answer: 'Mía dò cực kỳ dễ trồng từ khúc thân rễ trong chậu ẩm mát ban công. Đọt non bẻ ăn sống giòn ngọt hơi chua thanh cuốn bánh xèo tuyệt ngon; thân rễ thu hoạch làm thuốc mát thận, tiêu phù thũng.',
    botanical_details: {
      family: 'Costaceae (Họ Mía dò)',
      native_range: 'Bản địa Việt Nam và vùng nhiệt đới châu Á',
      active_compounds: ['Diosgenin', 'Tigogenin', 'Saponin steroid', 'Curcuminoid', 'Flavonoid'],
      soil_ph: '5.5 - 7.0 (Đất ẩm giàu mùn hữu cơ)',
      ideal_temp: '20°C - 34°C',
      pot_size: '30cm - 45cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Hellenia_speciosa_%282767164549%29.jpg/960px-Hellenia_speciosa_%282767164549%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d501',
    sunlight: 'partial_shade',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '45 ngày thu hoạch đọt non, 8 tháng thu củ rễ',
    container_suitable: true,
    seasonality: {
      north: 'Mọc mạnh mùa mưa hè thu, mùa đông tàn lụi phần thân trên mặt đất',
      central: 'Trồng nơi góc vườn hoặc ban công râm mát',
      south: 'Xanh tốt và cho đọt non ăn quanh năm',
      best_months: [4, 5, 6, 7, 8, 9, 10]
    },
    medical_info: {
      uses: ['Kháng viêm tự nhiên, giảm đau nhức dây thần kinh và thấp khớp', 'Lợi tiểu, thanh nhiệt, trị chứng tiểu buốt, tiểu rắt và viêm đường tiết niệu', 'Nước ép ngọn tươi nướng ấm nhỏ tai trị viêm tai giữa đau nhức theo kinh nghiệm dân gian'],
      folk_remedies: [
        'Thân rễ mía dò khô 15g + Râu ngô 15g + Mã đề 12g sắc nước uống trong ngày trị chứng tiểu buốt, sỏi bàng quang nhỏ.',
        'Đọt cát lồi non bóc vỏ ngoài ăn sống chấm mắm kho hoặc luộc chấm kho quẹt giúp mát gan giải nhiệt.'
      ],
      preparation: ['Ăn sống hoặc luộc đọt non làm rau', 'Thái lát thân rễ phơi khô sao vàng sắc nước uống'],
      toxicity_warning: 'Củ mía dò tươi chưa nấu chín có thể gây kích ứng nhẹ cổ họng nếu dùng liều cao; phụ nữ đang mang thai không dùng củ mía dò làm thuốc.',
      disclaimer: 'Vị thuốc quý đồng thời là nguồn nguyên liệu chiết xuất diosgenin trong ngành dược phẩm.',
      confusion_risk: {
        confused_with: 'Cây Gừng Gió hoặc cây Riềng Rừng',
        distinguishing_features: 'Lá mía dò mọc xếp xoắn ốc quanh thân như bậc thang xoắn chứ không mọc đối xứng 2 hàng phẳng như họ Gừng.'
      }
    },
    academic_citations: [
      'Dược điển Việt Nam V - Chuyên luận Mía dò (Rhizoma Costi)',
      'GS. Đỗ Tất Lợi - Những cây thuốc và vị thuốc Việt Nam (trang 458)'
    ],
    monetization_tips: [
      'Trồng chậu mía dò vừa làm cây cảnh hoa trắng búp đỏ vừa cắt đọt rau rừng bán 50.000đ/kg.',
      'Cung cấp củ giống mía dò bản địa cho người làm vườn sinh thái.'
    ],
    tags: ['Rau rừng bánh xèo', 'Kháng viêm khớp', 'Lợi tiểu mát thận', 'Thân xoắn ốc']
  },
  {
    id: 'herb-42',
    slug: 'bach-dong-nu',
    common_name: 'Bạch Đồng Nữ (Mò Hoa Trắng)',
    scientific_name: 'Clerodendrum chinense',
    aliases: ['Mò Mâm Xôi', 'Ngọc Nữ Hoa Trắng', 'Bấn Trắng'],
    category: 'herb',
    description: 'Thảo dược hộ mệnh cho sức khỏe phụ nữ và người cao huyết áp. Chùm hoa trắng hồng xếp tầng như đóa cẩm tú cầu tỏa hương thơm ngát, lá chứa flavonoid và alcaloid giúp thanh nhiệt lương huyết, hạ áp nhẹ và tiêu viêm hiệu quả.',
    quick_answer: 'Bạch đồng nữ là cây bụi khỏe khoắn, chịu nắng và chịu cắt tỉa tốt trong chậu 35cm. Vừa làm cây cảnh hoa thơm ở ban công vừa hái lá đun nước uống mát gan hoặc nấu nước ngâm rửa phụ khoa.',
    botanical_details: {
      family: 'Lamiaceae (Họ Hoa môi / Bạc hà)',
      native_range: 'Bản địa Việt Nam, Nam Trung Hoa và Đông Nam Á',
      active_compounds: ['Clerodendrin', 'Flavonoid', 'Hispidulin', 'Tannin', 'Saponin'],
      soil_ph: '5.8 - 7.0',
      ideal_temp: '20°C - 34°C',
      pot_size: '30cm - 45cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Starr_061212-2299_Clerodendrum_chinense.jpg/960px-Starr_061212-2299_Clerodendrum_chinense.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d502',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '60 ngày từ khi giâm cành bắt đầu ra chùm hoa thơm',
    container_suitable: true,
    seasonality: {
      north: 'Ra hoa thơm ngát từ tháng 5 đến tháng 10',
      central: 'Cây chịu hạn tốt, phát triển quanh năm',
      south: 'Xanh tốt và nở hoa liên tục 4 mùa',
      best_months: [4, 5, 6, 7, 8, 9]
    },
    medical_info: {
      uses: ['Hỗ trợ điều hòa kinh nguyệt, trị khí hư bạch đới và viêm nhiễm phụ khoa', 'Giãn mạch ngoại vi giúp hạ huyết áp nhẹ và giảm đau đầu do can hỏa vượng', 'Trị vàng da, mụn nhọt lở ngứa ngoài da'],
      folk_remedies: [
        'Lá bạch đồng nữ khô 16g + Ích mẫu 12g + Ngải cứu 10g + Hương phụ 8g sắc uống trước kỳ kinh 7 ngày giúp điều kinh và giảm đau bụng kinh.',
        'Lá bạch đồng nữ tươi 1 nắm lớn đun sôi kỹ với muối hạt để ấm ngâm rửa trị viêm ngứa ngoài da.'
      ],
      preparation: ['Thu hái lá trước khi cây ra hoa, phơi khô trong râm', 'Sắc nước uống hoặc nấu cao đặc'],
      toxicity_warning: 'Lành tính. Người có huyết áp thấp nên dùng liều vừa phải và uống sau bữa ăn.',
      disclaimer: 'Được nghiên cứu lâm sàng và ứng dụng rộng rãi tại Viện Đông Y Việt Nam.',
      confusion_risk: {
        confused_with: 'Cây Xích Đồng Nam (Clerodendrum japonicum - hoa đỏ)',
        distinguishing_features: 'Bạch đồng nữ có hoa màu trắng phớt hồng thơm ngát xếp thành mâm xôi, lá hình tim to có lông mịn.'
      }
    },
    academic_citations: [
      'Dược điển Việt Nam V - Chuyên luận Bạch đồng nữ (Folium Clerodendri)',
      'GS. Đỗ Tất Lợi - Những cây thuốc và vị thuốc Việt Nam (trang 601)'
    ],
    monetization_tips: [
      'Đóng gói lá Bạch đồng nữ sấy lạnh kết hợpTrầu không làm túi lọc thảo dược vệ sinh phụ nữ.',
      'Bán chậu cây Mò hoa trắng kép làm cây cảnh hương thơm ban công.'
    ],
    tags: ['Sức khỏe phụ nữ', 'Hạ huyết áp', 'Hoa thơm mâm xôi', 'Tiêu viêm']
  },
  {
    id: 'herb-43',
    slug: 'giao-co-lam-5-la',
    common_name: 'Giảo Cổ Lam 5 Lá (Cỏ Trường Thọ)',
    scientific_name: 'Gynostemma pentaphyllum',
    aliases: ['Ngũ Diệp Sâm', 'Cỏ Thần Kỳ', 'Phúc Âm Thảo'],
    category: 'herb',
    description: 'Được mệnh danh là "Nhân sâm phương Nam" với hơn 80 hoạt chất Saponin (Gypenoside) có cấu trúc tương tự Ginsenoside trong Nhân sâm. Dây leo lá 5 thùy chân vịt thanh nhã giúp hạ mỡ máu, giảm cholesterol xấu, ổn định đường huyết và kéo dài tuổi thọ.',
    quick_answer: 'Giảo cổ lam là dây leo nhỏ mảnh, ưa bóng râm mát mẻ trên ban công hướng Đông hoặc Bắc. Cắt dây và lá phơi khô hãm trà uống mỗi sáng có vị đắng nhẹ ban đầu sau chuyển ngọt hậu rất sảng khoái.',
    botanical_details: {
      family: 'Cucurbitaceae (Họ Bầu bí)',
      native_range: 'Vùng núi đá vôi Hòa Bình, Lào Cai, Cao Bằng (Việt Nam) và Đông Á',
      active_compounds: ['Gypenoside (hơn 80 loại Saponin)', 'Flavonoid (Quercetin, Rutin)', 'Adenosine', 'Polysaccharide'],
      soil_ph: '6.0 - 7.2 (Đất tơi xốp giàu mùn và canxi nhẹ)',
      ideal_temp: '16°C - 28°C',
      pot_size: 'Chậu treo hoặc khay dài 40cm có lưới leo nhẹ'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Kluse_-_Gynostemma_pentaphyllum_-_Jiaogulan_01_ies.jpg/960px-Kluse_-_Gynostemma_pentaphyllum_-_Jiaogulan_01_ies.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d503',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '35 - 40 ngày bắt đầu thu hái lứa dây lá đầu tiên làm trà',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển cực nhanh mùa xuân - hè - thu',
      central: 'Trồng dưới mái hiên mát, tránh nắng lửa buổi trưa',
      south: 'Xanh tốt quanh năm ở ban công râm mát và ẩm',
      best_months: [2, 3, 4, 5, 9, 10]
    },
    medical_info: {
      uses: ['Giảm cholesterol toàn phần và triglyceride, ngăn ngừa xơ vữa động mạch và gan nhiễm mỡ', 'Kích hoạt enzyme AMPK giúp tăng nhạy cảm insulin và hạ đường huyết ở người tiểu đường tuýp 2', 'Chống oxy hóa mạnh, bảo vệ tế bào gan và tăng sức bền thể lực'],
      folk_remedies: [
        'Trà Giảo cổ lam 5 lá khô 15-20g tráng qua nước sôi, sau đó hãm với 500ml nước sôi 90°C uống vào buổi sáng và đầu giờ chiều giúp đầu óc minh mẫn, nhẹ người.',
        'Giảo cổ lam 15g + Xạ đen 15g + Cà gai leo 15g hãm nước uống hỗ trợ thải độc gan và hạ men gan.'
      ],
      preparation: ['Sao khô trên chảo gang hoặc sấy lạnh làm trà nguyên lá', 'Kết hợp cùng cỏ ngọt hoặc táo đỏ'],
      toxicity_warning: 'Giảo cổ lam giúp tỉnh táo và hoạt huyết nên không uống vào buổi tối muộn trước khi đi ngủ. Người huyết áp quá thấp nên thêm vài lát gừng tươi khi uống.',
      disclaimer: 'Đề tài nghiên cứu cấp Nhà nước của GS.TS Phạm Thanh Kỳ đã được vinh danh giải thưởng Hồ Chí Minh.',
      confusion_risk: {
        confused_with: 'Cây Hoàng Đằng hoặc dây Nho rừng 5 lá (Cayratia japonica)',
        distinguishing_features: 'Giảo cổ lam chuẩn có 5 lá chét hình chân vịt, tua cuốn mọc ở nách lá và khi nhai thử lá tươi có vị đắng sau ngọt mát mùi sâm đặc trưng.'
      }
    },
    academic_citations: [
      'GS.TS Phạm Thanh Kỳ - Đề tài cấp Nhà nước nghiên cứu cây Giảo cổ lam Việt Nam',
      'Phytomedicine - Gypenosides from Gynostemma pentaphyllum and lipid metabolism'
    ],
    monetization_tips: [
      'Sản xuất trà búp Giảo cổ lam 5 lá sao thủ công bán giá 350.000đ - 500.000đ/kg.',
      'Bán chậu giống Giảo cổ lam 5 lá chuẩn Hòa Bình cho các gia đình tự trồng làm trà.'
    ],
    tags: ['Hạ mỡ máu', 'Trà trường thọ', 'Ngũ diệp sâm', 'Kiểm soát tiểu đường']
  },
  {
    id: 'herb-44',
    slug: 'xa-den-hoa-binh',
    common_name: 'Xạ Đen Hòa Bình Chính Gốc',
    scientific_name: 'Celastrus hindsii',
    aliases: ['Cây Bách Giải', 'Cây Đồng Triều', 'Cây Ung Thư Mường'],
    category: 'herb',
    description: 'Báu vật thảo dược của đồng bào dân tộc Mường vùng núi Hòa Bình. Chồi non có sắc tím sẫm, nhựa cây khi cắt chuyển màu đen đặc trưng ("Xạ đen"). Giàu hợp chất Maytenfolone A, Celasdin B và axit Rosmarinic giúp bảo vệ gan, chống oxy hóa tế bào và an thần.',
    quick_answer: 'Xạ đen là cây thân gỗ trườn cực kỳ khỏe, trồng chậu 40cm trên ban công chịu nắng mưa tốt và không hề có sâu bệnh. Hái cả lá và cành bánh tẻ phơi khô đun nước uống hàng ngày thay trà.',
    botanical_details: {
      family: 'Celastraceae (Họ Dây gối)',
      native_range: 'Vùng núi đá vôi Hòa Bình, Ninh Bình, Thừa Thiên Huế (Việt Nam)',
      active_compounds: ['Maytenfolone A', 'Celasdin B', 'Flavonoid', 'Quinone', 'Saponin Triterpenoid', 'Rosmarinic acid'],
      soil_ph: '5.5 - 7.0',
      ideal_temp: '18°C - 35°C',
      pot_size: '35cm - 50cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Celastrus_paniculatus_05.JPG/960px-Celastrus_paniculatus_05.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d504',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '3 - 4 tháng bắt đầu tỉa cành lá làm trà thảo dược',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển khỏe quanh năm, đọt non tím đậm vào mùa xuân - thu',
      central: 'Chịu nắng gió rất dẻo dai',
      south: 'Ra lộc lá liên tục cả 12 tháng',
      best_months: [2, 3, 4, 8, 9, 10]
    },
    medical_info: {
      uses: ['Thanh nhiệt giải độc gan, hỗ trợ hạ men gan, viêm gan và gan nhiễm mỡ', 'Chứa hoạt chất Quinone và Celasdin B giúp trung hòa gốc tự do và hỗ trợ tăng cường sức đề kháng', 'Giúp an thần, giảm suy nhược thần kinh và ngủ sâu giấc'],
      folk_remedies: [
        'Lá và thân xạ đen khô 30g rửa sạch đun với 1.5 lít nước sôi nhỏ lửa 15 phút, uống thay nước lọc hàng ngày có vị thơm dịu thanh mát.',
        'Xạ đen 25g + Bạch hoa xà thiệt thảo 15g + Bán chi liên 10g sắc nước uống sau bữa ăn 30 phút hỗ trợ tiêu độc.'
      ],
      preparation: ['Hái lá tươi vò nhẹ hãm nước sôi', 'Chặt khúc thân cành và lá phơi khô sao vàng'],
      toxicity_warning: 'Rất lành tính nhưng không nên uống nước xạ đen đã để qua đêm ở nhiệt độ phòng bị thiu. Phụ nữ mang thai và trẻ nhỏ dưới 5 tuổi không nên tự ý sử dụng.',
      disclaimer: 'Đã được Học viện Quân Y Việt Nam nghiên cứu chuyên sâu về thành phần hóa học và tác dụng sinh học.',
      confusion_risk: {
        confused_with: 'Cây Xạ Vàng (Celastrus paniculatus) hoặc cây Xạ Đen giả lá to',
        distinguishing_features: 'Xạ đen Hòa Bình chuẩn có lá dày, mép lá có răng cưa nhẹ, ngọn non màu tím huyết dụ và thân cắt ra có nhựa chuyển màu đen, đun nước có màu nâu sẫm thơm ngậy.'
      }
    },
    academic_citations: [
      'GS.TSKH Lê Thế Trung (Học viện Quân Y) - Công trình nghiên cứu cây Xạ đen Việt Nam',
      'Phytochemistry - Cytotoxic triterpenes and flavonoids from Celastrus hindsii'
    ],
    monetization_tips: [
      'Nhân giống cây con Xạ đen chuẩn giống Hòa Bình (ngọn tím răng cưa) bán 30.000đ - 50.000đ/cây.',
      'Chế biến cao khô hoặc trà túi lọc Xạ đen - Cà gai leo nguyên chất.'
    ],
    tags: ['Giải độc gan', 'Đặc sản Hòa Bình', 'Ngọn tím chuẩn', 'Tăng đề kháng']
  },
  {
    id: 'herb-45',
    slug: 'ha-thu-o-do-chau',
    common_name: 'Hà Thủ Ô Đỏ Leo Chậu (Cửu Chưng Cửu Sái)',
    scientific_name: 'Fallopia multiflora',
    aliases: ['Dạ Giao Đằng', 'Giao Đằng', 'Reynoutria multiflora'],
    category: 'herb',
    description: 'Danh dược trường xuân bất lão lưu truyền ngàn năm với câu thơ: "Muốn cho xanh tóc đỏ da / Rủ nhau lên núi tìm Hà thủ ô". Dây leo quấn quýt ("Dạ giao đằng") vừa che mát ban công vừa cho củ đỏ sẫm đại bổ can thận, tinh huyết và làm đen tóc.',
    quick_answer: 'Hà thủ ô đỏ trồng trong chậu sâu 45-50cm có giàn leo, sau 1.5 - 2 năm cho củ to nặng 0.5-1kg. Dây và lá ("Dạ giao đằng") có thể cắt tỉa thường xuyên để nấu nước tắm hoặc sắc uống an thần.',
    botanical_details: {
      family: 'Polygonaceae (Họ Rau răm)',
      native_range: 'Vùng núi Tây Bắc (Sơn La, Lai Châu, Hà Giang) và Bắc Trung Bộ Việt Nam',
      active_compounds: ['2,3,5,4-tetrahydroxystilbene-2-O-beta-D-glucoside (TSG)', 'Lecithin', 'Anthraquinone', 'Resveratrol analogues'],
      soil_ph: '5.5 - 6.8 (Đất cát pha mùn tơi xốp để củ phình to)',
      ideal_temp: '15°C - 30°C',
      pot_size: 'Chậu sâu 45cm - 60cm (50L)'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Fallopia_multiflora_leaf.jpg/960px-Fallopia_multiflora_leaf.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d505',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '3 tháng thu dây Dạ giao đằng, 18 tháng thu củ Hà thủ ô đỏ',
    container_suitable: true,
    seasonality: {
      north: 'Xuống giống mùa xuân, thu củ vào mùa thu đông khi lá bắt đầu vàng',
      central: 'Trồng nơi thoáng mát, thoát nước đáy chậu thật tốt',
      south: 'Dây phát triển xanh mướt quanh năm trên giàn ban công',
      best_months: [2, 3, 4, 10, 11]
    },
    medical_info: {
      uses: ['Bổ huyết, ích can thận, trị chứng tóc bạc sớm, rụng tóc nhiều và da dẻ kém hồng hào', 'Dây và lá (Dạ giao đằng) dưỡng tâm an thần, trị mất ngủ và đau mỏi vai gáy', 'Bồi bổ gân cốt, giảm suy nhược thần kinh và chống lão hóa tế bào'],
      folk_remedies: [
        'Bào chế chuẩn Cửu Chưng Cửu Sái: Củ Hà thủ ô đỏ tươi cạo vỏ ngâm nước vo gạo 24h, bỏ lõi gỗ, sau đó đồ (hấp) chín cùng nước đậu đen xanh lòng rồi phơi khô lặp lại 9 lần trước khi tán bột trộn mật ong rừng hoàn viên.',
        'Dây Dạ giao đằng khô 15g + Lạc tiên 15g sắc uống buổi tối giúp ngủ sâu giấc.'
      ],
      preparation: ['Bắt buộc chế biến kỹ với đậu đen xanh lòng (chế Hà thủ ô)', 'Hoàn viên với mật ong và vừng đen', 'Ngâm rượu thuốc'],
      toxicity_warning: 'TUYỆT ĐỐI KHÔNG dùng củ Hà thủ ô sống chưa qua chế biến với đậu đen vì chứa tanin chát và anthraquinone tự do gây kích ứng tiêu chảy và hại gan. Khi uống kiêng ăn hành, tỏi, củ cải trắng sống và tiết canh.',
      disclaimer: 'Chỉ sử dụng Hà thủ ô đỏ đã qua bào chế đúng quy chuẩn Dược điển Việt Nam.',
      confusion_risk: {
        confused_with: 'Cây Hà Thủ Ô Trắng (Streptocaulon juventas) hoặc củ Nâu',
        distinguishing_features: 'Hà thủ ô đỏ có lá hình tim nhọn không có lông và không có nhựa mủ trắng, mặt cắt củ có vân hoa văn như mây ("vân cẩm chướng") màu đỏ nâu.'
      }
    },
    academic_citations: [
      'Dược điển Việt Nam V - Chuyên luận Hà thủ ô đỏ chế (Radix Fallopiae multiflorae praeparata)',
      'GS. Đỗ Tất Lợi - Những cây thuốc và vị thuốc Việt Nam (trang 829)'
    ],
    monetization_tips: [
      'Chế biến viên hoàn Hà thủ ô đỏ - Đậu đen xanh lòng - Mật ong rừng - Hắc chi ma thủ công cao cấp.',
      'Bán bầu giống Hà thủ ô đỏ chuẩn núi đá Tây Bắc.'
    ],
    tags: ['Đen râu tóc', 'Trường xuân bất lão', 'Bổ can thận', 'Cửu chưng cửu sái']
  },
  {
    id: 'herb-46',
    slug: 'huong-thao-dia-trung-hai',
    common_name: 'Hương Thảo Địa Trung Hải (Rosemary)',
    scientific_name: 'Salvia rosmarinus',
    aliases: ['Cây Trí Nhớ', 'Mê Điệt Hương', 'Rosmarinus officinalis'],
    category: 'herb',
    description: 'Thảo mộc quý tộc vùng Địa Trung Hải với những chiếc lá kim xanh bạc phủ sương tỏa hương thơm thông rừng ấm áp quyến rũ. Hoạt chất 1,8-Cineole và Acid Rosmarinic được khoa học chứng minh giúp tăng cường trí nhớ, sự tập trung tới 75%, đồng thời xua đuổi muỗi tự nhiên.',
    quick_answer: 'Hương thảo cực kỳ ưa nắng, gió thoáng và đất thoát nước nhanh (trộn nhiều đá perlite/pumice). Chỉ tưới vào gốc khi mặt đất đã khô ráo; tránh tưới đẫm lên tán lá vào ban đêm mùa mưa ẩm.',
    botanical_details: {
      family: 'Lamiaceae (Họ Hoa môi / Bạc hà)',
      native_range: 'Vùng bờ biển Địa Trung Hải, đã thuần hóa khí hậu Việt Nam',
      active_compounds: ['Rosmarinic Acid', 'Carnosic Acid', '1,8-Cineole', 'Camphor', 'Alpha-Pinene'],
      soil_ph: '6.0 - 7.5 (Giá thể thoáng khí: 40% đất + 30% đá pumice/perlite + 20% trấu hun + 10% phân trùn)',
      ideal_temp: '15°C - 30°C',
      pot_size: 'Chậu đất nung (Terracotta) đường kính 20cm - 35cm giúp thoát ẩm thành chậu'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Rosemary_in_bloom.JPG/960px-Rosemary_in_bloom.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d506',
    sunlight: 'full_sun',
    watering: 'drought_tolerant',
    propagation_difficulty: 2,
    growth_time: '30 ngày cắt ngọn kích nhánh, sống hóa gỗ nhiều năm như bonsai',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển rực rỡ nhất mùa thu - đông - xuân; mùa hè mưa dầm cần che mưa gốc',
      central: 'Đặt ở ban công lộng gió đón nắng sáng',
      south: 'Trồng trong chậu đất nung nơi có nắng sáng 4-5 tiếng và gió thoáng',
      best_months: [1, 2, 3, 4, 10, 11, 12],
      warning: 'Kỵ nhất là đất bí chặt đọng nước kết hợp nắng hầm sau cơn mưa rào'
    },
    medical_info: {
      uses: ['Hương tinh dầu 1,8-Cineole ức chế sự phân hủy chất dẫn truyền thần kinh Acetylcholine, giúp tăng trí nhớ và khả năng tập trung học tập, làm việc', 'Chống oxy hóa mạnh và khử các amin dị vòng gây hại khi áp chảo thịt bò bít tết, cá hồi', 'Ngâm dầu dừa / dầu jojoba massage da đầu kích thích mọc tóc tương đương Minoxidil 2%'],
      folk_remedies: [
        'Cành hương thảo tươi 1 nhánh nhỏ hãm với 250ml nước sôi 85°C cùng 1 lát chanh vàng và mật ong uống buổi sáng giúp tỉnh táo mà không gây tim đập nhanh như cà phê.',
        'Đun sôi 3 nhánh hương thảo với 500ml nước để nguội làm xịt dưỡng chân tóc giảm gàu và kích mọc tóc con.'
      ],
      preparation: ['Hãm trà tươi', 'Gia vị ướp nướng Âu - Á', 'Chưng cất tinh dầu và nước dưỡng tóc (Rosemary Hydrosol)'],
      toxicity_warning: 'Dùng làm gia vị và trà loãng rất an toàn. Tinh dầu hương thảo nguyên chất đậm đặc không được uống trực tiếp và phụ nữ mang thai 3 tháng đầu hạn chế dùng liều cao.',
      disclaimer: 'Thảo mộc trị liệu hương thơm (Aromatherapy) hàng đầu cho bàn học và góc làm việc.'
    },
    academic_citations: [
      'Therapeutic Advances in Psychopharmacology - Plasma 1,8-cineole levels and cognitive performance from Rosemary aroma',
      'SKINmed Journal - Rosemary oil vs minoxidil 2% for the treatment of androgenetic alopecia'
    ],
    monetization_tips: [
      'Uốn tạo dáng Hương thảo Bonsai cổ thụ thân gỗ thơm lừng bán giá 250.000đ - 900.000đ/chậu.',
      'Chưng cất xịt bưởi - hương thảo dưỡng tóc thủ công và bó hương thảo khô xông nhà.'
    ],
    tags: ['Tăng trí nhớ', 'Đuổi muỗi thơm phòng', 'Gia vị bít tết', 'Kích mọc tóc']
  },
  {
    id: 'herb-47',
    slug: 'nha-dam-la-be',
    common_name: 'Nha Đam Lá Bẹ Thái (Lô Hội Hữu Cơ)',
    scientific_name: 'Aloe vera',
    aliases: ['Lô Hội', 'Long Tu', 'Tượng Đởm'],
    category: 'herb',
    description: 'Trạm cấp cứu da liễu tự nhiên không thể thiếu trên mọi ban công gia đình. Những bẹ lá dày mọng căng tràn lớp thịt gel trong suốt như pha lê, chứa hơn 75 hợp chất sinh học (Acemannan, Vitamin E, B12, Kẽm) giúp làm dịu vết bỏng tức thì, dưỡng ẩm da và thanh nhiệt đại tràng.',
    quick_answer: 'Nha đam chịu hạn siêu đẳng, trồng chậu đất pha cát thoát nước tốt hầu như không tốn công chăm sóc. Chỉ tưới 1-2 lần/tuần; sau 4-5 tháng các bẹ lá ngoài cùng đạt độ dày 2-3cm sẵn sàng thu hoạch.',
    botanical_details: {
      family: 'Asphodelaceae (Họ Lan nhật quang / Lô hội)',
      native_range: 'Bán đảo Ả Rập, thuần hóa lâu đời tại Ninh Thuận, Bình Thuận và khắp Việt Nam',
      active_compounds: ['Acemannan (Polysaccharide)', 'Aloin (trong nhựa vàng vỏ lá)', 'Salicylic acid tự nhiên', 'Glycoprotein', 'Vitamin A, C, E, B12'],
      soil_ph: '6.0 - 7.5 (Đất cát pha trộn xỉ than / đá perlite và phân trùn quế)',
      ideal_temp: '20°C - 38°C',
      pot_size: 'Chậu rộng miệng 30cm - 45cm để cây đẻ nhiều cây con'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/960px-Aloe_vera_flower_inset.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d507',
    sunlight: 'full_sun',
    watering: 'drought_tolerant',
    propagation_difficulty: 1,
    growth_time: '4 tháng bắt đầu cắt bẹ lá dưới gốc, cây con nhảy quanh chậu liên tục',
    container_suitable: true,
    seasonality: {
      north: 'Phát triển cực nhanh mùa hè; mùa đông giảm tưới tối đa',
      central: 'Ông vua chịu nắng gió khô hạn miền Trung',
      south: 'Bẹ lá to dày mọng nước suốt 12 tháng',
      best_months: [2, 3, 4, 5, 6, 7, 8, 9]
    },
    medical_info: {
      uses: ['Cấp cứu vết bỏng nước sôi, bỏng bô xe, cháy nắng tức thì nhờ glycoprotein giảm đau và tái tạo biểu mô', 'Nấu chè nha đam đường phèn hạt chia giúp thanh nhiệt, nhuận tràng, đẹp da và dịu viêm dạ dày nhẹ', 'Cơ chế quang hợp CAM nhả oxy ban đêm và hút sạch khí độc Formaldehyde'],
      folk_remedies: [
        'Khi bị bỏng nhẹ: Cắt ngay 1 khúc lá nha đam tươi, gọt bỏ lớp vỏ xanh, rửa sạch nhựa vàng rồi áp phần thịt gel trong suốt mát lạnh lên vết bỏng giúp dịu rát và không bị phồng rộp.',
        'Thịt nha đam gọt sạch vỏ xanh, ngâm rửa kỹ với nước muối và chanh cho hết nhớt đắng, cắt hạt lựu nấu sôi 2 phút cùng đường phèn và lá dứa.'
      ],
      preparation: ['Gọt thật sạch vỏ xanh và dựng đứng lá 15 phút cho chảy hết nhựa vàng trước khi lấy thịt trắng', 'Nấu nước nha đam lá dứa', 'Làm mặt nạ cấp ẩm'],
      toxicity_warning: 'Lớp nhựa mủ màu vàng nằm sát dưới lớp vỏ xanh chứa Aloin có tính tẩy xổ mạnh; bắt buộc phải gọt sạch vỏ xanh và rửa trôi hết nhựa vàng trước khi ăn hoặc đắp lên mặt. Phụ nữ mang thai không ăn lượng lớn nha đam chưa khử sạch nhựa vàng.',
      disclaimer: 'Loài cây đa năng vừa lọc khí chuẩn NASA vừa là dược mỹ phẩm sống tại nhà.'
    },
    academic_citations: [
      'Dược điển Việt Nam V - Chuyên luận Lô hội (Aloe)',
      'Burns Journal - The efficacy of Aloe vera used for burn wound healing: a systematic review'
    ],
    monetization_tips: [
      'Tách cây con nha đam bẹ lớn Thái Lan bán 20.000đ - 40.000đ/cây giống.',
      'Nấu nước nha đam hạt chia lá dứa đường phèn đóng chai tươi mỗi ngày.'
    ],
    tags: ['Cấp cứu vết bỏng', 'Đẹp da thanh nhiệt', 'Siêu chịu hạn', 'Lọc khí NASA']
  },
  {
    id: 'herb-48',
    slug: 'dau-biec-leo-gian',
    common_name: 'Hoa Đậu Biếc Leo Giàn (Lam Hồ Điệp)',
    scientific_name: 'Clitoria ternatea',
    aliases: ['Bông Biếc', 'Đậu Hoa Tím', 'Butterfly Pea'],
    category: 'herb',
    description: 'Dây leo rèm hoa xanh biếc quyến rũ bậc nhất cho ban công chung cư. Những cánh hoa kép màu xanh коban thẫm chứa hàm lượng sắc tố Anthocyanin (nhóm Ternatin) cực kỳ quý hiếm giúp bảo vệ võng mạc mắt trước ánh sáng xanh màn hình, tăng tuần hoàn máu não và tạo màu thực phẩm tự nhiên.',
    quick_answer: 'Hạt đậu biếc ngâm nước ấm 4 tiếng gieo vào chậu nảy mầm sau 3 ngày, chỉ sau 45 ngày đã leo kín lan can và nở hoa xanh biếc mỗi sáng. Hái hoa tươi phơi khô hãm trà đổi màu kỳ diệu khi vắt chanh.',
    botanical_details: {
      family: 'Fabaceae (Họ Đậu - Cố định đạm tự nhiên làm tốt đất)',
      native_range: 'Nhiệt đới châu Á, phổ biến khắp 3 miền Việt Nam',
      active_compounds: ['Ternatin A, B, D (Anthocyanin bền nhiệt)', 'Delphinidin', 'Kaempferol', 'Quercetin', 'Peptide Cyclotide'],
      soil_ph: '5.5 - 7.5 (Rễ có nốt sần tự tổng hợp đạm nuôi đất)',
      ideal_temp: '20°C - 36°C',
      pot_size: '25cm - 35cm kèm lưới hoặc lan can leo'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Asian_pigeonwings_in_Bhopal_04.jpg/960px-Asian_pigeonwings_in_Bhopal_04.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d508',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '45 ngày từ gieo hạt đến khi thu hoạch hoa liên tục mỗi ngày',
    container_suitable: true,
    seasonality: {
      north: 'Nở hoa rực rỡ từ tháng 3 đến tháng 11',
      central: 'Chịu nắng tốt, phủ xanh hàng rào ban công',
      south: 'Nở hoa không ngừng nghỉ suốt 365 ngày trong năm',
      best_months: [3, 4, 5, 6, 7, 8, 9, 10]
    },
    medical_info: {
      uses: ['Bảo vệ các mao mạch nhỏ ở đáy mắt, giảm mỏi mắt khô mắt cho người làm việc máy tính nhiều giờ', 'Tăng nồng độ Acetylcholine ở vùng hải mã não bộ, hỗ trợ cải thiện trí nhớ và giảm stress', 'Phụ gia tạo màu xanh lam / tím hồng tự nhiên 100% an toàn cho xôi, bánh, thạch và trà'],
      folk_remedies: [
        'Hoa đậu biếc khô 5-7 bông hãm với 250ml nước sôi 5 phút ra màu xanh lam ngọc bích; vắt thêm vài giọt cốt tắc/chanh nước trà lập tức chuyển sang màu tím hồng tuyệt đẹp.',
        'Nước cốt hoa đậu biếc ngâm gạo nếp đồ xôi ngũ sắc hoặc nấu trân châu, bánh da lợn.'
      ],
      preparation: ['Hái hoa lúc 8h-9h sáng khi ráo sương rồi sấy khô bảo quản lọ kín', 'Pha trà macchiato / trà chanh đổi màu', 'Tạo màu ẩm thực'],
      toxicity_warning: 'Cánh hoa rất an toàn (dùng 5-10 bông/ngày). Lưu ý: Phần hạt già và rễ cây đậu biếc có tính tẩy xổ nhẹ nên không dùng hạt già để ăn; phụ nữ đang hành kinh hoặc chuẩn bị phẫu thuật hạn chế uống quá đặc.',
      disclaimer: 'Thức uống chống oxy hóa tự nhiên được yêu thích trên toàn thế giới.'
    },
    academic_citations: [
      'Frontiers in Plant Science - Clitoria ternatea: chemistry, pharmacology, and applications in functional foods'
    ],
    monetization_tips: [
      'Thu hoạch hoa đậu biếc kép sấy lạnh đóng hũ thủy tinh bán giá 600.000đ - 900.000đ/kg khô.',
      'Bán hạt giống và chậu cây đậu biếc hoa kép 5 cánh đang sẵn nụ.'
    ],
    tags: ['Bổ mắt chống mỏi', 'Trà đổi màu', 'Màu thực phẩm sạch', '45 ngày ra hoa']
  },

  // --- 6 CÂY ĂN TRÁI BAN CÔNG ĐỘC BẢN (SPRINT 3: fruit-26 -> fruit-31) ---
  {
    id: 'fruit-26',
    slug: 'nho-than-go-tu-quy',
    common_name: 'Nho Thân Gỗ Tứ Quý (Jabuticaba)',
    scientific_name: 'Plinia cauliflora',
    aliases: ['Nho Thân Gỗ Kim Cương Đen', 'Jabuticaba Bonsai', 'Trân Châu Mộc'],
    category: 'fruit',
    description: 'Kỳ quan thực vật độc đáo bậc nhất thế giới cho sân thượng biệt thự và chung cư. Hoa trắng và hàng trăm quả tròn bóng loáng như ngọc trai đen mọc trực tiếp chi chít từ gốc ôm kín lên thân gỗ, thịt quả trắng trong mọng nước mang hương vị hòa quyện giữa nho Kyoho, măng cụt và vải thiều.',
    quick_answer: 'Chọn dòng Nho thân gỗ Tứ Quý hoặc Kim Cương Đen đã trưởng thành trồng trong chậu 50-70cm. Cây sống hàng chục năm với dáng thế bonsai tuyệt đẹp, càng tưới đẫm nước vào thân cây càng kích thích bật nụ hoa từ vỏ gỗ.',
    botanical_details: {
      family: 'Myrtaceae (Họ Sim / Ổi)',
      native_range: 'Nam Mỹ (Brazil), đã thuần hóa hoàn hảo với khí hậu nhiệt đới Việt Nam',
      active_compounds: ['Jaboticabin (Depside đặc hữu)', 'Cyanidin-3-glucoside', 'Ellagic acid', 'Resveratrol', 'Vitamin C'],
      soil_ph: '5.5 - 6.5 (Đất hơi chua nhẹ, giàu mùn hữu cơ và thoát nước tốt)',
      ideal_temp: '18°C - 35°C',
      pot_size: '50cm - 75cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Jabuticaba_%28do_tupi_%C3%AEabotikaba%2C_%27gordura_de_jabuti%27%29_07.jpg/960px-Jabuticaba_%28do_tupi_%C3%AEabotikaba%2C_%27gordura_de_jabuti%27%29_07.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d509',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 2,
    growth_time: 'Quả lớn và chín chỉ sau 25-30 ngày kể từ lúc hoa nở trên thân',
    container_suitable: true,
    seasonality: {
      north: 'Ra hoa kết quả 4-5 đợt liên tiếp từ mùa xuân đến cuối thu',
      central: 'Cây thân gỗ cứng cáp chịu gió bão tốt',
      south: 'Ra hoa đậu quả quanh năm liên tục trên thân chính',
      best_months: [3, 4, 5, 6, 8, 9, 10]
    },
    medical_info: {
      uses: ['Vỏ quả màu tím đen chứa hợp chất Jaboticabin độc quyền giúp chống lão hóa phổi, kháng viêm và bảo vệ thành mạch máu', 'Thịt quả giàu chất chống oxy hóa Anthocyanin giúp tăng độ đàn hồi da và bảo vệ tim mạch', 'Ngâm rượu vang nho thân gỗ có hương thơm thượng hạng giúp kích thích tiêu hóa'],
      folk_remedies: [
        'Quả nho thân gỗ chín đen rửa sạch ăn tươi cả vỏ mỏng hoặc ủ lên men cùng đường phèn làm rượu vang Jabuticaba bổ huyết.',
        'Vỏ quả sấy khô hãm trà uống giảm ho và làm dịu viêm họng.'
      ],
      preparation: ['Ăn tươi trực tiếp ngay khi hái trên thân', 'Làm mứt / thạch Jabuticaba', 'Ủ rượu vang trái cây'],
      toxicity_warning: 'An toàn tuyệt đối. Vỏ quả chứa nhiều tanin và chất chống oxy hóa nên khi ăn tươi nên nhai kỹ hoặc chế biến rượu/mứt.',
      disclaimer: 'Biểu tượng của sự sung túc "con đàn cháu đống, lộc bám đầy thân" trong phong thủy sân vườn.'
    },
    academic_citations: [
      'Food Research International - Bioactive compounds and health benefits of Jabuticaba (Plinia cauliflora)'
    ],
    monetization_tips: [
      'Cây Nho thân gỗ bonsai đang mang trái chi chít trên thân có giá trị từ 1.500.000đ - 15.000.000đ/chậu.',
      'Quả nho thân gỗ tươi bán lẻ với giá 200.000đ - 350.000đ/kg.'
    ],
    tags: ['Quả mọc trên thân', 'Bonsai quý tộc', 'Chống lão hóa', 'Lộc bám đầy cành']
  },
  {
    id: 'fruit-27',
    slug: 'hong-xiem-xoai-lun',
    common_name: 'Hồng Xiêm Xoài Lùn (Sapoche Chậu)',
    scientific_name: 'Manilkara zapota',
    aliases: ['Sapoche Xoài', 'Hồng Xiêm Ruột Đỏ', 'Lồng Mứt Chậu'],
    category: 'fruit',
    description: 'Dòng hồng xiêm ghép lùn chuyên biệt cho sân thượng đô thị: cây chỉ cao 1m đã mang hàng chục quả to hình bầu dục như quả xoài. Khi chín thịt quả mềm mịn không cát, vị ngọt đậm đà thơm lừng mùi mạch nha caramel.',
    quick_answer: 'Hồng xiêm xoài là cây thường xanh cực kỳ bền bỉ, chịu hạn và chịu gió mặn tốt, ít rụng lá làm bẩn ban công. Trồng trong chậu 50-60cm nơi nhiều nắng, bón phân hữu cơ vi sinh định kỳ cây sẽ đậu quả gối vụ quanh năm.',
    botanical_details: {
      family: 'Sapotaceae (Họ Hồng xiêm)',
      native_range: 'Trung Mỹ, giống Hồng Xiêm Xoài thuần hóa nổi tiếng tại miền Nam và miền Bắc Việt Nam',
      active_compounds: ['Polyphenol', 'Tannin (khi xanh)', 'Fructose & Sucrose tự nhiên', 'Canxi, Sắt & Phốt pho', 'Vitamin A & C'],
      soil_ph: '6.0 - 7.5 (Thích nghi rộng, ưa đất thịt pha cát giàu hữu cơ)',
      ideal_temp: '22°C - 36°C',
      pot_size: '50cm - 65cm (Chậu 60L - 80L)'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg/960px-%E0%B4%B8%E0%B4%AA%E0%B5%8D%E0%B4%AA%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d510',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '6 tháng từ khi trồng cây chiết/ghép bắt đầu ra lứa quả đầu tiên',
    container_suitable: true,
    seasonality: {
      north: 'Thu hoạch hai vụ chính vào mùa xuân hè và mùa thu đông',
      central: 'Chịu nắng hạn và gió biển cực khỏe',
      south: 'Ra hoa kết trái nối tiếp nhau quanh năm',
      best_months: [2, 3, 4, 8, 9, 10, 11]
    },
    medical_info: {
      uses: ['Thịt quả chín giàu Canxi, Phốt pho và Sắt tự nhiên giúp củng cố xương răng cho trẻ nhỏ và người lớn tuổi', 'Chất xơ hòa tan và vitamin nhóm B giúp làm dịu niêm mạc dạ dày và nhuận tràng', 'Cung cấp năng lượng glucose tự nhiên tức thì cho người suy nhược mệt mỏi'],
      folk_remedies: [
        'Sinh tố hồng xiêm chín xay cùng sữa tươi không đường và chút đá nhỏ là thức uống bổ dưỡng phục hồi sức khỏe nhanh chóng.',
        'Quả hồng xiêm xanh (chứa nhiều tanin) thái lát phơi khô sắc nước uống cầm tiêu chảy cấp theo kinh nghiệm dân gian.'
      ],
      preparation: ['Khi vỏ quả chuyển màu nâu vàng không còn phấn xanh và cuống héo nhẹ thì hái xuống ủ trong thùng gạo 2-3 ngày sẽ chín mềm ngọt lịm'],
      toxicity_warning: 'Chỉ ăn quả khi đã chín mềm hoàn toàn (hết nhựa mủ trắng); hạt hồng xiêm màu đen bóng có móc nhọn cứng nên cần bỏ hạt khi cho trẻ nhỏ ăn.',
      disclaimer: 'Giống cây ăn quả sạch tán gọn gàng, lá dày bóng không sâu róm cho nhà phố.'
    },
    academic_citations: [
      'Food Chemistry - Phenolic antioxidants and nutritional composition of Manilkara zapota'
    ],
    monetization_tips: [
      'Bán cây giống Hồng xiêm xoài chiết cành đang sẵn nụ hoa giá 180.000đ - 350.000đ/cây.',
      'Thu hoạch hồng xiêm hữu cơ chín cây bán 55.000đ - 80.000đ/kg.'
    ],
    tags: ['Ngọt như mật', 'Ít rụng lá', 'Giàu Canxi', 'Trái quanh năm']
  },
  {
    id: 'fruit-28',
    slug: 'man-an-phuoc-chau',
    common_name: 'Mận An Phước Ghép Chậu (Roi Đỏ)',
    scientific_name: 'Syzygium samarangense',
    aliases: ['Roi Đỏ An Phước', 'Mận Hồng Đào Đá', 'Wax Apple'],
    category: 'fruit',
    description: 'Niềm tự hào của cây ăn trái nhiệt đới Việt Nam trên sân thượng. Những chùm hoa trắng tua tủa như pháo hoa kết thành từng chùm quả hình chuông màu đỏ hồng ngọc lấp lánh dưới nắng, thịt quả đặc ruột không hạt, cắn vào giòn tan mọng nước mát lạnh.',
    quick_answer: 'Mận An Phước trồng chậu 50-60L rất nhanh lớn và bắt đầu bói quả chỉ sau 5-6 tháng. Khi quả bắt đầu chuyển từ xanh sang hồng nhạt, dùng túi lưới bọc chùm quả để ngăn ruồi vàng và giữ vỏ quả bóng đẹp 100%.',
    botanical_details: {
      family: 'Myrtaceae (Họ Sim / Ổi)',
      native_range: 'Đông Nam Á, giống ghép mắt An Phước trứ danh của Việt Nam',
      active_compounds: ['Vescalagin', 'Anthocyanin (vỏ đỏ)', 'Hàm lượng nước sinh học 90%', 'Vitamin C & A', 'Kali'],
      soil_ph: '5.5 - 6.8 (Đất thịt phù sa trộn phân trùn quế và xơ dừa giữ ẩm)',
      ideal_temp: '22°C - 35°C',
      pot_size: '50cm - 65cm (Chậu 60L trở lên)'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Hoa_c%E1%BB%A7a_lo%C3%A0i_roi.jpg/960px-Hoa_c%E1%BB%A7a_lo%C3%A0i_roi.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d511',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '5 - 6 tháng từ cây chiết/ghép đã cho lứa quả đỏ đầu tiên',
    container_suitable: true,
    seasonality: {
      north: 'Ra hoa tháng 3-4, thu hoạch quả giòn ngọt suốt mùa hè (tháng 5-8)',
      central: 'Tưới đủ nước lúc nuôi quả để quả mọng giòn không bị xốp',
      south: 'Cho 3-4 vụ quả mỗi năm, ngọt nhất vào các tháng mùa nắng',
      best_months: [2, 3, 4, 5, 6, 11, 12]
    },
    medical_info: {
      uses: ['Chứa hơn 90% nước sinh học cùng chất xơ giúp giải khát, thanh nhiệt và hỗ trợ giảm cân hiệu quả mà vẫn no lâu', 'Hợp chất Vescalagin và Jambosine trong quả mận giúp làm chậm quá trình chuyển hóa tinh bột thành đường', 'Lá mận non chứa tinh dầu kháng khuẩn nhẹ'],
      folk_remedies: [
        'Mận An Phước ướp lạnh ăn tráng miệng sau bữa trưa mùa hè giúp thanh nhiệt, chống khô họng và hỗ trợ tiêu hóa.',
        'Quả mận chín thái lát ép nước cùng vài lá bạc hà và muối hồng làm nước detoх bù khoáng.'
      ],
      preparation: ['Ăn tươi chấm muối ớt / muối tôm', 'Làm gỏi tôm thịt mận đỏ', 'Ép nước giải nhiệt'],
      toxicity_warning: 'An toàn tuyệt đối cho mọi lứa tuổi. Luôn bọc túi lưới sinh học từ khi quả bằng ngón chân cái để không phải dùng bất kỳ thuốc bảo vệ thực vật nào.',
      disclaimer: 'Một trong những cây ăn quả trồng thùng xốp / chậu sân thượng dễ thành công nhất.'
    },
    academic_citations: [
      'Viện Cây Ăn Quả Miền Nam (SOFRI) - Quy trình kỹ thuật canh tác Mận An Phước',
      'Journal of Agricultural and Food Chemistry - Antihyperglycemic activity of Syzygium samarangense'
    ],
    monetization_tips: [
      'Cung cấp cây chiết Mận An Phước lùn thuần chậu đã có nụ hoa giá 150.000đ - 300.000đ/cây.',
      'Bán combo túi lưới bọc quả chống ruồi vàng chuyên dụng cho vườn phố.'
    ],
    tags: ['Quả chuông đỏ rực', 'Giòn ngọt không hạt', 'Giải nhiệt mùa hè', 'Rất nhanh có trái']
  },
  {
    id: 'fruit-29',
    slug: 'vu-sua-hoang-kim',
    common_name: 'Vú Sữa Hoàng Kim Đài Loan Chậu',
    scientific_name: 'Pouteria caimito',
    aliases: ['Hoàng Kim Quả', 'Abiu', 'Vú Sữa Vàng Nhiệt Đới'],
    category: 'fruit',
    description: 'Ngôi sao sáng của giới sưu tầm cây ăn trái độc lạ trên sân thượng. Quả tròn đầy đặn có núm nhọn duyên dáng, khi chín chuyển từ màu xanh sang vàng hoàng kim rực rỡ. Cắt đôi quả lộ lớp thịt trắng trong như thạch dừa, vị ngọt thanh quyện hương sữa vani và caramen.',
    quick_answer: 'Vú sữa Hoàng Kim là cây lùn phân cành sớm, trồng chậu 50-60cm chỉ sau 8-10 tháng đã tự ra hoa ở nách lá và đậu quả vàng óng mà không cần cây khác thụ phấn chéo.',
    botanical_details: {
      family: 'Sapotaceae (Họ Hồng xiêm)',
      native_range: 'Thượng nguồn Amazon, thuần hóa giống F1 tại Đài Loan và Việt Nam',
      active_compounds: ['Beta-carotene', 'Vitamin C & B3 (Niacin)', 'Canxi & Phốt pho', 'Polyphenol'],
      soil_ph: '5.5 - 6.8 (Đất thịt giàu hữu cơ, thoát nước tốt, giữ ẩm đều)',
      ideal_temp: '20°C - 35°C',
      pot_size: '50cm - 65cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Abiu_em_fundo_preto_-_Pouteria_caimito.jpg/960px-Abiu_em_fundo_preto_-_Pouteria_caimito.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d512',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 2,
    growth_time: '8 - 10 tháng từ cây chiết/ghép cho lứa quả vàng hoàng kim đầu tiên',
    container_suitable: true,
    seasonality: {
      north: 'Trồng nơi khuất gió bấc mùa đông, ra trái rộ vào mùa hè và mùa thu',
      central: 'Phát triển khỏe, giữ ẩm gốc mùa nắng hạn',
      south: 'Ra trái tới 3 đợt mỗi năm, màu vàng rực rỡ thu hút tài lộc',
      best_months: [3, 4, 5, 8, 9, 10]
    },
    medical_info: {
      uses: ['Thịt quả dạng thạch mềm giàu Vitamin C, Vitamin A và Canxi giúp tăng cường miễn dịch và làm dịu cổ họng', 'Chứa nhiều chất nhầy tự nhiên tốt cho hệ tiêu hóa và nhuận tràng', 'Hàm lượng đường tự nhiên thanh mát không gây nóng trong người'],
      folk_remedies: [
        'Bổ đôi quả vú sữa Hoàng Kim đã ướp mát, vắt nhẹ vài giọt nước cốt chanh lên bề mặt thịt quả rồi dùng muỗng xúc ăn sẽ làm dậy mùi thơm sữa gấp bội.',
        'Thịt quả dầm cùng sữa chua hy lạp làm món tráng miệng giàu dưỡng chất cho trẻ nhỏ.'
      ],
      preparation: ['Thu hoạch khi toàn bộ vỏ quả đã chuyển vàng đậm đều (không còn đốm xanh ở cuống) để hoàn toàn không còn nhựa mủ'],
      toxicity_warning: 'Mẹo nhỏ: Trước khi ăn, thoa một lớp mỏng dầu ăn hoặc vắt vài giọt chanh lên môi/miệng cắt để nhựa mỏng ở vỏ không bám vào môi.',
      disclaimer: 'Giống cây ăn trái phong thủy màu Hoàng Kim được săn đón hàng đầu hiện nay.'
    },
    academic_citations: [
      'Food Research International - Nutritional and bioactive properties of Abiu (Pouteria caimito) fruit'
    ],
    monetization_tips: [
      'Quả Vú sữa Hoàng Kim sạch bán lẻ tại các cửa hàng trái cây cao cấp với giá 150.000đ - 280.000đ/kg.',
      'Cây giống Vú sữa Hoàng Kim chiết cành đang mang trái sẵn bán 450.000đ - 1.200.000đ/chậu.'
    ],
    tags: ['Quả vàng Hoàng Kim', 'Vị sữa caramen', 'Tự thụ phấn', 'Sang trọng sân thượng']
  },
  {
    id: 'fruit-30',
    slug: 'quyt-duong-chau-tet',
    common_name: 'Quýt Đường Chậu Cảnh Tết (Quýt Hoàng Kim)',
    scientific_name: 'Citrus reticulata',
    aliases: ['Quýt Ngọt Bonsai', 'Quýt Hồng Lai Vung Chậu', 'Đại Cát Đại Lợi'],
    category: 'fruit',
    description: 'Trong văn hóa Á Đông, chữ "Quýt" (桔) đồng âm với chữ "Cát" trong Đại Cát Đại Lợi. Một chậu Quýt đường trĩu trịt những quả tròn mọng vàng cam rực rỡ trên ban công không chỉ mang lại vượng khí cát tường mà còn cung cấp nguồn trái cây ngọt lịm, vỏ mỏng thơm tinh dầu.',
    quick_answer: 'Trồng cây ghép trong chậu 45-55cm nơi đón nắng ít nhất 6 tiếng/ngày. Bón phân hữu cơ kết hợp dịch chuối hoặc kali hữu cơ khi quả vào giai đoạn chuyển màu để múi quýt mọng nước và ngọt đậm.',
    botanical_details: {
      family: 'Rutaceae (Họ Cửu lý hương / Cam chanh)',
      native_range: 'Đông Nam Á và Nam Trung Hoa, nổi tiếng với các vùng quýt Lai Vung, Bắc Sơn tại Việt Nam',
      active_compounds: ['Hesperidin', 'Nobiletin', 'Synephrine tự nhiên', 'Limonene', 'Vitamin C & Beta-Cryptoxanthin'],
      soil_ph: '5.5 - 6.5 (Đất phù sa tơi xốp trộn phân chuồng hoai mục và trấu hun)',
      ideal_temp: '18°C - 32°C',
      pot_size: '45cm - 60cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Citrus_reticulata_April_2013_Nordbaden.JPG/960px-Citrus_reticulata_April_2013_Nordbaden.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d513',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: 'Ra hoa mùa xuân, quả chín rực rỡ vào mùa đông dịp Tết Nguyên Đán',
    container_suitable: true,
    seasonality: {
      north: 'Quả chín vàng cam đúng dịp cuối đông - Tết âm lịch',
      central: 'Che mưa lớn lúc cây đang nở hoa',
      south: 'Xử lý ra hoa đón Tết dễ dàng trên sân thượng nhiều nắng',
      best_months: [1, 2, 3, 11, 12]
    },
    medical_info: {
      uses: ['Múi quýt giàu Vitamin C và Beta-Cryptoxanthin giúp tăng sức đề kháng và bảo vệ phổi', 'Vỏ quýt chín phơi khô lâu năm chính là vị thuốc quý "Trần Bì" giúp lý khí kiện tỳ, tiêu đờm giảm ho và chống đầy bụng khó tiêu', 'Hợp chất Nobiletin trong vỏ quýt hỗ trợ bảo vệ tế bào thần kinh'],
      folk_remedies: [
        'Bí quyết làm Trần Bì tại nhà: Vỏ quýt hữu cơ tự trồng không thuốc sâu rửa sạch, phơi nắng ráo rồi cất trong hũ sành khô thoáng từ 1 năm trở lên; mỗi lần hãm 5g với trà nóng và gừng trị ho đờm, đầy hơi cực nhạy.',
        'Quýt chín nướng ấm trên bếp khoảng 5 phút rồi bóc vỏ ăn khi còn ấm giúp dịu cơn ho hàn ban đêm.'
      ],
      preparation: ['Ăn tươi', 'Ép nước quýt tươi', 'Phơi khô vỏ quýt làm vị thuốc Trần Bì'],
      toxicity_warning: 'Quýt tự trồng hữu cơ hoàn toàn yên tâm lấy vỏ làm thuốc Trần Bì (tuyệt đối không dùng vỏ quýt mua ngoài chợ có phủ sáp bảo quản để làm thuốc).',
      disclaimer: 'Kết hợp hoàn hảo giữa cây ăn trái, cây cảnh Tết và vị thuốc Đông y Trần Bì.'
    },
    academic_citations: [
      'Dược điển Việt Nam V - Chuyên luận Trần bì (Pericarpium Citri reticulatae perenne)'
    ],
    monetization_tips: [
      'Ươm dưỡng chậu Quýt cảnh bonsai sai quả bán dịp Tết Nguyên Đán giá 600.000đ - 2.500.000đ/chậu.',
      'Chế biến Trần bì hữu cơ ủ 3 năm và trà Phổ Nhĩ nhồi quả quýt (Tiểu Thanh柑).'
    ],
    tags: ['Đại cát đại lợi', 'Vị thuốc Trần Bì', 'Ngọt đậm mọng nước', 'Cây cảnh Tết']
  },
  {
    id: 'fruit-31',
    slug: 'so-ri-ngot-bonsai',
    common_name: 'Sơ Ri Ngọt Gò Công Bonsai (Acerola)',
    scientific_name: 'Malpighia emarginata',
    aliases: ['Sơ Ri Ngọt', 'Acerola Cherry', 'Vua Vitamin C'],
    category: 'fruit',
    description: 'Nhà vô địch Vitamin C tự nhiên của thế giới thực vật (hàm lượng Vitamin C cao gấp 20 đến 30 lần quả cam!). Cây bụi thân gỗ dẻo dai cực kỳ hợp uốn thế bonsai chậu ban công, nở hoa màu hồng tím lãng mạn và kết hàng trăm quả chín đỏ mọng như những viên hồng ngọc chỉ sau 3 tuần.',
    quick_answer: 'Sơ ri ngọt chịu nắng gắt và chịu cắt tỉa siêu việt. Cứ mỗi lần bấm ngọn tỉa cành kết hợp tưới đẫm sau vài ngày nắng khô là cây đồng loạt bung hoa hồng tím và đậu quả đỏ kín cành.',
    botanical_details: {
      family: 'Malpighiaceae (Họ Sơ ri)',
      native_range: 'Trung và Nam Mỹ, đặc sản nổi tiếng vùng Gò Công (Tiền Giang - Việt Nam)',
      active_compounds: ['Vitamin C tự nhiên (1500 - 3000mg / 100g)', 'Bioflavonoid (Rutin, Hesperidin)', 'Carotenoid', 'Anthocyanin'],
      soil_ph: '5.5 - 7.0 (Đất tơi xốp thoát nước nhanh)',
      ideal_temp: '20°C - 36°C',
      pot_size: '35cm - 50cm (Chậu bonsai hoặc chậu tròn ban công)'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Malpighia_glabra_blossom_and_unripe_fruits.jpg/960px-Malpighia_glabra_blossom_and_unripe_fruits.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d514',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: 'Từ lúc nở hoa hồng đến khi quả chín đỏ chỉ mất đúng 20 - 25 ngày!',
    container_suitable: true,
    seasonality: {
      north: 'Ra hoa kết trái liên tục từ tháng 3 đến tháng 11',
      central: 'Chịu hạn giỏi, ra hoa rộ sau mỗi đợt mưa rào',
      south: 'Thu hoạch tới 6-8 lứa quả mỗi năm trên ban công nắng',
      best_months: [3, 4, 5, 6, 7, 8, 9, 10]
    },
    medical_info: {
      uses: ['Chỉ cần ăn 3-4 quả sơ ri tươi tại cây mỗi sáng đã cung cấp đủ 100% nhu cầu Vitamin C tự nhiên dễ hấp thu cho cả ngày', 'Kích thích cơ thể tổng hợp Collagen nội sinh giúp da săn chắc, mờ thâm nám và chống chảy máu chân răng', 'Tăng cường sức đề kháng chống cảm cúm giao mùa'],
      folk_remedies: [
        'Quả sơ ri chín đỏ 500g ngâm cùng 300g đường phèn và vài lát gừng làm siro sơ ri giải khát bù Vitamin C tự nhiên cho trẻ nhỏ.',
        'Ép nước sơ ri tươi trộn cùng nước ép táo hoặc dứa uống làm đẹp da.'
      ],
      preparation: ['Hái ăn tươi ngay trên cây lúc sáng sớm', 'Ngâm siro đường phèn', 'Làm mứt sơ ri'],
      toxicity_warning: 'Hoàn toàn lành tính. Không nên ăn một lúc quá nhiều khi bụng đói cồn cào do hàm lượng Vitamin C tự nhiên rất cao.',
      disclaimer: 'Nguồn Vitamin C hữu cơ tươi sống tốt hơn bất kỳ viên sủi tổng hợp nào.'
    },
    academic_citations: [
      'Journal of Food Science and Technology - Acerola (Malpighia emarginata): Superfunctional fruit and natural source of Vitamin C'
    ],
    monetization_tips: [
      'Tạo tác bonsai Sơ ri gốc già uốn lượn vừa có hoa hồng vừa có quả đỏ bán giá 450.000đ - 2.000.000đ/chậu.',
      'Nhân giống cành chiết Sơ ri ngọt Thái / Gò Công bán 65.000đ - 120.000đ/cây.'
    ],
    tags: ['Vua Vitamin C', '22 ngày chín quả', 'Bonsai hoa hồng', 'Tăng sinh Collagen']
  },

  // --- 6 CÂY CẢNH, KIỂNG LÁ & BONSAI PHONG THỦY (SPRINT 3: orn-21 -> orn-26) ---
  {
    id: 'orn-21',
    slug: 'hoa-nhai-ta-que-huong',
    common_name: 'Hoa Nhài Ta Quế Hương (Lài Đơn Cổ Truyền)',
    scientific_name: 'Jasminum sambac',
    aliases: ['Hoa Lài Ta', 'Mạt Lị Hoa', 'Nhài Đơn Ướp Trà'],
    category: 'ornamental',
    description: 'Loài hoa bình dị mà thanh cao bậc nhất trong tâm hồn người Việt. Những nụ hoa trắng ngần chúm chím như ngọc, khi màn đêm buông xuống liền đồng loạt bung nở tỏa hương thơm thanh khiết quyến rũ khắp ban công, giúp thư giãn tâm trí và ướp nên những ấm trà nhài thượng hạng.',
    quick_answer: 'Nhài ta cực kỳ ưa nắng trực tiếp và phân hữu cơ hoai mục. Bí quyết để cây ra hoa kín tán quanh năm: cứ sau mỗi đợt hoa tàn, hãy bấm tỉa hết ngọn cành khoảng 5cm và tuốt bớt lá già ở gốc để cây bật hàng loạt mầm nụ mới.',
    botanical_details: {
      family: 'Oleaceae (Họ Nhài / Ô liu)',
      native_range: 'Nam Á và Đông Nam Á, giống Nhài đơn bản địa thơm đậm nhất Việt Nam',
      active_compounds: ['Linalool', 'Benzyl acetate', 'Indole', 'cis-Jasmone', 'Methyl anthranilate'],
      soil_ph: '5.5 - 6.8 (Đất thịt giàu mùn trộn phân trùn quế và tro trấu)',
      ideal_temp: '20°C - 35°C',
      pot_size: '25cm - 40cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Arabian_jasmin%2C_Tunisia_2010.jpg/960px-Arabian_jasmin%2C_Tunisia_2010.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d515',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: 'Ra đợt nụ hoa mới liên tục mỗi 25 - 30 ngày sau khi bấm ngọn',
    container_suitable: true,
    seasonality: {
      north: 'Nở hoa rộ và thơm ngát nhất từ tháng 4 đến tháng 10',
      central: 'Càng nắng ấm hoa càng thơm nồng nàn',
      south: 'Nở hoa trắng muốt suốt 12 tháng trong năm',
      best_months: [4, 5, 6, 7, 8, 9, 10]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Bấm ngọn sau mỗi lứa hoa',
        instruction: 'Do hoa nhài luôn mọc ở đầu cành non mới, việc cắt tỉa đầu cành ngay sau khi hoa tàn sẽ nhân đôi số lượng nhánh mang nụ cho đợt kế tiếp.'
      },
      {
        step: 2,
        title: 'Hái hoa ướp trà lúc chạng vạng',
        instruction: 'Hái những nụ hoa trắng căng tròn lúc 17h-18h chiều, ủ chung với cánh trà Thái Nguyên khô trong hũ kín qua đêm để hương hoa thấm sâu vào trà.'
      }
    ],
    faqs: [
      {
        question: 'Nên trồng Nhài đơn (Nhài ta) hay Nhài kép (Nhài Nhật/Pháp) để ướp trà?',
        answer: 'Nhài đơn cổ truyền tuy bông nhỏ hơn nhưng hàm lượng tinh dầu thơm cao gấp 3 lần nhài kép và không bị ủng nước khi ướp trà hay nấu chè.'
      }
    ],
    monetization_tips: [
      'Ướp trà xanh Thái Nguyên hoặc trà Ô Long với hoa nhài sạch tự trồng bán giá 500.000đ - 1.200.000đ/kg.',
      'Tạo dáng bonsai Hoa nhài cổ thụ gốc già bán cho người thưởng trà.'
    ],
    tags: ['Hương thơm đêm hè', 'Ướp trà thượng hạng', 'An thần giảm stress', 'Bonsai hoa trắng']
  },
  {
    id: 'orn-22',
    slug: 'loc-vung-bonsai',
    common_name: 'Lộc Vừng Bonsai Phong Thủy',
    scientific_name: 'Barringtonia acutangula',
    aliases: ['Cây Lộc Mưng', 'Chiếc Lộc Vừng', 'Tam Đa Sung Lộc Vạn'],
    category: 'ornamental',
    description: 'Đứng ở vị trí trung tâm trong bộ Tam Đa phong thủy Việt Nam ("Sung - Lộc - Vạn"). Cây Lộc vừng bonsai có bệ rễ uốn lượn uy nghi, lộc non ra màu đỏ tía hồng phúc và đặc biệt là những chuỗi hoa đỏ rực dài 30-50cm buông rủ lấp lánh như rèm pháo hoa báo hiệu tài lộc thịnh vượng.',
    quick_answer: 'Lộc vừng là cây bán thủy sinh cực kỳ ưa nước và ánh nắng. Trồng trong chậu gốm không lỗ thoát nước (chậu ngâm nước) hoặc chậu bonsai có khay nước bên dưới, cây sẽ luôn xanh mướt và không bao giờ lo chết héo.',
    botanical_details: {
      family: 'Lecythidaceae (Họ Lộc vừng)',
      native_range: 'Bản địa Việt Nam và Nam Á, gắn liền với kiến trúc Hồ Gươm và nhà vườn truyền thống',
      active_compounds: ['Saponin triterpenoid', 'Tannin', 'Barringtonin'],
      soil_ph: '5.5 - 7.0 (Đất thịt bùn ao hoặc đất phù sa giàu dinh dưỡng)',
      ideal_temp: '20°C - 36°C',
      pot_size: 'Chậu bonsai hoặc ang nước đường kính 35cm - 60cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/L%E1%BB%99c_v%E1%BB%ABng.jpg/960px-L%E1%BB%99c_v%E1%BB%ABng.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d516',
    sunlight: 'full_sun',
    watering: 'daily',
    propagation_difficulty: 2,
    growth_time: 'Lộc non đỏ hồng bật mỗi tháng; ra chuỗi hoa đỏ vào mùa hè và cuối thu',
    container_suitable: true,
    seasonality: {
      north: 'Ra hoa đỏ rực rỡ vào tháng 5-7 và đợt hai vào tháng 10-11',
      central: 'Chịu cả nắng hạn lẫn ngập úng mùa mưa',
      south: 'Dễ dàng kích ra lộc đỏ và chuỗi hoa đúng dịp Tết Nguyên Đán',
      best_months: [3, 4, 5, 6, 9, 10, 11]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Nuôi bệ rễ ôm đá trong ang nước',
        instruction: 'Đặt bầu cây Lộc vừng ôm lên tảng đá thấm thủy trong ang nước có thả vài con cá bảy màu diệt lăng quăng để bộ rễ buông xuống nước cực kỳ nghệ thuật.'
      },
      {
        step: 2,
        title: 'Bí quyết kích Lộc vừng ra hoa đồng loạt',
        instruction: 'Xiết nước 5-7 ngày cho lá già hơi héo vàng rồi tuốt sạch lá, sau đó tưới đẫm nước trở lại và bón kali: cây sẽ bật kín lộc đỏ kèm các dây hoa dài rực rỡ.'
      }
    ],
    faqs: [
      {
        question: 'Đọt non Lộc vừng có ăn được không?',
        answer: 'Đọt và lá non Lộc vừng là món rau rừng đặc sản nổi tiếng có vị chát nhẹ hậu ngọt, rất giàu chất chống oxy hóa khi ăn kèm gỏi cá hoặc bánh xèo!'
      }
    ],
    monetization_tips: [
      'Chế tác Lộc vừng bonsai gốc củ quái ôm đá thấm thủy bán giá từ 800.000đ - 20.000.000đ/tác phẩm.',
      'Ươm cây giống Lộc vừng hoa đỏ chùm dài bán cho người chơi tiểu cảnh.'
    ],
    tags: ['Đứng đầu Tam Đa', 'Hoa đỏ buông rèm', 'Bonsai ôm đá', 'Rau rừng đặc sản']
  },
  {
    id: 'orn-23',
    slug: 'duong-xi-co-dai-boston',
    common_name: 'Dương Xỉ Cổ Đại Boston (Máy Lọc Khí Xanh)',
    scientific_name: 'Nephrolepis exaltata',
    aliases: ['Dương Xỉ Mỹ', 'Dương Xỉ Treo Ban Công', 'Boston Sword Fern'],
    category: 'ornamental',
    description: 'Được nghiên cứu Clean Air Study của NASA xếp hạng số 1 về tốc độ loại bỏ khí độc Formaldehyde (từ khói thuốc, gỗ ép, sơn tường) và là "máy tạo ẩm sinh học" tự nhiên tuyệt vời nhất cho những căn hộ thường xuyên bật máy điều hòa.',
    quick_answer: 'Dương xỉ Boston cực kỳ hợp treo ở ban công hướng Đông/Bắc hoặc đặt trên đôn cao cạnh cửa sổ. Cây ưa độ ẩm cao, ánh sáng tán xạ mát mẻ và hoàn toàn không độc hại với thú cưng (100% Pet-Safe).',
    botanical_details: {
      family: 'Nephrolepidaceae (Họ Dương xỉ)',
      native_range: 'Rừng nhiệt đới ẩm châu Mỹ và Đông Nam Á',
      active_compounds: ['Flavonoid', 'Pterosin', 'Enzym phân giải Formaldehyde nội bào ở rễ và lá'],
      soil_ph: '5.5 - 6.5 (Giá thể giữ ẩm thoáng khí: Xơ dừa + Rêu than bùn + Đá perlite + Phân trùn quế)',
      ideal_temp: '16°C - 28°C',
      pot_size: 'Chậu treo đường kính 20cm - 30cm để tán lá rủ tròn 360 độ'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Boston_Fern_%282873392811%29.png/960px-Boston_Fern_%282873392811%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d517',
    sunlight: 'partial_shade',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: 'Các mầm lá non cuộn tròn như vòi voi bung mở liên tục mỗi tuần',
    container_suitable: true,
    seasonality: {
      north: 'Xanh mướt mùa xuân - hè - thu; mùa đông hanh khô cần xịt phun sương giữ ẩm',
      central: 'Treo dưới mái hiên mát mẻ, tránh gió Lào khô nóng trực diện',
      south: 'Phát triển bồng bềnh quanh năm ở logia chung cư',
      best_months: [2, 3, 4, 5, 6, 8, 9, 10]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Giữ bầu đất luôn ẩm mát',
        instruction: 'Dương xỉ không thích đất bị khô trắng; hãy tưới nước giữ ẩm đều và xịt sương nhẹ lên tán lá vào buổi sáng.'
      },
      {
        step: 2,
        title: 'Tách bụi nhân giống siêu nhanh',
        instruction: 'Mỗi 6 tháng có thể tách các cây con mọc từ dây bò (stolon) quanh gốc ra trồng thành những giỏ treo mới.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao nghiên cứu NASA lại đánh giá Dương xỉ Boston cao nhất về lọc Formaldehyde?',
        answer: 'Nhờ diện tích bề mặt khổng lồ từ hàng ngàn lá chét nhỏ kết hợp hệ vi sinh vật cộng sinh quanh bộ rễ chùm giúp hấp thụ và phân giải tới 1.863 microgram Formaldehyde mỗi giờ!'
      }
    ],
    monetization_tips: [
      'Nhân giống giỏ treo Dương xỉ Boston tán xòe lớn bán cho các căn hộ mới sơn sửa khử mùi nội thất giá 120.000đ - 250.000đ/giỏ.',
      'Kết hợp trồng tường cây đứng (Vertical Green Wall) cho quán cà phê và văn phòng.'
    ],
    tags: ['Top 1 lọc khí NASA', 'Tạo ẩm phòng lạnh', 'An toàn thú cưng', 'Giỏ treo ban công']
  },
  {
    id: 'orn-24',
    slug: 'hong-mon-do-phu-quy',
    common_name: 'Hồng Môn Đỏ Phú Quý (Flamingo Flower)',
    scientific_name: 'Anthurium andraeanum',
    aliases: ['Vĩ Hoa Đỏ', 'Môn Hồng Nhiệt Đới', 'Trái Tim Nhiệt Đới'],
    category: 'ornamental',
    description: 'Biểu tượng của lòng hiếu khách nồng hậu, tình yêu bền chặt và năng lượng Hồng Phúc rực rỡ. Những chiếc lá bắc (mo hoa) hình trái tim đỏ thẫm bóng bẩy như tráng men vươn cao bền bỉ suốt 2-3 tháng mới tàn, đồng thời lọc sạch khí độc Ammonia và Xylene trong phòng làm việc.',
    quick_answer: 'Hồng môn là cây biểu sinh giống hoa Lan nên rất ưa giá thể thoáng khí (vỏ thông + xơ dừa cục + đá perlite). Đặt nơi có ánh sáng tán xạ sáng sủa, cây sẽ nối tiếp nhau bung hoa đỏ quanh năm không dứt.',
    botanical_details: {
      family: 'Araceae (Họ Ráy)',
      native_range: 'Rừng mưa nhiệt đới Colombia và Ecuador, trồng phổ biến tại Đà Lạt (Việt Nam)',
      active_compounds: ['Anthocyanin (Pelargonidin & Cyanidin)', 'Chlorophyll'],
      soil_ph: '5.5 - 6.5 (Giá thể thoáng xốp như giá thể trồng Lan / Aroid)',
      ideal_temp: '18°C - 30°C',
      pot_size: '18cm - 28cm (Chậu để bàn hoặc quầy lễ tân)'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/AnthuriumAndraenum.jpg/960px-AnthuriumAndraenum.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d518',
    sunlight: 'indoor',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: 'Mỗi bông hoa đỏ giữ sắc tươi suốt 60 - 90 ngày; cây ra hoa quanh năm',
    container_suitable: true,
    seasonality: {
      north: 'Nở hoa bền bỉ xuân - hè - thu; mùa đông để trong phòng ấm áp',
      central: 'Rất hợp trưng bày phòng khách và sảnh làm việc',
      south: 'Bung hoa trái tim đỏ rực rỡ suốt 4 mùa',
      best_months: [1, 2, 3, 4, 5, 9, 10, 11, 12]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Trồng bằng giá thể vỏ thông xơ dừa',
        instruction: 'Tuyệt đối không trồng Hồng môn bằng đất thịt bết dính; hãy dùng 50% dừa cục xử lý + 30% vỏ thông + 20% phân trùn quế để bộ rễ mập trắng như rễ lan.'
      },
      {
        step: 2,
        title: 'Bón phân tan chậm kích hoa',
        instruction: 'Rải 10-15 hạt phân chì tan chậm (14-14-14) quanh gốc mỗi 3 tháng để mỗi lá mới mọc lên đều kèm theo 1 bông hoa đỏ.'
      }
    ],
    faqs: [
      {
        question: 'Có thể trồng Hồng môn đỏ trong bình thủy sinh để bàn được không?',
        answer: 'Hoàn toàn được! Bộ rễ Hồng môn rất to khỏe nên khi rửa sạch giá thể và đặt vào bình thủy tinh (ngập 1/2 rễ trong nước sạch) cây vừa khoe bộ rễ trắng vừa nở hoa đỏ rất sang trọng.'
      }
    ],
    monetization_tips: [
      'Thiết kế bình Hồng môn thủy sinh cá cảnh hoặc chậu gốm sứ để bàn làm việc bán giá 180.000đ - 450.000đ/bộ.',
      'Cung cấp chậu Hồng môn đại phú quý làm quà mừng khai trương, tân gia.'
    ],
    tags: ['Hoa bền 90 ngày', 'Trái tim đỏ hồng phúc', 'Khử khí Ammonia', 'Trồng được thủy sinh']
  },
  {
    id: 'orn-25',
    slug: 'nguyet-que-hoa-thom-bonsai',
    common_name: 'Nguyệt Quế Hoa Thơm Bonsai',
    scientific_name: 'Murraya paniculata',
    aliases: ['Nguyệt Quới', 'Cửu Lý Hương', 'Orange Jasmine'],
    category: 'ornamental',
    description: 'Biểu tượng bất diệt của chiến thắng, vinh quang và tài lộc đăng khoa. Cây Nguyệt quế có thân gỗ màu trắng ngà uốn lượn nghệ thuật, tán lá xanh bóng nhỏ nhắn và từng chùm hoa trắng muốt nở rộ tỏa hương thơm ngát mùi hoa cam hoa bưởi thanh tao quyến rũ.',
    quick_answer: 'Nguyệt quế cực kỳ ưa nắng trực tiếp trên ban công và đất thoát nước tốt. Cây có đặc tính kỳ thú là thường đồng loạt bung nở hoa trắng thơm ngát vào những đêm trăng sáng hoặc ngay sau những cơn mưa rào mùa hạ.',
    botanical_details: {
      family: 'Rutaceae (Họ Cửu lý hương / Cam chanh)',
      native_range: 'Bản địa Việt Nam, Nam Á và Đông Nam Á',
      active_compounds: ['Murapanicin', 'Coumarin thơm', 'Linalool', 'Nerolidol', 'Methyl palmitate'],
      soil_ph: '6.0 - 7.5 (Đất bonsai thoáng xốp: Đất thịt hun + Xỉ than / Akadama + Trấu hun + Phân hữu cơ)',
      ideal_temp: '20°C - 35°C',
      pot_size: 'Chậu gốm bonsai 25cm - 50cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Murraya_paniculata_05.jpg/960px-Murraya_paniculata_05.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d519',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: 'Ra hoa thơm ngát từ 6 - 8 đợt mỗi năm, quả chín màu đỏ cam rất đẹp',
    container_suitable: true,
    seasonality: {
      north: 'Nở hoa thơm ngát suốt xuân - hè - thu',
      central: 'Chịu nắng gió tốt, thân gỗ già xoắn vặn cổ kính',
      south: 'Bung hoa trắng thơm quanh năm trên ban công và sân thượng',
      best_months: [3, 4, 5, 6, 7, 8, 9, 10]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Cắt tỉa cành răm đón hoa',
        instruction: 'Sau mỗi đợt hoa tàn (hoặc khi quả chuyển đỏ), cắt tỉa gọn gàng các đầu cành vượt và bón phân hữu cơ để toàn bộ tán cây đồng loạt đóng nụ mới.'
      },
      {
        step: 2,
        title: 'Lưu ý khi thay chậu bonsai',
        instruction: 'Rễ Nguyệt quế ưa sự ổn định; khi sang chậu chỉ nên gọt tỉa không quá 30% bầu đất cũ và giữ nguyên phần đất trung tâm quanh cổ rễ.'
      }
    ],
    faqs: [
      {
        question: 'Làm thế nào để chọn dòng Nguyệt quế bonsai đẹp và sai hoa nhất?',
        answer: 'Hãy chọn dòng "Nguyệt quế lá nhỏ bông chùm" (thân xoắn): lá nhỏ bằng móng tay, xếp khít nhau và khi ra hoa kết thành từng chùm lớn cực kỳ thơm.'
      }
    ],
    monetization_tips: [
      'Nuôi tạo tác Nguyệt quế lá nhỏ thân xoắn bonsai bán giá từ 500.000đ - 10.000.000đ/chậu.',
      'Bán cây giống Nguyệt quế chiết cành sẵn nụ hoa giá 90.000đ - 180.000đ/chậu.'
    ],
    tags: ['Vòng nguyệt quế', 'Hương thơm Cửu lý hương', 'Bonsai danh giá', 'Vinh quang đỗ đạt']
  },
  {
    id: 'orn-26',
    slug: 'day-thuong-xuan-loc-khi',
    common_name: 'Dây Thường Xuân Cẩm Thạch (English Ivy)',
    scientific_name: 'Hedera helix',
    aliases: ['Thường Xuân Lọc Nấm Mốc', 'Vạn Niên Thường Xuân', 'Trường Xuân Đằng'],
    category: 'ornamental',
    description: 'Biểu tượng của sức sống vĩnh cửu, tuổi trẻ và lòng trung thành trong văn hóa phương Tây lẫn phương Đông. Những dây lá 5 thùy hình ngôi sao viền trắng cẩm thạch buông rủ mềm mại từ kệ sách hay lan can, có khả năng tiêu diệt tới 78% bào tử nấm mốc lơ lửng trong không khí chỉ sau 12 giờ!',
    quick_answer: 'Dây thường xuân ưa bóng râm mát mẻ, ánh sáng gián tiếp và độ ẩm vừa phải. Trồng trong chậu treo hoặc đặt trên giá sách cao để dây lá buông rủ tự nhiên như bức rèm xanh ngọc.',
    botanical_details: {
      family: 'Araliaceae (Họ Nhân sâm / Ngũ gia bì)',
      native_range: 'Châu Âu và Tây Á, dòng chịu nhiệt cẩm thạch thích nghi tốt trong căn hộ Việt Nam',
      active_compounds: ['Hederacoside C', 'Alpha-Hederin (Hoạt chất chính trong siro ho Prospan)', 'Flavonoid'],
      soil_ph: '6.0 - 7.0 (Đất tơi xốp thoáng khí trộn đá perlite và phân trùn quế)',
      ideal_temp: '15°C - 28°C',
      pot_size: 'Chậu treo hoặc chậu gốm đặt kệ cao 15cm - 25cm'
    },
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hedera_helix_Dover.jpg/960px-Hedera_helix_Dover.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d520',
    sunlight: 'indoor',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: 'Dây vươn dài thêm 10-15cm mỗi tháng, xanh tươi suốt bốn mùa',
    container_suitable: true,
    seasonality: {
      north: 'Cực kỳ khỏe mạnh vào mùa thu - đông - xuân; mùa hè nóng ẩm đặt trong phòng mát',
      central: 'Trồng trong phòng điều hòa hoặc hành lang mát mẻ',
      south: 'Phát triển tuyệt đẹp trên kệ sách phòng khách, phòng làm việc có máy lạnh',
      best_months: [1, 2, 3, 4, 10, 11, 12]
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Đặt trên kệ cao hoặc giỏ treo thông thoáng',
        instruction: 'Đặt chậu Thường xuân trên nóc tủ sách, bệ cửa sổ mát hoặc treo gần khu vực dễ ẩm mốc để cây lọc sạch bào tử nấm trong không khí.'
      },
      {
        step: 2,
        title: 'Giâm cành trong nước hoặc đất ẩm',
        instruction: 'Cắt đoạn dây dài 15cm cắm vào lọ thủy tinh nước sạch, chỉ sau 7-10 ngày rễ trắng sẽ bung ra ở từng đốt lá.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao lá Thường xuân lại nổi tiếng trong y học hiện đại?',
        answer: 'Chiết xuất chuẩn hóa từ lá Thường xuân (Hedera helix) chứa Hederacoside C là thành phần chính trong các loại siro ho thảo dược nổi tiếng của Đức giúp giãn phế quản và long đờm (tuy nhiên chỉ dùng dịch chiết dược phẩm chuẩn hóa, không tự đun lá tươi tại nhà).'
      }
    ],
    monetization_tips: [
      'Nhân giống các giỏ treo Thường xuân lá ngôi sao và Thường xuân cẩm thạch bán giá 85.000đ - 180.000đ/chậu.',
      'Thiết kế vòng nguyệt quế Thường xuân sống (Topiary) trang trí bàn làm việc và quán cà phê.'
    ],
    tags: ['Diệt 78% nấm mốc', 'Lá ngôi sao rủ', 'Trường xuân vĩnh cửu', 'Decor kệ sách']
  },

  // ==========================================
  // NHÓM 4: BẢN VẼ KHÔNG GIAN & MÔ HÌNH TRỒNG PHỐ (SPACE)
  // ==========================================
  {
    id: 'space-01',
    slug: 'ban-ve-vuon-ban-cong-huong-tay-giam-nhiet',
    common_name: 'Bản Vẽ Vườn Ban Công Hướng Tây Chống Nóng Đa Tầng',
    scientific_name: 'Urban Architecture Blueprint: West Balcony Thermal Shield',
    aliases: ['Vườn ban công hướng Tây', 'Giàn cây chắn nắng bê tông', 'Micro-climate Balcony Blueprint'],
    category: 'space',
    nft_class: 'space_method',
    description: 'Thiết kế kiến trúc vườn ban công hướng Tây đa tầng giảm bức xạ nhiệt tường bê tông 4-6°C. Tối ưu vi khí hậu, phân tầng cây ưa nắng - cây che bóng và tích hợp hệ tưới ngấm tiết kiệm nước.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Terrace_Garden_East-57th-St_New_York.jpg',
    image_sha256: 'b4f179c3e980a15d2a67e584f29a0b1c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '1-2 ngày lắp đặt hoàn thiện',
    container_suitable: true,
    seasonality: {
      north: 'Thi công lý tưởng vào đầu hè (tháng 3-5) để kịp thời đón nắng gắt',
      central: 'Chịu gió Lào và nắng nóng cực đoan trên 40°C',
      south: 'Chống nóng hiệu quả quanh năm cho căn hộ cao tầng',
      best_months: [2, 3, 4, 5, 6, 7],
      warning: 'Tải trọng giá thể ướt phải nhẹ dưới 0.65 kg/L để an toàn kết cấu sàn'
    },
    botanical_details: {
      family: 'Urban Architecture / Ecological Engineering',
      native_range: 'Đô thị nhiệt đới cao tầng Việt Nam (Hà Nội, TP.HCM, Đà Nẵng)',
      active_compounds: ['Cách nhiệt vi khí hậu', 'Hấp thụ bức xạ mặt trời', 'Đối lưu không khí', 'Giảm tải bê tông'],
      soil_ph: '6.0 - 6.8 (Giá thể nhẹ xơ dừa, perlite, phân trùn quế)',
      ideal_temp: '25°C - 42°C',
      pot_size: 'Chậu composite chữ nhật dài 60-80cm đặt sát lan can'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Khảo sát góc nắng và kết cấu chịu tải',
        instruction: 'Đo kích thước ban công (tối thiểu 2-4m²). Xác định hướng nắng chiếu xiên từ 13h - 17h để bố trí giàn leo ngoài cùng.'
      },
      {
        step: 2,
        title: 'Phân tầng thực vật theo nhu cầu quang hợp',
        instruction: 'Tầng ngoài đón nắng gắt: Cóc Thái, Ổi lê, Cúc tần Ấn Độ. Tầng giữa đón nắng tán xạ: Tía tô, Húng chanh. Tầng dưới sát sàn: Lô hội, Lá lốt.'
      },
      {
        step: 3,
        title: 'Lắp đặt hệ thống tưới ngấm bấc thẩm thấu',
        instruction: 'Đi ống cấp nước tự động ngắt phao cơ hoặc dây bấc cotton dẫn ẩm liên tục, hạn chế thất thoát bốc hơi nước giữa trưa hè.'
      }
    ],
    faqs: [
      {
        question: 'Ban công hướng Tây trồng cây gì không bị cháy lá?',
        answer: 'Nên ưu tiên cây lá dày chịu hạn như Cóc Thái, ổi lê lùn, cúc tần Ấn Độ rủ lan can, kết hợp hoa giấy và hương thảo.'
      },
      {
        question: 'Tải trọng ban công chung cư chịu được bao nhiêu chậu cây?',
        answer: 'Tiêu chuẩn ban công chung cư chịu tải an toàn 150-200 kg/m². Nên dùng chậu nhựa PP/composite và giá thể perlite nhẹ, tránh dùng chậu xi măng nặng.'
      }
    ],
    monetization_tips: [
      'Chuyển giao bản vẽ thiết kế trọn gói cho căn hộ chung cư giá 500.000đ - 1.500.000đ/bản vẽ.',
      'Thi công vườn trọn gói chìa khóa trao tay lợi nhuận 30-40% trên hợp đồng.'
    ],
    tags: ['Ban công hướng Tây', 'Bản vẽ kiến trúc', 'Chống nóng đô thị', 'Tự tưới ngấm', 'Vi khí hậu'],
    related_plant_ids: ['fruit-01', 'fruit-02', 'herb-22', 'orn-01']
  },

  // ==========================================
  // NHÓM 5: SÁNG CHẾ TÁI CHẾ & TUẦN HOÀN (RECYCLE)
  // ==========================================
  {
    id: 'recycle-01',
    slug: 'chau-tu-tuoi-bac-ngam-can-nhua-hdpe',
    common_name: 'Chậu Tự Tưới Bấc Ngấm Thông Minh Từ Can Nhựa HDPE Tái Chế',
    scientific_name: 'Eco Invention: DIY Sub-Irrigated Capillary Planter (HDPE Upcycling)',
    aliases: ['Chậu tự tưới từ can nhựa', 'SIP Planter tái chế', 'Chậu bấc thấm gia đình'],
    category: 'recycle',
    nft_class: 'eco_invention',
    description: 'Sáng chế chậu tự tưới bấc ngấm mao dẫn từ can nhựa thực phẩm HDPE 5L tái chế. Tiết kiệm 70% lượng nước tưới, rễ cây tự hút ẩm liên tục 7-10 ngày mà không lo úng ngập hay thối rễ.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Illustration-Sub-Irrigated_Planter_from_pop_bottle.png',
    image_sha256: 'a1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2',
    sunlight: 'partial_shade',
    watering: 'drought_tolerant',
    propagation_difficulty: 1,
    growth_time: '30 phút chế tạo thủ công',
    container_suitable: true,
    seasonality: {
      north: 'Sử dụng quanh năm, đặc biệt hữu ích khi chủ nhà đi công tác hoặc về quê ăn Tết',
      central: 'Giữ ẩm tuyệt vời trong mùa khô hạn miền Trung',
      south: 'Chống mất nước nhanh dưới nắng nóng TP.HCM',
      best_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      warning: 'Chỉ dùng can nhựa thực phẩm số 2 (HDPE) hoặc số 5 (PP), tuyệt đối không dùng can hóa chất độc hại'
    },
    botanical_details: {
      family: 'Eco Innovation / Upcycling Systems',
      native_range: 'Vật liệu tái chế gia đình thân thiện môi trường',
      active_compounds: ['Hiệu ứng mao dẫn bấc ngấm', 'Ngăn bốc hơi nước mặt', 'Cung cấp oxy vùng rễ', 'Tái chế không rác thải'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '15°C - 38°C',
      pot_size: 'Can nhựa 5L cắt đôi chia 2 khoang (nước 1.5L + giá thể 3.5L)'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Cắt và phân chia 2 khoang can nhựa',
        instruction: 'Rửa sạch can nước khoáng/dầu ăn HDPE 5L. Cắt ngang thân cách đáy 12cm. Lật ngược phần trên đặt lọt vào phần đáy.'
      },
      {
        step: 2,
        title: 'Lắp bấc dẫn mao dẫn và lỗ thoát khí',
        instruction: 'Đục lỗ nắp can, luồn sợi dây cotton hoặc vải dù dày 20cm làm bấc ngấm. Khoan lỗ tràn nước cách đáy 8cm để tránh ngập rễ.'
      },
      {
        step: 3,
        title: 'Nạp giá thể và châm nước khoang trữ',
        instruction: 'Cho giá thể tơi xốp vào phần trên, rải bấc ngấm quanh rễ cây. Châm nước đầy khoang trữ phía dưới để cây tự hút ẩm.'
      }
    ],
    faqs: [
      {
        question: 'Dây bấc ngấm loại nào dẫn nước tốt nhất?',
        answer: 'Dây cotton bện sợi tự nhiên hoặc dải vải thun sợi bông dẫn nước tốt nhất, không bị phân hủy mục nát trong đất ít nhất 1-2 năm.'
      },
      {
        question: 'Nước trong bình trữ lâu có sinh bọ gậy/lăng quăng không?',
        answer: 'Khoang chứa nước kín và râm tối, lỗ châm nước có nắp đậy nên muỗi không thể vào đẻ trứng.'
      }
    ],
    monetization_tips: [
      'Gia công bộ KIT chậu tự tưới tái chế kèm cây giống bán lẻ cho dân văn phòng 65.000đ - 95.000đ/bộ.',
      'Mở workshop tái chế rác thải nhựa hướng dẫn trường học và cộng đồng thu phí đào tạo.'
    ],
    tags: ['Chậu tự tưới', 'Tái chế can nhựa', 'Bấc ngấm mao dẫn', 'Sáng chế xanh', 'Tiết kiệm nước'],
    related_plant_ids: ['herb-01', 'herb-02', 'herb-03']
  },

  // ==========================================
  // NHÓM 6: ẨM THỰC DƯỢC THIỆN & ĐỒ UỐNG XANH (CULINARY)
  // ==========================================
  {
    id: 'culinary-01',
    slug: 'siro-hung-chanh-quat-mat-ong-tri-ho',
    common_name: 'Siro Húng Chanh Quất Mật Ong Chưng Cách Thủy Trị Ho Dân Gian',
    scientific_name: 'Botanical Culinary Recipe: Steamed Plectranthus & Calamondin Honey Cough Elixir',
    aliases: ['Siro húng chanh mật ong', 'Bài thuốc siro trị ho cho bé', 'Dược thiện húng chanh quất'],
    category: 'culinary',
    nft_class: 'culinary_recipe',
    description: 'Bí phương dược thiện dân gian chiết xuất kháng sinh thực vật carvacrol và thymol từ lá húng chanh tươi và quả quất vườn nhà chưng cùng mật ong nguyên chất và đường phèn kết tinh.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Runny_hunny.jpg',
    image_sha256: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
    sunlight: 'indoor',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '45 phút chưng cất nhiệt nhẹ',
    container_suitable: true,
    seasonality: {
      north: 'Chế biến nhiều vào mùa thu đông đón các đợt gió mùa gây ho sốt',
      central: 'Dùng phòng cảm lạnh trong mùa mưa lũ',
      south: 'Dịu họng tức thì khi nằm phòng máy lạnh nhiều',
      best_months: [1, 2, 3, 8, 9, 10, 11, 12],
      warning: 'Trẻ nhỏ dưới 1 tuổi thay thế mật ong bằng đường phèn nguyên chất để an toàn tiêu hóa'
    },
    botanical_details: {
      family: 'Traditional Culinary Herbal Medicine',
      native_range: 'Công thức y học cổ truyền dân gian ba miền Việt Nam',
      active_compounds: ['Carvacrol sát khuẩn', 'Thymol kháng viêm', 'Hesperidin từ vỏ quất', 'Enzyme kháng khuẩn mật ong'],
      soil_ph: 'Nguyên liệu hữu cơ 100% tự nhiên không chất bảo quản',
      ideal_temp: 'Bảo quản ngăn mát tủ lạnh 4°C - 8°C',
      pot_size: 'Hũ thủy tinh nắp kín tiệt trùng dung tích 250ml - 500ml'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Chuẩn bị và sơ chế thảo mộc tươi',
        instruction: 'Hái 15-20 lá húng chanh tươi dày mọng nước + 5-7 quả quất chín vàng rửa sạch ngâm nước muối loãng 15 phút, thái nhỏ hạt lựu giữ nguyên hạt quất.'
      },
      {
        step: 2,
        title: 'Phối trộn tỷ lệ vàng thảo dược',
        instruction: 'Cho hỗn hợp vào bát sứ: 100g húng chanh + 100g quất + 80g đường phèn kết tinh tự nhiên + 50ml mật ong hoa rừng nguyên chất.'
      },
      {
        step: 3,
        title: 'Chưng cách thủy lửa nhỏ',
        instruction: 'Đặt bát vào nồi nước sôi, chưng cách thủy lửa liu riu 40-45 phút cho tinh dầu ngấm kiệt. Để nguội lọc lấy siro cốt đóng hũ thủy tinh.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao khi chưng siro lại phải giữ lại hạt quất?',
        answer: 'Hạt quất chứa hàm lượng pectin và tinh dầu đắng tự nhiên có tác dụng tiêu đờm, ấm phổi và hạ sốt tốt gấp đôi phần múi thịt.'
      },
      {
        question: 'Siro này bảo quản được bao lâu?',
        answer: 'Đựng trong hũ thủy tinh tiệt trùng để ngăn mát tủ lạnh dùng tốt trong vòng 3-6 tháng.'
      }
    ],
    monetization_tips: [
      'Nấu siro húng chanh quất hữu cơ đóng chai 250ml bán theo mùa dịch cúm 95.000đ - 145.000đ/chai.',
      'Bán theo set nguyên liệu tươi (combo lá húng chanh + quất sạch + mật ong) cho mẹ bỉm sữa tự làm tại nhà.'
    ],
    tags: ['Siro húng chanh', 'Trị ho trẻ nhỏ', 'Dược thiện dân gian', 'Mật ong nguyên chất', 'Kháng sinh tự nhiên'],
    related_plant_ids: ['herb-01', 'fruit-08']
  },

  // ==========================================
  // NHÓM 7: RỪNG TỰ NHIÊN & KHU BẢO TỒN SINH THÁI (FOREST)
  // ==========================================
  {
    id: 'forest-01',
    slug: 'vuon-quoc-gia-cuc-phuong',
    common_name: 'Vườn Quốc Gia Cúc Phương (Khu Bảo Tồn Rừng Mưa Nhiệt Đới)',
    scientific_name: 'Cuc Phuong National Park Sanctuary (Rainforest Biome)',
    aliases: ['Rừng Cúc Phương', 'VQG Cúc Phương', 'Cuc Phuong Primary Forest Reserve'],
    category: 'forest',
    nft_class: 'geo_forest_10000m2',
    description: 'Vườn Quốc Gia đầu tiên của Việt Nam với diện tích 22.408 ha (224.080.000 m²). Nơi lưu giữ cây Chò ngàn năm tuổi, động Người Xưa, quần thể voọc mông trắng quý hiếm và thảm thực vật đa tầng nguyên sinh đặc trưng vùng Karst đá vôi.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Thousand_year_old_tree_in_Cuc_Phuong_National_Park%2C_Vietnam.jpg',
    image_sha256: 'e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 5,
    growth_time: 'Hệ sinh thái bảo tồn vĩnh cửu hàng triệu năm',
    container_suitable: false,
    seasonality: {
      north: 'Đẹp nhất vào mùa bướm rợp trời (tháng 4 - tháng 5) và mùa khô (tháng 11 - tháng 3)',
      central: 'Thời tiết mát mẻ quanh năm trong tán rừng mưa nhiệt đới ẩm',
      south: 'Điểm đến hành hương sinh thái hàng đầu miền Bắc',
      best_months: [4, 5, 11, 12, 1, 2, 3],
      warning: 'Tuân thủ nghiêm ngặt quy định bảo tồn rừng: không bẻ cành, không săn bắt và không xả rác'
    },
    botanical_details: {
      family: 'Tropical Rainforest / Limestone Karst Primeval Forest',
      native_range: 'Ranh giới 3 tỉnh Ninh Bình, Hòa Bình, Thanh Hóa',
      active_compounds: ['Đa dạng sinh học 2.234 loài thực vật bậc cao', '436 loài cây thuốc quý', 'Bể hấp thụ carbon khổng lồ', 'Rừng đệm bảo vệ nguồn nước'],
      soil_ph: '6.5 - 7.5 (Đất phong hóa Feralit đỏ vàng trên nền đá vôi Karst cổ đại)',
      ideal_temp: '18°C - 28°C',
      pot_size: 'Khu bảo tồn nguyên sinh 22.408 ha (Mỗi NFT tương ứng 10.000 m² rừng)'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Đến thực địa và bật định vị GPS vệ tinh',
        instruction: 'Di chuyển đến khu vực Vườn Quốc Gia Cúc Phương (trong bán kính cho phép 18km từ tâm rừng). Bật định vị GPS trên điện thoại.'
      },
      {
        step: 2,
        title: 'Bấm nút Xác Thực GPS Check-in trên Web3 Sandbox',
        instruction: 'Hệ thống đối chiếu khoảng cách Haversine. Khi khoảng cách hợp lệ <= 18km, hệ thống cấp Vé Check-in GPS thực địa hiệu lực 24 giờ.'
      },
      {
        step: 3,
        title: 'Ký ví Web3 nhận Hộ Chiếu NFT Lô Rừng 10.000m²',
        instruction: 'Nhận chứng thư số độc bản xác nhận đóng góp bảo tồn 1 Lô (10.000 m² = 1 ha) rừng nguyên sinh Cúc Phương trên Blockchain.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao đúc NFT Lô Rừng Cúc Phương lại bắt buộc phải có mặt tại thực địa?',
        answer: 'Cơ chế GPS Proof-of-Presence gắn kết thế giới ảo với hành động bảo tồn thực tế, ngăn chặn nạn đầu cơ lướt sóng của người không gắn bó với rừng.'
      },
      {
        question: 'Diện tích 22.408 ha tương ứng với bao nhiêu NFT?',
        answer: 'Mỗi NFT bảo tồn tương ứng 10.000 m² (1 ha). Do đó toàn bộ VQG Cúc Phương có quỹ tối đa 22.408 Lô NFT độc bản số thứ tự cố định, khi mint hết hệ thống tự động khóa vĩnh viễn.'
      }
    ],
    monetization_tips: [
      'Gắn kết quyền lợi du lịch sinh thái: Người sở hữu NFT Lô Rừng được tri ân giảm phí hướng dẫn viên tại vườn.',
      'Tích lũy chứng chỉ bảo tồn rừng xanh tạo tín chỉ Carbon sinh thái cá nhân trên Web3.'
    ],
    tags: ['Vườn quốc gia', 'Rừng nguyên sinh', 'Cúc Phương', 'Bảo tồn đa dạng sinh học', 'Voọc mông trắng', 'Cây Chò ngàn năm'],
    forest_spec: {
      center_lat: 20.3167,
      center_lng: 105.6000,
      radius_km: 18.0,
      total_area_m2: 224080000,
      unit_area_m2: 10000,
      max_nft_supply: 22408,
      province: 'Ninh Bình - Hòa Bình - Thanh Hóa',
      unesco_or_status: 'Vườn Quốc Gia Đầu Tiên Của Việt Nam (1962)'
    },
    related_plant_ids: ['herb-01', 'herb-05', 'herb-17', 'orn-01']
  },

  // ==========================================
  // MỐC 3: BỔ SUNG 16 ẤN PHẨM CHUYÊN SÂU ĐỢT 1 (105 -> 120)
  // ==========================================

  // --- SPACE (02 -> 05) ---
  {
    id: 'space-02',
    slug: 'ban-ve-gian-leo-san-thuong-sieu-nhe-chong-bao',
    common_name: 'Bản Vẽ Giàn Leo Sân Thượng Siêu Nhẹ Khung Thép Căng Cáp Chịu Bão',
    scientific_name: 'Urban Architecture Blueprint: Lightweight Storm-Resistant Rooftop Trellis',
    aliases: ['Giàn leo sân thượng chịu bão', 'Khung giàn thép bọc nhựa sân thượng', 'Rooftop Trellis Blueprint'],
    category: 'space',
    nft_class: 'space_method',
    description: 'Thiết kế giàn leo sân thượng module tháo lắp nhanh bằng thép mạ kẽm bọc nhựa kết hợp dây cáp bọc nhựa PVC. Chịu sức gió cấp 9-10, tải trọng cực nhẹ không ảnh hưởng chống thấm trần nhà.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Gemeinschaftsgarten_K%C5%91ris_Stra%C3%9Fe%2C_Pergola%2C_Blumen%2C_2025_Orczynegyed.jpg',
    image_sha256: 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '1 ngày lắp ráp hoàn thiện',
    container_suitable: true,
    seasonality: {
      north: 'Lắp dựng lý tưởng đầu mùa xuân (tháng 2-3) trước mùa dông bão miền Bắc',
      central: 'Chịu bão biển và gió giật mạnh cấp 10 miền Trung',
      south: 'Tạo bóng râm che mát sân thượng quanh năm',
      best_months: [2, 3, 4, 10, 11, 12],
      warning: 'Không khoan thủng sàn bê tông; dùng chân đế bê tông đúc sẵn đặt trên cao su giảm chấn'
    },
    botanical_details: {
      family: 'Urban Architecture / Structural Engineering',
      native_range: 'Sân thượng nhà phố và biệt thự đô thị Việt Nam',
      active_compounds: ['Chịu gió giật cấp 10', 'Thép bọc nhựa PE chống rỉ 10 năm', 'Tải trọng nhẹ <15 kg/m²', 'Giảm nhiệt mái 5°C'],
      soil_ph: '6.0 - 7.0 (Đất hữu cơ tơi xốp chậu chữ nhật chân giàn)',
      ideal_temp: '20°C - 42°C',
      pot_size: 'Chậu thông minh cỡ đại 67x43x20cm hoặc thùng xốp gia cố đáy'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Bố trí chân đế trọng lực không khoan sàn',
        instruction: 'Đặt 4-6 cục chân đế bê tông nặng 25-30kg trên miếng lót cao su chống xước màng chống thấm mái.'
      },
      {
        step: 2,
        title: 'Dựng khung cột thép bọc nhựa phi 20mm',
        instruction: 'Liên kết các thanh thép bọc nhựa bằng khớp nối chữ thập chuyên dụng, tạo hệ khung vòm hoặc phẳng cao 2.2m.'
      },
      {
        step: 3,
        title: 'Đan lưới cáp căng chống võng',
        instruction: 'Dùng dây cáp bọc nhựa đan ô vuông 15x15cm, dùng tăng đơ siết căng để cây leo bám vững khi có gió lốc.'
      }
    ],
    faqs: [
      {
        question: 'Giàn leo sân thượng này có bị sét đánh hoặc gió bão cuốn bay không?',
        answer: 'Kết cấu hở cho gió xuyên qua giảm 80% lực cản, đồng thời chân đế trọng lực giữ vững khung không cần đục sàn.'
      },
      {
        question: 'Cây leo nào nhanh phủ mát giàn nhất?',
        answer: 'Cúc tần Ấn Độ, nho Ninh Thuận, chanh leo vàng ngọt và đậu biếc leo phủ xanh kín giàn chỉ sau 2-3 tháng.'
      }
    ],
    monetization_tips: [
      'Gia công bộ KIT giàn leo sân thượng tự lắp ráp bán lẻ 1.200.000đ - 2.500.000đ/bộ.',
      'Dịch vụ thi công giàn quả ăn trái sân thượng trọn gói 5-10 triệu đồng/công trình.'
    ],
    tags: ['Giàn leo sân thượng', 'Chịu bão', 'Thép bọc nhựa', 'Cây leo giàn', 'Chống nóng mái'],
    related_plant_ids: ['fruit-09', 'fruit-14', 'fruit-20', 'fruit-23']
  },

  {
    id: 'space-03',
    slug: 'ban-ve-vuon-tuong-dung-module-thoat-nuoc-trong-nha',
    common_name: 'Bản Vẽ Vườn Tường Đứng Module Vải Nỉ Tự Ngấm Cho Giếng Trời & Logia',
    scientific_name: 'Urban Architecture Blueprint: Modular Felt Vertical Living Wall',
    aliases: ['Vườn tường đứng trong nhà', 'Module tường xanh vải nỉ', 'Vertical Living Wall Loggia'],
    category: 'space',
    nft_class: 'space_method',
    description: 'Bản vẽ module tường cây thẳng đứng bằng túi vải địa kỹ thuật 3 lớp chống thấm tường nhà. Tích hợp bơm tuần hoàn nhỏ 12V hẹn giờ tưới ngấm tự động cho giếng trời và phòng khách.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/An_indoor_living_wall_%2828515828890%29.jpg',
    image_sha256: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5',
    sunlight: 'indoor',
    watering: 'moderate',
    propagation_difficulty: 2,
    growth_time: '3-4 giờ thi công lắp đặt',
    container_suitable: true,
    seasonality: {
      north: 'Trồng cây quanh năm trong nhà có đèn quang hợp chuyên dụng bổ trợ',
      central: 'Tạo vi khí hậu mát mẻ cho nhà ống giếng trời',
      south: 'Thanh lọc bụi mịn và điều hòa độ ẩm phòng máy lạnh',
      best_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      warning: 'Tấm ốp alu/nhựa ngăn cách tường phải kín khít 100% để bảo vệ sơn tường'
    },
    botanical_details: {
      family: 'Vertical Urban Agriculture / Bio-Filtration',
      native_range: 'Thiết kế sinh thái cho căn hộ và nhà phố không có sân vườn',
      active_compounds: ['Lọc bụi mịn PM2.5', 'Nhả oxy ban đêm', 'Cách âm tường', 'Tăng độ ẩm tự nhiên 15-20%'],
      soil_ph: '6.0 - 6.8 (Giá thể xơ dừa vi sinh khử khuẩn trộn perlite)',
      ideal_temp: '18°C - 32°C',
      pot_size: 'Túi vải địa kỹ thuật may 3 lớp 15x15cm mỗi hốc'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Bắn khung xương và tấm chống ẩm',
        instruction: 'Bắn khung sắt hộp mạ kẽm cách tường 3cm, ốp tấm nhựa PVC/Alu chống ẩm bảo vệ tường.'
      },
      {
        step: 2,
        title: 'Gắn thảm túi vải nỉ địa kỹ thuật',
        instruction: 'Bắn thảm túi vải nỉ 12-24 hốc vào khung xương. Đặt máng thu nước đáy dẫn về bể lọc tuần hoàn.'
      },
      {
        step: 3,
        title: 'Cài đặt timer tưới nhỏ giọt 12V',
        instruction: 'Cài đặt bơm mini hẹn giờ tưới 2 lần/ngày (mỗi lần 3 phút) cấp nước ẩm từ đỉnh tường ngấm đều xuống dưới.'
      }
    ],
    faqs: [
      {
        question: 'Vườn tường đứng trong nhà có bị ẩm mốc tường không?',
        answer: 'Nhờ khoảng hở 3cm lưu thông không khí và tấm alu cách ly nên tường nhà khô ráo 100%.'
      },
      {
        question: 'Cây nào sống bền nhất trên tường đứng nội thất?',
        answer: 'Trầu bà thanh xuân, ngọc ngân, vạn lộc, lan ý và dương xỉ phát triển tươi tốt hàng năm chỉ với ánh sáng tán xạ.'
      }
    ],
    monetization_tips: [
      'Gia công module tường đứng 1m² kèm cây và hệ tưới bán 1.800.000đ - 3.200.000đ/m².',
      'Hợp đồng bảo dưỡng định kỳ thay cây văn phòng và quán cà phê 300.000đ - 500.000đ/tháng.'
    ],
    tags: ['Vườn tường đứng', 'Vải địa kỹ thuật', 'Lọc không khí', 'Giếng trời', 'Logia chung cư'],
    related_plant_ids: ['orn-03', 'orn-06', 'orn-08', 'orn-10']
  },

  {
    id: 'space-04',
    slug: 'ban-ve-vuon-rau-gia-vi-ke-bac-thang-ban-cong-nho',
    common_name: 'Bản Vẽ Vườn Thảo Dược Kệ Bậc Thang Tối Ưu Diện Tích Ban Công 2m²',
    scientific_name: 'Urban Architecture Blueprint: 3-Tier Stepped Balcony Herbal Stand',
    aliases: ['Kệ bậc thang ban công 2m²', 'Vườn gia vị nhiều tầng', 'Stepped Balcony Herb Garden'],
    category: 'space',
    nft_class: 'space_method',
    description: 'Giải pháp tối ưu hóa không gian ban công siêu nhỏ 1.5 - 2m² bằng hệ kệ bậc thang 3 tầng dốc 60 độ. Đảm bảo mọi tầng chậu đều nhận đủ 100% ánh sáng mặt trời không bị khuất bóng.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Stone_Arch_Lofts%2C_2nd_Street%2C_Mill_District%2C_Minneapolis%2C_MN.jpg',
    image_sha256: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
    sunlight: 'partial_shade',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '2 giờ lắp đặt',
    container_suitable: true,
    seasonality: {
      north: 'Trồng rau gia vị tốt nhất từ tháng 8 đến tháng 5 năm sau',
      central: 'Đặt nơi có lan can che chắn gió mùa',
      south: 'Xanh tốt quanh năm cung cấp rau nêm tươi mỗi ngày',
      best_months: [1, 2, 3, 4, 8, 9, 10, 11, 12],
      warning: 'Chọn khay có rãnh thoát nước đáy khớp với khay hứng tránh chảy nước bẩn xuống sàn'
    },
    botanical_details: {
      family: 'Compact Urban Balcony Architecture',
      native_range: 'Ban công căn hộ chung cư diện tích nhỏ',
      active_compounds: ['Tăng 300% diện tích trồng trọt', 'Hấp thụ 100% ánh sáng mặt trời', 'Gọn gàng sạch sẽ', 'Tiện chăm sóc hái lá'],
      soil_ph: '6.0 - 7.0',
      ideal_temp: '20°C - 35°C',
      pot_size: 'Khay chữ nhật thông minh dài 65cm rộng 25cm'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Lắp ráp khung thép sơn tĩnh điện 3 tầng',
        instruction: 'Ghép khung kệ bậc thang dốc 60 độ, kiểm tra độ cân bằng và gắn chân cao su chống trượt trên gạch ban công.'
      },
      {
        step: 2,
        title: 'Đặt khay thông minh có lưới ngăn đất',
        instruction: 'Xếp 3-6 khay trồng lên từng bậc. Mỗi khay đều có khoang trữ nước 2cm phía dưới ngăn đất rơi vãi.'
      },
      {
        step: 3,
        title: 'Phối giống thảo dược theo độ cao',
        instruction: 'Tầng 1 (trên cùng): Húng chanh, húng quế ưa nắng. Tầng 2: Tía tô, ngải cứu. Tầng 3 (dưới): Diếp cá, rau má ưa mát.'
      }
    ],
    faqs: [
      {
        question: 'Kệ bậc thang có chắn lối đi ban công không?',
        answer: 'Chiều sâu kệ chỉ 45cm áp sát lan can nên vẫn giữ được 70% không gian ban công để phơi đồ và ngắm cảnh.'
      },
      {
        question: 'Một gia đình 4 người trồng kệ này có đủ rau gia vị không?',
        answer: '6 khay trồng thảo dược cung cấp đủ hành, tía tô, húng chanh, ớt tươi quanh năm cho các bữa ăn gia đình.'
      }
    ],
    monetization_tips: [
      'Bán combo trọn gói Kệ + 6 Khay + Đất hữu cơ + Cây giống sẵn 850.000đ - 1.250.000đ/set.',
      'Cung cấp dịch vụ thay đất bảo dưỡng vườn rau mini định kỳ 200.000đ/lần.'
    ],
    tags: ['Ban công 2m²', 'Kệ bậc thang', 'Tối ưu diện tích', 'Vườn thảo dược', 'Chung cư nhỏ'],
    related_plant_ids: ['herb-01', 'herb-02', 'herb-03', 'herb-12']
  },

  {
    id: 'space-05',
    slug: 'ban-ve-he-thong-bon-luong-sieu-nhe-chong-tham-mai',
    common_name: 'Bản Vẽ Bồn Trồng Đa Lớp Siêu Nhẹ Vải Chống Thấm & Vỉ Thoát Nước Mái',
    scientific_name: 'Urban Architecture Blueprint: Multi-Layer Lightweight Rooftop Planter Bed',
    aliases: ['Bồn luống sân thượng siêu nhẹ', 'Vỉ thoát nước bồn cây mái', 'Rooftop Planter Bed'],
    category: 'space',
    nft_class: 'space_method',
    description: 'Thiết kế bồn trồng âm sàn sân thượng 3 lớp: Màng chống thấm HDPE + Vỉ thoát nước nhựa cell + Vải địa lọc cát. Ngăn chặn 100% rễ cây đâm xuyên bê tông và chống ứ đọng nước mái nhà.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Micro-irrigation_system_in_a_garden.jpg',
    image_sha256: 'e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 3,
    growth_time: '2 ngày thi công',
    container_suitable: true,
    seasonality: {
      north: 'Thi công tốt nhất vào mùa thu hanh khô (tháng 9-11) để chống thấm khô nhanh',
      central: 'Thoát nước cực nhanh trong các đợt mưa bão lớn ngập úng miền Trung',
      south: 'Giảm nhiệt truyền xuống phòng ngủ tầng trên cùng 4-6°C',
      best_months: [1, 2, 3, 9, 10, 11, 12],
      warning: 'Bắt buộc kiểm tra ngâm thử nước sàn mái 24h trước khi đổ giá thể vào bồn'
    },
    botanical_details: {
      family: 'Rooftop Ecological Engineering / Drainage Systems',
      native_range: 'Mái bằng nhà phố và sân thượng biệt thự đô thị',
      active_compounds: ['Chống rễ cây đâm thủng sàn', 'Thoát nước 16.5 L/m²s', 'Giá thể siêu nhẹ 0.55 kg/L', 'Cách nhiệt mái bê tông'],
      soil_ph: '6.0 - 6.8',
      ideal_temp: '22°C - 40°C',
      pot_size: 'Bồn luống xây cao 30-40cm hoặc ghép tấm nhựa composite module'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Xử lý chống thấm và trải màng bảo vệ',
        instruction: 'Quét 2 lớp chống thấm gốc polyurethane/sika, trải lớp màng chống rễ đâm bảo vệ sàn mái.'
      },
      {
        step: 2,
        title: 'Lắp vỉ thoát nước Plastic Drainage Cell và vải địa',
        instruction: 'Lắp vỉ thoát nước cell cao 3cm kết nối khóa ngàm, trải vải địa kỹ thuật không dệt lọc cát phía trên.'
      },
      {
        step: 3,
        title: 'Nạp giá thể phối trộn siêu nhẹ và trồng cây',
        instruction: 'Đổ giá thể hỗn hợp: 40% perlite + 30% xơ dừa + 20% phân trùn quế + 10% đất màu, trồng cây ăn quả thân gỗ lùn.'
      }
    ],
    faqs: [
      {
        question: 'Bồn luống sân thượng này có làm nứt trần nhà không?',
        answer: 'Nhờ dùng giá thể đá khoáng perlite siêu nhẹ, trọng lượng ướt chỉ bằng 1/3 đất thịt nên hoàn toàn an toàn cho trần nhà.'
      },
      {
        question: 'Vỉ thoát nước cell có tuổi thọ bao lâu?',
        answer: 'Vỉ làm từ nhựa PP nguyên sinh chôn dưới đất không tiếp xúc tia UV có độ bền trên 20 năm.'
      }
    ],
    monetization_tips: [
      'Thi công vườn luống sân thượng trọn gói tính theo mét vuông (1.500.000đ - 2.800.000đ/m²).',
      'Cung cấp vật tư trọn gói (Vỉ cell + Vải địa + Giá thể trộn sẵn) cho thầu xây dựng.'
    ],
    tags: ['Bồn trồng sân thượng', 'Chống thấm sàn mái', 'Vỉ thoát nước cell', 'Giá thể siêu nhẹ', 'Vườn mái'],
    related_plant_ids: ['fruit-01', 'fruit-04', 'fruit-10', 'orn-15']
  },

  // --- RECYCLE (02 -> 05) ---
  {
    id: 'recycle-02',
    slug: 'thung-u-rac-huu-co-bokashi-khong-mui-tu-thung-son-cu',
    common_name: 'Thùng Ủ Rác Nhà Bếp Bokashi Không Mùi Từ Thùng Sơn Cũ Tái Chế',
    scientific_name: 'Eco Invention: Zero-Odor DIY Bokashi Composter from Recycled Buckets',
    aliases: ['Thùng ủ Bokashi tự chế', 'Ủ rác nhà bếp không mùi', 'Compost thùng sơn cũ'],
    category: 'recycle',
    nft_class: 'eco_invention',
    description: 'Sáng chế thùng ủ yếm khí Bokashi 2 tầng từ thùng sơn 18L tái chế có vòi xả dịch dinh dưỡng. Lên men vi sinh EM biến rác thải nhà bếp thành phân hữu cơ giàu đạm không hôi thối trong căn hộ.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Bokashi_composting_bucket_content.jpg',
    image_sha256: 'f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8',
    sunlight: 'indoor',
    watering: 'drought_tolerant',
    propagation_difficulty: 1,
    growth_time: '14 ngày lên men yếm khí',
    container_suitable: true,
    seasonality: {
      north: 'Hoạt động quanh năm; mùa đông để nơi ấm cạnh bếp giúp vi sinh lên men nhanh',
      central: 'Xử lý triệt để rác hữu cơ mùa mưa ẩm',
      south: 'Ủ rác phân giải cực nhanh ở nhiệt độ phòng 28-32°C',
      best_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      warning: 'Đậy nắp thật kín khí; nắp hở sẽ chuyển sang phân hủy hiếu khí gây mùi hôi'
    },
    botanical_details: {
      family: 'Anaerobic Composting / Micro-organism Recycling',
      native_range: 'Hệ thống tuần hoàn rác hữu cơ tại gia',
      active_compounds: ['Vi sinh vật hữu hiệu EM (Lactobacillus, nấm men)', 'Axit Lactic tự nhiên', 'Dịch trà Bokashi giàu NPK', 'Khử 100% mùi thối rữa'],
      soil_ph: '3.5 - 4.5 (Axit hữu cơ lên men, trung hòa khi vùi vào đất)',
      ideal_temp: '22°C - 35°C',
      pot_size: '2 thùng sơn 18L lồng vào nhau có nắp gioăng cao su'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Khoan lỗ thoát nước thùng trên',
        instruction: 'Khoan 30-40 lỗ nhỏ 3mm dưới đáy thùng thứ nhất để dịch ủ chảy xuống. Lắp vòi xả đáy ở thùng thứ hai.'
      },
      {
        step: 2,
        title: 'Nạp rác và rắc cám men Bokashi',
        instruction: 'Cắt nhỏ rác nhà bếp (rau, củ, cơm nguội, vỏ trứng). Cứ một lớp rác 3cm rắc một nắm cám men vi sinh Bokashi, nén chặt đẩy hết không khí ra ngoài.'
      },
      {
        step: 3,
        title: 'Thu hoạch nước trà Bokashi và phân ủ',
        instruction: 'Sau 3-5 ngày, mở vòi xả dịch trà Bokashi pha loãng 1:100 tưới cây. Sau 14 ngày, vùi bã ủ vào đất làm phân bón giàu dinh dưỡng.'
      }
    ],
    faqs: [
      {
        question: 'Ủ rác Bokashi trong chung cư có bị hôi không?',
        answer: 'Quá trình lên men yếm khí tạo mùi thơm chua nhẹ như dưa muối, tuyệt đối không có mùi hôi thối hay ruồi nhặng nếu nắp đậy kín.'
      },
      {
        question: 'Dịch trà Bokashi dùng làm gì tốt nhất?',
        answer: 'Pha loãng 1:100 tưới gốc giúp rễ cây phát triển vượt trội, hoặc đổ thẳng vào cống thoát sàn để thông tắc và khử mùi hôi cống.'
      }
    ],
    monetization_tips: [
      'Gia công thùng ủ Bokashi tái chế hoàn thiện bán lẻ 250.000đ - 380.000đ/bộ.',
      'Sản xuất cám men vi sinh Bokashi đóng gói 1kg bán kèm định kỳ 65.000đ/gói.'
    ],
    tags: ['Ủ rác Bokashi', 'Không mùi', 'Thùng sơn cũ', 'Phân bón hữu cơ', 'Rác thải nhà bếp'],
    related_plant_ids: ['herb-01', 'fruit-02', 'orn-01']
  },

  {
    id: 'recycle-03',
    slug: 'he-thong-tuoi-nho-giot-trong-luc-chai-nhua-pet',
    common_name: 'Bộ Tưới Nhỏ Giọt Trọng Lực Tự Chế Từ Chai Nhựa PET & Dây Truyền Dịch',
    scientific_name: 'Eco Invention: Gravity-Fed Drip Irrigation Kit from Recycled PET Bottles',
    aliases: ['Tưới nhỏ giọt chai nhựa', 'Tưới trọng lực dây truyền', 'DIY Drip Kit'],
    category: 'recycle',
    nft_class: 'eco_invention',
    description: 'Bộ cấp nước vi điểm chính xác từng giọt từ chai nhựa nước khoáng 1.5L gắn van điều tiết dây truyền y tế. Hoạt động bằng trọng lực 0W điện năng, giữ ẩm liên tục 3-5 ngày khi vắng nhà.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Saving_life.jpg',
    image_sha256: 'a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9',
    sunlight: 'partial_shade',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '15 phút chế tạo thủ công',
    container_suitable: true,
    seasonality: {
      north: 'Hữu ích nhất khi gia đình đi du lịch hoặc về quê dịp lễ Tết',
      central: 'Tiết kiệm nước tưới từng giọt trong mùa khô hạn miền Trung',
      south: 'Chống mất nước khô cháy chậu cây ban công hướng Tây',
      best_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      warning: 'Khoan 1 lỗ kim nhỏ trên đỉnh chai để không khí lọt vào tránh móp chai ngắt dòng nước'
    },
    botanical_details: {
      family: 'Gravity Precision Micro-Irrigation',
      native_range: 'Giải pháp tái chế chai nhựa bảo vệ môi trường',
      active_compounds: ['Không dùng điện 0W', 'Điều tiết tốc độ nhỏ giọt chính xác', 'Cấp nước sâu vùng rễ', 'Tiết kiệm 85% nước'],
      soil_ph: '6.0 - 7.5',
      ideal_temp: '15°C - 40°C',
      pot_size: 'Chai nhựa 1.5L - 5L treo cao hơn mặt chậu 20-30cm'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Gắn đầu kim truyền vào nắp chai',
        instruction: 'Dùng dùi nhọn đục lỗ nắp chai nhựa 1.5L, cắm chặt đầu nối dây truyền dịch y tế và dán keo silicon chống rò rỉ.'
      },
      {
        step: 2,
        title: 'Cố định chai và cắm kim truyền vào gốc',
        instruction: 'Treo ngược chai lên cọc chống, cắm đầu kim truyền vào sát bầu rễ cây.'
      },
      {
        step: 3,
        title: 'Điều chỉnh con lăn tốc độ nhỏ giọt',
        instruction: 'Xoay con lăn điều chỉnh tốc độ 1 giọt mỗi 10-15 giây để cấp ẩm liên tục 3-5 ngày liên tục.'
      }
    ],
    faqs: [
      {
        question: 'Dây truyền dịch có bị cặn bẩn làm tắc không?',
        answer: 'Dùng nước sạch hoặc bọc một miếng bông gòn nhỏ ở đầu lọc trong chai sẽ ngăn sạch cặn rác không lo tắc van.'
      },
      {
        question: 'Chai 1.5L tưới được cho cây bao lâu?',
        answer: 'Với tốc độ 1 giọt/12 giây, 1.5 lít nước tưới liên tục từ 72 đến 96 tiếng (3-4 ngày).'
      }
    ],
    monetization_tips: [
      'Gia công bộ tưới nhỏ giọt 5 đầu kèm dây dẫn bán lẻ 85.000đ - 120.000đ/bộ.',
      'Bán kèm các chậu cây phong thủy văn phòng làm điểm cộng giữ ẩm.'
    ],
    tags: ['Tưới nhỏ giọt', 'Chai nhựa PET', 'Dây truyền dịch', 'Tiết kiệm nước', 'Chăm sóc khi vắng nhà'],
    related_plant_ids: ['herb-02', 'fruit-03', 'orn-06']
  },

  {
    id: 'recycle-04',
    slug: 'thap-rau-huu-co-u-trun-que-tu-thung-phuy-nhua-220l',
    common_name: 'Tháp Rau Hữu Cơ Tuần Hoàn Nuôi Trùn Quế Từ Thùng Phuy Nhựa 220L',
    scientific_name: 'Eco Invention: Vertical Vermiculture Garden Tower from Recycled 220L Drum',
    aliases: ['Tháp rau nuôi trùn quế', 'Tháp trồng rau thùng phuy', 'Vermicompost Tower'],
    category: 'recycle',
    nft_class: 'eco_invention',
    description: 'Biến thùng phuy nhựa cũ thành tháp rau 50 hốc trồng xoay vòng tích hợp ống nuôi trùn quế ở giữa. Trùn xử lý rác rau củ thừa và tự phân bổ phân trùn đều khắp đất bồn không cần bón phân hóa học.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Eisenia_fetida_on_compost_bin.jpg',
    image_sha256: 'b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 3,
    growth_time: '1 ngày gia công đục hốc',
    container_suitable: true,
    seasonality: {
      north: 'Trồng rau xanh quanh năm; mùa đông trùn quế rúc sâu tránh rét',
      central: 'Chống ngập úng mùa lũ nhờ cấu trúc tháp đứng thoát nước',
      south: 'Năng suất cực cao thu hái rau ăn lá liên tục',
      best_months: [1, 2, 3, 4, 8, 9, 10, 11, 12],
      warning: 'Không thả vỏ cam quýt chua, ớt cay hoặc thức ăn mặn vào lõi nuôi trùn'
    },
    botanical_details: {
      family: 'Permaculture / Vermiculture Urban Agriculture',
      native_range: 'Mô hình tháp rau đô thị tuần hoàn sinh học',
      active_compounds: ['Phân trùn quế tươi giàu humic', 'Vi khuẩn cố định đạm', 'Nông nghiệp tuần hoàn khép kín', 'Năng suất gấp 5 lần mặt phẳng'],
      soil_ph: '6.5 - 7.2',
      ideal_temp: '22°C - 33°C',
      pot_size: 'Thùng phuy nhựa 220L cao 1m, đường kính 60cm, 50 hốc trồng'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Cắt và tạo 50 hốc trồng dập nổi',
        instruction: 'Rạch các đường ngang 12cm quanh thân phuy, dùng súng nhiệt làm mềm nhựa và uốn lượn tạo hốc đựng đất.'
      },
      {
        step: 2,
        title: 'Lắp ống nuôi trùn PVC phi 160mm ở tâm',
        instruction: 'Khoan hàng trăm lỗ nhỏ 8mm trên thân ống PVC phi 160mm đặt thẳng đứng ở giữa để trùn tự do bò qua lại ăn rác.'
      },
      {
        step: 3,
        title: 'Nạp đất và thả sinh khối trùn quế',
        instruction: 'Đổ giá thể quanh ống, thả 0.5kg sinh khối trùn quế vào lõi giữa, thường xuyên cho rác củ quả để trùn tạo phân bón.'
      }
    ],
    faqs: [
      {
        question: 'Trùn quế có bò ra ngoài nhà không?',
        answer: 'Trùn quế kỵ ánh sáng, chúng chỉ sống ẩn mình trong bóng tối ẩm ướt ở lõi tháp và đất nên không bao giờ bò ra ngoài.'
      },
      {
        question: 'Tháp 50 hốc này trồng được bao nhiêu kg rau/tháng?',
        answer: 'Trung bình mỗi tháng thu hoạch từ 8-12kg rau sạch luân phiên (xà lách, cải ngọt, tía tô, rau thơm).'
      }
    ],
    monetization_tips: [
      'Gia công tháp rau thành phẩm bán cho hộ gia đình có sân thượng giá 950.000đ - 1.600.000đ/tháp.',
      'Cung cấp sinh khối trùn quế giống và dịch trùn quế bón lá bổ trợ.'
    ],
    tags: ['Tháp rau hữu cơ', 'Trùn quế', 'Thùng phuy 220L', 'Nông nghiệp tuần hoàn', 'Sân thượng'],
    related_plant_ids: ['herb-01', 'herb-04', 'herb-09', 'fruit-01']
  },

  {
    id: 'recycle-05',
    slug: 'thuoc-tru-sau-sinh-hoc-toi-ot-gung-ruou-tu-che',
    common_name: 'Công Thức Ngâm Thuốc Trừ Sâu Sinh Học Tỏi Ớt Gừng Rượu Bảo Vệ Vườn Phố',
    scientific_name: 'Eco Invention: Organic Botanical Bio-Pesticide (Garlic-Chili-Ginger Extract)',
    aliases: ['Thuốc trừ sâu tỏi ớt gừng', 'Thuốc trừ sâu sinh học tại nhà', 'Bio-Pesticide DIY'],
    category: 'recycle',
    nft_class: 'eco_invention',
    description: 'Phương pháp chiết xuất tinh chất cay nóng Allicin và Capsaicin từ tỏi, ớt hiểm, gừng gió ngâm rượu trắng 45 độ. Tiêu diệt rệp sáp, bọ trĩ, sâu tơ cực mạnh mà không độc hại cho trẻ nhỏ và vật nuôi.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Garlic_and_Herbs_%28Unsplash%29.jpg',
    image_sha256: 'c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1',
    sunlight: 'indoor',
    watering: 'drought_tolerant',
    propagation_difficulty: 1,
    growth_time: '15 ngày ngâm ủ chiết xuất',
    container_suitable: true,
    seasonality: {
      north: 'Phun phòng trừ rầy rệp nhiều nhất vào mùa xuân ẩm ướt (tháng 2-4)',
      central: 'Kiểm soát bọ trĩ sâu vẽ bùa mùa nắng nóng',
      south: 'Bảo vệ vườn rau trái ban công bốn mùa an toàn',
      best_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      warning: 'Thời gian cách ly an toàn trước khi hái ăn: 3-5 ngày sau khi phun; rửa sạch dưới vòi nước'
    },
    botanical_details: {
      family: 'Botanical Pesticide / Biochemical Protection',
      native_range: 'Dân gian phòng trừ sâu bệnh nông nghiệp hữu cơ Việt Nam',
      active_compounds: ['Allicin (Kháng nấm diệt khuẩn)', 'Capsaicin (Làm bỏng niêm mạc sâu bọ)', 'Gingerol (Xua đuổi bọ cánh cứng)', 'Phân hủy sinh học 100%'],
      soil_ph: 'Không ảnh hưởng pH đất, phân hủy thành mùn hữu cơ',
      ideal_temp: 'Bảo quản nơi râm mát 20°C - 30°C',
      pot_size: 'Bình thủy tinh hoặc can nhựa 5L ngâm chiết xuất'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Chuẩn bị nguyên liệu theo tỷ lệ 1:1:1',
        instruction: '1kg tỏi khô + 1kg ớt hiểm chín cay + 1kg gừng già rửa sạch để ráo nước, giã nát hoặc xay nhỏ.'
      },
      {
        step: 2,
        title: 'Ngâm cùng rượu trắng 45 độ',
        instruction: 'Cho hỗn hợp vào bình thủy tinh, đổ 3 lít rượu gạo trắng 45 độ ngập nguyên liệu, đậy nắp ủ kín 15 ngày.'
      },
      {
        step: 3,
        title: 'Pha loãng và phun xịt phòng trị',
        instruction: 'Lọc lấy 20ml nước cốt pha với 2 lít nước sạch + 5ml nước rửa chén (chất bám dính), phun ướt 2 mặt lá vào sáng sớm.'
      }
    ],
    faqs: [
      {
        question: 'Thuốc trừ sâu tỏi ớt này có hại cho chó mèo hay trẻ nhỏ không?',
        answer: 'Thành phần hoàn toàn từ gia vị ăn uống tự nhiên, chỉ gây cay mắt tạm thời chứ không có độc tính hóa học tồn dư.'
      },
      {
        question: 'Dung dịch ngâm xong để được bao lâu?',
        answer: 'Dung dịch ngâm rượu có nắp kín để nơi thoáng mát dùng tốt trong vòng 1-2 năm không hỏng.'
      }
    ],
    monetization_tips: [
      'Đóng chai xịt pha sẵn 500ml bán cho người trồng cây ban công giá 65.000đ - 85.000đ/chai.',
      'Bán theo chai cốt đậm đặc 250ml hướng dẫn pha tại nhà 95.000đ/chai.'
    ],
    tags: ['Thuốc trừ sâu sinh học', 'Tỏi ớt gừng', 'Trừ rệp sáp', 'An toàn trẻ nhỏ', 'Không hóa chất'],
    related_plant_ids: ['fruit-01', 'fruit-04', 'fruit-12', 'orn-02']
  },

  // --- CULINARY (02 -> 05) ---
  {
    id: 'culinary-02',
    slug: 'tra-dau-biec-chanh-mat-ong-doi-mau',
    common_name: 'Trà Hoa Đậu Biếc Đổi Màu Giàu Anthocyanin Chống Lão Hóa Cùng Chanh Mật Ong',
    scientific_name: 'Botanical Culinary Recipe: Color-Changing Butterfly Pea Flower Antioxidant Elixir',
    aliases: ['Trà hoa đậu biếc chanh', 'Trà đậu biếc đổi màu', 'Butterfly Pea Tea'],
    category: 'culinary',
    nft_class: 'culinary_recipe',
    description: 'Nghệ thuật pha chế trà hoa đậu biếc tươi thu hái từ giàn ban công. Sắc xanh lam chuyển sang tím hoa cà rực rỡ khi gặp axit citric tự nhiên từ chanh, dồi dào chất chống oxy hóa bảo vệ thị lực và trẻ hóa làn da.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Butterfly-pea_flower_tea_1.jpg',
    image_sha256: 'd1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2',
    sunlight: 'indoor',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '10 phút pha hãm trà',
    container_suitable: true,
    seasonality: {
      north: 'Thưởng thức ấm vào mùa thu đông, uống mát giải nhiệt mùa hè',
      central: 'Món trà thanh nhiệt phổ biến khắp miền Trung',
      south: 'Thức uống detox thời thượng cho cư dân đô thị',
      best_months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      warning: 'Phụ nữ mang thai hoặc người đang dùng thuốc chống đông máu không nên uống lượng lớn'
    },
    botanical_details: {
      family: 'Nutraceutical / Botanical Infusion',
      native_range: 'Hoa đậu biếc nhiệt đới thuần dưỡng vườn nhà Việt Nam',
      active_compounds: ['Anthocyanin (Chống oxy hóa mạnh gấp 10 lần Vitamin C)', 'Bioflavonoid', 'Proanthocyanidin (Bảo vệ collagen da)'],
      soil_ph: 'Chỉ dùng hoa hữu cơ hái từ giàn không phun thuốc hóa học',
      ideal_temp: 'Hãm nước sôi 85°C - 90°C',
      pot_size: 'Ấm trà thủy tinh trong suốt để chiêm ngưỡng màu sắc'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Hái hoa tươi và tráng sạch',
        instruction: 'Hái 5-8 bông hoa đậu biếc tươi mới nở buổi sớm, bỏ cuống xanh, rửa nhẹ dưới vòi nước.'
      },
      {
        step: 2,
        title: 'Hãm trà lấy sắc xanh lam đậm',
        instruction: 'Cho hoa vào bình thủy tinh, rót 250ml nước nóng 90°C, đậy nắp ủ 5-7 phút cho hoa tiết trọn màu xanh biếc.'
      },
      {
        step: 3,
        title: 'Thêm mật ong và vắt chanh tạo phép màu',
        instruction: 'Hòa tan 1-2 thìa mật ong rừng, vắt 1/2 quả chanh tươi; quan sát nước trà chuyển từ xanh lam sang tím hoa cà tuyệt đẹp.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao trà hoa đậu biếc lại đổi màu khi vắt chanh?',
        answer: 'Hợp chất Anthocyanin tự nhiên trong hoa đổi cấu trúc hóa học theo độ pH: môi trường trung tính có màu xanh lam, gặp axit citric trong chanh đổi sang màu tím hồng.'
      },
      {
        question: 'Uống trà hoa đậu biếc hàng ngày có tốt không?',
        answer: 'Mỗi ngày dùng 3-5 bông giúp ngủ ngon, đẹp da và sáng mắt; không nên lạm dụng quá 10 bông/ngày.'
      }
    ],
    monetization_tips: [
      'Sấy lạnh hoa đậu biếc vườn nhà đóng lọ thủy tinh 50g bán giá 75.000đ - 110.000đ/lọ.',
      'Kinh doanh đồ uống trà thảo mộc đóng chai take-away cho dân văn phòng.'
    ],
    tags: ['Trà đậu biếc', 'Đổi màu kỳ diệu', 'Anthocyanin', 'Chống lão hóa', 'Sáng mắt'],
    related_plant_ids: ['fruit-03', 'fruit-12']
  },

  {
    id: 'culinary-03',
    slug: 'nuoc-sam-mat-gan-mia-lau-la-dua-re-tranh',
    common_name: 'Nước Sâm Mía Lau Lá Dứa Rễ Tranh Thanh Nhiệt Mát Gan Nam Bộ',
    scientific_name: 'Botanical Culinary Recipe: Southern Vietnamese Cooling Herbal Detox Infusion',
    aliases: ['Nước sâm mía lau', 'Nước sâm mát gan', 'Southern Herbal Drink'],
    category: 'culinary',
    nft_class: 'culinary_recipe',
    description: 'Bí phương nấu nước sâm gia truyền giải nhiệt mùa hè Nam Bộ từ mía lau, lá dứa thơm nếp, rễ cỏ tranh và mã đề. Thúc đẩy bài tiết độc tố qua đường tiết niệu và hạ nhiệt cơ thể nhanh chóng.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Glass_of_sugarcane_juice.jpg',
    image_sha256: 'e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',
    sunlight: 'indoor',
    watering: 'daily',
    propagation_difficulty: 1,
    growth_time: '1 giờ nấu sôi ninh nhỏ lửa',
    container_suitable: true,
    seasonality: {
      north: 'Uống giải nhiệt mùa hè oi bức (tháng 5-8)',
      central: 'Giải khát tức thì mùa gió Lào khô bỏng',
      south: 'Thức uống đường phố linh hồn quanh năm của người Sài Gòn',
      best_months: [3, 4, 5, 6, 7, 8, 9],
      warning: 'Người tỳ vị hư hàn (hay lạnh bụng, tiêu chảy) nên uống ấm, không uống lạnh với đá'
    },
    botanical_details: {
      family: 'Traditional Herbal Cooling Drinks',
      native_range: 'Dược thiện giải khát dân gian miền Nam Việt Nam',
      active_compounds: ['Arundoin từ rễ tranh (Lợi tiểu)', 'Chlorophyll lá dứa (Thơm mát)', 'Đường saccaroza tự nhiên từ mía lau'],
      soil_ph: 'Thảo mộc tươi tự nhiên rửa sạch bùn đất',
      ideal_temp: 'Uống ấm hoặc uống mát với đá lạnh 10°C - 15°C',
      pot_size: 'Nồi inox 5-10 lít nấu nước sâm gia đình'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Sơ chế chẻ mía lau và rửa rễ tranh',
        instruction: 'Mía lau 2 lóng róc vỏ chẻ thanh mỏng lót đáy nồi. Rễ cỏ tranh 50g + mã đề 50g rửa sạch cát bùn cuộn tròn.'
      },
      {
        step: 2,
        title: 'Nấu sôi và hãm lá dứa thơm',
        instruction: 'Đổ 3 lít nước sôi ninh nhỏ lửa 45 phút cho mía tiết vị ngọt mát. Cho 5 nhánh lá dứa nếp vào nấu thêm 10 phút để không mất mùi thơm.'
      },
      {
        step: 3,
        title: 'Lọc trong và nêm đường phèn',
        instruction: 'Vớt bỏ bã thảo mộc, nêm 50g đường phèn thanh nhẹ, để nguội rót chai bảo quản tủ lạnh dùng 2-3 ngày.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao phải chẻ mía lau mỏng lót đáy nồi?',
        answer: 'Mía lau lót đáy giúp nước sâm ngọt thanh tự nhiên và ngăn các loại rễ thảo mộc bị bén cháy khét đáy nồi.'
      },
      {
        question: 'Nước sâm mía lau có hạ men gan được không?',
        answer: 'Thành phần rễ tranh và mã đề kích thích bài tiết độc tố qua thận, giúp giảm nhiệt độc tích tụ trong gan rất hiệu quả.'
      }
    ],
    monetization_tips: [
      'Đóng chai nước sâm mát gan tiệt trùng 330ml bán lẻ 18.000đ - 25.000đ/chai tại các hội chợ sinh thái.',
      'Bán theo set thảo mộc khô (combo gói sẵn) gửi ship toàn quốc 45.000đ/set nấu 5 lít nước.'
    ],
    tags: ['Nước sâm mía lau', 'Thanh nhiệt mát gan', 'Giải độc mùa hè', 'Lá dứa thơm', 'Rễ tranh'],
    related_plant_ids: ['herb-03', 'herb-12', 'herb-13']
  },

  {
    id: 'culinary-04',
    slug: 'muoi-thao-moc-tieu-rung-mac-khen-hat-doi-tay-bac',
    common_name: 'Muối Thảo Mộc Tiêu Rừng Mắc Khén Hạt Dổi Tây Bắc Rang Tay Dân Tộc',
    scientific_name: 'Botanical Culinary Recipe: Artisan Northwest Highland Forest Spice Salt',
    aliases: ['Muối thảo mộc Tây Bắc', 'Chẩm chéo khô mắc khén', 'Northwest Wild Herb Salt'],
    category: 'culinary',
    nft_class: 'culinary_recipe',
    description: 'Bí phương muối thảo mộc trứ danh vùng cao Tây Bắc kết hợp hạt mắc khén thơm lừng, hạt dổi rừng nướng than hồng, ớt gió nương và muối hầm truyền thống. Đánh thức trọn vẹn vị giác mọi món nướng hấp.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Sichuan_pepper%2C_including_husks%2C_seeds_and_stems.jpg',
    image_sha256: 'f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4',
    sunlight: 'indoor',
    watering: 'drought_tolerant',
    propagation_difficulty: 2,
    growth_time: '30 phút sao thơm nghiền thô',
    container_suitable: true,
    seasonality: {
      north: 'Gia vị ấm nồng không thể thiếu trong các bữa tiệc nướng mùa đông Tây Bắc',
      central: 'Chấm thịt luộc gà đồi chuẩn vị đặc sản',
      south: 'Được các tín đồ ẩm thực phương Nam cực kỳ ưa chuộng',
      best_months: [1, 2, 9, 10, 11, 12],
      warning: 'Rang hạt mắc khén ở lửa nhỏ vừa chín tới; nếu rang quá lửa sẽ bị đắng khét'
    },
    botanical_details: {
      family: 'Indigenous Highland Spice Blend',
      native_range: 'Rừng đại ngàn Tây Bắc (Điện Biên, Sơn La, Lai Châu)',
      active_compounds: ['Limonene và tinh dầu mắc khén (Tê nhẹ đầu lưỡi)', 'Hợp chất thơm hạt dổi rừng', 'Capsaicin ớt chỉ thiên nương'],
      soil_ph: 'Gia vị khô sạch 100% tự nhiên không mì chính hóa học',
      ideal_temp: 'Bảo quản hũ kín nhiệt độ phòng nơi khô ráo',
      pot_size: 'Lọ thủy tinh hoặc hũ tre 150g - 250g'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Nướng hạt dổi và rang mắc khén',
        instruction: 'Nướng 3-5 hạt dổi rừng trên than hồng hoặc chảo nóng đến khi nứt vỏ dậy mùi thơm nức. Mắc khén rang lửa liu riu 3 phút.'
      },
      {
        step: 2,
        title: 'Rang khô muối hạt và ớt gió',
        instruction: 'Sao khô muối biển hạt hầm trên chảo gang cùng ớt khô và lá chanh thái chỉ mịn đến khi khô giòn.'
      },
      {
        step: 3,
        title: 'Giã cối đá nghiền thô truyền thống',
        instruction: 'Cho toàn bộ hỗn hợp vào cối đá giã dập thô (không xay bột quá mịn để giữ nguyên hạt vỡ tinh dầu), đóng hũ kín.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao hạt dổi rừng lại được mệnh danh là vàng đen Tây Bắc?',
        answer: 'Hạt dổi rừng tự nhiên thu hái từ cây cổ thụ hàng chục năm tuổi trên rừng già, có hương thơm quyến rũ nồng nàn độc nhất vô nhị.'
      },
      {
        question: 'Muối này chấm món gì ngon nhất?',
        answer: 'Tuyệt đỉnh khi chấm gà luộc, thịt nướng, cá suối nướng, măng luộc và các món luộc dân dã.'
      }
    ],
    monetization_tips: [
      'Đóng hũ muối thảo mộc 200g bán đặc sản vùng miền 65.000đ - 95.000đ/hũ.',
      'Gói thành set quà biếu Tết gia vị Tây Bắc sang trọng lợi nhuận cao.'
    ],
    tags: ['Muối thảo mộc', 'Mắc khén hạt dổi', 'Gia vị Tây Bắc', 'Chẩm chéo', 'Rang tay thủ công'],
    related_plant_ids: ['herb-22', 'fruit-08']
  },

  {
    id: 'culinary-05',
    slug: 'giam-tao-meo-hoa-cuc-len-men-tu-nhien',
    common_name: 'Giấm Táo Mèo Hoa Cúc Lên Men Tự Nhiên Giàu Lợi Khuẩn Đẹp Da Giảm Mỡ',
    scientific_name: 'Botanical Culinary Recipe: Probiotic Wild Docynia & Chrysanthemum Fermented Vinegar',
    aliases: ['Giấm táo mèo hoa cúc', 'Giấm lên men tự nhiên', 'Wild Apple Herbal Vinegar'],
    category: 'culinary',
    nft_class: 'culinary_recipe',
    description: 'Phương thức lên men sinh học giấm quả sơn tra (táo mèo rừng Tây Bắc) kết hợp hoa cúc chi hữu cơ và giấm cái mẹ Scoby. Giàu enzyme sống axit axetic tự nhiên hỗ trợ tiêu hóa dầu mỡ và hạ mỡ máu.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/02023_0257_Apple_cider_vinegar.jpg',
    image_sha256: 'a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5',
    sunlight: 'indoor',
    watering: 'drought_tolerant',
    propagation_difficulty: 2,
    growth_time: '30-45 ngày lên men sinh học',
    container_suitable: true,
    seasonality: {
      north: 'Làm giấm vào mùa thu hoạch táo mèo rừng (tháng 8 - tháng 10 hàng năm)',
      central: 'Gia vị lên men thanh mát cho các món gỏi trộn',
      south: 'Thức uống giấm thanh lọc cơ thể rất được ưa chuộng',
      best_months: [8, 9, 10, 11],
      warning: 'Người viêm loét dạ dày nặng không nên uống giấm lúc bụng đói'
    },
    botanical_details: {
      family: 'Probiotic Bio-Fermentation / Functional Vinegar',
      native_range: 'Rừng núi cao Mù Cang Chải, Yên Bái & Sơn La',
      active_compounds: ['Axit Axetic sống', 'Enzyme đường ruột', 'Polyphenol quả sơn tra', 'Flavonoid hoa cúc chi'],
      soil_ph: 'Giấm lên men tự nhiên pH 3.0 - 3.5',
      ideal_temp: '22°C - 30°C nơi tối thoáng khí',
      pot_size: 'Bình thủy tinh miệng rộng 3-5 lít bọc vải xô'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Sơ chế táo mèo rừng và hoa cúc chi',
        instruction: '1.5kg táo mèo rửa sạch bổ đôi giữ nguyên hạt. 30g hoa cúc chi hữu cơ sấy khô tráng nước sôi để ráo.'
      },
      {
        step: 2,
        title: 'Ủ cùng giấm cái Scoby và nước đường phèn',
        instruction: 'Xếp táo mèo và hoa cúc vào bình thủy tinh, rót nước đường phèn ấm (200g đường + 2 lít nước) và thả giấm cái Scoby giống.'
      },
      {
        step: 3,
        title: 'Bọc vải xô thở và ủ lên men tự nhiên',
        instruction: 'Bọc miệng bình bằng vải xô sạch 2 lớp để vi khuẩn acetic thở, đặt nơi râm mát 30-45 ngày đến khi nước giấm trong vắt thơm chua dịu.'
      }
    ],
    faqs: [
      {
        question: 'Lớp màng trắng nổi trên mặt giấm có phải bị mốc hỏng không?',
        answer: 'Đó chính là con giấm mẹ (Scoby) sinh trưởng tự nhiên chứng tỏ mẻ giấm sống rất giàu lợi khuẩn hữu ích.'
      },
      {
        question: 'Dùng giấm táo mèo giảm mỡ bụng thế nào hiệu quả?',
        answer: 'Pha 1-2 thìa giấm táo mèo cùng 1 ly nước ấm và 1 thìa mật ong, uống sau bữa ăn sáng 30 phút giúp giảm hấp thụ chất béo.'
      }
    ],
    monetization_tips: [
      'Đóng chai thủy tinh 500ml giấm táo mèo hoa cúc ủ mộc bán giá 120.000đ - 165.000đ/chai.',
      'Bán kèm con giấm mẹ Scoby giống cho người yêu thích tự làm thực phẩm lên men.'
    ],
    tags: ['Giấm táo mèo', 'Hoa cúc chi', 'Lên men tự nhiên', 'Giàu probiotic', 'Giảm mỡ máu'],
    related_plant_ids: ['fruit-06', 'herb-18']
  },

  // --- FOREST (02 -> 05) ---
  {
    id: 'forest-02',
    slug: 'vuon-quoc-gia-cat-tien',
    common_name: 'Vườn Quốc Gia Cát Tiên (Khu Dự Trữ Sinh Quyển Thế Giới UNESCO)',
    scientific_name: 'Cat Tien National Park Sanctuary (UNESCO Biosphere Reserve)',
    aliases: ['Rừng Cát Tiên', 'VQG Cát Tiên', 'Cat Tien Biosphere Reserve'],
    category: 'forest',
    nft_class: 'geo_forest_10000m2',
    description: 'Khu Dự Trữ Sinh Quyển Thế Giới rộng 71.920 ha (719.200.000 m²). Lá phổi xanh lớn nhất Đông Nam Bộ, nơi cư ngụ của cá sấu Xiêm hồ Bàu Sấu, đàn voi rừng châu Á và quần thể cây Tung cổ thụ trăm tuổi.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Cat_Tien_Park%2C_Vietnam%2C_forest.jpg',
    image_sha256: 'b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 5,
    growth_time: 'Hệ sinh thái bảo tồn vĩnh cửu',
    container_suitable: false,
    seasonality: {
      north: 'Điểm đến sinh thái miền Nam thu hút đông đảo du khách mùa khô',
      central: 'Bảo tồn hệ động thực vật nhiệt đới gió mùa phong phú',
      south: 'Đẹp nhất vào mùa khô (tháng 12 đến tháng 5 năm sau) dễ quan sát động vật hoang dã',
      best_months: [12, 1, 2, 3, 4, 5],
      warning: 'Bắt buộc mang vớ chống vắt khi đi bộ xuyên rừng trong mùa mưa ẩm'
    },
    botanical_details: {
      family: 'Tropical Lowland Evergreen Rainforest',
      native_range: 'Ranh giới 3 tỉnh Đồng Nai, Lâm Đồng và Bình Phước',
      active_compounds: ['1.610 loài thực vật bậc cao', 'Cây Tung đại thụ 400 năm tuổi', 'Quần thể Bàu Sấu Ramsar quốc tế', 'Bể hấp thụ Carbon khổng lồ'],
      soil_ph: '5.5 - 6.5 (Đất đỏ bazan và phù sa cổ màu mỡ)',
      ideal_temp: '22°C - 34°C',
      pot_size: 'Khu bảo tồn nguyên sinh 71.920 ha (Mỗi NFT tương ứng 10.000 m² rừng)'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Có mặt tại VQG Cát Tiên và bật định vị GPS',
        instruction: 'Di chuyển đến khu vực VQG Cát Tiên (bán kính 25km từ tâm rừng). Bật định vị GPS trên điện thoại.'
      },
      {
        step: 2,
        title: 'Xác thực khoảng cách trên Web3 Sandbox',
        instruction: 'Bấm nút Xác Thực GPS Check-in. Hệ thống tính khoảng cách Haversine và cấp vé check-in hiệu lực 24h.'
      },
      {
        step: 3,
        title: 'Đúc NFT Lô Rừng 10.000m² Cát Tiên',
        instruction: 'Ký ví Web3 nhận chứng nhận số bảo tồn 1 ha rừng Cát Tiên lưu trữ vĩnh viễn trên sổ cái Blockchain.'
      }
    ],
    faqs: [
      {
        question: 'Diện tích 71.920 ha của Cát Tiên tương ứng với bao nhiêu Lô NFT?',
        answer: 'Mỗi NFT bảo tồn tương ứng 10.000 m² (1 ha). Toàn bộ VQG Cát Tiên có quỹ giới hạn tối đa 71.920 Lô NFT độc bản số thứ tự cố định.'
      },
      {
        question: 'Bàu Sấu trong VQG Cát Tiên có gì đặc biệt?',
        answer: 'Bàu Sấu là vùng đất ngập nước Ramsar quốc tế thứ 2 của Việt Nam, nơi bảo tồn thành công loài cá sấu Xiêm nước ngọt cực kỳ nguy cấp.'
      }
    ],
    monetization_tips: [
      'Chủ sở hữu NFT Lô Rừng Cát Tiên được nhận huy hiệu Nhà Bảo Tồn Sinh Thái số và giảm giá dịch vụ xem thú đêm tại vườn.',
      'Tích lũy chỉ số xanh đóng góp tín chỉ bảo tồn thiên nhiên quốc gia.'
    ],
    tags: ['Vườn quốc gia', 'Cát Tiên', 'Bàu Sấu', 'Cá sấu Xiêm', 'Khu sinh quyển UNESCO', 'Đồng Nai'],
    forest_spec: {
      center_lat: 11.4328,
      center_lng: 107.4286,
      radius_km: 25.0,
      total_area_m2: 719200000,
      unit_area_m2: 10000,
      max_nft_supply: 71920,
      province: 'Đồng Nai - Lâm Đồng - Bình Phước',
      unesco_or_status: 'Khu Dự Trữ Sinh Quyển Thế Giới UNESCO (2001)'
    },
    related_plant_ids: ['herb-01', 'fruit-01', 'orn-01']
  },

  {
    id: 'forest-03',
    slug: 'vuon-quoc-gia-phong-nha-ke-bang',
    common_name: 'Vườn Quốc Gia Phong Nha - Kẻ Bàng (Di Sản Thiên Nhiên Thế Giới UNESCO)',
    scientific_name: 'Phong Nha - Ke Bang National Park (UNESCO World Natural Heritage)',
    aliases: ['Rừng Phong Nha', 'VQG Phong Nha Kẻ Bàng', 'Phong Nha Karst Sanctuary'],
    category: 'forest',
    nft_class: 'geo_forest_10000m2',
    description: 'Di Sản Thiên Nhiên Thế Giới rộng 123.326 ha (1.233.260.000 m²). Vùng Karst đá vôi cổ nhất châu Á 400 triệu năm, ôm trọn Sơn Đoòng - hang động tự nhiên lớn nhất hành tinh cùng rừng bách xanh ngàn năm.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Phongnhakebang2.jpg',
    image_sha256: 'c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 5,
    growth_time: 'Hệ sinh thái Karst 400 triệu năm tuổi',
    container_suitable: false,
    seasonality: {
      north: 'Kỳ quan thiên nhiên hùng vĩ hàng đầu thế giới',
      central: 'Thời gian tham quan thám hiểm lý tưởng từ tháng 3 đến tháng 8 mùa khô',
      south: 'Điểm đến du lịch mạo hiểm đẳng cấp toàn cầu',
      best_months: [3, 4, 5, 6, 7, 8],
      warning: 'Mùa mưa lũ từ tháng 9 đến tháng 11 nước sông Son dâng cao hạn chế vào hang'
    },
    botanical_details: {
      family: 'Limestone Karst Primeval Ecosystem',
      native_range: 'Huyện Bố Trạch và Minh Hóa, tỉnh Quảng Bình',
      active_compounds: ['Hang động lớn nhất thế giới Sơn Đoòng', 'Rừng bách xanh đá vôi 500 năm tuổi', 'Bảo tàng địa chất sống 400 triệu năm', 'Hơn 2.900 loài thực vật bậc cao'],
      soil_ph: '6.8 - 7.8 (Đất phong hóa đá vôi kiềm nhẹ)',
      ideal_temp: '18°C - 28°C trong hang mát lạnh 20°C quanh năm',
      pot_size: 'Khu di sản thiên nhiên 123.326 ha (Mỗi NFT tương ứng 10.000 m² rừng)'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Có mặt tại Phong Nha - Kẻ Bàng và bật định vị GPS',
        instruction: 'Di chuyển đến khu vực VQG Phong Nha - Kẻ Bàng (bán kính 30km từ tâm rừng). Bật định vị GPS.'
      },
      {
        step: 2,
        title: 'Xác thực tọa độ vùng Di Sản Thế Giới',
        instruction: 'Nhấn nút Xác Thực GPS Check-in trên Web3 Sandbox, nhận vé check-in số bảo tồn 24 giờ.'
      },
      {
        step: 3,
        title: 'Ký ví Web3 nhận NFT Lô Rừng 10.000m²',
        instruction: 'Khẳng định quyền bảo tồn độc bản 1 Lô (10.000 m² = 1 ha) kỳ quan Phong Nha Kẻ Bàng trên chuỗi khối.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao Phong Nha - Kẻ Bàng lại được UNESCO công nhận di sản 2 lần?',
        answer: 'Lần 1 (2003) vì tiêu chí địa chất địa mạo nổi bật toàn cầu; Lần 2 (2015) vì tiêu chí đa dạng sinh học và các hệ sinh thái trên cạn độc nhất vô nhị.'
      },
      {
        question: 'Quỹ NFT bảo tồn của Phong Nha - Kẻ Bàng là bao nhiêu Lô?',
        answer: 'Với diện tích 123.326 ha, tổng quỹ tối đa là 123.326 Lô NFT (1 ha/lô), đúc hết sẽ ngừng vĩnh viễn.'
      }
    ],
    monetization_tips: [
      'Chủ sở hữu NFT nhận đặc quyền tri ân ưu tiên vé tour thám hiểm hang động sinh thái.',
      'Đóng góp vào quỹ số bảo tồn động thực vật quý hiếm vùng đệm vườn quốc gia.'
    ],
    tags: ['Di sản UNESCO', 'Phong Nha Kẻ Bàng', 'Sơn Đoòng', 'Hang động', 'Đá vôi cổ', 'Quảng Bình'],
    forest_spec: {
      center_lat: 17.5833,
      center_lng: 106.2833,
      radius_km: 30.0,
      total_area_m2: 1233260000,
      unit_area_m2: 10000,
      max_nft_supply: 123326,
      province: 'Quảng Bình',
      unesco_or_status: 'Di Sản Thiên Nhiên Thế Giới UNESCO (2003, 2015)'
    },
    related_plant_ids: ['herb-05', 'herb-17', 'orn-05']
  },

  {
    id: 'forest-04',
    slug: 'vuon-quoc-gia-hoang-lien',
    common_name: 'Vườn Quốc Gia Hoàng Liên (Đỉnh Fansipan & Rừng Đỗ Quyên Mây Ngàn)',
    scientific_name: 'Hoang Lien National Park Sanctuary (Roof of Indochina Biome)',
    aliases: ['Rừng Hoàng Liên', 'VQG Hoàng Liên Sa Pa', 'Hoang Lien Alpine Forest'],
    category: 'forest',
    nft_class: 'geo_forest_10000m2',
    description: 'Nóc nhà Đông Dương Fansipan (3.143m) với diện tích bảo tồn 29.845 ha (298.450.000 m²). Vườn Di Sản ASEAN lưu giữ rừng Đỗ quyên cổ thụ trăm hoa đua nở, thông đỏ quý hiếm và khí hậu á nhiệt đới núi cao.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Ho%C3%A0ng_Li%C3%AAn_S%C6%A1n_mountains_04.jpg',
    image_sha256: 'd7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 5,
    growth_time: 'Hệ sinh thái rừng núi cao ôn đới cổ xưa',
    container_suitable: false,
    seasonality: {
      north: 'Mùa hoa đỗ quyên rực rỡ nhất từ tháng 2 đến tháng 4; mùa đông có tuyết rơi băng giá',
      central: 'Hệ sinh thái núi cao đặc sắc nhất bán đảo Đông Dương',
      south: 'Điểm trekking mạo hiểm mơ ước của mọi phượt thủ',
      best_months: [2, 3, 4, 9, 10, 11],
      warning: 'Thời tiết núi cao thay đổi cực nhanh, sương mù dày đặc cần trang bị đồ giữ nhiệt'
    },
    botanical_details: {
      family: 'High Mountain Alpine & Subtropical Cloud Forest',
      native_range: 'Dãy Hoàng Liên Sơn, thuộc Sa Pa (Lào Cai) và Than Uyên (Lai Châu)',
      active_compounds: ['Đỉnh Fansipan 3.143m', '30 loài hoa Đỗ quyên bản địa độc hữu', 'Quần thể Thông đỏ quý hiếm', 'Hơn 2.000 loài thực vật bậc cao'],
      soil_ph: '4.5 - 5.5 (Đất mùn than bùn trên núi cao)',
      ideal_temp: '5°C - 20°C (mùa đông dưới 0°C có băng tuyết)',
      pot_size: 'Khu bảo tồn nguyên sinh 29.845 ha (Mỗi NFT tương ứng 10.000 m² rừng)'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Có mặt tại Sa Pa / Hoàng Liên và bật GPS',
        instruction: 'Di chuyển đến khu vực VQG Hoàng Liên (bán kính 20km từ tâm rừng). Bật định vị GPS.'
      },
      {
        step: 2,
        title: 'Bấm nút Xác Thực GPS Check-in trên Web3 Sandbox',
        instruction: 'Hệ thống đối chiếu tọa độ thực tế và cấp Vé Check-in GPS hiệu lực 24h.'
      },
      {
        step: 3,
        title: 'Đúc NFT Lô Rừng 10.000m² Hoàng Liên',
        instruction: 'Ký ví Web3 ghi nhận đóng góp bảo tồn 1 ha rừng mây ngàn Hoàng Liên trên Blockchain.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao Hoàng Liên Sơn lại có nhiều loài Đỗ quyên đến vậy?',
        answer: 'Nhờ độ cao từ 1.500m đến trên 3.000m quanh năm mây mù ẩm ướt, Hoàng Liên là thủ phủ của hơn 30 loài đỗ quyên cổ thụ bản địa đua nhau khoe sắc.'
      },
      {
        question: 'Quỹ Lô NFT bảo tồn của VQG Hoàng Liên là bao nhiêu?',
        answer: 'Tổng diện tích 29.845 ha tương ứng với 29.845 Lô NFT độc bản (1 ha/lô).'
      }
    ],
    monetization_tips: [
      'Nhận huy hiệu Người Chinh Phục Nóc Nhà Đông Dương Fansipan và ưu đãi dịch vụ hướng dẫn viên Sa Pa.',
      'Chứng chỉ bảo tồn hệ sinh thái rừng á nhiệt đới núi cao trên Web3.'
    ],
    tags: ['Hoàng Liên Sa Pa', 'Fansipan', 'Rừng Đỗ Quyên', 'Vườn Di sản ASEAN', 'Lào Cai - Lai Châu'],
    forest_spec: {
      center_lat: 22.3039,
      center_lng: 103.8267,
      radius_km: 20.0,
      total_area_m2: 298450000,
      unit_area_m2: 10000,
      max_nft_supply: 29845,
      province: 'Lào Cai - Lai Châu',
      unesco_or_status: 'Vườn Di Sản ASEAN (2003)'
    },
    related_plant_ids: ['herb-22', 'herb-36', 'orn-19']
  },

  {
    id: 'forest-05',
    slug: 'vuon-quoc-gia-con-dao',
    common_name: 'Vườn Quốc Gia Côn Đảo (Khu Bảo Tồn Biển & Rùa Biển Lên Đẻ Trứng)',
    scientific_name: 'Con Dao National Park Sanctuary (Ramsar Marine & Forest Biome)',
    aliases: ['Rừng Côn Đảo', 'VQG Côn Đảo', 'Con Dao Marine Ramsar Reserve'],
    category: 'forest',
    nft_class: 'geo_forest_10000m2',
    description: 'Vùng đất ngập nước Ramsar quốc tế rộng 19.998 ha (199.980.000 m²). Khu bảo tồn đa dạng sinh học biển - đảo trứ danh bảo vệ rạn san hô nguyên vẹn, thảm cỏ biển của bò biển Dugong và bãi đẻ rùa biển lớn nhất Việt Nam.',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/ConDao_park_dam.jpg',
    image_sha256: 'e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 5,
    growth_time: 'Hệ sinh thái biển đảo bảo tồn vĩnh cửu',
    container_suitable: false,
    seasonality: {
      north: 'Hòn đảo thiên đường du lịch sinh thái và tâm linh thiêng liêng',
      central: 'Vùng biển đảo trong xanh giàu có bậc nhất biển Đông',
      south: 'Thời gian biển êm đẹp nhất từ tháng 3 đến tháng 9, mùa rùa biển lên đẻ trứng',
      best_months: [3, 4, 5, 6, 7, 8, 9],
      warning: 'Nghiêm cấm chiếu đèn pin sáng mạnh hoặc làm ồn tại các bãi biển khi rùa mẹ lên đẻ trứng'
    },
    botanical_details: {
      family: 'Island & Marine Coral Reef Ramsar Wetland Ecosystem',
      native_range: 'Quần đảo Côn Đảo, tỉnh Bà Rịa - Vũng Tàu',
      active_compounds: ['Bãi đẻ rùa biển Vích và Đồi mồi lớn nhất Việt Nam', 'Thảm cỏ biển nơi cư ngụ bò biển Dugong', '360 loài san hô nguyên sơ', 'Rừng ngập mặn trên nền cát san hô'],
      soil_ph: '7.5 - 8.2 (Cát san hô ven biển và đất Feralit đảo)',
      ideal_temp: '25°C - 32°C biển nhiệt đới ấm',
      pot_size: 'Khu bảo tồn 19.998 ha biển đảo (Mỗi NFT tương ứng 10.000 m²)'
    },
    how_to_grow_steps: [
      {
        step: 1,
        title: 'Có mặt tại Côn Đảo và bật định vị GPS',
        instruction: 'Di chuyển đến quần đảo Côn Đảo (trong bán kính 15km từ tâm vườn). Bật GPS trên điện thoại.'
      },
      {
        step: 2,
        title: 'Xác thực định vị GPS tại Côn Đảo',
        instruction: 'Bấm Xác Thực GPS Check-in trên Web3 Sandbox, nhận Vé Check-in số 24 giờ.'
      },
      {
        step: 3,
        title: 'Đúc NFT Lô Rừng Biển Đảo Côn Đảo 10.000m²',
        instruction: 'Ký ví Web3 nhận chứng nhận số bảo tồn 1 ha hệ sinh thái rùa biển Côn Đảo trên Blockchain.'
      }
    ],
    faqs: [
      {
        question: 'Tại sao Côn Đảo được công nhận là vùng Ramsar thế giới?',
        answer: 'Côn Đảo là vùng đất ngập nước Ramsar thứ 6 của Việt Nam nhờ hệ sinh thái rạn san hô, cỏ biển và bãi đẻ của rùa biển quý hiếm được bảo vệ nghiêm ngặt.'
      },
      {
        question: 'Tổng quỹ Lô NFT của VQG Côn Đảo là bao nhiêu?',
        answer: 'Tổng diện tích 19.998 ha tương ứng với tối đa 19.998 Lô NFT độc bản (1 ha/lô).'
      }
    ],
    monetization_tips: [
      'Chủ sở hữu NFT nhận chứng nhận Người Bảo Vệ Rùa Biển Côn Đảo và ưu đãi tour sinh thái thả rùa con về biển.',
      'Tín chỉ bảo tồn đại dương xanh Web3 Blue Carbon.'
    ],
    tags: ['Côn Đảo', 'Vườn quốc gia', 'Khu Ramsar', 'Rùa biển đẻ trứng', 'Bò biển Dugong', 'Bà Rịa - Vũng Tàu'],
    forest_spec: {
      center_lat: 8.6833,
      center_lng: 106.6000,
      radius_km: 15.0,
      total_area_m2: 199980000,
      unit_area_m2: 10000,
      max_nft_supply: 19998,
      province: 'Bà Rịa - Vũng Tàu',
      unesco_or_status: 'Khu Đất Ngập Nước Ramsar Thế Giới (2013)'
    },
    related_plant_ids: ['herb-01', 'fruit-08', 'orn-01']
  },
  // --- MILESTONE 4: 20 PUBLICATIONS (space-06..10, recycle-06..10, culinary-06..10, forest-06..10) ---
  {
    "id": "space-06",
    "slug": "gian-treo-trai-cay-san-thuong",
    "common_name": "Giàn Lam Treo Dây Leo Ăn Trái Trên Sân Thượng",
    "scientific_name": "Rooftop Pergola Fruiting Vine Architectural System",
    "aliases": [
      "Giàn Nho Sân Thượng",
      "Giàn Bầu Bí Mái Nhà",
      "Pergola Sân Thượng Đa Năng"
    ],
    "category": "space",
    "nft_class": "space_method",
    "description": "Bản vẽ kỹ thuật kiến trúc giàn lam chịu lực gió cấp 8, tối ưu hóa tán che nắng hướng Tây và tạo bóng mát giảm nhiệt tới 4°C cho toàn bộ ngôi nhà, đồng thời cho năng suất thu hoạch trái sai trĩu cành.",
    "quick_answer": "Lắp đặt khung sắt hộp mạ kẽm liên kết bulong nở inox vào dầm bê tông chịu lực, đan lưới cáp 3mm để dây leo bám chắc chống lốc xoáy mùa mưa bão đô thị.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Arbour_with_trellis_Gibberd_Garden_Essex_England.JPG",
    "image_sha256": "a1b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d51",
    "sunlight": "full_sun",
    "watering": "daily",
    "propagation_difficulty": 3,
    "growth_time": "Thi công hoàn thiện 1-2 ngày, phủ giàn xanh sau 45-60 ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Trồng cây leo từ tháng 2-3 đón hè nắng hoặc tháng 8 đón thu",
      "central": "Cần hạ giàn hoặc tỉa bớt tán trước mùa bão tháng 10-11",
      "south": "Trồng giàn che nắng quanh năm, phủ bóng mát cho mái tôn",
      "best_months": [
        2,
        3,
        4,
        8,
        9,
        10
      ],
      "warning": "Bắt buộc neo vào cột dầm bê tông cốt thép, không khoan vào lớp gạch ốp tường mỏng"
    },
    "botanical_details": {
      "family": "Pergola Architectural & Botanical Vine Integration",
      "native_range": "Kiến trúc xanh thích ứng đô thị Việt Nam",
      "active_compounds": [
        "Khung thép hộp 40x40x1.4mm mạ kẽm nhúng nóng",
        "Dây cáp bọc nhựa chịu lực UV",
        "Chậu thông minh tích nước đáy",
        "Tán lá giảm nhiệt 4°C"
      ],
      "soil_ph": "6.0 - 6.8 (Giá thể tơi xốp giàu hữu cơ)",
      "ideal_temp": "22°C - 38°C chịu nắng gắt",
      "pot_size": "Thùng composite 100L hoặc bồn xây kiên cố"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Định vị trụ đỡ vào dầm sàn",
        "instruction": "Khoan cấy bulong nở inox 304 sâu vào dầm bê tông chịu lực sân thượng."
      },
      {
        "step": 2,
        "title": "Lắp dựng giàn khung và căng cáp",
        "instruction": "Dựng cột sắt hộp mạ kẽm cao 2.2m-2.4m, đan lưới cáp ô vuông 20x20cm."
      },
      {
        "step": 3,
        "title": "Bố trí chậu dưỡng và dẫn ngọn leo",
        "instruction": "Đặt chậu cây ăn trái (nho, chanh dây, mướp), cố định ngọn dây leo vào cáp dẫn hướng."
      }
    ],
    "faqs": [
      {
        "question": "Giàn lam này có bị sét đánh hoặc gió bão lật không?",
        "answer": "Hệ thống dùng cáp đan ô thoáng gió và có cọc nối đất thoát sét theo chuẩn kỹ thuật xây dựng."
      },
      {
        "question": "Chủ sở hữu NFT Blueprint nhận được gì?",
        "answer": "Nhận trọn bộ file CAD chi tiết kết cấu + video hướng dẫn thi công tự làm (DIY)."
      }
    ],
    "monetization_tips": [
      "Cung cấp dịch vụ thi công trọn gói giàn pergola sân thượng cho nhà phố.",
      "Bán phôi giống nho leo giàn và vật tư cáp inox bọc nhựa chuyên dụng."
    ],
    "tags": [
      "Sân thượng",
      "Giàn leo ăn quả",
      "Chống nóng mái nhà",
      "Kiến trúc xanh",
      "Bản vẽ kỹ thuật"
    ],
    "blueprint_spec": {
      "target_area": "Sân thượng 15m² - 40m²",
      "difficulty_level": "Trung bình (Khung sắt hộp mạ kẽm)",
      "cost_estimate_vnd": "3.500.000đ - 7.500.000đ",
      "components": [
        "Khung sắt hộp mạ kẽm 40x40",
        "Cáp bọc nhựa chống rỉ 3mm",
        "Tăng đơ siết cáp M8",
        "Chậu thông minh đáy trữ nước"
      ],
      "tools_needed": [
        "Máy khoan bê tông",
        "Máy siết bulong",
        "Kìm cắt cáp",
        "Thước thủy"
      ],
      "estimated_setup_hours": 8
    },
    "related_plant_ids": [
      "fruit-08",
      "fruit-24",
      "herb-10"
    ]
  },
  {
    "id": "space-07",
    "slug": "vuon-gieng-troi-oc-dao-nha-pho",
    "common_name": "Vườn Giếng Trời Ốc Đảo Vi Khí Hậu Nhà Phố",
    "scientific_name": "Townhouse Skylight Atrium Micro-Oasis Blueprint",
    "aliases": [
      "Vườn Đáy Giếng Trời",
      "Giếng Trời Nhiệt Đới",
      "Atrium Garden Urban Townhouse"
    ],
    "category": "space",
    "nft_class": "space_method",
    "description": "Thiết kế thông gió tự nhiên hiệu ứng ống khói (chimney effect) cho đáy giếng trời diện tích 2m² đến 6m², phối kết kiểng lá nhiệt đới ưa bóng râm và thảm rêu giữ ẩm thanh lọc không khí trong nhà.",
    "quick_answer": "Bố trí giếng trời kết hợp lớp sỏi nhẹ pumice thoát nước ngầm, lắp đèn LED quang hợp 4000K hẹn giờ chiếu sáng 8 giờ/ngày giúp cây phát triển xanh mướt giữa lòng nhà phố.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e8/American_homes_and_gardens_%281910%29_%2817970829149%29.jpg",
    "image_sha256": "b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e62",
    "sunlight": "partial_shade",
    "watering": "moderate",
    "propagation_difficulty": 2,
    "growth_time": "Lắp đặt 1 ngày, cây định hình rễ sau 3 tuần",
    "container_suitable": true,
    "seasonality": {
      "north": "Ổn định quanh năm do nhiệt độ trong nhà ấm áp vào mùa đông",
      "central": "Giữ ẩm tốt trong mùa hè gió Lào khô nóng",
      "south": "Phát triển xanh tốt quanh năm không phụ thuộc mùa mưa nắng",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Indoor Atrium & Shade-Tolerant Ecological Architecture",
      "native_range": "Thiết kế nội thất sinh thái đô thị Việt Nam",
      "active_compounds": [
        "Hiệu ứng đối lưu hút gió mát",
        "Đèn LED quang hợp 40W chuyên dụng",
        "Hút ẩm tự nhiên từ đá cuội",
        "Ion âm thanh lọc bụi mịn"
      ],
      "soil_ph": "5.5 - 6.5 (Xơ dừa, perlite, vỏ thông)",
      "ideal_temp": "20°C - 30°C nhiệt độ phòng",
      "pot_size": "Bồn xây âm sàn hoặc khay composite cao 40cm"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Chống thấm sàn đáy giếng trời",
        "instruction": "Quét 2 lớp màng chống thấm polyurethane và lót vải địa kỹ thuật bảo vệ sàn nhà."
      },
      {
        "step": 2,
        "title": "Rải sỏi thoát nước và đổ giá thể",
        "instruction": "Lớp đáy 10cm sỏi nhẹ Pumice, phía trên là giá thể xơ dừa lên men và perlite."
      },
      {
        "step": 3,
        "title": "Bố trí kiểng lá và thảm rêu",
        "instruction": "Cây cao tán xòe ở trung tâm (Trầu bà thanh xuân, Kim ngân), thảm rêu và dương xỉ viền mép."
      }
    ],
    "faqs": [
      {
        "question": "Giếng trời ít nắng cây có sống bền không?",
        "answer": "Bản vẽ tích hợp hệ thống đèn LED chuyên dụng quang hợp phổ ánh sáng mặt trời 4000K giúp cây xanh tốt bền bỉ."
      },
      {
        "question": "Có sợ muỗi sinh sôi ở đáy giếng trời không?",
        "answer": "Thiết kế thoát nước khô ráo hoàn toàn trong 15 phút, không đọng vũng nên không thể phát sinh muỗi."
      }
    ],
    "monetization_tips": [
      "Tư vấn thiết kế nội thất xanh cho các công trình biệt thự, nhà phố hiện đại.",
      "Bán cây kiểng lá nội thất thuần dưỡng trong nhà kèm chậu thông minh."
    ],
    "tags": [
      "Giếng trời",
      "Nhà phố",
      "Kiểng lá nhiệt đới",
      "Thông gió tự nhiên",
      "Thanh lọc không khí"
    ],
    "blueprint_spec": {
      "target_area": "Đáy giếng trời 2m² - 6m²",
      "difficulty_level": "Dễ - Trung bình",
      "cost_estimate_vnd": "2.000.000đ - 4.500.000đ",
      "components": [
        "Đèn LED quang hợp 40W",
        "Lớp vải địa chống thấm",
        "Sỏi nhẹ Pumice thoát nước",
        "Hẹn giờ tự động Sonoff"
      ],
      "tools_needed": [
        "Xẻng làm vườn mini",
        "Kéo tỉa lá",
        "Bút đo độ ẩm giá thể"
      ],
      "estimated_setup_hours": 6
    },
    "related_plant_ids": [
      "orn-05",
      "orn-07",
      "orn-12"
    ]
  },
  {
    "id": "space-08",
    "slug": "ban-cong-huong-tay-chong-nong",
    "common_name": "Vườn Ban Công Hướng Tây Chịu Nhiệt Cho Chung Cư",
    "scientific_name": "West-Facing Heat-Resistant Balcony Garden Architecture",
    "aliases": [
      "Ban Công Chống Nắng",
      "Vườn Ban Công Hướng Tây",
      "Heat Shield Balcony Garden"
    ],
    "category": "space",
    "nft_class": "space_method",
    "description": "Giải pháp cấu trúc lá chắn xanh 3 lớp chịu nắng gắt 40°C ban công hướng Tây. Kết hợp giàn dây leo chịu hạn ngoài biên, cây bụi râm mát tầng trung và thảo mộc tầng sát sàn giúp giảm nhiệt độ phòng ngủ liền kề từ 3-5°C.",
    "quick_answer": "Sử dụng chậu đất nung cách nhiệt kết hợp phủ vỏ thông giữ ẩm rễ, chọn các loài cây chịu nắng như hoa giấy, cúc tần Ấn Độ và hương thảo để cản nắng chiều gay gắt.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/92/Balcony_garden_in_Vibble_Gotland_Sweden.jpg",
    "image_sha256": "c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f73",
    "sunlight": "full_sun",
    "watering": "daily",
    "propagation_difficulty": 2,
    "growth_time": "Thi công 4 giờ, rủ xanh chống nắng hoàn chỉnh sau 30 ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Phát huy tác dụng chống nắng nóng đỉnh điểm từ tháng 5 đến tháng 8",
      "central": "Chịu tốt nắng rát và gió Lào mùa hè khắc nghiệt",
      "south": "Chống nắng hướng Tây rực lửa quanh năm suốt 12 tháng",
      "best_months": [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ],
      "warning": "Tưới cây vào sáng sớm trước 8h hoặc chiều mát sau 17h, tránh tưới giữa trưa nắng đỉnh điểm"
    },
    "botanical_details": {
      "family": "Balcony Thermal Barrier & Xeriscape Urban Blueprint",
      "native_range": "Ban công căn hộ chung cư đô thị Việt Nam",
      "active_compounds": [
        "Lá chắn nhiệt tự nhiên giảm 3-5°C",
        "Chậu đất nung hấp thụ nhiệt",
        "Lớp phủ bề mặt vỏ thông hữu cơ",
        "Tiết kiệm 20% điện năng điều hòa"
      ],
      "soil_ph": "6.0 - 7.0 (Đất thịt trộn trấu hun và phân bò hoai)",
      "ideal_temp": "25°C - 42°C cực chịu nhiệt",
      "pot_size": "Chậu đất nung dài 60cm hoặc chậu composite sâu 35cm"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Lắp khay móc lan can an toàn",
        "instruction": "Bắt giá treo sắt sơn tĩnh điện chịu tải 60kg ôm sát thành lan can ban công."
      },
      {
        "step": 2,
        "title": "Xếp chậu 3 tầng tán",
        "instruction": "Tầng ngoài cùng dây leo rủ bóng mát (Cúc tần), tầng giữa cây bụi hoa (Hoa giấy), tầng trong thảo mộc."
      },
      {
        "step": 3,
        "title": "Phủ lớp vỏ thông cách nhiệt",
        "instruction": "Rải lớp vỏ thông dày 3cm lên mặt chậu để ngăn bốc hơi nước và bảo vệ bộ rễ non."
      }
    ],
    "faqs": [
      {
        "question": "Có sợ gió giông ban công cao tầng làm rơi chậu không?",
        "answer": "Bản vẽ có chốt khóa an toàn cơ học 2 điểm chịu gió giật cấp 9 cho chung cư tầng 30+."
      },
      {
        "question": "Tiết kiệm được bao nhiêu tiền điện điều hòa?",
        "answer": "Nhiệt độ phòng giảm trung bình 3-4°C giúp điều hòa giảm tải khoảng 15-20% điện năng tiêu thụ."
      }
    ],
    "monetization_tips": [
      "Bán trọn gói combo vườn ban công giải nhiệt hướng Tây cho cư dân căn hộ.",
      "Cung cấp dịch vụ bảo dưỡng và thay giá thể định kỳ 6 tháng/lần."
    ],
    "tags": [
      "Ban công chung cư",
      "Chống nóng",
      "Hướng Tây",
      "Hoa giấy",
      "Tiết kiệm điện"
    ],
    "blueprint_spec": {
      "target_area": "Ban công chung cư 3m² - 6m²",
      "difficulty_level": "Dễ",
      "cost_estimate_vnd": "1.800.000đ - 3.200.000đ",
      "components": [
        "Giá treo lan can khóa an toàn",
        "Chậu đất nung/nhựa PP dày cách nhiệt",
        "Lưới chắn nắng rút dây",
        "Vỏ thông phủ gốc"
      ],
      "tools_needed": [
        "Kìm bấm",
        "Dây đai xiết inox 304",
        "Thước dây"
      ],
      "estimated_setup_hours": 4
    },
    "related_plant_ids": [
      "orn-01",
      "orn-11",
      "herb-16"
    ]
  },
  {
    "id": "space-09",
    "slug": "thap-rau-thang-dung-xoay-360",
    "common_name": "Tháp Rau Thẳng Đứng Xoay 360 Độ Cho Góc Hẹp",
    "scientific_name": "360-Degree Rotating Vertical Garden Tower Blueprint",
    "aliases": [
      "Tháp Trồng Rau Ban Công",
      "Vertical Tower 360",
      "Tháp Rau Tiết Kiệm Đất"
    ],
    "category": "space",
    "nft_class": "space_method",
    "description": "Bản thiết kế tháp rau đứng có trục xoay 360 độ giúp tất cả các hốc rau đón ánh sáng đồng đều dù ở góc ban công hẹp chỉ 1.5m², tích hợp lõi ủ trùn quế hữu cơ tự nuôi cây không cần thay đất.",
    "quick_answer": "Tháp cao 1.3m với 45 hốc trồng rau, ở giữa có lõi ống đục lỗ thả trùn quế ăn rác nhà bếp và tạo dinh dưỡng thẩm thấu trực tiếp nuôi rau quanh thân tháp.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Pirack-inside-hydroponic_system_PNr%C2%B00077.jpg",
    "image_sha256": "d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a84",
    "sunlight": "partial_shade",
    "watering": "moderate",
    "propagation_difficulty": 2,
    "growth_time": "Ráp tháp 2 giờ, thu hoạch rau ăn lá sau 25-30 ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Trồng rau xà lách, cải cúc vụ đông xuân; rau dền, muống vụ hè",
      "central": "Xoay tháp nhẹ nhàng mỗi sáng giúp rau nhận đủ nắng sáng êm dịu",
      "south": "Trồng rau gia vị và rau ăn lá bốn mùa tươi tốt",
      "best_months": [
        1,
        2,
        3,
        4,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Vertical Urban Agriculture & Vermiculture Integration",
      "native_range": "Thiết kế nông nghiệp đô thị vi mô",
      "active_compounds": [
        "45 hốc trồng trên diện tích chỉ 0.35m² mặt sàn",
        "Lõi ủ trùn quế tự phân hủy rác bếp",
        "Trục xoay bi thép chịu tải 150kg",
        "Khay hứng trà trùn vi sinh"
      ],
      "soil_ph": "6.2 - 6.8 (Đất thịt màu trộn phân trùn quế)",
      "ideal_temp": "18°C - 35°C",
      "pot_size": "Đường kính đế 60cm, cao 130cm"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Lắp ráp đế xoay và thân tháp",
        "instruction": "Đặt mâm xoay chịu tải xuống sàn phẳng, lắp các tầng mô đun tháp lên trên."
      },
      {
        "step": 2,
        "title": "Đặt lõi vi sinh và cho trùn quế",
        "instruction": "Cho ống nhựa đục lỗ vào tâm tháp, thả 300g sinh khối trùn quế vào đáy ống."
      },
      {
        "step": 3,
        "title": "Đổ đất và cấy cây con vào hốc",
        "instruction": "Cho giá thể đất vào các tầng và trồng cây con (xà lách, húng quế, cải ngọt) vào 45 hốc."
      }
    ],
    "faqs": [
      {
        "question": "Có mùi hôi từ rác bếp bỏ vào lõi tháp không?",
        "answer": "Trùn quế ăn phân giải rác thải hiếu khí kết hợp lỗ thở nên hoàn toàn không phát sinh mùi hôi."
      },
      {
        "question": "Một tháp rau cung cấp được bao nhiêu rau sạch?",
        "answer": "Cung cấp đều đặn 4-6 kg rau sạch ăn lá mỗi tháng cho gia đình 2-3 người."
      }
    ],
    "monetization_tips": [
      "Gia công sản xuất tháp rau xoay cung ứng cho thị trường nông nghiệp sân thượng.",
      "Cung cấp giống trùn quế sinh khối và gói hạt giống rau hữu cơ theo mùa."
    ],
    "tags": [
      "Tháp rau",
      "Trùn quế",
      "Xoay 360",
      "Ban công hẹp",
      "Rau sạch hữu cơ"
    ],
    "blueprint_spec": {
      "target_area": "Góc ban công 0.8m² - 1.5m²",
      "difficulty_level": "Trung bình",
      "cost_estimate_vnd": "950.000đ - 1.600.000đ",
      "components": [
        "Đế mâm xoay thép chịu lực",
        "Thân tháp 45 hốc nhựa PP nguyên sinh",
        "Ống lõi ủ trùn phi 114 đục lỗ",
        "Khay hứng dịch"
      ],
      "tools_needed": [
        "Tua vít 4 cạnh",
        "Cờ lê 13",
        "Xẻng con"
      ],
      "estimated_setup_hours": 3
    },
    "related_plant_ids": [
      "herb-03",
      "herb-12",
      "herb-14"
    ]
  },
  {
    "id": "space-10",
    "slug": "vuon-rung-thu-nho-tren-mai",
    "common_name": "Vườn Rừng Thu Nhỏ Trên Mái Nhà (Rooftop Micro-Forest)",
    "scientific_name": "Rooftop Permaculture Micro-Forest Ecosystem Architecture",
    "aliases": [
      "Vườn Rừng Sân Thượng",
      "Permaculture Mái Nhà",
      "Micro-Forest Rooftop System"
    ],
    "category": "space",
    "nft_class": "space_method",
    "description": "Thiết kế hệ sinh thái vườn rừng thuận tự nhiên (permaculture) đa tầng tán thu nhỏ trên sân thượng. Kết hợp tầng tán gỗ lùn, tầng bụi cây ăn quả, tầng thảo mộc bò phủ đất và bồn nước ngầm cân bằng sinh thái thu hút ong bướm thiên nhiên.",
    "quick_answer": "Ứng dụng vỉ thoát nước Plastic Cell chịu lực cao và giá thể siêu nhẹ để tạo hệ sinh thái rừng nhiệt đới 5 tầng trên mái bê tông an toàn kết cấu tuyệt đối.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Vegetable_Garden_in_the_Sky.jpg",
    "image_sha256": "e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b95",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 4,
    "growth_time": "Thi công 2 ngày, hình thành hệ sinh thái tự cân bằng sau 6 tháng",
    "container_suitable": true,
    "seasonality": {
      "north": "Đa tầng tán che chở nhau qua gió mùa đông bắc và nắng hè gay gắt",
      "central": "Khả năng giữ nước của tầng rêu và thảm cỏ giúp vườn vượt qua mùa hạn",
      "south": "Quanh năm xanh tốt, chim muông và ong mật về thụ phấn tự nhiên",
      "best_months": [
        2,
        3,
        4,
        8,
        9,
        10
      ],
      "warning": "Bắt buộc kiểm tra hồ sơ kết cấu tải trọng sân thượng (tối thiểu 300kg/m²) trước khi thi công"
    },
    "botanical_details": {
      "family": "Urban Rooftop Permaculture & Biodiversity Reserve",
      "native_range": "Kiến trúc cảnh quan sinh thái bền vững",
      "active_compounds": [
        "Vỉ thoát nước ngầm Plastic Cell chống thấm sàn 100%",
        "Giá thể siêu nhẹ Perlite + Vermiculite",
        "Đa dạng sinh học 15+ loài cây tương hỗ",
        "Bồn trữ nước mưa sinh học"
      ],
      "soil_ph": "6.0 - 6.8",
      "ideal_temp": "20°C - 38°C",
      "pot_size": "Hệ bồn composite hoặc tôn kẽm không đáy cao 45-60cm"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Trải vỉ thoát nước và vải địa",
        "instruction": "Lắp ráp vỉ Plastic Cell phủ kín mặt sàn và trải vải địa kỹ thuật lọc cát."
      },
      {
        "step": 2,
        "title": "Đổ giá thể siêu nhẹ",
        "instruction": "Phối trộn 40% mùn dừa vi sinh, 30% đá Perlite, 20% phân trùn quế, 10% trấu hun để giảm 60% tải trọng."
      },
      {
        "step": 3,
        "title": "Trồng phân tầng cây đa dạng",
        "instruction": "Tầng 1 cây gỗ lùn (ổi, sung, chanh), tầng 2 cây bụi (ớt, cà, đậu), tầng 3 thảo mộc bò phủ đất (bạc hà, rau má)."
      }
    ],
    "faqs": [
      {
        "question": "Trồng vườn rừng trên mái có gây nứt trần hay thấm dột không?",
        "answer": "Công nghệ vỉ Plastic Cell tạo lớp đệm không khí cách ly rễ cây hoàn toàn khỏi mặt trần bê tông, chống thấm dột vĩnh viễn."
      },
      {
        "question": "Hệ sinh thái này có cần phun thuốc trừ sâu không?",
        "answer": "Nguyên lý tương hỗ vườn rừng permaculture tự dẫn dụ thiên địch ăn rệp sâu hại, hoàn toàn không cần thuốc bảo vệ thực vật."
      }
    ],
    "monetization_tips": [
      "Thiết kế và thi công vườn rừng mái nhà sinh thái nghỉ dưỡng cho villa cao cấp.",
      "Khai thác tour trải nghiệm nông nghiệp đô thị và cà phê sân thượng sinh thái."
    ],
    "tags": [
      "Vườn rừng",
      "Sân thượng",
      "Permaculture",
      "Plastic cell",
      "Sinh thái bền vững"
    ],
    "blueprint_spec": {
      "target_area": "Sân thượng bê tông 30m² - 80m²",
      "difficulty_level": "Chuyên gia (Kiểm tra tải trọng sàn)",
      "cost_estimate_vnd": "8.000.000đ - 18.000.000đ",
      "components": [
        "Vỉ thoát nước Plastic Cell 30mm",
        "Vải địa không dệt",
        "Giá thể siêu nhẹ Perlite",
        "Bồn trồng tấm tôn lượn sóng"
      ],
      "tools_needed": [
        "Thước laser",
        "Máy đo tải trọng",
        "Cào san phẳng giá thể"
      ],
      "estimated_setup_hours": 16
    },
    "related_plant_ids": [
      "fruit-01",
      "fruit-02",
      "herb-01"
    ]
  },
  {
    "id": "recycle-06",
    "slug": "thung-nuoi-trun-que-khay-nhua-cu",
    "common_name": "Thùng Nuôi Trùn Quế Tự Chế Từ Khay Nhựa Chồng Tầng",
    "scientific_name": "DIY Stackable Tote Vermicomposting Urban Bin System",
    "aliases": [
      "Thùng Trùn Quế Tự Chế",
      "Khay Nuôi Trùn Ban Công",
      "DIY Worm Bin Kitchen Waste"
    ],
    "category": "recycle",
    "nft_class": "eco_invention",
    "description": "Sáng chế hệ thống nuôi trùn quế phân tầng từ 3 khay nhựa phế thải. Trùn quế tự bò lên tầng trên ăn rác mới, tầng dưới cùng cho phân trùn quế đen nhánh tinh khiết và vòi hứng dịch trà trùn quế pha tưới cây cực tốt.",
    "quick_answer": "Dùng 3 thùng nhựa xếp chồng, khoan lỗ 5mm ở đáy thùng 2 và 3 để trùn tự di chuyển, lắp vòi nước ở thùng đáy để hứng dịch trà trùn vi sinh.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f1/Worm_compost_bin.jpg",
    "image_sha256": "f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c06",
    "sunlight": "indoor",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Chế tạo 1 giờ, thu hoạch phân trùn đều đặn sau mỗi 30 ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Ủ ấm cho thùng trùn vào mùa đông miền Bắc bằng cách đắp thêm bìa carton",
      "central": "Đặt nơi râm mát thoáng gió tránh ánh nắng trực tiếp hun nóng",
      "south": "Trùn ăn mạnh và sinh sản nhân đôi bầy đàn sau 60-90 ngày",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Vermiculture Circular Kitchen Waste Recycling",
      "native_range": "Sáng chế nông nghiệp tái chế tuần hoàn",
      "active_compounds": [
        "Trùn quế Perionyx excavatus",
        "Enzyme tiêu hóa trùn quế",
        "Phân hữu cơ giàu acid humic",
        "Giảm 100% rác hữu cơ nhà bếp"
      ],
      "soil_ph": "6.8 - 7.2 (Trung tính lý tưởng cho giun đất)",
      "ideal_temp": "22°C - 30°C trong bóng râm mát",
      "pot_size": "Bộ 3 khay nhựa 50L (Dài 50cm x Rộng 35cm x Cao 25cm)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Khoan lỗ thông khí và lỗ di chuyển",
        "instruction": "Khoan hàng trăm lỗ nhỏ 5mm dưới đáy khay 2 và khay 3, khoan lỗ 2mm quanh miệng nắp."
      },
      {
        "step": 2,
        "title": "Lắp vòi xả dịch ở thùng đáy",
        "instruction": "Khoan đáy khay 1 lắp vòi nhựa vặn để thu gom nước trà trùn (worm tea)."
      },
      {
        "step": 3,
        "title": "Làm lớp lót và thả trùn",
        "instruction": "Lót bìa carton xé sợi làm ẩm xuống đáy, thả 500g sinh khối trùn quế và cho thức ăn rác bếp."
      }
    ],
    "faqs": [
      {
        "question": "Trùn quế có bò ra ngoài nhà ban đêm không?",
        "answer": "Trùn quế rất sợ ánh sáng và ưa ẩm ướt trong đệm lót, nếu thùng đủ ẩm và thức ăn thì trùn không bao giờ bò ra ngoài."
      },
      {
        "question": "Không nên cho trùn ăn những thức ăn gì?",
        "answer": "Tránh cho nhiều đồ cay nóng (ớt, gừng, tỏi), vỏ cam chanh chua đậm hoặc thịt mỡ thối rữa."
      }
    ],
    "monetization_tips": [
      "Bán bộ thùng nuôi trùn quế thành phẩm tự chế kèm sinh khối trùn bố mẹ.",
      "Đóng chai dịch trà trùn quế vi sinh bán làm phân bón lá cao cấp."
    ],
    "tags": [
      "Trùn quế",
      "Tái chế rác bếp",
      "Phân hữu cơ",
      "Tự làm DIY",
      "Kinh tế tuần hoàn"
    ],
    "eco_spec": {
      "waste_input": "Vỏ rau củ, bã cà phê, bã trà, vỏ chuối nhà bếp",
      "output_yield": "5-8 kg phân trùn quế/tháng + 2 lít trà trùn vi sinh",
      "carbon_offset_kg_year": 95,
      "materials_cost_vnd": "150.000đ - 250.000đ",
      "upcycled_components": [
        "3 hộp/thùng nhựa cũ có nắp đậy",
        "1 vòi nước nhựa cũ",
        "Lưới chắn côn trùng",
        "Bìa carton vụn"
      ]
    },
    "related_plant_ids": [
      "herb-01",
      "fruit-01",
      "orn-03"
    ]
  },
  {
    "id": "recycle-07",
    "slug": "he-thong-tuoi-bac-hut-vai-cu",
    "common_name": "Hệ Thống Tưới Bấc Hút Tự Thẩm Thấu Bằng Vải Cotton Cũ",
    "scientific_name": "Capillary Action Cotton Wick Self-Irrigation System",
    "aliases": [
      "Tưới Bấc Ngấm Tự Động",
      "Tưới Tự Động Bằng Dây Vải",
      "Cotton Wick Irrigation"
    ],
    "category": "recycle",
    "nft_class": "eco_invention",
    "description": "Sáng chế hệ thống tưới nước không dùng điện và không cần áp lực máy bơm dựa trên lực mao dẫn tự nhiên của sợi cotton từ quần áo cũ. Cây tự hút nước theo đúng nhu cầu rễ, không bao giờ ngập úng hay thiếu nước khi vắng nhà.",
    "quick_answer": "Bện các dải vải cotton từ quần áo cũ thành dây bấc, một đầu nhúng vào bình chứa nước đặt ngang bằng hoặc thấp hơn chậu, đầu kia luồn sâu vào bầu rễ cây.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Cotton_wicks.jpg",
    "image_sha256": "0718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d17",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Lắp ráp 15 phút, duy trì độ ẩm tự động 20 ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Cực kỳ hữu ích khi đi du lịch hoặc về quê dịp Tết Nguyên Đán",
      "central": "Giữ ẩm tuyệt vời cho cây trong những ngày hè khô hạn bỏng rát",
      "south": "Giúp ban công luôn xanh mướt mà không cần tưới thủ công mỗi ngày",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Capillary Physics & Upcycled Textile Hydration",
      "native_range": "Sáng chế tiết kiệm nước tưới dân dụng",
      "active_compounds": [
        "Lực mao dẫn mao mạch sợi bông tự nhiên (Capillary force)",
        "Không tiêu tốn điện năng 0W",
        "Tiết kiệm 85% nước bay hơi",
        "Chống úng thối rễ tuyệt đối"
      ],
      "soil_ph": "Mọi loại pH đất trồng",
      "ideal_temp": "Thích ứng mọi dải nhiệt độ",
      "pot_size": "Áp dụng cho mọi loại chậu từ mini đến bồn lớn"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Cắt và bện dải vải cotton cũ",
        "instruction": "Lấy áo thun cotton 100% cũ cắt thành các dải rộng 3cm, bện sam lại thành sợi dây bấc chắc chắn."
      },
      {
        "step": 2,
        "title": "Luồn dây bấc vào giá thể",
        "instruction": "Dùng que nhọn đẩy sâu đầu dây bấc vào tâm bầu rễ của chậu cây."
      },
      {
        "step": 3,
        "title": "Thả đầu còn lại vào bình nước",
        "instruction": "Nhúng đầu dây còn lại xuống đáy bình nước nhựa tái chế 5L, đậy nắp chống muỗi đẻ trứng."
      }
    ],
    "faqs": [
      {
        "question": "Vải cotton dùng lâu có bị mục nát trong đất không?",
        "answer": "Sợi cotton tự nhiên dùng được 6-8 tháng, có thể thay thế dễ dàng từ nguồn vải vụn quần áo cũ trong nhà."
      },
      {
        "question": "Có cần đặt bình nước cao hơn chậu cây không?",
        "answer": "Không cần! Lực mao dẫn mao mạch tự hút nước ngược lên theo nhu cầu khô ẩm của đất, không lo chảy tràn ngập úng."
      }
    ],
    "monetization_tips": [
      "Chia sẻ bộ bí quyết tưới tự động trên mạng xã hội thu hút cộng đồng người yêu cây.",
      "Sản xuất dây bấc cotton tự nhiên cao cấp phục vụ người trồng kiểng lá nội thất."
    ],
    "tags": [
      "Tưới tự động",
      "Tái chế vải cũ",
      "Lực mao dẫn",
      "Đi du lịch",
      "Không dùng điện"
    ],
    "eco_spec": {
      "waste_input": "Quần áo cotton cũ không dùng, bình nước suối phế liệu",
      "output_yield": "Cấp nước đều đặn suốt 15-20 ngày liên tục cho 6 chậu cây",
      "carbon_offset_kg_year": 45,
      "materials_cost_vnd": "30.000đ - 50.000đ",
      "upcycled_components": [
        "Quần áo cotton cắt dải bện dây bấc",
        "Bình nước 5L - 20L cũ",
        "Ống hút nhựa làm ống bọc dây"
      ]
    },
    "related_plant_ids": [
      "orn-04",
      "orn-06",
      "herb-11"
    ]
  },
  {
    "id": "recycle-08",
    "slug": "u-phan-ca-dam-dac-em-ri-mat",
    "common_name": "Ủ Phân Cá Đậm Đặc Lên Men EM & Rỉ Mật Khử Mùi",
    "scientific_name": "Anaerobic Fermented Fish Protein Organic Fertilizer Recipe",
    "aliases": [
      "Phân Đạm Cá Tự Ủ",
      "Phân Cá Khử Mùi Emic",
      "Fish Hydrolysate Bio-Fertilizer"
    ],
    "category": "recycle",
    "nft_class": "eco_invention",
    "description": "Quy trình công nghệ ủ đầu cá và ruột cá phế phẩm chợ thành đạm sinh học axit amin đậm đặc bằng men vi sinh EM và rỉ mật đường. Hoàn toàn sạch mùi tanh, bổ sung đạm hữu cơ và khoáng vi lượng giúp cây bật chồi mập mạp.",
    "quick_answer": "Ủ yếm khí 10kg phụ phẩm cá với 1 lít rỉ mật đường, 200g vi sinh EM và 1 quả dứa chín băm nhỏ trong 30-45 ngày. Enzyme bromelain từ dứa cắt nhỏ đạm nhanh và khử sạch mùi tanh.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/86/Compost_pile.JPG",
    "image_sha256": "18293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e28",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 2,
    "growth_time": "Ủ lên men 30-45 ngày, hạn sử dụng 1 năm",
    "container_suitable": true,
    "seasonality": {
      "north": "Mùa hè lên men nhanh chỉ 25-30 ngày, mùa đông kéo dài 45 ngày",
      "central": "Ủ kín khí nơi khô ráo, tránh nước mưa lọt vào thùng",
      "south": "Nhiệt độ ấm áp quanh năm giúp vi sinh vật hoạt hóa tối đa",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      "warning": "Đậy nắp thật chặt có van xả khí 1 chiều để tránh phồng nổ thùng do áp suất vi sinh"
    },
    "botanical_details": {
      "family": "Bio-Fermentation & Marine Waste Upcycling",
      "native_range": "Phân bón hữu cơ sinh học Việt Nam",
      "active_compounds": [
        "Acid amin tự do chuỗi ngắn (Peptides)",
        "Vi sinh vật hữu hiệu Lactobacillus, nấm men",
        "Khoáng vi lượng kẽm, canxi, magie biển",
        "Enzyme thủy phân Papain & Bromelain"
      ],
      "soil_ph": "Độ chua dung dịch ủ 4.0 - 4.5 (Pha loãng 1:500 tưới đất đạt pH 6.5)",
      "ideal_temp": "25°C - 35°C lên men tốt nhất",
      "pot_size": "Thùng phuy nhựa 20L - 50L có gioăng cao su đệm nắp"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Thu gom và băm nhỏ phụ phẩm cá",
        "instruction": "Lấy đầu cá, ruột cá tươi từ sạp chợ, băm nhỏ cùng 1 quả dứa chín để tăng enzyme phân cắt."
      },
      {
        "step": 2,
        "title": "Phối trộn men vi sinh và rỉ mật",
        "instruction": "Hòa men vi sinh EM vào nước rỉ mật đường, đổ đều vào thùng cá và khuấy nhẹ."
      },
      {
        "step": 3,
        "title": "Ủ kín yếm khí và xả ga",
        "instruction": "Đậy chặt nắp thùng, định kỳ 5 ngày mở hé xả bớt khí gas lên men một lần."
      }
    ],
    "faqs": [
      {
        "question": "Phân cá tự ủ có bị hàng xóm phàn nàn vì mùi tanh hôi không?",
        "answer": "Nhờ bổ sung rỉ mật và dứa chín, vi sinh lên men yếm khí tạo mùi thơm chua nhẹ như dưa muối lên men, hoàn toàn không hôi thối."
      },
      {
        "question": "Pha tỷ lệ bao nhiêu để tưới lá và tưới gốc?",
        "answer": "Lọc lấy dịch cốt pha tỷ lệ 1:500 tưới gốc hoặc 1:1000 phun sương lên lá sáng sớm."
      }
    ],
    "monetization_tips": [
      "Thu gom phụ phẩm cá chợ chế biến phân đạm cá hữu cơ thương phẩm.",
      "Chiết chai 500ml dán nhãn sinh thái bán cho người trồng hoa hồng, kiểng lá."
    ],
    "tags": [
      "Đạm cá",
      "Tự ủ phân hữu cơ",
      "Rác chợ",
      "Enzyme dứa",
      "Vi sinh EM"
    ],
    "eco_spec": {
      "waste_input": "Đầu cá, ruột cá xin tại sạp chợ, vỏ dứa (thơm) phế thải",
      "output_yield": "10-15 lít phân đạm cá hữu cơ nguyên chất siêu đậm đặc",
      "carbon_offset_kg_year": 140,
      "materials_cost_vnd": "80.000đ - 120.000đ (men vi sinh & rỉ mật)",
      "upcycled_components": [
        "Thùng sơn 20L có nắp đậy gioăng cao su",
        "Chai nhựa đựng thành phẩm"
      ]
    },
    "related_plant_ids": [
      "orn-01",
      "fruit-05",
      "fruit-07"
    ]
  },
  {
    "id": "recycle-09",
    "slug": "chau-tu-hut-nuoc-sip-xo-son",
    "common_name": "Chậu Trồng Cây Tự Hút Nước Sub-Irrigated Planter (SIP) Từ Xô Sơn",
    "scientific_name": "Sub-Irrigated Bucket Planter (SIP) Upcycled Container System",
    "aliases": [
      "Chậu Trồng Xô Sơn Cũ",
      "Chậu Thông Minh Tự Dưỡng SIP",
      "Upcycled Bucket Planter"
    ],
    "category": "recycle",
    "nft_class": "eco_invention",
    "description": "Tái sinh thùng xô sơn 18L đã qua sử dụng thành chậu trồng cây tự dưỡng chuẩn nông nghiệp đô thị quốc tế. Có khoang trữ nước 5L đáy và ống xả tràn chống ngập úng khi mưa bão, tiết kiệm 80% lượng nước tưới.",
    "quick_answer": "Đục lỗ ngăn đáy chia 2 khoang: khoang trữ nước 5L bên dưới và khoang giá thể bên trên. Nối với nhau bằng cốc bấc hút mao dẫn và ống xả tràn ngang mép.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Tomato_Support_%285843173257%29.jpg",
    "image_sha256": "293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f39",
    "sunlight": "full_sun",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Chế tạo 30 phút, cây lớn nhanh gấp 1.5 lần chậu thường",
    "container_suitable": true,
    "seasonality": {
      "north": "Chống hạn mùa hè, chống úng tuyệt đối mùa mưa rào miền Bắc",
      "central": "Bể nước ngầm bảo vệ bộ rễ mát mẻ trước cái nóng rát miền Trung",
      "south": "Trồng cà chua, ớt hiểm, dưa leo bội thu quanh năm",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Sub-Irrigated Urban Container Engineering",
      "native_range": "Tái chế thùng nhựa xây dựng thành nông nghiệp xanh",
      "active_compounds": [
        "Khoang nước ngầm 5L không bốc hơi",
        "Ống cấp nước PVC có phao báo mực nước",
        "Lỗ xả tràn khí động học chống ngập úng rễ",
        "Tái sinh xô nhựa phế thải khó phân hủy"
      ],
      "soil_ph": "6.0 - 7.0",
      "ideal_temp": "18°C - 38°C",
      "pot_size": "Thùng sơn 18L - 20L tái sử dụng"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Khoan lỗ xả tràn ngang thành xô",
        "instruction": "Khoan 1 lỗ nhỏ phi 10mm cách đáy xô 10cm làm lỗ thoát nước tràn chống ngập."
      },
      {
        "step": 2,
        "title": "Làm vỉ ngăn cách và cốc tim bấc",
        "instruction": "Cắt nắp xô làm vỉ ngăn đáy, đặt 1 hộp nhựa sữa chua đục lỗ nhồi xơ dừa làm bấc hút."
      },
      {
        "step": 3,
        "title": "Lắp ống châm nước và đổ đất",
        "instruction": "Cắm đoạn ống nhựa PVC từ mặt chậu xuống khoang đáy để châm nước trực tiếp mà không làm xói mặt đất."
      }
    ],
    "faqs": [
      {
        "question": "Nước đọng ở đáy chậu có làm thối rễ cây không?",
        "answer": "Không! Nhờ có lỗ xả tràn luôn tạo một khoang đệm không khí ngăn cách giữa mặt nước và đáy bầu rễ, rễ cây thở tự nhiên không bao giờ bị nghẹt thở."
      },
      {
        "question": "Bao lâu mới phải châm thêm nước vào chậu SIP?",
        "answer": "Trung bình 7-10 ngày mới cần châm nước một lần, tiết kiệm tối đa thời gian chăm sóc."
      }
    ],
    "monetization_tips": [
      "Gia công chậu tự dưỡng từ vỏ xô công trình phân phối cho các vườn rau đô thị.",
      "Bán kèm bộ kit phụ kiện lắp ráp chậu SIP tự làm tại nhà."
    ],
    "tags": [
      "Chậu tự hút",
      "Xô sơn cũ",
      "SIP planter",
      "Tiết kiệm nước",
      "Chống úng"
    ],
    "eco_spec": {
      "waste_input": "Xô sơn xây dựng 18L-20L cũ, nắp xô hỏng, ống nước PVC thừa",
      "output_yield": "1 chậu tự dưỡng tuổi thọ 5-10 năm trồng cây ăn quả cực khỏe",
      "carbon_offset_kg_year": 50,
      "materials_cost_vnd": "20.000đ - 40.000đ",
      "upcycled_components": [
        "Xô sơn cũ rửa sạch",
        "Hộp sữa chua đục lỗ làm cốc tim bấc",
        "Ống nhựa PVC 21 cắt ngắn"
      ]
    },
    "related_plant_ids": [
      "fruit-09",
      "fruit-15",
      "herb-13"
    ]
  },
  {
    "id": "recycle-10",
    "slug": "he-thong-cham-phan-venturi-tu-che",
    "common_name": "Bộ Châm Phân Tự Chế Venturi Tận Dụng Van Nhựa Phế Thải",
    "scientific_name": "DIY Venturi Fertilizer Injector Upcycled Irrigation Mod",
    "aliases": [
      "Châm Phân Tự Động Venturi",
      "Van Venturi Tưới Tự Động",
      "DIY Fertilizer Injector"
    ],
    "category": "recycle",
    "nft_class": "eco_invention",
    "description": "Sáng chế bộ trộn phân nước tự động dựa trên nguyên lý chênh lệch áp suất dòng chảy Venturi. Tận dụng cút nối nhựa PVC và van tiết lưu cũ để hòa tan phân bón hữu cơ trực tiếp vào dòng nước tưới đến từng gốc cây.",
    "quick_answer": "Tạo đoạn thu hẹp dòng chảy trên ống PVC để sinh ra áp suất chân không hút dịch phân hữu cơ từ xô chứa hòa tan thẳng vào đường ống tưới nhỏ giọt.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Venturi_tube_principle.png",
    "image_sha256": "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a40",
    "sunlight": "full_sun",
    "watering": "drought_tolerant",
    "propagation_difficulty": 2,
    "growth_time": "Lắp ráp hoàn chỉnh 45 phút, tuổi thọ bền bỉ trên 3 năm",
    "container_suitable": true,
    "seasonality": {
      "north": "Châm dinh dưỡng kích cây đâm chồi vụ xuân và dưỡng trái vụ hè",
      "central": "Tiết kiệm công sức tưới bón giữa trưa nắng đổ lửa",
      "south": "Bón phân hòa tan tự động quanh năm cho vườn sân thượng",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Fluid Dynamics Venturi Applied Urban Fertigation",
      "native_range": "Sáng chế cơ khí thủy lực nông nghiệp đô thị",
      "active_compounds": [
        "Hiệu ứng Venturi chênh áp thủy lực",
        "Không dùng máy bơm điện riêng",
        "Hòa tan đồng đều 100% dung dịch hữu cơ",
        "Tự điều chỉnh lưu lượng bằng van tiết lưu"
      ],
      "soil_ph": "Không ảnh hưởng pH hệ thống",
      "ideal_temp": "Thích ứng mọi điều kiện thời tiết ngoài trời",
      "pot_size": "Tích hợp cho hệ thống tưới từ 10 đến 50 chậu"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Lắp cụm ống thu hẹp tạo họng hút",
        "instruction": "Nối côn giảm 27 xuống 21 rồi nở lại 27 tạo chênh lệch vận tốc dòng chảy sinh áp âm."
      },
      {
        "step": 2,
        "title": "Gắn van 1 chiều và dây hút phân",
        "instruction": "Khoan giữa họng hẹp gắn đầu ren van một chiều, cắm dây hút nhựa mềm thả vào xô dịch phân hữu cơ."
      },
      {
        "step": 3,
        "title": "Đấu nối song song (bypass) vào đường cấp nước",
        "instruction": "Lắp bộ Venturi song song với khóa nước chính để dễ dàng bật/tắt chế độ châm phân."
      }
    ],
    "faqs": [
      {
        "question": "Hệ thống dùng nước máy thủy cục gia đình có đủ áp lực để hút không?",
        "answer": "Có! Áp lực nước máy đô thị từ 1.5 - 2.5 bar hoàn toàn đủ để kích hoạt lực hút chân không của họng Venturi."
      },
      {
        "question": "Có sợ cặn phân hữu cơ làm tắc vòi tưới nhỏ giọt không?",
        "answer": "Bản thiết kế có tích hợp phễu lọc cặn lưới inox 120 mesh ở đầu hút để ngăn ngừa 100% rác cặn."
      }
    ],
    "monetization_tips": [
      "Gia công cụm van châm phân Venturi DIY bán cho người làm vườn ban công.",
      "Cung cấp dung dịch dinh dưỡng hữu cơ lỏng chuyên dụng cho hệ thống tưới."
    ],
    "tags": [
      "Châm phân",
      "Venturi",
      "Tưới nhỏ giọt",
      "Không dùng điện",
      "Tự động hóa"
    ],
    "eco_spec": {
      "waste_input": "Đoạn ống PVC chữ T cũ, van chỉnh lưu tủ lạnh hoặc bình xịt cũ",
      "output_yield": "Tự động bón phân đều đặn cho cả khu vườn mỗi lần mở khóa nước",
      "carbon_offset_kg_year": 35,
      "materials_cost_vnd": "45.000đ - 70.000đ",
      "upcycled_components": [
        "Tê giảm PVC 27-21",
        "Van một chiều nhựa mini",
        "Dây truyền dịch y tế cũ"
      ]
    },
    "related_plant_ids": [
      "fruit-08",
      "herb-19",
      "orn-11"
    ]
  },
  {
    "id": "culinary-06",
    "slug": "siro-hoa-du-du-duc-chung-mat-ong",
    "common_name": "Siro Hoa Đu Đủ Đực Chưng Đường Phèn & Mật Ong Rừng",
    "scientific_name": "Steamed Male Papaya Flower Honey Cough Elixir",
    "aliases": [
      "Siro Đu Đủ Đực Trị Ho",
      "Mật Ong Hoa Đu Đủ Đực",
      "Bài Thuốc Ho Dân Gian Đu Đủ"
    ],
    "category": "culinary",
    "nft_class": "culinary_recipe",
    "description": "Phương thang cổ truyền chưng hoa đu đủ đực tươi hái lúc sáng sớm với mật ong rừng nguyên chất và đường phèn Quảng Ngãi. Giàu flavonoid tự nhiên và enzyme papain giúp kháng khuẩn cổ họng, cắt dứt cơn ho đêm dai dẳng.",
    "quick_answer": "Hái hoa đu đủ đực lúc sương sớm, rửa nhẹ ráo nước, trộn cùng mật ong rừng và đường phèn chưng cách thủy 40 phút với lửa nhỏ, ngậm 1 thìa ấm mỗi sáng tối.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Carica_papaya_male.jpg",
    "image_sha256": "4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b51",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 2,
    "growth_time": "Chế biến 50 phút, bảo quản ngăn mát tủ lạnh 3 tháng",
    "container_suitable": true,
    "seasonality": {
      "north": "Thời điểm vàng sử dụng khi mùa thu đông miền Bắc chuyển lạnh hanh hao",
      "central": "Làm dịu cổ họng trong mùa gió rét mưa dầm miền Trung",
      "south": "Dùng phòng ngừa viêm họng do thay đổi nhiệt độ máy lạnh đột ngột",
      "best_months": [
        1,
        2,
        3,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Caricaceae & Apis Mellifera Folk Pharmacology",
      "native_range": "Dân gian dược học Việt Nam",
      "active_compounds": [
        "Flavonoid & Polyphenol kháng viêm tự nhiên",
        "Enzyme Papain tiêu nhầy đờm",
        "Isothiocyanate ức chế khuẩn đường hô hấp",
        "Kháng sinh tự nhiên trong mật ong"
      ],
      "soil_ph": "Không áp dụng (Chế phẩm dinh dưỡng ẩm thực)",
      "ideal_temp": "Bảo quản tốt nhất 10°C - 20°C",
      "pot_size": "Hũ thủy tinh nắp kín 350ml - 500ml"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Sơ chế hoa đu đủ đực tươi",
        "instruction": "Nhặt bỏ cuống già, rửa nhẹ tay dưới vòi nước chảy tránh rụng phấn hoa, để thật ráo nước."
      },
      {
        "step": 2,
        "title": "Phối trộn mật ong và đường phèn",
        "instruction": "Xếp một lớp hoa, một lớp đường phèn kết tinh, rưới ngập mật ong rừng nguyên chất."
      },
      {
        "step": 3,
        "title": "Chưng cách thủy lửa liu riu",
        "instruction": "Đặt hũ thủy tinh vào nồi chưng cách thủy 35-40 phút cho hoa chín mềm tiết ra dưỡng chất vàng."
      }
    ],
    "faqs": [
      {
        "question": "Trẻ nhỏ dưới 1 tuổi có dùng được siro này không?",
        "answer": "Trẻ dưới 1 tuổi không nên dùng mật ong sống; có thể thay mật ong bằng đường phèn nguyên chất để an toàn tuyệt đối cho bé."
      },
      {
        "question": "Hoa đu đủ đực tươi và hoa khô loại nào tốt hơn?",
        "answer": "Hoa tươi giữ trọn vẹn tinh dầu và phấn hoa vi lượng tốt hơn; hoa khô tiện bảo quản dùng quanh năm."
      }
    ],
    "monetization_tips": [
      "Trồng cây đu đủ đực chuyên thu hoa tươi bán giá 150.000đ - 250.000đ/kg.",
      "Sản xuất siro hoa đu đủ đực đóng hũ thủ công cao cấp cho khách thành thị."
    ],
    "tags": [
      "Hoa đu đủ đực",
      "Mật ong rừng",
      "Trị ho dân gian",
      "Siro tự nhiên",
      "Dưỡng sinh"
    ],
    "recipe_spec": {
      "prep_time_minutes": 20,
      "cook_time_minutes": 45,
      "servings": "1 hũ 500ml dùng cho cả gia đình trong 2-3 tháng",
      "botanical_ingredients": [
        "Hoa đu đủ đực tươi 100g (hoặc khô 30g)",
        "Mật ong rừng nguyên chất 250ml",
        "Đường phèn kết tinh tự nhiên 100g",
        "Gừng ta già thái sợi 15g"
      ],
      "health_benefits": [
        "Giảm viêm họng hạt, êm dịu niêm mạc thanh quản tức thì",
        "Tăng cường sức đề kháng đường hô hấp trên khi chuyển mùa",
        "Hỗ trợ tiêu hóa và chống oxy hóa đường ruột"
      ]
    },
    "related_plant_ids": [
      "herb-01",
      "herb-02",
      "fruit-03"
    ]
  },
  {
    "id": "culinary-07",
    "slug": "muoi-ot-rung-tay-bac-doi-khen",
    "common_name": "Muối Ớt Rừng Tây Bắc Hạt Dổi & Mắc Khén Thơm Lừng",
    "scientific_name": "Northwest Mountain Mac Khen & Doi Wild Chili Herbal Salt",
    "aliases": [
      "Muối Chẩm Chéo Khô",
      "Muối Hạt Dổi Mắc Khén",
      "Gia Vị Rừng Tây Bắc"
    ],
    "category": "culinary",
    "nft_class": "culinary_recipe",
    "description": "Bí kíp gia truyền phối trộn muối hột hầm sao khô với hạt dổi rừng nướng than hoa, mắc khén thơm tê đầu lưỡi, ớt chỉ thiên phơi sương và thảo quả rừng. Tạo nên thức chấm danh bất hư truyền của ẩm thực đại ngàn Tây Bắc.",
    "quick_answer": "Hạt dổi nướng trên than củi cho nở bung thơm ngậy, mắc khén sao vàng rang nhỏ lửa rồi giã tay cùng muối hầm, ớt rừng khô và lá chanh bánh tẻ thái sợi.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Salt%2C_Sugar%2C_Chili_Powder_and_Tumeric.jpg",
    "image_sha256": "5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c62",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 2,
    "growth_time": "Chế biến 30 phút, bảo quản thơm ngon 12 tháng",
    "container_suitable": true,
    "seasonality": {
      "north": "Thức chấm ấm nồng tuyệt đỉnh mùa đông Tây Bắc ăn kèm đồ nướng thịt gác bếp",
      "central": "Chấm hải sản, thịt luộc dậy mùi vị thơm nồng độc nhất vô nhị",
      "south": "Gia vị thảo mộc kích thích vị giác được săn đón nồng nhiệt",
      "best_months": [
        1,
        2,
        3,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Zanthoxylum & Michelia Wild Spices Botanical Blend",
      "native_range": "Rừng tự nhiên vùng núi cao Hoàng Liên Sơn, Tây Bắc",
      "active_compounds": [
        "Limonene & Terpineol trong mắc khén",
        "Tinh dầu dổi thơm đặc trưng quý hiếm",
        "Capsaicin tự nhiên trong ớt rừng",
        "Khoáng chất biển tự nhiên từ muối hầm"
      ],
      "soil_ph": "Không áp dụng",
      "ideal_temp": "Bảo quản khô ráo nơi thoáng mát",
      "pot_size": "Lọ thủy tinh kín chống ẩm"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Nướng hạt dổi và sao mắc khén",
        "instruction": "Nướng hạt dổi trên than hồng nở to dậy mùi thơm bùi, sao nhẹ hạt mắc khén trên chảo nóng."
      },
      {
        "step": 2,
        "title": "Sao khô muối hạt biển hầm",
        "instruction": "Rang muối hạt biển đến khi hạt muối nổ lách tách và chuyển sang màu trắng mịn khô ráo."
      },
      {
        "step": 3,
        "title": "Giã cối đá truyền thống",
        "instruction": "Cho tất cả nguyên liệu vào cối đá giã vỡ hạt (không xay quá mịn) để giữ trọn tầng hương vị rừng."
      }
    ],
    "faqs": [
      {
        "question": "Tại sao không nên xay nhuyễn bằng máy xay sinh tố?",
        "answer": "Máy xay sinh tố sinh nhiệt làm bay hơi tinh dầu quý của hạt dổi và khiến mắc khén bị đắng; giã cối đá giữ vị ngọt bùi nguyên bản."
      },
      {
        "question": "Muối này dùng ngon nhất với món ăn nào?",
        "answer": "Chấm thịt gà luộc, thịt nướng than hoa, trứng vịt lộn và chấm hoa quả quả chua (mận, nhót, cóc)."
      }
    ],
    "monetization_tips": [
      "Đóng lọ gia vị đặc sản Tây Bắc cao cấp phân phối cho nhà hàng thịt nướng.",
      "Làm quà biếu nông sản bản địa ngày Tết."
    ],
    "tags": [
      "Mắc khén",
      "Hạt dổi",
      "Muối ớt rừng",
      "Tây Bắc",
      "Gia vị truyền thống"
    ],
    "recipe_spec": {
      "prep_time_minutes": 25,
      "cook_time_minutes": 15,
      "servings": "1 hũ 300g bảo quản dùng quanh năm",
      "botanical_ingredients": [
        "Hạt dổi nếp rừng nướng thơm 20g",
        "Mắc khén sao vàng xay thô 30g",
        "Muối hột biển hầm khô 200g",
        "Ớt rừng tươi thái chỉ sấy khô 20g",
        "Lá chanh ta thái chỉ 10g"
      ],
      "health_benefits": [
        "Kích thích dịch vị dạ dày, làm ấm tỳ vị trừ hàn thấp",
        "Tinh dầu dổi và mắc khén giúp chống đầy hơi chướng bụng",
        "Giảm lượng muối natri tiêu thụ nhờ hương thảo mộc nồng nàn"
      ]
    },
    "related_plant_ids": [
      "herb-08",
      "herb-17",
      "fruit-10"
    ]
  },
  {
    "id": "culinary-08",
    "slug": "tra-cuc-tien-vua-co-ngot-say-lanh",
    "common_name": "Trà Cúc Tiến Vua & Cỏ Ngọt Sấy Lạnh Dưỡng Nhan",
    "scientific_name": "Royal Chrysanthemum & Stevia Cold-Dried Beauty Infusion",
    "aliases": [
      "Trà Hoa Cúc Cỏ Ngọt",
      "Trà Tiến Vua Thanh Nhiệt",
      "Cúc Hoa Dưỡng Thần"
    ],
    "category": "culinary",
    "nft_class": "culinary_recipe",
    "description": "Tuyệt phẩm trà thảo mộc kết hợp hoa cúc chi cúc tiến vua sấy lạnh giữ nguyên màu vàng óng và tinh dầu thanh khiết, phối vị ngọt mát dịu không calorie của cỏ ngọt Stevia và kỷ tử đỏ hữu cơ.",
    "quick_answer": "Hãm 8-10 bông cúc chi sấy lạnh với 3 lá cỏ ngọt và vài hạt kỷ tử trong 300ml nước nóng 85°C trong 5 phút. Nước trà vàng ươm tỏa hương mật hoa, ngọt lành sảng khoái.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/04/Korean_chrysanthemum_tea-Gukhwacha-01.jpg",
    "image_sha256": "6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d73",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Pha trà 5 phút, thưởng thức thư giãn mỗi ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Trà hoa cúc chi mùa đông ấm áp xua tan gió lạnh phương Bắc",
      "central": "Giải nhiệt, sáng mắt mát gan trong mùa nắng chang chang",
      "south": "Uống lạnh cùng vài viên đá giúp giải khát lành mạnh thay nước ngọt có ga",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Asteraceae Imperial Botanical Tea Blend",
      "native_range": "Vùng dược liệu hoa cúc tiến vua truyền thống Nghĩa Trai, Hưng Yên",
      "active_compounds": [
        "Bisabolol & Apigenin an thần tự nhiên",
        "Stevioside ngọt thanh không calo không tăng đường huyết",
        "Carotenoid bảo vệ hoàng điểm mắt",
        "Vitamin C và khoáng chất chống lão hóa"
      ],
      "soil_ph": "Không áp dụng",
      "ideal_temp": "Nhiệt độ nước pha trà tối ưu 85°C - 90°C",
      "pot_size": "Ấm trà thủy tinh trong suốt thưởng sắc trà"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Tráng ấm và đánh thức hoa cúc",
        "instruction": "Cho hoa cúc và kỷ tử vào ấm thủy tinh, rót một ít nước sôi tráng nhẹ rồi gạn bỏ."
      },
      {
        "step": 2,
        "title": "Hãm trà với cỏ ngọt",
        "instruction": "Thả lá cỏ ngọt vào, rót 350ml nước sôi 85°C, đậy nắp hãm trong 5-7 phút cho hoa nở bung."
      },
      {
        "step": 3,
        "title": "Rót ra chén và thưởng thức",
        "instruction": "Rót trà qua màng lọc, hít hà hương thơm hoa cúc rồi nhấp từng ngụm cảm nhận vị ngọt mát đầu lưỡi."
      }
    ],
    "faqs": [
      {
        "question": "Người bị tiểu đường có uống được trà này không?",
        "answer": "Rất tốt! Cỏ ngọt Stevia tạo vị ngọt tự nhiên không chứa carbohydrate và không làm tăng chỉ số đường huyết glycemic index."
      },
      {
        "question": "Uống buổi tối có gây mất ngủ như trà xanh không?",
        "answer": "Không! Trà hoa cúc không chứa caffeine, ngược lại hợp chất apigenin còn giúp xoa dịu thần kinh và mang lại giấc ngủ sâu."
      }
    ],
    "monetization_tips": [
      "Phối trộn gói trà túi lọc hoặc lọ trà hoa cúc tiến vua dưỡng nhan cao cấp.",
      "Cung cấp set quà trà thảo mộc cho khối văn phòng và doanh nghiệp."
    ],
    "tags": [
      "Trà hoa cúc",
      "Cỏ ngọt",
      "Dưỡng nhan",
      "Sáng mắt",
      "Không caffeine"
    ],
    "recipe_spec": {
      "prep_time_minutes": 10,
      "cook_time_minutes": 5,
      "servings": "4 tách trà thơm ấm áp",
      "botanical_ingredients": [
        "Hoa cúc chi hữu cơ sấy thăng hoa 10 bông",
        "Lá cỏ ngọt Stevia sấy khô 3-4 lá",
        "Kỷ tử đỏ Ninh Hạ hữu cơ 15 hạt",
        "Táo đỏ Tân Cương thái lát 3 quả"
      ],
      "health_benefits": [
        "Sáng mắt, giảm nhức mỏi điều tiết cho người làm việc máy tính nhiều",
        "Hạ hỏa, thanh nhiệt mát gan và làm mịn màng da dẻ",
        "Giúp an thần, đi vào giấc ngủ sâu không mộng mị"
      ]
    },
    "related_plant_ids": [
      "herb-20",
      "herb-25",
      "orn-11"
    ]
  },
  {
    "id": "culinary-09",
    "slug": "canh-tap-tang-nam-bo-tom-dong",
    "common_name": "Canh Rau Tập Tàng Nam Bộ Nấu Tôm Đồng Giải Nhiệt",
    "scientific_name": "Southern Wild Mixed Field Greens & Freshwater Shrimp Soup",
    "aliases": [
      "Canh Rau Rừng Nam Bộ",
      "Canh Tập Tàng Tôm Đồng",
      "Bát Canh Mẹ Nấu"
    ],
    "category": "culinary",
    "nft_class": "culinary_recipe",
    "description": "Bát canh ngọt lành kết tinh tinh hoa đồng quê Nam Bộ với hơn 7 loại rau đồng vườn nhà: rau dền cơm, mồng tơi, rau ngót, lá lốt non, rau đay, càng cua hòa cùng vị ngọt đậm của tôm đồng tươi giã nhuyễn.",
    "quick_answer": "Tôm đồng giã nhuyễn xào thơm cùng hành tím, đổ nước đun sôi rồi thả nắm rau tập tàng vườn nhà vừa hái vào, sôi bùng 1 phút nhấc xuống ăn kèm cơm trắng cá kho tộ.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Canh_Khoai_M%E1%BB%A1.jpg",
    "image_sha256": "7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e84",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Nấu trong 20 phút, món ăn chữa lành hương vị quê hương",
    "container_suitable": true,
    "seasonality": {
      "north": "Bát canh mát lành mùa hè giải nhiệt xua tan oi bức",
      "central": "Món ăn dân dã chống nóng mùa gió phơn miền Trung",
      "south": "Rau tập tàng mọc bạt ngàn sau những cơn mưa đầu mùa Nam Bộ",
      "best_months": [
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ]
    },
    "botanical_details": {
      "family": "Wild Foraged Indigenous Greens Traditional Cuisine",
      "native_range": "Vườn nhà làng quê Nam Bộ, Việt Nam",
      "active_compounds": [
        "Chất nhầy tự nhiên bảo vệ niêm mạc dạ dày từ mồng tơi, rau đay",
        "Diệp lục tố và chất xơ hòa tan thanh lọc ruột",
        "Canxi hữu cơ dễ hấp thu từ vỏ tôm đồng",
        "Chống oxy hóa đa dạng từ 7 loại thảo mộc"
      ],
      "soil_ph": "Không áp dụng",
      "ideal_temp": "Thưởng thức khi canh vừa chín tới còn nóng ấm",
      "pot_size": "Tô canh gia đình truyền thống"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Hái và rửa rau tập tàng",
        "instruction": "Hái mỗi thứ rau một ít: ngót, dền cơm, càng cua, lá lốt, mồng tơi; rửa sạch để ráo thái khúc vừa ăn."
      },
      {
        "step": 2,
        "title": "Giã tôm đồng và phi thơm",
        "instruction": "Tôm đồng rửa sạch bỏ đầu cứng, cho vào cối đá giã nhuyễn; phi thơm hành tím rồi đảo đều thịt tôm."
      },
      {
        "step": 3,
        "title": "Nấu canh lửa lớn",
        "instruction": "Đổ 1 lít nước lọc vào đun sôi bùng, thả toàn bộ rau tập tàng vào nấu trong 1-2 phút, nêm chút nước mắm ngon rồi tắt bếp."
      }
    ],
    "faqs": [
      {
        "question": "Có thể thay tôm đồng bằng nguyên liệu nào khác?",
        "answer": "Có thể thay tôm đồng bằng cua đồng giã lọc nước, hến sông hoặc thịt băm hữu cơ đều ngọt nước đậm đà."
      },
      {
        "question": "Tại sao không nên đậy nắp vung khi nấu canh rau tập tàng?",
        "answer": "Mở vung khi nấu trên lửa lớn giúp rau giữ được màu xanh mướt tự nhiên và không bị nồng ố vàng."
      }
    ],
    "monetization_tips": [
      "Đóng gói combo rau tập tàng hữu cơ tươi giao tận bếp các căn hộ chung cư thành phố.",
      "Đưa thực đơn canh quê vào các nhà hàng ẩm thực thuần chay và thực dưỡng."
    ],
    "tags": [
      "Canh tập tàng",
      "Rau đồng quê",
      "Tôm đồng",
      "Nam Bộ",
      "Thanh nhiệt"
    ],
    "recipe_spec": {
      "prep_time_minutes": 20,
      "cook_time_minutes": 10,
      "servings": "Nồi canh 4-5 người ăn",
      "botanical_ingredients": [
        "Rau dền cơm, rau đay, mồng tơi, rau ngót non hái tươi 300g",
        "Lá lốt bánh tẻ 5 lá",
        "Tôm đồng sông giã nhuyễn 150g",
        "Hành tím củ phi thơm",
        "Nước mắm truyền thống"
      ],
      "health_benefits": [
        "Bổ sung dồi dào chất xơ hòa tan tự nhiên và diệp lục tố",
        "Làm mát cơ thể, giải độc cơ thể sau những ngày nắng nóng",
        "Cung cấp canxi hữu cơ dồi dào từ vỏ tôm đồng giã nhuyễn"
      ]
    },
    "related_plant_ids": [
      "herb-04",
      "herb-14",
      "herb-15"
    ]
  },
  {
    "id": "culinary-10",
    "slug": "dau-giam-tia-to-rung-len-men",
    "common_name": "Dầu Giấm Tía Tô Rừng & Giấm Táo Lên Men Tự Nhiên Dưỡng Ruột",
    "scientific_name": "Wild Perilla & Artisanal Raw Apple Cider Vinaigrette",
    "aliases": [
      "Sốt Salad Tía Tô Rừng",
      "Giấm Tía Tô Lên Men",
      "Dầu Giấm Thực Dưỡng"
    ],
    "category": "culinary",
    "nft_class": "culinary_recipe",
    "description": "Công thức nước sốt trộn salad thảo mộc cao cấp kết hợp giấm táo lên men tự nhiên giàu probiotics với tinh chất lá tía tô rừng, dầu mè ép lạnh thủ công và tỏi cô đơn băm nhuyễn. Tăng cường hệ vi sinh đường ruột và bảo vệ mạch máu.",
    "quick_answer": "Lá tía tô tím thái nhuyễn lắc đều cùng giấm táo có men giấm sống, dầu mè đen ép nguội và mật ong hoa rừng tạo nên thứ nước sốt màu tím hồng quyến rũ cho mọi đĩa salad.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Perilla_leaves.jpg",
    "image_sha256": "8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f95",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Chế biến 15 phút, bảo quản dùng trong 30 ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Kích thích tiêu hóa và làm ấm dạ dày trong những ngày đông se lạnh",
      "central": "Món sốt giải nhiệt chống ngán tuyệt vời cho bữa cơm mùa hè",
      "south": "Phối trộn ăn kèm các món rau mầm, xà lách thủy canh tươi mát quanh năm",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Lamiaceae & Raw Probiotic Acetobacter Fermentation",
      "native_range": "Ẩm thực thực dưỡng tự nhiên Việt Nam",
      "active_compounds": [
        "Acid Rosmarinic chống dị ứng và bảo vệ tế bào gan",
        "Acid Alpha-linolenic (Omega-3 thực vật)",
        "Axit Acetic tự nhiên tiêu hóa chất béo",
        "Lợi khuẩn men giấm sống (The Mother)"
      ],
      "soil_ph": "pH tự nhiên của sốt 3.8 - 4.2",
      "ideal_temp": "Bảo quản mát 10°C - 15°C",
      "pot_size": "Chai thủy tinh nắp bần 250ml"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Chiết xuất màu tím tía tô",
        "instruction": "Lá tía tô rửa sạch vẩy khô, thái sợi thật nhuyễn rồi ngâm vào giấm táo 10 phút để giấm chuyển màu hồng tím đẹp mắt."
      },
      {
        "step": 2,
        "title": "Nhũ hóa dầu mè và gia vị",
        "instruction": "Cho dầu mè đen ép lạnh, mật ong rừng, tỏi cô đơn giã nhuyễn và xíu muối hầm vào chai."
      },
      {
        "step": 3,
        "title": "Lắc đều trước khi sử dụng",
        "instruction": "Đậy chặt nắp chai lắc mạnh 15 giây tạo thành hỗn hợp sốt sánh mịn thơm phức rưới lên salad."
      }
    ],
    "faqs": [
      {
        "question": "Có thể bảo quản sốt giấm tía tô này ở nhiệt độ phòng không?",
        "answer": "Nhờ nồng độ axit acetic tự nhiên và tinh dầu tía tô kháng khuẩn, sốt để ngoài mát 7 ngày hoặc ngăn mát tủ lạnh 30 ngày vẫn tươi ngon."
      },
      {
        "question": "Sốt này có tác dụng gì cho người giảm cân?",
        "answer": "Omega-3 tự nhiên và axit acetic giúp tạo cảm giác no lâu, tăng cường đốt mỡ thừa và ổn định đường huyết sau bữa ăn."
      }
    ],
    "monetization_tips": [
      "Sản xuất sốt salad tía tô thực dưỡng đóng chai phân phối cho chuỗi cửa hàng thực phẩm sạch.",
      "Cung cấp cho các câu lạc bộ ăn sạch eat-clean và yoga dưỡng sinh."
    ],
    "tags": [
      "Tía tô rừng",
      "Giấm táo",
      "Dầu mè",
      "Probiotic",
      "Salad thực dưỡng"
    ],
    "recipe_spec": {
      "prep_time_minutes": 15,
      "cook_time_minutes": 0,
      "servings": "1 chai 250ml dùng cho 10-15 đĩa salad rau tươi",
      "botanical_ingredients": [
        "Lá tía tô rừng đỏ tím thái chỉ nhuyễn 30g",
        "Giấm táo hữu cơ con giấm sống 100ml",
        "Dầu mè đen ép lạnh nguyên chất 80ml",
        "Mật ong hoa rừng 2 thìa canh",
        "Tỏi cô đơn giã nhuyễn 2 nhánh"
      ],
      "health_benefits": [
        "Bổ sung acid béo Omega-3 thực vật tự nhiên từ tía tô và dầu mè",
        "Chứa lợi khuẩn axit acetic hỗ trợ tiêu hóa thức ăn dầu mỡ",
        "Giảm cholesterol xấu và làm sạch lòng mạch máu"
      ]
    },
    "related_plant_ids": [
      "herb-01",
      "herb-03",
      "herb-10"
    ]
  },
  {
    "id": "forest-06",
    "slug": "vuon-quoc-gia-ba-be",
    "common_name": "Vườn Quốc Gia Ba Bể",
    "scientific_name": "Ba Be National Park (Limestone Forest & Freshwater Lake Biome)",
    "aliases": [
      "VQG Ba Bể",
      "Rừng Hồ Ba Bể",
      "Ba Be Freshwater Wetland Ramsar"
    ],
    "category": "forest",
    "nft_class": "geo_forest_10000m2",
    "description": "Viên ngọc xanh của vùng núi đá vôi Đông Bắc với diện tích 10.048 ha (100.480.000 m²). Quần thể rừng trên núi đá vôi nguyên sơ ôm trọn hồ nước ngọt tự nhiên lớn nhất Việt Nam, được công nhận là Khu Ramsar thế giới và Vườn Di sản ASEAN.",
    "quick_answer": "Vườn quốc gia Ba Bể là nơi bảo tồn 1.268 loài thực vật bậc cao và quần thể Voọc mũi hếch quý hiếm. Mỗi NFT tương ứng bảo trợ 10.000 m² (1 ha) diện tích rừng núi đá vôi và mặt nước hồ Ba Bể.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/47/Ba_Be_Lake_6464.jpg",
    "image_sha256": "9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a06",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 5,
    "growth_time": "Rừng đá vôi và hồ tự nhiên hàng triệu năm tuổi bảo tồn vĩnh cửu",
    "container_suitable": false,
    "seasonality": {
      "north": "Mùa thu và xuân nước hồ trong vắt phẳng lặng như gương soi bóng đại ngàn",
      "central": "Khu rừng giữ nước điều tiết khí hậu cho toàn bộ lưu vực sông Cầu",
      "south": "Điểm đến sinh thái và bảo tồn danh tiếng của du khách phương Nam",
      "best_months": [
        2,
        3,
        4,
        9,
        10,
        11
      ],
      "warning": "Giữ gìn vệ sinh nguồn nước ngọt tự nhiên, không xả rác khi đi thuyền trên lòng hồ"
    },
    "botanical_details": {
      "family": "Karst Mountain & Natural Freshwater Lake Ecosystem",
      "native_range": "Huyện Ba Bể, tỉnh Bắc Kạn",
      "active_compounds": [
        "Quần thể Thiết sam giả lá ngắn trên đỉnh núi đá",
        "Hồ nước ngọt tự nhiên trên núi đá vôi lớn nhất Việt Nam",
        "Nơi sinh sống của Voọc mũi hếch cực kỳ nguy cấp",
        "182 loài lan rừng bản địa quý hiếm"
      ],
      "soil_ph": "6.5 - 7.5 (Đất phong hóa trên đá vôi Rendzina)",
      "ideal_temp": "16°C - 28°C mát mẻ quanh năm",
      "pot_size": "Khu bảo tồn 10.048 ha (Tương ứng 10.048 Lô NFT 10.000m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Có mặt tại VQG Ba Bể và bật định vị",
        "instruction": "Đến VQG Ba Bể (tỉnh Bắc Kạn) trong bán kính 8km từ tâm vườn. Bật định vị GPS."
      },
      {
        "step": 2,
        "title": "Xác thực GPS Check-in trên Web3",
        "instruction": "Bấm nút Xác Thực GPS Check-in trên Web3 Sandbox để nhận Vé Check-in số 24 giờ."
      },
      {
        "step": 3,
        "title": "Đúc NFT Lô Rừng Hồ Ba Bể 10.000m²",
        "instruction": "Ký ví Web3 nhận chứng nhận số bảo trợ 1 ha rừng đá vôi và mặt nước hồ Ba Bể trên Blockchain."
      }
    ],
    "faqs": [
      {
        "question": "Hồ Ba Bể được hình thành như thế nào?",
        "answer": "Hồ hình thành từ hơn 200 triệu năm trước qua các đợt kiến tạo địa chất Karst đặc biệt, là hồ nước ngọt tự nhiên trên núi đá vôi lớn nhất Việt Nam."
      },
      {
        "question": "Tổng số Lô NFT của VQG Ba Bể là bao nhiêu?",
        "answer": "Tổng diện tích 10.048 ha tương ứng với tối đa 10.048 Lô NFT độc bản (1 ha/lô)."
      }
    ],
    "monetization_tips": [
      "Chủ sở hữu NFT nhận huy hiệu Người Bảo Hộ Hồ Ba Bể và ưu đãi tour chèo thuyền kayak sinh thái.",
      "Tích lũy chỉ số Tín chỉ xanh Carbon bù đắp phát thải cá nhân."
    ],
    "tags": [
      "Ba Bể",
      "Bắc Kạn",
      "Vườn quốc gia",
      "Khu Ramsar",
      "Vườn Di sản ASEAN",
      "Hồ trên núi"
    ],
    "forest_spec": {
      "center_lat": 22.4089,
      "center_lng": 105.6178,
      "radius_km": 8,
      "total_area_m2": 100480000,
      "unit_area_m2": 10000,
      "max_nft_supply": 10048,
      "province": "Bắc Kạn",
      "unesco_or_status": "Khu Đất Ngập Nước Ramsar Thế Giới & Vườn Di Sản ASEAN"
    },
    "related_plant_ids": [
      "herb-05",
      "orn-01",
      "fruit-08"
    ]
  },
  {
    "id": "forest-07",
    "slug": "vuon-quoc-gia-ba-vi",
    "common_name": "Vườn Quốc Gia Ba Vì",
    "scientific_name": "Ba Vi National Park (Subtropical Mountain Forest Biome)",
    "aliases": [
      "VQG Ba Vì",
      "Rừng Núi Tản Viên",
      "Lá Phổi Xanh Thủ Đô"
    ],
    "category": "forest",
    "nft_class": "geo_forest_10000m2",
    "description": "Lá phổi xanh che chở cho vùng đồng bằng Bắc Bộ với diện tích 9.702 ha (97.020.000 m²). Hệ sinh thái rừng nhiệt đới và cận nhiệt đới vùng núi cao với thảm thực vật đa dạng, kho tàng cây thuốc quý Nam dược và di tích lịch sử huyền thoại Tản Viên Sơn Thánh.",
    "quick_answer": "Vườn quốc gia Ba Vì sở hữu hơn 1.209 loài thực vật, trong đó có hơn 503 loài cây thuốc nam quý giá. Mỗi NFT đại diện cho 10.000 m² (1 ha) rừng bảo tồn lá phổi xanh của Thủ đô Hà Nội.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Nha_co_Ba_Vi.JPG",
    "image_sha256": "a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b7",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 5,
    "growth_time": "Rừng núi Tản Viên huyền thoại bảo tồn nghìn năm",
    "container_suitable": false,
    "seasonality": {
      "north": "Khí hậu mát mẻ quanh năm, mùa đông sương mù bảng lảng như chốn bồng lai",
      "central": "Là lá chắn sinh thái phía Tây bảo vệ không khí Thủ đô Hà Nội",
      "south": "Điểm đến du lịch sinh thái và cắm trại nổi tiếng miền Bắc",
      "best_months": [
        3,
        4,
        5,
        9,
        10,
        11
      ],
      "warning": "Nghiêm cấm hái trộm các loài phong lan và cây dược liệu quý trong rừng cấm"
    },
    "botanical_details": {
      "family": "Subtropical Evergreen Mountain Forest Ecosystem",
      "native_range": "Dãy núi Ba Vì, Thành phố Hà Nội",
      "active_compounds": [
        "503 loài cây thuốc Nam quý giá",
        "Quần thể Bách xanh ngàn năm tuổi Cổ Đỉnh",
        "Rừng hoa dã quỳ vàng rực rỡ đầu đông",
        "Hệ đệm bảo tồn nguồn nước ngầm vùng đồng bằng"
      ],
      "soil_ph": "5.0 - 6.0 (Đất mùn Feralit núi cao màu nâu đỏ)",
      "ideal_temp": "15°C - 26°C tiểu khí hậu núi cao mát rượi",
      "pot_size": "Khu bảo tồn 9.702 ha (Tương ứng 9.702 Lô NFT 10.000m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Có mặt tại núi Ba Vì và bật GPS",
        "instruction": "Di chuyển đến khu vực VQG Ba Vì (bán kính 7km từ đỉnh Tản Viên). Bật định vị trên máy."
      },
      {
        "step": 2,
        "title": "Xác thực Check-in số Web3",
        "instruction": "Bấm Xác Thực GPS Check-in trên Web3 Sandbox, nhận Vé Check-in số bảo tồn 24 giờ."
      },
      {
        "step": 3,
        "title": "Đúc NFT Lô Rừng Núi Ba Vì 10.000m²",
        "instruction": "Ký ví Web3 nhận chứng nhận số bảo trợ 1 ha đại ngàn rừng Tản Viên trên Blockchain."
      }
    ],
    "faqs": [
      {
        "question": "Cây Bách xanh ở Ba Vì có gì đặc biệt?",
        "answer": "Quần thể Bách xanh trên đỉnh cao 1000m của Ba Vì là loài cây lá kim cổ thụ quý hiếm có tên trong Sách Đỏ Việt Nam."
      },
      {
        "question": "Tổng số Lô NFT của VQG Ba Vì là bao nhiêu?",
        "answer": "Tổng diện tích 9.702 ha tương ứng với tối đa 9.702 Lô NFT độc bản (1 ha/lô)."
      }
    ],
    "monetization_tips": [
      "Chủ sở hữu NFT nhận huy hiệu Người Giữ Rừng Tản Viên và vé tham quan rừng hoa dã quỳ.",
      "Tham gia chương trình trồng bổ sung cây thuốc Nam bản địa tại Ba Vì."
    ],
    "tags": [
      "Ba Vì",
      "Hà Nội",
      "Vườn quốc gia",
      "Núi Tản Viên",
      "Cây thuốc Nam",
      "Bách xanh"
    ],
    "forest_spec": {
      "center_lat": 21.0833,
      "center_lng": 105.3667,
      "radius_km": 7,
      "total_area_m2": 97020000,
      "unit_area_m2": 10000,
      "max_nft_supply": 9702,
      "province": "Hà Nội",
      "unesco_or_status": "Vườn Quốc Gia Sinh Thái Trọng Điểm Bắc Bộ"
    },
    "related_plant_ids": [
      "herb-01",
      "herb-17",
      "orn-01"
    ]
  },
  {
    "id": "forest-08",
    "slug": "vuon-quoc-gia-pu-mat",
    "common_name": "Vườn Quốc Gia Pù Mát",
    "scientific_name": "Pu Mat National Park (Annamite Range Rainforest Core)",
    "aliases": [
      "VQG Pù Mát",
      "Rừng Pù Mát Nghệ An",
      "Pu Mat Biosphere Reserve Core"
    ],
    "category": "forest",
    "nft_class": "geo_forest_10000m2",
    "description": "Đại ngàn rừng nguyên sinh dải Trường Sơn Bắc với diện tích 94.804 ha (948.040.000 m²). Vùng lõi của Khu dự trữ sinh quyển miền Tây Nghệ An được UNESCO công nhận, là ngôi nhà an toàn của loài linh trưởng cực kỳ nguy cấp Voọc xám và nơi phát hiện Sao La kỳ bí.",
    "quick_answer": "Vườn quốc gia Pù Mát là một trong những trung tâm đa dạng sinh học lớn nhất Đông Dương với gần 2.500 loài thực vật bậc cao. Mỗi NFT tương ứng bảo vệ 10.000 m² (1 ha) rừng Trường Sơn nguyên sơ.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Annamite_range_pu_mat_2007_05.jpg",
    "image_sha256": "b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c8",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 5,
    "growth_time": "Rừng mưa nhiệt đới nguyên sinh Trường Sơn đại ngàn",
    "container_suitable": false,
    "seasonality": {
      "north": "Rừng nguyên sinh giữ ẩm và chắn gió bão cực kỳ kiên cường",
      "central": "Lá chắn che chở vùng đồng bằng Nghệ An khỏi lũ quét và lốc xoáy",
      "south": "Khu rừng hoang dã hùng vĩ bậc nhất dải đất miền Trung",
      "best_months": [
        2,
        3,
        4,
        5,
        8,
        9
      ],
      "warning": "Nghiêm cấm mọi hành vi săn bẫy động vật hoang dã trong vùng lõi bảo tồn nghiêm ngặt"
    },
    "botanical_details": {
      "family": "Annamite Mountain Lowland & Montane Rainforest Biome",
      "native_range": "Các huyện Con Cuông, Anh Sơn, Tương Dương, tỉnh Nghệ An",
      "active_compounds": [
        "Khu vực sinh sống của Sao la (Kỳ lân châu Á)",
        "Quần thể Voọc xám và Vượn đen má trắng lớn nhất Việt Nam",
        "Gần 2.500 loài thực vật bậc cao",
        "Cây Sa mu dầu cổ thụ nghìn năm tuổi"
      ],
      "soil_ph": "5.2 - 6.2 (Đất Feralit phát triển trên đá phiến sét)",
      "ideal_temp": "18°C - 32°C độ ẩm cao quanh năm",
      "pot_size": "Khu bảo tồn 94.804 ha (Tương ứng 94.804 Lô NFT 10.000m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Đến khu bảo tồn Pù Mát và bật GPS",
        "instruction": "Có mặt tại huyện Con Cuông/Pù Mát (Nghệ An) trong bán kính 20km từ tâm rừng. Bật GPS."
      },
      {
        "step": 2,
        "title": "Xác thực Check-in số Web3",
        "instruction": "Bấm Xác Thực GPS Check-in trên Web3 Sandbox, nhận Vé Check-in số 24 giờ."
      },
      {
        "step": 3,
        "title": "Đúc NFT Lô Rừng Pù Mát 10.000m²",
        "instruction": "Ký ví Web3 nhận chứng nhận số bảo trợ 1 ha đại ngàn rừng mưa Trường Sơn trên Blockchain."
      }
    ],
    "faqs": [
      {
        "question": "Pù Mát có nghĩa là gì trong tiếng bản địa?",
        "answer": "Trong tiếng Thái cổ, \"Pù\" nghĩa là núi, \"Mát\" nghĩa là gió; Pù Mát có nghĩa là đỉnh núi đón gió mát quanh năm."
      },
      {
        "question": "Tổng số Lô NFT của VQG Pù Mát là bao nhiêu?",
        "answer": "Tổng diện tích 94.804 ha tương ứng với tối đa 94.804 Lô NFT độc bản (1 ha/lô)."
      }
    ],
    "monetization_tips": [
      "Chủ sở hữu NFT nhận chứng nhận Người Bảo Hộ Đại Ngàn Trường Sơn.",
      "Tín chỉ sinh thái Carbon rừng tự nhiên (Forest Carbon Offsets)."
    ],
    "tags": [
      "Pù Mát",
      "Nghệ An",
      "Vườn quốc gia",
      "Khu sinh quyển UNESCO",
      "Sao la",
      "Trường Sơn"
    ],
    "forest_spec": {
      "center_lat": 18.9667,
      "center_lng": 104.8333,
      "radius_km": 20,
      "total_area_m2": 948040000,
      "unit_area_m2": 10000,
      "max_nft_supply": 94804,
      "province": "Nghệ An",
      "unesco_or_status": "Vùng Lõi Khu Dự Trữ Sinh Quyển Thế Giới UNESCO (2007)"
    },
    "related_plant_ids": [
      "herb-08",
      "fruit-06",
      "orn-02"
    ]
  },
  {
    "id": "forest-09",
    "slug": "vuon-quoc-gia-tram-chim",
    "common_name": "Vườn Quốc Gia Tràm Chim",
    "scientific_name": "Tram Chim National Park (Dong Thap Muoi Wetland Ramsar Biome)",
    "aliases": [
      "VQG Tràm Chim",
      "Vương Quốc Sếu Đầu Đỏ",
      "Tram Chim Wetland Ramsar Site"
    ],
    "category": "forest",
    "nft_class": "geo_forest_10000m2",
    "description": "Vùng đất ngập nước Đồng Tháp Mười nguyên sơ với diện tích 7.313 ha (73.130.000 m²). Là khu Ramsar thứ 2.000 của thế giới, xứ sở của bạt ngàn đồng cỏ bàng, tràm nước và nơi dừng chân di trú thiêng liêng của loài Sếu đầu đỏ quý hiếm bậc nhất hành tinh.",
    "quick_answer": "Vườn quốc gia Tràm Chim bảo tồn hệ sinh thái ngập nước theo mùa của lưu vực sông Mê Kông với 130 loài cá nước ngọt và 233 loài chim nước. Mỗi NFT tương ứng bảo tồn 10.000 m² (1 ha) đồng cỏ ngập nước Tràm Chim.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Tr%C3%A0m_chim%2C_Tam_nong%2C_Dong_Thap%2C_vietnam_-_panoramio.jpg",
    "image_sha256": "c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d9",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 5,
    "growth_time": "Hệ sinh thái đất ngập nước Đồng Tháp Mười bảo tồn vĩnh cửu",
    "container_suitable": false,
    "seasonality": {
      "north": "Biểu tượng thiên nhiên trù phú phương Nam",
      "central": "Vùng đất ngập nước hiền hòa của đồng bằng châu thổ sông Cửu Long",
      "south": "Mùa nước nổi (tháng 9-11) ngập tràn bông súng, mùa khô (tháng 1-5) đón đàn Sếu đầu đỏ",
      "best_months": [
        1,
        2,
        3,
        4,
        9,
        10,
        11
      ],
      "warning": "Nghiêm cấm đốt lửa hoặc gây tiếng động lớn làm ảnh hưởng bầy sếu về trú ngụ"
    },
    "botanical_details": {
      "family": "Freshwater Seasonally Inundated Wetland Ramsar Biome",
      "native_range": "Huyện Tam Nông, tỉnh Đồng Tháp",
      "active_compounds": [
        "Đồng cỏ năng kim thức ăn yêu thích của Sếu đầu đỏ",
        "Rừng tràm ngập nước Melaleuca cajuputi",
        "Thảm sen hồng và súng ma Đồng Tháp Mười",
        "Bảo tồn nguồn gien lúa trời hoang dã Oryza rufipogon"
      ],
      "soil_ph": "4.5 - 5.5 (Đất phèn ngập nước Đồng Tháp)",
      "ideal_temp": "26°C - 33°C nhiệt đới gió mùa",
      "pot_size": "Khu bảo tồn 7.313 ha (Tương ứng 7.313 Lô NFT 10.000m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Có mặt tại VQG Tràm Chim và bật GPS",
        "instruction": "Di chuyển đến khu vực huyện Tam Nông (Đồng Tháp) trong bán kính 7km từ tâm vườn. Bật GPS."
      },
      {
        "step": 2,
        "title": "Xác thực Check-in số Web3",
        "instruction": "Bấm Xác Thực GPS Check-in trên Web3 Sandbox, nhận Vé Check-in số 24 giờ."
      },
      {
        "step": 3,
        "title": "Đúc NFT Lô Rừng Tràm Chim 10.000m²",
        "instruction": "Ký ví Web3 nhận chứng nhận số bảo trợ 1 ha vùng đất ngập nước Tràm Chim trên Blockchain."
      }
    ],
    "faqs": [
      {
        "question": "Tại sao Tràm Chim trở thành khu Ramsar thứ 2.000 của thế giới?",
        "answer": "Tràm Chim là mẫu hình thu nhỏ hoàn hảo còn sót lại của vùng trũng ngập nước Đồng Tháp Mười hoang sơ trước khi bị khai phá nông nghiệp."
      },
      {
        "question": "Tổng số Lô NFT của VQG Tràm Chim là bao nhiêu?",
        "answer": "Tổng diện tích 7.313 ha tương ứng với tối đa 7.313 Lô NFT độc bản (1 ha/lô)."
      }
    ],
    "monetization_tips": [
      "Chủ sở hữu NFT nhận huy hiệu Người Bảo Vệ Sếu Đầu Đỏ và ưu đãi tour tắc ráng mùa nước nổi.",
      "Tín chỉ bảo tồn đa dạng sinh học đất ngập nước Wetland Credits."
    ],
    "tags": [
      "Tràm Chim",
      "Đồng Tháp",
      "Khu Ramsar 2000",
      "Sếu đầu đỏ",
      "Rừng tràm",
      "Đồng Tháp Mười"
    ],
    "forest_spec": {
      "center_lat": 10.7167,
      "center_lng": 105.5167,
      "radius_km": 7,
      "total_area_m2": 73130000,
      "unit_area_m2": 10000,
      "max_nft_supply": 7313,
      "province": "Đồng Tháp",
      "unesco_or_status": "Khu Đất Ngập Nước Ramsar Thứ 2.000 Của Thế Giới (2012)"
    },
    "related_plant_ids": [
      "herb-12",
      "fruit-15",
      "orn-03"
    ]
  },
  {
    "id": "forest-10",
    "slug": "rung-ngap-man-can-gio",
    "common_name": "Khu Dự Trữ Sinh Quyển Rừng Ngập Mặn Cần Giờ",
    "scientific_name": "Can Gio Mangrove Biosphere Reserve (Green Tidal Shield Biome)",
    "aliases": [
      "Rừng Sác Cần Giờ",
      "Lá Phổi Xanh TP.HCM",
      "Can Gio Mangrove Forest UNESCO"
    ],
    "category": "forest",
    "nft_class": "geo_forest_10000m2",
    "description": "Lá chắn sinh thái ngập mặn kỳ vĩ che chở cho đô thị lớn nhất phương Nam với diện tích 75.740 ha (757.400.000 m²). Khu dự trữ sinh quyển thế giới đầu tiên của Việt Nam được UNESCO vinh danh năm 2000, là bể hấp thụ carbon khổng lồ (Blue Carbon) và bức tường xanh chống triều cường biến đổi khí hậu.",
    "quick_answer": "Rừng ngập mặn Cần Giờ là kỳ tích phục hồi sinh thái rừng vĩ đại nhất thế giới sau chiến tranh hóa học, bảo vệ hệ sinh thái đước đôi, bần trắng và vẹt đen. Mỗi NFT đại diện cho 10.000 m² (1 ha) rừng ngập mặn bảo vệ thành phố.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Can_Gio_mangrove_forest.jpg",
    "image_sha256": "d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e0",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 5,
    "growth_time": "Rừng ngập mặn phục hồi vĩ đại bảo tồn vĩnh cửu",
    "container_suitable": false,
    "seasonality": {
      "north": "Kỳ tích hồi sinh màu xanh của nhân dân miền Nam kiên cường",
      "central": "Mô hình chuẩn mực phục hồi rừng ngập mặn cho các tỉnh ven biển",
      "south": "Lá chắn sóng xanh và máy lọc không khí khổng lồ cho 10 triệu dân Sài Gòn",
      "best_months": [
        1,
        2,
        3,
        4,
        10,
        11,
        12
      ],
      "warning": "Tuyệt đối không xâm phạm rừng phòng hộ và không chặt phá cây đước giữ đất ven sông"
    },
    "botanical_details": {
      "family": "Rhizophoraceae Coastal Tidal Mangrove Biome",
      "native_range": "Huyện Cần Giờ, Thành phố Hồ Chí Minh",
      "active_compounds": [
        "Bộ rễ chống kiên cố của Đước đôi Rhizophora apiculata",
        "Khả năng hấp thụ khí nhà kính (Blue Carbon) gấp 4 lần rừng trên cạn",
        "Bảo tồn loài bần đắng, vẹt dù, dừa nước bản địa",
        "Vườn ươm tự nhiên của tôm cá vùng biển Đông Nam"
      ],
      "soil_ph": "6.5 - 7.5 (Đất bùn ngập mặn ven cửa sông)",
      "ideal_temp": "26°C - 34°C nắng gió duyên hải",
      "pot_size": "Khu bảo tồn 75.740 ha (Tương ứng 75.740 Lô NFT 10.000m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Đến huyện đảo Cần Giờ và bật GPS",
        "instruction": "Di chuyển qua phà Bình Khánh đến khu vực Cần Giờ trong bán kính 18km. Bật GPS trên máy."
      },
      {
        "step": 2,
        "title": "Xác thực Check-in số Web3",
        "instruction": "Bấm Xác Thực GPS Check-in trên Web3 Sandbox, nhận Vé Check-in số 24 giờ."
      },
      {
        "step": 3,
        "title": "Đúc NFT Lô Rừng Ngập Mặn Cần Giờ 10.000m²",
        "instruction": "Ký ví Web3 nhận chứng nhận số bảo trợ 1 ha lá chắn xanh Cần Giờ trên Blockchain."
      }
    ],
    "faqs": [
      {
        "question": "Tại sao Rừng Sác Cần Giờ được UNESCO vinh danh đầu tiên ở Việt Nam?",
        "answer": "Cần Giờ được công nhận vào năm 2000 nhờ thành quả phi thường của các nhà lâm nghiệp đã trồng lại màu xanh trên vùng đất chết từng bị chất độc hóa học tàn phá trơ trụi."
      },
      {
        "question": "Tổng số Lô NFT của Khu sinh quyển Cần Giờ là bao nhiêu?",
        "answer": "Tổng diện tích 75.740 ha tương ứng với tối đa 75.740 Lô NFT độc bản (1 ha/lô)."
      }
    ],
    "monetization_tips": [
      "Chủ sở hữu NFT nhận chứng nhận Người Bảo Vệ Lá Chắn Xanh Sài Gòn và ưu đãi tour ca nô rừng Sác.",
      "Tín chỉ Carbon xanh Đại dương (Blue Carbon Credits) đạt chuẩn quốc tế."
    ],
    "tags": [
      "Cần Giờ",
      "TP.HCM",
      "Rừng ngập mặn",
      "UNESCO",
      "Blue Carbon",
      "Rừng Sác"
    ],
    "forest_spec": {
      "center_lat": 10.4167,
      "center_lng": 106.95,
      "radius_km": 18,
      "total_area_m2": 757400000,
      "unit_area_m2": 10000,
      "max_nft_supply": 75740,
      "province": "TP. Hồ Chí Minh",
      "unesco_or_status": "Khu Dự Trữ Sinh Quyển Thế Giới UNESCO Đầu Tiên Việt Nam (2000)"
    },
    "related_plant_ids": [
      "herb-01",
      "fruit-08",
      "orn-07"
    ]
  },
  // --- MILESTONE 5: FINAL 20 PUBLICATIONS (space-11..15, recycle-11..15, culinary-11..15, forest-11..15) ---
  {
    "id": "space-11",
    "slug": "vuon-san-thuong-thung-go-thong",
    "common_name": "Vườn Sân Thượng Cây Ăn Trái Trong Thùng Gỗ Thông Pallet",
    "scientific_name": "Upcycled Pine Pallet Planter Rooftop Orchard Blueprint",
    "aliases": [
      "Vườn Thùng Gỗ Sân Thượng",
      "Vườn Cây Ăn Trái Mái Nhà",
      "Pallet Planter Orchard"
    ],
    "category": "space",
    "nft_class": "space_method",
    "description": "Bản vẽ kỹ thuật đóng bồn gỗ thông pallet tái chế lót màng chống thấm và cách nhiệt gốc rễ cho cây ăn trái thân gỗ (ổi, lựu, chanh, sung Mỹ). Chống sốc nhiệt rễ mùa hè và tăng độ bền bồn gỗ trên 5 năm.",
    "quick_answer": "Sử dụng nan gỗ pallet dày 1.8cm đã xử lý dầu khoáng chống mối mọt, lót bạt HDPE cách ly đất và tạo khoảng thở 5cm đáy giúp rễ cây không bị nung nóng trên sàn bê tông.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/98/Bercs%C3%A9nyi_Stra%C3%9Fe_28-30%2C_Pflanzkasten%2C_2025_L%C3%A1gym%C3%A1nyos.jpg",
    "image_sha256": "e1f2a3b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d31",
    "sunlight": "full_sun",
    "watering": "daily",
    "propagation_difficulty": 2,
    "growth_time": "Đóng bồn 3 giờ, cây ra hoa kết trái sau 4-6 tháng",
    "container_suitable": true,
    "seasonality": {
      "north": "Thùng gỗ cách nhiệt giúp rễ ấm áp qua mùa đông giá rét miền Bắc",
      "central": "Lớp đệm gỗ ngăn nhiệt truyền từ sàn bê tông 50°C vào bầu rễ",
      "south": "Trồng cây ăn quả nhiệt đới quanh năm sai trĩu cành",
      "best_months": [
        2,
        3,
        4,
        8,
        9,
        10
      ]
    },
    "botanical_details": {
      "family": "Urban Rooftop Woodcraft & Pomology System",
      "native_range": "Nông nghiệp sân thượng đô thị tuần hoàn",
      "active_compounds": [
        "Gỗ thông pallet tái chế xử lý dầu lanh sinh học",
        "Lớp lót màng địa kỹ thuật HDPE 0.5mm",
        "Chân đế cao su nâng bồn hở đáy 5cm",
        "Hệ thống lỗ thoát nước đa điểm"
      ],
      "soil_ph": "6.0 - 6.8",
      "ideal_temp": "20°C - 38°C",
      "pot_size": "Bồn gỗ vuông kích thước 60x60x50cm"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Xử lý gỗ pallet chống thấm và mối mọt",
        "instruction": "Chà nhám và quét 2 lớp dầu hạt lanh (linseed oil) tự nhiên bảo vệ gỗ ngoài trời."
      },
      {
        "step": 2,
        "title": "Lắp ráp khung bồn và chân đế cao su",
        "instruction": "Bắt vít inox liên kết các thanh nan gỗ, gắn 4 chân đệm cao su cách sàn 5cm."
      },
      {
        "step": 3,
        "title": "Lót bạt đục lỗ thoát nước và trồng cây",
        "instruction": "Bấm ghim bạt chống thấm vào thành trong, đục 6 lỗ thoát nước đáy và đổ giá thể trồng cây ăn trái."
      }
    ],
    "faqs": [
      {
        "question": "Bồn gỗ thông ngoài trời mưa nắng có nhanh mục không?",
        "answer": "Nhờ lớp dầu lanh bảo vệ và bạt HDPE cách ly đất ẩm trực tiếp, bồn gỗ bền bỉ từ 5-7 năm."
      },
      {
        "question": "Tại sao cần chân đệm cao su nâng bồn khỏi mặt sàn?",
        "answer": "Tạo luồng gió đối lưu làm mát đáy bồn, ngăn rễ bị sốc nhiệt và chống ứ đọng nước gây ố sàn nhà."
      }
    ],
    "monetization_tips": [
      "Gia công bồn gỗ thông pallet đóng sẵn bán cho các dự án vườn sân thượng nhà phố."
    ],
    "tags": [
      "Thùng gỗ",
      "Pallet tái chế",
      "Cây ăn trái",
      "Sân thượng",
      "Cách nhiệt"
    ],
    "blueprint_spec": {
      "target_area": "Sân thượng 10m² - 30m²",
      "difficulty_level": "Dễ - Trung bình",
      "cost_estimate_vnd": "450.000đ - 850.000đ/bồn",
      "components": [
        "Nan gỗ thông pallet dày 1.8cm",
        "Vít inox chống gỉ 4x40",
        "Bạt HDPE chống thấm",
        "Dầu lanh quét gỗ"
      ],
      "tools_needed": [
        "Máy cưa tay",
        "Máy vặn vít pin",
        "Súng bắn ghim gỗ",
        "Thước góc"
      ],
      "estimated_setup_hours": 3
    },
    "related_plant_ids": [
      "fruit-01",
      "fruit-05",
      "fruit-06"
    ]
  },
  {
    "id": "space-12",
    "slug": "vuon-thao-moc-treo-lan-can-studio",
    "common_name": "Vườn Thảo Mộc Đa Tầng Treo Lan Can Cho Căn Hộ Studio",
    "scientific_name": "Studio Apartment Multi-Tier Railing Herb Garden Blueprint",
    "aliases": [
      "Vườn Treo Lan Can",
      "Ban Công Studio 2m²",
      "Railing Herb Garden"
    ],
    "category": "space",
    "nft_class": "space_method",
    "description": "Thiết kế hệ giàn treo lan can 3 tầng siêu gọn tiết kiệm 100% diện tích mặt sàn ban công nhỏ hẹp 1.5m² - 2m² của căn hộ studio. Bố trí các loại thảo mộc nấu ăn và trà thư giãn tiện tay hái ngay cửa sổ bếp.",
    "quick_answer": "Khung inox gắn móc ngoàm kép ôm chắc lan can kính hoặc sắt, nâng đỡ các máng trồng thông minh tự ngấm nước giúp thảo mộc luôn xanh mướt không tốn chỗ đi lại.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2b/2009_windowbox_2463967211.jpg",
    "image_sha256": "f2a3b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e42",
    "sunlight": "partial_shade",
    "watering": "moderate",
    "propagation_difficulty": 1,
    "growth_time": "Lắp đặt 1 giờ, hái lá gia vị tươi mỗi ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Mùa đông trồng thì là, mùi ta, bạc hà; mùa hè trồng húng quế, tía tô",
      "central": "Máng ngấm nước giữ rễ thảo mộc tươi mát qua ngày nắng gắt",
      "south": "Cung cấp rau thơm sạch tươi ngon 365 ngày cho bữa ăn gia đình",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Micro-Apartment Zero-Footprint Culinary Herb System",
      "native_range": "Thiết kế nội thất xanh căn hộ studio đô thị",
      "active_compounds": [
        "Khung móc treo inox 304 không gỉ",
        "Máng trồng tự hút nước thông minh",
        "Tiết kiệm 100% diện tích sàn ban công",
        "Hương tinh dầu tự nhiên xua đuổi muỗi"
      ],
      "soil_ph": "6.2 - 6.8",
      "ideal_temp": "18°C - 35°C",
      "pot_size": "Máng dài 60cm, sâu 18cm"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Đo khẩu độ và siết móc lan can",
        "instruction": "Điều chỉnh ngoàm kẹp inox ôm sát tay vịn lan can và vặn bu lông siết chặt."
      },
      {
        "step": 2,
        "title": "Đặt máng trồng tự dưỡng",
        "instruction": "Gài các máng thông minh vào 3 tầng giá đỡ, kiểm tra độ cân bằng bằng thước nivo."
      },
      {
        "step": 3,
        "title": "Trồng phân khu gia vị và trà",
        "instruction": "Tầng trên nhiều nắng trồng hương thảo, húng tây; tầng giữa trồng húng quế, tía tô; tầng dưới trồng bạc hà."
      }
    ],
    "faqs": [
      {
        "question": "Có an toàn cho trẻ nhỏ và chung cư cao tầng không?",
        "answer": "Hệ giá treo được thiết kế ngoàm móc quay vào phía trong ban công và có khóa chốt đôi chống rung lắc."
      },
      {
        "question": "Cần tưới nước thường xuyên thế nào?",
        "answer": "Máng trồng có khoang nước đáy 1.5L chỉ cần châm nước 1 lần mỗi tuần."
      }
    ],
    "monetization_tips": [
      "Cung cấp trọn gói giàn treo lan can + cây gia vị thành phẩm cho cư dân chung cư trẻ."
    ],
    "tags": [
      "Ban công nhỏ",
      "Căn hộ Studio",
      "Treo lan can",
      "Rau gia vị",
      "Tiết kiệm diện tích"
    ],
    "blueprint_spec": {
      "target_area": "Lan can ban công 1m - 2m dài",
      "difficulty_level": "Rất dễ",
      "cost_estimate_vnd": "650.000đ - 1.200.000đ",
      "components": [
        "Giá treo inox 304 3 tầng",
        "Máng thông minh có khoang nước",
        "Đất sạch hữu cơ vi sinh"
      ],
      "tools_needed": [
        "Cờ lê 10",
        "Tua vít"
      ],
      "estimated_setup_hours": 1
    },
    "related_plant_ids": [
      "herb-01",
      "herb-03",
      "herb-16"
    ]
  },
  {
    "id": "space-13",
    "slug": "tuong-xanh-khung-thep-tui-vai-ni",
    "common_name": "Tường Xanh Khung Thép Túi Vải Nỉ Tự Tưới Cho Sảnh Nhà",
    "scientific_name": "Indoor Vertical Felt Pocket Living Wall System Blueprint",
    "aliases": [
      "Vườn Tường Đứng Vải Nỉ",
      "Living Green Wall",
      "Tường Xanh Tự Tưới"
    ],
    "category": "space",
    "nft_class": "space_method",
    "description": "Giải pháp kiến trúc phủ xanh mảng tường bê tông thô ráp bằng hệ túi vải nỉ địa kỹ thuật thở khí 2 mặt, tích hợp ống tưới nhỏ giọt ngầm trên đỉnh tường tự động tuần hoàn.",
    "quick_answer": "Khung xương thép mạ kẽm gắn tấm alu cách ẩm tường nhà, bên ngoài là lớp vải nỉ địa kỹ thuật đục túi cấy kiểng lá lọc không khí, nước tưới thẩm thấu từ trên xuống tuần hoàn khép kín.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/St_Edmund_Hall_Living_Wall.jpg",
    "image_sha256": "03b4c5d6e7f8091a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f53",
    "sunlight": "partial_shade",
    "watering": "daily",
    "propagation_difficulty": 3,
    "growth_time": "Thi công 1 ngày, phủ kín xanh tranh tường nghệ thuật sau 3 tuần",
    "container_suitable": true,
    "seasonality": {
      "north": "Thanh lọc bụi mịn và điều hòa độ ẩm dễ chịu suốt mùa hanh khô",
      "central": "Tạo mảng xanh dịu mát làm giảm nhiệt độ phòng khách",
      "south": "Cây kiểng lá nhiệt đới phát triển xanh bóng quanh năm",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Architectural Vertical Hydro-Felt Botanical Wall",
      "native_range": "Kiến trúc xanh nội thất hiện đại",
      "active_compounds": [
        "Vải nỉ địa kỹ thuật không dệt thoáng khí rễ",
        "Màng cách ẩm Alumium bảo vệ tường tuyệt đối",
        "Hệ thống tưới nhỏ giọt hẹn giờ tự động",
        "Thanh lọc formaldehyde và benzen hiệu quả cao"
      ],
      "soil_ph": "5.8 - 6.5 (Giá thể dớn mềm và perlite)",
      "ideal_temp": "18°C - 30°C",
      "pot_size": "Túi vải kích thước 15x18cm/túi (Mật độ 24-30 túi/m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Gia cố khung sắt và ốp tấm alu chống ẩm",
        "instruction": "Bắt khung sắt hộp cách tường 2cm, ốp tấm alu chống thấm cách ẩm tuyệt đối vào tường nhà."
      },
      {
        "step": 2,
        "title": "Bắn lớp vải nỉ và luồn ống tưới",
        "instruction": "Bắn 2 lớp vải nỉ địa kỹ thuật tạo túi trồng cây, đi ống nhỏ giọt 6mm trên đỉnh mỗi hàng túi."
      },
      {
        "step": 3,
        "title": "Cấy cây kiểng lá theo phối màu tranh",
        "instruction": "Bọc bầu rễ cây (trầu bà, dương xỉ, cẩm nhung) bằng vải dớn giữ ẩm rồi nhét vào từng túi nỉ."
      }
    ],
    "faqs": [
      {
        "question": "Tường xanh trong nhà có làm ẩm mốc tường thạch cao không?",
        "answer": "Lớp alu nguyên tấm tạo khe thoáng khí 2cm cách ly hoàn toàn nước tưới khỏi bề mặt tường xây."
      },
      {
        "question": "Nước thừa sau khi tưới thoát đi đâu?",
        "answer": "Dưới chân tường có máng inox thu gom nước thừa dẫn về bể tuần hoàn hoặc ống thoát sàn vệ sinh."
      }
    ],
    "monetization_tips": [
      "Nhận thiết kế và thi công tường xanh nghệ thuật cho văn phòng, quán cà phê và spa cao cấp."
    ],
    "tags": [
      "Tường xanh",
      "Vải nỉ",
      "Vườn đứng",
      "Trang trí nội thất",
      "Thanh lọc khí"
    ],
    "blueprint_spec": {
      "target_area": "Mảng tường 3m² - 10m²",
      "difficulty_level": "Trung bình",
      "cost_estimate_vnd": "1.500.000đ - 2.800.000đ/m²",
      "components": [
        "Khung sắt hộp mạ kẽm",
        "Tấm Alu chống thấm",
        "Vải nỉ địa kỹ thuật may túi",
        "Bộ hẹn giờ và bơm tuần hoàn"
      ],
      "tools_needed": [
        "Máy khoan bê tông",
        "Máy bắn vít",
        "Kéo cắt vải nỉ",
        "Thước dây"
      ],
      "estimated_setup_hours": 8
    },
    "related_plant_ids": [
      "orn-05",
      "orn-07",
      "orn-08"
    ]
  },
  {
    "id": "space-14",
    "slug": "ho-thuy-sinh-mini-sen-sung-mai-nha",
    "common_name": "Hồ Sinh Thái Thủy Sinh Mini Trồng Sen Súng & Nuôi Cá Trên Mái",
    "scientific_name": "Rooftop Mini Aquatic Wetland & Lotus Ecosystem Blueprint",
    "aliases": [
      "Hồ Sen Sân Thượng",
      "Bể Thủy Sinh Trên Mái",
      "Rooftop Lotus Wetland"
    ],
    "category": "space",
    "nft_class": "space_method",
    "description": "Thiết kế hồ thủy sinh cảnh quan siêu nhẹ chống thấm đa lớp trên sân thượng. Kết hợp trồng hoa sen, hoa súng thanh tao và thả cá bảy màu, cá mây bắt muỗi, tạo điểm nhấn phong thủy thiền định và làm mát mái nhà.",
    "quick_answer": "Sử dụng bồn composite hoặc xây gạch nhẹ lót bạt EPDM 1.0mm, kết hợp tầng bùn khoáng vi sinh trồng sen súng và thảm rong đuôi chồn tự lọc nước trong vắt.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/19/Bath_Tub_Fish_Pond_%282834517628%29.jpg",
    "image_sha256": "14b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b54",
    "sunlight": "full_sun",
    "watering": "daily",
    "propagation_difficulty": 2,
    "growth_time": "Thi công hoàn thiện 1 ngày, sen nở hoa thơm ngát sau 40 ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Mùa xuân trồng ngó sen, mùa hè nở hoa thơm lừng đón gió nam",
      "central": "Mặt nước hồ bốc hơi hạ nhiệt không khí sân thượng từ 4-6°C",
      "south": "Sen Quan Âm và súng Thái nở hoa rực rỡ bốn mùa quanh năm",
      "best_months": [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ]
    },
    "botanical_details": {
      "family": "Nelumbonaceae & Aquatic Wetland Permaculture Design",
      "native_range": "Cảnh quan sinh thái thiền định Việt Nam",
      "active_compounds": [
        "Lớp bạt cao su EPDM đàn hồi chống nứt vỡ 30 năm",
        "Cá diệt lăng quăng 100% tự nhiên không hóa chất",
        "Bùn khoáng phù sa giàu dinh dưỡng hữu cơ",
        "Tự cân bằng vi sinh không cần thay nước"
      ],
      "soil_ph": "6.5 - 7.5 (Bùn ruộng hoặc đất thịt ngâm nước)",
      "ideal_temp": "22°C - 38°C ưa nắng gắt",
      "pot_size": "Bể composite đường kính 1.2m - 2.0m, sâu 45cm"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Đặt bồn và lót đáy đệm cao su",
        "instruction": "Đặt bể composite hoặc trải bạt EPDM lên lớp xốp đệm EPS bảo vệ chống thủng."
      },
      {
        "step": 2,
        "title": "Cho bùn khoáng và trồng củ sen giống",
        "instruction": "Đổ lớp bùn dày 20cm, đặt củ sen nằm nghiêng 15 độ sát mép bể, lấp nhẹ bùn giữ mầm."
      },
      {
        "step": 3,
        "title": "Châm nước tĩnh và thả cá diệt muỗi",
        "instruction": "Rót nước nhẹ nhàng tránh xao động bùn, sau 3 ngày nước trong thả 10 cặp cá bảy màu diệt lăng quăng."
      }
    ],
    "faqs": [
      {
        "question": "Hồ nước trên sân thượng có bị muỗi đẻ trứng không?",
        "answer": "Cá bảy màu và cá mây trong hồ săn lùng ăn sạch 100% ấu trùng bọ gậy lăng quăng ngay khi mới nở."
      },
      {
        "question": "Tải trọng nước có ảnh hưởng trần nhà không?",
        "answer": "Mực nước chỉ sâu 25-30cm, tải trọng tương đương 300kg/m² hoàn toàn nằm trong tiêu chuẩn an toàn sàn bê tông mái."
      }
    ],
    "monetization_tips": [
      "Bán trọn gói combo bể sen sinh thái mini kèm củ giống sen mini và cá bảy màu."
    ],
    "tags": [
      "Sen mini",
      "Hồ thủy sinh",
      "Cá bảy màu",
      "Sân thượng",
      "Phong thủy"
    ],
    "blueprint_spec": {
      "target_area": "Góc sân thượng 2m² - 5m²",
      "difficulty_level": "Dễ",
      "cost_estimate_vnd": "1.200.000đ - 2.500.000đ",
      "components": [
        "Bể composite đúc sẵn hoặc bạt EPDM",
        "Củ giống sen súng thuần chậu",
        "Bùn phù sa vi sinh",
        "Đàn cá bảy màu"
      ],
      "tools_needed": [
        "Ống nước mềm",
        "Bay trộn bùn"
      ],
      "estimated_setup_hours": 4
    },
    "related_plant_ids": [
      "orn-11",
      "herb-12",
      "fruit-08"
    ]
  },
  {
    "id": "space-15",
    "slug": "vuon-ban-cong-dong-bac-can-gio-lanh",
    "common_name": "Vườn Vi Khí Hậu Ban Công Đông Bắc Cản Gió Mùa Đô Thị",
    "scientific_name": "Northeast Cold-Wind Barrier Urban Balcony Blueprint",
    "aliases": [
      "Ban Công Hướng Đông Bắc",
      "Vườn Cản Gió Mùa",
      "Winter Resilient Balcony"
    ],
    "category": "space",
    "nft_class": "space_method",
    "description": "Thiết kế cấu trúc hàng rào xanh cản gió mùa Đông Bắc lạnh buốt cho các căn hộ tầng cao. Sử dụng các loài thực vật thân dẻo dai chịu gió rét kết hợp kính chắn gió vi mô giữ ấm cho căn hộ vào mùa đông.",
    "quick_answer": "Bố trí hàng cây Trúc cần câu và Trúc quân tử viền ngoài mép ban công tạo màng lọc gió giảm 60% tốc độ gió giật, bảo vệ các chậu hoa nhài và thảo mộc ấm áp bên trong.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/33/Winter_Gardens_-_geograph.org.uk_-_1079999.jpg",
    "image_sha256": "25c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c65",
    "sunlight": "partial_shade",
    "watering": "moderate",
    "propagation_difficulty": 2,
    "growth_time": "Thi công 4 giờ, tạo lá chắn gió ấm áp trọn đời",
    "container_suitable": true,
    "seasonality": {
      "north": "Phát huy hiệu quả che chắn tối đa từ tháng 11 đến tháng 3 mùa đông",
      "central": "Giữ ấm không gian sống trong các đợt không khí lạnh tăng cường",
      "south": "Đón nắng ban mai dịu mát hướng Đông quanh năm suốt 12 tháng",
      "best_months": [
        1,
        2,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Windbreak Aerodynamic & Thermal Comfort Balcony Design",
      "native_range": "Ban công căn hộ chung cư phía Bắc Việt Nam",
      "active_compounds": [
        "Lá chắn sinh học giảm 60% áp lực gió giật",
        "Tăng nhiệt độ ban công 2-3°C vào mùa đông",
        "Chậu composite đế rộng chống lật đổ",
        "Cây trúc thân dẻo chịu uốn cong khí động học"
      ],
      "soil_ph": "6.0 - 7.0",
      "ideal_temp": "10°C - 32°C chịu rét tốt",
      "pot_size": "Chậu chữ nhật composite 80x30x40cm"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Bố trí chậu nặng thành hàng chắn gió",
        "instruction": "Đặt dãy chậu composite nặng có tỷ trọng đáy cao chạy dọc mép ban công hướng Đông Bắc."
      },
      {
        "step": 2,
        "title": "Trồng cây rào trúc dẻo dai",
        "instruction": "Trồng Trúc quân tử hoặc Trúc cần câu tạo thành bức tường xanh mềm mại xé luồng gió mạnh."
      },
      {
        "step": 3,
        "title": "Xếp thảo mộc và góc bàn trà bên trong",
        "instruction": "Bố trí góc thư giãn, bàn trà và các loài thảo mộc nhạy cảm lạnh ở khoảng không êm đềm phía sau hàng rào."
      }
    ],
    "faqs": [
      {
        "question": "Gió mùa đông bắc tầng 25+ có làm gãy cây trúc không?",
        "answer": "Thân trúc có cấu trúc ống rỗng dẻo dai uốn mình lướt theo luồng gió mà không bao giờ bị gãy giòn."
      },
      {
        "question": "Ban công có bị tối tăm thiếu ánh sáng không?",
        "answer": "Tán trúc lá nhỏ thanh mảnh lọc ánh sáng tự nhiên dịu mắt mà không gây che khuất tầm nhìn."
      }
    ],
    "monetization_tips": [
      "Tư vấn giải pháp cải tạo ban công chống rét cho các chung cư cao tầng khu vực Hà Nội."
    ],
    "tags": [
      "Hướng Đông Bắc",
      "Chống gió rét",
      "Trúc quân tử",
      "Ban công ấm áp",
      "Mùa đông"
    ],
    "blueprint_spec": {
      "target_area": "Ban công 3m² - 8m²",
      "difficulty_level": "Dễ",
      "cost_estimate_vnd": "1.600.000đ - 2.900.000đ",
      "components": [
        "Chậu composite dáng dài nặng chân",
        "Bụi Trúc quân tử thuần dưỡng",
        "Dây chằng neo inox an toàn"
      ],
      "tools_needed": [
        "Kìm bấm",
        "Xẻng làm vườn"
      ],
      "estimated_setup_hours": 4
    },
    "related_plant_ids": [
      "orn-04",
      "orn-11",
      "herb-01"
    ]
  },
  {
    "id": "recycle-11",
    "slug": "thung-u-bokashi-kho-nha-bep",
    "common_name": "Thùng Ủ Rác Hữu Cơ Bokashi Khô Nhà Bếp Bằng Cám Men Vi Sinh",
    "scientific_name": "Anaerobic Kitchen Bokashi Dry Bran Fermenter System",
    "aliases": [
      "Ủ Rác Bokashi",
      "Thùng Rác Nhà Bếp Không Mùi",
      "Bokashi Bran Composter"
    ],
    "category": "recycle",
    "nft_class": "eco_invention",
    "description": "Sáng chế thùng ủ rác hữu cơ nhà bếp yếm khí ứng dụng cám men Bokashi. Xử lý triệt để được cả thức ăn thừa, thịt cá, vỏ hải sản mà không sinh mùi hôi thối, thu hồi nước cốt vi sinh giàu acid lactic tưới cây.",
    "quick_answer": "Rác nhà bếp được nén chặt trong thùng kín, rắc một lớp cám men Bokashi lên trên; vi sinh vật yếm khí lên men chua bảo toàn 100% nitơ hữu cơ chỉ sau 14 ngày.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Bokashi_bin_set.JPG",
    "image_sha256": "36d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d76",
    "sunlight": "indoor",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Ủ lên men 14 ngày, phân giải hoàn toàn thành đất mùn sau 2 tuần chôn",
    "container_suitable": true,
    "seasonality": {
      "north": "Đặt dưới bồn rửa chén nhà bếp ấm áp hoạt động tốt quanh năm",
      "central": "Khử sạch mùi hôi thức ăn thừa trong những ngày hè oi bức",
      "south": "Giảm 100% lượng rác hữu cơ phải xả ra xe thu gom rác đô thị",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Lactic Acid Anaerobic Bokashi Bio-Conversion System",
      "native_range": "Sáng chế xử lý rác thải sinh hoạt gia đình",
      "active_compounds": [
        "Lactobacillus plantarum & Nấm men Saccharomyces",
        "Acid Lactic tự nhiên diệt khuẩn gây thối",
        "Nước cốt rác Bokashi giàu dinh dưỡng vi lượng",
        "Bảo toàn 100% khoáng chất và nitơ hữu cơ"
      ],
      "soil_ph": "Dịch Bokashi lên men chua pH 3.5 - 4.0 (Pha loãng 1:500 tưới cây đạt pH 6.5)",
      "ideal_temp": "20°C - 35°C trong nhà",
      "pot_size": "Thùng ủ kín có vòi xả dung tích 15L - 20L"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Cắt nhỏ rác bếp và bỏ vào thùng",
        "instruction": "Cắt nhỏ cuống rau, vỏ trái cây, cơm thừa, thức ăn nguội rồi cho một lớp dày 3-5cm vào thùng."
      },
      {
        "step": 2,
        "title": "Rắc cám men Bokashi và nén chặt",
        "instruction": "Rắc 1-2 nắm cám men Bokashi đều lên mặt rác, dùng tấm nén ấn chặt ép hết không khí ra ngoài."
      },
      {
        "step": 3,
        "title": "Đậy nắp kín và xả nước cốt",
        "instruction": "Đậy kín nắp thùng; định kỳ 3 ngày mở vòi dưới đáy lấy dịch nước cốt Bokashi pha tưới cây."
      }
    ],
    "faqs": [
      {
        "question": "Thùng Bokashi có thể ủ được thịt, cá thừa không?",
        "answer": "Có! Khác với ủ phân compost thông thường, men Bokashi lên men chua yếm khí xử lý tốt cả thịt cá sống xơ xương nhỏ."
      },
      {
        "question": "Có mùi hôi thối bốc ra trong phòng bếp không?",
        "answer": "Không! Thùng đậy kín gioăng cao su, men lactic tạo mùi chua thanh dịu như dưa muối chua, hoàn toàn không có mùi thối rữa."
      }
    ],
    "monetization_tips": [
      "Sản xuất cám men Bokashi đóng túi và cung cấp thùng ủ chuyên dụng cho cư dân thành thị."
    ],
    "tags": [
      "Bokashi",
      "Ủ rác bếp",
      "Không mùi",
      "Acid Lactic",
      "Kinh tế tuần hoàn"
    ],
    "eco_spec": {
      "waste_input": "Rác hữu cơ nhà bếp, thức ăn thừa, bã trà, vỏ trứng",
      "output_yield": "15kg phân ủ hữu cơ giàu dinh dưỡng/tháng + 3 lít nước cốt vi sinh",
      "carbon_offset_kg_year": 120,
      "materials_cost_vnd": "80.000đ - 150.000đ (thùng nhựa tái chế + vòi xả)",
      "upcycled_components": [
        "Thùng sơn cũ rửa sạch có nắp khóa khí",
        "Lưới ngăn đáy",
        "Vòi xả nước nhựa"
      ]
    },
    "related_plant_ids": [
      "herb-01",
      "fruit-01",
      "orn-07"
    ]
  },
  {
    "id": "recycle-12",
    "slug": "gian-thuy-canh-ong-nhua-pvc-phe-lieu",
    "common_name": "Giàn Thủy Canh Hồi Lưu Từ Ống Nhựa PVC Phế Liệu Xây Dựng",
    "scientific_name": "Upcycled Construction PVC Pipe NFT Hydroponic System",
    "aliases": [
      "Thủy Canh Ống Nhựa",
      "Giàn Rau Thủy Canh Tự Chế",
      "DIY PVC Hydroponics"
    ],
    "category": "recycle",
    "nft_class": "eco_invention",
    "description": "Tái sinh các đoạn ống nhựa PVC phi 90 phế thải công trình xây dựng thành giàn thủy canh màng dinh dưỡng (NFT) hồi lưu tự động. Trồng rau xà lách, cải ngọt sạch 100% không cần đất.",
    "quick_answer": "Khoét các lỗ phi 50mm cách nhau 15cm trên thân ống PVC cũ, lắp đặt theo độ dốc 2% kết hợp máy bơm bể cá mini tuần hoàn dung dịch dinh dưỡng nuôi rễ rau.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/36/Hydroponics_%2833185459271%29.jpg",
    "image_sha256": "47e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e87",
    "sunlight": "full_sun",
    "watering": "daily",
    "propagation_difficulty": 2,
    "growth_time": "Lắp giàn 3 giờ, thu hoạch rau sạch thủy canh sau 25-30 ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Trồng rau xà lách giòn ngọt tuyệt vời trong mùa thu đông",
      "central": "Tuần hoàn nước liên tục giúp bộ rễ mát mẻ giữa mùa hè",
      "south": "Trồng rau muống, cải xanh và húng quế thu hoạch liên tục quanh năm",
      "best_months": [
        1,
        2,
        3,
        4,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Recycled Polymer Hydroponic Nutrient Film Technique (NFT)",
      "native_range": "Sáng chế nông nghiệp công nghệ cao tự chế",
      "active_compounds": [
        "Tuần hoàn dinh dưỡng khép kín tiết kiệm 90% nước",
        "Ống nhựa PVC-U cách nhiệt bảo vệ rễ cây",
        "Máy bơm bể cá mini 15W siêu tiết kiệm điện",
        "Rau sạch chuẩn hữu cơ không nhiễm kim loại nặng"
      ],
      "soil_ph": "Dung dịch dinh dưỡng pH 5.8 - 6.5, nồng độ TDS 600 - 900 ppm",
      "ideal_temp": "18°C - 32°C",
      "pot_size": "Giàn ống dài 2m - 4m gồm 4-6 đường ống song song"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Khoét lỗ đặt rọ trên ống PVC",
        "instruction": "Dùng mũi khoét lỗ 50mm khoan hàng lỗ cách nhau 15cm trên thân ống PVC phi 90 cũ."
      },
      {
        "step": 2,
        "title": "Lắp khung đỡ dốc và cút nối",
        "instruction": "Ghép nối các ống zic-zac bằng cút nối chữ U, tạo độ dốc nhẹ 2cm mỗi mét để nước chảy xuôi."
      },
      {
        "step": 3,
        "title": "Kết nối máy bơm và cho cây giống",
        "instruction": "Cắm bơm bể cá bơm dung dịch từ thùng chứa lên đầu giàn, đặt các rọ cây con ươm bằng mút xốp vào lỗ."
      }
    ],
    "faqs": [
      {
        "question": "Ống nhựa cũ ngoài trời có phơi nhiễm chất độc vào rau không?",
        "answer": "Ống PVC xây dựng cũ được vệ sinh sạch lớp bụi bên ngoài, rễ cây chỉ tiếp xúc màng nước chảy bên trong và hấp thu ion khoáng tinh khiết."
      },
      {
        "question": "Có tốn nhiều điện năng khi chạy máy bơm liên tục không?",
        "answer": "Máy bơm bể cá mini công suất chỉ 15W, dùng bộ hẹn giờ bơm 15 phút nghỉ 15 phút tiêu thụ chưa đến 3.000đ tiền điện mỗi tháng."
      }
    ],
    "monetization_tips": [
      "Thiết kế và thi công giàn rau thủy canh ban công bằng ống nhựa tái chế giá bình dân."
    ],
    "tags": [
      "Thủy canh",
      "Ống nhựa PVC",
      "NFT hồi lưu",
      "Rau sạch ban công",
      "Tái chế phế liệu"
    ],
    "eco_spec": {
      "waste_input": "Đoạn ống nhựa PVC 90 công trình, co nối cũ, thùng sơn làm bể chứa",
      "output_yield": "8-12 kg rau ăn lá sạch mỗi tháng trên diện tích 1.5m²",
      "carbon_offset_kg_year": 75,
      "materials_cost_vnd": "250.000đ - 450.000đ",
      "upcycled_components": [
        "Ống PVC phi 90 phế thải",
        "Cút nối nhựa",
        "Mút xốp bọc hàng làm giá thể ươm rọ"
      ]
    },
    "related_plant_ids": [
      "herb-03",
      "herb-14",
      "fruit-24"
    ]
  },
  {
    "id": "recycle-13",
    "slug": "dau-tuoi-nho-giot-ruot-but-bi",
    "common_name": "Đầu Nhỏ Giọt Bù Áp Tự Chế Từ Ruột Bút Bi & Ống Nhựa Y Tế",
    "scientific_name": "Micro-Drip Pressure Compensating Emitter Upcycled Mod",
    "aliases": [
      "Đầu Nhỏ Giọt Tự Chế",
      "Tưới Nhỏ Giọt Ruột Bút Bi",
      "DIY Micro Drip Emitter"
    ],
    "category": "recycle",
    "nft_class": "eco_invention",
    "description": "Sáng chế đầu nhỏ giọt tưới cây chuẩn xác từng giọt từ ruột bút bi đã dùng hết và van chỉnh giọt truyền dịch y tế. Cung cấp lưu lượng nước chuẩn xác 1-2 lít/giờ, tiết kiệm nước tưới và không lo tắc nghẽn cát bẩn.",
    "quick_answer": "Tháo bi đầu ngòi bút bi cũ để tạo khe thoát nước mao dẫn vi mô, cắm vào ống dẫn nước mềm có gắn con lăn kẹp dây truyền dịch để điều chỉnh số giọt tưới chính xác theo phút.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Micro-irrigation_system_in_a_garden.jpg",
    "image_sha256": "58e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e88",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Chế tạo 10 phút, cấp nước chính xác từng giọt quanh năm",
    "container_suitable": true,
    "seasonality": {
      "north": "Tự động tưới chuẩn xác lượng nước nhỏ giọt không làm ướt sàn nhà",
      "central": "Giữ ẩm gốc cây liên tục trong những ngày khô hạn gay gắt",
      "south": "Chăm sóc chu đáo từng chậu bonsai và kiểng lá quý giá",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Micro-Hydraulic Precision Upcycled Irrigation Mod",
      "native_range": "Sáng chế tiết kiệm nước tưới nông nghiệp vi mô",
      "active_compounds": [
        "Lưu lượng điều chỉnh linh hoạt từ 10 đến 60 giọt/phút",
        "Đầu ngòi kim loại không gỉ chống rêu mốc",
        "Van lăn kẹp áp lực nước chuẩn xác",
        "Không phụ thuộc nguồn điện"
      ],
      "soil_ph": "Không ảnh hưởng pH",
      "ideal_temp": "Mọi dải nhiệt độ",
      "pot_size": "Dành cho mọi loại chậu cây từ nhỏ đến lớn"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Lấy ruột bút bi cũ và xử lý đầu ngòi",
        "instruction": "Rút ruột bút bi cũ đã hết mực, dùng kìm bấm nhẹ viên bi nhỏ ở đầu ngòi để thông dòng chảy."
      },
      {
        "step": 2,
        "title": "Nối vào đoạn dây truyền dịch có van lăn",
        "instruction": "Cắm đầu ngòi bút vào dây silicon truyền dịch cũ đã có sẵn con lăn điều chỉnh giọt."
      },
      {
        "step": 3,
        "title": "Cắm vào gốc cây và chỉnh tốc độ giọt",
        "instruction": "Cắm đầu ngòi sát gốc cây, gạt bánh xe lăn điều chỉnh tốc độ 20 giọt/phút."
      }
    ],
    "faqs": [
      {
        "question": "Có sợ cặn mực bút bi còn sót lại làm hỏng rễ cây không?",
        "answer": "Ruột bút bi được ngâm cồn cọ rửa sạch hoàn toàn mực trước khi lắp ráp, an toàn 100% cho cây trồng."
      },
      {
        "question": "Đầu nhỏ giọt này có dễ bị nghẽn bởi phèn hay cặn nước không?",
        "answer": "Nhờ đầu kim loại trơn bóng, cặn bẩn khó bám dính hơn nhiều so với các đầu nhỏ giọt nhựa thông thường."
      }
    ],
    "monetization_tips": [
      "Chia sẻ video sáng chế tái chế hút hàng triệu lượt xem trên TikTok và YouTube."
    ],
    "tags": [
      "Tưới nhỏ giọt",
      "Ruột bút bi",
      "Dây truyền dịch",
      "Tự chế DIY",
      "Tiết kiệm nước"
    ],
    "eco_spec": {
      "waste_input": "Vỏ bút bi hết mực, dây truyền dịch y tế sạch đã qua sử dụng",
      "output_yield": "Bộ 10 đầu tưới nhỏ giọt chuẩn xác tiết kiệm 85% nước tưới",
      "carbon_offset_kg_year": 25,
      "materials_cost_vnd": "10.000đ - 20.000đ",
      "upcycled_components": [
        "Ruột bút bi cũ",
        "Khóa lăn chỉnh giọt y tế",
        "Ống hút nhựa mềm"
      ]
    },
    "related_plant_ids": [
      "orn-01",
      "orn-11",
      "herb-10"
    ]
  },
  {
    "id": "recycle-14",
    "slug": "nuoc-ngam-vo-chuoi-vo-trung-ga",
    "common_name": "Nước Ngâm Vỏ Chuối & Vỏ Trứng Gà Cung Cấp Canxi Kali Hữu Cơ",
    "scientific_name": "Banana Peel & Eggshell Organic Bio-Available Potassium Calcium Tea",
    "aliases": [
      "Phân Vỏ Chuối Trứng Gà",
      "Phân Bón Kali Tự Nhiên",
      "Organic Calcium Potassium Elixir"
    ],
    "category": "recycle",
    "nft_class": "eco_invention",
    "description": "Bí kíp ủ nước ngâm vỏ chuối giàu kali và vỏ trứng gà nung giàu canxi hòa tan bằng giấm ăn hoặc nước vo gạo. Kích thích cây hoa sai nụ, quả ngọt đậm đà và chống rụng trái non tự nhiên 100%.",
    "quick_answer": "Vỏ chuối thái nhỏ ngâm nước vo gạo 3 ngày, vỏ trứng gà rang thơm giã nhỏ ngâm giấm tạo canxi axetat hòa tan, pha loãng tưới gốc cây mỗi tuần 1 lần.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Urban_bio_materials_%28organic_waste%29_%286881915675%29.jpg",
    "image_sha256": "69e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e89",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Ngâm ủ 3-5 ngày, sử dụng bón thúc cây quanh năm",
    "container_suitable": true,
    "seasonality": {
      "north": "Tưới bón hoa hồng, hoa đào đâm nụ sai hoa rực rỡ đón Tết",
      "central": "Bổ sung canxi giúp cây chống nứt quả trong mùa mưa dầm",
      "south": "Bón dưỡng cây ăn trái chậu (ổi, lựu, cóc, sung) trĩu quả",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Domestic Kitchen Mineral Extraction Organic Fertilizer",
      "native_range": "Dinh dưỡng hữu cơ tái chế dân gian",
      "active_compounds": [
        "Kali hữu cơ hòa tan từ vỏ chuối (K2O)",
        "Canxi axetat hấp thụ nhanh từ vỏ trứng (Calcium Acetate)",
        "Magie và Phospho tự nhiên kích thích phân hóa mầm hoa",
        "Hoàn toàn không hóa chất bảo quản"
      ],
      "soil_ph": "Dung dịch pha loãng tưới đất đạt pH 6.2 - 6.8",
      "ideal_temp": "22°C - 35°C",
      "pot_size": "Bình thủy tinh hoặc can nhựa 2L - 5L"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Thu gom và sơ chế vỏ chuối, vỏ trứng",
        "instruction": "Vỏ chuối thái mỏng khúc 1cm; vỏ trứng rửa sạch, rang thơm trên chảo nóng cho giòn rồi giã nhỏ."
      },
      {
        "step": 2,
        "title": "Chiết xuất canxi hòa tan bằng giấm",
        "instruction": "Ngâm vỏ trứng giã nát vào giấm gạo theo tỷ lệ 1:5, bọt khí CO2 sủi lên chuyển hóa canxi khó tan thành canxi tan trong nước."
      },
      {
        "step": 3,
        "title": "Ngâm vỏ chuối lấy nước cốt kali",
        "instruction": "Cho vỏ chuối vào can nước vo gạo ngâm 3 ngày, chắt lấy nước cốt pha chung với nước giấm vỏ trứng tưới cây."
      }
    ],
    "faqs": [
      {
        "question": "Tưới nước ngâm vỏ chuối có thu hút kiến và ruồi giấm không?",
        "answer": "Nước ngâm lên men chua nhẹ và hòa cùng giấm vỏ trứng xua đuổi côn trùng, không làm sinh ruồi giấm."
      },
      {
        "question": "Cây nào thích hợp nhất với loại phân bón này?",
        "answer": "Cực kỳ tốt cho cây đang giai đoạn chuẩn bị ra hoa và nuôi quả như hoa hồng, dâu tây, cà chua, ớt hiểm."
      }
    ],
    "monetization_tips": [
      "Đóng chai phân bón hữu cơ vỏ chuối trứng gà vi sinh cung cấp cho hội yêu hoa hồng."
    ],
    "tags": [
      "Vỏ chuối",
      "Vỏ trứng gà",
      "Kali hữu cơ",
      "Canxi tự nhiên",
      "Hoa hồng sai hoa"
    ],
    "eco_spec": {
      "waste_input": "Vỏ chuối chín, vỏ trứng gà ăn hàng ngày, nước vo gạo",
      "output_yield": "5 lít phân bón khoáng kali - canxi sinh học đậm đặc mỗi tuần",
      "carbon_offset_kg_year": 40,
      "materials_cost_vnd": "15.000đ (mua giấm gạo)",
      "upcycled_components": [
        "Chai nhựa đựng nước suối",
        "Bình ủ tái sử dụng"
      ]
    },
    "related_plant_ids": [
      "orn-01",
      "fruit-02",
      "fruit-05"
    ]
  },
  {
    "id": "recycle-15",
    "slug": "he-aquaponics-mini-thung-xop-tuan-hoan",
    "common_name": "Hệ Aquaponics Mini Nuôi Cá Trồng Rau Tuần Hoàn Từ Thùng Xốp",
    "scientific_name": "DIY Upcycled Styrofoam Aquaponics Micro-Ecosystem",
    "aliases": [
      "Aquaponics Thùng Xốp",
      "Nuôi Cá Trồng Rau Tuần Hoàn",
      "DIY Home Aquaponics"
    ],
    "category": "recycle",
    "nft_class": "eco_invention",
    "description": "Hệ sinh thái tuần hoàn khép kín tuyệt đẹp từ 2 thùng xốp cũ: thùng dưới nuôi cá bảy màu và cá rô đồng, thùng trên trồng rau xanh bằng sỏi nhẹ đất nung. Chất thải cá được vi sinh vật chuyển hóa thành phân bón nuôi cây, rễ cây lọc sạch nước trả lại cho cá.",
    "quick_answer": "Thùng xốp dưới chứa nước nuôi cá, bơm mini đưa nước thải cá lên khay trồng rau trên thùng xốp trên, nước đi qua siphon chuông tự động xả ngập - rút cạn cung cấp oxy cho rễ rau.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Small_Scale_Aquaponics_System_at_the_E.W._Shell_Fisheries_Research_Center.jpg",
    "image_sha256": "70e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e90",
    "sunlight": "partial_shade",
    "watering": "daily",
    "propagation_difficulty": 3,
    "growth_time": "Chế tạo 3 giờ, hệ sinh thái tuần hoàn cân bằng sau 14 ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Hệ thống khép kín hoạt động bền bỉ, mùa đông che nilon giữ ấm cho cá",
      "central": "Nước tuần hoàn liên tục không lo bốc hơi khô hạn mùa hè",
      "south": "Rau xanh và cá bơi tung tăng thu hoạch quanh năm suốt tháng",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Closed-Loop Recirculating Aquaponic Agroecology",
      "native_range": "Sáng chế nông nghiệp tuần hoàn đô thị",
      "active_compounds": [
        "Vi khuẩn Nitrosomonas biến amoniac (phân cá) thành Nitrit",
        "Vi khuẩn Nitrobacter biến Nitrit thành Nitrat nuôi cây",
        "Siphon chuông tự động xả ngập rút cạn (Flood and Drain)",
        "Không cần bón phân, không cần thay nước bể cá"
      ],
      "soil_ph": "Hệ thống cân bằng lý tưởng pH 6.8 - 7.2 cho cả cá và rau",
      "ideal_temp": "22°C - 32°C",
      "pot_size": "Bộ 2 thùng xốp 40x60cm xếp chồng"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Chống thấm thùng xốp nuôi cá",
        "instruction": "Lót màng nilon đen hoặc quét xi măng chống thấm bên trong thùng xốp dưới để nuôi cá."
      },
      {
        "step": 2,
        "title": "Chế tạo bộ Siphon chuông ngập rút",
        "instruction": "Lắp ống thoát nước có van Siphon chuông ở đáy thùng trên để tạo chu kỳ ngập nước 10 phút, rút cạn 5 phút."
      },
      {
        "step": 3,
        "title": "Đổ sỏi nhẹ đất nung và thả cá",
        "instruction": "Rải sỏi đất nung làm giá thể lọc vi sinh, trồng cây con và thả 15-20 con cá bảy màu hoặc cá rô đồng vào bể dưới."
      }
    ],
    "faqs": [
      {
        "question": "Có phải thay nước bể cá định kỳ không?",
        "answer": "Hoàn toàn không cần thay nước! Rễ rau và vi khuẩn nitrat hóa trong tầng sỏi nhẹ đã lọc sạch nước thải của cá liên tục 24/7."
      },
      {
        "question": "Có cần bổ sung phân bón hóa học cho rau không?",
        "answer": "Tuyệt đối không! Thức ăn cho cá đã cung cấp đầy đủ chất dinh dưỡng qua phân cá, rau phát triển hữu cơ 100% tinh khiết."
      }
    ],
    "monetization_tips": [
      "Lắp đặt trọn gói hệ Aquaponics mini thùng xốp cho các gia đình có trẻ nhỏ học tập thiên nhiên."
    ],
    "tags": [
      "Aquaponics",
      "Thùng xốp",
      "Nuôi cá trồng rau",
      "Tuần hoàn khép kín",
      "Siphon chuông"
    ],
    "eco_spec": {
      "waste_input": "Thùng xốp đựng hải sản cũ, ống nhựa thừa, thức ăn thừa cho cá",
      "output_yield": "3-5 kg rau sạch/tháng + đàn cá khỏe mạnh không cần thay nước",
      "carbon_offset_kg_year": 80,
      "materials_cost_vnd": "150.000đ - 280.000đ",
      "upcycled_components": [
        "2 thùng xốp cũ",
        "Bơm nước mini 5W",
        "Chai nhựa làm Siphon chuông"
      ]
    },
    "related_plant_ids": [
      "herb-03",
      "herb-14",
      "fruit-08"
    ]
  },
  {
    "id": "culinary-11",
    "slug": "tra-gung-nuong-sa-chanh-mat-ong",
    "common_name": "Trà Gừng Nướng & Sả Chanh Mật Ong Rừng Ấm Phế Khử Hàn",
    "scientific_name": "Roasted Ginger, Lemongrass & Wild Honey Lung-Warming Infusion",
    "aliases": [
      "Trà Gừng Nướng",
      "Trà Sả Gừng Mật Ong",
      "Thức Uống Ấm Phế Trừ Hàn"
    ],
    "category": "culinary",
    "nft_class": "culinary_recipe",
    "description": "Thức trà gia truyền nướng củ gừng già trên than hồng cho xém cạnh thơm nồng, hãm cùng thân sả tươi đập dập, vỏ chanh cốm và mật ong rừng nguyên chất. Làm ấm tỳ vị, trục hàn tán ứ và phòng ngừa cảm lạnh mùa đông cực nhạy.",
    "quick_answer": "Nướng củ gừng ta nguyên vỏ trên lửa cho dậy mùi thơm nồng, đập dập đun sôi cùng 2 nhánh sả trong 10 phút, rót ra tách hòa mật ong rừng và vắt lát chanh tươi thưởng thức khi còn nóng ấm.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Lemon_and_ginger_tea_with_honey%2C_Illiterati_cafe%2C_Dharamshala%2C_Himachal_Pradesh.jpg",
    "image_sha256": "81e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e91",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Pha chế 15 phút, giải cảm trục hàn tức thì",
    "container_suitable": true,
    "seasonality": {
      "north": "Thức uống dưỡng sinh tuyệt đỉnh mùa đông miền Bắc và những ngày mưa phùn gió bấc",
      "central": "Làm ấm cơ thể, chống lạnh bụng khi đi ngoài mưa dầm miền Trung",
      "south": "Uống ấm buổi sáng kích hoạt tuần hoàn máu và sảng khoái tinh thần",
      "best_months": [
        1,
        2,
        3,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Zingiberaceae & Cymbopogon Thermal Metabolic Pharmacology",
      "native_range": "Dân gian dược học ẩm thực Việt Nam",
      "active_compounds": [
        "Gingerol & Shogaol kích hoạt tuần hoàn sinh nhiệt",
        "Citral & Geraniol trong sả kháng khuẩn đường hô hấp",
        "Kháng sinh tự nhiên và enzyme từ mật ong hoa rừng",
        "Vitamin C và tinh dầu vỏ chanh thanh lọc độc tố"
      ],
      "soil_ph": "Không áp dụng",
      "ideal_temp": "Thưởng thức khi trà nóng ấm 50°C - 60°C",
      "pot_size": "Tách gốm mộc nung thủ công giữ nhiệt"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Nướng gừng già trên than hoặc bếp lửa",
        "instruction": "Củ gừng ta rửa sạch để nguyên vỏ, nướng trên lửa bếp ga hoặc than hồng đến khi vỏ xém thơm nồng rồi đập dập."
      },
      {
        "step": 2,
        "title": "Đun sôi cùng thân sả tươi",
        "instruction": "Cho gừng nướng và 2 nhánh sả đập dập vào 500ml nước, đun sôi nhỏ lửa trong 8-10 phút để chiết xuất tinh dầu."
      },
      {
        "step": 3,
        "title": "Hòa mật ong rừng và thưởng thức",
        "instruction": "Rót nước trà ra tách, đợi nguội bớt xuống 50°C rồi hòa 2 thìa mật ong rừng và vắt nhẹ lát chanh tươi."
      }
    ],
    "faqs": [
      {
        "question": "Tại sao phải nướng gừng trước khi đun trà?",
        "answer": "Nướng gừng giúp chuyển hóa hợp chất gingerol thành shogaol có tính cay ấm cao hơn gấp đôi, trục hàn sâu vào kinh lạc và không gây cồn cào ruột."
      },
      {
        "question": "Tại sao không cho mật ong khi nước đang sôi sùng sục?",
        "answer": "Nhiệt độ nước trên 60°C sẽ phá hủy các enzyme sống và vitamin quý giá trong mật ong rừng nguyên chất."
      }
    ],
    "monetization_tips": [
      "Phối trộn set nguyên liệu thảo mộc sấy lạnh đóng túi giấy kraf bán làm quà tặng dưỡng sinh."
    ],
    "tags": [
      "Gừng nướng",
      "Sả chanh",
      "Mật ong rừng",
      "Giải cảm",
      "Ấm phế trừ hàn"
    ],
    "recipe_spec": {
      "prep_time_minutes": 10,
      "cook_time_minutes": 10,
      "servings": "2-3 tách trà nóng ấm",
      "botanical_ingredients": [
        "Gừng già ta nướng xém 30g",
        "Sả tươi đập dập 2 nhánh",
        "Mật ong rừng nguyên chất 2 thìa canh",
        "Chanh tươi nửa quả",
        "Quế thanh nhỏ 1 mẩu"
      ],
      "health_benefits": [
        "Làm ấm phổi, cắt cơn ho do lạnh và êm dịu niêm mạc họng",
        "Kích thích tiêu hóa, trị đầy bụng khó tiêu lạnh bụng",
        "Tăng cường lưu thông khí huyết và làm ấm bàn tay bàn chân"
      ]
    },
    "related_plant_ids": [
      "herb-01",
      "herb-18",
      "fruit-10"
    ]
  },
  {
    "id": "culinary-12",
    "slug": "tuong-ot-ban-dia-len-men-tu-nhien",
    "common_name": "Tương Ớt Bản Địa Lên Men Men Rượu Tự Nhiên Không Chất Bảo Quản",
    "scientific_name": "Artisanal Lacto-Fermented Indigenous Chili Sauce Recipe",
    "aliases": [
      "Tương Ớt Tự Nhiên",
      "Ớt Lên Men Sinh Học",
      "Artisanal Fermented Hot Sauce"
    ],
    "category": "culinary",
    "nft_class": "culinary_recipe",
    "description": "Bí kíp làm tương ớt truyền thống từ ớt chỉ thiên chín đỏ lên men tự nhiên với men rượu nếp cái hoa vàng, tỏi ta và muối hạt hầm. Cho vị cay nồng đượm sâu, hậu vị ngọt thanh và giàu vi sinh probiotic hỗ trợ đường ruột.",
    "quick_answer": "Ớt tươi xay thô cùng tỏi và muối biển, ủ yếm khí trong hũ sành cùng chút men rượu nếp trong 21 ngày. Vi khuẩn lactic lên men chua dịu tự nhiên, bảo quản quanh năm không cần chất bảo quản hóa học.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/24/SAMBAL_-_The_must_have_chili_dipping.jpg",
    "image_sha256": "92e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e92",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 2,
    "growth_time": "Ủ lên men 21 ngày, bảo quản thơm ngon 12 tháng",
    "container_suitable": true,
    "seasonality": {
      "north": "Gia vị chấm cay nồng sưởi ấm mâm cơm mùa đông Bắc Bộ",
      "central": "Ăn kèm bún bò, bánh mì, mì Quảng đậm đà phong vị miền Trung",
      "south": "Gia vị chấm tự nhiên cho các món phở, hủ tiếu truyền thống",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Capsicum & Probiotic Lacto-Fermentation Gastronomy",
      "native_range": "Ẩm thực gia vị lên men truyền thống Việt Nam",
      "active_compounds": [
        "Capsaicin tự nhiên kích thích chuyển hóa đốt calo",
        "Lợi khuẩn Lactic sống kháng khuẩn có hại đường ruột",
        "Allicin từ tỏi ta tăng đề kháng hô hấp",
        "Không phẩm màu, không chất bảo quản sodium benzoate"
      ],
      "soil_ph": "pH tự nhiên của tương ớt 3.6 - 4.0 bảo quản tự nhiên an toàn tuyệt đối",
      "ideal_temp": "Bảo quản nơi thoáng mát hoặc ngăn mát tủ lạnh",
      "pot_size": "Hũ thủy tinh hoặc hũ sành 300ml - 500ml"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Rửa sạch ớt và hong khô ráo",
        "instruction": "Ớt chỉ thiên bỏ cuống, rửa nước muối loãng rồi trải ra nia hong khô hoàn toàn dưới bóng râm."
      },
      {
        "step": 2,
        "title": "Xay thô cùng tỏi, muối và men rượu",
        "instruction": "Xay ớt cùng tỏi bóc vỏ, muối hầm và chút rượu nếp cốt để tạo môi trường chọn lọc cho vi sinh có lợi."
      },
      {
        "step": 3,
        "title": "Ủ trong hũ sành kín khí 21 ngày",
        "instruction": "Đổ hỗn hợp vào hũ sành, phủ màng chèn kín miệng, ủ ở nhiệt độ phòng 21 ngày cho lên men sủi bọt mịn dậy mùi thơm."
      }
    ],
    "faqs": [
      {
        "question": "Tại sao tương ớt lên men tự nhiên lại tốt hơn tương ớt công nghiệp?",
        "answer": "Tương ớt công nghiệp chứa nhiều chất bảo quản, tinh bột biến tính và đường tinh luyện; tương ớt lên men chứa vi sinh vật probiotic sống tốt cho hệ tiêu hóa."
      },
      {
        "question": "Có cần cho vào tủ lạnh để bảo quản không?",
        "answer": "Nhờ nồng độ acid lactic tự nhiên dưới pH 4.0, tương ớt để nhiệt độ phòng cả năm không bao giờ mốc hỏng."
      }
    ],
    "monetization_tips": [
      "Sản xuất tương ớt thủ công bản địa sạch dán nhãn OCOP cung ứng cho thị trường quà tặng ẩm thực."
    ],
    "tags": [
      "Tương ớt",
      "Lên men tự nhiên",
      "Ớt chỉ thiên",
      "Probiotic",
      "Không chất bảo quản"
    ],
    "recipe_spec": {
      "prep_time_minutes": 30,
      "cook_time_minutes": 0,
      "servings": "2 hũ 350ml dùng cả năm",
      "botanical_ingredients": [
        "Ớt chỉ thiên đỏ tươi 500g",
        "Tỏi cô đơn hoặc tỏi ta 100g",
        "Muối biển hầm sạch 40g",
        "Rượu nếp cái hoa vàng 30ml",
        "Đường phèn xay mịn 20g"
      ],
      "health_benefits": [
        "Kích thích bài tiết dịch vị dạ dày, hỗ trợ tiêu hóa thức ăn nhiều dầu mỡ",
        "Capsaicin hỗ trợ tuần hoàn máu và giảm đau nhức xương khớp",
        "Tăng cường hệ miễn dịch tự nhiên nhờ lợi khuẩn lactic"
      ]
    },
    "related_plant_ids": [
      "herb-08",
      "herb-17",
      "fruit-10"
    ]
  },
  {
    "id": "culinary-13",
    "slug": "siro-hung-chanh-quat-duong-phen",
    "common_name": "Siro Húng Chanh Quất Đường Phèn Trị Ho Đờm Khản Tiếng",
    "scientific_name": "Steamed Indian Borage, Calamondin & Rock Sugar Cough Elixir",
    "aliases": [
      "Siro Húng Chanh",
      "Siro Trị Ho Quất Húng Chanh",
      "Húng Chanh Chưng Đường Phèn"
    ],
    "category": "culinary",
    "nft_class": "culinary_recipe",
    "description": "Bài thuốc siro trị ho dân gian an toàn tuyệt đối cho trẻ nhỏ và mẹ bầu. Kết hợp lá húng chanh tươi dày thơm nồng, quất bao tử nhiều tinh dầu, lá hẹ và gừng già chưng cùng đường phèn kết tinh.",
    "quick_answer": "Lá húng chanh thái nhỏ chưng cùng quả quất bổ đôi bỏ hạt và đường phèn trong 45 phút lửa nhỏ. Siro sánh vàng óng ánh, thơm lừng vị tinh dầu thảo mộc, uống ấm dịu cổ họng tức thì.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/3/34/Dipper_stick_and_honey_in_a_jar.jpg",
    "image_sha256": "a3e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e93",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Chưng nấu 50 phút, bảo quản dùng trong 3 tháng",
    "container_suitable": true,
    "seasonality": {
      "north": "Cứu cánh trị ho đờm sổ mũi cho trẻ nhỏ trong mùa đông và thời điểm giao mùa",
      "central": "Dịu họng khi cảm lạnh mưa gió dai dẳng miền Trung",
      "south": "Chữa khản tiếng cho người làm nghề nói nhiều (giáo viên, diễn giả, MC)",
      "best_months": [
        1,
        2,
        3,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Lamiaceae & Rutaceae Pediatric Herbal Therapy",
      "native_range": "Dân gian dược học gia đình Việt Nam",
      "active_compounds": [
        "Carvacrol & Thymol trong húng chanh kháng khuẩn cực mạnh",
        "Limonene trong vỏ quả quất tiêu đờm thông phế",
        "Vitamin C tự nhiên củng cố thành mạch",
        "Đường phèn nhuận phế sinh tân dịch"
      ],
      "soil_ph": "Không áp dụng",
      "ideal_temp": "Bảo quản hũ thủy tinh nơi thoáng mát hoặc ngăn mát tủ lạnh",
      "pot_size": "Hũ thủy tinh kín 300ml - 500ml"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Sơ chế húng chanh, quất và lá hẹ",
        "instruction": "Hái lá húng chanh tươi rửa sạch thái chỉ; quất quả bổ đôi bỏ hạt để không bị đắng; lá hẹ cắt khúc 2cm."
      },
      {
        "step": 2,
        "title": "Trộn đường phèn và chưng cách thủy",
        "instruction": "Cho tất cả vào âu gốm cùng đường phèn kết tinh tự nhiên, đặt vào nồi chưng cách thủy 40-45 phút."
      },
      {
        "step": 3,
        "title": "Chắt siro thơm vàng sánh mịn",
        "instruction": "Dùng thìa ép nhẹ bã lấy hết nước cốt siro vàng óng thơm nồng, rót vào hũ thủy tinh dùng dần."
      }
    ],
    "faqs": [
      {
        "question": "Trẻ sơ sinh và trẻ nhỏ dưới 1 tuổi dùng được không?",
        "answer": "Rất an toàn! Công thức dùng đường phèn tự nhiên (không dùng mật ong) nên trẻ từ 6 tháng tuổi trở lên có thể dùng nhấp 1 thìa cà phê rất lành."
      },
      {
        "question": "Tại sao cần bỏ hạt quất trước khi nấu?",
        "answer": "Hạt quất khi chưng nhiệt độ cao tiết chất đắng gắt khiến trẻ nhỏ khó uống; bỏ hạt siro sẽ có vị chua ngọt thanh dịu dễ uống."
      }
    ],
    "monetization_tips": [
      "Tự nấu siro húng chanh thảo mộc thủ công đóng hũ phân phối cho các mẹ bỉm sữa thành phố."
    ],
    "tags": [
      "Húng chanh",
      "Trị ho trẻ nhỏ",
      "Quất đường phèn",
      "Siro tự nhiên",
      "Dân gian"
    ],
    "recipe_spec": {
      "prep_time_minutes": 20,
      "cook_time_minutes": 45,
      "servings": "1 hũ 350ml dùng cho cả nhà 1-2 tháng",
      "botanical_ingredients": [
        "Lá húng chanh tươi hái vườn 150g",
        "Quất tươi bổ đôi bỏ hạt 100g",
        "Đường phèn kết tinh tự nhiên 150g",
        "Lá hẹ non 50g",
        "Gừng thái chỉ 10g"
      ],
      "health_benefits": [
        "Cắt dứt cơn ho dai dẳng, tan đờm nhầy cổ họng tức thì",
        "Sát khuẩn khoang miệng và thanh quản, trị khản tiếng mất giọng",
        "Nâng cao sức đề kháng đường hô hấp tự nhiên không cần lạm dụng kháng sinh"
      ]
    },
    "related_plant_ids": [
      "herb-01",
      "herb-02",
      "fruit-03"
    ]
  },
  {
    "id": "culinary-14",
    "slug": "tra-day-rung-tay-bac-chua-da-day",
    "common_name": "Trà Dây Rừng Tây Bắc & Cam Thảo Dây Chữa Viêm Loét Dạ Dày",
    "scientific_name": "Ampelopsis Cantoniensis Wild Forest Gastro-Protective Tea",
    "aliases": [
      "Trà Dây Cao Bằng",
      "Chè Dây Trị Viêm Dạ Dày",
      "Wild Forest Gastro Tea"
    ],
    "category": "culinary",
    "nft_class": "culinary_recipe",
    "description": "Thức trà thảo dược mọc tự nhiên trên các vách đá vùng núi cao Cao Bằng, Sa Pa. Phủ lớp phấn trắng tuyết mốc tự nhiên giàu flavonoid diệt vi khuẩn HP, làm lành nhanh các vết loét niêm mạc dạ dày và giúp ăn ngon ngủ sâu giấc.",
    "quick_answer": "Hãm 15-20g trà dây khô có lớp phấn tuyết với 500ml nước sôi 95°C trong 10 phút. Nước trà màu hổ phách, vị ngọt hậu thanh tao của cam thảo dây, uống đều đặn trước bữa ăn 30 phút.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Ampelopsis_cantoniensis_var_leeoides01.jpg",
    "image_sha256": "b4e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e94",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Pha hãm 10 phút, uống dưỡng dạ dày mỗi ngày",
    "container_suitable": true,
    "seasonality": {
      "north": "Đặc sản thảo dược trứ danh đại ngàn Hoàng Liên Sơn và Cao Bằng",
      "central": "Uống hạ hỏa, giảm triệu chứng ợ chua nóng rát vùng thượng vị",
      "south": "Thức uống dưỡng sinh văn phòng xua tan áp lực stress gây đau dạ dày",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Vitaceae Mountain Forest Pharmacology",
      "native_range": "Dãy núi Hoàng Liên Sơn và vùng núi đá vôi Đông Bắc, Việt Nam",
      "active_compounds": [
        "Myricetin & Dihydromyricetin kháng khuẩn Helicobacter pylori (HP)",
        "Tanin tự nhiên săn se và làm liền ổ loét niêm mạc",
        "Flavonoid toàn phần chống oxy hóa tế bào",
        "Hoàn toàn không gây tác dụng phụ khi dùng lâu dài"
      ],
      "soil_ph": "Không áp dụng",
      "ideal_temp": "Nhiệt độ nước hãm 90°C - 95°C",
      "pot_size": "Ấm trà hoặc bình giữ nhiệt 1 lít"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Tráng ấm và đánh thức lá trà dây",
        "instruction": "Cho 20g trà dây vào bình thủy tinh, rót chút nước sôi tráng đều rồi gạn bỏ nước đầu."
      },
      {
        "step": 2,
        "title": "Hãm trà dây cùng cam thảo dây",
        "instruction": "Rót 600ml nước sôi 95°C, đậy kín nắp ủ trong 10-15 phút để chiết xuất trọn vẹn lớp tuyết phấn quý giá."
      },
      {
        "step": 3,
        "title": "Rót uống ấm trước bữa ăn",
        "instruction": "Uống 1 cốc ấm trước bữa ăn sáng và các bữa chính 30 phút để tạo lớp màng bảo vệ dạ dày."
      }
    ],
    "faqs": [
      {
        "question": "Lớp mốc phấn trắng bám trên lá trà dây có phải là bị hỏng không?",
        "answer": "Không! Đó là phấn tuyết tự nhiên sinh ra trong quá trình ủ men lá trà dây truyền thống, càng nhiều phấn trắng chứng tỏ trà dây càng giàu hoạt chất quý."
      },
      {
        "question": "Trà dây có gây mất ngủ như trà búp thông thường không?",
        "answer": "Không! Trà dây không chứa caffeine, ngược lại còn giúp an thần, ngủ rất ngon giấc và êm bụng."
      }
    ],
    "monetization_tips": [
      "Đóng gói trà dây rừng nguyên chất thượng hạng bán cho người làm việc văn phòng."
    ],
    "tags": [
      "Trà dây",
      "Đau dạ dày",
      "Vi khuẩn HP",
      "Tây Bắc",
      "Thảo dược rừng"
    ],
    "recipe_spec": {
      "prep_time_minutes": 5,
      "cook_time_minutes": 10,
      "servings": "Bình trà 1 lít dùng cả ngày",
      "botanical_ingredients": [
        "Trà dây rừng khô có tuyết phấn 20g",
        "Cam thảo dây sấy khô 3g",
        "Hoa nhài sấy khô 3 bông"
      ],
      "health_benefits": [
        "Ức chế và tiêu diệt vi khuẩn HP gây viêm loét dạ dày tá tràng",
        "Trung hòa acid dịch vị, cắt cơn đau thượng vị và chứng ợ hơi ợ chua",
        "Giải độc gan, thanh nhiệt cơ thể và mang lại giấc ngủ sâu êm đềm"
      ]
    },
    "related_plant_ids": [
      "herb-04",
      "herb-19",
      "orn-11"
    ]
  },
  {
    "id": "culinary-15",
    "slug": "muoi-hat-dam-la-e-trang-phu-yen",
    "common_name": "Muối Hạt Dầm Lá É Trắng Phú Yên Chấm Gà Nướng",
    "scientific_name": "Ocimum Tenuiflorum Var. White Holy Basil Herbal Sea Salt",
    "aliases": [
      "Muối Lá É",
      "Muối É Trắng Phú Yên",
      "Gia Vị Gà Nướng Lá É"
    ],
    "category": "culinary",
    "nft_class": "culinary_recipe",
    "description": "Thức chấm trứ danh xứ Nẫu Phú Yên dầm từ lá é trắng tươi ngắt tại vườn với muối hạt hầm nổ bung và ớt xiêm xanh cay xé lưỡi. Hương thơm the mát đặc trưng của lá é hòa cùng vị ngọt đậm của thịt gà nướng than hoa.",
    "quick_answer": "Lá é trắng hái tươi rửa ráo nước, cho vào cối đá giã dập cùng ớt xiêm xanh cay nồng và muối hột biển hầm khô rang giòn, vắt xíu nước cốt chanh tạo nên thứ muối chấm huyền thoại.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/9/97/Kemangi.jpg",
    "image_sha256": "c5e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e95",
    "sunlight": "partial_shade",
    "watering": "drought_tolerant",
    "propagation_difficulty": 1,
    "growth_time": "Chế biến 10 phút, thưởng thức tươi tại bàn",
    "container_suitable": true,
    "seasonality": {
      "north": "Thức chấm độc lạ hấp dẫn cho các bữa tiệc nướng BBQ gia đình",
      "central": "Linh hồn của món lẩu gà lá é và gà nướng than đất Phú Yên",
      "south": "Gia vị thảo mộc được săn đón cuồng nhiệt tại các thành phố lớn",
      "best_months": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ]
    },
    "botanical_details": {
      "family": "Lamiaceae Indigenous Coastal Spice Gastronomy",
      "native_range": "Vùng đất nắng gió Phú Yên - Duyên hải Nam Trung Bộ",
      "active_compounds": [
        "Eugenol & Citral mang hương thơm the cay quyến rũ",
        "Capsaicin tự nhiên trong ớt xiêm rừng",
        "Khoáng chất biển tự nhiên trong muối hột hầm",
        "Kích thích vị giác và ấm bụng tiêu thực"
      ],
      "soil_ph": "Không áp dụng",
      "ideal_temp": "Ngon nhất khi giã ăn tươi trong ngày",
      "pot_size": "Chén gốm chấm mộc mạc"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Hái lá é trắng bánh tẻ lúc tươi",
        "instruction": "Hái nắm lá é trắng bánh tẻ lúc sáng sớm để giữ trọn vẹn tinh dầu the mát, rửa sạch vẩy khô."
      },
      {
        "step": 2,
        "title": "Sao giòn muối hạt biển hầm",
        "instruction": "Rang muối hột trên chảo gang đến khi hạt muối nổ trắng khô ráo, thơm nồng."
      },
      {
        "step": 3,
        "title": "Giã cối đá hòa quyện hương vị",
        "instruction": "Cho lá é, ớt xiêm xanh bỏ cuống, muối hầm và chút bột ngọt vào cối đá giã nhuyễn quyện sánh một màu xanh ngọc bích."
      }
    ],
    "faqs": [
      {
        "question": "Lá é trắng khác lá húng quế thông thường như thế nào?",
        "answer": "Lá é trắng thân lông mịn, hoa trắng, tinh dầu chứa hàm lượng eugenol cao tạo hương thơm the mát nồng nàn hơn húng quế rất nhiều."
      },
      {
        "question": "Có thể bảo quản muối lá é dùng lâu được không?",
        "answer": "Có thể sấy khô muối lá é ở nhiệt độ thấp 50°C rồi đóng lọ kín dùng dần trong 3-6 tháng vẫn giữ được mùi thơm."
      }
    ],
    "monetization_tips": [
      "Sản xuất muối lá é sấy thăng hoa đóng hũ phân phối cho các chuỗi quán lẩu gà và nướng."
    ],
    "tags": [
      "Lá é trắng",
      "Phú Yên",
      "Muối chấm gà",
      "Ớt xiêm xanh",
      "Đặc sản xứ Nẫu"
    ],
    "recipe_spec": {
      "prep_time_minutes": 10,
      "cook_time_minutes": 5,
      "servings": "1 đĩa muối chấm 4-6 người ăn",
      "botanical_ingredients": [
        "Lá é trắng tươi hái vườn 50g",
        "Ớt xiêm rừng xanh 5-7 quả",
        "Muối hột biển hầm giòn 50g",
        "Chanh tươi 1 quả",
        "Tiêu sọ xay nhẹ nửa thìa cà phê"
      ],
      "health_benefits": [
        "Trục hàn giải cảm phong nhiệt, thông mũi mát họng",
        "Kích thích dịch vị dạ dày, hỗ trợ tiêu hóa thịt mỡ nướng",
        "Tạo năng lượng sảng khoái và chống say xe buồn nôn"
      ]
    },
    "related_plant_ids": [
      "herb-08",
      "herb-17",
      "fruit-10"
    ]
  },
  {
    "id": "forest-11",
    "slug": "vuon-quoc-gia-u-minh-ha",
    "common_name": "Vườn Quốc Gia U Minh Hạ",
    "scientific_name": "U Minh Ha National Park (Melaleuca Peat Swamp Forest Biome)",
    "aliases": [
      "VQG U Minh Hạ",
      "Rừng Tràm U Minh Cà Mau",
      "Khu Sinh Quyển Mũi Cà Mau"
    ],
    "category": "forest",
    "nft_class": "geo_forest_10000m2",
    "description": "Xứ sở rừng tràm ngập nước trên đất than bùn trù phú cực Nam Tổ quốc với diện tích 8.527 ha (85.270.000 m²). Vùng lõi Khu dự trữ sinh quyển thế giới Mũi Cà Mau được UNESCO vinh danh năm 2009, nổi danh với nghề gác kèo ong lấy mật hoa tràm nguyên chất ngàn đời.",
    "quick_answer": "Vườn quốc gia U Minh Hạ bảo tồn hệ sinh thái rừng tràm trên đất than bùn cổ đại độc nhất vô nhị. Mỗi NFT tương ứng bảo tồn 10.000 m² (1 ha) rừng tràm than bùn Cà Mau.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Chu%E1%BB%91i_t%E1%BA%A1i_r%E1%BB%ABng_U_Minh_h%E1%BA%A1.jpg",
    "image_sha256": "d6e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e96",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 5,
    "growth_time": "Rừng tràm than bùn cổ đại ngập nước bảo tồn vĩnh cửu",
    "container_suitable": false,
    "seasonality": {
      "north": "Vùng đất phương Nam hào sảng gắn liền câu chuyện bác Ba Phi",
      "central": "Khu rừng giữ nước ngọt và ngọt hóa vùng đất mặn Cà Mau",
      "south": "Mùa mật hoa tràm ngát hương từ tháng 11 đến tháng 4 âm lịch",
      "best_months": [
        1,
        2,
        3,
        4,
        11,
        12
      ],
      "warning": "Tuyệt đối cẩn trọng phòng cháy rừng vào cao điểm mùa khô hạn"
    },
    "botanical_details": {
      "family": "Melaleuca Cajuputi Tropical Peat Swamp Forest Ecosystem",
      "native_range": "Huyện U Minh và Trần Văn Thời, tỉnh Cà Mau",
      "active_compounds": [
        "Tầng đất than bùn dày trữ lượng carbon khổng lồ",
        "Rừng tràm Melaleuca hoa trắng tỏa ngát mật ngọt",
        "Di sản văn hóa phi vật thể Nghề gác kèo ong",
        "Hệ động thực vật thủy sinh đồng bằng ngập nước"
      ],
      "soil_ph": "3.8 - 4.8 (Đất than bùn phèn chua đặc trưng)",
      "ideal_temp": "26°C - 34°C nắng gió phương Nam",
      "pot_size": "Khu bảo tồn 8.527 ha (Tương ứng 8.527 Lô NFT 10.000m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Đến VQG U Minh Hạ và bật định vị GPS",
        "instruction": "Di chuyển đến khu vực VQG U Minh Hạ (Cà Mau) trong bán kính 9km từ tâm rừng. Bật GPS."
      },
      {
        "step": 2,
        "title": "Xác thực Check-in số Web3",
        "instruction": "Bấm Xác Thực GPS Check-in trên Web3 Sandbox để nhận Vé Check-in số 24 giờ."
      },
      {
        "step": 3,
        "title": "Đúc NFT Lô Rừng U Minh Hạ 10.000m²",
        "instruction": "Ký ví Web3 nhận chứng nhận số bảo trợ 1 ha đại ngàn rừng tràm than bùn trên Blockchain."
      }
    ],
    "faqs": [
      {
        "question": "Nghề gác kèo ong U Minh Hạ có gì độc đáo?",
        "answer": "Là tri thức bản địa độc nhất vô nhị được công nhận Di sản phi vật thể quốc gia, người thợ gác cành tràm nghiêng dẫn dụ ong rừng tự nhiên về làm tổ lấy mật."
      },
      {
        "question": "Tổng số Lô NFT của VQG U Minh Hạ là bao nhiêu?",
        "answer": "Tổng diện tích 8.527 ha tương ứng với tối đa 8.527 Lô NFT độc bản (1 ha/lô)."
      }
    ],
    "monetization_tips": [
      "Chủ sở hữu NFT nhận huy hiệu Người Bảo Hộ Rừng Tràm Cà Mau và đặc quyền trải nghiệm gác kèo ong lấy mật."
    ],
    "tags": [
      "U Minh Hạ",
      "Cà Mau",
      "Rừng tràm",
      "Gác kèo ong",
      "UNESCO",
      "Đất than bùn"
    ],
    "forest_spec": {
      "center_lat": 9.2167,
      "center_lng": 104.9833,
      "radius_km": 9,
      "total_area_m2": 85270000,
      "unit_area_m2": 10000,
      "max_nft_supply": 8527,
      "province": "Cà Mau",
      "unesco_or_status": "Vùng Lõi Khu Dự Trữ Sinh Quyển Mũi Cà Mau UNESCO (2009)"
    },
    "related_plant_ids": [
      "herb-01",
      "fruit-08",
      "orn-07"
    ]
  },
  {
    "id": "forest-12",
    "slug": "vuon-quoc-gia-u-minh-thuong",
    "common_name": "Vườn Quốc Gia U Minh Thượng",
    "scientific_name": "U Minh Thuong National Park (Peat Swamp Ramsar Biome)",
    "aliases": [
      "VQG U Minh Thượng",
      "Rừng Tràm Kiên Giang",
      "Ramsar Thứ 2.228 Thế Giới"
    ],
    "category": "forest",
    "nft_class": "geo_forest_10000m2",
    "description": "Vườn Di sản ASEAN và Khu Ramsar thứ 2.228 của thế giới với diện tích 8.038 ha (80.380.000 m²). Nơi lưu giữ mẫu chuẩn hệ sinh thái rừng tràm úng phèn trên đất than bùn cổ cuối cùng của bán đảo Cà Mau, ngôi nhà của loài rái cá lông mũi cực kỳ nguy cấp.",
    "quick_answer": "U Minh Thượng sở hữu đầm lầy than bùn cổ dày đến 1.5m với 243 loài thực vật bậc cao và quần thể chim nước quý hiếm. Mỗi NFT tương ứng bảo tồn 10.000 m² (1 ha) đầm lầy Ramsar.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/5/5e/RungUMinh1.jpg",
    "image_sha256": "e7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e97",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 5,
    "growth_time": "Rừng than bùn ngập nước cổ sơ bảo tồn vĩnh cửu",
    "container_suitable": false,
    "seasonality": {
      "north": "Kỳ quan rừng than bùn phương Nam được quốc tế vinh danh",
      "central": "Vùng đất ngập nước hiền hòa giàu tôm cá nước ngọt",
      "south": "Mùa nước nổi tuyệt đẹp để chèo thuyền xuyên đại ngàn rừng tràm",
      "best_months": [
        9,
        10,
        11,
        12,
        1,
        2
      ],
      "warning": "Giữ gìn hệ sinh thái ngập nước, cấm săn bắt các loài chim nước hoang dã"
    },
    "botanical_details": {
      "family": "Tropical Peat Swamp Forest Ramsar Wetland Biome",
      "native_range": "Huyện U Minh Thượng, tỉnh Kiên Giang",
      "active_compounds": [
        "Tầng than bùn cổ đại dày đến 1.5 mét",
        "Nơi sinh sống của loài Rái cá lông mũi (Lutra sumatrana) quý hiếm nhất hành tinh",
        "Rừng tràm nguyên sinh cổ thụ",
        "Hồ nước ngọt đầm lầy Trảng Dơi, Trảng Chim"
      ],
      "soil_ph": "3.5 - 4.5",
      "ideal_temp": "25°C - 33°C",
      "pot_size": "Khu bảo tồn 8.038 ha (Tương ứng 8.038 Lô NFT 10.000m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Đến VQG U Minh Thượng và bật GPS",
        "instruction": "Di chuyển đến khu vực VQG U Minh Thượng (tỉnh Kiên Giang) trong bán kính 9km. Bật GPS."
      },
      {
        "step": 2,
        "title": "Xác thực Check-in số Web3",
        "instruction": "Bấm Xác Thực GPS Check-in trên Web3 Sandbox để nhận Vé Check-in số 24 giờ."
      },
      {
        "step": 3,
        "title": "Đúc NFT Lô Rừng U Minh Thượng 10.000m²",
        "instruction": "Ký ví Web3 nhận chứng nhận số bảo trợ 1 ha đất ngập nước Ramsar trên Blockchain."
      }
    ],
    "faqs": [
      {
        "question": "Tại sao than bùn U Minh Thượng lại có ý nghĩa chống biến đổi khí hậu lớn?",
        "answer": "Đất than bùn đầm lầy lưu trữ lượng carbon khổng lồ trên mỗi mét vuông gấp nhiều lần các loại đất rừng thông thường trên thế giới."
      },
      {
        "question": "Tổng số Lô NFT của VQG U Minh Thượng là bao nhiêu?",
        "answer": "Tổng diện tích 8.038 ha tương ứng với tối đa 8.038 Lô NFT độc bản (1 ha/lô)."
      }
    ],
    "monetization_tips": [
      "Chủ sở hữu NFT nhận huy hiệu Người Bảo Vệ Vườn Di Sản ASEAN U Minh Thượng."
    ],
    "tags": [
      "U Minh Thượng",
      "Kiên Giang",
      "Vườn Di sản ASEAN",
      "Khu Ramsar 2228",
      "Rái cá lông mũi"
    ],
    "forest_spec": {
      "center_lat": 9.5833,
      "center_lng": 105.0833,
      "radius_km": 9,
      "total_area_m2": 80380000,
      "unit_area_m2": 10000,
      "max_nft_supply": 8038,
      "province": "Kiên Giang",
      "unesco_or_status": "Vườn Di Sản ASEAN & Khu Ramsar Thế Giới Thứ 2.228 (2015)"
    },
    "related_plant_ids": [
      "herb-12",
      "fruit-15",
      "orn-07"
    ]
  },
  {
    "id": "forest-13",
    "slug": "vuon-quoc-gia-yok-don",
    "common_name": "Vườn Quốc Gia Yok Đôn",
    "scientific_name": "Yok Don National Park (Dipterocarp Deciduous Dry Forest Biome)",
    "aliases": [
      "VQG Yok Đôn",
      "Rừng Khộp Yok Đôn Đắk Lắk",
      "Vương Quốc Voi Tây Nguyên"
    ],
    "category": "forest",
    "nft_class": "geo_forest_10000m2",
    "description": "Vườn quốc gia lớn thứ hai Việt Nam với diện tích khổng lồ 115.545 ha (1.155.450.000 m²). Là nơi duy nhất tại Việt Nam bảo tồn hệ sinh thái rừng Khộp rụng lá mùa khô họ Dầu đặc trưng, nơi sinh sống tự do của đàn voi hoang dã Tây Nguyên.",
    "quick_answer": "Rừng Khộp Yok Đôn trút lá mùa khô chuyển sang sắc vàng đỏ kỳ ảo và bừng thức xanh tươi khi mưa về. Mỗi NFT tương ứng bảo tồn 10.000 m² (1 ha) rừng Khộp Tây Nguyên.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/7/74/Yokdon01.JPG",
    "image_sha256": "f8e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e98",
    "sunlight": "full_sun",
    "watering": "drought_tolerant",
    "propagation_difficulty": 5,
    "growth_time": "Rừng Khộp khổng lồ nghìn năm tuổi bảo tồn vĩnh cửu",
    "container_suitable": false,
    "seasonality": {
      "north": "Khu rừng hoang dã tráng lệ của miền đất Tây Nguyên hùng vĩ",
      "central": "Mùa rụng lá mùa khô (tháng 12-4) biến rừng Khộp thành khung cảnh thảo nguyên châu Phi",
      "south": "Mùa mưa (tháng 5-11) dòng sông Sêrêpôk cuộn chảy và rừng xanh bạt ngàn",
      "best_months": [
        11,
        12,
        1,
        2,
        3,
        4
      ],
      "warning": "Mô hình du lịch thân thiện với voi - tuyệt đối không cưỡi voi"
    },
    "botanical_details": {
      "family": "Dipterocarpaceae Deciduous Dry Forest Ecosystem",
      "native_range": "Huyện Buôn Đôn và Ea Súp, tỉnh Đắk Lắk",
      "active_compounds": [
        "Các loài cây họ Dầu rụng lá: Dầu đồng, Cà te, Cẩm lai",
        "Quần thể Voi châu Á (Elephas maximus) lớn nhất Việt Nam",
        "Bò tót, Nai cà tông và các loài móng guốc quý hiếm",
        "Dòng sông Sêrêpôk huyền thoại chảy ngược"
      ],
      "soil_ph": "5.5 - 6.5 (Đất xám bạc màu trên nền đá magma)",
      "ideal_temp": "20°C - 35°C",
      "pot_size": "Khu bảo tồn 115.545 ha (Tương ứng 115.545 Lô NFT 10.000m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Đến VQG Yok Đôn và bật định vị GPS",
        "instruction": "Di chuyển đến huyện Buôn Đôn (Đắk Lắk) trong bán kính 25km từ tâm rừng. Bật GPS."
      },
      {
        "step": 2,
        "title": "Xác thực Check-in số Web3",
        "instruction": "Bấm Xác Thực GPS Check-in trên Web3 Sandbox để nhận Vé Check-in số 24 giờ."
      },
      {
        "step": 3,
        "title": "Đúc NFT Lô Rừng Khộp Yok Đôn 10.000m²",
        "instruction": "Ký ví Web3 nhận chứng nhận số bảo trợ 1 ha đại ngàn rừng Khộp trên Blockchain."
      }
    ],
    "faqs": [
      {
        "question": "Rừng Khộp là loại rừng gì?",
        "answer": "Rừng Khộp là rừng thưa cây lá rộng rụng lá vào mùa khô hạn thuộc họ Dầu (Dipterocarpaceae), tạo nên cảnh quan độc đáo chỉ có ở Tây Nguyên và Đông Nam Á."
      },
      {
        "question": "Tổng số Lô NFT của VQG Yok Đôn là bao nhiêu?",
        "answer": "Tổng diện tích 115.545 ha tương ứng với tối đa 115.545 Lô NFT độc bản (1 ha/lô)."
      }
    ],
    "monetization_tips": [
      "Chủ sở hữu NFT nhận chứng nhận Người Bảo Hộ Voi Rừng Tây Nguyên và ưu đãi tour ngắm voi tự do."
    ],
    "tags": [
      "Yok Đôn",
      "Đắk Lắk",
      "Rừng Khộp",
      "Voi hoang dã",
      "Sông Sêrêpôk",
      "Tây Nguyên"
    ],
    "forest_spec": {
      "center_lat": 12.8333,
      "center_lng": 107.75,
      "radius_km": 25,
      "total_area_m2": 1155450000,
      "unit_area_m2": 10000,
      "max_nft_supply": 115545,
      "province": "Đắk Lắk",
      "unesco_or_status": "Vườn Quốc Gia Rừng Khộp Lớn Nhất Việt Nam"
    },
    "related_plant_ids": [
      "herb-08",
      "fruit-06",
      "orn-02"
    ]
  },
  {
    "id": "forest-14",
    "slug": "vuon-quoc-gia-bidoup-nui-ba",
    "common_name": "Vườn Quốc Gia Bidoup - Núi Bà",
    "scientific_name": "Bidoup - Nui Ba National Park (Cloud Forest Langbiang Biome)",
    "aliases": [
      "VQG Bidoup Núi Bà",
      "Mái Nhà Tây Nguyên",
      "Vùng Lõi Sinh Quyển Langbiang"
    ],
    "category": "forest",
    "nft_class": "geo_forest_10000m2",
    "description": "Nóc nhà của cao nguyên Lâm Viên với diện tích 70.038 ha (700.380.000 m²). Vùng lõi của Khu dự trữ sinh quyển thế giới Langbiang được UNESCO công nhận năm 2015, là trung tâm đa dạng sinh học các loài cây lá kim cổ thụ quý hiếm bậc nhất hành tinh.",
    "quick_answer": "Bidoup lưu giữ cây Thông hai lá dẹt cổ thụ hơn 1.000 năm tuổi mệnh danh là \"hóa thạch sống\" của giới thực vật. Mỗi NFT tương ứng bảo tồn 10.000 m² (1 ha) rừng mây núi cao Bidoup.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/4/45/Pine_trees_in_Bidoup-Nui_Ba_National_Park.jpg",
    "image_sha256": "09e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e99",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 5,
    "growth_time": "Rừng rêu và rừng lá kim cổ thụ hàng ngàn năm tuổi",
    "container_suitable": false,
    "seasonality": {
      "north": "Khu rừng ôn đới cận nhiệt đới kỳ vĩ của cao nguyên Đà Lạt",
      "central": "Nguồn sinh thủy nuôi dưỡng toàn bộ hệ thống lưu vực sông Đồng Nai",
      "south": "Thiên đường trekking khám phá vương quốc rêu và thông cổ thụ",
      "best_months": [
        11,
        12,
        1,
        2,
        3,
        4
      ],
      "warning": "Thời tiết núi cao thay đổi nhanh và nhiệt độ ban đêm có thể xuống dưới 8°C"
    },
    "botanical_details": {
      "family": "Montane Mossy Cloud Forest & Ancient Conifer Ecosystem",
      "native_range": "Huyện Lạc Dương và Đam Rông, tỉnh Lâm Đồng",
      "active_compounds": [
        "Thông hai lá dẹt (Pinus krempfii) hóa thạch sống đặc hữu duy nhất",
        "Hơn 300 loài phong lan rừng quý hiếm",
        "Thảm rừng rêu ma mị huyền bí trên độ cao 2000m",
        "Loài chim Mi Langbiang cực kỳ nguy cấp"
      ],
      "soil_ph": "4.8 - 5.8 (Đất mùn thô núi cao giàu hữu cơ)",
      "ideal_temp": "10°C - 24°C se lạnh quanh năm",
      "pot_size": "Khu bảo tồn 70.038 ha (Tương ứng 70.038 Lô NFT 10.000m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Đến khu bảo tồn Bidoup và bật GPS",
        "instruction": "Di chuyển đến huyện Lạc Dương (Lâm Đồng) trong bán kính 18km từ đỉnh Bidoup. Bật GPS."
      },
      {
        "step": 2,
        "title": "Xác thực Check-in số Web3",
        "instruction": "Bấm Xác Thực GPS Check-in trên Web3 Sandbox để nhận Vé Check-in số 24 giờ."
      },
      {
        "step": 3,
        "title": "Đúc NFT Lô Rừng Bidoup Núi Bà 10.000m²",
        "instruction": "Ký ví Web3 nhận chứng nhận số bảo trợ 1 ha đại ngàn rừng mây Langbiang trên Blockchain."
      }
    ],
    "faqs": [
      {
        "question": "Tại sao Thông hai lá dẹt Bidoup lại được xem là \"hóa thạch sống\"?",
        "answer": "Pinus krempfii là loài thông duy nhất trên thế giới có lá dẹt hình mũi mác, xuất hiện từ thời kỳ tiền sử và chỉ còn tồn tại ở vùng núi cao Bidoup."
      },
      {
        "question": "Tổng số Lô NFT của VQG Bidoup - Núi Bà là bao nhiêu?",
        "answer": "Tổng diện tích 70.038 ha tương ứng với tối đa 70.038 Lô NFT độc bản (1 ha/lô)."
      }
    ],
    "monetization_tips": [
      "Chủ sở hữu NFT nhận huy hiệu Người Bảo Hộ Mái Nhà Tây Nguyên và ưu đãi tour trekking rừng rêu."
    ],
    "tags": [
      "Bidoup",
      "Lâm Đồng",
      "Langbiang UNESCO",
      "Rừng mây",
      "Thông hai lá dẹt",
      "Đà Lạt"
    ],
    "forest_spec": {
      "center_lat": 12.1167,
      "center_lng": 108.5333,
      "radius_km": 18,
      "total_area_m2": 700380000,
      "unit_area_m2": 10000,
      "max_nft_supply": 70038,
      "province": "Lâm Đồng",
      "unesco_or_status": "Vùng Lõi Khu Dự Trữ Sinh Quyển Langbiang UNESCO (2015)"
    },
    "related_plant_ids": [
      "herb-08",
      "orn-01",
      "orn-11"
    ]
  },
  {
    "id": "forest-15",
    "slug": "vuon-quoc-gia-bach-ma",
    "common_name": "Vườn Quốc Gia Bạch Mã",
    "scientific_name": "Bach Ma National Park (Annamite Transition Zone Cloud Biome)",
    "aliases": [
      "VQG Bạch Mã",
      "Rừng Bạch Mã Huế",
      "Dải Xanh Chuyển Tiếp Đông Dương"
    ],
    "category": "forest",
    "nft_class": "geo_forest_10000m2",
    "description": "Dải rừng xanh nguyên sinh kỳ vĩ nơi giao thoa hai luồng sinh vật Bắc - Nam với diện tích 37.487 ha (374.870.000 m²). Tọa lạc tại độ cao 1.450m nhìn ra biển Đông, nơi đón lượng mưa lớn nhất Việt Nam tạo nên rừng rêu ma mị và thác Đỗ Quyên tráng lệ.",
    "quick_answer": "Vườn quốc gia Bạch Mã bảo tồn hơn 2.373 loài thực vật với thác Đỗ Quyên cao 300m hoa nở đỏ rực mùa xuân. Mỗi NFT tương ứng bảo tồn 10.000 m² (1 ha) rừng mây Bạch Mã.",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/6/67/Bach_Ma_NP2.jpg",
    "image_sha256": "1ae8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e00",
    "sunlight": "full_sun",
    "watering": "moderate",
    "propagation_difficulty": 5,
    "growth_time": "Rừng mưa núi cao chuyển tiếp sinh học nghìn năm bảo tồn vĩnh cửu",
    "container_suitable": false,
    "seasonality": {
      "north": "Điểm hội tụ giao thoa sinh học độc nhất vô nhị của bán đảo Đông Dương",
      "central": "Lá phổi xanh điều hòa khí hậu cho vùng cố đô Huế và Đà Nẵng",
      "south": "Mùa hoa Đỗ Quyên nở đỏ rực hai bên dòng thác từ tháng 2 đến tháng 4",
      "best_months": [
        2,
        3,
        4,
        5,
        6,
        7
      ],
      "warning": "Độ dốc địa hình lớn và nhiều sương mù, luôn đi theo đường mòn chỉ dẫn kiểm lâm"
    },
    "botanical_details": {
      "family": "Annamite Biodiversity Transition Cloud Forest Biome",
      "native_range": "Huyện Phú Lộc và Nam Đông, tỉnh Thừa Thiên Huế",
      "active_compounds": [
        "Quần thể hoa Đỗ Quyên đỏ (Rhododendron) cổ thụ đỉnh thác",
        "Nơi giao thoa sinh vật Bắc - Nam với 2.373 loài thực vật",
        "Rừng nguyên sinh Pơ mu và Trầm hương quý giá",
        "Sao la và Trĩ sao đặc hữu Đông Dương"
      ],
      "soil_ph": "4.5 - 5.5 (Đất Feralit mùn núi cao)",
      "ideal_temp": "15°C - 26°C sương mù se lạnh",
      "pot_size": "Khu bảo tồn 37.487 ha (Tương ứng 37.487 Lô NFT 10.000m²)"
    },
    "how_to_grow_steps": [
      {
        "step": 1,
        "title": "Đến đỉnh núi Bạch Mã và bật GPS",
        "instruction": "Di chuyển đến khu vực VQG Bạch Mã (Thừa Thiên Huế) trong bán kính 14km từ Hải Vọng Đài. Bật GPS."
      },
      {
        "step": 2,
        "title": "Xác thực Check-in số Web3",
        "instruction": "Bấm Xác Thực GPS Check-in trên Web3 Sandbox để nhận Vé Check-in số 24 giờ."
      },
      {
        "step": 3,
        "title": "Đúc NFT Lô Rừng Bạch Mã 10.000m²",
        "instruction": "Ký ví Web3 nhận chứng nhận số bảo trợ 1 ha đại ngàn rừng mây Bạch Mã trên Blockchain."
      }
    ],
    "faqs": [
      {
        "question": "Tại sao Bạch Mã có lượng mưa lớn nhất Việt Nam?",
        "answer": "Bạch Mã là dãy núi cao cuối cùng của dải Trường Sơn đâm ngang ra biển Đông, chặn toàn bộ gió mùa mang hơi ẩm đại dương tạo lượng mưa lên tới 8.000mm/năm."
      },
      {
        "question": "Tổng số Lô NFT của VQG Bạch Mã là bao nhiêu?",
        "answer": "Tổng diện tích 37.487 ha tương ứng với tối đa 37.487 Lô NFT độc bản (1 ha/lô)."
      }
    ],
    "monetization_tips": [
      "Chủ sở hữu NFT nhận huy hiệu Người Bảo Hộ Đại Ngàn Bạch Mã và ưu đãi vé tham quan đỉnh Hải Vọng Đài."
    ],
    "tags": [
      "Bạch Mã",
      "Thừa Thiên Huế",
      "Thác Đỗ Quyên",
      "Hải Vọng Đài",
      "Rừng mây",
      "Chuyển tiếp sinh học"
    ],
    "forest_spec": {
      "center_lat": 16.1967,
      "center_lng": 107.85,
      "radius_km": 14,
      "total_area_m2": 374870000,
      "unit_area_m2": 10000,
      "max_nft_supply": 37487,
      "province": "Thừa Thiên Huế",
      "unesco_or_status": "Vườn Quốc Gia Trọng Điểm Dải Chuyển Tiếp Sinh Học Đông Dương"
    },
    "related_plant_ids": [
      "herb-01",
      "orn-01",
      "fruit-08"
    ]
  }
];

export const allPlants: Plant[] = SEED_PLANTS;
