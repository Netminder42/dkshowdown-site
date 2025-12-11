'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ============================================================
// OPTIMIZER ENGINE — V1.1 PRO MODE
// World-class DFS lineup builder with visual intelligence
// ============================================================

export default function OptimizerPage() {
  // ========== SLATE SELECTOR ==========
  const [selectedSport, setSelectedSport] = useState('NFL')
  const [selectedSlate, setSelectedSlate] = useState('Main Slate')
  const [selectedSite, setSelectedSite] = useState('DraftKings')

  // ========== STRATEGY SETTINGS ==========
  const [contestType, setContestType] = useState('Single Entry')
  const [numLineups, setNumLineups] = useState(1)
  const [leveragePreference, setLeveragePreference] = useState(50) // 0-100
  const [chalkTolerance, setChalkTolerance] = useState(50) // 0-100
  const [diversification, setDiversification] = useState(50) // 0-100
  const [globalExposureCap, setGlobalExposureCap] = useState(100)

  // ========== GAME PLAN (STACKS) SETTINGS ==========
  const [showGamePlan, setShowGamePlan] = useState(true) // Default expanded for Pro Mode
  const [primaryStackTeam, setPrimaryStackTeam] = useState('KC')
  const [primaryStackType, setPrimaryStackType] = useState('QB + WR + TE')
  const [primaryStackUsage, setPrimaryStackUsage] = useState(60) // % of lineups
  const [useBringback, setUseBringback] = useState(true)
  const [bringbackCount, setBringbackCount] = useState(1)
  const [enableSecondaryStack, setEnableSecondaryStack] = useState(false)
  const [secondaryStackTeam, setSecondaryStackTeam] = useState('BUF')
  const [secondaryStackType, setSecondaryStackType] = useState('RB + WR')
  const [secondaryStackUsage, setSecondaryStackUsage] = useState(30)
  const [stackDiversity, setStackDiversity] = useState(50)

  // ========== PLAYER POOL STATE ==========
  const [playerPool, setPlayerPool] = useState(null)
  const [locks, setLocks] = useState([])
  const [fades, setFades] = useState([])
  const [exposures, setExposures] = useState({}) // { playerId: { min, max } }
  const [positionFilter, setPositionFilter] = useState('ALL')
  const [teamFilter, setTeamFilter] = useState('ALL')
  const [chalkFilter, setChalkFilter] = useState('ALL')

  // ========== OPTIMIZER STATE ==========
  const [optimizerStatus, setOptimizerStatus] = useState('idle') // idle | building | complete | error
  const [lineups, setLineups] = useState(null)
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState(null)
  const [activeLineupsTab, setActiveLineupsTab] = useState('all')
  const [showExposureSummary, setShowExposureSummary] = useState(false)

  // Available slates per sport
  const slateOptions = {
    NFL: ['Main Slate', 'Sunday Early', 'Sunday Late', 'Primetime', 'Showdown'],
    NBA: ['Main Slate', 'Early Slate', 'Late Slate', 'Showdown'],
    MLB: ['Main Slate', 'Early Slate', 'Afternoon', 'Night Games']
  }

  // Contest type presets
  const contestPresets = {
    'Cash': { leverage: 20, chalk: 80, diversification: 30 },
    'Single Entry': { leverage: 50, chalk: 50, diversification: 50 },
    '3-Max': { leverage: 60, chalk: 40, diversification: 60 },
    'Large-Field GPP': { leverage: 70, chalk: 30, diversification: 70 },
    'MME': { leverage: 75, chalk: 25, diversification: 80 }
  }

  // Stack type mapping for size
  const stackTypeToSize = {
    'QB + WR + WR': 3,
    'QB + WR + TE': 3,
    'QB + WR + RB': 3,
    'RB + WR': 2,
    'RB + TE': 2,
    'WR + WR': 2
  }

  // Apply contest preset
  const applyContestPreset = (type) => {
    setContestType(type)
    const preset = contestPresets[type]
    if (preset) {
      setLeveragePreference(preset.leverage)
      setChalkTolerance(preset.chalk)
      setDiversification(preset.diversification)
    }

    // Auto-set lineup count based on type
    if (type === 'Cash' || type === 'Single Entry') setNumLineups(1)
    else if (type === '3-Max') setNumLineups(3)
    else if (type === 'Large-Field GPP') setNumLineups(20)
    else if (type === 'MME') setNumLineups(150)
  }

  // Toggle lock/fade
  const toggleLock = (playerId) => {
    setLocks(prev =>
      prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId]
    )
    // Remove from fades if locked
    setFades(prev => prev.filter(id => id !== playerId))
  }

  const toggleFade = (playerId) => {
    setFades(prev =>
      prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId]
    )
    // Remove from locks if faded
    setLocks(prev => prev.filter(id => id !== playerId))
  }

  // Build lineups
  const handleBuildLineups = async () => {
    setOptimizerStatus('building')
    setError(null)

    try {
      const response = await fetch('/api/optimizer/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport: selectedSport,
          slate: selectedSlate,
          site: selectedSite === 'DraftKings' ? 'DK' : 'FD',
          numLineups,
          contestType,
          leveragePreference: leveragePreference / 100,
          chalkTolerance: chalkTolerance / 100,
          diversification: diversification / 100,
          locks,
          fades,
          primaryStack: showGamePlan ? {
            team: primaryStackTeam,
            size: stackTypeToSize[primaryStackType] || 3,
            bringback: useBringback,
            bringbackCount
          } : null,
          secondaryStack: showGamePlan && useBringback ? {
            team: secondaryStackTeam,
            size: stackTypeToSize[secondaryStackType] || 2
          } : null,
          minExposures: exposures,
          maxExposures: exposures
        })
      })

      if (!response.ok) throw new Error('Failed to build lineups')

      const data = await response.json()
      setLineups(data.lineups)
      setPlayerPool(data.playerPool)
      setSummary(data.summary)
      setOptimizerStatus('complete')
    } catch (err) {
      setError('Failed to build lineups. Please try again.')
      setOptimizerStatus('error')
    }
  }

  // Filter player pool
  const filteredPlayers = useMemo(() => {
    if (!playerPool) return []

    return playerPool.filter(p => {
      if (positionFilter !== 'ALL' && p.position !== positionFilter) return false
      if (teamFilter !== 'ALL' && p.team !== teamFilter) return false
      if (chalkFilter === 'Chalk' && p.ownership < 25) return false
      if (chalkFilter === 'Pivot' && (p.ownership < 10 || p.ownership >= 25)) return false
      if (chalkFilter === 'Leverage' && p.ownership >= 10) return false
      return true
    })
  }, [playerPool, positionFilter, teamFilter, chalkFilter])

  // Get unique teams
  const teams = useMemo(() => {
    if (!playerPool) return []
    return [...new Set(playerPool.map(p => p.team))].sort()
  }, [playerPool])

  // Get tag color
  const getTagColor = (tag) => {
    if (tag === 'Chalk') return 'bg-red-100 text-red-700 border-red-300'
    if (tag === 'Pivot') return 'bg-blue-100 text-blue-700 border-blue-300'
    if (tag === 'Leverage') return 'bg-green-100 text-green-700 border-green-300'
    return 'bg-slate-100 text-slate-600 border-slate-300'
  }

  // Export to CSV
  const exportToCSV = () => {
    if (!lineups || lineups.length === 0) return

    let csv = 'QB,RB,RB,WR,WR,WR,TE,FLEX,DST\n'
    lineups.forEach(lineup => {
      const positions = { QB: [], RB: [], WR: [], TE: [], DST: [] }
      lineup.players.forEach(p => {
        if (positions[p.position]) positions[p.position].push(p.name)
      })

      const qb = positions.QB[0] || ''
      const rb1 = positions.RB[0] || ''
      const rb2 = positions.RB[1] || ''
      const wr1 = positions.WR[0] || ''
      const wr2 = positions.WR[1] || ''
      const wr3 = positions.WR[2] || ''
      const te = positions.TE[0] || ''
      const flex = positions.RB[2] || positions.WR[3] || ''
      const dst = positions.DST[0] || ''

      csv += `${qb},${rb1},${rb2},${wr1},${wr2},${wr3},${te},${flex},${dst}\n`
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lineups_${selectedSport}_${Date.now()}.csv`
    a.click()
  }

  // LineupIQ Assistant Build Review insights
  const getAssistantInsights = () => {
    if (optimizerStatus !== 'complete' || !lineups || !playerPool || !summary) return null

    const insights = []

    // Check for high exposure risk (>70% on any player)
    const highExposurePlayers = playerPool.filter(p => parseFloat(p.exposure) > 70)
    if (highExposurePlayers.length > 0) {
      highExposurePlayers.forEach(player => {
        insights.push({
          type: 'warning',
          label: 'Risk Check',
          message: `You have ${player.exposure}% exposure to ${player.name}. This is high risk for large-field GPPs. Consider lowering max exposure to 40-50%.`
        })
      })
    }

    // Check leverage vs contest type mismatch
    const avgLev = parseFloat(summary.avgLeverage)
    if (contestType.includes('GPP') && avgLev < 5) {
      insights.push({
        type: 'tip',
        label: 'Leverage Edge',
        message: `Average leverage is ${summary.avgLeverage} for a GPP build. Consider raising leverage preference or targeting more contrarian plays.`
      })
    }

    // Check chalk tolerance vs actual ownership
    const avgOwn = parseFloat(summary.avgOwnership)
    if (chalkTolerance < 40 && avgOwn > 80) {
      insights.push({
        type: 'tip',
        label: 'Suggestion',
        message: `Your chalk tolerance is low, but average ownership is ${summary.avgOwnership}%. Consider raising diversification or fading popular players.`
      })
    }

    // Check stack usage
    if (summary.mostUsedStack === 'No stacks' && numLineups > 1) {
      insights.push({
        type: 'tip',
        label: 'Suggestion',
        message: `No stacks detected in your lineups. Enable Game Plan to add correlated stacks for tournament upside.`
      })
    }

    // Key lean summary
    if (summary.topExposures && summary.topExposures.length > 0) {
      const topNames = summary.topExposures.map(e => e.name).join(', ')
      insights.push({
        type: 'strategy',
        label: 'Key Lean',
        message: `Your lineups lean heavily on ${topNames}. Make sure you're comfortable with this core exposure.`
      })
    }

    // 3-Max specific advice
    if (contestType === '3-Max') {
      insights.push({
        type: 'strategy',
        label: '3-Max Strategy',
        message: `For 3-Max, aim for 2 unique builds with medium leverage and 1 safer chalk lineup. Diversify your stacks across ${numLineups} lineups.`
      })
    }

    return insights
  }

  const assistantInsights = getAssistantInsights()

  // Generate primary stack summary sentence
  const getPrimaryStackSummary = () => {
    if (!showGamePlan) return null
    const bringbackText = useBringback ? ` with ${bringbackCount} bringback` : ''
    return `Use ${primaryStackTeam} ${primaryStackType}${bringbackText} in ${primaryStackUsage}% of lineups`
  }

  // Generate secondary stack summary sentence
  const getSecondaryStackSummary = () => {
    if (!showGamePlan || !enableSecondaryStack) return null
    return `Use ${secondaryStackTeam} ${secondaryStackType} mini-stack in ${secondaryStackUsage}% of lineups`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b-4 border-green-500 shadow-xl">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-3xl font-black text-white hover:text-blue-300 transition-colors">
                FantasyHub<span className="text-blue-400">AI</span>
              </Link>
              <p className="text-blue-200 text-sm mt-1 font-medium">LINEUP OPTIMIZER — V1.1 PRO MODE</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white text-sm font-bold">
                  {selectedSport} • {selectedSlate}
                </div>
                <div className="text-blue-300 text-xs">{selectedSite}</div>
              </div>
              <Link
                href="/"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                ← Back
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Build Lineups Button - Top Center */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <motion.button
            onClick={handleBuildLineups}
            disabled={optimizerStatus === 'building'}
            whileHover={{ scale: optimizerStatus === 'building' ? 1 : 1.02 }}
            whileTap={{ scale: optimizerStatus === 'building' ? 1 : 0.98 }}
            className="w-full py-5 bg-gradient-to-r from-green-600 to-green-700 text-white font-black text-2xl rounded-xl shadow-2xl hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: optimizerStatus === 'building' ? 'none' : '0 10px 30px rgba(0,200,83,0.5)'
            }}
          >
            {optimizerStatus === 'building' ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Building {numLineups} Lineup{numLineups > 1 ? 's' : ''}...
              </span>
            ) : (
              `🚀 Build ${numLineups} Lineup${numLineups > 1 ? 's' : ''}`
            )}
          </motion.button>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm text-center"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        {/* Three-Panel Layout */}
        <div className="flex gap-6">
          {/* LEFT PANEL - Strategy & Rules (30%) */}
          <div className="w-[30%] space-y-6">
            {/* Contest Type Presets */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)'
              }}
            >
              <h3 className="text-xl font-black text-slate-900 mb-4">Contest Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Cash', 'Single Entry', '3-Max', 'Large-Field GPP', 'MME'].map(type => (
                  <motion.button
                    key={type}
                    onClick={() => applyContestPreset(type)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 py-2.5 rounded-lg font-bold text-sm transition-all ${
                      contestType === type
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Slate Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)'
              }}
            >
              <h3 className="text-xl font-black text-slate-900 mb-4">Slate Selection</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sport</label>
                  <select
                    value={selectedSport}
                    onChange={(e) => {
                      setSelectedSport(e.target.value)
                      setSelectedSlate(slateOptions[e.target.value][0])
                    }}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-300 rounded-lg font-semibold text-slate-800 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="NFL">🏈 NFL</option>
                    <option value="NBA">🏀 NBA</option>
                    <option value="MLB">⚾ MLB</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Slate</label>
                  <select
                    value={selectedSlate}
                    onChange={(e) => setSelectedSlate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-300 rounded-lg font-semibold text-slate-800 text-sm focus:outline-none focus:border-blue-500"
                  >
                    {slateOptions[selectedSport].map(slate => (
                      <option key={slate} value={slate}>{slate}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Site</label>
                  <select
                    value={selectedSite}
                    onChange={(e) => setSelectedSite(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-300 rounded-lg font-semibold text-slate-800 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="DraftKings">DraftKings</option>
                    <option value="FanDuel">FanDuel</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Number of Lineups */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)'
              }}
            >
              <h3 className="text-xl font-black text-slate-900 mb-4">Number of Lineups</h3>
              <select
                value={numLineups}
                onChange={(e) => setNumLineups(parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg font-bold text-lg text-slate-800 focus:outline-none focus:border-blue-500"
              >
                <option value="1">1 Lineup</option>
                <option value="3">3 Lineups</option>
                <option value="10">10 Lineups</option>
                <option value="20">20 Lineups</option>
                <option value="50">50 Lineups</option>
                <option value="150">150 Lineups (MME)</option>
              </select>
            </motion.div>

            {/* GAME PLAN (STACKS) - V1.1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setShowGamePlan(!showGamePlan)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                style={{
                  background: showGamePlan ? 'linear-gradient(135deg, #F0F9FF, #E0F2FE)' : 'linear-gradient(135deg, #FFFFFF, #F8FAFC)'
                }}
              >
                <div>
                  <h3 className="text-xl font-black text-slate-900">Game Plan (Stacks)</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Tell LineupIQ how to structure game stacks in your lineups
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: showGamePlan ? 180 : 0 }}
                  className="text-2xl text-slate-600"
                >
                  ▼
                </motion.div>
              </button>

              <AnimatePresence>
                {showGamePlan && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-200"
                  >
                    <div className="p-6 space-y-5">
                      {/* Primary Stack Rule */}
                      <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                        <h4 className="font-bold text-sm text-blue-900 mb-3">Primary Stack</h4>
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Team</label>
                              <select
                                value={primaryStackTeam}
                                onChange={(e) => setPrimaryStackTeam(e.target.value)}
                                className="w-full px-2 py-1.5 bg-white border border-blue-300 rounded font-semibold text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                              >
                                <option value="KC">KC</option>
                                <option value="BUF">BUF</option>
                                <option value="PHI">PHI</option>
                                <option value="SF">SF</option>
                                <option value="DAL">DAL</option>
                                <option value="MIA">MIA</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
                              <select
                                value={primaryStackType}
                                onChange={(e) => setPrimaryStackType(e.target.value)}
                                className="w-full px-2 py-1.5 bg-white border border-blue-300 rounded font-semibold text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                              >
                                <option value="QB + WR + WR">QB + WR + WR</option>
                                <option value="QB + WR + TE">QB + WR + TE</option>
                                <option value="QB + WR + RB">QB + WR + RB</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="bringback"
                              checked={useBringback}
                              onChange={(e) => setUseBringback(e.target.checked)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor="bringback" className="text-xs font-bold text-slate-700">
                              Add Bringback
                            </label>
                            {useBringback && (
                              <select
                                value={bringbackCount}
                                onChange={(e) => setBringbackCount(parseInt(e.target.value))}
                                className="px-2 py-1 bg-white border border-blue-300 rounded font-semibold text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                              >
                                <option value="1">1 player</option>
                                <option value="2">2 players</option>
                              </select>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Use in {primaryStackUsage}% of lineups
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              step="10"
                              value={primaryStackUsage}
                              onChange={(e) => setPrimaryStackUsage(parseInt(e.target.value))}
                              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                          </div>

                          {/* Summary Sentence */}
                          <div className="mt-3 pt-3 border-t border-blue-300">
                            <p className="text-xs text-blue-800 leading-relaxed">
                              <span className="font-bold">Summary:</span> {getPrimaryStackSummary()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Secondary Stack (Bringback Team) */}
                      {useBringback && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-green-50 rounded-lg p-4 border-2 border-green-200"
                        >
                          <h4 className="font-bold text-sm text-green-900 mb-3">Bringback Team</h4>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-700 mb-1">Team</label>
                              <select
                                value={secondaryStackTeam}
                                onChange={(e) => setSecondaryStackTeam(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-green-300 rounded-lg font-semibold text-sm text-slate-800 focus:outline-none focus:border-green-500"
                              >
                                <option value="BUF">Buffalo (BUF)</option>
                                <option value="KC">Kansas City (KC)</option>
                                <option value="SF">San Francisco (SF)</option>
                                <option value="MIA">Miami (MIA)</option>
                                <option value="DAL">Dallas (DAL)</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Stack Diversity */}
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Stack Diversity
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={stackDiversity}
                          onChange={(e) => setStackDiversity(parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>Concentrated</span>
                          <span>Spread Out</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                          Concentrated = repeat same game more often. Spread = use more teams/games.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Leverage & Chalk Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)'
              }}
            >
              <h3 className="text-xl font-black text-slate-900 mb-4">Optimizer Controls</h3>

              <div className="space-y-5">
                {/* Leverage Preference */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700">Leverage Preference</label>
                    <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded">
                      {leveragePreference < 33 ? 'Low' : leveragePreference < 67 ? 'Medium' : 'High'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={leveragePreference}
                    onChange={(e) => setLeveragePreference(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <p className="text-xs text-slate-500 mt-1">Favor under-owned upside?</p>
                </div>

                {/* Chalk Tolerance */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700">Chalk Tolerance</label>
                    <span className="text-xs font-bold px-2 py-1 bg-orange-100 text-orange-700 rounded">
                      {chalkTolerance < 33 ? 'Avoid' : chalkTolerance < 67 ? 'Balanced' : 'Use Chalk'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={chalkTolerance}
                    onChange={(e) => setChalkTolerance(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                  <p className="text-xs text-slate-500 mt-1">Comfortable with popular players?</p>
                </div>

                {/* Diversification */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-slate-700">Diversification</label>
                    <span className="text-xs font-bold px-2 py-1 bg-purple-100 text-purple-700 rounded">
                      {diversification < 33 ? 'Similar' : diversification < 67 ? 'Mixed' : 'Varied'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={diversification}
                    onChange={(e) => setDiversification(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <p className="text-xs text-slate-500 mt-1">How different should lineups be?</p>
                </div>
              </div>
            </motion.div>

            {/* Exposure Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)'
              }}
            >
              <h3 className="text-xl font-black text-slate-900 mb-4">Exposure Controls</h3>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Max Exposure Per Player: {globalExposureCap}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={globalExposureCap}
                  onChange={(e) => setGlobalExposureCap(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Global cap applied to all players unless individually set
                </p>
              </div>
            </motion.div>
          </div>

          {/* CENTER PANEL - Player Pool (40%) */}
          <div className="w-[40%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
            >
              <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                <h3 className="text-2xl font-black text-slate-900 mb-4">Player Pool</h3>

                {/* Filters */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Position</label>
                    <select
                      value={positionFilter}
                      onChange={(e) => setPositionFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="ALL">All Positions</option>
                      <option value="QB">QB</option>
                      <option value="RB">RB</option>
                      <option value="WR">WR</option>
                      <option value="TE">TE</option>
                      <option value="DST">DST</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Team</label>
                    <select
                      value={teamFilter}
                      onChange={(e) => setTeamFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="ALL">All Teams</option>
                      {teams.map(team => (
                        <option key={team} value={team}>{team}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Type</label>
                    <select
                      value={chalkFilter}
                      onChange={(e) => setChalkFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="ALL">All Players</option>
                      <option value="Chalk">Chalk (&gt;25%)</option>
                      <option value="Pivot">Pivot (10-25%)</option>
                      <option value="Leverage">Leverage (&lt;10%)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Player Table */}
              <div className="overflow-x-auto" style={{ maxHeight: '800px' }}>
                {playerPool === null ? (
                  <div className="p-12 text-center">
                    <div className="text-4xl mb-4">👨‍💼</div>
                    <p className="text-slate-600 font-semibold">
                      Build lineups to load player pool
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                      Configure your settings and click "Build Lineups" above
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-xs">
                    <thead className="bg-slate-100 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 py-2 text-left font-bold text-slate-700 uppercase">Player</th>
                        <th className="px-2 py-2 text-center font-bold text-slate-700 uppercase">Proj</th>
                        <th className="px-2 py-2 text-center font-bold text-slate-700 uppercase">Sal</th>
                        <th className="px-2 py-2 text-center font-bold text-slate-700 uppercase">Own%</th>
                        <th className="px-2 py-2 text-center font-bold text-slate-700 uppercase">Lev</th>
                        <th className="px-2 py-2 text-center font-bold text-slate-700 uppercase">Exp%</th>
                        <th className="px-2 py-2 text-center font-bold text-slate-700 uppercase">Tag</th>
                        <th className="px-2 py-2 text-center font-bold text-slate-700 uppercase">Lock</th>
                        <th className="px-2 py-2 text-center font-bold text-slate-700 uppercase">Fade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredPlayers.map((player, index) => {
                        const isLocked = locks.includes(player.id)
                        const isFaded = fades.includes(player.id)
                        const exposure = parseFloat(player.exposure) || 0

                        return (
                          <motion.tr
                            key={player.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isFaded ? 0.4 : 1, x: 0 }}
                            transition={{ delay: index * 0.01 }}
                            className="hover:bg-blue-50 transition-colors"
                          >
                            <td className="px-3 py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-[10px]">
                                  {player.position[0]}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900">{player.name}</div>
                                  <div className="text-[10px] text-slate-500 font-semibold">{player.team}</div>
                                  {/* Exposure bar (post-build) */}
                                  {exposure > 0 && (
                                    <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden mt-0.5">
                                      <div
                                        className="h-full bg-blue-600 rounded-full"
                                        style={{ width: `${Math.min(exposure, 100)}%` }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-2 text-center font-bold text-slate-800">{player.projection.toFixed(1)}</td>
                            <td className="px-2 py-2 text-center font-semibold text-slate-600">${(player.salary / 1000).toFixed(1)}k</td>
                            <td className="px-2 py-2 text-center">
                              <span className={`font-bold ${
                                player.ownership >= 25 ? 'text-red-600' :
                                player.ownership < 10 ? 'text-green-600' :
                                'text-slate-700'
                              }`}>
                                {player.ownership.toFixed(0)}%
                              </span>
                            </td>
                            <td className="px-2 py-2 text-center">
                              <span className={`font-bold ${
                                player.leverage > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {player.leverage > 0 ? '+' : ''}{player.leverage.toFixed(0)}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-center">
                              <span className="font-bold text-blue-700">
                                {exposure > 0 ? `${exposure}%` : '-'}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getTagColor(player.tag)}`}>
                                {player.tag}
                              </span>
                            </td>
                            <td className="px-2 py-2 text-center">
                              <button
                                onClick={() => toggleLock(player.id)}
                                className={`w-7 h-7 rounded-lg font-bold text-xs transition-all ${
                                  isLocked
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                                }`}
                              >
                                {isLocked ? '🔒' : '○'}
                              </button>
                            </td>
                            <td className="px-2 py-2 text-center">
                              <button
                                onClick={() => toggleFade(player.id)}
                                className={`w-7 h-7 rounded-lg font-bold text-xs transition-all ${
                                  isFaded
                                    ? 'bg-red-600 text-white shadow-lg'
                                    : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                                }`}
                              >
                                {isFaded ? '✖' : '○'}
                              </button>
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT PANEL - Lineups Output + Assistant (30%) */}
          <div className="w-[30%] space-y-6">
            {/* LineupIQ Assistant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-xl shadow-2xl p-6 text-white sticky top-6"
              style={{
                boxShadow: '0 10px 30px rgba(109,40,217,0.4)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-black text-lg">LineupIQ Assistant</h3>
                  <p className="text-purple-200 text-xs">
                    {optimizerStatus === 'complete' ? 'Build Review' : 'Optimizer Coach'}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {optimizerStatus === 'idle' && (
                  <p className="text-sm text-purple-100 leading-relaxed">
                    Choose a contest type, configure your Game Plan for stacks, and adjust key exposures in the player pool. Then click "Build Lineups" to generate optimal lineups.
                  </p>
                )}

                {optimizerStatus === 'building' && (
                  <div className="flex items-center gap-2 text-sm text-purple-100">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing player pool and building optimal lineups...
                  </div>
                )}

                {optimizerStatus === 'complete' && assistantInsights && assistantInsights.length > 0 && (
                  <div className="space-y-2">
                    {assistantInsights.map((insight, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                      >
                        <div className="font-bold text-xs mb-1">
                          {insight.type === 'warning' && '⚠️ ' + insight.label}
                          {insight.type === 'tip' && '💡 ' + insight.label}
                          {insight.type === 'question' && '❓ ' + insight.label}
                          {insight.type === 'strategy' && '🎯 ' + insight.label}
                        </div>
                        <p className="text-xs text-purple-100 leading-relaxed">
                          {insight.message}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {optimizerStatus === 'complete' && (!assistantInsights || assistantInsights.length === 0) && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="font-bold text-sm mb-1">✅ Looking Good!</div>
                    <p className="text-xs text-purple-100 leading-relaxed">
                      Your lineups look solid. Review exposure levels and stack diversity before exporting.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="text-xs text-purple-200">
                  💡 Tip: Use Lock/Fade in Player Pool and adjust Game Plan stacks for optimal builds
                </div>
              </div>
            </motion.div>

            {/* Lineup Quality Summary - V1.1 */}
            <AnimatePresence>
              {optimizerStatus === 'complete' && summary && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-5"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF, #F1F5F9)'
                  }}
                >
                  <h3 className="text-lg font-black text-slate-900 mb-3">Quality Summary</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-semibold">Avg Proj:</span>
                      <span className="font-black text-slate-900">{summary.avgProjection}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-semibold">Avg Own:</span>
                      <span className="font-black text-orange-600">{summary.avgOwnership}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-semibold">Avg Lev:</span>
                      <span className={`font-black ${parseFloat(summary.avgLeverage) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(summary.avgLeverage) > 0 ? '+' : ''}{summary.avgLeverage}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="text-xs">
                      <div className="text-slate-600 font-semibold mb-1">Most-used stack:</div>
                      <div className="font-bold text-blue-700">{summary.mostUsedStack}</div>
                    </div>
                  </div>

                  {summary.topExposures && summary.topExposures.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="text-xs">
                        <div className="text-slate-600 font-semibold mb-1">Top exposures:</div>
                        <div className="space-y-1">
                          {summary.topExposures.map((exp, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span className="font-bold text-slate-900">{exp.name}</span>
                              <span className="font-bold text-blue-600">{exp.exposure}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lineups Output */}
            <AnimatePresence>
              {optimizerStatus === 'complete' && lineups && lineups.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-black text-slate-900">
                        Lineups ({lineups.length})
                      </h3>
                      <button
                        onClick={exportToCSV}
                        className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-lg transition-all shadow-lg"
                      >
                        📥 CSV
                      </button>
                    </div>

                    {/* Exposure Summary Toggle */}
                    <button
                      onClick={() => setShowExposureSummary(!showExposureSummary)}
                      className="w-full px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold text-xs rounded-lg transition-colors"
                    >
                      {showExposureSummary ? '▼ Hide' : '▶'} View Exposure Summary
                    </button>

                    {/* Exposure Summary Table */}
                    <AnimatePresence>
                      {showExposureSummary && playerPool && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 overflow-hidden"
                        >
                          <div className="bg-white rounded-lg border border-blue-200 p-3 max-h-48 overflow-y-auto">
                            <table className="w-full text-xs">
                              <thead className="sticky top-0 bg-blue-50">
                                <tr>
                                  <th className="px-2 py-1 text-left font-bold text-blue-900">Player</th>
                                  <th className="px-2 py-1 text-right font-bold text-blue-900">Exp%</th>
                                </tr>
                              </thead>
                              <tbody>
                                {playerPool
                                  .filter(p => parseFloat(p.exposure) > 0)
                                  .sort((a, b) => parseFloat(b.exposure) - parseFloat(a.exposure))
                                  .map((player, idx) => (
                                    <tr key={idx} className="border-t border-blue-100">
                                      <td className="px-2 py-1 font-semibold text-slate-900">{player.name}</td>
                                      <td className="px-2 py-1 text-right font-bold text-blue-700">{player.exposure}%</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Tabs */}
                    <div className="flex gap-2 mt-3">
                      {['all', 'stacks', 'template'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveLineupsTab(tab)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                            activeLineupsTab === tab
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                        >
                          {tab === 'all' && 'All'}
                          {tab === 'stacks' && 'By Stack'}
                          {tab === 'template' && 'By Template'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lineups List */}
                  <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
                    <div className="p-4 space-y-3">
                      {lineups.map((lineup, index) => (
                        <motion.div
                          key={lineup.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-black text-slate-900">Lineup #{index + 1}</span>
                            <div className="flex gap-1">
                              <button className="w-6 h-6 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-xs font-bold transition-colors">
                                👁
                              </button>
                              <button className="w-6 h-6 bg-green-100 hover:bg-green-200 text-green-700 rounded text-xs font-bold transition-colors">
                                💾
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                            <div>
                              <span className="text-slate-500 font-semibold">Proj:</span>{' '}
                              <span className="font-bold text-slate-900">{lineup.projection.toFixed(1)}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Salary:</span>{' '}
                              <span className="font-bold text-slate-900">${lineup.salary.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Own:</span>{' '}
                              <span className="font-bold text-orange-600">{lineup.ownership.toFixed(0)}%</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-semibold">Lev:</span>{' '}
                              <span className={`font-bold ${lineup.leverageScore > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {lineup.leverageScore > 0 ? '+' : ''}{lineup.leverageScore.toFixed(1)}
                              </span>
                            </div>
                          </div>

                          {lineup.stackSummary && (
                            <div className="mt-2 px-2 py-1 bg-blue-100 rounded text-xs font-bold text-blue-800 border border-blue-300">
                              🎯 {lineup.stackSummary}
                            </div>
                          )}

                          {/* Player names mini list */}
                          <div className="mt-2 pt-2 border-t border-slate-300">
                            <div className="flex flex-wrap gap-1">
                              {lineup.players.map((p, i) => (
                                <span key={i} className="text-[10px] px-1.5 py-0.5 bg-white rounded border border-slate-300 font-semibold text-slate-700">
                                  {p.position}: {p.name.split(' ').pop()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
