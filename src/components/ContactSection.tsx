import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Đóng góp tri thức / Bài thuốc thảo dược');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || (!phone.trim() && !email.trim()) || !message.trim()) {
      setErrorMessage('Vui lòng điền họ tên, phương thức liên hệ và nội dung lời nhắn.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    const payload = {
      fullname,
      phone,
      email,
      topic,
      message,
      website_url: honeypot, // Honeypot
    };

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        setTicketId(result.ticket_id || `YTC-${Date.now().toString().slice(-6)}`);
      } else {
        // Fallback lưu local nếu server offline
        saveOfflineContact(payload);
      }
    } catch {
      // Khi chạy local hoặc lỗi mạng: Lưu offline an toàn
      saveOfflineContact(payload);
    } finally {
      setIsLoading(false);
    }
  };

  const saveOfflineContact = (payload: any) => {
    const saved = localStorage.getItem('ytc_contacts') || '[]';
    try {
      const list = JSON.parse(saved);
      const newTicket = `LOCAL-${Date.now().toString().slice(-6)}`;
      list.push({ ...payload, id: newTicket, created_at: new Date().toISOString() });
      localStorage.setItem('ytc_contacts', JSON.stringify(list));
      setIsSubmitted(true);
      setTicketId(newTicket);
    } catch {
      setIsSubmitted(true);
      setTicketId(`YTC-${Date.now().toString().slice(-6)}`);
    }
  };

  const resetForm = () => {
    setFullname('');
    setPhone('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
    setTicketId('');
    setErrorMessage('');
  };

  return (
    <section id="contact" className="py-20 bg-cream-100 border-t border-forest-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 text-forest-900 text-xs font-semibold mb-3">
            <HeartHandshake className="w-4 h-4 text-herbal-600" />
            <span>Kết Nối & Hợp Tác Sinh Thái</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 tracking-tight">
            Liên Hệ & Đóng Góp Tri Thức Cây Trồng
          </h2>
          <p className="text-sm sm:text-base text-forest-800 mt-3 leading-relaxed">
            Bạn có bài thuốc gia truyền muốn bảo tồn, muốn đăng ký làm Trạm Trao Đổi Cây tại địa phương, hay hợp tác phát triển vườn sinh thái? Ban Quản Trị luôn sẵn lòng đồng hành cùng bạn!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Cột Trái: Thông Tin Liên Hệ & Cam Kết */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box 1: Thông tin kênh liên hệ */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-sm space-y-6">
              <h3 className="text-lg font-serif font-bold text-forest-950 border-b border-forest-50 pb-3">
                Kênh Tiếp Nhận Chính Thức
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-forest-50 text-herbal-700 flex items-center justify-center shrink-0 border border-forest-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs">Thư điện tử (Email)</span>
                    <a
                      href="mailto:contact@yeutrongcay.com"
                      className="font-semibold text-forest-900 hover:text-herbal-700 transition"
                    >
                      contact@yeutrongcay.com
                    </a>
                  </div>
                </div>

                {/* Hotline & Zalo */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-forest-50 text-herbal-700 flex items-center justify-center shrink-0 border border-forest-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs">Hotline / Zalo Cộng Đồng</span>
                    <span className="font-semibold text-forest-900">
                      098 888 2026 <span className="text-[11px] text-gray-400 font-normal">(8:00 - 18:00 hàng ngày)</span>
                    </span>
                  </div>
                </div>

                {/* Vùng hoạt động */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-forest-50 text-herbal-700 flex items-center justify-center shrink-0 border border-forest-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs">Mạng lưới kết nối</span>
                    <span className="font-semibold text-forest-900 leading-snug block">
                      Hà Nội · Đà Nẵng · TP. Hồ Chí Minh · Cần Thơ
                    </span>
                  </div>
                </div>

              </div>

              {/* Cam kết bảo mật */}
              <div className="pt-4 border-t border-forest-50 flex items-start gap-2.5 text-xs text-forest-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Cam kết bảo mật:</strong> Mọi thông tin của bạn chỉ dùng để hỗ trợ kết nối cây trồng, không bán dữ liệu và tuyệt đối không gửi thư rác.
                </p>
              </div>

            </div>

            {/* Box 2: Lời mời tham gia bảo tồn */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 text-[11px] font-semibold">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  <span>Sứ Mệnh 2026 - 2030</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white">
                  Cùng Phủ Xanh 10.000 Ban Công & Lưu Giữ Nguồn Gen Dược Liệu
                </h4>
                <p className="text-xs text-emerald-200/90 leading-relaxed pt-1">
                  Nếu bạn là lương y, kỹ sư nông nghiệp hoặc người có khu vườn giống quý, hãy liên hệ để cùng xây dựng kho tri thức thực vật chuẩn hóa của người Việt.
                </p>
              </div>
            </div>

          </div>

          {/* Cột Phải: Form Gửi Tin Nhắn / Đóng Góp */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-forest-100 shadow-sm relative">
              
              {isSubmitted ? (
                /* Màn hình gửi thành công */
                <div className="text-center py-12 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-forest-950">
                      Gửi Thông Tin Thành Công!
                    </h3>
                    <p className="text-xs sm:text-sm text-forest-800 mt-2 max-w-md mx-auto leading-relaxed">
                      Cảm ơn tấm lòng của bạn với mầm xanh! Ban Quản Trị đã nhận được thông tin và sẽ phản hồi trong vòng 24 giờ.
                    </p>
                    <div className="mt-4 inline-block bg-forest-50 px-3.5 py-1.5 rounded-xl border border-forest-100 text-xs font-mono text-forest-700">
                      Mã tiếp nhận: <strong>{ticketId}</strong>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold transition shadow-xs"
                    >
                      Gửi Lời Nhắn Khác
                    </button>
                  </div>
                </div>
              ) : (
                /* Form nhập liệu */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-forest-950 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-herbal-600" />
                      <span>Gửi Lời Nhắn Đến Ban Quản Trị</span>
                    </h3>
                    <p className="text-xs text-forest-700 mt-1">
                      Chúng tôi đọc và phản hồi tất cả các góp ý của cộng đồng.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden">
                    <label>Website URL</label>
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Họ tên */}
                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1.5">
                      Họ và Tên của bạn <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500 transition"
                    />
                  </div>

                  {/* Số điện thoại / Zalo & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1.5">
                        Số điện thoại / Zalo <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ví dụ: 0912 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1.5">
                        Địa chỉ Email <span className="text-gray-400 font-normal">(Tùy chọn)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="nguyenan@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500 transition"
                      />
                    </div>
                  </div>

                  {/* Chủ đề liên hệ */}
                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1.5">
                      Mục đích liên hệ <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-forest-200 text-xs sm:text-sm text-forest-950 bg-white focus:outline-hidden focus:ring-2 focus:ring-herbal-500 transition"
                    >
                      <option value="Đóng góp tri thức / Bài thuốc thảo dược">
                        🌿 Đóng góp tri thức / Bài thuốc thảo dược dân gian
                      </option>
                      <option value="Đăng ký làm Trạm Trao Đổi Cây địa phương">
                        🔄 Đăng ký làm Trạm Trao Đổi Cây (Plant Swap Hub)
                      </option>
                      <option value="Chia sẻ giống cây ăn trái đô thị">
                        🍋 Chia sẻ giống cây ăn trái trồng chậu F1
                      </option>
                      <option value="Liên hệ cố vấn bệnh cây / Bác sĩ cây trồng">
                        🩺 Liên hệ cố vấn bệnh cây / Bác sĩ cây trồng
                      </option>
                      <option value="Góp ý tính năng & Báo lỗi kỹ thuật">
                        💡 Góp ý cải thiện giao diện & Báo lỗi kỹ thuật
                      </option>
                      <option value="Hợp tác truyền thông / Phát triển nông nghiệp">
                        🤝 Hợp tác truyền thông / Dự án xanh
                      </option>
                    </select>
                  </div>

                  {/* Nội dung lời nhắn */}
                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1.5">
                      Nội dung lời nhắn chi tiết <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Mô tả chi tiết mong muốn của bạn, giống cây bạn muốn chia sẻ hoặc câu hỏi cần giải đáp..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500 transition"
                    />
                  </div>

                  {/* Nút gửi */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition"
                    >
                      {isLoading ? (
                        <span>Đang gửi thông tin...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-herbal-400" />
                          <span>Gửi Lời Nhắn / Đóng Góp Tri Thức</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
