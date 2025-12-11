'use client'

import { useState } from 'react'
import NavigationNew from '@/components/NavigationNew'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { BeakerIcon, ChartBarIcon, BoltIcon, TrophyIcon, SparklesIcon, PlayIcon, LockClosedIcon, CheckCircleIcon, FireIcon, ClockIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

// Mock data for slate overview
const mockSlateOverview = {
  games: 11,
  highestTotal: { teams: 'BUF @ KC', total: 52.5 },
  highestScoring: { team: 'BUF', projection: 28.4 },
  slateType: 'Balanced slate',
  paceIndicator: 'High-scoring, volatile slate'
}

// Mock data for top stacks
const mockStacks = [
  {
    team: 'BUF',
    type: 'Primary Stack: QB + WR + WR',
    projection: 56.2,
    ownership: 27,
    leverage: 'High',
    bustRisk: 'Medium'
  },
  {
    team: 'KC',
    type: 'Bring-back Stack: QB + TE',
    projection: 48.6,
    ownership: 32,
    leverage: 'Medium',
    bustRisk: 'Low'
  },
  {
    team: 'SF',
    type: 'Secondary Stack: RB + WR',
    projection: 42.8,
    ownership: 18,
    leverage: 'High',
    bustRisk: 'Medium'
  }
]

// Mock data for key plays
const mockCorePlays = [
  { name: 'Patrick Mahomes', team: 'KC', position: 'QB', projection: 24.6, salary: 7800, ownership: 35 },
  { name: 'Christian McCaffrey', team: 'SF', position: 'RB', projection: 22.4, salary: 9200, ownership: 38 },
  { name: 'Tyreek Hill', team: 'MIA', position: 'WR', projection: 18.6, salary: 8800, ownership: 31 }
]

const mockValuePlays = [
  { name: 'Jahmyr Gibbs', team: 'DET', position: 'RB', projection: 18.4, salary: 5800, ownership: 22 },
  { name: 'Amon-Ra St. Brown', team: 'DET', position: 'WR', projection: 15.4, salary: 7200, ownership: 19 },
  { name: 'Brock Purdy', team: 'SF', position: 'QB', projection: 21.2, salary: 6400, ownership: 14 }
]

const mockLeveragePlays = [
  { name: 'Desmond Bane', team: 'MEM', position: 'SG', projection: 34.2, salary: 6400, ownership: 12 },
  { name: 'Rachaad White', team: 'TB', position: 'RB', projection: 14.8, salary: 5200, ownership: 8 },
  { name: 'DeVonta Smith', team: 'PHI', position: 'WR', projection: 14.2, salary: 6400, ownership: 9 }
]

export default function SimEngine() {
  const [selectedSport, setSelectedSport] = useState('NFL')
  const [selectedSlate, setSelectedSlate] = useState('Main Slate')
  const [selectedSite, setSelectedSite] = useState('DraftKings')
  const [leverageBias, setLeverageBias] = useState(50)
  const [stackAggression, setStackAggression] = useState(50)
  const [riskLevel, setRiskLevel] = useState(50)
  const [simIntensity, setSimIntensity] = useState('Standard')
  const [simStatus, setSimStatus] = useState('idle') // 'idle', 'running', 'complete'
  const [activeTab, setActiveTab] = useState('core')

  const handleRunSim = () => {
    setSimStatus('running')
    // Simulate running a sim
    setTimeout(() => {
      setSimStatus('complete')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <NavigationNew />

      {/* PAGE HEADER */}
      <section className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] py-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-2">Sim Engine</h1>
              <p className="text-lg text-white/90">Simulate tonight's slate to find games, stacks, and plays with real edge.</p>
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

      {/* MAIN CONTENT GRID */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

          {/* LEFT/CENTER COLUMN */}
          <div className="space-y-8">

            {/* SLATE & SIM CONTROLS */}
            <section className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#1E3A8A] mb-6">Slate Selection</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

              <h2 className="text-2xl font-extrabold text-[#1E3A8A] mb-6">Sim Settings</h2>

              {/* Leverage Bias Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-gray-700">Leverage Bias</label>
                  <span className="text-sm text-gray-500">
                    {leverageBias < 33 ? 'Conservative' : leverageBias < 67 ? 'Moderate' : 'Aggressive'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={leverageBias}
                  onChange={(e) => setLeverageBias(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">How aggressively LineupIQ hunts low-owned upside</p>
              </div>

              {/* Stack Aggressiveness Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-gray-700">Stack Aggressiveness</label>
                  <span className="text-sm text-gray-500">
                    {stackAggression < 33 ? 'Balanced' : stackAggression < 67 ? 'Moderate Stacks' : 'Heavy Stacks'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stackAggression}
                  onChange={(e) => setStackAggression(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">How often to favor stacked lineups in sims</p>
              </div>

              {/* Risk Level Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-gray-700">Risk Level</label>
                  <span className="text-sm text-gray-500">
                    {riskLevel < 33 ? 'Cash-like' : riskLevel < 67 ? 'Moderate' : 'GPP Crazy'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">How volatile your sim outcomes should be</p>
              </div>

              {/* Sim Intensity Dropdown */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sim Intensity</label>
                <select
                  value={simIntensity}
                  onChange={(e) => setSimIntensity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1E3A8A] focus:outline-none font-semibold"
                >
                  <option>Quick</option>
                  <option>Standard</option>
                  <option>Deep</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Deeper sims take longer but capture more slate nuance</p>
              </div>
            </section>

            {/* RUN SIMULATION BUTTON */}
            <section className="text-center">
              <motion.button
                onClick={handleRunSim}
                disabled={simStatus === 'running'}
                className={`px-12 py-5 rounded-xl font-extrabold text-lg transition ${
                  simStatus === 'running'
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-[#00C853] text-white hover:bg-[#00B248]'
                }`}
                style={{
                  boxShadow: simStatus !== 'running' ? '0 10px 25px rgba(0, 200, 83, 0.40)' : 'none'
                }}
                whileHover={simStatus !== 'running' ? { scale: 1.05 } : {}}
                whileTap={simStatus !== 'running' ? { scale: 0.98 } : {}}
              >
                {simStatus === 'running' ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running Simulation...
                  </span>
                ) : (
                  'Run Simulation'
                )}
              </motion.button>
              <p className="text-sm text-gray-600 mt-3">LineupIQ will analyze the slate and surface top games, stacks, and plays.</p>
            </section>

            {/* RESULTS AREA - EMPTY STATE */}
            {simStatus === 'idle' && (
              <section className="bg-white rounded-xl p-16 shadow-sm text-center">
                <BeakerIcon className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-extrabold text-gray-400 mb-2">Ready to Simulate</h3>
                <p className="text-gray-500">Run a simulation to see slate overview, top stacks, and key plays.</p>
              </section>
            )}

            {/* RESULTS AREA - COMPLETE */}
            {simStatus === 'complete' && (
              <>
                {/* SLATE OVERVIEW */}
                <section className="bg-white rounded-xl p-8 shadow-sm">
                  <h2 className="text-3xl font-extrabold text-[#1E3A8A] mb-6">Slate Overview</h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-blue-50 border-2 border-blue-200">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Games</p>
                      <p className="text-3xl font-extrabold text-[#1E3A8A]">{mockSlateOverview.games}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Highest Total Game</p>
                      <p className="text-lg font-extrabold text-[#1E3A8A]">{mockSlateOverview.highestTotal.teams}</p>
                      <p className="text-sm text-gray-600">{mockSlateOverview.highestTotal.total}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50 border-2 border-purple-200">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Top Scoring Team</p>
                      <p className="text-lg font-extrabold text-[#1E3A8A]">{mockSlateOverview.highestScoring.team}</p>
                      <p className="text-sm text-gray-600">{mockSlateOverview.highestScoring.projection} pts</p>
                    </div>
                    <div className="p-4 rounded-lg bg-orange-50 border-2 border-orange-200">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Slate Type</p>
                      <p className="text-sm font-extrabold text-[#1E3A8A]">{mockSlateOverview.slateType}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-red-50 border-2 border-red-200 md:col-span-2">
                      <p className="text-sm font-semibold text-gray-600 mb-1">Pace/Upside</p>
                      <p className="text-sm font-extrabold text-[#1E3A8A]">{mockSlateOverview.paceIndicator}</p>
                    </div>
                  </div>
                </section>

                {/* TOP STACKS */}
                <section className="bg-white rounded-xl p-8 shadow-sm">
                  <h2 className="text-3xl font-extrabold text-[#1E3A8A] mb-6">Top Stacks</h2>

                  <div className="space-y-4">
                    {mockStacks.map((stack, idx) => (
                      <motion.div
                        key={idx}
                        className="p-6 rounded-xl border-2 border-gray-200 hover:border-[#1E3A8A] transition"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl font-extrabold text-[#1E3A8A]">{stack.team}</span>
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                                {stack.leverage} Leverage
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-gray-600">{stack.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-extrabold text-[#00C853]">{stack.projection} pts</p>
                            <p className="text-xs text-gray-500">Projection</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Ownership</p>
                            <p className="text-lg font-bold text-gray-800">{stack.ownership}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Bust Risk</p>
                            <p className="text-lg font-bold text-gray-800">{stack.bustRisk}</p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Link
                            href="/optimizer"
                            className="flex-1 px-4 py-2 bg-[#1E3A8A] text-white font-bold rounded-lg hover:bg-[#2D4A9A] transition text-center text-sm"
                          >
                            Send to Optimizer
                          </Link>
                          <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition text-sm">
                            Open in Brainsheet
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* KEY PLAYS */}
                <section className="bg-white rounded-xl p-8 shadow-sm">
                  <h2 className="text-3xl font-extrabold text-[#1E3A8A] mb-6">Key Plays</h2>

                  {/* Tabs */}
                  <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
                    <button
                      onClick={() => setActiveTab('core')}
                      className={`px-6 py-3 font-bold text-sm transition ${
                        activeTab === 'core'
                          ? 'border-b-4 border-[#1E3A8A] text-[#1E3A8A]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Core Plays
                    </button>
                    <button
                      onClick={() => setActiveTab('value')}
                      className={`px-6 py-3 font-bold text-sm transition ${
                        activeTab === 'value'
                          ? 'border-b-4 border-[#1E3A8A] text-[#1E3A8A]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Value Plays
                    </button>
                    <button
                      onClick={() => setActiveTab('leverage')}
                      className={`px-6 py-3 font-bold text-sm transition ${
                        activeTab === 'leverage'
                          ? 'border-b-4 border-[#1E3A8A] text-[#1E3A8A]'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Leverage Plays
                    </button>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Player</th>
                          <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Team</th>
                          <th className="text-left py-3 px-4 text-sm font-bold text-gray-600">Pos</th>
                          <th className="text-right py-3 px-4 text-sm font-bold text-gray-600">Proj</th>
                          <th className="text-right py-3 px-4 text-sm font-bold text-gray-600">Salary</th>
                          <th className="text-right py-3 px-4 text-sm font-bold text-gray-600">Own%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(activeTab === 'core' ? mockCorePlays : activeTab === 'value' ? mockValuePlays : mockLeveragePlays).map((player, idx) => (
                          <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                            <td className="py-4 px-4 font-bold text-[#1E3A8A]">{player.name}</td>
                            <td className="py-4 px-4 text-gray-700 font-semibold">{player.team}</td>
                            <td className="py-4 px-4 text-gray-700 font-semibold">{player.position}</td>
                            <td className="py-4 px-4 text-right font-bold text-gray-800">{player.projection}</td>
                            <td className="py-4 px-4 text-right font-bold text-gray-800">${player.salary}</td>
                            <td className="py-4 px-4 text-right font-bold text-gray-800">{player.ownership}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* SIM ACTIONS */}
                <section className="flex flex-col md:flex-row gap-4">
                  <Link
                    href="/optimizer"
                    className="flex-1 px-8 py-4 bg-[#1E3A8A] text-white font-extrabold rounded-xl hover:bg-[#2D4A9A] transition text-center text-lg"
                  >
                    Send Slate to Optimizer
                  </Link>
                  <button className="flex-1 px-8 py-4 bg-[#00C853] text-white font-extrabold rounded-xl hover:bg-[#00B248] transition text-lg">
                    Save This Sim
                  </button>
                </section>
              </>
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
                  {simStatus === 'complete'
                    ? "This looks like a balanced slate with one clear anchor game. Ownership is condensing on BUF-KC; leverage opportunities appear around SF."
                    : "Run a simulation to get LineupIQ's analysis of tonight's slate shape and edge opportunities."}
                </p>
              </div>

              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition text-sm">
                  Explain this slate shape
                </button>
                <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition text-sm">
                  Suggest stacks for GPP
                </button>
                <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition text-sm">
                  Suggest cash-game angle
                </button>
              </div>
            </div>

            {/* SIM SUMMARY */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-extrabold text-[#1E3A8A] mb-4">Sim Summary</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Sport & Slate</p>
                  <p className="text-sm font-bold text-gray-800">{selectedSport} – {selectedSlate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Site</p>
                  <p className="text-sm font-bold text-gray-800">{selectedSite}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Run</p>
                  <p className="text-sm font-bold text-gray-800">
                    {simStatus === 'complete' ? 'Just now' : 'Not run yet'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    simStatus === 'complete' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {simStatus === 'complete' ? 'Complete' : 'Not Run Yet'}
                  </span>
                </div>
              </div>
            </div>

            {/* SAVED SIMS */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-extrabold text-[#1E3A8A] mb-4">Saved Sims</h3>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-sm font-bold text-gray-800 mb-1">NFL – Main Slate</p>
                  <p className="text-xs text-gray-500">Last run: 2 hours ago</p>
                </div>

                <Link
                  href="/dashboard/saved-sims"
                  className="block w-full px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition text-center text-sm"
                >
                  View All Saved Sims
                </Link>
              </div>
            </div>

          </aside>
          {/* END RIGHT SIDEBAR */}

        </div>
      </div>

      <Footer />
    </div>
  )
}
