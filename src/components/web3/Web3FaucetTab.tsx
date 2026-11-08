import React from 'react';
import { Droplets, Check, Copy, ExternalLink } from 'lucide-react';
import { WalletState } from '../../services/web3WalletService';

export const REAL_FAUCETS = [
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
    name: 'QuickNode Multi-Chain Faucet',
    network: 'Base Sepolia / Sepolia',
    amount: '0.05 ETH',
    url: 'https://faucet.quicknode.com/base/sepolia',
    descriptionVi: 'Vòi hỗ trợ cả Base Sepolia và Ethereum Sepolia với tốc độ truyền tức thì.',
    descriptionEn: 'Fast multi-chain faucet supporting both Base Sepolia and Ethereum Sepolia.'
  },
  {
    name: 'Alchemy Sepolia Faucet',
    network: 'Ethereum Sepolia',
    amount: '0.1 ETH / ngày',
    url: 'https://www.alchemy.com/faucets/ethereum-sepolia',
    descriptionVi: 'Vòi nổi tiếng nhất của Alchemy, nhận 0.1 ETH mỗi 24 giờ cho tài khoản Alchemy miễn phí.',
    descriptionEn: 'Most widely used faucet. Receive 0.1 SepoliaETH daily with a free Alchemy login.'
  }
];

interface Web3FaucetTabProps {
  isEn: boolean;
  wallet: WalletState | null;
  handleCopyAddress: () => void;
  copied: boolean;
}

export const Web3FaucetTab: React.FC<Web3FaucetTabProps> = ({
  isEn,
  wallet,
  handleCopyAddress,
  copied
}) => {
  return (
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
  );
};
