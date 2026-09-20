import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Clock, 
  Calendar, 
  Tag, 
  PenTool, 
  X, 
  Check, 
  ArrowRight,
  Sparkles,
  Send,
  User as UserIcon
} from 'lucide-react';
import { BlogPost, CommentItem, UserProfile } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  currentUser: UserProfile | null;
  onToggleBookmark: (postId: string) => void;
  onAddPost: (newPost: Omit<BlogPost, 'id' | 'likes' | 'commentsCount' | 'slug'>) => void;
  onOpenChatWithTopic: (topic: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  currentUser,
  onToggleBookmark,
  onAddPost,
  onOpenChatWithTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New post modal state
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'5-sinif-bilisim' | '6-sinif-bilisim' | '5-sinif-robotik' | 'evraklar' | 'oyunlar'>('5-sinif-robotik');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');

  // Comment section state inside reader
  const [comments, setComments] = useState<Record<string, CommentItem[]>>({
    'post-1': [
      { id: 'c-1', postId: 'post-1', authorName: 'Ahmet Y.', authorRole: '6. Sınıf Öğrencisi', text: 'Öğretmenim algoritma basamaklarını kek yapma örneğiyle anlatmanız çok aklımda kaldı, teşekkürler!', createdAt: '13 Mart 2026' },
      { id: 'c-2', postId: 'post-1', authorName: 'Merve Hanım', authorRole: 'Veli', text: 'Kızımın problem çözme ödevine çok yardımcı oldu. Harika bir yazı.', createdAt: '14 Mart 2026' },
    ],
    'post-2': [
      { id: 'c-3', postId: 'post-2', authorName: 'Eren K.', authorRole: '5. Sınıf Öğrencisi', text: 'Mblock ile elma toplama oyunu yaptım, değişkenlerle puan eklemeyi de başardım!', createdAt: '06 Mart 2026' },
    ],
  });
  const [newCommentText, setNewCommentText] = useState('');

  // All available tags
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleLike = (postId: string) => {
    const isLiked = likedPosts[postId];
    const currentPost = posts.find((p) => p.id === postId);
    const baseCount = currentPost?.likes || 0;
    const currentCount = likesCount[postId] !== undefined ? likesCount[postId] : baseCount;

    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    setLikesCount((prev) => ({
      ...prev,
      [postId]: isLiked ? currentCount - 1 : currentCount + 1,
    }));
  };

  const handleShare = (postId: string) => {
    setCopiedId(postId);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;
    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      postId,
      authorName: currentUser?.name || 'Ziyaretçi Öğrenci',
      authorRole: currentUser?.role || 'Öğrenci',
      text: newCommentText.trim(),
      createdAt: 'Az önce',
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [newComment, ...(prev[postId] || [])],
    }));
    setNewCommentText('');
  };

  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const categoryLabels: Record<string, string> = {
      '5-sinif-bilisim': '5. Sınıf Bilişim',
      '6-sinif-bilisim': '6. Sınıf Bilişim',
      '5-sinif-robotik': '5. Sınıf Robotik Kodlama',
      'evraklar': 'Evraklar',
      'oyunlar': 'Oyunlar',
    };

    onAddPost({
      title: newTitle.trim(),
      summary: newSummary.trim() || newContent.slice(0, 140) + '...',
      content: newContent.trim(),
      category: newCategory,
      categoryLabel: categoryLabels[newCategory] || 'Bilişim',
      author: {
        name: currentUser?.name || 'Saniye ÖZTÜRK',
        title: currentUser?.role === 'Öğretmen' ? 'Bilişim Teknolojileri Öğretmeni' : 'Bilişim Yazarı',
        avatar: currentUser?.avatar || '/assets/teacher_avatar.jpg',
      },
      publishedAt: 'Şimdi',
      readTime: '3 dk okuma',
      tags: tagsArray.length > 0 ? tagsArray : ['Bilişim', 'Kodlama'],
      featured: false,
      coverGradient: 'from-blue-600 to-indigo-700',
    });

    setIsWriteModalOpen(false);
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setNewTags('');
  };

  return (
    <section id="blog-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Saniye Öğretmen'in Köşesi</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Bilişim & Kodlama Blog Yazıları
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
              Ders üniteleri, kodlama ipuçları, teknoloji dünyasından gelişmeler ve ortaokul öğrencileri için rehber yazılar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="open-write-article-modal-btn"
              onClick={() => setIsWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              <span>Şık Yazı Alanı / Yeni Yazı Ekle</span>
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="blog-search-input"
              placeholder="Yazı veya etiket ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedTag === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              Tümü ({posts.length})
            </button>
            {allTags.slice(0, 6).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-12 text-center">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700 mb-1">Aramanızla Eşleşen Yazı Bulunamadı</h3>
            <p className="text-xs text-slate-500 mb-4">Lütfen farklı bir arama terimi veya etiket deneyiniz.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const isLiked = likedPosts[post.id];
              const likes = likesCount[post.id] !== undefined ? likesCount[post.id] : post.likes;
              const isSaved = currentUser?.savedPostIds.includes(post.id);
              const postComments = comments[post.id] || [];

              return (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col overflow-hidden group"
                >
                  {/* Top Gradient Banner */}
                  <div className={`h-24 bg-gradient-to-r ${post.coverGradient} p-4 flex items-between justify-between relative`}>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-white/25 text-white backdrop-blur-xs">
                      {post.categoryLabel}
                    </span>
                    <button
                      onClick={() => onToggleBookmark(post.id)}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                      title="Kaydet"
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-300 fill-amber-300" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 
                      onClick={() => setReadingPost(post)}
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 mb-2 leading-snug"
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed flex-1">
                      {post.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          onClick={() => setSelectedTag(tag)}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer / Author & Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          {post.author.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer ${
                            isLiked ? 'text-rose-600' : 'text-slate-500 hover:text-rose-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600' : ''}`} />
                          <span>{likes}</span>
                        </button>

                        <button
                          onClick={() => setReadingPost(post)}
                          className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{postComments.length || post.commentsCount}</span>
                        </button>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <button
                      id={`read-post-btn-${post.id}`}
                      onClick={() => setReadingPost(post)}
                      className="mt-4 w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Yazıyı Tam Oku</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* FULL ARTICLE READER MODAL */}
      {readingPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-r ${readingPost.coverGradient} text-white flex items-center justify-between shrink-0`}>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/25">
                  {readingPost.categoryLabel}
                </span>
                <span className="text-xs text-white/80">{readingPost.readTime}</span>
              </div>
              <button
                onClick={() => setReadingPost(null)}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                  {readingPost.title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={readingPost.author.avatar}
                      alt={readingPost.author.name}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                    <div>
                      <div className="font-bold text-slate-800">{readingPost.author.name}</div>
                      <div className="text-[11px] text-blue-600">{readingPost.author.title}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(readingPost.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 font-semibold cursor-pointer hover:bg-rose-100 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${likedPosts[readingPost.id] ? 'fill-rose-600' : ''}`} />
                      <span>{likesCount[readingPost.id] !== undefined ? likesCount[readingPost.id] : readingPost.likes} Beğeni</span>
                    </button>
                    <button
                      onClick={() => handleShare(readingPost.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold cursor-pointer hover:bg-slate-200 transition-colors"
                    >
                      {copiedId === readingPost.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                      <span>{copiedId === readingPost.id ? 'Kopyalandı!' : 'Paylaş'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Article Body */}
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line">
                {readingPost.content}
              </div>

              {/* Ask AI about this post */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-600 text-white">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-900">Bu Yazıyla İlgili Sorun mu Var?</div>
                    <div className="text-[11px] text-blue-700">Yapay zeka asistanımız konuyu sana adım adım anlatsın.</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const title = readingPost.title;
                    setReadingPost(null);
                    onOpenChatWithTopic(`"${title}" yazısı hakkında bana daha detaylı örnekler ve özet sunar mısın?`);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  Asistana Sor
                </button>
              </div>

              {/* Comments Section */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>Yorumlar ve Öğrenci Notları ({comments[readingPost.id]?.length || 0})</span>
                </h4>

                {/* Add Comment Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Bu yazıya yorum veya soru ekleyin..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(readingPost.id);
                    }}
                    className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-800"
                  />
                  <button
                    onClick={() => handleAddComment(readingPost.id)}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gönder</span>
                  </button>
                </div>

                {/* Comments List */}
                <div className="space-y-3">
                  {(comments[readingPost.id] || []).map((comm) => (
                    <div key={comm.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{comm.authorName}</span>
                        <span className="text-[10px] text-slate-400">{comm.createdAt}</span>
                      </div>
                      <div className="text-[11px] text-blue-600 font-medium">{comm.authorRole}</div>
                      <p className="text-slate-600 pt-1 leading-relaxed">{comm.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW ARTICLE / WRITE AREA MODAL */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600 text-white">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Şık Yazı Alanı: Yeni Blog Yazısı Paylaş</h3>
                  <p className="text-xs text-slate-500">Bilişim ve robotik kategorilerinde yeni ders notu veya makale ekleyin.</p>
                </div>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePostSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Yazı Başlığı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 5. Sınıf İçin Mblock Değişkenler Eğitimi"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  >
                    <option value="5-sinif-bilisim">5. Sınıf Bilişim Teknolojileri</option>
                    <option value="6-sinif-bilisim">6. Sınıf Bilişim Teknolojileri</option>
                    <option value="5-sinif-robotik">5. Sınıf Robotik Kodlama</option>
                    <option value="evraklar">Evraklar</option>
                    <option value="oyunlar">Oyunlar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Etiketler (Virgülle ayırın)
                  </label>
                  <input
                    type="text"
                    placeholder="Mblock, Döngüler, Kodlama"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kısa Özet
                </label>
                <input
                  type="text"
                  placeholder="Yazının ana fikrini belirten 1-2 cümle..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Yazı İçeriği *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Detaylı ders notunuzu, açıklamaları ve öğrencilere yönergeleri buraya yazın..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full text-xs sm:text-sm p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
                >
                  Yazıyı Yayınla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
