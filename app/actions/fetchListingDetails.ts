'use server'
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import prisma from "@/lib/prisma";
import { UserSession } from "./fetchUser";

export async function fetchListingDetails(listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session?.user?.id) {
        return null;
    }
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
        })
        const photos = await prisma.photo.findMany({
            where: {
                listingId: listingId,
            },
        })
        const operatingHours = await prisma.operatingHours.findMany({
            where: {
                listingId: listingId,
            },
        });
        return [listing, photos, operatingHours];
    }
    catch (error) {
        return error;
    }
}
