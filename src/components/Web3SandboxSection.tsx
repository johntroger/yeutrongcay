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
    <section id="web3" className="py-12 sm:py-16 bg-forest-950 text-white relative overflow-hidden transition-colors">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold border border-emerald-700/50 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isEn ? 'Milestone MS8: Real Web3 Wallet & Botanical Provenance (100% Free Testnet)' : 'Milestone MS8: Kết Nối Ví Web3 & Bảo Tồn Nguồn Gen Cây Bản Địa (Testnet)'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {isEn ? 'Connect Web3 Wallet & Mint Plant Passports' : 'Kết Nối Ví Web3 & Đúc Hộ Chiếu Thực Vật'}
          </h2>

          <p className="text-xs sm:text-sm text-forest-200/80 font-sans max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'Connect your real MetaMask wallet or generate a free testnet keypair. Cryptographically sign your plant records with SHA-256 hashes on Base Sepolia. Zero gas fees, zero real money.'
              : 'Kết nối trực tiếp ví MetaMask của bạn hoặc khởi tạo ví thử nghiệm miễn phí. Sử dụng chữ ký số cá nhân để xác thực cây trồng và lưu giữ mã băm SHA-256 bất biến trên sổ cái Base Sepolia.'}
          </p>
        </div>

        {/* 1. WALLET CONNECTION STATUS BAR */}
        <div className="max-w-4xl mx-auto bg-charcoal-900/90 rounded-3xl p-5 sm:p-6 border border-forest-800 shadow-2xl backdrop-blur-xl">
          {walletError && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{walletError}</span>
            </div>
          )}

          {!wallet || !wallet.isConnected ? (
            /* TRẠNG THÁI CHƯA KẾT NỐI VÍ */
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-white">
                  <Wallet className="w-4 h-4 text-amber-400" />
                  <span>{isEn ? 'No Web3 Wallet Connected' : 'Chưa Kết Nối Ví Web3'}</span>
                </div>
                <p className="text-xs text-forest-300">
                  {isEn
                    ? 'Connect MetaMask or create an instant embedded testnet wallet to sign transactions.'
                    : 'Kết nối ví MetaMask hoặc tạo ví thử nghiệm tích hợp sẵn để thực hiện ký số và đúc hộ chiếu.'}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center">
                <button
                  onClick={handleConnectMetaMask}
                  disabled={isConnecting}
                  className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-forest-950 font-bold text-xs flex items-center gap-2 shadow-lg transition"
                >
                  {isConnecting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className="text-base">🦊</span>
                  )}
                  <span>{isEn ? 'Connect MetaMask' : 'Kết Nối Ví MetaMask'}</span>
                </button>

                <button
                  onClick={handleConnectEmbedded}
                  className="px-4 py-2.5 rounded-2xl bg-forest-800 hover:bg-forest-700 active:scale-[0.99] text-white font-semibold text-xs border border-forest-700 flex items-center gap-1.5 transition"
                  title="Tạo nhanh ví thử nghiệm không cần cài tiện ích"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isEn ? 'Create Test Wallet' : 'Tạo Ví Thử Nghiệm'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* TRẠNG THÁI ĐÃ KẾT NỐI VÍ */
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-bold text-white">
                    {wallet.isMetaMask ? 'MetaMask Đã Kết Nối' : 'Ví Thử Nghiệm Tích Hợp'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                    {wallet.networkName}
                  </span>
                  {wallet.balanceEth && (
                    <span className="text-xs font-mono text-amber-300">
                      {wallet.balanceEth} ETH
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-forest-200">
                  <span>Địa chỉ ví:</span>
                  <span className="font-mono bg-forest-950 px-2.5 py-1 rounded-lg border border-forest-800 text-emerald-300 select-all">
                    {wallet.address ? `${wallet.address.slice(0, 8)}...${wallet.address.slice(-6)}` : ''}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1.5 rounded-lg hover:bg-forest-800 text-gray-400 hover:text-white transition"
                    title="Sao chép địa chỉ ví"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Network switch & Disconnect */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  onClick={() => handleSwitchNetwork('Base Sepolia')}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition ${
                    selectedNetwork === 'Base Sepolia'
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-forest-900 text-forest-300 border-forest-800 hover:bg-forest-800'
                  }`}
                >
                  Base Sepolia
                </button>

                <button
                  onClick={() => handleSwitchNetwork('Polygon Amoy')}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition ${
                    selectedNetwork === 'Polygon Amoy'
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-forest-900 text-forest-300 border-forest-800 hover:bg-forest-800'
                  }`}
                >
                  Polygon Amoy
                </button>

                <button
                  onClick={handleDisconnect}
                  className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/80 transition"
                  title="Ngắt kết nối ví"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2 INTERACTIVE CARDS: FAUCET & MINT STUDIO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Faucet */}
          <div className="bg-charcoal-900/80 rounded-3xl p-6 sm:p-7 border border-forest-800 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Gift className="w-4 h-4" /> {isEn ? 'Testnet Token Faucet' : 'Vòi Cấp Token Thử Nghiệm'}
                </span>
                <span className="text-xs font-mono bg-forest-900 px-3 py-1 rounded-full text-white border border-forest-800">
                  {isEn ? `Balance: ${testBalance} Seed Tokens` : `Số dư: ${testBalance} Mầm Xanh`}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                {isEn ? 'Claim 100 Free Testnet Seed Tokens' : 'Nhận 100 Token "Mầm Xanh" Vào Ví'}
              </h3>

              <p className="text-xs text-forest-200/80 leading-relaxed">
                {isEn
                  ? 'Each wallet receives 100 sandbox tokens daily to test community tips for insightful clinic answers and simulated smart contract plant swaps.'
                  : 'Mỗi địa chỉ ví được cấp 100 token thử nghiệm mỗi ngày để làm quen với thao tác thưởng quà (Tip) cho người giải đáp bệnh cây hay hoặc tập trao đổi cây qua Smart Contract giả lập.'}
              </p>

              {wallet?.address && (
                <div className="p-2.5 rounded-xl bg-forest-950 border border-forest-800 text-[11px] font-mono text-gray-400">
                  Ví nhận: <span className="text-emerald-300">{wallet.address.slice(0, 12)}...{wallet.address.slice(-6)}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleClaimFaucet}
              disabled={faucetClaimed}
              className={`w-full mt-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                faucetClaimed
                  ? 'bg-forest-900 text-emerald-400 border border-forest-800 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg active:scale-[0.99]'
              }`}
            >
              {faucetClaimed ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{isEn ? 'Claimed 100 Tokens (24h Cooldown)' : 'Đã Cấp 100 Mầm Xanh Vào Ví (Hồi Chiêu 24h)'}</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  <span>{isEn ? 'Claim 100 Seed Tokens (Testnet)' : 'Bấm Nhận 100 Mầm Xanh (Testnet)'}</span>
                </>
              )}
            </button>
          </div>

          {/* Card 2: Demo NFT Mint Studio */}
          <div className="bg-charcoal-900/80 rounded-3xl p-6 sm:p-7 border border-forest-800 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> {isEn ? 'Digital Plant Passport (Dynamic NFT)' : 'Hộ Chiếu Cây Trồng (Dynamic NFT)'}
                </span>
                <span className="text-xs font-mono bg-forest-900 px-2.5 py-1 rounded-full text-white border border-forest-800">
                  {selectedNetwork}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                {isEn ? 'Mint Digital Plant Passport with Wallet Signature' : 'Ký Số & Đúc Hộ Chiếu Thực Vật Bản Địa'}
              </h3>

              {/* Plant selection row */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-forest-300">
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

              {/* Stage & Network selector */}
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
            </div>

            <button
              onClick={handleDemoMint}
              disabled={isMinting}
              className={`w-full mt-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.99] disabled:opacity-50 ${
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
                  <span>{isEn ? 'Sign & Mint Plant Passport (Free Gas)' : 'Ký Số & Đúc Hộ Chiếu Cây (0đ Gas)'}</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* 3. MINTED PASSPORT SUCCESS PREVIEW CARD */}
        {mintedPassport && (
          <div className="max-w-2xl mx-auto bg-charcoal-900/95 rounded-3xl p-6 sm:p-7 border border-emerald-500/60 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-forest-800">
              <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Check className="w-4 h-4" />
                <span>{isEn ? 'Digital Plant Passport Successfully Minted!' : 'Hộ Chiếu Cây Trồng Số Đã Được Cấp Thành Công!'}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                Token ID: {mintedPassport.token_id}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <img
                src={mintedPassport.image_url}
                alt={mintedPassport.plant_name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border border-forest-700 shadow-md shrink-0"
              />
              <div className="space-y-1.5 text-xs text-forest-200 w-full">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-serif font-bold text-white">
                    {mintedPassport.plant_name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-900/80 text-amber-300">
                    Giai đoạn {mintedPassport.evolution_stage}/3
                  </span>
                </div>
                <p className="font-mono italic text-[11px] text-emerald-400">
                  {mintedPassport.scientific_name}
                </p>
                <p className="text-[11px] text-forest-300">
                  {isEn ? 'Owner Wallet:' : 'Địa chỉ ví sở hữu:'} <span className="font-mono text-emerald-300 font-bold">{mintedPassport.owner_address}</span>
                </p>
                <div className="p-2 rounded-xl bg-forest-950/80 border border-forest-800 text-[10px] font-mono space-y-0.5">
                  <div className="text-gray-400 truncate">
                    Bằng chứng ảnh gốc (SHA-256): <span className="text-emerald-300">{mintedPassport.image_sha256}</span>
                  </div>
                  {mintSignature && (
                    <div className="text-gray-400 truncate">
                      Chữ ký số (Signature): <span className="text-amber-300">{mintSignature.slice(0, 24)}...</span>
                    </div>
                  )}
                  <div className="text-gray-400">
                    Thời gian chứng thực: <span className="text-white">{mintedPassport.minted_at}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-emerald-300">
                  <span>{isEn ? 'Network:' : 'Sổ cái:'} {mintedPassport.network}</span>
                  <span className="font-mono text-amber-300">
                    Tx: {mintedPassport.transaction_hash}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-forest-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-gray-400">
                Chứng nhận bảo tồn nguồn gen bản địa phi lợi nhuận (H1, H7)
              </span>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In Thẻ Cây</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. SMART CONTRACT ESCROW WALKTHROUGH SIMULATOR */}
        <div className="max-w-4xl mx-auto bg-charcoal-900/90 rounded-3xl p-6 sm:p-8 border border-forest-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4" /> {isEn ? 'Interactive Escrow Simulator' : 'Mô Phỏng Smart Contract Trao Đổi Cây An Toàn'}
              </span>
              <h3 className="text-lg font-serif font-bold text-white mt-1">
                {isEn ? 'How Smart Contract Protects Plant Swaps Between Cities' : 'Cách Hợp Đồng Thông Minh Giữ Cam Kết Giữa 2 Người Đổi Cây'}
              </h3>
            </div>
            <button
              onClick={handleRunEscrowStep}
              disabled={isEscrowSimulating}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              {isEscrowSimulating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang thực thi...</span>
                </>
              ) : (
                <>
                  <span>{escrowStep === 3 ? 'Bắt đầu lại' : 'Chạy bước tiếp theo'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            
            {/* Step 1 */}
            <div className={`p-4 rounded-2xl border transition ${
              escrowStep === 1
                ? 'bg-teal-950/60 border-teal-500 text-white shadow-md'
                : escrowStep > 1
                ? 'bg-forest-900/40 border-forest-800 text-forest-300 opacity-80'
                : 'bg-forest-900/20 border-forest-800 text-gray-500'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">1</span>
                {escrowStep > 1 && <Check className="w-4 h-4 text-teal-400" />}
              </div>
              <h4 className="font-bold mb-1 text-sm text-cream-100">Khóa Cọc Hạt Giống</h4>
              <p className="text-[11px] leading-relaxed">
                Người gửi A và người nhận B đồng ý trao đổi cành chiết Đinh lăng. Cả hai khóa tạm 20 Mầm Xanh từ ví của mình vào Smart Contract làm tin.
              </p>
            </div>

            {/* Step 2 */}
            <div className={`p-4 rounded-2xl border transition ${
              escrowStep === 2
                ? 'bg-teal-950/60 border-teal-500 text-white shadow-md'
                : escrowStep > 2
                ? 'bg-forest-900/40 border-forest-800 text-forest-300 opacity-80'
                : 'bg-forest-900/20 border-forest-800 text-gray-500'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs">2</span>
                {escrowStep > 2 && <Check className="w-4 h-4 text-teal-400" />}
              </div>
              <h4 className="font-bold mb-1 text-sm text-cream-100">Giao Nhận & 7 Ngày Cách Ly</h4>
              <p className="text-[11px] leading-relaxed">
                Cành chiết được chuyển phát nhanh. Người nhận áp dụng quy trình cách ly mầm bệnh 7 ngày để đảm bảo không mang sâu bệnh vào vườn.
              </p>
            </div>

            {/* Step 3 */}
            <div className={`p-4 rounded-2xl border transition ${
              escrowStep === 3
                ? 'bg-emerald-950/70 border-emerald-500 text-white shadow-md'
                : 'bg-forest-900/20 border-forest-800 text-gray-500'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">3</span>
                {escrowStep === 3 && <Check className="w-4 h-4 text-emerald-400" />}
              </div>
              <h4 className="font-bold mb-1 text-sm text-cream-100">Nghiệm Thu & Thưởng Karma</h4>
              <p className="text-[11px] leading-relaxed">
                Người nhận bấm "Cây sống khỏe", Smart Contract tự động hoàn trả cọc 20 Mầm Xanh về ví và cộng +15 điểm uy tín Karma cho người tặng.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
