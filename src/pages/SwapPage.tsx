import React from 'react';
import { Link } from 'react-router-dom';
import { PlantSwapSection } from '../components/PlantSwapSection.tsx';
import { useSEO } from '../utils/useSEO.ts';
import { Home, ChevronRight, MapPin } from 'lucide-react';

export const SwapPage: React.FC = () => {
  useSEO({
    title: 'Trạm Trao Đổi Cây & Hạt Giống Bản Địa An Toàn | Yêu Trồng Cây',
    description: 'Nền tảng kết nối trao đổi giống cây, cành giâm và hạt giống sạch ba miền Bắc - Trung - Nam với cam kết kiểm dịch 7 ngày an toàn.',
  });

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="hover:text-forest-950 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" />
            <span>Trang Chủ</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
          <span className="font-bold text-forest-950 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Trạm Trao Đổi Cây & Hạt Giống</span>
          </span>
        </nav>
      </div>

      {/* Main Dedicated Content */}
      <main className="flex-1">
        <PlantSwapSection />
      </main>
    </div>
  );
};
