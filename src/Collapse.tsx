import type { ReactNode } from 'react'

export default function Collapse({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className="grid transition-[grid-template-rows] duration-450 ease-in-out"
      style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
    >
      <div className="overflow-hidden" aria-hidden={!open}>
        {children}
      </div>
    </div>
  )
}
