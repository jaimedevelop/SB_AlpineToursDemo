import { SWRConfiguration } from 'swr';

// TODO: Replace with your actual API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Default fetcher function for SWR
export const fetcher = async (url: string) => {
  // TODO: Add authentication headers when user is logged in
  const token = localStorage.getItem('authToken'); // Replace with your auth method
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object
    error.message = await response.text();
    throw error;
  }

  return response.json();
};

// Firebase fetcher (when you integrate Firebase)
export const firebaseFetcher = async (path: string) => {
  // TODO: Implement Firebase Firestore fetching
  // Example with Firebase:
  /*
  import { doc, getDoc } from 'firebase/firestore';
  import { db } from './firebase-config';
  
  const docRef = doc(db, path);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('Document not found');
  }
  */
  
  // Placeholder implementation
  console.log('Firebase fetcher called for:', path);
  return null;
};

// Global SWR configuration
export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 5000,
  errorRetryCount: 3,
  errorRetryInterval: 2000,
  // Cache data for 5 minutes
  focusThrottleInterval: 300000,
};

// Error handling
export const handleSWRError = (error: any) => {
  console.error('SWR Error:', error);
  
  // TODO: Add error reporting service (Sentry, LogRocket, etc.)
  // TODO: Show user-friendly error messages
  
  return {
    message: 'Something went wrong. Please try again.',
    type: 'error'
  };
};