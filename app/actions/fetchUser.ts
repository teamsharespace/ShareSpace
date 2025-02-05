"use server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { NEXT_AUTH } from "../lib/auth";

export interface UserSession {
    user: {
        name: string | null,
        email: string,
        image: string | null,
        id: string,
    } | null,
}
export const fetchUser = async () => {
    const session = await getServerSession(NEXT_AUTH) as UserSession;

    if (!session?.user?.id) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            name: true,
            email: true,
            password: false,
            emailVerified: false,
            image: true,
            role: true,
            accounts: false,
            sessions: true,
            hostProfile: true,
            bookings: true,
            reviews: true,
            messages: true,
        }
    });

    return user;
}
