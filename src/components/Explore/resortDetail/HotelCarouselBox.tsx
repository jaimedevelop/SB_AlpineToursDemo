import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Wifi, Coffee, Utensils, Car } from 'lucide-react';

// Define the Hotel interface
interface Hotel {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number; // Out of 5
  amenities: string[];
}

interface HotelCarouselBoxProps {
  hotels: Hotel[];
}

interface ImageQuality {
  isHighQuality: boolean;
  loaded: boolean;
  error: boolean;
}

const HotelCarouselBox: React.FC<HotelCarouselBoxProps> = ({ hotels }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageQuality, setImageQuality] = useState<ImageQuality>({
    isHighQuality: true,
    loaded: false,
    error: false
  });
  
  // Skip rendering if no hotels
  if (!hotels || hotels.length === 0) {
    return null;
  }
  
  const currentHotel = hotels[currentIndex];
  
  // Analyze image quality whenever current hotel changes
  useEffect(() => {
    if (!currentHotel?.imageUrl) {
      setImageQuality({ isHighQuality: false, loaded: true, error: true });
      return;
    }
    
    setImageQuality({ isHighQuality: true, loaded: false, error: false });
    
    const img = new Image();
    img.onload = () => {
      const isHighQuality = img.naturalWidth >= 1000 || img.naturalHeight >= 1000;
      setImageQuality({
        isHighQuality,
        loaded: true,
        error: false
      });
    };
    img.onerror = () => {
      setImageQuality({
        isHighQuality: false,
        loaded: true,
        error: true
      });
    };
    img.src = currentHotel.imageUrl;
  }, [currentHotel?.imageUrl]);
  
  const nextHotel = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hotels.length);
  };
  
  const prevHotel = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + hotels.length) % hotels.length);
  };

  // Helper function to get icon for amenity
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) {
      return <Wifi size={16} className="mr-1" />;
    } else if (amenityLower.includes('breakfast') || amenityLower.includes('coffee')) {
      return <Coffee size={16} className="mr-1" />;
    } else if (amenityLower.includes('restaurant') || amenityLower.includes('dining')) {
      return <Utensils size={16} className="mr-1" />;
    } else if (amenityLower.includes('parking')) {
      return <Car size={16} className="mr-1" />;
    } else {
      return null;
    }
  };

  const renderHotelImage = () => {
    // Loading state
    if (!imageQuality.loaded) {
      return (
        <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-xs">Loading...</div>
        </div>
      );
    }
    
    // Error state
    if (imageQuality.error) {
      return (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-xs">Image not available</div>
        </div>
      );
    }
    
    // High quality image - use standard approach
    if (imageQuality.isHighQuality) {
      return (
        <img 
          src={currentHotel.imageUrl} 
          alt={currentHotel.name} 
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      );
    }
    
    // Low quality image - use enhanced mode with blurred background
    return (
      <div className="relative w-full h-full">
        {/* Blurred background */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center blur-md scale-110"
          style={{ 
            backgroundImage: `url(${currentHotel.imageUrl})`,
            filter: 'blur(8px) brightness(0.7)'
          }}
        />
        
        {/* Sharp overlay image */}
        <div className="relative w-full h-full flex items-center justify-center p-1">
          <img 
            src={currentHotel.imageUrl} 
            alt={currentHotel.name} 
            className="max-w-full max-h-full object-contain drop-shadow-lg"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3">Nearby Hotels</h3>
      
      <div className="relative">
        {/* Hotel Image with Quality Detection */}
        <div className="w-full h-48 overflow-hidden rounded-lg mb-3 bg-gray-100">
          {renderHotelImage()}
        </div>
        
        {/* Navigation Arrows (if multiple hotels) */}
        {hotels.length > 1 && (
          <>
            <button 
              onClick={prevHotel}
              className="absolute left-2 top-24 transform -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white/95 transition-colors shadow-lg"
              aria-label="Previous hotel"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextHotel}
              className="absolute right-2 top-24 transform -translate-y-1/2 bg-white/80 rounded-full p-1.5 hover:bg-white/95 transition-colors shadow-lg"
              aria-label="Next hotel"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        
        {/* Hotel Information */}
        <div>
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-semibold">{currentHotel.name}</h4>
            <p className="font-bold text-blue-900">${currentHotel.price}/night</p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < currentHotel.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">
              {currentHotel.rating.toFixed(1)} stars
            </span>
          </div>
          
          {/* Amenities */}
          <div className="mt-2">
            <p className="text-sm text-gray-700 font-medium mb-1">Features & Amenities:</p>
            <div className="flex flex-wrap gap-2">
              {currentHotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center bg-white/70 rounded-full px-2 py-1 text-xs">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Pagination Dots */}
      {hotels.length > 1 && (
        <div className="flex justify-center mt-3">
          {hotels.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full mx-1 transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to hotel ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelCarouselBox;