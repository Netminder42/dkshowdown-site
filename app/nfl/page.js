'use client'
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function NFLHub() {
  const router = useRouter()
  const [slateData, setSlateData] = useState(null)
  const [loadStatus, setLoadStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [activeNav, setActiveNav] = useState('news')

  // Load slate data on mount
  useEffect(() => {
    async function loadSlate() {
      setLoadStatus('loading')
      try {
        const response = await fetch('/api/nfl/slate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'load' })
        })
        const data = await response.json()
        setSlateData(data)
        setLoadStatus('loaded')
      } catch (err) {
        setError(err.message)
        setLoadStatus('error')
      }
    }
    loadSlate()
  }, [])

  // Auto-rotate carousel every 6 seconds
  useEffect(() => {
    if (loadStatus === 'loaded' && slateData?.playerCarousel) {
      const interval = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % slateData.playerCarousel.length)
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [loadStatus, slateData])

  if (loadStatus === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏈</div>
          <div className="text-2xl font-black text-slate-900 mb-2">Loading NFL Hub...</div>
          <div className="text-slate-600">Powered by LineupIQ™</div>
        </div>
      </div>
    )
  }

  if (loadStatus === 'error') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-2xl font-black text-slate-900 mb-2">Error Loading NFL Hub</div>
          <div className="text-slate-600">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ========== STICKY HEADER ========== */}
      <header className="bg-slate-900 border-b-4 border-orange-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">NFL HUB</h1>
              <p className="text-xs text-slate-400 mt-1">Powered by LineupIQ™</p>
            </div>
            <div className="text-sm text-slate-400">
              {slateData?.slateInfo?.slateName} • {slateData?.slateInfo?.gameCount} Games
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadStatus === 'loaded' && slateData && (
          <div className="space-y-8">

            {/* ========== HERO + RIGHT RAIL (70/30 SPLIT) ========== */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

              {/* LEFT: HERO CAROUSEL (70%) */}
              <div className="lg:col-span-7">
                <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl" style={{ height: '400px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      {/* Player/Game Photography Placeholder */}
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-9xl mb-4">🏈</div>
                          <h2 className="text-5xl font-black text-white mb-3">{slateData.playerCarousel[carouselIndex].name}</h2>
                          <p className="text-2xl text-blue-200 mb-2">{slateData.playerCarousel[carouselIndex].position} • {slateData.playerCarousel[carouselIndex].team}</p>
                          <p className="text-lg text-slate-300">{slateData.playerCarousel[carouselIndex].caption}</p>
                        </div>
                      </div>

                      {/* Overlay - Game Info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-white text-sm font-bold mb-1">FEATURED MATCHUP</div>
                            <div className="text-white text-2xl font-black">BUF @ KC</div>
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

              {/* RIGHT RAIL (30% - STICKY) */}
              <div className="lg:col-span-3">
                <div className="sticky top-24 space-y-6">

                  {/* LineupIQ Summary */}
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 shadow-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl">🤖</div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase">LineupIQ's NFL Insight</h3>
                        <p className="text-xs text-slate-600">AI-powered analysis</p>
                      </div>
                    </div>
                    <div className="text-sm text-slate-800 leading-relaxed space-y-2">
                      <p>Tonight's slate centers around BUF/KC (52.5 total) with heavy chalk at TE (Kelce 38%) and WR (St. Brown 35%).</p>
                      <p>RB fragile with CMC injury. Achane safest chalk. Lamar offers elite GPP leverage at 15% vs Mahomes 32%.</p>
                      <p>Weather in CLE downgrades passing. Avoid game entirely.</p>
                    </div>
                  </div>

                  {/* Research Shortcuts */}
                  <div className="bg-slate-50 rounded-xl p-5 shadow-lg border border-slate-200">
                    <h3 className="text-xs font-black text-slate-900 uppercase mb-3">Quick Access</h3>
                    <div className="space-y-2">
                      <button onClick={() => router.push('/sim')} className="w-full py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all">
                        🎲 View Projections
                      </button>
                      <button onClick={() => router.push('/brainsheet')} className="w-full py-2.5 bg-amber-600 text-white text-sm font-bold rounded-lg hover:bg-amber-700 transition-all">
                        📋 Open Brainsheet
                      </button>
                      <button onClick={() => router.push('/optimizer')} className="w-full py-2.5 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-all">
                        🚀 Open Optimizer
                      </button>
                    </div>
                  </div>

                  {/* Trending Players */}
                  <div className="bg-slate-50 rounded-xl p-5 shadow-lg border border-slate-200">
                    <h3 className="text-xs font-black text-slate-900 uppercase mb-3">Trending Now</h3>
                    <div className="space-y-2">
                      {slateData.trendingPlayers?.map(p => (
                        <div key={p.id} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <span className="text-lg">{p.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                            <div className="text-xs text-slate-600">{p.reason}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Injury Watch */}
                  <div className="bg-slate-50 rounded-xl p-5 shadow-lg border border-slate-200">
                    <h3 className="text-xs font-black text-slate-900 uppercase mb-3">Injury Watch</h3>
                    <div className="space-y-2">
                      {slateData.injuryWatch?.map((inj, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <span className="text-lg">{inj.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900">{inj.player}</div>
                            <div className="text-xs text-slate-600">{inj.status} • {inj.impact} Impact</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weather Alerts */}
                  <div className="bg-slate-50 rounded-xl p-5 shadow-lg border border-slate-200">
                    <h3 className="text-xs font-black text-slate-900 uppercase mb-3">Weather Alerts</h3>
                    <div className="space-y-2">
                      {slateData.weatherAlerts?.map((w, idx) => (
                        <div key={idx} className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${
                          w.severity === 'high' ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'
                        }`}>
                          <span className="text-lg">{w.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900">{w.game}</div>
                            <div className="text-xs text-slate-600">{w.condition} • {w.impact}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Matchups Today */}
                  <div className="bg-slate-50 rounded-xl p-5 shadow-lg border border-slate-200">
                    <h3 className="text-xs font-black text-slate-900 uppercase mb-3">Top Matchups</h3>
                    <div className="space-y-2">
                      {slateData.topMatchupsToday?.map(m => (
                        <div key={m.id} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-slate-200">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{m.icon}</span>
                            <div className="text-xs font-bold text-slate-900">{m.away} @ {m.home}</div>
                          </div>
                          <div className="text-xs font-black text-amber-600">{m.total}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* ========== TOP SUB-NAVIGATION ========== */}
            <div className="border-b-2 border-slate-200 overflow-x-auto">
              <nav className="flex gap-1">
                {[
                  { id: 'news', label: 'News', icon: '📰' },
                  { id: 'players', label: 'Players', icon: '👤' },
                  { id: 'teams', label: 'Teams', icon: '🏈' },
                  { id: 'stats', label: 'Stats', icon: '📊' },
                  { id: 'game-logs', label: 'Game Logs', icon: '📋' },
                  { id: 'injuries', label: 'Injuries', icon: '🏥' },
                  { id: 'weather', label: 'Weather', icon: '🌤️' },
                  { id: 'standings', label: 'Standings', icon: '🏆' },
                  { id: 'power-rankings', label: 'Power Rankings', icon: '⭐' }
                ].map(nav => (
                  <button
                    key={nav.id}
                    onClick={() => setActiveNav(nav.id)}
                    className={`px-4 py-3 font-bold whitespace-nowrap text-sm transition-all ${
                      activeNav === nav.id
                        ? 'text-orange-600 border-b-4 border-orange-600 -mb-0.5'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="mr-1.5">{nav.icon}</span>
                    {nav.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* ========== MAIN FEED (70%) + RIGHT RAIL CONTINUES ========== */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

              {/* MAIN FEED - Changes based on nav selection */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">

                  {/* NEWS TAB */}
                  {activeNav === 'news' && (
                    <motion.div key="news" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                      {/* Featured Stories */}
                      <div className="mb-8">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">Featured Stories</h2>
                        <div className="grid grid-cols-1 gap-6">
                          {slateData.featuredStories?.map(story => (
                            <div key={story.id} className="bg-slate-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1">
                                  <div className="h-48 md:h-full bg-gradient-to-br from-blue-900 to-slate-800 flex items-center justify-center">
                                    <div className="text-6xl">📸</div>
                                  </div>
                                </div>
                                <div className="md:col-span-2 p-6">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-orange-600 uppercase">{story.category}</span>
                                    <span className="text-xs text-slate-500">•</span>
                                    <span className="text-xs text-slate-600">{story.readTime}</span>
                                  </div>
                                  <h3 className="text-xl font-black text-slate-900 mb-2">{story.headline}</h3>
                                  <p className="text-sm text-slate-700 mb-3">{story.blurb}</p>
                                  <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <span>{story.author}</span>
                                    <span>•</span>
                                    <span>{story.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Headlines Feed */}
                      <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-4">Latest Headlines</h2>
                        <div className="space-y-4">
                          {slateData.headlinesFeed?.map(headline => (
                            <div
                              key={headline.id}
                              className={`bg-slate-50 rounded-xl p-5 border-l-4 hover:shadow-lg transition-all cursor-pointer ${
                                headline.severity === 'high' ? 'border-red-500' :
                                headline.severity === 'positive' ? 'border-green-500' :
                                'border-slate-300'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center">
                                  <div className="text-2xl">📸</div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold text-orange-600 uppercase">{headline.category}</span>
                                    <span className="text-xs text-slate-500">•</span>
                                    <span className="text-xs text-slate-600">{headline.timestamp}</span>
                                  </div>
                                  <h3 className="text-lg font-bold text-slate-900 mb-2">{headline.headline}</h3>
                                  <p className="text-sm text-slate-700 mb-2">{headline.blurb}</p>
                                  <div className="text-xs text-slate-600">{headline.author}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* PLAYERS TAB */}
                  {activeNav === 'players' && (
                    <motion.div key="players" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-black text-slate-900 mb-4">Player Research</h2>

                      {/* Last Week Performance (Compact) */}
                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Last Week Performance</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {slateData.lastWeekPerformance?.slice(0, 8).map(p => (
                            <div key={p.id} className="bg-slate-50 rounded-lg p-4 hover:shadow-lg transition-all border border-slate-200">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs">{p.position}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-xs text-slate-900 truncate">{p.name}</div>
                                  <div className="text-xs text-slate-600">{p.team}</div>
                                </div>
                              </div>
                              <div className="text-2xl font-black text-green-600 mb-1">{p.fantasyPoints}</div>
                              <div className="text-xs text-slate-600">Snaps: {p.snapsPercent}%</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Season Stats */}
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Season Leaders</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {slateData.seasonStats?.map(p => (
                            <div key={p.id} className="bg-slate-50 rounded-xl p-5 hover:shadow-lg transition-all border border-slate-200">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="text-3xl">{p.headshot}</div>
                                <div className="flex-1">
                                  <div className="font-black text-lg text-slate-900">{p.name}</div>
                                  <div className="text-sm text-slate-600">{p.position} • {p.team}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-black text-green-600">{p.fantasyPPG}</div>
                                  <div className="text-xs text-slate-600">PPG</div>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                {p.position === 'QB' && (
                                  <>
                                    <div><div className="text-slate-600">Pass YPG</div><div className="font-bold text-slate-900">{p.passingYPG}</div></div>
                                    <div><div className="text-slate-600">Pass TDs</div><div className="font-bold text-slate-900">{p.passingTDs}</div></div>
                                    <div><div className="text-slate-600">Comp %</div><div className="font-bold text-slate-900">{p.completionPct}%</div></div>
                                  </>
                                )}
                                {p.position === 'RB' && (
                                  <>
                                    <div><div className="text-slate-600">Rush YPG</div><div className="font-bold text-slate-900">{p.rushingYPG}</div></div>
                                    <div><div className="text-slate-600">Total TDs</div><div className="font-bold text-slate-900">{p.totalTDs}</div></div>
                                    <div><div className="text-slate-600">Snaps %</div><div className="font-bold text-slate-900">{p.snapsPct}%</div></div>
                                  </>
                                )}
                                {(p.position === 'WR' || p.position === 'TE') && (
                                  <>
                                    <div><div className="text-slate-600">Rec YPG</div><div className="font-bold text-slate-900">{p.receivingYPG}</div></div>
                                    <div><div className="text-slate-600">Targets</div><div className="font-bold text-slate-900">{p.targets}</div></div>
                                    <div><div className="text-slate-600">TDs</div><div className="font-bold text-slate-900">{p.TDs}</div></div>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* TEAMS TAB */}
                  {activeNav === 'teams' && (
                    <motion.div key="teams" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-black text-slate-900 mb-4">Team Context</h2>

                      {/* Team Snap Leaders */}
                      <div className="mb-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Team Snap Leaders</h3>
                        <div className="space-y-4">
                          {slateData.teamSnapLeaders?.map((team, idx) => (
                            <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                              <h4 className="font-black text-lg text-slate-900 mb-3">{team.team}</h4>
                              <div className="space-y-2">
                                {team.leaders.map((leader, lidx) => (
                                  <div key={lidx} className="flex items-center justify-between bg-white rounded-lg px-4 py-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-xs">{leader.position}</div>
                                      <div>
                                        <div className="font-bold text-sm text-slate-900">{leader.name}</div>
                                        <div className="text-xs text-slate-600">{leader.role}</div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-lg font-black text-green-600">{leader.snapPct}%</div>
                                      <div className="text-xs text-slate-600">Snaps</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Team Stats */}
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Offensive & Defensive Ratings</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {slateData.teamStats?.map((team, idx) => (
                            <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                              <h4 className="font-black text-xl text-slate-900 mb-4">{team.team}</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <div className="text-xs font-bold text-green-600 uppercase mb-2">Offense (Rank #{team.offense.rank})</div>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between"><span className="text-slate-600">PPG:</span><span className="font-bold text-slate-900">{team.offense.pointsPG}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">YPG:</span><span className="font-bold text-slate-900">{team.offense.yardsPG}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">Run/Pass:</span><span className="font-bold text-slate-900">{team.offense.runPassRatio}</span></div>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-red-600 uppercase mb-2">Defense (Rank #{team.defense.rank})</div>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between"><span className="text-slate-600">PPG Allowed:</span><span className="font-bold text-slate-900">{team.defense.pointsAllowedPG}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">YPG Allowed:</span><span className="font-bold text-slate-900">{team.defense.yardsAllowedPG}</span></div>
                                    <div className="flex justify-between"><span className="text-slate-600">Pressure %:</span><span className="font-bold text-slate-900">{team.defense.pressureRate}%</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* STATS TAB */}
                  {activeNav === 'stats' && (
                    <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-black text-slate-900 mb-4">Season Stat Leaders</h2>

                      {/* Group by position */}
                      <div className="space-y-6">
                        {['QB', 'RB', 'WR', 'TE'].map(pos => {
                          const players = slateData.seasonStats?.filter(p => p.position === pos) || []
                          return (
                            <div key={pos}>
                              <h3 className="text-lg font-bold text-slate-900 mb-3">{pos}s</h3>
                              <div className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                                <table className="w-full text-sm">
                                  <thead className="bg-slate-200">
                                    <tr className="text-left">
                                      <th className="p-3 font-bold">Player</th>
                                      <th className="p-3 font-bold">Team</th>
                                      <th className="p-3 font-bold">PPG</th>
                                      {pos === 'QB' && <th className="p-3 font-bold">Pass YPG</th>}
                                      {pos === 'QB' && <th className="p-3 font-bold">Pass TDs</th>}
                                      {pos === 'RB' && <th className="p-3 font-bold">Rush YPG</th>}
                                      {pos === 'RB' && <th className="p-3 font-bold">Total TDs</th>}
                                      {(pos === 'WR' || pos === 'TE') && <th className="p-3 font-bold">Rec YPG</th>}
                                      {(pos === 'WR' || pos === 'TE') && <th className="p-3 font-bold">Targets</th>}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {players.map(p => (
                                      <tr key={p.id} className="border-t border-slate-200 hover:bg-slate-100">
                                        <td className="p-3 font-bold text-slate-900">{p.name}</td>
                                        <td className="p-3">{p.team}</td>
                                        <td className="p-3 font-bold text-green-600">{p.fantasyPPG}</td>
                                        {pos === 'QB' && <td className="p-3">{p.passingYPG}</td>}
                                        {pos === 'QB' && <td className="p-3">{p.passingTDs}</td>}
                                        {pos === 'RB' && <td className="p-3">{p.rushingYPG}</td>}
                                        {pos === 'RB' && <td className="p-3">{p.totalTDs}</td>}
                                        {(pos === 'WR' || pos === 'TE') && <td className="p-3">{p.receivingYPG}</td>}
                                        {(pos === 'WR' || pos === 'TE') && <td className="p-3">{p.targets}</td>}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                    </motion.div>
                  )}

                  {/* GAME LOGS TAB */}
                  {activeNav === 'game-logs' && (
                    <motion.div key="game-logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-black text-slate-900 mb-4">Recent Game Logs</h2>

                      <div className="space-y-6">
                        {Object.entries(slateData.gameLogs || {}).map(([playerName, logs]) => (
                          <div key={playerName} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                            <h4 className="font-black text-lg text-slate-900 mb-3">{playerName}</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead className="border-b-2 border-slate-300">
                                  <tr className="text-left">
                                    <th className="pb-2 font-bold">Week</th>
                                    <th className="pb-2 font-bold">FP</th>
                                    <th className="pb-2 font-bold">Snaps %</th>
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

                  {/* INJURIES TAB */}
                  {activeNav === 'injuries' && (
                    <motion.div key="injuries" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-black text-slate-900 mb-4">Injuries & Weather Hub</h2>

                      <div className="space-y-4">
                        {slateData.weatherInjuryHub?.map((item, idx) => (
                          <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-black text-lg text-slate-900">{item.game}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{item.weather.icon}</span>
                                <div className="text-right">
                                  <div className="text-sm font-bold text-slate-900">{item.weather.condition}</div>
                                  <div className="text-xs text-slate-600">{item.weather.temp}°F • {item.weather.wind} MPH</div>
                                </div>
                              </div>
                            </div>
                            {item.weather.impact !== 'None' && (
                              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <div className="text-sm font-bold text-red-800">⚠️ {item.weather.impact}</div>
                              </div>
                            )}
                            {item.injuries?.length > 0 && (
                              <div className="space-y-2">
                                <div className="text-xs font-bold text-slate-900 uppercase">Injuries</div>
                                {item.injuries.map((inj, iidx) => (
                                  <div key={iidx} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-slate-200">
                                    <div className="flex-1">
                                      <div className="font-bold text-sm text-slate-900">{inj.player} ({inj.position})</div>
                                      <div className="text-xs text-slate-700 mt-1">{inj.note}</div>
                                    </div>
                                    <div className={`text-xs font-bold px-2 py-1 rounded ${
                                      inj.status === 'Out' ? 'bg-red-100 text-red-800' :
                                      inj.status === 'Questionable' ? 'bg-amber-100 text-amber-800' :
                                      'bg-green-100 text-green-800'
                                    }`}>
                                      {inj.status}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  )}

                  {/* WEATHER TAB */}
                  {activeNav === 'weather' && (
                    <motion.div key="weather" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-black text-slate-900 mb-4">Weather Report</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {slateData.weatherInjuryHub?.map((item, idx) => (
                          <div key={idx} className={`rounded-xl p-5 border-2 ${
                            item.weather.impact === 'None' ? 'bg-slate-50 border-slate-200' : 'bg-red-50 border-red-300'
                          }`}>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-4xl">{item.weather.icon}</span>
                              <div>
                                <div className="font-black text-lg text-slate-900">{item.game}</div>
                                <div className="text-sm text-slate-700">{item.weather.condition}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                              <div><span className="text-slate-600">Temp:</span> <span className="font-bold text-slate-900">{item.weather.temp}°F</span></div>
                              <div><span className="text-slate-600">Wind:</span> <span className="font-bold text-slate-900">{item.weather.wind} MPH</span></div>
                            </div>
                            {item.weather.impact !== 'None' && (
                              <div className="p-2 bg-red-100 border border-red-300 rounded text-xs font-bold text-red-800">
                                ⚠️ {item.weather.impact}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  )}

                  {/* STANDINGS TAB */}
                  {activeNav === 'standings' && (
                    <motion.div key="standings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-black text-slate-900 mb-4">NFL Standings</h2>

                      <div className="space-y-8">
                        {/* AFC */}
                        <div>
                          <h3 className="text-xl font-black text-blue-600 mb-3">AFC</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(slateData.standings?.afc || {}).map(([division, teams]) => (
                              <div key={division}>
                                <h4 className="text-sm font-bold text-slate-900 uppercase mb-2">{division}</h4>
                                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                                  <table className="w-full text-xs">
                                    <thead className="bg-slate-200">
                                      <tr className="text-left">
                                        <th className="p-2 font-bold">Team</th>
                                        <th className="p-2 font-bold">W-L</th>
                                        <th className="p-2 font-bold">Pct</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {teams.map((team, idx) => (
                                        <tr key={idx} className="border-t border-slate-200">
                                          <td className="p-2 font-bold text-slate-900">{team.team}</td>
                                          <td className="p-2">{team.wins}-{team.losses}</td>
                                          <td className="p-2">{(team.pct * 100).toFixed(1)}%</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* NFC */}
                        <div>
                          <h3 className="text-xl font-black text-red-600 mb-3">NFC</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(slateData.standings?.nfc || {}).map(([division, teams]) => (
                              <div key={division}>
                                <h4 className="text-sm font-bold text-slate-900 uppercase mb-2">{division}</h4>
                                <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                                  <table className="w-full text-xs">
                                    <thead className="bg-slate-200">
                                      <tr className="text-left">
                                        <th className="p-2 font-bold">Team</th>
                                        <th className="p-2 font-bold">W-L</th>
                                        <th className="p-2 font-bold">Pct</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {teams.map((team, idx) => (
                                        <tr key={idx} className="border-t border-slate-200">
                                          <td className="p-2 font-bold text-slate-900">{team.team}</td>
                                          <td className="p-2">{team.wins}-{team.losses}</td>
                                          <td className="p-2">{(team.pct * 100).toFixed(1)}%</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* POWER RANKINGS TAB */}
                  {activeNav === 'power-rankings' && (
                    <motion.div key="power-rankings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <h2 className="text-2xl font-black text-slate-900 mb-4">NFL Power Rankings</h2>

                      <div className="space-y-2">
                        {slateData.powerRankings?.map(team => (
                          <div key={team.rank} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center">
                                <div className="text-xl font-black">{team.rank}</div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="text-xl font-black text-slate-900">{team.team}</div>
                                  <div className="text-sm text-slate-600">{team.record}</div>
                                  <div className="text-lg">{team.arrow}</div>
                                </div>
                                <div className="text-sm text-slate-700">{team.note}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* RIGHT RAIL - Continues (empty or additional widgets) */}
              <div className="lg:col-span-3">
                {/* Could add more widgets here that appear below the sticky rail */}
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  )
}
