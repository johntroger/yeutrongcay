# Chương 7: Tra Cứu Sổ Cái Trên Multi-Chain Explorer (BaseScan, Etherscan...)

## 7.1. Blockchain Explorer Là Gì?
Blockchain Explorer (Trình khám phá chuỗi khối) là các công cụ tra cứu dữ liệu công khai trên Internet, cho phép bất kỳ ai trên thế giới cũng có thể xem và kiểm chứng mọi giao dịch diễn ra trên sổ cái:
- **Không cần tạo tài khoản, không cần mật khẩu**.
- **Không có vùng cấm**: Toàn bộ dữ liệu giao dịch là bất biến, công khai và minh bạch 100%.

Tùy vào mạng thử nghiệm bạn đang chọn, bạn có thể tra cứu trên các Explorer tương ứng:
- **Base Sepolia**: [sepolia.basescan.org](https://sepolia.basescan.org)
- **Ethereum Sepolia**: [sepolia.etherscan.io](https://sepolia.etherscan.io)
- **BNB Smart Chain Testnet**: [testnet.bscscan.com](https://testnet.bscscan.com)
- **Polygon Amoy**: [amoy.polygonscan.com](https://amoy.polygonscan.com)
- **Arbitrum Sepolia**: [sepolia.arbiscan.io](https://sepolia.arbiscan.io)

---

## 7.2. Hướng Dẫn Đọc Các Thông Số Cốt Lõi Trên Explorer
Khi bạn thực hiện một thao tác trên Yêu Trồng Cây (Đúc hộ chiếu, Gửi hạt giống, Biểu quyết DAO), hệ thống sẽ cung cấp một đường link trực tiếp đến giao dịch của bạn. Dưới đây là các trường thông tin bạn cần nắm rõ:

```text
Transaction Hash: 0x4a9bc12d7890ef123456789abcdef0123456789abcdef0123456789abcdef01
Status:           🟢 Success (Đã ghi thành công vào khối)
Block:            14,289,321 (12 block confirmations)
Timestamp:        1 phút trước (Nov-07-2026 09:15:30 PM +UTC)
From:             0x71C...3a9B (Địa chỉ ví cá nhân của bạn)
To:               Contract 0x82aF...c94D (Địa chỉ Hợp đồng thông minh của Yêu Trồng Cây)
Value:            0 ETH (Giao dịch không chuyển tiền, chỉ gửi dữ liệu)
Transaction Fee:  0.000042 ETH (Phí gas testnet hoàn toàn miễn phí)
```

1. **Transaction Hash (TxHash / Mã băm giao dịch)**:  
   Là mã biên lai duy nhất định danh giao dịch của bạn trên toàn cầu. Không có hai giao dịch nào trùng mã TxHash.
2. **Status (Trạng thái)**:  
   - `Success` (Màu xanh lá): Giao dịch đã được các nút xác nhận và ghi vĩnh viễn vào sổ cái.
   - `Pending` (Màu cam): Giao dịch đang chờ thợ đào hoặc trình xác thực đóng gói.
   - `Failed` (Màu đỏ): Giao dịch bị từ chối (ví dụ do không đủ phí gas testnet).
3. **Block (Số thứ tự khối)**:  
   Vị trí của trang sổ cái chứa giao dịch của bạn. Mỗi khối liên kết chặt chẽ với khối trước đó tạo thành một chuỗi (Chain).
4. **From & To (Người gửi & Điểm đến)**:  
   - `From`: Địa chỉ ví Web3 của bạn.
   - `To`: Địa chỉ hợp đồng thông minh (Smart Contract) xử lý tác vụ tương ứng.

---

## 7.3. Đọc Nhật Ký Sự Kiện (Event Logs) Của Smart Contract
Khi mở tab **"Logs"** của một giao dịch trên Explorer, bạn sẽ nhìn thấy các sự kiện mà Smart Contract phát ra (Emit Events):
- **Sự kiện `Transfer`**: Báo hiệu một Hộ chiếu cây (NFT) vừa được sinh ra và chuyển về địa chỉ ví của bạn.
- **Sự kiện `SeedsStaked`**: Báo hiệu số lượng hạt giống bạn vừa gửi thành công vào kho Staking Vault.
- **Sự kiện `CarbonRetired`**: Báo hiệu một lượng tín chỉ carbon vừa được đốt vĩnh viễn để bảo vệ khí hậu.
- **Sự kiện `VoteCast`**: Ghi nhận một lá phiếu dân chủ vừa được bạn bầu cho đề xuất bảo tồn cây bản địa.

Đây chính là bằng chứng xác thực on-chain không thể chối cãi, loại bỏ hoàn toàn nguy cơ gian lận số liệu trong quản trị nông nghiệp số!
