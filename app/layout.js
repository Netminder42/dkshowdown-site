export const metadata = {
  title: 'DK Showdown Expert',
  description: 'Daily DraftKings showdown, tiers, and classic lineup help.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#f5f5f5" }}>
        <header style={{ background: "#234F1E", color: "#fff", padding: "1rem" }}>
          <h2>DK Showdown Expert</h2>
        </header>
        {children}
      </body>
    </html>
  );
}
