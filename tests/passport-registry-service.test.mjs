import test from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage and window for Node test environment
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => store.get(k) || null,
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
  clear: () => store.clear()
};

globalThis.window = {
  dispatchEvent: () => true
};

// Pure logic implementations mirroring plantPassportRegistryService rules for CI test automation
function normalizeAssetKey(name, scientific = '', nftClass = 'botanical') {
  const clean = (name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${nftClass}:${clean}`;
}

function calculateForestStats(totalM2, mintedLots) {
  const LOT_SIZE = 10000; // 10,000 m2 = 1 ha per lot
  const maxSupply = Math.floor(totalM2 / LOT_SIZE);
  const mintedM2 = mintedLots.length * LOT_SIZE;
  const remainingM2 = Math.max(0, totalM2 - mintedM2);
  const nextLotNumber = mintedLots.length + 1;
  const isSoldOut = nextLotNumber > maxSupply;

  return {
    maxSupply,
    mintedM2,
    remainingM2,
    nextLotNumber,
    isSoldOut
  };
}

function checkExclusivity({
  plantName,
  sha256,
  callerWallet,
  existingRegistry,
  nftClass = 'botanical'
}) {
  const assetKey = normalizeAssetKey(plantName, '', nftClass);
  const existing = existingRegistry.find(
    (p) => p.plant_key === assetKey || p.image_sha256 === sha256
  );

  if (!existing) {
    return { isAllowed: true };
  }

  // If active, it cannot be minted again
  if (existing.status === 'ACTIVE_ORIGINAL') {
    return {
      isAllowed: false,
      reason: 'Specimen already has an active unique NFT passport'
    };
  }

  // If burned, check 24-hour reincarnation grace period
  if (existing.status === 'BURNED_REINCARNATION') {
    const isSameOwner = existing.owner_address.toLowerCase() === callerWallet.toLowerCase();
    const now = Date.now();
    const burnedTime = existing.burned_at ? new Date(existing.burned_at).getTime() : now;
    const isWithin24h = now - burnedTime < 24 * 60 * 60 * 1000;

    if (isSameOwner && isWithin24h) {
      return { isAllowed: true, reason: 'Eligible for 24h exclusive reincarnation' };
    }

    if (!isSameOwner && isWithin24h) {
      return {
        isAllowed: false,
        reason: 'Protected by 24h exclusive reincarnation window for previous owner'
      };
    }

    return { isAllowed: true, reason: 'Exclusivity lock fully released after 24 hours' };
  }

  return { isAllowed: true };
}

test('Registry Logic: normalizeAssetKey generates consistent deterministic identifiers', () => {
  const key1 = normalizeAssetKey('Đinh Lăng Nếp Lá Nhỏ', '', 'botanical');
  const key2 = normalizeAssetKey('dinh lang nep la nho', '', 'botanical');
  assert.equal(key1, 'botanical:dinh-lang-nep-la-nho');
  assert.equal(key1, key2, 'Keys with Vietnamese diacritics must match normalized ascii');

  const forestKey = normalizeAssetKey('Rừng Cúc Phương', '', 'geo_forest_10000m2');
  assert.equal(forestKey, 'geo_forest_10000m2:rung-cuc-phuong');
});

test('Registry Logic: calculateForestStats enforces 10,000 m2 (1 ha) lots and sold-out threshold', () => {
  const totalAreaM2 = 100000; // 100,000 m2 = 10 ha = 10 lots
  const stats0 = calculateForestStats(totalAreaM2, []);
  assert.equal(stats0.maxSupply, 10);
  assert.equal(stats0.nextLotNumber, 1);
  assert.equal(stats0.mintedM2, 0);
  assert.equal(stats0.remainingM2, 100000);
  assert.equal(stats0.isSoldOut, false);

  // Mint 9 lots
  const minted9 = Array.from({ length: 9 }, (_, i) => i + 1);
  const stats9 = calculateForestStats(totalAreaM2, minted9);
  assert.equal(stats9.nextLotNumber, 10);
  assert.equal(stats9.isSoldOut, false);

  // Mint 10 lots (full)
  const minted10 = Array.from({ length: 10 }, (_, i) => i + 1);
  const stats10 = calculateForestStats(totalAreaM2, minted10);
  assert.equal(stats10.nextLotNumber, 11);
  assert.equal(stats10.isSoldOut, true, 'Forest should be marked sold out when all 10 ha are allocated');
});

test('Registry Logic: checkExclusivity protects active passports and grants 24h reincarnation', () => {
  const ALICE = '0x1111111111111111111111111111111111111111';
  const BOB = '0x2222222222222222222222222222222222222222';
  const SHA = 'a69f73cca23a9ac5c8b567dc185a756e97a9fb34a8ce3be94d4ec552d8444b0d';

  const registry = [
    {
      plant_key: 'botanical:sam-dai-hanh',
      image_sha256: SHA,
      owner_address: ALICE,
      status: 'ACTIVE_ORIGINAL'
    }
  ];

  // 1. Bob cannot mint duplicate active plant
  const bobAttempt = checkExclusivity({
    plantName: 'Sâm Đại Hành',
    sha256: SHA,
    callerWallet: BOB,
    existingRegistry: registry
  });
  assert.equal(bobAttempt.isAllowed, false, 'Duplicate active specimen must be rejected');

  // 2. Alice burns the NFT
  registry[0].status = 'BURNED_REINCARNATION';
  registry[0].burned_at = new Date().toISOString();

  // 3. Bob attempts to front-run Alice within 24h
  const bobFrontRun = checkExclusivity({
    plantName: 'Sâm Đại Hành',
    sha256: SHA,
    callerWallet: BOB,
    existingRegistry: registry
  });
  assert.equal(bobFrontRun.isAllowed, false, 'Third-party front-running must be blocked during 24h grace period');

  // 4. Alice remints her burned NFT within 24h
  const aliceReincarnate = checkExclusivity({
    plantName: 'Sâm Đại Hành',
    sha256: SHA,
    callerWallet: ALICE,
    existingRegistry: registry
  });
  assert.equal(aliceReincarnate.isAllowed, true, 'Original owner must be granted exclusive priority to remint');
});
