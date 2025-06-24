import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, getUserProfile, updateUserProfile } from '../../firebase';

// Types
interface UserProfile {
  uid: string;
  email: string;
  name: string;
  age?: number;
  selectedResort?: string;
  favoriteResorts: string[];
  savedTrips: string[];
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  // Auth state
  user: User | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Auth methods
  signOut: () => Promise<void>;
  
  // Favorites methods
  addToFavorites: (resortId: string) => Promise<void>;
  removeFromFavorites: (resortId: string) => Promise<void>;
  isFavorite: (resortId: string) => boolean;
  
  // Trip methods
  saveTrip: (tripData: any) => Promise<void>;
  removeSavedTrip: (tripId: string) => Promise<void>;
  
  // Profile methods
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthWrapper');
  }
  return context;
};

// AuthWrapper component
interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);
          // Load user profile from database
          const profile = await getUserProfile(firebaseUser.uid);
          if (profile) {
            setUserProfile({
              ...profile,
              favoriteResorts: profile.favoriteResorts || [],
              savedTrips: profile.savedTrips || []
            });
          } else {
            // Create default profile if none exists
            const defaultProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || '',
              favoriteResorts: [],
              savedTrips: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            await updateUserProfile(firebaseUser.uid, defaultProfile);
            setUserProfile(defaultProfile);
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        setUser(firebaseUser);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  // Auth methods
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Favorites methods
  const addToFavorites = async (resortId: string) => {
    if (!user || !userProfile) {
      throw new Error('User must be authenticated to add favorites');
    }

    try {
      const updatedFavorites = [...userProfile.favoriteResorts];
      if (!updatedFavorites.includes(resortId)) {
        updatedFavorites.push(resortId);
        
        const updates = {
          favoriteResorts: updatedFavorites,
          updatedAt: new Date().toISOString()
        };
        
        await updateUserProfile(user.uid, updates);
        setUserProfile(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  };

  const removeFromFavorites = async (resortId: string) => {
    if (!user || !userProfile) {
      throw new Error('User must be authenticated to remove favorites');
    }

    try {
      const updatedFavorites = userProfile.favoriteResorts.filter(id => id !== resortId);
      
      const updates = {
        favoriteResorts: updatedFavorites,
        updatedAt: new Date().toISOString()
      };
      
      await updateUserProfile(user.uid, updates);
      setUserProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  };

  const isFavorite = (resortId: string): boolean => {
    return userProfile?.favoriteResorts.includes(resortId) || false;
  };

  // Trip methods
  const saveTrip = async (tripData: any) => {
    if (!user || !userProfile) {
      throw new Error('User must be authenticated to save trips');
    }

    try {
      const tripId = `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const tripWithId = { ...tripData, id: tripId, createdAt: new Date().toISOString() };
      
      const updatedTrips = [...userProfile.savedTrips, tripId];
      
      const updates = {
        savedTrips: updatedTrips,
        updatedAt: new Date().toISOString(),
        [`trips/${tripId}`]: tripWithId // Store trip data
      };
      
      await updateUserProfile(user.uid, updates);
      setUserProfile(prev => prev ? { ...prev, savedTrips: updatedTrips } : null);
      
      return tripId;
    } catch (error) {
      console.error('Error saving trip:', error);
      throw error;
    }
  };

  const removeSavedTrip = async (tripId: string) => {
    if (!user || !userProfile) {
      throw new Error('User must be authenticated to remove trips');
    }

    try {
      const updatedTrips = userProfile.savedTrips.filter(id => id !== tripId);
      
      const updates = {
        savedTrips: updatedTrips,
        updatedAt: new Date().toISOString(),
        [`trips/${tripId}`]: null // Remove trip data
      };
      
      await updateUserProfile(user.uid, updates);
      setUserProfile(prev => prev ? { ...prev, savedTrips: updatedTrips } : null);
    } catch (error) {
      console.error('Error removing saved trip:', error);
      throw error;
    }
  };

  // Profile methods
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) {
      throw new Error('User must be authenticated to update profile');
    }

    try {
      const profileUpdates = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await updateUserProfile(user.uid, profileUpdates);
      setUserProfile(prev => prev ? { ...prev, ...profileUpdates } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    // Auth state
    user,
    userProfile,
    isAuthenticated: !!user,
    isLoading,
    
    // Auth methods
    signOut,
    
    // Favorites methods
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    
    // Trip methods
    saveTrip,
    removeSavedTrip,
    
    // Profile methods
    updateProfile
  }), [user, userProfile, isLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback = <div>Please log in to access this feature</div>,
  requireAuth = true 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// HOC for components that require authentication
export const withAuthRequired = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => (
    <ProtectedRoute>
      <Component {...props} />
    </ProtectedRoute>
  );
};

export default AuthWrapper;