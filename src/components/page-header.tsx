import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  actions?: ReactNode
  className?: string
}

/** Page title + right-aligned actions (search, buttons). Stacks on mobile. */
export function PageHeader({ title, actions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <h1 className="font-display text-2xl font-bold tracking-tight">
        {title}
      </h1>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  )
}
