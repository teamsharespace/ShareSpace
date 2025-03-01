"use client";
import { fetchListingDetails } from "@/app/actions/fetchListingDetails";
import { CancellationPolicy, CleaningMeasure, CovidSignage, DistanceMeasure, Listing, OperatingHours, ParkingOptions, ProtectiveGear } from "@prisma/client";
import { ChevronDown, ChevronUp, LandPlot, LayoutGrid, NotepadText, ShieldCheck, SquareParking } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ShowListing({ params }: { params: { id: string } }) {
    const listingId = params.id;
    const router = useRouter();
    const { data: session } = useSession(); const [listing, setListing] = useState<Listing | null>(null); const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([]);
    const [readMore, setReadMore] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showCleaningProtocol, setShowCleaningProtocol] = useState(false);
    const [showHostRules, setShowHostRules] = useState(false);
    const [readMorePolicy, setReadMorePolicy] = useState(false);
    const POLICIES = {
        VERY_FLEXIBLE: {
            name: "Very Flexible",
            rules: [
                "You can cancel your Booking until 24 hours before the event start time and will receive a full refund (including all Fees) of your Booking Price.",
                "Bookings cancellations submitted less than 24 hours before the Event start time are not refundable."
            ]
        },
        FLEXIBLE: {
            name: "Flexible",
            rules: [
                "You can cancel your Booking until 7 days before the event start time and will receive a full refund (including all Fees) of your Booking Price.",
                "You can cancel your Booking between 7 days and 24 hours before the event start time and receive a 50% refund (excluding Fees) of your Booking Price.",
                "Booking cancellations submitted less than 24 hours before the Event start time are not refundable."
            ]
        },
        THIRTY_DAY: {
            name: "Standard 30 day",
            rules: [
                "You can cancel your Booking until 30 days before the event start time and will receive a full refund (including all Fees) of your Booking Price.",
                "You can cancel your Booking between 30 days and 7 days before the event start time and receive a 50% refund (excluding Fees) of your Booking Price.",
                "Cancellations submitted less than 7 days before the Event start time are not refundable."
            ]
        },
        NINETY_DAY: {
            name: "Standard 90 day",
            rules: [
                "You can cancel your Booking until 90 days before the event start time and will receive a full refund (including all Fees) of your Booking Price.",
                "You can cancel your Booking between 90 days and 14 days before the event start time and receive a 50% refund (excluding Fees) of your Booking Price.",
                "Cancellations submitted less than 14 days before the Event start time are not refundable."
            ]
        }
    };

    const PARKING_OPTIONS = {
        ONSITE: "Free onsite parking",
        STREET: "Free street parking",
        VALET: "Valet",
        METERED_STREET: "Metered street parking",
        LOT: "Nearby parking lot",
        PAID_ONSITE: "Paid onsite parking",
    };
    const CLEANING_MEASURES = {
        GUIDELINES_COMPLIANCE: "The space is cleaned and disinfected in accordance with guidelines from local health authorities",
        HIGH_TOUCH_DISINFECTION: "High touch surfaces and shared amenities have been disinfected",
        POROUS_MATERIALS_CLEANED: "Soft, porous materials have been properly cleaned or removed",
        PROFESSIONAL_CLEANER: "A licensed professional cleaner is hired between bookings",
        SPACED_BOOKINGS: "Bookings are spaced apart to allow for enhanced cleaning"
    };

    const PROTECTIVE_GEAR = {
        DISINFECTING_WIPES: "Disinfecting wipes or spray and paper towels",
        DISPOSABLE_GLOVES: "Disposable gloves",
        DISPOSABLE_MASKS: "Disposable masks / face coverings",
        HAND_SANITIZER: "Hand Sanitizer"
    };

    const DISTANCE_MEASURES = {
        LIMITED_CAPACITY: "Capacity is limited based on governmental guidelines",
        OUTDOOR_VENTILATION: "Space has access to outdoor air ventilation",
        HEPA_AIR_FILTERS: "Space has HEPA-certified air filters",
        OUTDOOR_SPACE: "Space has additional space outdoors",
        RECONFIGURED_SPACE: "Space has been reconfigured to allow for physical distance"
    };

    const COVID_SIGNAGE = {
        CLEANING_CHECKLIST: "Detailed checklist of updated cleaning procedure",
        COVID_GUIDELINES: "COVID-19 guest guidelines print outs",
        DISTANCE_MARKERS: "Common areas have 6-foot (2-metre) markers on floors",
        DIRECTIONAL_ARROWS: "Narrow passages have arrows for bi-directional traffic"
    };


    useEffect(() => {
        async function getListing() {
            try {
                const result = await fetchListingDetails(listingId) as [Listing, OperatingHours[]];
                setListing(result[0]);
                setOperatingHours(result[1]);
                console.log(result[1]);
            } catch (error) {
                console.error("Error fetching listing details", error);
            }
        }
        getListing();
    }, [listingId])
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
                        <img src={listing?.photos[0]} alt={"image"} className="w-1/2 h-[550px] rounded-sm object-cover" />
                        <div className="grid grid-cols-2 gap-2 w-1/2 h-[550px]  ">
                            <img src={listing?.photos[1]} alt={"image"} className="h-full w-full  rounded-sm object-cover" />
                            <img src={listing?.photos[2]} alt={"image"} className="h-full w-full  rounded-sm object-cover" />
                            <img src={listing?.photos[3]} alt={"image"} className="h-full w-full  rounded-sm object-cover" />
                            <div className="relative h-full w-full flex items-center justify-center ">
                                <img src={listing?.photos[1]} alt={"image"} className="absolute h-full w-full  rounded-sm object-cover bg-black " />
                                <div className="absolute inset-0 bg-black opacity-50 rounded-sm"></div>
                                <span className="absolute text-white text-sm flex flex-col items-center justify-center cursor-pointer gap-1" onClick={() => router.push(`/spaces/showPhotos/${listingId}`)}><LayoutGrid size={16} />View all</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <LandPlot size={20} />
                        <span className="text-sm">{listing?.size} sqft</span>
                    </div>
                    <hr className="border-t border-gray-200 mt-8 mb-8 w-2/3" />
                    <div className="flex flex-row gap-2 items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-300 "></div>
                        <span className="text-sm text-gray-600 font-light">Hosted by {session?.user?.name}</span>
                    </div>
                    <hr className="border-t border-gray-200 mt-8 mb-8 w-2/3" />
                    <article className="flex flex-col text-wrap w-2/3">
                        <span className="font-medium text-xl pb-4 text-pretty">About the Space</span>
                        {readMore ? (
                            <span className="text-gray-600 text-sm break-words">{listing?.description}</span>
                        ) : (
                            <span className="text-gray-600 text-sm break-words">{listing?.description?.slice(0, 250)}...</span>
                        )}
                        <span onClick={() => setReadMore(!readMore)} className="text-gray-500 text-sm underline  cursor-pointer">Read {readMore ? "less" : "more"}</span>
                    </article>
                    <div className="flex flex-row justify-between gap-2 mt-12 hover:text-gray-400 w-2/3" onClick={() => setShowMore(!showMore)}>
                        <div className="flex flex-row gap-4 items-center ">
                            <SquareParking strokeWidth={1.5} />
                            <h1 className="font-medium text-lg cursor-pointer">Parking</h1>
                        </div>
                            <ChevronDown className={`text - gray - 500 transition-transform duration-300 ${showMore ? "transform rotate-180" : ""}`} />
                    </div>
                    {showMore && (
                        <>
                            <h1 className="px-10 pt-10 pb-1 text-sm font-medium">Parking Options</h1>
                            {listing?.parkingOptions.map((value, index) => (
                                <span key={index} className="text-xs px-10  pb-1 text-gray-500 font-medium">{PARKING_OPTIONS[value as ParkingOptions]}</span>
                            ))}
                            <h1 className="px-10 pt-10 pb-1 text-sm  font-medium">Parking Options</h1>
                            {listing?.parkingDescription?.length as number > 0 ? (
                                <span className="text-xs px-10  pb-1 text-gray-500 font-medium w-2/3">{listing?.parkingDescription}</span>
                            ) : (
                                <span className="text-xs px-10  pb-1 text-gray-500 font-medium">No Parking Description</span>
                            )}
                        </>
                    )}
                    <hr className="border-t border-gray-200 mt-6 mb-6 w-2/3" />
                    <div className="flex flex-row justify-between gap-2 mt-2 hover:text-gray-400 w-2/3" onClick={() => setShowHostRules(!showHostRules)}>
                        <div className="flex flex-row gap-4 items-center ">
                            <NotepadText strokeWidth={1.5} />
                            <h1 className="font-medium text-lg cursor-pointer">Host rules</h1>
                        </div>
                            <ChevronDown className={`text - gray - 500 transition-transform duration-300 ${showHostRules ? "transform rotate-180" : ""}`} />
                    </div>
                    {showHostRules && (
                        <>
                            <h1 className="px-10 pt-10 pb-1 text-sm font-medium">General Rules</h1>
                            {listing?.rules?.length as number > 0 ? (
                                <span className="text-xs px-10  pb-1 text-gray-500 font-medium w-1/2">{listing?.rules}</span>
                            ) : (<span className="text-xs px-10  pb-1 text-gray-500 font-medium">No Rules</span>)}
                            <h1 className="px-10 pt-10 pb-1 text-sm font-medium">{listing?.age} are allowed in the space</h1>
                            {listing?.securityCameras ? (
                                <h1 className="px-10 pt-10 text-sm font-medium">Security cameras and recording devices</h1>
                            ) : (
                                <h1 className="px-10 pt-10 pb-1 text-sm font-medium">No security cameras and recording devices</h1>
                            )}
                            <span className="text-xs px-10  pb-1 text-gray-500 font-medium w-1/2">Recording devices in bathrooms or dressing rooms are prohibited by the Sharespace. </span>
                        </>
                    )}
                    <hr className="border-t border-gray-200 mt-8 mb-8 w-2/3" />
                    <h1 className="font-medium text-lg pb-4">Operating Hours</h1>
                    {operatingHours.map((value, index) => (
                        <div key={index} className="flex flex-row justify-between w-2/3">
                            <span className="text-sm py-0.5 text-gray-800">{value.dayOfWeek.charAt(0) + value.dayOfWeek.slice(1).toLowerCase()}</span>
                            {value.isOpen ? (
                                <span className="text-sm text-gray-800">{value.openTime} - {value.closeTime} </span>
                            ) :
                                <span className="text-sm text-gray-800">Closed</span>
                            }
                        </div>
                    ))}
                    <hr className="border-t border-gray-200 mt-6 mb-6 w-2/3" />
                    <div className="flex flex-row justify-between gap-2  hover:text-gray-400 w-2/3" onClick={() => setShowCleaningProtocol(!showCleaningProtocol)}>
                        <div className="flex flex-row gap-4 items-center ">
                            <ShieldCheck strokeWidth={1.5} />
                            <h1 className="font-medium text-lg cursor-pointer">Cleaning protocol</h1>
                        </div>
                            <ChevronDown className={`text-gray-500 transition-transform duration-300 ${showCleaningProtocol ? "transform rotate-180" : ""}`} />
                    </div>
                    {showCleaningProtocol && (
                        <>
                            <h1 className="px-10 pt-8 pb-1 text-sm font-medium">Hosts will ensure the following things</h1>
                            {listing?.cleaningMeasures.map((value, index) => (
                                <span key={index} className="text-xs px-10  pb-1 text-gray-500 font-medium">{CLEANING_MEASURES[value as CleaningMeasure]}</span>
                            ))}
                            {listing?.protectiveGear.map((value, index) => (
                                <span key={index} className="text-xs px-10  pb-1 text-gray-500 font-medium">{PROTECTIVE_GEAR[value as ProtectiveGear]}</span>
                            ))}
                            {listing?.distanceMeasures.map((value, index) => (
                                <span key={index} className="text-xs px-10  pb-1 text-gray-500 font-medium">{DISTANCE_MEASURES[value as DistanceMeasure]}</span>
                            ))}
                            {listing?.covidSignage.map((value, index) => (
                                <span key={index} className="text-xs px-10  pb-1 text-gray-500 font-medium">{COVID_SIGNAGE[value as CovidSignage]}</span>
                            ))}
                        </>
                    )}
                    <hr className="border-t border-gray-200 mt-6 mb-6 w-2/3" />
                    <h1 className="font-medium text-lg cursor-pointer">Cancellation policy</h1>
                    <h1 className="font-medium pt-4  pb-2 cursor-pointer">{POLICIES[listing?.cancellationPolicy as keyof typeof POLICIES]?.name}</h1>
                    {readMorePolicy ? (
                        <h1 className="font-normal text-sm  text-gray-600 break-words  cursor-pointer w-2/3">{POLICIES[listing?.cancellationPolicy as keyof typeof POLICIES]?.rules}</h1>
                    ) : (
                        <h1 className="font-normal text-sm  text-gray-600 break-words  cursor-pointer w-2/3">{POLICIES[listing?.cancellationPolicy as keyof typeof POLICIES]?.rules.slice(0, 250)}...</h1>
                    )}
                    <span onClick={() => setReadMorePolicy(!readMorePolicy)} className="text-gray-500 text-sm underline  cursor-pointer">Read {readMorePolicy ? "less" : "more"}</span>
                    <hr className="border-t border-gray-200 mt-6 mb-6 w-2/3" />
                </div>
            </main>
        </div>
    )
}


