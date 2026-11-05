import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, HeartHandshake, Mic, User, MapPin, Type, MessageCircle } from 'lucide-react';
import { PlantCategory, UserProfile } from '../types/index.ts';

interface NavbarProps {
  activeMode: PlantCategory;
  onModeChange: (mode: PlantCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenClinic?: () => void;
  onOpenWeb3?: () => void;
  onOpenSwapMap?: () => void;
  onOpenContact?: () => void;
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Official Brand Logo -> Link to Home */}
          <Link
            to="/"
            onClick={() => onModeChange('herb')}
            className="flex items-center cursor-pointer py-1 shrink-0"
            title="Yêu Trồng Cây - Design your life"
          >
            <img
              src="/logo.jpg"
              alt="Yêu Trồng Cây - Design your life"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain hover:opacity-95 transition"
            />
          </Link>

          {/* Desktop Search Bar with Voice (md+) */}
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
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Swap Map Link */}
            <Link
              to="/trao-doi-cay"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-900 flex items-center gap-1 sm:gap-1.5 border border-emerald-200 transition"
              title="Trạm Trao Đổi Cây & Hạt Giống (Mở tab mới)"
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span className="hidden sm:inline">Đổi Cây</span>
            </Link>

            {/* Clinic */}
            <Link
              to="/bac-si-cay-trong"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-forest-50 hover:bg-forest-100 text-forest-900 flex items-center gap-1 sm:gap-1.5 border border-forest-200 transition"
              title="Bác Sĩ Cây Trồng (Mở tab mới)"
            >
              <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-herbal-600" />
              <span className="hidden sm:inline">Bác Sĩ Cây (3s)</span>
              <span className="sm:hidden text-[11px]">Bác Sĩ</span>
            </Link>

            {/* Contact Button */}
            <Link
              to="/lien-he"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white hover:bg-forest-50 text-forest-900 items-center gap-1.5 border border-forest-200 transition"
              title="Liên hệ & Đóng góp ý kiến (Mở tab mới)"
            >
              <MessageCircle className="w-4 h-4 text-forest-600" />
              <span>Liên Hệ</span>
            </Link>

            {/* Web3 Sandbox */}
            <Link
              to="/web3-sandbox"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 items-center gap-1.5 border border-terracotta-100 transition"
              title="Hộ chiếu cây trồng Web3 (Mở tab mới)"
            >
              <ShieldCheck className="w-4 h-4 text-terracotta-600" />
              <span>Web3 Sandbox</span>
            </Link>

            {/* Accessibility Font Size Toggle (A- / A+) */}
            <button
              onClick={onToggleFontSize}
              title="Phóng to / Thu nhỏ cỡ chữ (Cho người lớn tuổi)"
              className="px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold bg-white hover:bg-forest-50 text-forest-800 border border-forest-200 flex items-center gap-1 transition"
            >
              <Type className="w-3.5 h-3.5 text-forest-600" />
              <span>{fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}</span>
            </button>

            {/* User Profile / Login */}
            {currentUser ? (
              <button
                onClick={onOpenMyGarden}
                className="px-2 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-herbal-50 hover:bg-herbal-100 text-herbal-900 flex items-center gap-1.5 border border-herbal-200 transition shadow-2xs"
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
                />
                <span className="hidden md:inline font-semibold">Vườn Của Tôi</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-forest-900 hover:bg-forest-800 text-white flex items-center gap-1.5 shadow-sm transition"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-herbal-400" />
                <span className="text-[11px] sm:text-xs">Đăng Nhập</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar (< md screens) */}
        <div className="flex md:hidden px-1 pb-2.5 w-full">
          <div className="flex flex-1 items-center relative">
            <Search className="w-3.5 h-3.5 text-forest-700 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm theo tên cây, bệnh lá, tên khoa học..."
              className="w-full pl-8 pr-8 py-2 bg-white border border-forest-100 rounded-full text-xs text-charcoal-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-herbal-500 shadow-inner"
            />
            <button
              onClick={handleVoiceSearch}
              title="Tìm kiếm bằng giọng nói"
              className={`absolute right-1.5 p-1 rounded-full transition ${
                isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-forest-700 hover:bg-forest-50'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Garden Mode Switcher - 3 Distinct Category URLs (Mở sang tab mới) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 py-2 px-1 sm:px-0 border-t border-forest-50 overflow-x-auto no-scrollbar">
          <Link
            to="/thao-duoc"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-2 shrink-0 ${
              activeMode === 'herb'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'bg-white text-forest-800 hover:bg-forest-50 border border-forest-100 hover:border-herbal-400'
            }`}
            title="Mở Tủ Thuốc Xanh trong tab mới"
          >
            <span>🌿</span>
            <span>Tủ Thuốc Xanh (Thảo Dược)</span>
          </Link>

          <Link
            to="/cay-an-trai"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-2 shrink-0 ${
              activeMode === 'fruit'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'bg-white text-forest-800 hover:bg-forest-50 border border-forest-100 hover:border-amber-400'
            }`}
            title="Mở Trái Ngọt Phố trong tab mới"
          >
            <span>🍋</span>
            <span>Trái Ngọt Phố (Cây Ăn Quả)</span>
          </Link>

          <Link
            to="/cay-canh"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-2 shrink-0 ${
              activeMode === 'ornamental'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'bg-white text-forest-800 hover:bg-forest-50 border border-forest-100 hover:border-purple-400'
            }`}
            title="Mở Cây Cảnh & Thư Thái trong tab mới"
          >
            <span>🌸</span>
            <span>Cây Cảnh & Thư Thái (Bonsai/Hoa)</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
