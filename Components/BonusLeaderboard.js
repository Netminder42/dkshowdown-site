// components/BonusLeaderboard.js

export default function BonusLeaderboard() {
  const leaders = [
    { name: 'Netminder42', wins: 124 },
    { name: 'SharpDFS', wins: 109 },
    { name: 'TiltProof', wins: 97 },
    { name: 'BankrollBoss', wins: 90 },
  ];

  return (
    <section className="leaderboard">
      <h2>🏆 Bonus Pick Leaderboard</h2>
      <ol>
        {leaders.map((user, idx) => (
          <li key={idx}>
            {user.name} — {user.wins} wins
          </li>
        ))}
      </ol>
    </section>
  );
}
