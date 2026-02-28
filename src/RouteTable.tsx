import { useState } from 'react'
import type { RouteGroup } from './utils/groupRoutes'
import RouteItem from './RouteItem'

export default function RouteTable({ groups }: { groups: RouteGroup[] }) {
  const [excludedGroups, setExcludedGroups] = useState<Set<string>>(new Set())
  const [prevGroups, setPrevGroups] = useState(groups)

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

  const visibleGroups = groups.filter((g) => !excludedGroups.has(g.groupLabel))

  return (
    <div className="mt-6 flex items-start gap-4">
      <div className="min-w-0 flex-1 rounded-sm bg-surface p-4 space-y-6">
        {visibleGroups.map((group) => (
          <section key={group.groupLabel}>
            <h2 className="mb-2 text-lg font-semibold text-accent">
              {group.groupLabel}
            </h2>
            <div className="divide-y divide-black">
              {group.routes.map((route) => (
                <RouteItem key={route.zlaggableSlug} route={route} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="w-48 shrink-0 rounded-sm bg-surface p-4">
        <h3 className="mb-2 text-sm font-semibold text-accent">Ukryj grupy</h3>
        {groups.map((group) => (
          <label
            key={group.groupLabel}
            className="flex items-center gap-2 py-1 text-sm"
          >
            <input
              type="checkbox"
              checked={excludedGroups.has(group.groupLabel)}
              onChange={() => toggleGroup(group.groupLabel)}
            />
            <span className="truncate">{group.groupLabel}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
