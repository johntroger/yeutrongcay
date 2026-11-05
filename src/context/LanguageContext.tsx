import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations.ts';

export type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  isEn: boolean;
  isVi: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('ytc_language');
    if (saved === 'en' || saved === 'vi') return saved;
    return 'vi'; // Mặc định là Tiếng Việt
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ytc_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  // Đồng bộ thuộc tính lang của thẻ <html>
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Hàm dịch theo đường dẫn key (ví dụ: 'nav.home', 'clinic.title')
  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let currentVi: any = translations.vi;
    let currentEn: any = translations.en;

    for (const k of keys) {
      if (currentVi && typeof currentVi === 'object') {
        currentVi = currentVi[k];
      } else {
        currentVi = undefined;
      }

      if (currentEn && typeof currentEn === 'object') {
        currentEn = currentEn[k];
      } else {
        currentEn = undefined;
      }
    }

    if (language === 'en') {
      if (typeof currentEn === 'string') return currentEn;
      // Nếu không tìm thấy trong en, dùng fallback hoặc chuỗi rỗng
      return fallback || '';
    }

    // Khi ở tiếng Việt, ưu tiên chuỗi tiếng Việt; nếu thiếu thì lấy tiếng Anh (theo nguyên tắc người dùng yêu cầu)
    if (typeof currentVi === 'string') return currentVi;
    if (typeof currentEn === 'string') return currentEn;
    return fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isEn: language === 'en',
        isVi: language === 'vi',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
