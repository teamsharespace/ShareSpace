"use client"
import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createOperatingHours } from "@/app/actions/operatingHours"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const HOURS = Array.from({ length: 25 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12
    const period = i < 12 || i === 24 ? 'AM' : 'PM'
    return {
        value: i.toString().padStart(2, '0'),
        label: `${hour}:00 ${period}`
    }
})

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const dayScheduleSchema = z.object({
    isOpen: z.boolean(),
    scheduleType: z.enum(["default", "custom"]),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
})

const operatingHoursSchema = z.object({
    schedule: z.record(z.string(), dayScheduleSchema),
})

export type OperatingHoursValues = z.infer<typeof operatingHoursSchema>

export default function OperatingHours({ params }: {
    params: { id: string }
}) {
    const listingId = params.id;
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const defaultValues: OperatingHoursValues = {
        schedule: DAYS.reduce((acc, day) => {
            acc[day] = {
                isOpen: true,
                scheduleType: "default",
                openTime: "06",
                closeTime: "24",
            }
            return acc
        }, {} as Record<string, z.infer<typeof dayScheduleSchema>>),
    }

    const {
        control,
        handleSubmit,
        watch,
    } = useForm<OperatingHoursValues>({
        resolver: zodResolver(operatingHoursSchema),
        defaultValues,
    })

    async function onSubmit(data: OperatingHoursValues) {
        setIsSubmitting(true);
        try {
            await createOperatingHours(data, listingId);
            router.push(`/becomeHost/healthAndSafety/${listingId}`);
        } catch (error) {
            console.error("Error isSubmitting form", error);
        }finally{
            setIsSubmitting(false);
        }
    }

    const watchedValues = watch("schedule")

    return <>
        <nav className={"w-full z-50 transition-all duration-300 fixed top-0 bg-black/90"}>
            <div className="flex items-center justify-between px-6 py-2 mx-auto">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
                </Link>
                <span className="text-white text-lg mr-10  font-medium">Operating Hours</span>
            </div>
        </nav>
        <main>
            <div className="w-[58%] pt-32 flex-col flex mx-auto ">
                <form >
                    <div className="flex flex-col space-y-4 w-full">
                        <h1 className="text-3xl font-bold">What are your operating hours?</h1>
                        <span className="flex flex-wrap text-sm text-gray-800 pb-2">
                            Operating hours are the day and hours of the week that your space is open to host bookings (i.e. your general availability).
                            Guests will not be able to book times outside of your operating hours.
                            <a href="#" className="text-blue-600 hover:underline ml-1">Learn More.</a>
                        </span>
                        <span className="text-sm text-gray-800 font-bold pb-2">Johay - silicon valley</span>
                        <div className="p-4 bg-[#FEF4DB] text-sm text-gray-800">
                            Operating hours end times are restricted to 12 AM for this space type.
                            Read our <a href="#" className="text-blue-600 hover:underline">Social Events Policy</a> for more information.
                        </div>
                    </div>

                    {DAYS.map((day) => (
                        <div key={day}>
                            <hr className="border-t border-gray-200 my-8" />
                            <div className="flex flex-row items-center gap-8 w-full">
                                <span className="text-gray-800 font-bold text-sm w-24">{day}</span>

                                <Controller
                                    control={control}
                                    name={`schedule.${day}.isOpen`}
                                    render={({ field }) => (
                                        <div className="items-center flex gap-2">
                                            <Switch
                                                id={`${day}-open`}
                                                className="w-12 h-8"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <Label htmlFor={`${day}-open`}>Open</Label>
                                        </div>
                                    )}
                                />

                                {watchedValues[day].isOpen && (
                                    <Controller
                                        control={control}
                                        name={`schedule.${day}.scheduleType`}
                                        render={({ field }) => (
                                            <RadioGroup
                                                className="flex flex-row gap-4 items-center"
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <div className="items-center flex gap-2">
                                                    <RadioGroupItem
                                                        value="default"
                                                        id={`${day}-default`}
                                                        className="border-gray-300"
                                                    />
                                                    <Label htmlFor={`${day}-default`}>6:00 AM - 12:00 AM</Label>
                                                </div>
                                                <div className="items-center flex gap-2">
                                                    <RadioGroupItem
                                                        value="custom"
                                                        id={`${day}-custom`}
                                                        className="border-gray-300"
                                                    />
                                                    <Label htmlFor={`${day}-custom`}>Set hours</Label>
                                                </div>
                                            </RadioGroup>
                                        )}
                                    />
                                )}
                            </div>

                            {watchedValues[day].isOpen && watchedValues[day].scheduleType === "custom" && (
                                <div className="ml-32 mt-4 flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor={`${day}-open-time`}>Open:</Label>
                                        <Controller
                                            control={control}
                                            name={`schedule.${day}.openTime`}
                                            render={({ field }) => (
                                                <select
                                                    id={`${day}-open-time`}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                >
                                                    {HOURS.slice(0, 24).map((hour) => (
                                                        <option key={hour.value} value={hour.value}>
                                                            {hour.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Label htmlFor={`${day}-close-time`}>Close:</Label>
                                        <Controller
                                            control={control}
                                            name={`schedule.${day}.closeTime`}
                                            render={({ field }) => (
                                                <select
                                                    id={`${day}-close-time`}
                                                    className="border border-gray-300 rounded px-2 py-1"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                >
                                                    {HOURS.slice(1).map((hour) => (
                                                        <option key={hour.value} value={hour.value}>
                                                            {hour.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <hr className="border-t border-gray-200 mt-16 mb-10" />
                    <div className="w-full flex justify-between mb-16">
                        <Link href={`/becomeHost/uploadPhotos/${listingId}`}>
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
        </main>
    </>
}
