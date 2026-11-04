import React, { useState } from 'react';
import { Stethoscope, Upload, Zap, MapPin, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const PlantClinicSection: React.FC = () => {
  const [region, setRegion] = useState<'north' | 'central' | 'south'>('south');
  const [plantHint, setPlantHint] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDiagnosis, setAiDiagnosis] = useState<string | null>(null);

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

  const handleDiagnose = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setAiDiagnosis(null);

    // Giả lập AI phản hồi trong 3 giây
    setTimeout(() => {
      setIsAnalyzing(false);
      const regionText = region === 'north' ? 'Miền Bắc' : region === 'central' ? 'Miền Trung' : 'Miền Nam';
      setAiDiagnosis(
        `Phân tích sơ bộ từ AI (khu vực ${regionText}): Cây có dấu hiệu nấm đốm lá (Cercospora) kết hợp độ ẩm gốc quá cao do giá thể bí khí. Khuyến cáo tức thì: Tạm ngưng tưới 2 ngày, tỉa bỏ toàn bộ lá bệnh đem tiêu hủy, xịt dung dịch nước vôi trong 1% hoặc Nano Bạc hữu cơ. Bài đăng của bạn đã được gửi đến các nhà vườn khu vực ${regionText} để nhận tư vấn chi tiết!`,
      );
    }, 2500);
  };

  return (
    <section id="clinic" className="py-16 bg-white border-y border-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-herbal-50 text-herbal-700 text-xs font-semibold mb-3 border border-herbal-200">
            <Zap className="w-3.5 h-3.5" />
            <span>Phản Hồi Sơ Bộ Tức Thì 3 Giây</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-900 tracking-tight mb-3">
            Bác Sĩ Cây Trồng Cộng Đồng
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800 font-sans">
            Cây bị vàng lá, thối rễ, sâu bệnh? Đăng ảnh lá bệnh kèm vùng miền, AI đưa ra giải pháp sơ bộ trong 3 giây và cộng đồng nhà vườn vào hỗ trợ chi tiết.
          </p>
        </div>

        {/* Clinic Interactive Form */}
        <div className="max-w-2xl mx-auto bg-cream-100/60 rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-sm">
          <form onSubmit={handleDiagnose} className="space-y-6">
            
            {/* Region Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-forest-800 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-herbal-600" />
                Vùng miền canh tác của bạn (để chẩn đoán thời tiết chuẩn xác):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'north', label: 'Miền Bắc (4 mùa)' },
                  { id: 'central', label: 'Miền Trung (Mưa lũ/Nắng)' },
                  { id: 'south', label: 'Miền Nam (Mưa/Nắng)' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRegion(r.id as 'north' | 'central' | 'south')}
                    className={`py-2 px-2 text-xs rounded-xl font-medium transition text-center ${
                      region === r.id
                        ? 'bg-forest-900 text-white shadow-sm'
                        : 'bg-white text-forest-900 hover:bg-forest-50 border border-forest-100'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Plant Hint */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-forest-800 mb-2">
                Tên cây bạn đang trồng (nếu biết):
              </label>
              <input
                type="text"
                value={plantHint}
                onChange={(e) => setPlantHint(e.target.value)}
                placeholder="Ví dụ: Ổi lê, Đinh Lăng, Húng Chanh, Hoa Hồng..."
                className="w-full px-4 py-2.5 bg-white border border-forest-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-herbal-500"
              />
            </div>

            {/* Symptoms Checklist */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-forest-800 mb-2">
                Dấu hiệu bất thường nhìn thấy trên cây:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {symptomList.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSymptom(s)}
                    className={`p-2.5 rounded-xl text-xs font-medium text-left transition flex items-center justify-between ${
                      selectedSymptoms.includes(s)
                        ? 'bg-herbal-50 text-herbal-800 border border-herbal-300 font-semibold'
                        : 'bg-white text-charcoal-800 border border-forest-100 hover:bg-forest-50'
                    }`}
                  >
                    <span className="truncate">{s}</span>
                    {selectedSymptoms.includes(s) && (
                      <CheckCircle2 className="w-4 h-4 text-herbal-600 shrink-0 ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mock Image Upload Area */}
            <div className="border-2 border-dashed border-forest-200 rounded-2xl p-6 text-center bg-white hover:border-herbal-500 transition cursor-pointer">
              <Upload className="w-8 h-8 text-forest-400 mx-auto mb-2" />
              <p className="text-xs font-medium text-forest-900">
                Chạm để chụp hoặc chọn ảnh lá bệnh
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                (Hệ thống tự động xóa sạch tọa độ GPS ảnh để bảo vệ vị trí nhà bạn)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-herbal-400" />
                  <span>AI Đang Phân Tích Trong 3 Giây...</span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-4 h-4 text-herbal-400" />
                  <span>Chẩn Đoán Bệnh & Gửi Câu Hỏi</span>
                </>
              )}
            </button>
          </form>

          {/* AI Result Box */}
          {aiDiagnosis && (
            <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 animate-fade-in shadow-inner">
              <div className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
                <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Kết Quả Gợi Ý Sơ Bộ Từ Trợ Lý AI (3 Giây)</span>
              </div>
              <p className="leading-relaxed mb-3">{aiDiagnosis}</p>
              <div className="text-[11px] text-emerald-800 bg-white/70 p-2.5 rounded-xl border border-emerald-100 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Lưu ý: Đây là phân tích tham khảo từ AI. Hãy chờ phản hồi của nhà vườn có kinh nghiệm phía dưới bài đăng.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
