// src/firebase/database.js
// Firestore database operations (replacing Realtime Database)
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
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

// Export db for direct access if needed
export { db };

// User Profile Operations
export const createUserProfile = async (uid, userData) => {
  try {
    const userDocRef = doc(db, 'users', uid);
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

export const getUserProfile = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (uid, updates) => {
  try {
    const userDocRef = doc(db, 'users', uid);
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
export const addToFavorites = async (uid, resortId) => {
  try {
    const userDocRef = doc(db, 'users', uid);
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

export const removeFromFavorites = async (uid, resortId) => {
  try {
    const userDocRef = doc(db, 'users', uid);
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
export const saveTrip = async (uid, tripData) => {
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
    const userDocRef = doc(db, 'users', uid);
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

export const getUserTrips = async (uid) => {
  try {
    const tripsCollectionRef = collection(db, 'trips');
    const q = query(tripsCollectionRef, where('userId', '==', uid));
    const querySnapshot = await getDocs(q);
    
    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() });
    });
    
    return trips;
  } catch (error) {
    console.error('Error getting user trips:', error);
    throw error;
  }
};

export const deleteTrip = async (uid, tripId) => {
  try {
    // Remove trip from trips collection
    const tripDocRef = doc(db, 'trips', tripId);
    await deleteDoc(tripDocRef);

    // Remove trip ID from user's savedTrips array
    const userDocRef = doc(db, 'users', uid);
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
// Add this line at the end of your database.js file
export { database } from './config';