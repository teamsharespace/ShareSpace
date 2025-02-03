'use client'
import { ThemeProvider } from "./themeProvider"
import { SessionProvider } from "./sessionProvider"
import { Toaster } from "@/components/ui/toaster"

export function RootProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>
                {children}
                <Toaster />
            </SessionProvider>
        </ThemeProvider>
    )
}
