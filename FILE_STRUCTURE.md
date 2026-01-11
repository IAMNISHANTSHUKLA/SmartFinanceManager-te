# Project File Structure & Purpose

## Overview

\`\`\`
smart-finance-manager/
├── app/                           # Next.js app directory (frontend)
├── components/                    # React components
├── lib/                          # Utility functions
├── public/                       # Static assets
├── scripts/                      # Deployment scripts
├── server.js                     # Express backend
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── .env.example                  # Environment variables template
├── README.md                     # Main documentation
└── docs/                         # Setup guides
\`\`\`

## Frontend Files

### `app/layout.tsx`
**Purpose**: Root layout for all pages
**Contains**: Metadata, fonts, global providers
**Key exports**: RootLayout component

### `app/page.tsx`
**Purpose**: Landing page
**Shows**: Feature overview, login/register buttons
**When accessed**: User not logged in

### `app/login/page.tsx`
**Purpose**: User login form
**Features**: Email/password form, JWT token handling
**Redirects to**: Dashboard on success

### `app/register/page.tsx`
**Purpose**: User registration form
**Features**: Email/password creation, validation
**Creates**: New user account, default categories

### `app/dashboard/page.tsx`
**Purpose**: Main dashboard (protected route)
**Shows**: Summary cards, transaction list, AI insights
**API calls**: GET /api/transactions, POST /api/ai/insights

### `app/dashboard/summary-cards.tsx`
**Purpose**: Display income/expense summary
**Shows**: 
- Total income
- Total expenses
- Net balance
**Data source**: Calculated from transactions

### `app/dashboard/transactions-list.tsx`
**Purpose**: Display user transactions
**Features**: List view, delete button, filtering
**Data source**: GET /api/transactions

### `app/dashboard/insights-card.tsx`
**Purpose**: Display AI insights
**Shows**: Spending recommendations from Groq
**Updates**: When user adds new transaction

### `app/add-transaction/page.tsx`
**Purpose**: Form to add new transaction
**Fields**: Amount, type (income/expense), category, date
**API call**: POST /api/transactions

### `app/transactions/page.tsx`
**Purpose**: View all transactions (paginated)
**Features**: List, filter, delete, edit
**API calls**: GET /api/transactions

### `app/summary/page.tsx`
**Purpose**: Detailed financial summary
**Shows**: 
- Monthly breakdown chart
- Category-wise expenses
- Income/expense trend
**Data source**: GET /api/summary/monthly, /api/summary/category

### `app/globals.css`
**Purpose**: Global styles and design tokens
**Contains**: 
- Tailwind imports
- CSS variables for colors
- Dark mode support
**Uses**: oklch color values for theming

### `lib/api-client.ts`
**Purpose**: API communication utility
**Functions**:
- `fetchAPI()`: Wrapper around fetch with auth headers
- Handles JWT token from localStorage
- Automatic redirect on 401

### `lib/utils.ts`
**Purpose**: Utility functions
**Contains**: `cn()` for class merging, other helpers

### `lib/auth-guard.tsx`
**Purpose**: Protected route component
**Checks**: User authentication
**Redirects**: To login if not authenticated
**Usage**: Wrap protected pages

## Backend Files

### `server.js`
**Purpose**: Express.js backend server
**Main responsibilities**:
1. **Database**: PostgreSQL connection via `pg` package
2. **Authentication**: JWT token generation and verification
3. **Endpoints**: All REST API routes
4. **AI Integration**: Groq API for insights

**Key sections**:
\`\`\`javascript
// Database initialization
const initializeDatabase = async () => { ... }

// JWT helpers
const generateToken = (userId) => { ... }
const verifyToken = (req, res, next) => { ... }

// Auth routes
app.post("/api/auth/register")
app.post("/api/auth/login")

// Transaction routes
app.get("/api/transactions")
app.post("/api/transactions")
app.put("/api/transactions/:id")
app.delete("/api/transactions/:id")

// Summary routes
app.get("/api/summary/monthly")
app.get("/api/summary/category")

// AI route
app.post("/api/ai/insights")

// Categories
app.get("/api/categories")
\`\`\`

**Database tables created**:
- `users` - User accounts
- `transactions` - Income/expense records
- `categories` - Transaction categories

**API Key Used**: `GROQ_API_KEY` for Mixtral model

## Configuration Files

### `package.json`
**Purpose**: Project dependencies and scripts
**Key dependencies**:
- `express`: Backend framework
- `pg`: PostgreSQL driver
- `jsonwebtoken`: JWT handling
- `bcryptjs`: Password hashing
- `next`: Frontend framework
- `react`: React library
- `tailwindcss`: CSS framework
- `recharts`: Charts library

**Key scripts**:
\`\`\`json
{
  "dev": "next dev",           // Start frontend
  "server:dev": "nodemon server.js",  // Start backend with reload
  "build": "next build",        // Build for production
  "start": "next start"         // Start production server
}
\`\`\`

### `tsconfig.json`
**Purpose**: TypeScript configuration
**Settings**: Strict mode, JSX support, path aliases

### `.env.example`
**Purpose**: Template for environment variables
**Not committed**: Real `.env` is in `.gitignore`

**Variables needed**:
\`\`\`env
DATABASE_URL=          # Neon PostgreSQL connection
GROQ_API_KEY=          # Groq API key for AI
JWT_SECRET=            # Secret for JWT tokens
NEXT_PUBLIC_API_URL=   # Frontend API endpoint
NODE_ENV=              # development or production
PORT=                  # Backend server port
\`\`\`

### `next.config.mjs`
**Purpose**: Next.js configuration
**Contains**: Build settings, plugins, optimization

## Documentation Files

### `README.md`
**Main documentation** - Overview, features, tech stack

### `VERCEL_DEPLOYMENT.md`
**Deployment guide** - Step-by-step Vercel setup

### `LOCAL_DEVELOPMENT.md`
**Local setup guide** - Run app locally on computer

### `GROQ_SETUP.md`
**AI configuration** - How to set up Groq API

### `QUICK_START_VERCEL.md`
**5-minute quick start** - Fast deployment guide

### `SETUP_INSTRUCTIONS.md`
**Comprehensive setup** - Complete A-Z instructions

### `DEPLOYMENT_CHECKLIST.md`
**Verification checklist** - Pre-deployment items

### `OPENAI_TO_GROQ_MIGRATION.md`
**Migration notes** - Why we switched from OpenAI

### `ARCHITECTURE.md`
**System design** - How the app works internally

### `FILE_STRUCTURE.md`
This file - Guide to all files and their purposes

## Component Files

### `components/ui/`
**Purpose**: Reusable UI components (shadcn/ui)
**Examples**:
- `button.tsx` - Styled button component
- `card.tsx` - Card wrapper
- `input.tsx` - Text input
- `form.tsx` - Form wrapper
- `dialog.tsx` - Modal dialog
- `select.tsx` - Dropdown select
(and many more...)

## Static Files

### `public/`
**Purpose**: Static assets
**Contains**:
- Icons (favicon, apple-icon)
- Images
- Fonts (optional)

## Development Files

### `.gitignore`
**Purpose**: Files not to commit to git
**Contains**:
- `node_modules/` - Dependencies
- `.env` - Real secrets
- `.env.local` - Local development
- `.next/` - Build artifacts
- `*.log` - Log files

### `package-lock.json` (or `yarn.lock`)
**Purpose**: Lock dependency versions
**Auto-generated**: npm/yarn maintains this

## API Response Format

### Success Response
\`\`\`json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "token": "jwt_token_here"
}
\`\`\`

### Error Response
\`\`\`json
{
  "error": "Email already exists"
}
\`\`\`

### AI Insights Response
\`\`\`json
{
  "insights": "Based on your spending, you're exceeding budget in dining by 20%. Consider meal planning or cooking at home..."
}
\`\`\`

## Database Schema

### users table
\`\`\`
id (PRIMARY KEY)
email (UNIQUE)
password_hash
name
created_at
\`\`\`

### transactions table
\`\`\`
id (PRIMARY KEY)
user_id (FOREIGN KEY → users)
amount
category_id (FOREIGN KEY → categories)
description
type (income/expense)
date
created_at
\`\`\`

### categories table
\`\`\`
id (PRIMARY KEY)
user_id (FOREIGN KEY → users)
name
color (hex code)
created_at
\`\`\`

## Environment Variable Mapping

| Variable | Used In | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | server.js | PostgreSQL connection |
| `GROQ_API_KEY` | server.js | AI insights generation |
| `JWT_SECRET` | server.js | Token signing/verification |
| `NEXT_PUBLIC_API_URL` | lib/api-client.ts | Frontend API calls |
| `NODE_ENV` | Both | Environment detection |
| `PORT` | server.js | Server port number |

## File Size Reference

\`\`\`
server.js               ~8 KB    Single Express server with all endpoints
app/page.tsx            ~2 KB    Landing page
app/dashboard/          ~5 KB    Dashboard pages
components/            ~50 KB    UI components (from shadcn/ui)
package.json            ~3 KB    Dependencies list
README.md              ~5 KB    Documentation
\`\`\`

## Hot to Find Things

| Need to... | Look at... |
|-----------|-----------|
| Add new API endpoint | server.js line ~250 |
| Style a component | app/globals.css + Tailwind |
| Add new page | Create file in app/ directory |
| Change database | Modify query in server.js |
| Add new feature | Create new .tsx component in components/ |
| Configure deployment | next.config.mjs, vercel.json |
| Fix authentication | lib/api-client.ts, app/login/ |
