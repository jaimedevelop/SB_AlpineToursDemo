import React from 'react';
import { MapPin } from 'lucide-react';
import styles from '../../../styles/shared.module.css';

interface ProfileFormProps {
  isEditing: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ isEditing }) => {
  // TODO: Replace with actual user profile data from Firebase
  const profileData = {
    homeLocation: 'Denver, CO',
    experienceLevel: 'Advanced Intermediate',
    skiingPreferences: 'Powder, Off-piste',
    certifications: 'PSIA Level 1'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Home Location
        </label>
        {isEditing ? (
          <input
            type="text"
            defaultValue={profileData.homeLocation}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-900">{profileData.homeLocation}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Experience Level
        </label>
        {isEditing ? (
          <select className="w-full p-2 border border-gray-300 rounded-lg">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option selected>Advanced Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
        ) : (
          <div className="p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-900">{profileData.experienceLevel}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skiing Preferences
        </label>
        {isEditing ? (
          <input
            type="text"
            defaultValue={profileData.skiingPreferences}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-900">{profileData.skiingPreferences}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Certifications
        </label>
        {isEditing ? (
          <input
            type="text"
            defaultValue={profileData.certifications}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        ) : (
          <div className="p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-900">{profileData.certifications}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;