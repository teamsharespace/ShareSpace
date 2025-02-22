"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import { UserSession } from "./fetchUser";
import prisma from "@/lib/prisma";

export async function createSpace() {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };
    try {
        const listing = await prisma?.listing?.create({
            data: {
                userId: session?.user?.id || " ",
                name: "Untitled",
            }
        })
        return listing;
    } catch (error) {
        return error;
    }
}
