import { NextResponse } from 'next/server'

// ============================================================
// OWNERSHIP ENGINE API — V1
// Intelligent ownership data with leverage analysis
// ============================================================

function generateNFLOwnership() {
  return [
    // QBs - High ownership tier
    { id: 'nfl_qb_1', name: 'Josh Allen', team: 'BUF', position: 'QB', projection: 26.5, salary: 8300, ownership: 28.1 },
    { id: 'nfl_qb_2', name: 'Patrick Mahomes', team: 'KC', position: 'QB', projection: 24.6, salary: 7800, ownership: 32.4 },
    { id: 'nfl_qb_3', name: 'Jalen Hurts', team: 'PHI', position: 'QB', projection: 25.8, salary: 8100, ownership: 24.7 },
    { id: 'nfl_qb_4', name: 'Lamar Jackson', team: 'BAL', position: 'QB', projection: 24.2, salary: 7600, ownership: 15.3 },
    { id: 'nfl_qb_5', name: 'Justin Herbert', team: 'LAC', position: 'QB', projection: 22.8, salary: 7200, ownership: 8.6 },

    // RBs - Mixed ownership
    { id: 'nfl_rb_1', name: 'Christian McCaffrey', team: 'SF', position: 'RB', projection: 21.4, salary: 9200, ownership: 35.8 },
    { id: 'nfl_rb_2', name: 'Austin Ekeler', team: 'LAC', position: 'RB', projection: 18.6, salary: 7800, ownership: 22.1 },
    { id: 'nfl_rb_3', name: 'Derrick Henry', team: 'TEN', position: 'RB', projection: 17.2, salary: 7400, ownership: 18.4 },
    { id: 'nfl_rb_4', name: 'Saquon Barkley', team: 'NYG', position: 'RB', projection: 16.8, salary: 7000, ownership: 12.7 },
    { id: 'nfl_rb_5', name: 'Tony Pollard', team: 'DAL', position: 'RB', projection: 16.4, salary: 6800, ownership: 9.2 },
    { id: 'nfl_rb_6', name: 'Breece Hall', team: 'NYJ', position: 'RB', projection: 15.9, salary: 6400, ownership: 6.8 },

    // WRs - Wide ownership spread
    { id: 'nfl_wr_1', name: 'Tyreek Hill', team: 'MIA', position: 'WR', projection: 17.8, salary: 8600, ownership: 31.2 },
    { id: 'nfl_wr_2', name: 'Stefon Diggs', team: 'BUF', position: 'WR', projection: 16.4, salary: 7900, ownership: 26.5 },
    { id: 'nfl_wr_3', name: 'CeeDee Lamb', team: 'DAL', position: 'WR', projection: 16.1, salary: 7600, ownership: 19.8 },
    { id: 'nfl_wr_4', name: 'Justin Jefferson', team: 'MIN', position: 'WR', projection: 17.2, salary: 8200, ownership: 23.6 },
    { id: 'nfl_wr_5', name: 'Amon-Ra St. Brown', team: 'DET', position: 'WR', projection: 15.3, salary: 7200, ownership: 14.2 },
    { id: 'nfl_wr_6', name: 'Davante Adams', team: 'LV', position: 'WR', projection: 14.8, salary: 6900, ownership: 11.6 },
    { id: 'nfl_wr_7', name: 'Garrett Wilson', team: 'NYJ', position: 'WR', projection: 14.2, salary: 6400, ownership: 7.9 },
    { id: 'nfl_wr_8', name: 'Chris Olave', team: 'NO', position: 'WR', projection: 13.6, salary: 6000, ownership: 5.4 },

    // TEs - Typical concentrated ownership
    { id: 'nfl_te_1', name: 'Travis Kelce', team: 'KC', position: 'TE', projection: 14.6, salary: 7400, ownership: 38.4 },
    { id: 'nfl_te_2', name: 'Mark Andrews', team: 'BAL', position: 'TE', projection: 12.8, salary: 6200, ownership: 21.7 },
    { id: 'nfl_te_3', name: 'George Kittle', team: 'SF', position: 'TE', projection: 11.4, salary: 5800, ownership: 13.2 },
    { id: 'nfl_te_4', name: 'TJ Hockenson', team: 'MIN', position: 'TE', projection: 10.2, salary: 5200, ownership: 8.5 },
  ]
}

function generateNBAOwnership() {
  return [
    // Guards - Star ownership
    { id: 'nba_pg_1', name: 'Luka Doncic', team: 'DAL', position: 'PG', projection: 58.4, salary: 11800, ownership: 34.2 },
    { id: 'nba_pg_2', name: 'Trae Young', team: 'ATL', position: 'PG', projection: 52.6, salary: 10200, ownership: 28.7 },
    { id: 'nba_sg_1', name: 'Devin Booker', team: 'PHX', position: 'SG', projection: 48.2, salary: 9600, ownership: 22.4 },
    { id: 'nba_pg_3', name: 'Damian Lillard', team: 'POR', position: 'PG', projection: 49.8, salary: 9800, ownership: 19.6 },
    { id: 'nba_sg_2', name: 'Donovan Mitchell', team: 'CLE', position: 'SG', projection: 46.4, salary: 9200, ownership: 14.8 },
    { id: 'nba_pg_4', name: 'Tyrese Haliburton', team: 'IND', position: 'PG', projection: 45.2, salary: 8800, ownership: 11.3 },
    { id: 'nba_sg_3', name: 'Anthony Edwards', team: 'MIN', position: 'SG', projection: 44.6, salary: 8400, ownership: 8.7 },

    // Forwards - Mixed ownership
    { id: 'nba_sf_1', name: 'Giannis Antetokounmpo', team: 'MIL', position: 'SF', projection: 56.8, salary: 11400, ownership: 32.6 },
    { id: 'nba_pf_1', name: 'Kevin Durant', team: 'PHX', position: 'PF', projection: 51.4, salary: 10400, ownership: 26.1 },
    { id: 'nba_sf_2', name: 'Jayson Tatum', team: 'BOS', position: 'SF', projection: 49.2, salary: 9800, ownership: 21.3 },
    { id: 'nba_pf_2', name: 'Julius Randle', team: 'NYK', position: 'PF', projection: 46.8, salary: 9000, ownership: 15.7 },
    { id: 'nba_sf_3', name: 'Jimmy Butler', team: 'MIA', position: 'SF', projection: 44.4, salary: 8600, ownership: 12.4 },
    { id: 'nba_pf_3', name: 'Paolo Banchero', team: 'ORL', position: 'PF', projection: 42.8, salary: 8200, ownership: 9.1 },

    // Centers - Top-heavy ownership
    { id: 'nba_c_1', name: 'Nikola Jokic', team: 'DEN', position: 'C', projection: 60.2, salary: 12200, ownership: 41.8 },
    { id: 'nba_c_2', name: 'Joel Embiid', team: 'PHI', position: 'C', projection: 57.6, salary: 11600, ownership: 29.4 },
    { id: 'nba_c_3', name: 'Anthony Davis', team: 'LAL', position: 'C', projection: 52.8, salary: 10600, ownership: 23.2 },
    { id: 'nba_c_4', name: 'Domantas Sabonis', team: 'SAC', position: 'C', projection: 48.4, salary: 9400, ownership: 16.8 },
    { id: 'nba_c_5', name: 'Bam Adebayo', team: 'MIA', position: 'C', projection: 44.6, salary: 8800, ownership: 11.5 },
    { id: 'nba_c_6', name: 'Jaren Jackson Jr', team: 'MEM', position: 'C', projection: 42.2, salary: 8200, ownership: 7.6 },
  ]
}

function generateMLBOwnership() {
  return [
    // Pitchers - Ace ownership concentration
    { id: 'mlb_p_1', name: 'Spencer Strider', team: 'ATL', position: 'SP', projection: 28.4, salary: 11200, ownership: 36.7 },
    { id: 'mlb_p_2', name: 'Gerrit Cole', team: 'NYY', position: 'SP', projection: 26.8, salary: 10400, ownership: 29.3 },
    { id: 'mlb_p_3', name: 'Blake Snell', team: 'SD', position: 'SP', projection: 25.2, salary: 9800, ownership: 22.6 },
    { id: 'mlb_p_4', name: 'Pablo López', team: 'MIN', position: 'SP', projection: 23.6, salary: 9200, ownership: 16.4 },
    { id: 'mlb_p_5', name: 'Logan Webb', team: 'SF', position: 'SP', projection: 22.4, salary: 8600, ownership: 11.8 },
    { id: 'mlb_p_6', name: 'Sonny Gray', team: 'MIN', position: 'SP', projection: 21.2, salary: 8000, ownership: 7.9 },

    // Catchers - Limited pool, concentrated ownership
    { id: 'mlb_c_1', name: 'Will Smith', team: 'LAD', position: 'C', projection: 11.2, salary: 5400, ownership: 32.4 },
    { id: 'mlb_c_2', name: 'Adley Rutschman', team: 'BAL', position: 'C', projection: 10.4, salary: 4800, ownership: 24.8 },
    { id: 'mlb_c_3', name: 'J.T. Realmuto', team: 'PHI', position: 'C', projection: 9.8, salary: 4400, ownership: 18.6 },

    // Infielders - Spread ownership
    { id: 'mlb_1b_1', name: 'Freddie Freeman', team: 'LAD', position: '1B', projection: 12.6, salary: 5800, ownership: 28.4 },
    { id: 'mlb_2b_1', name: 'Marcus Semien', team: 'TEX', position: '2B', projection: 11.8, salary: 5400, ownership: 21.7 },
    { id: 'mlb_ss_1', name: 'Trea Turner', team: 'PHI', position: 'SS', projection: 12.2, salary: 5600, ownership: 26.3 },
    { id: 'mlb_3b_1', name: 'Austin Riley', team: 'ATL', position: '3B', projection: 11.4, salary: 5200, ownership: 19.5 },
    { id: 'mlb_1b_2', name: 'Matt Olson', team: 'ATL', position: '1B', projection: 11.2, salary: 5000, ownership: 15.2 },
    { id: 'mlb_2b_2', name: 'Jose Altuve', team: 'HOU', position: '2B', projection: 10.6, salary: 4800, ownership: 12.8 },
    { id: 'mlb_ss_2', name: 'Corey Seager', team: 'TEX', position: 'SS', projection: 10.8, salary: 4600, ownership: 9.4 },

    // Outfielders - Wide spread
    { id: 'mlb_of_1', name: 'Ronald Acuña Jr', team: 'ATL', position: 'OF', projection: 13.8, salary: 6200, ownership: 34.6 },
    { id: 'mlb_of_2', name: 'Mookie Betts', team: 'LAD', position: 'OF', projection: 12.4, salary: 5800, ownership: 27.2 },
    { id: 'mlb_of_3', name: 'Kyle Tucker', team: 'HOU', position: 'OF', projection: 11.6, salary: 5400, ownership: 20.8 },
    { id: 'mlb_of_4', name: 'Juan Soto', team: 'SD', position: 'OF', projection: 11.2, salary: 5200, ownership: 16.4 },
    { id: 'mlb_of_5', name: 'Randy Arozarena', team: 'TB', position: 'OF', projection: 10.4, salary: 4800, ownership: 11.7 },
    { id: 'mlb_of_6', name: 'Bryan Reynolds', team: 'PIT', position: 'OF', projection: 9.8, salary: 4400, ownership: 7.3 },
  ]
}

// Calculate value and leverage with intelligent tagging
function processPlayers(players) {
  // Calculate value for each player
  const withValue = players.map(p => ({
    ...p,
    value: ((p.projection / p.salary) * 1000).toFixed(2)
  }))

  // Calculate percentiles for leverage analysis
  const projections = withValue.map(p => p.projection).sort((a, b) => b - a)
  const ownerships = withValue.map(p => p.ownership).sort((a, b) => b - a)

  const getPercentile = (value, sortedArray) => {
    const index = sortedArray.indexOf(value)
    return ((sortedArray.length - index) / sortedArray.length) * 100
  }

  // Add leverage and intelligent tagging
  const processed = withValue.map(p => {
    const projPercentile = getPercentile(p.projection, projections)
    const ownPercentile = getPercentile(p.ownership, ownerships)
    const leverage = (projPercentile - ownPercentile).toFixed(1)

    // Intelligent tagging logic
    let tag = 'Balanced'
    if (p.ownership >= 30) {
      tag = 'Chalk'
    } else if (p.ownership >= 20) {
      tag = 'Chalk'
    } else if (p.ownership >= 10) {
      tag = 'Pivot'
    } else if (parseFloat(leverage) > 15) {
      tag = 'Leverage'
    } else if (p.ownership >= 25 && parseFloat(leverage) < -10) {
      tag = 'Trap'
    }

    return {
      ...p,
      leverage: parseFloat(leverage),
      tag
    }
  })

  return processed
}

// Generate summary metrics from player pool
function generateSummary(players) {
  // Find top owned player
  const topOwnedPlayer = [...players].sort((a, b) => b.ownership - a.ownership)[0]

  // Calculate team concentrations
  const teamOwnership = {}
  players.forEach(p => {
    if (!teamOwnership[p.team]) {
      teamOwnership[p.team] = 0
    }
    teamOwnership[p.team] += p.ownership
  })
  const topOwnedTeam = Object.entries(teamOwnership).sort((a, b) => b[1] - a[1])[0][0]

  // Calculate chalk concentration (% of players above 20% ownership)
  const chalkPlayers = players.filter(p => p.ownership >= 20).length
  const chalkConcentration = Math.round((chalkPlayers / players.length) * 100)

  // Count leverage plays (ownership < 10% AND leverage > 10)
  const leverageCount = players.filter(p => p.ownership < 10 && p.leverage > 10).length

  // Classify slate type
  let slateType = 'Balanced slate'
  if (chalkConcentration >= 35) {
    slateType = 'Tight chalk slate'
  } else if (chalkConcentration >= 25) {
    slateType = 'Moderate chalk slate'
  } else if (chalkConcentration <= 15) {
    slateType = 'Wide-open slate'
  }

  return {
    topOwnedPlayer: topOwnedPlayer.name,
    topOwnedPlayerOwnership: topOwnedPlayer.ownership,
    topOwnedTeam,
    chalkConcentration,
    leverageCount,
    slateType
  }
}

// Main POST handler
export async function POST(request) {
  try {
    const body = await request.json()
    const { sport = 'NFL', site = 'DK', slate = 'Main Slate' } = body

    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 900))

    // Get sport-specific data
    let rawPlayers = []
    if (sport === 'NFL') {
      rawPlayers = generateNFLOwnership()
    } else if (sport === 'NBA') {
      rawPlayers = generateNBAOwnership()
    } else if (sport === 'MLB') {
      rawPlayers = generateMLBOwnership()
    }

    // Process players with value, leverage, and tags
    const players = processPlayers(rawPlayers)

    // Generate summary metrics
    const summary = generateSummary(players)

    // Return complete ownership intelligence
    return NextResponse.json({
      meta: {
        sport,
        site,
        slate,
        playerCount: players.length,
        timestamp: new Date().toISOString(),
        runId: `own_${Date.now()}`
      },
      players,
      summary
    }, { status: 200 })

  } catch (error) {
    console.error('Ownership API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate ownership data' },
      { status: 500 }
    )
  }
}
