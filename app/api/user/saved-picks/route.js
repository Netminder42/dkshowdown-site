import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user's saved picks with pick details
    const savedPicks = await prisma.pickTracking.findMany({
      where: {
        userId: session.user.id,
        saved: true
      },
      include: {
        pick: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ picks: savedPicks })
  } catch (error) {
    console.error("Get saved picks error:", error)
    return NextResponse.json(
      { error: "Failed to fetch saved picks" },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { pickId, action, result } = await req.json()

    if (!pickId) {
      return NextResponse.json({ error: "Pick ID required" }, { status: 400 })
    }

    // Find or create pick tracking
    let pickTracking = await prisma.pickTracking.findUnique({
      where: {
        userId_pickId: {
          userId: session.user.id,
          pickId: pickId
        }
      }
    })

    if (action === 'save') {
      if (pickTracking) {
        // Update existing
        pickTracking = await prisma.pickTracking.update({
          where: { id: pickTracking.id },
          data: { saved: true }
        })
      } else {
        // Create new
        pickTracking = await prisma.pickTracking.create({
          data: {
            userId: session.user.id,
            pickId: pickId,
            saved: true
          }
        })
      }
    } else if (action === 'unsave') {
      if (pickTracking) {
        pickTracking = await prisma.pickTracking.update({
          where: { id: pickTracking.id },
          data: { saved: false }
        })
      }
    } else if (action === 'update-result') {
      if (pickTracking) {
        pickTracking = await prisma.pickTracking.update({
          where: { id: pickTracking.id },
          data: { result: result }
        })
      } else {
        // Create with result
        pickTracking = await prisma.pickTracking.create({
          data: {
            userId: session.user.id,
            pickId: pickId,
            saved: true,
            result: result
          }
        })
      }
    }

    return NextResponse.json({ success: true, pickTracking })
  } catch (error) {
    console.error("Save pick error:", error)
    return NextResponse.json(
      { error: "Failed to save pick" },
      { status: 500 }
    )
  }
}
