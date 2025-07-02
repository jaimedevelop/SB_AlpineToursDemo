import React from 'react';
import OfflineMaps from './OfflineMaps';
import AppPermissions from './AppPermissions';
import DataUsage from './DataUsage';
import styles from '../../../styles/shared.module.css';

const TechnicalSection: React.FC = () => {
  return (
    <div className={styles.sectionContainer}>
      <OfflineMaps />
      <AppPermissions />
      <DataUsage />
    </div>
  );
};

export default TechnicalSection;