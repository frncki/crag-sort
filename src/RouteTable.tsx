import { useMemo, useState } from 'react'
import type { RouteGroup } from './utils/groupRoutes'
import { sortOptions, type SortOption } from './utils/sortRoutes'
import RouteItem from './RouteItem'

export default function RouteTable({ groups }: { groups: RouteGroup[] }) {
  const [excludedGroups, setExcludedGroups] = useState<Set<string>>(new Set())
  const [prevGroups, setPrevGroups] = useState(groups)
  const [sortOption, setSortOption] = useState<SortOption>(sortOptions[0])

  if (groups !== prevGroups) {
    setPrevGroups(groups)
    setExcludedGroups(new Set())
  }

  function toggleGroup(label: string) {
    setExcludedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }

  const visibleGroups = useMemo(
    () =>
      groups
        .filter((g) => !excludedGroups.has(g.groupLabel))
        .map((g) => ({
          ...g,
          routes: [...g.routes].sort(sortOption.comparator),
        })),
    [groups, excludedGroups, sortOption],
  )

  return (
    <div className="mt-6 flex flex-col-reverse md:flex-row items-stretch md:items-start gap-4 print:block">
      <div className="min-w-0 flex-1 rounded-sm bg-surface p-4 space-y-6">
        {visibleGroups.map((group) => (
          <section key={group.groupLabel}>
            <h2 className="mb-2 text-lg font-semibold text-accent">
              {group.groupLabel}
            </h2>
            <div className="hidden md:flex items-center gap-4 px-4 py-2 text-sm font-light text-gray-400">
              <span className="w-16 shrink-0 text-center">GRADE</span>
              <span className="min-w-0 flex-1">NAME</span>
              <span className="w-24 shrink-0 text-right">ASCENTS</span>
              <span className="w-20 shrink-0 text-right">RECOMMENDED</span>
              <span className="w-20 shrink-0 text-right">RATING</span>
            </div>
            <div className="divide-y divide-black">
              {group.routes.map((route) => (
                <RouteItem key={route.zlaggableSlug} route={route} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="w-full md:w-48 shrink-0 rounded-sm bg-surface p-4 flex flex-col gap-4 print:hidden">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-accent">Sort routes</h3>
          <div className="grid grid-cols-2 md:grid-cols-1">
            {sortOptions.map((opt) => (
              <label
                key={opt.label}
                className="flex items-center gap-2 py-1 text-sm"
              >
                <input
                  type="radio"
                  name="sort"
                  checked={sortOption === opt}
                  onChange={() => setSortOption(opt)}
                  className="custom-radio"
                />
                <span className="truncate">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-accent">Hide groups</h3>
          <div className="grid grid-cols-2 md:grid-cols-1">
            {groups.map((group) => (
              <label
                key={group.groupLabel}
                className="flex items-center gap-2 py-1 text-sm"
              >
                <input
                  type="checkbox"
                  checked={excludedGroups.has(group.groupLabel)}
                  onChange={() => toggleGroup(group.groupLabel)}
                  className="custom-checkbox"
                />
                <span className="truncate">{group.groupLabel}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
