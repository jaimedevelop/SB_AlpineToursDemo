import React, { useState } from 'react';
import AccommodationCard from '../Components/AccommodationCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface Accommodation {
  id: number;
  name: string;
  distance: string;
  pricePerNight: number;
  rating: number;
  amenities: string[];
  image: string;
}

interface AccommodationSelectionProps {
  selectedAccommodation: Accommodation | null;
  onSelect: (accommodation: Accommodation) => void;
  accommodations: Accommodation[];
}

const AccommodationSelection: React.FC<AccommodationSelectionProps> = ({ 
  selectedAccommodation, 
  onSelect, 
  accommodations 
}) => {
  const [sortBy, setSortBy] = useState<'price' | 'distance' | 'rating'>('price');
  const [showFilters, setShowFilters] = useState(false);

  const sortAccommodations = (accommodations: Accommodation[]) => {
    return [...accommodations].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.pricePerNight - b.pricePerNight;
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          // Basic distance sorting - ski-in/ski-out first, then by walking time
          const getDistanceValue = (distance: string) => {
            if (distance.toLowerCase().includes('ski-in')) return 0;
            if (distance.toLowerCase().includes('walk')) {
              const minutes = parseInt(distance.match(/\d+/)?.[0] || '999');
              return minutes;
            }
            return 999; // shuttle/other options last
          };
          return getDistanceValue(a.distance) - getDistanceValue(b.distance);
        default:
          return 0;
      }
    });
  };

  const sortedAccommodations = sortAccommodations(accommodations);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Choose Accommodation</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Sort</span>
        </button>
      </div>

      {/* Sort Options */}
      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-3">Sort by:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'price', label: 'Price (Low to High)' },
              { key: 'distance', label: 'Distance to Resort' },
              { key: 'rating', label: 'Rating (High to Low)' }
            ].map(option => (
              <button
                key={option.key}
                onClick={() => setSortBy(option.key as any)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  sortBy === option.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{sortedAccommodations.length} accommodations available</span>
        <span>Sorted by {sortBy}</span>
      </div>
      
      {/* Accommodation Cards */}
      <div className="space-y-3">
        {sortedAccommodations.map(accommodation => (
          <AccommodationCard 
            key={accommodation.id} 
            accommodation={accommodation} 
            onSelect={onSelect} 
            selected={selectedAccommodation?.id === accommodation.id}
            showAmenities={true}
            maxAmenities={3}
          />
        ))}
      </div>

      {/* No Results */}
      {sortedAccommodations.length === 0 && (
        <div className="text-center py-8">
          <Filter className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No accommodations found</p>
          <p className="text-sm text-gray-500">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default AccommodationSelection;