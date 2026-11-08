import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  LogOut,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  MapPin,
  HeartHandshake,
  Leaf,
  Server,
  Home,
  Share2,
  Send,
  Calendar,
  ExternalLink,
  Clock,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  PlusCircle,
  Search
} from 'lucide-react';
import { adminService, AdminStats, AdminReport, AdminClinicCase, AdminSwapOffer, AdminAutoPostStatus } from '../services/adminService.ts';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext';
import { loginWithGoogle } from '../services/firebaseClient.ts';
import { verifyImageAlignment, generateWikiSearchQuery, generateGoogleImageSearchUrl } from '../utils/imageAlignment.ts';
import { createPlantArticle } from '../services/apiService.ts';

export const AdminPage: React.FC = () => {
  const { isEn } = useLanguage();

  useSEO({
    title: isEn
      ? 'Admin & Moderation Portal | Yêu Trồng Cây'
      : 'Cổng Quản Trị & Kiểm Duyệt Nội Dung | Yêu Trồng Cây',
    description: isEn
      ? 'Botanical system administration portal. Moderate community reports, diagnose cases, and plant swap offers.'
      : 'Bảng điều khiển quản trị viên hệ thống Yêu Trồng Cây. Kiểm duyệt báo cáo vi phạm, quản lý ca bệnh và tin trao đổi cây.'
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(adminService.isAuthenticated());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [activeTab, setActiveTab] = useState<'reports' | 'clinic' | 'swaps' | 'system' | 'autopost' | 'new_article'>('reports');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [reportFilter, setReportFilter] = useState<string>('all');
  const [clinicCases, setClinicCases] = useState<AdminClinicCase[]>([]);
  const [swapOffers, setSwapOffers] = useState<AdminSwapOffer[]>([]);
  const [autoPostStatus, setAutoPostStatus] = useState<AdminAutoPostStatus | null>(null);
  const [isTriggeringPost, setIsTriggeringPost] = useState(false);
  const [postTriggerResult, setPostTriggerResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // New Article State & CIRVA Verification
  const [newArticle, setNewArticle] = useState({
    category: 'herb',
    common_name: '',
    scientific_name: '',
    description: '',
    image_url: '',
    sunlight: 'full_sun',
    watering: 'moderate',
    propagation_difficulty: 1,
    growth_time: '60 ngày'
  });
  const [isSubmittingArticle, setIsSubmittingArticle] = useState(false);
  const [articleSubmitResult, setArticleSubmitResult] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const imageAlignment = verifyImageAlignment({
    category: newArticle.category,
    common_name: newArticle.common_name,
    scientific_name: newArticle.scientific_name,
    description: newArticle.description,
    image_url: newArticle.image_url
  });

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageAlignment.isApproved) {
      setArticleSubmitResult({
        type: 'error',
        text: 'Thuật toán CIRVA từ chối: Hình ảnh không phù hợp với nội dung bài viết!'
      });
      return;
    }
    setIsSubmittingArticle(true);
    setArticleSubmitResult(null);
    try {
      const res = await createPlantArticle(newArticle as any);
      if (res.success) {
        setArticleSubmitResult({
          type: 'success',
          text: 'Xuất bản bài viết mới thành công! Hệ thống đã ghi nhận và tự động dịch song ngữ.'
        });
        setNewArticle({
          category: 'herb',
          common_name: '',
          scientific_name: '',
          description: '',
          image_url: '',
          sunlight: 'full_sun',
          watering: 'moderate',
          propagation_difficulty: 1,
          growth_time: '60 ngày'
        });
      } else {
        setArticleSubmitResult({
          type: 'error',
          text: res.message || 'Không thể tạo bài viết mới.'
        });
      }
    } catch (err: any) {
      setArticleSubmitResult({
        type: 'error',
        text: err.message || 'Lỗi mạng khi kết nối máy chủ.'
      });
    } finally {
      setIsSubmittingArticle(false);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [s, r, c, sw, ap] = await Promise.all([
        adminService.getStats(),
        adminService.getReports(reportFilter),
        adminService.getClinicCases(),
        adminService.getSwaps(),
        adminService.getAutoPostStatus()
      ]);
      setStats(s);
      setReports(r);
      setClinicCases(c);
      setSwapOffers(sw);
      setAutoPostStatus(ap);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, reportFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    const result = await adminService.login(username, password);
    setIsLoggingIn(false);
    if (result.success) {
      setIsAuthenticated(true);
    } else {
      setLoginError(result.message || (isEn ? 'Login failed' : 'Đăng nhập không thành công'));
    }
  };

  const handleGoogleLogin = async () => {
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const user = await loginWithGoogle();
      const result = adminService.loginWithFirebaseUser(user);
      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(result.message || (isEn ? 'Unauthorized admin account' : 'Tài khoản chưa được phân quyền quản trị'));
      }
    } catch (err: any) {
      setLoginError(err?.message || (isEn ? 'Google authentication failed' : 'Đăng nhập Google thất bại'));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    adminService.logout();
    setIsAuthenticated(false);
  };

  const handleUpdateReport = async (ticketId: string, status: string, hideTarget: boolean) => {
    const ok = await adminService.updateReport(ticketId, status, hideTarget);
    if (ok) {
      setActionSuccess(isEn ? `Report ${ticketId} updated successfully.` : `Đã cập nhật báo cáo ${ticketId} thành công.`);
      setTimeout(() => setActionSuccess(null), 3500);
      loadData();
    }
  };

  const handleToggleClinic = async (id: string, currentStatus: 'visible' | 'hidden') => {
    const nextStatus = currentStatus === 'visible' ? 'hidden' : 'visible';
    const ok = await adminService.toggleClinicStatus(id, nextStatus);
    if (ok) {
      setActionSuccess(isEn ? `Clinic case ${id} switched to "${nextStatus}".` : `Đã chuyển trạng thái ca bệnh ${id} thành "${nextStatus}".`);
      setTimeout(() => setActionSuccess(null), 3000);
      loadData();
    }
  };

  const handleToggleSwap = async (id: string, currentStatus: 'visible' | 'hidden') => {
    const nextStatus = currentStatus === 'visible' ? 'hidden' : 'visible';
    const ok = await adminService.toggleSwapStatus(id, nextStatus);
    if (ok) {
      setActionSuccess(isEn ? `Swap offer ${id} switched to "${nextStatus}".` : `Đã chuyển trạng thái tin đổi cây ${id} thành "${nextStatus}".`);
      setTimeout(() => setActionSuccess(null), 3000);
      loadData();
    }
  };

  const handleTriggerAutoPost = async () => {
    setIsTriggeringPost(true);
    setPostTriggerResult(null);
    try {
      const result = await adminService.triggerAutoPostTest();
      setPostTriggerResult(result);
      if (result.success) {
        setActionSuccess(isEn ? 'Successfully triggered post to Fanpage!' : 'Đã kích hoạt đăng bài thành công lên Fanpage!');
        setTimeout(() => setActionSuccess(null), 4000);
      }
      loadData();
    } catch (err: any) {
      setPostTriggerResult({ success: false, error: err?.message || 'Lỗi kết nối' });
    } finally {
      setIsTriggeringPost(false);
    }
  };

  // ----------------------------------------------------
  // GIAO DIỆN CHƯA ĐĂNG NHẬP (ADMIN LOGIN)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-forest-950 text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full bg-charcoal-900/90 backdrop-blur-xl border border-forest-800 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-cream-50">
              {isEn ? 'System Admin Portal' : 'Cổng Quản Trị Viên'}
            </h1>
            <p className="text-xs text-forest-200/80 mt-1">
              {isEn ? 'Moderation & Botanical Operations Control' : 'Hệ thống Kiểm duyệt & Vận hành Yêu Trồng Cây'}
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-950/80 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* 1. Đăng nhập nhanh bằng tài khoản Google Quản trị */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="w-full py-3 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold shadow-md transition flex items-center justify-center gap-2 mb-4 border border-slate-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{isEn ? 'Sign in with Google Admin' : 'Đăng nhập nhanh với Google Admin'}</span>
          </button>

          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-forest-800 w-full"></div>
            <span className="bg-charcoal-900 px-3 text-[11px] text-forest-300 font-medium shrink-0">
              {isEn ? 'or use master credentials' : 'hoặc dùng tài khoản quản trị'}
            </span>
            <div className="border-t border-forest-800 w-full"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cream-200 mb-1.5">
                {isEn ? 'Admin Username' : 'Tài khoản Quản trị'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 bg-forest-900/70 border border-forest-800 rounded-xl text-xs text-cream-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-cream-200 mb-1.5">
                {isEn ? 'Admin Secret / Password' : 'Mật khẩu Quản trị'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 bg-forest-900/70 border border-forest-800 rounded-xl text-xs text-cream-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] rounded-xl text-xs font-bold text-white shadow-lg transition flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{isEn ? 'Verifying...' : 'Đang xác thực...'}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isEn ? 'Log In to Console' : 'Đăng Nhập Quản Trị'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-forest-800/80 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-forest-300 hover:text-emerald-400 transition"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{isEn ? 'Back to Homepage' : 'Quay về Trang chủ'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // GIAO DIỆN BẢNG ĐIỀU KHIỂN QUẢN TRỊ (ADMIN DASHBOARD)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 text-charcoal-900 dark:text-cream-100 transition-colors">
      {/* Top Admin Header Bar */}
      <header className="bg-forest-950 text-white border-b border-forest-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm sm:text-base text-cream-50">
                  Cổng Quản Trị & Kiểm Duyệt
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-700/60">
                  Super Admin
                </span>
              </div>
              <p className="text-[11px] text-forest-300 hidden sm:block">
                Hệ thống dữ liệu Yêu Trồng Cây (Plesk MySQL & Realtime Moderate)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="p-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-forest-200 border border-forest-800 transition"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-xs font-semibold text-cream-100 border border-forest-800 transition flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Xem Web</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 text-xs font-semibold text-red-200 border border-red-800/80 transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng Xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Action feedback toast */}
        {actionSuccess && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 rounded-2xl text-xs font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in duration-200 shadow-sm">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* 1. Overview Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-4 sm:p-5 border border-forest-100 dark:border-forest-800 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider">
                Kho Thực Vật
              </span>
              <div className="text-2xl font-serif font-bold text-forest-950 dark:text-cream-50 mt-1">
                {stats?.total_plants || 50} <span className="text-xs font-sans font-normal text-charcoal-500">loài</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-4 sm:p-5 border border-forest-100 dark:border-forest-800 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider">
                Ca Khám Bệnh AI
              </span>
              <div className="text-2xl font-serif font-bold text-forest-950 dark:text-cream-50 mt-1">
                {stats?.total_clinic_cases || 4} <span className="text-xs font-sans font-normal text-charcoal-500">ca</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-forest-50 dark:bg-forest-950/40 text-forest-700 dark:text-forest-300 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-4 sm:p-5 border border-forest-100 dark:border-forest-800 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider">
                Tin Đổi Cây & Hạt
              </span>
              <div className="text-2xl font-serif font-bold text-forest-950 dark:text-cream-50 mt-1">
                {stats?.total_swaps || 6} <span className="text-xs font-sans font-normal text-charcoal-500">tin</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-4 sm:p-5 border border-forest-100 dark:border-forest-800 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider">
                Báo Cáo Cần Xử Lý
              </span>
              <div className="text-2xl font-serif font-bold text-red-600 dark:text-red-400 mt-1">
                {stats?.pending_reports || 0} <span className="text-xs font-sans font-normal text-charcoal-500">vi phạm</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* 2. Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-forest-100 dark:border-forest-800 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'reports'
                ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-2xs'
                : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Kiểm Duyệt Báo Cáo</span>
            {stats && stats.pending_reports > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-500 text-white">
                {stats.pending_reports}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('clinic')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'clinic'
                ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-2xs'
                : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-800'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Quản Lý Ca Bệnh AI</span>
          </button>

          <button
            onClick={() => setActiveTab('swaps')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'swaps'
                ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-2xs'
                : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Quản Lý Trạm Đổi Cây</span>
          </button>

          <button
            onClick={() => setActiveTab('autopost')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'autopost'
                ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-2xs'
                : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-800'
            }`}
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>Auto-Post Fanpage (08:00 AM)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
              Auto
            </span>
          </button>

          <button
            onClick={() => setActiveTab('new_article')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'new_article'
                ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-2xs'
                : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-800'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Tạo Ấn Phẩm Mới (CIRVA AI)</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-500 dark:text-amber-300 border border-amber-500/40 font-mono">
              AI Check
            </span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'system'
                ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-2xs'
                : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-800'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Thông Tin Hạ Tầng</span>
          </button>
        </div>

        {/* 3. Tab Contents */}

        {/* TAB 1: BÁO CÁO VI PHẠM */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            
            {/* Filter Sub-bar */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                {['all', 'pending', 'action_taken', 'dismissed'].map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setReportFilter(filterKey)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      reportFilter === filterKey
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-white dark:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-300 border border-forest-100 dark:border-forest-800'
                    }`}
                  >
                    {filterKey === 'all' && 'Tất cả báo cáo'}
                    {filterKey === 'pending' && 'Chờ xử lý (Mới)'}
                    {filterKey === 'action_taken' && 'Đã ẩn vi phạm'}
                    {filterKey === 'dismissed' && 'Đã bác bỏ'}
                  </button>
                ))}
              </div>
              <span className="text-xs text-charcoal-500">
                Hiển thị {reports.length} báo cáo
              </span>
            </div>

            {/* Reports list */}
            {reports.length === 0 ? (
              <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-12 text-center border border-forest-100 dark:border-forest-800">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-forest-950 dark:text-cream-50">
                  Hệ thống an toàn, không có báo cáo vi phạm nào
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">
                  Mọi bài đăng của cộng đồng đang tuân thủ quy chuẩn cây trồng an toàn và phi lợi nhuận.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="bg-white dark:bg-charcoal-800 rounded-2xl p-4 sm:p-5 border border-forest-100 dark:border-forest-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-forest-900 dark:text-emerald-400 bg-forest-50 dark:bg-charcoal-700 px-2 py-0.5 rounded-md">
                          {rep.ticket_id}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          rep.status === 'pending'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : rep.status === 'action_taken'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-gray-100 text-gray-700 dark:bg-charcoal-700 dark:text-gray-300'
                        }`}>
                          {rep.status === 'pending' && 'Chờ kiểm duyệt'}
                          {rep.status === 'action_taken' && 'Đã xử lý (Đã ẩn)'}
                          {rep.status === 'dismissed' && 'Đã bác bỏ'}
                          {rep.status === 'reviewed' && 'Đã duyệt hợp lệ'}
                        </span>
                        <span className="text-[11px] text-charcoal-500">
                          Đối tượng: <strong className="text-forest-900 dark:text-cream-100">{rep.target_type}</strong> (ID: {rep.target_id})
                        </span>
                      </div>

                      <p className="text-xs text-charcoal-800 dark:text-cream-100">
                        <strong>Lý do:</strong> {rep.reason}
                        {rep.note && <span className="block mt-1 text-charcoal-600 dark:text-charcoal-300 italic bg-cream-50 dark:bg-charcoal-900/60 p-2 rounded-xl">"{rep.note}"</span>}
                      </p>

                      <div className="text-[11px] text-charcoal-400 flex items-center gap-3">
                        <span>Gửi lúc: {rep.created_at}</span>
                        {rep.reporter_ip && <span>IP: {rep.reporter_ip}</span>}
                      </div>
                    </div>

                    {/* Report action buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {rep.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleUpdateReport(rep.ticket_id, 'action_taken', true)}
                            className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-2xs flex items-center gap-1.5"
                            title="Ẩn bài đăng vi phạm khỏi trang người dùng"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Ẩn bài & Khóa</span>
                          </button>
                          <button
                            onClick={() => handleUpdateReport(rep.ticket_id, 'dismissed', false)}
                            className="px-3 py-2 rounded-xl bg-forest-100 hover:bg-forest-200 dark:bg-charcoal-700 dark:hover:bg-charcoal-600 text-forest-900 dark:text-cream-100 text-xs font-semibold transition"
                            title="Nội dung bình thường, không vi phạm"
                          >
                            <span>Bác bỏ</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleUpdateReport(rep.ticket_id, 'pending', false)}
                          className="px-3 py-1.5 rounded-xl border border-forest-200 dark:border-forest-700 text-xs text-charcoal-600 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-700"
                        >
                          Mở lại
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: QUẢN LÝ BÁC SĨ CÂY */}
        {activeTab === 'clinic' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-forest-950 dark:text-cream-50">
                Danh Sách Ca Bệnh Phòng Khám AI & Bác Sĩ Cây
              </h3>
              <span className="text-xs text-charcoal-500">
                {clinicCases.length} ca bệnh
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {clinicCases.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-charcoal-800 rounded-2xl p-4 sm:p-5 border border-forest-100 dark:border-forest-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-forest-950 dark:text-cream-100">
                        {item.title}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'visible'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {item.status === 'visible' ? 'Đang Hiển Thị' : 'Đã Ẩn'}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
                      {item.description}
                    </p>
                    <div className="text-[11px] text-charcoal-400 flex items-center gap-3">
                      <span>Người hỏi: <strong>{item.user_name}</strong></span>
                      <span>Khu vực: <strong>Miền {item.region}</strong></span>
                      {item.plant_name_hint && <span>Cây: <strong>{item.plant_name_hint}</strong></span>}
                      <span>Ngày tạo: {item.created_at}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => handleToggleClinic(item.id, item.status as 'visible' | 'hidden')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        item.status === 'visible'
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-900'
                          : 'bg-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      {item.status === 'visible' ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Ẩn ca này</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Cho hiển thị</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: QUẢN LÝ TRẠM ĐỔI CÂY */}
        {activeTab === 'swaps' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-forest-950 dark:text-cream-50">
                Tin Rao Đổi Cây & Hạt Giống 3 Miền
              </h3>
              <span className="text-xs text-charcoal-500">
                {swapOffers.length} tin đăng
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {swapOffers.map((sw) => (
                <div
                  key={sw.id}
                  className="bg-white dark:bg-charcoal-800 rounded-2xl p-4 sm:p-5 border border-forest-100 dark:border-forest-800 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-forest-950 dark:text-cream-100">
                        {sw.plant_name}
                      </span>
                      <span className="text-xs text-charcoal-500">
                        ({sw.item_type})
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sw.status === 'visible'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {sw.status === 'visible' ? 'Đang Hiển Thị' : 'Đã Ẩn'}
                      </span>
                    </div>

                    <div className="text-[11px] text-charcoal-500 flex items-center gap-3">
                      <span>Người đăng: <strong>{sw.user_name}</strong></span>
                      <span>Địa điểm: <strong>{sw.location_name}</strong></span>
                      <span>Hình thức: <strong>{sw.offer_type === 'giveaway' ? 'Tặng miễn phí' : 'Trao đổi'}</strong></span>
                      <span>Ngày đăng: {sw.created_at}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => handleToggleSwap(sw.id, sw.status as 'visible' | 'hidden')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        sw.status === 'visible'
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-900'
                          : 'bg-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      {sw.status === 'visible' ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Ẩn tin</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Hiển thị</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: THÔNG TIN HẠ TẦNG */}
        {activeTab === 'system' && (
          <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-2xs space-y-6">
            <div>
              <h3 className="text-base font-serif font-bold text-forest-950 dark:text-cream-50">
                Thông Số Hạ Tầng & Bảo Mật Hệ Thống
              </h3>
              <p className="text-xs text-charcoal-500 mt-1">
                Kiểm tra tình trạng máy chủ Plesk Mắt Bão, phiên bản PHP và kết nối cơ sở dữ liệu.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-cream-50 dark:bg-charcoal-900/60 border border-forest-100 dark:border-forest-800 space-y-2">
                <span className="font-bold text-forest-900 dark:text-cream-100 block">
                  Máy chủ & Môi trường triển khai
                </span>
                <div className="flex justify-between py-1 border-b border-forest-100 dark:border-forest-800">
                  <span className="text-charcoal-500">Môi trường:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Plesk Obsidian / Mắt Bão</span>
                </div>
                <div className="flex justify-between py-1 border-b border-forest-100 dark:border-forest-800">
                  <span className="text-charcoal-500">Phiên bản PHP:</span>
                  <span className="font-mono font-semibold">{stats?.php_version || 'PHP 8.3'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-forest-100 dark:border-forest-800">
                  <span className="text-charcoal-500">Cơ chế Deploy:</span>
                  <span className="font-semibold text-forest-900 dark:text-cream-100">Git Webhook + GitHub Actions</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-charcoal-500">Giờ máy chủ:</span>
                  <span className="font-mono">{stats?.server_time || new Date().toLocaleString('vi-VN')}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cream-50 dark:bg-charcoal-900/60 border border-forest-100 dark:border-forest-800 space-y-2">
                <span className="font-bold text-forest-900 dark:text-cream-100 block">
                  Cơ chế Bảo Mật & Kiểm Duyệt Tự Động
                </span>
                <div className="flex justify-between py-1 border-b border-forest-100 dark:border-forest-800">
                  <span className="text-charcoal-500">Lọc Sách Đỏ & Loài xâm hại:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Đang bật (M5 / H6)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-forest-100 dark:border-forest-800">
                  <span className="text-charcoal-500">Watermark ảnh cộng đồng:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Bảo vệ bản quyền (H15)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-forest-100 dark:border-forest-800">
                  <span className="text-charcoal-500">Quyền riêng tư vị trí:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Làm mờ tọa độ (H8)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-charcoal-500">AI Clinic Engine:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">BYOK Client-Side (100% Free)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TỰ ĐỘNG ĐĂNG BÀI FANPAGE (AUTO-POST 08:00 AM) */}
        {activeTab === 'autopost' && (
          <div className="space-y-6">
            {/* Header tab */}
            <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950 dark:text-cream-50">
                      Điều Phối Tự Động Đăng Bài Fanpage (Facebook Graph API)
                    </h3>
                  </div>
                  <p className="text-xs text-charcoal-500 mt-1 max-w-2xl">
                    Hệ thống tự động phát hiện bài viết mới, luân phiên danh mục động không trùng lặp, tạo bài viết đầy đủ chuyên sâu và kích hoạt thẻ Large Link Card Preview (1200x630) lúc 08:00 sáng mỗi ngày.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTriggerAutoPost}
                    disabled={isTriggeringPost}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm disabled:opacity-60"
                  >
                    {isTriggeringPost ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Đang gửi API...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Đăng Thử Ngay 1 Bài</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Status Alert if trigger result */}
              {postTriggerResult && (
                <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  postTriggerResult.success
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    {postTriggerResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                    <span>
                      {postTriggerResult.success ? 'Đăng bài thành công!' : 'Kết quả thực hiện:'}
                    </span>
                    {postTriggerResult.fb_post_id && (
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-emerald-200/60 dark:bg-emerald-900/60">
                        ID: {postTriggerResult.fb_post_id}
                      </span>
                    )}
                  </div>
                  {postTriggerResult.message && <p>{postTriggerResult.message}</p>}
                  {postTriggerResult.caption_preview && (
                    <div className="p-3 bg-white/80 dark:bg-charcoal-900/80 rounded-xl font-mono text-[11px] whitespace-pre-wrap border border-emerald-100 dark:border-emerald-900 max-h-48 overflow-y-auto">
                      {postTriggerResult.caption_preview}
                    </div>
                  )}
                </div>
              )}

              {/* Overview Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-cream-50 dark:bg-charcoal-900/60 border border-forest-100 dark:border-forest-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-charcoal-500">
                    <span>Hàng đợi URL tổng</span>
                    <span className="font-mono font-bold text-forest-900 dark:text-cream-100">
                      {autoPostStatus?.metrics.total_queued || 0} URL
                    </span>
                  </div>
                  <div className="text-lg font-serif font-bold text-forest-950 dark:text-cream-50">
                    {autoPostStatus?.metrics.posted_count || 0} <span className="text-xs font-sans font-normal text-charcoal-500">đã đăng</span> / {autoPostStatus?.metrics.pending_count || 0} <span className="text-xs font-sans font-normal text-emerald-600">bài mới</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {autoPostStatus?.metrics.categories.map((c) => (
                      <span key={c.category_slug} className="text-[10px] px-2 py-0.5 rounded-md bg-forest-100/70 dark:bg-charcoal-800 text-forest-800 dark:text-cream-200">
                        {c.category_label || c.category_slug}: {c.count}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 dark:bg-charcoal-900/60 border border-forest-100 dark:border-forest-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-charcoal-500">
                    <span>Trạng thái Facebook API</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      autoPostStatus?.config.has_token
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {autoPostStatus?.config.has_token ? 'Đã Kết Nối Token' : 'Chế Độ Simulation'}
                    </span>
                  </div>
                  <div className="text-xs text-charcoal-600 dark:text-charcoal-300 pt-1">
                    Page ID: <strong>{autoPostStatus?.config.page_id || 'Chưa thiết lập'}</strong>
                  </div>
                  <div className="text-xs text-charcoal-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>08:00 AM (Hàng ngày)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cream-50 dark:bg-charcoal-900/60 border border-forest-100 dark:border-forest-800 space-y-1">
                  <div className="flex items-center justify-between text-xs text-charcoal-500">
                    <span>Định dạng hiển thị</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                      1200 x 630 px
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-forest-900 dark:text-cream-100 pt-1">
                    Large Link Card Preview
                  </div>
                  <div className="text-[11px] text-charcoal-500">
                    Tự động nâng phân giải ảnh & Pre-Scrape làm nóng cache Facebook trước khi đăng.
                  </div>
                </div>
              </div>
            </div>

            {/* Next Post Preview */}
            {autoPostStatus?.next_post && (
              <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 border border-emerald-200 dark:border-emerald-900/50 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Bài Viết Kế Tiếp Trong Hàng Đợi (Dự Kiến 08:00 Sáng Mai)
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-forest-100 dark:bg-charcoal-700 text-charcoal-600 dark:text-cream-200">
                    Lần đăng thứ: {(autoPostStatus.next_post.post_count || 0) + 1}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-forest-50/50 dark:bg-charcoal-900/40 border border-forest-100 dark:border-forest-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-forest-950 dark:text-cream-50">
                        {autoPostStatus.next_post.ref_slug}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {autoPostStatus.next_post.category_label || autoPostStatus.next_post.category_slug}
                      </span>
                    </div>
                    <div className="text-xs text-charcoal-500 flex items-center gap-2">
                      <span>URL:</span>
                      <a
                        href={autoPostStatus.next_post.target_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                      >
                        {autoPostStatus.next_post.target_url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="text-xs text-charcoal-400 shrink-0">
                    Đăng gần nhất: {autoPostStatus.next_post.last_posted_at || 'Chưa từng lên sóng (Mới)'}
                  </div>
                </div>
              </div>
            )}

            {/* Recent Logs Table */}
            <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 border border-forest-100 dark:border-forest-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-forest-950 dark:text-cream-50 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                  <span>Nhật Ký Đăng Bài Fanpage Gần Đây</span>
                </h4>
                <span className="text-xs text-charcoal-500">
                  {autoPostStatus?.recent_logs.length || 0} bài gần nhất
                </span>
              </div>

              {(!autoPostStatus?.recent_logs || autoPostStatus.recent_logs.length === 0) ? (
                <div className="py-8 text-center text-xs text-charcoal-400">
                  Chưa có nhật ký bài đăng nào. Bấm nút "Đăng Thử Ngay 1 Bài" ở trên để kiểm tra lần đầu tiên.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-forest-100 dark:border-forest-800 text-charcoal-400 uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 px-3">Ngày</th>
                        <th className="py-2.5 px-3">Bài Viết (Slug)</th>
                        <th className="py-2.5 px-3">Danh Mục</th>
                        <th className="py-2.5 px-3">Góc Viết</th>
                        <th className="py-2.5 px-3">Trạng Thái</th>
                        <th className="py-2.5 px-3">Facebook ID</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-forest-50 dark:divide-forest-900/40">
                      {autoPostStatus.recent_logs.map((log) => (
                        <tr key={log.id} className="hover:bg-forest-50/40 dark:hover:bg-charcoal-700/40 transition">
                          <td className="py-3 px-3 font-mono text-charcoal-600 dark:text-charcoal-300">
                            {log.posted_date}
                          </td>
                          <td className="py-3 px-3 font-bold text-forest-950 dark:text-cream-100">
                            <a
                              href={log.target_url}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-emerald-600 transition flex items-center gap-1"
                            >
                              {log.ref_slug}
                              <ExternalLink className="w-3 h-3 text-charcoal-400" />
                            </a>
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-md text-[10px] bg-forest-100 dark:bg-charcoal-700 text-forest-800 dark:text-cream-200">
                              {log.category_slug}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-mono text-charcoal-500">
                              Angle {log.post_angle}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              log.status === 'success'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : log.status === 'skipped'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                            }`}>
                              {log.status === 'success' ? 'Thành Công' : (log.status === 'skipped' ? 'Đã Bỏ Qua' : 'Lỗi')}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px] text-charcoal-500">
                            {log.fb_post_id ? (
                              <span className="text-emerald-600 dark:text-emerald-400">
                                {log.fb_post_id}
                              </span>
                            ) : (
                              <span className="text-charcoal-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: TẠO BÀI VIẾT MỚI (TÍCH HỢP CIRVA AI CHECK) */}
        {activeTab === 'new_article' && (
          <div className="bg-white dark:bg-charcoal-800 rounded-3xl p-6 sm:p-8 border border-forest-100 dark:border-forest-800 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forest-100 dark:border-charcoal-700">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-serif font-bold text-forest-950 dark:text-cream-50">
                    Soạn Thảo Ấn Phẩm / Tạo Bài Viết Mới
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    CIRVA Active
                  </span>
                </div>
                <p className="text-xs text-charcoal-500 mt-1">
                  Thuật toán CIRVA sẽ tự động kiểm tra tính phù hợp giữa hình ảnh và nội dung bài viết trước khi cho phép xuất bản.
                </p>
              </div>

              {/* Cirva Score Indicator */}
              <div className="flex items-center gap-3 bg-forest-50/50 dark:bg-charcoal-900/50 px-4 py-2 rounded-2xl border border-forest-100 dark:border-charcoal-700">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-charcoal-400">Điểm CIRVA</div>
                  <div className={`text-base font-black font-mono ${
                    imageAlignment.score >= 75
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : imageAlignment.score >= 60
                      ? 'text-amber-500'
                      : 'text-rose-500'
                  }`}>
                    {imageAlignment.score}/100
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  imageAlignment.score >= 75
                    ? 'bg-emerald-500 animate-pulse'
                    : imageAlignment.score >= 60
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`} />
              </div>
            </div>

            {articleSubmitResult && (
              <div className={`p-4 rounded-2xl text-xs flex items-center gap-2 ${
                articleSubmitResult.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
              }`}>
                {articleSubmitResult.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                )}
                <span>{articleSubmitResult.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateArticle} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Chuyên mục */}
                <div>
                  <label className="block text-xs font-bold text-forest-900 dark:text-cream-200 mb-1.5">
                    Chuyên Mục Ấn Phẩm *
                  </label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 dark:border-charcoal-700 bg-forest-50/30 dark:bg-charcoal-900 text-xs text-forest-950 dark:text-cream-50 focus:outline-emerald-500"
                  >
                    <option value="herb">Thảo Dược & Y Học Bản Địa (Herb)</option>
                    <option value="fruit">Cây Ăn Trái Đô Thị (Fruit)</option>
                    <option value="ornamental">Kiểng Lá & Cây Thanh Lọc (Ornamental)</option>
                    <option value="space">Bản Vẽ & Thiết Kế Không Gian Xanh (Space)</option>
                    <option value="recycle">Sáng Chế Xanh & Tái Chế Tự Tuần Hoàn (Recycle)</option>
                    <option value="culinary">Dược Thiện & Ẩm Thực Bản Địa (Culinary)</option>
                    <option value="forest">Rừng & Vườn Quốc Gia Việt Nam (Forest)</option>
                  </select>
                </div>

                {/* Tên bài viết */}
                <div>
                  <label className="block text-xs font-bold text-forest-900 dark:text-cream-200 mb-1.5">
                    Tên Bài Viết / Tên Cây Trồng *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Siro Húng Chanh Quất Mật Ong / Vườn Quốc Gia Ba Bể"
                    value={newArticle.common_name}
                    onChange={(e) => setNewArticle({ ...newArticle, common_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 dark:border-charcoal-700 bg-forest-50/30 dark:bg-charcoal-900 text-xs text-forest-950 dark:text-cream-50 focus:outline-emerald-500"
                  />
                </div>

                {/* Tên khoa học */}
                <div>
                  <label className="block text-xs font-bold text-forest-900 dark:text-cream-200 mb-1.5">
                    Tên Khoa Học / Định Danh Quốc Tế
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Plectranthus amboinicus / Ba Be National Park"
                    value={newArticle.scientific_name}
                    onChange={(e) => setNewArticle({ ...newArticle, scientific_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 dark:border-charcoal-700 bg-forest-50/30 dark:bg-charcoal-900 text-xs text-forest-950 dark:text-cream-50 focus:outline-emerald-500"
                  />
                </div>

                {/* Thời gian sinh trưởng / thi công */}
                <div>
                  <label className="block text-xs font-bold text-forest-900 dark:text-cream-200 mb-1.5">
                    Thời Gian Thu Hoạch / Thi Công
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 45 phút chưng cất / 3 ngày thi công"
                    value={newArticle.growth_time}
                    onChange={(e) => setNewArticle({ ...newArticle, growth_time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 dark:border-charcoal-700 bg-forest-50/30 dark:bg-charcoal-900 text-xs text-forest-950 dark:text-cream-50 focus:outline-emerald-500"
                  />
                </div>
              </div>

              {/* Tóm tắt nội dung */}
              <div>
                <label className="block text-xs font-bold text-forest-900 dark:text-cream-200 mb-1.5">
                  Tóm Tắt Nội Dung / Mô Tả Kỹ Thuật
                </label>
                <textarea
                  rows={3}
                  placeholder="Mô tả công thức, kỹ thuật thiết kế, sinh thái học hoặc dược tính..."
                  value={newArticle.description}
                  onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 dark:border-charcoal-700 bg-forest-50/30 dark:bg-charcoal-900 text-xs text-forest-950 dark:text-cream-50 focus:outline-emerald-500"
                />
              </div>

              {/* KHU VỰC HÌNH ẢNH VÀ WIDGET CIRVA */}
              <div className="p-4 sm:p-5 rounded-2xl border border-forest-200 dark:border-charcoal-700 bg-forest-50/20 dark:bg-charcoal-900/30 space-y-4">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <label className="text-xs font-bold text-forest-900 dark:text-cream-200 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>URL Hình Ảnh Đại Diện *</span>
                    </label>
                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href={generateGoogleImageSearchUrl(newArticle)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 transition"
                      >
                        <Search className="w-3 h-3" />
                        <span>Google Images (Creative Commons)</span>
                      </a>
                      <span className="text-charcoal-300 dark:text-charcoal-700">•</span>
                      <a
                        href={`https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(
                          generateWikiSearchQuery(newArticle)
                        )}&title=Special:MediaSearch&type=image`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 transition"
                      >
                        <Search className="w-3 h-3" />
                        <span>Wikimedia Commons</span>
                      </a>
                    </div>
                  </div>
                  <input
                    type="url"
                    required
                    placeholder="https://upload.wikimedia.org/wikipedia/commons/..."
                    value={newArticle.image_url}
                    onChange={(e) => setNewArticle({ ...newArticle, image_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-900 text-xs text-forest-950 dark:text-cream-50 focus:outline-emerald-500 font-mono"
                  />
                </div>

                {/* BẢNG KẾT QUẢ ĐÁNH GIÁ CIRVA REAL-TIME */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                  {/* Xem trước ảnh */}
                  <div className="md:col-span-1">
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-forest-100 dark:bg-charcoal-800 border border-forest-200 dark:border-charcoal-700 flex items-center justify-center relative">
                      {newArticle.image_url ? (
                        <img
                          src={newArticle.image_url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60"><rect width="100%" height="100%" fill="%23fee2e2"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" fill="%23dc2626">Ảnh Lỗi / 404</text></svg>';
                          }}
                        />
                      ) : (
                        <span className="text-[11px] text-charcoal-400">Chưa nhập ảnh</span>
                      )}
                    </div>
                  </div>

                  {/* Chi tiết phân tích CIRVA */}
                  <div className="md:col-span-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-charcoal-600 dark:text-charcoal-300">
                        Đánh giá tương thích:
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        imageAlignment.isApproved
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : imageAlignment.score >= 60
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {imageAlignment.isApproved
                          ? `✓ ĐẠT CHUẨN CIRVA (${imageAlignment.score}/100)`
                          : imageAlignment.score >= 60
                          ? `⚠ CẢNH BÁO TƯƠNG THÍCH (${imageAlignment.score}/100)`
                          : `✕ TỪ CHỐI BỞI CIRVA (${imageAlignment.score}/100)`}
                      </span>
                    </div>

                    {imageAlignment.issues.length > 0 && (
                      <div className="space-y-1">
                        {imageAlignment.issues.map((iss, idx) => (
                          <div key={idx} className="text-[11px] text-rose-600 dark:text-rose-400 flex items-start gap-1.5 font-medium">
                            <span className="shrink-0">•</span>
                            <span>{iss}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {imageAlignment.suggestions.length > 0 && (
                      <div className="space-y-1 pt-1">
                        {imageAlignment.suggestions.map((sug, idx) => (
                          <div key={idx} className="text-[11px] text-amber-700 dark:text-amber-300 flex items-start gap-1.5">
                            <span className="shrink-0">💡</span>
                            <span>{sug}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {imageAlignment.isApproved && (
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                        ✓ Hình ảnh hoàn toàn đáp ứng tiêu chí định danh và bối cảnh chuyên mục.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Nút gửi */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-forest-100 dark:border-charcoal-700">
                <button
                  type="button"
                  onClick={() => setNewArticle({
                    category: 'herb',
                    common_name: '',
                    scientific_name: '',
                    description: '',
                    image_url: '',
                    sunlight: 'full_sun',
                    watering: 'moderate',
                    propagation_difficulty: 1,
                    growth_time: '60 ngày'
                  })}
                  className="px-4 py-2.5 rounded-xl border border-forest-200 dark:border-charcoal-700 text-xs font-bold text-charcoal-600 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-700 transition"
                >
                  Xóa Làm Lại
                </button>

                <button
                  type="submit"
                  disabled={!imageAlignment.isApproved || isSubmittingArticle || !newArticle.common_name}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    imageAlignment.isApproved && !isSubmittingArticle && newArticle.common_name
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm cursor-pointer'
                      : 'bg-charcoal-200 dark:bg-charcoal-700 text-charcoal-400 dark:text-charcoal-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmittingArticle ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Đang Ghi Nhận & Dịch Song Ngữ...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Xuất Bản Bài Viết Mới (CIRVA Phê Duyệt)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};
