'use client'

import { use Effect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Navigation from '@/Components/Navigation'
import { motion } from 'framer-motion'
import {
  UserCircleIcon,
  CreditCardIcon,
  BellIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { FullPageLoader } from '@/Components/LoadingSkeletons'
import toast from 'react-hot-toast'
import { getTrialDaysLeft } from '@/lib/utils'

export default function Settings() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  const handleManageBilling = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
      })
      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error('Failed to open billing portal')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return <FullPageLoader />
  }

  if (!session) {
    return null
  }

  const subscription = session.user.subscription
  const trialDaysLeft = subscription?.trialEndsAt ? getTrialDaysLeft(subscription.trialEndsAt) : 0
  const isTrialing = subscription?.status === 'trialing'
  const isActive = subscription?.status === 'active'

  const settingsSections = [
    {
      title: 'Account',
      icon: UserCircleIcon,
      items: [
        { label: 'Email', value: session.user.email },
        { label: 'Name', value: session.user.name || 'Not set' },
        { label: 'Member since', value: new Date().toLocaleDateString() },
      ]
    },
    {
      title: 'Subscription',
      icon: CreditCardIcon,
      items: [
        {
          label: 'Status',
          value: isTrialing ? `Free Trial (${trialDaysLeft} days left)` : isActive ? 'Active' : 'Inactive',
          badge: isTrialing || isActive
        },
        { label: 'Plan', value: 'Premium' },
        {
          label: 'Manage Billing',
          action: handleManageBilling,
          actionLabel: 'Open Portal'
        },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400 mb-8">Manage your account and subscription</p>

          <div className="space-y-6">
            {settingsSections.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-700 flex items-center">
                  <section.icon className="h-6 w-6 text-green-500 mr-3" />
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>

                <div className="divide-y divide-gray-700">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-400">{item.label}</p>
                        {item.value && (
                          <p className="text-base text-white mt-1 flex items-center">
                            {item.value}
                            {item.badge && (
                              <span className="ml-2 px-2 py-0.5 bg-green-900/30 border border-green-700 rounded-full text-xs text-green-400">
                                Active
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                      {item.action && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={item.action}
                          disabled={loading}
                          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Loading...' : item.actionLabel}
                          <ArrowRightIcon className="h-4 w-4 ml-2" />
                        </motion.button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <motion.a
                href="mailto:support@dkshowdown.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 transition-colors group"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-900/30 rounded-lg">
                    <ShieldCheckIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-white">Contact Support</p>
                    <p className="text-sm text-gray-400">We're here to help</p>
                  </div>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toast.info('Notifications feature coming soon!')}
                className="flex items-center justify-between p-6 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 transition-colors group"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-purple-900/30 rounded-lg">
                    <BellIcon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="ml-4 text-left">
                    <p className="font-medium text-white">Notifications</p>
                    <p className="text-sm text-gray-400">Manage alerts</p>
                  </div>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
