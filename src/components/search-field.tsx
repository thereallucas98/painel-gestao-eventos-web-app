import { Search } from 'lucide-react'
import type { ComponentProps } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchFieldProps extends ComponentProps<'input'> {
  containerClassName?: string
}

/** Text input with a leading search icon. */
export function SearchField({
  containerClassName,
  className,
  'aria-label': ariaLabel,
  ...props
}: SearchFieldProps) {
  return (
    <div className={cn('relative', containerClassName)}>
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <Input
        aria-label={ariaLabel ?? 'Buscar'}
        className={cn('pl-9', className)}
        {...props}
      />
    </div>
  )
}
