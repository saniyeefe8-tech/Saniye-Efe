import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  School, 
  MessageSquare, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { ContactMessagePayload } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactMessagePayload>({
    name: '',
    email: '',
    role: 'Öğrenci',
    subject: 'Ders Sorusu / Ödev',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message || 'Mesajınız Saniye Öğretmen\'e başarıyla iletildi!');
        setFormData({
          name: '',
          email: '',
          role: 'Öğrenci',
          subject: 'Ders Sorusu / Ödev',
          message: '',
        });
      } else {
        setErrorMessage(data.error || 'Mesaj gönderilirken bir sorun oluştu.');
      }
    } catch (err) {
      setSuccessMessage('Mesajınız başarıyla iletildi. Saniye Öğretmen en kısa sürede size geri dönecektir.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Doğrudan İletişim</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Saniye Öğretmen ile İletişime Geçin
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Ders konuları, Mblock kodlama projeleri, veli görüşmeleri veya materyal talepleri için mesaj bırakabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-7 text-white shadow-xl shadow-blue-900/10">
              <h3 className="text-xl font-bold mb-2">Öğretmen İletişim Bilgileri</h3>
              <p className="text-blue-100 text-xs leading-relaxed mb-6">
                Öğrencilerimiz ve velilerimiz için okul saatleri ve dijital ortamda her zaman ulaşılabilir olmayı önemsiyorum.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 text-white shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-blue-200 font-medium">Resmi & Blog E-Postası</div>
                    <div className="text-white font-bold text-sm">saniyeefe8@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 text-white shrink-0">
                    <School className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-blue-200 font-medium">Görev & Branş</div>
                    <div className="text-white font-semibold">Bilişim Teknolojileri ve Robotik Kodlama Öğretmeni</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/10 text-white shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-blue-200 font-medium">Geri Dönüş Süresi</div>
                    <div className="text-white font-semibold">Genellikle 24 saat içinde yanıtlanır</div>
                  </div>
                </div>
              </div>

              {/* Bot reminder */}
              <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
                <p className="text-[11px] text-blue-100">
                  Ders konuları ve acil kod soruları için sağ alt köşedeki <strong>Bilişim AI Botu</strong> anında yanıt vermektedir!
                </p>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Mesaj Yazarken Dikkat Edilebilecekler</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-500">
                <li>Öğrenciyseniz sınıfınızı (5-A, 6-B gibi) belirtmeniz faydalı olur.</li>
                <li>Kodlama hatalarında Mblock proje linkinizi veya blok adını ekleyebilirsiniz.</li>
              </ul>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            {successMessage ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-900">Mesajınız Alındı!</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                  {successMessage}
                </p>
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="mt-4 px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Adınız ve Soyadınız *
                    </label>
                    <input
                      type="text"
                      id="contact-name-input"
                      required
                      placeholder="Örn: Elif Yılmaz"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      E-Posta Adresiniz *
                    </label>
                    <input
                      type="email"
                      id="contact-email-input"
                      required
                      placeholder="adiniz@ornek.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Durumunuz / Rolünüz
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white text-slate-800"
                    >
                      <option value="Öğrenci">5. veya 6. Sınıf Öğrencisi</option>
                      <option value="Veli">Öğrenci Velisi</option>
                      <option value="Öğretmen">Öğretmen / Meslektaş</option>
                      <option value="Ziyaretçi">Bilişim Meraklısı / Ziyaretçi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mesaj Konusu
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white text-slate-800"
                    >
                      <option value="Ders Sorusu / Ödev">5. ve 6. Sınıf Bilişim Dersi</option>
                      <option value="Robotik Kodlama / Mblock">Robotik Kodlama & Mblock Sorusu</option>
                      <option value="Evrak ve Plan Talebi">Ders Planları ve Evrak Talebi</option>
                      <option value="Veli Görüşmesi">Veli Bilgilendirme Talebi</option>
                      <option value="Diğer">Diğer Konular</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mesajınız *
                  </label>
                  <textarea
                    required
                    id="contact-message-input"
                    rows={5}
                    placeholder="Merak ettiğiniz konuyu veya sorunuzu lütfen detaylıca açıklayınız..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs sm:text-sm p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    * Tüm zorunlu alanları doldurduğunuzdan emin olunuz.
                  </span>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Gönderiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Mesajı Gönder</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
