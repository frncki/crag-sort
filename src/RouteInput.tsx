import { useState, useMemo } from 'react'
import { parseRoutes } from './utils/parseRoutes'
import { groupOptions, groupRoutes, type GroupOption } from './utils/groupRoutes'
import type { Route } from './types'
import RouteTable from './RouteTable'

export default function RouteInput() {
  const [text, setText] = useState('')
  const [routes, setRoutes] = useState<Route[] | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<GroupOption>(groupOptions[2])

  const groups = useMemo(
    () => (routes ? groupRoutes(routes, selectedGroup) : null),
    [routes, selectedGroup],
  )

  async function handleLoadSample() {
    const res = await fetch(`${import.meta.env.BASE_URL}sample-data.json`)
    const data = await res.json()
    const flattened = data.flat()
    setText(JSON.stringify(flattened, null, 2))
  }

  function handleProcess() {
    const parsed = parseRoutes(text)
    setRoutes(parsed)
  }

  return (
    <>
      <textarea
        className="w-full rounded-lg border border-transparent bg-surface p-4 text-white placeholder-gray-400 focus:border-accent focus:outline-none print:hidden"
        rows={16}
        placeholder="Paste JSON array with routes...."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-4 flex items-center gap-4 print:hidden">
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
          disabled={!text.trim()}
          className="rounded-lg bg-accent px-6 py-2 font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Process
        </button>
        <button
          onClick={handleLoadSample}
          className="rounded-lg border border-accent px-6 py-2 font-semibold text-accent hover:opacity-90"
        >
          Load sample
        </button>
        {groups && (
          <button
            onClick={() => window.print()}
            className="ml-auto rounded-lg border border-accent px-6 py-2 font-semibold text-accent hover:opacity-90 print:hidden"
          >
            Export PDF
          </button>
        )}
      </div>

      {groups && <RouteTable groups={groups} />}
    </>
  )
}
