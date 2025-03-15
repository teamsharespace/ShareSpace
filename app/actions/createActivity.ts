"use server"
import { getServerSession } from "next-auth";
import { ActivitiesSchema } from "../hooks/useActivitiesForm";
import { UserSession } from "./fetchUser";
import prisma from "@/lib/prisma";
import { NEXT_AUTH } from "../lib/auth";
import { CleaningRate } from "@prisma/client";

export default async function createActivity(data: ActivitiesSchema, listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };

    const { meeting, events, media } = data;

    const listing = await prisma.listing.findUnique({
        where: {
            id: listingId,
        }
    });

    if (!listing || listing.userId !== session?.user?.id)
        return { error: "Unauthorized" };

    const cleanData = (data: any) => {
        return {
            enabled: Boolean(data.enabled),
            hourlyRate: Number(data.hourlyRate) || 0,
            minimumHours: Number(data.minimumHours) || 0,
            discount: Number(data.discount) || 0,
            cleaningRate: data.cleaningRate as CleaningRate,
            additionalFee: Number(data.additionalFee) || 0,
            instantBooking: data.instantBooking || 'NONE',
            amenities: Array.isArray(data.amenities) ? data.amenities : [],
            capacity: Number(data.capacity) || 0,
            customAmenities: Array.isArray(data.customAmenities) ? data.customAmenities : []
        };
    };

    try {
        if (meeting?.enabled) {
            await prisma.meeting.upsert({
                where: { listingId: listingId },
                update: cleanData(meeting),
                create: { listingId, ...cleanData(meeting) },
            });
        }

        if (events?.enabled) {
            await prisma.event.upsert({
                where: { listingId: listingId },
                update: cleanData(events),
                create: { listingId, ...cleanData(events) },
            });
        }

        if (media?.enabled) {
            await prisma.mediaProduction.upsert({
                where: { listingId: listingId },
                update: cleanData(media),
                create: { listingId, ...cleanData(media) },
            });
        }

        await prisma.listing.update({
            where: {
                id: listingId,
            },
            data: {
                progress: {
                    upsert: {
                        where: {
                            listingId: listingId
                        },
                        create: {
                            activityCompleted: true,
                        },
                        update: {
                            activityCompleted: true,
                        }
                    }
                }
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Activity creation error:", error);
        return {
            error: "Failed to create activity",
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
