import React from 'react';
import { MapPin, Check } from 'lucide-react';

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

interface ResortCardProps {
  resort: Resort;
  onSelect: (resort: Resort) => void;
  selected: boolean;
  variant?: 'default' | 'compact';
}

const ResortCard: React.FC<ResortCardProps> = ({ 
  resort, 
  onSelect, 
  selected, 
  variant = 'default' 
}) => {
  return (
    <div 
      onClick={() => onSelect(resort)}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        selected 
          ? 'border-blue-500 bg-blue-50 shadow-sm' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <img 
          src={resort.image} 
          alt={resort.name} 
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h5 className="font-medium text-gray-900 truncate">{resort.name}</h5>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">{resort.location}</span>
          </p>
          <p className="text-sm text-green-600 font-medium mt-1">
            From ${resort.basePrice}/day
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-sm text-yellow-600 mb-1">★ {resort.rating}</div>
          {selected && (
            <Check className="w-5 h-5 text-blue-500 mx-auto" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResortCard;