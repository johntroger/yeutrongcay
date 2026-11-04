# CHECKLIST KIỂM TRA MÔI TRƯỜNG PLESK MẮT BÃO

> Mục đích: xác minh các giả định của kế hoạch trước khi viết code. Người thực hiện: chủ dự án (đăng nhập Plesk của bạn).
> **Không gửi mật khẩu vào chat.** Chỉ cần ghi lại kết quả (có/không, con số) vào cột "Kết quả" rồi gửi cho Antigravity.

## A. Thông tin gói hosting

| # | Cần kiểm tra | Cách xem trong Plesk | Kết quả | Ảnh hưởng đến kế hoạch |
|---|---|---|---|---|
| A1 | Tên gói, dung lượng đĩa, băng thông | Trang chủ Plesk / Dashboard, hoặc thông tin gói từ Mắt Bão | | Quyết định có lưu ảnh người dùng tại Plesk hay không |
| A2 | Giới hạn số file (inode) | Hỏi hỗ trợ Mắt Bão nếu Plesk không hiển thị | | Thư mục ảnh tăng nhanh theo số bài đăng |
| A3 | Giới hạn RAM/CPU, số tiến trình PHP | Hỏi hỗ trợ Mắt Bão | | Xử lý ảnh (resize, xóa EXIF) tốn tài nguyên |
| A4 | Điều khoản về nội dung người dùng đăng tải | Đọc điều khoản dịch vụ Mắt Bão | | Xác định trách nhiệm khi có bài vi phạm (thay cho suy đoán) |

## B. PHP và xử lý ảnh

| # | Cần kiểm tra | Cách xem | Kết quả | Ảnh hưởng |
|---|---|---|---|---|
| B1 | Phiên bản PHP (đã thấy 8.3.36 qua header) | Domain → PHP Settings | 8.3.36 | Đã xác nhận |
| B2 | Có extension **GD** hoặc **Imagick** | Tạo file `phpinfo()` tạm thời, xem xong **xóa ngay** | | Cần để resize, xóa EXIF, đóng watermark |
| B3 | Có `exif`, `fileinfo`, `pdo_mysql`, `openssl`, `curl` | Cùng trang phpinfo | | Kiểm tra MIME, PDO, gọi API ngoài |
| B4 | `upload_max_filesize`, `post_max_size`, `memory_limit`, `max_execution_time` | PHP Settings | | Giới hạn kích thước ảnh upload |
| B5 | `allow_url_fopen` / cURL ra ngoài internet | phpinfo | | Gọi Supabase, dịch vụ AI |

## C. Triển khai và vận hành

| # | Cần kiểm tra | Cách xem | Kết quả | Ảnh hưởng |
|---|---|---|---|---|
| C1 | Có biểu tượng **Git** trên domain | Domain → Git | | Triển khai tự động từ GitHub |
| C2 | Có **Node.js** | Domain → Node.js | | Nếu không có, build phải chạy ở GitHub Actions hoặc máy local |
| C3 | Có **SSH access** | Domain → Hosting & DNS → Web Hosting Access | | Chạy migration, cron script |
| C4 | **Scheduled Tasks (Cron)**: được phép không, tần suất tối thiểu | Domain → Scheduled Tasks | | Sao lưu, ping Supabase, dọn ảnh tạm |
| C5 | **Backup Manager**: có bật, sao lưu đi đâu, có tùy chọn FTP/cloud không | Domain → Backup Manager | | Không giả định đẩy được lên Google Drive/R2 |
| C6 | **Databases**: loại (MySQL/MariaDB), số database tối đa, dung lượng | Domain → Databases | | Lưu bài viết, bình luận |
| C7 | Có **LiteSpeed Cache** / cho phép `.htaccess` | Kiểm tra header đã thấy LiteSpeed; thử rule `.htaccess` đơn giản | | Chặn thực thi PHP trong `/uploads/`, rule OpenGraph |
| C8 | **SSL/HTTPS** đã bật chưa (đã thấy HTTPS hoạt động) | Domain → SSL/TLS | | Bắt buộc |
| C9 | Cloudflare: domain trỏ NS ở đâu hiện nay | Plesk DNS hoặc nơi quản lý domain | | Cần quyền sửa DNS/NS |

## D. Dịch vụ bên thứ ba (kiểm tra khi tạo tài khoản)

| # | Cần kiểm tra | Kết quả |
|---|---|---|
| D1 | Supabase: kiểu ký JWT của dự án mới (HS256 secret hay khóa bất đối xứng) và chính sách gói Free hiện tại (tạm dừng khi không dùng, giới hạn) | |
| D2 | Dịch vụ AI nhận diện/chẩn đoán cây: chọn nhà cung cấp, giá, giới hạn miễn phí | |
| D3 | Testnet và Paymaster dự kiến: còn hỗ trợ và còn miễn phí không | |

## E. Cách làm an toàn với file phpinfo

1. Tạo file tạm `phpinfo.php` trong File Manager với nội dung `<?php phpinfo();`.
2. Mở `https://yeutrongcay.com/phpinfo.php`, chụp phần cần thiết (không chia sẻ công khai).
3. **Xóa file ngay** sau khi xem xong.

## F. Kết quả đã xác nhận (từ ảnh chụp màn hình Plesk, 04/11/2026)

| Mục | Kết quả | Ghi chú |
|---|---|---|
| A1 | Subscription tên `vneconomics.com`, đĩa 6641.2 MB / 18 GB (36%), băng thông tháng 2388.5 MB / không giới hạn | **Dùng chung** với các site khác (vneconomics.com, store.vneconomics.com...); yeutrongcay.com mới dùng 3.6 MB |
| B1 | PHP 8.3.36 (chạy dạng FastCGI application) | Đã xác nhận qua ảnh PHP Settings |
| B4 | `memory_limit`: **3072M (3GB)**, `upload_max_filesize`: **512M**, `post_max_size`: **512M**, `max_execution_time`: **300s** | Cấu hình cực kỳ hào phóng (RAM 3GB, timeout 5 phút) |
| Cấu hình | Thư mục web `{DOCROOT}`: `/var/www/vhosts/vneconomics.com/yeutrongcay.com` | Nằm riêng biệt trong thư mục con của subscription |
| OPcache | `opcache.enable`: **on** | Tối ưu biên dịch mã PHP cực nhanh |
| Bảo mật | `disable_functions`: chặn triệt để `system, exec, shell_exec, popen, proc_*...` | **Bảo mật rất tốt**: Kẻ xấu nếu chèn được file cũng không thể chạy lệnh shell hệ điều hành; đồng thời xác nhận PHP không thể tự chạy lệnh `git/npm` từ web script |
| C1 | **Git**: CÓ SẴN (biểu tượng Git đỏ trong Dev Tools) | Hỗ trợ kéo code tự động từ GitHub qua Webhook |
| C2 | **Node.js**: KHÔNG CÓ trong danh sách Dev Tools | Xác nhận: KHÔNG chạy Node.js server trên hosting; toàn bộ code React/Vite sẽ build ra file tĩnh đẩy vào thư mục web |
| C3 | **SSH Terminal**: CÓ SẴN (biểu tượng SSH Terminal trong Dev Tools) | Cực kỳ thuận lợi: có thể chạy lệnh terminal, quản lý file nâng cao trực tiếp trên Plesk |
| C4 | **Scheduled Tasks (Cron)**: CÓ SẴN trong Dev Tools | Sẵn sàng cấu hình tác vụ định kỳ tự động |
| C5 | **Backup & Restore**: CÓ SẴN trong Files & Databases | Sẵn sàng cấu hình sao lưu dữ liệu |
| C6 | **PHP Composer**: CÓ SẴN trong Dev Tools | Có thể cài đặt và quản lý package PHP nếu cần |
| Bảo mật | **Imunify** & **Web Application Firewall (WAF)**: CÓ SẴN | Tường lửa WAF và hệ thống quét mã độc tự động Imunify của Mắt Bão đang bảo vệ server |
| C8 | SSL **Let's Encrypt** đang bật | |
| Khác | WordPress đang cài (WP Toolkit, WP-CLI, Clone, Check Integrity); chạy **chung system user** trong subscription (ảnh cho thấy system user của yeutrongcay.com, cần xác nhận các domain khác có cùng user không) | Xem rủi ro bên dưới |
| Khác | WP Toolkit cảnh báo đỏ **"Apply critical security measures"**; Vulnerability Protection và Hotlink protection đang tắt | Xử lý hoặc gỡ WordPress trước khi dựa vào site này |

**Chưa xác nhận (cần chụp thêm)**: C1 Git, C2 Node.js, C3 SSH, B2–B5 (GD/Imagick/exif, memory_limit, upload_max_filesize...), A2–A4, C7, C9, D1–D3.

**Hệ quả cần quyết định**
1. **WordPress hiện đang chiếm thư mục gốc của site.** Triển khai React/PHP vào cùng thư mục sẽ ghi đè hoặc xung đột. Cần chọn: gỡ WordPress (sao lưu trước), hoặc triển khai app ở thư mục/subdomain khác.
2. **Có thể dùng chung tài khoản hệ thống với các site khác trong subscription.** Lỗi upload ở yeutrongcay.com có thể ảnh hưởng các site còn lại, nên upload an toàn là bắt buộc; nên cân nhắc tách subscription riêng nếu Mắt Bão cho phép.
3. **Ảnh người dùng sẽ ăn vào chung 18 GB** với các site khác; cần hạn mức hoặc lưu ảnh nơi khác.

## G. Sau khi có đủ kết quả

Gửi lại cho Antigravity các cột "Kết quả" còn thiếu. Từ đó sẽ chốt:
- Lưu ảnh ở Plesk hay chuyển sang Cloudflare R2.
- Xác thực dùng JWT cục bộ hay gọi API Supabase.
- Backup bằng Plesk hay bằng script + dịch vụ ngoài.
- Có cần GitHub Actions để build hay build trên Plesk.
- Gỡ hay giữ WordPress, và triển khai vào đâu.
