'use client'

import Navigation from '@/Components/Navigation'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Master DraftKings DFS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The only platform built specifically for Showdown and Classic DFS with AI-powered picks and tools
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/auth/signup"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition"
              >
                Start Free 7-Day Trial
              </Link>
              <Link
                href="/picks"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition border border-gray-700"
              >
                View Picks
              </Link>
            </div>
            <p className="text-gray-400 mt-4 text-sm">No credit card required</p>
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
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-600 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function SportCard({ sport, emoji }) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 text-center border border-gray-700 hover:border-green-600 transition">
      <div className="text-5xl mb-3">{emoji}</div>
      <h3 className="text-xl font-bold text-white">{sport}</h3>
    </div>
  )
}

function PricingFeature({ text }) {
  return (
    <li className="flex items-center text-green-100">
      <svg className="w-5 h-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  )
}

