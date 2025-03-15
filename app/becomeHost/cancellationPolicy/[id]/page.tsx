"use client"
import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod"; import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createCancellationPolicy } from '@/app/actions/cancellationPolicy';
import { fetchListingsToEdit } from '@/app/actions/fetchListingToEdit';
import { Listing } from '@prisma/client';
import { Loader2 } from 'lucide-react';

interface Policy {
    name: string;
    id: string,
    rules: string[];
}

const POLICIES: Policy[] = [
    {
        name: "Very Flexible",
        id: "VERY_FLEXIBLE",
        rules: [
            "Guests may cancel their Booking until 24 hours before the event start time and will receive a full refund (including all Fees) of their Booking Price.",
            "Bookings cancellations submitted less than 24 hours before the Event start time are not refundable."
        ]
    },
    {
        name: "Flexible",
        id: "FLEXIBLE",
        rules: [
            "Guests may cancel their Booking until 7 days before the event start time and will receive a full refund (including all Fees) of their Booking Price.",
            "Guests may cancel their Booking between 7 days and 24 hours before the event start time and receive a 50% refund (excluding Fees) of their Booking Price.",
            "Booking cancellations submitted less than 24 hours before the Event start time are not refundable."
        ]
    },
    {
        name: "Standard 30 day",
        id: "THIRTY_DAY",
        rules: [
            "Guests may cancel their Booking until 30 days before the event start time and will receive a full refund (including all Fees) of their Booking Price.",
            "Guests may cancel their Booking between 30 days and 7 days before the event start time and receive a 50% refund (excluding Fees) of their Booking Price.",
            "Cancellations submitted less than 7 days before the Event start time are not refundable."
        ]
    },
    {
        name: "Standard 90 day",
        id: "NINETY_DAY",
        rules: [
            "Guests may cancel their Booking until 90 days before the event start time and will receive a full refund (including all Fees) of their Booking Price.",
            "Guests may cancel their Booking between 90 days and 14 days before the event start time and receive a 50% refund (excluding Fees) of their Booking Price.",
            "Cancellations submitted less than 14 days before the Event start time are not refundable."
        ]
    }
];

const formSchema = z.object({
    cancellationPolicy: z.string({
        required_error: "Please select a cancellation policy",
    })
});

export type FormValues = z.infer<typeof formSchema>;

export default function CancellationPolicy({params}:{params:{id:string}}) {
    const listingId = params.id;
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();
    const {
        control,
        handleSubmit,
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cancellationPolicy: '',
        }
    });

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        //console.log(data);
        try {
            await createCancellationPolicy(data, listingId);
            router.push(`/becomeHost/activities/${listingId}`);
        } catch (error) {
            console.error('Error submitting form:', error);
        }finally{
            setIsSubmitting(false);
        }
    };
    useEffect(() => {
        async function getListingsToEdit() {
            try {
                if (listingId !== 'new') {
                    const listingData = await fetchListingsToEdit(listingId) as Listing;
                    console.log("cancellationPolicy: ", listingData.cancellationPolicy);
                    reset({
                        cancellationPolicy: listingData?.cancellationPolicy || ''
                    })
                }
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
        }
        getListingsToEdit();
    }, [listingId, reset])


    return <>
        <nav className={"w-full z-50 transition-all duration-300 fixed top-0 bg-black/90"}>
            <div className="flex items-center justify-between px-6 py-2 mx-auto">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
                </Link>
                <span className="text-white text-lg mr-10  font-medium">Cancellation Policy</span>
            </div>
        </nav>
        <main>
            <div className="w-[58%] pt-32 flex-col flex mx-auto ">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">Choose your Cancellation Policy</h1>
                        <p className="text-sm text-gray-800">
                            Hosts with more flexible cancellation policies attract more bookings.
                        </p>
                    </div>

                    <hr className="border-t border-gray-200" />

                    <p className="text-gray-800 text-sm">
                        <strong>Cancellation grace period:</strong> All Bookings are subject to ShareSpace's Grace Period
                        policy which provides a full refund for Bookings cancelled within 24 hours from receipt
                        of a Booking Confirmation but no later than 48 hours prior to the Event start time.
                    </p>

                    <form >
                        <Controller
                            name="cancellationPolicy"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    className="space-y-6"
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    {POLICIES.map((policy, index) => (
                                        <div key={index} className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem
                                                    value={policy.id}
                                                    id={`policy-${index}`}
                                                    className="border-gray-400"
                                                />
                                                <Label
                                                    htmlFor={`policy-${index}`}
                                                    className="font-bold text-sm"
                                                >
                                                    {policy.name}
                                                </Label>
                                            </div>
                                            <div className="ml-6 space-y-2">
                                                {policy.rules.map((rule, i) => (
                                                    <p
                                                        key={i}
                                                        className="text-sm text-gray-500"
                                                    >
                                                        {rule}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        />
                        <hr className="border-t border-gray-200 mt-16 mb-10" />
                        <div className="w-full flex justify-between mb-16">
                            <Link href={`/becomeHost/healthAndSafety/${listingId}`}>
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
            </div>
        </main>
    </>
};

