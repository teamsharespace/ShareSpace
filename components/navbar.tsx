"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useSession } from "next-auth/react"
import { LogoutButton } from "./authUi"

export default function Navbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50) // Turns black after scrolling 50px
        }

        if (pathname === "/") {
            window.addEventListener("scroll", handleScroll)
            return () => window.removeEventListener("scroll", handleScroll)
        }
    }, [pathname])

    return (
        <nav
            className={`w-full z-50 transition-all duration-300 ${pathname === "/"
                ? isScrolled
                    ? "fixed top-0 bg-black/90"
                    : "fixed top-0 bg-transparent"
                : "fixed bg-black"
                }`}
        >
            <div className="flex items-center justify-between px-6 py-4 mx-auto">
                {/* Left: Logo + Search (on non-homepage) */}
                <div className="flex flex-row items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
                    </Link>
                    {pathname !== "/" && (
                        <div className="flex bg-gray-800 rounded-lg px-4 py-2 space-x-2 w-80">
                            <Search className="text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search for spaces..."
                                className="w-full outline-none text-white bg-gray-800"
                            />
                        </div>
                    )}
                </div>

                {/* Right: Nav Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/spaces" className="text-sm text-white font-medium">
                        Find Spaces
                    </Link>
                    <Link href="/become-host" className="text-sm text-white font-medium">
                        Become a Host
                    </Link>
                    {!session ? (
                        <div className="hidden md:flex items-center space-x-6 ">
                        <Link href="/login" className="text-sm text-white font-medium">
                        <Button variant="outline" className="flex items-center text-black">
                            Login
                        </Button>
                        </Link>
                    <Link href="/signup" className="text-sm font-medium">
                        <Button variant="outline" className="flex items-center">
                            Signup
                        </Button>
                    </Link>
                        </div>
                    ) : <LogoutButton />
                    }
                </div>
            </div>
        </nav>
    )
}
