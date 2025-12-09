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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-[#00C853] hover:bg-[#00B248] text-white p-4 rounded-full shadow-xl border-2 border-white group"
            aria-label="Open LineupIQ Assistant"
          >
            <SparklesIcon className="h-7 w-7" />

            {/* Hover Label */}
            <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
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
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200"
          >
            {/* Header */}
            <div className="bg-[#1E3A8A] px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg flex items-center">
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  LineupIQ Assistant
                </h3>
                <p className="text-blue-200 text-xs mt-1">
                  Your DFS guide. Live AI coming soon.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 p-2 rounded-lg transition"
                aria-label="Close"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Static Message */}
              <div className="bg-[#E0F2FE] rounded-lg p-4 border border-[#7DD3FC]">
                <p className="text-gray-700 text-sm leading-relaxed">
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
                    className="block w-full text-left px-4 py-3 bg-white hover:bg-[#E0F2FE] text-gray-700 hover:text-[#1E3A8A] border border-gray-200 hover:border-[#7DD3FC] rounded-lg transition text-sm font-medium"
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
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
