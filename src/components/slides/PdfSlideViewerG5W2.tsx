import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Download,
  FileText,
  MessageCircle,
  Search,
  ShoppingCart,
  Briefcase,
  AlertTriangle,
  Ban,
  HelpCircle,
  Clock,
  Heart,
  Users,
  Eye,
  Activity,
  ShieldAlert,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export interface SlideMeta {
  page: number;
  title: string;
}

export const SLIDES_META_G5_W2: SlideMeta[] = [
  { page: 1, title: 'Bilişim Teknolojilerinin Etkileri ve Dijital Sağlık' },
  { page: 2, title: "BT'nin Toplumsal Hayata Etkileri" },
  { page: 3, title: 'Teknoloji Hayatı Nasıl Kolaylaştırıyor?' },
  { page: 4, title: 'Bankacılıktan Sanal Dolandırıcılığa' },
  { page: 5, title: 'Bilişim Teknolojilerinin Olumsuz Yönleri' },
  { page: 6, title: 'Teknoloji ve Oyun Bağımlılığı' },
  { page: 7, title: 'Teknolojinin Bedenimize ve Ruh Sağlığımıza Etkileri' },
  { page: 8, title: 'Teknoloji ve Zaman Yönetimi' },
  { page: 9, title: 'Ergonomi: Doğru Oturuş' },
  { page: 10, title: 'Unutma! 🌟' },
];

interface PdfSlideViewerG5W2Props {
  onAskAi?: (question: string) => void;
}

export const PdfSlideViewerG5W2: React.FC<PdfSlideViewerG5W2Props> = ({ onAskAi }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const totalPages = SLIDES_META_G5_W2.length;

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

  // PDF Export
  const handleDownloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const slides = [
      {
        title: 'Bilişim Teknolojilerinin Etkileri ve Dijital Sağlık',
        body: '5. SINIF - Bilişim Teknolojileri Dersi\nTeknoloji hayatımızı nasıl değiştiriyor? Birlikte keşfedelim!\n5. Sınıf 1. Dönem 2. Hafta',
      },
      {
        title: "BT'nin Toplumsal Hayata Etkileri",
        body: 'Bilgisayarlar, tabletler ve akıllı telefonlar artık hayatımızın bir parçası!\n\n• İletişim: Kurma şeklimiz değişti\n• Bilgiye Ulaşım: Daha kolay ve hızlı\n• Alışveriş: Alışkanlıklarımız değişti\n• Yeni Meslekler: Yeni alanlar ortaya çıktı',
      },
      {
        title: 'Teknoloji Hayatı Nasıl Kolaylaştırıyor?',
        body: '→ Sosyal yaşam değişti\n→ Sağlık ve eğitim kolaylaştı\n→ Maliyet azaldı, verimlilik arttı\n\nSoru: Sizce toplumun hangi yaşantıları değişti?',
      },
      {
        title: 'Bankacılıktan Sanal Dolandırıcılığa',
        body: 'Teknoloji kolaylıklar sağlarken bazı riskler de doğuruyor…\n\n1. Bankacılık: Geleneksel, yüz yüze hizmet\n2. İnternet Bankacılığı: Hızlı ve pratik işlem kolaylığı\n3. Sanal Dolandırıcılık: Dikkat edilmezse risk ve zarar\n\n"İnternet bankacılığı hayatı kolaylaştırır, ancak dikkatli olmazsak sanal dolandırıcılığa maruz kalabiliriz!"',
      },
      {
        title: 'Bilişim Teknolojilerinin Olumsuz Yönleri',
        body: '• Siber Zorbalık\n• Sanal Dolandırıcılık\n• Teknoloji ve Oyun Bağımlılığı\n• Veri Hırsızlığı\n• Bilgi Kirliliği\n\nSoru: Sizce ne gibi olumsuz etkileri vardır?',
      },
      {
        title: 'Teknoloji ve Oyun Bağımlılığı',
        body: 'Oyun ve Ekran Bağımlılığının Sonuçları:\n• Şiddete eğilim\n• Derslerde başarısızlık\n• Özgüven problemleri\n• Dikkat kaybı ve unutkanlık\n• İçine kapanıklık\n• Aile ile iletişim sorunları\n\nÖNEMLİ: Teknoloji bağımlılığı artık resmi olarak bir hastalık sayılmaktadır!',
      },
      {
        title: 'Teknolojinin Bedenimize ve Ruh Sağlığımıza Etkileri',
        body: '• Boyun Ağrısı: Kas ağrıları ve tutulma\n• Görme Bozukluğu: Göz yorgunluğu ve bozukluk\n• Duruş Bozukluğu: Omurga ve duruş sorunları\n• Kilo Problemleri: Hareketsizlikten kaynaklanır\n• Psikolojik Sorunlar: Kaygı ve stres artar',
      },
      {
        title: 'Teknoloji ve Zaman Yönetimi',
        body: 'Günlük Öneriler:\n• Ekran süresini 2-3 saatle sınırlayın\n• Uykudan 1 saat önce ekranı bırakın\n\nDünya Sağlık Örgütü (DSÖ) Önerisi:\n• 0-3 yaş: Hiç kullanmamalı\n• 4-12 yaş: 60 dk\'yı geçmemeli\n• 13+ yaş: 120 dk\'yı geçmemeli',
      },
      {
        title: 'Ergonomi: Doğru Oturuş',
        body: 'Ergonomi: Bilgisayar kullanırken sağlığımıza zarar vermeden rahat çalışmamızı sağlayan duruştur.\n\n1. Dik otur, ekran göz hizasında\n2. 50-70 cm uzaklık, bilekler destekli\n3. Ayaklar yere bassın, ışık dik gelmesin\n4. Her 25 dakikada mola ver!\n\nSoru: Sizce bilgisayar kullanırken nasıl oturmalıyız?',
      },
      {
        title: 'Unutma! 🌟',
        body: '• Zaman: Geri döndürülemez en değerli şeyimizdir\n• Sağlık: Beden ve ruh sağlığımız her şeyden önemli\n• Aile & Arkadaşlar: Sanal ortamdan çok daha değerlidir\n\n"Teknolojiyi kullanırken kültürel ve manevi değerlerimizi kaybetmemeliyiz!"',
      },
    ];

    slides.forEach((s, idx) => {
      if (idx > 0) doc.addPage();
      
      // Background
      doc.setFillColor(251, 249, 245);
      doc.rect(0, 0, 297, 210, 'F');

      // Header Bar
      doc.setFillColor(45, 27, 21);
      doc.rect(15, 12, 267, 1.5, 'F');

      // Title
      doc.setFont('times', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(45, 27, 21);
      doc.text(s.title, 20, 25);

      // Page Number Badge
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(150, 140, 130);
      doc.text(`Sayfa ${idx + 1} / ${slides.length}`, 260, 25);

      // Body text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(60, 50, 45);
      const splitText = doc.splitTextToSize(s.body, 255);
      doc.text(splitText, 20, 42);

      // Footer
      doc.setFontSize(9);
      doc.setTextColor(140, 120, 100);
      doc.text('5. Sınıf Bilişim Teknolojileri • 1. Dönem 2. Hafta', 20, 198);
      doc.text('Made with Gamma', 255, 198);
    });

    doc.save('5-sinif-2-hafta-dijital-saglik-slaytlari.pdf');
  };

  const GammaBadge = () => (
    <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111827] text-white text-[11px] font-medium tracking-wide shadow-md pointer-events-none">
      <span className="text-slate-400 font-normal">Made with</span>
      <span className="font-bold tracking-wider text-amber-200">GAMMA</span>
    </div>
  );

  return (
    <div 
      className={`relative flex flex-col bg-slate-900 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen' : 'w-full'
      }`}
    >
      {/* Top Controls Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 text-white z-30">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-orange-500/20 text-orange-400 font-bold text-xs">
            PDF
          </span>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-slate-100 flex items-center gap-2">
              <span>5. Sınıf 2. Hafta: Bilişim Teknolojilerinin Etkileri ve Dijital Sağlık</span>
              <span className="hidden md:inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
                10 Sayfa
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {SLIDES_META_G5_W2[currentPage - 1].title}
            </p>
          </div>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Ask AI Button */}
          {onAskAi && (
            <button
              onClick={() => onAskAi(`5. sınıf 2. hafta "${SLIDES_META_G5_W2[currentPage - 1].title}" slaytı hakkında öğrenci seviyesinde bir özet ve 2 adet pekiştirme sorusu hazırlar mısın?`)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-medium transition-colors cursor-pointer"
              title="Bu slayt hakkında yapay zekaya soru sor"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Yapay Zekaya Sor</span>
            </button>
          )}

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
            title="PDF Olarak İndir"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF İndir</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            title={isFullscreen ? 'Tam Ekrandan Çık (Esc)' : 'Tam Ekran (Akıllı Tahta)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas Container (16:9 Aspect Ratio) */}
      <div className="relative flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-900/60 min-h-[460px] sm:min-h-[520px] md:min-h-[580px]">
        {/* Navigation Arrow Left */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Önceki Slayt"
          className="absolute left-2 sm:left-4 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white disabled:opacity-20 disabled:hover:bg-black/40 backdrop-blur-xs transition-all cursor-pointer disabled:cursor-not-allowed shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          aria-label="Sonraki Slayt"
          className="absolute right-2 sm:right-4 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white disabled:opacity-20 disabled:hover:bg-black/40 backdrop-blur-xs transition-all cursor-pointer disabled:cursor-not-allowed shadow-lg"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* The Slide Sheet */}
        <div 
          className="relative w-full max-w-5xl aspect-[16/9] bg-[#FBF9F5] text-[#2D1B15] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col p-6 sm:p-8 md:p-10 border border-[#E8DFD3]"
          style={{ fontFamily: 'Merriweather, Georgia, serif' }}
        >
          {/* ============================================================== */}
          {/* SLIDE 1: Kapak */}
          {/* ============================================================== */}
          {currentPage === 1 && (
            <div className="h-full flex items-center justify-between gap-6 relative">
              {/* Left visual: 3D students collaborating with devices */}
              <div className="w-1/2 h-full flex items-center justify-center">
                <img 
                  src="/assets/slides/g5w2_cover.jpg" 
                  alt="Bilişim Teknolojilerinin Etkileri ve Dijital Sağlık"
                  className="max-h-full max-w-full object-contain rounded-2xl drop-shadow-lg"
                />
              </div>

              {/* Right text content */}
              <div className="w-1/2 flex flex-col justify-center pl-2 sm:pl-6 space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-[#2D1B15] leading-tight font-serif">
                  Bilişim Teknolojilerinin<br />
                  <span className="text-[#3E2319]">Etkileri ve Dijital Sağlık</span>
                </h1>

                <div>
                  <span className="inline-block px-3.5 py-1 rounded-md bg-[#FCECE0] text-[#B45309] font-sans font-bold text-xs tracking-wider">
                    5. SINIF
                  </span>
                </div>

                <p className="text-sm sm:text-base md:text-lg text-[#5C4A42] font-sans font-normal pt-1">
                  Teknoloji hayatımızı nasıl değiştiriyor? Birlikte keşfedelim!
                </p>
              </div>

              <GammaBadge />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 2: BT'nin Toplumsal Hayata Etkileri */}
          {/* ============================================================== */}
          {currentPage === 2 && (
            <div className="h-full flex flex-col relative">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#2D1B15]">
                  BT'nin Toplumsal Hayata Etkileri
                </h2>
                <p className="text-xs sm:text-sm text-[#7A6B63] font-sans mt-1">
                  Bilgisayarlar, tabletler ve akıllı telefonlar artık hayatımızın bir parçası!
                </p>
              </div>

              <div className="flex-1 flex items-center gap-6 mt-3">
                {/* Left 3D Globe with network nodes */}
                <div className="w-5/12 h-full flex items-center justify-center">
                  <img 
                    src="/assets/slides/g5w2_network.jpg" 
                    alt="BT Toplumsal Hayat Etkileri"
                    className="max-h-[82%] object-contain rounded-2xl drop-shadow-md"
                  />
                </div>

                {/* Right 4 cards */}
                <div className="w-7/12 flex flex-col justify-center space-y-2.5 sm:space-y-3 font-sans">
                  {/* Card 1 */}
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <div className="w-10 h-10 rounded-full bg-[#FAECE2] flex items-center justify-center text-[#E06D37] shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#2D1B15]">İletişim</h4>
                      <p className="text-xs text-[#7A6B63]">Kurma şeklimiz değişti</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <div className="w-10 h-10 rounded-full bg-[#FAECE2] flex items-center justify-center text-[#E06D37] shrink-0">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#2D1B15]">Bilgiye Ulaşım</h4>
                      <p className="text-xs text-[#7A6B63]">Daha kolay ve hızlı</p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <div className="w-10 h-10 rounded-full bg-[#FAECE2] flex items-center justify-center text-[#E06D37] shrink-0">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#2D1B15]">Alışveriş</h4>
                      <p className="text-xs text-[#7A6B63]">Alışkanlıklarımız değişti</p>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <div className="w-10 h-10 rounded-full bg-[#FAECE2] flex items-center justify-center text-[#E06D37] shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#2D1B15]">Yeni Meslekler</h4>
                      <p className="text-xs text-[#7A6B63]">Yeni alanlar ortaya çıktı</p>
                    </div>
                  </div>
                </div>
              </div>

              <GammaBadge />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 3: Teknoloji Hayatı Nasıl Kolaylaştırıyor? */}
          {/* ============================================================== */}
          {currentPage === 3 && (
            <div className="h-full flex flex-col relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#2D1B15]">
                Teknoloji Hayatı Nasıl Kolaylaştırıyor?
              </h2>

              <div className="flex-1 flex items-center gap-6 my-2">
                {/* Left 3D Elderly tech illustration */}
                <div className="w-5/12 h-full flex items-center justify-center">
                  <img 
                    src="/assets/slides/g5w2_elderly.jpg" 
                    alt="Teknoloji Hayatı Kolaylaştırıyor"
                    className="max-h-[85%] object-contain rounded-2xl drop-shadow-md"
                  />
                </div>

                {/* Right bullets and question */}
                <div className="w-7/12 flex flex-col justify-center space-y-4 font-sans">
                  <div className="space-y-3 pl-2 text-sm sm:text-base md:text-lg text-[#3E2B24]">
                    <div className="flex items-center gap-3">
                      <span className="text-[#E06D37] font-bold text-xl">→</span>
                      <span>Sosyal yaşam değişti</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#E06D37] font-bold text-xl">→</span>
                      <span>Sağlık ve eğitim kolaylaştı</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#E06D37] font-bold text-xl">→</span>
                      <span>Maliyet azaldı, verimlilik arttı</span>
                    </div>
                  </div>

                  {/* Discussion question box */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-[#EBE7E0]/60 border border-[#DDD5C9] flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#7A6B63] shrink-0" />
                    <p className="text-xs sm:text-sm text-[#4A3B35] font-medium">
                      Sizce toplumun hangi yaşantıları değişti?
                    </p>
                  </div>
                </div>
              </div>

              <GammaBadge />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 4: Bankacılıktan Sanal Dolandırıcılığa */}
          {/* ============================================================== */}
          {currentPage === 4 && (
            <div className="h-full flex flex-col justify-between relative font-sans">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#2D1B15]">
                  Bankacılıktan Sanal Dolandırıcılığa
                </h2>
                <p className="text-xs sm:text-sm text-[#7A6B63] mt-1">
                  Teknoloji kolaylıklar sağlarken bazı riskler de doğuruyor…
                </p>
              </div>

              {/* Curved Flow Diagram */}
              <div className="my-auto py-2">
                <div className="grid grid-cols-3 gap-4 items-center relative">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/80 border border-[#E8DFD3] shadow-xs">
                    <div className="w-3 h-3 rounded-full bg-[#B45309] mb-2" />
                    <h3 className="font-serif font-bold text-base text-[#2D1B15]">Bankacılık</h3>
                    <p className="text-xs text-[#7A6B63] mt-1">Geleneksel, yüz yüze hizmet</p>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/80 border border-[#E8DFD3] shadow-xs relative">
                    <div className="w-3 h-3 rounded-full bg-[#E06D37] mb-2" />
                    <h3 className="font-serif font-bold text-base text-[#2D1B15]">İnternet Bankacılığı</h3>
                    <p className="text-xs text-[#7A6B63] mt-1">Hızlı ve pratik işlem kolaylığı</p>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/80 border border-[#E8DFD3] shadow-xs">
                    <div className="w-3 h-3 rounded-full bg-[#DC2626] mb-2" />
                    <h3 className="font-serif font-bold text-base text-[#2D1B15]">Sanal Dolandırıcılık</h3>
                    <p className="text-xs text-[#7A6B63] mt-1">Dikkat edilmezse risk ve zarar</p>
                  </div>
                </div>

                {/* Connecting Curved Arc Graphic */}
                <div className="mt-3 px-8 flex items-center justify-between text-[#E06D37]">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-[#B45309] via-[#E06D37] to-[#DC2626] rounded-full" />
                </div>
              </div>

              {/* Bottom alert sentence */}
              <div className="text-xs sm:text-sm text-[#4A3B35] bg-[#F4EFEB] p-3 rounded-2xl border border-[#E2D8CD]">
                İnternet bankacılığı hayatı kolaylaştırır, ancak <strong className="text-[#2D1B15]">dikkatli olmazsak</strong> sanal dolandırıcılığa maruz kalabiliriz!
              </div>

              <GammaBadge />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 5: Bilişim Teknolojilerinin Olumsuz Yönleri */}
          {/* ============================================================== */}
          {currentPage === 5 && (
            <div className="h-full flex flex-col justify-between relative font-sans">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#2D1B15]">
                  Bilişim Teknolojilerinin Olumsuz Yönleri
                </h2>
              </div>

              {/* 5 Warning Cards */}
              <div className="my-auto space-y-3">
                {/* Row 1: 3 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#EFE5D9] border-l-4 border-l-[#E06D37] flex items-center gap-2.5 shadow-xs">
                    <Ban className="w-5 h-5 text-rose-600 shrink-0" />
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">Siber Zorbalık</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#EFE5D9] border-l-4 border-l-[#E06D37] flex items-center gap-2.5 shadow-xs">
                    <Ban className="w-5 h-5 text-rose-600 shrink-0" />
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">Sanal Dolandırıcılık</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#EFE5D9] border-l-4 border-l-[#E06D37] flex items-center gap-2.5 shadow-xs">
                    <Ban className="w-5 h-5 text-rose-600 shrink-0" />
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">Teknoloji ve Oyun Bağımlılığı</span>
                  </div>
                </div>

                {/* Row 2: 2 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#EFE5D9] border-l-4 border-l-[#E06D37] flex items-center gap-2.5 shadow-xs">
                    <Ban className="w-5 h-5 text-rose-600 shrink-0" />
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">Veri Hırsızlığı</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/90 border border-[#EFE5D9] border-l-4 border-l-[#E06D37] flex items-center gap-2.5 shadow-xs">
                    <Ban className="w-5 h-5 text-rose-600 shrink-0" />
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">Bilgi Kirliliği</span>
                  </div>
                </div>
              </div>

              {/* Discussion callout */}
              <div className="p-3.5 rounded-2xl bg-[#EBE7E0]/60 border border-[#DDD5C9] flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#7A6B63] shrink-0" />
                <p className="text-xs sm:text-sm text-[#4A3B35]">
                  Sizce ne gibi <strong className="text-[#2D1B15]">olumsuz</strong> etkileri vardır?
                </p>
              </div>

              <GammaBadge />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 6: Teknoloji ve Oyun Bağımlılığı */}
          {/* ============================================================== */}
          {currentPage === 6 && (
            <div className="h-full flex flex-col justify-between relative font-sans">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#2D1B15]">
                  Teknoloji ve Oyun Bağımlılığı
                </h2>
              </div>

              <div className="flex-1 flex items-center gap-6 my-2">
                {/* Left 3D sad boy & mother illustration */}
                <div className="w-4/12 h-full flex items-center justify-center">
                  <img 
                    src="/assets/slides/g5w2_screen_addict.jpg" 
                    alt="Teknoloji Bağımlılığı"
                    className="max-h-[85%] object-contain rounded-2xl drop-shadow-md"
                  />
                </div>

                {/* Right 6 effect cards (3 cols, 2 rows) */}
                <div className="w-8/12 grid grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] text-center shadow-xs flex items-center justify-center min-h-[64px]">
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">Şiddete eğilim</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] text-center shadow-xs flex items-center justify-center min-h-[64px]">
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">Derslerde başarısızlık</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] text-center shadow-xs flex items-center justify-center min-h-[64px]">
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">Özgüven problemleri</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] text-center shadow-xs flex items-center justify-center min-h-[64px]">
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">Dikkat kaybı ve unutkanlık</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] text-center shadow-xs flex items-center justify-center min-h-[64px]">
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">İçine kapanıklık</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] text-center shadow-xs flex items-center justify-center min-h-[64px]">
                    <span className="font-semibold text-xs sm:text-sm text-[#2D1B15]">Aile ile iletişim sorunları</span>
                  </div>
                </div>
              </div>

              {/* Yellow warning banner */}
              <div className="p-3 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center gap-2.5 text-amber-900 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Teknoloji bağımlılığı</strong> artık resmi olarak bir <strong>hastalık</strong> sayılmaktadır!
                </span>
              </div>

              <GammaBadge />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 7: Teknolojinin Bedenimize ve Ruh Sağlığımıza Etkileri */}
          {/* ============================================================== */}
          {currentPage === 7 && (
            <div className="h-full flex flex-col justify-between relative font-sans">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#2D1B15]">
                  Teknolojinin Bedenimize ve Ruh Sağlığımıza Etkileri
                </h2>
              </div>

              {/* 5 items with line icons */}
              <div className="my-auto space-y-6">
                {/* Row 1: 3 items */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Item 1 */}
                  <div className="flex items-start gap-3">
                    <div className="text-[#E06D37] mt-0.5">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D1B15]">Boyun Ağrısı</h4>
                      <p className="text-xs text-[#7A6B63] mt-0.5">Kas ağrıları ve tutulma</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3">
                    <div className="text-[#E06D37] mt-0.5">
                      <Eye className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D1B15]">Görme Bozukluğu</h4>
                      <p className="text-xs text-[#7A6B63] mt-0.5">Göz yorgunluğu ve bozukluk</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3">
                    <div className="text-[#E06D37] mt-0.5">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D1B15]">Duruş Bozukluğu</h4>
                      <p className="text-xs text-[#7A6B63] mt-0.5">Omurga ve duruş sorunları</p>
                    </div>
                  </div>
                </div>

                {/* Row 2: 2 items */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Item 4 */}
                  <div className="flex items-start gap-3">
                    <div className="text-[#E06D37] mt-0.5">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D1B15]">Kilo Problemleri</h4>
                      <p className="text-xs text-[#7A6B63] mt-0.5">Hareketsizlikten kaynaklanır</p>
                    </div>
                  </div>

                  {/* Item 5 */}
                  <div className="flex items-start gap-3">
                    <div className="text-[#E06D37] mt-0.5">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D1B15]">Psikolojik Sorunlar</h4>
                      <p className="text-xs text-[#7A6B63] mt-0.5">Kaygı ve stres artar</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-[#7A6B63] italic">
                  * Uzun süreli hareketsiz kalmak ve yanlış duruş alışkanlıkları sağlığı doğrudan olumsuz etkiler.
                </p>
              </div>

              <GammaBadge />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 8: Teknoloji ve Zaman Yönetimi */}
          {/* ============================================================== */}
          {currentPage === 8 && (
            <div className="h-full flex flex-col justify-between relative font-sans">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#2D1B15]">
                  Teknoloji ve Zaman Yönetimi
                </h2>
              </div>

              {/* Upper Part: Image + Daily Advice */}
              <div className="flex items-center gap-6 my-1">
                {/* Left 3D Image */}
                <div className="w-4/12 h-36 sm:h-44 flex items-center justify-center">
                  <img 
                    src="/assets/slides/g5w2_time.jpg" 
                    alt="Zaman Yönetimi"
                    className="max-h-full object-contain rounded-2xl drop-shadow-md"
                  />
                </div>

                {/* Right Daily Advice Card */}
                <div className="w-8/12 p-3.5 rounded-2xl bg-white/90 border border-[#EFE5D9] space-y-2 shadow-xs">
                  <h4 className="font-bold text-sm text-[#2D1B15] flex items-center gap-2">
                    <span>📋</span> Günlük Öneriler
                  </h4>
                  <ul className="text-xs sm:text-sm text-[#5C4A42] space-y-1 pl-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E06D37]" />
                      <span>Ekran süresini <strong>2-3 saatle</strong> sınırlayın</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E06D37]" />
                      <span>Uykudan <strong>1 saat önce</strong> ekranı bırakın</span>
                    </li>
                  </ul>
                  <p className="text-xs font-semibold text-[#B45309] pt-1 flex items-center gap-1.5">
                    <span>⏱️</span> DSÖ (Dünya Sağlık Örgütü) Önerisi
                  </p>
                </div>
              </div>

              {/* Lower Part: 3 Age Group Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                  <h4 className="font-serif font-bold text-sm text-[#2D1B15]">0-3 yaş</h4>
                  <p className="text-xs text-[#7A6B63] mt-1">Hiç kullanmamalı</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                  <h4 className="font-serif font-bold text-sm text-[#2D1B15]">4-12 yaş</h4>
                  <p className="text-xs text-[#7A6B63] mt-1">60 dk'yı geçmemeli</p>
                </div>

                <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                  <h4 className="font-serif font-bold text-sm text-[#2D1B15]">13+ yaş</h4>
                  <p className="text-xs text-[#7A6B63] mt-1">120 dk'yı geçmemeli</p>
                </div>
              </div>

              <GammaBadge />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 9: Ergonomi: Doğru Oturuş */}
          {/* ============================================================== */}
          {currentPage === 9 && (
            <div className="h-full flex flex-col justify-between relative font-sans">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#2D1B15]">
                  Ergonomi: Doğru Oturuş
                </h2>
                <p className="text-xs sm:text-sm text-[#7A6B63] mt-1">
                  Ergonomi, bilgisayar kullanırken <strong className="text-[#2D1B15]">sağlığımıza zarar vermeden</strong> rahat çalışmamızı sağlayan duruştur.
                </p>
              </div>

              <div className="flex-1 flex items-center gap-6 my-2">
                {/* Left 3D Ergonomics Skeleton/Desk image */}
                <div className="w-5/12 h-full flex items-center justify-center">
                  <img 
                    src="/assets/slides/g5w2_ergonomics.jpg" 
                    alt="Ergonomik Doğru Oturuş"
                    className="max-h-[85%] object-contain rounded-2xl drop-shadow-md"
                  />
                </div>

                {/* Right 4 Steps */}
                <div className="w-7/12 space-y-2.5">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <span className="w-7 h-7 rounded-lg border border-[#E06D37] text-[#E06D37] flex items-center justify-center font-serif font-bold text-sm shrink-0">
                      1
                    </span>
                    <span className="text-xs sm:text-sm text-[#2D1B15] font-medium">
                      Dik otur, ekran göz hizasında
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <span className="w-7 h-7 rounded-lg border border-[#E06D37] text-[#E06D37] flex items-center justify-center font-serif font-bold text-sm shrink-0">
                      2
                    </span>
                    <span className="text-xs sm:text-sm text-[#2D1B15] font-medium">
                      50-70 cm uzaklık, bilekler destekli
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <span className="w-7 h-7 rounded-lg border border-[#E06D37] text-[#E06D37] flex items-center justify-center font-serif font-bold text-sm shrink-0">
                      3
                    </span>
                    <span className="text-xs sm:text-sm text-[#2D1B15] font-medium">
                      Ayaklar yere bassın, ışık dik gelmesin
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <span className="w-7 h-7 rounded-lg border border-[#E06D37] text-[#E06D37] flex items-center justify-center font-serif font-bold text-sm shrink-0">
                      4
                    </span>
                    <span className="text-xs sm:text-sm text-[#2D1B15] font-medium">
                      Her 25 dakikada mola ver!
                    </span>
                  </div>
                </div>
              </div>

              {/* Discussion callout */}
              <div className="p-3 rounded-2xl bg-[#EBE7E0]/60 border border-[#DDD5C9] flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-[#7A6B63] shrink-0" />
                <p className="text-xs sm:text-sm text-[#4A3B35]">
                  Sizce bilgisayar kullanırken nasıl oturmalıyız?
                </p>
              </div>

              <GammaBadge />
            </div>
          )}

          {/* ============================================================== */}
          {/* SLIDE 10: Unutma! 🌟 */}
          {/* ============================================================== */}
          {currentPage === 10 && (
            <div className="h-full flex flex-col justify-between relative font-sans">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#2D1B15] flex items-center gap-2">
                  <span>Unutma!</span>
                  <span className="text-amber-400">🌟</span>
                </h2>
              </div>

              <div className="flex-1 flex items-center gap-6 my-2">
                {/* Left 3D Family park image */}
                <div className="w-5/12 h-full flex items-center justify-center">
                  <img 
                    src="/assets/slides/g5w2_family.jpg" 
                    alt="Aile ve Arkadaşlar"
                    className="max-h-[85%] object-contain rounded-2xl drop-shadow-md"
                  />
                </div>

                {/* Right 3 core values */}
                <div className="w-7/12 space-y-3">
                  <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-[#2D1B15]">Zaman</span>
                    </div>
                    <p className="text-xs text-[#7A6B63] mt-1 pl-6">
                      Geri döndürülemez en değerli şeyimizdir
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      <span className="text-[#2D1B15]">Sağlık</span>
                    </div>
                    <p className="text-xs text-[#7A6B63] mt-1 pl-6">
                      Beden ve ruh sağlığımız her şeyden önemli
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/90 border border-[#EFE5D9] shadow-xs">
                    <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm">
                      <Users className="w-4 h-4 text-indigo-600" />
                      <span className="text-[#2D1B15]">Aile & Arkadaşlar</span>
                    </div>
                    <p className="text-xs text-[#7A6B63] mt-1 pl-6">
                      Sanal ortamdan çok daha değerlidir
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom message */}
              <div className="p-3.5 rounded-2xl bg-[#FDF0E7] border border-[#F6D8C4] flex items-center gap-3 text-xs sm:text-sm text-[#7C2D12]">
                <CheckCircle2 className="w-4 h-4 text-[#C2410C] shrink-0" />
                <p>
                  Teknolojiyi kullanırken kültürel ve manevi değerlerimizi <strong>kaybetmemeliyiz!</strong>
                </p>
              </div>

              <GammaBadge />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Thumbnail Strip & Slide Counter */}
      <div className="px-4 py-3 bg-slate-950/80 backdrop-blur-md border-t border-slate-800 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {SLIDES_META_G5_W2.map((slide) => {
            const isActive = slide.page === currentPage;
            return (
              <button
                key={slide.page}
                onClick={() => setCurrentPage(slide.page)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
                title={slide.title}
              >
                <span>{slide.page}</span>
                <span className="hidden xl:inline text-[10px] opacity-80 max-w-[120px] truncate">
                  {slide.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-400 font-medium whitespace-nowrap pl-2">
          {currentPage} / {totalPages}
        </div>
      </div>
    </div>
  );
};
