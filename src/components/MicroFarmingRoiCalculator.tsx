import React, { useState, useId } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  Sparkles,
  CheckCircle2,
  ShoppingBag,
  Leaf,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Share2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Link } from 'react-router-dom';
import { ShareModal } from './ShareModal.tsx';

export type FarmingModelKey = 'self_sufficient' | 'propagation' | 'syrup_tea' | 'balcony_service';

interface ModelOption {
  key: FarmingModelKey;
  icon: string;
  titleVi: string;
  titleEn: string;
  taglineVi: string;
  taglineEn: string;
  defaultPots: number;
  setupCostPerPot: number; // VND
  monthlyOpexPerPot: number; // VND (water, nutrients)
  revenuePerPotMonthly: number; // VND (savings or sales)
  grossMargin: number; // 0.0 - 1.0
  typicalWorkHoursVi: string;
  typicalWorkHoursEn: string;
  actionAdviceVi: string;
  actionAdviceEn: string;
  equipmentListVi: string[];
  equipmentListEn: string[];
}

export const MicroFarmingRoiCalculator: React.FC = () => {
  const { isEn } = useLanguage();
  const areaInputId = useId();
  const potsInputId = useId();

  // Inputs
  const [selectedModel, setSelectedModel] = useState<FarmingModelKey>('self_sufficient');
  const [areaSquareMeters, setAreaSquareMeters] = useState<number>(4);
  const [potCount, setPotCount] = useState<number>(14);
  const [useCompostRecycling, setUseCompostRecycling] = useState<boolean>(true);
  const [timeCommitment, setTimeCommitment] = useState<'15m' | '30m' | '60m'>('30m');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const models: Record<FarmingModelKey, ModelOption> = {
    self_sufficient: {
      key: 'self_sufficient',
      icon: '🥬',
      titleVi: 'Tự Cung Tự Cấp (Rau Sạch & Thảo Dược)',
      titleEn: 'Self-Sufficient Kitchen Herbs & Clean Greens',
      taglineVi: 'Tiết kiệm chi phí đi chợ, đảm bảo 100% rau không hóa chất cho cả gia đình',
      taglineEn: 'Cut grocery bills with zero-chemical kitchen herbs and leafy greens',
      defaultPots: 12,
      setupCostPerPot: 85000,
      monthlyOpexPerPot: 15000,
      revenuePerPotMonthly: 80000,
      grossMargin: 0.81,
      typicalWorkHoursVi: '15 - 20 phút/ngày',
      typicalWorkHoursEn: '15 - 20 mins/day',
      actionAdviceVi: 'Nên trồng kết hợp: 40% rau gia vị ăn thường xuyên (húng quế, tía tô, kinh giới), 30% thảo dược phòng bệnh (húng chanh, lá lốt) và 30% rau ăn lá thu hoạch liên tục.',
      actionAdviceEn: 'Optimal ratio: 40% daily culinary herbs (Thai basil, perilla), 30% first-aid medicinal plants (Indian borage, wild betel), and 30% continuous-pick greens.',
      equipmentListVi: ['Chậu nhựa thông minh có tấm lót trữ nước đáy', 'Đất thịt phù sa phối trộn phân trùn quế + trấu hun', 'Hạt giống rau muống, cải mầm, củ cải đỏ', 'Kéo bấm tỉa cành mini'],
      equipmentListEn: ['Self-watering balcony planters with reservoir grid', 'Rich alluvial soil mixed with worm castings & biochar', 'Heirloom culinary seed kit', 'Stainless precision pruning snips'],
    },
    propagation: {
      key: 'propagation',
      icon: '✂️',
      titleVi: 'Nhân Giống & Bán Bầu Cây Giống (Nursery)',
      titleEn: 'Home Nursery & Stem Cuttings Propagation',
      taglineVi: 'Tận dụng 1 cây mẹ chiết ra 30 - 60 bầu cây con bán cho cư dân cùng chung cư',
      taglineEn: 'Turn 1 mother plant into 30-60 rooted seedlings sold to condo neighbors',
      defaultPots: 16,
      setupCostPerPot: 110000,
      monthlyOpexPerPot: 25000,
      revenuePerPotMonthly: 190000,
      grossMargin: 0.86,
      typicalWorkHoursVi: '30 phút/ngày',
      typicalWorkHoursEn: '30 mins/day',
      actionAdviceVi: 'Tập trung vào giống dễ bén rễ và nhu cầu cao: Đinh lăng nếp (35k/bầu), Ổi lê chiết cành (65k/bầu), Hương thảo Rosemary (45k/bầu), Húng chanh (25k/bầu).',
      actionAdviceEn: 'Focus on high-demand, easy-rooting species: Ming Aralia, Dwarf Guava air-layers, Rosemary cuttings, and Indian Borage starters.',
      equipmentListVi: ['Cây mẹ khỏe mạnh thuần hữu cơ', 'Dao ghép cành thép SK5 chuyên dụng', 'Bột kích rễ sinh học IBA / Chiết xuất vỏ liễu', 'Túi ươm tự phân hủy 10x12cm'],
      equipmentListEn: ['Vigorous certified mother stock', 'High-carbon grafting blade', 'Organic rooting powder (IBA / Willow tea)', 'Biodegradable nursery grow pouches'],
    },
    syrup_tea: {
      key: 'syrup_tea',
      icon: '🍯',
      titleVi: 'Chế Biến Sâu Trà Thảo Mộc & Siro Ho',
      titleEn: 'Artisanal Herbal Teas & Natural Cough Syrups',
      taglineVi: 'Nấu siro húng chanh quất đường phèn mật ong hoặc sấy trà thảo dược túi lọc',
      taglineEn: 'Double-boiled throat syrups and dehydrated artisanal loose-leaf herbal tea',
      defaultPots: 18,
      setupCostPerPot: 125000,
      monthlyOpexPerPot: 38000,
      revenuePerPotMonthly: 240000,
      grossMargin: 0.76,
      typicalWorkHoursVi: '45 phút/ngày (cuối tuần)',
      typicalWorkHoursEn: '45 mins/day (weekends)',
      actionAdviceVi: 'Đầu tư chai thủy tinh tiệt trùng và dán nhãn thông tin minh bạch nguồn gốc hữu cơ. Mỗi lọ siro ho 200ml bán 90k - 120k cho phụ huynh có con nhỏ cực kỳ được ưa chuộng.',
      actionAdviceEn: 'Package in sterilized amber glass jars with tamper-evident seal. 200ml home syrup jars sell for $4-$6 with great loyalty among parents with toddlers.',
      equipmentListVi: ['Nồi hấp cách thủy inox 304', 'Hũ thủy tinh nắp thiếc 200ml tiệt trùng', 'Đường phèn kết tinh mật mía & mật ong hoa rừng', 'Máy sấy hoa quả mini 6 khay'],
      equipmentListEn: ['Stainless double-boiler steam pot', 'Sterilized 200ml glass jars with airtight lids', 'Organic rock cane sugar & raw wildflower honey', 'Mini 6-tray temperature-controlled dehydrator'],
    },
    balcony_service: {
      key: 'balcony_service',
      icon: '🏡',
      titleVi: 'Dịch Vụ Setup "Tủ Thuốc Ban Công" Trọn Gói',
      titleEn: 'Turnkey Apartment "Balcony Pharmacy" Service',
      taglineVi: 'Nhận thiết kế & thi công kệ tầng thảo dược sẵn sàng cho các căn hộ lân cận',
      taglineEn: 'Full-service design, installation and planting for neighbor apartments',
      defaultPots: 20,
      setupCostPerPot: 160000,
      monthlyOpexPerPot: 40000,
      revenuePerPotMonthly: 320000,
      grossMargin: 0.75,
      typicalWorkHoursVi: '1 - 2 giờ vào cuối tuần',
      typicalWorkHoursEn: '1 - 2 hours on weekends',
      actionAdviceVi: 'Chụp ảnh Before/After chính góc ban công của bạn làm hồ sơ năng lực. Cung cấp gói bảo hành cây sống 30 ngày và kèm sổ tay chăm sóc số trên yeutrongcay.com để tạo uy tín tuyệt đối.',
      actionAdviceEn: 'Use your own lush balcony Before/After photos as a live portfolio. Offer a 30-day plant warranty and pair it with a free Yeu Trong Cay digital garden profile.',
      equipmentListVi: ['Kệ sắt sơn tĩnh điện 3 tầng chịu lực', 'Chậu thông minh có khay thoát nước giọt rớt', 'Bộ hẹn giờ tưới tự động kết nối vòi ban công', 'Hồ sơ năng lực ảnh thực tế'],
      equipmentListEn: ['Powder-coated 3-tier space-saving metal planter rack', 'Drip-free sub-irrigation planter boxes', 'Smart balcony tap drip timer', 'Photo portfolio & warranty card'],
    },
  };

  const activeModel = models[selectedModel];

  // Auto adjust pots if area slider moves
  const handleAreaChange = (newArea: number) => {
    setAreaSquareMeters(newArea);
    const estimatedPots = Math.max(4, Math.round(newArea * 3.5));
    setPotCount(estimatedPots);
  };

  // Financial Calculations
  const opexDiscountFactor = useCompostRecycling ? 0.75 : 1.0;
  const totalCapex = potCount * activeModel.setupCostPerPot;
  const rawMonthlyOpex = potCount * activeModel.monthlyOpexPerPot;
  const actualMonthlyOpex = Math.round(rawMonthlyOpex * opexDiscountFactor);
  const monthlyRevenue = potCount * activeModel.revenuePerPotMonthly;
  const monthlyNetProfit = Math.max(0, monthlyRevenue - actualMonthlyOpex);

  const breakEvenMonths = monthlyNetProfit > 0 ? (totalCapex / monthlyNetProfit).toFixed(1) : '∞';
  const annualNetProfit = monthlyNetProfit * 12;
  const annualRoiPercentage = totalCapex > 0 ? Math.round((annualNetProfit / totalCapex) * 100) : 0;

  // Format currency
  const formatVND = (amount: number) => {
    if (isEn) {
      const usd = (amount / 25000).toFixed(0);
      return `$${Number(usd).toLocaleString('en-US')}`;
    }
    return `${(amount / 1000).toLocaleString('vi-VN')}k ₫`;
  };

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-10 border border-forest-100 dark:border-forest-800 shadow-xl transition-colors space-y-10">
      
      {/* 1. Header Widget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-forest-100 dark:border-forest-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isEn ? 'Urban Micro-Farming Financial Engine' : 'Bộ Tính Toán Kinh Tế & Thu Hồi Vốn Vườn Phố'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 dark:text-cream-50">
            {isEn ? 'Balcony Farming ROI & Profit Simulator' : 'Mô Phỏng Doanh Thu & Điểm Hòa Vốn Ban Công'}
          </h3>
          <p className="text-xs sm:text-sm text-forest-700 dark:text-forest-300 mt-1 max-w-2xl">
            {isEn
              ? 'Calculate realistic initial setup costs, monthly recurring revenue or kitchen savings, and exact payback timeline based on your available square meters.'
              : 'Dự toán chi phí đầu tư ban đầu, lợi nhuận ròng hàng tháng và thời gian thu hồi vốn thực tế dựa trên diện tích ban công của bạn.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <span className="px-3.5 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{isEn ? 'Empirical Benchmarks' : 'Số Liệu Thực Nghiệm'}</span>
          </span>
        </div>
      </div>

      {/* 2. Choose Model (Tabs) */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-300 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-herbal-600" />
          <span>{isEn ? 'Step 1: Select Your Urban Farming Business Model' : 'Bước 1: Chọn Mô Hình Kinh Tế Vườn Đô Thị'}</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(models) as FarmingModelKey[]).map((key) => {
            const m = models[key];
            const isSelected = selectedModel === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedModel(key);
                  setPotCount(m.defaultPots);
                }}
                className={`p-4 rounded-2xl text-left transition border flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-forest-900 text-white border-forest-950 shadow-md ring-2 ring-herbal-400/50'
                    : 'bg-cream-50/70 dark:bg-charcoal-800/80 hover:bg-forest-50 dark:hover:bg-charcoal-700 border-forest-100 dark:border-forest-700 text-forest-900 dark:text-cream-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{m.icon}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-herbal-400 animate-ping"></span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm mb-1 leading-snug">
                    {isEn ? m.titleEn : m.titleVi}
                  </h4>
                  <p
                    className={`text-[11px] leading-relaxed line-clamp-2 ${
                      isSelected ? 'text-forest-200' : 'text-forest-700 dark:text-forest-300'
                    }`}
                  >
                    {isEn ? m.taglineEn : m.taglineVi}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-forest-100/30 flex items-center justify-between text-[11px] font-semibold">
                  <span className={isSelected ? 'text-herbal-300' : 'text-herbal-600 dark:text-herbal-400'}>
                    Margin: {Math.round(m.grossMargin * 100)}%
                  </span>
                  <span className={isSelected ? 'text-forest-200' : 'text-gray-400'}>
                    {isEn ? m.typicalWorkHoursEn : m.typicalWorkHoursVi}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Input Sliders (Area & Pots) */}
      <div className="p-6 rounded-3xl bg-cream-50 dark:bg-charcoal-800 border border-forest-100 dark:border-forest-700 space-y-6">
        <label className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-300 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-herbal-600" />
          <span>{isEn ? 'Step 2: Customize Your Physical Balcony Parameters' : 'Bước 2: Tùy Chỉnh Thông Số Ban Công / Sân Thượng Của Bạn'}</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Slider 1: Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label htmlFor={areaInputId} className="font-bold text-forest-900 dark:text-cream-100 cursor-pointer">
                {isEn ? 'Available Usable Area:' : 'Diện tích ban công / sân thượng:'}
              </label>
              <span className="px-3 py-1 rounded-xl bg-forest-900 text-white font-serif font-bold text-sm shadow-xs">
                {areaSquareMeters} m²
              </span>
            </div>
            <input
              id={areaInputId}
              type="range"
              min={2}
              max={30}
              step={1}
              value={areaSquareMeters}
              onChange={(e) => handleAreaChange(Number(e.target.value))}
              aria-label={isEn ? 'Usable Balcony Area in square meters' : 'Diện tích ban công theo mét vuông'}
              className="w-full h-2 bg-forest-200 dark:bg-charcoal-700 rounded-lg appearance-none cursor-pointer accent-herbal-600"
            />
            <div className="flex justify-between text-[11px] text-gray-500 dark:text-gray-400">
              <span>{isEn ? '2 m² (Compact)' : '2 m² (Ban công nhỏ)'}</span>
              <span>{isEn ? '10 m² (Corner Patio)' : '10 m² (Ban công góc)'}</span>
              <span>{isEn ? '30 m² (Rooftop Terrace)' : '30 m² (Sân thượng phố)'}</span>
            </div>
          </div>

          {/* Slider 2: Pots */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label htmlFor={potsInputId} className="font-bold text-forest-900 dark:text-cream-100 cursor-pointer">
                {isEn ? 'Total Planter Pots / Containers:' : 'Số lượng chậu / kệ trồng:'}
              </label>
              <span className="px-3 py-1 rounded-xl bg-forest-900 text-white font-serif font-bold text-sm shadow-xs">
                {potCount} {isEn ? 'pots' : 'chậu'}
              </span>
            </div>
            <input
              id={potsInputId}
              type="range"
              min={4}
              max={60}
              step={2}
              value={potCount}
              onChange={(e) => setPotCount(Number(e.target.value))}
              aria-label={isEn ? 'Number of Planter Pots' : 'Số lượng chậu trồng'}
              className="w-full h-2 bg-forest-200 dark:bg-charcoal-700 rounded-lg appearance-none cursor-pointer accent-herbal-600"
            />
            <div className="flex justify-between text-[11px] text-gray-500 dark:text-gray-400">
              <span>{isEn ? '4 pots' : '4 chậu'}</span>
              <span>{isEn ? '30 pots' : '30 chậu'}</span>
              <span>{isEn ? '60 pots (Max density)' : '60 chậu (Mật độ tối đa)'}</span>
            </div>
          </div>
        </div>

        {/* Toggles & Modifiers */}
        <div className="pt-4 border-t border-forest-100 dark:border-forest-700 flex flex-wrap items-center justify-between gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={useCompostRecycling}
              onChange={(e) => setUseCompostRecycling(e.target.checked)}
              className="w-4 h-4 rounded text-herbal-600 focus:ring-herbal-500 border-gray-300 dark:border-gray-600"
            />
            <span className="text-xs font-semibold text-forest-900 dark:text-cream-100">
              {isEn
                ? '♻️ Recycle kitchen scraps into organic compost (Saves 25% nutrient OPEX)'
                : '♻️ Tận dụng rác nhà bếp ủ phân compost hữu cơ (Giảm 25% chi phí dinh dưỡng)'}
            </span>
          </label>

          <div className="flex items-center gap-1.5 text-xs text-forest-700 dark:text-forest-300">
            <Clock className="w-3.5 h-3.5 text-herbal-600" />
            <span>{isEn ? 'Time commitment:' : 'Thời gian dành mỗi ngày:'}</span>
            <div className="flex gap-1 ml-1">
              {(['15m', '30m', '60m'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeCommitment(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    timeCommitment === t
                      ? 'bg-forest-900 text-white shadow-xs'
                      : 'bg-white dark:bg-charcoal-700 text-forest-800 dark:text-forest-200 hover:bg-forest-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Financial Output Matrix (Hero Results) */}
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-300 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span>{isEn ? 'Step 3: Instant Financial Yield & Payback Forecast' : 'Bước 3: Dự Báo Hiệu Quả Tài Chính & Điểm Hòa Vốn Tức Thì'}</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Vốn đầu tư ban đầu */}
          <div className="p-6 rounded-3xl bg-forest-50/70 dark:bg-charcoal-800/90 border border-forest-100 dark:border-forest-700 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-forest-600 dark:text-forest-400 uppercase tracking-wider block mb-1">
                {isEn ? 'Initial Setup (CAPEX)' : 'Vốn Đầu Tư Ban Đầu'}
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif font-black text-forest-950 dark:text-cream-50">
                {formatVND(totalCapex)}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                {isEn ? `For ${potCount} pots & substrate` : `Cho ${potCount} chậu, đất & giống ban đầu`}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-forest-100 dark:border-forest-700/60 text-[11px] text-forest-700 dark:text-forest-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{isEn ? 'One-time investment' : 'Chi phí 1 lần duy nhất'}</span>
            </div>
          </div>

          {/* Card 2: Doanh thu / Tiết kiệm hàng tháng */}
          <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-1">
                {isEn ? 'Monthly Revenue / Savings' : 'Doanh Thu / Tiết Kiệm Tháng'}
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif font-black text-emerald-900 dark:text-emerald-300">
                {formatVND(monthlyRevenue)}
              </h4>
              <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400 mt-1">
                {isEn ? `Costs: ~${formatVND(actualMonthlyOpex)}/mo` : `Chi phí duy trì: ~${formatVND(actualMonthlyOpex)}/tháng`}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-800/60 text-[11px] text-emerald-900 dark:text-emerald-200 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{isEn ? 'Recurring cash flow' : 'Dòng tiền đều đặn mỗi tháng'}</span>
            </div>
          </div>

          {/* Card 3: Lợi nhuận ròng hàng tháng */}
          <div className="p-6 rounded-3xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider block mb-1">
                {isEn ? 'Net Monthly Profit' : 'Lợi Nhuận Ròng / Tháng'}
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif font-black text-amber-900 dark:text-amber-300">
                {formatVND(monthlyNetProfit)}
              </h4>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-400 mt-1">
                {isEn ? `Yearly net: ~${formatVND(annualNetProfit)}` : `Lãi năm: ~${formatVND(annualNetProfit)}`}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-200 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{isEn ? 'Annual ROI: ' : 'Tỉ suất ROI: '}<strong>{annualRoiPercentage}% / {isEn ? 'year' : 'năm'}</strong></span>
            </div>
          </div>

          {/* Card 4: Thời gian hoàn vốn */}
          <div className="p-6 rounded-3xl bg-terracotta-50/60 dark:bg-terracotta-950/30 border border-terracotta-200 dark:border-terracotta-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-terracotta-900 dark:text-terracotta-300 uppercase tracking-wider block mb-1">
                {isEn ? 'Break-Even Timeline' : 'Thời Gian Thu Hồi Vốn'}
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif font-black text-terracotta-900 dark:text-terracotta-300">
                {breakEvenMonths} {isEn ? 'months' : 'tháng'}
              </h4>
              <p className="text-[11px] text-terracotta-800/80 dark:text-terracotta-400 mt-1">
                {isEn ? 'Fast capital recovery' : 'Thu hồi toàn bộ tiền chậu & đất'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-terracotta-200 dark:border-terracotta-800/60 text-[11px] text-terracotta-900 dark:text-terracotta-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
              <span>{isEn ? 'Zero debt, pure surplus' : 'Từ tháng sau là lãi thuần 100%'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Action Strategy & Starter Equipment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-forest-100 dark:border-forest-800">
        {/* Left: Expert Advice */}
        <div className="p-6 rounded-3xl bg-cream-50 dark:bg-charcoal-800 border border-forest-100 dark:border-forest-700 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-forest-900 text-white flex items-center justify-center text-sm font-bold">
              💡
            </span>
            <h4 className="font-serif font-bold text-base text-forest-950 dark:text-cream-50">
              {isEn ? 'Action Strategy for This Model' : 'Chiến Lược Hành Động Cho Mô Hình Này'}
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-forest-800 dark:text-forest-200 leading-relaxed">
            {isEn ? activeModel.actionAdviceEn : activeModel.actionAdviceVi}
          </p>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-700 text-xs space-y-2">
            <span className="font-bold text-forest-900 dark:text-cream-100 block">
              {isEn ? 'Suggested species mix for your pots:' : 'Phân bổ giống cây khuyến nghị:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedModel === 'self_sufficient' && (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-semibold">{isEn ? 'Perilla (4 pots)' : 'Tía tô (4 chậu)'}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-semibold">{isEn ? 'Indian Borage (3 pots)' : 'Húng chanh (3 chậu)'}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-semibold">{isEn ? 'Wild Betel (3 pots)' : 'Lá lốt (3 chậu)'}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-semibold">{isEn ? 'Cherry Tomato (4 pots)' : 'Cà chua bi (4 chậu)'}</span>
                </>
              )}
              {selectedModel === 'propagation' && (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[11px] font-semibold">{isEn ? 'Ming Aralia (5 mothers)' : 'Đinh lăng nếp (5 cây mẹ)'}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[11px] font-semibold">{isEn ? 'Dwarf Guava (4 mothers)' : 'Ổi lê ruột đỏ (4 cây mẹ)'}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[11px] font-semibold">{isEn ? 'Rosemary (4 pots)' : 'Hương thảo Rosemary (4 chậu)'}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-[11px] font-semibold">{isEn ? 'Coco Coir Plugs (30 starters)' : 'Khay ươm bầu xơ dừa (30 bầu)'}</span>
                </>
              )}
              {selectedModel === 'syrup_tea' && (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300 text-[11px] font-semibold">{isEn ? 'Indian Borage (8 pots)' : 'Húng chanh lá dày (8 chậu)'}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300 text-[11px] font-semibold">{isEn ? 'Calamondin (4 pots)' : 'Quất cảnh ngọt (4 chậu)'}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300 text-[11px] font-semibold">{isEn ? 'Perilla & Lemongrass (6 pots)' : 'Tía tô tím & Sả chanh (6 chậu)'}</span>
                </>
              )}
              {selectedModel === 'balcony_service' && (
                <>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 text-[11px] font-semibold">{isEn ? '8-Herb Pharmacy Garden Kit' : 'Vườn mẫu 8 vị thuốc nam (1 bộ)'}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 text-[11px] font-semibold">{isEn ? '3-Tier Metal Planter Rack' : 'Kệ sắt 3 tầng sơn tĩnh điện'}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 text-[11px] font-semibold">{isEn ? 'Smart Drip Irrigation Timer' : 'Bộ tưới nhỏ giọt thông minh'}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Equipment Checklist & Call to action */}
        <div className="p-6 rounded-3xl bg-forest-900 text-white flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-herbal-400 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4" />
                <span>{isEn ? 'Starter Bill of Materials' : 'Danh Mục Vật Tư Cần Mua Ban Đầu'}</span>
              </span>
              <span className="text-xs font-serif text-amber-300 font-bold">
                ~{formatVND(totalCapex)}
              </span>
            </div>

            <ul className="space-y-2 text-xs">
              {(isEn ? activeModel.equipmentListEn : activeModel.equipmentListVi).map((eq, i) => (
                <li key={i} className="flex items-start gap-2 text-forest-100">
                  <CheckCircle2 className="w-4 h-4 text-herbal-400 shrink-0 mt-0.5" />
                  <span>{eq}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-forest-800 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/vuon-cua-toi"
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-herbal-600 hover:bg-herbal-500 text-forest-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
            >
              <Leaf className="w-4 h-4" />
              <span>{isEn ? 'Set Up in My Digital Garden' : 'Thêm Danh Mục Vào Vườn Số'}</span>
            </Link>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition border border-white/20"
            >
              <Share2 className="w-3.5 h-3.5 text-herbal-400" />
              <span>{isEn ? 'Share Plan' : 'Chia Sẻ Kế Hoạch'}</span>
            </button>

            <Link
              to="/trao-doi-cay"
              className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <span>{isEn ? 'Find Seeds' : 'Tìm Cây Giống'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Modal Chia Sẻ Bài Toán ROI */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={isEn ? `Urban Farming ROI Forecast: ${activeModel.titleEn}` : `Kế Hoạch ROI Nông Nghiệp Đô Thị: ${activeModel.titleVi}`}
        text={isEn
          ? `Estimated monthly yield: ${formatVND(monthlyNetProfit)} (${annualRoiPercentage}% ROI/yr), breakeven in ${breakEvenMonths} months for ${potCount} pots.`
          : `Lợi nhuận ròng dự kiến: ${formatVND(monthlyNetProfit)}/tháng (ROI ${annualRoiPercentage}%/năm), hoàn vốn sau ${breakEvenMonths} tháng cho ${potCount} chậu.`}
        url="https://yeutrongcay.com/kiem-tien-tu-vuon"
        badge={isEn ? 'Urban Micro-Farming' : 'Nông Nghiệp Đô Thị'}
      />

    </div>
  );
};
