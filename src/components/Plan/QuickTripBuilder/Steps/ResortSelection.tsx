import React from 'react';
import ResortCard from '../Components/ResortCard';

interface Resort {
  id: string;
  name: string;
  location: string;
  image: string;
  basePrice: number;
  rating: number;
  popular?: boolean;
  favorited?: boolean;
}

interface ResortSelectionProps {
  selectedResort: Resort | null;
  onSelect: (resort: Resort) => void;
  favorites: Resort[];
  popular: Resort[];
}

const ResortSelection: React.FC<ResortSelectionProps> = ({ 
  selectedResort, 
  onSelect, 
  favorites, 
  popular 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Choose Your Resort</h3>
        
        {/* Pre-selected Resort (if coming from URL params) */}
        {selectedResort && (
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2 text-green-600">Selected Resort</h4>
            <ResortCard resort={selectedResort} onSelect={onSelect} selected={true} />
            <p className="text-sm text-gray-500 mt-2">You can change this selection below</p>
          </div>
        )}
        
        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2 text-blue-600">Your Favorites</h4>
            <div className="space-y-3">
              {favorites.map(resort => (
                <ResortCard 
                  key={resort.id} 
                  resort={resort} 
                  onSelect={onSelect} 
                  selected={selectedResort?.id === resort.id} 
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Popular Section */}
        <div>
          <h4 className="text-md font-medium mb-2 text-orange-600">Popular Destinations</h4>
          <div className="space-y-3">
            {popular.map(resort => (
              <ResortCard 
                key={resort.id} 
                resort={resort} 
                onSelect={onSelect} 
                selected={selectedResort?.id === resort.id} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortSelection;