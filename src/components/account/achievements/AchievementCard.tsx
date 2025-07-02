import React from 'react';
import { Award, Star, Crown, Medal } from 'lucide-react';
import ProgressBar from '../shared/ProgressBar';
import styles from '../../../styles/account.module.css';

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  earned: boolean;
  date?: string;
  progress?: number;
  target?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Award className="w-4 h-4" />;
      case 'rare': return <Star className="w-4 h-4" />;
      case 'epic': return <Crown className="w-4 h-4" />;
      case 'legendary': return <Medal className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  return (
    <div className={`${styles.achievementCard} ${
      achievement.earned 
        ? styles.achievementCardEarned 
        : styles.achievementCardLocked
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getRarityIcon(achievement.rarity)}
          <div>
            <h4 className={`font-semibold ${
              achievement.earned ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {achievement.name}
            </h4>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            styles.rarityBadge
          } ${styles[`rarity${achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}`]}`}>
            {achievement.rarity}
          </span>
          <div className="text-xs text-gray-500 mt-1">{achievement.points} pts</div>
        </div>
      </div>
      {achievement.earned ? (
        <div className="text-xs text-green-600">
          ✓ Earned {achievement.date && new Date(achievement.date).toLocaleDateString()}
        </div>
      ) : achievement.progress !== undefined ? (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{achievement.progress}/{achievement.target}</span>
          </div>
          <ProgressBar 
            progress={achievement.progress} 
            total={achievement.target!} 
            color="blue" 
          />
        </div>
      ) : (
        <div className="text-xs text-gray-500">🔒 Locked</div>
      )}
    </div>
  );
};

export default AchievementCard;