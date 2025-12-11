import { NextResponse } from 'next/server'

// ============================================================
// BRAINSHEET MODE API — V1.0
// World-class DFS strategy dashboard with actionable intelligence
// ============================================================

// Generate slate metrics
function generateSlateMetrics(sport) {
  const metrics = {
    NFL: {
      bestGame: "BUF @ KC – Total 52.5",
      topTeam: "KC – 28.3 Implied",
      slateShape: "Balanced Slate with One Shootout",
      valueIndicator: "Value concentrated at WR",
      ownershipConcentration: "Top 10 players = 63%",
      leverageCount: 6
    },
    NBA: {
      bestGame: "BOS @ LAL – Total 231.5",
      topTeam: "LAL – 118.2 Implied",
      slateShape: "High-Paced Slate with Multiple Blowouts",
      valueIndicator: "Value spread across all positions",
      ownershipConcentration: "Top 10 players = 58%",
      leverageCount: 8
    },
    MLB: {
      bestGame: "ATL @ LAD – Total 9.5",
      topTeam: "ATL – 5.2 Implied",
      slateShape: "Pitcher-Friendly with Scattered Offense",
      valueIndicator: "Value at Catcher and OF",
      ownershipConcentration: "Top 10 players = 71%",
      leverageCount: 5
    }
  }
  return metrics[sport] || metrics.NFL
}

// Generate core plays
function generateCorePlays(sport) {
  const plays = {
    NFL: [
      { position: 'QB', name: 'Patrick Mahomes', team: 'KC', projection: 24.6 },
      { position: 'RB', name: 'De\'Von Achane', team: 'MIA', projection: 18.2 },
      { position: 'WR', name: 'Stefon Diggs', team: 'BUF', projection: 16.4 },
      { position: 'WR', name: 'Amon-Ra St. Brown', team: 'DET', projection: 15.3 },
      { position: 'TE', name: 'Travis Kelce', team: 'KC', projection: 14.6 }
    ],
    NBA: [
      { position: 'PG', name: 'Luka Doncic', team: 'DAL', projection: 58.4 },
      { position: 'SG', name: 'Devin Booker', team: 'PHX', projection: 48.2 },
      { position: 'SF', name: 'Jayson Tatum', team: 'BOS', projection: 49.2 },
      { position: 'PF', name: 'Giannis Antetokounmpo', team: 'MIL', projection: 56.8 },
      { position: 'C', name: 'Nikola Jokic', team: 'DEN', projection: 60.2 }
    ],
    MLB: [
      { position: 'SP', name: 'Spencer Strider', team: 'ATL', projection: 28.4 },
      { position: 'C', name: 'Will Smith', team: 'LAD', projection: 11.2 },
      { position: 'OF', name: 'Ronald Acuña Jr', team: 'ATL', projection: 13.8 },
      { position: '1B', name: 'Freddie Freeman', team: 'LAD', projection: 12.6 },
      { position: 'SS', name: 'Trea Turner', team: 'PHI', projection: 12.2 }
    ]
  }
  return plays[sport] || plays.NFL
}

// Generate value tiers
function generateValueTiers(sport) {
  const tiers = {
    NFL: {
      tier1: [
        { name: 'Justin Herbert', position: 'QB', team: 'LAC', projection: 22.8, salary: 7200, value: 3.17, image: '🎯' },
        { name: 'Amon-Ra St. Brown', position: 'WR', team: 'DET', projection: 15.3, salary: 7200, value: 2.13, image: '🎯' },
        { name: 'Dallas Goedert', position: 'TE', team: 'PHI', projection: 9.8, salary: 4800, value: 2.04, image: '🎯' }
      ],
      tier2: [
        { name: 'Kenneth Walker', position: 'RB', team: 'SEA', projection: 14.8, salary: 5800, value: 2.55, image: '💎' },
        { name: 'Garrett Wilson', position: 'WR', team: 'NYJ', projection: 14.2, salary: 6400, value: 2.22, image: '💎' },
        { name: 'TJ Hockenson', position: 'TE', team: 'MIN', projection: 10.2, salary: 5200, value: 1.96, image: '💎' }
      ],
      tier3: [
        { name: 'Dameon Pierce', position: 'RB', team: 'HOU', projection: 13.2, salary: 5200, value: 2.54, image: '💰' },
        { name: 'Chris Olave', position: 'WR', team: 'NO', projection: 13.6, salary: 6000, value: 2.27, image: '💰' }
      ]
    },
    NBA: {
      tier1: [
        { name: 'Tyrese Haliburton', position: 'PG', team: 'IND', projection: 45.2, salary: 8800, value: 5.14, image: '🎯' },
        { name: 'Paolo Banchero', position: 'PF', team: 'ORL', projection: 42.8, salary: 8200, value: 5.22, image: '🎯' }
      ],
      tier2: [
        { name: 'Anthony Edwards', position: 'SG', team: 'MIN', projection: 44.6, salary: 8400, value: 5.31, image: '💎' },
        { name: 'Bam Adebayo', position: 'C', team: 'MIA', projection: 44.6, salary: 8800, value: 5.07, image: '💎' }
      ],
      tier3: [
        { name: 'Jaren Jackson Jr', position: 'C', team: 'MEM', projection: 42.2, salary: 8200, value: 5.15, image: '💰' }
      ]
    },
    MLB: {
      tier1: [
        { name: 'Logan Webb', position: 'SP', team: 'SF', projection: 22.4, salary: 8600, value: 2.60, image: '🎯' },
        { name: 'J.T. Realmuto', position: 'C', team: 'PHI', projection: 9.8, salary: 4400, value: 2.23, image: '🎯' }
      ],
      tier2: [
        { name: 'Jose Altuve', position: '2B', team: 'HOU', projection: 10.6, salary: 4800, value: 2.21, image: '💎' },
        { name: 'Randy Arozarena', position: 'OF', team: 'TB', projection: 10.4, salary: 4800, value: 2.17, image: '💎' }
      ],
      tier3: [
        { name: 'Corey Seager', position: 'SS', team: 'TEX', projection: 10.8, salary: 4600, value: 2.35, image: '💰' },
        { name: 'Bryan Reynolds', position: 'OF', team: 'PIT', projection: 9.8, salary: 4400, value: 2.23, image: '💰' }
      ]
    }
  }
  return tiers[sport] || tiers.NFL
}

// Generate leverage tiers
function generateLeverageTiers(sport) {
  const tiers = {
    NFL: {
      tier1: [
        { name: 'Lamar Jackson', position: 'QB', team: 'BAL', projection: 24.2, ownership: 15.3, leverage: 8.9, advantage: '+8.9% advantage' },
        { name: 'Justin Herbert', position: 'QB', team: 'LAC', projection: 22.8, ownership: 8.6, leverage: 14.2, advantage: '+14.2% advantage' }
      ],
      tier2: [
        { name: 'Saquon Barkley', position: 'RB', team: 'NYG', projection: 16.8, ownership: 12.7, leverage: 4.1, advantage: '+4.1% advantage' },
        { name: 'Davante Adams', position: 'WR', team: 'LV', projection: 14.8, ownership: 11.6, leverage: 3.2, advantage: '+3.2% advantage' }
      ],
      tier3: [
        { name: 'Breece Hall', position: 'RB', team: 'NYJ', projection: 15.9, ownership: 6.8, leverage: 9.1, advantage: '+9.1% advantage' },
        { name: 'Chris Olave', position: 'WR', team: 'NO', projection: 13.6, ownership: 5.4, leverage: 8.2, advantage: '+8.2% advantage' }
      ]
    },
    NBA: {
      tier1: [
        { name: 'Damian Lillard', position: 'PG', team: 'POR', projection: 49.8, ownership: 19.6, leverage: 10.2, advantage: '+10.2% advantage' },
        { name: 'Jimmy Butler', position: 'SF', team: 'MIA', projection: 44.4, ownership: 12.4, leverage: 12.1, advantage: '+12.1% advantage' }
      ],
      tier2: [
        { name: 'Donovan Mitchell', position: 'SG', team: 'CLE', projection: 46.4, ownership: 14.8, leverage: 8.6, advantage: '+8.6% advantage' }
      ],
      tier3: [
        { name: 'Paolo Banchero', position: 'PF', team: 'ORL', projection: 42.8, ownership: 9.1, leverage: 13.7, advantage: '+13.7% advantage' }
      ]
    },
    MLB: {
      tier1: [
        { name: 'Pablo López', position: 'SP', team: 'MIN', projection: 23.6, ownership: 16.4, leverage: 7.2, advantage: '+7.2% advantage' }
      ],
      tier2: [
        { name: 'Matt Olson', position: '1B', team: 'ATL', projection: 11.2, ownership: 15.2, leverage: 4.1, advantage: '+4.1% advantage' }
      ],
      tier3: [
        { name: 'Corey Seager', position: 'SS', team: 'TEX', projection: 10.8, ownership: 9.4, leverage: 8.7, advantage: '+8.7% advantage' }
      ]
    }
  }
  return tiers[sport] || tiers.NFL
}

// Generate chalk map
function generateChalkMap(sport) {
  const maps = {
    NFL: {
      safeChalk: [
        { name: 'Patrick Mahomes', position: 'QB', team: 'KC', projection: 24.6, ownership: 32.4, trapRisk: 'Low' },
        { name: 'Jalen Hurts', position: 'QB', team: 'PHI', projection: 25.8, ownership: 24.7, trapRisk: 'Low' },
        { name: 'Austin Ekeler', position: 'RB', team: 'LAC', projection: 18.6, ownership: 22.1, trapRisk: 'Medium' }
      ],
      riskyChalk: [
        { name: 'Travis Kelce', position: 'TE', team: 'KC', projection: 14.6, ownership: 38.4, trapRisk: 'High', reason: 'Over-priced with declining target share' },
        { name: 'Christian McCaffrey', position: 'RB', team: 'SF', projection: 21.4, ownership: 35.8, trapRisk: 'High', reason: 'Injury concern + tough matchup' },
        { name: 'Tyreek Hill', position: 'WR', team: 'MIA', projection: 17.8, ownership: 31.2, trapRisk: 'Medium', reason: 'High ownership on moderate projection' }
      ]
    },
    NBA: {
      safeChalk: [
        { name: 'Luka Doncic', position: 'PG', team: 'DAL', projection: 58.4, ownership: 34.2, trapRisk: 'Low' },
        { name: 'Giannis Antetokounmpo', position: 'SF', team: 'MIL', projection: 56.8, ownership: 32.6, trapRisk: 'Low' }
      ],
      riskyChalk: [
        { name: 'Nikola Jokic', position: 'C', team: 'DEN', projection: 60.2, ownership: 41.8, trapRisk: 'High', reason: 'Extremely high ownership, blowout risk' },
        { name: 'Trae Young', position: 'PG', team: 'ATL', projection: 52.6, ownership: 28.7, trapRisk: 'Medium', reason: 'Inconsistent floor in tough matchup' }
      ]
    },
    MLB: {
      safeChalk: [
        { name: 'Spencer Strider', position: 'SP', team: 'ATL', projection: 28.4, ownership: 36.7, trapRisk: 'Low' }
      ],
      riskyChalk: [
        { name: 'Gerrit Cole', position: 'SP', team: 'NYY', projection: 26.8, ownership: 29.3, trapRisk: 'Medium', reason: 'Weather concerns, high ownership' },
        { name: 'Ronald Acuña Jr', position: 'OF', team: 'ATL', projection: 13.8, ownership: 34.6, trapRisk: 'High', reason: 'Over-owned vs. tough pitcher' }
      ]
    }
  }
  return maps[sport] || maps.NFL
}

// Generate stack game plan
function generateStackGamePlan(sport) {
  const plans = {
    NFL: {
      primary: {
        team: 'KC',
        positions: ['QB', 'WR', 'TE'],
        ownership: 28,
        leverage: 12,
        description: 'KC QB + WR + TE with BUF bringback (High Upside)',
        type: 'Primary Stack'
      },
      mini: {
        team: 'SF',
        positions: ['RB', 'WR'],
        ownership: 18,
        leverage: 6,
        description: 'SF RB + WR — solid floor/ceiling blend',
        type: 'Mini Stack'
      },
      leverage: {
        team: 'TEN',
        positions: ['QB', 'WR'],
        ownership: 11,
        leverage: 15,
        description: 'TEN low-owned stack enters leverage zone',
        type: 'Leverage Stack'
      }
    },
    NBA: {
      primary: {
        team: 'LAL',
        positions: ['PG', 'SF', 'C'],
        ownership: 32,
        leverage: 8,
        description: 'LAL big 3 stack for high ceiling',
        type: 'Primary Stack'
      },
      mini: {
        team: 'BOS',
        positions: ['SF', 'PF'],
        ownership: 22,
        leverage: 5,
        description: 'BOS duo stack balanced upside',
        type: 'Mini Stack'
      },
      leverage: {
        team: 'IND',
        positions: ['PG', 'C'],
        ownership: 14,
        leverage: 18,
        description: 'IND pace-up stack low ownership',
        type: 'Leverage Stack'
      }
    },
    MLB: {
      primary: {
        team: 'ATL',
        positions: ['SP', 'OF', '1B'],
        ownership: 35,
        leverage: 5,
        description: 'ATL pitcher + bats stack (balanced)',
        type: 'Primary Stack'
      },
      mini: {
        team: 'HOU',
        positions: ['2B', 'OF'],
        ownership: 16,
        leverage: 8,
        description: 'HOU mini-stack value play',
        type: 'Mini Stack'
      },
      leverage: {
        team: 'TEX',
        positions: ['SS', 'OF'],
        ownership: 9,
        leverage: 16,
        description: 'TEX contrarian stack leverage',
        type: 'Leverage Stack'
      }
    }
  }
  return plans[sport] || plans.NFL
}

// Generate LineupIQ summary
function generateLineupIQSummary(sport) {
  const summaries = {
    NFL: `Tonight's slate funnels heavily toward BUF/KC with a projected total of 52.5. Chalk at RB is fragile with injury concerns around McCaffrey and over-pricing on Ekeler. Leverage exists at WR2/WR3 where ownership spreads thin. The best approach is to anchor with one elite QB (Mahomes or Allen), then pivot to mid-tier RBs with strong matchups. Mini-stacks from SF and MIA improve your floor-ceiling balance without over-concentrating in the shootout game. For GPPs, consider fading Kelce's 38% ownership and targeting leverage at TE with Goedert or Hockenson.`,
    NBA: `High-paced slate with multiple blowout risks makes this a nuanced build night. Luka and Giannis are safe anchors, but Jokic's 42% ownership creates a trap scenario if Denver gets ahead early. Value is spread across all positions, with strong plays at SG (Booker, Mitchell) and underpriced bigs (Banchero, Adebayo). Stack approach should focus on pace-up games (IND, SAC) rather than chasing the Lakers' star power. For cash, lock in the top 2-3 studs. For GPP, fade one chalky superstar and load up on 3-4 leverage plays in the $8K-$9K range.`,
    MLB: `Pitcher-friendly slate with scattered offense makes SP selection critical. Strider is the clear ace but at 37% ownership, pivoting to Logan Webb or Pablo López offers solid leverage. Catcher is thin; Will Smith and Realmuto are core, but J.T.'s ownership is lighter. OF has the deepest value pool with Acuña, Tucker, and Arozarena all in play, though Acuña is over-owned vs. a tough righty. Stack strategy tonight should focus on ATL and LAD in the highest total game, with HOU and TEX providing mini-stack leverage. Avoid over-stacking Yankees hitters despite Coors — ownership will be concentrated and pitching matchup is tougher than it appears.`
  }
  return summaries[sport] || summaries.NFL
}

// Generate contest paths
function generateContestPaths(sport) {
  const paths = {
    NFL: {
      cash: {
        core: ['Mahomes', 'Hurts', 'Achane', 'Diggs', 'St. Brown'],
        leverage: [],
        stacks: 'Use safe primary stacks (KC, BUF). Avoid mini-stacks.',
        risk: 'Low — focus on floor projections and safe chalk.'
      },
      singleEntry: {
        core: ['Mahomes', 'Barkley', 'Diggs'],
        leverage: ['Herbert', 'Wilson', 'Goedert'],
        stacks: 'One primary stack + one mini-stack for balance.',
        risk: 'Medium — blend chalk with 2-3 leverage plays.'
      },
      gpp: {
        core: ['Herbert or Jackson'],
        leverage: ['Breece Hall', 'Chris Olave', 'TJ Hockenson'],
        stacks: 'Fade BUF/KC primary. Use SF mini + TEN leverage stack.',
        risk: 'High — heavy leverage, contrarian stacks, low ownership core.'
      }
    },
    NBA: {
      cash: {
        core: ['Luka', 'Giannis', 'Tatum', 'Booker', 'Jokic'],
        leverage: [],
        stacks: 'No stacking needed for cash.',
        risk: 'Low — lock in top 5 projections.'
      },
      singleEntry: {
        core: ['Luka', 'Giannis', 'Tatum'],
        leverage: ['Haliburton', 'Banchero'],
        stacks: 'Use one team stack (LAL or BOS).',
        risk: 'Medium — 3 studs + 2 value/leverage.'
      },
      gpp: {
        core: ['Fade Jokic'],
        leverage: ['Lillard', 'Butler', 'Banchero', 'Edwards'],
        stacks: 'IND pace-up stack for leverage.',
        risk: 'High — fade chalk, target 4-5 leverage plays.'
      }
    },
    MLB: {
      cash: {
        core: ['Strider', 'Will Smith', 'Freeman', 'Acuña'],
        leverage: [],
        stacks: 'ATL primary stack.',
        risk: 'Low — anchor with Strider + ATL bats.'
      },
      singleEntry: {
        core: ['Strider', 'Freeman'],
        leverage: ['Pablo López', 'Altuve', 'Seager'],
        stacks: 'ATL partial + HOU mini.',
        risk: 'Medium — safe ace + value bats.'
      },
      gpp: {
        core: ['Logan Webb (pivot from Strider)'],
        leverage: ['Seager', 'Reynolds', 'Arozarena'],
        stacks: 'TEX leverage stack + scattered OF value.',
        risk: 'High — fade Strider, use contrarian pitcher + bats.'
      }
    }
  }
  return paths[sport] || paths.NFL
}

// Main POST handler
export async function POST(request) {
  try {
    const body = await request.json()
    const { sport = 'NFL', slate = 'Main Slate', site = 'DK' } = body

    // Simulate realistic processing time
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Generate all brainsheet data
    const slateMetrics = generateSlateMetrics(sport)
    const corePlays = generateCorePlays(sport)
    const valueTiers = generateValueTiers(sport)
    const leverageTiers = generateLeverageTiers(sport)
    const chalkMap = generateChalkMap(sport)
    const stackGamePlan = generateStackGamePlan(sport)
    const lineupiqSummary = generateLineupIQSummary(sport)
    const contestPaths = generateContestPaths(sport)

    return NextResponse.json({
      meta: {
        sport,
        slate,
        site,
        timestamp: new Date().toISOString(),
        runId: `brain_${Date.now()}`
      },
      slateMetrics,
      corePlays,
      valueTiers,
      leverageTiers,
      chalkMap,
      stackGamePlan,
      lineupiqSummary,
      contestPaths
    }, { status: 200 })

  } catch (error) {
    console.error('Brainsheet API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate brainsheet' },
      { status: 500 }
    )
  }
}
