// app/page.js

export default function HomePage() {
  return (
    <main className="homepage-container">
      <header className="hero-header">
        <h1>RosterBrain</h1>
        <p>The only DFS platform featuring Showdown, Tiers, and Classic lineups — powered by AI.</p>
        <a className="cta-button" href="/premium">Subscribe Now</a>
      </header>

      <section className="features-grid">
        <div className="feature-tile">
          <h3>🧠 AI-Driven Tools</h3>
          <p>Lineup generators, projections, and matchups — tailored to your preferences.</p>
        </div>
        <div className="feature-tile">
          <h3>🏆 Showdown & Tiers Edge</h3>
          <p>We built this for single-game grinders. Get the insights no one else offers.</p>
        </div>
        <div className="feature-tile">
          <h3>📊 Data That Wins</h3>
          <p>Historic performance trends, split stats, and Vegas lines — visualized for clarity.</p>
        </div>
      </section>

      <section className="teaser-picks">
        <h2>Today's Featured Picks (Preview)</h2>
        <ul>
          <li>MLB: Shohei Ohtani – Captain (Showdown)</li>
          <li>NFL: Josh Allen – Elite Stack (Tiers)</li>
          <li>EPL: Haaland – Goal + Shots Bonus</li>
        </ul>
        <a href="/premium" className="cta-button-secondary">Unlock All Picks</a>
      </section>
    </main>
  );
}
