import type { Route } from './types'

export default function RouteItem({ route }: { route: Route }) {

  const averageRating = (Math.round(Number(route.averageRating)*100)/100).toFixed(2)
  const totalRecommendedRate = ((Math.round(Number(route.totalRecommendedRate * 10000))/100).toFixed(2))

  return (
    <div className="flex items-center gap-4 bg-surface px-3 md:px-4 py-3">
      <span className="hidden md:block w-16 shrink-0 text-center text-xl font-bold">
        {route.difficulty}
      </span>

      <div className="min-w-0 flex-1">
        <div className="truncate font-medium font-semibold">
          <span className="mr-2 font-bold md:hidden">{route.difficulty}</span>
          {route.zlaggableName}
        </div>
        <div className="truncate text-sm text-gray-400">
          {route.cragName} · {route.sectorName}
        </div>
        <div className="mt-1 flex gap-3 text-xs text-gray-400 md:hidden">
          <span>{route.totalAscents} ascents</span>
          <span>{totalRecommendedRate}% rec</span>
          <span>★ {averageRating}</span>
        </div>
      </div>

      <span className="hidden md:block w-16 shrink-0 text-right text-sm">{route.totalAscents}</span>
      <span className="hidden md:block w-24 shrink-0 text-right text-sm">
        {totalRecommendedRate}%
      </span>
      <span className="hidden md:block w-20 shrink-0 text-right pr-2 text-sm">{averageRating}</span>
    </div>
  )
}
