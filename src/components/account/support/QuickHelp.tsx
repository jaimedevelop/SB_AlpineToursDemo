import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from '../../../styles/shared.module.css';

interface HelpTopic {
  id: string;
  title: string;
  description: string;
}

const QuickHelp: React.FC = () => {
  const helpTopics: HelpTopic[] = [
    {
      id: 'getting-started',
      title: 'Getting Started Guide',
      description: 'Learn the basics of the app'
    },
    {
      id: 'planning-trip',
      title: 'Planning Your First Trip',
      description: 'Step-by-step trip planning'
    },
    {
      id: 'fitness-features',
      title: 'Using Fitness Features',
      description: 'Maximize your ski preparation'
    },
    {
      id: 'gear-recommendations',
      title: 'Gear Recommendations',
      description: 'Find the right equipment'
    }
  ];

  const handleHelpTopicClick = (topicId: string) => {
    // TODO: Navigate to help article or open modal
    console.log('Opening help topic:', topicId);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Quick Help</h3>
      <div className="space-y-3">
        {helpTopics.map((topic) => (
          <button 
            key={topic.id}
            onClick={() => handleHelpTopicClick(topic.id)}
            className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="text-left">
              <div className="font-medium text-gray-900">{topic.title}</div>
              <div className="text-sm text-gray-600">{topic.description}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickHelp;