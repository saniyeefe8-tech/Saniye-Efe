export type NavCategoryKey =
  | 'anasayfa'
  | '5-sinif-bilisim'
  | '6-sinif-bilisim'
  | '5-sinif-robotik'
  | 'evraklar'
  | 'oyunlar';

export interface CategoryInfo {
  key: NavCategoryKey;
  label: string;
  shortLabel: string;
  description: string;
  iconName: string;
  badge?: string;
  gradeLevel?: '5. Sınıf' | '6. Sınıf' | 'Genel';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: NavCategoryKey;
  categoryLabel: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  featured?: boolean;
  coverGradient: string;
}

export interface CommentItem {
  id: string;
  postId: string;
  authorName: string;
  authorRole: string;
  text: string;
  createdAt: string;
}

export type UserRole = 'Öğrenci' | 'Veli' | 'Öğretmen' | 'Ziyaretçi';
export type GradeLevel = '5. Sınıf' | '6. Sınıf' | 'Diğer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  grade: GradeLevel;
  school?: string;
  provider: 'email' | 'google' | 'github' | 'eba';
  savedPostIds: string[];
  completedTasks: string[];
  joinedDate: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface AiRecommendationItem {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  badge: string;
  completed?: boolean;
}

export interface AiRecommendationResult {
  title: string;
  summary: string;
  recommendations: AiRecommendationItem[];
  weeklyChallenge: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  role: string;
  subject: string;
  message: string;
}

export interface WeeklyCurriculumItem {
  id: string;
  term: 1 | 2;
  week: string;
  weekNumber: number;
  title: string;
  description?: string;
  pdfUrl?: string | null;
  hasPdf: boolean;
}
