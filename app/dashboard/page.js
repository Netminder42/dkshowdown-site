'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-2">Welcome back, {session.user.name || session.user.email}</p>
        </div>

        {/* Subscription Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Subscription Status</h3>
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${hasPremiumAccess ? 'text-green-500' : 'text-red-500'}`}>
                {subscription?.status === 'trialing' && 'Free Trial'}
                {subscription?.status === 'active' && 'Active'}
                {subscription?.status === 'canceled' && 'Canceled'}
                {!subscription && 'No Subscription'}
              </span>
            </div>
            {isTrialing && trialDaysLeft > 0 && (
              <p className="text-sm text-gray-400 mt-2">{trialDaysLeft} days left in trial</p>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Total Picks Viewed</h3>
            <p className="text-2xl font-bold text-white">0</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Win Rate</h3>
            <p className="text-2xl font-bold text-white">--%</p>
          </div>
        </div>

        {/* Premium Access */}
        {!hasPremiumAccess && (
          <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-lg p-8 mb-8 border border-green-700">
            <h2 className="text-2xl font-bold text-white mb-4">Upgrade to Premium</h2>
            <p className="text-green-100 mb-6">
              Get access to daily DFS picks, advanced tools, and exclusive content.
            </p>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Start Free Trial'}
            </button>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/picks?sport=NFL&type=showdown" className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 border border-gray-700 transition">
            <h3 className="text-lg font-semibold text-white mb-2">NFL Showdown</h3>
            <p className="text-sm text-gray-400">View daily NFL showdown picks</p>
          </a>
          <a href="/picks?sport=NBA&type=classic" className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 border border-gray-700 transition">
            <h3 className="text-lg font-semibold text-white mb-2">NBA Classic</h3>
            <p className="text-sm text-gray-400">View daily NBA classic picks</p>
          </a>
          <a href="/picks?sport=MLB&type=showdown" className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 border border-gray-700 transition">
            <h3 className="text-lg font-semibold text-white mb-2">MLB Showdown</h3>
            <p className="text-sm text-gray-400">View daily MLB showdown picks</p>
          </a>
          <a href="/picks?sport=NHL&type=classic" className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 border border-gray-700 transition">
            <h3 className="text-lg font-semibold text-white mb-2">NHL Classic</h3>
            <p className="text-sm text-gray-400">View daily NHL classic picks</p>
          </a>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Recent Picks</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-400 text-center py-8">No picks saved yet. Browse picks to get started!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
