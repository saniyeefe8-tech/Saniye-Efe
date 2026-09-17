import React from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  Cpu, 
  HardDrive, 
  Share2, 
  Download, 
  CheckCircle2, 
  Zap, 
  Clock, 
  GraduationCap, 
  ShoppingBag, 
  Radio, 
  Phone, 
  Tv, 
  Smartphone, 
  Laptop, 
  Navigation, 
  Disc, 
  Sparkles,
  Rocket
} from 'lucide-react';

export interface SlideData {
  pageNumber: number;
  title: string;
  subtitle?: string;
  badge?: string;
  type: 'cover' | 'concepts' | 'definition' | 'question' | 'advantages' | 'old-tech' | 'new-tech' | 'history' | 'areas' | 'pioneers' | 'summary' | 'activities';
}

export const SLIDES_CONTENT: SlideData[] = [
  {
    pageNumber: 1,
    title: 'Bilişim Teknolojileri Temel Kavramları',
    subtitle: '5. Sınıf Bilişim Teknolojileri Dersi',
    badge: '1. Hafta Slayt Sunusu',
    type: 'cover',
  },
  {
    pageNumber: 2,
    title: 'Temel Kavramlar',
    subtitle: 'Bilgi, İletişim ve Teknoloji nedir?',
    badge: 'Kavram Haritası',
    type: 'concepts',
  },
  {
    pageNumber: 3,
    title: 'Bilişim Teknolojileri Nedir?',
    subtitle: 'Verinin yolculuğu: Toplama, İşleme, Saklama ve İletme',
    badge: 'Tanım',
    type: 'definition',
  },
  {
    pageNumber: 4,
    title: 'Bilişim Teknolojileri Bize Ne Gibi Avantajlar Sağlıyor Olabilir?',
    subtitle: 'Düşünelim, Tartışalım!',
    badge: 'Beyin Fırtınası',
    type: 'question',
  },
  {
    pageNumber: 5,
    title: "BİT'in Sağladığı Avantajlar",
    subtitle: 'Hayatımızı kolaylaştıran 5 temel kolaylık',
    badge: 'Faydalar',
    type: 'advantages',
  },
  {
    pageNumber: 6,
    title: 'Eskiden Kullanılan Teknolojiler',
    subtitle: 'Geçmişten günümüze nostaljik bir yolculuk',
    badge: 'Geçmiş',
    type: 'old-tech',
  },
  {
    pageNumber: 7,
    title: 'Bugün Kullanılan Teknolojiler',
    subtitle: 'Günlük hayatımızın vazgeçilmez dijital araçları',
    badge: 'Günümüz',
    type: 'new-tech',
  },
  {
    pageNumber: 8,
    title: 'İlk Bilgisayarlar',
    subtitle: 'Abaküsten ENIAC ve modern çiplere uzanan serüven',
    badge: 'Tarihçe',
    type: 'history',
  },
  {
    pageNumber: 9,
    title: 'Bilişim Teknolojilerinin Kullanıldığı Alanlar',
    subtitle: 'Eğitimden sağlığa, uzaydan yapay zekâya her alanda BİT',
    badge: 'Kullanım Alanları',
    type: 'areas',
  },
  {
    pageNumber: 10,
    title: 'Teknolojinin Öncüleri',
    subtitle: 'Dijital dünyayı şekillendiren vizyoner liderler',
    badge: 'Bilişim Dünyası',
    type: 'pioneers',
  },
  {
    pageNumber: 11,
    title: 'Özet: Neler Öğrendik?',
    subtitle: '1. Hafta dersinin kısa ve akılda kalıcı özeti',
    badge: 'Ders Özeti',
    type: 'summary',
  },
  {
    pageNumber: 12,
    title: 'Etkinlikler ve Görevler',
    subtitle: 'Öğrendiklerimizi pekiştirme ve eğlenceli pratik zamanı',
    badge: 'Uygulama',
    type: 'activities',
  },
];
