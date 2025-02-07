import { Card, CardContent, CardFooter, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { X } from "lucide-react";

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4" />
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

export default function Signup({onClose}: {onClose: () => void}) {
const handleGoogleSignIn = () => {
    signIn('google', {
      callbackUrl: '/',
       redirect: true,
    });
  };
    return (
  <div className="flex fixed top-0 left-0 justify-center items-center w-full h-full backdrop-blur-sm transition-opacity duration-300 ease-in-out">
            <Card className="flex justify-center w-4/5 md:w-2/3 xl:w-1/2   h-1/2 md:h-[65%]  shadow-lg relative">
                <span className="absolute top-0 left-0 p-4 font-bold text-sm md:text-xl ">SpaceSphere</span>
                <X className="absolute top-3 right-2 md:top-5 md:right-5 cursor-pointer rounded-full bg-white/60 px-2 w-8 h-8 text-grey-800"  onClick={onClose}/>
                <CardContent className="flex items-center flex-col md:flex-row  md:justify-between h-full w-full">
                        <div className="flex flex-col items-center md:-ml-5 w-full h-full md:h-auto">
                            <span className=" font-bold text-xl xl:text-2xl hidden md:block mb-2 ">Welcome back</span>
                        <Image src={"/assets/interior.jpg"} width={10} height={10} className="h-5/6 mt-12 md:hidden mb-4  w-full rounded-2xl" alt={"Image"} />
                            <span className="mb-4 text-sm hidden md:block  text-gray-500 font-medium">Sign in with google to continue </span>
                            <Button
                                variant="outline"
                                className="px-8 lg:px-16 bg-white font-bold w-full md:w-auto text-gray-700 hover:bg-gray-50 border border-gray-300"
                                onClick={handleGoogleSignIn}
                            >
                                <GoogleIcon />
                                Sign up with Google
                            </Button>
                        </div>
                        <Image src={"/assets/interior.jpg"} width={10} height={10} className="h-full mt-6 hidden md:block -mr-3 w-full rounded-2xl" alt={"Image"} />
                </CardContent>

            </Card>
        </div>
    )
}
