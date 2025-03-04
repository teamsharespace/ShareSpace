import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Activites() {
    return <>
        <nav className="w-full z-50 transition-all duration-300 fixed top-0 bg-black/90">
            <div className="flex items-center justify-between px-6 py-2 mx-auto">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
                </Link>
                <span className="text-white text-lg mr-10 font-medium">Activites</span>
            </div>
        </nav>
        <main>
            <div className="w-[58%] pt-32 flex-col flex mx-auto">
                <h1 className="text-3xl font-bold pb-4">Which activities would you like to host?</h1>
                <span className="text-gray-600 text-sm w-2/3 pb-4">Select the types of activities you would like to host. For each selection, we’ll create a customized listing unique to that activity.</span>
                <div className="border-gray-300 border w-1/3 p-6  flex flex-col space-y-2 ">
                    <h2 className="font-bold text-2xl ">Meetings</h2>
                    <ul className="list-disc list-inside flex flex-col gap-1 text-gray-800 text-sm pb-2">
                        <li>Workshops</li>
                        <li>Presentations</li>
                        <li>Retreats</li>
                        <li>More</li>
                    </ul>
                    <Button
                        className="w-full border-gray-300 " variant={"minimal"}
                    >
                        Enable
                    </Button>
                    <div className="flex flex-col space-y-4 pt-4">
                        <div>
                            <h1 className="font-semibold text-xl pb-2">Pricing</h1>
                            <hr className="border-t border-gray-300 " />
                        </div>
                        <span className="font-semibold text-sm ">Hourly rate</span>
                        <span className="text-sm text-gray-500">Please choose a base hourly rate. You can customize your pricing with attendee pricing, calendar pricing, and add-ons once your listings are created</span>
                        <div className="flex flex-row ">
                            <div className="rounded-none text-sm p-4 border-r-0 text-gray-600 border h-10 flex items-center">Rs.</div>
                            <div className="rounded-none text-md  border w-1/2 h-10">
                                <input
                                    className='w-full h-full p-4 placeholder:text-sm'
                                    placeholder='1000'
                                    type='number'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    </>
}
