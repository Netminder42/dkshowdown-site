'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ============================================================
// OWNERSHIP ENGINE — V1
// Professional ownership intelligence dashboard
// ============================================================

export default function OwnershipPage() {
  // Slate selector state
  const [selectedSport, setSelectedSport] = useState('NFL')
  const [selectedSlate, setSelectedSlate] = useState('Main Slate')
  const [selectedSite, setSelectedSite] = useState('DraftKings')

  // Data and UI state
  const [ownershipData, setOwnershipData] = useState(null)
  const [loadStatus, setLoadStatus] = useState('idle') // idle | loading | loaded | error
  const [error, setError] = useState(null)

  // Table sorting state
  const [sortColumn, setSortColumn] = useState('ownership')
  const [sortDirection, setSortDirection] = useState('desc')

  // Available slates per sport
  const slateOptions = {
    NFL: ['Main Slate', 'Sunday Early', 'Sunday Late', 'Primetime', 'Showdown'],
    NBA: ['Main Slate', 'Early Slate', 'Late Slate', 'Showdown'],
    MLB: ['Main Slate', 'Early Slate', 'Afternoon', 'Night Games']
  }

  // Handle load ownership data
  const handleLoadOwnership = async () => {
    setLoadStatus('loading')
    setError(null)

    try {
      const response = await fetch('/api/ownership/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport: selectedSport,
          site: selectedSite === 'DraftKings' ? 'DK' : 'FD',
          slate: selectedSlate
        })
      })

      if (!response.ok) throw new Error('Failed to load ownership data')

      const data = await response.json()
      setOwnershipData(data)
      setLoadStatus('loaded')
    } catch (err) {
      setError('Failed to load ownership data. Please try again.')
      setLoadStatus('error')
    }
  }

  // Handle table sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  // Sort and filter players
  const sortedPlayers = useMemo(() => {
    if (!ownershipData?.players) return []

    return [...ownershipData.players].sort((a, b) => {
      let aVal = a[sortColumn]
      let bVal = b[sortColumn]

      if (['projection', 'salary', 'ownership', 'value', 'leverage'].includes(sortColumn)) {
        aVal = parseFloat(aVal)
        bVal = parseFloat(bVal)
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
  }, [ownershipData, sortColumn, sortDirection])

  // Group players by ownership tier
  const ownershipTiers = useMemo(() => {
    if (!ownershipData?.players) return null

    const players = ownershipData.players

    return {
      ultraChalk: players.filter(p => p.ownership >= 30),
      chalk: players.filter(p => p.ownership >= 20 && p.ownership < 30),
      pivots: players.filter(p => p.ownership >= 10 && p.ownership < 20),
      leverage: players.filter(p => p.ownership < 10 && p.leverage > 10),
      traps: players.filter(p => p.ownership >= 25 && p.leverage < -10)
    }
  }, [ownershipData])

  // Get ownership color
  const getOwnershipColor = (ownership) => {
    if (ownership >= 30) return 'text-red-600'
    if (ownership >= 20) return 'text-orange-500'
    if (ownership >= 10) return 'text-yellow-600'
    return 'text-green-600'
  }

  // Get ownership bar width
  const getOwnershipBarWidth = (ownership) => {
    return Math.min(ownership * 2, 100)
  }

  // Get tag badge color
  const getTagColor = (tag) => {
    const colors = {
      Chalk: 'bg-red-100 text-red-700 border-red-300',
      Pivot: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      Leverage: 'bg-green-100 text-green-700 border-green-300',
      Trap: 'bg-purple-100 text-purple-700 border-purple-300',
      Balanced: 'bg-gray-100 text-gray-600 border-gray-300'
    }
    return colors[tag] || colors.Balanced
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b-4 border-blue-500 shadow-xl">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-3xl font-black text-white hover:text-blue-300 transition-colors">
                FantasyHub<span className="text-blue-400">AI</span>
              </Link>
              <p className="text-blue-200 text-sm mt-1 font-medium">OWNERSHIP INTELLIGENCE</p>
            </div>
            <Link
              href="/"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Content - 70% */}
          <div className="flex-1" style={{ width: '70%' }}>
            {/* Page Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-4xl font-black text-slate-900 mb-2">
                Ownership Engine
              </h1>
              <p className="text-slate-600 text-lg">
                Identify chalk concentrations, pivot opportunities, and leverage plays across the slate
              </p>
            </motion.div>

            {/* Slate Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)'
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-bold text-slate-800">Select Slate</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Sport Selector */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Sport</label>
                  <select
                    value={selectedSport}
                    onChange={(e) => {
                      setSelectedSport(e.target.value)
                      setSelectedSlate(slateOptions[e.target.value][0])
                    }}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="NFL">🏈 NFL</option>
                    <option value="NBA">🏀 NBA</option>
                    <option value="MLB">⚾ MLB</option>
                  </select>
                </div>

                {/* Slate Selector */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Slate</label>
                  <select
                    value={selectedSlate}
                    onChange={(e) => setSelectedSlate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {slateOptions[selectedSport].map(slate => (
                      <option key={slate} value={slate}>{slate}</option>
                    ))}
                  </select>
                </div>

                {/* Site Selector */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Site</label>
                  <select
                    value={selectedSite}
                    onChange={(e) => setSelectedSite(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="DraftKings">DraftKings</option>
                    <option value="FanDuel">FanDuel</option>
                  </select>
                </div>
              </div>

              {/* Load Button */}
              <motion.button
                onClick={handleLoadOwnership}
                disabled={loadStatus === 'loading'}
                whileHover={{ scale: loadStatus === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: loadStatus === 'loading' ? 1 : 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: loadStatus === 'loading' ? 'none' : '0 8px 20px rgba(37,99,235,0.4)'
                }}
              >
                {loadStatus === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading Ownership Data...
                  </span>
                ) : (
                  `Load ${selectedSport} Ownership`
                )}
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </motion.div>

            {/* Ownership Summary Bar */}
            <AnimatePresence>
              {loadStatus === 'loaded' && ownershipData?.summary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF, #F1F5F9)'
                  }}
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Slate Overview</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {/* Top Owned Player */}
                    <div className="text-center">
                      <div className="text-2xl font-black text-blue-600 mb-1">
                        {ownershipData.summary.topOwnedPlayer}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">
                        Top Owned Player
                      </div>
                      <div className="text-sm font-bold text-red-600 mt-1">
                        {ownershipData.summary.topOwnedPlayerOwnership}%
                      </div>
                    </div>

                    {/* Top Team */}
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-800 mb-1">
                        {ownershipData.summary.topOwnedTeam}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">
                        Top Team
                      </div>
                      <div className="text-sm font-bold text-slate-600 mt-1">
                        Most Exposure
                      </div>
                    </div>

                    {/* Chalk Concentration */}
                    <div className="text-center">
                      <div className="text-2xl font-black text-orange-600 mb-1">
                        {ownershipData.summary.chalkConcentration}%
                      </div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">
                        Chalk Concentration
                      </div>
                      <div className="text-sm font-bold text-slate-600 mt-1">
                        Players &gt; 20%
                      </div>
                    </div>

                    {/* Leverage Count */}
                    <div className="text-center">
                      <div className="text-2xl font-black text-green-600 mb-1">
                        {ownershipData.summary.leverageCount}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">
                        Leverage Plays
                      </div>
                      <div className="text-sm font-bold text-slate-600 mt-1">
                        Low Own + Edge
                      </div>
                    </div>

                    {/* Slate Type */}
                    <div className="text-center">
                      <div className="text-lg font-black text-purple-600 mb-1">
                        {ownershipData.summary.slateType.split(' ')[0]}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 uppercase">
                        Slate Type
                      </div>
                      <div className="text-sm font-bold text-slate-600 mt-1">
                        {ownershipData.summary.slateType.split(' ').slice(1).join(' ')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ownership Table */}
            <AnimatePresence>
              {loadStatus === 'loaded' && sortedPlayers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-6"
                >
                  <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800">
                      Ownership Breakdown
                      <span className="text-slate-500 font-normal ml-2 text-sm">
                        ({sortedPlayers.length} players)
                      </span>
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-100 sticky top-0 z-10">
                        <tr>
                          <th
                            onClick={() => handleSort('name')}
                            className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors"
                          >
                            <div className="flex items-center gap-1">
                              Player
                              {sortColumn === 'name' && (
                                <span className="text-blue-600">
                                  {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() => handleSort('projection')}
                            className="px-4 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors"
                          >
                            <div className="flex items-center justify-center gap-1">
                              Proj
                              {sortColumn === 'projection' && (
                                <span className="text-blue-600">
                                  {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() => handleSort('salary')}
                            className="px-4 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors"
                          >
                            <div className="flex items-center justify-center gap-1">
                              Salary
                              {sortColumn === 'salary' && (
                                <span className="text-blue-600">
                                  {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() => handleSort('ownership')}
                            className="px-4 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors"
                          >
                            <div className="flex items-center justify-center gap-1">
                              Ownership
                              {sortColumn === 'ownership' && (
                                <span className="text-blue-600">
                                  {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() => handleSort('value')}
                            className="px-4 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors"
                          >
                            <div className="flex items-center justify-center gap-1">
                              Value
                              {sortColumn === 'value' && (
                                <span className="text-blue-600">
                                  {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() => handleSort('leverage')}
                            className="px-4 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors"
                          >
                            <div className="flex items-center justify-center gap-1">
                              Leverage
                              {sortColumn === 'leverage' && (
                                <span className="text-blue-600">
                                  {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() => handleSort('tag')}
                            className="px-4 py-3 text-center text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-200 transition-colors"
                          >
                            <div className="flex items-center justify-center gap-1">
                              Tag
                              {sortColumn === 'tag' && (
                                <span className="text-blue-600">
                                  {sortDirection === 'asc' ? '↑' : '↓'}
                                </span>
                              )}
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {sortedPlayers.map((player, index) => (
                          <motion.tr
                            key={player.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className="hover:bg-blue-50 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                  {player.position}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900">{player.name}</div>
                                  <div className="text-xs text-slate-500 font-semibold">{player.team}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center font-bold text-slate-800">
                              {player.projection.toFixed(1)}
                            </td>
                            <td className="px-4 py-3 text-center font-semibold text-slate-600">
                              ${player.salary.toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex flex-col items-center gap-1">
                                <span className={`font-bold text-sm ${getOwnershipColor(player.ownership)}`}>
                                  {player.ownership.toFixed(1)}%
                                </span>
                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${getOwnershipBarWidth(player.ownership)}%` }}
                                    transition={{ delay: index * 0.02 + 0.2, duration: 0.6 }}
                                    className={`h-full rounded-full ${
                                      player.ownership >= 30 ? 'bg-red-500' :
                                      player.ownership >= 20 ? 'bg-orange-500' :
                                      player.ownership >= 10 ? 'bg-yellow-500' :
                                      'bg-green-500'
                                    }`}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center font-bold text-blue-600">
                              {player.value}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`font-bold ${
                                player.leverage > 15 ? 'text-green-600' :
                                player.leverage > 0 ? 'text-blue-600' :
                                player.leverage > -15 ? 'text-orange-600' :
                                'text-red-600'
                              }`}>
                                {player.leverage > 0 ? '+' : ''}{player.leverage.toFixed(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getTagColor(player.tag)}`}>
                                {player.tag}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ownership Tier Cards */}
            <AnimatePresence>
              {loadStatus === 'loaded' && ownershipTiers && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4 mb-6"
                >
                  <h3 className="text-2xl font-black text-slate-900 mb-4">Ownership Tiers</h3>

                  {/* Ultra Chalk (30%+) */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-lg border-2 border-red-300 p-5"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF, #FEE2E2)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <h4 className="text-lg font-black text-red-700">Ultra Chalk (30%+)</h4>
                      </div>
                      <span className="px-3 py-1 bg-red-500 text-white font-bold text-sm rounded-full">
                        {ownershipTiers.ultraChalk.length} players
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ownershipTiers.ultraChalk.map((p, idx) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + idx * 0.05 }}
                          className="px-3 py-2 bg-white border border-red-200 rounded-lg shadow-sm"
                        >
                          <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                          <div className="text-xs text-red-600 font-bold">{p.ownership.toFixed(1)}%</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Chalk (20-30%) */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-lg border-2 border-orange-300 p-5"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF, #FFEDD5)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                        <h4 className="text-lg font-black text-orange-700">Chalk (20-30%)</h4>
                      </div>
                      <span className="px-3 py-1 bg-orange-500 text-white font-bold text-sm rounded-full">
                        {ownershipTiers.chalk.length} players
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ownershipTiers.chalk.map((p, idx) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                          className="px-3 py-2 bg-white border border-orange-200 rounded-lg shadow-sm"
                        >
                          <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                          <div className="text-xs text-orange-600 font-bold">{p.ownership.toFixed(1)}%</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Pivots (10-20%) */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-lg border-2 border-yellow-300 p-5"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF, #FEF3C7)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                        <h4 className="text-lg font-black text-yellow-700">Pivots (10-20%)</h4>
                      </div>
                      <span className="px-3 py-1 bg-yellow-500 text-white font-bold text-sm rounded-full">
                        {ownershipTiers.pivots.length} players
                      </span>
    </div>
                    <div className="flex flex-wrap gap-2">
                      {ownershipTiers.pivots.map((p, idx) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          className="px-3 py-2 bg-white border border-yellow-200 rounded-lg shadow-sm"
                        >
                          <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                          <div className="text-xs text-yellow-600 font-bold">{p.ownership.toFixed(1)}%</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Leverage (<10% + high leverage) */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl shadow-lg border-2 border-green-300 p-5"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF, #D1FAE5)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h4 className="text-lg font-black text-green-700">Leverage Plays (&lt;10%)</h4>
                      </div>
                      <span className="px-3 py-1 bg-green-500 text-white font-bold text-sm rounded-full">
                        {ownershipTiers.leverage.length} players
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {ownershipTiers.leverage.map((p, idx) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                          className="px-3 py-2 bg-white border border-green-200 rounded-lg shadow-sm"
                        >
                          <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                          <div className="text-xs text-green-600 font-bold">
                            {p.ownership.toFixed(1)}% • +{p.leverage.toFixed(1)} LEV
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Over-owned Traps */}
                  {ownershipTiers.traps.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white rounded-xl shadow-lg border-2 border-purple-300 p-5"
                      style={{
                        background: 'linear-gradient(135deg, #FFFFFF, #F3E8FF)'
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                          <h4 className="text-lg font-black text-purple-700">Over-owned Traps</h4>
                        </div>
                        <span className="px-3 py-1 bg-purple-500 text-white font-bold text-sm rounded-full">
                          {ownershipTiers.traps.length} players
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {ownershipTiers.traps.map((p, idx) => (
                          <motion.div
                            key={p.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + idx * 0.05 }}
                            className="px-3 py-2 bg-white border border-purple-200 rounded-lg shadow-sm"
                          >
                            <div className="font-bold text-slate-900 text-sm">{p.name}</div>
                            <div className="text-xs text-purple-600 font-bold">
                              {p.ownership.toFixed(1)}% • {p.leverage.toFixed(1)} LEV
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Leverage Matrix Placeholder */}
            <AnimatePresence>
              {loadStatus === 'loaded' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-6 text-center"
                  style={{
                    background: 'linear-gradient(135deg, #F8FAFC, #E0E7FF)'
                  }}
                >
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Leverage Matrix</h3>
                  <p className="text-slate-600">
                    Advanced ownership vs. projection visualization coming soon
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - 30% */}
          <div className="w-[30%] space-y-6">
            {/* LineupIQ Assistant */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
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
                  <p className="text-purple-200 text-xs">Ownership Analysis</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {loadStatus === 'idle' && (
                  <p className="text-sm text-purple-100 leading-relaxed">
                    Load ownership data to receive intelligent analysis on chalk concentration, leverage opportunities, and pivot strategies for this slate.
                  </p>
                )}

                {loadStatus === 'loading' && (
                  <div className="flex items-center gap-2 text-sm text-purple-100">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing ownership patterns...
                  </div>
                )}

                {loadStatus === 'loaded' && ownershipData?.summary && (
                  <>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="font-bold text-sm mb-1">📌 Key Insight</div>
                      <p className="text-xs text-purple-100 leading-relaxed">
                        {ownershipData.summary.slateType === 'Tight chalk slate' &&
                          `This is a ${ownershipData.summary.slateType.toLowerCase()} with ${ownershipData.summary.chalkConcentration}% of players concentrated above 20% ownership. Consider fading popular stacks and targeting ${ownershipData.summary.leverageCount} identified leverage plays.`}
                        {ownershipData.summary.slateType === 'Moderate chalk slate' &&
                          `Moderate chalk concentration at ${ownershipData.summary.chalkConcentration}%. Mix chalk plays with ${ownershipData.summary.leverageCount} leverage opportunities for optimal tournament strategy.`}
                        {ownershipData.summary.slateType === 'Wide-open slate' &&
                          `Wide-open slate with only ${ownershipData.summary.chalkConcentration}% chalk concentration. Perfect for unique builds with ${ownershipData.summary.leverageCount} leverage plays available.`}
                        {ownershipData.summary.slateType === 'Balanced slate' &&
                          `Balanced ownership distribution. Focus on value plays and consider {ownershipData.summary.leverageCount} leverage opportunities for differentiation.`}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="font-bold text-sm mb-1">🎯 Strategy</div>
                      <p className="text-xs text-purple-100 leading-relaxed">
                        {ownershipData.summary.topOwnedPlayer} is the chalkiest play at {ownershipData.summary.topOwnedPlayerOwnership}%.
                        {ownershipData.summary.topOwnedPlayerOwnership > 35 ?
                          ' Consider fading in GPPs for lower ownership builds.' :
                          ' Solid cash game play with tournament upside.'
                        }
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                      <div className="font-bold text-sm mb-1">⚡ Leverage Edge</div>
                      <p className="text-xs text-purple-100 leading-relaxed">
                        Target the {ownershipData.summary.leverageCount} identified leverage plays (low ownership + strong projection) to separate from the field in GPPs.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-4 border-t border-white/20">
                <div className="text-xs text-purple-200">
                  💡 Tip: Sort by leverage to find the best contrarian opportunities
                </div>
              </div>
            </motion.div>

            {/* Ownership Summary Widget */}
            <AnimatePresence>
              {loadStatus === 'loaded' && ownershipData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF, #F1F5F9)'
                  }}
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Ownership Summary</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-600">Total Players</span>
                      <span className="text-lg font-black text-slate-900">{ownershipData.players.length}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-600">Ultra Chalk (30%+)</span>
                      <span className="text-lg font-black text-red-600">{ownershipTiers.ultraChalk.length}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-600">Chalk (20-30%)</span>
                      <span className="text-lg font-black text-orange-600">{ownershipTiers.chalk.length}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-600">Pivots (10-20%)</span>
                      <span className="text-lg font-black text-yellow-600">{ownershipTiers.pivots.length}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-slate-600">Leverage Plays</span>
                      <span className="text-lg font-black text-green-600">{ownershipTiers.leverage.length}</span>
                    </div>

                    {ownershipTiers.traps.length > 0 && (
                      <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                        <span className="text-sm font-semibold text-slate-600">⚠️ Traps</span>
                        <span className="text-lg font-black text-purple-600">{ownershipTiers.traps.length}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="text-xs text-slate-500">
                      Last updated: {new Date(ownershipData.meta.timestamp).toLocaleTimeString()}
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
