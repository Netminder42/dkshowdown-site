// app/page.js

import HomeContent from '../components/HomeContent';
import FreePickTeaser from '../components/FreePickTeaser';
import BonusLeaderboard from '../components/BonusLeaderboard';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main>
      <HomeContent />
      <FreePickTeaser />
      <BonusLeaderboard />
      <Footer />
    </main>
  );
}

