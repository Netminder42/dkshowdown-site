// app/layout.js

import './globals.css';

export const metadata = {
  title: 'DK Showdown Expert',
  description: 'AI-powered tools for Showdown, Tiers, and Classic DFS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}

