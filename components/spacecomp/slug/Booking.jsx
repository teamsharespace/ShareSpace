import React, { useState, useRef } from "react";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import Bookingcal from "./Bookingcal";
import { Button } from "@/components/ui/button";

const BookingSummary = ({ spaceData }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedOption, setSelectedOption] = useState("1-5");
  const [customAttendees, setCustomAttendees] = useState("");
  const calendarRef = useRef(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setEndTime("");
  };

  const getValidEndTimes = () => {
    if (!startTime) return [];
    const start = parseInt(startTime);
    return availableTimes.filter((time) => parseInt(time) > start);
  };

  const availableTimes = [...Array(17)].map((_, i) => `${i+8}:00`);

  const calculateTotal = () => {
    if (!startTime || !endTime) return null;

    const start = parseInt(startTime);
    const end = parseInt(endTime);
    const hours = end - start;
    if (hours <= 0) return null;
    const attendees= parseInt(customAttendees);
    const pricePerHour = spaceData.price;
    const subtotal = Math.ceil(pricePerHour * hours);
    let processingFee = Math.ceil(subtotal * 0.05);
  if (attendees > 50) {
    processingFee += Math.ceil(subtotal * 0.05);
  }
    const total = Math.ceil(subtotal + processingFee);

    return { subtotal, processingFee, total, hours };
  };


  const totalData = calculateTotal();

  return (
    <div className="md:col-span-1">
      <div className="sticky top-8 border rounded-xl p-6 space-y-6">
        <div className="flex flex-col items-center">
  {totalData ? (
    <div className="flex flex-col">
      <span className="flex items-center gap-1 text-2xl font-semibold">
        ⚡ ₹{totalData.total}
      </span>
      <span className="text-xs text-gray-600 mt-1 flex items-center gap-1">
         Estimated Total
      </span>
    </div>
  ) : (
    <div className="flex justify-between items-center">
      <span className="flex items-center gap-1 text-2xl font-semibold">
      </span>
      <span className="text-muted-foreground">/hr</span>
    </div>
  )}
</div>



        {/* Date & Time Picker */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="relative w-full">
              <label className="text-sm">Date and Time*</label>
              <div
                className="border mt-1 rounded-lg py-3 px-2 cursor-pointer bg-white flex flex-row items-center gap-2 h-full w-full"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <div className="flex flex-row gap-2 pt-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="text-sm">
                    {selectedDate ? selectedDate.toDateString() : "Select date"}
                  </span>
                </div>
              </div>

              {showCalendar && (
                <div
                  ref={calendarRef}
                  className="absolute top-15 left-0 z-50 bg-white w-full"
                >
                  <Bookingcal schedules={{}} onDateChange={handleDateSelect} />
                </div>
              )}
            </div>

            {/* Time Selection */}
            <div className="flex flex-row gap-4 rounded-lg">
              {/* Start Time Picker */}
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2 border p-3 rounded-md">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <select
                    className="outline-none bg-transparent text-gray-700"
                    onChange={handleStartTimeChange}
                    value={startTime || ""}
                  >
                    <option value="" disabled>Start Time</option>
                    {availableTimes.map((time) => (
                      <option
                        key={time}
                        value={time}
                        className="px-3 py-2 text-gray-700 bg-white hover:bg-blue-100 cursor-pointer"
                      >
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* End Time Picker */}
              <div className="flex flex-col w-full">
                <div
                  className={`flex items-center gap-2 border p-3 rounded-md  ${
                    !startTime ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Clock className="h-4 w-4 text-gray-500" />
                  <select
                    className="outline-none bg-transparent text-gray-700"
                    onChange={(e) => setEndTime(e.target.value)}
                    value={endTime || ""}
                    disabled={!startTime}
                  >
                    <option value="" disabled>End Time</option>
                    {getValidEndTimes().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Attendees */}
          <div className="border rounded-lg p-3">
      <label className="text-sm text-muted-foreground">Attendees</label>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        <select
          className="outline-none w-full bg-transparent text-gray-700"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="1-5">1 - 5 people</option>
          <option value="1-25">1 - 25 people</option>
          <option value="custom">Custom</option>
        </select>

      </div>

      {selectedOption === "custom" && (
        <input
          type="number"
          min="1"
          max="50"
          placeholder="Max capacity is 50"
          value={customAttendees}
          onChange={(e) => setCustomAttendees(e.target.value)}
          className="mt-2 w-full border rounded-lg p-2 text-gray-700 outline-none"
        />
      )}
    </div>

        </div>

        {/* Price Breakdown */}
        {totalData && (
          <div className="border rounded-lg p-4 bg-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Price</h3>
            <div className="flex justify-between text-gray-700">
              <span>{spaceData.price} x {totalData.hours} hrs</span>
              <span>₹{totalData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
  <span className="flex items-center gap-1">
    Processing
    <span className="relative group cursor-pointer">
      <span className="text-xs text-gray-500 border border-gray-400 rounded-full px-2">?</span>
      <div className="absolute hidden group-hover:block bg-white border p-2 shadow-md rounded-md w-56 text-xs text-gray-700 left-1/2 transform -translate-x-1/2 mt-1">
        This covers costs that allow SpaceShare to complete your transaction and provide support for your booking.
      </div>
    </span>
  </span>
  <span>₹{totalData.processingFee.toFixed(2)}</span>
</div>

            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{totalData.total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Book Now Button */}
        <Button
  className="w-full bg-[#8559EC] text-lg hover:bg-[#5838A2]"
  onClick={async () => {
    const bookingId = await createBooking({
      selectedDate,
      startTime,
      endTime,
      selectedOption,
      customAttendees,
    });
    if (bookingId) {
      window.location.href = `/bkc/${bookingId}`;
    }
  }}
>
  Book Now
</Button>


        <p className="text-sm text-center text-muted-foreground">
          You won't be charged yet
        </p>
        <p className="text-md">⚡ Instant Book </p>
        <p className="text-sm text-muted-foreground">After payment, your booking will be instantly confirmed. Enjoy a seamless and hassle-free booking experience..</p>
      </div>
    </div>
  );
};

export default BookingSummary;
