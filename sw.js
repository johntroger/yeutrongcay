// SERVICE WORKER - YÊU TRỒNG CÂY (PWA OFFLINE-FIRST)
// Hoạt động 100% độc lập, không phụ thuộc dịch vụ ngoài, 0đ chi phí máy chủ

const CACHE_NAME = 'ytc-offline-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/logo.jpg',
  '/manifest.json'
];

// 1. Cài đặt Service Worker và lưu cache nền tảng
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Kích hoạt và dọn dẹp cache cũ
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Xử lý yêu cầu mạng (Network First cho API/HTML; Cache First cho JS/CSS/Ảnh)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Không can thiệp các request không phải GET hoặc chrome-extension
  if (event.request.method !== 'GET' || url.protocol.startsWith('chrome-extension')) {
    return;
  }

  // Tài nguyên tĩnh (JS, CSS, Font, WebP, JPG, PNG): Cache First, fallback Network
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.match(/\.(js|css|webp|jpg|jpeg|png|svg|woff2)$/)
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Điều hướng HTML và dữ liệu thực vật API: Network First, fallback Cache khi mất mạng
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Mất mạng: Trả về trang lưu cache hoặc fallback index.html
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/');
          }
          return new Response('Offline: Dữ liệu đang ở chế độ ngoại tuyến.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        });
      })
  );
});
