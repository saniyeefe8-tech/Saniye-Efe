import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldAlert, 
  HeartHandshake, 
  Clock, 
  BookOpen, 
  Volume2, 
  Trash2, 
  PhoneOff, 
  Smile, 
  Hand, 
  ClipboardCheck, 
  Users
} from 'lucide-react';

interface ClassRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClassRulesModal: React.FC<ClassRulesModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rules = [
    {
      num: 1,
      title: 'Zamanında Gel.',
      desc: 'Ders başlamadan önce sınıfta hazır ol. Geç kalma, arkadaşlarının ve öğretmeninin zamanına saygı duy.',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      badgeBg: 'bg-rose-500',
      icon: Clock,
      iconColor: 'text-rose-600',
    },
    {
      num: 2,
      title: 'Derse Hazırlıklı Gel.',
      desc: 'Defterini, kitabını ve gerekli araç gereçlerini unutma. Hazırlıklı gelmek başarını artırır.',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      badgeBg: 'bg-emerald-600',
      icon: BookOpen,
      iconColor: 'text-emerald-600',
    },
    {
      num: 3,
      title: 'Saygılı Ol.',
      desc: 'Öğretmenlerine, arkadaşlarına ve okul çalışanlarına karşı saygılı davran. Nazik ve kibar ol.',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      badgeBg: 'bg-sky-600',
      icon: HeartHandshake,
      iconColor: 'text-sky-600',
    },
    {
      num: 4,
      title: 'Dinle ve Söz Hakkına Saygı Duy.',
      desc: 'Konuşan arkadaşını ve öğretmenini dikkatle dinle. Söz almak için el kaldır.',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      badgeBg: 'bg-amber-500',
      icon: Hand,
      iconColor: 'text-amber-600',
    },
    {
      num: 5,
      title: 'Sınıfı Temiz Tut.',
      desc: 'Sıralarını, sınıfını ve okul eşyalarını temiz kullan. Çöplerini çöp kutusuna at.',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      badgeBg: 'bg-purple-600',
      icon: Trash2,
      iconColor: 'text-purple-600',
    },
    {
      num: 6,
      title: 'Teknolojiyi Doğru Kullan.',
      desc: 'Telefonunu ve diğer dijital cihazlarını derslerde izinsiz kullanma. Teknoloji, öğrenmen için bir araçtır.',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      badgeBg: 'bg-teal-600',
      icon: PhoneOff,
      iconColor: 'text-teal-600',
    },
    {
      num: 7,
      title: 'Güzel Bir İletişim Dili Kullan.',
      desc: 'Küfür etme, kırıcı ve kaba sözler söyleme. Daha saygılı, nazik ve anlayışlı ol.',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      badgeBg: 'bg-pink-500',
      icon: Smile,
      iconColor: 'text-pink-600',
    },
    {
      num: 8,
      title: 'Şiddet ve Zorbalığa Hayır.',
      desc: 'Kimseye fiziksel, sözel ya da dijital şiddet uygulama. Herkesin kendini güvende hissetmeye hakkı vardır.',
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      badgeBg: 'bg-violet-600',
      icon: ShieldAlert,
      iconColor: 'text-violet-600',
    },
    {
      num: 9,
      title: 'Kurallara Uygun Davran.',
      desc: 'Okulun ve sınıfın kurallarına uymak, herkesin hakkını korur ve düzeni sağlar.',
      bg: 'bg-lime-50',
      border: 'border-lime-200',
      badgeBg: 'bg-lime-600',
      icon: ClipboardCheck,
      iconColor: 'text-lime-700',
    },
    {
      num: 10,
      title: 'Birlikte Daha Güçlüyüz.',
      desc: 'Arkadaşlarına destek ol. Takım ruhunu yaşat. İyi bir sınıf, iyi bir arkadaşlıkla mümkün.',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      badgeBg: 'bg-blue-600',
      icon: Users,
      iconColor: 'text-blue-600',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyRules = () => {
    const text = `7/C SINIFI SINIF KURALLARI\n"Daha iyi bir sınıf, daha güzel bir gelecek!"\n\n` +
      rules.map(r => `${r.num}. ${r.title}\n   ${r.desc}`).join('\n\n') +
      `\n\nSınıfımızın kuralları, hepimizin sorumluluğu!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div 
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[96vh] print:max-h-none print:shadow-none print:border-none print:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toolbar (Hidden during print) */}
        <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-black text-sm">
              7/C
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                7/C Sınıfı Sınıf Kuralları Afişi
              </h2>
              <p className="text-xs text-slate-400">
                A4 veya A3 boyutunda yazdırabilir, sınıf panonuza asabilirsiniz
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyRules}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>Metni Kopyala</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Afişi Yazdır (PDF)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Poster Canvas (Printable & High Contrast) */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-amber-50/50 print:p-2 print:bg-white">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-4 border-slate-800 p-5 sm:p-7 shadow-sm print:border-2 print:p-4 print:rounded-xl">
            
            {/* Poster Header */}
            <div className="text-center pb-4 mb-4 border-b-2 border-slate-200">
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-2xl select-none">📚 ✏️</span>
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl sm:text-2xl tracking-wider shadow-sm border-2 border-slate-900">
                  <span>7/C SINIFI</span>
                  <span>SINIF KURALLARI</span>
                </div>
                <span className="text-2xl select-none">✏️ 💖</span>
              </div>

              <div className="inline-block px-4 py-1 rounded-full bg-sky-100 border border-sky-300 text-sky-900 text-xs sm:text-sm font-bold tracking-wide">
                Daha iyi bir sınıf, daha güzel bir gelecek!
              </div>
            </div>

            {/* 10 Rules Grid (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:gap-2">
              {rules.map((rule) => {
                const RuleIcon = rule.icon;
                return (
                  <div
                    key={rule.num}
                    className={`rounded-2xl border-2 ${rule.border} ${rule.bg} p-3 sm:p-3.5 flex items-start gap-2.5 shadow-2xs print:break-inside-avoid`}
                  >
                    {/* Number Badge */}
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${rule.badgeBg} text-white font-extrabold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-2xs`}>
                      {rule.num}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                          {rule.title}
                        </h3>
                        <RuleIcon className={`w-4 h-4 ${rule.iconColor} shrink-0`} />
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                        {rule.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Poster Footer Banner */}
            <div className="mt-5 pt-3 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs select-none">
                ⭐ 🌟 ⭐
              </div>

              <div className="px-5 py-2 rounded-2xl bg-amber-400 border-2 border-slate-900 text-slate-950 font-black text-xs sm:text-sm shadow-xs flex items-center gap-2">
                <span>Sınıfımızın kuralları, hepimizin sorumluluğu!</span>
                <span className="text-base">😊</span>
              </div>

              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs select-none">
                ⭐ 🌟 ⭐
              </div>
            </div>

            <div className="text-center mt-2">
              <span className="text-[10px] text-slate-400 font-medium">
                Bilişim Teknolojileri ve Yazılım Dersi • Öğretmen: Saniye ÖZTÜRK
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden during print) */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 print:hidden">
          <span>Bu kurallar afişi sınıf panoları, kapı arkası ve bilişim laboratuvarları için uygundur.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
