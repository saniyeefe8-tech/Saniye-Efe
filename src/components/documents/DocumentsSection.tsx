import React, { useState } from 'react';
import { 
  FolderArchive, 
  FileText, 
  Download, 
  Printer, 
  Eye, 
  Users, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  Edit3, 
  ExternalLink,
  BookOpen,
  Award,
  ShieldCheck
} from 'lucide-react';
import { SCHOOL_DOCUMENTS, SchoolDocument } from '../../data/documentsData';
import { SeatingPlanModal } from './SeatingPlanModal';
import { ClassRulesModal } from './ClassRulesModal';

interface DocumentsSectionProps {
  onAskAi: (prompt: string) => void;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({ onAskAi }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isSeatingModalOpen, setIsSeatingModalOpen] = useState(false);
  const [isClassRulesModalOpen, setIsClassRulesModalOpen] = useState(false);
  const [previewStandardDoc, setPreviewStandardDoc] = useState<SchoolDocument | null>(null);

  const categories = ['Tümü', 'Sınıf Yönetimi', 'Ders Planları', 'Ölçme Değerlendirme'];

  const filteredDocs = SCHOOL_DOCUMENTS.filter((doc) => {
    const matchesCat = activeCategory === 'Tümü' || doc.category === activeCategory;
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenDoc = (doc: SchoolDocument) => {
    if (doc.previewType === 'seating-plan') {
      setIsSeatingModalOpen(true);
    } else if (doc.previewType === 'class-rules') {
      setIsClassRulesModalOpen(true);
    } else {
      setPreviewStandardDoc(doc);
    }
  };

  return (
    <div className="space-y-8 mb-12">
      {/* Banner / Teacher Notice */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-blue-100 text-xs font-bold tracking-wide backdrop-blur-xs">
              <FolderArchive className="w-3.5 h-3.5 text-amber-300" />
              Öğretmen & Sınıf Evrakları Arşivi
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Sınıf Yönetimi Şablonları & Resmi Bilişim Evrakları
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
              Saniye ÖZTÜRK tarafından hazırlanan <strong>Sınıf Oturma Planı</strong>, <strong>7/C Sınıfı Sınıf Kuralları Afişi</strong>, MEB yıllık planları ve zümre tutanakları aşağıda kullanıma hazır olarak listelenmiştir.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsSeatingModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Oturma Planını Aç</span>
            </button>
            <button
              type="button"
              onClick={() => setIsClassRulesModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold transition-colors flex items-center gap-1.5 cursor-pointer backdrop-blur-xs border border-white/20"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Sınıf Kuralları Afişi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured 2 Documents Cards: Seating Plan & Class Rules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Öne Çıkan & Yeni Eklenen Sınıf Evrakları
          </h3>
          <span className="text-xs text-slate-500 font-medium">Bilişim & Sınıf Yönetimi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Sınıf Oturma Planı */}
          <div className="bg-white rounded-3xl border-2 border-blue-200/90 hover:border-blue-400 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
                  Sınıf Oturma Planı
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  30 Kişilik Renkli Şablon
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                Sınıf Oturma Planı Çizelgesi
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Tahta, öğretmen masası ve 3 renkli sütunda (mavi, yeşil, turuncu) 30 öğrenci kapasiteli, doğrudan isim yazılabilir veya boş olarak A4 boyutunda yazdırılabilir oturma düzeni krokisi.
              </p>

              {/* Graphic Visual Representation Preview */}
              <div 
                onClick={() => setIsSeatingModalOpen(true)}
                className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/80 cursor-pointer hover:bg-amber-50 transition-colors flex flex-col items-center justify-center relative overflow-hidden group/thumb"
              >
                <div className="w-full max-w-xs space-y-2">
                  <div className="bg-white border-2 border-slate-600 rounded-sm py-1 text-center font-extrabold text-[11px] text-slate-800 shadow-2xs">
                    TAHTA
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 rounded-lg bg-sky-100 border border-sky-300 flex items-center justify-center text-[10px] font-bold text-sky-800">
                      Mavi Sıralar (10)
                    </div>
                    <div className="h-10 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-[10px] font-bold text-emerald-800">
                      Yeşil Sıralar (10)
                    </div>
                    <div className="h-10 rounded-lg bg-orange-100 border border-orange-300 flex items-center justify-center text-[10px] font-bold text-orange-800">
                      Turuncu Sıralar (10)
                    </div>
                  </div>
                  <div className="text-center text-[10px] font-bold text-blue-900 bg-white/80 py-0.5 rounded-full border border-blue-200">
                    Birlikte Daha Güçlüyüz 😊
                  </div>
                </div>

                <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <span className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Önizle ve Düzenle</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setIsSeatingModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>İncele & Yazdır (PDF)</span>
              </button>

              <a
                href="/assets/sinif_oturma_plani.svg"
                target="_blank"
                rel="noreferrer"
                download="sinif_oturma_plani.svg"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-blue-600" />
                <span>SVG İndir</span>
              </a>
            </div>
          </div>

          {/* Card 2: 7/C Sınıfı Sınıf Kuralları Afişi */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/90 hover:border-amber-400 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  7/C Sınıf Kuralları
                </span>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  10 Altın Kural Afişi
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                7/C Sınıfı Sınıf Kuralları Afişi
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                <em>"Daha iyi bir sınıf, daha güzel bir gelecek!"</em> temalı; derse zamanında gelme, hazırlık, saygı, doğru teknoloji kullanımı ve akran nezaketini anlatan renkli sınıf afişi.
              </p>

              {/* Graphic Visual Representation Preview */}
              <div 
                onClick={() => setIsClassRulesModalOpen(true)}
                className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/80 cursor-pointer hover:bg-amber-50 transition-colors flex flex-col items-center justify-center relative overflow-hidden group/thumb"
              >
                <div className="w-full max-w-xs space-y-1.5">
                  <div className="bg-amber-400 border border-slate-900 rounded-lg py-1 text-center font-black text-xs text-slate-950 shadow-2xs">
                    7/C SINIFI SINIF KURALLARI
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[9px] font-bold">
                    <div className="bg-rose-50 border border-rose-200 p-1 rounded-md text-rose-900">
                      1. Zamanında Gel
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 p-1 rounded-md text-emerald-900">
                      2. Hazırlıklı Gel
                    </div>
                    <div className="bg-sky-50 border border-sky-200 p-1 rounded-md text-sky-900">
                      3. Saygılı Ol
                    </div>
                    <div className="bg-teal-50 border border-teal-200 p-1 rounded-md text-teal-900">
                      6. Teknolojiyi Doğru Kullan
                    </div>
                  </div>
                  <div className="text-center text-[10px] font-black text-slate-900 bg-amber-400 py-0.5 rounded-lg border border-slate-900">
                    Sınıfımızın kuralları, hepimizin sorumluluğu!
                  </div>
                </div>

                <div className="absolute inset-0 bg-amber-900/10 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <span className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Afişi Tam Ekran İncele</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setIsClassRulesModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Afişi Yazdır (PDF)</span>
              </button>

              <a
                href="/assets/sinif_kurallari_7c.svg"
                target="_blank"
                rel="noreferrer"
                download="7c_sinifi_sinif_kurallari.svg"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-600" />
                <span>SVG İndir</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Evrak veya şablon ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
          <span>TÜM EVRAKLAR VE ŞABLONLAR ({filteredDocs.length} Dosya)</span>
          <span>Resmi MEB & Sınıf Yönetim Formatları</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                    {doc.category}
                  </span>
                  <span className="text-[11px] font-medium text-blue-600">
                    {doc.format}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 leading-snug">
                  {doc.title}
                </h4>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {doc.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400 font-medium">
                  {doc.fileSize || 'Yazdırılabilir'}
                </span>

                <button
                  type="button"
                  onClick={() => handleOpenDoc(doc)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Görüntüle & Yazdır</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <SeatingPlanModal
        isOpen={isSeatingModalOpen}
        onClose={() => setIsSeatingModalOpen(false)}
      />

      <ClassRulesModal
        isOpen={isClassRulesModalOpen}
        onClose={() => setIsClassRulesModalOpen(false)}
      />

      {/* Standard Document Preview Modal */}
      {previewStandardDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div 
            className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <FileText className="w-7 h-7" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-2 inline-block">
              {previewStandardDoc.category}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {previewStandardDoc.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              {previewStandardDoc.description}
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 text-left text-xs text-slate-600 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Hazırlayan:</span>
                <span className="font-semibold text-slate-800">Saniye ÖZTÜRK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Format:</span>
                <span className="font-semibold text-slate-800">{previewStandardDoc.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dönem:</span>
                <span className="font-semibold text-slate-800">{previewStandardDoc.date}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onAskAi(`"${previewStandardDoc.title}" evrağının içeriği, şablonu ve MEB müfredatına göre doldurulması hakkında detaylı bilgi verir misin?`);
                  setPreviewStandardDoc(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Yapay Zekaya Danış</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewStandardDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
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
