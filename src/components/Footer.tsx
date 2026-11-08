import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight, Mail, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.tsx';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenContact }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-forest-950 text-white border-t border-forest-900 pt-16 pb-12">
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8">
        
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
              {t('footer.aboutBrand')}
            </p>

            {/* Official Contact Info */}
            <div className="pt-2 space-y-2 border-t border-forest-900/80 text-xs">
              <a
                href="mailto:yeutrongcay@gmail.com"
                className="text-forest-300 hover:text-emerald-400 transition flex items-center gap-1.5"
                title="Gửi thư điện tử tới Yêu Trồng Cây"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs">yeutrongcay@gmail.com</span>
              </a>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://www.facebook.com/yeutrongcay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-forest-900 hover:bg-blue-600 text-forest-300 hover:text-white flex items-center justify-center transition border border-forest-800"
                  title="Facebook Yêu Trồng Cây"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href="https://www.youtube.com/@yeutrongcay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-xl bg-forest-900 hover:bg-red-600 text-forest-300 hover:text-white flex items-center justify-center transition border border-forest-800"
                  title="Kênh YouTube @yeutrongcay"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">
              {t('footer.columnEcosystem')}
            </h4>
            <ul className="space-y-2 text-forest-200/80 text-xs">
              <li>
                <Link to="/thao-duoc" target="_blank" rel="noopener noreferrer" className="hover:text-herbal-400 transition flex items-center gap-1">
                  <span>{t('footer.linkHerbs')}</span>
                  <ArrowUpRight className="w-3 h-3 text-herbal-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/cay-an-trai" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                  <span>{t('footer.linkFruits')}</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/cay-canh" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition flex items-center gap-1">
                  <span>{t('footer.linkOrnamentals')}</span>
                  <ArrowUpRight className="w-3 h-3 text-purple-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/khong-gian-xanh" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition flex items-center gap-1">
                  <span>{t('footer.linkSpace')}</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/sang-che-tai-che" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition flex items-center gap-1">
                  <span>{t('footer.linkRecycle')}</span>
                  <ArrowUpRight className="w-3 h-3 text-lime-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/am-thuc-duoc-thien" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition flex items-center gap-1">
                  <span>{t('footer.linkCulinary')}</span>
                  <ArrowUpRight className="w-3 h-3 text-rose-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/vuon-quoc-gia" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition flex items-center gap-1">
                  <span>{t('footer.linkForest')}</span>
                  <ArrowUpRight className="w-3 h-3 text-teal-400 opacity-70" />
                </Link>
              </li>
              <li className="pt-1 border-t border-forest-800/60">
                <Link to="/vuon-cua-toi" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1 font-semibold text-herbal-400">
                  <span>{t('footer.linkMyGarden')}</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-70" />
                </Link>
              </li>
              <li>
                <Link to="/kiem-tien-tu-vuon" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition flex items-center gap-1">
                  <span>{t('footer.linkMonetization')}</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-70" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Safe Plant Swap */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-herbal-400" /> {t('footer.columnSwapRules')}
            </h4>
            <p className="text-forest-200/80 leading-relaxed text-xs">
              {t('footer.swapRulesDesc')}
            </p>
            <Link
              to="/trao-doi-cay"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition"
            >
              <span>{t('footer.btnSwapStation')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Col 4: Forestry Law & Ethics */}
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">
              {t('footer.columnPreservation')}
            </h4>
            <p className="text-forest-200/80 leading-relaxed text-xs">
              {t('footer.preservationDesc')}
            </p>
            <Link
              to="/bac-si-cay-trong"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-herbal-400 hover:text-herbal-300 transition"
            >
              <span>{t('footer.btnClinicStation')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-forest-400">
          <p className="text-center md:text-left">
            {t('footer.allRightsReserved')}
          </p>

          <div className="flex items-center gap-4 text-forest-300 text-xs">
            {onOpenPrivacy && (
              <button
                onClick={onOpenPrivacy}
                className="hover:text-white transition underline underline-offset-4"
              >
                {t('footer.privacyLink')}
              </button>
            )}
            {onOpenContact ? (
              <button
                onClick={onOpenContact}
                className="hover:text-white transition underline underline-offset-4"
              >
                {t('footer.contactLink')}
              </button>
            ) : (
              <Link
                to="/lien-he"
                className="hover:text-white transition underline underline-offset-4"
              >
                {t('footer.contactLink')}
              </Link>
            )}
            <Link
              to="/admin"
              className="hover:text-emerald-400 transition flex items-center gap-1 opacity-70 hover:opacity-100"
              title="Cổng quản trị viên & kiểm duyệt"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
