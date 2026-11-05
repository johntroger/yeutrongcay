import React, { useState } from 'react';
import { X, LogIn, Mail, Sparkles } from 'lucide-react';
import { UserProfile } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { t, isEn } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'usr-google-8899',
        name: isEn ? 'Tran Tung (Digital Gardener)' : 'Trần Tùng (Chủ Vườn Số)',
        email: 'trantung.gardener@gmail.com',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        badge: isEn ? 'Pioneer Gardener' : 'Nhà Vườn Tiên Phong',
        karma_points: 120,
        joined_date: '04/11/2026',
      });
      onClose();
    }, 1000);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'usr-email-1234',
        name: email.split('@')[0],
        email: email,
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        badge: isEn ? 'New Gardener' : 'Thành Viên Mới',
        karma_points: 50,
        joined_date: '04/11/2026',
      });
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-forest-100 relative text-center">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-forest-50 hover:bg-forest-100 text-forest-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="w-12 h-12 rounded-2xl bg-forest-900 text-herbal-400 flex items-center justify-center mx-auto mb-4 shadow-md">
          <LogIn className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-serif font-bold text-forest-900 mb-1">
          {t('modals.authTitle')}
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          {t('modals.authDesc')}
        </p>

        {/* 1-Click Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-2xl border border-forest-200 hover:bg-forest-50 font-medium text-xs sm:text-sm text-forest-900 flex items-center justify-center gap-3 shadow-sm transition mb-4 disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{isEn ? 'Continue with Google' : 'Tiếp tục với Google'}</span>
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-forest-100"></div>
          <span className="px-3 text-[11px] text-gray-400 uppercase font-semibold">{isEn ? 'or' : 'hoặc'}</span>
          <div className="flex-1 border-t border-forest-100"></div>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-3">
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isEn ? 'Enter your email address...' : 'Nhập địa chỉ email của bạn...'}
              className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-forest-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-herbal-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-herbal-400" />
            <span>{isEn ? 'Sign In with Email' : 'Đăng Nhập Bằng Email'}</span>
          </button>
        </form>

        <p className="text-[11px] text-gray-400 mt-5 leading-normal">
          {isEn
            ? 'By signing in, you agree to our Biosecurity Standards and Community Privacy Terms.'
            : 'Bằng việc đăng nhập, bạn đồng ý với Quy chuẩn an toàn sinh học và Điều khoản bảo vệ quyền riêng tư của Yêu Trồng Cây.'}
        </p>

      </div>
    </div>
  );
};
