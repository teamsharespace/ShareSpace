"use client"
import { ActivitiesSchema, amenities, Amenities, Booking, CleaningRate } from "@/app/hooks/useActivitiesForm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CircleCheck, Hourglass, User } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext} from "react-hook-form";

export default function Meeting() {
    const { watch, setValue, control, register, formState: { errors } } = useFormContext<ActivitiesSchema>();
    const selectAmenities = watch("meeting.amenities", []);
    const selectCustomAmenities = watch("meeting.customAmenities", []);
    const [customAmenities, setCustomAmenities] = useState<string[]>();
    const [customAmenity, setCustomAmenity] = useState<string>("");
    const [showAdditonalFee, setShowAddtionalFee] = useState(false);
    const enabled = watch("meeting.enabled",false);

    const toggleAmenity = (amenity: Amenities) => {
        const updatedAmenities = selectAmenities?.includes(amenity)
            ? selectAmenities.filter(a => a !== amenity)
            : [...selectAmenities || [], amenity];
        setValue("meeting.amenities", updatedAmenities);
    };

    const addCustomAmenity = () => {
        if (customAmenity.trim() !== "") {
            if (!customAmenities?.includes(customAmenity)) {
                setCustomAmenities([...(customAmenities || []), customAmenity]);
            }
            setValue("meeting.customAmenities", [...(selectCustomAmenities || []), customAmenity]);
            setCustomAmenity("");
        }
    };
    const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAmenity(e.target.value);
    }
    const toggleCustomAmenities = (amenity: string) => {
        const updatedCustomAmenities = selectCustomAmenities?.includes(amenity)
            ? selectCustomAmenities.filter(a => a !== amenity)
            : [...selectCustomAmenities || [], amenity];
        setValue("meeting.customAmenities", updatedCustomAmenities);
    }
    return <>
        <div className="border-gray-300 border p-6  flex flex-col space-y-2 ">
            <h2 className="font-bold text-2xl ">Meetings</h2>
            <ul className="list-disc list-inside flex flex-col gap-1 text-gray-800 text-sm pb-2">
                <li>Workshops</li>
                <li>Presentations</li>
                <li>Retreats</li>
                <li>More</li>
            </ul>
            {!enabled ? (
                <div
                    className="w-full bg-white border-gray-300 border flex flex-row items-center justify-center p-2 gap-1 cursor-pointer"
                    onClick={() => setValue("meeting.enabled",!enabled)}
                >
                    <span className="text-black font-medium ">Enable</span>

                </div>
            ) : (
                <div
                    className="w-full border-gray-300 bg-black flex flex-row items-center justify-center p-2 gap-1 cursor-pointer"
                    onClick={() => setValue("meeting.enabled",!enabled)}
                >
                    <CircleCheck className="w-22 h-22 text-black" fill="white" />
                    <span className="text-white font-medium">Enabled</span>

                </div>
            )
            }
            {enabled && (
                <>
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
                                    {...register("meeting.hourlyRate", { valueAsNumber: true })}
                                />
                            </div>
                        </div>
                        {errors.meeting?.hourlyRate && (
                            <span className="text-red-500 text-xs">{errors.meeting.hourlyRate.message}</span>
                        )}
                        <span className="font-semibold text-sm pt-4">Minimum number of hours</span>
                        <span className="text-sm text-gray-500">Must be between 1-12 hours</span>
                        <div className="flex flex-row ">
                            <Hourglass fill="gray" stroke="gray" className="rounded-none text-sm p-2 border-r-0  text-gray-800 w-14 h-10 border flex items-center" />
                            <div className="rounded-none text-md  border w-1/2 h-10">
                                <input
                                    className='w-full h-full p-4 placeholder:text-sm'
                                    placeholder='4'
                                    type='number'
                                    {...register("meeting.minimumHours", { valueAsNumber: true })}
                                />
                            </div>
                        </div>
                        {errors.meeting?.minimumHours && (
                            <span className="text-red-500 text-xs">{errors.meeting?.minimumHours.message}</span>
                        )}
                        <span className="font-semibold text-sm pt-4 ">8+ hour discount</span>
                        <span className="text-sm text-gray-500">Encourage guests to book longer by giving a discount for bookings that are 8 hours or more.</span>
                        <div className="flex flex-row ">
                            <div className="rounded-none text-md  border w-1/2 h-10">
                                <input
                                    className='w-full h-full p-4 placeholder:text-sm'
                                    placeholder='Optional'
                                    type='number'
                                    {...register("meeting.discount", { valueAsNumber: true })}
                                />
                            </div>
                            <div className="rounded-none text-sm p-4 border-l-0 border h-10 flex items-center text-gray-500">% Off</div>
                        </div>
                    </div>
                    {
                        errors.meeting?.discount && (
                            <span className="text-red-500 text-xs">{errors.meeting?.discount.message}</span>
                        )
                    }
                    <span className="font-semibold text-sm pt-4">Cleaning Fee</span>
                    <span className="text-sm text-gray-500">You are responsible for cleaning after each booking. You can charge a fee to cover related costs. </span>
                    <Controller
                        name="meeting.cleaningRate"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup value={field.value} onValueChange={(value) => {
                                field.onChange(value);
                                setShowAddtionalFee(value === CleaningRate.ADDITIONAL)
                                if (value !== CleaningRate.ADDITIONAL) setValue("meeting.additionalFee", NaN);
                            }} className="flex flex-col gap-4 text-[#201939] pt-4" >
                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem value={CleaningRate.INCLUDED} id="r1" className="border-gray-400" />
                                    <Label htmlFor="r1">Included in hourly rate</Label>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem value={CleaningRate.ADDITIONAL} id="r3" className="border-gray-400" />
                                    <Label htmlFor="r3">Additional flat fee</Label>
                                </div>
                            </RadioGroup>)}
                    />
                    {
                        errors.meeting?.cleaningRate?.message && (
                            <span className="text-red-500 text-xs pt-2">{errors.meeting?.cleaningRate.message}</span>
                        )
                    }
                    {
                        showAdditonalFee && (
                            <>
                                <div className="flex flex-row pt-4">
                                    <div className="rounded-none text-sm p-4 border-r-0 text-gray-600 border h-10 flex items-center">Rs.</div>
                                    <div className="rounded-none text-md  border w-1/2 h-10">
                                        <input
                                            className='w-full h-full p-4 placeholder:text-sm'
                                            placeholder='1000'
                                            type='number'
                                            {...register("meeting.additionalFee", {
                                                valueAsNumber: true,
                                            })}
                                        />
                                    </div>
                                </div>
                                {errors.meeting?.additionalFee?.message && (
                                    <span className="text-red-500 text-xs pt-2">{errors.meeting.additionalFee.message}</span>
                                )}
                            </>
                        )
                    }
                    <span className="font-semibold text-lg pt-6">Who can book instantly?</span>
                    <hr className="border-t border-gray-300 " />
                    <Controller
                        name="meeting.instantBooking"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup value={field.value} onValueChange={field.onChange} defaultValue="comfortable" className=" flex flex-col text-[#201939] pt-4">
                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem id="r1" className="border-gray-400" value={Booking.EVERYONE} />
                                    <Label htmlFor="r1" className="font-bold">Everyone</Label>
                                </div>
                                <span className="text-sm text-gray-500 pl-8 gap-2 flex flex-wrap pb-4">Guests who acknowledge and accept your host rules can book instantly.</span>
                                <div className="flex items-center space-x-4">
                                    <RadioGroupItem id="r3" className="border-gray-400" value={Booking.NONE} />
                                    <Label htmlFor="r3" className="font-bold">No one</Label>
                                </div>
                                <span className="text-sm text-gray-500 pl-8 gap-2 flex flex-wrap ">Booking requests will need to be manually accepted or declined.</span>
                            </RadioGroup>
                        )} />
                    {
                        errors.meeting?.instantBooking && (
                            <span className="text-red-500 text-xs pt-2">{errors.meeting.instantBooking.message}</span>
                        )
                    }
                    <span className="text-sm font-medium bg-[#F9F1E1] text-[#92763F] p-3">Meeting listings get up to <b> 2x more bookings </b> when guests can book instantly</span>
                    <span className="font-semibold text-lg pt-6">Capacity</span>
                    <hr className="border-t border-gray-300" />
                    <span className="font-semibold pt-2 ">Maximum number of guests</span>
                    <div className="flex flex-row ">
                        <User fill="gray" stroke="gray" className="rounded-none text-sm p-2 border-r-0  text-gray-800 w-14 h-10 border flex items-center" />
                        <div className="rounded-none text-md  border w-1/2 h-10">
                            <input
                                className='w-full h-full p-4 placeholder:text-sm'
                                placeholder='250'
                                type='number'
                                {...register("meeting.capacity", { valueAsNumber: true })}
                            />
                        </div>
                    </div>
                    {
                        errors.meeting?.capacity && (
                            <span className="text-red-500 text-xs">{errors.meeting.capacity.message}</span>
                        )
                    }
                    <span className="font-semibold text-lg pt-10">Amenities</span>
                    <hr className="border-t border-gray-300 " />
                    <span className="text-sm text-gray-500 leading-6 pt-2 gap-2 flex flex-wrap pb-4">All amenities you select should be included in your hourly rate. If you have amenities that you charge for, do not include them here. You can add those in a later section.</span>
                    <span className="text-gray-500 gap-2 flex flex-wrap pb-4">You must include WiFi, tables, and chairs to offer meetings</span>
                    {
                        errors.meeting?.amenities && (
                            <span className="text-red-500 text-xs pb-4">{errors.meeting?.amenities.message}</span>
                        )
                    }
                    {
                        amenities.map((amenity, index) => (
                            <div className="flex items-center space-x-2 pb-2" key={index}>
                                <Checkbox id={`terms-${index}`} className="border-gray-800"
                                    checked={selectAmenities?.includes(amenity)}
                                    onCheckedChange={() => toggleAmenity(amenity)}
                                />
                                <label
                                    htmlFor={`terms-${index}`}
                                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800"
                                >
                                    {amenity}
                                </label>
                            </div>))
                    }
                    <span className="pt-8 pb-2 ">Add your own amenities</span>
                    {
                        customAmenities?.map((amenity, index) => (
                            <div className="flex items-center space-x-2 pb-2" key={index}>
                                <Checkbox id={`terms-${index}`} className="border-gray-800"
                                    checked={selectCustomAmenities?.includes(amenity)}
                                    onCheckedChange={() => toggleCustomAmenities(amenity)}
                                />
                                <label
                                    htmlFor={`terms-${index}`}
                                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-800"
                                >
                                    {amenity}
                                </label>
                            </div>))
                    }
                    <div className="flex flex-row gap-2 pb-8">
                        <Input className="w-2/3 border-gray-300 rounded-none" value={customAmenity} onChange={handleAmenityChange} />
                        <Button className="rounded-none" onClick={addCustomAmenity}>Add</Button>
                    </div>
                </>
            )}
        </div>
    </>
}
