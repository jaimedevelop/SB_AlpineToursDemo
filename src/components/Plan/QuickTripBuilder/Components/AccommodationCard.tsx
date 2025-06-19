import React from 'react';
import { Check, Star } from 'lucide-react';

interface Accommodation {
  id: number;
  name: string;
  distance: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  image: string;
}

interface AccommodationCardProps {
  accommodation: Accommodation;
  onSelect: (accommodation: Accommodation) => void;
  selected: boolean;
  showAmenities?: boolean;
  maxAmenities?: number;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ 
  accommodation, 
  onSelect, 
  selected,
  showAmenities = true,
  maxAmenities = 2
}) => {
  return (
    <div 
      onClick={() => onSelect(accommodation)}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        selected 
          ? 'border-blue-500 bg-blue-50 shadow-sm' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex space-x-3">
        <img 
          src={accommodation.image} 
          alt={accommodation.name} 
          className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h5 className="font-medium text-gray-900 truncate">{accommodation.name}</h5>
          <p className="text-sm text-blue-600 font-medium mt-1">{accommodation.distance}</p>
          <div className="flex items-center mt-1">
            <Star className="w-3 h-3 text-yellow-500 mr-1" />
            <span className="text-sm text-gray-600">{accommodation.rating}</span>
          </div>
          {showAmenities && accommodation.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {accommodation.amenities.slice(0, maxAmenities).map(amenity => (
                <span 
                  key={amenity} 
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {accommodation.amenities.length > maxAmenities && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{accommodation.amenities.length - maxAmenities} more
                </span>
              )}
            </div>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-bold text-green-600">${accommodation.pricePerNight}</p>
          <p className="text-xs text-gray-500">per night</p>
          {selected && (
            <Check className="w-5 h-5 text-blue-500 mt-1 mx-auto" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;