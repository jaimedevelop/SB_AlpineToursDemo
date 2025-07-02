// src/data/weeklyWeatherData.ts

interface WeeklyWeatherData {
  day: string;
  date: string;
  temperature: {
    high: number; // Celsius
    low: number;  // Celsius
  };
  condition: string;
  precipitation: number; // percentage
  icon?: string;
}

// SUGAR MOUNTAIN RESORT - North Carolina (Milder East Coast conditions)
export const sugarMountainWeeklyForecast: WeeklyWeatherData[] = [
  { 
    day: 'Mon', 
    date: '12/23', 
    temperature: { high: 2, low: -4 }, 
    condition: 'Partly Cloudy', 
    precipitation: 20 
  },
  { 
    day: 'Tue', 
    date: '12/24', 
    temperature: { high: 4, low: -2 }, 
    condition: 'Light Snow', 
    precipitation: 70 
  },
  { 
    day: 'Wed', 
    date: '12/25', 
    temperature: { high: 1, low: -5 }, 
    condition: 'Snow', 
    precipitation: 85 
  },
  { 
    day: 'Thu', 
    date: '12/26', 
    temperature: { high: -1, low: -7 }, 
    condition: 'Cloudy', 
    precipitation: 15 
  },
  { 
    day: 'Fri', 
    date: '12/27', 
    temperature: { high: 3, low: -3 }, 
    condition: 'Partly Sunny', 
    precipitation: 10 
  },
  { 
    day: 'Sat', 
    date: '12/28', 
    temperature: { high: 5, low: -1 }, 
    condition: 'Sunny', 
    precipitation: 5 
  },
  { 
    day: 'Sun', 
    date: '12/29', 
    temperature: { high: 2, low: -4 }, 
    condition: 'Light Snow', 
    precipitation: 60 
  }
];

// STEAMBOAT SPRINGS - Colorado (Classic powder conditions)
export const steamboatSpringsWeeklyForecast: WeeklyWeatherData[] = [
  { 
    day: 'Mon', 
    date: '12/23', 
    temperature: { high: -3, low: -12 }, 
    condition: 'Fresh Snow', 
    precipitation: 90 
  },
  { 
    day: 'Tue', 
    date: '12/24', 
    temperature: { high: -1, low: -10 }, 
    condition: 'Powder Snow', 
    precipitation: 80 
  },
  { 
    day: 'Wed', 
    date: '12/25', 
    temperature: { high: -5, low: -15 }, 
    condition: 'Bluebird Day', 
    precipitation: 0 
  },
  { 
    day: 'Thu', 
    date: '12/26', 
    temperature: { high: -2, low: -11 }, 
    condition: 'Partly Cloudy', 
    precipitation: 20 
  },
  { 
    day: 'Fri', 
    date: '12/27', 
    temperature: { high: 1, low: -8 }, 
    condition: 'Light Snow', 
    precipitation: 65 
  },
  { 
    day: 'Sat', 
    date: '12/28', 
    temperature: { high: -4, low: -13 }, 
    condition: 'Heavy Snow', 
    precipitation: 95 
  },
  { 
    day: 'Sun', 
    date: '12/29', 
    temperature: { high: -6, low: -16 }, 
    condition: 'Sunny', 
    precipitation: 5 
  }
];

// VAIL RESORT - Colorado (High altitude, variable conditions)
export const vailWeeklyForecast: WeeklyWeatherData[] = [
  { 
    day: 'Mon', 
    date: '12/23', 
    temperature: { high: -2, low: -11 }, 
    condition: 'Partly Cloudy', 
    precipitation: 25 
  },
  { 
    day: 'Tue', 
    date: '12/24', 
    temperature: { high: 0, low: -9 }, 
    condition: 'Light Snow', 
    precipitation: 55 
  },
  { 
    day: 'Wed', 
    date: '12/25', 
    temperature: { high: -4, low: -14 }, 
    condition: 'Bluebird Day', 
    precipitation: 0 
  },
  { 
    day: 'Thu', 
    date: '12/26', 
    temperature: { high: -1, low: -10 }, 
    condition: 'Snow Showers', 
    precipitation: 70 
  },
  { 
    day: 'Fri', 
    date: '12/27', 
    temperature: { high: 2, low: -7 }, 
    condition: 'Variable Clouds', 
    precipitation: 30 
  },
  { 
    day: 'Sat', 
    date: '12/28', 
    temperature: { high: -3, low: -12 }, 
    condition: 'Fresh Snow', 
    precipitation: 85 
  },
  { 
    day: 'Sun', 
    date: '12/29', 
    temperature: { high: -5, low: -15 }, 
    condition: 'Sunny', 
    precipitation: 10 
  }
];

// Helper function to get forecast by coordinates (for your WeeklyWeatherBox component)
export const getWeeklyForecastByCoordinates = (latitude?: number, longitude?: number): WeeklyWeatherData[] => {
  if (!latitude || !longitude) return [];
  
  // Convert to numbers if they're strings
  const lat = typeof latitude === 'string' ? parseFloat(latitude) : latitude;
  const lng = typeof longitude === 'string' ? parseFloat(longitude) : longitude;
  
  console.log('Looking up weather for coordinates:', lat, lng);
  
  // Sugar Mountain coordinates: 36.1301, -81.8712 (more precise matching)
  if (Math.abs(lat - 36.1301) < 0.1 && Math.abs(lng - (-81.8712)) < 0.1) {
    console.log('Matched Sugar Mountain weather');
    return sugarMountainWeeklyForecast;
  }
  
  // Steamboat Springs coordinates: 40.4586, -106.8067  
  if (Math.abs(lat - 40.4586) < 0.1 && Math.abs(lng - (-106.8067)) < 0.1) {
    console.log('Matched Steamboat Springs weather');
    return steamboatSpringsWeeklyForecast;
  }
  
  // Vail coordinates: 39.6061, -106.3550
  if (Math.abs(lat - 39.6061) < 0.1 && Math.abs(lng - (-106.3550)) < 0.1) {
    console.log('Matched Vail weather');
    return vailWeeklyForecast;
  }
  
  console.log('No weather match found for coordinates:', lat, lng);
  // Default fallback for other resorts
  return [];
};

// Alternative: Function to get forecast by resort ID
export const getWeeklyForecastByResortId = (resortId: string): WeeklyWeatherData[] => {
  switch (resortId) {
    case 'sugar-mountain-nc-demo':
      return sugarMountainWeeklyForecast;
    case 'steamboat-springs-co-demo':
      return steamboatSpringsWeeklyForecast;
    case 'vail-colorado-demo':
      return vailWeeklyForecast;
    default:
      return [];
  }
};