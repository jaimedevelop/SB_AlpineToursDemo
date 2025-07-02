import React, { createContext, useContext, ReactNode, useState } from 'react';

interface AppSettings {
  darkMode: boolean;
  language: string;
  units: 'imperial' | 'metric';
  notifications: {
    powderAlerts: boolean;
    workoutReminders: boolean;
    tripDeadlines: boolean;
    socialUpdates: boolean;
    gearDeals: boolean;
  };
}

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  toggleDarkMode: () => void;
  updateNotificationSetting: (key: keyof AppSettings['notifications'], value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>({
    // TODO: Load from Firebase user preferences
    darkMode: false,
    language: 'English',
    units: 'imperial',
    notifications: {
      powderAlerts: true,
      workoutReminders: true,
      tripDeadlines: true,
      socialUpdates: false,
      gearDeals: false
    }
  });

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    // TODO: Save to Firebase
  };

  const toggleDarkMode = () => {
    const newDarkMode = !settings.darkMode;
    setSettings(prev => ({ ...prev, darkMode: newDarkMode }));
    // TODO: Save to Firebase
  };

  const updateNotificationSetting = (key: keyof AppSettings['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value }
    }));
    // TODO: Save to Firebase
  };

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      updateSettings, 
      toggleDarkMode, 
      updateNotificationSetting 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};