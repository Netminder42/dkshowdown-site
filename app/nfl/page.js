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

export default function NFLPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="text-[400px] font-bold text-white/5 absolute -top-32 -right-32 transform rotate-12">
            🏈
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
              🏈
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              NFL DFS
            </h1>

            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Dominate NFL DFS with expert Showdown and Classic lineup picks
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/picks?sport=NFL&type=showdown">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg"
                >
                  View NFL Showdown Picks
                </motion.button>
              </Link>
              <Link href="/picks?sport=NFL&type=classic">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all border border-gray-700"
                >
                  View NFL Classic Picks
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Current Season Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionTitle title="2024-25 NFL Season" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard
            icon={CalendarIcon}
            label="Season"
            value="Week 14"
            color="blue"
          />
          <StatCard
            icon={TrophyIcon}
            label="Teams"
            value="32"
            color="blue"
          />
          <StatCard
            icon={FireIcon}
            label="DFS Slates"
            value="Weekly"
            color="blue"
          />
        </div>

        {/* NFL DFS Strategy */}
        <SectionTitle title="NFL DFS Strategy" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <StrategyCard
            title="Showdown Format"
            icon="⚡"
            strategies={[
              "Captain gets 1.5x points and salary - usually QB or RB",
              "Target high-scoring games with O/U 45+",
              "Stack QB with pass catchers for correlated upside",
              "Consider game script - who's favored to score?",
              "Contrarian Captains provide leverage in GPPs",
              "Weather matters - wind affects passing games"
            ]}
          />
          <StrategyCard
            title="Classic Format"
            icon="📊"
            strategies={[
              "Stack QB + 2 pass catchers from high-scoring teams",
              "Target RBs with 20+ touch potential",
              "Find value WRs with increased target share",
              "Pay attention to Vegas totals and spreads",
              "Dome games typically have higher scoring",
              "Monitor injury reports for value opportunities"
            ]}
          />
        </div>

        {/* Key Positions */}
        <SectionTitle title="Key Positions for NFL DFS" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <PositionCard
            position="QB"
            importance="Elite"
            tips={[
              "Most consistent scorers",
              "Stack with your pass catchers",
              "Target dome games",
              "Look for QB vs bad pass D"
            ]}
            color="purple"
          />
          <PositionCard
            position="RB"
            importance="High"
            tips={[
              "Volume is king (20+ touches)",
              "Goal line work crucial",
              "Pass-catching backs in PPR",
              "Avoid timeshares when possible"
            ]}
            color="green"
          />
          <PositionCard
            position="WR"
            importance="High"
            tips={[
              "Target share over 25%",
              "WR1s in plus matchups",
              "Slot WRs vs weak slot D",
              "Stack with your QB"
            ]}
            color="blue"
          />
          <PositionCard
            position="TE"
            importance="Medium"
            tips={[
              "Top 3 TEs or punt",
              "Target hogs in red zone",
              "Plus matchups vs LBs",
              "Leverage in GPPs"
            ]}
            color="orange"
          />
        </div>

        {/* NFL DFS Quick Stats */}
        <SectionTitle title="NFL DFS Quick Facts" />

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuickFact
              title="Optimal Lineup Score"
              value="Classic: 180-220pts | Showdown: 150-200pts"
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
              title="Best Days"
              value="Thursday, Sunday, Monday Night"
              icon={CalendarIcon}
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Dominate NFL DFS?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Get access to daily expert picks, lineup analysis, and winning strategies
          </p>
          <Link href="/auth/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-8 rounded-xl text-lg transition-all"
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
            <span className="text-blue-500 mr-3 mt-1">✓</span>
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
            <span className="text-blue-400 mr-2">•</span>
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
      <Icon className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-white font-semibold">{value}</p>
      </div>
    </div>
  )
}
