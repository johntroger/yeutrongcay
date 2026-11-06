import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

export const MedicalDisclaimer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 my-6">
      <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm transition-colors">
        <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed">
          <span className="font-bold uppercase tracking-wider block text-amber-950 dark:text-amber-100 mb-1 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            {t('modals.medicalDisclaimerBannerTitle')}
          </span>
          {t('modals.medicalDisclaimerBannerText')}
        </div>
      </div>
    </div>
  );
};
