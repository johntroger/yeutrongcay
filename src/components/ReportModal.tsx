import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { submitReport } from '../services/apiService.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'clinic_question' | 'swap_offer' | 'plant_info' | 'comment';
  targetId: string;
  targetTitle: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
}) => {
  const { isEn, t } = useLanguage();
  const [selectedReason, setSelectedReason] = useState('dangerous_medical_advice');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; ticketId?: string } | null>(null);

  const reportReasons = isEn
    ? [
        {
          id: 'dangerous_medical_advice',
          label: 'Dangerous or unverified medical claim',
          desc: 'Claims to cure terminal illnesses, advises abandoning physician treatment, or harmful toxic formulations',
        },
        {
          id: 'spam',
          label: 'Spam / Irrelevant advertising',
          desc: 'Repetitive promotional posts, deceptive commercial links, or unsolicited advertising',
        },
        {
          id: 'illegal_substance',
          label: 'Controlled, prohibited, or invasive species',
          desc: 'Narcotics, protected wild species, or banned invasive botanical specimens',
        },
        {
          id: 'commercial_ad',
          label: 'Hidden commercial solicitation in plant swap',
          desc: 'Charging money, coercive bundling of pots/fertilizer, or postal shipping scams',
        },
        {
          id: 'abusive_language',
          label: 'Inappropriate or abusive language',
          desc: 'Harassment, hate speech, or hostility directed toward community members',
        },
        {
          id: 'other',
          label: 'Other policy violation',
          desc: 'Other issues requiring moderation review by the editorial team',
        },
      ]
    : [
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

  const targetTypeLabel = {
    clinic_question: isEn ? 'Plant Clinic Case' : 'Ca Bệnh Cây Trồng',
    swap_offer: isEn ? 'Plant Swap Listing' : 'Tin Đổi / Tặng Cây',
    plant_info: isEn ? 'Botanical Knowledge Profile' : 'Thông Tin Thảo Dược',
    comment: isEn ? 'Community Comment' : 'Bình Luận',
  }[targetType];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-forest-100 p-6 sm:p-7 relative my-auto space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-forest-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950">
                {isEn ? 'Report Inappropriate Content' : 'Báo Cáo Nội Dung Vi Phạm'}
              </h3>
              <p className="text-xs text-forest-700">
                {targetTypeLabel}: <span className="font-semibold text-forest-900 truncate inline-block max-w-[200px] align-bottom">{targetTitle}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label={t('common.close')}
            className="w-8 h-8 rounded-full bg-forest-50 hover:bg-forest-100 text-forest-800 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Result Message */}
        {result ? (
          <div
            className={`p-5 rounded-2xl border flex flex-col items-center text-center space-y-2 animate-fade-in ${
              result.success
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/80 border-rose-200 text-rose-950'
            }`}
          >
            {result.success ? (
              <>
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-1" />
                <h4 className="font-serif font-bold text-base text-emerald-950">
                  {isEn ? 'Report Received Successfully' : 'Tiếp Nhận Báo Cáo Thành Công'}
                </h4>
                <p className="text-xs text-emerald-800 max-w-sm leading-relaxed">
                  {isEn
                    ? 'Thank you for helping protect community biosecurity and accuracy. Our moderation team will review this within 12 hours.'
                    : 'Cảm ơn bạn đã đồng hành giữ gìn không gian tri thức xanh an toàn. Ban kiểm duyệt sẽ xử lý trong vòng 12 giờ.'}
                </p>
                {result.ticketId && (
                  <span className="text-[11px] font-mono text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-emerald-200 mt-2">
                    {isEn ? 'Ticket ID:' : 'Mã khiếu nại:'} {result.ticketId}
                  </span>
                )}
              </>
            ) : (
              <>
                <AlertTriangle className="w-10 h-10 text-rose-600 mb-1" />
                <h4 className="font-serif font-bold text-base text-rose-950">
                  {isEn ? 'Report Submission Failed' : 'Chưa Thể Gửi Báo Cáo'}
                </h4>
                <p className="text-xs text-rose-800 leading-relaxed">{result.message}</p>
                <button
                  onClick={() => setResult(null)}
                  className="mt-3 px-4 py-1.5 rounded-xl bg-forest-900 text-white text-xs font-semibold"
                >
                  {isEn ? 'Try again' : 'Thử lại'}
                </button>
              </>
            )}
          </div>
        ) : (
          /* Form báo cáo */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Lựa chọn lý do */}
            <div className="space-y-2">
              <label className="block font-bold text-forest-900">
                {isEn ? 'Select Primary Reason:' : 'Chọn lý do chính xác:'}
              </label>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {reportReasons.map((reason) => (
                  <label
                    key={reason.id}
                    className={`flex items-start gap-2.5 p-3 rounded-2xl border cursor-pointer transition ${
                      selectedReason === reason.id
                        ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-200 text-forest-950'
                        : 'bg-white border-forest-100 hover:bg-forest-50/50 text-forest-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="report_reason"
                      value={reason.id}
                      checked={selectedReason === reason.id}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="mt-0.5 text-amber-600 focus:ring-amber-500"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-xs block text-forest-950">
                        {reason.label}
                      </span>
                      <span className="text-[11px] text-gray-500 leading-snug block mt-0.5">
                        {reason.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Ghi chú chi tiết */}
            <div className="space-y-1">
              <label className="block font-bold text-forest-900">
                {isEn ? 'Additional Details & Supporting Evidence (Optional):' : 'Bằng chứng hoặc mô tả chi tiết thêm (không bắt buộc):'}
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={isEn ? 'e.g., Links to contradictory pharmacopeia sources, dosage concerns...' : 'Ví dụ: Bài thuốc chứa cây có độc tính, thông tin sai lệch so với Dược Điển Việt Nam...'}
                className="w-full px-3 py-2 bg-cream-50/50 border border-forest-200 rounded-xl text-xs text-forest-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-sans"
              />
            </div>

            {/* Cam kết trung thực */}
            <p className="text-[11px] text-gray-500 italic bg-forest-50/60 p-2.5 rounded-xl border border-forest-100 leading-relaxed">
              {isEn
                ? 'Information provided will be evaluated objectively against Vietnamese Forestry Law and Pharmacopoeia standards.'
                : 'Thông tin báo cáo của bạn được bảo mật tuyệt đối và được đối chiếu với Luật Lâm nghiệp và Dược Điển Việt Nam.'}
            </p>

            {/* Nút hành động */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-forest-50">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-forest-800 hover:bg-forest-50 transition"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{isEn ? 'Submit Report' : 'Gửi Báo Cáo'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
