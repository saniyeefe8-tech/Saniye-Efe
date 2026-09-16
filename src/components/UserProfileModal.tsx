import React, { useState } from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Bookmark, 
  CheckCircle2, 
  LogOut, 
  Calendar, 
  Mail, 
  School,
  Edit2,
  BookOpen
} from 'lucide-react';
import { UserProfile, BlogPost } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  savedPosts: BlogPost[];
  onLogout: () => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onOpenPost: (post: BlogPost) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  savedPosts,
  onLogout,
  onUpdateUser,
  onOpenPost,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookmarks'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editGrade, setEditGrade] = useState(user.grade);
  const [editSchool, setEditSchool] = useState(user.school || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateUser({
      name: editName,
      grade: editGrade,
      school: editSchool,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/25 font-bold uppercase tracking-wider">
                  {user.provider}
                </span>
              </div>
              <p className="text-xs text-blue-100 flex items-center gap-1.5 mt-0.5">
                <span>{user.role}</span>
                <span>•</span>
                <span>{user.grade}</span>
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex bg-black/20 p-1 rounded-xl mt-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'profile' ? 'bg-white text-blue-700 shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              Profil Bilgileri
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'bookmarks' ? 'bg-white text-blue-700 shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Kaydedilen Yazılar ({savedPosts.length})</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ad Soyad</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Sınıf Seviyesi</label>
                    <select
                      value={editGrade}
                      onChange={(e) => setEditGrade(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="5. Sınıf">5. Sınıf</option>
                      <option value="6. Sınıf">6. Sınıf</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Okul Adı</label>
                    <input
                      type="text"
                      value={editSchool}
                      onChange={(e) => setEditSchool(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-xs font-semibold"
                    >
                      İptal
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold"
                    >
                      Kaydet
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      E-Posta
                    </span>
                    <span className="font-semibold text-slate-800">{user.email}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      Rol & Sınıf
                    </span>
                    <span className="font-semibold text-slate-800">{user.role} ({user.grade})</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-slate-400" />
                      Kayıtlı Okul
                    </span>
                    <span className="font-semibold text-slate-800">{user.school || 'MEB Ortaokulu'}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Kayıt Tarihi
                    </span>
                    <span className="font-semibold text-slate-800">{user.joinedDate}</span>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2.5 rounded-xl border border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Bilgileri Düzenle</span>
                  </button>
                </div>
              )}

              {/* Logout button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  id="user-logout-btn"
                  onClick={onLogout}
                  className="w-full py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Oturumu Kapat</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-[350px] overflow-y-auto">
              {savedPosts.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p>Henüz kaydedilmiş bir blog yazınız bulunmuyor.</p>
                </div>
              ) : (
                savedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {post.categoryLabel}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                        {post.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenPost(post);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold transition-colors shrink-0"
                    >
                      Oku
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
