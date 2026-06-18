'use client'

import { CalendarClock } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { ThemeToggle } from '@/components/theme-toggle'

export default function EventosPage() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-10 px-6 py-10">
      <header className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm font-medium">
          Painel de Eventos
        </span>
        <ThemeToggle />
      </header>

      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="border-border bg-card flex flex-col items-center gap-4 rounded-2xl border p-12 text-center"
      >
        <span className="text-brand-strong dark:text-brand bg-primary/10 flex size-14 items-center justify-center rounded-full">
          <CalendarClock className="size-7" />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">
          Painel de Gestão de Eventos
        </h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          Estrutura pronta. A listagem de eventos chega na próxima fase.
        </p>
      </motion.section>
    </main>
  )
}
