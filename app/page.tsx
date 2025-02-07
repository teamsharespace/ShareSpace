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

      {/* Modern Minimalist Section */}
      <section className="py-24 px-4 bg-neutral-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-8 relative group overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
              alt="Modern minimalist living room"
              width={800}
              height={500}
              className="w-full h-[600px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-8 left-8 z-10">
              <h2 className="text-4xl font-light mb-4 text-white">
                Modern
                <br />
                Minimalist
              </h2>
              <Button
                variant="outline"
                className="rounded-none border-white text-white hover:bg-white hover:text-black"
              >
                View More
              </Button>
            </div>
          </div>
          <div className="col-span-4">
            <div className="h-[400px] mb-8 relative group overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
                alt="Minimalist furniture detail"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            </div>
            <div className="bg-white dark:bg-gray-700 p-8">
              <h3 className="text-2xl font-light mb-4">Into a gallery of elegance</h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                Discover our curated collection of minimalist designs that blend form and function seamlessly.
              </p>
              <Button
                variant="link"
                className="text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 p-0"
              >
                Explore More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-5xl font-light mb-2">{stat.value}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Style Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
  <div className="max-w-[1400px] mx-auto px-4">
    <div className="flex justify-between items-end mb-8">
      <h2 className="text-3xl sm:text-4xl font-light">
        Explore Our
        <br />
        Collection
      </h2>
      <Button
        variant="link"
        className="text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300"
      >
        View More
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
    <div className="grid grid-cols-12 gap-3 sm:gap-4">
      {/* First Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group overflow-hidden rounded-2xl col-span-12 sm:col-span-4 h-[300px] sm:h-[400px]"
      >
        <Link href="/collection/mondrian">
          <div className="relative w-full h-full">
            <Image
              src="/placeholder.svg"
              alt="Mondrian"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-light text-white">Mondrian</h3>
            </div>
          </div>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative group overflow-hidden rounded-2xl col-span-12 sm:col-span-8 h-[300px] sm:h-[400px]"
      >
        <Link href="/collection/nirnia">
          <div className="relative w-full h-full">
            <Image
              src="/placeholder.svg"
              alt="Nirnia"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-light text-white">Nirnia</h3>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Second Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative group overflow-hidden rounded-2xl col-span-12 sm:col-span-8 h-[300px] sm:h-[350px]"
      >
        <Link href="/collection/brera">
          <div className="relative w-full h-full">
            <Image
              src="/placeholder.svg"
              alt="Brera"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-light text-white">Brera</h3>
            </div>
          </div>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative group overflow-hidden rounded-2xl col-span-12 sm:col-span-4 h-[300px] sm:h-[350px]"
      >
        <Link href="/collection/artex">
          <div className="relative w-full h-full">
            <Image
              src="/placeholder.svg"
              alt="Artex"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-light text-white">Artex</h3>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Third Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative group overflow-hidden rounded-2xl col-span-12 sm:col-span-6 h-[300px] sm:h-[300px]"
      >
        <Link href="/collection/alea-pro">
          <div className="relative w-full h-full">
            <Image
              src="/placeholder.svg"
              alt="Alea Pro"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-light text-white">Alea Pro</h3>
            </div>
          </div>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative group overflow-hidden rounded-2xl col-span-12 sm:col-span-6 h-[300px] sm:h-[300px]"
      >
        <Link href="/collection/nirnia-living">
          <div className="relative w-full h-full">
            <Image
              src="/placeholder.svg"
              alt="Nirnia"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-light text-white">Nirnia</h3>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  </div>
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

const stats = [
  { value: "500+", label: "Products" },
  { value: "20+", label: "Projects" },
  { value: "50+", label: "Design Collections" },
  { value: "1st", label: "Top Choice" },
]

const collections = [
  {
    name: "Mondrian",
    slug: "mondrian",
    image:
      "https://images.unsplash.com/photo-1554295405-abb8fd54f153?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Nimia",
    slug: "nimia",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Artex",
    slug: "artex",
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
  },
  {
    name: "Brera",
    slug: "brera",
    image:
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Alea Pro",
    slug: "alea-pro",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
  },
  {
    name: "Nimia",
    slug: "nimia-2",
    image:
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
]

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

