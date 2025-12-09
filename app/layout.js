import SessionProvider from '@/components/SessionProvider'
import AIAssistant from '@/components/AIAssistant'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

export const metadata = {
  title: 'FantasyHubAI - Pro-grade DFS Tools',
  description: 'Build sharper DraftKings and FanDuel lineups with LineupIQ — your AI engine for slate sims, optimizers, and DFS strategy.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <SessionProvider>
          {children}
          <Toaster position="top-right" />
          <AIAssistant />
        </SessionProvider>
      </body>
    </html>
  );
}


