import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Find Your Perfect Space
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
            Book unique spaces for meetings, photoshoots, events, or coworking
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/spaces">
                <Search className="mr-2 h-5 w-5" />
                Explore Spaces
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10" asChild>
              <Link href="/become-host">
                List Your Space
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/spaces?category=${category.slug}`}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const categories = [
  {
    name: "Meeting Rooms",
    slug: "meeting-rooms",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4",
  },
  {
    name: "Photo Studios",
    slug: "photo-studios",
    image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc",
  },
  {
    name: "Event Spaces",
    slug: "event-spaces",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
  },
]

const steps = [
  {
    icon: Search,
    title: "Find Your Space",
    description: "Search and filter through unique spaces that match your needs",
  },
  {
    icon: Search,
    title: "Book Instantly",
    description: "Reserve your space with instant booking and secure payment",
  },
  {
    icon: Search,
    title: "Create Memories",
    description: "Enjoy your time in a perfectly suited space for your activity",
  },
]
