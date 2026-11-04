import React from 'react';
import { Coins, Scissors, Coffee, Home, ShoppingBag, ArrowRight } from 'lucide-react';

export const MonetizationSection: React.FC = () => {
  const blueprints = [
    {
      icon: <Scissors className="w-6 h-6 text-herbal-600" />,
      title: 'Nhân Giống & Chiết Cành Tại Gia',
      description: 'Từ 1 cây Đinh Lăng nếp hoặc 1 cây Ổi lê mẹ, kỹ thuật chiết cành - giâm cành tạo ra 30 - 50 bầu cây giống thuần hữu cơ mỗi tháng với chi phí chỉ vài nghìn đồng tiền bầu xơ dừa.',
      roi: 'Vốn 200k → Doanh thu 1.5 - 2 triệu/tháng',
    },
    {
      icon: <Coffee className="w-6 h-6 text-amber-600" />,
      title: 'Chế Biến Sâu Trà & Siro Thảo Dược',
      description: 'Tự sấy mộc trà tía tô sả chanh túi lọc hoặc nấu siro húng chanh - quất đường phèn mật ong đóng chai thủy tinh tiệt trùng bán cho bạn bè và cộng đồng xung quanh vào mùa giao mùa.',
      roi: 'Lợi nhuận gộp 60% - 70%',
    },
    {
      icon: <Home className="w-6 h-6 text-blue-600" />,
      title: 'Dịch Vụ Setup "Tủ Thuốc Ban Công"',
      description: 'Nhận thiết kế kệ tầng ban công 3m² trọn gói gồm 8 loại thảo dược thiết yếu (húng chanh, tía tô, lá lốt, diếp cá...) cho các gia đình có con nhỏ ở căn hộ chung cư.',
      roi: '1.5 triệu - 3 triệu / gói setup',
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-terracotta-600" />,
      title: 'Tiếp Thị Liên Kết Vật Tư Chọn Lọc',
      description: 'Đánh giá đất trộn chuyên dụng, đèn quang hợp bổ sung nắng cho nhà phố và hệ thống tưới tự động hẹn giờ. Nhận hoa hồng 8% - 15% từ các nhà sản xuất uy tín.',
      roi: 'Thu nhập thụ động không cần ôm hàng',
    },
  ];

  return (
    <section id="monetization" className="py-16 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta-50 text-terracotta-700 text-xs font-semibold mb-3 border border-terracotta-200">
            <Coins className="w-3.5 h-3.5" />
            <span>Biến Đam Mê Thành Thu Nhập Bền Vững</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-900 tracking-tight mb-3">
            Bản Đồ Kiếm Tiền Từ Vườn Nhà
          </h2>
          <p className="text-sm sm:text-base text-charcoal-800 font-sans">
            Không cần đất ruộng rộng lớn, bạn hoàn toàn có thể tạo ra thu nhập thực tế hàng tháng chỉ từ góc ban công hoặc sân thượng nhỏ.
          </p>
        </div>

        {/* 4 Blueprints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blueprints.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 hover:border-terracotta-300 shadow-sm hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-forest-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-800/85 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-forest-50 flex items-center justify-between">
                <span className="text-xs font-semibold text-herbal-700 bg-herbal-50 px-3 py-1 rounded-full border border-herbal-100">
                  {item.roi}
                </span>
                <span className="text-xs font-medium text-forest-700 flex items-center gap-1 cursor-pointer hover:text-forest-900">
                  Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
