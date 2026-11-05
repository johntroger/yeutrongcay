/**
 * TIỆN ÍCH ĐÓNG WATERMARK BẢN QUYỀN & TẨY SẠCH EXIF GPS (H7)
 * Vẽ ảnh lên HTML5 Canvas, chèn dấu mờ bảo vệ ảnh thực vật bản địa,
 * tự động loại bỏ mọi tọa độ EXIF GPS vị trí tư gia và xuất định dạng WebP an toàn.
 */

export interface WatermarkOptions {
  authorName?: string;
  brandText?: string;
  quality?: number;
}

export async function applyWatermarkAndStripExif(
  file: File,
  options: WatermarkOptions = {}
): Promise<File> {
  const {
    authorName = 'Yêu Trồng Cây',
    brandText = 'yeutrongcay.com',
    quality = 0.88,
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Ảnh không hợp lệ hoặc bị lỗi'));
      img.onload = () => {
        // Tạo canvas để xử lý ảnh (vừa strip EXIF vừa đóng watermark)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Không thể khởi tạo môi trường vẽ 2D'));
        }

        // Kích thước tối đa để tối ưu hiển thị nhanh
        const maxDimension = 1600;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Vẽ ảnh lên canvas (loại bỏ hoàn toàn EXIF gốc)
        ctx.drawImage(img, 0, 0, width, height);

        // Chuẩn bị thông tin Watermark
        const watermarkText = `🌿 ${brandText} • ${authorName}`;
        const fontSize = Math.max(14, Math.round(width * 0.022));
        ctx.font = `600 ${fontSize}px "Plus Jakarta Sans", sans-serif`;

        // Đo chiều dài text để tạo dải nền mờ tinh tế
        const textMetrics = ctx.measureText(watermarkText);
        const paddingX = fontSize * 0.8;
        const paddingY = fontSize * 0.5;
        const bannerWidth = textMetrics.width + paddingX * 2;
        const bannerHeight = fontSize + paddingY * 2;

        const posX = width - bannerWidth - fontSize * 0.8;
        const posY = height - bannerHeight - fontSize * 0.8;

        // Vẽ dải nền tối bán trong suốt bo góc nhẹ
        ctx.fillStyle = 'rgba(15, 46, 30, 0.72)'; // Màu forest đậm nhận diện thương hiệu
        if (typeof ctx.roundRect === 'function') {
          ctx.beginPath();
          ctx.roundRect(posX, posY, bannerWidth, bannerHeight, 8);
          ctx.fill();
        } else {
          ctx.fillRect(posX, posY, bannerWidth, bannerHeight);
        }

        // Viền chỉ mờ
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Vẽ chữ Watermark màu trắng sắc nét
        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'middle';
        ctx.fillText(watermarkText, posX + paddingX, posY + bannerHeight / 2);

        // Xuất file WebP an toàn
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('Không thể xuất tệp ảnh WebP'));
            }
            const cleanFile = new File([blob], `clean_${Date.now()}.webp`, {
              type: 'image/webp',
            });
            resolve(cleanFile);
          },
          'image/webp',
          quality
        );
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
