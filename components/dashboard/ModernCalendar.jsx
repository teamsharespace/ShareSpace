import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ModernCalendar = ({ schedules, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
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

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 md:h-10 w-8 md:w-10" />
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateKey = date.toDateString();
      const isSelected = selectedDate && 
                        selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentDate.getMonth() &&
                        selectedDate.getFullYear() === currentDate.getFullYear();
      const hasSchedules = schedules && schedules[dateKey] && schedules[dateKey].length > 0;

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`relative h-8 md:h-10 w-8 md:w-10 flex items-center justify-center rounded-full cursor-pointer
            ${isSelected ? 'bg-[#8C5CF6] text-white' : 'hover:bg-[#EDE9FE]'}
            transition-all duration-200 ease-in-out`}
        >
          <span className="text-xs md:text-sm font-medium">{day}</span>
          {hasSchedules && (
            <span className="absolute bottom-0 top-5 md:top-7 w-3 md:w-4 h-3 md:h-4 ml-4 md:ml-6 flex items-center justify-center 
                           bg-blue-500 rounded-full text-white text-[10px] md:text-xs font-bold">
              {schedules[dateKey].length}
            </span>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full bg-white rounded-xl md:rounded-2xl shadow-lg p-1 md:p-2 border-2">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#EDE9FE] mx-1 md:mx-2 p-2 md:p-3 rounded-xl md:rounded-2xl">
        <h2 className="text-base md:text-lg font-semibold">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-2 md:gap-4">
          <button 
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      <div className='px-2 md:px-6 pb-4 md:pb-6'>
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-1 md:mb-2">
          {DAYS.map(day => (
            <div key={day} className="h-8 md:h-10 flex items-center justify-center">
              <span className="text-[10px] md:text-xs font-medium text-gray-500">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default ModernCalendar;