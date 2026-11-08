import React from 'react';
import { Plant } from '../types/index.ts';
import { X, Sun, Droplets, AlertTriangle, ShieldCheck, Coins, HelpCircle, Calendar } from 'lucide-react';

interface PlantModalProps {
  plant: Plant | null;
  onClose: () => void;
}

export const PlantModal: React.FC<PlantModalProps> = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-forest-100 flex flex-col relative my-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-forest-100 text-forest-900 flex items-center justify-center shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-forest-900">
          <img
            src={plant.image_url}
            alt={plant.common_name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="960" height="480" viewBox="0 0 960 480"><rect width="100%" height="100%" fill="%23064e3b"/><g fill="none" stroke="%2334d399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="translate(430, 160)"><path d="M50 160 C50 100, 10 70, 0 50 C40 50, 80 80, 80 160"/><path d="M50 160 C50 90, 90 60, 100 40 C70 40, 40 70, 30 140"/><line x1="50" y1="160" x2="50" y2="20"/></g><text x="50%" y="82%" text-anchor="middle" fill="%23a7f3d0" font-family="system-ui,sans-serif" font-size="20" font-weight="600" letter-spacing="1">YEU TRONG CAY</text></svg>`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex items-end p-6">
            <div>
              <p className="text-xs font-mono italic text-herbal-300 mb-1">
                {plant.scientific_name}
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {plant.common_name}
              </h2>
              {plant.aliases.length > 0 && (
                <p className="text-xs text-white/80 mt-1">
                  Địa phương gọi là: {plant.aliases.join(' • ')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest-700 mb-2">Đặc điểm sinh học</h4>
            <p className="text-sm text-charcoal-900 leading-relaxed font-sans">
              {plant.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-forest-50/70 border border-forest-100 text-xs">
            <div>
              <span className="text-forest-700 block mb-1 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-500" /> Ánh sáng
              </span>
              <span className="font-semibold text-forest-950">
                {plant.sunlight === 'full_sun' ? 'Nắng đầy đủ' : plant.sunlight === 'partial_shade' ? 'Nắng tán xạ' : 'Trong nhà'}
              </span>
            </div>
            <div>
              <span className="text-forest-700 block mb-1 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-blue-500" /> Nhu cầu nước
              </span>
              <span className="font-semibold text-forest-950">
                {plant.watering === 'daily' ? 'Hàng ngày' : plant.watering === 'moderate' ? 'Vừa phải (2-3 ngày)' : 'Chịu hạn'}
              </span>
            </div>
            <div>
              <span className="text-forest-700 block mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-herbal-600" /> Thu hoạch
              </span>
              <span className="font-semibold text-forest-950">{plant.growth_time}</span>
            </div>
          </div>

          {/* Medical & Folk Remedies (If Herb) */}
          {plant.medical_info && (
            <div className="space-y-4 pt-2 border-t border-forest-100">
              <h4 className="text-sm font-bold text-forest-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-herbal-600" />
                <span>Công Dụng Trị Liệu & Bài Thuốc Dân Gian</span>
              </h4>

              {/* Uses list */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-900">
                {plant.medical_info.uses.map((use, i) => (
                  <li key={i} className="flex items-start gap-2 bg-cream-50 p-2.5 rounded-xl border border-forest-50">
                    <span className="w-1.5 h-1.5 rounded-full bg-herbal-600 mt-1.5 shrink-0"></span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>

              {/* Folk Remedies */}
              {plant.medical_info.folk_remedies && (
                <div className="bg-forest-50/50 p-4 rounded-2xl border border-forest-100 text-xs space-y-2">
                  <span className="font-bold text-forest-900 block">Kinh nghiệm chế biến / bài thuốc:</span>
                  {plant.medical_info.folk_remedies.map((remedy, i) => (
                    <p key={i} className="text-charcoal-800 leading-relaxed pl-2 border-l-2 border-herbal-500">
                      {remedy}
                    </p>
                  ))}
                </div>
              )}

              {/* Toxicity Warning */}
              {plant.medical_info.toxicity_warning && (
                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Lưu ý an toàn / Đối tượng kiêng kỵ:</span>
                    <span>{plant.medical_info.toxicity_warning}</span>
                  </div>
                </div>
              )}

              {/* Confusion Risk */}
              {plant.medical_info.confusion_risk && (
                <div className="bg-red-50 p-3.5 rounded-2xl border border-red-200 text-xs text-red-950 flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-0.5">Phân biệt tránh nhầm lẫn:</span>
                    <span>{plant.medical_info.confusion_risk.confused_with} - <strong>Dấu hiệu:</strong> {plant.medical_info.confusion_risk.distinguishing_features}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Seasonality */}
          {plant.seasonality && (
            <div className="pt-2 border-t border-forest-100 text-xs">
              <h4 className="font-bold text-forest-900 mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-forest-700" />
                <span>Lịch Nông Vụ Nhân Giống Ba Miền</span>
              </h4>
              <div className="space-y-1.5 text-charcoal-800">
                <p>• <strong>Miền Bắc:</strong> {plant.seasonality.north}</p>
                <p>• <strong>Miền Trung:</strong> {plant.seasonality.central}</p>
                <p>• <strong>Miền Nam:</strong> {plant.seasonality.south}</p>
              </div>
            </div>
          )}

          {/* Monetization tips */}
          {plant.monetization_tips && (
            <div className="pt-2 border-t border-forest-100 text-xs bg-terracotta-50/50 p-4 rounded-2xl border border-terracotta-100">
              <h4 className="font-bold text-terracotta-800 mb-2 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-terracotta-600" />
                <span>Gợi ý tạo thu nhập từ cây này:</span>
              </h4>
              <ul className="space-y-1.5 text-charcoal-800">
                {plant.monetization_tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-terracotta-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
