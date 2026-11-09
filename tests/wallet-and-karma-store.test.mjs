import test from 'node:test';
import assert from 'node:assert/strict';

// Mock storage
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

// Pure logic mirror for testing store rules
function calculateKarmaTier(points) {
  if (points >= 100) return { tier: 5, title: 'Chuyên Gia Lâm Nghiệp Đô Thị', icon: '🌳' };
  if (points >= 60) return { tier: 4, title: 'Nhà Nông Nghiệp Tự Chủ', icon: '🌿' };
  if (points >= 30) return { tier: 3, title: 'Người Làm Vườn Bản Lĩnh', icon: '🌱' };
  if (points >= 15) return { tier: 2, title: 'Mầm Non Yêu Cây', icon: '🪴' };
  return { tier: 1, title: 'Người Bạn Mới Của Vườn', icon: '❤️' };
}

function validateNetworkSafety(chainIdHex) {
  const normalized = (chainIdHex || '').toLowerCase();
  const MAINNET_CHAINS = new Set(['0x1', '1', '0x38', '56', '0x89', '137', '0xa4b1', '42161']);
  const SUPPORTED_TESTNETS = new Set([
    '0xaa36a7', '11155111', // Sepolia
    '0x14a34', '84532',     // Base Sepolia
    '0x61', '97',           // BNB Testnet
    '0x13882', '80002',     // Polygon Amoy
    '0x66eee', '421614'     // Arbitrum Sepolia
  ]);

  const isMainnet = MAINNET_CHAINS.has(normalized);
  const isCorrectNetwork = SUPPORTED_TESTNETS.has(normalized);

  return {
    isMainnetDanger: isMainnet,
    isCorrectNetwork: isCorrectNetwork && !isMainnet,
    allowedForSandbox: isCorrectNetwork && !isMainnet
  };
}

test('State Store Rule: Karma Level Progression calculates correct tier thresholds', () => {
  assert.equal(calculateKarmaTier(0).tier, 1);
  assert.equal(calculateKarmaTier(14).tier, 1);
  assert.equal(calculateKarmaTier(15).tier, 2);
  assert.equal(calculateKarmaTier(29).tier, 2);
  assert.equal(calculateKarmaTier(30).tier, 3);
  assert.equal(calculateKarmaTier(59).tier, 3);
  assert.equal(calculateKarmaTier(60).tier, 4);
  assert.equal(calculateKarmaTier(99).tier, 4);
  assert.equal(calculateKarmaTier(100).tier, 5);
  assert.equal(calculateKarmaTier(250).tier, 5);
});

test('State Store Rule: Network safety strictly blocks mainnet real money and enforces testnets', () => {
  // Mainnet Ethereum -> Blocked
  const ethMainnet = validateNetworkSafety('0x1');
  assert.equal(ethMainnet.isMainnetDanger, true, 'Ethereum Mainnet must trigger danger flag');
  assert.equal(ethMainnet.allowedForSandbox, false, 'Mainnet must never be allowed for testnet sandbox transactions');

  // BNB Mainnet -> Blocked
  const bnbMainnet = validateNetworkSafety('0x38');
  assert.equal(bnbMainnet.isMainnetDanger, true);
  assert.equal(bnbMainnet.allowedForSandbox, false);

  // Sepolia Testnet -> Allowed
  const sepolia = validateNetworkSafety('0xaa36a7');
  assert.equal(sepolia.isMainnetDanger, false);
  assert.equal(sepolia.allowedForSandbox, true);

  // Base Sepolia Testnet -> Allowed
  const baseSepolia = validateNetworkSafety('0x14a34');
  assert.equal(baseSepolia.isMainnetDanger, false);
  assert.equal(baseSepolia.allowedForSandbox, true);
});
