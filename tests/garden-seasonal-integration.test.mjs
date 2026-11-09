import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  matchGardenPlantToSeedPlant,
  evaluatePlantSeasonality
} from '../src/utils/gardenSeasonalIntegration.ts';
import { SEED_PLANTS } from '../src/data/plants.ts';

// 1. Kiểm tra khớp cây trong vườn người dùng với kho giống SEED_PLANTS
test('Garden-Seasonal Matcher: Matches garden plants by ID or common name', () => {
  const mockGardenPlant1 = {
    id: 'gp-101',
    garden_id: 'gdn-01',
    plant_id: 'herb-01',
    custom_name: 'Húng Chanh Trị Ho Ban Công',
    planted_date: '2026-10-01',
    pot_type: 'Chậu 35cm',
    current_status: 'healthy',
    cover_image_url: '/logo.jpg'
  };

  const match1 = matchGardenPlantToSeedPlant(mockGardenPlant1, SEED_PLANTS);
  assert.ok(match1, 'Must find seed plant for herb-01');
  assert.equal(match1.id, 'herb-01');
  assert.equal(match1.common_name, 'Húng Chanh');

  // Khớp fallback bằng tên
  const mockGardenPlant2 = {
    id: 'gp-102',
    garden_id: 'gdn-01',
    custom_name: 'Dâu Tây Đà Lạt',
    planted_date: '2026-10-15',
    pot_type: 'Thùng xốp',
    current_status: 'healthy',
    cover_image_url: '/logo.jpg'
  };

  const match2 = matchGardenPlantToSeedPlant(mockGardenPlant2, SEED_PLANTS);
  assert.ok(match2, 'Must match by name substring');
  assert.ok(match2.common_name.toLowerCase().includes('dâu tây'));
});

// 2. Kiểm tra đánh giá mùa vụ của cây theo tháng và miền
test('Garden-Seasonal Evaluator: Correctly identifies peak season vs maintenance season', () => {
  const hungChanh = SEED_PLANTS.find(p => p.id === 'herb-01');
  assert.ok(hungChanh, 'herb-01 must exist');

  // Húng chanh có best_months: [2, 3, 4, 8, 9, 10]
  // Tháng 3 -> Vụ vàng
  const evalMonth3 = evaluatePlantSeasonality(hungChanh, 3, 'north');
  assert.equal(evalMonth3.isPeakSeason, true);
  assert.equal(evalMonth3.statusLabelVi, 'Vụ Vàng Sinh Trưởng');
  assert.ok(evalMonth3.regionalAdviceVi.length > 0);

  // Tháng 12 -> Mùa giữ sức
  const evalMonth12 = evaluatePlantSeasonality(hungChanh, 12, 'north');
  assert.equal(evalMonth12.isPeakSeason, false);
  assert.equal(evalMonth12.statusLabelVi, 'Chăm Sóc Giữ Sức');
  assert.ok(evalMonth12.warningVi.length > 0);
});
