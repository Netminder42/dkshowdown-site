import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)

    const sport = searchParams.get('sport')
    const gameType = searchParams.get('type')

    // Build query
    const where = {
      isPublished: true,
    }

    if (sport) where.sport = sport
    if (gameType) where.gameType = gameType

    // Fetch picks
    const picks = await prisma.pick.findMany({
      where,
      orderBy: { date: 'desc' },
      take: 20,
    })

    // Check user's premium access
    const hasPremiumAccess = session?.user?.subscription?.status === 'trialing' ||
                            session?.user?.subscription?.status === 'active'

    // Filter premium picks if user doesn't have access
    const filteredPicks = picks.map(pick => {
      if (pick.isPremium && !hasPremiumAccess) {
        // Return limited data for premium picks
        return {
          id: pick.id,
          sport: pick.sport,
          gameType: pick.gameType,
          date: pick.date,
          gameInfo: pick.gameInfo,
          title: pick.title,
          description: pick.description?.substring(0, 100) + '...',
          isPremium: true,
          locked: true,
          confidence: pick.confidence,
        }
      }
      return {
        ...pick,
        locked: false,
      }
    })

    return NextResponse.json({ picks: filteredPicks })
  } catch (error) {
    console.error("Get picks error:", error)
    return NextResponse.json(
      { error: "Failed to fetch picks" },
      { status: 500 }
    )
  }
}
