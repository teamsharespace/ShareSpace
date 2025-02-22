"use client"

import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createAddress } from '@/app/actions/address';
import { useRouter } from 'next/navigation';

const addressSchema = z.object({
    country: z.string(),
    address: z.string().min(1, "Address is required"),
    landmark: z.string().min(1, "Landmark is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.number()
        .int("Pincode must be a whole number")
        .min(100000, "Pincode must be 6 digits")
        .max(999999, "Pincode must be 6 digits")
});

export type FormAddress = z.infer<typeof addressSchema>;

const CreateAddress = ({ params }: {
    params: { id: string }
}) => {
    const listingId = params.id;
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormAddress>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            country: 'India',
            address: '',
            landmark: '',
            city: '',
            state: '',
            pincode: undefined,
        }
    });

    async function onSubmit(data: FormAddress) {
        try {
            const newListingId = await createAddress(data,listingId) as string;
            router.push(`/becomeHost/spaceDetails/${newListingId}`)
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <>
            <nav className="w-full z-50 transition-all duration-300 fixed top-0 bg-black/90">
                <div className="flex items-center justify-between px-6 py-2 mx-auto">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
                    </Link>
                    <span className="text-white text-lg mr-10 font-medium">Address</span>
                </div>
            </nav>
            <main>
                <div className="w-[58%] pt-32 flex-col flex mx-auto">
                    <div className="flex flex-col space-y-4 w-full">
                        <span className="font-extrabold text-3xl">Space Address</span>
                        <span className="font-light text-md">
                            Your space's address will not be displayed publicly on your Peerspace listing.
                            It will only be shared with a guest after they book the space
                        </span>
                        <hr className="border-t border-gray-200 my-10" />
                    </div>

                    <form className="mt-16 space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col w-2/3 space-y-1.5">
                                <Label htmlFor="country" className="font-bold text-sm text-gray-700">
                                    Country
                                </Label>
                                <Input
                                    id="country"
                                    {...register('country')}
                                    className="placeholder:text-md placeholder:text-gray-600 border-gray-300 placeholder:font-medium"
                                    placeholder="India"
                                    disabled={true}
                                />
                            </div>

                            <div className="flex flex-col w-2/3 space-y-1.5"></div>

                            <div className="flex flex-col w-2/3 space-y-1.5">
                                <Label htmlFor="address" className="font-bold text-sm text-gray-700">
                                    Address *
                                </Label>
                                <Input
                                    id="address"
                                    {...register('address')}
                                    className="placeholder:text-md placeholder:font-medium"
                                    placeholder="Chandansar"
                                />
                                {errors.address && (
                                    <span className="text-sm text-red-500">{errors.address.message}</span>
                                )}
                            </div>

                            <div className="flex flex-col w-2/3 space-y-1.5">
                                <Label htmlFor="landmark" className="font-bold text-sm text-gray-700">
                                    Landmark *
                                </Label>
                                <Input
                                    id="landmark"
                                    {...register('landmark')}
                                    className="placeholder:text-md placeholder:font-medium"
                                    placeholder="Jivdani"
                                />
                                {errors.landmark && (
                                    <span className="text-sm text-red-500">{errors.landmark.message}</span>
                                )}
                            </div>

                            <div className="flex flex-col w-2/3 space-y-1.5">
                                <Label htmlFor="city" className="font-bold text-sm text-gray-700">
                                    City *
                                </Label>
                                <Input
                                    id="city"
                                    {...register('city')}
                                    className="placeholder:text-md placeholder:font-medium"
                                    placeholder="Virar"
                                />
                                {errors.city && (
                                    <span className="text-sm text-red-500">{errors.city.message}</span>
                                )}
                            </div>

                            <div className="flex flex-col w-2/3 space-y-1.5">
                                <Label htmlFor="state" className="font-bold text-sm text-gray-700">
                                    State *
                                </Label>
                                <Input
                                    id="state"
                                    {...register('state')}
                                    className="placeholder:text-md placeholder:font-medium"
                                    placeholder="Maharashtra"
                                />
                                {errors.state && (
                                    <span className="text-sm text-red-500">{errors.state.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col w-1/3 space-y-1.5">
                            <Label htmlFor="pincode" className="font-bold text-sm text-gray-700">
                                Pincode *
                            </Label>
                            <Input
                                id="pincode"
                                type="number"
                                {...register('pincode', { valueAsNumber: true })}
                                className="placeholder:text-md placeholder:font-medium"
                                placeholder="401305"
                            />
                            {errors.pincode && (
                                <span className="text-sm text-red-500">{errors.pincode.message}</span>
                            )}
                        </div>

                        <hr className="border-t border-gray-200 mt-16 mb-10" />
                        <div className="w-full flex justify-between mb-16">
                            <Link href={`/becomeHost/createSpace/${listingId}`}>
                                <Button variant="outline" className="text-md font-semibold">Back</Button>
                            </Link>
                            <Button
                                className="text-md font-semibold bg-[#8559EC] hover:bg-[#7248d1]"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Next
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default CreateAddress;

