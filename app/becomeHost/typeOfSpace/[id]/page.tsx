'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createTypeOfSpace } from '@/app/actions/typeOfSpace';

const listingSchema = z.object({
    spaceTitle: z.string().min(10, "Title must be at least 10 characters long"),
    spaceDescription: z.string().min(350, "Description must be at least 350 characters long"),
    bookingSize: z.coerce.number().min(1, "Size must be greater than 0"),
    houseRules: z.string().min(100, "House rules must be at least 100 characters long"),
    allowedGuests: z.string().optional(),
    wifiName: z.string().optional(),
    wifiPassword: z.string().optional(),
    arrivalInstructions: z.string().min(20, "Arrival instructions must be at least 20 characters long")
});

export type ListingFormData = z.infer<typeof listingSchema>;

export default function ShareSpaceListing({ params }: {
    params: { id: string }
}) {
    const listingId = params.id;
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ListingFormData>({
        resolver: zodResolver(listingSchema),
        defaultValues: {
            spaceTitle: '',
            spaceDescription: '',
            bookingSize: undefined,
            houseRules: '',
            allowedGuests: 'All ages',
            wifiName: '',
            wifiPassword: '',
            arrivalInstructions: ''
        }
    });

    async function onSubmit(data: ListingFormData) {
        console.log('Form submitted with data:', data);
        try {
            await createTypeOfSpace(data, listingId);
            router.push(`/becomeHost/uploadPhotos/${listingId}`);
        }
        catch (error) {
            console.error("Error submitting form:", error);
        }
    };

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
                <form className="max-w-2xl mx-auto p-8">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-extrabold mb-4">Give your space a title</h2>
                            <p className="text-sm text-gray-800 mb-6">Create a title that will grab a guest's interest and describes your space. Do not include your business name.</p>
                            <div className="space-y-2">
                                <p className="text-sm font-bold pb-4">Try to include the following:</p>
                                <ul className="list-disc flex flex-col gap-2 pb-6 list-inside text-sm text-gray-700">
                                    <li><b>Location</b> - urban, downtown, marine</li>
                                    <li><b>The type of space </b> - loft, studio, dance, small, performance</li>
                                    <li><b>Unique adjective </b>- industrial, rustic, sunny</li>
                                </ul>
                            </div>
                            <span className="font-normal text-sm">Example: "Downtown Loft with Skyline View"</span>
                            <Input
                                {...register('spaceTitle')}
                                placeholder="Enter your space title"
                                className="w-full mt-12 mb-2"
                            />
                            {errors.spaceTitle && (
                                <p className="text-red-500 text-sm mb-16">{errors.spaceTitle.message}</p>
                            )}
                        </div>

                        <hr className="border-t border-gray-200 my-12" />
                        <div>
                            <h2 className="text-3xl font-extrabold mb-4 mt-16">Add a description for your space</h2>
                            <p className="text-sm text-gray-800 mb-6">Include details about your space and tell guests everything it offers.</p>
                            <div className="space-y-2 mb-16">
                                <p className="text-sm font-bold pb-4">Try to answer questions like:</p>
                                <ul className="list-disc list-inside flex flex-col gap-2 pb-4 text-sm text-gray-800">
                                    <li>What activities work well in your space?</li>
                                    <li>What different spaces can be used and how?</li>
                                    <li>If the space is for an event, what type of event works best?</li>
                                </ul>
                                <p className="text-sm font-semibold pb-2">Do not include:</p>
                                <ul className="list-disc list-inside text-sm text-gray-800">
                                    <li><b>Contact information:</b> Do not include phone number, email, website, or links</li>
                                </ul>
                            </div>
                            <textarea
                                {...register('spaceDescription')}
                                placeholder="Enter your space description"
                                className="w-full mt-4 p-3 border rounded min-h-[150px] placeholder:text-sm"
                            />
                            {errors.spaceDescription && (
                                <p className="text-red-500 text-sm mt-2">{errors.spaceDescription.message}</p>
                            )}
                            <p className="text-sm text-gray-600 mt-2 text-right mb-12">Minimum 350 characters</p>
                        </div>

                        <hr className="border-t border-gray-200 my-12" />
                        <div>
                            <h2 className="text-3xl font-extrabold mb-4 pt-4 mt-16">How big is the space guests can book?</h2>
                            <p className="text-sm text-gray-800 mb-4">Please only indicate the size of the space guests can use during their booking.</p>
                            <div className='flex flex-row mb-2'>
                                <div className="rounded-none text-md border-r-0 border w-1/5 h-10">
                                    <input
                                        {...register('bookingSize')}
                                        className='w-full h-full p-4 placeholder:text-sm'
                                        placeholder='500'
                                        type='number'
                                    />
                                </div>
                                <div className="rounded-none text-sm p-4 text-gray-600 border h-10 flex items-center">sqft</div>
                            </div>
                            {errors.bookingSize && (
                                <p className="text-red-500 text-sm mb-16">{errors.bookingSize.message}</p>
                            )}
                        </div>

                        <hr className="border-t border-gray-200 my-12" />
                        <div>
                            <h2 className="text-3xl font-extrabold mb-4 mt-16">What are your house rules?</h2>
                            <p className="text-sm text-gray-800 mb-4">Specify what guests can and cannot do in the space.</p>
                            <div className="space-y-2">
                                <p className="text-sm font-bold mb-4">Examples include:</p>
                                <ul className="list-disc flex flex-col gap-2 pb-6 list-inside text-sm text-gray-700">
                                    <li>No smoking in the building</li>
                                    <li>Alcohol catering is allowed</li>
                                    <li>No outside catering</li>
                                </ul>
                                <p className="text-sm font-semibold mt-2 pb-2">Do not include:</p>
                                <ul className="list-disc flex flex-col gap-2 pb-6 list-inside text-sm text-gray-700">
                                    <li>Pricing information or rental rates</li>
                                    <li>Cancellation policies or liability policies</li>
                                </ul>
                            </div>
                            <textarea
                                {...register('houseRules')}
                                placeholder="Enter your house rules"
                                className="w-full mt-4 p-4 border rounded min-h-[150px]"
                            />
                            {errors.houseRules && (
                                <p className="text-red-500 text-sm mt-2">{errors.houseRules.message}</p>
                            )}
                            <p className="text-sm text-gray-600 mt-2 text-right mb-16">Minimum 100 characters</p>
                        </div>

                        <hr className="border-t border-gray-200 my-12" />
                        <div>
                            <h2 className="text-3xl font-extrabold mb-4 mt-16">Who's allowed in your space?</h2>
                            <p className="text-sm text-gray-800 mb-12">Typically, only venues that have alcohol have age requirements.</p>
                            <div className="flex items-center mb-2">
                                <Input
                                    {...register('allowedGuests')}
                                    placeholder="All ages"
                                    className="w-5/6 h-12"
                                />
                            </div>
                            {errors.allowedGuests && (
                                <p className="text-red-500 text-sm mb-16">{errors.allowedGuests.message}</p>
                            )}
                        </div>

                        <hr className="border-t border-gray-200 my-12" />
                        <div>
                            <h2 className="text-3xl font-extrabold mb-4 mt-16">What's your wifi name and password?</h2>
                            <p className="text-sm text-gray-800 mb-10">Make it easy for your guests to get online by sharing wifi information.</p>
                            <div className="space-y-4 mb-2">
                                <Input
                                    {...register('wifiName')}
                                    placeholder="Wifi name"
                                    className="w-full h-12"
                                />
                                {errors.wifiName && (
                                    <p className="text-red-500 text-sm">{errors.wifiName.message}</p>
                                )}
                            </div>
                            <div className="space-y-4 mb-2">
                                <Input
                                    {...register('wifiPassword')}
                                    type="password"
                                    placeholder="Wifi password"
                                    className="w-full h-12"
                                />
                                {errors.wifiPassword && (
                                    <p className="text-red-500 text-sm">{errors.wifiPassword.message}</p>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 mb-16">
                                🔒 Don't worry, we'll only share wifi info after your space has been booked.
                            </p>
                        </div>

                        <hr className="border-t border-gray-200 my-12" />
                        <div>
                            <h2 className="text-3xl font-extrabold mb-4">Provide arrival instructions</h2>
                            <p className="text-sm text-gray-800 mb-8">Help your guests and others attending find and enter your space.</p>
                            <div className="space-y-2">
                                <p className="text-sm font-bold pb-2">Try to include:</p>
                                <ul className="list-disc list-inside text-sm text-gray-800 pb-2">
                                    <li>Directions to your space, building access, door numbers, stairs/elevator access, etc.</li>
                                </ul>
                            </div>
                            <textarea
                                {...register('arrivalInstructions')}
                                placeholder="Example: We are located on the 3rd floor of the Harborview building. Take the elevator to the 3rd floor, turn right, and we are the first door on the left."
                                className="w-full mt-4 mb-4 p-4 border rounded min-h-[150px] placeholder:text-sm placeholder:pb-12"
                            />
                            {errors.arrivalInstructions && (
                                <p className="text-red-500 text-sm mt-2">{errors.arrivalInstructions.message}</p>
                            )}
                            <p className="text-sm text-gray-600 mt-2 text-left mb-8">
                                🔒 Don't worry, we'll only share these details after your space has been booked.
                            </p>
                        </div>

                        <hr className="border-t border-gray-200 mt-16 mb-10" />
                        <div className="w-full flex justify-between mb-16">
                            <Link href={`/becomeHost/spaceDetails/${listingId}`}>
                                <Button variant={"outline"} className="text-md font-semibold" >Back</Button>
                            </Link>
                            <Button
                                className="text-md font-semibold bg-[#8559EC] hover:bg-[#7248d1]"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </main >
    </>
};

