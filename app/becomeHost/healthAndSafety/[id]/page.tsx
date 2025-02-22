"use client"
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createHealthAndSafety } from '@/app/actions/healthAndSafety';

const CLEANING_MEASURE_MAP = {
    'cleaning-1': 'GUIDELINES_COMPLIANCE',
    'cleaning-2': 'HIGH_TOUCH_DISINFECTION',
    'cleaning-3': 'POROUS_MATERIALS_CLEANED',
    'cleaning-4': 'PROFESSIONAL_CLEANER',
    'cleaning-5': 'SPACED_BOOKINGS',
};

const PROTECTIVE_GEAR_MAP = {
    'gear-1': 'DISINFECTING_WIPES',
    'gear-2': 'DISPOSABLE_GLOVES',
    'gear-3': 'DISPOSABLE_MASKS',
    'gear-4': 'HAND_SANITIZER',
};

const DISTANCE_MEASURE_MAP = {
    'distance-1': 'LIMITED_CAPACITY',
    'distance-2': 'OUTDOOR_VENTILATION',
    'distance-3': 'HEPA_AIR_FILTERS',
    'distance-4': 'OUTDOOR_SPACE',
    'distance-5': 'RECONFIGURED_SPACE',
};

const COVID_SIGNAGE_MAP = {
    'signage-1': 'CLEANING_CHECKLIST',
    'signage-2': 'COVID_GUIDELINES',
    'signage-3': 'DISTANCE_MARKERS',
    'signage-4': 'DIRECTIONAL_ARROWS',
};

interface CheckboxOption {
    id: string;
    label: string;
}

interface QuestionGroup {
    question: string;
    description?: string;
    options: CheckboxOption[];
    key: string;
}

const CLEANING_QUESTIONS: QuestionGroup[] = [
    {
        key: 'cleaning',
        question: "What additional measures are you taking to keep your space clean?",
        description: "Select all that apply",
        options: [
            {
                id: "cleaning-1",
                label: "The space is cleaned and disinfected in accordance with guidelines from local health authorities"
            },
            {
                id: "cleaning-2",
                label: "High touch surfaces and shared amenities have been disinfected"
            },
            {
                id: "cleaning-3",
                label: "Soft, porous materials have been properly cleaned or removed"
            },
            {
                id: "cleaning-4",
                label: "A licensed professional cleaner is hired between bookings"
            },
            {
                id: "cleaning-5",
                label: "Bookings are spaced apart to allow for enhanced cleaning"
            }
        ]
    },
    {
        key: 'protective_gear',
        question: "What additional protective gear do you provide to your guests?",
        description: "Select all that apply",
        options: [
            {
                id: "gear-1",
                label: "Disinfecting wipes or spray and paper towels"
            },
            {
                id: "gear-2",
                label: "Disposable gloves"
            },
            {
                id: "gear-3",
                label: "Disposable masks / face coverings"
            },
            {
                id: "gear-4",
                label: "Hand Sanitizer"
            }
        ]
    },
    {
        key: 'physical_distance',
        question: "What have you done to help guests maintain physical distance in your space?",
        description: "Select all that apply",
        options: [
            {
                id: "distance-1",
                label: "Capacity is limited based on governmental guidelines"
            },
            {
                id: "distance-2",
                label: "Space has access to outdoor air ventilation"
            },
            {
                id: "distance-3",
                label: "Space has HEPA-certified air filters"
            },
            {
                id: "distance-4",
                label: "Space has additional space outdoors"
            },
            {
                id: "distance-5",
                label: "Space has been reconfigured to allow for physical distance"
            }
        ]
    },
    {
        key: 'signage',
        question: "What signage have you added to keep your guests informed?",
        description: "Select all that apply",
        options: [
            {
                id: "signage-1",
                label: "Detailed checklist of updated cleaning procedure"
            },
            {
                id: "signage-2",
                label: "COVID-19 guest guidelines print outs"
            },
            {
                id: "signage-3",
                label: "Common areas have 6-foot (2-metre) markers on floors"
            },
            {
                id: "signage-4",
                label: "Narrow passages have arrows for bi-directional traffic"
            }
        ]
    }
];

const createQuestionSchema = (options: CheckboxOption[]) => {
    const optionRecord: Record<string, z.ZodBoolean> = {};
    options.forEach(option => {
        optionRecord[option.id] = z.boolean();
    });
    return z.object(optionRecord);
};

const formSchema = z.object({
    cleaning: createQuestionSchema(CLEANING_QUESTIONS[0].options)
        .refine((data) => Object.values(data).some(Boolean), {
            message: "Select at least one cleaning measure",
        }),
    protective_gear: createQuestionSchema(CLEANING_QUESTIONS[1].options)
        .refine((data) => Object.values(data).some(Boolean), {
            message: "Select at least one protective gear option",
        }),
    physical_distance: createQuestionSchema(CLEANING_QUESTIONS[2].options)
        .refine((data) => Object.values(data).some(Boolean), {
            message: "Select at least one physical distance measure",
        }),
    signage: createQuestionSchema(CLEANING_QUESTIONS[3].options)
        .refine((data) => Object.values(data).some(Boolean), {
            message: "Select at least one signage option",
        }),
});

export type FormValues = z.infer<typeof formSchema>;

function transformFormDataForPrisma(data: FormValues) {
    // Extract selected options for each category
    const cleaningMeasures = Object.entries(data.cleaning)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => CLEANING_MEASURE_MAP[id as keyof typeof CLEANING_MEASURE_MAP]);

    const protectiveGear = Object.entries(data.protective_gear)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => PROTECTIVE_GEAR_MAP[id as keyof typeof PROTECTIVE_GEAR_MAP]);

    const distanceMeasures = Object.entries(data.physical_distance)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => DISTANCE_MEASURE_MAP[id as keyof typeof DISTANCE_MEASURE_MAP]);

    const covidSignage = Object.entries(data.signage)
        .filter(([_, isSelected]) => isSelected)
        .map(([id]) => COVID_SIGNAGE_MAP[id as keyof typeof COVID_SIGNAGE_MAP]);

    return {
        cleaningMeasures,
        protectiveGear,
        distanceMeasures,
        covidSignage,
        agreesToPolicies: true
    };
}

interface CheckboxQuestionGroupProps {
    question: string;
    description?: string;
    options: CheckboxOption[];
    control: any;
    name: string;
    error?: string;
}

const CheckboxQuestionGroup: React.FC<CheckboxQuestionGroupProps> = ({
    question,
    description,
    options,
    control,
    name,
    error
}) => {
    return (
        <div className="flex flex-col space-y-4">
            <span className="text-lg font-medium">{question}</span>
            {description && (
                <span className="text-sm text-gray-400">{description}</span>
            )}
            {options.map((option) => (
                <Controller
                    key={option.id}
                    name={`${name}.${option.id}`}
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox
                                id={option.id}
                                className="border-gray-400"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <span className="text-sm text-gray-800">{option.label}</span>
                        </div>
                    )}
                />
            ))}
            {error && (
                <span className="text-sm text-red-500">{error}</span>
            )}
        </div>
    );
};

export default function Cleaning({ params }: { params: { id: string } }) {
    const listingId = params.id;
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: CLEANING_QUESTIONS.reduce((acc, question) => ({
            ...acc,
            [question.key]: question.options.reduce((optAcc, opt) => ({
                ...optAcc,
                [opt.id]: false
            }), {})
        }), {} as FormValues)
    });

    async function onSubmit(data: FormValues) {
        try {
            const transformedData = transformFormDataForPrisma(data);
            const result = await createHealthAndSafety(transformedData, listingId);

            if (result?.error) {
                console.error("Error submitting form:", result.error);
                return;
            }
            router.push(`/becomeHost/cancellationPolicy/${listingId}`);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return <>
        <nav className={"w-full z-50 transition-all duration-300 fixed top-0 bg-black/90"}>
            <div className="flex items-center justify-between px-6 py-2 mx-auto">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
                </Link>
                <span className="text-white text-lg mr-10 font-medium">Health and Safety</span>
            </div>
        </nav>
        <main>
            <div className="w-[58%] pt-32 flex-col flex mx-auto ">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col space-y-4 w-full">
                        <h1 className="text-3xl font-bold">Enhanced Health and Safety Measures</h1>
                        <span className="text-sm text-gray-800 pb-4">
                            Fill out the form to add your cleaning protocol and additional health and safety measures to your listing page.
                        </span>
                        <span className="text-xl font-medium pb-4">Enhanced Health and Safety Measures</span>
                        <span className="text-sm text-gray-800">
                            Select <b>at least 1</b> from each category below to earn the Enhanced Health and Safety Measures badge. This badge will be displayed on your listings.
                        </span>
                    </div>

                    <hr className="border-t border-gray-200 my-12" />

                    <div className="space-y-12">
                        {CLEANING_QUESTIONS.map((questionData, index) => (
                            <div key={`question-${index}`}>
                                <CheckboxQuestionGroup
                                    {...questionData}
                                    control={control}
                                    name={questionData.key}
                                />
                                {index < CLEANING_QUESTIONS.length - 1 && (
                                    <hr className="border-t border-gray-200 my-12" />
                                )}
                            </div>
                        ))}
                    </div>

                    <hr className="border-t border-gray-200 mt-16 mb-10" />
                    <div className="w-full flex justify-between mb-16">
                        <Link href={`/becomeHost/operatingHours/${listingId}`}>
                            <Button variant={"outline"} className="text-md font-semibold" type="button">Back</Button>
                        </Link>
                        <Button
                            className="text-md font-semibold bg-[#8559EC] hover:bg-[#7349dc]"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Next'}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    </>
};

