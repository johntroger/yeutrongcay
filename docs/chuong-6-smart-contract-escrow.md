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
