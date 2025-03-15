import { fetchProgress } from "@/app/actions/fetchProgress";
import { UserSession } from "@/app/actions/fetchUser";
import { NEXT_AUTH } from "@/app/lib/auth";
import { Button } from "@/components/ui/button";
import { ListingProgress } from "@prisma/client";
import { Check } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

type ButtonState = "edit" | "start" | "none";

export default async function CreateSpace({ params }: { params: { id: string } }) {
    const listingId = params.id;
    const progress = await fetchProgress(listingId) as ListingProgress;
    const session = await getServerSession(NEXT_AUTH) as UserSession;

    const title = [
        "Location",
        "Setup",
        "About your space",
        "Photos",
        "Availability",
        "Cleaning",
        "Cancellations",
        "Activities",
        "Policies"
    ]
    const sections: Array<keyof ListingProgress> = [
        "addressCompleted",
        "spaceDetailsCompleted",
        "typeOfSpaceCompleted",
        "photosCompleted",
        "operatingHoursCompleted",
        "healthSafetyCompleted",
        "cancellationPolicyCompleted",
        "activityCompleted",
        "policiesCompleted"
    ];
    const path = [
        "address",
        "spaceDetails",
        "typeOfSpace",
        "uploadPhotos",
        "operatingHours",
        "healthAndSafety",
        "cancellationPolicy",
        "activities",
        "policies",
   ]

    const completedSections = sections.filter(section => progress?.[section]).length;
    const progressPercentage = (completedSections / sections.length) * 100;

    const shouldShowButton = (currentSection: keyof ListingProgress): ButtonState => {
        if (progress?.[currentSection]) return "edit";

        const currentIndex = sections.indexOf(currentSection);
        const previousSections = sections.slice(0, currentIndex);

        if (previousSections.every(section => progress?.[section])) {
            return "start";
        }

        return "none";
    };

    const renderButton = (section: keyof ListingProgress, path: string) => {
        const buttonState = shouldShowButton(section);
        if (buttonState === "none") return null;

        return (
            <Link href={`/becomeHost/${path}/${listingId}`}>
                <Button
                    className={`w-24 h-12 rounded-none ${buttonState === "edit" ? "text-[#8559EC]" : "bg-[#8559EC]"} font-bold`}
                    variant={buttonState === "edit" ? "outline" : "default"}
                >
                    {buttonState === "edit" ? "Edit" : "Start"}
                </Button>
            </Link>
        );
    };

    const renderSection = (
        number: number,
        title: string,
        description: string,
        section: keyof ListingProgress,
        path: string
    ) => (
        <>
            <div className="flex flex-row border-t-1 items-center justify-between">
                <div className="flex flex-row items-center gap-4">
                    {progress?.[section] ? (
                        <div className="w-5 h-5 rounded-full bg-[#3CB78B] flex items-center justify-center">
                            <Check size={12} strokeWidth={4} className="text-white" />
                        </div>
                    ) : (
                        <div className="w-5 h-5 border-2 rounded-full"></div>
                    )}
                    <div className="flex flex-col">
                        <span className="font-semibold">{number}. {title}</span>
                        <span className="text-gray-600 text-sm">{description}</span>
                    </div>
                </div>
                {renderButton(section, path)}
            </div>
            <hr className="border-t border-gray-200 mt-6 mb-6" />
        </>
    );

    return (
        <>
            <nav className={"w-full z-50 transition-all duration-300 fixed top-0 bg-black/90"}>
                <div className="flex items-center justify-between px-6 py-2 mx-auto">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-4xl font-bold text-white p-3">SpaceShare</span>
                    </Link>
                </div>
            </nav>
            <main>
                <div className="w-[58%] pt-24 flex-col flex mx-auto">
                    <div className="flex flex-row items-center gap-4 w-full my-4 pb-6">
                        <Progress value={progressPercentage} className="rounded-none h-2 bg-gray-200 [&>div]:bg-[#8559EC]" />
                        <span className="text-sm text-green-500 font-bold">{progressPercentage}%</span>
                    </div>
                    <span className="font-bold text-3xl pb-4">
                        {session?.user?.name}, tell us about your space.
                    </span>
                    <span className="text-gray-600">
                        The more you share, the faster you can get a booking.
                    </span>
                    <hr className="border-t border-gray-200 mt-6 mb-6" />

                    {sections.map((section, index) =>
                        renderSection(
                            index + 1,
                            title[index],
                            "Fill out this section",
                            section,
                            path[index],
                        )
                    )}
                </div>
            </main>
        </>
    );
}

