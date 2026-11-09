import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Check,
  RefreshCw,
  FileCheck2,
  Droplets,
  Wallet,
  LogOut,
  Copy,
  AlertCircle,
  Sparkles,
  BookOpen,
  Coins,
  ChevronDown,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useWallet } from '../context/WalletContext.tsx';
import { useKarma } from '../context/KarmaContext.tsx';
import { web3WalletService } from '../services/web3WalletService.ts';
import { awardKarmaPoints } from '../services/karmaService.ts';
import { plantPassportRegistryService, RegisteredPlantPassport } from '../services/plantPassportRegistryService.ts';
import { BurnPassportModal } from './BurnPassportModal.tsx';
import {
  Web3LearnTab,
  Web3FaucetTab,
  Web3MintStudioTab,
  Web3EscrowTab,
  Web3DeFiTab
} from './web3';
import { Web3TestnetPassport } from '../types/index.ts';

// 5 Phân khu học tập Web3 & DeFi Testnet
export const LEARNING_TABS = [
  {
    id: 'learn' as const,
    num: '1',
    nameVi: '1. Vỡ Lòng Web3 Trong 3 Phút',
    nameEn: '1. Web3 101 for Gardeners',
    shortVi: 'Vỡ Lòng Web3',
    shortEn: 'Web3 101',
    descVi: 'Khái niệm ví cá nhân, mã băm SHA-256 và vì sao 100% Testnet an toàn tuyệt đối',
    descEn: 'Core concepts: wallets, SHA-256 hashing & why 100% Testnet is risk-free',
    icon: BookOpen,
    badgeVi: 'Học 3 Phút',
    badgeEn: '3-min Read',
  },
  {
    id: 'faucet' as const,
    num: '2',
    nameVi: '2. Trạm Cấp Coin Testnet Đa Mạng',
    nameEn: '2. Multi-Chain Testnet Faucets',
    shortVi: 'Lấy Coin Testnet',
    shortEn: 'Testnet Faucets',
    descVi: 'Nhận SepoliaETH, BaseETH, tBNB, MATIC miễn phí 0đ từ Google Cloud, Coinbase',
    descEn: 'Get free daily testnet coins across Sepolia, Base, BNB Chain & Polygon',
    icon: Droplets,
    badgeVi: '+10 Trái Tim ❤️',
    badgeEn: '+10 Hearts ❤️',
  },
  {
    id: 'mint' as const,
    num: '3',
    nameVi: '3. Ký Số & Đúc Hộ Chiếu Cây',
    nameEn: '3. Mint Plant Passport (Dynamic NFT)',
    shortVi: 'Đúc Hộ Chiếu Cây',
    shortEn: 'Mint Passport',
    descVi: 'Ký số cá nhân với ví thật để tạo căn cước số cho cây & tiến hóa sinh trưởng',
    descEn: 'Sign with your real wallet to issue a tamper-proof passport & record growth',
    icon: Award,
    badgeVi: '+25 Trái Tim ❤️',
    badgeEn: '+25 Hearts ❤️',
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
    badgeVi: '+15 Trái Tim ❤️',
    badgeEn: '+15 Hearts ❤️',
  },
  {
    id: 'defi' as const,
    num: '5',
    nameVi: '5. DeFi Nông Nghiệp & Staking Hạt Giống',
    nameEn: '5. Agri-DeFi & Seed Staking Vault',
    shortVi: 'Agri-DeFi Sandbox',
    shortEn: 'Agri-DeFi',
    descVi: 'Mô phỏng Staking kho hạt giống nhận phân bón sinh học & Tín chỉ Carbon rừng',
    descEn: 'Simulated seed staking yield vault, organic bio-fertilizer APY & Carbon ReFi',
    icon: Coins,
    badgeVi: '+20 Trái Tim ❤️',
    badgeEn: '+20 Hearts ❤️',
  }
];

export const Web3SandboxSection: React.FC = () => {
  const { isEn } = useLanguage();
  const [searchParams] = useSearchParams();
  const mintSlugParam = searchParams.get('mint');

  // Lấy trạng thái ví & karma từ Context Store dùng chung
  const {
    wallet,
    setWallet,
    isConnecting,
    walletError,
    setWalletError,
    connectWallet: handleConnectWallet,
    disconnectWallet: handleDisconnect,
    switchNetwork: handleSwitchNetwork,
    toggleNetwork: handleToggleNetwork,
    switchToSpecificNetwork: handleSwitchToSpecificNetwork,
    refreshBalance: handleRefreshBalance,
    hasInstalledWallet
  } = useWallet();

  const { karmaState, rewardNotice, setRewardNotice } = useKarma();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'mint' | 'faucet' | 'escrow' | 'defi'>(() =>
    mintSlugParam ? 'mint' : 'learn'
  );
  const [isMobileTabDrawerOpen, setIsMobileTabDrawerOpen] = useState(false);

  // Trạng thái DeFi Nông Nghiệp & Staking Hạt Giống On-chain Thật (100% Testnet Sandbox)
  const [stakeAmount, setStakeAmount] = useState<number>(100);
  const [stakedBalance, setStakedBalance] = useState<number>(() => {
    const saved = localStorage.getItem('ytc_testnet_staked_seeds');
    return saved ? Number(saved) : 100;
  });
  const [accumulatedYield, setAccumulatedYield] = useState<number>(() => {
    const saved = localStorage.getItem('ytc_testnet_yield');
    return saved ? Number(saved) : 2.5;
  });
  const [isStakingRunning, setIsStakingRunning] = useState(false);
  const [stakingNotice, setStakingNotice] = useState<string | null>(null);
  const [daoVoteChoice, setDaoVoteChoice] = useState<'yes' | 'no' | null>(() => {
    return (localStorage.getItem('ytc_testnet_dao_voted') as 'yes' | 'no') || null;
  });
  const [daoYesCount, setDaoYesCount] = useState<number>(142);
  const [daoNoCount, setDaoNoCount] = useState<number>(18);
  const [carbonOffsetCount, setCarbonOffsetCount] = useState<number>(() => {
    const saved = localStorage.getItem('ytc_carbon_offset_count');
    return saved ? Number(saved) : 0;
  });
  const [isCarbonRetiring, setIsCarbonRetiring] = useState(false);
  const [isDaoVoting, setIsDaoVoting] = useState(false);
  const [latestDeFiTx, setLatestDeFiTx] = useState<{
    hash: string;
    type: 'stake' | 'claim' | 'carbon' | 'vote';
    title: string;
    chainId: string;
    timestamp: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('ytc_latest_defi_tx');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Trạng thái Modal Đốt Bỏ & Tái Sinh Hộ Chiếu Thực Vật Số (Burn-to-Reincarnate)
  const [isBurnModalOpen, setIsBurnModalOpen] = useState(false);
  const [passportToBurn, setPassportToBurn] = useState<RegisteredPlantPassport | null>(null);
  const [reincarnationNotice, setReincarnationNotice] = useState<string | null>(null);

  // Danh sách Hộ Chiếu Cây thuộc sở hữu của ví đang kết nối
  const [ownedPassports, setOwnedPassports] = useState<RegisteredPlantPassport[]>([]);

  const loadOwnedPassports = useCallback(() => {
    if (wallet?.address) {
      const list = plantPassportRegistryService.getUserVerifiedGallery(wallet.address);
      setOwnedPassports(list);
    } else {
      setOwnedPassports([]);
    }
  }, [wallet?.address]);

  useEffect(() => {
    loadOwnedPassports();
    const handleUpdate = () => loadOwnedPassports();
    window.addEventListener('ytc_passport_registry_updated', handleUpdate);
    window.addEventListener('ytc_passport_transferred', handleUpdate);
    window.addEventListener('ytc_passport_burned', handleUpdate);
    return () => {
      window.removeEventListener('ytc_passport_registry_updated', handleUpdate);
      window.removeEventListener('ytc_passport_transferred', handleUpdate);
      window.removeEventListener('ytc_passport_burned', handleUpdate);
    };
  }, [loadOwnedPassports]);

  const handleOpenBurnModal = (passport: Web3TestnetPassport | RegisteredPlantPassport) => {
    const allRegs = plantPassportRegistryService.getAllRegistrations();
    const cleanId = passport.token_id.replace('#', '').trim();
    const found = allRegs.find(p => p.token_id === cleanId || p.plant_name === passport.plant_name);

    const target: RegisteredPlantPassport = found || {
      id: `passport-${cleanId}`,
      token_id: cleanId,
      plant_name: passport.plant_name,
      scientific_name: passport.scientific_name,
      plant_key: '',
      image_url: passport.image_url,
      image_sha256: passport.image_sha256,
      owner_address: passport.owner_address,
      creator_wallet: passport.owner_address,
      network: passport.network,
      evolution_stage: passport.evolution_stage as 1 | 2 | 3,
      transaction_hash: passport.transaction_hash,
      contract_address: passport.contract_address || '',
      minted_at: passport.minted_at,
      is_onchain: !!passport.is_onchain,
      status: 'ACTIVE_ORIGINAL' as const
    };

    setPassportToBurn(target);
    setIsBurnModalOpen(true);
  };

  const handleBurnSuccess = (burnedPassport: RegisteredPlantPassport, txHash: string) => {
    setIsBurnModalOpen(false);
    setPassportToBurn(null);
    loadOwnedPassports();
    setActiveTab('mint');
    setReincarnationNotice(
      isEn
        ? `Passport #${burnedPassport.token_id} was successfully burned on-chain (Tx: ${txHash.slice(0, 10)}...)! The exclusivity lock is released with a 24h exclusive priority for your wallet. Upload a new photo and re-mint now!`
        : `Hộ Chiếu #${burnedPassport.token_id} đã được hóa vàng on-chain thành công (Tx: ${txHash.slice(0, 10)}...)! Khóa độc bản được giải phóng và ưu tiên riêng cho ví của bạn trong 24 giờ tới. Hãy tải ảnh mới và đúc lại ngay bây giờ!`
    );
    window.dispatchEvent(
      new CustomEvent('ytc_passport_reincarnate_ready', {
        detail: {
          plantName: burnedPassport.plant_name,
          scientificName: burnedPassport.scientific_name,
          tokenId: burnedPassport.token_id,
          txHash: txHash
        }
      })
    );
  };

  // Trạng thái Escrow Simulator
  const [escrowStep, setEscrowStep] = useState<1 | 2 | 3>(1);
  const [isEscrowSimulating, setIsEscrowSimulating] = useState(false);

  const [hasClaimedFaucetReward, setHasClaimedFaucetReward] = useState(false);

  // Sao chép địa chỉ ví thật
  const handleCopyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

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
          title: isEn ? 'Testnet Explorer Reward (+10 Hearts ❤️)' : 'Thưởng Khám Phá Faucet Testnet (+10 Trái Tim ❤️)',
          desc: isEn
            ? 'You learned how to copy your address to request 0đ Testnet ETH from faucets!'
            : 'Bạn vừa học cách sao chép địa chỉ ví để nhận ETH Testnet 0đ từ các vòi Faucet quốc tế!'
        });
      }
    }
  };

  // 1. GỬI HẠT GIỐNG VÀO STAKING ON-CHAIN THẬT
  const handleStakeSeeds = async () => {
    if (stakeAmount <= 0) return;
    setWalletError(null);

    if (!wallet || !wallet.isConnected) {
      setWalletError(
        isEn
          ? 'Please connect your real Web3 wallet (MetaMask / Rabby) to execute on-chain Staking on Testnet!'
          : 'Vui lòng kết nối ví Web3 thật (MetaMask / Rabby) để gửi Staking on-chain trên Testnet!'
      );
      return;
    }

    if (wallet.isMainnetDanger || !wallet.isCorrectNetwork) {
      setWalletError(
        isEn
          ? 'For safety, please switch your wallet to a supported Testnet (Base Sepolia / Sepolia / BNB Testnet)!'
          : 'Vì an toàn tài sản, vui lòng chuyển ví sang mạng Testnet (Base Sepolia / Sepolia / BNB Testnet)!'
      );
      return;
    }

    setIsStakingRunning(true);
    setStakingNotice(null);

    try {
      const realTxHash = await web3WalletService.stakeSeedsOnChain(
        stakeAmount,
        wallet.address as `0x${string}`,
        wallet.chainId
      );

      const nextStaked = stakedBalance + stakeAmount;
      setStakedBalance(nextStaked);
      localStorage.setItem('ytc_testnet_staked_seeds', String(nextStaked));

      const txRecord = {
        hash: realTxHash,
        type: 'stake' as const,
        title: isEn ? `Staked ${stakeAmount} Heirloom Seeds` : `Đã gửi ${stakeAmount} Hạt Giống Bản Địa`,
        chainId: wallet.chainId,
        timestamp: new Date().toLocaleTimeString('vi-VN')
      };
      setLatestDeFiTx(txRecord);
      localStorage.setItem('ytc_latest_defi_tx', JSON.stringify(txRecord));

      setStakingNotice(
        isEn
          ? `Successfully staked ${stakeAmount} Seeds on-chain! Tx: ${realTxHash.slice(0, 10)}...`
          : `Đã gửi thành công ${stakeAmount} hạt giống vào Staking Vault on-chain! Tx: ${realTxHash.slice(0, 10)}...`
      );

      awardKarmaPoints(
        20,
        `Gửi Staking ${stakeAmount} hạt giống On-chain trên ${wallet.networkName}`,
        `Staked ${stakeAmount} seeds on-chain on ${wallet.networkName}`,
        { isTestnet: true, isEn, txHash: realTxHash }
      );
      setRewardNotice({
        points: 20,
        title: isEn ? 'On-chain Staking Reward (+20 Hearts ❤️)' : 'Thưởng Gửi Staking On-chain (+20 Trái Tim ❤️)',
        desc: isEn
          ? `Smart contract transaction confirmed on ${wallet.networkName}! Tx: ${realTxHash.slice(0, 10)}...`
          : `Giao dịch Smart contract đã ghi nhận thành công trên ${wallet.networkName}! Tx: ${realTxHash.slice(0, 10)}...`
      });
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || (isEn ? 'On-chain Staking transaction rejected or failed' : 'Giao dịch Staking on-chain bị từ chối hoặc thất bại'));
    } finally {
      setIsStakingRunning(false);
    }
  };

  // 2. THU HOẠCH PHÂN BÓN SINH HỌC (HARVEST YIELD) ON-CHAIN THẬT
  const handleClaimYield = async () => {
    if (accumulatedYield <= 0) return;
    setWalletError(null);

    if (!wallet || !wallet.isConnected) {
      setWalletError(isEn ? 'Please connect your Web3 wallet first!' : 'Vui lòng kết nối ví Web3 để thu hoạch!');
      return;
    }

    if (wallet.isMainnetDanger || !wallet.isCorrectNetwork) {
      setWalletError(isEn ? 'Please switch to a supported Testnet!' : 'Vui lòng chuyển sang mạng Testnet để thu hoạch 0đ!');
      return;
    }

    setIsStakingRunning(true);
    try {
      const realTxHash = await web3WalletService.claimFertilizerOnChain(
        wallet.address as `0x${string}`,
        wallet.chainId
      );

      const claimed = accumulatedYield;
      setAccumulatedYield(0);
      localStorage.setItem('ytc_testnet_yield', '0');

      const txRecord = {
        hash: realTxHash,
        type: 'claim' as const,
        title: isEn ? `Harvested ${claimed.toFixed(2)} Bio-fertilizer units` : `Thu hoạch ${claimed.toFixed(2)} đơn vị Phân Bón Vi Sinh`,
        chainId: wallet.chainId,
        timestamp: new Date().toLocaleTimeString('vi-VN')
      };
      setLatestDeFiTx(txRecord);
      localStorage.setItem('ytc_latest_defi_tx', JSON.stringify(txRecord));

      setStakingNotice(
        isEn
          ? `Harvested ${claimed.toFixed(2)} Bio-Fertilizer units on-chain! Tx: ${realTxHash.slice(0, 10)}...`
          : `Đã thu hoạch on-chain ${claimed.toFixed(2)} đơn vị Phân Bón Vi Sinh! Tx: ${realTxHash.slice(0, 10)}...`
      );

      awardKarmaPoints(
        15,
        `Thu hoạch lãi suất Staking on-chain trên ${wallet.networkName}`,
        `Harvested Bio-fertilizer yield on-chain on ${wallet.networkName}`,
        { isTestnet: true, isEn, txHash: realTxHash }
      );
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || (isEn ? 'Harvest transaction rejected or failed' : 'Giao dịch thu hoạch on-chain bị từ chối'));
    } finally {
      setIsStakingRunning(false);
    }
  };

  // 3. ĐÚC & BÙ TRỪ TÍN CHỈ CARBON RỪNG (REFI) ON-CHAIN THẬT
  const handleOffsetCarbonOnChain = async (forestLotId: string, hectares: number) => {
    setWalletError(null);
    if (!wallet || !wallet.isConnected) {
      setWalletError(isEn ? 'Please connect your Web3 wallet to retire carbon offsets!' : 'Vui lòng kết nối ví Web3 để bù trừ tín chỉ carbon on-chain!');
      return;
    }
    if (wallet.isMainnetDanger || !wallet.isCorrectNetwork) {
      setWalletError(isEn ? 'Please switch to Testnet before retiring offsets!' : 'Vui lòng chuyển sang Testnet trước khi bù trừ carbon!');
      return;
    }

    setIsCarbonRetiring(true);
    try {
      const realTxHash = await web3WalletService.offsetCarbonOnChain({
        forestLotId,
        hectares,
        userAddress: wallet.address as `0x${string}`,
        chainId: wallet.chainId
      });

      const nextCount = carbonOffsetCount + (hectares * 15);
      setCarbonOffsetCount(nextCount);
      localStorage.setItem('ytc_carbon_offset_count', String(nextCount));

      const txRecord = {
        hash: realTxHash,
        type: 'carbon' as const,
        title: isEn ? `Retired ${hectares * 15} Tons CO2 for ${forestLotId}` : `Bù trừ ${hectares * 15} Tấn CO2 cho ${forestLotId}`,
        chainId: wallet.chainId,
        timestamp: new Date().toLocaleTimeString('vi-VN')
      };
      setLatestDeFiTx(txRecord);
      localStorage.setItem('ytc_latest_defi_tx', JSON.stringify(txRecord));

      awardKarmaPoints(
        25,
        `Bù trừ ${hectares * 15} tấn CO2 On-chain qua bảo tồn rừng ${forestLotId}`,
        `Retired ${hectares * 15} tons CO2 on-chain via ${forestLotId} forest conservation`,
        { isTestnet: true, isEn, txHash: realTxHash }
      );
      setRewardNotice({
        points: 25,
        title: isEn ? 'On-chain Carbon Offset Retired! (+25 Hearts ❤️)' : 'Bù Trừ Carbon Rừng On-chain! (+25 Trái Tim ❤️)',
        desc: isEn
          ? `Smart contract burned testnet carbon credits! Tx: ${realTxHash.slice(0, 10)}...`
          : `Giao dịch Smart contract đã thiêu hủy chứng chỉ carbon bảo vệ rừng! Tx: ${realTxHash.slice(0, 10)}...`
      });
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || (isEn ? 'Carbon offset transaction rejected' : 'Giao dịch bù trừ carbon on-chain bị từ chối'));
    } finally {
      setIsCarbonRetiring(false);
    }
  };

  // 4. BỎ PHIẾU QUẢN TRỊ DAO NÔNG NGHIỆP ON-CHAIN THẬT
  const handleVoteDao = async (choice: 'yes' | 'no') => {
    setWalletError(null);
    if (!wallet || !wallet.isConnected) {
      setWalletError(isEn ? 'Please connect your Web3 wallet to vote in DAO!' : 'Vui lòng kết nối ví Web3 để bỏ phiếu DAO!');
      return;
    }
    if (wallet.isMainnetDanger || !wallet.isCorrectNetwork) {
      setWalletError(isEn ? 'Please switch to Testnet before voting!' : 'Vui lòng chuyển sang Testnet trước khi bỏ phiếu!');
      return;
    }

    setIsDaoVoting(true);
    try {
      const realTxHash = await web3WalletService.castDaoVoteOnChain({
        proposalId: 1,
        support: choice === 'yes' ? 1 : 0,
        userAddress: wallet.address as `0x${string}`,
        chainId: wallet.chainId
      });

      setDaoVoteChoice(choice);
      localStorage.setItem('ytc_testnet_dao_voted', choice);
      if (choice === 'yes') {
        setDaoYesCount(prev => prev + 1);
      } else {
        setDaoNoCount(prev => prev + 1);
      }

      const txRecord = {
        hash: realTxHash,
        type: 'vote' as const,
        title: isEn ? `Cast vote [${choice.toUpperCase()}] on Proposal #4` : `Đã bỏ phiếu [${choice === 'yes' ? 'TÁN THÀNH' : 'PHẢN ĐỐI'}] Đề xuất #4`,
        chainId: wallet.chainId,
        timestamp: new Date().toLocaleTimeString('vi-VN')
      };
      setLatestDeFiTx(txRecord);
      localStorage.setItem('ytc_latest_defi_tx', JSON.stringify(txRecord));

      awardKarmaPoints(
        20,
        `Bỏ phiếu DAO On-chain cho đề xuất bảo tồn ngân hàng hạt giống`,
        `Voted on-chain on Seed Bank conservation proposal #4`,
        { isTestnet: true, isEn, txHash: realTxHash }
      );
      setRewardNotice({
        points: 20,
        title: isEn ? 'On-chain DAO Vote Recorded! (+20 Hearts ❤️)' : 'Phiếu Bầu DAO On-chain Đã Ghi Nhận! (+20 Trái Tim ❤️)',
        desc: isEn
          ? `Your vote was recorded on the testnet blockchain! Tx: ${realTxHash.slice(0, 10)}...`
          : `Lá phiếu của bạn đã được ghi nhận trên blockchain testnet! Tx: ${realTxHash.slice(0, 10)}...`
      });
    } catch (err: unknown) {
      const e = err as { message?: string };
      setWalletError(e.message || (isEn ? 'DAO vote transaction rejected' : 'Giao dịch bỏ phiếu DAO on-chain bị từ chối'));
    } finally {
      setIsDaoVoting(false);
    }
  };

  const handleRunEscrowStep = () => {
    if (escrowStep < 3) {
      setIsEscrowSimulating(true);
      setTimeout(() => {
        setIsEscrowSimulating(false);
        const nextStep = (escrowStep + 1) as 1 | 2 | 3;
        setEscrowStep(nextStep);

        if (nextStep === 3) {
          awardKarmaPoints(
            15,
            'Nghiệm thu thành công hợp đồng Escrow chia sẻ giống cây (Mạng Thử Nghiệm 0đ)',
            'Completed Escrow Plant Delivery Inspection (Testnet 0đ)',
            { isTestnet: true, isEn }
          );
          setRewardNotice({
            points: 15,
            title: isEn ? 'Escrow Delivery Inspection Reward (+15 Hearts ❤️)' : 'Thưởng Nghiệm Thu Escrow Hợp Đồng (+15 Trái Tim ❤️)',
            desc: isEn
              ? 'The receiver confirmed the plant is healthy, testnet deposit returned, and hearts rewarded!'
              : 'Bên nhận đã xác nhận cây xanh tốt, tiền cọc thử nghiệm được hoàn trả và bạn được cộng +15 Trái Tim Yêu Vườn ❤️!'
          });
        }
      }, 1000);
    } else {
      setEscrowStep(1);
    }
  };

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

          {/* Right: Trạng thái Kết nối Ví Thật & Điểm Trái Tim Yêu Vườn */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Badge Trái Tim Yêu Cây */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-forest-50 dark:bg-forest-950/90 border border-rose-500/40 text-xs shadow-sm">
              <span className="text-base leading-none">{karmaState.badge.icon || '❤️'}</span>
              <div>
                <span className="text-[10px] text-rose-800 dark:text-rose-200/80 font-medium block leading-none">
                  {isEn ? 'Garden Hearts' : 'Trái Tim Yêu Vườn'}
                </span>
                <span className="font-bold text-rose-600 dark:text-rose-400 font-mono text-xs leading-none">
                  +{karmaState.total_karma} ❤️
                </span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-rose-400/20 text-rose-800 dark:text-rose-300 font-semibold border border-rose-400/40 shrink-0">
                Testnet 0đ
              </span>
            </div>

            {/* Trạng thái Ví Thật */}
            {wallet?.isConnected ? (
              <div className="flex items-center gap-2 flex-wrap">
                {wallet.isMainnetDanger && (
                  <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-1.5 animate-pulse">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span className="font-bold">{isEn ? 'MAINNET DANGER!' : 'CẢNH BÁO TIỀN THẬT!'}</span>
                    <button
                      onClick={handleSwitchNetwork}
                      className="ml-1 px-2 py-0.5 rounded-lg bg-rose-600 text-white font-bold text-[10px] hover:bg-rose-500"
                    >
                      {isEn ? 'Switch to Testnet' : 'Chuyển Sang Testnet 0đ'}
                    </button>
                  </div>
                )}

                <div className="px-3 py-1.5 rounded-xl bg-forest-50 dark:bg-forest-950 border border-forest-200 dark:border-forest-800 flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </span>
                  <button
                    onClick={handleCopyAddress}
                    className="text-forest-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer"
                    title={isEn ? 'Copy full address' : 'Sao chép địa chỉ ví'}
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs">
                  <span>{wallet.balanceEth} ETH</span>
                  <button
                    onClick={handleRefreshBalance}
                    className="text-emerald-600 dark:text-emerald-400 hover:rotate-180 transition duration-300 cursor-pointer"
                    title={isEn ? 'Refresh balance' : 'Làm mới số dư'}
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleToggleNetwork}
                    className="px-2.5 py-1.5 rounded-xl bg-forest-100 dark:bg-forest-900 hover:bg-emerald-100 dark:hover:bg-forest-800 text-forest-800 dark:text-emerald-300 border border-forest-200 dark:border-forest-700 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                    title={isEn ? 'Switch between Sepolia and Base Sepolia' : 'Bấm để đổi nhanh giữa Sepolia và Base Sepolia'}
                  >
                    <span>{wallet.networkName}</span>
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  </button>

                  <button
                    onClick={handleDisconnect}
                    className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-900 transition cursor-pointer"
                    title={isEn ? 'Disconnect wallet' : 'Ngắt kết nối ví'}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-forest-800 hover:from-emerald-500 hover:to-forest-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-900/20 active:scale-95 transition cursor-pointer"
              >
                <Wallet className="w-4 h-4" />
                <span>
                  {isConnecting
                    ? (isEn ? 'Connecting Wallet...' : 'Đang Kết Nối...')
                    : hasInstalledWallet
                    ? (isEn ? 'Connect Real Wallet (0đ)' : 'Kết Nối Ví Web3 Thật (0đ)')
                    : (isEn ? 'Connect Wallet' : 'Kết Nối Ví Thật')}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Thông báo thưởng Karma */}
        {rewardNotice && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 dark:from-rose-950/60 dark:via-charcoal-900 dark:to-emerald-950/60 border border-rose-300/60 dark:border-rose-800/60 text-xs flex items-center justify-between gap-3 shadow-md animate-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <span className="text-xl animate-bounce">❤️</span>
              <div>
                <span className="font-bold text-rose-800 dark:text-rose-300 block">{rewardNotice.title}</span>
                <span className="text-forest-700 dark:text-gray-300 text-[11px]">{rewardNotice.desc}</span>
              </div>
            </div>
            <button
              onClick={() => setRewardNotice(null)}
              className="text-forest-400 hover:text-forest-900 dark:hover:text-white font-bold p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Thông báo lỗi nếu có */}
        {walletError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-200 flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
              <span>{walletError}</span>
            </div>
            <button onClick={() => setWalletError(null)} className="font-bold text-rose-700 dark:text-rose-300 hover:underline">
              ✕
            </button>
          </div>
        )}

        {/* Thanh chuyển đổi mạng nhanh khi kết nối sai mạng */}
        {wallet?.isConnected && (!wallet.isCorrectNetwork || wallet.isMainnetDanger) && (
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-amber-950 dark:text-amber-200">
                {isEn
                  ? 'Your wallet is not on a supported Testnet. Click to switch to a recommended network (0đ):'
                  : 'Ví của bạn chưa ở đúng mạng Testnet. Bấm chọn mạng khuyến nghị bên dưới để chuyển tự động (0đ):'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => handleSwitchToSpecificNetwork('0x14a34')}
                className="px-2.5 py-1 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition shadow-xs cursor-pointer"
              >
                Base Sepolia
              </button>
              <button
                onClick={() => handleSwitchToSpecificNetwork('0xaa36a7')}
                className="px-2.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] transition shadow-xs cursor-pointer"
              >
                Sepolia ETH
              </button>
              <button
                onClick={() => handleSwitchToSpecificNetwork('0x61')}
                className="px-2.5 py-1 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] transition shadow-xs cursor-pointer"
              >
                BNB Testnet
              </button>
              <button
                onClick={() => handleSwitchToSpecificNetwork('0x13882')}
                className="px-2.5 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition shadow-xs cursor-pointer"
              >
                Polygon Amoy
              </button>
            </div>
          </div>
        )}

        {/* 2. Thanh Chuyển Tab Học Tập & Thực Hành Web3 (Tabs Navigation Bar) */}
        <div className="relative z-20">
          {/* Mobile Drawer Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileTabDrawerOpen(!isMobileTabDrawerOpen)}
              className="w-full flex items-center justify-between p-3.5 bg-white dark:bg-charcoal-900 rounded-2xl border border-forest-200 dark:border-forest-800 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                {(() => {
                  const curr = LEARNING_TABS.find(t => t.id === activeTab) || LEARNING_TABS[0];
                  const Icon = curr.icon;
                  return (
                    <>
                      <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs text-forest-950 dark:text-white">
                        {isEn ? curr.nameEn : curr.nameVi}
                      </span>
                    </>
                  );
                })()}
              </div>
              <ChevronDown className={`w-4 h-4 text-forest-500 transition-transform ${isMobileTabDrawerOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMobileTabDrawerOpen && (
              <div className="mt-2 p-2 bg-white dark:bg-charcoal-900 rounded-2xl border border-forest-200 dark:border-forest-800 shadow-xl space-y-1">
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
                      className={`w-full text-left p-3 rounded-xl flex items-center justify-between text-xs transition cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'text-forest-700 dark:text-gray-300 hover:bg-forest-50 dark:hover:bg-charcoal-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{isEn ? tab.nameEn : tab.nameVi}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isCurrent ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold'
                      }`}>
                        {isEn ? tab.badgeEn : tab.badgeVi}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Desktop Tab Switcher */}
          <div className="hidden md:grid grid-cols-5 gap-2 p-1.5 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md rounded-2xl border border-forest-100 dark:border-forest-800 shadow-sm">
            {LEARNING_TABS.map((tab) => {
              const Icon = tab.icon;
              const isCurrent = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3 rounded-xl transition text-left relative flex flex-col justify-between gap-1 cursor-pointer group ${
                    isCurrent
                      ? 'bg-gradient-to-br from-emerald-600 to-forest-800 text-white shadow-md'
                      : 'hover:bg-forest-50 dark:hover:bg-charcoal-800 text-forest-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${
                        isCurrent ? 'bg-white/20 text-white' : 'bg-forest-100 dark:bg-charcoal-700 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs line-clamp-1">{isEn ? tab.shortEn : tab.shortVi}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full mt-1">
                    <span className={`text-[10px] line-clamp-1 ${isCurrent ? 'text-emerald-100' : 'text-forest-500 dark:text-gray-400'}`}>
                      {isEn ? tab.descEn : tab.descVi}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md shrink-0 font-bold ${
                      isCurrent ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    }`}>
                      {isEn ? tab.badgeEn : tab.badgeVi}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: VỠ LÒNG WEB3 TRONG 3 PHÚT */}
        {/* ============================================================== */}
        {activeTab === 'learn' && <Web3LearnTab isEn={isEn} />}

        {/* ============================================================== */}
        {/* TAB 2: TRẠM CẤP COIN TESTNET ĐA MẠNG (MULTI-CHAIN FAUCETS) */}
        {/* ============================================================== */}
        {activeTab === 'faucet' && (
          <Web3FaucetTab
            isEn={isEn}
            wallet={wallet}
            copied={copied}
            handleCopyAddress={handleCopyAddress}
          />
        )}

        {/* ============================================================== */}
        {/* TAB 3: XƯỞNG ĐÚC HỘ CHIẾU & KÝ SỐ MẬT MÃ HỌC */}
        {/* ============================================================== */}
        {activeTab === 'mint' && (
          <Web3MintStudioTab
            isEn={isEn}
            wallet={wallet}
            setWallet={setWallet}
            walletError={walletError}
            setWalletError={setWalletError}
            mintSlugParam={mintSlugParam}
            reincarnationNotice={reincarnationNotice}
            setReincarnationNotice={setReincarnationNotice}
            ownedPassports={ownedPassports}
            handleOpenBurnModal={handleOpenBurnModal}
            setRewardNotice={setRewardNotice}
          />
        )}

        {/* ============================================================== */}
        {/* TAB 4: MÔ PHỎNG SMART CONTRACT ESCROW ĐỔI CÂY AN TOÀN */}
        {/* ============================================================== */}
        {activeTab === 'escrow' && (
          <Web3EscrowTab
            isEn={isEn}
            escrowStep={escrowStep}
            isEscrowSimulating={isEscrowSimulating}
            handleRunEscrowStep={handleRunEscrowStep}
          />
        )}

        {/* ============================================================== */}
        {/* TAB 5: DEFI NÔNG NGHIỆP SINH THÁI & STAKING HẠT GIỐNG (100% TESTNET ON-CHAIN) */}
        {/* ============================================================== */}
        {activeTab === 'defi' && (
          <Web3DeFiTab
            isEn={isEn}
            wallet={wallet}
            handleConnectWallet={handleConnectWallet}
            latestDeFiTx={latestDeFiTx}
            stakingNotice={stakingNotice}
            setStakingNotice={setStakingNotice}
            stakedBalance={stakedBalance}
            accumulatedYield={accumulatedYield}
            stakeAmount={stakeAmount}
            setStakeAmount={setStakeAmount}
            handleStakeSeeds={handleStakeSeeds}
            handleClaimYield={handleClaimYield}
            isStakingRunning={isStakingRunning}
            carbonOffsetCount={carbonOffsetCount}
            handleOffsetCarbonOnChain={handleOffsetCarbonOnChain}
            isCarbonRetiring={isCarbonRetiring}
            daoYesCount={daoYesCount}
            daoNoCount={daoNoCount}
            daoVoteChoice={daoVoteChoice}
            isDaoVoting={isDaoVoting}
            handleVoteDao={handleVoteDao}
          />
        )}
      </div>

      {/* Modal Đốt Bỏ & Tái Sinh Hộ Chiếu Thực Vật Số (Burn-to-Reincarnate) */}
      <BurnPassportModal
        isOpen={isBurnModalOpen}
        onClose={() => setIsBurnModalOpen(false)}
        passport={passportToBurn}
        connectedWalletAddress={wallet?.address}
        chainId={wallet?.chainId}
        onBurnSuccess={handleBurnSuccess}
      />
    </section>
  );
};
