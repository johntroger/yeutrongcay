/**
 * Yêu Trồng Cây - Plant Heart Reviews & WebP Image Compression Service
 * Quản lý Đánh giá 1-5 Trái Tim Đỏ và Nén ảnh WebP siêu nhẹ phía Client
 */

import { PlantHeartReview, PlantHeartSummary } from '../types/index.ts';

const API_BASE = '/api';

class PlantReviewService {
  private summariesCache: Record<string, PlantHeartSummary> | null = null;
  private isFetchingSummaries = false;
  private listeners: (() => void)[] = [];

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  /**
   * Gọi 1 request duy nhất lấy batch summary của tất cả bài viết
   */
  public async fetchAllReviewSummaries(): Promise<Record<string, PlantHeartSummary>> {
    if (this.summariesCache) {
      return this.summariesCache;
    }
    if (this.isFetchingSummaries) {
      return {};
    }

    this.isFetchingSummaries = true;
    try {
      const res = await fetch(`${API_BASE}/reviews.php?action=summaries`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.summaries) {
          this.summariesCache = json.summaries;
          this.notify();
          return this.summariesCache || {};
        }
      }
    } catch (err) {
      console.warn('Cannot fetch review summaries from /api/reviews.php:', err);
    } finally {
      this.isFetchingSummaries = false;
    }
    return {};
  }

  /**
   * Lấy nhanh điểm Trái Tim Đỏ từ bộ nhớ RAM (O(1)) cho thẻ PlantCard
   */
  public getCachedSummary(slug: string): PlantHeartSummary {
    if (this.summariesCache && this.summariesCache[slug]) {
      return this.summariesCache[slug];
    }
    return {
      average_hearts: 5.0,
      total_reviews: 0,
      photo_count: 0,
    };
  }

  /**
   * Lấy toàn bộ danh sách bình luận của 1 bài viết
   */
  public async fetchReviewsForPlant(
    slug: string
  ): Promise<{ reviews: PlantHeartReview[]; summary: PlantHeartSummary }> {
    try {
      const res = await fetch(`${API_BASE}/reviews.php?slug=${encodeURIComponent(slug)}`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          const summary = json.summary || {
            average_hearts: 5.0,
            total_reviews: json.reviews?.length || 0,
            photo_count: 0,
          };
          if (!this.summariesCache) this.summariesCache = {};
          this.summariesCache[slug] = summary;
          return {
            reviews: json.reviews || [],
            summary,
          };
        }
      }
    } catch (err) {
      console.warn(`Cannot fetch reviews for ${slug}:`, err);
    }

    return {
      reviews: [],
      summary: this.getCachedSummary(slug),
    };
  }

  /**
   * Gửi đánh giá 1-5 Trái Tim Đỏ kèm ảnh nén
   */
  public async submitHeartReview(payload: {
    plant_slug: string;
    author_name: string;
    author_handle?: string;
    author_wallet?: string;
    hearts: 1 | 2 | 3 | 4 | 5;
    context_tag?: string;
    comment: string;
    images?: string[];
  }): Promise<{ success: boolean; review?: PlantHeartReview; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/reviews.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          action: 'add_review',
          ...payload,
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        // Cập nhật lại bộ nhớ RAM
        if (this.summariesCache && this.summariesCache[payload.plant_slug]) {
          const old = this.summariesCache[payload.plant_slug];
          const newTotal = old.total_reviews + 1;
          const newAvg = Math.round(((old.average_hearts * old.total_reviews + payload.hearts) / newTotal) * 10) / 10;
          this.summariesCache[payload.plant_slug] = {
            average_hearts: newAvg,
            total_reviews: newTotal,
            photo_count: old.photo_count + (payload.images && payload.images.length > 0 ? 1 : 0),
          };
        }
        this.notify();
        return { success: true, review: json.review };
      }
      return { success: false, error: json.error || 'Gửi đánh giá không thành công' };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Lỗi kết nối máy chủ' };
    }
  }

  /**
   * Thu nhỏ & nén ảnh sang định dạng WebP siêu nhẹ (~50KB-90KB)
   * Chặn tuyệt đối file video hoặc file không phải ảnh tĩnh
   */
  public async compressImageToWebP(file: File): Promise<{ dataUrl: string; sizeKB: number }> {
    // 1. Chặn video
    if (file.type.startsWith('video/') || file.name.match(/\.(mp4|mov|avi|webm|mkv|flv)$/i)) {
      throw new Error('Để tiết kiệm dung lượng, hệ thống chỉ hỗ trợ đính kèm Hình ảnh, không hỗ trợ Video!');
    }

    // 2. Kiểm tra định dạng ảnh hợp lệ
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validImageTypes.includes(file.type.toLowerCase())) {
      throw new Error('Định dạng tệp không được hỗ trợ. Vui lòng tải lên ảnh JPG, PNG hoặc WebP.');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Tệp ảnh bị lỗi hoặc không hiển thị được'));
        img.onload = () => {
          try {
            const maxDim = 1024;
            let width = img.width;
            let height = img.height;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              throw new Error('Trình duyệt không hỗ trợ xử lý Canvas');
            }

            // Vẽ ảnh lên canvas
            ctx.drawImage(img, 0, 0, width, height);

            // Nén sang WebP với chất lượng 0.78
            const webpDataUrl = canvas.toDataURL('image/webp', 0.78);
            const head = 'data:image/webp;base64,';
            const base64Len = webpDataUrl.length - head.length;
            const sizeKB = Math.round(((base64Len * 3) / 4 / 1024) * 10) / 10;

            resolve({
              dataUrl: webpDataUrl,
              sizeKB,
            });
          } catch (err) {
            reject(err);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  }
}

export const plantReviewService = new PlantReviewService();
