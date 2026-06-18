import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface AppShellProps {
  sidebar?: ReactNode
  children: ReactNode
  className?: string
}

/** Top-level layout: fixed sidebar + scrollable main area. */
export function AppShell({ sidebar, children, className }: AppShellProps) {
  return (
    <div className={cn('bg-background flex min-h-dvh', className)}>
      {sidebar}
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
