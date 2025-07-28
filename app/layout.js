export const metadata = {
  title: 'DK Showdown Expert',
  description: 'AI-powered DFS picks and tools for Showdown, Tiers, and Classic formats.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}

