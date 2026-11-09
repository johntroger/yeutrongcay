import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Sprout } from 'lucide-react';
import { PlantCategory, UserProfile } from './types/index.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { PrivacyModal } from './components/PrivacyModal.tsx';
import { OfflineBanner } from './components/OfflineBanner.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';
import { trackPageView } from './utils/analytics.ts';
import { useLanguage } from './context/LanguageContext';
import { subscribeToAuthState, logoutFirebase } from './services/firebaseClient.ts';
import { savePlantToMyGarden } from './services/apiService.ts';

// Code-splitting các trang thứ cấp để giảm bundle khởi tạo và tăng tốc độ tải
const CategoryPage = lazy(() => import('./pages/CategoryPage.tsx').then((m) => ({ default: m.CategoryPage })));
const SwapPage = lazy(() => import('./pages/SwapPage.tsx').then((m) => ({ default: m.SwapPage })));
const ClinicPage = lazy(() => import('./pages/ClinicPage.tsx').then((m) => ({ default: m.ClinicPage })));
const MonetizationPage = lazy(() => import('./pages/MonetizationPage.tsx').then((m) => ({ default: m.MonetizationPage })));
const Web3Page = lazy(() => import('./pages/Web3Page.tsx').then((m) => ({ default: m.Web3Page })));
const ContactPage = lazy(() => import('./pages/ContactPage.tsx').then((m) => ({ default: m.ContactPage })));
const GardenPage = lazy(() => import('./pages/GardenPage.tsx').then((m) => ({ default: m.GardenPage })));
const PlantDetailPage = lazy(() => import('./pages/PlantDetailPage.tsx').then((m) => ({ default: m.PlantDetailPage })));
const AdminPage = lazy(() => import('./pages/AdminPage.tsx').then((m) => ({ default: m.AdminPage })));
const SeasonalCalendarPage = lazy(() => import('./pages/SeasonalCalendarPage.tsx').then((m) => ({ default: m.SeasonalCalendarPage })));
const PublicProfilePage = lazy(() => import('./pages/PublicProfilePage.tsx').then((m) => ({ default: m.PublicProfilePage })));
const MonetizationCategoryPage = lazy(() => import('./pages/monetization/MonetizationCategoryPage.tsx').then((m) => ({ default: m.MonetizationCategoryPage })));
const MyGardenModal = lazy(() => import('./components/MyGardenModal.tsx').then((m) => ({ default: m.MyGardenModal })));
const MonetizationArticlePage = lazy(() => import('./pages/monetization/MonetizationArticlePage.tsx').then((m) => ({ default: m.MonetizationArticlePage })));

// Loading fallback chuẩn botanical cho Suspense
function PageLoadingFallback({ isEn }: { isEn: boolean }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 animate-pulse">
          <Sprout className="w-7 h-7" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {isEn ? 'Loading botanical interface...' : 'Đang tải dữ liệu thực vật học...'}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {isEn ? 'Preparing your digital garden' : 'Chuẩn bị không gian vườn số'}
      </p>
    </div>
  );
}

// Wrapper xử lý danh mục động
function DynamicCategoryWrapper({
  setCategory,
  render,
}: {
  setCategory: (cat: PlantCategory) => void;
  render: (cat: PlantCategory) => JSX.Element;
}) {
  const { cat } = useParams<{ cat: string }>();
  let mode: PlantCategory = 'herb';
  if (cat === 'cay-an-trai' || cat === 'fruit') mode = 'fruit';
  else if (cat === 'cay-canh' || cat === 'ornamental') mode = 'ornamental';
  else if (cat === 'khong-gian-xanh' || cat === 'thiet-ke-khong-gian' || cat === 'space') mode = 'space';
  else if (cat === 'sang-che-tai-che' || cat === 'tai-che' || cat === 'recycle') mode = 'recycle';
  else if (cat === 'am-thuc-duoc-thien' || cat === 'duoc-thien' || cat === 'culinary') mode = 'culinary';
  else if (cat === 'vuon-quoc-gia' || cat === 'rung-viet-nam' || cat === 'forest') mode = 'forest';
  else if (cat) mode = cat as PlantCategory;

  useEffect(() => {
    setCategory(mode);
  }, [mode, setCategory]);

  return render(mode);
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isEn } = useLanguage();

  // Xác định activeMode ban đầu dựa trên URL hiện tại
  const [activeMode, setActiveMode] = useState<PlantCategory>(() => {
    const path = window.location.pathname;
    if (path.includes('cay-an-trai') || path.includes('fruit')) return 'fruit';
    if (path.includes('cay-canh') || path.includes('ornamental')) return 'ornamental';
    if (path.includes('khong-gian-xanh') || path.includes('space')) return 'space';
    if (path.includes('sang-che-tai-che') || path.includes('recycle')) return 'recycle';
    if (path.includes('am-thuc-duoc-thien') || path.includes('culinary')) return 'culinary';
    if (path.includes('vuon-quoc-gia') || path.includes('forest')) return 'forest';
    return 'herb';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Trạng thái Người Dùng & Vườn Của Tôi (Mặc định null để hiển thị nút Đăng Nhập)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ytc_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u && u.id && !u.id.includes('demo-01')) {
          return u;
        }
      } catch {
        // Fallback
      }
    }
    return null;
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMyGardenOpen, setIsMyGardenOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutFirebase();
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('ytc_user');
    setCurrentUser(null);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ytc_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Lắng nghe phiên đăng nhập Firebase Auth tự động
  useEffect(() => {
    const unsubscribe = subscribeToAuthState((fbUser) => {
      if (fbUser) {
        setCurrentUser(fbUser);
      }
    });
    return () => unsubscribe();
  }, []);

  // Cập nhật title SEO theo URL & Ngôn ngữ
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/thao-duoc') {
      document.title = isEn
        ? 'Green Pharmacy (Native Herbs) | Yeu Trong Cay'
        : 'Tủ Thuốc Xanh (Thảo Dược Bản Địa) | Yêu Trồng Cây';
      setActiveMode('herb');
    } else if (path === '/cay-an-trai') {
      document.title = isEn
        ? 'Urban Sweet Fruit (Balcony Fruit Trees) | Yeu Trong Cay'
        : 'Trái Ngọt Phố (Cây Ăn Quả Ban Công) | Yêu Trồng Cây';
      setActiveMode('fruit');
    } else if (path === '/cay-canh') {
      document.title = isEn
        ? 'Ornamentals & Bonsai Serenity | Yeu Trong Cay'
        : 'Cây Cảnh & Bonsai Thư Thái | Yêu Trồng Cây';
      setActiveMode('ornamental');
    } else if (path === '/trao-doi-cay') {
      document.title = isEn
        ? 'Plant & Seed Community Swap Station | Yeu Trong Cay'
        : 'Trạm Trao Đổi Cây & Hạt Giống | Yêu Trồng Cây';
    } else if (path === '/bac-si-cay-trong') {
      document.title = isEn
        ? 'AI Plant Clinic (Instant Diagnostics) | Yeu Trong Cay'
        : 'Hội Quán Bác Sĩ Cây Trồng (AI 3s) | Yêu Trồng Cây';
    } else if (path === '/lien-he') {
      document.title = isEn
        ? 'Contact & Community Knowledge Hub | Yeu Trong Cay'
        : 'Liên Hệ & Đóng Góp Tri Thức | Yêu Trồng Cây';
    } else if (path === '/web3-sandbox') {
      document.title = isEn
        ? 'Digital Plant Passport Web3 Sandbox | Yeu Trong Cay'
        : 'Hộ Chiếu Cây Số Web3 Sandbox | Yêu Trồng Cây';
    } else if (path === '/vuon-cua-toi' || path === '/khu-vuon-cua-toi') {
      document.title = isEn
        ? 'My Digital Garden & Urban Diary | Yeu Trong Cay'
        : 'Vườn Số Của Tôi & Nhật Ký Cây Trồng Đô Thị | Yêu Trồng Cây';
    } else if (path === '/kiem-tien-tu-vuon') {
      document.title = isEn
        ? 'Urban Garden Economics & Monetization | Yeu Trong Cay'
        : 'Kinh Tế Vườn Ban Công & Khởi Nghiệp Xanh | Yêu Trồng Cây';
    }

  }, [location.pathname, isEn]);

  // Gửi sự kiện Page View về GA4 chỉ khi đổi trang (không tính thao tác lọc trên cùng trang)
  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);


  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-950 text-charcoal-900 dark:text-cream-100 flex flex-col font-sans transition-colors duration-200 pb-16 md:pb-0">
      {/* 1. Header Navigation */}
      <Navbar
        onModeChange={(mode) => {
          setActiveMode(mode);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenClinic={() => {
          navigate('/bac-si-cay-trong');
        }}
        onOpenWeb3={() => {
          navigate('/web3-sandbox');
        }}
        onOpenSwapMap={() => {
          navigate('/trao-doi-cay');
        }}
        onOpenContact={() => {
          navigate('/lien-he');
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenMyGarden={() => {
          if (currentUser) {
            setIsMyGardenOpen(true);
          } else {
            setIsAuthOpen(true);
          }
        }}
      />

      {/* 2. Main Router Pages với Suspense code-splitting */}
      <div className="flex-1">
        <Suspense fallback={<PageLoadingFallback isEn={isEn} />}>
          <Routes>
            {/* Trang chủ mặc định */}
            <Route
              path="/"
              element={
                <HomePage
                  activeMode={activeMode}
                  onModeChange={setActiveMode}
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />

            {/* 7 URL Chuyên mục riêng biệt (Mỗi category 1 URL độc lập, chuẩn SEO) */}
            <Route
              path="/thao-duoc"
              element={
                <CategoryPage
                  category="herb"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />
            <Route
              path="/cay-an-trai"
              element={
                <CategoryPage
                  category="fruit"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />
            <Route
              path="/cay-canh"
              element={
                <CategoryPage
                  category="ornamental"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />
            <Route
              path="/khong-gian-xanh"
              element={
                <CategoryPage
                  category="space"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />
            <Route
              path="/thiet-ke-khong-gian"
              element={
                <CategoryPage
                  category="space"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />
            <Route
              path="/sang-che-tai-che"
              element={
                <CategoryPage
                  category="recycle"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />
            <Route
              path="/tai-che"
              element={
                <CategoryPage
                  category="recycle"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />
            <Route
              path="/am-thuc-duoc-thien"
              element={
                <CategoryPage
                  category="culinary"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />
            <Route
              path="/duoc-thien"
              element={
                <CategoryPage
                  category="culinary"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />
            <Route
              path="/vuon-quoc-gia"
              element={
                <CategoryPage
                  category="forest"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />
            <Route
              path="/rung-viet-nam"
              element={
                <CategoryPage
                  category="forest"
                  searchQuery={searchQuery}
                  onClearSearch={() => setSearchQuery('')}
                />
              }
            />

            {/* Alias /danh-muc/:cat */}
            <Route
              path="/danh-muc/:cat"
              element={
                <DynamicCategoryWrapper
                  setCategory={setActiveMode}
                  render={(cat) => (
                    <CategoryPage
                      category={cat}
                      searchQuery={searchQuery}
                      onClearSearch={() => setSearchQuery('')}
                    />
                  )}
                />
              }
            />

            {/* URL Riêng Biệt Cho Mỗi Bài Viết / Loài Cây */}
            <Route
              path="/cay/:slug"
              element={
                <PlantDetailPage
                  onOpenMyGarden={() => setIsMyGardenOpen(true)}
                  onAddPlantToGarden={(plant) => {
                    savePlantToMyGarden(plant);
                  }}
                />
              }
            />

            {/* Các Tính Năng Chuyên Sâu Độc Lập - Giải Phóng Cho Trang Chủ */}
            <Route path="/vuon-cua-toi" element={<GardenPage currentUser={currentUser} />} />
            <Route path="/khu-vuon-cua-toi" element={<GardenPage currentUser={currentUser} />} />
            <Route path="/trao-doi-cay" element={<SwapPage />} />
            <Route path="/bac-si-cay-trong" element={<ClinicPage />} />
            <Route path="/kiem-tien-tu-vuon" element={<MonetizationPage />} />
            <Route path="/web3-sandbox" element={<Web3Page />} />
            <Route path="/lien-he" element={<ContactPage />} />
            <Route path="/lich-nong-vu" element={<SeasonalCalendarPage />} />
            <Route path="/admin" element={<AdminPage />} />

            {/* Các Đường Dẫn Rút Gọn & Alias Điều Hướng Thân Thiện (Tránh bị rơi vào Profile) */}
            <Route path="/benh-cay" element={<Navigate to="/bac-si-cay-trong" replace />} />
            <Route path="/bac-si-cay" element={<Navigate to="/bac-si-cay-trong" replace />} />
            <Route path="/doi-cay" element={<Navigate to="/trao-doi-cay" replace />} />
            <Route path="/web3" element={<Navigate to="/web3-sandbox" replace />} />

            {/* 6 Chuyên Mục Kinh Tế Xanh & Nông Nghiệp Đô Thị Độc Lập Cấp 1 */}
            <Route path="/vuon-uom-nhan-giong" element={<MonetizationCategoryPage categorySlug="vuon-uom-nhan-giong" />} />
            <Route path="/che-bien-sau-duoc-lieu" element={<MonetizationCategoryPage categorySlug="che-bien-sau-duoc-lieu" />} />
            <Route path="/dich-vu-setup-ban-cong" element={<MonetizationCategoryPage categorySlug="dich-vu-setup-ban-cong" />} />
            <Route path="/kinh-te-tuan-hoan" element={<MonetizationCategoryPage categorySlug="kinh-te-tuan-hoan" />} />
            <Route path="/canh-tac-sieu-toc" element={<MonetizationCategoryPage categorySlug="canh-tac-sieu-toc" />} />
            <Route path="/nong-nghiep-thong-minh" element={<MonetizationCategoryPage categorySlug="nong-nghiep-thong-minh" />} />

            {/* Toàn bộ 24 Bài Viết Chuyên Sâu (Pillar & Sub-articles) chạy qua Route 2 phân đoạn Silo */}
            <Route path="/:categorySlug/:slug" element={<MonetizationArticlePage />} />

            {/* Hồ Sơ Cá Nhân & Bộ Sưu Tập NFT Công Khai Định Danh Theo Email (VD: /tranthanhtung37) */}
            <Route path="/:username" element={<PublicProfilePage currentUser={currentUser} />} />

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>

      {/* 3. Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenContact={() => {
          navigate('/lien-he');
        }}
      />

      {/* 4. Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
        }}
      />

      {/* 5. My Digital Garden Modal */}
      {currentUser && isMyGardenOpen && (
        <Suspense fallback={null}>
          <MyGardenModal
            isOpen={isMyGardenOpen}
            onClose={() => setIsMyGardenOpen(false)}
            user={currentUser}
            onOpenWeb3ForPlant={(plantName) => {
              setIsMyGardenOpen(false);
              navigate('/web3-sandbox');
              console.log('Open Web3 for plant:', plantName);
            }}
          />
        </Suspense>
      )}

      {/* 6. Privacy & Medical Disclaimer Modal (H13) */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* 7. Offline-First Network Banner */}
      <OfflineBanner />

      {/* 8. Mobile Bottom Navigation Bar (Thumb Zone) */}
      <MobileBottomNav />
    </div>
  );
}
