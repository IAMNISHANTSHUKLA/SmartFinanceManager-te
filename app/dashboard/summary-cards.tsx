interface SummaryCardsProps {
  income: number
  expense: number
}

export function SummaryCards({ income, expense }: SummaryCardsProps) {
  const net = income - expense

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <p className="text-gray-600 text-sm font-medium">Total Income</p>
        <p className="text-3xl font-bold text-green-600 mt-2">${income.toFixed(2)}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
        <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
        <p className="text-3xl font-bold text-red-600 mt-2">${expense.toFixed(2)}</p>
      </div>
      <div
        className={`bg-white rounded-lg shadow p-6 border-l-4 ${net >= 0 ? "border-blue-500" : "border-yellow-500"}`}
      >
        <p className="text-gray-600 text-sm font-medium">Net Balance</p>
        <p className={`text-3xl font-bold mt-2 ${net >= 0 ? "text-blue-600" : "text-yellow-600"}`}>${net.toFixed(2)}</p>
      </div>
    </div>
  )
}
