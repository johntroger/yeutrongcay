# Chương 5: Hộ Chiếu Thực Vật Số (Digital Plant Passport) & Dynamic NFT

## 5.1. Căn cước công dân số cho chậu cây là gì?
Khi bạn nuôi một chú cún cưng có phả hệ, bạn có sổ tiêm chủng và giấy chứng nhận giống thuần chủng. Hộ chiếu cây trồng số của Yêu Trồng Cây mang sứ mệnh tương tự:
- Định danh duy nhất từng chậu cây bằng một **Token ID**.
- Ghi nhận chủ sở hữu thông qua địa chỉ ví công khai của bạn.
- Bất biến: Không ai có thể tráo đổi cây hoặc làm giả nguồn gốc giống.

---

## 5.2. Hàm băm SHA-256: Dấu vân tay kỹ thuật số
Hàm băm SHA-256 là một thuật toán toán học biến toàn bộ dữ liệu của chậu cây (Tên khoa học + Ngày trồng + Giai đoạn lớn + Địa chỉ ví) thành một chuỗi 64 ký tự duy nhất:  
`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- Nếu bất kỳ ai cố tình sửa một chữ cái trong ngày trồng, toàn bộ chuỗi mã băm sẽ bị biến đổi hoàn toàn $\rightarrow$ Gian lận bị phát hiện ngay lập tức!

---

## 5.3. Thao tác Ký số mật mã học bằng ví thật diễn ra thế nào?
1. Tại tab **3. Ký Số & Đúc Hộ Chiếu Cây**, bạn chọn một giống cây (ví dụ: *Đinh Lăng Nếp Lá Nhỏ 3 Năm Tuổi*).
2. Chọn giai đoạn sinh trưởng (Mầm non / Sinh trưởng / Đơm hoa).
3. Bấm **"Ký Số Ví Thật & Đúc Hộ Chiếu (0đ Gas)"**:
   - Trình duyệt sẽ bật lên cửa sổ MetaMask thật.
   - MetaMask hiển thị thông điệp ký xác nhận: *"Yêu Trồng Cây - Đúc Hộ Chiếu Thực Vật Số..."*.
   - Bạn bấm nút **Sign (Ký)**.
   - Khóa cá nhân của bạn sẽ tạo ra một chữ ký số 65-byte hợp lệ. Bạn chính thức là người bảo chứng cho chậu cây này!

---

## 5.4. Dynamic NFT: Cập nhật cây lớn lên theo thời gian
Khác với NFT ảnh tĩnh mua bán thông thường, Hộ chiếu thực vật của Yêu Trồng Cây là **Dynamic NFT (NFT Động)**:
- Khi cây còn là cành giâm: Hộ chiếu ở **Giai đoạn 1**.
- Sau 6 tháng phân cành tốt lá: Chủ vườn chụp ảnh cập nhật lên **Giai đoạn 2**.
- Sau 2 năm cây ra hoa kết trái: Cập nhật lên **Giai đoạn 3**.
Token ID vẫn giữ nguyên nhưng dữ liệu phả hệ của cây ngày càng dày dặn và có giá trị cao hơn.
