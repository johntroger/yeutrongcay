/**
 * ABI VÀ ĐỊA CHỈ SMART CONTRACT AGRI-DEFI VAULT (100% TESTNET)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * Mục đích: Tương tác on-chain thật qua ví Web3 (MetaMask, Rabby...) trên các mạng Testnet
 */

export const AGRI_DEFI_ABI = [
  // 1. stakeSeeds(uint256 amount)
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'stakeSeeds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // 2. unstakeSeeds(uint256 amount)
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'unstakeSeeds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // 3. claimBioFertilizer()
  {
    inputs: [],
    name: 'claimBioFertilizer',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // 4. offsetCarbonWithForest(string forestLotId, uint256 hectares)
  {
    inputs: [
      { internalType: 'string', name: 'forestLotId', type: 'string' },
      { internalType: 'uint256', name: 'hectares', type: 'uint256' }
    ],
    name: 'offsetCarbonWithForest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // 5. castVote(uint256 proposalId, uint8 support)
  {
    inputs: [
      { internalType: 'uint256', name: 'proposalId', type: 'uint256' },
      { internalType: 'uint8', name: 'support', type: 'uint8' }
    ],
    name: 'castVote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  // 6. getStakeInfo(address gardener)
  {
    inputs: [{ internalType: 'address', name: 'gardener', type: 'address' }],
    name: 'getStakeInfo',
    outputs: [
      { internalType: 'uint256', name: 'staked', type: 'uint256' },
      { internalType: 'uint256', name: 'pendingYield', type: 'uint256' },
      { internalType: 'uint256', name: 'lastTimestamp', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // 7. calculatePendingYield(address gardener)
  {
    inputs: [{ internalType: 'address', name: 'gardener', type: 'address' }],
    name: 'calculatePendingYield',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  // 8. getProposal(uint256 proposalId)
  {
    inputs: [{ internalType: 'uint256', name: 'proposalId', type: 'uint256' }],
    name: 'getProposal',
    outputs: [
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'string', name: 'title', type: 'string' },
      { internalType: 'string', name: 'description', type: 'string' },
      { internalType: 'uint256', name: 'yesVotes', type: 'uint256' },
      { internalType: 'uint256', name: 'noVotes', type: 'uint256' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      { internalType: 'bool', name: 'executed', type: 'bool' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'gardener', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
    ],
    name: 'SeedsStaked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'gardener', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'yieldAmount', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
    ],
    name: 'BioFertilizerClaimed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'gardener', type: 'address' },
      { indexed: false, internalType: 'string', name: 'forestLotId', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'hectares', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'co2Tons', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
    ],
    name: 'CarbonOffsetRetired',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'voter', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'proposalId', type: 'uint256' },
      { indexed: false, internalType: 'uint8', name: 'support', type: 'uint8' },
      { indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
    ],
    name: 'VoteCast',
    type: 'event'
  }
] as const;

/**
 * Địa chỉ Smart Contract Agri-DeFi Sandbox trên các mạng Testnet
 */
export const AGRI_DEFI_CONTRACT_ADDRESSES: Record<string, `0x${string}`> = {
  // Ethereum Sepolia Testnet (Chain ID 11155111 / 0xaa36a7)
  sepolia: '0x38b21104e76a6d6108169e6b5270da6b548b8ec8',
  // Base Sepolia Testnet (Chain ID 84532 / 0x14a34)
  baseSepolia: '0x38b21104e76a6d6108169e6b5270da6b548b8ec8',
  // Polygon Amoy Testnet (Chain ID 80002 / 0x13882)
  polygonAmoy: '0x38b21104e76a6d6108169e6b5270da6b548b8ec8',
  // BNB Chain Testnet (Chain ID 97 / 0x61)
  bscTestnet: '0x38b21104e76a6d6108169e6b5270da6b548b8ec8',
  // Arbitrum Sepolia (Chain ID 421614 / 0x66eee)
  arbitrumSepolia: '0x38b21104e76a6d6108169e6b5270da6b548b8ec8'
};
