"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import { UserSession } from "./fetchUser";
import prisma from "@/lib/prisma";
import { ListingFormData } from "../becomeHost/typeOfSpace/[id]/page";


export async function createTypeOfSpace(data: ListingFormData, listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };
    console.log(data);
    const {
        spaceTitle,
        spaceDescription,
        bookingSize,
        houseRules,
        allowedGuests,
        wifiName,
        wifiPassword,
        arrivalInstructions,
    } = data
    const listing = await prisma?.listing?.findUnique({
        where: {
            id: listingId,
        }
    });
    if (!listing || listing.userId !== session?.user?.id) {
        return null;
    }
    try {
        await prisma?.listing?.update({
            where: {
                id: listingId,
            },
            data: {
                name: spaceTitle,
                description: spaceDescription,
                size: bookingSize,
                rules: houseRules,
                age: allowedGuests,
                wifiName: wifiName,
                wifiPassword: wifiPassword,
                arrivalInstructions: arrivalInstructions,
                progress: {
                    upsert: {
                        create: {
                            typeOfSpaceCompleted: true,
                        },
                        update: {
                            typeOfSpaceCompleted: true,
                        }
                    }
                }
            }
        })
    } catch (error) {
        return {
            error: error || "Unknown error",
        }
    }
}
