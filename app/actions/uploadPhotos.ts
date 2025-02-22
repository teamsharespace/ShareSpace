"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import { UserSession } from "./fetchUser";
import prisma from "@/lib/prisma";
import { UploadPhotosValues } from "../becomeHost/uploadPhotos/[id]/page";


export async function uploadPhotos(data: UploadPhotosValues, listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };
    const { photos } = data;
    console.log(photos);

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
                photos: {
                    create: photos.map((photo) => ({
                        url: photo.dataUrl,
                    }))
                },
                progress: {
                    upsert: {
                        create: {
                            photosCompleted: true,
                        },
                        update: {
                            photosCompleted: true,
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
