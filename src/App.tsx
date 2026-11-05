import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { PlantCategory, UserProfile } from './types/index.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { CategoryPage } from './pages/CategoryPage.tsx';
import { SwapPage } from './pages/SwapPage.tsx';
import { ClinicPage } from './pages/ClinicPage.tsx';
import { MonetizationPage } from './pages/MonetizationPage.tsx';
import { Web3Page } from './pages/Web3Page.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { GardenPage } from './pages/GardenPage.tsx';
import { PlantDetailPage } from './pages/PlantDetailPage.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { MyGardenModal } from './components/MyGardenModal.tsx';
import { PrivacyModal } from './components/PrivacyModal.tsx';
import { OfflineBanner } from './components/OfflineBanner.tsx';

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

  useEffect(() => {
    setCategory(mode);
  }, [mode, setCategory]);

  return render(mode);
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Xác định activeMode ban đầu dựa trên URL hiện tại
  const [activeMode, setActiveMode] = useState<PlantCategory>(() => {
    const path = window.location.pathname;
    if (path.includes('cay-an-trai')) return 'fruit';
    if (path.includes('cay-canh')) return 'ornamental';
    return 'herb';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Cỡ chữ đa thế hệ cho người lớn tuổi (Accessibility 50-75 tuổi)
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const handleToggleFontSize = () => {
    setFontSize((curr) => (curr === 'normal' ? 'large' : curr === 'large' ? 'xlarge' : 'normal'));
  };

  // Trạng thái Người Dùng & Vườn Của Tôi
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ytc_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return {
      id: 'usr-demo-01',
      name: 'Trần Tùng',
      email: 'trantung.gardener@gmail.com',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Chủ Vườn Tiên Phong',
      karma_points: 120,
      joined_date: '04/11/2026',
    };
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMyGardenOpen, setIsMyGardenOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ytc_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Cập nhật title SEO theo URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/thao-duoc') {
      document.title = 'Tủ Thuốc Xanh (Thảo Dược Bản Địa) | Yêu Trồng Cây';
      setActiveMode('herb');
    } else if (path === '/cay-an-trai') {
      document.title = 'Trái Ngọt Phố (Cây Ăn Quả Ban Công) | Yêu Trồng Cây';
      setActiveMode('fruit');
    } else if (path === '/cay-canh') {
      document.title = 'Cây Cảnh & Bonsai Thư Thái | Yêu Trồng Cây';
      setActiveMode('ornamental');
    } else if (path === '/trao-doi-cay') {
      document.title = 'Trạm Trao Đổi Cây & Hạt Giống | Yêu Trồng Cây';
    } else if (path === '/bac-si-cay-trong') {
      document.title = 'Hội Quán Bác Sĩ Cây Trồng (AI 3s) | Yêu Trồng Cây';
    } else if (path === '/lien-he') {
      document.title = 'Liên Hệ & Đóng Góp Tri Thức | Yêu Trồng Cây';
    } else if (path === '/web3-sandbox') {
      document.title = 'Hộ Chiếu Cây Số Web3 Sandbox | Yêu Trồng Cây';
    }
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Lớp CSS theo cỡ chữ
  const fontScaleStyle =
    fontSize === 'xlarge' ? { fontSize: '118%' } : fontSize === 'large' ? { fontSize: '108%' } : {};

  return (
    <div
      style={fontScaleStyle}
      className="min-h-screen bg-cream-100 flex flex-col font-sans transition-all duration-200"
    >
      {/* 1. Header Navigation */}
      <Navbar
        activeMode={activeMode}
        onModeChange={(mode) => {
          setActiveMode(mode);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenClinic={() => {
          if (location.pathname === '/' || location.pathname === '/thao-duoc') {
            scrollToSection('clinic');
          } else {
            navigate('/bac-si-cay-trong');
          }
        }}
        onOpenWeb3={() => {
          if (location.pathname === '/' || location.pathname === '/thao-duoc') {
            scrollToSection('web3');
          } else {
            navigate('/web3-sandbox');
          }
        }}
        onOpenSwapMap={() => {
          if (location.pathname === '/' || location.pathname === '/thao-duoc') {
            scrollToSection('swap-map');
          } else {
            navigate('/trao-doi-cay');
          }
        }}
        onOpenContact={() => {
          if (location.pathname === '/' || location.pathname === '/thao-duoc') {
            scrollToSection('contact');
          } else {
            navigate('/lien-he');
          }
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenMyGarden={() => {
          if (currentUser) {
            setIsMyGardenOpen(true);
          } else {
            setIsAuthOpen(true);
          }
        }}
        fontSize={fontSize}
        onToggleFontSize={handleToggleFontSize}
      />

      {/* 2. Main Router Pages */}
      <div className="flex-1">
        <Routes>
          {/* Trang chủ mặc định */}
          <Route
            path="/"
            element={
              <HomePage
                activeMode={activeMode}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery('')}
              />
            }
          />

          {/* 3 URL Danh mục riêng biệt (Mở tab độc lập giải phóng trang chủ) */}
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
                onAddPlantToGarden={(plantId) => {
                  console.log('Added plant to garden:', plantId);
                }}
              />
            }
          />

          {/* Các Tính Năng Chuyên Sâu Độc Lập - Giải Phóng Cho Trang Chủ */}
          <Route path="/vuon-cua-toi" element={<GardenPage />} />
          <Route path="/trao-doi-cay" element={<SwapPage />} />
          <Route path="/bac-si-cay-trong" element={<ClinicPage />} />
          <Route path="/kiem-tien-tu-vuon" element={<MonetizationPage />} />
          <Route path="/web3-sandbox" element={<Web3Page />} />
          <Route path="/lien-he" element={<ContactPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* 3. Footer */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenContact={() => {
          if (location.pathname === '/' || location.pathname === '/thao-duoc') {
            scrollToSection('contact');
          } else {
            navigate('/lien-he');
          }
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
      {currentUser && (
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
      )}

      {/* 6. Privacy & Medical Disclaimer Modal (H13) */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* 7. Offline-First Network Banner */}
      <OfflineBanner />
    </div>
  );
}
