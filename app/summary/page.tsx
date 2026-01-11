"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface CategorySummary {
  category: string
  total: number
  count: number
}

export default function SummaryPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<CategorySummary[]>([])
  const [loading, setLoading] = useState(true)
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    fetchCategorySummary(token)
  }, [month, year, router])

  const fetchCategorySummary = async (token: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/summary/category?month=${month}&year=${year}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch summary:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block text-sm">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Monthly Summary</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(Number.parseInt(e.target.value))}
                className="w-full border rounded px-3 py-2"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {new Date(2024, m - 1).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(Number.parseInt(e.target.value))}
                className="w-full border rounded px-3 py-2"
              >
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading summary...</div>
        ) : categories.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No expense data for this period.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Count</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => {
                  const total = categories.reduce((sum, c) => sum + c.total, 0)
                  const percentage = ((cat.total / total) * 100).toFixed(1)
                  return (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{cat.category}</td>
                      <td className="px-6 py-4 text-right text-sm font-semibold">${cat.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right text-sm text-gray-600">{cat.count}</td>
                      <td className="px-6 py-4 text-right text-sm">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-gray-600 text-xs font-medium w-10 text-right">{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="px-6 py-4 bg-gray-50 border-t font-semibold">
              <div className="flex justify-between">
                <span>Total</span>
                <span>${categories.reduce((sum, c) => sum + c.total, 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
