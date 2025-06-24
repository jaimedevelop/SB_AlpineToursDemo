// src/firebase/auth.js
// This file handles all authentication-related operations
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './config';
import { createUserProfile } from './database'; // This now uses Firestore

export const signUp = async (email, password, userData = {}) => {
  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name if provided
    if (userData.name) {
      await updateProfile(user, { displayName: userData.name });
    }
    
    // Create user profile in Firestore
    await createUserProfile(user.uid, {
      email: user.email,
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
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error in signIn:', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error in logOut:', error);
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error in resetPassword:', error);
    throw error;
  }
};

export const useAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};