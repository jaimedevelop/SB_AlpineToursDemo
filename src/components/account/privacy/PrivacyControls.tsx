import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from '../../../styles/shared.module.css';

interface PrivacySetting {
  id: string;
  name: string;
  description: string;
  currentValue: string;
}

const PrivacyControls: React.FC = () => {
  // TODO: Replace with actual privacy settings from Firebase
  const privacySettings: PrivacySetting[] = [
    {
      id: 'profile-visibility',
      name: 'Profile Visibility',
      description: 'Who can see your profile',
      currentValue: 'Friends Only'
    },
    {
      id: 'location-sharing',
      name: 'Location Sharing',
      description: 'Share location with friends',
      currentValue: 'Enabled'
    },
    {
      id: 'activity-status',
      name: 'Activity Status',
      description: "Show when you're skiing",
      currentValue: 'Enabled'
    },
    {
      id: 'achievement-sharing',
      name: 'Achievement Sharing',
      description: 'Auto-share achievements',
      currentValue: 'Disabled'
    }
  ];

  const handlePrivacySettingClick = (settingId: string) => {
    // TODO: Open privacy setting modal/page
    console.log('Opening privacy setting:', settingId);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Privacy Settings</h3>
      <div className="space-y-4">
        {privacySettings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{setting.name}</div>
              <div className="text-sm text-gray-600">{setting.description}</div>
            </div>
            <button 
              onClick={() => handlePrivacySettingClick(setting.id)}
              className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
            >
              {setting.currentValue}
              <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyControls;