'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Star, Users, Clock, MapPin, Share2, Calendar, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { fetchListingById , updateSpace } from "@/actions/dashboard/action";

const EditSpace = () => {
  const [spaceData, setSpaceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = {
    id:"cm6tcx7e70000flrbd10an0pg"
  }
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
        <div className="md:col-span-1">
          <div className="sticky top-8 border rounded-xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-semibold">₹{spaceData.price}</span>
              <span className="text-muted-foreground">/hr</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-3">
                  <label className="text-sm text-muted-foreground">Date</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Select date</span>
                  </div>
                </div>
                <div className="border rounded-lg p-3">
                  <label className="text-sm text-muted-foreground">Time</label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Available {spaceData.timeings[0]}hrs</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-3">
                <label className="text-sm text-muted-foreground">Attendees</label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>1-{spaceData.people} people</span>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </div>
              </div>
            </div>

            <Button className="w-full">Start Booking</Button>

            <p className="text-sm text-center text-muted-foreground">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSpace;