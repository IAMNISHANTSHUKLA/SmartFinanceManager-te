# Smart Finance Manager - Architecture Overview

## System Design

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Client Browser                           │
│                   (React/Next.js)                           │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend Server (Express.js)                     │
├─────────────────────────────────────────────────────────────┤
│  • Authentication (JWT)                                     │
│  • Transaction Management                                   │
│  • Financial Summaries                                      │
│  • AI Insights Orchestration                               │
└─────────┬────────────────────────────────┬──────────────────┘
          │                                │
          ▼                                ▼
    ┌───────────────┐            ┌──────────────────┐
    │  PostgreSQL   │            │  OpenAI API      │
    │   Database    │            │  (GPT-3.5-turbo) │
    │               │            │                  │
    │ • Users       │            │ • Insights Gen   │
    │ • Trans.      │            │ • Analysis       │
    │ • Categories  │            │ • Trends         │
    └───────────────┘            └──────────────────┘
\`\`\`

## Component Architecture

### Frontend (Next.js App Router)

\`\`\`
app/
├── page.tsx                 # Landing page
├── layout.tsx              # Root layout with metadata
├── login/page.tsx          # Login page
├── register/page.tsx       # Registration page
├── dashboard/
│   ├── page.tsx           # Main dashboard
│   ├── summary-cards.tsx  # Summary card component
│   ├── insights-card.tsx  # AI insights card
│   └── transactions-list.tsx # Transactions table
├── add-transaction/
│   └── page.tsx           # Add/Edit transaction form
├── transactions/
│   └── page.tsx           # All transactions with filters
├── summary/
│   └── page.tsx           # Monthly summary & breakdown
└── globals.css            # Global styles & theme tokens
\`\`\`

### Backend (Express.js)

\`\`\`
server.js
├── Middleware
│   ├── CORS
│   ├── JSON parser
│   └── JWT verification
├── Routes
│   ├── Auth
│   │   ├── POST /auth/register
│   │   └── POST /auth/login
│   ├── Transactions
│   │   ├── GET /transactions
│   │   ├── POST /transactions
│   │   ├── PUT /transactions/:id
│   │   └── DELETE /transactions/:id
│   ├── Summary
│   │   ├── GET /summary/monthly
│   │   └── GET /summary/category
│   ├── Categories
│   │   └── GET /categories
│   └── AI
│       └── POST /ai/insights
└── Database
    ├── Connection Pool
    └── Schema Init
\`\`\`

## Data Flow

### 1. User Authentication Flow
\`\`\`
User Input (Email/Password)
    ↓
React Component (Login/Register)
    ↓
Fetch API Call
    ↓
Express Auth Route
    ↓
Password Hash Check (bcryptjs)
    ↓
JWT Token Generation
    ↓
localStorage Storage
    ↓
Dashboard Navigation
\`\`\`

### 2. Transaction Flow
\`\`\`
User Action (Add/View/Delete)
    ↓
React Component
    ↓
API Request (with JWT token)
    ↓
Middleware (verify token)
    ↓
Database Query (with user_id filter)
    ↓
Response JSON
    ↓
Update Component State
    ↓
UI Re-render
\`\`\`

### 3. AI Insights Flow
\`\`\`
Dashboard Load
    ↓
Fetch Transactions (current month)
    ↓
Generate Prompt from Data
    ↓
OpenAI API Call (GPT-3.5-turbo)
    ↓
Parse Response
    ↓
Update State
    ↓
Display in Insights Card
\`\`\`

## Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### Categories Table
\`\`\`sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  name VARCHAR(100) NOT NULL,
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### Transactions Table
\`\`\`sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  amount DECIMAL(12, 2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  description TEXT,
  type VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### Indexes
- `idx_transactions_user_id` on transactions(user_id)
- `idx_transactions_date` on transactions(date)
- `idx_categories_user_id` on categories(user_id)

## API Contract Examples

### Authentication
\`\`\`http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 201 Created
{
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
\`\`\`

### Create Transaction
\`\`\`http
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 50.00,
  "categoryId": 2,
  "description": "Lunch at cafe",
  "type": "expense",
  "date": "2024-01-15"
}

Response: 201 Created
{
  "id": 42,
  "user_id": 1,
  "amount": 50.00,
  "category_id": 2,
  "description": "Lunch at cafe",
  "type": "expense",
  "date": "2024-01-15",
  "created_at": "2024-01-15T10:30:00Z"
}
\`\`\`

### Get AI Insights
\`\`\`http
POST /api/ai/insights
Authorization: Bearer <token>
Content-Type: application/json

{
  "month": 1,
  "year": 2024
}

Response: 200 OK
{
  "insights": "Your dining expenses increased by 23% compared to last month. Consider setting a budget limit. Your most expensive category this month was Transport at $450."
}
\`\`\`

## Security Considerations

1. **Authentication**: JWT tokens with 24-hour expiration
2. **Password Security**: bcryptjs hashing with 10 rounds
3. **Authorization**: User ID filtering on all queries
4. **SQL Injection**: Parameterized queries via pg library
5. **CORS**: Enabled for frontend only
6. **Environment Variables**: Sensitive data never in code
7. **HTTPS**: Recommended for production
8. **Token Storage**: localStorage (could upgrade to httpOnly cookies)

## Performance Optimizations

1. **Database Indexes**: On user_id and date for fast queries
2. **Connection Pooling**: Reusable database connections
3. **Caching**: Client-side state with React hooks
4. **Pagination**: Ready for large transaction lists
5. **Lazy Loading**: Components load on demand

## Scalability Considerations

1. **Horizontal Scaling**: Stateless API servers
2. **Database**: PostgreSQL with read replicas
3. **Cache Layer**: Redis for sessions (future)
4. **Message Queue**: For async AI processing (future)
5. **Monitoring**: Sentry integration ready
6. **Logging**: Structured logs for debugging

## Error Handling

- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid/missing token)
- **404**: Not Found (resource doesn't exist)
- **409**: Conflict (duplicate email)
- **500**: Server Error (unexpected issues)

All errors return JSON with descriptive messages for frontend handling.

## Testing Strategy

- Unit tests for utility functions
- Integration tests for API routes
- E2E tests for critical user flows
- Manual testing checklist before deployment
