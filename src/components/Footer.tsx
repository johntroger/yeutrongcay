import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenContact }) => {
  return (
    <footer className="bg-forest-950 text-white border-t border-forest-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-forest-900 text-xs sm:text-sm">
          
          {/* Col 1: Brand Logo & Mission */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" target="_blank" rel="noopener noreferrer" className="bg-white p-2.5 rounded-2xl inline-block shadow-sm hover:opacity-95 transition">
              <img
                src="/logo.jpg"
                alt="Yêu Trồng Cây - Design your life"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-forest-200/80 leading-relaxed text-xs">
              Nền tảng kết nối những người đam mê thực vật bản địa, cây ăn trái sân thượng và nông nghiệp gia đình Việt Nam.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">Bộ 3 Sinh Thái</h4>
            <ul className="space-y-2 text-forest-200/80 text-xs">
              <li>
                <Link to="/thao-duoc" target="_blank" rel="noopener noreferrer" className="hover:text-herbal-400 transition flex items-center gap-1">
                  <span>• Tủ Thuốc Xanh (Thảo dược)</span>
                  <ArrowUpRight className="w-3 h-3 text-herbal-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/cay-an-trai" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                  <span>• Trái Ngọt Phố (Cây ăn quả)</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/cay-canh" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition flex items-center gap-1">
                  <span>• Cây Cảnh & Bonsai Thư Thái</span>
                  <ArrowUpRight className="w-3 h-3 text-purple-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/vuon-cua-toi" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1 font-semibold text-herbal-400">
                  <span>• Vườn Số Của Tôi (Nhật Ký Ảnh)</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/kiem-tien-tu-vuon" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1">
                  <span>• Cẩm Nang Làm Kinh Tế Vườn</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-70" />
                </Link>
              </li>
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
            <Link
              to="/trao-doi-cay"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
            >
              <span>Vào Trạm Trao Đổi Cây</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Col 4: Forestry Law & Ethics */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">Bảo Tồn Nguồn Gen</h4>
            <p className="text-forest-200/80 leading-relaxed text-xs">
              Cộng đồng nói KHÔNG với việc khai thác, mua bán các loài thực vật rừng tự nhiên thuộc Sách Đỏ Việt Nam và kiên quyết bảo tồn nguồn gen dược liệu quý.
            </p>
            <Link
              to="/bac-si-cay-trong"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-herbal-400 hover:text-herbal-300 transition"
            >
              <span>Khám Phòng Khám Cây Trồng</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-forest-400">
          <div className="flex flex-wrap items-center gap-4">
            <p>© 2026 Yêu Trồng Cây (yeutrongcay.com). Vận hành trên Plesk Mắt Bão & Cloudflare.</p>
            {onOpenPrivacy && (
              <button
                onClick={onOpenPrivacy}
                className="text-herbal-400 hover:text-herbal-300 underline underline-offset-2 transition cursor-pointer"
              >
                Điều khoản & Quyền riêng tư
              </button>
            )}
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="text-herbal-400 hover:text-herbal-300 underline underline-offset-2 transition cursor-pointer"
              >
                Liên hệ & Hợp tác
              </button>
            )}
          </div>
          <p className="flex items-center gap-1">
            Xây dựng với tình yêu thiên nhiên <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> tại Việt Nam
          </p>
        </div>

      </div>
    </footer>
  );
};
