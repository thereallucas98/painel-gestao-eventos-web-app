import type { ReactNode } from 'react'

import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

interface SidebarProps {
  nav?: ReactNode
  footer?: ReactNode
  className?: string
}

/**
 * Vertical app sidebar (desktop): brand on top, nav centered, footer at the
 * bottom. Hidden on mobile — small screens use a header instead (Phase 6).
 */
export function Sidebar({ nav, footer, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        'bg-background hidden w-28 shrink-0 flex-col items-center gap-8 py-6 md:flex',
        className,
      )}
    >
      <Logo showWordmark={false} />
      <nav className="flex flex-1 flex-col items-center justify-center gap-3">
        {nav}
      </nav>
      {footer && (
        <div className="text-muted-foreground px-2 text-center text-xs">
          {footer}
        </div>
      )}
    </aside>
  )
}
