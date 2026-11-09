# BÁO CÁO NGHIÊN CỨU TOÀN DIỆN: CÔNG THỨC QUY ĐỔI TÍN CHỈ CARBON TỪ NFT LÔ RỪNG TỰ NHIÊN & CƠ CHẾ BÙ TRỪ NET-ZERO CÁ NHÂN HẰNG NGÀY

> **Mã văn kiện:** RES-REFI-FOREST-CARBON-NETZERO-2026  
> **Phiên bản:** 2.0 (Bản Tổng Hợp Toàn Diện)  
> **Đơn vị thực hiện:** Nhóm Nghiên Cứu Lâm Nghiệp Sinh Thái & Công Nghệ Web3 yeutrongcay.com  
> **Cơ sở khoa học quốc tế & quốc gia:** IPCC 2006/2019 Refinement AFOLU, Tiêu chuẩn Verra VCS (VM0007 / VM0015), Tiêu chuẩn GHG Protocol Corporate/Individual Scope 1-2, Cục Lâm Nghiệp & Viện Điều Tra Quy Hoạch Rừng Việt Nam (FIPI).  
> **Mục tiêu tài liệu:** Cung cấp cơ sở lý luận, công thức toán học và thiết kế kỹ thuật hoàn chỉnh để tích hợp vào Nền tảng Tài chính Tái tạo (ReFi) và Hồ Sơ Cá Nhân (`yeutrongcay.com/:username`).

---

## MỤC LỤC TỔNG THỂ

1. [Tổng Quan Chiến Lược & Mô Hình Tài Chính Tái Tạo (ReFi)](#1-tổng-quan-chiến-lược--mô-hình-tài-chính-tái-tạo-refi)
2. [Cơ Sở Khoa Học Lâm Nghiệp & 5 Bể Chứa Carbon Theo Chuẩn IPCC](#2-cơ-sở-khoa-học-lâm-nghiệp--5-bể-chứa-carbon-theo-chuẩn-ipcc)
3. [Bộ Công Thức Quy Đổi Tín Chỉ Carbon Từ NFT Lô Rừng (10.000 m²)](#3-bộ-công-thức-quy-đổi-tín-chỉ-carbon-từ-nft-lô-rừng-10000-m)
4. [Bảng Thông Số Thực Nghiệm Cho Các Hệ Sinh Thái Rừng Việt Nam](#4-bảng-thông-số-thực-nghiệm-cho-các-hệ-sinh-thái-rừng-việt-nam)
5. [Chuẩn Hóa Mô Hình Tính Toán Theo Ngày (Daily Ecological Epoch)](#5-chuẩn-hóa-mô-hình-tính-toán-theo-ngày-daily-ecological-epoch)
6. [Cơ Chế Tính Dấu Chân Carbon Cá Nhân Hằng Ngày Trong Hồ Sơ Người Dùng](#6-cơ-chế-tính-dấu-chân-carbon-cá-nhân-hằng-ngày-trong-hồ-sơ-người-dùng)
7. [Cơ Chế Cán Cân Tự Bù Trừ Net-Zero Cá Nhân (Self-Balancing Net-Zero Engine)](#7-cơ-chế-cán-cân-tự-bù-trừ-net-zero-cá-nhân-self-balancing-net-zero-engine)
8. [Hệ Thống Gamification, Chuỗi Net-Zero Streak & Vinh Danh Profile](#8-hệ-thống-gamification-chuỗi-net-zero-streak--vinh-danh-profile)
9. [Thiết Kế Kiến Trúc Smart Contract ReFi Vault & Giám Sát Vệ Tinh dMRV](#9-thiết-kế-kiến-trúc-smart-contract-refi-vault--giám-sát-vệ-tinh-dmrv)
10. [Kết Luận & Lộ Trình Triển Khai Tính Năng Trên yeutrongcay.com](#10-kết-luận--lộ-trình-triển-khai-tính-năng-trên-yeutrongcaycom)
11. [Danh Mục Tài Liệu Tham Khảo (APA 7th Format)](#11-danh-mục-tài-liệu-tham-khảo-apa-7th-format)

---

## 1. TỔNG QUAN CHIẾN LƯỢC & MÔ HÌNH TÀI CHÍNH TÁI TẠO (REFI)

Biến đổi khí hậu toàn cầu và mục tiêu quốc gia đạt **Net Zero vào năm 2050** theo cam kết của Chính phủ Việt Nam tại COP26 đang mở ra một kỷ nguyên mới cho thị trường tín chỉ carbon tự nguyện (Voluntary Carbon Market - VCM). Tuy nhiên, các giải pháp truyền thống hiện nay đang đối mặt với ba rào cản lớn:

1. **Rào cản tiếp cận:** Tín chỉ carbon chủ yếu là sân chơi của các tập đoàn nghìn tỷ, người dân phổ thông gần như bị đứng ngoài lề.
2. **Thiếu minh bạch và đếm trùng (Double Counting):** Tình trạng báo cáo khống, cấp trùng chứng chỉ carbon vẫn diễn ra ở nhiều dự án quốc tế.
3. **Mất kết nối với hành vi cá nhân:** Người dùng không nhận thức được lối sống hàng ngày của mình tác động thế nào tới môi trường và làm sao để đóng góp thực chất.

Dự án **Yêu Trồng Cây (yeutrongcay.com)** tiên phong giải quyết bài toán này thông qua mô hình **ReFi (Regenerative Finance - Tài chính Tái tạo)** trên nền tảng Web3 minh bạch (100% Testnet).

Trong hệ thống, mỗi hecta rừng tự nhiên ($10.000\text{ m}^2$) tại các Vườn quốc gia trọng điểm (Cúc Phương, U Minh Hạ, Cần Giờ, Ba Bể, Bidoup Núi Bà) được gắn một định danh số bất biến gọi là **Hộ Chiếu Lô Rừng Số (NFT `geo_forest_10000m2`)**. Chủ nhân sở hữu NFT này có thể tham gia 2 cơ chế tài chính sinh thái:

* **Cơ chế 1 - Thế chấp nhận lãi sinh thái (Staking for Daily Carbon Yield):** Khóa NFT vào Smart Contract ReFi Vault để nhận dòng tín chỉ carbon ($tCO_2e$ hoặc $kg\text{ } CO_2e$) sinh ra đều đặn mỗi ngày. Người dùng có thể rút gốc NFT bất kỳ lúc nào.
* **Cơ chế 2 - Đổi đứt hoặc Đốt NFT lấy chứng thư bù trừ trọn gói (Redemption / Retirement):** Khóa dài hạn hoặc đốt vĩnh viễn NFT để nhận trọn gói chứng thư Bù trừ Carbon (Soulbound Token) phục vụ báo cáo ESG hoặc trung hòa khí thải.

---

## 2. CƠ SỞ KHOA HỌC LÂM NGHIỆP & 5 BỂ CHỨA CARBON THEO CHUẨN IPCC

Theo Hướng dẫn Quốc tế về Kiểm kê Khí nhà kính của IPCC (IPCC 2006 Guidelines for National Greenhouse Gas Inventories & Bản cập nhật 2019 Refinement) thuộc lĩnh vực Lâm nghiệp và Sử dụng đất (AFOLU), tổng trữ lượng carbon của một hệ sinh thái rừng tự nhiên được chia thành **5 bể chứa (Carbon Pools)**:

1. **Sinh khối trên mặt đất (Above-ground Biomass - AGB):** Bao gồm toàn bộ thân gỗ, cành cây, chồi non, tán lá, vỏ cây của thực vật đang sống.
2. **Sinh khối dưới mặt đất (Below-ground Biomass - BGB):** Bao gồm hệ thống rễ cọc, rễ phụ, rễ chùm và rễ chống ngập mặn đâm sâu vào lòng đất.
3. **Gỗ chết (Dead Wood - DW):** Toàn bộ thân cây đổ ngã, khúc gỗ mục, cành khô nằm trên mặt đất rừng chưa bị phân hủy hoàn toàn.
4. **Thảm mục và lá rụng (Litter - LI):** Lớp vật rơi rụng hữu cơ (lá cây, vỏ cây khô, hạt rụng) phủ trên tầng mặt của đất rừng.
5. **Carbon hữu cơ trong đất (Soil Organic Carbon - SOC):** Hàm lượng carbon hữu cơ tích tụ trong đất cát, đất feralit hoặc đặc biệt là tầng bùn ngập mặn và đầm than bùn yếm khí.

### Nguyên lý chuyển hóa hóa học:
Cây xanh hấp thụ khí carbon dioxide ($CO_2$) từ khí quyển thông qua quá trình quang hợp dưới ánh sáng mặt trời:
$$6CO_2 + 6H_2O \xrightarrow{\text{Ánh sáng, Diệp lục}} C_6H_{12}O_6 + 6O_2$$

Khối lượng nguyên tử của Carbon ($C$) là $12$, khối lượng phân tử của Oxygen ($O$) là $16$. Do đó:
$$\text{Khối lượng phân tử } CO_2 = 12 + 16 \times 2 = 44$$

Tỷ số quy đổi tương đương từ Carbon nguyên tố sang $CO_2$ khí quyển là:
$$\text{Hệ số chuyển đổi } = \frac{44}{12} \approx 3.667$$

Điều này có nghĩa là: **Cứ mỗi 1 tấn Carbon ($C$) lưu trữ trong gỗ rừng tương đương với 3.667 tấn khí $CO_2$ ($tCO_2e$) đã được loại bỏ vĩnh viễn khỏi bầu khí quyển.**

---

## 3. BỘ CÔNG THỨC QUY ĐỔI TÍN CHỈ CARBON TỪ NFT LÔ RỪNG (10.000 M²)

Mỗi NFT Lô Rừng trên hệ thống yeutrongcay.com đại diện cho đúng diện tích chuẩn:
$$A = 10.000\text{ m}^2 = 1.0\text{ hecta (ha)}$$

### 3.1. Công thức Tổng Quát Tính Sản Lượng Tín Chỉ Hàng Năm ($\Delta C_{annual}$)

Dựa trên phương pháp luận IPCC Tier 2 và Tiêu chuẩn Verra VCS VM0007, sản lượng tín chỉ carbon thực nhận của 1 hecta rừng trong một năm được xác định theo công thức:

$$\Delta C_{annual} = \left[ \Delta AGB \times (1 + R) \times CF \times \frac{44}{12} + \Delta SOC \times \frac{44}{12} \right] \times A \times (1 - B_{risk})$$

**Giải thích chi tiết các tham số:**
* $A = 1.0\text{ ha}$: Diện tích lô đất của 1 NFT.
* $\Delta AGB$: Lượng tăng trưởng sinh khối khô trên mặt đất bình quân hàng năm ($\text{tấn khô/ha/năm}$). Số liệu này được xác định dựa trên cấp tuổi rừng và kết quả kiểm kê tán lá.
* $R$: Tỷ lệ sinh khối rễ dưới mặt đất so với sinh khối thân trên mặt đất (**Root-to-Shoot Ratio** $BGB / AGB$). Theo khuyến nghị IPCC:
  * Rừng mưa nhiệt đới cạn: $R = 0.20 - 0.24$.
  * Rừng than bùn ngập phèn: $R = 0.28 - 0.32$.
  * Rừng ngập mặn ven biển: $R = 0.35 - 0.49$.
* $CF$: Tỷ lệ hàm lượng carbon trong vật chất khô thảo mộc (**Carbon Fraction**). Theo chuẩn IPCC AFOLU, hệ số mặc định là **$CF = 0.47$** (tức 47% khối lượng gỗ khô là carbon).
* $\Delta SOC$: Tốc độ tích tụ carbon hữu cơ trong đất hàng năm hoặc lượng carbon tránh phát thải nhờ bảo toàn tầng than bùn ($\text{tấn C/ha/năm}$).
* $B_{risk}$: **Hệ số đệm khấu trừ rủi ro (Buffer Pool Risk)**. Theo tiêu chuẩn Verra VCS, mỗi dự án phải trích lập **$15\% - 20\%$** sản lượng tín chỉ vào bể dự phòng bảo hiểm rủi ro thiên tai (cháy rừng, bão gãy đổ). Hệ thống yeutrongcay.com áp dụng mức chiết khấu an toàn **$B_{risk} = 0.15$ ($15\%$)**.

---

## 4. BẢNG THÔNG SỐ THỰC NGHIỆM CHO CÁC HỆ SINH THÁI RỪNG VIỆT NAM

Dựa trên số liệu nghiên cứu của Cục Lâm nghiệp, Viện Điều tra Quy hoạch Rừng (FIPI) và các dự án lâm nghiệp thực tế tại Việt Nam, các thông số được chuẩn hóa như sau:

| Hệ Sinh Thái & Khu Rừng | Loại Hình Rừng Đặc Trưng | Sinh Khối Tăng $\Delta AGB$ (tấn/ha/năm) | Tỷ Lệ Rễ/Chồi $R$ | Tích Lũy Đất $\Delta SOC$ (tC/ha/năm) | **Tổng Hấp Thụ $\Delta C_{gross}$ ($tCO_2e$/ha/năm)** | **Tín Chỉ Thực Nhận Sau Khấu Trừ $15\%$ ($tCO_2e$/năm/NFT)** |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **🌲 VQG Cúc Phương** | Rừng mưa nhiệt đới thường xanh núi đá vôi | $5.80$ | $0.24$ | $0.25$ | **$13.37$** | **$11.36$ $tCO_2e$** |
| **🌾 Đầm Than Bùn U Minh Hạ** | Rừng tràm ngập phèn trên đất than bùn | $4.20$ | $0.30$ | $3.50$ | **$22.25$** | **$18.91$ $tCO_2e$** |
| **🦀 Rừng Ngập Mặn Cần Giờ** | Rừng ngập mặn ven biển (Blue Carbon) | $7.50$ | $0.45$ | $2.80$ | **$29.05$** | **$24.69$ $tCO_2e$** |
| **🏞️ VQG Ba Bể** | Rừng thường xanh núi đá vôi ven hồ | $4.90$ | $0.22$ | $0.20$ | **$11.02$** | **$9.37$ $tCO_2e$** |
| **⛰️ VQG Bidoup Núi Bà** | Rừng hỗn giao thông lá kim và lá rộng á nhiệt đới | $5.20$ | $0.25$ | $0.30$ | **$12.31$** | **$10.46$ $tCO_2e$** |

> [!NOTE]
> **Hiện tượng Siêu Bể Lắng Carbon (Super Carbon Sink) tại U Minh Hạ và Cần Giờ:**  
> Rừng ngập mặn và rừng than bùn có trữ lượng hấp thụ carbon vượt trội so với rừng cạn. Tầng đất than bùn của U Minh Hạ chứa tới $1.500 - 2.500\text{ tCO}_2e\text{/ha}$ tích tụ qua hàng nghìn năm trong môi trường ngập nước yếm khí. Việc giữ nước bảo tồn than bùn giúp tránh phát thải ngầm do cháy hoặc oxy hóa, tạo ra lượng tín chỉ đất lên tới $3.50\text{ tC/ha/năm}$.

---

## 5. CHUẨN HÓA MÔ HÌNH TÍNH TOÁN THEO NGÀY (DAILY ECOLOGICAL EPOCH)

### 5.1. Vì sao tính theo Ngày là phương án tối ưu nhất?

* **Tránh tính theo năm:** Nếu tính theo chu kỳ năm thực tế (365 ngày), người dùng phổ thông phải chờ đợi quá lâu, không thể duy trì hứng thú và không học được cơ chế vận hành của ReFi.
* **Tránh tính theo giây:** Cây rừng không lớn lên theo từng giây. Việc để số nhảy loạn xạ từng giây như bảng giá tiền số sẽ làm tầm thường hóa giá trị lâm nghiệp, biến dự án môi trường thành cảm giác "game cờ bạc degen" thiếu đứng đắn.
* **TÍNH THEO NGÀY LÀ ĐIỂM CÂN BẰNG HOÀN HẢO:**  
  * Cây quang hợp theo chu kỳ mặt trời mọc - lặn (24 giờ). Mỗi ngày là một nhịp thở tự nhiên của hệ sinh thái.
  * Khi quy đổi ra đơn vị Kilogram ($kg$), sản lượng hàng ngày là một con số nguyên cực kỳ đẹp, chẵn và dễ nhớ.

### 5.2. Công thức Lãi Sinh Khối Theo Ngày ($\Delta C_{daily}$)

$$\Delta C_{daily} = \frac{\Delta C_{annual}}{365} \quad (tCO_2e/\text{ngày/NFT})$$

Quy đổi sang Kilogram ($kg\text{ } CO_2e/\text{ngày/NFT}$):
$$\Delta C_{daily}^{(kg)} = \Delta C_{daily} \times 1.000 = \frac{\Delta C_{annual} \times 1.000}{365}$$

Bảng quy đổi sản lượng hàng ngày:
* **VQG Cúc Phương:** $\Delta C_{daily} = \frac{11.36 \times 1.000}{365} \approx \mathbf{31.1\text{ kg } CO_2/\text{ngày}}$.
* **Đầm Than Bùn U Minh Hạ:** $\Delta C_{daily} = \frac{18.91 \times 1.000}{365} \approx \mathbf{51.8\text{ kg } CO_2/\text{ngày}}$.
* **Rừng Ngập Mặn Cần Giờ:** $\Delta C_{daily} = \frac{24.69 \times 1.000}{365} \approx \mathbf{67.6\text{ kg } CO_2/\text{ngày}}$.
* **VQG Ba Bể:** $\Delta C_{daily} = \frac{9.37 \times 1.000}{365} \approx \mathbf{25.7\text{ kg } CO_2/\text{ngày}}$.
* **VQG Bidoup Núi Bà:** $\Delta C_{daily} = \frac{10.46 \times 1.000}{365} \approx \mathbf{28.7\text{ kg } CO_2/\text{ngày}}$.

---

## 6. CƠ CHẾ TÍNH DẤU CHÂN CARBON CÁ NHÂN HẰNG NGÀY TRONG HỒ SƠ NGƯỜI DÙNG

Để gắn kết việc bảo tồn rừng với đời sống hàng ngày của từng người dùng, tính năng **Bộ Tính Dấu Chân Carbon Cá Nhân Hằng Ngày** được tích hợp vào Hồ Sơ Cá Nhân (`PublicProfilePage.tsx`).

### 6.1. Bốn trụ cột phát thải cá nhân ($E_{daily}$):

$$E_{daily} = E_{transport} + E_{energy} + E_{diet} + E_{waste} \quad (kg\text{ } CO_2/\text{ngày})$$

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      4 TRỤ CỘT PHÁT THẢI CARBON HẰNG NGÀY CỦA CÁ NHÂN                  │
├────────────────────┬───────────────────────────────────────────┬───────────────────────┤
│ 1. Di chuyển       │ Xe máy xăng / Ô tô / Xe buýt / Xe đạp     │ $0.0 - 3.5\text{ kg}$ │
│ 2. Điện sinh hoạt  │ Quạt, máy lạnh, máy tính, thiết bị bếp    │ $1.8 - 7.2\text{ kg}$ │
│ 3. Khẩu phần ăn    │ Ăn chay / Cân bằng cá gia cầm / Thịt đỏ   │ $1.2 - 4.5\text{ kg}$ │
│ 4. Tiêu dùng & Rác │ Rác phân loại / rác vô cơ / đồ dùng 1 lần │ $0.2 - 0.8\text{ kg}$ │
└────────────────────┴───────────────────────────────────────────┴───────────────────────┘
```

### 6.2. Các hệ số phát thải cụ thể:

1. **Phương tiện di chuyển ($E_{transport}$)**:
   * Đi xe máy xăng 15 km/ngày: $15 \times 0.09 = \mathbf{1.35\text{ kg } CO_2}$.
   * Đi ô tô xăng 15 km/ngày: $15 \times 0.22 = \mathbf{3.30\text{ kg } CO_2}$.
   * Đi xe buýt công cộng: $\mathbf{0.60\text{ kg } CO_2}$.
   * Đi bộ, xe đạp, xe máy điện sạch: $\mathbf{0.00\text{ kg } CO_2}$.
2. **Năng lượng gia đình ($E_{energy}$)** (Hệ số lưới điện Việt Nam $\approx 0.72\text{ kg } CO_2/\text{kWh}$):
   * Cơ bản (không dùng máy lạnh): $2.5\text{ kWh} \times 0.72 = \mathbf{1.80\text{ kg } CO_2}$.
   * Trung bình (bật điều hòa 4 tiếng): $6.0\text{ kWh} \times 0.72 = \mathbf{4.32\text{ kg } CO_2}$.
   * Cao (bật điều hòa cả ngày đêm): $10.0\text{ kWh} \times 0.72 = \mathbf{7.20\text{ kg } CO_2}$.
3. **Khẩu phần ăn ($E_{diet}$)**:
   * Chế độ nhiều thịt đỏ: $\mathbf{4.50\text{ kg } CO_2}$.
   * Chế độ cân bằng (gà, cá, trứng, rau): $\mathbf{2.50\text{ kg } CO_2}$.
   * Chế độ thuần chay, nhiều rau củ: $\mathbf{1.20\text{ kg } CO_2}$.
4. **Tiêu dùng và rác thải ($E_{waste}$)**:
   * Có phân loại rác và ủ compost hữu cơ: $\mathbf{0.20\text{ kg } CO_2}$.
   * Rác lẫn lộn, dùng đồ nhựa 1 lần: $\mathbf{0.80\text{ kg } CO_2}$.

### 6.3. Bảng phân nhóm lối sống cá nhân tại Việt Nam:

* **🌿 Nhóm Sống Xanh (Eco Hero):** $E_{daily} \approx \mathbf{3.2\text{ kg } CO_2/\text{ngày}}$ ($1.17\text{ tấn/năm}$).
* **🛵 Nhóm Đô Thị Phổ Thông (Average Citizen):** $E_{daily} \approx \mathbf{6.8\text{ kg } CO_2/\text{ngày}}$ ($2.48\text{ tấn/năm}$).
* **🚗 Nhóm Phát Thải Cao (High Emitter):** $E_{daily} \approx \mathbf{16.5\text{ kg } CO_2/\text{ngày}}$ ($6.02\text{ tấn/năm}$).

---

## 7. CƠ CHẾ CÁN CÂN TỰ BÙ TRỪ NET-ZERO CÁ NHÂN (SELF-BALANCING NET-ZERO ENGINE)

### 7.1. Đối Chiếu Cán Cân Sinh Thái

Khi đặt cạnh nhau giữa mức phát thải hàng ngày của 1 cá nhân và lượng hấp thụ hàng ngày của 1 hecta rừng:

$$\text{Cán cân} = \frac{\Delta C_{daily}}{E_{daily}} = \frac{31.1\text{ kg } CO_2/\text{ngày}}{6.8\text{ kg } CO_2/\text{ngày}} \approx \mathbf{4.57\text{ lần}}$$

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                     CÁN CÂN CARBON CÁ NHÂN (DAILY CARBON BALANCE)                │
├────────────────────────────────────────┬─────────────────────────────────────────┤
│ KHÍ THẢI HẰNG NGÀY CỦA BẠN             │ TÍN CHỈ RỪNG BẠN TẠO RA HẰNG NGÀY       │
│ 🛵 ~6.8 kg CO₂ / ngày                  │ 🌲 +31.1 kg CO₂ / ngày (1 Lô Cúc Phương)│
├────────────────────────────────────────┴─────────────────────────────────────────┤
│ 👉 KẾT QUẢ: Rừng của bạn tạo ra lượng tín chỉ GẤP 4.5 LẦN lượng bạn thải ra!    │
│    Chỉ cần trích 6.8 kg để bù trừ ──► BẠN ĐẠT TRẠNG THÁI NET ZERO HOÀN TOÀN!     │
│    Còn dư thừa: +24.3 kg CO₂/ngày tích lũy thành tài sản thặng dư.              │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 7.2. Công thức Cân Bằng Phát Thải Ròng:

$$\text{Net } CO_2 = E_{daily} - C_{offset\_applied}$$

* Khi người dùng nhấn nút **"🌿 Bù Trừ Hôm Nay"**, hệ thống trích đúng $6.8\text{ kg } CO_2$ từ ví tín chỉ rừng để triệt tiêu lượng phát thải.
* Lượng phát thải ròng $\text{Net } CO_2$ trở về **$0.00\text{ kg } CO_2$**. Người dùng đạt trạng thái **Net-Zero Certified** trong ngày!
* Phần thặng dư $+24.3\text{ kg } CO_2$ còn lại tiếp tục được cộng dồn vào Balo để dùng cho các mục tiêu lớn hơn hoặc chuyển nhượng.

---

## 8. HỆ THỐNG GAMIFICATION, CHUỖI NET-ZERO STREAK & VINH DANH PROFILE

Nhằm kích thích tinh thần duy trì lối sống xanh liên tục, hệ thống tích hợp các yếu tố Game hóa sinh thái:

1. **Chuỗi Ngày Net Zero Liên Tiếp (Net-Zero Streak 🔥):**
   * Người dùng vào điểm danh, kiểm tra dấu chân carbon và thực hiện bù trừ mỗi ngày để duy trì chuỗi Streak.
   * Thưởng **+15 Trái Tim ❤️** và huy hiệu danh dự khi duy trì streak 7 ngày, 30 ngày, 100 ngày.
2. **Vòng Hào Quang Avatar Phát Sáng (Dynamic Profile Aura):**
   * Khi trạng thái hôm nay là Net Zero, ảnh đại diện Avatar trên trang cá nhân `yeutrongcay.com/:username` sẽ có vòng viền xanh lục bảo chuyển động phát sáng, hiển thị nhãn chứng thực xanh.
3. **Chứng Thư Bù Trừ Xanh Chia Sẻ Mạng Xã Hội:**
   * Cho phép xuất file ảnh chứng nhận chất lượng cao hoặc NFT Soulbound để chia sẻ lên Facebook, Zalo, LinkedIn.

---

## 9. THIẾT KẾ KIẾN TRÚC SMART CONTRACT REFI VAULT & GIÁM SÁT VỆ TINH dMRV

### 9.1. Interface Smart Contract Chuẩn EVM (`IForestReFiVault.sol`)

Hợp đồng thông minh được thiết kế trên mạng thử nghiệm Sepolia / Amoy với các hàm quản lý theo chu kỳ Ngày:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IForestReFiVault {
    enum ForestType { CUC_PHUONG, U_MINH_HA, CAN_GIO, BA_BE, BIDOUP }

    struct ForestLotStake {
        uint256 tokenId;
        address owner;
        ForestType forestType;
        uint256 stakedAt;
        uint256 lastClaimedEpochDay;
        uint256 accruedCreditsKg; // Tính bằng kilogram CO2
        bool isRetired;
    }

    // 1. Thế chấp NFT Lô Rừng vào Vault
    function stakeForestNFT(uint256 tokenId) external;

    // 2. Rút gốc NFT về ví
    function unstakeForestNFT(uint256 tokenId) external;

    // 3. Rút lãi tín chỉ carbon theo số ngày đã tích lũy
    function claimDailyCarbonYield(uint256 tokenId) external returns (uint256 kgClaimed);

    // 4. Bù trừ dấu chân carbon cá nhân trực tiếp on-chain
    function offsetDailyPersonalCarbon(uint256 tokenId, uint256 footprintKg) external returns (bool isNetZero);

    // Sự kiện on-chain
    event ForestNFTStaked(address indexed owner, uint256 indexed tokenId, ForestType forestType);
    event DailyCarbonClaimed(address indexed owner, uint256 indexed tokenId, uint256 kgAmount);
    event PersonalCarbonOffsetCompleted(address indexed owner, uint256 kgOffset, uint256 streakDays);
}
```

### 9.2. Giám sát viễn thám dMRV và An ninh Quốc gia:
* Hệ thống tích hợp ảnh vệ tinh Copernicus Sentinel-2 để đo chỉ số thảm thực vật NDVI định kỳ 30 ngày/lần.
* **Tuân thủ quy tắc An ninh Quốc phòng:** Tuyệt đối không lưu trữ hay công khai tọa độ GPS điểm chính xác của rừng. Tất cả các lô rừng được định danh theo Mã Landmark cột mốc thực địa công khai.

---

## 10. KẾT LUẬN & LỘ TRÌNH TRIỂN KHAI TÍNH NĂNG TRÊN YEUTRONGECAY.COM

Mô hình nghiên cứu trên đây đã kết hợp hài hòa giữa **Cơ sở khoa học lâm nghiệp chính xác**, **Chu kỳ thời gian thực tế theo ngày** và **Trải nghiệm giáo dục gần gũi với cuộc sống**.

### Kế hoạch triển khai kỹ thuật 3 bước:
1. **Giai đoạn 1:** Cập nhật công thức tính theo Ngày và bổ sung thẻ tương tác ReFi trên trang Web3 Sandbox.
2. **Giai đoạn 2:** Thêm Component `PersonalCarbonFootprintCard` vào trang **Hồ Sơ Cá Nhân (`PublicProfilePage.tsx`)** và **Vườn Của Tôi (`GardenPage.tsx`)**.
3. **Giai đoạn 3:** Kích hoạt hệ thống chuỗi ngày Net-Zero Streak và huy hiệu Avatar phát sáng cho toàn bộ cộng đồng Yêu Trồng Cây.

---

## 11. DANH MỤC TÀI LIỆU THAM KHẢO (APA 7TH FORMAT)

* Bộ Nông nghiệp và Phát triển Nông thôn. (2020). *Thông tư 33/2018/TT-BNNPTNT quy định về điều tra, kiểm kê và theo dõi diễn biến rừng*. Nhà xuất bản Nông nghiệp.
* Bộ Tài nguyên và Môi trường. (2022). *Báo cáo kỹ thuật: Hệ số phát thải của lưới điện Việt Nam*. Cục Biến đổi khí hậu.
* Intergovernmental Panel on Climate Change [IPCC]. (2006). *2006 IPCC Guidelines for National Greenhouse Gas Inventories: Volume 4 - Agriculture, Forestry and Other Land Use (AFOLU)*. Institute for Global Environmental Strategies (IGES).
* Intergovernmental Panel on Climate Change [IPCC]. (2019). *2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories*. IPCC.
* Viện Điều tra Quy hoạch Rừng [FIPI]. (2021). *Cơ sở dữ liệu sinh khối và trữ lượng carbon các trạng thái rừng tự nhiên tại Việt Nam*. NXB Khoa học Tự nhiên và Công nghệ.
* Verra. (2023). *VCS Methodology VM0007: REDD+ Methodology Framework (RMF)*. Verra Standard.
* World Resources Institute [WRI], & World Business Council for Sustainable Development [WBCSD]. (2004). *The Greenhouse Gas Protocol: A Corporate Accounting and Reporting Standard (Revised Edition)*. WRI/WBCSD.
