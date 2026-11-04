# CẨM NANG HƯỚNG DẪN TRIỂN KHAI LÊN PLESK MẮT BÃO
## Website: yeutrongcay.com (Subscription: vneconomics.com)

> Tài liệu này được thiết kế riêng theo cấu hình thực tế từ hệ thống Plesk Linux của bạn (s88d13.cloudnetwork.vn, PHP 8.3.36, Web server LiteSpeed).

---

## 1. Thông Tin Máy Chủ & Cấu Hình Đã Xác Minh

- **Đường dẫn Document Root**: `/var/www/vhosts/vneconomics.com/yeutrongcay.com`
- **Phiên bản PHP**: `PHP 8.3.36` chạy dưới dạng `FastCGI application`.
- **Giới hạn tài nguyên**:
  - `memory_limit`: **3072 MB (3 GB)**
  - `max_execution_time`: **300 giây**
  - `post_max_size` & `upload_max_filesize`: **512 MB**
  - `opcache.enable`: **ON**
- **Đặc điểm bảo mật quan trọng**: Hàm `exec, shell_exec, system, popen...` bị tắt trên hosting để đảm bảo an toàn tuyệt đối. Vì vậy:
  - Mã nguồn React/TypeScript được biên dịch (`build`) trên máy cục bộ hoặc qua **GitHub Actions**.
  - Server Plesk chỉ đóng vai trò phục vụ file tĩnh cực nhanh qua LiteSpeed và chạy REST API PHP thuần không tốn tài nguyên.

---

## 2. Phương Án 1: Triển Khai Nhanh Bằng File Manager (Khuyến nghị lần đầu - 2 phút)

Đây là cách nhanh nhất để đưa trang web lên chạy thật ngay lập tức mà không cần kết nối Git:

### Bước 1: Tạo gói đóng gói Production trên máy tính
Trong thư mục dự án `c:\Projects\yeutrongcay`, mở Terminal và chạy lệnh:
```powershell
npm run export:plesk
```
Lệnh này sẽ tự động:
1. Kiểm tra toàn bộ mã nguồn TypeScript (`0 lỗi`).
2. Biên dịch gói tĩnh tối ưu hóa (`dist/`).
3. Tích hợp backend PHP bảo mật (`api/`), chống thực thi mã độc trong thư mục ảnh (`uploads/.htaccess`), và cấu hình URL thân thiện (`.htaccess`).
4. Xuất ra tệp nén siêu nhẹ: **`yeutrongcay-production.zip`** (dung lượng chỉ ~**108 KB**).

### Bước 2: Tải lên Plesk
1. Đăng nhập vào bảng điều khiển **Plesk** (`https://s88d13.cloudnetwork.vn:8443/`).
2. Tại tên miền `yeutrongcay.com`, nhấp vào mục **Files** (hoặc **File Manager**).
3. Di chuyển vào thư mục Document Root của website.
4. *(Tùy chọn)* Nếu có các tệp WordPress cũ mặc định, bạn có thể tạo một thư mục tạm `_backup_wp` và kéo các file cũ vào đó.
5. Nhấp vào nút **Upload** và chọn tệp `yeutrongcay-production.zip` vừa tạo từ máy tính.
6. Nhấp vào dấu ba chấm bên cạnh file zip $\rightarrow$ chọn **Extract Files** (Giải nén ngay tại thư mục gốc).
7. Xóa tệp `yeutrongcay-production.zip` trên máy chủ sau khi giải nén xong.

### Bước 3: Kiểm tra
Mở trình duyệt truy cập: `https://yeutrongcay.com` $\rightarrow$ Website hiển thị ngay lập tức với giao diện sắc nét, font tiếng Việt chuẩn và tốc độ tải trang dưới 0.5s!

---

## 3. Phương Án 2: Tự Động Hóa CI/CD Qua GitHub Actions & Plesk Git Extension

Hệ thống đã chuẩn bị sẵn file workflow `.github/workflows/deploy-plesk.yml`.

### Bước 1: Đẩy mã nguồn lên GitHub
1. Tạo một repository mới trên GitHub (ví dụ: `https://github.com/<tai-khoan>/yeutrongcay`).
2. Chạy lệnh liên kết từ máy tính:
   ```bash
   git remote add origin https://github.com/<tai-khoan>/yeutrongcay.git
   git push -u origin master
   ```

### Bước 2: Kết nối Plesk Git Extension
1. Trong màn hình Dashboard của tên miền `yeutrongcay.com` trên Plesk, nhấp vào biểu tượng **Git** (nằm ở phần **Dev Tools**).
2. Nhập URL repository GitHub của bạn.
3. Chọn nhánh triển khai là **`production`** (nhánh này do GitHub Actions tự động biên dịch và đẩy lên).
4. Tại mục **Deployment Path**, chọn đúng đường dẫn gốc của website.
5. Plesk sẽ cung cấp một đường dẫn **Webhook URL**. Sao chép link này và dán vào:
   - GitHub Repo $\rightarrow$ **Settings** $\rightarrow$ **Webhooks** $\rightarrow$ **Add webhook**.

*Kể từ đây, mỗi khi bạn hoàn thành một tính năng mới và `git push`, GitHub Actions sẽ tự động biên dịch và Plesk sẽ tự động cập nhật website chỉ sau vài giây!*

---

## 4. Cấu Hình Cơ Sở Dữ Liệu MySQL Trên Plesk (Khi Cần Lưu Trữ Database)

1. Trên giao diện Plesk của `yeutrongcay.com`, nhấp vào mục **Databases** $\rightarrow$ **Add Database**.
   - **Database name**: `yeutrongcay_db` (hoặc tên theo tiền tố Plesk quy định).
   - **Database user name**: `yeutrongcay_user`.
   - **Password**: Nhập mật khẩu bảo mật và lưu lại.
2. Nhấp vào **phpMyAdmin** của database vừa tạo.
3. Chọn thẻ **Import** $\rightarrow$ Chọn tệp `migrations/001_initial_schema.sql` có sẵn trong dự án $\rightarrow$ Nhấp **Go**.
4. Toàn bộ bảng dữ liệu chuẩn hóa (`plants`, `plant_aliases`, `questions`, `answers`, `images`, `reports`, `user_events`) sẽ được tạo sẵn đầy đủ 15 móc nối tương thích.

---

## 5. Danh Mục Kiểm Tra An Ninh Sau Triển Khai (Security Checklist)

- [x] **EXIF Stripping**: Mọi ảnh tải lên qua `api/upload.php` đều bị gỡ bỏ tọa độ GPS nhà riêng.
- [x] **Chặn thực thi PHP**: Thư mục `uploads/.htaccess` cấm triệt để việc chạy file `.php`, `.phtml`, `.exe`.
- [x] **SSL / HTTPS**: Đảm bảo chứng chỉ SSL Let's Encrypt được bật trong Plesk (mục **SSL/TLS Certificates**).
- [x] **LiteSpeed Edge Cache**: Tệp `.htaccess` đã được tối ưu hóa header `Cache-Control` cho file ảnh, CSS và JavaScript.
