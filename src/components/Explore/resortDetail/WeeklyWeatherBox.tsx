import React, { useState, useEffect } from 'react';
import { Thermometer, CloudSnow, CloudRain, Cloud, Sun } from 'lucide-react';

//DEMO IMPORT
import { getWeeklyForecastByCoordinates } from '../../../data/weeklyWeatherData';

// Define weekly weather data interface
interface WeeklyWeatherData {
  day: string;
  date: string;
  temperature: {
    high: number;
    low: number;
  };
  condition: string;
  precipitation: number;
  icon?: string;
}

interface WeeklyWeatherBoxProps {
  latitude?: number;
  longitude?: number;
}

const WeeklyWeatherBox: React.FC<WeeklyWeatherBoxProps> = ({ latitude, longitude }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [weeklyData, setWeeklyData] = useState<WeeklyWeatherData[]>([]);

  // Helper to get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('snow')) {
      return <CloudSnow size={20} />;
    } else if (conditionLower.includes('rain')) {
      return <CloudRain size={20} />;
    } else if (conditionLower.includes('cloud')) {
      return <Cloud size={20} />;
    } else {
      return <Sun size={20} />;
    }
  };

  // Convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9/5) + 32);
  };

  // Fetch weekly weather data
  useEffect(() => {
    const fetchWeeklyWeather = async () => {
      if (!latitude || !longitude) return;

// Replace the mockData section in the fetchWeeklyWeather function with this:
try {
  setIsLoading(true);
  setError(null);
  
  // Use demo weather data based on coordinates
  const mockData = getWeeklyForecastByCoordinates(latitude, longitude);
  
  // If no demo data found, use generic fallback
  if (mockData.length === 0) {
    const fallbackData: WeeklyWeatherData[] = [
      { 
        day: 'Mon', 
        date: '12/23', 
        temperature: { high: 2, low: -5 }, 
        condition: 'Partly Cloudy', 
        precipitation: 20 
      },
      { 
        day: 'Tue', 
        date: '12/24', 
        temperature: { high: 0, low: -7 }, 
        condition: 'Light Snow', 
        precipitation: 60 
      },
      { 
        day: 'Wed', 
        date: '12/25', 
        temperature: { high: -2, low: -9 }, 
        condition: 'Snow', 
        precipitation: 80 
      },
      { 
        day: 'Thu', 
        date: '12/26', 
        temperature: { high: 1, low: -6 }, 
        condition: 'Cloudy', 
        precipitation: 30 
      },
      { 
        day: 'Fri', 
        date: '12/27', 
        temperature: { high: 3, low: -4 }, 
        condition: 'Partly Sunny', 
        precipitation: 15 
      },
      { 
        day: 'Sat', 
        date: '12/28', 
        temperature: { high: 2, low: -5 }, 
        condition: 'Sunny', 
        precipitation: 5 
      },
      { 
        day: 'Sun', 
        date: '12/29', 
        temperature: { high: 0, low: -8 }, 
        condition: 'Light Snow', 
        precipitation: 50 
      }
    ];
    setWeeklyData(fallbackData);
  } else {
    setWeeklyData(mockData);
  }
  
} catch (error) {
  console.error('Failed to fetch weekly weather data:', error);
  setError('Unable to load weekly forecast');
} finally {
  setIsLoading(false);
}
    };
    
    fetchWeeklyWeather();
  }, [latitude, longitude]);

  if (isLoading) {
    return (
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Thermometer size={20} />
          <span className="ml-2">7-Day Forecast</span>
        </h3>
        <p className="text-gray-600">Loading weekly forecast...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Thermometer size={20} />
          <span className="ml-2">7-Day Forecast</span>
        </h3>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <Thermometer size={20} />
        <span className="ml-2">7-Day Forecast</span>
      </h3>
      
      <div className="grid grid-cols-7 gap-1 mt-4">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="font-medium">{day.day}</div>
            <div className="text-xs text-gray-500">{day.date}</div>
            <div className="my-2">
              {getWeatherIcon(day.condition)}
            </div>
            <div className="text-sm font-medium">
              {celsiusToFahrenheit(day.temperature.high)}°
            </div>
            <div className="text-xs text-gray-500">
              {celsiusToFahrenheit(day.temperature.low)}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyWeatherBox;