'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function NFLSlatePage() {
  const router = useRouter()
  const [slateData, setSlateData] = useState(null)
  const [loadStatus, setLoadStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [expandedGames, setExpandedGames] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b-4 border-orange-500 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white">NFL SLATE HUB</h1>
              <p className="text-sm text-slate-300 mt-1">Research-rich strategy terminal</p>
            </div>
            {loadStatus === 'loaded' && (
              <div className="flex flex-wrap gap-2">
                <button onClick={() => router.push('/brainsheet')} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-lg transition-all">📋 Brainsheet</button>
                <button onClick={() => router.push('/optimizer')} className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-lg transition-all">🚀 Optimizer</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadStatus === 'idle' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-7xl mb-6">🏈</div>
            <h2 className="text-3xl font-black text-slate-900 mb-3">Ready to Load Today's NFL Slate</h2>
            <p className="text-slate-600 mb-8">Comprehensive research & strategy intelligence</p>
            <button onClick={handleLoadSlate} className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-black rounded-xl hover:shadow-xl transition-all">Load NFL Slate</button>
          </motion.div>
        )}

        {loadStatus === 'loading' && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin text-6xl mb-4">⚡</div>
            <h3 className="text-2xl font-black text-slate-900">Loading...</h3>
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
            {/* Search */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-5 relative">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSearchResults(e.target.value.length > 0)
                  }}
                  className="flex-1 text-lg font-semibold outline-none"
                />
                {searchQuery && <button onClick={() => { setSearchQuery(''); setShowSearchResults(false) }} className="text-slate-400">✕</button>}
              </div>
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border z-50 max-h-96 overflow-auto">
                  {searchResults.map(p => (
                    <div key={p.id} className="p-4 border-b hover:bg-blue-50 cursor-pointer">
                      <div className="flex justify-between">
                        <div><div className="font-black">{p.name}</div><div className="text-xs text-slate-600">{p.position} • {p.team}</div></div>
                        <div className="text-right"><div className="font-black">{p.projection}</div><div className="text-xs">{p.ownership}% own</div></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Games */}
            <div>
              <h3 className="text-lg font-black mb-4">🔥 FEATURED GAMES</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {slateData.featuredGames.map(g => (
                  <div key={g.id} className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-5 border-2 border-orange-500">
                    <div className="flex justify-between mb-4 text-white">
                      <div className="text-center"><div className="text-2xl">{g.awayTeam.logo}</div><div className="font-black">{g.awayTeam.code}</div></div>
                      <div className="text-center"><div className="text-2xl font-black text-amber-400">{g.vegasTotal}</div><div className="text-xs">{g.spread}</div></div>
                      <div className="text-center"><div className="text-2xl">{g.homeTeam.logo}</div><div className="font-black">{g.homeTeam.code}</div></div>
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div>Pace: {g.paceIndicator}</div>
                      <div>{g.weather.icon} {g.weather.condition}</div>
                      <div className="text-slate-200 leading-relaxed">{g.keyNote}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Headlines */}
            <div>
              <h3 className="text-lg font-black mb-4">📰 SLATE HEADLINES</h3>
              <div className="space-y-2">
                {slateData.slateHeadlines.map(h => (
                  <div key={h.id} className={`border-l-4 rounded-lg p-3 ${h.severity === 'high' ? 'border-red-500 bg-red-50' : h.severity === 'positive' ? 'border-green-500 bg-green-50' : 'border-amber-500 bg-amber-50'}`}>
                    <div className="flex justify-between"><span className="text-sm font-semibold">{h.text}</span><span className="text-xs text-slate-500">{h.timestamp}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Plays */}
            <div>
              <h3 className="text-lg font-black mb-4">⭐ CORE PLAYS</h3>
              <div className="flex flex-wrap gap-3">
                {slateData.corePlays.map(p => (
                  <div key={p.id} style={{ background: 'linear-gradient(135deg, #FFF8E7, #FFE3B0)' }} className="px-4 py-3 rounded-xl border-2 border-amber-300">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center">{p.position}</div>
                      <div><div className="font-black text-sm">{p.name}</div><div className="text-xs text-slate-600">{p.team} • {p.projection}</div></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Last Week Performance */}
            <div>
              <h3 className="text-2xl font-black mb-4">📈 LAST WEEK'S PERFORMANCE</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slateData.lastWeekPerformance.slice(0, 6).map(p => (
                  <div key={p.id} className="bg-white rounded-xl border p-5 shadow-md">
                    <div className="flex justify-between mb-3">
                      <div><div className="font-black text-lg">{p.name}</div><div className="text-xs text-slate-600">{p.position} • {p.team}</div></div>
                      <div className="text-2xl font-black text-green-600">{p.fantasyPoints}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-slate-50 rounded p-2"><div className="text-xs text-slate-600">Snaps</div><div className="font-black">{p.snapsPercent}%</div></div>
                      {p.touches > 0 && <div className="bg-slate-50 rounded p-2"><div className="text-xs text-slate-600">Touches</div><div className="font-black">{p.touches}</div></div>}
                    </div>
                    <div className="text-xs text-blue-800 bg-blue-50 rounded p-2">{p.efficiencyNote}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div style={{ background: 'linear-gradient(135deg, #F0F9FF, #E0F2FE)' }} className="rounded-xl border-2 border-blue-300 p-6">
                <h3 className="text-xl font-black text-blue-900 mb-4">💎 VALUE WATCHLIST</h3>
                <div className="space-y-2">
                  {slateData.valueWatchlist.tier1.map((p, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-blue-200">
                      <div className="flex justify-between mb-1"><span className="font-black">{p.name}</span><span className="font-black text-green-600">{p.value}</span></div>
                      <div className="text-xs text-slate-600">{p.position} • ${p.salary} • {p.ownership}% own</div>
                      <div className="text-xs text-blue-700 mt-1">{p.reason}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)' }} className="rounded-xl border-2 border-green-300 p-6">
                <h3 className="text-xl font-black text-green-900 mb-4">⚡ LEVERAGE WATCHLIST</h3>
                <div className="space-y-2">
                  {slateData.leverageWatchlist.map((p, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 border border-green-200">
                      <div className="flex justify-between mb-1"><span className="font-black">{p.name}</span><span className="font-black text-green-600">{p.advantage}</span></div>
                      <div className="text-xs text-slate-600">{p.position} • {p.ownership}% own • Lev +{p.leverage}</div>
                      <div className="text-xs text-green-700 mt-1">{p.reason}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LineupIQ Summary */}
            <div className="bg-white rounded-xl shadow-lg border p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">🤖</div>
                <div><h3 className="text-2xl font-black">LineupIQ's NFL Slate Summary</h3><p className="text-sm text-slate-600">Strategic intelligence in plain English</p></div>
              </div>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{slateData.lineupiqSummary}</p>
            </div>

            {/* Contest Paths */}
            <div>
              <h3 className="text-2xl font-black mb-4">🎯 CONTEST PATHS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(slateData.contestPaths).map(([key, path]) => (
                  <div key={key} style={{ background: key === 'cash' ? 'linear-gradient(135deg, #ECFDF5, #D1FAE5)' : key === 'singleEntry' ? 'linear-gradient(135deg, #FFF8E7, #FFE3B0)' : 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' }} className="rounded-xl border-2 p-6">
                    <div className="text-center mb-4"><div className="text-4xl mb-2">{key === 'cash' ? '💰' : key === 'singleEntry' ? '🎯' : '🚀'}</div><div className="text-lg font-black">{path.format.split(' / ')[0]}</div></div>
                    <div className="text-xs mb-3"><span className="font-bold">Core:</span> {path.coreList.slice(0, 3).join(', ')}</div>
                    <div className="text-xs leading-relaxed">{path.guidance}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => router.push('/optimizer')} className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-black rounded-xl hover:shadow-xl transition-all">🚀 Send to Optimizer</button>
              <button onClick={() => router.push('/sim')} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-black rounded-xl hover:shadow-xl transition-all">🎲 Run NFL Sim</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
