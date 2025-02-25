"use client";
import { fetchListingDetails } from "@/app/actions/fetchListingDetails";
import { Listing, Photo } from "@prisma/client";
import { LandPlot, LayoutGrid } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShowListing({ params }: { params: { id: string } }) {
    const listingId = params.id;
    const { data: session } = useSession();
    const [listing, setListing] = useState<Listing | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [operatingHours, setOperatingHours] = useState<any[]>([]);
    useEffect(() => {
        async function getListing() {
            try {
                const result = await fetchListingDetails(listingId) as [Listing, Photo[], any];
                setListing(result[0]);
                setPhotos(result[1]);
                setOperatingHours(result[2]);
                console.log(result[1]);
            } catch (error) {
                console.error("Error fetching listing details", error);
            }
        }
        getListing();
    }, [listingId])
    console.log(photos);
    return (
        <div>
            <nav className={"w-full z-50 transition-all duration-300 fixed top-0 bg-black/90"}>
                <div className="flex items-center justify-between px-6 py-2 mx-auto">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
                    </Link>
                    <span className="text-white text-lg mr-10  font-medium">My Listings</span>
                </div>
            </nav>
            <main>
                <div className="w-[58%] pt-28 flex-col flex mx-auto ">
                    <div className="font-semibold text-2xl pb-2">{listing?.name}</div>
                    <div className="text-gray-600  text-sm pb-6">{listing?.address}, {listing?.city}, {listing?.state}</div>
                    <div className="flex flex-row gap-2 pb-8">
                        <img src={photos[0]?.url} alt={"image"} className="w-1/2 h-[500px] rounded-sm object-cover" />
                        <div className="grid grid-cols-2 gap-2 w-1/2 h-[500px]  ">
                            <img src={photos[1]?.url} alt={"image"} className="h-full w-full  rounded-sm object-cover" />
                            <img src={photos[2]?.url} alt={"image"} className="h-full w-full  rounded-sm object-cover" />
                            <img src={photos[3]?.url} alt={"image"} className="h-full w-full  rounded-sm object-cover" />
                            <div className="relative h-full w-full flex items-center justify-center ">
                                <img src={photos[1]?.url} alt={"image"} className="absolute h-full w-full  rounded-sm object-cover bg-black " />
                                <div className="absolute inset-0 bg-black opacity-50 rounded-sm"></div>
                                <span className="absolute text-white text-sm flex flex-col items-center justify-center cursor-pointer gap-1"><LayoutGrid size={16} />View all</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <LandPlot size={20} />
                        <span className="text-sm">{listing?.size} sqft</span>
                    </div>
                    <hr className="border-t border-gray-200 mt-6 mb-6" />
                    <div className="flex flex-row gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-300 "></div>
                        <span className="text-sm text-gray-600 font-light">Hosted by {session?.user?.name}</span>
                    </div>
                    <hr className="border-t border-gray-200 mt-6 mb-6" />
                    <article className="flex flex-col gap-2 text-wrap w-1/2">
                        <span className="font-medium text-lg pb-2 text-pretty">About the Space</span>
                        <span className="text-gray-600 text-sm break-words">{listing?.description}</span>
                    </article>
                </div>
            </main>
        </div>
    )
}
