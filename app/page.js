'use client'

import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SparklesIcon, ChartBarIcon, TrophyIcon, BoltIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-green-900/30 border border-green-700 rounded-full text-green-400 text-sm font-medium mb-6"
              >
                <SparklesIcon className="h-4 w-4 mr-2" />
                AI-Powered DFS Picks
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Master{' '}
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  DraftKings DFS
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              The only platform built specifically for Showdown and Classic DFS with AI-powered picks and tools
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link href="/auth/signup">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg shadow-green-900/50"
                >
                  Start Free 7-Day Trial
                </motion.button>
              </Link>
              <Link href="/picks">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all border border-gray-700"
                >
                  View Picks
                </motion.button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 mt-6 text-sm"
            >
              No credit card required • Cancel anytime
            </motion.p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Win</h2>
          <p className="text-gray-400 text-lg">Professional DFS tools and picks for serious players</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="📊"
            title="Daily Picks"
            description="AI-enhanced lineup picks for NFL, NBA, MLB, and NHL"
          />
          <FeatureCard
            icon="🎯"
            title="Showdown & Classic"
            description="Specialized picks for both Showdown slates and Classic contests"
          />
          <FeatureCard
            icon="📈"
            title="Performance Tracking"
            description="Track your picks and analyze your DFS performance over time"
          />
          <FeatureCard
            icon="🤖"
            title="AI-Powered Tools"
            description="Advanced analytics and projections to give you an edge"
          />
        </div>
      </div>

      {/* Sports Section */}
      <div className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">All Major Sports Covered</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <SportCard sport="NFL" emoji="🏈" />
            <SportCard sport="NBA" emoji="🏀" />
            <SportCard sport="MLB" emoji="⚾" />
            <SportCard sport="NHL" emoji="🏒" />
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 text-lg">Start with a free trial, no credit card required</p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-8 border-2 border-green-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </span>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Premium Membership</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">$29</span>
                <span className="text-gray-300">/month</span>
              </div>
              <ul className="space-y-3 mb-8 text-left">
                <PricingFeature text="7-day free trial" />
                <PricingFeature text="Daily DFS picks for all sports" />
                <PricingFeature text="Showdown & Classic lineups" />
                <PricingFeature text="AI-powered analytics" />
                <PricingFeature text="Performance tracking" />
                <PricingFeature text="Premium Discord access" />
                <PricingFeature text="Cancel anytime" />
              </ul>
              <Link
                href="/auth/signup"
                className="block w-full bg-white hover:bg-gray-100 text-green-900 font-bold py-4 px-8 rounded-lg text-lg transition text-center"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Designed by respected DFS player <strong className="text-white">Netminder42</strong>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2024 DK Showdown Expert. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
        className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-green-600 transition-colors h-full"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="text-5xl mb-6"
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  )
}

function SportCard({ sport, emoji }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Link href={`/${sport.toLowerCase()}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          whileHover={{ scale: 1.05, borderColor: 'rgb(34, 197, 94)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 rounded-xl p-8 text-center border border-gray-700 hover:border-green-600 transition-colors cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.3 }}
            className="text-6xl mb-4"
          >
            {emoji}
          </motion.div>
          <h3 className="text-2xl font-bold text-white">{sport}</h3>
        </motion.div>
      </motion.div>
    </Link>
  )
}

function PricingFeature({ text }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center text-green-100"
    >
      <motion.svg
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-5 h-5 mr-3 text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </motion.svg>
      {text}
    </motion.li>
  )
}

