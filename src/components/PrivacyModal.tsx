import React from 'react';
import { X, ShieldCheck, AlertTriangle, BookOpen, Lock } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-forest-100 p-6 sm:p-8 relative my-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-forest-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-100 text-forest-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-herbal-700" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-950">
                Điều Khoản, Quyền Riêng Tư & Miễn Trừ Y Tế
              </h3>
              <p className="text-xs text-forest-700">
                Quy chuẩn minh bạch thông tin tại Yêu Trồng Cây (yeutrongcay.com)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-forest-50 hover:bg-forest-100 text-forest-800 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Medical Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
          <h4 className="font-bold text-amber-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>1. Tuyên Bố Miễn Trừ Trách Nhiệm Y Tế (Medical Disclaimer)</span>
          </h4>
          <p className="leading-relaxed text-xs">
            Toàn bộ thông tin về dược tính, bài thuốc dân gian và cách sử dụng thảo dược trên <strong>yeutrongcay.com</strong> chỉ mang tính chất tham khảo, bảo tồn tri thức dân gian và chia sẻ kinh nghiệm nông nghiệp gia đình.
          </p>
          <p className="leading-relaxed text-xs">
            <strong>Tuyệt đối không tự ý dùng thảo dược thay thế thuốc chữa bệnh, đơn thuốc hoặc phác đồ điều trị của bác sĩ chuyên khoa.</strong> Phụ nữ có thai, người đang cho con bú và người có bệnh lý nền mạn tính phải tham vấn thầy thuốc có chứng chỉ hành nghề trước khi sử dụng.
          </p>
        </div>

        {/* Section 2: Privacy (H8 & Zero Personal GPS) */}
        <div className="p-4 rounded-2xl bg-forest-50/80 border border-forest-100 text-xs sm:text-sm text-forest-950 space-y-2">
          <h4 className="font-bold text-forest-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-herbal-600 shrink-0" />
            <span>2. Chính Sách Bảo Vệ Quyền Riêng Tư & Vị Trí Người Dùng (H8)</span>
          </h4>
          <p className="leading-relaxed text-xs">
            Hệ thống tôn trọng tuyệt đối quyền riêng tư của người yêu cây:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-forest-900">
            <li><strong>Không lưu tọa độ GPS chính xác</strong> của nhà riêng. Vị trí trên bản đồ trao đổi chỉ hiển thị cấp Quận/Huyện hoặc địa điểm công cộng được làm mờ.</li>
            <li><strong>Tẩy sạch dữ liệu EXIF/GPS của ảnh chụp:</strong> Mọi bức ảnh lá bệnh tải lên đều được lọc sạch vị trí chụp trước khi hiển thị cho cộng đồng.</li>
            <li>Không chia sẻ hay bán thông tin cá nhân cho bất kỳ bên thứ ba nào.</li>
          </ul>
        </div>

        {/* Section 3: Legal & Wildlife Protection */}
        <div className="p-4 rounded-2xl bg-terracotta-50/70 border border-terracotta-100 text-xs sm:text-sm text-terracotta-950 space-y-2">
          <h4 className="font-bold text-terracotta-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-terracotta-600 shrink-0" />
            <span>3. Tuân Thủ Pháp Luật & Bảo Tồn Thực Vật Hoang Dã</span>
          </h4>
          <p className="leading-relaxed text-xs">
            Cộng đồng nghiêm cấm mọi hành vi mua bán, buôn bán hoặc kích động khai thác các loài động thực vật hoang dã nguy cấp, quý hiếm thuộc <strong>Sách Đỏ Việt Nam</strong> và danh mục tại <strong>Nghị định 06/2019/NĐ-CP, Nghị định 84/2021/NĐ-CP</strong>.
          </p>
        </div>

        {/* Footer close */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold transition shadow-xs"
          >
            Tôi Đã Hiểu & Đồng Ý
          </button>
        </div>

      </div>
    </div>
  );
};
