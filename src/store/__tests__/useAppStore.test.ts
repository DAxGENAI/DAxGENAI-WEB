import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.getState().resetStore();
  });

  describe('Initial State', () => {
    it('has correct initial state', () => {
      const state = useAppStore.getState();

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.theme).toBe('auto');
      expect(state.sidebarOpen).toBe(false);
      expect(state.searchQuery).toBe('');
      expect(state.activeSection).toBe('home');
      expect(state.courses).toEqual([]);
      expect(state.currentCourse).toBeNull();
      expect(state.courseProgress).toEqual({});
      expect(state.aiEnabled).toBe(true);
      expect(state.aiProvider).toBe('mock');
      expect(state.aiApiKey).toBe('');
      expect(state.voiceEnabled).toBe(true);
      expect(state.voiceLanguage).toBe('en-US');
      expect(state.loadingStates).toEqual({});
      expect(state.errors).toEqual({});
      expect(state.isDemoBookingOpen).toBe(false);
    });
  });

  describe('User Management', () => {
    it('sets user and updates authentication status', () => {
      const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        preferences: {
          theme: 'dark' as const,
          voiceEnabled: true,
          notifications: true,
        },
        progress: {
          completedCourses: [],
          totalHours: 0,
          certificates: [],
        },
      };

      useAppStore.getState().setUser(mockUser);

      const state = useAppStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('clears user and updates authentication status', () => {
      const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        preferences: {
          theme: 'dark' as const,
          voiceEnabled: true,
          notifications: true,
        },
        progress: {
          completedCourses: [],
          totalHours: 0,
          certificates: [],
        },
      };

      useAppStore.getState().setUser(mockUser);
      useAppStore.getState().setUser(null);

      const state = useAppStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it('updates user preferences', () => {
      const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        preferences: {
          theme: 'light' as const,
          voiceEnabled: false,
          notifications: false,
        },
        progress: {
          completedCourses: [],
          totalHours: 0,
          certificates: [],
        },
      };

      useAppStore.getState().setUser(mockUser);
      useAppStore.getState().updateUserPreferences({
        theme: 'dark',
        voiceEnabled: true,
      });

      const state = useAppStore.getState();
      expect(state.user?.preferences).toEqual({
        theme: 'dark',
        voiceEnabled: true,
        notifications: false,
      });
    });
  });

  describe('UI State Management', () => {
    it('sets theme', () => {
      useAppStore.getState().setTheme('dark');
      expect(useAppStore.getState().theme).toBe('dark');
    });

    it('toggles sidebar', () => {
      expect(useAppStore.getState().sidebarOpen).toBe(false);
      
      useAppStore.getState().toggleSidebar();
      expect(useAppStore.getState().sidebarOpen).toBe(true);
      
      useAppStore.getState().toggleSidebar();
      expect(useAppStore.getState().sidebarOpen).toBe(false);
    });

    it('sets search query', () => {
      useAppStore.getState().setSearchQuery('test query');
      expect(useAppStore.getState().searchQuery).toBe('test query');
    });

    it('sets active section', () => {
      useAppStore.getState().setActiveSection('courses');
      expect(useAppStore.getState().activeSection).toBe('courses');
    });
  });

  describe('Course Management', () => {
    const mockCourses = [
      {
        id: 'course1',
        title: 'Course 1',
        progress: 0,
        lastAccessed: new Date('2024-01-01'),
        completed: false,
      },
      {
        id: 'course2',
        title: 'Course 2',
        progress: 50,
        lastAccessed: new Date('2024-01-02'),
        completed: false,
      },
    ];

    beforeEach(() => {
      // Set initial courses
      useAppStore.setState({ courses: [...mockCourses] });
    });

    it('updates course progress', () => {
      const beforeUpdate = new Date();
      useAppStore.getState().updateCourseProgress('course1', 75);

      const state = useAppStore.getState();
      expect(state.courseProgress['course1']).toBe(75);
      
      const updatedCourse = state.courses.find(c => c.id === 'course1');
      expect(updatedCourse?.progress).toBe(75);
      expect(updatedCourse?.lastAccessed.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
    });

    it('completes course', () => {
      useAppStore.getState().completeCourse('course1');

      const state = useAppStore.getState();
      expect(state.courseProgress['course1']).toBe(100);
      
      const completedCourse = state.courses.find(c => c.id === 'course1');
      expect(completedCourse?.completed).toBe(true);
      expect(completedCourse?.progress).toBe(100);
    });
  });

  describe('AI Configuration', () => {
    it('sets AI configuration', () => {
      useAppStore.getState().setAIConfig('gemini', 'test-api-key');

      const state = useAppStore.getState();
      expect(state.aiProvider).toBe('gemini');
      expect(state.aiApiKey).toBe('test-api-key');
    });

    it('sets AI configuration without API key', () => {
      useAppStore.getState().setAIConfig('openai');

      const state = useAppStore.getState();
      expect(state.aiProvider).toBe('openai');
      expect(state.aiApiKey).toBe('');
    });
  });

  describe('Voice Configuration', () => {
    it('sets voice enabled status', () => {
      useAppStore.getState().setVoiceEnabled(false);
      expect(useAppStore.getState().voiceEnabled).toBe(false);
    });

    it('sets voice language', () => {
      useAppStore.getState().setVoiceLanguage('es-ES');
      expect(useAppStore.getState().voiceLanguage).toBe('es-ES');
    });
  });

  describe('Loading and Error Management', () => {
    it('sets loading state', () => {
      useAppStore.getState().setLoading('testKey', true);
      expect(useAppStore.getState().loadingStates['testKey']).toBe(true);

      useAppStore.getState().setLoading('testKey', false);
      expect(useAppStore.getState().loadingStates['testKey']).toBe(false);
    });

    it('sets and clears errors', () => {
      useAppStore.getState().setError('testError', 'Something went wrong');
      expect(useAppStore.getState().errors['testError']).toBe('Something went wrong');

      useAppStore.getState().clearError('testError');
      expect(useAppStore.getState().errors['testError']).toBeUndefined();
    });
  });

  describe('Demo Booking Management', () => {
    it('opens demo booking', () => {
      useAppStore.getState().openDemoBooking();
      expect(useAppStore.getState().isDemoBookingOpen).toBe(true);
    });

    it('closes demo booking', () => {
      useAppStore.getState().openDemoBooking();
      useAppStore.getState().closeDemoBooking();
      expect(useAppStore.getState().isDemoBookingOpen).toBe(false);
    });
  });

  describe('Store Reset', () => {
    it('resets store to initial state', () => {
      // Modify some state
      useAppStore.getState().setTheme('dark');
      useAppStore.getState().setSearchQuery('test');
      useAppStore.getState().openDemoBooking();

      // Reset
      useAppStore.getState().resetStore();

      // Check if state is back to initial values
      const state = useAppStore.getState();
      expect(state.theme).toBe('auto');
      expect(state.searchQuery).toBe('');
      expect(state.isDemoBookingOpen).toBe(false);
    });
  });
});
