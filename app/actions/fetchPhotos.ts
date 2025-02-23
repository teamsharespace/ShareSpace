'use server'
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import prisma from "@/lib/prisma";
import { UserSession } from "./fetchUser";

export async function fetchPhotos(listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session?.user?.id) {
        return null;
    }
    try {
        const photos = await prisma.photo.findMany({
            where: {
                listingId: listingId,
                listing:{
                    userId: session?.user?.id,
                }
            },
        })
        return photos;
    }
    catch (error) {
        return error;
    }
}
