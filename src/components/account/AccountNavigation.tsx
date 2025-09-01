// components/account/AccountNavigation.tsx - Cozy Lodge Theme
import React from 'react';
import { 
  User, 
  Trophy, 
  Settings, 
  CreditCard, 
  Shield, 
  Wrench, 
  HelpCircle,
  Mountain 
} from 'lucide-react';
import styles from '../../styles/account/index.module.css';

interface AccountNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    description: 'Personal information'
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: Trophy,
    description: 'Your ski milestones'
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: Settings,
    description: 'App settings'
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: CreditCard,
    description: 'Subscription & payments'
  },
  {
    id: 'privacy',
    label: 'Privacy',
    icon: Shield,
    description: 'Data & security'
  },
  {
    id: 'technical',
    label: 'Technical',
    icon: Wrench,
    description: 'Advanced settings'
  },
  {
    id: 'support',
    label: 'Support',
    icon: HelpCircle,
    description: 'Get help'
  }
];

const AccountNavigation: React.FC<AccountNavigationProps> = ({
  activeSection,
  onSectionChange
}) => {
  return (
    <nav className={styles.accountNavigation}>
      {/* Lodge Navigation Header */}
      <div className={styles.navHeader}>
        <Mountain className={styles.navHeaderIcon} />
        <div className={styles.navHeaderText}>
          <h3 className={styles.navHeaderTitle}>Lodge Navigation</h3>
          <p className={styles.navHeaderSubtitle}>Manage your mountain profile</p>
        </div>
      </div>

      {/* Navigation Items */}
      <div className={styles.navItems}>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <div className={styles.navItemIcon}>
                <IconComponent size={20} />
              </div>
              <div className={styles.navItemContent}>
                <span className={styles.navItemLabel}>{item.label}</span>
                <span className={styles.navItemDescription}>{item.description}</span>
              </div>
              {isActive && <div className={styles.activeIndicator}></div>}
            </button>
          );
        })}
      </div>

      {/* Lodge Atmosphere Elements */}
      <div className={styles.navDecoration}>
        <div className={styles.fireplaceGlow}></div>
        <div className={styles.woodGrain}></div>
      </div>
    </nav>
  );
};

export default AccountNavigation;