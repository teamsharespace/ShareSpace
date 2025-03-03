"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Sample data structure for activities and their corresponding images
const activities = [
  {
    id: "photo-shoot",
    name: "Photo shoot",
    image: "/placeholder.svg?height=600&width=800",
    description: "Professional studios and unique backdrops for your photography needs",
  },
  {
    id: "meeting",
    name: "Meeting",
    image: "/placeholder.svg?height=600&width=800&text=Meeting+Space",
    description: "Conference rooms and meeting spaces for your business gatherings",
  },
  {
    id: "birthday-party",
    name: "Birthday party",
    image: "/placeholder.svg?height=600&width=800&text=Birthday+Party",
    description: "Fun and festive venues to celebrate your special day",
  },
  {
    id: "video-shoot",
    name: "Video shoot",
    image: "/placeholder.svg?height=600&width=800&text=Video+Shoot",
    description: "Professional studios for your video production needs",
  },
  {
    id: "baby-shower",
    name: "Baby shower",
    image: "/placeholder.svg?height=600&width=800&text=Baby+Shower",
    description: "Cozy and elegant spaces to celebrate new arrivals",
  },
  {
    id: "workshop",
    name: "Workshop",
    image: "/placeholder.svg?height=600&width=800&text=Workshop",
    description: "Functional spaces for hands-on learning and creation",
  },
  {
    id: "wedding-reception",
    name: "Wedding reception",
    image: "/placeholder.svg?height=600&width=800&text=Wedding+Reception",
    description: "Beautiful venues to celebrate your special day",
  },
  {
    id: "live-music",
    name: "Live music",
    image: "/placeholder.svg?height=600&width=800&text=Live+Music",
    description: "Venues with great acoustics for performances",
  },
  {
    id: "party",
    name: "Party",
    image: "/placeholder.svg?height=600&width=800&text=Party",
    description: "Exciting spaces for all your celebration needs",
  },
  {
    id: "music-video",
    name: "Music video",
    image: "/placeholder.svg?height=600&width=800&text=Music+Video",
    description: "Creative spaces for your music video production",
  },
  {
    id: "bridal-shower",
    name: "Bridal shower",
    image: "/placeholder.svg?height=600&width=800&text=Bridal+Shower",
    description: "Elegant venues to celebrate the bride-to-be",
  },
  {
    id: "event",
    name: "Event",
    image: "/placeholder.svg?height=600&width=800&text=Event",
    description: "Versatile spaces for any type of event",
  },
  {
    id: "engagement-party",
    name: "Engagement party",
    image: "/placeholder.svg?height=600&width=800&text=Engagement+Party",
    description: "Romantic settings to celebrate your engagement",
  },
  {
    id: "corporate-event",
    name: "Corporate event",
    image: "/placeholder.svg?height=600&width=800&text=Corporate+Event",
    description: "Professional venues for your business events",
  },
  {
    id: "graduation-party",
    name: "Graduation party",
    image: "/placeholder.svg?height=600&width=800&text=Graduation+Party",
    description: "Celebratory spaces for academic achievements",
  },
  {
    id: "pop-up",
    name: "Pop-up",
    image: "/placeholder.svg?height=600&width=800&text=Pop-up",
    description: "Temporary spaces for retail and promotional events",
  },
  {
    id: "gala",
    name: "Gala",
    image: "/placeholder.svg?height=600&width=800&text=Gala",
    description: "Elegant venues for formal celebrations",
  },
  {
    id: "film-shoot",
    name: "Film shoot",
    image: "/placeholder.svg?height=600&width=800&text=Film+Shoot",
    description: "Professional settings for your film production",
  },
]

export default function Home() {
  const [selectedActivity, setSelectedActivity] = useState(activities[0])
  const [autoRotate, setAutoRotate] = useState(true)

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (!autoRotate) return

    const interval = setInterval(() => {
      const currentIndex = activities.findIndex((activity) => activity.id === selectedActivity.id)
      const nextIndex = (currentIndex + 1) % activities.length
      setSelectedActivity(activities[nextIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [selectedActivity, autoRotate])

  // Pause auto-rotation when user interacts with the categories
  const handleActivityClick = (activity: (typeof activities)[0]) => {
    setSelectedActivity(activity)
    setAutoRotate(false)

    // Resume auto-rotation after 30 seconds of inactivity
    const timer = setTimeout(() => {
      setAutoRotate(true)
    }, 30000)

    return () => clearTimeout(timer)
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Main Content */}
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text and Categories */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold">A space for every moment</h2>
              <p className="text-xl">Book a unique space for your {selectedActivity.name.toLowerCase()}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {activities.slice(0, 4).map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => handleActivityClick(activity)}
                  className={cn(
                    "px-4 py-2 rounded-full transition-colors",
                    selectedActivity.id === activity.id
                      ? "bg-white text-black"
                      : "bg-transparent text-white hover:bg-gray-800",
                  )}
                >
                  {activity.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {activities.slice(4, 8).map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => handleActivityClick(activity)}
                  className={cn(
                    "px-4 py-2 rounded-full transition-colors",
                    selectedActivity.id === activity.id
                      ? "bg-white text-black"
                      : "bg-transparent text-white hover:bg-gray-800",
                  )}
                >
                  {activity.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {activities.slice(8, 12).map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => handleActivityClick(activity)}
                  className={cn(
                    "px-4 py-2 rounded-full transition-colors",
                    selectedActivity.id === activity.id
                      ? "bg-white text-black"
                      : "bg-transparent text-white hover:bg-gray-800",
                  )}
                >
                  {activity.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {activities.slice(12, 16).map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => handleActivityClick(activity)}
                  className={cn(
                    "px-4 py-2 rounded-full transition-colors",
                    selectedActivity.id === activity.id
                      ? "bg-white text-black"
                      : "bg-transparent text-white hover:bg-gray-800",
                  )}
                >
                  {activity.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {activities.slice(16).map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => handleActivityClick(activity)}
                  className={cn(
                    "px-4 py-2 rounded-full transition-colors",
                    selectedActivity.id === activity.id
                      ? "bg-white text-black"
                      : "bg-transparent text-white hover:bg-gray-800",
                  )}
                >
                  {activity.name}
                </button>
              ))}
            </div>

            <button className="bg-black text-white border border-white px-6 py-3 font-medium">
              Browse all activities
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  selectedActivity.id === activity.id ? "opacity-100" : "opacity-0 pointer-events-none",
                )}
              >
                <Image
                  src={activity.image || "/placeholder.svg"}
                  alt={`Space for ${activity.name}`}
                  fill
                  className="object-cover"
                  priority={selectedActivity.id === activity.id}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-xl font-bold">{activity.name}</h3>
                  <p className="text-sm text-gray-300">{activity.description}</p>
                </div>
              </div>
            ))}

            {/* Auto-rotate indicator */}
            <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1 text-xs">
              {autoRotate ? "Auto-rotating" : "Paused"}
            </div>

            {/* Manual controls */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
              >
                {autoRotate ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

