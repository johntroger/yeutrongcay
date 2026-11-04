import React from 'react';
import { Link } from 'react-router-dom';
import { ContactSection } from '../components/ContactSection.tsx';
import { useSEO } from '../utils/useSEO.ts';
import { Home, ChevronRight, MessageCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  useSEO({
    title: 'Liên Hệ & Đóng Góp Tri Thức Thực Vật | Yêu Trồng Cây',
    description: 'Kênh liên hệ chính thức của cộng đồng Yêu Trồng Cây. Góp ý chuyên môn dược học, đề xuất bảo tồn nguồn gen bản địa hoặc kết nối hợp tác.',
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
            <MessageCircle className="w-3.5 h-3.5 text-forest-700" />
            <span>Liên Hệ & Hợp Tác</span>
          </span>
        </nav>
      </div>

      {/* Main Dedicated Content */}
      <main className="flex-1">
        <ContactSection />
      </main>
    </div>
  );
};
