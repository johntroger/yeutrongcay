import React, { useState, useEffect } from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showReconnected, setShowReconnected] = useState<boolean>(false);
  const { isEn } = useLanguage();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-slide-up ${
        !isOnline
          ? 'bg-amber-900/90 text-amber-50 border-amber-500/50'
          : 'bg-emerald-900/90 text-emerald-50 border-emerald-500/50'
      }`}
    >
      <div className="flex items-start gap-3">
        {!isOnline ? (
          <div className="p-2 rounded-xl bg-amber-800/80 text-amber-300 shrink-0">
            <WifiOff className="w-5 h-5 animate-pulse" />
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-emerald-800/80 text-emerald-300 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}

        <div className="text-xs">
          {!isOnline ? (
            <>
              <h4 className="font-bold text-sm text-white mb-0.5">
                {isEn ? 'Weak Signal on Balcony (Offline Mode)' : 'Đang ở góc ban công sóng yếu (Ngoại tuyến)'}
              </h4>
              <p className="text-amber-100/90 leading-relaxed">
                {isEn
                  ? 'Do not worry! Any consultation drafts or garden diaries you just logged have been saved locally. The app will sync automatically once connection is restored.'
                  : 'Đừng lo! Mọi nội dung hỏi đáp và nhật ký bạn vừa nhập đã được lưu tạm an toàn trong bộ nhớ máy. Khi có mạng lại, hệ thống sẽ tự động đồng bộ.'}
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-sm text-white mb-0.5">
                {isEn ? 'Internet Connection Restored' : 'Đã kết nối lại Internet'}
              </h4>
              <p className="text-emerald-100/90">
                {isEn
                  ? 'Your network is back online. Your garden logs are up-to-date and ready!'
                  : 'Kết nối mạng đã ổn định. Dữ liệu làm vườn của bạn đang sẵn sàng!'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
