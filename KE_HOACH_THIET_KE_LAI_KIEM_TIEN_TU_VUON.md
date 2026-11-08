# KẾ HOẠCH TỔNG THỂ NÂNG CẤP & TÁI THIẾT KẾ CHUYÊN TRANG
# KINH TẾ XANH, NÔNG NGHIỆP SỐ & TUẦN HOÀN ĐÔ THỊ
## BẢN THIẾT KẾ KIẾN TRÚC TOÀN DIỆN VÒNG 3: CÔNG CỤ TÍNH TOÁN THỰC THI, MA TRẬN 24 BÀI VIẾT CON SEO/AEO/GEO & HỆ THỐNG PHỤC VỤ BOT THẾ HỆ MỚI
### (Cổng tổng hợp: https://yeutrongcay.com/kiem-tien-tu-vuon & 6 Chuyên mục độc lập cấp cao nhất)

> **HỘI ĐỒNG THẨM ĐỊNH & KIẾN TRÚC ĐA NGÀNH (ROUND 3 AUDIT)**:
> - 🌿 **Chuyên gia Nông nghiệp & Sinh thái học Đô thị**
> - 💻 **Kỹ sư Thiết kế Phần mềm Cao cấp (Principal Software Architect)**
> - 🛡️ **Kỹ sư An toàn & Bảo mật Thông tin Cao cấp (Principal Security Engineer)**
> - 🎨 **Kỹ sư Thiết kế Trải nghiệm & Giao diện Người dùng (Lead UI/UX Designer)**
>
> **Trạng thái**: Bản kế hoạch chuẩn hóa sản xuất (Production-Ready Master Blueprint)  
> **Cam kết tuân thủ**: **TUYỆT ĐỐI CHƯA CODE CHO ĐẾN KHI ĐƯỢC PHÊ DUYỆT BỞI NGƯỜI DÙNG**  
> **Thời điểm cập nhật**: 08/11/2026  
> **Dự án**: Yêu Trồng Cây (yeutrongcay.com)  
> **Định vị cốt lõi**: **NỀN TẢNG NÔNG NGHIỆP ĐÔ THỊ TÍNH TOÁN (COMPUTATIONAL URBAN AGRICULTURE) — KẾT HỢP CÔNG CỤ TƯƠNG TÁC GIỮ CHÂN NGƯỜI DÙNG VÀ MA TRẬN NỘI DUNG CHUẨN SEO/AEO/GEO ĐỂ AI & CỖ MÁY TÌM KIẾM TRÍCH DẪN**

---

## MỤC LỤC CHI TIẾT
1. [Báo Cáo Thẩm Định Đa Ngành Vòng 3: Bốn Điểm Nghẽn Sâu & Giải Pháp Nâng Cấp](#1-báo-cáo-thẩm-định-đa-ngành-vòng-3-bốn-điểm-nghẽn-sâu--giải-pháp-nâng-cấp)
   - 1.1. Nông nghiệp: Bảng thay thế vật tư đô thị & An toàn độc học cho trẻ em/thú cưng
   - 1.2. Kiến trúc phần mềm: Phân tách Metadata siêu nhẹ vs Dynamic Content & Prerendering Bot
   - 1.3. Bảo mật: SafeLocalStorage versioning & Cơ chế bảo vệ bản quyền tri thức
   - 1.4. UI/UX: Print-to-Garden CSS khổ A5 & Chế độ tương tác không phân mảnh
2. [Chiến Lược Tiếp Cận Tam Giác: SEO - AEO - GEO](#2-chiến-lược-tiếp-cận-tam-giác-seo---aeo---geo)
3. [Bảng Quy Hoạch URL Toàn Diện: 6 Chuyên Mục Độc Lập & 24 Bài Viết](#3-bảng-quy-hoạch-url-toàn-diện-6-chuyên-mục-độc-lập--24-bài-viết)
4. [Hệ Thống 6 Bộ Công Cụ Thuật Toán & Mô Phỏng Tương Tác Cốt Lõi (The 6 Interactive Engines)](#4-hệ-thống-6-bộ-công-cụ-thuật-toán--mô-phỏng-tương-tác-cốt-lõi-the-6-interactive-engines)
5. [Chi Tiết Ma Trận 24 Bài Viết Chuẩn SEO - AEO - GEO Theo Từng Chuyên Mục](#5-chi-tiết-ma-trận-24-bài-viết-chuẩn-seo---aeo---geo-theo-từng-chuyên-mục)
   - Chuyên mục 1: Vườn Ươm & Nhân Giống Vô Tính (`/vuon-uom-nhan-giong`)
   - Chuyên mục 2: Chế Biến Sâu & Dược Liệu Thủ Công (`/che-bien-sau-duoc-lieu`)
   - Chuyên mục 3: Dịch Vụ Thiết Kế & Thi Công Vườn Ban Công (`/dich-vu-setup-ban-cong`)
   - Chuyên mục 4: Kinh Tế Tuần Hoàn & Tái Chế Sinh Thái (`/kinh-te-tuan-hoan`)
   - Chuyên mục 5: Canh Tác Vi Mô & Siêu Thực Phẩm (`/canh-tac-sieu-toc`)
   - Chuyên mục 6: Nông Nghiệp Thông Minh & Tự Động Hóa Vi Khí Hậu (`/nong-nghiep-thong-minh`)
6. [Quy Chuẩn Cấu Trúc Nội Dung Chuẩn Hóa SEO - AEO - GEO](#6-quy-chuẩn-cấu-trúc-nội-dung-chuẩn-hóa-seo---aeo---geo)
7. [Kiến Trúc Kỹ Thuật Phần Mềm & Giải Pháp Phục Vụ Bot Tìm Kiếm (Software Architecture)](#7-kiến-trúc-kỹ-thuật-phần-mềm--giải-pháp-phục-vụ-bot-tìm-kiếm-software-architecture)
   - 7.1. Cấu trúc thư mục module hóa `src/data/monetization/` & `src/engines/`
   - 7.2. Tách lớp Metadata nhẹ (~15KB) và nạp động nội dung bài viết (Dynamic Import)
   - 7.3. Cơ chế Server-Side Bot Prerendering qua Apache/Plesk `.htaccess` & `api/og_render.php`
   - 7.4. Cấu hình định tuyến Router trong `App.tsx`
8. [Chiến Lược An Toàn & Bảo Mật Thông Tin Toàn Diện (Security & InfoSec)](#8-chiến-lược-an-toàn--bảo-mật-thông-tin-toàn-diện-security--infosec)
9. [Móc Nối Tương Thích Với Hệ Sinh Thái Yêu Trồng Cây](#9-móc-nối-tương-thích-với-hệ-sinh-thái-yêu-trồng-cây)
10. [Lộ Trình Triển Khai Thực Thi 5 Giai Đoạn (Phased Roadmap)](#10-lộ-trình-triển-khai-thực-thi-5-giai-đoạn-phased-roadmap)
11. [Bộ Tiêu Chuẩn Nghiệm Thu Đa Chiều (Multi-Disciplinary DoD)](#11-bộ-tiêu-chuẩn-nghiệm-thu-đa-chiều-multi-disciplinary-dod)

---

## 1. BÁO CÁO THẨM ĐỊNH ĐA NGÀNH VÒNG 3: BỐN ĐIỂM NGHẼN SÂU & GIẢI PHÁP NÂNG CẤP

Tại đợt thẩm định vòng 3, Hội đồng đã soi xét kỹ lưỡng các góc khuất thực tế từ khâu trải nghiệm người dùng ngoài ban công đến cơ chế lập chỉ mục của các AI Search Engine (Perplexity, GPTBot, Google SGE):

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│               HỘI ĐỒNG THẨM ĐỊNH ĐA NGÀNH: BÁO CÁO KHUYẾN NGHỊ VÒNG 3                           │
├────────────────────┬────────────────────┬───────────────────────┬───────────────────────────────┤
│  NÔNG NGHIỆP &     │  KIẾN TRÚC PHẦN    │  AN TOÀN & BẢO        │  THIẾT KẾ TRẢI                │
│  SINH THÁI HỌC     │  MỀM CAO CẤP       │  MẬT THÔNG TIN        │  NGHIỆM UI/UX                 │
│                    │                    │                       │                               │
│ • Vật tư đô thị    │ • Cần tách lớp     │ • Cần SafeLocalStorage│ • Print-to-Garden CSS:        │
│   khó kiếm: Cần    │   Metadata nhẹ     │   versioning chống lỗi│   In thẻ tóm tắt A5 mộc       │
│   Bảng thay thế    │   khỏi Content     │   crash ứng dụng cũ   │   không tốn mực ra vườn       │
│ • Cảnh báo độc tính│ • Bot AI cào HTML  │ • Tự động gắn nguồn   │ • Hộp công thức động          │
│   với trẻ em/thú cưng  trắng: Cần SSR   │   trích dẫn khi người │   chuyển đổi 2 chế độ:        │
│ • Quy tắc vệ sinh  │   Prerender qua    │   dùng copy văn bản   │   Xem nhanh vs Tinh chỉnh     │
│   nấm mầm 3 KHÔNG  │   Plesk .htaccess  │   bản quyền (>100 từ) │   tham số sâu                 │
└────────────────────┴────────────────────┴───────────────────────┴───────────────────────────────┘
```

### 1.1. Góc Nhìn Nông Nghiệp: Bảng Thay Thế Vật Tư Đô Thị & An Toàn Sinh Học
1. **Bảng Thay Thế Nguyên Liệu Đô Thị (Urban Substitutions Matrix)**:
   - Nhiều tài liệu truyền thống đòi hỏi nguyên liệu khó tiếp cận tại chung cư (như cành liễu tươi ngâm nước kích rễ, đất phù sa bãi sông, phân chuồng hoai mục).
   - *Giải pháp*: Cung cấp công thức tương đương từ các nguyên liệu đô thị sẵn có:
     - *Thay cành liễu bằng*: Nước dừa non tươi pha loãng (giàu cytokinin và khoáng chất) + 1 thìa cà phê bột quế nguyên chất (kháng nấm tự nhiên cực mạnh).
     - *Thay đất phù sa sông bằng*: Giá thể hữu cơ đóng bao (đã xử lý mụn dừa + trấu hun + đất đỏ bazan) bán sẵn tại mọi tiệm cây cảnh trong bán kính 1km.
2. **Cảnh Báo Độc Học Cho Trẻ Em & Thú Cưng (Pet & Child Safety Toxicity)**:
   - Một số thảo dược như lá ngải cứu nếu mèo ăn phải có thể gây kích ứng thần kinh; nhựa nha đam tươi nếu dính vào mắt trẻ nhỏ gây bỏng rát.
   - *Giải pháp*: Mọi bài viết dược liệu đều có huy hiệu cảnh báo độc học minh bạch: 🟢 *An toàn tuyệt đối cho chó mèo* hoặc 🟡 *Để xa tầm với của thú cưng/trẻ sơ sinh*.
3. **Quy Tắc An Toàn Vi Sinh "3 KHÔNG" Cho Nấm & Mầm**:
   - Mùa nồm ẩm miền Bắc ($RH > 90\%$) rất dễ phát sinh nấm mốc đen *Aspergillus*.
   - *Quy tắc*: (1) Không thu hoạch rau mầm bị thâm nhũn rễ; (2) Không ăn nấm có sợi tơ chuyển màu xanh nhớt; (3) Luôn tráng nước ozone hoặc ngâm muối 0.9% trước khi ăn sống.

### 1.2. Góc Nhìn Kiến Trúc Phần Mềm: Tách Lớp Metadata & Server-Side Prerendering
1. **Phân Tách Lớp Metadata Siêu Nhẹ vs Dynamic Content**:
   - Toàn bộ 24 bài viết nếu nạp chung một lúc sẽ làm tăng dung lượng bundle khởi tạo.
   - *Giải pháp*:
     - Tạo tệp `src/data/monetization/articleMetadata.ts` (kích thước siêu nhẹ ~15KB): Chỉ chứa các trường phục vụ danh sách, bộ lọc, thẻ tóm tắt và breadcrumb (`id`, `slug`, `categorySlug`, `title`, `excerpt`, `metrics`, `readTime`).
     - Tách riêng toàn bộ nội dung chi tiết bài viết (markdown dài, danh sách SOP) vào từng file riêng trong thư mục `src/data/monetization/articles/` và nạp động (Dynamic Lazy Import) khi người dùng truy cập.
2. **Server-Side Bot Prerendering Cho Plesk/Apache**:
   - Khi bot AI (PerplexityBot, GPTBot, Google-InspectionTool) truy cập URL `/vuon-uom-nhan-giong/nhan-giong-ban-cong-micro-nursery`, nếu máy chủ chỉ trả về thẻ HTML rỗng của SPA, bot có thể không chạy JavaScript kịp và bỏ lỡ toàn bộ dữ liệu AEO/GEO!
   - *Giải pháp*: Cấu hình file `.htaccess` trên máy chủ Plesk nhận diện User-Agent của bot tìm kiếm và điều hướng qua endpoint `api/og_render.php` để sinh sẵn thẻ Title, Meta Description, Thẻ OpenGraph và Schema JSON-LD đầy đủ ngay từ máy chủ!

### 1.3. Góc Nhìn An Toàn Thông Tin: SafeLocalStorage & Bảo Vệ Bản Quyền Tri Thức
1. **SafeLocalStorage Versioning**:
   - Khi người dùng lưu checklist hoặc kết quả tính toán vào trình duyệt, dữ liệu được bọc trong cấu trúc có phiên bản: `{ _version: 2, data: { ... } }`. Nếu phiên bản schema trong code nâng cấp, hàm tự động chuyển đổi (auto-migrate) an toàn, triệt tiêu 100% lỗi crash do dữ liệu cũ.
2. **Cơ Chế Tự Động Gắn Bản Quyền Khi Copy (Copy Attribution)**:
   - Khi người dùng hoặc bot tự động copy đoạn văn bản dài hơn 100 ký tự từ bài viết, hệ thống tự động chèn thêm dòng xuất xứ: *"Nguồn trích dẫn: Yêu Trồng Cây (https://yeutrongcay.com/...)"* vào clipboard, bảo vệ bản quyền sở hữu trí tuệ của nền tảng.

### 1.4. Góc Nhìn UI/UX: Print-to-Garden CSS Khổ A5 & Trải Nghiệm Tương Tác
1. **Print-to-Garden Stylesheet Chuẩn Khổ A5**:
   - Bổ sung cấu trúc `@media print`: Ẩn toàn bộ navbar, footer, các thanh trượt và nút bấm rườm rà.
   - Trang in tự động co lại thành một thẻ SOP khổ A5 đen trắng tinh khiết, có mã QR trỏ về bài viết gốc, bảng nguyên liệu tỷ lệ vàng và các ô checkbox để người làm vườn mang trực tiếp ra ban công dùng bút chì tích chọn mà không lo ướt điện thoại!
2. **Hộp Công Thức Động Chuyển Đổi 2 Chế Độ**:
   - *Tab 1 - Quick View*: Hiển thị tóm tắt nhanh công thức chuẩn cho mẻ nhỏ thông dụng.
   - *Tab 2 - Interactive Lab*: Cho phép nhập khối lượng nguyên liệu thực tế có sẵn, các con số nhảy mượt mà (smooth counter transition).

---

## 2. CHIẾN LƯỢC TIẾP CẬN TAM GIÁC: SEO - AEO - GEO

```
                                KIẾN TRÚC TAM GIÁC THU HÚT & GIỮ CHÂN
                                                  ▲
                                                 / \
                                                /   \
                                               / SEO \
                                              /       \
                                             / (Google \
                                            /   Top 1)  \
                                           /─────────────\
                                          /               \
                                         /       AEO       \
                                        /  (Google AI /     \
                                       /   Featured Snippet) \
                                      /───────────────────────\
                                     /                         \
                                    /            GEO            \
                                   /  (Perplexity / SearchGPT /  \
                                  /       Gemini Citations)       \
                                 └─────────────────────────────────┘
                                                  │
                                                  ▼
                                 ┌─────────────────────────────────┐
                                 │ BỘ CÔNG CỤ TÍNH TOÁN TƯƠNG TÁC  │
                                 │ (GIỮ CHÂN & BIẾN THÀNH HÀNH ĐỘNG│
                                 └─────────────────────────────────┘
```

1. **SEO (Search Engine Optimization)**: Chiếm lĩnh thứ hạng cao nhất trên Google thông qua ma trận 24 bài viết ngách giải quyết đúng Search Intent.
2. **AEO (Answer Engine Optimization)**: Trở thành câu trả lời trực diện trong Google AI Overviews, Bing Copilot và tìm kiếm giọng nói qua khối **Direct Answer Block 45-55 từ**.
3. **GEO (Generative Engine Optimization)**: Cung cấp dữ liệu định lượng, công thức hóa học, danh pháp La-tinh và Schema JSON-LD đa tầng để Perplexity, SearchGPT và Gemini trích dẫn làm tài liệu dẫn chứng chuẩn mực.
4. **Interactive Engines**: Giữ chân người dùng ở lại trên trang web, loại trừ hoàn toàn nguy cơ người dùng chỉ đọc lướt qua hoặc bỏ sang chat với AI thông thường.

---

## 3. BẢNG QUY HOẠCH URL TOÀN DIỆN: 6 CHUYÊN MỤC ĐỘC LẬP & 24 BÀI VIẾT

Toàn bộ hệ thống được phân thành **6 Chuyên mục độc lập cấp cao nhất**, **6 Bài viết Pillar Masterclass** và **18 Bài viết con chuyên sâu** (Tổng cộng 24 bài viết chuẩn hóa):

| STT | Chuyên Mục Độc Lập | Bài Viết Pillar Masterclass (Kèm Engine Tương Tác) | 3 Bài Viết Con Chuyên Sâu (Chuẩn SEO - AEO - GEO) |
| :---: | :--- | :--- | :--- |
| **1** | **Vườn Ươm & Nhân Giống Vô Tính**<br>`/vuon-uom-nhan-giong` | `/nhan-giong-ban-cong-micro-nursery`<br>*(Substrate Mixer Radar 4D)* | 1. `/ky-thuat-giam-canh-dinh-lang-nep`<br>2. `/chiet-canh-oi-le-bonsai-ban-cong`<br>3. `/giam-canh-huong-thao-rosemary-khong-thoi-goc` |
| **2** | **Chế Biến Sâu & Dược Liệu Thủ Công**<br>`/che-bien-sau-duoc-lieu` | `/che-bien-sau-siro-tra-thao-moc`<br>*(Dynamic Herbal Brix Engine)* | 1. `/cach-nau-siro-hung-chanh-quat-duong-phen`<br>2. `/tu-lam-tra-tia-to-sa-chanh-say-lanh`<br>3. `/muoi-ngam-chan-thao-duoc-dinh-lang-la-lot` |
| **3** | **Dịch Vụ Thiết Kế & Thi Công Vườn**<br>`/dich-vu-setup-ban-cong` | `/dich-vu-setup-tu-thuoc-ban-cong`<br>*(Visual Balcony Solar Stager)* | 1. `/trong-cay-ban-cong-huong-tay-chiu-nang-gat`<br>2. `/cong-thuc-tron-dat-trong-rau-ban-cong-3-nam`<br>3. `/he-thong-tuoi-nho-giot-ban-cong-khong-can-bom` |
| **4** | **Kinh Tế Tuần Hoàn & Tái Chế Sinh Thái**<br>`/kinh-te-tuan-hoan` | `/kinh-te-tuan-hoan-nuoi-trun-que-ban-cong`<br>*(Bio-Waste C:N Balancer)* | 1. `/cach-nuoi-trun-que-thung-xop-trong-can-ho`<br>2. `/u-rac-nha-bep-bang-men-bokashi-khong-hoi`<br>3. `/tu-lam-than-sinh-hoc-biochar-tai-gia` |
| **5** | **Canh Tác Vi Mô & Siêu Thực Phẩm**<br>`/canh-tac-sieu-toc` | `/rau-mam-microgreens-nam-an-do-thi`<br>*(Fast-Cycle Batch Planner)* | 1. `/cach-trong-rau-mam-sup-lo-xanh-sulforaphane`<br>2. `/trong-nam-so-nam-bao-ngu-ke-ban-cong`<br>3. `/kinh-doanh-rau-mam-cho-be-an-dam-ban-kinh-2km` |
| **6** | **Nông Nghiệp Thông Minh & Tự Động Hóa**<br>`/nong-nghiep-thong-minh`| `/cam-bien-iot-tu-dong-hoa-ban-cong`<br>*(Smart Irrigation & Solar Sizer)* | 1. `/tu-che-cam-bien-do-am-dat-esp32`<br>2. `/den-led-quang-hop-full-spectrum-cho-can-ho`<br>3. `/nhan-dien-sau-benh-bang-ai-bac-si-cay` |

---

## 4. HỆ THỐNG 6 BỘ CÔNG CỤ THUẬT TOÁN & MÔ PHỎNG TƯƠNG TÁC CỐT LÕI (THE 6 INTERACTIVE ENGINES)

1. **Substrate Mixer Radar 4D** (`/vuon-uom-nhan-giong`): Cân bằng hóa lý giá thể vô trùng giâm cành ($EC \le 0.8\ mS/cm$, $pH = 5.8-6.5$, Độ xốp $\ge 25\%$).
2. **Dynamic Herbal Brix Engine** (`/che-bien-sau-duoc-lieu`): Co giãn công thức theo số gam lá húng chanh có sẵn, đo độ khúc xạ tự bảo quản $62-65^\circ Bx$.
3. **Visual Balcony Solar Stager** (`/dich-vu-setup-ban-cong`): Mô phỏng mặt bằng 2D kệ tầng, tính tích phân ánh sáng DLI và tải trọng an toàn ban công.
4. **Bio-Waste C:N Balancer** (`/kinh-te-tuan-hoan`): Cân bằng tỷ lệ Carbon:Nitơ ($25:1 \le C:N \le 30:1$), đo kim áp suất vi sinh, cảnh báo khí Amoniac.
5. **Fast-Cycle Batch Planner** (`/canh-tac-sieu-toc`): Lập lịch thu hoạch rau mầm và nấm ăn xoay vòng cuốn chiếu dạng Timeline Gantt mini.
6. **Smart Irrigation & Solar Sizer** (`/nong-nghiep-thong-minh`): Tính toán thủy lực tưới, công suất pin mặt trời và ắc quy dự phòng 3 ngày mưa.

---

## 5. CHI TIẾT MA TRẬN 24 BÀI VIẾT CHUẨN SEO - AEO - GEO THEO TỪNG CHUYÊN MỤC

### CHUYÊN MỤC 1: `/vuon-uom-nhan-giong` (VƯỜN ƯƠM & NHÂN GIỐNG VÔ TÍNH)
1. **Pillar Masterclass**: `/vuon-uom-nhan-giong/nhan-giong-ban-cong-micro-nursery` — *Kỹ Thuật Nhân Giống Vô Tính Tại Gia (Micro-Nursery): Biến 2m² Ban Công Thành Vườn Ươm 60 Bầu Cây Giống Mỗi Tháng* (Kèm Substrate Mixer).
2. **Sub 1.1**: `/vuon-uom-nhan-giong/ky-thuat-giam-canh-dinh-lang-nep` — *Cách Giâm Cành Đinh Lăng Nếp Chuẩn Dược Liệu: 100% Bén Rễ Sau 14 Ngày*.
3. **Sub 1.2**: `/vuon-uom-nhan-giong/chiet-canh-oi-le-bonsai-ban-cong` — *Kỹ Thuật Chiết Cành Ổi Lê Đài Loan Trong Bầu Xơ Dừa: Vốn 5k Thu 65k Sau 30 Ngày*.
4. **Sub 1.3**: `/vuon-uom-nhan-giong/giam-canh-huong-thao-rosemary-khong-thoi-goc` — *Bí Quyết Giâm Cành Hương Thảo (Rosemary) Chống Thối Đen Cổ Rễ Bách Phát Bách Trúng*.

### CHUYÊN MỤC 2: `/che-bien-sau-duoc-lieu` (CHẾ BIẾN SÂU & DƯỢC LIỆU THỦ CÔNG)
1. **Pillar Masterclass**: `/che-bien-sau-duoc-lieu/che-bien-sau-siro-tra-thao-moc` — *Artisanal Herbalism: Chuẩn Hóa Quy Trình Sản Xuất Siro Ho & Trà Thảo Mộc Đạt Chuẩn An Toàn Dược Lý Tại Gia* (Kèm Dynamic Herbal Brix Engine).
2. **Sub 2.1**: `/che-bien-sau-duoc-lieu/cach-nau-siro-hung-chanh-quat-duong-phen` — *Công Thức Nấu Siro Húng Chanh Quất Đường Phèn Chuẩn Dược Liệu Trị Ho Cho Trẻ Nhỏ*.
3. **Sub 2.2**: `/che-bien-sau-duoc-lieu/tu-lam-tra-tia-to-sa-chanh-say-lanh` — *Quy Trình Tự Làm Trà Tía Tô Sả Chanh Túi Lọc Sấy Mộc Giữ Trọn Dược Tính Tại Nhà*.
4. **Sub 2.3**: `/che-bien-sau-duoc-lieu/muoi-ngam-chan-thao-duoc-dinh-lang-la-lot` — *Tự Làm Muối Khoáng Ngâm Chân Dược Liệu Đinh Lăng Lá Lốt Giúp Ngủ Sâu & Giảm Đau Khớp*.

### CHUYÊN MỤC 3: `/dich-vu-setup-ban-cong` (DỊCH VỤ THIẾT KẾ & THI CÔNG VƯỜN BAN CÔNG)
1. **Pillar Masterclass**: `/dich-vu-setup-ban-cong/dich-vu-setup-tu-thuoc-ban-cong` — *Dịch Vụ Thiết Kế & Lắp Đặt "Tủ Thuốc Ban Công Tự Dưỡng": Mô Hình Kinh Doanh Dịch Vụ Sinh Lời Cao Cho Căn Hộ Đô Thị* (Kèm Visual Balcony Solar Stager).
2. **Sub 3.1**: `/dich-vu-setup-ban-cong/trong-cay-ban-cong-huong-tay-chiu-nang-gat` — *Giải Pháp Thiết Kế Vườn Thảo Dược Cho Ban Công Hướng Tây Nắng Gắt Tầng Cao*.
3. **Sub 3.2**: `/dich-vu-setup-ban-cong/cong-thuc-tron-dat-trong-rau-ban-cong-3-nam` — *Công Thức Phối Trộn Đất Sống (Living Soil) Cho Ban Công 3 Năm Không Phải Thay Đất*.
4. **Sub 3.3**: `/dich-vu-setup-ban-cong/he-thong-tuoi-nho-giot-ban-cong-khong-can-bom` — *Tự Lắp Hệ Thống Tưới Nhỏ Giọt Ban Công Tự Chảy Trọng Lực: Không Cần Bơm Điện*.

### CHUYÊN MỤC 4: `/kinh-te-tuan-hoan` (KINH TẾ TUẦN HOÀN & TÁI CHẾ SINH THÁI)
1. **Pillar Masterclass**: `/kinh-te-tuan-hoan/kinh-te-tuan-hoan-nuoi-trun-que-ban-cong` — *Khép Kín Vòng Dinh Dưỡng: Biến 100% Rác Thải Nhà Bếp Thành Phân Trùn Quế & Trà Trùn Vi Sinh Phục Vụ Nông Nghiệp Đô Thị* (Kèm Bio-Waste C:N Balancer).
2. **Sub 4.1**: `/kinh-te-tuan-hoan/cach-nuoi-trun-que-thung-xop-trong-can-ho` — *Hướng Dẫn Nuôi Trùn Quế Thùng Xốp Trong Căn Hộ Chung Cư Tuyệt Đối Không Có Mùi Hôi*.
3. **Sub 4.2**: `/kinh-te-tuan-hoan/u-rac-nha-bep-bang-men-bokashi-khong-hoi` — *Cách Tự Làm Thùng Ủ Rác Nhà Bếp Bokashi Bằng Men Vi Sinh Bản Địa Thu Dịch Tưới Cây*.
4. **Sub 4.3**: `/kinh-te-tuan-hoan/tu-lam-than-sinh-hoc-biochar-tai-gia` — *Cách Làm & Hoạt Hóa Than Sinh Học (Biochar) Từ Vỏ Trấu và Cành Cây Khô Cố Định Carbon*.

### CHUYÊN MỤC 5: `/canh-tac-sieu-toc` (CANH TÁC VI MÔ & SIÊU THỰC PHẨM)
1. **Pillar Masterclass**: `/canh-tac-sieu-toc/rau-mam-microgreens-nam-an-do-thi` — *Nông Nghiệp Vi Mô Siêu Cao Sản: Khởi Nghiệp Rau Mầm Dinh Dưỡng Cao (Microgreens) & Phôi Nấm Treo Kệ Vòng Quay 7 Ngày* (Kèm Fast-Cycle Batch Planner).
2. **Sub 5.1**: `/canh-tac-sieu-toc/cach-trong-rau-mam-sup-lo-xanh-sulforaphane` — *Quy Trình Trồng Mầm Súp Lơ Xanh Siêu Sulforaphane Thu Hoạch Chuẩn 7 Ngày*.
3. **Sub 5.2**: `/canh-tac-sieu-toc/trong-nam-so-nam-bao-ngu-ke-ban-cong` — *Kinh Nghiệm Treo 20 Bịch Phôi Nấm Sò Tại Ban Công: Thu Hoạch 2kg Nấm Tươi Mỗi Tuần*.
4. **Sub 5.3**: `/canh-tac-sieu-toc/kinh-doanh-rau-mam-cho-be-an-dam-ban-kinh-2km` — *Kế Hoạch Khởi Nghiệp Rau Mầm Sạch Cung Cấp Cho Gia Đình Ăn Dặm Trong Cùng Chung Cư*.

### CHUYÊN MỤC 6: `/nong-nghiep-thong-minh` (NÔNG NGHIỆP THÔNG MINH & TỰ ĐỘNG HÓA)
1. **Pillar Masterclass**: `/nong-nghiep-thong-minh/cam-bien-iot-tu-dong-hoa-ban-cong` — *Nông Nghiệp Số Ban Công: Tự Ráp Hệ Thống Cảm Biến IoT Siêu Rẻ & Tự Động Hóa Vi Khí Hậu Kết Nối Bác Sĩ Cây AI* (Kèm Smart Irrigation & Solar Sizer).
2. **Sub 6.1**: `/nong-nghiep-thong-minh/tu-che-cam-bien-do-am-dat-esp32` — *Hướng Dẫn Tự Làm Cảm Biến Độ Ẩm Đất Dung Kháng ESP32 Chi Phí Dưới 100k Báo Qua Smartphone*.
3. **Sub 6.2**: `/nong-nghiep-thong-minh/den-led-quang-hop-full-spectrum-cho-can-ho` — *Cách Chọn Đèn LED Quang Hợp Cho Căn Hộ Thiếu Sáng: Đo PPFD & DLI Thực Tế*.
4. **Sub 6.3**: `/nong-nghiep-thong-minh/nhan-dien-sau-benh-bang-ai-bac-si-cay` — *Ứng Dụng Thị Giác Máy Tính AI Nhận Diện Sớm Bệnh Vàng Lá, Rệp Sáp & Thiếu Dinh Dưỡng*.

---

## 6. QUY CHUẨN CẤU TRÚC NỘI DUNG CHUẨN HÓA SEO - AEO - GEO

Mọi bài viết con đều tuân thủ **Cấu trúc 4 Khối Vàng (The 4 Golden Blocks)**:
1. **Khối 1: Direct Answer Block (AEO / AI Overviews)**: Đoạn tóm tắt trực diện **45 - 55 từ in đậm** trả lời ngay câu hỏi tìm kiếm cốt lõi.
2. **Khối 2: Dữ Liệu Định Lượng & Bảng Thực Nghiệm (GEO / Perplexity / SearchGPT)**: Danh pháp thực vật La-tinh, thông số nhiệt độ, độ ẩm, độ Brix, tỷ lệ C:N, bảng so sánh.
3. **Khối 3: Quy Trình SOP Đánh Số `<ol><li>` (Google HowTo Snippet)**: Các bước rõ ràng kèm ảnh WebP, mẹo Pro-Tip và nút in thẻ SOP khổ A5.
4. **Khối 4: FAQ Schema & Internal Link Mesh**: 3-5 câu hỏi thường gặp khai báo Schema `FAQPage`, kèm liên kết ngữ cảnh trỏ về Pillar Page và các bài viết con liên quan.

---

## 7. KIẾN TRÚC KỸ THUẬT PHẦN MỀM & GIẢI PHÁP PHỤC VỤ BOT TÌM KIẾM (SOFTWARE ARCHITECTURE)

### 7.1. Cấu Trúc Thư Mục Module Hóa Sạch Sẽ
```
src/
├── data/
│   └── monetization/
│       ├── categories.ts                   # Định nghĩa 6 Danh mục Độc lập
│       ├── articleMetadata.ts              # METADATA SIÊU NHẸ (~15KB) CHO CẢ 24 BÀI VIẾT
│       ├── articles/                       # NỘI DUNG NẠP ĐỘNG (DYNAMIC LAZY IMPORT)
│       │   ├── microNurseryPillar.ts
│       │   ├── dinhLangNepCutting.ts
│       │   ├── guavaAirLayering.ts
│       │   ├── rosemaryStemCutting.ts
│       │   └── ... (các bài viết con khác)
│       └── index.ts                        # Barrel export & Helper query functions
│
├── engines/
│   └── monetization/                       # 6 MODULE THUẬT TOÁN PURE TYPESCRIPT
│       ├── SubstrateMixerEngine.ts
│       ├── HerbalBrixEngine.ts
│       ├── BalconySolarStagerEngine.ts
│       ├── BioWasteCnBalancerEngine.ts
│       ├── FastCycleBatchEngine.ts
│       └── SmartIrrigationSolarEngine.ts
│
├── components/
│   └── monetization/                       # 6 WIDGET TƯƠNG TÁC GIAO DIỆN
│       ├── SubstrateMixerWidget.tsx
│       ├── HerbalBrixWidget.tsx
│       ├── BalconySolarStagerWidget.tsx
│       ├── BioWasteCnBalancerWidget.tsx
│       ├── FastCycleBatchWidget.tsx
│       └── SmartIrrigationSolarWidget.tsx
```

### 7.2. Tách Lớp Metadata Nhẹ vs Nạp Động Nội Dung
```typescript
// src/data/monetization/articleMetadata.ts (File siêu nhẹ nạp tức thì)
export interface ArticleMetaSummary {
  id: string;
  categorySlug: string;
  slug: string;
  titleVi: string;
  titleEn: string;
  excerptVi: string;
  excerptEn: string;
  readTimeMinutes: number;
  authorName: string;
  lastUpdated: string;
  isPillar: boolean;
  directAnswerSnippetVi: string;
}

export const ARTICLES_METADATA_REGISTRY: ArticleMetaSummary[] = [
  // 24 bài viết rút gọn, phục vụ Category Listing & SEO Breadcrumb siêu nhanh
];
```

### 7.3. Cơ Chế Server-Side Bot Prerendering Trên Máy Chủ Plesk/Apache
Cấu hình `.htaccess` trên máy chủ để phục vụ Bot tìm kiếm và AI Crawler:
```apache
# Phát hiện Bot tìm kiếm & AI Crawler
RewriteCond %{HTTP_USER_AGENT} (googlebot|bingbot|perplexitybot|gptbot|claudebot|baiduspider|twitterbot|facebookexternalhit) [NC]
RewriteCond %{REQUEST_URI} ^/(vuon-uom-nhan-giong|che-bien-sau-duoc-lieu|dich-vu-setup-ban-cong|kinh-te-tuan-hoan|canh-tac-sieu-toc|nong-nghiep-thong-minh)/?.*$ [NC]
RewriteRule ^(.*)$ /api/og_render.php?route=$1 [L,QSA]
```
File `api/og_render.php` sẽ render sẵn toàn bộ thẻ `<title>`, `<meta name="description">`, `<meta property="og:...">` và thẻ Schema JSON-LD đầy đủ cho Bot ngay từ tầng server, giúp điểm lập chỉ mục AEO/GEO đạt mức tối đa 100%!

### 7.4. Cấu Hình React Router Trong `src/App.tsx`
```tsx
// 1. Cổng Master Hub
<Route path="/kiem-tien-tu-vuon" element={<MonetizationPage />} />

// 2. 6 Category Độc Lập Cấp 1
<Route path="/vuon-uom-nhan-giong" element={<MonetizationCategoryPage categorySlug="vuon-uom-nhan-giong" />} />
<Route path="/che-bien-sau-duoc-lieu" element={<MonetizationCategoryPage categorySlug="che-bien-sau-duoc-lieu" />} />
<Route path="/dich-vu-setup-ban-cong" element={<MonetizationCategoryPage categorySlug="dich-vu-setup-ban-cong" />} />
<Route path="/kinh-te-tuan-hoan" element={<MonetizationCategoryPage categorySlug="kinh-te-tuan-hoan" />} />
<Route path="/canh-tac-sieu-toc" element={<MonetizationCategoryPage categorySlug="canh-tac-sieu-toc" />} />
<Route path="/nong-nghiep-thong-minh" element={<MonetizationCategoryPage categorySlug="nong-nghiep-thong-minh" />} />

// 3. Toàn bộ 24 Bài Viết Chuyên Sâu (Pillar & Sub-articles) chạy qua Route 2 phân đoạn chuẩn Silo:
<Route path="/:categorySlug/:slug" element={<MonetizationArticlePage />} />

// 4. Tuyến Profile Người Dùng nằm sau
<Route path="/:username" element={<PublicProfilePage currentUser={currentUser} />} />
```

---

## 8. CHIẾN LƯỢC AN TOÀN & BẢO MẬT THÔNG TIN TOÀN DIỆN (SECURITY & INFOSEC)

1. **Khử trùng XSS Bằng DOMPurify**: Toàn bộ nội dung Markdown và HTML phong phú của 24 bài viết đều được khử trùng nghiêm ngặt.
2. **SafeLocalStorage Versioning**: Tránh lỗi crash ứng dụng do dữ liệu cũ không tương thích schema.
3. **Bảo Vệ Bản Quyền Tự Động (Copy Attribution)**: Tự động đính kèm liên kết nguồn khi người dùng copy đoạn văn dài > 100 từ.
4. **Rate Limiting & MD5 Caching**: Cho toàn bộ ảnh xem trước OpenGraph trên server Plesk.
5. **Web3 Read-Only**: Gọi dữ liệu on-chain không đòi hỏi ký ví.

---

## 9. MÓC NỐI TƯƠNG THÍCH VỚI HỆ SINH THÁI YÊU TRỒNG CÂY

- **Trạm Đổi Cây (`/trao-doi-cay`)**: Đăng bán cành giống F1 ngay dưới bài giâm cành.
- **Bác Sĩ Cây AI (`/bac-si-cay-trong`)**: Chẩn đoán bệnh cây tức thì trong bài sâu bệnh và tự động hóa.
- **Vườn Của Tôi (`/vuon-cua-toi`)**: Nút *"Lưu quy trình vào sổ tay canh tác"*.
- **Web3 Sandbox (`/web3-sandbox`)**: Huy hiệu minh chứng nguồn gốc gen cây mẹ trên Blockchain.

---

## 10. LỘ TRÌNH TRIỂN KHAI THỰC THI 5 GIAI ĐOẠN (PHASED ROADMAP)

> **LƯU Ý QUAN TRỌNG**: Toàn bộ nội dung dưới đây chỉ là kế hoạch. **Tôi TUYỆT ĐỐI CHƯA THỰC HIỆN BẤT KỲ DÒNG CODE NÀO CHO ĐẾN KHI NHẬN ĐƯỢC CHỈ THỊ CẤP PHÉP CHÍNH THỨC TỪ BẠN.**

```
[BƯỚC HIỆN TẠI]
Gửi bản Kế hoạch Hoàn thiện Vòng 3 (Engine Tương tác + 24 Bài viết SEO/AEO/GEO + SSR Prerender) để Bạn duyệt
                              │
                              ▼ (Khi Bạn phê duyệt và cho phép bắt đầu)
[GIAI ĐOẠN 1: PHÁT TRIỂN 6 MODULE THUẬT TOÁN PURE TS (SRC/ENGINES/)]
- Lập trình 6 engine tính toán: SubstrateMixer, HerbalBrix, BalconyStager...
- Viết unit test xác thực tính chính xác của công thức toán học/sinh học.
                              │
                              ▼
[GIAI ĐOẠN 2: THIẾT KẾ 6 WIDGET TƯƠNG TÁC (SRC/COMPONENTS/MONETIZATION/)]
- Dựng giao diện tương tác: Radar 4D, Đồng hồ C:N, Sơ đồ Balcony 2D, Timeline Gantt...
- Tối ưu phản hồi kéo thả mượt mà dưới 16ms.
                              │
                              ▼
[GIAI ĐOẠN 3: XÂY DỰNG CƠ SỞ DỮ LIỆU METADATA & 24 BÀI VIẾT CON CHUẨN HÓA]
- Tạo `articleMetadata.ts` nhẹ và 24 module bài viết nạp động trong `src/data/monetization/articles/`.
- Cấu hình song ngữ VI/EN trong `src/i18n/`.
                              │
                              ▼
[GIAI ĐOẠN 4: XÂY DỰNG TRANG CHUYÊN MỤC VÀ TRANG ĐỌC BÀI ĐỘC BẢN]
- Tạo `MonetizationCategoryPage.tsx` và `MonetizationArticlePage.tsx`.
- Tích hợp Sticky TOC, Reading Progress Bar, Thumb-zone Bar, Outdoor Contrast Mode và Print-to-Garden CSS khổ A5.
- Khử trùng an toàn DOMPurify chống XSS.
                              │
                              ▼
[GIAI ĐOẠN 5: TỐI ƯU CỔNG HUB /kiem-tien-tu-vuon, CẤU HÌNH PRERENDER, TEST BUILD & BÀN GIAO]
- Nâng cấp `Circular Bio-ROI Engine 2.0` tại cổng Hub.
- Cấu hình `.htaccess` phục vụ Bot AI và Schema JSON-LD đa tầng (`BreadcrumbList`, `Article`, `HowTo`, `FAQPage`).
- Kiểm thử responsive toàn diện và xác nhận lệnh `npm run build` không lỗi.
```

---

## 11. BỘ TIÊU CHUẨN NGHIỆM THU ĐA CHIỀU (MULTI-DISCIPLINARY DOD)

1. **Chuẩn Mực SEO - AEO - GEO**: Cả 24 bài viết đều sở hữu khối Answer Block trực diện 45-55 từ; có dữ liệu định lượng và tên khoa học rõ ràng; máy chủ Plesk hỗ trợ SSR Prerender phục vụ Bot tìm kiếm; khai báo Schema JSON-LD đầy đủ giúp Google và Perplexity dễ dàng trích xuất dẫn nguồn.
2. **Chuẩn Mực Tính Toán & Tương Tác**: 6 bộ công cụ tương tác phản ánh chính xác các định luật hóa lý/sinh học; người dùng có thể thao tác kéo thả và mô phỏng trực quan, vượt trội hoàn toàn câu trả lời văn bản tĩnh của LLMs.
3. **Chuẩn Mực Định Tuyến Độc Lập**: 6 Category chạy trên URL cấp 1 (`/vuon-uom-nhan-giong`, `/kinh-te-tuan-hoan`...), 24 bài viết chạy trên URL 2 cấp (`/:categorySlug/:slug`); không có xung đột route với `/:username`.
4. **Chuẩn Mực Trải Nghiệm Thực Địa**: Hỗ trợ CSS in ấn khổ A5 đen trắng tinh khiết mang ra vườn; bảng thay thế vật tư đô thị dễ kiếm; cảnh báo độc tính cho thú cưng và trẻ nhỏ.
5. **Chuẩn Mực An Toàn & Hiệu Năng**: Đạt điểm Google Lighthouse $\ge 90$; nội dung khử trùng XSS 100%; không có link affiliate; build Vite thành công không lỗi TypeScript.

---
*Kế hoạch được cập nhật và phê chuẩn bởi Antigravity — Hệ sinh thái Yêu Trồng Cây.*  
*Đang ở trạng thái chờ lệnh: Chưa thực hiện bất kỳ thay đổi mã nguồn nào cho đến khi có sự cho phép của bạn!*
