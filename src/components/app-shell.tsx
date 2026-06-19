import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface AppShellProps {
  sidebar?: ReactNode
  children: ReactNode
  className?: string
}

/** Top-level layout: fixed sidebar + scrollable main area (only the body scrolls). */
export function AppShell({ sidebar, children, className }: AppShellProps) {
  return (
    <div className={cn('bg-background flex h-dvh overflow-hidden', className)}>
      {sidebar}
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto pb-6 md:pb-8">
        {children}
      </main>
    </div>
  )
}
