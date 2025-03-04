'use client';

import { useState, useEffect , useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Star, Users, Clock, MapPin, Share2, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import {fetchListings as fetchListingById } from "@/app/actions/dashboard/action";
import BookingSummary from '@/components/spacecomp/slug/Booking'


const SpaceDetail = ({ params }) => {
  const [spaceData, setSpaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Available times in 1-hour intervals (adjust if needed)
  const availableTimes = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  // Handle Start Time Selection
  const handleStartTimeChange = (event) => {
    const selectedTime = event.target.value;
    setStartTime(selectedTime);

    // Reset End Time if it is less than 1 hour ahead
    const startIndex = availableTimes.indexOf(selectedTime);
    setEndTime(null); // Reset end time selection
  };

  // Get valid End Times (1 hour after start)
  const getValidEndTimes = () => {
    if (!startTime) return [];

    const startIndex = availableTimes.indexOf(startTime);
    return availableTimes.slice(startIndex + 1); // At least 1-hour gap
  };

  // Handle clicks outside to close the calendar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateChange(date);
    setShowCalendar(false);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date); // Debugging, remove if unnecessary
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchListingById(params.id);
        setSpaceData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch space details');
        console.error('Error fetching space details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);



  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg">Loading space details...</div>
      </div>
    );
  }

  if (error || !spaceData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">{error || 'Space not found'}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">{spaceData.name}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{spaceData.reviews} reviews</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{spaceData.city}, {spaceData.state}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 rounded-xl overflow-hidden">
        <div className="aspect-[4/3] relative">
          <img
            src={spaceData.images[0]}
            alt={spaceData.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square relative">
              <img
                src={spaceData.images[0]}
                alt={`${spaceData.name} ${i + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Host Info */}
          <div className="flex items-center justify-between pb-6 border-b">
            <div>
              <h2 className="text-xl font-semibold mb-1">Hosted by {spaceData.hostname}</h2>
              <p className="text-muted-foreground">
                {spaceData.people} people · {spaceData.status}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About this space</h3>
            <p className="text-muted-foreground">{spaceData.about}</p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-4">
              {spaceData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                  <span className="capitalize">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Reviews ({spaceData.reviews})
            </h3>
            <div className="space-y-4">
              {spaceData.comments.map((comment, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                    <div>
                      <p className="font-medium">Reviewer {index + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(spaceData.createdAt, 'MMMM yyyy')}
                      </p>
                    </div>
                  </div>
                  <p>{comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <p className="text-muted-foreground mb-4">{spaceData.address}</p>
            <div className="h-[300px] bg-gray-200 rounded-xl"></div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <BookingSummary spaceData={spaceData} />

      </div>
    </div>
  );
};

export default SpaceDetail;
