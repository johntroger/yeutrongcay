import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Plant } from '../types/index.ts';
import { SEED_PLANTS } from '../data/plants.ts';
import { getPlantBySlug, isPlantInMyGarden, savePlantToMyGarden } from '../services/apiService.ts';
import { useSEO } from '../utils/useSEO.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import { localizePlant } from '../i18n/plantTranslations.ts';
import { getCollectionsForPlant, getPlantSubcategory } from '../data/collections.ts';
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
  CheckCircle2,
  Clock,
  Home,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Layers,
  Thermometer,
  Sprout,
  Flag,
  Info,
  ExternalLink,
  UserCheck,
  MapPin,
  Heart,
  X
} from 'lucide-react';
import { ReportModal } from '../components/ReportModal.tsx';
import { ShareModal } from '../components/ShareModal.tsx';
import { plantPassportRegistryService, RegisteredPlantPassport } from '../services/plantPassportRegistryService.ts';
import { plantReviewService } from '../services/plantReviewService.ts';
import { PlantHeartReviewSection } from '../components/PlantHeartReviewSection.tsx';
import { getCategoryConfig, getNftClassConfig, resolvePlantNftClass } from '../config/ecosystemRegistry.ts';

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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Tìm cây theo slug (kết hợp cache tức thì + dữ liệu động từ MySQL)
  const [rawPlant, setRawPlant] = useState<Plant | undefined>(() => SEED_PLANTS.find((p) => p.slug === slug));

  const [isSaved, setIsSaved] = useState<boolean>(() => {
    return rawPlant ? isPlantInMyGarden(rawPlant.id) || isPlantInMyGarden(rawPlant.slug) : false;
  });
  const [saveToast, setSaveToast] = useState<{ message: string; showGardenLink: boolean } | null>(null);

  useEffect(() => {
    if (rawPlant) {
      setIsSaved(isPlantInMyGarden(rawPlant.id) || isPlantInMyGarden(rawPlant.slug));
    }
  }, [rawPlant]);

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
  const plantCollections = plant ? getCollectionsForPlant(plant.id) : [];
  const plantSubcategory = plant ? getPlantSubcategory(plant.id) : undefined;

  // Tra cứu trạng thái NFT Độc Bản của loài cây này theo thời gian thực
  const [mintedPassport, setMintedPassport] = useState<RegisteredPlantPassport | undefined>(() =>
    rawPlant
      ? plantPassportRegistryService.findPassportForPlant({
          plantName: rawPlant.common_name,
          scientificName: rawPlant.scientific_name,
          sha256: rawPlant.image_sha256,
        })
      : undefined
  );

  useEffect(() => {
    const syncNftStatus = () => {
      if (!rawPlant) {
        setMintedPassport(undefined);
        return;
      }
      setMintedPassport(
        plantPassportRegistryService.findPassportForPlant({
          plantName: rawPlant.common_name,
          scientificName: rawPlant.scientific_name,
          sha256: rawPlant.image_sha256,
        })
      );
    };

    syncNftStatus();
    plantPassportRegistryService.syncWithCloud().then(syncNftStatus).catch(() => {});
    window.addEventListener('ytc_passport_registry_updated', syncNftStatus);
    return () => {
      window.removeEventListener('ytc_passport_registry_updated', syncNftStatus);
    };
  }, [rawPlant]);

  const ownerMeta = mintedPassport ? plantPassportRegistryService.getOwnerProfileMeta(mintedPassport) : null;

  // Khởi tạo các giá trị AEO / GEO chuẩn hóa theo 7 ngành hàng
  const catConfig = getCategoryConfig(plant?.category || 'herb');
  const categoryName = isEn ? catConfig.labelEn : catConfig.labelVi;
  const categoryPath = catConfig.dedicatedPath;
  const nftClass = plant ? resolvePlantNftClass(plant) : 'botanical';
  const nftClassConfig = getNftClassConfig(nftClass);
  const nftConfig = nftClassConfig;

  const [heartSummary, setHeartSummary] = useState(() =>
    plant ? plantReviewService.getCachedSummary(plant.slug) : { average_hearts: 5.0, total_reviews: 0, photo_count: 0 }
  );

  useEffect(() => {
    if (plant?.slug) {
      plantReviewService.fetchAllReviewSummaries().then(() => {
        setHeartSummary(plantReviewService.getCachedSummary(plant.slug));
      });
      const unsub = plantReviewService.subscribe(() => {
        setHeartSummary(plantReviewService.getCachedSummary(plant.slug));
      });
      return unsub;
    }
  }, [plant?.slug]);

  const isForest = plant?.category === 'forest' || nftClass === 'geo_forest_10000m2';
  const forestStats = isForest && plant?.forest_spec
    ? plantPassportRegistryService.getForestMintedAreaStats(plant.slug, plant.forest_spec.total_area_m2)
    : null;

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

  // 5. GEO Academic Citations & Reference Sources
  const citationsList: string[] =
    (plant?.reference_sources && plant.reference_sources.length > 0)
      ? plant.reference_sources.map((s: any) =>
          typeof s === 'string'
            ? s
            : `${s.title}${s.author ? ` — ${s.author}` : ''}${s.organization ? ` (${s.organization})` : ''}`
        )
      : plant?.academic_citations ||
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
        url: 'https://yeutrongcay.com',
        sameAs: [
          'https://www.facebook.com/yeutrongcay',
          'https://www.youtube.com/@yeutrongcay'
        ],
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
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 py-20 text-center">
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

  const handleSaveToGarden = () => {
    if (!plant) return;

    if (isSaved) {
      // Nếu cây đã có trong Vườn của tôi, click sẽ điều hướng sang Vườn của tôi để người dùng kiểm tra ngay
      navigate('/vuon-cua-toi');
      return;
    }

    savePlantToMyGarden(plant);
    if (onAddPlantToGarden) {
      onAddPlantToGarden(plant.id);
    }
    setIsSaved(true);
    setSaveToast({
      message: isEn
        ? `Added "${plant.common_name}" to My Garden!`
        : `Đã thêm "${plant.common_name}" vào Vườn của tôi!`,
      showGardenLink: true
    });
    setTimeout(() => {
      setSaveToast(null);
    }, 5000);
  };

  // Cây liên quan cùng category
  const relatedPlants = SEED_PLANTS.filter(
    (p) => p.category === plant.category && p.id !== plant.id
  ).slice(0, 3).map((p) => localizePlant(p, language));

  return (
    <article className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      
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

        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Web3 NFT Quick Action Button in Top Bar */}
          {mintedPassport && ownerMeta ? (
            <Link
              to={ownerMeta.profilePath}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-gradient-to-r from-amber-100 via-emerald-100 to-amber-100 hover:from-amber-200 hover:to-emerald-200 px-3.5 py-2 rounded-xl border border-amber-400/80 shadow-2xs transition"
              title={isEn ? `${nftConfig.certificateTitle} #${mintedPassport.token_id} • ${ownerMeta.displayLabel}` : `${nftConfig.certificateTitle} #${mintedPassport.token_id} • Xem trang sở hữu của ${ownerMeta.displayLabel}`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {isEn
                  ? `${nftConfig.shortName} #${mintedPassport.token_id} • ${ownerMeta.displayLabel}`
                  : `${nftConfig.shortName} #${mintedPassport.token_id} • ${ownerMeta.displayLabel}`}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            </Link>
          ) : (
            <Link
              to={`/web3-sandbox?mint=${encodeURIComponent(plant.slug)}&class=${nftClass}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-3.5 py-2 rounded-xl shadow-xs transition"
              title={isEn ? `Be the first to mint ${nftConfig.nameEn}` : `Đăng ký độc bản ${nftConfig.nameVi} (Ai làm trước sở hữu trước)`}
            >
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{isEn ? nftConfig.mintButtonCompactEn : nftConfig.mintButtonCompactVi}</span>
            </Link>
          )}

          {/* Share Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-900 bg-white hover:bg-forest-50 px-3.5 py-2 rounded-xl border border-forest-200 shadow-2xs transition"
            title={t('plantDetail.sharePlant')}
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">{t('common.share')}</span>
          </button>

          {/* Bookmark / Add to Garden Button */}
          <button
            onClick={handleSaveToGarden}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition ${
              isSaved
                ? 'bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600/80 cursor-pointer'
                : 'bg-forest-900 hover:bg-forest-800 text-white cursor-pointer'
            }`}
            title={
              isSaved
                ? (isEn ? 'Already in your garden - Click to open My Garden' : 'Đã có trong vườn - Bấm để mở Vườn của tôi')
                : (isEn ? 'Add to My Garden' : 'Thêm vào Vườn của tôi')
            }
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
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
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="960" height="480" viewBox="0 0 960 480"><rect width="100%" height="100%" fill="%23064e3b"/><g fill="none" stroke="%2334d399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(430, 160)"><path d="M50 160 C50 100, 10 70, 0 50 C40 50, 80 80, 80 160"/><path d="M50 160 C50 90, 90 60, 100 40 C70 40, 40 70, 30 140"/><line x1="50" y1="160" x2="50" y2="20"/></g><text x="50%" y="82%" text-anchor="middle" fill="%23a7f3d0" font-family="system-ui,sans-serif" font-size="20" font-weight="600" letter-spacing="1">YEU TRONG CAY</text></svg>`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent flex items-end p-6 sm:p-10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md">
                  {isEn ? `${categoryName} of Vietnam` : `${categoryName} Bản Địa Việt Nam`}
                </div>
                {mintedPassport && ownerMeta && (
                  <Link
                    to={ownerMeta.profilePath}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/90 hover:bg-amber-400 text-forest-950 backdrop-blur-md shadow-md transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>
                      {isEn
                        ? `${nftConfig.shortName} (#${mintedPassport.token_id}) • ${ownerMeta.displayLabel}`
                        : `${nftConfig.certificateTitle} (#${mintedPassport.token_id}) • ${ownerMeta.displayLabel}`}
                    </span>
                  </Link>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                {plant.common_name}
              </h1>
              <p className="text-sm sm:text-base font-mono italic text-herbal-300 mt-1">
                {plant.scientific_name}
              </p>
              {/* Heart Rating Strip */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <a
                  href="#reviews-section"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/85 hover:bg-rose-500 text-white text-xs font-bold backdrop-blur-md transition shadow-xs cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{heartSummary.average_hearts.toFixed(1)} / 5</span>
                  <span className="opacity-80 font-normal">
                    ({heartSummary.total_reviews} {isEn ? 'reviews' : 'đánh giá'})
                  </span>
                </a>
                <a
                  href="#reviews-section"
                  className="text-xs text-white/90 hover:text-white underline underline-offset-2 transition"
                >
                  {isEn ? 'Share your review & photo →' : 'Viết cảm nhận & gửi ảnh thực tế →'}
                </a>
              </div>
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
          {isForest && plant.forest_spec ? (
            <>
              <div>
                <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
                  <span className="text-teal-600">🌲</span> {isEn ? 'Total Area' : 'Tổng Diện Tích'}
                </span>
                <span className="font-bold text-forest-950">
                  {(plant.forest_spec.total_area_m2 / 10000).toLocaleString('vi-VN')} ha
                </span>
              </div>
              <div>
                <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
                  <MapPin className="w-4 h-4 text-rose-500" /> {isEn ? 'Allowed Radius' : 'Bán Kính GPS'}
                </span>
                <span className="font-bold text-forest-950">
                  ±{plant.forest_spec.radius_km} km
                </span>
              </div>
              <div>
                <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> {isEn ? 'Lot Unit' : 'Quy Chuẩn 1 NFT'}
                </span>
                <span className="font-bold text-forest-950">
                  10.000 m² (1 ha)
                </span>
              </div>
              <div>
                <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
                  <Sparkles className="w-4 h-4 text-amber-500" /> {isEn ? 'Conserved Lots' : 'Lô Đã Đúc'}
                </span>
                <span className="font-bold text-forest-950">
                  {forestStats?.mintedCount || 0} / {plant.forest_spec.max_nft_supply} Lô
                </span>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Web3 Exclusive NFT Ownership Banner on Every Article */}
        {mintedPassport && ownerMeta ? (
          <div className="p-5 sm:px-8 bg-gradient-to-r from-forest-950 via-charcoal-900 to-emerald-950 text-white border-t border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/60 text-amber-300 flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-forest-950 text-[10px] font-black uppercase tracking-wider">
                    {isEn ? `${nftConfig.shortName} • Token #${mintedPassport.token_id}` : `${nftConfig.certificateTitle} • Token #${mintedPassport.token_id}`}
                  </span>
                  <span className="text-xs font-mono text-emerald-300">
                    {mintedPassport.network}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-forest-100 mt-1">
                  {isEn ? (
                    <>
                      {nftConfig.claimedDescEn} by{' '}
                      <Link to={ownerMeta.profilePath} className="font-bold text-amber-300 underline hover:text-amber-200">
                        {ownerMeta.displayLabel}
                      </Link>{' '}
                      (<span className="font-mono text-xs text-forest-300">{ownerMeta.shortWallet}</span>).
                    </>
                  ) : (
                    <>
                      {nftConfig.claimedDescVi} và thuộc quyền của{' '}
                      <Link to={ownerMeta.profilePath} className="font-bold text-amber-300 underline hover:text-amber-200">
                        {ownerMeta.displayLabel}
                      </Link>{' '}
                      (Ví: <span className="font-mono text-xs text-forest-300">{ownerMeta.shortWallet}</span>).
                    </>
                  )}
                </p>
              </div>
            </div>

            <Link
              to={ownerMeta.profilePath}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-forest-950 font-bold text-xs inline-flex items-center justify-center gap-2 shrink-0 shadow-md transition"
            >
              <UserCheck className="w-4 h-4" />
              <span>
                {isEn
                  ? `Visit ${nftConfig.ownerRoleLabelEn} (${ownerMeta.displayLabel})`
                  : `Trang ${nftConfig.ownerRoleLabelVi} (${ownerMeta.displayLabel})`}
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="p-5 sm:px-8 bg-gradient-to-r from-forest-900 via-emerald-950 to-charcoal-900 text-white border-t border-emerald-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-[10px] font-bold uppercase tracking-wider">
                    {isEn ? `Unclaimed ${nftConfig.shortName} NFT` : `Chưa Có Chủ Sở Hữu • ${nftConfig.nameVi}`}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-forest-100 mt-1">
                  {isEn ? nftConfig.unclaimedDescEn : nftConfig.unclaimedDescVi}
                </p>
              </div>
            </div>

            <Link
              to={`/web3-sandbox?mint=${encodeURIComponent(plant.slug)}&class=${nftClass}`}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-forest-950 font-bold text-xs inline-flex items-center justify-center gap-2 shrink-0 shadow-md transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEn ? nftConfig.mintButtonBannerEn : nftConfig.mintButtonBannerVi}</span>
            </Link>
          </div>
        )}

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-forest-50 pb-3">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-forest-950 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-herbal-600" />
                <span>{isEn ? '1. Botanical Profile & Characteristics' : '1. Đặc Điểm Sinh Học & Giá Trị Bản Địa'}</span>
              </h2>
              {plantSubcategory && (
                <span className="self-start sm:self-auto text-xs font-semibold text-herbal-700 bg-herbal-50 px-3 py-1 rounded-full border border-herbal-200/60 flex items-center gap-1.5">
                  <span>{plantSubcategory.icon}</span>
                  <span>{isEn ? plantSubcategory.name_en : plantSubcategory.name}</span>
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-charcoal-900 leading-relaxed font-sans">
              {plant.description}
            </p>

            {/* Clickable Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {plant.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  to={`/?tag=${encodeURIComponent(tag)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-forest-50 hover:bg-herbal-100 text-forest-800 hover:text-herbal-900 border border-forest-100 hover:border-herbal-300 transition flex items-center gap-1 group shadow-2xs"
                  title={isEn ? `Filter all plants tagged #${tag}` : `Lọc tất cả cây có thẻ #${tag}`}
                >
                  <Hash className="w-3 h-3 text-herbal-600 group-hover:scale-110 transition" />
                  <span>{tag}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 1.5: Thuộc Bộ Sưu Tập & Gợi Ý Trồng Xen (Companion Planting) */}
          {plantCollections.length > 0 && (
            <section className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-100/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-600 text-white">
                    <Layers className="w-4 h-4" />
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950">
                    {isEn ? 'Solution Collections & Companion Set' : 'Bộ Sưu Tập Cây Trồng & Gợi Ý Trồng Xen'}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {plantCollections.map((col) => {
                  const companionPlants = SEED_PLANTS.filter(
                    (p) => col.plantIds.includes(p.id) && p.id !== plant.id
                  );
                  return (
                    <div
                      key={col.id}
                      className="p-4 rounded-2xl bg-white border border-emerald-100/80 shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{col.icon}</span>
                          <span className="font-bold text-sm text-forest-950">
                            {isEn ? col.title_en : col.title}
                          </span>
                        </div>
                        <Link
                          to={`/?collection=${col.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                        >
                          <span>{isEn ? 'View all in collection' : 'Xem toàn bộ cây trong bộ'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      {col.companion_planting_tip && (
                        <div className="flex items-start gap-1.5 text-xs text-forest-800 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/50">
                          <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>{isEn ? 'Companion Tip: ' : 'Mẹo Phối Chậu: '}</strong>
                            {isEn ? col.companion_planting_tip_en : col.companion_planting_tip}
                          </span>
                        </div>
                      )}

                      {companionPlants.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[11px] font-semibold text-forest-700 block mb-1.5">
                            {isEn ? 'Companion Plants In This Set:' : 'Cây Thường Trồng Cùng Trong Bộ Này:'}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {companionPlants.slice(0, 4).map((cp) => (
                              <Link
                                key={cp.id}
                                to={`/cay/${cp.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-xl text-xs font-medium bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-100 transition flex items-center gap-1.5"
                              >
                                <span className="text-sm">
                                  {cp.category === 'herb' ? '🌿' : cp.category === 'fruit' ? '🍋' : '🌸'}
                                </span>
                                <span>{cp.common_name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

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

              {/* Khối Cảnh Báo An Toàn Dược Liệu & Chống Chỉ Định (WCAG AAA High-Contrast) */}
              {(plant.medical_info.toxicity_warning || plant.medical_info.confusion_risk || (plant.medical_info.contraindications && plant.medical_info.contraindications.length > 0) || (plant.medical_info.drug_interactions && plant.medical_info.drug_interactions.length > 0)) && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/60 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span className="font-bold text-sm sm:text-base uppercase tracking-wide">
                      {isEn ? 'Safety Notice & Contraindications' : 'Khuyến Cáo An Toàn & Chống Chỉ Định Dược Liệu'}
                    </span>
                  </div>

                  {plant.medical_info.toxicity_warning && (
                    <div className="text-xs sm:text-sm text-slate-800 dark:text-amber-100 leading-relaxed font-medium pl-7">
                      <strong className="text-amber-950 dark:text-amber-200">{t('plantDetail.toxicityTitle')}: </strong>
                      {plant.medical_info.toxicity_warning}
                    </div>
                  )}

                  {/* Chống chỉ định (Contraindications) */}
                  {plant.medical_info.contraindications && plant.medical_info.contraindications.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-100/70 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 text-xs sm:text-sm space-y-1.5">
                      <div className="font-bold text-amber-950 dark:text-amber-100 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-600 inline-block"></span>
                        <span>{isEn ? 'Contraindications (Avoid use):' : 'Chống chỉ định (Đối tượng cần thận trọng):'}</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-slate-800 dark:text-amber-100 leading-relaxed">
                        {plant.medical_info.contraindications.map((ci, idx) => (
                          <li key={idx}>{ci}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tương tác thuốc (Drug Interactions) */}
                  {plant.medical_info.drug_interactions && plant.medical_info.drug_interactions.length > 0 && (
                    <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 text-xs sm:text-sm space-y-1.5">
                      <div className="font-bold text-rose-950 dark:text-rose-200 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-600 inline-block"></span>
                        <span>{isEn ? 'Drug & Substance Interactions:' : 'Tương tác thuốc & Dược chất cần lưu ý:'}</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-slate-800 dark:text-rose-100 leading-relaxed">
                        {plant.medical_info.drug_interactions.map((di, idx) => (
                          <li key={idx}>{di}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {plant.medical_info.confusion_risk && (
                    <div className="p-3 rounded-xl bg-white/90 dark:bg-black/30 border border-rose-300 dark:border-rose-700/60 text-xs sm:text-sm text-slate-900 dark:text-rose-100 space-y-1">
                      <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        <span>{t('plantDetail.confusionRiskTitle')}: {plant.medical_info.confusion_risk.confused_with}</span>
                      </div>
                      <p className="leading-relaxed pl-5 text-slate-700 dark:text-rose-100">
                        <strong className="text-rose-950 dark:text-white">{t('plantDetail.distinguishingFeatures')}</strong> {plant.medical_info.confusion_risk.distinguishing_features}
                      </p>
                    </div>
                  )}
                </div>
              )}

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

              {/* Disclaimer */}
              <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed font-medium">
                ⚠️ <strong className="text-slate-800">Lưu ý y tế quan trọng:</strong> {plant.medical_info.disclaimer}
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

          {/* BẢNG QUỸ DIỆN TÍCH BẢO TỒN RỪNG (10.000 M² / LÔ NFT) DÀNH CHO CATEGORY FOREST */}
          {isForest && plant.forest_spec && (
            <section className="bg-gradient-to-br from-teal-900 via-forest-950 to-charcoal-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-teal-500/50 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-teal-800/80 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-800/80 text-teal-200 text-xs font-bold mb-2 border border-teal-400/40">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{isEn ? 'GPS Geo-Conservation Quota' : 'Quỹ Bảo Tồn Địa Không Gian Rừng'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {isEn ? 'Forest Conservation Lot Quota (10,000 m² / NFT)' : 'Bảng Quỹ Lô Rừng Tự Nhiên (10.000 m² / NFT)'}
                  </h3>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="text-2xl font-mono font-black text-emerald-400">
                    {forestStats?.mintedCount || 0} / {plant.forest_spec.max_nft_supply}
                  </span>
                  <p className="text-[11px] text-teal-300 font-medium">
                    {isEn ? 'Lots Conserved' : 'Lô đã đúc quyền bảo tồn'}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              {(() => {
                const percentMinted =
                  forestStats && forestStats.maxSupply > 0
                    ? (forestStats.mintedCount / forestStats.maxSupply) * 100
                    : 0;
                return (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-teal-200 font-medium">
                      <span>{isEn ? 'Conservation Progress:' : 'Tiến trình bảo tồn tổng diện tích:'}</span>
                      <span className="font-mono font-bold text-emerald-300">
                        {((forestStats?.mintedCount || 0) * 10000).toLocaleString('vi-VN')} m² / {plant.forest_spec.total_area_m2.toLocaleString('vi-VN')} m² ({percentMinted.toFixed(2)}%)
                      </span>
                    </div>
                    <div className="w-full bg-teal-950 h-3 rounded-full overflow-hidden border border-teal-700/60 p-0.5">
                      <div
                        className="bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300 h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, Math.max(0, percentMinted))}%` }}
                      />
                    </div>
                  </div>
                );
              })()}

              {/* Geo Spec Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-teal-950/60 border border-teal-800/80">
                  <span className="text-teal-400 block mb-1 font-semibold">{isEn ? 'Total Reserve Area' : 'Tổng Diện Tích Vùng'}</span>
                  <span className="text-base font-bold text-white font-mono">
                    {(plant.forest_spec.total_area_m2 / 10000).toLocaleString('vi-VN')} ha
                  </span>
                  <p className="text-[10px] text-teal-300/80 mt-0.5">
                    = {plant.forest_spec.total_area_m2.toLocaleString('vi-VN')} m²
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-teal-950/60 border border-teal-800/80">
                  <span className="text-teal-400 block mb-1 font-semibold">{isEn ? 'Center Coordinates' : 'Tọa Độ Tâm Khu Bảo Tồn'}</span>
                  <span className="text-base font-bold text-white font-mono">
                    {plant.forest_spec.center_lat.toFixed(4)}, {plant.forest_spec.center_lng.toFixed(4)}
                  </span>
                  <p className="text-[10px] text-teal-300/80 mt-0.5">
                    Bán kính hợp lệ: ±{plant.forest_spec.radius_km} km
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-teal-950/60 border border-teal-800/80">
                  <span className="text-teal-400 block mb-1 font-semibold">{isEn ? 'Unit Allocation' : 'Đơn Vị Mỗi Lô Đúc'}</span>
                  <span className="text-base font-bold text-white font-mono">
                    10.000 m² (1 ha)
                  </span>
                  <p className="text-[10px] text-teal-300/80 mt-0.5">
                    Yêu cầu: Có mặt thực địa GPS
                  </p>
                </div>
              </div>

              {/* Action CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-teal-200/90 leading-relaxed max-w-xl">
                  {isEn
                    ? 'To prevent armchair hoarding, each 10,000 m² lot can only be minted when your device proves you are within the official forest sanctuary boundaries.'
                    : 'Để ngăn chặn tình trạng đầu cơ từ xa, mỗi Lô 10.000 m² chỉ được phép đúc khi thiết bị của bạn chứng minh đang có mặt trong phạm vi tọa độ thực tế của khu bảo tồn.'}
                </p>
                <Link
                  to={`/web3-sandbox?mint=${encodeURIComponent(plant.slug)}`}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-forest-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition shrink-0"
                >
                  <MapPin className="w-4 h-4 text-forest-950" />
                  <span>{isEn ? 'GPS Check-in & Mint Lot' : '📍 Xác Thực GPS & Đúc Lô Rừng'}</span>
                </Link>
              </div>
            </section>
          )}

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">

          {/* WEB3 EXCLUSIVE NFT PASSPORT / FOREST LOTS / FIRST-TO-MINT SIDEBAR CARD */}
          {isForest && plant.forest_spec ? (
            <div className="bg-gradient-to-br from-teal-950 via-forest-950 to-charcoal-900 rounded-3xl p-6 border-2 border-teal-400/70 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-teal-800 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-400 shrink-0" />
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                    {isEn ? 'Forest Conservation NFT' : 'NFT Lô Rừng Tự Nhiên'}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-400 text-teal-950 text-[10px] font-black font-mono">
                  10.000 m² / Lô
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-900/60 border border-teal-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-teal-300">Đã đúc bảo tồn:</span>
                  <span className="font-mono font-bold text-emerald-300">
                    {forestStats?.mintedCount || 0} / {plant.forest_spec.max_nft_supply} Lô
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-300">Diện tích bảo tồn:</span>
                  <span className="font-semibold text-white">
                    {((forestStats?.mintedCount || 0) * 10000).toLocaleString('vi-VN')} m²
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-300">Tọa độ tâm:</span>
                  <span className="font-mono text-teal-200">
                    {plant.forest_spec.center_lat.toFixed(2)}, {plant.forest_spec.center_lng.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-teal-300">Bán kính check-in:</span>
                  <span className="font-semibold text-emerald-300">±{plant.forest_spec.radius_km} km</span>
                </div>
              </div>

              <Link
                to={`/web3-sandbox?mint=${encodeURIComponent(plant.slug)}`}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-forest-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <MapPin className="w-4 h-4" />
                <span>{isEn ? 'GPS Check-in & Mint Lot' : '📍 Xác Thực GPS & Đúc Lô Rừng'}</span>
              </Link>
            </div>
          ) : mintedPassport && ownerMeta ? (
            <div className="bg-gradient-to-br from-forest-950 via-charcoal-900 to-emerald-950 rounded-3xl p-6 border-2 border-amber-400/70 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-forest-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                    {isEn ? `${nftConfig.shortName} NFT Certificate` : nftConfig.certificateTitle}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-forest-950 text-[10px] font-black font-mono">
                  Token #{mintedPassport.token_id}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-forest-900/70 border border-amber-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-forest-300">{isEn ? `${nftConfig.ownerRoleLabelEn}:` : `${nftConfig.ownerRoleLabelVi}:`}</span>
                  <Link
                    to={ownerMeta.profilePath}
                    className="font-bold text-amber-300 hover:text-amber-200 underline flex items-center gap-1"
                  >
                    <span>{ownerMeta.displayLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-forest-300">{isEn ? 'Owner Wallet:' : 'Ví Web3:'}</span>
                  <span className="font-mono text-emerald-300">{ownerMeta.shortWallet}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-forest-300">{isEn ? 'Blockchain:' : 'Sổ cái:'}</span>
                  <span className="font-semibold text-white">{mintedPassport.network}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-forest-300">{isEn ? 'Minted At:' : 'Ngày đúc:'}</span>
                  <span className="text-forest-200">{mintedPassport.minted_at}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-charcoal-950/90 border border-forest-800 text-[10px] font-mono text-gray-400">
                <span className="text-gray-300 block mb-0.5">SHA-256 Fingerprint:</span>
                <span className="text-emerald-400 truncate block">{mintedPassport.image_sha256}</span>
              </div>

              <Link
                to={ownerMeta.profilePath}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-forest-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <UserCheck className="w-4 h-4" />
                <span>
                  {isEn
                    ? `View ${nftConfig.ownerRoleLabelEn} (${ownerMeta.displayLabel})`
                    : `Trang ${nftConfig.ownerRoleLabelVi} (${ownerMeta.displayLabel})`}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-forest-950 via-emerald-950 to-charcoal-900 rounded-3xl p-6 border border-emerald-500/40 text-white shadow-lg space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-forest-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                    {isEn ? `${nftConfig.shortName} NFT Asset` : nftConfig.certificateTitle}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold">
                  {isEn ? 'Available' : 'Chưa có chủ'}
                </span>
              </div>

              <p className="text-xs text-forest-200 leading-relaxed">
                {isEn ? nftConfig.unclaimedDescEn : nftConfig.unclaimedDescVi}
              </p>

              <div className="p-2.5 rounded-xl bg-charcoal-950/80 border border-forest-800 text-[10px] font-mono text-gray-400">
                <span className="text-gray-300 block mb-0.5">Mã định danh SHA-256 bài viết:</span>
                <span className="text-emerald-400 truncate block">{plant.image_sha256}</span>
              </div>

              <Link
                to={`/web3-sandbox?mint=${encodeURIComponent(plant.slug)}&class=${nftClass}`}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-forest-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isEn ? nftConfig.mintButtonActionEn : nftConfig.mintButtonActionVi}</span>
              </Link>
            </div>
          )}
          
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

      {/* 4. Khối Đánh Giá 1-5 Trái Tim Đỏ & Bình Luận Hình Ảnh Tối Ưu WebP */}
      <PlantHeartReviewSection
        plantSlug={plant.slug}
        plantName={plant.common_name}
      />

      {/* Modal Chia Sẻ Mạng Xã Hội */}
      {isShareModalOpen && plant && (
        <ShareModal
          isOpen={true}
          onClose={() => setIsShareModalOpen(false)}
          title={isEn ? `${plant.common_name} (${plant.scientific_name}) - Uses & Care Guide` : `${plant.common_name} (${plant.scientific_name}) - Công Dụng & Cách Trồng`}
          text={quickAnswerText}
          url={pageUrl}
          imageUrl={plant.image_url}
          badge={categoryName}
        />
      )}

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

      {/* Toast thông báo lưu thành công vào Vườn của tôi */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-forest-950/95 text-white rounded-2xl shadow-2xl border border-emerald-500/50 backdrop-blur-md animate-fade-in text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{saveToast.message}</span>
          {saveToast.showGardenLink && (
            <Link
              to="/vuon-cua-toi"
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition ml-1 shrink-0"
            >
              {isEn ? 'Open Garden' : 'Mở Vườn'}
            </Link>
          )}
          <button
            onClick={() => setSaveToast(null)}
            className="p-1 text-forest-400 hover:text-white transition ml-1 cursor-pointer"
            title={isEn ? 'Close' : 'Đóng'}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </article>
  );
};
