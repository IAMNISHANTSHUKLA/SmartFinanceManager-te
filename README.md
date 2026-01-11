# Smart Finance Manager - SaaS Application

A production-ready full-stack SaaS application for freelancers and small businesses to track income, expenses, and get AI-powered financial insights.

## Tech Stack

- **Frontend**: Next.js 16+, React 19+, Tailwind CSS, Recharts
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (Neon)
- **Authentication**: JWT
- **AI Integration**: Groq API (Open Source Models - Mixtral 8x7B)
- **Deployment**: Vercel (Next.js) + Neon (Database)

## Architecture

\`\`\`
Frontend (React/Next.js on Vercel)
    ↓
REST APIs (Express)
    ↓
Backend Logic
    ↓
Database (PostgreSQL on Neon)
    ↓
AI Service (Groq - Mixtral 8x7B)
\`\`\`

## Features

✅ User Authentication (Register/Login with JWT)  
✅ Transaction Management (Create, Read, Update, Delete)  
✅ Income/Expense Categorization  
✅ Monthly Dashboard with Summary  
✅ Cash Flow Visualization  
✅ AI-Powered Financial Insights (using Open Source Mixtral)  
✅ Responsive Design (Mobile + Desktop)  
✅ Production-Ready for Vercel Deployment  

## Quick Start

### Local Development
\`\`\`bash
# Install dependencies
npm install

# Start backend server (Terminal 1)
npm run server:dev

# Start frontend (Terminal 2)
npm run dev
\`\`\`

See [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) for detailed setup.

### Vercel Deployment
1. Get Groq API key: https://console.groq.com/keys
2. Set up Neon database: https://neon.tech
3. Follow [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Summary
- `GET /api/summary/monthly` - Monthly income/expense summary
- `GET /api/summary/category` - Category-wise expense breakdown

### AI Insights
- `POST /api/ai/insights` - Get AI-powered spending insights

### Categories
- `GET /api/categories` - Get user categories

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Groq API Key

### Setup

1. **Clone and Install Dependencies**
\`\`\`bash
npm install
\`\`\`

2. **Configure Environment Variables**
Create a `.env` file in the root:
\`\`\`
DATABASE_URL=postgresql://user:password@localhost:5432/finance_db
JWT_SECRET=your-secret-key
GROQ_API_KEY=your-groq-api-key
NODE_ENV=development
PORT=5000
\`\`\`

3. **Start Backend Server**
\`\`\`bash
npm run dev
\`\`\`

4. **Frontend Setup (in a separate terminal)**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

5. **Access Application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Database Schema

### Users Table
- `id` (PRIMARY KEY)
- `email` (UNIQUE)
- `password_hash`
- `name`
- `created_at`

### Transactions Table
- `id` (PRIMARY KEY)
- `user_id` (FOREIGN KEY)
- `amount`
- `category_id`
- `description`
- `type` (income/expense)
- `date`
- `created_at`

### Categories Table
- `id` (PRIMARY KEY)
- `user_id` (FOREIGN KEY)
- `name`
- `color`
- `created_at`

## Key Decisions

1. **JWT Authentication**: Stateless authentication for scalability
2. **PostgreSQL**: Reliable relational database with strong typing
3. **Express**: Lightweight and flexible backend framework
4. **Groq API**: Open Source Models - Mixtral 8x7B for instant insights without fine-tuning
5. **REST APIs**: Standard architecture for client-server communication
6. **Recharts**: React-friendly charting library for data visualization

## Future Improvements

- Multi-currency support
- Budget goals and alerts
- Recurring transactions
- Bank account integration
- Advanced analytics and reports
- Mobile app (React Native)
- Export to CSV/PDF
- Real-time collaboration
- Dark mode
- Two-factor authentication

## Code Quality

- Clean separation of concerns (Frontend/Backend/Database)
- Proper error handling and validation
- Security best practices (JWT, password hashing, CORS)
- Environment-based configuration
- RESTful API conventions
- Indexed database queries

## Deployment

### Backend (Heroku/Railway/Render)
\`\`\`bash
git push heroku main
\`\`\`

### Frontend (Vercel)
\`\`\`bash
vercel deploy
\`\`\`

## Interview Notes

This project demonstrates:
- Full-stack development skills
- Clean architecture and design patterns
- Database design and optimization
- REST API development
- Authentication and security
- Integration with third-party APIs (Groq)
- Frontend state management
- Error handling and user experience
- Professional code organization
