import { useState } from 'react'
import { parseRoutes } from './utils/parseRoutes'
import { groupOptions, groupRoutes } from './utils/groupRoutes'
import RouteItem from './RouteItem'
import type { Route } from './types'

const exampleRoute: Route = {
  zlaggableName: 'Alcatraz',
  zlaggableSlug: 'alcatraz',
  cragSlug: 'frankenjura',
  cragName: 'Frankenjura',
  countrySlug: 'germany',
  countryName: 'Germany',
  areaSlug: 'northern-frankenjura',
  areaName: 'Northern Frankenjura',
  sectorSlug: 'krottenseer-turm',
  sectorName: 'Krottenseer Turm',
  category: 0,
  difficulty: '8a',
  gradeIndex: 800,
  totalAscents: 142,
  totalRecommendedRate: 87,
  averageRating: 4.2069,
  flashOnsightRate: 0.12,
  userClimbed: false,
  hasVlId: true,
}

export default function RouteInput() {
  const [text, setText] = useState('')

  function handleProcess() {
    const routes = parseRoutes(text)
    console.log(routes)
    const grouped = groupRoutes(routes, groupOptions[3])
    console.log(grouped)
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
      <button
        onClick={handleProcess}
        className="mt-4 rounded-lg bg-accent px-6 py-2 font-semibold text-white hover:opacity-90"
      >
        Process
      </button>
      <div className="mt-6">
        <RouteItem route={exampleRoute} />
      </div>
    </>
  )
}
