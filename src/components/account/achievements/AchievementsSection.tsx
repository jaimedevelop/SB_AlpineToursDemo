import React from 'react';
import { useAchievements, useSeasonChallenges } from '../../../hooks/useAccountData';
import LevelProgress from './LevelProgress';
import SeasonStats from './SeasonStats';
import ChallengeCard from './ChallengeCard';
import AchievementCard from './AchievementCard';
import styles from '../../../styles/shared.module.css';

const AchievementsSection: React.FC = () => {
  const { data: achievements, isLoading: achievementsLoading } = useAchievements();
  const { data: challenges, isLoading: challengesLoading } = useSeasonChallenges();

  if (achievementsLoading || challengesLoading) {
    return <div>Loading achievements...</div>;
  }

  return (
    <div className={styles.sectionContainer}>
      <LevelProgress />
      <SeasonStats />
      
      {/* Season Challenges */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Season Challenges</h3>
        <div className="space-y-4">
          {challenges?.map((challenge, index) => (
            <ChallengeCard key={index} challenge={challenge} />
          ))}
        </div>
      </div>

      {/* Achievement Gallery */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Achievement Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements?.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;