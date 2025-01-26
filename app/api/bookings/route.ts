import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16"
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { spaceId, startTime, endTime, totalPrice } = body

    const space = await prisma.space.findUnique({
      where: {
        id: spaceId
      }
    })

    if (!space) {
      return new NextResponse("Space not found", { status: 404 })
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: "usd",
      metadata: {
        spaceId,
        userId: session.user.id
      }
    })

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        spaceId,
        userId: session.user.id,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        totalPrice,
        status: "PENDING"
      }
    })

    return NextResponse.json({
      booking,
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error("[BOOKINGS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        space: true
      },
      orderBy: {
        startTime: 'desc'
      }
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("[BOOKINGS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}