import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  Presentation, 
  Sparkles, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  UploadCloud, 
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Maximize2
} from 'lucide-react';
import { WeeklyCurriculumItem } from '../types';
import { PdfSlideViewer } from './slides/PdfSlideViewer';
import { PdfSlideViewerG5W2 } from './slides/PdfSlideViewerG5W2';
import { PdfSlideViewerG6W2 } from './slides/PdfSlideViewerG6W2';

interface CurriculumPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: WeeklyCurriculumItem | null;
  onSelectPrev?: () => void;
  onSelectNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onAskAi: (prompt: string) => void;
}

export const CurriculumPresentationModal: React.FC<CurriculumPresentationModalProps> = ({
  isOpen,
  onClose,
  item,
  onSelectPrev,
  onSelectNext,
  hasPrev,
  hasNext,
  onAskAi,
}) => {
  const [customPdfUrl, setCustomPdfUrl] = useState<string>('');
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Sync active url whenever the current item changes
  useEffect(() => {
    if (item) {
      const initialUrl = item.embedUrl || item.presentationUrl || item.pdfUrl || null;
      setActivePdfUrl(initialUrl);
      setShowUploader(false);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const isGamma = Boolean(activePdfUrl?.includes('gamma.app') || item.presentationType === 'gamma');

  // Format embed url for iframe
  const getResolvedEmbedUrl = (url: string | null): string => {
    if (!url) return '';
    if (url.includes('gamma.app/embed/')) return url;
    const match = url.match(/gamma\.app\/docs\/.*-([a-zA-Z0-9]+)/);
    if (match && match[1]) {
      return `https://gamma.app/embed/${match[1]}`;
    }
    return url;
  };

  // Target url for new tab
  const directLink = item.presentationUrl || activePdfUrl || '';
  const embedSource = getResolvedEmbedUrl(activePdfUrl);

  const handleApplyPdf = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPdfUrl.trim()) {
      setActivePdfUrl(customPdfUrl.trim());
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setActivePdfUrl(fakeUrl);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className={`bg-white rounded-3xl w-full ${activePdfUrl ? 'max-w-5xl' : 'max-w-3xl'} shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in fade-in zoom-in-95 duration-200 transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-start justify-between relative shrink-0">
          <div className="flex-1 pr-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold tracking-wide">
                {item.term}. Dönem
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/40 text-blue-100 text-xs font-semibold flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {item.week}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 text-xs font-medium border border-amber-300/30">
                {item.id.startsWith('g6') ? '6. Sınıf Bilişim Müfredatı' : '5. Sınıf Bilişim Müfredatı'}
              </span>
              {item.presentationType === 'pdf' && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/25 text-amber-200 text-xs font-semibold border border-amber-300/30 flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Hazırlanmış PDF Slaytı
                </span>
              )}
              {isGamma && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/25 text-emerald-200 text-xs font-semibold border border-emerald-300/30 flex items-center gap-1">
                  <Presentation className="w-3 h-3" />
                  Gamma Etkileşimli Slayt
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {item.title}
            </h2>
            {item.description && (
              <p className="text-blue-100 text-xs sm:text-sm mt-1.5 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Kapat"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* If item is PDF slide format */}
          {item.id === 'g5-t1-w1' ? (
            <PdfSlideViewer onAskAi={onAskAi} />
          ) : item.id === 'g5-t1-w2' ? (
            <PdfSlideViewerG5W2 onAskAi={onAskAi} />
          ) : item.id === 'g6-t1-w2' ? (
            <PdfSlideViewerG6W2 onAskAi={onAskAi} />
          ) : activePdfUrl && activePdfUrl !== 'pdf-slide-w1' && activePdfUrl !== 'pdf-slide-g5-w2' && activePdfUrl !== 'pdf-slide-g6-w2' ? (
            <div className="space-y-3">
              {/* Status and Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  </span>
                  <span className="font-semibold text-slate-800">
                    {isGamma ? 'Gamma Etkileşimli Ders Slaytı' : 'Ders Sunumu / PDF Belgesi'}
                  </span>
                  <span className="hidden sm:inline-block text-xs text-slate-400">|</span>
                  <span className="hidden sm:inline-block text-xs text-slate-500">
                    Saniye ÖZTÜRK
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={directLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition-colors"
                  >
                    <span>Yeni Sekmede / Tam Ekran Aç</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowUploader(!showUploader)}
                    className="text-xs text-slate-500 hover:text-blue-700 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Düzenle
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePdfUrl(null)}
                    className="text-xs text-slate-400 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    Kaldır
                  </button>
                </div>
              </div>

              {/* Embedded Presentation Viewport */}
              <div className="w-full h-[460px] sm:h-[540px] md:h-[600px] border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-900 relative">
                <iframe
                  src={embedSource}
                  title={item.title}
                  allow="fullscreen; clipboard-read; clipboard-write"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full border-0 bg-white"
                />
              </div>

              {/* Helpful footer info about Gamma slides */}
              <div className="flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-slate-500 px-2">
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                  Slayt içinde ilerlemek için ok tuşlarını kullanabilir veya fareyle kaydırabilirsiniz.
                </span>
                {directLink && (
                  <a
                    href={directLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1 font-medium"
                  >
                    Bağlantıyı Ziyaret Et
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            /* Empty State as requested: "Linklerin içeriği boş kalsın İçerisine sonra PDF ile hazırladığım sunuları ekleyeceğim." */
            <div className="border-2 border-dashed border-blue-200 bg-gradient-to-b from-blue-50/50 to-indigo-50/30 rounded-3xl p-8 sm:p-10 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 shadow-sm">
                <Presentation className="w-10 h-10 stroke-[1.5]" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-3 border border-amber-200">
                <FileText className="w-3.5 h-3.5" />
                Ders Sunusu Hazırlanıyor
              </span>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                Bu Haftanın Sunusu Henüz Eklenmedi
              </h3>
              <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed mb-6">
                <strong>Saniye ÖZTÜRK</strong> tarafından hazırlanan <em>"{item.title}"</em> konusuna ait ders sunumu, etkileşimli slaytlar ve alıştırma kağıtları hazırlanmaktadır.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onAskAi(`5. Sınıf Bilişim Teknolojileri dersi "${item.title}" konusu hakkında bana MEB müfredatına uygun özet ders notu verir misin?`)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Yapay Zeka ile Konuyu İncele
                </button>

                <button
                  type="button"
                  onClick={() => setShowUploader(!showUploader)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4 text-blue-600" />
                  <span>Öğretmen: Slayt / PDF Sunusu Ekle</span>
                </button>
              </div>
            </div>
          )}

          {/* Optional Inline Teacher Helper to attach a PDF URL or upload PDF directly */}
          {showUploader && (
            <div className="pt-5 border-t border-blue-200 text-left bg-white p-5 rounded-2xl shadow-xs border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Presentation className="w-4 h-4 text-blue-600" />
                  Öğretmen Sunu / Slayt Bağlama Alanı
                </h4>
                <span className="text-[11px] text-slate-500">Saniye Öğretmen Yönetim Paneli</span>
              </div>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Hazırladığınız Gamma sunusu linkini, Google Drive PDF veya web bağlantısını yapıştırabilir ya da bilgisayarınızdan dosya seçebilirsiniz.
              </p>

              <form onSubmit={handleApplyPdf} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://gamma.app/docs/... veya PDF linki"
                    value={customPdfUrl}
                    onChange={(e) => setCustomPdfUrl(e.target.value)}
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Bağla
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                  <span>Veya bilgisayarınızdan dosya seçin:</span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer border border-slate-200">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>PDF Seç</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>

                {uploadSuccess && (
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Sunu başarıyla yüklendi ve önizlemeye eklendi!
                  </p>
                )}
              </form>
            </div>
          )}

          {/* Quick learning hints about this week */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700 shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-800 block mb-0.5">Bu Hafta Öğrenilecek Temel Kazanım:</span>
              {item.description || '5. Sınıf Bilişim Teknolojileri ve Yazılım dersi kazanımlarına uygun teorik ve uygulamalı içerikler.'}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSelectPrev}
              disabled={!hasPrev}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                hasPrev 
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/60'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Önceki Hafta</span>
            </button>
            <button
              type="button"
              onClick={onSelectNext}
              disabled={!hasNext}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                hasNext 
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 cursor-pointer' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200/60'
              }`}
            >
              <span>Sonraki Hafta</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
