'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function NavigationNew() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => pathname === path

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/nfl', label: 'NFL' },
    { href: '/mlb', label: 'MLB' },
    { href: '/nba', label: 'NBA' },
    { href: '/tools', label: 'Tools' },
    { href: '/articles', label: 'Articles' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-bold text-[#1E3A8A]">
              FantasyHubAI
            </span>
            <span className="text-xs text-gray-500">
              Powered by LineupIQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all relative group ${
                  isActive(link.href)
                    ? 'text-[#1E3A8A]'
                    : 'text-gray-600 hover:text-[#1E3A8A]'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-[#00C853] transition-all ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-[#1E3A8A] transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-gray-600 hover:text-[#1E3A8A] transition"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-gray-600 hover:text-[#1E3A8A] transition"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-[#00C853] hover:bg-[#00B248] text-white font-semibold px-6 py-2 rounded-lg transition"
                >
                  Start Free Trial
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-[#1E3A8A]"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-base font-medium py-2 ${
                  isActive(link.href)
                    ? 'text-[#1E3A8A]'
                    : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-3 space-y-3">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-base font-medium text-gray-600 py-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left text-base font-medium text-gray-600 py-2"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="block text-base font-medium text-gray-600 py-2"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block bg-[#00C853] hover:bg-[#00B248] text-white font-semibold px-6 py-3 rounded-lg text-center transition"
                  >
                    Start Free Trial
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
