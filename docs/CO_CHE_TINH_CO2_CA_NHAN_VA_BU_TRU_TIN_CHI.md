# BÁO CÁO NGHIÊN CỨU: TÍNH DẤU CHÂN CARBON CÁ NHÂN HẰNG NGÀY & CƠ CHẾ BÙ TRỪ BẰNG TÍN CHỈ RỪNG TRONG HỒ SƠ CÁ NHÂN (PROFILE NET-ZERO ENGINE)

> **Mã văn kiện:** RES-PROFILE-PERSONAL-CARBON-OFFSET-V1  
> **Áp dụng cho:** Hồ sơ cá nhân (`PublicProfilePage.tsx`), Hệ thống ReFi & Danh bạ Hộ Chiếu Thực Vật Số  
> **Cơ sở khoa học:** Tiêu chuẩn GHG Protocol (Phát thải Phạm vi cá nhân Scope 1 & 2), Bộ Tài nguyên & Môi trường Việt Nam, IPCC AFOLU.  
> **Mục tiêu:** Cho phép người dùng đo lường lượng $CO_2$ phát thải hằng ngày ($kg\text{ } CO_2/\text{ngày}$) và dùng Tín chỉ Carbon ($tCO_2$ / $kg\text{ } CO_2$) tạo ra từ NFT Rừng / Vườn cây để bù trừ tức thì, đạt danh hiệu **"Công Dân Net Zero 🌿"**.

---

## 1. Ý NGHĨA CHIẾN LƯỢC & TÂM LÝ HỌC HÀNH VI

Hầu hết người dùng phổ thông nghe về "Tín chỉ Carbon" hay "Net Zero 2050" như những khái niệm vĩ mô xa vời của các tập đoàn công nghiệp. 

Việc tích hợp **Bộ Tính Dấu Chân Carbon Cá Nhân Hằng Ngày** trực tiếp vào **Hồ Sơ Cá Nhân (Profile)** mang lại bước đột phá về mặt trải nghiệm giáo dục:
1. **Lượng hóa lối sống cụ thể:** Người dùng nhận biết được mỗi hành vi đời thường (chạy xe máy, bật điều hòa, ăn uống) phát thải bao nhiêu $kg\text{ } CO_2$.
2. **Hiện thực hóa giá trị của NFT Rừng:** Người dùng thấy rõ Lô rừng $10.000\text{ m}^2$ của mình hấp thụ tới **$31.1\text{ kg } CO_2/\text{ngày}$**, thừa sức "gánh" toàn bộ lượng khí thải hàng ngày của cá nhân họ (~$6 - 8\text{ kg } CO_2/\text{ngày}$).
3. **Cảm giác tự hào & Tương tác mạng xã hội:** Đạt trạng thái **"Hôm nay tôi đã Net Zero 🌿"**, nhận huy hiệu phát sáng trên Profile công khai `yeutrongcay.com/:username` để chia sẻ cho bạn bè.

---

## 2. BỘ CÔNG THỨC TÍNH DẤU CHÂN CARBON CÁ NHÂN HẰNG NGÀY

Dựa trên hệ số phát thải thực tế tại Việt Nam (Bộ TN&MT và Quy chuẩn Quốc tế GHG Protocol), lượng phát thải hàng ngày của một cá nhân ($E_{daily}$, đơn vị $kg\text{ } CO_2/\text{ngày}$) được tổng hợp từ 4 trụ cột lối sống:

$$E_{daily} = E_{transport} + E_{energy} + E_{diet} + E_{waste}$$

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      4 TRỤ CỘT PHÁT THẢI CARBON HẰNG NGÀY CỦA CÁ NHÂN                  │
├────────────────────┬───────────────────────────────────────────┬───────────────────────┤
│ 1. Di chuyển       │ Xe máy xăng / Ô tô / Xe buýt / Xe đạp     │ $1.0 - 5.0\text{ kg}$ │
│ 2. Điện sinh hoạt  │ Quạt, máy lạnh, máy tính, thiết bị bếp    │ $1.5 - 6.0\text{ kg}$ │
│ 3. Khẩu phần ăn    │ Bữa ăn nhiều thịt đỏ / gia cầm / ăn chay  │ $1.5 - 4.5\text{ kg}$ │
│ 4. Tiêu dùng & Rác │ Rác phân loại / rác vô cơ / đồ dùng 1 lần │ $0.2 - 1.0\text{ kg}$ │
└────────────────────┴───────────────────────────────────────────┴───────────────────────┘
```

### 2.1. Chi tiết 4 thành phần phát thải:

1. **Phương tiện di chuyển hàng ngày ($E_{transport}$)**:
   * **Xe máy xăng phổ thông**: $0.09\text{ kg } CO_2/\text{km}$ (trung bình 15 km/ngày $\rightarrow$ **$1.35\text{ kg } CO_2$**).
   * **Ô tô xăng cá nhân**: $0.22\text{ kg } CO_2/\text{km}$ (trung bình 15 km/ngày $\rightarrow$ **$3.30\text{ kg } CO_2$**).
   * **Xe buýt công cộng**: $0.04\text{ kg } CO_2/\text{km}$ (trung bình 15 km/ngày $\rightarrow$ **$0.60\text{ kg } CO_2$**).
   * **Xe đạp / Đi bộ / Xe điện sạc pin mặt trời**: **$0.00\text{ kg } CO_2$**.
2. **Năng lượng gia đình ($E_{energy}$)** (Hệ số phát thải lưới điện Việt Nam $\approx 0.72\text{ kg } CO_2/\text{kWh}$):
   * **Mức cơ bản** (đèn, quạt, sạc điện thoại, laptop): $\approx 2.5\text{ kWh/ngày} \rightarrow$ **$1.80\text{ kg } CO_2$**.
   * **Mức trung bình** (có bật điều hòa 3-4 tiếng/ngày): $\approx 6.0\text{ kWh/ngày} \rightarrow$ **$4.32\text{ kg } CO_2$**.
   * **Mức cao** (điều hòa chạy suốt đêm, bình nước nóng): $\approx 10.0\text{ kWh/ngày} \rightarrow$ **$7.20\text{ kg } CO_2$**.
3. **Chế độ ăn uống ($E_{diet}$)**:
   * **Chế độ nhiều thịt đỏ (thịt bò, cừu)**: **$4.50\text{ kg } CO_2/\text{ngày}$**.
   * **Chế độ cân bằng (thịt gà, cá, trứng, rau)**: **$2.50\text{ kg } CO_2/\text{ngày}$**.
   * **Chế độ ăn chay / thuần thực vật**: **$1.20\text{ kg } CO_2/\text{ngày}$**.
4. **Rác thải sinh hoạt ($E_{waste}$)**:
   * **Có phân loại rác & ủ phân compost**: **$0.20\text{ kg } CO_2/\text{ngày}$**.
   * **Không phân loại, dùng nhiều đồ nhựa 1 lần**: **$0.80\text{ kg } CO_2/\text{ngày}$**.

---

### 2.2. Bảng phân nhóm lối sống cá nhân tại Việt Nam:

| Nhóm Lối Sống | Đặc Điểm Thường Ngày | Tổng Phát Thải / Ngày ($kg\text{ } CO_2$) | Phát Thải / Năm ($tấn\text{ } CO_2$) |
| :--- | :--- | :---: | :---: |
| 🌿 **Lối Sống Xanh (Eco Hero)** | Đi xe đạp/xe buýt, ăn chay/nhiều rau, dùng điện tiết kiệm, ủ rác | **$3.2\text{ kg } CO_2$** | $1.17\text{ tấn}$ |
| 🛵 **Người Đô Thị Phổ Thông** | Đi xe máy 15km, ăn uống đa dạng, dùng điều hòa 4h/ngày | **$6.8\text{ kg } CO_2$** | $2.48\text{ tấn}$ |
| 🚗 **Phát Thải Cao (High Carbon)** | Đi ô tô riêng, ăn nhiều thịt bò, điều hòa chạy cả ngày lẫn đêm | **$16.5\text{ kg } CO_2$** | $6.02\text{ tấn}$ |

---

## 3. CƠ CHẾ BÙ TRỪ VỚI TÍN CHỈ RỪNG TRONG HỒ SƠ CÁ NHÂN

### 3.1. Đối chiếu Lực Hấp Thụ của NFT Rừng vs Phát Thải Cá Nhân

Dựa trên công thức lâm nghiệp chuẩn theo Ngày đã nghiên cứu:

$$\Delta C_{daily} = 31.1\text{ kg } CO_2/\text{ngày} \quad (\text{1 NFT Lô Rừng Cúc Phương } 10.000\text{ m}^2)$$

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

### 3.2. Công thức Cân Bằng Phát Thải Ròng (Net Carbon Balance):

$$\text{Net } CO_2 = E_{daily} - C_{offset\_applied}$$

* Khi $\text{Net } CO_2 = 0$: Đạt chuẩn **Net Zero Hàng Ngày (100% Carbon Neutral)**.
* Khi $\text{Net } CO_2 < 0$: Đạt chuẩn **Khí Hậu Dương (Climate Positive / Carbon Negative)** - Đóng góp làm sạch bầu khí quyển!

---

## 4. THIẾT KẾ TRẢI NGHIỆM NGƯỜI DÙNG (PROFILE UI & WORKFLOW)

Trong giao diện `PublicProfilePage.tsx` hoặc Tab Hồ Sơ Cá Nhân:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  🌿 NHẬT KÝ DẤU CHÂN CARBON & MỤC TIÊU NET ZERO CỦA BẠN (HÔM NAY)                │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   [Vòng Tròn Tiến Trình Xanh]      Dấu chân hôm nay: 6.8 kg CO₂                  │
│       ● ĐÃ BÙ TRỪ 100%             Tín chỉ sẵn có:   31.1 kg CO₂ (Từ Lô Rừng #01)│
│          NET ZERO 🌿               Số dư sau bù trừ: +24.3 kg CO₂ (Thặng dư)     │
│                                                                                  │
│   Tùy chọn cấu hình nhanh lối sống hôm nay:                                      │
│   • Di chuyển: [🚲 Xe đạp: 0kg]  [🛵 Xe máy: 1.4kg (Đang chọn)]  [🚗 Ô tô: 3.3kg]│
│   • Điều hòa:  [❄️ Không dùng: 0kg] [❄️ 4 tiếng: 2.5kg (Đang chọn)] [❄️ Cả ngày] │
│   • Khẩu phần: [🥗 Thuần chay: 1.2kg] [🍲 Cân bằng: 2.5kg] [🥩 Nhiều thịt: 4.5kg]│
│                                                                                  │
│   ┌──────────────────────────────────────────────────────────────────────────┐   │
│   │  [🌿 BẤM ĐỂ BÙ TRỪ 6.8 KG CO₂ BẰNG TÍN CHỈ RỪNG (+15 TIM ❤️)]           │   │
│   └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                  │
│   🏆 Chuỗi Net-Zero liên tiếp: 🔥 12 Ngày Liên Tục                               │
│   🏅 Huy hiệu hồ sơ: "CÔNG DÂN KHÍ HẬU XANH THÁNG 11/2026"                       │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. HỆ THỐNG GAMIFICATION & HUY HIỆU DANH DỰ (BADGES & KARMA)

1. **Chuỗi Ngày Net Zero Liên Tiếp (Net-Zero Streak 🔥)**:
   * Tương tự cơ chế giữ chuỗi của Duolingo hay Strava: Mỗi ngày vào chọn lối sống và bấm nút bù trừ $\rightarrow$ Giữ vững chuỗi streak.
   * Thưởng **+15 Trái Tim ❤️** và điểm danh tiếng Nông dân sinh thái mỗi ngày duy trì Net Zero.
2. **Vòng Viền Avatar Phát Sáng (Dynamic Profile Aura)**:
   * Trên trang cá nhân `yeutrongcay.com/:username`, avatar của người dùng có vòng viền xanh lục bảo chuyển động phát sáng kèm biểu tượng chiếc lá `Net-Zero Certified`.
3. **Xuất Chứng Thư Xanh Cá Nhân (Shareable Net-Zero Certificate)**:
   * Cho phép tải ảnh chứng thư hoặc chia sẻ lên Facebook/Zalo/LinkedIn:
     *"Tôi đã đạt Net Zero trong 30 ngày liên tục nhờ bảo trợ 1 hecta rừng nguyên sinh Cúc Phương qua Yêu Trồng Cây!"*.

---

## 6. LỘ TRÌNH TRIỂN KHAI KỸ THUẬT

1. **Bước 1 (Dữ liệu)**: Thêm trường `daily_carbon_settings` và `carbon_offset_history` vào `UserPublicProfileConfig` trong `plantPassportRegistryService.ts`.
2. **Bước 2 (Giao diện Profile)**: Thêm Component `PersonalCarbonFootprintCard` vào `src/pages/PublicProfilePage.tsx` và `src/pages/GardenPage.tsx`.
3. **Bước 3 (Khớp nối Tín chỉ)**: Khi người dùng bấm "Bù trừ hôm nay", khấu trừ số $kg\text{ } CO_2$ tương ứng khỏi số dư tín chỉ tích lũy từ Lô Rừng, ghi nhận giao dịch và kích hoạt hiệu ứng chúc mừng tưng bừng.

---
*Báo cáo nghiên cứu tính năng Hồ Sơ Net Zero Cá Nhân - Dự án yeutrongcay.com.*
