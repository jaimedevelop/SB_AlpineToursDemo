// src/firebase/types.ts
// Type definitions for Firebase operations
//TEMPORARY file, not sure exactly why it was created but fuck it we ball
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  id?: string;
  email: string;
  name: string;
  age?: number | null;
  homeLocation?: string;
  experienceLevel?: string;
  skiingPreferences?: string[];
  certifications?: string;
  emergencyContacts?: EmergencyContact[];
  preferences?: UserPreferences;
  favoriteResorts?: string[];
  savedTrips?: string[];
  quizResults?: QuizResults;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface UserPreferences {
  units?: 'imperial' | 'metric';
  language?: string;
  notifications?: NotificationSettings;
}

export interface NotificationSettings {
  powderAlerts: boolean;
  workoutReminders: boolean;
  tripDeadlines: boolean;
  socialUpdates: boolean;
  gearDeals: boolean;
}

export interface QuizResults {
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  budget_range: [number, number];
  preferred_regions?: string[];
  interests?: string[];
  trip_duration?: number;
}

export interface TripPlan {
  id?: string;
  userId: string;
  resortId: string;
  resortName: string;
  dates: {
    startDate: Date;
    endDate: Date;
  };
  accommodation?: AccommodationChoice;
  transport?: TransportChoice;
  partySize?: number;
  status: 'planning' | 'booked' | 'completed';
  estimatedCost?: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface AccommodationChoice {
  type: 'hotel' | 'condo' | 'lodge' | 'airbnb';
  name?: string;
  pricePerNight?: number;
  rating?: number;
}

export interface TransportChoice {
  type: 'drive' | 'fly' | 'shuttle' | 'train';
  cost?: number;
  duration?: string;
}

export interface Resort {
  id: string;
  name: string;
  location: {
    state: string;
    lat: number;
    lng: number;
  };
  difficulty_breakdown: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  base_price: number;
  peak_season_multiplier?: number;
  amenities: string[];
  nearby_accommodations?: AccommodationChoice[];
  transport_options?: TransportChoice[];
  images?: string[];
  weather_data?: WeatherInfo;
  recommended_for?: ('beginner' | 'intermediate' | 'advanced')[];
}

export interface WeatherInfo {
  currentConditions?: string;
  forecast?: string;
  snowDepth?: number;
  temperature?: number;
}

// Authentication related types
export interface SignUpData {
  name?: string;
  age?: number;
  homeLocation?: string;
  experienceLevel?: string;
  skiingPreferences?: string[];
  certifications?: string;
  emergencyContacts?: EmergencyContact[];
  skiUnit?: 'imperial' | 'metric';
  language?: string;
  notifications?: NotificationSettings;
}

export interface AuthError {
  code: string;
  message: string;
}

// Database operation result types
export interface DatabaseResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
