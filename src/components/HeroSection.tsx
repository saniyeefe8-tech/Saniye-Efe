import React from 'react';
import { 
  Sparkles, 
  Bot, 
  Monitor, 
  Cpu, 
  FolderArchive, 
  Gamepad2, 
  BookOpen, 
  MessageSquareText, 
  ArrowRight,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { NavCategoryKey } from '../types';

interface HeroSectionProps {
  onSelectCategory: (cat: NavCategoryKey) => void;
  onOpenChat: () => void;
  onScrollToBlog: () => void;
  onScrollToRecommendations: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  onOpenChat,
  onScrollToBlog,
  onScrollToRecommendations,
}) => {
  const categoryShortcuts = [
    {
      key: '5-sinif-bilisim' as NavCategoryKey,
      title: '5. Sınıf Bilişim',
      desc: 'Donanım, yazılım ve temel kavramlar',
      icon: Monitor,
      color: 'bg-blue-50 text-blue-600 border-blue-200 group-hover:border-blue-400',
    },
    {
      key: '6-sinif-bilisim' as NavCategoryKey,
      title: '6. Sınıf Bilişim',
      desc: 'Algoritma, akış şemaları ve problem çözme',
      icon: Cpu,
      color: 'bg-sky-50 text-sky-600 border-sky-200 group-hover:border-sky-400',
    },
    {
      key: '5-sinif-robotik' as NavCategoryKey,
      title: '5. Sınıf Robotik',
      desc: 'Mblock ile blok kodlama ve akıllı sensörler',
      icon: Bot,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200 group-hover:border-indigo-400',
    },
    {
      key: 'evraklar' as NavCategoryKey,
      title: 'Ders Evrakları',
      desc: 'Yıllık planlar ve zümre tutanakları',
      icon: FolderArchive,
      color: 'bg-slate-50 text-slate-600 border-slate-200 group-hover:border-slate-400',
    },
    {
      key: 'oyunlar' as NavCategoryKey,
      title: 'Eğitici Oyunlar',
      desc: 'Bilişim yarışmaları ve mini kod oyunları',
      icon: Gamepad2,
      color: 'bg-amber-50 text-amber-600 border-amber-200 group-hover:border-amber-400',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-10 pb-16 border-b border-blue-100">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-100/40 rounded-full blur-2xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Teacher Intro */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold shadow-2xs">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Bilişim Teknolojileri ve Yazılım Eğitimi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Geleceği Kodlayan Nesiller İçin <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Bilişim & Robotik</span> Rehberi
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              Merhaba, ben <strong className="text-slate-900 font-bold">Saniye ÖZTÜRK</strong>. Ortaokul düzeyinde bilişim teknolojileri okuryazarlığı, Mblock ile blok kodlama, algoritmik düşünme becerileri ve robotik dünyasını öğrencilerimizle buluşturuyorum.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-read-blog-btn"
                onClick={onScrollToBlog}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer hover:shadow-lg"
              >
                <BookOpen className="w-4 h-4" />
                <span>Yazıları Oku</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-ai-recommendations-btn"
                onClick={onScrollToRecommendations}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-blue-700 font-semibold text-sm border border-blue-200 shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Yapay Zeka İçerik Önerisi</span>
              </button>

              <button
                id="hero-open-chat-btn"
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
              >
                <MessageSquareText className="w-4 h-4 text-blue-600" />
                <span>Sohbet Botuna Sor</span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-slate-200/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>MEB Bilişim Müfredatı Uyumlu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-blue-500" />
                <span>Mblock & Robotik Kodlama</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span>Akıllı Öğrenci Asistanı</span>
              </div>
            </div>
          </div>

          {/* Right Teacher Card Preview */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-blue-100 relative">
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-pink-500 p-0.5 shadow-md shadow-blue-500/20 shrink-0 overflow-hidden relative group">
                  <img
                    src="/assets/teacher_avatar.jpg"
                    alt="Saniye ÖZTÜRK - Bilişim Teknolojileri ve Robotik Kodlama Öğretmeni"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Saniye ÖZTÜRK</h3>
                  <p className="text-xs font-medium text-blue-600">Bilişim Teknolojileri Öğretmeni</p>
                  <p className="text-[11px] text-slate-500">Robotik Kodlama ve Yazılım Eğitmeni</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Hızlı Kategori Erişimi
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {categoryShortcuts.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.key}
                        id={`hero-cat-${cat.key}`}
                        onClick={() => onSelectCategory(cat.key)}
                        className="text-left p-3 rounded-xl border transition-all duration-200 hover:shadow-xs group cursor-pointer bg-white border-slate-200 hover:border-blue-400"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`p-1.5 rounded-lg ${cat.color} transition-colors`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {cat.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {cat.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bot mini trigger alert */}
              <div 
                onClick={onOpenChat}
                className="mt-5 p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between cursor-pointer hover:bg-blue-100/60 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs font-semibold text-blue-900">
                    Bilişim Asistanı Çevrimiçi
                  </span>
                </div>
                <span className="text-xs text-blue-600 font-bold hover:underline">
                  Soru Sor →
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
