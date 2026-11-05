import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Calendar } from 'lucide-react';
import { SeasonalCalendarSection } from '../components/SeasonalCalendarSection.tsx';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

export const SeasonalCalendarPage: React.FC = () => {
  const { t, isEn } = useLanguage();

  useSEO({
    title: isEn
      ? 'Urban Farming Seasonal Calendar (3 Regions of Vietnam) | Yeu Trong Cay'
      : 'Lịch Nông Vụ Đô Thị 3 Miền Theo Tháng | Yêu Trồng Cây',
    description: isEn
      ? 'Monthly urban agriculture schedule for North, Central, and South Vietnam. Discover what herbs and balcony fruits to plant, seasonal watering advice, and pest prevention.'
      : 'Thời khóa biểu làm vườn đô thị 12 tháng chuẩn tiết khí 3 miền Bắc - Trung - Nam. Xem tháng này nên gieo trồng thảo dược hay cây ăn quả nào, cách tưới nước và phòng ngừa sâu bệnh mùa vụ.'
  });

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-charcoal-900 transition-colors flex flex-col">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700 dark:text-forest-300">
          <Link to="/" className="hover:text-forest-950 dark:hover:text-cream-100 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" />
            <span>{t('plantDetail.breadcrumbHome')}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
          <span className="font-bold text-forest-950 dark:text-cream-50 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? 'Seasonal Urban Farming Calendar' : 'Lịch Nông Vụ Đô Thị 3 Miền'}</span>
          </span>
        </nav>
      </div>

      {/* Main Seasonal Calendar Section */}
      <main className="flex-1">
        <SeasonalCalendarSection standalone={true} />
      </main>
    </div>
  );
};
