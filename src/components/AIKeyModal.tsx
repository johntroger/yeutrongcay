import React, { useState, useEffect } from 'react';
import {
  Key,
  ShieldCheck,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Sparkles,
  X as CloseIcon,
  Cpu
} from 'lucide-react';
import {
  getUserAIConfig,
  saveUserAIConfig,
  clearUserAIConfig,
  testUserAIKey,
  AIProvider,
  UserAIConfig
} from '../services/userAIService.ts';
import { useLanguage } from '../context/LanguageContext.tsx';

interface AIKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved?: (config: UserAIConfig) => void;
}

export const AIKeyModal: React.FC<AIKeyModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved,
}) => {
  const { isEn } = useLanguage();
  const [provider, setProvider] = useState<AIProvider>('gemini');
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [hasSavedKey, setHasSavedKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = getUserAIConfig();
      setProvider(current.provider);
      setApiKey(current.apiKey);
      setHasSavedKey(Boolean(current.apiKey));
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testUserAIKey(provider, apiKey);
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || (isEn ? 'Network error testing API' : 'Lỗi kết nối khi kiểm tra API'),
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    const config: UserAIConfig = { provider, apiKey: apiKey.trim() };
    saveUserAIConfig(config);
    setHasSavedKey(Boolean(apiKey.trim()));
    if (onConfigSaved) onConfigSaved(config);
    onClose();
  };

  const handleClear = () => {
    clearUserAIConfig();
    setApiKey('');
    setHasSavedKey(false);
    setTestResult(null);
    if (onConfigSaved) onConfigSaved({ provider: 'offline', apiKey: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-charcoal-850 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-forest-100 dark:border-charcoal-700 space-y-5 text-forest-900 dark:text-cream-50 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-charcoal-400 hover:text-charcoal-700 dark:hover:text-cream-100 hover:bg-forest-50 dark:hover:bg-charcoal-700 transition"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 pr-8">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-forest-950 dark:text-cream-50">
              {isEn ? 'Personal AI Key Settings (BYOK)' : 'Cài Đặt API Key Cá Nhân Cho Bác Sĩ Cây'}
            </h3>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-300 mt-0.5">
              {isEn
                ? 'Use your own free AI key. We never charge, store or route your key on our servers.'
                : 'Sử dụng API Key của chính bạn. Máy chủ website không lưu trữ và không tính phí.'}
            </p>
          </div>
        </div>

        {/* Informative Banner */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? '100% Client-Side & Private' : 'Bảo Mật Tuyệt Đối & Lưu Trên Trình Duyệt'}</span>
          </p>
          <p className="text-[11px] leading-relaxed text-emerald-900/90 dark:text-emerald-200/90">
            {isEn
              ? 'Yêu Trồng Cây is a non-profit community. Vision calls are dispatched directly from your browser to the AI provider. No rate limit from the website.'
              : 'Yêu Trồng Cây là dự án phi lợi nhuận. Lệnh chẩn đoán ảnh gửi trực tiếp từ trình duyệt của bạn đến Google AI. Bạn không bị giới hạn lượt hỏi và hoàn toàn miễn phí.'}
          </p>
        </div>

        {/* Provider Selection */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-forest-900 dark:text-cream-100 block">
            {isEn ? 'Choose AI Provider:' : 'Chọn nhà cung cấp AI:'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setProvider('gemini')}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition ${
                provider === 'gemini'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500 font-bold text-emerald-900 dark:text-emerald-300'
                  : 'bg-white dark:bg-charcoal-800 border-forest-100 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-700'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Google Gemini</span>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                {isEn ? 'Free 100% • Recommended' : 'Miễn phí 100% • Khuyên dùng'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setProvider('openai')}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition ${
                provider === 'openai'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-500 font-bold text-emerald-900 dark:text-emerald-300'
                  : 'bg-white dark:bg-charcoal-800 border-forest-100 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 hover:bg-forest-50 dark:hover:bg-charcoal-700'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>OpenAI (GPT-4o)</span>
              </div>
              <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400 mt-1">
                {isEn ? 'BYO Key (sk-...)' : 'Dùng key OpenAI cá nhân'}
              </span>
            </button>
          </div>
        </div>

        {/* Free Gemini Link Helper */}
        {provider === 'gemini' && (
          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between gap-2">
            <div>
              <p className="font-bold text-[11px] text-amber-950 dark:text-amber-200">
                {isEn ? 'How to get a free Gemini API Key?' : 'Chưa có API Key Gemini?'}
              </p>
              <p className="text-[10px] text-amber-800/90 dark:text-amber-300/90">
                {isEn
                  ? 'Takes 10 seconds with any Google account. No credit card required.'
                  : 'Chỉ mất 10 giây với tài khoản Google, không cần thẻ tín dụng.'}
              </p>
            </div>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-[10px] flex items-center gap-1 shrink-0 transition shadow-xs"
            >
              <span>{isEn ? 'Get Key' : 'Lấy Key'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* API Key Input */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-forest-900 dark:text-cream-100 flex items-center justify-between">
            <span>{isEn ? 'Enter your API Key:' : 'Nhập API Key của bạn:'}</span>
            {hasSavedKey && (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {isEn ? 'Key configured in browser' : 'Đã có key trong máy'}
              </span>
            )}
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setTestResult(null);
              }}
              placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-...'}
              className="w-full px-3.5 py-2.5 pr-10 bg-white dark:bg-charcoal-800 border border-forest-200 dark:border-charcoal-700 text-forest-950 dark:text-cream-100 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-herbal-500"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-2.5 top-2.5 text-charcoal-400 hover:text-charcoal-700 dark:hover:text-cream-200"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Test Result Feedback */}
        {testResult && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              testResult.success
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-300'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="text-[11px] leading-tight">{testResult.message}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-forest-100 dark:border-charcoal-750">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTest}
              disabled={isTesting || !apiKey.trim()}
              className="px-3 py-2 rounded-xl bg-forest-100 dark:bg-charcoal-700 hover:bg-forest-200 dark:hover:bg-charcoal-600 text-forest-900 dark:text-cream-100 text-xs font-medium flex items-center gap-1.5 transition disabled:opacity-50"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>{isEn ? 'Testing...' : 'Đang test...'}</span>
                </>
              ) : (
                <span>{isEn ? 'Test Key' : 'Kiểm tra key'}</span>
              )}
            </button>

            {hasSavedKey && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                title={isEn ? 'Remove Key from browser' : 'Xóa Key khỏi trình duyệt'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-charcoal-800 border border-forest-200 dark:border-charcoal-700 text-charcoal-700 dark:text-charcoal-300 text-xs font-medium hover:bg-forest-50 dark:hover:bg-charcoal-700 transition"
            >
              {isEn ? 'Cancel' : 'Hủy'}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-forest-900 dark:bg-emerald-600 hover:bg-forest-800 dark:hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition"
            >
              {isEn ? 'Save & Use Key' : 'Lưu & Sử Dụng'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
