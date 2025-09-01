import React from 'react';
import { useUserStats } from '../../../hooks/useAccountData';
import styles from '../../../styles/account/index.module.css';

const LevelProgress: React.FC = () => {
  const { data: userStats, isLoading } = useUserStats();

  if (isLoading || !userStats) return <div>Loading...</div>;

  return (
    <div className={styles.levelCard}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-3xl font-bold">Level {userStats.level}</div>
          <div className="text-blue-100">Ski Enthusiast</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
          <div className="text-blue-100">Total Points</div>
        </div>
      </div>
      <div className="w-full bg-blue-400 rounded-full h-3">
        <div className="bg-white h-3 rounded-full" style={{ width: '73%' }}></div>
      </div>
      <div className="flex justify-between text-sm text-blue-100 mt-2">
        <span>Level {userStats.level}</span>
        <span>2,580 XP to Level {userStats.level + 1}</span>
      </div>
    </div>
  );
};

export default LevelProgress;