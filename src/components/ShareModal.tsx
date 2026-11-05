import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  Sparkles,
  Leaf
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text?: string;
  url?: string;
  imageUrl?: string;
  badge?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  text,
  url,
  imageUrl,
  badge
}) => {
  const { isEn } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://yeutrongcay.com');
  const shareTitle = title || (isEn ? 'Yeu Trong Cay - Urban Botanical Ecosystem' : 'Yêu Trồng Cây - Hệ Sinh Thái Cây Trồng Đô Thị');
  const shareText = text || (isEn ? 'Discover urban botanical guides, AI plant clinic, and micro-farming models on Yêu Trồng Cây!' : 'Khám phá bách khoa thực vật học, bác sĩ cây trồng và nông nghiệp đô thị tại Yêu Trồng Cây!');

  // Thử gọi Web Share API gốc của trình duyệt (Điện thoại iOS/Android)
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const handleNativeShare = async () => {
    if (!canNativeShare) return;
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      });
      onClose();
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.warn('Native share dismissed or failed:', err);
      }
    }
  };

  // Sao chép link vào Clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Các đường dẫn chia sẻ mạng xã hội
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const zaloShareUrl = `https://zalo.me/share?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${shareTitle} - ${shareText}`)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-white dark:bg-charcoal-900 border border-forest-100 dark:border-forest-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative text-charcoal-900 dark:text-cream-100 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-forest-700 dark:text-forest-300 hover:bg-forest-50 dark:hover:bg-forest-900/50 transition"
          aria-label={isEn ? 'Close' : 'Đóng'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tiêu đề modal */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-forest-950 dark:text-cream-50 font-serif leading-tight">
              {isEn ? 'Share to Gardeners' : 'Chia Sẻ Với Cộng Đồng Yêu Cây'}
            </h3>
            <p className="text-xs text-forest-700 dark:text-forest-300/80 mt-0.5">
              {isEn ? 'Spread green living inspiration across social channels' : 'Lan tỏa cảm hứng sống xanh đến bạn bè và hội nhóm'}
            </p>
          </div>
        </div>

        {/* Card xem trước (Social Media Card Preview) */}
        <div className="mb-6 p-3.5 bg-forest-50/60 dark:bg-forest-950/50 border border-forest-100 dark:border-forest-800/80 rounded-2xl flex gap-3.5 items-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={shareTitle}
              className="w-20 h-20 rounded-xl object-cover shrink-0 border border-forest-200/60 dark:border-forest-800"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-emerald-700 text-white flex flex-col items-center justify-center shrink-0">
              <Leaf className="w-7 h-7 mb-1" />
              <span className="text-[10px] font-bold">yeutrongcay</span>
            </div>
          )}
          <div className="min-w-0 flex-1">
            {badge && (
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 mb-1">
                {badge}
              </span>
            )}
            <h4 className="text-xs sm:text-sm font-bold text-forest-950 dark:text-cream-50 truncate leading-snug">
              {shareTitle}
            </h4>
            <p className="text-[11px] text-forest-700 dark:text-forest-300/70 line-clamp-2 mt-0.5 leading-relaxed">
              {shareText}
            </p>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium block mt-1">
              yeutrongcay.com
            </span>
          </div>
        </div>

        {/* Nút Native Share (Nổi bật trên điện thoại) */}
        {canNativeShare && (
          <button
            onClick={handleNativeShare}
            className="w-full py-3 mb-5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>{isEn ? 'Open Phone Share Menu (AirDrop, Apps...)' : 'Mở Menu Chia Sẻ Trên Điện Thoại'}</span>
          </button>
        )}

        {/* Mạng Xã Hội 1-Chạm (Facebook, Zalo, Twitter, Telegram) */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-forest-900 dark:text-cream-200 mb-2.5">
            {isEn ? 'Share via Social Networks:' : 'Chia sẻ trực tiếp qua:'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Facebook */}
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] dark:text-[#5B9DF6] font-semibold text-xs border border-[#1877F2]/20 transition"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>

            {/* Zalo */}
            <a
              href={zaloShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0068FF]/10 hover:bg-[#0068FF]/20 text-[#0068FF] dark:text-[#4A96FF] font-semibold text-xs border border-[#0068FF]/20 transition"
            >
              <span className="w-4 h-4 rounded-full bg-[#0068FF] text-white flex items-center justify-center text-[9px] font-black shrink-0">
                Z
              </span>
              <span>Zalo</span>
            </a>

            {/* X / Twitter */}
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 dark:text-slate-200 font-semibold text-xs border border-slate-300 dark:border-slate-700 transition"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X (Twitter)</span>
            </a>

            {/* Telegram */}
            <a
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#2AABEE]/10 hover:bg-[#2AABEE]/20 text-[#2AABEE] font-semibold text-xs border border-[#2AABEE]/20 transition"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span>Telegram</span>
            </a>
          </div>
        </div>

        {/* Ô sao chép liên kết (Copy Link Box) */}
        <div>
          <label className="block text-xs font-bold text-forest-900 dark:text-cream-200 mb-1.5">
            {isEn ? 'Or copy direct page link:' : 'Hoặc sao chép đường dẫn trực tiếp:'}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-forest-50/70 dark:bg-forest-950/60 border border-forest-200 dark:border-forest-800 text-xs text-forest-900 dark:text-cream-100 font-mono select-all focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>{isEn ? 'Copied!' : 'Đã Chép!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isEn ? 'Copy' : 'Sao Chép'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Khung chia sẻ cộng đồng */}
        <div className="mt-5 pt-4 border-t border-forest-100 dark:border-forest-800/80 flex items-center justify-between text-[11px] text-forest-600 dark:text-forest-400">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {isEn ? 'Boost green balcony awareness' : 'Cùng phủ xanh ban công đô thị'}
          </span>
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            #YeuTrongCay #UrbanFarming
          </span>
        </div>
      </div>
    </div>
  );
};
