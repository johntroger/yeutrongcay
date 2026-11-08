import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { useSEO } from '../../utils/useSEO.ts';
import {
  getFullArticle,
  getCategoryBySlug,
  getRelatedArticlesMeta,
  ArticleFullContent,
  CategoryDefinition
} from '../../data/monetization/index.ts';
import {
  SubstrateMixerWidget,
  HerbalBrixWidget,
  BalconySolarStagerWidget,
  BioWasteCnBalancerWidget,
  FastCycleBatchWidget,
  SmartIrrigationSolarWidget
} from '../../components/monetization/index.ts';
import {
  Home,
  ChevronRight,
  Clock,
  Calendar,
  Share2,
  Printer,
  Sun,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowUp,
  Check,
  HelpCircle,
  Wrench,
  ShieldAlert,
  BookOpen,
  ArrowRight
} from 'lucide-react';

const renderInteractiveWidget = (engineId?: string) => {
  switch (engineId) {
    case 'substrate-mixer':
      return <SubstrateMixerWidget />;
    case 'herbal-brix':
      return <HerbalBrixWidget />;
    case 'balcony-solar-stager':
      return <BalconySolarStagerWidget />;
    case 'biowaste-cn-balancer':
      return <BioWasteCnBalancerWidget />;
    case 'fast-cycle-batch':
      return <FastCycleBatchWidget />;
    case 'smart-irrigation-solar':
      return <SmartIrrigationSolarWidget />;
    default:
      return null;
  }
};

export const MonetizationArticlePage: React.FC = () => {
  const { categorySlug, slug } = useParams<{ categorySlug: string; slug: string }>();
  const { isEn } = useLanguage();

  const [readingProgress, setReadingProgress] = useState(0);
  const [isOutdoorMode, setIsOutdoorMode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeToc, setActiveToc] = useState<string>('direct-answer');

  const article: ArticleFullContent | undefined = useMemo(() => {
    return categorySlug && slug ? getFullArticle(categorySlug, slug) : undefined;
  }, [categorySlug, slug]);

  const category: CategoryDefinition | undefined = useMemo(() => {
    return categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  }, [categorySlug]);

  const relatedArticles = useMemo(() => {
    return categorySlug && slug ? getRelatedArticlesMeta(categorySlug, slug, 3) : [];
  }, [categorySlug, slug]);

  // Track Reading Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Check current section for Table of Contents highlight
      const sections = [
        'direct-answer',
        'interactive-engine',
        'scientific-data',
        'standard-sop',
        'deep-content',
        'equipment-bom',
        'urban-safety',
        'faq-schema'
      ];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveToc(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SEO configuration with Multi-Layer Schema (BreadcrumbList, Article, HowTo, FAQPage)
  const canonicalUrl = typeof window !== 'undefined'
    ? `https://yeutrongcay.com/${categorySlug}/${slug}`
    : `https://yeutrongcay.com/${categorySlug}/${slug}`;

  const jsonLdSchemas = useMemo(() => {
    if (!article || !category) return [];

    const schemas: Record<string, any>[] = [
      // 1. BreadcrumbList Schema
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
            name: isEn ? category.titleEn : category.titleVi,
            item: `https://yeutrongcay.com/${category.slug}`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: isEn ? article.titleEn : article.titleVi,
            item: canonicalUrl
          }
        ]
      },
      // 2. Article Schema
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: isEn ? article.titleEn : article.titleVi,
        description: isEn ? article.excerptEn : article.excerptVi,
        image: [article.coverImage],
        datePublished: article.lastUpdated,
        dateModified: article.lastUpdated,
        author: {
          '@type': 'Person',
          name: article.authorName,
          jobTitle: isEn ? article.authorRoleEn : article.authorRoleVi
        },
        publisher: {
          '@type': 'Organization',
          name: 'Yêu Trồng Cây',
          url: 'https://yeutrongcay.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://yeutrongcay.com/logo.jpg'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      }
    ];

    // 3. HowTo Schema (from SOP steps)
    if (article.sopStepsVi && article.sopStepsVi.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: isEn ? article.titleEn : article.titleVi,
        description: isEn ? article.directAnswerSnippetEn : article.directAnswerSnippetVi,
        step: (isEn ? article.sopStepsEn : article.sopStepsVi).map((st) => ({
          '@type': 'HowToStep',
          position: st.step,
          name: st.title,
          text: st.description
        }))
      });
    }

    // 4. FAQPage Schema
    if (article.faqsVi && article.faqsVi.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: (isEn ? article.faqsEn : article.faqsVi).map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      });
    }

    return schemas;
  }, [article, category, isEn, canonicalUrl]);

  useSEO({
    title: article
      ? `${isEn ? article.titleEn : article.titleVi} | Yêu Trồng Cây`
      : 'Cẩm Nang Kỹ Thuật Nông Nghiệp Đô Thị | Yêu Trồng Cây',
    description: article
      ? (isEn ? article.excerptEn : article.excerptVi)
      : 'Cẩm nang hướng dẫn chuyên sâu nông nghiệp đô thị sinh thái',
    keywords: article ? article.tags : [],
    canonicalUrl,
    ogImage: article?.coverImage,
    ogType: 'article',
    publishedTime: article?.lastUpdated,
    modifiedTime: article?.lastUpdated,
    jsonLdSchemas
  });

  if (!article || !category) {
    return <Navigate to="/kiem-tien-tu-vuon" replace />;
  }

  const currentSop = isEn ? article.sopStepsEn : article.sopStepsVi;
  const currentFaqs = isEn ? article.faqsEn : article.faqsVi;

  return (
    <div
      className={`min-h-screen transition-colors ${
        isOutdoorMode
          ? 'bg-white text-black font-semibold antialiased'
          : 'bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100'
      }`}
    >
      {/* PRINT-TO-GARDEN CSS INJECTION */}
      <style>{`
        @media print {
          nav, header, footer, .no-print, .thumb-zone-bar, .toc-sidebar {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
            font-size: 11pt !important;
            line-height: 1.4 !important;
          }
          .print-card {
            border: 2px solid black !important;
            padding: 15px !important;
            page-break-inside: avoid;
            margin-bottom: 20px !important;
          }
          .print-header {
            border-bottom: 2px solid black !important;
            margin-bottom: 10px !important;
            padding-bottom: 8px !important;
          }
        }
      `}</style>

      {/* READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200 dark:bg-slate-800 no-print">
        <div
          className="h-full bg-emerald-500 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 1. BREADCRUMB NAVIGATION */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 overflow-x-auto">
            <Link
              to="/"
              className="flex items-center hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              <Home className="w-3.5 h-3.5 mr-1" />
              <span>{isEn ? 'Home' : 'Trang chủ'}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              to={`/${category.slug}`}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition whitespace-nowrap font-medium"
            >
              {isEn ? category.titleEn : category.titleVi}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {isEn ? article.titleEn : article.titleVi}
            </span>
          </div>

          {/* Quick Utility Actions */}
          <div className="hidden sm:flex items-center space-x-3 text-xs">
            {/* Outdoor mode toggle */}
            <button
              onClick={() => setIsOutdoorMode(!isOutdoorMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                isOutdoorMode
                  ? 'bg-amber-400 text-black border-amber-500 font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title={isEn ? 'Toggle Outdoor Sunlight Mode' : 'Chế độ ngoài vườn (Tương phản cao)'}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{isOutdoorMode ? (isEn ? 'Outdoor Mode: ON' : 'Đang bật ngoài trời') : (isEn ? 'Outdoor Mode' : 'Chế độ ngoài vườn')}</span>
            </button>

            {/* Print A5 SOP Card */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
              title={isEn ? 'Print A5 SOP Card' : 'In thẻ quy trình khổ A5'}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isEn ? 'Print A5 SOP' : 'In thẻ SOP A5'}</span>
            </button>

            {/* Share / Copy */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? (isEn ? 'Copied!' : 'Đã chép link!') : (isEn ? 'Share' : 'Chia sẻ')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE HEADER HERO */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Link
              to={`/${category.slug}`}
              className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 hover:bg-emerald-200 transition"
            >
              {isEn ? category.titleEn : category.titleVi}
            </Link>

            {article.isPillar && (
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                {isEn ? 'Pillar Masterclass' : 'Cẩm Nang Cốt Lõi'}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
            {isEn ? article.titleEn : article.titleVi}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium mb-6 leading-relaxed">
            {isEn ? article.subtitleEn : article.subtitleVi}
          </p>

          {/* Author, Date, Read Time Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                {article.authorName.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  {article.authorName}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {isEn ? article.authorRoleEn : article.authorRoleVi}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{isEn ? 'Updated' : 'Cập nhật'}: {article.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTimeMinutes} {isEn ? 'min read' : 'phút đọc'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. MAIN ARTICLE LAYOUT WITH STICKY TOC */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* DESKTOP STICKY TOC SIDEBAR (3 COLS) */}
          <aside className="hidden lg:block lg:col-span-3 no-print">
            <div className="sticky top-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                <BookOpen className="w-4 h-4" />
                <span>{isEn ? 'Table of Contents' : 'Mục Lục Bài Viết'}</span>
              </div>

              <nav className="space-y-1.5 text-xs">
                <a
                  href="#direct-answer"
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    activeToc === 'direct-answer'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  1. {isEn ? 'Direct Answer (AEO)' : 'Tóm tắt trực diện AEO'}
                </a>

                {article.interactiveEngineId && (
                  <a
                    href="#interactive-engine"
                    className={`block px-2.5 py-1.5 rounded-lg transition ${
                      activeToc === 'interactive-engine'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    2. {isEn ? 'Interactive Calculator' : 'Bộ công cụ tương tác'}
                  </a>
                )}

                <a
                  href="#scientific-data"
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    activeToc === 'scientific-data'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  3. {isEn ? 'Scientific Data & Metrics' : 'Dữ liệu & Thông số khoa học'}
                </a>

                <a
                  href="#standard-sop"
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    activeToc === 'standard-sop'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  4. {isEn ? 'Standard SOP Steps' : 'Quy trình thực địa SOP'}
                </a>

                <a
                  href="#deep-content"
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    activeToc === 'deep-content'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  5. {isEn ? 'Detailed Analysis' : 'Phân tích & Kinh nghiệm'}
                </a>

                {article.equipmentBOM && article.equipmentBOM.length > 0 && (
                  <a
                    href="#equipment-bom"
                    className={`block px-2.5 py-1.5 rounded-lg transition ${
                      activeToc === 'equipment-bom'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    6. {isEn ? 'Bill of Materials' : 'Bảng kê vật tư & Thiết bị'}
                  </a>
                )}

                {article.urbanSafetyNoticeVi && (
                  <a
                    href="#urban-safety"
                    className={`block px-2.5 py-1.5 rounded-lg transition ${
                      activeToc === 'urban-safety'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    7. {isEn ? 'Urban Safety Notice' : 'Lưu ý an toàn'}
                  </a>
                )}

                <a
                  href="#faq-schema"
                  className={`block px-2.5 py-1.5 rounded-lg transition ${
                    activeToc === 'faq-schema'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  8. {isEn ? 'FAQs & Science' : 'Hỏi đáp thường gặp'}
                </a>
              </nav>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 font-bold text-xs hover:bg-emerald-100 transition shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Print A5 Garden Card' : 'In Thẻ Vườn Khổ A5'}</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ARTICLE CONTENT (9 COLS) */}
          <main className="lg:col-span-9 space-y-10">
            {/* ARTICLE COVER IMAGE */}
            <div className="rounded-2xl overflow-hidden shadow-md max-h-[460px] bg-slate-100 dark:bg-slate-800">
              <img
                src={article.coverImage}
                alt={isEn ? article.titleEn : article.titleVi}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* BLOCK 1: DIRECT ANSWER BOX (AEO OPTIMIZED) */}
            <section
              id="direct-answer"
              className="scroll-mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border-l-4 border-emerald-500 rounded-r-2xl p-5 sm:p-7 shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>{isEn ? 'Direct Answer / AEO Snapshot' : 'Câu Trả Lời Trực Diện (AEO Snapshot)'}</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {isEn ? article.directAnswerSnippetEn : article.directAnswerSnippetVi}
              </p>
            </section>

            {/* BLOCK 1.5: EMBEDDED INTERACTIVE WIDGET (IF PILLAR / APPLICABLE) */}
            {article.interactiveEngineId && (
              <section id="interactive-engine" className="scroll-mt-16 no-print">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{isEn ? 'Interactive Simulation Engine' : 'Bộ Công Cụ Tính Toán Tương Tác'}</span>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 sm:p-6 shadow-sm overflow-hidden">
                  {renderInteractiveWidget(article.interactiveEngineId)}
                </div>
              </section>
            )}

            {/* BLOCK 2: SCIENTIFIC DATA & METRICS (GEO OPTIMIZED) */}
            <section id="scientific-data" className="scroll-mt-16 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                <Wrench className="w-4 h-4" />
                <span>{isEn ? 'Empirical Benchmarks & Botanical Taxonomy' : 'Thông Số Khoa Học & Danh Pháp Thực Vật'}</span>
              </div>

              {/* Taxonomy Bar */}
              {(article.scientificData.botanicalName || article.scientificData.family) && (
                <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 rounded-xl p-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                  {article.scientificData.botanicalName && (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">{isEn ? 'Botanical Name: ' : 'Danh pháp khoa học: '}</span>
                      <strong className="italic text-blue-900 dark:text-blue-200">
                        {article.scientificData.botanicalName}
                      </strong>
                    </div>
                  )}
                  {article.scientificData.family && (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">{isEn ? 'Family: ' : 'Họ thực vật: '}</span>
                      <strong className="text-blue-900 dark:text-blue-200">
                        {article.scientificData.family}
                      </strong>
                    </div>
                  )}
                  {article.scientificData.phRange && (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">pH: </span>
                      <strong className="text-blue-900 dark:text-blue-200">{article.scientificData.phRange}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Quantitative Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {article.scientificData.keyMetrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                  >
                    <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {isEn ? m.labelEn : m.labelVi}
                    </div>
                    <div className="text-base sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 my-1">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-2">
                      {isEn ? m.noteEn : m.noteVi}
                    </div>
                  </div>
                ))}
              </div>

              {/* Empirical Comparison Table (if available) */}
              {article.scientificData.comparisonTable && (
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                      <tr>
                        {(isEn
                          ? article.scientificData.comparisonTable.headersEn
                          : article.scientificData.comparisonTable.headersVi
                        ).map((h, i) => (
                          <th key={i} className="p-3 border-b border-slate-200 dark:border-slate-700">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                      {(isEn
                        ? article.scientificData.comparisonTable.rowsEn
                        : article.scientificData.comparisonTable.rowsVi
                      ).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3">
                              {cIdx === 0 ? (
                                <strong className="text-slate-900 dark:text-white">{cell}</strong>
                              ) : cIdx === 2 ? (
                                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{cell}</span>
                              ) : (
                                <span className="text-slate-600 dark:text-slate-400">{cell}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* BLOCK 3: STANDARD SOP STEPS (HOWTO SCHEMA OPTIMIZED) */}
            <section id="standard-sop" className="scroll-mt-16 print-card space-y-6">
              <div className="print-header flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isEn ? 'Standard Operating Procedure (SOP)' : 'Quy Trình Chuẩn Thực Địa (SOP)'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Step-by-Step Field Execution' : 'Các Bước Triển Khai Thực Tế'}
                  </h2>
                </div>

                <button
                  onClick={handlePrint}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-400 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/40 no-print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Print SOP Card' : 'In Thẻ SOP'}</span>
                </button>
              </div>

              <div className="space-y-4">
                {currentSop.map((st) => (
                  <div
                    key={st.step}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative pl-14 sm:pl-16"
                  >
                    {/* Step Number Circle Badge */}
                    <div className="absolute top-5 left-4 sm:left-5 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                      {st.step}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {st.title}
                      </h3>
                      {st.duration && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{st.duration}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                      {st.description}
                    </p>

                    {/* Pro Tip Callout */}
                    {st.proTip && (
                      <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-3 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>{isEn ? 'Pro-Tip: ' : 'Mẹo hay: '}</strong>
                          <span>{st.proTip}</span>
                        </div>
                      </div>
                    )}

                    {/* Caution Callout */}
                    {st.caution && (
                      <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>{isEn ? 'Caution: ' : 'Lưu ý cảnh báo: '}</strong>
                          <span>{st.caution}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* BLOCK 3.5: DEEP-DIVE CONTENT */}
            <section
              id="deep-content"
              className="scroll-mt-16 prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>{isEn ? 'In-Depth Analysis & Insights' : 'Phân Tích Chuyên Sâu & Kinh Nghiệm'}</span>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div
                  className="space-y-4 whitespace-pre-line text-sm sm:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: (isEn ? article.deepContentEn : article.deepContentVi)
                      .replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white">$1</strong>')
                  }}
                />
              </div>
            </section>

            {/* BLOCK 3.6: EQUIPMENT BILL OF MATERIALS (BOM) */}
            {article.equipmentBOM && article.equipmentBOM.length > 0 && (
              <section id="equipment-bom" className="scroll-mt-16 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                  <Wrench className="w-4 h-4" />
                  <span>{isEn ? 'Bill of Materials & Estimated Costs' : 'Bảng Kê Vật Tư & Thiết Bị Thực Tế'}</span>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-purple-50/60 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-bold border-b border-purple-100 dark:border-purple-900/60">
                      <tr>
                        <th className="p-3.5">{isEn ? 'Item Description' : 'Tên vật tư / thiết bị'}</th>
                        <th className="p-3.5">{isEn ? 'Est. Cost (VND)' : 'Đơn giá ước tính'}</th>
                        <th className="p-3.5">{isEn ? 'Where to Buy' : 'Nơi mua / Gợi ý nguồn hàng'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {article.equipmentBOM.map((bom, bIdx) => (
                        <tr key={bIdx} className="hover:bg-slate-50/60 dark:hover:bg-slate-850/60">
                          <td className="p-3.5 font-medium text-slate-900 dark:text-white">
                            {isEn ? bom.itemEn : bom.itemVi}
                          </td>
                          <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                            {bom.estCostVnd.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="p-3.5 text-slate-500 dark:text-slate-400">
                            {isEn ? bom.whereToBuyEn : bom.whereToBuyVi}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* BLOCK 3.7: URBAN SAFETY & PET NOTICE */}
            {(article.urbanSafetyNoticeVi || article.urbanSafetyNoticeEn) && (
              <section id="urban-safety" className="scroll-mt-16">
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 rounded-2xl p-5 sm:p-6 flex items-start gap-4 shadow-sm">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-black flex-shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-amber-950 dark:text-amber-200 mb-1">
                      {isEn ? 'Urban Safety & Ecological Caution' : 'Lưu Ý An Toàn Đô Thị & Thú Cưng / Trẻ Nhỏ'}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
                      {isEn ? article.urbanSafetyNoticeEn : article.urbanSafetyNoticeVi}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* BLOCK 4: FAQ SCHEMA & ACCORDION */}
            <section id="faq-schema" className="scroll-mt-16 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>{isEn ? 'Frequently Asked Questions' : 'Câu Hỏi Thường Gặp & Giải Đáp Khoa Học'}</span>
              </div>

              <div className="space-y-3">
                {currentFaqs.map((faq, fIdx) => (
                  <details
                    key={fIdx}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm open:ring-1 open:ring-emerald-500/30 transition"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-slate-900 dark:text-white select-none">
                      <span className="pr-4">{faq.question}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* BLOCK 5: RELATED FIELD GUIDES (INTERNAL LINK MESH) */}
            {relatedArticles.length > 0 && (
              <section id="related-guides" className="scroll-mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 no-print">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {isEn ? 'Related Guides in this Category' : 'Cẩm Nang Cùng Chuyên Mục'}
                  </h3>
                  <Link
                    to={`/${category.slug}`}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>{isEn ? 'View all' : 'Xem tất cả'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/${category.slug}/${rel.slug}`}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-400 hover:shadow-sm transition flex flex-col justify-between group"
                    >
                      <div>
                        <div className="h-28 rounded-lg overflow-hidden mb-2 bg-slate-100 dark:bg-slate-800">
                          <img
                            src={rel.coverImage}
                            alt={isEn ? rel.titleEn : rel.titleVi}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            loading="lazy"
                          />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                          {isEn ? rel.titleEn : rel.titleVi}
                        </h4>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{rel.readTimeMinutes} {isEn ? 'min' : 'phút'}</span>
                        <span className="text-emerald-600 font-semibold">{isEn ? 'Read SOP' : 'Xem tiếp'} →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* 4. MOBILE THUMB-ZONE STICKY BAR (PHONE SCREENS) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-around no-print shadow-lg">
        <button
          onClick={() => setIsOutdoorMode(!isOutdoorMode)}
          className={`flex flex-col items-center text-[10px] ${
            isOutdoorMode ? 'text-amber-500 font-bold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Sun className="w-5 h-5 mb-0.5" />
          <span>{isEn ? 'Outdoor' : 'Ngoài vườn'}</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex flex-col items-center text-[10px] text-slate-600 dark:text-slate-400 hover:text-emerald-600"
        >
          <Printer className="w-5 h-5 mb-0.5" />
          <span>{isEn ? 'Print SOP' : 'In thẻ A5'}</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center text-[10px] text-slate-600 dark:text-slate-400 hover:text-emerald-600"
        >
          {copiedLink ? <Check className="w-5 h-5 mb-0.5 text-emerald-500" /> : <Share2 className="w-5 h-5 mb-0.5" />}
          <span>{copiedLink ? (isEn ? 'Copied' : 'Đã chép') : (isEn ? 'Share' : 'Chia sẻ')}</span>
        </button>

        <button
          onClick={scrollToTop}
          className="flex flex-col items-center text-[10px] text-slate-600 dark:text-slate-400 hover:text-emerald-600"
        >
          <ArrowUp className="w-5 h-5 mb-0.5" />
          <span>{isEn ? 'Top' : 'Lên đầu'}</span>
        </button>
      </div>
    </div>
  );
};
