"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import RunningProjectsSection from "@/components/RunningProjectsSection";

// Single hero image - removed array since only one was being used
const HERO_IMAGE = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

// Activities data - unchanged as it contains necessary information
const activities = [
  {
    id: "photo-shoot",
    name: "Photo shoot",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG8lMjBzaG9vdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Professional studios and unique backdrops for your photography needs",
  },
  {
    id: "meeting",
    name: "Meeting",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Conference rooms and meeting spaces for your business gatherings",
  },
  {
    id: "birthday-party",
    name: "Birthday party",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Fun and festive venues to celebrate your special day",
  },
  {
    id: "video-shoot",
    name: "Video shoot",
    image: "https://images.unsplash.com/photo-1576155984015-9e7a7d92d3d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Professional studios for your video production needs",
  },
  {
    id: "baby-shower",
    name: "Baby shower",
    image: "https://images.unsplash.com/photo-1581952976147-5a2d15560349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Cozy and elegant spaces to celebrate new arrivals",
  },
  {
    id: "workshop",
    name: "Workshop",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Functional spaces for hands-on learning and creation",
  },
  {
    id: "wedding-reception",
    name: "Wedding reception",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Beautiful venues to celebrate your special day",
  },
  {
    id: "live-music",
    name: "Live music",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Venues with great acoustics for performances",
  },
  {
    id: "party",
    name: "Party",
    image: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Exciting spaces for all your celebration needs",
  },
  {
    id: "music-video",
    name: "Music video",
    image: "https://images.unsplash.com/photo-1619983081263-8f16daa9214a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Creative spaces for your music video production",
  },
  {
    id: "bridal-shower",
    name: "Bridal shower",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Elegant venues to celebrate the bride-to-be",
  },
  {
    id: "event",
    name: "Event",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Versatile spaces for any type of event",
  },
  {
    id: "engagement-party",
    name: "Engagement party",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Romantic settings to celebrate your engagement",
  },
  {
    id: "corporate-event",
    name: "Corporate event",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Professional venues for your business events",
  },
  {
    id: "graduation-party",
    name: "Graduation party",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Celebratory spaces for academic achievements",
  },
  {
    id: "pop-up",
    name: "Pop-up",
    image: "https://images.unsplash.com/photo-1563784462041-5f97ac9523dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Temporary spaces for retail and promotional events",
  },
  {
    id: "gala",
    name: "Gala",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Elegant venues for formal celebrations",
  },
  {
    id: "film-shoot",
    name: "Film shoot",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Professional settings for your film production",
  },
];

// Footer links data
const footerLinks = [
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact Us", "Sustainability"],
  },
  {
    title: "Products",
    links: ["Living", "Bedroom", "Kitchen", "Outdoor"],
  },
  {
    title: "Resources",
    links: ["Blog", "FAQ", "Support", "Dealers"],
  },
];

// Social media links - extracted for DRY principle
const socialLinks = ["Facebook", "Twitter", "Instagram", "LinkedIn"];

// Auto-rotate interval in milliseconds - extracted as constant
const AUTO_ROTATE_INTERVAL = 3000;
const AUTO_ROTATE_RESUME_DELAY = 5000;

export default function Home() {
  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const hostRef = useRef(null);
  
  // State management
  const [selectedActivity, setSelectedActivity] = useState(activities[0]);
  const [autoRotate, setAutoRotate] = useState(true);

  // Scroll animations setup
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: hostProgress } = useScroll({
    target: hostRef,
    offset: ["start end", "end start"],
  });

  // Transform values for parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const featuredY = useTransform(featuredProgress, [0, 1], [100, -100]);
  const hostY = useTransform(hostProgress, [0, 1], [100, -100]);

  // Memoize activity chunks to prevent unnecessary recalculations
  const activityChunks = useMemo(() => {
    const chunks = [];
    const chunkSize = 4;
    for (let i = 0; i < activities.length; i += chunkSize) {
      chunks.push(activities.slice(i, i + chunkSize));
    }
    return chunks;
  }, []);

  // Set smooth scrolling behavior on component mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Auto-rotate activity carousel
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      const currentIndex = activities.findIndex(
        (activity) => activity.id === selectedActivity.id
      );
      const nextIndex = (currentIndex + 1) % activities.length;
      setSelectedActivity(activities[nextIndex]);
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [selectedActivity, autoRotate]);

  // Handle activity selection and auto-rotation pause/resume
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setAutoRotate(false);

    // Resume auto-rotation after delay
    const timer = setTimeout(() => {
      setAutoRotate(true);
    }, AUTO_ROTATE_RESUME_DELAY);

    return () => clearTimeout(timer);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Premium Indian venue"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {[1, 2, 3].map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                i === 0 ? "bg-white" : "border border-white/50"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="mt-auto mb-16 md:mb-32 max-w-full md:max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light mb-4 md:mb-6 text-white">
              Book Unique Spaces. Create Memories
              <span className="text-neutral-300">.</span>
            </h1>
            <p className="text-base md:text-lg text-white mb-6 md:mb-8 max-w-xl">
              India's premier marketplace for unique spaces. From rooftop venues
              to creative studios, find the perfect space for your next event or
              work session.
            </p>
            <Button
              variant="outline"
              className="rounded-none border-white text-white hover:bg-white hover:text-black"
            >
              Explore Spaces
            </Button>
          </div>
        </motion.div>
      </section>
      
      <RunningProjectsSection />
      
      {/* Categories Section */}
      <section ref={featuredRef} className="relative min-h-screen overflow-hidden bg-black text-white py-12 md:py-24">
        <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text and Categories */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  A space for every moment
                </h2>
                <p className="text-lg md:text-xl">
                  Book a unique space for your{" "}
                  {selectedActivity.name.toLowerCase()}
                </p>
              </div>

              {/* Mobile view: Horizontal scrolling categories */}
              <div className="md:hidden overflow-x-auto pb-4">
                <div className="flex space-x-2 min-w-max">
                  {activities.map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => handleActivityClick(activity)}
                      className={cn(
                        "px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors",
                        selectedActivity.id === activity.id
                          ? "bg-white text-black"
                          : "bg-transparent text-white border border-white/30 hover:bg-gray-800"
                      )}
                    >
                      {activity.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop view: Grid of categories */}
              <div className="hidden md:block">
                {activityChunks.map((chunk, index) => (
                  <div key={index} className="flex flex-wrap gap-3 mb-3">
                    {chunk.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => handleActivityClick(activity)}
                        className={cn(
                          "px-4 py-2 rounded-full transition-colors",
                          selectedActivity.id === activity.id
                            ? "bg-white text-black"
                            : "bg-transparent text-white hover:bg-gray-800 border border-white/30"
                        )}
                      >
                        {activity.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              <button className="inline-block bg-black text-white border border-white px-4 py-2 md:px-6 md:py-3 font-medium">
                Browse all activities
              </button>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    selectedActivity.id === activity.id
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  )}
                >
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={`Space for ${activity.name}`}
                    fill
                    className="object-cover"
                    priority={selectedActivity.id === activity.id}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold">{activity.name}</h3>
                    <p className="text-xs md:text-sm text-gray-300">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Auto-rotate indicator */}
              <div className="absolute top-4 right-4 bg-black/50 rounded-full px-2 py-1 text-xs">
                {autoRotate ? "Auto-rotating" : "Paused"}
              </div>

              {/* Manual controls */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
                  aria-label={autoRotate ? "Pause rotation" : "Start rotation"}
                >
                  {autoRotate ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 md:h-5 md:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
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
                      className="h-4 w-4 md:h-5 md:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
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
        </main>
      </section>

      {/* Host Section */}
      <section ref={hostRef} className="relative min-h-screen bg-black text-white py-16 md:py-24">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="relative aspect-video md:aspect-square w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ y: hostY }}
                className="h-full w-full relative rounded-lg overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="SpaceSphere host in a vibrant pink room with a dining table"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </motion.div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-6 md:space-y-10 order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Earn income as a SpaceSphere host
                </h2>
                <p className="text-xl md:text-2xl mb-4">Put your space to work.</p>
                <p className="text-base md:text-xl mb-8 max-w-lg">
                  Earn extra income by opening your doors to personal and professional gatherings in your area. Our hosts earn an average of ₹45,000 per month sharing their spaces.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/becomeHost"
                    className="inline-block px-6 py-3 md:px-8 md:py-4 bg-white text-black font-medium hover:bg-gray-100 transition-colors text-center text-lg"
                  >
                    List your space
                  </Link>
                  <Button
                    variant="outline"
                    className="px-6 py-3 md:px-8 md:py-4 border-white text-white hover:bg-white/10 text-lg transition-colors"
                  >
                    Learn more
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4 space-y-6">
              <Image src="/poliform-logo.svg" alt="SpaceSphere" width={180} height={60} className="mb-6 invert" />
              <p className="text-neutral-400 text-lg mb-8 max-w-md">
                Creating spaces of extraordinary sophistication through our curated collection of contemporary furniture and design pieces for every occasion.
              </p>
              <div className="flex flex-wrap gap-6">
                {socialLinks.map((social) => (
                  <a key={social} href="#" className="text-neutral-400 hover:text-white text-lg transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden md:block md:col-span-1"></div>
            {footerLinks.map((column, index) => (
              <div key={index} className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-6">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-neutral-400 hover:text-white text-lg transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="md:col-span-3">
              <h3 className="text-xl font-semibold mb-6">Subscribe to Our Newsletter</h3>
              <form className="space-y-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50 h-12 text-lg rounded-none"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full md:w-auto rounded-none border-white text-white hover:bg-white hover:text-black h-12 text-lg transition-colors"
                >
                  Subscribe
                </Button>
              </form>
              <p className="mt-4 text-neutral-400">
                Get exclusive updates on new spaces and special offers
              </p>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-center md:text-left">
              © 2025 SpaceSphere. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}