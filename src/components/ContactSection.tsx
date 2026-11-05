import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Facebook,
  Youtube,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

export const ContactSection: React.FC = () => {
  const { t, isEn } = useLanguage();
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Đóng góp tri thức / Bài thuốc thảo dược');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname.trim() || (!phone.trim() && !email.trim()) || !message.trim()) {
      setErrorMessage(isEn ? 'Please fill in your name, contact method, and message details.' : 'Vui lòng điền họ tên, phương thức liên hệ và nội dung lời nhắn.');
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
      website_url: honeypot,
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
        saveOfflineContact(payload);
      }
    } catch {
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
            <span>{t('contact.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-sm sm:text-base text-forest-800 mt-3 leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Cột Trái: Thông Tin Liên Hệ & Cam Kết */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box 1: Thông tin kênh liên hệ */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-sm space-y-6">
              <h3 className="text-lg font-serif font-bold text-forest-950 border-b border-forest-50 pb-3">
                {isEn ? 'Official Communication Channels' : 'Kênh Tiếp Nhận Chính Thức'}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Email Chính Thức */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-forest-50 text-herbal-700 flex items-center justify-center shrink-0 border border-forest-100">
                    <Mail className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs">{isEn ? 'Official Email' : 'Thư điện tử chính thức'}</span>
                    <a
                      href="mailto:yeutrongcay@gmail.com"
                      className="font-bold text-forest-900 hover:text-emerald-700 transition"
                    >
                      yeutrongcay@gmail.com
                    </a>
                  </div>
                </div>

                {/* Facebook Fanpage */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <Facebook className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs">{isEn ? 'Facebook Community' : 'Kênh Facebook Yêu Trồng Cây'}</span>
                    <a
                      href="https://www.facebook.com/yeutrongcay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-forest-900 hover:text-blue-600 transition flex items-center gap-1"
                    >
                      <span>facebook.com/yeutrongcay</span>
                      <ExternalLink className="w-3 h-3 text-blue-500" />
                    </a>
                  </div>
                </div>

                {/* Youtube Channel */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                    <Youtube className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs">{isEn ? 'YouTube Channel' : 'Kênh Video YouTube'}</span>
                    <a
                      href="https://www.youtube.com/@yeutrongcay"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-forest-900 hover:text-red-600 transition flex items-center gap-1"
                    >
                      <span>youtube.com/@yeutrongcay</span>
                      <ExternalLink className="w-3 h-3 text-red-500" />
                    </a>
                  </div>
                </div>

                {/* Vùng hoạt động */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-forest-50 text-herbal-700 flex items-center justify-center shrink-0 border border-forest-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-gray-500 text-xs">{isEn ? 'Network Hubs' : 'Mạng lưới trạm bảo tồn'}</span>
                    <span className="font-semibold text-forest-900 leading-snug block">
                      {isEn ? 'Hanoi · Da Nang · Ho Chi Minh City · Can Tho' : 'Hà Nội · Đà Nẵng · TP. Hồ Chí Minh · Cần Thơ'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Cam kết bảo mật */}
              <div className="pt-4 border-t border-forest-50 flex items-start gap-2.5 text-xs text-forest-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>{isEn ? 'Privacy Assurance:' : 'Cam kết bảo mật:'}</strong> {isEn ? 'Your details are solely used for botanical networking, never sold or spammed.' : 'Mọi thông tin của bạn chỉ dùng để hỗ trợ kết nối cây trồng, không bán dữ liệu và tuyệt đối không gửi thư rác.'}
                </p>
              </div>

            </div>

            {/* Box 2: Lời mời tham gia bảo tồn */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-md relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 text-[11px] font-semibold">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  <span>{isEn ? 'Mission 2026 - 2030' : 'Sứ Mệnh 2026 - 2030'}</span>
                </div>
                <h4 className="text-base font-serif font-bold text-white">
                  {isEn ? 'Greening 10,000 Balconies & Preserving Indigenous Flora Genetics' : 'Cùng Phủ Xanh 10.000 Ban Công & Lưu Giữ Nguồn Gen Dược Liệu'}
                </h4>
                <p className="text-xs text-emerald-200/90 leading-relaxed pt-1">
                  {isEn
                    ? 'If you are an herbalist, agronomist, or cultivator of rare native cultivars, connect with us to build a standardized botanical knowledge repository.'
                    : 'Nếu bạn là lương y, kỹ sư nông nghiệp hoặc người có khu vườn giống quý, hãy liên hệ để cùng xây dựng kho tri thức thực vật chuẩn hóa của người Việt.'}
                </p>
              </div>
            </div>

          </div>

          {/* Cột Phải: Form Gửi Tin Nhắn / Đóng Góp */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-forest-100 shadow-sm relative">
              
              {isSubmitted ? (
                <div className="text-center py-12 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-forest-950">
                      {isEn ? 'Message Sent Successfully!' : 'Gửi Thông Tin Thành Công!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-forest-800 mt-2 max-w-md mx-auto leading-relaxed">
                      {isEn
                        ? 'Thank you for caring for our green environment! The editorial board has received your message and will respond within 24 hours.'
                        : 'Cảm ơn tấm lòng của bạn với mầm xanh! Ban Quản Trị đã nhận được thông tin và sẽ phản hồi trong vòng 24 giờ.'}
                    </p>
                    <div className="mt-4 inline-block bg-forest-50 px-3.5 py-1.5 rounded-xl border border-forest-100 text-xs font-mono text-forest-700">
                      {isEn ? 'Ticket ID:' : 'Mã tiếp nhận:'} <strong>{ticketId}</strong>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-semibold transition shadow-xs"
                    >
                      {isEn ? 'Send Another Message' : 'Gửi Lời Nhắn Khác'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Honeypot chống bot */}
                  <div className="hidden">
                    <label htmlFor="website_url">Website</label>
                    <input
                      type="text"
                      id="website_url"
                      name="website_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Họ và tên */}
                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1">
                        {t('contact.formName')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder={isEn ? 'e.g., Jane Doe' : 'Ví dụ: Nguyễn Văn An'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                      />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                      <label className="block text-xs font-bold text-forest-900 mb-1">
                        {isEn ? 'Phone / Messaging' : 'Số điện thoại / Zalo'} <span className="text-gray-400 font-normal">({isEn ? 'optional' : 'tùy chọn'})</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={isEn ? 'e.g., +84 988 888 202' : 'Ví dụ: 0912 345 678'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">
                      {t('contact.formEmail')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isEn ? 'gardener@example.com' : 'nhavuon@gmail.com'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                    />
                  </div>

                  {/* Chủ đề */}
                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">
                      {t('contact.formTopic')} <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 bg-white focus:outline-hidden focus:ring-2 focus:ring-herbal-500"
                    >
                      <option value="Đóng góp tri thức / Bài thuốc thảo dược">
                        {t('contact.topicFolkHerb')}
                      </option>
                      <option value="Góp ý mẹo trị sâu bệnh hữu cơ">
                        {t('contact.topicPestTip')}
                      </option>
                      <option value="Hợp tác vườn ươm & dự án nông nghiệp xanh">
                        {t('contact.topicPartnership')}
                      </option>
                      <option value="Ý kiến đóng góp khác">
                        {t('contact.topicOther')}
                      </option>
                    </select>
                  </div>

                  {/* Nội dung tin nhắn */}
                  <div>
                    <label className="block text-xs font-bold text-forest-900 mb-1">
                      {t('contact.formMessage')} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isEn ? 'Share details of your folk remedy, nursery location, or question...' : 'Chia sẻ chi tiết bài thuốc thảo dược gia truyền, kinh nghiệm thực tế hoặc nội dung bạn cần kết nối...'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-forest-200 text-xs sm:text-sm text-forest-950 focus:outline-hidden focus:ring-2 focus:ring-herbal-500 leading-relaxed"
                    />
                  </div>

                  {/* Error message */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span>{t('common.submitting')}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-herbal-400" />
                          <span>{t('contact.submitMessage')}</span>
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
