import React from 'react';
import { Link } from 'react-router-dom';
import { PlantSwapSection } from '../components/PlantSwapSection.tsx';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Home, ChevronRight, MapPin } from 'lucide-react';

export const SwapPage: React.FC = () => {
  const { t, isEn } = useLanguage();

  useSEO({
    title: isEn
      ? 'Community Plant & Seed Swap Station - Biosecure Exchange | Yeu Trong Cay'
      : 'Trạm Trao Đổi Cây & Hạt Giống Bản Địa An Toàn | Yêu Trồng Cây',
    description: isEn
      ? 'Connecting plant exchanges, rooted cuttings, and heirloom clean seeds across three regions with 7-day quarantine pledge.'
      : 'Nền tảng kết nối trao đổi giống cây, cành giâm và hạt giống sạch ba miền Bắc - Trung - Nam với cam kết kiểm dịch 7 ngày an toàn.',
  });

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-950 text-charcoal-900 dark:text-cream-50 flex flex-col transition-colors">
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 pt-6 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700 dark:text-forest-400">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="hover:text-forest-950 dark:hover:text-cream-100 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" />
            <span>{t('plantDetail.breadcrumbHome')}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
          <span className="font-bold text-forest-950 dark:text-cream-100 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('swap.title')}</span>
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
