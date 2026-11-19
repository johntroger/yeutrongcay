---
name: plesk-git-sync
description: >-
  Đồng bộ mã nguồn đã build (Vite SPA + PHP API + cấu hình bảo mật) lên nhánh
  `production` để Plesk Git Extension tự động cập nhật website `yeutrongcay.com`.
  Sử dụng skill này khi người dùng yêu cầu deploy, đẩy code lên host/Plesk,
  đồng bộ nhánh `production`, hoặc ngay sau khi hoàn tất push `master` và muốn
  đồng bộ trực tiếp lên server Plesk.
---

# Quy Trình Tự Đồng Bộ Git Qua Plesk (`yeutrongcay.com`)

## Bối cảnh hạ tầng
- Hosting Plesk Mắt Bão **không có Node.js**, chỉ chạy PHP 8.3 + file tĩnh tại `{DOCROOT}`.
- Plesk Git Extension theo dõi nhánh **`production`** trên GitHub (`https://github.com/johntroger/yeutrongcay.git`), không kéo trực tiếp từ nhánh `master`.
- Hai kênh đồng bộ lên `production`:
  1. **Tự động trên GitHub Actions:** `.github/workflows/deploy-plesk.yml` tự chạy mỗi khi push lên `master`/`main` (và gọi `PLESK_GIT_WEBHOOK_URL` nếu đã cấu hình secret).
  2. **Đồng bộ chủ động từ máy local (nhanh & chắc chắn):** Chạy `scripts/sync-plesk-git.ps1`.

## Các bước thực hiện
1. Đảm bảo mọi thay đổi trên `master` đã được commit và push (`git status` sạch).
2. Chạy script đồng bộ PowerShell:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\scripts\sync-plesk-git.ps1
   ```
   Script sẽ lần lượt chạy `npm run typecheck`, `npm test`, `npm run build`, đóng gói `api/`, `migrations/`, `.htaccess`, chặn PHP trong `uploads/`, và force-push toàn bộ nội dung `dist/` lên `origin/production`.
3. Kiểm tra lại trạng thái nhánh `production` trên remote:
   ```powershell
   git ls-remote origin refs/heads/production
   ```
4. **Dọn dẹp sau deploy (tuân thủ `storage-cleanup.md`):**
   - `sync-plesk-git.ps1` tự xóa `dist/`, nhưng có tạo thêm `yeutrongcay-production.zip`.
   - Nếu không cần giữ file zip dự phòng để upload thủ công qua Plesk File Manager, xóa ngay:
     ```powershell
     Remove-Item -Force .\yeutrongcay-production.zip -ErrorAction SilentlyContinue
     ```
5. Nhắc người dùng kiểm tra nếu Plesk chưa bật Webhook tự động kéo (khi đó chỉ cần bấm **Pull Updates** trong *Plesk → Git* hoặc kiểm tra tab *Actions* trên GitHub).
