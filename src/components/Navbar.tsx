import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShieldCheck,
  HeartHandshake,
  Mic,
  MicOff,
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
  Settings,
  Coins
} from 'lucide-react';
import { PlantCategory, UserProfile, Plant } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { useTheme } from '../context/ThemeContext.tsx';
import { getUsernameFromEmail } from '../services/plantPassportRegistryService.ts';
import { searchPlantsList } from '../utils/searchUtils.ts';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage, t, isEn } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userHandle = currentUser?.email
    ? getUsernameFromEmail(currentUser.email)
    : (currentUser?.id ? currentUser.id.replace(/^usr-/, '') : 'tranthanhtung37');

  const [searchIndexPlants, setSearchIndexPlants] = useState<Plant[]>([]);

  // Tải lười (lazy load) danh mục cây chỉ khi người dùng click vào ô tìm kiếm hoặc bắt đầu gõ
  useEffect(() => {
    if ((isSearchFocused || searchQuery.trim().length > 0) && searchIndexPlants.length === 0) {
      import('../data/plants.ts').then((mod) => {
        setSearchIndexPlants(mod.SEED_PLANTS);
      });
    }
  }, [isSearchFocused, searchQuery, searchIndexPlants.length]);

  const quickMatches = useMemo(() => {
    if (!searchQuery.trim() || searchIndexPlants.length === 0) return [];
    return searchPlantsList(searchIndexPlants, searchQuery, 6);
  }, [searchQuery, searchIndexPlants]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Tìm kiếm bằng giọng nói thật (Web Speech API - SpeechRecognition)
  const handleVoiceSearch = () => {
    // Nếu đang lắng nghe thì click để dừng lại
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      setSpeechNotice(null);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechNotice(
        isEn
          ? 'Voice search requires Web Speech API. Please open in Chrome, Edge, Safari, or CocCoc.'
          : 'Trình duyệt hiện tại chưa hỗ trợ Web Speech API. Vui lòng mở trang trên Google Chrome, Edge, Safari hoặc Cốc Cốc để tìm bằng giọng nói.'
      );
      setTimeout(() => setSpeechNotice(null), 5000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = language === 'vi' ? 'vi-VN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechNotice(
          isEn
            ? 'Listening... Speak a plant name (e.g. "Indian Borage", "Tomato")'
            : 'Đang lắng nghe... Hãy nói tên cây hoặc bệnh lá (ví dụ: "Húng chanh", "Rệp sáp")'
        );
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        const text = (final || interim).trim();
        if (text) {
          onSearchChange(text);
          if (location.pathname !== '/') {
            navigate('/');
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          setSpeechNotice(
            isEn
              ? 'Microphone permission denied. Please allow microphone access in your browser.'
              : 'Quyền truy cập Micro bị từ chối. Vui lòng bật cấp quyền Micro trên trình duyệt.'
          );
        } else if (event.error === 'no-speech') {
          setSpeechNotice(
            isEn
              ? 'No speech detected. Please speak closer to your microphone.'
              : 'Chưa nghe thấy giọng nói. Vui lòng thử nói lại gần micro hơn.'
          );
        } else {
          setSpeechNotice(
            isEn
              ? 'Could not recognize speech. Please try again or type keywords.'
              : 'Không thể nhận diện giọng nói lúc này. Vui lòng thử lại.'
          );
        }
        setTimeout(() => setSpeechNotice(null), 4500);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => {
          setSpeechNotice((prev) => (prev && prev.includes('Đang lắng nghe') ? null : prev));
        }, 1500);
      };

      recognition.start();
    } catch (err: any) {
      console.warn('SpeechRecognition start failed:', err);
      setIsListening(false);
      setSpeechNotice(
        isEn
          ? 'Failed to access microphone. Please check your browser permissions.'
          : 'Không thể khởi động micro. Vui lòng kiểm tra quyền thiết bị trên trình duyệt.'
      );
      setTimeout(() => setSpeechNotice(null), 4500);
    }
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

          {/* Desktop Search Bar with Voice & Quick Autocomplete (md+) */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-md items-center relative">
            <Search className="w-4 h-4 text-forest-700 dark:text-forest-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (location.pathname !== '/' && e.target.value.trim()) {
                  navigate('/');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsSearchFocused(false);
                  if (location.pathname !== '/') {
                    navigate('/');
                  }
                  setTimeout(() => {
                    const el = document.getElementById('search-results');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              placeholder={t('common.searchPlaceholder')}
              className={`w-full pl-10 pr-10 py-2.5 bg-white dark:bg-charcoal-800 border rounded-full text-sm text-charcoal-900 dark:text-cream-50 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none transition shadow-inner ${
                isListening
                  ? 'border-red-500 ring-2 ring-red-400/50'
                  : 'border-forest-100 dark:border-forest-800 focus:ring-2 focus:ring-herbal-500 focus:border-transparent'
              }`}
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              title={isListening ? (isEn ? 'Stop listening' : 'Dừng nghe') : t('common.voiceSearch')}
              className={`absolute right-2.5 p-1.5 rounded-full transition ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse shadow-md ring-2 ring-red-300'
                  : 'text-forest-700 dark:text-forest-400 hover:bg-forest-50 dark:hover:bg-charcoal-700'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Thông báo trạng thái giọng nói (Desktop) */}
            {speechNotice && (
              <div className="absolute top-full left-0 right-0 mt-1.5 p-2.5 rounded-xl bg-forest-950/95 dark:bg-charcoal-950/95 text-white text-xs shadow-2xl border border-forest-700/80 backdrop-blur-md z-50 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center gap-2 min-w-0">
                  {isListening ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
                  ) : (
                    <MicOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                  <span className="truncate">{speechNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSpeechNotice(null)}
                  className="text-gray-400 hover:text-white shrink-0 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Bảng Gợi Ý Tìm Kiếm Nhanh Autocomplete (Desktop) */}
            {isSearchFocused && searchQuery.trim().length >= 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-charcoal-900 rounded-2xl shadow-2xl border border-forest-100 dark:border-forest-800 p-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-forest-600 dark:text-forest-400 border-b border-forest-50 dark:border-forest-800 flex items-center justify-between">
                  <span>{isEn ? 'Matching Plants' : 'Gợi ý giống cây phù hợp'}</span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    {quickMatches.length} {isEn ? 'found' : 'kết quả'}
                  </span>
                </div>

                {quickMatches.length > 0 ? (
                  <div className="py-1 max-h-72 overflow-y-auto divide-y divide-forest-50 dark:divide-forest-900/40">
                    {quickMatches.map((plant: Plant) => (
                      <Link
                        key={plant.id}
                        to={`/cay/${plant.slug || plant.id}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-forest-50 dark:hover:bg-charcoal-800 transition group"
                      >
                        <img
                          src={plant.image_url}
                          alt={plant.common_name}
                          className="w-10 h-10 rounded-lg object-cover bg-forest-100 dark:bg-charcoal-700 shrink-0 border border-forest-200/60 dark:border-forest-700/60"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-forest-900 dark:text-cream-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                            {plant.common_name}
                          </p>
                          <p className="text-[11px] italic text-forest-600 dark:text-forest-400 truncate">
                            {plant.scientific_name}
                          </p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0 font-medium capitalize">
                          {plant.category === 'fruit'
                            ? (isEn ? 'Fruit Tree' : 'Ăn trái')
                            : plant.category === 'herb'
                            ? (isEn ? 'Medicinal' : 'Thảo dược')
                            : (isEn ? 'Ornamental' : 'Cây cảnh')}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-gray-500 dark:text-gray-400">
                    <p>{isEn ? `No plants found matching "${searchQuery}"` : `Không tìm thấy giống cây nào khớp với "${searchQuery}"`}</p>
                    <p className="text-[10px] mt-1 text-forest-400">{isEn ? 'Tip: Try common names like "oi", "chanh", "dinh lang"' : 'Gợi ý: Thử tìm theo tên như "ổi", "chanh", "đinh lăng", "tía tô"'}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsSearchFocused(false);
                    if (location.pathname !== '/') navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('search-results');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full mt-1 py-2 px-3 rounded-xl bg-forest-50 hover:bg-forest-100 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-center justify-between transition"
                >
                  <span>{isEn ? `Search all plants for "${searchQuery}"` : `Xem toàn bộ kết quả cho "${searchQuery}"`}</span>
                  <span className="text-sm font-mono">↵ Enter</span>
                </button>
              </div>
            )}
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

            {/* Kinh Tế Xanh (Kiếm Tiền Từ Vườn) */}
            <Link
              to="/kiem-tien-tu-vuon"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 xl:px-3 py-2 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 flex items-center gap-1.5 border border-amber-200 dark:border-amber-800/60 transition shadow-2xs shrink-0"
              title={t('nav.monetizationFull')}
            >
              <Coins className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{t('nav.monetization')}</span>
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

        {/* Backdrop Overlay when mobile menu is open */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Responsive Mobile / Tablet Dropdown Menu Container */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="lg:hidden absolute top-full left-3 right-3 sm:left-6 sm:right-6 mt-2 bg-white dark:bg-charcoal-900 rounded-3xl border border-forest-200 dark:border-forest-800 shadow-2xl p-4 sm:p-5 space-y-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] overflow-y-auto overscroll-contain"
          >
            {/* Header: Title & Close Button */}
            <div className="flex items-center justify-between pb-2.5 border-b border-forest-100 dark:border-forest-800 text-xs font-bold text-forest-900 dark:text-cream-100">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isEn ? 'Features Menu' : 'Menu Chức Năng Yêu Trồng Cây'}</span>
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-forest-50 dark:bg-charcoal-800 text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-cream-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Card / Login Banner (Đồng bộ màu sắc nhã nhặn) */}
            {currentUser ? (
              <div className="p-3.5 bg-forest-50/70 dark:bg-charcoal-800/80 rounded-2xl border border-forest-100 dark:border-forest-700/80 space-y-2.5">
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={currentUser.avatar_url}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-forest-200 dark:ring-forest-700 shrink-0"
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
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white dark:bg-charcoal-700 text-forest-800 dark:text-cream-100 border border-forest-200 dark:border-forest-600 shrink-0">
                    {currentUser.badge}
                  </span>
                </div>

                {/* 2 Nút hành động tài khoản chia đều 50/50 */}
                <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-forest-200/50 dark:border-forest-700/50">
                  <Link
                    to={`/${userHandle}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-herbal-400 dark:text-white shrink-0" />
                    <span className="truncate">Trang Cá Nhân</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout?.();
                    }}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-charcoal-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 border border-forest-200 dark:border-forest-700 transition"
                  >
                    <LogOut className="w-3.5 h-3.5 shrink-0" />
                    <span>Đăng Xuất</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-forest-50/70 dark:bg-charcoal-800/80 rounded-2xl border border-forest-100 dark:border-forest-700/80 flex items-center justify-between gap-3">
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
                  className="px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-950 dark:bg-emerald-600 text-white text-xs font-bold shadow-xs shrink-0"
                >
                  {t('nav.login')}
                </button>
              </div>
            )}

            {/* Menu Links List (6 Feature Cards - Tông màu đồng nhất, sang trọng) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              
              {/* Vườn Số Cá Nhân */}
              <Link
                to="/vuon-cua-toi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-forest-50/60 hover:bg-forest-100/80 dark:bg-charcoal-800/80 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-700/60 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-forest-900 text-white dark:bg-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Leaf className="w-4 h-4 text-herbal-400 dark:text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                        {t('nav.myGardenFull')}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white dark:bg-charcoal-700 text-forest-800 dark:text-cream-100 border border-forest-200 dark:border-forest-600 shrink-0">MS4</span>
                    </div>
                    <p className="text-[11px] text-forest-600 dark:text-forest-400 truncate">
                      {isEn ? 'Pots, care tasks & growth comparison' : 'Quản lý chậu, lịch tưới & nhật ký trước/sau'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-forest-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Bác Sĩ Cây Trồng AI */}
              <Link
                to="/bac-si-cay-trong"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-forest-50/60 hover:bg-forest-100/80 dark:bg-charcoal-800/80 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-700/60 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <HeartHandshake className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                        {t('nav.clinicFull')}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white dark:bg-charcoal-700 text-forest-800 dark:text-cream-100 border border-forest-200 dark:border-forest-600 shrink-0">AI 3s</span>
                    </div>
                    <p className="text-[11px] text-forest-600 dark:text-forest-400 truncate">
                      {isEn ? 'Instant vision diagnosis & organic recipes' : 'Chẩn đoán ảnh bệnh & phác đồ hữu cơ H15'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-forest-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Lịch Nông Vụ Đô Thị 3 Miền (H4) */}
              <Link
                to="/lich-nong-vu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-forest-50/60 hover:bg-forest-100/80 dark:bg-charcoal-800/80 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-700/60 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                        {isEn ? 'Seasonal Calendar' : 'Lịch Nông Vụ 3 Miền'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white dark:bg-charcoal-700 text-forest-800 dark:text-cream-100 border border-forest-200 dark:border-forest-600 shrink-0">12 Tháng</span>
                    </div>
                    <p className="text-[11px] text-forest-600 dark:text-forest-400 truncate">
                      {isEn ? 'Monthly sowing schedule, weather & pest alerts' : 'Thời khóa biểu gieo trồng, tưới nước & phòng sâu bệnh'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-forest-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Kinh Tế Xanh - Kiếm Tiền Từ Vườn */}
              <Link
                to="/kiem-tien-tu-vuon"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-forest-50/60 hover:bg-forest-100/80 dark:bg-charcoal-800/80 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-700/60 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Coins className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                        {t('nav.monetization')}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white dark:bg-charcoal-700 text-forest-800 dark:text-cream-100 border border-forest-200 dark:border-forest-600 shrink-0">Thu nhập</span>
                    </div>
                    <p className="text-[11px] text-forest-600 dark:text-forest-400 truncate">
                      {isEn ? 'Garden monetization, propagation ROI & urban business models' : 'Mô hình kinh tế vườn, nhân giống & tạo thu nhập'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-forest-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Trạm Đổi Cây & Hạt Giống */}
              <Link
                to="/trao-doi-cay"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-forest-50/60 hover:bg-forest-100/80 dark:bg-charcoal-800/80 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-700/60 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 truncate">
                        {t('nav.swapFull')}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white dark:bg-charcoal-700 text-forest-800 dark:text-cream-100 border border-forest-200 dark:border-forest-600 shrink-0">Bản đồ</span>
                    </div>
                    <p className="text-[11px] text-forest-600 dark:text-forest-400 truncate">
                      {isEn ? '3-region interactive plant seed swap map' : 'Bản đồ tương tác trao đổi hạt giống 3 miền'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-forest-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Liên Hệ & Trạm Bảo Tồn */}
              <Link
                to="/lien-he"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-forest-50/60 hover:bg-forest-100/80 dark:bg-charcoal-800/80 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-700/60 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-forest-700 text-white dark:bg-forest-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 block truncate">
                      {t('nav.contactFull')}
                    </span>
                    <p className="text-[11px] text-forest-600 dark:text-forest-400 truncate">
                      {isEn ? 'Send inquiries to editorial & conservationists' : 'Liên hệ ban biên tập & trạm bảo tồn cây'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-forest-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>

              {/* Web3 Sandbox */}
              <Link
                to="/web3-sandbox"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-2xl bg-forest-50/60 hover:bg-forest-100/80 dark:bg-charcoal-800/80 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-forest-700/60 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-terracotta-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-forest-950 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 block truncate">
                      {t('nav.web3Full')}
                    </span>
                    <p className="text-[11px] text-forest-600 dark:text-forest-400 truncate">
                      {isEn ? 'Digital passport & heritage plant certificate' : 'Hộ chiếu số & bảo tồn cây bản địa'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-forest-400 group-hover:text-forest-900 dark:group-hover:text-cream-100 shrink-0 ml-2" />
              </Link>
            </div>

            {/* Bottom Utilities: 2 nút cân đối 50/50 cho Ngôn Ngữ và Giao Diện Sáng/Tối */}
            <div className="pt-2 border-t border-forest-100 dark:border-forest-800 grid grid-cols-2 gap-2">
              <button
                onClick={toggleLanguage}
                className="w-full px-3 py-2 rounded-xl bg-forest-50/70 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 text-xs font-semibold flex items-center justify-center gap-1.5 border border-forest-200/70 dark:border-forest-700 transition"
              >
                <Globe className="w-3.5 h-3.5 text-forest-700 dark:text-forest-300 shrink-0" />
                <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="w-full px-3 py-2 rounded-xl bg-forest-50/70 dark:bg-charcoal-800 hover:bg-forest-100 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 text-xs font-semibold flex items-center justify-center gap-1.5 border border-forest-200/70 dark:border-forest-700 transition"
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
        <div ref={mobileSearchRef} className="flex md:hidden px-1 pb-2.5 w-full flex-col relative">
          <div className="flex flex-1 items-center relative">
            <Search className="w-3.5 h-3.5 text-forest-700 dark:text-forest-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (location.pathname !== '/' && e.target.value.trim()) {
                  navigate('/');
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsSearchFocused(false);
                  if (location.pathname !== '/') {
                    navigate('/');
                  }
                  setTimeout(() => {
                    const el = document.getElementById('search-results');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              placeholder={t('common.searchPlaceholder')}
              className={`w-full pl-8 pr-8 py-2 bg-white dark:bg-charcoal-800 border rounded-full text-xs text-charcoal-900 dark:text-cream-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none shadow-inner ${
                isListening
                  ? 'border-red-500 ring-2 ring-red-400/50'
                  : 'border-forest-100 dark:border-forest-800 focus:ring-2 focus:ring-herbal-500'
              }`}
            />
            <button
              type="button"
              onClick={handleVoiceSearch}
              title={isListening ? (isEn ? 'Stop listening' : 'Dừng nghe') : t('common.voiceSearch')}
              className={`absolute right-1.5 p-1 rounded-full transition ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse shadow-md ring-2 ring-red-300'
                  : 'text-forest-700 dark:text-forest-400 hover:bg-forest-50 dark:hover:bg-charcoal-700'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
            </button>

            {/* Bảng Gợi Ý Tìm Kiếm Nhanh Autocomplete (Mobile) */}
            {isSearchFocused && searchQuery.trim().length >= 1 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-charcoal-900 rounded-2xl shadow-2xl border border-forest-100 dark:border-forest-800 p-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-forest-600 dark:text-forest-400 border-b border-forest-50 dark:border-forest-800 flex items-center justify-between">
                  <span>{isEn ? 'Matching Plants' : 'Gợi ý cây trồng phù hợp'}</span>
                  <span className="text-[9px] text-gray-400 font-normal">
                    {quickMatches.length} {isEn ? 'found' : 'kết quả'}
                  </span>
                </div>

                {quickMatches.length > 0 ? (
                  <div className="py-1 max-h-56 overflow-y-auto divide-y divide-forest-50 dark:divide-forest-900/40">
                    {quickMatches.map((plant: Plant) => (
                      <Link
                        key={plant.id}
                        to={`/cay/${plant.slug || plant.id}`}
                        onClick={() => {
                          setIsSearchFocused(false);
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-forest-50 dark:hover:bg-charcoal-800 transition"
                      >
                        <img
                          src={plant.image_url}
                          alt={plant.common_name}
                          className="w-8 h-8 rounded-lg object-cover bg-forest-100 dark:bg-charcoal-700 shrink-0 border border-forest-200/60 dark:border-forest-700/60"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-forest-900 dark:text-cream-100 truncate">
                            {plant.common_name}
                          </p>
                          <p className="text-[10px] italic text-forest-600 dark:text-forest-400 truncate">
                            {plant.scientific_name}
                          </p>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0 font-medium capitalize">
                          {plant.category === 'fruit'
                            ? (isEn ? 'Fruit' : 'Ăn trái')
                            : plant.category === 'herb'
                            ? (isEn ? 'Herb' : 'Thảo dược')
                            : (isEn ? 'Ornamental' : 'Cây cảnh')}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-gray-500 dark:text-gray-400">
                    <p>{isEn ? `No plants found for "${searchQuery}"` : `Không tìm thấy giống cây nào khớp với "${searchQuery}"`}</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsSearchFocused(false);
                    if (location.pathname !== '/') navigate('/');
                    setTimeout(() => {
                      const el = document.getElementById('search-results');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="w-full mt-1 py-1.5 px-2.5 rounded-xl bg-forest-50 hover:bg-forest-100 dark:bg-charcoal-800 dark:hover:bg-charcoal-700 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 flex items-center justify-between transition"
                >
                  <span>{isEn ? `View all results for "${searchQuery}"` : `Xem toàn bộ kết quả cho "${searchQuery}"`}</span>
                  <span className="text-xs font-mono">↵</span>
                </button>
              </div>
            )}
          </div>

          {/* Thông báo trạng thái giọng nói (Mobile) */}
          {speechNotice && (
            <div className="mt-1.5 p-2 rounded-xl bg-forest-950/95 dark:bg-charcoal-950/95 text-white text-[11px] shadow-2xl border border-forest-700/80 backdrop-blur-md z-50 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center gap-1.5 min-w-0">
                {isListening ? (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                ) : (
                  <MicOff className="w-3 h-3 text-amber-400 shrink-0" />
                )}
                <span className="truncate">{speechNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => setSpeechNotice(null)}
                className="text-gray-400 hover:text-white shrink-0 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

