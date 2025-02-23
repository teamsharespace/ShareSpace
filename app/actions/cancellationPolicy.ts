"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import { UserSession } from "./fetchUser";
import prisma from "@/lib/prisma";
import { CancellationPolicy } from "@prisma/client";
import { FormValues } from "../becomeHost/cancellationPolicy/[id]/page";


export async function createCancellationPolicy(data: FormValues, listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };
    const { cancellationPolicy } = data;
    console.log(cancellationPolicy);
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
                cancellationPolicy: cancellationPolicy as CancellationPolicy,
                progress: {
                    upsert: {
                        create: {
                            cancellationPolicyCompleted: true,
                        },
                        update: {
                            cancellationPolicyCompleted: true,
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
