import React, { useState } from 'react';
import Map from '../components/Map';
import { 
  Package, 
  Star, 
  ShoppingCart, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Circle,
  Heart,
  Camera,
  Users,
  Thermometer,
  Award,
  Zap,
  ArrowRight,
  Filter,
  Search,
  ChevronDown,
  Info
} from 'lucide-react';

const Gear: React.FC = () => {
  const [mode, setMode] = useState<'general' | 'trip'>('general');
  const [selectedCategory, setSelectedCategory] = useState<'never-skip' | 'nice-to-have' | 'advanced'>('never-skip');
  const [gearScore, setGearScore] = useState(78);
  const [showFilters, setShowFilters] = useState(false);

  const gearCategories = {
    'never-skip': {
      title: 'Never Skip',
      color: 'red',
      items: [
        { name: 'Helmet', owned: true, priority: 'critical' },
        { name: 'Goggles', owned: true, priority: 'critical' },
        { name: 'Ski Boots', owned: true, priority: 'critical' },
        { name: 'Skis & Bindings', owned: false, priority: 'critical' },
        { name: 'Ski Poles', owned: true, priority: 'critical' },
      ]
    },
    'nice-to-have': {
      title: 'Nice to Have',
      color: 'blue',
      items: [
        { name: 'Hand Warmers', owned: false, priority: 'medium' },
        { name: 'Neck Gaiter', owned: true, priority: 'medium' },
        { name: 'Ski Socks (Extra)', owned: true, priority: 'medium' },
        { name: 'Portable Charger', owned: false, priority: 'medium' },
      ]
    },
    'advanced': {
      title: 'Advanced Gear',
      color: 'purple',
      items: [
        { name: 'Avalanche Beacon', owned: false, priority: 'advanced' },
        { name: 'Ski Wax Kit', owned: false, priority: 'advanced' },
        { name: 'Boot Warmers', owned: false, priority: 'advanced' },
        { name: 'Action Camera', owned: true, priority: 'advanced' },
      ]
    }
  };

  const nearbyShops = [
    { name: 'Alpine Sports', distance: '0.3 mi', rating: 4.8, specialty: 'Boot Fitting', inStock: 12 },
    { name: 'Mountain Gear Co.', distance: '0.7 mi', rating: 4.6, specialty: 'Rentals', inStock: 8 },
    { name: 'Powder Pro Shop', distance: '1.2 mi', rating: 4.9, specialty: 'Expert Gear', inStock: 15 },
  ];

  const tripRecommendations = [
    { 
      item: 'Softer Wax', 
      reason: 'Whistler temps averaging 28°F this week',
      action: 'rent',
      shop: 'Alpine Sports'
    },
    { 
      item: 'Extra Layers', 
      reason: 'Weather forecast shows variable conditions',
      action: 'buy',
      shop: 'Mountain Gear Co.'
    },
    { 
      item: 'Powder Skis', 
      reason: '8" fresh snow expected tomorrow',
      action: 'rent',
      shop: 'Powder Pro Shop'
    },
  ];

  const renderGearItem = (item: any, categoryColor: string) => (
    <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        {item.owned ? (
          <CheckCircle2 className={`w-5 h-5 text-${categoryColor}-600`} />
        ) : (
          <Circle className="w-5 h-5 text-gray-400" />
        )}
        <span className={`font-medium ${item.owned ? 'text-gray-900' : 'text-gray-600'}`}>
          {item.name}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Camera className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-pointer" />
        <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  );

  const renderTripRecommendation = (rec: any) => (
    <div key={rec.item} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-gray-900">{rec.item}</h4>
          <p className="text-sm text-gray-600 mt-1">{rec.reason}</p>
          <p className="text-xs text-blue-600 mt-1">Available at {rec.shop}</p>
        </div>
        <div className="flex space-x-2">
          <button className={`px-3 py-1 rounded-full text-xs font-medium ${
            rec.action === 'rent' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {rec.action === 'rent' ? 'Rent' : 'Buy'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gear</h1>
            <p className="text-gray-600 text-sm mt-1">
              {mode === 'general' ? 'Manage your ski equipment' : 'Trip-specific gear recommendations'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMode('general')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  mode === 'general'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setMode('trip')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  mode === 'trip'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Trip Mode
              </button>
            </div>
          </div>
        </div>
        
        {mode === 'general' && (
          <div className="flex items-center justify-between mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-blue-600" />
              <div>
                <span className="text-sm font-medium text-gray-900">Gear Score</span>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${gearScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{gearScore}%</span>
                </div>
              </div>
            </div>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
        )}
      </header>
      
      <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">
        {mode === 'general' ? (
          <div className="space-y-6">
            {/* Category Selector */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {Object.entries(gearCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as any)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedCategory === key
                      ? `bg-${category.color}-100 text-${category.color}-700 border-2 border-${category.color}-200`
                      : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Selected Category Items */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {gearCategories[selectedCategory].title}
                </h2>
                <div className="flex items-center space-x-2">
                  <Camera className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer" />
                  <span className="text-xs text-gray-500">Photo Checklist</span>
                </div>
              </div>
              <div className="space-y-3">
                {gearCategories[selectedCategory].items.map(item => 
                  renderGearItem(item, gearCategories[selectedCategory].color)
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center mb-3">
                  <Package className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">My Gear</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Track owned equipment</p>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Manage Collection
                </button>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center mb-3">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Wishlist</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Save items for later</p>
                <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  View Wishlist
                </button>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Gear Buddies</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Share with friends</p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Find Buddies
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Trip Context */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Whistler, BC</span>
                  <span className="text-sm text-gray-500">• March 15-18</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">28°F avg</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>❄️ 8" fresh snow expected</span>
                <span>🌨️ Variable conditions</span>
                <span>👥 Going with 3 friends</span>
              </div>
            </div>

            {/* Smart Recommendations */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Smart Recommendations</h2>
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-500">Based on weather & location</span>
                </div>
              </div>
              <div className="space-y-3">
                {tripRecommendations.map(renderTripRecommendation)}
              </div>
            </div>

            {/* Map and Nearby Shops */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Nearby Shops</h2>
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Filter className="w-4 h-4 text-gray-400 cursor-pointer" />
                  </div>
                </div>
                <div className="h-48 mb-4">
                  <Map />
                </div>
                <div className="space-y-2">
                  {nearbyShops.map((shop, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{shop.name}</div>
                        <div className="text-xs text-gray-500">{shop.distance} • ⭐ {shop.rating}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-green-600 font-medium">{shop.inStock} items</div>
                        <div className="text-xs text-gray-500">{shop.specialty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {/* Local Pro Tips */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center mb-3">
                    <Star className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Local Pro Tips</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">💡 Alpine Sports has the best boot fitting in town</p>
                    <p className="text-gray-700">🎿 Locals recommend softer wax for current conditions</p>
                    <p className="text-gray-700">⛷️ Powder Pro Shop offers group rental discounts</p>
                  </div>
                </div>

                {/* Gear Buddies Coordination */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Users className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Gear Buddies</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Sarah needs: Helmet</span>
                      <button className="text-blue-600 hover:text-blue-700">Share</button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Mike renting: Powder skis</span>
                      <button className="text-blue-600 hover:text-blue-700">Join</button>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Coordinate Rentals
                  </button>
                </div>

                {/* Weather Adaptive */}
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Thermometer className="w-5 h-5 text-orange-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Weather Adaptive</h3>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Based on Whistler's March conditions, we recommend:
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      <span>Extra base layers</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      <span>Waterproof gloves</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      <span>Anti-fog spray</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Gear;