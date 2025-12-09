# DK Showdown Expert - Setup Guide

This guide will help you complete the setup of your DraftKings DFS subscription website.

## Features Implemented

✅ User authentication (signup, login, sessions)
✅ Stripe subscription integration with 7-day free trial
✅ Premium content gating
✅ Admin panel for creating picks
✅ User dashboard with subscription management
✅ DFS picks pages for NFL, NBA, MLB, NHL
✅ Showdown and Classic lineup support
✅ Responsive UI with Tailwind CSS

## Setup Steps

### 1. Database Setup

This application uses PostgreSQL with Prisma ORM.

#### Option A: Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a new database:
   ```bash
   createdb dkshowdown
   ```

#### Option B: Hosted Database (Recommended)

Use a hosted PostgreSQL service like:
- **Supabase** (free tier available): https://supabase.com
- **Railway** (free tier available): https://railway.app
- **Neon** (free tier available): https://neon.tech

### 2. Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Fill in your environment variables in `.env`:

   ```env
   # Database - Get from your PostgreSQL provider
   DATABASE_URL="postgresql://user:password@host:5432/database"

   # NextAuth - Generate a random secret
   NEXTAUTH_SECRET="run: openssl rand -base64 32"
   NEXTAUTH_URL="http://localhost:3000"

   # Stripe - Get from https://dashboard.stripe.com/apikeys
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."  # Get after setting up webhook
   STRIPE_PRICE_ID="price_..."  # Create a subscription product first

   # Optional
   DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
   ADMIN_EMAIL="your-email@example.com"
   ```

### 3. Stripe Setup

1. **Create a Stripe Account**: https://dashboard.stripe.com/register

2. **Create a Product**:
   - Go to Products → Add Product
   - Name: "DK Showdown Expert Premium"
   - Set pricing to $29/month (recurring)
   - Copy the Price ID and add it to `STRIPE_PRICE_ID` in `.env`

3. **Set up Webhook**:
   - Go to Developers → Webhooks → Add endpoint
   - Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
   - For local testing, use Stripe CLI:
     ```bash
     stripe listen --forward-to localhost:3000/api/stripe/webhook
     ```
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 4. Initialize Database

Run Prisma migrations to create the database tables:

```bash
npx prisma migrate dev --name init
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 5. Create Admin User

You'll need to create an admin user manually in the database. After running migrations:

```bash
npx prisma studio
```

This opens a web interface. Create a user with:
- email: your email
- password: (hashed password - see note below)
- role: "admin"

**To hash a password**, run this in Node.js console:
```javascript
const bcrypt = require('bcrypt');
bcrypt.hash('your-password', 10).then(hash => console.log(hash));
```

Or use the signup page first, then update the user's role to "admin" in Prisma Studio.

### 6. Run the Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Usage Guide

### Admin Functions

1. **Login as Admin**: Use your admin credentials at `/auth/signin`
2. **Create Picks**: Navigate to `/admin`
3. **Fill out the pick form**:
   - Select sport (NFL, NBA, MLB, NHL)
   - Select game type (Showdown or Classic)
   - Add game info (e.g., "NYK @ BOS")
   - Enter players as JSON:
     ```json
     [
       {
         "name": "Stephen Curry",
         "position": "PG",
         "salary": 10500,
         "projection": 52.3
       }
     ]
     ```
   - For Showdown, add captain name
   - Set confidence level
   - Mark as premium and/or published

### User Flow

1. Users sign up at `/auth/signup`
2. Get 7-day free trial automatically
3. Browse picks at `/picks`
4. View dashboard at `/dashboard`
5. After trial, subscribe via Stripe checkout

## Testing Stripe

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

## Deployment

### Recommended Platforms

1. **Vercel** (recommended for Next.js):
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Railway**:
   - Connect your GitHub repo
   - Add environment variables
   - Deploy automatically

3. **Netlify**:
   - Connect GitHub repo
   - Set build command: `npm run build`
   - Set environment variables

### Important for Production

1. Set `NEXTAUTH_URL` to your production domain
2. Use production Stripe keys
3. Set up proper Stripe webhook endpoint
4. Enable Stripe customer portal for subscription management
5. Consider adding:
   - Email notifications (SendGrid, Postmark)
   - Analytics (Google Analytics, Plausible)
   - Error tracking (Sentry)

## Next Steps (Optional Features)

The following features are not yet implemented but can be added:

- [ ] DFS lineup optimizer tool
- [ ] Email notifications for new picks
- [ ] Discord integration
- [ ] Advanced analytics dashboard
- [ ] Pick performance tracking with actual results
- [ ] Social sharing features
- [ ] Mobile app (React Native)

## Support

For issues or questions:
- Check the database connection
- Verify environment variables
- Check browser console for errors
- Review Next.js server logs

## Database Schema

The database includes tables for:
- **User**: User accounts and roles
- **Subscription**: Stripe subscription data
- **Pick**: DFS picks and lineups
- **PickTracking**: User interaction with picks
- **Analytics**: Performance metrics

View/edit schema in `prisma/schema.prisma`

## Security Notes

- Never commit `.env` file to git
- Use strong `NEXTAUTH_SECRET`
- Keep Stripe secret keys secure
- Validate all user inputs on the backend
- Use HTTPS in production
- Enable CORS properly
- Implement rate limiting for API routes

## License

Proprietary - All rights reserved
