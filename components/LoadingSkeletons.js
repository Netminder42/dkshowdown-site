export function PickCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden animate-pulse">
      <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 bg-gray-700 rounded w-24"></div>
          <div className="h-5 bg-gray-700 rounded w-16"></div>
        </div>
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
        <div className="mt-6 space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 bg-gray-700 rounded w-32"></div>
              <div className="h-4 bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-900 px-6 py-3 border-t border-gray-700">
        <div className="h-3 bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  )
}

export function DashboardCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 animate-pulse">
      <div className="h-4 bg-gray-700 rounded w-1/3 mb-3"></div>
      <div className="h-8 bg-gray-700 rounded w-1/2"></div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg border border-gray-700 animate-pulse">
          <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="h-8 w-20 bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  )
}

export function Spinner({ size = 'md' }) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-4 border-gray-700 border-t-green-600 rounded-full animate-spin`}></div>
    </div>
  )
}

export function FullPageLoader() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-gray-400 mt-4">Loading...</p>
      </div>
    </div>
  )
}
