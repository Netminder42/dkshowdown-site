'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-green-500">DK Showdown Expert</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <Link
                href="/"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  isActive('/') ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </Link>
              {session && (
                <>
                  <Link
                    href="/dashboard"
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                      isActive('/dashboard') ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/picks"
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                      pathname?.startsWith('/picks') ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Picks
                  </Link>
                  {session.user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                        pathname?.startsWith('/admin') ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      Admin
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">{session.user.email}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/auth/signin"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Start Free Trial
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
