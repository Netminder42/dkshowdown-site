'use client'

import { useState, useEffect, useCallback } from 'react'
import NavigationNew from '@/components/NavigationNew'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { SparklesIcon, ChartBarIcon, TrophyIcon, CogIcon, BeakerIcon, BoltIcon, ChartPieIcon, RocketLaunchIcon, PlayIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

// Hero slides configuration
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

// Featured Articles data
const featuredArticles = [
  {
    title: "Top NBA Targets for Tonight's Slate",
    author: "Jake Turner",
    timestamp: "2 hours ago",
    image: "https://picsum.photos/seed/nba1/800/450"
  },
  {
    title: "Why This MLB Pitcher Is a Must-Play",
    author: "Maria Vasquez",
    timestamp: "4 hours ago",
    image: "https://picsum.photos/seed/mlb1/800/450"
  },
  {
    title: "NFL Week 4 Game Stacks: Where the Edge Lives",
    author: "Tom Reynolds",
    timestamp: "5 hours ago",
    image: "https://picsum.photos/seed/nfl2/800/450"
  },
  {
    title: "3 DFS Mistakes Everyone Still Makes",
    author: "Jake Turner",
    timestamp: "1 day ago",
    image: "https://picsum.photos/seed/dfs1/800/450"
  },
  {
    title: "This Slate's Most Underpriced Superstar",
    author: "Maria Vasquez",
    timestamp: "1 day ago",
    image: "https://picsum.photos/seed/nba2/800/450"
  },
]

// DFS Tools data
const dfsTools = [
  {
    title: "Sim Engine",
    description: "Run thousands of slate simulations to identify edge.",
    color: "#3B82F6",
    icon: BeakerIcon
  },
  {
    title: "Boom/Bust",
    description: "See upside vs. floor for every player on the slate.",
    color: "#22C55E",
    icon: BoltIcon
  },
  {
    title: "Projections",
    description: "Access our expert-built projections instantly.",
    color: "#8B5CF6",
    icon: ChartPieIcon
  },
  {
    title: "Quick Sim",
    description: "Get fast sim results for last-minute pivots.",
    color: "#F97316",
    icon: RocketLaunchIcon
  },
]

// DFS Picks data
const dfsPicks = [
  {
    name: "Jalen Brunson",
    team: "Knicks",
    matchup: "vs Bulls",
    position: "PG",
    projection: 48.2,
    salary: 8900,
    value: 5.4,
    ownership: 28,
    image: "https://picsum.photos/seed/brunson/200/200"
  },
  {
    name: "Shohei Ohtani",
    team: "Angels",
    matchup: "vs Mariners",
    position: "DH",
    projection: 12.8,
    salary: 5500,
    value: 2.3,
    ownership: 18,
    image: "https://picsum.photos/seed/ohtani/200/200"
  },
  {
    name: "Patrick Mahomes",
    team: "Chiefs",
    matchup: "vs Bills",
    position: "QB",
    projection: 24.6,
    salary: 7800,
    value: 3.2,
    ownership: 35,
    image: "https://picsum.photos/seed/mahomes/200/200"
  },
  {
    name: "Luka Dončić",
    team: "Mavs",
    matchup: "vs Suns",
    position: "PG",
    projection: 52.1,
    salary: 11200,
    value: 4.7,
    ownership: 42,
    image: "https://picsum.photos/seed/luka/200/200"
  },
]

// Analysts data
const analysts = [
  {
    name: "Jake Turner",
    role: "GPP Specialist",
    bio: "DFS specialist in NFL/MLB/NBA slates.",
    image: "https://picsum.photos/seed/jake/200/200"
  },
  {
    name: "Maria Vasquez",
    role: "Cash Game Analyst",
    bio: "Expert in consistent lineup building.",
    image: "https://picsum.photos/seed/maria/200/200"
  },
  {
    name: "Tom Reynolds",
    role: "MLB Advanced Metrics",
    bio: "Data-driven MLB DFS strategist.",
    image: "https://picsum.photos/seed/tom/200/200"
  },
]

// Strategy Vault data
const strategyVault = [
  {
    title: "Bankroll Strategy that Actually Works",
    description: "Master sustainable DFS bankroll management.",
    icon: ChartBarIcon
  },
  {
    title: "GPP Leverage 101",
    description: "Learn how to gain leverage in tournaments.",
    icon: TrophyIcon
  },
  {
    title: "Slate Selection for DFS Pros",
    description: "Choose the right slates for your edge.",
    icon: SparklesIcon
  },
]

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return <span ref={ref}>{count}</span>
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  // Embla carousel controls
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    // Auto-scroll carousel
    const autoScroll = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }, 6000)

    return () => {
      clearInterval(autoScroll)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <NavigationNew />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden w-full" style={{ minHeight: '600px' }}>
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
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.40))',
              }}
            />
          </div>
        ))}

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
                  href="#featured-articles"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg text-center transition border-2 border-white/50"
                >
                  View Featured Articles
                </Link>
              </div>
            </div>
          </div>
        </div>

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

      {/* SECTION A - FEATURED ARTICLES CAROUSEL */}
      <section id="featured-articles" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A]">Featured Articles</h2>
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="p-3 rounded-full bg-[#1E3A8A] text-white hover:bg-[#2D4A9A] disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Previous"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="p-3 rounded-full bg-[#1E3A8A] text-white hover:bg-[#2D4A9A] disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Next"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {featuredArticles.map((article, idx) => (
                <div
                  key={idx}
                  className="flex-none w-full md:w-1/2 lg:w-1/3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'white',
                    boxShadow: `
                      0 0 30px rgba(255,159,67,0.15),
                      0 10px 25px rgba(0,0,0,0.12)
                    `,
                  }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: '#FF9F43' }}
                      >
                        STRATEGY
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-[#1E3A8A] mb-3">{article.title}</h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {article.author} · {article.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B - DFS TOOLS */}
      <section className="py-24" style={{ background: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-16 text-center">
            DFS Tools
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dfsTools.map((tool, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'white',
                  boxShadow: `
                    0 0 40px ${tool.color}45,
                    0 10px 25px rgba(0,0,0,0.08)
                  `,
                }}
                animate={{
                  boxShadow: [
                    `0 0 40px ${tool.color}45, 0 10px 25px rgba(0,0,0,0.08)`,
                    `0 0 50px ${tool.color}55, 0 12px 30px rgba(0,0,0,0.12)`,
                    `0 0 40px ${tool.color}45, 0 10px 25px rgba(0,0,0,0.08)`,
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="h-2" style={{ background: tool.color }} />
                <div className="p-8">
                  <tool.icon className="h-14 w-14 mb-5" style={{ color: tool.color }} />
                  <h3 className="text-xl font-extrabold text-[#1E3A8A] mb-3">{tool.title}</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">{tool.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION C - TODAY'S DFS PICKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-16 text-center">
            Today's DFS Picks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {dfsPicks.map((pick, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
                  boxShadow: `
                    0 0 35px rgba(20,184,166,0.35),
                    0 10px 25px rgba(0,0,0,0.12)
                  `,
                }}
                whileHover={{ y: -8 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white">
                    <img src={pick.image} alt={pick.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white mb-1">{pick.name}</h3>
                  <p className="text-sm text-white/80 font-semibold mb-1">{pick.team} · {pick.position}</p>
                  <p className="text-sm text-white/70 mb-6">{pick.matchup}</p>

                  <div className="w-full space-y-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex justify-between text-white">
                      <span className="text-sm font-medium">Projection:</span>
                      <span className="text-lg font-extrabold">
                        <AnimatedCounter value={pick.projection} />
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-sm font-medium">Salary:</span>
                      <span className="text-lg font-extrabold">
                        $<AnimatedCounter value={pick.salary} />
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-sm font-medium">Value:</span>
                      <span className="text-lg font-extrabold">
                        <AnimatedCounter value={pick.value} />x
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-sm font-medium">Ownership:</span>
                      <span className="text-lg font-extrabold">
                        <AnimatedCounter value={pick.ownership} />%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D - MEET THE PROS */}
      <section className="py-24" style={{ background: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-16 text-center">
            Meet the Pros
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {analysts.map((analyst, idx) => (
              <div
                key={idx}
                className="rounded-xl p-8 text-center transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'white',
                  boxShadow: `
                    0 0 35px rgba(16,185,129,0.25),
                    0 10px 25px rgba(0,0,0,0.08)
                  `,
                }}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[#10B981]">
                  <img src={analyst.image} alt={analyst.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1E3A8A] mb-2">{analyst.name}</h3>
                <p className="text-sm font-bold text-[#10B981] mb-4">{analyst.role}</p>
                <p className="text-gray-700 leading-relaxed font-medium">{analyst.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E - DFS STRATEGY VAULT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-16 text-center">
            DFS Strategy Vault
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategyVault.map((strategy, idx) => (
              <div
                key={idx}
                className="rounded-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2"
                style={{
                  background: 'white',
                  boxShadow: `
                    0 0 35px rgba(245,158,11,0.35),
                    0 10px 25px rgba(0,0,0,0.08)
                  `,
                }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: '#F59E0B' }}>
                    <strategy.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-extrabold text-[#1E3A8A] mb-3">{strategy.title}</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{strategy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION F - LATEST STRATEGY */}
      <section className="py-24" style={{ background: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-16 text-center">
            Latest Strategy
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Large Video Card */}
            <div
              className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'white',
                boxShadow: `
                  0 0 40px rgba(139,92,246,0.35),
                  0 10px 25px rgba(0,0,0,0.12)
                `,
              }}
            >
              <div className="relative aspect-video overflow-hidden bg-gray-900 group">
                <img
                  src="https://picsum.photos/seed/video1/800/450"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition">
                    <PlayIcon className="h-10 w-10 text-[#8B5CF6] ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-extrabold text-[#1E3A8A] mb-2">
                  Tonight's NBA Slate Breakdown — Top 5 Edges to Exploit
                </h3>
                <p className="text-sm text-gray-600 font-medium">Jake Turner · 30 minutes ago</p>
              </div>
            </div>

            {/* Two Stacked Article Cards */}
            <div className="space-y-6">
              {[
                {
                  title: "MLB Pitcher Analysis: Tonight's Top Strikeout Targets",
                  author: "Tom Reynolds",
                  time: "1 hour ago",
                  image: "https://picsum.photos/seed/mlb2/400/225",
                  color: "#EF4444"
                },
                {
                  title: "NFL DFS Stacking Strategy for Week 4",
                  author: "Jake Turner",
                  time: "2 hours ago",
                  image: "https://picsum.photos/seed/nfl3/400/225",
                  color: "#8B5CF6"
                },
              ].map((article, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'white',
                    boxShadow: `
                      0 0 30px ${article.color}35,
                      0 10px 25px rgba(0,0,0,0.08)
                    `,
                  }}
                >
                  <div className="flex">
                    <div className="w-40 flex-shrink-0">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-extrabold text-[#1E3A8A] mb-2">{article.title}</h3>
                      <p className="text-xs text-gray-600 font-medium">{article.author} · {article.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREE TRIAL BLOCK */}
      <section className="py-32" style={{ background: '#F3F7FF' }}>
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

      <Footer />
    </div>
  )
}
