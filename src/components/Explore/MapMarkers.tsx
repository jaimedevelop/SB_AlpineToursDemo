import { Marker } from 'react-map-gl';
import { MapPin, Heart } from 'lucide-react';
import { Resort } from '../../types/types';

interface MapMarkersProps {
  filteredResorts: Resort[];
  selectedLocationCoords: [number, number] | null;
  onResortSelect: (resort: Resort) => void;
  favoriteResorts: Set<string>;
}

export default function MapMarkers({
  filteredResorts,
  selectedLocationCoords,
  onResortSelect,
  favoriteResorts
}: MapMarkersProps) {
  
  return (
    <>
      {/* Resort markers */}
      {filteredResorts.map((resort, index) => (
        resort.latitude && resort.longitude ? (
          <Marker
            key={index}
            latitude={Number(resort.latitude)}
            longitude={Number(resort.longitude)}
            onClick={e => {
              e.originalEvent.stopPropagation();
              onResortSelect(resort);
            }}
          >
            <div className="relative cursor-pointer">
              {/* Main marker icon */}
              <MapPin className="text-blue-600 hover:text-blue-800 transition-colors" size={24} />
              
              {/* Favorite heart overlay - visual indicator only */}
              {favoriteResorts.has(resort.name) && (
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <Heart 
                    className="text-red-500 fill-red-500" 
                    size={12}
                  />
                </div>
              )}
            </div>
          </Marker>
        ) : null
      ))}
      
      {/* Selected location marker */}
      {selectedLocationCoords && (
        <Marker
          latitude={selectedLocationCoords[1]}
          longitude={selectedLocationCoords[0]}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="#f00" fillRule="evenodd" clipRule="evenodd">
              <path d="M16.272 10.272a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
              <path d="M5.794 16.518a9 9 0 1 1 12.724-.312l-6.206 6.518zm11.276-1.691l-4.827 5.07l-5.07-4.827a7 7 0 1 1 9.897-.243" />
            </g>
          </svg>
        </Marker>
      )}
    </>
  );
}