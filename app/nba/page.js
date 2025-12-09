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

export default function NBAPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="text-[400px] font-bold text-white/5 absolute -top-32 -right-32 transform rotate-12">
            🏀
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
              🏀
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              NBA DFS
            </h1>

            <p className="text-xl md:text-2xl text-orange-200 mb-8 max-w-3xl mx-auto">
              Crush NBA DFS with elite picks backed by advanced analytics
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/picks?sport=NBA&type=showdown">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg"
                >
                  View NBA Showdown Picks
                </motion.button>
              </Link>
              <Link href="/picks?sport=NBA&type=classic">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all border border-gray-700"
                >
                  View NBA Classic Picks
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Current Season Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle title="2024-25 NBA Season" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard
            icon={CalendarIcon}
            label="Season"
            value="Regular Season"
            color="orange"
          />
          <StatCard
            icon={TrophyIcon}
            label="Teams"
            value="30"
            color="orange"
          />
          <StatCard
            icon={FireIcon}
            label="DFS Slates"
            value="Daily"
            color="orange"
          />
        </div>

        {/* NBA DFS Strategy */}
        <SectionTitle title="NBA DFS Strategy" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <StrategyCard
            title="Showdown Format"
            icon="⭐"
            strategies={[
              "Captain gets 1.5x points - target 35+ min usage stars",
              "Prioritize high-pace matchups (100+ possessions)",
              "Look for injury replacements getting expanded roles",
              "Stack teammates in blowout scenarios (garbage time)",
              "Monitor starting lineups 30 mins before tip",
              "Key player out = instant value for backups"
            ]}
          />
          <StrategyCard
            title="Classic Format"
            icon="🎯"
            strategies={[
              "Target 30+ min players with 25%+ usage rate",
              "Centers in pace-up games provide value",
              "Back-to-back opponents = tired defense",
              "Home court advantage matters less in NBA DFS",
              "Mix stars with value to optimize salary",
              "Monitor injury news up until lock"
            ]}
          />
        </div>

        {/* Key Positions */}
        <SectionTitle title="Key Positions for NBA DFS" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <PositionCard
            position="PG"
            importance="Elite"
            tips={[
              "High assist potential",
              "Ball handlers = minutes",
              "Target elite usage (30%+)",
              "Backup PGs when starter out"
            ]}
            color="purple"
          />
          <PositionCard
            position="SG/SF"
            importance="High"
            tips={[
              "Volume shooters excel",
              "3&D wings underpriced",
              "Versatile scorers",
              "Minutes > matchup"
            ]}
            color="blue"
          />
          <PositionCard
            position="PF"
            importance="Medium"
            tips={[
              "Stretch 4s in pace games",
              "Double-double potential",
              "Rebounding opportunities",
              "Modern game = less value"
            ]}
            color="green"
          />
          <PositionCard
            position="C"
            importance="High"
            tips={[
              "Rebounds + blocks = floor",
              "Dominant centers smash",
              "Value at lower tiers",
              "Target vs weak interior D"
            ]}
            color="orange"
          />
        </div>

        {/* NBA DFS Quick Stats */}
        <SectionTitle title="NBA DFS Quick Facts" />

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickFact
              title="Optimal Lineup Score"
              value="Classic: 280-340pts | Showdown: 220-280pts"
              icon={ChartBarIcon}
            />
            <QuickFact
              title="Salary Cap"
              value="Classic: $50,000 | Showdown: $50,000"
              icon={BoltIcon}
            />
            <QuickFact
              title="Roster Size"
              value="Classic: 8 players | Showdown: 6 players"
              icon={UserGroupIcon}
            />
            <QuickFact
              title="Best Days"
              value="Tuesday, Wednesday (big slates)"
              icon={CalendarIcon}
            />
          </div>
        </div>

        {/* NBA-Specific Tips */}
        <div className="mt-16">
          <SectionTitle title="Pro NBA DFS Tips" />
          <div className="bg-gradient-to-br from-orange-900/30 to-gray-800 rounded-xl border border-orange-700/50 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProTip
                title="Pace Matters"
                description="Target teams playing at 100+ possessions per game. More possessions = more fantasy points opportunity."
              />
              <ProTip
                title="Usage Rate is King"
                description="Players with 25%+ usage in 30+ minutes are the foundation of winning lineups."
              />
              <ProTip
                title="Injury News = Value"
                description="When a star player is ruled out, teammates see massive usage bump. Move fast on this info."
              />
              <ProTip
                title="Back-to-Backs"
                description="Teams on 2nd night of B2B often rest stars or play tired. Target opponents and backups."
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-900 to-orange-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Dominate NBA DFS?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Get access to daily expert picks, advanced analytics, and winning strategies
          </p>
          <Link href="/auth/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-100 text-orange-900 font-bold py-4 px-8 rounded-xl text-lg transition-all"
            >
              Start Free 7-Day Trial
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  )
}

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
    blue: 'from-blue-900 to-blue-800 border-blue-700',
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
            <span className="text-orange-500 mr-3 mt-1">✓</span>
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
            <span className="text-orange-400 mr-2">•</span>
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
      <Icon className="h-6 w-6 text-orange-400 mr-3 mt-1 flex-shrink-0" />
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-white font-semibold">{value}</p>
      </div>
    </div>
  )
}

function ProTip({ title, description }) {
  return (
    <div>
      <h4 className="text-white font-bold text-lg mb-2">{title}</h4>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
