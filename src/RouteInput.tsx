import { useState } from 'react'
import { parseRoutes } from './utils/parseRoutes'

export default function RouteInput() {
  const [text, setText] = useState('')

  function handleProcess() {
    const routes = parseRoutes(text)
    console.log(routes)
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
    </>
  )
}
