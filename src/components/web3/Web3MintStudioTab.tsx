import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Award,
  Coins,
  Flame,
  Sparkles,
  Camera,
  Upload,
  Trash2,
  MapPin,
  Check,
  RefreshCw,
  Compass,
  ShieldCheck,
  ExternalLink,
  Printer
} from 'lucide-react';
import { Web3TestnetPassport, NftAssetClass, ForestGeoSpec } from '../../types/index.ts';
import { web3WalletService, WalletState } from '../../services/web3WalletService.ts';
import { awardKarmaPoints } from '../../services/karmaService.ts';
import { plantPassportRegistryService, RegisteredPlantPassport } from '../../services/plantPassportRegistryService.ts';
import { Web3OwnedPassportsSection } from './Web3OwnedPassportsSection.tsx';
import { SEED_PLANTS } from '../../data/plants.ts';
import { getPlantBySlug } from '../../services/apiService.ts';
import {
  NFT_ASSET_CLASSES,
  NFT_ASSET_CLASSES_LIST,
  getNftClassConfig,
  calculateHaversineDistanceKm,
  saveForestGpsCheckinPass,
  getValidForestGpsCheckinPass
} from '../../config/ecosystemRegistry.ts';

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
    name_vi: 'Ổi Tàu Ruột Đỏ Lùn Ban Công',
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

export interface Web3MintStudioTabProps {
  isEn: boolean;
  wallet: WalletState | null;
  setWallet: React.Dispatch<React.SetStateAction<WalletState | null>>;
  walletError: string | null;
  setWalletError: (err: string | null) => void;
  mintSlugParam: string | null;
  reincarnationNotice: string | null;
  setReincarnationNotice: (notice: string | null) => void;
  ownedPassports: RegisteredPlantPassport[];
  handleOpenBurnModal: (passport: Web3TestnetPassport | RegisteredPlantPassport) => void;
  setRewardNotice: (notice: { points: number; title: string; desc: string } | null) => void;
}

export const Web3MintStudioTab: React.FC<Web3MintStudioTabProps> = ({
  isEn,
  wallet,
  setWallet,
  setWalletError,
  mintSlugParam,
  reincarnationNotice,
  setReincarnationNotice,
  ownedPassports,
  handleOpenBurnModal,
  setRewardNotice
}) => {
  const [searchParams] = useSearchParams();

  // Trạng thái đúc hộ chiếu
  const [mintMode, setMintMode] = useState<'onchain' | 'signature'>('onchain');
  const [contractAddress, setContractAddress] = useState<string>(() =>
    web3WalletService.getContractAddressForChain(null)
  );
  const [showContractConfig, setShowContractConfig] = useState(false);
  const [addedToMetaMask, setAddedToMetaMask] = useState(false);
  const [plantSource, setPlantSource] = useState<'sample' | 'custom'>('sample');
  const [selectedPlantIndex, setSelectedPlantIndex] = useState(0);
  const [customPlantName, setCustomPlantName] = useState('');
  const [customScientific, setCustomScientific] = useState('');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customImageSha, setCustomImageSha] = useState<string | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [targetLedger, setTargetLedger] = useState<string>('Ethereum Sepolia');
  const [evolutionStage, setEvolutionStage] = useState<1 | 2 | 3>(1);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSignature, setMintSignature] = useState<string | null>(null);
  const [mintedPassport, setMintedPassport] = useState<Web3TestnetPassport | null>(null);

  // 5 Lớp Tài Sản NFT & Xác thực Rừng Sinh Thái GPS (1 NFT = 10.000 m2)
  const [selectedAssetClass, setSelectedAssetClass] = useState<NftAssetClass>('botanical');
  const currentNftConfig = getNftClassConfig(selectedAssetClass);
  const [forestSpec, setForestSpec] = useState<ForestGeoSpec | null>(null);
  const [gpsCheckinStatus, setGpsCheckinStatus] = useState<'idle' | 'checking' | 'verified' | 'failed'>('idle');
  const [gpsErrorMsg, setGpsErrorMsg] = useState<string | null>(null);
  const [gpsDistanceKm, setGpsDistanceKm] = useState<number | null>(null);

  // Lắng nghe sự kiện Tái Sinh (Reincarnate) từ Burn Modal
  useEffect(() => {
    const handleReincarnate = (e: Event) => {
      const customEv = e as CustomEvent<{ plantName: string; scientificName: string; tokenId: string; txHash: string }>;
      if (!customEv.detail) return;
      setPlantSource('custom');
      setCustomPlantName(customEv.detail.plantName);
      setCustomScientific(customEv.detail.scientificName);
      setCustomImage(null);
      setCustomImageSha(null);
      setMintedPassport(null);
    };
    window.addEventListener('ytc_passport_reincarnate_ready', handleReincarnate);
    return () => window.removeEventListener('ytc_passport_reincarnate_ready', handleReincarnate);
  }, []);

  // Tự động nạp thông tin loài cây khi bấm "Tạo NFT" từ bài viết (?mint=<slug>)
  useEffect(() => {
    if (!mintSlugParam) return;
    const classParam = searchParams.get('class') as NftAssetClass | null;
    if (classParam && classParam in NFT_ASSET_CLASSES) {
      setSelectedAssetClass(classParam);
    }
    const applyArticlePlant = (p: {
      slug: string;
      common_name: string;
      scientific_name: string;
      image_url: string;
      image_sha256?: string;
      category?: string;
      nft_class?: NftAssetClass;
      forest_spec?: ForestGeoSpec;
    }) => {
      setSelectedArticleSlug(p.slug);
      setPlantSource('custom');
      setCustomPlantName(p.common_name);
      setCustomScientific(p.scientific_name);
      setCustomImage(p.image_url);
      setCustomImageSha(p.image_sha256 || null);
      if (p.nft_class) {
        setSelectedAssetClass(p.nft_class);
      } else if (p.category === 'forest') {
        setSelectedAssetClass('geo_forest_10000m2');
      } else if (p.category === 'space') {
        setSelectedAssetClass('space_method');
      } else if (p.category === 'recycle') {
        setSelectedAssetClass('eco_invention');
      } else if (p.category === 'culinary') {
        setSelectedAssetClass('culinary_recipe');
      } else {
        setSelectedAssetClass('botanical');
      }
      if (p.forest_spec) {
        setForestSpec(p.forest_spec);
      }
    };

    const seedMatch = SEED_PLANTS.find((p) => p.slug === mintSlugParam || p.id === mintSlugParam);
    if (seedMatch) {
      applyArticlePlant(seedMatch);
    } else {
      getPlantBySlug(mintSlugParam)
        .then((livePlant) => {
          if (livePlant) applyArticlePlant(livePlant as unknown as Parameters<typeof applyArticlePlant>[0]);
        })
        .catch(() => {});
    }
  }, [mintSlugParam, searchParams]);

  // Kiểm tra thẻ thông hành GPS 24h đã lưu cho khu rừng
  useEffect(() => {
    if (selectedAssetClass === 'geo_forest_10000m2' && selectedArticleSlug) {
      const pass = getValidForestGpsCheckinPass(selectedArticleSlug);
      if (pass) {
        setGpsCheckinStatus('verified');
        setGpsDistanceKm(pass.distanceKm);
      } else {
        setGpsCheckinStatus('idle');
      }
    }
  }, [selectedAssetClass, selectedArticleSlug]);

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
  const handleLedgerSelect = async (newLedger: string) => {
    setTargetLedger(newLedger);
    if (!wallet?.isConnected) return;
    try {
      if (newLedger === 'Ethereum Sepolia') {
        await web3WalletService.switchToSepolia();
      } else if (newLedger === 'Base Sepolia') {
        await web3WalletService.switchToBaseSepolia();
      } else if (newLedger === 'BNB Smart Chain Testnet') {
        await web3WalletService.switchToNetwork('0x61');
      } else if (newLedger === 'Polygon Amoy') {
        await web3WalletService.switchToNetwork('0x13882');
      } else if (newLedger === 'Arbitrum Sepolia') {
        await web3WalletService.switchToNetwork('0x66eee');
      }
      const fresh = await web3WalletService.syncCurrentWalletState();
      if (fresh) setWallet(fresh);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || (isEn ? 'Failed to switch ledger network' : 'Lỗi khi chuyển đổi sổ cái trên ví'));
    }
  };

  // Xác thực GPS định vị khu rừng
  const handleGpsCheckin = (simulate = false) => {
    const targetLat = forestSpec?.center_lat || 20.3167; // Mặc định Cúc Phương
    const targetLng = forestSpec?.center_lng || 105.6083;
    const radiusKm = forestSpec?.radius_km || 15;

    if (simulate) {
      const simulatedLat = targetLat + 0.01;
      const simulatedLng = targetLng + 0.01;
      const dist = calculateHaversineDistanceKm(simulatedLat, simulatedLng, targetLat, targetLng);
      saveForestGpsCheckinPass(selectedArticleSlug || 'forest', simulatedLat, simulatedLng, dist);
      setGpsCheckinStatus('verified');
      setGpsDistanceKm(dist);
      setGpsErrorMsg(null);
      return;
    }

    if (!navigator.geolocation) {
      setGpsErrorMsg('Trình duyệt của bạn không hỗ trợ định vị GPS.');
      setGpsCheckinStatus('failed');
      return;
    }

    setGpsCheckinStatus('checking');
    setGpsErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const dist = calculateHaversineDistanceKm(userLat, userLng, targetLat, targetLng);
        setGpsDistanceKm(dist);

        if (dist <= radiusKm) {
          saveForestGpsCheckinPass(selectedArticleSlug || 'forest', userLat, userLng, dist);
          setGpsCheckinStatus('verified');
          setGpsErrorMsg(null);
        } else {
          setGpsCheckinStatus('failed');
          setGpsErrorMsg(`Vị trí của bạn cách tâm khu rừng ${dist.toFixed(1)} km (bán kính vùng rừng cho phép: ${radiusKm} km). Bạn cần ở trong khu vực rừng để đúc NFT!`);
        }
      },
      (err) => {
        setGpsCheckinStatus('failed');
        setGpsErrorMsg(`Không thể lấy tọa độ GPS (${err.message}). Vui lòng cho phép quyền truy cập vị trí trên trình duyệt!`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Thực hiện Đúc Hộ Chiếu
  const handleMintWithRealWallet = async () => {
    if (!wallet || !wallet.isConnected) {
      setWalletError(isEn ? 'Please connect your real Web3 wallet first!' : 'Vui lòng kết nối ví Web3 thật trước khi ký số!');
      return;
    }

    if (wallet.isMainnetDanger || !wallet.isCorrectNetwork) {
      setWalletError(
        isEn
          ? 'Transaction blocked for your safety! You are currently connected to Mainnet (Real Money). Please switch to a Testnet to practice safely.'
          : 'Giao dịch bị chặn để bảo vệ tài sản! Bạn đang kết nối mạng Mainnet (Tiền thật). Vui lòng đổi sang mạng Testnet (Ethereum Sepolia hoặc Base Sepolia) để học tập an toàn 0đ.'
      );
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
    const isForestClass = selectedAssetClass === 'geo_forest_10000m2';
    const forestSlug = selectedArticleSlug || plantPassportRegistryService.normalizeAssetKey(plantNameVi, '', 'geo_forest_10000m2');
    const totalAreaM2 = forestSpec?.total_area_m2 || 1000000;
    const forestStats = isForestClass ? plantPassportRegistryService.getForestMintedAreaStats(forestSlug, totalAreaM2) : null;
    const lotNumber = forestStats ? forestStats.nextLotNumber : undefined;

    // Kiểm tra định vị GPS nếu là lớp Rừng sinh thái (10.000 m2 / NFT)
    if (isForestClass && gpsCheckinStatus !== 'verified') {
      setWalletError(isEn ? 'Please complete the device GPS check-in to confirm you are in this forest zone!' : 'Vui lòng xác thực GPS (hoặc Thẻ thông hành 24h) để chứng minh bạn đang có mặt tại khu rừng này trước khi đúc NFT!');
      setIsMinting(false);
      return;
    }

    if (isForestClass && forestStats?.isSoldOut) {
      setWalletError('Khu rừng này đã được bảo trợ 100% diện tích các lô NFT! Không thể đúc thêm.');
      setIsMinting(false);
      return;
    }

    // KIỂM TRA ĐỘC BẢN TUYỆT ĐỐI (Exclusivity Rule - Chặn đúc trùng lặp)
    const exclusivity = plantPassportRegistryService.checkPlantExclusivity({
      plantName: plantNameVi,
      scientificName: scientificName,
      sha256: sha,
      walletAddress: wallet.address,
      nftClass: selectedAssetClass,
      forestSlug: isForestClass ? forestSlug : undefined,
      lotNumber: lotNumber,
      totalAreaM2: totalAreaM2
    });

    if (!exclusivity.isAllowed) {
      setWalletError(exclusivity.reason || (isEn ? 'This specimen already has a unique Master NFT Passport in yeutrongcay.com!' : 'Tài sản này đã được cấp Hộ Chiếu Độc Bản trước đó trong thế giới Yêu Trồng Cây!'));
      setIsMinting(false);
      return;
    }

    const effectiveTokenId = isForestClass ? String(lotNumber) : String(randomToken);
    const finalDisplayName = isForestClass ? `${plantNameVi} - Lô #${lotNumber} (10.000 m²)` : plantNameVi;
    const finalDisplayNameEn = isForestClass ? `${plantNameEn} - Lot #${lotNumber} (10,000 m²)` : plantNameEn;

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
        } else if (targetLedger === 'BNB Smart Chain Testnet') {
          const currentChain = wallet.chainId?.toLowerCase();
          if (currentChain !== '0x61' && currentChain !== '97') {
            await web3WalletService.switchToNetwork('0x61');
            const fresh = await web3WalletService.syncCurrentWalletState();
            if (fresh) setWallet(fresh);
          }
        } else if (targetLedger === 'Polygon Amoy') {
          const currentChain = wallet.chainId?.toLowerCase();
          if (currentChain !== '0x13882' && currentChain !== '80002') {
            await web3WalletService.switchToNetwork('0x13882');
            const fresh = await web3WalletService.syncCurrentWalletState();
            if (fresh) setWallet(fresh);
          }
        } else if (targetLedger === 'Arbitrum Sepolia') {
          const currentChain = wallet.chainId?.toLowerCase();
          if (currentChain !== '0x66eee' && currentChain !== '421614') {
            await web3WalletService.switchToNetwork('0x66eee');
            const fresh = await web3WalletService.syncCurrentWalletState();
            if (fresh) setWallet(fresh);
          }
        }

        const targetContract = (contractAddress.startsWith('0x') && contractAddress.length === 42)
          ? (contractAddress as `0x${string}`)
          : web3WalletService.getContractAddressForChain(wallet.chainId);

        // Tạo metadata chuẩn ERC-721 Token URI (data:application/json)
        const metadata = {
          name: `${finalDisplayName} - Botanical Passport #${effectiveTokenId}`,
          description: `Chung chi Thuc Vat So & Ho Chieu Sinh Truong yeutrongcay.com cho cay ${finalDisplayName}. Lop tai san: ${selectedAssetClass}.`,
          image: plantImg,
          external_url: `https://yeutrongcay.com/vuon-uom-web3?token=${effectiveTokenId}`,
          attributes: [
            { trait_type: 'Species', value: plantNameVi },
            { trait_type: 'Scientific Name', value: scientificName },
            { trait_type: 'Asset Class', value: selectedAssetClass },
            { trait_type: 'Evolution Stage', value: `Stage ${evolutionStage}/3` },
            { trait_type: 'SHA256 Fingerprint', value: sha },
            { trait_type: 'Ecosystem', value: 'Yeu Trong Cay Testnet' },
            { trait_type: 'Certified Network', value: activeNetwork },
            ...(isForestClass ? [
              { trait_type: 'Forest Lot', value: `Lot #${lotNumber}` },
              { trait_type: 'Area m2', value: 10000 },
              { trait_type: 'GPS Radius km', value: forestSpec?.radius_km || 15 }
            ] : [])
          ]
        };
        const tokenURI = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(metadata))));

        const realTxHash = await web3WalletService.mintPassportOnChain({
          userAddress: wallet.address as `0x${string}`,
          contractAddress: targetContract,
          plantName: finalDisplayName,
          scientificName: scientificName,
          stage: evolutionStage,
          sha256Proof: sha,
          uri: tokenURI
        });

        setMintedPassport({
          token_id: `#${effectiveTokenId}`,
          plant_name: isEn ? finalDisplayNameEn : finalDisplayName,
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
          token_id: effectiveTokenId,
          plant_name: finalDisplayName,
          scientific_name: scientificName,
          image_url: plantImg,
          image_sha256: sha,
          owner_address: wallet.address,
          network: activeNetwork,
          evolution_stage: evolutionStage,
          transaction_hash: realTxHash,
          contract_address: targetContract,
          minted_at: new Date().toLocaleString('vi-VN'),
          is_onchain: true,
          nft_class: selectedAssetClass,
          forest_slug: isForestClass ? forestSlug : undefined,
          lot_number: lotNumber,
          forest_area_m2: isForestClass ? 10000 : undefined
        });

        awardKarmaPoints(
          50,
          `Đúc thành công NFT Hộ Chiếu Cây On-chain trên ${activeNetwork}`,
          `Minted Real On-chain NFT Plant Passport on ${activeNetwork}`,
          { isTestnet: true, isEn, txHash: realTxHash }
        );
        setRewardNotice({
          points: 50,
          title: isEn ? 'Real On-chain NFT Minted! (+50 Hearts)' : 'Đúc Thành Công NFT On-chain Thật! (+50 Trái Tim)',
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
      const signMsg = `Yêu Trồng Cây - Đúc Hộ Chiếu Thực Vật Số\nLoài Cây: ${finalDisplayName} (${scientificName})\nLớp Tài Sản: ${selectedAssetClass}\nGiai Đoạn: ${evolutionStage}/3\nBằng Chứng SHA-256: ${sha}\nVí Sở Hữu Thật: ${wallet.address}\nSổ Cái Blockchain: ${activeNetwork} (0đ Gas)\nThời Gian Ký: ${new Date().toLocaleString('vi-VN')}`;
      
      const sig = await web3WalletService.signBotanicalRecord(wallet.address, signMsg);
      setMintSignature(sig);

      setMintedPassport({
        token_id: `#${effectiveTokenId}`,
        plant_name: isEn ? finalDisplayNameEn : finalDisplayName,
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

      plantPassportRegistryService.registerPassport({
        token_id: effectiveTokenId,
        plant_name: finalDisplayName,
        scientific_name: scientificName,
        image_url: plantImg,
        image_sha256: sha,
        owner_address: wallet.address,
        network: activeNetwork,
        evolution_stage: evolutionStage,
        transaction_hash: simulatedTx,
        contract_address: '0x0000000000000000000000000000000000000000',
        minted_at: new Date().toLocaleString('vi-VN'),
        is_onchain: false,
        nft_class: selectedAssetClass,
        forest_slug: isForestClass ? forestSlug : undefined,
        lot_number: lotNumber,
        forest_area_m2: isForestClass ? 10000 : undefined
      });

      awardKarmaPoints(
        25,
        `Đúc thành công Hộ Chiếu Cây Số ${plantNameVi} (${activeNetwork} 0đ)`,
        `Minted Digital Plant Passport for ${plantNameEn} (${activeNetwork} 0đ)`,
        { isTestnet: true, isEn, txHash: simulatedTx }
      );
      setRewardNotice({
        points: 25,
        title: isEn ? 'Passport Minting Reward (+25 Hearts)' : 'Thưởng Đúc Hộ Chiếu Cây Testnet (+25 Trái Tim)',
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

  return (
    <div className="bg-white dark:bg-charcoal-900/90 rounded-2xl p-4 sm:p-6 border border-forest-100 dark:border-forest-800 shadow-xl space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          <h3 className="text-base font-serif font-bold text-forest-950 dark:text-white">
            {isEn ? currentNftConfig.studioTitleEn : currentNftConfig.studioTitleVi}
          </h3>
        </div>

        {/* Tùy chọn Sổ cái (Ledger Selector) */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-forest-600 dark:text-forest-300 font-semibold flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? 'Target Ledger:' : 'Sổ Cái (Ledger):'}</span>
          </label>
          <select
            value={targetLedger}
            onChange={(e) => handleLedgerSelect(e.target.value)}
            className="px-3 py-1.5 bg-forest-50 dark:bg-forest-950 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-mono font-bold border border-forest-200 dark:border-emerald-700/80 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-xs"
          >
            <option value="Ethereum Sepolia">Ethereum Sepolia Testnet (0đ)</option>
            <option value="Base Sepolia">Base Sepolia L2 Testnet (0đ)</option>
            <option value="BNB Smart Chain Testnet">BNB Chain Testnet (0đ)</option>
            <option value="Polygon Amoy">Polygon Amoy Testnet (0đ)</option>
            <option value="Arbitrum Sepolia">Arbitrum Sepolia L2 (0đ)</option>
          </select>
        </div>
      </div>

      {/* Thông báo Tái Sinh Hộ Chiếu Thành Công (24h Priority Remint Window) */}
      {reincarnationNotice && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/70 dark:to-amber-950/70 border border-rose-300 dark:border-rose-800 text-xs text-rose-950 dark:text-rose-100 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 animate-bounce" />
            <div>
              <span className="font-bold block text-rose-800 dark:text-rose-300">
                {isEn ? 'Botanical Reincarnation Window Active' : 'Thời Hạn Tái Sinh Độc Quyền (24h)'}
              </span>
              <span>{reincarnationNotice}</span>
            </div>
          </div>
          <button onClick={() => setReincarnationNotice(null)} className="font-bold text-rose-700 dark:text-rose-300 hover:text-rose-950">✕</button>
        </div>
      )}

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
                  {isEn ? `${currentNftConfig.shortName} Claim` : `Đúc ${currentNftConfig.nameVi}`}
                </span>
                <span className="text-xs font-bold text-white">
                  {customPlantName} ({customScientific})
                </span>
              </div>
              <p className="text-xs text-forest-200 mt-1">
                {isEn
                  ? `All data from the article has been pre-filled below. Connect your wallet and confirm to become the permanent owner of this ${currentNftConfig.shortName}!`
                  : `Thông tin & mã SHA-256 đã được nạp sẵn bên dưới. Hãy kết nối ví và bấm Đúc ngay để gắn huy hiệu sở hữu ${currentNftConfig.shortName} của bạn lên bài viết!`}
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
          {/* Lựa chọn 5 Lớp Tài Sản NFT */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-forest-700 dark:text-forest-300 flex items-center justify-between">
              <span>{isEn ? 'NFT Asset Class (5 Classes):' : 'Lớp tài sản NFT (5 phân loại):'}</span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-bold">
                {getNftClassConfig(selectedAssetClass).name}
              </span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
              {NFT_ASSET_CLASSES_LIST.map((cls) => {
                const isSel = selectedAssetClass === cls.id;
                return (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => {
                      setSelectedAssetClass(cls.id);
                      if (cls.id !== 'geo_forest_10000m2') {
                        setGpsCheckinStatus('idle');
                        setGpsErrorMsg(null);
                      }
                    }}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                      isSel
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold'
                        : 'bg-white dark:bg-forest-950 border-forest-200 dark:border-forest-800 text-forest-700 dark:text-forest-300 hover:border-emerald-400'
                    }`}
                  >
                    <span className="text-base">{cls.icon}</span>
                    <span className="text-[11px] leading-tight line-clamp-1">{cls.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nếu chọn Lớp Rừng Sinh Thái (10.000 m2 / NFT) -> Khối Kiểm Tra GPS & Phân Lô */}
          {selectedAssetClass === 'geo_forest_10000m2' && (() => {
            const forestSlug = selectedArticleSlug || plantPassportRegistryService.normalizeAssetKey(customPlantName || 'Rừng Tự Nhiên', '', 'geo_forest_10000m2');
            const totalM2 = forestSpec?.total_area_m2 || 1000000;
            const fStats = plantPassportRegistryService.getForestMintedAreaStats(forestSlug, totalM2);

            return (
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Xác Thực GPS Thực Địa Vùng Rừng (1 NFT = 10.000 m²)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                    1 ha/lô
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-xl bg-forest-950/60 border border-forest-800">
                    <span className="text-gray-400 block text-[10px]">Lô Tiếp Theo</span>
                    <span className="text-amber-300 font-bold">Lô #{fStats.nextLotNumber} / {fStats.maxSupply}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-forest-950/60 border border-forest-800">
                    <span className="text-gray-400 block text-[10px]">Đã Bảo Trợ</span>
                    <span className="text-emerald-300 font-bold">{(fStats.mintedM2 / 10000).toLocaleString('vi-VN')} ha</span>
                  </div>
                  <div className="p-2 rounded-xl bg-forest-950/60 border border-forest-800">
                    <span className="text-gray-400 block text-[10px]">Còn Lại</span>
                    <span className="text-teal-300 font-bold">{(fStats.remainingM2 / 10000).toLocaleString('vi-VN')} ha</span>
                  </div>
                  <div className="p-2 rounded-xl bg-forest-950/60 border border-forest-800">
                    <span className="text-gray-400 block text-[10px]">Bán Kính Rừng</span>
                    <span className="text-white font-bold">{forestSpec?.radius_km || 15} km</span>
                  </div>
                </div>

                {/* Trạng thái GPS check-in */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-emerald-900/40">
                  <div className="space-y-0.5">
                    {gpsCheckinStatus === 'verified' ? (
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Đã xác thực tọa độ trong vùng rừng (Cách tâm {gpsDistanceKm !== null ? `${gpsDistanceKm.toFixed(1)} km` : '< 15 km'}) • Thẻ thông hành 24h hiệu lực</span>
                      </div>
                    ) : gpsCheckinStatus === 'checking' ? (
                      <div className="flex items-center gap-1.5 text-amber-300 text-xs">
                        <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                        <span>Đang quét tọa độ GPS thiết bị...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-forest-300 text-xs">
                        <Compass className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Cần xác thực GPS bạn đang có mặt tại khu rừng để đúc NFT.</span>
                      </div>
                    )}
                    {gpsErrorMsg && (
                      <p className="text-[11px] text-rose-300 leading-tight">{gpsErrorMsg}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleGpsCheckin(false)}
                      disabled={gpsCheckinStatus === 'checking'}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition shadow-sm cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Định Vị GPS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGpsCheckin(true)}
                      className="px-2.5 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-amber-300 font-bold text-[11px] flex items-center gap-1 transition border border-forest-700 cursor-pointer"
                      title="Mô phỏng thiết bị đang trong khu rừng để kiểm thử"
                    >
                      <span>⚡ Mô Phỏng</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

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
                {isEn ? `Select ${currentNftConfig.shortName} to Certify:` : `1. Chọn mẫu ${currentNftConfig.shortName.toLowerCase()} muốn đăng ký:`}
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
                  {isEn ? currentNftConfig.studioNameLabelEn : currentNftConfig.studioNameLabelVi}
                </label>
                <input
                  type="text"
                  value={customPlantName}
                  onChange={(e) => setCustomPlantName(e.target.value)}
                  placeholder={
                    selectedAssetClass === 'geo_forest_10000m2'
                      ? (isEn ? 'e.g. Cuc Phuong National Park Plot #108' : 'VD: Vườn Quốc Gia Cúc Phương Lô #108, Rừng Cần Giờ...')
                      : selectedAssetClass === 'culinary_recipe'
                      ? (isEn ? 'e.g. Steamed Ginger & Húng Chanh Syrup' : 'VD: Siro Húng Chanh Gừng Đường Phèn, Trà Hoa Cúc Mật Ong...')
                      : selectedAssetClass === 'space_method'
                      ? (isEn ? 'e.g. Lightweight Balcony Vertical Trellis' : 'VD: Giàn Leo Sân Thượng Siêu Nhẹ, Vườn Ban Công Hướng Tây...')
                      : selectedAssetClass === 'eco_invention'
                      ? (isEn ? 'e.g. Self-watering Capillary Planter' : 'VD: Chậu Tự Tưới Bấc Thấm Tái Chế, Thùng Ủ Rác Hữu Cơ...')
                      : (isEn ? 'e.g. My 5-Petal Golden Apricot, Balcony Guava...' : 'VD: Cây Mai Vàng Cổ Thụ, Chậu Ôi Lùn Ban Công...')
                  }
                  className="w-full px-3.5 py-2.5 bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 rounded-xl text-xs text-forest-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-forest-400 dark:placeholder-forest-600"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-forest-700 dark:text-forest-300 block mb-1.5">
                  {isEn ? currentNftConfig.studioDetailLabelEn : currentNftConfig.studioDetailLabelVi}
                </label>
                <input
                  type="text"
                  value={customScientific}
                  onChange={(e) => setCustomScientific(e.target.value)}
                  placeholder={
                    selectedAssetClass === 'geo_forest_10000m2'
                      ? (isEn ? 'e.g. Lat: 20.3167, Lng: 105.6083' : 'VD: Phân khu bảo vệ nghiêm ngặt / 20.3167°N, 105.6083°E')
                      : selectedAssetClass === 'culinary_recipe'
                      ? (isEn ? 'e.g. Traditional Folk Formula' : 'VD: Bài thuốc gia truyền / Dược thiện bổ phế')
                      : selectedAssetClass === 'space_method'
                      ? (isEn ? 'e.g. Modular Architecture System' : 'VD: Hệ module thoát nước ban công / Khung chịu lực')
                      : selectedAssetClass === 'eco_invention'
                      ? (isEn ? 'e.g. Circular Upcycling Solution' : 'VD: Bấc thấm sợi thủy tinh / Tái chế bình HDPE')
                      : (isEn ? 'e.g. Ochna integerrima / Ba Vi Garden' : 'VD: Ochna integerrima / Vườn nhà Ba Vì')
                  }
                  className="w-full px-3.5 py-2.5 bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 rounded-xl text-xs text-forest-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-forest-400 dark:placeholder-forest-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-forest-700 dark:text-forest-300 block mb-1.5">
              {isEn ? 'Evolution Stage:' : '2. Giai đoạn sinh trưởng / tiến trình:'}
            </label>
            <select
              value={evolutionStage}
              onChange={(e) => setEvolutionStage(Number(e.target.value) as 1 | 2 | 3)}
              className="w-full px-3.5 py-2.5 bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 rounded-xl text-xs text-forest-950 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {(() => {
                const stages = getNftClassConfig(selectedAssetClass).evolutionStages;
                return (
                  <>
                    <option value={1}>1. {stages[0]}</option>
                    <option value={2}>2. {stages[1]}</option>
                    <option value={3}>3. {stages[2]}</option>
                  </>
                );
              })()}
            </select>
          </div>

          {/* Lựa chọn phương thức đúc: On-chain thật hay Ký số 0đ */}
          <div className="p-3 rounded-xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-forest-950 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>{isEn ? `Minting Method for ${currentNftConfig.shortName}:` : `Phương thức cấp ${currentNftConfig.certificateTitle}:`}</span>
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
                  <span>⛏️ Đúc On-chain Thật</span>
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
                  Mã nguồn contract có sẵn tại <span className="font-mono text-emerald-600 dark:text-emerald-300">contracts/PlantPassportNFT.sol</span>. Bạn có thể dán vào Remix, bấm Deploy bằng MetaMask với SepoliaETH, sau đó dán địa chỉ contract vào đây.
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
              <span className="font-bold block">{isEn ? `Strict Unique Verification (${currentNftConfig.nameEn}):` : `Bảo Vệ Độc Bản Tuyệt Đối (${currentNftConfig.nameVi}):`}</span>
              <span>{isEn ? `Each asset has only ONE unique digital certificate. Already minted assets are exclusively protected for your wallet.` : `Mỗi tài sản và ảnh gốc chỉ có DUY NHẤT một chứng nhận số trên yeutrongcay.com. Đã đúc sẽ được bảo hộ độc quyền cho bạn trong Hồ Sơ Cá Nhân; người khác sẽ bị chặn không thể đúc lại!`}</span>
            </div>
          </div>

          <button
            onClick={handleMintWithRealWallet}
            disabled={isMinting || !wallet?.isConnected}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md cursor-pointer ${
              isMinting || !wallet?.isConnected
                ? 'bg-gray-200 dark:bg-charcoal-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-300 dark:border-charcoal-700'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 active:scale-[0.99]'
            }`}
          >
            {isMinting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{mintMode === 'onchain' ? 'Đang gửi giao dịch lên blockchain...' : 'Đang đợi ví ký xác nhận...'}</span>
              </>
            ) : !wallet?.isConnected ? (
              <span>Vui lòng kết nối ví để {mintMode === 'onchain' ? 'Đúc NFT On-chain' : 'Ký Số Cấp Hộ Chiếu'}</span>
            ) : mintMode === 'onchain' ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{isEn ? `Mint Real On-chain ${currentNftConfig.shortName} NFT (0đ)` : `Đúc ${currentNftConfig.certificateTitle} On-Chain Thật (0đ)`}</span>
              </>
            ) : (
              <>
                <Award className="w-4 h-4" />
                <span>{isEn ? `Cryptographically Sign ${currentNftConfig.shortName} (0đ Gas)` : `Ký Số Mật Mã Cấp ${currentNftConfig.certificateTitle} (0đ Gas)`}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hiển thị Thẻ Hộ Chiếu Đã Đúc Thành Công */}
      {mintedPassport && (
        <div className="mt-6 pt-6 border-t border-forest-100 dark:border-forest-800 animate-in fade-in">
          <div className="p-4 sm:p-5 rounded-2xl bg-forest-50 dark:bg-forest-950 border border-emerald-500/40 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-4 h-4" />
                </span>
                <span className="text-sm font-bold text-forest-950 dark:text-white">
                  {mintedPassport.is_onchain ? 'Hộ Chiếu Cây NFT On-Chain Thật' : 'Hộ Chiếu Thực Vật Số Đã Ký Mật Mã'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
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
                    className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>Xem bài viết cây</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}

                <button
                  onClick={() => window.print()}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-forest-900 text-forest-700 dark:text-forest-200 border border-forest-200 dark:border-forest-700 hover:border-emerald-500 text-xs font-semibold flex items-center gap-1 transition"
                  title="In hoặc xuất PDF hộ chiếu này"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In / PDF</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4 rounded-xl overflow-hidden aspect-video bg-forest-100 dark:bg-charcoal-900 border border-forest-200 dark:border-forest-800">
                <img
                  src={mintedPassport.image_url}
                  alt={mintedPassport.plant_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-8 space-y-2 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-bold text-base text-forest-950 dark:text-white">
                    {mintedPassport.plant_name} ({mintedPassport.scientific_name})
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    Giai đoạn {mintedPassport.evolution_stage}/3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-forest-600 dark:text-gray-300">
                  <span>{isEn ? `${currentNftConfig.ownerRoleLabelEn}:` : `${currentNftConfig.ownerRoleLabelVi}:`} <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{mintedPassport.owner_address}</span></span>
                  <span>Sổ cái: <span className="text-forest-950 dark:text-white font-semibold">{mintedPassport.network}</span></span>
                  {mintedPassport.contract_address && (
                    <span>Contract: <span className="text-amber-700 dark:text-amber-300 font-mono">{mintedPassport.contract_address.slice(0, 8)}...</span></span>
                  )}
                  <span>Mã giao dịch: <span className="text-forest-950 dark:text-white font-mono">{mintedPassport.transaction_hash.slice(0, 10)}...</span></span>
                </div>

                <div className="pt-2 border-t border-forest-200 dark:border-forest-800 text-[10px] font-mono text-forest-500 dark:text-gray-400 space-y-1">
                  <div className="truncate">
                    SHA-256: <span className="text-emerald-700 dark:text-emerald-300">{mintedPassport.image_sha256}</span>
                  </div>
                  {mintSignature && (
                    <div className="truncate">
                      Chữ ký EIP-191: <span className="text-amber-700 dark:text-amber-300">{mintSignature}</span>
                    </div>
                  )}
                  
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

                {/* Nút Đốt Bỏ & Tái Sinh */}
                {wallet?.isConnected && wallet.address.toLowerCase() === mintedPassport.owner_address.toLowerCase() && (
                  <div className="pt-3 mt-3 border-t border-forest-100 dark:border-forest-800 flex items-center justify-between flex-wrap gap-2">
                    <div className="text-[11px] text-forest-500">
                      {isEn
                        ? 'Don\'t like the current photo? As the verified owner, you can burn this NFT to release the exclusivity lock and re-mint with a better photo.'
                        : 'Không ưng ý ảnh hiện tại? Là chủ sở hữu độc quyền, bạn có quyền đốt bỏ NFT này để giải phóng khóa độc bản và đúc lại ảnh mới.'}
                    </div>
                    <button
                      onClick={() => handleOpenBurnModal(mintedPassport)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/80 border border-rose-300 dark:border-rose-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Flame className="w-3.5 h-3.5 text-rose-600" />
                      <span>{isEn ? 'Burn & Re-mint with New Photo' : '🔥 Đốt Bỏ & Tái Sinh Ảnh Mới'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phòng trưng bày Hộ Chiếu của Ví đã kết nối */}
      <Web3OwnedPassportsSection
        isEn={isEn}
        wallet={wallet}
        ownedPassports={ownedPassports}
        handleOpenBurnModal={handleOpenBurnModal}
      />
    </div>
  );
};
