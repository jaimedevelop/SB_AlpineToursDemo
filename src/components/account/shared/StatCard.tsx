import React from 'react';
import styles from '../../../styles/shared.module.css';

interface StatCardProps {
  value: string | number;
  label: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard: React.FC<StatCardProps> = ({ value, label, color = 'blue' }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600'
  };

  return (
    <div className={styles.statCard}>
      <div className={`${styles.statValue} ${colorClasses[color]}`}>
        {value}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
};

export default StatCard;