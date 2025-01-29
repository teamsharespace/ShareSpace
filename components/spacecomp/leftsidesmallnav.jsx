"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"

export default function LeftSideSmallNav() {
  const [activeFilter, setActiveFilter] = useState(null)
  const [date, setDate] = useState(new Date())

  const whenButtonRef = useRef(null)
  const priceButtonRef = useRef(null)
  const attendeesButtonRef = useRef(null)
  const filterButtonRef = useRef(null)

  const toggleFilter = (filter) => {
    setActiveFilter(activeFilter === filter ? null : filter)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        whenButtonRef.current && !whenButtonRef.current.contains(event.target) &&
        priceButtonRef.current && !priceButtonRef.current.contains(event.target) &&
        attendeesButtonRef.current && !attendeesButtonRef.current.contains(event.target) &&
        filterButtonRef.current && !filterButtonRef.current.contains(event.target)
      ) {
        setActiveFilter(null) // Close all popovers
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

return (
<div className="flex flex-row gap-4 p-4 relative">
        {/* When - Date Picker */}
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => toggleFilter("when")}
            ref={whenButtonRef}
          >
            <span>When</span>
            {activeFilter === "when" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          {activeFilter === "when" && (
            <div
              className="absolute left-0 mt-2 bg-gray-800 p-4 rounded-lg w-72 z-10"
              style={{ top: "calc(100% + 5px)" }}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    {date ? format(date, "PPP") : "Select Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>

              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={() => setDate(undefined)}>
                  Clear
                </Button>
                <Button>Apply</Button>
              </div>
            </div>
          )}
        </div>

        {/* Price - Range Input */}
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => toggleFilter("price")}
            ref={priceButtonRef}
          >
            <span>Price</span>
            {activeFilter === "price" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          {activeFilter === "price" && (
            <div
              className="absolute left-0 mt-2 bg-gray-800 p-4 rounded-lg w-72 z-10"
              style={{ top: "calc(100% + 5px)" }}
            >
              <label className="text-white text-sm">Enter Price Range</label>
              <div className="flex space-x-2 mt-2">
                <Input type="number" placeholder="Min" className="w-1/2" />
                <Input type="number" placeholder="Max" className="w-1/2" />
              </div>

              <div className="mt-4 flex justify-between">
                <Button variant="outline">Clear</Button>
                <Button>Done</Button>
              </div>
            </div>
          )}
        </div>

        {/* Attendees - Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => toggleFilter("attendees")}
            ref={attendeesButtonRef}
          >
            <span>Attendees</span>
            {activeFilter === "attendees" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          {activeFilter === "attendees" && (
            <div
              className="absolute left-0 mt-2 bg-gray-800 p-4 rounded-lg w-72 z-10"
              style={{ top: "calc(100% + 5px)" }}
            >
              <label className="text-white text-sm">Number of Attendees</label>
              <Input type="number" placeholder="Enter number" className="mt-2" />

              <div className="mt-4 flex justify-between">
                <Button variant="outline">Clear</Button>
                <Button>Done</Button>
              </div>
            </div>
          )}
        </div>

        {/* Filter - Some Info Text */}
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => toggleFilter("filter")}
            ref={filterButtonRef}
          >
            <span>Filter</span>
            {activeFilter === "filter" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          {activeFilter === "filter" && (
            <div
              className="absolute left-0 mt-2 bg-gray-800 p-4 rounded-lg w-72 z-10"
              style={{ top: "calc(100% + 5px)" }}
            >
              <p className="text-white text-sm">
                Apply additional filters to find the best spaces that match your needs.
              </p>
            </div>
          )}
        </div>
      </div>
)};