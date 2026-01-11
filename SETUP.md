# Smart Finance Manager - Setup Guide

This guide will help you set up and run the Smart Finance Manager application locally.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+
- OpenAI API Key (for AI insights)

## Installation Steps

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Database Setup

Create a PostgreSQL database:

```bash
createdb finance_db
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://localhost/finance_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000

# Server
NODE_ENV=development
PORT=5000
```

### 4. Start the Backend Server

In one terminal:

```bash
npm run server:dev
```

The backend will start on `http://localhost:5000`

### 5. Start the Frontend (in a new terminal)

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

### 6. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## First Steps

1. Navigate to http://localhost:3000
2. Click "Sign Up" to create an account
3. Log in with your credentials
4. Add your first transaction
5. View your dashboard with AI-generated insights

## API Documentation

### Authentication

**Register**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Transactions

**Get All Transactions**
```
GET /api/transactions
Authorization: Bearer <token>
```

**Create Transaction**
```
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 50.00,
  "categoryId": 1,
  "description": "Lunch",
  "type": "expense",
  "date": "2024-01-15"
}
```

**Update Transaction**
```
PUT /api/transactions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 75.00,
  "categoryId": 1,
  "description": "Dinner",
  "type": "expense",
  "date": "2024-01-15"
}
```

**Delete Transaction**
```
DELETE /api/transactions/:id
Authorization: Bearer <token>
```

### Summary

**Monthly Summary**
```
GET /api/summary/monthly?month=1&year=2024
Authorization: Bearer <token>
```

**Category Summary**
```
GET /api/summary/category?month=1&year=2024
Authorization: Bearer <token>
```

### Categories

**Get Categories**
```
GET /api/categories
Authorization: Bearer <token>
```

### AI Insights

**Generate Insights**
```
POST /api/ai/insights
Authorization: Bearer <token>
Content-Type: application/json

{
  "month": 1,
  "year": 2024
}
```

## Troubleshooting

### Backend connection error

- Ensure the backend server is running on port 5000
- Check that `NEXT_PUBLIC_API_URL` is set correctly in `.env`
- Verify PostgreSQL is running

### Database connection error

- Check `DATABASE_URL` in `.env`
- Verify PostgreSQL is running: `psql -U postgres`
- Ensure the database exists: `psql -l`

### OpenAI API error

- Verify your OpenAI API key is valid
- Check your OpenAI account has available credits
- Ensure `OPENAI_API_KEY` is set in `.env`

### Authentication issues

- Clear browser localStorage and try logging in again
- Check that `JWT_SECRET` is set in `.env`
- Verify tokens are being stored correctly in browser

## Deployment

### Vercel (Frontend)

```bash
vercel deploy
```

### Heroku/Railway/Render (Backend)

1. Create account on the hosting platform
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

## Development

### Code Structure

```
├── app/                    # Next.js app
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── dashboard/         # Dashboard pages
│   ├── add-transaction/   # Add transaction page
│   ├── summary/           # Summary page
│   └── layout.tsx         # Root layout
├── components/ui/         # shadcn UI components
├── lib/                   # Utilities
├── server.js              # Express backend
├── package.json
└── README.md
```

### Running Tests

```bash
npm run lint
```

## Contributing

This is a personal portfolio project. Feel free to fork and modify for your needs.

## License

MIT
