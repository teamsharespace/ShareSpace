import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const Bookingcal = ({ schedules, onDateChange }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);

  const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    if (onDateChange) onDateChange(newDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const isCurrentMonth = currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      const isSelected = selectedDate && selectedDate.toDateString() === dateKey;
      const hasSchedules = schedules && schedules[dateKey] && schedules[dateKey].length > 0;
      const isDisabled = isCurrentMonth && day < today.getDate();

      days.push(
        <div
          key={day}
          onClick={!isDisabled ? () => handleDateClick(day) : undefined}
          className={`relative h-10 w-10 flex items-center justify-center rounded-full cursor-pointer 
            ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#EDE9FE]'}
            ${isSelected ? 'bg-[#8C5CF6] text-white' : ''} 
            transition-all duration-200 ease-in-out`}
        >
          <span className="text-sm font-medium">{day}</span>
          {hasSchedules && (
            <span className="absolute bottom-0 top-7 w-4 h-4 ml-6 flex items-center justify-center 
                           bg-blue-500 rounded-full text-white text-xs font-bold">
              {schedules[dateKey].length}
            </span>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-2 border-2">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#EDE9FE] p-3 rounded-xl">
        <h2 className="text-lg font-semibold">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-4">
          {!(currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth()) && (
            <button
              onClick={() => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              Today
            </button>
          )}
          <button 
            onClick={handleNextMonth} 
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className='px-6 pb-6'>
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {DAYS.map(day => (
            <div key={day} className="h-10 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-500">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Bookingcal;

