import React from 'react';
import { Wifi } from 'lucide-react';
import ToggleSwitch from '../shared/ToggleSwitch';
import styles from '../../../styles/shared.module.css';

const DataUsage: React.FC = () => {
  // TODO: Replace with actual data usage tracking
  const dataUsage = {
    currentMonth: '247 MB',
    wifiOnlyEnabled: true
  };

  const handleWifiOnlyToggle = (enabled: boolean) => {
    // TODO: Update WiFi-only preference
    console.log('WiFi-only download:', enabled);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Data Usage</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wifi className="w-5 h-5 text-gray-500" />
            <div>
              <div className="font-medium text-gray-900">Download over WiFi only</div>
              <div className="text-sm text-gray-600">Save mobile data</div>
            </div>
          </div>
          <ToggleSwitch
            enabled={dataUsage.wifiOnlyEnabled}
            onChange={handleWifiOnlyToggle}
          />
        </div>
        
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">This month's usage</div>
          <div className="text-2xl font-bold text-gray-900">{dataUsage.currentMonth}</div>
        </div>
      </div>
    </div>
  );
};

export default DataUsage;