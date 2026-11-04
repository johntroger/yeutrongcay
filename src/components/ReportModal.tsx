import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { submitReport } from '../services/apiService.ts';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'clinic_question' | 'swap_offer' | 'plant_info' | 'comment';
  targetId: string;
  targetTitle: string;
}

const REPORT_REASONS = [
  {
    id: 'dangerous_medical_advice',
    label: 'Tư vấn y tế nguy hiểm / sai sự thật',
    desc: 'Tuyên bố chữa khỏi bệnh nan y, khuyên bỏ thuốc tây, hoặc bài thuốc độc hại',
  },
  {
    id: 'spam',
    label: 'Spam / Tin rác / Quảng cáo cờ bạc',
    desc: 'Bài viết quảng cáo không liên quan, lặp lại nhiều lần hoặc link độc hại',
  },
  {
    id: 'illegal_substance',
    label: 'Cây thuộc danh mục chất cấm / xâm hại nguy hiểm',
    desc: 'Cần sa, thuốc phiện, cây anh túc hoặc các loài ngoại lai bị cấm phát tán',
  },
  {
    id: 'commercial_ad',
    label: 'Thương mại trá hình trong mục tặng / đổi cây',
    desc: 'Thu tiền, ép mua phân bón / chậu đi kèm hoặc lừa đảo phí vận chuyển',
  },
  {
    id: 'abusive_language',
    label: 'Ngôn từ xúc phạm / Đả kích cá nhân',
    desc: 'Tranh cãi thiếu văn hóa, kỳ thị vùng miền hoặc quấy rối thành viên',
  },
  {
    id: 'other',
    label: 'Lý do khác',
    desc: 'Các vấn đề phát sinh khác cần sự can thiệp của Ban kiểm duyệt',
  },
];

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
}) => {
  const [selectedReason, setSelectedReason] = useState('dangerous_medical_advice');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; ticketId?: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await submitReport({
      target_type: targetType,
      target_id: targetId,
      reason: selectedReason,
      note: note.trim() || undefined,
    });

    setIsSubmitting(false);
    setResult({
      success: res.success,
      message: res.message,
      ticketId: res.ticket_id,
    });

    if (res.success) {
      setTimeout(() => {
        handleClose();
      }, 2500);
    }
  };

  const handleClose = () => {
    setResult(null);
    setNote('');
    setSelectedReason('dangerous_medical_advice');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-forest-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-forest-50 bg-forest-50/50">
          <div className="flex items-center gap-2 text-rose-600">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <h3 className="text-base font-serif font-bold text-forest-950">
              Báo cáo vi phạm nội dung
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-forest-100 text-forest-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Target Preview */}
          <div className="p-3 bg-forest-50/60 rounded-2xl border border-forest-100">
            <p className="text-[11px] font-medium text-forest-600 uppercase tracking-wider mb-0.5">
              Nội dung bị báo cáo:
            </p>
            <p className="text-xs font-semibold text-forest-950 line-clamp-2">
              {targetTitle}
            </p>
          </div>

          {result ? (
            <div
              className={`p-5 rounded-2xl text-center space-y-2 border ${
                result.success
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}
            >
              {result.success ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-sm font-bold">Đã gửi báo cáo thành công!</p>
                  <p className="text-xs text-emerald-800">{result.message}</p>
                  {result.ticketId && (
                    <p className="text-[11px] font-mono text-emerald-700 bg-white/70 py-1 px-2.5 rounded-lg inline-block mt-1">
                      Mã phiếu: {result.ticketId}
                    </p>
                  )}
                  <p className="text-[10px] text-emerald-600 pt-1">
                    Cửa sổ sẽ tự đóng sau giây lát...
                  </p>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto" />
                  <p className="text-sm font-bold">Không thể gửi báo cáo</p>
                  <p className="text-xs text-rose-700">{result.message}</p>
                  <button
                    onClick={() => setResult(null)}
                    className="mt-2 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-medium text-rose-800 hover:bg-rose-100"
                  >
                    Thử lại
                  </button>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-bold text-forest-900 mb-2">
                  Chọn lý do vi phạm chính:
                </label>
                <div className="space-y-2">
                  {REPORT_REASONS.map((r) => (
                    <label
                      key={r.id}
                      className={`flex items-start gap-3 p-3 rounded-2xl border transition cursor-pointer ${
                        selectedReason === r.id
                          ? 'border-rose-400 bg-rose-50/50 shadow-xs'
                          : 'border-forest-100 bg-white hover:bg-forest-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="report_reason"
                        value={r.id}
                        checked={selectedReason === r.id}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        className="mt-0.5 text-rose-600 focus:ring-rose-500"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-forest-950 text-xs">{r.label}</p>
                        <p className="text-[11px] text-forest-600 mt-0.5">{r.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-forest-900 mb-1">
                  Mô tả thêm bằng chứng (tùy chọn):
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Đoạn bình luận số 2 khuyên đun lá uống thay thuốc tiểu đường rất nguy hiểm..."
                  className="w-full px-3.5 py-2 bg-white border border-forest-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Yêu Trồng Cây cam kết bảo mật danh tính người báo cáo. Báo cáo sai sự thật ác ý nhiều lần có thể bị giới hạn quyền tài khoản.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl border border-forest-200 text-forest-800 hover:bg-forest-50 font-medium transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-xs flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <span>Gửi báo cáo</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
