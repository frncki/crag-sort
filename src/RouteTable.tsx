import type { RouteGroup } from './utils/groupRoutes'
import RouteItem from './RouteItem'

export default function RouteTable({ groups }: { groups: RouteGroup[] }) {
  return (
    <div className="mt-6 space-y-6">
      {groups.map((group) => (
        <section key={group.groupLabel}>
          <h2 className="mb-2 text-lg font-semibold text-accent">
            {group.groupLabel}
          </h2>
          <div className="space-y-1">
            {group.routes.map((route) => (
              <RouteItem key={route.zlaggableSlug} route={route} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
