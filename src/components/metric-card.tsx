import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type Accent = 'brand' | 'success' | 'danger' | 'muted'

const accentText: Record<Accent, string> = {
  brand: 'text-brand-strong dark:text-brand',
  success: 'text-green-600 dark:text-green-400',
  danger: 'text-destructive',
  muted: 'text-muted-foreground',
}

interface MetricCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  accent?: Accent
  className?: string
}

/** KPI card: label + big value + accented icon. */
export function MetricCard({
  label,
  value,
  icon: Icon,
  accent = 'brand',
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'bg-secondary border-border flex min-w-0 flex-col gap-2 rounded-2xl border p-4 sm:p-5',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-muted-foreground text-xs sm:text-sm">
          {label}
        </span>
        <Icon className={cn('size-5', accentText[accent])} />
      </div>
      <span
        className={cn(
          'font-display text-2xl font-bold sm:text-3xl',
          accentText[accent],
        )}
      >
        {value}
      </span>
    </div>
  )
}
