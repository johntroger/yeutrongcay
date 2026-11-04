# KẾ HOẠCH MVP RÚT GỌN – YÊU TRỒNG CÂY

> Phiên bản rút gọn của [KE_HOACH_XAY_DUNG_YEUTRONGECAY.md](KE_HOACH_XAY_DUNG_YEUTRONGECAY.md). Tài liệu gốc được giữ làm tầm nhìn dài hạn; tài liệu này là **những gì làm trước**.
> Trạng thái: **chưa code**. Các quyết định kỹ thuật chốt sau khi hoàn thành [KIEM_TRA_MOI_TRUONG_PLESK.md](KIEM_TRA_MOI_TRUONG_PLESK.md).

## 1. Mục tiêu MVP

Trả lời một câu hỏi: **sản phẩm có chạy đúng và đủ dùng để hỏi đáp và tra cứu cây thuốc, cây ăn trái không?** Chủ dự án tự trải nghiệm trực tiếp, không phỏng vấn người dùng thử ở giai đoạn này.

- Tiêu chí thành công (đề xuất, chốt lại cùng chủ dự án): chủ dự án hoàn thành trọn bộ kịch bản kiểm thử (đăng ký, tra cứu ≥ 10 loài, đăng câu hỏi có ảnh, trả lời, báo cáo bài, quản trị ẩn bài) không gặp lỗi nghiêm trọng, và ghi nhận danh sách điểm chưa hài lòng.
- **Giới hạn cần biết**: tự trải nghiệm kiểm chứng được chức năng và trải nghiệm sử dụng, nhưng **chưa chứng minh được nhu cầu thị trường** (người khác có chịu dùng và quay lại không). Chủ dự án cần quyết định khi nào và bằng cách nào mời người dùng ngoài, nhất là trước các hạng mục cộng đồng (bản đồ trao đổi, Karma).
- Thời gian dự kiến: 4–6 tuần cho 1–2 người dùng Antigravity (ước lượng sơ bộ, cần xác nhận lại).

## 2. Phạm vi MVP (làm)

| # | Hạng mục | Mô tả ngắn | Ghi chú |
|---|---|---|---|
| M1 | Trang chủ + tra cứu loài | Danh mục loài, tìm kiếm theo tên (tên khoa học là khóa chính, nhiều tên địa phương) | Bắt đầu với **20 loài thảo dược + 10 cây ăn trái**, mở rộng sau |
| M2 | Nội dung cây có người duyệt | Mỗi loài: ảnh, cách trồng, công dụng, **cảnh báo**, disclaimer y tế | **Cần người có chuyên môn duyệt** trước khi đăng |
| M3 | Đăng nhập | Google/Email | Chọn Supabase Auth hay tự làm sau khi có kết quả D1 |
| M4 | Hỏi đáp có ảnh | Đăng câu hỏi, ảnh (tối đa 3), trả lời, tag vùng miền | Chưa có AI, chưa có Karma |
| M5 | Upload ảnh an toàn | Kiểm tra MIME thật, resize, **xóa EXIF/GPS**, đổi tên ngẫu nhiên, cấm chạy script trong thư mục ảnh | Bắt buộc, chi phí thấp, rủi ro cao nếu thiếu |
| M6 | Kiểm duyệt thủ công | Nút báo cáo, quản trị viên ẩn/xóa bài, danh sách từ khóa chặn cơ bản | Chưa tự động hóa |
| M7 | Triển khai | GitHub → Plesk Git, Cloudflare DNS/cache, HTTPS, sao lưu theo khả năng thực tế của Plesk | Phụ thuộc kết quả checklist |
| M8 | Chia sẻ link | Thẻ OpenGraph cho trang loài và câu hỏi | Nếu checklist cho phép; ưu tiên cao vì ảnh hưởng đến lan truyền |

## 3. Nền tảng kỹ thuật đề xuất (chưa chốt)

- Frontend: React + TypeScript + Vite + Tailwind. Nếu Plesk không build được, build bằng GitHub Actions rồi đẩy `dist/`.
- Backend: PHP 8.3 + PDO (prepared statements) + MySQL trên Plesk, hoặc chuyển phần dữ liệu sang Supabase nếu kết quả kiểm tra cho thấy MySQL/PHP quá hạn chế. **Chọn một nguồn dữ liệu chính**, tránh lưu song song hai nơi.
- Quy chuẩn cho Antigravity: thư mục `.gemini/rules/` (kiến trúc, bảo mật, migration, quy tắc dữ liệu cây), `migrations/` đánh số, không sửa DB thủ công.

## 4. Backlog (chưa làm, xếp theo thứ tự)

| Ưu tiên | Hạng mục | Điều kiện để bắt đầu |
|---|---|---|
| P1 | Cây cảnh/Bonsai, Garden Mode Switcher | MVP có người dùng, có nhu cầu thật |
| P1 | Vườn số cá nhân, nhật ký ảnh | Có ≥ 30 người dùng hoạt động |
| P1 | Chỉnh cỡ chữ A-/A+, tối ưu cho người lớn tuổi | Chủ dự án trải nghiệm thấy cần |
| P2 | Gợi ý AI cho câu hỏi cây bệnh | Chọn được nhà cung cấp có gói miễn phí hoặc chi phí chấp nhận được; có cách đánh giá độ chính xác |
| P2 | Bản đồ trao đổi cây (làm mờ vị trí) | Có cộng đồng đủ gần nhau theo khu vực |
| P2 | Watermark, kiểm duyệt tự động, Karma | Có dấu hiệu spam/trộm ảnh thật |
| P3 | Voice search tiếng Việt | Người dùng yêu cầu |
| P3 | Offline draft (IndexedDB) | Có báo cáo mất bài do mạng yếu |
| P3 | Trang giáo dục Web3 + demo mint Testnet đơn giản | Sau khi MVP ổn định |
| P4 | Dynamic NFT, Gasless, Escrow demo | Chỉ nếu Web3 thực sự là điểm thu hút người dùng |
| P4 | Song ngữ Việt–Anh, mở rộng khu vực | Sau khi chứng minh được mô hình tại Việt Nam |

## 5. Việc cần làm trước khi code

| # | Việc | Người làm | Trạng thái |
|---|---|---|---|
| 1 | Hoàn thành checklist Plesk | Chủ dự án | Chờ |
| 2 | Chốt người duyệt nội dung thảo dược | Chủ dự án | Chờ |
| 3 | Chủ dự án tự trải nghiệm MVP theo kịch bản kiểm thử (Antigravity soạn kịch bản khi có lệnh code) | Chủ dự án | Chờ |
| 4 | Chốt nguồn dữ liệu chính (MySQL Plesk hay Supabase) | Antigravity + chủ dự án, sau bước 1 | Chờ |
| 5 | Đối chiếu danh mục loài cấm/xâm hại với văn bản pháp luật chính thức | Chủ dự án hoặc người am hiểu pháp lý | Chờ |
| 6 | Lệnh "code" từ chủ dự án | Chủ dự án | Chờ |

## 6. Rủi ro còn mở

- **Nội dung y học/dược liệu**: không có người duyệt thì không đăng nhóm thảo dược.
- **Cộng đồng nhỏ**: hỏi đáp không có người trả lời sẽ chết. Cần chủ dự án hoặc cộng tác viên chủ động trả lời trong giai đoạn đầu.
- **Giới hạn gói hosting**: các giả định về GD/Imagick, cron, backup chưa kiểm chứng.
- **Nhà cung cấp bên thứ ba** (Supabase, AI, Testnet) có thể đổi chính sách miễn phí.

## 7. Khớp với các milestone sau MVP

MVP phải thỏa **15 móc nối tương thích H1–H15** trong [KE_HOACH_MILESTONES.md](KE_HOACH_MILESTONES.md#2-hợp-đồng-tương-thích-những-thứ-mvp-phải-làm-đúng-ngay-từ-đầu) (cấu trúc dữ liệu, bảng ảnh có hash, vùng miền thay vì GPS, trạng thái kiểm duyệt, feature flag, API có phiên bản...). Đây là điều kiện hoàn thành của MVP, bên cạnh các hạng mục M1–M8.
