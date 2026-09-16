import React, { useState } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Target, 
  BookMarked, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Compass, 
  Flame, 
  RotateCcw, 
  ArrowRight,
  SendHorizontal,
  Bot
} from 'lucide-react';
import { AiRecommendationResult, GradeLevel } from '../types';

interface AiRecommendationsPanelProps {
  onAskAi: (prompt: string) => void;
  defaultGrade?: GradeLevel;
}

export const AiRecommendationsPanel: React.FC<AiRecommendationsPanelProps> = ({
  onAskAi,
  defaultGrade = '5. Sınıf',
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>(defaultGrade === '6. Sınıf' ? '6. Sınıf' : '5. Sınıf');
  const [selectedInterest, setSelectedInterest] = useState<string>('5. Sınıf Robotik Kodlama');
  const [selectedGoal, setSelectedGoal] = useState<string>('Mblock ile Kendi Projemi Yapmak');
  const [loading, setLoading] = useState(false);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const [result, setResult] = useState<AiRecommendationResult>({
    title: '5. Sınıf Robotik & Kodlama Hızlı Başlangıç Rotası',
    summary: 'Saniye Öğretmen müfredatına göre hazırlanan bu rota, Mblock ortamını tanıman ve ilk hareket bloklarını deneyimlemen için tasarlandı.',
    recommendations: [
      {
        id: 'rec-1',
        category: 'Robotik Kodlama',
        title: 'Mblock Sahnesi, Karakterler ve Yeşil Bayrak Olayı',
        description: 'Karakter ve cihaz ekleme, koordinat düzlemi mantığı ve yeşil bayrağa tıklandığında çalışan ilk kod öbeği.',
        duration: '20 Dakika',
        badge: 'Temel Adım',
      },
      {
        id: 'rec-2',
        category: 'Algoritma',
        title: 'Sürekli Tekrarla ve Eğer-İse Kontrol Blokları',
        description: 'Karakterin ekran kenarına çarpınca dönmesi ve klavye ok tuşlarıyla yönlendirilmesi mantığı.',
        duration: '30 Dakika',
        badge: 'Uygulamalı',
      },
      {
        id: 'rec-3',
        category: 'Eğitici Oyun',
        title: 'Elma Yakalama ve Puan Sayacı Tasarımı',
        description: 'Değişken oluşturup her elmaya dokunulduğunda puanı 1 artıran mini oyun prototipi.',
        duration: '25 Dakika',
        badge: 'Proje Görevi',
      },
    ],
    weeklyChallenge: 'Haftalık Görev: Mblock’ta sahnede serbestçe hareket eden bir balık ve onu yakalayan bir köpekbalığı animasyonu hazırla!',
  });

  const interestsList = [
    '5. Sınıf Robotik Kodlama',
    'Mblock ile Oyun ve Robotik Geliştirme',
    'Algoritma ve Akış Şemaları',
    'Donanım ve Bilgisayar Parçaları',
    'Güvenli İnternet ve Siber Güvenlik',
    'Eğitici Bilişim Oyunları',
  ];

  const goalsList = [
    'Mblock ile Kendi Projemi Yapmak',
    'Bilişim Sınavına ve Projeye Hazırlık',
    'Problem Çözme ve Mantık Geliştirme',
    'Donanımları ve İç Parçaları Öğrenmek',
  ];

  const handleGenerateRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: selectedGrade,
          interest: selectedInterest,
          goal: selectedGoal,
        }),
      });

      if (!response.ok) throw new Error('API yanıt vermedi');
      const data = await response.json();
      setResult(data);
      setCompletedItems({});
    } catch (error) {
      console.warn('Recommendation fetch failed, retaining custom structured learning plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = (id: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="ai-recommendations-panel" className="py-16 bg-gradient-to-b from-slate-50 via-blue-50/40 to-white border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3 border border-blue-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Kişiselleştirilmiş Öğrenme Asistanı</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Yapay Zeka İçerik ve Gelişim Önerileri Paneli
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Ortaokul sınıf seviyene ve ilgilendiğin bilişim konusuna göre Saniye Öğretmen müfredatına en uygun öğrenme rotasını saniyeler içinde oluştur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Preference Selector */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-blue-200/80 shadow-md shadow-blue-900/5 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="p-2 rounded-xl bg-blue-600 text-white">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Öğrenci Tercihleri</h3>
                <p className="text-xs text-slate-500">Sana en uygun ders içeriğini belirle</p>
              </div>
            </div>

            {/* Sınıf Seviyesi */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                1. Sınıf Seviyeniz
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {['5. Sınıf', '6. Sınıf'].map((gr) => (
                  <button
                    key={gr}
                    id={`select-grade-${gr.replace(/\s+/g, '')}`}
                    onClick={() => setSelectedGrade(gr)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedGrade === gr
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {gr}
                  </button>
                ))}
              </div>
            </div>

            {/* İlgi Alanı */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                2. İlgi Duyduğun Alan
              </label>
              <div className="space-y-1.5">
                {interestsList.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => setSelectedInterest(interest)}
                    className={`w-full text-left py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center justify-between ${
                      selectedInterest === interest
                        ? 'bg-blue-50 text-blue-800 border-blue-300 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{interest}</span>
                    {selectedInterest === interest && (
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Hedef */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                3. Temel Öğrenme Hedefin
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800 font-medium"
              >
                {goalsList.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Generate Button */}
            <button
              id="generate-ai-recommendations-btn"
              disabled={loading}
              onClick={handleGenerateRecommendations}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Yapay Zeka Plan Hazırlıyor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Bana Özel İçerik Önerisi Üret</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Personalized Roadmap Output */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-md shadow-blue-900/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    Önerilen Çalışma Rotası
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">
                    {result.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>3 Adımlı Plan</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 my-4 leading-relaxed">
                {result.summary}
              </p>

              {/* Recommended Steps List */}
              <div className="space-y-3.5 mb-6">
                {result.recommendations.map((step, idx) => {
                  const isDone = completedItems[step.id];
                  return (
                    <div
                      key={step.id || idx}
                      className={`p-4 rounded-2xl border transition-all duration-200 ${
                        isDone 
                          ? 'bg-emerald-50/50 border-emerald-200' 
                          : 'bg-slate-50/80 border-slate-200 hover:border-blue-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleComplete(step.id)}
                            className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer shrink-0"
                            title={isDone ? 'Tamamlandı olarak işaretlendi' : 'Tamamlandı işaretle'}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300" />
                            )}
                          </button>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                {idx + 1}. {step.title}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                                {step.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed mb-2">
                              {step.description}
                            </p>
                            <div className="flex items-center gap-3 text-[11px] text-slate-400">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {step.duration}
                              </span>
                              <span>•</span>
                              <span>{step.category}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onAskAi(`Bana "${step.title}" konusunu örneklerle detaylıca açıklar mısın?`)}
                          className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-blue-700 text-[11px] font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1 shadow-2xs"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Botla Çalış</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Weekly Challenge Callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Öğretmenden Haftalık Meydan Okuma
                  </h4>
                  <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                    {result.weeklyChallenge}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
