import { cn } from '@/lib/utils'

interface ContentLabelProps {
  title: string
  subtitle?: string
  className?: string
}

/** Two-line label: primary title + muted subtitle (design "content label"). */
export function ContentLabel({
  title,
  subtitle,
  className,
}: ContentLabelProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <span className="text-foreground text-sm font-semibold">{title}</span>
      {subtitle && (
        <span className="text-muted-foreground text-xs">{subtitle}</span>
      )}
    </div>
  )
}
