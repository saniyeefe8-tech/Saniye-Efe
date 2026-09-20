import React from 'react';
import { 
  GraduationCap, 
  Mail, 
  Heart, 
  ArrowUp, 
  Monitor, 
  Cpu, 
  Bot, 
  FolderArchive, 
  Gamepad2, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { NavCategoryKey } from '../types';

interface FooterProps {
  onSelectCategory: (cat: NavCategoryKey) => void;
  onScrollToTop: () => void;
  onScrollToRecommendations: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onScrollToTop,
  onScrollToRecommendations,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-md shadow-blue-500/20 overflow-hidden shrink-0">
                <img
                  src="/assets/teacher_avatar.jpg"
                  alt="Saniye ÖZTÜRK"
                  className="w-full h-full object-cover rounded-[10px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Saniye ÖZTÜRK</h3>
                <p className="text-xs text-blue-400 font-medium">Bilişim & Robotik Öğretmeni</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              5. ve 6. sınıf Bilişim Teknolojileri, Mblock ile blok kodlama ve robotik proje dünyasında öğrencilere rehberlik eden kişisel eğitim blogu.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>saniyeefe8@gmail.com</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Ders Kategorileri
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('5-sinif-bilisim')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <Monitor className="w-3.5 h-3.5 text-blue-500" />
                  <span>5. Sınıf Bilişim Teknolojileri</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('6-sinif-bilisim')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <Cpu className="w-3.5 h-3.5 text-sky-500" />
                  <span>6. Sınıf Bilişim Teknolojileri</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('5-sinif-robotik')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  <span>5. Sınıf Robotik Kodlama</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Documents & Fun */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Materyaller & Araçlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('evraklar')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <FolderArchive className="w-3.5 h-3.5 text-slate-400" />
                  <span>Yıllık Planlar & Evraklar</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('oyunlar')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-slate-400"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Eğitici Kodlama Oyunları</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToRecommendations}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-400 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Yapay Zeka İçerik Önerisi</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Education Principles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Eğitim İlkeleri
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-2 text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Güvenli & Etik Bilişim</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Öğrencilerimizin dijital dünyada sadece tüketici değil; problem çözen, üreten ve güvenliğini sağlayan bireyler olması hedeflenmektedir.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Saniye ÖZTÜRK Kişisel Blogu. Tüm hakları saklıdır.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Milli Eğitim Bakanlığı Müfredatına Uygun Olarak Tasarlanmıştır</span>
            <button
              id="footer-scroll-top-btn"
              onClick={onScrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Yukarı Çık"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[11px] font-semibold">Yukarı</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
