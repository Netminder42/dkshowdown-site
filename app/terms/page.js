'use client'

import Navigation from '@/components/Navigation'
import { motion } from 'framer-motion'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using DK Showdown Expert, you accept and agree to be bound by the terms and provision
                  of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">2. Description of Service</h2>
                <p>
                  DK Showdown Expert provides daily fantasy sports (DFS) picks, lineup advice, and analytical tools for
                  DraftKings contests. Our service includes both free and premium subscription tiers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">3. Subscription Terms</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>New users receive a 7-day free trial of premium features</li>
                  <li>After the trial, your subscription will automatically renew monthly</li>
                  <li>You can cancel your subscription at any time</li>
                  <li>Refunds are not provided for partial subscription periods</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">4. User Responsibilities</h2>
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Not share your account with others</li>
                  <li>Use the service in compliance with all applicable laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">5. Disclaimer</h2>
                <p>
                  Our picks and advice are for informational and entertainment purposes only. We do not guarantee winnings
                  or specific results. Daily fantasy sports involves risk, and you should only play with money you can afford to lose.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
                <p>
                  DK Showdown Expert shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages resulting from your use of the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">7. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. We will notify you of any changes by posting the
                  new terms on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-3">8. Contact Information</h2>
                <p>
                  For questions about these Terms of Service, contact us at:
                  <br />
                  <a href="mailto:legal@dkshowdown.com" className="text-green-400 hover:text-green-300">
                    legal@dkshowdown.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
