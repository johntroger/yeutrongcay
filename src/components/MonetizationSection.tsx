import React, { useState } from 'react';
import {
  Coins,
  Scissors,
  Coffee,
  Home,
  ShoppingBag,
  ArrowRight,
  X,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Layers,
  Sparkles,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface BlueprintDetail {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  roi: string;
  starterBudget: string;
  breakEvenTimeline: string;
  targetMarket: string;
  equipment: string[];
  stepByStep: { step: string; detail: string }[];
  keyRecipeOrTechnique: { label: string; content: string };
  salesChannels: string[];
  expertTip: string;
}

export const MonetizationSection: React.FC = () => {
  const { isEn } = useLanguage();
  const [selectedBlueprintIndex, setSelectedBlueprintIndex] = useState<number | null>(null);

  const blueprints = isEn
    ? [
        {
          id: 'propagation',
          icon: <Scissors className="w-6 h-6 text-herbal-600 dark:text-herbal-400" />,
          title: 'Home Propagation & Nursery Cuttings',
          description: 'From a single mother Ming Aralia, Guava, or Rosemary tree, simple stem cutting techniques yield 30-50 vigorous organic starter pots monthly with negligible material costs in coco peat.',
          roi: 'Low capital → ~$80 - $120/month',
        },
        {
          id: 'syrup-tea',
          icon: <Coffee className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
          title: 'Artisanal Herbal Teas & Natural Syrups',
          description: 'Dehydrate clean perilla and lemongrass leaves for loose herbal tea, or brew organic cough syrup in sterilized glass bottles for community wellness.',
          roi: '60% - 75% Gross Margin',
        },
        {
          id: 'balcony-setup',
          icon: <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
          title: 'Turnkey "Balcony Pharmacy" Setup',
          description: 'Offer customized 3m² tiered balcony planter installations featuring 8 essential medicinal culinary herbs for urban apartment families with young children.',
          roi: '~$70 - $150 net profit per setup package',
        },
        {
          id: 'curated-affiliate',
          icon: <ShoppingBag className="w-6 h-6 text-terracotta-600 dark:text-terracotta-400" />,
          title: 'Curated Horticultural Affiliate Supply',
          description: 'Recommend tested potting mixes, specialized full-spectrum grow lights, and automated drip irrigation timers with 8% - 15% commissions without holding inventory.',
          roi: 'Passive revenue without inventory risk',
        },
      ]
    : [
        {
          id: 'propagation',
          icon: <Scissors className="w-6 h-6 text-herbal-600 dark:text-herbal-400" />,
          title: 'Nhân Giống & Chiết Cành Tại Gia',
          description: 'Từ 1 cây Đinh Lăng nếp hoặc 1 cây Ổi lê mẹ, kỹ thuật chiết cành - giâm cành tạo ra 30 - 50 bầu cây giống thuần hữu cơ mỗi tháng với chi phí chỉ vài nghìn đồng tiền bầu xơ dừa.',
          roi: 'Vốn 200k → Doanh thu 1.5 - 2.5 triệu/tháng',
        },
        {
          id: 'syrup-tea',
          icon: <Coffee className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
          title: 'Chế Biến Sâu Trà & Siro Thảo Dược',
          description: 'Tự sấy mộc trà tía tô sả chanh túi lọc hoặc nấu siro húng chanh - quất đường phèn mật ong đóng chai thủy tinh tiệt trùng bán cho bạn bè và cộng đồng xung quanh vào mùa giao mùa.',
          roi: 'Lợi nhuận gộp 60% - 75%',
        },
        {
          id: 'balcony-setup',
          icon: <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
          title: 'Dịch Vụ Setup "Tủ Thuốc Ban Công"',
          description: 'Nhận thiết kế kệ tầng ban công 3m² trọn gói gồm 8 loại thảo dược thiết yếu (húng chanh, tía tô, lá lốt, diếp cá...) cho các gia đình có con nhỏ ở căn hộ chung cư.',
          roi: '1.5 triệu - 3 triệu / gói setup',
        },
        {
          id: 'curated-affiliate',
          icon: <ShoppingBag className="w-6 h-6 text-terracotta-600 dark:text-terracotta-400" />,
          title: 'Tiếp Thị Liên Kết Vật Tư Chọn Lọc',
          description: 'Đánh giá đất trộn chuyên dụng, đèn quang hợp bổ sung nắng cho nhà phố và hệ thống tưới tự động hẹn giờ. Nhận hoa hồng 8% - 15% từ các nhà sản xuất uy tín.',
          roi: 'Thu nhập thụ động không cần ôm hàng',
        },
      ];

  const blueprintDetails: Record<number, BlueprintDetail> = isEn
    ? {
        0: {
          id: 'propagation',
          icon: <Scissors className="w-7 h-7 text-herbal-600" />,
          title: 'Home Propagation & Nursery Cuttings Blueprint',
          subtitle: 'Turn 1 mother plant into 50 rooted healthy seedlings monthly on a 2m² patio.',
          roi: 'Estimated ~$80 - $120 profit/month from 50 seedlings',
          starterBudget: '$15 - $25 (coco peat plugs, rooting hormone powder, grafting knife, nursery bags)',
          breakEvenTimeline: '21 to 30 days upon first cutting batch rooting',
          targetMarket: 'Urban balcony gardeners, condo neighbors, and local plant swap communities.',
          equipment: [
            'Sharp grafting pruning shears (sterilized with 70% alcohol)',
            'Organic Rooting hormone powder (IBA or Willow bark tea extract)',
            'Coco peat plugs / seedling cell trays with humidity dome',
            'Biodegradable non-woven nursery grow bags (10x12cm)',
          ],
          stepByStep: [
            {
              step: '1. Select & Condition Mother Plant',
              detail: 'Choose semi-hardwood stems from a vigorous, pest-free plant (e.g. Ming Aralia, Lemon Guava, Rosemary). Water well 12 hours before cutting.',
            },
            {
              step: '2. 45-Degree Beveled Cut',
              detail: 'Slice 10-15cm terminal cuttings at a 45° angle right below a leaf node. Strip bottom leaves to minimize transpiration.',
            },
            {
              step: '3. Root Hormone Application',
              detail: 'Dip the lower 2cm into rooting powder for 5 seconds, shake off excess, and insert into moist coco peat mix.',
            },
            {
              step: '4. Microclimate Incubation (14-21 Days)',
              detail: 'Place in filtered morning sunlight (under 50% shade netting). Maintain 75-80% humidity. Roots appear in 14 to 21 days.',
            },
            {
              step: '5. Hardening & Distribution',
              detail: 'Expose seedlings to direct sunlight gradually for 4 days before delivery. Package in kraft paper bags with plant care guides.',
            },
          ],
          keyRecipeOrTechnique: {
            label: 'Optimal Soil Mix Ratio for Cuttings',
            content: '50% washed coco coir + 30% burnt rice husk + 20% fine perlite. Never use fresh animal manure at the cutting stage to prevent basal rot.',
          },
          salesChannels: [
            'Direct swap & sale on Yeu Trong Cay community swap map',
            'Condo neighborhood resident groups (Zalo/Facebook)',
            'Weekend botanical pop-ups & coffee garden markets',
          ],
          expertTip: 'Always provide a 1-page botanical care index card with every plant sold. Customers return repeatedly when their seedlings thrive!',
        },
        1: {
          id: 'syrup-tea',
          icon: <Coffee className="w-7 h-7 text-amber-600" />,
          title: 'Artisanal Herbal Teas & Cough Syrup Blueprint',
          subtitle: 'Deep processing fresh garden harvest into shelf-stable wellness products.',
          roi: '65% - 75% gross margin ($4 - $6 profit per 200ml jar)',
          starterBudget: '$30 - $60 (glass jars, raw rock sugar, mini food dehydrator, kraft labels)',
          breakEvenTimeline: 'Within 2 production batches',
          targetMarket: 'Families with young children, elderly citizens, and clean-living urbanites.',
          equipment: [
            'Food-grade 200ml amber or flint glass jars with airtight lids',
            'Double boiler stainless steel steamer pot',
            'Mini dehydrator or stainless mesh dust-proof drying trays',
            'Sterilization tongs & digital kitchen thermometer',
          ],
          stepByStep: [
            {
              step: '1. Dawn Harvest',
              detail: 'Harvest Indian Borage (hung chanh) and Perilla leaves right before sunrise when essential oil concentrations peak.',
            },
            {
              step: '2. Thorough Botanical Wash',
              detail: 'Rinse twice in dilute salt water (0.9%), drain completely for 30 minutes to prevent moisture contamination.',
            },
            {
              step: '3. Slow Double-Boil Steaming',
              detail: 'Steam Indian borage, calamondin fruit, cane rock sugar, and fresh ginger on low simmer for 75-90 minutes until thick and amber.',
            },
            {
              step: '4. Hot Fill & Vacuum Seal',
              detail: 'Pour syrup into pre-sterilized dry glass jars while still warm (70°C). Cap immediately to create a natural vacuum seal.',
            },
          ],
          keyRecipeOrTechnique: {
            label: 'Gold Standard Herbal Syrup Ratio',
            content: '500g fresh Indian Borage + 500g deseeded Calamondin + 500g crystalline cane rock sugar + 50g ginger slices + 100ml pure forest honey (stirred in after cooling to 45°C).',
          },
          salesChannels: [
            'Parent-teacher associations & preschool mother networks',
            'Organic grocers & zero-waste lifestyle shops',
            'Direct order via botanical personal brand',
          ],
          expertTip: 'Never boil honey at high heat. Always blend pure honey after the syrup cools to under 45°C to preserve live enzymes and antimicrobial polyphenols.',
        },
        2: {
          id: 'balcony-setup',
          icon: <Home className="w-7 h-7 text-blue-600" />,
          title: 'Turnkey "Balcony Pharmacy" Installation Service',
          subtitle: 'Design, install, and plant compact 3m² medicinal gardens for urban apartments.',
          roi: '~$70 - $150 net profit per completed installation',
          starterBudget: '$50 - $100 for sample portfolio kit & measuring equipment',
          breakEvenTimeline: 'Profitable from the very first client order',
          targetMarket: 'Busy urban condo owners who want fresh herbs but lack time and green thumb.',
          equipment: [
            'Tiered rust-proof powder-coated iron or treated pine planter shelves',
            'Self-watering UV-stabilized polypropylene rectangular planters',
            'Micro-drip irrigation kit with digital programmable faucet timer',
            'Laser measure, cordless drill, and safety anchor fasteners',
          ],
          stepByStep: [
            {
              step: '1. Sunlight & Wind Survey',
              detail: 'Analyze balcony orientation (East/West/South/North), daily direct sun hours, and wind exposure to choose suited plant species.',
            },
            {
              step: '2. Modular Planter Fabrication',
              detail: 'Assemble vertical tiered stands to maximize vertical space without obstructing safety railings or balcony drainage.',
            },
            {
              step: '3. Custom Soil Blending',
              detail: 'Layer drainage expanded clay pebbles at bottom, fill with light loam + earthworm castings + perlite for long-term root aeration.',
            },
            {
              step: '4. Planting 8 Essential Herbs',
              detail: 'Arrange sun-loving plants (Lemongrass, Guava, Rosemary) on top; shade-tolerant herbs (Lalot, Fish Mint) on bottom tiers.',
            },
            {
              step: '5. Automated Drip & Care Handover',
              detail: 'Program automatic drip timer (twice daily 3 minutes). Hand over laminated care guide and 30-day warranty.',
            },
          ],
          keyRecipeOrTechnique: {
            label: 'Standard 8-Herb Medical Kit Formula',
            content: 'Indian Borage (cough), Perilla (fever/cold), Fish Mint (digestive/cooling), Betel/Lalot (joint aches), Mugwort (blood flow/headache), Aloe Vera (burns/skin), Lemongrass (mosquito repellant), and Ming Aralia (energy booster).',
          },
          salesChannels: [
            'Condo resident Facebook groups & building board noticeboards',
            'Interior design and home decoration partnerships',
            'Word-of-mouth referrals from satisfied homeowner clients',
          ],
          expertTip: 'Offer a recurring $15/month maintenance checkup (pruning, organic foliar spray, seasonal top-dressing) to generate recurring service revenue.',
        },
        3: {
          id: 'curated-affiliate',
          icon: <ShoppingBag className="w-7 h-7 text-terracotta-600" />,
          title: 'Curated Horticultural Affiliate Supply Blueprint',
          subtitle: 'Monetize garden knowledge without inventory risk through verified product reviews.',
          roi: '8% - 15% recurring commissions, 0 capital locked in inventory',
          starterBudget: '$0 (leverage existing smartphone and garden setup)',
          breakEvenTimeline: 'Immediate upon first reader purchase',
          targetMarket: 'Beginner urban gardeners searching for trustworthy equipment that actually works.',
          equipment: [
            'Smartphone with decent camera for genuine unboxing and growth proofs',
            'Registered affiliate partner account (Shopee, Lazada, or direct manufacturers)',
            'Personal garden journal log or blog/social presence',
          ],
          stepByStep: [
            {
              step: '1. Test Products Yourself First',
              detail: 'Never recommend unverified items. Test grow lights, pruning shears, soil brands for at least 30 days before endorsing.',
            },
            {
              step: '2. High-Intent Review Articles',
              detail: 'Create problem-solving content: "How to fix leggy seedlings with 45W full-spectrum LED" or "Comparison of 3 top worm casting soils".',
            },
            {
              step: '3. Transparent Disclosures',
              detail: 'Add honest affiliate disclaimers to build long-term trust. Highlight both pros and minor cons of each tool.',
            },
            {
              step: '4. Integrate with AI Diagnostic Clinic',
              detail: 'When diagnosing mealybugs or root rot in Yeu Trong Cay clinic, provide direct affiliate links to organic neem oil and Trichoderma fungi.',
            },
          ],
          keyRecipeOrTechnique: {
            label: 'High-Converting Botanical Products',
            content: '1) Full Spectrum LED Grow Bars (12-15% comm); 2) Solar-powered automated drip irrigation timers (10-14% comm); 3) High-carbon SK5 pruning shears (15-20% comm); 4) Ready-to-use organic potting soil bags (8-10% comm).',
          },
          salesChannels: [
            'Direct links in Yeu Trong Cay plant diagnostic reports',
            'Garden guides and video demonstrations',
            'Dedicated balcony gardener community groups',
          ],
          expertTip: 'Focus on retention and authenticity: honest negative feedback on low-quality products builds immense credibility that makes positive reviews 5x more effective.',
        },
      }
    : {
        0: {
          id: 'propagation',
          icon: <Scissors className="w-7 h-7 text-herbal-600" />,
          title: 'Kế Hoạch Nhân Giống & Chiết Cành Tại Gia',
          subtitle: 'Biến 1 cây mẹ khỏe mạnh thành 50 bầu cây giống thuần hữu cơ mỗi tháng chỉ với 2m² ban công.',
          roi: 'Thu nhập ròng 1.5 - 2.5 triệu/tháng từ 50 bầu cây con',
          starterBudget: '200.000đ - 350.000đ (Bao xơ dừa, thuốc kích rễ N3M, dao chiết cành, 100 túi ươm tự tiêu)',
          breakEvenTimeline: '21 đến 30 ngày ngay sau lứa cành giâm đầu tiên ra rễ trắng',
          targetMarket: 'Cư dân chung cư yêu cây, hội yêu hoa ban công, thành viên Trạm Đổi Cây YeuTrongCay.',
          equipment: [
            'Kéo cắt tỉa & dao chiết cành sắc bén (khử trùng cồn 70 độ)',
            'Thuốc kích rễ sinh học hữu cơ (N3M hoặc nước ngâm cành liễu)',
            'Giá thể xơ dừa xử lý sạch chát + trấu hun nguyên hạt',
            'Túi ươm cây sinh học tự tiêu 10x12cm hoặc khay ươm lỗ có nắp đậy',
          ],
          stepByStep: [
            {
              step: '1. Tuyển chọn & Bồi dưỡng cây mẹ',
              detail: 'Chọn cành bánh tẻ (không quá non, không quá già) từ cây mẹ Đinh Lăng nếp, Ổi Đài Loan, Hương Thảo Rosemary khỏe mạnh. Tưới đủ ẩm trước khi cắt 12 tiếng.',
            },
            {
              step: '2. Vết cắt vát 45 độ sát nách lá',
              detail: 'Dùng dao sắc cắt dứt khoát góc 45 độ ngay dưới đốt mắt lá 0.5cm. Vặt bớt 2/3 lá dưới để giảm tối đa thoát hơi nước.',
            },
            {
              step: '3. Nhúng dung dịch kích rễ sinh học',
              detail: 'Nhúng phần gốc cành vào dung dịch kích rễ trong 3 - 5 giây, để ráo 5 phút trước khi cắm vào bầu ươm ẩm.',
            },
            {
              step: '4. Ấp dưỡng vi khí hậu (14 - 21 ngày)',
              detail: 'Đặt bầu ươm dưới lưới lan che nắng 50%, duy trì độ ẩm giá thể 70-80%. Tránh gió lùa mạnh. Sau 14-21 ngày rễ non tơ đâm trắng quanh bầu.',
            },
            {
              step: '5. Tập nắng & Xuất vườn giao khách',
              detail: 'Cho cây con tập tiếp xúc nắng sáng trực tiếp 3-4 ngày trước khi đóng gói túi giấy kraft giao cho người mua.',
            },
          ],
          keyRecipeOrTechnique: {
            label: 'Tỷ lệ phối trộn giá thể giâm cành bách phát bách trúng',
            content: '50% mụn dừa đã xả chát + 30% trấu hun khử khuẩn + 20% đá perlite thoáng khí. Tuyệt đối không bón phân hóa học hay phân chuồng tươi ở giai đoạn này để tránh thối rễ.',
          },
          salesChannels: [
            'Đăng tin trực tiếp trên Trạm Đổi Cây yeutrongcay.com',
            'Các hội nhóm cư dân chung cư tại nơi bạn sinh sống (Zalo/Facebook)',
            'Chợ phiên nông sản xanh cuối tuần & giao lưu bạn bè yêu làm vườn',
          ],
          expertTip: 'Tặng kèm 1 thẻ cứng ghi hướng dẫn chăm sóc khi giao cây. Khách hàng thấy cây sống khỏe sẽ quay lại đặt thêm nhiều loại cây khác!',
        },
        1: {
          id: 'syrup-tea',
          icon: <Coffee className="w-7 h-7 text-amber-600" />,
          title: 'Kế Hoạch Sản Xuất Trà Thảo Mộc & Siro Ho Gia Đình',
          subtitle: 'Chế biến sâu thảo dược tươi từ vườn nhà thành các sản phẩm chăm sóc sức khỏe tự nhiên giá trị cao.',
          roi: 'Tỷ suất lợi nhuận gộp 65% - 75% (lãi 60.000đ - 90.000đ mỗi hũ 200ml)',
          starterBudget: '500.000đ - 1.200.000đ (Chai thủy tinh nắp thiếc, đường phèn mật mía, máy sấy mini hoặc khay phơi inox)',
          breakEvenTimeline: 'Thu hồi toàn bộ vốn sau 2 mẻ siro đầu tiên',
          targetMarket: 'Gia đình có con nhỏ, người lớn tuổi hay ho khan khi giao mùa, người chuộng lối sống thuận tự nhiên.',
          equipment: [
            'Hũ thủy tinh 200ml - 250ml nắp thiếc tiệt trùng luộc nước sôi',
            'Nồi chưng cách thủy inox đáy dày giữ nhiệt tốt',
            'Khay phơi inox chống bụi hoặc máy sấy lạnh mini 4 khay',
            'Kẹp gắp tiệt trùng và nhiệt kế nấu ăn chuyên dụng',
          ],
          stepByStep: [
            {
              step: '1. Thu hoạch đúng giờ vàng',
              detail: 'Hái lá húng chanh, lá tía tô, lá sả vào sáng sớm từ 5h30 - 7h00 khi tinh dầu trong tuyến lá đạt hàm lượng cô đọng nhất.',
            },
            {
              step: '2. Ngâm rửa muối & ráo nước tuyệt đối',
              detail: 'Rửa sạch 2 lần nước, ngâm nước muối loãng 0.9% trong 15 phút, để ráo nước hoàn toàn để siro thành phẩm không bị lên men thiu.',
            },
            {
              step: '3. Chưng cách thủy lửa liu riu (75 - 90 phút)',
              detail: 'Xếp xen kẽ húng chanh, quất thái đôi bỏ hạt, đường phèn mật mía và gừng tươi thái lát. Chưng lửa nhỏ đến khi hỗn hợp sánh vàng óng ánh.',
            },
            {
              step: '4. Chiết rót nóng & Hút chân không tự nhiên',
              detail: 'Rót siro vào hũ thủy tinh đã tiệt trùng khi còn nóng khoảng 70°C. Đậy chặt nắp ngay để tạo lực hút chân không tự nhiên giúp bảo quản 6 tháng.',
            },
          ],
          keyRecipeOrTechnique: {
            label: 'Công thức Siro Húng Chanh Quất Đường Phèn Chuẩn Dược',
            content: '500g húng chanh tươi + 500g quất xanh bỏ hạt + 500g đường phèn kết tinh mật mía + 50g gừng ta thái sợi mỏng + 100ml mật ong rừng nguyên chất (chỉ khuấy đều sau khi siro nguội xuống dưới 45°C để không làm biến chất mật ong).',
          },
          salesChannels: [
            'Hội phụ huynh trường mầm non / tiểu học của con',
            'Cửa hàng thực phẩm sạch, tiệm tạp hóa xanh hữu cơ trong khu đô thị',
            'Trang cá nhân chia sẻ video quá trình tự tay thu hoạch và chưng cất',
          ],
          expertTip: 'Đừng nấu mật ong trên lửa sôi vì nhiệt độ cao phá hủy enzym quý. Luôn để siro nguội bớt rồi mới cho mật ong vào đảo đều.',
        },
        2: {
          id: 'balcony-setup',
          icon: <Home className="w-7 h-7 text-blue-600" />,
          title: 'Kế Hoạch Dịch Vụ Setup "Tủ Thuốc Ban Công" Trọn Gói',
          subtitle: 'Thiết kế, thi công giàn treo và trồng sẵn 8 cây thảo dược thiết yếu cho căn hộ chung cư đô thị.',
          roi: '1.000.000đ - 1.800.000đ lợi nhuận ròng trên mỗi hợp đồng hoàn thiện',
          starterBudget: '800.000đ - 1.500.000đ chi phí mẫu thử và dụng cụ thi công cơ bản',
          breakEvenTimeline: 'Có lãi ròng ngay từ hợp đồng đầu tiên',
          targetMarket: 'Cư dân sống ở chung cư, nhân viên văn phòng có con nhỏ muốn có rau gia vị & thảo dược tươi tại chỗ.',
          equipment: [
            'Kệ sắt sơn tĩnh điện 3 tầng chịu lực 80kg hoặc giàn móc treo ban công an toàn',
            'Chậu nhựa thông minh composite có lưới tự dưỡng chống ngập úng đáy',
            'Bộ hẹn giờ tưới nhỏ giọt tự động van điện từ chạy pin hoặc năng lượng mặt trời',
            'Thước đo laser, máy khoan bê tông cầm tay và dây rút an toàn',
          ],
          stepByStep: [
            {
              step: '1. Khảo sát hướng nắng & gió ban công',
              detail: 'Xác định ban công hướng Đông, Tây, Nam hay Bắc để tính toán giờ nắng trực tiếp và bố trí cây ưa nắng / chịu râm chuẩn xác.',
            },
            {
              step: '2. Lắp dựng giàn kệ tối ưu diện tích',
              detail: 'Bố trí kệ tầng ôm sát lan can hoặc tường hông, tuyệt đối không cản trở lối thoát hiểm và lỗ thoát nước sàn ban công.',
            },
            {
              step: '3. Phối trộn đất tơi xốp bền vững',
              detail: 'Lót viên đất nung ở đáy, đổ đất trộn thịt phù sa + phân trùn quế + perlite + Trichoderma để cây sống nhiều năm không bị chai đất.',
            },
            {
              step: '4. Trồng bộ 8 thảo dược chuẩn viện',
              detail: 'Bố trí tầng trên: Sả chanh, Ổi sim, Hương thảo; tầng giữa: Húng chanh, Tía tô, Ngải cứu; tầng dưới râm: Diếp cá, Lá lốt.',
            },
            {
              step: '5. Cài đặt tưới tự động & Bàn giao',
              detail: 'Cài đặt hẹn giờ tưới sáng 6h (3 phút) và chiều 17h (3 phút). Bàn giao bảng mica hướng dẫn trị ho, cảm sốt ngay tại chậu.',
            },
          ],
          keyRecipeOrTechnique: {
            label: 'Combo Bộ 8 Cây Cứu Tinh Ban Công Gia Đình',
            content: '1. Húng Chanh (kháng sinh hô hấp); 2. Tía Tô (giải cảm, hạ sốt); 3. Diếp Cá (thanh nhiệt, tiêu trĩ); 4. Lá Lốt (giảm đau xương khớp); 5. Ngải Cứu (hoạt huyết, an thần); 6. Nha Đam (bỏng nhiệt, làm dịu da); 7. Sả Chanh (tinh dầu xua muỗi); 8. Đinh Lăng nếp (bồi bổ thể lực, an giấc).',
          },
          salesChannels: [
            'Nhóm cư dân các tòa chung cư trong bán kính 5km',
            'Hợp tác cùng các kiến trúc sư nội thất & đơn vị hoàn thiện căn hộ',
            'Giới thiệu truyền miệng từ các khách hàng đã setup thành công',
          ],
          expertTip: 'Cung cấp thêm gói bảo dưỡng định kỳ 200.000đ/tháng (cắt tỉa, xịt dầu neem ngừa sâu, bổ sung phân trùn quế) để có thu nhập thụ động ổn định.',
        },
        3: {
          id: 'curated-affiliate',
          icon: <ShoppingBag className="w-7 h-7 text-terracotta-600" />,
          title: 'Kế Hoạch Tiếp Thị Liên Kết Vật Tư Làm Vườn Chọn Lọc',
          subtitle: 'Kiếm tiền từ tri thức và trải nghiệm làm vườn thực tế mà không cần ôm vốn nhập hàng hóa.',
          roi: 'Hoa hồng 8% - 15% từ nhà sản xuất, rủi ro tồn kho bằng 0',
          starterBudget: '0 VNĐ (sử dụng chiếc điện thoại và góc ban công hiện có)',
          breakEvenTimeline: 'Có doanh thu ngay khi có độc giả đầu tiên đặt mua qua link giới thiệu',
          targetMarket: 'Người mới tập làm vườn đang phân vân không biết mua đất nào, đèn quang hợp nào, kéo nào bền.',
          equipment: [
            'Điện thoại thông minh chụp ảnh/quay video thật quá trình cây lớn',
            'Tài khoản đối tác tiếp thị liên kết từ các sàn thương mại hoặc xưởng vật tư',
            'Trang blog cá nhân hoặc đóng góp chia sẻ trên cộng đồng Yêu Trồng Cây',
          ],
          stepByStep: [
            {
              step: '1. Trải nghiệm thực tế trước khi giới thiệu',
              detail: 'Tuyệt đối chỉ giới thiệu những dòng vật tư bạn đã trực tiếp dùng trên 1 tháng (đất trộn sẵn, đèn LED quang hợp, phân trùn quế).',
            },
            {
              step: '2. Viết bài giải quyết nỗi đau cụ thể',
              detail: 'Tập trung vào các chủ đề cấp thiết: "Ban công hướng Bắc thiếu nắng thì dùng đèn quang hợp nào tốt?", "Cách chọn kéo cắt tỉa cành không làm giập thân cây".',
            },
            {
              step: '3. Minh bạch đánh giá ưu - nhược điểm',
              detail: 'Đưa ra nhận xét khách quan cả điểm mạnh lẫn điểm cần lưu ý để người đọc tin tưởng 100% vào sự trung thực của bạn.',
            },
            {
              step: '4. Kết nối cùng Hội Quán Bác Sĩ Cây AI',
              detail: 'Khi trả lời ca bệnh vàng lá, rệp sáp cho cộng đồng, gắn kèm link gợi ý chế phẩm sinh học Dầu Neem nguyên chất hoặc Nấm đối kháng Trichoderma.',
            },
          ],
          keyRecipeOrTechnique: {
            label: 'Danh mục sản phẩm hoa hồng cao & chuyển đổi tốt',
            content: '1) Đèn LED quang hợp dải sóng Full Spectrum cho căn hộ (Hoa hồng 12% - 15%); 2) Bộ hẹn giờ tưới nhỏ giọt thông minh (Hoa hồng 10% - 14%); 3) Kéo cắt cành thép SK5 chống mòn (Hoa hồng 15% - 20%); 4) Bao đất hữu cơ vi sinh 10kg giao tận cửa (Hoa hồng 8% - 10%).',
          },
          salesChannels: [
            'Gắn link giải pháp trong các câu trả lời Bác Sĩ Cây Trồng YeuTrongCay',
            'Các bài cẩm nang hướng dẫn mẹo vặt trị sâu bệnh hữu cơ',
            'Cộng đồng trao đổi cây cảnh và ban công xanh',
          ],
          expertTip: 'Uy tín là tài sản lớn nhất. Chỉ cần 1 lần giới thiệu hàng kém chất lượng bạn sẽ mất toàn bộ người theo dõi. Luôn đặt chất lượng của cây trồng lên hàng đầu.',
        },
      };

  const activeDetail = selectedBlueprintIndex !== null ? blueprintDetails[selectedBlueprintIndex] : null;

  return (
    <section id="monetization" className="py-16 bg-cream-100 dark:bg-charcoal-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-50 dark:bg-terracotta-950/60 text-terracotta-700 dark:text-terracotta-300 text-xs font-semibold mb-3 border border-terracotta-200 dark:border-terracotta-800">
            <Coins className="w-3.5 h-3.5" />
            <span>{isEn ? 'Turn Botanical Passion into Sustainable Revenue' : 'Biến Đam Mê Thành Thu Nhập Bền Vững'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-900 dark:text-cream-50 tracking-tight mb-3">
            {isEn ? 'Home Garden Monetization Roadmap' : 'Bản Đồ Kiếm Tiền Từ Vườn Nhà'}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800 dark:text-forest-200 font-sans">
            {isEn
              ? 'No large farm required—generate steady supplemental monthly income from your compact apartment balcony or rooftop patio. Click any card to read the complete actionable blueprint.'
              : 'Không cần đất ruộng rộng lớn, bạn hoàn toàn có thể tạo ra thu nhập thực tế hàng tháng chỉ từ góc ban công hoặc sân thượng nhỏ. Bấm vào từng mô hình để xem trọn bộ kế hoạch chi tiết.'}
          </p>
        </div>

        {/* 4 Blueprints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprints.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedBlueprintIndex(index)}
              className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 hover:border-terracotta-400 dark:hover:border-terracotta-500 shadow-sm hover:shadow-xl transition flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cream-100 dark:bg-charcoal-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-forest-900 dark:text-cream-50 mb-2 group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-800/85 dark:text-forest-200/85 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-forest-50 dark:border-forest-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-herbal-700 dark:text-herbal-300 bg-herbal-50 dark:bg-herbal-950/60 px-3 py-1 rounded-full border border-herbal-100 dark:border-herbal-900">
                  {item.roi}
                </span>
                <span className="text-xs font-medium text-forest-700 dark:text-forest-300 flex items-center gap-1 group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 font-semibold transition-colors">
                  {isEn ? 'View Complete Plan' : 'Xem chi tiết kế hoạch'} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Detail Modal */}
      {activeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-forest-100 dark:border-forest-800 shadow-2xl animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-forest-100 dark:border-forest-800 flex items-center justify-between bg-cream-50 dark:bg-charcoal-800/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-charcoal-700 flex items-center justify-center shadow-sm">
                  {activeDetail.icon}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-forest-900 dark:text-cream-50">
                    {activeDetail.title}
                  </h3>
                  <p className="text-xs text-charcoal-700 dark:text-forest-300">
                    {activeDetail.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBlueprintIndex(null)}
                className="p-2 rounded-full hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-700 dark:text-forest-300 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-charcoal-800 dark:text-cream-100">
              
              {/* Financial Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-herbal-50 dark:bg-herbal-950/50 p-4 rounded-2xl border border-herbal-200 dark:border-herbal-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-herbal-800 dark:text-herbal-300 uppercase mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Profit Expectation' : 'Lợi Nhuận Kỳ Vọng'}</span>
                  </div>
                  <p className="font-serif font-bold text-sm text-herbal-950 dark:text-herbal-100">
                    {activeDetail.roi}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/50 p-4 rounded-2xl border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Starter Capital' : 'Vốn Khởi Điểm'}</span>
                  </div>
                  <p className="font-semibold text-xs sm:text-sm text-amber-950 dark:text-amber-100">
                    {activeDetail.starterBudget}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-2xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800 dark:text-blue-300 uppercase mb-1">
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Breakeven Timeline' : 'Thời Gian Hoàn Vốn'}</span>
                  </div>
                  <p className="font-semibold text-xs sm:text-sm text-blue-950 dark:text-blue-100">
                    {activeDetail.breakEvenTimeline}
                  </p>
                </div>
              </div>

              {/* Equipment & Tools Needed */}
              <div>
                <h4 className="font-serif font-bold text-base text-forest-900 dark:text-cream-50 mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-herbal-600 dark:text-herbal-400" />
                  <span>{isEn ? 'Required Tools & Materials' : 'Vật Tư & Thiết Bị Cần Chuẩn Bị'}</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeDetail.equipment.map((eq, i) => (
                    <div key={i} className="flex items-start gap-2 bg-cream-50 dark:bg-charcoal-800 p-2.5 rounded-xl border border-forest-50 dark:border-forest-800">
                      <CheckCircle2 className="w-4 h-4 text-herbal-600 dark:text-herbal-400 shrink-0 mt-0.5" />
                      <span className="text-xs">{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Implementation */}
              <div>
                <h4 className="font-serif font-bold text-base text-forest-900 dark:text-cream-50 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-terracotta-600 dark:text-terracotta-400" />
                  <span>{isEn ? 'Step-by-Step Execution Roadmap' : 'Quy Trình Triển Khai Chi Tiết'}</span>
                </h4>
                <div className="space-y-3">
                  {activeDetail.stepByStep.map((s, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-forest-50/50 dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800">
                      <p className="font-bold text-forest-900 dark:text-cream-50 mb-1">{s.step}</p>
                      <p className="text-xs text-charcoal-700 dark:text-forest-200 leading-relaxed">{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Practical Formula / Technique */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <p className="font-bold text-amber-900 dark:text-amber-200 mb-1 text-xs uppercase tracking-wider">
                  ★ {activeDetail.keyRecipeOrTechnique.label}
                </p>
                <p className="text-xs text-amber-950 dark:text-amber-100 leading-relaxed">
                  {activeDetail.keyRecipeOrTechnique.content}
                </p>
              </div>

              {/* Sales Channels & Expert Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-cream-50 dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800">
                  <p className="font-bold text-forest-900 dark:text-cream-50 mb-2 text-xs uppercase tracking-wider">
                    {isEn ? 'Distribution Channels' : 'Kênh Tiêu Thụ Thực Tế'}
                  </p>
                  <ul className="space-y-1.5 text-xs text-charcoal-700 dark:text-forest-200">
                    {activeDetail.salesChannels.map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-herbal-500 shrink-0"></span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-forest-900 text-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-herbal-300 uppercase mb-2">
                      <ShieldCheck className="w-4 h-4 text-herbal-400" />
                      <span>{isEn ? 'Expert Practical Tip' : 'Lời Khuyên Sinh Tồn'}</span>
                    </div>
                    <p className="text-xs text-forest-100 leading-relaxed">
                      {activeDetail.expertTip}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-forest-100 dark:border-forest-800 bg-cream-50 dark:bg-charcoal-800 flex justify-end">
              <button
                onClick={() => setSelectedBlueprintIndex(null)}
                className="px-6 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold transition shadow-sm"
              >
                {isEn ? 'Close Guide' : 'Đóng Hướng Dẫn'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
