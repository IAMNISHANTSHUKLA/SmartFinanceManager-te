import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import fetch from "node-fetch"

dotenv.config()

const { Pool } = pg
const app = express()
const PORT = process.env.PORT || 5000

const GROQ_API_URL = "https://api.groq.com/chat/completions"

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Middleware
app.use(cors())
app.use(express.json())

// JWT Helpers
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" })
}

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

// Initialize database
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        name VARCHAR(100) NOT NULL,
        color VARCHAR(7),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        amount DECIMAL(12, 2) NOT NULL,
        category_id INTEGER REFERENCES categories(id),
        description TEXT,
        type VARCHAR(20) NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
      CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
      CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);
    `)
    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Database initialization error:", error)
  }
}

// Auth Routes
app.post("/api/auth/register", async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const result = await pool.query(
      "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name",
      [email, passwordHash, name],
    )

    const user = result.rows[0]
    const token = generateToken(user.id)

    // Create default categories
    await pool.query(
      "INSERT INTO categories (user_id, name, color) VALUES ($1, $2, $3), ($1, $4, $5), ($1, $6, $7), ($1, $8, $9)",
      [user.id, "Food", "#FF6B6B", "Transport", "#4ECDC4", "Work", "#45B7D1", "Other", "#95E1D3"],
    )

    res.status(201).json({ user, token })
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already exists" })
    }
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" })
  }

  try {
    const result = await pool.query("SELECT id, password_hash, email, name FROM users WHERE email = $1", [email])

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const user = result.rows[0]
    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = generateToken(user.id)
    res.json({ user: { id: user.id, email: user.email, name: user.name }, token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Transaction Routes
app.get("/api/transactions", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT t.*, c.name as category_name FROM transactions t LEFT JOIN categories c ON t.category_id = c.id WHERE t.user_id = $1 ORDER BY t.date DESC",
      [req.userId],
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/api/transactions", verifyToken, async (req, res) => {
  const { amount, categoryId, description, type, date } = req.body

  if (!amount || !type || !date) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  try {
    const result = await pool.query(
      "INSERT INTO transactions (user_id, amount, category_id, description, type, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [req.userId, amount, categoryId || null, description, type, date],
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put("/api/transactions/:id", verifyToken, async (req, res) => {
  const { amount, categoryId, description, type, date } = req.body
  const { id } = req.params

  try {
    const result = await pool.query(
      "UPDATE transactions SET amount = $1, category_id = $2, description = $3, type = $4, date = $5 WHERE id = $6 AND user_id = $7 RETURNING *",
      [amount, categoryId, description, type, date, id, req.userId],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete("/api/transactions/:id", verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query("DELETE FROM transactions WHERE id = $1 AND user_id = $2", [id, req.userId])

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Transaction not found" })
    }

    res.json({ message: "Transaction deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Summary Routes
app.get("/api/summary/monthly", verifyToken, async (req, res) => {
  const { month, year } = req.query
  const date = new Date(year, month - 1, 1)

  try {
    const result = await pool.query(
      `
      SELECT 
        type,
        SUM(amount) as total,
        COUNT(*) as count
      FROM transactions
      WHERE user_id = $1 
        AND EXTRACT(MONTH FROM date) = $2 
        AND EXTRACT(YEAR FROM date) = $3
      GROUP BY type
    `,
      [req.userId, month, year],
    )

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/api/summary/category", verifyToken, async (req, res) => {
  const { month, year } = req.query

  try {
    const result = await pool.query(
      `
      SELECT 
        COALESCE(c.name, 'Uncategorized') as category,
        SUM(t.amount) as total,
        COUNT(*) as count
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = $1 
        AND t.type = 'expense'
        AND EXTRACT(MONTH FROM t.date) = $2 
        AND EXTRACT(YEAR FROM t.date) = $3
      GROUP BY c.id, c.name
      ORDER BY total DESC
    `,
      [req.userId, month, year],
    )

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Categories Route
app.get("/api/categories", verifyToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories WHERE user_id = $1 ORDER BY name", [req.userId])
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// AI Insights Route
app.post("/api/ai/insights", verifyToken, async (req, res) => {
  const { month, year } = req.body

  try {
    const transactions = await pool.query(
      `
      SELECT t.*, c.name as category_name
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = $1 
        AND EXTRACT(MONTH FROM t.date) = $2 
        AND EXTRACT(YEAR FROM t.date) = $3
    `,
      [req.userId, month, year],
    )

    const summary = await pool.query(
      `
      SELECT 
        type,
        SUM(amount) as total
      FROM transactions
      WHERE user_id = $1 
        AND EXTRACT(MONTH FROM t.date) = $2 
        AND EXTRACT(YEAR FROM t.date) = $3
      GROUP BY type
    `,
      [req.userId, month, year],
    )

    const prompt = `Analyze these financial transactions and provide brief insights:
${transactions.rows.map((t) => `- ${t.category_name || "Other"}: $${t.amount} (${t.type})`).join("\n")}

Provide 2-3 specific, actionable insights in 2-3 sentences.`

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768", // Open source Mixtral model
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Groq API error: ${errorData.error?.message || "Unknown error"}`)
    }

    const data = await response.json()
    res.json({ insights: data.choices[0].message.content })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Start server
app.listen(PORT, async () => {
  await initializeDatabase()
  console.log(`Server running on port ${PORT}`)
})
