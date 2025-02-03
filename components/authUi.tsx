'use client'

import { signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button"

export const LogoutButton = () => {
    return(
    <Button onClick={() => signOut()} className="text-black bg-white hover:text-white">Logout</Button>
    )
}
export const SignupButton = () => {
    return(
    <Button onClick={() => signIn()}>Signup</Button>
    )
}
