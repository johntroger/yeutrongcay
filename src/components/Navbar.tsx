import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ShieldCheck,
  HeartHandshake,
  Mic,
  User,
  MapPin,
  MessageCircle,
  Leaf,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Calendar,
  ChevronDown,
  LogOut,
  Settings
} from 'lucide-react';
import { PlantCategory, UserProfile } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import { getUsernameFromEmail } from '../services/plantPassportRegistryService.ts';

interface NavbarProps {
  onModeChange?: (mode: PlantCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenClinic?: () => void;
  onOpenWeb3?: () => void;
  onOpenSwapMap?: () => void;
  onOpenContact?: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout?: () => void;
  onOpenMyGarden: () => void;
  fontSize?: 'normal' | 'large' | 'xlarge';
  onToggleFontSize?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onModeChange,
  searchQuery,
  onSearchChange,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenMyGarden,
}) => {
  void onOpenMyGarden;
  const { language, toggleLanguage, t, isEn } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userHandle = currentUser?.email
    ? getUsernameFromEmail(currentUser.email)
    : (currentUser?.id ? currentUser.id.replace(/^usr-/, '') : 'tranthanhtung37');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      onSearchChange(isEn ? 'Indian Borage' : 'Húng Chanh');
      setIsListening(false);
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-100 dark:bg-charcoal-900/95 backdrop-blur-md border-b border-forest-100 dark:border-forest-900 shadow-sm transition-colors duration-200">
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          
          {/* Official Brand Logo -> Link to Home */}
          <Link
            to="/"
            onClick={() => onModeChange?.('herb')}
            className="flex items-center cursor-pointer py-1 shrink-0"
            title={t('common.siteName') + ' - ' + t('common.tagline')}
          >
            <img
              src="/logo.jpg"
              alt={t('common.siteName') + ' - ' + t('common.tagline')}
              className="h-9 sm:h-10 md:h-11 w-auto object-contain hover:opacity-95 transition rounded-lg"
            />
          </Link>

          {/* Desktop Search Bar with Voice (md+) */}
          <div className="hidden md:flex flex-1 max-w-md items-center relative">
            <Search className="w-4 h-4 text-forest-700 dark:text-forest-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('common.searchPlaceholder')}
              className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800 rounded-full text-sm text-charcoal-900 dark:text-cream-50 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-herbal-500 focus:border-transparent transition shadow-inner"
            />
            <button
              onClick={handleVoiceSearch}
              title={t('common.voiceSearch')}
              className={`absolute right-2.5 p-1.5 rounded-full transition ${
                isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-forest-700 dark:text-forest-400 hover:bg-forest-50 dark:hover:bg-charcoal-700'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Action Links (lg+ screens) */}
          <div className="hidden lg:flex items-center gap-2">
            
            {/* Swap Map Link */}
            <Link
              to="/trao-doi-cay"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800/60 transition shadow-2xs"
              title={t('nav.swapFull')}
            >
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('nav.swap')}</span>
            </Link>

            {/* Clinic */}
            <Link
              to="/bac-si-cay-trong"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-forest-50 hover:bg-forest-100 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 flex items-center gap-1.5 border border-forest-200 dark:border-forest-800 transition shadow-2xs"
              title={t('nav.clinicFull')}
            >
              <HeartHandshake className="w-4 h-4 text-herbal-600 dark:text-emerald-400" />
              <span>{t('nav.clinic')}</span>
            </Link>

            {/* Lịch Nông Vụ Đô Thị 3 Miền (H4) */}
            <Link
              to="/lich-nong-vu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-900/60 text-teal-900 dark:text-teal-300 flex items-center gap-1.5 border border-teal-200 dark:border-teal-800/60 transition shadow-2xs"
              title={isEn ? 'Seasonal Urban Farming Calendar' : 'Lịch nông vụ đô thị 3 miền chuẩn tiết khí'}
            >
              <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{isEn ? 'Calendar' : 'Lịch Nông Vụ'}</span>
            </Link>

            {/* Vườn Số Cá Nhân (MS4) */}
            <Link
              to="/vuon-cua-toi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-forest-900 hover:bg-forest-950 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-sm transition"
              title={t('nav.myGardenFull')}
            >
              <Leaf className="w-4 h-4 text-herbal-400 dark:text-white" />
              <span>{t('nav.myGarden')}</span>
            </Link>

            {/* Web3 Hộ Chiếu Cây Trồng (MS8) */}
            <Link
              to="/web3-sandbox"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 dark:hover:bg-orange-900/60 text-orange-900 dark:text-orange-300 flex items-center gap-1.5 border border-orange-200 dark:border-orange-800/60 transition shadow-2xs"
              title={isEn ? 'Web3 Plant Passport & Genetic Provenance Sandbox' : 'Hộ chiếu cây trồng số & Web3 Sandbox'}
            >
              <ShieldCheck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>{isEn ? 'Web3' : 'Hộ Chiếu Cây'}</span>
            </Link>

            {/* Language Switcher Button (VI / EN) */}
            <button
              onClick={toggleLanguage}
              title={isEn ? 'Switch to Vietnamese' : 'Chuyển sang Tiếng Anh'}
              aria-label="Toggle language"
              className="px-2.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 border border-forest-200 dark:border-forest-800 flex items-center gap-1.5 transition shadow-2xs shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-herbal-600 dark:text-herbal-400 shrink-0" />
              <span className="font-mono text-xs tracking-wider flex items-center gap-0.5">
                <span className={language === 'vi' ? 'text-forest-950 dark:text-white font-bold underline decoration-herbal-500 underline-offset-2' : 'text-forest-400 dark:text-gray-400 font-normal'}>VI</span>
                <span className="text-forest-300 dark:text-gray-600">/</span>
                <span className={language === 'en' ? 'text-forest-950 dark:text-white font-bold underline decoration-herbal-500 underline-offset-2' : 'text-forest-400 dark:text-gray-400 font-normal'}>EN</span>
              </span>
            </button>

            {/* Theme Toggle Button (Light / Dark) */}
            <button
              onClick={toggleTheme}
              title={isDark ? (isEn ? 'Switch to Light Mode' : 'Chuyển sang Giao diện Sáng') : (isEn ? 'Switch to Dark Mode' : 'Chuyển sang Giao diện Tối')}
              aria-label="Toggle dark mode"
              className="p-2 rounded-xl text-xs font-bold bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-800 dark:text-amber-400 border border-forest-200 dark:border-forest-800 flex items-center transition shadow-2xs shrink-0"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-forest-700" />
              )}
            </button>

            {/* User Profile / Login */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 flex items-center gap-2 border border-forest-200 dark:border-forest-800 transition shadow-2xs"
                  title="Tài khoản của tôi"
                >
                  <img
                    src={currentUser.avatar_url}
                    alt={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-500/50"
                  />
                  <span className="max-w-[110px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-forest-100 dark:border-forest-800">
                      <p className="font-bold text-xs text-forest-950 dark:text-white truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{currentUser.email || 'Thành viên Yêu Trồng Cây'}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                        {currentUser.badge}
                      </span>
                    </div>

                    {/* Mục 1: Trang Cá Nhân */}
                    <Link
                      to={`/${userHandle}`}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-forest-50 dark:hover:bg-charcoal-800 flex items-center justify-between transition group"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Trang Cá Nhân</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        /{userHandle}
                      </span>
                    </Link>

                    {/* Mục 2: Vườn Của Tôi */}
                    <Link
                      to="/vuon-cua-toi"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-xs text-forest-800 dark:text-forest-200 hover:bg-forest-50 dark:hover:bg-charcoal-800 flex items-center gap-2 transition"
                    >
                      <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t('nav.myGarden')}</span>
                    </Link>

                    {/* Mục 3: Cài Đặt Firebase / Đổi Nick */}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-forest-800 dark:text-forest-200 hover:bg-forest-50 dark:hover:bg-charcoal-800 flex items-center gap-2 transition"
                    >
                      <Settings className="w-3.5 h-3.5 text-amber-500" />
                      <span>Cài Đặt Firebase / Đổi Nick</span>
                    </button>

                    {/* Mục 4: Đăng Xuất */}
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout?.();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2 border-t border-forest-100 dark:border-forest-800 mt-1 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng Xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-forest-900 dark:bg-emerald-600 hover:bg-forest-800 dark:hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md transition active:scale-[0.98]"
              >
                <User className="w-4 h-4 text-emerald-300 dark:text-white" />
                <span>{t('nav.login')}</span>
              </button>
            )}
          </div>

          {/* Mobile & Tablet Compact Action Area (< lg screens) */}
          <div className="flex lg:hidden items-center gap-1.5">
            
            {/* Quick Language Toggle */}
            <button
              onClick={toggleLanguage}
              title={isEn ? 'Tiếng Việt' : 'English'}
              className="px-2 py-1.5 rounded-xl text-[11px] font-bold bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 border border-forest-200 dark:border-forest-800 flex items-center gap-1 transition shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-herbal-600 dark:text-herbal-400" />
              <span className="font-mono uppercase">{language}</span>
            </button>

            {/* Quick Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Light' : 'Dark'}
              className="p-1.5 rounded-xl text-xs bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-800 dark:text-amber-400 border border-forest-200 dark:border-forest-800 flex items-center transition shadow-2xs"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-forest-700" />
              )}
            </button>

            {/* User Icon on Mobile */}
            {currentUser ? (
              <Link
                to={`/${userHandle}`}
                className="p-1 rounded-xl border border-herbal-200 dark:border-forest-800 bg-herbal-50 dark:bg-charcoal-800 flex items-center"
                title="Hồ sơ cá nhân & NFT Gallery của tôi"
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              </Link>
            ) : (
              <button
                onClick={onOpenAuth}
                className="p-1.5 rounded-xl bg-forest-900 dark:bg-herbal-600 text-white"
                title={t('nav.login')}
              >
                <User className="w-4 h-4" />
              </button>
            )}

            {/* Dropdown Menu Toggle Button (Hamburger / Dropdown) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle dropdown menu"
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-2xs border ${
                isMenuOpen
                  ? 'bg-forest-900 text-white border-forest-950 dark:bg-emerald-600 dark:border-emerald-700'
                  : 'bg-white dark:bg-charcoal-800 text-forest-900 dark:text-cream-100 border-forest-200 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-700'
              }`}
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-white" />
              ) : (
                <Menu className="w-4 h-4 text-forest-700 dark:text-forest-300" />
              )}
              <span className="text-xs font-bold">Menu</span>
            </button>
          </div>

        </div>

        {/* Responsive Mobile / Tablet Dropdown Menu Container */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="lg:hidden absolute top-full left-3 right-3 sm:left-6 sm:right-6 mt-1.5 bg-white/98 dark:bg-charcoal-900/98 backdrop-blur-xl rounded-3xl border border-forest-100 dark:border-forest-800 shadow-2xl p-4 sm:p-5 space-y-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto overscroll-contain"
          >
            {/* Header: Title & Close Button */}
            <div className="flex items-center justify-between pb-2.5 border-b border-forest-100 dark:border-forest-800 text-xs font-bold text-forest-900 dark:text-cream-100">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-herbal-600 dark:text-herbal-400" />
                <span>{isEn ? 'Features Menu' : 'Menu Chức Năng Yêu Trồng Cây'}</span>
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-forest-50 dark:bg-charcoal-800 text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-cream-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Card / Login Banner (Cân đối tài khoản) */}
            {currentUser ? (
              <div className="p-3 bg-forest-50/80 dark:bg-charcoal-800/90 rounded-2xl border border-forest-100 dark:border-forest-700/80 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={currentUser.avatar_url}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-herbal-500/50 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-forest-950 dark:text-cream-50 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[10px] text-forest-600 dark:text-forest-400 truncate">
                        {currentUser.email || 'Thành viên Yêu Trồng Cây'}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-herbal-100 dark:bg-herbal-950/80 text-herbal-800 dark:text-herbal-300 border border-herbal-200 dark:border-herbal-800 shrink-0">
                    {currentUser.badge}
                  </span>
                </div>

                {/* 2 Nút hành động tài khoản chia đều 50/50 */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-forest-100/60 dark:border-forest-700/60">
                  <Link
                    to={`/${userHandle}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-charcoal-900 text-forest-900 dark:text-cream-100 text-xs font-semibold flex items-center justify-center gap-1.5 border border-forest-200 dark:border-forest-700 shadow-2xs hover:bg-forest-50 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-herbal-600 shrink-0" />
                    <span className="truncate">Trang Cá Nhân</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout?.();
                    }}
                    className="px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-rose-200 dark:border-rose-900/60 transition hover:bg-rose-100"
                  >
                    <LogOut className="w-3.5 h-3.5 shrink-0" />
                    <span>Đăng Xuất</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-forest-50/80 dark:bg-charcoal-800/90 rounded-2xl border border-forest-100 dark:border-forest-700/80 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-xs text-forest-950 dark:text-cream-50 truncate">
                    {isEn ? 'Urban Garden Community' : 'Cộng Đồng Yêu Trồng Cây'}
                  </p>
                  <p className="text-[11px] text-forest-600 dark:text-forest-400 truncate">
                    {isEn ? 'Log in to manage garden & NFT Passports' : 'Đăng nhập để theo dõi vườn & bộ sưu tập'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 dark:bg-herbal-600 text-white text-xs font-bold shadow-xs shrink-0"
                >
                  {t('nav.login')}
                </button>
              </div>
            )}

            {/* Menu Links List (6 Feature Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              
              {/* Vườn Số Cá Nhân */}
              <Link
                to="/vuon-cua-toi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-forest-50/70 hover:bg-forest-100 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-forest-900 dark:bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                        {t('nav.myGardenFull')}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-600 text-white shrink-0">MS4</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300 truncate">
                      {isEn ? 'Pots, care tasks & growth comparison' : 'Quản lý chậu, lịch tưới & nhật ký trước/sau'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Bác Sĩ Cây Trồng AI */}
              <Link
                to="/bac-si-cay-trong"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/70 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-emerald-200 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                        {t('nav.clinicFull')}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-600 text-white shrink-0">AI 3s</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300 truncate">
                      {isEn ? 'Instant vision diagnosis & organic recipes' : 'Chẩn đoán ảnh bệnh & phác đồ hữu cơ H15'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Lịch Nông Vụ Đô Thị 3 Miền (H4) */}
              <Link
                to="/lich-nong-vu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-teal-50/60 hover:bg-teal-100/70 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-teal-200 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-teal-700 dark:group-hover:text-teal-400 truncate">
                        {isEn ? 'Seasonal Calendar' : 'Lịch Nông Vụ 3 Miền'}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-teal-600 text-white shrink-0">12 Tháng</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300 truncate">
                      {isEn ? 'Monthly sowing schedule, weather & pest alerts' : 'Thời khóa biểu gieo trồng, tưới nước & phòng sâu bệnh'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Trạm Đổi Cây & Hạt Giống */}
              <Link
                to="/trao-doi-cay"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-amber-200 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-amber-700 dark:group-hover:text-amber-400 truncate">
                        {t('nav.swapFull')}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-600 text-white shrink-0">Bản đồ</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300 truncate">
                      {isEn ? '3-region interactive plant seed swap map' : 'Bản đồ tương tác trao đổi hạt giống 3 miền'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Liên Hệ & Trạm Bảo Tồn */}
              <Link
                to="/lien-he"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-blue-200 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-blue-700 dark:group-hover:text-blue-400 block truncate">
                      {t('nav.contactFull')}
                    </span>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300 truncate">
                      {isEn ? 'Send inquiries to editorial & conservationists' : 'Liên hệ ban biên tập & trạm bảo tồn cây'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Web3 Sandbox */}
              <Link
                to="/web3-sandbox"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-orange-50/60 hover:bg-orange-100/70 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-orange-200 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-terracotta-600 text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-orange-700 dark:group-hover:text-orange-400 block truncate">
                      {t('nav.web3Full')}
                    </span>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300 truncate">
                      {isEn ? 'Digital passport & heritage plant certificate' : 'Hộ chiếu số & bảo tồn cây bản địa'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>
            </div>

            {/* Bottom Utilities: 2 nút cân đối 50/50 cho Ngôn Ngữ và Giao Diện Sáng/Tối */}
            <div className="pt-2 border-t border-forest-100 dark:border-forest-800 grid grid-cols-2 gap-2">
              <button
                onClick={toggleLanguage}
                className="w-full px-3 py-2 rounded-xl bg-forest-50/80 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 text-xs font-semibold flex items-center justify-center gap-1.5 border border-forest-200/70 dark:border-forest-700 transition"
              >
                <Globe className="w-3.5 h-3.5 text-herbal-600 dark:text-herbal-400 shrink-0" />
                <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="w-full px-3 py-2 rounded-xl bg-forest-50/80 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 text-xs font-semibold flex items-center justify-center gap-1.5 border border-forest-200/70 dark:border-forest-700 transition"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{isEn ? 'Light Mode' : 'Giao diện Sáng'}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-forest-700 dark:text-forest-300 shrink-0" />
                    <span>{isEn ? 'Dark Mode' : 'Giao diện Tối'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Search Bar (< md screens) */}
        <div className="flex md:hidden px-1 pb-2.5 w-full">
          <div className="flex flex-1 items-center relative">
            <Search className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('common.searchPlaceholder')}
              className="w-full pl-8 pr-8 py-2 bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-forest-800 rounded-full text-xs text-charcoal-900 dark:text-cream-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-herbal-500 shadow-inner"
            />
            <button
              onClick={handleVoiceSearch}
              title={t('common.voiceSearch')}
              className={`absolute right-1.5 p-1 rounded-full transition ${
                isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-forest-700 dark:text-forest-400 hover:bg-forest-50 dark:hover:bg-charcoal-700'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

