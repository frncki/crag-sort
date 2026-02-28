import { useState } from 'react'
import Collapse from './Collapse'
import Instructions from './Instructions'
import RouteInput from './RouteInput'

function App() {
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1
        className="mb-8 flex items-center justify-center gap-3 text-4xl font-bold print:hidden"
        onClick={() => setShowInstructions((v) => !v)}
      >
        <img src={`${import.meta.env.BASE_URL}cragsort-logo.svg`} alt="" className="h-[1em]" />
        Cragsort
      </h1>
      <Collapse open={showInstructions}>
        <Instructions />
      </Collapse>
      <RouteInput />
    </div>
  )
}

export default App
