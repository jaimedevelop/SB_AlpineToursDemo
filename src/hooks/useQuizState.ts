// hooks/useQuizState.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface BeginnerQuizState {
  address: string;
  tripDuration: string;
  noTimeLimit: boolean;
  costType: 'daily' | 'total';
  costAmount: string;
  interests: string[];
}

interface ExperiencedQuizState {
  region: 'East' | 'West' | 'Rocky' | 'Central';
  skill: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  budget: 'budget' | 'moderate' | 'premium' | 'luxury';
  interests: string[];
}

interface UseQuizStateParams {
  setPriceRange: (range: [number, number]) => void;
  setSelectedDifficulties: (difficulties: string[]) => void;
  setActiveFilter: (filter: string | null) => void;
  setLocation: (location: string) => void;
  setSelectedRegion: (region: string) => void;
}

const normalizeRegion = (region: string): 'East' | 'West' | 'Rocky' | 'Central' | '' => {
  const regionMap: { [key: string]: 'East' | 'West' | 'Rocky' | 'Central' } = {
    'eastern': 'East',
    'western': 'West',
    'rocky': 'Rocky',
    'central': 'Central',
    'east': 'East',
    'west': 'West'
  };
  return regionMap[region.toLowerCase()] || '';
};

export default function useQuizState({
  setPriceRange,
  setSelectedDifficulties,
  setActiveFilter,
  setLocation,
  setSelectedRegion
}: UseQuizStateParams) {
  const locationHook = useLocation();

  useEffect(() => {
    const quizState = locationHook.state as BeginnerQuizState | ExperiencedQuizState | null;
    
    if (!quizState) {
      console.log('No quiz state found - user likely navigated directly to explore');
      return;
    }

    console.log('Applying quiz preferences to map:', quizState);

    const isBeginnerQuiz = 'address' in quizState;

    if (isBeginnerQuiz) {
      const beginnerState = quizState as BeginnerQuizState;
      
      // Set price filter from beginner quiz
      if (beginnerState.costType === 'daily') {
        const costAmount = Number(beginnerState.costAmount);
        if (costAmount > 0) {
          setPriceRange([0, costAmount]);
        }
      }

      // Set difficulty filter for beginners (green slopes)
      setSelectedDifficulties(['Green']);

      // Set distance filter if location is provided
      if (beginnerState.address) {
        setLocation(beginnerState.address);
        setActiveFilter('distance');
      } else {
        setActiveFilter('difficulty');
      }
    } else {
      const experiencedState = quizState as ExperiencedQuizState;

      // Set region filter and animate to region
      if (experiencedState.region) {
        const normalizedRegion = normalizeRegion(experiencedState.region);
        if (normalizedRegion) {
          setSelectedRegion(normalizedRegion);
          
          // Show region filter briefly, then close
          setActiveFilter('region');
          setTimeout(() => {
            setActiveFilter(null);
          }, 1500);
        }
      }

      // Set difficulty filter based on skill level
      const skillLevelToDifficulty: Record<string, string[]> = {
        'beginner': ['Green'],
        'intermediate': ['Blue'],
        'advanced': ['Black'],
        'expert': ['Double Black']
      };
      
      if (experiencedState.skill && skillLevelToDifficulty[experiencedState.skill]) {
        const difficulties = skillLevelToDifficulty[experiencedState.skill];
        setSelectedDifficulties(difficulties);
      }

      // Set price filter based on budget
      if (experiencedState.budget) {
        const budgetRanges: Record<string, [number, number]> = {
          'budget': [0, 100],
          'moderate': [100, 200],
          'premium': [200, 300],
          'luxury': [300, 500]
        };
        
        if (budgetRanges[experiencedState.budget]) {
          setPriceRange(budgetRanges[experiencedState.budget]);
        }
      }
    }
  }, [setPriceRange, setSelectedDifficulties, setActiveFilter, setLocation, setSelectedRegion]);
}