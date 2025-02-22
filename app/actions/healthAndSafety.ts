"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import { UserSession } from "./fetchUser";

export async function createHealthAndSafety(data: any, listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };
    console.log(data);
    const { cleaningMeasures, protectiveGear, distanceMeasures, covidSignage } = data;

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
                cleaningMeasures: cleaningMeasures,
                protectiveGear: protectiveGear,
                distanceMeasures: distanceMeasures,
                covidSignage: covidSignage,
                progress: {
                    upsert: {
                        create: {
                            healthSafetyCompleted: true,
                        },
                        update: {
                            healthSafetyCompleted: true,
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

