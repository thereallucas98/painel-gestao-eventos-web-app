import { Badge } from '@/components/ui/badge'
import { type EventStatus, eventStatusLabel } from '@/lib/i18n-enums'
import { cn } from '@/lib/utils'

const statusStyles: Record<EventStatus, string> = {
  active:
    'border-brand/30 bg-brand/10 text-brand-strong dark:border-brand/40 dark:bg-brand/15 dark:text-brand',
  closed: 'border-border bg-background text-muted-foreground',
  cancelled:
    'border-red-500/30 bg-red-500/10 text-red-600 dark:border-destructive/40 dark:bg-destructive/15 dark:text-red-400',
}

/** Event status pill (ativo / encerrado / cancelado) with semantic colors. */
export function StatusBadge({
  status,
  className,
}: {
  status: EventStatus
  className?: string
}) {
  return (
    <Badge variant="outline" className={cn(statusStyles[status], className)}>
      {eventStatusLabel[status]}
    </Badge>
  )
}
