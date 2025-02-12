"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ModernCalendar from "./ModernCalendar";
import { CheckCircle } from "lucide-react";

export default function Approval() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [waitingApproval, setWaitingApproval] = useState({
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
        name: "Aditya",
        perperson: "250",
      }
    ]
  });
  const [approvedSchedules, setApprovedSchedules] = useState({});
  const [activeTab, setActiveTab] = useState("waiting");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const approveSchedule = (dateKey, index) => {
    const scheduleToApprove = waitingApproval[dateKey][index];
    
    setApprovedSchedules((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), scheduleToApprove],
    }));
    
    const updatedWaiting = waitingApproval[dateKey].filter((_, i) => i !== index);
    setWaitingApproval((prev) => ({
      ...prev,
      [dateKey]: updatedWaiting.length ? updatedWaiting : undefined,
    }));
  };

  return (
    <div className="flex flex-col-reverse custom-xl:flex-row 2xl:gap-6 py-5 xl:p-5 mt-6">
      <div className="w-full custom-xl:w-[70%] h-full p-4 bg-white">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 relative">
    Scheduled for- 
    <span className="text-violet-600 bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
      {selectedDate.toDateString()}
    </span>
    <div className="w-16 h-1 bg-violet-500 rounded-full mt-1"></div>
  </h2>
        
        <div className="flex border-b mb-4">
          <button onClick={() => setActiveTab("waiting")} className={`px-4 py-2 ${activeTab === "waiting" ? "border-b-2 border-violet-600 text-violet-600" : "text-gray-500"}`}>Waiting for Approval</button>
          <button onClick={() => setActiveTab("approved")} className={`px-4 py-2 ${activeTab === "approved" ? "border-b-2 border-violet-600 text-violet-600" : "text-gray-500"}`}>Approved</button>
        </div>
        
        <div className="space-y-4">
          {activeTab === "waiting" ? (
            waitingApproval[selectedDate.toDateString()]?.length > 0 ? (
              waitingApproval[selectedDate.toDateString()].map((schedule, index) => (
                <div key={index} className="relative p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 bg-white flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                  <div className="absolute top-2 right-2 flex flex-col items-center">
                    <button onClick={() => approveSchedule(selectedDate.toDateString(), index)} className="text-green-700 bg-[#8ff0a4] flex flex-row gap-2 p-2 rounded-xl">
                      <CheckCircle className="w-6 h-6" /> <div>Approve </div>
                    </button>
                    <p className="text-lg md:text-2xl text-gray-700 font-semibold mt-2">₹{schedule.payment}</p>
                  </div>
                  <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 text-base md:text-lg">{schedule.name}</h3>
            <p className="text-xs md:text-sm text-gray-600">{schedule.people} People</p>
          </div>
                  <div className="bg-violet-100 text-violet-600 px-4 md:px-5 py-2 md:py-3 rounded-xl font-semibold text-xs md:text-sm shadow-sm">
            {schedule.hour}:{schedule.minute || "00"} {schedule.ampm} - {schedule.endHour}:{schedule.endMinute || "00"} {schedule.endAmpm}
          </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No requests are pending. Click on the Approved tab.</p>
            )
          ) : (
            approvedSchedules[selectedDate.toDateString()]?.length > 0 ? (
              approvedSchedules[selectedDate.toDateString()].map((schedule, index) => (
                <div key={index} className="relative p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 bg-white flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                  <div className="absolute top-2 right-2 flex flex-col items-center">
                  <p className="text-xs md:text-sm text-gray-700 font-semibold mt-2">₹{schedule.perperson}/person</p>
                    <p className="text-lg md:text-2xl text-gray-700 font-semibold mt-2">₹{schedule.payment}</p>
                  </div>
                  <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 text-base md:text-lg">{schedule.name}</h3>
            <p className="text-xs md:text-sm text-gray-600">{schedule.people} People</p>
          </div>
                  <div className="bg-violet-100 text-violet-600 px-4 md:px-5 py-2 md:py-3 rounded-xl font-semibold text-xs md:text-sm shadow-sm">
                    {schedule.hour}:{schedule.minute || "00"} {schedule.ampm} - {schedule.endHour}:{schedule.endMinute || "00"} {schedule.endAmpm}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No approved requests.</p>
            )
          )}
        </div>
      </div>
      <div className="w-full mt-12 custom-xl:w-[30%] py-2 2xl:p-4 md:mt-0">
        <ModernCalendar schedules={{ ...waitingApproval, ...approvedSchedules }} onDateChange={handleDateChange} />
      </div>
    </div>
  );
}
