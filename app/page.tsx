"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Circle, Star, CircleIcon, Gem, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import { inter } from "./font"
import { useState } from "react"
import DynamicFrameLayout from "../components/DynamicFrameLayout"
import { motion, useScroll, useTransform } from "framer-motion"

// Define an array of hero images relevant to Indian spaces
const heroImages = [
  "https://plus.unsplash.com/premium_photo-1684769161054-2fa9a998dcb6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=https://spacepool.com/media/news/toa-heftiba-FV3GConVSss-unsplash_1.jpg.1064x654_q85_crop-smart.jpg", // Modern Indian office space
  "https://spacepool.com/media/news/toa-heftiba-FV3GConVSss-unsplash_1.jpg.1064x654_q85_crop-smart.jpg", // Luxury event space
]

const randomHeroImage = heroImages[Math.floor(Math.random() * heroImages.length)]

export default function Home() {
  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const [headerSize] = useState(1.2)
  const [textSize] = useState(0.8)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  
  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const featuredY = useTransform(featuredProgress, [0, 1], [100, -100])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image
            src={randomHeroImage}
            alt="Premium Indian venue"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {[1, 2, 3].map((_, i) => (
            <button key={i} className={`w-3 h-3 rounded-full ${i === 0 ? "bg-white" : "border border-white/50"}`} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col h-full max-w-7xl mx-auto px-4"
        >
          <div className="mt-auto mb-32 max-w-2xl">
            <h1 className="text-8xl font-light mb-6 text-white">
              Book Unique Spaces.
              Create Memories<span className="text-neutral-300">.</span>
            </h1>
            <p className="text-lg text-white mb-8 max-w-xl">
              India's premier marketplace for unique spaces. From rooftop venues to creative studios, find the perfect space for your next event or work session.
            </p>
            <Button variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-black">
              Explore Spaces
            </Button>
          </div>
        </motion.div>
      </section>

      <div className={`min-h-screen bg-[#141414] flex items-center justify-center p-8 ${inter.variable}`}>
        <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
          <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-between h-full">
            <div className="flex flex-col gap-16">
              <h1 className={`${inter.className} text-4xl md:text-6xl font-light italic text-white/80 tracking-tighter leading-[130%]`}
                style={{ fontSize: `${4 * headerSize}rem` }}>
                List Your
                <br />
                Space on
                <br />
                SpaceShere
              </h1>
              <div className={`${inter.className} flex flex-col gap-12 text-white/50 text-sm font-light max-w-[300px]`}
                style={{ fontSize: `${0.875 * textSize}rem` }}>
                <div className="space-y-6">
                  <div className="h-px bg-white/10 w-full" />
                  <p>
                    Join India's fastest-growing community of space hosts. Whether you have a creative studio, 
                    conference room, or event venue, SpaceShere helps you connect with the right clients.
                  </p>
                  <p>
                    Our platform makes it easy to manage bookings, set custom pricing, and showcase your space
                    to thousands of potential clients across India.
                  </p>
                  <p>Start earning from your space today.</p>
                  <div className="h-px bg-white/10 w-full" />
                </div>
              </div>
            </div>
            <Link
              href="/host"
              className="inline-block px-6 py-3 text-white/70 border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors text-center w-full max-w-[260px] text-sm mt-16"
            >
              Become a Host
            </Link>
          </div>

          <div className="w-full md:flex-grow h-[60vh] md:h-[80vh]">
            <DynamicFrameLayout />
          </div>
        </div>
      </div>

      <section className="py-32 bg-gray-900 text-gray-100 relative overflow-hidden">
  {/* Subtle Background Image */}
  <div className="absolute inset-0 opacity-25">
    <Image
      src="https://unsplash.com/photos/a-living-room-with-a-large-green-couch-VZ2z8ozzy10" 
      alt="Cozy Workspace"
      fill
      className="object-cover"
    />
  </div>

  <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, staggerChildren: 0.2 }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >
      {/* Left Content */}
      <div>
        <h2 className="text-6xl md:text-7xl font-semibold leading-tight mb-8 text-white">
          Turn Your Space into <span className="text-teal-400">Extra Income</span>
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Join thousands of hosts across India earning money by sharing their spaces with ease.
        </p>

        {/* Benefits List */}
        <ul className="space-y-5 text-lg text-gray-200">
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <ShieldCheck className="w-7 h-7 text-teal-400" />
            <span>Comprehensive insurance coverage</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <Star className="w-7 h-7 text-teal-400" />
            <span>24/7 host support</span>
          </motion.li>
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <Gem className="w-7 h-7 text-teal-400" />
            <span>Smart pricing tools</span>
          </motion.li>
        </ul>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <a
            href="/signup"
            className="inline-block px-6 py-3 text-lg font-semibold bg-teal-500 hover:bg-teal-600 rounded-xl transition"
          >
            Start Hosting Today
          </a>
        </motion.div>
      </div>
    </motion.div>
  </div>
</section>


      {/* Footer */}
      <footer className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <Image src="/spaceshere-logo.svg" alt="SpaceShere" width={150} height={50} className="mb-6 invert" />
              <p className="text-neutral-400 mb-6">
                India's premier marketplace for unique and inspiring spaces. Connect, book, and create memorable experiences.
              </p>
              <div className="flex gap-4">
                {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <a key={social} href="#" className="text-neutral-400 hover:text-white">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Contact Us", "Blog", "Press"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">Discover</h3>
              <ul className="space-y-2">
                {["Event Spaces", "Meeting Rooms", "Studios", "Unique Venues", "Host Resources"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-neutral-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-4">
              <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                />
                <Button
                  type="submit"
                  variant="outline"
                  className="rounded-none border-white text-white hover:bg-white hover:text-black"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}