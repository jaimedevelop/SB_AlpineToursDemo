import React from 'react';
import { useSettings } from '../../../contexts/SettingsContext';
import ToggleSwitch from '../shared/ToggleSwitch';
import styles from '../../../styles/shared.module.css';

interface NotificationOption {
  key: keyof typeof import('../../../contexts/SettingsContext').SettingsProvider.prototype.settings.notifications;
  name: string;
  description: string;
}

const NotificationSettings: React.FC = () => {
  const { settings, updateNotificationSetting } = useSettings();

  const notificationOptions: NotificationOption[] = [
    { 
      key: 'powderAlerts', 
      name: 'Powder Alerts', 
      description: 'Get notified about fresh snow' 
    },
    { 
      key: 'workoutReminders', 
      name: 'Workout Reminders', 
      description: 'Daily fitness reminders' 
    },
    { 
      key: 'tripDeadlines', 
      name: 'Trip Deadlines', 
      description: 'Booking and planning reminders' 
    },
    { 
      key: 'socialUpdates', 
      name: 'Social Updates', 
      description: 'Friend activities and achievements' 
    },
    { 
      key: 'gearDeals', 
      name: 'Gear Deals', 
      description: 'Special offers and discounts' 
    }
  ];

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Notifications</h3>
      <div className="space-y-4">
        {notificationOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{option.name}</div>
              <div className="text-sm text-gray-600">{option.description}</div>
            </div>
            <ToggleSwitch
              enabled={settings.notifications[option.key]}
              onChange={(enabled) => updateNotificationSetting(option.key, enabled)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;