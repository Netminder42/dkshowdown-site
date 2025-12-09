'use client'

import NavigationNew from '@/components/NavigationNew'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { SparklesIcon, ChartBarIcon, TrophyIcon, CogIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <NavigationNew />

      {/* Hero Section - NFL Action Background */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2000&auto=format&fit=crop')`,
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Pro-grade DFS tools. <br />
                No PhD required.
              </h1>
              <p className="text-xl text-white/95 mb-8 leading-relaxed">
                Build sharper DraftKings and FanDuel lineups with LineupIQ — your AI engine for slate sims, optimizers, and DFS strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/signup"
                  className="bg-[#00C853] hover:bg-[#00B248] text-white font-semibold px-8 py-4 rounded-lg text-center transition shadow-lg"
                >
                  Start 3-Day Free Trial
                </Link>
                <Link
                  href="#todays-slate"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg text-center transition border-2 border-white/50"
                >
                  View Today's Slate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Slate Strip */}
      <section id="todays-slate" className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8">Today's Slate</h2>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {[
                { teams: "NYY @ BOS", time: "7:05 PM ET", tag: "Main Slate", sport: "mlb" },
                { teams: "LAD @ SF", time: "7:15 PM ET", tag: "Main Slate", sport: "mlb" },
                { teams: "CHC @ STL", time: "7:45 PM ET", tag: "Main Slate", sport: "mlb" },
                { teams: "HOU @ TEX", time: "8:05 PM ET", tag: "Evening", sport: "mlb" },
                { teams: "SEA @ OAK", time: "9:40 PM ET", tag: "Late", sport: "mlb" },
              ].map((game, idx) => (
                <Link
                  key={idx}
                  href={`/${game.sport}`}
                  className="relative rounded-lg p-6 transition min-w-[240px] hover:-translate-y-1"
                  style={{
                    background: 'radial-gradient(circle at center, #D8E9FF 0%, #AFCBFF 90%)',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
                  }}
                >
                  <div className="text-sm font-medium text-[#1E3A8A] mb-2">{game.tag}</div>
                  <div className="text-lg font-bold text-[#111827] mb-1">{game.teams}</div>
                  <div className="text-sm text-gray-700">{game.time}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">
              Built for serious DFS players.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: SparklesIcon,
                title: "LineupIQ Sim Engine",
                description: "Run slate simulations to identify top matchups and player upside."
              },
              {
                icon: CogIcon,
                title: "Optimizer",
                description: "Build DFS lineups fast with exposures, stacks, and rule-based control."
              },
              {
                icon: TrophyIcon,
                title: "ROI Tracking",
                description: "See what's working across slates and optimize your style of play."
              },
              {
                icon: ChartBarIcon,
                title: "Guided Workflow",
                description: "No optimizer experience required — we walk you through every slate."
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl p-8 transition hover:shadow-xl hover:-translate-y-1"
                style={{
                  background: 'radial-gradient(circle at center, #D8E9FF 0%, #AFCBFF 90%)',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
                }}
              >
                <feature.icon className="h-12 w-12 text-[#1E3A8A] mb-4" />
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-3">{feature.title}</h3>
                <p className="text-[#111827] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Trial Block */}
      <section
        className="py-24 border-t border-gray-100"
        style={{
          background: 'linear-gradient(to bottom, rgba(216, 233, 255, 0.3), rgba(249, 250, 251, 1))'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">
            Start your 3-day free trial.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Credit card required. Cancel anytime before your trial ends.
          </p>

          <div
            className="rounded-xl p-8 mb-8 text-left max-w-2xl mx-auto"
            style={{
              background: 'radial-gradient(circle at center, #D8E9FF 0%, #AFCBFF 90%)',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.1)'
            }}
          >
            <ul className="space-y-3">
              {[
                "Access to all core tools",
                "LineupIQ simulations and optimizer",
                "Save and review your lineups"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#00C853] mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#111827] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/auth/signup"
            className="inline-block bg-[#00C853] hover:bg-[#00B248] text-white font-semibold px-12 py-4 rounded-lg transition shadow-lg text-lg"
          >
            Start 3-Day Free Trial
          </Link>
        </div>
      </section>

      {/* Articles Preview Section */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#1E3A8A] mb-12 text-center">
            Learn while you play.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Understanding DFS Slate Types",
                description: "Learn the differences between main, showdown, and turbo slates."
              },
              {
                title: "Stacking Strategies That Win",
                description: "Master the art of correlating players for maximum upside."
              },
              {
                title: "Bankroll Management 101",
                description: "Protect your funds and play DFS sustainably long-term."
              }
            ].map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 transition hover:shadow-xl hover:-translate-y-1"
                style={{
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)'
                }}
              >
                <div className="mb-4">
                  <span
                    className="inline-block text-[#1E3A8A] text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at center, #D8E9FF 0%, #AFCBFF 90%)'
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">{article.title}</h3>
                <p className="text-gray-600">{article.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
