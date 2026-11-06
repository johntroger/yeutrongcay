import React from 'react';
import { Link } from 'react-router-dom';
import { ContactSection } from '../components/ContactSection.tsx';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Home, ChevronRight, MessageCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t, isEn } = useLanguage();

  useSEO({
    title: isEn
      ? 'Contact & Botanical Knowledge Contribution | Yeu Trong Cay'
      : 'Liên Hệ & Đóng Góp Tri Thức Thực Vật | Yêu Trồng Cây',
    description: isEn
      ? 'Official contact channel for Yeu Trong Cay community. Botanical feedback, indigenous genetic conservation, and nursery partnerships.'
      : 'Kênh liên hệ chính thức của cộng đồng Yêu Trồng Cây. Góp ý chuyên môn dược học, đề xuất bảo tồn nguồn gen bản địa hoặc kết nối hợp tác.',
  });

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 pt-6 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="hover:text-forest-950 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" />
            <span>{t('plantDetail.breadcrumbHome')}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
          <span className="font-bold text-forest-950 flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5 text-forest-700" />
            <span>{isEn ? 'Contact & Collaboration' : 'Liên Hệ & Hợp Tác'}</span>
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
