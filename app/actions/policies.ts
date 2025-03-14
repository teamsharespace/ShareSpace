
"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import { UserSession } from "./fetchUser";
import prisma from "@/lib/prisma";
import { PolicyFormValues } from "../becomeHost/policies/[id]/page";


export async function createPolicy(data: PolicyFormValues, listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };
    const { policiesAccepted } = data;
    console.log(data);
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
                agreesToPolicies: policiesAccepted,
                progress: {
                    upsert: {
                        create: {
                            policiesCompleted: true,
                        },
                        update: {
                            policiesCompleted: true,
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
