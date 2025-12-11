'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function NFLSlatePage() {
  const router = useRouter()
  const [slateData, setSlateData] = useState(null)
  const [loadStatus, setLoadStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const handleLoadSlate = async () => {
    setLoadStatus('loading')
    setError(null)
    try {
      const response = await fetch('/api/nfl/slate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'load' })
      })
      if (!response.ok) throw new Error('API request failed')
      const data = await response.json()
      setSlateData(data)
      setLoadStatus('loaded')
    } catch (err) {
      setError(err.message)
      setLoadStatus('error')
    }
  }

  const searchResults = useMemo(() => {
    if (!slateData || !searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return slateData.playerPool.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.position.toLowerCase().includes(query) ||
      p.team.toLowerCase().includes(query)
    ).slice(0, 6)
  }, [slateData, searchQuery])

  const openPlayerModal = (playerName) => {
    setSelectedPlayer(playerName)
    setShowPlayerModal(true)
  }

  // Auto-rotate carousel every 5 seconds
  useState(() => {
    if (loadStatus === 'loaded' && slateData) {
      const interval = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % slateData.playerCarousel.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [loadStatus, slateData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b-4 border-orange-500 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">NFL RESEARCH CENTER</h1>
              <p className="text-sm text-slate-300 mt-1">Premium NFL slate intelligence & matchup analysis</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadStatus === 'idle' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-7xl mb-6">🏈</div>
            <h2 className="text-3xl font-black text-slate-900 mb-3">NFL Slate Research Center</h2>
            <p className="text-slate-600 mb-8">Access deep stats, matchup intelligence, and game analysis</p>
            <button onClick={handleLoadSlate} className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-black rounded-xl hover:shadow-xl transition-all">Load NFL Slate</button>
          </motion.div>
        )}

        {loadStatus === 'loading' && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin text-6xl mb-4">⚡</div>
            <h3 className="text-2xl font-black text-slate-900">Loading NFL Research Center...</h3>
          </div>
        )}

        {loadStatus === 'error' && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-black text-red-600">Error: {error}</h3>
            <button onClick={handleLoadSlate} className="mt-4 px-6 py-3 bg-slate-900 text-white font-bold rounded-lg">Retry</button>
          </div>
        )}

        {loadStatus === 'loaded' && slateData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">

            {/* ============ TOP SECTION: 2/3 CAROUSEL + 1/3 TOOLS ============ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Player Carousel Hero (2/3) */}
              <div className="lg:col-span-2">
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden" style={{ height: '400px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      {/* Placeholder for NFL action image */}
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center">
                        <div className="text-center text-white p-8">
                          <div className="text-8xl mb-4">{slateData.playerCarousel[carouselIndex].headshot || '🏈'}</div>
                          <h2 className="text-4xl font-black mb-2">{slateData.playerCarousel[carouselIndex].name}</h2>
                          <p className="text-xl text-blue-200 mb-4">{slateData.playerCarousel[carouselIndex].position} • {slateData.playerCarousel[carouselIndex].team}</p>
                          <p className="text-sm text-slate-300 max-w-md mx-auto">{slateData.playerCarousel[carouselIndex].caption}</p>
                        </div>
                      </div>

                      {/* Overlay with search bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-xl">
                          <span className="text-2xl">🔍</span>
                          <input
                            type="text"
                            placeholder="Search players, teams, positions..."
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value)
                              setShowSearchResults(e.target.value.length > 0)
                            }}
                            className="flex-1 text-lg font-semibold outline-none"
                          />
                          {searchQuery && <button onClick={() => { setSearchQuery(''); setShowSearchResults(false) }} className="text-slate-400 font-bold">✕</button>}
                        </div>

                        {/* Search dropdown */}
                        {showSearchResults && searchResults.length > 0 && (
                          <div className="mt-2 bg-white rounded-xl shadow-2xl max-h-64 overflow-auto">
                            {searchResults.map(p => (
                              <button
                                key={p.id}
                                onClick={() => openPlayerModal(p.name)}
                                className="w-full p-3 border-b hover:bg-blue-50 text-left transition-colors"
                              >
                                <div className="flex justify-between items-center">
                                  <div><span className="font-black">{p.name}</span> <span className="text-xs text-slate-600">• {p.position} • {p.team}</span></div>
                                  <span className="text-sm font-bold text-blue-600">{p.projection} pts</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel indicators */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {slateData.playerCarousel.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${idx === carouselIndex ? 'bg-white w-8' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured NFL Tools Panel (1/3) */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-xl border border-slate-200 p-6">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">🛠️</span>
                  NFL Research Tools
                </h3>

                <div className="space-y-4">
                  {/* Player Research */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-600 uppercase mb-2">Player Research</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">📊 Season Stats</button>
                      <button className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">📈 Game Logs</button>
                      <button className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">📉 Player Trends</button>
                    </div>
                  </div>

                  {/* Matchup & Game Research */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-600 uppercase mb-2">Matchup Analysis</h4>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">⚔️ Matchup Intelligence</button>
                      <button className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">🏆 Team Stats</button>
                      <button className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">☁️ Weather Center</button>
                      <button className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">🏥 Injury Hub</button>
                    </div>
                  </div>

                  {/* DFS Tools */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-600 uppercase mb-2">DFS Tools</h4>
                    <div className="space-y-2">
                      <button onClick={() => router.push('/projections')} className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-green-50 transition-colors text-sm font-semibold">📊 Projections</button>
                      <button onClick={() => router.push('/optimizer')} className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-green-50 transition-colors text-sm font-semibold">🚀 Optimizer</button>
                      <button onClick={() => router.push('/brainsheet')} className="w-full text-left px-3 py-2 bg-white rounded-lg hover:bg-green-50 transition-colors text-sm font-semibold">📋 Brainsheet</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ SLATE HEADLINES (KEEP) ============ */}
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">📰</span>
                Slate Headlines
              </h3>
              <div className="space-y-2">
                {slateData.slateHeadlines.map(h => (
                  <div key={h.id} className={`border-l-4 rounded-lg p-4 shadow-md ${h.severity === 'high' ? 'border-red-500 bg-red-50' : h.severity === 'positive' ? 'border-green-500 bg-green-50' : 'border-amber-500 bg-amber-50'}`}>
                    <div className="flex justify-between items-start gap-3">
                      <span className="font-semibold text-slate-900">{h.text}</span>
                      <span className="text-xs text-slate-500 whitespace-nowrap">{h.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ============ LAST WEEK PERFORMANCE (COMPACT HORIZONTAL SCROLL) ============ */}
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">📈</span>
                Last Week's Performance
              </h3>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4" style={{ width: 'max-content' }}>
                  {slateData.lastWeekPerformance.slice(0, 8).map(p => (
                    <button
                      key={p.id}
                      onClick={() => openPlayerModal(p.name)}
                      className="bg-white rounded-xl border border-slate-200 shadow-md p-4 hover:shadow-xl transition-all"
                      style={{ width: '220px', minWidth: '220px' }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-sm">{p.position}</div>
                        <div className="text-left">
                          <div className="font-black text-sm">{p.name}</div>
                          <div className="text-xs text-slate-600">{p.team}</div>
                        </div>
                      </div>
                      <div className="text-3xl font-black text-green-600 mb-2">{p.fantasyPoints}</div>
                      <div className="text-xs text-slate-600 space-y-1">
                        <div>Snaps: {p.snapsPercent}%</div>
                        {p.touches > 0 && <div>Touches: {p.touches}</div>}
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        <div className="text-xs text-blue-800 leading-relaxed">{p.efficiencyNote.substring(0, 50)}...</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ============ SEASON STATS BLOCK (NEW) ============ */}
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">📊</span>
                Season Stats Leaders
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slateData.seasonStats.map(p => (
                  <button
                    key={p.id}
                    onClick={() => openPlayerModal(p.name)}
                    className="bg-white rounded-xl border border-slate-200 shadow-md p-5 hover:shadow-xl transition-all text-left"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-2xl">{p.headshot}</div>
                      <div>
                        <div className="font-black text-lg">{p.name}</div>
                        <div className="text-sm text-slate-600">{p.position} • {p.team}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-green-50 rounded p-2"><div className="text-xs text-green-800">Fantasy PPG</div><div className="font-black text-lg text-green-900">{p.fantasyPPG}</div></div>
                      {p.position === 'QB' && <div className="bg-blue-50 rounded p-2"><div className="text-xs text-blue-800">Pass YPG</div><div className="font-black text-lg text-blue-900">{p.passingYPG}</div></div>}
                      {p.position === 'RB' && <div className="bg-blue-50 rounded p-2"><div className="text-xs text-blue-800">Rush YPG</div><div className="font-black text-lg text-blue-900">{p.rushingYPG}</div></div>}
                      {(p.position === 'WR' || p.position === 'TE') && <div className="bg-blue-50 rounded p-2"><div className="text-xs text-blue-800">Rec YPG</div><div className="font-black text-lg text-blue-900">{p.receivingYPG}</div></div>}
                      <div className="bg-orange-50 rounded p-2"><div className="text-xs text-orange-800">TDs</div><div className="font-black text-lg text-orange-900">{p.totalTDs || p.passingTDs}</div></div>
                      <div className="bg-purple-50 rounded p-2"><div className="text-xs text-purple-800">Efficiency</div><div className="font-black text-sm text-purple-900">{p.efficiencyMetric}</div></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ============ MATCHUP INTELLIGENCE (NEW) ============ */}
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">⚔️</span>
                Matchup Intelligence
              </h3>
              <div className="space-y-4">
                {slateData.matchupIntelligence.map(m => (
                  <div key={m.id} className="bg-white rounded-xl border border-slate-200 shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-center"><div className="text-2xl">🏈</div><div className="font-black text-lg">{m.awayTeam}</div></div>
                        <div className="text-slate-400">@</div>
                        <div className="text-center"><div className="text-2xl">🏈</div><div className="font-black text-lg">{m.homeTeam}</div></div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-amber-600">{m.vegasTotal}</div>
                        <div className="text-xs text-slate-600">Total</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="bg-slate-50 rounded p-2 text-center"><div className="text-xs text-slate-600">Pace</div><div className="font-bold text-slate-900">{m.pace}</div></div>
                      <div className="bg-blue-50 rounded p-2 text-center"><div className="text-xs text-blue-800">vs QB</div><div className="font-bold text-blue-900">{m.defVsQB.home}/{m.defVsQB.away}</div></div>
                      <div className="bg-green-50 rounded p-2 text-center"><div className="text-xs text-green-800">vs RB</div><div className="font-bold text-green-900">{m.defVsRB.home}/{m.defVsRB.away}</div></div>
                      <div className="bg-purple-50 rounded p-2 text-center"><div className="text-xs text-purple-800">vs WR</div><div className="font-bold text-purple-900">{m.defVsWR.home}/{m.defVsWR.away}</div></div>
                    </div>

                    <div className="space-y-2">
                      {m.keyMatchups.map((matchup, idx) => (
                        <div key={idx} className="text-sm text-slate-700 bg-amber-50 rounded px-3 py-2">• {matchup}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ============ TEAM STATS (NEW) ============ */}
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">🏆</span>
                Team Stats Dashboard
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slateData.teamStats.map(t => (
                  <div key={t.team} className="bg-white rounded-xl border border-slate-200 shadow-md p-6">
                    <h4 className="text-2xl font-black text-slate-900 mb-4">{t.team}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-bold text-green-800 mb-2">Offense (#{t.offense.rank})</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between"><span className="text-slate-600">EPA:</span><span className="font-bold">{t.offense.epa}</span></div>
                          <div className="flex justify-between"><span className="text-slate-600">PPG:</span><span className="font-bold">{t.offense.pointsPG}</span></div>
                          <div className="flex justify-between"><span className="text-slate-600">RZ%:</span><span className="font-bold">{t.offense.redZoneEff}%</span></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-red-800 mb-2">Defense (#{t.defense.rank})</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between"><span className="text-slate-600">EPA:</span><span className="font-bold">{t.defense.epa}</span></div>
                          <div className="flex justify-between"><span className="text-slate-600">Allow:</span><span className="font-bold">{t.defense.pointsAllowedPG}</span></div>
                          <div className="flex justify-between"><span className="text-slate-600">Press%:</span><span className="font-bold">{t.defense.pressureRate}%</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ============ WEATHER & INJURY HUB (NEW) ============ */}
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">☁️</span>
                Weather & Injury Hub
              </h3>
              <div className="space-y-3">
                {slateData.weatherInjuryHub.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-md p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-black text-lg">{item.game}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.weather.icon}</span>
                        <div className="text-sm"><div className="font-bold">{item.weather.condition}</div><div className="text-xs text-slate-600">{item.weather.temp}°F • Wind {item.weather.wind}mph</div></div>
                      </div>
                    </div>
                    {item.weather.impact !== 'None' && (
                      <div className="bg-red-50 border border-red-200 rounded px-3 py-2 mb-3">
                        <div className="text-sm font-bold text-red-800">⚠️ {item.weather.impact}</div>
                      </div>
                    )}
                    {item.injuries.length > 0 && (
                      <div className="space-y-2">
                        {item.injuries.map((inj, i) => (
                          <div key={i} className={`border-l-4 rounded px-3 py-2 ${inj.impact === 'High' ? 'border-red-500 bg-red-50' : inj.impact === 'Medium' ? 'border-amber-500 bg-amber-50' : 'border-green-500 bg-green-50'}`}>
                            <div className="font-bold text-sm">{inj.player} ({inj.position}) - {inj.status}</div>
                            <div className="text-xs text-slate-700 mt-1">{inj.note}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ============ LINEUPIQ SUMMARY (KEEP) ============ */}
            <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">🤖</div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">LineupIQ's NFL Slate Summary</h3>
                  <p className="text-sm text-slate-600">Strategic intelligence in plain English</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{slateData.lineupiqSummary}</p>
            </div>

            {/* ============ RESEARCH-FOCUSED ACTION BUTTONS ============ */}
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => router.push('/optimizer')} className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-black rounded-xl hover:shadow-xl transition-all">🚀 Open Optimizer</button>
              <button onClick={() => router.push('/sim')} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-black rounded-xl hover:shadow-xl transition-all">🎲 Run NFL Sim</button>
              <button onClick={() => router.push('/projections')} className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-lg font-black rounded-xl hover:shadow-xl transition-all">📊 View Projections</button>
              <button onClick={() => router.push('/brainsheet')} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-black rounded-xl hover:shadow-xl transition-all">📋 Open Brainsheet</button>
            </div>

          </motion.div>
        )}

        {/* ============ PLAYER MODAL (NEW) ============ */}
        <AnimatePresence>
          {showPlayerModal && selectedPlayer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={() => setShowPlayerModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900">{selectedPlayer}</h2>
                      <p className="text-slate-600">Player Research Center</p>
                    </div>
                    <button onClick={() => setShowPlayerModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl font-bold">✕</button>
                  </div>

                  {/* Player modal content */}
                  {slateData.gameLogs[selectedPlayer] && (
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-4">Last 5 Games</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-100 border-b-2 border-slate-300">
                            <tr>
                              <th className="text-left p-2 font-bold">Week</th>
                              <th className="text-left p-2 font-bold">FP</th>
                              <th className="text-left p-2 font-bold">Snaps</th>
                              <th className="text-left p-2 font-bold">Yards</th>
                              <th className="text-left p-2 font-bold">TDs</th>
                              <th className="text-left p-2 font-bold">Note</th>
                            </tr>
                          </thead>
                          <tbody>
                            {slateData.gameLogs[selectedPlayer].map((game, idx) => (
                              <tr key={idx} className="border-b border-slate-200">
                                <td className="p-2 font-bold">Wk {game.week}</td>
                                <td className="p-2 font-bold text-green-600">{game.fp}</td>
                                <td className="p-2">{game.snaps}%</td>
                                <td className="p-2">{game.yards}</td>
                                <td className="p-2">{game.tds}</td>
                                <td className="p-2 text-xs text-slate-700">{game.note}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex gap-3">
                    <button onClick={() => router.push('/projections')} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">View Projections</button>
                    <button onClick={() => router.push('/optimizer')} className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Add to Optimizer</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
