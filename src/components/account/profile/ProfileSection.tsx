import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';
import EmergencyContacts from './EmergencyContacts';
import styles from '../../../styles/shared.module.css';

const ProfileSection: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.sectionContainer}>
      <ProfileHeader />
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <ProfileForm isEditing={isEditing} />
      </div>
      
      <EmergencyContacts />
    </div>
  );
};

export default ProfileSection;