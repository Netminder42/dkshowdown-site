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

export default function MLBPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="text-[400px] font-bold text-white/5 absolute -top-32 -right-32 transform rotate-12">
            ⚾
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
              ⚾
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              MLB DFS
            </h1>

            <p className="text-xl md:text-2xl text-red-200 mb-8 max-w-3xl mx-auto">
              Win big with expert MLB DFS picks and advanced sabermetrics
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/picks?sport=MLB&type=showdown">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg"
                >
                  View MLB Showdown Picks
                </motion.button>
              </Link>
              <Link href="/picks?sport=MLB&type=classic">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all border border-gray-700"
                >
                  View MLB Classic Picks
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Current Season Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle title="2025 MLB Season" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard
            icon={CalendarIcon}
            label="Season"
            value="Spring Training"
            color="red"
          />
          <StatCard
            icon={TrophyIcon}
            label="Teams"
            value="30"
            color="red"
          />
          <StatCard
            icon={FireIcon}
            label="DFS Slates"
            value="Daily (162 games)"
            color="red"
          />
        </div>

        {/* MLB DFS Strategy */}
        <SectionTitle title="MLB DFS Strategy" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <StrategyCard
            title="Cash Games"
            icon="💰"
            strategies={[
              "Target elite pitchers in favorable matchups",
              "Stack top-3 hitters from best offense on slate",
              "Prioritize hitter-friendly ballparks (Coors, GABP)",
              "Fade pitchers in poor weather (wind out to RF)",
              "Monitor lineups 10 mins before first pitch",
              "Left-handed bats vs RHP = platoon advantage"
            ]}
          />
          <StrategyCard
            title="Tournaments"
            icon="🏆"
            strategies={[
              "Contrarian stacks from lower-owned teams",
              "Target pitchers with 10+ K upside",
              "Multiple mini-stacks for correlation",
              "Weather plays create leverage opportunities",
              "Late-swap based on wind/weather updates",
              "Value pitchers in good spots = salary relief"
            ]}
          />
        </div>

        {/* Key Positions */}
        <SectionTitle title="Key Positions for MLB DFS" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <PositionCard
            position="SP"
            importance="Elite"
            tips={[
              "Strikeout upside (K/9 > 9.0)",
              "Weak opposing lineup",
              "Home starts in pitcher parks",
              "Weather: avoid wind/rain"
            ]}
            color="purple"
          />
          <PositionCard
            position="OF"
            importance="High"
            tips={[
              "Top of batting order",
              "Platoon advantages",
              "Power + speed combo",
              "Hitter-friendly parks"
            ]}
            color="blue"
          />
          <PositionCard
            position="1B/3B"
            importance="High"
            tips={[
              "Power hitters excel",
              "High RBI opportunity",
              "Middle of order bats",
              "Target Coors Field"
            ]}
            color="orange"
          />
        </div>

        {/* MLB DFS Quick Stats */}
        <SectionTitle title="MLB DFS Quick Facts" />

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickFact
              title="Optimal Lineup Score"
              value="Classic: 140-180pts | Showdown: 110-150pts"
              icon={ChartBarIcon}
            />
            <QuickFact
              title="Salary Cap"
              value="Classic: $50,000 | Showdown: $50,000"
              icon={BoltIcon}
            />
            <QuickFact
              title="Roster Size"
              value="Classic: 10 players (2P, 8 hitters)"
              icon={UserGroupIcon}
            />
            <QuickFact
              title="Best Ballparks"
              value="Coors Field, GABP, Fenway Park"
              icon={FireIcon}
            />
          </div>
        </div>

        {/* Weather & Park Factors */}
        <div>
          <SectionTitle title="MLB DFS Key Factors" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-900/30 to-gray-800 rounded-xl border border-red-700/50 p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">🌤️ Weather Impact</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span><strong>Wind 10+ MPH out to RF/LF:</strong> Major boost for power hitters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span><strong>Temperature 80°F+:</strong> Ball travels further</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span><strong>Rain/Cold:</strong> Fade hitters, pitchers benefit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span><strong>Humidity:</strong> High humidity = more offense</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/30 to-gray-800 rounded-xl border border-blue-700/50 p-6"
            >
              <h3 className="text-2xl font-bold text-white mb-4">🏟️ Park Factors</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Coors Field:</strong> #1 hitter park, altitude = runs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Great American Ball Park:</strong> Short porches</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Oracle Park:</strong> Pitcher-friendly, fade hitters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span><strong>Yankee Stadium:</strong> Short RF porch for lefties</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Dominate MLB DFS?
          </h2>
          <p className="text-red-100 text-lg mb-8">
            Get access to daily stacks, weather analysis, and winning strategies
          </p>
          <Link href="/auth/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-100 text-red-900 font-bold py-4 px-8 rounded-xl text-lg transition-all"
            >
              Start Free 7-Day Trial
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Helper components (same as NFL/NBA pages)
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
    red: 'from-red-900 to-red-800 border-red-700',
    blue: 'from-blue-900 to-blue-800 border-blue-700',
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
            <span className="text-red-500 mr-3 mt-1">✓</span>
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
            <span className="text-red-400 mr-2">•</span>
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
      <Icon className="h-6 w-6 text-red-400 mr-3 mt-1 flex-shrink-0" />
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-white font-semibold">{value}</p>
      </div>
    </div>
  )
}
