import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { NextAuthOptions } from "next-auth";

export const NEXT_AUTH: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || " ",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || " ",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn:"/signup",
        signOut: "/",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        session: ({ session, token }: any) => {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.userId,
                }
            }
            return session
        },
        jwt: ({ token, user }: any) => {
            if (user) {
                token.userId = user.id;
                token.email = user.email
            }
            return token
        }
    },
}
