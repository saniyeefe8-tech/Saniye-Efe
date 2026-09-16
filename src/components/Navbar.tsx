import React, { useState } from 'react';
import { 
  Monitor, 
  Cpu, 
  Bot, 
  FolderArchive, 
  Gamepad2, 
  Home, 
  Menu, 
  X, 
  User as UserIcon, 
  Sparkles, 
  LogIn,
  GraduationCap
} from 'lucide-react';
import { NavCategoryKey, UserProfile } from '../types';

interface NavbarProps {
  currentCategory: NavCategoryKey;
  onSelectCategory: (cat: NavCategoryKey) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenProfileModal: () => void;
  onScrollToRecommendations: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal,
  onScrollToRecommendations,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'anasayfa' as NavCategoryKey, label: 'Anasayfa', icon: Home },
    { key: '5-sinif-bilisim' as NavCategoryKey, label: '5. Sınıf Bilişim', icon: Monitor },
    { key: '6-sinif-bilisim' as NavCategoryKey, label: '6. Sınıf Bilişim', icon: Cpu },
    { key: '5-sinif-robotik' as NavCategoryKey, label: '5. Sınıf Robotik Kodlama', icon: Bot },
    { key: 'evraklar' as NavCategoryKey, label: 'Evraklar', icon: FolderArchive },
    { key: 'oyunlar' as NavCategoryKey, label: 'Oyunlar', icon: Gamepad2 },
  ];

  const handleNavClick = (key: NavCategoryKey) => {
    onSelectCategory(key);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/20">
              MEB Müfredatı Destekli
            </span>
            <span className="hidden sm:inline text-blue-100">
              Bilişim Teknolojileri ve Robotik Kodlama Ders Notları & Dijital İçerikler
            </span>
          </div>
          <button
            id="nav-ai-recommendations-btn"
            onClick={onScrollToRecommendations}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-200 hover:text-white transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Yapay Zeka İçerik Önerisi</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Teacher Name */}
          <div 
            onClick={() => handleNavClick('anasayfa')}
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo-btn"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Saniye ÖZTÜRK
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                Bilişim Teknolojileri & Robotik Kodlama
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Ana Menü">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentCategory === item.key;
              return (
                <button
                  key={item.key}
                  id={`nav-link-${item.key}`}
                  onClick={() => handleNavClick(item.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-xs border border-blue-200/70'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: User Login / Profile */}
          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <button
                id="user-profile-toggle-btn"
                onClick={onOpenProfileModal}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-900 transition-all cursor-pointer shadow-2xs"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-blue-300"
                />
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold leading-tight">{currentUser.name}</div>
                  <div className="text-[10px] text-blue-600 font-medium">{currentUser.role}</div>
                </div>
              </button>
            ) : (
              <button
                id="auth-open-login-btn"
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Üye Girişi</span>
                <span className="sm:hidden">Giriş</span>
              </button>
            )}

            {/* Mobile menu toggle button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Menüyü Aç/Kapat"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-2">
            Kategoriler & Menü
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentCategory === item.key;
            return (
              <button
                key={item.key}
                id={`mobile-nav-${item.key}`}
                onClick={() => handleNavClick(item.key)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.key === '5-sinif-robotik' && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                    Popüler
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              id="mobile-ai-recommendations-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToRecommendations();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold hover:bg-amber-100 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              Yapay Zeka İçerik Önerilerini Gör
            </button>
            {!currentUser && (
              <button
                id="mobile-auth-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                Üye Girişi / Kayıt Ol
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
