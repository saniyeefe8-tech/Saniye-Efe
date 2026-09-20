import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Download,
  FileText
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export interface SlideMeta {
  page: number;
  title: string;
}

export const SLIDES_META_G6: SlideMeta[] = [
  { page: 1, title: 'Bilişim Teknolojilerinin Geleceği' },
  { page: 2, title: 'Ada Lovelace (1815–1852)' },
  { page: 3, title: 'Alan Turing (1912–1954)' },
  { page: 4, title: 'Haberleşme Teknolojilerinin Gelişimi' },
  { page: 5, title: 'Bilişim Teknolojilerindeki Değişim' },
  { page: 6, title: 'Yenilikçi Teknolojiler' },
  { page: 7, title: 'Gelecekte Bizi Neler Bekliyor?' },
  { page: 8, title: 'Robotlar İnsanların Yerini Alabilir mi?' },
  { page: 9, title: 'Teknolojiyi Bilinçli Kullanalım' },
  { page: 10, title: 'Daha Güzel Bir Gelecek İçin' },
];

interface PdfSlideViewerG6W2Props {
  onAskAi?: (question: string) => void;
}

export const PdfSlideViewerG6W2: React.FC<PdfSlideViewerG6W2Props> = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const totalPages = SLIDES_META_G6.length;

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

  const handleDownloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const slides = [
      {
        title: 'Bilişim Teknolojilerinin Geleceği',
        body: 'Geçmişten bugüne, bugünden geleceğe...\nBİLİŞİM TEKNOLOJİLERİ\n6. Sınıf 1. Dönem 2. Hafta',
      },
      {
        title: 'Ada Lovelace (1815–1852)',
        body: '• İlk Program: Bilgisayar icat edilmeden önce ilk programı yazdı\n• Analitik Makine: Makinelerin hesap yapabileceğini öne sürdü\n• Vizyon: Müzik ve grafik üretimi gibi alanlarda kullanılabileceğini öngördü\n\n"Makineler yalnızca sayı değil, daha fazlasını da işleyebilir." — Ada Lovelace',
      },
      {
        title: 'Alan Turing (1912–1954)',
        body: '• Turing Makinesi: Bilgisayarların çalışma mantığının temellerini attı\n• Turing Testi: Makinelerin düşünüp düşünemeyeceğini sorguladı\n• Yapay Zeka: Çalışmaları yapay zeka araştırmalarının başlangıcı oldu\n\n"Bir makinenin insan gibi düşünüp düşünemeyeceğini sorgulamak gerekir." — Alan Turing',
      },
      {
        title: 'Haberleşme Teknolojilerinin Gelişimi',
        body: '1 Geçmiş: Duman, davul, posta güvercini\n2 Yakın Geçmiş: Mektup, telgraf, kablolu telefon\n3 Bugün: Akıllı telefon, e-posta, sosyal medya\n4 Gelecek: ?',
      },
      {
        title: 'Bilişim Teknolojilerindeki Değişim',
        body: 'Değişimin Nedenleri:\n• İnsan ihtiyaçları\n• Daha iyisini yapma isteği\n• Bilimsel gelişmeler\n\nOlumlu Etkiler:\nDaha hızlı internet, güçlü bilgisayarlar, zaman tasarrufu\n\nOlumsuz Etkiler:\nBağımlılık, azalan yüz yüze iletişim, güvenlik sorunları',
      },
      {
        title: 'Yenilikçi Teknolojiler',
        body: '• Yapay Zeka: Sesli asistanlar, öneri sistemleri, akıllı uygulamalar\n• AR / VR: Sanal müzeler, 3D eğitim deneyimleri, uzay yolculuğu simülasyonları\n• Akıllı Cihazlar: Akıllı ev sistemleri, giyilebilir teknolojiler, sağlık cihazları',
      },
      {
        title: 'Gelecekte Bizi Neler Bekliyor?',
        body: '• Akıllı Robotlar: Daha akıllı, daha küçük, daha hızlı cihazlar\n• Akıllı Şehirler: Akıllı evler ve şehir altyapıları yaygınlaşır\n• VR/AR Eğitim: Sanal ve artırılmış gerçeklik eğitimde yaygınlaşır\n• Kablosuz Teknolojiler: 6G ve ötesi, her yerde bağlantı',
      },
      {
        title: 'Robotlar İnsanların Yerini Alabilir mi?',
        body: 'Sonuç: Robotlar insanların yerini almak yerine iş birliği içinde çalışabilir.\n\n• Sağlık: Doktor + yapay zeka = daha doğru teşhis\n• Eğitim: Öğretmen + teknoloji = daha etkili öğretim\n• Üretim: İşçi + robot = daha hızlı üretim',
      },
      {
        title: 'Teknolojiyi Bilinçli Kullanalım',
        body: '• Dengeli Kullanım: Teknoloji bilinçli ve dengeli kullanılmalı\n• Güvenlik: Kişisel bilgiler dikkatli paylaşılmalı\n• Sosyal Etkinlik: Yüz yüze iletişim artırılmalı\n• Çevre: Teknoloji çevreye zarar vermeyecek şekilde kullanılmalı\n\nAsıl farkı yaratan akıllı kullanıcıdır. Teknolojiyi doğru kullanan bireyler topluma katkı sağlar.',
      },
      {
        title: 'Daha Güzel Bir Gelecek İçin',
        body: 'Teknolojiyi bilinçli kullanan, merak eden ve öğrenmeye devam eden sizlerle daha güzel bir gelecek mümkün.\n\n• Öğren\n• Keşfet\n• Uygula\n• Geliş\n\nGelecek hafta: Tablolama Programlarına Giriş\nBİLGİ | FARKINDALIK | SORUMLULUK | DAHA İYİ BİR GELECEK',
      },
    ];

    slides.forEach((s, idx) => {
      if (idx > 0) doc.addPage('a4', 'landscape');
      doc.setFillColor(248, 249, 252);
      doc.rect(0, 0, 297, 210, 'F');

      doc.setTextColor(27, 36, 48);
      doc.setFontSize(22);
      doc.text(s.title, 25, 38, { maxWidth: 247 });

      doc.setFontSize(13);
      doc.setTextColor(71, 85, 105);
      doc.text(s.body, 25, 58, { maxWidth: 247, lineHeightFactor: 1.5 });

      doc.setFontSize(10);
      doc.setTextColor(148, 163, 184);
      doc.text('6. Sınıf Bilişim Teknolojileri', 25, 195);
      doc.text('Made with Gamma', 240, 195);
      doc.text(`Sayfa ${idx + 1} / ${slides.length}`, 140, 195);
    });

    doc.save('Bilisim_Teknolojilerinin_Gelecegi_6Sinif.pdf');
  };

  const GammaBadge = () => (
    <div className="absolute bottom-4 right-5 sm:bottom-6 sm:right-7 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B0F19] text-white text-[11px] font-medium tracking-wide shadow-md">
      <span className="text-slate-400 font-normal">Made with</span>
      <span className="font-bold tracking-tight bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
        Gamma
      </span>
    </div>
  );

  const renderSlide = () => {
    switch (currentPage) {
      // PAGE 1: COVER
      case 1:
        return (
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-14 relative bg-[#F8F9FC]">
            {/* Left Titles */}
            <div className="w-full md:w-6/12 text-left space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-[#1E293B] tracking-tight leading-tight">
                Bilişim Teknolojilerinin <br />
                Geleceği
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal">
                Geçmişten bugüne, bugünden geleceğe...
              </p>
              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-[#E2E8F0] text-[#334155] text-xs font-bold tracking-wider">
                  BİLİŞİM TEKNOLOJİLERİ
                </span>
              </div>
            </div>

            {/* Right Futuristic Smart City Illustration */}
            <div className="w-full md:w-6/12 flex flex-col items-center justify-center relative">
              <img 
                src="/assets/slides_g6/future_city.jpg" 
                alt="Bilişim Teknolojilerinin Geleceği" 
                className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-2xl shadow-lg border border-slate-200"
              />
              <div className="mt-3 flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500 font-mono">
                <span>#1218</span>
                <span>•</span>
                <span>Past</span>
                <span>•</span>
                <span>Present</span>
                <span>•</span>
                <span className="text-indigo-600 font-bold">Future</span>
              </div>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 2: ADA LOVELACE
      case 2:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#F8F9FC]">
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#1E293B] tracking-tight">
              Ada Lovelace (1815–1852)
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left 3 Cards + Quote */}
              <div className="w-full md:w-7/12 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1">İlk Program</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Bilgisayar icat edilmeden önce ilk programı yazdı
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1">Analitik Makine</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Makinelerin hesap yapabileceğini öne sürdü
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1">Vizyon</h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Müzik ve grafik üretimi gibi alanlarda kullanılabileceğini öngördü
                  </p>
                </div>

                <div className="pl-4 border-l-3 border-indigo-500 italic text-xs sm:text-sm text-slate-700 py-1">
                  "Makineler yalnızca sayı değil, daha fazlasını da işleyebilir." — Ada Lovelace
                </div>
              </div>

              {/* Right Illustration */}
              <div className="w-full md:w-5/12 flex justify-center">
                <img 
                  src="/assets/slides_g6/ada_lovelace.jpg" 
                  alt="Ada Lovelace" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-md border border-slate-200"
                />
              </div>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 3: ALAN TURING
      case 3:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#F8F9FC]">
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#1E293B] tracking-tight">
              Alan Turing (1912–1954)
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left Alan Turing Portrait */}
              <div className="w-full md:w-5/12 flex justify-center">
                <img 
                  src="/assets/slides_g6/alan_turing.jpg" 
                  alt="Alan Turing" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-md border border-slate-200"
                />
              </div>

              {/* Right 3 Cards + Quote */}
              <div className="w-full md:w-7/12 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1">Turing Makinesi</h3>
                    <p className="text-xs text-slate-600">
                      Bilgisayarların çalışma mantığının temellerini attı
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1">Turing Testi</h3>
                    <p className="text-xs text-slate-600">
                      Makinelerin düşünüp düşünemeyeceğini sorguladı
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1">Yapay Zeka</h3>
                    <p className="text-xs text-slate-600">
                      Çalışmaları yapay zeka araştırmalarının başlangıcı oldu
                    </p>
                  </div>
                </div>

                <div className="pl-4 border-l-3 border-indigo-500 italic text-xs sm:text-sm text-slate-700 py-1">
                  "Bir makinenin insan gibi düşünüp düşünemeyeceğini sorgulamak gerekir." — Alan Turing
                </div>
              </div>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 4: HABERLEŞME TEKNOLOJİLERİNİN GELİŞİMİ
      case 4:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#F8F9FC]">
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#1E293B] tracking-tight leading-snug">
              Haberleşme Teknolojilerinin <br />
              Gelişimi
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left Steps */}
              <div className="w-full md:w-6/12 space-y-3">
                <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3.5 shadow-2xs">
                  <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">Geçmiş</h3>
                    <p className="text-xs sm:text-sm text-slate-600">Duman, davul, posta güvercini</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3.5 shadow-2xs">
                  <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">Yakın Geçmiş</h3>
                    <p className="text-xs sm:text-sm text-slate-600">Mektup, telgraf, kablolu telefon</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3.5 shadow-2xs">
                  <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">Bugün</h3>
                    <p className="text-xs sm:text-sm text-slate-600">Akıllı telefon, e-posta, sosyal medya</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3.5 shadow-2xs">
                  <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0">
                    4
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">Gelecek</h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-bold text-indigo-600">?</p>
                  </div>
                </div>
              </div>

              {/* Right Visual Collage */}
              <div className="w-full md:w-6/12 flex justify-center">
                <div className="grid grid-cols-2 gap-3 max-w-xs">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
                    <span className="text-3xl block mb-1">💨</span>
                    <span className="text-xs font-semibold text-slate-700">Duman</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
                    <span className="text-3xl block mb-1">🕊️</span>
                    <span className="text-xs font-semibold text-slate-700">Posta Güvercini</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
                    <span className="text-3xl block mb-1">☎️</span>
                    <span className="text-xs font-semibold text-slate-700">Telefon / Telgraf</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
                    <span className="text-3xl block mb-1">📱</span>
                    <span className="text-xs font-semibold text-slate-700">Akıllı Telefon</span>
                  </div>
                </div>
              </div>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 5: BİLİŞİM TEKNOLOJİLERİNDEKİ DEĞİŞİM
      case 5:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#F8F9FC]">
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#1E293B] tracking-tight">
              Bilişim Teknolojilerindeki Değişim
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left Evolution Diagram */}
              <div className="w-full md:w-5/12 space-y-2">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-2">
                  <span className="font-bold text-indigo-600">1)</span>
                  <span>Büyük ve Yavaş - room-sized mainframes</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-2">
                  <span className="font-bold text-indigo-600">2)</span>
                  <span>Masaüstü Bilgisayarlar</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-2">
                  <span className="font-bold text-indigo-600">3)</span>
                  <span>Dizüstü Bilgisayarlar</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-2">
                  <span className="font-bold text-indigo-600">4)</span>
                  <span>Akıllı Telefonlar ve Tabletler</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-2">
                  <span className="font-bold text-indigo-600">5)</span>
                  <span>Yapay Zeka, AR, VR</span>
                </div>
              </div>

              {/* Right Causes & Effects */}
              <div className="w-full md:w-7/12 space-y-3.5">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base mb-1">
                    Değişimin Nedenleri
                  </h3>
                  <ul className="text-xs sm:text-sm text-slate-600 space-y-1 list-disc list-inside">
                    <li>İnsan ihtiyaçları</li>
                    <li>Daha iyisini yapma isteği</li>
                    <li>Bilimsel gelişmeler</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-emerald-700 text-sm sm:text-base mb-0.5">
                    Olumlu Etkiler
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Daha hızlı internet, güçlü bilgisayarlar, zaman tasarrufu
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-rose-700 text-sm sm:text-base mb-0.5">
                    Olumsuz Etkiler
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Bağımlılık, azalan yüz yüze iletişim, güvenlik sorunları
                  </p>
                </div>
              </div>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 6: YENİLİKÇİ TEKNOLOJİLER
      case 6:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#F8F9FC]">
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#1E293B] tracking-tight">
              Yenilikçi Teknolojiler
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-auto">
              {/* Yapay Zeka */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl">
                  🤖
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">Yapay Zeka</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sesli asistanlar, öneri sistemleri, akıllı uygulamalar
                </p>
              </div>

              {/* AR / VR */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">
                  🥽
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">AR / VR</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sanal müzeler, 3D eğitim deneyimleri, uzay yolculuğu simülasyonları
                </p>
              </div>

              {/* Akıllı Cihazlar */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl">
                  🏠
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">Akıllı Cihazlar</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Akıllı ev sistemleri, giyilebilir teknolojiler, sağlık cihazları
                </p>
              </div>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 7: GELECEKTE BİZİ NELER BEKLİYOR?
      case 7:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#F8F9FC]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left Two Students Looking at Future City */}
              <div className="w-full md:w-5/12 flex justify-center">
                <img 
                  src="/assets/slides_g6/two_students.jpg" 
                  alt="Geleceğe Bakan Öğrenciler" 
                  className="w-52 h-52 sm:w-72 sm:h-72 object-cover rounded-2xl shadow-md border border-slate-200"
                />
              </div>

              {/* Right List */}
              <div className="w-full md:w-7/12 space-y-4">
                <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#1E293B] tracking-tight">
                  Gelecekte Bizi Neler Bekliyor?
                </h2>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">Akıllı Robotlar</h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Daha akıllı, daha küçük, daha hızlı cihazlar
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏙️</span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">Akıllı Şehirler</h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Akıllı evler ve şehir altyapıları yaygınlaşır
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">👓</span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">VR/AR Eğitim</h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Sanal ve artırılmış gerçeklik eğitimde yaygınlaşır
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📶</span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm sm:text-base">Kablosuz Teknolojiler</h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        6G ve ötesi, her yerde bağlantı
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 8: ROBOTLAR İNSANLARIN YERİNİ ALABİLİR Mİ?
      case 8:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#F8F9FC]">
            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#1E293B] tracking-tight">
              Robotlar İnsanların Yerini Alabilir mi?
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left Comparison */}
              <div className="w-full md:w-6/12 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                  <h3 className="font-bold text-slate-800 text-sm border-b pb-1">Robotlar</h3>
                  <p className="text-slate-600">• fabrika üretimi</p>
                  <p className="text-slate-600">• depolama</p>
                  <p className="text-slate-600">• lojistik</p>
                  <p className="text-slate-600">• temizlik</p>
                  <p className="text-slate-600">• sürekli aynı performans</p>
                  <p className="text-slate-600">• hata oranı düşük</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
                  <h3 className="font-bold text-slate-800 text-sm border-b pb-1">İnsanlar</h3>
                  <p className="text-slate-600">• sanat ve yaratıcılık</p>
                  <p className="text-slate-600">• duygu ve empati</p>
                  <p className="text-slate-600">• etik düşünme</p>
                  <p className="text-slate-600">• stratejik karar verme</p>
                </div>
              </div>

              {/* Right Result & Cards */}
              <div className="w-full md:w-6/12 space-y-3">
                <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100">
                  <h3 className="font-bold text-indigo-900 text-sm">Sonuç</h3>
                  <p className="text-xs sm:text-sm text-indigo-700">
                    Robotlar insanların yerini almak yerine <strong>iş birliği içinde</strong> çalışabilir.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm flex items-center gap-2">
                    <span>🏥</span>
                    <span className="font-bold text-slate-800">Sağlık:</span>
                    <span className="text-slate-600">Doktor + yapay zeka = daha doğru teşhis</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm flex items-center gap-2">
                    <span>🎓</span>
                    <span className="font-bold text-slate-800">Eğitim:</span>
                    <span className="text-slate-600">Öğretmen + teknoloji = daha etkili öğretim</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm flex items-center gap-2">
                    <span>🏭</span>
                    <span className="font-bold text-slate-800">Üretim:</span>
                    <span className="text-slate-600">İşçi + robot = daha hızlı üretim</span>
                  </div>
                </div>
              </div>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 9: TEKNOLOJİYİ BİLİNÇLİ KULLANALIM
      case 9:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#F8F9FC]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left Student with Cyber Shield */}
              <div className="w-full md:w-4/12 flex justify-center">
                <img 
                  src="/assets/slides_g6/cyber_boy.jpg" 
                  alt="Teknolojiyi Bilinçli Kullanalım" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-md border border-slate-200"
                />
              </div>

              {/* Right Cards */}
              <div className="w-full md:w-8/12 space-y-3">
                <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#1E293B] tracking-tight">
                  Teknolojiyi Bilinçli Kullanalım
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5 mb-0.5">
                      <span>⚖️</span>
                      <span>Dengeli Kullanım</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600">
                      Teknoloji bilinçli ve dengeli kullanılmalı
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5 mb-0.5">
                      <span>🔒</span>
                      <span>Güvenlik</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600">
                      Kişisel bilgiler dikkatli paylaşılmalı
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5 mb-0.5">
                      <span>👥</span>
                      <span>Sosyal Etkinlik</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600">
                      Yüz yüze iletişim artırılmalı
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5 mb-0.5">
                      <span>🌱</span>
                      <span>Çevre</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600">
                      Teknoloji çevreye zarar vermeyecek şekilde kullanılmalı
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs text-slate-700">
                  💭 <strong>Asıl farkı yaratan akıllı kullanıcıdır.</strong> Teknolojiyi doğru kullanan bireyler topluma katkı sağlar.
                </div>
              </div>
            </div>

            <GammaBadge />
          </div>
        );

      // PAGE 10: DAHA GÜZEL BİR GELECEK İÇİN
      case 10:
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 sm:p-12 relative bg-[#F8F9FC]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
              {/* Left Student & Robot Handshake */}
              <div className="w-full md:w-5/12 flex justify-center">
                <img 
                  src="/assets/slides_g6/kid_robot.jpg" 
                  alt="Öğrenci ve Robot Dostluğu" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-md border border-slate-200"
                />
              </div>

              {/* Right Content */}
              <div className="w-full md:w-7/12 space-y-3.5">
                <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#1E293B] tracking-tight leading-snug">
                  Daha Güzel Bir <br />
                  Gelecek İçin
                </h2>

                <p className="text-xs sm:text-sm text-slate-600">
                  Teknolojiyi bilinçli kullanan, merak eden ve öğrenmeye devam eden sizlerle daha güzel bir gelecek mümkün.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center font-bold text-xs text-slate-800 shadow-2xs">
                    Öğren
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center font-bold text-xs text-slate-800 shadow-2xs">
                    Keşfet
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center font-bold text-xs text-slate-800 shadow-2xs">
                    Uygula
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center font-bold text-xs text-slate-800 shadow-2xs">
                    Geliş
                  </div>
                </div>

                <p className="text-xs font-semibold text-indigo-600">
                  Gelecek hafta: Tablolama Programlarına Giriş
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-bold text-slate-600 uppercase">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">BİLGİ</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">FARKINDALIK</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">SORUMLULUK</span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                    DAHA İYİ BİR GELECEK
                  </span>
                </div>
              </div>
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
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F8F9FC] border border-slate-200 px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-2xs">
        {/* Left info */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1E293B] text-white flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">Bilişim Teknolojilerinin Geleceği</span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                6. Sınıf PDF Slaytı
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Sayfa {currentPage} / {totalPages} • 6. Sınıf 1. Dönem 2. Hafta
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Pagination */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
              className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Sonraki Slayt (Sağ Ok)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
            title={isFullscreen ? 'Tam Ekrandan Çık (Esc)' : 'Tam Ekranda Sun'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Download PDF button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E293B] hover:bg-[#334155] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            title="PDF Slaytı İndir"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF İndir</span>
          </button>
        </div>
      </div>

      {/* Main Slide Display Viewport */}
      <div 
        className={`w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-[#F8F9FC] transition-all relative ${
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
        {SLIDES_META_G6.map((slide) => {
          const isSelected = slide.page === currentPage;
          return (
            <button
              key={slide.page}
              type="button"
              onClick={() => setCurrentPage(slide.page)}
              className={`px-3 py-2 rounded-xl text-xs shrink-0 transition-all cursor-pointer text-left border ${
                isSelected 
                  ? 'bg-[#1E293B] text-white border-[#1E293B] shadow-xs font-bold' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 font-medium'
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
    </div>
  );
};
