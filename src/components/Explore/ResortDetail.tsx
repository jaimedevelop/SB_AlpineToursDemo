//DEMO IMPORT
import { getHotelsForResort } from '../../data/mockDemoResorts';

import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import type { Resort } from '../../types/types';
import { getCachedWeatherForResort } from '../../services/weatherService';

import ImageCarousel from './resortDetail/ImageCarousel';
import CostBox from './resortDetail/CostBox';
import RunDifficultyBox from './resortDetail/RunDifficultyBox';
import DailyWeatherBox from './resortDetail/DailyWeatherBox';
import TrailInformation from './resortDetail/TrailInformation';
import PreferenceMatch from './resortDetail/PreferenceMatch';
import WeeklyWeatherBox from './resortDetail/WeeklyWeatherBox';
import HotelCarouselBox from './resortDetail/HotelCarouselBox';

interface ResortDetailProps {
  resort: Resort;
  onClose?: () => void;
  onPlanTrip?: (resort: Resort) => void; // Add this line
}

export const ResortDetail: React.FC<ResortDetailProps> = ({ resort, onClose, onPlanTrip }) => {
  const [weatherData, setWeatherData] = useState<Resort['weather']>(resort.weather);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  
  // Use the images array if available, otherwise create an array with the single imageUrl
  const images = resort.images || [resort.imageUrl];
  
  // Fetch weather data when component mounts
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoadingWeather(true);
        setWeatherError(null);
        
        // If resort has coordinates, use them
        if (resort.latitude && resort.longitude) {
          const data = await getCachedWeatherForResort(resort.latitude, resort.longitude);
          setWeatherData(data);
        }
        // Otherwise, don't fetch weather
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
        setWeatherError('Unable to load current weather data');
      } finally {
        setIsLoadingWeather(false);
      }
    };
    
    fetchWeatherData();
  }, [resort.latitude, resort.longitude]);

  // Convert percentage string to whole number (e.g., "45%" to 45)
  const parseRunNumber = (value: string | undefined): number | null => {
    if (!value || value === "-") return null;
    
    // Extract just the number part, removing % or any other characters
    const match = value.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  // Run difficulty data
  const difficultyLevels = [
    { 
      name: 'Green',
      value: parseRunNumber(resort.green), 
      color: 'bg-gradient-to-r from-green-500 to-green-600', 
      textColor: 'text-white' 
    },
    { 
      name: 'Blue',
      value: parseRunNumber(resort.blue), 
      color: 'bg-gradient-to-r from-blue-400 to-blue-500', 
      textColor: 'text-white' 
    },
    { 
      name: 'Double Blue',
      value: parseRunNumber(resort.doubleBlue), 
      color: 'bg-gradient-to-r from-blue-700 to-blue-800', 
      textColor: 'text-white' 
    },
    { 
      name: 'Black',
      value: parseRunNumber(resort.black), 
      color: 'bg-gradient-to-r from-gray-800 to-black', 
      textColor: 'text-white' 
    },
    { 
      name: 'Double Black',
      value: parseRunNumber(resort.doubleBlack), 
      color: 'bg-gradient-to-r from-black to-black', 
      textColor: 'text-yellow-400' 
    }
  ].filter(level => level.value !== null);

  /*
  // Mock hotel data - replace with actual data when available
  const mockHotels = resort.hotels || [
    {
      id: "hotel1",
      name: "Mountain Lodge Resort",
      imageUrl: "https://example.com/hotel1.jpg",
      price: 199,
      rating: 4.5,
      amenities: ["Free WiFi", "Breakfast Included", "Ski Storage", "Hot Tub"]
    }
  ];
  */
  //DEMO HOTEL DATA
  // Get hotels for this resort (demo data for our 3 resorts, fallback for others)
const mockHotels = resort.hotels || getHotelsForResort(resort.id) || [
  {
    id: "default-hotel",
    name: "Mountain Lodge Resort",
    imageUrl: "https://example.com/hotel1.jpg",
    price: 199,
    rating: 4.5,
    amenities: ["Free WiFi", "Breakfast Included", "Ski Storage", "Hot Tub"]
  }
];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{resort.name}</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      
      <ImageCarousel images={images} altText={resort.name} />
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <CostBox ticketCost={resort.ticketCost} fullDayTicket={resort.fullDayTicket} halfDayTicket={resort.halfDayTicket} />
<RunDifficultyBox 
  green={resort.difficulty.percent.green}
  blue={resort.difficulty.percent.blue}
  doubleBlue={resort.difficulty.percent.doubleBlue}
  black={resort.difficulty.percent.black}
  doubleBlack={resort.difficulty.percent.doubleBlack}
/>
      </div>
      
      <DailyWeatherBox 
        weatherData={weatherData}
        isLoading={isLoadingWeather}
        error={weatherError}
      />
      
      <WeeklyWeatherBox 
        latitude={resort.latitude}
        longitude={resort.longitude}
      />
      
      <TrailInformation 
        runs={resort.runs}
        difficultyLevels={difficultyLevels}
      />
      
      <HotelCarouselBox hotels={mockHotels} />
      
      {resort.matchPercentage && (
        <PreferenceMatch matchPercentage={resort.matchPercentage} />
      )}

      {/* Add Plan Trip Button */}
      {onPlanTrip && (
        <button
          onClick={() => onPlanTrip(resort)}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mt-4"
        >
          <Calendar size={20} />
          Plan Trip to {resort.name}
        </button>
      )}
    </div>
  );
};