import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Web3LearnTabProps {
  isEn: boolean;
}

export const Web3LearnTab: React.FC<Web3LearnTabProps> = ({ isEn }) => {
  return (
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
  );
};
