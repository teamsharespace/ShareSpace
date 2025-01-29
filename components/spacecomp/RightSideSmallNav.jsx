'use client';
import React, { useRef } from "react";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
const filters = [
    "Floor area",
    "House",
    "Beach",
    "Garden",
    "Gym",
    "Dance studio",
    "Dining area",
    "View",
    "Exterior",
    "Bar",
    "Bedroom",
    "Yard",
    "Mansion",
    "Beachy",
    "Luxury",
  ];

function RightSideSmallNav() {
  const suggestionsRef = useRef(null);



  const scrollLeft = () => {
    if (suggestionsRef.current) {
      suggestionsRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (suggestionsRef.current) {
      suggestionsRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex flex-row items-center gap-4 w-[90%]">
      {/* Suggestions List */}
      <div>|</div>
      <ScrollArea className="w-full">
            <div className="flex gap-4 p-1">
              {filters.map((filter) => (
                <Button key={filter} variant="secondary" className="rounded-full px-6">
                  {filter}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

    </div>
  );
}

export default RightSideSmallNav;
