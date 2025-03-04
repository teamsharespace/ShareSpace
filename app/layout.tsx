import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/sonner"
import { RootProvider } from '@/providers/rootProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'SpaceShare - Book Unique Spaces',
    description: 'Find and book unique spaces for meetings, photoshoots, events, and coworking',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <RootProvider>
                    <main>{children}</main>
                    <Toaster />
                </RootProvider>
            </body>
        </html>
    )
}
