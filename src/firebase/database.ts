// src/firebase/database.ts
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  DocumentReference,
  QuerySnapshot,
  DocumentData,
  DocumentSnapshot
} from 'firebase/firestore';
import { db, database } from './config';
import { UserProfile, TripPlan, DatabaseResult } from './types';

// Export db for direct access if needed
export { db };

// User Profile Operations
export const createUserProfile = async (
  uid: string, 
  userData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>
): Promise<boolean> => {
  try {
    const userDocRef: DocumentReference = doc(db, 'users', uid);
    await setDoc(userDocRef, {
      ...userData,
      favoriteResorts: [],
      savedTrips: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDocRef: DocumentReference = doc(db, 'users', uid);
    const userDoc: DocumentSnapshot = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (
  uid: string, 
  updates: Partial<UserProfile>
): Promise<boolean> => {
  try {
    const userDocRef: DocumentReference = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Favorites Operations
export const addToFavorites = async (uid: string, resortId: string): Promise<boolean> => {
  try {
    const userDocRef: DocumentReference = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      favoriteResorts: arrayUnion(resortId),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (uid: string, resortId: string): Promise<boolean> => {
  try {
    const userDocRef: DocumentReference = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      favoriteResorts: arrayRemove(resortId),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

// Trip Operations
export const saveTrip = async (uid: string, tripData: Omit<TripPlan, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    // Save trip in trips collection
    const tripsCollectionRef = collection(db, 'trips');
    const tripDocRef = await addDoc(tripsCollectionRef, {
      ...tripData,
      userId: uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Add trip ID to user's savedTrips array
    const userDocRef: DocumentReference = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      savedTrips: arrayUnion(tripDocRef.id),
      updatedAt: serverTimestamp()
    });

    return tripDocRef.id;
  } catch (error) {
    console.error('Error saving trip:', error);
    throw error;
  }
};

export const getUserTrips = async (uid: string): Promise<TripPlan[]> => {
  try {
    const tripsCollectionRef = collection(db, 'trips');
    const q = query(tripsCollectionRef, where('userId', '==', uid));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    
    const trips: TripPlan[] = [];
    querySnapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() } as TripPlan);
    });
    
    return trips;
  } catch (error) {
    console.error('Error getting user trips:', error);
    throw error;
  }
};

export const deleteTrip = async (uid: string, tripId: string): Promise<boolean> => {
  try {
    // Remove trip from trips collection
    const tripDocRef: DocumentReference = doc(db, 'trips', tripId);
    await deleteDoc(tripDocRef);

    // Remove trip ID from user's savedTrips array
    const userDocRef: DocumentReference = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      savedTrips: arrayRemove(tripId),
      updatedAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.error('Error deleting trip:', error);
    throw error;
  }
};

// Keep the export for backward compatibility
export { database };