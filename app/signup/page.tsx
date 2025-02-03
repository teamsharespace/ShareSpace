'use client'
import { Card, CardContent, CardFooter, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Facebook } from "lucide-react"
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod"
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
const UserSchema: ZodType<IFormInput> = z
.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

interface IFormInput {
  email: string,
  password: string,
  confirmPassword: string,
}

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
)

export default function Signup() {
    const[isLoading,setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit: SubmitHandler<IFormInput> =async (data) => {
        //console.log(data);
        setIsLoading(true);
        try{
        await signIn("credentials",{redirect: true,email: data.email,password: data.password,callbackUrl:'/'})
        } catch (error){
            console.log(error);
        } finally{
            setIsLoading(false);
        }

    }
    const handleGoogleSignIn = () => {
  signIn("google", { redirect: true, callbackUrl: '/' })
}

const handleFacebookSignIn = () => {
  signIn("facebook", { redirect: true, callbackUrl: '/' })
}

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <Card className="w-[480px] shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create new account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`${errors.email ?  'border-red-500 border-2': ' ' }`}
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    className={`${errors.email ?  'border-red-500 border-2': ' ' }`}
                                    placeholder="••••••••"
                                    {...register("password")}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    className={`${errors.email ?  'border-red-500 border-2': ' ' }`}
                                    placeholder="••••••••"
                                    {...register("confirmPassword")}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                            </div>
                            <div className="flex items-center justify-center w-full text-sm">
                                <Link href="/login">Already have an account? Login </Link>
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                  {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : (
                                    "Sign up"
                                )}
                            </Button>
                        </div>
                    </form>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button
                        variant="outline"
                        className="w-full bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 flex items-center justify-center gap-2 "
                        onClick={handleGoogleSignIn}
                    >
                        <GoogleIcon />
                        Sign up with Google
                    </Button>

                    <Button
                        className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center justify-center gap-2"
                        onClick={handleFacebookSignIn}
                    >
                        <Facebook size={20} />
                        Sign up with Facebook
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
