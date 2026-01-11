interface Transaction {
  id: number
  amount: number
  type: string
  category_name: string
  description: string
  date: string
}

interface TransactionsListProps {
  transactions: Transaction[]
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No transactions yet. Start by adding your first transaction.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 10).map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm">{new Date(t.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 bg-gray-100 rounded text-gray-700">{t.category_name || "Other"}</span>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
