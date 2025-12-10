'use client'

import { useState, useEffect, useCallback } from 'react'
import NavigationNew from '@/components/NavigationNew'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { SparklesIcon, ChartBarIcon, TrophyIcon, CogIcon, BeakerIcon, BoltIcon, ChartPieIcon, RocketLaunchIcon, PlayIcon, ChevronLeftIcon, ChevronRightIcon, FireIcon, ClockIcon, NewspaperIcon, VideoCameraIcon, LightBulbIcon, AcademicCapIcon, CpuChipIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
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

// Rankings data for sidebar widget
const rankingsData = {
  QB: [
    { rank: 1, name: "Patrick Mahomes", team: "KC", proj: 24.6, salary: 7800 },
    { rank: 2, name: "Josh Allen", team: "BUF", proj: 23.8, salary: 7600 },
    { rank: 3, name: "Jalen Hurts", team: "PHI", proj: 22.4, salary: 7400 },
    { rank: 4, name: "Lamar Jackson", team: "BAL", proj: 21.9, salary: 7200 },
    { rank: 5, name: "Joe Burrow", team: "CIN", proj: 21.2, salary: 6800 },
    { rank: 6, name: "Justin Herbert", team: "LAC", proj: 20.5, salary: 6600 },
    { rank: 7, name: "Dak Prescott", team: "DAL", proj: 20.1, salary: 6400 },
    { rank: 8, name: "Tua Tagovailoa", team: "MIA", proj: 19.8, salary: 6200 },
    { rank: 9, name: "Trevor Lawrence", team: "JAX", proj: 19.2, salary: 6000 },
    { rank: 10, name: "Geno Smith", team: "SEA", proj: 18.6, salary: 5800 },
  ],
  RB: [
    { rank: 1, name: "Christian McCaffrey", team: "SF", proj: 22.4, salary: 9200 },
    { rank: 2, name: "Austin Ekeler", team: "LAC", proj: 20.8, salary: 8600 },
    { rank: 3, name: "Bijan Robinson", team: "ATL", proj: 19.6, salary: 8200 },
    { rank: 4, name: "Saquon Barkley", team: "NYG", proj: 18.9, salary: 7800 },
    { rank: 5, name: "Josh Jacobs", team: "LV", proj: 18.2, salary: 7400 },
    { rank: 6, name: "Nick Chubb", team: "CLE", proj: 17.8, salary: 7200 },
    { rank: 7, name: "Tony Pollard", team: "DAL", proj: 17.2, salary: 6800 },
    { rank: 8, name: "Kenneth Walker", team: "SEA", proj: 16.5, salary: 6400 },
    { rank: 9, name: "Derrick Henry", team: "TEN", proj: 16.1, salary: 6200 },
    { rank: 10, name: "Najee Harris", team: "PIT", proj: 15.4, salary: 5800 },
  ],
  WR: [
    { rank: 1, name: "Tyreek Hill", team: "MIA", proj: 18.6, salary: 8800 },
    { rank: 2, name: "Justin Jefferson", team: "MIN", proj: 17.9, salary: 8400 },
    { rank: 3, name: "CeeDee Lamb", team: "DAL", proj: 17.2, salary: 8200 },
    { rank: 4, name: "Ja'Marr Chase", team: "CIN", proj: 16.8, salary: 8000 },
    { rank: 5, name: "Stefon Diggs", team: "BUF", proj: 16.2, salary: 7600 },
    { rank: 6, name: "A.J. Brown", team: "PHI", proj: 15.9, salary: 7400 },
    { rank: 7, name: "Amon-Ra St. Brown", team: "DET", proj: 15.4, salary: 7200 },
    { rank: 8, name: "Davante Adams", team: "LV", proj: 15.1, salary: 7000 },
    { rank: 9, name: "DK Metcalf", team: "SEA", proj: 14.6, salary: 6600 },
    { rank: 10, name: "DeVonta Smith", team: "PHI", proj: 14.2, salary: 6400 },
  ],
  TE: [
    { rank: 1, name: "Travis Kelce", team: "KC", proj: 14.8, salary: 7200 },
    { rank: 2, name: "Mark Andrews", team: "BAL", proj: 13.6, salary: 6600 },
    { rank: 3, name: "T.J. Hockenson", team: "MIN", proj: 12.4, salary: 6000 },
    { rank: 4, name: "George Kittle", team: "SF", proj: 11.9, salary: 5600 },
    { rank: 5, name: "Dallas Goedert", team: "PHI", proj: 11.2, salary: 5200 },
    { rank: 6, name: "Evan Engram", team: "JAX", proj: 10.8, salary: 4800 },
    { rank: 7, name: "Kyle Pitts", team: "ATL", proj: 10.4, salary: 4600 },
    { rank: 8, name: "Darren Waller", team: "NYG", proj: 10.1, salary: 4400 },
    { rank: 9, name: "Pat Freiermuth", team: "PIT", proj: 9.6, salary: 4200 },
    { rank: 10, name: "Cole Kmet", team: "CHI", proj: 9.2, salary: 4000 },
  ],
  DEF: [
    { rank: 1, name: "San Francisco", team: "SF", proj: 11.2, salary: 4200 },
    { rank: 2, name: "Buffalo", team: "BUF", proj: 10.8, salary: 4000 },
    { rank: 3, name: "Dallas", team: "DAL", proj: 10.4, salary: 3800 },
    { rank: 4, name: "New England", team: "NE", proj: 9.9, salary: 3600 },
    { rank: 5, name: "Baltimore", team: "BAL", proj: 9.6, salary: 3400 },
    { rank: 6, name: "Cleveland", team: "CLE", proj: 9.2, salary: 3200 },
    { rank: 7, name: "Pittsburgh", team: "PIT", proj: 8.8, salary: 3000 },
    { rank: 8, name: "Philadelphia", team: "PHI", proj: 8.4, salary: 2800 },
    { rank: 9, name: "Kansas City", team: "KC", proj: 8.1, salary: 2600 },
    { rank: 10, name: "Miami", team: "MIA", proj: 7.8, salary: 2400 },
  ],
}

// Tools Quick Access data
const toolsQuickAccess = [
  { name: "Sim Engine", icon: CpuChipIcon, color: "#3B82F6", href: "/tools/sim-engine" },
  { name: "Optimizer", icon: SparklesIcon, color: "#10B981", href: "/tools/optimizer" },
  { name: "Projections", icon: ChartPieIcon, color: "#8B5CF6", href: "/tools/projections" },
  { name: "Boom/Bust", icon: BoltIcon, color: "#F59E0B", href: "/tools/boom-bust" },
  { name: "Lineup Builder", icon: CogIcon, color: "#EF4444", href: "/tools/lineup-builder" },
  { name: "Player Research", icon: MagnifyingGlassIcon, color: "#EC4899", href: "/tools/research" },
  { name: "Ownership", icon: ChartBarIcon, color: "#14B8A6", href: "/tools/ownership" },
  { name: "Strategy Guides", icon: AcademicCapIcon, color: "#F97316", href: "/strategy" },
]

// Trending News data
const trendingNews = [
  { title: "Mahomes upgraded to full practice", time: "12m ago", tag: "NFL", tagColor: "#3B82F6" },
  { title: "Tatum ruled out for tonight's game", time: "28m ago", tag: "NBA", tagColor: "#EF4444" },
  { title: "Dodgers announce surprise starter", time: "45m ago", tag: "MLB", tagColor: "#10B981" },
  { title: "Weather alert: winds 15+ mph in KC", time: "1h ago", tag: "NFL", tagColor: "#3B82F6" },
  { title: "Breaking: Trade sends star to Lakers", time: "2h ago", tag: "NBA", tagColor: "#EF4444" },
]

// DFS Content Feed data
const dfsContentFeed = [
  {
    sport: "NBA",
    sportColor: "#EF4444",
    title: "Brunson's Usage Spike Makes Him a Top Play Tonight",
    teaser: "With Barrett out, Brunson's usage rate jumps to 32% — elite value at $8.9k.",
    author: "Jake Turner",
    time: "15m ago",
    image: "https://picsum.photos/seed/brunson-feed/120/120"
  },
  {
    sport: "NFL",
    sportColor: "#3B82F6",
    title: "Why the Chiefs-Bills Stack Is Tournament Gold",
    title: "Chiefs-Bills game environment screams GPP leverage with 52.5 total.",
    author: "Tom Reynolds",
    time: "32m ago",
    image: "https://picsum.photos/seed/chiefs-bills/120/120"
  },
  {
    sport: "MLB",
    sportColor: "#10B981",
    title: "Pitcher Rankings Update: Tonight's Strikeout Leaders",
    teaser: "Cole and Cease both project for 8+ Ks in elite matchups tonight.",
    author: "Maria Vasquez",
    time: "48m ago",
    image: "https://picsum.photos/seed/pitcher/120/120"
  },
  {
    sport: "NBA",
    sportColor: "#EF4444",
    title: "Luka's Ceiling Play Against Phoenix's 28th-Ranked Defense",
    teaser: "Phoenix allows the most fantasy points to opposing point guards.",
    author: "Jake Turner",
    time: "1h ago",
    image: "https://picsum.photos/seed/luka-feed/120/120"
  },
  {
    sport: "NFL",
    sportColor: "#3B82F6",
    title: "McCaffrey Questionable: Pivot Strategy for Sunday",
    teaser: "If CMC sits, Mitchell becomes a must-play at just $5.2k salary.",
    author: "Tom Reynolds",
    time: "1h ago",
    image: "https://picsum.photos/seed/mccaffrey/120/120"
  },
  {
    sport: "MLB",
    sportColor: "#10B981",
    title: "Coors Field Stacks: The Math Behind the Hype",
    teaser: "Rockies game totals 12+ runs — here's how to attack it smartly.",
    author: "Maria Vasquez",
    time: "2h ago",
    image: "https://picsum.photos/seed/coors/120/120"
  },
  {
    sport: "NBA",
    sportColor: "#EF4444",
    title: "Value Plays Under $5k That No One Is Talking About",
    teaser: "Three sub-$5k players with 6x upside in tonight's slate.",
    author: "Jake Turner",
    time: "3h ago",
    image: "https://picsum.photos/seed/value-nba/120/120"
  },
  {
    sport: "NFL",
    sportColor: "#3B82F6",
    title: "Kelce's Target Share Regression Creates Leverage Opportunity",
    teaser: "Despite lower ownership, Kelce's usage trend points to a bounce-back week.",
    author: "Tom Reynolds",
    time: "4h ago",
    image: "https://picsum.photos/seed/kelce-feed/120/120"
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
  const [activeRankingsTab, setActiveRankingsTab] = useState('QB')

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

      {/* HERO SECTION - Enhanced */}
      <section className="relative overflow-hidden w-full" style={{ minHeight: '620px' }}>
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
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.30), rgba(0,0,0,0.45))',
              }}
            />
          </div>
        ))}

        <div className="relative z-10 w-full py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-6xl lg:text-8xl font-extrabold text-white leading-tight mb-7">
                Pro-grade DFS tools. <br />
                No PhD required.
              </h1>
              <p className="text-xl lg:text-2xl text-white mb-9 leading-relaxed">
                Build sharper DraftKings and FanDuel lineups with LineupIQ — your AI engine for slate sims, optimizers, and DFS strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 35px rgba(0, 200, 83, 0.50)',
                      '0 0 45px rgba(0, 200, 83, 0.65)',
                      '0 0 35px rgba(0, 200, 83, 0.50)',
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block"
                >
                  <Link
                    href="/auth/signup"
                    className="inline-block bg-[#00C853] hover:bg-[#00B248] text-white font-bold px-9 py-5 rounded-lg text-center transition shadow-lg text-lg"
                  >
                    Start 3-Day Free Trial
                  </Link>
                </motion.div>
                <Link
                  href="#featured-articles"
                  className="inline-block bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-9 py-5 rounded-lg text-center transition border-2 border-white/50 text-lg"
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

      {/* MAIN GRID LAYOUT - 70/30 Split */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

          {/* LEFT/CENTER COLUMN (70%) */}
          <div className="space-y-20">

            {/* SECTION A - FEATURED ARTICLES CAROUSEL - Enhanced */}
            <section id="featured-articles" className="bg-white rounded-2xl p-8 shadow-sm">
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
                    <motion.div
                      key={idx}
                      className="flex-none w-full md:w-1/2 lg:w-1/3 rounded-xl overflow-hidden"
                      style={{
                        background: 'white',
                        boxShadow: `
                          0 6px 18px rgba(0,0,0,0.14),
                          0 0 28px rgba(255,106,0,0.55)
                        `,
                      }}
                      whileHover={{
                        scale: 1.03,
                        rotateY: 2,
                        rotateX: -2,
                        boxShadow: `
                          0 8px 24px rgba(0,0,0,0.18),
                          0 0 35px rgba(255,106,0,0.65)
                        `
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                        <div className="mb-3">
                          <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                            style={{ background: '#FF6A00' }}
                          >
                            STRATEGY
                          </span>
                        </div>
                        <h3 className="text-xl font-extrabold text-[#1E3A8A] mb-3">{article.title}</h3>
                        <p className="text-sm text-gray-600 font-medium">
                          {article.author} · {article.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION B - DFS TOOLS - Enhanced */}
            <section>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-12 text-center">
                DFS Tools
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dfsTools.map((tool, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-xl overflow-hidden"
                    style={{
                      background: 'white',
                      boxShadow: `
                        0 0 45px ${tool.color}55,
                        0 10px 28px rgba(0,0,0,0.10)
                      `,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 45px ${tool.color}55, 0 10px 28px rgba(0,0,0,0.10)`,
                        `0 0 55px ${tool.color}65, 0 14px 34px rgba(0,0,0,0.14)`,
                        `0 0 45px ${tool.color}55, 0 10px 28px rgba(0,0,0,0.10)`,
                      ]
                    }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="h-2" style={{ background: tool.color, height: '8px' }} />
                    <div className="p-8">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <tool.icon className="h-16 w-16 mb-6" style={{ color: tool.color }} />
                      </motion.div>
                      <h3 className="text-2xl font-extrabold text-[#1E3A8A] mb-4">{tool.title}</h3>
                      <p className="text-gray-700 leading-relaxed font-medium text-base">{tool.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SECTION C - TODAY'S DFS PICKS - Enhanced (Bigger & More Heroic) */}
            <section>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-12 text-center">
                Today's DFS Picks
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dfsPicks.map((pick, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-2xl p-10"
                    style={{
                      background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
                      boxShadow: `
                        0 8px 22px rgba(0,0,0,0.18),
                        0 0 35px rgba(20,184,166,0.60)
                      `,
                    }}
                    animate={{
                      boxShadow: [
                        `0 8px 22px rgba(0,0,0,0.18), 0 0 35px rgba(20,184,166,0.60)`,
                        `0 10px 28px rgba(0,0,0,0.22), 0 0 45px rgba(20,184,166,0.70)`,
                        `0 8px 22px rgba(0,0,0,0.18), 0 0 35px rgba(20,184,166,0.60)`,
                      ]
                    }}
                    whileHover={{ scale: 1.04, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-5 border-4 border-white shadow-xl">
                        <img src={pick.image} alt={pick.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-white mb-2">{pick.name}</h3>
                      <p className="text-base text-white/90 font-bold mb-1">{pick.team} · {pick.position}</p>
                      <p className="text-sm text-white/80 mb-8">{pick.matchup}</p>

                      <div className="w-full space-y-4 bg-white/15 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between text-white">
                          <span className="text-base font-semibold">Projection:</span>
                          <span className="text-2xl font-extrabold">
                            <AnimatedCounter value={pick.projection} />
                          </span>
                        </div>
                        <div className="flex justify-between text-white">
                          <span className="text-base font-semibold">Salary:</span>
                          <span className="text-2xl font-extrabold">
                            $<AnimatedCounter value={pick.salary} />
                          </span>
                        </div>
                        <div className="flex justify-between text-white">
                          <span className="text-base font-semibold">Value:</span>
                          <span className="text-2xl font-extrabold">
                            <AnimatedCounter value={pick.value} />x
                          </span>
                        </div>
                        <div className="flex justify-between text-white">
                          <span className="text-base font-semibold">Ownership:</span>
                          <span className="text-2xl font-extrabold">
                            <AnimatedCounter value={pick.ownership} />%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* NEW SECTION - DFS CONTENT FEED */}
            <section>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-12">
                DFS Picks & Strategy Feed
              </h2>

              <div className="space-y-4">
                {dfsContentFeed.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white rounded-xl p-5 flex gap-5"
                    style={{
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                    whileHover={{
                      boxShadow: '0 6px 18px rgba(0,0,0,0.14)',
                      x: 4,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <span
                          className="inline-block px-2 py-1 rounded text-xs font-bold text-white"
                          style={{ background: item.sportColor }}
                        >
                          {item.sport}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-[#1E3A8A] mb-2 leading-tight">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.teaser}</p>
                      <p className="text-xs text-gray-500 font-medium">
                        {item.author} · {item.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SECTION D - MEET THE PROS - Enhanced */}
            <section>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-12 text-center">
                Meet the Pros
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {analysts.map((analyst, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-xl p-8 text-center relative"
                    style={{
                      background: 'white',
                      boxShadow: `
                        0 0 35px rgba(16,185,129,0.45),
                        0 10px 25px rgba(0,0,0,0.08)
                      `,
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `
                        0 0 40px rgba(16,185,129,0.55),
                        0 12px 30px rgba(0,0,0,0.12)
                      `
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {idx === 0 && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-[#F59E0B] text-white text-xs font-bold rounded-full shadow-md">
                          LEAD ANALYST
                        </span>
                      </div>
                    )}
                    <motion.div
                      className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[#10B981]"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img src={analyst.image} alt={analyst.name} className="w-full h-full object-cover" />
                    </motion.div>
                    <h3 className="text-2xl font-extrabold text-[#1E3A8A] mb-2">{analyst.name}</h3>
                    <p className="text-sm font-bold text-[#10B981] mb-4">{analyst.role}</p>
                    <p className="text-gray-700 leading-relaxed font-medium">{analyst.bio}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SECTION E - DFS STRATEGY VAULT - Enhanced */}
            <section>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-12 text-center">
                DFS Strategy Vault
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {strategyVault.map((strategy, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-xl p-8 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #C2834E 100%)',
                      boxShadow: `
                        0 0 35px rgba(245,158,11,0.45),
                        0 10px 25px rgba(0,0,0,0.08)
                      `,
                    }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                        PLAYBOOK
                      </span>
                    </div>
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white/90 shadow-lg">
                        <strategy.icon className="h-8 w-8 text-[#F59E0B]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold text-white mb-3">{strategy.title}</h3>
                    <p className="text-white/90 leading-relaxed font-medium">{strategy.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SECTION F - LATEST STRATEGY - Enhanced */}
            <section>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[#1E3A8A] mb-12 text-center">
                Latest Strategy
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Large Video Card */}
                <motion.div
                  className="rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    background: 'white',
                    boxShadow: `
                      0 0 40px rgba(139,92,246,0.45),
                      0 10px 25px rgba(0,0,0,0.12)
                    `,
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-video overflow-hidden group">
                    <img
                      src="https://picsum.photos/seed/video1/800/450"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.75) 0%, rgba(59,130,246,0.70) 100%)'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-24 h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl"
                        animate={{
                          boxShadow: [
                            '0 0 20px rgba(139,92,246,0.50)',
                            '0 0 30px rgba(139,92,246,0.70)',
                            '0 0 20px rgba(139,92,246,0.50)',
                          ]
                        }}
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <PlayIcon className="h-12 w-12 text-[#8B5CF6] ml-1" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-extrabold text-[#1E3A8A] mb-2">
                      Tonight's NBA Slate Breakdown — Top 5 Edges to Exploit
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">Jake Turner · 30 minutes ago</p>
                  </div>
                </motion.div>

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
                    <motion.div
                      key={idx}
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: 'white',
                        boxShadow: `
                          0 0 30px ${article.color}45,
                          0 10px 25px rgba(0,0,0,0.08)
                        `,
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
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
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

          </div>
          {/* END LEFT/CENTER COLUMN */}

          {/* RIGHT SIDEBAR (30%) */}
          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">

            {/* WIDGET 1 - RANKINGS */}
            <div className="bg-white rounded-xl p-6 shadow-lg" style={{
              background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
            }}>
              <h3 className="text-2xl font-extrabold text-white mb-6">Rankings</h3>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {Object.keys(rankingsData).map((position) => (
                  <button
                    key={position}
                    onClick={() => setActiveRankingsTab(position)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                      activeRankingsTab === position
                        ? 'bg-white text-[#1E3A8A]'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {position}
                  </button>
                ))}
              </div>

              {/* Rankings List */}
              <div className="space-y-3">
                {rankingsData[activeRankingsTab].map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-white font-extrabold text-sm">{player.rank}</span>
                      </div>
                      <div>
                        <p className="text-white font-extrabold text-sm">{player.name}</p>
                        <p className="text-white/70 text-xs font-medium">{player.team} · ${player.salary}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-extrabold text-sm">{player.proj}</p>
                      <p className="text-white/70 text-xs">PROJ</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 2 - TOOLS QUICK ACCESS */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-extrabold text-[#1E3A8A] mb-6">Quick Access</h3>

              <div className="space-y-3">
                {toolsQuickAccess.map((tool, idx) => (
                  <Link
                    key={idx}
                    href={tool.href}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition group"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition"
                      style={{ background: tool.color }}
                    >
                      <tool.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-gray-800 font-bold text-sm group-hover:text-[#1E3A8A]">{tool.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* WIDGET 3 - TRENDING NEWS */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <FireIcon className="h-6 w-6 text-[#EF4444]" />
                <h3 className="text-2xl font-extrabold text-[#1E3A8A]">Trending</h3>
              </div>

              <div className="space-y-4">
                {trendingNews.map((news, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-start gap-3">
                      <ClockIcon className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-gray-800 font-bold text-sm leading-tight mb-2">{news.title}</p>
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block px-2 py-1 rounded text-xs font-bold text-white"
                            style={{ background: news.tagColor }}
                          >
                            {news.tag}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">{news.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
          {/* END SIDEBAR */}

        </div>
        {/* END MAIN GRID */}
      </div>

      {/* FREE TRIAL BLOCK - Full Width */}
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

          <motion.div
            className="inline-block"
            animate={{
              boxShadow: [
                '0 0 35px rgba(0, 200, 83, 0.50)',
                '0 0 45px rgba(0, 200, 83, 0.65)',
                '0 0 35px rgba(0, 200, 83, 0.50)',
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link
              href="/auth/signup"
              className="inline-block bg-[#00C853] hover:bg-[#00B248] text-white font-bold px-14 py-5 rounded-lg text-lg"
              style={{
                boxShadow: '0 12px 30px rgba(0, 200, 83, 0.50)'
              }}
            >
              Start 3-Day Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
