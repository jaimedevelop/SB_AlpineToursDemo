import React from 'react';
import styles from '../../../styles/shared.module.css';

interface ProgressBarProps {
  progress: number;
  total: number;
  color?: 'blue' | 'green' | 'purple';
  showText?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  total, 
  color = 'blue',
  showText = false 
}) => {
  const percentage = Math.min((progress / total) * 100, 100);
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  };

  return (
    <div>
      <div className={styles.progressBar}>
        <div 
          className={`${styles.progressFill} ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>{progress}</span>
          <span>{total}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;