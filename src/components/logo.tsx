import { CalendarCheck } from 'lucide-react'

import { cn } from '@/lib/utils'

interface LogoProps {
  showWordmark?: boolean
  className?: string
}

/** App brand mark: lime badge icon + optional wordmark. */
export function Logo({ showWordmark = true, className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="bg-brand text-primary-foreground flex size-8 items-center justify-center rounded-lg">
        <CalendarCheck className="size-5" />
      </span>
      {showWordmark && (
        <span className="text-foreground text-lg font-bold tracking-tight">
          Eventos
        </span>
      )}
    </div>
  )
}
