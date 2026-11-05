import React from 'react';
import { Link } from 'react-router-dom';
import { Web3SandboxSection } from '../components/Web3SandboxSection.tsx';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Home, ChevronRight, ShieldCheck } from 'lucide-react';

export const Web3Page: React.FC = () => {
  const { t, isEn } = useLanguage();

  useSEO({
    title: isEn
      ? 'Digital Plant Passport & Web3 Sandbox Testnet | Yeu Trong Cay'
      : 'Hộ Chiếu Cây Trồng Số & Web3 Sandbox Testnet | Yêu Trồng Cây',
    description: isEn
      ? 'Explore Dynamic NFT plant passports, genetic provenance, and SHA-256 cryptographic proofs 100% free on Testnet.'
      : 'Trải nghiệm công nghệ hộ chiếu thực vật Dynamic NFT minh bạch nguồn gen, bằng chứng SHA-256 bảo vệ bản quyền giống cây 100% miễn phí trên Testnet.',
  });

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700">
          <Link to="/" target="_blank" rel="noopener noreferrer" className="hover:text-forest-950 flex items-center gap-1 transition">
            <Home className="w-3.5 h-3.5" />
            <span>{t('plantDetail.breadcrumbHome')}</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
          <span className="font-bold text-forest-950 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-terracotta-600" />
            <span>{isEn ? 'Plant Passport & Web3 Sandbox' : 'Hộ Chiếu Cây Trồng & Web3 Sandbox'}</span>
          </span>
        </nav>
      </div>

      {/* Main Dedicated Content */}
      <main className="flex-1">
        <Web3SandboxSection />
      </main>
    </div>
  );
};
