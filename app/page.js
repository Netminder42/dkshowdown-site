'use client'

import { useState, useEffect } from 'react'
import NavigationNew from '@/components/NavigationNew'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { SparklesIcon, ChartBarIcon, TrophyIcon, CogIcon } from '@heroicons/react/24/outline'

// Hero slides configuration
// TODO: Replace with actual NFL action images in /public/images/
const heroSlides = [
  {
    imageSrc: 'https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg?auto=compress&cs=tinysrgb&w=2000',
    alt: 'American football stadium with players on field',
  },
  {
    imageSrc: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=2000',
    alt: 'Football game action on field',
  },
  {
    imageSrc: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=2000',
    alt: 'Football stadium at night with bright lights',
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 7000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <NavigationNew />

      {/* Hero Section - NFL Image Rotation */}
      <section className="relative overflow-hidden w-full" style={{ minHeight: '600px' }}>
        {/* Hero Background Images with Cross-Fade */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: currentSlide === index ? 1 : 0,
              backgroundImage: `url('${slide.imageSrc}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            aria-hidden={currentSlide !== index}
          >
            {/* Dark Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.50))',
              }}
            />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 w-full py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                Pro-grade DFS tools. <br />
                No PhD required.
              </h1>
              <p className="text-xl lg:text-2xl text-white mb-8 leading-relaxed">
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

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                backgroundColor: currentSlide === index ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Today's Slate Strip */}
      <section id="todays-slate" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-10">Today's Slate</h2>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {[
                { teams: "NYY @ BOS", time: "7:05 PM", tag: "Main Slate", sport: "mlb" },
                { teams: "LAD @ SF", time: "7:15 PM", tag: "Main Slate", sport: "mlb" },
                { teams: "CHC @ STL", time: "7:45 PM", tag: "Main Slate", sport: "mlb" },
                { teams: "HOU @ TEX", time: "8:05 PM", tag: "Evening", sport: "mlb" },
                { teams: "SEA @ OAK", time: "9:40 PM", tag: "Late", sport: "mlb" },
              ].map((game, idx) => (
                <Link
                  key={idx}
                  href={`/${game.sport}`}
                  className="relative rounded-xl p-6 transition-all duration-300 min-w-[260px] hover:scale-[1.01]"
                  style={{
                    background: 'radial-gradient(circle at center, #D8E9FF 0%, #AFCBFF 90%)',
                    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(15, 23, 42, 0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.08)'
                  }}
                >
                  <div className="text-sm font-semibold text-[#1E3A8A] mb-3">{game.tag}</div>
                  <div className="text-xl font-bold text-[#111827] mb-2">{game.teams}</div>
                  <div className="text-sm text-gray-600 font-medium">
                    {game.time} <span className="text-gray-500">ET</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24" style={{ background: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-4">
              Built for serious DFS players.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="rounded-xl p-8 transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: 'radial-gradient(circle at center, #D8E9FF 0%, #AFCBFF 90%)',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(15, 23, 42, 0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.08)'
                }}
              >
                <feature.icon className="h-14 w-14 text-[#1E3A8A] mb-5" />
                <h3 className="text-xl font-extrabold text-[#1E3A8A] mb-3">{feature.title}</h3>
                <p className="text-[#111827] leading-relaxed font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Trial Block */}
      <section
        className="py-32"
        style={{
          background: '#F3F7FF'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-6">
            Start your 3-day free trial.
          </h2>
          <p className="text-lg text-gray-600 mb-12 font-medium">
            Credit card required. Cancel anytime before your trial ends.
          </p>

          <div
            className="rounded-xl p-10 mb-10 text-left max-w-2xl mx-auto"
            style={{
              background: 'radial-gradient(circle at center, #D8E9FF 0%, #AFCBFF 90%)',
              boxShadow: '0 10px 25px rgba(15, 23, 42, 0.10)'
            }}
          >
            <ul className="space-y-4">
              {[
                "Access to all core tools",
                "LineupIQ simulations and optimizer",
                "Save and review your lineups"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="w-7 h-7 text-[#00C853] mr-4 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[#111827] font-semibold text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/auth/signup"
            className="inline-block bg-[#00C853] hover:bg-[#00B248] text-white font-bold px-14 py-5 rounded-lg transition-all duration-300 text-lg"
            style={{
              boxShadow: '0 12px 30px rgba(0, 200, 83, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 200, 83, 0.35)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 200, 83, 0.25)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Start 3-Day Free Trial
          </Link>
        </div>
      </section>

      {/* Articles Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-16 text-center">
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
                className="rounded-xl p-8 transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: 'linear-gradient(135deg, #F9FAFB 0%, #EEF5FF 100%)',
                  border: '1px solid #D8E9FF',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(15, 23, 42, 0.10)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.06)'
                }}
              >
                <div className="mb-5">
                  <span
                    className="inline-block text-[#1E3A8A] text-xs font-bold px-4 py-2 rounded-full border-2 border-[#1E3A8A]"
                    style={{
                      background: 'radial-gradient(circle at center, #D8E9FF 0%, #AFCBFF 90%)'
                    }}
                  >
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#1E3A8A] mb-3">{article.title}</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{article.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
