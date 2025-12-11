import { NextResponse } from 'next/server'

// ============================================================
// NFL SLATE HUB API - V1.1
// Premium NFL research center data generators
// ============================================================

// Generate player carousel images for hero
function generatePlayerCarousel() {
  return [
    {
      id: 1,
      name: 'Patrick Mahomes',
      team: 'KC',
      position: 'QB',
      imageUrl: '/images/nfl/mahomes-action.jpg',
      imageAlt: 'Patrick Mahomes throwing touchdown pass',
      caption: 'Elite QB1 in high-total game environment'
    },
    {
      id: 2,
      name: 'Christian McCaffrey',
      team: 'SF',
      position: 'RB',
      imageUrl: '/images/nfl/cmc-action.jpg',
      imageAlt: 'Christian McCaffrey breaking tackles',
      caption: 'Bell-cow RB with elite PPR upside'
    },
    {
      id: 3,
      name: 'CeeDee Lamb',
      team: 'DAL',
      position: 'WR',
      imageUrl: '/images/nfl/lamb-action.jpg',
      imageAlt: 'CeeDee Lamb catching deep ball',
      caption: 'WR1 with 30%+ target share dominance'
    }
  ]
}

// Generate season stats for key players
function generateSeasonStats() {
  return [
    {
      id: 1,
      name: 'Patrick Mahomes',
      team: 'KC',
      position: 'QB',
      headshot: '🏈',
      fantasyPPG: 23.4,
      passingYPG: 287.3,
      passingTDs: 24,
      rushingYPG: 18.2,
      interceptions: 8,
      completionPct: 68.4,
      redZoneAttempts: 52,
      efficiencyMetric: '8.2 YPA'
    },
    {
      id: 2,
      name: 'Christian McCaffrey',
      team: 'SF',
      position: 'RB',
      headshot: '🏈',
      fantasyPPG: 24.8,
      rushingYPG: 98.2,
      receivingYPG: 42.1,
      totalTDs: 16,
      targets: 68,
      redZoneTouches: 48,
      snapsPct: 78,
      efficiencyMetric: '5.2 YPC'
    },
    {
      id: 3,
      name: 'CeeDee Lamb',
      team: 'DAL',
      position: 'WR',
      headshot: '🏈',
      fantasyPPG: 19.2,
      receivingYPG: 96.4,
      targets: 142,
      receptions: 98,
      TDs: 11,
      targetShare: 31.2,
      redZoneTargets: 24,
      efficiencyMetric: '12.8 Y/R'
    },
    {
      id: 4,
      name: "De'Von Achane",
      team: 'MIA',
      position: 'RB',
      headshot: '🏈',
      fantasyPPG: 18.6,
      rushingYPG: 84.2,
      receivingYPG: 28.4,
      totalTDs: 10,
      targets: 42,
      redZoneTouches: 32,
      snapsPct: 64,
      efficiencyMetric: '6.8 YPC'
    },
    {
      id: 5,
      name: 'Amon-Ra St. Brown',
      team: 'DET',
      position: 'WR',
      headshot: '🏈',
      fantasyPPG: 17.8,
      receivingYPG: 88.2,
      targets: 128,
      receptions: 94,
      TDs: 9,
      targetShare: 28.4,
      redZoneTargets: 18,
      efficiencyMetric: '11.2 Y/R'
    },
    {
      id: 6,
      name: 'Travis Kelce',
      team: 'KC',
      position: 'TE',
      headshot: '🏈',
      fantasyPPG: 12.4,
      receivingYPG: 64.2,
      targets: 86,
      receptions: 62,
      TDs: 6,
      targetShare: 18.2,
      redZoneTargets: 14,
      efficiencyMetric: '10.4 Y/R'
    }
  ]
}

// Generate game logs for key players (last 5 games)
function generateGameLogs() {
  return {
    'Patrick Mahomes': [
      { week: 13, fp: 28.4, snaps: 100, targets: 0, attempts: 38, yards: 342, tds: 3, note: 'Elite efficiency vs blitz' },
      { week: 12, fp: 22.6, snaps: 100, targets: 0, attempts: 32, yards: 268, tds: 2, note: 'Road game, moderate volume' },
      { week: 11, fp: 26.8, snaps: 100, targets: 0, attempts: 36, yards: 312, tds: 3, note: 'Shootout environment' },
      { week: 10, fp: 19.2, snaps: 100, targets: 0, attempts: 28, yards: 224, tds: 1, note: 'Blowout, limited volume' },
      { week: 9, fp: 24.2, snaps: 100, targets: 0, attempts: 34, yards: 298, tds: 2, note: 'Strong home performance' }
    ],
    'Christian McCaffrey': [
      { week: 13, fp: 28.2, snaps: 78, targets: 8, touches: 26, yards: 190, tds: 2, note: 'Bell-cow workload' },
      { week: 12, fp: 24.8, snaps: 72, targets: 6, touches: 22, yards: 168, tds: 1, note: 'Consistent usage' },
      { week: 11, fp: 26.2, snaps: 76, targets: 7, touches: 24, yards: 182, tds: 2, note: 'Elite PPR floor' },
      { week: 10, fp: 26.4, snaps: 74, targets: 9, touches: 25, yards: 186, tds: 1, note: 'Pass-game involved' },
      { week: 9, fp: 22.8, snaps: 68, targets: 5, touches: 20, yards: 154, tds: 1, note: 'Ankle injury concern' }
    ],
    'CeeDee Lamb': [
      { week: 13, fp: 19.8, snaps: 96, targets: 12, touches: 0, yards: 128, tds: 1, note: 'Elite target share' },
      { week: 12, fp: 18.4, snaps: 94, targets: 10, touches: 0, yards: 114, tds: 1, note: 'Primary red zone option' },
      { week: 11, fp: 20.2, snaps: 98, targets: 13, touches: 0, yards: 136, tds: 1, note: 'WR1 volume secure' },
      { week: 10, fp: 17.6, snaps: 92, targets: 9, touches: 0, yards: 98, tds: 1, note: 'Tough coverage matchup' },
      { week: 9, fp: 19.8, snaps: 96, targets: 11, touches: 0, yards: 124, tds: 1, note: 'Consistent production' }
    ]
  }
}

// Generate matchup intelligence (detailed game breakdowns)
function generateMatchupIntelligence() {
  return [
    {
      id: 1,
      homeTeam: 'KC',
      awayTeam: 'BUF',
      vegasTotal: 52.5,
      pace: 'Fast',
      homePassRate: 62,
      awayPassRate: 64,
      defVsQB: { home: 'C', away: 'B' },
      defVsRB: { home: 'B', away: 'C' },
      defVsWR: { home: 'A', away: 'B' },
      defVsTE: { home: 'C', away: 'A' },
      pressureRate: { home: 24, away: 28 },
      coverage: { home: 'Man Heavy', away: 'Zone Mix' },
      weather: { icon: '☀️', description: 'Clear', impact: 'None' },
      keyMatchups: [
        'BUF WRs vs KC secondary (advantage BUF)',
        'KC TE vs BUF LB coverage (advantage KC)'
      ]
    },
    {
      id: 2,
      homeTeam: 'SF',
      awayTeam: 'DAL',
      vegasTotal: 50.0,
      pace: 'Medium',
      homePassRate: 58,
      awayPassRate: 62,
      defVsQB: { home: 'B', away: 'C' },
      defVsRB: { home: 'C', away: 'B' },
      defVsWR: { home: 'A', away: 'B' },
      defVsTE: { home: 'B', away: 'C' },
      pressureRate: { home: 32, away: 26 },
      coverage: { home: 'Zone Heavy', away: 'Man Mix' },
      weather: { icon: '☀️', description: 'Clear', impact: 'None' },
      keyMatchups: [
        'DAL WR1 vs SF CB2 (slight advantage DAL)',
        'SF RB vs DAL run defense (advantage SF)'
      ]
    },
    {
      id: 3,
      homeTeam: 'CIN',
      awayTeam: 'BAL',
      vegasTotal: 48.5,
      pace: 'Medium-High',
      homePassRate: 65,
      awayPassRate: 54,
      defVsQB: { home: 'B', away: 'C' },
      defVsRB: { home: 'C', away: 'B' },
      defVsWR: { home: 'B', away: 'C' },
      defVsTE: { home: 'A', away: 'B' },
      pressureRate: { home: 28, away: 30 },
      coverage: { home: 'Zone Mix', away: 'Man Heavy' },
      weather: { icon: '☀️', description: 'Clear', impact: 'None' },
      keyMatchups: [
        'BAL QB rushing vs CIN run D (advantage BAL)',
        'CIN WRs vs BAL secondary (neutral)'
      ]
    }
  ]
}

// Generate team stats (offensive/defensive rankings)
function generateTeamStats() {
  return [
    {
      team: 'KC',
      offense: {
        epa: 0.18,
        rank: 2,
        pointsPG: 28.4,
        yardsPG: 382.6,
        redZoneEff: 64.2,
        runPassRatio: '38/62',
        explosivePlays: 52
      },
      defense: {
        epa: -0.04,
        rank: 14,
        pointsAllowedPG: 22.8,
        yardsAllowedPG: 348.2,
        redZoneEff: 58.4,
        pressureRate: 24,
        explosivePlaysAllowed: 38
      }
    },
    {
      team: 'SF',
      offense: {
        epa: 0.22,
        rank: 1,
        pointsPG: 30.2,
        yardsPG: 398.4,
        redZoneEff: 68.4,
        runPassRatio: '42/58',
        explosivePlays: 58
      },
      defense: {
        epa: -0.12,
        rank: 3,
        pointsAllowedPG: 18.6,
        yardsAllowedPG: 312.4,
        redZoneEff: 48.2,
        pressureRate: 32,
        explosivePlaysAllowed: 28
      }
    },
    {
      team: 'BUF',
      offense: {
        epa: 0.16,
        rank: 3,
        pointsPG: 27.8,
        yardsPG: 376.2,
        redZoneEff: 62.8,
        runPassRatio: '36/64',
        explosivePlays: 48
      },
      defense: {
        epa: -0.08,
        rank: 8,
        pointsAllowedPG: 20.4,
        yardsAllowedPG: 328.6,
        redZoneEff: 54.2,
        pressureRate: 28,
        explosivePlaysAllowed: 32
      }
    },
    {
      team: 'DAL',
      offense: {
        epa: 0.12,
        rank: 6,
        pointsPG: 26.2,
        yardsPG: 364.8,
        redZoneEff: 58.6,
        runPassRatio: '38/62',
        explosivePlays: 44
      },
      defense: {
        epa: -0.06,
        rank: 12,
        pointsAllowedPG: 21.8,
        yardsAllowedPG: 336.4,
        redZoneEff: 56.8,
        pressureRate: 26,
        explosivePlaysAllowed: 36
      }
    }
  ]
}

// Generate weather & injury hub (consolidated)
function generateWeatherInjuryHub() {
  return [
    {
      game: 'BUF @ KC',
      weather: { icon: '☀️', temp: 48, wind: 8, condition: 'Clear', impact: 'None' },
      injuries: [
        { player: 'Travis Kelce', team: 'KC', position: 'TE', status: 'Questionable', impact: 'Medium', note: 'Limited practice, expected to play' }
      ]
    },
    {
      game: 'DAL @ SF',
      weather: { icon: '☀️', temp: 64, wind: 6, condition: 'Clear', impact: 'None' },
      injuries: [
        { player: 'Deebo Samuel', team: 'SF', position: 'WR', status: 'Probable', impact: 'Low', note: 'Full participant Friday' },
        { player: 'Christian McCaffrey', team: 'SF', position: 'RB', status: 'Questionable', impact: 'High', note: 'Ankle concern, monitor pregame' }
      ]
    },
    {
      game: 'BAL @ CIN',
      weather: { icon: '☀️', temp: 52, wind: 10, condition: 'Clear', impact: 'None' },
      injuries: []
    },
    {
      game: 'PIT @ CLE',
      weather: { icon: '🌧️', temp: 42, wind: 18, condition: 'Rain', impact: 'High - Downgrade passing' },
      injuries: [
        { player: 'Nick Chubb', team: 'CLE', position: 'RB', status: 'Out', impact: 'High', note: 'Knee injury, ruled out' }
      ]
    }
  ]
}

// Generate slate metadata
function generateSlateInfo() {
  return {
    sport: 'NFL',
    slateName: 'Main Slate',
    gameCount: 11,
    startTime: 'Sun 1:00 PM ET',
    site: 'DraftKings',
    salaryCapAvailable: 50000
  }
}

// Generate featured games (top 3 most important)
function generateFeaturedGames() {
  return [
    {
      id: 1,
      homeTeam: { code: 'KC', name: 'Chiefs', logo: '🏈' },
      awayTeam: { code: 'BUF', name: 'Bills', logo: '🏈' },
      vegasTotal: 52.5,
      spread: 'KC -2.5',
      homeImplied: 27.5,
      awayImplied: 25.0,
      paceIndicator: 'High',
      paceNote: 'Both teams top-5 in plays/game',
      weather: { condition: 'Clear', icon: '☀️', impact: 'None' },
      injuries: [
        { player: 'Travis Kelce', position: 'TE', status: 'Questionable', impact: 'Medium' }
      ],
      keyNote: 'Highest projected total on slate'
    },
    {
      id: 2,
      homeTeam: { code: 'SF', name: '49ers', logo: '🏈' },
      awayTeam: { code: 'DAL', name: 'Cowboys', logo: '🏈' },
      vegasTotal: 50.0,
      spread: 'SF -6.5',
      homeImplied: 28.3,
      awayImplied: 21.8,
      paceIndicator: 'Medium',
      paceNote: 'SF runs slower, DAL neutral',
      weather: { condition: 'Clear', icon: '☀️', impact: 'None' },
      injuries: [
        { player: 'Deebo Samuel', position: 'WR', status: 'Probable', impact: 'Low' }
      ],
      keyNote: 'SF pass funnel creates WR upside'
    },
    {
      id: 3,
      homeTeam: { code: 'CIN', name: 'Bengals', logo: '🏈' },
      awayTeam: { code: 'BAL', name: 'Ravens', logo: '🏈' },
      vegasTotal: 48.5,
      spread: 'BAL -3.5',
      homeImplied: 22.5,
      awayImplied: 26.0,
      paceIndicator: 'Medium-High',
      paceNote: 'BAL runs fast-paced offense',
      weather: { condition: 'Clear', icon: '☀️', impact: 'None' },
      injuries: [],
      keyNote: 'Lamar Jackson leverage spot vs low ownership'
    }
  ]
}

// Generate slate headlines (news ticker)
function generateSlateHeadlines() {
  return [
    { id: 1, text: 'Travis Kelce limited in practice — expected to play', severity: 'medium', timestamp: '2 hours ago' },
    { id: 2, text: 'Stefon Diggs upgraded to probable, full participant Friday', severity: 'positive', timestamp: '4 hours ago' },
    { id: 3, text: 'Rain expected in Cleveland — downgrade passing volume', severity: 'high', timestamp: '5 hours ago' },
    { id: 4, text: 'Christian McCaffrey questionable with ankle — monitor closely', severity: 'high', timestamp: '6 hours ago' },
    { id: 5, text: 'Amon-Ra St. Brown cleared, no injury designation', severity: 'positive', timestamp: '8 hours ago' }
  ]
}

// Generate core plays preview
function generateCorePlays() {
  return [
    { id: 1, name: 'Patrick Mahomes', position: 'QB', team: 'KC', salary: 8400, projection: 24.6, ownership: 32.4 },
    { id: 2, name: "De'Von Achane", position: 'RB', team: 'MIA', salary: 7800, projection: 19.2, ownership: 28.7 },
    { id: 3, name: 'Amon-Ra St. Brown', position: 'WR', team: 'DET', salary: 8200, projection: 18.4, ownership: 35.2 },
    { id: 4, name: 'Stefon Diggs', position: 'WR', team: 'BUF', salary: 7600, projection: 16.8, ownership: 24.1 },
    { id: 5, name: 'Travis Kelce', position: 'TE', team: 'KC', salary: 7000, projection: 14.6, ownership: 38.4 },
    { id: 6, name: 'CeeDee Lamb', position: 'WR', team: 'DAL', salary: 8600, projection: 19.1, ownership: 29.8 }
  ]
}

// Generate last week's performance data
function generateLastWeekPerformance() {
  return [
    {
      id: 1,
      name: 'Patrick Mahomes',
      position: 'QB',
      team: 'KC',
      fantasyPoints: 28.4,
      snapsPercent: 100,
      touches: 0,
      targets: 0,
      attempts: 38,
      completions: 28,
      passYards: 342,
      passTDs: 3,
      rushYards: 12,
      redZoneUse: 'High — 3 red zone pass TDs',
      matchupResult: 'W 31-24 vs LAC',
      efficiencyNote: '73.7% completion rate, elite efficiency vs blitz'
    },
    {
      id: 2,
      name: "De'Von Achane",
      position: 'RB',
      team: 'MIA',
      fantasyPoints: 24.8,
      snapsPercent: 67,
      touches: 22,
      targets: 6,
      rushAttempts: 16,
      rushYards: 112,
      rushTDs: 1,
      receptions: 5,
      recYards: 48,
      redZoneUse: 'Very High — 6 red zone touches',
      matchupResult: 'W 34-20 vs NE',
      efficiencyNote: '7.0 YPC, 100% catch rate on targets'
    },
    {
      id: 3,
      name: 'Amon-Ra St. Brown',
      position: 'WR',
      team: 'DET',
      fantasyPoints: 21.6,
      snapsPercent: 94,
      touches: 0,
      targets: 11,
      receptions: 9,
      recYards: 116,
      recTDs: 1,
      redZoneUse: 'High — 3 red zone targets',
      matchupResult: 'W 28-21 vs GB',
      efficiencyNote: '81.8% target share, 12.9 yards per reception'
    },
    {
      id: 4,
      name: 'Travis Kelce',
      position: 'TE',
      team: 'KC',
      fantasyPoints: 12.4,
      snapsPercent: 88,
      touches: 0,
      targets: 7,
      receptions: 5,
      recYards: 64,
      recTDs: 0,
      redZoneUse: 'Medium — 2 red zone targets',
      matchupResult: 'W 31-24 vs LAC',
      efficiencyNote: 'Limited route tree, declining target share vs peak years'
    },
    {
      id: 5,
      name: 'Stefon Diggs',
      position: 'WR',
      team: 'BUF',
      fantasyPoints: 18.2,
      snapsPercent: 92,
      touches: 0,
      targets: 9,
      receptions: 7,
      recYards: 102,
      recTDs: 1,
      redZoneUse: 'High — 2 red zone targets including TD',
      matchupResult: 'W 27-17 vs NYJ',
      efficiencyNote: '77.8% catch rate, deep ball connection with Allen'
    },
    {
      id: 6,
      name: 'CeeDee Lamb',
      position: 'WR',
      team: 'DAL',
      fantasyPoints: 19.8,
      snapsPercent: 96,
      touches: 0,
      targets: 12,
      receptions: 9,
      recYards: 128,
      recTDs: 1,
      redZoneUse: 'Very High — 4 red zone targets',
      matchupResult: 'W 31-28 vs PHI',
      efficiencyNote: 'Elite target share (31%), primary red zone option'
    },
    {
      id: 7,
      name: 'Lamar Jackson',
      position: 'QB',
      team: 'BAL',
      fantasyPoints: 26.8,
      snapsPercent: 100,
      touches: 0,
      targets: 0,
      attempts: 32,
      completions: 24,
      passYards: 278,
      passTDs: 2,
      rushAttempts: 12,
      rushYards: 86,
      rushTDs: 1,
      redZoneUse: 'High — dual-threat in red zone',
      matchupResult: 'W 34-20 vs CLE',
      efficiencyNote: 'Elite rushing floor (12 attempts), 75% completion rate'
    },
    {
      id: 8,
      name: 'Christian McCaffrey',
      position: 'RB',
      team: 'SF',
      fantasyPoints: 28.2,
      snapsPercent: 78,
      touches: 26,
      targets: 8,
      rushAttempts: 18,
      rushYards: 118,
      rushTDs: 1,
      receptions: 7,
      recYards: 72,
      recTDs: 1,
      redZoneUse: 'Elite — 8 red zone touches',
      matchupResult: 'W 35-17 vs ARI',
      efficiencyNote: 'Bell-cow usage, elite PPR floor + ceiling'
    }
  ]
}

// Generate recent form (3-5 game trends)
function generateRecentForm() {
  return [
    {
      id: 1,
      name: 'Patrick Mahomes',
      position: 'QB',
      team: 'KC',
      games: 5,
      avgFantasyPoints: 24.2,
      trend: 'Heating Up',
      trendIndicator: '↑',
      recentScores: [28.4, 22.6, 26.8, 19.2, 24.2],
      usageStability: 'Very Stable',
      note: 'Elite floor, increasing TD rate last 3 games'
    },
    {
      id: 2,
      name: "De'Von Achane",
      position: 'RB',
      team: 'MIA',
      games: 5,
      avgFantasyPoints: 19.8,
      trend: 'Steady',
      trendIndicator: '→',
      recentScores: [24.8, 18.2, 16.4, 22.1, 17.6],
      usageStability: 'Stable',
      note: 'Consistent 60-70% snap share, goal-line role secure'
    },
    {
      id: 3,
      name: 'Amon-Ra St. Brown',
      position: 'WR',
      team: 'DET',
      games: 5,
      avgFantasyPoints: 18.6,
      trend: 'Steady',
      trendIndicator: '→',
      recentScores: [21.6, 17.4, 19.2, 16.8, 18.2],
      usageStability: 'Very Stable',
      note: 'Locked-in WR1, consistent 9-11 targets per game'
    },
    {
      id: 4,
      name: 'Travis Kelce',
      position: 'TE',
      team: 'KC',
      games: 5,
      avgFantasyPoints: 11.4,
      trend: 'Cooling Off',
      trendIndicator: '↓',
      recentScores: [12.4, 9.6, 14.2, 8.8, 12.2],
      usageStability: 'Declining',
      note: 'Target share declining, route tree limited vs prior years'
    },
    {
      id: 5,
      name: 'Stefon Diggs',
      position: 'WR',
      team: 'BUF',
      games: 5,
      avgFantasyPoints: 16.8,
      trend: 'Heating Up',
      trendIndicator: '↑',
      recentScores: [18.2, 14.6, 19.4, 12.8, 18.8],
      usageStability: 'Stable',
      note: 'Red zone usage increasing, deep ball connection strong'
    },
    {
      id: 6,
      name: 'CeeDee Lamb',
      position: 'WR',
      team: 'DAL',
      games: 5,
      avgFantasyPoints: 19.2,
      trend: 'Steady',
      trendIndicator: '→',
      recentScores: [19.8, 18.4, 20.2, 17.6, 19.8],
      usageStability: 'Very Stable',
      note: 'Elite target share (28-32%), primary red zone weapon'
    },
    {
      id: 7,
      name: 'Lamar Jackson',
      position: 'QB',
      team: 'BAL',
      games: 5,
      avgFantasyPoints: 24.8,
      trend: 'Heating Up',
      trendIndicator: '↑',
      recentScores: [26.8, 22.4, 28.2, 18.6, 27.8],
      usageStability: 'Very Stable',
      note: 'Rushing floor elite (10+ attempts), dual-threat upside'
    },
    {
      id: 8,
      name: 'Christian McCaffrey',
      position: 'RB',
      team: 'SF',
      games: 4,
      avgFantasyPoints: 26.4,
      trend: 'Steady',
      trendIndicator: '→',
      recentScores: [28.2, 24.8, 26.2, 26.4],
      usageStability: 'Very Stable',
      note: 'Bell-cow usage, ankle injury monitor closely'
    }
  ]
}

// Generate game-level stats for all 11 games
function generateGameLevelStats() {
  return [
    {
      id: 1,
      homeTeam: 'KC',
      awayTeam: 'BUF',
      vegasTotal: 52.5,
      spread: 'KC -2.5',
      paceProjection: 'High',
      homePassRate: 62,
      awayPassRate: 64,
      homeRunRate: 38,
      awayRunRate: 36,
      defVsQB: { home: 'C', away: 'B' },
      defVsRB: { home: 'B', away: 'C' },
      defVsWR: { home: 'A', away: 'B' },
      defVsTE: { home: 'C', away: 'A' },
      weather: 'Clear',
      keyInjuries: ['Travis Kelce (Q) — KC TE'],
      notes: 'Highest total on slate, shootout potential, both offenses elite'
    },
    {
      id: 2,
      homeTeam: 'SF',
      awayTeam: 'DAL',
      vegasTotal: 50.0,
      spread: 'SF -6.5',
      paceProjection: 'Medium',
      homePassRate: 58,
      awayPassRate: 62,
      homeRunRate: 42,
      awayRunRate: 38,
      defVsQB: { home: 'B', away: 'C' },
      defVsRB: { home: 'C', away: 'B' },
      defVsWR: { home: 'A', away: 'B' },
      defVsTE: { home: 'B', away: 'C' },
      weather: 'Clear',
      keyInjuries: ['Deebo Samuel (P) — SF WR', 'Christian McCaffrey (Q) — SF RB'],
      notes: 'SF pass funnel, DAL likely pass-heavy if trailing'
    },
    {
      id: 3,
      homeTeam: 'CIN',
      awayTeam: 'BAL',
      vegasTotal: 48.5,
      spread: 'BAL -3.5',
      paceProjection: 'Medium-High',
      homePassRate: 65,
      awayPassRate: 54,
      homeRunRate: 35,
      awayRunRate: 46,
      defVsQB: { home: 'B', away: 'C' },
      defVsRB: { home: 'C', away: 'B' },
      defVsWR: { home: 'B', away: 'C' },
      defVsTE: { home: 'A', away: 'B' },
      weather: 'Clear',
      keyInjuries: [],
      notes: 'Lamar Jackson leverage spot, CIN funnels to passing'
    },
    {
      id: 4,
      homeTeam: 'DET',
      awayTeam: 'GB',
      vegasTotal: 47.5,
      spread: 'DET -3.5',
      paceProjection: 'Medium-High',
      homePassRate: 60,
      awayPassRate: 58,
      homeRunRate: 40,
      awayRunRate: 42,
      defVsQB: { home: 'C', away: 'B' },
      defVsRB: { home: 'B', away: 'C' },
      defVsWR: { home: 'B', away: 'B' },
      defVsTE: { home: 'B', away: 'C' },
      weather: 'Clear',
      keyInjuries: [],
      notes: 'Balanced game, DET pass volume high, GB RB committee concern'
    },
    {
      id: 5,
      homeTeam: 'MIA',
      awayTeam: 'NE',
      vegasTotal: 46.0,
      spread: 'MIA -7.5',
      paceProjection: 'High',
      homePassRate: 64,
      awayPassRate: 52,
      homeRunRate: 36,
      awayRunRate: 48,
      defVsQB: { home: 'C', away: 'A' },
      defVsRB: { home: 'B', away: 'C' },
      defVsWR: { home: 'A', away: 'B' },
      defVsTE: { home: 'B', away: 'B' },
      weather: 'Clear',
      keyInjuries: [],
      notes: 'MIA blowout risk lowers ceiling, but Achane safe in game script'
    },
    {
      id: 6,
      homeTeam: 'PHI',
      awayTeam: 'NYG',
      vegasTotal: 45.5,
      spread: 'PHI -9.5',
      paceProjection: 'Medium',
      homePassRate: 56,
      awayPassRate: 60,
      homeRunRate: 44,
      awayRunRate: 40,
      defVsQB: { home: 'C', away: 'B' },
      defVsRB: { home: 'A', away: 'C' },
      defVsWR: { home: 'B', away: 'C' },
      defVsTE: { home: 'C', away: 'B' },
      weather: 'Clear',
      keyInjuries: [],
      notes: 'PHI run-heavy if leading, NYG pass volume high if trailing'
    },
    {
      id: 7,
      homeTeam: 'LAC',
      awayTeam: 'LV',
      vegasTotal: 44.5,
      spread: 'LAC -6.5',
      paceProjection: 'Medium',
      homePassRate: 62,
      awayPassRate: 58,
      homeRunRate: 38,
      awayRunRate: 42,
      defVsQB: { home: 'B', away: 'C' },
      defVsRB: { home: 'C', away: 'B' },
      defVsWR: { home: 'B', away: 'B' },
      defVsTE: { home: 'A', away: 'C' },
      weather: 'Clear',
      keyInjuries: [],
      notes: 'Herbert value play, LAC pass volume steady'
    },
    {
      id: 8,
      homeTeam: 'SEA',
      awayTeam: 'ARI',
      vegasTotal: 43.5,
      spread: 'SEA -4.5',
      paceProjection: 'Medium',
      homePassRate: 60,
      awayPassRate: 62,
      homeRunRate: 40,
      awayRunRate: 38,
      defVsQB: { home: 'C', away: 'C' },
      defVsRB: { home: 'B', away: 'B' },
      defVsWR: { home: 'B', away: 'B' },
      defVsTE: { home: 'C', away: 'C' },
      weather: 'Clear',
      keyInjuries: [],
      notes: 'Balanced game, both teams neutral matchups'
    },
    {
      id: 9,
      homeTeam: 'CLE',
      awayTeam: 'PIT',
      vegasTotal: 38.5,
      spread: 'CLE -2.5',
      paceProjection: 'Low',
      homePassRate: 54,
      awayPassRate: 52,
      homeRunRate: 46,
      awayRunRate: 48,
      defVsQB: { home: 'B', away: 'A' },
      defVsRB: { home: 'B', away: 'B' },
      defVsWR: { home: 'C', away: 'C' },
      defVsTE: { home: 'B', away: 'B' },
      weather: 'Rain',
      keyInjuries: [],
      notes: 'Rain expected — downgrade passing, low total, ugly game script'
    },
    {
      id: 10,
      homeTeam: 'TB',
      awayTeam: 'ATL',
      vegasTotal: 42.5,
      spread: 'TB -3.5',
      paceProjection: 'Medium',
      homePassRate: 64,
      awayPassRate: 60,
      homeRunRate: 36,
      awayRunRate: 40,
      defVsQB: { home: 'C', away: 'B' },
      defVsRB: { home: 'C', away: 'C' },
      defVsWR: { home: 'B', away: 'B' },
      defVsTE: { home: 'B', away: 'A' },
      weather: 'Clear',
      keyInjuries: [],
      notes: 'TB pass-heavy offense, ATL TE funnel strong'
    },
    {
      id: 11,
      homeTeam: 'NO',
      awayTeam: 'CAR',
      vegasTotal: 40.5,
      spread: 'NO -5.5',
      paceProjection: 'Low',
      homePassRate: 58,
      awayPassRate: 56,
      homeRunRate: 42,
      awayRunRate: 44,
      defVsQB: { home: 'B', away: 'C' },
      defVsRB: { home: 'C', away: 'C' },
      defVsWR: { home: 'B', away: 'C' },
      defVsTE: { home: 'C', away: 'B' },
      weather: 'Clear',
      keyInjuries: [],
      notes: 'Low total, avoid game entirely unless desperate'
    }
  ]
}

// Generate value watchlist
function generateValueWatchlist() {
  return {
    tier1: [
      { name: 'Justin Herbert', position: 'QB', team: 'LAC', salary: 6800, projection: 21.2, value: 3.12, ownership: 12.4, reason: 'Under-priced vs pass-funnel defense' },
      { name: 'Bijan Robinson', position: 'RB', team: 'ATL', salary: 6400, projection: 17.8, value: 2.78, ownership: 14.2, reason: 'Bell-cow usage, low ownership' },
      { name: 'Jaylen Waddle', position: 'WR', team: 'MIA', salary: 6200, projection: 15.4, value: 2.48, ownership: 16.8, reason: 'High target share, cheap vs Tyreek' }
    ],
    tier2: [
      { name: 'Tua Tagovailoa', position: 'QB', team: 'MIA', salary: 6400, projection: 19.8, value: 3.09, ownership: 10.2, reason: 'Fast pace, high pass volume' },
      { name: 'David Njoku', position: 'TE', team: 'CLE', salary: 4800, projection: 11.2, value: 2.33, ownership: 8.4, reason: 'Primary red zone target despite rain' },
      { name: 'Marquise Brown', position: 'WR', team: 'ARI', salary: 5400, projection: 13.2, value: 2.44, ownership: 9.6, reason: 'Volume play in pass-heavy offense' }
    ]
  }
}

// Generate leverage watchlist
function generateLeverageWatchlist() {
  return [
    {
      name: 'Lamar Jackson',
      position: 'QB',
      team: 'BAL',
      salary: 7800,
      projection: 24.8,
      ownership: 15.2,
      leverage: 9.6,
      advantage: '+9.6% advantage',
      reason: 'Elite ceiling, rushing floor, low ownership vs Mahomes/Burrow chalk'
    },
    {
      name: 'Kenneth Walker III',
      position: 'RB',
      team: 'SEA',
      salary: 7200,
      projection: 18.6,
      ownership: 11.4,
      leverage: 7.2,
      advantage: '+7.2% advantage',
      reason: 'Goal-line role, pass-game usage increasing, underpriced'
    },
    {
      name: 'Garrett Wilson',
      position: 'WR',
      team: 'NYJ',
      salary: 6800,
      projection: 16.2,
      ownership: 9.8,
      leverage: 6.4,
      advantage: '+6.4% advantage',
      reason: 'Elite target share, low ownership, ceiling game vs weak secondary'
    },
    {
      name: 'T.J. Hockenson',
      position: 'TE',
      team: 'MIN',
      salary: 5600,
      projection: 12.8,
      ownership: 7.2,
      leverage: 5.6,
      advantage: '+5.6% advantage',
      reason: 'Primary red zone weapon, low ownership vs Kelce/Andrews chalk'
    }
  ]
}

// Generate chalk map
function generateChalkMap() {
  return {
    safeChalk: [
      {
        name: 'Patrick Mahomes',
        position: 'QB',
        team: 'KC',
        projection: 24.6,
        ownership: 32.4,
        trapRisk: 'Low',
        reason: 'Elite floor, highest total on slate, safe game environment'
      },
      {
        name: 'Amon-Ra St. Brown',
        position: 'WR',
        team: 'DET',
        projection: 18.4,
        ownership: 35.2,
        trapRisk: 'Low',
        reason: 'Locked-in target share, consistent usage, safe floor'
      },
      {
        name: 'CeeDee Lamb',
        position: 'WR',
        team: 'DAL',
        projection: 19.1,
        ownership: 29.8,
        trapRisk: 'Low',
        reason: 'Elite target share (30%), primary red zone weapon'
      },
      {
        name: "De'Von Achane",
        position: 'RB',
        team: 'MIA',
        projection: 19.2,
        ownership: 28.7,
        trapRisk: 'Low',
        reason: 'Bell-cow usage, safe game script, goal-line role'
      }
    ],
    riskyChalk: [
      {
        name: 'Travis Kelce',
        position: 'TE',
        team: 'KC',
        projection: 14.6,
        ownership: 38.4,
        trapRisk: 'High',
        reason: 'Over-priced, declining target share, injury concern, limited route tree'
      },
      {
        name: 'Christian McCaffrey',
        position: 'RB',
        team: 'SF',
        projection: 26.2,
        ownership: 42.8,
        trapRisk: 'High',
        reason: 'Ankle injury questionable, blowout risk lowers ceiling, over-priced'
      },
      {
        name: 'Josh Allen',
        position: 'QB',
        team: 'BUF',
        projection: 23.8,
        ownership: 26.4,
        trapRisk: 'Medium',
        reason: 'High total game but ownership high, negative game script risk if trailing'
      },
      {
        name: 'Tyreek Hill',
        position: 'WR',
        team: 'MIA',
        projection: 17.8,
        ownership: 31.2,
        trapRisk: 'Medium',
        reason: 'Blowout risk lowers ceiling, cheaper MIA stack options exist (Waddle)'
      }
    ]
  }
}

// Generate stack preview cards
function generateStackPreviews() {
  return {
    primary: {
      id: 1,
      type: 'Primary Stack',
      team: 'KC',
      positions: ['QB', 'WR', 'TE'],
      players: ['Patrick Mahomes', 'Rashee Rice', 'Travis Kelce'],
      ownership: 28.4,
      leverage: 11.2,
      description: 'KC QB + WR + TE with BUF bringback (High Upside)',
      note: 'Highest total on slate, shootout potential, elite correlation',
      vegasTotal: 52.5,
      stackGrade: 'A'
    },
    mini: {
      id: 2,
      type: 'Mini Stack',
      team: 'SF',
      positions: ['QB', 'WR'],
      players: ['Brock Purdy', 'Brandon Aiyuk'],
      ownership: 14.6,
      leverage: 6.8,
      description: 'SF QB + WR mini-stack (Balanced)',
      note: 'Pass-funnel matchup, lower ownership than full stack',
      vegasTotal: 50.0,
      stackGrade: 'B+'
    },
    leverage: {
      id: 3,
      type: 'Leverage Stack',
      team: 'BAL',
      positions: ['QB', 'WR'],
      players: ['Lamar Jackson', 'Zay Flowers'],
      ownership: 9.2,
      leverage: 14.8,
      description: 'BAL QB + WR leverage stack (Contrarian)',
      note: 'Low ownership vs Mahomes chalk, dual-threat upside',
      vegasTotal: 48.5,
      stackGrade: 'A-'
    }
  }
}

// Generate LineupIQ narrative summary
function generateLineupIQSummary() {
  return `Tonight's NFL Main Slate centers around three key game environments: BUF/KC (52.5 total), SF/DAL (50.0 total), and BAL/CIN (48.5 total). The chalk is concentrated heavily at TE (Kelce 38%), WR (St. Brown 35%, Lamb 30%), and QB (Mahomes 32%), creating clear leverage opportunities at RB and contrarian QB/WR stacks.

The RB position is fragile with Christian McCaffrey's ankle injury creating uncertainty in the highest-priced tier. De'Von Achane is the safest chalk RB with bell-cow usage and secure game script, but lower-owned options like Bijan Robinson and Kenneth Walker III offer leverage paths with similar upside at reduced ownership.

WR presents the deepest value tier on the slate. While St. Brown and Lamb are safe, their ownership levels (35%+ and 30%) create risk in GPP formats. Pivoting to Justin Jefferson, Garrett Wilson, or Jaylen Waddle provides similar projection ranges with 15-20% lower ownership, opening differentiated lineup structures.

The mini-stack from SF (Purdy + Aiyuk/Deebo) and the leverage stack from BAL (Lamar + Zay Flowers) are the two highest-upside contrarian approaches. Both games feature pass-funnel matchups and lower ownership than the obvious KC primary stack, making them ideal for large-field GPP tournaments where differentiation is critical.

Weather concerns in Cleveland downgrade the CLE/PIT game entirely—avoid unless desperate for salary relief. The MIA/NE game carries blowout risk that caps ceiling but provides safe floor plays (Achane, Waddle) for cash formats.`
}

// Generate contest-specific paths
function generateContestPaths() {
  return {
    cash: {
      format: 'Cash Games (50/50, Double-Ups)',
      coreList: ['Patrick Mahomes', 'De\'Von Achane', 'Amon-Ra St. Brown', 'CeeDee Lamb', 'Stefon Diggs'],
      leverageList: [],
      stackStrategy: 'Use safe primary stacks (KC, SF). Avoid mini-stacks and leverage stacks. Focus on correlation in high-total games.',
      riskLevel: 'Low',
      guidance: 'Prioritize floor projections and safe chalk. Target players with consistent usage and secure game scripts. Avoid injury-questionable players and low-total games entirely.'
    },
    singleEntry: {
      format: 'Single Entry / 3-Max',
      coreList: ['Patrick Mahomes', 'Amon-Ra St. Brown', 'De\'Von Achane'],
      leverageList: ['Lamar Jackson', 'Garrett Wilson', 'Kenneth Walker III'],
      stackStrategy: 'Balance safe primary stack (KC) with one mini-stack (SF) or leverage play (Lamar). Differentiate with 1-2 low-owned value plays.',
      riskLevel: 'Medium',
      guidance: 'Build around 3-4 core plays, then differentiate with leverage spots at RB/WR. Use mini-stacks to balance safety and differentiation. Avoid full contrarian builds.'
    },
    gpp: {
      format: 'Large-Field GPP',
      coreList: ['Lamar Jackson', 'Kenneth Walker III', 'Garrett Wilson'],
      leverageList: ['Brock Purdy', 'Zay Flowers', 'T.J. Hockenson', 'Bijan Robinson'],
      stackStrategy: 'Use contrarian leverage stacks (BAL, SF mini-stack). Pair with low-owned value plays. Avoid Mahomes + Kelce + St. Brown chalk concentration.',
      riskLevel: 'High',
      guidance: 'Prioritize ceiling projections and leverage advantage. Target players with 8-15% ownership and elite upside. Use game stacks from lower-owned games (BAL/CIN, SF/DAL). Fade chalk RBs (McCaffrey injury risk, Achane blowout risk).'
    }
  }
}

// Generate player pool for search
function generatePlayerPool() {
  return [
    { id: 1, name: 'Patrick Mahomes', position: 'QB', team: 'KC', salary: 8400, projection: 24.6, ownership: 32.4, opponent: 'BUF' },
    { id: 2, name: 'Josh Allen', position: 'QB', team: 'BUF', salary: 8200, projection: 23.8, ownership: 26.4, opponent: '@KC' },
    { id: 3, name: 'Lamar Jackson', position: 'QB', team: 'BAL', salary: 7800, projection: 24.8, ownership: 15.2, opponent: '@CIN' },
    { id: 4, name: 'Justin Herbert', position: 'QB', team: 'LAC', salary: 6800, projection: 21.2, ownership: 12.4, opponent: 'LV' },
    { id: 5, name: 'Christian McCaffrey', position: 'RB', team: 'SF', salary: 9200, projection: 26.2, ownership: 42.8, opponent: 'DAL', injuryStatus: 'Questionable' },
    { id: 6, name: "De'Von Achane", position: 'RB', team: 'MIA', salary: 7800, projection: 19.2, ownership: 28.7, opponent: 'NE' },
    { id: 7, name: 'Bijan Robinson', position: 'RB', team: 'ATL', salary: 6400, projection: 17.8, ownership: 14.2, opponent: '@TB' },
    { id: 8, name: 'Kenneth Walker III', position: 'RB', team: 'SEA', salary: 7200, projection: 18.6, ownership: 11.4, opponent: 'ARI' },
    { id: 9, name: 'Amon-Ra St. Brown', position: 'WR', team: 'DET', salary: 8200, projection: 18.4, ownership: 35.2, opponent: 'GB' },
    { id: 10, name: 'CeeDee Lamb', position: 'WR', team: 'DAL', salary: 8600, projection: 19.1, ownership: 29.8, opponent: '@SF' },
    { id: 11, name: 'Stefon Diggs', position: 'WR', team: 'BUF', salary: 7600, projection: 16.8, ownership: 24.1, opponent: '@KC' },
    { id: 12, name: 'Tyreek Hill', position: 'WR', team: 'MIA', salary: 8800, projection: 17.8, ownership: 31.2, opponent: 'NE' },
    { id: 13, name: 'Jaylen Waddle', position: 'WR', team: 'MIA', salary: 6200, projection: 15.4, ownership: 16.8, opponent: 'NE' },
    { id: 14, name: 'Garrett Wilson', position: 'WR', team: 'NYJ', salary: 6800, projection: 16.2, ownership: 9.8, opponent: 'TEN' },
    { id: 15, name: 'Travis Kelce', position: 'TE', team: 'KC', salary: 7000, projection: 14.6, ownership: 38.4, opponent: 'BUF', injuryStatus: 'Questionable' },
    { id: 16, name: 'Mark Andrews', position: 'TE', team: 'BAL', salary: 6400, projection: 12.8, ownership: 18.2, opponent: '@CIN' },
    { id: 17, name: 'T.J. Hockenson', position: 'TE', team: 'MIN', salary: 5600, projection: 12.8, ownership: 7.2, opponent: 'CHI' },
    { id: 18, name: 'David Njoku', position: 'TE', team: 'CLE', salary: 4800, projection: 11.2, ownership: 8.4, opponent: 'PIT' }
  ]
}

// ============================================================
// MAIN POST HANDLER
// ============================================================

export async function POST(request) {
  try {
    const body = await request.json()
    const { action = 'load' } = body

    // Simulate realistic API delay
    await new Promise(resolve => setTimeout(resolve, 1400))

    const timestamp = new Date().toISOString()
    const runId = `nfl-slate-${Date.now()}`

    const response = {
      meta: {
        timestamp,
        runId,
        action
      },
      // V1.1 NEW - Premium NFL Research Data
      playerCarousel: generatePlayerCarousel(),
      seasonStats: generateSeasonStats(),
      gameLogs: generateGameLogs(),
      matchupIntelligence: generateMatchupIntelligence(),
      teamStats: generateTeamStats(),
      weatherInjuryHub: generateWeatherInjuryHub(),

      // Core Data (kept from v1.0)
      slateInfo: generateSlateInfo(),
      slateHeadlines: generateSlateHeadlines(),
      lastWeekPerformance: generateLastWeekPerformance(),
      lineupiqSummary: generateLineupIQSummary(),
      playerPool: generatePlayerPool(),

      // Legacy data (for backwards compatibility, will be removed in frontend)
      featuredGames: generateFeaturedGames(),
      recentForm: generateRecentForm(),
      gameLevelStats: generateGameLevelStats(),
      valueWatchlist: generateValueWatchlist(),
      leverageWatchlist: generateLeverageWatchlist(),
      chalkMap: generateChalkMap(),
      stackPreviews: generateStackPreviews(),
      corePlays: generateCorePlays(),
      contestPaths: generateContestPaths()
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('NFL Slate API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate NFL slate data', details: error.message },
      { status: 500 }
    )
  }
}
