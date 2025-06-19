import React from 'react';
import { Car, Plane, Train, MapPin, Clock, DollarSign } from 'lucide-react';

interface Transportation {
  type: string;
  price: number;
}

interface TransportationPlaceholderProps {
  selectedTransport: Transportation | null;
  onSelect: (transportation: Transportation) => void;
}

const TransportationPlaceholder: React.FC<TransportationPlaceholderProps> = ({ 
  selectedTransport, 
  onSelect 
}) => {
  const transportOptions = [
    {
      id: 'drive',
      type: 'Drive',
      icon: Car,
      description: 'Drive your own vehicle',
      estimatedTime: '4-6 hours',
      estimatedCost: 'Gas + Parking',
      pros: ['Flexibility', 'Luggage space'],
      cons: ['Weather dependent', 'Parking fees']
    },
    {
      id: 'fly',
      type: 'Fly',
      icon: Plane,
      description: 'Fly to nearest airport',
      estimatedTime: '2-3 hours + transfers',
      estimatedCost: '$200-500',
      pros: ['Fast', 'Weather independent'],
      cons: ['Luggage restrictions', 'Transfer needed']
    },
    {
      id: 'shuttle',
      type: 'Shuttle/Bus',
      icon: Train,
      description: 'Shared transportation',
      estimatedTime: '5-7 hours',
      estimatedCost: '$50-100',
      pros: ['Affordable', 'No driving'],
      cons: ['Fixed schedule', 'Longer journey']
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Transportation</h3>
        <p className="text-gray-600 text-sm mb-4">
          We're working on integrating live transportation options. For now, here's what we recommend:
        </p>
      </div>

      {/* Transport Options Preview */}
      <div className="space-y-4">
        {transportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{option.type}</h4>
                  <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {option.estimatedTime}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {option.estimatedCost}
                    </div>
                  </div>

                  <div className="mt-2 flex space-x-4">
                    <div>
                      <span className="text-xs font-medium text-green-700">Pros:</span>
                      <span className="text-xs text-gray-600 ml-1">
                        {option.pros.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-red-700">Cons:</span>
                      <span className="text-xs text-gray-600 ml-1">
                        {option.cons.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coming Soon Notice */}
      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
        <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-3" />
        <h4 className="font-medium text-blue-900 mb-2">Transportation Booking Coming Soon!</h4>
        <p className="text-blue-700 text-sm mb-4">
          We're partnering with transportation providers to offer seamless booking. 
          For now, you can plan your trip and book transport separately.
        </p>
        <button 
          onClick={() => onSelect({ type: 'placeholder', price: 0 })}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Continue Planning
        </button>
      </div>

      {/* Selected State */}
      {selectedTransport && (
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-700">
            ✓ Transportation planning noted - you can book separately
          </p>
        </div>
      )}
    </div>
  );
};

export default TransportationPlaceholder;