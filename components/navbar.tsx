"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className=" relative z-10 max-w-full">
      <div className=" flex items-center justify-between px-6 py-4 max-w-full mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/spaces" className="text-sm text-white  font-medium ">
            Find Spaces
          </Link>
          <Link href="/become-host" className="text-sm text-white font-medium ">
            Become a Host
          </Link>
          <Link href="/login" className="text-sm text-white font-medium ">
            Login
            </Link>
          <Link href="/signup" className="text-sm  font-medium ">
          <Button variant="outline" className="flex items-center">
            Signup
          </Button>
            </Link>
        </div>
      </div>
    </nav>
  )
}
