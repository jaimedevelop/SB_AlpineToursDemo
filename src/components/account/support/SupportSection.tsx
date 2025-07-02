import React from 'react';
import QuickHelp from './QuickHelp';
import ContactSupport from './ContactSupport';
import AppInfo from './AppInfo';
import styles from '../../../styles/shared.module.css';

const SupportSection: React.FC = () => {
  return (
    <div className={styles.sectionContainer}>
      <QuickHelp />
      <ContactSupport />
      <AppInfo />
    </div>
  );
};

export default SupportSection;