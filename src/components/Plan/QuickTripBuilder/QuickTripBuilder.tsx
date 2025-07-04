import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Home, Car, Check } from 'lucide-react';
import StepProgress from './Components/StepProgress';
import PricingSummary from './Components/PricingSummary';
import ResortCard from './Components/ResortCard';
import AccommodationCard from './Components/AccommodationCard';
import ResortSelection from './Steps/ResortSelection';
import DateSelection from './Steps/DateSelection';
import AccommodationSelection from './Steps/AccommodationSelection';
import TransportationPlaceholder from './Steps/TransportationPlaceholder';
import TripReview from './Steps/TripReview';
import { mockDemoResorts } from '../../../data/mockDemoResorts';
import type { Resort } from '../../../types/types';

// Mock Data (keeping your existing mock data as fallback)
const mockResorts = [
  {
    id: 'whistler',
    name: "Whistler Blackcomb",
    location: "British Columbia, Canada",
    image: "https://images.pexels.com/photos/358238/pexels-photo-358238.jpeg?auto=compress&cs=tinysrgb&w=400",
    popular: true,
    favorited: false,
    basePrice: 120,
    rating: 4.8
  },
  {
    id: 'aspen',
    name: "Aspen Snowmass",
    location: "Colorado, USA",
    image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400",
    popular: true,
    favorited: true,
    basePrice: 180,
    rating: 4.9
  },
  {
    id: 'chamonix',
    name: "Chamonix Mont-Blanc",
    location: "France",
    image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400",
    popular: false,
    favorited: true,
    basePrice: 95,
    rating: 4.7
  }
];

const mockAccommodations = [
  {
    id: 1,
    name: "Mountain Lodge & Spa",
    distance: "Ski-in/Ski-out",
    pricePerNight: 220,
    rating: 4.6,
    amenities: ["Pool", "Spa", "Restaurant"],
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=250"
  },
  {
    id: 2,
    name: "Village Inn",
    distance: "2 min walk to lifts",
    pricePerNight: 165,
    rating: 4.4,
    amenities: ["Restaurant", "Bar"],
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=250"
  },
  {
    id: 3,
    name: "Budget Alpine Hotel",
    distance: "10 min shuttle",
    pricePerNight: 89,
    rating: 4.1,
    amenities: ["Breakfast", "WiFi"],
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=250"
  }
];

const QuickTripBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Check for pre-selected resort from navigation state or URL params
  const getInitialResort = () => {
    // First check navigation state (from QuickView)
    if (location.state?.selectedResort) {
      return location.state.selectedResort;
    }
    
    // Fallback to URL params (existing functionality)
    const resortId = searchParams.get('resort');
    if (resortId) {
      // Try to find in demo resorts first
      const demoResort = mockDemoResorts.find(r => r.id === resortId);
      if (demoResort) {
        return demoResort;
      }
      // Fallback to mock resorts
      return mockResorts.find(r => r.id === resortId) || null;
    }
    
    return null;
  };

  // Check if we should skip resort selection (when resort is pre-selected)
  const getInitialStep = () => {
    const initialResort = getInitialResort();
    const context = location.state?.context;
    
    // If resort came from resort selection (QuickView), skip to dates
    if (initialResort && context === 'resort-selection') {
      return 1; // Skip to date selection
    }
    
    return 0; // Start with resort selection
  };

  const [tripData, setTripData] = useState({
    resort: getInitialResort(),
    dates: null,
    accommodation: null,
    transportation: null
  });

  // Set initial step based on pre-selection
  useEffect(() => {
    const initialStep = getInitialStep();
    setCurrentStep(initialStep);
  }, []);

  const steps = [
    { title: 'Resort', icon: MapPin },
    { title: 'Dates', icon: Calendar },
    { title: 'Stay', icon: Home },
    { title: 'Transport', icon: Car },
    { title: 'Review', icon: Check }
  ];

  const favorites = mockResorts.filter(r => r.favorited);
  const popular = mockResorts.filter(r => r.popular);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return tripData.resort !== null;
      case 1: return tripData.dates !== null;
      case 2: return tripData.accommodation !== null;
      case 3: return tripData.transportation !== null;
      default: return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ResortSelection
            selectedResort={tripData.resort}
            onSelect={(resort) => setTripData({...tripData, resort})}
            favorites={favorites}
            popular={popular}
          />
        );
      case 1:
        return (
          <DateSelection
            selectedDates={tripData.dates}
            onSelect={(dates) => setTripData({...tripData, dates})}
            selectedResort={tripData.resort} // Pass resort for context
          />
        );
      case 2:
        return (
          <AccommodationSelection
            selectedAccommodation={tripData.accommodation}
            onSelect={(accommodation) => setTripData({...tripData, accommodation})}
            accommodations={mockAccommodations}
            selectedResort={tripData.resort} // Pass resort for context
          />
        );
      case 3:
        return (
          <TransportationPlaceholder
            selectedTransport={tripData.transportation}
            onSelect={(transportation) => setTripData({...tripData, transportation})}
            selectedResort={tripData.resort} // Pass resort for context
          />
        );
      case 4:
        return (
          <TripReview 
            tripData={tripData} 
            onEdit={(step) => setCurrentStep(step)}
          />
        );
      default:
        return null;
    }
  };

  // Render resort confirmation when resort is pre-selected
  const renderResortConfirmation = () => {
    if (!tripData.resort || currentStep === 0) return null;

    return (
      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img 
                src={tripData.resort.imageUrl || tripData.resort.images?.[0] || '/placeholder-resort.jpg'} 
                alt={tripData.resort.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Resort Selected</span>
              </div>
              <h3 className="font-semibold text-gray-900">{tripData.resort.name}</h3>
              <p className="text-sm text-gray-600">{tripData.resort.state || tripData.resort.location}</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentStep(0)}
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Change Resort
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/plan')}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Plan
            </button>
            <h2 className="text-xl font-bold">Plan Your Trip</h2>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
          
          {/* Resort Confirmation */}
          {renderResortConfirmation()}
          
          {/* Step Progress */}
          <StepProgress currentStep={currentStep} steps={steps} />
          
          {/* Price Summary */}
          {currentStep !== 4 && <PricingSummary tripData={tripData}/>}
        </div>
      </div>

      {/* Step Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto p-4 pb-20">
          {renderStep()}
          
          {/* Navigation Buttons - Moved inside content */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  currentStep === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
              
              <span className="text-sm text-gray-500">
                {currentStep + 1} of {steps.length}
              </span>
              
              <button
                onClick={handleNext}
                disabled={!canProceed() || currentStep === steps.length - 1}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors font-medium ${
                  !canProceed() || currentStep === steps.length - 1
                    ? 'text-gray-400 cursor-not-allowed bg-gray-100'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTripBuilder;