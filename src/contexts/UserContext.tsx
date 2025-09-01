import React, { createContext, useContext, ReactNode } from 'react';
import useSWR from 'swr';
import { UserProfile } from '../types/account';
import { FirebaseOperations } from '../lib/firebaseOperations';

interface UserContextType {
  user: UserProfile | null;
  isLoading: boolean;
  error: any;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Get actual user ID from authentication
  const userId = 'current-user-id';

  const { data: user, error, isLoading, mutate } = useSWR<UserProfile>(
    userId ? `/user/${userId}` : null,
    () => {
      // TODO: Replace with actual Firebase call
      // return FirebaseOperations.getUserProfile(userId);
      
      // Mock data for now
      return {
        id: userId,
        email: 'john.skier@example.com',
        name: 'John Skier',
        joinDate: '2023-12-15',
        level: 23,
        totalPoints: 15420,
        homeLocation: 'Denver, CO',
        experienceLevel: 'advanced' as const,
        skiingPreferences: ['Powder', 'Off-piste'],
        certifications: ['PSIA Level 1']
      } as UserProfile;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      onError: (error) => {
        console.error('Error loading user profile:', error);
        // TODO: Show user-friendly error message
      }
    }
  );

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      // TODO: Update in Firebase
      // await FirebaseOperations.updateUserProfile(userId, data);
      
      // Optimistic update
      await mutate({ ...user!, ...data }, false);
      
      // Revalidate
      await mutate();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const refreshUser = () => {
    mutate();
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      error, 
      updateProfile, 
      refreshUser 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};