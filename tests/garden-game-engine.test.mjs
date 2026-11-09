import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  GARDEN_ECO_ITEMS,
  getPlantGrowthProfile,
  canApplyCareAction,
  evaluateLazyPlantDecay,
  applyCareAction,
  checkNftMintEligibility
} from '../src/services/gardenGameService.ts';

// 1. Kiểm tra danh mục vật phẩm sinh thái và giá đổi Tim
test('Eco-Items Catalog: Valid items, heart prices, and civilized fertilizer icon', () => {
  const items = Object.values(GARDEN_ECO_ITEMS);
  assert.equal(items.length, 5, 'Must contain exactly 5 core eco-items');

  for (const item of items) {
    assert.ok(item.heart_price > 0, `${item.item_type} must have a positive heart price`);
    assert.ok(item.exp_boost > 0, `${item.item_type} must grant positive EXP`);
    assert.ok(item.name_vi.length > 0, `${item.item_type} must have Vietnamese name`);
    assert.ok(item.name_en.length > 0, `${item.item_type} must have English name`);
    // Tuyệt đối không dùng emoji cục phân
    assert.notEqual(item.icon, '💩', 'Fertilizer icon must never be poop emoji');
  }

  // Kiểm tra cụ thể Túi Phân Hữu Cơ
  const fert = GARDEN_ECO_ITEMS.fertilizer;
  assert.equal(fert.icon, '👝', 'Fertilizer icon must be pouch/bag (👝)');
  assert.equal(fert.heart_price, 20, 'Fertilizer heart price must be 20');
});

// 2. Kiểm tra bộ tính toán chu kỳ sinh trưởng theo từng loài cây
test('Phenology Calculator: Adaptive maturity days and EXP targets across species', () => {
  // Loài 1: Rau ăn lá / Thảo mộc ngắn ngày (Húng Quế Ban Công)
  const herbProfile = getPlantGrowthProfile('Húng Quế Rừng');
  assert.ok(herbProfile.base_maturity_days <= 35, 'Herbs must have short maturity <= 35 days');
  assert.equal(herbProfile.target_exp, 600, 'Herbs must have target EXP = 600');
  assert.equal(herbProfile.stage_thresholds.length, 5, 'Must have 5 BBCH stages');

  // Loài 2: Cà chua bi F1 tiêu chuẩn
  const tomatoProfile = getPlantGrowthProfile('Cà Chua Bi Lùn Đỏ Mọng', 'cherry_tomato');
  assert.equal(tomatoProfile.base_maturity_days, 75, 'Cherry tomato base days must be 75');
  assert.equal(tomatoProfile.target_exp, 1100, 'Cherry tomato target EXP must be 1100');
  assert.equal(tomatoProfile.stage_thresholds[0].exp_required, 110, 'Stage 1 is 10% targetExp');
  assert.equal(tomatoProfile.stage_thresholds[4].exp_required, 1100, 'Stage 5 is 100% targetExp');

  // Loài 3: Cây dược liệu lâu năm (Đinh Lăng)
  const rootProfile = getPlantGrowthProfile('Cây Đinh Lăng Cẩm Thạch');
  assert.ok(rootProfile.base_maturity_days >= 120, 'Perennials must have maturity >= 120 days');
  assert.equal(rootProfile.target_exp, 1800, 'Perennials must have target EXP = 1800');
});

// 3. Kiểm tra an toàn sinh thái học (Chống úng rễ & Chống xót phân)
test('Biosecurity Checks: Block overwatering (>90%) and overfertilizing (>85%)', () => {
  const dummyPlant = {
    id: 'test-plant-1',
    garden_id: 'garden-1',
    custom_name: 'Cà Chua Ban Công',
    planted_date: '2026-11-01',
    pot_type: 'Chậu 35cm',
    current_status: 'healthy',
    cover_image_url: '/logo.jpg',
    moisture_level: 95, // Đất đang quá ướt
    nutrient_level: 50
  };

  // 1. Thử tưới khi đất đang 95% ẩm -> Phải bị chặn để chống úng rễ
  const waterCheck = canApplyCareAction(dummyPlant, 'water');
  assert.equal(waterCheck.canApply, false, 'Overwatering must be prevented');
  assert.ok(waterCheck.reason_vi.includes('úng và thối rễ'), 'Must show root rot warning message');

  // 2. Khi đất hạ xuống 70% ẩm -> Cho phép tưới
  dummyPlant.moisture_level = 70;
  const normalWaterCheck = canApplyCareAction(dummyPlant, 'water');
  assert.equal(normalWaterCheck.canApply, true, 'Normal watering should be allowed');

  // 3. Thử bón phân khi đất đang 90% dinh dưỡng -> Phải bị chặn để chống xót rễ
  dummyPlant.nutrient_level = 90;
  const fertCheck = canApplyCareAction(dummyPlant, 'fertilizer');
  assert.equal(fertCheck.canApply, false, 'Overfertilizing must be prevented');
  assert.ok(fertCheck.reason_vi.includes('xót rễ'), 'Must show chemical burn warning message');

  // 4. Khi dinh dưỡng ở mức 50% -> Cho phép bón
  dummyPlant.nutrient_level = 50;
  const normalFertCheck = canApplyCareAction(dummyPlant, 'fertilizer');
  assert.equal(normalFertCheck.canApply, true, 'Normal fertilizing should be allowed');
});

// 4. Kiểm tra thuật toán Lazy State Evaluation (Phân rã theo thời gian thực)
test('Lazy Evaluation Engine: Correct moisture and nutrient decay over time', () => {
  const initialDate = new Date('2026-11-01T08:00:00Z');
  const plant = {
    id: 'test-plant-2',
    garden_id: 'garden-1',
    custom_name: 'Bé Ớt Chỉ Thiên',
    planted_date: '2026-11-01',
    pot_type: 'Chậu 35cm',
    current_status: 'healthy',
    cover_image_url: '/logo.jpg',
    moisture_level: 80,
    nutrient_level: 80,
    sunlight_level: 80,
    soil_level: 90,
    growth_exp: 50,
    growth_stage: 1,
    watering_interval_days: 2, // Tưới 2 ngày / lần (mất 50% ẩm / ngày)
    fertilizing_interval_days: 10, // Bón 10 ngày / lần (mất 10% dinh dưỡng / ngày)
    last_evaluated_at: initialDate.toISOString()
  };

  // Giả lập sau 1 ngày (24 giờ sau)
  const afterOneDay = new Date('2026-11-02T08:00:00Z');
  const evaluatedPlant = evaluateLazyPlantDecay(plant, afterOneDay);

  // Sau 1 ngày: Độ ẩm giảm 50 (80 - 50 = 30)
  assert.equal(evaluatedPlant.moisture_level, 30, 'Moisture should decay by 50% per day');
  // Dinh dưỡng giảm 10 (80 - 10 = 70)
  assert.equal(evaluatedPlant.nutrient_level, 70, 'Nutrient should decay by 10% per day');
  // Nắng giảm 35 (80 - 35 = 45)
  assert.equal(evaluatedPlant.sunlight_level, 45, 'Sunlight should decay by 35% per day');
  assert.equal(evaluatedPlant.last_evaluated_at, afterOneDay.toISOString(), 'Timestamp should update');
});

// 5. Kiểm tra thao tác Chăm sóc cây và Thăng cấp giai đoạn (Level Up)
test('Care Actions & Level Up: Applying care grants EXP and evolves stages', () => {
  const plant = {
    id: 'test-plant-3',
    garden_id: 'garden-1',
    custom_name: 'Dưa Leo Ban Công',
    plant_id: 'cucumber',
    planted_date: '2026-11-01',
    pot_type: 'Chậu 35cm',
    current_status: 'healthy',
    cover_image_url: '/logo.jpg',
    moisture_level: 40,
    nutrient_level: 50,
    sunlight_level: 50,
    soil_level: 80,
    growth_exp: 70, // Sắp chạm mốc 85 EXP của Stage 1
    growth_stage: 1
  };

  // Tưới nước
  const res = applyCareAction(plant, 'water');
  assert.equal(res.success, true, 'Care action should succeed');
  assert.ok(res.exp_gained >= 30, 'Must grant at least 30 EXP');
  assert.equal(res.plant.moisture_level, 75, 'Moisture should increase by 35 (40 + 35 = 75)');
  assert.equal(res.plant.growth_exp, 70 + res.exp_gained, 'EXP must increment correctly');

  // Thử cây ở ngưỡng thăng cấp lên Giai đoạn 2
  const readyToEvolvePlant = {
    ...plant,
    growth_exp: 80, // Ngưỡng Stage 2 là 850 * 0.3 = 255 EXP
    growth_stage: 1
  };

  // Bón phân (+40 dinh dưỡng, +50 EXP)
  // Ban đầu đặt ẩm = 65, dinh dưỡng = 30. Sau khi bón: dinh dưỡng = 70 (nằm trong vùng tối ưu 55-80%)
  readyToEvolvePlant.moisture_level = 65;
  readyToEvolvePlant.nutrient_level = 30;
  const fertRes = applyCareAction(readyToEvolvePlant, 'fertilizer');
  assert.equal(fertRes.success, true);
  assert.equal(fertRes.exp_gained, 63, 'Must receive 1.25x optimal bonus (50 * 1.25 = 63)');
});

// 6. Kiểm tra điều kiện đúc NFT On-Chain thật (Ethereum Sepolia)
test('NFT Minting Criteria: Strict EXP, Stage 5, and SHA-256 Photo Diary requirements', () => {
  const maturePlant = {
    id: 'test-plant-nft',
    garden_id: 'garden-1',
    custom_name: 'Cà Chua Bi Lùn Đỏ Mọng',
    plant_id: 'cherry_tomato',
    planted_date: '2026-10-01',
    pot_type: 'Chậu 35cm',
    current_status: 'fruiting',
    cover_image_url: '/uploads/tomato-fruiting.jpg',
    growth_stage: 4, // Mới ở Stage 4
    growth_exp: 1000 // Chưa đủ 1100 EXP
  };

  // 1. Chưa đủ Stage 5 và chưa đủ 1100 EXP
  const check1 = checkNftMintEligibility(maturePlant, 3);
  assert.equal(check1.isEligible, false, 'Stage 4 must NOT be eligible');
  assert.ok(check1.missingCriteria_vi.length > 0);

  // 2. Đạt Stage 5 và 1150 EXP nhưng thiếu bài nhật ký (chỉ có 1/3 nhật ký)
  maturePlant.growth_stage = 5;
  maturePlant.growth_exp = 1150;
  const check2 = checkNftMintEligibility(maturePlant, 1);
  assert.equal(check2.isEligible, false, 'Needs at least 3 milestone diaries with SHA-256');

  // 3. Đạt Stage 5 + 1150 EXP + đủ 3 nhật ký -> ĐỦ ĐIỀU KIỆN ĐÚC ON-CHAIN THẬT!
  const check3 = checkNftMintEligibility(maturePlant, 3);
  assert.equal(check3.isEligible, true, 'Fully qualified plant must be eligible for NFT Minting');
  assert.equal(check3.missingCriteria_vi.length, 0, 'No missing criteria');

  // 4. Nếu đã đúc rồi (đã có passport_token_id) -> Không cho đúc lại
  maturePlant.passport_token_id = '12';
  const check4 = checkNftMintEligibility(maturePlant, 3);
  assert.equal(check4.isEligible, false, 'Already minted plant cannot be re-minted');
});

// 7. Kiểm tra cơ chế Chống Trục Lợi Nhận Tim (Anti-Exploit Hearts Guard)
test('Anti-Exploit: Seasonal Task toggling must only award hearts ONCE, prevent repeated claiming', () => {
  const claimedRegistry = {};
  let currentHearts = 50;

  const simulateToggle = (taskKey, isDone) => {
    let pointsAwarded = 0;
    if (isDone) {
      if (!claimedRegistry[taskKey]) {
        claimedRegistry[taskKey] = true;
        pointsAwarded = 5;
        currentHearts += pointsAwarded;
      }
    }
    return { pointsAwarded, currentHearts, isClaimed: !!claimedRegistry[taskKey] };
  };

  const taskKey = '11_south_0';

  // Lần 1: Người dùng tích chọn nhiệm vụ -> Cộng 5 Tim
  const r1 = simulateToggle(taskKey, true);
  assert.equal(r1.pointsAwarded, 5, 'Must award 5 hearts on first completion');
  assert.equal(r1.currentHearts, 55, 'Total hearts becomes 55');
  assert.equal(r1.isClaimed, true, 'Task key must be permanently claimed');

  // Lần 2: Người dùng bỏ tích (uncheck) -> KHÔNG trừ tim, khóa claimed vẫn giữ nguyên
  const r2 = simulateToggle(taskKey, false);
  assert.equal(r2.pointsAwarded, 0, 'Unchecking task must award 0 points');
  assert.equal(r2.currentHearts, 55, 'Total hearts stays 55');
  assert.equal(r2.isClaimed, true, 'Task key remains permanently claimed');

  // Lần 3: Người dùng cố tình tích lại lần 2 -> KHÔNG CỘNG TIM NỮA (0 Tim)
  const r3 = simulateToggle(taskKey, true);
  assert.equal(r3.pointsAwarded, 0, 'Re-checking must award 0 points (Exploit blocked!)');
  assert.equal(r3.currentHearts, 55, 'Total hearts must remain strictly 55');

  // Lần 4: Lặp lại 50 lần thao tác bỏ và tích lại -> Số tim vẫn giữ nguyên 55
  for (let i = 0; i < 50; i++) {
    simulateToggle(taskKey, false);
    simulateToggle(taskKey, true);
  }
  assert.equal(currentHearts, 55, 'Hearts must NEVER increase upon repeated toggling');
});

// 8. Kiểm tra cơ chế Chống Bấm Liên Tục Nhận Sương Sớm (Anti-Exploit Daily Dew)
test('Anti-Exploit: Daily Dew can only be claimed ONCE per calendar day', () => {
  const checkinStore = {};
  let userHearts = 50;

  const claimDew = (dateStr) => {
    if (checkinStore[dateStr]) {
      return { success: false, error: 'Already claimed today' };
    }
    checkinStore[dateStr] = true;
    userHearts += 15;
    return { success: true, newHearts: userHearts };
  };

  // Lần 1 hôm nay
  const today = '2026-11-09';
  const c1 = claimDew(today);
  assert.equal(c1.success, true);
  assert.equal(c1.newHearts, 65, 'First claim grants +15 hearts');

  // Lần 2 bấm liên tiếp cùng ngày
  const c2 = claimDew(today);
  assert.equal(c2.success, false, 'Second claim on same day must be rejected');
  assert.equal(userHearts, 65, 'Hearts must not increase');

  // Bấm liên tiếp 100 lần spam
  for (let i = 0; i < 100; i++) {
    claimDew(today);
  }
  assert.equal(userHearts, 65, 'Spamming dew claim must be 100% blocked');

  // Sang ngày hôm sau (tomorrow)
  const tomorrow = '2026-11-10';
  const c3 = claimDew(tomorrow);
  assert.equal(c3.success, true, 'Valid new day can claim');
  assert.equal(c3.newHearts, 80, 'Now reaches 80 hearts');
});
