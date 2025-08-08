import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    voiceEnabled: boolean;
    notifications: boolean;
  };
  progress: {
    completedCourses: string[];
    currentCourse?: string;
    totalHours: number;
    certificates: string[];
  };
}

interface Course {
  id: string;
  title: string;
  progress: number;
  lastAccessed: Date;
  completed: boolean;
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // UI state
  theme: 'light' | 'dark' | 'auto';
  sidebarOpen: boolean;
  searchQuery: string;
  activeSection: string;
  
  // Course state
  courses: Course[];
  currentCourse: Course | null;
  courseProgress: Record<string, number>;
  
  // AI state
  aiEnabled: boolean;
  aiProvider: 'gemini' | 'openai' | 'mock';
  aiApiKey: string;
  
  // Voice state
  voiceEnabled: boolean;
  voiceLanguage: string;
  
  // Performance state
  loadingStates: Record<string, boolean>;
  errors: Record<string, string>;
  
  // Demo booking state
  isDemoBookingOpen: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  toggleSidebar: () => void;
  setSearchQuery: (query: string) => void;
  setActiveSection: (section: string) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  completeCourse: (courseId: string) => void;
  setAIConfig: (provider: 'gemini' | 'openai' | 'mock', apiKey?: string) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setVoiceLanguage: (language: string) => void;
  setLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: string) => void;
  clearError: (key: string) => void;
  openDemoBooking: () => void;
  closeDemoBooking: () => void;
  resetStore: () => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
  theme: 'auto' as const,
  sidebarOpen: false,
  searchQuery: '',
  activeSection: 'home',
  courses: [],
  currentCourse: null,
  courseProgress: {},
  aiEnabled: true,
  aiProvider: 'mock' as const,
  aiApiKey: '',
  voiceEnabled: true,
  voiceLanguage: 'en-US',
  loadingStates: {},
  errors: {},
  isDemoBookingOpen: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      updateUserPreferences: (preferences) => set((state) => ({
        user: state.user ? {
          ...state.user,
          preferences: { ...state.user.preferences, ...preferences }
        } : null
      })),

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSearchQuery: (searchQuery) => set({ searchQuery }),

      setActiveSection: (activeSection) => set({ activeSection }),

      updateCourseProgress: (courseId, progress) => set((state) => ({
        courseProgress: { ...state.courseProgress, [courseId]: progress },
        courses: state.courses.map(course => 
          course.id === courseId 
            ? { ...course, progress, lastAccessed: new Date() }
            : course
        )
      })),

      completeCourse: (courseId) => set((state) => ({
        courses: state.courses.map(course => 
          course.id === courseId 
            ? { ...course, completed: true, progress: 100 }
            : course
        ),
        courseProgress: { ...state.courseProgress, [courseId]: 100 }
      })),

      setAIConfig: (provider, apiKey = '') => set({ 
        aiProvider: provider, 
        aiApiKey: apiKey 
      }),

      setVoiceEnabled: (voiceEnabled) => set({ voiceEnabled }),

      setVoiceLanguage: (voiceLanguage) => set({ voiceLanguage }),

      setLoading: (key, loading) => set((state) => ({
        loadingStates: { ...state.loadingStates, [key]: loading }
      })),

      setError: (key, error) => set((state) => ({
        errors: { ...state.errors, [key]: error }
      })),

      clearError: (key) => set((state) => {
        const newErrors = { ...state.errors };
        delete newErrors[key];
        return { errors: newErrors };
      }),

      openDemoBooking: () => set({ isDemoBookingOpen: true }),
      closeDemoBooking: () => set({ isDemoBookingOpen: false }),

      resetStore: () => set(initialState),
    }),
    {
      name: 'daxgenai-store',
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        courses: state.courses,
        courseProgress: state.courseProgress,
        aiProvider: state.aiProvider,
        voiceEnabled: state.voiceEnabled,
        voiceLanguage: state.voiceLanguage,
      }),
    }
  )
);

// Selector hooks for better performance
export const useUser = () => useAppStore((state) => state.user);
export const useTheme = () => useAppStore((state) => state.theme);
export const useCourses = () => useAppStore((state) => state.courses);
export const useCourseProgress = () => useAppStore((state) => state.courseProgress);
export const useAIConfig = () => useAppStore((state) => ({ 
  provider: state.aiProvider, 
  apiKey: state.aiApiKey 
}));
export const useVoiceConfig = () => useAppStore((state) => ({ 
  enabled: state.voiceEnabled, 
  language: state.voiceLanguage 
}));
export const useLoading = (key: string) => useAppStore((state) => state.loadingStates[key]);
export const useError = (key: string) => useAppStore((state) => state.errors[key]); 