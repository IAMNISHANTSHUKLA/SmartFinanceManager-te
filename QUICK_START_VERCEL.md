# Quick Start: Deploy to Vercel in 5 Minutes

## Prerequisites
- GitHub account with your repo pushed
- Groq account (free at console.groq.com)
- Neon account (free at neon.tech)

## Step 1: Get API Keys (2 minutes)

### Groq API Key
1. Visit https://console.groq.com/keys
2. Sign up or log in
3. Click "Create API Key"
4. Copy the key (looks like: `gsk_...`)

### Neon Database URL
1. Visit https://neon.tech
2. Sign up or log in
3. Create a new project
4. Copy the connection string from "Connection string" tab
5. Format: `postgresql://user:password@host/dbname`

## Step 2: Deploy to Vercel (2 minutes)

1. Go to https://vercel.com and sign in
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Leave defaults (Framework: Next.js)
5. Click "Deploy"
6. Wait 2-3 minutes for deployment

## Step 3: Add Environment Variables (1 minute)

After deployment completes:

1. Click on your project in Vercel dashboard
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Neon connection string |
| `GROQ_API_KEY` | Your Groq API key |
| `JWT_SECRET` | Generate: `openssl rand -base64 32` |
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_API_URL` | `https://your-project.vercel.app` |

**Important**: Replace `your-project.vercel.app` with your actual Vercel domain

4. Click "Save"
5. Click "Redeploy" on the latest deployment

## Done! 🎉

Your app is now live at `https://your-project.vercel.app`

### Test It
1. Open your Vercel URL
2. Sign up for an account
3. Add a transaction
4. Check Dashboard for AI insights

## Troubleshooting

**"Database connection failed"**
- Copy your Neon URL exactly (including credentials)
- Test connection in Neon dashboard first

**"AI insights not working"**
- Verify GROQ_API_KEY is correct in Vercel
- Check Groq console for API quota
- Restart deployment

**"Frontend can't reach API"**
- Make sure NEXT_PUBLIC_API_URL is set to your Vercel domain with https://
- Should look like: `https://my-project.vercel.app`

## Next Steps

- Read [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed guide
- Check [GROQ_SETUP.md](./GROQ_SETUP.md) for AI integration details
- Review [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) for local testing

## Costs

**Completely Free** ✨
- Vercel: Free tier for frontends
- Neon: Free tier PostgreSQL database
- Groq: Free tier AI (30 requests/day)

No credit card required to start!
