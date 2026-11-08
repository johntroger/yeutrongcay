import test from 'node:test';
import assert from 'node:assert/strict';

// Mock browser environment for Node.js test runner
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (k) => mockStorage.get(k) || null,
  setItem: (k, v) => mockStorage.set(k, String(v)),
  removeItem: (k) => mockStorage.delete(k),
  clear: () => mockStorage.clear()
};

globalThis.window = {
  dispatchEvent: () => true
};

test('Security Rule: Only current owner can burn NFT and ownership transfer transfers burn right', () => {
  const ALICE_WALLET = '0x1111111111111111111111111111111111111111';
  const BOB_WALLET = '0x2222222222222222222222222222222222222222';
  const CHARLIE_WALLET = '0x3333333333333333333333333333333333333333';

  // 1. Initial State: Alice mints a unique NFT (Token #101 - Mai Vang)
  const passport = {
    id: 'passport-101',
    token_id: '101',
    plant_name: 'Mai Vàng Cổ Thụ',
    scientific_name: 'Ochna integerrima',
    image_url: 'https://example.com/mai-vang.jpg',
    image_sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    owner_address: ALICE_WALLET,
    creator_wallet: ALICE_WALLET,
    creator_username: 'alice_gardener',
    network: 'Ethereum Sepolia',
    status: 'ACTIVE_ORIGINAL',
    minted_at: '2026-11-08'
  };

  // Check helper: verify owner
  function canBurn(tokenOwner, caller) {
    return tokenOwner.toLowerCase() === caller.toLowerCase();
  }

  // Alice can burn
  assert.equal(canBurn(passport.owner_address, ALICE_WALLET), true, 'Alice is current owner and must have burn right');

  // Bob cannot burn
  assert.equal(canBurn(passport.owner_address, BOB_WALLET), false, 'Bob is not owner and must be blocked from burning');

  // 2. Transfer: Alice transfers NFT #101 to Bob
  const transferredPassport = {
    ...passport,
    owner_address: BOB_WALLET,
    current_owner_username: 'bob_gardener',
    transferred_at: '2026-11-08 12:00:00'
  };

  // 3. Post-transfer Verification:
  // Alice permanently loses burn right
  assert.equal(canBurn(transferredPassport.owner_address, ALICE_WALLET), false, 'Alice transferred NFT and must permanently lose burn right');

  // Bob gains burn right
  assert.equal(canBurn(transferredPassport.owner_address, BOB_WALLET), true, 'Bob is now current owner and must gain exclusive burn right');

  // Charlie still cannot burn
  assert.equal(canBurn(transferredPassport.owner_address, CHARLIE_WALLET), false, 'Charlie is a stranger and cannot burn');
});

test('Reincarnation Rule: 24-hour exclusive grace window protects burner against front-running', () => {
  const BOB_WALLET = '0x2222222222222222222222222222222222222222';
  const ATTACKER_WALLET = '0x9999999999999999999999999999999999999999';

  const currentTime = Date.now();
  const gracePeriodEnd = currentTime + 24 * 60 * 60 * 1000; // 24 hours lock

  const burnedRecord = {
    plant_name: 'Mai Vàng Cổ Thụ',
    status: 'BURNED_RELEASED',
    reincarnation_owner: BOB_WALLET.toLowerCase(),
    reincarnation_locked_until: gracePeriodEnd
  };

  function canReincarnateMint(burnedItem, callerWallet, attemptTime) {
    if (burnedItem.status !== 'BURNED_RELEASED') return false;
    // Inside 24h grace window: only reincarnation_owner allowed
    if (attemptTime < burnedItem.reincarnation_locked_until) {
      return callerWallet.toLowerCase() === burnedItem.reincarnation_owner.toLowerCase();
    }
    // After 24h: public can mint
    return true;
  }

  // During grace period (1 hour after burn):
  const oneHourLater = currentTime + 3600 * 1000;
  assert.equal(canReincarnateMint(burnedRecord, BOB_WALLET, oneHourLater), true, 'Bob (the burner) must be allowed to remint within 24h');
  assert.equal(canReincarnateMint(burnedRecord, ATTACKER_WALLET, oneHourLater), false, 'Attacker must be rejected from front-running species name within 24h');

  // After grace period (25 hours later):
  const twentyFiveHoursLater = currentTime + 25 * 3600 * 1000;
  assert.equal(canReincarnateMint(burnedRecord, ATTACKER_WALLET, twentyFiveHoursLater), true, 'After 24h, exclusivity lock is released to the community');
});
