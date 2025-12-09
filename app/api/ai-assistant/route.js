import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

// DFS Knowledge Base
const DFS_KNOWLEDGE = {
  showdown: {
    strategy: "In Showdown mode, you select 6 players with 1 Captain (1.5x points, 1.5x salary). Focus on high-ceiling plays and game script. Captain should be your highest projected scorer or a contrarian leverage play.",
    tips: [
      "Captain selection is crucial - typically QB or RB in high-scoring games",
      "Stack correlating players (QB + WR or RB + DST)",
      "Fade popular Captain choices in GPPs for leverage",
      "Use defensive plays in low-scoring game environments",
      "Consider game script and pace of play"
    ]
  },
  classic: {
    strategy: "Classic DFS requires filling all roster positions within salary cap. Optimize for points per dollar while maintaining upside. Use a balanced approach mixing safe floors with ceiling plays.",
    tips: [
      "Identify value plays to afford studs at key positions",
      "Stack QB with pass catchers in cash games",
      "Diversify lineups in GPPs for unique builds",
      "Target pace-up game environments",
      "Monitor injury news for value opportunities",
      "Balance salary to avoid leaving money on table"
    ]
  },
  sports: {
    NFL: {
      positions: ["QB", "RB", "WR", "TE", "FLEX", "DST"],
      salaryTips: "QB and RB are most expensive. Find WR/TE value to afford studs.",
      strategy: "Stack QB with WR/TE. Target high-scoring games and dome games."
    },
    NBA: {
      positions: ["PG", "SG", "SF", "PF", "C", "G", "F", "UTIL"],
      salaryTips: "Centers and elite PGs command highest salaries. Find value in usage bumps.",
      strategy: "Target pace-up games, injury replacements, and high usage players."
    },
    MLB: {
      positions: ["P", "P", "C", "1B", "2B", "3B", "SS", "OF", "OF", "OF"],
      salaryTips: "Pitchers are expensive. Stack hitters from same team in good matchups.",
      strategy: "Target weak pitching matchups, favorable ballparks, and weather."
    },
    NHL: {
      positions: ["C", "C", "W", "W", "W", "D", "D", "G", "UTIL"],
      salaryTips: "Goalies and top centers are priciest. Find value in PP2 units.",
      strategy: "Stack power play units. Target teams playing weak defenses."
    }
  },
  concepts: {
    ownership: "In GPPs, differentiate with low-owned plays. In cash, play chalk with high floors.",
    correlation: "Stack players who score together (QB-WR, RB-DST vs bad teams).",
    leverage: "Use contrarian plays in GPPs when public is concentrated on few players.",
    bankroll: "Allocate 80% to cash games, 20% to GPPs for sustainable growth.",
    variance: "GPPs require high variance lineups. Cash games need safe floors."
  }
}

// Generate AI response based on user message
function generateResponse(userMessage, context) {
  const message = userMessage.toLowerCase()

  // Lineup building requests
  if (message.includes('build') && message.includes('lineup')) {
    if (message.includes('showdown')) {
      return `I'll help you build a Showdown lineup! Here's my process:

**Showdown Strategy:**
${DFS_KNOWLEDGE.showdown.strategy}

**Key Steps:**
1. **Identify the Captain**: Look for highest ceiling play - usually QB/RB in high-scoring games
2. **Correlate Your Plays**: Stack players from same team if you expect them to dominate
3. **Find Value**: Need 1-2 value plays to afford top-tier Captain + studs
4. **Game Script**: Consider how the game will play out (shootout vs defensive battle)
5. **Leverage**: Fade popular Captains in GPPs for differentiation

${DFS_KNOWLEDGE.showdown.tips.map(tip => `• ${tip}`).join('\n')}

What sport and game are you building for? I can provide specific player suggestions!`
    } else if (message.includes('classic')) {
      return `Let's build an optimal Classic lineup! Here's the framework:

**Classic Strategy:**
${DFS_KNOWLEDGE.classic.strategy}

**Lineup Construction:**
1. **Identify Studs**: Find 2-3 must-play players regardless of salary
2. **Find Value**: Research injury news, lineup changes, and matchup upgrades
3. **Balance Salary**: Don't leave $500+ on table - every dollar counts
4. **Diversify**: Mix safe floor plays with ceiling upside
5. **Stack Strategically**: Correlate high-scoring game environments

${DFS_KNOWLEDGE.classic.tips.map(tip => `• ${tip}`).join('\n')}

Which sport are you playing? NFL, NBA, MLB, or NHL? I'll give you sport-specific advice!`
    }

    return `I can help you build lineups! Are you playing **Showdown** or **Classic** format? And which sport: NFL 🏈, NBA 🏀, MLB ⚾, or NHL 🏒?`
  }

  // Sport-specific questions
  const sportMatch = Object.keys(DFS_KNOWLEDGE.sports).find(sport => message.includes(sport.toLowerCase()))
  if (sportMatch) {
    const sportData = DFS_KNOWLEDGE.sports[sportMatch]
    return `**${sportMatch} DFS Strategy:**

${sportData.strategy}

**Positions:** ${sportData.positions.join(', ')}

**Salary Management:** ${sportData.salaryTips}

**Pro Tips:**
• Research injury reports daily - value emerges from lineup changes
• Track Vegas totals for high-scoring game environments
• Monitor weather (especially NFL/MLB) for game conditions
• Follow beat reporters for late-breaking news
• Use lineup optimizers but add your own insights

Want help building a specific ${sportMatch} lineup?`
  }

  // Strategy concepts
  if (message.includes('strategy') || message.includes('tips')) {
    return `**Core DFS Strategy Concepts:**

🎯 **Ownership & Leverage:**
${DFS_KNOWLEDGE.concepts.ownership}

🔗 **Correlation:**
${DFS_KNOWLEDGE.concepts.correlation}

📊 **Variance:**
${DFS_KNOWLEDGE.concepts.variance}

💰 **Bankroll Management:**
${DFS_KNOWLEDGE.concepts.bankroll}

⚡ **Leverage Plays:**
${DFS_KNOWLEDGE.concepts.leverage}

**Golden Rules:**
• Research is your edge - stay on top of news
• Build multiple lineups with different exposures
• Don't chase losses - stick to bankroll plan
• Track results and learn from mistakes
• Mix cash games and GPPs wisely

What specific aspect would you like to dive deeper into?`
  }

  // Salary cap optimization
  if (message.includes('salary') || message.includes('cap')) {
    return `**Salary Cap Optimization:**

The key to DFS success is maximizing points per dollar spent!

**Finding Value:**
• Look for players with increased usage due to injuries
• Target bench players moving to starting roles
• Find players in pace-up matchups vs weak defenses
• Monitor practice reports for volume indicators

**Optimal Allocation:**
• Don't leave more than $500 on the table
• Pay up for elite plays in strong matchups
• Balance studs with value to create optimal roster
• In Showdown, Captain takes ~30-35% of salary cap

**Value Indicators:**
• Recent starter due to injury = instant value
• High usage player in plus matchup at low ownership
• Correlated plays in high-total games
• Players with expanded roles

**Common Mistakes:**
❌ Leaving too much salary unused
❌ Roster full of mid-tier plays (no studs or value)
❌ Paying for name value without projected points
✅ Strategic mix of studs, solid plays, and value gems

Need help finding value plays for a specific slate?`
  }

  // Today's picks
  if (message.includes('today') || message.includes('picks') || message.includes('show me')) {
    return `To see today's premium picks, head to the **Picks** page!

Our expert analysis covers:
• NFL Showdown & Classic lineups
• NBA optimal builds
• MLB stacking strategies
• NHL power play correlations

Each pick includes:
✓ Detailed player analysis
✓ Salary cap breakdown
✓ Projected ownership
✓ Confidence rating
✓ Captain/flex recommendations

Premium subscribers get full access to all picks across all sports!

Want me to help you analyze our picks or build a custom lineup?`
  }

  // Bankroll management
  if (message.includes('bankroll') || message.includes('money')) {
    return `**Bankroll Management for DFS:**

${DFS_KNOWLEDGE.concepts.bankroll}

**Safe Bankroll Rules:**
• Never risk more than 10% of bankroll on any slate
• Diversify across multiple contests
• 80% cash games (safer), 20% GPPs (variance)
• Track wins/losses to adjust strategy
• Don't chase losses by moving up stakes

**Contest Selection:**
• **50/50s & Double-Ups:** High floor lineups, safe plays
• **GPPs/Tournaments:** High ceiling, contrarian builds
• **3-Max:** Small field tournaments for skilled players
• **Single Entry:** Most recreational friendly

**Growth Strategy:**
1. Start small with proven strategy
2. Build bankroll through cash games
3. Gradually increase GPP exposure
4. Track ROI and adjust allocations
5. Withdraw profits regularly

Stay disciplined and the bankroll will grow! 📈`
  }

  // Default helpful response
  return `I'm here to help you dominate DFS! I can assist with:

🎯 **Lineup Building**
• Showdown & Classic strategies
• Sport-specific advice (NFL, NBA, MLB, NHL)
• Player selection and stacking

📊 **Strategy & Concepts**
• Salary cap optimization
• Ownership & leverage plays
• Correlation strategies
• Cash vs GPP approaches

💰 **Bankroll Management**
• Contest selection
• Risk management
• Profitable long-term strategy

📈 **Analysis**
• Today's top picks
• Matchup breakdowns
• Value play identification

Try asking:
• "Help me build an NFL showdown lineup"
• "What's the best NBA strategy?"
• "Explain salary cap optimization"
• "Show me today's picks"

What would you like help with?`
}

export async function POST(req) {
  try {
    const { messages } = await req.json()

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      )
    }

    const session = await getServerSession(authOptions)
    const userMessage = messages[messages.length - 1]

    // Generate context-aware response
    const context = {
      isAuthenticated: !!session,
      hasPremiumAccess: session?.user?.subscription?.status === 'active' || session?.user?.subscription?.status === 'trialing'
    }

    const responseMessage = generateResponse(userMessage.content, context)

    return NextResponse.json({
      message: responseMessage,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("AI Assistant API error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
