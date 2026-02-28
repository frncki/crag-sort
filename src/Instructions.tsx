export default function Instructions() {
  return (
    <div className="mb-4 md:mb-8 rounded-lg bg-neutral-800/60 px-4 md:px-6 py-4 md:py-5 text-sm text-neutral-400 print:hidden">
      <p className="mb-3 font-semibold text-neutral-300">How to get data</p>
      <ol className="list-decimal space-y-1 pl-5">
        <li>Go to <strong className="text-neutral-300">8a.nu</strong> and log in to your account</li>
        <li>Follow the climbing routes you're interested in (click the heart/follow icon on route pages)</li>
        <li>Navigate to <strong className="text-neutral-300">My Logbook → Following → Routes</strong></li>
        <li>Open browser DevTools (<kbd>F12</kbd> or <kbd>Ctrl+Shift+I</kbd> / <kbd>Cmd+Option+I</kbd>)</li>
        <li>Switch to the <strong className="text-neutral-300">Network</strong> tab</li>
        <li>Reload the page (<kbd>F5</kbd> / <kbd>Cmd+R</kbd>)</li>
        <li>Look for the XHR/Fetch request that returns a JSON array of routes (the largest response)</li>
        <li>Click on the request, then go to the <strong className="text-neutral-300">Response</strong> or <strong className="text-neutral-300">Preview</strong> tab</li>
        <li>Right-click on the response data and select <strong className="text-neutral-300">Copy object</strong></li>
        <li>Paste the copied JSON into the text area below</li>
      </ol>
    </div>
  )
}
