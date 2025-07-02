import React from 'react';
import { 
  Trophy, User, Settings, CreditCard, 
  Shield, Smartphone, HelpCircle 
} from 'lucide-react';
import styles from '../../styles/account.module.css';

interface Section {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AccountNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AccountNavigation: React.FC<AccountNavigationProps> = ({ 
  activeSection, 
  onSectionChange 
}) => {
  const sections: Section[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'technical', label: 'Technical', icon: Smartphone },
    { id: 'support', label: 'Support', icon: HelpCircle }
  ];

  return (
    <nav className={styles.sidebar}>
      <div className="space-y-1">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`${styles.navButton} ${
                activeSection === section.id
                  ? styles.navButtonActive
                  : styles.navButtonInactive
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default AccountNavigation;