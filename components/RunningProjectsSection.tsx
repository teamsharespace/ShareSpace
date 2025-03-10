import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"

export default function RunningProjectsSection() {
  return (
    <section id="running-project" className="py-16 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8 lg:gap-16">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-none">
          Where
            <br />
            extraordinary
begins
          </h2>
          <div className="max-w-md lg:text-right">
            <p className="text-gray-400 mb-8 text-lg lg:text-xl">
              As a front end developer using modern ideas, simplicity in design, and universal visual identification tailored to a dedicated and current market.
            </p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 border border-white px-4 sm:px-6 py-2 sm:py-3 hover:bg-white hover:text-black transition-colors"
            >
              Let's discuss <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Project Showcase */}
        <div className="relative group">
          <div className="aspect-[16/9] relative overflow-hidden rounded-2xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/muebles-A5xVCsLbOEVKVWpNLV9ZmUSDfCVfuz.jpeg"
              alt="Luxury bathroom interior with marble finishes"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
