"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import { UserSession } from "./fetchUser";
import prisma from "@/lib/prisma";
import { BlobServiceClient } from '@azure/storage-blob';
import { UploadPhotosValues } from "../becomeHost/uploadPhotos/[id]/page";


export async function uploadPhotos(formData: FormData, listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };

    const files = formData.getAll("files") as File[];
    const listing = await prisma?.listing?.findUnique({
        where: {
            id: listingId,
        }
    });
    if (!listing || listing.userId != session?.user?.id) {
        return null;
    }
    try {
        const uploadedUrls = await uploadToAzureBlobStorage(files);
        await prisma?.listing?.update({
            where: {
                id: listingId,
            },
            data: {
                photos: uploadedUrls,
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
export async function uploadToAzureBlobStorage(files: any[]) {
    const CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING as string;
    const containerName = "photos";
    const blobServiceClient = BlobServiceClient.fromConnectionString(CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const uploadedUrls = [];
    for (const file of files) {
        const blobName = `${Date.now()}-${file.name}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        try {
            const buffer = await file.arrayBuffer();
            await blockBlobClient.uploadData(buffer, buffer.byteLength);
            uploadedUrls.push(blockBlobClient.url);

        } catch (error) {
            console.error(error);
        }
    }
    return uploadedUrls;
}
