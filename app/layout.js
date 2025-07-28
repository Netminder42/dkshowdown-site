export const metadata = {
  title: 'DK Showdown Expert',
  description: 'The only platform built for Showdown, Tiers, and Classic DFS Tools — with smart AI features to help you win more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}

