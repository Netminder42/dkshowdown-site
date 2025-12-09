# Vercel Deployment Fix Guide

## Problem
Vercel's webhook is hardlocked to deploying commit `826332e` (broken) instead of `8b261c3` (fixed).

## Solution Options

### Option 1: Manual Deployment (Recommended)
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: `dkshowdown-site`
3. Click on **Deployments** tab
4. Click the **"Redeploy"** button on the most recent deployment
5. **IMPORTANT**: Click the three dots menu (⋮) and select **"Deploy with different commit"**
6. Select commit: `8b261c3` or later from the dropdown
7. Click **Deploy**

### Option 2: Deploy from Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Force deploy from current directory
vercel --prod --force
```

### Option 3: Change Branch in Vercel Settings
1. Go to Vercel dashboard → Project Settings
2. Navigate to **Git** section
3. Under **Production Branch**, temporarily change to a different branch
4. Save changes
5. Change it back to `claude/draftkings-betting-subscription-016ftauezKutkxhqLS5h9Lyf`
6. This forces Vercel to refresh its webhook connection

### Option 4: Create New Deployment from Main Branch
```bash
# Create a new main branch with the fixes
git checkout -b main
git push -u origin main

# Then in Vercel dashboard, change production branch to 'main'
```

## What's Fixed in Latest Commit (8b261c3)

All deployment errors have been resolved:
- ✅ Added `export const dynamic = 'force-dynamic'` to all API routes
- ✅ Wrapped `useSearchParams()` in Suspense boundary
- ✅ Fixed all import case sensitivity issues
- ✅ Added proper Vercel build configuration
- ✅ Configured Next.js for dynamic rendering

## Environment Variables Needed

Once deployment succeeds, add these in Vercel dashboard:

```
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## Verification

After deployment, the build should succeed with:
- Prisma client generated
- All routes statically or dynamically rendered correctly
- No Suspense boundary errors
- No static generation errors
