import React from 'react';
import SkiMap from './Explore/SkiMap'; // Updated import path

const Explore: React.FC = () => {
  return (
    <div className="h-full">
      {/* Full-screen map with integrated FilterBar and panels */}
      <SkiMap />
    </div>
  );
};

export default Explore;