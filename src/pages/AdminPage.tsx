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
  Home
} from 'lucide-react';
import { adminService, AdminStats, AdminReport, AdminClinicCase, AdminSwapOffer } from '../services/adminService.ts';
import { useSEO } from '../utils/useSEO.ts';

export const AdminPage: React.FC = () => {
  useSEO({
    title: 'Cổng Quản Trị & Kiểm Duyệt Nội Dung | Yêu Trồng Cây',
    description: 'Bảng điều khiển quản trị viên hệ thống Yêu Trồng Cây. Kiểm duyệt báo cáo vi phạm, quản lý ca bệnh và tin trao đổi cây.'
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(adminService.isAuthenticated());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [activeTab, setActiveTab] = useState<'reports' | 'clinic' | 'swaps' | 'system'>('reports');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [reports, setReports] = useState<AdminReport[]>([]);
  const [reportFilter, setReportFilter] = useState<string>('all');
  const [clinicCases, setClinicCases] = useState<AdminClinicCase[]>([]);
  const [swapOffers, setSwapOffers] = useState<AdminSwapOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [s, r, c, sw] = await Promise.all([
        adminService.getStats(),
        adminService.getReports(reportFilter),
        adminService.getClinicCases(),
        adminService.getSwaps()
      ]);
      setStats(s);
      setReports(r);
      setClinicCases(c);
      setSwapOffers(sw);
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
      setLoginError(result.message || 'Đăng nhập không thành công');
    }
  };

  const handleLogout = () => {
    adminService.logout();
    setIsAuthenticated(false);
  };

  const handleUpdateReport = async (ticketId: string, status: string, hideTarget: boolean) => {
    const ok = await adminService.updateReport(ticketId, status, hideTarget);
    if (ok) {
      setActionSuccess(`Đã cập nhật báo cáo ${ticketId} thành công.`);
      setTimeout(() => setActionSuccess(null), 3500);
      loadData();
    }
  };

  const handleToggleClinic = async (id: string, currentStatus: 'visible' | 'hidden') => {
    const nextStatus = currentStatus === 'visible' ? 'hidden' : 'visible';
    const ok = await adminService.toggleClinicStatus(id, nextStatus);
    if (ok) {
      setActionSuccess(`Đã chuyển trạng thái ca bệnh ${id} thành "${nextStatus}".`);
      setTimeout(() => setActionSuccess(null), 3000);
      loadData();
    }
  };

  const handleToggleSwap = async (id: string, currentStatus: 'visible' | 'hidden') => {
    const nextStatus = currentStatus === 'visible' ? 'hidden' : 'visible';
    const ok = await adminService.toggleSwapStatus(id, nextStatus);
    if (ok) {
      setActionSuccess(`Đã chuyển trạng thái tin đổi cây ${id} thành "${nextStatus}".`);
      setTimeout(() => setActionSuccess(null), 3000);
      loadData();
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
            <h1 className="text-2xl font-serif font-bold text-cream-50">Cổng Quản Trị Viên</h1>
            <p className="text-xs text-forest-200/80 mt-1">
              Hệ thống Kiểm duyệt & Vận hành Yêu Trồng Cây
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-950/80 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cream-200 mb-1.5">
                Tài khoản Quản trị
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
                Mật khẩu Quản trị (Admin Secret)
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
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Đăng Nhập Quản Trị</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-forest-800/80 text-center">
            <p className="text-[11px] text-forest-300/70">
              Mã quản trị mặc định: <code className="bg-forest-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono">ytc_admin_master_2026</code>
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-forest-300 hover:text-emerald-400 transition mt-3"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Quay về Trang chủ</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
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

      </main>
    </div>
  );
};
