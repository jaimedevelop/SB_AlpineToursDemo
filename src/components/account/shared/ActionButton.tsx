// components/account/shared/ActionButton.tsx - Cozy Lodge Theme
import React from 'react';
import styles from '../../../styles/account/index.module.css';

interface ActionButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  variant = 'primary',
  onClick,
  disabled = false,
  icon,
  children,
  size = 'medium',
  className = ''
}) => {
  const getButtonClasses = () => {
    let classes = [styles.button];
    
    switch (variant) {
      case 'primary':
        classes.push(styles.buttonPrimary);
        break;
      case 'secondary':
        classes.push(styles.buttonSecondary);
        break;
      case 'danger':
        classes.push(styles.buttonDanger);
        break;
    }

    switch (size) {
      case 'small':
        classes.push(styles.buttonSmall);
        break;
      case 'large':
        classes.push(styles.buttonLarge);
        break;
      default:
        classes.push(styles.buttonMedium);
    }
    
    if (disabled) {
      classes.push(styles.buttonDisabled);
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return (
    <button
      className={getButtonClasses()}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <span className={styles.buttonContent}>
        {icon && <span className={styles.buttonIcon}>{icon}</span>}
        <span className={styles.buttonText}>{children}</span>
      </span>
    </button>
  );
};

export default ActionButton;