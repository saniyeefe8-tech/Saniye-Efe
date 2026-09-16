import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  RotateCcw, 
  Sparkles, 
  Users, 
  Check, 
  Info,
  Maximize2
} from 'lucide-react';

interface SeatingPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeatingPlanModal: React.FC<SeatingPlanModalProps> = ({ isOpen, onClose }) => {
  // 3 columns x 5 desks x 2 students = 30 students
  // Key format: `${colIndex}-${deskIndex}-${seatIndex}`
  const [studentNames, setStudentNames] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleNameChange = (key: string, value: string) => {
    setStudentNames((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    if (window.confirm('Tüm öğrenci isimlerini temizlemek istiyor musunuz?')) {
      setStudentNames({});
    }
  };

  const handleFillSample = () => {
    const sampleNames = [
      'Ahmet Yılmaz', 'Zeynep Kaya', 'Mustafa Demir', 'Elif Şahin',
      'Emir Çelik', 'Defne Yıldız', 'Burak Aydın', 'Yağmur Koç',
      'Kerem Arslan', 'İrem Özdemir', 'Ali Öztürk', 'Merve Kurt',
      'Yusuf Polat', 'Ece Doğan', 'Hamza Aslan', 'Beren Çetin',
      'Ömer Faruk', 'Duru Yavuz', 'Mehmet Akif', 'Azra Korkmaz',
      'Eren Can', 'Selin Aksoy', 'Caner Tekin', 'Melis Güneş',
      'Alperen Er', 'Nazlı Avcı', 'Mert Bulut', 'Deniz Keskin',
      'Baran Ünal', 'Sude Taşkın'
    ];
    const newMap: Record<string, string> = {};
    let idx = 0;
    for (let c = 0; c < 3; c++) {
      for (let d = 0; d < 5; d++) {
        for (let s = 0; s < 2; s++) {
          newMap[`${c}-${d}-${s}`] = sampleNames[idx] || `Öğrenci ${idx + 1}`;
          idx++;
        }
      }
    }
    setStudentNames(newMap);
  };

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    { name: 'Sol Kolon', chairBg: 'bg-sky-500', chairBorder: 'border-sky-700', deskAccent: 'border-sky-400', theme: 'sky' },
    { name: 'Orta Kolon', chairBg: 'bg-emerald-500', chairBorder: 'border-emerald-700', deskAccent: 'border-emerald-400', theme: 'emerald' },
    { name: 'Sağ Kolon', chairBg: 'bg-orange-500', chairBorder: 'border-orange-700', deskAccent: 'border-orange-400', theme: 'orange' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div 
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[96vh] print:max-h-none print:shadow-none print:border-none print:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar (hidden during print) */}
        <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                Sınıf Oturma Planı Çizelgesi (30 Kişilik)
              </h2>
              <p className="text-xs text-slate-400">
                Öğrenci isimlerini doldurabilir veya boş şablon olarak yazdırabilirsiniz
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleFillSample}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer hidden sm:flex items-center gap-1.5"
              title="Örnek isimler doldur"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Örnek Doldur</span>
            </button>

            {Object.keys(studentNames).length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                title="İsimleri Temizle"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Temizle</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF Al</span>
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

        {/* Printable & Interactive Classroom Canvas */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-amber-50/40 print:p-2 print:bg-white">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-4 border-slate-700 p-5 sm:p-8 shadow-sm relative print:border-2 print:rounded-xl print:p-4">
            
            {/* Top Room Area: Door, Board, Teacher Desk, Bookshelf */}
            <div className="relative border-b-2 border-slate-200 pb-5 mb-5">
              {/* Door on top right */}
              <div className="absolute right-0 -top-2 flex flex-col items-center">
                <div className="w-12 h-20 bg-amber-100 border-2 border-amber-800 rounded-sm flex flex-col justify-between p-1 shadow-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-900 self-end mt-7"></div>
                  <span className="text-[9px] font-bold text-amber-900 text-center tracking-tight">KAPI</span>
                </div>
              </div>

              {/* Classroom Blackboard (TAHTA) */}
              <div className="w-64 sm:w-80 mx-auto bg-white border-4 border-slate-600 rounded-md py-3 px-6 text-center shadow-md relative">
                <span className="text-xl sm:text-2xl font-extrabold tracking-widest text-slate-800">
                  TAHTA
                </span>
                <div className="absolute bottom-1 right-3 flex gap-1">
                  <div className="w-3 h-1 bg-red-500 rounded-xs"></div>
                  <div className="w-3 h-1 bg-blue-600 rounded-xs"></div>
                  <div className="w-3 h-1 bg-slate-700 rounded-xs"></div>
                </div>
              </div>

              {/* Teacher's Desk & Bookshelf row */}
              <div className="mt-4 flex items-center justify-between px-2 sm:px-6">
                {/* Plant + Teacher Desk */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl select-none" title="Bitki">🪴</div>
                  <div className="bg-amber-100 border-2 border-amber-800 rounded-lg p-2.5 px-4 shadow-xs flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs">💻</span>
                      <span className="text-xs">✏️</span>
                      <span className="text-xs">📚</span>
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold text-amber-950 uppercase tracking-tight">
                      ÖĞRETMEN MASASI
                    </span>
                  </div>
                </div>

                {/* Bookshelf */}
                <div className="bg-amber-100 border-2 border-amber-800 rounded-lg p-2 shadow-xs flex flex-col items-center w-20">
                  <div className="text-sm mb-1">🌱</div>
                  <div className="w-full h-4 bg-amber-200 border border-amber-700 rounded-xs flex items-center justify-center gap-0.5 mb-1 px-1">
                    <div className="w-2 h-3 bg-red-400"></div>
                    <div className="w-2 h-3 bg-blue-400"></div>
                    <div className="w-2 h-3 bg-emerald-400"></div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-900">Kitaplık</span>
                </div>
              </div>
            </div>

            {/* Desks Section (3 Columns x 5 Rows) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 my-2">
              {columns.map((col, colIdx) => (
                <div 
                  key={colIdx} 
                  className={`rounded-2xl border-2 ${
                    col.theme === 'sky' ? 'border-sky-300 bg-sky-50/40' :
                    col.theme === 'emerald' ? 'border-emerald-300 bg-emerald-50/40' :
                    'border-orange-300 bg-orange-50/40'
                  } p-2 sm:p-2.5 space-y-2.5`}
                >
                  {/* 5 Rows of Desks */}
                  {Array.from({ length: 5 }).map((_, deskIdx) => (
                    <div 
                      key={deskIdx}
                      className="bg-amber-100 border-2 border-amber-800 rounded-xl p-1.5 sm:p-2 shadow-xs flex flex-col justify-between"
                    >
                      {/* Desk Writing Surface */}
                      <div className="bg-white/95 rounded-lg border border-amber-400/80 p-1 flex gap-1 mb-1.5 shadow-2xs">
                        {/* Student 1 */}
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            placeholder={`${colIdx * 10 + deskIdx * 2 + 1}. Öğrenci`}
                            value={studentNames[`${colIdx}-${deskIdx}-0`] || ''}
                            onChange={(e) => handleNameChange(`${colIdx}-${deskIdx}-0`, e.target.value)}
                            className="w-full text-center text-[10px] sm:text-xs font-bold text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:border-blue-600 focus:outline-hidden py-0.5 px-1 truncate"
                          />
                        </div>
                        {/* Divider */}
                        <div className="w-px bg-amber-200"></div>
                        {/* Student 2 */}
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            placeholder={`${colIdx * 10 + deskIdx * 2 + 2}. Öğrenci`}
                            value={studentNames[`${colIdx}-${deskIdx}-1`] || ''}
                            onChange={(e) => handleNameChange(`${colIdx}-${deskIdx}-1`, e.target.value)}
                            className="w-full text-center text-[10px] sm:text-xs font-bold text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:border-blue-600 focus:outline-hidden py-0.5 px-1 truncate"
                          />
                        </div>
                      </div>

                      {/* Chairs (2 chairs per desk) */}
                      <div className="flex justify-around px-2">
                        <div className={`w-6 sm:w-8 h-4 sm:h-5 ${col.chairBg} border-2 ${col.chairBorder} rounded-t-md shadow-2xs`}></div>
                        <div className={`w-6 sm:w-8 h-4 sm:h-5 ${col.chairBg} border-2 ${col.chairBorder} rounded-t-md shadow-2xs`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Bottom Room Motto & Graphics */}
            <div className="mt-6 pt-4 border-t-2 border-slate-200 flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-1 text-2xl select-none">
                📚 ✏️
              </div>

              <div className="text-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 shadow-2xs">
                <span className="text-xs sm:text-sm font-extrabold text-blue-900 tracking-wide flex items-center gap-1.5">
                  <span>Birlikte Daha Güçlüyüz</span>
                  <span className="text-base">😊</span>
                </span>
              </div>

              <div className="flex items-center gap-1 text-2xl select-none">
                🪴 🖊️
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (hidden during print) */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 print:hidden">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>İpucu: Kutucuklara doğrudan tıklayarak öğrenci isimlerini yazabilir ve doğrudan A4 çıktısı alabilirsiniz.</span>
          </div>
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
