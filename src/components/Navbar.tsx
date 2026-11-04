import React from 'react';
import { Sprout, Search, ShieldCheck, HeartHandshake, Mic } from 'lucide-react';
import { PlantCategory } from '../types/index.ts';

interface NavbarProps {
  activeMode: PlantCategory;
  onModeChange: (mode: PlantCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenClinic: () => void;
  onOpenWeb3: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeMode,
  onModeChange,
  searchQuery,
  onSearchChange,
  onOpenClinic,
  onOpenWeb3,
}) => {
  const [isListening, setIsListening] = React.useState(false);

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Giả lập nhận diện giọng nói
    setTimeout(() => {
      onSearchChange('Húng Chanh');
      setIsListening(false);
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md border-b border-forest-100/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onModeChange('herb')}>
            <div className="w-11 h-11 rounded-2xl bg-forest-900 flex items-center justify-center text-herbal-500 shadow-md">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-serif font-bold text-forest-900 tracking-tight block">YÊU TRỒNG CÂY</span>
              <span className="text-xs font-sans text-forest-700 tracking-widest uppercase block -mt-1">Thực vật bản địa Việt</span>
            </div>
          </div>

          {/* Search Bar with Voice */}
          <div className="hidden md:flex flex-1 max-w-md items-center relative">
            <Search className="w-4 h-4 text-forest-700 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm theo tên cây, bệnh lá, hoặc tên khoa học..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-forest-100 rounded-full text-sm text-charcoal-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-herbal-500 focus:border-transparent transition shadow-inner"
            />
            <button
              onClick={handleVoiceSearch}
              title="Tìm kiếm bằng giọng nói"
              className={`absolute right-2.5 p-1.5 rounded-full transition ${
                isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-forest-700 hover:bg-forest-50'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenClinic}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-forest-50 hover:bg-forest-100 text-forest-900 flex items-center gap-1.5 border border-forest-200 transition"
            >
              <HeartHandshake className="w-4 h-4 text-herbal-600" />
              <span>Bác Sĩ Cây (3s)</span>
            </button>

            <button
              onClick={onOpenWeb3}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 flex items-center gap-1.5 border border-terracotta-100 transition"
            >
              <ShieldCheck className="w-4 h-4 text-terracotta-600" />
              <span>Web3 Sandbox</span>
            </button>
          </div>
        </div>

        {/* Garden Mode Switcher (Thanh chuyển đổi chế độ Vườn linh hoạt) */}
        <div className="flex items-center justify-center gap-2 py-2 border-t border-forest-50 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onModeChange('herb')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-2 shrink-0 ${
              activeMode === 'herb'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'bg-white text-forest-800 hover:bg-forest-50 border border-forest-100'
            }`}
          >
            <span>🌿</span>
            <span>Tủ Thuốc Xanh (Thảo Dược)</span>
          </button>

          <button
            onClick={() => onModeChange('fruit')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-2 shrink-0 ${
              activeMode === 'fruit'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'bg-white text-forest-800 hover:bg-forest-50 border border-forest-100'
            }`}
          >
            <span>🍋</span>
            <span>Trái Ngọt Phố (Cây Ăn Quả)</span>
          </button>

          <button
            onClick={() => onModeChange('ornamental')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-2 shrink-0 ${
              activeMode === 'ornamental'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'bg-white text-forest-800 hover:bg-forest-50 border border-forest-100'
            }`}
          >
            <span>🌸</span>
            <span>Cây Cảnh & Thư Thái (Bonsai/Hoa)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
