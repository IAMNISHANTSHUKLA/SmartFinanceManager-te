# Complete Setup Instructions

Follow these steps in order to get your Smart Finance Manager running.

## 🎯 Overview

This is a **full-stack SaaS application** with:
- **Frontend**: Next.js deployed on Vercel
- **Backend**: Express API
- **Database**: PostgreSQL on Neon
- **AI**: Groq (open source Mixtral model)

You'll need accounts on 3 free services:

\`\`\`
┌─────────────────────────────────────────────────┐
│           VERCEL (Frontend)                      │
│  ✅ Free tier - perfect for starting            │
└────────────────────┬────────────────────────────┘
                     │
                     ↓ (API calls)
┌─────────────────────────────────────────────────┐
│           EXPRESS (Backend/API)                  │
│  ✅ Runs on Vercel serverless functions         │
└────────────────────┬────────────────────────────┘
                     │
                     ↓ (SQL queries)
┌─────────────────────────────────────────────────┐
│           NEON (PostgreSQL Database)             │
│  ✅ Free tier - 1 project, 3GB storage          │
└────────────────────┬────────────────────────────┘
                     │
                     ↓ (Returns insights)
┌─────────────────────────────────────────────────┐
│           GROQ (AI - Mixtral 8x7B)              │
│  ✅ Free tier - 30 requests/day                 │
└─────────────────────────────────────────────────┘
\`\`\`

## 📋 Prerequisites

Before starting, you should have:
- [ ] GitHub account (free at github.com)
- [ ] Node.js 18+ installed locally
- [ ] Code editor (VS Code recommended)

## 🚀 Step-by-Step Setup

### Phase 1: Prepare Your Code (5 minutes)

1. **Fork or Clone Repository**
\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd smart-finance-manager

# Install dependencies
npm install
\`\`\`

2. **Create Local Environment File**
\`\`\`bash
# Copy example to local
cp .env.example .env.local

# Edit .env.local with your local values:
# DATABASE_URL=postgresql://localhost/finance_db
# GROQ_API_KEY=gsk_placeholder_for_now
# JWT_SECRET=dev-secret-123
\`\`\`

3. **Test Locally (Optional)**
\`\`\`bash
# Terminal 1 - Start backend
npm run server:dev

# Terminal 2 - Start frontend
npm run dev

# Visit http://localhost:3000
\`\`\`

### Phase 2: Create Free Accounts (10 minutes)

**Option A: Neon Database**
1. Go to https://neon.tech
2. Sign up with email or GitHub
3. Create project (e.g., "finance-manager")
4. Copy connection string
5. Save it - you'll need it later ✅

**Option B: Groq AI API**
1. Go to https://console.groq.com
2. Sign up with email or GitHub
3. Navigate to "API Keys"
4. Click "Create API Key"
5. Copy the key (format: `gsk_...`)
6. Save it - you'll need it later ✅

**Option C: GitHub (if not done yet)**
1. Push your code to GitHub
2. Must be a public repository
3. Note the repository URL ✅

### Phase 3: Deploy to Vercel (5 minutes)

1. **Connect to Vercel**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Select your repository
   - Framework: **Next.js**
   - Click "Deploy"
   - Wait 2-3 minutes ⏳

2. **Note Your Domain**
   - After deployment, you'll see: `https://smart-finance-XXXX.vercel.app`
   - Save this URL - you'll need it next ✅

### Phase 4: Set Environment Variables (3 minutes)

1. **In Vercel Dashboard**
   - Click your project
   - Go to **Settings** → **Environment Variables**

2. **Add These Variables**
   \`\`\`
   DATABASE_URL = <your-neon-connection-string>
   GROQ_API_KEY = <your-groq-api-key>
   JWT_SECRET = <generate-random-string>
   NODE_ENV = production
   NEXT_PUBLIC_API_URL = https://smart-finance-XXXX.vercel.app
   \`\`\`

   **How to generate JWT_SECRET:**
   \`\`\`bash
   # On Mac/Linux:
   openssl rand -base64 32

   # On Windows:
   # Use an online generator: https://generate-random.org/base64-generator
   \`\`\`

3. **Save Variables**
   - Click "Save"
   - You might see a warning about needing a git commit
   - That's okay, continue

### Phase 5: Redeploy with Variables (2 minutes)

1. **Go to Deployments tab**
2. **Click on your latest deployment**
3. **Click menu (three dots) → "Redeploy"**
4. **Wait for redeployment to finish** ⏳
5. **Visit your live URL** 🎉

## ✅ Verification Checklist

After deployment, test these features:

\`\`\`
□ Can open application at Vercel URL
□ Can create new account (Register page works)
□ Can login with created account
□ Can add a transaction (Dashboard page)
□ Dashboard shows the transaction
□ AI Insights card shows spending insights
□ Can view transaction list
□ Can view category summary
\`\`\`

If any checkbox fails, see **Troubleshooting** below.

## 🔧 Troubleshooting

### "Database connection failed"
\`\`\`
Problem: API can't connect to Neon
Solution:
  1. Copy Neon URL exactly from dashboard
  2. Verify it starts with: postgresql://
  3. Verify no extra spaces in DATABASE_URL
  4. Try: psql <your-connection-string>
\`\`\`

### "AI Insights not working"
\`\`\`
Problem: Insights card shows error
Solution:
  1. Check GROQ_API_KEY in Vercel variables
  2. Verify key starts with: gsk_
  3. Check Groq console quota (30 req/day free)
  4. Click "Redeploy" in Vercel
\`\`\`

### "Can't reach API from frontend"
\`\`\`
Problem: Loading spinner forever on Dashboard
Solution:
  1. Check NEXT_PUBLIC_API_URL includes https://
  2. Should be: https://your-project.vercel.app
  3. NO trailing slash
  4. Check browser console for CORS errors
\`\`\`

### "Vercel build failed"
\`\`\`
Problem: Red error during deployment
Solution:
  1. Click "Deployments" in Vercel
  2. Find failed deployment
  3. Click it and scroll to build logs
  4. Look for specific error message
  5. Common: missing env var or syntax error
  6. Fix and push to main branch
\`\`\`

### "Getting rate limited on Groq"
\`\`\`
Problem: "Rate limit exceeded" error after some requests
Solution:
  1. Free tier: 30 requests/day
  2. If exceeded, wait 24 hours
  3. Or upgrade at console.groq.com
  4. Most users won't hit limit with typical usage
\`\`\`

## 📊 What Should Work

After successful setup, you can:

✅ **Register & Login**
- Create new account with email/password
- Login with credentials
- JWT token stored securely

✅ **Manage Transactions**
- Add income transactions
- Add expense transactions
- Assign to categories
- View transaction list

✅ **Dashboard & Analytics**
- See total income/expense
- Monthly summary
- Category breakdown
- Charts and visualizations

✅ **AI Insights**
- Get automatic spending insights
- Powered by open-source Mixtral model
- 2-3 actionable recommendations

## 🎓 Learning Resources

Want to understand the code better?

1. **Architecture**: Read `ARCHITECTURE.md`
2. **Backend Setup**: Read `LOCAL_DEVELOPMENT.md`
3. **Vercel Deploy**: Read `VERCEL_DEPLOYMENT.md`
4. **AI Integration**: Read `GROQ_SETUP.md`

## 💰 Cost Analysis

\`\`\`
Vercel (Frontend)      → FREE
Neon (Database)        → FREE (up to 3GB)
Groq (AI)              → FREE (up to 30 requests/day)
GitHub (Code hosting)  → FREE

Total cost: $0 per month ✨
\`\`\`

Even with high usage:
- 100+ AI requests/day: ~$1-5/month

## 🆘 Still Need Help?

1. **Check the documentation files**
   - VERCEL_DEPLOYMENT.md
   - LOCAL_DEVELOPMENT.md
   - GROQ_SETUP.md

2. **Verify environment variables**
   - Vercel Settings → Environment Variables
   - Should have all 5 required variables

3. **Check deployment logs**
   - Vercel Deployments → click latest
   - Scroll to see error details

4. **Common issues forum**
   - Vercel: vercel.com/help
   - Neon: neon.tech/docs
   - Groq: console.groq.com/docs

## 🎉 Congratulations!

Your Smart Finance Manager is now live!

Next steps:
- Customize the UI if desired
- Add more features (budgets, goals, etc.)
- Invite users to your app
- Deploy backend separately if needed
- Set up monitoring/analytics

Share your progress! 🚀
