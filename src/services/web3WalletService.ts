/**
 * DỊCH VỤ KẾT NỐI VÍ BLOCKCHAIN THẬT (EIP-1193 REAL WEB3 WALLET SERVICE)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * Yêu cầu: Bắt buộc sử dụng ví Web3 thật (MetaMask, Coinbase Wallet, Rabby, Brave, OKX...)
 * Môi trường: 100% Testnet (Base Sepolia / Polygon Amoy) - Học tập & trải nghiệm 0đ tiền thật
 */

import { encodeFunctionData } from 'viem';
import { PLANT_PASSPORT_ABI, CONTRACT_ADDRESSES } from '../contracts/PlantPassportABI.ts';
import { AGRI_DEFI_ABI, AGRI_DEFI_CONTRACT_ADDRESSES } from '../contracts/AgriDeFiABI.ts';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
      isRabby?: boolean;
      isOkxWallet?: boolean;
      isBraveWallet?: boolean;
      request: (args: { method: string; params?: unknown[] | Record<string, unknown> }) => Promise<unknown>;
      on?: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}

export interface WalletState {
  isConnected: boolean;
  address: string;
  chainId: string;
  networkName: string;
  walletName: string;
  balanceEth: string;
  currencySymbol: string;
  isCorrectNetwork: boolean;
  isMainnetDanger: boolean;
}

export const BASE_SEPOLIA_CHAIN_ID_HEX = '0x14a34'; // 84532
export const ETHEREUM_SEPOLIA_CHAIN_ID_HEX = '0xaa36a7'; // 11155111
export const POLYGON_AMOY_CHAIN_ID_HEX = '0x13882'; // 80002
export const BSC_TESTNET_CHAIN_ID_HEX = '0x61'; // 97
export const ARBITRUM_SEPOLIA_CHAIN_ID_HEX = '0x66eee'; // 421614

export const SUPPORTED_TESTNET_CHAIN_IDS = [
  BASE_SEPOLIA_CHAIN_ID_HEX.toLowerCase(),
  ETHEREUM_SEPOLIA_CHAIN_ID_HEX.toLowerCase(),
  POLYGON_AMOY_CHAIN_ID_HEX.toLowerCase(),
  BSC_TESTNET_CHAIN_ID_HEX.toLowerCase(),
  ARBITRUM_SEPOLIA_CHAIN_ID_HEX.toLowerCase()
];

export const KNOWN_MAINNET_CHAIN_IDS = [
  '0x1', '1',
  '0x38', '56',
  '0x89', '137',
  '0xa4b1', '42161',
  '0xa', '10'
];

export interface TestnetNetworkItem {
  id: string;
  name: string;
  shortName: string;
  chainIdHex: string;
  chainIdDecimal: number;
  currencySymbol: string;
  type: string;
  config: {
    chainId: string;
    chainName: string;
    nativeCurrency: { name: string; symbol: string; decimals: number };
    rpcUrls: string[];
    blockExplorerUrls: string[];
  };
  faucets: { name: string; url: string; note: string }[];
}

export const ETHEREUM_SEPOLIA_CONFIG = {
  chainId: ETHEREUM_SEPOLIA_CHAIN_ID_HEX,
  chainName: 'Ethereum Sepolia Testnet',
  nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://ethereum-sepolia-rpc.publicnode.com', 'https://rpc.sepolia.org'],
  blockExplorerUrls: ['https://sepolia.etherscan.io']
};

export const BASE_SEPOLIA_CONFIG = {
  chainId: BASE_SEPOLIA_CHAIN_ID_HEX,
  chainName: 'Base Sepolia Testnet',
  nativeCurrency: { name: 'Base Sepolia ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org']
};

export const POLYGON_AMOY_CONFIG = {
  chainId: POLYGON_AMOY_CHAIN_ID_HEX,
  chainName: 'Polygon Amoy Testnet',
  nativeCurrency: { name: 'MATIC (Testnet)', symbol: 'MATIC', decimals: 18 },
  rpcUrls: ['https://rpc-amoy.polygon.technology'],
  blockExplorerUrls: ['https://amoy.polygonscan.com']
};

export const BSC_TESTNET_CONFIG = {
  chainId: BSC_TESTNET_CHAIN_ID_HEX,
  chainName: 'BNB Smart Chain Testnet',
  nativeCurrency: { name: 'tBNB', symbol: 'tBNB', decimals: 18 },
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  blockExplorerUrls: ['https://testnet.bscscan.com']
};

export const ARBITRUM_SEPOLIA_CONFIG = {
  chainId: ARBITRUM_SEPOLIA_CHAIN_ID_HEX,
  chainName: 'Arbitrum Sepolia Testnet',
  nativeCurrency: { name: 'Arbitrum Sepolia ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
  blockExplorerUrls: ['https://sepolia.arbiscan.io']
};

export const ALL_SUPPORTED_TESTNETS: Record<string, TestnetNetworkItem> = {
  [ETHEREUM_SEPOLIA_CHAIN_ID_HEX.toLowerCase()]: {
    id: 'sepolia',
    name: 'Ethereum Sepolia Testnet',
    shortName: 'Sepolia',
    chainIdHex: ETHEREUM_SEPOLIA_CHAIN_ID_HEX,
    chainIdDecimal: 11155111,
    currencySymbol: 'SepoliaETH',
    type: 'EVM Layer 1 (Cốt lõi)',
    config: ETHEREUM_SEPOLIA_CONFIG,
    faucets: [
      { name: 'Google Cloud Web3 Faucet', url: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia', note: '0.05 SepoliaETH / ngày (Không cần đăng nhập)' },
      { name: 'Coinbase Developer Faucet', url: 'https://www.coinbase.com/faucets/ethereum-sepolia-faucet', note: '0.1 SepoliaETH / ngày (Nhanh, tức thì)' },
      { name: 'Alchemy Sepolia Faucet', url: 'https://www.alchemy.com/faucets/ethereum-sepolia', note: '0.5 SepoliaETH / ngày' }
    ]
  },
  [BASE_SEPOLIA_CHAIN_ID_HEX.toLowerCase()]: {
    id: 'base-sepolia',
    name: 'Base Sepolia Testnet',
    shortName: 'Base Sepolia',
    chainIdHex: BASE_SEPOLIA_CHAIN_ID_HEX,
    chainIdDecimal: 84532,
    currencySymbol: 'BaseETH',
    type: 'Layer 2 Rollup (Phí gas siêu rẻ)',
    config: BASE_SEPOLIA_CONFIG,
    faucets: [
      { name: 'Coinbase Base Faucet', url: 'https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet', note: '0.05 BaseETH / ngày' },
      { name: 'Superchain Faucet', url: 'https://console.optimism.io/faucet', note: 'Nhận ETH cho Base & OP' }
    ]
  },
  [BSC_TESTNET_CHAIN_ID_HEX.toLowerCase()]: {
    id: 'bsc-testnet',
    name: 'BNB Smart Chain Testnet',
    shortName: 'BNB Testnet',
    chainIdHex: BSC_TESTNET_CHAIN_ID_HEX,
    chainIdDecimal: 97,
    currencySymbol: 'tBNB',
    type: 'BNB Chain Ecosystem',
    config: BSC_TESTNET_CONFIG,
    faucets: [
      { name: 'BNB Chain Official Faucet', url: 'https://www.bnbchain.org/en/testnet-faucet', note: '0.3 tBNB / 24h' }
    ]
  },
  [POLYGON_AMOY_CHAIN_ID_HEX.toLowerCase()]: {
    id: 'polygon-amoy',
    name: 'Polygon Amoy Testnet',
    shortName: 'Polygon Amoy',
    chainIdHex: POLYGON_AMOY_CHAIN_ID_HEX,
    chainIdDecimal: 80002,
    currencySymbol: 'MATIC (Testnet)',
    type: 'Polygon PoS Testnet',
    config: POLYGON_AMOY_CONFIG,
    faucets: [
      { name: 'Polygon Official Faucet', url: 'https://faucet.polygon.technology/', note: '0.2 POL/MATIC' }
    ]
  },
  [ARBITRUM_SEPOLIA_CHAIN_ID_HEX.toLowerCase()]: {
    id: 'arbitrum-sepolia',
    name: 'Arbitrum Sepolia Testnet',
    shortName: 'Arbitrum Sepolia',
    chainIdHex: ARBITRUM_SEPOLIA_CHAIN_ID_HEX,
    chainIdDecimal: 421614,
    currencySymbol: 'ArbETH',
    type: 'Arbitrum Nitro Layer 2',
    config: ARBITRUM_SEPOLIA_CONFIG,
    faucets: [
      { name: 'Arbitrum Sepolia Faucet', url: 'https://faucets.chain.link/', note: 'Chainlink Multi-faucet' }
    ]
  }
};

const STORAGE_WALLET_KEY = 'ytc_active_real_wallet';

export const web3WalletService = {
  /**
   * Kiểm tra xem trình duyệt có cài tiện ích ví Web3 thật (EIP-1193) hay không
   */
  hasInjectedProvider(): boolean {
    return typeof window !== 'undefined' && !!window.ethereum;
  },

  /**
   * Lấy loại tên ví thật đang cài
   */
  detectWalletName(): string {
    if (!window.ethereum) return 'Không có ví';
    if (window.ethereum.isRabby) return 'Rabby Wallet';
    if (window.ethereum.isCoinbaseWallet) return 'Coinbase Wallet';
    if (window.ethereum.isOkxWallet) return 'OKX Wallet';
    if (window.ethereum.isBraveWallet) return 'Brave Wallet';
    if (window.ethereum.isMetaMask) return 'MetaMask';
    return 'Ví Web3 Tiêu Chuẩn';
  },

  /**
   * Kiểm tra mạng có phải là testnet được hỗ trợ hay không
   */
  isSupportedNetwork(chainId: string | null): boolean {
    if (!chainId) return false;
    const lower = chainId.toLowerCase();
    return (
      SUPPORTED_TESTNET_CHAIN_IDS.includes(lower) ||
      lower === '11155111' ||
      lower === '84532' ||
      lower === '80002' ||
      lower === '97' ||
      lower === '421614'
    );
  },

  /**
   * Kiểm tra có đang kết nối vào Mainnet (tiền thật - nguy hiểm) hay không
   */
  isMainnet(chainId: string | null): boolean {
    if (!chainId) return false;
    const lower = chainId.toLowerCase();
    return KNOWN_MAINNET_CHAIN_IDS.includes(lower);
  },

  /**
   * Lấy đơn vị tiền tệ chuẩn theo chain
   */
  getCurrencySymbol(chainId: string | null): string {
    if (!chainId) return 'ETH (Testnet)';
    const lower = chainId.toLowerCase();
    const found = ALL_SUPPORTED_TESTNETS[lower];
    if (found) return found.currencySymbol;
    if (lower === '97' || lower === BSC_TESTNET_CHAIN_ID_HEX.toLowerCase()) return 'tBNB';
    if (lower === '80002' || lower === POLYGON_AMOY_CHAIN_ID_HEX.toLowerCase()) return 'MATIC (Testnet)';
    if (lower === '421614' || lower === ARBITRUM_SEPOLIA_CHAIN_ID_HEX.toLowerCase()) return 'ArbETH';
    return 'ETH (Testnet)';
  },

  /**
   * Lấy thông tin ví đã lưu từ session trước
   */
  getSavedWallet(): WalletState | null {
    try {
      const saved = localStorage.getItem(STORAGE_WALLET_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  /**
   * Đồng bộ lại trạng thái ví thực tế đang kết nối từ Extension (MetaMask, Rabby...)
   */
  async syncCurrentWalletState(): Promise<WalletState | null> {
    if (!this.hasInjectedProvider() || !window.ethereum) return null;
    try {
      const accounts = (await window.ethereum.request({
        method: 'eth_accounts'
      })) as string[];

      if (!accounts || accounts.length === 0) {
        return null;
      }

      const address = accounts[0];
      const chainId = (await window.ethereum.request({
        method: 'eth_chainId'
      })) as string;

      const balanceEth = await this.getBalance(address);
      const networkName = this.getNetworkName(chainId);
      const isCorrect = this.isSupportedNetwork(chainId);
      const isMainnetDanger = this.isMainnet(chainId);
      const currencySymbol = this.getCurrencySymbol(chainId);

      const state: WalletState = {
        isConnected: true,
        address,
        chainId,
        networkName,
        walletName: this.detectWalletName(),
        balanceEth,
        currencySymbol,
        isCorrectNetwork: isCorrect,
        isMainnetDanger
      };

      localStorage.setItem(STORAGE_WALLET_KEY, JSON.stringify(state));
      return state;
    } catch {
      return null;
    }
  },

  /**
   * Kết nối tới ví Web3 thật của người dùng
   */
  async connectRealWallet(): Promise<WalletState> {
    if (!this.hasInjectedProvider() || !window.ethereum) {
      throw new Error('Chưa phát hiện tiện ích ví Web3 thật. Vui lòng cài đặt tiện ích MetaMask hoặc Coinbase Wallet trên trình duyệt.');
    }

    try {
      // 1. Mở popup ví xin quyền kết nối
      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts'
      })) as string[];

      if (!accounts || accounts.length === 0) {
        throw new Error('Bạn đã từ chối yêu cầu kết nối trên ví.');
      }

      const address = accounts[0];

      // 2. Lấy Chain ID hiện tại
      const chainId = (await window.ethereum.request({
        method: 'eth_chainId'
      })) as string;

      // 3. Lấy số dư ETH Testnet thật từ blockchain node
      const balanceEth = await this.getBalance(address);
      const networkName = this.getNetworkName(chainId);
      const isCorrect = this.isSupportedNetwork(chainId);
      const isMainnetDanger = this.isMainnet(chainId);
      const currencySymbol = this.getCurrencySymbol(chainId);

      const state: WalletState = {
        isConnected: true,
        address,
        chainId,
        networkName,
        walletName: this.detectWalletName(),
        balanceEth,
        currencySymbol,
        isCorrectNetwork: isCorrect,
        isMainnetDanger
      };

      localStorage.setItem(STORAGE_WALLET_KEY, JSON.stringify(state));
      return state;
    } catch (err: unknown) {
      const e = err as { message?: string; code?: number };
      if (e.code === 4001) {
        throw new Error('Bạn đã hủy yêu cầu kết nối ví.');
      }
      throw new Error(e.message || 'Lỗi kết nối ví Web3.');
    }
  },

  /**
   * Lấy số dư ETH Testnet thật của địa chỉ ví
   */
  async getBalance(address: string): Promise<string> {
    if (!window.ethereum) return '0.0000';
    try {
      const rawBal = (await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      })) as string;
      const wei = parseInt(rawBal, 16);
      return (wei / 1e18).toFixed(4);
    } catch {
      return '0.0000';
    }
  },

  /**
   * Chuyển mạng sang bất kỳ Testnet nào được hỗ trợ trong hệ sinh thái
   */
  async switchToNetwork(targetChainIdHex: string): Promise<string> {
    if (!window.ethereum) throw new Error('Không phát hiện tiện ích ví Web3');
    const lower = targetChainIdHex.toLowerCase();
    const target = ALL_SUPPORTED_TESTNETS[lower];
    if (!target) throw new Error('Mạng testnet chưa được cấu hình.');

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: target.config.chainId }]
      });
      return target.config.chainId;
    } catch (switchError: unknown) {
      const err = switchError as { code?: number };
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [target.config]
        });
        return target.config.chainId;
      }
      throw switchError;
    }
  },

  /**
   * Chuyển mạng sang Base Sepolia Testnet (Tự động thêm mạng nếu chưa có)
   */
  async switchToBaseSepolia(): Promise<string> {
    return this.switchToNetwork(BASE_SEPOLIA_CHAIN_ID_HEX);
  },

  /**
   * Chuyển mạng sang Ethereum Sepolia Testnet
   */
  async switchToSepolia(): Promise<string> {
    return this.switchToNetwork(ETHEREUM_SEPOLIA_CHAIN_ID_HEX);
  },

  /**
   * Yêu cầu ví thật ký thông điệp mật mã học (personal_sign)
   */
  async signBotanicalRecord(account: string, message: string): Promise<string> {
    if (!window.ethereum) {
      throw new Error('Không phát hiện ví Web3 thật để ký xác nhận.');
    }

    try {
      const sig = (await window.ethereum.request({
        method: 'personal_sign',
        params: [message, account]
      })) as string;
      return sig;
    } catch (err: unknown) {
      const e = err as { code?: number; message?: string };
      if (e.code === 4001) {
        throw new Error('Bạn đã hủy yêu cầu ký số trên ví.');
      }
      throw new Error(e.message || 'Lỗi khi yêu cầu ví ký số.');
    }
  },

  /**
   * Đúc NFT Hộ Chiếu Thực Vật Số ON-CHAIN THẬT (Gửi transaction gọi Smart Contract qua MetaMask)
   */
  async mintPassportOnChain(params: {
    contractAddress: `0x${string}`;
    userAddress: `0x${string}`;
    plantName: string;
    scientificName: string;
    stage: number;
    sha256Proof: string;
    uri: string;
  }): Promise<string> {
    if (!window.ethereum) {
      throw new Error('Không phát hiện tiện ích ví Web3 để thực hiện giao dịch on-chain.');
    }

    try {
      // 1. Mã hóa dữ liệu gọi hàm mintPassport theo chuẩn ABI
      const callData = encodeFunctionData({
        abi: PLANT_PASSPORT_ABI,
        functionName: 'mintPassport',
        args: [
          params.plantName,
          params.scientificName,
          params.stage,
          params.sha256Proof,
          params.uri
        ]
      });

      // 2. Gửi transaction lên MetaMask để người dùng duyệt và ký xác nhận on-chain
      const txHash = (await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: params.userAddress,
            to: params.contractAddress,
            data: callData
          }
        ]
      })) as string;

      return txHash;
    } catch (err: unknown) {
      const e = err as { code?: number; message?: string };
      if (e.code === 4001) {
        throw new Error('Bạn đã hủy phê duyệt giao dịch trên MetaMask.');
      }
      throw new Error(e.message || 'Lỗi khi gửi giao dịch đúc NFT lên blockchain.');
    }
  },

  /**
   * Yêu cầu MetaMask thêm NFT vừa đúc vào tab NFTs của ví (EIP-747)
   */
  async addNftToMetaMask(contractAddress: string, tokenId: string): Promise<boolean> {
    if (!window.ethereum) return false;
    try {
      const wasAdded = (await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC721',
          options: {
            address: contractAddress,
            tokenId: tokenId
          }
        }
      })) as boolean;
      return wasAdded;
    } catch {
      return false;
    }
  },

  /**
   * Lấy địa chỉ contract NFT theo mạng
   */
  getContractAddressForChain(chainId: string | null): `0x${string}` {
    const hex = chainId?.toLowerCase();
    if (hex === BASE_SEPOLIA_CHAIN_ID_HEX.toLowerCase() || hex === '84532') {
      return (CONTRACT_ADDRESSES.baseSepolia || CONTRACT_ADDRESSES.sepolia) as `0x${string}`;
    }
    return CONTRACT_ADDRESSES.sepolia as `0x${string}`;
  },

  /**
   * Lấy URL xem giao dịch trên Block Explorer tương ứng với mạng
   */
  getExplorerTxUrl(txHash: string, chainId: string | null): string {
    if (!txHash) return '#';
    const hex = chainId?.toLowerCase();
    if (hex === BASE_SEPOLIA_CHAIN_ID_HEX.toLowerCase() || hex === '84532') {
      return `https://sepolia.basescan.org/tx/${txHash}`;
    }
    if (hex === BSC_TESTNET_CHAIN_ID_HEX.toLowerCase() || hex === '97') {
      return `https://testnet.bscscan.com/tx/${txHash}`;
    }
    if (hex === POLYGON_AMOY_CHAIN_ID_HEX.toLowerCase() || hex === '80002') {
      return `https://amoy.polygonscan.com/tx/${txHash}`;
    }
    if (hex === ARBITRUM_SEPOLIA_CHAIN_ID_HEX.toLowerCase() || hex === '421614') {
      return `https://sepolia.arbiscan.io/tx/${txHash}`;
    }
    // Mặc định Ethereum Sepolia
    return `https://sepolia.etherscan.io/tx/${txHash}`;
  },

  /**
   * Lấy địa chỉ hợp đồng Agri-DeFi Sandbox theo mạng
   */
  getAgriDeFiContractAddress(chainId: string | null): `0x${string}` {
    const hex = chainId?.toLowerCase();
    if (hex === BASE_SEPOLIA_CHAIN_ID_HEX.toLowerCase() || hex === '84532') {
      return AGRI_DEFI_CONTRACT_ADDRESSES.baseSepolia;
    }
    if (hex === BSC_TESTNET_CHAIN_ID_HEX.toLowerCase() || hex === '97') {
      return AGRI_DEFI_CONTRACT_ADDRESSES.bscTestnet;
    }
    if (hex === POLYGON_AMOY_CHAIN_ID_HEX.toLowerCase() || hex === '80002') {
      return AGRI_DEFI_CONTRACT_ADDRESSES.polygonAmoy;
    }
    if (hex === ARBITRUM_SEPOLIA_CHAIN_ID_HEX.toLowerCase() || hex === '421614') {
      return AGRI_DEFI_CONTRACT_ADDRESSES.arbitrumSepolia;
    }
    return AGRI_DEFI_CONTRACT_ADDRESSES.sepolia;
  },

  /**
   * Gửi hạt giống vào Staking Vault ON-CHAIN THẬT (Gửi transaction gọi Smart Contract trên Testnet)
   */
  async stakeSeedsOnChain(amount: number, userAddress: `0x${string}`, chainId: string): Promise<string> {
    if (!window.ethereum) {
      throw new Error('Không phát hiện tiện ích ví Web3 để thực hiện giao dịch Staking on-chain.');
    }
    const contract = this.getAgriDeFiContractAddress(chainId);
    const callData = encodeFunctionData({
      abi: AGRI_DEFI_ABI,
      functionName: 'stakeSeeds',
      args: [BigInt(amount)]
    });

    try {
      const txHash = (await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: userAddress,
            to: contract,
            data: callData
          }
        ]
      })) as string;
      return txHash;
    } catch (err: unknown) {
      const e = err as { code?: number; message?: string };
      if (e.code === 4001) {
        throw new Error('Bạn đã hủy phê duyệt giao dịch Staking trên ví.');
      }
      throw new Error(e.message || 'Lỗi khi gửi giao dịch Staking lên blockchain testnet.');
    }
  },

  /**
   * Thu hoạch lợi suất phân bón vi sinh ON-CHAIN THẬT (Gửi transaction qua ví)
   */
  async claimFertilizerOnChain(userAddress: `0x${string}`, chainId: string): Promise<string> {
    if (!window.ethereum) {
      throw new Error('Không phát hiện tiện ích ví Web3 để thực hiện giao dịch thu hoạch on-chain.');
    }
    const contract = this.getAgriDeFiContractAddress(chainId);
    const callData = encodeFunctionData({
      abi: AGRI_DEFI_ABI,
      functionName: 'claimBioFertilizer',
      args: []
    });

    try {
      const txHash = (await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: userAddress,
            to: contract,
            data: callData
          }
        ]
      })) as string;
      return txHash;
    } catch (err: unknown) {
      const e = err as { code?: number; message?: string };
      if (e.code === 4001) {
        throw new Error('Bạn đã hủy phê duyệt giao dịch thu hoạch lợi suất trên ví.');
      }
      throw new Error(e.message || 'Lỗi khi gửi giao dịch thu hoạch lên blockchain testnet.');
    }
  },

  /**
   * Đúc & Bù trừ Tín chỉ Carbon Rừng Tự Nhiên (ReFi) ON-CHAIN THẬT
   */
  async offsetCarbonOnChain(params: {
    forestLotId: string;
    hectares: number;
    userAddress: `0x${string}`;
    chainId: string;
  }): Promise<string> {
    if (!window.ethereum) {
      throw new Error('Không phát hiện tiện ích ví Web3 để thực hiện giao dịch ReFi Carbon on-chain.');
    }
    const contract = this.getAgriDeFiContractAddress(params.chainId);
    const callData = encodeFunctionData({
      abi: AGRI_DEFI_ABI,
      functionName: 'offsetCarbonWithForest',
      args: [params.forestLotId, BigInt(params.hectares)]
    });

    try {
      const txHash = (await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: params.userAddress,
            to: contract,
            data: callData
          }
        ]
      })) as string;
      return txHash;
    } catch (err: unknown) {
      const e = err as { code?: number; message?: string };
      if (e.code === 4001) {
        throw new Error('Bạn đã hủy phê duyệt giao dịch bù trừ Carbon ReFi trên ví.');
      }
      throw new Error(e.message || 'Lỗi khi gửi giao dịch bù trừ Carbon lên blockchain testnet.');
    }
  },

  /**
   * Bỏ phiếu Quản trị DAO Nông Nghiệp ON-CHAIN THẬT
   */
  async castDaoVoteOnChain(params: {
    proposalId: number;
    support: 0 | 1;
    userAddress: `0x${string}`;
    chainId: string;
  }): Promise<string> {
    if (!window.ethereum) {
      throw new Error('Không phát hiện tiện ích ví Web3 để thực hiện biểu quyết DAO on-chain.');
    }
    const contract = this.getAgriDeFiContractAddress(params.chainId);
    const callData = encodeFunctionData({
      abi: AGRI_DEFI_ABI,
      functionName: 'castVote',
      args: [BigInt(params.proposalId), params.support]
    });

    try {
      const txHash = (await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: params.userAddress,
            to: contract,
            data: callData
          }
        ]
      })) as string;
      return txHash;
    } catch (err: unknown) {
      const e = err as { code?: number; message?: string };
      if (e.code === 4001) {
        throw new Error('Bạn đã hủy phê duyệt giao dịch biểu quyết DAO trên ví.');
      }
      throw new Error(e.message || 'Lỗi khi gửi giao dịch bỏ phiếu DAO lên blockchain testnet.');
    }
  },

  /**
   * Chờ giao dịch được khai thác (mined) và có biên nhận (receipt) trên Testnet
   */
  async waitForTransactionReceipt(txHash: string): Promise<boolean> {
    if (!window.ethereum) return true;
    for (let i = 0; i < 8; i++) {
      try {
        const receipt = (await window.ethereum.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash]
        })) as { status?: string } | null;

        if (receipt && receipt.status) {
          return receipt.status === '0x1';
        }
      } catch {
        // Tiếp tục chờ
      }
      await new Promise((res) => setTimeout(res, 2000));
    }
    return true;
  },

  /**
   * Ngắt kết nối
   */
  disconnect() {
    localStorage.removeItem(STORAGE_WALLET_KEY);
  },

  /**
   * Dịch tên mạng theo Chain ID
   */
  getNetworkName(chainId: string | null): string {
    if (!chainId) return 'Mạng Không Xác Định';
    const hex = chainId.toLowerCase();
    const found = ALL_SUPPORTED_TESTNETS[hex];
    if (found) return found.name;
    if (hex === '11155111') return 'Ethereum Sepolia Testnet';
    if (hex === '84532') return 'Base Sepolia Testnet';
    if (hex === '80002') return 'Polygon Amoy Testnet';
    if (hex === '97') return 'BNB Smart Chain Testnet';
    if (hex === '421614') return 'Arbitrum Sepolia Testnet';
    if (hex === '0x1' || hex === '1') return '⚠️ Ethereum Mainnet (Tiền thật - Cần chuyển sang Testnet)';
    if (hex === '0x38' || hex === '56') return '⚠️ BNB Chain Mainnet (Tiền thật - Cần chuyển sang Testnet)';
    if (hex === '0x89' || hex === '137') return '⚠️ Polygon Mainnet (Tiền thật - Cần chuyển sang Testnet)';
    if (hex === '0xa4b1' || hex === '42161') return '⚠️ Arbitrum Mainnet (Tiền thật - Cần chuyển sang Testnet)';
    return `Chain ID: ${chainId} (Mạng không hỗ trợ - Cần đổi sang Testnet)`;
  }
};
