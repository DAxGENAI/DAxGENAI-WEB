import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateEmail,
  updatePassword
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
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
  createdAt: Date;
  lastLogin: Date;
}

class AuthService {
  private googleProvider: GoogleAuthProvider;

  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.googleProvider.addScope('email');
    this.googleProvider.addScope('profile');
  }

  // Register new user
  async register(email: string, password: string, name: string): Promise<UserProfile> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: name });

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        id: user.uid,
        name,
        email,
        photoURL: user.photoURL || undefined,
        preferences: {
          theme: 'auto',
          voiceEnabled: true,
          notifications: true,
        },
        progress: {
          completedCourses: [],
          totalHours: 0,
          certificates: [],
        },
        createdAt: new Date(),
        lastLogin: new Date(),
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);
      return userProfile;
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with email/password
  async signIn(email: string, password: string): Promise<UserProfile> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update last login
      await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: new Date(),
      });

      // Get user profile
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      } else {
        throw new Error('User profile not found');
      }
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<UserProfile> {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      const user = result.user;

      // Check if user profile exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create new user profile
        const userProfile: UserProfile = {
          id: user.uid,
          name: user.displayName || 'User',
          email: user.email || '',
          photoURL: user.photoURL || undefined,
          preferences: {
            theme: 'auto',
            voiceEnabled: true,
            notifications: true,
          },
          progress: {
            completedCourses: [],
            totalHours: 0,
            certificates: [],
          },
          createdAt: new Date(),
          lastLogin: new Date(),
        };

        await setDoc(doc(db, 'users', user.uid), userProfile);
        return userProfile;
      } else {
        // Update last login for existing user
        await updateDoc(doc(db, 'users', user.uid), {
          lastLogin: new Date(),
        });
        return userDoc.data() as UserProfile;
      }
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error('Failed to sign out');
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(this.getErrorMessage(error.code));
    }
  }

  // Update user profile
  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), updates);
    } catch (error: any) {
      throw new Error('Failed to update profile');
    }
  }

  // Update user preferences
  async updatePreferences(userId: string, preferences: Partial<UserProfile['preferences']>): Promise<void> {
    try {
      await updateDoc(doc(db, 'users', userId), {
        preferences: preferences,
      });
    } catch (error: any) {
      throw new Error('Failed to update preferences');
    }
  }

  // Update course progress
  async updateCourseProgress(userId: string, courseId: string, progress: number): Promise<void> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfile;
        const updatedProgress = { ...userData.progress };
        
        if (progress === 100 && !updatedProgress.completedCourses.includes(courseId)) {
          updatedProgress.completedCourses.push(courseId);
        }
        
        updatedProgress.currentCourse = courseId;
        
        await updateDoc(doc(db, 'users', userId), {
          progress: updatedProgress,
        });
      }
    } catch (error: any) {
      throw new Error('Failed to update course progress');
    }
  }

  // Get current user
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }

  // Get user profile from Firestore
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (user: FirebaseUser | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  // Error message mapping
  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      default:
        return 'An error occurred. Please try again';
    }
  }
}

export const authService = new AuthService();
export default authService;
