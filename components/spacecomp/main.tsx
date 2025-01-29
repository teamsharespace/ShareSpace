'use client';

import { useState } from 'react';
import { Heart, MapPin, Star, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Listing {
  id: number;
  title: string;
  rating: number;
  reviews: number;
  guests: number;
  price: number;
  image: string;
  tags: string[];
  powerHost: boolean;
}

const listings: Listing[] = [
  {
    id: 1,
    title: "Luxurious Modern Event Space with LED Lighting",
    rating: 4.9,
    reviews: 13,
    guests: 45,
    price: 100,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80",
    tags: ["Dance floor", "LED lighting", "Sound system"],
    powerHost: true,
  },
  {
    id: 2,
    title: "Industrial Chic Warehouse with Neon Accents",
    rating: 4.4,
    reviews: 17,
    guests: 80,
    price: 150,
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80",
    tags: ["Warehouse", "Neon lights", "High ceilings"],
    powerHost: false,
  },
  {
    id: 3,
    title: "Retro Disco Paradise with Mirror Ball",
    rating: 5.0,
    reviews: 184,
    guests: 100,
    price: 200,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80",
    tags: ["Disco ball", "Dance floor", "Retro vibes"],
    powerHost: true,
  },
  {
    id: 4,
    title: "Elegant Ballroom with Crystal Chandeliers",
    rating: 4.8,
    reviews: 156,
    guests: 200,
    price: 300,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80",
    tags: ["Ballroom", "Chandeliers", "Stage"],
    powerHost: true,
  },
  {
    id: 5,
    title: "Urban Rooftop Lounge with City Views",
    rating: 4.7,
    reviews: 92,
    guests: 150,
    price: 250,
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80",
    tags: ["Rooftop", "City view", "Lounge"],
    powerHost: true,
  },
  {
    id: 6,
    title: "Contemporary Art Gallery & Event Space",
    rating: 4.9,
    reviews: 78,
    guests: 120,
    price: 180,
    image: "https://images.unsplash.com/photo-1525342306875-02cd44b6c3b2?auto=format&fit=crop&q=80",
    tags: ["Gallery", "Modern", "Versatile"],
    powerHost: false,
  },
  {
    id: 7,
    title: "Historic Theater with Modern Amenities",
    rating: 4.6,
    reviews: 143,
    guests: 250,
    price: 400,
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80",
    tags: ["Theater", "Stage", "Historic"],
    powerHost: true,

  },
  {
    id: 8,
    title: "Garden Pavilion with Fairy Lights",
    rating: 4.8,
    reviews: 167,
    guests: 180,
    price: 220,
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80",
    tags: ["Garden", "Outdoor", "Lighting"],
    powerHost: true,
  }
];


function Main() {
  const [searchAsMove, setSearchAsMove] = useState(true);
  const [showMap, setShowMap] = useState(true);

  const toggleMapVisibility = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="w-full mt-40">
      <div className={showMap ? 'grid lg:grid-cols-[2fr_1fr] gap-4' : ''}>
        {/* Left Side - Listings */}
        <div className={`grid gap-6 ${showMap ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
          {listings.map((listing) =>  (
  <div
  key={listing.id}
  className="group relative cursor-pointer"
  onClick={() => window.location.href = `/listing/${listing.id}`} // Navigate to the listing page
>
            <div key={listing.id} className="group relative">
              <div className="aspect-square overflow-hidden rounded-xl">
                <img
                  src={listing.image}
                  alt={listing.title}
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
                  <h3 className="font-semibold">{listing.title}</h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  {listing.powerHost && (
                    <>
                      <span className="font-medium text-foreground">Power Host</span>
                      <span>·</span>
                    </>
                  )}
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4" />
                    {listing.rating} ({listing.reviews})
                  </div>
                  <span>·</span>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {listing.guests} guests
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {listing.tags.map((tag) => (
                    <span key={tag} className="text-sm text-muted-foreground">
                      {tag}
                      {" · "}
                    </span>
                  ))}
                </div>
                <p className="mt-1">
                  <span className="font-semibold">From ${listing.price}</span>
                  <span className="text-muted-foreground">/hr</span>
                </p>
              </div>
            </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
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
              <div className="h-[calc(100%-3rem)] w-full rounded-lg bg-muted">
                {/* Map Placeholder */}
                <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                  Map View
                </div>
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

        {/* Show Map Button (visible when map is hidden) */}
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