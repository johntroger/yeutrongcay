# QUY CHUẨN LẬP TRÌNH PHP 8.3 & BẢO MẬT PLESK

1. **Chống SQL Injection**:
   - 100% truy vấn cơ sở dữ liệu BẮT BUỘC dùng PDO Prepared Statements (`$stmt->prepare()` và `$stmt->execute()`).
   - CẤM TUYỆT ĐỐI nối chuỗi biến vào SQL: `$sql = "... WHERE id = " . $id` (VI PHẠM BẢO MẬT).
2. **Khóa hàm nguy hiểm**:
   - Máy chủ Mắt Bão đã khóa `exec`, `system`, `shell_exec`. Code PHP chỉ viết REST API thuần túy, không gọi lệnh terminal.
3. **Xác thực JWT cục bộ**:
   - Giải mã JWT bằng thuật toán HMAC-SHA256 ngay trên bộ nhớ RAM với `SUPABASE_JWT_SECRET`, không gọi request mạng ra ngoài.
