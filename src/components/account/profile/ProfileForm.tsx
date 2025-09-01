// Updated ProfileForm.tsx - Cozy Lodge Theme
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import ActionButton from '../shared/ActionButton';
import styles from '../../../styles/account/index.module.css';

interface ProfileFormProps {
  isEditing: boolean;
  onEditingChange?: (isEditing: boolean) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ isEditing, onEditingChange }) => {
  const { userProfile, updateProfile, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    homeLocation: '',
    experienceLevel: '',
    skiingPreferences: '',
    certifications: ''
  });

  // Initialize form data when userProfile loads
  useEffect(() => {
    if (userProfile) {
      setFormData({
        homeLocation: userProfile.homeLocation || '',
        experienceLevel: userProfile.experienceLevel || '',
        skiingPreferences: Array.isArray(userProfile.skiingPreferences) 
          ? userProfile.skiingPreferences.join(', ') 
          : userProfile.skiingPreferences || '',
        certifications: userProfile.certifications || ''
      });
    }
  }, [userProfile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        homeLocation: formData.homeLocation,
        experienceLevel: formData.experienceLevel,
        skiingPreferences: formData.skiingPreferences.split(',').map(p => p.trim()),
        certifications: formData.certifications
      });
      onEditingChange?.(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (userProfile) {
      setFormData({
        homeLocation: userProfile.homeLocation || '',
        experienceLevel: userProfile.experienceLevel || '',
        skiingPreferences: Array.isArray(userProfile.skiingPreferences) 
          ? userProfile.skiingPreferences.join(', ') 
          : userProfile.skiingPreferences || '',
        certifications: userProfile.certifications || ''
      });
    }
    onEditingChange?.(false);
  };

  return (
    <div className={styles.profileForm}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Home Location
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.homeLocation}
              onChange={(e) => handleInputChange('homeLocation', e.target.value)}
              className={styles.input}
              placeholder="e.g., Denver, CO"
            />
          ) : (
            <div className={styles.displayField}>
              <MapPin className={styles.fieldIcon} />
              <span className={styles.fieldValue}>
                {formData.homeLocation || 'Not specified'}
              </span>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Experience Level
          </label>
          {isEditing ? (
            <select 
              value={formData.experienceLevel}
              onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
              className={styles.select}
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced_intermediate">Advanced Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          ) : (
            <div className={styles.displayField}>
              <span className={styles.experienceBadge}>
                {formData.experienceLevel || 'Not specified'}
              </span>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Skiing Preferences
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.skiingPreferences}
              onChange={(e) => handleInputChange('skiingPreferences', e.target.value)}
              className={styles.input}
              placeholder="e.g., Powder, Off-piste, Groomed runs"
            />
          ) : (
            <div className={styles.displayField}>
              <div className={styles.preferenceTags}>
                {formData.skiingPreferences 
                  ? formData.skiingPreferences.split(',').map((pref, index) => (
                      <span key={index} className={styles.preferenceTag}>
                        {pref.trim()}
                      </span>
                    ))
                  : <span className={styles.fieldValue}>Not specified</span>
                }
              </div>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Certifications
          </label>
          {isEditing ? (
            <input
              type="text"
              value={formData.certifications}
              onChange={(e) => handleInputChange('certifications', e.target.value)}
              className={styles.input}
              placeholder="e.g., PSIA Level 1, CSIA Level 2"
            />
          ) : (
            <div className={styles.displayField}>
              <span className={styles.fieldValue}>
                {formData.certifications || 'Not specified'}
              </span>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className={styles.formActions}>
          <ActionButton
            variant="primary"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </ActionButton>
          <ActionButton
            variant="secondary"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </ActionButton>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;