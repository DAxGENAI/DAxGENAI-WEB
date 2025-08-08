import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  price: number;
  originalPrice?: number;
  imageUrl: string;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
  modules: CourseModule[];
  tags: string[];
  rating: number;
  totalStudents: number;
  totalLessons: number;
  certificate: boolean;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  isFeatured: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
  duration: number; // in minutes
  order: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'interactive';
  content: string;
  videoUrl?: string;
  duration: number; // in minutes
  order: number;
  isFree: boolean;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  currentLesson: string;
  progress: number; // 0-100
  timeSpent: number; // in minutes
  lastAccessed: Date;
  completedAt?: Date;
  certificateUrl?: string;
}

export interface CourseReview {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  userName: string;
  userAvatar?: string;
}

class CourseService {
  private coursesCollection = collection(db, 'courses');
  private progressCollection = collection(db, 'userProgress');
  private reviewsCollection = collection(db, 'courseReviews');

  // Get all courses with pagination
  async getCourses(
    limitCount: number = 10,
    lastDoc?: QueryDocumentSnapshot<DocumentData>,
    filters?: {
      category?: string;
      level?: string;
      priceRange?: { min: number; max: number };
      search?: string;
    }
  ): Promise<{ courses: Course[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> {
    try {
      let q = query(
        this.coursesCollection,
        where('isPublished', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );

      if (filters?.category) {
        q = query(q, where('category', '==', filters.category));
      }

      if (filters?.level) {
        q = query(q, where('level', '==', filters.level));
      }

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const courses: Course[] = [];

      snapshot.forEach((doc) => {
        const courseData = doc.data();
        courses.push({
          id: doc.id,
          ...courseData,
          createdAt: courseData.createdAt?.toDate(),
          updatedAt: courseData.updatedAt?.toDate(),
        } as Course);
      });

      // Apply additional filters
      let filteredCourses = courses;
      if (filters?.priceRange) {
        filteredCourses = filteredCourses.filter(
          course => course.price >= filters.priceRange!.min && course.price <= filters.priceRange!.max
        );
      }

      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredCourses = filteredCourses.filter(
          course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }

      return {
        courses: filteredCourses,
        lastDoc: snapshot.docs[snapshot.docs.length - 1] || null
      };
    } catch (error) {
      console.error('Error getting courses:', error);
      throw new Error('Failed to load courses');
    }
  }

  // Get featured courses
  async getFeaturedCourses(): Promise<Course[]> {
    try {
      const q = query(
        this.coursesCollection,
        where('isPublished', '==', true),
        where('isFeatured', '==', true),
        orderBy('rating', 'desc'),
        limit(6)
      );

      const snapshot = await getDocs(q);
      const courses: Course[] = [];

      snapshot.forEach((doc) => {
        const courseData = doc.data();
        courses.push({
          id: doc.id,
          ...courseData,
          createdAt: courseData.createdAt?.toDate(),
          updatedAt: courseData.updatedAt?.toDate(),
        } as Course);
      });

      return courses;
    } catch (error) {
      console.error('Error getting featured courses:', error);
      throw new Error('Failed to load featured courses');
    }
  }

  // Get course by ID
  async getCourseById(courseId: string): Promise<Course | null> {
    try {
      const docRef = doc(this.coursesCollection, courseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const courseData = docSnap.data();
        return {
          id: docSnap.id,
          ...courseData,
          createdAt: courseData.createdAt?.toDate(),
          updatedAt: courseData.updatedAt?.toDate(),
        } as Course;
      }

      return null;
    } catch (error) {
      console.error('Error getting course:', error);
      throw new Error('Failed to load course');
    }
  }

  // Get courses by category
  async getCoursesByCategory(category: string): Promise<Course[]> {
    try {
      const q = query(
        this.coursesCollection,
        where('isPublished', '==', true),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const courses: Course[] = [];

      snapshot.forEach((doc) => {
        const courseData = doc.data();
        courses.push({
          id: doc.id,
          ...courseData,
          createdAt: courseData.createdAt?.toDate(),
          updatedAt: courseData.updatedAt?.toDate(),
        } as Course);
      });

      return courses;
    } catch (error) {
      console.error('Error getting courses by category:', error);
      throw new Error('Failed to load courses');
    }
  }

  // Get user progress for a course
  async getUserProgress(userId: string, courseId: string): Promise<UserProgress | null> {
    try {
      const q = query(
        this.progressCollection,
        where('userId', '==', userId),
        where('courseId', '==', courseId)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const progressData = doc.data();
        return {
          id: doc.id,
          ...progressData,
          lastAccessed: progressData.lastAccessed?.toDate(),
          completedAt: progressData.completedAt?.toDate(),
        } as UserProgress;
      }

      return null;
    } catch (error) {
      console.error('Error getting user progress:', error);
      throw new Error('Failed to load progress');
    }
  }

  // Update user progress
  async updateUserProgress(progress: Partial<UserProgress> & { userId: string; courseId: string }): Promise<void> {
    try {
      const existingProgress = await this.getUserProgress(progress.userId, progress.courseId);
      
      if (existingProgress) {
        // Update existing progress
        const docRef = doc(this.progressCollection, existingProgress.id);
        await updateDoc(docRef, {
          ...progress,
          lastAccessed: new Date(),
        });
      } else {
        // Create new progress
        await addDoc(this.progressCollection, {
          ...progress,
          completedLessons: [],
          progress: 0,
          timeSpent: 0,
          lastAccessed: new Date(),
        });
      }
    } catch (error) {
      console.error('Error updating user progress:', error);
      throw new Error('Failed to update progress');
    }
  }

  // Mark lesson as completed
  async completeLesson(userId: string, courseId: string, lessonId: string): Promise<void> {
    try {
      const progress = await this.getUserProgress(userId, courseId);
      if (!progress) {
        throw new Error('Progress not found');
      }

      const updatedCompletedLessons = [...progress.completedLessons];
      if (!updatedCompletedLessons.includes(lessonId)) {
        updatedCompletedLessons.push(lessonId);
      }

      // Calculate new progress
      const course = await this.getCourseById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }

      const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
      const newProgress = Math.round((updatedCompletedLessons.length / totalLessons) * 100);

      await this.updateUserProgress({
        userId,
        courseId,
        completedLessons: updatedCompletedLessons,
        progress: newProgress,
        completedAt: newProgress === 100 ? new Date() : undefined,
      });
    } catch (error) {
      console.error('Error completing lesson:', error);
      throw new Error('Failed to complete lesson');
    }
  }

  // Get course reviews
  async getCourseReviews(courseId: string): Promise<CourseReview[]> {
    try {
      const q = query(
        this.reviewsCollection,
        where('courseId', '==', courseId),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const reviews: CourseReview[] = [];

      snapshot.forEach((doc) => {
        const reviewData = doc.data();
        reviews.push({
          id: doc.id,
          ...reviewData,
          createdAt: reviewData.createdAt?.toDate(),
        } as CourseReview);
      });

      return reviews;
    } catch (error) {
      console.error('Error getting course reviews:', error);
      throw new Error('Failed to load reviews');
    }
  }

  // Add course review
  async addCourseReview(review: Omit<CourseReview, 'id' | 'createdAt'>): Promise<void> {
    try {
      await addDoc(this.reviewsCollection, {
        ...review,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error adding review:', error);
      throw new Error('Failed to add review');
    }
  }

  // Get user's enrolled courses
  async getUserEnrolledCourses(userId: string): Promise<Course[]> {
    try {
      const q = query(
        this.progressCollection,
        where('userId', '==', userId)
      );

      const snapshot = await getDocs(q);
      const courseIds = snapshot.docs.map(doc => doc.data().courseId);
      
      const courses: Course[] = [];
      for (const courseId of courseIds) {
        const course = await this.getCourseById(courseId);
        if (course) {
          courses.push(course);
        }
      }

      return courses;
    } catch (error) {
      console.error('Error getting enrolled courses:', error);
      throw new Error('Failed to load enrolled courses');
    }
  }

  // Search courses
  async searchCourses(searchTerm: string): Promise<Course[]> {
    try {
      const allCourses = await this.getCourses(100);
      const searchLower = searchTerm.toLowerCase();
      
      return allCourses.courses.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        course.instructor.name.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Error searching courses:', error);
      throw new Error('Failed to search courses');
    }
  }

  // Get course categories
  async getCourseCategories(): Promise<string[]> {
    try {
      const courses = await this.getCourses(1000);
      const categories = new Set(courses.courses.map(course => course.category));
      return Array.from(categories).sort();
    } catch (error) {
      console.error('Error getting categories:', error);
      throw new Error('Failed to load categories');
    }
  }
}

export const courseService = new CourseService();
export default courseService;
