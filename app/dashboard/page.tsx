"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SummaryCards } from "./summary-cards"
import { InsightsCard } from "./insights-card"
import { TransactionsList } from "./transactions-list"

interface Transaction {
  id: number
  amount: number
  type: string
  category_name: string
  description: string
  date: string
}

interface Summary {
  income: number
  expense: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<Summary>({ income: 0, expense: 0 })
  const [insights, setInsights] = useState("Loading insights...")
  const [loading, setLoading] = useState(true)
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))
    fetchData(token)
  }, [month, year, router])

  const fetchData = async (token: string) => {
    try {
      const [transRes, summaryRes, insightsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`http://localhost:5000/api/summary/monthly?month=${month}&year=${year}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/ai/insights", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ month, year }),
        }),
      ])

      const transactions = await transRes.json()
      const summary = await summaryRes.json()
      const insightsData = await insightsRes.json()

      setTransactions(transactions)
      const summaryObj = { income: 0, expense: 0 }
      summary.forEach((item: any) => {
        if (item.type === "income") summaryObj.income = Number.parseFloat(item.total)
        else summaryObj.expense = Number.parseFloat(item.total)
      })
      setSummary(summaryObj)
      setInsights(insightsData.insights || "No insights available yet. Add more transactions to get insights.")
    } catch (error) {
      console.error("Failed to fetch data:", error)
      setInsights("Failed to load insights. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Loading your dashboard...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
            <p className="text-gray-600 mt-1">Manage your finances with ease</p>
          </div>
          <div className="flex gap-3">
            <Link href="/add-transaction">
              <Button>Add Transaction</Button>
            </Link>
            <Link href="/transactions">
              <Button variant="outline">All Transactions</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <SummaryCards income={summary.income} expense={summary.expense} />

        <div className="mt-8">
          <InsightsCard insights={insights} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
          <TransactionsList transactions={transactions} />
        </div>
      </main>
    </div>
  )
}
