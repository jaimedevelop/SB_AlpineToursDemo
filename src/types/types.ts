// src/types/Resort.ts
import { WeatherData } from './Weather';

export interface Resort {
  // Common identifiers
  id: string;
  name: string;
  
  // Location information
  state: string;
  region: string;
  latitude: string | number;
  longitude: string | number;
  
  // Visual content
  imageUrl?: string;
  images?: string[];
  
  // Resort statistics
  elevation?: number;
  runs?: number;
  rating?: number;
  isOpen?: boolean;
  
  // Pricing
  ticketCost?: number;
  fullDayTicket: string;  // Original string format (e.g. "$89.99")
  halfDayTicket: string;
  
  // Run difficulty percentages (as strings with % sign)
  difficulty: {
      percent: {
          green: string;
          blue: string;
          doubleBlue: string;
          black: string;
          doubleBlack: string;
          }
    
      distance: {
          green: string;
          blue: string;
          doubleBlue: string;
          black: string;
          doubleBlack: string;
          }
  }
  // Resort features
  terrainPark: string;
  backcountry: boolean | null;
  snowmobile: boolean | null;
  snowTubing: boolean | null;
  iceSkating: boolean | null;
  nightSkiing: boolean | null;
  
  // Content and personalization
  description: string;
  matchPercentage?: number;
  scrapeUrl: string;
  url: string;
  
  // Weather information
  weather?: {
    temperature: number;
    condition: string;
    snowfall: number;
    
    // Additional fields from NWS API
    windSpeed?: string;
    windDirection?: string;
    shortForecast?: string;
    detailedForecast?: string;
    icon?: string;
  };
}
// Add these interfaces to your types.ts file

export interface TripPlan {
  id?: string;
  userId?: string;
  resort: Resort | null;
  dates: {
    startDate: Date;
    endDate: Date;
  } | null;
  accommodation: Accommodation | null;
  transportation: Transportation | null;
  status: 'planning' | 'booked' | 'completed';
  created_at?: Date;
  updated_at?: Date;
}

export interface Accommodation {
  id: number | string;
  name: string;
  distance: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  image: string;
  type?: 'hotel' | 'lodge' | 'condo' | 'chalet';
}

export interface Transportation {
  id: string;
  type: 'flight' | 'drive' | 'bus' | 'train';
  provider?: string;
  price?: number;
  duration?: string;
  details?: string;
}

// Navigation state interface for passing data between pages
export interface NavigationState {
  selectedResort?: Resort;
  context?: 'resort-selection' | 'new-trip' | 'continue-planning';
  tripId?: string;
}