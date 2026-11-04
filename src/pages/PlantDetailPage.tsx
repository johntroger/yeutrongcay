import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEED_PLANTS } from '../data/plants.ts';
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
  Home
} from 'lucide-react';

interface PlantDetailPageProps {
  onOpenMyGarden?: () => void;
  onAddPlantToGarden?: (plantId: string) => void;
}

export const PlantDetailPage: React.FC<PlantDetailPageProps> = ({
  onAddPlantToGarden
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Tìm cây theo slug
  const plant = SEED_PLANTS.find((p) => p.slug === slug);

  // Cập nhật title & scroll lên đầu trang khi mở bài viết
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (plant) {
      document.title = `${plant.common_name} (${plant.scientific_name}) - Cẩm Nang Trồng & Bài Thuốc | Yêu Trồng Cây`;
    } else {
      document.title = `Không Tìm Thấy Cây | Yêu Trồng Cây`;
    }
  }, [plant]);

  if (!plant) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-3xl bg-forest-100 text-forest-700 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-forest-950 mb-2">
          Không tìm thấy bài viết về cây này
        </h2>
        <p className="text-sm text-forest-800 mb-6">
          Có thể đường dẫn đã thay đổi hoặc cây chưa được cập nhật vào từ điển.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-forest-900 text-white text-xs font-semibold hover:bg-forest-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay về trang chủ</span>
        </Link>
      </div>
    );
  }

  const categoryName =
    plant.category === 'herb'
      ? 'Thảo Dược'
      : plant.category === 'fruit'
      ? 'Cây Ăn Trái'
      : 'Cây Cảnh & Bonsai';

  const categoryPath =
    plant.category === 'herb'
      ? '/thao-duoc'
      : plant.category === 'fruit'
      ? '/cay-an-trai'
      : '/cay-canh';

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
  ).slice(0, 3);

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* 1. Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-forest-700 mb-6 overflow-x-auto no-scrollbar">
        <Link to="/" className="hover:text-forest-950 flex items-center gap-1 transition">
          <Home className="w-3.5 h-3.5" />
          <span>Trang Chủ</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-forest-400 shrink-0" />
        <Link to={categoryPath} className="hover:text-forest-950 font-medium transition whitespace-nowrap">
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
          <span>Quay lại</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Share Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-900 bg-white hover:bg-forest-50 px-3.5 py-2 rounded-xl border border-forest-200 shadow-2xs transition"
            title="Sao chép liên kết bài viết này"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Đã sao chép link!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-forest-600" />
                <span className="hidden sm:inline">Chia sẻ link</span>
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
                <span>Đã lưu vào vườn!</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-herbal-400" />
                <span>Lưu vào Vườn</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. Hero Visual & Headline Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-forest-100 shadow-sm mb-10">
        
        {/* Plant Image Header */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-forest-950 overflow-hidden">
          <img
            src={plant.image_url}
            alt={plant.common_name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent flex items-end p-6 sm:p-10">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md mb-2">
                {categoryName} Bản Địa
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                {plant.common_name}
              </h1>
              <p className="text-sm sm:text-base font-mono italic text-herbal-300 mt-1">
                {plant.scientific_name}
              </p>
              {plant.aliases.length > 0 && (
                <p className="text-xs text-white/80 mt-2 font-sans">
                  Tên gọi địa phương: <strong>{plant.aliases.join(' • ')}</strong>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Biological Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 bg-forest-50/60 border-t border-forest-100 text-xs sm:text-sm">
          <div>
            <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
              <Sun className="w-4 h-4 text-amber-500" /> Ánh Sáng
            </span>
            <span className="font-bold text-forest-950">
              {plant.sunlight === 'full_sun' ? 'Nắng Đầy Đủ' : plant.sunlight === 'partial_shade' ? 'Nắng Tán Xạ' : 'Trong Nhà'}
            </span>
          </div>

          <div>
            <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
              <Droplets className="w-4 h-4 text-blue-500" /> Chế Độ Tưới
            </span>
            <span className="font-bold text-forest-950">
              {plant.watering === 'daily' ? 'Mỗi Ngày 1 Lần' : plant.watering === 'moderate' ? '2-3 Ngày/Lần' : 'Chịu Hạn Tốt'}
            </span>
          </div>

          <div>
            <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
              <Clock className="w-4 h-4 text-emerald-600" /> Thu Hoạch
            </span>
            <span className="font-bold text-forest-950">
              {plant.growth_time}
            </span>
          </div>

          <div>
            <span className="text-forest-700 block text-xs mb-1 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-4 h-4 text-purple-600" /> Trồng Chậu Ban Công
            </span>
            <span className="font-bold text-forest-950">
              {plant.container_suitable ? 'Rất Phù Hợp' : 'Cần Đất Rộng'}
            </span>
          </div>
        </div>

      </div>

      {/* 4. Article Main Body Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Overview */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-sm space-y-4">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-forest-950 border-b border-forest-50 pb-3">
              1. Đặc Điểm Sinh Học & Giá Trị Bản Địa
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
          </div>

          {/* Section 2: Medical Info (If Herb) */}
          {plant.medical_info && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-herbal-200 shadow-sm space-y-6">
              <div className="border-b border-herbal-100 pb-3 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-herbal-950 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-herbal-600" />
                  <span>2. Dược Tính & Kinh Nghiệm Dân Gian</span>
                </h2>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-herbal-100 text-herbal-800">
                  Dược thực đồng nguyên
                </span>
              </div>

              {/* Uses */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-herbal-800 mb-2">
                  Công dụng nổi bật:
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
                    <span>Bài thuốc dân gian tham khảo:</span>
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
                    <span>Đối tượng kiêng kỵ & Lưu ý sử dụng:</span>
                  </h3>
                  <p className="leading-relaxed">{plant.medical_info.toxicity_warning}</p>
                </div>
              )}

              {/* Confusion Risk */}
              {plant.medical_info.confusion_risk && (
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-rose-950">
                  <h3 className="font-bold text-rose-900 mb-1">
                    Cảnh báo cây dễ nhầm lẫn: {plant.medical_info.confusion_risk.confused_with}
                  </h3>
                  <p className="leading-relaxed">
                    <strong>Đặc điểm phân biệt:</strong> {plant.medical_info.confusion_risk.distinguishing_features}
                  </p>
                </div>
              )}

              {/* Disclaimer */}
              <div className="text-[11px] text-gray-500 italic bg-gray-50 p-3.5 rounded-xl border border-gray-100 leading-relaxed">
                * {plant.medical_info.disclaimer}
              </div>
            </div>
          )}

          {/* Section 3: Seasonality Calendar (H4) */}
          {plant.seasonality && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-sm space-y-4">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-forest-950 border-b border-forest-50 pb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-forest-700" />
                <span>3. Lịch Nông Vụ Nhân Giống & Mùa Vụ Ba Miền</span>
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-forest-50/70 border border-forest-100">
                  <strong className="text-forest-950 block mb-0.5">🌾 Miền Bắc:</strong>
                  <span className="text-forest-800">{plant.seasonality.north}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-forest-50/70 border border-forest-100">
                  <strong className="text-forest-950 block mb-0.5">🌾 Miền Trung:</strong>
                  <span className="text-forest-800">{plant.seasonality.central}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-forest-50/70 border border-forest-100">
                  <strong className="text-forest-950 block mb-0.5">🌾 Miền Nam:</strong>
                  <span className="text-forest-800">{plant.seasonality.south}</span>
                </div>
              </div>

              {plant.seasonality.warning && (
                <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
                  ⚠️ <strong>Cảnh báo thời tiết:</strong> {plant.seasonality.warning}
                </p>
              )}
            </div>
          )}

        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Monetization Card */}
          {plant.monetization_tips && (
            <div className="bg-white rounded-3xl p-6 border border-terracotta-200 shadow-sm space-y-4">
              <h3 className="text-base font-serif font-bold text-terracotta-900 flex items-center gap-2">
                <Coins className="w-5 h-5 text-terracotta-600" />
                <span>Mô Hình Kinh Tế Từ Cây Này</span>
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
                <span>Bảo Chứng Số (Web3 Proof)</span>
              </h3>
              <p className="text-[11px] font-mono text-gray-500 break-all bg-forest-50 p-2.5 rounded-xl border border-forest-100">
                {plant.image_sha256}
              </p>
              <p className="text-[11px] text-forest-700 pt-1">
                Ảnh đại diện đã được băm SHA-256 chống mạo danh và sẵn sàng kết nối Hộ chiếu số NFT.
              </p>
            </div>
          )}

          {/* Related Plants */}
          <div className="bg-white rounded-3xl p-6 border border-forest-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-forest-950 uppercase tracking-wider">
              Cùng Chuyên Mục {categoryName}
            </h3>
            <div className="space-y-3">
              {relatedPlants.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/cay/${rel.slug}`}
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

    </article>
  );
};
