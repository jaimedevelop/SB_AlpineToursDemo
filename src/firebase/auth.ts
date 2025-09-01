// src/firebase/auth.ts
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User,
  UserCredential,
  Unsubscribe
} from 'firebase/auth';
import { auth } from './config';
import { createUserProfile } from './database';
import { SignUpData, AuthError } from './types';

export const signUp = async (
  email: string, 
  password: string, 
  userData: SignUpData = {}
): Promise<User> => {
  try {
    // Create Firebase Auth user
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    const user: User = userCredential.user;

    // Update display name if provided
    if (userData.name) {
      await updateProfile(user, { displayName: userData.name });
    }
    
    // Create user profile in Firestore
    await createUserProfile(user.uid, {
      email: user.email || '',
      name: userData.name || '',
      age: userData.age || null,
      homeLocation: userData.homeLocation || '',
      experienceLevel: userData.experienceLevel || '',
      skiingPreferences: userData.skiingPreferences || [],
      certifications: userData.certifications || '',
      emergencyContacts: userData.emergencyContacts || [],
      preferences: {
        units: userData.skiUnit || 'imperial',
        language: userData.language || 'english',
        notifications: userData.notifications || {
          powderAlerts: true,
          workoutReminders: true,
          tripDeadlines: true,
          socialUpdates: false,
          gearDeals: false
        }
      }
    });
    
    return user;
  } catch (error) {
    console.error('Error in signUp:', error);
    throw error as AuthError;
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error('Error in signIn:', error);
    throw error as AuthError;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error in logOut:', error);
    throw error as AuthError;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error in resetPassword:', error);
    throw error as AuthError;
  }
};

export const useAuth = (callback: (user: User | null) => void): Unsubscribe => {
  return onAuthStateChanged(auth, callback);
};