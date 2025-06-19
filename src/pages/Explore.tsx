// pages/Explore.tsx
import React from 'react';
import SkiMap from '../components/explore/SkiMap';

const Explore: React.FC = () => {
  return (
    <div className="h-full">
      {/* Full-screen map - no header, accounts for bottom navigation */}
      <SkiMap />
    </div>
  );
};

export default Explore;