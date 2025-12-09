'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/Components/Navigation'
import Link from 'next/link'

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">DFS Picks</h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Sport</label>
              <div className="flex gap-2">
                {['NFL', 'NBA', 'MLB', 'NHL'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSport(s)}
                    className={`px-4 py-2 rounded-md font-medium ${
                      sport === s
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
              <div className="flex gap-2">
                {[
                  { value: 'showdown', label: 'Showdown' },
                  { value: 'classic', label: 'Classic' }
                ].map(t => (
                  <button
                    key={t.value}
                    onClick={() => setGameType(t.value)}
                    className={`px-4 py-2 rounded-md font-medium ${
                      gameType === t.value
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

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
        {loading ? (
          <div className="text-center py-12">
            <div className="text-white">Loading picks...</div>
          </div>
        ) : picks.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 text-center border border-gray-700">
            <p className="text-gray-400 text-lg">No picks available for {sport} {gameType} yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {picks.map(pick => (
              <PickCard key={pick.id} pick={pick} hasPremiumAccess={hasPremiumAccess} />
            ))}
          </div>
        )}
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
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-green-600 transition">
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
    </div>
  )
}

