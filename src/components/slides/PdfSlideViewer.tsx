import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Printer, 
  Download, 
  BookOpen, 
  MessageSquare, 
  Cpu, 
  HardDrive, 
  Share2, 
  Zap, 
  Clock, 
  GraduationCap, 
  ShoppingBag, 
  Radio, 
  Phone, 
  Tv, 
  Smartphone, 
  Laptop, 
  Navigation, 
  Disc, 
  Sparkles,
  Rocket,
  Lightbulb,
  Building2,
  Stethoscope,
  Plane,
  BrainCircuit,
  Search,
  CheckCircle2,
  HelpCircle,
  Award,
  Users
} from 'lucide-react';
import { SLIDES_CONTENT } from '../../data/slidesPdfContent';

interface PdfSlideViewerProps {
  onAskAi?: (question: string) => void;
}

export const PdfSlideViewer: React.FC<PdfSlideViewerProps> = ({ onAskAi }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const totalPages = SLIDES_CONTENT.length;

  const currentSlide = SLIDES_CONTENT[currentPage - 1];

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      } else if (e.key === 'Home') {
        setCurrentPage(1);
      } else if (e.key === 'End') {
        setCurrentPage(totalPages);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  const handlePrint = () => {
    window.print();
  };

  const renderSlideContent = () => {
    switch (currentSlide.type) {
      // PAGE 1: COVER
      case 'cover':
        return (
          <div className="h-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-12 gap-8 relative overflow-hidden bg-gradient-to-br from-[#FAF8F5] via-[#F4EFEA] to-[#EAE2D7]">
            {/* Left 3D Isometric Illustration */}
            <div className="w-full md:w-5/12 flex justify-center items-center">
              <div className="relative group">
                <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-3xl bg-white/90 p-5 shadow-2xl border border-amber-200/60 flex flex-col justify-between transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                      5. Sınıf Bilişim Sınıfı
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>

                  {/* Visual Classroom simulation */}
                  <div className="grid grid-cols-3 gap-2 my-auto">
                    {[1, 2, 3, 4, 5, 6].map((seat) => (
                      <div key={seat} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl p-2 text-center shadow-xs">
                        <Laptop className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                        <span className="text-[10px] font-semibold text-slate-700 block">Masa {seat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-amber-900 font-medium">
                    <span>Öğretmen: Saniye ÖZTÜRK</span>
                    <span className="text-[11px] bg-amber-500 text-white px-2 py-0.5 rounded-md font-bold">1. Hafta</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Presentation Titles */}
            <div className="w-full md:w-7/12 text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                1. Dönem 1. Hafta Ders Slaytı (PDF)
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Bilişim Teknolojileri <br />
                <span className="text-amber-700">Temel Kavramları</span>
              </h1>

              <div className="pt-4 border-t border-slate-300/80 space-y-1">
                <p className="text-base sm:text-lg text-slate-700 font-semibold">
                  5. Sınıf Bilişim Teknolojileri ve Yazılım Dersi
                </p>
                <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                  Hazırlayan: <span className="text-slate-800 font-bold">Saniye ÖZTÜRK</span>
                </p>
              </div>
            </div>
          </div>
        );

      // PAGE 2: CONCEPTS (Bilgi, İletişim, Teknoloji)
      case 'concepts':
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-[#FAF8F5]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Temel Kavramlar
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Bilişim teknolojilerini anlamak için önce bu 3 temel kavramı keşfedelim.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-auto">
              {/* Concept 1: Bilgi */}
              <div className="bg-white rounded-2xl p-6 border-2 border-red-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xl">
                    📚
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Bilgi</h3>
                    <span className="text-[11px] text-red-600 font-semibold">Öğrenme & Aktarım</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed bg-red-50/50 p-4 rounded-xl border border-red-100">
                  Öğrenilen veya öğretilen şeyler. İnsanın aklının alabileceği her türlü gerçek ve fikir.
                </p>
              </div>

              {/* Concept 2: İletişim */}
              <div className="bg-white rounded-2xl p-6 border-2 border-amber-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
                    💬
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">İletişim</h3>
                    <span className="text-[11px] text-amber-700 font-semibold">Paylaşım & Etkileşim</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                  Duygu, düşünce ve bilgilerin akla gelebilecek her türlü yolla başkalarına aktarılması ve paylaşılması.
                </p>
              </div>

              {/* Concept 3: Teknoloji */}
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                    🔬
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Teknoloji</h3>
                    <span className="text-[11px] text-blue-600 font-semibold">İcatlar & Araçlar</span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  İnsanoğlunun hayatını kolaylaştırmak, işlerini hızlandırmak için geliştirdiği araçlar ve yenilikler.
                </p>
              </div>
            </div>

            <div className="text-center pt-2 text-xs text-slate-400 font-medium">
              Saniye ÖZTÜRK • Bilişim Teknolojileri ve Yazılım
            </div>
          </div>
        );

      // PAGE 3: WHAT IS IT? (Toplama, İşleme, Saklama, İletme)
      case 'definition':
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-[#FAF8F5]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Bilişim Teknolojileri Nedir?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Bilginin bilgisayarlar ve elektronik araçlar aracılığıyla 4 temel aşamadaki yolculuğu:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-auto">
              {/* Step 1: Toplama */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <Download className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-indigo-600 mb-1 uppercase tracking-wider">1. Aşama</span>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">Toplama</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Bilgiyi ve veriyi farklı kaynaklardan bir araya getirme.
                </p>
              </div>

              {/* Step 2: İşleme */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Cpu className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">2. Aşama</span>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">İşleme</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Bilgiyi düzenleme, hesaplama, analiz etme ve anlamlı kılma.
                </p>
              </div>

              {/* Step 3: Saklama */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <HardDrive className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-amber-600 mb-1 uppercase tracking-wider">3. Aşama</span>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">Saklama</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Bilgiyi güvenli bir şekilde depolama ve bellekte muhafaza etme.
                </p>
              </div>

              {/* Step 4: İletme */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Share2 className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wider">4. Aşama</span>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2">İletme</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Bilgiyi ağlar ve kablosuz sistemlerle paylaşma ve aktarma.
                </p>
              </div>
            </div>

            <div className="bg-slate-100/80 rounded-xl p-3 text-center text-xs text-slate-600 font-medium">
              💡 <strong>Kısaca:</strong> BİT, bilginin toplanmasını, işlenmesini, depolanmasını ve bir yerden bir yere iletilmesini sağlayan tüm araçlardır.
            </div>
          </div>
        );

      // PAGE 4: QUESTION / BRAINSTORMING
      case 'question':
        return (
          <div className="h-full flex flex-col items-center justify-center p-8 sm:p-14 bg-gradient-to-br from-[#FAF8F5] via-[#FFFDF9] to-[#F5EFE6] text-center relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 shadow-md transform hover:scale-105 transition-transform">
              <Lightbulb className="w-14 h-14 stroke-[1.75]" />
            </div>

            <span className="px-4 py-1.5 rounded-full bg-amber-200/70 text-amber-900 text-xs font-bold tracking-widest uppercase mb-4">
              Sınıf İçi Düşünme & Tartışma
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 max-w-2xl leading-tight mb-6">
              BİLİŞİM TEKNOLOJİLERİ BİZE NE GİBİ AVANTAJLAR SAĞLIYOR OLABİLİR?
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mb-8 leading-relaxed">
              Telefonlar, bilgisayarlar, tabletler ve internet olmasaydı hayatımız nasıl olurdu? Hangi işleri yapmakta zorlanırdık?
            </p>

            {onAskAi && (
              <button
                type="button"
                onClick={() => onAskAi('Bilişim teknolojilerinin günlük hayatta sağladığı 5 büyük avantajı 5. sınıf öğrencisinin anlayacağı eğlenceli örneklerle anlatır mısın?')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Yapay Zeka Asistanı ile Tartışmayı Başlat</span>
              </button>
            )}
          </div>
        );

      // PAGE 5: ADVANTAGES (5 Avantaj)
      case 'advantages':
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-[#FAF8F5]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                BİT'in Sağladığı Avantajlar
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Bilişim teknolojilerinin hayatımıza kattığı en önemli kolaylıklar:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-auto">
              {/* Advantage 1 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Hızlı İletişim</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dünyanın öbür ucundaki biriyle saniyeler içinde görüntülü ve yazılı iletişim kurabilme.
                  </p>
                </div>
              </div>

              {/* Advantage 2 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Kolay Erişim</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kütüphaneler dolusu bilgiye tek bir tıkla, arama motorlarıyla her an ulaşabilme.
                  </p>
                </div>
              </div>

              {/* Advantage 3 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Zaman Tasarrufu</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Günler sürebilecek hesaplama ve araştırmaları dakikalar içinde tamamlayarak vakit kazanma.
                  </p>
                </div>
              </div>

              {/* Advantage 4 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Eğitim Fırsatları</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    EBA, dijital ders sunuları ve uzaktan eğitimle evden öğrenme imkanı.
                  </p>
                </div>
              </div>

              {/* Advantage 5 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Alışveriş Kolaylığı</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Evden çıkmadan ihtiyaç duyulan kitap, kırtasiye ve eşyaları sipariş verebilme.
                  </p>
                </div>
              </div>

              {/* Bonus Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200/70 shadow-xs flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-amber-600 shrink-0" />
                <p className="text-xs font-semibold text-amber-900">
                  BİT sayesinde hayatımız daha pratik, bağlantılı ve üretken hale gelir!
                </p>
              </div>
            </div>

            <div className="text-center pt-2 text-xs text-slate-400 font-medium">
              Saniye ÖZTÜRK • 5. Sınıf Bilişim Teknolojileri Slaytları
            </div>
          </div>
        );

      // PAGE 6: OLD TECH (Teyp, Daktilo, Ev Telefonu, Tüplü TV)
      case 'old-tech':
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-[#FAF8F5]">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
                Geçmişe Yolculuk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-1">
                Eskiden Kullanılan Teknolojiler
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Akıllı telefonlar ve modern bilgisayarlar yokken büyüklerimizin kullandığı araçlar:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-auto">
              {/* Old Tech 1 */}
              <div className="bg-white rounded-2xl p-5 border-2 border-amber-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                  <Radio className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Teyp & Kaset</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Müzik dinlemek ve ses kaydetmek için manyetik kasetler kullanılırdı.
                </p>
              </div>

              {/* Old Tech 2 */}
              <div className="bg-white rounded-2xl p-5 border-2 border-amber-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold">⌨️</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Daktilo</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yazıcılar ve kelime işlemciler yokken resmi yazılar mekanik daktiloda yazılırdı.
                </p>
              </div>

              {/* Old Tech 3 */}
              <div className="bg-white rounded-2xl p-5 border-2 border-amber-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Kablolu Ev Telefonu</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cepte taşınamayan, sadece evde ya da kulübelerde sabit duran çevirmeli telefonlar.
                </p>
              </div>

              {/* Old Tech 4 */}
              <div className="bg-white rounded-2xl p-5 border-2 border-amber-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                  <Tv className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Tüplü (CRT) TV</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ağır, kalın arkalıklı ve az sayıda kanala sahip analog televizyonlar.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-3 text-center text-xs text-amber-900 font-medium border border-amber-200">
              📌 <strong>Fark Ettiniz mi?</strong> Eskiden her iş için ayrı ve hantal bir alet varken, bugün bunların hepsi tek bir cep telefonuna sığıyor!
            </div>
          </div>
        );

      // PAGE 7: NEW TECH (Cep Telefonu, Dizüstü, Drone, LED TV, Flash Bellek)
      case 'new-tech':
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-[#FAF8F5]">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                Bugünün Dünyası
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-1">
                Bugün Kullanılan Teknolojiler
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Modern çağın hızlı, taşınabilir ve akıllı cihazları:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3.5 my-auto">
              {/* New Tech 1 */}
              <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Cep Telefonu</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  İletişim, kamera, internet ve harita tek bir cepte.
                </p>
              </div>

              {/* New Tech 2 */}
              <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Dizüstü Bilgisayar</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  İstenen her yerde ders ve çalışma imkanı sağlayan taşınabilir bilgisayar.
                </p>
              </div>

              {/* New Tech 3 */}
              <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Drone</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Havadan görüntü alan, tarım ve kargo taşımacılığında kullanılan uçan robotlar.
                </p>
              </div>

              {/* New Tech 4 */}
              <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Tv className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">LED & Akıllı TV</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  İncecik ekranlar, 4K görüntü ve internete bağlı eğlence sistemleri.
                </p>
              </div>

              {/* New Tech 5 */}
              <div className="bg-white rounded-2xl p-4 border border-blue-100 shadow-xs flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <HardDrive className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Flash Bellek</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Binlerce kitap ve videoyu parmak büyüklüğünde saklayabilen taşınabilir hafıza.
                </p>
              </div>
            </div>

            <div className="text-center pt-2 text-xs text-slate-400 font-medium">
              Saniye ÖZTÜRK • 5. Sınıf Bilişim Teknolojileri
            </div>
          </div>
        );

      // PAGE 8: FIRST COMPUTERS (Abaküs & ENIAC)
      case 'history':
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-[#FAF8F5]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                İlk Bilgisayarlar
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Mekanik boncuklardan devasa elektronik odalara bilişimin doğuşu:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
              {/* Step 1: Abaküs */}
              <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      1
                    </span>
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      M.Ö. Yıllardan Günümüze
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Abaküs</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Tarihteki <strong>ilk mekanik bilgisayar</strong> sayılır. Sayı sayma, toplama ve çıkarma gibi temel hesaplamaları kolaylaştırmak amacıyla icat edilmiştir.
                  </p>
                </div>

                <div className="p-3 bg-amber-50/70 rounded-xl text-xs text-amber-900 font-medium">
                  🧮 İnsanlığın bilgi işleme ihtiyacının ilk somut aracıdır.
                </div>
              </div>

              {/* Step 2: ENIAC */}
              <div className="bg-white rounded-3xl p-6 border-2 border-blue-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      2
                    </span>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      1946 Yılı (Modern Çağın Başlangıcı)
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">ENİAC</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Tarihteki <strong>ilk genel amaçlı elektronik bilgisayar</strong> olarak kabul edilir. Bir oda büyüklüğünde (yaklaşık 167 m² ve 30 ton!) idi ve binlerce lamba ile çalışıyordu.
                  </p>
                </div>

                <div className="p-3 bg-blue-50/70 rounded-xl text-xs text-blue-900 font-medium">
                  ⚡ Bugün ceplerimizdeki telefonlar ENIAC'tan milyonlarca kat daha güçlü ve küçüktür.
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-3 sm:p-4 text-center text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5 animate-bounce" />
              <span>Teknoloji sürekli gelişiyor ve her geçen gün küçülüp hızlanıyor! 🚀</span>
            </div>
          </div>
        );

      // PAGE 9: USAGE AREAS
      case 'areas':
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-[#FAF8F5]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Bilişim Teknolojilerinin Kullanıldığı Alanlar
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Bilişim teknolojileri hayatımızın her noktasında bizimle:
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-auto">
              {[
                { title: 'Eğitim', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'Mühendislik', icon: Cpu, color: 'text-amber-600', bg: 'bg-amber-50' },
                { title: 'İletişim', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'Endüstri', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { title: 'Uzay', icon: Rocket, color: 'text-purple-600', bg: 'bg-purple-50' },
                { title: 'Sağlık', icon: Stethoscope, color: 'text-rose-600', bg: 'bg-rose-50' },
                { title: 'Yapay Zekâ', icon: BrainCircuit, color: 'text-teal-600', bg: 'bg-teal-50' },
                { title: 'Ulaşım', icon: Plane, color: 'text-orange-600', bg: 'bg-orange-50' },
              ].map((area) => {
                const AreaIcon = area.icon;
                return (
                  <div key={area.title} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${area.bg} ${area.color} flex items-center justify-center shrink-0`}>
                      <AreaIcon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">{area.title}</span>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-2 text-xs text-slate-400 font-medium">
              Saniye ÖZTÜRK • Bilişim Alanları Haritası
            </div>
          </div>
        );

      // PAGE 10: PIONEERS (Elon Musk, Jeff Bezos, Mark Zuckerberg, Bill Gates, Larry Page)
      case 'pioneers':
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-[#FAF8F5]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Teknolojinin Öncüleri
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Bugün kullandığımız yazılım ve teknolojilerin arkasındaki önemli liderler:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-auto">
              {/* Elon Musk */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🚀</span>
                  <h3 className="font-extrabold text-slate-900 text-base">Elon Musk</h3>
                </div>
                <p className="text-xs text-slate-600 font-medium bg-slate-50 p-2 rounded-lg">
                  SpaceX, Tesla, OpenAI, X (Twitter)
                </p>
              </div>

              {/* Jeff Bezos */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📦</span>
                  <h3 className="font-extrabold text-slate-900 text-base">Jeff Bezos</h3>
                </div>
                <p className="text-xs text-slate-600 font-medium bg-slate-50 p-2 rounded-lg">
                  Amazon kurucusu, e-ticaret & bulut sistemleri
                </p>
              </div>

              {/* Mark Zuckerberg */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">👍</span>
                  <h3 className="font-extrabold text-slate-900 text-base">Mark Zuckerberg</h3>
                </div>
                <p className="text-xs text-slate-600 font-medium bg-slate-50 p-2 rounded-lg">
                  Facebook, Instagram, WhatsApp (Meta)
                </p>
              </div>

              {/* Bill Gates */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💻</span>
                  <h3 className="font-extrabold text-slate-900 text-base">Bill Gates</h3>
                </div>
                <p className="text-xs text-slate-600 font-medium bg-slate-50 p-2 rounded-lg">
                  Microsoft kurucusu, Windows, Office programları
                </p>
              </div>

              {/* Larry Page */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔍</span>
                  <h3 className="font-extrabold text-slate-900 text-base">Larry Page</h3>
                </div>
                <p className="text-xs text-slate-600 font-medium bg-slate-50 p-2 rounded-lg">
                  Google kurucu ortağı, Android, YouTube ekosistemi
                </p>
              </div>

              {/* Inspiration box */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200 shadow-xs flex items-center gap-2">
                <Award className="w-8 h-8 text-amber-600 shrink-0" />
                <p className="text-xs font-semibold text-amber-900">
                  Geleceğin teknolojilerini sizler kodlayıp geliştirebilirsiniz!
                </p>
              </div>
            </div>

            <div className="text-center pt-2 text-xs text-slate-400 font-medium">
              Saniye ÖZTÜRK • Teknoloji Öncüleri
            </div>
          </div>
        );

      // PAGE 11: SUMMARY (Özet: Neler Öğrendik?)
      case 'summary':
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-[#FAF8F5]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Özet: Neler Öğrendik?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                1. Hafta dersinde öğrendiğimiz ana başlıklar:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
              {/* Point 1 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  01
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Temel Kavramlar</h3>
                  <p className="text-xs text-slate-600">
                    Bilgi, İletişim ve Teknoloji kavramlarının anlamını ve birbirleriyle olan bağını keşfettik.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  02
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">BİT Avantajları</h3>
                  <p className="text-xs text-slate-600">
                    Hız, bilgiye kolay erişim, zaman tasarrufu, uzaktan eğitim ve pratik alışveriş kolaylıklarını öğrendik.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  03
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Tarihçe</h3>
                  <p className="text-xs text-slate-600">
                    Abaküs ile başlayan yolculuğun ENİAC ve günümüzün akıllı cep bilgisayarlarına nasıl ulaştığını inceledik.
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-start gap-4">
                <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  04
                </span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">Kullanım Alanları</h3>
                  <p className="text-xs text-slate-600">
                    Eğitim, sağlık, uzay, yapay zekâ, mühendislik ve ulaşım gibi hayatın her alanında bilişimin yerini kavradık.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 text-emerald-900 rounded-xl p-3 text-center text-xs font-semibold border border-emerald-200">
              ✅ Tebrikler! 1. Hafta temel kavramlar konusunu başarıyla tamamladınız.
            </div>
          </div>
        );

      // PAGE 12: ACTIVITIES
      case 'activities':
        return (
          <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-[#FAF8F5]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Etkinlikler ve Uygulama
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Öğrendiklerinizi pekiştirmek için aşağıdaki görevleri tamamlayınız:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
              {/* Etkinlik 1 */}
              <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                      Etkinlik 1
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">Evdeki Teknolojik Aletleri Listele</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    Evinizde bulunan ve bilişim teknolojilerine örnek olan 5 aleti defterinize yazın. Karşılarına hangi amaçla kullanıldıklarını (örneğin: Ders çalışmak, haberleşmek, bilgi aramak) not edin.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold bg-amber-50 p-3 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Ders defterine yapılacak mini araştırma görevi</span>
                </div>
              </div>

              {/* Etkinlik 2 */}
              <div className="bg-white rounded-3xl p-6 border-2 border-blue-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                      Etkinlik 2
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">Eski ile Yeniyi Karşılaştır</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    Anne ya da babanıza onların çocukluğunda hangi iletişim araçlarını kullandıklarını sorun. Daktilo, kaset çalar veya sabit telefon hatıralarını dinleyip bugünkü akıllı telefonlarla karşılaştırın.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-blue-700 font-semibold bg-blue-50 p-3 rounded-xl">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Aile ile röportaj ve sınıf içi paylaşım</span>
                </div>
              </div>
            </div>

            <div className="text-center pt-2 text-xs text-slate-400 font-medium">
              Saniye ÖZTÜRK • Ders Sonu Değerlendirmesi
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Slide Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs sm:text-sm">
        {/* Left: Presentation Info & Page indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">Bilişim Teknolojileri Temel Kavramları</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                PDF Slaytı
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Sayfa {currentPage} / {totalPages} • Hazırlayan: <strong>Saniye ÖZTÜRK</strong>
            </p>
          </div>
        </div>

        {/* Right: Slide Controls & Print */}
        <div className="flex items-center gap-2">
          {/* Page pagination buttons */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Önceki Slayt (Sol Ok)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 text-xs font-bold text-slate-800 select-none">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Sonraki Slayt (Sağ Ok)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
            title={isFullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekranda Göster'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Print / Save as PDF button */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            title="Slaytları PDF Olarak Yazdır / Kaydet"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF Yazdır / Kaydet</span>
          </button>
        </div>
      </div>

      {/* Slide Display Canvas Container */}
      <div 
        className={`w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white transition-all ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none h-screen' : 'h-[480px] sm:h-[540px] md:h-[580px]'
        }`}
      >
        {renderSlideContent()}
      </div>

      {/* Slide Thumbnail Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {SLIDES_CONTENT.map((slide) => {
          const isSelected = slide.pageNumber === currentPage;
          return (
            <button
              key={slide.pageNumber}
              type="button"
              onClick={() => setCurrentPage(slide.pageNumber)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer text-left border ${
                isSelected 
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span className="block text-[10px] opacity-80">Slayt {slide.pageNumber}</span>
              <span className="truncate max-w-[120px] block font-medium">
                {slide.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
