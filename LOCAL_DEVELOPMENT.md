# Local Development Setup

Follow these steps to run the Smart Finance Manager locally:

## Prerequisites
- Node.js 18+ installed
- PostgreSQL or Neon account
- Groq API key
- Git configured

## Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd smart-finance-manager
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database - use local PostgreSQL or Neon connection string
DATABASE_URL=postgresql://user:password@localhost:5432/finance_db

# JWT Secret
JWT_SECRET=dev-secret-key-change-in-production

# Groq API Key
GROQ_API_KEY=gsk_your-groq-key-here

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Server Configuration
NODE_ENV=development
PORT=5000
```

## Step 3: Set Up Local PostgreSQL (Optional)

If using local PostgreSQL instead of Neon:

```bash
# On macOS with Homebrew
brew install postgresql
brew services start postgresql

# Create database
createdb finance_db

# Update DATABASE_URL to:
# DATABASE_URL=postgresql://localhost/finance_db
```

## Step 4: Run the Application

Open two terminal windows:

### Terminal 1 - Backend Server
```bash
npm run server:dev
```
Server will run on `http://localhost:5000`

### Terminal 2 - Frontend (Next.js)
```bash
npm run dev
```
Frontend will run on `http://localhost:3000`

## Step 5: Test the Application

1. Open `http://localhost:3000` in your browser
2. Create an account (register)
3. Login with your credentials
4. Add a transaction
5. View the dashboard and AI insights

## Development Commands

```bash
# Start backend in development mode (with auto-reload)
npm run server:dev

# Start frontend in development mode
npm run dev

# Build frontend
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Database Migration

The database schema is automatically created on first API call. If you need to reset:

```bash
# Manually run SQL in PostgreSQL terminal
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

# Then restart the server to recreate tables
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Errors
- Verify DATABASE_URL format
- Check PostgreSQL is running: `psql --version`
- Test connection: `psql $DATABASE_URL`

### Groq API Errors
- Verify GROQ_API_KEY is correct
- Check Groq API status at status.groq.com
- Review rate limits on console.groq.com

## IDE Setup (VS Code Recommended)

Install extensions:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- Thunder Client or REST Client for API testing

## Next Steps

1. Read the main [README.md](./README.md) for architecture overview
2. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
3. Review [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for deployment
