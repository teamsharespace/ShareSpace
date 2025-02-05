import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token as string, process.env.NEXTAUTH_SECRET || " ");
         await prisma.user.update({
            where: {
                email: (decoded as { email: string }).email
            },
            data: {
                emailVerified: new Date(),
            }
        })

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
}

