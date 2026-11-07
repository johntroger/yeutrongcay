# Chương 2: Sở Hữu Chiếc Ví Web3 Đầu Tiên & Bảo Mật

## 2.1. Ví Web3 là gì? Khác gì tài khoản ngân hàng truyền thống?
Ví Web3 (như MetaMask, Rabby, Coinbase Wallet) thực chất **không lưu trữ tiền hay cây trồng bên trong ứng dụng**, mà nó là một **phần mềm quản trị chùm chìa khóa mật mã học (Cryptographic Keys)** giúp bạn ký tên điện tử để xác nhận các giao dịch trên sổ cái Blockchain.

| Tiêu chí so sánh | Tài Khoản Ngân Hàng (Web2) | Chiếc Ví Web3 Cá Nhân (Web3) |
|---|---|---|
| **Cơ quan cấp phép** | Ngân hàng duyệt hồ sơ, CMND/CCCD | Bạn tự tạo tức thì trong 30 giây, không cần xin phép |
| **Quyền can thiệp tài sản** | Ngân hàng có thể phong tỏa, đóng băng | Không một ai trên thế giới có thể can thiệp ví của bạn |
| **Tên tài khoản / Địa chỉ** | Số tài khoản ngân hàng (8-14 số) | Địa chỉ công khai duy nhất bắt đầu bằng `0x...` |
| **Cơ chế khôi phục** | Ra quầy giao dịch, gửi SMS OTP | **12 từ tiếng Anh bí mật (Seed Phrase / Secret Recovery Phrase)** |
| **Phí duy trì tài khoản** | Thu phí định kỳ hàng tháng/năm | Hoàn toàn miễn phí trọn đời |

---

## 2.2. Các ứng dụng ví Web3 tương thích với Yêu Trồng Cây
Hệ sinh thái Yêu Trồng Cây tuân thủ tiêu chuẩn quốc tế **EIP-1193**, cho phép bạn thoải mái lựa chọn chiếc ví mình yêu thích nhất:
- 🦊 **MetaMask**: Chiếc ví biểu tượng chú cáo màu cam phổ biến nhất hành tinh, có sẵn trên trình duyệt Chrome, Edge, Brave, Firefox và ứng dụng iOS/Android.
- 🐰 **Rabby Wallet**: Chiếc ví mã nguồn mở thế hệ mới, tối ưu bảo mật và hiển thị rõ ràng thông điệp ký số.
- 🔵 **Coinbase Wallet**: Ví Web3 do sàn giao dịch Coinbase phát triển, giao diện thân thiện với người mới.
- 🦁 **Brave Wallet**: Ví tích hợp sẵn ngay trong trình duyệt bảo mật Brave Browser.
- ⬛ **OKX Wallet**: Ví đa chuỗi hỗ trợ Web3 mạnh mẽ trên máy tính và điện thoại.

---

## 2.3. Hướng dẫn từng bước cài đặt ví MetaMask trên máy tính & điện thoại

### Các bước trên máy tính (Chrome / Edge / Brave):
1. Truy cập trang web chính thức của MetaMask:  
   👉 **[https://metamask.io/download/](https://metamask.io/download/)** *(Lưu ý: Luôn kiểm tra đúng đường link chính chủ để tránh trang giả mạo).*
2. Bấm nút **Install MetaMask for Chrome**. Trình duyệt sẽ mở kho tiện ích mở rộng (Chrome Web Store).
3. Bấm **Thêm vào Chrome (Add to Chrome)** $\rightarrow$ Chọn **Thêm tiện ích**.
4. Biểu tượng chú cáo màu cam sẽ xuất hiện ở góc trên thanh công cụ. Click vào chú cáo để khởi chạy màn hình chào mừng.
5. Chọn **Tạo ví mới (Create a new wallet)** $\rightarrow$ Đặt mật khẩu mở khóa cho máy tính của bạn (tối thiểu 8 ký tự).

---

## 2.4. Ba Quy Tắc Vàng Bảo Mật: 12 Từ Khóa Bí Mật (Seed Phrase)
Sau khi tạo mật khẩu mở khóa, MetaMask sẽ hiển thị **12 từ tiếng Anh ngẫu nhiên**. Đây chính là "chiếc chìa khóa vạn năng" khôi phục ví của bạn trên bất kỳ thiết bị nào.

> [!CAUTION]
> **3 NGUYÊN TẮC BẤT DI BẤT DỊCH VỀ 12 TỪ KHÓA BÍ MẬT:**
> 1. **Dùng bút mực chép lại 12 từ vào cuốn sổ tay riêng:** Cất vào ngăn tủ an toàn. **Tuyệt đối không chụp màn hình**, không lưu vào Google Drive/iCloud, không nhắn qua Zalo/Facebook/Messenger (để phòng tránh mã độc trên điện thoại đánh cắp).
> 2. **Ai nắm giữ 12 từ khóa này là chủ nhân duy nhất của ví:** Bất kỳ ai biết được 12 từ này đều có thể lấy đi toàn bộ tài sản và chứng chỉ cây trồng của bạn.
> 3. **Nhân viên Yêu Trồng Cây KHÔNG BAO GIỜ hỏi 12 từ này:** Bất kỳ ai tự xưng là "Quản trị viên", "Kỹ thuật viên" nhắn tin hỏi 12 từ khóa của bạn đều là kẻ lừa đảo 100%!

---

## 2.5. Chữ Ký Số Cá Nhân (Personal Sign - EIP-191) Là Gì?
Khi bạn thực hiện thao tác **Đúc Hộ Chiếu Thực Vật** hoặc **Giao Lưu Cây Giống**, hệ thống sẽ yêu cầu bạn bấm "Ký số":
* **Không làm lộ khóa riêng tư:** Quá trình ký số sử dụng thuật toán mật mã đường cong elliptic (ECDSA). Trình duyệt gửi thông điệp dạng văn bản (ví dụ: *"Yêu Trồng Cây - Xác nhận đúc Hộ Chiếu cho cây Đinh Lăng"*), ví MetaMask sẽ dùng khóa bí mật bên trong để ký và tạo ra một đoạn mã hash chứng thực (65 bytes).
* **Không tốn tiền, không phát sinh giao dịch tài chính:** Hành động `personal_sign` diễn ra hoàn toàn cục bộ trên máy của bạn, không gửi yêu cầu rút tiền và không tốn bất kỳ khoản phí gas nào.
