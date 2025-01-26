"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"

interface Booking {
  id: string
  space: {
    title: string
    address: string
  }
  startTime: string
  endTime: string
  totalPrice: number
  status: string
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    // Fetch user's bookings
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings")
        if (response.ok) {
          const data = await response.json()
          setBookings(data)
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error)
      }
    }

    fetchBookings()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your scheduled spaces</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">No upcoming bookings</p>
                  <Button asChild>
                    <Link href="/spaces">Find a Space</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{booking.space.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {booking.space.address}
                            </p>
                            <p className="text-sm mt-2">
                              {new Date(booking.startTime).toLocaleDateString()} -{" "}
                              {new Date(booking.startTime).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-primary/10 text-primary">
                              {booking.status}
                            </span>
                            <p className="mt-2 font-medium">${booking.totalPrice}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}