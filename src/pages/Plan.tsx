import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Plane, 
  Hotel, 
  Car,
  Zap,
  Star,
  TrendingUp,
  ChevronRight,
  Plus,
  Search,
  Target,
  CheckCircle2,
  AlertCircle,
  Snowflake,
  Sun,
  Cloud,
  Mountain,
  Award,
  Heart,
  Camera,
  ArrowRight,
  Clock as ClockIcon,
  User,
  Globe,
  Compass,
  Route,
  Briefcase
} from 'lucide-react';
import PlanHeader, { PlanningMode } from '../components/Plan/PlanHeader';

const Plan: React.FC = () => {
  const navigate = useNavigate();
  const [planningMode, setPlanningMode] = useState<PlanningMode>('express');
  const [userType, setUserType] = useState<'new' | 'veteran'>('new');
  const [selectedResort, setSelectedResort] = useState<string | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const popularResorts = [
    {
      id: 'whistler',
      name: 'Whistler Blackcomb',
      location: 'British Columbia, Canada',
      image: 'https://images.pexels.com/photos/358238/pexels-photo-358238.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      difficulty: 'All Levels',
      trending: true,
      quickFacts: ['2 Mountains', '8,171 Acres', '37 Lifts'],
      basePrice: 120
    },
    {
      id: 'aspen',
      name: 'Aspen Snowmass',
      location: 'Colorado, USA',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      difficulty: 'Intermediate+',
      trending: false,
      quickFacts: ['4 Mountains', '5,527 Acres', '41 Lifts'],
      basePrice: 180
    },
    {
      id: 'chamonix',
      name: 'Chamonix Mont-Blanc',
      location: 'France',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      difficulty: 'Advanced',
      trending: true,
      quickFacts: ['Multiple Areas', '2,800 Acres', '47 Lifts'],
      basePrice: 95
    }
  ];

  const currentTrips = [
    {
      id: 1,
      destination: 'Whistler Blackcomb',
      dates: 'March 15-18, 2024',
      status: 'planning',
      progress: 65,
      daysLeft: 21,
      tasks: {
        completed: 8,
        total: 12
      }
    },
    {
      id: 2,
      destination: 'Vail Resort',
      dates: 'April 2-5, 2024',
      status: 'booked',
      progress: 90,
      daysLeft: 38,
      tasks: {
        completed: 11,
        total: 12
      }
    }
  ];

  const timelineItems = [
    {
      date: '2024-02-24',
      type: 'fitness',
      title: 'Start Pre-Trip Training',
      status: 'completed',
      description: 'Begin 3-week ski conditioning program'
    },
    {
      date: '2024-03-01',
      type: 'gear',
      title: 'Gear Check & Prep',
      status: 'active',
      description: 'Inspect equipment, book rentals if needed'
    },
    {
      date: '2024-03-08',
      type: 'booking',
      title: 'Final Bookings',
      status: 'pending',
      description: 'Confirm lift tickets and restaurant reservations'
    },
    {
      date: '2024-03-12',
      type: 'weather',
      title: 'Weather Check',
      status: 'pending',
      description: 'Monitor conditions and pack accordingly'
    },
    {
      date: '2024-03-15',
      type: 'trip',
      title: 'Trip Begins!',
      status: 'upcoming',
      description: 'Whistler Blackcomb adventure starts'
    }
  ];

  // Handle resort card click - navigate to QuickTripBuilder with resort parameter
  const handlePlanTripHere = (resort) => {
    navigate(`/plan/quick-trip-builder?resort=${resort.id}`);
  };

  // Handle QuickTripBuilder launch without pre-selected resort
  const handleQuickTripBuilder = () => {
    navigate('/plan/quick-trip-builder');
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'fitness': return <Target className="w-4 h-4" />;
      case 'gear': return <Briefcase className="w-4 h-4" />;
      case 'booking': return <Calendar className="w-4 h-4" />;
      case 'weather': return <Cloud className="w-4 h-4" />;
      case 'trip': return <Mountain className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'upcoming': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderNewUserExperience = () => (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center mb-4">
          <Compass className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Ready for Your First Adventure?</h2>
        </div>
        <p className="text-gray-700 mb-4">
          No favorites yet? Let's explore some amazing resorts and help you plan the perfect trip!
        </p>
        <div className="flex space-x-3">
          <button 
            onClick={() => navigate('/explore')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Globe className="w-4 h-4" />
            <span>Explore Resorts</span>
          </button>
          <button className="bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
            Take Quiz
          </button>
        </div>
      </div>

      {/* Quick Start Options */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Start Options</h3>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600">Trending Now</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {popularResorts.map((resort) => (
            <div 
              key={resort.id}
              className="relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative h-32">
                <img 
                  src={resort.image} 
                  alt={resort.name}
                  className="w-full h-full object-cover"
                />
                {resort.trending && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Trending
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  ⭐ {resort.rating}
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-gray-900 mb-1">{resort.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{resort.location}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {resort.difficulty}
                  </span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  {resort.quickFacts.map((fact, index) => (
                    <div key={index}>• {fact}</div>
                  ))}
                </div>
                <button 
                  onClick={() => handlePlanTripHere(resort)}
                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Plan Trip Here
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVeteranExperience = () => (
    <div className="space-y-6">
      {/* Current Trips */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Current Trips</h2>
          <button 
            onClick={handleQuickTripBuilder}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Trip</span>
          </button>
        </div>
        <div className="space-y-4">
          {currentTrips.map((trip) => (
            <div key={trip.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{trip.destination}</h3>
                  <p className="text-sm text-gray-600">{trip.dates}</p>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    trip.status === 'planning' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {trip.status === 'planning' ? 'Planning' : 'Booked'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{trip.daysLeft} days left</div>
                </div>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{trip.tasks.completed}/{trip.tasks.total} tasks</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${trip.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Continue Planning
                </button>
                <button 
                  onClick={() => setShowTimeline(!showTimeline)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Timeline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Trip Builder - Replaced with button to launch new QuickTripBuilder */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Start a New Trip</h3>
        <p className="text-gray-600 mb-4">Use our quick trip builder to plan your next adventure in just a few steps.</p>
        <button 
          onClick={handleQuickTripBuilder}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Quick Trip Builder</span>
        </button>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Trip Timeline</h3>
        <button 
          onClick={() => setShowTimeline(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      <div className="space-y-4">
        {timelineItems.map((item, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
              {getTimelineIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <span className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
              {item.status === 'active' && (
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                  Take Action →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <PlanHeader
        currentMode={planningMode}
        onModeChange={setPlanningMode}
        showTimeline={showTimeline}
        onTimelineToggle={() => setShowTimeline(!showTimeline)}
      />
      
      <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">
        {showTimeline && renderTimeline()}
        
        <div className="space-y-6">
          {userType === 'new' ? renderNewUserExperience() : renderVeteranExperience()}
          
          {/* Smart Planning Assistant */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Smart Planning Assistant</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Just pick your resort and dates - we'll suggest accommodations, transport, gear prep, and create your perfect itinerary.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Mountain className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Resort Match</span>
                </div>
                <p className="text-sm text-gray-600">AI-powered resort recommendations based on your preferences</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Route className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-gray-900">Smart Itinerary</span>
                </div>
                <p className="text-sm text-gray-600">Optimized daily schedules with weather and crowd predictions</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Target className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="font-medium text-gray-900">Prep Timeline</span>
                </div>
                <p className="text-sm text-gray-600">Personalized preparation schedule for fitness and gear</p>
              </div>
            </div>
            <button 
              onClick={handleQuickTripBuilder}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Try Smart Planning</span>
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Planning Inspiration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                  <span className="font-medium text-gray-900">Trending Destinations</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Japan (Niseko)</span>
                    <span className="text-orange-500">+23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Switzerland (Zermatt)</span>
                    <span className="text-orange-500">+18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Canada (Whistler)</span>
                    <span className="text-orange-500">+15%</span>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="font-medium text-gray-900">Planning Tips</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>💡 Book accommodations 2-3 months ahead for best rates</div>
                  <div>🎿 Consider mid-week trips for fewer crowds</div>
                  <div>❄️ Check snow reports 2 weeks before departure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Plan;