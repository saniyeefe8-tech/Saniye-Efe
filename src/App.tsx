import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryView } from './components/CategoryView';
import { BlogSection } from './components/BlogSection';
import { AiRecommendationsPanel } from './components/AiRecommendationsPanel';
import { ContactSection } from './components/ContactSection';
import { ChatbotWidget } from './components/ChatbotWidget';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { Footer } from './components/Footer';
import { NavCategoryKey, BlogPost, UserProfile } from './types';
import { CATEGORIES_CONFIG, INITIAL_POSTS, INITIAL_USER } from './data/initialData';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<NavCategoryKey>('anasayfa');
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USER);

  // Modals and Widget states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatExternalPrompt, setChatExternalPrompt] = useState<string | null>(null);

  // Category selection handler
  const handleSelectCategory = (cat: NavCategoryKey) => {
    setCurrentCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger chatbot with pre-filled question
  const handleAskAi = (promptText: string) => {
    setChatExternalPrompt(promptText);
    setIsChatOpen(true);
  };

  // Scroll to sections
  const handleScrollToRecommendations = () => {
    if (currentCategory !== 'anasayfa') {
      setCurrentCategory('anasayfa');
      setTimeout(() => {
        const el = document.getElementById('ai-recommendations-panel');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('ai-recommendations-panel');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToBlog = () => {
    if (currentCategory !== 'anasayfa') {
      setCurrentCategory('anasayfa');
      setTimeout(() => {
        const el = document.getElementById('blog-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('blog-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Bookmark for articles
  const handleToggleBookmark = (postId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const exists = currentUser.savedPostIds.includes(postId);
    const updatedIds = exists
      ? currentUser.savedPostIds.filter((id) => id !== postId)
      : [...currentUser.savedPostIds, postId];

    setCurrentUser({
      ...currentUser,
      savedPostIds: updatedIds,
    });
  };

  // Add new post from write modal
  const handleAddPost = (newPostData: Omit<BlogPost, 'id' | 'likes' | 'commentsCount' | 'slug'>) => {
    const newPost: BlogPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      slug: newPostData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      likes: 1,
      commentsCount: 0,
    };
    setPosts([newPost, ...posts]);
  };

  // User auth actions
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsProfileModalOpen(false);
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updated });
    }
  };

  // Find active category config object
  const currentCategoryInfo = CATEGORIES_CONFIG.find((c) => c.key === currentCategory) || CATEGORIES_CONFIG[0];

  const savedPostsList = posts.filter((p) => currentUser?.savedPostIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation */}
      <Navbar
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onScrollToRecommendations={handleScrollToRecommendations}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentCategory === 'anasayfa' ? (
          <>
            {/* Hero & Teacher Welcome Banner */}
            <HeroSection
              onSelectCategory={handleSelectCategory}
              onOpenChat={() => setIsChatOpen(true)}
              onScrollToBlog={handleScrollToBlog}
              onScrollToRecommendations={handleScrollToRecommendations}
            />

            {/* AI Personalized Content Recommendations Panel */}
            <AiRecommendationsPanel
              onAskAi={handleAskAi}
              defaultGrade={currentUser?.grade || '5. Sınıf'}
            />

            {/* Şık Yazı Alanı & Blog Section */}
            <BlogSection
              posts={posts}
              currentUser={currentUser}
              onToggleBookmark={handleToggleBookmark}
              onAddPost={handleAddPost}
              onOpenChatWithTopic={handleAskAi}
            />

            {/* Contact Form Section */}
            <ContactSection />
          </>
        ) : (
          /* Specific Category Page (5. sınıf bilişim, 6. sınıf bilişim, 5. sınıf robotik, evraklar, oyunlar) */
          <>
            <CategoryView
              category={currentCategoryInfo}
              onBackToHome={() => handleSelectCategory('anasayfa')}
              onAskAi={handleAskAi}
            />

            {/* Also include the AI recommendations and contact on category pages for rich access */}
            <AiRecommendationsPanel
              onAskAi={handleAskAi}
              defaultGrade={currentCategoryInfo.gradeLevel === '6. Sınıf' ? '6. Sınıf' : '5. Sınıf'}
            />

            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onScrollToTop={handleScrollToTop}
        onScrollToRecommendations={handleScrollToRecommendations}
      />

      {/* Floating Bottom-Right Chatbot Widget */}
      <ChatbotWidget
        isOpen={isChatOpen}
        onToggleOpen={() => setIsChatOpen(!isChatOpen)}
        externalPrompt={chatExternalPrompt}
        onClearExternalPrompt={() => setChatExternalPrompt(null)}
      />

      {/* Member Login & Social Media Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* User Profile Modal */}
      {currentUser && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={currentUser}
          savedPosts={savedPostsList}
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
          onOpenPost={() => {
            setIsProfileModalOpen(false);
            handleScrollToBlog();
          }}
        />
      )}
    </div>
  );
}
