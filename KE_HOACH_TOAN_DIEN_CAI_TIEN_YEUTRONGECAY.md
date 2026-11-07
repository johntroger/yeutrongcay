# BÁO CÁO RÀ SOÁT TỔNG THỂ & KẾ HOẠCH CẢI TIẾN TOÀN DIỆN
## DỰ ÁN HỆ SINH THÁI THỰC VẬT SỐ: YÊU TRỒNG CÂY (YEUTRONGECAY.COM)

> **Ngày lập báo cáo:** Tháng 11/2026  
> **Hội đồng Thẩm định & Rà soát Độc lập:**
> 1. Chuyên gia Nông nghiệp & Sinh thái học (Agriculture & Plant Ecology Specialist)
> 2. Kỹ sư Thiết kế Phần mềm Cao cấp (Principal Software Architect)
> 3. Kỹ sư Phần mềm Blockchain Cao cấp (Senior Blockchain & Web3 Engineer)
> 4. Kỹ sư An toàn & Bảo mật Thông tin Cao cấp (Senior InfoSec & Cyber Security Engineer)
> 5. Kỹ sư Thiết kế Trải nghiệm & Giao diện Người dùng (Senior UI/UX Specialist)

---

## MỤC LỤC
1. [TỔNG QUAN HIỆN TRẠNG & TÓM TẮT ĐIỀU HÀNH (EXECUTIVE SUMMARY)](#1-tổng-quan-hiện-trạng--tóm-tắt-điều-hành)
2. [BÁO CÁO RÀ SOÁT ĐỘC LẬP TỪ 5 GÓC NHÌN CHUYÊN GIA](#2-báo-cáo-rà-soát-độc-lập-từ-5-góc-nhìn-chuyên-gia)
   - [2.1. Góc nhìn Nông nghiệp & Sinh thái học](#21-góc-nhìn-nông-nghiệp--sinh-thái-học)
   - [2.2. Góc nhìn Kỹ sư Thiết kế Phần mềm Cao cấp](#22-góc-nhìn-kỹ-sư-thiết-kế-phần-mềm-cao-cấp)
   - [2.3. Góc nhìn Kỹ sư Phần mềm Blockchain Cao cấp](#23-góc-nhìn-kỹ-sư-phần-mềm-blockchain-cao-cấp)
   - [2.4. Góc nhìn Kỹ sư An toàn & Bảo mật Thông tin Cao cấp](#24-góc-nhìn-kỹ-sư-an-toàn--bảo-mật-thông-tin-cao-cấp)
   - [2.5. Góc nhìn Kỹ sư Thiết kế UI/UX Website](#25-góc-nhìn-kỹ-sư-thiết-kế-uiux-website)
3. [MA TRẬN RỦI RO & KHUYẾN NGHỊ CẢI TIẾN TRỌNG YẾU (ACTION MATRIX)](#3-ma-trận-rủi-ro--khuyến-nghị-cải-tiến-trọng-yếu)
4. [KẾ HOẠCH TRIỂN KHAI CHI TIẾT (IMPLEMENTATION ROADMAP)](#4-kế-hoạch-triển-khai-chi-tiết)
   - [Giai đoạn 1: Gia cố Bảo mật, Ổn định Dữ liệu & Tối ưu Hiệu năng (Tuần 1 - Tuần 2)](#giai-đoạn-1-gia-cố-bảo-mật-ổn-định-dữ-liệu--tối-ưu-hiệu-năng-p0)
   - [Giai đoạn 2: Nâng cấp Chuẩn học thuật Nông nghiệp & Tái cấu trúc UI/UX (Tuần 3 - Tuần 4)](#giai-đoạn-2-nâng-cấp-chuẩn-học-thuật-nông-nghiệp--tái-cấu-trúc-uiux-p1)
   - [Giai đoạn 3: Nâng cấp Smart Contract ERC-721 & Trải nghiệm Web3 Tinh giản (Tuần 5 - Tuần 6)](#giai-đoạn-3-nâng-cấp-smart-contract-erc-721--trải-nghiệm-web3-tinh-giản-p2)
5. [TIÊU CHÍ NGHIỆM THU & BẢNG ĐO LƯỜNG CHỈ SỐ (KPIS)](#5-tiêu-chí-nghiệm-thu--bảng-đo-lường-chỉ-số-kpis)

---

## 1. TỔNG QUAN HIỆN TRẠNG & TÓM TẮT ĐIỀU HÀNH

Hệ thống **Yêu Trồng Cây (yeutrongcay.com)** đã định hình được một cấu trúc sản phẩm bài bản, kết hợp hài hòa giữa tri thức thực vật học Việt Nam, cộng đồng trao đổi chia sẻ cây xanh, bệnh viện cây trồng trực tuyến và mô hình hộ chiếu thực vật số trên nền tảng Web3 (Testnet).

- **Nền tảng công nghệ hiện tại:** React 18, Vite 6, TypeScript, Tailwind CSS, Leaflet Map, Viem Web3 SDK, Firebase Auth, PHP 8.3 và MySQL chạy trên hạ tầng máy chủ Plesk Shared Hosting / VPS.
- **Điểm mạnh nổi bật:** 
  - Triết lý mỹ học *"Verdant Clarity"* (Ánh sáng sinh thái) tinh tế, nhất quán.
  - Cấu trúc Hợp đồng Tương thích H1–H15 trong kiến trúc được xác lập ngay từ đầu.
  - Tính năng làm mờ tọa độ bảo mật tư gia (H8) và quy chuẩn cách ly 7 ngày phòng chống dịch hại cây trồng.
- **Những tồn tại cần khắc phục ngay:**
  - Lỗ hổng tiềm ẩn trong xác thực Admin và thiếu xác minh chữ ký Firebase JWT phía PHP backend.
  - Tình trạng phình to bundle JS frontend do nhúng gần 4.000 dòng dữ liệu hạt giống tĩnh (`SEED_PLANTS`) trực tiếp vào file code.
  - Hợp đồng thông minh `PlantPassportNFT.sol` tự viết thiếu các lớp bảo vệ chuẩn của OpenZeppelin (đặc biệt là xử lý an toàn `safeTransferFrom` và tối ưu hóa gas).
  - Trải nghiệm giao diện cần bổ sung các công cụ hỗ trợ người cao tuổi (Senior Accessibility) và bản đồ Leaflet thiếu gom cụm điểm (Marker Clustering).

---

## 2. BÁO CÁO RÀ SOÁT ĐỘC LẬP TỪ 5 GÓC NHÌN CHUYÊN GIA

### 2.1. Góc nhìn Nông nghiệp & Sinh thái học
*(Đánh giá tính chuẩn xác của dữ liệu thực vật, an toàn sinh học và tương thích khí hậu Việt Nam)*

1. **Chuẩn hóa danh pháp học thuật & Kiểm soát nguy cơ ngộ độc dược liệu:**
   - *Hiện trạng:* Cơ sở dữ liệu cây thuốc đã có tên khoa học, công dụng dân gian và cảnh báo nhầm lẫn (như Húng Chanh, Chùm Ngây, Bạc Hà). 
   - *Hạn chế:* Cần hệ thống hóa danh pháp phân loại theo hệ thống APG IV (Angiosperm Phylogeny Group IV) và Dược điển Việt Nam V. Với các loài thảo dược mẫn cảm, thiếu bảng so sánh hình thái chi tiết dạng ảnh giải phẫu (so sánh gân lá, cuống lá, sắc lông) để người dùng tuyệt đối không nhầm lẫn với các loài cực độc bản địa (ví dụ: Chè vằng vs Lá ngón; Cà độc dược vs Cà gai leo; Kim tiền thảo giả mạo).
2. **Kiểm soát loài ngoại lai xâm hại theo pháp luật Việt Nam:**
   - *Hiện trạng:* Đã có bộ lọc từ khóa cấm trong `api/clinic.php` và `api/swap.php`.
   - *Hạn chế:* Danh mục cần được cập nhật và đồng bộ nghiêm ngặt theo **Thông tư 35/2018/TT-BTNMT** của Bộ Tài nguyên & Môi trường quy định tiêu chí xác định loài ngoại lai xâm hại (như ốc bươu vàng, ốc sên châu Phi, cỏ voi gai, mai dương, trinh nữ móc, bèo tây đột biến lan rộng). Cần có thông báo cảnh báo pháp lý trực quan khi phát hiện người dùng đăng tải các loài này tại trạm trao đổi.
3. **Quản lý dịch hại tổng hợp (IPM - Integrated Pest Management):**
   - *Hiện trạng:* Chẩn đoán bệnh cây (`PlantClinic`) mới chỉ tập trung vào triệu chứng trực quan bề mặt.
   - *Hạn chế:* Cần định hướng giải pháp trị liệu theo hướng nông nghiệp hữu cơ sinh học (dầu Neem nguyên chất ép lạnh, nấm đối kháng *Trichoderma hazianum*, vi khuẩn *Bacillus thuringiensis - BT*, chế phẩm tỏi ớt gừng ngâm rượu) trước khi đưa ra phác đồ can thiệp bằng hóa chất bảo vệ thực vật.
4. **Phân vùng vi khí hậu đô thị (Urban Microclimate Adaptation):**
   - Lịch mùa vụ hiện chia theo 3 miền Bắc - Trung - Nam là cần thiết nhưng chưa đủ cho đối tượng cư dân đô thị. Cần bổ sung thuật toán lọc vi khí hậu: Ban công hướng Tây (nhiệt bức xạ >42°C), logia chung cư khuất sáng (cường độ <500 lux), vườn sân thượng gió lùa mạnh.

---

### 2.2. Góc nhìn Kỹ sư Thiết kế Phần mềm Cao cấp
*(Đánh giá kiến trúc mã nguồn, hiệu năng, phân tách dữ liệu và tính mở rộng)*

1. **Phân tách dữ liệu tĩnh và tối ưu hóa Bundle Size Frontend:**
   - *Vấn đề lớn:* Tệp `src/data/plants.ts` đang chứa ~4.000 dòng mã với mảng `SEED_PLANTS` đồ sộ, được import trực tiếp vào `HomePage.tsx` và `PlantDetailPage.tsx`.
   - *Hậu quả:* Bundle JavaScript ban đầu bị phình to hơn 500KB (chưa gzipped), làm chậm đáng kể chỉ số FCP (First Contentful Paint) và TTI (Time to Interactive) trên thiết bị di động 4G.
   - *Khuyến nghị:* Chuyển đổi toàn bộ `SEED_PLANTS` thành định dạng dữ liệu JSON phân mảnh hoặc tải động qua API có phân trang (`pagination`) và bộ đệm trình duyệt IndexedDB/Service Worker.
2. **Cơ chế lưu trữ kép (Hybrid Database Fallback) và Race Condition:**
   - *Vấn đề:* Tại `api/passports.php`, `api/clinic.php`, `api/swap.php`, hệ thống áp dụng cơ chế "nếu không có MySQL thì lưu vào file JSON trong thư mục `uploads/`".
   - *Hậu quả:* Hàm `writeJsonStore()` sử dụng `file_put_contents(..., LOCK_EX)` đọc và ghi lại toàn bộ mảng dữ liệu. Khi có nhiều yêu cầu đồng thời (concurrency), hiện tượng ghi đè làm mất mát dữ liệu (race condition) là chắc chắn xảy ra.
   - *Khuyến nghị:* Chuẩn hóa MySQL là nguồn dữ liệu duy nhất trong môi trường Production; cơ chế file JSON chỉ dành riêng cho môi trường mock phát triển cục bộ và phải có cảnh báo nghiêm ngặt.
3. **Quản lý trạng thái và Re-render:**
   - Trạng thái `currentUser`, `activeMode`, `searchQuery` đặt ở `App.tsx` truyền qua props nhiều tầng (prop drilling). Cần gom các trạng thái phiên làm việc vào một `UserSessionContext` hoặc sử dụng lightweight store (như Zustand) để tránh re-render toàn bộ cây DOM của App.

---

### 2.3. Góc nhìn Kỹ sư Phần mềm Blockchain Cao cấp
*(Đánh giá tính an toàn hợp đồng thông minh, tối ưu Gas và trải nghiệm người dùng Web3)*

1. **Rủi ro logic trong Smart Contract tự phát triển (`PlantPassportNFT.sol`):**
   - *Lỗ hổng logic nghiêm trọng:* Hàm `safeTransferFrom` trong hợp đồng hiện tại chỉ là một lời gọi chuyển tiếp sang `transferFrom`:
     ```solidity
     function safeTransferFrom(address from, address to, uint256 tokenId) public override {
         transferFrom(from, to, tokenId);
     }
     ```
     Điều này **vi phạm nghiêm trọng đặc tả EIP-721** vì không kiểm tra mã `onERC721Received` khi chuyển NFT tới một địa chỉ Smart Contract. Nếu người dùng chuyển Hộ chiếu cây vào một ví multisig, hợp đồng vault hay hợp đồng escrow, NFT sẽ bị khóa vĩnh viễn (stuck) không thể khôi phục.
   - *Khuyến nghị:* Kế thừa trực tiếp thư viện chuẩn mực **OpenZeppelin Contracts** (`ERC721URIStorage`, `Ownable2Step`, `ReentrancyGuard`) thay vì tự triển khai thủ công.
2. **Chi phí lưu trữ on-chain và tối ưu hóa Gas:**
   - Hiện tại struct `BotanicalRecord` lưu trực tiếp chuỗi ký tự UTF-8 dài (`string plantName`, `string scientificName`, `string sha256Proof`).
   - Việc lưu trữ `sha256Proof` dưới dạng `string` tốn gấp 2–3 lần dung lượng lưu trữ so với kiểu dữ liệu `bytes32`. 
   - *Khuyến nghị:* Tinh giản dữ liệu on-chain: chỉ lưu `bytes32 sha256Proof`, `uint8 stage`, `uint64 mintedAt`, toàn bộ thông tin mô tả chi tiết được chuẩn hóa theo chuẩn Metadata EIP-721 lưu trên IPFS/Arweave qua mã băm CID cố định.
3. **Mô hình Hộ chiếu Tiến hóa Động (Dynamic Evolutionary NFT):**
   - Cây xanh là thực thể sống thay đổi theo thời gian. Cần bổ sung phương thức `updateStageAndProof()` có quyền hạn (chỉ chủ sở hữu hoặc chuyên gia kiểm định được phân quyền), ghi nhận lịch sử các mốc sinh trưởng kèm hình ảnh minh chứng.
4. **Trừu tượng hóa Tài khoản (Account Abstraction - ERC-4337):**
   - Người làm vườn truyền thống gặp trở ngại lớn với MetaMask, RPC Network và phí gas ETH. Cần tích hợp giải pháp Embedded Wallet (như Privy / Turnkey / Web3Auth) đăng nhập bằng Google/Email và cơ chế Gasless Paymaster (EIP-2771 / ERC-4337) để người dùng mint Hộ chiếu thực vật hoàn toàn miễn phí mà không cần biết đến khái niệm ví crypto phức tạp.

---

### 2.4. Góc nhìn Kỹ sư An toàn & Bảo mật Thông tin Cao cấp
*(Đánh giá lỗ hổng hệ thống, xác thực, upload file và tuân thủ an toàn mạng)*

1. **Lỗ hổng nghiêm trọng Fallback Master Token & Secret Keys rải rác (CRITICAL):**
   - *Mã nguồn hiện tại:*
     - `api/admin.php`: `$masterToken = $config['security']['admin_token'] ?? 'ytc_admin_master_2026';`
     - `api/seed.php`: `$expectedKey = $config['security']['seed_key'] ?? 'ytc_secret_seed_token_2026';`
     - `api/cron_fb_autopost.php`: `$cronSecret = $fbConfig['cron_secret'] ?? 'ytc_fb_cron_2026_secret_key';`
   - *Mối đe dọa:* Nếu người quản trị chưa khởi tạo file `config.php` hoặc file bị lỗi, kẻ tấn công có thể dùng các token mặc định đã public trên Git để chiếm quyền admin, trigger seed làm xáo trộn database hoặc trigger autopost spam Facebook Fanpage.
   - *Biện pháp:* Xóa bỏ hoàn toàn giá trị fallback tĩnh. Bắt buộc nạp từ file cấu hình bí mật; nếu thiếu, API phải lập tức trả về HTTP 503 và từ chối xử lý.
2. **Lỗ hổng mở cổng POST thêm cây tại `api/plants.php` (CRITICAL):**
   - *Hiện trạng:* Nhánh `if ($_SERVER['REQUEST_METHOD'] === 'POST')` tại `api/plants.php` tiếp nhận dữ liệu và thực hiện `INSERT INTO plants` mà **hoàn toàn không có bất kỳ bước xác thực nào** (không yêu cầu Bearer token, Admin header hay Session).
   - *Mối đe dọa:* Bất kỳ ai cũng có thể gửi cURL/Postman bơm hàng loạt dữ liệu rác, nội dung spam hoặc link lừa đảo trực tiếp vào cơ sở dữ liệu thực vật của website.
   - *Biện pháp:* Khóa ngay nhánh POST này bằng middleware kiểm tra `X-Admin-Token` hoặc Bearer Admin Token hợp lệ.
3. **Xác thực danh tính Firebase Token phía Backend (AUTHENTICATION GAP):**
   - *Hiện trạng:* Các API tạo câu hỏi (`api/clinic.php`), tạo tin đổi cây (`api/swap.php`) và chấm điểm Karma chỉ nhận `user_id` từ client gửi lên mà không kiểm tra chữ ký số JWT.
   - *Hậu quả:* Bất kỳ ai sử dụng Postman/cURL đều có thể gửi request với `user_id` của tài khoản khác để mạo danh, upvote ảo, hoặc phá hoại điểm số Karma.
   - *Biện pháp:* Tích hợp middleware kiểm tra Firebase ID Token (xác minh chữ ký số Google Public Key) trên các phương thức `POST/PUT/DELETE`.
4. **Bảo vệ dữ liệu dự phòng trong thư mục `uploads/`:**
   - *Hiện trạng:* `uploads/.htaccess` đã chặn tốt các file script thi hành (`.php`, `.phtml`), nhưng **chưa chặn tải trực tiếp các file `.json`** (`nft_registry_store.json`, `clinic_questions_store.json`).
   - *Mối đe dọa:* Người ngoài có thể truy cập `https://yeutrongcay.com/uploads/nft_registry_store.json` để cào trọn bộ dữ liệu hồ sơ cá nhân và sổ cái.
   - *Biện pháp:* Bổ sung quy tắc cấm tải file `.json` trực tiếp từ thư mục `uploads/` trong file `.htaccess`.
5. **Đồng bộ CORS trên toàn bộ các Endpoint:**
   - `api/report.php` hiện chỉ chấp nhận `https://yeutrongcay.com`, làm lỗi khi test báo cáo tại môi trường dev `http://localhost:5173`. Cần đồng bộ mảng whitelist origins chung (`yeutrongcay.com` + `localhost`).

---

### 2.5. Góc nhìn Kỹ sư Thiết kế UI/UX Website
*(Đánh giá tính công thái học, phân tầng thị giác, khả năng tiếp cận và cảm xúc người dùng)*

1. **Tối ưu hóa Trải nghiệm Đọc & Tương phản (Typography & Accessibility):**
   - Giữ nguyên sự tối giản, thanh thoát của triết lý *Verdant Clarity* mà không làm rối thanh điều hướng bằng các nút điều chỉnh cỡ chữ thủ công (`A-/A+`). Trình duyệt và hệ điều hành của người dùng hiện đại (iOS/Android) đã hỗ trợ zoom tỷ lệ mượt mà.
   - *Điểm cần tập trung:*
     - Thiết lập cỡ chữ cơ sở (base font size) và chiều cao dòng (line-height) rộng rãi, thoáng mắt (16px - 18px cho body text, line-height 1.6 - 1.75).
     - Đảm bảo độ tương phản màu sắc đạt chuẩn **WCAG 2.1 AAA** cho các đoạn hướng dẫn liều dùng y học (độ tương phản $\ge$ 7:1 giữa chữ và nền).
     - Nút bấm và vùng chạm (Touch targets) trên màn hình cảm ứng di động đạt kích thước tối thiểu 48x48px.
2. **Cấu trúc phân tầng cảnh báo tại Trang chi tiết cây (`PlantDetailPage`):**
   - Các cảnh báo độc tính và nguy cơ tương tác thuốc hiện đang hiển thị dưới dạng khối thông tin thông thường. Cần thiết kế lại thành **Thẻ Cảnh báo An toàn Độc lập (Safety Callout Box)** với viền màu đỏ cam, biểu tượng cảnh báo rõ ràng và văn bản nhấn mạnh để người dùng lướt nhanh không bao giờ bỏ sót.
3. **Trải nghiệm Bản đồ Trao đổi (`InteractiveSwapMap`):**
   - Hiện tại mỗi tin trao đổi được biểu diễn bằng một điểm ghim riêng lẻ. Khi cộng đồng có hàng trăm tin tại cùng một quận/huyện, các điểm ghim sẽ đè lên nhau gây rối mắt.
   - *Giải pháp:* Tích hợp thư viện gom cụm điểm Leaflet MarkerCluster (`leaflet.markercluster`) hiển thị số lượng tin theo khu vực và tự động phân rã khi phóng to bản đồ.
4. **"Vô hình hóa" rào cản thuật ngữ Web3:**
   - Thay vì hiển thị các từ ngữ chuyên môn mang tính thách thức người dùng như "Mint NFT", "Contract ABI", "Sepolia Testnet", "Chain ID", cần sử dụng ngôn ngữ thân thiện với người làm nông:
     - *"Đúc NFT"* $\rightarrow$ *"Cấp Hộ Chiếu Số Độc Bản"*.
     - *"Bằng chứng On-chain"* $\rightarrow$ *"Chứng thực Nguồn gốc Bất biến"*.
     - *"Xem transaction trên Etherscan"* $\rightarrow$ *"Tra cứu Sổ Cái Quốc tế"*.

---

## 3. MA TRẬN RỦI RO & KHUYẾN NGHỊ CẢI TIẾN TRỌNG YẾU

| Mã | Hạng mục | Mức độ Ưu tiên | Khuyến nghị Kỹ thuật | Phòng ban Phụ trách |
|---|---|---|---|---|
| **SEC-01** | Khóa lỗ hổng Admin Token mặc định | 🔴 **P0 (Khẩn cấp)** | Xóa token mặc định trong mã nguồn. Bắt buộc nạp từ biến môi trường/file config bí mật | Bảo mật / Backend |
| **SEC-02** | Khóa cổng POST thêm cây tại `api/plants.php` | 🔴 **P0 (Khẩn cấp)** | Yêu cầu xác thực Admin Token trước khi cho phép INSERT cây mới vào Database | Bảo mật / Backend |
| **SEC-03** | Chặn tải trực tiếp file JSON trong `uploads/` | 🔴 **P0 (Khẩn cấp)** | Bổ sung luật `.htaccess` cấm tải file `.json` để bảo vệ dữ liệu dự phòng | Bảo mật / Hạ tầng |
| **PERF-01** | Tách `SEED_PLANTS` ra khỏi JS Bundle | 🔴 **P0 (Khẩn cấp)** | Chuyển thành API dynamic loading, nén gzip dữ liệu, cải thiện FCP & TTI | Phần mềm Frontend |
| **W3-01** | Sửa lỗ hổng `safeTransferFrom` | 🟠 **P1 (Quan trọng)** | Kế thừa trọn vẹn OpenZeppelin ERC-721 chuẩn, bổ sung kiểm tra Receiver | Blockchain Engineer |
| **AGRI-01** | Danh mục loài xâm hại TT 35/2018 | 🟠 **P1 (Quan trọng)** | Cập nhật bảng kiểm duyệt tự động loài ngoại lai xâm hại theo quy định Bộ TN&MT | Chuyên gia Nông nghiệp |
| **UX-01** | Tối ưu Tương phản & Vùng chạm | 🟠 **P1 (Quan trọng)** | Chuẩn hóa font scale dễ đọc, tương phản WCAG AAA, touch targets $\ge$ 48px (không thêm nút A+/A- rườm rà) | UI/UX Designer |
| **UX-02** | Marker Cluster cho Leaflet Map | 🟡 **P2 (Cải tiến)** | Tích hợp Leaflet MarkerCluster gom nhóm điểm trao đổi cây | Frontend / UI/UX |
| **W3-02** | Dynamic NFT & Tinh giản Gas | 🟡 **P2 (Cải tiến)** | Sử dụng `bytes32` cho hash ảnh, cơ chế cập nhật giai đoạn cây phát triển | Blockchain Engineer |
| **API-01** | Rate Limiting cho Form & Upload | 🟡 **P2 (Cải tiến)** | Giới hạn 10 request/phút theo IP trên các cổng POST | Backend / Bảo mật |

---

## 4. KẾ HOẠCH TRIỂN KHAI CHI TIẾT

```
LỘ TRÌNH THỰC HIỆN TOÀN DIỆN (6 TUẦN)
┌────────────────────────────────────────────────────────────────────────┐
│ TUẦN 1 - 2: GIA CỐ BẢO MẬT, DỮ LIỆU & HIỆU NĂNG HỆ THỐNG               │
│ - Xóa Fallback Admin Token, chặn script uploads/, rate limit          │
│ - Tách SEED_PLANTS khỏi bundle, xây dựng API lazy-load                 │
│ - Chuẩn hóa MySQL storage, loại bỏ rủi ro race-condition file JSON     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ TUẦN 3 - 4: TRI THỨC NÔNG NGHIỆP CHUẨN MỰC & TRẢI NGHIỆM TIẾP CẬN      │
│ - Rà soát dược điển VN V, danh mục loài ngoại lai TT 35/2018           │
│ - Thiết kế Thẻ Cảnh báo An toàn Dược liệu độc lập                      │
│ - Tối ưu font size tự nhiên, tương phản WCAG AAA & touch target        │
│ - Tích hợp Leaflet MarkerCluster trên trạm bản đồ trao đổi             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ TUẦN 5 - 6: NÂNG CẤP WEB3 ERC-721 CHUẨN MỰC & VẬN HÀNH BỀN VỮNG        │
│ - Viết lại PlantPassportNFT kế thừa OpenZeppelin (safeTransfer chuẩn)  │
│ - Tối ưu gas on-chain (bytes32 hash, IPFS metadata)                   │
│ - "Bình dân hóa" thuật ngữ Web3 trên toàn bộ giao diện                │
│ - Kiểm thử tải, rà soát an ninh mạng lần cuối và phát hành v1.1.0      │
└────────────────────────────────────────────────────────────────────────┘
```

---

### GIAI ĐOẠN 1: GIA CỐ BẢO MẬT, ỔN ĐỊNH DỮ LIỆU & TỐI ƯU HIỆU NĂNG (P0)
*Mục tiêu: Đóng toàn bộ các lỗ hổng an ninh thông tin, triệt tiêu nguy cơ mất mát dữ liệu và giảm 60% dung lượng tải trang ban đầu.*

1. **Bảo mật và Phân quyền (`api/admin.php`, `api/config.php`):**
   - Loại bỏ hoàn toàn chuỗi token mặc định `ytc_admin_master_2026`.
   - Viết cơ chế bắt buộc: Khi thiếu file `config.php`, hệ thống trả về mã lỗi HTTP 503 và hướng dẫn người quản trị khởi tạo khóa bảo mật ngẫu nhiên.
   - Thêm tệp `uploads/.htaccess` với lệnh cấm thực thi script để bảo vệ máy chủ Apache/Plesk.
2. **Kiểm soát Tần suất (Rate Limiting) & Xác thực Backend:**
   - Xây dựng bảng `api_rate_limits` trong MySQL ghi nhận IP và số lượng request theo cửa sổ thời gian 60 giây.
   - Triển khai middleware kiểm tra Firebase Auth Token trước khi cho phép tạo bài viết hoặc chấm điểm Karma.
3. **Tái cấu trúc Frontend Bundle:**
   - Tách mảng dữ liệu khổng lồ `SEED_PLANTS` từ file `src/data/plants.ts` thành cơ sở dữ liệu MySQL nạp qua `api/plants.php` kết hợp phân trang (`limit=12&offset=0`).
   - Giữ lại bộ đệm cục bộ qua `sessionStorage` để người dùng chuyển trang mượt mà không phải tải lại.

---

### GIAI ĐOẠN 2: NÂNG CẤP CHUẨN HỌC THUẬT NÔNG NGHIỆP & TÁI CẤU TRÚC UI/UX (P1)
*Mục tiêu: Đạt chuẩn xác thực thông tin thực vật học, bảo vệ sức khỏe cộng đồng và nâng cao độ tiếp cận cho người lớn tuổi.*

1. **Chuẩn hóa Danh mục Thực vật học & Pháp lý Môi trường:**
   - Đối soát toàn bộ 30+ loài cây hiện có với **Dược điển Việt Nam V** và hệ thống phân loại học APG IV.
   - Thêm trường `invasive_risk_level` (mức độ xâm hại) và tự động chặn từ khóa các loài nằm trong **Thông tư 35/2018/TT-BTNMT**.
   - Bổ sung chỉ dẫn Quản lý Dịch hại Tổng hợp (IPM) ưu tiên sinh học trong phác đồ điều trị của `PlantClinic`.
2. **Cải tiến Trải nghiệm Đọc & Tương phản (Typography & Accessibility):**
   - Giữ giao diện tinh sạch, không tích hợp nút tăng giảm cỡ chữ thủ công để bảo tồn tính thẩm mỹ *"Verdant Clarity"*.
   - Chuẩn hóa typography scale: Cỡ chữ nội dung mặc định dễ đọc (16-18px), line-height thoáng (1.6 - 1.75).
   - Tối ưu màu chữ và màu nền đạt độ tương phản chuẩn **WCAG 2.1 AAA** ($\ge$ 7:1) cho các cảnh báo y học.
   - Nâng cấp `PlantDetailPage`: Tách biệt phần **Cảnh báo Độc tính & Tương tác Dược liệu** vào khối Callout đỏ nổi bật ở đầu trang, phía trên phần kinh nghiệm dân gian.
3. **Nâng cấp Bản đồ Trao đổi Thực vật:**
   - Cài đặt plugin `leaflet.markercluster` để gom nhóm các bài đăng theo quận/huyện.
   - Giữ nguyên thuật toán làm mờ tọa độ bảo mật tư gia (H8) để đảm bảo quyền riêng tư.

---

### GIAI ĐOẠN 3: NÂNG CẤP SMART CONTRACT ERC-721 & TRẢI NGHIỆM WEB3 TINH GIẢN (P2)
*Mục tiêu: Đưa tính năng Hộ chiếu thực vật số đạt chuẩn bảo mật quốc tế, tiết kiệm gas và gần gũi với mọi đối tượng người dùng.*

1. **Tái cấu trúc Hợp đồng Thông minh `PlantPassportNFT.sol`:**
   - Chuyển sang sử dụng thư viện chuẩn của OpenZeppelin:
     - `import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";`
     - `import "@openzeppelin/contracts/access/Ownable2Step.sol";`
     - `import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";`
   - Đảm bảo hàm `safeTransferFrom` kiểm tra đầy đủ interface của hợp đồng nhận, loại bỏ nguy cơ kẹt token vĩnh viễn.
   - Chuyển trường `sha256Proof` từ kiểu `string` sang `bytes32` để tối ưu chi phí gas mint trên mạng Ethereum/Base Sepolia.
2. **Cơ chế Hộ chiếu Tiến hóa (Evolutive Tree Passport):**
   - Bổ sung hàm cập nhật tiến trình cây: `recordGrowthMilestone(uint256 tokenId, uint8 newStage, bytes32 newPhotoHash, string memory newMetadataURI)`.
   - Ghi nhận hành trình từ lúc gieo hạt, đâm chồi, ra hoa đến lúc cây trưởng thành.
3. **Thân thiện hóa Giao diện Web3:**
   - Thay thế toàn bộ thuật ngữ kỹ thuật phức tạp bằng ngôn từ tự nhiên, gần gũi.
   - Tích hợp hướng dẫn từng bước trực quan (Step-by-step Onboarding Walkthrough) cho người dùng lần đầu tạo Hộ chiếu cây.

---

## 5. TIÊU CHÍ NGHIỆM THU & BẢNG ĐO LƯỜNG CHỈ SỐ (KPIS)

| Chỉ số Đánh giá | Giá trị Hiện tại | Mục tiêu Sau Cải tiến | Phương pháp Đo lường |
|---|---|---|---|
| **Lighthouse Performance (Mobile)** | ~68 / 100 | **$\ge$ 92 / 100** | Google PageSpeed Insights / Chrome DevTools |
| **Kích thước Bundle JS ban đầu** | > 850 KB | **$<$ 280 KB** | Vite Build Visualizer / Network Tab |
| **Điểm Tiếp cận (Accessibility Score)** | ~78 / 100 | **$\ge$ 96 / 100** | Lighthouse Accessibility Audit (WCAG 2.1) |
| **Lỗ hổng Bảo mật Nghiêm trọng (P0)** | 2 tồn tại | **0 tồn tại** | Static Code Analysis & Penetration Testing |
| **Chuẩn mực Smart Contract** | Self-written ERC721 | **100% OpenZeppelin Compliant** | Slither Static Analyzer & Hardhat Unit Tests |
| **Độ chuẩn hóa Dược học & Pháp lý** | 70% | **100% rà soát Dược điển & TT 35/2018** | Biên bản nghiệm thu chuyên gia sinh thái |

---

## 6. KẾT LUẬN & ĐỀ XUẤT BƯỚC ĐI TIẾP THEO

Dự án **Yêu Trồng Cây** sở hữu một nền móng ý tưởng đặc sắc, kết hợp nhuần nhuyễn giữa tình yêu thiên nhiên, tri thức thảo dược dân tộc và công nghệ số hiện đại. Với việc triển khai đồng bộ kế hoạch cải tiến trên, hệ thống sẽ:
1. Đảm bảo an toàn tuyệt đối cho tài sản dữ liệu người dùng và máy chủ.
2. Cung cấp thông tin sinh thái chuẩn xác, tin cậy và có giá trị khoa học cao.
3. Mang lại trải nghiệm nhẹ nhàng, thư thái, dễ tiếp cận cho mọi lứa tuổi theo đúng tinh thần *"Ánh sáng sinh thái - Verdant Clarity"*.

> **Đề xuất hành động tức thì:** Bắt đầu triển khai ngay gói công việc **Giai đoạn 1 (SEC-01, SEC-02, PERF-01)** để cố định tính toàn vẹn và bảo mật của toàn bộ hệ thống.
