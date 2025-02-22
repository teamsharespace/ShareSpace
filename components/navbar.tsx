"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
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
        if (!isLoading) {  // Only handle click if loading is complete
            if (user) {
                router.push('/becomeHost');
            } else {
                showLoginPopup(true);
            }
        }
    };

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
            <div className="flex items-center justify-between px-6 py-4 mx-auto">
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

                <div className="md:flex items-center space-x-6">
                    <Link href="/spaces" className="text-sm text-white font-medium">
                        Find Spaces
                    </Link>
                    <div
                        className="text-sm text-white font-medium cursor-pointer"
                        onClick={handleBecomeHost}
                    >
                        Become a Host
                    </div>
                    {!session ? (
                        <div className="md:flex items-center space-x-6">
                            <Button
                                onClick={() => showLoginPopup(true)}
                                variant="outline"
                                className="flex items-center"
                            >
                                Signup
                            </Button>
                        </div>
                    ) : <LogoutButton />}
                </div>
                {loginPopup && (
                    <Signup onClose={() => showLoginPopup(false)}/>
                )}
            </div>
        </nav>
    )
}
