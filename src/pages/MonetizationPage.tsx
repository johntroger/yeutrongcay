import React from 'react';
import { Link } from 'react-router-dom';
import { MonetizationSection } from '../components/MonetizationSection.tsx';
import { useSEO } from '../utils/useSEO.ts';
import { Home, ChevronRight, Coins } from 'lucide-react';

export const MonetizationPage: React.FC = () => {
  useSEO({
    title: 'Bí Quyết Khởi Nghiệp & Tạo Thu Nhập Từ Vườn Đô Thị | Yêu Trồng Cây',
    description: 'Chiến lược tạo thu nhập bền vững từ nông nghiệp ban công sân thượng: bán cành giâm, nhân giống dược liệu, sấy thảo mộc và tư vấn thiết kế vườn.',
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
            <Coins className="w-3.5 h-3.5 text-terracotta-600" />
            <span>Bí Quyết Kiếm Tiền Từ Vườn</span>
          </span>
        </nav>
      </div>

      {/* Main Dedicated Content */}
      <main className="flex-1">
        <MonetizationSection />
      </main>
    </div>
  );
};
