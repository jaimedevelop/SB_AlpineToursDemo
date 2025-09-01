// Updated AuthContext.tsx - Fix the updateProfile method
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { useAuth as useFirebaseAuth } from '../firebase/auth';
import { getUserProfile, createUserProfile, updateUserProfile } from '../firebase/database';
import { UserProfile, SignUpData } from '../firebase/types';
import { signUp, signIn, logOut, resetPassword } from '../firebase/auth';

// Auth Context Interface
interface AuthContextType {
  // Auth State
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  
  // Auth Methods
  signup: (email: string, password: string, userData?: SignUpData) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  resetUserPassword: (email: string) => Promise<void>;
  
  // Profile Methods
  refreshUserProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  
  // Convenience Properties
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom Hook to use Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Clear error helper
  const clearError = () => setError(null);

  // Load user profile from Firestore
  const loadUserProfile = async (user: User): Promise<void> => {
    try {
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError('Failed to load user profile');
    }
  };

  // Refresh user profile
  const refreshUserProfile = async (): Promise<void> => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      await loadUserProfile(currentUser);
    } catch (err) {
      console.error('Error refreshing user profile:', err);
      setError('Failed to refresh user profile');
    } finally {
      setLoading(false);
    }
  };

  // Sign up method
  const signup = async (
    email: string, 
    password: string, 
    userData: SignUpData = {}
  ): Promise<User> => {
    try {
      clearError();
      setLoading(true);
      
      const user = await signUp(email, password, userData);
      // Profile creation is handled in the signUp function
      return user;
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login method
  const login = async (email: string, password: string): Promise<User> => {
    try {
      clearError();
      setLoading(true);
      
      const user = await signIn(email, password);
      return user;
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout method
  const logout = async (): Promise<void> => {
    try {
      clearError();
      setLoading(true);
      
      await logOut();
      setCurrentUser(null);
      setUserProfile(null);
    } catch (err: any) {
      setError(err.message || 'Failed to log out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password method
  const resetUserPassword = async (email: string): Promise<void> => {
    try {
      clearError();
      await resetPassword(email);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
      throw err;
    }
  };

  // Update profile method - FIXED to use existing database function
  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    try {
      clearError();
      setLoading(true);
      
      // Use the existing updateUserProfile function from database.ts
      await updateUserProfile(currentUser.uid, updates);
      
      // Refresh the local profile to get the updated data
      await loadUserProfile(currentUser);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auth state listener effect
  useEffect(() => {
    const unsubscribe = useFirebaseAuth((user: User | null) => {
      setCurrentUser(user);
      
      if (user) {
        // User is signed in, load their profile
        loadUserProfile(user).finally(() => {
          setLoading(false);
        });
      } else {
        // User is signed out
        setUserProfile(null);
        setLoading(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Context value
  const value: AuthContextType = {
    // Auth State
    currentUser,
    userProfile,
    loading,
    error,
    
    // Auth Methods
    signup,
    login,
    logout,
    resetUserPassword,
    
    // Profile Methods
    refreshUserProfile,
    updateProfile,
    
    // Convenience Properties
    isAuthenticated: !!currentUser,
    isLoading: loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 