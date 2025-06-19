import React, { useState, useEffect } from 'react';

interface DateRange {
  start: string;
  end: string;
}

interface DateSelectionProps {
  selectedDates: DateRange | null;
  onSelect: (dates: DateRange) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({ selectedDates, onSelect }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Initialize with existing selectedDates if available
  useEffect(() => {
    if (selectedDates) {
      setStartDate(selectedDates.start);
      setEndDate(selectedDates.end);
    }
  }, [selectedDates]);

  useEffect(() => {
    if (startDate && endDate) {
      onSelect({ start: startDate, end: endDate });
    }
  }, [startDate, endDate, onSelect]);

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    return Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Your Dates</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={getTodayDate()}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || getTodayDate()}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
      </div>
      
      {startDate && endDate && calculateDays() > 0 && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Trip Length</p>
              <p className="text-lg font-bold text-green-700">{calculateDays()} days</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-700">
                {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {startDate && endDate && calculateDays() <= 0 && (
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-700">
            Check-out date must be after check-in date
          </p>
        </div>
      )}
    </div>
  );
};

export default DateSelection;