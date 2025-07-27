// app/premium/page.js

import PremiumTools from '../../components/PremiumTools';

export default function PremiumPage() {
  return (
    <main className="premium">
      <h1>Welcome, Premium Member!</h1>
      <p>Thank you for subscribing to RosterBrain.</p>
      <PremiumTools />
    </main>
  );
}
