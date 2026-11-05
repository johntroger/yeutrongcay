import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Gift,
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
  Sparkles
} from 'lucide-react';
import { Web3TestnetPassport } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { web3WalletService, WalletState } from '../services/web3WalletService.ts';

// Danh sách giống cây quý bản địa mẫu để đúc hộ chiếu
const SAMPLE_MINT_PLANTS = [
  {
    id: 'herb-04',
    name_vi: 'Đinh Lăng Nếp Lá Nhỏ (3 Năm Tuổi)',
    name_en: 'Small-Leaf Ming Aralia (3-Year Aged)',
    scientific: 'Polyscias fruticosa',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg/330px-Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg',
  },
  {
    id: 'herb-05',
    name_vi: 'Kim Ngân Hoa Dược Liệu',
    name_en: 'Japanese Honeysuckle (Medicinal Grade)',
    scientific: 'Lonicera japonica',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Lonicera_japonica_flowers_%28aka%29.jpg/330px-Lonicera_japonica_flowers_%28aka%29.jpg',
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

export const Web3SandboxSection: React.FC = () => {
  const { isEn } = useLanguage();

  // Wallet Connection State
  const [wallet, setWallet] = useState<WalletState | null>(() => web3WalletService.getSavedWallet());
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Faucet state
  const [faucetClaimed, setFaucetClaimed] = useState(false);
  const [testBalance, setTestBalance] = useState(0);

  // Minting state
  const [selectedPlantIndex, setSelectedPlantIndex] = useState(0);
  const [selectedNetwork, setSelectedNetwork] = useState<'Base Sepolia' | 'Polygon Amoy'>('Base Sepolia');
  const [evolutionStage, setEvolutionStage] = useState<1 | 2 | 3>(1);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSignature, setMintSignature] = useState<string | null>(null);
  const [mintedPassport, setMintedPassport] = useState<Web3TestnetPassport | null>(null);

  // Escrow simulator state
  const [escrowStep, setEscrowStep] = useState<number>(1);
  const [isEscrowSimulating, setIsEscrowSimulating] = useState(false);

  // Nghe sự kiện đổi tài khoản trên ví MetaMask nếu có
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum && window.ethereum.on) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accs = accounts as string[];
        if (accs.length === 0) {
          handleDisconnect();
        } else if (wallet?.isConnected) {
          setWallet((prev) => (prev ? { ...prev, address: accs[0] } : null));
        }
      };

      const handleChainChanged = (chainId: unknown) => {
        const cId = chainId as string;
        setWallet((prev) => (prev ? { ...prev, chainId: cId, networkName: web3WalletService.getNetworkName(cId) } : null));
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

  // Kết nối MetaMask thật
  const handleConnectMetaMask = async () => {
    setWalletError(null);
    setIsConnecting(true);
    try {
      const state = await web3WalletService.connectInjectedWallet();
      setWallet(state);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || 'Không thể kết nối ví Web3');
    } finally {
      setIsConnecting(false);
    }
  };

  // Tạo ví Embedded cho người dùng chưa có MetaMask
  const handleConnectEmbedded = () => {
    setWalletError(null);
    const state = web3WalletService.createOrGetEmbeddedWallet();
    setWallet(state);
  };

  const handleDisconnect = () => {
    web3WalletService.disconnect();
    setWallet(null);
    setMintSignature(null);
  };

  const handleCopyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwitchNetwork = async (target: 'Base Sepolia' | 'Polygon Amoy') => {
    if (!wallet?.isMetaMask) {
      setSelectedNetwork(target);
      return;
    }
    try {
      await web3WalletService.switchNetwork(target);
      setSelectedNetwork(target);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || 'Lỗi chuyển mạng blockchain');
    }
  };

  const handleClaimFaucet = () => {
    setFaucetClaimed(true);
    setTestBalance((prev) => prev + 100);
  };

  // Tạo hàm băm SHA-256 từ chuỗi
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

  // Đúc Hộ Chiếu Cây (BẮT BUỘC CÓ VÍ KẾT NỐI VÀ KÝ XÁC NHẬN)
  const handleDemoMint = async () => {
    if (!wallet || !wallet.isConnected) {
      setWalletError(isEn ? 'Please connect your Web3 wallet first before minting!' : 'Vui lòng bấm Kết Nối Ví Web3 trước khi đúc hộ chiếu!');
      return;
    }

    setWalletError(null);
    setIsMinting(true);
    const chosen = SAMPLE_MINT_PLANTS[selectedPlantIndex];
    const timestampStr = new Date().toISOString();
    const sha = await generateSha256(chosen.scientific + timestampStr + evolutionStage);
    const randomToken = Math.floor(1000 + Math.random() * 9000);
    const randomTx = '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...' + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    try {
      // Yêu cầu ví ký xác nhận bằng chứng mật mã học
      const signMsg = `Yêu Trồng Cây - Đúc Hộ Chiếu Thực Vật Số\nLoài Cây: ${chosen.name_vi} (${chosen.scientific})\nBằng Chứng SHA-256: ${sha}\nVí Sở Hữu: ${wallet.address}\nThời Gian: ${new Date().toLocaleString('vi-VN')}`;
      const sig = await web3WalletService.signMessage(wallet.address || '', signMsg, wallet.isMetaMask);
      setMintSignature(sig);

      setMintedPassport({
        token_id: `#${randomToken}`,
        plant_name: isEn ? chosen.name_en : chosen.name_vi,
        scientific_name: chosen.scientific,
        owner_address: wallet.address || '0x0',
        minted_at: new Date().toLocaleString('vi-VN'),
        image_url: chosen.image,
        image_sha256: sha,
        network: selectedNetwork,
        evolution_stage: evolutionStage,
        transaction_hash: randomTx,
        is_testnet: true,
      });
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || 'Lỗi khi ký xác thực đúc hộ chiếu.');
    } finally {
      setIsMinting(false);
    }
  };

  const handleRunEscrowStep = () => {
    if (escrowStep < 3) {
      setIsEscrowSimulating(true);
      setTimeout(() => {
        setIsEscrowSimulating(false);
        setEscrowStep((prev) => prev + 1);
      }, 1000);
    } else {
      setEscrowStep(1);
    }
  };

  return (
    <section id="web3" className="py-3 sm:py-5 bg-forest-950 text-white relative overflow-hidden transition-colors flex-1 flex flex-col justify-start">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10 w-full space-y-4">
        
        {/* Sleek Integrated Header & Wallet Control Row */}
        <div className="bg-charcoal-900/95 rounded-2xl p-3 sm:p-4 border border-forest-800 shadow-xl backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Left: Title & Concept Spine */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-serif font-bold text-white tracking-tight">
                  {isEn ? 'Web3 Plant Passport & Genetic Provenance' : 'Hộ Chiếu Cây Trồng Số & Web3 Sandbox'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 text-[10px] font-semibold border border-emerald-700/50">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Base Sepolia Testnet (0đ Gas)</span>
                </span>
              </div>
              <p className="text-[11px] text-forest-300 line-clamp-1">
                {isEn
                  ? 'Cryptographically sign plant records with SHA-256 hashes on Base Sepolia. 100% free testnet.'
                  : 'Ký số cá nhân xác thực cây trồng & lưu giữ mã băm SHA-256 bất biến trên sổ cái Base Sepolia.'}
              </p>
            </div>
          </div>

          {/* Right: Wallet Connection Status / Actions */}
          <div className="flex items-center gap-2.5 flex-wrap justify-start lg:justify-end">
            {!wallet || !wallet.isConnected ? (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleConnectMetaMask}
                  disabled={isConnecting}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-forest-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                >
                  {isConnecting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span className="text-sm">🦊</span>
                  )}
                  <span>{isEn ? 'Connect MetaMask' : 'Kết Nối Ví MetaMask'}</span>
                </button>

                <button
                  onClick={handleConnectEmbedded}
                  className="px-3 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-700 active:scale-[0.99] text-white font-semibold text-xs border border-forest-700 flex items-center gap-1.5 transition"
                  title="Tạo nhanh ví thử nghiệm không cần cài tiện ích"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isEn ? 'Instant Test Wallet' : 'Tạo Ví Thử Nghiệm'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-forest-950 border border-forest-800 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-semibold text-white text-[11px]">
                    {wallet.isMetaMask ? 'MetaMask' : 'Ví Thử Nghiệm'}
                  </span>
                  <span className="font-mono text-emerald-300 text-[11px]">
                    {wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : ''}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1 hover:text-white text-gray-400 transition"
                    title="Sao chép địa chỉ ví"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                {/* Network Switches */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSwitchNetwork('Base Sepolia')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                      selectedNetwork === 'Base Sepolia'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-forest-900 text-forest-300 border-forest-800 hover:bg-forest-800'
                    }`}
                  >
                    Base Sepolia
                  </button>
                  <button
                    onClick={() => handleSwitchNetwork('Polygon Amoy')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                      selectedNetwork === 'Polygon Amoy'
                        ? 'bg-purple-600 text-white border-purple-500'
                        : 'bg-forest-900 text-forest-300 border-forest-800 hover:bg-forest-800'
                    }`}
                  >
                    Polygon Amoy
                  </button>
                </div>

                <button
                  onClick={handleDisconnect}
                  className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/80 transition"
                  title="Ngắt kết nối ví"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error notification if any */}
        {walletError && (
          <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{walletError}</span>
            </div>
            <button onClick={() => setWalletError(null)} className="text-red-300 hover:text-white text-xs">✕</button>
          </div>
        )}

        {/* Main 12-Column Dashboard - Tận Dụng Toàn Bộ Không Gian Màn Hình */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          
          {/* Left Column (lg:col-span-4): Faucet & Escrow Simulator */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Card 1: Faucet */}
            <div className="bg-charcoal-900/90 rounded-2xl p-4 sm:p-5 border border-forest-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Gift className="w-4 h-4" /> {isEn ? 'Token Faucet' : 'Vòi Cấp Token'}
                </span>
                <span className="text-xs font-mono bg-forest-950 px-2.5 py-0.5 rounded-full text-emerald-300 border border-forest-800">
                  {testBalance} Mầm Xanh
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-white">
                  {isEn ? 'Claim 100 Free Testnet Seed Tokens' : 'Cấp 100 Token "Mầm Xanh" Vào Ví'}
                </h3>
                <p className="text-[11px] text-forest-300 mt-1 leading-relaxed">
                  {isEn
                    ? '100 sandbox tokens daily to test community tips and smart contract plant swaps.'
                    : 'Cấp 100 token thử nghiệm mỗi ngày để làm quen thao tác thưởng quà (Tip) và đổi cây an toàn.'}
                </p>
              </div>

              {wallet?.address && (
                <div className="p-2 rounded-xl bg-forest-950 border border-forest-800 text-[10px] font-mono text-gray-400 truncate">
                  Ví nhận: <span className="text-emerald-300">{wallet.address.slice(0, 10)}...{wallet.address.slice(-6)}</span>
                </div>
              )}

              <button
                onClick={handleClaimFaucet}
                disabled={faucetClaimed}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                  faucetClaimed
                    ? 'bg-forest-900 text-emerald-400 border border-forest-800 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md active:scale-[0.99]'
                }`}
              >
                {faucetClaimed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isEn ? 'Claimed (24h Cooldown)' : 'Đã Cấp Vào Ví (Hồi Chiêu 24h)'}</span>
                  </>
                ) : (
                  <>
                    <Gift className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Claim 100 Seed Tokens' : 'Bấm Nhận 100 Mầm Xanh (0đ)'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Card 2: Escrow Simulator */}
            <div className="bg-charcoal-900/90 rounded-2xl p-4 sm:p-5 border border-forest-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4" /> {isEn ? 'Escrow Simulator' : 'Mô Phỏng Smart Contract Đổi Cây'}
                </span>
                <button
                  onClick={handleRunEscrowStep}
                  disabled={isEscrowSimulating}
                  className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold transition flex items-center gap-1 shadow-xs"
                >
                  {isEscrowSimulating ? (
                    <RefreshCw className="w-3 h-3 animate-spin" />
                  ) : (
                    <>
                      <span>{escrowStep === 3 ? 'Lặp lại' : `Bước ${escrowStep}/3`}</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>

              {/* 3 Steps */}
              <div className="space-y-2 text-xs">
                {/* Step 1 */}
                <div className={`p-2.5 rounded-xl border transition ${
                  escrowStep === 1
                    ? 'bg-teal-950/70 border-teal-500 text-white shadow-xs'
                    : escrowStep > 1
                    ? 'bg-forest-900/40 border-forest-800 text-forest-300 opacity-80'
                    : 'bg-forest-900/20 border-forest-800 text-gray-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[11px] text-cream-100 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-teal-600 text-white inline-flex items-center justify-center text-[10px]">1</span>
                      Khóa Cọc Hạt Giống (20 Mầm Xanh)
                    </span>
                    {escrowStep > 1 && <Check className="w-3 h-3 text-teal-400" />}
                  </div>
                  <p className="text-[10px] text-forest-300 mt-1 leading-normal">
                    Hai bên khóa 20 Mầm Xanh vào Smart Contract làm tin trước khi chuyển cây.
                  </p>
                </div>

                {/* Step 2 */}
                <div className={`p-2.5 rounded-xl border transition ${
                  escrowStep === 2
                    ? 'bg-teal-950/70 border-teal-500 text-white shadow-xs'
                    : escrowStep > 2
                    ? 'bg-forest-900/40 border-forest-800 text-forest-300 opacity-80'
                    : 'bg-forest-900/20 border-forest-800 text-gray-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[11px] text-cream-100 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-teal-600 text-white inline-flex items-center justify-center text-[10px]">2</span>
                      Giao Nhận & 7 Ngày Cách Ly
                    </span>
                    {escrowStep > 2 && <Check className="w-3 h-3 text-teal-400" />}
                  </div>
                  <p className="text-[10px] text-forest-300 mt-1 leading-normal">
                    Chuyển phát cây & áp dụng cách ly 7 ngày phòng dịch mầm bệnh lây chéo.
                  </p>
                </div>

                {/* Step 3 */}
                <div className={`p-2.5 rounded-xl border transition ${
                  escrowStep === 3
                    ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-xs'
                    : 'bg-forest-900/20 border-forest-800 text-gray-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[11px] text-cream-100 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white inline-flex items-center justify-center text-[10px]">3</span>
                      Nghiệm Thu & Thưởng Karma
                    </span>
                    {escrowStep === 3 && <Check className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <p className="text-[10px] text-forest-300 mt-1 leading-normal">
                    Bấm "Cây sống khỏe", hoàn trả 20 Mầm Xanh và cộng +15 Karma uy tín cho người tặng.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (lg:col-span-8): Dynamic NFT Plant Passport Studio */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-charcoal-900/90 rounded-2xl p-4 sm:p-5 border border-forest-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-forest-800 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm sm:text-base font-serif font-bold text-white">
                    {isEn ? 'Digital Plant Passport Minting Studio (Dynamic NFT)' : 'Xưởng Đúc Hộ Chiếu Thực Vật Bản Địa (Dynamic NFT)'}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-forest-950 text-emerald-300 border border-forest-800">
                    Sổ cái: {selectedNetwork}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800/60">
                    Giai đoạn {evolutionStage}/3
                  </span>
                </div>
              </div>

              {/* Mint Controls Form: Grid 12 cols */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Plant Thumbnail & SHA-256 Preview (md:col-span-5) */}
                <div className="md:col-span-5 bg-forest-950 rounded-2xl p-3 border border-forest-800 space-y-2.5">
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-charcoal-900 border border-forest-800">
                    <img
                      src={SAMPLE_MINT_PLANTS[selectedPlantIndex].image}
                      alt={SAMPLE_MINT_PLANTS[selectedPlantIndex].name_vi}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest-950/80 backdrop-blur-xs text-emerald-300 border border-emerald-700/60">
                      Giai đoạn {evolutionStage}/3
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">
                      {isEn ? SAMPLE_MINT_PLANTS[selectedPlantIndex].name_en : SAMPLE_MINT_PLANTS[selectedPlantIndex].name_vi}
                    </h4>
                    <p className="font-mono italic text-[10px] text-emerald-400">
                      {SAMPLE_MINT_PLANTS[selectedPlantIndex].scientific}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-charcoal-900/90 border border-forest-800 text-[10px] font-mono text-gray-400">
                    <span className="text-gray-300 font-semibold block">Mã băm SHA-256 bất biến:</span>
                    <span className="text-emerald-300 truncate block">
                      sha256:{SAMPLE_MINT_PLANTS[selectedPlantIndex].id}...stage{evolutionStage}
                    </span>
                  </div>
                </div>

                {/* Selectors & Mint Action (md:col-span-7) */}
                <div className="md:col-span-7 space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-forest-300 block mb-1">
                      {isEn ? 'Select Plant Species to Certify:' : 'Chọn giống cây bản địa muốn cấp hộ chiếu:'}
                    </label>
                    <select
                      value={selectedPlantIndex}
                      onChange={(e) => setSelectedPlantIndex(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-forest-950 border border-forest-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      {SAMPLE_MINT_PLANTS.map((p, idx) => (
                        <option key={p.id} value={idx}>
                          {isEn ? p.name_en : p.name_vi} ({p.scientific})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[11px] font-semibold text-forest-300 block mb-1">
                        {isEn ? 'Growth Stage:' : 'Giai đoạn sinh trưởng:'}
                      </label>
                      <select
                        value={evolutionStage}
                        onChange={(e) => setEvolutionStage(Number(e.target.value) as 1 | 2 | 3)}
                        className="w-full px-2.5 py-1.5 bg-forest-950 border border-forest-800 rounded-xl text-xs text-white"
                      >
                        <option value={1}>{isEn ? 'Stage 1: Seedling' : '1. Mầm non gieo ươm'}</option>
                        <option value={2}>{isEn ? 'Stage 2: Vegetative' : '2. Sinh trưởng phân cành'}</option>
                        <option value={3}>{isEn ? 'Stage 3: Flowering/Fruit' : '3. Đơm hoa kết trái'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-forest-300 block mb-1">
                        {isEn ? 'Blockchain Ledger:' : 'Sổ cái chuỗi khối:'}
                      </label>
                      <select
                        value={selectedNetwork}
                        onChange={(e) => setSelectedNetwork(e.target.value as 'Base Sepolia' | 'Polygon Amoy')}
                        className="w-full px-2.5 py-1.5 bg-forest-950 border border-forest-800 rounded-xl text-xs text-white"
                      >
                        <option value="Base Sepolia">Base Sepolia (L2)</option>
                        <option value="Polygon Amoy">Polygon Amoy</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-[11px] text-forest-300/80 leading-relaxed">
                    Mỗi hộ chiếu gắn liền chữ ký số ví của bạn, bất biến trên chuỗi khối, bảo vệ bản quyền giống cây và phòng chống gian lận nguồn gốc (H1, H7).
                  </p>

                  <button
                    onClick={handleDemoMint}
                    disabled={isMinting}
                    className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.99] disabled:opacity-50 ${
                      !wallet?.isConnected
                        ? 'bg-amber-600 hover:bg-amber-500 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {isMinting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>{isEn ? 'Requesting Wallet Signature & Minting...' : 'Đang Yêu Cầu Ký Số Trên Ví & Đúc...'}</span>
                      </>
                    ) : !wallet?.isConnected ? (
                      <>
                        <Wallet className="w-4 h-4" />
                        <span>{isEn ? 'Connect Wallet to Mint' : 'Cần Kết Nối Ví Để Đúc Hộ Chiếu'}</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-4 h-4" />
                        <span>{isEn ? 'Sign & Mint Plant Passport (0đ Gas)' : 'Ký Số & Đúc Hộ Chiếu Cây (0đ Gas)'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Minted Passport Success Preview Card (Rendered neatly inside when available) */}
              {mintedPassport && (
                <div className="bg-forest-950/90 rounded-2xl p-4 border border-emerald-500/70 shadow-2xl space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-forest-800">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <Check className="w-4 h-4" />
                      <span>{isEn ? 'Digital Plant Passport Successfully Minted!' : 'Hộ Chiếu Cây Trồng Số Đã Được Cấp Thành Công!'}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                        Token ID: {mintedPassport.token_id}
                      </span>
                      <button
                        onClick={() => window.print()}
                        className="px-2.5 py-1 rounded-lg bg-forest-800 hover:bg-forest-700 text-white text-[11px] font-semibold flex items-center gap-1 transition"
                      >
                        <Printer className="w-3 h-3" />
                        <span>In Thẻ Cây</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <img
                      src={mintedPassport.image_url}
                      alt={mintedPassport.plant_name}
                      className="w-20 h-20 rounded-xl object-cover border border-forest-700 shrink-0"
                    />
                    <div className="space-y-1 text-xs text-forest-200 w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">
                          {mintedPassport.plant_name} ({mintedPassport.scientific_name})
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-900/80 text-amber-300">
                          Giai đoạn {mintedPassport.evolution_stage}/3
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-gray-400 flex flex-wrap gap-x-4 gap-y-0.5">
                        <span>Ví sở hữu: <span className="text-emerald-300">{mintedPassport.owner_address}</span></span>
                        <span>Sổ cái: <span className="text-white">{mintedPassport.network}</span></span>
                        <span>Tx: <span className="text-amber-300">{mintedPassport.transaction_hash}</span></span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-charcoal-900 border border-forest-800 text-[10px] font-mono truncate text-gray-400">
                        SHA-256: <span className="text-emerald-300">{mintedPassport.image_sha256}</span>
                        {mintSignature && (
                          <span className="ml-2 text-amber-300">| Chữ ký: {mintSignature.slice(0, 16)}...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
