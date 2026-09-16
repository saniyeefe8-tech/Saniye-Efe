import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User as UserIcon, 
  GraduationCap, 
  CheckCircle2,
  Sparkles,
  School
} from 'lucide-react';
import { UserProfile, UserRole, GradeLevel } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('Öğrenci');
  const [grade, setGrade] = useState<GradeLevel>('5. Sınıf');
  const [school, setSchool] = useState('Atatürk Ortaokulu');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const user: UserProfile = {
        id: `user-${Date.now()}`,
        name: activeTab === 'register' ? (name || 'Öğrenci') : (email.split('@')[0] || 'Giriş Yapan Üye'),
        email: email || 'ogrenci@meb.k12.tr',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role,
        grade,
        school: school || 'Ortaokul',
        provider: 'email',
        savedPostIds: ['post-1', 'post-2'],
        completedTasks: [],
        joinedDate: 'Mart 2026',
      };

      onLoginSuccess(user);
      setLoading(false);
      onClose();
    }, 400);
  };

  const handleSocialLogin = (provider: 'google' | 'github' | 'eba') => {
    setLoading(true);
    setTimeout(() => {
      let mockName = 'Google Kullanıcısı';
      let mockEmail = 'kullanici@gmail.com';
      let mockAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

      if (provider === 'github') {
        mockName = 'GitHub Geliştiricisi';
        mockEmail = 'kodcu@github.com';
        mockAvatar = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80';
      } else if (provider === 'eba') {
        mockName = 'EBA Öğrenci Hesabı';
        mockEmail = 'ogrenci@eba.gov.tr';
        mockAvatar = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80';
      }

      const user: UserProfile = {
        id: `user-${provider}-${Date.now()}`,
        name: mockName,
        email: mockEmail,
        avatar: mockAvatar,
        role: provider === 'eba' ? 'Öğrenci' : 'Ziyaretçi',
        grade: '5. Sınıf',
        school: 'MEB Bilişim Sınıfı',
        provider,
        savedPostIds: ['post-1'],
        completedTasks: ['task-1'],
        joinedDate: 'Mart 2026',
      };

      onLoginSuccess(user);
      setLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        
        {/* Top Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white relative">
          <button
            id="auth-modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-xl bg-white/15">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Saniye Öztürk Bilişim Dünyası</h3>
              <p className="text-xs text-blue-100">Ders içerikleri ve kişiselleştirilmiş öğrenme</p>
            </div>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-black/20 p-1 rounded-xl mt-4">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'login' ? 'bg-white text-blue-700 shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'register' ? 'bg-white text-blue-700 shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              Üye Ol
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Social Media Login Options (Per User Request) */}
          <div className="space-y-2">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
              Sosyal Medya ve Eğitim Portalları ile Giriş
            </span>

            <div className="grid grid-cols-1 gap-2 pt-1">
              {/* Google Button */}
              <button
                type="button"
                id="social-login-google-btn"
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google ile Giriş Yap</span>
              </button>

              {/* MEB EBA Button (Highly relevant and authentic for Turkish IT education!) */}
              <button
                type="button"
                id="social-login-eba-btn"
                onClick={() => handleSocialLogin('eba')}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100/80 border border-red-200 text-red-800 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center font-extrabold text-[10px]">
                  EBA
                </div>
                <span>MEB EBA ile Hızlı Giriş</span>
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                id="social-login-github-btn"
                onClick={() => handleSocialLogin('github')}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub ile Giriş Yap</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase">
              Veya E-Posta ile
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Adınız ve Soyadınız *
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Örn: Eren Kaya"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                E-Posta Adresi *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="ogrenci@meb.k12.tr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Şifre *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            {activeTab === 'register' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Rolünüz
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Öğrenci">Öğrenci</option>
                    <option value="Veli">Veli</option>
                    <option value="Öğretmen">Öğretmen</option>
                    <option value="Ziyaretçi">Ziyaretçi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sınıf
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value as GradeLevel)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="5. Sınıf">5. Sınıf</option>
                    <option value="6. Sınıf">6. Sınıf</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              id="auth-submit-btn"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {activeTab === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{activeTab === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
