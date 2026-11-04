# QUY CHUẨN DATABASE MIGRATIONS CHO ANTIGRAVITY AI AGENTS

1. **Cấm sửa thủ công**: Cấm đăng nhập phpMyAdmin trên Plesk để tạo hoặc sửa cột bảng thủ công.
2. **Quy tắc Migration**:
   - Mọi thay đổi cấu trúc bảng BẮT BUỘC phải tạo file SQL có đánh số phiên bản trong thư mục `migrations/` (ví dụ: `002_add_field_xyz.sql`).
   - Mọi file migration phải tự động ghi vết vào bảng `migrations_history`.
