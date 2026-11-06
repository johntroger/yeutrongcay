import React from 'react';
import { Link } from 'react-router-dom';
import { PlantClinicSection } from '../components/PlantClinicSection.tsx';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Home, ChevronRight, Stethoscope } from 'lucide-react';

export const ClinicPage: React.FC = () => {
  const { t, isEn } = useLanguage();

  useSEO({
    title: isEn
      ? 'Urban Plant Doctor Clinic - Instant 3s Disease Diagnosis | Yeu Trong Cay'
      : 'Bác Sĩ Cây Trồng Đô Thị - Chẩn Đoán Sâu Bệnh Tức Thì | Yêu Trồng Cây',
    description: isEn
      ? 'Consultation for urban patio plant issues: yellow leaves, mealybugs, root rot. Instant symptom analysis and organic remedies from community master gardeners.'
      : 'Hỏi đáp ca bệnh thực vật sân thượng ban công: vàng lá, rệp sáp, thối rễ. Phân tích triệu chứng tức thì kèm kinh nghiệm chữa bệnh bằng chế phẩm sinh học từ cộng đồng.',
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
            <Stethoscope className="w-3.5 h-3.5 text-herbal-600" />
            <span>{isEn ? 'Urban Plant Doctor Clinic' : 'Bác Sĩ Cây Trồng Đô Thị'}</span>
          </span>
        </nav>
      </div>

      {/* Main Dedicated Content */}
      <main className="flex-1">
        <PlantClinicSection />
      </main>
    </div>
  );
};
