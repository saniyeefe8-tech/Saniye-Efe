import { BlogPost, CategoryInfo } from '../types';

export const CATEGORIES_CONFIG: CategoryInfo[] = [
  {
    key: 'anasayfa',
    label: 'Anasayfa',
    shortLabel: 'Anasayfa',
    description: 'Saniye Öztürk Bilişim ve Robotik Dünyasına Hoş Geldiniz.',
    iconName: 'Home',
  },
  {
    key: '5-sinif-bilisim',
    label: '5. Sınıf Bilişim Teknolojileri',
    shortLabel: '5. Sınıf Bilişim',
    description: '1. ve 2. Dönem MEB müfredatına uygun haftalık ders sunuları, PDF materyalleri ve çalışma notları.',
    iconName: 'Monitor',
    badge: 'Müfredat 5',
    gradeLevel: '5. Sınıf',
  },
  {
    key: '6-sinif-bilisim',
    label: '6. Sınıf Bilişim Teknolojileri',
    shortLabel: '6. Sınıf Bilişim',
    description: '1. ve 2. Dönem MEB müfredatına uygun haftalık ders konuları, yenilikçi bilişim teknolojileri, sunular ve algoritma temelleri.',
    iconName: 'Cpu',
    badge: 'Müfredat 6',
    gradeLevel: '6. Sınıf',
  },
  {
    key: '5-sinif-robotik',
    label: '5. Sınıf Robotik Kodlama',
    shortLabel: '5. Sınıf Robotik',
    description: 'Mblock ile blok kodlama, algoritma tasarımı, temel sensörler ve robotik proje uygulamaları.',
    iconName: 'Bot',
    badge: 'Uygulamalı',
    gradeLevel: '5. Sınıf',
  },
  {
    key: 'evraklar',
    label: 'Evraklar',
    shortLabel: 'Evraklar',
    description: 'Sınıf oturma planı şablonu, 7/C sınıf kuralları afişi, yıllık planlar, zümre tutanakları ve ders materyalleri.',
    iconName: 'FolderArchive',
    badge: 'Öğretmen & İdare',
    gradeLevel: 'Genel',
  },
  {
    key: 'oyunlar',
    label: 'Oyunlar',
    shortLabel: 'Oyunlar',
    description: 'Bilişim terimleri yarışmaları, klavye hız oyunları, Mblock mini oyunları ve kodlama labirentleri.',
    iconName: 'Gamepad2',
    badge: 'Eğitici Eğlence',
    gradeLevel: 'Genel',
  },
];

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Algoritmik Düşünme: Çocuklar İçin Problem Çözmenin Eğlenceli Yolu',
    slug: 'algoritmik-dusunme-problem-cozme',
    summary: 'Günlük hayatımızdaki adımları bir bilgisayar gibi planlamak problem çözme yeteneğimizi nasıl güçlendirir? 5. ve 6. sınıf öğrencileri için pratik örnekler.',
    content: `Algoritmik düşünme, sadece bilgisayar mühendislerinin değil; günlük hayatta karşılaştığı sorunları akılcı yöntemlerle çözmek isteyen herkesin edinmesi gereken en temel beceridir.

### Algoritma Nedir?
Bir amaca ulaşmak veya bir sorunu çözmek için izlenen **adım adım, net ve sonlu kurallar dizisine** algoritma denir. Örneğin sabah uyanıp okula gitmek, çay demlemek veya bir matematik problemini çözmek birer doğal algoritmadır.

### Ortaokul Seviyesinde Neden Önemli?
1. **Analitik Bakış Açısı:** Karmaşık görünen büyük problemleri küçük, yönetilebilir parçalara ayırır.
2. **Hata Ayıklama (Debugging):** Yapılan bir hatanın nerede olduğunu mantıksal sırayla bulmayı öğretir.
3. **Yaratıcı Düşünme:** Aynı sonuca farklı yollardan gitmeyi teşvik eder.

Derslerimizde Mblock ve blok tabanlı etkinliklerle öğrencilerimizin bu düşünme biçimini eğlenerek kazanmasını hedefliyoruz.`,
    category: '6-sinif-bilisim',
    categoryLabel: '6. Sınıf Bilişim',
    author: {
      name: 'Saniye ÖZTÜRK',
      title: 'Bilişim Teknolojileri ve Robotik Kodlama Öğretmeni',
      avatar: '/assets/teacher_avatar.jpg',
    },
    publishedAt: '12 Mart 2026',
    readTime: '4 dk okuma',
    tags: ['Algoritma', 'Problem Çözme', '6. Sınıf', 'Mantık'],
    likes: 42,
    commentsCount: 6,
    featured: true,
    coverGradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'post-2',
    title: 'Mblock ile Blok Tabanlı Kodlamaya Başlarken Bilinmesi Gerekenler',
    slug: 'mblock-ile-blok-kodlamaya-giris',
    summary: 'Metin tabanlı dillerin karmaşıklığından uzak, renkli bloklarla kendi hikayenizi, robotik projenizi ve oyununuzu nasıl geliştirebilirsiniz?',
    content: `Mblock, blok tabanlı görsel kodlamayı robotik, Arduino ve donanım dünyasıyla buluşturan, öğrencilerin kodlama ile tanışmasını sağlayan muhteşem bir platformdur.

### Mblock'un 3 Temel Yapı Taşı
- **Karakterler ve Cihazlar (Sprites & Devices):** Sahnedeki aktörlerimiz ve mBot, Arduino gibi kontrol edebileceğimiz robotik kartlar.
- **Dekorlar (Backdrops):** Oyunun, sahnenin ya da simülasyonun geçtiği ortamlar.
- **Kod Blokları:** 'Yeşil bayrağa tıklandığında', 'Sürekli tekrarla', 'Eğer ise değilse' gibi görsel lego parçaları.

### 5. Sınıf Öğrencilerine Tavsiyeler
Başlangıçta büyük projeler yerine küçük adımlarla ilerleyin. Karakteri ok tuşlarıyla yürütmek, bir labirentten çıkmasını sağlamak veya bir elmayı yakaladıkça puan artıran bir sayaç eklemek ilk haftaların en güzel alıştırmalarıdır.`,
    category: '5-sinif-robotik',
    categoryLabel: '5. Sınıf Robotik Kodlama',
    author: {
      name: 'Saniye ÖZTÜRK',
      title: 'Bilişim Teknolojileri ve Robotik Kodlama Öğretmeni',
      avatar: '/assets/teacher_avatar.jpg',
    },
    publishedAt: '05 Mart 2026',
    readTime: '5 dk okuma',
    tags: ['Mblock', 'Blok Kodlama', 'Robotik', 'Oyun Tasarımı'],
    likes: 58,
    commentsCount: 9,
    featured: true,
    coverGradient: 'from-sky-500 to-blue-700',
  },
  {
    id: 'post-3',
    title: 'Dijital Dünyada Güvenli Adımlar: Güçlü Şifre ve Dijital Ayak İzi',
    slug: 'guvenli-internet-dijital-ayak-izi',
    summary: 'İnternette paylaştığımız bilgiler nereye gidiyor? Siber zorbalıktan korunma, güçlü şifre oluşturma taktikleri ve dijital vatandaşlık rehberi.',
    content: `İnternet bize sınırsız bilgi ve eğlence sunarken kişisel sınırlarımızı ve güvenliğimizi korumayı da öğrenmemiz gerekir.

### Güçlü Bir Şifre Nasıl Oluşturulur?
- En az 8-12 karakterden oluşmalı.
- Büyük harf, küçük harf, rakam ve özel işaretler (!, ?, *) içermeli.
- Doğum tarihi, evcil hayvan adı veya 123456 gibi kolay tahmin edilebilir bilgiler içermemelidir.

### Dijital Ayak İzi Nedir?
İnternette ziyaret ettiğimiz siteler, tıkladığımız bağlantılar ve yaptığımız paylaşımlar arkamızda silinmesi çok güç bir iz bırakır. Paylaşmadan önce kendinize şunu sorun: "Bu bilgiyi okuldaki panoya assalar rahatsız olur muydum?" Eğer cevabınız evet ise internette de paylaşmayın.`,
    category: '5-sinif-bilisim',
    categoryLabel: '5. Sınıf Bilişim',
    author: {
      name: 'Saniye ÖZTÜRK',
      title: 'Bilişim Teknolojileri ve Robotik Kodlama Öğretmeni',
      avatar: '/assets/teacher_avatar.jpg',
    },
    publishedAt: '24 Şubat 2026',
    readTime: '3 dk okuma',
    tags: ['Güvenli İnternet', 'Siber Güvenlik', '5. Sınıf', 'Etik'],
    likes: 35,
    commentsCount: 4,
    featured: false,
    coverGradient: 'from-indigo-600 to-blue-800',
  },
  {
    id: 'post-4',
    title: 'Robotik Dünyasına Giriş: Sensörler Neden Robotun Duyularıdır?',
    slug: 'robotik-ve-sensorler-nedir',
    summary: 'Ultrasonik mesafe sensöründen ışık algılayıcılara kadar, robotların çevreleriyle nasıl iletişim kurduğunu keşfedelim.',
    content: `Bir robotu sadece motorları olan metal bir kutudan ayıran en temel şey, etrafındaki dünyayı hissedebilmesidir. İnsanların gözleri, kulakları ve dokunma duyusu neyse; robotların sensörleri de tam olarak odur.

### Sık Kullandığımız Sensörler
1. **Ultrasonik Mesafe Sensörü:** Yarasaların ses dalgalarıyla yön bulması gibi ses dalgası gönderip yankısını ölçerek engelleri tespit eder.
2. **Çizgi İzleyen Sensörü (IR):** Zeminin siyah veya beyaz olduğunu ışık yansımasına göre anlar.
3. **Işık Sensörü (LDR):** Ortamdaki aydınlık seviyesine göre sokak lambası veya akıllı perde sistemleri yapmamızı sağlar.`,
    category: '5-sinif-robotik',
    categoryLabel: '5. Sınıf Robotik Kodlama',
    author: {
      name: 'Saniye ÖZTÜRK',
      title: 'Bilişim Teknolojileri ve Robotik Kodlama Öğretmeni',
      avatar: '/assets/teacher_avatar.jpg',
    },
    publishedAt: '18 Şubat 2026',
    readTime: '4 dk okuma',
    tags: ['Robotik', 'Sensörler', 'Arduino', 'mBot', 'Kodlama'],
    likes: 61,
    commentsCount: 11,
    featured: false,
    coverGradient: 'from-blue-700 to-cyan-700',
  },
];

export const INITIAL_USER = {
  id: 'teacher-saniye',
  name: 'Saniye ÖZTÜRK',
  email: 'saniyeefe8@gmail.com',
  avatar: '/assets/teacher_avatar.jpg',
  role: 'Öğretmen' as const,
  grade: '5. ve 6. Sınıf' as const,
  school: 'MEB Bilişim Teknolojileri ve Yazılım',
  provider: 'google' as const,
  savedPostIds: ['post-1', 'post-2'],
  completedTasks: ['task-1'],
  joinedDate: 'Eylül 2025',
};

export const CHAT_QUICK_QUESTIONS = [
  'Mblock’ta karakteri veya robotu nasıl hareket ettiririm?',
  '5. sınıf donanım ve yazılım farkı nedir?',
  'Algoritma akış şeması ne anlama gelir?',
  'Robotik kodlamada sensörler ne işe yarar?',
  'Ders evrakları ve yıllık plan nerede?',
  'Saniye Öğretmen ile nasıl iletişime geçerim?',
];
