import React, { useState, useEffect } from 'react';
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
  Award
} from 'lucide-react';
import { ClinicQuestion } from '../types/index.ts';
import { INITIAL_CLINIC_QUESTIONS } from '../data/clinicCases.ts';

export const PlantClinicSection: React.FC = () => {
  const [questions, setQuestions] = useState<ClinicQuestion[]>(INITIAL_CLINIC_QUESTIONS);
  const [region, setRegion] = useState<'north' | 'central' | 'south'>('south');
  const [plantHint, setPlantHint] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);

  // Lưu nháp ngoại tuyến (Offline-First Draft)
  useEffect(() => {
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

  const symptomList = [
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

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsAnalyzing(true);

    const regionText = region === 'north' ? 'Miền Bắc' : region === 'central' ? 'Miền Trung' : 'Miền Nam';
    const symptomsText = selectedSymptoms.join(', ') || 'Dấu hiệu suy yếu chung';

    setTimeout(() => {
      setIsAnalyzing(false);

      const newQ: ClinicQuestion = {
        id: `case-${Date.now()}`,
        user_id: 'usr-current',
        user_name: 'Bạn (Chủ Vườn)',
        title: `Cây ${plantHint || 'cảnh'} gặp tình trạng: ${symptomsText}`,
        description: description,
        plant_name_hint: plantHint || 'Chưa rõ loài',
        region: region,
        symptoms: selectedSymptoms,
        images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'],
        ai_instant_diagnosis: `Phân tích sơ bộ từ AI (khu vực ${regionText}): Cây biểu hiện ${symptomsText}. Tạm ngưng tưới đẫm, kiểm tra độ thoát nước đáy chậu và xịt phòng dung dịch sinh học hữu cơ. Câu hỏi đã được ghim lên đầu để các nhà vườn khu vực ${regionText} tư vấn thêm!`,
        answers: [],
        status: 'visible',
        created_at: 'Vừa xong',
      };

      setQuestions([newQ, ...questions]);
      setDescription('');
      setPlantHint('');
      setSelectedSymptoms([]);
      localStorage.removeItem('ytc_clinic_desc');
      localStorage.removeItem('ytc_clinic_hint');
    }, 2000);
  };

  const handleUpvote = (questionId: string, answerId: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) return q;
        return {
          ...q,
          answers: q.answers.map((a) =>
            a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a,
          ),
        };
      }),
    );
  };

  const handleAddReply = (questionId: string) => {
    if (!replyText.trim()) return;

    const newAnswer = {
      id: `ans-${Date.now()}`,
      question_id: questionId,
      author_name: 'Bạn (Thành Viên)',
      author_badge: 'Cộng Đồng Chia Sẻ',
      content: replyText.trim(),
      upvotes: 1,
      created_at: 'Vừa xong',
    };

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q,
      ),
    );

    setReplyText('');
    setActiveReplyId(null);
  };

  const handleReport = (questionId: string) => {
    alert('Đã gửi báo cáo vi phạm. Nếu có 3 thành viên cùng báo cáo, bài đăng sẽ tự động được ẩn vào hàng đợi kiểm duyệt để bảo vệ an toàn cộng đồng!');
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, reports_count: (q.reports_count || 0) + 1 }
          : q,
      ),
    );
  };

  return (
    <section id="clinic" className="py-16 bg-white border-y border-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-herbal-50 text-herbal-700 text-xs font-semibold mb-3 border border-herbal-200">
            <Zap className="w-3.5 h-3.5" />
            <span>Trợ Lý AI 3s + Hội Quán Nhà Vườn Ba Miền</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-900 tracking-tight mb-3">
            Bác Sĩ Cây Trồng 1-Chạm
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800 font-sans">
            Đăng ảnh lá bệnh, AI đưa ra giải pháp sơ bộ trong 3 giây. Cộng đồng các bác nhà vườn và lương y cùng vào chẩn đoán theo từng vùng miền.
          </p>
        </div>

        {/* Two-column layout: Form on left, Live Cases on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Ask Form */}
          <div className="lg:col-span-5 bg-cream-100/70 rounded-3xl p-6 border border-forest-100 shadow-sm sticky top-28">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold text-forest-900 text-lg flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-herbal-600" />
                <span>Gửi Ca Bệnh Cần Cứu</span>
              </h3>
              {draftSaved && (
                <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Đã lưu nháp
                </span>
              )}
            </div>

            <form onSubmit={handleSubmitQuestion} className="space-y-4 text-xs">
              {/* Region */}
              <div>
                <label className="block font-bold text-forest-800 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-herbal-600" /> Vùng miền của bạn:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'north', label: 'Miền Bắc' },
                    { id: 'central', label: 'Miền Trung' },
                    { id: 'south', label: 'Miền Nam' },
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
                  Cây bạn đang trồng:
                </label>
                <input
                  type="text"
                  value={plantHint}
                  onChange={(e) => {
                    setPlantHint(e.target.value);
                    localStorage.setItem('ytc_clinic_hint', e.target.value);
                  }}
                  placeholder="Ví dụ: Ổi lê, Đinh lăng nếp, Sung Mỹ..."
                  className="w-full px-3.5 py-2.5 bg-white border border-forest-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-herbal-500"
                />
              </div>

              {/* Symptoms */}
              <div>
                <label className="block font-bold text-forest-800 mb-1">
                  Triệu chứng nhìn thấy:
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
                  Mô tả thêm (nắng, nước tưới, đất trồng):
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => handleDescChange(e.target.value)}
                  placeholder="Ví dụ: Trồng trên sân thượng nắng chiều, lá vàng từ gốc lên, đất vẫn ẩm..."
                  className="w-full px-3.5 py-2 bg-white border border-forest-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-herbal-500"
                  required
                />
              </div>

              {/* Upload Box */}
              <div className="border border-dashed border-forest-200 rounded-xl p-4 text-center bg-white hover:border-herbal-500 transition cursor-pointer">
                <Upload className="w-5 h-5 text-forest-400 mx-auto mb-1" />
                <p className="text-[11px] font-medium text-forest-900">
                  Chụp hoặc tải ảnh lá bệnh
                </p>
                <p className="text-[10px] text-gray-400">
                  (Đã bật cơ chế tự động xóa sạch GPS ảnh)
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-herbal-400" />
                    <span>AI Đang Chẩn Đoán Trong 3 Giây...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5 text-herbal-400" />
                    <span>Chẩn Đoán Ngay & Đăng Câu Hỏi</span>
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
                Ca Bệnh Mới Nhất Được Cộng Đồng Hỗ Trợ ({questions.length})
              </span>
              <span className="text-xs text-forest-600">Thời gian thực</span>
            </div>

            {questions.map((q) => (
              <div
                key={q.id}
                className="bg-cream-50/60 rounded-3xl p-6 border border-forest-100 shadow-sm space-y-4 hover:border-forest-200 transition"
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
                        {q.region === 'north' ? 'Miền Bắc' : q.region === 'central' ? 'Miền Trung' : 'Miền Nam'}
                      </span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-forest-950 leading-snug">
                      {q.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleReport(q.id)}
                    title="Báo cáo nội dung vi phạm"
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
                      <span>Gợi ý chẩn đoán sơ bộ từ Trợ Lý AI:</span>
                    </div>
                    <p className="leading-relaxed text-emerald-900/90">
                      {q.ai_instant_diagnosis}
                    </p>
                  </div>
                )}

                {/* Community Answers */}
                <div className="space-y-3 pt-3 border-t border-forest-100">
                  <div className="flex items-center justify-between text-xs font-bold text-forest-900">
                    <span>Lời Khuyên Thực Tế Từ Nhà Vườn ({q.answers.length})</span>
                    <button
                      onClick={() => setActiveReplyId(activeReplyId === q.id ? null : q.id)}
                      className="text-herbal-700 hover:text-herbal-800 hover:underline flex items-center gap-1"
                    >
                      <span>Tôi biết cách chữa</span>
                    </button>
                  </div>

                  {q.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className="bg-white p-3.5 rounded-2xl border border-forest-100 text-xs space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-forest-900">
                            {ans.author_name}
                          </span>
                          {ans.author_badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-terracotta-50 text-terracotta-700 border border-terracotta-100 flex items-center gap-1">
                              <Award className="w-3 h-3 text-terracotta-600" />
                              {ans.author_badge}
                            </span>
                          )}
                          <span className="text-[10px] text-gray-400">
                            {ans.created_at}
                          </span>
                        </div>

                        <button
                          onClick={() => handleUpvote(q.id, ans.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-50 hover:bg-forest-100 text-forest-800 text-[11px] font-semibold border border-forest-100 transition"
                        >
                          <ThumbsUp className="w-3 h-3 text-herbal-600" />
                          <span>Hữu ích ({ans.upvotes})</span>
                        </button>
                      </div>

                      <p className="text-charcoal-800 leading-relaxed font-sans">
                        {ans.content}
                      </p>
                    </div>
                  ))}

                  {/* Inline Reply Form */}
                  {activeReplyId === q.id && (
                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Chia sẻ kinh nghiệm trị bệnh cây của bạn..."
                        className="flex-1 px-3.5 py-2 bg-white border border-forest-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-herbal-500"
                      />
                      <button
                        onClick={() => handleAddReply(q.id)}
                        className="px-4 py-2 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-medium flex items-center gap-1 shadow-sm transition"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Gửi</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
