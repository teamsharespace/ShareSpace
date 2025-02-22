"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import { UserSession } from "./fetchUser";
import { SpaceFormValues } from "../becomeHost/spaceDetails/[id]/page";


export async function createSpaceDetails(data: SpaceFormValues, listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };
    const { spaceType, overnightStays, hasParking, parkingOptions, parkingDescription, hasSecurityCameras } = data
    console.log(data);
    const listing = await prisma?.listing?.findUnique({
        where: {
            id: listingId,
        }
    });
    if (!listing || listing.userId != session?.user?.id) {
        return null;
    }
    try {
        await prisma?.listing?.update({
            where: {
                id: listingId,
            },
            data: {
                typeOfSpace: spaceType,
                overNightStays: overnightStays,
                hasParking: hasParking,
                parkingDescription: parkingDescription,
                securityCameras: hasSecurityCameras,
                progress: {
                    upsert: {
                        create: {
                            spaceDetailsCompleted: true,
                        },
                        update: {
                            spaceDetailsCompleted: true,
                        }
                    }
                }
            }
        })
    } catch (error) {
        return {
            error: error || "Unknwon error",
        }
    }
}

