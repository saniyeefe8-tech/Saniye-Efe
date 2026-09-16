import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', teacher: 'Saniye Öztürk', timestamp: new Date().toISOString() });
});

// Chatbot API for Saniye Öztürk's IT & Robotics Blog
app.post('/api/chat', async (req, res) => {
  const { message, history, grade } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mesaj metni gereklidir.' });
  }

  const systemInstruction = `Sen Saniye Öztürk'ün (Bilişim Teknolojileri ve Robotik Kodlama Öğretmeni) kişisel blogundaki akıllı eğitim asistanısın.
Adın: "Bilişim Rehberi AI".
Öğretmenin Uzmanlık Alanları: 5. Sınıf Bilişim Teknolojileri ve Yazılım (1. ve 2. Dönem haftalık MEB müfredatı: Bilişim teknolojilerinin sınıflandırılması, dijital sağlık, dijital vatandaşlık, yapay zeka, donanım-yazılım, dosya yönetimi, görsel düzenleme, kelime işlemci, sunum programları, ağlar, bilişim etiği, güvenlik, algoritma ve mBlock kodlama), 6. Sınıf Bilişim Teknolojileri ve Yazılım, 5. Sınıf Robotik Kodlama (Mblock, Sensörler, mBot, Arduino temelleri).
Hedef Kitle: Ortaokul 5. ve 6. sınıf öğrencileri, veliler ve bilişim meraklıları.
Üslubun: Nazik, cesaretlendirici, eğitici, net, Türkçe imla kurallarına uygun ve yaş seviyesine göre açıklayıcı.
Öğrenci bir kodlama veya bilişim sorusu sorduğunda somut örnekler (Mblock blokları, günlük hayat analojileri) ver.
Kullanıcı seviyesi: ${grade || 'Ortaokul (5. veya 6. Sınıf)'}.
Saniye Öğretmen'e iletişim bölümünden veya saniyeefe8@gmail.com adresinden ulaşılabileceğini nazikçe hatırlatabilirsin.`;

  try {
    const ai = getAiClient();
    if (ai) {
      const chatMessages = (history || []).map((h: { role: string; text: string }) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      }));

      chatMessages.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: chatMessages,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Üzgünüm, şu an yanıt oluşturulamadı. Lütfen tekrar deneyin.';
      return res.json({ reply: replyText });
    }
  } catch (error) {
    console.warn('Gemini API call failed or not configured, using fallback intelligent assistant response:', error);
  }

  // Fallback intelligent response if API key is not ready or network limits
  const fallbackReply = generateFallbackChatResponse(message, grade);
  return res.json({ reply: fallbackReply });
});

// Personalized AI Content Recommendation API
app.post('/api/recommendations', async (req, res) => {
  const { grade, interest, goal } = req.body;

  const targetGrade = grade || '5. Sınıf';
  const targetInterest = interest || 'Robotik Kodlama';
  const targetGoal = goal || 'Sıfırdan Proje Geliştirme';

  try {
    const ai = getAiClient();
    if (ai) {
      const prompt = `Aşağıdaki ortaokul öğrencisi profili için Saniye Öztürk Bilişim ve Kodlama müfredatına uygun kişiselleştirilmiş 3 adet öğrenme içeriği ve 1 haftalık hedef önerisi üret:
Sınıf Seviyesi: ${targetGrade}
İlgi Alanı: ${targetInterest}
Öğrenme Hedefi: ${targetGoal}

Yanıtı saf JSON formatında şu anahtarlarla ver:
{
  "title": "Öğrenciye özel yol haritası başlığı",
  "summary": "1-2 cümlelik motive edici özet",
  "recommendations": [
    {
      "id": "1",
      "category": "5. Sınıf Robotik / Bilişim / Oyun",
      "title": "Konu Başlığı",
      "description": "Detaylı açıklama ve öğrenilecek kazanım",
      "duration": "Tahmini süre (örn: 30 dk)",
      "badge": "Başlangıç / Orta / Eğlenceli"
    }
  ],
  "weeklyChallenge": "Haftalık pratik kodlama görevi"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json(parsed);
      }
    }
  } catch (error) {
    console.warn('Recommendation AI fallback used:', error);
  }

  // Curated educational fallback recommendations
  return res.json(getFallbackRecommendations(targetGrade, targetInterest, targetGoal));
});

// Contact endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, role, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Lütfen tüm zorunlu alanları doldurunuz.' });
  }

  console.log('İletişim Mesajı Alındı:', { name, email, subject, role, message, date: new Date().toISOString() });

  res.json({
    success: true,
    message: `Sayın ${name}, mesajınız Saniye Öztürk'e başarıyla iletildi. En kısa sürede ${email} adresiniz üzerinden geri dönüş yapılacaktır.`,
  });
});

function generateFallbackChatResponse(message: string, grade?: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('merhaba') || lower.includes('selam') || lower.includes('günaydın')) {
    return `Merhaba! Saniye Öztürk'ün Bilişim Teknolojileri ve Robotik Kodlama sayfasına hoş geldin! Sana 5. ve 6. sınıf ders konuları, Mblock kodlama veya projeler hakkında nasıl yardımcı olabilirim?`;
  }
  if (lower.includes('mblock') || lower.includes('scratch') || lower.includes('blok') || lower.includes('kodlama')) {
    return `Mblock, blok tabanlı görsel bir programlama ve robotik kontrol platformudur. Karakterleri ve donanımları hareket ettirmek için 'Olaylar' (Yeşil bayrağa tıklandığında), 'Hareket' (10 adım git) ve 'Kontrol' (Sürekli tekrarla) bloklarını kullanırız. Robotik kodlama bölümümüzde Mblock ile kendi projeni tasarlayabilirsin!`;
  }
  if (lower.includes('5. sınıf') || lower.includes('donanım') || lower.includes('yazılım')) {
    return `5. Sınıf Bilişim Teknolojileri dersinin en temel konusu 'Donanım ve Yazılım'dır. Bilgisayarın fiziksel parçalarına (kasa, klavye, fare, monitör) donanım; bu parçaları çalıştıran programlara ise yazılım denir!`;
  }
  if (lower.includes('6. sınıf') || lower.includes('algoritma') || lower.includes('akış')) {
    return `6. Sınıf konularında algoritma ve problem çözme çok önemlidir. Algoritma: Bir problemin adım adım, sırayla ve net bir şekilde çözülme planıdır. Günlük hayatta kek yapmak bile bir algoritmadır!`;
  }
  if (lower.includes('robotik') || lower.includes('sensör') || lower.includes('motor')) {
    return `Robotik kodlamada sensörler (algılayıcılar) robotun gözü kulağı gibidir (örneğin ultrasonik mesafe sensörü veya ışık sensörü). Motorlar ise robotun hareket etmesini sağlar. 5. Sınıf Robotik Kodlama kategorimizde pratik örnekler seni bekliyor!`;
  }
  if (lower.includes('evrak') || lower.includes('plan') || lower.includes('yıllık')) {
    return `Öğretmen ve idari evraklar için 'Evraklar' kategorimizi ziyaret edebilirsin. Yıllık planlar, zümre tutanakları ve ders materyalleri yakında indirilebilir olarak sunulacaktır.`;
  }
  if (lower.includes('iletişim') || lower.includes('saniye') || lower.includes('öğretmen') || lower.includes('mail')) {
    return `Saniye Öztürk Öğretmenimize aşağıdaki İletişim Formu üzerinden doğrudan mesaj bırakabilir veya 'saniyeefe8@gmail.com' e-posta adresinden yazabilirsiniz.`;
  }

  return `Sorun için teşekkürler! Bilişim Teknolojileri, Mblock blok kodlama, 5. ve 6. sınıf üniteleri veya robotik projeleri hakkında merak ettiğin her şeyi sorabilirsin. İstersen sol taraftaki 'Yapay Zeka İçerik Önerileri' panelini deneyerek sana özel bir çalışma planı da oluşturabilirsin.`;
}

function getFallbackRecommendations(grade: string, interest: string, goal: string) {
  return {
    title: `${grade} - ${interest} Özel Gelişim Rotası`,
    summary: `Belirttiğin "${goal}" hedefine ulaşman için Saniye Öğretmen'in müfredatına en uygun 3 temel içerik hazırlandı.`,
    recommendations: [
      {
        id: 'rec-1',
        category: grade.includes('5') ? '5. Sınıf Bilişim' : '6. Sınıf Bilişim',
        title: interest.includes('Robotik') ? 'Temel Algoritma ve Blok Mantığı' : 'Dijital Güvenlik ve Donanım Temelleri',
        description: 'Problem çözme adımlarını görselleştirerek ilk mantıksal döngüleri kavra.',
        duration: '25 Dakika',
        badge: 'Temel Adım',
      },
      {
        id: 'rec-2',
        category: 'Robotik Kodlama',
        title: 'Mblock ile İlk İnteraktif Sahne Tasarımı',
        description: 'Karakter hareketleri, ses blokları ve koordinat düzlemini eğlenerek uygula.',
        duration: '35 Dakika',
        badge: 'Uygulamalı',
      },
      {
        id: 'rec-3',
        category: 'Eğitici Oyunlar',
        title: 'Bilişim Dedektifi: Güvenli İnternet Mini Görevi',
        description: 'Güçlü şifre oluşturma ve dijital ayak izi testini tamamlayarak rozet kazan.',
        duration: '15 Dakika',
        badge: 'Eğlenceli Görev',
      },
    ],
    weeklyChallenge: `Haftalık Meydan Okuma: Mblock üzerinde kendi adını animasyonlu harflerle yazdır ve her harfe farklı bir ses efekti ata!`,
  };
}

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
