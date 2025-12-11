'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ============================================================
// BRAINSHEET MODE — V1.0
// World-class DFS strategy dashboard
// ============================================================

export default function BrainsheetPage() {
  const router = useRouter()

  // State
  const [selectedSport, setSelectedSport] = useState('NFL')
  const [selectedSlate, setSelectedSlate] = useState('Main Slate')
  const [selectedSite, setSelectedSite] = useState('DraftKings')
  const [brainsheetData, setBrainsheetData] = useState(null)
  const [loadStatus, setLoadStatus] = useState('idle') // idle | loading | loaded | error
  const [error, setError] = useState(null)

  // Slate options
  const slateOptions = {
    NFL: ['Main Slate', 'Sunday Early', 'Sunday Late', 'Primetime'],
    NBA: ['Main Slate', 'Early Slate', 'Late Slate'],
    MLB: ['Main Slate', 'Early Slate', 'Afternoon', 'Night Games']
  }

  // Load brainsheet
  const handleLoadBrainsheet = async () => {
    setLoadStatus('loading')
    setError(null)

    try {
      const response = await fetch('/api/brainsheet/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport: selectedSport,
          slate: selectedSlate,
          site: selectedSite === 'DraftKings' ? 'DK' : 'FD'
        })
      })

      if (!response.ok) throw new Error('Failed to load brainsheet')

      const data = await response.json()
      setBrainsheetData(data)
      setLoadStatus('loaded')
    } catch (err) {
      setError('Failed to load brainsheet. Please try again.')
      setLoadStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b-4 border-amber-500 shadow-xl">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-3xl font-black text-white hover:text-blue-300 transition-colors">
                FantasyHub<span className="text-blue-400">AI</span>
              </Link>
              <p className="text-amber-200 text-sm mt-1 font-medium">BRAINSHEET MODE — STRATEGY COMMAND CENTER</p>
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

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Slate Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF, #F8FAFC)'
            }}
          >
            <h2 className="text-2xl font-black text-slate-900 mb-4">Select Slate</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Sport</label>
                <select
                  value={selectedSport}
                  onChange={(e) => {
                    setSelectedSport(e.target.value)
                    setSelectedSlate(slateOptions[e.target.value][0])
                  }}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="NFL">🏈 NFL</option>
                  <option value="NBA">🏀 NBA</option>
                  <option value="MLB">⚾ MLB</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Slate</label>
                <select
                  value={selectedSlate}
                  onChange={(e) => setSelectedSlate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  {slateOptions[selectedSport].map(slate => (
                    <option key={slate} value={slate}>{slate}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Site</label>
                <select
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-lg font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="DraftKings">DraftKings</option>
                  <option value="FanDuel">FanDuel</option>
                </select>
              </div>
              <div className="flex items-end">
                <motion.button
                  onClick={handleLoadBrainsheet}
                  disabled={loadStatus === 'loading'}
                  whileHover={{ scale: loadStatus === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: loadStatus === 'loading' ? 1 : 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  style={{
                    boxShadow: loadStatus === 'loading' ? 'none' : '0 8px 20px rgba(217,119,6,0.4)'
                  }}
                >
                  {loadStatus === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    '📊 Load Brainsheet'
                  )}
                </motion.button>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>
        </motion.div>

        {/* BRAINSHEET CONTENT */}
        <AnimatePresence>
          {loadStatus === 'loaded' && brainsheetData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* ========== TOP SECTION - SLATE HEADLINE SUMMARY ========== */}
              <section>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-8 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #F8FAFC, #EEF4FF)'
                  }}
                >
                  <h2 className="text-3xl font-black text-slate-900 mb-6">Slate Overview</h2>

                  {/* Metric Tiles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {/* Best Game */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200"
                      style={{
                        boxShadow: '0 4px 14px rgba(59,130,246,0.15)'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">🏟️</div>
                        <h3 className="text-sm font-bold text-slate-600 uppercase">Best Game</h3>
                      </div>
                      <p className="text-2xl font-black text-blue-700">{brainsheetData.slateMetrics.bestGame}</p>
                    </motion.div>

                    {/* Top Team */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 }}
                      className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200"
                      style={{
                        boxShadow: '0 4px 14px rgba(34,197,94,0.15)'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">🎯</div>
                        <h3 className="text-sm font-bold text-slate-600 uppercase">Top Team</h3>
                      </div>
                      <p className="text-2xl font-black text-green-700">{brainsheetData.slateMetrics.topTeam}</p>
                    </motion.div>

                    {/* Slate Shape */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200"
                      style={{
                        boxShadow: '0 4px 14px rgba(168,85,247,0.15)'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">📊</div>
                        <h3 className="text-sm font-bold text-slate-600 uppercase">Slate Shape</h3>
                      </div>
                      <p className="text-lg font-black text-purple-700">{brainsheetData.slateMetrics.slateShape}</p>
                    </motion.div>

                    {/* Value Indicator */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25 }}
                      className="bg-white rounded-xl p-6 shadow-md border-2 border-amber-200"
                      style={{
                        boxShadow: '0 4px 14px rgba(245,158,11,0.15)'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">💰</div>
                        <h3 className="text-sm font-bold text-slate-600 uppercase">Value</h3>
                      </div>
                      <p className="text-lg font-black text-amber-700">{brainsheetData.slateMetrics.valueIndicator}</p>
                    </motion.div>

                    {/* Ownership Concentration */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-xl p-6 shadow-md border-2 border-orange-200"
                      style={{
                        boxShadow: '0 4px 14px rgba(249,115,22,0.15)'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">👥</div>
                        <h3 className="text-sm font-bold text-slate-600 uppercase">Ownership</h3>
                      </div>
                      <p className="text-lg font-black text-orange-700">{brainsheetData.slateMetrics.ownershipConcentration}</p>
                    </motion.div>

                    {/* Leverage Count */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 }}
                      className="bg-white rounded-xl p-6 shadow-md border-2 border-teal-200"
                      style={{
                        boxShadow: '0 4px 14px rgba(20,184,166,0.15)'
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-3xl">⚡</div>
                        <h3 className="text-sm font-bold text-slate-600 uppercase">Leverage Plays</h3>
                      </div>
                      <p className="text-2xl font-black text-teal-700">{brainsheetData.slateMetrics.leverageCount} Strong Plays</p>
                    </motion.div>
                  </div>

                  {/* Core Plays Strip */}
                  <div className="mt-6">
                    <h3 className="text-xl font-black text-slate-900 mb-4">🎯 Core Plays</h3>
                    <div className="flex flex-wrap gap-3">
                      {brainsheetData.corePlays.map((play, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                          className="px-6 py-3 rounded-xl shadow-lg border-2 border-amber-300"
                          style={{
                            background: 'linear-gradient(135deg, #FFF8E7, #FFE3B0)',
                            boxShadow: '0 4px 12px rgba(245,158,11,0.25)'
                          }}
                        >
                          <div className="text-xs font-bold text-amber-800 uppercase">{play.position}</div>
                          <div className="text-lg font-black text-slate-900">{play.name}</div>
                          <div className="text-sm font-semibold text-slate-600">{play.team} • {play.projection.toFixed(1)} proj</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* ========== MIDDLE SECTION - STRATEGY ZONES ========== */}
              <section>
                {/* Value & Leverage Tiers (Two-column) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* LEFT - VALUE TIERS */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-xl p-6 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #F0F9FF, #E0F2FE)'
                    }}
                  >
                    <h3 className="text-2xl font-black text-blue-900 mb-5">💎 Value Tiers</h3>

                    {/* Tier 1 */}
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-blue-700 uppercase mb-3">Tier 1 Value</h4>
                      <div className="space-y-2">
                        {brainsheetData.valueTiers.tier1.map((player, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + idx * 0.05 }}
                            className="bg-white rounded-lg p-4 shadow-md border border-blue-200 hover:border-blue-400 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{player.image}</div>
                                <div>
                                  <div className="font-black text-slate-900">{player.name}</div>
                                  <div className="text-xs text-slate-600 font-semibold">{player.position} • {player.team}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-black text-blue-700">{player.value}</div>
                                <div className="text-xs text-slate-500 font-semibold">${(player.salary/1000).toFixed(1)}k</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tier 2 */}
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-blue-600 uppercase mb-3">Tier 2 Value</h4>
                      <div className="space-y-2">
                        {brainsheetData.valueTiers.tier2.map((player, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + idx * 0.05 }}
                            className="bg-white rounded-lg p-3 shadow-sm border border-blue-100"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="text-xl">{player.image}</div>
                                <div>
                                  <div className="font-bold text-slate-900 text-sm">{player.name}</div>
                                  <div className="text-xs text-slate-500">{player.position} • {player.team}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-blue-600">{player.value}</div>
                                <div className="text-xs text-slate-500">${(player.salary/1000).toFixed(1)}k</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tier 3 */}
                    <div>
                      <h4 className="text-sm font-bold text-blue-500 uppercase mb-3">Tier 3 Value</h4>
                      <div className="space-y-2">
                        {brainsheetData.valueTiers.tier3.map((player, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + idx * 0.05 }}
                            className="bg-white rounded-lg p-3 shadow-sm border border-blue-100"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="text-xl">{player.image}</div>
                                <div>
                                  <div className="font-bold text-slate-900 text-sm">{player.name}</div>
                                  <div className="text-xs text-slate-500">{player.position} • {player.team}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-blue-600">{player.value}</div>
                                <div className="text-xs text-slate-500">${(player.salary/1000).toFixed(1)}k</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* RIGHT - LEVERAGE TIERS */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-xl p-6 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
                      boxShadow: '0 6px 20px rgba(34,197,94,0.20)'
                    }}
                  >
                    <h3 className="text-2xl font-black text-green-900 mb-5">⚡ Leverage Tiers</h3>

                    {/* Tier 1 */}
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-green-700 uppercase mb-3">Tier 1 Leverage</h4>
                      <div className="space-y-2">
                        {brainsheetData.leverageTiers.tier1.map((player, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + idx * 0.05 }}
                            className="bg-white rounded-lg p-4 shadow-md border-2 border-green-300 hover:border-green-500 transition-all"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="font-black text-slate-900">{player.name}</div>
                                <div className="text-xs text-slate-600 font-semibold">{player.position} • {player.team}</div>
                              </div>
                              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold border border-green-300">
                                Leverage
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-slate-700">
                                <span className="font-semibold">Proj:</span> {player.projection.toFixed(1)} • <span className="font-semibold">Own:</span> {player.ownership.toFixed(1)}%
                              </div>
                              <div className="text-sm font-black text-green-700">{player.advantage}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tier 2 */}
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-green-600 uppercase mb-3">Tier 2 Leverage</h4>
                      <div className="space-y-2">
                        {brainsheetData.leverageTiers.tier2.map((player, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + idx * 0.05 }}
                            className="bg-white rounded-lg p-3 shadow-sm border border-green-200"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <div className="font-bold text-slate-900 text-sm">{player.name}</div>
                                <div className="text-xs text-slate-500">{player.position} • {player.team}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-slate-600">
                                Proj: {player.projection.toFixed(1)} • Own: {player.ownership.toFixed(1)}%
                              </div>
                              <div className="text-xs font-bold text-green-600">{player.advantage}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tier 3 */}
                    <div>
                      <h4 className="text-sm font-bold text-green-500 uppercase mb-3">Tier 3 Leverage</h4>
                      <div className="space-y-2">
                        {brainsheetData.leverageTiers.tier3.map((player, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + idx * 0.05 }}
                            className="bg-white rounded-lg p-3 shadow-sm border border-green-200"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <div className="font-bold text-slate-900 text-sm">{player.name}</div>
                                <div className="text-xs text-slate-500">{player.position} • {player.team}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-slate-600">
                                Proj: {player.projection.toFixed(1)} • Own: {player.ownership.toFixed(1)}%
                              </div>
                              <div className="text-xs font-bold text-green-600">{player.advantage}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Chalk Map (Full Width) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Safe Chalk */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="rounded-xl p-6 shadow-lg"
                    style={{
                      background: 'linear-gradient(90deg, #FFF7E6, #FFE0B5)'
                    }}
                  >
                    <h3 className="text-xl font-black text-amber-900 mb-4">✅ Safe Chalk</h3>
                    <div className="space-y-3">
                      {brainsheetData.chalkMap.safeChalk.map((player, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.0 + idx * 0.05 }}
                          className="bg-white rounded-lg p-4 shadow-md border border-amber-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-black text-slate-900">{player.name}</div>
                              <div className="text-xs text-slate-600 font-semibold">{player.position} • {player.team}</div>
                            </div>
                            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                              {player.trapRisk} Risk
                            </div>
                          </div>
                          <div className="text-sm text-slate-700">
                            <span className="font-semibold">Proj:</span> {player.projection.toFixed(1)} • <span className="font-semibold">Own:</span> {player.ownership.toFixed(1)}%
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Risky Chalk (Traps) */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="rounded-xl p-6 shadow-lg"
                    style={{
                      background: 'linear-gradient(90deg, #FEE2E2, #FECACA)'
                    }}
                  >
                    <h3 className="text-xl font-black text-red-900 mb-4">⚠️ Risky Chalk (Traps)</h3>
                    <div className="space-y-3">
                      {brainsheetData.chalkMap.riskyChalk.map((player, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.0 + idx * 0.05 }}
                          className="bg-white rounded-lg p-4 shadow-md border-2 border-red-300"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-black text-slate-900">{player.name}</div>
                              <div className="text-xs text-slate-600 font-semibold">{player.position} • {player.team}</div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                              player.trapRisk === 'High' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {player.trapRisk} Risk
                            </div>
                          </div>
                          <div className="text-sm text-slate-700 mb-1">
                            <span className="font-semibold">Proj:</span> {player.projection.toFixed(1)} • <span className="font-semibold">Own:</span> {player.ownership.toFixed(1)}%
                          </div>
                          <div className="text-xs text-red-700 font-semibold italic">
                            {player.reason}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Stack Game Plan (Full Width) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="rounded-xl p-8 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #F0F9FF, #E3ECFF)',
                    boxShadow: '0 6px 20px rgba(59,130,246,0.20)'
                  }}
                >
                  <h3 className="text-3xl font-black text-blue-900 mb-6">🎯 Stack Game Plan</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Primary Stack */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 }}
                      className="bg-white rounded-xl p-6 shadow-xl border-2 border-blue-400"
                      style={{
                        boxShadow: '0 8px 24px rgba(59,130,246,0.25)'
                      }}
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">🔵</div>
                        <h4 className="text-sm font-bold text-blue-600 uppercase">{brainsheetData.stackGamePlan.primary.type}</h4>
                        <h5 className="text-2xl font-black text-slate-900 mb-1">{brainsheetData.stackGamePlan.primary.team}</h5>
                        <div className="text-sm text-slate-600 font-semibold">
                          {brainsheetData.stackGamePlan.primary.positions.join(' + ')}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 font-semibold">Ownership:</span>
                          <span className="font-bold text-orange-600">{brainsheetData.stackGamePlan.primary.ownership}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 font-semibold">Leverage:</span>
                          <span className="font-bold text-green-600">+{brainsheetData.stackGamePlan.primary.leverage}%</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {brainsheetData.stackGamePlan.primary.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Mini Stack */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.25 }}
                      className="bg-white rounded-xl p-6 shadow-lg border-2 border-teal-300"
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">🟢</div>
                        <h4 className="text-sm font-bold text-teal-600 uppercase">{brainsheetData.stackGamePlan.mini.type}</h4>
                        <h5 className="text-2xl font-black text-slate-900 mb-1">{brainsheetData.stackGamePlan.mini.team}</h5>
                        <div className="text-sm text-slate-600 font-semibold">
                          {brainsheetData.stackGamePlan.mini.positions.join(' + ')}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 font-semibold">Ownership:</span>
                          <span className="font-bold text-orange-600">{brainsheetData.stackGamePlan.mini.ownership}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 font-semibold">Leverage:</span>
                          <span className="font-bold text-green-600">+{brainsheetData.stackGamePlan.mini.leverage}%</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {brainsheetData.stackGamePlan.mini.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Leverage Stack */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3 }}
                      className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-400"
                      style={{
                        background: 'linear-gradient(135deg, #FFFFFF, #F0FDF4)'
                      }}
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">⚡</div>
                        <h4 className="text-sm font-bold text-green-600 uppercase">{brainsheetData.stackGamePlan.leverage.type}</h4>
                        <h5 className="text-2xl font-black text-slate-900 mb-1">{brainsheetData.stackGamePlan.leverage.team}</h5>
                        <div className="text-sm text-slate-600 font-semibold">
                          {brainsheetData.stackGamePlan.leverage.positions.join(' + ')}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 font-semibold">Ownership:</span>
                          <span className="font-bold text-orange-600">{brainsheetData.stackGamePlan.leverage.ownership}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 font-semibold">Leverage:</span>
                          <span className="font-bold text-green-600">+{brainsheetData.stackGamePlan.leverage.leverage}%</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {brainsheetData.stackGamePlan.leverage.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </section>

              {/* ========== BOTTOM SECTION - LINEUPIQ SUMMARY ========== */}
              <section>
                {/* LineupIQ Summary Block */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="bg-white rounded-xl p-8 shadow-xl mb-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">LineupIQ's Slate Summary</h3>
                      <p className="text-sm text-slate-600">AI-powered strategic analysis</p>
                    </div>
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-base text-slate-700 leading-relaxed">
                      {brainsheetData.lineupiqSummary}
                    </p>
                  </div>
                </motion.div>

                {/* Contest Path Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Cash Games */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="rounded-xl p-6 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #E8F5E9, #D0ECD3)'
                    }}
                  >
                    <h4 className="text-xl font-black text-green-900 mb-4">💵 Cash Games</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-bold text-green-800 uppercase mb-1">Core</div>
                        <div className="text-sm text-slate-700 font-semibold">
                          {brainsheetData.contestPaths.cash.core.join(', ')}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-green-800 uppercase mb-1">Stack Strategy</div>
                        <div className="text-sm text-slate-700">{brainsheetData.contestPaths.cash.stacks}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-green-800 uppercase mb-1">Risk Level</div>
                        <div className="text-sm text-slate-700">{brainsheetData.contestPaths.cash.risk}</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Single Entry / 3-Max */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.55 }}
                    className="rounded-xl p-6 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)'
                    }}
                  >
                    <h4 className="text-xl font-black text-amber-900 mb-4">🎯 Single Entry / 3-Max</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-bold text-amber-800 uppercase mb-1">Core</div>
                        <div className="text-sm text-slate-700 font-semibold">
                          {brainsheetData.contestPaths.singleEntry.core.join(', ')}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-800 uppercase mb-1">Leverage Targets</div>
                        <div className="text-sm text-slate-700 font-semibold">
                          {brainsheetData.contestPaths.singleEntry.leverage.join(', ')}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-800 uppercase mb-1">Stack Strategy</div>
                        <div className="text-sm text-slate-700">{brainsheetData.contestPaths.singleEntry.stacks}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-800 uppercase mb-1">Risk Level</div>
                        <div className="text-sm text-slate-700">{brainsheetData.contestPaths.singleEntry.risk}</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Large-Field GPP */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                    className="rounded-xl p-6 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #E0F2FE, #BFDBFE)'
                    }}
                  >
                    <h4 className="text-xl font-black text-blue-900 mb-4">🏆 Large-Field GPP</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-bold text-blue-800 uppercase mb-1">Core</div>
                        <div className="text-sm text-slate-700 font-semibold">
                          {brainsheetData.contestPaths.gpp.core.join(', ')}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-800 uppercase mb-1">Leverage Targets</div>
                        <div className="text-sm text-slate-700 font-semibold">
                          {brainsheetData.contestPaths.gpp.leverage.join(', ')}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-800 uppercase mb-1">Stack Strategy</div>
                        <div className="text-sm text-slate-700">{brainsheetData.contestPaths.gpp.stacks}</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-800 uppercase mb-1">Risk Level</div>
                        <div className="text-sm text-slate-700">{brainsheetData.contestPaths.gpp.risk}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.65 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <button
                    onClick={() => router.push('/optimizer')}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-black text-lg rounded-xl shadow-2xl hover:shadow-green-500/50 hover:scale-105 transition-all"
                  >
                    🚀 Send to Optimizer
                  </button>
                  <button
                    onClick={() => router.push('/ownership')}
                    className="px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    👥 Open Ownership View
                  </button>
                  <button
                    onClick={() => router.push('/projections')}
                    className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    📊 Open Projections View
                  </button>
                </motion.div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {loadStatus === 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Ready to Build Your Brainsheet</h3>
            <p className="text-slate-600 text-lg">
              Select your sport, slate, and site above, then click "Load Brainsheet"
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
