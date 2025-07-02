import useSWR from 'swr';
import { 
  UserStats, 
  Achievement, 
  SeasonChallenge, 
  PaymentMethod, 
  Purchase, 
  OfflineMap,
  HelpArticle 
} from '../types/account';

export const useUserStats = () => {
  return useSWR<UserStats>('/user/stats', () => {
    // TODO: Replace with Firebase call
    return {
      level: 23,
      totalPoints: 15420,
      currentSeason: {
        daysSkied: 47,
        resortsVisited: 23,
        verticalFeet: 892340,
        workoutStreak: 12,
        tripsPlanned: 8,
        friendsIntroduced: 5
      },
      allTime: {
        daysSkied: 234,
        resortsVisited: 67,
        verticalFeet: 4230000,
        countries: 8
      }
    };
  });
};

export const useAchievements = () => {
  return useSWR<Achievement[]>('/user/achievements', () => {
    // TODO: Replace with Firebase call
    return [
      {
        id: 'first-resort',
        name: 'First Tracks',
        description: 'Visited your first resort',
        category: 'Explorer' as const,
        earned: true,
        date: '2023-12-15',
        rarity: 'common' as const,
        points: 100
      },
      {
        id: 'state-collector',
        name: 'State Collector',
        description: 'Skied in 5 different states',
        category: 'Explorer' as const,
        earned: true,
        date: '2024-02-20',
        rarity: 'rare' as const,
        points: 500
      },
      {
        id: 'international-skier',
        name: 'International Skier',
        description: 'Skied in 3 different countries',
        category: 'Explorer' as const,
        earned: true,
        date: '2024-03-10',
        rarity: 'epic' as const,
        points: 1000
      },
      {
        id: 'trip-master',
        name: 'Trip Master',
        description: 'Planned 10 successful trips',
        category: 'Planner' as const,
        earned: true,
        date: '2024-01-05',
        rarity: 'rare' as const,
        points: 750
      },
      {
        id: 'workout-warrior',
        name: 'Workout Warrior',
        description: 'Completed 50 workouts',
        category: 'Fitness' as const,
        earned: true,
        date: '2024-02-28',
        rarity: 'rare' as const,
        points: 600
      },
      {
        id: 'consistency-king',
        name: 'Consistency King',
        description: 'Maintained 30-day workout streak',
        category: 'Fitness' as const,
        earned: false,
        progress: 12,
        target: 30,
        rarity: 'legendary' as const,
        points: 2000
      },
      {
        id: 'gear-guru',
        name: 'Gear Guru',
        description: 'Reviewed 25 pieces of equipment',
        category: 'Gear' as const,
        earned: false,
        progress: 18,
        target: 25,
        rarity: 'epic' as const,
        points: 1200
      }
    ];
  });
};

export const useSeasonChallenges = () => {
  return useSWR<SeasonChallenge[]>('/user/challenges', () => {
    // TODO: Replace with Firebase call
    return [
      {
        id: 'new-resorts',
        name: 'Visit 5 New Resorts',
        description: 'Explore new skiing destinations',
        progress: 3,
        target: 5,
        reward: '500 points',
        deadline: '2024-04-30',
        userId: 'current-user-id'
      },
      {
        id: 'preseason-training',
        name: 'Complete Pre-Season Training',
        description: 'Finish workout program before season',
        progress: 8,
        target: 10,
        reward: 'Fitness Master Badge',
        deadline: '2024-12-01',
        userId: 'current-user-id'
      },
      {
        id: 'friend-referral',
        name: 'Introduce 2 Friends to Skiing',
        description: 'Share the sport with friends',
        progress: 1,
        target: 2,
        reward: 'Ambassador Status',
        deadline: '2024-03-31',
        userId: 'current-user-id'
      }
    ];
  });
};

export const usePaymentMethods = () => {
  return useSWR<PaymentMethod[]>('/user/payment-methods', () => {
    // TODO: Replace with Stripe API call
    return [
      {
        id: 'pm_1234567890',
        type: 'card',
        lastFour: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2026,
        isDefault: true
      }
    ];
  });
};

export const usePurchaseHistory = () => {
  return useSWR<Purchase[]>('/user/purchases', () => {
    // TODO: Replace with Firebase/Stripe call
    return [
      {
        id: 'pur_1',
        description: 'Premium Subscription',
        amount: 9.99,
        currency: 'USD',
        date: '2024-02-15',
        status: 'completed',
        receiptUrl: 'https://example.com/receipt/1'
      },
      {
        id: 'pur_2',
        description: 'Whistler Trip Booking',
        amount: 299.00,
        currency: 'USD',
        date: '2024-01-28',
        status: 'completed',
        receiptUrl: 'https://example.com/receipt/2'
      },
      {
        id: 'pur_3',
        description: 'Ski Helmet - Smith Vantage',
        amount: 179.99,
        currency: 'USD',
        date: '2024-01-15',
        status: 'completed',
        receiptUrl: 'https://example.com/receipt/3'
      }
    ];
  });
};

export const useOfflineMaps = () => {
  return useSWR<OfflineMap[]>('/user/offline-maps', () => {
    // TODO: Replace with local storage/Firebase call
    return [
      {
        id: 'whistler',
        name: 'Whistler Blackcomb',
        region: 'British Columbia',
        size: 47185920, // 45 MB in bytes
        downloaded: true,
        lastUpdated: '2024-02-01'
      },
      {
        id: 'vail',
        name: 'Vail Resort',
        region: 'Colorado',
        size: 39845888, // 38 MB in bytes
        downloaded: true,
        lastUpdated: '2024-01-28'
      },
      {
        id: 'aspen',
        name: 'Aspen Snowmass',
        region: 'Colorado',
        size: 54525952, // 52 MB in bytes
        downloaded: false
      }
    ];
  });
};

export const useHelpArticles = () => {
  return useSWR<HelpArticle[]>('/help/articles', () => {
    // TODO: Replace with CMS/Firebase call
    return [
      {
        id: 'getting-started',
        title: 'Getting Started Guide',
        description: 'Learn the basics of the app',
        category: 'Basics',
        content: 'Getting started content...',
        views: 1234
      },
      {
        id: 'planning-trip',
        title: 'Planning Your First Trip',
        description: 'Step-by-step trip planning',
        category: 'Planning',
        content: 'Trip planning content...',
        views: 856
      },
      {
        id: 'fitness-features',
        title: 'Using Fitness Features',
        description: 'Maximize your ski preparation',
        category: 'Fitness',
        content: 'Fitness features content...',
        views: 642
      },
      {
        id: 'gear-recommendations',
        title: 'Gear Recommendations',
        description: 'Find the right equipment',
        category: 'Gear',
        content: 'Gear recommendations content...',
        views: 789
      }
    ];
  });
};