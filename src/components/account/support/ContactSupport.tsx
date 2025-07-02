import React from 'react';
import { HelpCircle, Settings } from 'lucide-react';
import ActionButton from '../shared/ActionButton';
import styles from '../../../styles/shared.module.css';

const ContactSupport: React.FC = () => {
  const handleLiveChat = () => {
    // TODO: Open live chat widget
    console.log('Opening live chat...');
  };

  const handleReportBug = () => {
    // TODO: Open bug report form
    console.log('Opening bug report form...');
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Contact Support</h3>
      <div className="space-y-3">
        <button 
          onClick={handleLiveChat}
          className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-gray-900">Live Chat</span>
        </button>
        
        <button 
          onClick={handleReportBug}
          className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <Settings className="w-5 h-5 text-green-600" />
          <span className="font-medium text-gray-900">Report a Bug</span>
        </button>
      </div>
    </div>
  );
};

export default ContactSupport;