# DK Showdown Expert

A comprehensive DraftKings DFS subscription platform with AI-powered picks, lineup tools, and premium content.

## Features

- **User Authentication**: Secure signup/login with NextAuth.js
- **Subscription Management**: Stripe integration with 7-day free trial
- **Premium Content**: Gated DFS picks for paying subscribers
- **Multi-Sport Coverage**: NFL, NBA, MLB, NHL
- **Lineup Types**: Both Showdown and Classic DFS formats
- **Admin Panel**: Easy-to-use interface for creating and managing picks
- **User Dashboard**: Track subscription status and view picks
- **Responsive Design**: Mobile-friendly Tailwind CSS UI

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Hosting**: Vercel-ready

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see SETUP.md)
4. Initialize database: `npx prisma migrate dev`
5. Run development server: `npm run dev`

## Documentation

See [SETUP.md](./SETUP.md) for detailed setup instructions including:
- Database configuration
- Stripe integration
- Environment variables
- Creating admin users
- Deployment guide

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Auth pages (signin/signup)
│   ├── admin/             # Admin panel
│   ├── dashboard/         # User dashboard
│   └── picks/             # DFS picks pages
├── Components/            # React components
├── lib/                   # Utility functions
│   ├── auth.js           # NextAuth config
│   ├── prisma.js         # Prisma client
│   └── stripe.js         # Stripe client
├── prisma/               # Database schema
└── styles/               # Global styles
```

## License

Proprietary - All rights reserved

## Author

Created by Netminder42
