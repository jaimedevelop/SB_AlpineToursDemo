import React from 'react';
import { Globe, Settings, Sun, Moon } from 'lucide-react';
import { useSettings } from '../../../context/SettingsContext';
import ToggleSwitch from '../shared/ToggleSwitch';
import styles from '../../../styles/shared.module.css';

const AppPreferences: React.FC = () => {
  const { settings, updateSettings, toggleDarkMode } = useSettings();

  const handleLanguageChange = (language: string) => {
    updateSettings({ language });
  };

  const handleUnitsChange = (units: 'imperial' | 'metric') => {
    updateSettings({ units });
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>App Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-gray-500" />
            <div>
              <div className="font-medium text-gray-900">Language</div>
              <div className="text-sm text-gray-600">Choose your preferred language</div>
            </div>
          </div>
          <select 
            className="p-2 border border-gray-300 rounded-lg"
            value={settings.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option>English</option>
            <option>Français</option>
            <option>Deutsch</option>
            <option>Español</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-gray-500" />
            <div>
              <div className="font-medium text-gray-900">Units</div>
              <div className="text-sm text-gray-600">Distance and temperature units</div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleUnitsChange('imperial')}
              className={`px-3 py-1 rounded-lg text-sm ${
                settings.units === 'imperial' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Imperial
            </button>
            <button 
              onClick={() => handleUnitsChange('metric')}
              className={`px-3 py-1 rounded-lg text-sm ${
                settings.units === 'metric' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Metric
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {settings.darkMode ? 
              <Moon className="w-5 h-5 text-gray-500" /> : 
              <Sun className="w-5 h-5 text-gray-500" />
            }
            <div>
              <div className="font-medium text-gray-900">Theme</div>
              <div className="text-sm text-gray-600">Choose light or dark mode</div>
            </div>
          </div>
          <ToggleSwitch 
            enabled={settings.darkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default AppPreferences;