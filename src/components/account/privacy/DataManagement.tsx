import React from 'react';
import { Download, Trash2, ChevronRight } from 'lucide-react';
import ActionButton from '../shared/ActionButton';
import styles from '../../../styles/shared.module.css';

const DataManagement: React.FC = () => {
  const handleExportData = () => {
    // TODO: Implement data export functionality
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion with confirmation
    console.log('Initiating account deletion...');
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Data Management</h3>
      <div className="space-y-3">
        <button 
          onClick={handleExportData}
          className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <Download className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Export My Data</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
        
        <button 
          onClick={handleDeleteAccount}
          className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg hover:bg-red-50"
        >
          <div className="flex items-center space-x-3">
            <Trash2 className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-600">Delete Account</span>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default DataManagement;