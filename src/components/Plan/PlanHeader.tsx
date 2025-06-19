import React from 'react';
import { 
  Filter,
  Calendar,
  Zap,
  Users
} from 'lucide-react';

export type PlanningMode = 'express' | 'group';

interface PlanHeaderProps {
  currentMode: PlanningMode;
  onModeChange: (mode: PlanningMode) => void;
  showTimeline: boolean;
  onTimelineToggle: () => void;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({
  currentMode,
  onModeChange,
  showTimeline,
  onTimelineToggle
}) => {
  const planningModes = {
    express: {
      title: 'Express Planning',
      description: 'Smart trip planning with AI-powered suggestions',
      icon: Zap,
      color: 'green',
      features: ['AI recommendations', 'Popular choices', '15-min setup', 'Full customization']
    },
    group: {
      title: 'Group Trip',
      description: 'Coordinate with friends and family',
      icon: Users,
      color: 'purple',
      features: ['Group coordination', 'Shared planning', 'Split costs', 'Vote on options']
    }
  };

  const getModeIndex = (mode: PlanningMode): number => {
    const modes: PlanningMode[] = ['express', 'group'];
    return modes.indexOf(mode);
  };

  const handleModeChange = (newMode: PlanningMode) => {
    const currentIndex = getModeIndex(currentMode);
    const newIndex = getModeIndex(newMode);
    
    // Add slight delay for smooth transition effect
    if (currentIndex !== newIndex) {
      onModeChange(newMode);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
      {/* Header Top Section */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plan</h1>
          <p className="text-gray-600 text-sm mt-1">Smart trip planning made simple</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* FOR FUTURE FILTER BUTTON DEVELOPMENT */}
          <Filter className="w-5 h-5 text-gray-300 cursor-not-allowed opacity-50" />
          <div className="w-px h-6 bg-gray-300"></div>
          <button 
            onClick={onTimelineToggle}
            className={`flex items-center space-x-2 transition-colors duration-200 ${
              showTimeline 
                ? 'text-orange-500 hover:text-orange-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Timeline</span>
          </button>
        </div>
      </div>

      {/* Planning Mode Selector */}
      <div className="relative mb-3">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {Object.entries(planningModes).map(([key, mode]) => {
            const Icon = mode.icon;
            const isActive = currentMode === key;
            
            return (
              <button
                key={key}
                onClick={() => handleModeChange(key as PlanningMode)}
                className={`flex-shrink-0 flex items-center space-x-3 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out transform ${
                  isActive
                    ? `bg-${mode.color}-100 text-${mode.color}-700 border-2 border-${mode.color}-200 scale-105 shadow-md`
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110' : ''
                }`} />
                <span>{mode.title}</span>
              </button>
            );
          })}
        </div>
        
        {/* Swipe Indicator for Mobile */}
        <div className="md:hidden flex justify-center mt-2 space-x-1">
          {Object.keys(planningModes).map((key, index) => (
            <div
              key={key}
              className={`h-1 w-8 rounded-full transition-all duration-300 ${
                currentMode === key ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mode Description */}
      <div className={`p-4 bg-gray-50 rounded-lg transition-all duration-500 ease-in-out transform ${
        currentMode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}>
        <p className="text-sm text-gray-700 mb-3">
          {planningModes[currentMode].description}
        </p>
        <div className="flex flex-wrap gap-2">
          {planningModes[currentMode].features.map((feature, index) => (
            <span 
              key={index} 
              className={`text-xs bg-white px-3 py-1 rounded-full text-gray-600 border border-gray-200 transition-all duration-200 ${
                index === 0 ? 'animate-pulse' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration: '1s',
                animationIterationCount: '1'
              }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Custom Styles for Scrollbar Hide */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </header>
  );
};

export default PlanHeader;