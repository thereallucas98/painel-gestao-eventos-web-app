'use client'

import { Info } from 'lucide-react'
import { Tooltip } from 'radix-ui'
import { type ReactNode, useState, useSyncExternalStore } from 'react'

import { ResponsiveDialog } from '@/components/responsive-dialog'
import { cn, focusRing } from '@/lib/utils'

/** Tracks the md breakpoint without setState-in-effect (SSR-safe). */
function useIsDesktop() {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia('(min-width: 768px)')
      mq.addEventListener('change', notify)
      return () => mq.removeEventListener('change', notify)
    },
    () => window.matchMedia('(min-width: 768px)').matches,
    () => false,
  )
}

interface InfoPopoverProps {
  title: string
  children: ReactNode
}

/** Info hint: anchored popover on desktop, bottom sheet on mobile. */
export function InfoPopover({ title, children }: InfoPopoverProps) {
  const desktop = useIsDesktop()
  const [open, setOpen] = useState(false)

  const triggerClass = cn(
    'text-muted-foreground hover:text-foreground hover:bg-background rounded-full p-1 transition-colors',
    focusRing,
  )
  const label = `Sobre: ${title}`

  if (desktop) {
    return (
      <Tooltip.Provider delayDuration={150}>
        <Tooltip.Root>
          <Tooltip.Trigger aria-label={label} className={triggerClass}>
            <Info className="size-4" />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              align="end"
              sideOffset={8}
              className="bg-card text-foreground border-border data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 z-50 w-64 rounded-xl border p-4 text-left shadow-lg"
            >
              <p className="mb-1 text-sm font-semibold">{title}</p>
              <div className="text-muted-foreground text-sm">{children}</div>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    )
  }

  return (
    <>
      <button
        type="button"
        aria-label={label}
        onClick={() => setOpen(true)}
        className={triggerClass}
      >
        <Info className="size-4" />
      </button>
      <ResponsiveDialog open={open} onOpenChange={setOpen} title={title}>
        <div className="text-muted-foreground text-sm">{children}</div>
      </ResponsiveDialog>
    </>
  )
}
