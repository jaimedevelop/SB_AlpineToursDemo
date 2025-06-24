import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Explore from './pages/Explore';
import Plan from './pages/Plan';
import QuickTripBuilder from './components/plan/QuickTripBuilder/QuickTripBuilder';
import Gear from './pages/Gear';
import Fit from './pages/Fit';
import Account from './pages/Account';
import Welcome from './components/auth/Welcome';
import Login from './components/auth/Login';
import CreateAccount from './components/auth/CreateAccount';
import { AuthWrapper, useAuth } from './components/auth/AuthWrapper';

// Component to handle the main app routing
function AppContent() {
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Define routes that should hide navigation
  const hideNavigationRoutes = ['/welcome', '/login', '/create-account'];
  const shouldHideNavigation = hideNavigationRoutes.includes(location.pathname);
  
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-blue-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className={`flex-1 overflow-hidden ${shouldHideNavigation ? '' : 'pb-16'}`}>
        <Routes>
          {/* Welcome/Landing page - shown to all users initially */}
          <Route path="/welcome" element={<Welcome />} />
          
          {/* Auth routes - full screen */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          
          {/* Root redirect logic */}
          <Route 
            path="/" 
            element={
              // If user is authenticated, go to explore, otherwise go to welcome
              <Navigate to={isAuthenticated ? "/explore" : "/welcome"} replace />
            } 
          />
          
          {/* Main tab routes - available to all users (guest mode supported) */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/gear" element={<Gear />} />
          <Route path="/fit" element={<Fit />} />
          <Route path="/account" element={<Account />} />
          
          {/* Sub-routes */}
          <Route path="/plan/quick-trip-builder" element={<QuickTripBuilder />} />
          
          {/* Catch all - redirect based on auth status */}
          <Route 
            path="*" 
            element={
              <Navigate to={isAuthenticated ? "/explore" : "/welcome"} replace />
            } 
          />
        </Routes>
      </div>
      {!shouldHideNavigation && <Navigation />}
    </div>
  );
}

function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;