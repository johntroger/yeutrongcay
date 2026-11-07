import React, { useState, useEffect, useRef } from 'react';
import { PlantHeartReview, PlantHeartSummary } from '../types/index.ts';
import { plantReviewService } from '../services/plantReviewService.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  Heart,
  Camera,
  Trash2,
  ShieldCheck,
  Send,
  Sparkles,
  AlertCircle,
  X,
  Maximize2,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';

interface PlantHeartReviewSectionProps {
  plantSlug: string;
  plantName: string;
}

const CONTEXT_TAGS = [
  { id: 'san-thuong', labelVi: '☀️ Sân thượng', labelEn: '☀️ Rooftop' },
  { id: 'ban-cong', labelVi: '🏢 Ban công chung cư', labelEn: '🏢 Balcony' },
  { id: 'trong-nha', labelVi: '🛋️ Trong nhà / Cửa sổ', labelEn: '🛋️ Indoors' },
  { id: 'da-lam-thu', labelVi: '🍵 Đã làm thử / Ứng dụng', labelEn: '🍵 Tried & Tested' },
  { id: 'thuc-dia', labelVi: '🥾 Đã đến thực địa', labelEn: '🥾 Visited On-site' },
];

const HEART_LABELS: Record<number, { vi: string; en: string }> = {
  1: { vi: '🌱 Đang tìm hiểu / Muốn thử', en: '🌱 Curious / Exploring' },
  2: { vi: '🌿 Thấy hay / Quan tâm', en: '🌿 Interested / Good read' },
  3: { vi: '💚 Rất hữu ích / Học hỏi được', en: '💚 Very helpful guide' },
  4: { vi: '💖 Rất tâm đắc / Ứng dụng hiệu quả', en: '💖 High impact & Practical' },
  5: { vi: '❤️ Tuyệt phẩm / Say mê chia sẻ', en: '❤️ Masterpiece / Highly Recommended' },
};

export const PlantHeartReviewSection: React.FC<PlantHeartReviewSectionProps> = ({
  plantSlug,
  plantName,
}) => {
  const { isEn } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [reviews, setReviews] = useState<PlantHeartReview[]>([]);
  const [summary, setSummary] = useState<PlantHeartSummary>({
    average_hearts: 5.0,
    total_reviews: 0,
    photo_count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [hearts, setHearts] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [hoveredHeart, setHoveredHeart] = useState<number | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [authorHandle, setAuthorHandle] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [comment, setComment] = useState('');
  const [attachedPhotos, setAttachedPhotos] = useState<Array<{ dataUrl: string; sizeKB: number }>>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Lightbox modal
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  // Load reviews on mount
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    plantReviewService.fetchReviewsForPlant(plantSlug).then((res) => {
      if (isMounted) {
        setReviews(res.reviews);
        setSummary(res.summary);
        setIsLoading(false);
      }
    });

    const unsub = plantReviewService.subscribe(() => {
      if (isMounted) {
        const cached = plantReviewService.getCachedSummary(plantSlug);
        setSummary(cached);
      }
    });

    return () => {
      isMounted = false;
      unsub();
    };
  }, [plantSlug]);

  // Handle Photo selection and compression
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (attachedPhotos.length + files.length > 2) {
      setErrorMessage(
        isEn
          ? 'Maximum 2 photos per review to keep storage optimized.'
          : 'Để tối ưu dung lượng, bạn chỉ có thể đính kèm tối đa 2 bức ảnh.'
      );
      return;
    }

    setIsCompressing(true);
    try {
      const newPhotos: Array<{ dataUrl: string; sizeKB: number }> = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await plantReviewService.compressImageToWebP(file);
        newPhotos.push(compressed);
      }
      setAttachedPhotos((prev) => [...prev, ...newPhotos].slice(0, 2));
    } catch (err: any) {
      setErrorMessage(err?.message || 'Lỗi khi xử lý hình ảnh');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removePhoto = (index: number) => {
    setAttachedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit Review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!authorName.trim()) {
      setErrorMessage(isEn ? 'Please enter your name.' : 'Vui lòng nhập tên của bạn.');
      return;
    }
    if (!comment.trim()) {
      setErrorMessage(isEn ? 'Please share your thoughts.' : 'Vui lòng viết đôi dòng cảm nhận.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await plantReviewService.submitHeartReview({
        plant_slug: plantSlug,
        author_name: authorName.trim(),
        author_handle: authorHandle.trim() || undefined,
        hearts,
        context_tag: selectedTag || undefined,
        comment: comment.trim(),
        images: attachedPhotos.map((p) => p.dataUrl),
      });

      if (res.success && res.review) {
        setReviews((prev) => [res.review!, ...prev]);
        setSuccessMessage(
          isEn
            ? 'Thank you! Your heart review and photo have been published.'
            : 'Cảm ơn bạn! Đánh giá trái tim và hình ảnh của bạn đã được xuất bản thành công.'
        );
        // Reset form
        setComment('');
        setAttachedPhotos([]);
        setSelectedTag('');
        // Persist author name locally for next review
        try {
          localStorage.setItem('ytc_last_reviewer_name', authorName.trim());
          if (authorHandle.trim()) localStorage.setItem('ytc_last_reviewer_handle', authorHandle.trim());
        } catch (_) {}
      } else {
        setErrorMessage(res.error || 'Có lỗi xảy ra khi gửi bài');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Lỗi kết nối máy chủ');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-fill author info if available
  useEffect(() => {
    try {
      const savedName = localStorage.getItem('ytc_last_reviewer_name');
      const savedHandle = localStorage.getItem('ytc_last_reviewer_handle');
      if (savedName && !authorName) setAuthorName(savedName);
      if (savedHandle && !authorHandle) setAuthorHandle(savedHandle);
    } catch (_) {}
  }, []);

  const activeHeartCount = hoveredHeart ?? hearts;
  const currentEmotion = HEART_LABELS[activeHeartCount];

  return (
    <section id="reviews-section" className="mt-16 pt-12 border-t border-forest-100 dark:border-forest-900">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold mb-2 border border-rose-200/60 dark:border-rose-900/60">
            <span>❤️</span>
            <span>{isEn ? 'Community Love & Reviews' : 'Trái Tim Đỏ Từ Cộng Đồng'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-900 dark:text-cream-50">
            {isEn ? 'Reviews & Real-life Experience' : 'Đánh Giá & Trải Nghiệm Thực Tế'}
          </h2>
          <p className="text-sm text-forest-700/80 dark:text-forest-300 mt-1">
            {isEn
              ? `Share your love, results, and photos for "${plantName}".`
              : `Gửi gắm trái tim yêu thích, kết quả gieo trồng và hình ảnh thực tế cho "${plantName}".`}
          </p>
        </div>

        {/* Aggregate Stats Pill */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-800 shadow-sm shrink-0">
          <div className="text-center pr-4 border-r border-forest-100 dark:border-forest-800">
            <div className="text-3xl font-serif font-bold text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1">
              <span>❤️</span>
              <span>{summary.average_hearts.toFixed(1)}</span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">{isEn ? 'Average Rating' : 'Điểm Yêu Thích'}</p>
          </div>
          <div className="text-xs space-y-1 text-forest-800 dark:text-forest-200 font-medium">
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-forest-600" />
              <span>
                <strong>{summary.total_reviews}</strong> {isEn ? 'reviews' : 'lượt đánh giá'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                <strong>{summary.photo_count}</strong> {isEn ? 'photos' : 'hình ảnh thực tế'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Review Form (Left on Desktop: 5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-white to-forest-50/30 dark:from-charcoal-900 dark:to-charcoal-800/40 p-6 sm:p-7 rounded-3xl border border-forest-100 dark:border-forest-800 shadow-md">
          <h3 className="text-lg font-serif font-bold text-forest-900 dark:text-cream-50 flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>{isEn ? 'Leave a Heart Review' : 'Gửi Trái Tim Của Bạn'}</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Heart Rating Selector (1 to 5) */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-charcoal-950 border border-forest-100 dark:border-forest-800 text-center">
              <label className="block text-xs font-semibold text-forest-800 dark:text-forest-200 mb-2">
                {isEn ? 'Your Heart Rating (1-5 Hearts):' : 'Mức độ yêu thích (1 đến 5 Trái Tim):'}
              </label>

              <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
                {([1, 2, 3, 4, 5] as const).map((star) => {
                  const isFilled = star <= activeHeartCount;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setHearts(star)}
                      onMouseEnter={() => setHoveredHeart(star)}
                      onMouseLeave={() => setHoveredHeart(null)}
                      className="p-1 rounded-full transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      title={`${star} tim`}
                    >
                      <Heart
                        className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors ${
                          isFilled
                            ? 'fill-rose-500 text-rose-500 drop-shadow-[0_2px_8px_rgba(244,63,94,0.4)]'
                            : 'fill-transparent text-gray-300 dark:text-charcoal-700 hover:text-rose-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Emotion text */}
              <div className="text-xs font-medium text-rose-600 dark:text-rose-400 mt-2 h-4 transition-all">
                {isEn ? currentEmotion.en : currentEmotion.vi}
              </div>
            </div>

            {/* Context Tag selector */}
            <div>
              <label className="block text-xs font-semibold text-forest-800 dark:text-forest-200 mb-1.5">
                {isEn ? 'Context Tag (Optional):' : 'Thẻ ngữ cảnh thực tế (Chọn nhanh 1 chạm):'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CONTEXT_TAGS.map((tag) => {
                  const isSelected = selectedTag === tag.labelVi;
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => setSelectedTag(isSelected ? '' : tag.labelVi)}
                      className={`text-xs px-2.5 py-1 rounded-xl font-medium transition cursor-pointer border ${
                        isSelected
                          ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                          : 'bg-white dark:bg-charcoal-800 text-forest-800 dark:text-forest-300 border-forest-200 dark:border-forest-700 hover:bg-forest-50'
                      }`}
                    >
                      {isEn ? tag.labelEn : tag.labelVi}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Author Name & Handle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-forest-800 dark:text-forest-200 mb-1">
                  {isEn ? 'Your Name *' : 'Tên của bạn *'}
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={isEn ? 'e.g. Anh Tuấn' : 'VD: Anh Tuấn'}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-charcoal-950 border border-forest-200 dark:border-forest-800 text-forest-900 dark:text-cream-50 focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-forest-800 dark:text-forest-200 mb-1">
                  {isEn ? 'Handle / Social (Optional)' : 'Tên hiển thị / Mạng XH'}
                </label>
                <input
                  type="text"
                  value={authorHandle}
                  onChange={(e) => setAuthorHandle(e.target.value)}
                  placeholder="@handle / SĐT / Đô thị"
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-charcoal-950 border border-forest-200 dark:border-forest-800 text-forest-900 dark:text-cream-50 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Comment Area */}
            <div>
              <label className="block text-xs font-semibold text-forest-800 dark:text-forest-200 mb-1">
                {isEn ? 'Your Review & Experience *' : 'Đôi dòng cảm nhận & Kinh nghiệm *'}
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  isEn
                    ? 'How did this plant/recipe/method grow for you? Tips for others...'
                    : 'Cây phát triển thế nào? Mẹo chăm sóc, công thức chế biến hoặc kinh nghiệm thực địa...'
                }
                className="w-full text-xs px-3 py-2.5 rounded-xl bg-white dark:bg-charcoal-950 border border-forest-200 dark:border-forest-800 text-forest-900 dark:text-cream-50 focus:outline-none focus:border-rose-500 leading-relaxed resize-none"
              />
            </div>

            {/* Photo Upload Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-forest-800 dark:text-forest-200 flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-rose-500" />
                  <span>{isEn ? 'Attach Photos (Max 2)' : 'Đính kèm hình ảnh (Tối đa 2 ảnh)'}</span>
                </label>
                <span className="text-[10px] text-gray-500">
                  {isEn ? 'Only Images (No Video)' : 'Chỉ ảnh tĩnh • Tự nén WebP'}
                </span>
              </div>

              {/* Photos Previews */}
              <div className="flex items-center gap-3">
                {attachedPhotos.map((photo, idx) => (
                  <div key={idx} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-forest-200 dark:border-forest-700 bg-black/10">
                    <img src={photo.dataUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-600 text-white rounded-full transition"
                      title="Xóa ảnh này"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-black/75 text-[9px] text-emerald-300 font-mono text-center py-0.5 truncate">
                      ⚡ {photo.sizeKB} KB
                    </div>
                  </div>
                ))}

                {attachedPhotos.length < 2 && (
                  <button
                    type="button"
                    disabled={isCompressing}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-xl border-2 border-dashed border-forest-300 dark:border-forest-700 hover:border-rose-500 dark:hover:border-rose-400 flex flex-col items-center justify-center gap-1 text-forest-600 dark:text-forest-300 hover:text-rose-600 transition cursor-pointer bg-white/50 dark:bg-charcoal-900/50"
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-[10px] font-semibold">
                      {isCompressing ? 'Đang nén...' : isEn ? '+ Add Photo' : '+ Thêm ảnh'}
                    </span>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* Error or Success notification */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isCompressing}
              className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isEn ? 'Publishing...' : 'Đang xuất bản...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Publish Heart Review' : 'Gửi Đánh Giá Trái Tim'}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Reviews Feed (Right on Desktop: 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-forest-100 dark:border-forest-800">
            <h3 className="text-base font-serif font-bold text-forest-900 dark:text-cream-50">
              {isEn ? 'All Community Reviews' : 'Bình Luận Từ Người Dùng'} ({reviews.length})
            </h3>
            <span className="text-xs text-gray-500">
              {isEn ? 'Sorted by newest' : 'Mới nhất trước'}
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-forest-600 dark:text-forest-400 text-xs">
              <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <span>{isEn ? 'Loading heart reviews...' : 'Đang tải danh sách đánh giá...'}</span>
            </div>
          ) : reviews.length === 0 ? (
            <div className="p-10 rounded-3xl bg-forest-50/50 dark:bg-charcoal-900/50 border border-forest-100 dark:border-forest-800 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 fill-rose-500" />
              </div>
              <h4 className="text-sm font-bold text-forest-900 dark:text-cream-50 mb-1">
                {isEn ? 'No reviews yet' : 'Chưa có đánh giá nào'}
              </h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {isEn
                  ? 'Be the first to share your experience and love for this article!'
                  : 'Hãy là người đầu tiên trao gửi trái tim và kinh nghiệm cho bài viết này nhé!'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => {
                const dateStr = rev.created_at ? new Date(rev.created_at).toLocaleDateString('vi-VN') : '';
                return (
                  <article
                    key={rev.id}
                    className="p-5 rounded-2xl bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-800 shadow-xs hover:shadow-sm transition"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 text-white font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                          {rev.author_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-bold text-forest-900 dark:text-cream-50">
                              {rev.author_name}
                            </span>
                            {rev.author_handle && (
                              <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                                {rev.author_handle}
                              </span>
                            )}
                            {rev.is_nft_owner && (
                              <span
                                title="Chủ sở hữu NFT Hộ chiếu độc bản của bài viết này"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                              >
                                <ShieldCheck className="w-3 h-3 text-amber-600" />
                                <span>Chủ NFT Độc Bản</span>
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5">
                            {dateStr}
                          </div>
                        </div>
                      </div>

                      {/* Hearts */}
                      <div className="flex items-center gap-0.5 shrink-0" title={`${rev.hearts}/5 tim`}>
                        {([1, 2, 3, 4, 5] as const).map((s) => (
                          <Heart
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= rev.hearts
                                ? 'fill-rose-500 text-rose-500'
                                : 'fill-transparent text-gray-200 dark:text-charcoal-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Context Tag Pill */}
                    {rev.context_tag && (
                      <div className="mb-2">
                        <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-lg bg-forest-50 dark:bg-charcoal-800 text-forest-700 dark:text-forest-300 border border-forest-100 dark:border-forest-800">
                          {rev.context_tag}
                        </span>
                      </div>
                    )}

                    {/* Comment text */}
                    <p className="text-xs sm:text-sm text-charcoal-800/90 dark:text-forest-100 leading-relaxed whitespace-pre-line mb-3">
                      {rev.comment}
                    </p>

                    {/* Photos attached */}
                    {(() => {
                      const reviewImages = rev.image_urls || rev.images || [];
                      if (reviewImages.length === 0) return null;
                      return (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {reviewImages.map((imgUrl: string, i: number) => (
                            <div
                              key={i}
                              onClick={() => setActiveLightboxImg(imgUrl)}
                              className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-forest-200 dark:border-forest-700 cursor-pointer shadow-2xs hover:scale-102 transition"
                            >
                              <img
                                src={imgUrl}
                                alt={`Review photo ${i + 1}`}
                                className="w-full h-full object-cover group-hover:brightness-95"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Maximize2 className="w-4 h-4" />
                              </div>
                              <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/60 text-[9px] text-emerald-300 font-mono">
                                WebP
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden bg-charcoal-900 border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-rose-600 text-white rounded-full transition z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeLightboxImg}
              alt="Expanded photo"
              className="w-auto h-auto max-h-[85vh] max-w-full object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
};
