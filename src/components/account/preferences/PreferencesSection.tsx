import React from 'react';
import AppPreferences from './AppPreferences';
import NotificationSettings from './NotificationSettings';
import styles from '../../../styles/shared.module.css';

const PreferencesSection: React.FC = () => {
  return (
    <div className={styles.sectionContainer}>
      <AppPreferences />
      <NotificationSettings />
    </div>
  );
};

export default PreferencesSection;