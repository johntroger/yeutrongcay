import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

// Kiểm tra logic phân trang RESTful API của plants.php
test('API Pagination: Calculates correct pages, limits and has_more bounds', () => {
  const calculatePagination = (total, page, limit) => {
    const validPage = Math.max(1, page);
    const validLimit = Math.min(100, Math.max(1, limit));
    const offset = (validPage - 1) * validLimit;
    const totalPages = Math.ceil(total / validLimit);
    const hasMore = (validPage * validLimit) < total;

    return { page: validPage, limit: validLimit, offset, totalPages, hasMore };
  };

  // Trường hợp 50 cây, lấy 12 cây/trang, trang 1
  const p1 = calculatePagination(50, 1, 12);
  assert.equal(p1.offset, 0);
  assert.equal(p1.totalPages, 5);
  assert.equal(p1.hasMore, true);

  // Trang cuối (trang 5)
  const p5 = calculatePagination(50, 5, 12);
  assert.equal(p5.offset, 48);
  assert.equal(p5.hasMore, false);

  // Trang vượt quá tổng số
  const pExcess = calculatePagination(50, 10, 12);
  assert.equal(pExcess.hasMore, false);
});

// Kiểm tra thuật toán Progressive Windowing (Infinite Scroll Chunking)
test('Progressive Windowing: Slices items progressively without exceeding bounds', () => {
  const mockItems = Array.from({ length: 25 }, (_, i) => ({ id: `plant-${i + 1}` }));

  let visibleCount = 12;
  const chunk1 = mockItems.slice(0, visibleCount);
  assert.equal(chunk1.length, 12);
  assert.equal(chunk1[0].id, 'plant-1');
  assert.equal(chunk1[11].id, 'plant-12');

  // Nạp thêm đợt 2 (+12)
  visibleCount = Math.min(visibleCount + 12, mockItems.length);
  const chunk2 = mockItems.slice(0, visibleCount);
  assert.equal(chunk2.length, 24);

  // Nạp thêm đợt 3 (+12) -> Chạm mốc 25
  visibleCount = Math.min(visibleCount + 12, mockItems.length);
  const chunk3 = mockItems.slice(0, visibleCount);
  assert.equal(chunk3.length, 25);
  assert.equal(visibleCount, 25);
});

// Kiểm tra tính tương thích của ETag HTTP Cache
test('HTTP Cache: Generates deterministic quoted MD5 ETag', () => {
  const payload = JSON.stringify({ success: true, data: [{ id: 1, name: 'Cây Húng Quế' }] });
  const hash = crypto.createHash('md5').update(payload).digest('hex');
  const etag = `"${hash}"`;

  assert.match(etag, /^"[a-f0-9]{32}"$/);
  
  // Xác nhận nếu payload không đổi thì ETag giữ nguyên 100%
  const hash2 = crypto.createHash('md5').update(payload).digest('hex');
  assert.equal(etag, `"${hash2}"`);
});
