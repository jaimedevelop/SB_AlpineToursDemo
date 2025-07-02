import React from 'react';
import { useUserStats } from '../../../hooks/useAccountData';
import StatCard from '../shared/StatCard';
import styles from '../../../styles/shared.module.css';

const SeasonStats: React.FC = () => {
  const { data: userStats, isLoading } = useUserStats();

  if (isLoading || !userStats) return <div>Loading...</div>;

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>2024 Season Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          value={userStats.currentSeason.daysSkied} 
          label="Days Skied" 
          color="blue" 
        />
        <StatCard 
          value={userStats.currentSeason.resortsVisited} 
          label="Resorts Visited" 
          color="green" 
        />
        <StatCard 
          value={`${(userStats.currentSeason.verticalFeet / 1000).toFixed(0)}K`} 
          label="Vertical Feet" 
          color="purple" 
        />
        <StatCard 
          value={userStats.currentSeason.workoutStreak} 
          label="Workout Streak" 
          color="orange" 
        />
      </div>
    </div>
  );
};

export default SeasonStats;