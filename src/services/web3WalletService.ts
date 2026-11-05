/**
 * DỊCH VỤ KẾT NỐI VÍ BLOCKCHAIN & SMART CONTRACT (EIP-1193 WEB3 WALLET SERVICE)
 * Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
 * Hỗ trợ: MetaMask, Coinbase Wallet, Rabby, Brave, OKX Wallet & Ví nhúng thử nghiệm (Embedded)
 */

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] | Record<string, unknown> }) => Promise<unknown>;
      on?: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: string | null;
  networkName: string;
  isMetaMask: boolean;
  isEmbedded: boolean;
  balanceEth?: string;
}

const BASE_SEPOLIA_CONFIG = {
  chainId: '0x14a34', // 84532
  chainName: 'Base Sepolia Testnet',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org']
};

const POLYGON_AMOY_CONFIG = {
  chainId: '0x13882', // 80002
  chainName: 'Polygon Amoy Testnet',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: ['https://rpc-amoy.polygon.technology'],
  blockExplorerUrls: ['https://amoy.polygonscan.com']
};

const EMBEDDED_KEY = 'ytc_web3_embedded_wallet';

export const web3WalletService = {
  hasInjectedProvider(): boolean {
    return typeof window !== 'undefined' && !!window.ethereum;
  },

  getSavedWallet(): WalletState | null {
    const saved = localStorage.getItem('ytc_active_wallet');
    return saved ? JSON.parse(saved) : null;
  },

  async connectInjectedWallet(): Promise<WalletState> {
    if (!this.hasInjectedProvider() || !window.ethereum) {
      throw new Error('Chưa phát hiện tiện ích ví Web3 (như MetaMask). Hãy cài đặt hoặc dùng Ví Thử Nghiệm.');
    }

    try {
      // 1. Yêu cầu mở popup MetaMask và xin quyền truy cập tài khoản
      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts'
      })) as string[];

      if (!accounts || accounts.length === 0) {
        throw new Error('Người dùng đã từ chối kết nối ví.');
      }

      const address = accounts[0];

      // 2. Lấy Chain ID hiện tại
      const chainId = (await window.ethereum.request({
        method: 'eth_chainId'
      })) as string;

      // 3. Lấy số dư ETH (nếu có)
      let balanceEth = '0.00';
      try {
        const rawBal = (await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest']
        })) as string;
        const wei = parseInt(rawBal, 16);
        balanceEth = (wei / 1e18).toFixed(4);
      } catch {}

      const networkName = this.getNetworkName(chainId);

      const state: WalletState = {
        isConnected: true,
        address,
        chainId,
        networkName,
        isMetaMask: !!window.ethereum.isMetaMask,
        isEmbedded: false,
        balanceEth
      };

      localStorage.setItem('ytc_active_wallet', JSON.stringify(state));
      return state;
    } catch (err: unknown) {
      const e = err as { message?: string; code?: number };
      if (e.code === 4001) {
        throw new Error('Bạn đã hủy yêu cầu kết nối trên ví MetaMask.');
      }
      throw new Error(e.message || 'Lỗi kết nối ví Web3.');
    }
  },

  async switchNetwork(target: 'Base Sepolia' | 'Polygon Amoy'): Promise<string> {
    if (!window.ethereum) throw new Error('Không có ví Web3');
    const targetConfig = target === 'Base Sepolia' ? BASE_SEPOLIA_CONFIG : POLYGON_AMOY_CONFIG;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetConfig.chainId }]
      });
      return targetConfig.chainId;
    } catch (switchError: unknown) {
      const err = switchError as { code?: number };
      // Mã 4902: Mạng chưa được thêm vào ví -> Tự động thêm mạng
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [targetConfig]
        });
        return targetConfig.chainId;
      }
      throw switchError;
    }
  },

  createOrGetEmbeddedWallet(): WalletState {
    let saved = localStorage.getItem(EMBEDDED_KEY);
    if (!saved) {
      // Tạo một địa chỉ 0x ngẫu nhiên mô phỏng khóa cá nhân Web3
      const array = new Uint8Array(20);
      crypto.getRandomValues(array);
      saved = '0x' + Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
      localStorage.setItem(EMBEDDED_KEY, saved);
    }

    const state: WalletState = {
      isConnected: true,
      address: saved,
      chainId: '0x14a34',
      networkName: 'Base Sepolia (Embedded)',
      isMetaMask: false,
      isEmbedded: true,
      balanceEth: '0.05'
    };

    localStorage.setItem('ytc_active_wallet', JSON.stringify(state));
    return state;
  },

  async signMessage(account: string, message: string, isMetaMask: boolean): Promise<string> {
    if (isMetaMask && window.ethereum) {
      try {
        const sig = (await window.ethereum.request({
          method: 'personal_sign',
          params: [message, account]
        })) as string;
        return sig;
      } catch (err: unknown) {
        const e = err as { code?: number; message?: string };
        if (e.code === 4001) {
          throw new Error('Người dùng đã từ chối ký chữ ký số trên ví.');
        }
      }
    }

    // Với ví Embedded, tự tạo chữ ký mật mã học giả lập 65-byte
    const encoder = new TextEncoder();
    const data = encoder.encode(message + account);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hex = Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('');
    return '0x' + hex + '1c';
  },

  disconnect() {
    localStorage.removeItem('ytc_active_wallet');
  },

  getNetworkName(chainId: string | null): string {
    if (!chainId) return 'Mạng Không Xác Định';
    const hex = chainId.toLowerCase();
    if (hex === '0x14a34' || hex === '84532') return 'Base Sepolia (L2)';
    if (hex === '0x13882' || hex === '80002') return 'Polygon Amoy';
    if (hex === '0x1') return 'Ethereum Mainnet';
    if (hex === '0xaa36a7' || hex === '11155111') return 'Sepolia Testnet';
    return `Chain ID: ${chainId}`;
  }
};
