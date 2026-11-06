# Chương 6: Smart Contract Escrow - Loại Trừ Lừa Đảo Khi Đổi Cây

## 6.1. Rủi ro khi giao lưu cây giống online
Cộng đồng yêu cây rất thích giao lưu, tặng nhánh giâm cành hoặc đổi hạt giống cho nhau qua mạng. Tuy nhiên thường gặp các vấn đề:
1. Bên gửi cây thì nhiệt tình, bên nhận nhận cây xong thì "im lặng", không gửi lại cây cam kết.
2. Cây gửi qua bưu điện bị gãy dập hoặc nhiễm nấm bệnh rệp sáp lây lan sang cả vườn nhà người nhận.

---

## 6.2. Hợp đồng thông minh Escrow hoạt động ra sao?
Smart Contract đóng vai trò như một **vị trọng tài trung lập không thiên vị ai**:
1. **Bước 1 (Khóa cọc)**: Hai bên dùng ví thật khóa một khoản cọc tượng trưng vào Smart Contract.
2. **Bước 2 (Giao nhận & 7 ngày cách ly)**: Bưu điện giao cây. Hợp đồng tự động kích hoạt đồng hồ đếm ngược **7 ngày cách ly**. Người nhận chăm sóc chậu cây trong khu vực riêng để kiểm tra mầm bệnh rệp sáp.
3. **Bước 3 (Nghiệm thu)**: Sau 7 ngày, nếu cây sống khỏe không sâu bệnh, người nhận bấm *"Nghiệm thu"*. Hợp đồng tự động mở két hoàn trả toàn bộ cọc cho hai bên và thưởng điểm uy tín (Karma) cho người gửi!

---

## 6.3. Toàn bộ cơ chế vận hành 100% trên Mạng Thử Nghiệm (Testnet 0đ)
Để bảo vệ an toàn tài chính tuyệt đối cho cộng đồng người làm vườn:
* Toàn bộ khoản tiền cọc bảo chứng và phí thực thi hợp đồng thông minh được thực hiện bằng **ETH Testnet (Base Sepolia)** được cấp miễn phí từ các vòi Faucet quốc tế.
* Người dùng **hoàn toàn không nạp bất kỳ đồng tiền thật nào**, không có rủi ro mất mát tài chính. Mục tiêu tối thượng là giúp người yêu cây làm chủ thao tác ký số và cơ chế tự động hóa của hợp đồng thông minh một cách an tâm nhất.

---

## 6.4. Cơ chế thưởng Điểm Uy Tín Karma khi giao dịch Testnet thành công
Mặc dù coin thử nghiệm trên Testnet có giá trị tài chính bằng 0đ, nhưng **thời gian học tập và tinh thần trung thực của bạn là có thật**. Do đó, hệ thống Yêu Trồng Cây tích hợp cơ chế thưởng Điểm Karma danh tiếng:
* **Khám phá Faucet lấy ETH Testnet:** Thưởng ngay **+10 Karma**.
* **Đúc Hộ Chiếu Thực Vật Số (Mint Passport) bằng ví thật:** Thưởng ngay **+25 Karma**.
* **Nghiệm thu hoàn tất hợp đồng Escrow giao nhận cây:** Thưởng ngay **+15 Karma**.

Điểm Karma này được cộng dồn trực tiếp vào hồ sơ nhà vườn của bạn trên trang [Khu Vườn Của Tôi](https://yeutrongcay.com/vuon-cua-toi), giúp bạn thăng hạng huy hiệu từ *Người Gieo Mầm* lên *Lão Nông Ban Công* và *Lương Y/Chuyên Gia Bản Địa*, tạo dựng niềm tin vững chắc khi giao lưu cây giống với cộng đồng!
