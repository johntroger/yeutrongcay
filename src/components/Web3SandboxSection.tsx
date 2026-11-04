import React, { useState } from 'react';
import { ShieldCheck, Gift, Award, ExternalLink, Check, RefreshCw } from 'lucide-react';
import { Web3TestnetPassport } from '../types/index.ts';

export const Web3SandboxSection: React.FC = () => {
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
        plant_name: 'Đinh Lăng Nếp Lá Nhỏ 3 Năm Tuổi',
        scientific_name: 'Polyscias fruticosa',
        owner_address: '0x71C...4b9A (Ví Ngầm Google)',
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
            <span>Sân Chơi Công Nghệ Tương Lai (100% Miễn Phí)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-3">
            Học & Trải Nghiệm Web3 Không Rủi Ro
          </h2>
          <p className="text-xs sm:text-sm text-forest-200/80 font-sans max-w-xl mx-auto">
            Khám phá cách công nghệ Blockchain và NFT số hóa nguồn gen cây quý của Việt Nam. <strong>Hoàn toàn sử dụng mạng thử nghiệm (Testnet), không dùng tiền thật và không có rủi ro mất tiền.</strong>
          </p>
        </div>

        {/* 2 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Faucet */}
          <div className="bg-charcoal-900/80 rounded-3xl p-6 sm:p-8 border border-forest-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-herbal-400 flex items-center gap-1">
                  <Gift className="w-4 h-4" /> Vòi Cấp Token Thử Nghiệm
                </span>
                <span className="text-xs font-mono bg-forest-900 px-2.5 py-1 rounded-full text-white border border-forest-800">
                  Số dư: {testBalance} Mầm Xanh
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Nhận 100 Token "Mầm Xanh" Miễn Phí
              </h3>
              <p className="text-xs text-forest-200/80 leading-relaxed mb-6">
                Mỗi tài khoản được cấp 100 token thử nghiệm mỗi ngày để làm quen với thao tác thưởng quà (Tip) cho người giải đáp bệnh cây hay hoặc tập trao đổi cây qua Smart Contract giả lập.
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
                  <span>Đã Nhận 100 Mầm Xanh (Hồi Chiêu 24h)</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  <span>Bấm Nhận 100 Mầm Xanh (Testnet)</span>
                </>
              )}
            </button>
          </div>

          {/* Card 2: Demo NFT Mint */}
          <div className="bg-charcoal-900/80 rounded-3xl p-6 sm:p-8 border border-forest-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Award className="w-4 h-4" /> Đúc Hộ Chiếu Cây Số
                </span>
                <span className="text-xs font-mono bg-forest-900 px-2.5 py-1 rounded-full text-white border border-forest-800">
                  Gasless: 0đ Gas
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Đúc Demo Hộ Chiếu Cây Đinh Lăng (1-Chạm)
              </h3>
              <p className="text-xs text-forest-200/80 leading-relaxed mb-6">
                Trải nghiệm tạo Hộ chiếu số trên mạng Base Sepolia mà không cần cài MetaMask. Toàn bộ phí gas được hệ thống tài trợ tự động ở hậu trường.
              </p>
            </div>

            <button
              onClick={handleDemoMint}
              disabled={isMinting || !!mintedPassport}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-forest-50 text-forest-950 font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition disabled:opacity-50"
            >
              {isMinting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-forest-900" />
                  <span>Đang Tạo Hộ Chiếu Trên Testnet...</span>
                </>
              ) : mintedPassport ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Đã Đúc Thành Công Hộ Chiếu {mintedPassport.token_id}</span>
                </>
              ) : (
                <>
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Đúc Thử Nghiệm Hộ Chiếu (1-Chạm)</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Minted Result Simulation */}
        {mintedPassport && (
          <div className="max-w-2xl mx-auto mt-8 bg-forest-900/90 rounded-3xl p-6 border border-herbal-500/40 shadow-2xl animate-fade-in text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-forest-800 mb-4">
              <span className="font-bold text-herbal-400 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Hộ Chiếu Cây Số Đã Đúc Trên Mạng {mintedPassport.network}
              </span>
              <span className="font-mono text-xs text-white/70">{mintedPassport.token_id}</span>
            </div>

            <div className="flex gap-4 items-center">
              <img
                src={mintedPassport.image_url}
                alt="Plant"
                className="w-20 h-20 rounded-2xl object-cover border border-forest-700 shrink-0"
              />
              <div className="space-y-1 text-xs text-forest-200">
                <p className="font-bold text-white text-sm">{mintedPassport.plant_name}</p>
                <p className="font-mono italic text-herbal-300">{mintedPassport.scientific_name}</p>
                <p>• Chủ sở hữu: <span className="font-mono text-white">{mintedPassport.owner_address}</span></p>
                <p>• Giai đoạn: <span className="text-amber-400 font-semibold">Cấp 1 (Cây giống thuần dưỡng)</span></p>
                <p className="font-mono text-[11px] text-gray-400 truncate">
                  SHA-256: {mintedPassport.image_sha256}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-forest-800 flex items-center justify-between text-xs text-herbal-400">
              <span className="flex items-center gap-1">
                Tx: {mintedPassport.transaction_hash}
              </span>
              <span className="flex items-center gap-1 hover:underline cursor-pointer">
                Xem trên Explorer <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
