# QUY CHUẨN AN NINH MẠNG VÀ BẢO VỆ DỮ LIỆU

1. **Tẩy sạch siêu dữ liệu EXIF GPS trong ảnh chụp**:
   - Mọi ảnh người dùng tải lên BẮT BUỘC phải được xóa sạch tọa độ GPS vệ tinh trước khi lưu vào đĩa cứng.
2. **Khóa thư mục upload**:
   - Thư mục `uploads/` bắt buộc phải có file `.htaccess` cấm thực thi mọi file script (`.php`, `.phtml`, `.cgi`...).
3. **Bảo vệ Secret & Khóa bí mật**:
   - Tuyệt đối không commit file `.env` lên GitHub. Luôn giữ `.env` trong `.gitignore`.
