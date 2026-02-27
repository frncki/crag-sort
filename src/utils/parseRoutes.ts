import type { Route } from '../types'

export function parseRoutes(text: string): Route[] {
  const trimmed = text.trim()
  if (!trimmed) return []

  // Try parsing as a single JSON array
  try {
    const parsed = JSON.parse(trimmed)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // continue
  }

  // Try wrapping in brackets (handles arrays separated by , or ;)
  const wrapped = trimmed.replace(/;/g, ',')
  try {
    const parsed = JSON.parse(`[${wrapped}]`)
    if (Array.isArray(parsed)) return parsed.flat()
  } catch {
    // continue
  }

  // Fallback: find all [...] substrings, parse each, merge
  const matches = trimmed.match(/\[[\s\S]*?\]/g)
  if (!matches) return []

  const results: Route[] = []
  for (const match of matches) {
    try {
      const parsed = JSON.parse(match)
      if (Array.isArray(parsed)) results.push(...parsed)
    } catch {
      // skip unparseable chunks
    }
  }
  return results
}
