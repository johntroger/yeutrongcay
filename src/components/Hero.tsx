import React from 'react';
import { PlantCategory } from '../types/index.ts';
import { Sparkles, Shield, Leaf, Coins } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface HeroProps {
  activeMode: PlantCategory;
  onExploreMonetization?: () => void;
  onOpenClinic?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ activeMode }) => {
  const { t } = useLanguage();

  const modeBadge = t(`hero.${activeMode}.badge`);
  const modeTitle = t(`hero.${activeMode}.title`);
  const modeDescription = t(`hero.${activeMode}.description`);
  const stat1 = t(`hero.${activeMode}.stat1`);
  const stat2 = t(`hero.${activeMode}.stat2`);

  return (
    <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-forest-50/50 via-cream-100 to-cream-100 dark:from-charcoal-900/60 dark:via-charcoal-950 dark:to-charcoal-950 border-b border-forest-100/50 dark:border-forest-900/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-100/80 dark:bg-charcoal-800 border border-forest-200 dark:border-forest-700 text-forest-900 dark:text-cream-100 text-xs sm:text-sm font-medium mb-6 animate-fade-in shadow-sm">
            <Sparkles className="w-4 h-4 text-herbal-600 dark:text-herbal-400" />
            <span>{modeBadge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest-900 dark:text-cream-50 tracking-tight leading-tight mb-5">
            {modeTitle}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-charcoal-800/90 dark:text-forest-200 leading-relaxed mb-8 font-sans max-w-2xl mx-auto">
            {modeDescription}
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 max-w-lg sm:max-w-none mx-auto">
            <a
              href="/bac-si-cay-trong"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-forest-900 dark:bg-herbal-700 hover:bg-forest-800 dark:hover:bg-herbal-600 text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 text-center"
            >
              <Leaf className="w-5 h-5 text-herbal-500 dark:text-herbal-300" />
              <span>{t('hero.ctaClinic')}</span>
            </a>

            <a
              href="/kiem-tien-tu-vuon"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white dark:bg-charcoal-800 hover:bg-terracotta-50 dark:hover:bg-charcoal-700 text-terracotta-700 dark:text-terracotta-300 font-medium text-sm sm:text-base border border-terracotta-200 dark:border-forest-800 flex items-center justify-center gap-2 shadow-sm hover:shadow transition text-center"
            >
              <Coins className="w-5 h-5 text-terracotta-600 dark:text-terracotta-400" />
              <span>{t('hero.ctaMonetization')}</span>
            </a>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-forest-800 dark:text-forest-200 font-medium">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-herbal-600 dark:text-herbal-400" />
              <span>{stat1}</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-forest-300 dark:bg-forest-700"></span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-herbal-600 dark:text-herbal-400" />
              <span>{stat2}</span>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
