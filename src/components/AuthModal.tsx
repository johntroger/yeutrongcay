import React, { useState } from 'react';
import { X, LogIn, Mail, Lock, Sparkles, Settings, Check, AlertCircle, RefreshCw, Key } from 'lucide-react';
import { UserProfile } from '../types/index.ts';
import { useLanguage } from '../context/LanguageContext.tsx';
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  getSavedFirebaseConfig,
  saveFirebaseConfig,
  FirebaseCustomConfig
} from '../services/firebaseClient.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { t, isEn } = useLanguage();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Cấu hình Firebase thủ công
  const [showConfig, setShowConfig] = useState(false);
  const [customConfigInput, setCustomConfigInput] = useState(() => {
    const saved = getSavedFirebaseConfig();
    return saved ? JSON.stringify(saved, null, 2) : '';
  });
  const [configSavedNotice, setConfigSavedNotice] = useState(false);

  if (!isOpen) return null;

  const currentConfig = getSavedFirebaseConfig();

  // Đăng nhập bằng Google (Thật qua Firebase)
  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setIsLoading(true);

    try {
      if (!currentConfig) {
        // Chưa có cấu hình Firebase -> Hỏi người dùng hoặc cho phép đăng nhập thử nghiệm
        throw new Error('Chưa cấu hình Firebase. Vui lòng bấm vào biểu tượng bánh răng để dán cấu hình Firebase của bạn, hoặc dùng chế độ Thử Nghiệm.');
      }

      const user = await loginWithGoogle();
      onLoginSuccess(user);
      onClose();
    } catch (err: unknown) {
      const e = err as { message?: string; code?: string };
      console.error('Google Auth Error:', err);
      if (e.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Bạn đã đóng cửa sổ đăng nhập Google.');
      } else {
        setErrorMsg(e.message || 'Lỗi khi đăng nhập Google.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng nhập / Đăng ký bằng Email & Mật khẩu
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setErrorMsg(null);
    setIsLoading(true);

    try {
      if (!currentConfig) {
        // Chế độ Demo / Fallback nếu chưa cấu hình Firebase
        setTimeout(() => {
          setIsLoading(false);
          onLoginSuccess({
            id: 'usr-' + Date.now(),
            name: email.split('@')[0],
            email: email,
            avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            badge: isEn ? 'New Gardener' : 'Thành Viên Mới',
            karma_points: 50,
            joined_date: new Date().toLocaleDateString('vi-VN'),
          });
          onClose();
        }, 800);
        return;
      }

      if (!password || password.length < 6) {
        setErrorMsg('Mật khẩu tối thiểu 6 ký tự.');
        setIsLoading(false);
        return;
      }

      let user: UserProfile;
      if (authMode === 'signup') {
        user = await registerWithEmail(email, password);
      } else {
        user = await loginWithEmail(email, password);
      }

      onLoginSuccess(user);
      onClose();
    } catch (err: unknown) {
      const e = err as { message?: string; code?: string };
      console.error('Email Auth Error:', err);
      if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
        setErrorMsg('Email hoặc mật khẩu không chính xác.');
      } else if (e.code === 'auth/email-already-in-use') {
        setErrorMsg('Email này đã được đăng ký. Vui lòng chuyển sang Đăng Nhập.');
      } else {
        setErrorMsg(e.message || 'Lỗi xác thực email.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Lưu cấu hình Firebase người dùng dán vào
  const handleSaveCustomConfig = () => {
    setErrorMsg(null);
    try {
      const parsed: FirebaseCustomConfig = JSON.parse(customConfigInput);
      if (!parsed.apiKey || !parsed.projectId) {
        setErrorMsg('Cấu hình Firebase phải có ít nhất apiKey và projectId.');
        return;
      }
      saveFirebaseConfig(parsed);
      setConfigSavedNotice(true);
      setTimeout(() => {
        setConfigSavedNotice(false);
        setShowConfig(false);
      }, 1200);
    } catch {
      setErrorMsg('Định dạng JSON không hợp lệ. Vui lòng sao chép toàn bộ object firebaseConfig từ Firebase Console.');
    }
  };

  // Đăng nhập nhanh chế độ Thử Nghiệm (Demo Mode)
  const handleDemoLogin = () => {
    onLoginSuccess({
      id: 'usr-demo-tester',
      name: isEn ? 'Tran Tung (Tester)' : 'Trần Tùng (Chủ Vườn Số)',
      email: 'trantung.gardener@gmail.com',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Nhà Vườn Tiên Phong',
      karma_points: 150,
      joined_date: '04/11/2026',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-charcoal-900 rounded-3xl max-w-sm sm:max-w-md w-full p-6 sm:p-7 shadow-2xl border border-forest-100 dark:border-forest-800 relative transition-colors">
        
        {/* Nút Đóng & Nút Cài Đặt Config */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="w-8 h-8 rounded-full bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 text-forest-700 dark:text-forest-300 flex items-center justify-center transition"
            title="Cài đặt Firebase Config"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-forest-50 dark:bg-charcoal-800 hover:bg-forest-100 text-forest-700 dark:text-forest-300 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Panel Cài Đặt Firebase Config */}
        {showConfig ? (
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2 text-forest-900 dark:text-white font-bold text-sm">
              <Key className="w-4 h-4 text-amber-500" />
              <span>Cấu Hình Firebase Của Bạn</span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Dán đoạn mã <code className="bg-gray-100 dark:bg-charcoal-800 px-1 py-0.5 rounded text-forest-800 dark:text-emerald-300">firebaseConfig</code> từ Firebase Console vào đây:
            </p>

            <textarea
              value={customConfigInput}
              onChange={(e) => setCustomConfigInput(e.target.value)}
              placeholder={`{\n  "apiKey": "AIzaSy...",\n  "authDomain": "your-app.firebaseapp.com",\n  "projectId": "your-app",\n  "appId": "1:..."\n}`}
              rows={6}
              className="w-full p-2.5 bg-forest-50/50 dark:bg-charcoal-950 border border-forest-200 dark:border-forest-800 rounded-xl font-mono text-xs text-charcoal-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {errorMsg && (
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-[11px] text-red-600 dark:text-red-300 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {configSavedNotice && (
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-600 dark:text-emerald-300 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Đã lưu Firebase Config thành công!</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-charcoal-800"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSaveCustomConfig}
                className="px-4 py-1.5 rounded-xl bg-forest-900 dark:bg-emerald-600 text-white text-xs font-semibold shadow-sm hover:opacity-95"
              >
                Lưu Cấu Hình
              </button>
            </div>
          </div>
        ) : (
          /* Form Đăng Nhập / Đăng Ký Chính */
          <div className="text-center">
            {/* Header Icon */}
            <div className="w-12 h-12 rounded-2xl bg-forest-900 dark:bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <LogIn className="w-6 h-6" />
            </div>

            <h3 className="text-lg sm:text-xl font-serif font-bold text-forest-900 dark:text-white mb-1">
              {authMode === 'signin' ? t('modals.authTitle') : (isEn ? 'Create Gardener Account' : 'Tạo Tài Khoản Nhà Vườn')}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              {authMode === 'signin' ? t('modals.authDesc') : (isEn ? 'Join our community of urban rooftop & balcony gardeners' : 'Tham gia hội người yêu trồng cây ban công & sân thượng')}
            </p>

            {/* Trạng thái Firebase */}
            <div className="mb-4 py-1.5 px-3 rounded-full text-[10px] font-semibold inline-flex items-center gap-1.5 border border-forest-100 dark:border-forest-800 bg-forest-50/60 dark:bg-charcoal-800">
              <span className={`w-2 h-2 rounded-full ${currentConfig ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span className="text-forest-800 dark:text-forest-200">
                {currentConfig ? 'Firebase Auth: Sẵn sàng kết nối' : 'Firebase: Chưa điền API Key (Chế độ Demo)'}
              </span>
            </div>

            {errorMsg && (
              <div className="mb-4 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-[11px] text-red-600 dark:text-red-300 text-left flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1-Click Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl border border-forest-200 dark:border-forest-800 hover:bg-forest-50 dark:hover:bg-charcoal-800 font-medium text-xs sm:text-sm text-forest-900 dark:text-white flex items-center justify-center gap-2.5 shadow-sm transition mb-3 disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-forest-700" />
              ) : (
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
              )}
              <span>{isEn ? 'Continue with Google' : 'Tiếp tục với Google'}</span>
            </button>

            <div className="flex items-center my-3">
              <div className="flex-1 border-t border-forest-100 dark:border-forest-800"></div>
              <span className="px-3 text-[10px] text-gray-400 uppercase font-semibold">{isEn ? 'or with email' : 'hoặc bằng email'}</span>
              <div className="flex-1 border-t border-forest-100 dark:border-forest-800"></div>
            </div>

            {/* Email Login / Signup Form */}
            <form onSubmit={handleEmailAuth} className="space-y-2.5 text-left">
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isEn ? 'Your email address...' : 'Nhập địa chỉ email...'}
                  className="w-full pl-9 pr-3 py-2 bg-cream-50 dark:bg-charcoal-950 border border-forest-100 dark:border-forest-800 rounded-xl text-xs text-charcoal-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {currentConfig && (
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isEn ? 'Password (min 6 chars)...' : 'Mật khẩu (tối thiểu 6 ký tự)...'}
                    className="w-full pl-9 pr-3 py-2 bg-cream-50 dark:bg-charcoal-950 border border-forest-100 dark:border-forest-800 rounded-xl text-xs text-charcoal-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-forest-900 dark:bg-emerald-600 hover:bg-forest-800 dark:hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 dark:text-white" />
                <span>
                  {authMode === 'signin'
                    ? (isEn ? 'Sign In with Email' : 'Đăng Nhập Bằng Email')
                    : (isEn ? 'Sign Up with Email' : 'Đăng Ký Tài Khoản Mới')}
                </span>
              </button>
            </form>

            {/* Chuyển đổi Đăng nhập <-> Đăng ký */}
            {currentConfig && (
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                {authMode === 'signin' ? (
                  <span>
                    Chưa có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      Đăng ký ngay
                    </button>
                  </span>
                ) : (
                  <span>
                    Đã có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      Đăng nhập
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Quick Demo Login Option */}
            <div className="mt-4 pt-3 border-t border-forest-100 dark:border-forest-800 flex items-center justify-between text-[11px] text-gray-400">
              <span>Trải nghiệm không cần tài khoản:</span>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="font-bold text-forest-800 dark:text-emerald-300 hover:underline"
              >
                Vào Nhanh (Demo)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
