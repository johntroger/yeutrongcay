import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  TWENTY_FOUR_SOLAR_TERMS,
  buildGoogleCalendarUrl,
  generateIcsContent
} from '../src/utils/agriculturalCalendarUtils.ts';

// 1. Kiểm tra tính đầy đủ của 24 Tiết khí trong cả 12 tháng
test('Solar Terms & Moon Phases: All 12 months have 2 complete solar terms and moon phase advice', () => {
  assert.equal(Object.keys(TWENTY_FOUR_SOLAR_TERMS).length, 12, 'Must contain 12 months');

  for (let m = 1; m <= 12; m++) {
    const data = TWENTY_FOUR_SOLAR_TERMS[m];
    assert.ok(data, `Month ${m} must exist`);

    // Kiểm tra Tiết khí 1
    assert.ok(data.term1.name_vi?.length > 0, `Month ${m} term1 name_vi missing`);
    assert.ok(data.term1.name_en?.length > 0, `Month ${m} term1 name_en missing`);
    assert.ok(data.term1.approx_date?.length > 0, `Month ${m} term1 approx_date missing`);
    assert.ok(data.term1.garden_advice_vi?.length > 0, `Month ${m} term1 garden_advice_vi missing`);

    // Kiểm tra Tiết khí 2
    assert.ok(data.term2.name_vi?.length > 0, `Month ${m} term2 name_vi missing`);
    assert.ok(data.term2.name_en?.length > 0, `Month ${m} term2 name_en missing`);
    assert.ok(data.term2.approx_date?.length > 0, `Month ${m} term2 approx_date missing`);
    assert.ok(data.term2.garden_advice_vi?.length > 0, `Month ${m} term2 garden_advice_vi missing`);

    // Kiểm tra Lời khuyên chu kỳ mặt trăng
    assert.ok(data.moon_phase_advice_vi?.length > 0, `Month ${m} moon_phase_advice_vi missing`);
    assert.ok(data.moon_phase_advice_en?.length > 0, `Month ${m} moon_phase_advice_en missing`);
  }
});

// 2. Kiểm tra bộ tạo URL Google Calendar
test('Google Calendar URL Generator: Creates compliant template link with encoded parameters', () => {
  const url = buildGoogleCalendarUrl({
    title: '[Yêu Trồng Cây] Làm Vườn Tháng 11',
    details: '1. Tưới cây 10h sáng\n2. Bón lót phân trùn quế',
    location: 'Ban công chung cư',
    month: 11,
    year: 2026
  });

  assert.ok(url.startsWith('https://calendar.google.com/calendar/render?'), 'Must have correct base URL');
  assert.ok(url.includes('action=TEMPLATE'), 'Must specify action=TEMPLATE');
  assert.ok(url.includes('text='), 'Must include title');
  assert.ok(url.includes('details='), 'Must include details');
  assert.ok(url.includes('location='), 'Must include location');
  assert.ok(url.includes('dates='), 'Must include dates');
  assert.ok(url.includes('202611'), 'Must include year and month in date parameter');
});

// 3. Kiểm tra bộ sinh nội dung file iCalendar (.ics chuẩn RFC 5545)
test('iCalendar (.ics) Generator: Conforms to RFC 5545 specification with CRLF line endings', () => {
  const ics = generateIcsContent({
    title: 'Lịch Làm Vườn Ban Công Tháng 3',
    description: 'Treo bẫy dính vàng, phun dầu neem sinh học',
    month: 3,
    year: 2026,
    regionLabel: 'Miền Bắc'
  });

  assert.ok(ics.includes('BEGIN:VCALENDAR'), 'Must contain BEGIN:VCALENDAR');
  assert.ok(ics.includes('VERSION:2.0'), 'Must contain VERSION:2.0');
  assert.ok(ics.includes('BEGIN:VEVENT'), 'Must contain BEGIN:VEVENT');
  assert.ok(ics.includes('SUMMARY:Lịch Làm Vườn Ban Công Tháng 3'), 'Must contain SUMMARY');
  assert.ok(ics.includes('LOCATION:Vườn Ban Công / Sân Thượng (Miền Bắc)'), 'Must contain LOCATION');
  assert.ok(ics.includes('END:VEVENT'), 'Must contain END:VEVENT');
  assert.ok(ics.includes('END:VCALENDAR'), 'Must contain END:VCALENDAR');
  assert.ok(ics.includes('\r\n'), 'Must use CRLF line breaks');
});
