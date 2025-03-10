import React from 'react';
import ShowListing from '@/components/showListing';
import { Metadata } from 'next';
import { Listing, OperatingHours } from '@prisma/client';
import { fetchListingForSpaces } from '@/app/actions/fetchListingForSpaces';

//here i actually once the call is made to getListingData, and that sends to both Page and generateMetadata functions using the same data since caching is done in the server side 
async function getListingData(listingId: string): Promise<[Listing | null, OperatingHours[]]> {
    try {
        const result = await fetchListingForSpaces(listingId) as [Listing, OperatingHours[]];
        const listing = result[0] || null;
        const operatingHours = result[1] || [];
        return [listing, operatingHours];
    } catch (error) {
        console.error("Error fetching listing data:", error);
        return [null, []];
    }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const [listing] = await getListingData(params.id);

    return {
        title: listing ? `${listing.name} | SpaceShare` : 'Space Details | SpaceShare',
        description: listing?.description || 'View details about this space on SpaceShare',
        openGraph: {
            title: listing ? `${listing.name} | SpaceShare` : 'Space Details | SpaceShare',
            description: listing?.description?.slice(0, 160) || 'View details about this space on SpaceShare',
            images: listing?.photos?.length 
                ? [{ url: listing.photos[0], width: 1200, height: 630 }]
                : [],
        },
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const [listing, operatingHours] = await getListingData(params.id);

    if (!listing) return <div>Listing not found</div>;

    return (
        <div>
            <ShowListing params={{ id: params.id }} listing={listing} operatingHours={operatingHours} />
        </div>
    );
}
