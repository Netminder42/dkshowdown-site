'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/Components/Navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { PickCardSkeleton } from '@/Components/LoadingSkeletons'

export default function Picks() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [picks, setPicks] = useState([])
  const [loading, setLoading] = useState(true)
  const [sport, setSport] = useState(searchParams.get('sport') || 'NFL')
  const [gameType, setGameType] = useState(searchParams.get('type') || 'showdown')

  useEffect(() => {
    fetchPicks()
  }, [sport, gameType])

  const fetchPicks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/picks?sport=${sport}&type=${gameType}`)
      const data = await response.json()
      setPicks(data.picks || [])
    } catch (error) {
      console.error('Failed to fetch picks:', error)
    } finally {
      setLoading(false)
    }
  }

  const hasPremiumAccess = session?.user?.subscription?.status === 'trialing' ||
                          session?.user?.subscription?.status === 'active'

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            DFS Picks
          </h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-3">Sport</label>
              <div className="flex gap-2">
                {['NFL', 'NBA', 'MLB', 'NHL'].map(s => (
                  <motion.button
                    key={s}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSport(s)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                      sport === s
                        ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-900/50'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-3">Type</label>
              <div className="flex gap-2">
                {[
                  { value: 'showdown', label: 'Showdown' },
                  { value: 'classic', label: 'Classic' }
                ].map(t => (
                  <motion.button
                    key={t.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setGameType(t.value)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                      gameType === t.value
                        ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-900/50'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {t.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Premium Banner */}
        {!hasPremiumAccess && (
          <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-lg p-6 mb-6 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Unlock All Premium Picks</h3>
                <p className="text-green-100">Start your 7-day free trial to access all DFS picks and tools</p>
              </div>
              <Link
                href="/auth/signup"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg whitespace-nowrap"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        )}

        {/* Picks List */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[...Array(6)].map((_, i) => (
                <PickCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : picks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-800 rounded-xl p-16 text-center border border-gray-700"
            >
              <p className="text-gray-400 text-xl">No picks available for {sport} {gameType} yet.</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon for new picks!</p>
            </motion.div>
          ) : (
            <motion.div
              key="picks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {picks.map((pick, idx) => (
                <motion.div
                  key={pick.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <PickCard pick={pick} hasPremiumAccess={hasPremiumAccess} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function PickCard({ pick, hasPremiumAccess }) {
  const isLocked = pick.locked

  const confidenceColors = {
    high: 'text-green-500',
    medium: 'text-yellow-500',
    low: 'text-orange-500',
  }

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
      transition={{ duration: 0.2 }}
      className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-green-600 transition-colors h-full"
    >
      {/* Header */}
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-400">
            {pick.sport} • {pick.gameType === 'showdown' ? 'Showdown' : 'Classic'}
          </span>
          {pick.isPremium && (
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">PREMIUM</span>
          )}
        </div>
        <h3 className="text-lg font-bold text-white">{pick.title}</h3>
        <p className="text-sm text-gray-400 mt-1">{pick.gameInfo}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLocked ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-gray-400 mb-4">Premium content locked</p>
            <Link
              href="/auth/signup"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Unlock with Free Trial
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-300 text-sm mb-4">{pick.description}</p>

            {pick.captain && (
              <div className="mb-4">
                <span className="text-xs font-semibold text-gray-400 uppercase">Captain/MVP</span>
                <p className="text-green-500 font-bold">{pick.captain}</p>
              </div>
            )}

            {pick.players && pick.players.length > 0 && (
              <div className="mb-4">
                <span className="text-xs font-semibold text-gray-400 uppercase mb-2 block">Players</span>
                <div className="space-y-2">
                  {pick.players.slice(0, 6).map((player, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-white">
                        {player.name} <span className="text-gray-500">({player.position})</span>
                      </span>
                      <span className="text-gray-400">${player.salary?.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <div>
                <span className="text-xs text-gray-400">Confidence</span>
                <p className={`font-bold capitalize ${confidenceColors[pick.confidence] || 'text-gray-500'}`}>
                  {pick.confidence}
                </p>
              </div>
              {pick.projection && (
                <div className="text-right">
                  <span className="text-xs text-gray-400">Projection</span>
                  <p className="font-bold text-white">{pick.projection} pts</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 px-6 py-3 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          {new Date(pick.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </div>
    </motion.div>
  )
}

