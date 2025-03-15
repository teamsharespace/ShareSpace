'use client';

import React, { useState, useEffect } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchListings } from "@/app/actions/dashboard/action";
import { useRouter } from 'next/navigation';
import { Listing } from '@prisma/client';
import dynamic from 'next/dynamic';

// Dynamic Map Import
const DynamicMap = dynamic(() => import('./Map'), { ssr: false });

function Main() {
    const [showMap, setShowMap] = useState(true);
    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);  // <-- Add loading state
    const [index, setIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        async function loadListings() {
            const data = await fetchListings();
            setListings(data);
            setIsLoading(false); // <-- Set loading to false once data is fetched
        }
        loadListings();
    }, []);

    function handlePrevPhoto(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.stopPropagation();
        setIndex(index > 0 ? index - 1 : 3);
    }

    function handleNextPhoto(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        event.stopPropagation();
        setIndex(index < 3 ? index + 1 : 0);
    }

    return (
        <div className="w-full mt-40">
            <div className={showMap ? 'grid lg:grid-cols-[2fr_1fr] gap-4' : ''}>
                <div className={`grid gap-6 mx-5 my-5 ${showMap ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
                    
                {isLoading &&
    Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
            <div className="h-80 bg-gray-300 rounded-xl"></div>
            
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
        </div>
    ))
}



                    {/* Actual Listings */}
                    {!isLoading && listings?.map((listing) => (
                        <div
                            key={listing.id}
                            className="group relative cursor-pointer"
                            onClick={() => router.push(`/spaces/showListing/${listing.id}`)}
                        >
                            <div className="group relative">
                                <div className="aspect-square overflow-hidden rounded-xl">
                                    <img
                                        src={listing.photos && listing.photos.length > 0
                                            ? listing.photos[index]
                                            : "https://via.placeholder.com/400x400?text=No+Image"}
                                        alt={listing?.name || "Space"}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <Button
                                        variant="ghost"
                                        className="absolute right-4 top-4 backdrop-blur-sm"
                                    >
                                        <Heart className="h-5 w-5" />
                                    </Button>

                                    <div className="absolute left-3 top-48 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 w-8 rounded-full p-0 shadow-md"
                                            onClick={(e) => handlePrevPhoto(e)}
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    <div className="absolute right-3 top-48 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 w-8 rounded-full p-0 shadow-md"
                                            onClick={(e) => handleNextPhoto(e)}
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold">{listing.name}</h3>
                                    </div>
                                    <p className="text-muted-foreground">{listing.address}, {listing.city}, {listing.state}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                  {/* {showMap && (
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
        )}*/}

            </div>
        </div>
    );
}

export default Main;


     