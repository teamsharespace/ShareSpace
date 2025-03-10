'use server'
import prisma from "@/lib/prisma";

export async function fetchSpaces(listingId: string) {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
        })
        return listing;
    }
    catch (error) {
        return error;
    }
}
