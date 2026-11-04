import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-white border-t border-forest-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-forest-900 text-xs sm:text-sm">
          
          {/* Col 1: Brand Logo & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-sm">
              <img
                src="/logo.jpg"
                alt="Yêu Trồng Cây - Design your life"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-forest-200/80 leading-relaxed text-xs">
              Nền tảng kết nối những người đam mê thực vật bản địa, cây ăn trái sân thượng và nông nghiệp gia đình Việt Nam.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">Bộ 3 Sinh Thái</h4>
            <ul className="space-y-2 text-forest-200/80 text-xs">
              <li>• Tủ Thuốc Xanh (Thảo dược bản địa)</li>
              <li>• Trái Ngọt Phố (Cây ăn quả chậu)</li>
              <li>• Cây Cảnh & Bonsai Thư Thái</li>
              <li>• Lịch Nông Vụ Nhân Giống Ba Miền</li>
            </ul>
          </div>

          {/* Col 3: Safe Plant Swap */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-herbal-400" /> Quy Chuẩn Trao Đổi Cây
            </h4>
            <p className="text-forest-200/80 leading-relaxed text-xs">
              Mọi cành chiết trao đổi trong cộng đồng khuyến cáo nên được <strong>cách ly 7 ngày</strong> trước khi đưa vào vườn chính để ngăn ngừa lây nhiễm sâu bệnh chéo.
            </p>
          </div>

          {/* Col 4: Forestry Law & Ethics */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">Bảo Tồn Nguồn Gen</h4>
            <p className="text-forest-200/80 leading-relaxed text-xs">
              Cộng đồng nói KHÔNG với việc khai thác, mua bán các loài thực vật rừng tự nhiên thuộc Sách Đỏ Việt Nam và kiên quyết bảo tồn nguồn gen dược liệu quý.
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-forest-400">
          <p>© 2026 Yêu Trồng Cây (yeutrongcay.com). Vận hành trên Plesk Mắt Bão & Cloudflare.</p>
          <p className="flex items-center gap-1">
            Xây dựng với tình yêu thiên nhiên <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> tại Việt Nam
          </p>
        </div>

      </div>
    </footer>
  );
};
