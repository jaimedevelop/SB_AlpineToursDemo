import React, { useState } from 'react';
import { UserProvider } from '../contexts/UserContext';
import { SettingsProvider } from '../contexts/SettingsContext';
import AccountHeader from '../components/account/AccountHeader';
import AccountNavigation from '../components/account/AccountNavigation';
import AchievementsSection from '../components/account/achievements/AchievementsSection';
import ProfileSection from '../components/account/profile/ProfileSection';
import PreferencesSection from '../components/account/preferences/PreferencesSection';
import BillingSection from '../components/account/billing/BillingSection';
import PrivacySection from '../components/account/privacy/PrivacySection';
import TechnicalSection from '../components/account/technical/TechnicalSection';
import SupportSection from '../components/account/support/SupportSection';
import styles from '../styles/account/index.module.css';

const Account: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('achievements');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': 
        return <ProfileSection />;
      case 'achievements': 
        return <AchievementsSection />;
      case 'preferences': 
        return <PreferencesSection />;
      case 'billing': 
        return <BillingSection />;
      case 'privacy': 
        return <PrivacySection />;
      case 'technical': 
        return <TechnicalSection />;
      case 'support': 
        return <SupportSection />;
      default: 
        return <AchievementsSection />;
    }
  };

  return (
    <UserProvider>
      <SettingsProvider>
        <div className={styles.accountContainer}>
          <AccountHeader />
          
          <div className={styles.accountContent}>
            <AccountNavigation 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            
            <main className={styles.mainContent}>
              {renderContent()}
            </main>
          </div>
        </div>
      </SettingsProvider>
    </UserProvider>
  );
};

export default Account;