"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, Menu, X } from "lucide-react"
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <div className="flex items-center justify-between px-4 md:px-6 py-4 mx-auto">
                
            <div className="flex items-center">
    <Link href="/" className="flex items-center space-x-2">
        <span className="text-2xl md:text-4xl font-bold text-white p-2">SpaceShare</span>
    </Link>

    {pathname !== "/" && (
        <div className="hidden md:flex bg-gray-800 rounded-lg px-3 py-1 ml-4 w-60">
            <Search className="text-gray-500 mr-2" size={18} />
            <input
                type="text"
                placeholder="Search for spaces..."
                className="w-full outline-none text-white bg-gray-800"
            />
        </div>
    )}
</div>


                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} className="text-white"/> : <Menu size={28} className="text-white"/>}
                    </button>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/spaces" className="text-sm text-white font-medium">
                        Find Spaces
                    </Link>
                    <div className="text-sm text-white font-medium cursor-pointer" onClick={handleBecomeHost}>
                        Become a Host
                    </div>
                    {!session ? (
                        <div className="md:flex items-center space-x-6">
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

                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-black/90 flex flex-col items-center space-y-4 py-4 md:hidden">
                        <Link href="/spaces" className="text-sm text-white font-medium" onClick={() => setIsMenuOpen(false)}>
                            Find Spaces
                        </Link>
                        <div className="text-sm text-white font-medium cursor-pointer" onClick={() => { handleBecomeHost(); setIsMenuOpen(false); }}>
                            Become a Host
                        </div>
                        {!session ? (
                            <Button
                                onClick={() => { showLoginPopup(true); setIsMenuOpen(false); }}
                                variant="outline"
                                className="flex items-center text-black border-white"
                            >
                                Signup
                            </Button>
                        ) : (
                            <LogoutButton />
                        )}
                    </div>
                )}
            </div>



            {loginPopup && (
                <Signup onClose={() => showLoginPopup(false)}/>
            )}
        </nav>
    )
}
