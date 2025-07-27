// components/HomeContent.js

import Link from 'next/link';

export default function HomeContent() {
  return (
    <section className="home-content">
      <h1>Welcome to RosterBrain</h1>
      <p>The only AI-powered DFS platform focused on Classic, Showdown & Tiers — for both DraftKings and FanDuel.</p>
      
      <ul>
        <li>✅ Daily Lineup Picks for All Formats</li>
        <li>✅ Personalized Tools & Matchup Insights</li>
        <li>✅ Advanced Stats, Game Stacks & Weather Risk</li>
        <li>✅ Performance Tracking & Pick Scorecard</li>
      </ul>

      <p>Start your winning streak today.</p>

      <Link href="/premium">
        <button className="cta-button">Go Premium</button>
      </Link>
    </section>
  );
}
