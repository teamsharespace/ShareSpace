'use server'
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import prisma from "@/lib/prisma";
import { UserSession } from "./fetchUser";

export async function fetchListings() {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session?.user?.id) {
        return null;
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
            select: {
                listings: true,
            },
        })
        return user?.listings;
    }
    catch (error) {
        return error;
    }
}
