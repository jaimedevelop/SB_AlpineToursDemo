import React from 'react';

interface TripData {
  resort: {
    basePrice: number;
  } | null;
  dates: {
    start: string;
    end: string;
  } | null;
  accommodation: {
    pricePerNight: number;
  } | null;
  transportation: any;
}

interface PricingSummaryProps {
  tripData: TripData;
  className?: string;
}

const PricingSummary: React.FC<PricingSummaryProps> = ({ tripData, className = "" }) => {
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

  const total = calculateTotal();
  
  if (total === 0) return null;

  return (
    <div className={`bg-green-50 border border-green-200 rounded-lg p-3 ${className}`}>
      <div className="space-y-2">
        {/* Trip Duration */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-green-700">Trip Duration</span>
          <span className="text-green-700 font-medium">{getDays()} days</span>
        </div>
        
        {/* Accommodation Cost */}
        {tripData.accommodation && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-700">Accommodation</span>
            <span className="text-green-700">${tripData.accommodation.pricePerNight} × {getDays()}</span>
          </div>
        )}
        
        {/* Lift Tickets */}
        {tripData.resort && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-green-700">Lift Tickets</span>
            <span className="text-green-700">${tripData.resort.basePrice} × {getDays()}</span>
          </div>
        )}
        
        {/* Total */}
        <div className="border-t border-green-200 pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-green-800">Trip Total</span>
            <span className="text-lg font-bold text-green-700">${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSummary;