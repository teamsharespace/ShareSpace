"use server";
import { Redis } from '@upstash/redis'
import  prisma  from '@/lib/prisma'

// Initialize Upstash Redis client
const redis = new Redis({
  url: 'https://right-jackal-15140.upstash.io',
  token: 'ATskAAIjcDFlZjNkZWI5MTA4Y2I0ZTdiYmVjNTQzNjE2MWI3ZGVhYnAxMA',
})

interface Space {
  id: string;
  name: string;
  // Add other properties your space has
}

export async function fetchListings(): Promise<Space[]> {
  const cacheKey = 'spaces:list';
  
  try {
    // Try to get from cache first
    const cachedData = await redis.get<Space[]>(cacheKey);
    if (cachedData) {
      console.log('Cache hit - returning cached data');
      return cachedData;
    }

    console.log('Cache miss - fetching from database');
    // If not in cache, get from database
    const spaces = await prisma.space.findMany();
    
    // Store in cache for 5 minutes (300 seconds)
    await redis.set(cacheKey, spaces, { ex: 300 });
    
    return spaces;
  } catch (error) {
    console.error('Error with Redis or database:', error);
    // Fallback to direct database query if Redis fails
    return await prisma.space.findMany();
  }
}

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

export async function fetchListingById(id: string) {
  const cacheKey = 'spaces:list';
  try {
    // Try to get from cache first
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log('Cache hit - returning cached data');
      return cachedData;
    }
    console.log('Cache miss - fetching from database');
    // If not in cache, get from database
    const spaces = await prisma.space.findUnique({
      where: {
        id: id,
      },
    });
    
    // Store in cache for 5 minutes (300 seconds)
    await redis.set(cacheKey, spaces, { ex: 300 });
    
    return spaces;
  }
  catch{
  return await prisma.space.findUnique({
    where: {
      id: id,
    },
  });
}
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
