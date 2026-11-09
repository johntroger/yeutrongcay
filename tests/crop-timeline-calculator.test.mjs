import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CROP_PRESETS,
  calculateForwardTimeline,
  calculateBackwardTimeline,
  formatDateISO,
  formatDateDisplay,
  parseDateSafe
} from '../src/utils/cropTimelineCalculator.ts';

// 1. Kiểm tra tính toàn vẹn của danh sách cây trồng cài sẵn
test('Crop Presets: Complete data with valid categories and milestones', () => {
  assert.ok(CROP_PRESETS.length >= 6, 'Must contain at least 6 popular urban crop presets');

  for (const crop of CROP_PRESETS) {
    assert.ok(crop.id?.length > 0, 'Crop ID must be non-empty');
    assert.ok(crop.name_vi?.length > 0, 'Crop name_vi must be non-empty');
    assert.ok(crop.total_days_to_harvest > 0, `${crop.id} harvest days must be positive`);
    assert.ok(Array.isArray(crop.milestones) && crop.milestones.length >= 3, `${crop.id} must have at least 3 milestones`);

    // Kiểm tra milestone cuối cùng trùng với ngày thu hoạch
    const lastMilestone = crop.milestones[crop.milestones.length - 1];
    assert.equal(lastMilestone.days_offset, crop.total_days_to_harvest, `${crop.id} last milestone offset must equal total days`);

    for (const m of crop.milestones) {
      assert.ok(m.stage?.length > 0, 'Stage name missing');
      assert.ok(m.days_offset >= 0, 'Milestone offset must be >= 0');
      assert.ok(m.care_tip_vi?.length > 0, 'Care tip missing');
    }
  }
});

// 2. Kiểm tra chế độ Tính xuôi từ ngày gieo (Forward Calculation)
test('Crop Timeline Calculator: calculateForwardTimeline computes exact dates and milestones', () => {
  // Giả sử gieo Cà chua bi (75 ngày) vào ngày 2026-11-01
  const timeline = calculateForwardTimeline('cherry_tomato', '2026-11-01');

  assert.equal(timeline.preset.id, 'cherry_tomato');
  assert.equal(timeline.sowingDateStr, '2026-11-01');
  assert.equal(timeline.formattedSowingDate, '01/11/2026');
  assert.equal(timeline.totalDays, 75);

  // Ngày thu hoạch dự kiến: 2026-11-01 + 75 ngày -> 2027-01-15
  assert.equal(timeline.harvestDateStr, '2027-01-15');
  assert.equal(timeline.formattedHarvestDate, '15/01/2027');

  // Kiểm tra các cột mốc
  assert.equal(timeline.milestones.length, 4);
  assert.equal(timeline.milestones[0].stage, 'Nảy mầm');
  assert.equal(timeline.milestones[0].daysOffset, 6);
  assert.equal(timeline.milestones[0].formattedDate, '07/11/2026'); // 1/11 + 6 ngày
});

// 3. Kiểm tra chế độ Tính ngược từ ngày muốn hái (Backward Calculation)
test('Crop Timeline Calculator: calculateBackwardTimeline calculates correct required sowing date', () => {
  // Mục tiêu: Thu hoạch dưa leo baby (50 ngày) vào ngày 2027-02-10 (Đón Tết)
  const timeline = calculateBackwardTimeline('cucumber', '2027-02-10');

  assert.equal(timeline.preset.id, 'cucumber');
  assert.equal(timeline.formattedHarvestDate, '10/02/2027');
  assert.equal(timeline.totalDays, 50);

  // Ngày phải gieo hạt: 10/02/2027 trừ 50 ngày -> 2026-12-22
  assert.equal(timeline.harvestDateStr, '2027-02-10');
  assert.equal(timeline.sowingDateStr, '2026-12-22');
  assert.equal(timeline.formattedSowingDate, '22/12/2026');
});

// 4. Kiểm tra cảnh báo trễ mùa vụ khi ngày mục tiêu quá cận kề
test('Crop Timeline Calculator: Emits warning message when sowing date has already passed', () => {
  // Mục tiêu: Muốn thu hoạch ớt (85 ngày) trong vòng 10 ngày tới (quá muộn để gieo hạt)
  const nearDate = new Date();
  nearDate.setDate(nearDate.getDate() + 10);
  const nearDateStr = formatDateISO(nearDate);

  const timeline = calculateBackwardTimeline('chili', nearDateStr);
  assert.ok(timeline.warningMessage, 'Must provide warning message when target date is too close');
  assert.ok(timeline.warningMessage.includes('Đã muộn'), 'Warning must state days late and recommend seedlings');
});

// 5. Kiểm tra hàm format và parse ngày
test('Date Utility Helpers: Correct ISO, Display and Parsing format', () => {
  const d = parseDateSafe('2026-05-18');
  assert.equal(d.getFullYear(), 2026);
  assert.equal(d.getMonth(), 4); // Tháng 5 (0-indexed)
  assert.equal(d.getDate(), 18);

  assert.equal(formatDateISO(d), '2026-05-18');
  assert.equal(formatDateDisplay(d), '18/05/2026');
});
