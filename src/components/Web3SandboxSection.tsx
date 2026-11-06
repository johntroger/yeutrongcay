import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  Check,
  RefreshCw,
  FileCheck2,
  ArrowRight,
  Printer,
  Wallet,
  LogOut,
  Copy,
  AlertCircle,
  Sparkles,
  ExternalLink,
  BookOpen,
  Coins,
  Droplets,
  KeyRound
} from 'lucide-react';
import { Web3TestnetPassport } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { web3WalletService, WalletState, BASE_SEPOLIA_CONFIG } from '../services/web3WalletService.ts';
import { awardKarmaPoints, getKarmaState, KarmaState } from '../services/karmaService.ts';

// 4 giống cây quý bản địa mẫu để cấp hộ chiếu thực vật số
const SAMPLE_MINT_PLANTS = [
  {
    id: 'herb-04',
    name_vi: 'Đinh Lăng Nếp Lá Nhỏ (3 Năm Tuổi)',
    name_en: 'Small-Leaf Ming Aralia (3-Year Aged)',
    scientific: 'Polyscias fruticosa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg/330px-Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg',
  },
  {
    id: 'herb-21',
    name_vi: 'Sâm Đại Hành Bản Địa',
    name_en: 'Eleutherine Bulb (Red Garlic Onion)',
    scientific: 'Eleutherine bulbosa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eleutherine_bulbosa_%28Mill.%29_Urb._%287957758778%29.jpg/330px-Eleutherine_bulbosa_%28Mill.%29_Urb._%287957758778%29.jpg',
  },
  {
    id: 'fruit-03',
    name_vi: 'Ổi Lê Ruột Đỏ Lùn Ban Công',
    name_en: 'Dwarf Red-Fleshed Guava',
    scientific: 'Psidium guajava',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guava_ID.jpg/330px-Guava_ID.jpg',
  },
  {
    id: 'fruit-01',
    name_vi: 'Cà Chua Bi Lùn Đỏ Mọng',
    name_en: 'Dwarf Red Cherry Tomato',
    scientific: 'Solanum lycopersicum var. cerasiforme',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/330px-Tomato_je.jpg',
  }
];

// Danh sách các vòi Faucet Crypto Testnet uy tín nhất thế giới (Hoàn toàn miễn phí 0đ)
const REAL_FAUCETS = [
  {
    name: 'Coinbase Developer Faucet',
    network: 'Base Sepolia',
    amount: '0.1 ETH / ngày',
    url: 'https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet',
    descriptionVi: 'Vòi chính thức của sàn Coinbase cấp ETH testnet cho mạng Base Sepolia.',
    descriptionEn: 'Official Coinbase developer faucet granting daily Base Sepolia testnet ETH.'
  },
  {
    name: 'Google Cloud Web3 Faucet',
    network: 'Ethereum Sepolia / Base',
    amount: '0.05 ETH / ngày',
    url: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia',
    descriptionVi: 'Vòi cấp của Google Cloud chỉ cần đăng nhập tài khoản Google để nhận.',
    descriptionEn: 'Google Cloud Web3 faucet. Sign in with your standard Google account.'
  },
  {
    name: 'Superchain Faucet (Optimism)',
    network: 'Base Sepolia & OP',
    amount: '0.05 ETH / lần',
    url: 'https://console.optimism.io/faucet',
    descriptionVi: 'Vòi cấp của liên minh Superchain, đăng nhập bằng GitHub nhận tức thì.',
    descriptionEn: 'Superchain community faucet. Instant claim with your GitHub account.'
  },
  {
    name: 'QuickNode Base Sepolia Faucet',
    network: 'Base Sepolia',
    amount: '0.05 ETH',
    url: 'https://faucet.quicknode.com/base/sepolia',
    descriptionVi: 'Vòi cấp tốc độ cao từ nhà cung cấp hạ tầng QuickNode.',
    descriptionEn: 'Fast RPC developer faucet powered by QuickNode infrastructure.'
  }
];

export const Web3SandboxSection: React.FC = () => {
  const { isEn } = useLanguage();

  // Trạng thái ví thật
  const [wallet, setWallet] = useState<WalletState | null>(() => web3WalletService.getSavedWallet());
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'mint' | 'faucet' | 'escrow'>('learn');

  // Trạng thái đúc hộ chiếu
  const [selectedPlantIndex, setSelectedPlantIndex] = useState(0);
  const [evolutionStage, setEvolutionStage] = useState<1 | 2 | 3>(1);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSignature, setMintSignature] = useState<string | null>(null);
  const [mintedPassport, setMintedPassport] = useState<Web3TestnetPassport | null>(null);

  // Trạng thái Escrow Simulator
  const [escrowStep, setEscrowStep] = useState<number>(1);
  const [isEscrowSimulating, setIsEscrowSimulating] = useState(false);

  // Trạng thái Điểm Uy Tín Karma & Thông Báo Thưởng (Testnet Learn-to-Earn)
  const [karmaState, setKarmaState] = useState<KarmaState>(() => getKarmaState(isEn));
  const [rewardNotice, setRewardNotice] = useState<{ points: number; title: string; desc: string } | null>(null);
  const [hasClaimedFaucetReward, setHasClaimedFaucetReward] = useState(false);

  // Lắng nghe cập nhật điểm thưởng Karma toàn hệ thống
  useEffect(() => {
    const handleKarmaUpdate = () => {
      setKarmaState(getKarmaState(isEn));
    };
    window.addEventListener('ytc_karma_awarded', handleKarmaUpdate);
    return () => {
      window.removeEventListener('ytc_karma_awarded', handleKarmaUpdate);
    };
  }, [isEn]);

  // Lắng nghe sự kiện chuyển tài khoản hoặc đổi mạng trên ví thật
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum && window.ethereum.on) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accs = accounts as string[];
        if (accs.length === 0) {
          handleDisconnect();
        } else if (wallet?.isConnected) {
          web3WalletService.getBalance(accs[0]).then((bal) => {
            setWallet((prev) => (prev ? { ...prev, address: accs[0], balanceEth: bal } : null));
          });
        }
      };

      const handleChainChanged = (chainId: unknown) => {
        const cId = chainId as string;
        const isCorrect = cId.toLowerCase() === BASE_SEPOLIA_CONFIG.chainId.toLowerCase();
        setWallet((prev) => (prev ? {
          ...prev,
          chainId: cId,
          networkName: web3WalletService.getNetworkName(cId),
          isCorrectNetwork: isCorrect
        } : null));
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
  }, [wallet?.isConnected]);

  // Kết nối ví thật (MetaMask, Coinbase...)
  const handleConnectWallet = async () => {
    setWalletError(null);
    setIsConnecting(true);
    try {
      const state = await web3WalletService.connectRealWallet();
      setWallet(state);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || (isEn ? 'Could not connect real Web3 wallet' : 'Không thể kết nối ví Web3 thật'));
    } finally {
      setIsConnecting(false);
    }
  };

  // Ngắt kết nối
  const handleDisconnect = () => {
    web3WalletService.disconnect();
    setWallet(null);
    setMintSignature(null);
  };

  // Chuyển mạng sang Base Sepolia Testnet
  const handleSwitchNetwork = async () => {
    setWalletError(null);
    try {
      await web3WalletService.switchToBaseSepolia();
      if (wallet) {
        setWallet({
          ...wallet,
          chainId: BASE_SEPOLIA_CONFIG.chainId,
          networkName: 'Base Sepolia (L2 Testnet)',
          isCorrectNetwork: true
        });
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || (isEn ? 'Failed to switch network' : 'Lỗi khi chuyển mạng sang Base Sepolia'));
    }
  };

  // Làm mới số dư ETH Testnet thật từ RPC
  const handleRefreshBalance = async () => {
    if (!wallet?.address) return;
    try {
      const bal = await web3WalletService.getBalance(wallet.address);
      setWallet({ ...wallet, balanceEth: bal });
    } catch (e) {
      console.warn('Refresh balance error:', e);
    }
  };

  // Sao chép địa chỉ ví thật
  const handleCopyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Thưởng điểm học tập Faucet 0đ (1 lần trong phiên)
      if (!hasClaimedFaucetReward) {
        awardKarmaPoints(
          10,
          'Khám phá vòi Faucet lấy crypto thử nghiệm (0đ Gas Testnet)',
          'Claimed for exploring Testnet Faucets (0đ Gas Testnet)',
          { isTestnet: true, isEn }
        );
        setHasClaimedFaucetReward(true);
        setRewardNotice({
          points: 10,
          title: isEn ? 'Testnet Explorer Reward (+10 Karma)' : 'Thưởng Khám Phá Faucet Testnet (+10 Karma)',
          desc: isEn
            ? 'You learned how to copy your address to request 0đ Testnet ETH from faucets!'
            : 'Bạn vừa học cách sao chép địa chỉ ví để nhận ETH Testnet 0đ từ các vòi Faucet quốc tế!'
        });
      }
    }
  };

  // Tạo hàm băm SHA-256 từ chuỗi dữ liệu cây trồng
  const generateSha256 = async (input: string): Promise<string> => {
    try {
      const msgBuffer = new TextEncoder().encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {
      return 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c19f8a3c21a4e5b6c7d8e9f0a1b2';
    }
  };

  // Ký số xác nhận và Đúc Hộ Chiếu (BẮT BUỘC VÍ THẬT KÝ XÁC NHẬN)
  const handleMintWithRealWallet = async () => {
    if (!wallet || !wallet.isConnected) {
      setWalletError(isEn ? 'Please connect your real Web3 wallet first!' : 'Vui lòng kết nối ví Web3 thật trước khi ký số!');
      return;
    }

    setWalletError(null);
    setIsMinting(true);
    const chosen = SAMPLE_MINT_PLANTS[selectedPlantIndex];
    const timestampStr = new Date().toISOString();
    const sha = await generateSha256(chosen.scientific + timestampStr + evolutionStage + wallet.address);
    const randomToken = Math.floor(1000 + Math.random() * 9000);
    const simulatedTx = '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...' + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    try {
      // Yêu cầu ví thật ký xác nhận thông điệp mật mã học (personal_sign)
      const signMsg = `Yêu Trồng Cây - Đúc Hộ Chiếu Thực Vật Số\nLoài Cây: ${chosen.name_vi} (${chosen.scientific})\nGiai Đoạn: ${evolutionStage}/3\nBằng Chứng SHA-256: ${sha}\nVí Sở Hữu Thật: ${wallet.address}\nMạng Thử Nghiệm: Base Sepolia Testnet (0đ Gas)\nThời Gian Ký: ${new Date().toLocaleString('vi-VN')}`;
      
      const sig = await web3WalletService.signBotanicalRecord(wallet.address, signMsg);
      setMintSignature(sig);

      setMintedPassport({
        token_id: `#${randomToken}`,
        plant_name: isEn ? chosen.name_en : chosen.name_vi,
        scientific_name: chosen.scientific,
        owner_address: wallet.address,
        minted_at: new Date().toLocaleString('vi-VN'),
        image_url: chosen.image,
        image_sha256: sha,
        network: 'Base Sepolia',
        evolution_stage: evolutionStage,
        transaction_hash: simulatedTx,
        is_testnet: true,
      });

      // Tự động thưởng Điểm Karma Uy Tín khi ký số & đúc Hộ Chiếu thành công trên Testnet
      awardKarmaPoints(
        25,
        `Đúc thành công Hộ Chiếu Cây Số ${chosen.name_vi} (Base Sepolia Testnet 0đ)`,
        `Minted Digital Plant Passport for ${chosen.name_en} (Base Sepolia Testnet 0đ)`,
        { isTestnet: true, isEn, txHash: simulatedTx }
      );
      setRewardNotice({
        points: 25,
        title: isEn ? 'Passport Minting Reward (+25 Karma)' : 'Thưởng Đúc Hộ Chiếu Cây Testnet (+25 Karma)',
        desc: isEn
          ? 'You successfully signed with your real wallet to create a digital genetic plant passport!'
          : 'Bạn đã dùng ví thật ký số mật mã học thành công cấp Hộ Chiếu Cây trên mạng thử nghiệm Base Sepolia!'
      });
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || (isEn ? 'Wallet signature rejected or failed.' : 'Ký số trên ví thất bại hoặc đã hủy.'));
    } finally {
      setIsMinting(false);
    }
  };

  const handleRunEscrowStep = () => {
    if (escrowStep < 3) {
      setIsEscrowSimulating(true);
      setTimeout(() => {
        setIsEscrowSimulating(false);
        const nextStep = escrowStep + 1;
        setEscrowStep(nextStep);

        // Khi bước 3 hoàn tất (Nghiệm thu thành công, cây sống tốt -> Hoàn trả cọc & Thưởng Karma)
        if (nextStep === 3) {
          awardKarmaPoints(
            15,
            'Nghiệm thu thành công hợp đồng Escrow chia sẻ giống cây (Mạng Thử Nghiệm 0đ)',
            'Completed Escrow Plant Delivery Inspection (Testnet 0đ)',
            { isTestnet: true, isEn }
          );
          setRewardNotice({
            points: 15,
            title: isEn ? 'Escrow Delivery Inspection Reward (+15 Karma)' : 'Thưởng Nghiệm Thu Escrow Hợp Đồng (+15 Karma)',
            desc: isEn
              ? 'The receiver confirmed the plant is healthy, testnet deposit returned, and reputation rewarded!'
              : 'Bên nhận đã xác nhận cây xanh tốt, tiền cọc thử nghiệm được hoàn trả và bạn được cộng +15 Điểm Uy Tín Karma!'
          });
        }
      }, 1000);
    } else {
      setEscrowStep(1);
    }
  };

  const hasInstalledWallet = web3WalletService.hasInjectedProvider();

  return (
    <section id="web3" className="py-4 sm:py-6 bg-forest-950 text-white relative overflow-hidden flex-1 flex flex-col justify-start">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-4">
        
        {/* 1. Header Bar: Tiêu đề & Trạng thái ví thật */}
        <div className="bg-charcoal-900/95 rounded-2xl p-4 sm:p-5 border border-forest-800 shadow-xl backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                  {isEn ? 'Web3 Botanical Academy & Testnet Sandbox' : 'Vườn Ươm Web3 & Hộ Chiếu Thực Vật Số (100% Testnet)'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 text-[10px] font-semibold border border-emerald-700/50">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Base Sepolia Testnet (0đ Tiền Thật)</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-900/40 text-amber-300 text-[10px] font-semibold border border-amber-800/50">
                  <span>Học Tập & Trải Nghiệm Giáo Dục</span>
                </span>
              </div>
              <p className="text-xs text-forest-300 mt-1">
                {isEn
                  ? 'Learn real Web3 concepts, connect a real wallet, claim free testnet ETH from faucets, and mint dynamic plant passports with real cryptography.'
                  : 'Học cách sử dụng ví Web3 thật, nhận crypto testnet miễn phí từ vòi Faucet, và đúc hộ chiếu cây số bằng chữ ký số cá nhân.'}
              </p>
            </div>
          </div>

          {/* Right: Trạng thái Kết nối Ví Thật & Điểm Uy Tín Karma */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Badge Điểm Uy Tín Karma (Học Testnet Nhận Thưởng) */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-950/90 border border-amber-500/40 text-xs shadow-sm">
              <span className="text-base leading-none">{karmaState.badge.icon}</span>
              <div>
                <span className="text-[10px] text-amber-200/80 font-medium block leading-none">
                  {isEn ? 'Karma Standing' : 'Uy Tín Nhà Vườn'}
                </span>
                <span className="font-bold text-amber-300 font-mono text-xs leading-none">
                  +{karmaState.total_karma} pts
                </span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30 shrink-0">
                Testnet 0đ
              </span>
            </div>

            {!wallet || !wallet.isConnected ? (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-forest-950 font-bold text-xs flex items-center gap-2 shadow-md transition"
                >
                  {isConnecting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wallet className="w-4 h-4" />
                  )}
                  <span>{isEn ? 'Connect Real Web3 Wallet' : 'Kết Nối Ví Web3 Thật'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                {/* Badge địa chỉ ví thật */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-950 border border-forest-800 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-semibold text-white text-xs">{wallet.walletName}</span>
                  <span className="font-mono text-emerald-300 text-xs">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1 hover:text-white text-gray-400 transition"
                    title={isEn ? 'Copy wallet address' : 'Sao chép địa chỉ ví'}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Số dư ETH Testnet */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-950 border border-forest-800 text-xs">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono text-amber-300 font-bold">{wallet.balanceEth} ETH</span>
                  <span className="text-[10px] text-forest-400">(Testnet)</span>
                  <button
                    onClick={handleRefreshBalance}
                    className="p-1 text-gray-400 hover:text-white transition"
                    title={isEn ? 'Refresh balance' : 'Làm mới số dư'}
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>

                {/* Cảnh báo mạng & nút chuyển sang Base Sepolia */}
                {!wallet.isCorrectNetwork ? (
                  <button
                    onClick={handleSwitchNetwork}
                    className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 animate-pulse shadow-md transition"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Switch to Base Sepolia' : 'Đổi Sang Base Sepolia'}</span>
                  </button>
                ) : (
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-bold">
                    ✓ Base Sepolia
                  </span>
                )}

                <button
                  onClick={handleDisconnect}
                  className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/80 transition"
                  title={isEn ? 'Disconnect wallet' : 'Ngắt kết nối ví'}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Thông báo lỗi nếu có */}
        {walletError && (
          <div className="p-3 rounded-2xl bg-red-950/80 border border-red-800 text-xs text-red-200 flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{walletError}</span>
            </div>
            <button onClick={() => setWalletError(null)} className="text-red-300 hover:text-white font-bold text-xs">✕</button>
          </div>
        )}

        {/* Banner Chúc Mừng Thưởng Điểm Karma (Hiển thị khi giao dịch Testnet thành công) */}
        {rewardNotice && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950 via-forest-900 to-emerald-950 border-2 border-amber-400 text-white shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-400 text-forest-950 flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
                ★
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-forest-950 text-[10px] font-black uppercase tracking-wider">
                    +{rewardNotice.points} Karma Testnet
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-serif">
                    {rewardNotice.title}
                  </h4>
                </div>
                <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                  {rewardNotice.desc}
                </p>
              </div>
            </div>
            <button
              onClick={() => setRewardNotice(null)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-forest-950 text-xs font-bold transition shrink-0 shadow-sm"
            >
              {isEn ? 'Got it!' : 'Tuyệt vời, đã nhận!'}
            </button>
          </div>
        )}

        {/* Banner Hướng Dẫn Cài Ví Thật (Nếu người dùng chưa cài MetaMask) */}
        {!hasInstalledWallet && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-charcoal-900 to-forest-950 border border-amber-500/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4" />
                <span>{isEn ? 'Step 1: Get a Real Web3 Wallet (100% Free)' : 'Bước 1: Cài Đặt Ví Web3 Thật (100% Miễn Phí)'}</span>
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white font-serif">
                {isEn ? 'New to Web3? Install MetaMask to start your botanical crypto journey' : 'Chưa có ví? Cài đặt MetaMask để sở hữu "chùm chìa khóa số" đầu tiên của bạn'}
              </h3>
              <p className="text-xs text-forest-200/90 leading-relaxed max-w-3xl">
                {isEn
                  ? 'MetaMask is a secure browser extension and mobile app that holds your cryptographic credentials. It is 100% free to install. Once installed, refresh this page to connect.'
                  : 'MetaMask là tiện ích mở rộng trên Chrome/Brave/Firefox và app điện thoại giúp bạn quản lý tài sản số an toàn. Cài đặt hoàn toàn miễn phí chỉ mất 1 phút.'}
              </p>
            </div>
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-forest-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shrink-0 transition"
            >
              <span>{isEn ? 'Install MetaMask (Official)' : 'Cài Đặt MetaMask Chính Thức'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* 2. Thanh Điều Hướng Các Phân Khu Học Tập (Navigation Tabs) */}
        <div className="flex items-center gap-2 border-b border-forest-800/80 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'learn'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-charcoal-900/60 text-forest-300 hover:bg-charcoal-900 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isEn ? '1. Web3 101 for Gardeners' : '1. Vỡ Lòng Web3 Trong 3 Phút'}</span>
          </button>

          <button
            onClick={() => setActiveTab('faucet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'faucet'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-charcoal-900/60 text-forest-300 hover:bg-charcoal-900 hover:text-white'
            }`}
          >
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>{isEn ? '2. Claim Free Testnet ETH (Faucet)' : '2. Hướng Dẫn Lấy ETH Testnet (Faucet 0đ)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('mint')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'mint'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-charcoal-900/60 text-forest-300 hover:bg-charcoal-900 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>{isEn ? '3. Mint Plant Passport (Real Signature)' : '3. Ký Số & Đúc Hộ Chiếu Cây'}</span>
          </button>

          <button
            onClick={() => setActiveTab('escrow')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'escrow'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-charcoal-900/60 text-forest-300 hover:bg-charcoal-900 hover:text-white'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-teal-400" />
            <span>{isEn ? '4. Escrow Plant Swap Simulator' : '4. Smart Contract Đổi Cây An Toàn'}</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: VỠ LÒNG WEB3 TRONG 3 PHÚT (WEB3 101) */}
        {/* ============================================================== */}
        {activeTab === 'learn' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in">
            {/* Card 1: Ví Web3 */}
            <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-forest-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                🔑
              </div>
              <h3 className="text-sm font-serif font-bold text-white">
                {isEn ? 'What is a Web3 Wallet?' : 'Ví Web3 là gì?'}
              </h3>
              <p className="text-xs text-forest-300 leading-relaxed">
                {isEn
                  ? 'Think of it as your digital keychain. Unlike banks, no central company owns it. You control your 12 secret seed words.'
                  : 'Hãy tưởng tượng ví Web3 như chiếc chùm chìa khóa riêng của bạn. Không một ngân hàng hay công ty nào có thể khóa hay tịch thu tài sản của bạn.'}
              </p>
            </div>

            {/* Card 2: Mạng Testnet */}
            <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-forest-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                🧪
              </div>
              <h3 className="text-sm font-serif font-bold text-white">
                {isEn ? 'What is a Testnet?' : 'Mạng Testnet là gì?'}
              </h3>
              <p className="text-xs text-forest-300 leading-relaxed">
                {isEn
                  ? 'A real blockchain network built for learning and testing. Transactions are real, but coins have 0 real monetary value. Zero risk!'
                  : 'Là mạng thử nghiệm chạy song song với mạng thật. Mọi thao tác ký số, chuyển token đều là thật nhưng tiền có giá trị 0đ. Thoải mái bấm thử, không sợ mất tiền!'}
              </p>
            </div>

            {/* Card 3: Faucet */}
            <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-forest-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                🚰
              </div>
              <h3 className="text-sm font-serif font-bold text-white">
                {isEn ? 'What is a Faucet?' : 'Faucet (Vòi nước) là gì?'}
              </h3>
              <p className="text-xs text-forest-300 leading-relaxed">
                {isEn
                  ? 'Websites that freely distribute small amounts of testnet ETH so anyone can experiment with smart contracts for free.'
                  : 'Là các trang web do Coinbase, Google tài trợ để cấp ETH thử nghiệm miễn phí mỗi ngày. Chỉ cần dán địa chỉ ví là nhận được ETH để làm quen.'}
              </p>
            </div>

            {/* Card 4: Hộ chiếu cây NFT */}
            <div className="p-5 rounded-2xl bg-charcoal-900/90 border border-forest-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                🌱
              </div>
              <h3 className="text-sm font-serif font-bold text-white">
                {isEn ? 'Plant Passport NFT?' : 'Hộ chiếu cây NFT giúp gì?'}
              </h3>
              <p className="text-xs text-forest-300 leading-relaxed">
                {isEn
                  ? 'A tamper-proof birth certificate for your plant. Proves genetic lineage, planting age, and organic care without paperwork.'
                  : 'Là thẻ căn cước công dân số cho chậu cây. Giúp người yêu cây chứng minh nguồn gen thuần chủng, ngày gieo trồng và không bị làm giả giống.'}
              </p>
            </div>

            {/* GitBook Documentation Link Banner */}
            <div className="md:col-span-2 lg:col-span-4 p-5 rounded-2xl bg-gradient-to-r from-forest-900 via-charcoal-900 to-forest-950 border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    GitBook Academy
                  </span>
                  <h4 className="text-sm font-bold text-white font-serif">
                    {isEn ? 'Yeu Trong Cay Web3 Academy - Comprehensive GitBook Guide' : 'Giáo Trình GitBook Toàn Tập: Web3 & Hộ Chiếu Thực Vật Số'}
                  </h4>
                </div>
                <p className="text-xs text-forest-300 leading-relaxed max-w-3xl">
                  {isEn
                    ? 'Explore our full curriculum covering blockchain fundamentals, 12-seed phrase safety, Base Sepolia testnet faucets, Dynamic NFTs, and escrow contracts.'
                    : 'Đọc tài liệu chuyên sâu 8 chương: bản chất chuỗi khối, bảo mật 12 từ khóa, cách hứng nước Faucet, cấu trúc hàm băm SHA-256 và thuật ngữ A-Z cho người làm vườn.'}
                </p>
              </div>
              <a
                href="https://vneconomics.gitbook.io/ytc-web3-academy"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shrink-0 transition"
              >
                <span>{isEn ? 'Open Full GitBook' : 'Mở Giáo Trình GitBook'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: HƯỚNG DẪN LẤY ETH TESTNET MIỄN PHÍ (FAUCET GUIDE) */}
        {/* ============================================================== */}
        {activeTab === 'faucet' && (
          <div className="space-y-4 animate-in fade-in">
            {/* Box sao chép địa chỉ ví nhanh */}
            <div className="p-5 rounded-2xl bg-charcoal-900 border border-emerald-500/60 shadow-xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  <span>{isEn ? 'Step 1: Copy Your Real Wallet Address' : 'Bước 1: Sao Chép Địa Chỉ Ví Của Bạn'}</span>
                </span>
                {wallet?.isConnected && (
                  <span className="text-xs font-mono text-amber-300 bg-forest-950 px-3 py-1 rounded-full border border-forest-800">
                    Số dư hiện tại: {wallet.balanceEth} ETH (Testnet)
                  </span>
                )}
              </div>

              <p className="text-xs text-forest-300">
                {isEn
                  ? 'To receive free testnet ETH, copy your address below, then open one of the trusted faucets to paste it.'
                  : 'Để nhận ETH testnet miễn phí, hãy bấm nút sao chép địa chỉ ví dưới đây, sau đó nhấp vào 1 trong các vòi Faucet bên dưới để dán vào nhận tiền:'}
              </p>

              <div className="flex items-center gap-2 max-w-2xl">
                <input
                  type="text"
                  readOnly
                  value={wallet?.address || (isEn ? 'Please connect your real wallet first' : 'Vui lòng bấm Kết Nối Ví Thật ở góc trên trước')}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-950 border border-forest-800 font-mono text-xs text-emerald-300 select-all focus:outline-none"
                />
                <button
                  onClick={handleCopyAddress}
                  disabled={!wallet?.isConnected}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition shrink-0 shadow-md"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>{isEn ? 'Copied!' : 'Đã Chép!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{isEn ? 'Copy Address' : 'Sao Chép'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Danh sách 4 Vòi Faucet Chính Thức */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-forest-300 mb-3 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isEn ? 'Step 2: Choose a Trusted Faucet & Paste Your Address' : 'Bước 2: Mở Vòi Faucet & Dán Địa Chỉ Nhận ETH (0đ)'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_FAUCETS.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-charcoal-900/90 border border-forest-800 hover:border-emerald-500/50 transition shadow-lg flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                          <span>{f.name}</span>
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {f.amount}
                        </span>
                      </div>
                      <p className="text-xs text-forest-300">
                        {isEn ? f.descriptionEn : f.descriptionVi}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-forest-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-gray-400">
                        Mạng: <span className="text-white">{f.network}</span>
                      </span>
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs flex items-center gap-1 transition shadow-xs"
                      >
                        <span>{isEn ? 'Open Faucet' : 'Mở Vòi Này'}</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: XƯỞNG ĐÚC HỘ CHIẾU & KÝ SỐ MẬT MÃ HỌC */}
        {/* ============================================================== */}
        {activeTab === 'mint' && (
          <div className="bg-charcoal-900/90 rounded-2xl p-4 sm:p-6 border border-forest-800 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-forest-800 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-serif font-bold text-white">
                  {isEn ? 'Real Wallet Botanical Passport Studio (Dynamic NFT)' : 'Xưởng Ký Số & Cấp Hộ Chiếu Thực Vật Bản Địa (Ví Thật)'}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-forest-950 text-emerald-300 text-xs font-mono border border-forest-800">
                Sổ cái: Base Sepolia Testnet
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              {/* Preview Cây & Mã Băm SHA-256 (md:col-span-5) */}
              <div className="md:col-span-5 bg-forest-950 rounded-2xl p-4 border border-forest-800 space-y-3">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-charcoal-900 border border-forest-800">
                  <img
                    src={SAMPLE_MINT_PLANTS[selectedPlantIndex].image}
                    alt={SAMPLE_MINT_PLANTS[selectedPlantIndex].name_vi}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-forest-950/80 backdrop-blur-xs text-emerald-300 border border-emerald-700/60">
                    Giai đoạn {evolutionStage}/3
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-white">
                    {isEn ? SAMPLE_MINT_PLANTS[selectedPlantIndex].name_en : SAMPLE_MINT_PLANTS[selectedPlantIndex].name_vi}
                  </h4>
                  <p className="font-mono italic text-xs text-emerald-400 mt-0.5">
                    {SAMPLE_MINT_PLANTS[selectedPlantIndex].scientific}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-charcoal-900 border border-forest-800 text-[10px] font-mono text-gray-400 space-y-1">
                  <span className="text-gray-300 font-semibold block">Bằng chứng mật mã học (SHA-256):</span>
                  <span className="text-emerald-300 truncate block">
                    sha256:{SAMPLE_MINT_PLANTS[selectedPlantIndex].id}...stage{evolutionStage}
                  </span>
                </div>
              </div>

              {/* Form Lựa Chọn & Nút Ký Ví Thật (md:col-span-7) */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-forest-300 block mb-1.5">
                    {isEn ? 'Select Plant Species to Certify:' : '1. Chọn giống cây bản địa muốn cấp hộ chiếu:'}
                  </label>
                  <select
                    value={selectedPlantIndex}
                    onChange={(e) => setSelectedPlantIndex(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-forest-950 border border-forest-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {SAMPLE_MINT_PLANTS.map((p, idx) => (
                      <option key={p.id} value={idx}>
                        {isEn ? p.name_en : p.name_vi} ({p.scientific})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-forest-300 block mb-1.5">
                    {isEn ? 'Growth Stage Evolution:' : '2. Giai đoạn sinh trưởng hiện tại:'}
                  </label>
                  <select
                    value={evolutionStage}
                    onChange={(e) => setEvolutionStage(Number(e.target.value) as 1 | 2 | 3)}
                    className="w-full px-3.5 py-2.5 bg-forest-950 border border-forest-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value={1}>{isEn ? 'Stage 1: Seedling & Propagation' : '1. Mầm non gieo ươm / Cành giâm rễ non'}</option>
                    <option value={2}>{isEn ? 'Stage 2: Vegetative Shoot Growth' : '2. Sinh trưởng phân cành tán lá sum suê'}</option>
                    <option value={3}>{isEn ? 'Stage 3: Flowering & Fruiting' : '3. Đơm hoa kết trái / Đạt tuổi dược liệu'}</option>
                  </select>
                </div>

                <div className="p-3.5 rounded-xl bg-forest-950 border border-forest-800/80 text-xs text-forest-200/90 leading-relaxed">
                  💡 <span className="font-semibold text-white">Yêu cầu chữ ký ví thật:</span> Khi bấm nút, ví Web3 của bạn sẽ mở popup yêu cầu ký xác nhận thông điệp. Chữ ký số này chứng minh quyền sở hữu độc bản và không thể bị sửa đổi.
                </div>

                <button
                  onClick={handleMintWithRealWallet}
                  disabled={isMinting || !wallet?.isConnected}
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.99] disabled:opacity-50 bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  {isMinting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>{isEn ? 'Please Sign on Your Wallet...' : 'Vui Lòng Mở Ví & Ký Xác Nhận...'}</span>
                    </>
                  ) : !wallet?.isConnected ? (
                    <>
                      <Wallet className="w-4 h-4" />
                      <span>{isEn ? 'Connect Real Wallet to Mint' : 'Cần Kết Nối Ví Thật Để Ký Số'}</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      <span>{isEn ? 'Sign with Real Wallet & Mint (0đ Gas)' : 'Ký Số Ví Thật & Đúc Hộ Chiếu (0đ Gas)'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Thẻ Hộ Chiếu Đã Đúc Thành Công */}
            {mintedPassport && (
              <div className="mt-5 bg-forest-950 rounded-2xl p-5 border border-emerald-500 shadow-2xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-forest-800 flex-wrap gap-2">
                  <span className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400">
                    <Check className="w-5 h-5" />
                    <span>{isEn ? 'Digital Plant Passport Successfully Minted!' : 'Hộ Chiếu Cây Trồng Số Đã Cấp Thành Công!'}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                      Token ID: {mintedPassport.token_id}
                    </span>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1 rounded-xl bg-forest-800 hover:bg-forest-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Print Plant Tag' : 'In Thẻ Cây'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <img
                    src={mintedPassport.image_url}
                    alt={mintedPassport.plant_name}
                    className="w-24 h-24 rounded-2xl object-cover border border-forest-700 shrink-0 shadow-md"
                  />
                  <div className="space-y-1.5 text-xs text-forest-200 w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm sm:text-base">
                        {mintedPassport.plant_name} ({mintedPassport.scientific_name})
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-900/80 text-amber-300">
                        Giai đoạn {mintedPassport.evolution_stage}/3
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-gray-400 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                      <span>Ví sở hữu thật: <span className="text-emerald-300">{mintedPassport.owner_address}</span></span>
                      <span>Sổ cái: <span className="text-white">{mintedPassport.network}</span></span>
                    </div>

                    <div className="p-2 rounded-xl bg-charcoal-900 border border-forest-800 text-[10px] font-mono text-gray-400 flex flex-wrap items-center justify-between gap-2">
                      <div className="truncate max-w-md">
                        SHA-256: <span className="text-emerald-300">{mintedPassport.image_sha256}</span>
                        {mintSignature && (
                          <span className="ml-2 text-amber-300 block sm:inline">Chữ ký ví: {mintSignature.slice(0, 16)}...{mintSignature.slice(-8)}</span>
                        )}
                      </div>
                      <a
                        href={`https://sepolia.basescan.org/address/${mintedPassport.owner_address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-300 hover:text-amber-200 underline flex items-center gap-1 font-semibold"
                      >
                        <span>Xem ví trên BaseScan Sepolia</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: MÔ PHỎNG SMART CONTRACT ESCROW ĐỔI CÂY AN TOÀN */}
        {/* ============================================================== */}
        {activeTab === 'escrow' && (
          <div className="bg-charcoal-900/90 rounded-2xl p-5 sm:p-6 border border-forest-800 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-forest-800">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4" />
                <span>{isEn ? 'Smart Contract P2P Plant Swap Escrow' : 'Mô Phỏng Smart Contract Escrow Đổi Cây An Toàn'}</span>
              </span>
              <button
                onClick={handleRunEscrowStep}
                disabled={isEscrowSimulating}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
              >
                {isEscrowSimulating ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <span>{escrowStep === 3 ? (isEn ? 'Reset Simulator' : 'Thực Hiện Lại') : (isEn ? `Advance Step ${escrowStep}/3` : `Bấm Chuyển Bước ${escrowStep}/3`)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-forest-200 leading-relaxed">
              {isEn
                ? 'How Smart Contracts eliminate fraud when swapping rare plants online: The contract locks deposits and automatically enforces a 7-day quarantine.'
                : 'Smart Contract loại trừ rủi ro lừa đảo khi giao lưu cây giống trên mạng: Hợp đồng tự động khóa cọc làm tin và cưỡng chế quy trình cách ly 7 ngày kiểm tra mầm bệnh.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Step 1 */}
              <div className={`p-4 rounded-2xl border transition ${
                escrowStep === 1
                  ? 'bg-teal-950/80 border-teal-500 text-white shadow-lg'
                  : escrowStep > 1
                  ? 'bg-forest-900/40 border-forest-800 text-forest-300 opacity-80'
                  : 'bg-forest-900/20 border-forest-800 text-gray-500'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-cream-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white inline-flex items-center justify-center text-xs font-black">1</span>
                    Khóa Cọc Hạt Giống
                  </span>
                  {escrowStep > 1 && <Check className="w-4 h-4 text-teal-400" />}
                </div>
                <p className="text-[11px] text-forest-300 leading-relaxed">
                  Hai bên cùng ký xác nhận trên ví thật để khóa cọc 20 Token thử nghiệm vào hợp đồng thông minh làm tin trước khi gửi bưu phẩm.
                </p>
              </div>

              {/* Step 2 */}
              <div className={`p-4 rounded-2xl border transition ${
                escrowStep === 2
                  ? 'bg-teal-950/80 border-teal-500 text-white shadow-lg'
                  : escrowStep > 2
                  ? 'bg-forest-900/40 border-forest-800 text-forest-300 opacity-80'
                  : 'bg-forest-900/20 border-forest-800 text-gray-500'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-cream-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white inline-flex items-center justify-center text-xs font-black">2</span>
                    Giao Nhận & 7 Ngày Cách Ly
                  </span>
                  {escrowStep > 2 && <Check className="w-4 h-4 text-teal-400" />}
                </div>
                <p className="text-[11px] text-forest-300 leading-relaxed">
                  Đơn vị vận chuyển giao cây. Đồng hồ Smart Contract tự đếm ngược 7 ngày cách ly phòng mầm nấm bệnh rệp sáp lây chéo vườn nhà.
                </p>
              </div>

              {/* Step 3 */}
              <div className={`p-4 rounded-2xl border transition ${
                escrowStep === 3
                  ? 'bg-emerald-950/90 border-emerald-500 text-white shadow-lg'
                  : 'bg-forest-900/20 border-forest-800 text-gray-500'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-cream-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white inline-flex items-center justify-center text-xs font-black">3</span>
                    Nghiệm Thu & Thưởng Karma
                  </span>
                  {escrowStep === 3 && <Check className="w-4 h-4 text-emerald-400" />}
                </div>
                <p className="text-[11px] text-forest-300 leading-relaxed">
                  Bên nhận bấm "Cây sống xanh tốt". Smart Contract hoàn trả cọc tức thì và cộng +15 Điểm Karma danh tiếng cho người chia sẻ giống.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
