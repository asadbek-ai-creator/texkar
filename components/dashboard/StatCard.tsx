import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: number // Optional percentage trend (positive or negative)
  description?: string
}

export default function StatCard({ title, value, icon: Icon, trend, description }: StatCardProps) {
  // Determine trend color and icon
  const trendColor = trend !== undefined
    ? trend >= 0
      ? 'text-green-600'
      : 'text-red-600'
    : 'text-gray-400'

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      {/* Icon */}
      <div className="flex items-center justify-between mb-4">
        <div className="rounded-lg bg-blue-50 p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>

      {/* Value */}
      <p className="text-3xl font-bold text-gray-900 mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>

      {/* Description */}
      {description && (
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      )}
    </div>
  )
}
