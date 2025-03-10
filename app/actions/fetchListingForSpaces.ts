'use server'
import prisma from "@/lib/prisma";

export async function fetchListingForSpaces(listingId: string) {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
        })
        const operatingHours = await prisma.operatingHours.findMany({
            where: {
                listingId: listingId,
            },
        });
        return [listing, operatingHours];
    }
    catch (error) {
        return error;
    }
}

