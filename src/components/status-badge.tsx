import { Badge } from '@/components/ui/badge'
import { type EventStatus, eventStatusLabel } from '@/lib/i18n-enums'
import { cn } from '@/lib/utils'

const statusStyles: Record<EventStatus, string> = {
  active: 'border-brand/30 bg-brand/10 text-brand-strong dark:text-brand',
  closed: 'border-border bg-muted text-muted-foreground',
  cancelled: 'border-destructive/30 bg-destructive/10 text-destructive',
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
