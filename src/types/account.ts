// User and Profile Types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  joinDate: string;
  level: number;
  totalPoints: number;
  homeLocation?: string;
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  skiingPreferences?: string[];
  certifications?: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  userId: string;
}

// Stats and Achievements Types
export interface UserStats {
  level: number;
  totalPoints: number;
  currentSeason: SeasonStats;
  allTime: AllTimeStats;
}

export interface SeasonStats {
  daysSkied: number;
  resortsVisited: number;
  verticalFeet: number;
  workoutStreak: number;
  tripsPlanned: number;
  friendsIntroduced: number;
}

export interface AllTimeStats {
  daysSkied: number;
  resortsVisited: number;
  verticalFeet: number;
  countries: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'Explorer' | 'Planner' | 'Fitness' | 'Gear' | 'Social';
  earned: boolean;
  date?: string;
  progress?: number;
  target?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

export interface SeasonChallenge {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  deadline: string;
  userId: string;
}

// Settings Types
export interface AppSettings {
  darkMode: boolean;
  language: string;
  units: 'imperial' | 'metric';
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  powderAlerts: boolean;
  workoutReminders: boolean;
  tripDeadlines: boolean;
  socialUpdates: boolean;
  gearDeals: boolean;
}

// Privacy and Security Types
export interface PrivacySetting {
  id: string;
  name: string;
  description: string;
  value: string;
  options: string[];
}

export interface SecuritySetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  lastModified?: string;
}

// Billing Types
export interface Subscription {
  id: string;
  plan: 'free' | 'premium' | 'pro';
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  price: number;
  currency: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  lastFour?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface Purchase {
  id: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  receiptUrl?: string;
}

// Technical Types
export interface OfflineMap {
  id: string;
  name: string;
  region: string;
  size: number; // in bytes
  downloaded: boolean;
  lastUpdated?: string;
}

export interface AppPermission {
  id: string;
  name: string;
  description: string;
  granted: boolean;
  required: boolean;
}

export interface DataUsageInfo {
  currentMonth: number; // in bytes
  totalUsage: number; // in bytes
  wifiOnlyEnabled: boolean;
  lastReset: string;
}

// Support Types
export interface HelpArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  views: number;
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}