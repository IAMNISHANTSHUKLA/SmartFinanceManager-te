"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Transaction {
  id: number
  amount: number
  type: string
  category_name: string
  description: string
  date: string
}

export default function TransactionsPage() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    fetchTransactions(token)
  }, [router])

  const fetchTransactions = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setTransactions(data)
    } catch (error) {
      console.error("Failed to fetch transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return

    const token = localStorage.getItem("token")
    if (!token) return

    try {
      await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setTransactions(transactions.filter((t) => t.id !== id))
    } catch (error) {
      console.error("Failed to delete transaction:", error)
    }
  }

  const filteredTransactions = transactions.filter((t) => filter === "all" || t.type === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <Link href="/dashboard" className="text-blue-600 hover:underline text-sm mb-2 inline-block">
              ← Dashboard
            </Link>
            <h1 className="text-3xl font-bold">All Transactions</h1>
          </div>
          <Link href="/add-transaction">
            <Button>Add Transaction</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="mb-6 flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
              All
            </Button>
            <Button variant={filter === "income" ? "default" : "outline"} onClick={() => setFilter("income")} size="sm">
              Income
            </Button>
            <Button
              variant={filter === "expense" ? "default" : "outline"}
              onClick={() => setFilter("expense")}
              size="sm"
            >
              Expenses
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading transactions...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No transactions found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm">{new Date(t.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-gray-100 rounded">{t.category_name || "Other"}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{t.description || "—"}</td>
                      <td className="px-6 py-4 text-right text-sm font-semibold">
                        <span className={t.type === "income" ? "text-green-600" : "text-red-600"}>
                          {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded text-white text-xs font-medium ${t.type === "income" ? "bg-green-500" : "bg-red-500"}`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
