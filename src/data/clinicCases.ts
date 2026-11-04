import { ClinicQuestion } from '../types/index.ts';

export const INITIAL_CLINIC_QUESTIONS: ClinicQuestion[] = [
  {
    id: 'case-01',
    user_id: 'usr-101',
    user_name: 'Bác Ba Làm Vườn',
    title: 'Cây ổi lê trồng chậu 50L bị lớp phấn trắng bám dưới mặt lá và rụng nụ non',
    description: 'Tôi trồng chậu trên sân thượng nắng gắt, mấy hôm nay thấy dưới gân lá có nhiều bọ nhỏ li ti phủ phấn trắng, kiến bu nhiều quanh ngọn và nụ non bắt đầu thâm đen rụng dần.',
    plant_name_hint: 'Ổi Lê Đài Loan',
    region: 'south',
    symptoms: ['Rệp sáp trắng bám thân', 'Rụng hoa/trái non'],
    images: ['https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Psidium_guajava_fruit.jpg/330px-Psidium_guajava_fruit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'],
    ai_instant_diagnosis: 'Phân tích sơ bộ từ AI (Miền Nam): Khả năng 95% cây bị rệp sáp bông (Pseudococcidae) cộng sinh với kiến đen. Rệp hút nhựa làm kiệt đọt non và rụng nụ. Khuyến cáo cấp tốc: Pha nước rửa chén hữu cơ hoặc cồn y tế 70 độ xịt trực tiếp vào ổ rệp vào lúc chiều mát, sáng hôm sau xịt nước mạnh rửa trôi.',
    answers: [
      {
        id: 'ans-101',
        question_id: 'case-01',
        author_name: 'Kỹ Sư Nông Nghiệp Lâm',
        author_badge: 'Nhà Vườn Kinh Nghiệm',
        content: 'Bác lấy 1 củ tỏi + 3 quả ớt + 1 nhánh gừng giã nhuyễn ngâm với 1 lít rượu trắng trong 2 ngày. Lọc lấy nước cốt pha tỷ lệ 1:20 với nước lã và 1 giọt dầu rửa chén xịt 2 lần cách nhau 3 ngày là rệp sáp sạch bóng, hoàn toàn an toàn cho trái ăn!',
        upvotes: 18,
        created_at: '2 giờ trước',
        is_verified: true,
      },
      {
        id: 'ans-102',
        question_id: 'case-01',
        author_name: 'Minh Thảo (Q.7)',
        author_badge: 'Thành Viên Tích Cực',
        content: 'Bác nhớ rắc thêm một ít vôi bột quanh mép chậu để chặn đường kiến đen tha rệp từ dưới đất lên nữa nhé bác!',
        upvotes: 7,
        created_at: '1 giờ trước',
      }
    ],
    status: 'visible',
    created_at: '3 giờ trước'
  },
  {
    id: 'case-02',
    user_id: 'usr-102',
    user_name: 'Thu Trang (Căn Hộ Ecopark)',
    title: 'Bụi Đinh Lăng nếp mới giâm cành bị vàng rũ lá dưới gốc dù đất vẫn ướt sũng',
    description: 'Em mới xin cành giâm về cắm vào chậu đất thịt trộn phân bò, tưới ngày 2 lần đẫm nước. Sau 1 tuần thì lá chân vàng ươm, nhấc nhẹ cành lên thấy phần gốc cắm dưới đất thâm đen có mùi úng.',
    plant_name_hint: 'Đinh Lăng Nếp Lá Nhỏ',
    region: 'north',
    symptoms: ['Lá héo rũ dù đất ẩm', 'Vàng lá đốm nâu'],
    images: ['https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg/330px-Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'],
    ai_instant_diagnosis: 'Phân tích sơ bộ từ AI (Miền Bắc): Đinh lăng bị thối đen gốc do úng rễ (Pythium). Đất thịt quá chặt bí khí kết hợp tưới đẫm làm cành thiếu oxy nghẹt rễ. Cần nhổ cành, cắt bỏ đoạn đen, rửa nước vôi và chuyển sang giá thể xơ dừa + đá perlite tơi xốp.',
    answers: [
      {
        id: 'ans-201',
        question_id: 'case-02',
        author_name: 'Lương Y Nguyễn Văn Cường',
        author_badge: 'Dược Sĩ Cổ Truyền',
        content: 'Sai lầm phổ biến khi giâm đinh lăng là dùng đất thịt có phân. Giai đoạn cành chưa có rễ tuyệt đối không bón phân. Cháu nên cắm cành vào cát xây dựng ẩm hoặc dớn trắng ẩm, để chỗ râm mát 20 ngày tự khắc rễ tơ trắng bật tua tủa!',
        upvotes: 24,
        created_at: '5 giờ trước',
        is_verified: true,
      }
    ],
    status: 'visible',
    created_at: '6 giờ trước'
  }
];
