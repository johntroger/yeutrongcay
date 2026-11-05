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
  Calendar
} from 'lucide-react';
import { PlantCategory, UserProfile } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';

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
  fontSize?: 'normal' | 'large' | 'xlarge';
  onToggleFontSize?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeMode,
  onModeChange,
  searchQuery,
  onSearchChange,
  currentUser,
  onOpenAuth,
  onOpenMyGarden,
}) => {
  const { language, toggleLanguage, t, isEn } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      onSearchChange(isEn ? 'Indian Borage' : 'Húng Chanh');
      setIsListening(false);
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-100 dark:bg-charcoal-900/95 backdrop-blur-md border-b border-forest-100 dark:border-forest-900 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Official Brand Logo -> Link to Home */}
          <Link
            to="/"
            onClick={() => onModeChange('herb')}
            className="flex items-center cursor-pointer py-1 shrink-0"
            title={t('common.siteName') + ' - ' + t('common.tagline')}
          >
            <img
              src="/logo.jpg"
              alt={t('common.siteName') + ' - ' + t('common.tagline')}
              className="h-10 sm:h-12 md:h-14 w-auto object-contain hover:opacity-95 transition rounded-lg"
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
              <button
                onClick={onOpenMyGarden}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-herbal-50 dark:bg-charcoal-800 hover:bg-herbal-100 dark:hover:bg-charcoal-700 text-herbal-900 dark:text-cream-100 flex items-center gap-1.5 border border-herbal-200 dark:border-forest-800 transition shadow-2xs"
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-semibold">{t('nav.myGarden')}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-2 rounded-xl text-xs font-medium bg-forest-900 dark:bg-herbal-600 hover:bg-forest-800 dark:hover:bg-herbal-500 text-white flex items-center gap-1.5 shadow-sm transition"
              >
                <User className="w-4 h-4 text-herbal-400 dark:text-white" />
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
              <button
                onClick={onOpenMyGarden}
                className="p-1 rounded-xl border border-herbal-200 dark:border-forest-800 bg-herbal-50 dark:bg-charcoal-800"
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              </button>
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
            className="lg:hidden absolute top-full left-3 right-3 sm:left-6 sm:right-6 mt-1 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-xl rounded-3xl border border-forest-100 dark:border-forest-800 shadow-2xl p-4 sm:p-5 space-y-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          >
            <div className="flex items-center justify-between pb-2 border-b border-forest-100 dark:border-forest-800 text-xs font-bold text-forest-900 dark:text-cream-100">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isEn ? 'Community Menu' : 'Menu Chức Năng Yêu Trồng Cây'}</span>
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-800 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Links List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              
              {/* Vườn Số Cá Nhân */}
              <Link
                to="/vuon-cua-toi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-forest-50/70 hover:bg-forest-100 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-forest-900 dark:bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                        {t('nav.myGardenFull')}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-600 text-white">MS4</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300">
                      {isEn ? 'Pots, care tasks & growth comparison' : 'Quản lý chậu, lịch tưới & nhật ký trước/sau'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100" />
              </Link>

              {/* Bác Sĩ Cây Trồng AI */}
              <Link
                to="/bac-si-cay-trong"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/70 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-emerald-200 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                        {t('nav.clinicFull')}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-600 text-white">AI 3s</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300">
                      {isEn ? 'Instant vision diagnosis & organic recipes' : 'Chẩn đoán ảnh bệnh & phác đồ hữu cơ H15'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100" />
              </Link>

              {/* Lịch Nông Vụ Đô Thị 3 Miền (H4) */}
              <Link
                to="/lich-nong-vu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-teal-50/60 hover:bg-teal-100/70 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-teal-200 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-teal-700 dark:group-hover:text-teal-400">
                        {isEn ? 'Seasonal Calendar' : 'Lịch Nông Vụ 3 Miền'}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-teal-600 text-white">12 Tháng</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300">
                      {isEn ? 'Monthly sowing schedule, weather & pest alerts' : 'Thời khóa biểu gieo trồng, tưới nước & phòng sâu bệnh'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100" />
              </Link>

              {/* Trạm Đổi Cây & Hạt Giống */}
              <Link
                to="/trao-doi-cay"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-amber-200 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                        {t('nav.swapFull')}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-600 text-white">Bản đồ</span>
                    </div>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300">
                      {isEn ? '3-region interactive plant seed swap map' : 'Bản đồ tương tác trao đổi hạt giống 3 miền'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100" />
              </Link>

              {/* Liên Hệ & Trạm Bảo Tồn */}
              <Link
                to="/lien-he"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-blue-200 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-blue-700 dark:group-hover:text-blue-400 block">
                      {t('nav.contactFull')}
                    </span>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300">
                      {isEn ? 'Send inquiries to editorial & conservationists' : 'Liên hệ ban biên tập & trạm bảo tồn cây'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100" />
              </Link>

              {/* Web3 Sandbox */}
              <Link
                to="/web3-sandbox"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-orange-50/60 hover:bg-orange-100/70 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 border border-orange-200 dark:border-forest-700 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-terracotta-600 text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-orange-700 dark:group-hover:text-orange-400 block">
                      {t('nav.web3Full')}
                    </span>
                    <p className="text-[11px] text-charcoal-600 dark:text-charcoal-300">
                      {isEn ? 'Digital passport & heritage plant certificate' : 'Hộ chiếu số & bảo tồn cây bản địa'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-forest-900 dark:group-hover:text-cream-100" />
              </Link>
            </div>

            {/* Bottom Actions inside Dropdown */}
            <div className="pt-2 border-t border-forest-100 dark:border-forest-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 rounded-xl bg-forest-50 dark:bg-charcoal-800 text-forest-900 dark:text-cream-100 text-xs font-semibold flex items-center gap-1 border border-forest-200 dark:border-forest-700"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}</span>
                </button>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-xl bg-forest-50 dark:bg-charcoal-800 text-forest-900 dark:text-cream-100 text-xs font-semibold flex items-center gap-1 border border-forest-200 dark:border-forest-700"
                >
                  {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-forest-700" />}
                  <span>{isDark ? (isEn ? 'Light Mode' : 'Giao diện Sáng') : (isEn ? 'Dark Mode' : 'Giao diện Tối')}</span>
                </button>
              </div>

              {!currentUser && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-forest-900 dark:bg-emerald-600 text-white text-xs font-semibold"
                >
                  {t('nav.login')}
                </button>
              )}
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

        {/* Garden Mode Switcher - 3 Distinct Category URLs (Mở sang tab mới) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 py-2 px-1 sm:px-0 border-t border-forest-50 dark:border-forest-900/60 overflow-x-auto no-scrollbar">
          <Link
            to="/thao-duoc"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-2 shrink-0 ${
              activeMode === 'herb'
                ? 'bg-forest-900 dark:bg-herbal-700 text-white shadow-sm'
                : 'bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800 hover:border-herbal-400'
            }`}
            title={t('categories.herbDesc')}
          >
            <span>🌿</span>
            <span>{t('categories.herb')}</span>
          </Link>

          <Link
            to="/cay-an-trai"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-2 shrink-0 ${
              activeMode === 'fruit'
                ? 'bg-forest-900 dark:bg-herbal-700 text-white shadow-sm'
                : 'bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800 hover:border-amber-400'
            }`}
            title={t('categories.fruitDesc')}
          >
            <span>🍋</span>
            <span>{t('categories.fruit')}</span>
          </Link>

          <Link
            to="/cay-canh"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition flex items-center gap-2 shrink-0 ${
              activeMode === 'ornamental'
                ? 'bg-forest-900 dark:bg-herbal-700 text-white shadow-sm'
                : 'bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-200 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-800 hover:border-purple-400'
            }`}
            title={t('categories.ornamentalDesc')}
          >
            <span>🌸</span>
            <span>{t('categories.ornamental')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

