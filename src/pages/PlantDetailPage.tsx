import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Plant } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { getPlantBySlug } from '../services/apiService.ts';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { localizePlant } from '../i18n/plantTranslations.ts';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Sun,
  Droplets,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  Coins,
  Hash,
  Sparkles,
  ChevronRight,
  Check,
  CheckCircle2,
  Clock,
  Home,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Layers,
  Thermometer,
  Sprout,
  Flag
} from 'lucide-react';
import { ReportModal } from '../components/ReportModal.tsx';

interface PlantDetailPageProps {
  onOpenMyGarden?: () => void;
  onAddPlantToGarden?: (plantId: string) => void;
}

export const PlantDetailPage: React.FC<PlantDetailPageProps> = ({
  onAddPlantToGarden
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t, isEn } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Tìm cây theo slug (kết hợp cache tức thì + dữ liệu động từ MySQL)
  const [rawPlant, setRawPlant] = useState<Plant | undefined>(() => SEED_PLANTS.find((p) => p.slug === slug));

  useEffect(() => {
    if (slug) {
      let isMounted = true;
      getPlantBySlug(slug).then((livePlant) => {
        if (isMounted && livePlant) {
          setRawPlant(livePlant);
        }
      });
      return () => {
        isMounted = false;
      };
    }
  }, [slug]);

  // Địa phương hóa toàn bộ dữ liệu cây theo ngôn ngữ hiện tại
  const plant = rawPlant ? localizePlant(rawPlant, language) : undefined;

  // Khởi tạo các giá trị AEO / GEO chuẩn hóa
  const categoryName =
    plant?.category === 'herb'
      ? isEn ? 'Native Medicinal Herbs' : 'Thảo Dược'
      : plant?.category === 'fruit'
      ? isEn ? 'Balcony Fruit Trees' : 'Cây Ăn Trái'
      : isEn ? 'Calming Bonsai & Ornamentals' : 'Cây Cảnh & Bonsai';

  const categoryPath =
    plant?.category === 'herb'
      ? '/thao-duoc'
      : plant?.category === 'fruit'
      ? '/cay-an-trai'
      : '/cay-canh';

  // 1. AEO Direct Answer
  const quickAnswerText =
    plant?.quick_answer ||
    (isEn
      ? `${plant?.common_name} (${plant?.scientific_name}) is a native botanical species belonging to ${categoryName.toLowerCase()}, highly acclimated to tropical climates. It thrives best under ${
          plant?.sunlight === 'full_sun' ? 'full sunlight' : plant?.sunlight === 'partial_shade' ? 'filtered partial shade' : 'indoor light'
        }, with watering ${
          plant?.watering === 'daily' ? 'once daily' : 'every 2-3 days'
        }, and is ideal for urban balcony containers (${plant?.growth_time}).`
      : `${plant?.common_name} (${plant?.scientific_name}) là loài thực vật bản địa thuộc nhóm ${categoryName.toLowerCase()}, được thuần dưỡng thích nghi cao với khí hậu nhiệt đới Việt Nam. Cây phát triển lý tưởng trong điều kiện ${
          plant?.sunlight === 'full_sun' ? 'nắng đầy đủ' : plant?.sunlight === 'partial_shade' ? 'nắng tán xạ' : 'trong nhà'
        }, chu kỳ tưới ${
          plant?.watering === 'daily' ? '1 lần/ngày' : '2-3 ngày/lần'
        }, và hoàn toàn thích hợp trồng trong chậu ban công đô thị (${plant?.growth_time}).`);

  // 2. GEO Botanical Entities
  const botanicalFamily =
    plant?.botanical_details?.family ||
    (isEn
      ? plant?.category === 'herb'
        ? 'Lamiaceae / Asteraceae (Medicinal Flora)'
        : plant?.category === 'fruit'
        ? 'Myrtaceae / Rutaceae (Tropical Fruit Trees)'
        : 'Araceae / Moraceae (Ornamental Landscape)'
      : plant?.category === 'herb'
      ? 'Lamiaceae / Asteraceae (Họ thảo dược bản địa)'
      : plant?.category === 'fruit'
      ? 'Myrtaceae / Rutaceae (Họ cây ăn trái nhiệt đới)'
      : 'Araceae / Moraceae (Họ cảnh quan phong thủy)');

  const nativeRange =
    plant?.botanical_details?.native_range ||
    (isEn ? 'Native to Vietnam & Monsoon Tropical Southeast Asia' : 'Bản địa Việt Nam & Đông Nam Á nhiệt đới gió mùa');

  const activeCompounds =
    plant?.botanical_details?.active_compounds ||
    (isEn
      ? plant?.category === 'herb'
        ? ['Antimicrobial Essential Oils', 'Phenolic Compounds', 'Antioxidant Flavonoids', 'Vitamin C']
        : ['Organic Vitamins', 'Soluble Fiber', 'Trace Minerals', 'Natural Organic Acids']
      : plant?.category === 'herb'
      ? ['Tinh dầu kháng khuẩn tự nhiên', 'Hợp chất Phenolic', 'Flavonoid chống oxy hóa', 'Vitamin C']
      : ['Vitamin hữu cơ', 'Chất xơ hòa tan', 'Khoáng vi lượng', 'Axit hữu cơ tự nhiên']);

  // 3. GEO HowTo Steps
  const howToSteps =
    plant?.how_to_grow_steps ||
    (isEn
      ? [
          {
            step: 1,
            title: 'Potting mix and container preparation',
            instruction:
              'Mix loose loamy soil with 30% coco peat/rice hulls and 10% well-aged organic compost. Select a 25cm-40cm pot with ample drainage holes to prevent root rot.',
          },
          {
            step: 2,
            title: 'Cutting propagation or seedling planting',
            instruction:
              'Take a vigorous 12-15cm semi-hardwood cutting, trim bottom leaves, and insert at a 45-degree angle 3-5cm deep into moist soil in airy shade for 7-10 days.',
          },
          {
            step: 3,
            title: 'Ongoing cultivation and harvesting',
            instruction:
              'Transition into appropriate sunlight once rootlets establish. Water early morning or late afternoon. Prune terminal shoots regularly to stimulate dense branching.',
          },
        ]
      : [
          {
            step: 1,
            title: 'Chuẩn bị giá thể và chậu trồng',
            instruction:
              'Trộn đất thịt tơi xốp với 30% xơ dừa/trấu hun và 10% phân hữu cơ hoai mục. Chọn chậu có đường kính từ 25cm - 40cm, đáy có lỗ thoát nước lớn tránh ứ đọng gốc.',
          },
          {
            step: 2,
            title: 'Nhân giống cành giâm hoặc ươm bầu',
            instruction:
              'Cắt đoạn cành bánh tẻ khỏe mạnh dài 12 - 15cm, tỉa bớt lá gốc. Cắm nghiêng 45 độ sâu 3 - 5cm vào đất ẩm, đặt nơi râm mát thoáng gió trong 7 - 10 ngày đầu.',
          },
          {
            step: 3,
            title: 'Chăm sóc sinh trưởng và thu hoạch',
            instruction:
              'Khi cây ra rễ mới và đâm chồi, chuyển dần ra nơi có ánh nắng phù hợp. Tưới nước định kỳ vào sáng sớm hoặc chiều mát. Thu hoạch tỉa cành để kích thích đẻ nhánh xum xuê.',
          },
        ]);

  // 4. AEO FAQs
  const faqsList =
    plant?.faqs ||
    (isEn
      ? [
          {
            question: `Is ${plant?.common_name} suitable for growing in apartment balcony pots?`,
            answer: `Yes, ${plant?.common_name} performs wonderfully in 25cm-35cm balcony containers. It requires well-drained substrate and 3-5 hours of sunlight daily.`,
          },
          {
            question: `What are the primary benefits and values of ${plant?.common_name}?`,
            answer:
              plant?.medical_info?.uses.join(', ') ||
              `${plant?.common_name} provides clean natural food, enriches balcony microclimates, and supports household wellness.`,
          },
          {
            question: `Which season offers the highest propagation survival rate for ${plant?.common_name}?`,
            answer:
              plant?.seasonality?.north ||
              `Spring or early monsoon season yields the highest rooting success, when ambient humidity is high and temperatures range between 22°C and 30°C.`,
          },
          {
            question: `Who should exercise caution when consuming ${plant?.common_name}?`,
            answer:
              plant?.medical_info?.toxicity_warning ||
              `The plant is generally benign. However, pregnant individuals and those with allergies should consult healthcare professionals prior to high medicinal doses.`,
          },
        ]
      : [
          {
            question: `Cây ${plant?.common_name} có thích hợp trồng trong chậu ở ban công chung cư không?`,
            answer: `Có, ${plant?.common_name} rất phù hợp trồng trong chậu ban công từ 25cm - 35cm. Cây cần giá thể thoát nước tốt và vị trí đón được từ 3 - 5 giờ ánh sáng mỗi ngày.`,
          },
          {
            question: `Công dụng và giá trị nổi bật nhất của cây ${plant?.common_name} là gì?`,
            answer:
              plant?.medical_info?.uses.join(', ') ||
              `${plant?.common_name} mang lại giá trị thực phẩm sạch, cải tạo không gian xanh ban công và thanh lọc vi khí hậu gia đình.`,
          },
          {
            question: `Mùa vụ nào trong năm nhân giống ${plant?.common_name} đạt tỉ lệ sống cao nhất?`,
            answer:
              plant?.seasonality?.north ||
              `Thời điểm lý tưởng nhất để giâm cành hoặc nhân giống là vào mùa xuân hoặc đầu mùa mưa, khi độ ẩm không khí cao và nhiệt độ dao động 22°C - 30°C.`,
          },
          {
            question: `Những ai cần lưu ý hoặc kiêng kỵ khi sử dụng cây ${plant?.common_name}?`,
            answer:
              plant?.medical_info?.toxicity_warning ||
              `Cây nhìn chung lành tính. Tuy nhiên, phụ nữ có thai và người có cơ địa dị ứng nên tham khảo ý kiến chuyên môn trước khi dùng với liều lượng lớn.`,
          },
        ]);

  // 5. GEO Academic Citations
  const citationsList =
    plant?.academic_citations ||
    (isEn
      ? [
          'Pharmacopoeia of Vietnam V - Traditional Indigenous Herbal Monographs.',
          'Prof. Do Tat Loi - "Medicinal Plants and Traditional Remedies of Vietnam", Medical Publishing House.',
          'National Institute of Medicinal Materials (NIMM) & Vietnam Academy of Agricultural Sciences (VAAS).',
        ]
      : [
          'Dược Điển Việt Nam V - Chuyên luận Thảo Dược Bản Địa Truyền Thống.',
          'GS. Đỗ Tất Lợi - "Những Cây Thuốc Và Vị Thuốc Việt Nam", NXB Y Học.',
          'Viện Dược Liệu & Viện Khoa Học Nông Nghiệp Việt Nam (VAAS).',
        ]);

  // 6. Tích hợp Dynamic SEO
  const pageUrl = `https://yeutrongcay.com/cay/${plant?.slug || ''}`;
  const metaTitle = isEn
    ? `${plant?.common_name} (${plant?.scientific_name}) - Uses, Care & Botanical Guide | Yeu Trong Cay`
    : `${plant?.common_name} (${plant?.scientific_name}) - Tác Dụng, Cách Trồng & Dược Tính | Yêu Trồng Cây`;
  const metaDesc = isEn
    ? `Comprehensive guide to ${plant?.common_name}: scientific name ${plant?.scientific_name}, therapeutic properties, balcony pot cultivation, seasonality, and traditional remedies.`
    : `Cẩm nang đầy đủ về cây ${plant?.common_name}: tên khoa học ${plant?.scientific_name}, công dụng trị bệnh, cách trồng chậu ban công, lịch mùa vụ và bài thuốc dân gian.`;

  // Schemas JSON-LD
  const schemas: Record<string, any>[] = [];

  if (plant) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: metaTitle,
      description: metaDesc,
      image: [plant.image_url],
      datePublished: '2026-01-15T08:00:00+07:00',
      dateModified: '2026-11-04T12:00:00+07:00',
      author: {
        '@type': 'Organization',
        name: isEn ? 'Yeu Trong Cay Editorial Board' : 'Ban Quản Trị Yêu Trồng Cây',
        url: 'https://yeutrongcay.com',
      },
      publisher: {
        '@type': 'Organization',
        name: isEn ? 'Yeu Trong Cay' : 'Yêu Trồng Cây',
        logo: {
          '@type': 'ImageObject',
          url: 'https://yeutrongcay.com/logo.jpg',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
    });

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isEn ? 'Home' : 'Trang Chủ',
          item: 'https://yeutrongcay.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: categoryName,
          item: `https://yeutrongcay.com${categoryPath}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: plant.common_name,
          item: pageUrl,
        },
      ],
    });

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqsList.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: isEn
        ? `How to Grow and Care for ${plant.common_name} in Balcony Containers`
        : `Cách Trồng Và Chăm Sóc Cây ${plant.common_name} Trong Chậu Ban Công`,
      description: isEn
        ? `3-step standard urban agriculture guide to growing ${plant.common_name} at home.`
        : `Quy trình 3 bước chuẩn nông nghiệp đô thị để tự trồng ${plant.common_name} tại nhà.`,
      step: howToSteps.map((s) => ({
        '@type': 'HowToStep',
        position: s.step,
        name: s.title,
        text: s.instruction,
      })),
    });
  }

  useSEO({
    title: metaTitle,
    description: metaDesc,
    keywords: [
      plant?.common_name || '',
      plant?.scientific_name || '',
      ...(plant?.aliases || []),
      ...(plant?.tags || []),
      'balcony gardening',
      'medicinal herbs',
      'urban plant guide',
    ],
    canonicalUrl: pageUrl,
    ogImage: plant?.image_url,
    ogType: 'article',
    publishedTime: '2026-01-15T08:00:00+07:00',
    modifiedTime: '2026-11-04T12:00:00+07:00',
    jsonLdSchemas: schemas,
  });

  if (!plant) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-3xl bg-forest-100 text-forest-700 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-forest-950 mb-2">
          {isEn ? 'Botanical article not found' : 'Không tìm thấy bài viết về cây này'}
        </h2>
        <p className="text-sm text-forest-800 mb-6">
          {isEn
            ? 'The URL might have changed or this plant is not yet cataloged.'
            : 'Có thể đường dẫn đã thay đổi hoặc cây chưa được cập nhật vào từ điển.'}
        </p>
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('plantDetail.backToHome')}</span>
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToGarden = () => {
    if (onAddPlantToGarden) {
      onAddPlantToGarden(plant.id);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Cây liên quan cùng category
  const relatedPlants = SEED_PLANTS.filter(
    (p) => p.category === plant.category && p.id !== plant.id
  ).slice(0, 3).map((p) => localizePlant(p, language));

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* 1. Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700 mb-6 overflow-x-auto no-scrollbar">
        <Link to="/" target="_blank" rel="noopener noreferrer" className="hover:text-forest-950 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>{t('plantDetail.breadcrumbHome')}</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
        <Link to={categoryPath} target="_blank" rel="noopener noreferrer" className="hover:text-forest-950 font-medium transition whitespace-nowrap">
          {categoryName}
        </Link>
        <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
        <span className="font-bold text-forest-950 truncate max-w-[200px]">
          {plant.common_name}
        </span>
      </nav>

      {/* 2. Top Action Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-forest-950 bg-white px-3.5 py-2 rounded-xl border border-forest-100 shadow-2xs transition"
        >
          <ArrowLeft className="w-4 h-4 text-herbal-600" />
          <span>{t('common.back')}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-900 bg-white hover:bg-forest-50 px-3.5 py-2 rounded-xl border border-forest-200 shadow-2xs transition"
            title={t('plantDetail.sharePlant')}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">{t('common.copied')}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-forest-600" />
                <span className="hidden sm:inline">{t('common.share')}</span>
              </>
            )}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleSaveToGarden}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-forest-900 hover:bg-forest-800 px-4 py-2 rounded-xl shadow-xs transition"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t('plantDetail.inMyGarden')}</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-herbal-400" />
                <span>{t('plantDetail.addToMyGarden')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Hero Visual & Headline Card */}
      <header className="bg-white rounded-3xl overflow-hidden border border-forest-100 shadow-sm mb-8">
        
        {/* Plant Image Header */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-forest-950 overflow-hidden">
          <img
            src={plant.image_url}
            alt={`${plant.common_name} (${plant.scientific_name})`}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Leaf_-pani_koorkka.JPG/330px-Leaf_-pani_koorkka.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent flex items-end p-6 sm:p-10">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md mb-2">
                {isEn ? `${categoryName} of Vietnam` : `${categoryName} Bản Địa Việt Nam`}
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                {plant.common_name}
              </h1>
              <p className="text-sm sm:text-base font-mono italic text-herbal-300 mt-1">
                {plant.scientific_name}
              </p>
              {plant.aliases && plant.aliases.length > 0 && (
                <p className="text-xs text-white/80 mt-2 font-sans">
                  {t('plantCard.aliasesPrefix')} <strong>{plant.aliases.join(' • ')}</strong>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Biological Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 bg-forest-50/60 border-t border-forest-100 text-xs sm:text-sm">
          <div>
            <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
              <Sun className="w-4 h-4 text-amber-500" /> {t('common.sunlight')}
            </span>
            <span className="font-bold text-forest-950">
              {t(`plantCard.sunlight.${plant.sunlight}`, plant.sunlight)}
            </span>
          </div>

          <div>
            <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
              <Droplets className="w-4 h-4 text-blue-500" /> {t('common.watering')}
            </span>
            <span className="font-bold text-forest-950">
              {t(`plantCard.watering.${plant.watering}`, plant.watering)}
            </span>
          </div>

          <div>
            <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
              <Clock className="w-4 h-4 text-emerald-600" /> {t('plantDetail.growthCycle')}
            </span>
            <span className="font-bold text-forest-950">
              {plant.growth_time}
            </span>
          </div>

          <div>
            <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-purple-600" /> {t('plantDetail.containerSuitable')}
            </span>
            <span className="font-bold text-forest-950">
              {plant.container_suitable ? t('plantDetail.containerYes') : t('plantDetail.containerNo')}
            </span>
          </div>
        </div>

      </header>

      {/* 4. AEO DIRECT ANSWER CAPSULE */}
      <section className="bg-gradient-to-r from-emerald-50 via-forest-50 to-cream-50 rounded-3xl p-6 sm:p-7 border border-emerald-200/80 shadow-xs mb-8">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-950">
                {t('plantDetail.directAnswerTitle')}
              </h2>
              <span className="text-[10px] bg-emerald-200/70 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                {isEn ? '30-second read' : 'Đọc trong 30s'}
              </span>
            </div>
            <p className="text-sm text-forest-950 leading-relaxed font-sans font-medium">
              {quickAnswerText}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Article Main Body Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Overview & Characteristics */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-sm space-y-4">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-forest-950 border-b border-forest-50 pb-3 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-herbal-600" />
              <span>{isEn ? '1. Botanical Profile & Characteristics' : '1. Đặc Điểm Sinh Học & Giá Trị Bản Địa'}</span>
            </h2>
            <p className="text-sm sm:text-base text-charcoal-900 leading-relaxed font-sans">
              {plant.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {plant.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-forest-50 text-forest-800 border border-forest-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>

          {/* Section 2: GEO HowTo Steps */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-sm space-y-5">
            <div className="border-b border-forest-50 pb-3 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-forest-950 flex items-center gap-2">
                <Layers className="w-5 h-5 text-herbal-600" />
                <span>{isEn ? '2. Step-by-Step Balcony Propagation Guide' : '2. Hướng Dẫn Trồng & Nhân Giống Chậu Ban Công Chuẩn 3 Bước'}</span>
              </h2>
            </div>

            <div className="space-y-4">
              {howToSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-4 sm:p-5 rounded-2xl bg-cream-50/70 border border-forest-100 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-forest-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-forest-950 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-forest-800 leading-relaxed font-sans">
                      {step.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Medical Info (If Herb) */}
          {plant.medical_info && (
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-herbal-200 shadow-sm space-y-6">
              <div className="border-b border-herbal-100 pb-3 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-herbal-950 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-herbal-600" />
                  <span>{isEn ? '3. Medicinal Properties, Folk Remedies & Safety' : '3. Dược Tính, Bài Thuốc Dân Gian & Lưu Ý An Toàn'}</span>
                </h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-herbal-100 text-herbal-800">
                  {isEn ? 'Food as Medicine' : 'Dược thực đồng nguyên'}
                </span>
              </div>

              {/* Uses */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-herbal-800 mb-2">
                  {t('plantDetail.usesTitle')}:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {plant.medical_info.uses.map((use, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-charcoal-800 bg-herbal-50/50 p-2.5 rounded-xl border border-herbal-100">
                      <span className="text-herbal-600 font-bold">•</span>
                      <span>{use}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Folk remedies */}
              {plant.medical_info.folk_remedies && (
                <div className="p-4 rounded-2xl bg-cream-50 border border-forest-100 text-xs sm:text-sm text-charcoal-800 space-y-2">
                  <h3 className="font-bold text-forest-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-herbal-600" />
                    <span>{t('plantDetail.folkRemediesTitle')}:</span>
                  </h3>
                  <ul className="space-y-2 pl-2">
                    {plant.medical_info.folk_remedies.map((remedy, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-herbal-700 font-bold">✓</span>
                        <span className="leading-relaxed">{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Toxicity & Warning */}
              {plant.medical_info.toxicity_warning && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950">
                  <h3 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{t('plantDetail.toxicityTitle')}:</span>
                  </h3>
                  <p className="leading-relaxed">{plant.medical_info.toxicity_warning}</p>
                </div>
              )}

              {/* Confusion Risk */}
              {plant.medical_info.confusion_risk && (
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-rose-950">
                  <h3 className="font-bold text-rose-900 mb-1">
                    {t('plantDetail.confusionRiskTitle')}: {plant.medical_info.confusion_risk.confused_with}
                  </h3>
                  <p className="leading-relaxed">
                    <strong>{t('plantDetail.distinguishingFeatures')}</strong> {plant.medical_info.confusion_risk.distinguishing_features}
                  </p>
                </div>
              )}

              {/* Disclaimer */}
              <div className="text-[11px] text-gray-500 italic bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed">
                * {plant.medical_info.disclaimer}
              </div>

              {/* Báo cáo thông tin dược lý */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-forest-600 border-t border-forest-50">
                <span>{isEn ? 'Notice inaccurate botanical or medicinal details?' : 'Phát hiện thông tin dược tính hoặc liều dùng chưa chính xác?'}</span>
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 font-semibold transition self-start sm:self-auto"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{t('plantDetail.reportData')}</span>
                </button>
              </div>
            </section>
          )}

          {/* Section 4: Seasonality Calendar */}
          {plant.seasonality && (
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-forest-950 border-b border-forest-50 pb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-forest-700" />
                <span>{isEn ? '4. Regional Propagation & Seasonality Calendar' : '4. Lịch Nông Vụ Nhân Giống & Mùa Vụ Ba Miền'}</span>
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-forest-50/70 border border-forest-100">
                  <strong className="text-forest-950 block mb-0.5">🌾 {t('plantDetail.seasonNorth')}:</strong>
                  <span className="text-forest-800">{plant.seasonality.north}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-forest-50/70 border border-forest-100">
                  <strong className="text-forest-950 block mb-0.5">🌾 {t('plantDetail.seasonCentral')}:</strong>
                  <span className="text-forest-800">{plant.seasonality.central}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-forest-50/70 border border-forest-100">
                  <strong className="text-forest-950 block mb-0.5">🌾 {t('plantDetail.seasonSouth')}:</strong>
                  <span className="text-forest-800">{plant.seasonality.south}</span>
                </div>
              </div>

              {plant.seasonality.warning && (
                <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
                  ⚠️ <strong>{t('plantDetail.seasonalWarning')}:</strong> {plant.seasonality.warning}
                </p>
              )}
            </section>
          )}

          {/* Section 5: AEO FAQ SECTION */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-sm space-y-4">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-forest-950 border-b border-forest-50 pb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-herbal-600" />
              <span>{isEn ? `5. Frequently Asked Questions about ${plant.common_name}` : `5. Câu Hỏi Thường Gặp Về Cây ${plant.common_name} (FAQs)`}</span>
            </h2>

            <div className="space-y-3">
              {faqsList.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-forest-100 rounded-2xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left p-4 sm:p-4.5 bg-forest-50/50 hover:bg-forest-50 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-forest-950"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-forest-600 shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-herbal-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-4.5 bg-white text-xs sm:text-sm text-forest-900 leading-relaxed font-sans border-t border-forest-50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 6: GEO Authoritative Citations & References */}
          <section className="bg-forest-50/60 rounded-3xl p-6 border border-forest-100 space-y-2 text-xs">
            <h3 className="font-bold text-forest-950 flex items-center gap-1.5 uppercase tracking-wider text-xs">
              <BookOpen className="w-4 h-4 text-herbal-700" />
              <span>{t('plantDetail.academicReferences')}</span>
            </h3>
            <ul className="space-y-1.5 text-forest-800 list-disc pl-5">
              {citationsList.map((cite, i) => (
                <li key={i}>{cite}</li>
              ))}
            </ul>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* GEO ENTITY KNOWLEDGE GRAPH BOX */}
          <div className="bg-white rounded-3xl p-6 border border-forest-100 shadow-sm space-y-4">
            <h3 className="text-sm font-serif font-bold text-forest-950 uppercase tracking-wider border-b border-forest-50 pb-2.5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-herbal-600" />
              <span>{isEn ? 'Botanical Entity Registry (GEO)' : 'Hồ Sơ Thực Thể Thực Vật (GEO)'}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 block text-[11px]">{t('plantDetail.botanicalFamily')}:</span>
                <span className="font-bold text-forest-900">{botanicalFamily}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">{t('plantDetail.nativeRange')}:</span>
                <span className="font-bold text-forest-900">{nativeRange}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">{t('plantDetail.activeCompounds')}:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activeCompounds.map((act, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-forest-50 text-forest-800 text-[11px] font-medium border border-forest-100"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-forest-50">
                <div>
                  <span className="text-gray-500 block text-[11px] flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-rose-500" /> {t('plantDetail.idealTemp')}:
                  </span>
                  <span className="font-bold text-forest-900">22°C - 34°C</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[11px] flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-500" /> {t('plantDetail.soilPh')}:
                  </span>
                  <span className="font-bold text-forest-900">pH 6.0 - 7.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monetization Card */}
          {plant.monetization_tips && (
            <div className="bg-white rounded-3xl p-6 border border-terracotta-200 shadow-sm space-y-4">
              <h3 className="text-base font-serif font-bold text-terracotta-900 flex items-center gap-2">
                <Coins className="w-5 h-5 text-terracotta-600" />
                <span>{t('plantDetail.monetizationTitle')}</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-800">
                {plant.monetization_tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-terracotta-600 font-bold">•</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SHA-256 Web3 Proof Card */}
          {plant.image_sha256 && (
            <div className="bg-white rounded-3xl p-6 border border-forest-100 shadow-sm space-y-2">
              <h3 className="text-xs font-bold text-forest-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Hash className="w-3.5 h-3.5 text-forest-600" />
                <span>{isEn ? 'Digital Provenance (Web3 Proof)' : 'Bảo Chứng Số (Web3 Proof)'}</span>
              </h3>
              <p className="text-[11px] font-mono text-gray-500 break-all bg-forest-50 p-2.5 rounded-xl border border-forest-100">
                {plant.image_sha256}
              </p>
              <p className="text-[11px] text-forest-700 pt-1">
                {isEn
                  ? 'Featured photo is SHA-256 hashed against spoofing and prepared for NFT passport connection.'
                  : 'Ảnh đại diện đã được băm SHA-256 chống mạo danh và sẵn sàng kết nối Hộ chiếu số NFT.'}
              </p>
            </div>
          )}

          {/* Related Plants */}
          <div className="bg-white rounded-3xl p-6 border border-forest-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-forest-950 uppercase tracking-wider">
              {isEn ? `Related in ${categoryName}` : `Cùng Chuyên Mục ${categoryName}`}
            </h3>
            <div className="space-y-3">
              {relatedPlants.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/cay/${rel.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded-2xl hover:bg-forest-50 transition group"
                >
                  <img
                    src={rel.image_url}
                    alt={rel.common_name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-forest-950 truncate group-hover:text-herbal-700 transition">
                      {rel.common_name}
                    </h4>
                    <p className="text-[11px] font-mono italic text-forest-600 truncate">
                      {rel.scientific_name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Modal Báo Cáo Vi Phạm */}
      {isReportModalOpen && plant && (
        <ReportModal
          isOpen={true}
          onClose={() => setIsReportModalOpen(false)}
          targetType="plant_info"
          targetId={plant.id}
          targetTitle={isEn ? `Species: ${plant.common_name} (${plant.scientific_name})` : `Loài: ${plant.common_name} (${plant.scientific_name})`}
        />
      )}

    </article>
  );
};
