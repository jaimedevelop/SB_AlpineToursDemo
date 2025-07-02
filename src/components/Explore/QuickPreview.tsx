import React from 'react';
import { X, DollarSign, Mountain, Star, Calendar, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Resort } from '../../types/types';

interface QuickPreviewProps {
  resort: Resort;
  onClose: () => void;
  onViewDetails: () => void;
  onPlanTrip?: () => void; // Make optional since we'll handle it internally
}

const QuickPreview: React.FC<QuickPreviewProps> = ({ 
  resort, 
  onClose, 
  onViewDetails, 
  onPlanTrip 
}) => {
  const navigate = useNavigate();

  // Handle Plan Trip navigation
  const handlePlanTrip = () => {
    // Navigate to QuickTripBuilder with resort pre-selected
navigate(`/plan/quick-trip-builder?resort=${resort.id}`);
    
    // Call the original onPlanTrip if provided (for any cleanup)
    if (onPlanTrip) {
      onPlanTrip();
    }
  };

  // Format price for display
  const formatPrice = (price: number | string | undefined) => {
    if (!price) return '??';
    if (typeof price === 'string') {
      return price.startsWith('$') ? price.substring(1) : price;
    }
    return String(price);
  };

  // Get primary difficulty level for quick display
  const getPrimaryDifficulty = () => {
    if (resort.difficulty?.percent?.green && resort.difficulty.percent.green !== '-') return 'Beginner Friendly';
    if (resort.difficulty?.percent?.blue && resort.difficulty.percent.blue !== '-') return 'Intermediate';
    if (resort.difficulty?.percent?.black && resort.difficulty.percent.black !== '-') return 'Advanced';
    if (resort.difficulty?.percent?.doubleBlack && resort.difficulty.percent.doubleBlack !== '-') return 'Expert Only';
    return 'All Levels';
  };

  // Get snow conditions or weather info
  const getConditions = () => {
    if (resort.weather?.snowfall && resort.weather.snowfall > 0) {
      const inches = Math.round(resort.weather.snowfall * 0.3937 * 10) / 10;
      return `${inches}" fresh snow`;
    }
    if (resort.weather?.condition) {
      return resort.weather.condition;
    }
    return 'Good conditions';
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-lg shadow-2xl p-4 z-50">
      <div className="flex items-start gap-3">
        {/* Resort Image */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={resort.imageUrl || resort.images?.[0] || '/placeholder-resort.jpg'} 
            alt={resort.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Resort Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg truncate">{resort.name}</h3>
              <p className="text-sm text-gray-600 truncate">{resort.state || 'Ski Resort'}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors ml-2 flex-shrink-0"
              aria-label="Close preview"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-3 mt-2 text-sm">
            <div className="flex items-center text-green-600">
              <DollarSign size={14} className="mr-1" />
              <span className="font-medium">${formatPrice(resort.ticketCost || resort.fullDayTicket)}</span>
            </div>
            <div className="flex items-center text-blue-600">
              <Mountain size={14} className="mr-1" />
              <span>{getPrimaryDifficulty()}</span>
            </div>
            {resort.rating && (
              <div className="flex items-center text-yellow-600">
                <Star size={14} className="mr-1" />
                <span>{resort.rating}</span>
              </div>
            )}
          </div>
          
          {/* Conditions */}
          <div className="mt-1">
            <span className="text-xs text-gray-500">{getConditions()}</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={onViewDetails}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Eye size={16} />
          View Details
        </button>
        <button
          onClick={handlePlanTrip}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Calendar size={16} />
          Plan Trip
        </button>
      </div>
    </div>
  );
};

export default QuickPreview;