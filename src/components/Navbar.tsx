import React from 'react';
import { Search, ShieldCheck, HeartHandshake, Mic, User, MapPin, Type, MessageCircle } from 'lucide-react';
import { PlantCategory, UserProfile } from '../types/index.ts';

interface NavbarProps {
  activeMode: PlantCategory;
  onModeChange: (mode: PlantCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenClinic: () => void;
  onOpenWeb3: () => void;
  onOpenSwapMap: () => void;
  onOpenContact: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenMyGarden: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onToggleFontSize: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeMode,
  onModeChange,
  searchQuery,
  onSearchChange,
  onOpenClinic,
  onOpenWeb3,
  onOpenSwapMap,
  onOpenContact,
  currentUser,
  onOpenAuth,
  onOpenMyGarden,
  fontSize,
  onToggleFontSize,
}) => {
  const [isListening, setIsListening] = React.useState(false);

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      onSearchChange('Húng Chanh');
      setIsListening(false);
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md border-b border-forest-100/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Official Brand Logo */}
          <div
            className="flex items-center cursor-pointer py-1"
            onClick={() => onModeChange('herb')}
            title="Yêu Trồng Cây - Design your life"
          >
            <img
              src="/logo.jpg"
              alt="Yêu Trồng Cây - Design your life"
              className="h-12 sm:h-14 w-auto object-contain hover:opacity-95 transition"
            />
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
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Swap Map Link */}
            <button
              onClick={onOpenSwapMap}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-900 flex items-center gap-1.5 border border-emerald-200 transition"
              title="Trạm Trao Đổi Cây & Hạt Giống"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Đổi Cây</span>
            </button>

            {/* Clinic */}
            <button
              onClick={onOpenClinic}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-forest-50 hover:bg-forest-100 text-forest-900 flex items-center gap-1.5 border border-forest-200 transition"
            >
              <HeartHandshake className="w-4 h-4 text-herbal-600" />
              <span className="hidden sm:inline">Bác Sĩ Cây (3s)</span>
              <span className="sm:hidden">Bác Sĩ</span>
            </button>

            {/* Web3 Sandbox */}
            <button
              onClick={onOpenWeb3}
              className="hidden lg:flex px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 items-center gap-1.5 border border-terracotta-100 transition"
            >
              <ShieldCheck className="w-4 h-4 text-terracotta-600" />
              <span>Web3 Sandbox</span>
            </button>

            {/* Contact Button */}
            <button
              onClick={onOpenContact}
              className="hidden sm:flex px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white hover:bg-forest-50 text-forest-900 items-center gap-1.5 border border-forest-200 transition"
              title="Liên hệ & Đóng góp ý kiến"
            >
              <MessageCircle className="w-4 h-4 text-forest-600" />
              <span>Liên Hệ</span>
            </button>

            {/* Accessibility Font Size Toggle (A- / A+) */}
            <button
              onClick={onToggleFontSize}
              title="Phóng to / Thu nhỏ cỡ chữ (Cho người lớn tuổi)"
              className="px-2.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-forest-50 text-forest-800 border border-forest-200 flex items-center gap-1 transition"
            >
              <Type className="w-3.5 h-3.5 text-forest-600" />
              <span>{fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}</span>
            </button>

            {/* User Profile / Login */}
            {currentUser ? (
              <button
                onClick={onOpenMyGarden}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-herbal-50 hover:bg-herbal-100 text-herbal-900 flex items-center gap-2 border border-herbal-200 transition shadow-2xs"
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="hidden md:inline font-semibold">Vườn Của Tôi</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-forest-900 hover:bg-forest-800 text-white flex items-center gap-1.5 shadow-sm transition"
              >
                <User className="w-4 h-4 text-herbal-400" />
                <span>Đăng Nhập</span>
              </button>
            )}
          </div>
        </div>

        {/* Garden Mode Switcher */}
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
