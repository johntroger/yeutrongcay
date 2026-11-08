import React from 'react';
import { FileCheck2, RefreshCw, ArrowRight, Check } from 'lucide-react';

interface Web3EscrowTabProps {
  isEn: boolean;
  escrowStep: 1 | 2 | 3;
  isEscrowSimulating: boolean;
  handleRunEscrowStep: () => void;
}

export const Web3EscrowTab: React.FC<Web3EscrowTabProps> = ({
  isEn,
  escrowStep,
  isEscrowSimulating,
  handleRunEscrowStep
}) => {
  return (
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
              {isEn ? 'Lock Seed Deposit' : 'Khóa Cọc Hạt Giống'}
            </span>
            {escrowStep > 1 && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
          </div>
          <p className="text-[11px] text-forest-600 dark:text-forest-300 leading-relaxed">
            {isEn
              ? 'Both parties sign via Web3 wallet to lock 20 test tokens into the smart contract before courier dispatch.'
              : 'Hai bên cùng ký xác nhận trên ví thật để khóa cọc 20 Token thử nghiệm vào hợp đồng thông minh làm tin trước khi gửi bưu phẩm.'}
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
              {isEn ? 'Dispatch & 7-Day Quarantine' : 'Giao Nhận & 7 Ngày Cách Ly'}
            </span>
            {escrowStep > 2 && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
          </div>
          <p className="text-[11px] text-forest-600 dark:text-forest-300 leading-relaxed">
            {isEn
              ? 'Courier delivers plant. The smart contract timer counts down 7 days of quarantine against fungal or aphid transmission.'
              : 'Đơn vị vận chuyển giao cây. Đồng hồ Smart Contract tự đếm ngược 7 ngày cách ly phòng mầm nấm bệnh rệp sáp lây chéo vườn nhà.'}
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
              {isEn ? 'Inspection & Heart Reward ❤️' : 'Nghiệm Thu & Thưởng Trái Tim ❤️'}
            </span>
            {escrowStep === 3 && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
          </div>
          <p className="text-[11px] text-forest-600 dark:text-forest-300 leading-relaxed">
            {isEn
              ? 'Receiver confirms healthy condition. Smart contract releases deposits instantly and awards +15 Hearts ❤️.'
              : 'Bên nhận bấm "Cây sống xanh tốt". Smart Contract hoàn trả cọc tức thì và cộng +15 Trái Tim Yêu Vườn ❤️ cho người chia sẻ giống.'}
          </p>
        </div>
      </div>
    </div>
  );
};
