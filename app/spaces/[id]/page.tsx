"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Users, DollarSign, Wifi, Coffee, ParkingMeter as Parking } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
  host: {
    name: string
    image?: string
  }
}

const amenityIcons = {
  wifi: Wifi,
  coffee: Coffee,
  parking: Parking,
}

export default function SpaceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [space, setSpace] = useState<Space | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    const fetchSpace = async () => {
      const response = await fetch(`/api/spaces/${params.id}`)
      const data = await response.json()
      setSpace(data)
    }

    if (params.id) {
      fetchSpace()
    }
  }, [params.id])

  const handleBooking = () => {
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to book this space",
        variant: "destructive",
      })
      router.push("/login")
      return
    }
    // Implement booking logic here
  }

  if (!space) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4">
        {/* Image Gallery */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="relative h-[400px]">
            <Image
              src={space.images[0]}
              alt={space.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {space.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative h-[190px]">
                <Image
                  src={image}
                  alt={`${space.title} ${index + 2}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Space Details */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">{space.title}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{space.city}, {space.state}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Up to {space.capacity} people</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">About this space</h2>
              <p className="text-muted-foreground">{space.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {space.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Coffee
                  return (
                    <div key={amenity} className="flex items-center">
                      <Icon className="h-5 w-5 mr-2" />
                      <span className="capitalize">{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center text-2xl">
                    <DollarSign className="h-6 w-6" />
                    <span>{space.price}</span>
                    <span className="text-muted-foreground text-base ml-2">/hour</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  <Button className="w-full" onClick={handleBooking}>
                    {session ? "Request to Book" : "Sign in to Book"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}