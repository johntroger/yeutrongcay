import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <span className="font-bold uppercase tracking-wider block text-amber-950 mb-1 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-700" />
            Tuyên bố miễn trừ y tế & An toàn thảo dược bản địa
          </span>
          Toàn bộ thông tin về công dụng, bài thuốc dân gian và cách sơ chế thảo dược trên nền tảng chỉ mang tính chất tham khảo lưu truyền trong văn hóa Đông y dân tộc. Nền tảng không thay thế cho chẩn đoán, xét nghiệm hoặc phác đồ điều trị của bác sĩ chuyên khoa. Phụ nữ mang thai, trẻ sơ sinh và người có bệnh nền mạn tính cần tham vấn ý kiến thầy thuốc trước khi áp dụng.
        </div>
      </div>
    </div>
  );
};
