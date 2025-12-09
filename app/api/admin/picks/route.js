import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()

    const pick = await prisma.pick.create({
      data: {
        sport: data.sport,
        gameType: data.gameType,
        date: new Date(data.date),
        gameInfo: data.gameInfo,
        title: data.title,
        description: data.description,
        players: data.players,
        totalSalary: data.totalSalary,
        projection: data.projection,
        confidence: data.confidence,
        captain: data.captain,
        isPremium: data.isPremium,
        isPublished: data.isPublished,
      }
    })

    return NextResponse.json({ pick })
  } catch (error) {
    console.error("Create pick error:", error)
    return NextResponse.json(
      { error: "Failed to create pick" },
      { status: 500 }
    )
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const picks = await prisma.pick.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json({ picks })
  } catch (error) {
    console.error("Get picks error:", error)
    return NextResponse.json(
      { error: "Failed to fetch picks" },
      { status: 500 }
    )
  }
}
