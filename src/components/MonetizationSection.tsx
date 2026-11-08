import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Coins,
  Scissors,
  Coffee,
  Home,
  ArrowRight,
  X,
  TrendingUp,
  DollarSign,
  Sparkles,
  Recycle,
  Wheat,
  Cpu,
  Layers,
  FlaskConical,
  Sprout,
  Hammer
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { MicroFarmingRoiCalculator } from './MicroFarmingRoiCalculator.tsx';
import { MONETIZATION_CATEGORIES } from '../data/monetization/categories.ts';

const getCategoryIcon = (iconName: string, className: string = 'w-6 h-6') => {
  switch (iconName) {
    case 'Sprout':
      return <Sprout className={className} />;
    case 'FlaskConical':
      return <FlaskConical className={className} />;
    case 'Hammer':
      return <Hammer className={className} />;
    case 'Recycle':
      return <Recycle className={className} />;
    case 'Wheat':
      return <Wheat className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    default:
      return <Layers className={className} />;
  }
};

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
  categoryLink: string;
}

export const MonetizationSection: React.FC = () => {
  const { isEn } = useLanguage();
  const [selectedBlueprintIndex, setSelectedBlueprintIndex] = useState<number | null>(null);

  const blueprints = isEn
    ? [
        {
          id: 'propagation',
          icon: <Scissors className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
          title: 'Urban Micro-Nursery & Plant Propagation',
          description: 'From a single mother Ming Aralia, Guava, or Rosemary tree, sterile stem cutting techniques yield 50 vigorous organic starter plugs monthly on 2sqm.',
          roi: 'Low capital → ~$80 - $120/month',
          categorySlug: 'vuon-uom-nhan-giong'
        },
        {
          id: 'syrup-tea',
          icon: <Coffee className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
          title: 'Artisanal Herbal Apothecary & Syrups',
          description: 'Standardize 63° Brix cough syrups, solar-dried perilla tea bags, and botanical bath soaks with high pharmacological retention and no preservatives.',
          roi: '60% - 75% Gross Margin',
          categorySlug: 'che-bien-sau-duoc-lieu'
        },
        {
          id: 'balcony-setup',
          icon: <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
          title: 'Turnkey Balcony Apothecary Consulting',
          description: 'Design and install 3-tier living ecosystems compliant with high-rise floor loads (<150kg/sqm) and gravity-fed drip watering.',
          roi: '~$70 - $150 net profit per setup package',
          categorySlug: 'dich-vu-setup-ban-cong'
        },
        {
          id: 'circular-compost',
          icon: <Recycle className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
          title: 'Circular Vermiculture & Zero-Waste Composting',
          description: 'Close household nutrient loops: transform 100% kitchen bio-waste into living humic-rich worm castings and probiotic microbe tea.',
          roi: '100% Free Organic Fertilizer + ~$40/month',
          categorySlug: 'kinh-te-tuan-hoan'
        },
        {
          id: 'microgreens-speed',
          icon: <Wheat className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
          title: 'High-Yield Microgreens & Gourmet Mushroom Rack',
          description: '7-day rolling turnaround: 50x concentrated sulforaphane broccoli microgreens and balcony oyster mushroom flushes for local families.',
          roi: '65% Net Margin (Fast 7-Day Cycle)',
          categorySlug: 'canh-tac-sieu-toc'
        },
        {
          id: 'smart-agri-iot',
          icon: <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
          title: 'Digital Balcony & ESP32 IoT Automation',
          description: 'Solar-powered autonomous capacitive soil moisture sensing and AI Plant Doctor diagnostics under $25 budget.',
          roi: 'Zero Plant Mortality & Scalable Automation',
          categorySlug: 'nong-nghiep-thong-minh'
        }
      ]
    : [
        {
          id: 'propagation',
          icon: <Scissors className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
          title: 'Vườn Ươm & Nhân Giống Vô Tính F1',
          description: 'Từ 1 cây Đinh Lăng nếp hoặc Ổi Đài Loan mẹ, kỹ thuật giâm cành 4D tạo ra 50-60 bầu giống khỏe mạnh mỗi tháng trên diện tích 2m² ban công.',
          roi: 'Vốn 200k → Doanh thu 1.5 - 2.5 triệu/tháng',
          categorySlug: 'vuon-uom-nhan-giong'
        },
        {
          id: 'syrup-tea',
          icon: <Coffee className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
          title: 'Chế Biến Sâu & Dược Liệu Thủ Công',
          description: 'Chuẩn hóa siro ho húng chanh quất độ ngọt Brix 63°, trà túi lọc tía tô sấy mộc và muối khoáng ngâm chân không chất bảo quản.',
          roi: 'Lợi nhuận gộp 60% - 75%',
          categorySlug: 'che-bien-sau-duoc-lieu'
        },
        {
          id: 'balcony-setup',
          icon: <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
          title: 'Dịch Vụ Thiết Kế & Thi Công Vườn Ban Công',
          description: 'Thiết kế hệ sinh thái ban công 3 tầng: tính toán tải trọng an toàn <150kg/m², tối ưu hướng nắng và hệ thống tưới tự chảy không bơm.',
          roi: '1.5 triệu - 3 triệu / gói setup',
          categorySlug: 'dich-vu-setup-ban-cong'
        },
        {
          id: 'circular-compost',
          icon: <Recycle className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
          title: 'Kinh Tế Tuần Hoàn & Tái Chế Sinh Thái',
          description: 'Khép kín vòng rác nhà bếp: nuôi trùn quế căn hộ không mùi, ủ men Bokashi và làm than sinh học Biochar cố định carbon.',
          roi: 'Tự chủ 100% phân bón + Bán phân trùn',
          categorySlug: 'kinh-te-tuan-hoan'
        },
        {
          id: 'microgreens-speed',
          icon: <Wheat className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
          title: 'Canh Tác Vi Mô & Siêu Thực Phẩm 7 Ngày',
          description: 'Vòng quay vốn siêu tốc: trồng mầm súp lơ xanh giàu sulforaphane và treo 20 bịch nấm sò, phục vụ cư dân bán kính 2km.',
          roi: 'Lợi nhuận ròng 65% (Thu tiền hàng tuần)',
          categorySlug: 'canh-tac-sieu-toc'
        },
        {
          id: 'smart-agri-iot',
          icon: <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
          title: 'Nông Nghiệp Thông Minh & Tự Động Hóa IoT',
          description: 'Ban công số: Tự ráp cảm biến độ ẩm đất dung kháng ESP32, pin mặt trời tự hành và kết nối Bác Sĩ Cây AI chi phí dưới 500k.',
          roi: 'Cây không bao giờ chết khát khi vắng nhà',
          categorySlug: 'nong-nghiep-thong-minh'
        }
      ];

  const blueprintDetails: Record<number, BlueprintDetail> = isEn
    ? {
        0: {
          id: 'propagation',
          icon: <Scissors className="w-7 h-7 text-emerald-600" />,
          title: 'Home Micro-Nursery & Plant Propagation Blueprint',
          subtitle: 'Turn 1 mother plant into 50-60 rooted healthy seedlings monthly on a 2m² patio.',
          roi: 'Estimated ~$80 - $120 profit/month from 50 seedlings',
          starterBudget: '$15 - $25 (coco peat plugs, perlite, pruning snips, nursery trays)',
          breakEvenTimeline: '21 to 30 days upon first cutting batch rooting',
          targetMarket: 'Urban balcony gardeners, condo neighbors, and local plant swap communities.',
          equipment: [
            'Sharp fine-point pruning shears (sterilized with 70% alcohol)',
            'Standardized 4D Substrate (Washed coir, Perlite, Pumice, Biochar)',
            '50-cell seedling plug trays with transparent humidity dome',
            'Biodegradable non-woven nursery grow bags'
          ],
          stepByStep: [
            { step: '1. Select & Condition Mother Plant', detail: 'Choose semi-hardwood shoots early in morning. Water mother bush well 12h prior.' },
            { step: '2. 45-Degree Beveled Cut', detail: 'Slice with razor at 45° angle 3mm below a node. Strip 70% lower foliage.' },
            { step: '3. Sterile 4D Substrate Insertion', detail: 'Insert into balanced aeration substrate (EC < 0.8, Porosity > 25%).' },
            { step: '4. Microclimate Incubation (14-21 Days)', detail: 'Maintain 85% humidity dome for 5 days. Roots colonize plugs by Day 14.' }
          ],
          keyRecipeOrTechnique: {
            label: 'Gold Standard 4D Cutting Substrate Ratio',
            content: '40% Washed Coco Coir (EC < 0.4) + 30% Perlite + 20% Pumice + 10% Rice Husk Biochar.'
          },
          salesChannels: ['YeuTrongCay Plant Swap hub (/trao-doi-cay)', 'Apartment building community chat groups', 'Direct neighbor distribution'],
          expertTip: 'Provide an A5 botanical care index card with every plant sold. Customers return repeatedly when saplings thrive!',
          categoryLink: '/vuon-uom-nhan-giong'
        },
        1: {
          id: 'syrup-tea',
          icon: <Coffee className="w-7 h-7 text-amber-600" />,
          title: 'Artisanal Herbal Apothecary & Cough Syrup Blueprint',
          subtitle: 'Deep processing fresh garden harvest into shelf-stable wellness products.',
          roi: '65% - 75% gross margin ($4 - $6 profit per 200ml jar)',
          starterBudget: '$30 - $60 (amber glass bottles, rock sugar, kitchen scale, digital probe)',
          breakEvenTimeline: 'Within 2 production batches',
          targetMarket: 'Families with young children, elderly citizens, and clean-living urbanites.',
          equipment: [
            'Food-grade 200ml amber glass jars with airtight seal lids',
            'Double boiler stainless steel steamer pot',
            'Handheld 0-90° Brix optical refractometer',
            'Digital kitchen probe thermometer'
          ],
          stepByStep: [
            { step: '1. Dawn Harvest', detail: 'Harvest Cuban Oregano and Perilla right before sunrise for peak essential oil concentration.' },
            { step: '2. Dynamic Brix Calibration', detail: 'Weigh real leaf mass on scale; calculate exact rock sugar to target 63° Brix.' },
            { step: '3. Low-Temp Water Bath Simmer', detail: 'Simmer gently at 75-80°C for 60 mins under an inverted vapor reflux lid.' },
            { step: '4. Sub-45°C Honey Infusion', detail: 'Cool below 45°C before folding in raw forest honey to preserve therapeutic enzymes.' }
          ],
          keyRecipeOrTechnique: {
            label: 'The Golden 63° Brix Self-Preserving Ratio',
            content: '200g Fresh Oregano + 150g Deseeded Calamansi + 250g Unbleached Rock Sugar + 1 roasted ginger thumb + 50ml raw honey (<45°C).'
          },
          salesChannels: ['Apartment parent-teacher networks', 'Local organic food collectives', 'Personal artisanal brand'],
          expertTip: 'Never boil raw honey at high heat. Always blend honey after cooling to under 45°C to preserve live diastase enzymes.',
          categoryLink: '/che-bien-sau-duoc-lieu'
        },
        2: {
          id: 'balcony-setup',
          icon: <Home className="w-7 h-7 text-blue-600" />,
          title: 'Turnkey Balcony Apothecary Installation Service',
          subtitle: 'Design, install, and plant compact 3m² medicinal gardens for urban apartments.',
          roi: '~$70 - $150 net profit per completed installation',
          starterBudget: '$50 - $100 for sample portfolio kit & measuring equipment',
          breakEvenTimeline: 'Profitable from the very first client order',
          targetMarket: 'Busy urban condo owners who want fresh herbs but lack time and green thumb.',
          equipment: [
            'Tiered rust-proof powder-coated iron planter shelves',
            'Self-watering UV-stabilized polypropylene rectangular planters',
            'EPDM rubber vibration-dampening floor pads',
            'Ultra-lightweight Living Soil blend'
          ],
          stepByStep: [
            { step: '1. DLI Solar & Wind Survey', detail: 'Analyze compass azimuth, daily light integral (DLI), and high-rise wind exposure.' },
            { step: '2. Floor Load Verification', detail: 'Verify fully saturated soil weight remains under 120-150 kg/sqm.' },
            { step: '3. 3-Tier Canopy Layout', detail: 'Place sun-loving herbs on top, filtered-light herbs in middle, shade lovers at base.' },
            { step: '4. Gravity Drip & Handover', detail: 'Install gravity-fed drip watering with zero electrical hazards and 90-day warranty.' }
          ],
          keyRecipeOrTechnique: {
            label: '3-Year Living Soil Balcony Formula',
            content: '35% Washed Humus (Coir + Castings) + 35% Pumice/Perlite + 20% Biochar Rice Husks + 10% Mycorrhizal Rock Dust.'
          },
          salesChannels: ['Condo resident groups & building noticeboards', 'Interior design partnerships', 'Word-of-mouth client referrals'],
          expertTip: 'Offer a recurring seasonal maintenance subscription to generate dependable recurring service revenue.',
          categoryLink: '/dich-vu-setup-ban-cong'
        },
        3: {
          id: 'circular-compost',
          icon: <Recycle className="w-7 h-7 text-teal-600" />,
          title: 'Zero-Waste Indoor Vermiculture Blueprint',
          subtitle: 'Close household organic nutrient cycles with Eisenia fetida earthworms.',
          roi: '100% Fertilizer Autonomy + ~$40/month',
          starterBudget: '$20 - $35 (2-tier aerated bin, 2kg worm starter, insect mesh screen)',
          breakEvenTimeline: 'Within 30 days upon first casting harvest',
          targetMarket: 'Eco-conscious apartment dwellers, organic plant parents, and urban community gardens.',
          equipment: [
            '2-tier stackable vermicomposting bins with bottom drain spigot',
            'Fine 304 stainless insect mesh screen (prevents fruit flies)',
            '2kg active Eisenia fetida breeding biomass',
            'Unbleached corrugated cardboard bedding'
          ],
          stepByStep: [
            { step: '1. Assemble 2-Tier Bin', detail: 'Drill 3mm aeration holes in upper bin floor; mount spigot in lower sump bin.' },
            { step: '2. Install Carbon Bedding', detail: 'Layer 10cm damp shredded cardboard to absorb odor and balance C:N ratio.' },
            { step: '3. Pocket Feeding', detail: 'Bury kitchen scraps in rotating corners, always capped beneath damp carbon blanket.' },
            { step: '4. Light-Harvest Castings', detail: 'Mound castings under light; scrape off top crumbly layers as worms flee downward.' }
          ],
          keyRecipeOrTechnique: {
            label: 'Optimal 25-30:1 C:N Feedstock Ratio',
            content: 'For every 1 part moist kitchen scraps (Nitrogen), add 2 parts dry shredded cardboard or coco peat (Carbon).'
          },
          salesChannels: ['Apartment gardening neighbors', 'Local plant lovers', 'Direct use on own garden'],
          expertTip: 'Never feed oily meats, dairy, or hot chili scraps indoors. Keep moisture like a damp wrung-out sponge.',
          categoryLink: '/kinh-te-tuan-hoan'
        },
        4: {
          id: 'microgreens-speed',
          icon: <Wheat className="w-7 h-7 text-rose-600" />,
          title: 'Hyper-Local Microgreens & Oyster Mushroom Enterprise',
          subtitle: 'Fast 7-to-10-day harvest cycles yielding superfood greens and gourmet mushrooms.',
          roi: '65% Net Margin (Fast 7-Day Cycle)',
          starterBudget: '$40 - $70 (1020 trays, certified sprouting seeds, 5 mushroom blocks, hand sprayer)',
          breakEvenTimeline: 'Within 10 days of first crop delivery',
          targetMarket: 'Parents making organic baby purees, health-conscious fitness enthusiasts, local salad lovers.',
          equipment: [
            '1020 shallow microgreen trays (with and without holes)',
            'Untreated certified non-GMO sprouting broccoli seeds',
            'Colonized oyster mushroom fruiting blocks',
            'Kraft paper clamshell boxes with cellulose viewing window'
          ],
          stepByStep: [
            { step: '1. Seed Soak & Broadcast', detail: 'Soak seeds 4h in 45°C water. Spread evenly over 2cm moist sterile coco coir.' },
            { step: '2. Weighted Blackout (3 Days)', detail: 'Stack empty tray with 2kg weight in darkness to force thick, tall stems.' },
            { step: '3. Daylight Photosynthesis (4 Days)', detail: 'Uncover under indirect light. Cotyledons turn vivid emerald green.' },
            { step: '4. Hyper-Local Delivery', detail: 'Clip shoots cleanly with scissors 30 mins before doorstep delivery to neighbors.' }
          ],
          keyRecipeOrTechnique: {
            label: 'High-Sulforaphane Density Protocol',
            content: 'Harvest exactly on Day 7 when cotyledons are fully expanded for peak enzymatic glucoraphanin concentration.'
          },
          salesChannels: ['Building resident chat groups', 'Local parent-baby nutrition networks', 'Direct doorstep subscriptions'],
          expertTip: 'Your greatest competitive advantage over supermarkets is cut-to-plate speed: harvest 30 minutes before delivery!',
          categoryLink: '/canh-tac-sieu-toc'
        },
        5: {
          id: 'smart-agri-iot',
          icon: <Cpu className="w-7 h-7 text-purple-600" />,
          title: 'Autonomous Digital Balcony & ESP32 IoT Hub',
          subtitle: 'Automate plant hydration and diagnostics under $25 budget.',
          roi: 'Zero Plant Mortality & Scalable Automation',
          starterBudget: '$20 - $35 (ESP32 board, capacitive sensor v1.2, 20W solar panel, 12V mini pump)',
          breakEvenTimeline: 'Immediate peace of mind during travel',
          targetMarket: 'Tech enthusiasts, busy professionals who travel frequently, and smart home lovers.',
          equipment: [
            'ESP32 NodeMCU-32S Wi-Fi microcontroller',
            'Corrosion-resistant v1.2 capacitive soil moisture sensor',
            '20W monocrystalline outdoor solar panel with lithium charge board',
            '12V ultra-quiet mini diaphragm pump'
          ],
          stepByStep: [
            { step: '1. Flash Low-Power Firmware', detail: 'Flash deep-sleep firmware that wakes every 30 mins to sample sensors and sleep.' },
            { step: '2. Weatherproof Junction Box', detail: 'House electronics in an IP65 waterproof box with rubber cable glands.' },
            { step: '3. Mount Solar Panel', detail: 'Attach 20W panel at a 15-degree tilt on balcony railing for self-cleaning.' },
            { step: '4. Calibrate Trigger Threshold', detail: 'Insert capacitive probe 7cm deep into root zone; calibrate pump pulse threshold.' }
          ],
          keyRecipeOrTechnique: {
            label: 'Edge Offline First Philosophy',
            content: 'Pump logic executes locally on ESP32 without relying on home Wi-Fi or cloud servers. Wi-Fi is used only for Telegram alerts.'
          },
          salesChannels: ['Setup service upsell for balcony garden consulting', 'Tech DIY maker forums', 'Smart home automation clients'],
          expertTip: 'Always use capacitive sensors instead of 2-prong resistive probes. Capacitive traces never corrode!',
          categoryLink: '/nong-nghiep-thong-minh'
        }
      }
    : {
        0: {
          id: 'propagation',
          icon: <Scissors className="w-7 h-7 text-emerald-600" />,
          title: 'Kế Hoạch Vườn Ươm & Nhân Giống Vô Tính F1',
          subtitle: 'Biến 1 cây mẹ khỏe mạnh thành 50-60 bầu cây giống thuần hữu cơ mỗi tháng chỉ với 2m² ban công.',
          roi: 'Thu nhập ròng 1.5 - 2.5 triệu/tháng từ 50 bầu cây con',
          starterBudget: '200.000đ - 350.000đ (Bao xơ dừa, perlite, kéo tỉa SK5, khay ươm 50 lỗ)',
          breakEvenTimeline: '21 đến 30 ngày ngay sau lứa cành giâm đầu tiên ra rễ trắng',
          targetMarket: 'Cư dân chung cư yêu cây, hội yêu hoa ban công, thành viên Trạm Đổi Cây YeuTrongCay.',
          equipment: [
            'Kéo cắt tỉa cành thép SK5 sắc bén (khử trùng cồn 70 độ)',
            'Giá thể chuẩn hóa 4D (Mụn dừa xả chát, Perlite, Pumice, Trấu hun)',
            'Khay ươm mầm 50 lỗ có nắp vòm giữ ẩm trong suốt',
            'Túi ươm cây sinh học tự tiêu 10x12cm'
          ],
          stepByStep: [
            { step: '1. Tuyển chọn cây mẹ bánh tẻ', detail: 'Chọn cành bánh tẻ từ cây mẹ Đinh Lăng nếp, Ổi Đài Loan, Hương Thảo. Tưới đẫm trước khi cắt 12 tiếng.' },
            { step: '2. Vết cắt vát 45 độ ngọt lịm', detail: 'Dùng kéo sắc cắt dứt khoát góc 45 độ ngay dưới mắt lá 3mm. Vặt bớt 70% lá dưới gốc.' },
            { step: '3. Cắm vào giá thể 4D vô trùng', detail: 'Cắm sâu 3-4cm vào giá thể thoáng khí (EC < 0.8, Độ xốp > 25%), nén nhẹ quanh gốc.' },
            { step: '4. Vòm giữ ẩm 5 ngày đầu', detail: 'Đậy vòm trong suốt ở nơi nắng tán xạ. Sau 14-21 ngày chùm rễ con bung trắng bầu ươm.' }
          ],
          keyRecipeOrTechnique: {
            label: 'Tỷ lệ phối trộn giá thể giâm cành 4D chuẩn hóa',
            content: '40% Mụn dừa xả chát (EC < 0.4) + 30% Perlite + 20% Pumice + 10% Trấu hun nguyên hạt.'
          },
          salesChannels: ['Đăng tin trên Trạm Đổi Cây yeutrongcay.com (/trao-doi-cay)', 'Hội nhóm cư dân chung cư nơi bạn sinh sống', 'Giao lưu cộng đồng yêu nông nghiệp đô thị'],
          expertTip: 'Tặng kèm thẻ cứng hướng dẫn chăm sóc khi giao cây. Khách hàng thấy cây sống khỏe sẽ quay lại đặt thêm nhiều loại cây khác!',
          categoryLink: '/vuon-uom-nhan-giong'
        },
        1: {
          id: 'syrup-tea',
          icon: <Coffee className="w-7 h-7 text-amber-600" />,
          title: 'Kế Hoạch Sản Xuất Trà Thảo Mộc & Siro Ho Gia Đình',
          subtitle: 'Chế biến sâu thảo dược tươi từ vườn nhà thành các sản phẩm chăm sóc sức khỏe tự nhiên giá trị cao.',
          roi: 'Tỷ suất lợi nhuận gộp 65% - 75% (lãi 60.000đ - 90.000đ mỗi hũ 200ml)',
          starterBudget: '500.000đ - 1.200.000đ (Chai thủy tinh nắp thiếc, đường phèn mật mía, cân tiểu ly, nhiệt kế)',
          breakEvenTimeline: 'Thu hồi toàn bộ vốn sau 2 mẻ siro đầu tiên',
          targetMarket: 'Gia đình có con nhỏ, người lớn tuổi hay ho khan khi giao mùa, người chuộng lối sống thuận tự nhiên.',
          equipment: [
            'Hũ thủy tinh 200ml - 250ml nắp thiếc tiệt trùng luộc nước sôi',
            'Nồi chưng cách thủy inox đáy dày giữ nhiệt tốt',
            'Khúc xạ kế quang học đo độ ngọt 0-90° Brix',
            'Nhiệt kế thực phẩm que kim loại hiển thị LCD'
          ],
          stepByStep: [
            { step: '1. Thu hoạch đúng giờ vàng', detail: 'Hái lá húng chanh, tía tô vào sáng sớm khi tinh dầu trong tuyến lá đạt đỉnh điểm.' },
            { step: '2. Cân chỉnh độ Brix với công cụ động', detail: 'Cân khối lượng lá thực tế; dùng Brix Engine tính chính xác đường phèn để đạt 63° Brix.' },
            { step: '3. Chưng cách thủy nhiệt thấp 75-80°C', detail: 'Hấp cách thủy 60 phút đậy vung ngược để hơi tinh dầu ngưng tụ nhỏ ngược vào âu.' },
            { step: '4. Châm mật ong dưới 45°C', detail: 'Để nguội xuống 42-45°C mới khuấy mật ong rừng để bảo toàn enzym tiêu hóa quý.' }
          ],
          keyRecipeOrTechnique: {
            label: 'Tỷ Lệ Vàng Siro Húng Chanh Tự Bảo Quản 63° Brix',
            content: '200g Lá húng chanh tươi + 150g Quất bổ đôi bỏ sạch hạt + 250g Đường phèn kết tinh + 1 nhánh gừng nướng + 50ml Mật ong rừng (<45°C).'
          },
          salesChannels: ['Hội phụ huynh trường mầm non / tiểu học', 'Cửa hàng thực phẩm sạch trong khu đô thị', 'Thương hiệu cá nhân uy tín'],
          expertTip: 'Đừng nấu mật ong trên lửa sôi vì nhiệt độ cao phá hủy enzym quý. Luôn để siro nguội bớt rồi mới cho mật ong vào đảo đều.',
          categoryLink: '/che-bien-sau-duoc-lieu'
        },
        2: {
          id: 'balcony-setup',
          icon: <Home className="w-7 h-7 text-blue-600" />,
          title: 'Kế Hoạch Dịch Vụ Setup "Tủ Thuốc Ban Công" Trọn Gói',
          subtitle: 'Thiết kế, thi công giàn tầng và trồng sẵn 8 cây thảo dược thiết yếu cho căn hộ chung cư đô thị.',
          roi: '1.000.000đ - 1.800.000đ lợi nhuận ròng trên mỗi hợp đồng hoàn thiện',
          starterBudget: '800.000đ - 1.500.000đ chi phí mẫu thử và dụng cụ thi công cơ bản',
          breakEvenTimeline: 'Có lãi ròng ngay từ hợp đồng đầu tiên',
          targetMarket: 'Cư dân sống ở chung cư, nhân viên văn phòng có con nhỏ muốn có rau gia vị & thảo dược tươi tại chỗ.',
          equipment: [
            'Kệ sắt sơn tĩnh điện 3 tầng chịu lực 80kg',
            'Chậu nhựa thông minh có lưới tự dưỡng chống úng đáy',
            'Chân đế đệm cao su EPDM giảm chấn chống trầy sàn',
            'Hỗn hợp Đất Sống Living Soil siêu nhẹ'
          ],
          stepByStep: [
            { step: '1. Khảo sát DLI và hướng nắng', detail: 'Đo giờ nắng trực tiếp và góc che chắn để chọn bộ cây phù hợp với ban công.' },
            { step: '2. Kiểm định tải trọng sàn an toàn', detail: 'Đảm bảo tải trọng ướt toàn bộ chậu và kệ luôn < 120-150 kg/m².' },
            { step: '3. Phân bổ 3 tầng sinh thái', detail: 'Tầng trên đón nắng gắt, tầng giữa lấy sáng khuếch tán, tầng dưới giữ ẩm râm mát.' },
            { step: '4. Lắp tưới nhỏ giọt trọng lực & Bàn giao', detail: 'Thiết lập tưới tự chảy không cần bơm điện, bàn giao sổ tay chăm sóc.' }
          ],
          keyRecipeOrTechnique: {
            label: 'Công Thức Đất Sống 3 Năm Không Thay Đất',
            content: '35% Mùn hữu cơ xả chát (Xơ dừa + Phân trùn) + 35% Đá khoáng nhẹ (Pumice + Perlite) + 20% Trấu hun + 10% Bột đá basalt bổ sung nấm Mycorrhizae.'
          },
          salesChannels: ['Các hội nhóm cư dân chung cư (Zalo/Facebook)', 'Đối tác công ty thiết kế nội thất căn hộ', 'Giới thiệu truyền miệng từ gia chủ'],
          expertTip: 'Đề xuất gói bảo dưỡng định kỳ 150k/tháng (tỉa cành, phun sinh học, bổ sung dinh dưỡng) để có nguồn thu dịch vụ ổn định hàng tháng.',
          categoryLink: '/dich-vu-setup-ban-cong'
        },
        3: {
          id: 'circular-compost',
          icon: <Recycle className="w-7 h-7 text-teal-600" />,
          title: 'Kế Hoạch Khép Kín Vòng Rác & Nuôi Trùn Quế Căn Hộ',
          subtitle: 'Biến 100% rác nhà bếp thành phân trùn quế nguyên chất và dịch trà trùn vi sinh không mùi hôi.',
          roi: 'Tự chủ 100% phân bón + Bán phân trùn dư thừa',
          starterBudget: '350.000đ - 500.000đ (Bộ 2 thùng đa tầng có vòi xả, 2kg trùn giống sinh khối, lưới inox)',
          breakEvenTimeline: 'Sau 30 ngày ngay khi thu hoạch lứa phân trùn đầu tiên',
          targetMarket: 'Cư dân sống xanh, người làm vườn đô thị cần phân hữu cơ vi sinh sạch 100%.',
          equipment: [
            'Bộ thùng nhựa đa tầng có khoan lỗ thoát dịch và vòi xả đáy',
            'Lưới inox 304 chống ruồi giấm mắt siêu mịn',
            '2kg trùn quế sinh khối giống khỏe mạnh',
            'Bìa carton vụn không tráng bóng làm đệm lót'
          ],
          stepByStep: [
            { step: '1. Thiết lập thùng nuôi 2 tầng', detail: 'Thùng trên khoan lỗ 3mm thoát dịch, thùng dưới gắn vòi vặn thu dịch trà trùn.' },
            { step: '2. Lót lớp đệm Carbon giữ ẩm', detail: 'Xé nhỏ bìa carton ngâm nước vắt ráo rải dày 10cm dưới đáy làm tổ cho trùn.' },
            { step: '3. Cho ăn theo hốc luân phiên', detail: 'Chôn rác nhà bếp thái nhỏ ở các góc luân phiên, luôn phủ kín mặt bằng khăn ẩm.' },
            { step: '4. Thu hoạch phân bằng ánh sáng', detail: 'Vun phân thành gò hình nón dưới ánh sáng, trùn chui xuống đáy, hớt lớp phân đen tơi xốp.' }
          ],
          keyRecipeOrTechnique: {
            label: 'Tỷ lệ vàng C:N 25:1 triệt tiêu mùi hôi',
            content: 'Cứ 1 phần rác ướt giàu Nitơ (vỏ rau củ, bã cà phê) phải phủ kín bằng 2 phần rác nâu giàu Carbon (bìa carton vụn, xơ dừa ẩm).'
          },
          salesChannels: ['Cung cấp cho các chậu cây tại ban công nhà mình', 'Bán túi phân trùn nhỏ cho hàng xóm cùng tầng', 'Trạm Đổi Cây YeuTrongCay'],
          expertTip: 'Tuyệt đối không cho ăn thịt cá dầu mỡ, đồ cay nóng hay vỏ cam chanh. Duy trì độ ẩm như miếng mút vắt ráo.',
          categoryLink: '/kinh-te-tuan-hoan'
        },
        4: {
          id: 'microgreens-speed',
          icon: <Wheat className="w-7 h-7 text-rose-600" />,
          title: 'Kế Hoạch Khởi Nghiệp Rau Mầm & Nấm Ăn Xoay Vòng 7 Ngày',
          subtitle: 'Mô hình nông nghiệp vi mô thu hồi vốn thần tốc, cung cấp siêu thực phẩm tươi sống cho cư dân bán kính 2km.',
          roi: 'Tỷ suất lợi nhuận ròng 65% (Dòng tiền quay vòng hàng tuần)',
          starterBudget: '400.000đ - 700.000đ (Khay ươm mầm 1020, hạt giống chuyên dụng, 5 bịch phôi nấm sò, bình xịt)',
          breakEvenTimeline: '10 ngày sau mẻ rau mầm đầu tiên giao tận tay khách',
          targetMarket: 'Các bà mẹ có con ăn dặm, người ăn thực dưỡng/healthy, gia đình cần rau sạch cao cấp.',
          equipment: [
            'Bộ khay ươm nông nghiệp 1020 đáy phẳng có lỗ thoát nước',
            'Gói hạt giống súp lơ xanh chuyên dụng ăn mầm (không hóa chất bảo quản)',
            'Phôi nấm sò trắng / bào ngư xám đã ăn kín tơ',
            'Hộp giấy kraft nắp trong suốt sinh học tự phân hủy'
          ],
          stepByStep: [
            { step: '1. Ngâm hạt và gieo mật độ cao', detail: 'Ngâm hạt 4h nước ấm 45°C. Rải đều 30g hạt trên lớp xơ dừa ẩm 2cm.' },
            { step: '2. Quy trình ủ tối ép tạ 3 ngày', detail: 'Úp khay đè tạ 2kg trong bóng tối để kích rễ cắm sâu và thân mầm vươn mập mạp.' },
            { step: '3. Đón sáng quang hợp 4 ngày', detail: 'Dỡ tạ ra nơi có ánh sáng tán xạ, lá mầm chuyển màu xanh ngọc bích rực rỡ.' },
            { step: '4. Cắt thu hoạch và giao tận cửa', detail: 'Dùng kéo bén cắt cách gốc 5mm trước giờ giao 30 phút, đóng hộp kraft xinh xắn.' }
          ],
          keyRecipeOrTechnique: {
            label: 'Quy Chuẩn Sulforaphane Tối Đa',
            content: 'Thu hoạch chính xác vào ngày thứ 7 khi 2 lá mầm mở rộng tối đa để đạt hàm lượng Sulforaphane cao gấp 50 lần súp lơ trưởng thành.'
          },
          salesChannels: ['Gói thuê bao định kỳ (Subscription) giao 2 lần/tuần', 'Nhóm cư dân cùng tòa chung cư', 'Cửa hàng cháo dinh dưỡng cho bé'],
          expertTip: 'Lợi thế cạnh tranh lớn nhất của bạn là độ tươi: cắt trước khi giao 30 phút, giòn ngọt gấp 3 lần rau siêu thị!',
          categoryLink: '/canh-tac-sieu-toc'
        },
        5: {
          id: 'smart-agri-iot',
          icon: <Cpu className="w-7 h-7 text-purple-600" />,
          title: 'Kế Hoạch Nông Nghiệp Số & Cảm Biến IoT Tự Động Hóa',
          subtitle: 'Ban công tự hành: Tự ráp trạm cảm biến độ ẩm đất dung kháng ESP32 và bơm solar dưới 500k.',
          roi: 'Bảo vệ 100% cây không chết khát khi cả nhà đi du lịch',
          starterBudget: '420.000đ - 550.000đ (Bo mạch ESP32, cảm biến dung kháng v1.2, pin solar 20W, bơm màng 12V)',
          breakEvenTimeline: 'Ngay trong chuyến công tác hoặc kỳ nghỉ Tết đầu tiên',
          targetMarket: 'Người bận rộn hay đi công tác, người yêu thích công nghệ Smart Home và nông nghiệp số.',
          equipment: [
            'Bo mạch vi điều khiển ESP32 Wi-Fi + Bluetooth',
            'Cảm biến độ ẩm đất dung kháng Capacitive v1.2 chống ăn mòn',
            'Tấm pin mặt trời Monocrystalline 20W có khung nhôm ngoài trời',
            'Bơm màng mini 12V tự mồi nước siêu êm'
          ],
          stepByStep: [
            { step: '1. Nạp firmware Deep-Sleep', detail: 'Nạp code tiết kiệm pin: ESP32 thức dậy 3 giây đọc cảm biến rồi ngủ tiếp.' },
            { step: '2. Chống thấm hộp điều khiển IP65', detail: 'Đặt mạch trong hộp nhựa gioăng cao su, quét sơn bảo vệ chống hơi ẩm ban công.' },
            { step: '3. Gắn pin Solar nghiêng 15 độ', detail: 'Gắn tấm pin lên lan can ở góc nghiêng 15 độ để nước mưa tự trôi bụi.' },
            { step: '4. Cắm cảm biến dung kháng tầng rễ', detail: 'Cắm sâu 7cm vào chậu đại diện, cài đặt ngưỡng độ ẩm tự kích hoạt bơm tưới.' }
          ],
          keyRecipeOrTechnique: {
            label: 'Triết Lý Edge Offline First',
            content: 'Lệnh điều khiển bật tắt bơm chạy cục bộ 100% trên chip ESP32, không phụ thuộc vào Internet hay server đám mây. Wi-Fi chỉ dùng gửi tin báo Telegram.'
          },
          salesChannels: ['Dịch vụ gia tăng khi nhận setup ban công cho khách', 'Cộng đồng Maker / DIY điện tử nông nghiệp', 'Lắp đặt cho các căn hộ chung cư cao cấp'],
          expertTip: 'Tuyệt đối không dùng cảm biến 2 que kim loại rẻ tiền vì sẽ bị ăn mòn tan nát sau 2 tuần. Luôn dùng cảm biến dung kháng v1.2 bọc kín mạch!',
          categoryLink: '/nong-nghiep-thong-minh'
        }
      };

  const activeDetail = selectedBlueprintIndex !== null ? blueprintDetails[selectedBlueprintIndex] : null;

  return (
    <section id="monetization" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-3 border border-emerald-300/60 dark:border-emerald-700/60">
            <Coins className="w-3.5 h-3.5" />
            <span>{isEn ? 'Urban Green Economy & Circular Bio-Agri Hub' : 'Hệ Sinh Thái Kinh Tế Xanh & Nông Nghiệp Đô Thị Tuần Hoàn'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {isEn ? 'Turn Botanical Passion into Sustainable Revenue' : 'Cổng Tri Thức & Công Cụ Kinh Tế Vườn Bền Vững'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'Explore our 6 independent specialized silos, 24 validated field guides, and interactive algorithmic calculators designed for high-density city living.'
              : 'Khám phá 6 chuyên mục độc lập cấp 1, ma trận 24 cẩm nang thực nghiệm chuyên sâu và hệ thống công cụ tính toán thuật toán tương tác độc quyền.'}
          </p>
        </div>

        {/* 6 INDEPENDENT SPECIALIZED SILOS CARDS */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                {isEn ? '6 Independent Specialized Hubs' : '6 Chuyên Mục Độc Lập Chuyên Sâu'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                {isEn ? 'Explore Dedicated Silo Platforms' : 'Truy Cập Nền Tảng Chuyên Đề Cấp 1'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MONETIZATION_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getCategoryIcon(cat.icon, 'w-6 h-6')}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {isEn ? cat.badgeEn : cat.badgeVi}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <Link to={`/${cat.slug}`}>
                      {isEn ? cat.titleEn : cat.titleVi}
                    </Link>
                  </h4>

                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-2.5 line-clamp-1">
                    {isEn ? cat.taglineEn : cat.taglineVi}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-5 leading-relaxed">
                    {isEn ? cat.descriptionEn : cat.descriptionVi}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    4 {isEn ? 'Guides & Engine' : 'Cẩm nang + Engine'}
                  </span>
                  <Link
                    to={`/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition"
                  >
                    <span>{isEn ? 'Enter Category' : 'Vào chuyên mục'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Micro-Farming ROI Calculator */}
        <div className="mb-16">
          <MicroFarmingRoiCalculator />
        </div>

        {/* Sub-header for blueprints */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
            {isEn ? 'Validated Business Blueprints' : 'Cẩm Nang Triển Khai 6 Mô Hình Thực Chiến'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {isEn ? 'Step-by-Step SOPs & Technical Economics' : 'Quy Trình Chuẩn SOP & Hiệu Quả Kinh Tế'}
          </h3>
        </div>

        {/* 6 Blueprints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blueprints.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedBlueprintIndex(index)}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 shadow-sm hover:shadow-xl transition flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {item.roi}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {isEn ? 'View Plan' : 'Xem kế hoạch'} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Detail Modal */}
      {activeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                  {activeDetail.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {activeDetail.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeDetail.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBlueprintIndex(null)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              
              {/* Financial Snapshot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-950/50 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Profit Expectation' : 'Lợi Nhuận Kỳ Vọng'}</span>
                  </div>
                  <p className="font-bold text-sm text-emerald-950 dark:text-emerald-100">
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
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Break-Even' : 'Hoàn Vốn'}</span>
                  </div>
                  <p className="font-semibold text-xs sm:text-sm text-blue-950 dark:text-blue-100">
                    {activeDetail.breakEvenTimeline}
                  </p>
                </div>
              </div>

              {/* Step by Step Execution */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  {isEn ? 'Execution Steps (SOP)' : 'Quy Trình Triển Khai SOP'}
                </h4>
                <div className="space-y-2.5">
                  {activeDetail.stepByStep.map((s, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <strong className="text-slate-900 dark:text-white block mb-0.5">{s.step}</strong>
                      <span className="text-slate-600 dark:text-slate-300">{s.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secret Technique or Formula */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 block mb-1">
                  {activeDetail.keyRecipeOrTechnique.label}
                </span>
                <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed">
                  {activeDetail.keyRecipeOrTechnique.content}
                </p>
              </div>

              {/* Expert Advice */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 block mb-1">
                  {isEn ? 'Expert Pro-Tip' : 'Lời Khuyên Chuyên Gia'}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeDetail.expertTip}
                </p>
              </div>

            </div>

            {/* Modal Footer with Direct Link to Category Platform */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {isEn ? 'Complete documentation in dedicated Silo' : 'Xem toàn bộ 4 bài viết & công cụ tương tác'}
              </span>
              <Link
                to={activeDetail.categoryLink}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
              >
                <span>{isEn ? 'Open Category Hub' : 'Truy Cập Chuyên Mục'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
