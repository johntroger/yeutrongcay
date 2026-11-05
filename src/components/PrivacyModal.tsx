import React from 'react';
import { X, ShieldCheck, AlertTriangle, BookOpen, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { t, isEn } = useLanguage();

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
                {t('modals.privacyTitle')}
              </h3>
              <p className="text-xs text-forest-700">
                {t('modals.privacySubtitle')}
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
            <span>{t('modals.privacySection1Title')}</span>
          </h4>
          <p className="leading-relaxed text-xs">
            {t('modals.privacySection1P1')}
          </p>
          <p className="leading-relaxed text-xs">
            {t('modals.privacySection1P2')}
          </p>
        </div>

        {/* Section 2: Privacy */}
        <div className="p-4 rounded-2xl bg-forest-50/80 border border-forest-100 text-xs sm:text-sm text-forest-950 space-y-2">
          <h4 className="font-bold text-forest-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-herbal-600 shrink-0" />
            <span>{t('modals.privacySection2Title')}</span>
          </h4>
          <p className="leading-relaxed text-xs">
            {t('modals.privacySection2P1')}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-forest-900">
            <li>
              {isEn
                ? 'Zero exact GPS coordinates stored: Swap locations are generalized to District/City level.'
                : 'Không lưu tọa độ GPS chính xác của nhà riêng. Vị trí trên bản đồ trao đổi chỉ hiển thị cấp Quận/Huyện.'}
            </li>
            <li>
              {isEn
                ? 'Automated EXIF GPS stripping: All diseased leaf uploads are stripped of metadata before public display.'
                : 'Tẩy sạch dữ liệu EXIF/GPS của ảnh chụp: Mọi bức ảnh lá bệnh tải lên đều được lọc sạch vị trí chụp.'}
            </li>
            <li>
              {isEn
                ? 'Zero personal data sale or third-party tracking.'
                : 'Không chia sẻ hay bán thông tin cá nhân cho bất kỳ bên thứ ba nào.'}
            </li>
          </ul>
        </div>

        {/* Section 3: Legal & Wildlife Protection */}
        <div className="p-4 rounded-2xl bg-terracotta-50/70 border border-terracotta-100 text-xs sm:text-sm text-terracotta-950 space-y-2">
          <h4 className="font-bold text-terracotta-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-terracotta-600 shrink-0" />
            <span>{t('modals.privacySection3Title')}</span>
          </h4>
          <p className="leading-relaxed text-xs">
            {t('modals.privacySection3P1')}
          </p>
        </div>

        {/* Footer close */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold transition shadow-xs"
          >
            {isEn ? 'I Understand & Agree' : 'Tôi Đã Hiểu & Đồng Ý'}
          </button>
        </div>

      </div>
    </div>
  );
};
