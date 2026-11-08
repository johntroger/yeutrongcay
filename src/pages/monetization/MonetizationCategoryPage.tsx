import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { useSEO } from '../../utils/useSEO.ts';
import {
  MONETIZATION_CATEGORIES,
  getCategoryBySlug,
  getArticlesByCategory,
  getPillarArticle,
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
  Sparkles,
  BookOpen,
  ArrowRight,
  Clock,
  Layers,
  Sprout,
  FlaskConical,
  Hammer,
  Recycle,
  Wheat,
  Cpu
} from 'lucide-react';

interface MonetizationCategoryPageProps {
  categorySlug?: string;
}

const getCategoryIcon = (iconName: string, className: string = 'w-6 h-6') => {
  switch (iconName) {
    case 'Sprout':
      return <Sprout className={className} />;
    case 'FlaskConical':
      return <FlaskConical className={className} />;
    case 'Hammer':
      return <Hammer className={className} />;
    case 'Recycle':
      return <Recycle className={className} />;
    case 'Wheat':
      return <Wheat className={className} />;
    case 'Cpu':
      return <Cpu className={className} />;
    default:
      return <Layers className={className} />;
  }
};

const renderInteractiveWidget = (engineId: string) => {
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

export const MonetizationCategoryPage: React.FC<MonetizationCategoryPageProps> = ({
  categorySlug: propSlug
}) => {
  const { categorySlug: paramSlug } = useParams<{ categorySlug: string }>();
  const activeSlug = propSlug || paramSlug;
  const { isEn } = useLanguage();

  const category: CategoryDefinition | undefined = useMemo(() => {
    return activeSlug ? getCategoryBySlug(activeSlug) : undefined;
  }, [activeSlug]);

  const allArticles: ArticleFullContent[] = useMemo(() => {
    return activeSlug ? getArticlesByCategory(activeSlug) : [];
  }, [activeSlug]);

  const pillarArticle: ArticleFullContent | undefined = useMemo(() => {
    return activeSlug ? getPillarArticle(activeSlug) : undefined;
  }, [activeSlug]);

  const subArticles: ArticleFullContent[] = useMemo(() => {
    return allArticles.filter((art) => !art.isPillar);
  }, [allArticles]);

  // SEO configuration
  const canonicalUrl = typeof window !== 'undefined'
    ? `https://yeutrongcay.com/${category?.slug || ''}`
    : `https://yeutrongcay.com/${category?.slug || ''}`;

  useSEO({
    title: category
      ? `${isEn ? category.titleEn : category.titleVi} | Yêu Trồng Cây`
      : 'Chuyên Mục Kinh Tế Xanh | Yêu Trồng Cây',
    description: category
      ? (isEn ? category.descriptionEn : category.descriptionVi)
      : 'Chuyên mục nông nghiệp đô thị và kinh tế vườn',
    keywords: category
      ? (isEn ? category.seoKeywordsEn : category.seoKeywordsVi)
      : [],
    canonicalUrl,
    ogType: 'website',
    jsonLdSchemas: category
      ? [
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
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: isEn ? category.titleEn : category.titleVi,
                item: canonicalUrl
              }
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: isEn ? category.titleEn : category.titleVi,
            description: isEn ? category.descriptionEn : category.descriptionVi,
            url: canonicalUrl
          }
        ]
      : []
  });

  if (!category) {
    return <Navigate to="/kiem-tien-tu-vuon" replace />;
  }

  // Other categories for cross-navigation
  const otherCategories = MONETIZATION_CATEGORIES.filter((c) => c.slug !== category.slug);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* 1. BREADCRUMB */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 overflow-x-auto">
          <Link
            to="/"
            className="flex items-center hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>{isEn ? 'Home' : 'Trang chủ'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            to="/kiem-tien-tu-vuon"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition whitespace-nowrap"
          >
            {isEn ? 'Green Economy' : 'Kinh tế vườn'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-emerald-700 dark:text-emerald-400 truncate">
            {isEn ? category.titleEn : category.titleVi}
          </span>
        </div>
      </div>

      {/* 2. HERO CATEGORY BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-950 py-10 sm:py-14 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 mb-4 shadow-sm">
              {getCategoryIcon(category.icon, 'w-4 h-4 text-emerald-600 dark:text-emerald-400')}
              <span>{isEn ? category.badgeEn : category.badgeVi}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-3">
              {isEn ? category.titleEn : category.titleVi}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg font-medium text-emerald-700 dark:text-emerald-400 mb-4 leading-relaxed">
              {isEn ? category.taglineEn : category.taglineVi}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEn ? category.descriptionEn : category.descriptionVi}
            </p>

            {/* Stats strip */}
            <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>
                  <strong className="text-slate-900 dark:text-white">{allArticles.length}</strong>{' '}
                  {isEn ? 'Field Guides' : 'Bài viết cẩm nang'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>
                  <strong className="text-slate-900 dark:text-white">100%</strong>{' '}
                  {isEn ? 'Validated SOPs' : 'Quy trình kiểm nghiệm thực địa'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>
                  <strong className="text-slate-900 dark:text-white">{isEn ? 'Live Engine' : 'Bộ tính toán'}</strong>{' '}
                  {isEn ? 'Interactive Calculator' : 'Thuật toán tương tác trực quan'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE ENGINE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{isEn ? 'Interactive Simulation Engine' : 'Công Cụ Thuật Toán Mô Phỏng Tương Tác'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {isEn ? 'Real-Time Quantitative Tool' : 'Tính Toán & Kiểm Nghiệm Thông Số Trước Khi Làm'}
            </h2>
          </div>
        </div>

        {/* Embedded Interactive Widget */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-2 sm:p-6 overflow-hidden">
          {renderInteractiveWidget(category.interactiveEngineId)}
        </div>
      </section>

      {/* 4. PILLAR MASTERCLASS ARTICLE FEATURE */}
      {pillarArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{isEn ? 'Pillar Masterclass' : 'Cẩm Nang Cốt Lõi Masterclass'}</span>
          </div>

          <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 rounded-2xl text-white overflow-hidden shadow-lg border border-emerald-800/40 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 text-xs font-extrabold tracking-wide uppercase">
                    {isEn ? 'Core Masterclass' : 'Bài viết trụ cột'}
                  </span>
                  <div className="flex items-center text-xs text-emerald-200">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    <span>{pillarArticle.readTimeMinutes} {isEn ? 'min read' : 'phút đọc'}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
                  {isEn ? pillarArticle.titleEn : pillarArticle.titleVi}
                </h3>

                <p className="text-sm sm:text-base text-emerald-100 font-medium mb-4">
                  {isEn ? pillarArticle.subtitleEn : pillarArticle.subtitleVi}
                </p>

                {/* Direct Answer snippet box */}
                <div className="bg-emerald-950/70 border-l-4 border-amber-400 p-3 sm:p-4 rounded-r-lg mb-6">
                  <div className="text-xs uppercase font-bold tracking-wider text-amber-300 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Direct Answer / AEO Snapshot' : 'Tóm Tắt Trực Diện (AEO)'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {isEn ? pillarArticle.directAnswerSnippetEn : pillarArticle.directAnswerSnippetVi}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-emerald-800/60">
                <div className="text-xs text-emerald-300">
                  <span>{isEn ? 'Author: ' : 'Tác giả: '}</span>
                  <strong className="text-white">{pillarArticle.authorName}</strong> —{' '}
                  <span>{isEn ? pillarArticle.authorRoleEn : pillarArticle.authorRoleVi}</span>
                </div>

                <Link
                  to={`/${category.slug}/${pillarArticle.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md hover:shadow-emerald-500/20"
                >
                  <span>{isEn ? 'Read Masterclass' : 'Đọc Cẩm Nang Chi Tiết'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[220px] rounded-xl overflow-hidden group">
              <img
                src={pillarArticle.coverImage}
                alt={isEn ? pillarArticle.titleEn : pillarArticle.titleVi}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                {pillarArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[11px] text-white border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. SUB-ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              {isEn ? 'Specialized Guides' : 'Bộ Bài Viết Con Chuyên Sâu'}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {isEn ? 'Hands-on SOPs & Practical Execution' : 'Cẩm Nang Thực Hành & Quy Trình SOP Chi Tiết'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-700/60 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={article.coverImage}
                    alt={isEn ? article.titleEn : article.titleVi}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTimeMinutes} {isEn ? 'min' : 'phút'}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {article.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                    <Link to={`/${category.slug}/${article.slug}`}>
                      {isEn ? article.titleEn : article.titleVi}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {isEn ? article.excerptEn : article.excerptVi}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-850/60 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                  {article.authorName}
                </span>

                <Link
                  to={`/${category.slug}/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition"
                >
                  <span>{isEn ? 'Read SOP' : 'Xem quy trình'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. CROSS-CATEGORY SILO NAVIGATION */}
      <section className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
              {isEn ? 'Explore Other Green Economy Silos' : 'Khám Phá Các Chuyên Mục Kinh Tế Xanh Khác'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {isEn
                ? 'Comprehensive guides on zero-waste urban agriculture, artisanal herbs & smart automation'
                : 'Mô hình khép kín từ nhân giống, bào chế thảo mộc đến tuần hoàn rác và tự động hóa'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {otherCategories.map((c) => (
              <Link
                key={c.id}
                to={`/${c.slug}`}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 bg-slate-50 dark:bg-slate-850 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="p-2 rounded-lg bg-emerald-100/60 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 w-fit mb-2">
                    {getCategoryIcon(c.icon, 'w-4 h-4')}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {isEn ? c.titleEn : c.titleVi}
                  </h4>
                </div>
                <div className="mt-3 flex items-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>{isEn ? 'Explore' : 'Khám phá'}</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
