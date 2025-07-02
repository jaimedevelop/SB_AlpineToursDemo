// src/data/mockDemoResorts.ts
import { Resort } from '../types/types';

export const mockDemoResorts: Resort[] = [
  // SUGAR MOUNTAIN RESORT - Beginner-Friendly Budget Option
  {
    id: "sugar-mountain-nc-demo",
    name: "Sugar Mountain Resort",
    state: "North Carolina",
    region: "Southeast",
    latitude: 36.1301,
    longitude: -81.8712,
    imageUrl: "/src/assets/images/sugar-mountain-main.jpg",
    images: [
      "/src/assets/images/sugar-mountain-main.jpg",
      "/src/assets/images/sugar-mountain-slopes.jpg",
      "/src/assets/images/sugar-mountain-lodge.jpg",
      "/src/assets/images/sugar-mountain-village.jpg"
    ],
    elevation: 5300,
    runs: 20,
    rating: 4.2,
    isOpen: true,
    
    // Pricing
    ticketCost: 75,
    fullDayTicket: "$75",
    halfDayTicket: "$55",
    
    // Difficulty breakdown
    difficulty: {
      percent: {
        green: "35%",
        blue: "40%", 
        doubleBlue: "15%",
        black: "8%",
        doubleBlack: "2%"
      },
      distance: {
        green: "8.5 miles",
        blue: "12.3 miles",
        doubleBlue: "4.2 miles", 
        black: "2.1 miles",
        doubleBlack: "0.9 miles"
      }
    },
    
    // Features
    terrainPark: "Yes",
    backcountry: false,
    snowmobile: false,
    snowTubing: true,
    iceSkating: true,
    nightSkiing: true,
    
    // Content
    description: "Perfect for families and beginners with 75% beginner/intermediate terrain and full snowmaking coverage.",
    matchPercentage: 92,
    scrapeUrl: "https://www.skisugar.com",
    url: "https://www.skisugar.com",
    
    // Weather
    weather: {
      temperature: 28,
      condition: "Partly Cloudy",
      snowfall: 2.5,
      windSpeed: "12 mph",
      windDirection: "NW", 
      shortForecast: "Partly Cloudy",
      detailedForecast: "Partly cloudy with good skiing conditions. Fresh snow in last 24 hours.",
      icon: "partly-cloudy"
    }
  },

  // STEAMBOAT SPRINGS - Intermediate Paradise
  {
    id: "steamboat-springs-co-demo",
    name: "Steamboat Springs",
    state: "Colorado", 
    region: "Rocky Mountains",
    latitude: 40.4586,
    longitude: -106.8067,
    imageUrl: "/src/assets/images/steamboat-main.jpg",
    images: [
      "/src/assets/images/steamboat-main.jpg",
      "/src/assets/images/steamboat-slopes.jfif", 
      "/src/assets/images/steamboat-village.jpg",
      "/src/assets/images/steamboat-lodge.jfif"
    ],
    elevation: 10700,
    runs: 165,
    rating: 4.6,
    isOpen: true,
    
    // Pricing
    ticketCost: 189,
    fullDayTicket: "$189",
    halfDayTicket: "$149",
    
    // Difficulty breakdown
    difficulty: {
      percent: {
        green: "14%",
        blue: "42%",
        doubleBlue: "26%", 
        black: "14%",
        doubleBlack: "4%"
      },
      distance: {
        green: "15.2 miles",
        blue: "45.8 miles",
        doubleBlue: "28.3 miles",
        black: "15.2 miles", 
        doubleBlack: "4.4 miles"
      }
    },
    
    // Features
    terrainPark: "Yes",
    backcountry: true,
    snowmobile: true,
    snowTubing: true, 
    iceSkating: false,
    nightSkiing: false,
    
    // Content
    description: "Legendary champagne powder and intermediate paradise with natural hot springs and authentic Colorado experience.",
    matchPercentage: 88,
    scrapeUrl: "https://www.steamboat.com",
    url: "https://www.steamboat.com",
    
    // Weather
    weather: {
      temperature: 22,
      condition: "Fresh Snow",
      snowfall: 7.2,
      windSpeed: "8 mph",
      windDirection: "W",
      shortForecast: "Fresh Snow", 
      detailedForecast: "Fresh champagne powder with excellent skiing conditions. 7+ inches in last 24 hours.",
      icon: "snow"
    }
  },

  // VAIL RESORT - Premium Experience
  {
    id: "vail-colorado-demo",
    name: "Vail Ski Resort",
    state: "Colorado",
    region: "Rocky Mountains", 
    latitude: 39.6061,
    longitude: -106.3550,
    imageUrl: "/src/assets/images/vail-slopes.jfif",
    images: [
      "/src/assets/images/vail-slopes.jfif",
      "/src/assets/images/vail-map.jfif",
      "/src/assets/images/vail-lodge.jfif", 
      "/src/assets/images/vail-spa.jfif"
    ],
    elevation: 11570,
    runs: 195,
    rating: 4.8,
    isOpen: true,
    
    // Pricing  
    ticketCost: 279,
    fullDayTicket: "$279",
    halfDayTicket: "$229",
    
    // Difficulty breakdown
    difficulty: {
      percent: {
        green: "8%",
        blue: "31%",
        doubleBlue: "36%",
        black: "18%", 
        doubleBlack: "7%"
      },
      distance: {
        green: "12.1 miles",
        blue: "47.2 miles", 
        doubleBlue: "54.8 miles",
        black: "27.4 miles",
        doubleBlack: "10.7 miles"
      }
    },
    
    // Features
    terrainPark: "Yes", 
    backcountry: true,
    snowmobile: false,
    snowTubing: false,
    iceSkating: true,
    nightSkiing: false,
    
    // Content
    description: "World-renowned back bowls and luxury experience with the largest ski area in Colorado and world-class amenities.",
    matchPercentage: 76,
    scrapeUrl: "https://www.vail.com", 
    url: "https://www.vail.com",
    
    // Weather
    weather: {
      temperature: 25,
      condition: "Bluebird Day",
      snowfall: 0.8,
      windSpeed: "5 mph",
      windDirection: "SW",
      shortForecast: "Sunny",
      detailedForecast: "Perfect bluebird day with excellent visibility and pristine groomed conditions.",
      icon: "sunny"
    }
  }
];

// Hotel data for each resort (matches HotelCarouselBox interface)
export const mockHotelData = {
  "sugar-mountain-nc-demo": [
    {
      id: "sugar-budget-inn",
      name: "Mountain View Budget Inn", 
      imageUrl: "/src/assets/images/sugar-mountain-inn.jfif",
      price: 89,
      rating: 3.8,
      amenities: ["Free WiFi", "Continental Breakfast", "Parking", "Pet Friendly"]
    },
    {
      id: "sugar-family-lodge",
      name: "Banner Elk Family Lodge",
      imageUrl: "/src/assets/images/sugar-mountain-elk.jfif", 
      price: 129,
      rating: 4.3,
      amenities: ["Hot Tub", "Game Room", "Kitchenette", "Ski Storage", "Pool"]
    },
    {
      id: "sugar-ski-chalet", 
      name: "Beech Mountain Ski Chalet",
      imageUrl: "/src/assets/images/sugar-chalet.avif",
      price: 165,
      rating: 4.1,
      amenities: ["Fireplace", "Full Kitchen", "Mountain Views", "Hot Tub", "Ski Storage"]
    }
  ],
  
  "steamboat-springs-co-demo": [
    {
      id: "steamboat-grand",
      name: "Steamboat Grand Resort Hotel",
      imageUrl: "/src/assets/images/steamboat-grand.jfif",
      price: 245, 
      rating: 4.4,
      amenities: ["Slope Access", "Spa Services", "Multiple Restaurants", "Fitness Center", "Concierge"]
    },
    {
      id: "sheraton-steamboat",
      name: "Sheraton Steamboat Resort", 
      imageUrl: "/src/assets/images/sheraton-steamboat.jfif",
      price: 199,
      rating: 4.2,
      amenities: ["Hot Springs Access", "Ski Storage", "Restaurant", "Fitness Center", "Shuttle Service"]
    },
    {
      id: "steamboat-condo",
      name: "Mountain Village Condos",
      imageUrl: "/src/assets/images/steamboat-condos.jpg",
      price: 289,
      rating: 4.5, 
      amenities: ["Full Kitchen", "Mountain Views", "Hot Tub", "Fireplace", "Ski Storage", "Balcony"]
    }
  ],
  
  "vail-colorado-demo": [
    {
      id: "four-seasons-vail",
      name: "Four Seasons Resort Vail",
      imageUrl: "/src/assets/images/four-seasons-vail.jfif",
      price: 649,
      rating: 4.9,
      amenities: ["Luxury Spa", "Michelin Dining", "Ski Concierge", "Private Balconies", "Valet Parking", "Butler Service"]
    },
    {
      id: "ritz-carlton-vail",
      name: "The Ritz-Carlton, Bachelor Gulch", 
      imageUrl: "/src/assets/images/ritz-carlton-vail.jfif",
      price: 589,
      rating: 4.8,
      amenities: ["Spa & Fitness", "Fine Dining", "Ski Valet", "Mountain Views", "Luxury Suites", "Concierge"]
    },
    {
      id: "vail-mountain-lodge",
      name: "Vail Mountain Lodge & Spa",
      imageUrl: "/src/assets/images/vail-lodge.avif", 
      price: 429,
      rating: 4.6,
      amenities: ["Full Spa", "Rooftop Hot Tubs", "Ski Storage", "Restaurant", "Fitness Center", "Mountain Views"]
    }
  ]
};

// Helper function to get hotels for a resort
export const getHotelsForResort = (resortId: string) => {
  return mockHotelData[resortId as keyof typeof mockHotelData] || [];
};