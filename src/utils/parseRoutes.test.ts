import { describe, it, expect } from 'vitest'
import { parseRoutes } from './parseRoutes'

describe('parseRoutes', () => {
  it('returns [] for empty string', () => {
    expect(parseRoutes('')).toEqual([])
  })

  it('returns [] for whitespace-only string', () => {
    expect(parseRoutes('   \n\t  ')).toEqual([])
  })

  it('parses a single JSON array', () => {
    const input = JSON.stringify([{ zlaggableName: 'Route A' }, { zlaggableName: 'Route B' }])
    expect(parseRoutes(input)).toEqual([
      { zlaggableName: 'Route A' },
      { zlaggableName: 'Route B' },
    ])
  })

  it('merges two arrays separated by comma', () => {
    const a = JSON.stringify([{ zlaggableName: 'A' }])
    const b = JSON.stringify([{ zlaggableName: 'B' }])
    const input = `${a},${b}`
    expect(parseRoutes(input)).toEqual([
      { zlaggableName: 'A' },
      { zlaggableName: 'B' },
    ])
  })

  it('merges two arrays separated by semicolon', () => {
    const a = JSON.stringify([{ zlaggableName: 'A' }])
    const b = JSON.stringify([{ zlaggableName: 'B' }])
    const input = `${a};${b}`
    expect(parseRoutes(input)).toEqual([
      { zlaggableName: 'A' },
      { zlaggableName: 'B' },
    ])
  })

  it('merges two arrays separated by whitespace (regex fallback)', () => {
    const a = JSON.stringify([{ zlaggableName: 'A' }])
    const b = JSON.stringify([{ zlaggableName: 'B' }])
    const input = `${a}\n\n${b}`
    expect(parseRoutes(input)).toEqual([
      { zlaggableName: 'A' },
      { zlaggableName: 'B' },
    ])
  })

  it('handles trailing commas in arrays and objects', () => {
    const input = '[{"zlaggableName": "A",}, {"zlaggableName": "B"},]'
    expect(parseRoutes(input)).toEqual([
      { zlaggableName: 'A' },
      { zlaggableName: 'B' },
    ])
  })

  it('returns [] for invalid JSON', () => {
    expect(parseRoutes('not json at all')).toEqual([])
  })

  it('returns only successfully parsed arrays from mixed input', () => {
    const valid = JSON.stringify([{ zlaggableName: 'Good' }])
    const invalid = '[{broken'
    const input = `${valid}\n${invalid}`
    expect(parseRoutes(input)).toEqual([{ zlaggableName: 'Good' }])
  })
})
