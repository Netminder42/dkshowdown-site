import React from 'react';

export default function HomeContent() {
  return (
    <div style={{
      padding: '2rem',
      background: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a' }}>
        DK Showdown Expert
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#444' }}>
        The only platform built specifically for <strong>Showdown, Tiers, and Classic DFS tools</strong> — enhanced with smart AI features to help you win more.
      </p>

      <h2 style={{ color: '#2b6cb0' }}>🔥 What We Offer</h2>
      <ul>
        <li>✅ Daily AI-Enhanced Lineup Picks</li>
        <li>✅ Tools for Showdown, Tiers & Classic</li>
        <li>✅ Historical Player Data & Projections</li>
        <li>✅ Free Teaser Pick of the Day</li>
      </ul>

      <h2 style={{ marginTop: '2rem', color: '#2b6cb0' }}>🚀 Coming Soon</h2>
      <ul>
        <li>⭐ Interactive AI Assistant for Premium Members</li>
        <li>⭐ DFS Pick Scorecard Tracker</li>
        <li>⭐ Weather & Vegas Line-Based Projections</li>
        <li>⭐ Premium Discord Access</li>
      </ul>

      <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#666' }}>
        Designed by respected DFS player <strong>Netminder42</strong>
      </p>
    </div>
  );
}
