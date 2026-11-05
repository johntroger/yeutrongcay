import React, { useState, useEffect, useRef } from 'react';
import {
  Stethoscope,
  Upload,
  Zap,
  MapPin,
  CheckCircle2,
  RefreshCw,
  ThumbsUp,
  MessageSquare,
  Send,
  Flag,
  Check,
  Award,
  Loader2,
  ShieldCheck,
  AlertTriangle,
  X as CloseIcon
} from 'lucide-react';
import { ClinicQuestion } from '../types/index.ts';
import { INITIAL_CLINIC_QUESTIONS } from '../data/clinicCases.ts';
import {
  getClinicQuestions,
  submitClinicQuestion,
  uploadPlantImage,
  submitClinicAnswer,
  verifyClinicAnswer,
  upvoteClinicAnswer
} from '../services/apiService.ts';
import { checkCommunityModeration } from '../utils/moderation.ts';
import { applyWatermarkAndStripExif } from '../utils/watermark.ts';
import { ReportModal } from './ReportModal.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

export const PlantClinicSection: React.FC = () => {
  const { t, isEn } = useLanguage();
  const [questions, setQuestions] = useState<ClinicQuestion[]>(INITIAL_CLINIC_QUESTIONS);
  const [region, setRegion] = useState<'north' | 'central' | 'south'>('south');
  const [plantHint, setPlantHint] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);

  // Upload ảnh thực tế kèm Watermark & EXIF Clean
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Cảnh báo kiểm duyệt tự động
  const [moderationAlert, setModerationAlert] = useState<{
    title: string;
    reason: string;
    suggestion: string;
  } | null>(null);

  // Modal Báo Cáo Vi Phạm
  const [reportTarget, setReportTarget] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    getClinicQuestions().then(({ questions: liveQ }) => {
      if (liveQ && liveQ.length > 0) {
        setQuestions(liveQ);
      }
    });

    const savedHint = localStorage.getItem('ytc_clinic_hint');
    const savedDesc = localStorage.getItem('ytc_clinic_desc');
    if (savedHint) setPlantHint(savedHint);
    if (savedDesc) setDescription(savedDesc);
  }, []);

  const handleDescChange = (val: string) => {
    setDescription(val);
    localStorage.setItem('ytc_clinic_desc', val);
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const symptomList = isEn
    ? [
        'Yellow leaves with brown rust spots',
        'Scorched young leaf tips',
        'White cottony mealybugs on stem',
        'Wilted foliage despite wet soil',
        'Premature flower or fruit drop',
        'White powdery mildew on leaf coat',
      ]
    : [
        'Vàng lá đốm nâu',
        'Cháy mép lá non',
        'Rệp sáp trắng bám thân',
        'Lá héo rũ dù đất ẩm',
        'Rụng hoa/trái non',
        'Đốm phấn trắng trên mặt lá',
      ];

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s],
    );
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError(isEn ? 'Maximum image size is 5MB' : 'Dung lượng ảnh tối đa 5MB');
      return;
    }

    setUploadError(null);
    setIsUploadingImage(true);

    try {
      const watermarkedFile = await applyWatermarkAndStripExif(file, {
        authorName: isEn ? 'Urban Gardener' : 'Chủ Vườn Phố',
        brandText: 'yeutrongcay.com'
      });

      const res = await uploadPlantImage(watermarkedFile);
      if (res.success && res.url) {
        setUploadedImageUrl(res.url);
      } else {
        setUploadError(res.error || (isEn ? 'Failed to upload photo to server' : 'Lỗi khi tải ảnh lên máy chủ'));
      }
    } catch (err: any) {
      setUploadError(err.message || (isEn ? 'Error processing image' : 'Lỗi khi xử lý hình ảnh'));
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const combinedInput = `${plantHint} ${description}`;
    const modCheck = checkCommunityModeration(combinedInput);
    if (modCheck.isBlocked) {
      setModerationAlert({
        title: isEn ? 'Conservation & Chemical Warning' : 'Cảnh Báo Sách Đỏ & Loài Cấm (H6, H15)',
        reason: modCheck.reason || (isEn ? 'Content flagged under biosecurity restrictions.' : 'Nội dung nằm trong danh mục cấm/xâm hại nguy hiểm.'),
        suggestion: modCheck.suggestion || (isEn ? 'Please review your input information.' : 'Vui lòng kiểm tra lại thông tin.')
      });
      return;
    }

    setIsAnalyzing(true);

    const regionText = isEn
      ? (region === 'north' ? 'Northern' : region === 'central' ? 'Central' : 'Southern')
      : (region === 'north' ? 'Miền Bắc' : region === 'central' ? 'Miền Trung' : 'Miền Nam');
    const symptomsText = selectedSymptoms.join(', ') || (isEn ? 'General health decline' : 'Dấu hiệu suy yếu chung');
    const questionImages = uploadedImageUrl ? [uploadedImageUrl] : [];

    try {
      const savedQ = await submitClinicQuestion({
        plant_name_hint: plantHint || (isEn ? 'Unknown species' : 'Chưa rõ loài'),
        description: description,
        region: region,
        symptoms: selectedSymptoms,
        user_name: isEn ? 'You (Gardener)' : 'Bạn (Chủ Vườn)',
        images: questionImages
      });

      if (savedQ) {
        setQuestions((prev) => [savedQ, ...prev]);
      } else {
        const fallbackQ: ClinicQuestion = {
          id: `case-${Date.now()}`,
          user_id: 'usr-current',
          user_name: isEn ? 'You (Gardener)' : 'Bạn (Chủ Vườn)',
          title: isEn
            ? `Plant (${plantHint || 'Potted plant'}) condition: ${symptomsText}`
            : `Cây ${plantHint || 'cảnh'} gặp tình trạng: ${symptomsText}`,
          description: description,
          plant_name_hint: plantHint || (isEn ? 'Unknown species' : 'Chưa rõ loài'),
          region: region,
          symptoms: selectedSymptoms,
          images: questionImages.length > 0 ? questionImages : ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Psidium_guajava_fruit.jpg/330px-Psidium_guajava_fruit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail'],
          ai_instant_diagnosis: isEn
            ? `AI Instant Analysis (${regionText} Region): Plant exhibits ${symptomsText}. Pause heavy watering, inspect pot drainage, and spray an organic botanical fungicide or soap solution in late afternoon.`
            : `Phân tích AI tức thì (khu vực ${regionText}): Cây biểu hiện ${symptomsText}. Tạm ngưng tưới đẫm, kiểm tra độ thoát nước đáy chậu và xịt phòng dung dịch sinh học hữu cơ.`,
          answers: [],
          status: 'visible',
          created_at: isEn ? 'Just now' : 'Vừa xong',
        };
        setQuestions((prev) => [fallbackQ, ...prev]);
      }
    } catch (err) {
      console.warn('Submit clinic question error:', err);
    } finally {
      setIsAnalyzing(false);
      setDescription('');
      setPlantHint('');
      setSelectedSymptoms([]);
      setUploadedImageUrl(null);
      localStorage.removeItem('ytc_clinic_desc');
      localStorage.removeItem('ytc_clinic_hint');
    }
  };

  const handleUpvote = async (questionId: string, answerId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          answers: q.answers.map((ans) =>
            ans.id === answerId ? { ...ans, upvotes: ans.upvotes + 1 } : ans
          ),
        };
      })
    );
    upvoteClinicAnswer(answerId);
  };

  const handleVerifyAnswer = async (questionId: string, answerId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          answers: q.answers.map((ans) =>
            ans.id === answerId ? { ...ans, is_verified: !ans.is_verified } : ans
          ),
        };
      })
    );
    verifyClinicAnswer({ question_id: questionId, answer_id: answerId });
  };

  const handleReplySubmit = async (questionId: string) => {
    if (!replyText.trim()) return;

    const payload = {
      question_id: questionId,
      content: replyText.trim(),
      author_name: isEn ? 'You (Community Member)' : 'Bạn (Thành Viên)',
      author_badge: isEn ? 'Community Sharing' : 'Cộng Đồng Chia Sẻ'
    };

    const res = await submitClinicAnswer(payload);
    if (res.success && res.data) {
      const newAnswer = {
        id: res.data.id,
        question_id: questionId,
        author_name: res.data.author_name || (isEn ? 'You (Community Member)' : 'Bạn (Thành Viên)'),
        author_badge: res.data.author_badge || (isEn ? 'Community Sharing' : 'Cộng Đồng Chia Sẻ'),
        content: res.data.content,
        upvotes: res.data.upvotes || 0,
        is_verified: false,
        created_at: isEn ? 'Just now' : 'Vừa xong'
      };

      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q
        )
      );
    }

    setReplyText('');
    setActiveReplyId(null);
  };

  const handleReport = (question: ClinicQuestion) => {
    setReportTarget({
      id: question.id,
      title: question.title,
    });
  };

  // Nội dung cộng đồng đăng tải (câu hỏi, câu trả lời) được giữ nguyên bản gốc theo yêu cầu người dùng
  const localizedQuestions = questions;

  return (
    <section id="clinic" className="py-16 bg-white border-y border-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-herbal-50 text-herbal-700 text-xs font-semibold mb-3 border border-herbal-200">
            <Zap className="w-3.5 h-3.5" />
            <span>{t('clinic.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-900 tracking-tight mb-3">
            {t('clinic.title')}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800 font-sans">
            {t('clinic.description')}
          </p>
        </div>

        {/* Two-column layout: Form on left, Live Cases on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Ask Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-forest-100 shadow-sm static lg:sticky lg:top-28 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-forest-900 text-lg flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-herbal-600" />
                <span>{isEn ? 'Submit Plant Disease Case' : 'Gửi Ca Bệnh Cần Cứu'}</span>
              </h3>
              {draftSaved && (
                <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <Check className="w-3 h-3" /> {isEn ? 'Draft saved' : 'Đã lưu nháp'}
                </span>
              )}
            </div>

            <form onSubmit={handleSubmitQuestion} className="space-y-4 text-xs">
              {/* Region */}
              <div>
                <label className="block font-bold text-forest-800 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-herbal-600" /> {t('clinic.regionLabel')}:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'north', label: isEn ? 'North' : 'Miền Bắc' },
                    { id: 'central', label: isEn ? 'Central' : 'Miền Trung' },
                    { id: 'south', label: isEn ? 'South' : 'Miền Nam' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRegion(r.id as 'north' | 'central' | 'south')}
                      className={`py-2 px-1 text-xs rounded-xl font-medium transition text-center ${
                        region === r.id
                          ? 'bg-forest-900 text-white shadow-sm font-semibold'
                          : 'bg-white text-forest-900 hover:bg-forest-50 border border-forest-100'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plant Name Hint */}
              <div>
                <label className="block font-bold text-forest-800 mb-1">
                  {t('clinic.plantNameHintLabel')}:
                </label>
                <input
                  type="text"
                  value={plantHint}
                  onChange={(e) => {
                    setPlantHint(e.target.value);
                    localStorage.setItem('ytc_clinic_hint', e.target.value);
                  }}
                  placeholder={t('clinic.plantNamePlaceholder')}
                  className="w-full px-3.5 py-2.5 bg-white border border-forest-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-herbal-500"
                />
              </div>

              {/* Symptoms */}
              <div>
                <label className="block font-bold text-forest-800 mb-1">
                  {t('clinic.symptomsLabel')}:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {symptomList.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSymptom(s)}
                      className={`p-2 rounded-xl text-[11px] font-medium text-left transition flex items-center justify-between ${
                        selectedSymptoms.includes(s)
                          ? 'bg-herbal-50 text-herbal-800 border border-herbal-300 font-semibold'
                          : 'bg-white text-charcoal-800 border border-forest-100 hover:bg-forest-50'
                      }`}
                    >
                      <span className="truncate">{s}</span>
                      {selectedSymptoms.includes(s) && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-herbal-600 shrink-0 ml-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-forest-800 mb-1">
                  {t('clinic.descriptionLabel')}:
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => handleDescChange(e.target.value)}
                  placeholder={t('clinic.descriptionPlaceholder')}
                  className="w-full px-3.5 py-2 bg-white border border-forest-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-herbal-500"
                  required
                />
              </div>

              {/* Upload Box */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleImageFileChange}
              />

              {uploadedImageUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-herbal-200 bg-herbal-50/50 p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={uploadedImageUrl}
                      alt="Uploaded diseased leaf"
                      className="w-12 h-12 object-cover rounded-xl border border-white shrink-0 shadow-xs"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-herbal-900 truncate">
                        {isEn ? 'Photo securely uploaded' : 'Ảnh đã tải lên an toàn'}
                      </p>
                      <p className="text-[10px] text-herbal-600">
                        {isEn ? 'EXIF GPS stripped • WebP format' : 'Đã tẩy sạch EXIF GPS • Chuẩn WebP'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedImageUrl(null)}
                    className="p-1.5 rounded-full hover:bg-white text-gray-500 hover:text-rose-600 transition"
                    title={t('common.cancel')}
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed rounded-xl p-3.5 text-center transition cursor-pointer ${
                      isUploadingImage
                        ? 'border-herbal-400 bg-herbal-50/30'
                        : 'border-forest-200 bg-white hover:border-herbal-500 hover:bg-forest-50/30'
                    }`}
                  >
                    {isUploadingImage ? (
                      <div className="flex items-center justify-center gap-2 text-herbal-700 py-1">
                        <Loader2 className="w-4 h-4 animate-spin text-herbal-600" />
                        <span className="text-xs font-semibold">
                          {isEn ? 'Processing & stripping GPS EXIF...' : 'Đang xử lý & tẩy EXIF GPS...'}
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-forest-400 mx-auto mb-1" />
                        <p className="text-[11px] font-bold text-forest-900">
                          {isEn ? 'Take or select diseased leaf photo' : 'Chụp hoặc chọn ảnh lá bệnh từ máy'}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {isEn ? '(Max 5MB • GPS location automatically stripped)' : '(Tối đa 5MB • Tự động xóa sạch vị trí GPS & chuyển WebP)'}
                        </p>
                      </>
                    )}
                  </div>
                  {uploadError && (
                    <p className="text-[10px] text-rose-600 mt-1 font-medium">{uploadError}</p>
                  )}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-herbal-400" />
                    <span>{isEn ? 'AI Diagnosing in 3 Seconds...' : 'AI Đang Chẩn Đoán Trong 3 Giây...'}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-herbal-400" />
                    <span>{t('clinic.submitDiagnosis')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Live Feed of Clinic Cases */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-forest-100">
              <span className="text-sm font-bold text-forest-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-herbal-600" />
                {isEn ? `Latest Cases Supported by Community (${localizedQuestions.length})` : `Ca Bệnh Mới Nhất Được Cộng Đồng Hỗ Trợ (${localizedQuestions.length})`}
              </span>
              <span className="text-xs text-forest-600">{isEn ? 'Real-time' : 'Thời gian thực'}</span>
            </div>

            {localizedQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-3xl p-6 border border-forest-100 shadow-sm space-y-4 hover:border-forest-200 transition"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-bold text-xs text-forest-900">
                        {q.user_name}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-forest-300"></span>
                      <span className="text-[11px] text-gray-500">{q.created_at}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-forest-100 text-forest-800 border border-forest-200">
                        {q.region === 'north' ? (isEn ? 'North' : 'Miền Bắc') : q.region === 'central' ? (isEn ? 'Central' : 'Miền Trung') : (isEn ? 'South' : 'Miền Nam')}
                      </span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-forest-950 leading-snug">
                      {q.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleReport(q)}
                    title={isEn ? 'Report inappropriate content' : 'Báo cáo nội dung vi phạm'}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Description & Symptoms */}
                <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed">
                  {q.description}
                </p>

                {q.symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {q.symptoms.map((s, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* AI Instant Diagnosis Box */}
                {q.ai_instant_diagnosis && (
                  <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 text-xs text-emerald-950">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                      <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                      <span>{isEn ? 'Preliminary AI Diagnostic Recommendation:' : 'Gợi ý chẩn đoán sơ bộ từ Trợ Lý AI:'}</span>
                    </div>
                    <p className="leading-relaxed text-emerald-900/90">
                      {q.ai_instant_diagnosis}
                    </p>
                  </div>
                )}

                {/* Community Answers */}
                <div className="space-y-3 pt-3 border-t border-forest-100">
                  <div className="flex items-center justify-between text-xs font-bold text-forest-900">
                    <span>{isEn ? `Practical Advice from Gardeners (${q.answers.length})` : `Lời Khuyên Thực Tế Từ Nhà Vườn (${q.answers.length})`}</span>
                    <button
                      onClick={() => setActiveReplyId(activeReplyId === q.id ? null : q.id)}
                      className="text-herbal-700 hover:text-herbal-800 hover:underline flex items-center gap-1"
                    >
                      <span>{isEn ? 'I know how to cure this' : 'Tôi biết cách chữa'}</span>
                    </button>
                  </div>

                  {q.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className={`p-3.5 rounded-2xl border text-xs space-y-2 shadow-2xs transition ${
                        ans.is_verified
                          ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-200'
                          : 'bg-white border-forest-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-forest-900">{ans.author_name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-forest-100 text-forest-800">
                            {ans.author_badge}
                          </span>
                          {ans.is_verified && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> {isEn ? 'Verified' : 'Đã kiểm chứng'}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">{ans.created_at}</span>
                      </div>

                      <p className="text-charcoal-800 leading-relaxed font-sans">{ans.content}</p>

                      <div className="flex items-center justify-between pt-1 border-t border-forest-50/80">
                        <button
                          onClick={() => handleUpvote(q.id, ans.id)}
                          className="flex items-center gap-1 text-[11px] text-forest-700 hover:text-herbal-700 font-semibold transition"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{t('clinic.upvote')} ({ans.upvotes})</span>
                        </button>

                        <button
                          onClick={() => handleVerifyAnswer(q.id, ans.id)}
                          className={`text-[11px] font-semibold flex items-center gap-1 transition ${
                            ans.is_verified ? 'text-emerald-700' : 'text-gray-400 hover:text-forest-700'
                          }`}
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>{ans.is_verified ? (isEn ? 'Verified Remedy' : 'Giải pháp đã xác nhận') : (isEn ? 'Verify' : 'Xác nhận hiệu quả')}</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Reply Form */}
                  {activeReplyId === q.id && (
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={isEn ? 'Share your practical organic recipe or remedy...' : 'Chia sẻ kinh nghiệm chữa trị thực tế của bạn...'}
                        className="flex-1 px-3.5 py-2 bg-cream-50/50 border border-forest-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-herbal-500"
                      />
                      <button
                        onClick={() => handleReplySubmit(q.id)}
                        className="px-4 py-2 rounded-xl bg-forest-900 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-forest-800 transition"
                      >
                        <Send className="w-3.5 h-3.5 text-herbal-400" />
                        <span>{isEn ? 'Post Advice' : 'Gửi Lời Khuyên'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Modal Báo Cáo Vi Phạm */}
      {reportTarget && (
        <ReportModal
          isOpen={true}
          onClose={() => setReportTarget(null)}
          targetType="clinic_question"
          targetId={reportTarget.id}
          targetTitle={reportTarget.title}
        />
      )}

      {/* Cảnh Báo Kiểm Duyệt Sách Đỏ / Hóa Chất */}
      {moderationAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-rose-950 text-base">
                  {moderationAlert.title}
                </h3>
                <p className="text-xs text-rose-700">
                  {isEn ? 'Community biosecurity compliance check' : 'Hệ thống bảo vệ đa dạng sinh học & an toàn sinh học'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 text-xs text-rose-900 space-y-1.5 border border-rose-100">
              <p><strong>{isEn ? 'Reason:' : 'Nguyên nhân:'}</strong> {moderationAlert.reason}</p>
              <p><strong>{isEn ? 'Guidance:' : 'Hướng xử lý:'}</strong> {moderationAlert.suggestion}</p>
            </div>

            <button
              onClick={() => setModerationAlert(null)}
              className="w-full py-2.5 rounded-xl bg-forest-900 text-white font-semibold text-xs hover:bg-forest-800 transition"
            >
              {isEn ? 'I Understand and Will Revise' : 'Tôi Đã Hiểu & Sẽ Điều Chỉnh'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
