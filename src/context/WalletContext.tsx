import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { web3WalletService, WalletState } from '../services/web3WalletService.ts';

interface WalletContextType {
  wallet: WalletState | null;
  setWallet: React.Dispatch<React.SetStateAction<WalletState | null>>;
  isConnecting: boolean;
  walletError: string | null;
  setWalletError: (err: string | null) => void;
  connectWallet: () => Promise<WalletState | null>;
  disconnectWallet: () => void;
  switchNetwork: () => Promise<void>;
  toggleNetwork: () => Promise<void>;
  switchToSpecificNetwork: (chainIdHex: string) => Promise<void>;
  refreshBalance: () => Promise<void>;
  hasInstalledWallet: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState | null>(() => web3WalletService.getSavedWallet());
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);

  // Đồng bộ số dư và mạng từ RPC khi tải
  useEffect(() => {
    web3WalletService.syncCurrentWalletState().then((liveState) => {
      if (liveState) setWallet(liveState);
    });
  }, []);

  // Lắng nghe sự kiện chuyển tài khoản hoặc đổi mạng trên ví Web3 (MetaMask, Rabby...)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum && window.ethereum.on) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accs = accounts as string[];
        if (accs.length === 0) {
          web3WalletService.disconnect();
          setWallet(null);
        } else {
          web3WalletService.syncCurrentWalletState().then((liveState) => {
            if (liveState) setWallet(liveState);
          });
        }
      };

      const handleChainChanged = () => {
        web3WalletService.syncCurrentWalletState().then((liveState) => {
          if (liveState) setWallet(liveState);
        });
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum?.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  const connectWallet = useCallback(async (): Promise<WalletState | null> => {
    setWalletError(null);
    setIsConnecting(true);
    try {
      const state = await web3WalletService.connectRealWallet();
      setWallet(state);
      return state;
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || 'Không thể kết nối ví Web3 thật');
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    web3WalletService.disconnect();
    setWallet(null);
  }, []);

  const switchNetwork = useCallback(async () => {
    setWalletError(null);
    try {
      await web3WalletService.switchToSepolia();
      const fresh = await web3WalletService.syncCurrentWalletState();
      if (fresh) setWallet(fresh);
    } catch {
      try {
        await web3WalletService.switchToBaseSepolia();
        const fresh = await web3WalletService.syncCurrentWalletState();
        if (fresh) setWallet(fresh);
      } catch (err2: unknown) {
        const e = err2 as { message?: string };
        setWalletError(e.message || 'Lỗi khi chuyển mạng sang Testnet');
      }
    }
  }, []);

  const toggleNetwork = useCallback(async () => {
    setWalletError(null);
    try {
      const currentChain = wallet?.chainId?.toLowerCase();
      if (currentChain === '0x14a34' || currentChain === '84532') {
        await web3WalletService.switchToSepolia();
      } else {
        await web3WalletService.switchToBaseSepolia();
      }
      const fresh = await web3WalletService.syncCurrentWalletState();
      if (fresh) setWallet(fresh);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || 'Lỗi khi chuyển mạng');
    }
  }, [wallet?.chainId]);

  const switchToSpecificNetwork = useCallback(async (chainIdHex: string) => {
    setWalletError(null);
    try {
      await web3WalletService.switchToNetwork(chainIdHex);
      const fresh = await web3WalletService.syncCurrentWalletState();
      if (fresh) setWallet(fresh);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || 'Lỗi khi chuyển mạng testnet');
    }
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!wallet?.address) return;
    try {
      const fresh = await web3WalletService.syncCurrentWalletState();
      if (fresh) {
        setWallet(fresh);
      } else {
        const bal = await web3WalletService.getBalance(wallet.address);
        setWallet((prev) => (prev ? { ...prev, balanceEth: bal } : null));
      }
    } catch (e) {
      console.warn('Refresh balance error:', e);
    }
  }, [wallet?.address]);

  const hasInstalledWallet = web3WalletService.hasInjectedProvider();

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
        isConnecting,
        walletError,
        setWalletError,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        toggleNetwork,
        switchToSpecificNetwork,
        refreshBalance,
        hasInstalledWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
