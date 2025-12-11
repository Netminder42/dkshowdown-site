import { NextResponse } from 'next/server'

// Mock player data generators for each sport
function generateNFLPlayers() {
  return [
    // QBs
    { id: 'nfl_qb_1', name: 'Patrick Mahomes', team: 'KC', position: 'QB', projection: 24.6, salary: 7800, ownership: 35.2, ceiling: 38.4, floor: 15.2 },
    { id: 'nfl_qb_2', name: 'Josh Allen', team: 'BUF', position: 'QB', projection: 25.4, salary: 8300, ownership: 28.1, ceiling: 40.2, floor: 16.8 },
    { id: 'nfl_qb_3', name: 'Jalen Hurts', team: 'PHI', position: 'QB', projection: 23.8, salary: 7600, ownership: 22.4, ceiling: 36.5, floor: 14.2 },
    { id: 'nfl_qb_4', name: 'Brock Purdy', team: 'SF', position: 'QB', projection: 21.2, salary: 6400, ownership: 14.8, ceiling: 32.1, floor: 12.4 },
    { id: 'nfl_qb_5', name: 'Dak Prescott', team: 'DAL', position: 'QB', projection: 20.8, salary: 6800, ownership: 18.2, ceiling: 31.4, floor: 13.1 },

    // RBs
    { id: 'nfl_rb_1', name: 'Christian McCaffrey', team: 'SF', position: 'RB', projection: 24.2, salary: 9200, ownership: 38.4, ceiling: 35.6, floor: 14.8 },
    { id: 'nfl_rb_2', name: 'Breece Hall', team: 'NYJ', position: 'RB', projection: 18.6, salary: 7400, ownership: 24.2, ceiling: 28.4, floor: 10.2 },
    { id: 'nfl_rb_3', name: 'Jahmyr Gibbs', team: 'DET', position: 'RB', projection: 18.4, salary: 5800, ownership: 22.1, ceiling: 27.2, floor: 9.8 },
    { id: 'nfl_rb_4', name: 'Isiah Pacheco', team: 'KC', position: 'RB', projection: 17.3, salary: 5800, ownership: 15.4, ceiling: 26.1, floor: 8.6 },
    { id: 'nfl_rb_5', name: 'Tony Pollard', team: 'DAL', position: 'RB', projection: 16.8, salary: 6200, ownership: 19.2, ceiling: 24.8, floor: 9.2 },
    { id: 'nfl_rb_6', name: 'Rachaad White', team: 'TB', position: 'RB', projection: 14.8, salary: 5200, ownership: 12.4, ceiling: 22.4, floor: 7.8 },

    // WRs
    { id: 'nfl_wr_1', name: 'Tyreek Hill', team: 'MIA', position: 'WR', projection: 18.6, salary: 8800, ownership: 31.2, ceiling: 28.4, floor: 9.8 },
    { id: 'nfl_wr_2', name: 'Stefon Diggs', team: 'BUF', position: 'WR', projection: 20.1, salary: 7900, ownership: 21.5, ceiling: 30.4, floor: 10.2 },
    { id: 'nfl_wr_3', name: 'Amon-Ra St. Brown', team: 'DET', position: 'WR', projection: 15.4, salary: 7200, ownership: 19.2, ceiling: 24.2, floor: 8.4 },
    { id: 'nfl_wr_4', name: 'CeeDee Lamb', team: 'DAL', position: 'WR', projection: 17.2, salary: 8200, ownership: 28.4, ceiling: 26.8, floor: 9.1 },
    { id: 'nfl_wr_5', name: 'Gabe Davis', team: 'BUF', position: 'WR', projection: 16.0, salary: 5400, ownership: 12.8, ceiling: 28.4, floor: 6.2 },
    { id: 'nfl_wr_6', name: 'DeVonta Smith', team: 'PHI', position: 'WR', projection: 14.2, salary: 6400, ownership: 15.2, ceiling: 22.4, floor: 7.8 },
    { id: 'nfl_wr_7', name: 'Rashee Rice', team: 'KC', position: 'WR', projection: 14.8, salary: 5200, ownership: 11.4, ceiling: 24.2, floor: 6.8 },
    { id: 'nfl_wr_8', name: 'Deebo Samuel', team: 'SF', position: 'WR', projection: 15.8, salary: 6800, ownership: 18.2, ceiling: 24.8, floor: 8.2 },

    // TEs
    { id: 'nfl_te_1', name: 'Travis Kelce', team: 'KC', position: 'TE', projection: 16.8, salary: 7200, ownership: 28.4, ceiling: 26.2, floor: 8.4 },
    { id: 'nfl_te_2', name: 'Mark Andrews', team: 'BAL', position: 'TE', projection: 14.2, salary: 6400, ownership: 18.2, ceiling: 22.4, floor: 7.2 },
    { id: 'nfl_te_3', name: 'George Kittle', team: 'SF', position: 'TE', projection: 13.8, salary: 5800, ownership: 14.8, ceiling: 21.2, floor: 6.8 },
    { id: 'nfl_te_4', name: 'Dallas Goedert', team: 'PHI', position: 'TE', projection: 12.4, salary: 5200, ownership: 12.2, ceiling: 19.4, floor: 6.2 },
  ]
}

function generateNBAPlayers() {
  return [
    // Centers
    { id: 'nba_c_1', name: 'Nikola Jokić', team: 'DEN', position: 'C', projection: 58.2, salary: 11500, ownership: 42.8, ceiling: 75.4, floor: 42.1 },
    { id: 'nba_c_2', name: 'Joel Embiid', team: 'PHI', position: 'C', projection: 56.4, salary: 11200, ownership: 38.2, ceiling: 72.8, floor: 40.2 },
    { id: 'nba_c_3', name: 'Anthony Davis', team: 'LAL', position: 'C', projection: 52.8, salary: 10400, ownership: 34.1, ceiling: 68.4, floor: 38.2 },
    { id: 'nba_c_4', name: 'Bam Adebayo', team: 'MIA', position: 'C', projection: 40.2, salary: 7800, ownership: 19.4, ceiling: 54.2, floor: 28.4 },
    { id: 'nba_c_5', name: 'Domantas Sabonis', team: 'SAC', position: 'C', projection: 44.8, salary: 8600, ownership: 24.2, ceiling: 58.4, floor: 32.1 },

    // Power Forwards
    { id: 'nba_pf_1', name: 'Giannis Antetokounmpo', team: 'MIL', position: 'PF', projection: 56.4, salary: 11800, ownership: 38.4, ceiling: 74.2, floor: 41.2 },
    { id: 'nba_pf_2', name: 'Kevin Durant', team: 'PHX', position: 'PF', projection: 48.6, salary: 9800, ownership: 28.2, ceiling: 64.2, floor: 34.8 },
    { id: 'nba_pf_3', name: 'Paolo Banchero', team: 'ORL', position: 'PF', projection: 42.4, salary: 8200, ownership: 22.4, ceiling: 56.8, floor: 30.2 },

    // Small Forwards
    { id: 'nba_sf_1', name: 'LeBron James', team: 'LAL', position: 'SF', projection: 48.8, salary: 9600, ownership: 32.4, ceiling: 64.2, floor: 35.4 },
    { id: 'nba_sf_2', name: 'Jayson Tatum', team: 'BOS', position: 'SF', projection: 46.2, salary: 9200, ownership: 28.8, ceiling: 61.4, floor: 32.8 },
    { id: 'nba_sf_3', name: 'Kawhi Leonard', team: 'LAC', position: 'SF', projection: 44.8, salary: 8800, ownership: 24.2, ceiling: 59.2, floor: 31.4 },
    { id: 'nba_sf_4', name: 'Jalen Williams', team: 'OKC', position: 'SF', projection: 36.8, salary: 6600, ownership: 14.2, ceiling: 50.4, floor: 24.8 },

    // Shooting Guards
    { id: 'nba_sg_1', name: 'Devin Booker', team: 'PHX', position: 'SG', projection: 44.2, salary: 8800, ownership: 26.4, ceiling: 58.4, floor: 30.8 },
    { id: 'nba_sg_2', name: 'Donovan Mitchell', team: 'CLE', position: 'SG', projection: 42.8, salary: 8400, ownership: 24.2, ceiling: 57.2, floor: 29.4 },
    { id: 'nba_sg_3', name: 'Desmond Bane', team: 'MEM', position: 'SG', projection: 38.6, salary: 6800, ownership: 18.4, ceiling: 52.4, floor: 26.2 },
    { id: 'nba_sg_4', name: 'Jalen Brunson', team: 'NYK', position: 'SG', projection: 41.2, salary: 7800, ownership: 21.8, ceiling: 55.4, floor: 28.4 },

    // Point Guards
    { id: 'nba_pg_1', name: 'Luka Dončić', team: 'DAL', position: 'PG', projection: 54.8, salary: 11200, ownership: 45.2, ceiling: 72.4, floor: 39.8 },
    { id: 'nba_pg_2', name: 'Damian Lillard', team: 'MIL', position: 'PG', projection: 44.8, salary: 8800, ownership: 28.4, ceiling: 60.2, floor: 31.2 },
    { id: 'nba_pg_3', name: 'Tyrese Maxey', team: 'PHI', position: 'PG', projection: 42.8, salary: 7200, ownership: 22.4, ceiling: 58.4, floor: 29.2 },
    { id: 'nba_pg_4', name: 'Trae Young', team: 'ATL', position: 'PG', projection: 46.2, salary: 9200, ownership: 32.4, ceiling: 62.8, floor: 32.4 },
    { id: 'nba_pg_5', name: 'Jordan Poole', team: 'WAS', position: 'PG', projection: 34.2, salary: 6400, ownership: 14.8, ceiling: 50.4, floor: 20.8 },
  ]
}

function generateMLBPlayers() {
  return [
    // Pitchers
    { id: 'mlb_p_1', name: 'Gerrit Cole', team: 'NYY', position: 'P', projection: 18.4, salary: 10200, ownership: 32.4, ceiling: 28.4, floor: 8.2 },
    { id: 'mlb_p_2', name: 'Spencer Strider', team: 'ATL', position: 'P', projection: 19.2, salary: 10800, ownership: 35.8, ceiling: 30.2, floor: 8.8 },
    { id: 'mlb_p_3', name: 'Blake Snell', team: 'SD', position: 'P', projection: 16.8, salary: 9400, ownership: 24.2, ceiling: 26.4, floor: 6.8 },
    { id: 'mlb_p_4', name: 'Logan Webb', team: 'SF', position: 'P', projection: 15.2, salary: 8600, ownership: 18.4, ceiling: 24.2, floor: 6.2 },

    // Catchers
    { id: 'mlb_c_1', name: 'Will Smith', team: 'LAD', position: 'C', projection: 9.8, salary: 4800, ownership: 22.4, ceiling: 16.2, floor: 4.2 },
    { id: 'mlb_c_2', name: 'J.T. Realmuto', team: 'PHI', position: 'C', projection: 10.2, salary: 5200, ownership: 24.8, ceiling: 17.4, floor: 4.8 },
    { id: 'mlb_c_3', name: 'Adley Rutschman', team: 'BAL', position: 'C', projection: 9.4, salary: 4600, ownership: 18.2, ceiling: 15.8, floor: 3.8 },

    // First Base
    { id: 'mlb_1b_1', name: 'Freddie Freeman', team: 'LAD', position: '1B', projection: 11.2, salary: 4900, ownership: 24.2, ceiling: 18.4, floor: 5.2 },
    { id: 'mlb_1b_2', name: 'Matt Olson', team: 'ATL', position: '1B', projection: 10.8, salary: 5200, ownership: 26.8, ceiling: 17.8, floor: 4.8 },
    { id: 'mlb_1b_3', name: 'Pete Alonso', team: 'NYM', position: '1B', projection: 10.2, salary: 4800, ownership: 21.4, ceiling: 17.2, floor: 4.4 },

    // Second Base
    { id: 'mlb_2b_1', name: 'José Altuve', team: 'HOU', position: '2B', projection: 10.4, salary: 5000, ownership: 22.8, ceiling: 17.4, floor: 4.8 },
    { id: 'mlb_2b_2', name: 'Marcus Semien', team: 'TEX', position: '2B', projection: 9.8, salary: 4600, ownership: 18.4, ceiling: 16.2, floor: 4.2 },
    { id: 'mlb_2b_3', name: 'Gleyber Torres', team: 'NYY', position: '2B', projection: 9.2, salary: 4400, ownership: 16.2, ceiling: 15.4, floor: 3.8 },

    // Third Base
    { id: 'mlb_3b_1', name: 'José Ramírez', team: 'CLE', position: '3B', projection: 10.8, salary: 5200, ownership: 24.2, ceiling: 18.2, floor: 4.8 },
    { id: 'mlb_3b_2', name: 'Austin Riley', team: 'ATL', position: '3B', projection: 10.4, salary: 4900, ownership: 22.4, ceiling: 17.4, floor: 4.4 },
    { id: 'mlb_3b_3', name: 'Ryan McMahon', team: 'COL', position: '3B', projection: 9.2, salary: 4400, ownership: 14.8, ceiling: 16.8, floor: 3.2 },

    // Shortstops
    { id: 'mlb_ss_1', name: 'Bobby Witt Jr.', team: 'KC', position: 'SS', projection: 10.8, salary: 5100, ownership: 26.4, ceiling: 18.4, floor: 4.8 },
    { id: 'mlb_ss_2', name: 'Trea Turner', team: 'PHI', position: 'SS', projection: 10.4, salary: 4900, ownership: 23.2, ceiling: 17.8, floor: 4.6 },
    { id: 'mlb_ss_3', name: 'Ezequiel Tovar', team: 'COL', position: 'SS', projection: 9.6, salary: 4200, ownership: 12.4, ceiling: 17.2, floor: 3.4 },

    // Outfielders
    { id: 'mlb_of_1', name: 'Ronald Acuña Jr.', team: 'ATL', position: 'OF', projection: 13.2, salary: 6200, ownership: 35.8, ceiling: 22.4, floor: 6.2 },
    { id: 'mlb_of_2', name: 'Mookie Betts', team: 'LAD', position: 'OF', projection: 11.8, salary: 5800, ownership: 32.4, ceiling: 20.2, floor: 5.4 },
    { id: 'mlb_of_3', name: 'Kyle Tucker', team: 'HOU', position: 'OF', projection: 11.4, salary: 5400, ownership: 28.2, ceiling: 19.4, floor: 5.2 },
    { id: 'mlb_of_4', name: 'Julio Rodríguez', team: 'SEA', position: 'OF', projection: 10.4, salary: 4800, ownership: 22.4, ceiling: 18.2, floor: 4.4 },
    { id: 'mlb_of_5', name: 'Juan Soto', team: 'SD', position: 'OF', projection: 11.2, salary: 5200, ownership: 26.8, ceiling: 19.2, floor: 5.2 },
    { id: 'mlb_of_6', name: 'Mike Trout', team: 'LAA', position: 'OF', projection: 10.8, salary: 5000, ownership: 24.2, ceiling: 18.8, floor: 4.8 },
  ]
}

function getPlayersForSport(sport) {
  switch (sport) {
    case 'NFL':
      return generateNFLPlayers()
    case 'NBA':
      return generateNBAPlayers()
    case 'MLB':
      return generateMLBPlayers()
    default:
      return generateNFLPlayers()
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { sport = 'NFL', site = 'DK', slate = 'Main Slate' } = body

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const players = getPlayersForSport(sport)

    // Calculate value for each player
    const playersWithValue = players.map(player => ({
      ...player,
      value: ((player.projection / player.salary) * 1000).toFixed(2)
    }))

    return NextResponse.json({
      meta: {
        sport,
        site,
        slate,
        playerCount: playersWithValue.length,
        timestamp: new Date().toISOString()
      },
      players: playersWithValue
    }, { status: 200 })

  } catch (error) {
    console.error('Projections API Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to load projections',
        message: 'Temporary issue – please try again.'
      },
      { status: 500 }
    )
  }
}
