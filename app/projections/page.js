'use client'

import { useState, useMemo } from 'react'
import NavigationNew from '@/components/NavigationNew'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { SparklesIcon, CheckCircleIcon, ArrowUpIcon, ArrowDownIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

const positionsBysp = {
  NFL: ['ALL', 'QB', 'RB', 'WR', 'TE'],
  NBA: ['ALL', 'PG', 'SG', 'SF', 'PF', 'C'],
  MLB: ['ALL', 'P', 'C', '1B', '2B', '3B', 'SS', 'OF']
}

export default function Projections() {
  const [selectedSport, setSelectedSport] = useState('NFL')
  const [selectedSlate, setSelectedSlate] = useState('Main Slate')
  const [selectedSite, setSelectedSite] = useState('DraftKings')
  const [loadingStatus, setLoadingStatus] = useState('idle') // 'idle', 'loading', 'loaded', 'error'
  const [projectionsData, setProjectionsData] = useState(null)
  const [error, setError] = useState(null)

  // Filters
  const [selectedPosition, setSelectedPosition] = useState('ALL')
  const [selectedTeam, setSelectedTeam] = useState('ALL')

  // Sorting
  const [sortColumn, setSortColumn] = useState('projection')
  const [sortDirection, setSortDirection] = useState('desc')

  const handleLoadProjections = async () => {
    setLoadingStatus('loading')
    setError(null)

    try {
      const response = await fetch('/api/projections/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport: selectedSport,
          site: selectedSite === 'DraftKings' ? 'DK' : 'FD',
          slate: selectedSlate
        })
      })

      if (!response.ok) {
        throw new Error('Failed to load projections')
      }

      const data = await response.json()
      setProjectionsData(data)
      setLoadingStatus('loaded')
      setSelectedPosition('ALL')
      setSelectedTeam('ALL')
    } catch (err) {
      console.error('Projections error:', err)
      setError('Failed to load projections. Please try again.')
      setLoadingStatus('error')
    }
  }

  // Extract unique teams from loaded players
  const availableTeams = useMemo(() => {
    if (!projectionsData?.players) return []
    const teams = [...new Set(projectionsData.players.map(p => p.team))].sort()
    return ['ALL', ...teams]
  }, [projectionsData])

  // Filter and sort players
  const filteredPlayers = useMemo(() => {
    if (!projectionsData?.players) return []

    let filtered = projectionsData.players

    // Filter by position
    if (selectedPosition !== 'ALL') {
      filtered = filtered.filter(p => p.position === selectedPosition)
    }

    // Filter by team
    if (selectedTeam !== 'ALL') {
      filtered = filtered.filter(p => p.team === selectedTeam)
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let aVal = a[sortColumn]
      let bVal = b[sortColumn]

      // Handle numeric values
      if (sortColumn === 'projection' || sortColumn === 'salary' || sortColumn === 'value' || sortColumn === 'ownership' || sortColumn === 'ceiling' || sortColumn === 'floor') {
        aVal = parseFloat(aVal)
        bVal = parseFloat(bVal)
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    return filtered
  }, [projectionsData, selectedPosition, selectedTeam, sortColumn, sortDirection])

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('desc')
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <NavigationNew />

      {/* PAGE HEADER */}
      <section className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] py-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2">Projections</h1>
              <p className="text-lg text-white/90">The full player pool for tonight's slate, powered by LineupIQ.</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-semibold">
                Powered by LineupIQ™
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TRIAL STATUS BAR */}
      <section className="bg-gradient-to-r from-[#00C853] to-[#00B248] py-3">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="h-6 w-6 text-white" />
              <span className="text-white font-bold">3-Day Free Trial – Day 1 of 3</span>
            </div>
            <Link
              href="/subscribe"
              className="px-6 py-2 bg-white text-[#00C853] font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

          {/* LEFT/CENTER COLUMN */}
          <div className="space-y-8">

            {/* SLATE SELECTOR */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#1E3A8A] mb-6">Slate Selection</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Sport</label>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E3A8A] focus:outline-none font-semibold"
                  >
                    <option>NFL</option>
                    <option>NBA</option>
                    <option>MLB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Slate</label>
                  <select
                    value={selectedSlate}
                    onChange={(e) => setSelectedSlate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E3A8A] focus:outline-none font-semibold"
                  >
                    <option>Main Slate</option>
                    <option>Early Slate</option>
                    <option>Late Night</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Site</label>
                  <select
                    value={selectedSite}
                    onChange={(e) => setSelectedSite(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E3A8A] focus:outline-none font-semibold"
                  >
                    <option>DraftKings</option>
                    <option>FanDuel</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleLoadProjections}
                disabled={loadingStatus === 'loading'}
                className={`w-full px-8 py-4 rounded-xl font-extrabold text-lg transition ${
                  loadingStatus === 'loading'
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-[#00C853] text-white hover:bg-[#00B248]'
                }`}
                style={{
                  boxShadow: loadingStatus !== 'loading' ? '0 10px 25px rgba(0, 200, 83, 0.40)' : 'none'
                }}
              >
                {loadingStatus === 'loading' ? 'Loading Projections...' : 'Load Projections'}
              </button>
            </section>

            {/* FILTER BAR */}
            {loadingStatus === 'loaded' && projectionsData && (
              <section className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FunnelIcon className="h-5 w-5 text-[#1E3A8A]" />
                  <h3 className="text-lg font-extrabold text-[#1E3A8A]">Filters</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Position Filter */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Position</label>
                    <div className="flex flex-wrap gap-2">
                      {positionsBysp[selectedSport].map(pos => (
                        <button
                          key={pos}
                          onClick={() => setSelectedPosition(pos)}
                          className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                            selectedPosition === pos
                              ? 'bg-[#1E3A8A] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Team Filter */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Team</label>
                    <select
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#1E3A8A] focus:outline-none font-semibold"
                    >
                      {availableTeams.map(team => (
                        <option key={team} value={team}>{team === 'ALL' ? 'All Teams' : team}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  Showing <span className="font-bold text-[#1E3A8A]">{filteredPlayers.length}</span> of <span className="font-bold">{projectionsData.players.length}</span> players
                </div>
              </section>
            )}

            {/* EMPTY STATE */}
            {loadingStatus === 'idle' && (
              <section className="bg-white rounded-xl p-16 shadow-sm text-center">
                <SparklesIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-extrabold text-gray-400 mb-2">Select a Slate</h3>
                <p className="text-gray-500">Choose a sport and slate to view projections.</p>
              </section>
            )}

            {/* ERROR STATE */}
            {loadingStatus === 'error' && (
              <section className="bg-red-50 rounded-xl p-8 border-2 border-red-200 text-center">
                <p className="text-red-800 font-bold text-lg">{error}</p>
              </section>
            )}

            {/* PLAYER TABLE */}
            {loadingStatus === 'loaded' && projectionsData && (
              <section className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#1E3A8A] sticky top-0 z-10">
                      <tr>
                        <th
                          className="text-left py-4 px-6 text-white font-bold cursor-pointer hover:bg-[#2D4A9A] transition"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center gap-2">
                            Player
                            {sortColumn === 'name' && (
                              sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th
                          className="text-right py-4 px-6 text-white font-bold cursor-pointer hover:bg-[#2D4A9A] transition"
                          onClick={() => handleSort('projection')}
                        >
                          <div className="flex items-center justify-end gap-2">
                            Projection
                            {sortColumn === 'projection' && (
                              sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th
                          className="text-right py-4 px-6 text-white font-bold cursor-pointer hover:bg-[#2D4A9A] transition"
                          onClick={() => handleSort('salary')}
                        >
                          <div className="flex items-center justify-end gap-2">
                            Salary
                            {sortColumn === 'salary' && (
                              sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th
                          className="text-right py-4 px-6 text-white font-bold cursor-pointer hover:bg-[#2D4A9A] transition"
                          onClick={() => handleSort('value')}
                        >
                          <div className="flex items-center justify-end gap-2">
                            Value
                            {sortColumn === 'value' && (
                              sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th
                          className="text-right py-4 px-6 text-white font-bold cursor-pointer hover:bg-[#2D4A9A] transition"
                          onClick={() => handleSort('ownership')}
                        >
                          <div className="flex items-center justify-end gap-2">
                            Own%
                            {sortColumn === 'ownership' && (
                              sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th
                          className="text-right py-4 px-6 text-white font-bold cursor-pointer hover:bg-[#2D4A9A] transition"
                          onClick={() => handleSort('ceiling')}
                        >
                          <div className="flex items-center justify-end gap-2">
                            Ceiling
                            {sortColumn === 'ceiling' && (
                              sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th
                          className="text-right py-4 px-6 text-white font-bold cursor-pointer hover:bg-[#2D4A9A] transition"
                          onClick={() => handleSort('floor')}
                        >
                          <div className="flex items-center justify-end gap-2">
                            Floor
                            {sortColumn === 'floor' && (
                              sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlayers.map((player, idx) => (
                        <motion.tr
                          key={player.id}
                          className={`border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer ${
                            idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}
                          whileHover={{ scale: 1.005 }}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] flex items-center justify-center text-white font-bold text-sm">
                                {player.position}
                              </div>
                              <div>
                                <p className="font-bold text-[#1E3A8A] text-base">{player.name}</p>
                                <p className="text-sm text-gray-600">{player.team} · {player.position}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right font-bold text-gray-800 text-base">{player.projection.toFixed(1)}</td>
                          <td className="py-4 px-6 text-right font-bold text-gray-800 text-base">${player.salary.toLocaleString()}</td>
                          <td className="py-4 px-6 text-right">
                            <span className="px-3 py-1 bg-green-100 text-green-800 font-bold rounded-full text-sm">
                              {player.value}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right font-bold text-gray-800 text-base">{player.ownership.toFixed(1)}%</td>
                          <td className="py-4 px-6 text-right text-gray-600 text-sm">{player.ceiling.toFixed(1)}</td>
                          <td className="py-4 px-6 text-right text-gray-600 text-sm">{player.floor.toFixed(1)}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

          </div>
          {/* END LEFT/CENTER COLUMN */}

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">

            {/* LINEUPIQ ASSISTANT */}
            <div className="rounded-xl p-6 shadow-lg" style={{
              background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
            }}>
              <div className="flex items-center gap-2 mb-4">
                <SparklesIcon className="h-6 w-6 text-white" />
                <h3 className="text-xl font-extrabold text-white">LineupIQ Assistant</h3>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                <p className="text-white text-sm leading-relaxed">
                  {loadingStatus === 'loaded'
                    ? `Showing ${filteredPlayers.length} players. Projections show fantasy output before ownership and leverage are applied.`
                    : "Load a slate to view player projections, salaries, and value scores powered by LineupIQ."}
                </p>
              </div>

              <div className="space-y-2">
                <Link
                  href="/sim"
                  className="block w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition text-sm text-center"
                >
                  Open Sim Engine
                </Link>
                <Link
                  href="/optimizer"
                  className="block w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition text-sm text-center"
                >
                  Open Optimizer
                </Link>
                <button className="w-full px-4 py-2 bg-white/10 text-white/60 font-semibold rounded-lg text-sm cursor-not-allowed">
                  Ownership Dashboard (Coming Soon)
                </button>
              </div>
            </div>

            {/* PROJECTION STATS */}
            {loadingStatus === 'loaded' && projectionsData && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-extrabold text-[#1E3A8A] mb-4">Projection Stats</h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Sport & Slate</p>
                    <p className="text-sm font-bold text-gray-800">{projectionsData.meta.sport} – {projectionsData.meta.slate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Site</p>
                    <p className="text-sm font-bold text-gray-800">{selectedSite}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Players</p>
                    <p className="text-sm font-bold text-gray-800">{projectionsData.meta.playerCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Loaded At</p>
                    <p className="text-sm font-bold text-gray-800">
                      {new Date(projectionsData.meta.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </aside>
          {/* END RIGHT SIDEBAR */}

        </div>
      </div>

      <Footer />
    </div>
  )
}
