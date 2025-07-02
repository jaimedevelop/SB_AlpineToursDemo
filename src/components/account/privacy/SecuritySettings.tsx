import React from 'react';
import { Shield, Settings } from 'lucide-react';
import ActionButton from '../shared/ActionButton';
import styles from '../../../styles/shared.module.css';

interface SecuritySetting {
  id: string;
  name: string;
  description: string;
  status: string;
  action: string;
}

const SecuritySettings: React.FC = () => {
  // TODO: Replace with actual security settings from Firebase Auth
  const securitySettings: SecuritySetting[] = [
    {
      id: 'two-factor',
      name: 'Two-Factor Authentication',
      description: 'Enabled via SMS',
      status: 'enabled',
      action: 'Manage'
    },
    {
      id: 'password',
      name: 'Password',
      description: 'Last changed 2 months ago',
      status: 'secure',
      action: 'Change'
    }
  ];

  const handleSecurityAction = (settingId: string, action: string) => {
    // TODO: Implement security setting actions
    console.log(`${action} security setting:`, settingId);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Account Security</h3>
      <div className="space-y-4">
        {securitySettings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {setting.id === 'two-factor' ? (
                <Shield className="w-5 h-5 text-green-600" />
              ) : (
                <Settings className="w-5 h-5 text-gray-500" />
              )}
              <div>
                <div className="font-medium text-gray-900">{setting.name}</div>
                <div className="text-sm text-gray-600">{setting.description}</div>
              </div>
            </div>
            <button 
              onClick={() => handleSecurityAction(setting.id, setting.action)}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              {setting.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecuritySettings;