import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'

interface IconButtonProps extends ComponentProps<typeof Button> {
  active?: boolean
}

/**
 * Square icon-only button. `active` highlights it (lime) — e.g. the current nav
 * item. Pass an `aria-label` (icon-only buttons need an accessible name).
 */
export function IconButton({
  active = false,
  variant,
  size = 'icon',
  ...props
}: IconButtonProps) {
  return (
    <Button
      type="button"
      size={size}
      variant={active ? 'default' : (variant ?? 'secondary')}
      {...props}
    />
  )
}
