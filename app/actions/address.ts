"use server"
import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../lib/auth"
import { UserSession } from "./fetchUser";
import prisma from "@/lib/prisma";
import { FormAddress } from "@/components/listingForm/createAddress";


export async function createAddress(data: FormAddress, listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return { error: "Unauthorized" };
    const { address, landmark, state, city, pincode } = data
    try {
        if (listingId === 'new') {
            const listing = await prisma?.listing?.create({
                data: {
                    userId: session?.user?.id || " ",
                    name: "Untitled",
                }
            })
            listingId = listing.id;
        }
        await prisma?.listing?.update({
            where: {
                id: listingId,
            },
            data: {
                address: address,
                landmark: landmark,
                state: state,
                city: city,
                pincode: pincode,
                progress: {
                    upsert: {
                        create: {
                            addressCompleted: true,
                        },
                        update:{
                            addressCompleted: true,
                        }
                    }
                }
            }
        })
        return listingId;
    } catch (error) {
        return {
            error: error || "Unknown error",
        }
    }
}
