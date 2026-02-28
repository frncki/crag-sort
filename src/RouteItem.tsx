import type { Route } from './types'

export default function RouteItem({ route }: { route: Route }) {

  const averageRating = (Math.round(Number(route.averageRating)*100)/100).toFixed(2)
  const totalRecommendedRate = ((Math.round(Number(route.totalRecommendedRate * 10000))/100).toFixed(2))

  return (
    <div className="flex items-center gap-4 bg-surface px-4 py-3">
      <span className="w-16 shrink-0 text-center text-xl font-bold">
        {route.difficulty}
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium font-semibold">{route.zlaggableName}</div>
        <div className="truncate text-sm text-gray-400">
          {route.cragName} · {route.sectorName}
        </div>
      </div>
      <span className="w-16 shrink-0 text-right text-sm">{route.totalAscents}</span>
      <span className="w-24 shrink-0 text-right text-sm">
        {totalRecommendedRate}%
      </span>
      <span className="w-20 shrink-0 text-right pr-2 text-sm">{averageRating}</span>
    </div>
  )
}
