export interface SchoolDocument {
  id: string;
  title: string;
  category: 'Sınıf Yönetimi' | 'Ders Planları' | 'Ölçme Değerlendirme' | 'Etkinlik';
  badge: string;
  date: string;
  format: 'PDF / Yazdırılabilir' | 'Şablon / Düzenlenebilir' | 'Word / PDF';
  description: string;
  previewType: 'seating-plan' | 'class-rules' | 'standard';
  downloadName?: string;
  fileSize?: string;
  featured?: boolean;
}

export const SCHOOL_DOCUMENTS: SchoolDocument[] = [
  {
    id: 'doc-seating-plan',
    title: 'Sınıf Oturma Planı Çizelgesi (30 Kişilik Şablon)',
    category: 'Sınıf Yönetimi',
    badge: 'Yeni Eklenen Evrak',
    date: 'Eylül 2025 - Güncel',
    format: 'PDF / Yazdırılabilir',
    description: 'Tahta, öğretmen masası ve 3 renkli sütunda (mavi, yeşil, turuncu) 30 öğrenci kapasiteli, isim yazılabilir renkli sınıf oturma düzeni krokisi.',
    previewType: 'seating-plan',
    downloadName: 'sinif_oturma_plani_sablonu.pdf',
    fileSize: '1.2 MB',
    featured: true,
  },
  {
    id: 'doc-class-rules',
    title: '7/C Sınıfı Sınıf Kuralları Afişi (10 Altın Kural)',
    category: 'Sınıf Yönetimi',
    badge: 'Yeni Eklenen Evrak',
    date: 'Eylül 2025 - Güncel',
    format: 'PDF / Yazdırılabilir',
    description: '"Daha iyi bir sınıf, daha güzel bir gelecek!" temalı; zaman yönetimi, saygı, teknoloji kullanımı ve akran nezaketini kapsayan 10 maddelik sınıf panosu afişi.',
    previewType: 'class-rules',
    downloadName: '7c_sinifi_sinif_kurallari_afisi.pdf',
    fileSize: '1.8 MB',
    featured: true,
  },
  {
    id: 'doc-annual-plan-5',
    title: '5. Sınıf Bilişim Teknolojileri ve Yazılım Yıllık Planı',
    category: 'Ders Planları',
    badge: '2025-2026 MEB',
    date: 'Eylül 2025',
    format: 'Word / PDF',
    description: 'MEB yeni müfredatına ve Türkiye Yüzyılı Maarif Modeline uygun 36 haftalık kazanım ve etkinlik dağılım çizelgesi.',
    previewType: 'standard',
    downloadName: '5_sinif_bilisim_yillik_plan_2025_2026.docx',
    fileSize: '450 KB',
  },
  {
    id: 'doc-annual-plan-6',
    title: '6. Sınıf Bilişim Teknolojileri ve Yazılım Yıllık Planı',
    category: 'Ders Planları',
    badge: '2025-2026 MEB',
    date: 'Eylül 2025',
    format: 'Word / PDF',
    description: 'Algoritma, problem çözme, akış şemaları ve dijital güvenlik ünitelerini içeren 36 haftalık ders planı.',
    previewType: 'standard',
    downloadName: '6_sinif_bilisim_yillik_plan_2025_2026.docx',
    fileSize: '480 KB',
  },
  {
    id: 'doc-zumre-1',
    title: '1. Dönem Bilişim Zümre Öğretmenler Kurulu Tutanağı',
    category: 'Ders Planları',
    badge: 'Resmi Evrak',
    date: 'Eylül 2025',
    format: 'Word / PDF',
    description: 'Sene başı zümre toplantı gündem maddeleri, ortak sınav kararları, ölçme-değerlendirme ilkeleri tutanağı.',
    previewType: 'standard',
    downloadName: '1_donem_bilisim_zumre_tutanagi.docx',
    fileSize: '320 KB',
  },
  {
    id: 'doc-rubric-coding',
    title: 'mBlock ve Robotik Kodlama Proje Değerlendirme Ölçeği (Rubrik)',
    category: 'Ölçme Değerlendirme',
    badge: 'Rubrik & Ölçek',
    date: '2025-2026',
    format: 'PDF / Yazdırılabilir',
    description: 'Algoritma kurgusu, blok kullanımı, yaratıcılık, hata ayıklama ve sunum kriterlerinden oluşan puanlama tablosu.',
    previewType: 'standard',
    downloadName: 'robotik_kodlama_degerlendirme_rubrigi.pdf',
    fileSize: '280 KB',
  },
  {
    id: 'doc-lab-rules',
    title: 'Bilişim Laboratuvarı Kullanım ve Güvenlik Talimatnamesi',
    category: 'Sınıf Yönetimi',
    badge: 'Pano Afişi',
    date: '2025-2026',
    format: 'PDF / Yazdırılabilir',
    description: 'Bilgisayar laboratuvarında uyulması gereken ergonomi, elektrik güvenliği, hijyen ve cihaz kullanım kuralları.',
    previewType: 'standard',
    downloadName: 'bilisim_sinifi_kullanim_kurallari.pdf',
    fileSize: '540 KB',
  },
];
