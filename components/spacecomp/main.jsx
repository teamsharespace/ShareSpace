'use client';

import { useState, useEffect } from 'react';
import { Heart, MapPin, Star, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchListings } from "@/app/actions/dashboard/action";
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../../components/spacecomp/Map'), {
  ssr: false
});

function Main() {
  const [searchAsMove, setSearchAsMove] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [listings, setListings] = useState([]);
  
  // Fetch listings from backend
  useEffect(() => {
    async function loadListings() {
      const data = await fetchListings();
      setListings(data);
      console.log(data);
    }
    loadListings();
  }, []); 

  const toggleMapVisibility = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="w-full mt-40">
      <div className={showMap ? 'grid lg:grid-cols-[2fr_1fr] gap-4' : ''}>
        {/* Left Side - Listings */}
        <div className={`grid gap-6 mx-5 my-5 ${showMap ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="group relative cursor-pointer"
              onClick={() => window.location.href = `/spaces/${listing.id}`}
            >
              <div className="group relative">
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img
                    src={listing.images[0]}
                    alt={listing.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-4 backdrop-blur-sm"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{listing.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {listing.status === 'Power Host' && (
                      <>
                        <span className="font-medium text-foreground">Power Host</span>
                        <span>·</span>
                      </>
                    )}
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4" />
                      {listing.reviews} ({listing.reviews})
                    </div>
                    <span>·</span>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {listing.people} guests
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {listing.categories.map((tag) => (
                      <span key={tag} className="text-sm text-muted-foreground">
                        {tag}
                        {" · "}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1">
                    <span className="font-semibold">From ₹{listing.price} {listing.currency}</span>
                    <span className="text-muted-foreground">/hr</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showMap && (
          <div className="hidden lg:block sticky top-[4.5rem] h-[calc(100vh-4.5rem)]">
            <div className="h-full rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">Map View</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSearchAsMove(!searchAsMove)}>
                  {searchAsMove ? "Search as map moves" : "Search this area"}
                </Button>
              </div>
              <div>
                <DynamicMap listings={listings} />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4"
                onClick={toggleMapVisibility}
              >
                <X className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          </div>
        )}

        {!showMap && (
          <Button
            variant="outline"
            onClick={toggleMapVisibility}
            className="fixed top-[200px] right-4 z-10 flex items-center gap-2"
          >
            <MapPin className="h-5 w-5" />
            <span>Show Map</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Main;
