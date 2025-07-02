import React, { useState } from 'react';
import { User, Edit } from 'lucide-react';
import { useUser } from '../../../context/UserContext';
import ActionButton from '../shared/ActionButton';
import styles from '../../../styles/shared.module.css';

const ProfileHeader: React.FC = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Profile Information</h3>
        <ActionButton
          variant="secondary"
          onClick={() => setIsEditing(!isEditing)}
          icon={<Edit className="w-4 h-4" />}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </ActionButton>
      </div>
      
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <User className="w-10 h-10 text-blue-600" />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input 
                type="text" 
                defaultValue={user.name} 
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Full Name"
              />
              <input 
                type="email" 
                defaultValue={user.email} 
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Email Address"
              />
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex space-x-3 mt-4">
          <ActionButton variant="primary">
            Save Changes
          </ActionButton>
          <ActionButton 
            variant="secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </ActionButton>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;