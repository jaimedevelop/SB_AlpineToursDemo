// hooks/useFavorites.ts
import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { getUserProfile, addToFavorites, removeFromFavorites } from '../firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

export interface UseFavoritesReturn {
  favoriteResorts: Set<string>;
  favoritesActive: boolean;
  setFavoritesActive: (active: boolean) => void;
  toggleFavorite: (resortName: string) => Promise<void>;
  resetFavoritesFilter: () => void;
  isFavorite: (resortName: string) => boolean;
  isLoading: boolean;
  error: string | null;
}

export function useFavorites(): UseFavoritesReturn {
  const [favoriteResorts, setFavoriteResorts] = useState<Set<string>>(new Set());
  const [favoritesActive, setFavoritesActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user's favorite resorts from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log('No user logged in');
        setFavoriteResorts(new Set());
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const userProfile = await getUserProfile(user.uid);
        
        if (userProfile && userProfile.favoriteResorts) {
          // Convert array to Set for easier lookup
          setFavoriteResorts(new Set(userProfile.favoriteResorts));
        } else {
          setFavoriteResorts(new Set());
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading favorites:', err);
        setError('Failed to load favorites');
        setFavoriteResorts(new Set());
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to toggle favorite status
  const toggleFavorite = async (resortName: string): Promise<void> => {
    const user = auth.currentUser;
    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      if (favoriteResorts.has(resortName)) {
        // Remove from favorites
        await removeFromFavorites(user.uid, resortName);
        setFavoriteResorts(prev => {
          const newSet = new Set(prev);
          newSet.delete(resortName);
          return newSet;
        });
      } else {
        // Add to favorites
        await addToFavorites(user.uid, resortName);
        setFavoriteResorts(prev => new Set([...prev, resortName]));
      }
      setError(null);
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setError('Failed to update favorite');
    }
  };

  // Reset favorites filter
  const resetFavoritesFilter = (): void => {
    setFavoritesActive(false);
  };

  // Check if a resort is favorited
  const isFavorite = (resortName: string): boolean => {
    return favoriteResorts.has(resortName);
  };

  return {
    favoriteResorts,
    favoritesActive,
    setFavoritesActive,
    toggleFavorite,
    resetFavoritesFilter,
    isFavorite,
    isLoading,
    error
  };
}