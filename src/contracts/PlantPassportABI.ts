export const PLANT_PASSPORT_ABI = [
  {
    inputs: [
      { internalType: 'string', name: 'plantName', type: 'string' },
      { internalType: 'string', name: 'scientificName', type: 'string' },
      { internalType: 'uint8', name: 'stage', type: 'uint8' },
      { internalType: 'string', name: 'sha256Proof', type: 'string' },
      { internalType: 'string', name: 'uri', type: 'string' }
    ],
    name: 'mintPassport',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'passports',
    outputs: [
      { internalType: 'string', name: 'plantName', type: 'string' },
      { internalType: 'string', name: 'scientificName', type: 'string' },
      { internalType: 'uint8', name: 'stage', type: 'uint8' },
      { internalType: 'string', name: 'sha256Proof', type: 'string' },
      { internalType: 'uint256', name: 'mintedAt', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: false, internalType: 'string', name: 'plantName', type: 'string' },
      { indexed: false, internalType: 'string', name: 'sha256Proof', type: 'string' },
      { indexed: false, internalType: 'string', name: 'tokenURI', type: 'string' }
    ],
    name: 'PassportMinted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  }
] as const;

/**
 * Địa chỉ Smart Contract NFT trên các mạng Testnet
 * Khi người dùng deploy contract qua Remix/Script, dán địa chỉ contract vào đây
 */
export const CONTRACT_ADDRESSES: Record<string, `0x${string}` | string> = {
  // Ethereum Sepolia Testnet (Chain ID 11155111 / 0xaa36a7)
  sepolia: '0x99A3141f9775f0f3531b4028b0561578a1E59fe7', // Sẽ được cập nhật khi deploy contract
  // Base Sepolia Testnet (Chain ID 84532 / 0x14a34)
  baseSepolia: '0x99A3141f9775f0f3531b4028b0561578a1E59fe7'
};
