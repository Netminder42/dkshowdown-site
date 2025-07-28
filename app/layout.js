export const metadata = {
  title: 'DK Showdown Expert',
  description: 'The only DFS site with AI-powered tools for Showdown, Tiers, and Classic',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}


