import { useState, useMemo } from 'react'
import { parseRoutes } from './utils/parseRoutes'
import { groupOptions, groupRoutes, type GroupOption } from './utils/groupRoutes'
import type { Route } from './types'
import RouteTable from './RouteTable'

export default function RouteInput() {
  const [text, setText] = useState('')
  const [routes, setRoutes] = useState<Route[] | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<GroupOption>(groupOptions[3])

  const groups = useMemo(
    () => (routes ? groupRoutes(routes, selectedGroup) : null),
    [routes, selectedGroup],
  )

  function handleProcess() {
    const parsed = parseRoutes(text)
    setRoutes(parsed)
  }

  return (
    <>
      <textarea
        className="w-full rounded-lg border border-transparent bg-surface p-4 text-white placeholder-gray-400 focus:border-accent focus:outline-none"
        rows={16}
        placeholder="Wklej tablice JSON z drogami..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-4 flex items-center gap-4">
        <select
          value={groupOptions.indexOf(selectedGroup)}
          onChange={(e) => setSelectedGroup(groupOptions[Number(e.target.value)])}
          className="rounded-lg bg-surface px-3 py-2 text-white border border-transparent focus:border-accent focus:outline-none"
        >
          {groupOptions.map((opt, i) => (
            <option key={opt.key} value={i}>{opt.label}</option>
          ))}
        </select>
        <button
          onClick={handleProcess}
          className="rounded-lg bg-accent px-6 py-2 font-semibold text-white hover:opacity-90"
        >
          Process
        </button>
      </div>

      {groups && <RouteTable groups={groups} />}
    </>
  )
}
