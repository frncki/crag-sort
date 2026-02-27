import type { Route } from './types'

export default function RouteItem({ route }: { route: Route }) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-surface px-4 py-3">
      <span className="w-16 shrink-0 text-center font-semibold text-accent">
        {route.difficulty}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{route.zlaggableName}</div>
        <div className="truncate text-sm text-gray-400">
          {route.cragName} · {route.sectorName}
        </div>
      </div>
      <span className="w-12 shrink-0 text-right">{route.averageRating}</span>
      <span className="w-12 shrink-0 text-right">{route.totalRecommendedRate}%</span>
    </div>
  )
}
