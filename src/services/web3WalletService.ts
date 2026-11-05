/**
 * DỊCH VỤ KẾT NỐI VÍ BLOCKCHAIN THẬT (EIP-1193 REAL WEB3 WALLET SERVICE)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * Yêu cầu: Bắt buộc sử dụng ví Web3 thật (MetaMask, Coinbase Wallet, Rabby, Brave, OKX...)
 * Môi trường: 100% Testnet (Base Sepolia / Polygon Amoy) - Học tập & trải nghiệm 0đ tiền thật
 */

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
  isCorrectNetwork: boolean;
}

export const BASE_SEPOLIA_CHAIN_ID_HEX = '0x14a34'; // 84532
export const POLYGON_AMOY_CHAIN_ID_HEX = '0x13882'; // 80002

export const BASE_SEPOLIA_CONFIG = {
  chainId: BASE_SEPOLIA_CHAIN_ID_HEX,
  chainName: 'Base Sepolia Testnet',
  nativeCurrency: { name: 'ETH (Testnet)', symbol: 'ETH', decimals: 18 },
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
      const isCorrect = chainId.toLowerCase() === BASE_SEPOLIA_CHAIN_ID_HEX.toLowerCase();

      const state: WalletState = {
        isConnected: true,
        address,
        chainId,
        networkName,
        walletName: this.detectWalletName(),
        balanceEth,
        isCorrectNetwork: isCorrect
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
   * Chuyển mạng sang Base Sepolia Testnet (Tự động thêm mạng nếu chưa có)
   */
  async switchToBaseSepolia(): Promise<string> {
    if (!window.ethereum) throw new Error('Không phát hiện tiện ích ví Web3');

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_SEPOLIA_CONFIG.chainId }]
      });
      return BASE_SEPOLIA_CONFIG.chainId;
    } catch (switchError: unknown) {
      const err = switchError as { code?: number };
      // Mã lỗi 4902: Mạng chưa có trong danh sách ví -> Tự động cấu hình thêm mạng
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BASE_SEPOLIA_CONFIG]
        });
        return BASE_SEPOLIA_CONFIG.chainId;
      }
      throw switchError;
    }
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
    if (hex === BASE_SEPOLIA_CHAIN_ID_HEX || hex === '84532') return 'Base Sepolia (L2 Testnet)';
    if (hex === POLYGON_AMOY_CHAIN_ID_HEX || hex === '80002') return 'Polygon Amoy (Testnet)';
    if (hex === '0x1') return 'Ethereum Mainnet (Cần đổi sang Testnet)';
    if (hex === '0xaa36a7' || hex === '11155111') return 'Ethereum Sepolia Testnet';
    return `Chain ID: ${chainId}`;
  }
};
