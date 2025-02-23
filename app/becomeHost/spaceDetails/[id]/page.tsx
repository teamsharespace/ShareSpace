'use client'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createSpaceDetails } from "@/app/actions/spaceDetails"
import { useEffect, useState } from "react"
import { fetchListingsToEdit } from "@/app/actions/fetchListingToEdit"
import { Listing } from "@prisma/client"
import { Loader2 } from "lucide-react"

const spaceFormSchema = z.object({
    spaceType: z.string().min(1, { message: "Space type is required" }),
    overnightStays: z.boolean(),
    hasParking: z.boolean(),
    parkingOptions: z.array(z.string()).optional(),
    parkingDescription: z.string().min(35, { message: "Minimum 35 characters required" }).optional()
        .or(z.literal('')),
    hasSecurityCameras: z.boolean().optional(),
})

export type SpaceFormValues = z.infer<typeof spaceFormSchema>

const PARKING_OPTIONS = [
    {name: "Free onsite parking", value: "ONSITE"},
    {name: "Free street parking", value: "STREET"},
    {name: "Valet", value: "VALET"},
    {name: "Paid onsite parking", value: "METERED_STREET"},
    {name: "Metered street parking", value: "LOT"},
    {name: "Nearby parking lot", value: "PAID_ONSITE"},
]

export default function Space({ params }: {
    params: { id: string }
}) {
    const listingId = params.id;
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors }
    } = useForm<SpaceFormValues>({
        resolver: zodResolver(spaceFormSchema),
        defaultValues: {
            spaceType: "",
            overnightStays: false,
            hasParking: false,
            parkingOptions: [],
            parkingDescription: "",
            hasSecurityCameras: false,
        }
    })

    useEffect(() => {
        async function getListingsToEdit() {
            try {
                if (listingId !== 'new') {
                    const listingData = await fetchListingsToEdit(listingId) as Listing;
                    console.log("Listing Data", listingData);
                    reset({
                        spaceType: listingData?.typeOfSpace || '',
                        overnightStays: listingData?.overNightStays || false,
                        hasParking: listingData?.hasParking || false,
                        parkingOptions: listingData?.parkingOptions || [],
                        parkingDescription: listingData?.parkingDescription || '',
                        hasSecurityCameras: listingData?.securityCameras || false,
                    })
                }
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
        }
        getListingsToEdit();
    }, [listingId, reset])
    const hasParking = watch("hasParking")

    async function onSubmit(data: SpaceFormValues) {
        setIsSubmitting(true)
        console.log("Form submitted:", data)
        try {
            await createSpaceDetails(data, listingId);
            router.push(`/becomeHost/typeOfSpace/${listingId}`);
        }
        catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false)
        }
    }

    return <>
        <nav className={"w-full z-50 transition-all duration-300 fixed top-0 bg-black/90"}>
            <div className="flex items-center justify-between px-6 py-2 mx-auto">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
                </Link>
                <span className="text-white text-lg mr-10  font-medium">Address</span>
            </div>
        </nav>
        <main>
            <div className="w-[58%] pt-32 flex-col flex mx-auto ">
                <form className="space-y-8">
                    <div className="flex flex-col space-y-4 w-full">
                        <span className="text-3xl font-bold">What type of space are you listing?</span>
                        <span className="text-sm font-normal">Enter the type of space that most closely represents the physical space being listed</span>
                        <span className="text-sm font-normal">Examples: 'Apartment' 'Photo Studio' 'Restaurant'</span>
                        <Input
                            id="spaceType"
                            placeholder="Apartment"
                            className="w-1/2 mt-10"
                            {...register("spaceType")}
                        />
                        {errors.spaceType && (
                            <p className="text-red-500 text-sm">{errors.spaceType.message}</p>
                        )}
                    </div>

                    <hr className="border-t border-gray-200 my-12" />

                    <div className="flex flex-col space-y-4 w-full">
                        <span className="text-3xl font-bold">Do you offer overnight stays at this space?</span>
                        <div className="flex flex-row items-center justify-between">
                            <span>
                                Select 'Yes' if your space is listed on sites like Airbnb or VRBO, or if it's a hotel or similar establishment that's <br />
                                subject to lodging taxes.
                            </span>
                            <Controller
                                control={control}
                                name="overnightStays"
                                render={({ field }) => (
                                    <div>
                                        <Button
                                            type="button"
                                            className={`rounded-none text-md border-r-0 p-6 ${field.value ? 'bg-black text-white' : ''}`}
                                            variant={"minimal"}
                                            onClick={() => field.onChange(true)}
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            type="button"
                                            className={`rounded-none text-md p-6 ${!field.value ? 'bg-black text-white' : ''}`}
                                            variant={"minimal"}
                                            onClick={() => field.onChange(false)}
                                        >
                                            No
                                        </Button>
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <hr className="border-t border-gray-200 my-12" />

                    <div className="flex flex-col space-y-4 w-full">
                        <span className="text-3xl font-bold">Describe the parking options</span>
                        <div className="flex flex-row items-center justify-between">
                            <span className="font-normal">Are there parking options at or near your space?</span>
                            <Controller
                                control={control}
                                name="hasParking"
                                render={({ field }) => (
                                    <div>
                                        <Button
                                            type="button"
                                            className={`rounded-none text-md border-r-0 p-6 ${field.value ? 'bg-black text-white' : ''}`}
                                            variant={"minimal"}
                                            onClick={() => field.onChange(true)}
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            type="button"
                                            className={`rounded-none text-md p-6 ${!field.value ? 'bg-black text-white' : ''}`}
                                            variant={"minimal"}
                                            onClick={() => field.onChange(false)}
                                        >
                                            No
                                        </Button>
                                    </div>
                                )}
                            />
                        </div>

                        {hasParking && (
                            <>
                                <span className="font-semibold pt-6">Select all that apply</span>
                                <div className="grid grid-cols-2 gap-8">
                                    {PARKING_OPTIONS.map((option) => (
                                        <div key={option.value} className="flex flex-row items-center space-x-2">
                                            <Controller
                                                control={control}
                                                name="parkingOptions"
                                                render={({ field }) => (
                                                    <Checkbox
                                                        id={option.value}
                                                        className="border-gray-400"
                                                        checked={field.value?.includes(option.value) || false}
                                                        onCheckedChange={(checked) => {
                                                            const currentValues = field.value || [];
                                                            const newValues = checked
                                                                ? [...currentValues, option.value]
                                                                : currentValues.filter(value => value !== option.value);
                                                            field.onChange(newValues);
                                                        }}
                                                    />
                                                )}
                                            />
                                            <label htmlFor={option.name} className="text-sm font-normal">
                                                {option.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col space-y-4 w-full pt-10">
                                    <span className="text-md font-semibold">Write a description of the parking options</span>
                                    <span className="font-normal text-gray-600 text-sm">
                                        Don't include private information. This will be shown publicly.
                                    </span>
                                    <Input
                                        placeholder="How many cars can fit? How difficult is the street parking? How close are the nearby parking lots etc?"
                                        className="px-4 pb-24 pt-6"
                                        {...register("parkingDescription")}
                                    />
                                    {errors.parkingDescription && (
                                        <p className="text-red-500 text-sm">{errors.parkingDescription.message}</p>
                                    )}
                                    <span className="flex self-end text-sm text-gray-600 pb-6">
                                        Minimum 35 characters
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    <hr className="border-t border-gray-200 my-10" />

                    <div className="flex flex-col space-y-4 w-full">
                        <span className="text-3xl font-bold">Security cameras and recording devices</span>
                        <div className="flex flex-row items-center justify-between">
                            <span>Does the space have security cameras or recording devices?</span>
                            <Controller
                                control={control}
                                name="hasSecurityCameras"
                                render={({ field }) => (
                                    <div>
                                        <Button
                                            type="button"
                                            className={`rounded-none text-md border-r-0 p-6 ${field.value ? 'bg-black text-white' : ''}`}
                                            variant={"minimal"}
                                            onClick={() => field.onChange(true)}
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            type="button"
                                            className={`rounded-none text-md p-6 ${!field.value ? 'bg-black text-white' : ''}`}
                                            variant={"minimal"}
                                            onClick={() => field.onChange(false)}
                                        >
                                            No
                                        </Button>
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <hr className="border-t border-gray-200 mt-16 mb-10" />
                    <div className="w-full flex justify-between mb-16">
                        <Link href={`/becomeHost/address/${listingId}`}>
                            <Button variant={"outline"} className="text-md font-semibold" >Back</Button>
                        </Link>
                        <Button
                            className="text-md font-semibold bg-[#8559EC] hover:bg-[#7248d1]"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Next'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </main >
    </>
}
