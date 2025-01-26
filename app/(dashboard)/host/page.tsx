"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function HostDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalEarnings: 0,
    activeListings: 0,
    averageRating: 0,
  })

  useEffect(() => {
    // Fetch host stats
    const fetchStats = async () => {
      // Implementation would fetch real data from the API
      setStats({
        totalBookings: 45,
        totalEarnings: 8500,
        activeListings: 3,
        averageRating: 4.8,
      })
    }

    fetchStats()
  }, [])

  const earningsData = [
    { month: "Jan", earnings: 1200 },
    { month: "Feb", earnings: 1400 },
    { month: "Mar", earnings: 1100 },
    { month: "Apr", earnings: 1600 },
    { month: "May", earnings: 1800 },
    { month: "Jun", earnings: 2000 },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Host Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
            <CardDescription>All-time bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalBookings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
            <CardDescription>All-time earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${stats.totalEarnings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Listings</CardTitle>
            <CardDescription>Current active spaces</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeListings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
            <CardDescription>Overall rating</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.averageRating}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>Monthly earnings statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}