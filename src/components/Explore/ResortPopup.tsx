import { Popup } from 'react-map-gl';
import { useState } from 'react';
import { Resort } from '../types/types';

interface ResortPopupProps {
  resort: Resort;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

// Heart Icons as Components
const FilledHeart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/>
  </svg>
);

const HollowHeart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"/>
  </svg>
);

export default function ResortPopup({ 
  resort, 
  onClose, 
  isFavorite, 
  onToggleFavorite 
}: ResortPopupProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavoriteClick = () => {
    setIsAnimating(true);
    onToggleFavorite();
    setTimeout(() => setIsAnimating(false), 200);
  };

  // Count how many difficulty levels have percentage values
  const difficultyLevels = [
    { 
      value: resort.difficulty.percent.green, 
      color: 'bg-gradient-to-r from-green-500 to-green-600', 
      textColor: 'text-white' 
    },
    { 
      value: resort.difficulty.percent.blue, 
      color: 'bg-gradient-to-r from-blue-400 to-blue-500', 
      textColor: 'text-white' 
    },
    { 
      value: resort.difficulty.percent.doubleBlue, 
      color: 'bg-gradient-to-r from-blue-700 to-blue-800', 
      textColor: 'text-white' 
    },
    { 
      value: resort.difficulty.percent.black, 
      color: 'bg-gradient-to-r from-gray-800 to-black', 
      textColor: 'text-white' 
    },
    { 
      value: resort.difficulty.percent.doubleBlack, 
      color: 'bg-gradient-to-r from-black to-black', 
      textColor: 'text-yellow-400' 
    }
  ].filter(level => level.value && level.value !== "-");
  
  // Calculate equal width percentage based on actual number of difficulties present
  const equalWidth = `${100 / difficultyLevels.length}%`;
  
  return (
    <Popup
      latitude={Number(resort.latitude)}
      longitude={Number(resort.longitude)}
      onClose={onClose}
      closeButton={false} // We'll use our own close button
      closeOnClick={false} // Prevent accidental closes
      offset={16}
      className="custom-popup"
      style={{ 
        // Hide the default popup styling
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: 0
      }}
    >
      <div className="rounded-lg shadow-lg overflow-hidden w-80 bg-white relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 text-white hover:text-gray-200 bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full p-1 transition-all duration-200"
          aria-label="Close popup"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Top Row - Resort Name with Favorite Button */}
        <div className="bg-blue-600 p-3 flex items-center justify-center relative">
          <h3 className="text-lg font-bold text-white">{resort.name}</h3>
          <button
            onClick={handleFavoriteClick}
            className={`
              ml-2 text-white hover:text-red-200 transition-colors duration-200 
              transform ${isAnimating ? 'scale-125' : 'scale-100'} 
              transition-transform duration-200 ease-out
              hover:scale-110 active:scale-95
              focus:outline-none focus:ring-0 border-none bg-transparent
            `}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <FilledHeart /> : <HollowHeart />}
          </button>
        </div>
        
        {/* Middle Row - Ticket Prices */}
        <div className="bg-white p-3 border-x border-gray-200">
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium">Full Day: {resort.fullDayTicket}</p>
            {resort.halfDayTicket && resort.halfDayTicket !== "-" && (
              <p className="text-sm font-medium">Half Day: {resort.halfDayTicket}</p>
            )}
          </div>
        </div>
        
        {/* Bottom Row - Trail Difficulties */}
        <div className="flex h-8">
          {difficultyLevels.map((level, index) => (
            <div 
              key={index}
              className={`${level.color} ${level.textColor} flex items-center justify-center text-xs font-medium`}
              style={{ width: equalWidth }}
            >
              {level.value}%
            </div>
          ))}
        </div>
      </div>
    </Popup>
    
  );
}