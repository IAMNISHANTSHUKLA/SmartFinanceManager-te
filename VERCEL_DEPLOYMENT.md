# Deploying Smart Finance Manager to Vercel

This guide walks you through deploying the Smart Finance Manager to Vercel with proper environment configuration.

## Step 1: Set Up Neon PostgreSQL Database

1. Go to [neon.tech](https://neon.tech) and sign up for a free account
2. Create a new project (e.g., "finance-manager")
3. Copy your database connection string (looks like: `postgresql://user:password@host/dbname`)
4. Keep this handy for the next steps

## Step 2: Get Groq API Key (Free Tier)

1. Visit [console.groq.com](https://console.groq.com/keys)
2. Sign up for a free Groq account
3. Create a new API key
4. Copy the key (format: `gsk_...`)

## Step 3: Prepare Your Repository

1. Make sure all files are committed to your GitHub repository:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. Ensure your repository includes:
   - All source files
   - `package.json` with all dependencies
   - `.env.example` (example values, NO real secrets)
   - `.gitignore` excluding node_modules and .env

## Step 4: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the prompts to link your project
```

## Step 5: Add Environment Variables in Vercel

After deployment, configure environment variables:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your Neon connection string | From Neon dashboard |
| `JWT_SECRET` | Generate a strong random string | Use: `openssl rand -base64 32` |
| `GROQ_API_KEY` | Your Groq API key | From console.groq.com |
| `NEXT_PUBLIC_API_URL` | `https://your-project.vercel.app` | Replace with actual domain |
| `NODE_ENV` | `production` | Production environment |

**Important**: Make sure to add these to both:
- Development environment
- Production environment

## Step 6: Trigger Redeploy

1. Go to your Vercel project dashboard
2. Click "Deployments"
3. Find your latest deployment
4. Click the three dots → "Redeploy"
5. Wait for the deployment to complete

## Step 7: Test Your Deployment

1. Visit `https://your-project.vercel.app`
2. Create a test account
3. Add some transactions
4. Check if AI insights work (they call the Groq API)

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct from Neon
- Check that your Neon project is active
- Ensure the database tables are created (happens automatically on first API call)

### Groq API Errors
- Verify GROQ_API_KEY is correct
- Check Groq free tier hasn't been exceeded
- Review error logs in Vercel Deployment Logs

### Frontend Can't Reach API
- Verify NEXT_PUBLIC_API_URL is set correctly (include https://)
- Check that API requests use this environment variable
- Review browser console for CORS errors

### Build Failures
- Check Vercel build logs for specific error messages
- Ensure all dependencies are in package.json
- Verify Node version compatibility (v16+)

## Continuous Deployment

Every push to your main branch will automatically trigger a new deployment on Vercel.

To disable auto-deploy:
1. Go to Vercel dashboard
2. Settings → Git
3. Uncheck "Deploy on every push to main"

## Monitoring

Monitor your deployment with:
- **Vercel Analytics**: Built-in performance monitoring
- **Function Logs**: View API request logs at Deployments → Function Logs
- **Database**: Monitor Neon usage at neon.tech dashboard

## Security Best Practices

- Keep API keys secure (store in Vercel environment variables, not in code)
- Rotate JWT_SECRET periodically
- Review Groq usage to prevent unexpected charges
- Enable Vercel's Protected Routes for admin features (future enhancement)

For more help, visit the [Vercel Documentation](https://vercel.com/docs).
