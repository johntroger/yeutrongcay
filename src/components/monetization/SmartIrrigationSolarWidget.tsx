import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Zap,
  CheckCircle2,
  Coins
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import {
  calculateSmartIrrigationSolar,
  SmartIrrigationResult
} from '../../engines/monetization/SmartIrrigationSolarEngine.ts';

export const SmartIrrigationSolarWidget: React.FC = () => {
  const { isEn } = useLanguage();

  const [totalPots, setTotalPots] = useState<number>(16);
  const [balconyLength, setBalconyLength] = useState<number>(3.5);
  const [waterDemand, setWaterDemand] = useState<'low_succulent' | 'medium_herbal' | 'high_vegetable'>('medium_herbal');

  const sizing: SmartIrrigationResult = useMemo(() => {
    return calculateSmartIrrigationSolar({
      totalPots,
      balconyLengthMeters: balconyLength,
      plantWaterDemand: waterDemand,
    });
  }, [totalPots, balconyLength, waterDemand]);

  return (
    <div className="bg-white dark:bg-charcoal-900 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-sm transition-all">
      {/* Header Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-50 dark:border-forest-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2 border border-blue-200 dark:border-blue-800">
            <Cpu className="w-3.5 h-3.5" />
            <span>{isEn ? 'Smart Irrigation & Solar Sizer' : 'Định Cỡ Tưới Nhỏ Giọt & Năng Lượng Mặt Trời'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-forest-950 dark:text-cream-50">
            {isEn ? 'IoT Solar Micro-Grid & Automated Drip Calculator' : 'Hệ Thống Tưới Thông Minh IoT & Điện Mặt Trời Độc Lập'}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-700 dark:text-forest-200 mt-1">
            {isEn
              ? 'Calculate daily water hydraulics, ESP32 deep-sleep energy load, and solar panel/battery sizing.'
              : 'Tính toán chính xác kích thước tấm pin Solar, bình ắc quy dự phòng 3 ngày mưa và cấu hình chân cắm ESP32.'}
          </p>
        </div>
      </div>

      {/* Điều khiển thông số */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-forest-50 dark:border-forest-800">
        {/* Số chậu cây */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-forest-900 dark:text-cream-100">
              {isEn ? 'Total Pot Count' : 'Số Lượng Chậu Cây'}
            </label>
            <span className="text-xs font-mono font-bold text-herbal-700 dark:text-herbal-300 bg-herbal-50 dark:bg-herbal-950/60 px-2 py-0.5 rounded-md border border-herbal-200 dark:border-herbal-800">
              {totalPots} chậu
            </span>
          </div>
          <input
            type="range"
            min="6"
            max="40"
            step="2"
            value={totalPots}
            onChange={(e) => setTotalPots(Number(e.target.value))}
            className="w-full accent-herbal-600 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Chiều dài ban công */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-forest-900 dark:text-cream-100">
              {isEn ? 'Tubing Run Length' : 'Chiều Dài Ban Công (Đường Ống)'}
            </label>
            <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
              {balconyLength} mét
            </span>
          </div>
          <input
            type="range"
            min="1.5"
            max="10.0"
            step="0.5"
            value={balconyLength}
            onChange={(e) => setBalconyLength(Number(e.target.value))}
            className="w-full accent-blue-600 h-2 bg-cream-200 dark:bg-charcoal-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Nhu cầu nước cây trồng */}
        <div>
          <label className="text-xs font-bold text-forest-900 dark:text-cream-100 mb-1.5 block">
            {isEn ? 'Plant Water Demand' : 'Loại Cây Trồng'}
          </label>
          <select
            value={waterDemand}
            onChange={(e) => setWaterDemand(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl border border-forest-200 dark:border-forest-700 bg-cream-50 dark:bg-charcoal-800 text-xs font-semibold text-forest-950 dark:text-cream-50 focus:outline-none focus:ring-2 focus:ring-herbal-500"
          >
            <option value="low_succulent">Sen đá, xương rồng (Ít nước)</option>
            <option value="medium_herbal">Thảo dược, cây thuốc (Vừa phải)</option>
            <option value="high_vegetable">Rau ăn lá, cây ăn quả (Nhiều nước)</option>
          </select>
        </div>
      </div>

      {/* Sơ đồ mạch điện & Thủy lực tưới */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Cột trái: Sơ đồ khối Solar + IoT ESP32 (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="font-serif font-bold text-base text-forest-950 dark:text-cream-50 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Sơ Đồ Kết Nối Điện Mặt Trời & Thủy Lực Tự Động</span>
          </h4>

          {/* Sơ đồ khối trực quan SVG */}
          <div className="p-4 rounded-2xl bg-cream-50/70 dark:bg-charcoal-800/60 border border-forest-100 dark:border-forest-800">
            <svg viewBox="0 0 500 160" className="w-full h-auto text-xs">
              {/* Tấm Pin Solar */}
              <rect x="15" y="30" width="90" height="90" rx="8" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="2" />
              <text x="60" y="70" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="10">Pin Solar</text>
              <text x="60" y="85" textAnchor="middle" fill="#93C5FD" fontWeight="bold" fontSize="12">{sizing.solarPanelWattageRecommendation}W</text>

              {/* Dây sang Bộ sạc PWM */}
              <line x1="105" y1="75" x2="145" y2="75" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />

              {/* Bộ điều khiển sạc */}
              <rect x="145" y="45" width="80" height="60" rx="8" fill="#15803D" stroke="#22C55E" strokeWidth="2" />
              <text x="185" y="72" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="9">Sạc PWM 10A</text>
              <text x="185" y="86" textAnchor="middle" fill="#BBF7D0" fontSize="8">Bảo vệ nạp/xả</text>

              {/* Dây xuống Bình ắc quy */}
              <line x1="185" y1="105" x2="185" y2="125" stroke="#EF4444" strokeWidth="2" />
              <rect x="145" y="125" width="80" height="30" rx="4" fill="#374151" stroke="#9CA3AF" />
              <text x="185" y="143" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">Ắc quy 12V {sizing.batteryCapacityAhRecommendation}Ah</text>

              {/* Dây sang Vi điều khiển ESP32 */}
              <line x1="225" y1="75" x2="265" y2="75" stroke="#10B981" strokeWidth="2" />

              {/* ESP32 Controller */}
              <rect x="265" y="45" width="95" height="60" rx="8" fill="#4338CA" stroke="#6366F1" strokeWidth="2" />
              <text x="312" y="70" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="9">IoT ESP32 Node</text>
              <text x="312" y="84" textAnchor="middle" fill="#C7D2FE" fontSize="8">Cảm biến ẩm đất</text>

              {/* Dây sang Bơm màng */}
              <line x1="360" y1="75" x2="400" y2="75" stroke="#06B6D4" strokeWidth="2" />

              {/* Bơm màng mini */}
              <rect x="400" y="45" width="85" height="60" rx="8" fill="#0E7490" stroke="#06B6D4" strokeWidth="2" />
              <text x="442" y="70" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="9">Bơm 12V DC</text>
              <text x="442" y="84" textAnchor="middle" fill="#CFFAFE" fontSize="8">{sizing.pumpRuntimeMinutesDaily} phút/ngày</text>
            </svg>
          </div>

          {/* Hướng dẫn chân cắm GPIO */}
          <div className="space-y-1.5 text-xs">
            <span className="font-bold text-forest-900 dark:text-cream-100 uppercase tracking-wider block">
              Bản Đồ Chân Cắm ESP32 Chuẩn:
            </span>
            {sizing.esp32PinoutGuide.map((pin, pIdx) => (
              <div key={pIdx} className="p-2.5 rounded-xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800 flex items-start gap-2">
                <span className="font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded text-[11px] shrink-0">
                  {pin.pinName}
                </span>
                <span className="text-charcoal-700 dark:text-forest-200 text-[11px]">
                  <strong>{pin.component}</strong>: {isEn ? pin.functionEn : pin.functionVi}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cột phải: Bảng vật tư & Sizing năng lượng (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Snapshot Thủy lực & Điện */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-[11px] text-blue-900 dark:text-blue-300 font-semibold block">Nước Cần Tưới/Ngày</span>
              <p className="text-lg font-bold font-mono text-blue-950 dark:text-blue-100 mt-0.5">
                {sizing.dailyWaterRequirementLiters} <span className="text-xs font-normal">Lít/ngày</span>
              </p>
              <span className="text-[10px] text-blue-700 dark:text-blue-400">Tiết kiệm 55% nước</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
              <span className="text-[11px] text-amber-900 dark:text-amber-300 font-semibold block">Tấm Pin Năng Lượng</span>
              <p className="text-lg font-bold font-mono text-amber-950 dark:text-amber-100 mt-0.5">
                {sizing.solarPanelWattageRecommendation} W
              </p>
              <span className="text-[10px] text-amber-700 dark:text-amber-400">Bình ắc quy {sizing.batteryCapacityAhRecommendation}Ah</span>
            </div>
          </div>

          {/* Bảng Kê Vật Tư Trọn Gói (BOM) */}
          <div className="p-4 rounded-2xl bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-forest-900 dark:text-cream-50 uppercase flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-600" />
                <span>Bảng Kê Vật Tư Tự Ráp (BOM)</span>
              </span>
              <span className="text-xs font-bold font-mono text-herbal-700 dark:text-herbal-300">
                Tổng: {sizing.totalKitCostVnd.toLocaleString('vi-VN')} đ
              </span>
            </div>

            <div className="divide-y divide-forest-50 dark:divide-forest-700/60 text-xs">
              {sizing.billOfMaterials.map((item, bIdx) => (
                <div key={bIdx} className="py-2 flex justify-between items-center text-[11px]">
                  <span className="text-charcoal-700 dark:text-forest-200 pr-2">
                    {isEn ? item.itemEn : item.itemVi}
                  </span>
                  <span className="font-mono font-semibold shrink-0 text-forest-950 dark:text-cream-50">
                    {item.estimatedCostVnd.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-forest-900 text-white text-xs">
            <p className="text-herbal-300 font-bold mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-herbal-400" />
              <span>Chống Ăn Mòn Điện Phân:</span>
            </p>
            <p className="text-forest-200 leading-relaxed text-[11px]">
              Bắt buộc dùng cảm biến độ ẩm điện dung (Capacitive v1.2) bọc sơn chống thấm. Tuyệt đối không dùng cảm biến điện trở chân trần sẽ bị rỉ sét mục gãy sau 2 tuần cắm trong đất ẩm!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
