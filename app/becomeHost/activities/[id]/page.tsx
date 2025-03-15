"use client"
import Events from "@/components/activities/events";
import MediaProductions from "@/components/activities/mediaProductions";
import Meeting from "@/components/activities/meeting";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormProvider } from "react-hook-form";
import { ActivitiesSchema, useActivitiesForm, } from "@/app/hooks/useActivitiesForm";
import createActivity from "@/app/actions/createActivity";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";


export default function Activities({ params }: { params: { id: string } }) {
    const listingId = params.id;
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();
    const formProps = useActivitiesForm();
    const { handleSubmit, formState: { errors } } = formProps;
    const onSubmit = async (data: ActivitiesSchema) => {
        setIsSubmitting(true);
        try {
            await createActivity(data, listingId);
            router.push(`/becomeHost/policies/${listingId}`);
        } catch (error) {
            console.error("Error submitting form: ", error);
        } finally {
            setIsSubmitting(false);
        }
        console.log(data)
    }
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
                <span className="text-gray-800 text-sm w-2/3 pb-4">Select the types of activities you would like to host. For each selection, we’ll create a customized listing unique to that activity.</span>
                <FormProvider {...formProps}>
                    <div className="gap-4 flex flex-row w-full">
                        <div className="w-full">
                            <Meeting />
                        </div>
                        <div className="w-full">
                            <Events />
                        </div>
                        <div className="w-full">
                            <MediaProductions />
                        </div>
                    </div>
                </FormProvider>
                {errors.meeting?.message && (
                    <span className="text-red-500 bg-red-50 p-6 mt-4 -mb-10 font-medium text-lg text-center">{errors.meeting.message}</span>
                )}
                <hr className="border-t border-gray-200 mt-16 mb-10" />
                <div className="w-full flex justify-between mb-16">
                    <Link href={`/becomeHost/cancellationPolicy/${listingId}`}>
                        <Button variant="outline" className="text-md font-semibold">Back</Button>
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
            </div>
        </main>

    </>
}

