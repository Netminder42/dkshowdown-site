// app/layout.js
export const metadata = {
  title: 'DK Showdown Expert',
  description: 'The only DFS site with AI-powered tools for Showdown, Tiers, and Classic',
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


