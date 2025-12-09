import React from 'react';

const ToolsShowcase = () => {
  return (
    <section style={{ backgroundColor: '#1e1e2f', color: '#fff', padding: '2rem', borderRadius: '10px', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🚀 Lineup Tools We Offer</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: '1.8' }}>
        <li>🔍 AI-Powered Pick Engine for DK & FD</li>
        <li>📊 DFS Lineup Optimizer</li>
        <li>📚 Historical Data-Driven Projections</li>
        <li>🎯 Stack & Correlation Insights</li>
        <li>🌦️ Weather + Vegas Odds Adjustments</li>
        <li>🧠 Smart AI Assistant (Coming Soon!)</li>
      </ul>
    </section>
  );
};

export default ToolsShowcase;
