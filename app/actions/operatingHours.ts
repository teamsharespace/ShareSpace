"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import { UserSession } from "./fetchUser";
import prisma from "@/lib/prisma";
import { OperatingHoursValues } from "../becomeHost/operatingHours/[id]/page";
import { DayOfWeek } from "@prisma/client";


export async function createOperatingHours(data: OperatingHoursValues, listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };
    const listing = await prisma?.listing?.findUnique({
        where: {
            id: listingId,
        }
    });
    if (!listing || listing.userId != session?.user?.id) {
        return null;
    }
    try {
        const operatingHoursData = Object.entries(data.schedule).map(([day, schedule]) => ({
            dayOfWeek: day.toUpperCase() as DayOfWeek,
            isOpen: schedule.isOpen,
            openTime: schedule.openTime,
            closeTime: schedule.closeTime
        }));

        await prisma?.listing?.update({
            where: {
                id: listingId,
            },
            data: {
                operatingHours: {
                    create: operatingHoursData
                },
                progress: {
                    upsert: {
                        create: {
                            operatingHoursCompleted: true,
                        },
                        update: {
                            operatingHoursCompleted: true,
                        }

                    }
                }
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Error creating operating hours:", error);
        return {
            error: error || "Unknown error",
        }
    }
}
