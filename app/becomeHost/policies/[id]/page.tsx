"use client"
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { createPolicy } from "@/app/actions/policies";
import { fetchListingsToEdit } from "@/app/actions/fetchListingToEdit";
import { Listing } from "@prisma/client";

interface PolicyItem {
    name: string;
    detail: string;
}

const policyFormSchema = z.object({
    policiesAccepted: z.boolean().refine((value) => value === true, {
        message: "You must agree to all policies to continue.",
    }),
});

export type PolicyFormValues = z.infer<typeof policyFormSchema>;

export default function Policy({ params }: { params: { id: string } }) {
    const listingId = params.id;
    const router = useRouter();
    const policies: PolicyItem[] = [
        {
            name: "Keep conversations on ShareSpace",
            detail: "Keep conversations with guests on the platform so everyone knows what was agreed to.",
        },
        {
            name: "Use ShareSpace to process payments",
            detail: "All payments must be processed on ShareSpace and honor our service fee. All payouts will be made via direct deposit to your bank account.",
        },
        {
            name: "Follow the booking, cancellation, and overtime policies",
            detail: "All bookings are covered by the ShareSpace Services Agreement. Contracts that conflict with these policies are not allowed.",
        },
        {
            name: "Make sure my space meets local regulations",
            detail: "Follow local regulations to ensure the safety of your guests, yourself, and your space.",
        },
    ];

    const form = useForm<PolicyFormValues>({
        resolver: zodResolver(policyFormSchema),
        defaultValues: {
            policiesAccepted: false,
        },
    }); useEffect(() => {
        async function getListingsToEdit() {
            try {
                if (listingId !== 'new') {
                    const listingData = await fetchListingsToEdit(listingId) as Listing;
                    console.log("Listing Data", listingData);
                   form.reset({
                        policiesAccepted: listingData?.agreesToPolicies || false,
                    })
                }
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
        }
        getListingsToEdit();
    }, [listingId, form.reset])
    async function onSubmit(data: PolicyFormValues) {
        try {
            await createPolicy(data, listingId);
            router.push(`/becomeHost/showListing/${listingId}`);
        } catch (error) {
            console.error('error submitting form:', error);
        }
    }

    return (
        <>
            <nav className={"w-full z-50 transition-all duration-300 fixed top-0 bg-black/90"}>
                <div className="flex items-center justify-between px-6 py-2 mx-auto">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
                    </Link>
                    <span className="text-white text-lg mr-10 font-medium">Address</span>
                </div>
            </nav>
            <main>
                <div className="w-[58%] pt-32 flex-col flex mx-auto">
                    <Form {...form}>
                        <form className="space-y-8">
                            <div className="flex flex-col space-y-4 w-full">
                                <h1 className="text-3xl font-bold">
                                    Please review the following ShareSpace policies
                                </h1>
                                <span className="text-sm text-gray-800">
                                    I agree and understand that as a ShareSpace host I am required to:
                                </span>

                                <div className="space-y-4">
                                    {policies.map((policy, index) => (
                                        <div key={index} className="flex flex-col">
                                            <div className="flex items-center ">
                                                <span className="font-bold">{policy.name}</span>
                                            </div>
                                            <span className="text-sm text-gray-500  pb-4 w-2/3">
                                                {policy.detail}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <FormField
                                    control={form.control}
                                    name="policiesAccepted"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                                            <FormControl>
                                                <Checkbox
                                                    className="border-gray-300"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    I agree to all of the above policies
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <hr className="border-t border-gray-200 mt-16 mb-10" />
                                <div className="w-full flex justify-between mb-16">
                                    <Link href={`/becomeHost/cancellationPolicy/${listingId}`}>
                                        <Button
                                            type="button"
                                            variant={"outline"}
                                            className="text-md font-semibold"
                                        >
                                            Back
                                        </Button>
                                    </Link>
                                    <Button
                                        className="text-md font-semibold bg-[#8559EC] hover:bg-[#7248d1]"
                                        onClick={form.handleSubmit(onSubmit)}
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </main>
        </>
    );
}
