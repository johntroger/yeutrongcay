import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShieldCheck, HeartHandshake, Mic, User, MapPin, MessageCircle, Leaf, Globe, Sun, Moon } from 'lucide-react';
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
  const [isListening, setIsListening] = React.useState(false);

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      onSearchChange(isEn ? 'Indian Borage' : 'Húng Chanh');
      setIsListening(false);
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-100 dark:bg-charcoal-900/95 backdrop-blur-md border-b border-forest-100 dark:border-forest-900 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
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

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Swap Map Link */}
            <Link
              to="/trao-doi-cay"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-900 flex items-center gap-1 sm:gap-1.5 border border-emerald-200 transition"
              title={t('nav.swapFull')}
            >
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span className="hidden sm:inline">{t('nav.swap')}</span>
            </Link>

            {/* Clinic */}
            <Link
              to="/bac-si-cay-trong"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-forest-50 hover:bg-forest-100 text-forest-900 flex items-center gap-1 sm:gap-1.5 border border-forest-200 transition"
              title={t('nav.clinicFull')}
            >
              <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-herbal-600" />
              <span className="hidden sm:inline">{t('nav.clinic')}</span>
              <span className="sm:hidden text-[11px]">{t('nav.clinicShort')}</span>
            </Link>

            {/* Contact Button */}
            <Link
              to="/lien-he"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white hover:bg-forest-50 text-forest-900 items-center gap-1.5 border border-forest-200 transition"
              title={t('nav.contactFull')}
            >
              <MessageCircle className="w-4 h-4 text-forest-600" />
              <span>{t('nav.contact')}</span>
            </Link>

            {/* Web3 Sandbox */}
            <Link
              to="/web3-sandbox"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-terracotta-50 hover:bg-terracotta-100 text-terracotta-700 items-center gap-1.5 border border-terracotta-100 transition"
              title={t('nav.web3Full')}
            >
              <ShieldCheck className="w-4 h-4 text-terracotta-600" />
              <span>{t('nav.web3')}</span>
            </Link>

            {/* Vườn Số Cá Nhân (MS4) */}
            <Link
              to="/vuon-cua-toi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-forest-900 hover:bg-forest-950 text-white flex items-center gap-1.5 shadow-xs transition"
              title={t('nav.myGardenFull')}
            >
              <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-herbal-400" />
              <span className="hidden sm:inline">{t('nav.myGarden')}</span>
              <span className="sm:hidden text-[11px]">{t('nav.myGardenShort')}</span>
            </Link>

            {/* Language Switcher Button (VI / EN) */}
            <button
              onClick={toggleLanguage}
              title={isEn ? 'Switch to Vietnamese (Chuyển sang Tiếng Việt)' : 'Switch to English (Chuyển sang Tiếng Anh)'}
              aria-label="Toggle language"
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 border border-forest-200 dark:border-forest-800 flex items-center gap-1.5 transition shadow-2xs hover:shadow-sm shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-herbal-600 dark:text-herbal-400 shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs tracking-wider flex items-center gap-0.5">
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
              className="p-1.5 sm:px-2.5 sm:py-2 rounded-xl text-xs font-bold bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-800 dark:text-amber-400 border border-forest-200 dark:border-forest-800 flex items-center gap-1 transition shadow-2xs hover:shadow-sm shrink-0"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest-700" />
              )}
            </button>

            {/* User Profile / Login */}
            {currentUser ? (
              <button
                onClick={onOpenMyGarden}
                className="px-2 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-herbal-50 dark:bg-charcoal-800 hover:bg-herbal-100 dark:hover:bg-charcoal-700 text-herbal-900 dark:text-cream-100 flex items-center gap-1.5 border border-herbal-200 dark:border-forest-800 transition shadow-2xs"
              >
                <img
                  src={currentUser.avatar_url}
                  alt={currentUser.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
                />
                <span className="hidden md:inline font-semibold">{t('nav.myGarden')}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium bg-forest-900 dark:bg-herbal-600 hover:bg-forest-800 dark:hover:bg-herbal-500 text-white flex items-center gap-1.5 shadow-sm transition"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-herbal-400 dark:text-white" />
                <span className="text-[11px] sm:text-xs">{t('nav.login')}</span>
              </button>
            )}
          </div>
        </div>

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
