import React from 'react';
import { PlantCategory } from '../types/index.ts';
import { Sparkles, Shield, Leaf, Coins } from 'lucide-react';

interface HeroProps {
  activeMode: PlantCategory;
  onExploreMonetization: () => void;
  onOpenClinic: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  activeMode,
  onExploreMonetization,
  onOpenClinic,
}) => {
  const modeData = {
    herb: {
      badge: 'Dược Thực Đồng Nguyên - Nam Dược Trị Nam Nhân',
      title: 'Tủ Thuốc Tự Nhiên & Kháng Sinh Xanh Tại Ban Công',
      description: 'Khám phá các loại thảo dược bản địa Việt Nam vừa làm rau gia vị thơm ngon mỗi ngày, vừa là vị thuốc cứu cánh trị ho, giải cảm, bổ khí huyết an toàn cho cả gia đình.',
      stat1: '100% Thuần Tự Nhiên',
      stat2: 'Không Kháng Sinh Hóa Học',
    },
    fruit: {
      badge: 'Nông Nghiệp Đô Thị & Trái Ngọt Sân Thượng',
      title: 'Tự Tay Hái Trái Chín Mọng Trong Chậu Sân Nhà',
      description: 'Bí quyết chọn giống cây ăn trái lùn nhanh cho quả: Ổi lê, cóc Thái, sung Mỹ mật ngọt, chanh tứ quý trĩu quả quanh năm chỉ với diện tích ban công 3m².',
      stat1: 'Thu Hoạch Sau 4 Tháng',
      stat2: 'Nông Sản Sạch 0 Đồng',
    },
    ornamental: {
      badge: 'Thẩm Mỹ Không Gian Sống & Tĩnh Tâm Thư Thái',
      title: 'Nghệ Thuật Bonsai, Hoa Thơm & Phong Thủy Tài Lộc',
      description: 'Thanh lọc không khí ô nhiễm đô thị, xua đuổi muỗi và tạo tác những tác phẩm cây cảnh phong thủy mang lại sinh khí, may mắn và sự thư thái tâm hồn.',
      stat1: 'Lọc Bụi Mịn & Đuổi Muỗi',
      stat2: 'Vượng Khí Tài Lộc',
    },
  }[activeMode];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-forest-50/50 via-cream-100 to-cream-100 border-b border-forest-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-100/80 border border-forest-200 text-forest-900 text-xs sm:text-sm font-medium mb-6 animate-fade-in shadow-sm">
            <Sparkles className="w-4 h-4 text-herbal-600" />
            <span>{modeData.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-forest-900 tracking-tight leading-tight mb-5">
            {modeData.title}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-charcoal-800/90 leading-relaxed mb-8 font-sans max-w-2xl mx-auto">
            {modeData.description}
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={onOpenClinic}
              className="px-6 py-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-medium text-sm sm:text-base flex items-center gap-2 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              <Leaf className="w-5 h-5 text-herbal-500" />
              <span>Chẩn Đoán Bệnh Cây (3s)</span>
            </button>

            <button
              onClick={onExploreMonetization}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-terracotta-50 text-terracotta-700 font-medium text-sm sm:text-base border border-terracotta-200 flex items-center gap-2 shadow-sm hover:shadow transition"
            >
              <Coins className="w-5 h-5 text-terracotta-600" />
              <span>Bí Quyết Kiếm Tiền Từ Vườn</span>
            </button>
          </div>

          {/* Highlights */}
          <div className="flex items-center justify-center gap-6 text-xs sm:text-sm text-forest-800 font-medium">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-herbal-600" />
              <span>{modeData.stat1}</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-forest-300"></span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-herbal-600" />
              <span>{modeData.stat2}</span>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
