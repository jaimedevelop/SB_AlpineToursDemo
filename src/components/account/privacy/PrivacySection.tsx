import React from 'react';
import SecuritySettings from './SecuritySettings';
import PrivacyControls from './PrivacyControls';
import DataManagement from './DataManagement';
import styles from '../../../styles/shared.module.css';

const PrivacySection: React.FC = () => {
  return (
    <div className={styles.sectionContainer}>
      <SecuritySettings />
      <PrivacyControls />
      <DataManagement />
    </div>
  );
};

export default PrivacySection;