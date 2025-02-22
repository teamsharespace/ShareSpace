"use client";
import { fetchListingDetails } from "@/app/actions/fetchListingDetails";
import { Listing } from "@prisma/client";
import { useEffect, useState } from "react";

export default function({ params }: { params: { id: string } }) {
    const listingId = params.id;
    const [listing, setListing] = useState<Listing | null>(null);
    const [photos, setPhotos] = useState<any[]>([]);
    const [operatingHours, setOperatingHours] = useState<any[]>([]);
    useEffect(() => {
        async function getListing() {
            try {
                const result = await fetchListingDetails(listingId) as [Listing, any, any];
                setListing(result[0]);
                setPhotos(result[1]);
                setOperatingHours(result[2]);
            } catch (error) {
                console.error("Error fetching listing details", error);
            }
        }
        getListing();
    })
    return (
        <div className="flex flex-col">
            <pre>
                {JSON.stringify(listing)}
            </pre>
            <pre>
                {JSON.stringify(photos)}
            </pre>
            <pre>
                {JSON.stringify(operatingHours)}
            </pre>
        </div>
    )
}
