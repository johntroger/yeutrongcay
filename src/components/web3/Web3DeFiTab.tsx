import React from 'react';
import {
  Coins,
  Wallet,
  Check,
  Sparkles,
  TrendingUp,
  RefreshCw,
  Leaf,
  Landmark,
  Vote,
  X,
  ExternalLink,
  Sprout
} from 'lucide-react';
import { WalletState, web3WalletService } from '../../services/web3WalletService';

interface Web3DeFiTabProps {
  isEn: boolean;
  wallet: WalletState | null;
  handleConnectWallet: () => void;
  latestDeFiTx: {
    hash: string;
    chainId: string;
    title: string;
    timestamp: string;
  } | null;
  stakingNotice: string | null;
  setStakingNotice: (n: string | null) => void;
  availableSeeds: number;
  stakedBalance: number;
  accumulatedYield: number;
  stakeAmount: number;
  setStakeAmount: (n: number) => void;
  handleStakeSeeds: () => void;
  handleUnstakeSeeds?: (amount?: number) => void;
  handleClaimYield: () => void;
  isStakingRunning: boolean;
  carbonOffsetCount: number;
  handleOffsetCarbonOnChain: (lotId: string, tons: number) => void;
  isCarbonRetiring: boolean;
  daoYesCount: number;
  daoNoCount: number;
  daoVoteChoice: 'yes' | 'no' | null;
  isDaoVoting: boolean;
  handleVoteDao: (choice: 'yes' | 'no') => void;
}

export const Web3DeFiTab: React.FC<Web3DeFiTabProps> = ({
  isEn,
  wallet,
  handleConnectWallet,
  latestDeFiTx,
  stakingNotice,
  setStakingNotice,
  availableSeeds,
  stakedBalance,
  accumulatedYield,
  stakeAmount,
  setStakeAmount,
  handleStakeSeeds,
  handleUnstakeSeeds,
  handleClaimYield,
  isStakingRunning,
  carbonOffsetCount,
  handleOffsetCarbonOnChain,
  isCarbonRetiring,
  daoYesCount,
  daoNoCount,
  daoVoteChoice,
  isDaoVoting,
  handleVoteDao
}) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Phân Khu DeFi */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-forest-900 to-teal-950 border border-emerald-500/50 text-white shadow-xl space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5" />
            <span>{isEn ? 'Agri-DeFi & ReFi Sandbox (100% Testnet On-Chain)' : 'Vườn Ươm DeFi Nông Nghiệp & Staking Sinh Thái (100% Testnet On-Chain Thật)'}</span>
          </span>
          <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-3 py-0.5 rounded-full border border-amber-600/60">
            {isEn ? '100% Real Blockchain on Testnet (0đ Real Money)' : '100% Blockchain Thật trên Testnet (0đ Tiền Thật)'}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
          {isEn
            ? 'Decentralized Finance (DeFi) & Regenerative Finance (ReFi) on Real Testnet'
            : 'Tài Chính Phi Tập Trung (DeFi) & Tài Chính Tái Tạo (ReFi) Tương Tác Blockchain Thật Trên Testnet'}
        </h3>

        <p className="text-xs sm:text-sm text-forest-200/90 leading-relaxed max-w-4xl">
          {isEn
            ? 'DeFi eliminates traditional banking intermediaries using transparent smart contracts. Every action below sends a REAL on-chain transaction through your Web3 wallet (MetaMask / Rabby) to our testnet smart contracts (Base Sepolia, Ethereum Sepolia, BNB Testnet, Polygon Amoy) with 0đ real cost.'
            : 'DeFi loại bỏ trung gian bằng các hợp đồng thông minh minh bạch. Mọi thao tác bên dưới đều kích hoạt giao dịch ON-CHAIN THẬT thông qua ví Web3 của bạn (MetaMask, Rabby, Coinbase Wallet) tới Smart Contract Testnet (Base Sepolia, Sepolia, BNB Testnet, Polygon Amoy) với chi phí 0đ tiền thật nhằm giáo dục cách sử dụng Web3 an toàn.'}
        </p>
      </div>

      {/* Trạng Thái Kết Nối Ví On-chain Cho Phân Hệ DeFi */}
      <div className="p-4 rounded-2xl bg-white dark:bg-charcoal-900/90 border border-forest-100 dark:border-forest-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${wallet?.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <div>
            <div className="text-xs font-bold text-forest-950 dark:text-white flex items-center gap-2">
              <span>{isEn ? 'DeFi Execution Wallet:' : 'Ví Tương Tác On-chain DeFi:'}</span>
              {wallet?.isConnected ? (
                <span className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)} ({wallet.walletName})
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 font-normal">
                  {isEn ? 'Not Connected (Connect to execute real on-chain actions)' : 'Chưa kết nối (Cần kết nối ví thật để duyệt giao dịch)'}
                </span>
              )}
            </div>
            <div className="text-[11px] text-forest-500 mt-0.5">
              {wallet?.isConnected ? (
                <span>
                  Sổ cái: <strong>{wallet.networkName}</strong> • Số dư gas testnet: <strong>{wallet.balanceEth} {wallet.currencySymbol}</strong>
                </span>
              ) : (
                <span>{isEn ? 'Compatible with MetaMask, Rabby, Coinbase Wallet' : 'Tương thích MetaMask, Rabby, Brave, Coinbase Wallet'}</span>
              )}
            </div>
          </div>
        </div>

        {!wallet?.isConnected ? (
          <button
            onClick={handleConnectWallet}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition shrink-0 cursor-pointer"
          >
            <Wallet className="w-4 h-4" />
            <span>{isEn ? 'Connect Web3 Wallet' : 'Kết Nối Ví Web3 Thật'}</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono font-bold bg-emerald-100/60 dark:bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700">
              ✓ Testnet Ready
            </span>
          </div>
        )}
      </div>

      {/* Thẻ Giao Dịch DeFi On-chain Mới Nhất */}
      {latestDeFiTx && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-teal-950/60 border border-emerald-400/80 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                  {latestDeFiTx.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 font-bold">
                  ON-CHAIN CONFIRMED
                </span>
              </div>
              <div className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300/90 mt-0.5 flex items-center gap-2 flex-wrap">
                <span>Tx: {latestDeFiTx.hash.slice(0, 14)}...{latestDeFiTx.hash.slice(-8)}</span>
                <span>• {latestDeFiTx.timestamp}</span>
              </div>
            </div>
          </div>

          <a
            href={web3WalletService.getExplorerTxUrl(latestDeFiTx.hash, latestDeFiTx.chainId)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-charcoal-900 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-charcoal-800 font-bold text-xs flex items-center gap-1.5 transition shrink-0 shadow-sm"
          >
            <span>{isEn ? 'View on Block Explorer' : 'Xem trên Block Explorer'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Thông báo kết quả Staking */}
      {stakingNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/90 border border-emerald-400 text-xs text-emerald-900 dark:text-emerald-100 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{stakingNotice}</span>
          </div>
          <button onClick={() => setStakingNotice(null)} className="font-bold text-emerald-700 dark:text-emerald-300 hover:text-white">✕</button>
        </div>
      )}

      {/* PHẦN 1: KHO GỬI HẠT GIỐNG SINH LỜI (SEED STAKING VAULT) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-900/90 border border-forest-100 dark:border-forest-800 shadow-lg space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800 flex-wrap gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>{isEn ? '1. Green Seed Staking Vault (Smart Contract APY: 12.5%)' : '1. Kho Gửi Hạt Giống Sinh Lời (Smart Contract Staking APY: 12.5%)'}</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>{isEn ? 'On-Chain Real Tx' : 'Giao Dịch On-chain Thật'}</span>
          </span>
        </div>

        {/* 3 Thẻ Chỉ Số Staking */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-forest-50/60 dark:bg-forest-950/60 border border-forest-100 dark:border-forest-800">
            <span className="text-[11px] text-forest-600 dark:text-forest-400 font-medium block">
              {isEn ? 'Total Staked Seeds' : 'Hạt Giống Đang Gửi'}
            </span>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-300 mt-1 flex items-baseline gap-1">
              <span>{stakedBalance}</span>
              <span className="text-xs font-sans font-normal text-forest-500">Hạt testnet</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-forest-50/60 dark:bg-forest-950/60 border border-forest-100 dark:border-forest-800">
            <span className="text-[11px] text-forest-600 dark:text-forest-400 font-medium block">
              {isEn ? 'Bio-Fertilizer Yield' : 'Lợi Suất Phân Bón Tích Lũy'}
            </span>
            <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 flex items-baseline gap-1">
              <span>{accumulatedYield.toFixed(2)}</span>
              <span className="text-xs font-sans font-normal text-forest-500">Bao vi sinh</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-forest-50/60 dark:bg-forest-950/60 border border-forest-100 dark:border-forest-800">
            <span className="text-[11px] text-forest-600 dark:text-forest-400 font-medium block">
              {isEn ? 'Yield Rate' : 'Tỷ Suất Lợi Nhuận (APY)'}
            </span>
            <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 flex items-baseline gap-1">
              <span>12.5%</span>
              <span className="text-xs font-sans font-normal text-forest-500">/ năm</span>
            </div>
          </div>
        </div>

        {/* Form Tương Tác Staking Thật On-Chain */}
        <div className="p-4 sm:p-5 rounded-2xl bg-cream-50/80 dark:bg-forest-950/40 border border-forest-100 dark:border-forest-800 space-y-4">
          {/* Nguồn Gốc Hạt Giống Từ Vườn */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-forest-100 dark:border-forest-800/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-lime-500/20 border border-lime-500/30 flex items-center justify-center shrink-0">
                <Sprout className="w-4 h-4 text-lime-500" />
              </div>
              <div>
                <span className="text-[11px] text-forest-500 dark:text-forest-400 block font-medium">
                  {isEn ? 'Harvested Seeds in Backpack:' : 'Hạt Giống Thu Hoạch Trong Balo Vườn:'}
                </span>
                <span className="text-sm font-bold font-mono text-forest-900 dark:text-white flex items-center gap-1.5">
                  <span className="text-lime-600 dark:text-lime-400 font-extrabold">{availableSeeds}</span>
                  <span className="text-xs font-sans font-normal text-forest-600 dark:text-forest-400">
                    {isEn ? 'seeds ready to stake' : 'hạt giống sẵn sàng gửi'}
                  </span>
                </span>
              </div>
            </div>

            {/* Các nút chọn nhanh số lượng */}
            {availableSeeds > 0 && (
              <div className="flex items-center gap-1.5">
                {[10, 25, 50].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setStakeAmount(Math.min(availableSeeds, qty))}
                    disabled={availableSeeds < qty}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      stakeAmount === qty
                        ? 'bg-emerald-600 text-white'
                        : availableSeeds >= qty
                        ? 'bg-white dark:bg-forest-900/80 text-forest-700 dark:text-forest-300 border border-forest-200 dark:border-forest-700 hover:bg-forest-100'
                        : 'opacity-40 cursor-not-allowed bg-stone-200 dark:bg-stone-800 text-stone-500'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setStakeAmount(availableSeeds)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-bold transition hover:bg-emerald-200 cursor-pointer"
                >
                  {isEn ? 'Max' : 'Tối đa'} ({availableSeeds})
                </button>
              </div>
            )}
          </div>

          {/* Cảnh báo khi Balo không có hạt giống (giải quyết câu hỏi Hạt giống ở đâu ra) */}
          {availableSeeds <= 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5 shadow-xs">
              <Sprout className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">
                  {isEn ? 'No seeds available in your garden backpack!' : 'Bạn chưa có hạt giống nào trong Túi đồ!'}
                </p>
                <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                  {isEn
                    ? 'In Yeu Trong Cay, DeFi seeds come from your real garden! Care for your plants in "My Garden" until they reach Stage 5 maturity, then harvest to collect native seeds and stake them here.'
                    : 'Trong Yêu Trồng Cây, hạt giống DeFi bắt nguồn từ chính khu vườn của bạn! Hãy chăm sóc cây trong "Vườn Của Tôi" đến khi cây đạt Giai đoạn 5 (Chín muồi), bấm thu hoạch để nhận hạt giống bản địa rồi mang sang đây gửi Staking sinh lời nhé.'}
                </p>
                <a
                  href="/vuon-cua-toi"
                  className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-amber-300 hover:underline pt-0.5 text-xs cursor-pointer"
                >
                  <span>{isEn ? '👉 Go to My Garden to Harvest Seeds' : '👉 Đến Vườn Của Tôi để Chăm Cây & Thu Hoạch'}</span>
                </a>
              </div>
            </div>
          )}

          <label className="text-xs font-bold text-forest-900 dark:text-white flex items-center justify-between">
            <span>{isEn ? 'Enter Seeds to Stake (On-chain):' : 'Nhập Số Lượng Hạt Giống Gửi Staking On-Chain:'}</span>
            <span className="text-[11px] text-forest-500 font-normal">
              {isEn ? '100% Testnet • Gas: 0đ Real Money' : '100% Testnet • Phí Gas: 0đ tiền thật'}
            </span>
          </label>
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <input
              type="number"
              min="1"
              max={Math.max(1, availableSeeds)}
              value={stakeAmount}
              onChange={(e) => setStakeAmount(Math.max(1, Math.min(availableSeeds || 1, Number(e.target.value))))}
              disabled={availableSeeds <= 0}
              className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-charcoal-950 border border-forest-200 dark:border-forest-800 text-sm font-mono font-bold text-forest-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
            />
            <button
              onClick={handleStakeSeeds}
              disabled={isStakingRunning || availableSeeds <= 0 || stakeAmount > availableSeeds || stakeAmount <= 0}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition shrink-0 cursor-pointer"
            >
              {isStakingRunning ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Leaf className="w-3.5 h-3.5" />
              )}
              <span>{isEn ? 'Stake Seeds On-chain (+20 Hearts ❤️)' : 'Gửi Vào Staking On-chain (+20 Trái Tim ❤️)'}</span>
            </button>
            <button
              onClick={handleClaimYield}
              disabled={accumulatedYield <= 0 || isStakingRunning}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-forest-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition shrink-0 cursor-pointer"
              title={isEn ? 'Claim accumulated Bio-Fertilizer units into your backpack' : 'Thu hoạch phân bón vi sinh tích lũy cộng thẳng vào Túi đồ'}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Claim Bio-Fertilizer (+15 Hearts ❤️)' : 'Thu Hoạch Phân Bón Vi Sinh (+15 Tim ❤️)'}</span>
            </button>

            {stakedBalance > 0 && handleUnstakeSeeds && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {stakedBalance > 10 && (
                  <button
                    onClick={() => handleUnstakeSeeds(10)}
                    disabled={isStakingRunning}
                    className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-teal-800/90 hover:bg-teal-700 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition shrink-0 cursor-pointer"
                    title={isEn ? 'Unstake 10 seeds back to your backpack' : 'Rút 10 hạt giống về túi đồ'}
                  >
                    <Sprout className="w-3.5 h-3.5 text-lime-300" />
                    <span>{isEn ? 'Unstake 10' : 'Rút 10 Hạt'}</span>
                  </button>
                )}
                <button
                  onClick={() => handleUnstakeSeeds(stakedBalance)}
                  disabled={isStakingRunning}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition shrink-0 cursor-pointer"
                  title={isEn ? `Unstake all ${stakedBalance} seeds back to your backpack` : `Rút toàn bộ ${stakedBalance} hạt giống đang gửi staking về lại túi đồ`}
                >
                  <Sprout className="w-3.5 h-3.5 text-lime-300" />
                  <span>{isEn ? `Unstake All (${stakedBalance})` : `Rút Toàn Bộ (${stakedBalance} hạt)`}</span>
                </button>
              </div>
            )}
          </div>

          {/* Hướng dẫn phân biệt Hạt giống & Phân bón vi sinh */}
          <div className="p-3 rounded-xl bg-forest-50/70 dark:bg-forest-950/60 border border-forest-100 dark:border-forest-800 text-[11px] text-forest-700 dark:text-forest-300 space-y-1">
            <p>
              🌾 <strong>Lưu ý về nguồn Hạt Giống (Seeds):</strong>
            </p>
            <p>
              • <strong>Thu hoạch tại Vườn Của Tôi:</strong> Khi chăm cây đạt Cấp 5 (chín muồi) và bấm thu hoạch, bạn nhận được <strong>Hạt Giống Bản Địa (🌱)</strong> vào Túi đồ.<br />
              • <strong>Thu hoạch tại Kho DeFi Staking:</strong> Gửi hạt giống vào bể sinh ra lãi suất là <strong>Phân Bón Vi Sinh (👝)</strong> giúp nuôi cây mau lớn. Nếu muốn lấy lại hạt giống đã gửi, hãy bấm nút <strong>"Rút Hạt Giống"</strong> ở trên!
            </p>
          </div>

          <p className="text-[11px] text-forest-600 dark:text-forest-400 leading-relaxed italic">
            💡 <strong>Bản chất DeFi On-chain:</strong> Khi bấm nút, ví Web3 (MetaMask/Rabby) sẽ mở cửa sổ yêu cầu ký duyệt giao dịch <code>eth_sendTransaction</code> gọi hàm <code>stakeSeeds(uint256)</code> vào Smart Contract <code>AgriDeFiVault</code>. Giao dịch được khai thác và ghi nhận vĩnh viễn trên sổ cái Testnet với mã TxHash thật.
          </p>
        </div>
      </div>

      {/* PHẦN 2: TÀI CHÍNH TÁI TẠO (REFI) & TÍN CHỈ CARBON RỪNG */}
      <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-900/90 border border-forest-100 dark:border-forest-800 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800 flex-wrap gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-2">
            <Landmark className="w-4 h-4" />
            <span>{isEn ? '2. Forest Biodiversity ReFi & Green Carbon Credits (On-Chain)' : '2. Tài Chính Tái Tạo (ReFi) & Tín Chỉ Carbon Rừng Tự Nhiên On-Chain'}</span>
          </span>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
            Đã bù trừ: {carbonOffsetCount} Tấn CO₂ (Testnet)
          </span>
        </div>

        <p className="text-xs text-forest-700 dark:text-forest-300 leading-relaxed">
          {isEn
            ? 'ReFi (Regenerative Finance) connects blockchain with ecological restoration. Every 1-hectare lot of Cúc Phương or U Minh protected forest absorbs ~15 tons of CO2 annually. Click below to execute a real on-chain transaction retiring carbon offsets via testnet smart contract!'
            : 'ReFi (Tài chính Tái tạo) kết nối công nghệ chuỗi khối với bảo tồn sinh thái. Mỗi lô rừng 1 hecta (10.000 m²) tại Cúc Phương hoặc U Minh Hạ hấp thụ trung bình 15 tấn CO₂ mỗi năm. Hãy bấm nút dưới đây để thực hiện giao dịch ON-CHAIN THẬT bù trừ khí thải qua Smart Contract Testnet!'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-teal-950 dark:text-teal-200">Rừng Nguyên Sinh Cúc Phương</span>
              <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold">Lô #01 (10.000 m²)</span>
            </div>
            <p className="text-[11px] text-teal-800 dark:text-teal-300 leading-relaxed">
              Hấp thụ ~15 tấn CO₂/năm. Đúc chứng nhận bù trừ Carbon On-chain hỗ trợ bảo tồn quần thể cây Chò ngàn năm.
            </p>
            <button
              onClick={() => handleOffsetCarbonOnChain('CUC-PHUONG-LOT-01', 1)}
              disabled={isCarbonRetiring}
              className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
            >
              {isCarbonRetiring ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              <span>{isEn ? 'Retire 15T CO2 On-chain (+25 Hearts ❤️)' : 'Bù trừ 15 Tấn CO₂ On-chain (+25 Trái Tim ❤️)'}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-emerald-950 dark:text-emerald-200">Đầm Than Bùn U Minh Hạ</span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Lô #02 (10.000 m²)</span>
            </div>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-300 leading-relaxed">
              Lưu trữ carbon gấp 3 lần rừng cạn. Bù trừ khí thải on-chain tài trợ dự án giám sát rái cá lông mũi.
            </p>
            <button
              onClick={() => handleOffsetCarbonOnChain('U-MINH-HA-LOT-01', 1)}
              disabled={isCarbonRetiring}
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
            >
              {isCarbonRetiring ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              <span>{isEn ? 'Retire 15T CO2 On-chain (+25 Hearts ❤️)' : 'Bù trừ 15 Tấn CO₂ On-chain (+25 Trái Tim ❤️)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* PHẦN 3: QUẢN TRỊ DAO PHI TẬP TRUNG (GARDENER DAO GOVERNANCE) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-charcoal-900/90 border border-forest-100 dark:border-forest-800 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-forest-100 dark:border-forest-800 flex-wrap gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-2">
            <Vote className="w-4 h-4" />
            <span>{isEn ? '3. Gardener DAO Governance (Real On-Chain Voting)' : '3. Quản Trị DAO Phi Tập Trung (Biểu Quyết On-Chain Thật)'}</span>
          </span>
          <span className="text-[11px] font-mono text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-3 py-0.5 rounded-full border border-purple-300 dark:border-purple-800">
            {isEn ? '1 Wallet = 1 On-chain Vote' : '1 Ví = 1 Phiếu Bầu On-chain'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-bold text-xs sm:text-sm text-purple-950 dark:text-purple-200">
              Đề xuất #04: Cấp vốn Testnet bảo tồn 500 cây Sâm Đại Hành (Tỏi đỏ) bản địa tại Trạm Vườn Ươm Tây Nguyên
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
              Đang bỏ phiếu (Còn 4 ngày)
            </span>
          </div>

          <p className="text-xs text-purple-900/80 dark:text-purple-200/80 leading-relaxed">
            Sâm Đại Hành là dược thảo quý bản địa có nguy cơ mai một nguồn gen. Đề xuất kêu gọi trích 5.000 Token Hạt Giống từ quỹ Kho bạc DAO để nhân giống 500 bầu cây sạch bệnh chia sẻ cho cư dân đô thị.
          </p>

          {/* Thanh Tỷ Lệ Biểu Quyết */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-emerald-600 dark:text-emerald-400">Đồng ý: {daoYesCount} phiếu ({((daoYesCount / (daoYesCount + daoNoCount)) * 100).toFixed(0)}%)</span>
              <span className="text-rose-600 dark:text-rose-400">Bác bỏ: {daoNoCount} phiếu</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-forest-100 dark:bg-forest-950 overflow-hidden flex">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(daoYesCount / (daoYesCount + daoNoCount)) * 100}%` }}></div>
              <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${(daoNoCount / (daoYesCount + daoNoCount)) * 100}%` }}></div>
            </div>
          </div>

          {/* Nút Bỏ Phiếu On-Chain */}
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => handleVoteDao('yes')}
              disabled={daoVoteChoice !== null || isDaoVoting}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer ${
                daoVoteChoice === 'yes'
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 disabled:opacity-50'
              }`}
            >
              {isDaoVoting && daoVoteChoice === null ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              <span>{daoVoteChoice === 'yes' ? 'Đã Bỏ Phiếu Đồng Ý On-chain' : 'Bỏ Phiếu ĐỒNG Ý On-chain (Vote YES)'}</span>
            </button>

            <button
              onClick={() => handleVoteDao('no')}
              disabled={daoVoteChoice !== null || isDaoVoting}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer ${
                daoVoteChoice === 'no'
                  ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 hover:bg-rose-200 disabled:opacity-50'
              }`}
            >
              <X className="w-3.5 h-3.5" />
              <span>{daoVoteChoice === 'no' ? 'Đã Bỏ Phiếu Bác Bỏ On-chain' : 'Bỏ Phiếu BÁC BỎ On-chain (Vote NO)'}</span>
            </button>

            {daoVoteChoice && (
              <span className="text-[11px] text-purple-600 dark:text-purple-300 font-semibold italic flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-purple-600" />
                <span>✓ Đã ghi nhận phiếu bầu của bạn on-chain trên Testnet (+20 Trái Tim ❤️)</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
