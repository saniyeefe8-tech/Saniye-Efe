import React, { useState, useMemo } from 'react';
import { 
  Monitor, 
  Cpu, 
  Bot, 
  FolderArchive, 
  Gamepad2, 
  Clock, 
  Bell, 
  CheckCircle2, 
  Search, 
  ArrowLeft,
  Sparkles,
  BookOpen,
  FileCode2,
  Send,
  FileText,
  Presentation,
  Calendar,
  ExternalLink,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { NavCategoryKey, CategoryInfo, WeeklyCurriculumItem } from '../types';
import { CURRICULUM_GRADE_5_TERM_1, CURRICULUM_GRADE_5_TERM_2 } from '../data/curriculum5Data';
import { CURRICULUM_GRADE_6_TERM_1, CURRICULUM_GRADE_6_TERM_2 } from '../data/curriculum6Data';
import { CurriculumPresentationModal } from './CurriculumPresentationModal';
import { DocumentsSection } from './documents/DocumentsSection';

interface CategoryViewProps {
  category: CategoryInfo;
  onBackToHome: () => void;
  onAskAi: (prompt: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  onBackToHome,
  onAskAi,
}) => {
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);
  const [requestedTopic, setRequestedTopic] = useState('');
  const [topicSubmitted, setTopicSubmitted] = useState(false);

  // Curriculum state (5th & 6th grade)
  const isCurriculumCategory = category.key === '5-sinif-bilisim' || category.key === '6-sinif-bilisim';
  const gradeNumber = category.key === '6-sinif-bilisim' ? '6' : '5';

  const [selectedTerm, setSelectedTerm] = useState<'1' | '2' | 'all'>('1');
  const [curriculumSearch, setCurriculumSearch] = useState('');
  const [selectedModalItem, setSelectedModalItem] = useState<WeeklyCurriculumItem | null>(null);

  const getIcon = () => {
    switch (category.key) {
      case '5-sinif-bilisim':
        return Monitor;
      case '6-sinif-bilisim':
        return Cpu;
      case '5-sinif-robotik':
        return Bot;
      case 'evraklar':
        return FolderArchive;
      case 'oyunlar':
        return Gamepad2;
      default:
        return BookOpen;
    }
  };

  const Icon = getIcon();

  // Curriculum Items for current selected grade category
  const term1Items = useMemo(() => {
    return category.key === '6-sinif-bilisim' ? CURRICULUM_GRADE_6_TERM_1 : CURRICULUM_GRADE_5_TERM_1;
  }, [category.key]);

  const term2Items = useMemo(() => {
    return category.key === '6-sinif-bilisim' ? CURRICULUM_GRADE_6_TERM_2 : CURRICULUM_GRADE_5_TERM_2;
  }, [category.key]);

  const allCurriculumItems = useMemo(() => {
    return [...term1Items, ...term2Items];
  }, [term1Items, term2Items]);

  const displayedCurriculum = useMemo(() => {
    let items: WeeklyCurriculumItem[] = [];
    if (selectedTerm === '1') {
      items = term1Items;
    } else if (selectedTerm === '2') {
      items = term2Items;
    } else {
      items = allCurriculumItems;
    }

    if (curriculumSearch.trim()) {
      const q = curriculumSearch.toLowerCase();
      items = items.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.week.toLowerCase().includes(q) ||
          (it.description && it.description.toLowerCase().includes(q))
      );
    }
    return items;
  }, [selectedTerm, curriculumSearch, term1Items, term2Items, allCurriculumItems]);

  // Modal navigation helpers
  const currentModalIndex = selectedModalItem
    ? displayedCurriculum.findIndex((i) => i.id === selectedModalItem.id)
    : -1;
  const hasPrevItem = currentModalIndex > 0;
  const hasNextItem = currentModalIndex >= 0 && currentModalIndex < displayedCurriculum.length - 1;

  const handlePrevModalItem = () => {
    if (hasPrevItem) {
      setSelectedModalItem(displayedCurriculum[currentModalIndex - 1]);
    }
  };

  const handleNextModalItem = () => {
    if (hasNextItem) {
      setSelectedModalItem(displayedCurriculum[currentModalIndex + 1]);
    }
  };

  // Upcoming planned curriculum topics to show for other categories
  const getUpcomingTopics = (key: NavCategoryKey) => {
    switch (key) {
      case '6-sinif-bilisim':
        return [
          { title: '1. Ünite: Problem Çözme Kavramları', desc: 'Problemi anlama, analiz etme ve algoritmik düşünme adımları.' },
          { title: '2. Ünite: Algoritma ve Akış Şemaları', desc: 'Akış şeması geometrik şekilleri, karar yapıları (Eğer/Değilse) ve döngüler.' },
          { title: '3. Ünite: Blok Tabanlı Kodlama Temelleri', desc: 'Değişkenler, operatörler ve blok tabanlı kodlamada mantıksal sınamalar.' },
          { title: '4. Ünite: Dijital Güvenlik ve Siber Zorbalık', desc: 'Güvenli şifreleme, telif hakları ve dijital yurttaşlık sorumlulukları.' },
        ];
      case '5-sinif-robotik':
        return [
          { title: 'Modül 1: Mblock Sahnesi ve Karakterler', desc: 'Görsel bloklar, hareket, kostüm değişimleri ve koordinat sistemi (X, Y).' },
          { title: 'Modül 2: Olaylar ve Döngüler', desc: 'Tıklama olayları, sürekli tekrarla ve belirli sayıda tekrar blokları.' },
          { title: 'Modül 3: Robotik Algılayıcılar & Sensörler', desc: 'Mesafe sensörü, ışık sensörü ve çizgi izleme mantığı simülasyonları.' },
          { title: 'Modül 4: Kendi İnteraktif Oyununu Kodla', desc: 'Puan sistemli elma toplama ve engelden kaçan robot oyun projeleri.' },
        ];
      case 'evraklar':
        return [
          { title: '2025 - 2026 Bilişim Yıllık Planları', desc: '5. ve 6. sınıf güncel MEB müfredatına uyumlu haftalık ders dağılım çizelgeleri.' },
          { title: 'Zümre Öğretmenler Kurulu Tutanakları', desc: 'Dönem başı, dönem ortası ve sene sonu zümre kararları şablonları.' },
          { title: 'Ders Etkinlik ve Çalışma Kağıtları', desc: 'Öğrencilere dağıtılabilir yazdırılabilir PDF alıştırma fasikülleri.' },
          { title: 'Ölçme ve Değerlendirme Ölçekleri', desc: 'Uygulamalı sınav ve proje değerlendirme rubrikleri.' },
        ];
      case 'oyunlar':
        return [
          { title: 'Bilişim Terimleri Bilgi Yarışması', desc: 'Donanım ve yazılım terimlerini eğlenerek pekiştiren zamana karşı mini oyun.' },
          { title: 'Klavye Hızlı Yazma Oyunu', desc: 'On parmak klavye yazım hızını artıran eğlenceli eğitici parkur.' },
          { title: 'Algoritma Labirent Bulmacası', desc: 'Karakteri hedef koda ulaştırmak için blok sıralama mantık oyunu.' },
          { title: 'Güvenli İnternet Dedektifi', desc: 'Şüpheli e-postaları ve virüsleri ayırt etme simülasyonu.' },
        ];
      default:
        return [];
    }
  };

  const upcoming = getUpcomingTopics(category.key);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotified(true);
      setNotifyEmail('');
    }
  };

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestedTopic.trim()) {
      setTopicSubmitted(true);
      setRequestedTopic('');
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            id="category-back-to-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Anasayfaya Dön</span>
          </button>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            {category.badge || 'Kategori'}
          </span>
        </div>

        {/* Category Header Card */}
        <div className="bg-white rounded-3xl border border-blue-100 shadow-sm p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/60 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Icon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  MEB Bilişim Müfredatı
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  Öğretmen: Saniye ÖZTÜRK
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-1.5">
                {category.label}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* 5. & 6. SINIF BİLİŞİM: HAFTA HAFTA MÜFREDAT VE SUNUM LİNKLERİ */}
        {isCurriculumCategory ? (
          <div className="space-y-6 mb-12">
            {/* Teacher Info Notice Card */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-xs">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                    Haftalık Ders Sunuları & PDF Materyalleri
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {gradeNumber}. Sınıf Haftalık Ders Planı & Sunu Bağlantıları
                  </h3>
                  <p className="text-blue-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    Aşağıda 1. ve 2. dönem için MEB müfredatına uygun hazırlanan haftalık konular yer almaktadır. Her konunun bağlantısına tıklayarak ders sunusu alanına ulaşabilirsiniz. Sunuların içerisine PDF sunular öğretmenimiz tarafından hazırlandıkça eklenecektir.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onAskAi(`${gradeNumber}. Sınıf Bilişim Teknolojileri ve Yazılım dersi genel müfredat konuları, 1. ve 2. dönem kazanımları hakkında detaylı bilgi verir misin?`)}
                  className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Müfredatı Yapay Zekaya Sor</span>
                </button>
              </div>
            </div>

            {/* Filter & Semester Selection Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Semester Tabs */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
                <button
                  type="button"
                  id="tab-term-1"
                  onClick={() => setSelectedTerm('1')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedTerm === '1'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>1. Dönem</span>
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700">
                    {term1Items.length} Hafta
                  </span>
                </button>

                <button
                  type="button"
                  id="tab-term-2"
                  onClick={() => setSelectedTerm('2')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedTerm === '2'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>2. Dönem</span>
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-700">
                    {term2Items.length} Hafta
                  </span>
                </button>

                <button
                  type="button"
                  id="tab-term-all"
                  onClick={() => setSelectedTerm('all')}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    selectedTerm === 'all'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tümü ({allCurriculumItems.length} Hafta)
                </button>
              </div>

              {/* Search Within Weeks */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  id="curriculum-search-input"
                  placeholder={
                    gradeNumber === '6'
                      ? 'Hafta veya konu ara... (örn: Yenilikçi Teknolojiler, Siber Güvenlik, Algoritma, Scratch)'
                      : 'Hafta veya konu ara... (örn: Yapay Zeka, Kelime İşlemci, mBlock)'
                  }
                  value={curriculumSearch}
                  onChange={(e) => setCurriculumSearch(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>
            </div>

            {/* List of Weeks / Curriculum Links */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
                <span>
                  {selectedTerm === '1' && '1. DÖNEM HAFTALIK DERS LİSTESİ'}
                  {selectedTerm === '2' && '2. DÖNEM HAFTALIK DERS LİSTESİ'}
                  {selectedTerm === 'all' && 'TÜM EĞİTİM YILI HAFTALIK DERS LİSTESİ'}
                  {' '}({displayedCurriculum.length} Konu)
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-normal">
                  <FileText className="w-3.5 h-3.5" />
                  PDF sunuları yakında eklenecektir
                </span>
              </div>

              {displayedCurriculum.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
                  Aramanıza uygun ders konusu bulunamadı. Lütfen farklı bir arama terimi deneyin.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {displayedCurriculum.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedModalItem(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedModalItem(item);
                        }
                      }}
                      className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all p-4 sm:p-5 flex flex-col justify-between group cursor-pointer text-left"
                    >
                      <div>
                        {/* Top metadata tags */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              {item.week}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium text-[11px]">
                              {item.term}. Dönem
                            </span>
                          </div>

                          {(item.presentationUrl || item.pdfUrl || item.hasPdf) ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Presentation className="w-3 h-3 text-emerald-600" />
                              {item.presentationType === 'gamma' 
                                ? 'Gamma Slaytı Hazır' 
                                : item.presentationType === 'pdf'
                                ? 'PDF Slaytı Hazır'
                                : 'Slayt / Sunu Hazır'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                              <FileText className="w-3 h-3 text-amber-600" />
                              PDF Hazırlanıyor
                            </span>
                          )}
                        </div>

                        {/* Title of the week */}
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-1.5">
                          {item.title}
                        </h4>

                        {/* Description */}
                        {item.description && (
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Action link button at bottom */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-blue-600 group-hover:text-blue-800 font-semibold flex items-center gap-1.5">
                          <Presentation className="w-4 h-4 text-blue-500" />
                          <span>
                            {(item.presentationUrl || item.pdfUrl)
                              ? (item.presentationType === 'gamma' 
                                  ? 'Ders Slaytını İncele (Gamma)' 
                                  : item.presentationType === 'pdf'
                                  ? 'Ders Slaytını İncele (PDF)'
                                  : 'Ders Sunusunu İncele')
                              : 'Ders Sunusunu Aç (PDF)'}
                          </span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : category.key === 'evraklar' ? (
          /* EVRAKLAR: Sınıf Oturma Planı, 7/C Sınıf Kuralları ve Resmi Belgeler */
          <DocumentsSection onAskAi={onAskAi} />
        ) : (
          /* OTHER CATEGORIES: Modern Empty State Card */
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs mb-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Bu Kategori Şu An Hazırlanıyor
            </h2>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Saniye Öztürk tarafından hazırlanan ders notları, sunumlar, kodlama çalışma yaprakları ve dijital materyaller çok yakında buraya yüklenecektir.
            </p>

            {/* Quick AI ask action */}
            <div className="inline-flex flex-wrap items-center justify-center gap-3">
              <button
                id="category-ask-ai-btn"
                onClick={() => onAskAi(`${category.label} konusu hakkında bana genel bilgi verir misin?`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-sm hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Yapay Zekaya Bu Konuyu Sor
              </button>
              <button
                id="category-return-home-btn"
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
              >
                Blog Yazılarını İncele
              </button>
            </div>
          </div>
        )}

        {/* Planned Modules / Curriculum Preview (Shown for remaining in-progress categories) */}
        {!isCurriculumCategory && category.key !== 'evraklar' && upcoming.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Hazırlanan Müfredat Konuları & Başlıklar
              </h3>
              <span className="text-xs text-slate-500 font-medium">Yakında Aktif</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcoming.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/80 p-5 hover:border-blue-300 transition-all shadow-2xs group"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Interaction: Topic Suggestion / Notify Me */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notify when updated */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-200/80 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-600 text-white">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                İçerik Eklendiğinde Haber Ver
              </h4>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Bu kategoriye yeni ders notları veya etkinlikler yüklendiğinde anında e-posta bildirimi al.
            </p>

            {notified ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Bildirim kaydınız alındı! Teşekkür ederiz.
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="flex gap-2">
                <input
                  type="email"
                  id="category-notify-email-input"
                  placeholder="E-posta adresiniz..."
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  required
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
                <button
                  type="submit"
                  id="category-notify-submit-btn"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                >
                  Kaydol
                </button>
              </form>
            )}
          </div>

          {/* Suggest a Topic to Teacher */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-600 text-white">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                Öğretmene Konu Önerisinde Bulun
              </h4>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Bu kategoride özellikle anlatılmasını veya paylaşılmasını istediğin bir konu var mı?
            </p>

            {topicSubmitted ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 p-3 rounded-xl border border-indigo-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                Öneriniz Saniye Öğretmen'e iletildi!
              </div>
            ) : (
              <form onSubmit={handleTopicSubmit} className="flex gap-2">
                <input
                  type="text"
                  id="category-suggest-topic-input"
                  placeholder="Örn: Mblock labirent oyunu kodları..."
                  value={requestedTopic}
                  onChange={(e) => setRequestedTopic(e.target.value)}
                  required
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-800"
                />
                <button
                  type="submit"
                  id="category-suggest-topic-btn"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gönder</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Curriculum Presentation Modal */}
      <CurriculumPresentationModal
        isOpen={!!selectedModalItem}
        onClose={() => setSelectedModalItem(null)}
        item={selectedModalItem}
        hasPrev={hasPrevItem}
        hasNext={hasNextItem}
        onSelectPrev={handlePrevModalItem}
        onSelectNext={handleNextModalItem}
        onAskAi={onAskAi}
      />
    </div>
  );
};
