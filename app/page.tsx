"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

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
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxurious living room"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

        {/* Circular Navigation */}
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
            Find a space.
            Fulfill your vision.<span className="text-neutral-300">.</span>
            </h1>
            <p className="text-lg text-white mb-8 max-w-xl">
              Creating spaces of extraordinary sophistication through our curated collection of contemporary furniture
              and design pieces.
            </p>
            <Button variant="outline" className="rounded-none border-white text-white hover:bg-white hover:text-black">
              View More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <Image src="/poliform-logo.svg" alt="SpaceShere" width={150} height={50} className="mb-6 invert" />
              <p className="text-neutral-400 mb-6">
                Creating spaces of extraordinary sophistication through our curated collection of contemporary furniture
                and design pieces.
              </p>
              <div className="flex gap-4">
                {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <a key={social} href="#" className="text-neutral-400 hover:text-white">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            {footerLinks.map((column, index) => (
              <div key={index} className="col-span-2">
                <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-neutral-400 hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
]

