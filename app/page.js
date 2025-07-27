import React from 'react';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>DK Showdown Expert</h1>
      <p className={styles.subtitle}>
        The only platform built for <strong>Showdown</strong>, <strong>Tiers</strong>, and <strong>Classic</strong> DFS Tools — with smart AI features to help you win more.
      </p>

      <section className={styles.section}>
        <h2>🔥 What We Offer</h2>
        <ul className={styles.list}>
          <li>✅ Daily AI-Enhanced Lineup Picks</li>
          <li>✅ Tools for Showdown, Tiers & Classic</li>
          <li>✅ Historical Player Data & Projections</li>
          <li>✅ Free Teaser Pick of the Day</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>🚀 Coming Soon</h2>
        <ul className={styles.list}>
          <li>⭐ Interactive AI Assistant for Premium Members</li>
          <li>⭐ DFS Pick Scorecard Tracker</li>
          <li>⭐ Weather & Vegas Line-Based Projections</li>
          <li>⭐ Premium Discord Access</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        Designed by respected DFS player <strong>Netminder42</strong>
      </footer>
    </main>
  );
}

