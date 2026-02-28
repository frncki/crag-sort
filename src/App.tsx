import RouteInput from './RouteInput'

function App() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 flex items-center justify-center gap-3 text-4xl font-bold print:hidden">
        <img src={`${import.meta.env.BASE_URL}cragsort-logo.svg`} alt="" className="h-[1em]" />
        Cragsort
      </h1>
      <RouteInput />
    </div>
  )
}

export default App
