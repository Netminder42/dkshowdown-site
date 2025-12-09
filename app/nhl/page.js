'use client'

import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  TrophyIcon,
  ChartBarIcon,
  CalendarIcon,
  FireIcon,
  BoltIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

export default function NHLPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="text-[400px] font-bold text-white/5 absolute -top-32 -right-32 transform rotate-12">
            🏒
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-8xl mb-6"
            >
              🏒
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              NHL DFS
            </h1>

            <p className="text-xl md:text-2xl text-cyan-200 mb-8 max-w-3xl mx-auto">
              Score big with expert NHL DFS picks and power play stacks
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/picks?sport=NHL&type=showdown">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg"
                >
                  View NHL Showdown Picks
                </motion.button>
              </Link>
              <Link href="/picks?sport=NHL&type=classic">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all border border-gray-700"
                >
                  View NHL Classic Picks
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Current Season Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle title="2024-25 NHL Season" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard
            icon={CalendarIcon}
            label="Season"
            value="Regular Season"
            color="cyan"
          />
          <StatCard
            icon={TrophyIcon}
            label="Teams"
            value="32"
            color="cyan"
          />
          <StatCard
            icon={FireIcon}
            label="DFS Slates"
            value="Daily"
            color="cyan"
          />
        </div>

        {/* NHL DFS Strategy */}
        <SectionTitle title="NHL DFS Strategy" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <StrategyCard
            title="Cash Games"
            icon="💎"
            strategies={[
              "Stack PP1 lines from top teams (EDM, TOR, TBL)",
              "Target elite goalies in favorable matchups",
              "Prioritize teams vs weak defensive opponents",
              "Pay up for centers with faceoff and PP time",
              "Safe floor = 3+ points per game average",
              "Avoid backup goalies and uncertain starters"
            ]}
          />
          <StrategyCard
            title="Tournaments"
            icon="🥅"
            strategies={[
              "Contrarian stacks from lower-owned teams",
              "Value goalies against weak offenses",
              "Multi-position eligible players add flexibility",
              "Target teams on winning streaks (hot goalies)",
              "Leverage plays: fade public goalies",
              "Mini-stacks from PP2 units for differentiation"
            ]}
          />
        </div>

        {/* Key Positions */}
        <SectionTitle title="Key Positions for NHL DFS" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <PositionCard
            position="C"
            importance="Elite"
            tips={[
              "Faceoff wins = opportunities",
              "PP1 centers are premium",
              "High shot volume",
              "Dual eligibility (C/W)"
            ]}
            color="purple"
          />
          <PositionCard
            position="W"
            importance="High"
            tips={[
              "PP1 wingers essential",
              "Shoot-first mentality",
              "Top-line even strength",
              "Multi-cat contributors"
            ]}
            color="blue"
          />
          <PositionCard
            position="D"
            importance="Medium"
            tips={[
              "PP1 quarterbacks only",
              "Shot-heavy defensemen",
              "Points + blocks combo",
              "Value at position scarce"
            ]}
            color="green"
          />
          <PositionCard
            position="G"
            importance="High Variance"
            tips={[
              "Elite teams = more wins",
              "Weak opponent offense",
              "Recent form matters",
              "Home ice advantage"
            ]}
            color="orange"
          />
        </div>

        {/* NHL DFS Quick Stats */}
        <SectionTitle title="NHL DFS Quick Facts" />

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickFact
              title="Optimal Lineup Score"
              value="Classic: 45-65pts | Showdown: 35-55pts"
              icon={ChartBarIcon}
            />
            <QuickFact
              title="Salary Cap"
              value="Classic: $50,000 | Showdown: $50,000"
              icon={BoltIcon}
            />
            <QuickFact
              title="Roster Size"
              value="Classic: 9 players | Showdown: 6 players"
              icon={UserGroupIcon}
            />
            <QuickFact
              title="Scoring"
              value="Goals: 3pts | Assists: 2pts | Saves: 0.2pts"
              icon={FireIcon}
            />
          </div>
        </div>

        {/* Power Play Stacking */}
        <div>
          <SectionTitle title="Power Play Dominance" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-900/30 to-gray-800 rounded-xl border border-cyan-700/50 p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">⚡ PP1 Stacking Strategy</h3>
              <p className="text-gray-300 mb-4">
                Power play units score 30%+ of all goals. Stacking PP1 linemates creates massive correlation upside.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span><strong>Top PP1 Teams:</strong> Edmonton, Toronto, Tampa, Colorado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span><strong>Stack Format:</strong> C + W + D from same PP1 unit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span><strong>Correlation:</strong> 1 PP goal can hit 3 players at once</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-900/30 to-gray-800 rounded-xl border border-orange-700/50 p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">🥅 Goalie Strategy</h3>
              <p className="text-gray-300 mb-4">
                Goalies are highest variance position. Target elite teams facing weak offenses.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span><strong>Elite Goalies:</strong> $8K+ facing bottom-10 offenses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span><strong>Value Plays:</strong> Hot backups in good matchups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span><strong>Leverage:</strong> Fade chalk goalies in GPPs</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-900 to-cyan-800 py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Dominate NHL DFS?
          </h2>
          <p className="text-cyan-100 text-lg mb-8">
            Get access to daily PP1 stacks, goalie analysis, and winning strategies
          </p>
          <Link href="/auth/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-100 text-cyan-900 font-bold py-4 px-8 rounded-xl text-lg transition-all"
            >
              Start Free 7-Day Trial
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Helper components
function SectionTitle({ title }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      className="text-4xl font-bold text-white mb-8"
    >
      {title}
    </motion.h2>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const colors = {
    cyan: 'from-cyan-900 to-cyan-800 border-cyan-700',
    green: 'from-green-900 to-green-800 border-green-700',
    purple: 'from-purple-900 to-purple-800 border-purple-700',
    orange: 'from-orange-900 to-orange-800 border-orange-700'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5 }}
      className={`bg-gradient-to-br ${colors[color]} rounded-xl p-6 border`}
    >
      <Icon className="h-8 w-8 text-white mb-3" />
      <p className="text-gray-300 text-sm mb-1">{label}</p>
      <p className="text-white text-3xl font-bold">{value}</p>
    </motion.div>
  )
}

function StrategyCard({ title, icon, strategies }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="bg-gray-800 rounded-xl border border-gray-700 p-8"
    >
      <div className="flex items-center mb-6">
        <span className="text-5xl mr-4">{icon}</span>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {strategies.map((strategy, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start text-gray-300"
          >
            <span className="text-cyan-500 mr-3 mt-1">✓</span>
            <span>{strategy}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

function PositionCard({ position, importance, tips, color }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const colors = {
    purple: 'border-purple-600 bg-purple-900/20',
    green: 'border-green-600 bg-green-900/20',
    blue: 'border-blue-600 bg-blue-900/20',
    orange: 'border-orange-600 bg-orange-900/20'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ scale: 1.05 }}
      className={`bg-gray-800 rounded-xl border-2 ${colors[color]} p-6`}
    >
      <h3 className="text-3xl font-bold text-white mb-2">{position}</h3>
      <p className="text-sm text-gray-400 mb-4">Importance: {importance}</p>
      <ul className="space-y-2">
        {tips.map((tip, idx) => (
          <li key={idx} className="text-sm text-gray-300 flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            {tip}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function QuickFact({ title, value, icon: Icon }) {
  return (
    <div className="flex items-start">
      <Icon className="h-6 w-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-white font-semibold">{value}</p>
      </div>
    </div>
  )
}
