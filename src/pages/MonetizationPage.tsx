import React from 'react';
import { Link } from 'react-router-dom';
import { MonetizationSection } from '../components/MonetizationSection.tsx';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Home, ChevronRight, Coins } from 'lucide-react';

export const MonetizationPage: React.FC = () => {
  const { t, isEn } = useLanguage();

  useSEO({
    title: isEn
      ? 'Urban Green Economy & Circular Bio-Agriculture Hub | Yeu Trong Cay'
      : 'Kinh Tế Xanh & Nông Nghiệp Đô Thị Tuần Hoàn | Yêu Trồng Cây',
    description: isEn
      ? 'Comprehensive hub for urban agro-ecology: Plant propagation micro-nurseries, artisanal herbal processing, balcony setup engineering, circular vermiculture, 7-day microgreens, and IoT automation.'
      : 'Cổng thông tin và bộ công cụ tính toán nông nghiệp đô thị: Vườn ươm nhân giống, chế biến sâu dược liệu, setup ban công, tuần hoàn rác trùn quế, rau mầm 7 ngày và cảm biến IoT.',
    canonicalUrl: 'https://yeutrongcay.com/kiem-tien-tu-vuon',
    ogType: 'website',
    jsonLdSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isEn ? 'Home' : 'Trang chủ',
            item: 'https://yeutrongcay.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isEn ? 'Green Economy' : 'Kinh tế vườn',
            item: 'https://yeutrongcay.com/kiem-tien-tu-vuon'
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: isEn ? 'Urban Green Economy Hub' : 'Cổng Kinh Tế Xanh & Nông Nghiệp Đô Thị',
        description: isEn
          ? '6 independent specialized silos, 24 validated field guides, and interactive calculators.'
          : '6 chuyên mục độc lập cấp 1, ma trận 24 cẩm nang thực nghiệm và bộ công cụ tính toán tương tác.',
        url: 'https://yeutrongcay.com/kiem-tien-tu-vuon'
      }
    ]
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" />
            <span>{t('plantDetail.breadcrumbHome')}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? 'Green Economy Hub' : 'Kinh Tế Xanh & Nông Nghiệp Đô Thị'}</span>
          </span>
        </div>
      </div>

      {/* Main Dedicated Content */}
      <main className="flex-1">
        <MonetizationSection />
      </main>
    </div>
  );
};
