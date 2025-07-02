import React from 'react';
import ProgressBar from '../shared/ProgressBar';
import styles from '../../../styles/shared.module.css';

interface Challenge {
  name: string;
  progress: number;
  target: number;
  reward: string;
  deadline: string;
}

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{challenge.name}</h4>
        <span className="text-sm text-gray-500">
          Due {new Date(challenge.deadline).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 mr-4">
          <ProgressBar 
            progress={challenge.progress} 
            total={challenge.target} 
            color="blue" 
          />
        </div>
        <span className="text-sm font-medium text-gray-900">
          {challenge.progress}/{challenge.target}
        </span>
      </div>
      <div className="text-sm text-green-600 font-medium">🎁 {challenge.reward}</div>
    </div>
  );
};

export default ChallengeCard;