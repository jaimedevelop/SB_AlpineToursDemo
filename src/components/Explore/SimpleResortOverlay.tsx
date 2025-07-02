import React, { useEffect } from 'react';
import { ResortDetail } from './ResortDetail';
import type { Resort } from '../../types/types';

interface SimpleResortOverlayProps {
  resort: Resort | null;
  isOpen: boolean;
  onClose: () => void;
  onPlanTrip?: (resort: Resort) => void;
}

const SimpleResortOverlay: React.FC<SimpleResortOverlayProps> = ({ 
  resort, 
  isOpen, 
  onClose, 
  onPlanTrip 
}) => {
  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Don't render if not open or no resort
  if (!isOpen || !resort) return null;

  return (
    <>
      {/* Simple backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Simple centered overlay */}
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-lg shadow-2xl z-50 overflow-y-auto">
        <ResortDetail 
          resort={resort} 
          onClose={onClose}
          onPlanTrip={onPlanTrip}
        />
      </div>
    </>
  );
};

export default SimpleResortOverlay;