import React from 'react';
import styles from '../../../styles/shared.module.css';

const AppInfo: React.FC = () => {
  // TODO: Replace with actual app version info
  const appInfo = {
    version: '2.1.4',
    build: '2024.03.15',
    lastUpdated: 'March 15, 2024'
  };

  const handleTermsClick = () => {
    // TODO: Open terms of service
    console.log('Opening terms of service...');
  };

  const handlePrivacyPolicyClick = () => {
    // TODO: Open privacy policy
    console.log('Opening privacy policy...');
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>App Information</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Version</span>
          <span>{appInfo.version}</span>
        </div>
        <div className="flex justify-between">
          <span>Build</span>
          <span>{appInfo.build}</span>
        </div>
        <div className="flex justify-between">
          <span>Last Updated</span>
          <span>{appInfo.lastUpdated}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
        <button 
          onClick={handleTermsClick}
          className="text-blue-600 hover:text-blue-700 text-sm block"
        >
          Terms of Service
        </button>
        <button 
          onClick={handlePrivacyPolicyClick}
          className="text-blue-600 hover:text-blue-700 text-sm block"
        >
          Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default AppInfo;