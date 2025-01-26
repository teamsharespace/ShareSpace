"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Users, DollarSign } from "lucide-react"

interface Space {
  id: string
  title: string
  description: string
  price: number
  capacity: number
  address: string
  city: string
  state: string
  images: string[]
  amenities: string[]
}

export default function SpacesPage() {
  const searchParams = useSearchParams()
  const [spaces, setSpaces] = useState<Space[]>([])
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    minPrice: "0",
    maxPrice: "1000",
    capacity: "1",
    category: searchParams.get("category") || ""
  })

  useEffect(() => {
    const fetchSpaces = async () => {
      const queryParams = new URLSearchParams({
        ...(filters.city && { city: filters.city }),
        ...(filters.category && { category: filters.category }),
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        capacity: filters.capacity
      })

      const response = await fetch(`/api/spaces?${queryParams}`)
      const data = await response.json()
      setSpaces(data)
    }

    fetchSpaces()
  }, [filters])

  return (
    <div className="min-h-screen bg-background">
      {/* Search Filters */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by city"
                className="pl-9"
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                />
                <Input
                  type="number"
                  min="0"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-2">Minimum Capacity</label>
              <Input
                type="number"
                min="1"
                value={filters.capacity}
                onChange={(e) => setFilters(prev => ({ ...prev, capacity: e.target.value }))}
              />
            </div>
            <Button className="self-end">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Space Listings */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <Link href={`/spaces/${space.id}`} key={space.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={space.images[0]}
                    alt={space.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{space.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{space.city}, {space.state}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">Up to {space.capacity} people</span>
                    </div>
                    <div className="flex items-center font-medium">
                      <DollarSign className="h-4 w-4" />
                      <span>{space.price}/hour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}