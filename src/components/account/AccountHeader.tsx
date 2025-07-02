import React from 'react';
import { LogOut } from 'lucide-react';
import styles from '../../styles/account.module.css';

const AccountHeader: React.FC = () => {
  const handleSignOut = () => {
    // TODO: Implement sign out functionality
    console.log('Signing out...');
  };

  return (
    <header className={styles.accountHeader}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage your profile, achievements, and settings
          </p>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
};

export default AccountHeader;