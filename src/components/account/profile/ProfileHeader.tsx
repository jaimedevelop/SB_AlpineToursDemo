// components/account/AccountHeader.tsx - Cozy Lodge Theme
import React from 'react';
import { Home, Settings, User } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import styles from '../../../styles/account/index.module.css';

const AccountHeader: React.FC = () => {
  const { currentUser, userProfile } = useAuth();

  return (
    <header className={styles.accountHeader}>
      <div className={styles.headerContent}>
        {/* Logo/Brand Section */}
        <div className={styles.brandSection}>
          <div className={styles.logoContainer}>
            <Home className={styles.logoIcon} />
          </div>
          <div className={styles.brandText}>
            <h1 className={styles.brandTitle}>Your Lodge</h1>
            <p className={styles.brandSubtitle}>Personal Mountain Retreat</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <div className={styles.userAvatar}>
            <User className={styles.avatarIcon} />
          </div>
          <div className={styles.welcomeText}>
            <h2 className={styles.welcomeTitle}>
              Welcome back, {userProfile?.name || currentUser?.displayName || 'Adventurer'}
            </h2>
            <p className={styles.welcomeSubtitle}>
              Ready for your next mountain adventure?
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {userProfile?.savedTrips?.length || 0}
            </div>
            <div className={styles.statLabel}>Trips Planned</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {userProfile?.favoriteResorts?.length || 0}
            </div>
            <div className={styles.statLabel}>Favorite Resorts</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>
              {userProfile?.experienceLevel || 'Beginner'}
            </div>
            <div className={styles.statLabel}>Skill Level</div>
          </div>
        </div>

        {/* Settings Quick Access */}
        <div className={styles.quickActions}>
          <button className={styles.actionButton} title="Quick Settings">
            <Settings className={styles.actionIcon} />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.headerDecoration}>
        <div className={styles.fireplace}></div>
        <div className={styles.woodBeam}></div>
      </div>
    </header>
  );
};

export default AccountHeader;