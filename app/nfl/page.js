'use client'
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function NFLSlateHub() {
  const router = useRouter()
  const [slateData, setSlateData] = useState(null)
  const [loadStatus, setLoadStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('season-stats')

  const handleLoadSlate = async () => {
    setLoadStatus('loading')
    setError(null)
    try {
      const response = await fetch('/api/nfl/slate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'load' })
      })
      if (!response.ok) throw new Error('Failed to load slate')
      const data = await response.json()
      setSlateData(data)
      setLoadStatus('loaded')
    } catch (err) {
      setError(err.message)
      setLoadStatus('error')
    }
  }

  // Auto-rotate carousel
  useEffect(() => {
    if (loadStatus === 'loaded' && slateData) {
      const interval = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % slateData.playerCarousel.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [loadStatus, slateData])

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Header */}
      <header className="bg-slate-900 border-b-4 border-orange-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl md:text-3xl font-black text-white">NFL SLATE HUB</h1>
          <p className="text-xs text-slate-400 mt-1">Powered by LineupIQ™</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* IDLE STATE */}
        {loadStatus === 'idle' && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🏈</div>
            <h2 className="text-4xl font-black text-slate-900 mb-4">NFL Slate Research Hub</h2>
            <p className="text-slate-600 mb-8 text-lg">Media-first NFL intelligence with AI-powered insights</p>
            <button
              onClick={handleLoadSlate}
              className="px-10 py-5 bg-orange-600 text-white text-xl font-black rounded-xl hover:bg-orange-700 transition-all shadow-xl"
            >
              Load Today's Slate
            </button>
          </div>
        )}

        {/* LOADING STATE */}
        {loadStatus === 'loading' && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin text-7xl mb-4">⚡</div>
            <h3 className="text-2xl font-black text-slate-900">Loading NFL Slate...</h3>
          </div>
        )}

        {/* ERROR STATE */}
        {loadStatus === 'error' && (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">⚠️</div>
            <h3 className="text-2xl font-black text-red-600 mb-4">Error: {error}</h3>
            <button onClick={handleLoadSlate} className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg">Retry</button>
          </div>
        )}

        {/* LOADED STATE */}
        {loadStatus === 'loaded' && slateData && (
          <div className="space-y-12">

            {/* ========== TOP SECTION: MEDIA HERO ZONE ========== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* 2/3 HERO CAROUSEL */}
              <div className="lg:col-span-2">
                <div className="relative bg-slate-100 rounded-2xl overflow-hidden shadow-2xl" style={{ height: '450px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      {/* Player Photography Placeholder */}
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-9xl mb-4">🏈</div>
                          <h2 className="text-5xl font-black text-white mb-3">{slateData.playerCarousel[carouselIndex].name}</h2>
                          <p className="text-2xl text-blue-200 mb-4">{slateData.playerCarousel[carouselIndex].position} • {slateData.playerCarousel[carouselIndex].team}</p>
                          <p className="text-lg text-slate-300 max-w-lg mx-auto leading-relaxed">{slateData.playerCarousel[carouselIndex].caption}</p>
                        </div>
                      </div>

                      {/* Overlay Info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-white text-sm font-bold mb-1">FEATURED MATCHUP</div>
                            <div className="text-white text-3xl font-black">BUF @ KC</div>
                            <div className="text-slate-300 text-sm mt-1">Sunday 1:00 PM ET • CBS</div>
                          </div>
                          <div className="text-right">
                            <div className="text-amber-400 text-4xl font-black">52.5</div>
                            <div className="text-slate-300 text-xs">Total</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Carousel Indicators */}
                  <div className="absolute top-6 right-6 flex gap-2">
                    {slateData.playerCarousel.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCarouselIndex(idx)}
                        className={`rounded-full transition-all ${idx === carouselIndex ? 'bg-white w-10 h-3' : 'bg-white/40 w-3 h-3'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 1/3 SIDEBAR */}
              <div className="space-y-6">
                {/* Featured Tools */}
                <div className="bg-slate-50 rounded-xl p-6 shadow-lg">
                  <h3 className="text-sm font-black text-slate-900 uppercase mb-4">Featured Tools</h3>
                  <div className="space-y-3">
                    <button onClick={() => router.push('/sim')} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all text-sm">🎲 Open Sim</button>
                    <button onClick={() => router.push('/optimizer')} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all text-sm">🚀 Open Optimizer</button>
                    <button onClick={() => router.push('/brainsheet')} className="w-full py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-all text-sm">📋 Open Brainsheet</button>
                  </div>
                </div>

                {/* Quick Context Chips */}
                <div className="bg-slate-50 rounded-xl p-6 shadow-lg">
                  <h3 className="text-sm font-black text-slate-900 uppercase mb-4">Quick Context</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-red-100 border border-red-300 rounded-lg px-3 py-2">
                      <span className="text-red-600 text-lg">☁️</span>
                      <span className="text-xs font-bold text-red-800">Rain in CLE</span>
                    </div>
                    <div className="flex items-center gap-2 bg-amber-100 border border-amber-300 rounded-lg px-3 py-2">
                      <span className="text-amber-600 text-lg">🏥</span>
                      <span className="text-xs font-bold text-amber-800">CMC Questionable</span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-100 border border-green-300 rounded-lg px-3 py-2">
                      <span className="text-green-600 text-lg">📈</span>
                      <span className="text-xs font-bold text-green-800">KC Total Up 2pts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== SLATE HEADLINES ========== */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Slate Headlines</h2>
              <div className="space-y-3">
                {slateData.slateHeadlines.map(h => (
                  <div
                    key={h.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-l-4 ${
                      h.severity === 'high' ? 'bg-red-50 border-red-500' :
                      h.severity === 'positive' ? 'bg-green-50 border-green-500' :
                      'bg-amber-50 border-amber-500'
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 leading-relaxed">{h.text}</p>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{h.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ========== FEATURED MATCHUPS (MEDIA STYLE) ========== */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Featured Matchups</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {slateData.featuredGames.slice(0, 3).map(game => (
                  <div key={game.id} className="bg-slate-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🏈</div>
                          <div className="text-xl font-black text-slate-900">{game.awayTeam.code}</div>
                        </div>
                        <div className="text-slate-400 font-bold">@</div>
                        <div className="text-center">
                          <div className="text-4xl mb-2">🏈</div>
                          <div className="text-xl font-black text-slate-900">{game.homeTeam.code}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-center flex-1">
                          <div className="text-xs text-slate-600 mb-1">Spread</div>
                          <div className="font-bold text-slate-900">{game.spread}</div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-xs text-slate-600 mb-1">Total</div>
                          <div className="text-2xl font-black text-amber-600">{game.vegasTotal}</div>
                        </div>
                        <div className="text-center flex-1">
                          <div className="text-xs text-slate-600 mb-1">Pace</div>
                          <div className={`font-bold ${game.paceIndicator === 'High' ? 'text-green-600' : 'text-slate-900'}`}>{game.paceIndicator}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-200">
                        <span className="text-2xl">{game.weather.icon}</span>
                        <span className="text-sm text-slate-700">{game.weather.condition}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ========== PLAYER CONTEXT (COMPACT) ========== */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Last Week Performance</h2>
              <p className="text-slate-600 mb-6">Context for today's slate — not recommendations</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {slateData.lastWeekPerformance.slice(0, 8).map(p => (
                  <div key={p.id} className="bg-slate-50 rounded-lg p-4 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs">{p.position}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-slate-900 truncate">{p.name}</div>
                        <div className="text-xs text-slate-600">{p.team}</div>
                      </div>
                    </div>
                    <div className="text-2xl font-black text-green-600 mb-1">{p.fantasyPoints}</div>
                    <div className="text-xs text-slate-600">
                      <div>Snaps: {p.snapsPercent}%</div>
                      {p.touches > 0 && <div>Touches: {p.touches}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ========== TABBED RESEARCH ZONE ========== */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Deep Research</h2>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b-2 border-slate-200 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('season-stats')}
                  className={`px-6 py-3 font-bold whitespace-nowrap transition-all ${
                    activeTab === 'season-stats'
                      ? 'text-orange-600 border-b-4 border-orange-600 -mb-0.5'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Season Stats
                </button>
                <button
                  onClick={() => setActiveTab('game-logs')}
                  className={`px-6 py-3 font-bold whitespace-nowrap transition-all ${
                    activeTab === 'game-logs'
                      ? 'text-orange-600 border-b-4 border-orange-600 -mb-0.5'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Game Logs
                </button>
                <button
                  onClick={() => setActiveTab('trends')}
                  className={`px-6 py-3 font-bold whitespace-nowrap transition-all ${
                    activeTab === 'trends'
                      ? 'text-orange-600 border-b-4 border-orange-600 -mb-0.5'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Trends
                </button>
                <button
                  onClick={() => setActiveTab('injuries-weather')}
                  className={`px-6 py-3 font-bold whitespace-nowrap transition-all ${
                    activeTab === 'injuries-weather'
                      ? 'text-orange-600 border-b-4 border-orange-600 -mb-0.5'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Injuries & Weather
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {/* Season Stats Tab */}
                {activeTab === 'season-stats' && (
                  <motion.div key="season" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {slateData.seasonStats.map(p => (
                        <div key={p.id} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl">{p.headshot}</div>
                            <div>
                              <div className="font-black text-lg text-slate-900">{p.name}</div>
                              <div className="text-sm text-slate-600">{p.position} • {p.team}</div>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-slate-600">Fantasy PPG:</span><span className="font-bold text-slate-900">{p.fantasyPPG}</span></div>
                            {p.position === 'QB' && <div className="flex justify-between"><span className="text-slate-600">Pass YPG:</span><span className="font-bold">{p.passingYPG}</span></div>}
                            {p.position === 'RB' && <div className="flex justify-between"><span className="text-slate-600">Rush YPG:</span><span className="font-bold">{p.rushingYPG}</span></div>}
                            {(p.position === 'WR' || p.position === 'TE') && <div className="flex justify-between"><span className="text-slate-600">Rec YPG:</span><span className="font-bold">{p.receivingYPG}</span></div>}
                            <div className="flex justify-between"><span className="text-slate-600">TDs:</span><span className="font-bold text-orange-600">{p.totalTDs || p.passingTDs}</span></div>
                            <div className="flex justify-between"><span className="text-slate-600">Efficiency:</span><span className="font-bold">{p.efficiencyMetric}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Game Logs Tab */}
                {activeTab === 'game-logs' && (
                  <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="space-y-6">
                      {Object.entries(slateData.gameLogs).map(([playerName, logs]) => (
                        <div key={playerName} className="bg-slate-50 rounded-xl p-6">
                          <h4 className="font-black text-lg text-slate-900 mb-4">{playerName}</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="border-b-2 border-slate-300">
                                <tr className="text-left">
                                  <th className="pb-2 font-bold">Week</th>
                                  <th className="pb-2 font-bold">FP</th>
                                  <th className="pb-2 font-bold">Snaps</th>
                                  <th className="pb-2 font-bold">Yards</th>
                                  <th className="pb-2 font-bold">TDs</th>
                                  <th className="pb-2 font-bold">Note</th>
                                </tr>
                              </thead>
                              <tbody>
                                {logs.map((game, idx) => (
                                  <tr key={idx} className="border-b border-slate-200">
                                    <td className="py-2 font-bold">Wk {game.week}</td>
                                    <td className="py-2 font-bold text-green-600">{game.fp}</td>
                                    <td className="py-2">{game.snaps}%</td>
                                    <td className="py-2">{game.yards}</td>
                                    <td className="py-2">{game.tds}</td>
                                    <td className="py-2 text-xs text-slate-700">{game.note}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Trends Tab */}
                {activeTab === 'trends' && (
                  <motion.div key="trends" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="bg-slate-50 rounded-xl p-8 text-center">
                      <div className="text-6xl mb-4">📈</div>
                      <h3 className="text-2xl font-black text-slate-900 mb-2">Usage & Snap Trends</h3>
                      <p className="text-slate-600">Player trend analysis coming soon</p>
                    </div>
                  </motion.div>
                )}

                {/* Injuries & Weather Tab */}
                {activeTab === 'injuries-weather' && (
                  <motion.div key="injuries" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="space-y-4">
                      {slateData.weatherInjuryHub.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="font-black text-lg text-slate-900">{item.game}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{item.weather.icon}</span>
                              <div>
                                <div className="font-bold text-sm">{item.weather.condition}</div>
                                <div className="text-xs text-slate-600">{item.weather.temp}°F • Wind {item.weather.wind}mph</div>
                              </div>
                            </div>
                          </div>
                          {item.weather.impact !== 'None' && (
                            <div className="bg-red-100 border border-red-300 rounded-lg px-4 py-2 mb-4">
                              <div className="text-sm font-bold text-red-800">⚠️ {item.weather.impact}</div>
                            </div>
                          )}
                          {item.injuries.length > 0 && (
                            <div className="space-y-2">
                              {item.injuries.map((inj, i) => (
                                <div key={i} className={`border-l-4 rounded px-4 py-2 ${
                                  inj.impact === 'High' ? 'border-red-500 bg-red-50' :
                                  inj.impact === 'Medium' ? 'border-amber-500 bg-amber-50' :
                                  'border-green-500 bg-green-50'
                                }`}>
                                  <div className="font-bold text-sm">{inj.player} ({inj.position}) - {inj.status}</div>
                                  <div className="text-xs text-slate-700 mt-1">{inj.note}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ========== LINEUPIQ CENTERPIECE ========== */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-10 shadow-xl">
              <div className="flex items-start gap-6 mb-6">
                <div className="text-6xl">🤖</div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">LineupIQ's NFL Slate Summary</h2>
                  <p className="text-slate-600">AI-powered strategic analysis in plain English</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-800 leading-relaxed whitespace-pre-line">
                  {slateData.lineupiqSummary}
                </p>
              </div>
            </div>

            {/* ========== TOOL ENTRY (LIGHTWEIGHT) ========== */}
            <div>
              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={() => router.push('/sim')}
                  className="px-12 py-6 bg-blue-600 text-white text-xl font-black rounded-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl"
                >
                  🎲 Run NFL Sim
                </button>
                <button
                  onClick={() => router.push('/brainsheet')}
                  className="px-12 py-6 bg-amber-600 text-white text-xl font-black rounded-xl hover:bg-amber-700 transition-all shadow-xl hover:shadow-2xl"
                >
                  📋 Open Brainsheet
                </button>
                <button
                  onClick={() => router.push('/optimizer')}
                  className="px-12 py-6 bg-green-600 text-white text-xl font-black rounded-xl hover:bg-green-700 transition-all shadow-xl hover:shadow-2xl"
                >
                  🚀 Build Lineups
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
