import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { spaceId, bookingId, rating, comment } = body

    const review = await prisma.review.create({
      data: {
        spaceId,
        bookingId,
        userId: session.user.id,
        rating,
        comment
      }
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("[REVIEWS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}