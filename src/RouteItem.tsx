import { StarIcon as StarOutline } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import type { Route } from './types'

export default function RouteItem({ route, starred, onToggleStar }: { route: Route; starred: boolean; onToggleStar: () => void }) {

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

      <button
        type="button"
        onClick={onToggleStar}
        className="shrink-0 w-8 flex items-center justify-center cursor-pointer"
        aria-label={starred ? 'Unstar route' : 'Star route'}
      >
        {starred ? (
          <StarSolid className="w-5 h-5 text-accent print:text-black" />
        ) : (
          <StarOutline className="w-5 h-5 text-gray-500 hover:text-gray-300 print:hidden" />
        )}
      </button>
    </div>
  )
}
