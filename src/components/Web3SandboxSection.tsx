import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  KeyRound,
  ChevronDown,
  ChevronRight,
  X,
  ArrowLeftRight,
  Upload,
  Trash2,
  Camera
} from 'lucide-react';
import { Web3TestnetPassport } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { web3WalletService, WalletState } from '../services/web3WalletService.ts';
import { awardKarmaPoints, getKarmaState, KarmaState } from '../services/karmaService.ts';
import { plantPassportRegistryService } from '../services/plantPassportRegistryService.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { getPlantBySlug } from '../services/apiService.ts';

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
    name: 'Google Cloud Web3 Faucet',
    network: 'Ethereum Sepolia',
    amount: '0.05 ETH / ngày',
    url: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia',
    descriptionVi: 'Vòi cấp chính thức của Google Cloud, đăng nhập tài khoản Google để nhận thẳng 0.05 SepoliaETH.',
    descriptionEn: 'Official Google Cloud Web3 faucet granting 0.05 SepoliaETH daily with Google account.'
  },
  {
    name: 'Sepolia PoW Faucet (pk910)',
    network: 'Ethereum Sepolia',
    amount: 'Không giới hạn (PoW)',
    url: 'https://sepolia-faucet.pk910.de',
    descriptionVi: 'Vòi đào miễn phí dùng CPU trình duyệt, không cần đăng nhập hay xác minh danh tính.',
    descriptionEn: 'Proof-of-work faucet. Mine free SepoliaETH with your browser without logins.'
  },
  {
    name: 'Coinbase Developer Faucet',
    network: 'Base Sepolia',
    amount: '0.1 ETH / ngày',
    url: 'https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet',
    descriptionVi: 'Vòi chính thức của sàn Coinbase cấp ETH testnet cho mạng Base Sepolia.',
    descriptionEn: 'Official Coinbase developer faucet granting daily Base Sepolia testnet ETH.'
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
    name: 'QuickNode Faucet',
    network: 'Sepolia & Base',
    amount: '0.05 ETH',
    url: 'https://faucet.quicknode.com',
    descriptionVi: 'Vòi cấp tốc độ cao từ nhà cung cấp hạ tầng QuickNode.',
    descriptionEn: 'Fast RPC developer faucet powered by QuickNode infrastructure.'
  }
];

// 4 Phân khu học tập Web3 Testnet
const LEARNING_TABS = [
  {
    id: 'learn' as const,
    num: '1',
    nameVi: '1. Vỡ Lòng Web3 Trong 3 Phút',
    nameEn: '1. Web3 101 for Gardeners',
    shortVi: 'Vỡ Lòng Web3',
    shortEn: 'Web3 101',
    descVi: 'Khái niệm ví cá nhân, mã băm SHA-256 và chữ ký số an toàn',
    descEn: 'Core concepts: wallets, SHA-256 hashing & cryptographic signatures',
    icon: BookOpen,
    badgeVi: 'Học 3 Phút',
    badgeEn: '3-min Read',
  },
  {
    id: 'faucet' as const,
    num: '2',
    nameVi: '2. Hướng Dẫn Lấy ETH Testnet (Faucet 0đ)',
    nameEn: '2. Claim Free Testnet ETH (Faucet)',
    shortVi: 'Lấy ETH Testnet',
    shortEn: 'Testnet Faucet',
    descVi: 'Nhận 0.1 ETH miễn phí mỗi ngày từ Coinbase, Google Cloud',
    descEn: 'Get free daily testnet ETH from Coinbase & Google Cloud',
    icon: Droplets,
    badgeVi: '+10 Karma',
    badgeEn: '+10 Karma',
  },
  {
    id: 'mint' as const,
    num: '3',
    nameVi: '3. Ký Số & Đúc Hộ Chiếu Cây',
    nameEn: '3. Mint Plant Passport (Real Signature)',
    shortVi: 'Đúc Hộ Chiếu Cây',
    shortEn: 'Mint Passport',
    descVi: 'Ký số cá nhân với ví thật để tạo căn cước công dân số cho cây',
    descEn: 'Sign with your real wallet to issue a tamper-proof plant passport',
    icon: Award,
    badgeVi: '+25 Karma',
    badgeEn: '+25 Karma',
  },
  {
    id: 'escrow' as const,
    num: '4',
    nameVi: '4. Smart Contract Đổi Cây An Toàn',
    nameEn: '4. Escrow Plant Swap Simulator',
    shortVi: 'Escrow Đổi Cây',
    shortEn: 'Escrow Swap',
    descVi: 'Mô phỏng hợp đồng thông minh khóa cọc & cách ly 7 ngày trừ rệp sáp',
    descEn: 'Simulated smart contract escrow with 7-day quarantine inspection',
    icon: FileCheck2,
    badgeVi: '+15 Karma',
    badgeEn: '+15 Karma',
  }
];

export const Web3SandboxSection: React.FC = () => {
  const { isEn } = useLanguage();
  const [searchParams] = useSearchParams();
  const mintSlugParam = searchParams.get('mint');

  // Trạng thái ví thật
  const [wallet, setWallet] = useState<WalletState | null>(() => web3WalletService.getSavedWallet());
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'mint' | 'faucet' | 'escrow'>(() =>
    mintSlugParam ? 'mint' : 'learn'
  );
  const [isMobileTabDrawerOpen, setIsMobileTabDrawerOpen] = useState(false);

  // Trạng thái đúc hộ chiếu
  const [mintMode, setMintMode] = useState<'onchain' | 'signature'>('onchain');
  const [contractAddress, setContractAddress] = useState<string>(() => web3WalletService.getContractAddressForChain(null));
  const [showContractConfig, setShowContractConfig] = useState(false);
  const [addedToMetaMask, setAddedToMetaMask] = useState(false);
  const [plantSource, setPlantSource] = useState<'sample' | 'custom'>('sample');
  const [selectedPlantIndex, setSelectedPlantIndex] = useState(0);
  const [customPlantName, setCustomPlantName] = useState('');
  const [customScientific, setCustomScientific] = useState('');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customImageSha, setCustomImageSha] = useState<string | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [targetLedger, setTargetLedger] = useState<'Ethereum Sepolia' | 'Base Sepolia' | 'Polygon Amoy'>('Ethereum Sepolia');
  const [evolutionStage, setEvolutionStage] = useState<1 | 2 | 3>(1);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSignature, setMintSignature] = useState<string | null>(null);
  const [mintedPassport, setMintedPassport] = useState<Web3TestnetPassport | null>(null);

  // Tự động nạp thông tin loài cây khi bấm "Tạo NFT" từ bài viết (?mint=<slug>)
  useEffect(() => {
    if (!mintSlugParam) return;
    setActiveTab('mint');
    const applyArticlePlant = (p: { slug: string; common_name: string; scientific_name: string; image_url: string; image_sha256?: string }) => {
      setSelectedArticleSlug(p.slug);
      setPlantSource('custom');
      setCustomPlantName(p.common_name);
      setCustomScientific(p.scientific_name);
      setCustomImage(p.image_url);
      setCustomImageSha(p.image_sha256 || null);
    };

    const seedMatch = SEED_PLANTS.find((p) => p.slug === mintSlugParam || p.id === mintSlugParam);
    if (seedMatch) {
      applyArticlePlant(seedMatch);
    } else {
      getPlantBySlug(mintSlugParam)
        .then((livePlant) => {
          if (livePlant) applyArticlePlant(livePlant);
        })
        .catch(() => {});
    }
  }, [mintSlugParam]);

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

  // Tự động đồng bộ số dư và mạng thực tế từ ví khi tải trang
  useEffect(() => {
    web3WalletService.syncCurrentWalletState().then((liveState) => {
      if (liveState) {
        setWallet(liveState);
      }
    });
  }, []);

  // Lắng nghe sự kiện chuyển tài khoản hoặc đổi mạng trên ví thật
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum && window.ethereum.on) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accs = accounts as string[];
        if (accs.length === 0) {
          handleDisconnect();
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

  // Chuyển mạng sang Testnet (Ưu tiên Sepolia hoặc Base Sepolia)
  const handleSwitchNetwork = async () => {
    setWalletError(null);
    try {
      // Ưu tiên chuyển sang Ethereum Sepolia Testnet
      await web3WalletService.switchToSepolia();
      const fresh = await web3WalletService.syncCurrentWalletState();
      if (fresh) {
        setWallet(fresh);
      }
    } catch (err: unknown) {
      try {
        // Fallback chuyển sang Base Sepolia nếu Sepolia gặp lỗi
        await web3WalletService.switchToBaseSepolia();
        const fresh = await web3WalletService.syncCurrentWalletState();
        if (fresh) {
          setWallet(fresh);
        }
      } catch (err2: unknown) {
        const e = (err2 || err) as { message?: string };
        setWalletError(e.message || (isEn ? 'Failed to switch network' : 'Lỗi khi chuyển mạng sang Testnet'));
      }
    }
  };

  // Đổi qua lại giữa Ethereum Sepolia và Base Sepolia
  const handleToggleNetwork = async () => {
    setWalletError(null);
    try {
      const currentChain = wallet?.chainId?.toLowerCase();
      if (currentChain === '0x14a34' || currentChain === '84532') {
        await web3WalletService.switchToSepolia();
      } else {
        await web3WalletService.switchToBaseSepolia();
      }
      const fresh = await web3WalletService.syncCurrentWalletState();
      if (fresh) {
        setWallet(fresh);
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || (isEn ? 'Failed to switch network' : 'Lỗi khi chuyển mạng'));
    }
  };

  // Làm mới số dư ETH Testnet thật từ RPC
  const handleRefreshBalance = async () => {
    if (!wallet?.address) return;
    try {
      const fresh = await web3WalletService.syncCurrentWalletState();
      if (fresh) {
        setWallet(fresh);
      } else {
        const bal = await web3WalletService.getBalance(wallet.address);
        setWallet({ ...wallet, balanceEth: bal });
      }
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

  // Xử lý tải ảnh cây thật của người dùng
  const handleCustomImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setWalletError(isEn ? 'Image size must be under 5MB' : 'Dung lượng ảnh tối đa 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setCustomImage(dataUrl);
      setPlantSource('custom');
      if (!customPlantName) {
        const rawName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setCustomPlantName(rawName.charAt(0).toUpperCase() + rawName.slice(1));
      }
      const hash = await generateSha256(dataUrl.slice(0, 8000) + file.size + file.name);
      setCustomImageSha(hash);
    };
    reader.readAsDataURL(file);
  };

  // Xử lý chọn sổ cái tùy chọn
  const handleLedgerSelect = async (newLedger: 'Ethereum Sepolia' | 'Base Sepolia' | 'Polygon Amoy') => {
    setTargetLedger(newLedger);
    if (!wallet?.isConnected) return;
    try {
      if (newLedger === 'Ethereum Sepolia') {
        await web3WalletService.switchToSepolia();
      } else if (newLedger === 'Base Sepolia') {
        await web3WalletService.switchToBaseSepolia();
      }
      const fresh = await web3WalletService.syncCurrentWalletState();
      if (fresh) setWallet(fresh);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || (isEn ? 'Failed to switch ledger network' : 'Lỗi khi chuyển đổi sổ cái trên ví'));
    }
  };

  // Ký số xác nhận hoặc Đúc Hộ Chiếu On-chain thật
  const handleMintWithRealWallet = async () => {
    if (!wallet || !wallet.isConnected) {
      setWalletError(isEn ? 'Please connect your real Web3 wallet first!' : 'Vui lòng kết nối ví Web3 thật trước khi ký số!');
      return;
    }

    setWalletError(null);
    setIsMinting(true);
    setAddedToMetaMask(false);
    const isCustom = plantSource === 'custom' && !!customImage;
    const chosenSample = SAMPLE_MINT_PLANTS[selectedPlantIndex];
    const plantNameVi = isCustom ? (customPlantName.trim() || 'Cây Trồng Của Tôi') : chosenSample.name_vi;
    const plantNameEn = isCustom ? (customPlantName.trim() || 'My Botanical Plant') : chosenSample.name_en;
    const scientificName = isCustom ? (customScientific.trim() || 'Plantae Indigena') : chosenSample.scientific;
    const plantImg = isCustom ? customImage! : chosenSample.image;
    const timestampStr = new Date().toISOString();
    const sha = (isCustom && customImageSha) ? customImageSha : await generateSha256(scientificName + timestampStr + evolutionStage + wallet.address);
    const randomToken = Math.floor(1000 + Math.random() * 9000);
    const activeNetwork = targetLedger || wallet.networkName || 'Ethereum Sepolia';

    // KIỂM TRA ĐỘC BẢN TUYỆT ĐỐI (Exclusivity Rule - Chặn đúc trùng lặp)
    const exclusivity = plantPassportRegistryService.checkPlantExclusivity({
      plantName: plantNameVi,
      scientificName: scientificName,
      sha256: sha,
      walletAddress: wallet.address
    });

    if (!exclusivity.isAllowed) {
      setWalletError(exclusivity.reason || (isEn ? 'This plant specimen already has a unique Master NFT Passport in yeutrongcay.com!' : 'Giống cây này đã được cấp Hộ Chiếu Độc Bản trước đó trong thế giới Yêu Trồng Cây!'));
      setIsMinting(false);
      return;
    }

    // 1. CHẾ ĐỘ 1: ĐÚC NFT ON-CHAIN THẬT (Gửi transaction gọi Smart Contract qua MetaMask)
    if (mintMode === 'onchain') {
      try {
        // Tự động kiểm tra và chuyển MetaMask sang đúng mạng với Sổ cái đã chọn
        if (targetLedger === 'Ethereum Sepolia') {
          const currentChain = wallet.chainId?.toLowerCase();
          if (currentChain !== '0xaa36a7' && currentChain !== '11155111') {
            await web3WalletService.switchToSepolia();
            const fresh = await web3WalletService.syncCurrentWalletState();
            if (fresh) setWallet(fresh);
          }
        } else if (targetLedger === 'Base Sepolia') {
          const currentChain = wallet.chainId?.toLowerCase();
          if (currentChain !== '0x14a34' && currentChain !== '84532') {
            await web3WalletService.switchToBaseSepolia();
            const fresh = await web3WalletService.syncCurrentWalletState();
            if (fresh) setWallet(fresh);
          }
        }

        const targetContract = (contractAddress.trim() || web3WalletService.getContractAddressForChain(wallet.chainId)) as `0x${string}`;

        // Chuẩn bị Metadata JSON chuẩn ERC-721
        const metadataJson = JSON.stringify({
          name: `${plantNameVi} #${randomToken}`,
          description: `Hộ Chiếu Cây Trồng Số On-chain - Yêu Trồng Cây (yeutrongcay.com). Mã SHA-256: ${sha}`,
          image: plantImg,
          attributes: [
            { trait_type: 'Loài Cây', value: plantNameVi },
            { trait_type: 'Tên Khoa Học', value: scientificName },
            { trait_type: 'Giai Đoạn', value: `${evolutionStage}/3` },
            { trait_type: 'Bằng Chứng SHA-256', value: sha },
            { trait_type: 'Sổ Cái', value: activeNetwork }
          ]
        });
        const tokenURI = `data:application/json;utf8,${encodeURIComponent(metadataJson)}`;

        // Gửi transaction on-chain thật lên MetaMask
        const realTxHash = await web3WalletService.mintPassportOnChain({
          contractAddress: targetContract,
          userAddress: wallet.address as `0x${string}`,
          plantName: plantNameVi,
          scientificName: scientificName,
          stage: evolutionStage,
          sha256Proof: sha,
          uri: tokenURI
        });

        setMintedPassport({
          token_id: `#${randomToken}`,
          plant_name: isEn ? plantNameEn : plantNameVi,
          scientific_name: scientificName,
          owner_address: wallet.address,
          minted_at: new Date().toLocaleString('vi-VN'),
          image_url: plantImg,
          image_sha256: sha,
          network: activeNetwork,
          evolution_stage: evolutionStage,
          transaction_hash: realTxHash,
          is_testnet: true,
          is_onchain: true,
          contract_address: targetContract
        });

        // Ghi danh vào Sổ Đăng Ký Hộ Chiếu Độc Bản Hệ Thống
        plantPassportRegistryService.registerPassport({
          token_id: randomToken.toString(),
          plant_name: plantNameVi,
          scientific_name: scientificName,
          image_url: plantImg,
          image_sha256: sha,
          owner_address: wallet.address,
          network: activeNetwork,
          evolution_stage: evolutionStage,
          transaction_hash: realTxHash,
          contract_address: targetContract,
          minted_at: new Date().toLocaleString('vi-VN'),
          is_onchain: true
        });

        awardKarmaPoints(
          50,
          `Đúc thành công NFT Hộ Chiếu Cây On-chain trên ${activeNetwork}`,
          `Minted Real On-chain NFT Plant Passport on ${activeNetwork}`,
          { isTestnet: true, isEn, txHash: realTxHash }
        );
        setRewardNotice({
          points: 50,
          title: isEn ? 'Real On-chain NFT Minted! (+50 Karma)' : 'Đúc Thành Công NFT On-chain Thật! (+50 Karma)',
          desc: isEn
            ? `Your plant passport NFT is live on blockchain! Tx: ${realTxHash.slice(0, 10)}...`
            : `Hộ Chiếu Cây Trồng Số của bạn đã ghi nhận on-chain thành công! Tx: ${realTxHash.slice(0, 10)}...`
        });
      } catch (err: unknown) {
        const e = err as { message?: string };
        setWalletError(e.message || (isEn ? 'On-chain NFT transaction rejected or failed' : 'Giao dịch đúc NFT trên blockchain bị từ chối hoặc thất bại'));
      } finally {
        setIsMinting(false);
      }
      return;
    }

    // 2. CHẾ ĐỘ 2: KÝ SỐ MẬT MÃ HỌC 0Đ GAS (Cryptographic Signature Proof)
    const simulatedTx = '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...' + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    try {
      // Yêu cầu ví thật ký xác nhận thông điệp mật mã học (personal_sign)
      const signMsg = `Yêu Trồng Cây - Đúc Hộ Chiếu Thực Vật Số\nLoài Cây: ${plantNameVi} (${scientificName})\nGiai Đoạn: ${evolutionStage}/3\nBằng Chứng SHA-256: ${sha}\nVí Sở Hữu Thật: ${wallet.address}\nSổ Cái Blockchain: ${activeNetwork} (0đ Gas)\nThời Gian Ký: ${new Date().toLocaleString('vi-VN')}`;
      
      const sig = await web3WalletService.signBotanicalRecord(wallet.address, signMsg);
      setMintSignature(sig);

      setMintedPassport({
        token_id: `#${randomToken}`,
        plant_name: isEn ? plantNameEn : plantNameVi,
        scientific_name: scientificName,
        owner_address: wallet.address,
        minted_at: new Date().toLocaleString('vi-VN'),
        image_url: plantImg,
        image_sha256: sha,
        network: activeNetwork,
        evolution_stage: evolutionStage,
        transaction_hash: simulatedTx,
        is_testnet: true,
        is_onchain: false
      });

      // Ghi danh vào Sổ Đăng Ký Hộ Chiếu Độc Bản Hệ Thống
      plantPassportRegistryService.registerPassport({
        token_id: randomToken.toString(),
        plant_name: plantNameVi,
        scientific_name: scientificName,
        image_url: plantImg,
        image_sha256: sha,
        owner_address: wallet.address,
        network: activeNetwork,
        evolution_stage: evolutionStage,
        transaction_hash: simulatedTx,
        contract_address: '0x0000000000000000000000000000000000000000',
        minted_at: new Date().toLocaleString('vi-VN'),
        is_onchain: false
      });

      // Tự động thưởng Điểm Karma Uy Tín khi ký số & đúc Hộ Chiếu thành công trên Testnet
      awardKarmaPoints(
        25,
        `Đúc thành công Hộ Chiếu Cây Số ${plantNameVi} (${activeNetwork} 0đ)`,
        `Minted Digital Plant Passport for ${plantNameEn} (${activeNetwork} 0đ)`,
        { isTestnet: true, isEn, txHash: simulatedTx }
      );
      setRewardNotice({
        points: 25,
        title: isEn ? 'Passport Minting Reward (+25 Karma)' : 'Thưởng Đúc Hộ Chiếu Cây Testnet (+25 Karma)',
        desc: isEn
          ? `You successfully signed with your real wallet to create a digital genetic plant passport on ${activeNetwork}!`
          : `Bạn đã dùng ví thật ký số mật mã học thành công cấp Hộ Chiếu Cây trên sổ cái ${activeNetwork}!`
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
    <section id="web3" className="py-4 sm:py-6 bg-cream-100 dark:bg-forest-950 text-charcoal-900 dark:text-white relative overflow-hidden flex-1 flex flex-col justify-start transition-colors duration-200">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-4">
        
        {/* 1. Header Bar: Tiêu đề & Trạng thái ví thật */}
        <div className="bg-white dark:bg-charcoal-900/95 rounded-2xl p-4 sm:p-5 border border-forest-100 dark:border-forest-800 shadow-xl backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-serif font-bold text-forest-950 dark:text-white tracking-tight">
                  {isEn ? 'Web3 Botanical Academy & Testnet Sandbox' : 'Vườn Ươm Web3 & Hộ Chiếu Thực Vật Số (100% Testnet)'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-200 dark:border-emerald-700/50">
                  <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Sepolia & Base Testnet (0đ Tiền Thật)</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[10px] font-semibold border border-amber-200 dark:border-amber-800/50">
                  <span>Học Tập & Trải Nghiệm Giáo Dục</span>
                </span>
              </div>
              <p className="text-xs text-forest-600 dark:text-forest-300 mt-1">
                {isEn
                  ? 'Learn real Web3 concepts, connect a real wallet, claim free testnet ETH from faucets, and mint dynamic plant passports with real cryptography.'
                  : 'Học cách sử dụng ví Web3 thật, nhận crypto testnet miễn phí từ vòi Faucet, và đúc hộ chiếu cây số bằng chữ ký số cá nhân.'}
              </p>
            </div>
          </div>

          {/* Right: Trạng thái Kết nối Ví Thật & Điểm Uy Tín Karma */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Badge Điểm Uy Tín Karma (Học Testnet Nhận Thưởng) */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-50 dark:bg-forest-950/90 border border-amber-500/40 text-xs shadow-sm">
              <span className="text-base leading-none">{karmaState.badge.icon}</span>
              <div>
                <span className="text-[10px] text-amber-800 dark:text-amber-200/80 font-medium block leading-none">
                  {isEn ? 'Karma Standing' : 'Uy Tín Nhà Vườn'}
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-300 font-mono text-xs leading-none">
                  +{karmaState.total_karma} pts
                </span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-800 dark:text-amber-300 font-semibold border border-amber-400/40 shrink-0">
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
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 text-xs shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                  <span className="font-semibold text-forest-950 dark:text-white text-xs">{wallet.walletName}</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-300 text-xs">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1 hover:text-forest-950 dark:hover:text-white text-forest-500 dark:text-gray-400 transition"
                    title={isEn ? 'Copy wallet address' : 'Sao chép địa chỉ ví'}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Số dư ETH Testnet */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 text-xs shadow-xs">
                  <Coins className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span className="font-mono text-amber-700 dark:text-amber-300 font-bold">{wallet.balanceEth} ETH</span>
                  <span className="text-[10px] text-forest-500 dark:text-forest-400">(Testnet)</span>
                  <button
                    onClick={handleRefreshBalance}
                    className="p-1 text-forest-500 hover:text-forest-950 dark:text-gray-400 dark:hover:text-white transition"
                    title={isEn ? 'Refresh balance' : 'Làm mới số dư'}
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>

                {/* Cảnh báo mạng & nút chuyển sang Testnet */}
                {!wallet.isCorrectNetwork ? (
                  <button
                    onClick={handleSwitchNetwork}
                    className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 animate-pulse shadow-md transition"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Switch to Testnet' : 'Đổi Sang Testnet'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleToggleNetwork}
                    className="px-2.5 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/80 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm group"
                    title={isEn ? 'Click to switch network (Sepolia ⇋ Base Sepolia)' : 'Bấm để đổi mạng (Sepolia ⇋ Base Sepolia)'}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{wallet.networkName}</span>
                    <ArrowLeftRight className="w-3 h-3 text-emerald-400 opacity-70 group-hover:opacity-100 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                )}

                {/* Gợi ý chuyển mạng nếu đang ở Base Sepolia mà số dư = 0 */}
                {wallet.balanceEth === '0.0000' && (wallet.chainId?.toLowerCase() === '0x14a34' || wallet.chainId === '84532') && (
                  <button
                    onClick={handleToggleNetwork}
                    className="px-2.5 py-1 rounded-xl bg-amber-950/90 hover:bg-amber-900 text-amber-300 border border-amber-600/80 text-[11px] font-semibold flex items-center gap-1.5 transition animate-pulse cursor-pointer shadow-md"
                    title="Bấm để chuyển sang mạng Ethereum Sepolia xem 0.05 ETH bạn vừa nhận"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{isEn ? 'Switch to Sepolia (0.05 ETH)' : 'Đổi sang Sepolia (0.05 ETH)'}</span>
                  </button>
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
        
        {/* Mobile: Dạng Dropdown Trigger mở Popup / Drawer chọn tab ("bay ra tab mới, có nút X để tắt") */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileTabDrawerOpen(true)}
            className="w-full p-3.5 rounded-2xl bg-white dark:bg-charcoal-900 border border-forest-200 dark:border-emerald-500/50 shadow-md flex items-center justify-between gap-3 text-left transition active:scale-[0.99] hover:border-emerald-400"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center shrink-0 shadow-sm">
                {React.createElement(
                  LEARNING_TABS.find((t) => t.id === activeTab)?.icon || BookOpen,
                  { className: 'w-5 h-5' }
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    {isEn ? 'Current Section' : 'Phân khu đang xem'}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/40">
                    {isEn
                      ? LEARNING_TABS.find((t) => t.id === activeTab)?.badgeEn
                      : LEARNING_TABS.find((t) => t.id === activeTab)?.badgeVi}
                  </span>
                </div>
                <p className="text-xs font-bold text-forest-950 dark:text-white truncate font-serif mt-0.5">
                  {isEn
                    ? LEARNING_TABS.find((t) => t.id === activeTab)?.nameEn
                    : LEARNING_TABS.find((t) => t.id === activeTab)?.nameVi}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 shadow-sm transition">
              <span>{isEn ? 'Switch' : 'Đổi Tab'}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Mobile Popup Modal ("Bay ra tab mới, có nút X để tắt đi") */}
        {isMobileTabDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center md:hidden p-0 sm:p-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileTabDrawerOpen(false)}
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-lg bg-white dark:bg-charcoal-900 border-t sm:border border-forest-200 dark:border-forest-700 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl text-forest-950 dark:text-white max-h-[88vh] overflow-y-auto animate-in slide-in-from-bottom-6 duration-200 z-10 space-y-4">
              {/* Header with Title and 'X' close button */}
              <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-serif text-forest-950 dark:text-white">
                      {isEn ? 'Select Learning Section' : 'Chọn Phân Khu Học Tập Web3'}
                    </h3>
                    <p className="text-[11px] text-forest-600 dark:text-forest-300">
                      {isEn ? 'Base Sepolia Testnet (100% Free - 0đ)' : 'Mạng Thử Nghiệm Base Sepolia (0đ Gas)'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileTabDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-forest-100 dark:bg-forest-800/80 hover:bg-forest-200 dark:hover:bg-forest-700 flex items-center justify-center text-forest-700 dark:text-gray-300 hover:text-forest-950 dark:hover:text-white transition shadow-sm"
                  aria-label="Đóng"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* List of 4 Interactive Learning Modules */}
              <div className="space-y-2.5">
                {LEARNING_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isCurrent = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileTabDrawerOpen(false);
                      }}
                      className={`w-full p-3.5 rounded-2xl text-left transition flex items-center justify-between gap-3 border ${
                        isCurrent
                          ? 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-500 text-forest-950 dark:text-white shadow-md ring-1 ring-emerald-400'
                          : 'bg-forest-50/70 dark:bg-forest-950/70 border-forest-100 dark:border-forest-800 hover:bg-forest-100 dark:hover:bg-forest-900 text-forest-900 dark:text-forest-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                            isCurrent
                              ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                              : 'bg-forest-100 dark:bg-forest-900 text-emerald-700 dark:text-emerald-400 border-forest-200 dark:border-forest-800'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-forest-950 dark:text-white font-serif">
                              {isEn ? tab.nameEn : tab.nameVi}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/40">
                              {isEn ? tab.badgeEn : tab.badgeVi}
                            </span>
                          </div>
                          <p className="text-[11px] text-forest-600 dark:text-forest-300/90 mt-1 line-clamp-1">
                            {isEn ? tab.descEn : tab.descVi}
                          </p>
                        </div>
                      </div>

                      {isCurrent ? (
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-[10px] font-extrabold shrink-0 shadow-xs">
                          {isEn ? 'Active' : 'Đang Xem ✓'}
                        </span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-forest-400 dark:text-forest-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Close Button at bottom */}
              <button
                onClick={() => setIsMobileTabDrawerOpen(false)}
                className="w-full py-2.5 rounded-xl bg-forest-100 dark:bg-forest-800 hover:bg-forest-200 dark:hover:bg-forest-700 text-forest-800 dark:text-forest-200 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>{isEn ? 'Close & Return' : 'Đóng Bảng Chọn (✕)'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Desktop: Navigation Tabs ngang đầy đủ */}
        <div className="hidden md:flex items-center gap-2 border-b border-forest-200 dark:border-forest-800/80 pb-2 overflow-x-auto no-scrollbar">
          {LEARNING_TABS.map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white dark:bg-charcoal-900/60 border border-forest-100 dark:border-forest-800 text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-charcoal-900 hover:text-forest-950 dark:hover:text-white shadow-xs'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{isEn ? tab.nameEn : tab.nameVi}</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/40">
                  {isEn ? tab.badgeEn : tab.badgeVi}
                </span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: VỠ LÒNG WEB3 TRONG 3 PHÚT (WEB3 101) */}
        {/* ============================================================== */}
        {activeTab === 'learn' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in">
            {/* Card 1: Ví Web3 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900/90 border border-forest-100 dark:border-forest-800 space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                🔑
              </div>
              <h3 className="text-sm font-serif font-bold text-forest-950 dark:text-white">
                {isEn ? 'What is a Web3 Wallet?' : 'Ví Web3 là gì?'}
              </h3>
              <p className="text-xs text-forest-600 dark:text-forest-300 leading-relaxed">
                {isEn
                  ? 'Think of it as your digital keychain. Unlike banks, no central company owns it. You control your 12 secret seed words.'
                  : 'Hãy tưởng tượng ví Web3 như chiếc chùm chìa khóa riêng của bạn. Không một ngân hàng hay công ty nào có thể khóa hay tịch thu tài sản của bạn.'}
              </p>
            </div>

            {/* Card 2: Mạng Testnet */}
            <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900/90 border border-forest-100 dark:border-forest-800 space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                🧪
              </div>
              <h3 className="text-sm font-serif font-bold text-forest-950 dark:text-white">
                {isEn ? 'What is a Testnet?' : 'Mạng Testnet là gì?'}
              </h3>
              <p className="text-xs text-forest-600 dark:text-forest-300 leading-relaxed">
                {isEn
                  ? 'A real blockchain network built for learning and testing. Transactions are real, but coins have 0 real monetary value. Zero risk!'
                  : 'Là mạng thử nghiệm chạy song song với mạng thật. Mọi thao tác ký số, chuyển token đều là thật nhưng tiền có giá trị 0đ. Thoải mái bấm thử, không sợ mất tiền!'}
              </p>
            </div>

            {/* Card 3: Faucet */}
            <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900/90 border border-forest-100 dark:border-forest-800 space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                🚰
              </div>
              <h3 className="text-sm font-serif font-bold text-forest-950 dark:text-white">
                {isEn ? 'What is a Faucet?' : 'Faucet (Vòi nước) là gì?'}
              </h3>
              <p className="text-xs text-forest-600 dark:text-forest-300 leading-relaxed">
                {isEn
                  ? 'Websites that freely distribute small amounts of testnet ETH so anyone can experiment with smart contracts for free.'
                  : 'Là các trang web do Coinbase, Google tài trợ để cấp ETH thử nghiệm miễn phí mỗi ngày. Chỉ cần dán địa chỉ ví là nhận được ETH để làm quen.'}
              </p>
            </div>

            {/* Card 4: Hộ chiếu cây NFT */}
            <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900/90 border border-forest-100 dark:border-forest-800 space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                🌱
              </div>
              <h3 className="text-sm font-serif font-bold text-forest-950 dark:text-white">
                {isEn ? 'Plant Passport NFT?' : 'Hộ chiếu cây NFT giúp gì?'}
              </h3>
              <p className="text-xs text-forest-600 dark:text-forest-300 leading-relaxed">
                {isEn
                  ? 'A tamper-proof birth certificate for your plant. Proves genetic lineage, planting age, and organic care without paperwork.'
                  : 'Là thẻ căn cước công dân số cho chậu cây. Giúp người yêu cây chứng minh nguồn gen thuần chủng, ngày gieo trồng và không bị làm giả giống.'}
              </p>
            </div>

            {/* GitBook Documentation Link Banner */}
            <div className="md:col-span-2 lg:col-span-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/80 to-forest-50 dark:from-forest-900 dark:via-charcoal-900 dark:to-forest-950 border border-emerald-300 dark:border-emerald-500/40 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    GitBook Academy
                  </span>
                  <h4 className="text-sm font-bold text-forest-950 dark:text-white font-serif">
                    {isEn ? 'Yeu Trong Cay Web3 Academy - Comprehensive GitBook Guide' : 'Giáo Trình GitBook Toàn Tập: Web3 & Hộ Chiếu Thực Vật Số'}
                  </h4>
                </div>
                <p className="text-xs text-forest-700 dark:text-forest-300 leading-relaxed max-w-3xl">
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
            <div className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-emerald-400 dark:border-emerald-500/60 shadow-lg space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>{isEn ? 'Step 1: Copy Your Real Wallet Address' : 'Bước 1: Sao Chép Địa Chỉ Ví Của Bạn'}</span>
                </span>
                {wallet?.isConnected && (
                  <span className="text-xs font-mono text-amber-700 dark:text-amber-300 bg-forest-50 dark:bg-forest-950 px-3 py-1 rounded-full border border-forest-200 dark:border-forest-800">
                    Số dư hiện tại: {wallet.balanceEth} ETH (Testnet)
                  </span>
                )}
              </div>

              <p className="text-xs text-forest-600 dark:text-forest-300">
                {isEn
                  ? 'To receive free testnet ETH, copy your address below, then open one of the trusted faucets to paste it.'
                  : 'Để nhận ETH testnet miễn phí, hãy bấm nút sao chép địa chỉ ví dưới đây, sau đó nhấp vào 1 trong các vòi Faucet bên dưới để dán vào nhận tiền:'}
              </p>

              <div className="flex items-center gap-2 max-w-2xl">
                <input
                  type="text"
                  readOnly
                  value={wallet?.address || (isEn ? 'Please connect your real wallet first' : 'Vui lòng bấm Kết Nối Ví Thật ở góc trên trước')}
                  className="w-full px-4 py-2.5 rounded-xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 font-mono text-xs text-emerald-700 dark:text-emerald-300 select-all focus:outline-none"
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-forest-700 dark:text-forest-300 mb-3 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{isEn ? 'Step 2: Choose a Trusted Faucet & Paste Your Address' : 'Bước 2: Mở Vòi Faucet & Dán Địa Chỉ Nhận ETH (0đ)'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_FAUCETS.map((f, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white dark:bg-charcoal-900/90 border border-forest-100 dark:border-forest-800 hover:border-emerald-500/50 transition shadow-sm hover:shadow-md flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-forest-950 dark:text-white flex items-center gap-1.5">
                          <span>{f.name}</span>
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          {f.amount}
                        </span>
                      </div>
                      <p className="text-xs text-forest-600 dark:text-forest-300">
                        {isEn ? f.descriptionEn : f.descriptionVi}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-forest-100 dark:border-forest-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-forest-500 dark:text-gray-400">
                        Mạng: <span className="text-forest-950 dark:text-white font-semibold">{f.network}</span>
                      </span>
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-forest-100 dark:bg-forest-800 hover:bg-forest-200 dark:hover:bg-forest-700 text-forest-950 dark:text-white font-bold text-xs flex items-center gap-1 transition shadow-xs"
                      >
                        <span>{isEn ? 'Open Faucet' : 'Mở Vòi Này'}</span>
                        <ExternalLink className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
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
          <div className="bg-white dark:bg-charcoal-900/90 rounded-2xl p-4 sm:p-6 border border-forest-100 dark:border-forest-800 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                <h3 className="text-base font-serif font-bold text-forest-950 dark:text-white">
                  {isEn ? 'Real Wallet Botanical Passport Studio (Dynamic NFT)' : 'Xưởng Ký Số & Cấp Hộ Chiếu Thực Vật Bản Địa (Ví Thật)'}
                </h3>
              </div>

              {/* Tùy chọn Sổ cái (Ledger Selector) */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-forest-600 dark:text-forest-300 font-semibold flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{isEn ? 'Target Ledger:' : 'Sổ cái (Ledger):'}</span>
                </label>
                <select
                  value={targetLedger}
                  onChange={(e) => handleLedgerSelect(e.target.value as 'Ethereum Sepolia' | 'Base Sepolia' | 'Polygon Amoy')}
                  className="px-3 py-1.5 bg-forest-50 dark:bg-forest-950 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-mono font-bold border border-forest-200 dark:border-emerald-700/80 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-xs"
                >
                  <option value="Ethereum Sepolia">Ethereum Sepolia Testnet (0đ)</option>
                  <option value="Base Sepolia">Base Sepolia Testnet (0đ)</option>
                  <option value="Polygon Amoy">Polygon Amoy Testnet (0đ)</option>
                </select>
              </div>
            </div>

            {/* Banner thông báo khi người dùng bấm "Tạo NFT" từ một bài viết cụ thể (?mint=<slug>) */}
            {selectedArticleSlug && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-forest-900 to-amber-950/60 border border-amber-400/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-forest-950 text-[10px] font-black uppercase tracking-wider">
                        {isEn ? 'First-to-Mint Article Claim' : 'Đúc NFT Độc Bản Từ Bài Viết'}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {customPlantName} ({customScientific})
                      </span>
                    </div>
                    <p className="text-xs text-forest-200 mt-1">
                      {isEn
                        ? 'All botanical data from the article has been pre-filled below. Connect your wallet and click Mint to become the permanent owner shown on the article!'
                        : 'Thông tin & mã SHA-256 của bài viết đã được nạp sẵn bên dưới. Hãy kết nối ví và bấm Đúc ngay để gắn huy hiệu sở hữu của bạn lên bài viết!'}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/cay/${selectedArticleSlug}`}
                  className="px-3.5 py-2 rounded-xl bg-forest-800 hover:bg-forest-700 text-emerald-300 hover:text-white text-xs font-bold border border-forest-700 shrink-0 transition text-center"
                >
                  {isEn ? '← Back to Article' : '← Xem Bài Viết Cây Này'}
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              {/* Preview Cây & Upload Ảnh Thật & Mã Băm SHA-256 (md:col-span-5) */}
              <div className="md:col-span-5 bg-forest-50 dark:bg-forest-950 rounded-2xl p-4 border border-forest-200 dark:border-forest-800 space-y-3">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-forest-100 dark:bg-charcoal-900 border border-forest-200 dark:border-forest-800 group">
                  <img
                    src={plantSource === 'custom' && customImage ? customImage : SAMPLE_MINT_PLANTS[selectedPlantIndex].image}
                    alt={plantSource === 'custom' ? (customPlantName || 'Cây của bạn') : SAMPLE_MINT_PLANTS[selectedPlantIndex].name_vi}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-forest-950/80 backdrop-blur-xs text-emerald-300 border border-emerald-700/60">
                    Giai đoạn {evolutionStage}/3
                  </div>

                  {plantSource === 'custom' && (
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/90 text-amber-300 border border-amber-600/70 shadow-sm flex items-center gap-1">
                      <Camera className="w-3 h-3 text-amber-400" />
                      <span>{isEn ? 'Custom Photo' : 'Ảnh Tự Tải'}</span>
                    </div>
                  )}
                </div>

                {/* Nút tải ảnh cây thật của bạn lên */}
                <div className="space-y-1.5">
                  <label className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-forest-900/90 hover:bg-forest-50 dark:hover:bg-forest-800 border border-dashed border-emerald-500/80 hover:border-emerald-600 dark:hover:border-emerald-400 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition shadow-xs active:scale-[0.99]">
                    <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      {plantSource === 'custom' && customImage
                        ? (isEn ? 'Change Tree Photo' : 'Đổi Ảnh Cây Khác Từ Máy')
                        : (isEn ? 'Upload Your Own Plant Photo' : '📸 Tải Ảnh Cây Thật Của Bạn Lên')}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomImageUpload}
                      className="hidden"
                    />
                  </label>

                  {plantSource === 'custom' && (
                    <button
                      type="button"
                      onClick={() => {
                        setPlantSource('sample');
                        setCustomImage(null);
                        setCustomImageSha(null);
                      }}
                      className="w-full py-1 text-[11px] text-forest-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-300 flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{isEn ? 'Back to sample species' : 'Quay lại dùng giống mẫu'}</span>
                    </button>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-forest-950 dark:text-white">
                    {plantSource === 'custom' && customPlantName
                      ? customPlantName
                      : isEn
                      ? SAMPLE_MINT_PLANTS[selectedPlantIndex].name_en
                      : SAMPLE_MINT_PLANTS[selectedPlantIndex].name_vi}
                  </h4>
                  <p className="font-mono italic text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {plantSource === 'custom'
                      ? (customScientific || (isEn ? 'Personal Botanical Specimen' : 'Mẫu thực vật cá nhân'))
                      : SAMPLE_MINT_PLANTS[selectedPlantIndex].scientific}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-charcoal-900 border border-forest-200 dark:border-forest-800 text-[10px] font-mono text-forest-600 dark:text-gray-400 space-y-1 shadow-xs">
                  <span className="text-forest-900 dark:text-gray-300 font-semibold block">Bằng chứng mật mã học (SHA-256):</span>
                  <span className="text-emerald-700 dark:text-emerald-300 truncate block">
                    {plantSource === 'custom' && customImageSha
                      ? `sha256:${customImageSha.slice(0, 24)}...stage${evolutionStage}`
                      : `sha256:${SAMPLE_MINT_PLANTS[selectedPlantIndex].id}...stage${evolutionStage}`}
                  </span>
                </div>
              </div>

              {/* Form Lựa Chọn & Nút Ký Ví Thật (md:col-span-7) */}
              <div className="md:col-span-7 space-y-4">
                {/* Chuyển đổi giữa giống mẫu hoặc tự tải ảnh cây riêng */}
                <div className="flex items-center gap-2 p-1 bg-forest-50 dark:bg-forest-950 rounded-xl border border-forest-200 dark:border-forest-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setPlantSource('sample')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition cursor-pointer ${
                      plantSource === 'sample'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-forest-600 dark:text-forest-300 hover:text-forest-950 dark:hover:text-white'
                    }`}
                  >
                    🌿 {isEn ? 'Choose Sample Plant' : 'Chọn Cây Mẫu Bản Địa'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlantSource('custom')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition cursor-pointer ${
                      plantSource === 'custom'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-forest-600 dark:text-forest-300 hover:text-forest-950 dark:hover:text-white'
                    }`}
                  >
                    📸 {isEn ? 'Custom Plant & Photo' : 'Tự Up Ảnh & Tên Cây'}
                  </button>
                </div>

                {plantSource === 'sample' ? (
                  <div>
                    <label className="text-xs font-semibold text-forest-700 dark:text-forest-300 block mb-1.5">
                      {isEn ? 'Select Plant Species to Certify:' : '1. Chọn giống cây bản địa muốn cấp hộ chiếu:'}
                    </label>
                    <select
                      value={selectedPlantIndex}
                      onChange={(e) => setSelectedPlantIndex(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 rounded-xl text-xs text-forest-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      {SAMPLE_MINT_PLANTS.map((p, idx) => (
                        <option key={p.id} value={idx}>
                          {isEn ? p.name_en : p.name_vi} ({p.scientific})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-forest-700 dark:text-forest-300 block mb-1.5">
                        {isEn ? 'Your Plant Name:' : '1. Tên chậu cây của bạn:'}
                      </label>
                      <input
                        type="text"
                        value={customPlantName}
                        onChange={(e) => setCustomPlantName(e.target.value)}
                        placeholder={isEn ? 'e.g. My 5-Petal Golden Apricot, Balcony Guava...' : 'VD: Cây Mai Vàng Cổ Thụ, Chậu Ổi Lùn Ban Công...'}
                        className="w-full px-3.5 py-2.5 bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 rounded-xl text-xs text-forest-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-forest-400 dark:placeholder-forest-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-forest-700 dark:text-forest-300 block mb-1.5">
                        {isEn ? 'Variety / Provenance (Optional):' : 'Giống cây / Xuất xứ (Tùy chọn):'}
                      </label>
                      <input
                        type="text"
                        value={customScientific}
                        onChange={(e) => setCustomScientific(e.target.value)}
                        placeholder={isEn ? 'e.g. Ochna integerrima / Ba Vi Garden' : 'VD: Ochna integerrima / Vườn nhà Ba Vì'}
                        className="w-full px-3.5 py-2.5 bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 rounded-xl text-xs text-forest-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-forest-400 dark:placeholder-forest-600"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-forest-700 dark:text-forest-300 block mb-1.5">
                    {isEn ? 'Growth Stage Evolution:' : '2. Giai đoạn sinh trưởng hiện tại:'}
                  </label>
                  <select
                    value={evolutionStage}
                    onChange={(e) => setEvolutionStage(Number(e.target.value) as 1 | 2 | 3)}
                    className="w-full px-3.5 py-2.5 bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 rounded-xl text-xs text-forest-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value={1}>{isEn ? 'Stage 1: Seedling & Propagation' : '1. Mầm non gieo ươm / Cành giâm rễ non'}</option>
                    <option value={2}>{isEn ? 'Stage 2: Vegetative Shoot Growth' : '2. Sinh trưởng phân cành tán lá sum suê'}</option>
                    <option value={3}>{isEn ? 'Stage 3: Flowering & Fruiting' : '3. Đơm hoa kết trái / Đạt tuổi dược liệu'}</option>
                  </select>
                </div>

                {/* Lựa chọn phương thức đúc: On-chain thật hay Ký số 0đ */}
                <div className="p-3 rounded-xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-forest-950 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                      <span>{isEn ? 'Minting Method:' : 'Phương thức đúc Hộ Chiếu:'}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowContractConfig(!showContractConfig)}
                      className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      {showContractConfig ? 'Ẩn cấu hình Contract' : '⚙️ Cấu hình Contract'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setMintMode('onchain')}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition cursor-pointer ${
                        mintMode === 'onchain'
                          ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-forest-950 dark:text-white shadow-sm ring-1 ring-emerald-500'
                          : 'bg-white dark:bg-charcoal-900 border-forest-200 dark:border-forest-800 text-forest-700 dark:text-forest-300 hover:text-forest-950 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                        <span>🚀 Đúc On-chain Thật</span>
                      </div>
                      <div className="text-[10px] text-forest-500 dark:text-forest-300 mt-0.5">Gọi Smart Contract ERC-721 thật qua MetaMask</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMintMode('signature')}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition cursor-pointer ${
                        mintMode === 'signature'
                          ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-forest-950 dark:text-white shadow-sm ring-1 ring-emerald-500'
                          : 'bg-white dark:bg-charcoal-900 border-forest-200 dark:border-forest-800 text-forest-700 dark:text-forest-300 hover:text-forest-950 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                        <span>✍️ Ký Số 0đ Gas</span>
                      </div>
                      <div className="text-[10px] text-forest-500 dark:text-forest-300 mt-0.5">Ký mật mã EIP-191, không tốn gas testnet</div>
                    </button>
                  </div>

                  {/* Cấu hình địa chỉ hợp đồng Smart Contract NFT */}
                  {showContractConfig && (
                    <div className="p-2.5 rounded-xl bg-white dark:bg-charcoal-900 border border-forest-200 dark:border-forest-800 text-xs space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-forest-700 dark:text-forest-300 font-semibold">Địa chỉ Contract NFT ({targetLedger}):</span>
                        <a
                          href="https://remix.ethereum.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-amber-600 dark:text-amber-300 hover:underline flex items-center gap-1"
                        >
                          <span>Mở Remix IDE deploy ↗</span>
                        </a>
                      </div>
                      <input
                        type="text"
                        value={contractAddress}
                        onChange={(e) => setContractAddress(e.target.value)}
                        placeholder="0x..."
                        className="w-full px-3 py-1.5 bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-700 rounded-lg text-xs font-mono text-emerald-700 dark:text-emerald-300 focus:outline-none"
                      />
                      <p className="text-[10px] text-forest-500 dark:text-gray-400 leading-relaxed">
                        Mã nguồn contract có sẵn tại <span className="font-mono text-emerald-600 dark:text-emerald-300">contracts/PlantPassportNFT.sol</span>. Bạn có thể dán vào Remix, bấm Deploy bằng MetaMask với 0.05 SepoliaETH, sau đó dán địa chỉ contract vào đây.
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800/80 text-xs text-forest-700 dark:text-forest-200/90 leading-relaxed shadow-xs">
                  💡 <span className="font-semibold text-forest-950 dark:text-white">Xác thực ví thật:</span>{' '}
                  {mintMode === 'onchain'
                    ? `Khi bấm nút, MetaMask sẽ mở popup yêu cầu xác nhận giao dịch ghi vào Smart Contract NFT trên sổ cái ${targetLedger}. Giao dịch này sử dụng gas testnet và tạo ra NFT thật có thể tra cứu trên Blockchain Explorer.`
                    : `Khi bấm nút, ví Web3 của bạn sẽ mở popup yêu cầu ký xác nhận thông điệp EIP-191. Chữ ký số này chứng minh quyền sở hữu độc bản và hoàn toàn 0đ gas.`}
                </div>

                {/* Banner Cơ Chế Độc Bản yeutrongcay.com */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Bảo Vệ Độc Bản Tuyệt Đối:</span>
                    <span>Mỗi giống cây và ảnh gốc chỉ có DUY NHẤT một Hộ Chiếu Số trên yeutrongcay.com. Cây đã đúc sẽ được bảo hộ độc quyền cho bạn trong Hồ Sơ Cá Nhân; người khác sẽ bị chặn không thể đúc lại!</span>
                  </div>
                </div>

                <button
                  onClick={handleMintWithRealWallet}
                  disabled={isMinting || !wallet?.isConnected}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-[0.99] disabled:opacity-50 text-white ${
                    mintMode === 'onchain'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-900/40 cursor-pointer'
                      : 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer'
                  }`}
                >
                  {isMinting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>{isEn ? 'Please Confirm on Your Wallet...' : 'Vui Lòng Mở MetaMask & Xác Nhận...'}</span>
                    </>
                  ) : !wallet?.isConnected ? (
                    <>
                      <Wallet className="w-4 h-4" />
                      <span>{isEn ? 'Connect Real Wallet to Mint' : 'Cần Kết Nối Ví Thật Để Đúc'}</span>
                    </>
                  ) : mintMode === 'onchain' ? (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>{isEn ? 'Mint Real On-chain NFT (MetaMask Confirm)' : 'Đúc NFT Thật Lên Blockchain (MetaMask Xác Nhận)'}</span>
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
              <div className="mt-5 bg-white dark:bg-forest-950 rounded-2xl p-5 border border-emerald-500 shadow-2xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      <Check className="w-5 h-5" />
                      <span>{isEn ? 'Digital Plant Passport Successfully Minted!' : 'Hộ Chiếu Cây Trồng Số Đã Cấp Thành Công!'}</span>
                    </span>
                    {mintedPassport.is_onchain && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-300" />
                        <span>ON-CHAIN THẬT</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                      Token ID: {mintedPassport.token_id}
                    </span>

                    {mintedPassport.is_onchain && mintedPassport.contract_address && (
                      <button
                        onClick={async () => {
                          const res = await web3WalletService.addNftToMetaMask(
                            mintedPassport.contract_address!,
                            mintedPassport.token_id.replace('#', '')
                          );
                          if (res) setAddedToMetaMask(true);
                        }}
                        className="px-3 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-800 dark:text-amber-300 border border-amber-500/50 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        title="Thêm thẻ NFT này vào danh sách quản lý của MetaMask"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{addedToMetaMask ? 'Đã thêm vào ví' : 'Thêm NFT vào MetaMask'}</span>
                      </button>
                    )}

                    {selectedArticleSlug && (
                      <Link
                        to={`/cay/${selectedArticleSlug}`}
                        className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-forest-950 text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{isEn ? 'See Badge on Article' : 'Xem Huy Hiệu Trên Bài Viết'}</span>
                      </Link>
                    )}

                    <Link
                      to="/vuon-cua-toi?tab=nft_gallery"
                      className="px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isEn ? 'View in My Garden Gallery' : 'Xem trong Hồ Sơ Cá Nhân'}</span>
                    </Link>

                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1 rounded-xl bg-forest-100 dark:bg-forest-800 hover:bg-forest-200 dark:hover:bg-forest-700 text-forest-900 dark:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
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
                    className="w-24 h-24 rounded-2xl object-cover border border-forest-200 dark:border-forest-700 shrink-0 shadow-md"
                  />
                  <div className="space-y-1.5 text-xs text-forest-700 dark:text-forest-200 w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-forest-950 dark:text-white text-sm sm:text-base">
                        {mintedPassport.plant_name} ({mintedPassport.scientific_name})
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-900/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60">
                        Giai đoạn {mintedPassport.evolution_stage}/3
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-forest-600 dark:text-gray-400 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                      <span>Ví sở hữu thật: <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{mintedPassport.owner_address}</span></span>
                      <span>Sổ cái: <span className="text-forest-950 dark:text-white font-semibold">{mintedPassport.network}</span></span>
                      {mintedPassport.contract_address && (
                        <span>Contract: <span className="text-amber-700 dark:text-amber-300 font-mono">{mintedPassport.contract_address.slice(0, 8)}...</span></span>
                      )}
                    </div>

                    <div className="p-2 rounded-xl bg-forest-50 dark:bg-charcoal-900 border border-forest-200 dark:border-forest-800 text-[10px] font-mono text-forest-600 dark:text-gray-400 flex flex-wrap items-center justify-between gap-2 shadow-xs">
                      <div className="truncate max-w-md">
                        SHA-256: <span className="text-emerald-700 dark:text-emerald-300">{mintedPassport.image_sha256}</span>
                        {mintSignature && (
                          <span className="ml-2 text-amber-700 dark:text-amber-300 block sm:inline">Chữ ký ví: {mintSignature.slice(0, 16)}...{mintSignature.slice(-8)}</span>
                        )}
                      </div>
                      
                      {mintedPassport.network.includes('Sepolia') && !mintedPassport.network.includes('Base') ? (
                        <div className="flex flex-wrap items-center gap-4">
                          <a
                            href={`https://sepolia.etherscan.io/tx/${mintedPassport.transaction_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <span>Xem giao dịch trên Sepolia Etherscan</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          {mintedPassport.contract_address && (
                            <a
                              href={`https://eth-sepolia.blockscout.com/token/${mintedPassport.contract_address}/instance/${mintedPassport.token_id.replace('#', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>Xem hình ảnh & Metadata NFT trên Blockscout</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-4">
                          <a
                            href={`https://sepolia.basescan.org/tx/${mintedPassport.transaction_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <span>Xem giao dịch trên BaseScan Sepolia</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          {mintedPassport.contract_address && (
                            <a
                              href={`https://base-sepolia.blockscout.com/token/${mintedPassport.contract_address}/instance/${mintedPassport.token_id.replace('#', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>Xem hình ảnh & Metadata NFT trên Blockscout</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
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
          <div className="bg-white dark:bg-charcoal-900/90 rounded-2xl p-5 sm:p-6 border border-forest-100 dark:border-forest-800 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-2">
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

            <p className="text-xs text-forest-600 dark:text-forest-200 leading-relaxed">
              {isEn
                ? 'How Smart Contracts eliminate fraud when swapping rare plants online: The contract locks deposits and automatically enforces a 7-day quarantine.'
                : 'Smart Contract loại trừ rủi ro lừa đảo khi giao lưu cây giống trên mạng: Hợp đồng tự động khóa cọc làm tin và cưỡng chế quy trình cách ly 7 ngày kiểm tra mầm bệnh.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Step 1 */}
              <div className={`p-4 rounded-2xl border transition ${
                escrowStep === 1
                  ? 'bg-teal-50 dark:bg-teal-950/80 border-teal-500 text-teal-950 dark:text-white shadow-md'
                  : escrowStep > 1
                  ? 'bg-forest-50/60 dark:bg-forest-900/40 border-forest-200 dark:border-forest-800 text-forest-700 dark:text-forest-300 opacity-90'
                  : 'bg-forest-50/30 dark:bg-forest-900/20 border-forest-100 dark:border-forest-800 text-forest-400 dark:text-gray-500'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-forest-950 dark:text-cream-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white inline-flex items-center justify-center text-xs font-black">1</span>
                    Khóa Cọc Hạt Giống
                  </span>
                  {escrowStep > 1 && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                </div>
                <p className="text-[11px] text-forest-600 dark:text-forest-300 leading-relaxed">
                  Hai bên cùng ký xác nhận trên ví thật để khóa cọc 20 Token thử nghiệm vào hợp đồng thông minh làm tin trước khi gửi bưu phẩm.
                </p>
              </div>

              {/* Step 2 */}
              <div className={`p-4 rounded-2xl border transition ${
                escrowStep === 2
                  ? 'bg-teal-50 dark:bg-teal-950/80 border-teal-500 text-teal-950 dark:text-white shadow-md'
                  : escrowStep > 2
                  ? 'bg-forest-50/60 dark:bg-forest-900/40 border-forest-200 dark:border-forest-800 text-forest-700 dark:text-forest-300 opacity-90'
                  : 'bg-forest-50/30 dark:bg-forest-900/20 border-forest-100 dark:border-forest-800 text-forest-400 dark:text-gray-500'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-forest-950 dark:text-cream-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white inline-flex items-center justify-center text-xs font-black">2</span>
                    Giao Nhận & 7 Ngày Cách Ly
                  </span>
                  {escrowStep > 2 && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                </div>
                <p className="text-[11px] text-forest-600 dark:text-forest-300 leading-relaxed">
                  Đơn vị vận chuyển giao cây. Đồng hồ Smart Contract tự đếm ngược 7 ngày cách ly phòng mầm nấm bệnh rệp sáp lây chéo vườn nhà.
                </p>
              </div>

              {/* Step 3 */}
              <div className={`p-4 rounded-2xl border transition ${
                escrowStep === 3
                  ? 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-500 text-emerald-950 dark:text-white shadow-md'
                  : 'bg-forest-50/30 dark:bg-forest-900/20 border-forest-100 dark:border-forest-800 text-forest-400 dark:text-gray-500'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-forest-950 dark:text-cream-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white inline-flex items-center justify-center text-xs font-black">3</span>
                    Nghiệm Thu & Thưởng Karma
                  </span>
                  {escrowStep === 3 && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                </div>
                <p className="text-[11px] text-forest-600 dark:text-forest-300 leading-relaxed">
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
