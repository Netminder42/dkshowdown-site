export const metadata = {
  title: 'DK Showdown Expert',
  description: 'AI-powered tools for Showdown, Tiers, and Classic DFS players.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        {children}
      </body>
    </html>
  );
}

