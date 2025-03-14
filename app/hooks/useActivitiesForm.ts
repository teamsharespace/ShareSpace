"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export enum Amenities {
    WIFI = "WiFi",
    TABLES = "Tables",
    CHAIRS = "Chairs",
    WHITEBOARD = "Whiteboard",
    CHALKBOARD = "Chalkboard",
    PROJECTOR = "Projector",
    SCREEN = "Screen",
    FLIP_CHARTS = "Flip Charts",
    MONITOR = "Monitor",
    CONFERENCEPHONE = "Conference Phone",
    PARKINGSPACES = "Parking Space(s)",
    PUBLICTRANSPORTATION = "Public Transportation",
    RESTROOMS = "Restrooms",
    WHEELCHAIRACCESSIBLE = "Wheelchair Accessible",
    BREAKOUTSPACE = "Breakout Space",
    KITCHEN = "Kitchen",
    COFFEE = "Coffee",
    APPLETV = "Apple TV",
    PRINTER = "Printer",
    ROOFTOP = "Rooftop",
    OUTDOORAREA = "Outdoor Area",
};

export enum CleaningRate {
    INCLUDED = "Included",
    ADDITIONAL = "Additional",
}

export enum Booking {
    EVERYONE = "Everyone",
    NONE = "None",
}
const meetingSchema = z.discriminatedUnion('enabled', [
    z.object({
        enabled: z.literal(false),
        hourlyRate: z.union([
            z.number()
                .int()
                .positive()
                .min(1),
            z.nan()
        ]).optional(),
        minimumHours: z.union([
            z.number()
                .int()
                .positive()
                .min(1),
            z.nan()
        ]).optional(),
        discount: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 percent")
                .max(80, "Must be under 80 percent"),
            z.nan()
        ]).optional(),
        cleaningRate: z.nativeEnum(CleaningRate).optional(),
        additionalFee: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 Rs."),
            z.nan()
        ]).optional(),
        instantBooking: z.nativeEnum(Booking).optional(),
        amenities: z.array(z.nativeEnum(Amenities)).optional(),
        capacity: z.union([
            z.number()
                .int()
                .positive()
                .min(1),
            z.nan()
        ]).optional(),
        customAmenities: z.array(z.string()).optional(),
    }),

    z.object({
        enabled: z.literal(true),
        hourlyRate: z.number({
            required_error: "Hourly Rate is required",
            invalid_type_error: "Hourly Rate should be a number"
        })
            .min(100, "Hourly Rate Should be more than 100 Rs"),
        minimumHours: z.number({
            required_error: "Minimum Hours is required",
            invalid_type_error: "Minimum Hours should be a number"
        })
            .min(1, "Must be more than 1 hour")
            .max(12, "Must be less than 12 hours"),
        discount: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 percent")
                .max(80, "Must be under 80 percent"),
            z.nan()
        ]).optional(),
        cleaningRate: z.nativeEnum(CleaningRate, {
            errorMap: () => ({ message: "Select one option" }),
        }),
        additionalFee: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 Rs."),
            z.nan()
        ]).optional(),
        instantBooking: z.nativeEnum(Booking, {
            errorMap: () => ({ message: "Select one option" }),
        }),
        amenities: z.array(z.nativeEnum(Amenities)).refine(
            (amenities) => [Amenities.WIFI, Amenities.TABLES, Amenities.CHAIRS].every((req) => amenities.includes(req)),
            { message: "WiFi, Tables, and Chairs must be selected" }
        ),
        capacity: z.number({
            required_error: "Capacity is required",
            invalid_type_error: "Capacity should be a number",
        }),
        customAmenities: z.array(z.string()).optional(),
    })
])
    .refine((data) => {
        if (data.enabled && data.cleaningRate === CleaningRate.ADDITIONAL) {
            return typeof data.additionalFee === 'number' && !isNaN(data.additionalFee) && data.additionalFee > 0;
        }
        return true;
    }, {
        message: "Additional Fee is required",
        path: ["additionalFee"],
    });

const mediaSchema = z.discriminatedUnion('enabled', [
    z.object({
        enabled: z.literal(false),
        hourlyRate: z.union([
            z.number()
                .int()
                .positive()
                .min(1),
            z.nan()
        ]).optional(),
        minimumHours: z.union([
            z.number()
                .int()
                .positive()
                .min(1),
            z.nan()
        ]).optional(),
        discount: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 percent")
                .max(80, "Must be under 80 percent"),
            z.nan()
        ]).optional(),
        cleaningRate: z.nativeEnum(CleaningRate).optional(),
        additionalFee: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 Rs."),
            z.nan()
        ]).optional(),
        instantBooking: z.nativeEnum(Booking).optional(),
        amenities: z.array(z.nativeEnum(Amenities)).optional(),
        capacity: z.union([
            z.number()
                .int()
                .positive()
                .min(1),
            z.nan()
        ]).optional(),
        customAmenities: z.array(z.string()).optional(),
    }),

    z.object({
        enabled: z.literal(true),
        hourlyRate: z.number({
            required_error: "Hourly Rate is required",
            invalid_type_error: "Hourly Rate should be a number"
        })
            .min(100, "Hourly Rate Should be more than 100 Rs"),
        minimumHours: z.number({
            required_error: "Minimum Hours is required",
            invalid_type_error: "Minimum Hours should be a number"
        })
            .min(1, "Must be more than 1 hour")
            .max(12, "Must be less than 12 hours"),
        discount: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 percent")
                .max(80, "Must be under 80 percent"), z.nan()]).optional(),
        cleaningRate: z.nativeEnum(CleaningRate, {
            errorMap: () => ({ message: "Select one option" }),
        }),
        additionalFee: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 Rs."), z.nan()]),
        instantBooking: z.nativeEnum(Booking, {
            errorMap: () => ({ message: "Select one option" }),
        }),
        amenities: z.array(z.nativeEnum(Amenities)).min(1, "Select atleast one amenity"),
        capacity: z.number({
            required_error: "Capacity is required",
            invalid_type_error: "Capacity should be a number",
        }),
        customAmenities: z.array(z.string()).optional(),
    })
])
    .refine((data) => {
        if (data.cleaningRate === CleaningRate.ADDITIONAL) {
            return typeof data.additionalFee === 'number' && !isNaN(data.additionalFee) && data.additionalFee > 0;
        }
        return true;
    }, {
        message: "Additional Fee is required",
        path: ["additionalFee"],
    });

const eventSchema = z.discriminatedUnion('enabled', [
    z.object({
        enabled: z.literal(false),
        hourlyRate: z.union([
            z.number()
                .int()
                .positive()
                .min(1),
            z.nan()
        ]).optional(),
        minimumHours: z.union([
            z.number()
                .int()
                .positive()
                .min(1),
            z.nan()
        ]).optional(),
        discount: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 percent")
                .max(80, "Must be under 80 percent"),
            z.nan()
        ]).optional(),
        cleaningRate: z.nativeEnum(CleaningRate).optional(),
        additionalFee: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 Rs."),
            z.nan()
        ]).optional(),
        instantBooking: z.nativeEnum(Booking).optional(),
        amenities: z.array(z.nativeEnum(Amenities)).optional(),
        capacity: z.union([
            z.number()
                .int()
                .positive()
                .min(1),
            z.nan()
        ]).optional(),
        customAmenities: z.array(z.string()).optional(),
    }),

    z.object({
        enabled: z.literal(true),
        hourlyRate: z.number({
            required_error: "Hourly Rate is required",
            invalid_type_error: "Hourly Rate should be a number"
        })
            .min(100, "Hourly Rate Should be more than 100 Rs"),
        minimumHours: z.number({
            required_error: "Minimum Hours is required",
            invalid_type_error: "Minimum Hours should be a number"
        })
            .min(1, "Must be more than 1 hour")
            .max(12, "Must be less than 12 hours"),
        discount: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 percent")
                .max(80, "Must be under 80 percent"), z.nan()]).optional(),
        cleaningRate: z.nativeEnum(CleaningRate, {
            errorMap: () => ({ message: "Select one option" }),
        }),
        additionalFee: z.union([
            z.number()
                .int()
                .positive()
                .min(1, "Must be more than 1 Rs."), z.nan()]),
        instantBooking: z.nativeEnum(Booking, {
            errorMap: () => ({ message: "Select one option" }),
        }),
        amenities: z.array(z.nativeEnum(Amenities)).min(1, "Select alteast one Amenity"),
        capacity: z.number({
            required_error: "Capacity is required",
            invalid_type_error: "Capacity should be a number",
        }),
        customAmenities: z.array(z.string()).optional(),
    })
])
    .refine((data) => {
        if (data.cleaningRate === CleaningRate.ADDITIONAL) {
            return typeof data.additionalFee === 'number' && !isNaN(data.additionalFee) && data.additionalFee > 0;
        }
        return true;
    }, {
        message: "Additional Fee is required",
        path: ["additionalFee"],
    });

export const amenities = Object.values(Amenities);

export type EventSchema = z.infer<typeof eventSchema>

export type MediaSchema = z.infer<typeof mediaSchema>

export type MeetingSchema = z.infer<typeof meetingSchema>

const activitiesSchema = z.object({
    meeting: meetingSchema.optional(),
    events: eventSchema.optional(),
    media: mediaSchema.optional(),
})
    .refine((data) => {
        return data.meeting?.enabled || data.events?.enabled || data.media?.enabled;
    }, {
        message: "Select alteast one activity to continue",
        path: ["meeting"],
    });

export type ActivitiesSchema = z.infer<typeof activitiesSchema>

export function useActivitiesForm() {
    const formProps = useForm<ActivitiesSchema>({
        resolver: zodResolver(activitiesSchema),
        defaultValues: {
            meeting: {
                enabled: false,
                hourlyRate: undefined,
                minimumHours: undefined,
                discount: undefined,
                capacity: undefined,
                additionalFee: undefined,
                amenities: [],
                customAmenities: [],
            },
            events: {
                enabled: false,
                hourlyRate: undefined,
                minimumHours: undefined,
                discount: undefined,
                capacity: undefined,
                additionalFee: undefined,
                amenities: [],
                customAmenities: [],
            },
            media: {
                enabled: false,
                hourlyRate: undefined,
                minimumHours: undefined,
                discount: undefined,
                capacity: undefined,
                additionalFee: undefined,
                amenities: [],
                customAmenities: [],
            },
        }
    });
    return {
        ...formProps,
        errors: formProps.formState.errors,
        control: formProps.control,
    }
}
