import { NextResponse } from 'next/server'

// Mock data generators for realistic DFS sim results
function generateSlateOverview(sport) {
  const sportSpecificGames = {
    NFL: {
      numGames: 11,
      games: [
        { homeTeam: 'KC', awayTeam: 'BUF', total: 52.5 },
        { homeTeam: 'MIA', awayTeam: 'NYJ', total: 48.0 },
        { homeTeam: 'SF', awayTeam: 'LAR', total: 46.5 },
        { homeTeam: 'DAL', awayTeam: 'PHI', total: 45.0 },
        { homeTeam: 'CIN', awayTeam: 'BAL', total: 44.5 }
      ],
      topTeam: { team: 'KC', teamTotal: 28.3 },
      slateType: 'Balanced slate with one standout shootout'
    },
    NBA: {
      numGames: 9,
      games: [
        { homeTeam: 'GSW', awayTeam: 'LAL', total: 232.5 },
        { homeTeam: 'BKN', awayTeam: 'MIA', total: 228.0 },
        { homeTeam: 'DEN', awayTeam: 'PHX', total: 226.5 },
        { homeTeam: 'MIL', awayTeam: 'BOS', total: 224.0 },
        { homeTeam: 'DAL', awayTeam: 'LAC', total: 222.5 }
      ],
      topTeam: { team: 'GSW', teamTotal: 118.4 },
      slateType: 'High-pace slate with multiple shootouts'
    },
    MLB: {
      numGames: 8,
      games: [
        { homeTeam: 'COL', awayTeam: 'LAD', total: 12.5 },
        { homeTeam: 'TEX', awayTeam: 'HOU', total: 10.0 },
        { homeTeam: 'BOS', awayTeam: 'NYY', total: 9.5 },
        { homeTeam: 'ATL', awayTeam: 'PHI', total: 9.0 },
        { homeTeam: 'CHC', awayTeam: 'STL', total: 8.5 }
      ],
      topTeam: { team: 'COL', teamTotal: 6.8 },
      slateType: 'Coors Field anchor with balanced supporting cast'
    }
  }

  const config = sportSpecificGames[sport] || sportSpecificGames.NFL

  return {
    numGames: config.numGames,
    highestTotalGame: config.games[0],
    highestProjectedTeam: config.topTeam,
    slateTypeLabel: config.slateType,
    notes: [
      `${config.games[0].awayTeam} @ ${config.games[0].homeTeam} projects as the clear top game by total.`,
      `${config.numGames - 3} games cluster in the mid-range totals.`
    ],
    gamesByTotal: config.games
  }
}

function generateTopStacks(sport, leverageBias, stackAggressiveness) {
  const sportStacks = {
    NFL: [
      {
        id: 'stack_nfl_1',
        team: 'BUF',
        description: 'Josh Allen + Stefon Diggs + Gabe Davis',
        type: 'Primary Stack: QB + WR + WR',
        projection: 56.2 + (leverageBias * 5),
        combinedOwnership: 27.4 - (leverageBias * 10),
        leverageLabel: leverageBias > 0.6 ? 'High' : leverageBias > 0.3 ? 'Medium' : 'Low',
        bustRiskLabel: stackAggressiveness > 0.6 ? 'High' : 'Medium'
      },
      {
        id: 'stack_nfl_2',
        team: 'KC',
        description: 'Patrick Mahomes + Travis Kelce + Rashee Rice',
        type: 'Primary Stack: QB + TE + WR',
        projection: 54.1 + (leverageBias * 4),
        combinedOwnership: 34.0 - (leverageBias * 8),
        leverageLabel: leverageBias > 0.5 ? 'Medium' : 'Low',
        bustRiskLabel: 'Low'
      },
      {
        id: 'stack_nfl_3',
        team: 'SF',
        description: 'Christian McCaffrey + Deebo Samuel',
        type: 'Secondary Stack: RB + WR',
        projection: 42.8 + (leverageBias * 6),
        combinedOwnership: 18.2 - (leverageBias * 6),
        leverageLabel: 'High',
        bustRiskLabel: 'Medium'
      }
    ],
    NBA: [
      {
        id: 'stack_nba_1',
        team: 'LAL',
        description: 'LeBron James + Anthony Davis + Austin Reaves',
        type: 'Primary Stack: SF + C + PG',
        projection: 128.4 + (leverageBias * 10),
        combinedOwnership: 42.3 - (leverageBias * 15),
        leverageLabel: leverageBias > 0.6 ? 'High' : 'Medium',
        bustRiskLabel: 'Medium'
      },
      {
        id: 'stack_nba_2',
        team: 'GSW',
        description: 'Stephen Curry + Klay Thompson',
        type: 'Duo Stack: PG + SG',
        projection: 88.6 + (leverageBias * 8),
        combinedOwnership: 38.5 - (leverageBias * 12),
        leverageLabel: 'Medium',
        bustRiskLabel: 'High'
      },
      {
        id: 'stack_nba_3',
        team: 'DEN',
        description: 'Nikola Jokić + Jamal Murray',
        type: 'Duo Stack: C + PG',
        projection: 96.2 + (leverageBias * 9),
        combinedOwnership: 28.4 - (leverageBias * 10),
        leverageLabel: 'High',
        bustRiskLabel: 'Medium'
      }
    ],
    MLB: [
      {
        id: 'stack_mlb_1',
        team: 'LAD',
        description: 'Mookie Betts + Freddie Freeman + Will Smith',
        type: 'Primary Stack: 1-2-3 Hitters',
        projection: 28.6 + (leverageBias * 4),
        combinedOwnership: 24.8 - (leverageBias * 8),
        leverageLabel: leverageBias > 0.6 ? 'High' : 'Medium',
        bustRiskLabel: 'Medium'
      },
      {
        id: 'stack_mlb_2',
        team: 'COL',
        description: 'Ezequiel Tovar + Ryan McMahon + Elias Díaz',
        type: 'Coors Stack: 2-3-4 Hitters',
        projection: 26.4 + (leverageBias * 5),
        combinedOwnership: 32.1 - (leverageBias * 10),
        leverageLabel: 'Medium',
        bustRiskLabel: 'Low'
      },
      {
        id: 'stack_mlb_3',
        team: 'ATL',
        description: 'Ronald Acuña Jr. + Matt Olson',
        type: 'Mini Stack: 1-2 Hitters',
        projection: 22.2 + (leverageBias * 6),
        combinedOwnership: 18.6 - (leverageBias * 7),
        leverageLabel: 'High',
        bustRiskLabel: 'Medium'
      }
    ]
  }

  return sportStacks[sport] || sportStacks.NFL
}

function generateKeyPlays(sport, leverageBias, riskLevel) {
  const sportPlays = {
    NFL: {
      core: [
        {
          id: 'player_nfl_core_1',
          name: 'Patrick Mahomes',
          team: 'KC',
          position: 'QB',
          projection: 26.5 + (riskLevel * 3),
          salary: 8200,
          ownership: 35.0 - (leverageBias * 8),
          bustRiskLabel: 'Low'
        },
        {
          id: 'player_nfl_core_2',
          name: 'Christian McCaffrey',
          team: 'SF',
          position: 'RB',
          projection: 24.2 + (riskLevel * 4),
          salary: 9200,
          ownership: 38.0 - (leverageBias * 10),
          bustRiskLabel: 'Low'
        },
        {
          id: 'player_nfl_core_3',
          name: 'Travis Kelce',
          team: 'KC',
          position: 'TE',
          projection: 16.8 + (riskLevel * 2),
          salary: 7200,
          ownership: 28.0 - (leverageBias * 7),
          bustRiskLabel: 'Medium'
        }
      ],
      value: [
        {
          id: 'player_nfl_value_1',
          name: 'Gabe Davis',
          team: 'BUF',
          position: 'WR',
          projection: 16.0 + (riskLevel * 5),
          salary: 5400,
          ownership: 12.0 - (leverageBias * 4),
          bustRiskLabel: 'Medium'
        },
        {
          id: 'player_nfl_value_2',
          name: 'Jahmyr Gibbs',
          team: 'DET',
          position: 'RB',
          projection: 18.4 + (riskLevel * 4),
          salary: 5800,
          ownership: 22.0 - (leverageBias * 6),
          bustRiskLabel: 'Medium'
        },
        {
          id: 'player_nfl_value_3',
          name: 'Brock Purdy',
          team: 'SF',
          position: 'QB',
          projection: 21.2 + (riskLevel * 3),
          salary: 6400,
          ownership: 14.0 - (leverageBias * 5),
          bustRiskLabel: 'Low'
        }
      ],
      leverage: [
        {
          id: 'player_nfl_leverage_1',
          name: 'Isiah Pacheco',
          team: 'KC',
          position: 'RB',
          projection: 17.3 + (riskLevel * 6),
          salary: 5800,
          ownership: 9.0 - (leverageBias * 3),
          bustRiskLabel: 'High'
        },
        {
          id: 'player_nfl_leverage_2',
          name: 'Rashee Rice',
          team: 'KC',
          position: 'WR',
          projection: 14.8 + (riskLevel * 5),
          salary: 5200,
          ownership: 8.0 - (leverageBias * 2),
          bustRiskLabel: 'High'
        },
        {
          id: 'player_nfl_leverage_3',
          name: 'DeVonta Smith',
          team: 'PHI',
          position: 'WR',
          projection: 14.2 + (riskLevel * 4),
          salary: 6400,
          ownership: 9.0 - (leverageBias * 3),
          bustRiskLabel: 'Medium'
        }
      ]
    },
    NBA: {
      core: [
        {
          id: 'player_nba_core_1',
          name: 'Nikola Jokić',
          team: 'DEN',
          position: 'C',
          projection: 58.2 + (riskLevel * 5),
          salary: 11500,
          ownership: 42.0 - (leverageBias * 12),
          bustRiskLabel: 'Low'
        },
        {
          id: 'player_nba_core_2',
          name: 'Luka Dončić',
          team: 'DAL',
          position: 'PG',
          projection: 54.8 + (riskLevel * 6),
          salary: 11200,
          ownership: 45.0 - (leverageBias * 15),
          bustRiskLabel: 'Low'
        },
        {
          id: 'player_nba_core_3',
          name: 'Giannis Antetokounmpo',
          team: 'MIL',
          position: 'PF',
          projection: 56.4 + (riskLevel * 5),
          salary: 11800,
          ownership: 38.0 - (leverageBias * 10),
          bustRiskLabel: 'Low'
        }
      ],
      value: [
        {
          id: 'player_nba_value_1',
          name: 'Tyrese Maxey',
          team: 'PHI',
          position: 'PG',
          projection: 42.8 + (riskLevel * 8),
          salary: 7200,
          ownership: 18.0 - (leverageBias * 6),
          bustRiskLabel: 'Medium'
        },
        {
          id: 'player_nba_value_2',
          name: 'Desmond Bane',
          team: 'MEM',
          position: 'SG',
          projection: 38.6 + (riskLevel * 7),
          salary: 6800,
          ownership: 15.0 - (leverageBias * 5),
          bustRiskLabel: 'Medium'
        },
        {
          id: 'player_nba_value_3',
          name: 'Bam Adebayo',
          team: 'MIA',
          position: 'C',
          projection: 40.2 + (riskLevel * 6),
          salary: 7800,
          ownership: 19.0 - (leverageBias * 7),
          bustRiskLabel: 'Low'
        }
      ],
      leverage: [
        {
          id: 'player_nba_leverage_1',
          name: 'Jordan Poole',
          team: 'WAS',
          position: 'PG',
          projection: 34.2 + (riskLevel * 10),
          salary: 6400,
          ownership: 12.0 - (leverageBias * 4),
          bustRiskLabel: 'High'
        },
        {
          id: 'player_nba_leverage_2',
          name: 'Jalen Williams',
          team: 'OKC',
          position: 'SF',
          projection: 36.8 + (riskLevel * 9),
          salary: 6600,
          ownership: 10.0 - (leverageBias * 3),
          bustRiskLabel: 'High'
        },
        {
          id: 'player_nba_leverage_3',
          name: 'Alperen Şengün',
          team: 'HOU',
          position: 'C',
          projection: 38.4 + (riskLevel * 8),
          salary: 7000,
          ownership: 11.0 - (leverageBias * 4),
          bustRiskLabel: 'Medium'
        }
      ]
    },
    MLB: {
      core: [
        {
          id: 'player_mlb_core_1',
          name: 'Mookie Betts',
          team: 'LAD',
          position: 'OF',
          projection: 11.8 + (riskLevel * 2),
          salary: 5800,
          ownership: 32.0 - (leverageBias * 10),
          bustRiskLabel: 'Low'
        },
        {
          id: 'player_mlb_core_2',
          name: 'Ronald Acuña Jr.',
          team: 'ATL',
          position: 'OF',
          projection: 13.2 + (riskLevel * 3),
          salary: 6200,
          ownership: 35.0 - (leverageBias * 12),
          bustRiskLabel: 'Low'
        },
        {
          id: 'player_mlb_core_3',
          name: 'Shohei Ohtani',
          team: 'LAA',
          position: 'DH',
          projection: 12.4 + (riskLevel * 2.5),
          salary: 5900,
          ownership: 28.0 - (leverageBias * 9),
          bustRiskLabel: 'Low'
        }
      ],
      value: [
        {
          id: 'player_mlb_value_1',
          name: 'Freddie Freeman',
          team: 'LAD',
          position: '1B',
          projection: 11.2 + (riskLevel * 3),
          salary: 4900,
          ownership: 18.0 - (leverageBias * 6),
          bustRiskLabel: 'Medium'
        },
        {
          id: 'player_mlb_value_2',
          name: 'Bobby Witt Jr.',
          team: 'KC',
          position: 'SS',
          projection: 10.8 + (riskLevel * 3.5),
          salary: 5100,
          ownership: 14.0 - (leverageBias * 5),
          bustRiskLabel: 'Medium'
        },
        {
          id: 'player_mlb_value_3',
          name: 'Julio Rodríguez',
          team: 'SEA',
          position: 'OF',
          projection: 10.4 + (riskLevel * 3),
          salary: 4800,
          ownership: 16.0 - (leverageBias * 5),
          bustRiskLabel: 'Medium'
        }
      ],
      leverage: [
        {
          id: 'player_mlb_leverage_1',
          name: 'Ezequiel Tovar',
          team: 'COL',
          position: 'SS',
          projection: 9.6 + (riskLevel * 4),
          salary: 4200,
          ownership: 8.0 - (leverageBias * 2),
          bustRiskLabel: 'High'
        },
        {
          id: 'player_mlb_leverage_2',
          name: 'Ryan McMahon',
          team: 'COL',
          position: '3B',
          projection: 9.2 + (riskLevel * 4.5),
          salary: 4400,
          ownership: 9.0 - (leverageBias * 3),
          bustRiskLabel: 'High'
        },
        {
          id: 'player_mlb_leverage_3',
          name: 'José Ramírez',
          team: 'CLE',
          position: '3B',
          projection: 10.8 + (riskLevel * 3),
          salary: 5200,
          ownership: 10.0 - (leverageBias * 3),
          bustRiskLabel: 'Medium'
        }
      ]
    }
  }

  return sportPlays[sport] || sportPlays.NFL
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Extract parameters with defaults
    const {
      sport = 'NFL',
      site = 'DK',
      slate = 'Main Slate',
      leverageBias = 0.5,
      stackAggressiveness = 0.5,
      riskLevel = 0.5,
      simIntensity = 'standard'
    } = body

    // Simulate processing delay (realistic API behavior)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate mock data
    const slateOverview = generateSlateOverview(sport)
    const topStacks = generateTopStacks(sport, leverageBias, stackAggressiveness)
    const keyPlays = generateKeyPlays(sport, leverageBias, riskLevel)

    // Build response
    const response = {
      meta: {
        sport,
        site,
        slate,
        runId: `sim_${new Date().toISOString()}`,
        runTimestamp: new Date().toISOString(),
        leverageBias,
        stackAggressiveness,
        riskLevel,
        simIntensity
      },
      slateOverview,
      topStacks,
      keyPlays
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('Sim API Error:', error)
    return NextResponse.json(
      {
        error: 'Sim failed',
        message: 'Temporary issue – please try again.'
      },
      { status: 500 }
    )
  }
}
