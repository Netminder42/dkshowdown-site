export default function Home() {
  return (
    <div className="homepage">
      <header className="navbar">
        <div className="logo">DK Showdown Expert</div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/premium">Premium</a></li>
            <li><a href="#">Tools</a></li>
            <li><a href="#">Picks</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>
      </header>

      <main className="hero">
        <h1>The only platform built for Showdown, Tiers, and Classic DFS Tools</h1>
        <p>With smart AI features to help you win more.</p>
        <a className="cta" href="/premium">Become a Premium Member</a>
      </main>

      <section className="features">
        <h2>🔥 What We Offer</h2>
        <ul>
          <li>✅ Daily AI-Enhanced Lineup Picks</li>
          <li>✅ Tools for Showdown, Tiers & Classic</li>
          <li>✅ Historical Player Data & Projections</li>
          <li>✅ Free Teaser Pick of the Day</li>
        </ul>

        <h2>🚀 Coming Soon</h2>
        <ul>
          <li>⭐ Interactive AI Assistant for Premium Members</li>
          <li>⭐ DFS Pick Scorecard Tracker</li>
          <li>⭐ Weather & Vegas Line-Based Projections</li>
          <li>⭐ Premium Discord Access</li>
        </ul>
      </section>

      <footer className="footer">
        <p>Designed by respected DFS player <strong>Netminder42</strong></p>
      </footer>
    </div>
  );
}

