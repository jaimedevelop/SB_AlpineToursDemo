// Updated ProfileSection.tsx
import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';
import EmergencyContacts from './EmergencyContacts';
import { useAuth } from '../../../contexts/AuthContext';
import styles from '../../../styles/account/index.module.css';

const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className={styles.sectionContainer}>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <p className="text-gray-500">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.sectionContainer}>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.sectionContainer}>
      <ProfileHeader />
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Skiing Profile</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        <ProfileForm 
          isEditing={isEditing} 
          onEditingChange={setIsEditing}
        />
      </div>
      
      <EmergencyContacts />
    </div>
  );
};

export default ProfileSection;