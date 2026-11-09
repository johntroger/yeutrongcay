import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SEASONAL_CALENDAR_DATA } from '../src/data/seasonalCalendar.ts';
import { SEED_PLANTS } from '../src/data/plants.ts';

// 1. Kiểm tra tính toàn vẹn của dữ liệu Lịch Nông Vụ 12 tháng 3 miền
test('Seasonal Calendar: Complete 12 months with valid regions and required fields', () => {
  assert.equal(Object.keys(SEASONAL_CALENDAR_DATA).length, 12, 'Must contain all 12 months');

  const requiredRegions = ['north', 'central', 'south'];

  for (let m = 1; m <= 12; m++) {
    const monthData = SEASONAL_CALENDAR_DATA[m];
    assert.ok(monthData, `Month ${m} must exist`);
    assert.equal(monthData.month, m);
    assert.ok(monthData.title_vi?.length > 0, `Month ${m} title_vi missing`);
    assert.ok(monthData.title_en?.length > 0, `Month ${m} title_en missing`);
    assert.ok(monthData.solar_term_vi?.length > 0, `Month ${m} solar_term_vi missing`);
    assert.ok(monthData.solar_term_en?.length > 0, `Month ${m} solar_term_en missing`);

    for (const r of requiredRegions) {
      const regionData = monthData.regions[r];
      assert.ok(regionData, `Month ${m} region ${r} must exist`);
      assert.ok(regionData.climate_tag?.length > 0, `Month ${m} ${r} climate_tag missing`);
      assert.ok(regionData.climate_desc?.length > 0, `Month ${m} ${r} climate_desc missing`);
      assert.ok(Array.isArray(regionData.tasks) && regionData.tasks.length >= 2, `Month ${m} ${r} must have at least 2 tasks`);
      assert.ok(regionData.pest_alert?.length > 0, `Month ${m} ${r} pest_alert missing`);
      assert.ok(regionData.pro_tip?.length > 0, `Month ${m} ${r} pro_tip missing`);
      assert.ok(Array.isArray(regionData.recommended_plant_ids) && regionData.recommended_plant_ids.length > 0, `Month ${m} ${r} recommended_plant_ids missing`);
    }
  }
});

// 2. Kiểm tra không có ID cây nào bị mồ côi (mọi recommended_plant_id đều có trong SEED_PLANTS)
test('Seasonal Calendar: Every recommended_plant_id corresponds to a valid plant in SEED_PLANTS', () => {
  const seedPlantIdSet = new Set(SEED_PLANTS.map(p => p.id));
  const missingPlantIds = [];

  for (let m = 1; m <= 12; m++) {
    const monthData = SEASONAL_CALENDAR_DATA[m];
    for (const r of ['north', 'central', 'south']) {
      const ids = monthData.regions[r].recommended_plant_ids;
      for (const id of ids) {
        if (!seedPlantIdSet.has(id)) {
          missingPlantIds.push({ month: m, region: r, missingId: id });
        }
      }
    }
  }

  assert.equal(missingPlantIds.length, 0, `Found broken plant IDs in calendar: ${JSON.stringify(missingPlantIds)}`);
});

// 3. Kiểm tra logic tính toán tiến độ Checklist làm vườn
test('Seasonal Calendar: Interactive checklist progress calculation', () => {
  const tasks = ['Tưới nước ấm trưa', 'Phủ trấu giữ ấm rễ', 'Tỉa cành đón lộc'];
  const month = 1;
  const region = 'north';

  const calculateProgress = (completedState) => {
    const completedCount = tasks.reduce((acc, _, idx) => {
      const key = `${month}_${region}_${idx}`;
      return acc + (completedState[key] ? 1 : 0);
    }, 0);
    const total = tasks.length;
    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    return { completedCount, total, percent, isAllDone: completedCount === total };
  };

  // Trạng thái ban đầu chưa làm gì
  const s0 = calculateProgress({});
  assert.equal(s0.completedCount, 0);
  assert.equal(s0.percent, 0);
  assert.equal(s0.isAllDone, false);

  // Đã làm 1 việc
  const s1 = calculateProgress({ '1_north_0': true });
  assert.equal(s1.completedCount, 1);
  assert.equal(s1.percent, 33);
  assert.equal(s1.isAllDone, false);

  // Đã làm 2 việc
  const s2 = calculateProgress({ '1_north_0': true, '1_north_1': true });
  assert.equal(s2.completedCount, 2);
  assert.equal(s2.percent, 67);
  assert.equal(s2.isAllDone, false);

  // Hoàn thành cả 3 việc
  const s3 = calculateProgress({ '1_north_0': true, '1_north_1': true, '1_north_2': true });
  assert.equal(s3.completedCount, 3);
  assert.equal(s3.percent, 100);
  assert.equal(s3.isAllDone, true);
});

// 4. Kiểm tra bộ lọc danh mục và cây dễ trồng (beginner-friendly)
test('Seasonal Calendar: Filter plants by category and beginner friendliness', () => {
  const samplePlants = [
    { id: 'p1', category: 'herb', propagation_difficulty: 1 },
    { id: 'p2', category: 'herb', propagation_difficulty: 3 },
    { id: 'p3', category: 'fruit', propagation_difficulty: 2 },
    { id: 'p4', category: 'ornamental', propagation_difficulty: 4 },
  ];

  const filterPlants = (plants, filter) => {
    return plants.filter((p) => {
      if (filter === 'all') return true;
      if (filter === 'beginner') return (p.propagation_difficulty ?? 1) <= 2;
      return p.category === filter;
    });
  };

  assert.equal(filterPlants(samplePlants, 'all').length, 4);
  assert.equal(filterPlants(samplePlants, 'herb').length, 2);
  assert.equal(filterPlants(samplePlants, 'fruit').length, 1);
  assert.equal(filterPlants(samplePlants, 'ornamental').length, 1);
  assert.equal(filterPlants(samplePlants, 'beginner').length, 2); // p1 (diff 1), p3 (diff 2)
});
