'use client'

import { X } from 'lucide-react'
import { Dialog } from 'radix-ui'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface ResponsiveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

/**
 * Overlay that is a bottom sheet on mobile and a centered modal on desktop
 * (Radix Dialog + tailwindcss-animate, no extra deps). Same pattern used across
 * the app for any overlay/selector (D-012).
 */
export function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: ResponsiveDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          // Opt out of the describedby warning only when there is no description.
          {...(description ? {} : { 'aria-describedby': undefined })}
          className={cn(
            'bg-background text-foreground border-border fixed z-50 flex max-h-[90vh] w-full flex-col gap-4 border p-4 shadow-2xl',
            'inset-x-0 bottom-0 rounded-t-2xl pb-[max(1rem,env(safe-area-inset-bottom))]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
            'md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:pb-4',
            'md:data-[state=closed]:zoom-out-95 md:data-[state=open]:zoom-in-95',
            className,
          )}
        >
          {/* Grab handle (mobile only). */}
          <div className="bg-border mx-auto h-1 w-12 shrink-0 rounded-full md:hidden" />

          <div className="flex items-center justify-between gap-4">
            <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
            <Dialog.Close
              aria-label="Fechar"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="text-muted-foreground text-sm">
              {description}
            </Dialog.Description>
          )}

          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>

          {footer && (
            <div className="flex shrink-0 justify-end gap-3 pt-2">{footer}</div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
