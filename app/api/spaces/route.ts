export const dynamic = 'force-dynamic'
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
    const { title, description, price, capacity, address, city, state, country, amenities, images } = body

    const space = await prisma.space.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        capacity: parseInt(capacity),
        address,
        city,
        state,
        country,
        amenities,
        images,
        hostId: session.user.id,
        status: "PUBLISHED"
      }
    })

    return NextResponse.json(space)
  } catch (error) {
    console.error("[SPACES_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const city = searchParams.get("city")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const capacity = searchParams.get("capacity")

    let query: any = {
      where: {
        status: "PUBLISHED",
      },
      include: {
        host: true,
        reviews: true,
        categories: true,
      }
    }

    if (category) {
      query.where.categories = {
        some: {
          name: category
        }
      }
    }

    if (city) {
      query.where.city = city
    }

    if (minPrice || maxPrice) {
      query.where.price = {}
      if (minPrice) query.where.price.gte = parseFloat(minPrice)
      if (maxPrice) query.where.price.lte = parseFloat(maxPrice)
    }

    if (capacity) {
      query.where.capacity = {
        gte: parseInt(capacity)
      }
    }

    const spaces = await prisma.space.findMany(query)

    return NextResponse.json(spaces)
  } catch (error) {
    console.error("[SPACES_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}