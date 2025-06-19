import React from 'react';
import { Calendar, MapPin, Home, Car, Edit3, Share2, Download, CheckCircle } from 'lucide-react';

interface TripData {
  resort: {
    name: string;
    location: string;
    basePrice: number;
    image: string;
  } | null;
  dates: {
    start: string;
    end: string;
  } | null;
  accommodation: {
    name: string;
    distance: string;
    pricePerNight: number;
    image: string;
  } | null;
  transportation: any;
}

interface TripReviewProps {
  tripData: TripData;
  onEdit?: (step: number) => void;
}

const TripReview: React.FC<TripReviewProps> = ({ tripData, onEdit }) => {
  const calculateTotal = () => {
    if (!tripData.dates || !tripData.accommodation || !tripData.resort) return 0;
    
    const days = Math.ceil((new Date(tripData.dates.end) - new Date(tripData.dates.start)) / (1000 * 60 * 60 * 24));
    const accommodationTotal = tripData.accommodation.pricePerNight * days;
    const liftTickets = tripData.resort.basePrice * days;
    
    return accommodationTotal + liftTickets;
  };

  const getDays = () => {
    if (!tripData.dates) return 0;
    return Math.ceil((new Date(tripData.dates.end) - new Date(tripData.dates.start)) / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const days = getDays();
  const total = calculateTotal();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Review Your Trip</h3>
        <p className="text-gray-600 text-sm">
          Review all details before booking your adventure
        </p>
      </div>

      {/* Trip Summary Cards */}
      <div className="space-y-4">
        {/* Resort */}
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-gray-900">Resort</h4>
            </div>
            {onEdit && (
              <button 
                onClick={() => onEdit(0)}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            )}
          </div>
          {tripData.resort && (
            <div className="flex items-center space-x-3">
              <img 
                src={tripData.resort.image} 
                alt={tripData.resort.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium">{tripData.resort.name}</p>
                <p className="text-sm text-gray-600">{tripData.resort.location}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Dates */}
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-gray-900">Dates</h4>
            </div>
            {onEdit && (
              <button 
                onClick={() => onEdit(1)}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            )}
          </div>
          {tripData.dates && (
            <div>
              <p className="font-medium">
                {formatDate(tripData.dates.start)} - {formatDate(tripData.dates.end)}
              </p>
              <p className="text-sm text-gray-600">{days} days</p>
            </div>
          )}
        </div>
        
        {/* Accommodation */}
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Home className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium text-gray-900">Accommodation</h4>
            </div>
            {onEdit && (
              <button 
                onClick={() => onEdit(2)}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            )}
          </div>
          {tripData.accommodation && (
            <div className="flex items-center space-x-3">
              <img 
                src={tripData.accommodation.image} 
                alt={tripData.accommodation.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium">{tripData.accommodation.name}</p>
                <p className="text-sm text-blue-600">{tripData.accommodation.distance}</p>
                <p className="text-sm text-gray-600">${tripData.accommodation.pricePerNight}/night</p>
              </div>
            </div>
          )}
        </div>

        {/* Transportation */}
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Car className="w-5 h-5 text-orange-600" />
              <h4 className="font-medium text-gray-900">Transportation</h4>
            </div>
            {onEdit && (
              <button 
                onClick={() => onEdit(3)}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600">Plan separately (coming soon)</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <h4 className="font-semibold text-gray-900 mb-4">Cost Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Accommodation ({days} nights)</span>
            <span className="font-medium">${tripData.accommodation ? tripData.accommodation.pricePerNight * days : 0}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Lift tickets ({days} days)</span>
            <span className="font-medium">${tripData.resort ? tripData.resort.basePrice * days : 0}</span>
          </div>
          <div className="border-t border-green-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-green-700">${total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex space-x-3">
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Save to Drafts</span>
          </button>
          <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Book Trip</span>
          </button>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center justify-center space-x-1">
            <Share2 className="w-4 h-4" />
            <span>Share Trip</span>
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center justify-center space-x-1">
            <Download className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripReview;