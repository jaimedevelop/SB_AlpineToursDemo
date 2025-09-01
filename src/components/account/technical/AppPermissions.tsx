import React from 'react';
import ToggleSwitch from '../shared/ToggleSwitch';
import { useSettings } from '../../../contexts/SettingsContext';
import styles from '../../../styles/shared.module.css';

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const AppPermissions: React.FC = () => {
  // TODO: Replace with actual device permissions status
  const permissions: Permission[] = [
    {
      id: 'location',
      name: 'Location',
      description: 'For resort recommendations and tracking',
      enabled: true
    },
    {
      id: 'camera',
      name: 'Camera',
      description: 'For gear photos and trip memories',
      enabled: true
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'For alerts and reminders',
      enabled: true
    },
    {
      id: 'contacts',
      name: 'Contacts',
      description: 'For emergency contacts and friend invites',
      enabled: false
    }
  ];

  const handlePermissionChange = (permissionId: string, enabled: boolean) => {
    // TODO: Handle device permission changes
    console.log(`${enabled ? 'Enabling' : 'Disabling'} permission:`, permissionId);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>App Permissions</h3>
      <div className="space-y-4">
        {permissions.map((permission) => (
          <div key={permission.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{permission.name}</div>
              <div className="text-sm text-gray-600">{permission.description}</div>
            </div>
            <ToggleSwitch
              enabled={permission.enabled}
              onChange={(enabled) => handlePermissionChange(permission.id, enabled)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppPermissions;