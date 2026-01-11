import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Smart Finance Manager</h1>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-6">Track Your Finances with AI Insights</h2>
          <p className="text-xl text-gray-600 mb-8">
            Manage your income and expenses, visualize your cash flow, and get AI-powered recommendations.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-20">
          <div className="p-8 bg-white rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Track Transactions</h3>
            <p className="text-gray-600">Record all your income and expenses with categories and descriptions.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Visualize Cash Flow</h3>
            <p className="text-gray-600">See charts and summaries of your monthly income and spending patterns.</p>
          </div>
          <div className="p-8 bg-white rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">AI Insights</h3>
            <p className="text-gray-600">Get personalized recommendations based on your spending habits.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
