# Migration from OpenAI to Groq

This document explains the migration from OpenAI API to Groq API and open-source models.

## What Changed?

### Before (OpenAI)
\`\`\`javascript
const response = await fetch("https://api.openai.com/v1/chat/completions", {
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  }),
})
\`\`\`

### After (Groq)
\`\`\`javascript
const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  headers: {
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  },
  body: JSON.stringify({
    model: "mixtral-8x7b-32768", // Open-source Mixtral model
    messages: [{ role: "user", content: prompt }],
  }),
})
\`\`\`

## Why Groq?

| Aspect | OpenAI | Groq |
|--------|--------|------|
| **Cost** | $0.50 per 1M input tokens | Free (30 req/day) or pay-as-you-go |
| **Model** | Proprietary GPT-3.5/4 | Open-source Mixtral 8x7B |
| **Speed** | 1-3 seconds | 300+ tokens/second |
| **Setup** | Credit card required | Free tier available |
| **Data Privacy** | Third-party processing | Still sent to Groq, but open model |

## Benefits

1. **Cost Savings**: Free tier sufficient for small businesses
2. **Speed**: 5-10x faster inference
3. **Open Source**: Using Mixtral, a fully open model
4. **No Vendor Lock-in**: Can switch models easily
5. **Generous Free Tier**: 30 requests/day is enough for testing

## Changes Made

### 1. Package Dependencies
No new packages needed! The code still uses native `fetch` API.

### 2. Environment Variables

**Remove:**
\`\`\`env
OPENAI_API_KEY=sk_your_openai_key
\`\`\`

**Add:**
\`\`\`env
GROQ_API_KEY=gsk_your_groq_key
\`\`\`

### 3. Backend Server Code
- Changed API endpoint from OpenAI to Groq
- Changed model from `gpt-3.5-turbo` to `mixtral-8x7b-32768`
- Updated error handling for Groq API response format

### 4. Frontend Code
**No changes required!** The API endpoint remains `/api/ai/insights`

## Model Comparison

### Mixtral 8x7B (Current)
- **Type**: Mixture of Experts, Open Source
- **Creator**: Mistral AI
- **Best for**: General purpose, balanced performance
- **Speed**: Fastest available
- **Cost**: Free on Groq free tier

### Alternatives Available on Groq

If you want to switch models, edit `/server.js` line with `model:`:

\`\`\`javascript
// Use Llama 2 (70B parameters)
model: "llama2-70b-4096"

// Use Mixtral (current - recommended)
model: "mixtral-8x7b-32768"

// Use Llama 2 (chat optimized)
model: "llama2-70b-chat"
\`\`\`

## Migration Checklist

- [x] Updated `/server.js` with Groq endpoint
- [x] Changed environment variable name
- [x] Updated `.env.example` with new variable
- [x] Created `GROQ_SETUP.md` documentation
- [x] Updated `README.md` with Groq info
- [x] Created deployment guides
- [x] Verified frontend needs no changes
- [x] Tested error handling

## Testing the Migration

### Local Testing
\`\`\`bash
# 1. Get Groq API key from console.groq.com
# 2. Add to .env.local:
GROQ_API_KEY=gsk_your_key

# 3. Start backend
npm run server:dev

# 4. In another terminal, start frontend
npm run dev

# 5. Create account and add transactions
# 6. Check Dashboard → Insights for AI response
\`\`\`

### Production Testing
1. Deploy to Vercel
2. Add `GROQ_API_KEY` to Vercel environment variables
3. Test user flow end-to-end
4. Verify insights appear in dashboard

## Troubleshooting Migration Issues

### "Invalid API Key" Error
\`\`\`
❌ Groq API returned 401
✅ Check key format starts with `gsk_`
✅ Verify no extra spaces or quotes
\`\`\`

### "Model not found" Error
\`\`\`
❌ Model `mixtral-8x7b-32768` doesn't exist
✅ Verify exact spelling in server.js
✅ Check Groq console for available models
\`\`\`

### "Rate limit exceeded" Error
\`\`\`
❌ Free tier allows 30 requests/day
✅ Wait 24 hours or upgrade Groq plan
✅ For production, budget 10¢-$1/day
\`\`\`

### Slow Responses
\`\`\`
❌ Groq slow for financial insights
✅ Actually Groq is fastest option
✅ Check network latency
✅ Consider caching responses
\`\`\`

## Performance Metrics

### Response Times (Approximate)
- OpenAI GPT-3.5: 2-5 seconds
- Groq Mixtral: 0.5-2 seconds (5-10x faster)

### Token Usage
- Financial insight prompt: ~150 tokens
- Groq free tier: 30 requests/day = 4,500 tokens/day
- Typical usage: 2-5 insights per user per day

## Cost Projection

### Small Business (10 users, 2 insights each per week)
- **OpenAI**: ~$0.50/month
- **Groq Free**: $0/month (30 req/day is enough)
- **Groq Paid**: $0.10/month if exceeded

### High Volume (100+ daily insights)
- **OpenAI**: $10-20/month
- **Groq Paid**: $1-5/month

## Rollback Instructions

If you need to switch back to OpenAI:

1. Install openai package:
\`\`\`bash
npm install openai
\`\`\`

2. Update `/server.js`:
\`\`\`javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await client.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: prompt }],
  max_tokens: 150,
});
\`\`\`

3. Update environment variable:
\`\`\`env
OPENAI_API_KEY=sk_your_key
\`\`\`

4. Redeploy

## Questions?

- **Groq Docs**: https://console.groq.com/docs
- **Groq Support**: support@groq.com
- **Mixtral Info**: https://mistral.ai/news/mixtral-of-experts/
