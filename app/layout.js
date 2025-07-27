// app/layout.js

import '../styles/globals.css';

export const metadata = {
  title: 'RosterBrain – AI DFS Lineup Tools for DraftKings & FanDuel',
  description: 'The only platform offering Classic, Showdown & Tiers picks daily. AI-powered, data-driven, and built by a real player.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}

