'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'
import {
  ChartBarIcon,
  TrophyIcon,
  FireIcon,
  ClockIcon,
  BookmarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [savedPicks, setSavedPicks] = useState([])
  const [stats, setStats] = useState({
    totalPicks: 0,
    wins: 0,
    losses: 0,
    pending: 0,
    winRate: 0,
    avgScore: 0
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchSavedPicks()
    }
  }, [session])

  const fetchSavedPicks = async () => {
    try {
      const response = await fetch('/api/user/saved-picks')
      if (response.ok) {
        const data = await response.json()
        setSavedPicks(data.picks || [])
        calculateStats(data.picks || [])
      }
    } catch (error) {
      console.error('Failed to fetch saved picks:', error)
    }
  }

  const calculateStats = (picks) => {
    const total = picks.length
    const wins = picks.filter(p => p.result === 'win').length
    const losses = picks.filter(p => p.result === 'loss').length
    const pending = picks.filter(p => !p.result || p.result === 'pending').length
    const winRate = total > 0 ? ((wins / (wins + losses)) * 100).toFixed(1) : 0

    const scores = picks.filter(p => p.pick?.actualScore).map(p => p.pick.actualScore)
    const avgScore = scores.length > 0
      ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
      : 0

    setStats({ totalPicks: total, wins, losses, pending, winRate, avgScore })
  }

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
      })
      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error('Failed to create checkout session')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const subscription = session.user.subscription
  const isTrialing = subscription?.status === 'trialing'
  const isActive = subscription?.status === 'active'
  const hasPremiumAccess = isTrialing || isActive

  const trialDaysLeft = subscription?.trialEndsAt
    ? Math.ceil((new Date(subscription.trialEndsAt) - new Date()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {session.user.name || session.user.email}!</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={TrophyIcon}
            label="Win Rate"
            value={stats.totalPicks > 0 ? `${stats.winRate}%` : '--'}
            color="green"
            trend={stats.winRate > 50 ? 'up' : stats.winRate < 50 ? 'down' : 'neutral'}
          />
          <StatCard
            icon={BookmarkIcon}
            label="Saved Picks"
            value={stats.totalPicks}
            color="blue"
          />
          <StatCard
            icon={CheckCircleIcon}
            label="Wins"
            value={stats.wins}
            color="green"
          />
          <StatCard
            icon={ChartBarIcon}
            label="Avg Score"
            value={stats.avgScore > 0 ? stats.avgScore : '--'}
            color="purple"
          />
        </div>

        {/* Subscription Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className={`rounded-xl p-6 border ${
            hasPremiumAccess
              ? 'bg-green-900/20 border-green-700/50'
              : 'bg-gray-800 border-gray-700'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Subscription Status</h3>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold ${
                    hasPremiumAccess ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {isTrialing && `Free Trial (${trialDaysLeft} days left)`}
                    {isActive && 'Premium Active'}
                    {!hasPremiumAccess && 'No Active Subscription'}
                  </span>
                  {hasPremiumAccess && (
                    <span className="px-3 py-1 bg-green-900/30 border border-green-700 rounded-full text-xs text-green-400 font-medium">
                      Active
                    </span>
                  )}
                </div>
              </div>
              {!hasPremiumAccess && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 transition"
                >
                  {loading ? 'Loading...' : 'Start Free Trial'}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickLinkCard
              href="/nfl"
              title="NFL"
              emoji="🏈"
              description="NFL DFS picks and strategy"
            />
            <QuickLinkCard
              href="/nba"
              title="NBA"
              emoji="🏀"
              description="NBA DFS picks and strategy"
            />
            <QuickLinkCard
              href="/mlb"
              title="MLB"
              emoji="⚾"
              description="MLB DFS picks and strategy"
            />
            <QuickLinkCard
              href="/nhl"
              title="NHL"
              emoji="🏒"
              description="NHL DFS picks and strategy"
            />
          </div>
        </motion.div>

        {/* Saved Picks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Your Saved Picks</h2>
            <Link href="/picks">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-green-400 hover:text-green-300 font-medium"
              >
                View All Picks →
              </motion.button>
            </Link>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700">
            {savedPicks.length > 0 ? (
              <div className="divide-y divide-gray-700">
                {savedPicks.slice(0, 5).map((tracking, idx) => (
                  <SavedPickRow key={tracking.id} tracking={tracking} index={idx} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <BookmarkIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No saved picks yet</p>
                <Link href="/picks">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    Browse Picks
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Performance Chart Placeholder */}
        {stats.totalPicks > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Performance Overview</h2>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Picks</p>
                  <p className="text-3xl font-bold text-white">{stats.totalPicks}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Wins</p>
                  <p className="text-3xl font-bold text-green-400">{stats.wins}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Losses</p>
                  <p className="text-3xl font-bold text-red-400">{stats.losses}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Pending</p>
                  <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color, trend }) {
  const colors = {
    green: 'from-green-900/50 to-green-800/50 border-green-700/50',
    blue: 'from-blue-900/50 to-blue-800/50 border-blue-700/50',
    purple: 'from-purple-900/50 to-purple-800/50 border-purple-700/50',
    orange: 'from-orange-900/50 to-orange-800/50 border-orange-700/50'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${colors[color]} rounded-xl p-6 border`}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className="h-8 w-8 text-white" />
        {trend && (
          <ArrowTrendingUpIcon className={`h-5 w-5 ${
            trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400 rotate-180' : 'text-gray-400'
          }`} />
        )}
      </div>
      <p className="text-gray-300 text-sm mb-1">{label}</p>
      <p className="text-white text-3xl font-bold">{value}</p>
    </motion.div>
  )
}

function QuickLinkCard({ href, title, emoji, description }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 border border-gray-700 transition cursor-pointer group"
      >
        <div className="text-4xl mb-3">{emoji}</div>
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-green-400 transition">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </motion.div>
    </Link>
  )
}

function SavedPickRow({ tracking, index }) {
  const pick = tracking.pick
  if (!pick) return null

  const resultColors = {
    win: 'text-green-400 bg-green-900/20 border-green-700',
    loss: 'text-red-400 bg-red-900/20 border-red-700',
    pending: 'text-yellow-400 bg-yellow-900/20 border-yellow-700'
  }

  const result = tracking.result || 'pending'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="p-4 hover:bg-gray-750 transition"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{
              pick.sport === 'NFL' ? '🏈' :
              pick.sport === 'NBA' ? '🏀' :
              pick.sport === 'MLB' ? '⚾' : '🏒'
            }</span>
            <div>
              <h4 className="text-white font-semibold">{pick.title}</h4>
              <p className="text-sm text-gray-400">{pick.sport} • {pick.gameType} • {new Date(pick.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {pick.actualScore && (
            <div className="text-right">
              <p className="text-sm text-gray-400">Score</p>
              <p className="text-lg font-bold text-white">{pick.actualScore}</p>
            </div>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${resultColors[result]}`}>
            {result.charAt(0).toUpperCase() + result.slice(1)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
