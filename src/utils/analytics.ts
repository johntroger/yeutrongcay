/**
 * Tiện ích quản lý và theo dõi Google Analytics 4 (GA4)
 * Hỗ trợ SPA (Single Page Application) tracking và Custom Events
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Đọc mã đo lường từ biến môi trường Vite hoặc fallback
export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || 'G-N2LQSJLPCY';

/**
 * Gửi sự kiện xem trang (Page View) cho React Router SPA
 * @param path Đường dẫn URL (ví dụ: '/cay-an-trai' hoặc '/bac-si-cay-trong')
 * @param title Tiêu đề trang
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: path,
      page_title: title || document.title,
    });
  }
}

/**
 * Gửi sự kiện tương tác hành động của người dùng (Custom Event)
 * Ví dụ: click đổi cây, hỏi bác sĩ AI, tìm kiếm cây thuốc
 */
export function trackEvent(
  action: string,
  params?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: params?.category,
      event_label: params?.label,
      value: params?.value,
      ...params,
    });
  }
}
