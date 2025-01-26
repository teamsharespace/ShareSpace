import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const space = await prisma.space.findUnique({
      where: {
        id: params.id
      },
      include: {
        host: true,
        reviews: {
          include: {
            user: true
          }
        }
      }
    })

    if (!space) {
      return new NextResponse("Space not found", { status: 404 })
    }

    return NextResponse.json(space)
  } catch (error) {
    console.error("[SPACE_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}