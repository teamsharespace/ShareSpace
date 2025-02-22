'use server'
import { getServerSession } from "next-auth";
import { UserSession } from "./fetchUser";
import { NEXT_AUTH } from "../lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteSpace(listingId: string) {
    const session = await getServerSession(NEXT_AUTH) as UserSession;
    if (!session) return null;
    try {
        await prisma?.listing?.delete({
            where: {
                id: listingId,
            },
        });
        revalidatePath("/becomeHost");
    } catch (error) {
        return error;
    }
}
