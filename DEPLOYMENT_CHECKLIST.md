# Pre-Deployment Checklist

Use this checklist before deploying to Vercel:

## Code Preparation
- [ ] All changes committed to git
- [ ] No console.log debugging statements left
- [ ] Environment variables in .env.example (no real secrets)
- [ ] .gitignore includes node_modules and .env
- [ ] package.json has all dependencies listed

## Database Setup
- [ ] Neon PostgreSQL project created
- [ ] Connection string copied and ready
- [ ] Database initialized (automatic on first run)

## API Keys & Secrets
- [ ] Groq API key obtained from console.groq.com
- [ ] JWT_SECRET generated (use: openssl rand -base64 32)
- [ ] No API keys in source code

## Vercel Configuration
- [ ] GitHub repository connected to Vercel
- [ ] Build command set: `npm run build`
- [ ] Environment variables configured in Vercel
- [ ] NEXT_PUBLIC_API_URL matches your Vercel domain

## Testing
- [ ] Tested locally: `npm run dev` and `npm run server:dev`
- [ ] User registration works
- [ ] Login functionality works
- [ ] Can add transactions
- [ ] AI insights generate without errors
- [ ] Dashboard displays data correctly

## Post-Deployment
- [ ] Verify production URL works
- [ ] Test user flow end-to-end
- [ ] Check Vercel Function Logs for errors
- [ ] Monitor first 24 hours for issues
- [ ] Set up monitoring/alerting (optional)

## Optimization (Optional)
- [ ] Enable Vercel Analytics for monitoring
- [ ] Set up error tracking (Sentry integration)
- [ ] Configure custom domain (if applicable)
- [ ] Enable CORS for any cross-origin requests
