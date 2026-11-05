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
  X as CloseIcon,
  Sparkles,
  Copy,
  CheckCheck,
  Activity,
  ShieldAlert,
  Bot,
  Key,
  Share2
} from 'lucide-react';
import { ClinicQuestion } from '../types/index.ts';
import { INITIAL_CLINIC_QUESTIONS } from '../data/clinicCases.ts';
import {
  getClinicQuestions,
  submitClinicQuestion,
  uploadPlantImage,
  submitClinicAnswer,
  verifyClinicAnswer,
  upvoteClinicAnswer,
  AIVisionDiagnosisResult
} from '../services/apiService.ts';
import {
  getUserAIConfig,
  diagnoseWithUserAI,
  UserAIConfig
} from '../services/userAIService.ts';
import { AIKeyModal } from './AIKeyModal.tsx';
import { checkCommunityModeration } from '../utils/moderation.ts';
import { applyWatermarkAndStripExif } from '../utils/watermark.ts';
import { ReportModal } from './ReportModal.tsx';
import { ShareModal } from './ShareModal.tsx';
import { useLanguage } from '../context/LanguageContext.tsx';

export const PlantClinicSection: React.FC = () => {
  const { t, isEn } = useLanguage();
  const [questions, setQuestions] = useState<ClinicQuestion[]>(INITIAL_CLINIC_QUESTIONS);
  const [activeClinicTab, setActiveClinicTab] = useState<'studio' | 'community'>('studio');
  const [region, setRegion] = useState<'north' | 'central' | 'south'>('south');
  const [plantHint, setPlantHint] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);

  // AI Thị Giác Bác Sĩ Cây Trồng - API Người Dùng (BYOK)
  const [userAIConfig, setUserAIConfig] = useState<UserAIConfig>(getUserAIConfig());
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [diagnosedByProvider, setDiagnosedByProvider] = useState<'user_gemini' | 'user_openai' | 'offline_rules' | null>(null);
  const [visionDiagnosis, setVisionDiagnosis] = useState<AIVisionDiagnosisResult | null>(null);
  const [isVisionScanning, setIsVisionScanning] = useState(false);
  const [copiedPrescription, setCopiedPrescription] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Upload ảnh thực tế kèm Watermark & EXIF Clean
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
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

  const handleRunVisionDiagnosis = async (fileToUse?: File) => {
    // Kiểm tra cấu hình API cá nhân của người dùng (BYOK)
    const currentConfig = getUserAIConfig();
    setUserAIConfig(currentConfig);

    // Nếu người dùng chưa nhập key cá nhân và không phải chế độ offline -> Mở modal hướng dẫn nhập key miễn phí
    if (!currentConfig.apiKey && currentConfig.provider !== 'offline') {
      setIsKeyModalOpen(true);
      return;
    }

    setIsVisionScanning(true);
    try {
      const res = await diagnoseWithUserAI({
        plantName: plantHint,
        symptoms: selectedSymptoms,
        description: description,
        file: fileToUse || selectedImageFile || undefined,
        region: region,
        lang: isEn ? 'en' : 'vi',
      });
      if (res.success && res.diagnosis) {
        setVisionDiagnosis(res.diagnosis);
        setDiagnosedByProvider(res.usedProvider);
      }
    } catch (err) {
      console.warn('AI Vision scan error:', err);
    } finally {
      setIsVisionScanning(false);
    }
  };

  const handleApplyDiagnosisToDescription = () => {
    if (!visionDiagnosis) return;
    const bulletRx = visionDiagnosis.organic_prescription.map((rx, idx) => `${idx + 1}. ${rx}`).join('\n');
    const addition = isEn
      ? `\n\n[AI Vision: ${visionDiagnosis.disease_name} (${visionDiagnosis.confidence}% Match)]\nCause: ${visionDiagnosis.primary_cause}\nOrganic Prescription:\n${bulletRx}`
      : `\n\n[Chẩn đoán AI Thị Giác: ${visionDiagnosis.disease_name} (Độ tin cậy ${visionDiagnosis.confidence}%)]\nNguyên nhân: ${visionDiagnosis.primary_cause}\nPhác đồ hữu cơ gợi ý:\n${bulletRx}`;
    const newDesc = description ? `${description.trim()}${addition}` : addition.trim();
    handleDescChange(newDesc);
  };

  const handleCopyPrescription = () => {
    if (!visionDiagnosis) return;
    const rxText = `${visionDiagnosis.disease_name}\n${isEn ? 'Primary Cause' : 'Nguyên nhân'}: ${visionDiagnosis.primary_cause}\n\n${isEn ? 'Organic Prescription' : 'Phác đồ hữu cơ'}:\n${visionDiagnosis.organic_prescription.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\n${isEn ? 'Long-term Prevention' : 'Phòng ngừa lâu dài'}: ${visionDiagnosis.prevention}`;
    navigator.clipboard.writeText(rxText);
    setCopiedPrescription(true);
    setTimeout(() => setCopiedPrescription(false), 2500);
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

      setSelectedImageFile(watermarkedFile);

      const res = await uploadPlantImage(watermarkedFile);
      if (res.success && res.url) {
        setUploadedImageUrl(res.url);
        // Tự động kích hoạt AI thị giác cá nhân của người dùng
        handleRunVisionDiagnosis(watermarkedFile);
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

    const instantDiagnosisText = visionDiagnosis
      ? `${visionDiagnosis.disease_name} (${isEn ? 'Confidence' : 'Độ tin cậy'} ${visionDiagnosis.confidence}%): ${visionDiagnosis.primary_cause}. ${isEn ? 'Prescription' : 'Phác đồ'}: ${visionDiagnosis.organic_prescription.join('; ')}`
      : undefined;

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
        if (instantDiagnosisText && !savedQ.ai_instant_diagnosis) {
          savedQ.ai_instant_diagnosis = instantDiagnosisText;
        }
        setQuestions((prev) => [savedQ, ...prev]);
        setActiveClinicTab('community'); // Chuyển sang xem ca bệnh vừa đăng
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
          ai_instant_diagnosis: instantDiagnosisText || (isEn
            ? `AI Instant Analysis (${regionText} Region): Plant exhibits ${symptomsText}. Pause heavy watering, inspect pot drainage, and spray an organic botanical fungicide or soap solution in late afternoon.`
            : `Phân tích AI tức thì (khu vực ${regionText}): Cây biểu hiện ${symptomsText}. Tạm ngưng tưới đẫm, kiểm tra độ thoát nước đáy chậu và xịt phòng dung dịch sinh học hữu cơ.`),
          answers: [],
          status: 'visible',
          created_at: isEn ? 'Just now' : 'Vừa xong',
        };
        setQuestions((prev) => [fallbackQ, ...prev]);
        setActiveClinicTab('community');
      }
    } catch (err) {
      console.warn('Submit clinic question error:', err);
    } finally {
      setIsAnalyzing(false);
      setDescription('');
      setPlantHint('');
      setSelectedSymptoms([]);
      setUploadedImageUrl(null);
      setSelectedImageFile(null);
      setVisionDiagnosis(null);
      setDiagnosedByProvider(null);
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

  const localizedQuestions = questions;

  return (
    <section id="clinic" className="py-6 sm:py-8 bg-white dark:bg-charcoal-900 border-y border-forest-100 dark:border-charcoal-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header Bar with Mode Switcher & Personal Key status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-forest-100/80 dark:border-charcoal-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-900 dark:text-cream-50 tracking-tight">
                  {isEn ? 'AI Plant Clinic & Gardeners Club' : 'Bác Sĩ Cây Trồng AI & Hội Quán'}
                </h2>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold border border-emerald-200 dark:border-emerald-800/60">
                  <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{isEn ? 'Vision AI 3s' : 'AI Thị Giác 3s'}</span>
                </span>
              </div>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
                {isEn
                  ? 'Multimodal vision diagnostics & organic biological remedies (100% H15 safe)'
                  : 'Chẩn đoán bệnh lá qua AI Thị Giác & Phác đồ điều trị sinh học 100% không độc hại'}
              </p>
            </div>
          </div>

          {/* Mode Switcher & Personal AI Key Pill */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-forest-100/70 dark:bg-charcoal-800 p-1 rounded-2xl flex items-center gap-1 border border-forest-200/60 dark:border-charcoal-700 text-xs">
              <button
                type="button"
                onClick={() => setActiveClinicTab('studio')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1.5 ${
                  activeClinicTab === 'studio'
                    ? 'bg-white dark:bg-charcoal-700 text-forest-900 dark:text-cream-50 shadow-xs'
                    : 'text-charcoal-600 dark:text-charcoal-300 hover:text-forest-900 dark:hover:text-cream-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{isEn ? 'AI Clinic Studio' : 'Phòng Khám AI (1 Màn Hình)'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveClinicTab('community')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1.5 ${
                  activeClinicTab === 'community'
                    ? 'bg-white dark:bg-charcoal-700 text-forest-900 dark:text-cream-50 shadow-xs'
                    : 'text-charcoal-600 dark:text-charcoal-300 hover:text-forest-900 dark:hover:text-cream-100'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{isEn ? `Community Cases (${localizedQuestions.length})` : `Ca Bệnh Cộng Đồng (${localizedQuestions.length})`}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsKeyModalOpen(true)}
              className={`px-3 py-1.5 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs ${
                userAIConfig.apiKey
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>
                {userAIConfig.apiKey
                  ? (userAIConfig.provider === 'gemini' ? 'Gemini Key ✓' : 'OpenAI Key ✓')
                  : (isEn ? 'Setup Key (Free)' : 'Cài Key Miễn Phí')}
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Studio Mode - Thiết Kế 1 Màn Hình Không Kéo Xuống */}
        {activeClinicTab === 'studio' && (
          <div className="bg-white dark:bg-charcoal-850 rounded-3xl p-4 sm:p-5 border border-forest-100 dark:border-charcoal-800 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Form Info & Symptoms (6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
                <div className="space-y-3">
                  {/* Row 1: Region & Plant Hint side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                    <div className="sm:col-span-5">
                      <label className="block font-bold text-forest-800 dark:text-charcoal-200 text-xs mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-herbal-600 dark:text-emerald-400" /> {t('clinic.regionLabel')}:
                      </label>
                      <div className="grid grid-cols-3 gap-1">
                        {[
                          { id: 'north', label: isEn ? 'North' : 'Bắc' },
                          { id: 'central', label: isEn ? 'Central' : 'Trung' },
                          { id: 'south', label: isEn ? 'South' : 'Nam' },
                        ].map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setRegion(r.id as 'north' | 'central' | 'south')}
                            className={`py-1.5 px-1 text-xs rounded-xl font-medium transition text-center ${
                              region === r.id
                                ? 'bg-forest-900 text-white dark:bg-emerald-600 shadow-xs font-semibold'
                                : 'bg-white dark:bg-charcoal-800 text-forest-900 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-700 border border-forest-100 dark:border-charcoal-700'
                            }`}
                          >
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-7">
                      <label className="block font-bold text-forest-800 dark:text-charcoal-200 text-xs mb-1">
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
                        className="w-full px-3 py-1.5 bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-charcoal-700 text-forest-950 dark:text-cream-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-herbal-500"
                      />
                    </div>
                  </div>

                  {/* Row 2: Symptoms Pills (compact 3 cols) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-bold text-forest-800 dark:text-charcoal-200 text-xs">
                        {t('clinic.symptomsLabel')}:
                      </label>
                      {selectedSymptoms.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedSymptoms([])}
                          className="text-[10px] text-gray-400 hover:text-rose-600 font-normal"
                        >
                          {isEn ? 'Clear' : 'Bỏ chọn'}
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {symptomList.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSymptom(s)}
                          className={`p-1.5 rounded-xl text-[11px] font-medium text-left transition flex items-center justify-between ${
                            selectedSymptoms.includes(s)
                              ? 'bg-herbal-50 dark:bg-emerald-950/60 text-herbal-800 dark:text-emerald-300 border border-herbal-300 dark:border-emerald-700 font-semibold'
                              : 'bg-white dark:bg-charcoal-800 text-charcoal-800 dark:text-charcoal-300 border border-forest-100 dark:border-charcoal-700 hover:bg-forest-50 dark:hover:bg-charcoal-700'
                          }`}
                        >
                          <span className="truncate">{s}</span>
                          {selectedSymptoms.includes(s) && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-herbal-600 dark:text-emerald-400 shrink-0 ml-1" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 3: Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-bold text-forest-800 dark:text-charcoal-200 text-xs">
                        {t('clinic.descriptionLabel')}:
                      </label>
                      {draftSaved && (
                        <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" /> {isEn ? 'Draft saved' : 'Đã lưu nháp'}
                        </span>
                      )}
                    </div>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => handleDescChange(e.target.value)}
                      placeholder={t('clinic.descriptionPlaceholder')}
                      className="w-full px-3 py-1.5 bg-white dark:bg-charcoal-800 border border-forest-100 dark:border-charcoal-700 text-forest-950 dark:text-cream-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-herbal-500"
                    />
                  </div>
                </div>

                {/* Submit to Community */}
                <div className="pt-2 border-t border-forest-50 dark:border-charcoal-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleSubmitQuestion}
                    disabled={isAnalyzing || !description.trim()}
                    className="flex-1 py-2 px-3 rounded-xl bg-forest-100 dark:bg-charcoal-700 hover:bg-forest-200 dark:hover:bg-charcoal-600 text-forest-900 dark:text-cream-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-40"
                  >
                    <Send className="w-3.5 h-3.5 text-herbal-600 dark:text-emerald-400" />
                    <span>{isEn ? 'Ask Community Gardeners' : 'Hỏi Thêm Ý Kiến Nhà Vườn'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveClinicTab('community')}
                    className="text-xs text-herbal-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>{isEn ? 'View Live Cases' : 'Xem ca bệnh'} ({localizedQuestions.length}) →</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Leaf Photo & AI Vision Result (6 cols) */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageFileChange}
                />

                {/* If AI result is NOT ready: show Upload & Trigger Button */}
                {!visionDiagnosis ? (
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    {uploadedImageUrl ? (
                      <div className="relative rounded-2xl overflow-hidden border border-herbal-200 dark:border-emerald-800/80 bg-herbal-50/50 dark:bg-emerald-950/30 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative">
                            <img
                              src={uploadedImageUrl}
                              alt="Uploaded diseased leaf"
                              className="w-16 h-16 object-cover rounded-xl border border-white dark:border-charcoal-700 shrink-0 shadow-xs"
                            />
                            {isVisionScanning && (
                              <div className="absolute inset-0 bg-emerald-500/30 rounded-xl flex items-center justify-center animate-pulse">
                                <Activity className="w-5 h-5 text-white animate-spin" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-herbal-900 dark:text-emerald-200 truncate">
                              {isEn ? 'Leaf photo analyzed & GPS EXIF cleaned' : 'Ảnh lá đã khử EXIF GPS • Chuẩn WebP'}
                            </p>
                            <p className="text-[11px] text-herbal-600 dark:text-emerald-400 mt-0.5">
                              {isEn ? 'Ready for multi-modal AI vision scan' : 'Sẵn sàng chẩn đoán AI Thị Giác tức thì'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-2.5 py-1 rounded-lg bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 font-semibold text-[11px] border border-forest-200 dark:border-charcoal-700"
                          >
                            {isEn ? 'Change' : 'Đổi ảnh'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setUploadedImageUrl(null);
                              setSelectedImageFile(null);
                            }}
                            className="p-1.5 rounded-full hover:bg-white dark:hover:bg-charcoal-700 text-gray-400 hover:text-rose-600"
                            title={t('common.cancel')}
                          >
                            <CloseIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-4 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[140px] ${
                          isUploadingImage
                            ? 'border-herbal-400 bg-herbal-50/30 dark:bg-emerald-950/20'
                            : 'border-forest-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 hover:border-herbal-500 hover:bg-forest-50/30 dark:hover:bg-charcoal-700/50'
                        }`}
                      >
                        {isUploadingImage ? (
                          <div className="flex flex-col items-center justify-center gap-2 text-herbal-700 dark:text-emerald-300 py-3">
                            <Loader2 className="w-6 h-6 animate-spin text-herbal-600 dark:text-emerald-400" />
                            <span className="text-xs font-semibold">
                              {isEn ? 'Watermarking & stripping GPS...' : 'Đang khử EXIF GPS & chuyển WebP...'}
                            </span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-7 h-7 text-forest-400 dark:text-charcoal-400 mb-1.5" />
                            <p className="text-xs font-bold text-forest-900 dark:text-cream-100">
                              {isEn ? 'Click or drop diseased leaf photo here' : 'Bấm để chụp hoặc chọn ảnh lá bệnh'}
                            </p>
                            <p className="text-[11px] text-gray-400 dark:text-charcoal-400 mt-0.5">
                              {isEn ? '(Free Gemini Vision • Automatic EXIF GPS strip)' : '(Dùng Gemini Vision miễn phí • Tự động xóa GPS bảo mật)'}
                            </p>
                          </>
                        )}
                      </div>
                    )}

                    {uploadError && (
                      <p className="text-[11px] text-rose-600 font-medium">{uploadError}</p>
                    )}

                    {/* Scanning Animation Progress */}
                    {isVisionScanning && (
                      <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/40 text-xs space-y-1.5 animate-pulse">
                        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-600 dark:text-emerald-400" />
                          <span>{isEn ? 'Scanning leaf cell pathology with your AI key (3s)...' : 'AI đang phân tích triệu chứng tế bào lá (3 giây)...'}</span>
                        </div>
                        <div className="h-1.5 w-full bg-emerald-100 dark:bg-emerald-900/60 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-600 animate-[pulse_1s_infinite] w-4/5"></div>
                        </div>
                      </div>
                    )}

                    {/* Large Primary AI Diagnose Button */}
                    <button
                      type="button"
                      onClick={() => handleRunVisionDiagnosis()}
                      disabled={isVisionScanning || (!uploadedImageUrl && !plantHint && selectedSymptoms.length === 0)}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition disabled:opacity-40"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>
                        {isVisionScanning
                          ? (isEn ? 'AI Scanning in progress...' : 'AI Đang Quét Sinh Học...')
                          : (isEn ? '⚡ Scan & Diagnose with AI Vision (3 Seconds)' : '⚡ Chẩn Đoán Bằng AI Thị Giác (Quét Trong 3 Giây)')}
                      </span>
                    </button>
                  </div>
                ) : (
                  /* If AI Diagnosis result is READY: show it right here! */
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white dark:from-emerald-950/50 dark:via-charcoal-800 dark:to-charcoal-850 border border-emerald-300 dark:border-emerald-700/80 text-xs space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-950 dark:text-emerald-200 text-xs">
                        <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>{isEn ? 'Diagnosis Result' : 'Kết Quả AI Thị Giác Chẩn Đoán'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          {visionDiagnosis.confidence}% {isEn ? 'Match' : 'Khớp'}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          visionDiagnosis.severity === 'high'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                            : visionDiagnosis.severity === 'medium'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                        }`}>
                          {visionDiagnosis.severity === 'high'
                            ? (isEn ? 'High Risk' : 'Nguy cơ cao')
                            : visionDiagnosis.severity === 'medium'
                            ? (isEn ? 'Moderate' : 'Trung bình')
                            : (isEn ? 'Mild' : 'Mức độ nhẹ')}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-serif font-bold text-forest-950 dark:text-cream-50">
                        {visionDiagnosis.disease_name}
                      </h4>
                      {diagnosedByProvider && (
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-900/40 px-2 py-0.5 rounded-md font-medium w-fit mt-0.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>
                            {diagnosedByProvider === 'user_gemini'
                              ? (isEn ? 'via your personal Gemini API' : 'Qua Google Gemini API cá nhân của bạn')
                              : diagnosedByProvider === 'user_openai'
                              ? (isEn ? 'via your personal OpenAI API' : 'Qua OpenAI API cá nhân của bạn')
                              : (isEn ? 'via local botanical rules' : 'Qua cơ sở tri thức cục bộ')}
                          </span>
                        </div>
                      )}
                      <p className="text-[11px] text-charcoal-700 dark:text-charcoal-300 mt-1 leading-relaxed">
                        <strong>{isEn ? 'Root Cause: ' : 'Nguyên nhân: '}</strong>
                        {visionDiagnosis.primary_cause}
                      </p>
                    </div>

                    {/* 3-Step Protocol */}
                    <div className="p-2.5 rounded-xl bg-white dark:bg-charcoal-800/90 border border-emerald-200/80 dark:border-charcoal-700 space-y-1">
                      <p className="font-bold text-forest-900 dark:text-emerald-300 text-[11px] flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{isEn ? 'Organic 3-Step Treatment Protocol (H15):' : 'Phác Đồ Hữu Cơ 3 Bước (Chuẩn H15):'}</span>
                      </p>
                      <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-charcoal-800 dark:text-charcoal-200 leading-relaxed pl-1">
                        {visionDiagnosis.organic_prescription.map((step, idx) => (
                          <li key={idx} className="marker:text-emerald-600 dark:marker:text-emerald-400 marker:font-bold">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5">
                      <button
                        type="button"
                        onClick={handleApplyDiagnosisToDescription}
                        className="py-1.5 px-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[10px] flex items-center justify-center gap-1 transition"
                      >
                        <Check className="w-3 h-3" />
                        <span>{isEn ? 'Apply' : 'Chèn mô tả'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyPrescription}
                        className="py-1.5 px-1.5 rounded-xl bg-white dark:bg-charcoal-800 hover:bg-forest-50 dark:hover:bg-charcoal-700 text-forest-900 dark:text-cream-100 border border-forest-200 dark:border-charcoal-700 font-semibold text-[10px] flex items-center justify-center gap-1 transition"
                      >
                        {copiedPrescription ? (
                          <>
                            <CheckCheck className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">{isEn ? 'Copied' : 'Đã chép'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{isEn ? 'Copy Rx' : 'Sao chép'}</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsShareModalOpen(true)}
                        className="py-1.5 px-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 font-semibold text-[10px] flex items-center justify-center gap-1 transition"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>{isEn ? 'Share Rx' : 'Chia sẻ'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setVisionDiagnosis(null);
                          setUploadedImageUrl(null);
                          setSelectedImageFile(null);
                        }}
                        className="py-1.5 px-1.5 rounded-xl bg-forest-100 dark:bg-charcoal-700 hover:bg-forest-200 dark:hover:bg-charcoal-600 text-forest-900 dark:text-cream-100 font-semibold text-[10px] flex items-center justify-center gap-1 transition"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>{isEn ? 'New Scan' : 'Quét ca mới'}</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Community Feed */}
        {activeClinicTab === 'community' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-forest-100 dark:border-charcoal-800">
              <span className="text-sm font-bold text-forest-900 dark:text-cream-50 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-herbal-600 dark:text-emerald-400" />
                {isEn ? `Latest Cases Supported by Community (${localizedQuestions.length})` : `Ca Bệnh Mới Nhất Được Cộng Đồng Hỗ Trợ (${localizedQuestions.length})`}
              </span>
              <button
                type="button"
                onClick={() => setActiveClinicTab('studio')}
                className="text-xs text-herbal-700 dark:text-emerald-400 hover:underline font-semibold"
              >
                ← {isEn ? 'Back to AI Clinic Studio' : 'Quay lại Phòng Khám AI'}
              </button>
            </div>

            {localizedQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white dark:bg-charcoal-850 rounded-3xl p-6 border border-forest-100 dark:border-charcoal-800 shadow-sm space-y-4 hover:border-forest-200 dark:hover:border-charcoal-700 transition"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-bold text-xs text-forest-900 dark:text-cream-100">
                        {q.user_name}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-forest-300 dark:bg-charcoal-600"></span>
                      <span className="text-[11px] text-gray-500 dark:text-charcoal-400">{q.created_at}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-forest-100 dark:bg-charcoal-800 text-forest-800 dark:text-charcoal-300 border border-forest-200 dark:border-charcoal-700">
                        {q.region === 'north' ? (isEn ? 'North' : 'Miền Bắc') : q.region === 'central' ? (isEn ? 'Central' : 'Miền Trung') : (isEn ? 'South' : 'Miền Nam')}
                      </span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-forest-950 dark:text-cream-50 leading-snug">
                      {q.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleReport(q)}
                    title={isEn ? 'Report inappropriate content' : 'Báo cáo nội dung vi phạm'}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-rose-950/40 transition"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Description & Symptoms */}
                <p className="text-xs sm:text-sm text-charcoal-800 dark:text-charcoal-200 leading-relaxed whitespace-pre-line font-sans">
                  {q.description}
                </p>

                {q.symptoms.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {q.symptoms.map((s, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Question Image if uploaded */}
                {q.images && q.images.length > 0 && (
                  <div className="pt-1 flex gap-2 overflow-x-auto">
                    {q.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Diseased plant"
                        className="w-24 h-24 object-cover rounded-2xl border border-forest-100 dark:border-charcoal-700 shadow-2xs"
                      />
                    ))}
                  </div>
                )}

                {/* AI Instant Diagnosis Box */}
                {q.ai_instant_diagnosis && (
                  <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-950 dark:text-emerald-200">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                      <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-600 dark:fill-emerald-400" />
                      <span>{isEn ? 'Preliminary AI Diagnostic Recommendation:' : 'Gợi ý chẩn đoán sơ bộ từ Trợ Lý AI:'}</span>
                    </div>
                    <p className="leading-relaxed text-emerald-900/90 dark:text-emerald-200/90">
                      {q.ai_instant_diagnosis}
                    </p>
                  </div>
                )}

                {/* Community Answers */}
                <div className="space-y-3 pt-3 border-t border-forest-100 dark:border-charcoal-800">
                  <div className="flex items-center justify-between text-xs font-bold text-forest-900 dark:text-cream-100">
                    <span>{isEn ? `Practical Advice from Gardeners (${q.answers.length})` : `Lời Khuyên Thực Tế Từ Nhà Vườn (${q.answers.length})`}</span>
                    <button
                      onClick={() => setActiveReplyId(activeReplyId === q.id ? null : q.id)}
                      className="text-herbal-700 dark:text-emerald-400 hover:text-herbal-800 dark:hover:text-emerald-300 hover:underline flex items-center gap-1"
                    >
                      <span>{isEn ? 'I know how to cure this' : 'Tôi biết cách chữa'}</span>
                    </button>
                  </div>

                  {q.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className={`p-3.5 rounded-2xl border text-xs space-y-2 shadow-2xs transition ${
                        ans.is_verified
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80 ring-1 ring-emerald-200 dark:ring-emerald-900'
                          : 'bg-white dark:bg-charcoal-800 border-forest-100 dark:border-charcoal-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-forest-900 dark:text-cream-100">{ans.author_name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-forest-100 dark:bg-charcoal-700 text-forest-800 dark:text-charcoal-300">
                            {ans.author_badge}
                          </span>
                          {ans.is_verified && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> {isEn ? 'Verified' : 'Đã kiểm chứng'}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 dark:text-charcoal-400">{ans.created_at}</span>
                      </div>

                      <p className="text-charcoal-800 dark:text-charcoal-200 leading-relaxed font-sans">{ans.content}</p>

                      <div className="flex items-center justify-between pt-1 border-t border-forest-50/80 dark:border-charcoal-750">
                        <button
                          onClick={() => handleUpvote(q.id, ans.id)}
                          className="flex items-center gap-1 text-[11px] text-forest-700 dark:text-charcoal-300 hover:text-herbal-700 dark:hover:text-emerald-400 font-semibold transition"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{t('clinic.upvote')} ({ans.upvotes})</span>
                        </button>

                        <button
                          onClick={() => handleVerifyAnswer(q.id, ans.id)}
                          className={`text-[11px] font-semibold flex items-center gap-1 transition ${
                            ans.is_verified ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-400 dark:text-charcoal-400 hover:text-forest-700 dark:hover:text-cream-200'
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
                        className="flex-1 px-3.5 py-2 bg-cream-50/50 dark:bg-charcoal-800 border border-forest-100 dark:border-charcoal-700 text-charcoal-900 dark:text-cream-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-herbal-500"
                      />
                      <button
                        onClick={() => handleReplySubmit(q.id)}
                        className="px-4 py-2 rounded-xl bg-forest-900 dark:bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-forest-800 dark:hover:bg-emerald-500 transition"
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
        )}

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
          <div className="bg-white dark:bg-charcoal-850 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 dark:border-rose-900/50 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-rose-950 dark:text-rose-200 text-base">
                  {moderationAlert.title}
                </h3>
                <p className="text-xs text-rose-700 dark:text-rose-400">
                  {isEn ? 'Community biosecurity compliance check' : 'Hệ thống bảo vệ đa dạng sinh học & an toàn sinh học'}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-xs text-rose-900 dark:text-rose-200 space-y-1.5 border border-rose-100 dark:border-rose-900/40">
              <p><strong>{isEn ? 'Reason:' : 'Nguyên nhân:'}</strong> {moderationAlert.reason}</p>
              <p><strong>{isEn ? 'Guidance:' : 'Hướng xử lý:'}</strong> {moderationAlert.suggestion}</p>
            </div>

            <button
              onClick={() => setModerationAlert(null)}
              className="w-full py-2.5 rounded-xl bg-forest-900 dark:bg-emerald-600 text-white font-semibold text-xs hover:bg-forest-800 dark:hover:bg-emerald-500 transition"
            >
              {isEn ? 'I Understand and Will Revise' : 'Tôi Đã Hiểu & Sẽ Điều Chỉnh'}
            </button>
          </div>
        </div>
      )}

      {/* Modal Chia Sẻ Phác Đồ Bác Sĩ Cây */}
      {isShareModalOpen && visionDiagnosis && (
        <ShareModal
          isOpen={true}
          onClose={() => setIsShareModalOpen(false)}
          title={isEn ? `AI Plant Doctor Diagnosis: ${visionDiagnosis.disease_name}` : `Chẩn Đoán Bác Sĩ Cây: ${visionDiagnosis.disease_name}`}
          text={isEn
            ? `Cause: ${visionDiagnosis.primary_cause}. Organic prescription: ${visionDiagnosis.organic_prescription.slice(0, 2).join('; ')}`
            : `Nguyên nhân: ${visionDiagnosis.primary_cause}. Phác đồ: ${visionDiagnosis.organic_prescription.slice(0, 2).join('; ')}`}
          url="https://yeutrongcay.com/bac-si-cay-trong"
          imageUrl={uploadedImageUrl || undefined}
          badge={isEn ? 'AI Plant Clinic' : 'Bác Sĩ Cây Trồng'}
        />
      )}

      {/* Modal Cài Đặt API Key Cá Nhân (BYOK) */}
      <AIKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onConfigSaved={(newCfg) => {
          setUserAIConfig(newCfg);
          if (newCfg.apiKey || newCfg.provider === 'offline') {
            handleRunVisionDiagnosis(selectedImageFile || undefined);
          }
        }}
      />
    </section>
  );
};
