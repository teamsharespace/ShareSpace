import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth";
import { signIn } from "next-auth/react";

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
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || " ",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || " ",
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: "email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials: any) {
                if (!credentials.email || !credentials.password) return null;
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });
                if (user) {
                    const isValid = await bcrypt.compare(credentials.password, user.password || " ");
                    if (!isValid) return null;
                    return user
                } else {
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const newUser = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            password: hashedPassword,
                        }
                    })
                    return newUser
                }

            },
        })
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
