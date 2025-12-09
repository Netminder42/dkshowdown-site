'use client'

import Link from 'next/link'

export default function Footer() {
  const footerLinks = [
    { href: '/about', label: 'About' },
    { href: '/terms', label: 'Terms' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-[#1E3A8A] transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Brand line */}
          <div className="text-sm text-gray-500">
            Powered by <span className="font-semibold text-[#1E3A8A]">LineupIQ™</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
