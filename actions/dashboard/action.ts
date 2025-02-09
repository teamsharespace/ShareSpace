"use server";

import prisma from "@/lib/prisma";

export async function createSpace(data: {
  name: string;
  about: string;
  price: number;
  hostname: string;
  status: string;
  images: string[];
  reviews: number;
  categories: string[];
  amenities: string[];
  people: number;
  comments: string[];
  currency?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  timeings: string[];
  lat: number | null; // Latitude
  lng: number | null; // Longitude
}) {
  try {
    const newSpace = await prisma.space.create({
      data: {
        ...data,
        currency: data.currency || "INR",
         lat: data.lat, 
        lng: data.lng
      },
    });

    return newSpace;
  } catch (error) {
    console.error("Error creating space:", error);
    throw new Error("Failed to create space");
  }
}


export async function fetchListings() {
  return await prisma.space.findMany();
}

export async function fetchListingById(id: string) {
  return await prisma.space.findUnique({
    where: {
      id: id,
    },
  });
}

export async function updateSpace(id: string, data: {
  name?: string;
  about?: string;
  price?: number;
  hostname?: string;
  status?: string;
  images?: string[];
  reviews?: number;
  categories?: string[];
  amenities?: string[];
  people?: number;
  comments?: string[];
  currency?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  timeings?: string[];
  lat?: number | null;
  lng?: number | null;
}) {
  try {
    const updatedSpace = await prisma.space.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return updatedSpace;
  } catch (error) {
    console.error("Error updating space:", error);
    throw new Error("Failed to update space");
  }
}
