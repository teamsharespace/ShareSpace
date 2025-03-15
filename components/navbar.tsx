"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Search, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { LogoutButton } from "./authUi"
import { fetchUser } from "@/app/actions/fetchUser"
import Signup from "@/components/spacecomp/signup"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const router = useRouter();
    const [loginPopup, showLoginPopup] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        fetchUser()
            .then(userData => {
                setUser(userData);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        if (pathname === "/") {
            window.addEventListener("scroll", handleScroll)
            return () => window.removeEventListener("scroll", handleScroll)
        }
    }, [pathname])

    const handleBecomeHost = () => {
        if (!isLoading) {
            if (user) {
                router.push('/becomeHost');
            } else {
                showLoginPopup(true);
            }
        }
    };

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <nav
            className={`w-full z-50 transition-all duration-300 ${
                pathname === "/"
                    ? isScrolled
                        ? "fixed top-0 bg-black/90"
                        : "fixed top-0 bg-transparent"
                    : "fixed bg-black"
            }`}
        >

            <div className="flex items-center justify-between px-4 sm:px-6 py-4 mx-auto">
                <div className="flex flex-row items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl sm:text-4xl font-bold text-white p-1 sm:p-3">SpaceShare</span>
                    </Link>
                    {pathname !== "/" && !mobileMenuOpen && (
                        <div className="hidden md:flex bg-gray-800 rounded-lg px-4 py-2 space-x-2 w-80">
                            <Search className="text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search for spaces..."
                                className="w-full outline-none text-white bg-gray-800"
                            />
                        </div>
                    )}
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/spaces" className="text-sm text-white font-medium">
                        Find Spaces
                    </Link>
                    <div className="text-sm text-white font-medium cursor-pointer" onClick={handleBecomeHost}>
                        Become a Host
                    </div>
                    {!session ? (
                        <div className="flex items-center space-x-6">
                            <Button
                                onClick={() => showLoginPopup(true)}
                                variant="outline"
                                className="flex items-center text-black"
                            >
                                Signup
                            </Button>
                        </div>
                    ) : <LogoutButton />}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 top-16 bg-black/95 z-40 flex flex-col md:hidden">
                        <div className="flex flex-col items-center pt-8 space-y-6">
                            {pathname !== "/" && (
                                <div className="flex bg-gray-800 rounded-lg px-4 py-2 space-x-2 w-4/5">
                                    <Search className="text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search for spaces..."
                                        className="w-full outline-none text-white bg-gray-800"
                                    />
                                </div>
                            )}
                            
                            <Link href="/spaces" className="text-xl text-white font-medium py-2">
                                Find Spaces
                            </Link>
                            <div
                                className="text-xl text-white font-medium py-2 cursor-pointer"
                                onClick={handleBecomeHost}
                            >
                                Become a Host
                            </div>
                            {!session ? (
                                <Button
                                    onClick={() => {
                                        showLoginPopup(true);
                                        setMobileMenuOpen(false);
                                    }}
                                    variant="outline"
                                    className="flex items-center mt-4 w-4/5"
                                >
                                    Signup
                                </Button>
                            ) : (
                                <div className="py-2">
                                    <LogoutButton />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {loginPopup && (
                    <Signup onClose={() => showLoginPopup(false)}/>
                )}
            </div>



            {loginPopup && (
                <Signup onClose={() => showLoginPopup(false)}/>
            )}
        </nav>
    )
}