/**
 * SmartIrrigationSolarEngine.ts
 * Thuật toán tính toán thủy lực tưới nhỏ giọt tự động,
 * định cỡ công suất tấm pin năng lượng mặt trời (Solar PV Sizing),
 * dung lượng ắc quy dự phòng và cấu hình vi điều khiển IoT ESP32 ban công.
 */

export interface IrrigationSolarInput {
  totalPots: number;          // Số lượng chậu cây (4 - 40 chậu)
  balconyLengthMeters: number;// Chiều dài ban công (mét)
  plantWaterDemand: 'low_succulent' | 'medium_herbal' | 'high_vegetable';
  peakSunHoursPerDay?: number;// Số giờ nắng đỉnh (mặc định 4.5h tại VN)
  rainAutonomyDays?: number;  // Số ngày dự phòng khi mưa liên tục (mặc định 3 ngày)
}

export interface SmartIrrigationResult {
  dailyWaterRequirementLiters: number;
  dripperCount: number;
  dripperFlowRateLph: number;     // Lưu lượng mỗi đầu nhỏ giọt (Lít/giờ)
  pumpRuntimeMinutesDaily: number;// Thời gian bật máy bơm mỗi ngày
  recommendedPumpModelVi: string;
  recommendedPumpModelEn: string;
  dailyEnergyConsumptionWh: number;// Năng lượng tiêu thụ hàng ngày (Watt-giờ)
  solarPanelWattageRecommendation: number;// Công suất tấm pin Solar (Watt)
  batteryCapacityAhRecommendation: number;// Dung lượng bình ắc quy 12V (Ah)
  esp32PinoutGuide: {
    pinName: string;
    component: string;
    functionVi: string;
    functionEn: string;
  }[];
  billOfMaterials: {
    itemVi: string;
    itemEn: string;
    quantity: string;
    estimatedCostVnd: number;
  }[];
  totalKitCostVnd: number;
  waterSavingsPercent: number; // Tiết kiệm so với tưới vòi thông thường
}

export function calculateSmartIrrigationSolar(input: IrrigationSolarInput): SmartIrrigationResult {
  const pots = Math.max(2, Math.min(60, input.totalPots || 14));
  const length = Math.max(1.0, Math.min(15.0, input.balconyLengthMeters || 3.0));
  const sunHours = input.peakSunHoursPerDay ?? 4.2;
  const autonomyDays = input.rainAutonomyDays ?? 3;

  // Lượng nước tiêu thụ trung bình mỗi chậu/ngày (Lít)
  let waterPerPotDaily = 0.25; // Trung bình thảo dược ~ 250ml/ngày
  if (input.plantWaterDemand === 'low_succulent') waterPerPotDaily = 0.08;
  if (input.plantWaterDemand === 'high_vegetable') waterPerPotDaily = 0.50;

  const totalWaterDaily = Number((pots * waterPerPotDaily).toFixed(2));

  // Thủy lực tưới: Dùng đầu nhỏ giọt bù áp (Pressure-Compensating Drippers) 2 Lít/giờ
  const flowRateLph = 2.0;
  // Mỗi chậu 1 đầu nhỏ giọt (chậu lớn > 15L thì 2 đầu)
  const drippers = pots;
  const systemFlowRateTotal = drippers * flowRateLph; // Lít/giờ

  // Thời gian bơm chạy để cấp đủ nước: T = (Tổng lít / Lưu lượng hệ thống) * 60 phút
  const pumpRuntimeMinutes = Math.max(3, Math.ceil((totalWaterDaily / systemFlowRateTotal) * 60));

  // Năng lượng: Sử dụng bơm màng mini 12V DC (công suất 24W)
  const pumpPowerWatts = 24;
  const pumpEnergyWh = (pumpPowerWatts * pumpRuntimeMinutes) / 60;

  // Vi điều khiển ESP32 chạy chế độ Deep Sleep, thức dậy đọc cảm biến độ ẩm đất mỗi 30 phút:
  // Công suất trung bình cả ngày ~ 0.35W -> Tiêu thụ 0.35W * 24h = 8.4 Wh
  const esp32EnergyWh = 8.4;
  const totalDailyEnergyWh = Number((pumpEnergyWh + esp32EnergyWh).toFixed(1));

  // Định cỡ Tấm Pin Năng Lượng Mặt Trời (Solar PV Sizing)
  // Hiệu suất hệ thống (bụi bẩn, suy hao nạp xả) ~ 70%
  // P_solar = (E_daily / (PeakSunHours * 0.7))
  const rawSolarWatts = totalDailyEnergyWh / (sunHours * 0.7);
  // Quy chuẩn về kích thước tấm pin thương mại có sẵn: 10W, 15W, 20W, 30W
  let solarWatts = 10;
  if (rawSolarWatts > 20) solarWatts = 30;
  else if (rawSolarWatts > 12) solarWatts = 20;
  else if (rawSolarWatts > 8) solarWatts = 15;

  // Định cỡ Ắc Quy / Pin Lithium 12V (Battery Sizing)
  // Cần cấp điện liên tục cho 3 ngày mưa (autonomyDays) với độ xả sâu DoD = 60%
  // Dung lượng Ah = (E_daily * Days) / (12V * 0.6)
  const rawBatteryAh = (totalDailyEnergyWh * autonomyDays) / (12 * 0.6);
  // Quy chuẩn về bình 12V có sẵn trên thị trường: 5Ah, 7Ah, 9Ah, 12Ah
  let batteryAh = 5;
  if (rawBatteryAh > 7.5) batteryAh = 12;
  else if (rawBatteryAh > 5.5) batteryAh = 9;
  else if (rawBatteryAh > 3.8) batteryAh = 7;

  // Sơ đồ chân cắm ESP32 vi khí hậu
  const pinouts = [
    {
      pinName: 'GPIO 34 (ADC1_CH6)',
      component: 'Cảm biến độ ẩm đất điện dung v1.2',
      functionVi: 'Đọc điện áp analog độ ẩm rễ (chống ăn mòn điện phân so với loại trở kháng).',
      functionEn: 'Reads analog soil moisture voltage (capacitive probe resists electrochemical corrosion).',
    },
    {
      pinName: 'GPIO 21 (SDA) & GPIO 22 (SCL)',
      component: 'Cảm biến vi khí hậu I2C (SHT30 / BME280)',
      functionVi: 'Đo nhiệt độ (°C) và độ ẩm không khí (%RH) quanh tầng lá.',
      functionEn: 'Measures ambient air temperature (°C) and relative humidity (%RH) around leaf canopy.',
    },
    {
      pinName: 'GPIO 25',
      component: 'Mạch Relay cách ly Opto 12V DC',
      functionVi: 'Kích hoạt đóng ngắt máy bơm tưới khi độ ẩm đất tụt dưới 35%.',
      functionEn: 'Triggers 12V DC diaphragm pump when soil moisture drops below 35% threshold.',
    },
    {
      pinName: 'GPIO 35',
      component: 'Cảm biến cường độ ánh sáng quang trở LDR',
      functionVi: 'Nhận biết ngày/đêm để tránh bơm tưới vào thời điểm nắng gắt giữa trưa.',
      functionEn: 'Detects day/night light transitions to inhibit watering during peak midday sun.',
    },
  ];

  // Bảng kê vật tư chi tiết (BOM)
  const tubingLength = Math.ceil(length * 1.5 + 2);
  const bom = [
    {
      itemVi: `Tấm pin năng lượng mặt trời Mono ${solarWatts}W (Có khung nhôm)`,
      itemEn: `Monocrystalline Solar Panel ${solarWatts}W`,
      quantity: '1 tấm',
      estimatedCostVnd: solarWatts <= 15 ? 165000 : 250000,
    },
    {
      itemVi: 'Bộ điều khiển sạc Solar PWM 10A (Bảo vệ chống xả cạn)',
      itemEn: 'Solar PWM Charge Controller 10A 12V',
      quantity: '1 bộ',
      estimatedCostVnd: 85000,
    },
    {
      itemVi: `Bình ắc quy khô viễn thông 12V ${batteryAh}Ah (hoặc pack pin Lithium 18650)`,
      itemEn: `Sealed Lead-Acid / Lithium 12V ${batteryAh}Ah Battery`,
      quantity: '1 bình',
      estimatedCostVnd: batteryAh <= 7 ? 195000 : 280000,
    },
    {
      itemVi: 'Bơm màng mini áp lực 12V DC tự mồi (Lưu lượng 3.5L/phút)',
      itemEn: 'Mini 12V DC Diaphragm Self-Priming Water Pump',
      quantity: '1 chiếc',
      estimatedCostVnd: 125000,
    },
    {
      itemVi: 'Kit ESP32 NodeMCU + Cảm biến độ ẩm điện dung + Relay 1 kênh',
      itemEn: 'ESP32 IoT Dev Kit + Capacitive Soil Sensor + Relay Module',
      quantity: '1 combo',
      estimatedCostVnd: 145000,
    },
    {
      itemVi: `Cuộn dây dẫn PE 6mm chống UV (${tubingLength} mét) + ${drippers} đầu nhỏ giọt bù áp`,
      itemEn: `UV-Resistant PE 6mm Tubing (${tubingLength}m) + ${drippers} PC Drippers`,
      quantity: '1 bộ',
      estimatedCostVnd: 95000,
    },
  ];

  const totalCost = bom.reduce((acc, curr) => acc + curr.estimatedCostVnd, 0);

  return {
    dailyWaterRequirementLiters: totalWaterDaily,
    dripperCount: drippers,
    dripperFlowRateLph: flowRateLph,
    pumpRuntimeMinutesDaily: pumpRuntimeMinutes,
    recommendedPumpModelVi: 'Bơm màng mini 12V DC công suất 24W áp lực 0.48 MPa tự mồi',
    recommendedPumpModelEn: '12V DC 24W Mini Diaphragm Pump, 0.48 MPa self-priming',
    dailyEnergyConsumptionWh: totalDailyEnergyWh,
    solarPanelWattageRecommendation: solarWatts,
    batteryCapacityAhRecommendation: batteryAh,
    esp32PinoutGuide: pinouts,
    billOfMaterials: bom,
    totalKitCostVnd: totalCost,
    waterSavingsPercent: 55, // Tiết kiệm 55% nước nhờ tưới thẳng vào gốc theo độ ẩm thật
  };
}
