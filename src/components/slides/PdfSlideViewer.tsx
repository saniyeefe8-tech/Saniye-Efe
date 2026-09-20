import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Download,
  FileText,
  X,
  Check,
  AlertCircle,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { jsPDF } from 'jspdf';

// 12 Exact Slide Definitions matching user's PDF 1:1
export interface SlideMeta {
  page: number;
  title: string;
}

export const SLIDES_META: SlideMeta[] = [
  { page: 1, title: 'Bilişim Teknolojileri Temel Kavramları' },
  { page: 2, title: 'Temel Kavramlar' },
  { page: 3, title: 'Bilişim Teknolojileri Nedir?' },
  { page: 4, title: 'BİT Bize Ne Gibi Avantajlar Sağlıyor Olabilir?' },
  { page: 5, title: "BİT'in Sağladığı Avantajlar" },
  { page: 6, title: 'Eskiden Kullanılan Teknolojiler' },
  { page: 7, title: 'Bugün Kullanılan Teknolojiler' },
  { page: 8, title: 'İlk Bilgisayarlar' },
  { page: 9, title: 'Bilişim Teknolojilerinin Kullanıldığı Alanlar' },
  { page: 10, title: 'Teknolojinin Öncüleri' },
  { page: 11, title: 'Özet: Neler Öğrendik?' },
  { page: 12, title: 'Etkinlikler' },
];

interface PdfSlideViewerProps {
  onAskAi?: (question: string) => void;
}

export const PdfSlideViewer: React.FC<PdfSlideViewerProps> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const totalPages = SLIDES_META.length;

  // Keyboard navigation
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
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, isFullscreen]);

  // Export 12-page exact PDF using jsPDF
  const handleDownloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const slidesText = [
      {
        page: 1,
        title: 'Bilişim Teknolojileri Temel Kavramları',
        sub: '5. Sınıf Bilişim Teknolojileri Dersi\nSaniye ÖZTÜRK',
      },
      {
        page: 2,
        title: 'Temel Kavramlar',
        sub: '• Bilgi: Öğrenilen veya öğretilen şeyler\n• İletişim: Duygu ve düşüncelerin paylaşılması\n• Teknoloji: Hayatı kolaylaştıran yenilikler',
      },
      {
        page: 3,
        title: 'Bilişim Teknolojileri Nedir?',
        sub: '• Toplama: Bilgiyi bir araya getirme\n• İşleme: Bilgiyi düzenleme\n• Saklama: Bilgiyi depolama\n• İletme: Bilgiyi paylaşma',
      },
      {
        page: 4,
        title: 'BİLİŞİM TEKNOLOJİLERİ BİZE NE GİBİ AVANTAJLAR SAĞLIYOR OLABİLİR?',
        sub: '',
      },
      {
        page: 5,
        title: "BİT'in Sağladığı Avantajlar",
        sub: '• Hızlı İletişim: Anında mesajlaşma ve görüntülü görüşme\n• Kolay Erişim: Bilgiye her yerden ulaşım\n• Zaman Tasarrufu: İşler daha hızlı tamamlanır\n• Eğitim Fırsatları: Uzaktan öğrenme imkânı\n• Alışveriş Kolaylığı: Evden sipariş verme',
      },
      {
        page: 6,
        title: 'Eskiden Kullanılan Teknolojiler',
        sub: '• Teyp\n• Daktilo\n• Ev Telefonu\n• Tüplü TV',
      },
      {
        page: 7,
        title: 'Bugün Kullanılan Teknolojiler',
        sub: '• Cep Telefonu    • Dizüstü Bilgisayar    • Drone\n• LED TV    • Flash Bellek',
      },
      {
        page: 8,
        title: 'İlk Bilgisayarlar',
        sub: '1) Abaküs: İlk bilgisayar sayılır\n2) ENİAC: İlk elektronik bilgisayar\nTeknoloji sürekli gelişiyor! 🚀',
      },
      {
        page: 9,
        title: 'Bilişim Teknolojilerinin Kullanıldığı Alanlar',
        sub: '• Eğitim - Mühendislik\n• İletişim - Endüstri\n• Uzay - Sağlık\n• Yapay Zekâ - Ulaşım',
      },
      {
        page: 10,
        title: 'Teknolojinin Öncüleri',
        sub: '• Elon Musk: SpaceX, Tesla, OpenAI, X\n• Jeff Bezos: Amazon kurucusu\n• Mark Zuckerberg: Facebook, Instagram, WhatsApp\n• Bill Gates: Microsoft, Windows, Office\n• Larry Page: Google, Android, YouTube',
      },
      {
        page: 11,
        title: 'Özet: Neler Öğrendik?',
        sub: '01 Temel Kavramlar: Bilgi, İletişim, Teknoloji\n02 BİT Avantajları: Hız, erişim, zaman tasarrufu\n03 Tarihçe: Abaküs → ENİAC → Günümüz\n04 Kullanım Alanları: Eğitim, sağlık, uzay, yapay zekâ…',
      },
      {
        page: 12,
        title: 'Etkinlikler',
        sub: 'Etkinlik 1\nEtkinlik 2',
      },
    ];

    slidesText.forEach((s, idx) => {
      if (idx > 0) doc.addPage('a4', 'landscape');
      
      // Background
      doc.setFillColor(251, 249, 245);
      doc.rect(0, 0, 297, 210, 'F');

      // Title
      doc.setTextColor(45, 27, 20);
      doc.setFontSize(22);
      doc.text(s.title, 25, 40, { maxWidth: 247 });

      // Body text
      if (s.sub) {
        doc.setFontSize(14);
        doc.setTextColor(80, 70, 65);
        doc.text(s.sub, 25, 65, { maxWidth: 247, lineHeightFactor: 1.5 });
      }

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(130, 120, 115);
      doc.text('Saniye ÖZTÜRK', 25, 195);
      doc.text('Made with Gamma', 240, 195);
      doc.text(`Sayfa ${s.page} / 12`, 140, 195);
    });

    doc.save('Bilisim_Teknolojileri_Temel_Kavramlari_5Sinif.pdf');
  };

  // Gamma watermark badge component matching PDF
  const GammaBadge = () => (
    <div className="absolute bottom-4 right-5 sm:bottom-6 sm:right-7 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B0F19] text-white text-[11px] font-medium tracking-wide shadow-md">
      <span className="text-slate-400 font-normal">Made with</span>
      <span className="font-bold tracking-tight bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
        Gamma
      </span>
    </div>
  );

  // Author footer matching PDF
  const AuthorFooter = () => (
    <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-10 text-xs sm:text-sm text-[#7A6B63] font-serif italic">
      Saniye ÖZTÜRK
    </div>
  );

  // 1:1 Rendering of each slide
  const renderSlide = () => {
    switch (currentPage) {
      // PAGE 1: COVER
      case 1:
        return (
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-14 relative bg-[#FBF9F5]">
            {/* Left 3D Classroom Illustration */}
            <div className="w-full md:w-5/12 flex justify-center items-center">
              <img 
                src="/assets/slides/classroom_3d.jpg" 
                alt="Bilişim Sınıfı" 
                className="w-56 h-56 sm:w-72 sm:h-72 object-contain drop-shadow-xl rounded-2xl"
                loading="eager"
              />
            </div>

            {/* Right Titles */}
            <div className="w-full md:w-7/12 text-left pl-0 md:pl-10 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#2D1B15] tracking-tight leading-tight">
                Bilişim Teknolojileri Temel <br />
                Kavramları
              </h1>
              <div className="space-y-1.5 pt-2">
                <p className="text-base sm:text-lg text-[#66554D] font-medium">
                  5. Sınıf Bilişim Teknolojileri Dersi
                </p>
                <p className="text-sm sm:text-base text-[#7A6B63] font-serif italic">
                  Saniye ÖZTÜRK
                </p>
              </div>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 2: TEMEL KAVRAMLAR
      case 2:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#FBF9F5]">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2D1B15] tracking-tight">
              Temel Kavramlar
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left 3D Book & Bulb */}
              <div className="w-full md:w-4/12 flex justify-center">
                <img 
                  src="/assets/slides/book_lightbulb_3d.jpg" 
                  alt="Kitap ve Lamba" 
                  className="w-44 h-44 sm:w-56 sm:h-56 object-contain drop-shadow-md rounded-2xl"
                />
              </div>

              {/* Right 3 Cards */}
              <div className="w-full md:w-8/12 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Bilgi */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2] shadow-2xs">
                  <div className="text-base sm:text-lg font-bold text-[#2D1B15] mb-2 flex items-center gap-1.5">
                    <span>📚</span>
                    <span>Bilgi</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C4A42] leading-relaxed">
                    Öğrenilen veya öğretilen şeyler
                  </p>
                </div>

                {/* İletişim */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2] shadow-2xs">
                  <div className="text-base sm:text-lg font-bold text-[#2D1B15] mb-2 flex items-center gap-1.5">
                    <span>💬</span>
                    <span>İletişim</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C4A42] leading-relaxed">
                    Duygu ve düşüncelerin paylaşılması
                  </p>
                </div>

                {/* Teknoloji */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2] shadow-2xs">
                  <div className="text-base sm:text-lg font-bold text-[#2D1B15] mb-2 flex items-center gap-1.5">
                    <span>🔬</span>
                    <span>Teknoloji</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5C4A42] leading-relaxed">
                    Hayatı kolaylaştıran yenilikler
                  </p>
                </div>
              </div>
            </div>

            <AuthorFooter />
            <GammaBadge />
          </div>
        );

      // PAGE 3: BİLİŞİM TEKNOLOJİLERİ NEDİR?
      case 3:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#FBF9F5]">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2D1B15] tracking-tight">
              Bilişim Teknolojileri Nedir?
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left Computer Illustration */}
              <div className="w-full md:w-5/12 flex justify-center">
                <img 
                  src="/assets/slides/computer_phone_3d.jpg" 
                  alt="Bilgisayar ve Telefon" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-contain drop-shadow-md rounded-2xl"
                />
              </div>

              {/* Right 4 Vertical Cards */}
              <div className="w-full md:w-7/12 space-y-2.5">
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDFB] border border-[#F4E1D2] shadow-2xs">
                  <h3 className="text-sm sm:text-base font-bold text-[#2D1B15]">Toplama</h3>
                  <p className="text-xs sm:text-sm text-[#5C4A42]">Bilgiyi bir araya getirme</p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDFB] border border-[#F4E1D2] shadow-2xs">
                  <h3 className="text-sm sm:text-base font-bold text-[#2D1B15]">İşleme</h3>
                  <p className="text-xs sm:text-sm text-[#5C4A42]">Bilgiyi düzenleme</p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDFB] border border-[#F4E1D2] shadow-2xs">
                  <h3 className="text-sm sm:text-base font-bold text-[#2D1B15]">Saklama</h3>
                  <p className="text-xs sm:text-sm text-[#5C4A42]">Bilgiyi depolama</p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDFB] border border-[#F4E1D2] shadow-2xs">
                  <h3 className="text-sm sm:text-base font-bold text-[#2D1B15]">İletme</h3>
                  <p className="text-xs sm:text-sm text-[#5C4A42]">Bilgiyi paylaşma</p>
                </div>
              </div>
            </div>

            <AuthorFooter />
            <GammaBadge />
          </div>
        );

      // PAGE 4: SORU / TARTIŞMA
      case 4:
        return (
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-14 relative bg-[#FBF9F5]">
            {/* Left 3D Book & Bulb */}
            <div className="w-full md:w-5/12 flex justify-center">
              <img 
                src="/assets/slides/book_lightbulb_3d.jpg" 
                alt="Kitap ve Lamba" 
                className="w-48 h-48 sm:w-64 sm:h-64 object-contain drop-shadow-md rounded-2xl"
              />
            </div>

            {/* Right Question Title */}
            <div className="w-full md:w-7/12 text-center md:text-left pl-0 md:pl-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[#2D1B15] tracking-tight leading-tight uppercase">
                BİLİŞİM TEKNOLOJİLERİ <br />
                BİZE NE GİBİ AVANTAJLAR <br />
                SAĞLIYOR OLABİLİR?
              </h2>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 5: BİT'İN SAĞLADIĞI AVANTAJLAR
      case 5:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#FBF9F5]">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2D1B15] tracking-tight">
              BİT'in Sağladığı Avantajlar
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-auto max-w-4xl">
              {/* Item 1 */}
              <div className="flex items-start gap-3">
                <span className="text-2xl text-[#E06D53]">⚡</span>
                <div>
                  <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Hızlı İletişim</h3>
                  <p className="text-xs sm:text-sm text-[#5C4A42]">
                    Anında mesajlaşma ve görüntülü görüşme
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3">
                <span className="text-2xl text-[#E06D53]">🔍</span>
                <div>
                  <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Kolay Erişim</h3>
                  <p className="text-xs sm:text-sm text-[#5C4A42]">
                    Bilgiye her yerden ulaşım
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3">
                <span className="text-2xl text-[#E06D53]">⏰</span>
                <div>
                  <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Zaman Tasarrufu</h3>
                  <p className="text-xs sm:text-sm text-[#5C4A42]">
                    İşler daha hızlı tamamlanır
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3">
                <span className="text-2xl text-[#E06D53]">🎓</span>
                <div>
                  <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Eğitim Fırsatları</h3>
                  <p className="text-xs sm:text-sm text-[#5C4A42]">
                    Uzaktan öğrenme imkânı
                  </p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="flex items-start gap-3">
                <span className="text-2xl text-[#E06D53]">🛒</span>
                <div>
                  <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Alışveriş Kolaylığı</h3>
                  <p className="text-xs sm:text-sm text-[#5C4A42]">
                    Evden sipariş verme
                  </p>
                </div>
              </div>
            </div>

            <AuthorFooter />
            <GammaBadge />
          </div>
        );

      // PAGE 6: ESKİDEN KULLANILAN TEKNOLOJİLER
      case 6:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#FBF9F5]">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2D1B15] tracking-tight leading-snug">
              Eskiden Kullanılan <br />
              Teknolojiler
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left 4 Stacked Items */}
              <div className="w-full md:w-6/12 space-y-2.5">
                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDFB] border border-[#F4E1D2] flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">
                    📼
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#2D1B15]">Teyp</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDFB] border border-[#F4E1D2] flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">
                    ⌨️
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#2D1B15]">Daktilo</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDFB] border border-[#F4E1D2] flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">
                    ☎️
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#2D1B15]">Ev Telefonu</span>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDFB] border border-[#F4E1D2] flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">
                    📺
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#2D1B15]">Tüplü TV</span>
                </div>
              </div>

              {/* Right Typewriter 3D */}
              <div className="w-full md:w-6/12 flex justify-center">
                <img 
                  src="/assets/slides/typewriter_3d.jpg" 
                  alt="Daktilo" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-contain drop-shadow-md rounded-2xl"
                />
              </div>
            </div>

            <AuthorFooter />
            <GammaBadge />
          </div>
        );

      // PAGE 7: BUGÜN KULLANILAN TEKNOLOJİLER
      case 7:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#FBF9F5]">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2D1B15] tracking-tight">
              Bugün Kullanılan Teknolojiler
            </h2>

            <div className="my-auto space-y-4 max-w-4xl w-full">
              {/* Row 1: 3 items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2] flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <span className="font-bold text-[#2D1B15] text-sm sm:text-base">Cep Telefonu</span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2] flex items-center gap-3">
                  <span className="text-2xl">💻</span>
                  <span className="font-bold text-[#2D1B15] text-sm sm:text-base">Dizüstü Bilgisayar</span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2] flex items-center gap-3">
                  <span className="text-2xl">🚁</span>
                  <span className="font-bold text-[#2D1B15] text-sm sm:text-base">Drone</span>
                </div>
              </div>

              {/* Row 2: 2 items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:w-2/3">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2] flex items-center gap-3">
                  <span className="text-2xl">📺</span>
                  <span className="font-bold text-[#2D1B15] text-sm sm:text-base">LED TV</span>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2] flex items-center gap-3">
                  <span className="text-2xl">💾</span>
                  <span className="font-bold text-[#2D1B15] text-sm sm:text-base">Flash Bellek</span>
                </div>
              </div>
            </div>

            <AuthorFooter />
            <GammaBadge />
          </div>
        );

      // PAGE 8: İLK BİLGİSAYARLAR
      case 8:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#FBF9F5]">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2D1B15] tracking-tight">
              İlk Bilgisayarlar
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left Abacus & ENIAC Image */}
              <div className="w-full md:w-5/12 flex justify-center">
                <img 
                  src="/assets/slides/abacus_computer_3d.jpg" 
                  alt="Abaküs ve ENIAC" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-contain drop-shadow-md rounded-2xl"
                />
              </div>

              {/* Right Cards */}
              <div className="w-full md:w-7/12 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Abaküs */}
                  <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2] flex flex-col items-center text-center relative pt-6">
                    <span className="w-7 h-7 rounded-full bg-[#E06D53] text-white font-bold text-xs flex items-center justify-center absolute -top-3">
                      1
                    </span>
                    <h3 className="font-bold text-[#2D1B15] text-base mb-1">Abaküs</h3>
                    <p className="text-xs sm:text-sm text-[#5C4A42]">İlk bilgisayar sayılır</p>
                  </div>

                  {/* ENİAC */}
                  <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2] flex flex-col items-center text-center relative pt-6">
                    <span className="w-7 h-7 rounded-full bg-[#E06D53] text-white font-bold text-xs flex items-center justify-center absolute -top-3">
                      2
                    </span>
                    <h3 className="font-bold text-[#2D1B15] text-base mb-1">ENİAC</h3>
                    <p className="text-xs sm:text-sm text-[#5C4A42]">İlk elektronik bilgisayar</p>
                  </div>
                </div>

                {/* Bottom banner */}
                <div className="p-3.5 rounded-xl bg-[#FFF5EE] border border-[#F7D9CC] flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#2D1B15]">
                  <span>💭</span>
                  <span>Teknoloji sürekli gelişiyor! 🚀</span>
                </div>
              </div>
            </div>

            <AuthorFooter />
            <GammaBadge />
          </div>
        );

      // PAGE 9: KULLANILDIĞI ALANLAR
      case 9:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#FBF9F5]">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2D1B15] tracking-tight">
              Bilişim Teknolojilerinin Kullanıldığı Alanlar
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto max-w-3xl w-full">
              {[
                { title: 'Eğitim', icon: '🎓' },
                { title: 'Mühendislik', icon: '⚙️' },
                { title: 'İletişim', icon: '💬' },
                { title: 'Endüstri', icon: '🏭' },
                { title: 'Uzay', icon: '🚀' },
                { title: 'Sağlık', icon: '🩺' },
                { title: 'Yapay Zekâ', icon: '🤖' },
                { title: 'Ulaşım', icon: '🚗' },
              ].map((area) => (
                <div 
                  key={area.title} 
                  className="p-3.5 sm:p-4 rounded-xl bg-[#FFFDFB] border border-[#F4E1D2] flex items-center gap-3"
                >
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-base">
                    {area.icon}
                  </span>
                  <span className="font-bold text-[#2D1B15] text-sm sm:text-base">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>

            <AuthorFooter />
            <GammaBadge />
          </div>
        );

      // PAGE 10: TEKNOLOJİNİN ÖNCÜLERİ
      case 10:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#FBF9F5]">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2D1B15] tracking-tight">
              Teknolojinin Öncüleri
            </h2>

            <div className="my-auto space-y-4 max-w-4xl w-full">
              {/* Row 1: 3 pioneers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2]">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🚀</span>
                    <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Elon Musk</h3>
                  </div>
                  <p className="text-xs text-[#66554D]">SpaceX, Tesla, OpenAI, X</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2]">
                  <div className="flex items-center gap-2 mb-1">
                    <span>📦</span>
                    <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Jeff Bezos</h3>
                  </div>
                  <p className="text-xs text-[#66554D]">Amazon kurucusu</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2]">
                  <div className="flex items-center gap-2 mb-1">
                    <span>👍</span>
                    <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Mark Zuckerberg</h3>
                  </div>
                  <p className="text-xs text-[#66554D]">Facebook, Instagram, WhatsApp</p>
                </div>
              </div>

              {/* Row 2: 2 pioneers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:w-2/3">
                <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2]">
                  <div className="flex items-center gap-2 mb-1">
                    <span>💻</span>
                    <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Bill Gates</h3>
                  </div>
                  <p className="text-xs text-[#66554D]">Microsoft, Windows, Office</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#F4E1D2]">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🔍</span>
                    <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Larry Page</h3>
                  </div>
                  <p className="text-xs text-[#66554D]">Google, Android, YouTube</p>
                </div>
              </div>
            </div>

            <AuthorFooter />
            <GammaBadge />
          </div>
        );

      // PAGE 11: ÖZET: NELER ÖĞRENDİK?
      case 11:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#FBF9F5]">
            <h2 className="text-2xl sm:text-4xl font-serif text-[#2D1B15] tracking-tight">
              Özet: Neler Öğrendik?
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left 4 Summary steps with orange rules */}
              <div className="w-full md:w-6/12 space-y-3">
                <div className="pb-2 border-b border-[#E8A593]">
                  <span className="text-[11px] text-[#A89890] uppercase tracking-wider block">01</span>
                  <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Temel Kavramlar</h3>
                  <p className="text-xs text-[#5C4A42]">Bilgi, İletişim, Teknoloji</p>
                </div>

                <div className="pb-2 border-b border-[#E8A593]">
                  <span className="text-[11px] text-[#A89890] uppercase tracking-wider block">02</span>
                  <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">BİT Avantajları</h3>
                  <p className="text-xs text-[#5C4A42]">Hız, erişim, zaman tasarrufu</p>
                </div>

                <div className="pb-2 border-b border-[#E8A593]">
                  <span className="text-[11px] text-[#A89890] uppercase tracking-wider block">03</span>
                  <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Tarihçe</h3>
                  <p className="text-xs text-[#5C4A42]">Abaküs → ENİAC → Günümüz</p>
                </div>

                <div className="pb-2 border-b border-[#E8A593]">
                  <span className="text-[11px] text-[#A89890] uppercase tracking-wider block">04</span>
                  <h3 className="font-bold text-[#2D1B15] text-sm sm:text-base">Kullanım Alanları</h3>
                  <p className="text-xs text-[#5C4A42]">Eğitim, sağlık, uzay, yapay zekâ…</p>
                </div>
              </div>

              {/* Right Classroom 3D image */}
              <div className="w-full md:w-6/12 flex justify-center">
                <img 
                  src="/assets/slides/classroom_3d.jpg" 
                  alt="Öğrenme Ortamı" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-contain drop-shadow-md rounded-2xl"
                />
              </div>
            </div>

            <AuthorFooter />
            <GammaBadge />
          </div>
        );

      // PAGE 12: ETKİNLİKLER
      case 12:
        return (
          <div className="w-full h-full flex flex-col justify-between p-8 sm:p-14 relative bg-[#FBF9F5]">
            <h2 className="text-3xl sm:text-5xl font-serif text-[#2D1B15] tracking-tight">
              Etkinlikler
            </h2>

            <div className="my-auto space-y-4">
              <button 
                type="button"
                onClick={() => {
                  setSelectedActivity(1);
                  setQuizAnswers({});
                }}
                className="block text-left text-base sm:text-lg text-[#5A1D13] font-serif underline cursor-pointer hover:text-red-700 transition-colors"
              >
                Etkinlik 1
              </button>
              <button 
                type="button"
                onClick={() => {
                  setSelectedActivity(2);
                  setQuizAnswers({});
                }}
                className="block text-left text-base sm:text-lg text-[#5A1D13] font-serif underline cursor-pointer hover:text-red-700 transition-colors"
              >
                Etkinlik 2
              </button>
            </div>

            <GammaBadge />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Slide Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FBF9F5] border border-[#E8DFD3] px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-2xs">
        {/* Left info */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#2D1B15] text-white flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#2D1B15]">Bilişim Teknolojileri Temel Kavramları</span>
              <span className="px-2 py-0.5 rounded-md bg-[#F4E1D2] text-[#5C4A42] text-[10px] font-bold">
                PDF Slaytı
              </span>
            </div>
            <p className="text-[11px] text-[#7A6B63]">
              Sayfa {currentPage} / {totalPages} • <strong>Saniye ÖZTÜRK</strong>
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Pagination */}
          <div className="flex items-center bg-white border border-[#E8DFD3] rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-1.5 rounded-lg text-[#5C4A42] hover:bg-[#FBF9F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Önceki Slayt (Sol Ok)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 text-xs font-bold text-[#2D1B15] select-none">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="p-1.5 rounded-lg text-[#5C4A42] hover:bg-[#FBF9F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Sonraki Slayt (Sağ Ok)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-white hover:bg-[#FBF9F5] border border-[#E8DFD3] text-[#5C4A42] transition-colors cursor-pointer"
            title={isFullscreen ? 'Tam Ekrandan Çık (Esc)' : 'Tam Ekranda Sun'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Download PDF button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2D1B15] hover:bg-[#452D24] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            title="PDF Slaytı İndir"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF İndir</span>
          </button>
        </div>
      </div>

      {/* Main Slide Display Viewport */}
      <div 
        className={`w-full rounded-2xl overflow-hidden border border-[#E8DFD3] shadow-md bg-[#FBF9F5] transition-all relative ${
          isFullscreen 
            ? 'fixed inset-0 z-50 rounded-none border-none h-screen w-screen' 
            : 'h-[460px] sm:h-[520px] md:h-[560px]'
        }`}
      >
        {isFullscreen && (
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/60 text-white hover:bg-black transition-colors cursor-pointer"
            title="Tam Ekrandan Çık"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        )}
        {renderSlide()}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {SLIDES_META.map((slide) => {
          const isSelected = slide.page === currentPage;
          return (
            <button
              key={slide.page}
              type="button"
              onClick={() => setCurrentPage(slide.page)}
              className={`px-3 py-2 rounded-xl text-xs shrink-0 transition-all cursor-pointer text-left border ${
                isSelected 
                  ? 'bg-[#2D1B15] text-white border-[#2D1B15] shadow-xs font-bold' 
                  : 'bg-white hover:bg-[#FBF9F5] text-[#5C4A42] border-[#E8DFD3] font-medium'
              }`}
            >
              <span className="block text-[10px] opacity-75">Sayfa {slide.page}</span>
              <span className="truncate max-w-[120px] block">
                {slide.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Activity Dialog for Etkinlik 1 & Etkinlik 2 */}
      {selectedActivity !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setSelectedActivity(null)}
        >
          <div 
            className="bg-[#FBF9F5] rounded-3xl w-full max-w-2xl border border-[#E8DFD3] shadow-2xl p-6 relative flex flex-col max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3]">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-[#2D1B15] text-white flex items-center justify-center font-bold text-sm">
                  {selectedActivity}
                </span>
                <div>
                  <h3 className="text-lg font-bold font-serif text-[#2D1B15]">
                    {selectedActivity === 1 
                      ? 'Etkinlik 1: Temel Kavramları Pekiştirelim' 
                      : 'Etkinlik 2: Eski - Günümüz Teknolojileri ve Öncüler'}
                  </h3>
                  <p className="text-xs text-[#7A6B63]">
                    5. Sınıf 1. Hafta Bilişim Teknolojileri Dersi
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="p-1.5 rounded-full hover:bg-[#E8DFD3]/60 text-[#5C4A42] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content for Activity 1 */}
            {selectedActivity === 1 && (
              <div className="py-4 space-y-4">
                <p className="text-sm text-[#5C4A42]">
                  Aşağıdaki soruları yanıtlayarak derste öğrendiğin <strong>Bilgi, İletişim, Teknoloji</strong> ve <strong>BİT İşlem Basamakları</strong> kavramlarını sına!
                </p>

                {[
                  {
                    id: 1,
                    q: '1. "Öğrenilen veya öğretilen şeyler" hangi temel kavramdır?',
                    options: ['Bilgi', 'İletişim', 'Teknoloji'],
                    answer: 'Bilgi',
                  },
                  {
                    id: 2,
                    q: '2. "Duygu ve düşüncelerin paylaşılması" hangi temel kavramdır?',
                    options: ['İletişim', 'Toplama', 'Saklama'],
                    answer: 'İletişim',
                  },
                  {
                    id: 3,
                    q: '3. "Hayatı kolaylaştıran yenilikler" hangi temel kavramdır?',
                    options: ['Teknoloji', 'Bilgi', 'İletme'],
                    answer: 'Teknoloji',
                  },
                  {
                    id: 4,
                    q: '4. BİT işlem basamaklarında "Bilgiyi depolama" hangisidir?',
                    options: ['Saklama', 'İşleme', 'Toplama'],
                    answer: 'Saklama',
                  },
                ].map((item) => {
                  const selected = quizAnswers[item.id];
                  const isCorrect = selected === item.answer;
                  return (
                    <div key={item.id} className="p-4 rounded-2xl bg-white border border-[#E8DFD3] space-y-2.5">
                      <p className="font-semibold text-sm text-[#2D1B15]">{item.q}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.options.map((opt) => {
                          const isOptionSelected = selected === opt;
                          let btnClass = "px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ";
                          if (!selected) {
                            btnClass += "bg-[#FBF9F5] border-[#E8DFD3] text-[#5C4A42] hover:border-[#2D1B15] hover:text-[#2D1B15]";
                          } else if (opt === item.answer) {
                            btnClass += "bg-emerald-100 border-emerald-400 text-emerald-800 font-bold";
                          } else if (isOptionSelected) {
                            btnClass += "bg-rose-100 border-rose-300 text-rose-700";
                          } else {
                            btnClass += "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                          }
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [item.id]: opt }))}
                              className={btnClass}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {selected && (
                        <p className={`text-xs font-medium flex items-center gap-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {isCorrect ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? 'Tebrikler, doğru cevap!' : `Yanlış cevap! Doğrusu: ${item.answer}`}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Content for Activity 2 */}
            {selectedActivity === 2 && (
              <div className="py-4 space-y-4">
                <p className="text-sm text-[#5C4A42]">
                  Aşağıdaki sorularla <strong>Eski ve Günümüz Teknolojilerini</strong> ve <strong>Teknolojinin Öncülerini</strong> test et!
                </p>

                {[
                  {
                    id: 11,
                    q: '1. Aşağıdakilerden hangisi eskiden kullanılan bir teknolojidir?',
                    options: ['Daktilo', 'Drone', 'Flash Bellek'],
                    answer: 'Daktilo',
                  },
                  {
                    id: 12,
                    q: '2. Tarihteki ilk elektronik bilgisayar hangisidir?',
                    options: ['ENİAC', 'Abaküs', 'Dizüstü Bilgisayar'],
                    answer: 'ENİAC',
                  },
                  {
                    id: 13,
                    q: '3. Microsoft, Windows ve Office\'in kurucu öncüsü kimdir?',
                    options: ['Bill Gates', 'Elon Musk', 'Jeff Bezos'],
                    answer: 'Bill Gates',
                  },
                  {
                    id: 14,
                    q: '4. SpaceX, Tesla, OpenAI ve X ile bilinen öncü kimdir?',
                    options: ['Elon Musk', 'Mark Zuckerberg', 'Larry Page'],
                    answer: 'Elon Musk',
                  },
                ].map((item) => {
                  const selected = quizAnswers[item.id];
                  const isCorrect = selected === item.answer;
                  return (
                    <div key={item.id} className="p-4 rounded-2xl bg-white border border-[#E8DFD3] space-y-2.5">
                      <p className="font-semibold text-sm text-[#2D1B15]">{item.q}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.options.map((opt) => {
                          const isOptionSelected = selected === opt;
                          let btnClass = "px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ";
                          if (!selected) {
                            btnClass += "bg-[#FBF9F5] border-[#E8DFD3] text-[#5C4A42] hover:border-[#2D1B15] hover:text-[#2D1B15]";
                          } else if (opt === item.answer) {
                            btnClass += "bg-emerald-100 border-emerald-400 text-emerald-800 font-bold";
                          } else if (isOptionSelected) {
                            btnClass += "bg-rose-100 border-rose-300 text-rose-700";
                          } else {
                            btnClass += "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                          }
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [item.id]: opt }))}
                              className={btnClass}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {selected && (
                        <p className={`text-xs font-medium flex items-center gap-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                          {isCorrect ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? 'Tebrikler, doğru cevap!' : `Yanlış cevap! Doğrusu: ${item.answer}`}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer */}
            <div className="pt-3 border-t border-[#E8DFD3] flex items-center justify-between">
              <span className="text-xs text-[#7A6B63] italic font-serif">
                Saniye ÖZTÜRK • Bilişim Teknolojileri
              </span>
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-1.5 rounded-xl bg-[#2D1B15] text-white text-xs font-semibold hover:bg-[#442B23] transition-colors cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
