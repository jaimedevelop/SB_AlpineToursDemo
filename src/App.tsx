import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Explore from './pages/Explore';
import Plan from './pages/Plan';
import QuickTripBuilder from './components/Plan/QuickTripBuilder/QuickTripBuilder';
import Gear from './pages/Gear';
import Fit from './pages/Fit';
import Account from './pages/Account';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="flex-1 overflow-hidden pb-16">
          <Routes>
            {/* Default redirect to explore */}
            <Route path="/" element={<Navigate to="/explore" replace />} />
            
            {/* Main tab routes */}
            <Route path="/explore" element={<Explore />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/gear" element={<Gear />} />
            <Route path="/fit" element={<Fit />} />
            <Route path="/account" element={<Account />} />
            
            {/* Sub-routes */}
            <Route path="/plan/quick-trip-builder" element={<QuickTripBuilder />} />
            
            {/* Catch all - redirect to explore */}
            <Route path="*" element={<Navigate to="/explore" replace />} />
          </Routes>
        </div>
        <Navigation />
      </div>
    </BrowserRouter>
  );
}

export default App;