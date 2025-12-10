'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  const quickActions = [
    { label: "Show me today's slate", href: "/#todays-slate" },
    { label: "What tools do I get?", href: "/#todays-slate" },
    { label: "How LineupIQ works", href: "/#todays-slate" },
    { label: "Start my free trial", href: "/auth/signup" },
  ]

  return (
    <>
      {/* Floating Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed z-50 bg-[#00C853] hover:bg-[#00B248] text-white p-5 rounded-full border-2 border-white group"
            style={{
              bottom: '20px',
              right: '20px',
              boxShadow: '0 8px 18px rgba(0, 200, 83, 0.30)',
            }}
            aria-label="Open LineupIQ Assistant"
          >
            <SparklesIcon className="h-7 w-7" />

            {/* Hover Label */}
            <span className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-lg">
              LineupIQ Assistant
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-50 w-[420px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-gray-200"
            style={{
              bottom: '20px',
              right: '20px',
              boxShadow: '0 15px 40px rgba(15, 23, 42, 0.20)',
            }}
          >
            {/* Header */}
            <div className="bg-[#1E3A8A] px-6 py-5 rounded-t-2xl flex items-center justify-between">
              <div>
                <h3 className="text-white font-extrabold text-lg flex items-center">
                  <SparklesIcon className="h-6 w-6 mr-2" />
                  LineupIQ Assistant
                </h3>
                <p className="text-blue-200 text-xs mt-1 font-medium">
                  Your DFS guide. Live AI coming soon.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Static Message */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: 'radial-gradient(circle at center, #D8E9FF 0%, #AFCBFF 90%)',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)'
                }}
              >
                <p className="text-[#111827] text-sm leading-relaxed font-medium">
                  I'll help you choose slates, run sims, and build sharper lineups once the backend is connected.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="space-y-2">
                {quickActions.map((action, idx) => (
                  <Link
                    key={idx}
                    href={action.href}
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-left px-4 py-3 bg-[#F9FAFB] hover:bg-[#E0F2FE] text-gray-700 hover:text-[#1E3A8A] border border-gray-200 hover:border-[#7DD3FC] rounded-lg transition-all text-sm font-semibold"
                  >
                    {action.label}
                  </Link>
                ))}
              </div>

              {/* Optional Input (Non-Functional) */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="AI responses coming soon."
                  disabled
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-400 cursor-not-allowed font-medium"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
