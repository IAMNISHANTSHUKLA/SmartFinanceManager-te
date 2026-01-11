interface InsightsCardProps {
  insights: string
}

export function InsightsCard({ insights }: InsightsCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow p-6 border border-blue-200">
      <div className="flex items-start gap-4">
        <div className="text-2xl">💡</div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-2">AI Financial Insights</h3>
          <p className="text-gray-700 leading-relaxed">{insights}</p>
        </div>
      </div>
    </div>
  )
}
