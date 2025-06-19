import React from 'react';
import { MapPin, Calendar, Home, Car, Check, LucideIcon } from 'lucide-react';

interface Step {
  title: string;
  icon: LucideIcon;
}

interface StepProgressProps {
  currentStep: number;
  steps: Step[];
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`text-xs mt-1 transition-colors duration-200 ${
              index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-600'
            }`}>
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;