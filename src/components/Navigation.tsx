import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, BookOpen, Shirt, User, Settings } from 'lucide-react';

export type TabType = 'explore' | 'plan' | 'gear' | 'fit' | 'account';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'explore' as TabType, label: 'Explore', icon: Compass, path: '/explore' },
    { id: 'plan' as TabType, label: 'Plan', icon: BookOpen, path: '/plan' },
    { id: 'gear' as TabType, label: 'Gear', icon: Shirt, path: '/gear' },
    { id: 'fit' as TabType, label: 'Fit', icon: User, path: '/fit' },
    { id: 'account' as TabType, label: 'Account', icon: Settings, path: '/account' },
  ];

  // Determine active tab based on current path
  const getActiveTab = () => {
    const currentPath = location.pathname;
    
    // Handle sub-routes (like /plan/quick-trip-builder) by checking the base path
    if (currentPath.startsWith('/plan')) return 'plan';
    if (currentPath.startsWith('/explore')) return 'explore';
    if (currentPath.startsWith('/gear')) return 'gear';
    if (currentPath.startsWith('/fit')) return 'fit';
    if (currentPath.startsWith('/account')) return 'account';
    
    return 'explore'; // default
  };

  const activeTab = getActiveTab();

  const handleTabChange = (tab: TabType) => {
    const selectedTab = tabs.find(t => t.id === tab);
    if (selectedTab) {
      navigate(selectedTab.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-blue-600' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;