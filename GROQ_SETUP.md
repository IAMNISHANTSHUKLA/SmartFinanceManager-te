# Groq API Setup Guide

This application uses Groq for AI-powered financial insights. Groq provides free access to open-source models like Mixtral.

## What is Groq?

Groq is a fast inference engine for large language models. It provides:
- **Free Tier**: Generous free API access
- **Open Models**: Mixtral 8x7B, Llama 2, and others
- **Fast**: 5-10x faster than typical LLM providers
- **No Credit Card**: Required for free tier

## Getting Your Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Click "Sign Up" (or "Log In" if you have an account)
3. Complete the signup process
4. Once logged in, navigate to **API Keys** in the left sidebar
5. Click "Create API Key"
6. Copy the key (format: `gsk_...`)
7. Store it securely

## Using Groq in This Application

### Model Used
This application uses **Mixtral 8x7B 32K** model:
- Open-source model maintained by Mistral AI
- Excellent for financial analysis and insights
- Efficient and cost-effective
- Fast inference (300+ tokens/second on Groq)

### API Endpoint
```
https://api.groq.com/openai/v1/chat/completions
```

### Configuration Location
The Groq API key is used in `/server.js`:
```javascript
const response = await fetch(GROQ_API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  },
  body: JSON.stringify({
    model: "mixtral-8x7b-32768", // Open source model
    messages: [{ role: "user", content: prompt }],
    max_tokens: 150,
  }),
})
```

## Environment Variable Setup

### Local Development (.env.local)
```env
GROQ_API_KEY=gsk_your_actual_key_here
```

### Vercel Deployment
In Vercel Dashboard → Settings → Environment Variables:
```
GROQ_API_KEY=gsk_your_actual_key_here
```

## Free Tier Limits

Groq's free tier includes:
- **Requests**: No hard limit
- **Rate Limit**: 25 requests/minute, 30 requests/day
- **Tokens**: Sufficient for typical usage
- **Cost**: Always free

For production with high usage, consider upgrading to a paid plan.

## Testing the Integration

### Test Locally
```bash
# Start the backend server
npm run server:dev

# In another terminal, test the insights endpoint
curl -X POST http://localhost:5000/api/ai/insights \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "month": 1,
    "year": 2024
  }'
```

### Expected Response
```json
{
  "insights": "Based on your January spending, you spent $XXX on expenses with Food being the largest category at $XXX. Consider setting a monthly budget limit for dining expenses. Your income exceeded expenses by $XXX this month."
}
```

## Troubleshooting

### Error: "Invalid API Key"
- Verify key starts with `gsk_`
- Check for extra spaces in the key
- Regenerate a new key from Groq console

### Error: "Rate limit exceeded"
- Free tier allows 30 requests/day
- Wait 24 hours or upgrade plan
- Consider caching responses

### Error: "Model not found"
- Verify model name is `mixtral-8x7b-32768`
- Check available models at console.groq.com

### Slow Responses
- Groq is fast, but network latency applies
- Responses typically take 1-3 seconds
- Consider adding loading indicators in UI

## Alternative Models

You can switch to other Groq-supported models:

| Model | Context | Speed | Best For |
|-------|---------|-------|----------|
| `mixtral-8x7b-32768` | 32K tokens | Fastest | General purpose ✓ |
| `llama-2-70b-4096` | 4K tokens | Fast | Conversational |
| `llama2-70b-4096` | 4K tokens | Fast | Text generation |

To change the model, edit `/server.js` line with:
```javascript
model: "mixtral-8x7b-32768", // Change this value
```

## Monitoring Usage

Check your Groq usage:
1. Log in to [console.groq.com](https://console.groq.com)
2. Click "Usage" in the left sidebar
3. View requests, tokens, and rate limits
4. Monitor daily quota

## Cost Analysis

- **Free Tier**: $0/month (up to 30 requests/day)
- **Estimated Cost**: $0 for typical small business usage
- **Paid Tier**: Available if you need higher limits

For production applications with >30 requests/day, contact Groq for pricing.

## Privacy & Security

- Groq doesn't use requests for training
- Transactions data sent to Groq for analysis only
- Consider GDPR compliance if you handle EU data
- Review [Groq Privacy Policy](https://www.groq.com/privacy)

## Getting Help

- [Groq Documentation](https://console.groq.com/docs)
- [Groq GitHub](https://github.com/groq)
- [Groq Discord Community](https://discord.gg/groq)
