import React, { useState } from 'react';
import { ShieldCheck, Gift, Award, ExternalLink, Check, RefreshCw } from 'lucide-react';
import { Web3TestnetPassport } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

export const Web3SandboxSection: React.FC = () => {
  const { isEn } = useLanguage();
  const [faucetClaimed, setFaucetClaimed] = useState(false);
  const [testBalance, setTestBalance] = useState(0);
  const [isMinting, setIsMinting] = useState(false);
  const [mintedPassport, setMintedPassport] = useState<Web3TestnetPassport | null>(null);

  const handleClaimFaucet = () => {
    setFaucetClaimed(true);
    setTestBalance((prev) => prev + 100);
  };

  const handleDemoMint = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setMintedPassport({
        token_id: '#7842',
        plant_name: isEn ? 'Small-Leaf Ming Aralia (3-Year Aged)' : 'Đinh Lăng Nếp Lá Nhỏ 3 Năm Tuổi',
        scientific_name: 'Polyscias fruticosa',
        owner_address: isEn ? '0x71C...4b9A (Google Embedded Wallet)' : '0x71C...4b9A (Ví Ngầm Google)',
        minted_at: '04/11/2026 13:30',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg/330px-Polyscias_fruticosa%2C_Hong_Kong_Park%2C_December_2019_16.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
        image_sha256: 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c19f8a3c21a4e5b6c7d8e9f0a1b2',
        network: 'Base Sepolia',
        evolution_stage: 1,
        transaction_hash: '0x9a8b...1f2c',
        is_testnet: true,
      });
    }, 2000);
  };

  return (
    <section id="web3" className="py-16 bg-forest-950 text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-herbal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-herbal-900/60 text-herbal-300 text-xs font-semibold mb-3 border border-herbal-700/50">
            <ShieldCheck className="w-4 h-4 text-herbal-400" />
            <span>{isEn ? 'Future Botanical Tech Sandbox (100% Free)' : 'Sân Chơi Công Nghệ Tương Lai (100% Miễn Phí)'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-3">
            {isEn ? 'Learn & Experience Web3 Zero-Risk Sandbox' : 'Học & Trải Nghiệm Web3 Không Rủi Ro'}
          </h2>
          <p className="text-xs sm:text-sm text-forest-200/80 font-sans max-w-xl mx-auto">
            {isEn
              ? 'Discover how blockchain and digital passports preserve Vietnam\'s heirloom genetic heritage. Exclusively powered by Testnet—no real currency, zero financial risk.'
              : 'Khám phá cách công nghệ Blockchain và NFT số hóa nguồn gen cây quý của Việt Nam. Hoàn toàn sử dụng mạng thử nghiệm (Testnet), không dùng tiền thật và không có rủi ro mất tiền.'}
          </p>
        </div>

        {/* 2 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Faucet */}
          <div className="bg-charcoal-900/80 rounded-3xl p-6 sm:p-8 border border-forest-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-herbal-400 flex items-center gap-1">
                  <Gift className="w-4 h-4" /> {isEn ? 'Testnet Token Faucet' : 'Vòi Cấp Token Thử Nghiệm'}
                </span>
                <span className="text-xs font-mono bg-forest-900 px-2.5 py-1 rounded-full text-white border border-forest-800">
                  {isEn ? `Balance: ${testBalance} Seed Tokens` : `Số dư: ${testBalance} Mầm Xanh`}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                {isEn ? 'Claim 100 Free Testnet Seed Tokens' : 'Nhận 100 Token "Mầm Xanh" Miễn Phí'}
              </h3>
              <p className="text-xs text-forest-200/80 leading-relaxed mb-6">
                {isEn
                  ? 'Each account receives 100 sandbox tokens daily to test community tips for insightful clinic answers and simulated smart contract plant swaps.'
                  : 'Mỗi tài khoản được cấp 100 token thử nghiệm mỗi ngày để làm quen với thao tác thưởng quà (Tip) cho người giải đáp bệnh cây hay hoặc tập trao đổi cây qua Smart Contract giả lập.'}
              </p>
            </div>

            <button
              onClick={handleClaimFaucet}
              disabled={faucetClaimed}
              className={`w-full py-3.5 rounded-2xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
                faucetClaimed
                  ? 'bg-forest-900 text-herbal-400 border border-forest-800 cursor-not-allowed'
                  : 'bg-herbal-600 hover:bg-herbal-500 text-white shadow-lg'
              }`}
            >
              {faucetClaimed ? (
                <>
                  <Check className="w-4 h-4 text-herbal-400" />
                  <span>{isEn ? 'Claimed 100 Tokens (24h Cooldown)' : 'Đã Nhận 100 Mầm Xanh (Hồi Chiêu 24h)'}</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  <span>{isEn ? 'Claim 100 Seed Tokens (Testnet)' : 'Bấm Nhận 100 Mầm Xanh (Testnet)'}</span>
                </>
              )}
            </button>
          </div>

          {/* Card 2: Demo NFT Mint */}
          <div className="bg-charcoal-900/80 rounded-3xl p-6 sm:p-8 border border-forest-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-terracotta-400 flex items-center gap-1">
                  <Award className="w-4 h-4" /> {isEn ? 'Digital Plant Passport (Dynamic NFT)' : 'Hộ Chiếu Cây Trồng (Dynamic NFT)'}
                </span>
                <span className="text-xs font-mono bg-forest-900 px-2.5 py-1 rounded-full text-white border border-forest-800">
                  Base Sepolia
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                {isEn ? 'Mint Demo Digital Plant Passport' : 'Tập Đúc Hộ Chiếu Cây Bản Địa'}
              </h3>
              <p className="text-xs text-forest-200/80 leading-relaxed mb-6">
                {isEn
                  ? 'Test how a potted Ming Aralia is digitally timestamped with SHA-256 photo hash and cryptographic provenance on Base Sepolia testnet.'
                  : 'Trải nghiệm quá trình cây Đinh Lăng nếp trồng ban công được cấp mã định danh số duy nhất, ghi lại ngày trồng và bằng chứng ảnh gốc lên chuỗi khối Base Sepolia.'}
              </p>
            </div>

            <button
              onClick={handleDemoMint}
              disabled={isMinting}
              className="w-full py-3.5 rounded-2xl bg-terracotta-600 hover:bg-terracotta-500 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition disabled:opacity-50"
            >
              {isMinting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-terracotta-200" />
                  <span>{isEn ? 'Recording to Blockchain Ledger...' : 'Đang Ghi Vào Sổ Cái Chuỗi Khối (3s)...'}</span>
                </>
              ) : (
                <>
                  <Award className="w-4 h-4 text-terracotta-200" />
                  <span>{isEn ? 'Mint Demo Plant Passport (Free Gas)' : 'Bấm Đúc Thử Hộ Chiếu Cây (0đ Gas)'}</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Minted Passport Success Preview Card */}
        {mintedPassport && (
          <div className="mt-8 max-w-xl mx-auto bg-forest-900/90 rounded-3xl p-6 border border-herbal-500/50 shadow-2xl animate-slide-up">
            <div className="flex items-center gap-2 text-xs font-bold text-herbal-400 uppercase tracking-wider mb-4 pb-2 border-b border-forest-800">
              <Check className="w-4 h-4" />
              <span>{isEn ? 'Digital Plant Passport Successfully Minted!' : 'Hộ Chiếu Cây Đã Được Đúc Thành Công!'}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <img
                src={mintedPassport.image_url}
                alt={mintedPassport.plant_name}
                className="w-24 h-24 rounded-2xl object-cover border border-forest-700 shadow-md"
              />
              <div className="space-y-1.5 text-xs text-forest-200 w-full">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-serif font-bold text-white">
                    {mintedPassport.plant_name}
                  </h4>
                  <span className="font-mono text-herbal-300 font-bold bg-forest-950 px-2 py-0.5 rounded-md border border-forest-800">
                    {mintedPassport.token_id}
                  </span>
                </div>
                <p className="font-mono italic text-[11px] text-herbal-400">
                  {mintedPassport.scientific_name}
                </p>
                <p className="text-[11px] text-forest-300">
                  {isEn ? 'Owner:' : 'Chủ sở hữu:'} <span className="font-mono text-white">{mintedPassport.owner_address}</span>
                </p>
                <p className="text-[10px] font-mono text-gray-400 truncate">
                  SHA-256: {mintedPassport.image_sha256}
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-herbal-300">
                  <span>{isEn ? 'Network:' : 'Mạng:'} {mintedPassport.network}</span>
                  <a
                    href={`https://sepolia.basescan.org/tx/${mintedPassport.transaction_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-terracotta-400 hover:text-terracotta-300 transition underline underline-offset-2"
                  >
                    <span>Tx: {mintedPassport.transaction_hash}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
