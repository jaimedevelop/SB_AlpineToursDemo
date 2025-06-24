import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  ArrowRight, 
  Mountain, 
  Clock, 
  DollarSign, 
  Users,
  Star,
  MapPin
} from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col">
      {/* Header with Logo Space */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Logo Placeholder - Replace with actual logo */}
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Mountain className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xl font-semibold">S&B Alpine</span>
        </div>
        
        <button
          onClick={() => navigate('/login')}
          className="text-white/80 hover:text-white transition-colors flex items-center space-x-2"
        >
          <span>Already have an account?</span>
          <LogIn className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Plan Your Perfect
            <span className="block text-blue-200">Ski Adventure</span>
          </h1>
          <p className="text-blue-100 text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            From beginner slopes to expert peaks, we'll help you find and plan 
            the ultimate ski destination in just 15 minutes.
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-white/90">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-300" />
              <span>15-minute planning</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-blue-300" />
              <span>Best price guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-blue-300" />
              <span>Personalized recommendations</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4 w-full max-w-md">
          <button
            onClick={() => navigate('/create-account')}
            className="w-full py-4 px-6 bg-white text-blue-900 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="flex-1 py-3 px-6 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>
            
            <button 
              onClick={() => navigate('/explore')}
              className="flex-1 py-3 px-6 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200"
            >
              Browse
            </button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm mb-4">Trusted by thousands of skiers</p>
          <div className="flex justify-center items-center space-x-8 text-white/40">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">10K+ trips planned</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">200+ resorts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span className="text-sm">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}