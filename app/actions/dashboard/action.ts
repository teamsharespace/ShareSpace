"use server";

import prisma from "@/lib/prisma";


export async function fetchListings() {
  return await prisma.listing.findMany();
}

