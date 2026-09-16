import React, { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { WeeklyCurriculumItem } from '../types';

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

  if (!isOpen || !item) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-start justify-between relative">
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
        <div className="p-6 overflow-y-auto space-y-6">
          {/* If a PDF has been linked or uploaded */}
          {activePdfUrl ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-2xl text-emerald-800 text-xs sm:text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  PDF Sunumu Bağlandı
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={activePdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold underline"
                  >
                    Yeni Sekmede Aç
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActivePdfUrl(null)}
                    className="ml-2 text-xs text-slate-500 hover:text-red-600 underline cursor-pointer"
                  >
                    Kaldır
                  </button>
                </div>
              </div>

              <div className="w-full h-96 border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                <iframe
                  src={activePdfUrl}
                  title={item.title}
                  className="w-full h-full"
                />
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
                <strong>Saniye ÖZTÜRK</strong> tarafından hazırlanan <em>"{item.title}"</em> konusuna ait ders sunumu, etkileşimli slaytlar ve alıştırma kağıtları PDF formatında hazırlanmaktadır.
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
                  <span>Öğretmen: PDF Sunusu Ekle / Bağla</span>
                </button>
              </div>

              {/* Optional Inline Teacher Helper to attach a PDF URL or upload PDF directly */}
              {showUploader && (
                <div className="mt-6 pt-6 border-t border-blue-200 text-left bg-white p-5 rounded-2xl shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Presentation className="w-4 h-4 text-blue-600" />
                      Öğretmen PDF Sunumu Bağlama Alanı
                    </h4>
                    <span className="text-[11px] text-slate-500">Saniye Öğretmen Yönetim Paneli</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Hazırladığınız PDF sunusunun Google Drive / web bağlantısını yapıştırabilir veya bilgisayarınızdan doğrudan PDF dosyasını seçerek önizleyebilirsiniz.
                  </p>

                  <form onSubmit={handleApplyPdf} className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://.../sunu.pdf (Google Drive veya web bağlantısı)"
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
                        PDF başarıyla yüklendi ve önizlemeye eklendi!
                      </p>
                    )}
                  </form>
                </div>
              )}
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
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
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
