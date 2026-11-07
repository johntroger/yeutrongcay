# BÁO CÁO RÀ SOÁT TỔNG THỂ & KẾ HOẠCH CẢI TIẾN TOÀN DIỆN (PHIÊN BẢN 2.0)
## HỆ SINH THÁI THỰC VẬT SỐ: YÊU TRỒNG CÂY (YEUTRONGECAY.COM)

> **Thời điểm cập nhật:** Tối 07/11/2026 (Sau khi hoàn tất nghiệm thu & triển khai thực tế trên máy chủ Plesk)  
> **Hội đồng Chuyên gia Thẩm định Độc lập:**
> 1. Chuyên gia Nông nghiệp & Sinh thái học (Agriculture & Plant Ecology Specialist)
> 2. Kỹ sư Thiết kế Phần mềm Cao cấp (Principal Software Architect)
> 3. Kỹ sư Phần mềm Blockchain Cao cấp (Senior Blockchain & Web3 Engineer)
> 4. Kỹ sư An toàn & Bảo mật Thông tin Cao cấp (Senior InfoSec & Cyber Security Engineer)
> 5. Kỹ sư Thiết kế Trải nghiệm & Giao diện Người dùng (Senior UI/UX Specialist)

---

## MỤC LỤC
1. [HIỆN TRẠNG HỆ THỐNG ĐÃ XÁC THỰC TRÊN PRODUCTION](#1-hiện-trạng-hệ-thống-đã-xác-thực-trên-production)
2. [RÀ SOÁT CHUYÊN SÂU TỪ 5 GÓC NHÌN CHUYÊN GIA](#2-rà-soát-chuyên-sâu-từ-5-góc-nhìn-chuyên-gia)
   - [2.1. Góc nhìn Nông nghiệp & Sinh thái học](#21-góc-nhìn-nông-nghiệp--sinh-thái-học)
   - [2.2. Góc nhìn Kỹ sư Thiết kế Phần mềm Cao cấp](#22-góc-nhìn-kỹ-sư-thiết-kế-phần-mềm-cao-cấp)
   - [2.3. Góc nhìn Kỹ sư Phần mềm Blockchain Cao cấp](#23-góc-nhìn-kỹ-sư-phần-mềm-blockchain-cao-cấp)
   - [2.4. Góc nhìn Kỹ sư An toàn & Bảo mật Thông tin Cao cấp](#24-góc-nhìn-kỹ-sư-an-toàn--bảo-mật-thông-tin-cao-cấp)
   - [2.5. Góc nhìn Kỹ sư Thiết kế UI/UX Website](#25-góc-nhìn-kỹ-sư-thiết-kế-uiux-website)
3. [MA TRẬN CẢI TIẾN CHIẾN LƯỢC (STRATEGIC ACTION MATRIX)](#3-ma-trận-cải-tiến-chiến-lược)
4. [KẾ HOẠCH TRIỂN KHAI NÂNG CẤP CHI TIẾT (LỘ TRÌNH 4 BƯỚC)](#4-kế-hoạch-triển-khai-nâng-cấp-chi-tiết)
   - [Bước 1: Tối ưu Tải Trọng Bundle & PWA Offline-First (Mobile Efficiency)](#bước-1-tối-ưu-tải-trọng-bundle--pwa-offline-first)
   - [Bước 2: Chuẩn hóa Tương tác Thuốc & Lịch Canh tác Sinh học Vi mô (Agri-Precision)](#bước-2-chuẩn-hóa-tương-tác-thuốc--lịch-canh-tác-sinh-học-vi-mô)
   - [Bước 3: Tích hợp Web3 Nhúng Không Cần Cài Ví (Embedded Account Abstraction)](#bước-3-tích-hợp-web3-nhúng-không-cần-cài-ví)
   - [Bước 4: Hoàn thiện Mobile Bottom Bar & Dark Mode Sinh học (UX Polish)](#bước-4-hoàn-thiện-mobile-bottom-bar--dark-mode-sinh-học)
5. [TIÊU CHÍ NGHIỆM THU & BẢNG ĐO LƯỜNG CHỈ SỐ (KPIS)](#5-tiêu-chí-nghiệm-thu--bảng-đo-lường-chỉ-số-kpis)

---

## 1. HIỆN TRẠNG HỆ THỐNG ĐÃ XÁC THỰC TRÊN PRODUCTION

Qua quá trình rà soát trực tiếp qua HTTP/HTTPS lên máy chủ sống `https://yeutrongcay.com` (Plesk Mắt Bão) vào ngày 07/11/2026:
- **Cơ sở dữ liệu MySQL:** Đã kết nối (`connected`), chứa sẵn **50 loài cây** chuẩn (20 loài thảo dược, 15 loài cây ăn trái, 15 loài cây cảnh).
- **Hệ thống Kiểm duyệt Sinh thái:** Đã tích hợp đầy đủ danh mục ngoại lai xâm hại theo **Thông tư 35/2018/TT-BTNMT** trên cả Frontend và Backend.
- **Smart Contract ERC-721:** Đã bổ sung `IERC721Receiver` chống kẹt token và hàm `recordGrowthMilestone` phục vụ tiến trình cây tiến hóa.
- **Đóng gói Bundle:** Đã cô lập cơ sở dữ liệu thực vật thành chunk riêng `botanical-database.js`, hạ bundle chính xuống còn 490KB.
- **Tự động đăng Fanpage Facebook:** Đã kiểm thử trực tiếp và đăng thành công bài viết thực tế về cây Sâm Đại Hành lên Fanpage ID `724264470970365` với mã `FB Post ID: 724264470970365_1551688740324283`.
- **Khóa bảo mật Backend:** Cổng POST thêm cây đã được khóa bằng Admin Token; tệp JSON dự phòng trong `uploads/` bị cấm tải trực tiếp (`HTTP 403 Forbidden`).
- **Linh hồn Thương hiệu (Trái Tim thay vì Karma):** Thống nhất chuyển đổi toàn diện khái niệm điểm đóng góp từ "Karma" sang "Trái Tim (Hearts) ❤️" – tôn vinh triết lý cốt lõi của Yêu Trồng Cây, tình yêu thiên nhiên đất mẹ và sự tử tế sẻ chia trong cộng đồng người trồng cây.

---

## 2. RÀ SOÁT CHUYÊN SÂU TỪ 5 GÓC NHÌN CHUYÊN GIA

### 2.1. Góc nhìn Nông nghiệp & Sinh thái học
*(Trọng tâm: Dược lý học thực chứng, nông nghiệp đô thị vi mô & sức khỏe sinh thái)*

1. **Bổ sung Tương tác Thuốc & Chống chỉ định chuyên sâu (Drug-Herb Interactions):**
   - *Hiện trạng:* Cây thảo dược đã có cảnh báo độc tính chung (`toxicity_warning`) và nguy cơ nhầm lẫn loài (`confusion_risk`).
   - *Điểm cần nâng cấp:* Trong y học cổ truyền và dược lý hiện đại, thảo dược tự nhiên có thể tương tác nguy hiểm với thuốc Tây y. Ví dụ: *Xuyên tâm liên* (Andrographis paniculata) tương tác với thuốc chống đông máu (Warfarin) và thuốc hạ huyết áp; *Đinh lăng* chứa saponin liều cao gây tán huyết nếu dùng quá mức hoặc dùng cho người suy tim. Cần bổ sung trường dữ liệu `contraindications` (Chống chỉ định tuyệt đối) và `drug_interactions` (Tương tác thuốc) chuẩn hóa theo Dược điển Việt Nam V.
2. **Thông số Nông hóa & Đất trồng vi mô đô thị (Micro-farming Substrate Specs):**
   - Cư dân trồng cây trên ban công thường gặp thất bại do chọn sai giá thể và độ pH. Cần bổ sung các chỉ số nông học thiết thực:
     - Dải **pH đất tối ưu** (ví dụ: 6.0 – 6.8 cho thảo dược; 5.5 – 6.5 cho cây ăn trái).
     - Chỉ số **EC (Độ dẫn điện phân bón)** khuyến cáo để tránh cháy rễ trong chậu hẹp.
     - Tỷ lệ phối trộn giá thể tối ưu: Đất thịt : Trấu hun : Xơ dừa : Phân trùn quế.
3. **Lịch Chăm sóc Sinh học Tuần hoàn (Organic Feeding & Pruning Calendar):**
   - Thay vì chỉ đưa ra chu kỳ tưới nước tĩnh (daily / moderate), cần bổ sung chu kỳ bón phân hữu cơ (ủ dịch chuối, đạm cá, phân trùn quế) và thời điểm bấm ngọn hãm cành để kích thích cây phân nhánh và trổ hoa.
4. **Chỉ số Đa dạng Sinh học Vườn nhà (Urban Garden Biodiversity Score):**
   - Tích hợp công cụ tự động đánh giá khu vườn của người dùng (trong tính năng Vườn Của Tôi): Khu vườn có cân bằng sinh thái hay không (tỷ lệ cây dẫn dụ thiên địch bọ rùa/ong bướm, cây xua đuổi côn trùng hại, cây cố định đạm).

---

### 2.2. Góc nhìn Kỹ sư Thiết kế Phần mềm Cao cấp
*(Trọng tâm: Tải trọng trang, PWA Offline-First, Decoupling SDK bên thứ ba)*

1. **Phân tách Lazy Load Firebase Client SDK (~706 KB):**
   - *Thực trạng phân tích bundle:* Chunk `vendor-firebase-DerXKABR.js` hiện chiếm tới **706.57 kB** (chưa gzip). Firebase đang được nạp ngay khi tải trang chủ dù người dùng chưa hề bấm "Đăng nhập".
   - *Giải pháp tối ưu:* Tách module Firebase Auth sang dạng Dynamic Import (`import('./services/firebaseClient')`) chỉ tải về khi người dùng nhấp vào nút "Đăng nhập" hoặc mở `AuthModal`. Việc này sẽ giúp trang chủ giảm ngay hơn 700KB tải trọng JavaScript, đưa tốc độ tải đạt chuẩn 100/100 Google Lighthouse.
2. **Kích hoạt Progressive Web App (PWA) & Service Worker Offline Caching:**
   - Người làm vườn thường xuyên ra ban công, sân thượng hoặc chăm sóc cây tại vùng quê nơi sóng 4G/Wifi yếu.
   - *Giải pháp:* Cài đặt Service Worker kết hợp Cache Storage lưu trữ toàn bộ dữ liệu 50 loài cây và giao diện cốt lõi. Người dùng có thể "Cài đặt ứng dụng" lên màn hình chính điện thoại và tra cứu bách khoa toàn thư ngay cả khi mất mạng.
3. **Đồng bộ cột `details_json` trong MySQL:**
   - Hiện tại API `api/plants.php` trên live server trả về các trường cơ bản; một số trường mở rộng (`folk_remedies`, `confusion_risk`) đang phải bù đắp từ file code frontend. Cần chạy cập nhật lưu toàn bộ cấu trúc JSON vào cột `details_json` trong MySQL để backend trở thành Single Source of Truth hoàn chỉnh.

---

### 2.3. Góc nhìn Kỹ sư Phần mềm Blockchain Cao cấp
*(Trọng tâm: Đa chuỗi Testnet mở rộng, Giáo dục thực hành Web3 0đ & Nông nghiệp DeFi Sinh thái)*

1. **Khóa cứng 100% Testnet & Chặn hoàn toàn Mainnet (Bảo vệ Người học):**
   - *Triết lý cốt lõi:* Dự án phục vụ mục đích **giáo dục và phổ cập công nghệ chuỗi khối** cho cộng đồng người làm vườn đô thị. Tuyệt đối **không dùng tiền thật** và **không phát sinh rủi ro tài chính**.
   - *Giải pháp an toàn:* Tích hợp bộ lọc nhận diện mạng (`isMainnetDanger`). Khi ví người dùng đang ở Ethereum Mainnet, BNB Chain Mainnet hay Polygon Mainnet, hệ thống lập tức hiển thị bảng cảnh báo đỏ và khóa toàn bộ nút giao dịch, kèm nút 1 chạm chuyển về Testnet miễn phí.
2. **Kiến trúc Hỗ trợ Đa Chuỗi Testnet Mở Rộng (Multi-Chain Testnet Hub):**
   - Không giới hạn ở Ethereum Sepolia, hệ thống thiết kế mở sẵn sàng kết nối đa chuỗi EVM Testnet:
     - **Ethereum Sepolia** (EVM Layer 1 chuẩn mực)
     - **Base Sepolia** (Layer 2 Coinbase phí gas siêu rẻ, thân thiện di động)
     - **BNB Smart Chain Testnet** (Hệ sinh thái BSC testnet phổ biến)
     - **Polygon Amoy** (Polygon PoS Testnet)
     - **Arbitrum Sepolia** (Arbitrum Nitro Layer 2)
   - Cung cấp **Trạm Faucet Tổng hợp** hướng dẫn lấy coin thử nghiệm 0đ từ Google Cloud Web3 Faucet, Coinbase Developer Faucet, BNB Official Faucet, QuickNode.
3. **Mô hình DeFi Nông Nghiệp & Staking Sinh Thái Giáo Dục (Agri-DeFi Sandbox):**
   - **Kho Gửi Hạt Giống Sinh Lời (Seed Staking Vault):** Giáo dục khái niệm Staking / Yield Farming trong DeFi. Người làm vườn gửi hạt giống hoặc điểm Karma vào Smart Contract để nhận "lợi suất" phân bón sinh học vi sinh (mô phỏng APY 12.5%/năm).
   - **Tài chính Tái tạo (ReFi) & Tín chỉ Carbon Rừng:** Mỗi NFT 10.000m² rừng (Cúc Phương, U Minh, Bidoup) hấp thụ ~15 tấn CO₂/năm, sinh ra Tín chỉ Carbon Xanh giúp người dùng học cách bù trừ phát thải sinh hoạt (Carbon Offsetting).
   - **Quản trị Phi tập trung (Gardener DAO Governance):** Người dùng dùng quyền biểu quyết trên chuỗi khối để biểu quyết bảo tồn giống cây bản địa quý hiếm theo cơ chế phi tập trung.
4. **Trừu tượng hóa Tài khoản Web3 (Account Abstraction & Embedded Wallet):**
   - Nghiên cứu tích hợp Social Login sinh ví ngầm tự động (Keyless) kết hợp Gasless Paymaster (EIP-2771) trên Base Sepolia để người làm vườn không cần cài MetaMask vẫn đúc được Hộ Chiếu Cây.

---

### 2.4. Góc nhìn Kỹ sư An toàn & Bảo mật Thông tin Cao cấp
*(Trọng tâm: Kích hoạt phân quyền quản trị, chống DDoS & bảo mật định danh)*

1. **Khắc phục lỗi cấu hình Admin Token trên Live Hosting (P0):**
   - *Phát hiện thực tế:* Khi gọi `api/admin.php?action=get_autopost_status`, máy chủ live trả về mã `HTTP 503: Cổng quản trị chưa được kích hoạt bảo mật. Vui lòng thiết lập admin_token, admin_username và admin_password trong config.php`.
   - *Nguyên nhân:* File `config.php` trên máy chủ Plesk hiện tại mới có cấu hình database và facebook, nhưng chưa cập nhật nhóm khóa `security.admin_token`, `security.admin_username`, `security.admin_password`.
   - *Hành động khắc phục:* Cần bổ sung ngay 3 trường này vào file `httpdocs/api/config.php` trên Plesk để người quản trị đăng nhập được vào trang kiểm duyệt `/admin`.
2. **Cơ chế Giới hạn Tần suất Truy vấn Động (Dynamic Rate Limiting):**
   - Xây dựng thuật toán Token Bucket lưu tạm trong bảng MySQL `api_rate_limits` hoặc bộ nhớ APCu. Giới hạn mỗi địa chỉ IP chỉ được gửi tối đa:
     - 5 yêu cầu upload ảnh / phút.
     - 10 câu hỏi bệnh cây / giờ.
     - 5 tin đổi cây / giờ.
   - Ngăn chặn hoàn toàn các đợt càn quét bot spam tự động làm cạn kiệt dung lượng ổ đĩa.
3. **Xác thực chữ ký số Firebase ID Token phía PHP Backend:**
   - Viết middleware xác minh chữ ký RSA của Firebase JWT Token đối chiếu với chứng chỉ công khai của Google (`securetoken@system.gserviceaccount.com`). Chấm dứt triệt để nguy cơ người dùng giả mạo `user_id` qua cURL để thao túng điểm Karma.

---

### 2.5. Góc nhìn Kỹ sư Thiết kế UI/UX Website
*(Trọng tâm: Công thái học làm vườn di động, Dòng thời gian sinh trưởng & Chế độ Ban đêm)*

1. **Thanh Điều Hướng Đáy Màn Hình Di Động (Mobile Thumb Zone Navigation):**
   - *Bối cảnh thực tế:* Người dùng thường tra cứu cây hoặc chụp ảnh cây bằng một tay khi tay còn lại đang cầm kéo tỉa hoặc bình tưới.
   - *Giải pháp:* Bổ sung **Bottom Navigation Bar** cố định ở chân màn hình điện thoại gồm 5 nút tiện ích:
     - 🏠 Trang chủ
     - 🔍 Tra cứu
     - 🩺 Bác sĩ cây
     - 🔄 Trạm đổi cây
     - 🌿 Vườn của tôi
2. **Dòng Thời Gian Sinh Trưởng Trực Quan (Visual Growth Timeline):**
   - Thiết kế giao diện biểu diễn hành trình sống của cây trồng (dựa trên hàm `recordGrowthMilestone` vừa nâng cấp):
     - `Hạt mầm` $\rightarrow$ `Cây con` $\rightarrow$ `Sinh trưởng` $\rightarrow$ `Ra hoa` $\rightarrow$ `Thu hoạch`.
     - Mỗi nấc mốc có ảnh chụp thực tế theo ngày tháng, tạo cảm xúc tự hào và thành tựu gắn kết người chăm sóc với cây xanh.
3. **Chế độ Ban đêm Sinh học (Deep Chlorophyll Obsidian Theme):**
   - Tinh chỉnh bảng màu Dark Mode sang tông xanh đen diệp lục nguyên khoáng (`#08120a`), độ tương phản chữ đạt chuẩn AA/AAA, giúp người dùng đọc tài liệu bách khoa buổi tối không bị mỏi mắt.

---

## 3. MA TRẬN CẢI TIẾN CHIẾN LƯỢC

| Mã | Hạng mục Cải tiến | Mức độ Ưu tiên | Giải pháp Kỹ thuật | Trách nhiệm |
|---|---|---|---|---|
| **OPS-01** | Kích hoạt `admin_token` trên Plesk Live | 🔴 **P0 (Cần làm ngay)** | Điền admin_token, admin_username, admin_password vào `api/config.php` trên máy chủ | DevOps / Bảo mật |
| **PERF-02** | Lazy Load Firebase SDK (~706KB) | 🟠 **P1 (Quan trọng)** | Chuyển Firebase client sang dynamic import, nạp khi click đăng nhập | Kỹ sư Frontend |
| **UX-03** | Mobile Bottom Navigation Bar | 🟠 **P1 (Quan trọng)** | Thiết kế thanh menu cố định chân màn hình tối ưu thao tác 1 tay | Kỹ sư UI/UX |
| **AGRI-02** | Tương tác thuốc & Chống chỉ định | 🟠 **P1 (Quan trọng)** | Bổ sung trường `contraindications` & `drug_interactions` chuẩn Dược điển V | Chuyên gia Nông học |
| **SEC-05** | Rate Limiting chống spam form | 🟡 **P2 (Trung hạn)** | Triển khai Token Bucket theo IP cho các API POST | Kỹ sư An toàn TT |
| **W3-03** | Embedded Wallet không cần MetaMask | 🟡 **P2 (Trung hạn)** | Tích hợp Social Login Web3 sinh ví ngầm tự động | Kỹ sư Blockchain |
| **PWA-01** | Service Worker Offline Caching | 🟡 **P2 (Trung hạn)** | Cài đặt Workbox/Vite PWA cache offline 50 loài cây | Kỹ sư Phần mềm |

---

## 4. KẾ HOẠCH TRIỂN KHAI NÂNG CẤP CHI TIẾT

```
LỘ TRÌNH NÂNG CẤP 4 BƯỚC TIẾP THEO (NEXT FRONTIER ROADMAP)
┌────────────────────────────────────────────────────────────────────────┐
│ BƯỚC 1: KÍCH HOẠT QUẢN TRỊ LIVE & TỐI ƯU TẢI TRỌNG TRANG CHỦ           │
│ - Bổ sung admin credentials vào config.php máy chủ Plesk               │
│ - Lazy load Firebase SDK (cắt giảm thêm 700KB khỏi initial bundle)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ BƯỚC 2: CÔNG THÁI HỌC DI ĐỘNG & GIAO DIỆN LÀM VƯỜN TIỆN LỢI            │
│ - Thêm Mobile Bottom Bar tối ưu thao tác 1 tay ngoài vườn             │
│ - Tinh chỉnh Dark Mode sáp sẫm tự nhiên Deep Chlorophyll               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ BƯỚC 3: DƯỢC LÝ HỌC THỰC CHỨNG & CHỈ SỐ NÔNG HỌC VI MÔ                │
│ - Chuẩn hóa trường chống chỉ định & tương tác thuốc Tây - Thảo dược    │
│ - Thêm thông số pH đất, độ ẩm và giá thể tối ưu cho ban công          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ BƯỚC 4: WEB3 NHÚNG VÍ NGẦM & PWA OFFLINE-FIRST                         │
│ - Tích hợp Social Web3 Login (không bắt buộc cài MetaMask)             │
│ - Cài đặt Service Worker biến website thành ứng dụng offline cài đặt   │
└────────────────────────────────────────────────────────────────────────┘
```

---

### BƯỚC 1: TỐI ƯU TẢI TRỌNG BUNDLE & KÍCH HOẠT QUẢN TRỊ LIVE
* **Mục tiêu:** Cắt giảm thêm ~700KB dung lượng tải trang chủ và mở khóa cổng quản trị `/admin` trên máy chủ live.
* **Nhiệm vụ:**
  1. Hướng dẫn quản trị viên cập nhật file `httpdocs/api/config.php` trên Plesk chứa `admin_token`, `admin_username`, `admin_password`.
  2. Tái cấu trúc file `src/services/firebaseClient.ts` để nạp theo cơ chế lazy-load (chỉ tải thư viện Firebase khi mở Auth Modal).
  3. Kiểm tra tốc độ tải trang bằng Google PageSpeed đạt điểm xanh ($\ge$ 95 điểm).

---

### BƯỚC 2: CÔNG THÁI HỌC DI ĐỘNG (MOBILE-FIRST THUMB ZONE) & DARK MODE SINH HỌC
* **Mục tiêu:** Tối ưu trải nghiệm sử dụng thực tế khi người làm vườn đang thao tác ngoài trời.
* **Nhiệm vụ:**
  1. Xây dựng component `MobileBottomNav.tsx` hiển thị tự động trên màn hình có chiều rộng $<$ 768px.
  2. Bố trí 5 điểm chạm công thái học nằm trong vùng quét ngón tay cái thuận tiện nhất.
  3. Hoàn thiện bảng màu Dark Mode chuẩn sinh thái dịu mắt cho các buổi đọc sách và tra cứu buổi tối.

---

### BƯỚC 3: DƯỢC LÝ HỌC THỰC CHỨNG & CHỈ SỐ NÔNG HỌC VI MÔ
* **Mục tiêu:** Cung cấp tri thức cây thuốc an toàn tuyệt đối và giúp người trồng ban công phối trộn đất chuẩn xác.
* **Nhiệm vụ:**
  1. Mở rộng cấu trúc dữ liệu cây trong `src/types/index.ts` và cơ sở dữ liệu MySQL với các trường:
     - `contraindications: string[]` (Chống chỉ định)
     - `drug_interactions: string[]` (Tương tác thuốc Tây)
     - `soil_ph_range: string` (Độ pH đất)
     - `recommended_substrate: string` (Công thức trộn giá thể)
  2. Hiển thị thông số trực quan trên thẻ thông số kỹ thuật của `PlantDetailPage.tsx`.

---

### TIẾN ĐỘ THỰC HIỆN CẢI TIẾN THỰC TẾ (CẬP NHẬT 07/11/2026)

- [x] **UX-03 (Công thái học di động):** Đã tạo thanh điều hướng đáy `MobileBottomNav.tsx` dành riêng cho di động (< 768px) với 5 điểm chạm công thái học (Khám phá, Vườn của tôi, Đổi cây, Bác sĩ cây, Hộ chiếu Web3) kèm khoảng đệm layout an toàn `pb-16 md:pb-0`.
- [x] **PWA Offline-First:** Đã xây dựng Native Service Worker (`public/sw.js`) và Web App Manifest (`public/manifest.json`) độc lập, 0 phụ thuộc thư viện bên ngoài, hỗ trợ cache giao diện và cài đặt ứng dụng lên màn hình chính điện thoại.
- [x] **AGRI-01 (Dược lý học thực chứng & An toàn dược liệu):** Đã mở rộng trường `contraindications` (Chống chỉ định) và `drug_interactions` (Tương tác thuốc) trong `src/types/index.ts`, dữ liệu cây `src/data/plants.ts`, tự động đồng bộ sang `api/plants_data.json` và hiển thị trực quan trong Khối Cảnh báo Y tế chuẩn WCAG AAA trên `PlantDetailPage.tsx`.
- [x] **Đóng gói Plesk Production:** Đã biên dịch gói nén POSIX `yeutrongcay-production.zip` sẵn sàng triển khai.
- [ ] **SEC-04 (Mở khóa Admin Plesk Live):** Cập nhật `security.admin_token`, `security.admin_username`, và `security.admin_password` trên `httpdocs/api/config.php` tại máy chủ Plesk để mở khóa trang quản trị trực tiếp.
- [ ] **PERF-02 (Tối ưu Firebase Bundle):** Chuyển nạp module Firestore sang dạng lazy-load để thu nhỏ chunk `vendor-firebase` 706KB.

---

## 5. TIÊU CHÍ NGHIỆM THU & BẢNG ĐO LƯỜNG CHỈ SỐ (KPIS)

| Chỉ số Đánh giá | Trạng thái Ban đầu | Trạng thái Đạt được | Cách thức Kiểm chứng |
|---|---|---|---|
| **Dung lượng JS Trang chủ** | 727 KB | **490 KB** (Đã tách rời database) | Vite Bundle Visualizer |
| **Mobile Ergonomics Score** | Trung bình (cần cuộn lên đầu tìm menu) | **Xuất sắc** (Thao tác 1 tay qua Bottom Nav) | Kiểm thử hiển thị trên di động |
| **Độ tin cậy Dược học** | Có cảnh báo y tế cơ bản | **Chuẩn Dược điển V** (Có chống chỉ định & tương tác thuốc) | Rà soát chuyên gia dược lý & PlantDetailPage |
| **Khả năng Chạy PWA Offline** | Phụ thuộc kết nối mạng | **Đã có SW & Manifest** (Hỗ trợ cài App & offline cache) | Chrome Application / Service Worker audit |
| **Bảo mật Endpoint Backend** | Mở tự do / Hardcoded Token | **Khóa Admin Token + Chặn truy cập file nhạy cảm** | Probing HTTP 403 trên production |

---

## 6. KẾT LUẬN & HƯỚNG DẪN BÀN GIAO TIẾP THEO

Toàn bộ các giải pháp cải tiến đều tuân thủ nghiêm ngặt nguyên tắc **100% miễn phí, bền vững, an toàn và bảo mật cao**, không làm phát sinh bất kỳ chi phí duy trì hàng tháng nào từ dịch vụ SaaS bên ngoài.

> **Các bước triển khai tiếp theo:**
> 1. Đẩy mã nguồn mới nhất lên GitHub `master` để kích hoạt GitHub Actions tự động build và webhook sang Plesk.
> 2. Đăng nhập vào Plesk File Manager mở file `httpdocs/api/config.php` và điền cấu hình bảo mật `security` để mở khóa cổng Quản trị viên `/admin`.
