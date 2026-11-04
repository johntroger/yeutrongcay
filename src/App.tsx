import { useState, useMemo, useEffect } from 'react';
import { PlantCategory, Plant, UserProfile } from './types/index.ts';
import { SEED_PLANTS } from './data/plants.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { MedicalDisclaimer } from './components/MedicalDisclaimer.tsx';
import { PlantCard } from './components/PlantCard.tsx';
import { PlantModal } from './components/PlantModal.tsx';
import { PlantClinicSection } from './components/PlantClinicSection.tsx';
import { MonetizationSection } from './components/MonetizationSection.tsx';
import { Web3SandboxSection } from './components/Web3SandboxSection.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { MyGardenModal } from './components/MyGardenModal.tsx';
import { Footer } from './components/Footer.tsx';
import { Filter, Sparkles } from 'lucide-react';

export default function App() {
  const [activeMode, setActiveMode] = useState<PlantCategory>('herb');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

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
    // Mặc định tạo tài khoản demo để người dùng trải nghiệm ngay
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

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ytc_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Lọc cây theo chế độ vườn đang chọn và từ khóa tìm kiếm
  const filteredPlants = useMemo(() => {
    return SEED_PLANTS.filter((plant) => {
      // Khớp chế độ vườn
      const matchesCategory = plant.category === activeMode;

      // Khớp từ khóa tìm kiếm (tên, tên khoa học, tên địa phương, công dụng)
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        plant.common_name.toLowerCase().includes(q) ||
        plant.scientific_name.toLowerCase().includes(q) ||
        plant.aliases.some((a) => a.toLowerCase().includes(q)) ||
        plant.tags.some((t) => t.toLowerCase().includes(q)) ||
        (plant.medical_info?.uses.some((u) => u.toLowerCase().includes(q)) ?? false);

      return matchesCategory && matchesSearch;
    });
  }, [activeMode, searchQuery]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col font-sans">
      
      {/* 1. Header Navigation */}
      <Navbar
        activeMode={activeMode}
        onModeChange={(mode) => {
          setActiveMode(mode);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenClinic={() => scrollToSection('clinic')}
        onOpenWeb3={() => scrollToSection('web3')}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenMyGarden={() => {
          if (currentUser) {
            setIsMyGardenOpen(true);
          } else {
            setIsAuthOpen(true);
          }
        }}
      />

      {/* 2. Hero Section adapting to Garden Mode */}
      <Hero
        activeMode={activeMode}
        onExploreMonetization={() => scrollToSection('monetization')}
        onOpenClinic={() => scrollToSection('clinic')}
      />

      {/* 3. Medical Disclaimer (Always visible for Herbs) */}
      {activeMode === 'herb' && <MedicalDisclaimer />}

      {/* 4. Plants Catalog Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-forest-100">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 tracking-tight">
              {activeMode === 'herb'
                ? 'Danh Mục Thảo Dược & Cây Thực Phẩm'
                : activeMode === 'fruit'
                ? 'Danh Mục Cây Ăn Trái Đô Thị'
                : 'Danh Mục Cây Cảnh & Bonsai Thư Thái'}
            </h2>
            <p className="text-xs sm:text-sm text-forest-700 mt-1">
              Hiển thị {filteredPlants.length} loài thực vật bản địa chuẩn hóa
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-forest-800 bg-white px-3.5 py-2 rounded-xl border border-forest-100 shadow-sm">
            <Filter className="w-4 h-4 text-herbal-600" />
            <span className="hidden sm:inline">Phân Loại:</span>
            <span className="capitalize">{activeMode}</span>
          </div>
        </div>

        {/* Grid display */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onSelect={(p) => setSelectedPlant(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-forest-100 p-8 max-w-md mx-auto">
            <Sparkles className="w-10 h-10 text-forest-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-forest-900 mb-1">
              Không tìm thấy cây phù hợp
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Thử tìm kiếm với tên khác hoặc chuyển sang chế độ vườn khác.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-forest-900 text-white rounded-xl text-xs font-medium"
            >
              Xem tất cả cây
            </button>
          </div>
        )}
      </main>

      {/* 5. Plant Clinic Section (Bác sĩ cây trồng 1-chạm) */}
      <PlantClinicSection />

      {/* 6. Monetization Section (Biến đam mê thành tiền) */}
      <MonetizationSection />

      {/* 7. Web3 Sandbox Section (Trải nghiệm học tập 100% miễn phí) */}
      <Web3SandboxSection />

      {/* 8. Footer */}
      <Footer />

      {/* 9. Plant Detail Modal */}
      <PlantModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
      />

      {/* 10. Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
        }}
      />

      {/* 11. My Digital Garden Modal */}
      {currentUser && (
        <MyGardenModal
          isOpen={isMyGardenOpen}
          onClose={() => setIsMyGardenOpen(false)}
          user={currentUser}
          onOpenWeb3ForPlant={(plantName) => {
            setIsMyGardenOpen(false);
            scrollToSection('web3');
            console.log('Open Web3 for plant:', plantName);
          }}
        />
      )}

    </div>
  );
}
