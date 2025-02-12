"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ModernCalendar from "./ModernCalendar";

export default function Bookings() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState({
    "Wed Feb 12 2025": [
      {
        hour: "9",
        minute: "00",
        ampm: "AM",
        endHour: "10",
        endMinute: "00",
        endAmpm: "AM",
        payment: "500",
        people: "2",
        name: "Test User 1",
        perperson: "250",
      },
      {
        hour: "3",
        minute: "30",
        ampm: "PM",
        endHour: "5",
        endMinute: "00",
        endAmpm: "PM",
        payment: "1000",
        people: "4",
        name: "Test User 2",
        perperson: "200",
      },
    ],
    "Tue Feb 11 2025": [
      {
        hour: "9",
        minute: "00",
        ampm: "AM",
        endHour: "10",
        endMinute: "00",
        endAmpm: "AM",
        payment: "500",
        people: "2",
        name: "Ramesh",
        perperson: "250",
      },
      {
        hour: "3",
        minute: "30",
        ampm: "PM",
        endHour: "5",
        endMinute: "00",
        endAmpm: "PM",
        payment: "800",
        people: "4",
        name: "lokesh",
        perperson: "200",
      },
    ],
  });

  const [formData, setFormData] = useState({
    hour: "1",
    minute: "",
    ampm: "AM",
    endHour: "1",
    endMinute: "",
    endAmpm: "AM",
    payment: "",
    people: "",
    name: "",
    perperson: "",
  });

  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add schedule to selected date
  const handleAddSchedule = () => {
    const dateKey = selectedDate.toDateString();
    const newSchedule = { ...formData };

    setSchedules((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newSchedule],
    }));

    // Reset form
    setFormData({
      hour: "1",
      minute: "",
      ampm: "AM",
      endHour: "1",
      endMinute: "",
      endAmpm: "AM",
      payment: "",
      people: "",
      name: "",
      perperson: "",
    });

    setShowForm(false); // Hide form after submission
  };
  const tileContent = ({ date, view }) => {
    const dateKey = date.toDateString();
    if (view === 'month' && schedules[dateKey]) {
      return (
        <div className="relative flex flex-col justify-center items-center">
          <span className="text-xs py-1">{date.getDate()}</span>
          <span className="absolute bottom-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {schedules[dateKey].length}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col-reverse custom-xl:flex-row 2xl:gap-6 py-5 xl:p-5 mt-6">
      {/* Right Side: Schedule List */}
      <div className="w-full custom-xl:w-[70%] h-full p-4 bg-white">
  <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 relative">
    Scheduled for- 
    <span className="text-violet-600 bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
      {selectedDate.toDateString()}
    </span>
    <div className="w-16 h-1 bg-violet-500 rounded-full mt-1"></div>
  </h2>

  <div className="space-y-4">
    {schedules[selectedDate.toDateString()]?.length > 0 ? (
      schedules[selectedDate.toDateString()].map((schedule, index) => (
        <div
          key={index}
          className="relative p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 bg-white flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6"
        >
          <div className="absolute top-2 right-2 flex flex-col items-center">
            <p className="text-xs md:text-sm text-gray-700 font-semibold mt-2">
              ₹{schedule.perperson}/person
            </p>
            <p className="text-lg md:text-2xl text-gray-700 font-semibold mt-2">
              ₹{schedule.payment}
            </p>
          </div>

          {/* Left Content */}
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 text-base md:text-lg">{schedule.name}</h3>
            <p className="text-xs md:text-sm text-gray-600">{schedule.people} People</p>
          </div>

          {/* Time Block - Bigger & Stylish */}
          <div className="bg-violet-100 text-violet-600 px-4 md:px-5 py-2 md:py-3 rounded-xl font-semibold text-xs md:text-sm shadow-sm">
            {schedule.hour}:{schedule.minute || "00"} {schedule.ampm} - {schedule.endHour}:{schedule.endMinute || "00"} {schedule.endAmpm}
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center md:text-left">No schedules for this day.</p>
    )}
  </div>
</div>


{/* Left Side: Calendar + Test Button + Form */}
<div className="w-full mt-12 custom-xl:w-[30%] py-2 2xl:p-4 md:mt-0">
<ModernCalendar 
  schedules={schedules}
  onDateChange={handleDateChange}
/>
        {/* Test Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-3 px-2 py-2 bg-blue-600 text-white rounded-md"
        >
          {showForm ? "Hide Form" : ""}
        </button>

        {/* Schedule Input Form (Visible when showForm is true) */}
        {showForm && (
          <div className="mt-6 p-4 bg-white rounded-md shadow-md">
            <h3 className="font-medium mb-2">Add Schedule</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {/* Start Time */}
              <select name="hour" value={formData.hour} onChange={handleInputChange} className="p-2 border rounded-md">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <input type="number" name="minute" value={formData.minute} onChange={handleInputChange} className="p-2 border rounded-md" placeholder="Min" />
              <select name="ampm" value={formData.ampm} onChange={handleInputChange} className="p-2 border rounded-md">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>

              {/* End Time */}
              <select name="endHour" value={formData.endHour} onChange={handleInputChange} className="p-2 border rounded-md">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <input type="number" name="endMinute" value={formData.endMinute} onChange={handleInputChange} className="p-2 border rounded-md" placeholder="Min" />
              <select name="endAmpm" value={formData.endAmpm} onChange={handleInputChange} className="p-2 border rounded-md">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>

              {/* Other Fields */}
              <input type="number" name="payment" value={formData.payment} onChange={handleInputChange} className="p-2 border rounded-md col-span-3" placeholder="Payment ₹" />
              <input type="number" name="people" value={formData.people} onChange={handleInputChange} className="p-2 border rounded-md col-span-3" placeholder="No. of People" />
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="p-2 border rounded-md col-span-3" placeholder="User Name" />
              <select name="status" value={formData.status} onChange={handleInputChange} className="p-2 border rounded-md col-span-3">
                <option value="Pending">Pending</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <button onClick={handleAddSchedule} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md w-full">
              Add Schedule
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
