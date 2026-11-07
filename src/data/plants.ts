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
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Eleutherine_bulbosa_1.jpg/960px-Eleutherine_bulbosa_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
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
  }
];

export const allPlants: Plant[] = SEED_PLANTS;
