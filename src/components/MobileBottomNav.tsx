import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Stethoscope, RefreshCw, ShieldCheck, Sprout } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface MobileBottomNavProps {
  onOpenMyGarden?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = () => {
  const { isEn } = useLanguage();

  const navItems = [
    {
      to: '/',
      label: isEn ? 'Home' : 'Trang Chủ',
      icon: Home,
      exact: true
    },
    {
      to: '/bac-si-cay-trong',
      label: isEn ? 'Clinic' : 'Bệnh Cây',
      icon: Stethoscope
    },
    {
      to: '/trao-doi-cay',
      label: isEn ? 'Swap' : 'Đổi Cây',
      icon: RefreshCw
    },
    {
      to: '/web3-sandbox',
      label: isEn ? 'Passport' : 'Hộ Chiếu',
      icon: ShieldCheck
    },
    {
      to: '/vuon-cua-toi',
      label: isEn ? 'Garden' : 'Vườn Tôi',
      icon: Sprout
    }
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md border-t border-forest-100 dark:border-forest-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 transition-colors"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)' }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[54px] py-1 px-2 rounded-2xl transition-all duration-200 select-none ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-forest-800 dark:hover:text-cream-100 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 shadow-xs'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] mt-0.5 tracking-tight leading-none">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
