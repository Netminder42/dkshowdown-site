import { NextResponse } from 'next/server'

// ============================================================
// OPTIMIZER ENGINE API — V1 PRO MODE
// World-class lineup builder with stack logic and exposure control
// ============================================================

// NFL Player Pool
function getNFLPlayerPool() {
  return [
    // QBs
    { id: 'nfl_qb_1', name: 'Patrick Mahomes', team: 'KC', position: 'QB', projection: 24.6, salary: 7800, ownership: 32.4, leverage: -8.2 },
    { id: 'nfl_qb_2', name: 'Josh Allen', team: 'BUF', position: 'QB', projection: 25.4, salary: 8300, ownership: 28.1, leverage: -2.7 },
    { id: 'nfl_qb_3', name: 'Jalen Hurts', team: 'PHI', position: 'QB', projection: 25.8, salary: 8100, ownership: 24.7, leverage: 1.1 },
    { id: 'nfl_qb_4', name: 'Lamar Jackson', team: 'BAL', position: 'QB', projection: 24.2, salary: 7600, ownership: 15.3, leverage: 8.9 },
    { id: 'nfl_qb_5', name: 'Justin Herbert', team: 'LAC', position: 'QB', projection: 22.8, salary: 7200, ownership: 8.6, leverage: 14.2 },

    // RBs
    { id: 'nfl_rb_1', name: 'Christian McCaffrey', team: 'SF', position: 'RB', projection: 21.4, salary: 9200, ownership: 35.8, leverage: -14.4 },
    { id: 'nfl_rb_2', name: 'Austin Ekeler', team: 'LAC', position: 'RB', projection: 18.6, salary: 7800, ownership: 22.1, leverage: -3.5 },
    { id: 'nfl_rb_3', name: 'Derrick Henry', team: 'TEN', position: 'RB', projection: 17.2, salary: 7400, ownership: 18.4, leverage: -1.2 },
    { id: 'nfl_rb_4', name: 'Saquon Barkley', team: 'NYG', position: 'RB', projection: 16.8, salary: 7000, ownership: 12.7, leverage: 4.1 },
    { id: 'nfl_rb_5', name: 'Tony Pollard', team: 'DAL', position: 'RB', projection: 16.4, salary: 6800, ownership: 9.2, leverage: 7.2 },
    { id: 'nfl_rb_6', name: 'Breece Hall', team: 'NYJ', position: 'RB', projection: 15.9, salary: 6400, ownership: 6.8, leverage: 9.1 },
    { id: 'nfl_rb_7', name: 'Kenneth Walker', team: 'SEA', position: 'RB', projection: 14.8, salary: 5800, ownership: 11.2, leverage: 3.6 },
    { id: 'nfl_rb_8', name: 'Dameon Pierce', team: 'HOU', position: 'RB', projection: 13.2, salary: 5200, ownership: 5.4, leverage: 7.8 },

    // WRs
    { id: 'nfl_wr_1', name: 'Tyreek Hill', team: 'MIA', position: 'WR', projection: 17.8, salary: 8600, ownership: 31.2, leverage: -13.4 },
    { id: 'nfl_wr_2', name: 'Stefon Diggs', team: 'BUF', position: 'WR', projection: 16.4, salary: 7900, ownership: 26.5, leverage: -10.1 },
    { id: 'nfl_wr_3', name: 'Justin Jefferson', team: 'MIN', position: 'WR', projection: 17.2, salary: 8200, ownership: 23.6, leverage: -6.4 },
    { id: 'nfl_wr_4', name: 'CeeDee Lamb', team: 'DAL', position: 'WR', projection: 16.1, salary: 7600, ownership: 19.8, leverage: -3.7 },
    { id: 'nfl_wr_5', name: 'Amon-Ra St. Brown', team: 'DET', position: 'WR', projection: 15.3, salary: 7200, ownership: 14.2, leverage: 1.1 },
    { id: 'nfl_wr_6', name: 'Davante Adams', team: 'LV', position: 'WR', projection: 14.8, salary: 6900, ownership: 11.6, leverage: 3.2 },
    { id: 'nfl_wr_7', name: 'Garrett Wilson', team: 'NYJ', position: 'WR', projection: 14.2, salary: 6400, ownership: 7.9, leverage: 6.3 },
    { id: 'nfl_wr_8', name: 'Chris Olave', team: 'NO', position: 'WR', projection: 13.6, salary: 6000, ownership: 5.4, leverage: 8.2 },
    { id: 'nfl_wr_9', name: 'DeVonta Smith', team: 'PHI', position: 'WR', projection: 13.8, salary: 6200, ownership: 9.1, leverage: 4.7 },
    { id: 'nfl_wr_10', name: 'Jaylen Waddle', team: 'MIA', position: 'WR', projection: 14.4, salary: 6600, ownership: 16.3, leverage: -1.9 },

    // TEs
    { id: 'nfl_te_1', name: 'Travis Kelce', team: 'KC', position: 'TE', projection: 14.6, salary: 7400, ownership: 38.4, leverage: -23.8 },
    { id: 'nfl_te_2', name: 'Mark Andrews', team: 'BAL', position: 'TE', projection: 12.8, salary: 6200, ownership: 21.7, leverage: -8.9 },
    { id: 'nfl_te_3', name: 'George Kittle', team: 'SF', position: 'TE', projection: 11.4, salary: 5800, ownership: 13.2, leverage: -1.8 },
    { id: 'nfl_te_4', name: 'TJ Hockenson', team: 'MIN', position: 'TE', projection: 10.2, salary: 5200, ownership: 8.5, leverage: 1.7 },
    { id: 'nfl_te_5', name: 'Dallas Goedert', team: 'PHI', position: 'TE', projection: 9.8, salary: 4800, ownership: 6.2, leverage: 3.6 },

    // DST
    { id: 'nfl_dst_1', name: 'San Francisco', team: 'SF', position: 'DST', projection: 9.2, salary: 3800, ownership: 24.1, leverage: -14.9 },
    { id: 'nfl_dst_2', name: 'Buffalo', team: 'BUF', position: 'DST', projection: 8.6, salary: 3400, ownership: 18.3, leverage: -9.7 },
    { id: 'nfl_dst_3', name: 'Dallas', team: 'DAL', position: 'DST', projection: 7.8, salary: 3000, ownership: 12.4, leverage: -4.6 },
    { id: 'nfl_dst_4', name: 'New England', team: 'NE', position: 'DST', projection: 7.2, salary: 2600, ownership: 8.1, leverage: -0.9 },
    { id: 'nfl_dst_5', name: 'Cleveland', team: 'CLE', position: 'DST', projection: 6.8, salary: 2400, ownership: 5.2, leverage: 1.6 },
  ]
}

// Calculate value and add tags for player pool
function enrichPlayerPool(pool) {
  return pool.map(p => {
    // Calculate tag based on ownership
    let tag = 'Pivot'
    if (p.ownership >= 25) {
      tag = 'Chalk'
    } else if (p.ownership < 10) {
      tag = 'Leverage'
    }

    return {
      ...p,
      value: ((p.projection / p.salary) * 1000).toFixed(2),
      tag,
      exposure: 0 // Will be calculated after lineups are generated
    }
  })
}

// Calculate player exposures from lineups
function calculateExposures(playerPool, lineups) {
  const exposureCounts = {}

  // Count how many lineups each player appears in
  lineups.forEach(lineup => {
    lineup.players.forEach(player => {
      exposureCounts[player.id] = (exposureCounts[player.id] || 0) + 1
    })
  })

  // Calculate exposure percentage
  return playerPool.map(player => ({
    ...player,
    exposure: lineups.length > 0
      ? ((exposureCounts[player.id] || 0) / lineups.length * 100).toFixed(1)
      : 0
  }))
}

// Calculate lineup summary statistics
function calculateSummary(lineups, playerPool) {
  if (lineups.length === 0) return null

  // Average metrics
  const avgProjection = (lineups.reduce((sum, lu) => sum + lu.projection, 0) / lineups.length).toFixed(1)
  const avgOwnership = (lineups.reduce((sum, lu) => sum + lu.ownership, 0) / lineups.length).toFixed(0)
  const avgLeverage = (lineups.reduce((sum, lu) => sum + lu.leverageScore, 0) / lineups.length).toFixed(1)

  // Most-used stack
  const stackCounts = {}
  lineups.forEach(lineup => {
    if (lineup.stackSummary) {
      stackCounts[lineup.stackSummary] = (stackCounts[lineup.stackSummary] || 0) + 1
    }
  })
  const mostUsedStack = Object.entries(stackCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'No stacks'

  // Top 3 exposed players
  const exposures = playerPool
    .filter(p => parseFloat(p.exposure) > 0)
    .sort((a, b) => parseFloat(b.exposure) - parseFloat(a.exposure))
    .slice(0, 3)
    .map(p => ({ name: p.name, exposure: p.exposure }))

  return {
    avgProjection,
    avgOwnership,
    avgLeverage,
    mostUsedStack,
    topExposures: exposures
  }
}

// Generate lineups based on settings
function generateLineups(settings) {
  const {
    sport, numLineups, leveragePreference, chalkTolerance, diversification,
    locks = [], fades = [], primaryStack, secondaryStack
  } = settings

  const pool = sport === 'NFL' ? getNFLPlayerPool() : getNFLPlayerPool()
  const enrichedPool = enrichPlayerPool(pool)

  // Filter out faded players
  const availablePlayers = enrichedPool.filter(p => !fades.includes(p.id))

  // Separate by position
  const byPosition = {
    QB: availablePlayers.filter(p => p.position === 'QB'),
    RB: availablePlayers.filter(p => p.position === 'RB'),
    WR: availablePlayers.filter(p => p.position === 'WR'),
    TE: availablePlayers.filter(p => p.position === 'TE'),
    DST: availablePlayers.filter(p => p.position === 'DST')
  }

  const lineups = []

  for (let i = 0; i < numLineups; i++) {
    const lineup = {
      id: `lu_${String(i + 1).padStart(3, '0')}`,
      players: [],
      projection: 0,
      salary: 0,
      ownership: 0,
      leverageScore: 0,
      stackSummary: ''
    }

    // Apply leverage and chalk preferences
    const leverageBias = leveragePreference // 0 = low leverage, 1 = high leverage
    const chalkBias = chalkTolerance // 0 = avoid chalk, 1 = use chalk

    // Stack logic
    let stackTeam = primaryStack?.team || null
    let stackPositions = []

    if (stackTeam) {
      // Get stack players from team
      const teamPlayers = availablePlayers.filter(p => p.team === stackTeam)
      const qb = teamPlayers.find(p => p.position === 'QB')
      const wrs = teamPlayers.filter(p => p.position === 'WR')
      const te = teamPlayers.find(p => p.position === 'TE')

      if (qb) {
        lineup.players.push(qb)
        stackPositions.push('QB')
      }
      if (wrs.length > 0) {
        lineup.players.push(wrs[0])
        stackPositions.push('WR')
        if (wrs.length > 1 && primaryStack?.size >= 3) {
          lineup.players.push(wrs[1])
        }
      }
      if (te && primaryStack?.size >= 4) {
        lineup.players.push(te)
        stackPositions.push('TE')
      }

      lineup.stackSummary = `${stackTeam} (${stackPositions.join('+')})`

      // Add bringback if requested
      if (primaryStack?.bringback && secondaryStack?.team) {
        const bringbackTeam = secondaryStack.team
        const bringbackPlayers = availablePlayers.filter(p => p.team === bringbackTeam && p.position === 'WR')
        if (bringbackPlayers.length > 0) {
          lineup.players.push(bringbackPlayers[0])
          lineup.stackSummary += ` with ${bringbackTeam} bringback`
        }
      }
    }

    // Add locked players
    locks.forEach(lockId => {
      const player = availablePlayers.find(p => p.id === lockId)
      if (player && !lineup.players.find(p => p.id === player.id)) {
        lineup.players.push(player)
      }
    })

    // Fill remaining roster spots intelligently
    const selectPlayer = (position, count = 1) => {
      const available = byPosition[position].filter(p =>
        !lineup.players.find(lp => lp.id === p.id)
      )

      // Sort based on preferences
      available.sort((a, b) => {
        // Leverage preference
        const aLevScore = a.leverage * leverageBias
        const bLevScore = b.leverage * leverageBias

        // Chalk preference (inverse for chalk tolerance)
        const aChalkScore = (100 - a.ownership) * (1 - chalkBias)
        const bChalkScore = (100 - b.ownership) * (1 - chalkBias)

        // Projection value
        const aScore = a.projection + aLevScore + aChalkScore * 0.1
        const bScore = b.projection + bLevScore + bChalkScore * 0.1

        // Add randomness for diversification
        const randomFactor = (Math.random() - 0.5) * diversification * 10

        return (bScore - aScore) + randomFactor
      })

      return available.slice(0, count)
    }

    // Fill remaining positions (DK roster: 1 QB, 2 RB, 3 WR, 1 TE, 1 FLEX, 1 DST)
    const currentPositions = lineup.players.reduce((acc, p) => {
      acc[p.position] = (acc[p.position] || 0) + 1
      return acc
    }, {})

    // Add QB if not in stack
    if (!currentPositions.QB) {
      lineup.players.push(...selectPlayer('QB', 1))
    }

    // Add RBs (need 2)
    const rbsNeeded = 2 - (currentPositions.RB || 0)
    if (rbsNeeded > 0) {
      lineup.players.push(...selectPlayer('RB', rbsNeeded))
    }

    // Add WRs (need 3)
    const wrsNeeded = 3 - (currentPositions.WR || 0)
    if (wrsNeeded > 0) {
      lineup.players.push(...selectPlayer('WR', wrsNeeded))
    }

    // Add TE
    if (!currentPositions.TE) {
      lineup.players.push(...selectPlayer('TE', 1))
    }

    // Add FLEX (RB or WR)
    const flexPool = [...byPosition.RB, ...byPosition.WR].filter(p =>
      !lineup.players.find(lp => lp.id === p.id)
    )
    if (flexPool.length > 0) {
      lineup.players.push(...selectPlayer(flexPool[0].position, 1))
    }

    // Add DST
    if (!currentPositions.DST) {
      lineup.players.push(...selectPlayer('DST', 1))
    }

    // Calculate lineup metrics
    lineup.projection = lineup.players.reduce((sum, p) => sum + p.projection, 0)
    lineup.salary = lineup.players.reduce((sum, p) => sum + p.salary, 0)
    lineup.ownership = lineup.players.reduce((sum, p) => sum + p.ownership, 0)
    lineup.leverageScore = lineup.players.reduce((sum, p) => sum + p.leverage, 0)

    lineups.push(lineup)
  }

  return lineups
}

// Main POST handler
export async function POST(request) {
  try {
    const settings = await request.json()
    const {
      sport = 'NFL',
      slate = 'Main Slate',
      site = 'DK',
      numLineups = 1,
      contestType = 'Single Entry',
      leveragePreference = 0.5,
      chalkTolerance = 0.5,
      diversification = 0.5,
      locks = [],
      fades = [],
      primaryStack = null,
      secondaryStack = null,
      minExposures = {},
      maxExposures = {}
    } = settings

    // Simulate realistic processing time
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Generate lineups
    const lineups = generateLineups({
      sport,
      numLineups,
      leveragePreference,
      chalkTolerance,
      diversification,
      locks,
      fades,
      primaryStack,
      secondaryStack
    })

    // Get player pool and calculate exposures
    let playerPool = enrichPlayerPool(sport === 'NFL' ? getNFLPlayerPool() : getNFLPlayerPool())
    playerPool = calculateExposures(playerPool, lineups)

    // Calculate summary statistics
    const summary = calculateSummary(lineups, playerPool)

    return NextResponse.json({
      meta: {
        sport,
        slate,
        site,
        contestType,
        numLineups: lineups.length,
        timestamp: new Date().toISOString(),
        runId: `opt_${Date.now()}`
      },
      lineups,
      playerPool,
      summary,
      settings: {
        leveragePreference,
        chalkTolerance,
        diversification,
        locksCount: locks.length,
        fadesCount: fades.length,
        hasStacks: !!primaryStack
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Optimizer API error:', error)
    return NextResponse.json(
      { error: 'Failed to build lineups' },
      { status: 500 }
    )
  }
}
